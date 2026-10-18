# เล่มใหม่ — มาตรฐานการสร้างสมุดจาก Trip Operations Manual (format 2)

กติกาเจ้าของ (18 ต.ค. 2026): **เจ้าของทำแผนก่อน (PDF Trip Operations Manual หรือ Artifact จาก session ไหนก็ได้) → ส่งให้ Claude Code สร้างและนำขึ้น** ตามมาตรฐานนี้ จนกว่าจะแจ้งเปลี่ยน
ทางเข้ามาตรฐาน: แผน → `plan.json` → `npm run plan-to-seed` (เติมค่าเริ่มต้นครบ + สแกนความเป็นส่วนตัว) — ดู **`docs/PLAN-TO-BOOK.md`**; เอกสารนี้คือรายละเอียดฟิลด์ของ seed
การเปลี่ยนรูปแบบในอนาคต **ไม่แก้ย้อนหลัง**: เล่มเก่าคง `format` เดิม ตัวแสดงผลต้องรองรับทุก format ที่เคยออก (ฟิลด์ใหม่เป็นทางเลือกเสมอ)

## สิ่งที่ส่งมา
- PDF คู่มือทริป (และ/หรือ Artifact แผน) — **ไม่ commit ลง repo** (มีเลขจอง)
- รูปเด็กใหม่ถ้าอายุเปลี่ยนมาก (วาดเป็นตัวการ์ตูนใหม่ รูปจริงไม่เข้า repo)

## สิ่งที่ห้ามเข้าแอป (repo สาธารณะ)
เลขจอง/PNR/เลขยืนยันที่พัก · เลขพาสปอร์ต วันเกิด ชื่อเต็ม · ค่าใช้จ่ายจริง · เบอร์มือถือส่วนตัว · รูปถ่ายจริง
→ เทสต์ `test/bookshelf.mjs` ("privacy: no booking refs…") ต้องเพิ่ม pattern ของเล่มใหม่ (เช่น ref ตั๋วใหม่) ทุกครั้ง

## ขั้นตอน
1. `npm run new-book -- --slug=japan-2028 --from=2028-03-10 --to=2028-03-20 --tz=Asia/Tokyo --title-th="…" --title-en="…" --kicker="THE … HOP · EXPEDITION …" --accent=#1F3A5F --flag=🇯🇵 --place-th=ญี่ปุ่น --place-en=Japan`
   → สร้าง `server/seeds/<slug>.json` โครงครบทุกส่วน (ค่าว่างมีเครื่องหมาย `TODO`) และพิมพ์ checklist
2. เติมจากคู่มือ ทีละส่วน (ดูตัวอย่างจริงใน `hk-macau-2026.json` / `big-hop-2027.json`):
   - `days[]`: `title`, `sleep`, `planned[]` (`key` คงที่ตลอดกาล — เป็นกุญแจเช็กอิน · **`q` = คำค้น Google Maps เต็ม** ชื่อ+ถนน+เมือง ทุกจุด), `wx`, และ **แผนวันนี้** `moving / legs[{from,to,by,min,url}] / plan[{t,th,en,note?}] / pick / planB / money / tips[] / stay{name,addr,q} / route / picks[] / food[] / eat[] / learn[] / quiz[]`
     - `legs` ทุกช่วงเดินทาง พร้อมลิงก์นำทาง (`maps/dir/?api=1&origin=…&destination=…&travelmode=driving|transit|walking`) — ช่วงบินไม่ต้องมีลิงก์
     - `picks` ร้านแนะนำต่อมื้อ (`meal, name, what, pr, q, alt{name,pr,q}`) · `food` ร้านตามจุดที่ผ่าน (`stop, items[{name,tag,what,note,pr,q,pick?}]`) · `eat` ร้านอื่นใกล้ๆ (ซ้ำกับสองอันแรกได้ แอปตัดซ้ำให้)
     - **ห้ามย่อ**: ใส่ข้อความจากคู่มือเต็มๆ ทุกบรรทัด ทั้งไทยและอังกฤษ
   - `info`: `stays[]` (ชื่อ+ที่อยู่สาธารณะ — ที่อยู่ภาษาท้องถิ่นต่อท้ายด้วย ` · ` ให้คนขับอ่าน) · `emergency[]` · `lost` · `prices` · `guide[]` · `pack[]` · `general[]` · `wild[]` · บทที่ไม่เข้าช่องไหน → `more[]` (ดูตาราง format) · ถ้าคู่มือมี: `drive` (ตารางช่วงขับ) · `car` (รถเช่า ไม่ใส่ราคา) · `kit` (ครัว/ซักผ้าแต่ละที่พัก) · `ifthen` (ถ้า…ก็… + `mishap` `carry` `crowd` `book`) · `visa` · `bio` (ด่านกักกันโรค) · `eatRules`
   - `info.restaurants` = บท "Where to eat" ของคู่มือ ครบทุกร้าน: `{ lede, kinds[3]: ร้านอาหาร/คาเฟ่และของหวาน/ทำกินเอง, groups[{ area, kind, items[{ name, where, tag, what, note, pr, q, pick?[วัน·มื้อ], tour? }] }] }` → หน้า **🍽️ ร้านอาหาร** (`#/t/<slug>/eat` ค้นหา/กรองได้) · ถ้าไม่มี แอปรวมร้านจาก `picks/food/eat/planned` ของแต่ละวันให้เอง
   - `passport`: `code` · `guides[2]` (ตัวการ์ตูนไกด์ 2 ตัว) · `style` (สีจากเล่มพิมพ์) · `greeting` · `days[]` (`title stamp facts spot[4] acc tint`) · `lists[]` (`said` คำศัพท์พร้อม `speak{text,lang}` · อาหาร `yum` หรือ `stars` · `master` + `certificate`) · `pins` · `declaration` (ถ้ามี) · `certificate` · `colour` · `countdown{doors[14],pack}` · `map{stops,days}`
   - `theme`: token ตาม `docs/DESIGN.md` + `art` + `places`
   - `firsts_catalog`, `moods`, `stamp`, `cover`
