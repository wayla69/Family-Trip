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

### ca-vancouver — Vancouver (Canada)
Area covered: Vancouver (also known as / includes: vancouver, stanley park, granville island, gastown, whistler, capilano)

Now in the app: 20 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: The Sandbar Seafood Restaurant; Cactus Club Cafe English Bay; White Spot; The Old Spaghetti Factory; Sun Sui Wah Seafood Restaurant; The Teahouse in Stanley Park; Cardero's Restaurant; Ramen Danbo; Granville Island Public Market; Japadog; Go Fish; Lonsdale Quay Market; Earnest Ice Cream; Rain or Shine Ice Cream; Lee's Donuts; Purebread; Nook (Kitsilano); Sophie's Cosmic Cafe; Via Tevere Pizzeria (Victoria Drive); Burgoo (Main Street)

Already in the app — things to do: Vancouver Aquarium; Science World; Capilano Suspension Bridge Park; Granville Island Public Market; Granville Island Kids Market; Grouse Mountain; Playland; H.R. MacMillan Space Centre; Lynn Canyon Park; Bloedel Conservatory; VanDusen Botanical Garden; Museum of Vancouver; Variety Kids Water Park, Stanley Park; Stanley Park playgrounds and Second Beach; Burnaby Village Museum; Vancouver Maritime Museum; FlyOver Canada; Maplewood Farm; Second Beach Pool; Totem poles, Brockton Point; Lost Lagoon loop; Go Bananas (North Vancouver); Vancouver Central Library; Kitsilano Beach; English Bay Beach; Spanish Banks

### cn-zhangjiajie — Zhangjiajie (China)
Area covered: Zhangjiajie (also known as / includes: zhangjiajie, tianmen, wulingyuan, fenghuang)

Now in the app: 25 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Starbucks Biaozhimen / 星巴克 标志门街区; Hu Shifu Sanxiaguo / 胡师傅三下锅; Le Kou Fu / 乐口福; Tang Shifu Tujia Restaurant / 唐师傅土家食府; Zhaizili Bobo Cai / 寨子里的钵钵菜; Suoxi Shanzhai / 索溪山寨 湘西民间土菜; Zui Xiang Qin / 醉湘亲私房菜; V Cafe (Pullman Zhangjiajie) / 张家界京武铂尔曼酒店; Maoshi Specialty Restaurant / 毛氏小馆; Zhunaoke Cold Noodles / 猪脑壳凉面 南正街店; McDonald's Tianzi Mountain / 麦当劳 天子山餐厅; Xibu Street / 溪布街; KFC Biaozhimen / 肯德基 标志门街区; Chayan Yuese Biaozhimen / 茶颜悦色 标志门街区; Zhaisao Dangjia Restaurant / 寨嫂当家; Gongpopo Tujia Kitchen / 龚婆婆土厨; Yixinyuan Private Kitchen / 颐馨源私房菜; Tangshifu Xiangxi Specialty Restaurant (Wulinyuan Branch) / 唐师傅湘西名菜馆 (武陵源店); Huangjincheng Korean Barbeque / 黄锦城韩式烤肉; Hourong Street / 后溶街; Nanmenkou / 南门口; Wulingyuan Hotel Restaurant; Laozaotai Restaurant; Shuiraosimen Restaurant; Canyon Family

Already in the app — things to do: Zhangjiajie National Forest Park / 张家界国家森林公园; Bailong Elevator / 百龙天梯; Tianzi Mountain cable car / 天子山索道; Tianmen Mountain / 天门山; Zhangjiajie Grand Canyon Glass Bridge / 张家界大峡谷玻璃桥; Yellow Dragon Cave / 黄龙洞; Baofeng Lake / 宝峰湖; Charming Xiangxi show / 魅力湘西; Tianmen Fox Fairy show / 天门狐仙; Golden Whip Stream; Ten-Mile Gallery tram; 72 Strange Buildings / 七十二奇楼; Sky Garden, Tianzi Mountain / 天空之园; Huangshizhai (Yellow Stone Village) / 黄石寨; Zhangjiajie Museum / 张家界市博物馆; Tujia Folk Customs Park / 张家界土家风情园; Tujia Brocade Museum; Boat Ride through the Grand Canyon; Xilankapu Workshop; Misty Rain Zhangjiajie; Tianmen Cave

### cz-prague — Prague (Czechia)
Area covered: Prague (also known as / includes: prague, praha, charles bridge, old town square, mala strana, vltava)

