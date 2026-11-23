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

### us-hawaii — Hawaii (The United States)
Area covered: Hawaii (also known as / includes: hawaii, honolulu, oahu, waikiki)

Already in the app — places to eat: Duke's Waikiki; Hula Grill Waikiki; Eggs 'n Things; Helena's Hawaiian Food; Paia Fish Market; Ken's House of Pancakes; Marukame Udon Waikiki; Rainbow Drive-In; Giovanni's Shrimp Truck; Leonard's Bakery; Matsumoto Shave Ice; Island Vintage Coffee; Ululani's Hawaiian Shave Ice

Already in the app — things to do: Honolulu Zoo; Waikiki Aquarium; Hawaii Children's Discovery Center; Bishop Museum; Sea Life Park Hawaii; Hanauma Bay Nature Preserve; Kapiolani Park; Diamond Head State Monument; Polynesian Cultural Center; Kualoa Ranch Jungle Expedition; Dole Plantation; Maui Ocean Center; Haleakalā National Park; Hawaiʻi Volcanoes National Park; Pana'ewa Rainforest Zoo and Gardens; Kīlauea Point National Wildlife Refuge; Lydgate Beach Park and Kamalani Playground

### us-seattle — Seattle (The United States)
Area covered: Seattle (also known as / includes: seattle, pike place, space needle, mount rainier)

Already in the app — places to eat: Ivar's Acres of Clams; The Crab Pot; Lowell's Restaurant; Serious Pie; Din Tai Fung; Elliott's Oyster House; Salty's on Alki Beach; Ray's Cafe; Pike Place Chowder; Beecher's Handmade Cheese; Dick's Drive-In; Seattle Center Armory; Piroshky Piroshky; Top Pot Doughnuts; Molly Moon's Homemade Ice Cream; Starbucks Reserve Roastery

Already in the app — things to do: Woodland Park Zoo; Seattle Aquarium; Pacific Science Center; Seattle Children's Museum; Space Needle; MoPOP, Museum of Pop Culture; The Museum of Flight; Burke Museum of Natural History and Culture; Pike Place Market; Hiram M. Chittenden Locks (Ballard Locks); Chihuly Garden and Glass; Gas Works Park; Discovery Park; Seattle Central Library; Seattle Center Armory

### us-southwest — Grand Canyon and Las Vegas (The United States)
Area covered: Grand Canyon and Las Vegas (also known as / includes: grand canyon, las vegas, vegas, arizona)

Already in the app — places to eat: Hash House A Go Go; Bacchanal Buffet; The Buffet at Wynn; Grand Lux Cafe; Rainforest Cafe; Lotus of Siam; El Tovar Dining Room; Plaza Bonita; We Cook Pizza & Pasta; Maswik Food Court; In-N-Out Burger; Eataly Las Vegas; Ghirardelli Ice Cream & Chocolate Shop; Bellagio Patisserie; Hershey's Chocolate World

Already in the app — things to do: Grand Canyon National Park, South Rim; Grand Canyon Railway; Horseshoe Bend; Lowell Observatory; Hoover Dam; Red Rock Canyon Scenic Drive; Valley of Fire State Park; Shark Reef Aquarium; Discovery Children's Museum; Springs Preserve; Las Vegas Natural History Museum; Adventuredome; Bellagio Conservatory and Botanical Gardens; Fountains of Bellagio; Flamingo Wildlife Habitat

### uz-tashkent — Tashkent and the Chimgan mountains (Uzbekistan)
Area covered: Tashkent and the Chimgan mountains (also known as / includes: tashkent, chimgan, charvak, chorvoq)

Already in the app — places to eat: Besh Qozon / Besh Qozon; Caravan / Caravan; Afsona / Afsona; Sim-Sim / Sim-Sim; Rayhon / Rayhon Milliy Taomlar; Jumanji / Jumanji; Bibigon / Бибигон; Gruzinskiy Dvorik / Грузинский дворик; Shashleek; Chorsu Bazaar / Chorsu bozori; Alay Bazaar / Oloy bozori; Milliy Taomlar (National Food) / Milliy Taomlar; Bon! / Bon!; Breadly / Breadly; Safia

Already in the app — things to do: Magic City park / Magic City; Magic Safari / Magic Safari; Tashkent Zoo / Toshkent hayvonot bogʻi; Japanese Garden / Yapon bogʻi; Chorsu Bazaar / Chorsu bozori; Tashkent TV Tower / Toshkent teleminorasi; Center of Islamic Civilization museum / Islom sivilizatsiyasi markazi; Tashkent metro stations / Toshkent metropoliteni; Amir Temur Square / Amir Temur xiyoboni; Tashkent City Park / Tashkent City; Ice City rink / Ice City; Beldersay cable car, Chimgan / Beldersoy; Charvak reservoir / Chorvoq suv ombori; Dino Park at Tashkent Zoo / Dino Park; Uzbek National Puppet Theatre / Ўзбек миллий қўғирчоқ театри; Sky Park, Tashkent City Mall; Hello Park interactive play; Tashkent Planetarium
