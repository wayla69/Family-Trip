# The library of places to eat

Owner, 19 Nov 2026: "ร้านอาหารด้วย แนวเดียวกับเล่มฮ่องกงและออสเตรเลีย ทำเป็นคลัง" → "คลังเติมเอง", then "เพิ่มร้านอาหารให้ครบทุกประเทศเลย
เอาแบบลึกๆ". Code: `server/eatlib.js`, table `eat_lib` (migration 0036), page `#/eats`, the planner's "where to eat along the route".

## Three sources, in order of trust

| Source (`src`) | What it is | Checked? |
|---|---|---|
| `helper` | A parent pressed "ask the helper to find and check places" for a town: one call with web search | Yes, on the day shown on the card |
| `book` | The "where to eat" of a book the family has (the two bundled books: 506 places) | As the book's manual was — by the owner |
| `starter` | The app's built-in list, `server/eats/<cc>-<n>.json`: 3,139 places in all 207 cities of the picture library | **Partly** — 648 places carry the month a web search confirmed them open; see below |

A helper row replaces a book row of the same name, a book row replaces a built-in one; never the other way round. A place the parents
take out stays out. The web check of a book (planner phase 3) writes what it found on the library's row of the same name.

## The built-in list: how it was made, and how far to trust it

Written on 19 Nov 2026 by thirteen workers, one per region, from what they know of long-running, well-known places (local
institutions, family restaurants, well-known chains' main branches, food courts in big malls and stations, markets). Each was told to
check doubtful places on the web and leave out what it could not confirm.

**The web check fell far short of the plan.** The workers shared one allowance of 200 searches, which ran out early. Where a search
did run it usually showed that a place exists and where it is, rarely that it is open this year. So:

- Every built-in place is shown as "from the app's built-in list · not checked today — check before you go", with no opening hours.
- A row may carry `"ok": "YYYY-MM"` = the month a web search showed it trading (its own site, a tourism office, a dated 2025–2026
  listing or review). Only then the card says "open" and "web check <month>". 648 rows have it (in 206 of the 207 towns).
- Prices are rough ranges from memory. The least reliable: Argentine pesos, Turkish lira, Myanmar kyat (inflation).
- Street names and numbers inside the map queries are from memory; the name, district and town are the reliable part.
- About 30 places the workers had planned were dropped because a search showed them closed or moved.

To confirm a town before a trip: open it on `#/eats` and press "ask the helper for more places here" (those are web-checked), or make
the book and run "check the places on the web" on it.

### The second pass (19 Nov 2026)

Eight workers, 20 searches each, on the 42 weakest towns: Khao Kho, Loei, Chanthaburi, Nakhon Si Thammarat, Surat Thani (and the gaps
at Pranburi, Khanom, Mae Moh), Phu Quoc, Da Lat, Nha Trang, Hue, Yangon, Bagan, Zhangjiajie, the Gobi, Yunnan, Chongqing, Samarkand,
Komodo, Lombok, Langkawi, Boracay, Bohol, Plitvice, Pamukkale, Cappadocia, Valletta, Santorini, Queenstown, Fiji, the Atacama,
Patagonia, the Blue Mountains, Hakone, Nikko, Kanazawa, Nagano, Nagasaki, Kumamoto, Hallstatt, Český Krumlov, Rothenburg, Kruger and
Disneyland Paris. Page fetches were blocked, so everything rests on search summaries.

- About 110 rows got `ok`; about 25 were removed (closed, or no trace in several searches); about 40 were added; many addresses fixed.
- Removed for not suiting small children: a bar-pizzeria in Katoomba, a shisha restaurant in Langkawi, an expensive dining room in Nagasaki.
- **No `ok` at all** in Hue, Patagonia, Kruger, Kanazawa, Nagano, Nagasaki, Kumamoto and Lampang — the sources found were undated.
- **Myanmar** stays unmarked: the only "2026" sources were aggregator lists, too weak to count. Yangon has 11 rows, Bagan/Inle 12.
- **Kruger**: SANParks named new restaurant operators on 12 Oct 2026; the four camp rows carry the camp's own name until the new
  restaurants are named — revisit.
- **Disneyland Paris**: Rainforest Cafe is gone (it closes for good in 2026); Annette's Diner reopens early 2027 and is not listed.
- Not done: re-basing Turkish lira and Argentine peso prices (no current menu prices were found).
- Rows still worth one more look: Daikoku (Fiji), La Waflería (El Chaltén), Uoyo (Nikko), Heaven Restaurant (Phu Quoc), five Labuan
  Bajo places no search mentioned (Artomoro, Taman Laut Handayani, Cafe in Hit, Warung Mama, Cafe Melinjo), Country Terrace (Gozo),
  Albig's Quick Restaurant (Rothenburg), Luk Lao (Chiang Khan).

### The third pass (19 Nov 2026)

Owner: "เช็กรอบสองเมืองที่เหลือให้ครบเลย". Twenty-eight workers in three waves, 19 searches each, on the 163 towns the second pass
had not reached — so every town has now had a web check. Page fetches were still blocked; everything rests on search summaries.

- `ok` went from 123 rows to 513; the list from 3,150 places to 3,124 (about 75 removed: closed, moved away, or no trace in two
  searches; about 35 added or renamed to the place's real name). Many addresses in the map queries were corrected.
- Most searches returned undated guides, which do not earn `ok`. **33 towns still have no `ok` at all**: Patagonia, Melbourne,
  Bhutan, Geneva, Xi'an, Heidelberg, Barcelona, Helsinki, Dubrovnik, Cinque Terre, Takayama, Kanazawa, Nagano, Nagasaki, Kumamoto,
  Sri Lanka's hills, Yangon, Bagan, Langkawi, Rotorua, Cusco, Bled, Pattaya, Nan, Lampang, Rayong, Koh Chang, central Taiwan,
  Hawaii, Chicago, Boston, Hue, Kruger. Their rows are long-running places found in listings, not confirmed this year.
- Short lists after removals (an honest gap, not a guess): Mae Hong Son 12, Guilin 11, Yangon 11, the Gobi 11. The lint now asks
  for five restaurants a town, not six (Korat).
- Taken out for not suiting small children or the budget: a brewery hall in Luxembourg's nightlife strip, a bar-restaurant with
  club nights in Dublin, a brewery and concert venue in Lyon, Mama's Fish House (Hawaii), Pancakes Amsterdam, a mall row in Petra.
- In small Thai towns a place with "no trace in an English search" may still be trading. Fourteen were removed that way and
  put back on the owner's word the same day, unmarked: Jae Lek, Nai Wan (Hat Yai–Songkhla), Roti Mina, Flour Power Bakery (Koh
  Lipe), Ban Phleng, Pa Sri Bua (Mae Hong Son), Dee Amnuay Choke, Doppio (Ubon), King Ocha, Lab Nua, Peng Duck Noodles (Udon),
  Rabieng Pa (Korat), Rabiang Pa (Khao Yai), Guang Tang Noodles (Khon Kaen). Check them before a trip.
- Still not done: re-basing Argentine peso and Turkish lira prices (only Güerrin's 2026 prices were found, and they fit).
- Rows worth one more look: The Empire Cafe (Kandy), Bear's Paw Bakery (Jasper), Pandeli (Istanbul), Al Dhafra (Abu Dhabi),
  Plage Café (Rio), Fortín Cataratas (Iguazú), Petit Royal (Zermatt), Pantarul (Dubrovnik), Kaffee Mayer (Bratislava),
  Vechnoe Nebo (Astana), Bilig Vegan Bistro (Ulaanbaatar, new address unknown), Mr Shi's Dumplings (Beijing).

### The fifth pass (19 Nov 2026)

Owner: "ตรวจ 7 เมืองที่เหลือให้ครบด้วย". Four workers on the seven towns with nothing confirmed, one place per search with a year or
"review" in it, in the local language. Opening the review sites themselves (Tabelog, Wongnai) is not possible from the session.

- Confirmed now: Cusco 8, Nagano 4, Cinque Terre 1 (Il Casello), Yangon 1 (Aung Thukha), Rayong 1 (Jae Yindee Seafood, added),
  Lampang 1 (Khao Soi Mae Fong, in place of the Chae Son park stalls). 648 rows confirmed, 3,139 places.
- **Bagan/Inle is the only town with nothing confirmed**, and it lost two places: Sanon (had not reopened in 2025) and Inthar
  Heritage House (its non-profit shut at the end of 2024). Myanmar has almost no dated coverage while governments advise against
  travel; Yangon 11, Bagan/Inle 10 — check again when tourism returns.
- Removed in Rayong: Kuay Tiew Kang Ban Phe (its listing says shut until 30 May 2027).
- Doubted: the Matsumoto Karaage Center station branch, Hearts Café in Ollantaytambo (a guide shows "Fermé"), Rangoon Tea House
  (some listings say closed for good), Khao Soi Omar (Lampang), Jep's (Koh Samet), Mojsa (it is in Puno, far from Cusco).

### The fourth pass (19 Nov 2026)

Owner: "ตรวจให้หมดอีกที และอันไหนที่ยังไม่มีเพิ่มได้เลย". Nine workers, 19 searches each, **searching in the local language**, on
the 33 towns with nothing confirmed, the short lists, the fourteen Thai places put back, and single rows earlier passes doubted.

- `ok` 513 → 632 rows; towns with nothing confirmed 33 → **7**: Cinque Terre, Nagano, Yangon, Bagan/Inle, Cusco, Lampang, Rayong
  (search summaries gave only undated pages — these need a tool that opens Google Maps, Wongnai or Tabelog pages).
- Filled: Mae Hong Son 12 → 16 (four cafés from the provincial commerce office's list), Guilin 11 → 14, Langkawi, Hue, Nagasaki,
  Koh Chang, Agra (+2), the High Tatras (+3), Jordan (+2), Nuwara Eliya (+2, it had none). Still short: Yangon 11, the Gobi 11,
  Bagan/Inle 12 — nothing there could be confirmed, so nothing was added.
- Removed: Plage Café (Rio — Parque Lage shut for restoration until 2027), Uoyo (Nikko, closed → a yuba soba shop near Toshogu),
  Pradeep (Sigiriya), a rooftop café-bar in Langkawi, Bilig (Ulaanbaatar — reports conflict on whether it trades).
- Kruger's camp rows carry the restaurants' names after the Oct 2026 change of operators: Cattle Baron Skukuza, Sabie River Café
  (Lower Sabie), Tindlovu at Satara and Olifants (the last two unmarked: the source's date was not shown).
- The fourteen Thai places put back: found in Thai and re-addressed — Jae Lek (a Thai cook shop on Niphat Uthit 2, not seafood;
  renamed "Jae Lek Thai Restaurant"), Nai Wan, Roti Mina, Pa Sri Bua, Guang Tang Noodles (Michelin listing → `ok`). A Thai search
  still found **no trace** of Ban Phleng, Dee Amnuay Choke, King Ocha, Lab Nua, Peng Duck Noodles, Rabieng Pa (Korat), Rabiang Pa
  (Khao Yai); Flour Power Bakery only on Wikivoyage; Doppio's listing showed it shut at the time. They stay, unmarked, on the
  owner's word.
- Settled as trading: Petit Royal (Zermatt), The Empire Cafe (Kandy), Pantarul (Dubrovnik), Pizzeria Libretto (University Ave),
  Country Terrace (Gozo), Al Dhafra (Abu Dhabi, re-addressed), Artomoro (Labuan Bajo — rewritten: grilled fish, not Italian).
- Still unknown: Bear's Paw Bakery (Jasper), Pandeli (Istanbul), Vechnoe Nebo (Astana), Hôtel Heintz (Vianden, shut Nov–Mar),
  Les Trois Sifflets (Vevey), Kuay Tiew Kang Ban Phe (a listing says closed until May 2027), Sharky's (Yangon), Sanon (Bagan),
  La Tablita's street (El Calafate), "The Tea Rooms 1892" (Melbourne).
- **A place taken out of the files now leaves every family's library** on the next boot (`syncStarter`); before, the built-in
  list was only ever added to. A book's or the helper's row is never removed, and a place the parents took out stays out.

### What had a web check in the first pass

| Region | Checked | Not checked |
|---|---|---|
| Japan | Tokyo, Osaka, Kyoto, Hokkaido (12 places, all found open) | the other twelve cities |
| Korea, Taiwan, Singapore, Hong Kong, Macau | Seoul, Busan, Jeju, Gangwon, Gyeongju (3+ each); Taiwan partly | Hualien, Singapore, Hong Kong, Macau |
| China, Mongolia, Kazakhstan, Uzbekistan | a few places per Chinese city | most of Central Asia |
| Vietnam, Laos, Cambodia, Myanmar | 3+ places per city (existence) | Myanmar: nothing dated after 2021 |
| Indonesia, Malaysia, Philippines, Maldives, India, Nepal, Bhutan, Sri Lanka | Labuan Bajo, Malé, Bhutan, Langkawi, part of Lombok and Kota Kinabalu | Bali, Yogyakarta, Kuala Lumpur, Penang, Boracay, Bohol/Cebu, Delhi/Agra/Jaipur, Kathmandu, Kandy/Ella/Sigiriya |
| Thailand | several places in Nan, Hat Yai, Lipe, Trang, Sukhothai, Rayong, Ayutthaya, Hua Hin, Pattaya, Isan cities | Bangkok, Chiang Mai, Phuket, Krabi, Samui, Khao Yai, Khao Kho, Loei, Chanthaburi |
| France, UK, Ireland, Benelux | Mont-Saint-Michel, Nice, Strasbourg/Colmar, Provence | UK, Ireland, Belgium, Netherlands, Luxembourg |
| Germany, Austria, Switzerland, Czechia, Hungary, Poland, Slovakia, Slovenia | Füssen/Hohenschwangau, Rothenburg, Hamburg, Cologne (existence) | the other sixteen cities |
| Italy, Spain, Portugal, Greece, Croatia, Malta, Turkey | none | all 21 cities |
| Nordics, Baltics, Georgia, UAE, Jordan, Egypt, Morocco, Kenya, South Africa | Kruger, Petra, Luxor, Aswan, Fes, Chefchaouen, Nairobi | the rest |
| USA, Canada, Latin America | New York, California, Orlando, Hawaii, the Southwest, Seattle, Yellowstone, Chicago | Washington DC, Boston, Alaska, Canada, Mexico, Peru, Brazil, Argentina, Chile |
| Australia, New Zealand, Fiji | the five Australian cities (3+ each) | Queenstown, Fiji; Auckland and Rotorua partly |

### The weakest towns (check these first)

After the fifth pass: Myanmar (Bagan/Inle — nothing confirmed; Yangon one place) · the Gobi · Cinque Terre, Lampang and Rayong
(one place each) · Bhutan (one) · Hue · Patagonia.

### Entries that are not one named restaurant

A few rows are a street, a market or "the eateries at …": the stalls at Kaeng Khut Khu and the Khao Kho wind farm, Thai Lom walking
street, the food stalls at Chae Son National Park, White Sand Beach's night stalls, Ban Pradok's noodle shops, Bojeong-dong café
street, Tobu World Square / Edo Wonderland / Amu Plaza Nagasaki restaurants, Shymbulak and Amirsoy resort cafés, Bukhara's central
bazaar, the "Central … food court" rows in six Thai towns, the Antique Pool's food counters at Pamukkale.

### Taken out after my own look (19 Nov 2026)

Din Tai Fung Xintiandi (a listing says closed) · Luckin Coffee and Mixue in Wulingyuan (branches assumed, never confirmed).

## Adding or changing the built-in list

- A file is `{"cc", "towns": [{"place": "<picture-library city id>", "places": [row…]}]}`; the header of `scripts/eats-lint.mjs` gives
  the row's fields. `npm run eats:lint` checks every file and that every city of the picture library has its list (test/infra runs it).
- The server reads the files into the family's library once per version of the files (settings `eat_starter`); `EATS_STARTER=0` leaves
  them out (the tests of the library itself run that way).
- A new city in the picture library needs its list here, or `eats:lint` names it.
