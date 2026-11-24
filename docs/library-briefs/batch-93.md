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

### au-goldcoast — The Gold Coast and Brisbane (Australia)
Area covered: The Gold Coast and Brisbane (also known as / includes: gold coast, surfers paradise, brisbane, burleigh)

Now in the app: 27 places to eat, 30 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Pancakes in Paradise; Betty's Burgers Surfers Paradise; Currumbin Beach Vikings Surf Life Saving Club; Cavill's Steakhouse; Julius Pizzeria; Pancake Manor; Harajuku Gyoza South Bank; Charis Seafoods; Miami Marketta; Eat Street Northshore; Paddock Bakery; Gelato Messina South Brisbane; Lune Croissanterie South Brisbane; Hurricane's Grill & Bar; La Playa; Milky Lane Surfers Paradise; Tarte Bakery & Cafe; Custard Canteen; Al Bacio Gelateria; Mini & Me Coffee Shop; Merlina’s; FunnyBone Coffee; Café 63; Pasture & Co; Dune Cafe; Gathering Co; Stones Throw

Already in the app — things to do: Dreamworld; Sea World; Warner Bros. Movie World; Wet'n'Wild Gold Coast; Currumbin Wildlife Sanctuary; David Fleay Wildlife Park; Paradise Country; SkyPoint Observation Deck; HOTA Gallery; Surfers Paradise Beach; Tallebudgera Creek and Burleigh Head; Broadwater Parklands; Gold Coast Regional Botanic Gardens; Miami Marketta; Natural Bridge, Springbrook; Australia Zoo; Queensland Museum Kurilpa and SparkLab; Tamborine Rainforest Skywalk; Tamborine Mountain Glow Worm Caves; Chipmunks Everton Park; Bella’s Wonderland; Planet Chill; GC Aqua Park; Bounce Inc; O’Reilly’s Tree Top Walk; Currumbin Rock Pools; Country Paradise Parklands; The Jungle Adventure Play; Rainbow City Play Centre; Crocs Playcentre North Lakes

### it-milan — Milan (Italy)
Area covered: Milan (also known as / includes: milan, milano, duomo di milano, navigli, lake como, verona)

Now in the app: 33 places to eat, 24 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Trattoria Milanese; Antica Trattoria della Pesa; Piz; Gino Sorbillo Lievito Madre al Duomo; El Brellin; Trattoria Masuelli San Marco; Trattoria Madonnina; Obicà Mozzarella Bar Duomo; Luini; Pizzeria Spontini; Mercato Centrale Milano; Eataly Milano Smeraldo; Pasticceria Marchesi 1824; Cioccolati Italiani; Pavé; CreDa; Spore; Silvano Vini & Cibi al Banco; Nebbia; Erba Brusca; Da Giacomo; Gastronomia Yamamoto; Osteria Lagrandissima; Trippa; Ratanà; Belle Epoque; Trattoria Bertamè; Consorzio Stoppani; Mamusca; California Bakery (CityLife); Giolina; MIC Ramen (Porta Romana); Benvenuto Family Restaurant

Already in the app — things to do: National Museum of Science and Technology Leonardo da Vinci / Museo Nazionale Scienza e Tecnologia Leonardo da Vinci; Milan Civic Aquarium / Acquario Civico di Milano; Sforza Castle museums / Musei del Castello Sforzesco; Milan Natural History Museum / Museo di Storia Naturale di Milano; Civic Planetarium Ulrico Hoepli / Civico Planetario Ulrico Hoepli; MUBA children's museum / MUBA – Museo dei Bambini Milano; Duomo di Milano rooftop terraces / Terrazze del Duomo di Milano; Parco Sempione; Giardini Pubblici Indro Montanelli; Idroscalo park / Parco Idroscalo; Pirelli HangarBicocca; Leolandia; Mercatone dell'Antiquariato, Naviglio Grande / Mercatone dell'Antiquariato sul Naviglio Grande; Mercato Centrale Milano; Museo del Novecento; Museo d’Arte e Scienza di Milano; Leonardo3 Museum; MUSEO BAGATTI VALSECCHI; Brera Botanical Garden; Pinacoteca di Brera; La Scala Theatre Museum / Museo Teatrale alla Scala; Library of Trees park (BAM) / Biblioteca degli Alberi; Museum of Senses; Bagni Misteriosi

### jp-tohoku — Tohoku (Japan)
Area covered: Tohoku (also known as / includes: tohoku, sendai, zao, ginzan, yamagata, aomori)

