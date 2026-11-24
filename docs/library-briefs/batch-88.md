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
Area covered: Cancún and the Yucatán (also known as / includes: cancun, yucatan, riviera maya, tulum, playa del carmen, chichen itza)

Now in the app: 17 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: La Habichuela; La Parrilla; El Fish Fritanga; La Cueva del Chango; Los Aguachiles; El Fogón; Burrito Amor; La Chaya Maya; El Mesón del Marqués; Mercado 28; Taquería Honorio; Ah Cacao Chocolate Café; Chez Céline; Dulcería y Sorbetería Colón; Ki'Xocolatl; Porfirio's Cancún; Porfirio's Mérida

Already in the app — things to do: Xcaret Park; Xel-Há Park; Chichén Itzá archaeological site / Zona Arqueológica de Chichén Itzá; Cenote Ik Kil; Tulum archaeological site / Zona Arqueológica de Tulum; Cobá ruins / Zona Arqueológica de Cobá; Maya Museum of Cancún and San Miguelito / Museo Maya de Cancún; Xenses; Garrafón Park, Isla Mujeres; Crococun Zoo; Cancún Interactive Aquarium; Playa Delfines; Playa Las Perlas; Parque de las Palapas; Mercado 28; Playa Hermosa Caleta; Gran Parque La Plancha; Museo de la Luz; Palacio de la Música; Uxmal; La Peni light show / La Peni

### pe-cusco — Cusco, Machu Picchu and Titicaca (Peru)
Area covered: Cusco, Machu Picchu and Titicaca (also known as / includes: cusco, cuzco, machu picchu, sacred valley, aguas calientes, rainbow mountain)

Now in the app: 16 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Pachapapa; Morena Peruvian Kitchen; Inka Grill; Jack's Café; Chicha por Gastón Acurio; Indio Feliz; Tunupa Valle Sagrado; Mercado Central de San Pedro; Horno Colonial San Francisco; La Boulangerie de Paris; Qucharitas; ChocoMuseo; Pirwa Restaurant; Green Point; L'Atelier Café Concept; Cappuccino Cusco Cafe

Already in the app — things to do: Machu Picchu / Llaqta de Machu Picchu; Sacsayhuamán; Moray terraces; Maras salt pans / Salineras de Maras; Pisac ruins / Parque Arqueológico de Pisaq; Pisac market; Ollantaytambo ruins; Awana Kancha alpaca centre; San Pedro Market / Mercado Central de San Pedro; Machu Picchu Museum (Casa Concha); Cusco Planetarium; ChocoMuseo Cusco; Plaza de Armas, Cusco; San Blas viewpoint; Cristo Blanco; Inka Museum; Regional Historical Museum of Cusco; Museo de Arte Precolombino (MAP); Center for Traditional Textiles of Cusco; Qorikancha; Plaza Regocijo; Plaza San Blas

### ae-abudhabi — Abu Dhabi, Al Ain and Liwa (United Arab Emirates)
Area covered: Abu Dhabi, Al Ain and Liwa (also known as / includes: abu dhabi, yas island, saadiyat, liwa, al ain, sir bani yas)

Now in the app: 14 places to eat, 23 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Al Mrzab Traditional Restaurant; Meylas; Al Fanar Restaurant & Café Abu Dhabi; Al Dhafra Restaurant; India Palace; Min Zaman; Al Badiya; Bait El Khetyar / بيت الختيار; Yas Mall Food Court; Al Ain Mall Food Court; Le Café; Jones the Grocer; Sidekicks; Crust

Already in the app — things to do: Louvre Abu Dhabi and its Children's Museum; Qasr Al Watan; Warner Bros. World Abu Dhabi; Ferrari World Abu Dhabi; SeaWorld Yas Island; Yas Waterworld; Al Ain Zoo; Emirates Park Zoo; Corniche Beach; Jubail Mangrove Park; Al Jahili Fort; Umm Al Emarat Park; Al Hosn Cultural Foundation and House of Artisans; Heritage Village; KidZania Abu Dhabi; Al Bateen Beach; Natural History Museum Abu Dhabi; Zayed National Museum; teamLab Phenomena Abu Dhabi; The National Aquarium; Orange Wheels; Air Maniax; Mission: Play! by Mattel

### ar-buenosaires — Buenos Aires and Iguazú (Argentina)
Area covered: Buenos Aires and Iguazú (also known as / includes: buenos aires, la boca, caminito, san telmo, recoleta, iguazu)

Now in the app: 18 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: La Brigada; La Cabrera; El Desnivel; Pizzería Güerrin; El Cuartito; El Sanjuanino; Siga la Vaca; La Rueda 1975; Aqva Restaurant; El Quincho del Tío Querido; Mercado de San Telmo; Fortín Cataratas; Café Tortoni; La Biela; Rapanui; Cadore; Aida Restaurante & Café; Ragazzi

Already in the app — things to do: Ecoparque Buenos Aires; Japanese Garden / Jardín Japonés; Costanera Sur Ecological Reserve / Reserva Ecológica Costanera Sur; Galileo Galilei Planetarium / Planetario Galileo Galilei; Abasto Children's Museum / Museo de los Niños Abasto; Carlos Thays Botanical Garden / Jardín Botánico Carlos Thays; Rosedal and the Palermo woods / Rosedal y Bosques de Palermo; San Telmo Sunday fair / Feria de San Telmo; Tigre and the Paraná Delta; Parque de la Costa; Iguazú Falls (Argentine side) / Parque Nacional Iguazú; Teatro Colón guided tour; National Museum of Fine Arts; Argentine Museum of Natural Sciences; MIJU – Museum of Imagination and Play; Parque Saint Tropez; Parque de los Niños; Comic Strip Walk (Paseo de la Historieta); Participative Science Museum / Museo Participativo de Ciencias
