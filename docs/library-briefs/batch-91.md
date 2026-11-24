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

### vn-nhatrang — Nha Trang (Vietnam)
Area covered: Nha Trang (also known as / includes: nha trang, cam ranh, khanh hoa, po nagar, hon chong, binh ba)

Now in the app: 14 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Lanterns Vietnamese Restaurant; Lạc Cảnh; Nem Nướng Đặng Văn Quyên; Mix Restaurant; Nhà hàng Ngọc Trai; Phở Hồng; Nha Trang Xưa; Costa Seafood; Chợ Đầm; Bánh Căn 51; Alpaca Homestyle Café; Cộng Cà Phê; Red Gate Bakery Cafe; Iced Coffee

Already in the app — things to do: VinWonders Nha Trang; National Oceanographic Museum / Viện Hải dương học; Alexandre Yersin Museum / Bảo tàng Yersin; I-Resort hot springs and water park / I-Resort Nha Trang; Thap Ba Hot Springs and mud bath / Tháp Bà Hot Spring; Four-island boat trip / Tour 4 đảo; Yang Bay Tourist Park / Khu du lịch Yang Bay; Ba Ho Waterfalls / Thác Ba Hồ; Dam Market / Chợ Đầm; Nha Trang Beach / Bãi biển Nha Trang; Hon Chong Promontory / Hòn Chồng; Po Nagar Cham Towers / Tháp Bà Ponagar; Vinpearl Harbour; Do Theater – Chum Show; Hon Tam Island (day-visitor side); Doc Let Beach; Monkey Island (Hòn Lao); Tran Phu Beach; Trí Nguyên Aquarium / Thủy cung Trí Nguyên; Hòn Mun Island / Hòn Mun; Long Sơn Pagoda / Chùa Long Sơn; Trúc Lâm Phụng Thủy Sơn Zen Monastery / Thiền viện Trúc Lâm Phụng Thủy Sơn

### ar-patagonia — Patagonia (Argentina)
Area covered: Patagonia (also known as / includes: patagonia, el calafate, perito moreno, el chalten, fitz roy, bariloche)

Now in the app: 15 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: El Boliche de Alberto; Familia Weiss; La Fonda del Tío; La Tablita; Casimiro Biguá; Pura Vida; La Tapera; Bodegón Fueguino; Viva la Pepa; Restó del Glaciar; Rapanui; Mamuschka; Helados Jauja; La Waflería; Ramos Generales El Almacén

Already in the app — things to do: Perito Moreno Glacier walkways / Glaciar Perito Moreno; Glaciarium / Glaciarium Museo del Hielo Patagónico; Tierra del Fuego National Park / Parque Nacional Tierra del Fuego; End of the World Train / Tren del Fin del Mundo; Maritime Museum and Old Prison / Museo Marítimo y del Presidio; End of the World Museum / Museo del Fin del Mundo; Beagle Channel cruise to Sea Lion Island and the lighthouse / Navegación Isla de Lobos y Faro Les Eclaireurs; Martial Glacier and chairlift / Glaciar Martial; Victoria Island and the Arrayanes Forest / Isla Victoria y Bosque de Arrayanes; Museum of Patagonia / Museo de la Patagonia Francisco P. Moreno; Bariloche Palaeontological Museum / Museo Paleontológico Bariloche; Malvinas Memorial and Museum / Memorial y Museo Malvinas, Antártida y Atlántico Sur; Cerro Catedral in summer / Cerro Catedral; Península Valdés whale season / Península Valdés; Parque Nahuelito; Centro Andino El Chaltén; Chorrillo del Salto; Cerro Otto; Cerro Campanario; Refugio Frey

### at-hallstatt — Hallstatt (Austria)
Area covered: Hallstatt (also known as / includes: hallstatt, salzkammergut, dachstein, obertraun, gosau, st wolfgang)

Now in the app: 17 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Restaurant zum Salzbaron; Bräugasthof Hallstatt; Gasthof Zauner; Gasthof Simony Restaurant am See; Rudolfsturm; Restaurant Seeauer; Gasthof Höllwirt; Gasthof Gosausee; Karmez Kebap; Lodge am Krippenstein; Café Derbl; Bäckerei Konditorei Maislinger; Konditorei Zauner; Muk's Schmankerl; Rührwerk Hallstatt; Marktbeisl Zur Ruth; Pizzeria Kegelbahn

Already in the app — things to do: Hallstatt Salt Mine (Salzwelten); Skywalk Welterbeblick; Lake Hallstatt boat trip; Hallstatt World Heritage Museum; Dachstein Krippenstein cable car; Dachstein Giant Ice Cave; Dachstein Mammoth Cave; Koppenbrüller Cave; Echerntal valley walk; Lake Gosau loop; Loser Panorama cable car; Altaussee Salt Mine (Salzwelten); Altaussee lake boat; Hallstatt lakeside playground and swimming island; Obertraun lido playground; Beinhaus in der Michaelskapelle; Little Bear via ferrata; Waldbachstrub waterfall

### ch-lucerne — Lucerne (Switzerland)
Area covered: Lucerne (also known as / includes: lucerne, luzern, pilatus, rigi, titlis, engelberg)

Now in the app: 15 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Wirtshaus Galliker; Rathaus Brauerei; Restaurant Fritschi; Stadtkeller; Zunfthausrestaurant Pfistern; Wirtshaus Taube; Weisses Kreuz; LUZ Seebistro; Mill'Feuille; Manora Restaurant Luzern; Tibits Luzern; Confiserie Bachmann; Heini Conditorei; Gelateria dell'Alpi; Wirtschaft Trumpf-Buur

Already in the app — things to do: Swiss Museum of Transport / Verkehrshaus der Schweiz; Swiss Chocolate Adventure; Mount Pilatus; Mount Rigi; Mount Titlis; Stanserhorn CabriO; Goldau Nature and Wildlife Park / Natur- und Tierpark Goldau; Glacier Garden Lucerne / Gletschergarten Luzern; Museum Luzern; Bourbaki Panorama; Chapel Bridge / Kapellbrücke; Lion Monument / Löwendenkmal; Musegg Wall / Museggmauer; Lake Lucerne boat trip; Lucerne weekly market / Luzerner Wochenmarkt; Ufschötti; Inseli Park playground; Allmend indoor pool / Hallenbad Allmend; Aeschbach ChocoWelt; Rosengart Collection / Sammlung Rosengart
