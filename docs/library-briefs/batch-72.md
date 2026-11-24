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

### kr-gyeongju — Gyeongju (South Korea)
Area covered: Gyeongju (also known as / includes: gyeongju, bulguksa, cheomseongdae, daereungwon, donggung, wolji)

Now in the app: 19 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Dosol Maeul / 도솔마을; Gyodong Ssambap / 교동쌈밥; Ipungnyeo Guro Ssambap / 이풍녀구로쌈밥; Maetdol Sundubu / 맷돌순두부; Gyeongju Wonjo Kongguk / 경주원조콩국; Sukyeong Sikdang / 숙영식당; Gyeongju Cheonnyeon Hanwoo Bomun / 경주천년한우 보문점; Myeongdong Jjolmyeon / 명동쫄면; Hamyangjip / 함양집 경주점; Seongdong Market / 성동시장; Gyeongju Jungang Night Market / 경주중앙시장 야시장; Gyori Gimbap / 교리김밥; Hwangnam Bread / 황남빵 본점; Danseokga Chalboribbang / 단석가찰보리빵; Starbucks Gyeongju Daereungwon / 스타벅스 경주대릉원점; Bokgil Gyeongju Main Branch / 복길 경주본점; Gyodong Jipbap Gyeongju Hwangridan-gil Main Branch / 교동집밥 경주황리단길본점; Umawang Gyeongju Main Branch / 우마왕 경주본점; Eden Garden (Gyeongju) / 에덴동산

Already in the app — things to do: Gyeongju World / 경주월드; Donggung Palace and Wolji Pond / 경주 동궁과 월지; Daereungwon Tomb Complex / 경주 대릉원; Cheomseongdae / 경주 첨성대; Gyeongju National Museum and Children's Museum / 국립경주박물관 어린이박물관; Gyeongju Expo Park / 경주엑스포대공원; Zoolung Zoolung Gyeongju Bomun / 주렁주렁 경주보문점; Hwangnidan-gil / 황리단길; Bomun Lake path / 보문호; Woljeonggyo Bridge / 월정교; Gyerim Forest / 경주 계림; Yangdong Village / 경주 양동마을; Gyeongju Folk Craft Village / 경주민속공예촌; Hwangnyongsa Temple History and Culture Hall / 황룡사역사문화관; Bulguksa Temple / 불국사; Gyeongju World Automobile Museum / 경주세계자동차박물관; Korean Popular Music Museum / 한국대중음악박물관; Uyang Museum of Art / 우양미술관; Wonder Space Bomun Branch; Jungle Media Park; Gyeongju East Palace Garden (Donggungwon) / 경주 동궁원

### th-korat — Nakhon Ratchasima (Korat) (Thailand)
Area covered: Nakhon Ratchasima (Korat) (also known as / includes: nakhon ratchasima, korat, khorat, phimai, dan kwian, phanom wan)

Now in the app: 21 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Kai Yang Saeng Thai / ไก่ย่างแสงไทย; Banmai Chay Nam / บ้านไม้ชายน้ำ; Chez Andy; Baiteiy Restaurant / ร้านใบเตย; Save One Market / ตลาดเซฟวัน; Pier 21 Terminal 21 Korat / เพียร์ 21 เทอร์มินอล 21 โคราช; The Mall Korat food hall / ศูนย์อาหาร เดอะมอลล์ โคราช; Wat Boon Night Bazaar / ไนท์บาซาร์วัดบูรพ์; Khanom Chin Ban Pradok / ขนมจีนบ้านประโดก; Class Cafe / คลาส คาเฟ่; Chao Sua / เจ้าสัว; Pad Seoul Cafe; Nub Pochana / หนับโภชนา; Larb Somphit / ลาบสมพิศ; Soy Jeck Pochana / โซ้ยเจ็กโภชนา; Khrua Suwimon / ครัวสุวิมล; Pa Plueang Pad Mee Krathok / ร้านผัดหมี่กระโทกป้าเปลื้อง; Khanom Jeen Yai Pao / ร้านขนมจีนยายเป้า; Ko Kia / ก๋วยเตี๋ยวเรือโกเกี้ย; Kin Dee / กินดีโคราช; Khanom Oshin / ขนมโอชิน

