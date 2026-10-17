# Kickoff prompt สำหรับ Claude Code — Memory Bookshelf (วางข้อความด้านล่างนี้ทั้งหมด)

> วิธีใช้: แตก zip ไว้ในโฟลเดอร์ `handoff/` ของ repo ใหม่ แล้ววางข้อความในกรอบนี้ลงใน Claude Code

```
คุณกำลังรับช่วงงานต่อจาก Claude อีกสอง session (session "Harbour Hop" ฮ่องกง–มาเก๊า และ session "Australia 2027")
งานของคุณ: สร้างและ deploy เว็บแอป "Memory Bookshelf" (ชั้นหนังสือความทรงจำ) ของมีมี่ (3 ขวบ) และมีก้า (1.5 ขวบ) ขึ้น Railway
แต่ละทริปคือหนึ่งเล่มบนชั้น เล่มแรกคือ ฮ่องกง–มาเก๊า 5–10 ธ.ค. 2026 เล่มที่สองคือ Australia 2–17 เม.ย. 2027
เจ้าของสื่อสารเป็นภาษาไทย (ศัพท์เทคนิคคงเป็นอังกฤษ) และต้องการให้ลงมือทำ ไม่ใช่อธิบายยาว

อ่านตามลำดับนี้ก่อนทำอะไร:
1. handoff/Memory_Bookshelf_Handoff.md  — บริบท PRD ย่อ data model วิธี import ความเป็นส่วนตัว เวิร์กโฟลว์ คำถามค้าง
2. handoff/trip_hk2026.json + trip.schema.json — "สัญญา" ของไฟล์ seed ต่อทริป (ทริป Australia ต้องส่งมาในรูปแบบเดียวกัน)
3. handoff/moments.schema.json + moments.sample.jsonl — รูปแบบข้อมูลต้นทางที่จะ import จากแอป Harbour Hop
4. handoff/design_tokens.json + reference_theme.css + reference_memories.css — ภาษาภาพ (ต้องคงไว้) ฟอนต์ KIRA UI อยู่ใน handoff/fonts/
5. handoff/reference/v2_memory.js และ screenshots/ — ต้นแบบ behaviour และหน้าตาของสมุดในแอปเดิม (อ่านเป็น spec ไม่ใช่โค้ดที่จะคัดลอกทั้งก้อน)
6. handoff/ACCEPTANCE.md — เกณฑ์ตรวจรับ + reference_tests/ (Playwright พร้อม mock)

ขั้นตอนที่ต้องทำ (ตามเวิร์กโฟลว์ของเจ้าของ ห้ามข้ามขั้น):
A. ถามเจ้าของเฉพาะข้อที่ยังไม่มีคำตอบใน Handoff §9 (รวมเป็นรอบเดียว ไม่ถามทีละข้อ) แล้วเขียน PRD ย่อให้เจ้าของอนุมัติ
B. เขียน ADR (framework, DB, ที่เก็บรูป, auth, ส่งออก PDF, วิธี deploy) — ตรวจตัวเลือกปัจจุบันของ Railway จากเอกสารจริงก่อน อย่าเดา
C. ตั้ง repo + CI/CD + environment (dev/prod) — Git host ไม่ใช่ GitHub (บัญชีเจ้าของถูกจำกัด); ถ้า deploy ผ่าน Railway CLI ให้เขียนวิธีไว้ใน README
D. สร้าง MVP ตาม User stories 1–7 ใน Handoff §2 โดยเริ่มจาก skeleton ที่ deploy ได้จริงก่อน (หน้าเปล่า + health check + migration แรก) แล้วค่อยเพิ่มฟีเจอร์
E. เขียน importer สำหรับ moments + รูป (Handoff §5) พร้อมโหมด dry-run ที่แสดงจำนวนก่อน/หลัง; ทดสอบกับ moments.sample.jsonl
F. ผ่านเกณฑ์ใน ACCEPTANCE.md แล้วค่อยส่งให้เจ้าของลองบนมือถือ

กฎที่ห้ามละเมิด:
- งานเสร็จ → รัน test → commit → เปิด PR → รอ CI เขียวทุก check → squash-merge → deploy (merge เมื่อผ่านทุก check เท่านั้น)
- สร้าง migration ใหม่: ดูเลข migration ล่าสุดบน main ก่อน (PR ขนานมักชนเลข); ชนแล้วใช้ union/rebase กับไฟล์ triage และ journal; เฝ้า check migrations-journaled
- ถ้าใช้ Next.js: เคารพ ratchet "use-client" (จำนวน client page ต้องไม่เพิ่ม ถ้าเพิ่มหน้าใหม่ให้แปลงหน้าเดิมเป็น server component ชดเชย)
- แก้ไฟล์ด้วย Edit/Write เท่านั้น ห้าม heredoc หรือ PowerShell Set-Content (UTF-8 ไทยพัง) และตรวจว่าข้อความไทยลงไฟล์จริง; ระวัง OneDrive file-swap
- ก่อนปิดงานหน้า dashboard/รายงาน: ตรวจขนาดตัวอักษรและรูปบนจอ PC กว้างด้วย preview_eval; ใช้ auto-fill grid ไม่ใช้คอลัมน์ตายตัว
- รูปเด็ก: ไม่มี public URL, ลบ EXIF/GPS ตอนอัปโหลด, ไม่ส่งรูปให้ AI ใด ๆ, ไม่ commit ไฟล์รูปหรือฟอนต์ KIRA เข้า repo สาธารณะ
- ห้ามใส่เลขจอง/PNR/พาสปอร์ต/ใบยืนยันโรงแรมลงในชั้นหนังสือ (ตั้งใจไม่ให้อยู่ใน seed)
- ห้ามลบข้อมูลต้นทางในแอป Harbour Hop จนกว่าเจ้าของยืนยันว่า import ครบ
- ไม่มีข้อมูลอ่อนไหวหรือ secret ใน repo; API key ของ Anthropic (สำหรับนิทาน) อยู่ใน Railway environment variable เท่านั้น และเรียกเมื่อผู้ใช้กดเท่านั้น

สิ่งที่ต้องรายงานเจ้าของเมื่อจบแต่ละขั้น: ทำอะไรเสร็จ, ที่เหลือ, สิ่งที่ยังไม่ได้ทดสอบจริง, และคำถามที่ต้องการคำตอบ
```
