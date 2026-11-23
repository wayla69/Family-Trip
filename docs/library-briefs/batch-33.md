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

### th-korat — Nakhon Ratchasima (Korat) (Thailand)
Area covered: Nakhon Ratchasima (Korat) (also known as / includes: nakhon ratchasima, korat, khorat, phimai, dan kwian, phanom wan)

Already in the app — places to eat: Kai Yang Saeng Thai / ไก่ย่างแสงไทย; Banmai Chay Nam / บ้านไม้ชายน้ำ; Chez Andy; Baiteiy Restaurant / ร้านใบเตย; Save One Market / ตลาดเซฟวัน; Pier 21 Terminal 21 Korat / เพียร์ 21 เทอร์มินอล 21 โคราช; The Mall Korat food hall / ศูนย์อาหาร เดอะมอลล์ โคราช; Wat Boon Night Bazaar / ไนท์บาซาร์วัดบูรพ์; Khanom Chin Ban Pradok / ขนมจีนบ้านประโดก; Class Cafe / คลาส คาเฟ่; Chao Sua / เจ้าสัว; Pad Seoul Cafe

Already in the app — things to do: Nakhon Ratchasima Zoo / สวนสัตว์นครราชสีมา; Phimai Historical Park / อุทยานประวัติศาสตร์พิมาย; Phimai National Museum / พิพิธภัณฑสถานแห่งชาติพิมาย; Museum of Petrified Wood, Ancient Elephants and Dinosaurs / พิพิธภัณฑ์ไม้กลายเป็นหิน; HarborLand indoor playground, Terminal 21 Korat / ฮาร์เบอร์แลนด์ เทอร์มินอล 21 โคราช; Thao Suranari Monument (Ya Mo) / อนุสาวรีย์ท้าวสุรนารี; Sai Ngam banyan park / ไทรงาม; Dan Kwian Pottery Village; Nakhon Ratchasima City Museum; Ban Prasat Archaeological Site; Lam Takhong Dam and Thao Suranaree Park; Khao Yai Tiang wind-turbine ridge; Pratu Chumphon, the old city gate; Phanomwan Ancient Castle; Huai Bong Windmill Field; Jim Thompson Farm

### cn-chongqing — Chongqing (China)
Area covered: Chongqing (also known as / includes: chongqing, hongyadong, liziba, yangtze, three gorges)

Already in the app — places to eat: Pei Jie Lao Huoguo / 珮姐老火锅; Liu Yi Shou Hot Pot / 刘一手火锅; Cygnet Hot Pot (Hongyadong) / 小天鹅火锅 洪崖洞店; Yang Ji Long Fu / 杨记隆府; Xi Yang Yang; Hua Shi Wan Za Mian / 花市豌杂面; Bayi Road Food Street / 八一路好吃街; Hao You Lai Suan La Fen / 好又来酸辣粉; Shancheng Xiao Tangyuan / 山城小汤圆; Chen Changyin Mahua / 陈昌银麻花; Jiaotong Teahouse / 交通茶馆

Already in the app — things to do: Chongqing Zoo / 重庆动物园; Chongqing Science and Technology Museum / 重庆科技馆; Chongqing Natural History Museum / 重庆自然博物馆; Chongqing China Three Gorges Museum / 重庆中国三峡博物馆; Chongqing Happy Valley / 重庆欢乐谷; Chongqing Hanhai Ocean Park / 重庆汉海海洋公园; Hongyadong / 洪崖洞; Ciqikou Ancient Town / 磁器口古镇; Jiefangbei pedestrian street / 解放碑步行街; Yangtze River Cableway / 长江索道; Nanshan One Tree Viewing Platform / 南山一棵树观景台; Madame Tussauds Chongqing / 重庆杜莎夫人蜡像馆; Black Mountain Valley / 黑山谷; Chongqing People's Assembly Hall / 重庆人民大礼堂; Wansheng Stone Forest / 万盛石林; E'ling Park; Light Rail Line 2 at Liziba Station; Pan Xiaobao Indoor Play and Learning Park / 盘小宝重庆店

