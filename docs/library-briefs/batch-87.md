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

### th-kohchang — Trat and Koh Chang (Thailand)
Area covered: Trat and Koh Chang (also known as / includes: koh chang, ko chang, trat, koh kood, koh kut, ko kut)

Now in the app: 17 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Kati Culinary / กะทิ คูลินารี; Iyara Seafood / ไอยราซีฟู้ด; Phu-Talay Seafood / ภูทะเล; Nong Bua Seafood / หนองบัวซีฟู้ด; Chowlay Seafood / ชาวเลซีฟู้ด; Salakphet Seafood / สลักเพชรซีฟู้ด; Saeng Fah / แสงฟ้า; Namchok / น้ำโชค; Kiew Nong Bua / เกี๊ยวหนองบัว; Trat Night Market / ตลาดโต้รุ่งตราด; White Sand Beach night stalls / ร้านรถเข็นกลางคืน หาดทรายขาว; Papa’s Deli; Crust Bakery; Marco ristorante Italiano e pizzeria; Pizza King Express; Saaitara Restaurant; Tonsai Restaurant

Already in the app — things to do: Than Mayom Waterfall / น้ำตกธารมะยม; Khlong Phlu Waterfall / น้ำตกคลองพลู; White Sand Beach (Hat Sai Khao) / หาดทรายขาว; Klong Prao Beach / หาดคลองพร้าว; Kai Bae Beach / หาดไก่แบ้; Kai Bae viewpoint / จุดชมวิวไก่แบ้; Bang Bao fishing village / บ้านบางเบ้า; Trat City Museum / พิพิธภัณฑสถานเมืองตราด; Changthun Eco-Museum / นิเวศพิพิธภัณฑ์บ้านช้างทูน; Salak Khok mangrove boat ride / ล่องเรือกอนโดล่าเมืองไทย บ้านสลักคอก; Salak Phet mangrove boardwalk; Tree Top Adventure Park Koh Chang; Laem Chaichet sunset point; Ban Dan Mai community bike ride; White Sand Beach viewpoint; Napalai Cooking School; Ban Suan Cooking School; Chao Pho Koh Chang shrine; Wat Salak Phet; Lonely Beach (Hat Tha Nam); Hat San Chao, Koh Rang Yai; Khlong Nonsi waterfall

### th-ubon — Ubon Ratchathani (Thailand)
Area covered: Ubon Ratchathani (also known as / includes: ubon ratchathani, ubon, khong chiam, pha taem, sam phan bok, kaeng tana)

Now in the app: 15 places to eat, 24 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Indochine / อินโดจีน; Samchai Coffee (Thepyothi) / สามชัยกาแฟ; Sam Chai Kai Yang / สามชัยไก่ย่าง; Porntip Kai Yang Wat Jaeng / พรทิพย์ไก่ย่างวัดแจ้ง; Guay Jub Ubon / ก๋วยจั๊บอุบล; a-ga-ve Café & Restaurant / อากาเว่; Chiokee / เจียวกี่; Kuay Jap Tor Bor / ก๋วยจั๊บ ทบ.; Ubon Ocha / อุบลโอชา; Ubon Night Market / ตลาดโต้รุ่งราชบุตร; Central Ubon food court / ศูนย์อาหาร เซ็นทรัล อุบล; Abe Specialty Coffee; Arabus Experience Café / อาราบัส; Warichjitrana Cafe & Farm; Khwam Song Cham (Memory) Cafe

