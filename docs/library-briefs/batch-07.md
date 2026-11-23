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

### ar-buenosaires — Buenos Aires and Iguazú (Argentina)
Area covered: Buenos Aires and Iguazú (also known as / includes: buenos aires, la boca, caminito, san telmo)

Already in the app — places to eat: La Brigada; La Cabrera; El Desnivel; Pizzería Güerrin; El Cuartito; El Sanjuanino; Siga la Vaca; La Rueda 1975; Aqva Restaurant; El Quincho del Tío Querido; Mercado de San Telmo; Fortín Cataratas; Café Tortoni; La Biela; Rapanui; Cadore

Already in the app — things to do: Ecoparque Buenos Aires; Japanese Garden / Jardín Japonés; Costanera Sur Ecological Reserve / Reserva Ecológica Costanera Sur; Galileo Galilei Planetarium / Planetario Galileo Galilei; Abasto Children's Museum / Museo de los Niños Abasto; Carlos Thays Botanical Garden / Jardín Botánico Carlos Thays; Rosedal and the Palermo woods / Rosedal y Bosques de Palermo; San Telmo Sunday fair / Feria de San Telmo; Tigre and the Paraná Delta; Parque de la Costa; Iguazú Falls (Argentine side) / Parque Nacional Iguazú; Teatro Colón guided tour; National Museum of Fine Arts; Argentine Museum of Natural Sciences; MIJU – Museum of Imagination and Play

### at-salzburg — Salzburg (Austria)
Area covered: Salzburg (also known as / includes: salzburg, hohensalzburg, mirabell, getreidegasse)

Already in the app — places to eat: Bärenwirt; Sternbräu; Stiegl-Keller; Zwettler's; Die Weisse; Gasthaus Wilder Mann; Stiegl-Brauwelt; Zum Zirkelwirt; Augustiner Bräu Kloster Mülln; Balkan Grill Walter; Grünmarkt; Café Tomaselli; Café Konditorei Fürst; Café Bazar

Already in the app — things to do: Hohensalzburg Fortress / Festung Hohensalzburg; Salzburg Zoo Hellbrunn / Zoo Salzburg Hellbrunn; Hellbrunn Palace and Trick Fountains / Schloss Hellbrunn und Wasserspiele; Haus der Natur / Haus der Natur; Salzburg Marionette Theatre / Salzburger Marionettentheater; Mozart's Birthplace / Mozarts Geburtshaus; Untersberg Cable Car / Untersbergbahn; Salzwelten Hallein Salt Mine / Salzwelten Hallein; Salzburg Christkindlmarkt / Salzburger Christkindlmarkt; Salzburg Open-Air Museum / Salzburger Freilichtmuseum; Eisriesenwelt Ice Cave / Eisriesenwelt Werfen; Mirabell Gardens and Dwarf Garden / Mirabellgarten und Zwergerlgarten; Zauberflöten Playground / Zauberflöten-Spielplatz; Hangar-7 / Red Bull Hangar-7; Getreidegasse / Getreidegasse

### at-vienna — Vienna (Austria)
Area covered: Vienna (also known as / includes: vienna, wien, schonbrunn, prater)

Already in the app — places to eat: Figlmüller Wollzeile; Plachutta Wollzeile; Schweizerhaus; Luftburg - Kolarik im Prater; Salm Bräu; Griechenbeisl; Glacis Beisl; Mayer am Pfarrplatz; Zwölf Apostelkeller; Naschmarkt; Bitzinger Würstelstand Albertina; Trzesniewski; Café Central; Demel; Aida Stephansplatz; Zanoni & Zanoni

Already in the app — things to do: Schönbrunn Zoo (Tiergarten Schönbrunn); Wurstelprater funfair; Vienna Giant Ferris Wheel (Riesenrad); Haus des Meeres (Aqua Terra Zoo); ZOOM Children's Museum; Technical Museum Vienna with miniTi; Schönbrunn maze and Labyrinthikon playground; Natural History Museum Vienna; Vienna Christmas Market at the Rathaus; Wiener Eistraum ice rink; Naschmarkt; House of Music (Haus der Musik); Butterfly House (Schmetterlinghaus); Danube Tower (Donauturm); Sisi Museum and Imperial Apartments

### be-bruges — Bruges (Belgium)
Area covered: Bruges (also known as / includes: bruges, brugge, ghent, gent)

Already in the app — places to eat: Poules Moules; De Vlaamsche Pot; Cambrinus; Breydel De Coninc; Ribs 'n Beer; De Halve Maan; 't Huidevettershuis; Chez Vincent; Bocca; Soup; Chez Albert; The Old Chocolate House; Da Vinci; Tearoom De Proeverie

Already in the app — things to do: Boudewijn Seapark; Historium Bruges; Choco-Story, the Chocolate Museum; Frietmuseum; Bruges canal boat tour; Belfry of Bruges / Belfort; Groeninge Museum; Winter Glow Christmas market; Bruges Winter Glow ice rink; Begijnhof and Minnewater / Begijnhof / Minnewater; Kruisvest windmills and ramparts; Sint-Janshuismolen windmill; Astridpark playground; Sea Life Blankenberge; Diamond Museum Bruges
