# Memory Bookshelf · ชั้นหนังสือความทรงจำของมีมี่และมีก้า

เว็บแอปครอบครัว: **หนึ่งทริป = หนึ่งเล่ม** บนชั้นหนังสือ หน้าตาแบบเดียวกับเล่ม *Trip Operations Manual* ของเรา (ปก · การ์ดวัน "01" · แผงที่ไป · ไทม์ไลน์ · กล่อง Local pick) เก็บรูป คำพูด อารมณ์ ของโปรด บันทึกพ่อแม่ และ "ครั้งแรก" ของเด็กๆ ระหว่างทริปหรือย้อนหลัง ติดตั้งเป็นแอปบนมือถือได้ (PWA) และบันทึกได้ตอนไม่มีสัญญาณ — ระบบส่งขึ้นเองเมื่อกลับมาออนไลน์
รันบน Railway: Node 22 + Postgres + Railway Bucket เก็บรูป

## ใช้งาน
| หน้า | ทำอะไร |
|---|---|
| 📚 ชั้นหนังสือ | ทุกทริปเป็นเล่ม (ฮ่องกง–มาเก๊า ธ.ค. 2026 · Australia เม.ย. 2027) · ผู้ใหญ่กด **＋ เล่มใหม่** ได้ |
| 📖 สมุด | ปก + สถิติ (รูป/คำพูด/ครั้งแรก/ที่ไป) + ตราประทับ + ช่วงเวลาที่ชอบ ⭐ + ครั้งแรก + นิทาน + หน้าตามวัน (เฉพาะวันที่มีบันทึก) · **พิมพ์ / PDF** (A4) · **คัดลอกเป็นข้อความ** |
| ✏️ บันทึก | เลือกวัน → เพิ่มรูปหลายรูป · คำพูด (มีมี่/มีก้า/ทั้งคู่) · อารมณ์ (แตะซ้ำ = ล้าง) · ของโปรด · บันทึกพ่อแม่ · ครั้งแรก · เช็คอินที่ไป/มื้ออาหาร · จบวัน ✓ |
| 🌟 ครั้งแรก | รายการ "ครั้งแรก" ของทริป ใครได้แล้วบ้าง |
| แตะรูป | ดูเต็มจอ ปัดซ้าย/ขวา · ใส่คำอธิบาย · ⭐ · ลบ (แตะ 2 ครั้ง) |

| ✨ นิทาน | ในหน้าบันทึกของแต่ละวัน และท้ายสมุด (ทั้งทริป) กด **ให้ Claude แต่งนิทาน** — ส่งเฉพาะข้อความที่บันทึกไว้ ไม่ส่งรูป · ตัวหนังสือขึ้นทีละส่วน กด **หยุด** ได้ · แต่งใหม่/ลบได้ (ต้องใส่ `ANTHROPIC_API_KEY`) |
| ⬇ PDF | ท้ายสมุด → **ดาวน์โหลด PDF (A4)** สร้างที่เซิร์ฟเวอร์ พร้อมรูปและฟอนต์ KIRA UI วันละหน้า · ญาติที่ใช้ลิงก์ดูอย่างเดียวก็โหลดได้ |

ลิงก์จากแอปคู่มือทริป: `https://<โดเมน>/#/cap?t=hk2026&d=<วัน 0–5>` เปิดหน้าบันทึกของวันนั้น

### ย้ายข้อมูลจากแอป Harbour Hop
1. ใน Claude (บัญชีเจ้าของ Artifact) ดึงข้อมูลตาม `docs/handoff/Memory_Bookshelf_Handoff.md` §5 เก็บเป็นโฟลเดอร์: `moments.json` · `visits.json` · `days.json` · `assets/<รหัสรูป>.jpg`
2. ลองก่อน (ไม่เขียนอะไร): `node scripts/import-harbour-hop.mjs <โฟลเดอร์> --url https://<โดเมน>` → ดูจำนวนรูป/คำพูด/ครั้งแรก/ที่ไป เทียบกับปกสมุดในแอปเดิม และรายการที่ผิดรูปแบบ
3. นำเข้าจริง: เติม `--apply` · รันซ้ำได้ ไม่เกิดรายการซ้ำ · **อย่าลบข้อมูลในแอปเดิมจนกว่าตัวเลขตรงกัน**

