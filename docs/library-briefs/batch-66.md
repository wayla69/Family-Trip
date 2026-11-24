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

### my-penang — Penang (Malaysia)
Area covered: Penang (also known as / includes: penang, george town, georgetown, penang hill, batu ferringhi)

Now in the app: 26 places to eat, 28 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Tek Sen Restaurant / 德盛饭店; Hameediyah Restaurant; Line Clear Nasi Kandar; Restoran Kapitan; Tai Tong Restaurant / 大东酒楼; Auntie Gaik Lean's Old School Eatery; Ocean Green Restaurant & Seafood / 海景楼; Hai Boey Seafood / 海尾海鲜; Ferringhi Garden; Gurney Drive Hawker Centre; New Lane Hawker Centre / 新巷; Joo Hooi Cafe / 愉园茶室; Penang Road Famous Teochew Chendul / 槟榔律驰名潮州煎蕊; Toh Soon Cafe / 多春茶座; China House; Moh Teng Pheow Nyonya Koay / 莫定标娘惹粿; Cocoon+ Kids Cafe; Manaf Nasi Ayam; Fu Er Dai; Red Garden Food Paradise; Urai Thai Kitchen; The Jetty Food Court; Long Beach Food Court; 1.618 Roastery Andaman; Esplanade Food Court; Gurney Food Hall

Already in the app — things to do: Penang Hill / Bukit Bendera; The Habitat Penang Hill; Entopia; ESCAPE Penang; The TOP Penang; Penang National Park / Taman Negara Pulau Pinang; Penang Botanic Gardens; Batu Ferringhi Beach; Batu Ferringhi Night Market; George Town Street Art; Chew Jetty; Kek Lok Si Temple; Wonderfood Museum; Penang 3D Trick Art Museum; Teddyville Museum; Gurney Drive Hawker Centre; Tropical Spice Garden; Kidster Gurney Plaza; Penang State Museum; Pinang Peranakan Mansion; Penang Ferry Museum; Tech Dome Penang; Upside Down Museum; Hin Market; UFOREA; Adventure Zone; Kidland; Jaemi Wonderland

### th-maehongson — Mae Hong Son, Pang Ung and Mae Sariang (Thailand)
Area covered: Mae Hong Son, Pang Ung and Mae Sariang (also known as / includes: mae hong son, pang ung, mae sariang, ban rak thai, pang mapha, khun yuam)

Now in the app: 29 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Fern Restaurant / ใบเฟิร์น; Salween River Restaurant; Kai Mook / ไข่มุก; Lee Wine Rak Thai / ลีไวน์รักไทย; Intira Restaurant / อินทิรา; Coriander in Redwood; Riverhouse Restaurant; Mae Hong Son Walking Street / ถนนคนเดินแม่ฮ่องสอน; Sai Yut Morning Market / ตลาดสายหยุด; Coffee Morning; Nompangngai Cafe / หนมปังไง คาเฟ่; One Off Coffee; Huean Tai Coffee / เฮือนไต คอฟฟี่; Alawaa Cafe; Om Garden Cafe; Joy's Place; Dang Thai Food; Earth Tone; Nong Beer Restaurant; Pang Pao Dim Sum / ปังเปาติ่มซำ; Baan Pai Restaurant / ร้านอาหารบ้านปาย; Somtam Tad Baan Suan Pai / ส้มตำถาดบ้านสวน ปาย; Kuaitiao Pa Hom / ก๋วยเตี๋ยวป้าหอม แม่ฮ่องสอน; Jok Samunphrai Lung Ot / โจ๊กสมุนไพรลุงออ๊อด; Khao Soi Phi Nong (Pai) / ข้าวซอยพี่น้อง; Thana Phochana (Khun Yuam) / ธนโภชนา ขุนยวม; Laab Aroi Thi Sud Nai Lok / ลาบอร่อยที่สุดในโลก; Mae Luang Phen (Mae Sariang) / จิ้นตุ๊บ ไส้อั่ว แม่หลวงเพ็ญ; Hoi Kha Noodles (Ban Ja Bo) / ก๋วยเตี๋ยวห้อยขาบ้านจ่าโบ่

Already in the app — things to do: Pang Ung / ปางอุ๋ง โครงการพัฒนาตามพระราชดำริ 2; Pang Tong Palace / พระตำหนักปางตอง; Tham Pla (Fish Cave) and Pha Suea National Park / อุทยานแห่งชาติถ้ำปลา-น้ำตกผาเสื่อ; Pha Suea Waterfall / น้ำตกผาเสื่อ; Mae Surin Waterfall National Park / อุทยานแห่งชาติน้ำตกแม่สุรินทร์; Ban Rak Thai / บ้านรักไทย; Jong Kham Lake night market / ตลาดกลางคืนหนองจองคำ; Saiyut morning market (Kad Chao) / ตลาดสายหยุด (กาดเช้า); Wat Phra That Doi Kong Mu / วัดพระธาตุดอยกองมู; Tham Lod Cave; Wat Jong Kham and Wat Jong Klang; Doi Mae U Kho sunflower fields; Royal Folk Arts and Crafts Centre; Su Tong Pe bamboo bridge; Bua tong fields at Doi Mae Ho; Pai Canyon; Pai Walking Street Night Market; Pam Bok Waterfall; Mo Paeng Waterfall; Tha Pai Hot Springs; The Land Crack; Wat Phra That Mae Yen; Santichon Village; Yun Lai Viewpoint / จุดชมวิว ทะเลหมอก หยุนไหล; Pai Historic Bridge / สะพานประวัติศาสตร์ ท่าปาย