### th-rayong — Rayong and Koh Samet (Thailand)
Area covered: Rayong and Koh Samet (also known as / includes: rayong, koh samet, ko samet, samet island, ban phe, ao wong duean)

Already in the app — places to eat: Laem Charoen Seafood / แหลมเจริญซีฟู้ด; Tamnanpar / ตำนานป่า; Waree Seafood / วารีซีฟู้ด; Jae Yindee Seafood / เจ๊ยินดีซีฟู้ด; Jep’s Restaurant; Ploy Talay / พลอยทะเล; The Kitt & Food; Samed Villa Restaurant; Central Rayong food court / ศูนย์อาหาร เซ็นทรัล ระยอง; Ban Phe Market / ตลาดบ้านเพ; Taphong Fruit Market / ตลาดผลไม้ตะพง; Suphattra Land / สวนสุภัทราแลนด์; Swensen’s Central Rayong / สเวนเซ่นส์ เซ็นทรัล ระยอง

Already in the app — things to do: Koh Samet beaches (Khao Laem Ya–Mu Ko Samet National Park) / เกาะเสม็ด; Hat Mae Ramphueng beach; Khao Chamao–Khao Wong National Park, Khao Chamao waterfall; Rayong Botanical Garden; Sopha Arboretum; Saeng Chan beach; Raksa Sam Bridge mangrove walkway / สะพานรักษ์แสม; Thung Prong Thong (golden mangrove meadow); Suan Lung Thong Bai fruit orchard; Suan La-Mai fruit orchard; Suphattra Land; Koh Kloi floating market; Laem Charoen Beach; Rock and Mineral Research Centre; Wat Ban Don shadow play museum; Rayong Aquarium / สถานแสดงพันธุ์สัตว์น้ำระยอง

### th-loei — Loei and Chiang Khan (Thailand)
Area covered: Loei and Chiang Khan (also known as / includes: loei, chiang khan, phu kradueng, phu ruea, dan sai, kaeng khut khu)

Already in the app — places to eat: Heuan Luang Prabang / เฮือนหลวงพระบาง; Rabiang Rim Khong / ระเบียงริมโขง; Chiang Khan Hill Resort restaurant / ห้องอาหาร เชียงคานฮิลล์ รีสอร์ท; Loei Palace Hotel restaurant / ห้องอาหาร โรงแรมเลยพาเลซ; Luk Phochana / ลุกโภชนา; Chiang Khan Walking Street / ถนนคนเดินเชียงคาน; Kaeng Khut Khu Women’s Group Local Food / กลุ่มสตรีอาหารพื้นเมืองแก่งคุดคู้; Kaeng Khut Khu coconut candy shops / ร้านมะพร้าวแก้ว แก่งคุดคู้; Husband and Wife / ฮัสแบนด์แอนด์ไวฟ์; Buppa Kaffe / บับภา คาเฟ่; Tiny Tea Coffee and Bakes; Toffee Coffee by Baan Supichaya / บ้านสุพิชญา

Already in the app — things to do: Chiang Khan Skywalk / สกายวอล์คเชียงคาน; Chiang Khan Walking Street / ถนนคนเดินเชียงคาน; Kaeng Khut Khu rapids by boat / แก่งคุดคู้; Chiang Khan sunset boat on the Mekong / ล่องเรือโขงเชียงคาน; Suan Hin Pha Ngam / สวนหินผางาม; Phu Ruea National Park / อุทยานแห่งชาติภูเรือ; V.C. Garden, Phu Ruea / วี.ซี. การ์เด้น; Phu Kradueng National Park / อุทยานแห่งชาติภูกระดึง; Phi Ta Khon Museum, Dan Sai / พิพิธภัณฑ์ผีตาโขนด่านซ้าย; Phu Phra, Dan Sai / ภูพระ; Loei Museum / พิพิธภัณฑ์เมืองเลย; Ban Kang Pla Thai Loei weaving group / กลุ่มทอผ้าไทเลย บ้านแก่งปลา; Bananaland Phu Luang; Huai Krathing Reservoir; Na Haeo Walking Street; Mekong Riverfront; Wat Si Khun Muang
