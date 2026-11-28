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

### th-lampang — Lampang, Chae Hom and Mae Moh (Thailand)
Area covered: Lampang, Chae Hom and Mae Moh (also known as / includes: lampang, kad kong ta, mae moh, chae hom, khun tan, lampang luang)

Already in the app — places to eat: Aroy One Baht / อร่อยบาทเดียว; Khao Soi Islam / ข้าวซอยอิสลาม; The Riverside Lampang / ริเวอร์ไซด์ ลำปาง; Krua Mukda / ครัวมุกดา; Mae Hae / แม่แห; Long Jim / หลงจิม; Kad Kong Ta Walking Street / ถนนคนเดินกาดกองต้า; Khanom Chin Pa Bun Si / ขนมจีนป้าบุญศรี; Assawin Market / ตลาดอัศวิน; Central Lampang food court / ศูนย์อาหาร เซ็นทรัล ลำปาง; Khao Soi Mae Fong / ข้าวซอยแม่ฟอง; Mahamitr Coffee / มหามิตร; Cha Bar Cafe Mae Moh / ชาบาร์คาเฟ่ แม่เมาะ; Vital Cafe / ไวทัล คาเฟ่; Phikul Cafe / พิกุล คาเฟ่

Already in the app — things to do: Thai Elephant Conservation Center; Kad Kong Ta weekend walking street; Dhanabadee Ceramic Museum; Chae Son National Park hot springs and waterfall; Wat Phra That Lampang Luang / วัดพระธาตุลำปางหลวง; Lampang horse-carriage ride; Wang Huea Reservoir raft cafés; Wat Phra That Chom Ping; Wat Pong Sanuk Nuea; Mae Wa National Park; Lampang Herb Conservation; Tham Pha Thai National Park cave; Kiu Lom Dam rafts; Bo Nam Rae Bo Nam Ron hot spring; Wat Si Chum (Lampang); Hug You Sheep Farm / ฟาร์มแกะฮักยู; Museum Lampang / มิวเซียมลำปาง; Wat Prathat Doi Prachan / วัดพระธาตุดอยพระฌาน

### th-ayutthaya — Ayutthaya and Kanchanaburi (Thailand)
Area covered: Ayutthaya and Kanchanaburi (also known as / includes: ayutthaya, kanchanaburi, bang pa-in, sangkhlaburi, river kwai, sai yok)

Already in the app — places to eat: Pae Krung Kao / แพกรุงเก่า; Ruan Thai Kung Pao / เรือนไทยกุ้งเผา; Baan Mai Rim Nam / บ้านไม้ริมน้ำ; Malakor Kitchen and Cafe / มะละกอ; Sai Thong River / ไทรทองริเวอร์; Keeree Tara / คีรีธารา; Blue Rice Restaurant by Apple & Noi; On's Thai-Issan; Pa Lek Boat Noodles / ก๋วยเตี๋ยวเรือป้าเล็ก; Bang Lan Night Market / ตลาดโต้รุ่งบางลาน; JJ Night Market Kanchanaburi / ตลาดเจเจ กาญจนบุรี; Roti Sai Mai Abeedeen-Pranom Sangaroon / โรตีสายไหมอาบีดีน-ประนอม แสงอรุณ; Baan Kao Nhom / บ้านข้าวหนม; Busaba Cafe & Bake Lab

Already in the app — things to do: Ayutthaya Historical Park / อุทยานประวัติศาสตร์พระนครศรีอยุธยา; Ayutthaya Historical Study Centre / ศูนย์ศึกษาประวัติศาสตร์พระนครศรีอยุธยา; Chao Sam Phraya National Museum / พิพิธภัณฑสถานแห่งชาติ เจ้าสามพระยา; Ayothaya Floating Market / ตลาดน้ำอโยธยา; Bang Pa-In Palace / พระราชวังบางปะอิน; Elephant Kraal Pavilion / เพนียดคล้องช้างอยุธยา; Chao Phrom Market / ตลาดเจ้าพรหม; Thailand-Burma Railway Centre / ศูนย์รถไฟไทย-พม่า; JEATH War Museum / พิพิธภัณฑ์สงครามเจอาร์ท; Death Railway train to Nam Tok / ทางรถไฟสายมรณะ สะพานข้ามแม่น้ำแคว; Bridge over the River Kwai / สะพานข้ามแม่น้ำแคว; Erawan National Park / อุทยานแห่งชาติเอราวัณ; Chantharakasem National Museum / พิพิธภัณฑสถานแห่งชาติ จันทรเกษม; Baan Hollanda Dutch Village Museum; Bang Sai Royal Folk Arts and Crafts Centre / ศูนย์ศิลปาชีพบางไทร; Ayutthaya Japanese Village; Kanchanaburi Skywalk; Walking Street; Wat Ban Tham; Wat Yai Chaya Mongkol

