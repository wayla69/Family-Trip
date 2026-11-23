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

### jp-nikko — Nikko and Kinugawa (Japan)
Area covered: Nikko and Kinugawa (also known as / includes: nikko, kinugawa, chuzenji, oku-nikko, okunikko, senjogahara)

Already in the app — places to eat: Meiji-no-Yakata / 明治の館; Nikko Kanaya Hotel Main Dining Room / 日光金谷ホテル メインダイニングルーム; Hippari Dako / ひっぱり凧; Yuba Soba Nikko Momijian / ゆばそば 日光もみぢ庵; Komekichi Kozushi / 米吉 晃寿司; Coffee House Yukon / コーヒーハウス ユーコン; Sakaeya / さかえや; Michi-no-Eki Nikko Nikoniko Honjin / 道の駅日光 日光街道ニコニコ本陣; Nishisando Chaya / 西参道茶屋; Kanaya Hotel Bakery / 金谷ホテルベーカリー; Nikko Coffee Goyoteidori / 日光珈琲 御用邸通; Shogetsu Himuro / 松月氷室; Nikko Pudding Tei / 日光ぷりん亭 日光本店; Baumkuchen Kobo Hachiya / バウムクーヘン工房 はちや; Azconexion; Yuba-gozen Sun Field; Maruhide Shokudo; Nikko Yuba Tsuruya Imaichi

Already in the app — things to do: Edo Wonderland Nikko Edomura / 日光江戸村; Tobu World Square / 東武ワールドスクウェア; Kegon Falls / 華厳滝; Kinugawa Onsen Ropeway / 鬼怒川温泉ロープウェイ; Nikko Tamozawa Imperial Villa Memorial Park / 日光田母沢御用邸記念公園; Kirifuri Falls / 霧降の滝; Ryuzu Falls / 竜頭の滝; Kanmangafuchi Abyss / 憾満ヶ淵; Nikko Botanical Garden / 日光植物園; Lake Chuzenji Sightseeing Boat / 中禅寺湖遊覧船; Nikko Toshogu Museum / 日光東照宮宝物館; Kanaya Hotel History House / 日光金谷ホテル歴史館; Shinkyo Bridge / 神橋; Senjogahara Marshland / 戦場ヶ原; Lake Chuzenji / 中禅寺湖; Akechidaira Ropeway; Kinugawa River Boat Ride; Nikko Strawberry Park; Kirifuri Highland; Nikko Toshogu Shrine / 日光東照宮; Minogahara Forest Park / 美濃が原森林公園

### jp-nagasaki — Nagasaki (Japan)
Area covered: Nagasaki (also known as / includes: nagasaki, dejima, glover garden, gunkanjima, hashima island, sasebo)

Already in the app — places to eat: Shikairo / 四海樓; Kozanro Chinatown Honten / 江山楼 中華街本店; Kairakuen / 会楽園; Tsuruchan / ツル茶ん; Hamakatsu Honten / 浜勝 長崎本店; Kaisen Ichiba Nagasaki-ko Dejima Wharf / 海鮮市場 長崎港 出島ワーフ店; Yossou Honten / 吉宗 本店; Nagasaki Shinchi Chinatown / 長崎新地中華街; Iwasaki Honpo / 岩崎本舗; Nagasaki Kaido Kamome Ichiba / 長崎街道かもめ市場; Fukusaya Honten / 福砂屋 本店; Bunmeido Sohonten / 文明堂総本店; Shooken Honten / 松翁軒 本店; New York-do / ニューヨーク堂; Gusto Nagasaki Oura Kaigan / ガスト 長崎大浦海岸店; Wakatakemaru Hamamachi; Attic; Ringer Hut

Already in the app — things to do: Nagasaki Penguin Aquarium / 長崎ペンギン水族館; Nagasaki Bio Park / 長崎バイオパーク; Glover Garden / グラバー園; Nagasaki Peace Park / 平和公園; Huis Ten Bosch / ハウステンボス; Dejima / 出島; Dejima Wharf / 出島ワーフ; Nagasaki Seaside Park / 長崎水辺の森公園; Shinchi Chinatown / 新地中華街; Mount Inasa ropeway and observatory / 稲佐山ロープウェイ; Nagasaki City Dinosaur Museum / 長崎市恐竜博物館; Nagasaki Museum of History and Culture / 長崎歴史文化博物館; Kujukushima Aquarium Umikirara / 九十九島水族館海きらら; Nagasaki Science Museum (Starship) / 長崎市科学館; Nagasaki Prefectural Art Museum / 長崎県美術館; Aguri Dome / あぐりドーム; Play Kids Land; Kids Park Zone; VS Stadium Nagasaki; Kujira Dome; Omura City Children's Science Museum / 大村市子ども科学館

