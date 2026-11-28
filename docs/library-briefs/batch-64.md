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

### id-lombok — Lombok and the Gili islands (Indonesia)
Area covered: Lombok and the Gili islands (also known as / includes: lombok, gili trawangan, gili air, gili meno, gili islands, rinjani)

Now in the app: 33 places to eat, 23 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Asmara Restaurant; Square Restaurant; Lotus Bayview; Rumah Makan Taliwang Irama; Sate Rembiga Ibu Sinnaseh; Nasi Balap Puyung Inaq Esun; El Bazar Cafe & Restaurant; Warung Flora; Scallywags Seafood Bar & Grill; Scallywags Beach Club; Regina Pizzeria; Gili Trawangan Night Market; Lombok Epicentrum Mall; Gili Gelato; Kayu Cafe; Milk Espresso; KRNK; Coco Beach Restaurant; Laut Biru Bar & Restaurant; Café Alberto; Lotus Bayview Restaurant; Amatera Restaurant & Bar; Quali Asian Dining; The Well; Anchor Café; Skatepark Tribe; Bara; Munchies; Ashtari; Warung Wajan; Limo Warung; Coffee Corner; Gili Teak

Already in the app — things to do: Sendang Gile and Tiu Kelep waterfalls; Benang Kelambu waterfall; Selong Belanak Beach; Mandalika Beach; Pink Beach (Tangsi); Lombok Wildlife Park; Gili Meno Turtle Sanctuary; Mayura Water Palace; West Nusa Tenggara State Museum; Sade Sasak Village; Senggigi Beach; Bale Mangrove Ecotourism; Mawun Beach; Tanjung Aan Beach; Senggigi Night Market; Islamic Center NTB (Hubbul Wathan Mosque) / Islamic Center NTB Hubbul Wathan; Kuta Mandalika Beach; Bukit Seger; Semeti Beach; Sendang Gile; Tiu Kelep Waterfall; Gili Nanggu; YIN Jewellery silver class

### kr-gangwon — Nami Island and Gangwon (South Korea)
Area covered: Nami Island and Gangwon (also known as / includes: nami island, namiseom, chuncheon, gapyeong, gangwon, pyeongchang)

Now in the app: 30 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Tongnamujip Dakgalbi / 통나무집닭갈비; Wonjo Sutbul Dakbulgogi / 원조숯불닭불고기집; Chodang Halmeoni Sundubu / 초당할머니순두부; Donghwa Garden / 동화가든; Gangneung Gamja Ongsimi / 강릉감자옹심이; Bongpo Meoguri-jip / 봉포머구리집; Dancheon Sikdang / 단천식당; Hwangtae Hoegwan / 황태회관; Napjak Sikdang / 납작식당; Sokcho Tourist & Fishery Market / 속초관광수산시장; Manseok Dakgangjeong / 만석닭강정 본점; Gangneung Jungang Market / 강릉중앙시장; Terarosa Coffee Factory / 테라로사 커피공장; Bohemian Roasters / 보헤미안 박이추 커피공장; Cafe Gamjabat / 카페 감자밭; Sundubu Gelato / 순두부젤라또 1호점; Kitchen Onyu / 키친온유; Sodori / 소도리; Gangnaengi Sokuri / 강냉이소쿠리; Pyeongchang Hanwoo Maeul Myeonon Branch / 평창한우마을 면온점; Pyeongchang Hanwoo Maeul Daegwallyeong Branch / 평창한우마을 대관령점; Daegwallyeong Tojong Hanwoo / 대관령토종한우; Yong Udong Alpensia Branch / 용우동 알펜시아점; Gangmun Jumak / 강문주막; Chodang Jang Kalguksu / 초당장칼국수; Matsu; Daeunjeong (Wonju) / 대운정; Chuncheon Ani Dakgalbi / 춘천애니닭갈비; Hyojadong Seolleongtang (Oak Valley) / 효자동설렁탕 오크밸리점; Green Valley Barbecue (Chuncheon) / 그린벨리바베큐

Already in the app — things to do: Nami Island / 남이섬; LEGOLAND Korea Resort / 레고랜드 코리아; Seoraksan cable car / 설악산 케이블카; Daegwallyeong Sheep Farm / 대관령양떼목장; Alpaca World / 알파카월드; Gangchon Rail Bike / 강촌레일파크; Gyeongpo Beach / 경포해변; Anmok Beach coffee street / 안목해변 커피거리; Sokcho Tourist and Fishery Market / 속초관광수산시장; Ojukheon House and Gangneung Museum / 오죽헌; Soyang River Skywalk / 소양강스카이워크; Chuncheon Animation Museum and Toy Robot Studio / 춘천 애니메이션박물관&토이로봇관; Chuncheon National Museum and Children's Museum / 국립춘천박물관; Chuncheon Puppet Theatre and Puppet Museum / 춘천인형극장&인형극박물관; Sokcho Museum / 속초시립박물관; Samyang Roundhill / 삼양라운드힐; Chuncheon Makguksu Museum / 춘천막국수체험박물관; Gyeongpo Aquarium / 경포아쿠아리움; Hanwha Resort Seorak Waterpia / 설악 워터피아; Jayeona Nolja / 자연아놀자; Gangneung Wonder Sky / 강릉 원더스카이; Sogeumsan Suspension Bridge / 소금산 출렁다리; National Gangwon Science Museum / 국립강원전문과학관; World King (Chuncheon) / 월드킹 춘천점; Design Thinking Museum / 디자인씽킹뮤지엄; Gangwon Police Museum / 강원경찰박물관

