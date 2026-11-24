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

### de-munich — Munich (Germany)
Area covered: Munich (also known as / includes: munich, muenchen, marienplatz, english garden, olympiapark, nymphenburg)

Now in the app: 37 places to eat, 23 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Hofbräuhaus München; Augustiner-Keller; Augustiner Stammhaus; Ratskeller München; Königlicher Hirschgarten; Wirtshaus in der Au; Schneider Bräuhaus; Nürnberger Bratwurst Glöckl am Dom; Viktualienmarkt; Biergarten am Chinesischen Turm; Eataly München; Café Frischhut; Rischart Café am Marienplatz; Café Luitpold; Ballabeni Icecream; Elisabethmarkt; Markt am Wiener Platz; Pasinger Viktualienmarkt; Bauernmarkt an der Pinakothek der Moderne; Caspar Plautz; Haxnbauer im Scholastikahaus; THERESA Grill; Zur Festwiese; Wirtshaus Zur Brez’n; Prinz Myshkin; Café Clara; Café Reitschule; Hofbräukeller; Kindercafé Zuckertag; Mini Moment Kids Café; Kleine Sportgeister; Café Glückskind; Café Pfefferminza; Mama’s Kindercafé; Hans im Glück (Isartor); La Sophia; Frau im Mond (Deutsches Museum)

Already in the app — things to do: Hellabrunn Zoo / Tierpark Hellabrunn; Deutsches Museum and its Kinderreich; Deutsches Museum Verkehrszentrum; SEA LIFE Munich; Munich Marionette Theatre / Münchner Marionettentheater; Olympiapark; Englischer Garten and the children's carousel; Kleinhesseloher See boats; Viktualienmarkt; Glockenspiel at Marienplatz; Munich Christkindlmarkt at Marienplatz; Nymphenburg Palace park; BMW Welt; Bavaria Filmstadt; Therme Erding; LEGOLAND Deutschland; Kinderkunsthaus; Children’s Museum Munich; Museum Man and Nature; Sayaq Adventure Tower; Railroad Museum; Alte Pinakothek; Müller’sches Volksbad

### es-barcelona — Barcelona (Spain)
Area covered: Barcelona (also known as / includes: barcelona, sagrada, park guell, la rambla, gothic quarter, barceloneta)

Now in the app: 30 places to eat, 30 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: 7 Portes; Can Culleretes; Els Quatre Gats; Cervecería Catalana; Ciutat Comtal; Cuines Santa Caterina; Les Quinze Nits; Mercat de la Boqueria; El Nacional; Granja M. Viader; Granja La Pallaresa; Escribà; Horchatería Sirvent; La Nena Farm & Chocolate Shop; Dulcinea; Churrería Manuel San Román; La Selecta; Pompa; Konig; Sopa; Alice Secret Garden; Sant Antoni Market; Mercat de Santa Caterina; La Tierra Slow Food Market; Mercat de Sarrià; Palo Alto Market Fest; La Esquinica; Pez Vela; El Quim de la Boqueria; La Mar Salada

Already in the app — things to do: Sagrada Família; Park Güell; L'Aquàrium de Barcelona; Barcelona Zoo; CosmoCaixa; Tibidabo amusement park; Magic Fountain of Montjuïc / Font Màgica; Montjuïc cable car / Telefèric de Montjuïc; Poble Espanyol; Casa Batlló; Museu Blau natural sciences museum / Museu Blau; Chocolate Museum / Museu de la Xocolata; La Boqueria market / Mercat de la Boqueria; Parc de la Ciutadella; Barceloneta beach; JumpYard; Casa dels Entremesos; Plaça del Rei; Nova Icària beach; Bogatell beach; Port Cable Car; Barcelona Wax Museum; Parc Joan Miro; Joan Brossa Gardens; Plaça de Masadas; Bunkers del Carmel (Turó de la Rovira); Picasso Museum; FC Barcelona Museum and Camp Nou tour; Sant Pau Art Nouveau Site; Temple of the Sacred Heart (Tibidabo)

### jp-hokkaido — Hokkaido (Japan)
Area covered: Hokkaido (also known as / includes: hokkaido, sapporo, otaru, furano, biei, asahikawa)

Now in the app: 27 places to eat, 33 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Sapporo Beer Garden / サッポロビール園; Soup Curry Garaku / スープカレー GARAKU; Nemuro Hanamaru JR Tower Stellar Place / 回転寿司 根室花まる JRタワーステラプレイス店; Sumire Sapporo Honten / すみれ 札幌本店; Kani Honke Sapporo Ekimae Honten / 札幌かに本家 札幌駅前本店; Otaru Masazushi Honten / おたる政寿司 本店; Wakadori Jidai Naruto Honten / 若鶏時代なると 本店; Lucky Pierrot Bay Area Honten / ラッキーピエロ ベイエリア本店; Ajisai Honten / 函館麺厨房 あじさい 本店; Kumagera / くまげら; Nijo Market / 二条市場; Hakodate Morning Market / 函館朝市; LeTAO Honten / 小樽洋菓子舗ルタオ 本店; Rokkatei Sapporo Honten / 六花亭 札幌本店; Kitakaro Sapporo Honkan / 北菓楼 札幌本館; Furano Delice / フラノデリス; Jingisukan Daruma; Sapporo Genghis Khan; Sumibiyaki Jingisukan Ishida; Ganso Sapporo Ramen Yokocho; Suage; Hotei; Hyousetsu No Mon; Uni Senmonten Yoichiya Hakodate Asaichi Branch; Miso Senka Ramen Shop TSUBAKI; Sapporo Zangi Hompo Sapporo Station Store; Furano Wine House