3. ภาพ: ตราวัน `public/art/<slug>/day-{n}.svg` (วงกลมเส้นหนา สไตล์เดิม) · หน้าระบายสี (ถ้าใช้ภาพจาก Artifact) · ไกด์ `public/art/guides/*.svg` · ตรา `public/art/crest/*.svg`
   → **เพิ่มทุกไฟล์ใน `ART` ของ `public/sw.js`** (เทสต์ infra ล้มถ้าขาด) และ bump `mbs-vN`
4. ถ้าต้องมี migration: ดูเลขล่าสุดบน `main` ก่อน (ชนกันบ่อย)
5. `npm test` ครบทุกกลุ่ม → ดู screenshot 390/320/1440 สว่าง/มืด → PR → CI เขียว → squash-merge → Railway deploy เอง
6. หลัง deploy: ตรวจ seed sync ใน log (`N seeded trips`), เปิดเล่มบนมือถือ, กด "เก็บเล่มนี้ไว้ในเครื่อง"

## หลังจบทริป
- เล่มความทรงจำ: ในสมุด → **สมุดความทรงจำ (PDF A4)** (`/api/b/pdf/<slug>` พิมพ์หน้า `#/print/<slug>`) ดูตัวอย่างก่อนได้ · เนื้อหามาจากบันทึกจริงทั้งหมด ไม่ต้องเตรียมอะไรเพิ่ม
- สมุดโน้ตนักเดินทาง (`#/notebook`) → คัดลอกเป็นข้อความ ใช้ตั้งต้นคู่มือเล่มถัดไป

## format
| format | ตั้งแต่ | สิ่งที่มี |
|---|---|---|
| 1 | ต.ค. 2026 | days/planned/sleep/wx · theme · passport (guides, days, lists, certificate, style, pins, declaration, colour) · countdown · map |
| 2 | 18 ต.ค. 2026 | + แผนวันนี้ต่อวัน (`trip_days.plan`) · `info` คู่มือพกพา (`trips.info`) · `format` ใน seed |
| 2 (เพิ่ม) | 18 ต.ค. 2026 | + `planned[].q` · `legs` · `picks` · `food` · `info.drive/car/kit/ifthen/visa/bio/eatRules` — ฟิลด์ทางเลือกทั้งหมด เล่มที่ไม่มียังแสดงเหมือนเดิม (ไม่มี `q` → ค้นจากชื่อ+ประเทศ) |
| 2 (เพิ่ม) | 18 ต.ค. 2026 | + `info.restaurants` (หน้าร้านอาหารทั้งหมด) — ทางเลือก ไม่มีก็รวมจากแผนรายวัน |
| 2 (เพิ่ม) | 18 ต.ค. 2026 | + `info.more[]` บทอื่นๆ ของคู่มือที่ไม่เข้าช่องไหน (การเดินทางในเมือง, ศุลกากร/คาสิโน, แผนเที่ยวสวนสนุก…): `{page: prep|sos|stays|learn, emo, title, lede?, table?{cols,rows}, rows?[{t,x}], groups?[{title,items}], note?}` แสดงในหน้าหัวข้อที่ระบุ — ทางเลือก |

เล่มที่ไม่มี `format` ถือเป็น format 1 ส่วนที่เพิ่มในภายหลังต้องเป็นฟิลด์ทางเลือกและไม่เปลี่ยนความหมายของฟิลด์เดิม
