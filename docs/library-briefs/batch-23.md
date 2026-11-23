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

### se-stockholm — Stockholm (Sweden)
Area covered: Stockholm (also known as / includes: stockholm, gamla stan, skansen, djurgarden)

Already in the app — places to eat: Pelikan; Kvarnen; Tennstopet; Meatballs for the People; Ulla Winbladh; Lisa Elmqvist; Hermans; Under Kastanjen; Östermalms Saluhall; Hötorgshallen; Nystekt Strömming; Vete-Katten; Chokladkoppen; Rosendals Trädgård; Café Saturnus

Already in the app — things to do: Skansen; Junibacken; Vasa Museum / Vasamuseet; Gröna Lund; Tekniska museet; Swedish Museum of Natural History / Naturhistoriska riksmuseet; Nordiska museet; The Royal Armoury / Livrustkammaren; Rålambshovsparken; Royal Palace / Kungliga slottet; Butterfly House Haga Ocean / Fjärilshuset-Haga Ocean; Fjäderholmarna island boat trip / Fjäderholmarna; Stockholm City Museum / Stadsmuseet; Tom Tits Experiment / Tom Tits Experiment; Hagaparken / Hagaparken

### si-bled — Bled, Ljubljana and Postojna (Slovenia)
Area covered: Bled, Ljubljana and Postojna (also known as / includes: bled, lake bled, ljubljana, postojna)

Already in the app — places to eat: Gostilna Pri Planincu; Oštarija Peglez'n; Gostilna Murka; Pizzeria Rustika; Gostilna Sokol; Gostilna Šestica; Julija; Foculus Pizzeria; Jamski dvorec; Gostilna Požar; Klobasarna; Ljubljana Central Market; Kavarna Park; Slaščičarna Zima; Cacao

Already in the app — things to do: Postojna Cave / Postojnska jama; Predjama Castle / Predjamski grad; Ljubljana Castle and funicular / Ljubljanski grad; Ljubljana Zoo / Živalski vrt Ljubljana; Bled Castle / Blejski grad; Vintgar Gorge / Soteska Vintgar; Pletna boat to Bled Island; University Botanic Gardens Ljubljana / Botanični vrt Univerze v Ljubljani; House of Experiments / Hiša eksperimentov; Ljubljana Central Market / Centralna tržnica; Vogel cable car / Vogel; Lake Bled walk; Museum of Apiculture, Radovljica; Straža summer toboggan; Starkl Open-Air Museum; Triglavska roza info centre exhibition; Savica Waterfall; Mostnica Gorge

### sk-bratislava — Bratislava and the High Tatras (Slovakia)
Area covered: Bratislava and the High Tatras (also known as / includes: bratislava, high tatras, strbske pleso, poprad)

Already in the app — places to eat: Bratislava Flagship Restaurant; Slovak Pub; Bratislavský Meštiansky Pivovar; Modrá Hviezda; Zylinder Café & Restaurant; Leberfinger; Koliba Patria; Koliba Kamzík; Slovenská reštaurácia Štrbské Pleso; Retro Station Restaurant; Stará tržnica; Eurovea food court; Kaffee Mayer; Luculus; Kubkov Kopček

Already in the app — things to do: Bratislava Zoo; Bratislava Castle / Bratislavský hrad; UFO Observation Deck / UFO Bratislava; Janko Kráľ Park / Sad Janka Kráľa; Železná Studienka; Bratislava Transport Museum / Múzeum dopravy v Bratislave; Kamzík Hill and TV Tower / Kamzík; Freedom Square water playground / Námestie slobody; Dejisko History Playground; Old Town Hall and its tower; Michael’s Tower; Devín Castle; Exhibition of Clocks; Slovak National Museum, Natural History; Primate's Palace

### tr-cappadocia — Cappadocia (Türkiye)
Area covered: Cappadocia (also known as / includes: cappadocia, kapadokya, goreme, uchisar)

Already in the app — places to eat: Dibek; Topdeck Cave Restaurant; Pumpkin Göreme Restaurant and Art Gallery; Seten Anatolian Cuisine; Old Cappadocia Cafe & Restaurant; Köy Evi; Ziggy Cafe & Restaurant; Han Çırağan; Bizim Ev; Old Greek House; Fırın Express; Nazar Börek & Cafe; Cafe Şafak; King's Coffee Shop

Already in the app — things to do: Göreme Open Air Museum / Göreme Açık Hava Müzesi; Kaymaklı Underground City / Kaymaklı Yeraltı Şehri; Derinkuyu Underground City / Derinkuyu Yeraltı Şehri; Zelve Open Air Museum / Zelve Açık Hava Müzesi; Güray Ceramics Museum / Güray Müze; Ihlara Valley / Ihlara Vadisi; Uçhisar Castle / Uçhisar Kalesi; Hot air balloon flight over Göreme; Avanos pottery workshops / Avanos çömlek; Ortahisar castle and old town / Ortahisar; Pigeon Valley walk / Güvercinlik Vadisi; Özkonak Underground City / Özkonak Yeraltı Şehri; Love Valley / Aşk Vadisi; Devrent Valley (Imagination Valley) / Devrent Vadisi; Hair Museum of Avanos (Chez Galip)
