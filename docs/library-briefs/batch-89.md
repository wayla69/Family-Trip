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

### mt-valletta — Valletta and Gozo (Malta)
Area covered: Valletta and Gozo (also known as / includes: valletta, mdina, gozo, comino, blue grotto, blue lagoon)

Now in the app: 15 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Nenu the Artisan Baker; Rubino; Trabuxu Bistro; Ta' Rikardu; The Boathouse; Ta' Karolina; Country Terrace; Tatita's; Is-Suq tal-Belt; Piadina Caffe; Maxokk Bakery; Mekren's Bakery; Caffe Cordina; Museum Café; Café Jubilee

Already in the app — things to do: Malta National Aquarium; Esplora Interactive Science Centre; Popeye Village; Playmobil FunPark; Upper Barrakka Gardens; Fort St Elmo and the National War Museum; Christmas in the Capital, Valletta; Mdina Experience; Marsaxlokk Sunday market; Ħaġar Qim and Mnajdra Archaeological Park; Għar Dalam Cave and Museum; Għadira Bay; Cittadella (the Citadel), Victoria, Gozo; Ġgantija Temples; Ramla Bay, Gozo; National Museum of Archaeology; Great Siege Square / Misraħ l-Assedju l-Kbir; Fort St Angelo; Fort Manoel; Tarxien Temples / Ħal Tarxien Prehistoric Complex; Xwejni salt pans; Dwejra Inland Sea

### p-lapland — Lapland (Finland)
Area covered: Lapland (also known as / includes: lapland, rovaniemi, santa claus village, saariselka, kakslauttanen, arctic circle)

Now in the app: 16 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Nili; Roka Kitchen & Wine Bar; Gaissa; Arctic Restaurant; Kotahovi; Three Elves Restaurant; Ämmilä; Restaurant Aanaar; Laanilan Kievari; Santa's Salmon Place; Kauppayhtiö; Cafe & Bar 21; Choco Deli; Kotileipomo Antinkaapo; Restaurant Gallis; Piparina

Already in the app — things to do: Santa Claus Village / Joulupukin Pajakylä; SantaPark / Joulupukin Pajakylä SantaPark; Arktikum Science Centre / Arktikum; Ranua Wildlife Park / Ranuan eläinpuisto; Pilke Science Centre / Tiedekeskus Pilke; Snowman World; Arctic Snow Hotel; Kotatieva Winter Leisure Park / Kotatieva; Santa Claus Office; Santa Claus Main Post Office; Santa's Pets; Mrs Santa Claus Christmas Cottage; Arctic Garden; Santa's Snowtubing; Korundi – Rovaniemi Art Museum / Kulttuuritalo Korundi; Huima adventure park; Angry Birds playground; Roiske floating water park; Lampivaara amethyst mine; Santasport pools / Santasport; Santa Claus Secret Forest – Joulukka

### p-yellowstone — Yellowstone (United States)
Area covered: Yellowstone (also known as / includes: yellowstone, old faithful, grand prismatic, grand teton, jackson hole, wyoming)

Now in the app: 21 places to eat, 16 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Old Faithful Inn Dining Room; Obsidian Dining Room; Lake Yellowstone Hotel Dining Room; Mammoth Hotel Dining Room; Roosevelt Lodge Dining Room; Running Bear Pancake House; Yellowstone Pizza Company; Bubba's Bar-B-Que; Old Faithful Lodge Cafeteria; Canyon Lodge Eatery; The Corral; Old Faithful Lodge Bake Shop; Persephone Bakery; Moo's Gourmet Ice Cream; The Bunnery Bakery & Restaurant; Lake Deli; Lake Lodge Cafeteria; Mammoth Terrace Grill; Bear Paw Deli; Geyser Grill (Snow Lodge); Grant Village Dining Room

Already in the app — things to do: Old Faithful and the Upper Geyser Basin; Old Faithful Visitor Education Center; Midway Geyser Basin and Grand Prismatic Spring; Fountain Paint Pot and Lower Geyser Basin; Mammoth Hot Springs Terraces; Albright Visitor Center and Museum; Grand Canyon of the Yellowstone; Mud Volcano and Dragon's Mouth Spring; Norris Geyser Basin and Museum; West Thumb Geyser Basin; Lamar Valley wildlife watching; Hayden Valley wildlife watching; Firehole Canyon swimming area; Grizzly and Wolf Discovery Center; Museum of the Yellowstone; Old Faithful Inn

### th-trang — Trang and its islands (Thailand)
Area covered: Trang and its islands (also known as / includes: trang, koh mook, koh kradan, koh ngai, kantang, pak meng)

Now in the app: 21 places to eat, 16 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Phong Ocha 1 / พงษ์โอชา 1; Ruan Thai Dim Sum / เรือนไทยติ่มซำ; Jip Khao / จีบขาว; Sinjew / ซินจิว; Khao Tom Pui / ข้าวต้มพุ้ย; Sin Ocha / สินโอชา; Richy / ริชชี่; Hilltop Restaurant; Trang Station Night Market / ตลาดนัดกลางคืนหน้าสถานีรถไฟตรัง; Cinta Garden / ชินตา การ์เด้น; Ko Pi / โกปี๊; Kook Ming Cake / เค้กขุกมิ่ง; Yu Chiang / ยู่เชียง; Cha Nai Seafood / จ๊ะไหนซีฟู้ด; Hat Yao Seafood / หาดยาวซีฟู๊ด; Tha Khlai Seafood / ท่าใคล ซีฟู๊ด; Klin Kaphrao / กลิ่นกะเพรา; Ton Po House / ต้นปอ เฮ้าส์; Baan Rai Nai Fan / บ้านไร่ในฝัน; Lae View / แลวิว; Moo Kratha Ruen Khun Yai / หมูกระทะเรินคุณยาย

Already in the app — things to do: Pak Meng Beach / หาดปากเมง; Hat Chao Mai National Park / อุทยานแห่งชาติหาดเจ้าไหม; Koh Mook and Emerald Cave / เกาะมุก ถ้ำมรกต; Peninsular Botanic Garden (Thung Khai) / สวนพฤกษศาสตร์ภาคใต้ ทุ่งค่าย; Ton Te Waterfall / น้ำตกโตนเต๊ะ; Rajamangala Trang Aquarium / พิพิธภัณฑ์สัตว์น้ำราชมงคลตรัง; Trang night market and the station weekend market / ตลาดกลางคืนตรัง ถนนรื่นรมย์; Khao Chang Hai Cave / ถ้ำเขาช้างหาย; Khao Kob Cave (Tham Le Khao Kob); Kantang Railway Station; Khao Chong Botanic Garden; Koh Kradan; Koh Ngai (Koh Hai); Koh Libong; Na Muen Si weaving centre; Tam Kong Yia shrine
