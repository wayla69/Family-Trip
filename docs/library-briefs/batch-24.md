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

### tr-pamukkale — Pamukkale (Türkiye)
Area covered: Pamukkale (also known as / includes: pamukkale, hierapolis, denizli, ephesus)

Already in the app — places to eat: Kayaş Restaurant & Wine House; Mehmet's Heaven; Tıkır Grill House; Lamuko's Lokanta; Teras Restaurant; Gurme Restaurant Cafe; Mustafa Restaurant; Kebapçı Enver; Traverten Pide; Antique Pool Cafeteria; Forum Çamlık; Hiera Coffee & Tea House; Hacı Şerif

Already in the app — things to do: Pamukkale travertine terraces / Pamukkale Travertenleri; Hierapolis ancient city / Hierapolis Antik Kenti; Hierapolis Archaeology Museum / Hierapolis Arkeoloji Müzesi; Cleopatra's Antique Pool / Antik Havuz; Laodicea ancient city / Laodikeia Antik Kenti; Karahayıt red springs / Karahayıt Kırmızı Su; Pamukkale hot air balloon flight; Kaklık Cave / Kaklık Mağarası; Seyir Tepesi urban forest / Seyir Tepesi; Denizli Cable Car and Bağbaşı Plateau / Denizli Teleferik; Halıcı Ahmet Urkay Museum / Halıcı Ahmet Urkay Müzesi; Denizli Atatürk House and Ethnographic Museum / Denizli Atatürk Evi ve Etnografya Müzesi; İncilipınar Park / İncilipınar Parkı; Denizli Rag Doll House Museum / Denizli Bez Bebek Evi Müzesi; Sinpaş Aquamall

### us-boston — Boston (The United States)
Area covered: Boston (also known as / includes: boston, beacon hill, freedom trail, boston common)

Already in the app — places to eat: Union Oyster House; Legal Sea Foods; Regina Pizzeria; The Paramount; The Barking Crab; Mr. Bartley's Burger Cottage; Summer Shack; Antico Forno; Quincy Market; Boston Public Market; Eataly Boston; James Hook & Co.; Mike's Pastry; Modern Pastry; Tatte Bakery & Café; Flour Bakery + Cafe

Already in the app — things to do: Boston Children's Museum; Museum of Science; New England Aquarium; Franklin Park Zoo; Swan Boats in the Public Garden; Freedom Trail and Boston National Historical Park; Faneuil Hall; USS Constitution and its museum; Boston Tea Party Ships and Museum; Museum of Fine Arts, Boston; Harvard Museum of Natural History; Boston Harbor Islands ferry; Arnold Arboretum; Boston Public Library, Central Library; Boston Common and the Frog Pond

### us-chicago — Chicago (The United States)
Area covered: Chicago (also known as / includes: chicago, navy pier, millennium park, lake michigan)

Already in the app — places to eat: Lou Malnati's Pizzeria; Giordano's; Pizzeria Uno; Gino's East; The Berghoff; Lou Mitchell's; Wildberry Pancakes and Cafe; R.J. Grunts; Portillo's; Al's #1 Italian Beef; Eataly Chicago; Chicago French Market; Garrett Popcorn Shops; Stan's Donuts & Coffee; Margie's Candies

Already in the app — things to do: Shedd Aquarium; The Field Museum; Adler Planetarium; Griffin Museum of Science and Industry; Chicago Children's Museum; Lincoln Park Zoo; Peggy Notebaert Nature Museum; Art Institute of Chicago; Millennium Park and Cloud Gate; Maggie Daley Park; Navy Pier Centennial Wheel; Lincoln Park Conservatory; Garfield Park Conservatory; Chicago Riverwalk; Christkindlmarket Chicago; Brookfield Zoo Chicago

### us-dc — Washington DC (The United States)
Area covered: Washington DC (also known as / includes: washington dc, national mall, smithsonian, white house)

Already in the app — places to eat: Old Ebbitt Grill; Founding Farmers; Ted's Bulletin; Clyde's of Georgetown; Carmine's; Jaleo; Ben's Chili Bowl; Mitsitam Native Foods Cafe; Sweet Home Café; Union Market; Georgetown Cupcake; Baked & Wired; Thomas Sweet

Already in the app — things to do: Smithsonian's National Zoo; National Air and Space Museum; National Museum of Natural History; National Museum of American History; Smithsonian Carousel on the National Mall; National Gallery of Art; National Gallery of Art Sculpture Garden; United States Botanic Garden; U.S. Capitol Visitor Center; Library of Congress Jefferson Building; Union Market; Eastern Market and Sunday flea market; Kenilworth Park and Aquatic Gardens; Tidal Basin and paddle boats; Lincoln Memorial and Reflecting Pool
