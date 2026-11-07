# ADR — Memory Bookshelf

สถานะ: **เสนอ (รออนุมัติพร้อม PRD)** · ตรวจตัวเลือก Railway จากเอกสารจริง 17 ต.ค. 2026 (ลิงก์ท้ายไฟล์)

## ADR-1 Framework: Node 22 + Express API + PWA แบบ vanilla JS (ไม่มี build step)
- **เลือก** เพราะส่วนที่พิสูจน์แล้วใน Memory Book v1 ใช้ต่อได้ทันที: ลบ EXIF ด้วย sharp, คิวออฟไลน์ IndexedDB, cookie HMAC + ลิงก์ญาติ, Docker entrypoint non-root, CI Playwright, backup/import
- **ไม่เลือก Next.js**: เพิ่ม build/hydration และกฎ "use-client ratchet" โดยไม่ได้ประโยชน์กับแอปครอบครัวขนาดนี้
- ผลที่ตามมา: UI เขียนใหม่ตามภาษาภาพของ Harbour Hop (`docs/handoff/design_tokens.json`, `reference_*.css`) เป็น CSS variables (design tokens) ไฟล์เดียว

## ADR-2 Database: Railway Postgres + migration SQL แบบมีเลขและ journal
- **เลือก Postgres** (ตาม Handoff §4) แทน SQLite: Railway มี backup/restore ของ Postgres และ HA แบบคลิกเดียว, ไม่ผูกข้อมูลไว้กับ volume ของ service แอป, deploy ใหม่ได้โดยไม่มี downtime ของไฟล์ DB
- ไลบรารี `pg` + `migrations/NNNN_name.sql` + `migrations/journal.json` · บูตแล้วรัน migration ที่ยังไม่รันใน transaction (ตาราง `schema_migrations`)
- CI check **`migrations-journaled`**: ทุกไฟล์ใน `migrations/` ต้องอยู่ใน journal, เลขไม่ซ้ำ, เรียงต่อเนื่อง · ก่อนเพิ่ม migration ดูเลขล่าสุดบน `main` เสมอ; ชนกันใช้ union ใน journal
- ทุกตารางมี `family_id` (MVP มีครอบครัวเดียว) — schema ตาม Handoff §4 + `external_id` สำหรับ import แบบ idempotent

## ADR-3 ที่เก็บรูป: Railway **Storage Bucket** (S3-compatible, private)
- ราคา **$0.015/GB/เดือน** egress ฟรี เทียบ Volume **$0.15/GB/เดือน** (แพงกว่า 10 เท่า, Hobby เริ่ม 5 GB, ผูกกับ service เดียว)
- Bucket เป็น private เท่านั้น → รูปส่งผ่าน backend ที่เช็ก cookie (`/media/:id`, `/media/:id/t`) ไม่มี URL สาธารณะ ป้องกัน IDOR ด้วยการเช็ก `family_id`
- Bucket ยังไม่รองรับ server-side encryption → ยอมรับ (Railway เข้ารหัส at rest ระดับ infra ไม่ได้ระบุ; บันทึกเป็นความเสี่ยง) · ไลบรารี `@aws-sdk/client-s3`
- dev/CI: MinIO ใน docker หรือ adapter เก็บไฟล์ใน disk (`STORAGE=fs`) ผ่าน interface เดียวกัน

## ADR-4 Auth: รหัสครอบครัว + ลิงก์ญาติ (เจ้าของเลือก)
- cookie HttpOnly/SameSite/Secure ลงนาม HMAC (`SESSION_SECRET` ใน Railway variables) · throttle login 10 ครั้ง/10 นาที · header `x-mb: 1` กัน CSRF ทุก write
- ไม่ทำ magic link/passkey ใน MVP; คอลัมน์ `role` เผื่ออนาคต