### p-orlando — Orlando (United States)
Area covered: Orlando (also known as / includes: orlando, kissimmee, kennedy space center, cape canaveral, theme parks)

Now in the app: 27 places to eat, 29 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Rainforest Cafe; T-REX Cafe; Chef Mickey's; Chef Art Smith's Homecomin'; The Toothsome Chocolate Emporium; Bubba Gump Shrimp Co.; Cafe Tu Tu Tango; Hash House A Go Go; Columbia Restaurant; Earl of Sandwich; The Polite Pig; Three Broomsticks; Gideon's Bakehouse; Voodoo Doughnut; ʻOhana; Sanaa; Hot Dog Hall of Fame; Antojitos Authentic Mexican Food; Sugar Factory; Shake Shack; Ford's Garage; The Cheesecake Factory; Erin McKenna's Bakery NYC; Ghirardelli Soda Fountain & Chocolate Shop; Grills Lakeside Seafood Deck; The Burrow Cafe and Play; Andretti Indoor Karting & Games

Already in the app — things to do: Magic Kingdom; EPCOT; Disney's Animal Kingdom; Disney's Hollywood Studios; Universal Studios Florida; Universal's Islands of Adventure; Universal Epic Universe; LEGOLAND Florida; SeaWorld Orlando; Aquatica Orlando; Kennedy Space Center Visitor Complex; Gatorland; Orlando Science Center; Crayola Experience Orlando; SEA LIFE Orlando Aquarium; Wild Florida Gator Park and airboats; Disney Springs; Lake Eola Park; Orlando Farmers Market at Lake Eola; WonderWorks Orlando; Dezerland Park; Madame Tussauds Orlando; Central Florida Zoo & Botanical Gardens; Peppa Pig Theme Park Florida; Ripley's Believe It or Not! Orlando; Museum of Illusions Orlando; Escapology (Sunset Walk); Orlando Tree Trek Adventure Park; Kissimmee Lakefront Park

### cn-yunnan — Yunnan (China)
Area covered: Yunnan (also known as / includes: yunnan, kunming, lijiang, dali, shangri-la, erhai)

Now in the app: 28 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Lao Fangzi / 昆明老房子; 1910 La Gare du Sud / 1910火车南站; Shiping Huiguan / 石屏会馆; Fu Zhao Lou / 福照楼; Meizi Jing / 梅子井酒家; Yi Ran Tang / 一然堂; Amayi Naxi Snacks / 阿妈意纳西饮食院; No. 88 Snack Shop / 88号小吃店; Jianxin Yuan / 建新园; Zhuanxin Farmers' Market / 篆新农贸市场; Zai Hui Shou / 再回首; Zhongyi Market / 忠义市场; Jiahua Flower Cakes / 嘉华鲜花饼; Bakery 88 / 88号西点店; Wicker Basket; Yike Yin; Hongdouyuan Restaurant; Prague Cafe Coffee Hall; Laris Steak House; Cacaja Indian Restaurant; Haidilao Hot Pot; Lao Dian Shanzhai / 老滇山寨 春城路店; Dashanqing Yun Xiaoguan / 大山情·云小馆 东风广场明通巷店; Ershiliu Jiaren / 二十六家人·云南26个民族菜 会展滇池小镇店; Nanzhao Dong Xiaopang / 南诏董小胖; Jixiang Hong / 吉祥红·云南菜白族风味店; Jinhua Xiao Amei / 金花小阿妹·白族手工菜; Lan Yunnan Bistro / Lan岚·云南菜·bistro

Already in the app — things to do: Stone Forest (Shilin) / 石林; Green Lake Park / 翠湖公园; Yunnan Provincial Museum / 云南省博物馆; Yunnan Nationalities Village / 云南民族村; Kunming Zoo / 昆明动物园; Jade Dragon Snow Mountain and Blue Moon Valley / 玉龙雪山 蓝月谷; Black Dragon Pool Park, Lijiang / 黑龙潭公园; Dali Old Town / 大理古城; Cangshan cable cars / 苍山索道; Kunming World Horticultural Expo Garden; Lijiang Old Town; Chongsheng Temple and the Three Pagodas / 崇圣寺三塔; Dali Museum / 大理市博物馆; Yan Compound, Xizhou / 喜洲严家大院; Mu's Residence, Lijiang / 木府; Butterfly Spring, Dali / 蝴蝶泉; Daguan Park, Kunming / 大观公园; Western Hills, Kunming / 西山; Jiuxiang Scenic Area caves / 九乡风景区; Yuantong Temple, Kunming / 圆通寺; Yuantong Temple; Dianchi Lake; Western Hills; Sunac Kunming Sea World / 昆明融创海世界; Erhai Park / 洱海公园; Xizhou Old Town / 喜洲古镇
