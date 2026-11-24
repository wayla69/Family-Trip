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
Area covered: Athens (also known as / includes: athens, athina, acropolis, parthenon, plaka, piraeus)

Now in the app: 27 places to eat, 24 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: O Thanasis / Ο Θανάσης; Bairaktaris / Μπαϊρακτάρης; Scholarhio / Σχολαρχείο; Platanos Taverna / Πλάτανος; Psaras Taverna / Ψαράς; Strofi / Στροφή; Tzitzikas kai Mermigas / Τζίτζικας και Μέρμηγκας; Ta Karamanlidika tou Fani / Τα Καραμανλίδικα του Φάνη; Klimataria / Κληματαριά; O Kostas / Ο Κώστας; Ariston / Άριστον; Varvakios Agora / Βαρβάκειος Αγορά; Lukumades; Little Kook; Stani / Στάνη; Le Greche; Ama Lachei stis Nefelis; Karavitis; Colibri; To Steki tou Ilia; Smile Restaurant; Piu Verde; Bella Vespa; Kosta souvlaki; Hoocut; To Avgo tou Kokora; Acropolis Museum Café and Restaurant

Already in the app — things to do: Acropolis of Athens / Ακρόπολη; Acropolis Museum / Μουσείο Ακρόπολης; National Archaeological Museum / Εθνικό Αρχαιολογικό Μουσείο; Hellenic Children's Museum / Ελληνικό Παιδικό Μουσείο; Attica Zoological Park / Αττικό Ζωολογικό Πάρκο; Stavros Niarchos Park / Πάρκο Σταύρος Νιάρχος; National Garden / Εθνικός Κήπος; Ancient Agora of Athens / Αρχαία Αγορά; Panathenaic Stadium / Παναθηναϊκό Στάδιο; Kotsanas Museum of Ancient Greek Technology / Μουσείο Αρχαίας Ελληνικής Τεχνολογίας Κοτσανά; Museum of Greek Children's Art / Μουσείο Ελληνικής Παιδικής Τέχνης; Lycabettus Hill / Λυκαβηττός; Varvakios Central Market / Βαρβάκειος Αγορά; Monastiraki Flea Market / Αγορά Μοναστηρακίου; Ellinikon Sports Park; Diomedes Botanical Garden; Athens Happy Train; Battleship Averof museum; Benaki Toy Museum; Museum of Cycladic Art; Akti tou Iliou beach; Voula Beach; Flisvos Marina; Zappeion

### jp-kanazawa — Kanazawa (Japan)
Area covered: Kanazawa (also known as / includes: kanazawa, kenrokuen, higashi chaya, omicho, ishikawa)

Now in the app: 27 places to eat, 24 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Mori Mori Sushi Omicho / もりもり寿し 近江町店; Yamasan Sushi / 山さん寿司 本店; Kanazawa Maimon Sushi Kanazawa Station / 金沢まいもん寿司 金沢駅店; Go Go Curry Kanazawa Station Sohonzan / ゴーゴーカレー 金沢駅総本山; Grill Otsuka / グリルオーツカ; Jiyuken / 自由軒; 8-ban Ramen Kanazawa Station / 8番らーめん 金沢駅店; Miyoshian / 兼六園 三芳庵; Omicho Market / 近江町市場; Kanazawa Hyakubangai Anto / 金沢百番街 あんと; Hakuichi Higashiyama / 箔一 東山店; Le Musee de H Kanazawa / ル ミュゼ ドゥ アッシュ KANAZAWA; Morihachi Honten / 森八 本店; Nodaya Tea Shop / 野田屋茶店; Kanazawa Food Garden; Shunsai Grill Korin; Harajuku Nangoku Shuka; The Dining; Ginza Ten-Ichi; HUM&Go#; Umi no Shokudo BAY ARCE; Wood Style Cafe / ウッドスタイルカフェ; migi to hidari; Kanazawa Nagomitei Hokuto / 金沢なごみ亭 北都; RRR Grill Kitchen; Yasai Kominka / 野菜古民家; Fusion21

