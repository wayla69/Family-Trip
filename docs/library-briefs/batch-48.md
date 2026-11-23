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

### jp-okinawa — Okinawa (Japan)
Area covered: Okinawa (also known as / includes: okinawa, naha, churaumi, kouri, motobu, chatan)

Already in the app — places to eat: Jack's Steak House / ジャッキーステーキハウス; Steak House 88 Tsuji Honten / ステーキハウス88 辻本店; Sam's Sailor Inn Kokusai-dori / サムズセーラーイン 国際通り店; Shuri Soba / 首里そば; Kishimoto Shokudo / きしもと食堂; Ufuya / 百年古家 大家; Pizza in the Sky Kajinho / ピザ喫茶 花人逢; Cafe Kurukuma / カフェくるくま; Makishi Public Market / 第一牧志公設市場; King Tacos Kin Honten / キングタコス 金武本店; A&W Makiminato / A&W 牧港店; Umikaji Terrace / 瀬長島ウミカジテラス; Blue Seal Makiminato Honten / ブルーシール 牧港本店; Hamabe no Chaya / 浜辺の茶屋; Okashigoten Onna / 御菓子御殿 恩納店; CAFE Soylabo; Ryukyo Ama Sans Souci; Hawaiian Pancake House Panilani; Taco Rice Cafe Kijimunaa; The Caliph Kitchen Okinawa; GOOD DAY COFFEE; Subtropical Tea House; Dohana Dohana; Two Dots Cafe; Café Kokuu; Banta Cafe; 2 Adan (Makishi Public Market); Okinawa Cuisine Manza Table; Uminchu Cuisine Kamenu-hama; Pork Tamago Onigiri Makishi Market Store; Ocean Blue; Inoh; SUGAR BROTHERS; Beachy Okinawa; EAS Okinawa Toyosaki Store

Already in the app — things to do: Okinawa Churaumi Aquarium / 沖縄美ら海水族館; Ocean Expo Park and Emerald Beach / 海洋博公園; DMM Kariyushi Aquarium / DMMかりゆし水族館; Okinawa Zoo and Museum / 沖縄こどもの国; Okinawa World and Gyokusendo Cave / おきなわワールド 玉泉洞; Shurijo Castle Park / 首里城公園; Busena Marine Park / ブセナ海中公園; Neo Park Okinawa / ネオパークオキナワ; Okinawa Fruits Land / OKINAWAフルーツらんど; Kouri Island and Kouri Beach / 古宇利島; Araha Beach / アラハビーチ; Mihama American Village / 美浜アメリカンビレッジ; Makishi Public Market / 第一牧志公設市場; Naminoue Beach / 波の上ビーチ; Okinawa Prefectural Museum / 沖縄県立博物館・美術館; Cape Manzamo / 万座毛; JUNGLIA Okinawa / ジャングリア沖縄; Bios no Oka / ビオスの丘; Nago Pineapple Park / ナゴパイナップルパーク; Ryukyu Mura / 琉球村; Unko Museum OKINAWA; Shuri Ryusen; Southeast Botanical Gardens; Sunset Beach; Onna no Eki Nakayukui Market

### vn-hanoi — Hanoi and Halong Bay (Vietnam)
Area covered: Hanoi and Halong Bay (also known as / includes: hanoi, ha noi, halong, ha long, old quarter, hoan kiem)

Already in the app — places to eat: Phở 10 Lý Quốc Sư; Bún Chả Hương Liên; Bún Chả Đắc Kim; Chả Cá Thăng Long; Quán Ăn Ngon; Cau Go Vietnamese Cuisine; Sen Tây Hồ; Pizza 4P's Tràng Tiền; Hồng Hạnh 3; Cua Vàng; Xôi Yến; Bánh Mì 25; Giảng Café; Cộng Cà Phê Nhà Thờ; Maison Marou Hanoi; Phở Gia Truyền; Phở Khôi Hói; Phở Gà Nguyệt; Bun Cha Ta; Tuyết Bún Chả 34; Bún Chả Chan; Bánh Cuốn Gia Truyền Thanh Vân; Xới Cơm; Luk Lak; Hà Thành Mansion; Mammom; The East; 1946 Cua Bac; Chào Bạn; Tầm Vị; Ưu Đàm; Phở Bò Thanh Béo; Hidden Gem Coffee; Always Café; Blackbird Coffee; Sociō Coffee; Hanoi Shouten; Cà Phê Duy Trí; Loading T; Café Đinh; Tranquil Books & Coffee; The Note Coffee; Cafe Pho Co; Hanoi House