### th-pattaya — Pattaya and the Chonburi coast (Thailand)
Area covered: Pattaya and the Chonburi coast (also known as / includes: pattaya, koh larn, jomtien, sattahip, bang saen, si racha)

Already in the app — places to eat: Mum Aroi (Naklua) / มุมอร่อย นาเกลือ; Pupen Seafood / ปูเป็น ซีฟู้ด; The Glass House; Rimpa Lapin / ริมผาลาพิน; Lung Sawai Seafood / ลุงไสว ซีฟู๊ด; The Sky Gallery; Suttangrak Pattaya / สุดทางรัก พัทยา; Preecha Seafood / ปรีชา ซีฟู้ด; Lan Pho Naklua Market / ตลาดลานโพธิ์นาเกลือ; Pier 21 Food Court (Terminal 21 Pattaya) / เพียร์ 21 เทอร์มินอล 21 พัทยา; Nong Mon Market / ตลาดหนองมน; La Baguette; The Chocolate Factory Pattaya; Cabbages & Condoms; Nara Thai Cuisine; Ruenthai; Leng Kee; Glass House Silver; Thepprasit Night Market; Tess Vegan Cafe

Already in the app — things to do: Sanctuary of Truth; Art in Paradise Pattaya; Underwater World Pattaya; Khao Kheow Open Zoo; Ramayana Water Park; Mini Siam; Phra Tamnak Viewpoint; Lan Pho Naklua Park; Thepprasit Night Market; Koh Larn; Pattaya Floating Market; Frost Magical Ice of Siam; Columbia Pictures Aquaverse; Jomtien Beach; Terminal 21 Pattaya; Pattaya Water Park; Harborland; Monster Aquarium; Ripley's Believe It or Not

### th-sukhothai — Sukhothai and Si Satchanalai (Thailand)
Area covered: Sukhothai and Si Satchanalai (also known as / includes: sukhothai, si satchanalai, sawankhalok, hat siao)

Already in the app — places to eat: Jayhae Sukhothai Noodle / ก๋วยเตี๋ยวสุโขทัยเจ๊แฮ; Ta Pui Sukhothai Noodle / ก๋วยเตี๋ยวสุโขทัยตาปุ้ย; Baan Kru Iw / บ้านครูอิ๋ว; Poo Restaurant / ร้านปู; Fueang Fah / เฟื่องฟ้า; Mai Klang Krung / ไม้กลางกรุง; Khao Poep Yai Khrueang / ข้าวเปิ๊บยายเครื่อง; Ko Heng / โกเฮง; Sukhothai Night Market / ตลาดโต้รุ่งสุโขทัย; Wat Traphang Thong Market / ตลาดวัดตระพังทอง; The Coffee Cup; Cafe Thammada / ทำมาดาคาเฟ่; Lung Joi Restaurant / ร้านลุงจ้อย; Api Bistro; Khanom Chin Ban Na / ร้านขนมจีนบ้านนา; Mee Khao Phan Phak / หมี ข้าวพันผัก; Kuaytiew Saep Pak / ก๋วยเตี๋ยวแซ่บปาก; Krua Sukho / ครัวสุโข; Na Sukhothai / ณ โขทัย; Baan Chan Chai / บ้านจันทร์ฉาย; Pa Pen Mystery Noodles / ป้าเพ็ญ ก๋วยเตี๋ยวลึกลับ

Already in the app — things to do: Sukhothai Historical Park, central zone / อุทยานประวัติศาสตร์สุโขทัย; Wat Sa Si, the temple on the lake; Wat Si Sawai; Ramkhamhaeng National Museum; Si Satchanalai Historical Park; Sawanworanayok National Museum; Ramkhamhaeng National Park, Sai Rung waterfall; Ban Ko Noi Sangkhalok Kiln Study Centre; Ban Phra Phim learning centre (clay stamping); Wat Mahathat, Sukhothai; Wat Chang Lom; Sathorn Golden Textile Museum; Sarit Phong Dam; Tat Duean Waterfall; Wat Phra Phai Luang; Wat Si Chum / วัดศรีชุม; Chao Ram Beach / หาดเจ้าราม; Chao Ram Cave (bat flight) / ถ้ำเจ้าราม
