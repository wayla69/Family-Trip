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

### nz-auckland — Auckland (New Zealand)
Area covered: Auckland (also known as / includes: auckland, waiheke, piha, rangitoto)

Already in the app — places to eat: Prego; Amano; Federal Delicatessen; Swashbucklers Restaurant & Bar; Barilla Dumpling; Eden Noodles; Orbit 360° Dining; Non Solo Pizza; Auckland Fish Market; Ponsonby Central; Best Ugly Bagels; Giapo; Chocolate Boutique; Devonport Chocolates

Already in the app — things to do: Auckland Zoo; SEA LIFE Kelly Tarlton's Aquarium; MOTAT; Auckland War Memorial Museum / Tāmaki Paenga Hira; Sky Tower; Rainbow's End; Domain Wintergardens; Auckland Botanic Gardens; Butterfly Creek; Snowplanet; Ambury Regional Park; Western Springs Lakeside Park / Te Wai Ōrea; Auckland Night Markets; Devonport and Mount Victoria / Takarunga; Auckland Art Gallery / Toi o Tāmaki; Maungawhau Mount Eden / Maungawhau

### nz-queenstown — Queenstown, Wānaka and Milford Sound (New Zealand)
Area covered: Queenstown, Wānaka and Milford Sound (also known as / includes: queenstown, milford sound, wanaka, arrowtown)

Already in the app — places to eat: The Cow; Flame Bar & Grill; Stratosfare Restaurant & Bar; Public Kitchen & Bar; Big Fig; Francesca's Italian Kitchen; Kai Whakapai; Pio Pio Restaurant; The Fat Duck; Fergburger; Erik's Fish and Chips; Miles Better Pies; Patagonia Chocolates; Mrs Ferg Gelateria; Provisions of Arrowtown; Black Peak Gelato

Already in the app — things to do: Skyline Gondola and Luge; Kiwi Park Queenstown; TSS Earnslaw and Walter Peak Farm; Queenstown Gardens; Queenstown Ice Arena; Alpine Aqualand; Queenstown Market; Remarkables Market; Shotover Jet; Arrowtown Chinese Settlement; Lakes District Museum; Putt 'n' Glow Mini Golf; Million Dollar Cruise; Lake Hayes Walkway; Ziptrek Ecotours; Onsen Hot Pools

### nz-rotorua — Rotorua, Taupō and Waitomo (New Zealand)
Area covered: Rotorua, Taupō and Waitomo (also known as / includes: rotorua, waitomo, taupo, tongariro)

Already in the app — places to eat: Fat Dog Cafe; Capers Café + Store; Stratosfare Restaurant; Atticus Finch; Pig & Whistle Historic Pub; Dixie Browns; Huka Prawn Park Restaurant; HUHU Cafe; Eat Streat; Rotorua Night Market; McDonald's Taupō; Waitomo General Store; Lady Jane's Ice Cream Parlour; Replete Cafe & Store; L'Arté Café & Gallery

Already in the app — things to do: Skyline Rotorua gondola and luge; Whakarewarewa Living Maori Village; Te Puia Marama Geyser Light Trail; Redwoods Treewalk; Wonderworld Rotorua; Polynesian Spa family pools; Kuirau Park; Wai-O-Tapu Thermal Wonderland; Huka Falls walk from Taupō; Huka Prawn Park; Waitomo Glowworm Caves; Agrodome Farm Experience; Hell's Gate Geothermal Walk; Buried Village of Te Wairoa; Paradise Valley Springs Wildlife Park

### ae-abudhabi — Abu Dhabi, Al Ain and Liwa (United Arab Emirates)
Area covered: Abu Dhabi, Al Ain and Liwa (also known as / includes: abu dhabi, yas island, saadiyat, liwa)

Already in the app — places to eat: Lebanese Flower / زهرة لبنان; Al Mrzab Traditional Restaurant; Meylas; Al Fanar Restaurant & Café Abu Dhabi; Al Dhafra Restaurant; India Palace; Min Zaman; Al Badiya; Bait El Khetyar / بيت الختيار; Yas Mall Food Court; Al Ain Mall Food Court; Café Arabia; Le Café; Jones the Grocer

Already in the app — things to do: Louvre Abu Dhabi and its Children's Museum; Qasr Al Watan; Warner Bros. World Abu Dhabi; Ferrari World Abu Dhabi; SeaWorld Yas Island; Yas Waterworld; Al Ain Zoo; Emirates Park Zoo; Corniche Beach; Jubail Mangrove Park; Al Jahili Fort; Umm Al Emarat Park; Al Hosn Cultural Foundation and House of Artisans; Heritage Village; KidZania Abu Dhabi; Al Bateen Beach
