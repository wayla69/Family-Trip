# Design — Memory Bookshelf ใช้ภาษาภาพเดียวกับ Trip Operations Manual

ที่มา: เล่ม PDF ของเจ้าของ *Hong Kong & Macau with the kids — Trip Operations Manual* (issued 3 Oct 2026, 26 หน้า) และ *Australia Family Road Trip — Trip Operations Manual* (revised 3 Oct 2026, 36 หน้า)
หลักการ: **แอปต้องดูเหมือนหนังสือเล่มนั้นที่มีชีวิต** — กระดาษขาว ตัวหนังสือแบบนิตยสาร เส้นบางคั่น สีประจำทริปสีเดียว ไม่ใช่แอปการ์ดสีสด
(PDF ไม่ commit ลง repo — มีข้อมูลการจอง)

## 1. ธีมต่อทริป (หนึ่งเล่ม = หนึ่งธีม)
ทุกทริปมีชุด token ของตัวเองใน trip JSON (`theme`) — เปิดเล่มไหน ทั้งหน้าเปลี่ยนเป็นธีมเล่มนั้น ชั้นหนังสือแสดงสันปกด้วยสี `accent`

| token | Harbour Hop (HK–Macau) | Big Hop (Australia) | ใช้ที่ |
|---|---|---|---|
| `--accent` | `#1F3A5F` navy | `#2C5646` eucalyptus green | แถบซ้ายปก, kicker, เลขวัน, หัวข้อเล็ก, เส้นทาง |
| `--accent-2` | `#C8402B` route red | `#6BA7C1` sea blue | เส้นทางบนแผนที่, จุดสำคัญ |
| `--ink` | `#1F2A3A` | `#263733` | ตัวหนังสือหลัก |
| `--muted` | `#6D7480` | `#59635F` | คำอธิบาย, label |
| `--paper` | `#FFFFFF` | `#FFFFFF` | พื้นหน้า |
| `--panel` | `#F7F2EA` cream | `#FAF6EE` cream | แผง "Getting around / Road strip" |
| `--rule` | `#E8EBEA` | `#E6EAE7` | เส้นคั่นบาง 1px |
| `--map-land` / `--map-sea` | `#F6F1E6` / `#E9F0F3` | `#F1ECD7` / `#6BA7C1` | แผนที่เส้นทางบนปก |
| `--display-font` | **Cormorant Garamond** (serif, italic สำหรับบรรทัดรอง) | **KIRA UI Bold** | ชื่อเล่ม ชื่อวัน ชื่อหัวข้อ |

กล่องข้อความ (callout) ใช้ร่วมกันทุกเล่ม:
| ชนิด | พื้น | label | ความหมายในสมุด |
|---|---|---|---|
| `pick` | `#FBEDE9` (HK) / `#FBF3DC` (AU) | *Local pick* ตัวเอียงสี accent-2 | ช่วงเวลาที่ชอบที่สุด ⭐ / ไฮไลต์ |
| `info` | `#EAF0F7` | — | คำพูดเด็ก, ข้อมูล |
| `calm` | `#E8F4F0` / `#EEF3EF` | — | บันทึกพ่อแม่, แผนสำรอง |
| `warn` | `#FBF0E4` / `#F8ECEA` | — | ข้อควรระวัง |

## 2. ตัวอักษร
- เนื้อหา/UI: **KIRA UI** 400/500/600/700 (ไทย+ละติน) — ตามกฎเจ้าของ
- Display: ตามธีมเล่ม (`--display-font`) · HK ใช้ Cormorant Garamond (OFL, self-host woff2 ใน `public/fonts/`, ไม่โหลดจาก Google) ไทยในหัวข้อ fallback เป็น KIRA UI
- ชื่อจีน (ป้าย "Show the driver"): Noto Sans HK / PingFang HK fallback
- สเกล (มือถือ → จอกว้าง ใช้ `clamp`): kicker 11px ตัวพิมพ์ใหญ่ letter-spacing .12em · label 12px · body 15–16px · หัวข้อวัน 24–30px · ชื่อเล่ม 40–64px · เลขวัน 34–48px

