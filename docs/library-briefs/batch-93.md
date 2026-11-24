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

### th-lipe — Satun and Koh Lipe (Thailand)
Area covered: Satun and Koh Lipe (also known as / includes: koh lipe, satun, tarutao, pak bara, koh adang, thale ban)

Now in the app: 17 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Nee Papaya / นีปาปาย่า; Papaya Mom / ปาปาย่ามัม; Rak Lay Seafood / รักเล ซีฟู้ด; King Crab; On The Rocks; Castaway Restaurant; Nong Nee / น้องณี; On’s Restaurant; Koh Lipe Walking Street / ถนนคนเดินเกาะหลีเป๊ะ; Satun Night Market / ตลาดโต้รุ่งสตูล; Elephant Koh Lipe; Thai Lady Pancake; Cafe Lipe; THE BOX; Progress Seafood Buffet; Bombay Indian Restaurant; The Cove Bistro Restaurant

Already in the app — things to do: Pattaya Beach, Koh Lipe / หาดพัทยา เกาะหลีเป๊ะ; Sunrise Beach, Koh Lipe / หาดซันไรส์ เกาะหลีเป๊ะ; Koh Lipe Walking Street / วอล์กกิ้งสตรีท หลีเป๊ะ; Snorkelling trip to Koh Rawi and Koh Adang / เกาะราวี เกาะอาดัง; Koh Adang / เกาะอาดัง; Koh Lidi Lek / เกาะลิดีเล็ก; Thale Ban National Park / อุทยานแห่งชาติทะเลบัน; Satun National Museum (Kuden Mansion) / พิพิธภัณฑ์สถานแห่งชาติ สตูล คฤหาสน์กูเด็น; Satun Geopark Museum / พิพิธภัณฑ์ธรณีวิทยาสตูล จีโอพาร์ค; Wang Sai Thong Waterfall; Than Plio Waterfall; Bridge Across Time, Petra Islands National Park; Pak Bara Beach; Phu Pha Phet Cave; Sunset Beach, Koh Lipe; Sanom Beach; Kla Island; Koh Tarutao

### us-southwest — Grand Canyon and Las Vegas (United States)
Area covered: Grand Canyon and Las Vegas (also known as / includes: grand canyon, las vegas, vegas, arizona, nevada, hoover dam)

Now in the app: 18 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Hash House A Go Go; Bacchanal Buffet; The Buffet at Wynn; Grand Lux Cafe; Rainforest Cafe; Lotus of Siam; El Tovar Dining Room; Plaza Bonita; We Cook Pizza & Pasta; Maswik Food Court; In-N-Out Burger; Eataly Las Vegas; Ghirardelli Ice Cream & Chocolate Shop; Bellagio Patisserie; Hershey's Chocolate World; RPM Italian (Forum Shops); Summer House (Durango); Wicked Spoon

Already in the app — things to do: Grand Canyon National Park, South Rim; Grand Canyon Railway; Horseshoe Bend; Lowell Observatory; Hoover Dam; Red Rock Canyon Scenic Drive; Valley of Fire State Park; Shark Reef Aquarium; Discovery Children's Museum; Springs Preserve; Las Vegas Natural History Museum; Adventuredome; Bellagio Conservatory and Botanical Gardens; Fountains of Bellagio; Flamingo Wildlife Habitat; Rim Trail; Bright Angel Trail

### za-kruger — Kruger National Park (South Africa)
Area covered: Kruger National Park (also known as / includes: kruger, kruger national park, skukuza, sabi sand, hoedspruit, blyde river)

Now in the app: 22 places to eat, 13 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Cattle Baron Skukuza; Tindlovu Restaurant Olifants; Skukuza Golf Club Restaurant; Kuka Café; Pioneer's Butcher & Grill; Summerfields Kitchen; Sleepers Railway Station Restaurant; Hat & Creek; Kruger Station; Tshokwane Picnic Site; Afsaal Picnic Site; Nkuhlu Picnic Site; Sabie River Café; Harrie's Pancakes; Mugg & Bean (Lower Sabie); Tindlovu Restaurant (Letaba); Tindlovu Restaurant (Berg-en-Dal); Mopani Restaurant; Pretoriuskop restaurant; Wimpy (Pretoriuskop); Punda Maria restaurant; Shingwedzi restaurant

Already in the app — things to do: Kruger National Park self-drive; SANParks guided game drive; Letaba Elephant Hall; Stevenson-Hamilton Knowledge Resource Centre and Museum; Hoedspruit Endangered Species Centre; Moholoholo Wildlife Rehabilitation Centre; Blyde River Canyon boat cruise; Sudwala Caves; Graskop Gorge Lift Company; Lowveld National Botanical Garden; Bourke's Luck Potholes; God's Window; Lower Sabie Rest Camp

### de-rothenburg — Rothenburg ob der Tauber (Germany)
Area covered: Rothenburg ob der Tauber (also known as / includes: rothenburg, rothenburg ob der tauber, romantic road, nuremberg)

Now in the app: 15 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Reichsküchenmeister; Gasthof Goldener Greifen; Glocke; Ratsstube; Gasthof Butz; Altfränkische Weinstube; Restaurant Roter Hahn; Pizzeria Roma; Brot & Zeit; Tobingo Döner; Diller Schneeballenträume; Bäckerei Striffler; Walter Friedel; Café Lebenslust; Eiscafé Pizzeria Italia

Already in the app — things to do: Town Wall and Towers / Stadtmauer und Türme; Town Hall Tower / Rathausturm; Town History Museum in the Town Hall Vaults / Historiengewölbe, Meistertrunk; Rothenburg Museum / RothenburgMuseum im Klosterhof; Medieval Crime Museum / Mittelalterliches Kriminalmuseum; Käthe Wohlfahrt Christmas Village / Käthe Wohlfahrt Weihnachtsdorf; German Christmas Museum / Deutsches Weihnachtsmuseum; Neue Burg Playground / Spielplatz Neue Burg; Franconian Open-Air Museum / Fränkisches Freilandmuseum Bad Windsheim; Franken-Therme Bad Windsheim; Night watchman tour; Burggarten; Plönlein; Children’s city guide trail; Old Rothenburg Craftsman’s House; Röderturm; Toppler Castle / Topplerschlösschen; Hornburgweg playground / Spielplatz Hornburgweg; Double Bridge / Doppelbrücke
