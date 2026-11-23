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

### vn-danang — Da Nang & Hoi An (Vietnam)
Area covered: Da Nang & Hoi An (also known as / includes: da nang, danang, hoi an, ba na, bana hills, my khe)

Already in the app — places to eat: Mì Quảng Bà Mua; Bánh Xèo Bà Dưỡng; Madame Lân; Bé Mặn; Thìa Gỗ; Quán Trần; Morning Glory Original; Miss Ly Cafe; Bale Well; Bánh Mì Phượng; Madam Khanh The Banh Mi Queen; Chợ Cồn; Cộng Cà Phê Bạch Đằng; Hoi An Roastery; The Cargo Club; Epice Restaurant; The Temptation French Restaurant; Chops Da Nang; Osteria al Mare; Rang Restaurant; Bistecca Italian Restaurant; Han Market; Bac My An Market; Mango Mango; Soul Kitchen; La Plage; Good Morning Vietnam Pizza

Already in the app — things to do: Sun World Ba Na Hills / Sun World Bà Nà Hills; Asia Park (Sun World Danang Wonders); Marble Mountains / Ngũ Hành Sơn; VinWonders Nam Hoi An; Hoi An Ancient Town / Phố cổ Hội An; Bay Mau Coconut Forest basket boats / Rừng dừa Bảy Mẫu; Museum of Cham Sculpture / Bảo tàng Điêu khắc Chăm; Dragon Bridge fire show / Cầu Rồng; Than Tai Hot Spring Park / Công viên Suối khoáng nóng Núi Thần Tài; Art in Paradise 3D Museum; Han Market / Chợ Hàn; Linh Ung Pagoda, Son Tra / Chùa Linh Ứng Bãi Bụt; Tra Que Vegetable Village / Làng rau Trà Quế; My Khe Beach / Bãi biển Mỹ Khê; Hoi An Memories Land and show / Ký Ức Hội An; Hoi An Night Market and lantern boats / Chợ đêm Hội An; An Bang Beach / Bãi biển An Bàng; APEC Park / Công viên APEC; Mikazuki Water Park 365; Hoa Phu Thanh; Son Tra Peninsula; Cham Islands / Cù Lao Chàm

### cn-chengdu — Chengdu and Jiuzhaigou (China)
Area covered: Chengdu and Jiuzhaigou (also known as / includes: chengdu, sichuan, jiuzhaigou, huanglong, panda base, kuanzhai)

