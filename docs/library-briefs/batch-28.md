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

### fj-islands — Nadi and the Fiji islands (Fiji)
Area covered: Nadi and the Fiji islands (also known as / includes: nadi, denarau, mamanuca, yasawa)

Already in the app — places to eat: Daikoku Restaurant; Nadina Authentic Fijian Restaurant; Cardo's Steakhouse & Cocktail Bar; Indigo Indian Asian Restaurant & Bar; Mama's Pizza; The Boatshed Restaurant & Sunset Bar; Dick's Place Bistro & Bar; Nadi Municipal Market; Suva Municipal Market; Tappoo City Food Court; Bulaccino; Taste Fiji Kitchen; The Corner Cafe

Already in the app — things to do: Garden of the Sleeping Giant; Kula Wild Adventure Park; Sabeto Mud Pool and Hot Springs; Captain Cook Cruises island day sail; Nadi Handicraft Market; Nadi Municipal Market; Wailoaloa Beach; Natadola Beach; Fiji Museum; Sigatoka Sand Dunes National Park; South Sea Island day trip

### fr-montstmichel — Mont-Saint-Michel (France)
Area covered: Mont-Saint-Michel (also known as / includes: mont-saint-michel, mont saint michel, normandy, normandie)

Already in the app — places to eat: La Mère Poulard; Les Terrasses Poulard; Crêperie La Sirène; Le Mouton Blanc; Auberge Saint-Pierre; Le Pré Salé; La Ferme Saint-Michel; Le Relais Saint-Michel; Breizh Café Cancale; Crêperie Le Corps de Garde; Brioche Dorée Mont-Saint-Michel; Marché aux Huîtres de Cancale; Grain de Vanille; Sanchez Artisan Glacier

Already in the app — things to do: Mont-Saint-Michel Abbey / Abbaye du Mont-Saint-Michel; Village of Mont-Saint-Michel and the Grande Rue / Grande Rue, Le Mont-Saint-Michel; Cancale oyster market / Marché aux huîtres de Cancale; Saint-Malo ramparts walk / Remparts de Saint-Malo; Grand Aquarium de Saint-Malo; Écomusée de la Baie du Mont-Saint-Michel; Scriptorial d'Avranches; Guided walk across the bay (Découverte de la Baie); Tombelaine island walk from the Mont; Dinan ramparts and old town; Parc zoologique de la Bourbansais; Bon-Secours beach and sea pool; Sillon beach, Saint-Malo; Fort National, Saint-Malo; Mont-Saint-Michel Historical Museum

### hr-plitvice — Plitvice Lakes (Croatia)
Area covered: Plitvice Lakes (also known as / includes: plitvice, plitvice lakes, kozjak, zagreb)

Already in the app — places to eat: Lička Kuća; Restaurant Poljana; Restaurant Degenija; Restoran Macola; Bistro Vila Velebita; Fenomen Plitvice; Restaurant Jezero; Bistro & Caffe Plum; Pod Rastočkim Krovom; Kozjačka Draga; Bistro Labudovac; Caffe Bar Flora; Kozjak Caffe & Pastry

Already in the app — things to do: Plitvice Lakes National Park / Nacionalni park Plitvička jezera; Plitvice Lower Lakes and the Kozjak boat; Rastoke, Slunj / Slunjske Rastoke; Nikola Tesla Memorial Centre / Memorijalni centar Nikola Tesla; Plitvice Upper Lakes route; Aquatika Freshwater Aquarium; Grabovača Cave Park; Barać Caves

### jo-petra — Petra, Wadi Rum and the Dead Sea (Jordan)
Area covered: Petra, Wadi Rum and the Dead Sea (also known as / includes: petra, wadi rum, wadi musa, dead sea)

Already in the app — places to eat: My Mom's Recipe Restaurant; Al-Wadi Restaurant; Red Cave Restaurant; Al Qantarah; The Basin Restaurant; Panorama Restaurant; Al Saraya Restaurant; Luigi's; Rum Gate Restaurant; Al Baraka Tea Room; Sanabel Bakery

Already in the app — things to do: Petra Archaeological Park / البتراء; Little Petra (Siq al-Barid) / سيق البارد; Petra Kitchen cooking workshop; Wadi Rum Protected Area / وادي رم; Amman Beach, Dead Sea / شاطئ عمان السياحي; Petra by Night; Petra Museum; Beidha Neolithic village; Aqaba Aquarium (Marine Science Station); Saraya Aqaba Waterpark; Dead Sea Panorama Museum; Shobak Castle; Dana Biosphere Reserve
