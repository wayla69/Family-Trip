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

### it-florence — Florence & Tuscany (Italy)
Area covered: Florence & Tuscany (also known as / includes: florence, firenze, tuscany, toscana, pisa, siena)

Now in the app: 50 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Trattoria Za Za; Il Latini; Osteria Santo Spirito; Gusta Pizza; Trattoria 4 Leoni; Trattoria Mario; Trattoria Papei; Trattoria da Leo; Pizzeria Il Montino; Mercato Centrale Firenze; All'Antico Vinaio; Da Nerbone; Vivoli; Gelateria dei Neri; Gelateria Dondoli; Nannini; Trattoria Sergio Gozzi; Osteria Buongustai; Osteria Pepo; Caffe Gilli; Caffe Rivoire; Caffe Scudieri; Trattoria Il Giova; Trattoria Sostanza; Cibrèo Trattoria; Trattoria Cammillo; Trattoria Sabatino; Trattoria da Ruggero; Trattoria dell'Orto; Trattoria Annamaria; Buca Mario; Il Magazzino; L'Arte di Dori; La Fiaschetteria; Antica Trattoria da Tito; Trattoria Da Burde; Osteria Vini e Vecchi Sapori; Del Fagioli; Trattoria La Casalinga; Caffe Ricchi; L'Ortone; Trattoria 13 Gobbi; Santarosa Bistrot; Salumeria Verdi; Gelateria La Carraia; Berberè; Trattoria del Carmine; Tamerò; Ditta Artigianale (Via dei Neri); Gelateria della Passera

Already in the app — things to do: Uffizi Gallery / Gallerie degli Uffizi; Galleria dell'Accademia (Michelangelo's David) / Galleria dell'Accademia; Palazzo Vecchio; Boboli Gardens / Giardino di Boboli; Museo Galileo; La Specola zoology museum / Museo di Storia Naturale – La Specola; Museo Stibbert; Mercato Centrale / Mercato Centrale Firenze; Giardino delle Rose and Piazzale Michelangelo / Giardino delle Rose; Parco delle Cascine; Leonardo Museum, Vinci / Museo Leonardiano di Vinci; Pinocchio Park, Collodi / Parco di Pinocchio; Leaning Tower of Pisa / Torre pendente di Pisa; Lucca city walls by bike / Mura di Lucca; Torre Grossa, San Gimignano / Torre Grossa; HZERO Model Train Museum; Museo degli Innocenti; Leonardo Interactive Museum; Palazzo Strozzi; Piazza della Repubblica carousel / Antica Giostra Toscana; San Marco Museum / Museo di San Marco; Mediterranean Natural History Museum / Museo di Storia Naturale del Mediterraneo; Grotta del Vento; Cavallino Matto; San Silvestro mining park / Parco Archeominerario di San Silvestro; Poggibonsi Archaeodrome / Archeodromo di Poggibonsi

### th-bangkok — Bangkok (Thailand)
Area covered: Bangkok (also known as / includes: bangkok, suvarnabhumi, don mueang, damnoen saduak, amphawa)

Now in the app: 33 places to eat, 42 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Thipsamai Pad Thai (Pratu Phi) / ทิพย์สมัย ผัดไทยประตูผี; Krua Apsorn (Dinso Road) / ครัวอัปษร; Somboon Seafood (Surawong) / สมบูรณ์โภชนา สาขาสุรวงศ์; Go-Ang Kaomunkai Pratunam / โกอ่างข้าวมันไก่ประตูน้ำ; Polo Fried Chicken / ไก่ทอดเจ๊กี (โปโล); Wattana Panich / วัฒนาพานิช; Som Tam Nua (Siam Square) / ส้มตำนัว สยามสแควร์; Savoey Tha Maharaj / เสวย ท่ามหาราช; Baan Khanitha & Gallery (Sathorn) / บ้านขนิษฐา สาทร; Supanniga Eating Room Tha Tien / สุพรรณิการ์ อีทติ้ง รูม ท่าเตียน; Pier 21 Food Terminal / เพียร์ 21 เทอร์มินอล 21 อโศก; Or Tor Kor Market / ตลาด อ.ต.ก.; Eathai / อีทไทย เซ็นทรัล เอ็มบาสซี; After You Dessert Cafe (Siam Paragon) / อาฟเตอร์ ยู สยามพารากอน; Mont Nomsod (Dinso Road) / มนต์นมสด เสาชิงช้า; Kor Panich / ก.พานิช; The Deck Bangkok; Baan Ying Cafe and Meal / บ้านหญิง; Cabbages and Condoms; theCOMMONS Thonglor; Helix Dining at EmQuartier; Patom Organic Living / ปฐม ออร์แกนิก ลิฟวิ่ง; Genius Kids Cafe; BABYCCINO & Co.; Mozza by Cocotte; BHC Chicken; Underhound; Benihana; Krua Dok Mai Khao / ครัวดอกไม้ขาว; Kin Lom Chom Saphan / กินลมชมสะพาน; Krua Krung Thep / ครัวกรุงเทพ; Krua Nai Baan / ครัวในบ้าน; Rong Si Phochana (Lang Suan) / โรงสีโภชนา หลังสวน

