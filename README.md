# Memory Book · สมุดความทรงจำของมีมี่และมีก้า

เว็บแอปครอบครัวสำหรับเก็บรูป คำพูดเด็กๆ แสตมป์ และจดหมายถึงอนาคต **ข้ามหลายทริป** รันบน Railway (Node 22 + SQLite + volume เก็บรูปเต็มความละเอียด) ติดตั้งเป็นแอปบนมือถือได้ (PWA) และใช้ออฟไลน์ได้ — บันทึกตอนไม่มีสัญญาณ แล้วระบบส่งขึ้นสมุดเองเมื่อกลับมาออนไลน์

## สิ่งที่มี
| ส่วน | ทำอะไร |
|---|---|
| ชั้นหนังสือ | รวมทุกทริป ปุ่ม "ทริปใหม่" สร้างเล่มใหม่ได้เองในแอป · "วันนี้เมื่อ N ปีก่อน" |
| เล่มทริป (โปสการ์ดรายวัน) | รูป + คำพูด + ความรู้สึกของมีมี่/มีก้า + เรื่องเล่าประจำวัน + เช็คอินสถานที่/มื้ออาหาร (ได้แสตมป์) |
| ปุ่ม 📷 ตรงกลาง | ถ่ายรูปหรือเลือกรูป เลือกว่าใครอยู่ในช่วงเวลานั้น รู้สึกยังไง พิมพ์คำพูดน่ารัก |
| แสตมป์ & เหรียญ | พาสปอร์ตของเด็กแต่ละคน สะสมข้ามทริป |
| เด็กๆ | วันเกิด อายุ ส่วนสูง ของโปรด ต่อทริป (กราฟส่วนสูงโตข้ามทริป) |
| จดหมายถึงอนาคต | ปิดผนึกจริงที่เซิร์ฟเวอร์ ข้อความไม่ถูกส่งให้คนอื่นจนถึงวันเปิด |
| หนังสือพิมพ์ | `#/book/<ทริป>/<เด็ก>` หน้า A5 → "พิมพ์ / PDF" |
| สำรองข้อมูล | `/api/export.zip` (ข้อมูล + รูปเต็ม) · backup อัตโนมัติรายสัปดาห์ · กู้คืนด้วย `POST /api/import` |
| เรื่องเล่าโดย Claude (ไม่บังคับ) | ใส่ `ANTHROPIC_API_KEY` แล้วปุ่ม "ให้ Claude เล่า" จะขึ้นเอง |

## Deploy บน Railway (ประมาณ 15 นาที · ไม่ต้องเชื่อม GitHub กับ Railway)
GitHub ของเจ้าของ authorize แอป Railway ไม่ได้ → ใช้ **GitHub Actions สั่ง Railway CLI** แทน (merge เข้า `main` + CI เขียว = deploy อัตโนมัติ)

**ใน Railway (ทำครั้งเดียว)**
1. **New Project → Empty Project** → **+ Create → Empty Service** ตั้งชื่อ `web`
2. **+ Create → Database → PostgreSQL**
3. **+ Create → Bucket** (ที่เก็บรูป เลือก region ใกล้ไทย เช่น Singapore — เปลี่ยนทีหลังไม่ได้)
4. เซอร์วิส `web` → **Variables** ใส่:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`
   - `BUCKET`, `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `REGION`, `ENDPOINT` = อ้างอิงจาก Bucket (ปุ่ม *Add Reference* → เลือก Bucket) · ถ้าแท็บ Credentials ของ Bucket บอกว่า path-style ให้เพิ่ม `BUCKET_PATH_STYLE=1`
   - `FAMILY_CODE` = รหัสครอบครัวยาวๆ (ผู้ใหญ่ใช้เข้าและเพิ่มข้อมูล)
   - `VIEW_TOKEN` = สตริงสุ่ม (`openssl rand -hex 24`) → ลิงก์ญาติ `https://<โดเมน>/v/<VIEW_TOKEN>`
   - `SESSION_SECRET` = สตริงสุ่ม (`openssl rand -hex 32`)
   - `ANTHROPIC_API_KEY` (ถ้าต้องการปุ่มให้ Claude แต่งนิทาน)
