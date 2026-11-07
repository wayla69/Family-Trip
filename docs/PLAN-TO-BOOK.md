# แผน → สมุด (Plan → Book) — มาตรฐานการส่งแผนจาก session อื่นมาทำเป็นเล่ม

กติกาเจ้าของ (18 ต.ค. 2026): **เจ้าของวางแผนทริปใน session ไหนก็ได้ (claude.ai) → ส่งลิงก์ Artifact ของแผนให้ Claude Code → Claude Code แปลงเป็นเล่มตามมาตรฐานนี้** ครบทุกหน้า (เมนูพ่อแม่ทุกหัวข้อ + โหมดเด็กทุกเกม) โดยไม่ต้องอธิบายซ้ำ
ใช้คู่กับ `docs/NEW-BOOK.md` (รายละเอียดฟิลด์ของ seed format 2) — เอกสารนี้ว่าด้วย **ทางเข้า**: แผน → `plan.json` → `npm run plan-to-seed`

## 1. ส่งอะไรมา
**ฝั่ง session วางแผน:** ทำตาม `docs/handoff/PLANNER-BRIEF.md` (บทในคู่มือ + ความหนาต่อวัน + เรื่องเล่าของไกด์ + ภาพ) — คัดลอกไปใส่ skill `family-trip-kit` ได้เลย
ข้อความเดียวพอ: **ลิงก์ Artifact** + `slug` ที่อยากได้ (เช่น `sakura-hop-2028`) + ถ้ามี: สี (`#rrggbb`), ธง, kicker
- แผนจะเป็นหน้าเว็บ/เอกสาร/สไลด์ก็ได้ Claude Code อ่านด้วยเครื่องมือ Artifact แล้ว **ถอดเป็น `plan.json`** เอง
- **ดีที่สุด**: ให้ session ที่วางแผนฝัง `plan.json` ไว้ในหน้า Artifact เลย (`<script type="application/json" id="plan">…</script>` หรือบล็อกโค้ด ```json) ตาม `docs/handoff/plan.schema.json` → ถอดได้ครบ ไม่ตกหล่น ไม่ต้องตีความ
  prompt ปิดท้าย session วางแผน (คัดลอกได้):
  > Export this plan as `plan.json` following https://github.com/wayla69/Family-Trip/blob/main/docs/handoff/plan.schema.json (example: plan.sample.json next to it). Bilingual th/en everywhere, one `days[]` entry per date, every stop with a full Google Maps query `q`, a `mission` per day for the kids (4 things to spot), `restaurants` for the whole trip, `passport.words` and `passport.food`, a `tale` per day (the guide's story in 4–5 scenes), and on every timeline row an `h` headline (one emoji + at most 6 fun words, e.g. "🚌 Bus over the giant bridge") while `th`/`en` keep every detail — see docs/handoff/PLANNER-BRIEF.md for the density per day. No booking references, confirmation numbers, e-tickets, passport numbers, costs we paid, e-mails or personal phone numbers.
- PDF คู่มือ (Trip Operations Manual) ยังส่งได้เหมือนเดิม — Claude Code ถอดเป็น `plan.json` เช่นกัน แล้วเข้าทางเดียวกัน
- **นำเข้า PDF ในแอป** (`#/import`, ต้องมี `ANTHROPIC_API_KEY`): อัปโหลด PDF → เซิร์ฟเวอร์ทำทุกขั้นเองด้วย `server/bookimport.js` (ตัดข้อมูลส่วนตัวก่อนส่ง → Haiku ถอดโครง → Sonnet เขียนหน้าเด็ก + แปลไทย → `plan-to-seed-core` + privacy scan) → ร่างใน `book_drafts` → กด "บันทึกเป็นเล่ม" เข้าฐานข้อมูล (source `manual`, seed ไม่ทับ) · เล่มที่นำเข้าไม่มีภาพวาดประจำวัน (`theme.art` ว่าง ไกด์ทั่วไป `GENERIC_GUIDES`)
- **ทดลองนำเข้า PDF อัตโนมัติด้วย Claude API** (ต้นแบบสำหรับให้คนนอกใช้): `npm run import-pdf -- <manual.pdf> --out=<โฟลเดอร์นอก repo> [--dry]` — ดึงข้อความด้วย `pdftotext` (ต้องมี poppler) · ตัดบรรทัด/ค่าส่วนตัวในเครื่องก่อนส่ง (`--dry` = ดูไฟล์ที่ตัดแล้วโดยไม่เรียก API) · Haiku ถอดโครง (วัน ไกด์พกพา ร้านอาหาร) · Sonnet เขียนหน้าเด็กและแปลไทย · ส่งต่อ `plan-to-seed` (privacy scan) · พิมพ์ token และค่าใช้จ่ายต่อเล่ม (`cost.json`) · ส่งแค่ข้อความ ไม่ส่งไฟล์ PDF/รูป · ต้องมี `ANTHROPIC_API_KEY` — คีย์อยู่ใน Railway จึงรันด้วย `railway run npm run import-pdf -- …` ได้โดยไม่ต้องคัดลอกคีย์ · ผลลัพธ์ต้องตรวจก่อนเป็น seed

## 2. สิ่งที่แผนควรมี (เพื่อให้ทุกหน้าในแอปมีของ)
| หน้าในแอป | มาจาก `plan.json` |
|---|---|
| 🗓️ วันนี้ / 🧭 ทั้งทริป | `days[].plan` (ไทม์ไลน์: แต่ละช่วงมี `h` = หัวข้อสนุกๆ อีโมจิ 1 ตัว + ไม่เกิน 6 คำ เช่น `🚌 นั่งบัสข้ามสะพานยักษ์` — หน้าวันนี้โชว์บรรทัดนี้ ส่วน `th`/`en` เก็บรายละเอียดครบ แตะแล้วกางลงมา) · `moving` · `pick` · `planB` · `money` · `tips` · `legs` (ทุกช่วงเดินทาง + ลิงก์นำทาง) · `wx` |
| เช็กอิน + ปุ่ม Maps | `days[].planned[]` — ทุกจุดมี `q` ค้นเต็ม (ชื่อ+ถนน+เมือง) · `key` คงที่ตลอดกาล · ไม่ซ้ำกันทั้งเล่ม |
| 🍽️ ร้านอาหาร | `restaurants` (บท Where to eat ทั้งทริป) · `days[].picks` ต่อมื้อ · `food` ตามจุด · `eat` ใกล้ๆ |
| 🛏️ ที่พัก | `days[].sleep` + `stay{name,addr,q}` · `info.stays` (ไม่มีก็สร้างจาก stay ให้) · `info.kit` |
| 🆘 ฉุกเฉิน | `info.emergency` · `info.lost` · `info.ifthen` |
| 🧳 เตรียมตัว | `info.pack` · `info.prices` · `info.visa` · `info.bio` · `info.car` · `info.drive` |
| 📚 เรียนรู้ | `info.guide` · `days[].learn` · `quiz` · `tale` (เรื่องเล่าของไกด์ประจำวัน — กดฟังได้) · `info.general` · `info.wild` · `info.eatRules` |
| 🛂 พาสปอร์ตเด็ก | `days[].mission{title,stamp,facts,spot[4]}` · `passport.words` · `passport.food` · `passport.guides` · `certificate` |
| 🧒 โหมดเด็ก (ประตูนับถอยหลัง, จัดกระเป๋า, แผนที่มีชีวิต, สัตว์, ตัวเลข, จับคู่) | `passport.countdown.doors` (ขาดเติมให้ครบ 14) · `countdown.pack` · `passport.map{stops x,y %, days}` · `info.wild` · จับคู่/นับใช้ `planned` + `picks` อัตโนมัติ |
| 🌟 ครั้งแรก | `firsts[]` (ไม่มีใช้ชุดมาตรฐาน 10 อย่าง) |

ไม่มีส่วนไหน แอปก็ซ่อนหัวข้อนั้นให้ — แต่ **ยิ่งครบ เล่มยิ่งดี** และ **ห้ามย่อ** ข้อความจากแผน ใส่เต็มทั้งไทยและอังกฤษ

## 2.1 ภาษาไทยในเล่ม (กติกาเจ้าของ พ.ย. 2026)
- **สิ่งที่พ่อแม่อ่านผ่านตา** — ชื่อเล่ม ชื่อวัน บรรทัดอากาศ หัวข้อไทม์ไลน์ `h` และคำทั่วไป — เป็นไทยหรือทับศัพท์: โกลเด้นบัส, ลูน่าพาร์ค, คาทูมบา, รถรับส่ง (shuttle), บัตรแตะจ่าย (contactless), ด่านตรวจของต้องห้าม (biosecurity), กล่องกุญแจ (lockbox), รถราง (light rail)
- **ชื่อที่ต้องเทียบกับป้ายหรือแผนที่** — สถานี โรงแรม ช่องจอด "landing slip" "Coach" — คงอังกฤษไว้ในรายละเอียด
- **ห้ามแปลชื่อเฉพาะตรงตัว** (Golden Bus ไม่ใช่ "บัสทอง") · สะกด **เช็กอิน / เช็กเอาต์**
- ตัวนำเข้า PDF ในแอปส่งกติกานี้ให้ผู้ช่วยทุกครั้งที่เขียนไทย (`THAI_STYLE` ใน `server/bookimport.js`) · **ตัวตรวจ** (`thaiCheck` ใน `plan-to-seed-core.mjs` รันใน `plan-to-seed`, `--check` และรายงานของเล่มที่นำเข้า) เตือนเมื่อชื่อเล่ม ชื่อวัน บรรทัดอากาศ หรือหัวข้อ `h` ไม่มีตัวอักษรไทยเลย และเมื่อพบ "เช็ค" — เตือนอย่างเดียว ไม่ปฏิเสธเล่ม

## 2.2 รูปประจำเล่ม (วงกลมประจำวัน + ตราพาสปอร์ต)
- เล่มที่เจ้าของวาดเอง (HK, AU) ใช้ SVG ใน `public/art` เหมือนเดิม
- **เล่มใหม่ทุกเล่ม** (นำเข้า PDF · สร้างในแอป · เล่มตัวอย่าง): ถ้าตั้ง `OPENAI_API_KEY` แอปให้ผู้ช่วยวาดเอง — วงกลม 1 รูปต่อวัน (จากชื่อวัน + หัวข้อ `h` + ชื่อที่เที่ยว ไม่ส่งรูปหรือชื่อใคร) และตราประทับประจำเล่มบนพาสปอร์ตนักผจญภัย · เริ่มเองตอนบันทึกเล่มที่นำเข้า หรือกดจากการ์ด "รูปประจำเล่ม" ในเมนูเล่ม · วาดใหม่ได้ไม่เกิน `ART_RUNS` รอบ (ค่าเริ่มต้น 3) · `server/bookart.js`
- หน้าระบายสีต้องการ SVG จึงไม่มีในเล่มที่ผู้ช่วยวาด (เด็กๆ ได้ "วาดรูป" แทน)

## 3. ขั้นตอนของ Claude Code
1. อ่าน Artifact (`Artifact read`) → เขียน `plan.json` ไว้ใน scratchpad (ไม่ commit — อาจมีของที่ยังต้องกรอง)
2. `npm run plan-to-seed -- <scratchpad>/plan.json` → ได้ `server/seeds/<slug>.json` + รายงาน
   - แปลงไม่ผ่าน (exit 1) = แผนขาดของบังคับ → แก้ `plan.json`
   - **PRIVACY (exit 2) = เจอเลขจอง/เลขยืนยัน/อีเมล/ค่าใช้จ่าย ฯลฯ → ตัดออกจาก `plan.json` ก่อน ไม่มีข้อยกเว้น** (ไม่เขียนไฟล์ให้)
   - อ่านบรรทัด `default:` (สิ่งที่เติมให้เอง) และ `TODO left` แล้วเติมจากแผนให้ครบ: ชื่อไกด์ 2 ตัว, ทะเลบนแผนที่, "ทำไมเลือกที่พักนี้", วางตำแหน่ง `x,y` บนแผนที่ให้ตรงภาพ
3. ภาพ: ตราวัน `public/art/<slug>/day-{n}.svg` · ไกด์ `public/art/guides/<slug>-1.svg, -2.svg` · ตรา `public/art/crest/<slug>.svg` (วงกลมเส้นหนา สไตล์เล่มเดิม ไม่ใช้รูปจริง) → **เพิ่มทุกไฟล์ใน `ART` ของ `public/sw.js`** + bump `mbs-vN`
4. `test/bookshelf.mjs` ขยาย regex "privacy" ด้วยเลขจองของทริปนี้ (ถ้าเจ้าของบอกมา) ให้เทสต์กันไว้ตลอดไป
5. `npm run plan-to-seed -- --check server/seeds/<slug>.json` (เทสต์ infra ก็รันกับทุกเล่ม) → `npm test` → screenshot 390/320/1440 สว่าง/มืด ทุกหัวข้อในเมนู + โหมดเด็กทุกหน้า → PR → CI เขียว → squash-merge → Railway deploy เอง
6. ตรวจเว็บจริงแบบอ่านอย่างเดียว: เปิดเล่มใหม่ ทุกหัวข้อมีของ ปุ่ม Maps ถูกจุด โหมดเด็กเปิดได้ → รายงานเจ้าของสั้นๆ

## 4. ตัวแปลงเติมอะไรให้เอง
`format: 2` · `status` · วันที่ทุกวัน (`index`, `date`) · เด็ก 2 คน + อายุ ณ วันเดินทาง · โทเคนสี (`theme`) จาก `accent` · `key` ของจุดที่ไม่มี (จากชื่ออังกฤษ) · `q` ที่ไม่มี (`"<ชื่อ>, <เมือง>"`) · การ์ดที่พักคืนนี้จาก `info.stays` (หรือกลับกัน) · พาสปอร์ต: รหัส, ไกด์ (TODO), คำทักทาย, ใบประกาศ, สไตล์, หมุด (จุดแรกของแต่ละวัน), รายการ Master Explorer (จากทุกจุดในแผน), ประตูนับถอยหลัง 14 บาน, รายการจัดกระเป๋า, แผนที่ (จากที่นอน) · ครั้งแรก 10 อย่าง · อารมณ์ 6 แบบ · ตราจบทริป · ปก
ทุกอย่างทับได้ด้วยค่าในแผน (ดู schema)

## 5. สิ่งที่ตัวแปลงปฏิเสธ (repo สาธารณะ)
เลขจอง/PNR/locator (`Booking ref ABC123`, `เลขจอง …`) · เลขยืนยัน (ตัวเลข 9 หลักขึ้นไปนอกฟิลด์ `tel/url/q`) · e-ticket `xxx-xxxxxxxxxx` · เลขพาสปอร์ต · `฿`/`THB` · ช่องว่างแบบฟอร์ม `____` · อีเมล · เบอร์มือถือไทย · และเลขอ้างอิงที่เคยตัดออกจากสองเล่มแรก
เตือน (ไม่ปฏิเสธ): จำนวนเงิน "… บาท" — ถ้าเป็นค่าใช้จ่ายจริง ให้ตัดออก; ถ้าเป็นราคาค่าเข้าให้ใช้สกุลท้องถิ่น

## 6. ไฟล์
- `docs/handoff/plan.schema.json` — สัญญาของ `plan.json` (JSON Schema)
- `docs/handoff/plan.sample.json` — ตัวอย่างครบ 3 วัน (ทริปสมมติ) ใช้เป็นแม่แบบและใช้ในเทสต์
- `scripts/plan-to-seed.mjs` — ตัวแปลง + `--check` · `scripts/lib/book-defaults.mjs` — ค่าเริ่มต้นร่วมกับ `new-book`
- เทสต์: `test/infra.mjs` แปลงตัวอย่าง → seed ที่ `syncSeeds` โหลดได้ · ปฏิเสธเลขจอง · ทุกเล่มใน `server/seeds` ผ่าน `--check`