### it-amalfi — The Amalfi Coast and Pompeii (Italy)
Area covered: The Amalfi Coast and Pompeii (also known as / includes: amalfi, amalfi coast, positano, sorrento, capri, pompeii)

Now in the app: 26 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Chez Black; La Tagliata; Da Vincenzo; Trattoria Da Maria; Ristorante O'Parrucchiano La Favorita; Trattoria Da Emilia; Cumpà Cosimo; Add'ù Mimì; Caupona; Pizzeria Da Franco; Cuoppo d'Amalfi; Pasticceria Pansa; Sal De Riso; Gelateria Primavera; Collina Positano Bakery; Il Fornillo; Capricci; Maria Grazia; Acquapazza; Hostaria Baccofurore; Al Convento; Pescheria CICA con Cucina; La Frittura del Golfo; I Due Fratelli; Pasticceria Russo; Il Mulino

Already in the app — things to do: Pompeii Archaeological Park / Parco Archeologico di Pompei; Herculaneum Archaeological Park / Parco Archeologico di Ercolano; Vesuvius, Gran Cono trail / Vesuvio, Sentiero del Gran Cono; Villa Rufolo gardens, Ravello / Villa Rufolo; Villa Cimbrone gardens, Ravello / Giardini di Villa Cimbrone; Paper Museum, Amalfi / Museo della Carta; Emerald Grotto / Grotta dello Smeraldo; Reggia di Caserta and Royal Park / Reggia di Caserta; National Archaeological Museum of Naples / MANN – Museo Archeologico Nazionale di Napoli; Maiori beach / Spiaggia di Maiori; Positano, Spiaggia Grande / Spiaggia Grande, Positano; Paestum Archaeological Park / Parco Archeologico di Paestum; Path of the Gods / Sentiero degli Dei; Valley of the Mills walk, Amalfi / Valle dei Mulini; Lemon Path, Maiori to Minori / Sentiero dei Limoni; MAR Roman Archaeological Museum / Museo Archeologico Romano; Fornillo beach / Spiaggia di Fornillo; Arienzo beach / Spiaggia di Arienzo; Santa Maria Assunta church / Chiesa di Santa Maria Assunta; Marina Grande; Villa Fiorentino park; Villa Comunale; Bagni della Regina Giovanna; Ceramics Museum, Villa Guariglia / Museo della Ceramica di Villa Guariglia; Amalfi Cathedral / Duomo di Sant'Andrea; Valle delle Ferriere

### th-krabi — Krabi and Phi Phi (Thailand)
Area covered: Krabi and Phi Phi (also known as / includes: krabi, ao nang, railay, phi phi, koh lanta)

Now in the app: 26 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Ruen Mai / เรือนไม้; Krua Thara / ครัวธารา; Kotung / โกตุง; Lae Lay Grill; D&E's Jungle Kitchen; KoDam Kitchen / ครัวโกดำ; Wang Sai Seafood / วังทรายซีฟู้ด; Papaya Restaurant; Garlic 1992; Krabi Town Walking Street / ถนนคนเดินกระบี่; Chao Fah Night Market / ตลาดโต้รุ่งท่าเรือเจ้าฟ้า; Ao Nang Landmark Night Market; Café 8.98; Pee Pee Bakery; Thongyib Thongyod / ทองหยิบทองหยอดคาเฟ่; Pum Thai Restaurant; Ton Ma Yom / ร้านอาหารต้นมะยม; Gecko Cabane; Chalita Cafe / ร้านอาหารชลิตาคาเฟ่; Burger Bung / เบอร์เกอร์บัง; Ruanthip (Khlong Son) / ร้านอาหารเรือนทิพย์ (คลองสน); Baan Ma-Ying / ร้านอาหารบ้านมะหญิง; Baan Tha Ley Cafe / บ้านทะเล คาเฟ่ กระบี่; Makan Tam Saep and Coffee / มากัน ตำแซ่บ แอนด์ คอฟฟี่; Sprucy Cafe / ร้านสพรูซี่คาเฟ่; Cha-Lom / ร้านอาหารชะลอม

Already in the app — things to do: Ao Nang Beach; Nopparat Thara Beach; Railay Beach; Krabi 4 Islands tour; Emerald Pool; Khlong Thom Hot Springs; Than Bok Khorani National Park; Tha Pom Khlong Song Nam; Tiger Cave Temple; Wat Khlong Thom Museum; Klang Cave; Shell Fossil Cemetery; Krabi Town Walking Street; Thara Park; Ao Nang Landmark Night Market; The Fun Garden; Krabi Aquarium; Hong Island (Koh Hong) / เกาะห้อง; Maya Bay; Koh Phi Phi Don; Blue Pool (Sa Nam Phut); Khlong Muang Beach / หาดคลองม่วง; Tubkaek Beach; Kayaking on Ao Thalane; Dragon's Crest (Khao Ngon Nak); HarborLand Central Krabi
