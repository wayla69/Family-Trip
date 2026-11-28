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

### es-seville — Seville and Granada (Spain)
Area covered: Seville and Granada (also known as / includes: seville, sevilla, granada, alhambra)

Already in the app — places to eat: El Rinconcillo; Taberna Coloniales; San Marco Santa Cruz; Las Golondrinas; Los Manueles; Restaurante Chikito; Carmela Restaurante; Mirador de Morayma; Kiosko Las Titas; Mercado Lonja del Barranco; Mercado de Triana; Mercado San Agustín; Confitería La Campana; Bar El Comercio; Heladería Los Italianos; Café Fútbol

Already in the app — things to do: Royal Alcázar of Seville / Real Alcázar de Sevilla; Alhambra and Generalife / La Alhambra y Generalife; Isla Mágica / Isla Mágica; Seville Aquarium / Acuario de Sevilla; Parque de las Ciencias / Parque de las Ciencias; Metropol Parasol (the Setas) / Metropol Parasol; María Luisa Park and Plaza de España / Parque de María Luisa; Guadalquivir river cruise / Cruceros Torre del Oro; Aquaola water park / Aquaola; Casa de Pilatos / Casa de Pilatos; Torre del Oro / Torre del Oro; Triana Market / Mercado de Triana; Albaicín and Mirador de San Nicolás (Granada) / Albaicín; Itálica Roman ruins / Conjunto Arqueológico de Itálica; Alamillo Park / Parque del Alamillo

### fi-helsinki — Helsinki (Finland)
Area covered: Helsinki (also known as / includes: helsinki, helsingfors, suomenlinna, temppeliaukio)

Already in the app — places to eat: Sea Horse; Ravintola Kuu; Kolme Kruunua; Savotta; Lappi Ravintola; Konstan Möljä; Ravintola Salve; Kappeli; Suomenlinnan Panimo; Vanha Kauppahalli; Hakaniemen Kauppahalli; Kauppatori; Cafe Regatta; Fazer Café Kluuvikatu; Ekberg; Café Engel

Already in the app — things to do: Linnanmäki Amusement Park / Linnanmäki; Korkeasaari Zoo / Korkeasaaren eläintarha; Heureka Science Centre / Tiedekeskus Heureka; Suomenlinna Sea Fortress / Suomenlinna; SEA LIFE Helsinki / SEA LIFE Helsinki; Oodi Central Library / Keskustakirjasto Oodi; Helsinki City Museum and Children's Town / Helsingin kaupunginmuseo, Lasten kaupunki; Seurasaari Open-Air Museum / Seurasaaren ulkomuseo; Old Market Hall / Vanha Kauppahalli; Natural History Museum / Luonnontieteellinen museo; Serena Water Park / Serena Vesipuisto; Allas Sea Pool / Allas Sea Pool; Kaivopuisto Park and playground / Kaivopuisto; Architecture and Design Museum / Arkkitehtuuri- ja designmuseo; Kiasma Museum of Contemporary Art

### fr-alps — Chamonix and Annecy (France)
Area covered: Chamonix and Annecy (also known as / includes: chamonix, mont blanc, aiguille du midi, mer de glace)

Already in the app — places to eat: La Calèche; Le Monchu; La Maison Carrier; La Crèmerie du Glacier; Le Freti; Chez Mamie Lise; L'Étage; Poco Loco; Marché de la Vieille Ville d'Annecy; Aux Petits Gourmands; Chalet 4810; Glacier des Alpes; Le Fidèle Berger

Already in the app — things to do: Aiguille du Midi cable car; Mer de Glace and the Montenvers train; Mont Blanc Tramway; Lake Annecy boat cruise; Annecy Castle museum / Musée-Château d'Annecy; Palais de l'Île; Gorges du Fier; Richard Bozon swimming pool; Annecy old town market; Mont Blanc Museum / Musée du Mont-Blanc; Le Pâquier lakeside park; Annecy old town and canals; Chamonix Alpine coaster and Planards park; Lake Annecy Ecomuseum; Albigny beach

### fr-lyon — Lyon (France)
Area covered: Lyon (also known as / includes: lyon, vieux lyon, fourviere, tete d'or)

Already in the app — places to eat: Brasserie Georges; Daniel et Denise Saint-Jean; Le Poêlon d'Or; Café Comptoir Abel; Brasserie Le Nord; Brasserie L'Est; Le Bouchon des Filles; Les Lyonnais; Les Halles de Lyon Paul Bocuse; Marché Saint-Antoine; Terre Adélice; Nardone; Bernachon; Pralus

Already in the app — things to do: Musée des Confluences; Aquarium de Lyon; Parc de la Tête d'Or and its free zoo; Fourvière funicular / Funiculaire F2; Gadagne museums and the puppet museum / Musées Gadagne; Lumière Museum / Musée Lumière; Halles de Lyon Paul Bocuse; Lugdunum museum and Roman theatres; Miniature and Cinema Museum / Musée Cinéma et Miniature; Théâtre Le Guignol de Lyon; Planétarium de Vaulx-en-Velin; Croix-Rousse food market; Grand Parc Miribel Jonage; The traboules of Vieux Lyon; Place Bellecour
