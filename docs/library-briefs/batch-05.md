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

### ph-boracay — Boracay (The Philippines)
Area covered: Boracay (also known as / includes: boracay, white beach, puka beach, caticlan)

Already in the app — places to eat: Smoke Resto; Aria Cucina Italiana; Cyma Greek Taverna; The Sunny Side Cafe; Gerry's Grill Boracay; Nonie's; D'Talipapa; Mang Inasal D'Mall; Andok's; Jonah's Fruit Shake & Snack Bar; Real Coffee & Tea Cafe; Halowich; Coco Mama; Lemoni Cafe & Restaurant

Already in the app — things to do: White Beach; Puka Shell Beach; Crystal Cove Island; Motag Living Museum; D'Talipapa market; Willy's Rock; Bulabog Beach; Diniwid Beach; Mount Luho viewing deck; D'Mall; Island hopping by bangka; Boracay sunset cruise; Boracay Butterfly Garden; Fire dance show on White Beach

### au-goldcoast — The Gold Coast and Brisbane (Australia)
Area covered: The Gold Coast and Brisbane (also known as / includes: gold coast, surfers paradise, brisbane, burleigh)

Already in the app — places to eat: Pancakes in Paradise; Betty's Burgers Surfers Paradise; Currumbin Beach Vikings Surf Life Saving Club; Cavill's Steakhouse; Julius Pizzeria; Pancake Manor; Harajuku Gyoza South Bank; Charis Seafoods; Miami Marketta; Eat Street Northshore; Paddock Bakery; Gelato Messina South Brisbane; Lune Croissanterie South Brisbane; Hurricane's Grill & Bar; La Playa; Milky Lane Surfers Paradise; Tarte Bakery & Cafe; Custard Canteen; Al Bacio Gelateria

Already in the app — things to do: Dreamworld; Sea World; Warner Bros. Movie World; Wet'n'Wild Gold Coast; Currumbin Wildlife Sanctuary; David Fleay Wildlife Park; Paradise Country; SkyPoint Observation Deck; HOTA Gallery; Surfers Paradise Beach; Tallebudgera Creek and Burleigh Head; Broadwater Parklands; Gold Coast Regional Botanic Gardens; Miami Marketta; Natural Bridge, Springbrook; Australia Zoo; Queensland Museum Kurilpa and SparkLab; Tamborine Rainforest Skywalk; Tamborine Mountain Glow Worm Caves

### au-cairns — Cairns and the Great Barrier Reef (Australia)
Area covered: Cairns and the Great Barrier Reef (also known as / includes: cairns, great barrier reef, port douglas, daintree)

Already in the app — places to eat: Prawn Star; Dundee's Restaurant on the Waterfront; Ochre Restaurant; Perrotta's at the Gallery; Bayleaf Balinese Restaurant; Salt House; Salsa Bar & Grill; The Tin Shed; Vivo Palm Cove; Rusty's Markets; Cairns Night Markets; Mocka's Pies; Muddy's Cafe; Petit Cafe Kuranda; Daintree Ice Cream Company; Gelocchio

Already in the app — things to do: Cairns Aquarium; Cairns Esplanade Lagoon; Cairns Esplanade playgrounds; Cairns Botanic Gardens and Flecker Garden; Kuranda Scenic Railway; Green Island ferry day; Fitzroy Island day trip; Hartley's Crocodile Adventures; Rusty's Markets; Cairns Night Markets; Birdworld Kuranda; Australian Butterfly Sanctuary; Cairns Museum; Cairns Art Gallery; Rainforestation Nature Park

### au-uluru — Uluru and the Red Centre (Australia)
Area covered: Uluru and the Red Centre (also known as / includes: uluru, ayers rock, kata tjuta, alice springs)

Already in the app — places to eat: Ilkari Restaurant; Geckos Cafe; Mangata Bistro & Bar; Outback BBQ & Bar; Carmichael's Restaurant; Hanuman Alice Springs; Bella Alice; Ayers Wok Noodle Bar; Kings Creek Station; Erldunda Roadhouse; Kulata Academy Cafe; Ininti Cafe & Souvenirs; Page 27 Cafe; Bean Tree Cafe

Already in the app — things to do: Uluru-Kata Tjuta Cultural Centre; Ranger-guided Mala walk; Kuniya walk and Mutitjulu Waterhole; Uluru base walk (short sections); Walpa Gorge walk, Kata Tjuta; Liru walk to Uluru; Sunrise and sunset viewing areas; Yulara Town Square; Field of Light Uluru; Wintjiri Wiru Twilight; Australian Native High Tea; Sunrise Journeys; Outback Sky Journeys stargazing; Sounds of Silence dinner; Gallery of Central Australia (GoCA)
