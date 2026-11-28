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

### th-lipe — Satun and Koh Lipe (Thailand)
Area covered: Satun and Koh Lipe (also known as / includes: koh lipe, satun, tarutao, pak bara, koh adang, thale ban)

Already in the app — places to eat: Nee Papaya / นีปาปาย่า; Papaya Mom / ปาปาย่ามัม; Rak Lay Seafood / รักเล ซีฟู้ด; King Crab; On The Rocks; Castaway Restaurant; Nong Nee / น้องณี; On’s Restaurant; Koh Lipe Walking Street / ถนนคนเดินเกาะหลีเป๊ะ; Satun Night Market / ตลาดโต้รุ่งสตูล; Elephant Koh Lipe; Thai Lady Pancake; Cafe Lipe; THE BOX; Progress Seafood Buffet; Bombay Indian Restaurant; The Cove Bistro Restaurant

Already in the app — things to do: Pattaya Beach, Koh Lipe / หาดพัทยา เกาะหลีเป๊ะ; Sunrise Beach, Koh Lipe / หาดซันไรส์ เกาะหลีเป๊ะ; Koh Lipe Walking Street / วอล์กกิ้งสตรีท หลีเป๊ะ; Snorkelling trip to Koh Rawi and Koh Adang / เกาะราวี เกาะอาดัง; Koh Adang / เกาะอาดัง; Koh Lidi Lek / เกาะลิดีเล็ก; Thale Ban National Park / อุทยานแห่งชาติทะเลบัน; Satun National Museum (Kuden Mansion) / พิพิธภัณฑ์สถานแห่งชาติ สตูล คฤหาสน์กูเด็น; Satun Geopark Museum / พิพิธภัณฑ์ธรณีวิทยาสตูล จีโอพาร์ค; Wang Sai Thong Waterfall; Than Plio Waterfall; Bridge Across Time, Petra Islands National Park; Pak Bara Beach; Phu Pha Phet Cave; Sunset Beach, Koh Lipe; Sanom Beach; Kla Island; Koh Tarutao

### th-nakhonsi — Nakhon Si Thammarat and Khanom (Thailand)
Area covered: Nakhon Si Thammarat and Khanom (also known as / includes: nakhon si thammarat, khiriwong, khanom beach, sichon)

Already in the app — places to eat: Krua Nakhon / ครัวนคร; Khanom Jeen Mueang Khon / ขนมจีนเมืองคอน; Chao Ruea / ชาวเรือ; Krua Nai Nang / ครัวนายหนัง; Ao Khanom Seafood / อ่าวขนอมซีฟู้ด; Na Phra That Saturday Market / หลาดหน้าพระธาตุ; Central Nakhon Si food court / ศูนย์อาหาร เซ็นทรัล นครศรี; Kopi / โกปี๊; Hao Coffee / เฮาคอฟฟี่; Likor Baan Tham Khanom / ลิกอร์ บ้านทำขนม; Swansea Cafe

Already in the app — things to do: Nakhon Si Thammarat National Museum / พิพิธภัณฑสถานแห่งชาติ นครศรีธรรมราช; Walailak University Botanical Garden / อุทยานพฤกษศาสตร์ มวล.; Hat Khanom–Mu Ko Thale Tai National Park / อุทยานแห่งชาติหาดขนอม-หมู่เกาะทะเลใต้; Khao Luang National Park / อุทยานแห่งชาติเขาหลวง; Phrom Lok Waterfall / น้ำตกพรหมโลก; Suchart Subsin shadow-puppet workshop; Wat Phra Mahathat Woramahawihan; Hat Sichon; Hat Nai Phlao; Hat Hin Ngam; Ban Wang Hon bamboo rafting; Hat Sai Kaeo Museum; Namtok Sunantha (Khao Nan National Park); Krung Ching hot spring; Thong Yee Bay; Ao Telet Wooden Bridge / สะพานไม้อ่าวเตล็ด; Tha Phae Waterfall / น้ำตกท่าแพ; Khao Wang Thong Cave / ถ้ำเขาวังทอง; Wynd Voyage; Nakhon Si Thammarat City Museum / พิพิธภัณฑ์เมืองนครศรีธรรมราช; Buddhism Park / อุทยานพระพุทธศาสนา; Mahanakhon Walking Street / มาหานคร; Pancake Rock / เขาหินพับผ้า; Khao Sun Viewpoint / จุดชมวิวทะเลหมอกเขาศูนย์; Thung Song Water Park / สวนน้ำทุ่งสง วอเตอร์พาร์ค

### th-hatyai — Hat Yai and Songkhla (Thailand)
Area covered: Hat Yai and Songkhla (also known as / includes: hat yai, songkhla, samila, koh yor, khao seng)

