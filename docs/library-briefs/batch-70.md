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

### jp-nagasaki — Nagasaki (Japan)
Area covered: Nagasaki (also known as / includes: nagasaki, dejima, glover garden, gunkanjima, hashima island, sasebo)

Now in the app: 18 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Shikairo / 四海樓; Kozanro Chinatown Honten / 江山楼 中華街本店; Kairakuen / 会楽園; Tsuruchan / ツル茶ん; Hamakatsu Honten / 浜勝 長崎本店; Kaisen Ichiba Nagasaki-ko Dejima Wharf / 海鮮市場 長崎港 出島ワーフ店; Yossou Honten / 吉宗 本店; Nagasaki Shinchi Chinatown / 長崎新地中華街; Iwasaki Honpo / 岩崎本舗; Nagasaki Kaido Kamome Ichiba / 長崎街道かもめ市場; Fukusaya Honten / 福砂屋 本店; Bunmeido Sohonten / 文明堂総本店; Shooken Honten / 松翁軒 本店; New York-do / ニューヨーク堂; Gusto Nagasaki Oura Kaigan / ガスト 長崎大浦海岸店; Wakatakemaru Hamamachi; Attic; Ringer Hut

Already in the app — things to do: Nagasaki Penguin Aquarium / 長崎ペンギン水族館; Nagasaki Bio Park / 長崎バイオパーク; Glover Garden / グラバー園; Nagasaki Peace Park / 平和公園; Huis Ten Bosch / ハウステンボス; Dejima / 出島; Dejima Wharf / 出島ワーフ; Nagasaki Seaside Park / 長崎水辺の森公園; Shinchi Chinatown / 新地中華街; Mount Inasa ropeway and observatory / 稲佐山ロープウェイ; Nagasaki City Dinosaur Museum / 長崎市恐竜博物館; Nagasaki Museum of History and Culture / 長崎歴史文化博物館; Kujukushima Aquarium Umikirara / 九十九島水族館海きらら; Nagasaki Science Museum (Starship) / 長崎市科学館; Nagasaki Prefectural Art Museum / 長崎県美術館; Aguri Dome / あぐりドーム; Play Kids Land; Kids Park Zone; VS Stadium Nagasaki; Kujira Dome; Omura City Children's Science Museum / 大村市子ども科学館

### my-borneo — Sabah, Borneo (Malaysia)
Area covered: Sabah, Borneo (also known as / includes: sabah, borneo, kota kinabalu, kinabalu, sepilok, sandakan)

Now in the app: 22 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Welcome Seafood Restaurant / 大茄来海鲜餐厅; Kedai Kopi Yee Fung / 怡丰茶室; Sin Kee Bah Kut Teh / 新记肉骨茶; Kedai Kopi Fatt Kee / 发记茶室; Suang Tain Seafood Restaurant / 双天海鲜餐厅; Kedai Kopi Seng Hing / 成兴茶餐室; Little Italy; English Tea House & Restaurant; Kota Kinabalu Night Food Market; Gaya Street Sunday Market / 加雅街; Fook Yuen Cafe & Bakery / 富源茶餐厅; Keng Wan Hing / 琼万兴茶室; Kedai Kopi Yuit Cheong / 悦昌茶室; Nook Cafe; October Coffee House; Tiny Palm Playground X Kids Cafe; Little Dino Kids Cafe; Bear Factory Cafe; Happy Place; Alu-Alu Kitchen; Tana Borneo; Todak Waterfront Hawker Centre

Already in the app — things to do: Sepilok Orangutan Rehabilitation Centre; Bornean Sun Bear Conservation Centre; Labuk Bay Proboscis Monkey Sanctuary; Tunku Abdul Rahman Park, Manukan Island; Lok Kawi Wildlife Park; Kinabalu Park and Poring Hot Spring; Gaya Street Sunday Market; Kota Kinabalu Wetland Centre; Rainforest Discovery Centre, Sepilok; Sabah State Museum and Heritage Village; Rumah Terbalik (Upside-Down House) and 3D Wonders Museum; Aquarium and Marine Museum, UMS; Tanjung Aru Beach; Kipandi Butterfly Park; Handicraft Market, Kota Kinabalu; Sabah Tea Garden; Kota Kinabalu City Mosque / Masjid Bandaraya Kota Kinabalu

