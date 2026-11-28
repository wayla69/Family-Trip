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

Already in the app — places to eat: Du Hsiao Yueh / 度小月擔仔麵 原始店; A-Xia Restaurant / 阿霞飯店; Chou's Shrimp Rolls / 周氏蝦捲 安平總店; Wen Chang Beef Soup / 文章牛肉湯; A-Tang Salty Congee / 阿堂鹹粥 (無名鹹粥); Fu Sheng Hao Rice Cake / 富盛號碗粿; Gang Yuan Beef Noodles / 港園牛肉麵; Ya Rou Zhen / 鴨肉珍; Smokey Joe's / 冒煙的喬 高雄自由店; Tainan Garden Night Market / 花園夜市; Liuhe Night Market / 六合夜市; Xing Long Ju / 興隆居; Tongji Anping Bean Jelly / 同記安平豆花; Lily Fruit Shop / 莉莉水果店; Hai Zhi Bing / 渡船頭海之冰; Wu Pao Chun Bakery / 吳寶春麥方店 高雄店; Memphis American Family Restaurant / 孟菲斯美式親子餐廳; Marie Taotao Family Restaurant / 瑪莉桃桃親子生活餐廳; Zone Cafe Family Restaurant / Zone Cafe弄咖啡親子餐廳; Er Mu Yan Wu Private Kitchen / 貳木言午; 217 Hao Shi Restaurant / 217好食複合式餐廳; The Circus in the Forest Taisugar / 森林中的馬戲團-糖廍; Happy Mama Family Restaurant / Happy Mama 親子餐廳; Ryan Cafe & Milk Tea / 萊恩咖啡 RYAN CAFE & MILK TEA; Cozzi Hotel Ximen Tainan family restaurant / 和逸飯店台南西門館

Already in the app — things to do: Anping Fort / 安平古堡; Chihkan Tower / 赤崁樓; Chimei Museum / 奇美博物館; Tainan Garden Night Market / 台南花園夜市; Tainan City Library main branch / 台南市立圖書館新總館; National Science and Technology Museum / 國立科學工藝博物館; Kaohsiung Railway Workshop kids' park / 高雄親子遊樂園區(台鐵高雄機廠); Baoan Container Children's Park / 保安兒童貨櫃主題公園; Lotus Pond Children's Park / 蓮池潭兒童公園; Pier-2 Art Center and its small train / 駁二藝術特區; Kaohsiung Shoushan Zoo / 壽山動物園; Wanpi World Safari Zoo / 頑皮世界野生動物園; Cijin Island and Seaside Park / 旗津; Kaohsiung Children's Art Museum / 高雄市立美術館兒童美術館; National Museum of Taiwan Literature / 國立臺灣文學館; Nanying Family Centre / 南瀛親子館; Heqiaopai Sausage Museum / 黑橋牌香腸博物館; Rende Dinosaur Park / 仁德恐龍公園; Niuchouzi Station Park / 牛稠子車站公園; Longtian ChaCha Heritage Education Park / 隆田ChaCha文化資產教育園區; Shu Gu Life Science Museum / 樹谷生活科學館; Zuozhen Fossil Park / 臺南左鎮化石園區; Shugu Farm / 樹谷農場; Yesen Animal School / 野森動物學校; Tom Bebe Kaohsiung Yixiang / 湯姆貝貝高雄義享店; PaPark Dream Mall / PaPark爬爬客親子樂園 夢時代店; FLOMO Eraser Factory / FLOMO富樂夢觀光工廠; Jingyuan Farm / 淨園休閒農場

### th-khaoyai — Khao Yai and Pak Chong (Thailand)
Area covered: Khao Yai and Pak Chong (also known as / includes: khao yai, pak chong, wang nam khiao, thap lan)

Already in the app — places to eat: Krua Khao Yai / ครัวเขาใหญ่; Pen Lao / เป็นลาว; Dairy Home / แดรี่โฮม; Chokchai Steakhouse / โชคชัยสเต็กเฮาส์; Midwinter Green; The Great Hornbill Grill; Yungkhaow Khaoyai / ยุ้งข้าว เขาใหญ่; Ban Mai Chay Nam / บ้านไม้ชายน้ำ; Pak Chong Night Market / ตลาดไนท์บาซาร์ปากช่อง; Rai Suwan / ไร่สุวรรณ; The Chocolate Factory Khao Yai; Umm!.. Milk / อืมม!..มิลค์; Yellow Submarine Coffee Tank; Like A Mountain / ไลค์ อะ เมาท์เท่น; EL Cafe / เอล คาเฟ่; Pirom Cafe / ภิรมย์ คาเฟ่; Blossom Bloom / บลอสซั่ม บลูม; Banyakart Khaoyai / บรรยากาศ เขาใหญ่; Donghouse / บ้านดง; Floryday Khaoyai Cafe & Flower / ฟลอรี่เดย์ เขาใหญ่ คาเฟ่ แอนด์ ฟลาวเวอร์; Rosebay Home Cooking & Cafe / โรสเบย์ โฮม คุกกิ้ง แอนด์ คาเฟ่; KHAAM Khaoyai / ขาม เขาใหญ่; Olna x PY Roasters / โอลนา พีวาย โรสเตอร์ส