Already in the app — things to do: Nakhon Ratchasima Zoo / สวนสัตว์นครราชสีมา; Phimai Historical Park / อุทยานประวัติศาสตร์พิมาย; Phimai National Museum / พิพิธภัณฑสถานแห่งชาติพิมาย; Museum of Petrified Wood, Ancient Elephants and Dinosaurs / พิพิธภัณฑ์ไม้กลายเป็นหิน; HarborLand indoor playground, Terminal 21 Korat / ฮาร์เบอร์แลนด์ เทอร์มินอล 21 โคราช; Thao Suranari Monument (Ya Mo) / อนุสาวรีย์ท้าวสุรนารี; Sai Ngam banyan park / ไทรงาม; Dan Kwian Pottery Village; Nakhon Ratchasima City Museum; Ban Prasat Archaeological Site; Lam Takhong Dam and Thao Suranaree Park; Khao Yai Tiang wind-turbine ridge; Pratu Chumphon, the old city gate; Phanomwan Ancient Castle; Huai Bong Windmill Field; Jim Thompson Farm; 100-year wooden bridge; Wat Phra Narai Maharat; Man Fa waterfall

### us-alaska — Alaska (United States)
Area covered: Alaska (also known as / includes: alaska, anchorage, juneau, denali, fairbanks, seward)

Now in the app: 18 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Moose's Tooth Pub & Pizzeria; Snow City Cafe; Glacier Brewhouse; Gwennie's Old Alaska Restaurant; Ray's Waterfront; Denali Park Salmon Bake; Mountain High Pizza Pie; The Hangar on the Wharf; The Cookie Jar; Pel'meni; Morino Grill; Wild Scoops; Talkeetna Roadhouse; The Bake Shop; Hot Licks Homemade Ice Cream; Simon & Seafort's Saloon & Grill; Golden Donuts; Dino's Donuts

Already in the app — things to do: Alaska SeaLife Center; Alaska Wildlife Conservation Center; Anchorage Museum; The Alaska Zoo; Alaska Native Heritage Center; Exit Glacier, Kenai Fjords National Park; Alyeska Aerial Tram; Denali sled dog demonstrations; University of Alaska Museum of the North; Mendenhall Glacier Visitor Center; Tony Knowles Coastal Trail; Pioneer Park; Santa Claus House; Reindeer Farm; Begich, Boggs Visitor Center at Portage Glacier; Anchorage Weekend Downtown Market; Alaska Aviation Museum; Alaska Museum of Science and Nature; Z.J. Loussac Library; Indian Valley Mine; Kincaid Park beach; Eklutna Lake

### us-seattle — Seattle (United States)
Area covered: Seattle (also known as / includes: seattle, pike place, space needle, mount rainier, washington state)

Now in the app: 20 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Ivar's Acres of Clams; The Crab Pot; Lowell's Restaurant; Serious Pie; Din Tai Fung; Elliott's Oyster House; Salty's on Alki Beach; Ray's Cafe; Pike Place Chowder; Beecher's Handmade Cheese; Dick's Drive-In; Seattle Center Armory; Piroshky Piroshky; Top Pot Doughnuts; Molly Moon's Homemade Ice Cream; Starbucks Reserve Roastery; Young's Restaurant; Outsider BBQ; Stoneburner; Paseo (SoDo)

Already in the app — things to do: Woodland Park Zoo; Seattle Aquarium; Pacific Science Center; Seattle Children's Museum; Space Needle; MoPOP, Museum of Pop Culture; The Museum of Flight; Burke Museum of Natural History and Culture; Pike Place Market; Hiram M. Chittenden Locks (Ballard Locks); Chihuly Garden and Glass; Gas Works Park; Discovery Park; Seattle Central Library; Seattle Center Armory; Seattle Pinball Museum; Golden Gardens Park; Seattle Children's Theatre; Alki Beach; Wing Luke Museum
