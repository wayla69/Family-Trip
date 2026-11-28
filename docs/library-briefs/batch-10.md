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

### ch-zermatt — Zermatt (Switzerland)
Area covered: Zermatt (also known as / includes: zermatt, matterhorn, gornergrat, glacier paradise)

Already in the app — places to eat: Whymper-Stube; Schäferstube; Walliserkanne; Restaurant Du Pont; Grampi's; Chez Vrony; Restaurant Zum See; Findlerhof; Restaurant Derby; Kulmhotel Gornergrat; Restaurant Matterhorn glacier paradise; Bäckerei Fuchs; Backzeit Bäckerei & Café; Petit Royal

Already in the app — things to do: Gornergrat railway; Matterhorn Glacier Paradise; Matterhorn Museum Zermatlantis; Sunnegga and Wolli's Adventure Park at Leisee; Blauherd and the Stellisee walk; Riffelsee at Rotenboden; Mountaincart Blauherd to Sunnegga; Old village and Bahnhofstrasse walk; Hotel Berghof swimming pool; Snowli Kids Village ski school; Tradition Julen sheep barn visit; Guided village tour of Zermatt; Obere Matten playground; Zooom the Matterhorn; Walk of Climb on Bahnhofstrasse

### ch-zurich — Zurich (Switzerland)
Area covered: Zurich (also known as / includes: zurich, uetliberg, rhine falls)

Already in the app — places to eat: Zeughauskeller; Swiss Chuchi; Zum Kropf; Le Dézaley; Raclette Stube; Brasserie Federal; Santa Lucia Niederdorf; Fischerstube Zürihorn; Haus Hiltl; Sternen Grill; Markthalle im Viadukt; Tibits Seefeld; Confiserie Sprüngli; Conditorei Schober; Lindt Home of Chocolate; Gelateria di Berna

Already in the app — things to do: Zurich Zoo and Masoala Rainforest / Zoo Zürich; Swiss National Museum / Landesmuseum Zürich; Lindt Home of Chocolate; Swiss Science Center Technorama; FIFA Museum; Zurich Tram Museum; Uetliberg and the Planet Trail; Lake Zurich boat trip; Rhine Falls / Rheinfall; Botanical Garden of the University of Zurich / Botanischer Garten; Lindenhof; Seebad Utoquai; Strandbad Tiefenbrunnen; Markthalle im Viadukt; Alpamare water park

### cl-santiago — Santiago and Valparaíso (Chile)
Area covered: Santiago and Valparaíso (also known as / includes: santiago de chile, santiago, valparaiso, vina del mar)

Already in the app — places to eat: Donde Augusto; Galindo; Divertimento Chileno; Tiramisú; Las Vacas Gordas; Confitería Torres; Café Turri; Casino Social J. Cruz; Tierra de Fuego; La Vega Central; Dominó; Patio Bellavista; Emporio La Rosa; Bravissimo; Café del Poeta

Already in the app — things to do: Zoológico Nacional (Metropolitan Park) / Zoológico Nacional; Museo Interactivo Mirador (MIM); Buin Zoo; Sky Costanera viewpoint; Teleférico and funicular, San Cristóbal hill / Teleférico y Funicular Santiago; National Museum of Natural History / Museo Nacional de Historia Natural; Santiago Railway Museum / Museo Ferroviario; Artequin art museum for children / Museo Artequin; Chilean Museum of Pre-Columbian Art / Museo Chileno de Arte Precolombino; Cerro Santa Lucía; Wonder Park Maipú; Quinta Normal park pool / Piscina del Parque Quinta Normal; Mercado Central; Parque Quinta Vergara; La Sebastiana (Neruda's house) / Museo La Sebastiana

### cz-prague — Prague (Czechia)
Area covered: Prague (also known as / includes: prague, praha, charles bridge, old town square)

Already in the app — places to eat: Lokál Dlouhááá; U Medvídků; U Fleků; Kolkovna Celnice; Mlejnice; Klášterní pivovar Strahov; U Kroka; Vinohradský Parlament; U Pinkasů; Havelská Koruna; Naše maso; Sisters Bistro; Café Louvre; Café Savoy; Ovocný Světozor; Cukrárna Myšák

Already in the app — things to do: Prague Zoo / Zoo Praha; Petřín Hill, tower and mirror maze / Petřín; National Technical Museum / Národní technické muzeum; Prague Castle (main circuit) / Pražský hrad; Museum of Bricks (LEGO museum) / Muzeum Lega; Old Town Hall tower and Astronomical Clock / Staroměstská radnice s orlojem; Aquapalace Praha; Vltava river cruise with Prague Steamboats; Havelské tržiště (Havel's Market) / Havelské tržiště; Spejbl and Hurvínek Theatre / Divadlo Spejbla a Hurvínka; Prague Botanical Garden and Fata Morgana greenhouse / Botanická zahrada Troja; Planetárium Praha; Vyšehrad grounds and playground / Vyšehrad; Charles Bridge / Karlův most; Letná Park / Letenské sady
