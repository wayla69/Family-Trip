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

### th-rayong — Rayong and Koh Samet (Thailand)
Area covered: Rayong and Koh Samet (also known as / includes: rayong, koh samet, ko samet, samet island, ban phe, ao wong duean)

Now in the app: 15 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Laem Charoen Seafood / แหลมเจริญซีฟู้ด; Tamnanpar / ตำนานป่า; Waree Seafood / วารีซีฟู้ด; Jae Yindee Seafood / เจ๊ยินดีซีฟู้ด; Jep’s Restaurant; Ploy Talay / พลอยทะเล; The Kitt & Food; Samed Villa Restaurant; Central Rayong food court / ศูนย์อาหาร เซ็นทรัล ระยอง; Ban Phe Market / ตลาดบ้านเพ; Taphong Fruit Market / ตลาดผลไม้ตะพง; Suphattra Land / สวนสุภัทราแลนด์; Swensen’s Central Rayong / สเวนเซ่นส์ เซ็นทรัล ระยอง; Gazebo Cafe Rayong / กาซีโบ; Ran Choei / ร้านเชย

Already in the app — things to do: Koh Samet beaches (Khao Laem Ya–Mu Ko Samet National Park) / เกาะเสม็ด; Hat Mae Ramphueng beach; Khao Chamao–Khao Wong National Park, Khao Chamao waterfall; Rayong Botanical Garden; Sopha Arboretum; Saeng Chan beach; Raksa Sam Bridge mangrove walkway / สะพานรักษ์แสม; Thung Prong Thong (golden mangrove meadow); Suan Lung Thong Bai fruit orchard; Suan La-Mai fruit orchard; Suphattra Land; Koh Kloi floating market; Laem Charoen Beach; Rock and Mineral Research Centre; Wat Ban Don shadow play museum; Rayong Aquarium / สถานแสดงพันธุ์สัตว์น้ำระยอง; Laem Mae Phim beach

### tr-cappadocia — Cappadocia (Türkiye)
Area covered: Cappadocia (also known as / includes: cappadocia, kapadokya, goreme, uchisar, urgup, nevsehir)

Now in the app: 13 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Dibek; Topdeck Cave Restaurant; Pumpkin Göreme Restaurant and Art Gallery; Seten Anatolian Cuisine; Old Cappadocia Cafe & Restaurant; Ziggy Cafe & Restaurant; Han Çırağan; Bizim Ev; Old Greek House; Fırın Express; Nazar Börek & Cafe; Cafe Şafak; King's Coffee Shop

Already in the app — things to do: Göreme Open Air Museum / Göreme Açık Hava Müzesi; Kaymaklı Underground City / Kaymaklı Yeraltı Şehri; Derinkuyu Underground City / Derinkuyu Yeraltı Şehri; Zelve Open Air Museum / Zelve Açık Hava Müzesi; Güray Ceramics Museum / Güray Müze; Ihlara Valley / Ihlara Vadisi; Uçhisar Castle / Uçhisar Kalesi; Hot air balloon flight over Göreme; Avanos pottery workshops / Avanos çömlek; Ortahisar castle and old town / Ortahisar; Pigeon Valley walk / Güvercinlik Vadisi; Özkonak Underground City / Özkonak Yeraltı Şehri; Love Valley / Aşk Vadisi; Devrent Valley (Imagination Valley) / Devrent Vadisi; Hair Museum of Avanos (Chez Galip); Paşabağ; Rose Valley / Gül Vadisi; Cappadocia Art & History Museum (dolls); The Three Beauties

### br-rio — Rio de Janeiro (Brazil)
Area covered: Rio de Janeiro (also known as / includes: rio de janeiro, copacabana, ipanema, sugarloaf, santa teresa, paraty)

Now in the app: 13 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Churrascaria Palace; Fogo de Chão; Garota de Ipanema; Casa da Feijoada; Galeto Sat's; Cervantes; Aprazível; Bar do Mineiro; Bibi Sucos; Polis Sucos; Confeitaria Colombo; Mil Frutas; Sorvete Itália

Already in the app — things to do: Christ the Redeemer / Cristo Redentor; Sugarloaf Mountain cable car / Parque Bondinho Pão de Açúcar; AquaRio; Museum of Tomorrow / Museu do Amanhã; BioParque do Rio (Rio zoo); Rio Botanical Garden / Jardim Botânico do Rio de Janeiro; Parque Lage; Flamengo Park / Aterro do Flamengo; São Cristóvão Fair / Feira de São Cristóvão; Tijuca National Park (Cascatinha Taunay); Leme and Copacabana beach (calm stretch); Quinta da Boa Vista park; Lagoa Rodrigo de Freitas; Selarón Steps / Escadaria Selarón; Rio Planetarium (Museum of the Universe); Catacumba Park / Parque Natural Municipal da Catacumba; Baby park, Praça Afonso Pena / Parque do Bebê da Praça Afonso Pena; Baixo Bebê, Leblon / Baixo Bebê

### cn-harbin — Harbin (China)
Area covered: Harbin (also known as / includes: harbin, ice festival, ice and snow world, snow town, yabuli)

Now in the app: 16 places to eat, 15 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Lao Chu Jia / 老厨家 道里三道街旗舰店; Huamei Western Restaurant / 华梅西餐厅; Tatoc Restaurant / 塔道斯西餐厅; Oriental King of Dumplings / 东方饺子王 中央大街店; Lao Chang Chunbing / 老昌春饼; Zhang Bao Pu / 张包铺; Lao Du Yi Chu / 老都一处; Qiulin Food Store / 秋林公司 食品商场; Daoli Market / 道里菜市场; Hongzhuan Street Morning Market / 红专街早市; Madieer Ice Lolly Shop / 马迭尔冷饮厅; Lao Ding Feng / 老鼎丰; Russia Coffee & Food / 露西亚咖啡西餐厅; Be For Time Tea House; Maomao Smoked Meat House; Hot Pot Taidou

Already in the app — things to do: Harbin Ice and Snow World / 哈尔滨冰雪大世界; Sun Island Snow Sculpture Art Expo / 太阳岛国际雪雕艺术博览会; Zhaolin Park Ice Lantern Art Fair / 兆麟公园冰灯游园会; Harbin Polarland / 哈尔滨极地馆; Siberian Tiger Park / 东北虎林园; Harbin Northern Forest Zoo / 哈尔滨北方森林动物园; Central Street and Madier ice lollies / 中央大街; Saint Sophia Square and Architecture Art Gallery / 圣索菲亚教堂; Volga Manor / 伏尔加庄园; Heilongjiang Provincial Museum / 黑龙江省博物馆; Stalin Park and the Songhua River promenade; Dragon Tower, Harbin / 龙塔; Jile Temple (Bliss Temple) / 极乐寺; Songhua River Ice and Snow Carnival / 松花江冰雪嘉年华; Heilongjiang Science and Technology Museum / 黑龙江省科学技术馆
