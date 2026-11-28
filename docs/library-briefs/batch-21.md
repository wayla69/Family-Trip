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

### mx-yucatan — Cancún and the Yucatán (Mexico)
Area covered: Cancún and the Yucatán (also known as / includes: cancun, yucatan, riviera maya, tulum)

Already in the app — places to eat: La Habichuela; La Parrilla; El Fish Fritanga; La Cueva del Chango; Los Aguachiles; El Fogón; Burrito Amor; La Chaya Maya; El Mesón del Marqués; Mercado 28; Taquería Honorio; Ah Cacao Chocolate Café; Chez Céline; Dulcería y Sorbetería Colón; Ki'Xocolatl

Already in the app — things to do: Xcaret Park; Xel-Há Park; Chichén Itzá archaeological site / Zona Arqueológica de Chichén Itzá; Cenote Ik Kil; Tulum archaeological site / Zona Arqueológica de Tulum; Cobá ruins / Zona Arqueológica de Cobá; Maya Museum of Cancún and San Miguelito / Museo Maya de Cancún; Xenses; Garrafón Park, Isla Mujeres; Crococun Zoo; Cancún Interactive Aquarium; Playa Delfines; Playa Las Perlas; Parque de las Palapas; Mercado 28

### no-bergen — Bergen and the fjords (Norway)
Area covered: Bergen and the fjords (also known as / includes: bergen, bryggen, flam, geiranger)

Already in the app — places to eat: Bryggeloftet & Stuene; Pingvinen; Bryggen Tracteursted; Fish Me; Egon Kjøttbasaren; Villani; Fløien Folkerestaurant; Ægir BrewPub; Tre Brør Café; Fisketorget; Søstrene Hagelin; Trekroneren; Baker Brun; Godt Brød; Flåm Bakery

Already in the app — things to do: Bergen Aquarium / Akvariet i Bergen; Fløibanen funicular / Fløibanen; Fløyen playground and Troll Forest / Fløyen lekeplass; Bergen Science Centre VilVite / VilVite; Ulriken643 cable car / Ulriksbanen; Old Bergen Museum / Gamle Bergen Museum; Bergen Fish Market / Fisketorget; Bergen Maritime Museum / Sjøfartsmuseet; University Museum of Bergen, natural history / Universitetsmuseet i Bergen; KODE art museums / KODE Kunstmuseer; The Hanseatic Museum and Schøtstuene / Det Hanseatiske Museum og Schøtstuene; Bryggens Museum / Bryggens Museum; Bergens Tekniske Museum and vintage tram / Bergens Tekniske Museum; Fjord cruise to Mostraumen / Fjordcruise Bergen – Mostraumen; The Flåm Railway / Flåmsbana

### no-tromso — Tromsø (Norway)
Area covered: Tromsø (also known as / includes: tromso, lofoten, svalbard, north cape)

Already in the app — places to eat: Fiskekompaniet; Mathallen Tromsø; Bardus Bistro; Arctandria Sjømatrestaurant; Peppes Pizza Tromsø; Egon Tromsø; Full Steam Tromsø; Yonas Pizzeria; Raketten Bar & Pølse; Dragøy; Fjellstua Café; Kaffebønna; Risø Mat & Kaffebar; Smørtorget

Already in the app — things to do: Polaria; Science Centre of Northern Norway / Nordnorsk Vitensenter; Troll Museum; Arctic University Museum of Norway; Polar Museum / Polarmuseet; Fjellheisen cable car; Tromsøbadet; Silent whale watching by Brim Explorer; Rødne Fjord Cruise; Arctic-Alpine Botanic Garden; Telegrafbukta beach and playground; Perspektivet Folkeparken open-air museum; Prestvannet; Charlottenlund play area; Tromsø Climbing Centre family climbing

### p-disney-paris — Disneyland Paris (France)
Area covered: Disneyland Paris (also known as / includes: disneyland paris, disneyland, marne-la-vallee, disney village)

Already in the app — places to eat: Bistrot Chez Rémy; Captain Jack's; Agrabah Café; Silver Spur Steakhouse; Walt's – an American Restaurant; The Steakhouse; Brasserie Rosalie; Casey's Corner; Colonel Hathi's Pizza Outpost; Au Chalet de la Marionnette; Earl of Sandwich; Cable Car Bake Shop; The Gibson Girl Ice Cream Parlour; Starbucks Disney Village; McDonald's Disney Village; Auberge de Cendrillon; Royal Banquet; Café Hyperion; Lucky Nugget Saloon; Pym Kitchen; Stark Factory; Super Diner

Already in the app — things to do: Disneyland Park; Disney Adventure World; Disney Village; Grand Noël at Château de Vaux-le-Vicomte / Le Grand Noël, Vaux-le-Vicomte; Parc Astérix; France Miniature; Provins medieval town and ramparts; Les Aigles des Remparts, Provins; Sea Life Val d'Europe; Château de Fontainebleau; Lumigny Safari Reserve (Parc des Félins); Terre de Singes; Musée de la Grande Guerre, Meaux; Jablines-Annet leisure island; La Vallée Village outlet; Aqua Mundo at Villages Nature Paris / Aqua Mundo (formerly Aqualagon)