Already in the app — places to eat: Chen Mapo Tofu / 陈麻婆豆腐 青华路店; Ming Ting Fandian / 明婷饭店; Ma Wang Zi / 马旺子川小馆; Tao De Sha Guo (Chunxi Road) / 陶德砂锅 春熙路店; Wenshu Monastery Vegetarian Restaurant / 文殊院素斋; Shu Jiu Xiang Hot Pot / 蜀九香火锅酒楼; Huangcheng Laoma / 皇城老妈; Xiaolongkan Hot Pot / 小龙坎老火锅 春熙店; Long Chao Shou / 龙抄手 春熙路总店; Zhong Shuijiao (People's Park) / 钟水饺 人民公园店; Nuorilang Restaurant / 诺日朗餐厅; Lai Tang Yuan / 赖汤圆 总府路店; Heming Teahouse / 鹤鸣茶社; Gongting Pastry Shop / 宫廷糕点铺; Peter's Tex-Mex Grill; Chunyang Guan / 纯阳馆鱼香排骨面 吉祥街店; Chongqing Blanket Noodles / 重庆铺盖面 四道街店; Dan Dumplings / 但水饺; He Dumplings / 贺水饺; Zha Zha Noodles / 查渣面 宽窄巷子长顺店; Zhang Laowu Liangfen / 张老五凉粉店 槐树街店; Xiao Ming Tang Dandan Noodles / 小名堂担担甜水面 东城根上街店; He Ji Egg Cakes / 贺记蛋烘糕 文庙西街店; Nanchong Taste / 南充味道·正宗川北凉粉顺庆米粉; Mi Xun Teahouse / 谧寻茶室 成都居舍店

Already in the app — things to do: Chengdu Research Base of Giant Panda Breeding / 成都大熊猫繁育研究基地; Chengdu Zoo / 成都动物园; Chengdu Museum of Natural History / 成都自然博物馆; Sichuan Science and Technology Museum / 四川科技馆; Chengdu Museum / 成都博物馆; Haichang Polar Ocean Park / 成都海昌极地海洋公园; Chengdu Happy Valley / 成都欢乐谷; Du Fu Thatched Cottage / 杜甫草堂; Wide and Narrow Alleys / 宽窄巷子; Jinli Ancient Street / 锦里古街; Dujiangyan Irrigation System / 都江堰景区; Jiuzhaigou Valley / 九寨沟; Chengdu Teddy Bear Museum / 成都泰迪熊博物馆; Sanxingdui Museum / 三星堆博物馆; People's Park / 人民公园; Haihai Cube Aquarium / 浩海立方海洋馆; Shiye Natural History Museum / 拾野自然博物馆; Cloud Paradise Play Park / 云朵乐园; Lu Ke Island / 麓客岛; Lichao Aviation Museum / 立巢航空博物馆; Mount Qingcheng; Wuhou Shrine / 成都武侯祠博物馆; Jiaozi Park / 交子公园; Super Neobio / 超级奈尔宝·儿童乐园; Chengdu Science Fiction Museum / 成都科幻馆; Chengdu Xin Zhihui Music Museum / 成都芯智慧音乐博物馆

### jp-hokkaido — Hokkaido (Japan)
Area covered: Hokkaido (also known as / includes: hokkaido, sapporo, otaru, furano, biei, asahikawa)

Already in the app — places to eat: Sapporo Beer Garden / サッポロビール園; Soup Curry Garaku / スープカレー GARAKU; Nemuro Hanamaru JR Tower Stellar Place / 回転寿司 根室花まる JRタワーステラプレイス店; Sumire Sapporo Honten / すみれ 札幌本店; Kani Honke Sapporo Ekimae Honten / 札幌かに本家 札幌駅前本店; Otaru Masazushi Honten / おたる政寿司 本店; Wakadori Jidai Naruto Honten / 若鶏時代なると 本店; Lucky Pierrot Bay Area Honten / ラッキーピエロ ベイエリア本店; Ajisai Honten / 函館麺厨房 あじさい 本店; Kumagera / くまげら; Nijo Market / 二条市場; Hakodate Morning Market / 函館朝市; LeTAO Honten / 小樽洋菓子舗ルタオ 本店; Rokkatei Sapporo Honten / 六花亭 札幌本店; Kitakaro Sapporo Honkan / 北菓楼 札幌本館; Furano Delice / フラノデリス; Jingisukan Daruma; Sapporo Genghis Khan; Sumibiyaki Jingisukan Ishida; Ganso Sapporo Ramen Yokocho; Suage; Hotei; Hyousetsu No Mon; Uni Senmonten Yoichiya Hakodate Asaichi Branch; Miso Senka Ramen Shop TSUBAKI; Sapporo Zangi Hompo Sapporo Station Store; Furano Wine House

Already in the app — things to do: Otaru Aquarium / おたる水族館; Otaru Museum (Main Building) / 小樽市総合博物館 本館; Mt Moiwa Ropeway / もいわ山ロープウェイ; Moerenuma Park / モエレ沼公園; Sapporo Science Center / 札幌市青少年科学館; Takino Suzuran Hillside National Park / 国営滝野すずらん丘陵公園; Nijo Market / 二条市場; Okurayama Ski Jump Stadium / 大倉山ジャンプ競技場; Otaru Tenguyama Ropeway / 小樽天狗山ロープウエイ; Otaru Canal / 小樽運河; Sakaimachi Street / 堺町通り; Sapporo Satoland / サッポロさとらんど; JR Tower Observatory T38 / JRタワー展望室 タワー・スリーエイト; Odori Park / 大通公園; Otaru Sankaku Market / 小樽三角市場; Asahiyama Zoo; Shiroi Koibito Park; Chacha World; Historical Village of Hokkaido; AOAO SAPPORO; Sunpiazza Aquarium; Sapporo Teine Snow Land; Farm Tomita; Otaru Music Box Museum Main Building

### jp-tohoku — Tohoku (Japan)
Area covered: Tohoku (also known as / includes: tohoku, sendai, zao, ginzan, yamagata, aomori)

Already in the app — places to eat: Rikyu Sendai Station Gyutan-dori / 牛たん炭焼 利久 仙台駅店; Aji Tasuke Honten / 味太助 本店; Azumaya Honten / 東家 本店; Pyon Pyon Sha Morioka Ekimae / ぴょんぴょん舎 盛岡駅前店; Pairon Honten / 白龍 本店; Ajino Sapporo Onishi / 味の札幌 大西; Shojiya Honten / 庄司屋 本店; Sendai Asaichi Morning Market / 仙台朝市; Matsushima Fish Market / 松島さかな市場; Aomori Gyosai Center / 青森魚菜センター; A-Factory / A-FACTORY; Zunda Saryo Sendai Station / ずんだ茶寮 仙台駅店; Fukuda Pan Honten / 福田パン 長田町本店; Taisho Roman Tea Room / 大正浪漫喫茶室; Ton Galliano Sendai Ekimae / トン・ガリアーノ仙台駅前店; Tanya Zenjiro Minamimachi-dori / たんや善治郎 南町通り店; Restaurant HACHI Sendai Honten; Restaurant Kaitakuka / レストラン開拓家; Cafe Craft / カフェ クラフト; Keyaki Cafe / ケヤキカフェ; Forest Kitchen with Outdoor Living / フォレストキッチン ウィズ アウトドアリビリング

Already in the app — things to do: Sendai Umino-Mori Aquarium / 仙台うみの杜水族館; Miyagi Zao Fox Village / 宮城蔵王キツネ村; Matsushima Bay pleasure cruise / 松島島巡り観光船; Sendai Mediatheque / せんだいメディアテーク; Yagiyama Zoological Park / 仙台市八木山動物公園 フジサキの杜; Spa Resort Hawaiians / スパリゾートハワイアンズ; Tsuruga Castle / 鶴ヶ城; Ouchi-juku thatched post town / 大内宿; Nebuta Museum Wa Rasse / ねぶたの家 ワ・ラッセ; Aomori Fish Market Nokke-don / 青森魚菜センター（のっけ丼）; Hirosaki Park / 弘前公園; Lake Towada sightseeing cruise / 十和田湖遊覧船; Akita City Omoriyama Zoo / 大森山動物園; Akita Neburi Nagashi Kan / 秋田市民俗芸能伝承館（ねぶり流し館）; Kakunodate samurai district / 角館武家屋敷通り; Kidsland US Sendai Nishikigaoka / キッズランドUS仙台錦ケ丘店; Sendai Anpanman Children's Museum & Mall / 仙台アンパンマンこどもミュージアム＆モール; Yagiyama Benyland / 八木山ベニーランド; HOKUSHU Sendai City Science Museum / 仙台市科学館; Kansei-no-Mori / 感性の森; JOYPOLIS SPORTS AEON Sendai Nakayama / JOYPOLIS SPORTS イオン仙台中山店; Sendai Astronomical Observatory / 仙台市天文台; Skids Garden Yodobashi Sendai / スキッズガーデン ヨドバシ仙台店; Aomori Prefectural Asamushi Aquarium; Sannai Maruyama Site; Aomori Museum of Art; Gappo Park; Oirase Stream; Tsurunomai Bridge; Hasshoku Center