Already in the app — things to do: Otaru Aquarium / おたる水族館; Otaru Museum (Main Building) / 小樽市総合博物館 本館; Mt Moiwa Ropeway / もいわ山ロープウェイ; Moerenuma Park / モエレ沼公園; Sapporo Science Center / 札幌市青少年科学館; Takino Suzuran Hillside National Park / 国営滝野すずらん丘陵公園; Nijo Market / 二条市場; Okurayama Ski Jump Stadium / 大倉山ジャンプ競技場; Otaru Tenguyama Ropeway / 小樽天狗山ロープウエイ; Otaru Canal / 小樽運河; Sakaimachi Street / 堺町通り; Sapporo Satoland / サッポロさとらんど; JR Tower Observatory T38 / JRタワー展望室 タワー・スリーエイト; Odori Park / 大通公園; Otaru Sankaku Market / 小樽三角市場; Asahiyama Zoo; Shiroi Koibito Park; Chacha World; Historical Village of Hokkaido; AOAO SAPPORO; Sunpiazza Aquarium; Sapporo Teine Snow Land; Farm Tomita; Otaru Music Box Museum Main Building; Funkawan Bay Panorama Park / 噴火湾パノラマパーク; Kamuinomori Park / カムイの杜公園; Okhotsk Drift Ice Park / 北海道立オホーツク流氷公園; Yumenomori Park Visitor Center / ゆめの森公園 ビジターセンター; Hakodate Kids Plaza / はこだてキッズプラザ; Hakodate Miraikan / はこだてみらい館; Kenbuchi Picture Book Museum / 剣淵町 絵本の館; Ashoro Museum of Paleontology / 足寄動物化石博物館; Miyama Toge Art Park / 深山峠アートパーク

### cn-xian — Xi'an (China)
Area covered: Xi'an (also known as / includes: xian, xi'an, terracotta, city wall, muslim quarter)

Now in the app: 28 places to eat, 34 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: De Fa Chang / 德发长饺子馆; Tong Sheng Xiang / 同盛祥; Lao Sun Jia / 老孙家饭庄; Xi'an Fanzhuang / 西安饭庄; Zui Chang'an / 醉长安; Lao Mi Jia Paomo / 老米家大雨泡馍; First Noodle Under the Sun / 天下第一面; Jia San Soup Dumplings / 贾三灌汤包子馆; Fan Ji Lazhi Roujiamo / 樊记腊汁肉夹馍; Wei Jia Liangpi / 魏家凉皮; Muslim Quarter (Beiyuanmen) / 回民街 北院门; Yongxingfang / 永兴坊; De Mao Gong / 德懋恭; Miqi Bakery / 米旗; Ziwu Road Zhangji Roujiamo / 子午路张记肉夹馍; Qinyu Roujiamo / 秦豫肉夹馍; Guoyuanzhai Mijia Paomo / 果渊斋米家泡馍; Shengzhiwang Sesame Niangpi / 盛志望麻酱酿皮; Dingjia Xiaosurou / 定家小酥肉; Pangzi Zenggao / 胖子甑糕; Xiaojia Babaozhou / 小贾八宝粥; Jiasan Guan Tang Bao; Lao Li Jia Biangbiang Mian; Xi'an Impression; Tongxin Restaurant / 同心楼; Haidilao (Wanhecheng) / 海底捞火锅 万和城店; Ruixiangyuan Mipi Roujiamo / 瑞香缘米皮肉夹馍 莲湖店; Li Weiyi Meatball Hulatang / 清真李唯一优质肉丸糊辣汤

Already in the app — things to do: Terracotta Army / 秦始皇帝陵博物院 兵马俑; Xi'an City Wall / 西安城墙; Shaanxi History Museum / 陕西历史博物馆; Bell Tower / 西安钟楼; Tang Paradise / 大唐芙蓉园; Datang Everbright City / 大唐不夜城; Muslim Quarter street food / 回民街; Huaqing Palace / 华清宫; Daming Palace National Heritage Park / 大明宫国家遗址公园; Xi'an Banpo Museum / 西安半坡博物馆; Qujiang Polar Ocean Park / 西安曲江极地海洋公园; Xi'an Museum and Small Wild Goose Pagoda / 西安博物院 小雁塔; Qinling Wildlife Park / 秦岭野生动物园; Xingqing Palace Park / 兴庆宫公园; Shaanxi Natural History Museum / 陕西自然博物馆; Giant Wild Goose Pagoda and Da Ci'en Temple / 大慈恩寺 · 大雁塔; Terracotta Warriors; Ancient City Walls; Big Wild Goose Pagoda; Datang Bu Ye Cheng; Xingqinggong Park; Muslim Quarter; Xi'an Museum; Small Wild Goose Pagoda; Qujiang Ocean World; Stele Forest (Beilin Museum); Shaanxi Science and Technology Museum / 陕西科技馆; Xi’an Art Museum / 西安美术馆; Han Yangling Museum / 汉景帝阳陵博物院; Chang’an Twelve Hours Theme Street / 长安十二时辰主题街区; Wasai Happy Planet / 哇塞快乐星球; Huaxia Wenlv Xi’an Resort / 华夏文旅西安度假区; Duyi Ruins Park / 杜邑遗址公园; Chanba National Wetland Park / 西安浐灞国家湿地公园
