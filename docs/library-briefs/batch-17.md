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

### ie-ireland — Dublin and the west coast (Ireland)
Area covered: Dublin and the west coast (also known as / includes: dublin, galway, cliffs of moher, ring of kerry)

Already in the app — places to eat: The Woollen Mills; Gallagher's Boxty House; Elephant & Castle; McDonagh's; Ard Bia at Nimmos; The Dough Bros; Gus O'Connor's Pub; Bricín; Quinlan's Seafood Bar; Leo Burdock; Galway Market; Bewley's Grafton Street; Queen of Tarts; Murphy's Ice Cream

Already in the app — things to do: Dublin Zoo; Cliffs of Moher Visitor Experience; National Leprechaun Museum; Dublinia; Phoenix Park; Phoenix Park Visitor Centre and Ashtown Castle; National Botanic Gardens, Glasnevin; Malahide Castle and Gardens; Howth village and harbour; National Aquarium of Ireland (Galway Atlantaquaria); Galway Christmas Market; Aillwee Cave and Burren Birds of Prey Centre; Bunratty Castle and Folk Park; Connemara National Park; Connemara Pony Heritage Centre

### in-golden — Delhi, Agra and Jaipur (India)
Area covered: Delhi, Agra and Jaipur (also known as / includes: delhi, new delhi, agra, taj mahal)

Already in the app — places to eat: Karim's; Saravana Bhavan; Moti Mahal; United Coffee House; Haldiram's Chandni Chowk; Dilli Haat INA; Wenger's; Pinch of Spice; Shankara Vegis Restaurant; Maya Restaurant; Panchhi Petha; Laxmi Mishthan Bhandar; Niros; Chokhi Dhani; Masala Chowk; Rawat Mishthan Bhandar; Lassiwala; Tapri Central

Already in the app — things to do: Taj Mahal; Agra Fort; Mehtab Bagh; Red Fort; Lodhi Garden; Dilli Haat INA; National Science Centre; National Rail Museum; Amber Fort; Hawa Mahal; Jantar Mantar; Albert Hall Museum; Humayun's Tomb; Sunder Nursery; City Palace, Jaipur

### is-reykjavik — Reykjavík and the Golden Circle (Iceland)
Area covered: Reykjavík and the Golden Circle (also known as / includes: reykjavik, golden circle, geysir, gullfoss)

Already in the app — places to eat: Sægreifinn; Icelandic Street Food; Messinn; Café Loki; Tommi's Burger Joint; Þrír Frakkar; Reykjavik Fish Restaurant; Friðheimar; Efstidalur II; Bæjarins Beztu Pylsur; Hlemmur Mathöll; Gullfoss Kaffi; Brauð & Co; Sandholt; Valdís; Mokka Kaffi

Already in the app — things to do: Perlan: Wonders of Iceland / Perlan; Reykjavík Family Park and Zoo / Fjölskyldu- og húsdýragarðurinn; Whales of Iceland / Hvalasýning; Laugardalslaug swimming pool / Laugardalslaug; Nauthólsvík geothermal beach / Ylströndin í Nauthólsvík; Árbær Open Air Museum / Árbæjarsafn; National Museum of Iceland / Þjóðminjasafn Íslands; The Settlement Exhibition (Reykjavík 871±2) / Landnámssýningin; Reykjavík Art Museum / Listasafn Reykjavíkur; FlyOver Iceland / FlyOver Iceland; Þingvellir National Park / Þingvellir; Geysir and Strokkur geothermal area / Geysir, Strokkur; Gullfoss waterfall / Gullfoss; Friðheimar tomato farm / Friðheimar; Blue Lagoon / Bláa Lónið

### it-amalfi — The Amalfi Coast and Pompeii (Italy)
Area covered: The Amalfi Coast and Pompeii (also known as / includes: amalfi, amalfi coast, positano, sorrento)

Already in the app — places to eat: Chez Black; La Tagliata; Da Vincenzo; Trattoria Da Maria; Ristorante O'Parrucchiano La Favorita; Trattoria Da Emilia; Cumpà Cosimo; Add'ù Mimì; Caupona; Pizzeria Da Franco; Cuoppo d'Amalfi; Pasticceria Pansa; Sal De Riso; Gelateria Primavera; Collina Positano Bakery

Already in the app — things to do: Pompeii Archaeological Park / Parco Archeologico di Pompei; Herculaneum Archaeological Park / Parco Archeologico di Ercolano; Vesuvius, Gran Cono trail / Vesuvio, Sentiero del Gran Cono; Villa Rufolo gardens, Ravello / Villa Rufolo; Villa Cimbrone gardens, Ravello / Giardini di Villa Cimbrone; Paper Museum, Amalfi / Museo della Carta; Emerald Grotto / Grotta dello Smeraldo; Reggia di Caserta and Royal Park / Reggia di Caserta; National Archaeological Museum of Naples / MANN – Museo Archeologico Nazionale di Napoli; Maiori beach / Spiaggia di Maiori; Positano, Spiaggia Grande / Spiaggia Grande, Positano; Paestum Archaeological Park / Parco Archeologico di Paestum; Path of the Gods / Sentiero degli Dei; Valley of the Mills walk, Amalfi / Valle dei Mulini; Lemon Path, Maiori to Minori / Sentiero dei Limoni
