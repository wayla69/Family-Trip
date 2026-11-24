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

### pl-krakow — Kraków (Poland)
Area covered: Kraków (also known as / includes: krakow, cracow, wawel, zakopane, wieliczka, warsaw)

Now in the app: 25 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Pod Wawelem Kompania Kuflowa; Morskie Oko; Pod Aniołami; Miód Malina; Restauracja Starka; Kuchnia u Doroty; Pierogarnia Krakowiacy; Czarna Kaczka; Ariel; Bar Mleczny Pod Temidą; Polakowski; Plac Nowy Okrąglak; Good Lood; Café Camelot; Nowa Prowincja; Charlotte Chleb i Wino; Biała Róża; Kogel Mogel; Cafe Oranżeria; Farina; Amarylis Restaurant; Szara Gęś w Kuchni; Orangery; ORZO; Pół na Pół

Already in the app — things to do: Wawel Royal Castle / Zamek Królewski na Wawelu; Rynek Underground; Barbican / Barbakan; Wieliczka Salt Mine / Kopalnia Soli Wieliczka; Museum of Engineering and Technology, tram depot / Muzeum Inżynierii i Techniki, Zajezdnia; Polish Aviation Museum / Muzeum Lotnictwa Polskiego; Kościuszko Mound / Kopiec Kościuszki; Henryk Jordan Park / Park Jordana; Kraków Christmas Market / Jarmark Bożonarodzeniowy; Vistula river cruise / Rejs po Wiśle; Kraków Zoo / Ogród Zoologiczny w Krakowie; Stanisław Lem Garden of Experiences / Ogród Doświadczeń im. Stanisława Lema; Energylandia (Zator) / Energylandia; Kraków Water Park / Park Wodny w Krakowie; Dragon's Den / Smocza Jama; Sukiennice (Cloth Hall) art gallery / MNK Sukiennice; GOjump! indoor playground / GoJump; Kraków Pinball Museum; House of Attractions

### th-chiangmai — Chiang Mai and Chiang Rai (Thailand)
Area covered: Chiang Mai and Chiang Rai (also known as / includes: chiang mai, chiang rai, doi suthep, doi inthanon)

Now in the app: 17 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Khao Soi Khun Yai / ข้าวซอยคุณยาย; Khao Soi Mae Sai / ข้าวซอยแม่สาย; Khao Soi Lam Duan Fa Ham / ข้าวซอยลำดวนฟ้าฮ่าม; Huen Phen / เฮือนเพ็ญ; Tong Tem Toh / ต๋องเต็มโต๊ะ; SP Chicken / เอสพี ไก่ย่าง; Huen Muan Jai / เฮือนม่วนใจ๋; Ginger Farm Kitchen; Lu Lam / หลู้ลำ; Khao Soi Pho Jai / ข้าวซอยพอใจ; Khao Kha Moo Chang Phueak / ข้าวขาหมูช้างเผือก; Warorot Market / กาดหลวง (ตลาดวโรรส); Chiang Rai Night Bazaar / เชียงรายไนท์บาซาร์; Fern Forest Cafe; Cheevit Cheeva / ชีวิต ชีวา; Chivit Thamma Da / ชีวิตธรรมดา; Ohkajhu (San Sai) / โอ้กะจู๋ สาขาสันทราย

Already in the app — things to do: Chiang Mai Zoo; Chiang Mai Night Safari; Wat Phra That Doi Suthep; Royal Park Rajapruek; Bua Tong Sticky Waterfall; Sunday Walking Street; Warorot Market; Elephant Nature Park; Chiang Mai City Arts and Cultural Centre; Nong Buak Haad Public Park; Wat Chedi Luang; Huay Tung Tao Lake; Queen Sirikit Botanic Garden; Baan Kang Wat; Mon Cham; Pai Canyon (Kong Lan); Pai Walking Street; Sai Ngam hot spring; Boon Ko Ku So bamboo bridge; Lanna Folklife Museum; Chiang Mai National Museum; Art in Paradise Chiang Mai; Grand Canyon Water Park / แกรนด์แคนยอน วอเตอร์ปาร์ค; Ban Dam Museum / พิพิธภัณฑ์บ้านดำ; Wat Rong Khun (the White Temple); Elephant POOPOOPAPER Park; Mae Fah Luang Art and Cultural Park

### th-pattaya — Pattaya and the Chonburi coast (Thailand)
Area covered: Pattaya and the Chonburi coast (also known as / includes: pattaya, koh larn, jomtien, sattahip, bang saen, si racha)

