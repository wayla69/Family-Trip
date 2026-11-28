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

### id-komodo — Labuan Bajo and Komodo (Indonesia)
Area covered: Labuan Bajo and Komodo (also known as / includes: labuan bajo, padar, komodo national park, komodo island)

Already in the app — places to eat: MadeInItaly Ristorante Italiano; La Cucina; Happy Banana Komodo; De Waroeng; Artomoro Restaurant; Bajo Bay Fisherman's Club; Kampung Ujung Night Market; Bajo Bakery; Carpenter Cafe & Roastery; Cafe in Hit; Cafe Melinjo

Already in the app — things to do: Rinca Island, Komodo National Park; Komodo Island; Kelor Island; Kanawa Island; Batu Cermin cave; Sylvia Hill; Puncak Waringin viewpoint; Kampung Ujung waterfront food stalls; Padar Island viewpoint; Cunca Wulang canyon

### la-luangprabang — Luang Prabang (Laos)
Area covered: Luang Prabang (also known as / includes: luang prabang, luang phrabang, kuang si, phousi)

Already in the app — places to eat: Tamarind; Khaiphaen; Manda de Laos; Dyen Sabai; Bamboo Tree; Coconut Garden; Tangor; The Belle Rive Terrace; Luang Prabang Night Market food street; Luang Prabang Morning Market; Le Banneton; Joma Bakery Café; Saffron Coffee; Zurich Bread Factory & Café

Already in the app — things to do: Kuang Si Falls and Bear Rescue Centre / ຕາດກວາງຊີ; Royal Palace Museum / ຫໍພິພິທະພັນແຫ່ງຊາດ; Mount Phousi / ພູສີ; Luang Prabang Night Market / ຕະຫຼາດມືດ; Morning Market (Talat Dala) / ຕະຫຼາດເຊົ້າ; Traditional Arts and Ethnology Centre / ຫໍພິພິທະພັນສິລະປະພື້ນເມືອງ ແລະ ຊົນເຜົ່າ; Ock Pop Tok Living Crafts Centre; Living Land Farm; Tad Sae Waterfalls / ຕາດແສ; Pha Tad Ke Botanical Garden; Luang Prabang Butterfly Park; UXO Visitors Centre; Nam Dong Park; Pak Ou Caves (Tham Ting); Children's Cultural Center; Heritage Information Centre (Heuanchan)

### kh-siemreap — Siem Reap (Cambodia)
Area covered: Siem Reap (also known as / includes: siem reap, angkor, angkor wat, ta prohm)

Already in the app — places to eat: Khmer Kitchen; The Sugar Palm; Chanrey Tree; Haven; Malis; Spoons; Pou Restaurant; Mahob Khmer Cuisine; Peace Cafe; Phsar Chas; Road 60 Night Market; Brown Coffee; Little Red Fox Espresso; Temple Coffee n Bakery

Already in the app — things to do: Angkor Wat; Ta Prohm; Bayon and Angkor Thom; Angkor National Museum; Phare, the Cambodian Circus; Artisans Angkor workshops; Kampong Phluk stilt village; Banteay Srey Butterfly Centre; Cambodia Landmine Museum; Artisans Angkor Silk Farm; Nature Discovery Center of Cambodia; Angkor Wildlife and Aquarium; Angkor Wonder Garden; Preah Khan; Banteay Kdei and Srah Srang

### ph-bohol — Bohol and Cebu (The Philippines)
Area covered: Bohol and Cebu (also known as / includes: bohol, chocolate hills, panglao, cebu)

Already in the app — places to eat: Bohol Bee Farm Restaurant; Gerarda's Family Restaurant; Rio Verde Floating Restaurant; Giuseppe Pizzeria & Sicilian Roast; Payag Restaurant; Rico's Lechon; Zubuchon; House of Lechon; Casa Verde; Cafe Laguna; Larsian sa Fuente; Sugbo Mercado; Jojie's Painitang Bol-anon; The Buzzz Cafe; Shaka Bohol; Abaca Baking Company

Already in the app — things to do: Chocolate Hills; Philippine Tarsier Sanctuary; Loboc River Cruise; Hinagdanan Cave; Bohol Python and Butterfly Sanctuary; Fort San Pedro; Tops Lookout; Cebu Safari and Adventure Park; Mag-Aso Falls; Dimiao Twin Falls; Bohol Bee Farm; Nova Shell Museum; Alona Beach; Island hopping to Balicasag and Virgin Island; National Museum of the Philippines, Bohol
