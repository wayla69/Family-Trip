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

### fr-nice — Nice and the Riviera (France)
Area covered: Nice and the Riviera (also known as / includes: cote d'azur, riviera, monaco, monte carlo)

Already in the app — places to eat: Chez Pipo; Chez Acchiardo; Le Safari; Le Café de Turin; La Favola; La Pizza Cresci; Aux Bons Enfants; Café de Paris Monte-Carlo; Lou Pilha Leva; Chez René Socca; Marché du Cours Saleya; Marché Forville; Marché Provençal d'Antibes; Fenocchio; Pâtisserie LAC; Maison Auer

Already in the app — things to do: Parc Phoenix; Castle Hill park and waterfall / Parc de la Colline du Château; Promenade du Paillon and Albert I garden / Promenade du Paillon, Jardin Albert 1er; Nice public beaches / Plages publiques de Nice; Cours Saleya flower and food market / Marché du Cours Saleya; Matisse Museum / Musée Matisse; Marc Chagall National Museum / Musée national Marc Chagall; Villa Masséna museum and garden / Villa Masséna, musée d'art et d'histoire; Jules Chéret Fine Arts Museum / Musée des Beaux-Arts Jules Chéret; Exotic Garden of Èze / Jardin Exotique d'Èze; Oceanographic Museum of Monaco / Musée océanographique de Monaco; Villa Ephrussi de Rothschild; Picasso Museum Antibes / Musée Picasso, Antibes; Nice tourist little train; Cimiez Archaeological Museum and Roman ruins

### fr-provence — Provence (France)
Area covered: Provence (also known as / includes: provence, avignon, arles, gordes)

Already in the app — places to eat: La Fourchette; L'Épicerie de Ginette; Chez Féraud; Chez Etienne; Chez Sauveur; Toinou Les Fruits de Mer; Les Halles d'Avignon; Marché de la place Richelme; Maison Weibel; Maison Béchard; Le Four des Navettes; Café de France

Already in the app — things to do: Pont du Gard; Carrières de Lumières; Château des Baux; Palais des Papes / Palais des Papes; Parc Spirou Provence; Ochre Trail / Sentier des Ocres; Arles Amphitheatre / Arènes d'Arles; Lavender Museum / Musée de la Lavande; Aix-en-Provence fruit and vegetable market; Château d'If; MuCEM / Mucem; Marseille Natural History Museum / Muséum d'histoire naturelle; Parc Borély; Roman Theatre of Orange / Théâtre antique d'Orange; L'Isle-sur-la-Sorgue market

### fr-strasbourg — Strasbourg and Colmar (France)
Area covered: Strasbourg and Colmar (also known as / includes: strasbourg, colmar, alsace, petite france)

Already in the app — places to eat: Maison Kammerzell; Au Pont Saint-Martin; La Corde à Linge; Flam's; L'Ancienne Douane; Chez Yvonne; Wistub Brenner; Schwendi Bier- und Wistub; Au Koïfhus; Poulaillon; Marché Couvert de Colmar; Pâtisserie Christian; Pâtisserie Naegel; Jadis et Gourmande

Already in the app — things to do: Parc de l'Orangerie and the storks / Parc de l'Orangerie; Le Vaisseau science centre; Zoological Museum / Musée zoologique de Strasbourg; Museum of Fine Arts, Palais Rohan / Musée des Beaux-Arts, Palais Rohan; Museum of Modern and Contemporary Art / MAMCS, Musée d'Art moderne et contemporain; Barrage Vauban and the Petite France views / Barrage Vauban; Batorama boat trip; Jardin des Deux Rives and the Mimram footbridge / Jardin des Deux Rives; Haut-Kœnigsbourg Castle / Château du Haut-Kœnigsbourg; Strasbourg Christmas market (Christkindelsmärik); Montagne des Singes; Volerie des Aigles; Colmar Petite Venise and boat ride; Europa-Park; Musée Tomi Ungerer; Strasbourg Cathedral and its astronomical clock / Cathédrale Notre-Dame de Strasbourg; Strasbourg Cathedral platform climb / Plateforme de la cathédrale de Strasbourg

### gb-cotswolds — The Cotswolds (United Kingdom)
Area covered: The Cotswolds (also known as / includes: cotswolds, bibury, bourton-on-the-water, castle combe)

Already in the app — places to eat: The Kingsbridge Inn; The Mousetrap Inn; The Swan Hotel Brasserie; The Catherine Wheel; The Angel at Burford; The Porch House; The Queen's Head; The Eight Bells; The Castle Inn; Bibury Trout Farm; Russell's Fish & Chips; The Ox Shed at Cotswold Farm Park; Huffkins; Bakery on the Water; Lucy's Tearoom; Tisanes Tea Rooms

Already in the app — things to do: Cotswold Wildlife Park and Gardens; Birdland Park and Gardens; The Model Village, Bourton-on-the-Water; Cotswold Farm Park; Blenheim Palace, Park and Gardens; Corinium Museum; WWT Slimbridge Wetland Centre; Batsford Arboretum; Broadway Tower; Bibury Trout Farm; The Wilson, Cheltenham Art Gallery and Museum; National Waterways Museum Gloucester; Oxford University Museum of Natural History; Cotswold Motoring Museum and Toy Collection; Cirencester Charter Market; Pittville Park play area
