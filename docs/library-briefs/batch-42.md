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

### vn-saigon — Ho Chi Minh City and the Mekong Delta (Vietnam)
Area covered: Ho Chi Minh City and the Mekong Delta (also known as / includes: ho chi minh city, saigon, mekong delta, can tho, cu chi, ben thanh)

Already in the app — places to eat: Phở Hòa Pasteur; Cục Gạch Quán; Quán Ăn Ngon 138; Secret Garden; Hoa Túc; Pizza 4P's Bến Thành; Cơm Tấm Ba Ghiền; Bánh Xèo 46A; Mekong Rest Stop; Sao Hôm; Chợ Bến Thành; Bánh Mì Huỳnh Hoa; Saigon Centre Takashimaya food hall; Maison Marou Saigon; The Workshop Coffee; Au Parc

Already in the app — things to do: Saigon Zoo and Botanical Gardens / Thảo Cầm Viên Sài Gòn; Dam Sen Cultural Park / Công viên Văn hóa Đầm Sen; Dam Sen Water Park / Công viên nước Đầm Sen; Suoi Tien Theme Park / Khu du lịch Văn hóa Suối Tiên; Saigon Waterbus / Buýt sông Sài Gòn; Independence Palace / Dinh Độc Lập; Ben Thanh Market / Chợ Bến Thành; Saigon Central Post Office / Bưu điện Trung tâm Sài Gòn; Tao Dan Park / Công viên Tao Đàn; Nguyen Hue Walking Street / Phố đi bộ Nguyễn Huệ; Binh Tay Market / Chợ Bình Tây; Thien Hau Temple / Chùa Bà Thiên Hậu; Landmark 81 SkyView; A O Show at the Saigon Opera House / Nhà hát Thành phố; Gia Dinh Park / Công viên Gia Định; VinWonders Grand Park; tiNiWorld, AEON Tan Phu; War Remnants Museum / Bảo tàng Chứng tích Chiến tranh; Ho Chi Minh City Museum of History / Bảo tàng Lịch sử Thành phố Hồ Chí Minh; Tien Dong Ngoc Nu Beach; Cu Chi Water Park; Fanpekka; Dream Kids; Vietopia

### vn-danang — Da Nang & Hoi An (Vietnam)
Area covered: Da Nang & Hoi An (also known as / includes: da nang, danang, hoi an, ba na, bana hills, my khe)

Already in the app — places to eat: Mì Quảng Bà Mua; Bánh Xèo Bà Dưỡng; Madame Lân; Bé Mặn; Thìa Gỗ; Quán Trần; Morning Glory Original; Miss Ly Cafe; Bale Well; Bánh Mì Phượng; Madam Khanh The Banh Mi Queen; Chợ Cồn; Cộng Cà Phê Bạch Đằng; Hoi An Roastery; The Cargo Club; Epice Restaurant; The Temptation French Restaurant; Chops Da Nang; Osteria al Mare; Rang Restaurant; Bistecca Italian Restaurant; Han Market; Bac My An Market; Mango Mango; Soul Kitchen; La Plage; Good Morning Vietnam Pizza

Already in the app — things to do: Sun World Ba Na Hills / Sun World Bà Nà Hills; Asia Park (Sun World Danang Wonders); Marble Mountains / Ngũ Hành Sơn; VinWonders Nam Hoi An; Hoi An Ancient Town / Phố cổ Hội An; Bay Mau Coconut Forest basket boats / Rừng dừa Bảy Mẫu; Museum of Cham Sculpture / Bảo tàng Điêu khắc Chăm; Dragon Bridge fire show / Cầu Rồng; Than Tai Hot Spring Park / Công viên Suối khoáng nóng Núi Thần Tài; Art in Paradise 3D Museum; Han Market / Chợ Hàn; Linh Ung Pagoda, Son Tra / Chùa Linh Ứng Bãi Bụt; Tra Que Vegetable Village / Làng rau Trà Quế; My Khe Beach / Bãi biển Mỹ Khê; Hoi An Memories Land and show / Ký Ức Hội An; Hoi An Night Market and lantern boats / Chợ đêm Hội An; An Bang Beach / Bãi biển An Bàng; APEC Park / Công viên APEC; Mikazuki Water Park 365; Hoa Phu Thanh; Son Tra Peninsula; Cham Islands / Cù Lao Chàm

### cn-shanghai — Shanghai (China)
Area covered: Shanghai (also known as / includes: shanghai, the bund, pudong, yu garden, zhujiajiao)

Already in the app — places to eat: Nanxiang Steamed Bun Restaurant / 南翔馒头店; Lv Bo Lang / 绿波廊; Shanghai Lao Fandian / 上海老饭店; Lao Zheng Xing / 老正兴菜馆; Jia Jia Tang Bao / 佳家汤包; Lost Heaven on the Bund / 花马天堂 外滩店; Jianguo 328 / 建国328小馆; Guang Ming Cun / 光明邨大酒家; Yang's Fry-Dumpling / 小杨生煎; Da Hu Chun / 大壶春; Shanghai First Foodhall / 上海市第一食品商店; Lillian Bakery / 莉莲蛋挞; Shen Da Cheng / 沈大成; Harbin Food Factory / 哈尔滨食品厂; Lokal by Wagas (Hubindao) / Lokal by Wagas 湖滨道店; Mickey & Pals Market Café; Donald's Dine 'n Delights; Sunnyside Café; Tangled Tree Tavern; Lumière’s Kitchen; Fu 1039; Ren He Guan (Zhaojiabang Road); Shanghai Old Restaurant (Yuyuan Branch); Cheng Long Wang · Crab Mansion (Jiujiang Road Branch); Rui Fu Yuan (Maoming South Road); Auntie Maodou Restaurant; Shun Ji Restaurant (Shaanxi South Road Branch); Longfeng Restaurant · Peace Hotel Shanghai; The Press (Hankou Lu); Dong Tai Xiang (Changning Lu); Wang Jia Sha (Changning Lu); Fahua Tangbao; Lai Lai Xiao Long / 莱莱小笼; Fuchun Xiao Long Guan / 富春小笼馆

