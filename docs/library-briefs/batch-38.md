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

### th-krabi — Krabi and Phi Phi (Thailand)
Area covered: Krabi and Phi Phi (also known as / includes: krabi, ao nang, railay, phi phi, koh lanta)

Already in the app — places to eat: Ruen Mai / เรือนไม้; Krua Thara / ครัวธารา; Kotung / โกตุง; Lae Lay Grill; D&E's Jungle Kitchen; KoDam Kitchen / ครัวโกดำ; Wang Sai Seafood / วังทรายซีฟู้ด; Papaya Restaurant; Garlic 1992; Krabi Town Walking Street / ถนนคนเดินกระบี่; Chao Fah Night Market / ตลาดโต้รุ่งท่าเรือเจ้าฟ้า; Ao Nang Landmark Night Market; Café 8.98; Pee Pee Bakery; Thongyib Thongyod / ทองหยิบทองหยอดคาเฟ่; Pum Thai Restaurant

Already in the app — things to do: Ao Nang Beach; Nopparat Thara Beach; Railay Beach; Krabi 4 Islands tour; Emerald Pool; Khlong Thom Hot Springs; Than Bok Khorani National Park; Tha Pom Khlong Song Nam; Tiger Cave Temple; Wat Khlong Thom Museum; Klang Cave; Shell Fossil Cemetery; Krabi Town Walking Street; Thara Park; Ao Nang Landmark Night Market; The Fun Garden; Krabi Aquarium; Hong Island (Koh Hong) / เกาะห้อง; Maya Bay; Koh Phi Phi Don; Blue Pool (Sa Nam Phut); Khlong Muang Beach / หาดคลองม่วง; Tubkaek Beach; Kayaking on Ao Thalane

### th-samui — Koh Samui, Koh Phangan and Koh Tao (Thailand)
Area covered: Koh Samui, Koh Phangan and Koh Tao (also known as / includes: koh samui, samui, koh phangan, koh tao, ang thong marine park)

Already in the app — places to eat: Krua Chao Baan / ครัวชาวบ้าน; Sabeinglae (Lamai) / สบายเล ละไม; Bang Po Seafood (Takho) / บางปอซีฟู้ด (ตาโข่); The Hut Cafe; Khaw Glong Thai Restaurant; Krua Bophut / ครัวบ่อผุด; Kob Thai; Fisherman's Restaurant & Bar; 995 Roasted Duck; Fisherman's Village Walking Street / ถนนคนเดินหมู่บ้านชาวประมง; Central Samui food court / ศูนย์อาหาร เซ็นทรัล สมุย; Phantip Night Market / ตลาดพันทิพย์ ท้องศาลา; La Fabrique; Sweet Sisters Cafe; Zest Coffee Lounge; Lamai Sunday Night Market; Lamai Night Plaza; Chaweng Night Market food court; Samui Seafood Grill; Zoo Café; Bliss Café

Already in the app — things to do: Big Buddha Temple / วัดพระใหญ่; Wat Plai Laem / วัดปลายแหลม; Hin Ta Hin Yai / หินตาหินยาย; Na Muang Waterfall 1 / น้ำตกหน้าเมือง; Fisherman's Village Walking Street; Maenam Beach / หาดแม่น้ำ; Choeng Mon Beach / หาดเชิงมน; Lipa Noi Beach / หาดลิปะน้อย; Ang Thong National Marine Park / อุทยานแห่งชาติหมู่เกาะอ่างทอง; Samui Elephant Sanctuary; Paradise Park Farm; Kidomo Kids Club; Fun House Samui; Le Blocks Playroom; Central Samui; Chaweng Beach / หาดเฉวง; Secret Buddha Garden (Magic Garden) / สวนลับ ตาร์นิม; Renaissance Art Center; MK Ultra Artists Pottery Studio

### th-huahin — Hua Hin, Cha-am and Pranburi (Thailand)
Area covered: Hua Hin, Cha-am and Pranburi (also known as / includes: hua hin, cha-am, pranburi, sam roi yot, phetchaburi, kaeng krachan)

Already in the app — places to eat: Chao Lay Seafood / ชาวเล ซีฟู้ด; Jek Pia / เจ๊กเปี๊ยะ; Baan Itsara / บ้านอิสระ; Koti / โกทิ; You Yen Hua Hin Balcony / อยู่เย็น หัวหิน บัลโคนี; Ratama / ระตะมะ; Supatra by the Sea / สุพัตรา บายเดอะซี; Krua Medsai / ครัวเม็ดทราย; Baan Mae Phongsri / บ้านแม่ผ่องศรี; OX Seafood / โอเอ็กซ์ซีฟู้ด; Hua Hin Night Market / ตลาดโต้รุ่งหัวหิน; Cicada Market / ตลาดจักจั่น; Tamarind Market / ตลาดแทมมารีน; Baan Khrai Wang / บ้านใกล้วัง; Pa Jua Mango Sticky Rice / ข้าวเหนียวมะม่วงป้าเจือ; The Chocolate Factory Hua Hin; Saen Suk Som Seafood; Ao Takiab Seafood Hua Hin; Suk Suk Phochana Hua Hin; Rosarin Restaurant Hua Hin; Ba ribot Khaotakiab / บริบท เขาตะเกียบ; Ban Ko Restaurant Hua Hin; Sailom Hotel & Restaurant; Tharachan Hua Hin; CASA MARE Huahin; Khrua Ban Khru Hua Hin; Khrua Khai Muk Cha-am Fish Pier; Chom Wiew Seafood; Khrua Huai Sai; Khrua Khong Samut Seafood; Pla Thu Restaurant; Wiew Thale Seafood Cha-am; Luckyseafood2 Cha-am; Im Jang; Eureka Beach Cafe; Oceanside Beach Club & Restaurant / โอเชี่ยนไซด์ บีช คลับ & เรสเตอรองต์; Ko Mark HuaHin Restaurant / โกหมาก หัวหิน; Baantuayen x The Dogs Space / บ้านถั่วเย็น; Air Space Hua Hin

