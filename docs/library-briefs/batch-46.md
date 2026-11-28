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

### it-rome — Rome (Italy)
Area covered: Rome (also known as / includes: rome, roma, colosseum, trevi, pantheon, vatican)

Already in the app — places to eat: Armando al Pantheon; Tonnarello; Pizzeria Da Baffetto; Pizzeria Ai Marmi; Felice a Testaccio; Flavio al Velavevodetto; Da Enzo al 29; La Montecarlo; Cantina e Cucina; Mercato Centrale Roma; Mercato di Testaccio; Pizzarium Bonci; Giolitti; Old Bridge Gelateria; Gelateria del Teatro; Pasticceria Regoli; Cresci; Il Sorpasso; Gelateria dei Gracchi; Il Palazzo del Freddo; Grezzo; Elementare; Sant’Isidoro; Cul de Sac; Grappolo d’Oro; Emma Pizzeria; Elle Effe; Il Piccolo Buco; Il Chianti; Pizza in Trevi; Rinascente top floor food hall; Ai Tre Scalini; Casa Dante; Taverna Agape; Camillo; Le Naumachie; Cafe’ Cafe’; La Gattabuia; Gunther Gelato; Fata Morgana; Otaleg; Cremilla; Luzzi; Lume Osteria alle Scalette; Pastificio Borghichiana; Mimi e Coco; Poldo e Gianna; Renato e Luisa; Barnum; Homebaked; Forno Feliziani; Terrazza Les Etoiles; Oro Bistrot; Trattoria Da Cesare al Casaletto; Osteria Bonelli; Il Maritozzo Rosso; Ristorante La Tavernaccia; Mordi e Vai; ViVi

Already in the app — things to do: Colosseum, Roman Forum and Palatine Hill / Colosseo; Explora children's museum / Explora – Il museo dei bambini di Roma; Bioparco di Roma; Civic Zoology Museum / Museo Civico di Zoologia; Villa Borghese; Casina di Raffaello; Pantheon; Trevi Fountain / Fontana di Trevi; Piazza Navona; Vatican Museums / Musei Vaticani; Castel Sant'Angelo; Testaccio Market / Mercato di Testaccio; Appian Way and Caffarella Valley / Parco dell'Appia Antica; Bocca della Verità; Villa Doria Pamphilj; Gianicolo terrace; Technotown, Villa Torlonia; San Carlino / Teatro dei burattini; Verde Theatre / Teatro Verde; Mongiovino Theatre of Accettella / Teatro Mongiovino; Cinecittà World; Playground Parco Archeologico di Centocelle; Mercato Trionfale; Puppet Theater on the Janiculum Hill; Parco del Colle Oppio; Aqueduct Park; Tiber River Walkway; Laghetto dell’Eur; Museum of Illusions; Museo Mostra dei Leonardo; Galleria Borghese; Christmas World; Trastevere; Pincio Terrace

### es-barcelona — Barcelona (Spain)
Area covered: Barcelona (also known as / includes: barcelona, sagrada, park guell, la rambla, gothic quarter, barceloneta)

Already in the app — places to eat: 7 Portes; Can Culleretes; Els Quatre Gats; Cervecería Catalana; Ciutat Comtal; Cuines Santa Caterina; Les Quinze Nits; Mercat de la Boqueria; El Nacional; Granja M. Viader; Granja La Pallaresa; Escribà; Horchatería Sirvent; La Nena Farm & Chocolate Shop; Dulcinea; Churrería Manuel San Román; La Selecta; Pompa; Konig; Sopa; Alice Secret Garden; Sant Antoni Market; Mercat de Santa Caterina; La Tierra Slow Food Market; Mercat de Sarrià; Palo Alto Market Fest; La Esquinica

Already in the app — things to do: Sagrada Família; Park Güell; L'Aquàrium de Barcelona; Barcelona Zoo; CosmoCaixa; Tibidabo amusement park; Magic Fountain of Montjuïc / Font Màgica; Montjuïc cable car / Telefèric de Montjuïc; Poble Espanyol; Casa Batlló; Museu Blau natural sciences museum / Museu Blau; Chocolate Museum / Museu de la Xocolata; La Boqueria market / Mercat de la Boqueria; Parc de la Ciutadella; Barceloneta beach; JumpYard; Casa dels Entremesos; Plaça del Rei; Nova Icària beach; Bogatell beach; Port Cable Car; Barcelona Wax Museum; Parc Joan Miro; Joan Brossa Gardens; Plaça de Masadas

### nl-amsterdam — Amsterdam (Netherlands)
Area covered: Amsterdam (also known as / includes: amsterdam, jordaan, dam square, keukenhof, zaanse schans, volendam)

