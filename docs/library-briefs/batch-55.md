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

### bt-paro — Paro, Thimphu and Punakha (Bhutan)
Area covered: Paro, Thimphu and Punakha (also known as / includes: paro, thimphu, punakha, tiger's nest, taktsang, dochula)

Now in the app: 14 places to eat, 9 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Sonam Trophel Restaurant; My Kind of Place; Folk Heritage Museum Restaurant; Babesa Village Restaurant; Cloud 9; Chimi Lhakhang Cafeteria; Phuenzhi Diner; Zombala 2; Druk Wangyel Cafe; Mountain Cafe; Champaca Cafe; Brioche Cafe; Ambient Cafe; Karma's Coffee

Already in the app — things to do: National Museum of Bhutan / རྒྱལ་ཡོངས་ཡིག་ཚགས་; Rinpung Dzong and the covered bridge / རིན་སྤུངས་རྫོང་; Motithang Takin Preserve; Folk Heritage Museum; Centenary Farmers Market; Punakha Suspension Bridge; Kyichu Lhakhang; Drukgyel Dzong ruins; Tiger's Nest hike / Paro Taktsang

### hr-plitvice — Plitvice Lakes (Croatia)
Area covered: Plitvice Lakes (also known as / includes: plitvice, plitvice lakes, kozjak, zagreb)

Now in the app: 14 places to eat, 9 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Lička Kuća; Restaurant Poljana; Restaurant Degenija; Restoran Macola; Bistro Vila Velebita; Fenomen Plitvice; Restaurant Jezero; Bistro & Caffe Plum; Pod Rastočkim Krovom; Kozjačka Draga; Bistro Labudovac; Caffe Bar Flora; Kozjak Caffe & Pastry; Camping Plitvice restaurant

Already in the app — things to do: Plitvice Lakes National Park / Nacionalni park Plitvička jezera; Plitvice Lower Lakes and the Kozjak boat; Rastoke, Slunj / Slunjske Rastoke; Nikola Tesla Memorial Centre / Memorijalni centar Nikola Tesla; Plitvice Upper Lakes route; Aquatika Freshwater Aquarium; Grabovača Cave Park; Barać Caves; The Great Waterfall / Veliki slap

### id-komodo — Labuan Bajo and Komodo (Indonesia)
Area covered: Labuan Bajo and Komodo (also known as / includes: labuan bajo, padar, komodo national park, komodo island, rinca, wae rebo)

Now in the app: 12 places to eat, 11 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: MadeInItaly Ristorante Italiano; La Cucina; Happy Banana Komodo; De Waroeng; Artomoro Restaurant; Bajo Bay Fisherman's Club; Kampung Ujung Night Market; Bajo Bakery; Carpenter Cafe & Roastery; Cafe in Hit; Cafe Melinjo; Pondok Mai Ceng'go Labuan Bajo

Already in the app — things to do: Rinca Island, Komodo National Park; Komodo Island; Kelor Island; Kanawa Island; Batu Cermin cave; Sylvia Hill; Puncak Waringin viewpoint; Kampung Ujung waterfront food stalls; Padar Island viewpoint; Cunca Wulang canyon; Pink Beach

### jo-petra — Petra, Wadi Rum and the Dead Sea (Jordan)
Area covered: Petra, Wadi Rum and the Dead Sea (also known as / includes: petra, wadi rum, wadi musa, dead sea, aqaba, jerash)

Now in the app: 11 places to eat, 13 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: My Mom's Recipe Restaurant; Al-Wadi Restaurant; Red Cave Restaurant; Al Qantarah; The Basin Restaurant; Panorama Restaurant; Al Saraya Restaurant; Luigi's; Rum Gate Restaurant; Al Baraka Tea Room; Sanabel Bakery

Already in the app — things to do: Petra Archaeological Park / البتراء; Little Petra (Siq al-Barid) / سيق البارد; Petra Kitchen cooking workshop; Wadi Rum Protected Area / وادي رم; Amman Beach, Dead Sea / شاطئ عمان السياحي; Petra by Night; Petra Museum; Beidha Neolithic village; Aqaba Aquarium (Marine Science Station); Saraya Aqaba Waterpark; Dead Sea Panorama Museum; Shobak Castle; Dana Biosphere Reserve
