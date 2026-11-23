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

### be-brussels — Brussels (Belgium)
Area covered: Brussels (also known as / includes: brussels, bruxelles, brussel, grand-place)

Already in the app — places to eat: Chez Léon; Aux Armes de Bruxelles; 't Kelderke; Fin de Siècle; Restaurant Vincent; La Roue d'Or; Amadeo; Le Chou de Bruxelles; La Quincaillerie; Maison Antoine; Fritland; Noordzee - Mer du Nord; Wolf; Maison Dandoy; Wittamer; Gaston

Already in the app — things to do: Atomium; Mini-Europe; Train World; Museum of Natural Sciences / Muséum des Sciences naturelles; Belgian Comic Strip Center / Centre belge de la Bande dessinée; Autoworld; Musée des Enfants / Le Musée des Enfants; Musical Instruments Museum / MIM; Choco-Story Brussels; Brussels Tram Museum / Musée du Transport urbain bruxellois; Grand Place and Manneken Pis / Grand-Place; Winter Wonders Christmas market / Plaisirs d'Hiver; Place du Jeu de Balle flea market / Vieux Marché; AfricaMuseum; Brussels Planetarium

### br-rio — Rio de Janeiro (Brazil)
Area covered: Rio de Janeiro (also known as / includes: rio de janeiro, copacabana, ipanema, sugarloaf)

Already in the app — places to eat: Churrascaria Palace; Fogo de Chão; Garota de Ipanema; Casa da Feijoada; Galeto Sat's; Cervantes; Aprazível; Bar do Mineiro; Bibi Sucos; Polis Sucos; Confeitaria Colombo; Mil Frutas; Sorvete Itália

Already in the app — things to do: Christ the Redeemer / Cristo Redentor; Sugarloaf Mountain cable car / Parque Bondinho Pão de Açúcar; AquaRio; Museum of Tomorrow / Museu do Amanhã; BioParque do Rio (Rio zoo); Rio Botanical Garden / Jardim Botânico do Rio de Janeiro; Parque Lage; Flamengo Park / Aterro do Flamengo; São Cristóvão Fair / Feira de São Cristóvão; Tijuca National Park (Cascatinha Taunay); Leme and Copacabana beach (calm stretch); Quinta da Boa Vista park; Lagoa Rodrigo de Freitas; Selarón Steps / Escadaria Selarón; Rio Planetarium (Museum of the Universe)

### ca-banff — Banff (Canada)
Area covered: Banff (also known as / includes: banff, lake louise, moraine lake, jasper)

Already in the app — places to eat: The Old Spaghetti Factory; Melissa's Missteak; The Grizzly House; The Maple Leaf; Bear Street Tavern; Balkan Restaurant; Lake Louise Railway Station & Restaurant; Bill Peyto's Cafe; Rocky Mountain Flatbread Co.; Trailhead Café; Laggan's Mountain Bakery & Delicatessen; Rocky Mountain Bagel Co.; Wild Flour Bakery; BeaverTails; COWS Banff

Already in the app — things to do: Banff Gondola; Banff Upper Hot Springs; Lake Louise lakeshore; Moraine Lake; Lake Louise Summer Gondola; Banff Park Museum National Historic Site; Cave and Basin National Historic Site; Whyte Museum of the Canadian Rockies; Lake Minnewanka Cruise; Johnston Canyon Lower Falls; Canmore Museum and Geoscience Centre; Elevation Place; Canmore Nordic Centre Provincial Park; Quarry Lake Park; Grassi Lakes Interpretive Trail

### ca-toronto — Toronto and Niagara (Canada)
Area covered: Toronto and Niagara (also known as / includes: toronto, niagara, niagara falls, cn tower)

Already in the app — places to eat: The Old Spaghetti Factory; Pizzeria Libretto; Terroni; Mother's Dumplings; Fran's Restaurant; Pai Northern Thai Kitchen; 360 The Restaurant at the CN Tower; Table Rock House Restaurant; Rainforest Cafe; St. Lawrence Market; Urban Eatery; Banh Mi Boys; Bang Bang Ice Cream & Bakery; SOMA Chocolatemaker; COWS Niagara-on-the-Lake; BeaverTails

Already in the app — things to do: Ripley's Aquarium of Canada; Toronto Zoo; Royal Ontario Museum; CN Tower; Casa Loma; Toronto Island ferry; Centreville Amusement Park; St. Lawrence Market; Riverdale Farm; High Park Animal Display; Art Gallery of Ontario; Harbourfront Centre; Niagara City Cruises boat ride; Niagara Parks Butterfly Conservatory; Bird Kingdom; Niagara Takes Flight
