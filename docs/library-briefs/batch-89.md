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

### p-disney-paris — Disneyland Paris (France)
Area covered: Disneyland Paris (also known as / includes: disneyland paris, disneyland, marne-la-vallee, disney village)

Now in the app: 32 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Bistrot Chez Rémy; Captain Jack's; Agrabah Café; Silver Spur Steakhouse; Walt's – an American Restaurant; The Steakhouse; Brasserie Rosalie; Casey's Corner; Colonel Hathi's Pizza Outpost; Au Chalet de la Marionnette; Earl of Sandwich; Cable Car Bake Shop; The Gibson Girl Ice Cream Parlour; Starbucks Disney Village; McDonald's Disney Village; Auberge de Cendrillon; Royal Banquet; Café Hyperion; Lucky Nugget Saloon; Pym Kitchen; Stark Factory; Super Diner; Market House Deli; Last Chance Café; Casa de Coco; Cowboy Cookout Barbecue; Café de la Brousse; Hakuna Matata Restaurant; The Old Mill; Pizzeria Bella Notte; Toad Hall Restaurant; Café Luminosity

Already in the app — things to do: Disneyland Park; Disney Adventure World; Disney Village; Grand Noël at Château de Vaux-le-Vicomte / Le Grand Noël, Vaux-le-Vicomte; Parc Astérix; France Miniature; Provins medieval town and ramparts; Les Aigles des Remparts, Provins; Sea Life Val d'Europe; Château de Fontainebleau; Lumigny Safari Reserve (Parc des Félins); Terre de Singes; Musée de la Grande Guerre, Meaux; Jablines-Annet leisure island; La Vallée Village outlet; Aqua Mundo at Villages Nature Paris / Aqua Mundo (formerly Aqualagon); Parrot World; Imagi Park; PanoraMagique balloon

### us-dc — Washington DC (United States)
Area covered: Washington DC (also known as / includes: washington dc, washington d.c., national mall, smithsonian, white house, capitol hill)

Now in the app: 25 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Old Ebbitt Grill; Founding Farmers; Ted's Bulletin; Clyde's of Georgetown; Carmine's; Jaleo; Ben's Chili Bowl; Mitsitam Native Foods Cafe; Sweet Home Café; Union Market; Georgetown Cupcake; Baked & Wired; Thomas Sweet; Silver Diner (Navy Yard); The Roost; Florida Avenue Grill; Kura Revolving Sushi Bar (Chinatown); 2 Amys; Comet Ping Pong; Medium Rare (Cleveland Park); Open City; Unconventional Diner; bartaco (The Wharf); Hard Rock Cafe Washington DC; Baked by Yael

Already in the app — things to do: Smithsonian's National Zoo; National Air and Space Museum; National Museum of Natural History; National Museum of American History; Smithsonian Carousel on the National Mall; National Gallery of Art; National Gallery of Art Sculpture Garden; United States Botanic Garden; U.S. Capitol Visitor Center; Library of Congress Jefferson Building; Union Market; Eastern Market and Sunday flea market; Kenilworth Park and Aquatic Gardens; Tidal Basin and paddle boats; Lincoln Memorial and Reflecting Pool; National Museum of the American Indian; The Yards Park; Canal Park fountains / Washington Canal Park; National Building Museum; Folger Shakespeare Library; Planet Word; International Spy Museum; The Phillips Collection; Museum of the Bible; O Museum in the Mansion; National Museum of Women in the Arts

### it-amalfi — The Amalfi Coast and Pompeii (Italy)
Area covered: The Amalfi Coast and Pompeii (also known as / includes: amalfi, amalfi coast, positano, sorrento, capri, pompeii)

Now in the app: 26 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Chez Black; La Tagliata; Da Vincenzo; Trattoria Da Maria; Ristorante O'Parrucchiano La Favorita; Trattoria Da Emilia; Cumpà Cosimo; Add'ù Mimì; Caupona; Pizzeria Da Franco; Cuoppo d'Amalfi; Pasticceria Pansa; Sal De Riso; Gelateria Primavera; Collina Positano Bakery; Il Fornillo; Capricci; Maria Grazia; Acquapazza; Hostaria Baccofurore; Al Convento; Pescheria CICA con Cucina; La Frittura del Golfo; I Due Fratelli; Pasticceria Russo; Il Mulino

