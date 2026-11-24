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

### de-cologne — Cologne and the Rhine valley (Germany)
Area covered: Cologne and the Rhine valley (also known as / includes: cologne, koln, rhine valley, loreley, boppard, rudesheim)

Now in the app: 15 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Früh am Dom; Peters Brauhaus; Gaffel am Dom; Brauhaus Päffgen; Brauerei zur Malzmühle; Haxenhaus zum Rheingarten; Rüdesheimer Schloss; Altes Haus; Altes Brauhaus Koblenz; Weindorf Koblenz; Rievkoochebud; Habibi; Café Reichard; Café Eigel; Chocolat Grand Café am Schokoladenmuseum

Already in the app — things to do: Cologne Zoo; Chocolate Museum; Cologne cable car; Phantasialand; Heinzel's Winter Fairy Tale Christmas market; Flora and the Botanical Garden; Rautenstrauch-Joest Museum and SPACE4KIDS; German Sport and Olympic Museum; KD Rhine panorama cruise; Fragrance Museum in the Farina House; Rheinpark and its playground; Hänneschen puppet theatre; Lindenthal Animal Park; Brück deer enclosure; Cologne City Museum; Cologne Cathedral and its south tower / Kölner Dom; Silly Billy; JUMP House Cologne

### ma-marrakech — Marrakech and the Atlas (Morocco)
Area covered: Marrakech and the Atlas (also known as / includes: marrakech, marrakesh, atlas mountains, high atlas, imlil, toubkal)

Now in the app: 17 places to eat, 16 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Nomad; Le Jardin; Chez Chegrouni; Al Fassia; Café Clock Marrakech; Terrasse des Épices; Naranj; Amal Women's Training Center; Kasbah du Toubkal; Kasbah Bab Ourika; Jemaa el-Fna food stalls; Chez Lamine Hadj Mustapha; Pâtisserie des Princes; Café des Épices; Bacha Coffee; Pâtisserie Amandine; Beldi Fusion Kitchen Guéliz

Already in the app — things to do: Jardin Majorelle; Yves Saint Laurent Museum / Musée Yves Saint Laurent Marrakech; Oasiria water park / Oasiria; Anima Garden / ANIMA Garden; Le Jardin Secret; Menara Gardens / Jardins de la Ménara; Cyber Park / Cyber Parc Arsat Moulay Abdeslam; Lalla Hasna Park / Parc Lalla Hasna; Jemaa el-Fnaa square / ساحة جامع الفنا; Maison de la Photographie / Maison de la Photographie de Marrakech; Bahia Palace / Palais de la Bahia; Marrakech Museum / Musée de Marrakech; Ourika Valley and Setti Fatma waterfalls / Vallée de l'Ourika; Kawkab Jeux indoor play centre; Hot-air balloon over the Agafay Desert; Ouzoud Falls / Cascades d'Ouzoud

### pt-porto — Porto (Portugal)
Area covered: Porto (also known as / includes: porto, oporto, ribeira, douro)

Now in the app: 16 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Café Santiago; Cervejaria Brasão Aliados; Abadia do Porto; Adega São Nicolau; Capa Negra II; Restaurante Antunes; Cufra; Solar Moinho de Vento; O Buraco; Mercado do Bolhão; Casa Guedes; Conga; Mercado Beira-Rio; Majestic Café; Confeitaria do Bolhão; Leitaria da Quinta do Paço

Already in the app — things to do: Santo Inácio Zoo / Zoo Santo Inácio; Serralves Park and Museum / Fundação de Serralves; Gaia Cable Car / Teleférico de Gaia; Bolhão Market / Mercado do Bolhão; SEA LIFE Porto; WOW Cultural District / WOW – World of Wine; Crystal Palace Gardens / Jardins do Palácio de Cristal; Tram Museum / Museu do Carro Eléctrico; City Park / Parque da Cidade do Porto; Porto Planetarium / Planetário do Porto; Six Bridges Douro Cruise / Cruzeiro das Seis Pontes; Casa da Música; Livraria Lello; Water Pavilion (Pavilhão da Água); Porto Botanical Garden; Piscina das Marés; World of Discoveries

### de-rothenburg — Rothenburg ob der Tauber (Germany)
Area covered: Rothenburg ob der Tauber (also known as / includes: rothenburg, rothenburg ob der tauber, romantic road, nuremberg)

Now in the app: 15 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Reichsküchenmeister; Gasthof Goldener Greifen; Glocke; Ratsstube; Gasthof Butz; Altfränkische Weinstube; Restaurant Roter Hahn; Pizzeria Roma; Brot & Zeit; Tobingo Döner; Diller Schneeballenträume; Bäckerei Striffler; Walter Friedel; Café Lebenslust; Eiscafé Pizzeria Italia

Already in the app — things to do: Town Wall and Towers / Stadtmauer und Türme; Town Hall Tower / Rathausturm; Town History Museum in the Town Hall Vaults / Historiengewölbe, Meistertrunk; Rothenburg Museum / RothenburgMuseum im Klosterhof; Medieval Crime Museum / Mittelalterliches Kriminalmuseum; Käthe Wohlfahrt Christmas Village / Käthe Wohlfahrt Weihnachtsdorf; German Christmas Museum / Deutsches Weihnachtsmuseum; Neue Burg Playground / Spielplatz Neue Burg; Franconian Open-Air Museum / Fränkisches Freilandmuseum Bad Windsheim; Franken-Therme Bad Windsheim; Night watchman tour; Burggarten; Plönlein; Children’s city guide trail; Old Rothenburg Craftsman’s House; Röderturm; Toppler Castle / Topplerschlösschen; Hornburgweg playground / Spielplatz Hornburgweg; Double Bridge / Doppelbrücke