Already in the app — things to do: Kenrokuen Garden / 兼六園; Kanazawa Castle Park / 金沢城公園; Higashi Chaya district / ひがし茶屋街; Shima teahouse / 志摩; Nagamachi samurai district / 長町武家屋敷跡; Nomura Samurai House / 武家屋敷跡 野村家; Omicho Market / 近江町市場; 21st Century Museum of Contemporary Art / 金沢21世紀美術館; Kanazawa Umimirai Library / 金沢海みらい図書館; Ishikawa Zoo / いしかわ動物園; Kaga-Honda Museum / 加賀本多博物館; Ishikawa Prefectural Museum of History / 石川県立歴史博物館; Fukui Prefectural Dinosaur Museum / 福井県立恐竜博物館; Notojima Aquarium / のとじま水族館; National Crafts Museum, Ishikawa / 国立工芸館; Kanazawa Port Ship Handling Simulator; Yamato Koji Park; Kodomo Land; Ninja Temple (Myoryu-ji); Ono Karakuri Museum; Ishikawa Prefectural Library; Okuutatsuyama Kenmin Park; Kanazawa Port Cruise Terminal; Kanazawa Port Iki-iki Market

### p-disney-paris — Disneyland Paris (France)
Area covered: Disneyland Paris (also known as / includes: disneyland paris, disneyland, marne-la-vallee, disney village)

Now in the app: 32 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Bistrot Chez Rémy; Captain Jack's; Agrabah Café; Silver Spur Steakhouse; Walt's – an American Restaurant; The Steakhouse; Brasserie Rosalie; Casey's Corner; Colonel Hathi's Pizza Outpost; Au Chalet de la Marionnette; Earl of Sandwich; Cable Car Bake Shop; The Gibson Girl Ice Cream Parlour; Starbucks Disney Village; McDonald's Disney Village; Auberge de Cendrillon; Royal Banquet; Café Hyperion; Lucky Nugget Saloon; Pym Kitchen; Stark Factory; Super Diner; Market House Deli; Last Chance Café; Casa de Coco; Cowboy Cookout Barbecue; Café de la Brousse; Hakuna Matata Restaurant; The Old Mill; Pizzeria Bella Notte; Toad Hall Restaurant; Café Luminosity

Already in the app — things to do: Disneyland Park; Disney Adventure World; Disney Village; Grand Noël at Château de Vaux-le-Vicomte / Le Grand Noël, Vaux-le-Vicomte; Parc Astérix; France Miniature; Provins medieval town and ramparts; Les Aigles des Remparts, Provins; Sea Life Val d'Europe; Château de Fontainebleau; Lumigny Safari Reserve (Parc des Félins); Terre de Singes; Musée de la Grande Guerre, Meaux; Jablines-Annet leisure island; La Vallée Village outlet; Aqua Mundo at Villages Nature Paris / Aqua Mundo (formerly Aqualagon); Parrot World; Imagi Park; PanoraMagique balloon

### us-dc — Washington DC (United States)
Area covered: Washington DC (also known as / includes: washington dc, washington d.c., national mall, smithsonian, white house, capitol hill)

Now in the app: 25 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Old Ebbitt Grill; Founding Farmers; Ted's Bulletin; Clyde's of Georgetown; Carmine's; Jaleo; Ben's Chili Bowl; Mitsitam Native Foods Cafe; Sweet Home Café; Union Market; Georgetown Cupcake; Baked & Wired; Thomas Sweet; Silver Diner (Navy Yard); The Roost; Florida Avenue Grill; Kura Revolving Sushi Bar (Chinatown); 2 Amys; Comet Ping Pong; Medium Rare (Cleveland Park); Open City; Unconventional Diner; bartaco (The Wharf); Hard Rock Cafe Washington DC; Baked by Yael

Already in the app — things to do: Smithsonian's National Zoo; National Air and Space Museum; National Museum of Natural History; National Museum of American History; Smithsonian Carousel on the National Mall; National Gallery of Art; National Gallery of Art Sculpture Garden; United States Botanic Garden; U.S. Capitol Visitor Center; Library of Congress Jefferson Building; Union Market; Eastern Market and Sunday flea market; Kenilworth Park and Aquatic Gardens; Tidal Basin and paddle boats; Lincoln Memorial and Reflecting Pool; National Museum of the American Indian; The Yards Park; Canal Park fountains / Washington Canal Park; National Building Museum; Folger Shakespeare Library; Planet Word; International Spy Museum; The Phillips Collection; Museum of the Bible; O Museum in the Mansion; National Museum of Women in the Arts
