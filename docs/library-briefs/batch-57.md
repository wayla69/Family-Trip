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

### hu-budapest — Budapest (Hungary)
Area covered: Budapest (also known as / includes: budapest, danube, szechenyi, chain bridge)

Now in the app: 43 places to eat, 28 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Menza; Gettó Gulyás; Paprika Vendéglő; VakVarjú Étterem; Kéhli Vendéglő; Náncsi Néni Vendéglője; Pest-Buda Bistro; Frici Papa Kifőzdéje; Trófea Grill Étterem; Nagyvásárcsarnok; Karaván; Retró Lángos Büfé; Gerbeaud; Ruszwurm Cukrászda; Gelarto Rosa; Molnár's Kürtőskalács; Retek Bisztro; Sugar!; Napfényes Étterem; VakVarjú Újlipótváros; VakVarjú Kiscelli; Városliget Café; Riso Ristorante; IDE Pizzeria; Pastrami; Hold Street Market; Kispiac Bisztró; Fekete Kávézó; Spíler Buda; David's Kitchen; Kőleves Vendéglő; STIKA Budapest; The Spot Budapest; Arán Bakery; New York Café; Artizán; Freyja; Läget Peterjon; Első Pesti Rétesház; VAJ; Riso Ristorante & Terrace; Cafe Brunch (Bazilika); Brunch Bistro

Already in the app — things to do: Budapest Zoo and Botanical Garden / Budapesti Állat- és Növénykert; Tropicarium Budapest / Tropicarium-Óceanárium; Palace of Wonders / Csodák Palotája; Hungarian Railway History Park; Great Market Hall / Nagyvásárcsarnok; Palatinus Strand on Margaret Island; Margaret Island and the Musical Fountain / Margitsziget; City Park Main Playground / Városligeti Nagyjátszótér; Budapest Children's Railway / Gyermekvasút; Zugliget Chairlift / Libegő; Buda Castle Funicular / Budavári Sikló; Fisherman's Bastion / Halászbástya; City Park Ice Rink / Városligeti Műjégpálya; Hungarian Open Air Museum (Skanzen) / Szabadtéri Néprajzi Múzeum; Hungarian Natural History Museum / Magyar Természettudományi Múzeum; Pinball Museum; Szamos Chocolate Museum; Hungarian National Museum; Pál-völgyi Cave; Szemlő-hegyi Cave; Buda Castle Labyrinth; Cat Museum; Minipolisz; KockaPark; Aquaworld Resort; House of Houdini; WestEnd City Center; Aquaworld Budapest

### nz-queenstown — Queenstown, Wānaka and Milford Sound (New Zealand)
Area covered: Queenstown, Wānaka and Milford Sound (also known as / includes: queenstown, milford sound, wanaka, arrowtown, fiordland, tekapo)

Now in the app: 30 places to eat, 40 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: The Cow; Flame Bar & Grill; Stratosfare Restaurant & Bar; Public Kitchen & Bar; Big Fig; Francesca's Italian Kitchen; Kai Whakapai; Pio Pio Restaurant; The Fat Duck; Fergburger; Erik's Fish and Chips; Miles Better Pies; Patagonia Chocolates; Mrs Ferg Gelateria; Provisions of Arrowtown; Black Peak Gelato; Amisfield Restaurant and Cellar; Mora Wines and Artisan Kitchen; Rātā; Blue Kanu; Swiftsure; Billy's; The Shed Arrowtown; Boat Shed Bakery; Winnies Gourmet Pizza Bar; Joe’s Garage; The Boat Shed Café & Bistro; The Fork & Tap; Slow Cuts; True South Dining Room

Already in the app — things to do: Skyline Gondola and Luge; Kiwi Park Queenstown; TSS Earnslaw and Walter Peak Farm; Queenstown Gardens; Queenstown Ice Arena; Alpine Aqualand; Queenstown Market; Remarkables Market; Shotover Jet; Arrowtown Chinese Settlement; Lakes District Museum; Putt 'n' Glow Mini Golf; Million Dollar Cruise; Lake Hayes Walkway; Ziptrek Ecotours; Onsen Hot Pools; Game Over; Bathhouse Playground; Frankton Arm Walkway; St Omer Park; Bayview Reserve; Jack Reid Park; SITE Trampoline; Thrillzone; Odyssey Sensory Maze; Hydro Attack; Ben Lomond Saddle; Ben Lomond Track; The Remarkables; Wakatipu Playcentre; Rose Douglas Park; McBride Park; Wānaka Lavender Farm; Puzzling World; National Transport & Toy Museum; Bike Glendhu; Kind Farm Animal Sanctuary; Kawarau Zipride; Glenorchy Animal Experience; Coronet Peak
