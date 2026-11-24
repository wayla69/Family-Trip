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

### lk-hills — Kandy, Ella and Sigiriya (Sri Lanka)
Area covered: Kandy, Ella and Sigiriya (also known as / includes: kandy, nuwara eliya, sigiriya, dambulla, pinnawala, yala)

Now in the app: 17 places to eat, 14 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: The Empire Cafe; Balaji Dosai; Kandy Muslim Hotel; Sharon Inn; Devon Restaurant; Cafe Chill; Matey Hut; AK Ristoro; Grand Indian; Chooti Restaurant; Kandy City Centre Food Court; Hela Bojun Hala; Downtown Rotti Hut; Natural Coffee; Cafe Secret Alley; The Grand Café; Honey Pot Restaurant

Already in the app — things to do: Sigiriya Rock Fortress / සීගිරිය; Pinnawala Elephant Orphanage / පින්නවල අලි අනාථ නිවාසය; Royal Botanic Gardens, Peradeniya / පේරාදෙණිය රාජකීය උද්භිද උද්‍යානය; Ceylon Tea Museum; Nine Arch Bridge viewpoint / නවඅට පාලම; Hurulu Eco Park jeep safari; Udawalawe Elephant Transit Home / උඩවලව අලි පැටවුන් සම්බන්ධ කිරීමේ මධ්‍යස්ථානය; Kandyan dance show; Hakgala Botanic Gardens; Little Adam's Peak; Ravana Falls; Dambulla Cave Temple; Pidurangala Rock; Horton Plains National Park

### my-langkawi — Langkawi (Malaysia)
Area covered: Langkawi (also known as / includes: langkawi, pantai cenang, sky bridge, kilim)

Now in the app: 13 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Wonderland Food Store / 旺得隆海鲜; Orkid Ria Seafood Restaurant; Restoran Siti Fatimah; Scarborough Fish 'n Chips; Red Tomato; The Cliff Restaurant & Bar; Nasi Dagang Pak Malau; Kak Yan Nasi Campur; Laksa Ikan Sekoq; Kuah Night Market; Temoyong Night Market; Smiling Buffalo Cafe; MY French Factory

Already in the app — things to do: Langkawi SkyCab and Sky Bridge; Underwater World Langkawi; Langkawi Wildlife Park; Crocodile Adventureland; Langkawi 3D Art Museum; Laman Padi rice museum; Kilim mangrove boat tour; Pantai Cenang beach; Kuah night market; Oriental Village; Telaga Tujuh waterfall; Eagle Square; Langkawi Craft Complex / Kompleks Kraf Langkawi; Splash Out Langkawi; Maha Tower; Makam Mahsuri (Mahsuri's Tomb); Dream Forest Langkawi; Perdana Marine Park

### be-bruges — Bruges (Belgium)
Area covered: Bruges (also known as / includes: bruges, brugge, ghent, gent)

Now in the app: 14 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Poules Moules; De Vlaamsche Pot; Cambrinus; Breydel De Coninc; Ribs 'n Beer; De Halve Maan; 't Huidevettershuis; Bocca; Soup; Chez Albert; The Old Chocolate House; Da Vinci; Tearoom De Proeverie; Jacobin

Already in the app — things to do: Boudewijn Seapark; Historium Bruges; Choco-Story, the Chocolate Museum; Frietmuseum; Bruges canal boat tour; Belfry of Bruges / Belfort; Groeninge Museum; Winter Glow Christmas market; Bruges Winter Glow ice rink; Begijnhof and Minnewater / Begijnhof / Minnewater; Kruisvest windmills and ramparts; Sint-Janshuismolen windmill; Astridpark playground; Sea Life Blankenberge; Diamond Museum Bruges; Volkskundemuseum (Folklore Museum) / Volkskundemuseum; Gruuthusemuseum; Sint-Janshospitaal

### fj-islands — Nadi and the Fiji islands (Fiji)
Area covered: Nadi and the Fiji islands (also known as / includes: nadi, denarau, mamanuca, yasawa, coral coast, natadola)

Now in the app: 18 places to eat, 14 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Daikoku Restaurant; Nadina Authentic Fijian Restaurant; Cardo's Steakhouse & Cocktail Bar; Indigo Indian Asian Restaurant & Bar; Mama's Pizza; The Boatshed Restaurant & Sunset Bar; Dick's Place Bistro & Bar; Nadi Municipal Market; Suva Municipal Market; Tappoo City Food Court; Bulaccino; The Corner Cafe; Isa Lei; The Curry House; Zigzag Cafe; The Coffee Hub (Nadi); Sentai Seafood Restaurant; Mamacita

Already in the app — things to do: Garden of the Sleeping Giant; Kula Wild Adventure Park; Sabeto Mud Pool and Hot Springs; Captain Cook Cruises island day sail; Nadi Handicraft Market; Nadi Municipal Market; Wailoaloa Beach; Natadola Beach; Fiji Museum; Sigatoka Sand Dunes National Park; South Sea Island day trip; Sri Siva Subramaniya Temple; Big Bula Waterpark; Namaka market / Namaka Farmers Market