Already in the app — things to do: Thang Long Water Puppet Theatre / Nhà hát Múa rối Thăng Long; Vietnam Museum of Ethnology / Bảo tàng Dân tộc học Việt Nam; Temple of Literature / Văn Miếu – Quốc Tử Giám; Thu Le Zoo and Park / Công viên Thủ Lệ; VinKE and Vinpearl Aquarium Times City / VinKE & Vinpearl Aquarium Times City; Imperial Citadel of Thang Long / Hoàng thành Thăng Long; Lotte World Aquarium Hanoi / Lotte World Aquarium Hà Nội; Hoan Kiem Lake and the weekend walking street / Hồ Hoàn Kiếm · Phố đi bộ; Ngoc Son Temple / Đền Ngọc Sơn; Old Quarter weekend night market / Chợ đêm Hàng Đào; Bat Trang pottery village / Làng gốm Bát Tràng; Thong Nhat Park / Công viên Thống Nhất; Vietnamese Women's Museum / Bảo tàng Phụ nữ Việt Nam; Ba Dinh Square and One Pillar Pagoda / Quảng trường Ba Đình · Chùa Một Cột; Tran Quoc Pagoda on West Lake / Chùa Trấn Quốc; Vietnam National Museum of History / Bảo tàng Lịch sử Quốc gia; Vietnam Military History Museum / Bảo tàng Lịch sử Quân sự Việt Nam; Vietnam National Museum of Nature / Bảo tàng Thiên nhiên Việt Nam

### cn-beijing — Beijing (China)
Area covered: Beijing (also known as / includes: beijing, peking, great wall, forbidden city, mutianyu, badaling)

Already in the app — places to eat: Siji Minfu Roast Duck (Dengshikou) / 四季民福烤鸭店 灯市口店; Quanjude (Qianmen) / 全聚德 前门店; Bianyifang (Xianyukou) / 便宜坊烤鸭店 鲜鱼口店; Donglaishun (Wangfujing) / 东来顺饭庄 王府井店; Jubaoyuan (Niujie) / 聚宝源 牛街总店; Nanmen Hot Pot (Temple of Heaven) / 南门涮肉 天坛店; Xian Lao Man (Andingmen) / 馅老满 安定门店; Fangzhuanchang No. 69 Zhajiang Noodles / 方砖厂69号炸酱面; Haidilao Hot Pot (Wangfujing) / 海底捞火锅 王府井店; Huguosi Snacks / 护国寺小吃 护国寺总店; Qingfeng Steamed Buns / 庆丰包子铺; Yaoji Chaogan / 姚记炒肝店; Wu Yutai Tea Shop (Wangfujing) / 吴裕泰 王府井店; Beijing Daoxiangcun (No. 0 Store) / 北京稻香村零号店; Drifter's Cantina; Bai Kui Lao Hao / 白魁老号; Xiaochang Chen Restaurant / 小肠陈饭庄; Tianxingju / 天兴居; Lao Ciqikou Douzhi Shop / 老磁器口豆汁店; Baorui Mending Meat Pie Shop / 宝瑞门钉肉饼店; Hongbinlou / 鸿宾楼; Cui Hua Lou / 萃华楼; Kao Rou Wan / 烤肉宛; Shaguoju / 砂锅居; Tongheju / 同和居; Tianfuhao / 天福号; Liu Quan Ju / 柳泉居; Dongxing Lou / 东兴楼; Emei Restaurant / 峨眉酒家; Haiwanju / 海碗居; Yufei Beef Noodles Restaurant / 宇飞牛肉面; Xiaoluohao / 小螺号; Guishunzhai / 桂顺斋; Dashunzhai / 大顺斋; Houweiju / 厚味居; Mental Hands / 北京铁手咖啡制造总局; Voyage Cafe

