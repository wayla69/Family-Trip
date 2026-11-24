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

### nz-queenstown — Queenstown, Wānaka and Milford Sound (New Zealand)
Area covered: Queenstown, Wānaka and Milford Sound (also known as / includes: queenstown, milford sound, wanaka, arrowtown, fiordland, tekapo)

Now in the app: 30 places to eat, 40 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: The Cow; Flame Bar & Grill; Stratosfare Restaurant & Bar; Public Kitchen & Bar; Big Fig; Francesca's Italian Kitchen; Kai Whakapai; Pio Pio Restaurant; The Fat Duck; Fergburger; Erik's Fish and Chips; Miles Better Pies; Patagonia Chocolates; Mrs Ferg Gelateria; Provisions of Arrowtown; Black Peak Gelato; Amisfield Restaurant and Cellar; Mora Wines and Artisan Kitchen; Rātā; Blue Kanu; Swiftsure; Billy's; The Shed Arrowtown; Boat Shed Bakery; Winnies Gourmet Pizza Bar; Joe’s Garage; The Boat Shed Café & Bistro; The Fork & Tap; Slow Cuts; True South Dining Room

Already in the app — things to do: Skyline Gondola and Luge; Kiwi Park Queenstown; TSS Earnslaw and Walter Peak Farm; Queenstown Gardens; Queenstown Ice Arena; Alpine Aqualand; Queenstown Market; Remarkables Market; Shotover Jet; Arrowtown Chinese Settlement; Lakes District Museum; Putt 'n' Glow Mini Golf; Million Dollar Cruise; Lake Hayes Walkway; Ziptrek Ecotours; Onsen Hot Pools; Game Over; Bathhouse Playground; Frankton Arm Walkway; St Omer Park; Bayview Reserve; Jack Reid Park; SITE Trampoline; Thrillzone; Odyssey Sensory Maze; Hydro Attack; Ben Lomond Saddle; Ben Lomond Track; The Remarkables; Wakatipu Playcentre; Rose Douglas Park; McBride Park; Wānaka Lavender Farm; Puzzling World; National Transport & Toy Museum; Bike Glendhu; Kind Farm Animal Sanctuary; Kawarau Zipride; Glenorchy Animal Experience; Coronet Peak

### hu-budapest — Budapest (Hungary)
Area covered: Budapest (also known as / includes: budapest, danube, szechenyi, chain bridge)

Now in the app: 43 places to eat, 28 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Menza; Gettó Gulyás; Paprika Vendéglő; VakVarjú Étterem; Kéhli Vendéglő; Náncsi Néni Vendéglője; Pest-Buda Bistro; Frici Papa Kifőzdéje; Trófea Grill Étterem; Nagyvásárcsarnok; Karaván; Retró Lángos Büfé; Gerbeaud; Ruszwurm Cukrászda; Gelarto Rosa; Molnár's Kürtőskalács; Retek Bisztro; Sugar!; Napfényes Étterem; VakVarjú Újlipótváros; VakVarjú Kiscelli; Városliget Café; Riso Ristorante; IDE Pizzeria; Pastrami; Hold Street Market; Kispiac Bisztró; Fekete Kávézó; Spíler Buda; David's Kitchen; Kőleves Vendéglő; STIKA Budapest; The Spot Budapest; Arán Bakery; New York Café; Artizán; Freyja; Läget Peterjon; Első Pesti Rétesház; VAJ; Riso Ristorante & Terrace; Cafe Brunch (Bazilika); Brunch Bistro

Already in the app — things to do: Budapest Zoo and Botanical Garden / Budapesti Állat- és Növénykert; Tropicarium Budapest / Tropicarium-Óceanárium; Palace of Wonders / Csodák Palotája; Hungarian Railway History Park; Great Market Hall / Nagyvásárcsarnok; Palatinus Strand on Margaret Island; Margaret Island and the Musical Fountain / Margitsziget; City Park Main Playground / Városligeti Nagyjátszótér; Budapest Children's Railway / Gyermekvasút; Zugliget Chairlift / Libegő; Buda Castle Funicular / Budavári Sikló; Fisherman's Bastion / Halászbástya; City Park Ice Rink / Városligeti Műjégpálya; Hungarian Open Air Museum (Skanzen) / Szabadtéri Néprajzi Múzeum; Hungarian Natural History Museum / Magyar Természettudományi Múzeum; Pinball Museum; Szamos Chocolate Museum; Hungarian National Museum; Pál-völgyi Cave; Szemlő-hegyi Cave; Buda Castle Labyrinth; Cat Museum; Minipolisz; KockaPark; Aquaworld Resort; House of Houdini; WestEnd City Center; Aquaworld Budapest

