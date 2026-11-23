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

### dk-copenhagen — Copenhagen (Denmark)
Area covered: Copenhagen (also known as / includes: copenhagen, kobenhavn, nyhavn, tivoli)

Already in the app — places to eat: Restaurant Schønnemann; Aamanns 1921; Restaurant Kronborg; Det Lille Apotek; Nyhavns Færgekro; Grøften; Mother; RizRaz; Torvehallerne; Tivoli Food Hall; DØP; Conditori La Glace; Sankt Peders Bageri; Paludan Bog & Café; Vaffelbageren

Already in the app — things to do: Tivoli Gardens / Tivoli; Experimentarium / Experimentarium; Copenhagen Zoo / Zoologisk Have; Den Blå Planet, National Aquarium Denmark / Den Blå Planet; The National Museum of Denmark / Nationalmuseet; Planetarium / Planetarium (Tycho Brahe); Rosenborg Castle / Rosenborg Slot; The Netto boats canal tour / Netto-Bådene; Torvehallerne food market / Torvehallerne; Bakken amusement park / Dyrehavsbakken; Louisiana Museum of Modern Art and Children's Wing / Louisiana; Frederiksborg Castle / Frederiksborg Slot; Kongens Have pirate-ship playground / Kongens Have; Nyhavn / Nyhavn; Christiansborg Tower / Tårnet, Christiansborg

### ee-tallinn — Tallinn (Estonia)
Area covered: Tallinn (also known as / includes: tallinn, toompea, viru gate, kadriorg)

Already in the app — places to eat: Olde Hansa; Rataskaevu 16; Väike Rataskaevu 16; Peppersack; F-Hoone; Kompressor; III Draakon; Balti Jaama Turg; Lido Solaris; Maiasmokk; Pierre Chocolaterie; RØST; Kehrwieder Saiakang

Already in the app — things to do: Seaplane Harbour (Lennusadam) / Lennusadam; Estonian Open Air Museum / Eesti Vabaõhumuuseum; Tallinn Zoo / Tallinna Loomaaed; Children's Museum Miiamilla / Lastemuuseum Miiamilla; Kumu Art Museum / Kumu kunstimuuseum; Energy Discovery Centre / Energia avastuskeskus; Tallinn TV Tower / Tallinna teletorn; Tallinn Botanic Garden / Tallinna Botaanikaaed; Tallinn Old Town / Tallinna vanalinn; Kadriorg Park / Kadrioru park; Balti Jaama Turg market / Balti jaama turg; Tallinn Christmas Market / Tallinna jõuluturg; Kiek in de Kök and Bastion Tunnels / Kiek in de Kök; Science Centre SkyLab / Teaduskeskus SkyLab; PROTO Invention Factory / PROTO avastustehas

### eg-cairo — Cairo and Giza (Egypt)
Area covered: Cairo and Giza (also known as / includes: cairo, giza, saqqara, dahshur)

Already in the app — places to eat: Felfela / فلفلة; Abou El Sid / أبو السيد; Naguib Mahfouz Café; Andrea El Mariouteya; 9 Pyramids Lounge; 139 Pavilion; Taboula; Maison Thomas; Kebdet El Prince / كبدة البرنس; Abou Tarek / كشري أبو طارق; Zooba / زوبا; Koshary El Tahrir / كشري التحرير; El Abd Patisserie / حلواني العبد; Mandarine Koueider; Simonds

Already in the app — things to do: Grand Egyptian Museum / المتحف المصري الكبير; Giza Pyramids and Sphinx / أهرامات الجيزة; National Museum of Egyptian Civilization / المتحف القومي للحضارة المصرية; Egyptian Museum, Tahrir / المتحف المصري بالتحرير; Cairo Citadel of Saladin / قلعة صلاح الدين; Khan el-Khalili bazaar / خان الخليلي; Al-Azhar Park / حديقة الأزهر; Pharaonic Village / القرية الفرعونية; Child Museum, Al Salam; Manial Palace Museum / قصر المنيل; Saqqara and the Step Pyramid / سقارة; Cairo Tower / برج القاهرة; Felucca ride on the Nile; Aquarium Grotto Garden; Merryland Park; Family Park; Al Zohriya Garden

### es-madrid — Madrid (Spain)
Area covered: Madrid (also known as / includes: madrid, retiro, plaza mayor, royal palace)

Already in the app — places to eat: Sobrino de Botín; Casa Mingo; La Barraca; Malacatín; La Bola; Los Galayos; Posada de la Villa; Lateral Santa Ana; La Sanabresa; Mercado de San Miguel; La Campana; Museo del Jamón; Gourmet Experience Callao; Chocolatería San Ginés; La Mallorquina; Chocolatería Valor

Already in the app — things to do: Zoo Aquarium Madrid / Zoo Aquarium de Madrid; Parque de Atracciones de Madrid / Parque de Atracciones de Madrid; Faunia / Faunia; National Museum of Natural Sciences / Museo Nacional de Ciencias Naturales; Retiro Park and the boat lake / Parque del Retiro; Railway Museum / Museo del Ferrocarril; Madrid Planetarium / Planetario de Madrid; Royal Palace of Madrid / Palacio Real de Madrid; Santiago Bernabéu stadium tour / Tour Santiago Bernabéu; Parque Warner Madrid / Parque Warner Madrid; San Miguel Market / Mercado de San Miguel; Casa de Campo lake / Lago de la Casa de Campo; Prado Museum / Museo del Prado; Templo de Debod / Templo de Debod; Thyssen-Bornemisza Museum / Museo Thyssen-Bornemisza; CaixaForum Madrid / CaixaForum Madrid