Already in the app — places to eat: The Pancake Bakery; Moeders; Café Loetje; Kantjil & de Tijger; Sama Sebo; The Seafood Bar; De Pannenkoekenboot; Nam Kee; Foodhallen; Vleminckx de Sausmeester; Albert Cuypmarkt; Groot Melkhuis; Winkel 43; Van Stapele Koekmakerij; Lanskroon; PANCAKES Amsterdam; Dignita Hoftuin; De Bakkerswinkel; Café-Restaurant Amsterdam; Vergulden Eenhoorn; Jansz; Het Paviljoen; Papillon; Badhuis; IJver; The Gibraltar; Pof; IJ-Kantine; Pllek; Monte Pelmo; MOAK Pancakes De Pijp; Bird; Pazzi; La Perla; De Plantage; Restaurant Blauw; De Kas; De Tokoman; Otemba; September; Eetcafé Edita; Cafe Amsterdam; Taco Lindo; De Laatste Kruimel; Moon

Already in the app — things to do: NEMO Science Museum; ARTIS Zoo / ARTIS; Micropia; Rijksmuseum; Van Gogh Museum; National Maritime Museum / Het Scheepvaartmuseum; A'DAM Lookout; Free ferries across the IJ / GVB pont; Canal cruise with a children's audio tour / Blue Boat Company; Wereldmuseum Amsterdam; Albert Cuyp Market / Albert Cuypmarkt; Vondelpark; Het Woeste Westen nature playground / Natuurspeeltuin Het Woeste Westen; Amsterdamse Bos; Ridammerhoeve goat farm / Geitenboerderij Ridammerhoeve; WONDR Experience; Amstelpark; De Pannenkoekenboot; Fruittuin van West; Kinderboerderij De Pijp; De Klimmuur Amsterdam Centraal; VROG; Klimbos Fun Forest; Jeugdland; STRAAT Museum; Oosterpark; WOW Family Centre; Treehouse NDSM; Flevoparkbad; Pierenbad; OBA Oosterdok; Candy Castle Speelparadijs; Theater De Krakeling; Dappermarkt; Ten Katemarkt; Lindengracht Markt; Noordermarkt; Waterlooplein Market; Nieuwmarkt; Kinderboerderij De Werf; Sloterpark; Westerpark

### de-berlin — Berlin (Germany)
Area covered: Berlin (also known as / includes: berlin, brandenburg gate, alexanderplatz, potsdam)

Already in the app — places to eat: Max und Moritz; Schnitzelei Mitte; Zollpackhof; Prater Garten; Café am Neuen See; Hofbräu Wirtshaus Berlin; Brauhaus Georgbraeu; Ständige Vertretung; Hasir Kreuzberg; Monsieur Vuong; Curry 36; Konnopke's Imbiss; KaDeWe Feinschmeckeretage; Rausch Schokoladenhaus; Ritter Sport Bunte Schokowelt; Zeit für Brot; Das Spielzimmer; Charlottchen; Café cocosh; Café Kreuzzwerg; Kindercafé Lilelo; Café Mi Mundo; Cafe Rotstint; Cafe Liebling; Anna Blume; Kindercafe Kreuzberg; Bonanza Coffee; Cafe Fleury; Markthalle Neun; Vöner; Mamas Banh; Silo Coffee; Good Morning, Vietnam; Thai Park; Mustafa's Gemüse Kebab; Rüyam Gemüse Kebap; Long March Canteen; Standard Serious Pizza; The Bird; Burgermeister; Lon Men's Noodle House; Borchardt; Marheineke Markthalle; Kalle Halle; Street Food auf Achse; Goldies Smashburger; Nußbaumerin; Gemello; Malafemmena; Barra; Katz Orange; Mrs Robinson's; Grill Royal; Dong Xuan Center; Kiezkind

Already in the app — things to do: Zoo Berlin / Zoologischer Garten Berlin; Berlin Aquarium / Aquarium Berlin; Tierpark Berlin / Tierpark Berlin Friedrichsfelde; Museum of Natural History / Museum für Naturkunde; German Museum of Technology and Spectrum / Deutsches Technikmuseum, Science Center Spectrum; LEGOLAND Discovery Centre Berlin; MACHmit! Museum for Children / MACHmit! Museum für Kinder; Reichstag Dome / Reichstagskuppel; Berlin TV Tower / Berliner Fernsehturm; Berlin Botanical Garden / Botanischer Garten Berlin; Markthalle Neun and Street Food Thursday / Markthalle Neun; Domäne Dahlem Farm and Museum / Domäne Dahlem; Berlin Wall Memorial / Gedenkstätte Berliner Mauer; Tiergarten Playground / Kinderspielplatz Großer Tiergarten; Zeiss Major Planetarium / Zeiss-Großplanetarium; FEZ Berlin; Waldhochseilgarten Jungfernheide; Tempelhofer Feld; Treptower Park; Türkenmarkt; KICKERworld; JUMP House Reinickendorf; Colorb(l)ind Artspace; Wilhelm Foerster Observatory; Archenhold Observatory; Anne Frank Centre; Grashüpfer Puppet Theatre; Morgenstern Theatre; Grips Theatre; Hassenheide Park; Kinderbad at Monbijoux Park; East Side Gallery