## ADR-5 PDF: render ฝั่ง server ด้วย Playwright Chromium
- หน้า `/print/:trip` (HTML เดียวกับเล่ม + CSS พิมพ์ A5, `break-inside: avoid` ที่รูป) → `page.pdf()` ฝังฟอนต์ KIRA UI
- Chromium เพิ่มขนาด image ~300 MB → ยอมรับ; ถ้าเกินงบ/RAM ค่อยแยกเป็น service `pdf` ภายหลัง · คิวทีละงาน กัน RAM พุ่ง

## ADR-6 นิทาน: Anthropic API ฝั่ง server เมื่อผู้ใช้กดเท่านั้น
- `ANTHROPIC_API_KEY` อยู่ใน Railway variables เท่านั้น · ส่งข้อความเท่านั้น (ไม่ส่งรูป) · พรอมต์และกติกาตาม Handoff §6 · stream กลับไปหน้าเว็บ (SSE) มีปุ่มหยุด · ล้าง markdown ก่อนบันทึก

## ADR-7 Real-time: polling เบาๆ (30 วินาที + ตอนกลับมาที่แท็บ)
- พอสำหรับผู้ใหญ่ 2–3 คน ไม่ต้องดูแล connection แบบ SSE/WebSocket · ไม่ re-render ช่องที่กำลังพิมพ์

## ADR-8 Deploy & environments
- **GitHub Actions → Railway CLI** (Railway ต่อ GitHub ไม่ได้): job `deploy` รันเมื่อ push `main` หลัง CI เขียว → `railway up --ci --service web` ด้วย **Project Token** ใน secret `RAILWAY_TOKEN` (ห้ามใช้ account token ในชื่อนี้)
- pin เวอร์ชัน `@railway/cli` (มีรายงาน v5.3.0 ล็อกอินด้วย project token ไม่ได้ใน CI)
- environments: `production` (main) · `dev` = เครื่อง local + CI (Postgres/MinIO ใน docker) · ทางเลือก: Railway environment `staging` ภายหลัง
- smoke test หลัง deploy: `test/verify-prod.mjs` ยิง URL จริง
- **อัปเดต 18 ต.ค. 2026:** เจ้าของต่อ Railway กับ repo ได้แล้ว → Railway deploy `main` เอง · workflow `deploy` เปลี่ยนเป็นกดเอง (`workflow_dispatch`) เป็นทางสำรอง ไม่รันหลัง CI อีก (เดิมขึ้นแดงทุกครั้งเพราะไม่มี token)