Now in the app: 25 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Lokál Dlouhááá; U Medvídků; U Fleků; Kolkovna Celnice; Mlejnice; Klášterní pivovar Strahov; U Kroka; Vinohradský Parlament; U Pinkasů; Havelská Koruna; Naše maso; Sisters Bistro; Café Louvre; Café Savoy; Ovocný Světozor; Cukrárna Myšák; Výtopna Railway Restaurant; Food Lab; Bruxx; Kulaťák; Občanská plovárna; Kolkovna Olympia; Miminoo Garden Restaurant; Vozovna Stromovka; Café Truhlárna

Already in the app — things to do: Prague Zoo / Zoo Praha; Petřín Hill, tower and mirror maze / Petřín; National Technical Museum / Národní technické muzeum; Prague Castle (main circuit) / Pražský hrad; Museum of Bricks (LEGO museum) / Muzeum Lega; Old Town Hall tower and Astronomical Clock / Staroměstská radnice s orlojem; Aquapalace Praha; Vltava river cruise with Prague Steamboats; Havelské tržiště (Havel's Market) / Havelské tržiště; Spejbl and Hurvínek Theatre / Divadlo Spejbla a Hurvínka; Prague Botanical Garden and Fata Morgana greenhouse / Botanická zahrada Troja; Planetárium Praha; Vyšehrad grounds and playground / Vyšehrad; Charles Bridge / Karlův most; Letná Park / Letenské sady; Museum of Fantastic Illusions; Karel Zeman Museum; Museum of Senses; Public Transport Museum / Muzeum MHD; Toy Museum, Prague Castle / Muzeum hraček; Stromovka park / Královská obora Stromovka

### jp-nikko — Nikko and Kinugawa (Japan)
Area covered: Nikko and Kinugawa (also known as / includes: nikko, kinugawa, chuzenji, oku-nikko, okunikko, senjogahara)

Now in the app: 21 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Meiji-no-Yakata / 明治の館; Nikko Kanaya Hotel Main Dining Room / 日光金谷ホテル メインダイニングルーム; Hippari Dako / ひっぱり凧; Yuba Soba Nikko Momijian / ゆばそば 日光もみぢ庵; Komekichi Kozushi / 米吉 晃寿司; Coffee House Yukon / コーヒーハウス ユーコン; Sakaeya / さかえや; Michi-no-Eki Nikko Nikoniko Honjin / 道の駅日光 日光街道ニコニコ本陣; Nishisando Chaya / 西参道茶屋; Kanaya Hotel Bakery / 金谷ホテルベーカリー; Nikko Coffee Goyoteidori / 日光珈琲 御用邸通; Shogetsu Himuro / 松月氷室; Nikko Pudding Tei / 日光ぷりん亭 日光本店; Baumkuchen Kobo Hachiya / バウムクーヘン工房 はちや; Azconexion; Yuba-gozen Sun Field; Maruhide Shokudo; Nikko Yuba Tsuruya Imaichi; Nikko Monaka / 和スイーツ専門店 日光もなか; Hatsuishi Cafe / 鉢石カフェ; Kumoizu (Nikko) / にほんかし雲IZU 日光店

Already in the app — things to do: Edo Wonderland Nikko Edomura / 日光江戸村; Tobu World Square / 東武ワールドスクウェア; Kegon Falls / 華厳滝; Kinugawa Onsen Ropeway / 鬼怒川温泉ロープウェイ; Nikko Tamozawa Imperial Villa Memorial Park / 日光田母沢御用邸記念公園; Kirifuri Falls / 霧降の滝; Ryuzu Falls / 竜頭の滝; Kanmangafuchi Abyss / 憾満ヶ淵; Nikko Botanical Garden / 日光植物園; Lake Chuzenji Sightseeing Boat / 中禅寺湖遊覧船; Nikko Toshogu Museum / 日光東照宮宝物館; Kanaya Hotel History House / 日光金谷ホテル歴史館; Shinkyo Bridge / 神橋; Senjogahara Marshland / 戦場ヶ原; Lake Chuzenji / 中禅寺湖; Akechidaira Ropeway; Kinugawa River Boat Ride; Nikko Strawberry Park; Kirifuri Highland; Nikko Toshogu Shrine / 日光東照宮; Minogahara Forest Park / 美濃が原森林公園; Rinnoji Temple; Futarasan Shrine; Italian Embassy Villa Memorial Park; Yudaki Falls
