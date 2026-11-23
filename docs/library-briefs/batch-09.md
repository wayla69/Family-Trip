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

### ca-vancouver — Vancouver (Canada)
Area covered: Vancouver (also known as / includes: vancouver, stanley park, granville island, gastown)

Already in the app — places to eat: The Sandbar Seafood Restaurant; Cactus Club Cafe English Bay; White Spot; The Old Spaghetti Factory; Sun Sui Wah Seafood Restaurant; The Teahouse in Stanley Park; Cardero's Restaurant; Ramen Danbo; Granville Island Public Market; Japadog; Go Fish; Lonsdale Quay Market; Earnest Ice Cream; Rain or Shine Ice Cream; Lee's Donuts; Purebread

Already in the app — things to do: Vancouver Aquarium; Science World; Capilano Suspension Bridge Park; Granville Island Public Market; Granville Island Kids Market; Grouse Mountain; Playland; H.R. MacMillan Space Centre; Lynn Canyon Park; Bloedel Conservatory; VanDusen Botanical Garden; Museum of Vancouver; Variety Kids Water Park, Stanley Park; Stanley Park playgrounds and Second Beach; Burnaby Village Museum; Vancouver Maritime Museum

### ch-geneva — Geneva and Lake Léman (Switzerland)
Area covered: Geneva and Lake Léman (also known as / includes: geneva, geneve, genf, montreux)

Already in the app — places to eat: Café du Soleil; Les Armures; Chez ma Cousine; Café de Paris; Auberge de Savièse; Café Romand; Pinte Besson; La Crêperie d'Ouchy; Le Museum; La Buvette des Bains des Pâquis; Manora Restaurant Genève; Halle de Rive; Gelatomania; Confiserie Zurcher

Already in the app — things to do: Jet d'Eau / Jet d'eau de Genève; Bains des Pâquis; Mouettes Genevoises lake shuttle; International Red Cross and Red Crescent Museum / Musée international de la Croix-Rouge; Museum of Art and History / Musée d'art et d'histoire (MAH); Geneva Botanical Garden / Conservatoire et Jardin botaniques; Salève cable car / Téléphérique du Salève; La Garenne animal park; Swiss Vapeur Parc; CERN Science Gateway; Maison Tavel; Museum of Ethnography Geneva (MEG); Parc des Bastions and the giant chess boards; Jardin Anglais and the Flower Clock; Parc La Grange and the rose garden

### ch-interlaken — Interlaken & the Jungfrau (Switzerland)
Area covered: Interlaken & the Jungfrau (also known as / includes: interlaken, jungfrau, jungfraujoch, grindelwald)

Already in the app — places to eat: Restaurant Taverne; Hüsi Bierhaus; Restaurant Bären Unterseen; Restaurant Laterne; Pizzeria Piz Paz; Harder Kulm Panorama Restaurant; Barry's Restaurant; Bergrestaurant Kleine Scheidegg; Hotel Oberland Restaurant; Migros Restaurant Interlaken; Coop Restaurant Interlaken Ost; Aletsch Self; Grand Café Restaurant Schuh; Funky Chocolate Club; Airtime Café; C und M Café Bar Restaurant

Already in the app — things to do: Jungfraujoch – Top of Europe; Harder Kulm; Alpine Wildlife Park Interlaken; Thun Castle (Schloss Thun); BLS winter boat on Lake Thun; Staubbach Falls, Lauterbrunnen; Männlichen children's area; Schilthorn – Piz Gloria; Trümmelbach Falls; Grindelwald First; St. Beatus Caves; Aare Gorge; Ballenberg Open-Air Museum; Schynige Platte; Brienz Rothorn Railway

### ch-lucerne — Lucerne (Switzerland)
Area covered: Lucerne (also known as / includes: lucerne, luzern, pilatus, rigi)

Already in the app — places to eat: Wirtshaus Galliker; Rathaus Brauerei; Restaurant Fritschi; Stadtkeller; Zunfthausrestaurant Pfistern; Wirtshaus Taube; Weisses Kreuz; LUZ Seebistro; Mill'Feuille; Manora Restaurant Luzern; Tibits Luzern; Confiserie Bachmann; Heini Conditorei; Gelateria dell'Alpi

Already in the app — things to do: Swiss Museum of Transport / Verkehrshaus der Schweiz; Swiss Chocolate Adventure; Mount Pilatus; Mount Rigi; Mount Titlis; Stanserhorn CabriO; Goldau Nature and Wildlife Park / Natur- und Tierpark Goldau; Glacier Garden Lucerne / Gletschergarten Luzern; Museum Luzern; Bourbaki Panorama; Chapel Bridge / Kapellbrücke; Lion Monument / Löwendenkmal; Musegg Wall / Museggmauer; Lake Lucerne boat trip; Lucerne weekly market / Luzerner Wochenmarkt; Ufschötti; Inseli Park playground
