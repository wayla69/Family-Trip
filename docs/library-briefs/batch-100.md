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

### tr-pamukkale — Pamukkale (Türkiye)
Area covered: Pamukkale (also known as / includes: pamukkale, hierapolis, denizli, ephesus, izmir, kusadasi)

Now in the app: 13 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Kayaş Restaurant & Wine House; Mehmet's Heaven; Tıkır Grill House; Lamuko's Lokanta; Teras Restaurant; Gurme Restaurant Cafe; Mustafa Restaurant; Kebapçı Enver; Traverten Pide; Antique Pool Cafeteria; Forum Çamlık; Hiera Coffee & Tea House; Hacı Şerif

Already in the app — things to do: Pamukkale travertine terraces / Pamukkale Travertenleri; Hierapolis ancient city / Hierapolis Antik Kenti; Hierapolis Archaeology Museum / Hierapolis Arkeoloji Müzesi; Cleopatra's Antique Pool / Antik Havuz; Laodicea ancient city / Laodikeia Antik Kenti; Karahayıt red springs / Karahayıt Kırmızı Su; Pamukkale hot air balloon flight; Kaklık Cave / Kaklık Mağarası; Seyir Tepesi urban forest / Seyir Tepesi; Denizli Cable Car and Bağbaşı Plateau / Denizli Teleferik; Halıcı Ahmet Urkay Museum / Halıcı Ahmet Urkay Müzesi; Denizli Atatürk House and Ethnographic Museum / Denizli Atatürk Evi ve Etnografya Müzesi; İncilipınar Park / İncilipınar Parkı; Denizli Rag Doll House Museum / Denizli Bez Bebek Evi Müzesi; Sinpaş Aquamall; Pamukkale Natural Park / Pamukkale Tabiat Parkı; Çamlık Park

### ch-zermatt — Zermatt (Switzerland)
Area covered: Zermatt (also known as / includes: zermatt, matterhorn, gornergrat, glacier paradise, sunnegga)

Now in the app: 14 places to eat, 15 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Whymper-Stube; Schäferstube; Walliserkanne; Restaurant Du Pont; Grampi's; Chez Vrony; Restaurant Zum See; Findlerhof; Restaurant Derby; Kulmhotel Gornergrat; Restaurant Matterhorn glacier paradise; Bäckerei Fuchs; Backzeit Bäckerei & Café; Petit Royal

Already in the app — things to do: Gornergrat railway; Matterhorn Glacier Paradise; Matterhorn Museum Zermatlantis; Sunnegga and Wolli's Adventure Park at Leisee; Blauherd and the Stellisee walk; Riffelsee at Rotenboden; Mountaincart Blauherd to Sunnegga; Old village and Bahnhofstrasse walk; Hotel Berghof swimming pool; Snowli Kids Village ski school; Tradition Julen sheep barn visit; Guided village tour of Zermatt; Obere Matten playground; Zooom the Matterhorn; Walk of Climb on Bahnhofstrasse

### it-cinqueterre — The Cinque Terre (Italy)
Area covered: The Cinque Terre (also known as / includes: cinque terre, vernazza, manarola, riomaggiore, monterosso, corniglia)

Now in the app: 12 places to eat, 16 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Ristorante Belvedere; Il Casello; Gambero Rosso; Trattoria Gianni Franzi; Il Porticciolo; Il Massimo della Focaccia; Alberto Gelateria; Pasticceria Laura; Il Pirata delle 5 Terre; Gelateria Vernazza; Fritto e Pizza da Sandro; Pizzeria Fratelli Basso

Already in the app — things to do: Via dell'Amore; Cinque Terre by train; Cinque Terre ferry; Monterosso Fegina beach / Spiaggia di Fegina; Levanto central beach / Spiaggia Libera Centrale; Doria Castle, Portovenere / Castello Doria; Portovenere harbour and old town; Doria Castle and tower, Vernazza / Castello Doria; Manarola playground and viewpoints; Monterosso to Vernazza trail / Sentiero Azzurro; Naval Technical Museum / Museo Tecnico Navale; San Giorgio Castle museum / Castello San Giorgio; Lerici Castle and fossil museum / Castello di Lerici; Genoa Aquarium / Acquario di Genova; Baia delle Favole beach / Baia delle Favole; Vernazza harbour beach / Spiaggia di Vernazza

### mn-ulaanbaatar — Ulaanbaatar and Terelj (Mongolia)
Area covered: Ulaanbaatar and Terelj (also known as / includes: ulaanbaatar, ulan bator, ulaan baatar, terelj, gorkhi-terelj)

Now in the app: 17 places to eat, 8 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Modern Nomads / Модерн Номадс; Hazara / Хазара; Namaste / Намасте; Veranda / Веранда; Rosewood Kitchen + Enoteca / Роузвүүд; The Bull / Зэ Булл; Terelj Hotel / Тэрэлж зочид буудал; Ayanchin Four Seasons Lodge / Аянчин; Khaan Buuz / Хаан Бууз; State Department Store Food Court / Улсын Их Дэлгүүр; Shangri-La Centre Food Court / Шангри-Ла төв; Millie's Espresso / Миллис; Jur Ur / Жүр Үр; Tom N Toms Coffee / Том Н Томс; Altan Gadas Restaurant; Arak Yak House; Mongolian's Restaurant (Shangri-La Mall)

Already in the app — things to do: Chinggis Khaan National Museum / Чингис хаан үндэсний музей; Chinggis Khaan Statue Complex / Чингис хаан хөшөөт цогцолбор; Gorkhi-Terelj National Park and Turtle Rock / Горхи-Тэрэлж; Natural History Museum of Mongolia / Монголын Байгалийн түүхийн музей; National Amusement Park / Үндэсний соёл амралтын хүрээлэн; National Garden Park / Үндэсний цэцэрлэгт хүрээлэн; Zaisan Memorial / Зайсан толгой; National Museum of Mongolia / Монгол Улсын Үндэсний музей
