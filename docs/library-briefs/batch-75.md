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

### th-chanthaburi — Chanthaburi (Thailand)
Area covered: Chanthaburi (also known as / includes: chanthaburi, chantaburi, chanthaboon, chao lao, kung krabaen, namtok phlio)

Now in the app: 20 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Chanthorn Phochana / จันทรโภชนา; Kuay Jap Pa Mai / ก๋วยจั๊บป้าไหม; Farm Pu Nim / ฟาร์มปูนิ่ม; The Tamajun Restaurant; Krua Lung Choey / ครัวลุงเชย; Jae Eid Tom Yam Seafood Noodles / เจ๊อี๊ด ก๋วยเตี๋ยวต้มยำทะเล; Nam Phu Market / ตลาดน้ำพุ; Chanthaboon Waterfront Walking Street / ถนนคนเดินชุมชนริมน้ำจันทบูร; Robinson Chanthaburi food court / ศูนย์อาหาร โรบินสัน จันทบุรี; Central Chanthaburi food court / ศูนย์อาหาร เซ็นทรัล จันทบุรี; Khanom Khai Pa Tai / ขนมไข่ป้าไต๊; Rocket Ice Cream / ไอศกรีมตราจรวด; Baan Luang Rajamaitri cafe / บ้านหลวงราชไมตรี; Sweet at Moon; Koff House Coffee Bar & Eatery; Soi Dao Restaurant; Shabu Phu Ing Dao / ชาบู ภูอิงดาว; Je Nong Ao Yang; Yai Tu Seafood; Thong Nathi Seafood / ร้านอาหารท่องนที

Already in the app — things to do: Chanthaboon Waterfront Community; Chanthaburi gem market; National Maritime Museum, Noen Wong; Namtok Phliu National Park; Kung Krabaen Bay Royal Development Study Centre; Kung Krabaen mangrove walkway; Khao Khitchakut National Park / อุทยานแห่งชาติเขาคิชฌกูฏ; Chanthaburi Cathedral; King Taksin Maharat Public Park; Hat Chao Lao; Laem Sadet beach; Chanthaburi Herb Garden; Bang Sra Kao mat-weaving village; Wat Khao Sukim; Khao Laem Sing Forest Park; Krathing Waterfall; Khao Sip Ha Chan Waterfall; Trok Nong Waterfall; Khao Phloi Waen; Noen Nang Phaya Viewpoint; Hat Khung Wiman; Samet Ngam Shipyard (King Taksin's shipyard) / อู่ต่อเรือเสม็ดงาม; Red Building and Khuk Khi Kai / ตึกแดงและคุกขี้ไก่; Wat Phai Lom / วัดไผ่ล้อม; Laem Sing Beach / หาดแหลมสิงห์; Khaem Nu Beach / หาดแขมหนู

### th-khaoyai — Khao Yai and Pak Chong (Thailand)
Area covered: Khao Yai and Pak Chong (also known as / includes: khao yai, pak chong, wang nam khiao, thap lan)

Now in the app: 24 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Krua Khao Yai / ครัวเขาใหญ่; Pen Lao / เป็นลาว; Dairy Home / แดรี่โฮม; Chokchai Steakhouse / โชคชัยสเต็กเฮาส์; Midwinter Green; The Great Hornbill Grill; Yungkhaow Khaoyai / ยุ้งข้าว เขาใหญ่; Ban Mai Chay Nam / บ้านไม้ชายน้ำ; Pak Chong Night Market / ตลาดไนท์บาซาร์ปากช่อง; Rai Suwan / ไร่สุวรรณ; The Chocolate Factory Khao Yai; Umm!.. Milk / อืมม!..มิลค์; Yellow Submarine Coffee Tank; Like A Mountain / ไลค์ อะ เมาท์เท่น; EL Cafe / เอล คาเฟ่; Pirom Cafe / ภิรมย์ คาเฟ่; Blossom Bloom / บลอสซั่ม บลูม; Banyakart Khaoyai / บรรยากาศ เขาใหญ่; Donghouse / บ้านดง; Floryday Khaoyai Cafe & Flower / ฟลอรี่เดย์ เขาใหญ่ คาเฟ่ แอนด์ ฟลาวเวอร์; Rosebay Home Cooking & Cafe / โรสเบย์ โฮม คุกกิ้ง แอนด์ คาเฟ่; KHAAM Khaoyai / ขาม เขาใหญ่; Olna x PY Roasters / โอลนา พีวาย โรสเตอร์ส; Krua Baan Rao Eng (Khao Yai) / ครัวบ้านเราเอง เขาใหญ่

Already in the app — things to do: Khao Yai National Park / อุทยานแห่งชาติเขาใหญ่; Farm Chokchai / ฟาร์มโชคชัย; Khao Yai Art Museum / เขาใหญ่ อาร์ต มิวเซียม; Khao Yai Art Forest; Scenical World / Scenical World Khao Yai; Pak Chong Night Market / ตลาดโต้รุ่งปากช่อง; PB Valley Khao Yai Winery; The Chocolate Factory Khao Yai / The Chocolate Factory Khaoyai; Primo Piazza; Mae Mon Mulberry Farm and Café; Flora Park Learning Centre; Klang Phana Rose Garden; Haew Suwat Waterfall; Takrao Waterfall; Lam Phra Phloeng Reservoir; Kong Kaew Waterfall; Pha Kluai Mai Waterfall; Nong Phak Chi Observation Tower; Haew Narok Waterfall / น้ำตกเหวนรก; Khao Yai Farm Village; Star Doi Farm (Khao Yai) / สตาร์ดอยฟาร์ม เขาใหญ่; Bonanza Exotic Zoo

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