Already in the app — places to eat: Jae Lek Thai Restaurant / ร้านอาหารไทยเจ๊เล็ก; Nai Wan / ร้านนายหวาน; Chokdee Dim Sum / โชคดีแต่เตี๊ยม; Kai Tod Decha / ไก่ทอดเดชา; Ko Tee Ocha / โกตี๋โอชา; Ar Restaurant / อ้า; Tae Hiang Aew / แต้เฮี้ยงอิ้ว; Kiat Fang / เกียดฟั่ง; Kim Yong Market / ตลาดกิมหยง; Greenway Night Market / กรีนเวย์ไนท์มาร์เก็ต; Khlong Hae Floating Market / ตลาดน้ำคลองแห่; Central Hatyai food court / ศูนย์อาหาร เซ็นทรัล หาดใหญ่; Ice Cream Yiu / ไอศกรีมยิว; Ice Cream Ong / ไอติมโอ่ง; Khanom Khai Pa Mon / ขนมไข่ป้ามล; Hakuna Matata Cafe; More Than Me Cafe; Danuphum Cafe Farm; Aunt Toi's Shop

Already in the app — things to do: Songkhla Zoo / สวนสัตว์สงขลา; Hat Yai Municipal Park and cable car / สวนสาธารณะเทศบาลนครหาดใหญ่; Khlong Hae Floating Market / ตลาดน้ำคลองแห; Ton Nga Chang Waterfall / น้ำตกโตนงาช้าง; Samila Beach and the Golden Mermaid / แหลมสมิหลา; Songkhla Old Town / เมืองเก่าสงขลา; Kim Yong Market / ตลาดกิมหยง; Greenway Night Market / ตลาดกรีนเวย์; Jumptopia at Central Hatyai / Jumptopia Central Hatyai; Magic Museum Hatyai; Songkhla National Museum / พิพิธภัณฑสถานแห่งชาติ สงขลา; Pa Thammarong Museum; Khao Tang Kuan; Khao Noi; Folklore Museum, Institute for Southern Thai Studies; Mini Zoo Hat Yai / มินิซู หาดใหญ่; Hat Yai Science and Astronomy Learning Centre / ศูนย์การเรียนรู้วิทยาศาสตร์และดาราศาสตร์ หาดใหญ่

### th-trang — Trang and its islands (Thailand)
Area covered: Trang and its islands (also known as / includes: trang, koh mook, koh kradan, koh ngai, kantang, pak meng)

Already in the app — places to eat: Phong Ocha 1 / พงษ์โอชา 1; Ruan Thai Dim Sum / เรือนไทยติ่มซำ; Jip Khao / จีบขาว; Sinjew / ซินจิว; Khao Tom Pui / ข้าวต้มพุ้ย; Sin Ocha / สินโอชา; Richy / ริชชี่; Hilltop Restaurant; Trang Station Night Market / ตลาดนัดกลางคืนหน้าสถานีรถไฟตรัง; Cinta Garden / ชินตา การ์เด้น; Ko Pi / โกปี๊; Kook Ming Cake / เค้กขุกมิ่ง; Yu Chiang / ยู่เชียง; Cha Nai Seafood / จ๊ะไหนซีฟู้ด; Hat Yao Seafood / หาดยาวซีฟู๊ด; Tha Khlai Seafood / ท่าใคล ซีฟู๊ด; Klin Kaphrao / กลิ่นกะเพรา; Ton Po House / ต้นปอ เฮ้าส์; Baan Rai Nai Fan / บ้านไร่ในฝัน; Lae View / แลวิว; Moo Kratha Ruen Khun Yai / หมูกระทะเรินคุณยาย

Already in the app — things to do: Pak Meng Beach / หาดปากเมง; Hat Chao Mai National Park / อุทยานแห่งชาติหาดเจ้าไหม; Koh Mook and Emerald Cave / เกาะมุก ถ้ำมรกต; Peninsular Botanic Garden (Thung Khai) / สวนพฤกษศาสตร์ภาคใต้ ทุ่งค่าย; Ton Te Waterfall / น้ำตกโตนเต๊ะ; Rajamangala Trang Aquarium / พิพิธภัณฑ์สัตว์น้ำราชมงคลตรัง; Trang night market and the station weekend market / ตลาดกลางคืนตรัง ถนนรื่นรมย์; Khao Chang Hai Cave / ถ้ำเขาช้างหาย; Khao Kob Cave (Tham Le Khao Kob); Kantang Railway Station; Khao Chong Botanic Garden; Koh Kradan; Koh Ngai (Koh Hai); Koh Libong; Na Muen Si weaving centre
