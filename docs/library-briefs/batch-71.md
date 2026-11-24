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

### th-ubon — Ubon Ratchathani (Thailand)
Area covered: Ubon Ratchathani (also known as / includes: ubon ratchathani, ubon, khong chiam, pha taem, sam phan bok, kaeng tana)

Now in the app: 15 places to eat, 24 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Indochine / อินโดจีน; Samchai Coffee (Thepyothi) / สามชัยกาแฟ; Sam Chai Kai Yang / สามชัยไก่ย่าง; Porntip Kai Yang Wat Jaeng / พรทิพย์ไก่ย่างวัดแจ้ง; Guay Jub Ubon / ก๋วยจั๊บอุบล; a-ga-ve Café & Restaurant / อากาเว่; Chiokee / เจียวกี่; Kuay Jap Tor Bor / ก๋วยจั๊บ ทบ.; Ubon Ocha / อุบลโอชา; Ubon Night Market / ตลาดโต้รุ่งราชบุตร; Central Ubon food court / ศูนย์อาหาร เซ็นทรัล อุบล; Abe Specialty Coffee; Arabus Experience Café / อาราบัส; Warichjitrana Cafe & Farm; Khwam Song Cham (Memory) Cafe

Already in the app — things to do: Ubon Ratchathani National Museum / พิพิธภัณฑสถานแห่งชาติ อุบลราชธานี; Ubon Ratchathani Science Centre for Education / ศูนย์วิทยาศาสตร์เพื่อการศึกษาอุบลราชธานี; Ubon Ratchathani Zoo / สวนสัตว์อุบลราชธานี; Pha Taem National Park / อุทยานแห่งชาติผาแต้ม; Two-colour river viewpoint / แม่น้ำสองสี; Sirindhorn Dam / เขื่อนสิรินธร; Nong Bua Public Park / สวนสาธารณะหนองบัว; Central Ubon / เซ็นทรัล อุบลราชธานี; Thung Sri Muang night market / ทุ่งศรีเมือง; Kaeng Tana National Park; Huai Luang Waterfall; Warin Chamrap market; Pattaya Noi, Sirindhorn Dam; Sam Phan Bok; Saeng Chan Waterfall; Wat Sirindhorn Wararam; Wat Phra That Nong Bua; Wat Thung Si Mueang; Golden Monument of Thung Sri Mueang; Sao Chaliang; Thung Na Mueang Waterfalls; Wat Tham Heo Sin Chai; Wat Nong Pah Pong / วัดหนองป่าพง; Wat Tham Khuha Sawan / วัดถ้ำคูหาสวรรค์

### de-hamburg — Hamburg (Germany)
Area covered: Hamburg (also known as / includes: hamburg, speicherstadt, elbphilharmonie, hafencity, st. pauli, st pauli)

Now in the app: 15 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Fischereihafen Restaurant; Old Commercial Room; Fischerhaus; Gröninger Privatbrauerei; Bullerei; Schönes Leben Speicherstadt; Oberhafen-Kantine; Alt Hamburger Aalspeicher; Brücke 10; Rindermarkthalle St. Pauli; Jim Block Jungfernstieg; Speicherstadt Kaffeerösterei; Luicella's Ice Cream; Mutterland Stammhaus; Alsterdorfer Kesselhaus

Already in the app — things to do: Miniatur Wunderland; Tierpark Hagenbeck; Planten un Blomen; Elbphilharmonie Plaza; International Maritime Museum; Harbour boat tour (Barkassen); Fish market (Fischmarkt); Planetarium Hamburg; Museum der Arbeit; Rickmer Rickmers museum ship; Elbe beach and Övelgönne museum harbour; Speicherstadt and HafenCity walk; Alster boat trip; Hamburger Kunsthalle; Altonaer Museum; Urbaneo – young architecture centre; SpielScheune der Geschichten; Energieberg Georgswerder; Wildgehege Klövensteen; Wasserkunst Elbinsel Kaltehofe; Gut Karlshöhe; KLICK Children’s Museum / KLICK Kindermuseum; Goblinstadt; Cap San Diego; Museum of Nature – Zoology / Museum der Natur Hamburg – Zoologie

### fi-helsinki — Helsinki (Finland)
Area covered: Helsinki (also known as / includes: helsinki, helsingfors, suomenlinna, temppeliaukio)

Now in the app: 20 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Sea Horse; Ravintola Kuu; Kolme Kruunua; Savotta; Lappi Ravintola; Konstan Möljä; Ravintola Salve; Kappeli; Suomenlinnan Panimo; Vanha Kauppahalli; Hakaniemen Kauppahalli; Kauppatori; Cafe Regatta; Fazer Café Kluuvikatu; Ekberg; Café Engel; The Social (Clarion Hotel Helsinki); The Social (Clarion Hotel Mestari); Toscanini; Linnankellari

Already in the app — things to do: Linnanmäki Amusement Park / Linnanmäki; Korkeasaari Zoo / Korkeasaaren eläintarha; Heureka Science Centre / Tiedekeskus Heureka; Suomenlinna Sea Fortress / Suomenlinna; SEA LIFE Helsinki; Oodi Central Library / Keskustakirjasto Oodi; Helsinki City Museum and Children's Town / Helsingin kaupunginmuseo, Lasten kaupunki; Seurasaari Open-Air Museum / Seurasaaren ulkomuseo; Old Market Hall / Vanha Kauppahalli; Natural History Museum / Luonnontieteellinen museo; Serena Water Park / Serena Vesipuisto; Allas Sea Pool; Kaivopuisto Park and playground / Kaivopuisto; Architecture and Design Museum / Arkkitehtuuri- ja designmuseo; Kiasma Museum of Contemporary Art; Puppet Theatre Sampo / Nukketeatteri Sampo; Helsinki Winter Garden / Talvipuutarha; Leikkiluola; SkyWheel Helsinki; Helsinki Tram Museum / Raitioliikennemuseo

### fr-alps — Chamonix and Annecy (France)
Area covered: Chamonix and Annecy (also known as / includes: chamonix, mont blanc, aiguille du midi, mer de glace, annecy, french alps)

Now in the app: 14 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: La Calèche; Le Monchu; La Maison Carrier; La Crèmerie du Glacier; Le Freti; Chez Mamie Lise; L'Étage; Poco Loco; Marché de la Vieille Ville d'Annecy; Aux Petits Gourmands; Chalet 4810; Glacier des Alpes; Le Fidèle Berger; L’Aquarama (Angon)

Already in the app — things to do: Aiguille du Midi cable car; Mer de Glace and the Montenvers train; Mont Blanc Tramway; Lake Annecy boat cruise; Annecy Castle museum / Musée-Château d'Annecy; Palais de l'Île; Gorges du Fier; Richard Bozon swimming pool; Annecy old town market; Mont Blanc Museum / Musée du Mont-Blanc; Le Pâquier lakeside park; Annecy old town and canals; Chamonix Alpine coaster and Planards park; Lake Annecy Ecomuseum; Albigny beach; Parc de Merlet; Lac des Chavants leisure park / Base de Loisirs des Chavants; Parc Charles Bosson; Plage de la Brune; Talloires beach / Plage municipale de Talloires; Bout du Lac nature reserve; Le Semnoz; Parc animalier de la Grande Jeanne; La Turbine sciences; Cinéma Les Nemours; Acro’Aventures Talloires