Already in the app — things to do: Vana Nava Water Jungle; Black Mountain Water Park; Swiss Sheep Farm; Cicada Market; Hua Hin Night Market; Khao Sam Roi Yot National Park; Khao Hin Lek Fai Viewpoint; Raruek Hua Hin; Hua Hin Railway Station; Pak Nam Pran; Hua Hin Artist Village; Market Village Hua Hin; Blúport Hua Hin; Sirindhorn International Environmental Park; Rajabhakti Park; Wildlife Friends Foundation Thailand

### jp-tokyo — Tokyo (Japan)
Area covered: Tokyo (also known as / includes: tokyo, shinjuku, shibuya, asakusa, ginza, odaiba)

Already in the app — places to eat: Daikokuya Tempura / 大黒家天麩羅; Tonkatsu Maisen Aoyama Honten / とんかつ まい泉 青山本店; Tsurutontan Roppongi / つるとんたん 六本木店; Sushizanmai Honten / すしざんまい 本店; Gonpachi Nishi-Azabu / 権八 西麻布; Kanda Yabu Soba / かんだやぶそば; Rengatei / 煉瓦亭; Uobei Shibuya Dogenzaka / 魚べい 渋谷道玄坂店; Izuei Honten / 伊豆榮 本店; Tokyo Ramen Street / 東京ラーメンストリート; Tsukiji Outer Market / 築地場外市場; Isetan Shinjuku Food Hall / 伊勢丹新宿店 デパ地下; Asakusa Kagetsudo / 浅草 花月堂; Ginza Kimuraya / 銀座木村家; Shiro-Hige's Cream Puff Factory / 白髭のシュークリーム工房; Beru Beru Park; minori CAFE; minori SHOKUDO; Chano-ma; Latte chano-mama; KICHIRI MOLLIS; Kakurebou Shinjuku Branch; Panda Cafe; Disney HARVEST MARKET; Kura Sushi Ginza; Kura Sushi; Sushiro Shinjuku San-chome Branch; Fishing Restaurant Zauo Meguro; Think Coffee; Toyotama Villa / UPMARKET; Genba Kissa; Restaurant Pygargue; APRON MARK; Oyako Cafe Picnic; Mama Plus Café Shinagawa; BørneLund Flagship Store; Herb & Oishii Yasai-juku Restaurant; Niku no Suzuki; Waguriya; Yanaka Takobou; Happy Pancake; Gusto; Jonathan's; Royal Host; Ootoya; Saizeriya; Bamiyan; CoCo Ichibanya

Already in the app — things to do: Ueno Zoo / 恩賜上野動物園; Tokyo Disneyland / 東京ディズニーランド; Tokyo DisneySea / 東京ディズニーシー; Ghibli Museum / 三鷹の森ジブリ美術館; Sumida Aquarium / すみだ水族館; Maxell Aqua Park Shinagawa / マクセル アクアパーク品川; KidZania Tokyo / キッザニア東京; Tokyo Skytree / 東京スカイツリー; Senso-ji and Nakamise Street / 浅草寺・仲見世; Tsukiji Outer Market / 築地場外市場; Showa Kinen Park / 国営昭和記念公園; National Museum of Nature and Science / 国立科学博物館; teamLab Planets / チームラボプラネッツ; Tokyo Toy Museum / 東京おもちゃ美術館; Yoyogi Park / 代々木公園; LEGOLAND Discovery Center Tokyo / レゴランド・ディスカバリー・センター東京; Shinjuku Gyoen National Garden / 新宿御苑; teamLab Borderless; Tokyo Water Science Museum / 東京都水の科学館; Police Museum; Sunshine Aquarium; Tokyo Dome City asobono!; Kid-o-kid Toyosu; Tokyo Sea Life Park / 葛西臨海水族園; Edo-Tokyo Museum / 江戸東京博物館; Nishi-Rokugo Tire Park; Miyashita Park; Shibuya Crossing; Godzilla Head at Hotel Gracery Shinjuku; Hotaluna; Yurikamome; Hanayashiki; Sega Joypolis; Ameyoko; Shinobazu Pond; Toyota Mega Web; Yuyake Dandan; Kawaii Monsterland
