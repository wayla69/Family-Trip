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

### th-phuket — Phuket and Phang Nga Bay (Thailand)
Area covered: Phuket and Phang Nga Bay (also known as / includes: phuket, patong, kata, karon, phang nga, khao lak)

Now in the app: 40 places to eat, 33 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Raya Restaurant / ระย้า; One Chun Cafe & Restaurant / วันจันทร์; Tu Kab Khao / ตู้กับข้าว; Mor Mu Dong / หมอมูดง; Kan Eang@Pier / กันเอง แอท เพียร์; Laem Hin Seafood / แหลมหินซีฟู้ด; Mee Ton Poe / หมี่ต้นโพธิ์; Kopitiam by Wilai / โกปี้เตี่ยม บาย วิไล; Samchong Seafood / สามช่องซีฟู้ด; Banzaan Fresh Market / ตลาดบันซ้าน; Lard Yai Sunday Walking Street / หลาดใหญ่ ถนนคนเดินภูเก็ต; Torry's Ice Cream; Campus Coffee Roasters; A Pong Mae Sunee / อาโป๊งแม่สุณี; Lemonade Club Phuket; BIRDS Restaurant; Cookies Cafe; Coconut Garden; 333 At The Beach; Charoen Restaurant; Ohlala Restaurant; Casa Boho; Kamala Night Market; Lock Tien; Phuket Weekend Market (Naka Market); Flying Lizard Restaurant and Family Club; Gagarin Chaihana Restaurant; Butterfly Restaurant; Nikita's; Home Grain; Poached; View Cafe; Ah Hong Seafood; Soul; Kata Night Market; Millionaire Burgers (Surin); OOO Burger; PAN Burger; Treasure Burger; Rosmarino Rawai

Already in the app — things to do: Phuket Aquarium; Aquaria Phuket; Trickeye Museum Phuket; Andamanda Phuket; Phuket Elephant Sanctuary; Naka Weekend Market; Lard Yai Sunday Walking Street; Phuket Thai Hua Museum; Promthep Cape; Big Buddha; Khao Rang Viewpoint; Nai Harn Beach and Lake; Kata Beach; Gibbon Rehabilitation Project; Dino Park Mini Golf; Phang Nga Bay and James Bond Island / อุทยานแห่งชาติอ่าวพังงา; Rawai Seafood Market; Saphan Hin Park; Phuket Bird Park; Blue Tree Waterpark Phuket; Coral Island; Phuket Wake Park; Carnival Magic; Kamala Beach; Mai Khao Beach; Jungle Xtrem; Formula Fun Indoor Go-Karts; Rebel Rock Climbing; Oto Play Park; Rawai Park; Hanuman World; Battlefield Phuket Laser Tag; Adventure Village Chalong

### us-california — California (United States)
Area covered: California (also known as / includes: california, los angeles, san francisco, santa monica, san diego, yosemite)

Now in the app: 46 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Boudin Bakery Cafe; Tony's Pizza Napoletana; R&G Lounge; Philippe The Original; Canter's Deli; El Cholo; Bubba Gump Shrimp Co.; Hodad's; Old Town Mexican Cafe; Ferry Building Marketplace; Grand Central Market; The Original Farmers Market; Ghirardelli Chocolate Experience; Tartine Bakery; Randy's Donuts; Porto's Bakery & Cafe; Gott's Roadside; Lovely's; Pacific Catch; Mamahuhu; The Cove on Castro; Little Original Joe's; La Palma Mexicatessen; Devil's Teeth Baking Company; The Little Chihuahua; United Dumplings; On the Bridge; Fiorella; Original Joe's; The Crack Shack; Smokey & The Brisket; Refreshment Corner; Boardwalk Pizza and Pasta; Smorgasburg LA; Corporation Food Hall; Blossom Market; Alejo's Presto Trattoria; Brent's Deli (Northridge); Carousel (Hollywood); El Tepeyac Cafe; Golden Dragon (Chinatown); Kouraku; SPARK Social SF; Emmy's Spaghetti Shack; The Magic Flute; Bricks Family Restaurant