Already in the app — things to do: SEA LIFE Bangkok Ocean World; Children's Discovery Museum; Lumphini Park; Benjakitti Forest Park; Museum Siam; Wat Pho; Grand Palace and Wat Phra Kaew; Chao Phraya Tourist Boat; Mahanakhon SkyWalk; Dream World; Siam Amazing Park; Chatuchak Weekend Market; ICONSIAM and SookSiam; Bangkok Art and Culture Centre; Yaowarat (Chinatown); Safari World; MEGA HarborLand, One Bangkok; MEGA HarborLand, ICONSIAM; HarborLand, Gateway Ekamai; Mega HarborLand, Seacon Bangkae; Funarium; BOUNCE, EmQuartier; MELAND, Siam Paragon; Kidzooona, Gateway Ekamai; Playville; Playmondo, CentralWorld; Playerbox, Siam Discovery; Yoyoland, Seacon Square; Mari Go Round Premium Kids Cafe; Kidzilla; WOW Park, Gateway Ekamai; Science Centre for Education; Siam Serpentarium; Wonder Woods Kids Cafe; Children's Discovery Museum II, Thung Khru; Bang Kachao; Bang Nam Phueng Floating Market; Ancient City; Bangkok Butterfly Garden and Insectarium; Tooney Museum; Madame Tussauds Bangkok; Fantasia Lagoon

### at-salzburg — Salzburg (Austria)
Area covered: Salzburg (also known as / includes: salzburg, hohensalzburg, mirabell, getreidegasse, innsbruck)

Now in the app: 43 places to eat, 30 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Bärenwirt; Sternbräu; Stiegl-Keller; Zwettler's; Die Weisse; Gasthaus Wilder Mann; Stiegl-Brauwelt; Zum Zirkelwirt; Augustiner Bräu Kloster Mülln; Balkan Grill Walter; Grünmarkt; Café Tomaselli; Café Konditorei Fürst; Café Bazar; Café Mozart; S’Nockerl im Elefant; Alt Salzburg; Goldene Kugel; Fortress Café; Café Fingerlos; Alter Fuchs; Augustiner Braugasthof Krimpelstätter; Meissl & Schadn; Tortelier; Furō; Esszimmer; Die Gersberg Alm; Blaue Gans; Café am Kai; IMLAUER Brasserie Mirabell; Braurestaurant IMLAUER; Café Glockenspiel; Pan e Vin; Steinterrasse; Humboldt; Metzgersteig; Kaffeeothek; Kuglhof; Gasthof Die Pflegerbrücke; Panoramarestaurant zur Festung Hohensalzburg; The Keep – Healthy Eating; Restaurant Wolferl; The Bakery by Didi Maier

Already in the app — things to do: Hohensalzburg Fortress / Festung Hohensalzburg; Salzburg Zoo Hellbrunn / Zoo Salzburg Hellbrunn; Hellbrunn Palace and Trick Fountains / Schloss Hellbrunn und Wasserspiele; Haus der Natur; Salzburg Marionette Theatre / Salzburger Marionettentheater; Mozart's Birthplace / Mozarts Geburtshaus; Untersberg Cable Car / Untersbergbahn; Salzwelten Hallein Salt Mine / Salzwelten Hallein; Salzburg Christkindlmarkt / Salzburger Christkindlmarkt; Salzburg Open-Air Museum / Salzburger Freilichtmuseum; Eisriesenwelt Ice Cave / Eisriesenwelt Werfen; Mirabell Gardens and Dwarf Garden / Mirabellgarten und Zwergerlgarten; Zauberflöten Playground / Zauberflöten-Spielplatz; Hangar-7 / Red Bull Hangar-7; Getreidegasse; Toy Museum; JumpDome; Amadeus Salzach River Boat; Leopoldskron Outdoor Pool; Marionette Museum; Steintheater; Folklore Museum; Salzach riverside path; Mönchsberg lift; Hettwer Bastei; Gaisberg; DomQuartier; Lehener Park; Volksgarten playground / Spielplatz im Volksgarten; Hellbrunn playground / Spielplatz in Hellbrunn

### se-stockholm — Stockholm (Sweden)
Area covered: Stockholm (also known as / includes: stockholm, gamla stan, skansen, djurgarden, junibacken, vasa museum)

Now in the app: 40 places to eat, 33 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Pelikan; Kvarnen; Tennstopet; Meatballs for the People; Ulla Winbladh; Lisa Elmqvist; Hermans; Under Kastanjen; Östermalms Saluhall; Hötorgshallen; Nystekt Strömming; Vete-Katten; Chokladkoppen; Rosendals Trädgård; Café Saturnus; Amida Kolgrill; Ta'ameya; Brunos korvbar; Mormors Dumplings; Sandhäxan; Savoj; Snack Bar; Lilla Ego; Leijontornet; Petri; Animo; Lillebror; Bistro Bestick; Slussporten; Brasserie Astrid; Teuf; Villa Valentina; Restaurang Liv; Skörden; Bibon; Blique; Mon Village Caîo; Junibacken restaurant; Haga Bottega; Boketto (Hotel Blique by Nobis)

Already in the app — things to do: Skansen; Junibacken; Vasa Museum / Vasamuseet; Gröna Lund; Tekniska museet; Swedish Museum of Natural History / Naturhistoriska riksmuseet; Nordiska museet; The Royal Armoury / Livrustkammaren; Rålambshovsparken; Royal Palace / Kungliga slottet; Butterfly House Haga Ocean / Fjärilshuset-Haga Ocean; Fjäderholmarna island boat trip / Fjäderholmarna; Stockholm City Museum / Stadsmuseet; Tom Tits Experiment; Hagaparken; Glädjefyllt; Mulle Meck Park; Baltic Sea Science Center; Postmuseum; Skistar; KD Court; Kulturhuset; The Performing Arts Museum; Tramway Museum; Norra Stationsparken playground; Kampementsbadet; Smedsuddsbadet; Flatenbadet; Ersta Minigolf; Vasaparken; Norra Stationsparken; Police Museum / Polismuseet; Leo's Lekland Kungens Kurva
