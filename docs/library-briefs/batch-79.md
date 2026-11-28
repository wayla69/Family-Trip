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

### za-capetown — Cape Town (South Africa)
Area covered: Cape Town (also known as / includes: cape town, table mountain, cape point, cape of good hope, bo-kaap, kirstenbosch)

Now in the app: 21 places to eat, 23 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Mariner's Wharf; Biesmiellah; Bo-Kaap Kombuis; Café Paradiso; Deer Park Café; Willoughby & Co; Harbour House Kalk Bay; Jonkershuis; Two Oceans Restaurant; Seaforth Restaurant; Time Out Market Cape Town; Oranjezicht City Farm Market; Kalky's; Charly's Bakery; The Creamery; Kirstenbosch Tea Room; Café Roux (Noordhoek); Dunes Beach Restaurant; Massimo's; The Foodbarn; Good Thyme Café

Already in the app — things to do: Table Mountain Aerial Cableway; Two Oceans Aquarium; Kirstenbosch National Botanical Garden; Boulders Beach penguin colony; Cape of Good Hope and the Flying Dutchman Funicular; Cape Town Science Centre; Iziko Planetarium and South African Museum; Green Point Urban Park; Cape Wheel; Neighbourgoods Market; Seal Island boat cruise from Hout Bay; V&A Waterfront marine wildlife trail; Scratch Patch; Muizenberg Beach; Imhoff Farm farmyard and Snake Park; World of Birds; Vergenoegd duck parade; Stodels Nursery animal park; Princess Vlei trail; Noordhoek Common fairy trail; Paradise Park; Battery Park; The Bike Park at Constantia Uitsig

### it-dolomites — The Dolomites (Italy)
Area covered: The Dolomites (also known as / includes: dolomites, dolomiti, seceda, ortisei, val gardena, cortina)

Now in the app: 22 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Wirtshaus Vögele; Hopfen & Co; Tubladel; Mauriz Keller; Gostner Schwaige; Malga Sanon; El Brite de Larieto; Ristorante Pizzeria Al Passetto; Rifugio Scoiattoli; Rifugio Firenze; Mercato di Piazza delle Erbe; Mont Sëuc; Loacker Café Bolzano; Gelateria Avalon; Pasticceria Alverà; Café Demetz; Caffè Val d'Anna; Rifugio Averau; Ristorante Bullaccia; Pitschlmann; Sarè; Gelateria Eccetera

Already in the app — things to do: Alpe di Siusi cable car / Seiser Alm Bahn; Seceda ridge and meadows / Seceda; Lake Braies / Lago di Braies, Pragser Wildsee; Tre Cime di Lavaredo; Lake Carezza / Lago di Carezza, Karersee; South Tyrol Museum of Archaeology, home of Ötzi / Südtiroler Archäologiemuseum; Gardens of Trauttmansdorff Castle / Gärten von Schloss Trauttmansdorff; Ritten cable car, Bolzano to Soprabolzano / Rittner Seilbahn; Earth pyramids of Ritten / Erdpyramiden am Ritten; Bolzano Christmas Market / Bozner Christkindlmarkt; Therme Meran; Messner Mountain Museum Firmian / MMM Firmian, Schloss Sigmundskron; Messner Mountain Museum Corones / MMM Corones, Kronplatz; Archeoparc Val Senales / Archeoparc Schnalstal; Toblach Lake walk / Toblacher See, Lago di Dobbiaco; Cinque Torri WW1 open-air museum / Museo all'aperto della Grande Guerra; Tuffalm / Malga Tuff; Movimënt play park / Movimënt; Prösels Castle / Castel Presule; Talvera meadows / Prati del Talvera; Merano 2000 / Meran 2000

### th-hatyai — Hat Yai and Songkhla (Thailand)
Area covered: Hat Yai and Songkhla (also known as / includes: hat yai, songkhla, samila, koh yor, khao seng)