Already in the app — things to do: Khao Yai National Park / อุทยานแห่งชาติเขาใหญ่; Farm Chokchai / ฟาร์มโชคชัย; Khao Yai Art Museum / เขาใหญ่ อาร์ต มิวเซียม; Khao Yai Art Forest; Scenical World / Scenical World Khao Yai; Pak Chong Night Market / ตลาดโต้รุ่งปากช่อง; PB Valley Khao Yai Winery; The Chocolate Factory Khao Yai / The Chocolate Factory Khaoyai; Primo Piazza; Mae Mon Mulberry Farm and Café; Flora Park Learning Centre; Klang Phana Rose Garden; Haew Suwat Waterfall; Takrao Waterfall; Lam Phra Phloeng Reservoir; Kong Kaew Waterfall; Pha Kluai Mai Waterfall; Nong Phak Chi Observation Tower

### th-sukhothai — Sukhothai and Si Satchanalai (Thailand)
Area covered: Sukhothai and Si Satchanalai (also known as / includes: sukhothai, si satchanalai, sawankhalok, hat siao)

Already in the app — places to eat: Jayhae Sukhothai Noodle / ก๋วยเตี๋ยวสุโขทัยเจ๊แฮ; Ta Pui Sukhothai Noodle / ก๋วยเตี๋ยวสุโขทัยตาปุ้ย; Baan Kru Iw / บ้านครูอิ๋ว; Poo Restaurant / ร้านปู; Fueang Fah / เฟื่องฟ้า; Mai Klang Krung / ไม้กลางกรุง; Khao Poep Yai Khrueang / ข้าวเปิ๊บยายเครื่อง; Ko Heng / โกเฮง; Sukhothai Night Market / ตลาดโต้รุ่งสุโขทัย; Wat Traphang Thong Market / ตลาดวัดตระพังทอง; The Coffee Cup; Cafe Thammada / ทำมาดาคาเฟ่; Lung Joi Restaurant / ร้านลุงจ้อย; Api Bistro; Khanom Chin Ban Na / ร้านขนมจีนบ้านนา; Mee Khao Phan Phak / หมี ข้าวพันผัก; Kuaytiew Saep Pak / ก๋วยเตี๋ยวแซ่บปาก; Krua Sukho / ครัวสุโข; Na Sukhothai / ณ โขทัย; Baan Chan Chai / บ้านจันทร์ฉาย; Pa Pen Mystery Noodles / ป้าเพ็ญ ก๋วยเตี๋ยวลึกลับ

Already in the app — things to do: Sukhothai Historical Park, central zone / อุทยานประวัติศาสตร์สุโขทัย; Wat Sa Si, the temple on the lake; Wat Si Sawai; Ramkhamhaeng National Museum; Si Satchanalai Historical Park; Sawanworanayok National Museum; Ramkhamhaeng National Park, Sai Rung waterfall; Ban Ko Noi Sangkhalok Kiln Study Centre; Ban Phra Phim learning centre (clay stamping); Wat Mahathat, Sukhothai; Wat Chang Lom; Sathorn Golden Textile Museum; Sarit Phong Dam; Tat Duean Waterfall; Wat Phra Phai Luang; Wat Si Chum / วัดศรีชุม; Chao Ram Beach / หาดเจ้าราม; Chao Ram Cave (bat flight) / ถ้ำเจ้าราม

### th-chanthaburi — Chanthaburi (Thailand)
Area covered: Chanthaburi (also known as / includes: chanthaburi, chantaburi, chanthaboon, chao lao, kung krabaen, namtok phlio)

Already in the app — places to eat: Chanthorn Phochana / จันทรโภชนา; Kuay Jap Pa Mai / ก๋วยจั๊บป้าไหม; Farm Pu Nim / ฟาร์มปูนิ่ม; The Tamajun Restaurant; Krua Lung Choey / ครัวลุงเชย; Jae Eid Tom Yam Seafood Noodles / เจ๊อี๊ด ก๋วยเตี๋ยวต้มยำทะเล; Nam Phu Market / ตลาดน้ำพุ; Chanthaboon Waterfront Walking Street / ถนนคนเดินชุมชนริมน้ำจันทบูร; Robinson Chanthaburi food court / ศูนย์อาหาร โรบินสัน จันทบุรี; Central Chanthaburi food court / ศูนย์อาหาร เซ็นทรัล จันทบุรี; Khanom Khai Pa Tai / ขนมไข่ป้าไต๊; Rocket Ice Cream / ไอศกรีมตราจรวด; Baan Luang Rajamaitri cafe / บ้านหลวงราชไมตรี; Sweet at Moon; Koff House Coffee Bar & Eatery; Soi Dao Restaurant; Shabu Phu Ing Dao / ชาบู ภูอิงดาว; Je Nong Ao Yang; Yai Tu Seafood

Already in the app — things to do: Chanthaboon Waterfront Community; Chanthaburi gem market; National Maritime Museum, Noen Wong; Namtok Phliu National Park; Kung Krabaen Bay Royal Development Study Centre; Kung Krabaen mangrove walkway; Khao Khitchakut National Park / อุทยานแห่งชาติเขาคิชฌกูฏ; Chanthaburi Cathedral; King Taksin Maharat Public Park; Hat Chao Lao; Laem Sadet beach; Chanthaburi Herb Garden; Bang Sra Kao mat-weaving village; Wat Khao Sukim; Khao Laem Sing Forest Park; Krathing Waterfall; Khao Sip Ha Chan Waterfall; Trok Nong Waterfall; Khao Phloi Waen; Noen Nang Phaya Viewpoint; Hat Khung Wiman
