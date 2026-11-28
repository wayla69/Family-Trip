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

### p-neuschwanstein — Neuschwanstein (Germany)
Area covered: Neuschwanstein (also known as / includes: neuschwanstein, hohenschwangau, fussen, schwangau)

Already in the app — places to eat: Schlossrestaurant Neuschwanstein; Alpenrose am See; Restaurant Café Kainz; Schlossbrauhaus Schwangau; Restaurant Ritterstub'n; Gasthof zum Schwanen; Altstadthotel Zum Hechten; Gasthof Krone; Il Pescatore; Schloss Bräustüberl Hohenschwangau; Tegelberghaus; Eiscafé Hohes Schloss; Konditorei Kurcafé

Already in the app — things to do: Neuschwanstein Castle / Schloss Neuschwanstein; Hohenschwangau Castle / Schloss Hohenschwangau; Museum of the Bavarian Kings / Museum der bayerischen Könige; Marienbrücke and Pöllat Gorge / Marienbrücke, Pöllatschlucht; Alpsee Bathing Spot and Boat House / Alpseebad, Alpsee Bootshaus; Tegelberg Summer Toboggan Run / Sommerrodelbahn Tegelberg; Königliche Kristall-Therme / Königliche Kristall-Therme Schwangau; Linderhof Palace / Schloss Linderhof; Highline179 Suspension Bridge / highline179; Füssen City Museum in St Mang Monastery / Museum der Stadt Füssen; High Castle Füssen / Hohes Schloss Füssen; Lech Falls / Lechfall; Füssen Forest Centre Treetop Path / Walderlebniszentrum Füssen-Ziegelwies, Baumkronenweg; Forggensee Boat Trips / Forggensee-Schifffahrt; Waldwelt Skywalk Allgäu / Waldwelt Skywalk Allgäu

### p-yellowstone — Yellowstone (The United States)
Area covered: Yellowstone (also known as / includes: yellowstone, old faithful, grand prismatic, grand teton)

Already in the app — places to eat: Old Faithful Inn Dining Room; Obsidian Dining Room; Lake Yellowstone Hotel Dining Room; Mammoth Hotel Dining Room; Roosevelt Lodge Dining Room; Running Bear Pancake House; Yellowstone Pizza Company; Bubba's Bar-B-Que; Old Faithful Lodge Cafeteria; Canyon Lodge Eatery; The Corral; Old Faithful Lodge Bake Shop; Persephone Bakery; Moo's Gourmet Ice Cream; The Bunnery Bakery & Restaurant

Already in the app — things to do: Old Faithful and the Upper Geyser Basin; Old Faithful Visitor Education Center; Midway Geyser Basin and Grand Prismatic Spring; Fountain Paint Pot and Lower Geyser Basin; Mammoth Hot Springs Terraces; Albright Visitor Center and Museum; Grand Canyon of the Yellowstone; Mud Volcano and Dragon's Mouth Spring; Norris Geyser Basin and Museum; West Thumb Geyser Basin; Lamar Valley wildlife watching; Hayden Valley wildlife watching; Firehole Canyon swimming area; Grizzly and Wolf Discovery Center; Museum of the Yellowstone

### pe-cusco — Cusco, Machu Picchu and Titicaca (Peru)
Area covered: Cusco, Machu Picchu and Titicaca (also known as / includes: cusco, cuzco, machu picchu, sacred valley)

Already in the app — places to eat: Pachapapa; Morena Peruvian Kitchen; Inka Grill; Jack's Café; Chicha por Gastón Acurio; Indio Feliz; Tunupa Valle Sagrado; Mercado Central de San Pedro; Horno Colonial San Francisco; La Boulangerie de Paris; Qucharitas; ChocoMuseo

Already in the app — things to do: Machu Picchu / Llaqta de Machu Picchu; Sacsayhuamán; Moray terraces; Maras salt pans / Salineras de Maras; Pisac ruins / Parque Arqueológico de Pisaq; Pisac market; Ollantaytambo ruins; Awana Kancha alpaca centre; San Pedro Market / Mercado Central de San Pedro; Machu Picchu Museum (Casa Concha); Cusco Planetarium; ChocoMuseo Cusco; Plaza de Armas, Cusco; San Blas viewpoint; Cristo Blanco

### us-alaska — Alaska (The United States)
Area covered: Alaska (also known as / includes: alaska, anchorage, juneau, denali)

Already in the app — places to eat: Moose's Tooth Pub & Pizzeria; Snow City Cafe; Glacier Brewhouse; Gwennie's Old Alaska Restaurant; Ray's Waterfront; Denali Park Salmon Bake; Mountain High Pizza Pie; The Hangar on the Wharf; The Cookie Jar; Tracy's King Crab Shack; Morino Grill; Wild Scoops; Talkeetna Roadhouse; The Bake Shop; Hot Licks Homemade Ice Cream

Already in the app — things to do: Alaska SeaLife Center; Alaska Wildlife Conservation Center; Anchorage Museum; The Alaska Zoo; Alaska Native Heritage Center; Exit Glacier, Kenai Fjords National Park; Alyeska Aerial Tram; Denali sled dog demonstrations; University of Alaska Museum of the North; Mendenhall Glacier Visitor Center; Tony Knowles Coastal Trail; Pioneer Park; Santa Claus House; Reindeer Farm; Begich, Boggs Visitor Center at Portage Glacier; Anchorage Weekend Downtown Market
