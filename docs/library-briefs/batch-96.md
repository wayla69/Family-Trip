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

### cn-beijing — Beijing (China)
Area covered: Beijing (also known as / includes: beijing, peking, great wall, forbidden city, mutianyu, badaling)

Now in the app: 37 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Siji Minfu Roast Duck (Dengshikou) / 四季民福烤鸭店 灯市口店; Quanjude (Qianmen) / 全聚德 前门店; Bianyifang (Xianyukou) / 便宜坊烤鸭店 鲜鱼口店; Donglaishun (Wangfujing) / 东来顺饭庄 王府井店; Jubaoyuan (Niujie) / 聚宝源 牛街总店; Nanmen Hot Pot (Temple of Heaven) / 南门涮肉 天坛店; Xian Lao Man (Andingmen) / 馅老满 安定门店; Fangzhuanchang No. 69 Zhajiang Noodles / 方砖厂69号炸酱面; Haidilao Hot Pot (Wangfujing) / 海底捞火锅 王府井店; Huguosi Snacks / 护国寺小吃 护国寺总店; Qingfeng Steamed Buns / 庆丰包子铺; Yaoji Chaogan / 姚记炒肝店; Wu Yutai Tea Shop (Wangfujing) / 吴裕泰 王府井店; Beijing Daoxiangcun (No. 0 Store) / 北京稻香村零号店; Drifter's Cantina; Bai Kui Lao Hao / 白魁老号; Xiaochang Chen Restaurant / 小肠陈饭庄; Tianxingju / 天兴居; Lao Ciqikou Douzhi Shop / 老磁器口豆汁店; Baorui Mending Meat Pie Shop / 宝瑞门钉肉饼店; Hongbinlou / 鸿宾楼; Cui Hua Lou / 萃华楼; Kao Rou Wan / 烤肉宛; Shaguoju / 砂锅居; Tongheju / 同和居; Tianfuhao / 天福号; Liu Quan Ju / 柳泉居; Dongxing Lou / 东兴楼; Emei Restaurant / 峨眉酒家; Haiwanju / 海碗居; Yufei Beef Noodles Restaurant / 宇飞牛肉面; Xiaoluohao / 小螺号; Guishunzhai / 桂顺斋; Dashunzhai / 大顺斋; Houweiju / 厚味居; Mental Hands / 北京铁手咖啡制造总局; Voyage Cafe

Already in the app — things to do: The Forbidden City (Palace Museum) / 故宫博物院; Temple of Heaven Park / 天坛公园; Summer Palace / 颐和园; Beihai Park / 北海公园; Old Summer Palace (Yuanmingyuan) / 圆明园; Mutianyu Great Wall / 慕田峪长城; Beijing Zoo and the new Panda House / 北京动物园; National Museum of Natural History / 国家自然博物馆; China Science and Technology Museum / 中国科学技术馆; National Museum of China / 中国国家博物馆; Olympic Forest Park / 奥林匹克森林公园; Beijing Planetarium / 北京天文馆; Beijing Aquarium / 北京海洋馆; Jingshan Park / 景山公园; Capital Museum / 首都博物馆; POP LAND; Rayen Town; PartyMars; Jinghua Fuman Park; Beijing Wildlife Park / 北京野生动物园; Beijing Badaling Wildlife World / 北京八达岭野生动物世界; Badaling Great Wall / 八达岭长城; Jingxi Intangible Heritage Park; Children's Palace; Nanluoguxiang; Water Cube

### tw-taipei — Taipei (Taiwan)
Area covered: Taipei (also known as / includes: taipei, ximending, shilin, jiufen, shifen, tamsui)

Now in the app: 27 places to eat, 36 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Din Tai Fung Taipei 101 / 鼎泰豐 101店; Yong Kang Beef Noodle / 永康牛肉麵; Lin Dong Fang Beef Noodles / 林東芳牛肉麵; Jin Feng Braised Pork Rice / 金峰魯肉飯; Hangzhou Xiaolongbao / 杭州小籠湯包; Shin Yeh / 欣葉台菜 創始店; Formosa Chang / 鬍鬚張魯肉飯 寧夏總店; Fu Hang Soy Milk / 阜杭豆漿; Raohe Street Night Market / 饒河街觀光夜市; Ningxia Night Market / 寧夏夜市; Ay-Chung Flour-Rice Noodle / 阿宗麵線; Taipei 101 Food Court / 台北101 美食街; Smoothie House / 思慕昔 本館; Chun Shui Tang / 春水堂 中正紀念堂; Chia Te Bakery / 佳德糕餅; SunnyHills / 微熱山丘 台北民生公園門市; Farmer's Table / 農人餐桌; Mr.Tree / 大樹先生的家; Beetles Café / 甲蟲秘境; Taoqi Time Parent-Child Restaurant / 淘憩時光親子餐廳; Snow King Ice Cream; Lane 50 Food Market; Shilin Night Market Underground Food Court; Tamsui Wenhua A-gei / 淡水文化阿給; Mountain and Sea House / 山海樓; Orange Shabu Shabu (Da-an) / 橘色涮涮屋; MoneyJump / 媽妳講親子餐廳