## ADR-11 หลายครอบครัว = หนึ่งครอบครัวต่อหนึ่ง Railway project (6 พ.ย. 2026)
- **ตัดสินใจ:** แต่ละครอบครัวได้ project ของตัวเอง (App service จาก repo นี้ + Postgres + Bucket + โดเมน + รหัสของตัวเอง) ไม่รวมหลายครอบครัวในฐานข้อมูลเดียว → ข้อมูลไม่มีทางปนกันโดยโครงสร้าง ไม่ต้องเขียนโค้ดแยกสิทธิ์เพิ่ม และเครื่องหนึ่งล่มกระทบครอบครัวเดียว
- `scripts/provision.mjs <family>` เปิดเล่มใหม่ด้วย Railway Public API (projectCreate → Postgres image + volume → App from repo → variables (DATABASE_URL อ้างอิง `${{Postgres.…}}`, รหัสสุ่มใหม่ทุกตัว) → healthcheck → domain → deploy แรก) แล้วพิมพ์รหัสครั้งเดียว · Bucket ยังสร้างผ่าน API ไม่ได้ (docs ยืนยัน) ต้องกดในแดชบอร์ดแล้วใส่ variable references เอง
- **รูปประจำเล่มวาดด้วย AI** (7 พ.ย. 2026, เจ้าของสั่ง: เล่มใหม่ต้องมีตราและวงกลมของตัวเอง): เล่มที่ไม่มี SVG ของเจ้าของ → OpenAI image generation (gpt-image-1, พื้นใส) วาดวงกลมประจำวันและตราพาสปอร์ตจากข้อความในแผนเท่านั้น (ชื่อวัน หัวข้อ ชื่อที่) ไม่ส่งรูปหรือชื่อคน · ไฟล์อยู่ในที่เก็บของครอบครัว เห็นเฉพาะคนที่เข้าสู่ระบบ อยู่ในสำเนา · จำกัด `ART_RUNS` รอบต่อเล่ม · `server/bookart.js`
- **ตัวละครจากรูปลูก** (7 พ.ย. 2026, เจ้าของสั่ง): แทนการระบายสีภาพเดิม — อัปโหลดรูป → OpenAI image edit (gpt-image-1) วาดตัวการ์ตูนพื้นใส ใช้ทันที ลูกละ 3 ครั้งต่อ 12 เดือน (ที่ถูกปฏิเสธ/ล้มเหลวไม่นับ) · นี่คือข้อยกเว้นของกฎ "รูปเด็กไม่ส่ง AI": เจ้าของเป็นคนเปิดด้วยการใส่ `OPENAI_API_KEY` และพ่อแม่กดอัปโหลดเองทุกครั้ง · รูปไม่ถูกเก็บ เก็บแค่ตัวการ์ตูน และตัวการ์ตูนเห็นได้เฉพาะคนที่เข้าสู่ระบบ (ไม่ขึ้นหน้า login) · OpenAI API ไม่ใช้ข้อมูลไปเทรนโดยค่าเริ่มต้น แต่เก็บไว้ตรวจการใช้ผิดได้ตามนโยบายของเขา
- **โปรไฟล์ครอบครัว** (`#/family`, server/family.js, migration 0018): ชื่อแอป/บรรทัดใต้ชื่อ และลูกๆ พร้อม "ลุค" (ร่างเด็กผู้หญิงกับรถลาก หรือเด็กเล็ก + สีผิว ผม เสื้อ) ที่เซิร์ฟเวอร์ระบายสีจากภาพวาดต้นฉบับ 2 ตัว — ไม่มีชื่อหรือภาพของมีมี่กับมีก้าฝังในแอปอีก (prompt นิทาน ข้อความ push จดหมาย ครั้งแรก หน้า login ใช้จากโปรไฟล์) · เครื่องที่ provision ได้ `BUNDLED_SEEDS=0` จึงเริ่มว่าง ไม่มีเล่มและตัวละครของบ้านเรา · เลือกวิธีระบายสีจากภาพเดิมแทนวาดใหม่หลายตัว: ได้สไตล์เดียวกันทั้งแอปทันที อัปโหลดรูปจริงเป็นอวาตาร์ยังไม่ทำ
- ทะเบียนครอบครัว `families.json` อยู่บนเครื่องเจ้าของเท่านั้น (ชื่อ, URL, backup token — ไม่มีรหัสครอบครัว) ใช้กับ `scripts/fleet.mjs check|backup` · Uptime workflow รับ `MB_URLS` หลายบรรทัด
- ทุกครอบครัวได้โค้ดเดียวกัน: Railway deploy `main` ให้ทุก project ที่ต่อ repo นี้เอง · เล่มของแต่ละครอบครัวเข้าทาง `#/import` (ADR-10 + ไม่ใช่ seed ในโค้ด)
- ยังไม่ทำ: รับเงิน/ต่ออายุ, ปิดเครื่องเมื่อหมดอายุ (ส่ง backup zip ให้ก่อน), นโยบาย PDPA สำหรับลูกค้า, repo ต้องเป็น private ก่อนขาย
- ถ้าลูกค้าเกินหลักสิบ ค่าเครื่องต่อหัวและการไล่ดูแลจะหนัก ค่อยพิจารณารวมหลายครอบครัวในเครื่องเดียวโดยแยกฐานข้อมูลต่อครอบครัว (ทุกตารางมี `family_id` อยู่แล้ว)

