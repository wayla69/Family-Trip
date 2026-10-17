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

## ADR-9 Backup
- Postgres: scheduled backup ของ Railway (daily 6 วัน / weekly 1 เดือน / monthly 3 เดือน) · restore ได้ใน project+environment เดียวกันเท่านั้น
- Off-site: `GET /api/backup.zip` (Bearer `BACKUP_TOKEN`) = dump ตาราง + รูปจาก Bucket → GitHub Action รายสัปดาห์ (ทำงานเฉพาะ repo private) + `POST /api/import` กู้คืนแบบ idempotent · ทดสอบกู้คืนจริงหนึ่งครั้งก่อน go-live

## ความเสี่ยงที่รู้แล้ว
- repo เป็น **public** และมีฟอนต์ KIRA UI (เจ้าของยืนยันว่าเป็นลิขสิทธิ์ของตัวเองและอนุญาต) — backup อัตโนมัติจะไม่ทำงานจนกว่าจะตั้ง private
- ทำเสร็จก่อน 5 ธ.ค. = ~7 สัปดาห์ → MVP ต้องตัดตาม PRD เคร่งครัด

## แหล่งอ้างอิง (Railway docs)
- Storage Buckets: https://docs.railway.com/storage-buckets · ราคา: https://docs.railway.com/storage-buckets/billing · GA: https://railway.com/changelog/2025-11-28-buckets-ga
- Volumes + backups + ขนาดตามแพ็กเกจ: https://docs.railway.com/volumes/reference · https://docs.railway.com/volumes/backups · https://docs.railway.com/pricing/plans
- Postgres backups/HA: https://docs.railway.com/guides/postgres-backups-restores · https://railway.com/changelog/2026-03-13-highly-available-postgres
- CLI deploy ใน CI: https://docs.railway.com/cli/deploying · https://docs.railway.com/cli/login · รายงาน v5.3.0: https://station.railway.com/questions/cli-v5-3-0-railway-up-fails-with-no-1b04e9fc