### si-bled — Bled, Ljubljana and Postojna (Slovenia)
Area covered: Bled, Ljubljana and Postojna (also known as / includes: bled, lake bled, ljubljana, postojna, bohinj, vintgar)

Now in the app: 16 places to eat, 23 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Gostilna Pri Planincu; Oštarija Peglez'n; Gostilna Murka; Pizzeria Rustika; Gostilna Sokol; Gostilna Šestica; Julija; Foculus Pizzeria; Jamski dvorec; Gostilna Požar; Klobasarna; Ljubljana Central Market; Kavarna Park; Slaščičarna Zima; Cacao; Garden Restaurant

Already in the app — things to do: Postojna Cave / Postojnska jama; Predjama Castle / Predjamski grad; Ljubljana Castle and funicular / Ljubljanski grad; Ljubljana Zoo / Živalski vrt Ljubljana; Bled Castle / Blejski grad; Vintgar Gorge / Soteska Vintgar; Pletna boat to Bled Island; University Botanic Gardens Ljubljana / Botanični vrt Univerze v Ljubljani; House of Experiments / Hiša eksperimentov; Ljubljana Central Market / Centralna tržnica; Vogel cable car / Vogel; Lake Bled walk; Museum of Apiculture, Radovljica; Straža summer toboggan; Starkl Open-Air Museum; Triglavska roza info centre exhibition; Savica Waterfall; Mostnica Gorge; Atlantis water park / Vodno mesto Atlantis; Tivoli Park; Postojna Vivarium / Vivarij; Expo Cave Karst / Expo Jama Kras; Black Cave and Pivka Cave / Črna jama in Pivka jama

### th-kohchang — Trat and Koh Chang (Thailand)
Area covered: Trat and Koh Chang (also known as / includes: koh chang, ko chang, trat, koh kood, koh kut, ko kut)

Now in the app: 17 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Kati Culinary / กะทิ คูลินารี; Iyara Seafood / ไอยราซีฟู้ด; Phu-Talay Seafood / ภูทะเล; Nong Bua Seafood / หนองบัวซีฟู้ด; Chowlay Seafood / ชาวเลซีฟู้ด; Salakphet Seafood / สลักเพชรซีฟู้ด; Saeng Fah / แสงฟ้า; Namchok / น้ำโชค; Kiew Nong Bua / เกี๊ยวหนองบัว; Trat Night Market / ตลาดโต้รุ่งตราด; White Sand Beach night stalls / ร้านรถเข็นกลางคืน หาดทรายขาว; Papa’s Deli; Crust Bakery; Marco ristorante Italiano e pizzeria; Pizza King Express; Saaitara Restaurant; Tonsai Restaurant

Already in the app — things to do: Than Mayom Waterfall / น้ำตกธารมะยม; Khlong Phlu Waterfall / น้ำตกคลองพลู; White Sand Beach (Hat Sai Khao) / หาดทรายขาว; Klong Prao Beach / หาดคลองพร้าว; Kai Bae Beach / หาดไก่แบ้; Kai Bae viewpoint / จุดชมวิวไก่แบ้; Bang Bao fishing village / บ้านบางเบ้า; Trat City Museum / พิพิธภัณฑสถานเมืองตราด; Changthun Eco-Museum / นิเวศพิพิธภัณฑ์บ้านช้างทูน; Salak Khok mangrove boat ride / ล่องเรือกอนโดล่าเมืองไทย บ้านสลักคอก; Salak Phet mangrove boardwalk; Tree Top Adventure Park Koh Chang; Laem Chaichet sunset point; Ban Dan Mai community bike ride; White Sand Beach viewpoint; Napalai Cooking School; Ban Suan Cooking School; Chao Pho Koh Chang shrine; Wat Salak Phet; Lonely Beach (Hat Tha Nam); Hat San Chao, Koh Rang Yai; Khlong Nonsi waterfall
