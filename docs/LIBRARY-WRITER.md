# Brief: write checked rows into the LifeBook libraries (places to eat, things to do)

You get a report file of rows that passed a page check (`pass` array). Each row was taken from a web page by another agent and its
name, a copied sentence and the page's date were confirmed. Your job: turn each worth-keeping row into the library's own row format,
with good Thai, and write the files. Repository /home/user/Family-Trip is READ-ONLY for you; write only the output files named below.

Read first: /home/user/Family-Trip/docs/STYLE.md (Thai and English rules: British spelling; Thai transliterates names, never word by
word; no ค่ะ/ครับ; spell เช็ก; times as 10:00–19:00; money ≈ ฿180–760), the head of /home/user/Family-Trip/scripts/eats-lint.mjs
(eats row shape) and /home/user/Family-Trip/docs/SIGHTS.md "File format".

Rules:
- Add NO fact the row does not carry. Shorten, never invent. Keep each sentence ≤ 200 letters.
- Drop a row: with no district/area a map could use ("Bangkok (no district on the page)"); a mall or a shop as a thing to do; a bar,
  nightlife, casino, adults-only; riding animals; anything the row itself says is closed/renovating/temporary; two rows of one place
  (keep the better); a place obviously in another town than the row's `place`.
- Places to eat → `<scratch>/eats-add/<place>.json` = array of
  {name, zh? (only when the row's `local` is set), kind 0 restaurant|1 quick|2 cafe, area{en,th}, tag{en,th}, what{en,th}, why{en,th},
   pr{en,th} ("≈ ฿200–400" style from the row's price, or {en:"Check the price", th:"เช็กราคาก่อนไป"}), q, ok:"2026-11"} — no src key.
- Things to do → `<scratch>/sights-add/<place>.json` = array of
  {name{en,th}, local? , kind, area{en,th}, what{en,th}, why{en,th}, tip{en,th}, ages[4], hrs, io, pram, price{en,th} ("Free"/"ฟรี",
   "≈ …", or "Check the price"/"เช็กราคาก่อนไป"), book "none|rec|req", q, ok:"2026-11", src}.
  If the row has no tip, write a short true one from its own fields (e.g. "Allow about two hours" / "เผื่อเวลาราว 2 ชั่วโมง").
- If a file for that place already exists, read it and append (never drop what is there).
- Validate every file you write parses as JSON.

Report in at most five lines: rows written per place, rows dropped and why (one line).
