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

### cn-chengdu — Chengdu and Jiuzhaigou (China)
Area covered: Chengdu and Jiuzhaigou (also known as / includes: chengdu, sichuan, jiuzhaigou, huanglong, panda base, kuanzhai)

Already in the app — places to eat: Chen Mapo Tofu / 陈麻婆豆腐 青华路店; Ming Ting Fandian / 明婷饭店; Ma Wang Zi / 马旺子川小馆; Tao De Sha Guo (Chunxi Road) / 陶德砂锅 春熙路店; Wenshu Monastery Vegetarian Restaurant / 文殊院素斋; Shu Jiu Xiang Hot Pot / 蜀九香火锅酒楼; Huangcheng Laoma / 皇城老妈; Xiaolongkan Hot Pot / 小龙坎老火锅 春熙店; Long Chao Shou / 龙抄手 春熙路总店; Zhong Shuijiao (People's Park) / 钟水饺 人民公园店; Nuorilang Restaurant / 诺日朗餐厅; Lai Tang Yuan / 赖汤圆 总府路店; Heming Teahouse / 鹤鸣茶社; Gongting Pastry Shop / 宫廷糕点铺; Peter's Tex-Mex Grill; Chunyang Guan / 纯阳馆鱼香排骨面 吉祥街店; Chongqing Blanket Noodles / 重庆铺盖面 四道街店; Dan Dumplings / 但水饺; He Dumplings / 贺水饺; Zha Zha Noodles / 查渣面 宽窄巷子长顺店; Zhang Laowu Liangfen / 张老五凉粉店 槐树街店; Xiao Ming Tang Dandan Noodles / 小名堂担担甜水面 东城根上街店; He Ji Egg Cakes / 贺记蛋烘糕 文庙西街店; Nanchong Taste / 南充味道·正宗川北凉粉顺庆米粉; Mi Xun Teahouse / 谧寻茶室 成都居舍店

Already in the app — things to do: Chengdu Research Base of Giant Panda Breeding / 成都大熊猫繁育研究基地; Chengdu Zoo / 成都动物园; Chengdu Museum of Natural History / 成都自然博物馆; Sichuan Science and Technology Museum / 四川科技馆; Chengdu Museum / 成都博物馆; Haichang Polar Ocean Park / 成都海昌极地海洋公园; Chengdu Happy Valley / 成都欢乐谷; Du Fu Thatched Cottage / 杜甫草堂; Wide and Narrow Alleys / 宽窄巷子; Jinli Ancient Street / 锦里古街; Dujiangyan Irrigation System / 都江堰景区; Jiuzhaigou Valley / 九寨沟; Chengdu Teddy Bear Museum / 成都泰迪熊博物馆; Sanxingdui Museum / 三星堆博物馆; People's Park / 人民公园; Haihai Cube Aquarium / 浩海立方海洋馆; Shiye Natural History Museum / 拾野自然博物馆; Cloud Paradise Play Park / 云朵乐园; Lu Ke Island / 麓客岛; Lichao Aviation Museum / 立巢航空博物馆; Mount Qingcheng; Wuhou Shrine / 成都武侯祠博物馆; Jiaozi Park / 交子公园; Super Neobio / 超级奈尔宝·儿童乐园; Chengdu Science Fiction Museum / 成都科幻馆; Chengdu Xin Zhihui Music Museum / 成都芯智慧音乐博物馆

### jp-fukuoka — Fukuoka (Japan)
Area covered: Fukuoka (also known as / includes: fukuoka, hakata, tenjin, nakasu, dazaifu, momochi)

Already in the app — places to eat: Ichiran Honten / 一蘭 本社総本店; Ippudo Daimyo Honten / 一風堂 大名本店; Hakata Ramen Shin-Shin Tenjin Honten / 博多らーめん ShinShin 天神本店; Hakata Hanamidori Nakasu Honten / 博多華味鳥 中洲本店; Tempura Hirao Tenjin Acros / 天麩羅処ひらお 天神アクロス店; Ganso Hakata Mentaiju / 元祖博多めんたい重; Makino Udon Hakata Bus Terminal / 牧のうどん 博多バスターミナル店; Hyotan Sushi / ひょうたん寿司; Yoshizuka Unagiya / 博多名代 吉塚うなぎ屋; Canal City Ramen Stadium / ラーメンスタジアム; Hakata Men Kaido / 博多めん街道; Yanagibashi Rengo Market / 柳橋連合市場; Il Forno del Mignon / イル フォルノ デル ミニョン; Suzukake Honten / 鈴懸 本店; Kasanoya / かさの家; Hakata kuimonya Masumasa; comecome BURGER; Daimei Dandan Noodles; Nagahama No. 1; Yakisoba specialty restaurant Basokiya; Hakata Tempura and Fried Appetizers Ebizou; Manpuku Reimen (Manpuku Shokudo); Iwataya; Kirby Cafe Hakata; Royal Garden Cafe

Already in the app — things to do: Marine World Uminonakamichi / マリンワールド海の中道; Uminonakamichi Seaside Park / 海の中道海浜公園; Fukuoka City Zoo and Botanical Garden / 福岡市動植物園; Fukuoka City Science Museum / 福岡市科学館; Fukuoka Tower / 福岡タワー; Fukuoka Anpanman Children's Museum in Mall / 福岡アンパンマンこどもミュージアムinモール; Ohori Park / 大濠公園; Canal City Hakata fountain show / キャナルシティ博多 噴水ショー; Nokonoshima Island Park / のこのしまアイランドパーク; Nakasu yatai stalls / 中洲屋台; Hakata Machiya Folk Museum / 「博多町家」ふるさと館; Momochi Seaside Park / シーサイドももち海浜公園; Yanagibashi Rengo Market / 柳橋連合市場; Dazaifu Tenmangu / 太宰府天満宮; Fukuoka City Museum / 福岡市博物館; Fukuoka Toy Museum / 福岡おもちゃ美術館; KidZania Fukuoka / キッザニア福岡; teamLab Forest Fukuoka / チームラボフォレスト 福岡-SBI証券; NOBOLT / ノボルト（NOBOLT）; Kasuga Kodomo Land / かすがこどもランド; Acoopa Kurieito Munakata / アクーパくりえいと宗像店; Fukuoka City Central Children's Hall Aikuru / 福岡市立中央児童会館 あいくる; Chikyu no Niwa Fukuoka / ちきゅうのにわ 福岡店; Fantasy Kids Resort Fukuoka / ファンタジーキッズリゾート福岡; Kids Land US MAX Fukuoka Hisayama / キッズランドUS MAX 福岡久山店; Kushida Shrine; Sakurai Futamigaura; Nogita Beach; Keya Beach; Tenjin Central Park / 天神中央公園; Maizuru Park / 舞鶴公園; Higashi-Hirao Park (Otani Plaza) / 東平尾公園（大谷広場）

### jp-okinawa — Okinawa (Japan)
Area covered: Okinawa (also known as / includes: okinawa, naha, churaumi, kouri, motobu, chatan)

Already in the app — places to eat: Jack's Steak House / ジャッキーステーキハウス; Steak House 88 Tsuji Honten / ステーキハウス88 辻本店; Sam's Sailor Inn Kokusai-dori / サムズセーラーイン 国際通り店; Shuri Soba / 首里そば; Kishimoto Shokudo / きしもと食堂; Ufuya / 百年古家 大家; Pizza in the Sky Kajinho / ピザ喫茶 花人逢; Cafe Kurukuma / カフェくるくま; Makishi Public Market / 第一牧志公設市場; King Tacos Kin Honten / キングタコス 金武本店; A&W Makiminato / A&W 牧港店; Umikaji Terrace / 瀬長島ウミカジテラス; Blue Seal Makiminato Honten / ブルーシール 牧港本店; Hamabe no Chaya / 浜辺の茶屋; Okashigoten Onna / 御菓子御殿 恩納店; CAFE Soylabo; Ryukyo Ama Sans Souci; Hawaiian Pancake House Panilani; Taco Rice Cafe Kijimunaa; The Caliph Kitchen Okinawa; GOOD DAY COFFEE; Subtropical Tea House; Dohana Dohana; Two Dots Cafe; Café Kokuu; Banta Cafe; 2 Adan (Makishi Public Market); Okinawa Cuisine Manza Table; Uminchu Cuisine Kamenu-hama; Pork Tamago Onigiri Makishi Market Store; Ocean Blue; Inoh; SUGAR BROTHERS; Beachy Okinawa; EAS Okinawa Toyosaki Store

Already in the app — things to do: Okinawa Churaumi Aquarium / 沖縄美ら海水族館; Ocean Expo Park and Emerald Beach / 海洋博公園; DMM Kariyushi Aquarium / DMMかりゆし水族館; Okinawa Zoo and Museum / 沖縄こどもの国; Okinawa World and Gyokusendo Cave / おきなわワールド 玉泉洞; Shurijo Castle Park / 首里城公園; Busena Marine Park / ブセナ海中公園; Neo Park Okinawa / ネオパークオキナワ; Okinawa Fruits Land / OKINAWAフルーツらんど; Kouri Island and Kouri Beach / 古宇利島; Araha Beach / アラハビーチ; Mihama American Village / 美浜アメリカンビレッジ; Makishi Public Market / 第一牧志公設市場; Naminoue Beach / 波の上ビーチ; Okinawa Prefectural Museum / 沖縄県立博物館・美術館; Cape Manzamo / 万座毛; JUNGLIA Okinawa / ジャングリア沖縄; Bios no Oka / ビオスの丘; Nago Pineapple Park / ナゴパイナップルパーク; Ryukyu Mura / 琉球村; Unko Museum OKINAWA; Shuri Ryusen; Southeast Botanical Gardens; Sunset Beach; Onna no Eki Nakayukui Market

### id-bali — Bali (Indonesia)
Area covered: Bali (also known as / includes: bali, ubud, kuta, seminyak, uluwatu, nusa dua)

Already in the app — places to eat: Bebek Bengil; Warung Babi Guling Ibu Oka 3; Naughty Nuri's Warung Ubud; Bebek Tepi Sawah; Nasi Ayam Kedewatan Ibu Mangku; Made's Warung Seminyak; Menega Cafe; Warung Mak Beng; Massimo Italian Restaurant; Pasar Malam Sindhu; Gianyar Night Market; Eat & Eat Beachwalk; Gelato Secrets; Tukies Coconut Shop; Revolver Espresso; Bali Buda; Milk & Madu; Parklife; Lacalita; Roomah; TYGR Sushi; MILU by NOOK; Biku; Sea Circus; Mano Beach House; Clear Cafe; Taco Casa; Genius Cafe; Byrd House Bali; Naughty Nuri's Sanur; Prego; WAHAHA

Already in the app — things to do: Waterbom Bali; Bali Bird Park; Sacred Monkey Forest Sanctuary / Mandala Suci Wenara Wana; Tegallalang Rice Terraces; Tanah Lot / Pura Tanah Lot; Turtle Conservation and Education Center / TCEC Serangan; Uluwatu Temple and Kecak dance / Pura Luhur Uluwatu; Sindhu Night Market / Pasar Malam Sindhu; Campuhan Ridge Walk; Tegenungan Waterfall / Air Terjun Tegenungan; Ubud Art Market / Pasar Seni Ubud; Legong dance at Ubud Palace / Puri Saren Ubud; Sanur beach path; ICON Bali mall; Trans Studio Bali; Mai Main Playground Canggu; AeroXSpace Adventure; Clip 'n Climb Bali; KidzCafe Sanur; Kids SoHo Playground; Biosphere Playhouse; Nusa Dua Beach; Sanur Beach; The Blanco Renaissance Museum; Bali Ice Skating Arena; Kuta Market; Sukawati Art Market