## Deploy บน Railway (ประมาณ 15 นาที · ไม่ต้องเชื่อม GitHub กับ Railway)
GitHub ของเจ้าของ authorize แอป Railway ไม่ได้ → ใช้ **GitHub Actions สั่ง Railway CLI** แทน (merge เข้า `main` + CI เขียว = deploy อัตโนมัติ)

**ใน Railway (ทำครั้งเดียว)**
1. **New Project → Empty Project** → **+ Create → Empty Service** ตั้งชื่อ `web`
2. **+ Create → Database → PostgreSQL**
3. **+ Create → Bucket** (ที่เก็บรูป เลือก region ใกล้ไทย เช่น Singapore — เปลี่ยนทีหลังไม่ได้)
4. เซอร์วิส `web` → **Variables** ใส่:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`
   - `BUCKET`, `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `REGION`, `ENDPOINT` = อ้างอิงจาก Bucket (ปุ่ม *Add Reference* → เลือก Bucket) · ถ้าแท็บ Credentials ของ Bucket บอกว่า path-style ให้เพิ่ม `BUCKET_PATH_STYLE=1`
   - `FAMILY_CODE` = รหัสครอบครัวยาวๆ (ผู้ใหญ่ใช้เข้าและบันทึก)
   - `VIEW_TOKEN` = สตริงสุ่ม (`openssl rand -hex 24`) → ลิงก์ญาติ `https://<โดเมน>/v/<VIEW_TOKEN>` (ดูอย่างเดียว)
   - `SESSION_SECRET` = สตริงสุ่ม (`openssl rand -hex 32`) — ถ้าไม่ใส่ ระบบสร้างและเก็บใน Postgres เอง
   - `BACKUP_TOKEN` = สตริงสุ่ม 24 ตัวขึ้นไป (สำหรับ backup อัตโนมัติ)
   - `ANTHROPIC_API_KEY` (ถ้าต้องการปุ่มให้ Claude แต่งนิทาน)
5. **Settings → Networking → Generate Domain** · ไม่ต้องใช้ Volume แล้ว (ข้อมูลอยู่ใน Postgres รูปอยู่ใน Bucket)
6. **Project Settings → Tokens → Create token** (environment `production`) — เป็น *Project token* ไม่ใช่ Account token

**ใน GitHub (ทำครั้งเดียว)** → repo → Settings → Secrets and variables → Actions
- Secret `RAILWAY_TOKEN` = token จากข้อ 6
- Variables: `RAILWAY_SERVICE` = `web` · `MB_URL` = `https://<โดเมน>`
- Actions → **Deploy** → *Run workflow* เพื่อ deploy ครั้งแรก แล้วเปิดลิงก์ ใส่ `FAMILY_CODE` กับชื่อเล่น

deploy เองจากเครื่องก็ได้: `npm i -g @railway/cli@5.62.1 && railway login && railway link && railway up --service web`

บนมือถือ: iPhone → Safari → Share → *Add to Home Screen* · Android → Chrome → *Install app* · ขั้นตอนทดสอบบนมือถือ: `docs/DEVICE-QA.md`

ค่าใช้จ่ายโดยประมาณ: Railway Hobby ~$5/เดือน (รวมเครดิตใช้งาน) + Postgres + Bucket รูป $0.015/GB/เดือน (รูปละ ~0.5–1.5 MB)