Already in the app — things to do: Disneyland Park; Disney California Adventure; Universal Studios Hollywood; San Diego Zoo; LEGOLAND California; SeaWorld San Diego; California Science Center; Natural History Museum of Los Angeles County; Griffith Observatory; Aquarium of the Pacific; Los Angeles Zoo; Santa Monica Pier; The Original Farmers Market; Balboa Park; USS Midway Museum; Knott's Berry Farm; California Academy of Sciences; Getty Center; Outpost Playground (Presidio Tunnel Tops); Cayton Children's Museum; Kidspace Children's Museum; Autry Museum of the American West; Mothers Beach (Marina del Rey); Descanso Gardens; Malibu Creek State Park; The Huntington; LACMA (Los Angeles County Museum of Art)

### th-bangkok — Bangkok (Thailand)
Area covered: Bangkok (also known as / includes: bangkok, suvarnabhumi, don mueang, damnoen saduak, amphawa)

Now in the app: 33 places to eat, 42 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Thipsamai Pad Thai (Pratu Phi) / ทิพย์สมัย ผัดไทยประตูผี; Krua Apsorn (Dinso Road) / ครัวอัปษร; Somboon Seafood (Surawong) / สมบูรณ์โภชนา สาขาสุรวงศ์; Go-Ang Kaomunkai Pratunam / โกอ่างข้าวมันไก่ประตูน้ำ; Polo Fried Chicken / ไก่ทอดเจ๊กี (โปโล); Wattana Panich / วัฒนาพานิช; Som Tam Nua (Siam Square) / ส้มตำนัว สยามสแควร์; Savoey Tha Maharaj / เสวย ท่ามหาราช; Baan Khanitha & Gallery (Sathorn) / บ้านขนิษฐา สาทร; Supanniga Eating Room Tha Tien / สุพรรณิการ์ อีทติ้ง รูม ท่าเตียน; Pier 21 Food Terminal / เพียร์ 21 เทอร์มินอล 21 อโศก; Or Tor Kor Market / ตลาด อ.ต.ก.; Eathai / อีทไทย เซ็นทรัล เอ็มบาสซี; After You Dessert Cafe (Siam Paragon) / อาฟเตอร์ ยู สยามพารากอน; Mont Nomsod (Dinso Road) / มนต์นมสด เสาชิงช้า; Kor Panich / ก.พานิช; The Deck Bangkok; Baan Ying Cafe and Meal / บ้านหญิง; Cabbages and Condoms; theCOMMONS Thonglor; Helix Dining at EmQuartier; Patom Organic Living / ปฐม ออร์แกนิก ลิฟวิ่ง; Genius Kids Cafe; BABYCCINO & Co.; Mozza by Cocotte; BHC Chicken; Underhound; Benihana; Krua Dok Mai Khao / ครัวดอกไม้ขาว; Kin Lom Chom Saphan / กินลมชมสะพาน; Krua Krung Thep / ครัวกรุงเทพ; Krua Nai Baan / ครัวในบ้าน; Rong Si Phochana (Lang Suan) / โรงสีโภชนา หลังสวน

Already in the app — things to do: SEA LIFE Bangkok Ocean World; Children's Discovery Museum; Lumphini Park; Benjakitti Forest Park; Museum Siam; Wat Pho; Grand Palace and Wat Phra Kaew; Chao Phraya Tourist Boat; Mahanakhon SkyWalk; Dream World; Siam Amazing Park; Chatuchak Weekend Market; ICONSIAM and SookSiam; Bangkok Art and Culture Centre; Yaowarat (Chinatown); Safari World; MEGA HarborLand, One Bangkok; MEGA HarborLand, ICONSIAM; HarborLand, Gateway Ekamai; Mega HarborLand, Seacon Bangkae; Funarium; BOUNCE, EmQuartier; MELAND, Siam Paragon; Kidzooona, Gateway Ekamai; Playville; Playmondo, CentralWorld; Playerbox, Siam Discovery; Yoyoland, Seacon Square; Mari Go Round Premium Kids Cafe; Kidzilla; WOW Park, Gateway Ekamai; Science Centre for Education; Siam Serpentarium; Wonder Woods Kids Cafe; Children's Discovery Museum II, Thung Khru; Bang Kachao; Bang Nam Phueng Floating Market; Ancient City; Bangkok Butterfly Garden and Insectarium; Tooney Museum; Madame Tussauds Bangkok; Fantasia Lagoon

