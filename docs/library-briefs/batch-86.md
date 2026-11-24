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

### is-reykjavik — Reykjavík and the Golden Circle (Iceland)
Area covered: Reykjavík and the Golden Circle (also known as / includes: reykjavik, golden circle, geysir, gullfoss, blue lagoon, thingvellir)

Now in the app: 24 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Sægreifinn; Icelandic Street Food; Messinn; Café Loki; Tommi's Burger Joint; Þrír Frakkar; Reykjavik Fish Restaurant; Friðheimar; Efstidalur II; Bæjarins Beztu Pylsur; Hlemmur Mathöll; Gullfoss Kaffi; Brauð & Co; Sandholt; Valdís; Mokka Kaffi; Kaffi Laugalækur; The Laundromat Café; Kattakaffihúsið (The Cat Café); Grandi Mathöll; Flóran (Kaffi Flóra); Iðnó; 101 Reykjavik Street Food; Arna Ís og Kaffi

Already in the app — things to do: Perlan: Wonders of Iceland / Perlan; Reykjavík Family Park and Zoo / Fjölskyldu- og húsdýragarðurinn; Whales of Iceland / Hvalasýning; Laugardalslaug swimming pool / Laugardalslaug; Nauthólsvík geothermal beach / Ylströndin í Nauthólsvík; Árbær Open Air Museum / Árbæjarsafn; National Museum of Iceland / Þjóðminjasafn Íslands; The Settlement Exhibition (Reykjavík 871±2) / Landnámssýningin; Reykjavík Art Museum / Listasafn Reykjavíkur; FlyOver Iceland; Þingvellir National Park / Þingvellir; Geysir and Strokkur geothermal area / Geysir, Strokkur; Gullfoss waterfall / Gullfoss; Friðheimar tomato farm / Friðheimar; Blue Lagoon / Bláa Lónið; Hljóðhimnar at Harpa / Hljóðhimnar; Reykjavík Botanic Garden / Grasagarður Reykjavíkur; Viðey Island / Viðey; Volcano Express; Tjörnin pond / Tjörnin; Hljómskálagarður park / Hljómskálagarður; Öskjuhlíð hill / Öskjuhlíð; Árbæjarlaug pool / Árbæjarlaug; Secret Lagoon / Gamla Laugin; Fontana baths / Laugarvatn Fontana

### it-sicily — Sicily (Italy)
Area covered: Sicily (also known as / includes: sicily, sicilia, palermo, taormina, etna, catania)

Now in the app: 23 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Antica Focacceria San Francesco; Ferro di Cavallo; Osteria Antica Marina; Trattoria de Fiore; Trattoria Da Nino; Villa Zuccaro; Osteria Da Mariano; Sicilia in Tavola; Al Porticciolo; Mercato di Ballarò; Ke Palle; Caseificio Borderi; Pasticceria Savia; Bam Bar; Caffè Sicilia; Pasticceria Cappello; Vecchia Trattoria da Totò; Osteria Ballarò; Tondo; Grano Granis; I Segreti del Chiostro; Gelateria Ciccio Adelfio; Cappadonia Gelati

Already in the app — things to do: Valley of the Temples / Valle dei Templi, Agrigento; Mount Etna cable car and Silvestri craters / Funivia dell'Etna, Rifugio Sapienza; Neapolis Archaeological Park, Syracuse / Parco Archeologico della Neapolis, Siracusa; Maniace Castle, Ortigia / Castello Maniace, Ortigia; Ancient Theatre of Taormina / Teatro Antico di Taormina; Villa Romana del Casale / Villa Romana del Casale, Piazza Armerina; Zingaro Nature Reserve / Riserva dello Zingaro; Segesta Archaeological Park / Parco Archeologico di Segesta; Palermo Botanical Garden / Orto Botanico di Palermo; Antonino Pasqualino International Puppet Museum / Museo internazionale delle marionette Antonio Pasqualino; Salinas Archaeological Museum / Museo Archeologico Regionale Antonino Salinas; Mondello beach / Spiaggia di Mondello; Ursino Castle and Civic Museum, Catania / Castello Ursino, Catania; La Pescheria fish market, Catania / La Pescheria, Catania; Alcantara Gorge / Gole dell'Alcantara; Cefalù town beach and seafront / Spiaggia di Cefalù; La Rocca of Cefalù / La Rocca di Cefalù; Parco della Salute playground / Parco della Salute Livia Morello; Monte Pellegrino; Pretoria Fountain / Fontana Pretoria; Oratorio di San Lorenzo; Foro Italico; Santa Maria dello Spasimo; Piazza IX Aprile; Villa Comunale di Taormina; Cuticchio puppet theatre / Figli d'Arte Cuticchio

### th-lampang — Lampang, Chae Hom and Mae Moh (Thailand)
Area covered: Lampang, Chae Hom and Mae Moh (also known as / includes: lampang, kad kong ta, mae moh, chae hom, khun tan, lampang luang)

