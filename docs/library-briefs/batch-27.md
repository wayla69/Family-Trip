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

### cl-atacama — The Atacama desert (Chile)
Area covered: The Atacama desert (also known as / includes: atacama, san pedro de atacama, valle de la luna, calama)

Already in the app — places to eat: Adobe; La Casona; Baltinache; Las Delicias de Carmen; Ckunna; Tierra Todo Natural; Pizzería El Charrúa; La Picada del Indio; Emporio Andino; Franchuteria; Heladería Babalú; Café Peregrino; Roots

Already in the app — things to do: Valle de la Luna (Moon Valley) / Valle de la Luna; Laguna Cejar; Laguna Tebinquinche; Laguna Chaxa; Miscanti and Meñiques lagoons, Piedras Rojas; Termas de Puritama hot springs; Pukará de Quitor; El Tatio Geysers; SPACE stargazing tour; Chuquicamata mine tour

### cz-krumlov — Český Krumlov (Czechia)
Area covered: Český Krumlov (also known as / includes: cesky krumlov, krumlov, vltava rafting, karlovy vary)

Already in the app — places to eat: Krčma Šatlava; Papa's Living Restaurant; Švejk Restaurant; Restaurace Konvice; Hospoda Na Louži; Laibon; Nonna Gina; U Dwau Maryí; Krumlovský mlýn; Kolektiv; Deli 99; Egon Schiele Café; Ideál Coffee Roastery; Caffé Klášter

Already in the app — things to do: Český Krumlov Castle (tour route I) / Státní hrad a zámek Český Krumlov; Castle Tower / Zámecká věž; Castle Garden / Zámecká zahrada; Wooden raft cruise on the Vltava; Historic Play World at the Monasteries / Klášterní dvůr; Museum Fotoatelier Seidel; Regional Museum in Český Krumlov / Regionální muzeum v Českém Krumlově; Hradební Street playground; Linecká Street children's traffic playground; Egon Schiele Art Centrum; Picasso Life exhibition; Palace of Illustration; Port 1560 manor brewery; Marionette Museum and Fairy Tale House; Brown bears in the castle moat

### de-rothenburg — Rothenburg ob der Tauber (Germany)
Area covered: Rothenburg ob der Tauber (also known as / includes: rothenburg, rothenburg ob der tauber, romantic road, nuremberg)

Already in the app — places to eat: Reichsküchenmeister; Gasthof Goldener Greifen; Glocke; Ratsstube; Gasthof Butz; Altfränkische Weinstube; Restaurant Roter Hahn; Pizzeria Roma; Brot & Zeit; Albig's Quick Restaurant; Diller Schneeballenträume; Bäckerei Striffler; Walter Friedel; Café Lebenslust

Already in the app — things to do: Town Wall and Towers / Stadtmauer und Türme; Town Hall Tower / Rathausturm; Town History Museum in the Town Hall Vaults / Historiengewölbe, Meistertrunk; Rothenburg Museum / RothenburgMuseum im Klosterhof; Medieval Crime Museum / Mittelalterliches Kriminalmuseum; Käthe Wohlfahrt Christmas Village / Käthe Wohlfahrt Weihnachtsdorf; German Christmas Museum / Deutsches Weihnachtsmuseum; Neue Burg Playground / Spielplatz Neue Burg; Franconian Open-Air Museum / Fränkisches Freilandmuseum Bad Windsheim; Franken-Therme Bad Windsheim / Franken-Therme Bad Windsheim; Night watchman tour; Burggarten; Plönlein; Children’s city guide trail; Old Rothenburg Craftsman’s House

### eg-luxor — Luxor and Aswan (Egypt)
Area covered: Luxor and Aswan (also known as / includes: luxor, aswan, karnak, philae)

Already in the app — places to eat: Sofra Restaurant & Café; Al-Sahaby Lane; Aisha Restaurant; A Taste of India; Marsam Restaurant; El Masry Restaurant / المصري; Makka Restaurant; Chef Khalil; Kato Dool; Koshari Elzaeem / كشري الزعيم; Snack Time; McDonald's Luxor; Wenkie's German Ice Cream & Iced Coffee Parlour; Victorian Lounge; The Terrace

Already in the app — things to do: Karnak Temple Complex / معابد الكرنك; Luxor Temple / معبد الأقصر; Luxor Museum / متحف الأقصر; Temple of Hatshepsut, Deir el-Bahari / معبد حتشبسوت; Medinet Habu / مدينة هابو; Ramesseum / الرامسيوم; Felucca ride on the Nile at Luxor; Philae Temple, Aswan / معبد فيلة; Nubian Museum, Aswan / متحف النوبة; Aswan Botanical Garden / حديقة النباتات بأسوان; Colossi of Memnon; Deir el-Medina workers' village; Karnak Sound and Light Show; Valley of the Kings; Mummification Museum