Now in the app: 24 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Mum Aroi (Naklua) / มุมอร่อย นาเกลือ; Pupen Seafood / ปูเป็น ซีฟู้ด; The Glass House; Rimpa Lapin / ริมผาลาพิน; Lung Sawai Seafood / ลุงไสว ซีฟู๊ด; The Sky Gallery; Suttangrak Pattaya / สุดทางรัก พัทยา; Preecha Seafood / ปรีชา ซีฟู้ด; Lan Pho Naklua Market / ตลาดลานโพธิ์นาเกลือ; Pier 21 Food Court (Terminal 21 Pattaya) / เพียร์ 21 เทอร์มินอล 21 พัทยา; Nong Mon Market / ตลาดหนองมน; La Baguette; The Chocolate Factory Pattaya; Cabbages & Condoms; Nara Thai Cuisine; Ruenthai; Leng Kee; Glass House Silver; Thepprasit Night Market; Tess Vegan Cafe; The Coffee Club (Central Pattaya); Sizzler (Central Festival Pattaya Beach); The Pizza Company (Central Festival Pattaya Beach); Benihana (Avani Pattaya)

Already in the app — things to do: Sanctuary of Truth; Art in Paradise Pattaya; Underwater World Pattaya; Khao Kheow Open Zoo; Ramayana Water Park; Mini Siam; Phra Tamnak Viewpoint; Lan Pho Naklua Park; Thepprasit Night Market; Koh Larn; Pattaya Floating Market; Frost Magical Ice of Siam; Columbia Pictures Aquaverse; Jomtien Beach; Terminal 21 Pattaya; Pattaya Water Park; Harborland; Monster Aquarium; Ripley's Believe It or Not; Nong Nooch Tropical Garden

### th-udon — Udon Thani (Thailand)
Area covered: Udon Thani (also known as / includes: udon thani, red lotus sea, kumphawapi, nong han kumphawapi, ban chiang, phu phrabat)

Now in the app: 18 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: VT Namnueng (Posri) / วีที แหนมเนือง; Madam Pahtehh 2515 / มาดามพาเท่ห์; Krua Khun Nid / ครัวคุณนิด; Rabiang Patchanee / ระเบียงพัชนี; Kao Piak Sen / ข้าวเปียกเส้น; Lab Mu Worachai / ลาบหมูวรชัย; Som Tam Je Kai / ส้มตำเจ๊ไก่; UD Town / ยูดี ทาวน์; Central Udon food court / ศูนย์อาหาร เซ็นทรัล อุดร; Preecha Night Market / ตลาดปรีชา; Beyond Cafe; Mavin Coffee Roaster; Option Coffee Bar; Maeya / แม่หยา; Bueng Mai Hom Garden Restaurant / สวนอาหารบึงไม้หอม; Dose Factory; Sa Muay & Sons / ซาหมวย แอนด์ ซันส์; King's Osha / คิงส์โอชา

Already in the app — things to do: World Horticultural Expo Udon Thani / มหกรรมพืชสวนโลกอุดรธานี 2569; Red Lotus Sea (Nong Han Kumphawapi) / ทะเลบัวแดง; Phu Phrabat Historical Park / อุทยานประวัติศาสตร์ภูพระบาท; Ban Chiang National Museum / พิพิธภัณฑสถานแห่งชาติ บ้านเชียง; Nong Prajak Park / หนองประจักษ์ศิลปาคม; Central Udon / เซ็นทรัล อุดรธานี; Udon City Walking Street / ถนนคนเดินหน้าศาลหลักเมือง; Udon Thani City Museum; Udon Sunshine Orchid Garden; Phu Foi Lom Park; Than Ngam Waterfall; Nong Samrong Reservoir; Huai Luang Reservoir; Ban Chiang Tai Phuan community; Na Kha silk village; Pa Phu Kon Temple / วัดป่าภูก้อน; Kham Chanod / คำชะโนด; Santiwanaram Temple / วัดสันติวนาราม; Sa Mani Temple / วัดสระมณี; Thai-Chinese Cultural Center / ศูนย์วัฒนธรรมไทย-จีน; Natural Park / Monkey Park / สวนธรรมชาติ/ สวนลิง; Na Yung - Nam Som National Park / อุทยานแห่งชาตินายูง-น้ำโสม; Tat Noi Waterfall / น้ำตกตาดน้อย; Khiri Wong Kot Village / หมู่บ้านคีรีวงกต; Udon Water World / อุดรวอเตอร์เวิล์ด สวนน้ำ; Thung Si Mueang / ทุ่งศรีเมือง