Already in the app — things to do: Taipei Zoo / 臺北市立動物園; Maokong Gondola / 貓空纜車; Taipei 101 Observatory / 台北101觀景台; Taipei Children's Amusement Park / 臺北市立兒童新樂園; Taipei Astronomical Museum / 臺北市立天文科學教育館; National Taiwan Science Education Center / 國立臺灣科學教育館; National Palace Museum / 國立故宮博物院; Miniatures Museum of Taiwan / 袖珍博物館; Shilin Night Market / 士林夜市; Raohe Night Market / 饒河街觀光夜市; Daan Forest Park / 大安森林公園; Beitou Hot Spring Museum / 北投溫泉博物館; Huashan 1914 Creative Park / 華山1914文化創意產業園區; Airplane Alley / 飛機巷; Yangmingshan: Xiaoyoukeng and Qingtiangang / 陽明山 小油坑・擎天崗; Expo Hall Playground; Xinsheng Park Playground; Land Bank Exhibition Hall; Taipei City Hakka Cultural Park; National Railway Museum / 國家鐵道博物館; Beitou Thermal Valley; Jimmy’s Moon Bus; Kuo Yuan Ye Museum of Cake and Pastry; Beimen Post Office; Ningxia Night Market; Taipei Fine Arts Museum; PaPark Nangang / 爬爬客親子樂園-南港中信店; Youxi Ai Leyuan, A8 Xinyi / 遊戲愛樂園; SNOOPY Play Center Taipei / SNOOPY Play Center台北兒童新樂園館; Taipei Dianzang Botanical Garden / 台北典藏植物園; Miramar Ferris Wheel / 美麗華摩天輪; Taipei Water Park / 自來水園區; Bitan / 碧潭; Guandu Temple / 關渡宮; Longshan Temple / 艋舺龍山寺; Chiang Kai-shek Memorial Hall / 中正紀念堂

### vn-hanoi — Hanoi and Halong Bay (Vietnam)
Area covered: Hanoi and Halong Bay (also known as / includes: hanoi, ha noi, halong, ha long, old quarter, hoan kiem)

Now in the app: 44 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Phở 10 Lý Quốc Sư; Bún Chả Hương Liên; Bún Chả Đắc Kim; Chả Cá Thăng Long; Quán Ăn Ngon; Cau Go Vietnamese Cuisine; Sen Tây Hồ; Pizza 4P's Tràng Tiền; Hồng Hạnh 3; Cua Vàng; Xôi Yến; Bánh Mì 25; Giảng Café; Cộng Cà Phê Nhà Thờ; Maison Marou Hanoi; Phở Gia Truyền; Phở Khôi Hói; Phở Gà Nguyệt; Bun Cha Ta; Tuyết Bún Chả 34; Bún Chả Chan; Bánh Cuốn Gia Truyền Thanh Vân; Xới Cơm; Luk Lak; Hà Thành Mansion; Mammom; The East; 1946 Cua Bac; Chào Bạn; Tầm Vị; Ưu Đàm; Phở Bò Thanh Béo; Hidden Gem Coffee; Always Café; Blackbird Coffee; Sociō Coffee; Hanoi Shouten; Cà Phê Duy Trí; Loading T; Café Đinh; Tranquil Books & Coffee; The Note Coffee; Cafe Pho Co; Hanoi House

Already in the app — things to do: Thang Long Water Puppet Theatre / Nhà hát Múa rối Thăng Long; Vietnam Museum of Ethnology / Bảo tàng Dân tộc học Việt Nam; Temple of Literature / Văn Miếu – Quốc Tử Giám; Thu Le Zoo and Park / Công viên Thủ Lệ; VinKE and Vinpearl Aquarium Times City / VinKE & Vinpearl Aquarium Times City; Imperial Citadel of Thang Long / Hoàng thành Thăng Long; Lotte World Aquarium Hanoi / Lotte World Aquarium Hà Nội; Hoan Kiem Lake and the weekend walking street / Hồ Hoàn Kiếm · Phố đi bộ; Ngoc Son Temple / Đền Ngọc Sơn; Old Quarter weekend night market / Chợ đêm Hàng Đào; Bat Trang pottery village / Làng gốm Bát Tràng; Thong Nhat Park / Công viên Thống Nhất; Vietnamese Women's Museum / Bảo tàng Phụ nữ Việt Nam; Ba Dinh Square and One Pillar Pagoda / Quảng trường Ba Đình · Chùa Một Cột; Tran Quoc Pagoda on West Lake / Chùa Trấn Quốc; Vietnam National Museum of History / Bảo tàng Lịch sử Quốc gia; Vietnam Military History Museum / Bảo tàng Lịch sử Quân sự Việt Nam; Vietnam National Museum of Nature / Bảo tàng Thiên nhiên Việt Nam; Hanoi Children's Palace / Cung Thiếu nhi Hà Nội
