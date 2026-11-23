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

### it-cinqueterre — The Cinque Terre (Italy)
Area covered: The Cinque Terre (also known as / includes: cinque terre, vernazza, manarola, riomaggiore)

Already in the app — places to eat: Ristorante Belvedere; Il Casello; Gambero Rosso; Trattoria Gianni Franzi; Il Porticciolo; Batti Batti Focacceria; Il Massimo della Focaccia; Alberto Gelateria; Pasticceria Laura; Il Pirata delle 5 Terre; Gelateria Vernazza

Already in the app — things to do: Via dell'Amore / Via dell'Amore; Cinque Terre by train; Cinque Terre ferry; Monterosso Fegina beach / Spiaggia di Fegina; Levanto central beach / Spiaggia Libera Centrale; Doria Castle, Portovenere / Castello Doria; Portovenere harbour and old town; Doria Castle and tower, Vernazza / Castello Doria; Manarola playground and viewpoints; Monterosso to Vernazza trail / Sentiero Azzurro; Naval Technical Museum / Museo Tecnico Navale; San Giorgio Castle museum / Castello San Giorgio; Lerici Castle and fossil museum / Castello di Lerici; Genoa Aquarium / Acquario di Genova; Baia delle Favole beach / Baia delle Favole

### it-dolomites — The Dolomites (Italy)
Area covered: The Dolomites (also known as / includes: dolomites, dolomiti, seceda, ortisei)

Already in the app — places to eat: Wirtshaus Vögele; Hopfen & Co; Tubladel; Mauriz Keller; Gostner Schwaige; Malga Sanon; El Brite de Larieto; Ristorante Pizzeria Al Passetto; Rifugio Scoiattoli; Rifugio Firenze; Mercato di Piazza delle Erbe; Mont Sëuc; Loacker Café Bolzano; Gelateria Avalon; Pasticceria Alverà; Café Demetz

Already in the app — things to do: Alpe di Siusi cable car / Seiser Alm Bahn; Seceda ridge and meadows / Seceda; Lake Braies / Lago di Braies, Pragser Wildsee; Tre Cime di Lavaredo / Tre Cime di Lavaredo; Lake Carezza / Lago di Carezza, Karersee; South Tyrol Museum of Archaeology, home of Ötzi / Südtiroler Archäologiemuseum; Gardens of Trauttmansdorff Castle / Gärten von Schloss Trauttmansdorff; Ritten cable car, Bolzano to Soprabolzano / Rittner Seilbahn; Earth pyramids of Ritten / Erdpyramiden am Ritten; Bolzano Christmas Market / Bozner Christkindlmarkt; Therme Meran / Therme Meran; Messner Mountain Museum Firmian / MMM Firmian, Schloss Sigmundskron; Messner Mountain Museum Corones / MMM Corones, Kronplatz; Archeoparc Val Senales / Archeoparc Schnalstal; Toblach Lake walk / Toblacher See, Lago di Dobbiaco

### it-florence — Florence & Tuscany (Italy)
Area covered: Florence & Tuscany (also known as / includes: florence, firenze, tuscany, toscana)

Already in the app — places to eat: Trattoria Za Za; Il Latini; Osteria Santo Spirito; Gusta Pizza; Trattoria 4 Leoni; Trattoria Mario; Trattoria Papei; Trattoria da Leo; Pizzeria Il Montino; Mercato Centrale Firenze; All'Antico Vinaio; Da Nerbone; Vivoli; Gelateria dei Neri; Gelateria Dondoli; Nannini

Already in the app — things to do: Uffizi Gallery / Gallerie degli Uffizi; Galleria dell'Accademia (Michelangelo's David) / Galleria dell'Accademia; Palazzo Vecchio / Palazzo Vecchio; Boboli Gardens / Giardino di Boboli; Museo Galileo / Museo Galileo; La Specola zoology museum / Museo di Storia Naturale – La Specola; Museo Stibbert / Museo Stibbert; Mercato Centrale / Mercato Centrale Firenze; Giardino delle Rose and Piazzale Michelangelo / Giardino delle Rose; Parco delle Cascine / Parco delle Cascine; Leonardo Museum, Vinci / Museo Leonardiano di Vinci; Pinocchio Park, Collodi / Parco di Pinocchio; Leaning Tower of Pisa / Torre pendente di Pisa; Lucca city walls by bike / Mura di Lucca; Torre Grossa, San Gimignano / Torre Grossa

### it-milan — Milan (Italy)
Area covered: Milan (also known as / includes: milan, milano, duomo di milano, navigli)

Already in the app — places to eat: Trattoria Milanese; Antica Trattoria della Pesa; Piz; Gino Sorbillo Lievito Madre al Duomo; El Brellin; Trattoria Masuelli San Marco; Trattoria Madonnina; Obicà Mozzarella Bar Duomo; Luini; Pizzeria Spontini; Mercato Centrale Milano; Eataly Milano Smeraldo; Pasticceria Marchesi 1824; Cioccolati Italiani; Pavé

Already in the app — things to do: National Museum of Science and Technology Leonardo da Vinci / Museo Nazionale Scienza e Tecnologia Leonardo da Vinci; Milan Civic Aquarium / Acquario Civico di Milano; Sforza Castle museums / Musei del Castello Sforzesco; Milan Natural History Museum / Museo di Storia Naturale di Milano; Civic Planetarium Ulrico Hoepli / Civico Planetario Ulrico Hoepli; MUBA children's museum / MUBA – Museo dei Bambini Milano; Duomo di Milano rooftop terraces / Terrazze del Duomo di Milano; Parco Sempione / Parco Sempione; Giardini Pubblici Indro Montanelli / Giardini Pubblici Indro Montanelli; Idroscalo park / Parco Idroscalo; Pirelli HangarBicocca / Pirelli HangarBicocca; Leolandia / Leolandia; Mercatone dell'Antiquariato, Naviglio Grande / Mercatone dell'Antiquariato sul Naviglio Grande; Mercato Centrale Milano / Mercato Centrale Milano; Museo del Novecento / Museo del Novecento