### cn-shanghai — Shanghai (China)
Area covered: Shanghai (also known as / includes: shanghai, the bund, pudong, yu garden, zhujiajiao)

Now in the app: 34 places to eat, 42 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Nanxiang Steamed Bun Restaurant / 南翔馒头店; Lv Bo Lang / 绿波廊; Shanghai Lao Fandian / 上海老饭店; Lao Zheng Xing / 老正兴菜馆; Jia Jia Tang Bao / 佳家汤包; Lost Heaven on the Bund / 花马天堂 外滩店; Jianguo 328 / 建国328小馆; Guang Ming Cun / 光明邨大酒家; Yang's Fry-Dumpling / 小杨生煎; Da Hu Chun / 大壶春; Shanghai First Foodhall / 上海市第一食品商店; Lillian Bakery / 莉莲蛋挞; Shen Da Cheng / 沈大成; Harbin Food Factory / 哈尔滨食品厂; Lokal by Wagas (Hubindao) / Lokal by Wagas 湖滨道店; Mickey & Pals Market Café; Donald's Dine 'n Delights; Sunnyside Café; Tangled Tree Tavern; Lumière’s Kitchen; Fu 1039; Ren He Guan (Zhaojiabang Road); Shanghai Old Restaurant (Yuyuan Branch); Cheng Long Wang · Crab Mansion (Jiujiang Road Branch); Rui Fu Yuan (Maoming South Road); Auntie Maodou Restaurant; Shun Ji Restaurant (Shaanxi South Road Branch); Longfeng Restaurant · Peace Hotel Shanghai; The Press (Hankou Lu); Dong Tai Xiang (Changning Lu); Wang Jia Sha (Changning Lu); Fahua Tangbao; Lai Lai Xiao Long / 莱莱小笼; Fuchun Xiao Long Guan / 富春小笼馆

Already in the app — things to do: Shanghai Disneyland / 上海迪士尼乐园; LEGOLAND Shanghai / 上海乐高乐园; Shanghai Ocean Aquarium / 上海海洋水族馆; Shanghai Zoo / 上海动物园; Shanghai Wild Animal Park / 上海野生动物园; Shanghai Science and Technology Museum / 上海科技馆; Shanghai Natural History Museum / 上海自然博物馆; Shanghai Astronomy Museum / 上海天文馆; Shanghai Children's Museum / 上海儿童博物馆; Oriental Pearl Tower / 东方明珠广播电视塔; The Bund / 外滩; Huangpu River cruise / 黄浦江游览; Yu Garden / 豫园; Century Park / 世纪公园; Shanghai Chenshan Botanical Garden / 上海辰山植物园; Zhujiajiao Water Town / 朱家角; Shanghai Haichang Ocean Park / 上海海昌海洋公园; Shanghai Tower; Qibao Old Town; Temple of the Seven Treasures; Shanghai Changfeng Aquarium & Stingray Bay; LEGOLAND Discovery Centre, Changfeng; Gongqing Forest Park; Fuxing Park; Expo Culture Park Greenhouse; Shanghai Natural Wildlife Insect Kingdom; Bund Sightseeing Tunnel; Shanghai World Financial Center; Shanghai Circus World; People's Park; Zhongshan Park; Lujiazui Central Green; Shanghai Urban Planning Center; Pottery People; Peppa Pig World of Play; Jump 360 (Xingyi Lu); Adventure Zone; Nanyuan Riverside Green Belt Children's Sports Park; Shanghai Submarine Exhibition Hall; Shanghai Tunnel Science and Technology Museum; One East; Shanghai Children's Art Theatre