Now in the app: 22 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Aroy One Baht / อร่อยบาทเดียว; Khao Soi Islam / ข้าวซอยอิสลาม; The Riverside Lampang / ริเวอร์ไซด์ ลำปาง; Krua Mukda / ครัวมุกดา; Mae Hae / แม่แห; Long Jim / หลงจิม; Kad Kong Ta Walking Street / ถนนคนเดินกาดกองต้า; Khanom Chin Pa Bun Si / ขนมจีนป้าบุญศรี; Assawin Market / ตลาดอัศวิน; Central Lampang food court / ศูนย์อาหาร เซ็นทรัล ลำปาง; Khao Soi Mae Fong / ข้าวซอยแม่ฟอง; Mahamitr Coffee / มหามิตร; Cha Bar Cafe Mae Moh / ชาบาร์คาเฟ่ แม่เมาะ; Vital Cafe / ไวทัล คาเฟ่; Phikul Cafe / พิกุล คาเฟ่; Khao Soi Pa Boon / ข้าวซอยป้าบุญ; Khao Soi Super / ข้าวซอยซูปเปอร์; Kuay Tiew Luk Thung Dab Daeng / ก๋วยเตี๋ยวลูกทุ่งดาบแดง; Rad Na Super / ราดหน้า ซุปเปอร์; Khao Man Gai Thip Chang / ข้าวมันไก่ ทิพย์ช้าง ลำปาง; The Pappa Pizza and Steak / The Pappa Pizza and Steak ลำปาง; Sai Ua Pao Tao Luang / ไส้อั่วเผาเตาหลวงลำปาง

Already in the app — things to do: Thai Elephant Conservation Center; Kad Kong Ta weekend walking street; Dhanabadee Ceramic Museum; Chae Son National Park hot springs and waterfall; Wat Phra That Lampang Luang / วัดพระธาตุลำปางหลวง; Lampang horse-carriage ride; Wang Huea Reservoir raft cafés; Wat Phra That Chom Ping; Wat Pong Sanuk Nuea; Mae Wa National Park; Lampang Herb Conservation; Tham Pha Thai National Park cave; Kiu Lom Dam rafts; Bo Nam Rae Bo Nam Ron hot spring; Wat Si Chum (Lampang); Hug You Sheep Farm / ฟาร์มแกะฮักยู; Museum Lampang / มิวเซียมลำปาง; Wat Prathat Doi Prachan / วัดพระธาตุดอยพระฌาน; Wat Phra Chedi Sao Lang; Nakhon Lampang railway station; Ratsadaphisek Bridge; Rai Hom Fa; Doi Khun Tan National Park; Wat Akkho Chai Khiri; Wat Mon Phraya Chae; Kad Thung Kwian market; Floating pagodas, Wat Phutthabat Sutthawat

### tw-hualien — Hualien and Taroko (Taiwan)
Area covered: Hualien and Taroko (also known as / includes: hualien, taroko, taroko gorge, qingshui, yilan, taitung)

Now in the app: 16 places to eat, 33 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Ye Xiang Bian Shi / 液香扁食店; Hai Pu Oyster Omelette / 海埔蚵仔煎; Mr. Goose / 鵝肉先生; Jiang Tai Tai Beef Noodles / 江太太牛肉麵; Lai Cheng Spare Ribs Noodle / 來成排骨麵; Salt Lick Smokehouse / 火車頭烤肉屋; Dageeli Tribe Restaurant / 達基力部落屋; Dongdamen Night Market / 東大門夜市; Gong Zheng Bao Zi / 公正包子; Zhou Jia Steamed Dumplings / 周家蒸餃; Lao Pai Zha Dan Cong You Bing / 老牌炸彈蔥油餅; Miaokou Red Tea / 廟口紅茶; Tzen Chi Mochi / 曾記麻糬; Jiaxing Ice Fruit Store / 佳興冰果室; Huilan Bay Landscape Restaurant / 洄瀾灣景觀餐廳; Yinglun Western Restaurant / 英倫西餐廳

Already in the app — things to do: Farglory Ocean Park / 遠雄海洋公園; Taroko National Park Visitor Centre and plateau trail / 太魯閣國家公園遊客中心; Dongdamen Night Market / 東大門夜市; Liyu Lake / 鯉魚潭; Qixingtan Beach / 七星潭; Guangfu Sugar Factory / 花蓮觀光糖廠; Ruisui Ranch / 瑞穗牧場; Guanglong Museum / 光隆博物館; Hualien County Stone Sculpture Museum / 花蓮縣石雕博物館; Hualien Cultural and Creative Industries Park / 花蓮文化創意產業園區; Danong Dafu Forest Park / 大農大富平地森林園區; Fuyuan National Forest Recreation Area; Lintianshan Forestry Culture Park; Mataian Wetland Ecological Park; Pine Garden / 松園別館; Zhikaxuan Water Park / 知卡宣親水公園; Giraffe Family Park / 長頸鹿親子公園; Zhaofeng Farm / 兆豐農場; Hualien Archaeology Museum / 花蓮考古博物館; Zhang Family Tree Garden / 張家の樹園; Meilun Night Market / 美崙夜市; Chulu Ranch / 初鹿牧場; Native Applied Botanical Garden / 原生應用植物園; Taitung Forest Park / 台東森林公園; Fushan Fish Reserve / 富山護魚區; Zhiben National Forest Recreation Area / 知本國家森林遊樂區; Taiyuan Valley / 泰源幽谷; Cocona Coffee / 可可娜咖啡; Luye Sika Deer Park / 鹿野梅花鹿公園; Xinyuanchang Black Tea Culture Museum / 新元昌紅茶產業文化館; Hualien Nonghao Base / 花蓮農好基地; Li Chuan Aquafarm / 立川漁場; Dashibi Mountain Trail / 大石鼻山步道