### at-salzburg — Salzburg (Austria)
Area covered: Salzburg (also known as / includes: salzburg, hohensalzburg, mirabell, getreidegasse, innsbruck)

Now in the app: 43 places to eat, 30 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Bärenwirt; Sternbräu; Stiegl-Keller; Zwettler's; Die Weisse; Gasthaus Wilder Mann; Stiegl-Brauwelt; Zum Zirkelwirt; Augustiner Bräu Kloster Mülln; Balkan Grill Walter; Grünmarkt; Café Tomaselli; Café Konditorei Fürst; Café Bazar; Café Mozart; S’Nockerl im Elefant; Alt Salzburg; Goldene Kugel; Fortress Café; Café Fingerlos; Alter Fuchs; Augustiner Braugasthof Krimpelstätter; Meissl & Schadn; Tortelier; Furō; Esszimmer; Die Gersberg Alm; Blaue Gans; Café am Kai; IMLAUER Brasserie Mirabell; Braurestaurant IMLAUER; Café Glockenspiel; Pan e Vin; Steinterrasse; Humboldt; Metzgersteig; Kaffeeothek; Kuglhof; Gasthof Die Pflegerbrücke; Panoramarestaurant zur Festung Hohensalzburg; The Keep – Healthy Eating; Restaurant Wolferl; The Bakery by Didi Maier

Already in the app — things to do: Hohensalzburg Fortress / Festung Hohensalzburg; Salzburg Zoo Hellbrunn / Zoo Salzburg Hellbrunn; Hellbrunn Palace and Trick Fountains / Schloss Hellbrunn und Wasserspiele; Haus der Natur; Salzburg Marionette Theatre / Salzburger Marionettentheater; Mozart's Birthplace / Mozarts Geburtshaus; Untersberg Cable Car / Untersbergbahn; Salzwelten Hallein Salt Mine / Salzwelten Hallein; Salzburg Christkindlmarkt / Salzburger Christkindlmarkt; Salzburg Open-Air Museum / Salzburger Freilichtmuseum; Eisriesenwelt Ice Cave / Eisriesenwelt Werfen; Mirabell Gardens and Dwarf Garden / Mirabellgarten und Zwergerlgarten; Zauberflöten Playground / Zauberflöten-Spielplatz; Hangar-7 / Red Bull Hangar-7; Getreidegasse; Toy Museum; JumpDome; Amadeus Salzach River Boat; Leopoldskron Outdoor Pool; Marionette Museum; Steintheater; Folklore Museum; Salzach riverside path; Mönchsberg lift; Hettwer Bastei; Gaisberg; DomQuartier; Lehener Park; Volksgarten playground / Spielplatz im Volksgarten; Hellbrunn playground / Spielplatz in Hellbrunn

### se-stockholm — Stockholm (Sweden)
Area covered: Stockholm (also known as / includes: stockholm, gamla stan, skansen, djurgarden, junibacken, vasa museum)

Now in the app: 40 places to eat, 33 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Pelikan; Kvarnen; Tennstopet; Meatballs for the People; Ulla Winbladh; Lisa Elmqvist; Hermans; Under Kastanjen; Östermalms Saluhall; Hötorgshallen; Nystekt Strömming; Vete-Katten; Chokladkoppen; Rosendals Trädgård; Café Saturnus; Amida Kolgrill; Ta'ameya; Brunos korvbar; Mormors Dumplings; Sandhäxan; Savoj; Snack Bar; Lilla Ego; Leijontornet; Petri; Animo; Lillebror; Bistro Bestick; Slussporten; Brasserie Astrid; Teuf; Villa Valentina; Restaurang Liv; Skörden; Bibon; Blique; Mon Village Caîo; Junibacken restaurant; Haga Bottega; Boketto (Hotel Blique by Nobis)

Already in the app — things to do: Skansen; Junibacken; Vasa Museum / Vasamuseet; Gröna Lund; Tekniska museet; Swedish Museum of Natural History / Naturhistoriska riksmuseet; Nordiska museet; The Royal Armoury / Livrustkammaren; Rålambshovsparken; Royal Palace / Kungliga slottet; Butterfly House Haga Ocean / Fjärilshuset-Haga Ocean; Fjäderholmarna island boat trip / Fjäderholmarna; Stockholm City Museum / Stadsmuseet; Tom Tits Experiment; Hagaparken; Glädjefyllt; Mulle Meck Park; Baltic Sea Science Center; Postmuseum; Skistar; KD Court; Kulturhuset; The Performing Arts Museum; Tramway Museum; Norra Stationsparken playground; Kampementsbadet; Smedsuddsbadet; Flatenbadet; Ersta Minigolf; Vasaparken; Norra Stationsparken; Police Museum / Polismuseet; Leo's Lekland Kungens Kurva