Already in the app — things to do: Shanghai Disneyland / 上海迪士尼乐园; LEGOLAND Shanghai / 上海乐高乐园; Shanghai Ocean Aquarium / 上海海洋水族馆; Shanghai Zoo / 上海动物园; Shanghai Wild Animal Park / 上海野生动物园; Shanghai Science and Technology Museum / 上海科技馆; Shanghai Natural History Museum / 上海自然博物馆; Shanghai Astronomy Museum / 上海天文馆; Shanghai Children's Museum / 上海儿童博物馆; Oriental Pearl Tower / 东方明珠广播电视塔; The Bund / 外滩; Huangpu River cruise / 黄浦江游览; Yu Garden / 豫园; Century Park / 世纪公园; Shanghai Chenshan Botanical Garden / 上海辰山植物园; Zhujiajiao Water Town / 朱家角; Shanghai Haichang Ocean Park / 上海海昌海洋公园; Shanghai Tower; Qibao Old Town; Temple of the Seven Treasures; Shanghai Changfeng Aquarium & Stingray Bay; LEGOLAND Discovery Centre, Changfeng; Gongqing Forest Park; Fuxing Park; Expo Culture Park Greenhouse; Shanghai Natural Wildlife Insect Kingdom; Bund Sightseeing Tunnel; Shanghai World Financial Center; Shanghai Circus World; People's Park; Zhongshan Park; Lujiazui Central Green; Shanghai Urban Planning Center; Pottery People; Peppa Pig World of Play; Jump 360 (Xingyi Lu); Adventure Zone; Nanyuan Riverside Green Belt Children's Sports Park; Shanghai Submarine Exhibition Hall; Shanghai Tunnel Science and Technology Museum; One East; Shanghai Children's Art Theatre

### cn-beijing — Beijing (China)
Area covered: Beijing (also known as / includes: beijing, peking, great wall, forbidden city, mutianyu, badaling)

Already in the app — places to eat: Siji Minfu Roast Duck (Dengshikou) / 四季民福烤鸭店 灯市口店; Quanjude (Qianmen) / 全聚德 前门店; Bianyifang (Xianyukou) / 便宜坊烤鸭店 鲜鱼口店; Donglaishun (Wangfujing) / 东来顺饭庄 王府井店; Jubaoyuan (Niujie) / 聚宝源 牛街总店; Nanmen Hot Pot (Temple of Heaven) / 南门涮肉 天坛店; Xian Lao Man (Andingmen) / 馅老满 安定门店; Fangzhuanchang No. 69 Zhajiang Noodles / 方砖厂69号炸酱面; Haidilao Hot Pot (Wangfujing) / 海底捞火锅 王府井店; Huguosi Snacks / 护国寺小吃 护国寺总店; Qingfeng Steamed Buns / 庆丰包子铺; Yaoji Chaogan / 姚记炒肝店; Wu Yutai Tea Shop (Wangfujing) / 吴裕泰 王府井店; Beijing Daoxiangcun (No. 0 Store) / 北京稻香村零号店; Drifter's Cantina; Bai Kui Lao Hao / 白魁老号; Xiaochang Chen Restaurant / 小肠陈饭庄; Tianxingju / 天兴居; Lao Ciqikou Douzhi Shop / 老磁器口豆汁店; Baorui Mending Meat Pie Shop / 宝瑞门钉肉饼店; Hongbinlou / 鸿宾楼; Cui Hua Lou / 萃华楼; Kao Rou Wan / 烤肉宛; Shaguoju / 砂锅居; Tongheju / 同和居; Tianfuhao / 天福号; Liu Quan Ju / 柳泉居; Dongxing Lou / 东兴楼; Emei Restaurant / 峨眉酒家; Haiwanju / 海碗居; Yufei Beef Noodles Restaurant / 宇飞牛肉面; Xiaoluohao / 小螺号; Guishunzhai / 桂顺斋; Dashunzhai / 大顺斋; Houweiju / 厚味居; Mental Hands / 北京铁手咖啡制造总局; Voyage Cafe

Already in the app — things to do: The Forbidden City (Palace Museum) / 故宫博物院; Temple of Heaven Park / 天坛公园; Summer Palace / 颐和园; Beihai Park / 北海公园; Old Summer Palace (Yuanmingyuan) / 圆明园; Mutianyu Great Wall / 慕田峪长城; Beijing Zoo and the new Panda House / 北京动物园; National Museum of Natural History / 国家自然博物馆; China Science and Technology Museum / 中国科学技术馆; National Museum of China / 中国国家博物馆; Olympic Forest Park / 奥林匹克森林公园; Beijing Planetarium / 北京天文馆; Beijing Aquarium / 北京海洋馆; Jingshan Park / 景山公园; Capital Museum / 首都博物馆; POP LAND; Rayen Town; PartyMars; Jinghua Fuman Park; Beijing Wildlife Park / 北京野生动物园; Beijing Badaling Wildlife World / 北京八达岭野生动物世界; Badaling Great Wall / 八达岭长城; Jingxi Intangible Heritage Park; Children's Palace; Nanluoguxiang; Water Cube