Already in the app — things to do: Ubon Ratchathani National Museum / พิพิธภัณฑสถานแห่งชาติ อุบลราชธานี; Ubon Ratchathani Science Centre for Education / ศูนย์วิทยาศาสตร์เพื่อการศึกษาอุบลราชธานี; Ubon Ratchathani Zoo / สวนสัตว์อุบลราชธานี; Pha Taem National Park / อุทยานแห่งชาติผาแต้ม; Two-colour river viewpoint / แม่น้ำสองสี; Sirindhorn Dam / เขื่อนสิรินธร; Nong Bua Public Park / สวนสาธารณะหนองบัว; Central Ubon / เซ็นทรัล อุบลราชธานี; Thung Sri Muang night market / ทุ่งศรีเมือง; Kaeng Tana National Park; Huai Luang Waterfall; Warin Chamrap market; Pattaya Noi, Sirindhorn Dam; Sam Phan Bok; Saeng Chan Waterfall; Wat Sirindhorn Wararam; Wat Phra That Nong Bua; Wat Thung Si Mueang; Golden Monument of Thung Sri Mueang; Sao Chaliang; Thung Na Mueang Waterfalls; Wat Tham Heo Sin Chai; Wat Nong Pah Pong / วัดหนองป่าพง; Wat Tham Khuha Sawan / วัดถ้ำคูหาสวรรค์

### gr-santorini — Santorini (Greece)
Area covered: Santorini (also known as / includes: santorini, oia, fira, thira, mykonos, cyclades)

Now in the app: 19 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Naoussa / Ναούσα; Pelican Kipos; Metaxi Mas / Μεταξύ Μας; Dimitris Ammoudi Taverna; Roka / Ρόκα; To Psaraki / Το Ψαράκι; The Good Heart; The Cave of Nikolas; Anogi / Ανώγι; Lucky's Souvlakis; Pitogyros; Yogi Gyro; Lolita's Gelato; Melenio; Solo Gelato; Cava Alta; Oia Gefsis; Mes Amis; Anemomilos Traditional Greek Taverna

Already in the app — things to do: Akrotiri archaeological site / Ακρωτήρι; Museum of Prehistoric Thera / Μουσείο Προϊστορικής Θήρας; Fira cable car / Τελεφερίκ Θήρας; Ancient Thera / Αρχαία Θήρα; Lost Atlantis Experience; Koutsoyannopoulos Wine Museum / Μουσείο Οίνου Κουτσογιαννόπουλου; Naval Maritime Museum of Oia / Ναυτικό Μουσείο Οίας; Megaro Gyzi Museum / Μέγαρο Γκύζη; Lignos Folklore Museum / Λαογραφικό Μουσείο Λιγνού; Volcano and hot springs boat trip; Perissa beach / Περίσσα; Kamari beach / Καμάρι; Fira to Oia caldera walk; Tomato Industrial Museum; Oia village / Οία; Red Beach; White Beach; Kamari Open Air Cinema; Monolithos Beach

### ma-fes — Fes, Chefchaouen and Meknes (Morocco)
Area covered: Fes, Chefchaouen and Meknes (also known as / includes: fes, fes el bali, chefchaouen, chaouen, meknes, volubilis)

Now in the app: 20 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Café Clock Fez; The Ruined Garden; Dar Hatim; Chez Rachid; Thami's; Fez Café; Bab Ssour; Restaurant Aladdin; Restaurant Tissemlal; Café Clock Chefchaouen; Collier de la Colombe; Bab Boujloud food stalls; Borj Fez Mall food court; Place el-Hedim food stalls; Made in M; Cinema Café; The Morisco Terrace; Assaada; Restaurant Hamsa; Bilmos Cafe

Already in the app — things to do: Jnan Sbil Gardens / Jardin Jnan Sbil; Fes el-Bali medina / فاس البالي; Chouara Tannery viewpoint / Tannerie Chouara; Nejjarine Museum of Wooden Arts and Crafts / Musée Nejjarine; Dar Batha Museum / Musée Dar Batha; Borj Nord arms museum / Borj Nord; Volubilis Roman ruins / Volubilis; Heri es-Souani granaries / Heri es-Souani; Azrou cedar forest and Ifrane / Forêt de cèdres d'Azrou; Ras el Maa waterfall, Chefchaouen / Ras El Maa; Chefchaouen Kasbah and museum / Kasbah Chefchaouen; Bab Boujloud (the Blue Gate); Bou Inania Madrasa; Al-Attarine Madrasa; Merenid Tombs viewpoint; Spanish Mosque viewpoint / Bouzafer Mosque; Bab Mansour / Bab el-Mansour; Mausoleum of Moulay Ismail
