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

### ch-interlaken — Interlaken & the Jungfrau (Switzerland)
Area covered: Interlaken & the Jungfrau (also known as / includes: interlaken, jungfrau, jungfraujoch, grindelwald, lauterbrunnen, wengen)

Now in the app: 16 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Restaurant Taverne; Hüsi Bierhaus; Restaurant Bären Unterseen; Restaurant Laterne; Pizzeria Piz Paz; Harder Kulm Panorama Restaurant; Barry's Restaurant; Bergrestaurant Kleine Scheidegg; Hotel Oberland Restaurant; Migros Restaurant Interlaken; Coop Restaurant Interlaken Ost; Aletsch Self; Grand Café Restaurant Schuh; Funky Chocolate Club; Airtime Café; C und M Café Bar Restaurant

Already in the app — things to do: Jungfraujoch – Top of Europe; Harder Kulm; Alpine Wildlife Park Interlaken; Thun Castle (Schloss Thun); BLS winter boat on Lake Thun; Staubbach Falls, Lauterbrunnen; Männlichen children's area; Schilthorn – Piz Gloria; Trümmelbach Falls; Grindelwald First; St. Beatus Caves; Aare Gorge; Ballenberg Open-Air Museum; Schynige Platte; Brienz Rothorn Railway; Giessbach Falls / Giessbachfälle; Höhematte; Blausee / Naturpark Blausee; Spiez Castle / Schloss Spiez; Oberhofen Castle / Schloss Oberhofen; Sigriswil Panorama Bridge / Panoramabrücke Sigriswil; Allmendhubel; Oeschinensee; Grindelwald Glacier Gorge / Gletscherschlucht Grindelwald; Reichenbach Falls / Reichenbachfall; Niesen

### de-heidelberg — Heidelberg and the Black Forest (Germany)
Area covered: Heidelberg and the Black Forest (also known as / includes: heidelberg, black forest, schwarzwald, titisee, triberg, freiburg)

Now in the app: 16 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Vetter's Alt Heidelberger Brauhaus; Kulturbrauerei Heidelberg; Zum Güldenen Schaf; Zum Roten Ochsen; Hausbrauerei Feierling; Zum Roten Bären; Ganter Brauereiausschank; Löwenbräu Baden-Baden; Hofgut Sternen; Brauereigasthof Rothaus; Markthalle Freiburg; Münstermarkt Freiburg; Café Knösel; Café Gundel; Café König; Die Bergstation (Schauinsland)

Already in the app — things to do: Heidelberg Castle / Schloss Heidelberg; Heidelberg Zoo / Zoo Heidelberg; Old Bridge and the Bridge Monkey / Alte Brücke, Brückenaffe; Märchenparadies Königstuhl; Kurpfalz Museum / Kurpfälzisches Museum; Luisenpark Mannheim; Technoseum Mannheim / TECHNOSEUM; Technik Museum Sinsheim / Auto & Technik Museum Sinsheim; Technik Museum Speyer; Europa-Park Winter Season / Europa-Park Rust; Black Forest Open-Air Museum Vogtsbauernhof / Schwarzwälder Freilichtmuseum Vogtsbauernhof; Triberg Waterfalls / Triberger Wasserfälle; Black Forest Treetop Walk / Baumwipfelpfad Schwarzwald; Titisee Lake Cruise / Titisee Seerundfahrt; Mummelsee; Caracalla Spa Baden-Baden / Caracalla Therme; Heidelberger Bergbahn; Königstuhl; Philosophenweg; Mundenhof animal park / Mundenhof Tier-Natur-Erlebnispark; Seepark Freiburg; Schlossberg and its funicular / Schlossbergbahn; Schauinslandbahn; Feldbergbahn; Badeparadies Schwarzwald; Tatzmania Löffingen

### fr-strasbourg — Strasbourg and Colmar (France)
Area covered: Strasbourg and Colmar (also known as / includes: strasbourg, colmar, alsace, petite france, petite venise, riquewihr)

Now in the app: 17 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Maison Kammerzell; Au Pont Saint-Martin; La Corde à Linge; Flam's; L'Ancienne Douane; Chez Yvonne; Wistub Brenner; Schwendi Bier- und Wistub; Au Koïfhus; Poulaillon; Marché Couvert de Colmar; Pâtisserie Christian; Pâtisserie Naegel; Jadis et Gourmande; Lucas & Chris; Caveau Saint-Jean; Le Colbert

Already in the app — things to do: Parc de l'Orangerie and the storks / Parc de l'Orangerie; Le Vaisseau science centre; Zoological Museum / Musée zoologique de Strasbourg; Museum of Fine Arts, Palais Rohan / Musée des Beaux-Arts, Palais Rohan; Museum of Modern and Contemporary Art / MAMCS, Musée d'Art moderne et contemporain; Barrage Vauban and the Petite France views / Barrage Vauban; Batorama boat trip; Jardin des Deux Rives and the Mimram footbridge / Jardin des Deux Rives; Haut-Kœnigsbourg Castle / Château du Haut-Kœnigsbourg; Strasbourg Christmas market (Christkindelsmärik); Montagne des Singes; Volerie des Aigles; Colmar Petite Venise and boat ride; Europa-Park; Musée Tomi Ungerer; Strasbourg Cathedral and its astronomical clock / Cathédrale Notre-Dame de Strasbourg; Strasbourg Cathedral platform climb / Plateforme de la cathédrale de Strasbourg; Toy Museum, Colmar / Musée du Jouet; Colmar little train / Petit Train Touristique de Colmar; Choco-Story Colmar; Base Nautique Colmar-Houssen; Parc du Champ-de-Mars; Jardin Méquillet; Parc Saint-François-Xavier; Alsatian Museum / Musée Alsacien

### gb-cotswolds — The Cotswolds (United Kingdom)
Area covered: The Cotswolds (also known as / includes: cotswolds, bibury, bourton-on-the-water, castle combe, stow-on-the-wold, city of bath)

Now in the app: 16 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: The Kingsbridge Inn; The Mousetrap Inn; The Swan Hotel Brasserie; The Catherine Wheel; The Angel at Burford; The Porch House; The Queen's Head; The Eight Bells; The Castle Inn; Bibury Trout Farm; Russell's Fish & Chips; The Ox Shed at Cotswold Farm Park; Huffkins; Bakery on the Water; Lucy's Tearoom; Tisanes Tea Rooms

Already in the app — things to do: Cotswold Wildlife Park and Gardens; Birdland Park and Gardens; The Model Village, Bourton-on-the-Water; Cotswold Farm Park; Blenheim Palace, Park and Gardens; Corinium Museum; WWT Slimbridge Wetland Centre; Batsford Arboretum; Broadway Tower; Bibury Trout Farm; The Wilson, Cheltenham Art Gallery and Museum; National Waterways Museum Gloucester; Oxford University Museum of Natural History; Cotswold Motoring Museum and Toy Collection; Cirencester Charter Market; Pittville Park play area; The Dragonfly Maze; Cotswold Lavender; Sudeley Castle and Gardens; Westonbirt, The National Arboretum; Painswick Rococo Garden; Cotswold Alpacas; Hocus Pocus Play; Paint It Yourself Pottery; Low ropes at Far Peak; Gloucestershire Warwickshire Steam Railway
