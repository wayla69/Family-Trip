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

### gb-edinburgh — Edinburgh and Scotland (United Kingdom)
Area covered: Edinburgh and Scotland (also known as / includes: edinburgh, scotland, highlands, loch ness)

Already in the app — places to eat: Howies Victoria Street; Makars Mash Bar; Mums Great Comfort Food; The Scran & Scallie; Bertie's Proper Fish & Chips; Vittoria on the Bridge; Paesano Pizza; Mother India's Cafe; Oink; The Real Food Café; Oban Seafood Hut; Anstruther Fish Bar; Mary's Milk Bar; Clarinda's Tearoom; University Café; Jannettas Gelateria

Already in the app — things to do: Edinburgh Zoo; Edinburgh Castle; National Museum of Scotland; Dynamic Earth; Royal Yacht Britannia; Camera Obscura and World of Illusions; Museum of Childhood; Royal Botanic Garden Edinburgh; The Falkirk Wheel; The Helix and the Kelpies; Stirling Castle; The Real Mary King's Close; Fort Douglas at Dalkeith Country Park; Portobello Beach; Holyrood Park and Arthur's Seat

### gb-lakes — The Lake District (United Kingdom)
Area covered: The Lake District (also known as / includes: lake district, windermere, ambleside, grasmere)

Already in the app — places to eat: Zeffirellis; Dodds Restaurant; The Angel Inn; Hole in t' Wall; The Queen's Head; Tower Bank Arms; The Dog & Gun; The Black Bull Inn; The Old Keswickian; Wilf's Café; Tebay Services; The Grasmere Gingerbread Shop; The Apple Pie; Chesters by the River

Already in the app — things to do: Lakes Aquarium; Windermere Lake Cruises; The World of Beatrix Potter; Windermere Jetty Museum; Brockhole on Windermere; Rheged Centre; Keswick Museum and Art Gallery; Whinlatter Forest; Ravenglass and Eskdale Railway; Lakeland Wildlife Oasis; Hill Top; Muncaster Castle, Gardens and Hawk and Owl Centre; Ullswater Steamers; Lakeland Motor Museum; Tarn Hows

### gb-york — York and Yorkshire (United Kingdom)
Area covered: York and Yorkshire (also known as / includes: york, yorkshire, the shambles, whitby)

Already in the app — places to eat: The Star Inn the City; Drakes Fish & Chips; Il Paradiso del Cibo; Guy Fawkes Inn; Rustique; Double Dutch Pancake House; The Magpie Café; Trenchers; Wensleydale Creamery; Bizzie Lizzie's; Shambles Market Food Court; York Roast Co; Leeds Kirkgate Market; Bettys Café Tea Rooms York; Bettys Café Tea Rooms Harrogate; The Harbour Bar

Already in the app — things to do: National Railway Museum; JORVIK Viking Centre; York Castle Museum; Yorkshire Museum and Museum Gardens; Yorkshire Wildlife Park; York's Chocolate Story; Barley Hall; DIG: An Archaeological Adventure; Clifford's Tower; Shambles Market; Rowntree Park play area; Castle Howard; Eden Camp Modern History Museum; York City Walls; Flamingo Land

### ge-tbilisi — Tbilisi and Kazbegi (Georgia)
Area covered: Tbilisi and Kazbegi (also known as / includes: tbilisi, kazbegi, stepantsminda, gergeti)

Already in the app — places to eat: Shavi Lomi / შავი ლომი; Salobie Bia; Pasanauri; Machakhela; Zakhar Zakharich; Keto and Kote; Maspindzelo; Sofia Melnikova's Fantastic Douqan; Tsiskvili; Rooms Hotel Kazbegi; Dezerter Bazaar; Fabrika; Funicular Restaurant; Entrée; Luca Polare; Puri Guliani

Already in the app — things to do: Tbilisi Zoo; Mtatsminda Park / მთაწმინდის პარკი; Rike Park–Narikala cable car; Dry Bridge Market; Open Air Museum of Ethnography; Tbilisi Sea; Georgian National Museum / საქართველოს ეროვნული მუზეუმი; National Botanical Garden of Georgia / საქართველოს ეროვნული ბოტანიკური ბაღი; Mushtaidi Garden and Children’s Railway / მუშთაიდის ბაღი; Mziuri Park / მზიური; Gabriadze Theatre clock tower / გაბრიაძის თეატრის კოშკი; Tbilisi History Museum; Tbilisi Auto Museum; Museum of Georgian Weaponry; Museum of Illusions Tbilisi; Experimentorium Science Museum; Gino Paradise Water Park; Vake Park; Turtle Lake
