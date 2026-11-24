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

### uz-samarkand — Samarkand, Bukhara and Khiva (Uzbekistan)
Area covered: Samarkand, Bukhara and Khiva (also known as / includes: samarkand, samarqand, bukhara, khiva, itchan kala, urgench)

Now in the app: 22 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Platan; Samarkand Restaurant / Самарканд; Karimbek; Old City; Bibikhanum Teahouse / Bibikhanum; Lyabi Hauz Chaikhana / Lyabi Hauz; Old Bukhara; Minzifa; Chinar; Terrassa Cafe & Restaurant / Terrassa; Khorezm Art Restaurant / Khorezm Art; Siab Bazaar / Siyob bozori; Kolkhoz Bazaar (Central Market) / Markaziy dehqon bozori; Silk Road Tea House; Cafe Magistr / Magistr; Sangizar; Jasmin; The Mohon; Lalizar; Zargaron; Palmira; Zolotaya Bukhara

Already in the app — things to do: Registan Square / Registon; Gur-e-Amir mausoleum / Gʻuri Amir; Bibi-Khanym Mosque ruins / Bibi-Xonim; Shah-i-Zinda monuments / Shohi Zinda; Ulugh Beg Observatory and museum / Ulugʻbek rasadxonasi; Afrasiyab Museum / Afrosiyob muzeyi; Siab Bazaar / Siyob bozori; Meros paper mill, Konigil / Meros qogʻoz fabrikasi; Silk Road Waterland; Bukhara Ark fortress / Ark qalʼasi; Sitorai Mokhi-Khosa palace / Sitorai Mohi Xosa; Bukhara old town and Lyab-i-Hauz / Labi Hovuz; Chor Minor; Khiva Itchan Kala old town / Ichan Qalʼa; Kunya-Ark watchtower, Khiva / Kunya Ark; Samanid Park / Samonids Recreation Park; Silk Road Samarkand musical fountain; The Eternal City / Boqiy Shahar

### eg-cairo — Cairo and Giza (Egypt)
Area covered: Cairo and Giza (also known as / includes: cairo, giza, saqqara, dahshur, fayoum)

Now in the app: 15 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Felfela / فلفلة; Abou El Sid / أبو السيد; Naguib Mahfouz Café; Andrea El Mariouteya; 9 Pyramids Lounge; 139 Pavilion; Taboula; Maison Thomas; Kebdet El Prince / كبدة البرنس; Abou Tarek / كشري أبو طارق; Zooba / زوبا; Koshary El Tahrir / كشري التحرير; El Abd Patisserie / حلواني العبد; Mandarine Koueider; Simonds

Already in the app — things to do: Grand Egyptian Museum / المتحف المصري الكبير; Giza Pyramids and Sphinx / أهرامات الجيزة; National Museum of Egyptian Civilization / المتحف القومي للحضارة المصرية; Egyptian Museum, Tahrir / المتحف المصري بالتحرير; Cairo Citadel of Saladin / قلعة صلاح الدين; Khan el-Khalili bazaar / خان الخليلي; Al-Azhar Park / حديقة الأزهر; Pharaonic Village / القرية الفرعونية; Child Museum, Al Salam; Manial Palace Museum / قصر المنيل; Saqqara and the Step Pyramid / سقارة; Cairo Tower / برج القاهرة; Felucca ride on the Nile; Aquarium Grotto Garden; Merryland Park; Family Park; Al Zohriya Garden; KidZoo; KidZania Cairo; Blue Lotus Farm; Fagnoon Art School; Sitara Theatre; ClubLiko; Billy Beez (Mall of Arabia); Magic Galaxy (City Stars); Swiss Club Cairo

### eg-luxor — Luxor and Aswan (Egypt)
Area covered: Luxor and Aswan (also known as / includes: luxor, aswan, karnak, philae, edfu, kom ombo)

Now in the app: 23 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Sofra Restaurant & Café; Al-Sahaby Lane; Aisha Restaurant; A Taste of India; Marsam Restaurant; El Masry Restaurant / المصري; Makka Restaurant; Chef Khalil; Kato Dool; Koshari Elzaeem / كشري الزعيم; Snack Time; McDonald's Luxor; Victorian Lounge; The Terrace; Snobs Restaurant; Pizza Roma.It; Wannas Art Café; El Hussein Restaurant; The Lantern Room; El-Kababgy Luxor; Nile Valley Restaurant; Ottoman Hall (Al Moudira); Silk Road (Hilton Luxor)

Already in the app — things to do: Karnak Temple Complex / معابد الكرنك; Luxor Temple / معبد الأقصر; Luxor Museum / متحف الأقصر; Temple of Hatshepsut, Deir el-Bahari / معبد حتشبسوت; Medinet Habu / مدينة هابو; Ramesseum / الرامسيوم; Felucca ride on the Nile at Luxor; Philae Temple, Aswan / معبد فيلة; Nubian Museum, Aswan / متحف النوبة; Aswan Botanical Garden / حديقة النباتات بأسوان; Colossi of Memnon; Deir el-Medina workers' village; Karnak Sound and Light Show; Valley of the Kings; Mummification Museum; Luxor Corniche / Corniche el-Nile; Temple of Khnum; Tombs of the Nobles

### la-luangprabang — Luang Prabang (Laos)
Area covered: Luang Prabang (also known as / includes: luang prabang, luang phrabang, kuang si, phousi, vang vieng, vientiane)

Now in the app: 19 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Tamarind; Khaiphaen; Manda de Laos; Dyen Sabai; Bamboo Tree; Coconut Garden; Tangor; The Belle Rive Terrace; Luang Prabang Night Market food street; Luang Prabang Morning Market; Le Banneton; Joma Bakery Café; Saffron Coffee; Zurich Bread Factory & Café; Bamboo Garden Restaurant; Roots Restaurant; L’Elephant; BOUANG Asian Eatery; SACKy @ Blue Lagoon Restaurant

Already in the app — things to do: Kuang Si Falls and Bear Rescue Centre / ຕາດກວາງຊີ; Royal Palace Museum / ຫໍພິພິທະພັນແຫ່ງຊາດ; Mount Phousi / ພູສີ; Luang Prabang Night Market / ຕະຫຼາດມືດ; Morning Market (Talat Dala) / ຕະຫຼາດເຊົ້າ; Traditional Arts and Ethnology Centre / ຫໍພິພິທະພັນສິລະປະພື້ນເມືອງ ແລະ ຊົນເຜົ່າ; Ock Pop Tok Living Crafts Centre; Living Land Farm; Tad Sae Waterfalls / ຕາດແສ; Pha Tad Ke Botanical Garden; Luang Prabang Butterfly Park; UXO Visitors Centre; Nam Dong Park; Pak Ou Caves (Tham Ting); Children's Cultural Center; Heritage Information Centre (Heuanchan); Chicky Park Kids Playground; The Playground; Big Brother Mouse; Lao Pottery House; Laos Buffalo Dairy Farm; Sunset Boat Ride on the Mekong River
