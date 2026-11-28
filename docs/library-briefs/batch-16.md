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

### gr-athens — Athens (Greece)
Area covered: Athens (also known as / includes: athens, athina, acropolis, parthenon)

Already in the app — places to eat: O Thanasis / Ο Θανάσης; Bairaktaris / Μπαϊρακτάρης; Scholarhio / Σχολαρχείο; Platanos Taverna / Πλάτανος; Psaras Taverna / Ψαράς; Strofi / Στροφή; Tzitzikas kai Mermigas / Τζίτζικας και Μέρμηγκας; Ta Karamanlidika tou Fani / Τα Καραμανλίδικα του Φάνη; Klimataria / Κληματαριά; O Kostas / Ο Κώστας; Ariston / Άριστον; Varvakios Agora / Βαρβάκειος Αγορά; Lukumades; Little Kook; Stani / Στάνη; Le Greche

Already in the app — things to do: Acropolis of Athens / Ακρόπολη; Acropolis Museum / Μουσείο Ακρόπολης; National Archaeological Museum / Εθνικό Αρχαιολογικό Μουσείο; Hellenic Children's Museum / Ελληνικό Παιδικό Μουσείο; Attica Zoological Park / Αττικό Ζωολογικό Πάρκο; Stavros Niarchos Park / Πάρκο Σταύρος Νιάρχος; National Garden / Εθνικός Κήπος; Ancient Agora of Athens / Αρχαία Αγορά; Panathenaic Stadium / Παναθηναϊκό Στάδιο; Kotsanas Museum of Ancient Greek Technology / Μουσείο Αρχαίας Ελληνικής Τεχνολογίας Κοτσανά; Museum of Greek Children's Art / Μουσείο Ελληνικής Παιδικής Τέχνης; Lycabettus Hill / Λυκαβηττός; Varvakios Central Market / Βαρβάκειος Αγορά; Monastiraki Flea Market / Αγορά Μοναστηρακίου; Ellinikon Sports Park / Ellinikon Sports Park

### gr-santorini — Santorini (Greece)
Area covered: Santorini (also known as / includes: santorini, oia, fira, thira)

Already in the app — places to eat: Naoussa / Ναούσα; Pelican Kipos; Metaxi Mas / Μεταξύ Μας; Dimitris Ammoudi Taverna; Roka / Ρόκα; To Psaraki / Το Ψαράκι; The Good Heart; The Cave of Nikolas; Anogi / Ανώγι; Lucky's Souvlakis; Pitogyros; Yogi Gyro; Lolita's Gelato; Melenio; Solo Gelato

Already in the app — things to do: Akrotiri archaeological site / Ακρωτήρι; Museum of Prehistoric Thera / Μουσείο Προϊστορικής Θήρας; Fira cable car / Τελεφερίκ Θήρας; Ancient Thera / Αρχαία Θήρα; Lost Atlantis Experience; Koutsoyannopoulos Wine Museum / Μουσείο Οίνου Κουτσογιαννόπουλου; Naval Maritime Museum of Oia / Ναυτικό Μουσείο Οίας; Megaro Gyzi Museum / Μέγαρο Γκύζη; Lignos Folklore Museum / Λαογραφικό Μουσείο Λιγνού; Volcano and hot springs boat trip; Perissa beach / Περίσσα; Kamari beach / Καμάρι; Fira to Oia caldera walk; Tomato Industrial Museum; Oia village / Οία

### hr-dubrovnik — Dubrovnik (Croatia)
Area covered: Dubrovnik (also known as / includes: dubrovnik, lokrum, stradun, hvar)

Already in the app — places to eat: Lokanda Peskarija; Kopun; Taj Mahal; Pizzeria Mea Culpa; Oliva Pizzeria; Konoba Dalmatino; Restaurant Orsan; Pantarul; Konoba Dubrava; Pizzeria Tabasco; Barba; Buffet Škola; Gruž Market; Dolce Vita; Peppino's Gelato; Gradska Kavana Arsenal

Already in the app — things to do: Dubrovnik city walls / Dubrovačke gradske zidine; Stradun and Onofrio's Fountain / Stradun; Dubrovnik cable car / Dubrovačka žičara; Dubrovnik Maritime Museum / Pomorski muzej Dubrovnik; Dubrovnik Aquarium / Akvarij Dubrovnik; Lokrum Island / Lokrum; Rector's Palace and Cultural History Museum / Knežev dvor; Fort Lovrijenac / Tvrđava Lovrijenac; Trsteno Arboretum / Arboretum Trsteno; Dubrovnik Natural History Museum / Prirodoslovni muzej Dubrovnik; Homeland War Museum, Fort Imperial / Muzej Domovinskog rata; Ethnographic Museum (Rupe) / Etnografski muzej Rupe; Banje Beach / Plaža Banje; Gradac Park / Park Gradac; Gruž Market / Gruška tržnica

### hu-budapest — Budapest (Hungary)
Area covered: Budapest (also known as / includes: budapest, danube, szechenyi, chain bridge)

Already in the app — places to eat: Menza; Gettó Gulyás; Paprika Vendéglő; VakVarjú Étterem; Kéhli Vendéglő; Náncsi Néni Vendéglője; Pest-Buda Bistro; Frici Papa Kifőzdéje; Trófea Grill Étterem; Nagyvásárcsarnok; Karaván; Retró Lángos Büfé; Gerbeaud; Ruszwurm Cukrászda; Gelarto Rosa; Molnár's Kürtőskalács

Already in the app — things to do: Budapest Zoo and Botanical Garden / Budapesti Állat- és Növénykert; Tropicarium Budapest / Tropicarium-Óceanárium; Palace of Wonders / Csodák Palotája; Hungarian Railway History Park; Great Market Hall / Nagyvásárcsarnok; Palatinus Strand on Margaret Island; Margaret Island and the Musical Fountain / Margitsziget; City Park Main Playground / Városligeti Nagyjátszótér; Budapest Children's Railway / Gyermekvasút; Zugliget Chairlift / Libegő; Buda Castle Funicular / Budavári Sikló; Fisherman's Bastion / Halászbástya; City Park Ice Rink / Városligeti Műjégpálya; Hungarian Open Air Museum (Skanzen) / Szabadtéri Néprajzi Múzeum; Hungarian Natural History Museum / Magyar Természettudományi Múzeum
