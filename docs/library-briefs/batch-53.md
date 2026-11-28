# Research task: family places to eat and things to do (LifeBook travel app)

LifeBook is a travel app for Thai families with children aged 1–8. Your list is checked by a script.
The script opens every `src` link and looks for the `name` and the `quote` word for word.
It also looks for the page's date and any price you give.
A row that fails is thrown away, so accuracy matters more than count. Fewer honest rows beat a long list.

## The one rule
Every row must come from a web page you actually opened in this task.
- The page must be dated 2025 or 2026, or be the place's own official site.
- Write nothing from memory.
- If you did not read a fact on the page, leave the row out.

## For each town below, find
- **D: places to eat** that work for families with small children: restaurants, quick bites, cafés.
  - Prefer pages that say something about children: high chairs, a kids' menu, a play corner, room for a pram, mild food.
- **E: things to do** with small children: museums for kids, zoos, aquariums, parks, playgrounds, farms, beaches, nature, markets, shows, indoor places for a rainy day.
- Skip every place already listed under "already in the app" (under any name).

## Leave out
- Places that are closed, under renovation or "temporarily closed".
- Bars, nightlife, casinos and adults-only places.
- Riding animals (elephant, horse, camel, pony) and animal performances.
- A mall or a shop listed as a "thing to do". A play area inside a mall is fine.
- Places outside the town or area named below.

Temples and churches are fine: say the dress code in `tip`.

## Good sources
- Family travel blogs, tourism-board pages, local lifestyle or news lists and Wanderlog lists.
- They must show a 2025–2026 date.
- Cite the list page or article itself.
- Do not cite Google Maps, TripAdvisor, Instagram, TikTok, or any page with no date.
- Do not cite machine-written ranking sites (for example restaurantsforkings.com).

## Every field must come from the page
- `quote` is ONE sentence or phrase copied word for word from the page, at most 200 characters. It must contain the place's name, or sit right under its heading. Do not fix typos, translate or shorten words inside it.
- `name` is exactly as the page writes it.
- `price` is only an amount printed on the page, written with ≈ (e.g. "≈ ¥1,200"). If the page prints no amount, write exactly `Check the price`.
- `date` is the page's own date as YYYY-MM, or `official` for the place's own website.
- `kids` is only what the page says about children, else "".

## Output
For each town, give ONE JSON code block. Do not add comments inside the JSON. Use this shape:

```json
{"D": [
  {"place": "<place id>", "name": "...", "local": "<local-script name if the page shows it, else ''>",
   "kind": "restaurant|quick|cafe", "area": "<district or street the page gives>", "tag": "<cuisine or dish, 2–4 words>",
   "what": "<one sentence>", "why": "<one sentence: what the page says about children, else a plain reason>",
   "price": "<as printed with ≈, or 'Check the price'>", "kids": "<from the page, else ''>",
   "map": "<name, area, town>", "src": "<https page>", "date": "YYYY-MM", "quote": "<copied word for word>"}
 ],
 "E": [
  {"place": "<place id>", "name": "...", "local": "",
   "kind": "themepark|zoo|aquarium|museumkid|museum|park|play|beach|nature|views|culture|oldtown|market|show|farm|onsen|ride",
   "area": "...", "what": "...", "why": "<what children enjoy there>", "tip": "<closing day, dress code, best time: only from the page>",
   "ages": [0, 1, 2, 2], "hrs": 2, "io": "in|out|both", "pram": "yes|part|no",
   "price": "...", "book": "none|rec|req", "map": "...", "src": "...", "date": "YYYY-MM", "quote": "..."}
 ]}
```

Field notes:
- `ages` gives how well the place suits each age group, in this order: 0–2, 3–5, 6–9 and 10+. Each value is 0 (not suitable), 1 (fine) or 2 (great).
- `hrs` is how long a visit takes, in hours.

Aim for 8–15 places to eat and 8–15 things to do per town, if honest sources allow. After the JSON, write one line per town: searches used, pages opened, rows written.

---

## Towns for this task

### th-maehongson — Mae Hong Son, Pang Ung and Mae Sariang (Thailand)
Area covered: Mae Hong Son, Pang Ung and Mae Sariang (also known as / includes: mae hong son, pang ung, mae sariang, ban rak thai, pang mapha, khun yuam)

Already in the app — places to eat: Fern Restaurant / ใบเฟิร์น; Salween River Restaurant; Kai Mook / ไข่มุก; Lee Wine Rak Thai / ลีไวน์รักไทย; Intira Restaurant / อินทิรา; Coriander in Redwood; Riverhouse Restaurant; Mae Hong Son Walking Street / ถนนคนเดินแม่ฮ่องสอน; Sai Yut Morning Market / ตลาดสายหยุด; Coffee Morning; Nompangngai Cafe / หนมปังไง คาเฟ่; One Off Coffee; Huean Tai Coffee / เฮือนไต คอฟฟี่; Alawaa Cafe; Om Garden Cafe; Joy's Place; Dang Thai Food; Earth Tone; Nong Beer Restaurant; Pang Pao Dim Sum / ปังเปาติ่มซำ; Baan Pai Restaurant / ร้านอาหารบ้านปาย; Somtam Tad Baan Suan Pai / ส้มตำถาดบ้านสวน ปาย; Kuaitiao Pa Hom / ก๋วยเตี๋ยวป้าหอม แม่ฮ่องสอน; Jok Samunphrai Lung Ot / โจ๊กสมุนไพรลุงออ๊อด

Already in the app — things to do: Pang Ung / ปางอุ๋ง โครงการพัฒนาตามพระราชดำริ 2; Pang Tong Palace / พระตำหนักปางตอง; Tham Pla (Fish Cave) and Pha Suea National Park / อุทยานแห่งชาติถ้ำปลา-น้ำตกผาเสื่อ; Pha Suea Waterfall / น้ำตกผาเสื่อ; Mae Surin Waterfall National Park / อุทยานแห่งชาติน้ำตกแม่สุรินทร์; Ban Rak Thai / บ้านรักไทย; Jong Kham Lake night market / ตลาดกลางคืนหนองจองคำ; Saiyut morning market (Kad Chao) / ตลาดสายหยุด (กาดเช้า); Wat Phra That Doi Kong Mu / วัดพระธาตุดอยกองมู; Tham Lod Cave; Wat Jong Kham and Wat Jong Klang; Doi Mae U Kho sunflower fields; Royal Folk Arts and Crafts Centre; Su Tong Pe bamboo bridge; Bua tong fields at Doi Mae Ho; Pai Canyon; Pai Walking Street Night Market; Pam Bok Waterfall; Mo Paeng Waterfall; Tha Pai Hot Springs; The Land Crack; Wat Phra That Mae Yen; Santichon Village