Now in the app: 21 places to eat, 36 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Rikyu Sendai Station Gyutan-dori / 牛たん炭焼 利久 仙台駅店; Aji Tasuke Honten / 味太助 本店; Azumaya Honten / 東家 本店; Pyon Pyon Sha Morioka Ekimae / ぴょんぴょん舎 盛岡駅前店; Pairon Honten / 白龍 本店; Ajino Sapporo Onishi / 味の札幌 大西; Shojiya Honten / 庄司屋 本店; Sendai Asaichi Morning Market / 仙台朝市; Matsushima Fish Market / 松島さかな市場; Aomori Gyosai Center / 青森魚菜センター; A-Factory / A-FACTORY; Zunda Saryo Sendai Station / ずんだ茶寮 仙台駅店; Fukuda Pan Honten / 福田パン 長田町本店; Taisho Roman Tea Room / 大正浪漫喫茶室; Ton Galliano Sendai Ekimae / トン・ガリアーノ仙台駅前店; Tanya Zenjiro Minamimachi-dori / たんや善治郎 南町通り店; Restaurant HACHI Sendai Honten; Restaurant Kaitakuka / レストラン開拓家; Cafe Craft / カフェ クラフト; Keyaki Cafe / ケヤキカフェ; Forest Kitchen with Outdoor Living / フォレストキッチン ウィズ アウトドアリビリング

Already in the app — things to do: Sendai Umino-Mori Aquarium / 仙台うみの杜水族館; Miyagi Zao Fox Village / 宮城蔵王キツネ村; Matsushima Bay pleasure cruise / 松島島巡り観光船; Sendai Mediatheque / せんだいメディアテーク; Yagiyama Zoological Park / 仙台市八木山動物公園 フジサキの杜; Spa Resort Hawaiians / スパリゾートハワイアンズ; Tsuruga Castle / 鶴ヶ城; Ouchi-juku thatched post town / 大内宿; Nebuta Museum Wa Rasse / ねぶたの家 ワ・ラッセ; Aomori Fish Market Nokke-don / 青森魚菜センター（のっけ丼）; Hirosaki Park / 弘前公園; Lake Towada sightseeing cruise / 十和田湖遊覧船; Akita City Omoriyama Zoo / 大森山動物園; Akita Neburi Nagashi Kan / 秋田市民俗芸能伝承館（ねぶり流し館）; Kakunodate samurai district / 角館武家屋敷通り; Kidsland US Sendai Nishikigaoka / キッズランドUS仙台錦ケ丘店; Sendai Anpanman Children's Museum & Mall / 仙台アンパンマンこどもミュージアム＆モール; Yagiyama Benyland / 八木山ベニーランド; HOKUSHU Sendai City Science Museum / 仙台市科学館; Kansei-no-Mori / 感性の森; JOYPOLIS SPORTS AEON Sendai Nakayama / JOYPOLIS SPORTS イオン仙台中山店; Sendai Astronomical Observatory / 仙台市天文台; Skids Garden Yodobashi Sendai / スキッズガーデン ヨドバシ仙台店; Aomori Prefectural Asamushi Aquarium; Sannai Maruyama Site; Aomori Museum of Art; Gappo Park; Oirase Stream; Tsurunomai Bridge; Hasshoku Center; Hachinohe Park Children's World / 八戸公園 こどもの国; Kodomo Hatch / こどもはっち; CLAAPIN SAGAE / さくらんぼこどもキャンパス CLAAPIN SAGAE; Shelter Inclusive Place COPAL / シェルターインクルーシブプレイス コパル; Morikko Park (Yamagata Tendo) / もりっこぱ～く山形天童店; Kurunto / 長井市 遊びと学びの交流施設 くるんと

### my-kualalumpur — Kuala Lumpur (Malaysia)
Area covered: Kuala Lumpur (also known as / includes: kuala lumpur, klcc, petronas, batu caves, bukit bintang, genting)

Now in the app: 25 places to eat, 33 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Madam Kwan's KLCC; Yut Kee / 镒记茶餐室; Nasi Kandar Pelita; Sek Yuen Restaurant / 适苑酒家; Restoran Kin Kin / 建记辣椒板面; Din Tai Fung Pavilion / 鼎泰豐; Old China Cafe / 老中国茶室; Village Park Restaurant; Sri Nirwana Maju; Lot 10 Hutong / 十号胡同; Jalan Alor Food Street / 亚罗街; Signatures Food Court; VCR; Kenny Hills Bakers; Inside Scoop Bangsar; Ho Kow Hainam Kopitiam / 何九海南茶店; Marmalade; Kanteen; Yellow Brick Road; RGB & The Bean Hive; The Little Owl Korean Cafe; Bucket B Cafe; Haru Cafe Gallery; ATE TEA Cafe; Antipodean (Bangsar)

Already in the app — things to do: Aquaria KLCC; Petrosains Discovery Centre; KL Bird Park; Zoo Negara; KLCC Park; Batu Caves; KL Tower; National Museum / Muzium Negara; Perdana Botanical Garden; KL Forest Eco Park; Petaling Street and Central Market; Jalan Alor; Islamic Arts Museum Malaysia; Sunway Lagoon; Thean Hou Temple; MoSAIC (Museum of Science, Arts & Innovation for Children); Planetarium Negara; VroomTown Malaysia; Pusat Sains Negara; Titiwangsa Lake Gardens / Taman Tasik Titiwangsa; Taman Rekreasi Bukit Jalil; TRX City Park; Farm In The City; Farm Fresh UPM; Immersify Kuala Lumpur; Museum of Illusions; Illusion 3D Art Museum; MinNature Malaysia; Chocolate Museum Malaysia; Balai Seni Negara; Bank Negara Malaysia Museum and Art Gallery; Hang Tuah Fire Station; KidZania Kuala Lumpur