Already in the app — things to do: The Forbidden City (Palace Museum) / 故宫博物院; Temple of Heaven Park / 天坛公园; Summer Palace / 颐和园; Beihai Park / 北海公园; Old Summer Palace (Yuanmingyuan) / 圆明园; Mutianyu Great Wall / 慕田峪长城; Beijing Zoo and the new Panda House / 北京动物园; National Museum of Natural History / 国家自然博物馆; China Science and Technology Museum / 中国科学技术馆; National Museum of China / 中国国家博物馆; Olympic Forest Park / 奥林匹克森林公园; Beijing Planetarium / 北京天文馆; Beijing Aquarium / 北京海洋馆; Jingshan Park / 景山公园; Capital Museum / 首都博物馆; POP LAND; Rayen Town; PartyMars; Jinghua Fuman Park; Beijing Wildlife Park / 北京野生动物园; Beijing Badaling Wildlife World / 北京八达岭野生动物世界; Badaling Great Wall / 八达岭长城; Jingxi Intangible Heritage Park; Children's Palace; Nanluoguxiang; Water Cube

### th-phuket — Phuket and Phang Nga Bay (Thailand)
Area covered: Phuket and Phang Nga Bay (also known as / includes: phuket, patong, kata, karon, phang nga, khao lak)

Already in the app — places to eat: Raya Restaurant / ระย้า; One Chun Cafe & Restaurant / วันจันทร์; Tu Kab Khao / ตู้กับข้าว; Mor Mu Dong / หมอมูดง; Kan Eang@Pier / กันเอง แอท เพียร์; Laem Hin Seafood / แหลมหินซีฟู้ด; Mee Ton Poe / หมี่ต้นโพธิ์; Kopitiam by Wilai / โกปี้เตี่ยม บาย วิไล; Samchong Seafood / สามช่องซีฟู้ด; Banzaan Fresh Market / ตลาดบันซ้าน; Lard Yai Sunday Walking Street / หลาดใหญ่ ถนนคนเดินภูเก็ต; Torry's Ice Cream; Campus Coffee Roasters; A Pong Mae Sunee / อาโป๊งแม่สุณี; Lemonade Club Phuket; BIRDS Restaurant; Cookies Cafe; Coconut Garden; 333 At The Beach; Charoen Restaurant; Ohlala Restaurant; Casa Boho; Kamala Night Market; Lock Tien; Phuket Weekend Market (Naka Market); Flying Lizard Restaurant and Family Club; Gagarin Chaihana Restaurant; Butterfly Restaurant; Nikita's; Home Grain; Poached; View Cafe; Ah Hong Seafood; Soul; Kata Night Market

Already in the app — things to do: Phuket Aquarium; Aquaria Phuket; Trickeye Museum Phuket; Andamanda Phuket; Phuket Elephant Sanctuary; Naka Weekend Market; Lard Yai Sunday Walking Street; Phuket Thai Hua Museum; Promthep Cape; Big Buddha; Khao Rang Viewpoint; Nai Harn Beach and Lake; Kata Beach; Gibbon Rehabilitation Project; Dino Park Mini Golf; Phang Nga Bay and James Bond Island / อุทยานแห่งชาติอ่าวพังงา; Rawai Seafood Market; Saphan Hin Park; Phuket Bird Park; Blue Tree Waterpark Phuket; Coral Island; Phuket Wake Park; Carnival Magic; Kamala Beach; Mai Khao Beach; Jungle Xtrem; Formula Fun Indoor Go-Karts; Rebel Rock Climbing; Oto Play Park; Rawai Park