## ความปลอดภัยของรูปเด็ก (PDPA)
- ทุกอย่างอยู่หลังรหัสครอบครัว (cookie HttpOnly/SameSite/Secure) · รูปไม่มี URL สาธารณะ — ส่งผ่านเซิร์ฟเวอร์ให้เฉพาะคนที่ล็อกอินหรือมีลิงก์ญาติ · `noindex` ทุกหน้า
- ลิงก์ญาติเป็น **ดูอย่างเดียว** เปลี่ยนค่า `VIEW_TOKEN` เมื่อไรลิงก์เก่าใช้ไม่ได้ทันที
- เซิร์ฟเวอร์ลบตำแหน่ง GPS/EXIF ออกจากรูปทุกใบก่อนเก็บ · ไม่ส่งรูปให้ AI ใดๆ
- ล็อกอินผิดเกิน 10 ครั้ง/10 นาที ถูกบล็อกชั่วคราว
- ลบรูป = ลบไฟล์ใน Bucket จริง · ส่งออกข้อมูลทั้งหมด: `/api/b/export.json` (ข้อมูล) หรือ `/api/export.zip` (ข้อมูล + รูป)

## สำรองและกู้คืนข้อมูล
**อัตโนมัติ (แนะนำ)** — GitHub Action `Backup` ดึงสำเนาเต็ม (ข้อมูล + รูปเต็ม) ทุกวันจันทร์ 02:17 เวลาไทย เก็บเป็น artifact 90 วัน
1. ตั้ง repo เป็น **Private** ก่อน (GitHub → Settings → General → Change visibility) — ถ้า repo เป็น public งานนี้จะไม่ทำงาน เพราะ artifact ของ repo public ใครก็โหลดได้
2. GitHub → Settings → Secrets and variables → Actions → secrets `MB_URL` = `https://<โดเมน>` และ `MB_BACKUP_TOKEN` = ค่าเดียวกับ `BACKUP_TOKEN` ใน Railway
3. Actions → Backup → *Run workflow* เพื่อทดสอบครั้งแรก

นอกจากนี้ Railway Postgres มี backup ของตัวเอง (ตั้งใน Postgres → Backups)

**ทำเอง** — เปิด `https://<โดเมน>/api/export.zip` ขณะล็อกอิน เก็บไว้ที่ Google Drive / ฮาร์ดดิสก์ เดือนละครั้ง

**กู้คืน** (ผู้ใหญ่ที่ล็อกอินด้วยรหัสครอบครัว):
```bash
curl -c ck.txt -H 'x-mb: 1' -H 'content-type: application/json' -d '{"code":"<FAMILY_CODE>","name":"พ่อ"}' https://<โดเมน>/api/login
curl -b ck.txt -H 'x-mb: 1' --data-binary @memory-bookshelf-YYYY-MM-DD.zip https://<โดเมน>/api/import
```
กู้ซ้ำกี่ครั้งก็ได้ ไม่ทับข้อมูลที่มีอยู่ (เพิ่มเฉพาะที่ขาด) รูปย่อสร้างใหม่ให้เอง

## ทริปที่มากับแอป
`server/seeds/*.json` (รูปแบบ `docs/handoff/trip.schema.json` + `theme` สีประจำเล่มตาม `docs/DESIGN.md`) — แก้แล้ว deploy ใหม่ ระบบอัปเดตชื่อวัน/ที่ไปให้ โดยไม่แตะบันทึกเดิม · **ห้ามเปลี่ยน `key` ของที่ไปในทริปที่เริ่มแล้ว** (เป็นตัวผูกเช็คอิน) ให้เพิ่มรายการใหม่แทน

## พัฒนาในเครื่อง
ดู `CLAUDE.md` (คำสั่ง Postgres ในเครื่อง, `npm test`, โครงสร้างโค้ด)

## English summary
Memory Bookshelf: one book per family trip, styled like the owner's Trip Operations Manuals. Node 22 + Express + Postgres + Railway Storage Bucket, vanilla-JS PWA with an offline write queue. Deploy: GitHub Actions → `railway up` with a project token (Railway can't connect to this GitHub account). Photos are EXIF/GPS-stripped and only streamed to signed-in users. Weekly off-site backup (private repo only) and idempotent restore via `POST /api/import`.