Already in the app — things to do: Pompeii Archaeological Park / Parco Archeologico di Pompei; Herculaneum Archaeological Park / Parco Archeologico di Ercolano; Vesuvius, Gran Cono trail / Vesuvio, Sentiero del Gran Cono; Villa Rufolo gardens, Ravello / Villa Rufolo; Villa Cimbrone gardens, Ravello / Giardini di Villa Cimbrone; Paper Museum, Amalfi / Museo della Carta; Emerald Grotto / Grotta dello Smeraldo; Reggia di Caserta and Royal Park / Reggia di Caserta; National Archaeological Museum of Naples / MANN – Museo Archeologico Nazionale di Napoli; Maiori beach / Spiaggia di Maiori; Positano, Spiaggia Grande / Spiaggia Grande, Positano; Paestum Archaeological Park / Parco Archeologico di Paestum; Path of the Gods / Sentiero degli Dei; Valley of the Mills walk, Amalfi / Valle dei Mulini; Lemon Path, Maiori to Minori / Sentiero dei Limoni; MAR Roman Archaeological Museum / Museo Archeologico Romano; Fornillo beach / Spiaggia di Fornillo; Arienzo beach / Spiaggia di Arienzo; Santa Maria Assunta church / Chiesa di Santa Maria Assunta; Marina Grande; Villa Fiorentino park; Villa Comunale; Bagni della Regina Giovanna; Ceramics Museum, Villa Guariglia / Museo della Ceramica di Villa Guariglia; Amalfi Cathedral / Duomo di Sant'Andrea; Valle delle Ferriere

### th-krabi — Krabi and Phi Phi (Thailand)
Area covered: Krabi and Phi Phi (also known as / includes: krabi, ao nang, railay, phi phi, koh lanta)

Now in the app: 26 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Ruen Mai / เรือนไม้; Krua Thara / ครัวธารา; Kotung / โกตุง; Lae Lay Grill; D&E's Jungle Kitchen; KoDam Kitchen / ครัวโกดำ; Wang Sai Seafood / วังทรายซีฟู้ด; Papaya Restaurant; Garlic 1992; Krabi Town Walking Street / ถนนคนเดินกระบี่; Chao Fah Night Market / ตลาดโต้รุ่งท่าเรือเจ้าฟ้า; Ao Nang Landmark Night Market; Café 8.98; Pee Pee Bakery; Thongyib Thongyod / ทองหยิบทองหยอดคาเฟ่; Pum Thai Restaurant; Ton Ma Yom / ร้านอาหารต้นมะยม; Gecko Cabane; Chalita Cafe / ร้านอาหารชลิตาคาเฟ่; Burger Bung / เบอร์เกอร์บัง; Ruanthip (Khlong Son) / ร้านอาหารเรือนทิพย์ (คลองสน); Baan Ma-Ying / ร้านอาหารบ้านมะหญิง; Baan Tha Ley Cafe / บ้านทะเล คาเฟ่ กระบี่; Makan Tam Saep and Coffee / มากัน ตำแซ่บ แอนด์ คอฟฟี่; Sprucy Cafe / ร้านสพรูซี่คาเฟ่; Cha-Lom / ร้านอาหารชะลอม

Already in the app — things to do: Ao Nang Beach; Nopparat Thara Beach; Railay Beach; Krabi 4 Islands tour; Emerald Pool; Khlong Thom Hot Springs; Than Bok Khorani National Park; Tha Pom Khlong Song Nam; Tiger Cave Temple; Wat Khlong Thom Museum; Klang Cave; Shell Fossil Cemetery; Krabi Town Walking Street; Thara Park; Ao Nang Landmark Night Market; The Fun Garden; Krabi Aquarium; Hong Island (Koh Hong) / เกาะห้อง; Maya Bay; Koh Phi Phi Don; Blue Pool (Sa Nam Phut); Khlong Muang Beach / หาดคลองม่วง; Tubkaek Beach; Kayaking on Ao Thalane; Dragon's Crest (Khao Ngon Nak); HarborLand Central Krabi