## 3. Component (manual → app)
| ในเล่ม PDF | ในแอป |
|---|---|
| **ปก**: แถบสี accent ด้านซ้าย, kicker "THE HARBOUR HOP · EXPEDITION DOLPHIN-2026", ชื่อใหญ่ + บรรทัดรองตัวเอียง, ตราวงกลม (โลมา/จิงโจ้) มุมขวา, แผนที่เส้นทาง, แถบ When · Party · Flights | หน้าปกเล่ม + การ์ดบนชั้นหนังสือ (ย่อ) · แถบสถิติ 4 ช่อง (รูป · คำพูด · ครั้งแรก · ที่ไป) แทน When/Party/Flights · ตราวงกลม = ตราประทับ (เส้นประจนกว่าจะได้) |
| **Key facts**: กริด 2 คอลัมน์, label เล็ก + ค่าใหญ่ (display font) + คำอธิบาย, เส้นบนแต่ละช่อง | "ไฮไลต์ของทริป": ครั้งแรก, ของโปรด, อารมณ์รวม, อายุเด็กตอนไป — grid `auto-fill, minmax(260px,1fr)` |
| **Day card**: เลข "01" ใหญ่สี accent, "Day 1 · Sat 5 Dec", ชื่อวัน, บรรทัด Sleep · Moving, pill ความยาก | หน้าวันในสมุด: เลขวัน + วันที่ + ชื่อวัน + Sleep · pill อารมณ์เด็ก (👧😄 👶😴) |
| **Getting around / Road strip**: แผงครีม เส้นแนวตั้ง จุดวงกลม + เวลาเดินทาง | **ที่ไปวันนี้**: รายชื่อสถานที่ที่เช็คอินเรียงตามเวลา จุดทึบ = ไปแล้ว จุดกลวง = ตามแผน |
| **Timeline**: เวลา (ตัวหนา) + ข้อความ แถวคั่นเส้นบาง | **ไทม์ไลน์ความทรงจำของวัน**: เวลา + รูป/คำพูด/บันทึก เรียงตาม `at` |
| **Local pick** กล่องชมพู/เหลือง | ⭐ ช่วงเวลาที่ชอบที่สุด |
| กล่องฟ้า/เขียว | คำพูดเด็ก (ฟ้า) · บันทึกพ่อแม่ (เขียว) |
| ท้ายวัน 3 คอลัมน์: Where to eat · Money today · Show the driver | ท้ายวัน: **กินอะไร** (มื้อที่เช็คอิน) · **ของโปรดวันนี้** · **ครั้งแรกวันนี้** |
| Footer "Hong Kong & Macau Family Trip 2026 · Trip Operations Manual · 3" | footer ของหน้า PDF ที่ส่งออก (และ print CSS) |
| Contents 1–12 | สารบัญเล่ม (วันที่มีข้อมูล) |

## 4. Layout
- มือถือ 320–390px: คอลัมน์เดียว, แผง route อยู่บนไทม์ไลน์, ระยะขอบ 16px, ไม่มี horizontal scroll
- จอกว้าง ≥ 900px: เหมือนหน้า A4 — แผง route ซ้าย 200–240px + ไทม์ไลน์ขวา, ความกว้างเนื้อหาสูงสุด ~960px, grid แบบ auto-fill
- PDF ส่งออก: A4 แนวตั้ง (ตรงกับเล่มคู่มือ) หนึ่งวันเริ่มหน้าใหม่ `break-inside: avoid` ที่รูปและกล่อง
- โหมดมืด: พื้น `#12161C`, panel `#1B2129`, accent สว่างขึ้น (HK `#8FB0E0`, AU `#7FBF9F`), กล่อง callout เป็นสีเข้มโปร่ง 18%

## 5. สิ่งที่ไม่ใช้
gradient สีสดทั้งหน้า, การ์ดเงาหนา, emoji เป็นหัวข้อหลัก — emoji ใช้เฉพาะในจุดเล็ก (อารมณ์, ครั้งแรก) ตามเล่มคู่มือ