5. เซอร์วิส `web` → **Settings → Volumes → Add Volume** mount `/data` (ชั่วคราว จนกว่าการย้ายข้อมูลไป Postgres + Bucket เสร็จ)
6. **Settings → Networking → Generate Domain**
7. **Project Settings → Tokens → Create token** (environment `production`) — เป็น *Project token* ไม่ใช่ Account token

**ใน GitHub (ทำครั้งเดียว)** → repo → Settings → Secrets and variables → Actions
- Secret `RAILWAY_TOKEN` = token จากข้อ 7
- Variables: `RAILWAY_SERVICE` = `web` · `MB_URL` = `https://<โดเมน>`
- Actions → **Deploy** → *Run workflow* เพื่อ deploy ครั้งแรก แล้วเปิดลิงก์ ใส่ `FAMILY_CODE` กับชื่อเล่น

deploy เองจากเครื่องก็ได้: `npm i -g @railway/cli@5.62.1 && railway login && railway link && railway up --service web`

บนมือถือ: iPhone → Safari → Share → *Add to Home Screen* · Android → Chrome → *Install app*

ค่าใช้จ่ายโดยประมาณ: Railway Hobby ~$5/เดือน (รวมเครดิตใช้งาน) + Postgres + Bucket รูป $0.015/GB/เดือน (รูปละ ~1–2 MB)

## ความปลอดภัยของรูปเด็ก
- ทุกอย่างอยู่หลังรหัสครอบครัว (cookie แบบ HttpOnly/SameSite) · รูปเปิดดูได้เฉพาะคนที่ล็อกอินหรือมีลิงก์ลับ
- ลิงก์ลับของญาติเป็น **ดูอย่างเดียว** เปลี่ยนค่า `VIEW_TOKEN` เมื่อไรลิงก์เก่าใช้ไม่ได้ทันที
- เซิร์ฟเวอร์ลบข้อมูลตำแหน่ง GPS/EXIF ออกจากรูปทุกใบก่อนเก็บ
- ล็อกอินผิดเกิน 10 ครั้ง/10 นาที ถูกบล็อกชั่วคราว
- ทำ backup สม่ำเสมอ (ดูหัวข้อ "สำรองและกู้คืนข้อมูล" ด้านล่าง)

## สำรองและกู้คืนข้อมูล
**แบบอัตโนมัติ (แนะนำ)** — GitHub Action `Backup` ดึงสำเนาเต็มทุกวันจันทร์ 02:17 (เวลาไทย) เก็บเป็น artifact 90 วัน
1. ตั้ง repo เป็น **Private** ก่อน (GitHub → Settings → General → Danger Zone → Change visibility) — ถ้า repo เป็น public งาน backup จะไม่ทำงานเลย เพราะ artifact ของ repo public ใครก็โหลดได้
2. Railway → Variables เพิ่ม `BACKUP_TOKEN` = สตริงสุ่มยาว 24 ตัวขึ้นไป (`openssl rand -hex 24`)
3. GitHub → Settings → Secrets and variables → Actions → New repository secret: `MB_URL` = `https://<โดเมน>` และ `MB_BACKUP_TOKEN` = ค่าเดียวกับข้อ 2
4. Actions → Backup → *Run workflow* เพื่อทดสอบครั้งแรก แล้วดาวน์โหลดไฟล์จากหน้า run นั้น

สำเนานี้ครบทุกอย่าง **รวมจดหมายที่ยังปิดผนึก** เก็บไฟล์ไว้ในที่ปลอดภัย

**แบบทำเอง** — เปิด `https://<โดเมน>/api/export.zip` ขณะล็อกอิน แล้วเก็บไว้ที่อื่น (Google Drive / ฮาร์ดดิสก์) เดือนละครั้ง · ไฟล์นี้ไม่มีข้อความจดหมายปิดผนึกของคนอื่น

