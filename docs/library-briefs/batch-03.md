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

### my-langkawi — Langkawi (Malaysia)
Area covered: Langkawi (also known as / includes: langkawi, pantai cenang, sky bridge, kilim)

Already in the app — places to eat: Wonderland Food Store / 旺得隆海鲜; Orkid Ria Seafood Restaurant; Restoran Siti Fatimah; Scarborough Fish 'n Chips; Red Tomato; The Cliff Restaurant & Bar; Nasi Dagang Pak Malau; Kak Yan Nasi Campur; Laksa Ikan Sekoq; Kuah Night Market; Temoyong Night Market; Smiling Buffalo Cafe; MY French Factory

Already in the app — things to do: Langkawi SkyCab and Sky Bridge; Underwater World Langkawi; Langkawi Wildlife Park; Crocodile Adventureland; Langkawi 3D Art Museum; Laman Padi rice museum; Kilim mangrove boat tour; Pantai Cenang beach; Kuah night market; Oriental Village; Telaga Tujuh waterfall; Eagle Square; Langkawi Craft Complex / Kompleks Kraf Langkawi; Splash Out Langkawi; Maha Tower; Makam Mahsuri (Mahsuri's Tomb); Dream Forest Langkawi

### my-penang — Penang (Malaysia)
Area covered: Penang (also known as / includes: penang, george town, georgetown, penang hill)

Already in the app — places to eat: Tek Sen Restaurant / 德盛饭店; Hameediyah Restaurant; Line Clear Nasi Kandar; Restoran Kapitan; Tai Tong Restaurant / 大东酒楼; Auntie Gaik Lean's Old School Eatery; Ocean Green Restaurant & Seafood / 海景楼; Hai Boey Seafood / 海尾海鲜; Ferringhi Garden; Gurney Drive Hawker Centre; New Lane Hawker Centre / 新巷; Joo Hooi Cafe / 愉园茶室; Penang Road Famous Teochew Chendul / 槟榔律驰名潮州煎蕊; Toh Soon Cafe / 多春茶座; China House; Moh Teng Pheow Nyonya Koay / 莫定标娘惹粿

Already in the app — things to do: Penang Hill / Bukit Bendera; The Habitat Penang Hill; Entopia; ESCAPE Penang; The TOP Penang; Penang National Park / Taman Negara Pulau Pinang; Penang Botanic Gardens; Batu Ferringhi Beach; Batu Ferringhi Night Market; George Town Street Art; Chew Jetty; Kek Lok Si Temple; Wonderfood Museum; Penang 3D Trick Art Museum; Teddyville Museum; Gurney Drive Hawker Centre; Tropical Spice Garden

### id-lombok — Lombok and the Gili islands (Indonesia)
Area covered: Lombok and the Gili islands (also known as / includes: lombok, gili trawangan, gili air, gili meno)

Already in the app — places to eat: Asmara Restaurant; Square Restaurant; Lotus Bayview; Rumah Makan Taliwang Irama; Sate Rembiga Ibu Sinnaseh; Nasi Balap Puyung Inaq Esun; El Bazar Cafe & Restaurant; Warung Flora; Scallywags Seafood Bar & Grill; Scallywags Beach Club; Regina Pizzeria; Gili Trawangan Night Market; Lombok Epicentrum Mall; Gili Gelato; Kayu Cafe; Milk Espresso

Already in the app — things to do: Sendang Gile and Tiu Kelep waterfalls; Benang Kelambu waterfall; Selong Belanak Beach; Mandalika Beach; Pink Beach (Tangsi); Lombok Wildlife Park; Gili Meno Turtle Sanctuary; Mayura Water Palace; West Nusa Tenggara State Museum; Sade Sasak Village; Senggigi Beach; Bale Mangrove Ecotourism; Mawun Beach; Tanjung Aan Beach; Senggigi Night Market; Islamic Center NTB (Hubbul Wathan Mosque) / Islamic Center NTB Hubbul Wathan

### id-yogyakarta — Yogyakarta and Borobudur (Indonesia)
Area covered: Yogyakarta and Borobudur (also known as / includes: yogyakarta, jogja, jogjakarta, borobudur)

Already in the app — places to eat: Gudeg Yu Djum Wijilan 167; Bale Raos; Ayam Goreng Suharti; The House of Raminten; Sate Klathak Pak Pong; Bakmi Jowo Mbah Gito; Jejamuran; Mediterranea Restaurant by Kamil; ViaVia Jogja; Kopi Klotok; Stupa Restaurant by Plataran; Angkringan Kopi Joss Lik Man; Pasar Beringharjo; Tempo Gelato Prawirotaman; Bakpia Pathok 25; Toko Roti Djoen

Already in the app — things to do: Borobudur Temple; Prambanan Temple; Gembira Loka Zoo; Taman Pintar science park; Jogja Bay Pirates Adventure Waterpark; Kraton Yogyakarta (Sultan's Palace); Taman Sari water castle; Pasar Beringharjo; Museum Sonobudoyo; Ullen Sentalu Museum; HeHa Sky View; Ratu Boko archaeological park; Affandi Museum; Sindu Kusuma Edupark; Dirgantara Mandala Air Force Museum; Vredeburg Fortress Museum
