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

### tw-south — Tainan and Kaohsiung (Taiwan)
Area covered: Tainan and Kaohsiung (also known as / includes: tainan, kaohsiung, anping, lotus pond, kenting, cijin)

Now in the app: 26 places to eat, 36 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Du Hsiao Yueh / 度小月擔仔麵 原始店; A-Xia Restaurant / 阿霞飯店; Chou's Shrimp Rolls / 周氏蝦捲 安平總店; Wen Chang Beef Soup / 文章牛肉湯; A-Tang Salty Congee / 阿堂鹹粥 (無名鹹粥); Fu Sheng Hao Rice Cake / 富盛號碗粿; Gang Yuan Beef Noodles / 港園牛肉麵; Ya Rou Zhen / 鴨肉珍; Smokey Joe's / 冒煙的喬 高雄自由店; Tainan Garden Night Market / 花園夜市; Liuhe Night Market / 六合夜市; Xing Long Ju / 興隆居; Tongji Anping Bean Jelly / 同記安平豆花; Lily Fruit Shop / 莉莉水果店; Hai Zhi Bing / 渡船頭海之冰; Wu Pao Chun Bakery / 吳寶春麥方店 高雄店; Memphis American Family Restaurant / 孟菲斯美式親子餐廳; Marie Taotao Family Restaurant / 瑪莉桃桃親子生活餐廳; Zone Cafe Family Restaurant / Zone Cafe弄咖啡親子餐廳; Er Mu Yan Wu Private Kitchen / 貳木言午; 217 Hao Shi Restaurant / 217好食複合式餐廳; The Circus in the Forest Taisugar / 森林中的馬戲團-糖廍; Happy Mama Family Restaurant / Happy Mama 親子餐廳; Ryan Cafe & Milk Tea / 萊恩咖啡 RYAN CAFE & MILK TEA; Cozzi Hotel Ximen Tainan family restaurant / 和逸飯店台南西門館; Tainan Lòng Story / 南埕衖事

Already in the app — things to do: Anping Fort / 安平古堡; Chihkan Tower / 赤崁樓; Chimei Museum / 奇美博物館; Tainan Garden Night Market / 台南花園夜市; Tainan City Library main branch / 台南市立圖書館新總館; National Science and Technology Museum / 國立科學工藝博物館; Kaohsiung Railway Workshop kids' park / 高雄親子遊樂園區(台鐵高雄機廠); Baoan Container Children's Park / 保安兒童貨櫃主題公園; Lotus Pond Children's Park / 蓮池潭兒童公園; Pier-2 Art Center and its small train / 駁二藝術特區; Kaohsiung Shoushan Zoo / 壽山動物園; Wanpi World Safari Zoo / 頑皮世界野生動物園; Cijin Island and Seaside Park / 旗津; Kaohsiung Children's Art Museum / 高雄市立美術館兒童美術館; National Museum of Taiwan Literature / 國立臺灣文學館; Nanying Family Centre / 南瀛親子館; Heqiaopai Sausage Museum / 黑橋牌香腸博物館; Rende Dinosaur Park / 仁德恐龍公園; Niuchouzi Station Park / 牛稠子車站公園; Longtian ChaCha Heritage Education Park / 隆田ChaCha文化資產教育園區; Shu Gu Life Science Museum / 樹谷生活科學館; Zuozhen Fossil Park / 臺南左鎮化石園區; Shugu Farm / 樹谷農場; Yesen Animal School / 野森動物學校; Tom Bebe Kaohsiung Yixiang / 湯姆貝貝高雄義享店; PaPark Dream Mall / PaPark爬爬客親子樂園 夢時代店; FLOMO Eraser Factory / FLOMO富樂夢觀光工廠; Jingyuan Farm / 淨園休閒農場; Ten Drum Cultural Village / 十鼓文創園區; Tainan Astronomical Education Area / 南瀛天文館; Taiwan Wood Story Museum / 台灣木材故事館; Shuiliuzhuang Ranch / 水流莊牧場; Shidai Park / 時代公園; E-DA Theme Park / 義大遊樂世界; Kaohsiung Time and Space City / 高雄時空之城; Suzuka Circuit Park (Taroko Park) / 大魯閣草衙道鈴鹿賽道樂園

### at-vienna — Vienna (Austria)
Area covered: Vienna (also known as / includes: vienna, wien, schonbrunn, prater, stephansplatz, belvedere)

Now in the app: 31 places to eat, 29 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Figlmüller Wollzeile; Plachutta Wollzeile; Schweizerhaus; Luftburg - Kolarik im Prater; Salm Bräu; Griechenbeisl; Glacis Beisl; Mayer am Pfarrplatz; Zwölf Apostelkeller; Naschmarkt; Bitzinger Würstelstand Albertina; Trzesniewski; Café Central; Demel; Aida Stephansplatz; Zanoni & Zanoni; Brasserie Palmenhaus; Lugeck; Ufertaverne; Wrenkh; Am Nordpol 3; Ristorante Sole; Praterwirt; Kuchenamt; Kulturcafé Tachles; Baomi; Family & Friends; Kinderspiel – das Familiencafé; Sieben Zwerge; Melman’s; Dschungel Café

Already in the app — things to do: Schönbrunn Zoo (Tiergarten Schönbrunn); Wurstelprater funfair; Vienna Giant Ferris Wheel (Riesenrad); Haus des Meeres (Aqua Terra Zoo); ZOOM Children's Museum; Technical Museum Vienna with miniTi; Schönbrunn maze and Labyrinthikon playground; Natural History Museum Vienna; Vienna Christmas Market at the Rathaus; Wiener Eistraum ice rink; Naschmarkt; House of Music (Haus der Musik); Butterfly House (Schmetterlinghaus); Danube Tower (Donauturm); Sisi Museum and Imperial Apartments; Donauinsel; Alte Donau; Lainzer Tiergarten; Stadtpark; Kahlenberg; Gloriette; Hundertwasser Museum; MuseumsQuartier; Palmenhaus; Leos Rumpelkiste; Augarten; St. Stephen’s Cathedral / Stephansdom; Kunsthistorisches Museum; Dschungel Wien

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