**กู้คืน** (ผู้ใหญ่ที่ล็อกอินด้วยรหัสครอบครัว ไม่ใช่ลิงก์ดูอย่างเดียว) — ส่งไฟล์ zip เข้า `POST /api/import`:
```bash
# 1) ล็อกอินเอา cookie   2) อัปโหลด zip
curl -c ck.txt -H 'x-mb: 1' -H 'content-type: application/json' -d '{"code":"<FAMILY_CODE>","name":"พ่อ"}' https://<โดเมน>/api/login
curl -b ck.txt -H 'x-mb: 1' --data-binary @memory-book-backup.zip https://<โดเมน>/api/import
```
กู้ซ้ำกี่ครั้งก็ได้ ไม่ทับข้อมูลที่มีอยู่แล้ว (เพิ่มเฉพาะที่ขาด) รูปย่อสร้างใหม่ให้เอง

## ทริปใหม่
- กดปุ่ม **ทริปใหม่** บนชั้นหนังสือ ใส่ชื่อและวันที่ ระบบสร้างวันต่างๆ ให้
- ทริปที่มากับแอปตอนนี้: **The Big Hop** (NSW 2–17 เม.ย. 2027) และ **The Harbour Hop** (ฮ่องกง–มาเก๊า 5–10 ธ.ค. 2026) — ไฟล์ `server/trips/*.json` แก้ชื่อสถานที่/วัน แล้ว deploy ใหม่ได้ ใส่ `"cover": ["#สี1","#สี2"]` เพื่อเปลี่ยนสีปก และ `"art": false` ถ้าไม่มีภาพการ์ดรายวัน
- ทริปที่มีแผนละเอียด (สถานที่/ร้านอาหารรายวัน + ภาพการ์ดแต่ละวัน) ให้สร้างจากตัวสร้างคู่มือ: `python3 export_trip.py` (ในโฟลเดอร์ trip) จะเขียน `server/trips/<id>.json` และ `public/art/day-N.svg` ให้

## พัฒนาในเครื่อง
```bash
npm install
npm run dev            # http://localhost:3000  รหัส hop2027 · ลิงก์ดูอย่างเดียว /v/grandma
npm test               # Playwright: ล็อกอิน, บันทึกรูป, ออฟไลน์→ส่งทีหลัง, จดหมาย, หนังสือ, โหมดมืด, viewer
```
Environment: `FAMILY_CODE`, `VIEW_TOKEN`, `SESSION_SECRET` (สร้างเองและเก็บใน volume ถ้าไม่ใส่), `ANTHROPIC_API_KEY`, `STORY_MODEL`, `DATA_DIR` (ค่าเริ่มต้น `./data`; บน Railway ใช้ `/data`)

## โครงสร้าง
```
server/index.js   REST API + static   server/db.js  SQLite schema   server/auth.js  cookie + viewer link
server/images.js  sharp: หมุนตาม EXIF, ลบ metadata, ไฟล์ 2560px + thumbnail 520px
server/trips/     ข้อมูลทริปที่มากับแอป (JSON)
docs/HANDOFF.md  งานส่งต่อให้ Claude Code · CLAUDE.md กฎ/สถาปัตยกรรม · .github/workflows/ci.yml  CI
public/           PWA: core.js (state/offline queue) · views.js · sheets.js · sw.js · style.css
```

## English summary
Self-hosted family memory book: photos, quotes, moods, stamps/medals, kid profiles and server-sealed letters across many trips. Node 22 + Express + better-sqlite3 + sharp, PWA with an offline upload queue. Deploy: push to GitHub → Railway "Deploy from GitHub" → add a **volume at `/data`** → set `FAMILY_CODE` (+ optional `VIEW_TOKEN` for a read-only grandparent link). Back up via `/api/export.zip` (manual) or the weekly `Backup` workflow (`BACKUP_TOKEN` + private repo; complete incl. sealed letters); restore with `POST /api/import` (editor, idempotent).
