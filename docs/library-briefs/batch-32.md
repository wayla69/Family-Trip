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

### uz-samarkand — Samarkand, Bukhara and Khiva (Uzbekistan)
Area covered: Samarkand, Bukhara and Khiva (also known as / includes: samarkand, samarqand, bukhara, khiva)

Already in the app — places to eat: Platan / Platan; Samarkand Restaurant / Самарканд; Karimbek / Karimbek; Old City / Old City; Bibikhanum Teahouse / Bibikhanum; Lyabi Hauz Chaikhana / Lyabi Hauz; Old Bukhara / Old Bukhara; Minzifa / Minzifa; Chinar / Chinar; Terrassa Cafe & Restaurant / Terrassa; Khorezm Art Restaurant / Khorezm Art; Siab Bazaar / Siyob bozori; Kolkhoz Bazaar (Central Market) / Markaziy dehqon bozori; Silk Road Tea House / Silk Road Tea House; Cafe Wishbone / Cafe Wishbone; Cafe Magistr / Magistr

Already in the app — things to do: Registan Square / Registon; Gur-e-Amir mausoleum / Gʻuri Amir; Bibi-Khanym Mosque ruins / Bibi-Xonim; Shah-i-Zinda monuments / Shohi Zinda; Ulugh Beg Observatory and museum / Ulugʻbek rasadxonasi; Afrasiyab Museum / Afrosiyob muzeyi; Siab Bazaar / Siyob bozori; Meros paper mill, Konigil / Meros qogʻoz fabrikasi; Silk Road Waterland / Silk Road Waterland; Bukhara Ark fortress / Ark qalʼasi; Sitorai Mokhi-Khosa palace / Sitorai Mohi Xosa; Bukhara old town and Lyab-i-Hauz / Labi Hovuz; Chor Minor / Chor Minor; Khiva Itchan Kala old town / Ichan Qalʼa; Kunya-Ark watchtower, Khiva / Kunya Ark

### za-kruger — Kruger National Park (South Africa)
Area covered: Kruger National Park (also known as / includes: kruger, kruger national park, skukuza, sabi sand)

Already in the app — places to eat: Cattle Baron Skukuza; Tindlovu Restaurant Satara; Tindlovu Restaurant Olifants; Skukuza Golf Club Restaurant; Kuka Café; Pioneer's Butcher & Grill; Summerfields Kitchen; Sleepers Railway Station Restaurant; Hat & Creek; Kruger Station; Tshokwane Picnic Site; Afsaal Picnic Site; Nkuhlu Picnic Site; Sabie River Café; Harrie's Pancakes

Already in the app — things to do: Kruger National Park self-drive; SANParks guided game drive; Letaba Elephant Hall; Stevenson-Hamilton Knowledge Resource Centre and Museum; Hoedspruit Endangered Species Centre; Moholoholo Wildlife Rehabilitation Centre; Blyde River Canyon boat cruise; Sudwala Caves; Graskop Gorge Lift Company; Lowveld National Botanical Garden; Bourke's Luck Potholes; God's Window