### th-khonkaen — Khon Kaen (Thailand)
Area covered: Khon Kaen (also known as / includes: khon kaen, phu wiang, kaen nakhon, ubolratana, ban khok sa-nga)

Already in the app — places to eat: Guang Tang Noodles / บะหมี่กวงตัง; Baan Heng / บ้านเฮง; Kaen / แก่น; Wan Kai Yang / วรรณไก่ย่าง; Krua Supanniga / ครัวสุพรรณิการ์; Pho Tha Bo / เฝอท่าบ่อ; Em Oht / เอมโอช; Nam Nueng Lablae / แหนมเนืองลับแล; Pomodoro; Ton Tann Market / ตลาดต้นตาล; Khon Kaen Walking Street / ถนนคนเดินขอนแก่น; Central Khon Kaen food court / ศูนย์อาหาร เซ็นทรัล ขอนแก่น; Godfather Coffee; Kaen Ground

Already in the app — things to do: Khon Kaen Zoo / สวนสัตว์ขอนแก่น; Scientific Centre for Education Khon Kaen / ศูนย์วิทยาศาสตร์เพื่อการศึกษาขอนแก่น; Phu Wiang Dinosaur Museum / ศูนย์ศึกษาวิจัยและพิพิธภัณฑ์ไดโนเสาร์ภูเวียง; Phu Wiang National Park / อุทยานแห่งชาติภูเวียง; Khon Kaen National Museum / พิพิธภัณฑสถานแห่งชาติ ขอนแก่น; Bueng Kaen Nakhon lake park / บึงแก่นนคร; Treasure Hall, Khon Kaen city museum / หอนิทรรศการเมืองขอนแก่น; Ubolratana Dam park / เขื่อนอุบลรัตน์ (เขื่อนพองหนีบ); Ton Tann Market / ตลาดต้นตาล; Si Wiang Dinosaur Park; Xventure Khon Kaen; Chalermphrakiat 72 Phansa Maharachini Park; Turtle Village (Ban Kok); Art Culture Institute, Khon Kaen University; Khon Kaen Philatelic Museum; Phra Mahathat Kaen Nakhon (Wat Nong Waeng) / พระมหาธาตุแก่นนคร วัดหนองแวง; Mikin Farm / มีกิน Farm; Phu Pha Man National Park / อุทยานแห่งชาติภูผาม่าน; Hin Chang Si Viewpoint / จุดชมวิวหินช้างสี; Pha Nok Khao (The Cliff of Owl) / ผานกเค้า

### th-kohchang — Trat and Koh Chang (Thailand)
Area covered: Trat and Koh Chang (also known as / includes: koh chang, ko chang, trat, koh kood, koh kut, ko kut)

Already in the app — places to eat: Kati Culinary / กะทิ คูลินารี; Iyara Seafood / ไอยราซีฟู้ด; Phu-Talay Seafood / ภูทะเล; Nong Bua Seafood / หนองบัวซีฟู้ด; Chowlay Seafood / ชาวเลซีฟู้ด; Salakphet Seafood / สลักเพชรซีฟู้ด; Saeng Fah / แสงฟ้า; Namchok / น้ำโชค; Kiew Nong Bua / เกี๊ยวหนองบัว; Trat Night Market / ตลาดโต้รุ่งตราด; White Sand Beach night stalls / ร้านรถเข็นกลางคืน หาดทรายขาว; Papa’s Deli; Crust Bakery; Marco ristorante Italiano e pizzeria; Pizza King Express; Saaitara Restaurant; Tonsai Restaurant

Already in the app — things to do: Than Mayom Waterfall / น้ำตกธารมะยม; Khlong Phlu Waterfall / น้ำตกคลองพลู; White Sand Beach (Hat Sai Khao) / หาดทรายขาว; Klong Prao Beach / หาดคลองพร้าว; Kai Bae Beach / หาดไก่แบ้; Kai Bae viewpoint / จุดชมวิวไก่แบ้; Bang Bao fishing village / บ้านบางเบ้า; Trat City Museum / พิพิธภัณฑสถานเมืองตราด; Changthun Eco-Museum / นิเวศพิพิธภัณฑ์บ้านช้างทูน; Salak Khok mangrove boat ride / ล่องเรือกอนโดล่าเมืองไทย บ้านสลักคอก; Salak Phet mangrove boardwalk; Tree Top Adventure Park Koh Chang; Laem Chaichet sunset point; Ban Dan Mai community bike ride; White Sand Beach viewpoint; Napalai Cooking School; Ban Suan Cooking School
