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

### lu-luxembourg — Luxembourg City and Vianden (Luxembourg)
Area covered: Luxembourg City and Vianden (also known as / includes: luxembourg city, vianden, casemates, mullerthal)

Already in the app — places to eat: Brasserie Guillaume; Am Tiirmschen; Um Dierfgen; Mousel's Cantine; Auberge Aal Veinen; Hotel Petry; Hôtel Victor Hugo; Kaempff-Kohler; Chocolate House Nathalie Bonn; Oberweis; Namur; Ancien Cinéma Café Club

Already in the app — things to do: Luxembourg Science Center; Parc Merveilleux; Vianden Castle; Vianden chairlift; Bock Casemates / Casemates du Bock; National Museum of Natural History (Natur Musée); Lëtzebuerg City Museum; Villa Vauban (Luxembourg City Art Museum); Winterlights Christmas markets; Pfaffenthal panoramic lift; Chemin de la Corniche; Kinnekswiss Park; Merl Park inclusive playground; Echternach adventure playground; Heringer Millen adventure playground

### ma-fes — Fes, Chefchaouen and Meknes (Morocco)
Area covered: Fes, Chefchaouen and Meknes (also known as / includes: fes, fes el bali, chefchaouen, chaouen)

Already in the app — places to eat: Café Clock Fez; The Ruined Garden; Dar Hatim; Chez Rachid; Thami's; Fez Café; Bab Ssour; Restaurant Aladdin; Restaurant Tissemlal; Café Clock Chefchaouen; Collier de la Colombe; Bab Boujloud food stalls; Borj Fez Mall food court; Place el-Hedim food stalls; Made in M; Cinema Café

Already in the app — things to do: Jnan Sbil Gardens / Jardin Jnan Sbil; Fes el-Bali medina / فاس البالي; Chouara Tannery viewpoint / Tannerie Chouara; Nejjarine Museum of Wooden Arts and Crafts / Musée Nejjarine; Dar Batha Museum / Musée Dar Batha; Borj Nord arms museum / Borj Nord; Volubilis Roman ruins / Volubilis; Heri es-Souani granaries / Heri es-Souani; Azrou cedar forest and Ifrane / Forêt de cèdres d'Azrou; Ras el Maa waterfall, Chefchaouen / Ras El Maa; Chefchaouen Kasbah and museum / Kasbah Chefchaouen; Bab Boujloud (the Blue Gate); Bou Inania Madrasa; Al-Attarine Madrasa; Merenid Tombs viewpoint

### ma-marrakech — Marrakech and the Atlas (Morocco)
Area covered: Marrakech and the Atlas (also known as / includes: marrakech, marrakesh, atlas mountains, high atlas)

Already in the app — places to eat: Nomad; Le Jardin; Chez Chegrouni; Al Fassia; Café Clock Marrakech; Terrasse des Épices; Naranj; Amal Women's Training Center; Kasbah du Toubkal; Kasbah Bab Ourika; Jemaa el-Fna food stalls; Chez Lamine Hadj Mustapha; Pâtisserie des Princes; Café des Épices; Bacha Coffee; Pâtisserie Amandine

Already in the app — things to do: Jardin Majorelle / Jardin Majorelle; Yves Saint Laurent Museum / Musée Yves Saint Laurent Marrakech; Oasiria water park / Oasiria; Anima Garden / ANIMA Garden; Le Jardin Secret / Le Jardin Secret; Menara Gardens / Jardins de la Ménara; Cyber Park / Cyber Parc Arsat Moulay Abdeslam; Lalla Hasna Park / Parc Lalla Hasna; Jemaa el-Fnaa square / ساحة جامع الفنا; Maison de la Photographie / Maison de la Photographie de Marrakech; Bahia Palace / Palais de la Bahia; Marrakech Museum / Musée de Marrakech; Ourika Valley and Setti Fatma waterfalls / Vallée de l'Ourika; Kawkab Jeux indoor play centre; Hot-air balloon over the Agafay Desert

### mt-valletta — Valletta and Gozo (Malta)
Area covered: Valletta and Gozo (also known as / includes: valletta, mdina, gozo, comino)

Already in the app — places to eat: Nenu the Artisan Baker; Rubino; Trabuxu Bistro; Ta' Rikardu; The Boathouse; Ta' Karolina; Country Terrace; Tatita's; Is-Suq tal-Belt; Piadina Caffe; Maxokk Bakery; Mekren's Bakery; Caffe Cordina; Museum Café; Café Jubilee

Already in the app — things to do: Malta National Aquarium; Esplora Interactive Science Centre; Popeye Village; Playmobil FunPark; Upper Barrakka Gardens; Fort St Elmo and the National War Museum; Christmas in the Capital, Valletta; Mdina Experience; Marsaxlokk Sunday market; Ħaġar Qim and Mnajdra Archaeological Park; Għar Dalam Cave and Museum; Għadira Bay; Cittadella (the Citadel), Victoria, Gozo; Ġgantija Temples; Ramla Bay, Gozo