Now in the app: 20 places to eat, 23 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Jae Lek Thai Restaurant / ร้านอาหารไทยเจ๊เล็ก; Nai Wan / ร้านนายหวาน; Chokdee Dim Sum / โชคดีแต่เตี๊ยม; Kai Tod Decha / ไก่ทอดเดชา; Ko Tee Ocha / โกตี๋โอชา; Ar Restaurant / อ้า; Tae Hiang Aew / แต้เฮี้ยงอิ้ว; Kiat Fang / เกียดฟั่ง; Kim Yong Market / ตลาดกิมหยง; Greenway Night Market / กรีนเวย์ไนท์มาร์เก็ต; Khlong Hae Floating Market / ตลาดน้ำคลองแห่; Central Hatyai food court / ศูนย์อาหาร เซ็นทรัล หาดใหญ่; Ice Cream Yiu / ไอศกรีมยิว; Ice Cream Ong / ไอติมโอ่ง; Khanom Khai Pa Mon / ขนมไข่ป้ามล; Hakuna Matata Cafe; More Than Me Cafe; Danuphum Cafe Farm; Aunt Toi's Shop; Hashi Japanese Restaurant

Already in the app — things to do: Songkhla Zoo / สวนสัตว์สงขลา; Hat Yai Municipal Park and cable car / สวนสาธารณะเทศบาลนครหาดใหญ่; Khlong Hae Floating Market / ตลาดน้ำคลองแห; Ton Nga Chang Waterfall / น้ำตกโตนงาช้าง; Samila Beach and the Golden Mermaid / แหลมสมิหลา; Songkhla Old Town / เมืองเก่าสงขลา; Kim Yong Market / ตลาดกิมหยง; Greenway Night Market / ตลาดกรีนเวย์; Jumptopia at Central Hatyai / Jumptopia Central Hatyai; Magic Museum Hatyai; Songkhla National Museum / พิพิธภัณฑสถานแห่งชาติ สงขลา; Pa Thammarong Museum; Khao Tang Kuan; Khao Noi; Folklore Museum, Institute for Southern Thai Studies; Mini Zoo Hat Yai / มินิซู หาดใหญ่; Hat Yai Science and Astronomy Learning Centre / ศูนย์การเรียนรู้วิทยาศาสตร์และดาราศาสตร์ หาดใหญ่; Stainless Steel Temple; Wat Chue Chang; Wat Hat Yai Nai (Wat Mahattamangkhalaram); Thung Na La Ton Do rice fields; Songkhla Central Mosque; PSU Kaset Market

### th-samui — Koh Samui, Koh Phangan and Koh Tao (Thailand)
Area covered: Koh Samui, Koh Phangan and Koh Tao (also known as / includes: koh samui, samui, koh phangan, koh tao, ang thong marine park)

Now in the app: 21 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Krua Chao Baan / ครัวชาวบ้าน; Sabeinglae (Lamai) / สบายเล ละไม; Bang Po Seafood (Takho) / บางปอซีฟู้ด (ตาโข่); The Hut Cafe; Khaw Glong Thai Restaurant; Krua Bophut / ครัวบ่อผุด; Kob Thai; Fisherman's Restaurant & Bar; 995 Roasted Duck; Fisherman's Village Walking Street / ถนนคนเดินหมู่บ้านชาวประมง; Central Samui food court / ศูนย์อาหาร เซ็นทรัล สมุย; Phantip Night Market / ตลาดพันทิพย์ ท้องศาลา; La Fabrique; Sweet Sisters Cafe; Zest Coffee Lounge; Lamai Sunday Night Market; Lamai Night Plaza; Chaweng Night Market food court; Samui Seafood Grill; Zoo Café; Bliss Café

Already in the app — things to do: Big Buddha Temple / วัดพระใหญ่; Wat Plai Laem / วัดปลายแหลม; Hin Ta Hin Yai / หินตาหินยาย; Na Muang Waterfall 1 / น้ำตกหน้าเมือง; Fisherman's Village Walking Street; Maenam Beach / หาดแม่น้ำ; Choeng Mon Beach / หาดเชิงมน; Lipa Noi Beach / หาดลิปะน้อย; Ang Thong National Marine Park / อุทยานแห่งชาติหมู่เกาะอ่างทอง; Samui Elephant Sanctuary; Paradise Park Farm; Kidomo Kids Club; Fun House Samui; Le Blocks Playroom; Central Samui; Chaweng Beach / หาดเฉวง; Secret Buddha Garden (Magic Garden) / สวนลับ ตาร์นิม; Renaissance Art Center; MK Ultra Artists Pottery Studio; Koh Tan; Lamai Viewpoint; Samui Football Golf