## ADR-9 Backup
- Postgres: scheduled backup ของ Railway (daily 6 วัน / weekly 1 เดือน / monthly 3 เดือน) · restore ได้ใน project+environment เดียวกันเท่านั้น
- Off-site: `GET /api/backup.zip` (Bearer `BACKUP_TOKEN`) = dump ตาราง + รูปจาก Bucket → GitHub Action รายสัปดาห์ (ทำงานเฉพาะ repo private) + `POST /api/import` กู้คืนแบบ idempotent · ทดสอบกู้คืนจริงหนึ่งครั้งก่อน go-live

## ADR-10 รูปกับ Claude (เปิดเองเท่านั้น)
- เดิม: ไม่ส่งรูปเด็กให้ AI เด็ดขาด (PRD) · พ.ย. 2026 เจ้าของขอให้ AI ดูรูปแล้วเขียน caption/จัดกลุ่มตามวัน-สถานที่/ติดแท็ก
- ตัดสินใจ: ทำเป็นสวิตช์ `PHOTO_AI=1` (Railway variable) นอกเหนือจาก `ANTHROPIC_API_KEY` — ค่าเริ่มต้นปิด ไม่ตั้ง = พฤติกรรมเดิมทุกอย่าง
- เมื่อเปิด: ส่งเฉพาะ **รูปย่อ 520 px** (ไม่มี EXIF/GPS อยู่แล้ว) ของ **วันเดียว** ครั้งละ ≤ 12 รูป **เฉพาะตอนพ่อแม่กดปุ่ม** บนหน้าบันทึกวัน · ไม่ส่งตอนอัปโหลด ไม่มี cron · ข้อความที่ไปด้วย = ชื่อวันกับชื่อจุดแวะของแผน (ไม่ส่งคำพูด/บันทึกของครอบครัว) · prompt ห้ามเดาชื่อคน ห้ามบรรยายหน้าตา/ร่างกาย · คำตอบเป็น JSON (caption เฉพาะรูปที่ยังไม่มี, แท็กจากรายการคงที่, จุดแวะจากรายการที่ให้) · นับในโควตา `STORY_DAILY` เดียวกัน · Anthropic API ไม่ใช้ข้อมูลฝึกโมเดล
- ทางเลือกที่ไม่เอา: ติดแท็กอัตโนมัติตอนอัปโหลด (ส่งทุกรูปโดยไม่ตั้งใจ) · โมเดลวิชันในเครื่อง (ไม่มีใน Railway Hobby, คุณภาพไทยต่ำ)

## ความเสี่ยงที่รู้แล้ว
- repo เป็น **public** และมีฟอนต์ KIRA UI (เจ้าของยืนยันว่าเป็นลิขสิทธิ์ของตัวเองและอนุญาต) — backup อัตโนมัติจะไม่ทำงานจนกว่าจะตั้ง private
- ทำเสร็จก่อน 5 ธ.ค. = ~7 สัปดาห์ → MVP ต้องตัดตาม PRD เคร่งครัด

## แหล่งอ้างอิง (Railway docs)
- Storage Buckets: https://docs.railway.com/storage-buckets · ราคา: https://docs.railway.com/storage-buckets/billing · GA: https://railway.com/changelog/2025-11-28-buckets-ga
- Volumes + backups + ขนาดตามแพ็กเกจ: https://docs.railway.com/volumes/reference · https://docs.railway.com/volumes/backups · https://docs.railway.com/pricing/plans
- Postgres backups/HA: https://docs.railway.com/guides/postgres-backups-restores · https://railway.com/changelog/2026-03-13-highly-available-postgres
- CLI deploy ใน CI: https://docs.railway.com/cli/deploying · https://docs.railway.com/cli/login · รายงาน v5.3.0: https://station.railway.com/questions/cli-v5-3-0-railway-up-fails-with-no-1b04e9fc
