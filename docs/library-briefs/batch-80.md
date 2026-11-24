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

### vn-phuquoc — Phu Quoc (Vietnam)
Area covered: Phu Quoc (also known as / includes: phu quoc, hon thom, sunset town)

Now in the app: 20 places to eat, 24 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Crab House; Xin Chào; Saigonese Eatery; Ra Khơi; The Spice House at Cassia Cottage; Ganesh Indian Restaurant; Trùng Dương Marina; Bup Restaurant; Chợ đêm Phú Quốc; Bún Quậy Kiến Xây; Bún Kèn Út Lượm; Buddy Ice Cream & Info Café; Chuồn Chuồn Bistro; Phu Quoc Bee Farm; Mecato; Clubhouse Restaurant (Premier Residences); Paradiso Restaurant; Huong Bien Restaurant; Hủ Tiếu Mực Tư Hường; Mai Hương Beachfront

Already in the app — things to do: VinWonders Phu Quoc; Vinpearl Safari Phu Quoc; Hon Thom Cable Car / Cáp treo Hòn Thơm; Aquatopia Water Park; Grand World Phu Quoc; Teddy Bear Museum; Grand World Gondola Ride; Kiss of the Sea show / Nụ hôn của biển cả; Sunset Town; Sao Beach / Bãi Sao; Starfish Beach / Rạch Vẹm; Phu Quoc Night Market / Chợ đêm Phú Quốc; Duong Dong Market / Chợ Dương Đông; Phu Quoc pepper farms; Ho Quoc Pagoda / Thiền viện Trúc Lâm Hộ Quốc; Dinh Cau Shrine / Dinh Cậu; Ham Ninh fishing village / Làng chài Hàm Ninh; Cội Nguồn Museum / Bảo tàng Cội Nguồn; Ngọc Hiền Pearl Farm / Ngọc Hiền Pearl; Phú Quốc National Park / Vườn quốc gia Phú Quốc; Suối Tranh Waterfall / Khu du lịch Suối Tranh; Ông Lang Beach / Bãi Ông Lang; Bãi Dài Beach / Bãi Dài; Khem Beach / Bãi Khem

### za-capetown — Cape Town (South Africa)
Area covered: Cape Town (also known as / includes: cape town, table mountain, cape point, cape of good hope, bo-kaap, kirstenbosch)

Now in the app: 21 places to eat, 23 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Mariner's Wharf; Biesmiellah; Bo-Kaap Kombuis; Café Paradiso; Deer Park Café; Willoughby & Co; Harbour House Kalk Bay; Jonkershuis; Two Oceans Restaurant; Seaforth Restaurant; Time Out Market Cape Town; Oranjezicht City Farm Market; Kalky's; Charly's Bakery; The Creamery; Kirstenbosch Tea Room; Café Roux (Noordhoek); Dunes Beach Restaurant; Massimo's; The Foodbarn; Good Thyme Café

Already in the app — things to do: Table Mountain Aerial Cableway; Two Oceans Aquarium; Kirstenbosch National Botanical Garden; Boulders Beach penguin colony; Cape of Good Hope and the Flying Dutchman Funicular; Cape Town Science Centre; Iziko Planetarium and South African Museum; Green Point Urban Park; Cape Wheel; Neighbourgoods Market; Seal Island boat cruise from Hout Bay; V&A Waterfront marine wildlife trail; Scratch Patch; Muizenberg Beach; Imhoff Farm farmyard and Snake Park; World of Birds; Vergenoegd duck parade; Stodels Nursery animal park; Princess Vlei trail; Noordhoek Common fairy trail; Paradise Park; Battery Park; The Bike Park at Constantia Uitsig

### ch-geneva — Geneva and Lake Léman (Switzerland)
Area covered: Geneva and Lake Léman (also known as / includes: geneva, geneve, genf, montreux, lausanne, chillon)

Now in the app: 21 places to eat, 24 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Café du Soleil; Les Armures; Chez ma Cousine; Café de Paris; Auberge de Savièse; Café Romand; Pinte Besson; La Crêperie d'Ouchy; Le Museum; La Buvette des Bains des Pâquis; Manora Restaurant Genève; Halle de Rive; Gelatomania; Confiserie Zurcher; La Storia; Inglewood (Eaux-Vives); Molino (Molard); The Hamburger Foundation (Pâquis); Café du MEG; Un R de Famille; Auberge du Chalet des Enfants

Already in the app — things to do: Jet d'Eau / Jet d'eau de Genève; Bains des Pâquis; Mouettes Genevoises lake shuttle; International Red Cross and Red Crescent Museum / Musée international de la Croix-Rouge; Museum of Art and History / Musée d'art et d'histoire (MAH); Geneva Botanical Garden / Conservatoire et Jardin botaniques; Salève cable car / Téléphérique du Salève; La Garenne animal park; Swiss Vapeur Parc; CERN Science Gateway; Maison Tavel; Museum of Ethnography Geneva (MEG); Parc des Bastions and the giant chess boards; Jardin Anglais and the Flower Clock; Parc La Grange and the rose garden; Bois de la Bâtie; AIRLOOP; Geneva Adventure Park (Evaux) / Parc Aventure des Evaux; Chaplin’s World; The Olympic Museum; AQUATIS Aquarium-Vivarium; Sauvabelin; Zoology museum, Palais de Rumine / Naturéum – département de zoologie; Lausanne Botanical Garden

### ee-tallinn — Tallinn (Estonia)
Area covered: Tallinn (also known as / includes: tallinn, toompea, viru gate, kadriorg, riga, vilnius)

Now in the app: 22 places to eat, 23 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Olde Hansa; Rataskaevu 16; Väike Rataskaevu 16; Peppersack; F-Hoone; Kompressor; III Draakon; Balti Jaama Turg; Lido Solaris; Maiasmokk; Pierre Chocolaterie; RØST; Kehrwieder Saiakang; Restoran Nero; Lore Bistroo; City Grill House; NOP; Talleke ja Pullike (Kakumäe); Pann&Kook; Gourmet Coffee (Kadriorg); Kohvik Boheem; Vapiano (Hobujaama)

Already in the app — things to do: Seaplane Harbour (Lennusadam) / Lennusadam; Estonian Open Air Museum / Eesti Vabaõhumuuseum; Tallinn Zoo / Tallinna Loomaaed; Children's Museum Miiamilla / Lastemuuseum Miiamilla; Kumu Art Museum / Kumu kunstimuuseum; Energy Discovery Centre / Energia avastuskeskus; Tallinn TV Tower / Tallinna teletorn; Tallinn Botanic Garden / Tallinna Botaanikaaed; Tallinn Old Town / Tallinna vanalinn; Kadriorg Park / Kadrioru park; Balti Jaama Turg market / Balti jaama turg; Tallinn Christmas Market / Tallinna jõuluturg; Kiek in de Kök and Bastion Tunnels / Kiek in de Kök; Science Centre SkyLab / Teaduskeskus SkyLab; PROTO Invention Factory / PROTO avastustehas; Pirita Beach; Tallinn City Museum / Tallinna Linnamuuseum; Lohesaba adventure park / Lohesaba seikluslinnak; St Olaf’s Church tower; St Catherine’s Passage / Katariina käik; Kohtuotsa viewpoint; Pirita Convent ruins; Telliskivi flea market / Telliskivi Kirbukas
