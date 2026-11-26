# The library of places to eat

Owner, 19 Nov 2026: "ร้านอาหารด้วย แนวเดียวกับเล่มฮ่องกงและออสเตรเลีย ทำเป็นคลัง" → "คลังเติมเอง", then "เพิ่มร้านอาหารให้ครบทุกประเทศเลย
เอาแบบลึกๆ". Code: `server/eatlib.js`, table `eat_lib` (migration 0036), page `#/eats`, the planner's "where to eat along the route".

## Three sources, in order of trust

| Source (`src`) | What it is | Checked? |
|---|---|---|
| `helper` | A parent pressed "ask the helper to find and check places" for a town: one call with web search | Yes, on the day shown on the card |
| `book` | The "where to eat" of a book the family has (the two bundled books: 506 places) | As the book's manual was — by the owner |
| `starter` | The app's built-in list, `server/eats/<cc>-<n>.json`: 3,046 places in all 207 cities of the picture library | **Mostly** — 2,617 places carry the month a web search confirmed them open; see below |

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
  listing or review). Only then the card says "open" and "web check <month>". 2,617 rows have it, at least one in every town (the full pass below).
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

### Doubtful rows taken out (19 Nov 2026)

Owner: "อะไรที่ไม่แน่ใจเอาออกก่อนได้". Every row the five passes left in doubt and could not confirm was removed — 50 places, 3,139 →
3,089: a sign of closing or reports that disagree (Rangoon Tea House, Bear's Paw Bakery, Pandeli, Hearts Café, Live Dim Sum House,
Hôtel Heintz, Les Trois Sifflets), the wrong town (Mojsa, which is in Puno), no trace when searched for by name (the eight Thai
places put back earlier and still not found in Thai — Ban Phleng, Dee Amnuay Choke, Doppio, King Ocha, Lab Nua, Peng Duck Noodles,
both Rabieng/Rabiang Pa — plus Flour Power Bakery, Khao Soi Omar, Leng Kee, Jep's, Star Night Bazaar, Sharky's, Vechnoe Nebo,
Gula Gula, Delírio Tropical, Mr Shi's, Wenyu, Cocottes, Kuldse Notsu, Reel Dingle Fish, Heaven Restaurant, Kihei Caffe, Ovejitas,
two Gobi rows, Raven, Prašná Bašta, Taman Laut Handayani, Can Majó, Conesa, La Paradeta, The Tea Rooms 1892, the Matsumoto Karaage
Center station branch, El Buen Pastor, Nabataean Tent), a place only a few years old or last reviewed in 2024 (Il Pescato
Cucinato, Marina Piccola), and the rows the checkers added from an undated listing (Captain's in Aqaba, Reem Baladi, A Gan,
Pizzeria Marcello). A row with `ok` was never touched. Rows that are long-running and well known but have no dated source this
year stay, marked as not checked.

The lint now allows 8–18 places a town (was 10–18): Yangon, Bagan/Inle and the Gobi have 9, Petra 11 — an honest short list.

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

### The full pass (19 Nov 2026)

Owner: "เช็กร้านอาหารในรายการตั้งต้นกับเว็บ". Every row not yet confirmed (2,441) went through in 41 lists of 60, one search per place,
by workers that wrote a verdict and the full address of the result that showed it — one link per place, never one note for many (two
lists that copied one note for all were done again; an "open" with no link or a link shared with another place counts as not checked).
- **open** → `ok: "2026-11"`: its own site, a booking page or a listing with current hours or recent reviews, nothing saying closed.
- **closed** → taken out: a listing or news item saying permanently closed, moved to another town, renamed, closed for a rebuild into
  2027, or sources that disagree on whether it still trades (the owner: "อะไรที่ไม่แน่ใจเอาออกก่อนได้") — 43 places, 3,089 → 3,046.
  Kept unchecked instead where taking it out would break a town's minimum: 7 Sisters (Bagan), Tracy's King Crab Shack (Juneau, moved).
- **unsure** → unchanged (the card still says "not checked"): nothing current either way, a branch or address that does not match,
  or a page about another place of the same name — 429 places.
- Map queries fixed where the result showed the place moved within its town: Kai Kai Dessert (Parkes St), Glacier des Alpes (16 rue
  Perrière), Au Fidèle Berger, Pasticceria Alverà (Piazza Fratelli Ghedina 14), Namur (28 rue Philippe II), Full Steam Tromsø
  (Søndre Tollbodgate 3), Moo's (155 Center St), Bup (108 Đường 30/4), Phu Quoc Bee Farm (Cửa Cạn), Petit Cafe (Kuranda Heritage
  Markets).
- Most "open" verdicts rest on a live listing rather than a dated 2025–2026 page — search results rarely show a date. The twice-yearly
  re-check takes the oldest towns first.

## Adding or changing the built-in list

### The confirmation pass of 20 Nov 2026

Owner: "เช็กร้านอาหารที่ยังไม่ได้เช็กกับเว็บ เริ่มจากเมืองที่ครอบครัวน่าจะไปก่อน". Round 1 took the unconfirmed rows of Taiwan, Hong Kong,
Macau, Japan, Korea, Vietnam, Malaysia and part of Thailand (about 120 rows): 15 confirmed open (`ok 2026-11`), one closed and removed
(Sukhothai). The rest stay as they were — "not found" on a search result is not a closure, and the session could not open the pages
themselves.
Round 2 read the pages with curl (Wongnai, TVBS, Wanderlog, dated articles): Taiwan, Hong Kong, Macau, Japan, Korea, Vietnam, Malaysia,
Cambodia, Laos and Thailand, about 160 rows — 43 more confirmed open, 2 closed and removed (The Blue Pumpkin in Siem Reap, Xieng Thong
Noodle in Luang Prabang). 2,674 rows now carry `ok`, 369 do not. To look at next: rows filed under the wrong town (Lu Lam is in Chiang Rai,
Pee Pee Bakery on Phi Phi, Zest Coffee Lounge on Koh Tao, Dairy Home at Muak Lek), the renamed A-Tang Salty Congee in Tainan, the moved
Red Gate Bakery in Nha Trang, and the mall food courts no page names.
Round 3 (owner: "ทำหมดเลย"): A-Tang's row renamed and Red Gate's area moved; the wrong-town rows were mostly right (the library's
towns are regions). The rest of the world and Europe were checked with curl (Wanderlog pages with 2025–2026 reviews, official sites with a
2026 notice, Visit Bergen, an FSA rating): 46 more confirmed open, none closed. An "open" that rested only on a chain's main site, a search
snippet of a page curl could not open, or a page for another branch was kept unconfirmed (Filli, Eataly, Time Out Market New York, Java
House, Artcaffé, Griechenbeisl, Breydel De Coninc, The Old Keswickian, Queen of Tarts, Stani, Gino Sorbillo). Three rows filed under a
town they are not in were taken out: eGeLoSIa (Koblenz, under Cologne), Café Schäfer (Triberg, under Heidelberg), Vigò (Ljubljana, under
Bled). Renamed but trading, kept under the old name for now: Fløien Folkerestaurant (Fløirestauranten), Restaurant Aanaar (Wilderness Hotel
Juutua). 2,720 of 3,040 rows carry `ok`; 320 do not — most are places whose sites refused curl or have no page of their own.
Round 4: 34 more confirmed open (Wanderlog pages with 2025–2026 Google reviews, Wongnai, dated articles), Störtebeker at the Elbphilharmonie
taken out (permanently closed); a chain's main site or a temporary-closed tag kept a row unconfirmed. 2,754 of 3,039 rows carry `ok`. The
search allowance ran out before most rows were searched; the rest, and the library's growth (big cities 70 places, other towns 40, small ones
22, spread over districts), went to the owner's Gemini Deep Research brief.
Gemini round 3 (20 Nov 2026): every row of its answer was opened here first. 29 more confirmed open; out as closed for good: Din Tai

Gemini round 4 (20 Nov 2026, an audit of our rows): Palio Khao Yai taken out — the Tuscan village has been shut since March 2020 (Bangkok Post, Bangkok Insight); it was one of the unconfirmed rows. The care list also lost LEGOLAND Discovery Centre Istanbul (closed 1 Jan 2025).

Gemini round 5 (21 Nov 2026, batch D1): 13 rows offered, each looked for on its own source page. In: Twiggy Family, Hyperama, Pepe Cucina, The Garden Project (Dubai), Local Hive Cafe (Sydney), The Farm Cafe, Ichi Ni Nana Izakaya (Melbourne) — no price shown on any page, so "Check the price". Out: Maison Mathis, The Farm (Al Barari), Frankie's Food Factory, Oli's (not on the page Gemini named), The Uncommon (a desert café the page does not call child-friendly), Studley Park Boathouse (no 2025–26 page; its café is now The Perch).

Our own agents, pilot (21 Nov 2026, Bangkok): 29 rows offered, each checked by a script against its page (name, a copied sentence, a 2025–2026 date). In: Genius Kids Cafe, BABYCCINO & Co., Mozza by Cocotte, BHC Chicken, Underhound, Benihana. Out: nine rows from an undated ranking site (restaurantsforkings.com), and five whose page gave no district (Frame, MAKIN, Rinji, Bubble in the Forest, SukiCamp Safari).
Fung World Square (Sydney, now Double Chin Eats) and Warung Mama (Komodo); moved and corrected by hand: Al Fanar Abu Dhabi (Yas Mall),
Nonie's (Station 3, Boracay), Lai Cheng (477 Zhongzheng Rd, Hualien), the Oranjezicht market (across the road); kept unconfirmed: Queen
of Tarts (closure seen only in a search result), Larsian (renamed Sugbo Sentro, reported problems), Lake Louise station restaurant (closed
for renovation), Barrio Bonito (renamed El Barrio, closed for the 2026–27 season). New places: 48 in Dubai, Sydney, Melbourne, the Gold
Coast and Bangkok (listings and venue pages read here; a price no page showed is "Check the price", now allowed by the lint). A town may
now hold up to 80 places (the growth plan).

- A file is `{"cc", "towns": [{"place": "<picture-library city id>", "places": [row…]}]}`; the header of `scripts/eats-lint.mjs` gives
  the row's fields. `npm run eats:lint` checks every file and that every city of the picture library has its list (test/infra runs it).
- The server reads the files into the family's library once per version of the files (settings `eat_starter`); `EATS_STARTER=0` leaves
  them out (the tests of the library itself run that way).
- A new city in the picture library needs its list here, or `eats:lint` names it.

### Our own agents, 22 Nov 2026 (Hong Kong)
Two small agents (docs/LIBRARY-AGENTS.md), every page opened by `scripts/library-check.cjs`, each name status-searched here: +13
Hong Kong — nine cha chaan teng from a January 2026 guide (Mido Cafe, Luen Wah, Kwong Ming, Tak Yu, My Cup of Tea, Luen Fat, Shui
Kee, Sun Hang Yuen, MD Cafe) and four family places from Cathay Pacific's 2026 children's guide and a 2025 expat guide (Limewood,
MeokBang BBQ Kidzone, Tree Café, Yakiniku Tabeyo). Left out: Transformers: The Ark (closed in Hong Kong, Feb 2025), Smoke and Barrel
(moved, the new address not confirmed), Baumhaus (nothing current), Pizza Express (no one branch). In the app the Hong Kong book's own
28 places and the Macau book part's 188 sit beside this list (`syncBooks`, src `book`).

### Chengdu, 23 Nov 2026
One town a PR. Four agents, `library-check.cjs`, then a map check for every row: `ok` only when the map shows the place at the page's address, not closed, with a review from the last six months. Google Maps knows little of mainland China, so Chinese towns are checked on Baidu Maps (Amap asks for a Chinese phone number to sign in). +10 Chengdu: Chunyang Guan, Chongqing Blanket Noodles, Dan Dumplings, He Dumplings, Zha Zha Noodles, Zhang Laowu Liangfen, Xiao Ming Tang, He Ji Egg Cakes, Nanchong Taste, Mi Xun Teahouse. Out: two rows from restaurantsforkings.com, four cafés no map could place at the page's address. Proof in `docs/library-proof/cn-chengdu.json`.

### Xi’an, 23 Nov 2026
batch-01 of docs/library-briefs. Four agents, `library-check.cjs`, then Baidu Maps for every row (`ok` only at the page's address, not closed, a review from the last six months; a price marked "Baidu Maps" is the map's spend per person). +3: Haidilao Wanhecheng (its children's dining area for ages 3–12), Ruixiangyuan roujiamo, Li Weiyi meatball soup. Out: two rows from a machine-made GitHub blog, twelve shops whose guide page the checker could not read. Proof in `docs/library-proof/cn-xian.json`.

### Yunnan, 23 Nov 2026
batch-01 of docs/library-briefs, checked on Baidu Maps like Xi’an. +7: Lao Dian Shanzhai, Dashanqing Yun Xiaoguan, Ershiliu Jiaren (Kunming); Nanzhao Dong Xiaopang, Jixiang Hong, Jinhua Xiao Amei (Dali); Lan Yunnan Bistro (Lijiang). Out: Yunxueli (no Shuhe branch on the map). Proof in `docs/library-proof/cn-yunnan.json`.

### Đà Lạt, 23 Nov 2026
batch-01 of docs/library-briefs. Agents, `library-check.cjs`, then the Google Maps Reviews tab for every row (`ok` only when not marked closed and with a review from the last six months). +2: Rừng Thông Mơ Farm & Bistro, Léguda. Out: thirteen bánh căn and noodle shops whose list pages carry no date. Proof in `docs/library-proof/vn-dalat.json`.

### Huế, 23 Nov 2026
batch-02 of docs/library-briefs, checked on Google Maps like Đà Lạt. +1: Tịnh Gia Viên. Out: eleven bún bò shops from an undated list, Hồng Mai (the map's shop sells bánh khoái), O Xáo (not on the map), Ông Táo (no recent reviews). Proof in `docs/library-proof/vn-hue.json`.

### Phú Quốc, 23 Nov 2026
batch-02 of docs/library-briefs. +5: Clubhouse at Premier Residences (a pizza class for children), Paradiso, Huong Bien, Hủ Tiếu Mực Tư Hường, Mai Hương Beachfront. Out: one name the map gives to another restaurant. Proof in `docs/library-proof/vn-phuquoc.json`.

### Kota Kinabalu (Borneo), 23 Nov 2026
batch-02 of docs/library-briefs. +7: three children's cafés with play areas (Tiny Palm, Little Dino, Bear Factory), Happy Place, Alu-Alu Kitchen, Tana Borneo (a slide in the dining room), Todak hawker centre. Out: two cafés with no recent reviews. Proof in `docs/library-proof/my-borneo.json`.

### Yogyakarta, 23 Nov 2026
batch-03 of docs/library-briefs. +9 restaurants with something for children (a playground, a pool, fish to feed, a stream): De Tropen, Ciblon, Champa, Isvara Riverside, Mang Engking (Soragan), Nanamia (south), Otadan, Watoe Gadjah, The Westlake. Out: Joglo Resodinomo (the map's place is elsewhere). Proof in `docs/library-proof/id-yogyakarta.json`.

### Penang, 23 Nov 2026
batch-03 of docs/library-briefs. +10: Cocoon+ Kids Cafe and 1.618 Roastery Andaman (play areas), Manaf Nasi Ayam (on the beach), Fu Er Dai, Red Garden, Urai Thai Kitchen, and four food courts (The Jetty, Long Beach, Esplanade, Gurney Food Hall). Proof in `docs/library-proof/my-penang.json`.

### Lombok and the Gilis, 23 Nov 2026
batch-03 of docs/library-briefs. +10: in Kuta, The Well and Anchor Café (play areas), Skatepark Tribe (skate lessons for children), Bara (a pool), Munchies, Ashtari; on Gili Trawangan, Warung Wajan, Limo, Coffee Corner, Gili Teak. Proof in `docs/library-proof/id-lombok.json`.

### Luang Prabang, 23 Nov 2026
batch-04 of docs/library-briefs. +3: L'Elephant, BOUANG Asian Eatery, SACKy @ Blue Lagoon. Out: Wat Xieng Thong (no page date). Proof in `docs/library-proof/la-luangprabang.json`.

### Bohol and Cebu, 23 Nov 2026
batch-04 of docs/library-briefs. +1: Tavolata (Cebu). Out: three chains with no branch named, one name the map gives differently. Proof in `docs/library-proof/ph-bohol.json`.

### Ulaanbaatar, 23 Nov 2026
batch-30 of docs/library-briefs. +3: Altan Gadas, Arak Yak House, Mongolian's Restaurant (Shangri-La Mall). Proof in `docs/library-proof/mn-ulaanbaatar.json`.
### Golden Triangle, 23 Nov 2026
batch-17 of docs/library-briefs. +2: Anokhi Café, 1135 AD. Proof in `docs/library-proof/in-golden.json`.

### Tashkent, 23 Nov 2026
batch-25 of docs/library-briefs. +6: Ribambelle, Benedict, Gōsht, Yuzhanin, Tanuki, JUNE. Proof in `docs/library-proof/uz-tashkent.json`.

### Sri Lanka's hills, 23 Nov 2026
batch-29 of docs/library-briefs. +1: Honey Pot Restaurant (Kandy). Proof in `docs/library-proof/lk-hills.json`.

### Samarkand & Bukhara, 23 Nov 2026
batch-32 of docs/library-briefs. +7: Sangizar, Jasmin, The Mohon (Samarkand); Lalizar, Zargaron, Palmira, Zolotaya Bukhara (Bukhara). Proof in `docs/library-proof/uz-samarkand.json`.

### Kathmandu, 23 Nov 2026
batch-30 of docs/library-briefs. +3: Jimbu Thakali by Capital Grill, Alice Restaurant, Kaiser Café. Proof in `docs/library-proof/np-kathmandu.json`.
### Abu Dhabi, 23 Nov 2026
batch-06 of docs/library-briefs. +2: Sidekicks (cartoon characters, children’s dishes), Crust (family Friday brunch). Out: six restaurants whose only source was restaurantsforkings.com. Proof in `docs/library-proof/ae-abudhabi.json`.

### Tbilisi and Kazbegi, 23 Nov 2026
batch-15 of docs/library-briefs. +5: Daphna, Lolita, Sakhachapure N1 (Galleria), Café Leila, and the Dariali monastery café. Proof in `docs/library-proof/ge-tbilisi.json`.

### Fes, Chefchaouen & Meknes, 23 Nov 2026
batch-20 of docs/library-briefs. +4 in Chefchaouen: The Morisco Terrace, Assaada, Restaurant Hamsa, Bilmos Cafe. Proof in `docs/library-proof/ma-fes.json`.

### Marrakech, 23 Nov 2026
batch-20 of docs/library-briefs. +1: Beldi Fusion Kitchen Guéliz. Proof in `docs/library-proof/ma-marrakech.json`.

### Cape Town, 23 Nov 2026
batch-26 of docs/library-briefs. +5: Café Roux and The Foodbarn (Noordhoek), Dunes and Massimo's (Hout Bay), Good Thyme Café (Bellville). Proof in `docs/library-proof/za-capetown.json`.

### Luxor, 23 Nov 2026
batch-27 of docs/library-briefs. +9: Snobs, Pizza Roma.It, Wannas Art Café, El Hussein, The Lantern Room, El-Kababgy, Nile Valley, Ottoman Hall (Al Moudira), Silk Road (Hilton). Proof in `docs/library-proof/eg-luxor.json`.

### Nairobi, 23 Nov 2026
batch-29 of docs/library-briefs. +9: Pili (GTC Mall), Hunger's Nest, Bao Box, Bwibo, Zen Garden, Golden Star, Under the Swahili Tree, Red Ginger, Tamambo (Tatu City). Proof in `docs/library-proof/ke-mara.json`.

### Kruger, 23 Nov 2026
batch-32 of docs/library-briefs. +8 rest-camp restaurants: Mugg & Bean (Lower Sabie), Tindlovu (Letaba, Berg-en-Dal), Mopani, Pretoriuskop, Wimpy (Pretoriuskop), Punda Maria, Shingwedzi. Proof in `docs/library-proof/za-kruger.json`.
### Gold Coast and Brisbane, 23 Nov 2026
batch-05 of docs/library-briefs. +7 cafés and restaurants with something for children (a playroom, a playground in view, a sandpit, a gated play area): Merlina’s, FunnyBone Coffee, Café 63, Pasture & Co, Dune Cafe, Gathering Co, Stones Throw. Out: one name the map puts in Brisbane, one it does not know, one with no recent review. Proof in `docs/library-proof/au-goldcoast.json`.

### Cairns, 23 Nov 2026
batch-05 of docs/library-briefs. +1: Wharf One Cafe (kids’ menu, prams and high chairs). Proof in `docs/library-proof/au-cairns.json`.

### Auckland, 23 Nov 2026
batch-06 of docs/library-briefs. +9 restaurants and cafés with something for children (bento boxes, a play area, a playground next door, a sushi train): MASU, BODA, The Heke, Sugar at Chelsea Bay, K10 Newmarket, Azabu Mission Bay, Baduzzi, Huddle Cafe, Cornwall Park Cafe. Proof in `docs/library-proof/nz-auckland.json`.

### Rotorua and Taupō, 23 Nov 2026
batch-06 of docs/library-briefs. +5 from the Rotorua tourism site’s family-friendly list: Black Label Barbecue, Charlie’s Café at Chipmunks Playland, Lone Star, River’s Catch, Scope. Proof in `docs/library-proof/nz-rotorua.json`.

### Fiji, 23 Nov 2026
batch-28 of docs/library-briefs. +6: Isa Lei, The Curry House, Zigzag Cafe, The Coffee Hub, Sentai Seafood (Nadi), Mamacita (Denarau). Proof in `docs/library-proof/fj-islands.json`.
### Buenos Aires, 23 Nov 2026
batch-07 of docs/library-briefs. +2 restaurants with supervised play areas (Aida, Ragazzi) from Time Out Buenos Aires. Proof in `docs/library-proof/ar-buenosaires.json`.

### Toronto, 23 Nov 2026
batch-08 of docs/library-briefs. +11 from Toronto Tourism’s family restaurant list (Cluny, Café Diplomatico, Mamma Martino’s, Descendant, Grazie, The Rec Room, Pinocchio Play Café, Lady Marmalade, Emma’s, Maha’s, Rol San); per-person ranges are the page’s. Proof in `docs/library-proof/ca-toronto.json`.

### Banff, 23 Nov 2026
batch-08 of docs/library-briefs. +9 in Canmore and Banff (Harvest Café, Rocket Pie, Canmore Gaucho, Dingsway, Red Rock Pizza, Marra’s Way, Canadian Pizza Unlimited, Tooloulou’s, Magpie & Stump). Proof in `docs/library-proof/ca-banff.json`.

### Vancouver, 23 Nov 2026
batch-09 of docs/library-briefs. +4 from Time Out’s kid-friendly list: Nook (Kitsilano), Sophie’s Cosmic Cafe, Via Tevere (Victoria Drive), Burgoo (Main Street). Fable Diner left out: closed for good. Proof in `docs/library-proof/ca-vancouver.json`.

### Santiago and Valparaíso, 23 Nov 2026
batch-10 of docs/library-briefs. +10 from The Clinic’s 2026 route of restaurants for children (Gino Lautaro, La Argentina, Neko-San, DeCalle, Parigó, Dipsy’s Backyard, El Portal, Café Estación, Oiso, Casa Regina). Proof in `docs/library-proof/cl-santiago.json`.

### Yucatán, 23 Nov 2026
batch-21 of docs/library-briefs. +2: Porfirio's Cancún, Porfirio's Mérida. Proof in `docs/library-proof/mx-yucatan.json`.

### Boston, 23 Nov 2026
batch-24 of docs/library-briefs. +5: Alamo Drafthouse (Seaport), Little Cocoa Bean Co., Life Alive (Cambridge), The Friendly Toast (Back Bay), American Flatbread at Sacco's (Somerville). Proof in `docs/library-proof/us-boston.json`.

### Chicago, 23 Nov 2026
batch-24 of docs/library-briefs. +6: Little Goat Diner, Parson's Chicken & Fish, Beatrix, Sterling Food Hall, Eleven City Diner, The Original Rainbow Cone (Navy Pier). Proof in `docs/library-proof/us-chicago.json`.

### Washington DC, 23 Nov 2026
batch-24 of docs/library-briefs. +12: Silver Diner, The Roost, Florida Avenue Grill, Kura Sushi, 2 Amys, Comet Ping Pong, Medium Rare, Open City, Unconventional Diner, bartaco, Hard Rock Cafe, Baked by Yael. Proof in `docs/library-proof/us-dc.json`.

### Hawaii (Oahu), 23 Nov 2026
batch-25 of docs/library-briefs. +4: Kahuku Farms, Liliha Bakery (International Market Place), Monkeypod Kitchen (Waikiki), Makahiki (Aulani). Proof in `docs/library-proof/us-hawaii.json`.

### Seattle, 23 Nov 2026
batch-25 of docs/library-briefs. +4: Young's Restaurant, Outsider BBQ, Stoneburner, Paseo (SoDo). Proof in `docs/library-proof/us-seattle.json`.

### Las Vegas & the Grand Canyon, 23 Nov 2026
batch-25 of docs/library-briefs. +3 in Las Vegas: RPM Italian, Summer House (Durango), Wicked Spoon. Proof in `docs/library-proof/us-southwest.json`.

### Atacama, 23 Nov 2026
batch-27 of docs/library-briefs. +3 in San Pedro: Jardín Meraki, Rincón de Solor, Pulpería Atacama. Proof in `docs/library-proof/cl-atacama.json`.

### Yellowstone, 23 Nov 2026
batch-31 of docs/library-briefs. +6: Lake Deli, Lake Lodge Cafeteria, Mammoth Terrace Grill, Bear Paw Deli, Geyser Grill, Grant Village Dining Room. Proof in `docs/library-proof/p-yellowstone.json`.

### Alaska, 23 Nov 2026
batch-31 of docs/library-briefs. +3 in Anchorage: Simon & Seafort's, Golden Donuts, Dino's Donuts. Proof in `docs/library-proof/us-alaska.json`.

### Cusco, 23 Nov 2026
batch-31 of docs/library-briefs. +4: Pirwa, Green Point, L'Atelier Café Concept, Cappuccino Cusco Cafe. Proof in `docs/library-proof/pe-cusco.json`.
### Bruges, 23 Nov 2026
batch-07 of docs/library-briefs. +1: Jacobin (kids’ menu 5–12, mild sauces; Fooding Kids 2026). Out: two names the map does not know at their streets. Proof in `docs/library-proof/be-bruges.json`.

### Brussels, 23 Nov 2026
batch-08 of docs/library-briefs. +4: Le Fox, Lloyd Coffee Eatery Louise (glass-walled kids’ room), Cōcina Châtelain (under-10s eat free), Brasserie du Miroir. Proof in `docs/library-proof/be-brussels.json`.

### Lyon, 23 Nov 2026
batch-13 of docs/library-briefs. +5 from Lyon Tourism’s family pages: Mama Shelter, Zucca (Sunday kids’ club), Yakapiocher, Bouillon Baratte, La Commune. Proof in `docs/library-proof/fr-lyon.json`.

### Chamonix and Annecy, 23 Nov 2026
batch-13 of docs/library-briefs. +1: L’Aquarama at Angon (children’s menu, high chair). No dated page named a new Chamonix restaurant. Proof in `docs/library-proof/fr-alps.json`.

### Strasbourg and Colmar, 23 Nov 2026
batch-14 of docs/library-briefs. +3: Lucas & Chris and Caveau Saint-Jean (Colmar), Le Colbert (Strasbourg, children’s menu). Proof in `docs/library-proof/fr-strasbourg.json`.

### Nice and the Riviera, 23 Nov 2026
batch-14 of docs/library-briefs. +4 from Nice Côte d’Azur tourism’s family-labelled restaurants: Lou Balico, La Verrière, Brasserie Le Gioffredo, Lu Fran Calin. The family guide PDF could not be checked by the script. Proof in `docs/library-proof/fr-nice.json`.

### Provence, 23 Nov 2026
batch-14 of docs/library-briefs. +5: Chez Mamie, Kouk, Le 26, Au Jardin des Carmes (Avignon) and Côté Arènes (Arles); prices from the pages. Proof in `docs/library-proof/fr-provence.json`.

### York, 23 Nov 2026
batch-15 of docs/library-briefs. +8 from Little Vikings’ places to eat: Ambiente Tapas, SPARK:York, Brew & Brownie, Partisan, Trinacria, The Pig & Pastry, Robinsons, Rowntree Park Reading Café. Proof in `docs/library-proof/gb-york.json`.

### Edinburgh, 23 Nov 2026
batch-15 of docs/library-briefs. +11 (Chop House, Civerinos Stockbridge, two Pizza Express branches, Montpeliers, Loudons New Waverley, Franco Manca Stockbridge, Dishoom, Mamma Roma, The Edinburgh Larder, Chaskaa). Proof in `docs/library-proof/gb-edinburgh.json`.

### The Lake District, 23 Nov 2026
batch-15 of docs/library-briefs. +7 from Lake District Kids: Boardwalk Bar & Grill, Villa Positano, YHA Ambleside café, Cuckoo Brow Inn, The Kellbank, Boot Inn, Woolpack Inn (the inns for their play areas and kids’ menus). Proof in `docs/library-proof/gb-lakes.json`.

### Ireland, 23 Nov 2026
batch-17 of docs/library-briefs. +10: The Bad Ass Cafe, Carluccio's, Wagamama Dundrum, Brother Hubbard, The Fumbally, Overends Kitchen, Saba (Dublin); Blackrock Cottage, Freddy's, Aniar (Galway). Proof in `docs/library-proof/ie-ireland.json`.

### Disneyland Paris, 23 Nov 2026
batch-21 of docs/library-briefs. +10 in the parks: Market House Deli, Last Chance Café, Casa de Coco, Cowboy Cookout Barbecue, Café de la Brousse, Hakuna Matata, The Old Mill, Pizzeria Bella Notte, Toad Hall, Café Luminosity. Proof in `docs/library-proof/p-disney-paris.json`.

### Mont-Saint-Michel, 23 Nov 2026
batch-28 of docs/library-briefs. +5: Le Grillon and Restaurant Eugénie (Pontorson), Saint James Café (Beauvoir), Le Café de la Baie (Vains), Le Logis Sainte-Catherine (on the Mont). Proof in `docs/library-proof/fr-montstmichel.json`.
### Vienna, 23 Nov 2026
batch-07 of docs/library-briefs. +6 family cafés and restaurants with play corners (Falter’s 2025–2026 lists): Baomi, Family & Friends, Kinderspiel, Sieben Zwerge, Melman’s, Dschungel Café. Proof in `docs/library-proof/at-vienna.json`.

### Salzburg, 23 Nov 2026
batch-07 of docs/library-briefs. +5 from the tourism site’s child-friendly list: Gasthof Die Pflegerbrücke (playground, play room), the fortress panorama restaurant, The Keep, Restaurant Wolferl, The Bakery by Didi Maier. Proof in `docs/library-proof/at-salzburg.json`.

### Geneva and Lake Léman, 23 Nov 2026
batch-09 of docs/library-briefs. +7 from Geneva Tourism’s family restaurants and Lausanne Tourism: La Storia, Inglewood (Eaux-Vives), Molino (Molard), The Hamburger Foundation (Pâquis), Café du MEG, Un R de Famille, Auberge du Chalet des Enfants. Proof in `docs/library-proof/ch-geneva.json`.

### Lucerne, 23 Nov 2026
batch-09 of docs/library-briefs. +1: Wirtschaft Trumpf-Buur, Ebikon (playground and minigolf). Few dated lists exist for Lucerne. Proof in `docs/library-proof/ch-lucerne.json`.

### Prague, 23 Nov 2026
batch-10 of docs/library-briefs. +9 from prague.eu and family guides: Výtopna (train-delivered food), Food Lab, Bruxx, Kulaťák, Občanská plovárna, Kolkovna Olympia, Miminoo, Vozovna Stromovka, Café Truhlárna. Proof in `docs/library-proof/cz-prague.json`.

### Zurich, 23 Nov 2026
batch-10 of docs/library-briefs. +5 from Zurich Tourism’s child-friendly list and the ELCH family centre: Kafi für Dich, Brasserie Freilager, Die Waid, Alter Tobelhof, Kafi Plus (Oerlikon). Proof in `docs/library-proof/ch-zurich.json`.

### Munich, 23 Nov 2026
batch-11 of docs/library-briefs. +9, mostly kids’ cafés from in-muenchen.de (Nov 2026): Zuckertag, Mini Moment, Kleine Sportgeister, Glückskind, Pfefferminza, Mama’s Kindercafé, Hans im Glück (Isartor), La Sophia, Frau im Mond. Entry prices from the page. Proof in `docs/library-proof/de-munich.json`.

### Hamburg, 23 Nov 2026
batch-11 of docs/library-briefs. +1: Alsterdorfer Kesselhaus (children’s menu, play room) from hamburg.de. The Kindaling restaurant pages carry no date. Proof in `docs/library-proof/de-hamburg.json`.

### Heidelberg and the Black Forest, 23 Nov 2026
batch-11 of docs/library-briefs. +1: Die Bergstation on the Schauinsland. Seven Heidelberg restaurants left out: their page gives an address only. Proof in `docs/library-proof/de-heidelberg.json`.

### Budapest, 23 Nov 2026
batch-16 of docs/library-briefs. +3: Riso (terrace playground), Cafe Brunch Bazilika, Brunch Bistro. Proof in `docs/library-proof/hu-budapest.json`.

### Kraków, 23 Nov 2026
batch-22 of docs/library-briefs. +9: Biała Róża, Kogel Mogel, Cafe Oranżeria, Farina, Amarylis, Szara Gęś w Kuchni, Orangery, ORZO, Pół na Pół. Proof in `docs/library-proof/pl-krakow.json`.

### Bled, Ljubljana & Postojna, 23 Nov 2026
batch-23 of docs/library-briefs. +1: Garden Restaurant (Bled). Proof in `docs/library-proof/si-bled.json`.

### Bratislava & the High Tatras, 23 Nov 2026
batch-23 of docs/library-briefs. +4 in Bratislava: Gatto Matto Panská, Berg, Mezcalli, Urban Bistro. Proof in `docs/library-proof/sk-bratislava.json`.

### Hallstatt, 23 Nov 2026
batch-26 of docs/library-briefs. +2: Marktbeisl Zur Ruth, Pizzeria Kegelbahn (Obertraun). Proof in `docs/library-proof/at-hallstatt.json`.

### Český Krumlov, 23 Nov 2026
batch-27 of docs/library-briefs. +1: Restaurant Pivoňka. Proof in `docs/library-proof/cz-krumlov.json`.

### Rothenburg ob der Tauber, 23 Nov 2026
batch-27 of docs/library-briefs. +1: Eiscafé Pizzeria Italia. Proof in `docs/library-proof/de-rothenburg.json`.
### Madrid, 23 Nov 2026
batch-12 of docs/library-briefs. +9 from esmadrid.com’s eating out with children: Rubaiyat, La Excéntrica, New York Burger (Recoletos), Filandón, Restaurante San Francisco (El Pardo), Home Burger Bar, Kilómetros de Pizza, Can Pizza, Storyland. Proof in `docs/library-proof/es-madrid.json`.

### Seville and Granada, 23 Nov 2026
batch-13 of docs/library-briefs. +2 in Seville: La Escaloná, Arte y Sabor. Proof in `docs/library-proof/es-seville.json`.

### Santorini, 23 Nov 2026
batch-16 of docs/library-briefs. +4: Cava Alta (Pyrgos), Oia Gefsis, Mes Amis, Anemomilos. Proof in `docs/library-proof/gr-santorini.json`.

### Athens, 23 Nov 2026
batch-16 of docs/library-briefs. +11 (Ama Lachei, Karavitis, Colibri, To Steki tou Ilia, Smile, Piu Verde, Bella Vespa, Kosta, Hoocut, To Avgo tou Kokora, the Acropolis Museum restaurant). Proof in `docs/library-proof/gr-athens.json`.

### Dubrovnik, 23 Nov 2026
batch-16 of docs/library-briefs. +2: Moby Dick, Bistro Glorijet. Proof in `docs/library-proof/hr-dubrovnik.json`.

### Amalfi Coast, 23 Nov 2026
batch-17 of docs/library-briefs. +11: Il Fornillo, Capricci, Maria Grazia, Acquapazza, Baccofurore, Al Convento, Pescheria CICA, La Frittura del Golfo, I Due Fratelli, Pasticceria Russo, Il Mulino. Proof in `docs/library-proof/it-amalfi.json`.

### Cinque Terre, 23 Nov 2026
batch-18 of docs/library-briefs. +2 in Vernazza: Fritto e Pizza da Sandro, Pizzeria Fratelli Basso. Proof in `docs/library-proof/it-cinqueterre.json`.

### Dolomites, 23 Nov 2026
batch-18 of docs/library-briefs. +6: Caffè Val d'Anna, Rifugio Averau, Ristorante Bullaccia, Pitschlmann, Sarè, Gelateria Eccetera. Proof in `docs/library-proof/it-dolomites.json`.

### Florence, 23 Nov 2026
batch-18 of docs/library-briefs. +10: L'Ortone, Trattoria 13 Gobbi, Santarosa Bistrot, Salumeria Verdi, Gelateria La Carraia, Berberè, Trattoria del Carmine, Tamerò, Ditta Artigianale (Via dei Neri), Gelateria della Passera. Proof in `docs/library-proof/it-florence.json`.

### Milan, 23 Nov 2026
batch-18 of docs/library-briefs. +8: Belle Epoque, Trattoria Bertamè, Consorzio Stoppani, Mamusca, California Bakery (CityLife), Giolina, MIC Ramen (Porta Romana), Benvenuto Family Restaurant. Proof in `docs/library-proof/it-milan.json`.

### Sicily, 23 Nov 2026
batch-19 of docs/library-briefs. +7 in Palermo: Vecchia Trattoria da Totò, Osteria Ballarò, Tondo, Grano Granis, I Segreti del Chiostro, Ciccio Adelfio, Cappadonia. Proof in `docs/library-proof/it-sicily.json`.

### Venice, 23 Nov 2026
batch-19 of docs/library-briefs. +8: Trattoria al Gazzettino, Rio Novo, Fried Land, 1000 Gourmet, Al Profeta, Osteria Alla Bifora, Rosticceria Gislon, Osteria Bancogiro. Proof in `docs/library-proof/it-venice.json`.

### Lisbon & Sintra, 23 Nov 2026
batch-22 of docs/library-briefs. +8: Bonkers, Epic Sana and Sheraton brunches, Luzzo, Ground Burger, Green House, Mr. Zombie, Plataforma. Proof in `docs/library-proof/pt-lisbon.json`.

### Plitvice, 23 Nov 2026
batch-28 of docs/library-briefs. +1: the Camping Plitvice restaurant. Proof in `docs/library-proof/hr-plitvice.json`.
### Copenhagen, 23 Nov 2026
batch-12 of docs/library-briefs. +4 from the Cofoco group’s family page (children’s menu or a half dish at half price): Scarpetta (Islands Brygge, Rantzausgade), Donna, Les Trois Cochons. Proof in `docs/library-proof/dk-copenhagen.json`.

### Tallinn, 23 Nov 2026
batch-12 of docs/library-briefs. +9 from Visit Estonia and easyfind.ee (2026): Nero, Lore Bistroo, City Grill House, NOP, Talleke ja Pullike, Pann&Kook, Gourmet Coffee, Boheem, Vapiano (Hobujaama). Proof in `docs/library-proof/ee-tallinn.json`.

### Helsinki, 23 Nov 2026
batch-13 of docs/library-briefs. +4: The Social (Clarion Helsinki and Mestari), Toscanini, Linnankellari, from Strawberry’s restaurant guide. Proof in `docs/library-proof/fi-helsinki.json`.

### Reykjavík, 23 Nov 2026
batch-17 of docs/library-briefs. +8: Kaffi Laugalækur, The Laundromat Café, the cat café, Grandi Mathöll, Kaffi Flóra, Iðnó, 101 Reykjavik Street Food, Arna. Proof in `docs/library-proof/is-reykjavik.json`.

### Tromsø, 23 Nov 2026
batch-21 of docs/library-briefs. +1: Pastafabrikken. Proof in `docs/library-proof/no-tromso.json`.

### Bergen, 23 Nov 2026
batch-21 of docs/library-briefs. +1: Peppes Pizza (Ole Bulls plass). Proof in `docs/library-proof/no-bergen.json`.

### Lapland, 23 Nov 2026
batch-22 of docs/library-briefs. +2 in Rovaniemi: Restaurant Gallis, Piparina. Proof in `docs/library-proof/p-lapland.json`.

### Stockholm, 23 Nov 2026
batch-23 of docs/library-briefs. +3: Junibacken restaurant, Haga Bottega, Boketto. Proof in `docs/library-proof/se-stockholm.json`.

### Astana, 23 Nov 2026
batch-19 of docs/library-briefs. +2: Cappuccino, TomYumBar. Proof in `docs/library-proof/kz-astana.json`.

### Yangon, 23 Nov 2026
batch-29 of docs/library-briefs. +2: Sharky's, Chatrium Hotel Royal Lake. Proof in `docs/library-proof/mm-yangon.json`.

### Korat, 23 Nov 2026
batch-33 of docs/library-briefs (round 2). +9: Nub Pochana, Larb Somphit, Soy Jeck Pochana, Khrua Suwimon, Pa Plueang, Khanom Jeen Yai Pao, Ko Kia, Kin Dee, Khanom Oshin. Proof in `docs/library-proof/th-korat.json`.

### Rayong, 23 Nov 2026
batch-33 of docs/library-briefs (round 2). +2: Gazebo Cafe, Ran Choei. Proof in `docs/library-proof/th-rayong.json`.

### Chongqing, 23 Nov 2026
batch-33 of docs/library-briefs (round 2). +1: Uncle Biao (Hong Kong tea restaurant by Luzumiao), checked on Baidu Maps. Proof in `docs/library-proof/cn-chongqing.json`.

### Guilin, 23 Nov 2026
batch-34 of docs/library-briefs (round 2). +1: Sister Liu Beer Fish (West Street main branch), checked on Baidu Maps. Proof in `docs/library-proof/cn-guilin.json`.

### Hakone, 23 Nov 2026
batch-34 of docs/library-briefs (round 2). +1: Hakone Sushi. Proof in `docs/library-proof/jp-hakone.json`.
- **24 Nov 2026, Hakone** (docs/library-briefs batch-90, round 3): +1 (Irori Chaya, Sengokuhara). Proof in `docs/library-proof/jp-hakone.json`.

### Lampang, 23 Nov 2026
batch-35 of docs/library-briefs (round 2). +7 from Wongnai's must-try list: Khao Soi Pa Boon, Khao Soi Super, Dab Daeng noodles, Rad Na Super, Thip Chang chicken rice, The Pappa, Sai Ua Pao Tao Luang. Proof in `docs/library-proof/th-lampang.json`.

- **24 Nov 2026, Trat & Koh Chang** (docs/library-briefs batch-87, round 3): +1 (Chompu Farm's Cafe, Trat). Proof in `docs/library-proof/th-kohchang.json`.

- **24 Nov 2026, Ayutthaya** (docs/library-briefs batch-92, round 3): +2 (Grand Chaopraya, The Summer House). Proof in `docs/library-proof/th-ayutthaya.json`.

### Khon Kaen, 23 Nov 2026
batch-35 of docs/library-briefs (round 2). +4: 11AM cafe and space, Murmur Baker, Chujai, Huean Kham Nang. Proof in `docs/library-proof/th-khonkaen.json`.
- **24 Nov 2026, Khon Kaen** (docs/library-briefs batch-73, round 3): +3 kids' cafés (SO Wonderland, Kinder Kids Cafe, Little Giggles). Proof in `docs/library-proof/th-khonkaen.json`.

### Chiang Mai, 23 Nov 2026
batch-37 of docs/library-briefs (round 2). +1: Ohkajhu (San Sai). Proof in `docs/library-proof/th-chiangmai.json`.

### Phuket, 23 Nov 2026
batch-37 of docs/library-briefs (round 2). +5 from Time Out Phuket: Millionaire Burgers (Surin), OOO Burger, PAN Burger, Treasure Burger, Rosmarino Rawai. Proof in `docs/library-proof/th-phuket.json`.

### Bangkok, 23 Nov 2026
batch-37 of docs/library-briefs (round 2). +5 from Grab's family-restaurant list: Krua Dok Mai Khao, Kin Lom Chom Saphan, Krua Krung Thep, Krua Nai Baan, Rong Si Phochana (Lang Suan). Proof in `docs/library-proof/th-bangkok.json`.
- **24 Nov 2026, Bangkok** (docs/library-briefs batch-56, round 3): +1 (Ohkajhu Siam Square One).

- **24 Nov 2026, Koh Samui** (docs/library-briefs batch-79, round 3): +1 (Treehouse Silent Beach). Proof in `docs/library-proof/th-samui.json`.

- **24 Nov 2026, Hua Hin** (docs/library-briefs batch-62, round 3): +3 (Krua Jeanong, S.Ken's Bistro, Baan Rim Nam Phetchaburi). Proof in `docs/library-proof/th-huahin.json`.

### Tokyo, 24 Nov 2026
batch-38 of docs/library-briefs (round 2). +2: Kawara Cafe & Kitchen (Kichijoji Parco), HUGHUG Café. Four places on 2025 pages turned out permanently closed. Proof in `docs/library-proof/jp-tokyo.json`.

### Krabi, 24 Nov 2026
batch-38 of docs/library-briefs (round 2). +10: Ton Ma Yom, Gecko Cabane, Chalita Cafe, Burger Bung, Ruanthip (Khlong Son), Baan Ma-Ying, Baan Tha Ley Cafe, Makan, Sprucy Cafe, Cha-Lom. Proof in `docs/library-proof/th-krabi.json`.
- **24 Nov 2026, Krabi** (docs/library-briefs batch-66, round 3): +4 (Ban Ko Lek, Anchali, Nahm, Khaothong Terrace). Proof in `docs/library-proof/th-krabi.json`.

### Osaka, 24 Nov 2026
batch-39 of docs/library-briefs (round 2). +3: Hakodate Kantaro (Grand Front), Hanamomimo (Namba Parks), Lingua World Cafe. Proof in `docs/library-proof/jp-osaka.json`.

### Kyoto, 24 Nov 2026
batch-39 of docs/library-briefs (round 2). +1: Horiuchi Kajitsuen (Nara). Proof in `docs/library-proof/jp-kyoto.json`.

- **24 Nov 2026, Hokkaido** (docs/library-briefs batch-62, round 3): +2 (Nahana, New Sanko — Otaru). Proof in `docs/library-proof/jp-hokkaido.json`.

### Seoul, 24 Nov 2026
batch-39 of docs/library-briefs (round 2). +3: Jeongwon Urban Garden, Cheonggiwa Town (Gildong Sageori), Casa de Tacos (Songridan-gil). Proof in `docs/library-proof/kr-seoul.json`.
- **24 Nov 2026, Seoul, Kakao Map pass**: +2 (Flubber (Yangjaecheon), Hwangnam (Gwanghwamun)), rows Google Maps could not confirm. Proof in `docs/library-proof/kr-seoul.json`.

### Hong Kong, 24 Nov 2026
batch-40 of docs/library-briefs (round 2). +1: Smoke & Barrel (its new address in Wyndham Mansion, Central, now confirmed on the map). Proof in `docs/library-proof/hk-hongkong.json`.

### Busan, 24 Nov 2026
batch-40 of docs/library-briefs (round 2). +6: Shabussam Jumeoni (Osiria), Daepae Market (Daeyeon), Gwangan Jeil Dwaeji Gukbap, Mad for Garlic (Lotte Busan Main), Old Mug, Miffy Café. Proof in `docs/library-proof/kr-busan.json`.
- **24 Nov 2026, Busan, Kakao Map pass**: +4 (Monyeo Jubang, Ilsamyuk Meat House, Gwanganri Daegyo Milmyeon; Zooraji (Shinsegae Centum City)), rows Google Maps could not confirm. Proof in `docs/library-proof/kr-busan.json`.

### Jeju, 24 Nov 2026
batch-40 of docs/library-briefs (round 2). +7: Myeonjumak, Samsin Halmang Bapsang, Dullegil (Jungmun), Jeju Hanmyeonga, Gozip Dol Wooluck (Hamdeok), Jeju Dodori Meat Noodles, Gwangyuk. Proof in `docs/library-proof/kr-jeju.json`.
- **24 Nov 2026, Jeju, Kakao Map pass**: +4 (Suni Table, Danso; Tayo Kids Café, Kongsuni Kids Café), rows Google Maps could not confirm. Proof in `docs/library-proof/kr-jeju.json`.
- **24 Nov 2026, Jeju** (docs/library-briefs batch-59, round 3): +2 (Nammaene Black Pork, two Seogwipo branches). Checked on Kakao Map (Naver Map is blocked in the browser here; Google Maps shows few reviews in Korea).

### Taipei, 24 Nov 2026
batch-40 of docs/library-briefs (round 2). +3: Mountain and Sea House, Orange Shabu Shabu (Da-an), MoneyJump. Proof in `docs/library-proof/tw-taipei.json`.
- **24 Nov 2026, Taipei** (docs/library-briefs batch-60, round 3): +2 (Elephant Garden, MuMu Land). Proof in `docs/library-proof/tw-taipei.json`.

### Macau, 24 Nov 2026
batch-41 of docs/library-briefs (round 2). +3: Rossio and Imperial Court (MGM Macau), Anytime (MGM Cotai). Proof in `docs/library-proof/mo-macau.json`.
- **24 Nov 2026, Macau** (docs/library-briefs batch-65, round 3): +2 (Coast at MGM Cotai, Spotlight at Studio City). Proof in `docs/library-proof/mo-macau.json`.

### Kuala Lumpur, 24 Nov 2026
batch-41 of docs/library-briefs (round 2). +1: Antipodean (Bangsar). Proof in `docs/library-proof/my-kualalumpur.json`.

### Singapore, 24 Nov 2026
batch-41 of docs/library-briefs (round 2). +6: Small Batch and Park Side (Botanic Gardens), Food Republic (313@Somerset), Wildseed Café (The Garage), Gyukatsu Kyoto Katsugyu (Parkway Parade), Papi's Tacos (Jalan Besar). Proof in `docs/library-proof/sg-singapore.json`.

- **24 Nov 2026, Bali** (docs/library-briefs batch-43): +4 (The Cashew Tree, Sundara, Jamie Oliver Kitchen, Splash Bistro). Proof in `docs/library-proof/id-bali.json`.
- **24 Nov 2026, Bali** (docs/library-briefs batch-58, round 3): +1 (I Am Vegan Babe). Proof in `docs/library-proof/id-bali.json`.

- **24 Nov 2026, Okinawa** (docs/library-briefs batch-43): +5 (Mikado, Piparchi Kitchen, Gaishokuya Kujira, Asian Shokudo Shirokuma, Ishigama Pizza Sakaba Maruki). Proof in `docs/library-proof/jp-okinawa.json`.

- **24 Nov 2026, Fukuoka** (docs/library-briefs batch-62, round 3): +2 (Full Full Kazenomori, Kiyokawa Salon). Proof in `docs/library-proof/jp-fukuoka.json`.

- **24 Nov 2026, Pattaya** (docs/library-briefs rerun): +4 (The Coffee Club, Sizzler, The Pizza Company — all at Central Festival Pattaya Beach — and Benihana at Avani). Proof in `docs/library-proof/th-pattaya.json`.

- **24 Nov 2026, Hat Yai** (docs/library-briefs rerun): +1 (Hashi Japanese Restaurant). Proof in `docs/library-proof/th-hatyai.json`.

- **24 Nov 2026, London** (docs/library-briefs batch-44): +8 (Agora, Bancone, Le Pont de la Tour, Apricity, Farang, Hawksmoor Spitalfields, Langan's Brasserie, Heard Borough). Proof in `docs/library-proof/gb-london.json`.

- **24 Nov 2026, Paris** (docs/library-briefs batch-44): +3 (Andia, Neni, Le Comptoir Général — family Sunday brunches). Proof in `docs/library-proof/fr-paris.json`.

- **24 Nov 2026, Sydney** (docs/library-briefs batch-44): +4 (Petersham Bowling Club, Bistro on the Greens, The Newport, Hotel Pennant Hills). Proof in `docs/library-proof/au-sydney.json`.

- **24 Nov 2026, New York** (docs/library-briefs batch-45): +12 (Cowgirl, Brooklyn Farmacy, Super Action Burger, Chez Nick, Pig Beach, Montague Diner, Al Badawi, Noodle Pudding, River Deli, Vineapple, Grand Canyon, Dino). Proof in `docs/library-proof/us-newyork.json`.
- **24 Nov 2026, New York** (docs/library-briefs batch-58, round 3): +2 (Community Food & Juice, Friend of a Farmer). Proof in `docs/library-proof/us-newyork.json`.

- **24 Nov 2026, California** (docs/library-briefs batch-45): +10 (Los Angeles 6, San Francisco 3, Carlsbad 1). Proof in `docs/library-proof/us-california.json`.

- **24 Nov 2026, Orlando** (docs/library-briefs batch-45): +3 (Grills Lakeside Seafood Deck, The Burrow, Andretti). Proof in `docs/library-proof/p-orlando.json`.

- **24 Nov 2026, Rome** (docs/library-briefs batch-46): +3 (Piccolo Arancio, Lola Flaminio, Tribeca). Proof in `docs/library-proof/it-rome.json`.

- **24 Nov 2026, Barcelona** (docs/library-briefs batch-46): +3 (Pez Vela, El Quim de la Boqueria, La Mar Salada). Proof in `docs/library-proof/es-barcelona.json`.
- **24 Nov 2026, Barcelona** (docs/library-briefs batch-61, round 3): +4 (La Pepita, Federal Café, Yatai, Time Out Market). Proof in `docs/library-proof/es-barcelona.json`.

- **24 Nov 2026, Amsterdam** (docs/library-briefs batch-46): +2 (Kanarie Club, Vrijburcht). Proof in `docs/library-proof/nl-amsterdam.json`.

- **24 Nov 2026, Berlin** (docs/library-briefs batch-46): +6 (Maximilians, Augustiner, Banh Mi Stable, Café Botanico, Villa Rixdorf, Manzini). Proof in `docs/library-proof/de-berlin.json`. The Berlin Tourism restaurant page (Jul 2026) still lists two places the map shows permanently closed.

- **24 Nov 2026, Istanbul** (docs/library-briefs batch-47): +1 (Happy Moon's Vadi İstanbul). Proof in `docs/library-proof/tr-istanbul.json`.

- **24 Nov 2026, Yokohama** (docs/library-briefs batch-47): +2 (Gather @ Eating House, Yamatoya). Proof in `docs/library-proof/jp-yokohama.json`.

- **24 Nov 2026, Kanazawa** (docs/library-briefs batch-47): +1 (Fusion21). Proof in `docs/library-proof/jp-kanazawa.json`.
- **24 Nov 2026, Kanazawa** (docs/library-briefs batch-68, round 3): +2 (Gokayama Farm Kitchen, Katsuzo). Proof in `docs/library-proof/jp-kanazawa.json`.

- **24 Nov 2026, Hiroshima** (docs/library-briefs batch-47): +1 (Marina Mario Espresso). Proof in `docs/library-proof/jp-hiroshima.json`.
- **24 Nov 2026, Hiroshima** (docs/library-briefs batch-81, round 3): +3 (aruhi morinonaka, Namaste Fuji Grand Koyo, Wa Cafe Plus Roche). Proof in `docs/library-proof/jp-hiroshima.json`.

- **24 Nov 2026, Nagano & Matsumoto** (docs/library-briefs batch-48): +5 (Soba Asada, Soba Club Sasaki, Kawasho, Temariya, Coffee Bigaku Abe). Proof in `docs/library-proof/jp-nagano.json`.

- **24 Nov 2026, Kumamoto** (docs/library-briefs batch-48): +2 (Gyoza-ya Ni-no-Ni Chuo, Kikyo-ya). Proof in `docs/library-proof/jp-kumamoto.json`.
- **24 Nov 2026, Kumamoto** (docs/library-briefs batch-73, round 3): +2 (Daimonji, Buffet Restaurant Ginnan). Proof in `docs/library-proof/jp-kumamoto.json`.

- **24 Nov 2026, Nikko** (docs/library-briefs batch-48): +3 (Nikko Monaka, Hatsuishi Cafe, Kumoizu). Proof in `docs/library-proof/jp-nikko.json`.

- **24 Nov 2026, Gyeongju, Kakao Map pass**: +1 (Eden Garden), rows Google Maps could not confirm. Proof in `docs/library-proof/kr-gyeongju.json`.
- **24 Nov 2026, Gyeongju** (docs/library-briefs batch-84, round 3): +1 (Hwangri Hwadukga). Proof in `docs/library-proof/kr-gyeongju.json`.

- **24 Nov 2026, Gangwon** (docs/library-briefs batch-49): +3 (Gangmun Jumak, Chodang Jang Kalguksu, Matsu). Proof in `docs/library-proof/kr-gangwon.json`.
- **24 Nov 2026, Gangwon, Kakao Map pass**: +6 (Daeunjeong, Chuncheon Ani Dakgalbi, Hyojadong Seolleongtang (Oak Valley), Green Valley Barbecue; Design Thinking Museum, Gangwon Police Museum), rows Google Maps could not confirm. Proof in `docs/library-proof/kr-gangwon.json`.
- **24 Nov 2026, Gangwon** (docs/library-briefs batch-64, round 3): +1 (Gausup, Chuncheon). Checked on Kakao Map (Naver Map is blocked in the browser here; Google Maps shows few reviews in Korea).

- **24 Nov 2026, Jeonju** (docs/library-briefs batch-50): +1 (Butter Book). Proof in `docs/library-proof/kr-jeonju.json`. Google Maps shows few or no reviews for most small places in Korea, so most rows could not be confirmed open there and were left out; a pass with Naver Map would confirm more.
- **24 Nov 2026, Jeonju, Kakao Map pass**: +7 (Hyundaiok (two branches), Ibadom Gamjatang; Innovation City Cultural Centre, MukiMuki, Nutty Child World, Namanui Kids Café), rows Google Maps could not confirm. Proof in `docs/library-proof/kr-jeonju.json`.
- **24 Nov 2026, Jeonju** (docs/library-briefs batch-65, round 3): +2 (Okubowl, Masiran-ge). Checked on Kakao Map (Naver Map is blocked in the browser here; Google Maps shows few reviews in Korea).

- **24 Nov 2026, Suwon** (docs/library-briefs batch-50): +1 (Four Seasons Kitchen Gwanggyo). Proof in `docs/library-proof/kr-suwon.json`.
- **24 Nov 2026, Suwon, Kakao Map pass**: +4 (Bbok Sikdang (Gwanggyo, Haenggung), Hanchon Seolleongtang, Myeongnyun Jinsa Galbi), rows Google Maps could not confirm. Proof in `docs/library-proof/kr-suwon.json`.
- **24 Nov 2026, Suwon** (docs/library-briefs batch-65, round 3): +1 (Haeundae Pa). Checked on Kakao Map (Naver Map is blocked in the browser here; Google Maps shows few reviews in Korea).

- **24 Nov 2026, Hualien** (docs/library-briefs batch-50): +1 (Yinglun Western Restaurant). Proof in `docs/library-proof/tw-hualien.json`.
- **24 Nov 2026, Hualien** (docs/library-briefs batch-70, round 3): +1 (the Starbucks container shop). Proof in `docs/library-proof/tw-hualien.json`.

- **24 Nov 2026, Central Taiwan** (docs/library-briefs batch-50): +2 (Lizi Café Tunghai, Apple Castle). Proof in `docs/library-proof/tw-central.json`.
- **24 Nov 2026, central Taiwan** (docs/library-briefs batch-67, round 3): +2 (Princess Anne Garden, Meteor Garden park). Proof in `docs/library-proof/tw-central.json`.

- **24 Nov 2026, Khao Yai** (docs/library-briefs batch-51): +1 (Krua Baan Rao Eng). Proof in `docs/library-proof/th-khaoyai.json`.

- **24 Nov 2026, Sukhothai** (docs/library-briefs batch-51): +1 (Kuay Teow Rim Rabiang). Proof in `docs/library-proof/th-sukhothai.json`.
- **24 Nov 2026, Sukhothai** (docs/library-briefs batch-83, round 3): +1 (Ra-Biang Coffee). Proof in `docs/library-proof/th-sukhothai.json`.

- **24 Nov 2026, Chanthaburi** (docs/library-briefs batch-51): +1 (Thong Nathi). Proof in `docs/library-proof/th-chanthaburi.json`.
- **24 Nov 2026, Chanthaburi** (docs/library-briefs batch-75, round 3): +2 orchard cafés (Baan Suan Ratchanat, Arun Burapha). Proof in `docs/library-proof/th-chanthaburi.json`.

- **24 Nov 2026, Tainan & Kaohsiung** (docs/library-briefs batch-51): +1 (Tainan Lòng Story). Proof in `docs/library-proof/tw-south.json`.
- **24 Nov 2026, Tainan & Kaohsiung** (docs/library-briefs batch-61, round 3): +4 (Casa e Casa, 8818 Pizza Yongkang, Sen Doufeng Café, Little Tree Picture-Book Café). Proof in `docs/library-proof/tw-south.json`.

- **24 Nov 2026, Surat Thani** (docs/library-briefs batch-52): +4 (Tapee Seafood, Nai Aow Seafood, Ban Lung Moon, Phunisa). Proof in `docs/library-proof/th-suratthani.json`.

- **24 Nov 2026, Mae Hong Son** (docs/library-briefs batch-53): +5 (Khao Soi Phi Nong, Thana Phochana, Laab Aroi Thi Sud Nai Lok, Mae Luang Phen, Hoi Kha noodles). Proof in `docs/library-proof/th-maehongson.json`.
- **24 Nov 2026, Mae Hong Son** (docs/library-briefs batch-66, round 3): +2 (Art in Chai, Coffee in Love — Pai). Proof in `docs/library-proof/th-maehongson.json`.

- **24 Nov 2026, the Maldives atolls** (docs/library-briefs batch-54, round 3): +1 (Island Kitchen, Westin Maldives Miriandhoo). Proof in `docs/library-proof/mv-atolls.json`.

- **24 Nov 2026, Queenstown** (docs/library-briefs batch-57, round 3): +1 (Lone Star). Proof in `docs/library-proof/nz-queenstown.json`.

- **24 Nov 2026, Lisbon** (docs/library-briefs batch-59, round 3): +4 (Este Oeste, Giro'Giro, Hamburgueria da Parada, Jamie's Italian). Proof in `docs/library-proof/pt-lisbon.json`.

- **24 Nov 2026, Siem Reap** (docs/library-briefs batch-59, round 3): +1 (Le Petit Chef, Park Hyatt). Proof in `docs/library-proof/kh-siemreap.json`.

- **24 Nov 2026, Madrid** (docs/library-briefs batch-59, round 3): +6 (El Perro y la Galleta, Ojalá, La Musa Latina, Ginos Gran Vía, Lamucca de Pez, La Cantina de Sputnik). Proof in `docs/library-proof/es-madrid.json`.

- **24 Nov 2026, Venice** (docs/library-briefs batch-62, round 3): +2 (Osteria al Portego, Osteria ai Pugni). Proof in `docs/library-proof/it-venice.json`.

- **24 Nov 2026, Milan** (docs/library-briefs batch-63, round 3): +5 (Spazio Caroli 12, La Fornasetta, Löwengrube, Piccola Ischia, Mosso). Proof in `docs/library-proof/it-milan.json`.

- **24 Nov 2026, Gold Coast** (docs/library-briefs batch-63, round 3): +3 (Pancake Diner, Currumbin RSL, Cafe Catalina). Proof in `docs/library-proof/au-goldcoast.json`.

- **24 Nov 2026, Lombok & the Gilis** (docs/library-briefs batch-64, round 3): +3 (Mama's Pizza, Francesco's Pizza, The Shack). Proof in `docs/library-proof/id-lombok.json`.

- **24 Nov 2026, Amalfi Coast** (docs/library-briefs batch-66, round 3): +1 (Geljada, Maiori). Proof in `docs/library-proof/it-amalfi.json`.

- **24 Nov 2026, Brussels** (docs/library-briefs batch-67, round 3): +1 (Beaubon). Proof in `docs/library-proof/be-brussels.json`.

- **24 Nov 2026, Disneyland Paris** (docs/library-briefs batch-68, round 3): +1 (Chuck Wagon Café). Proof in `docs/library-proof/p-disney-paris.json`.

- **24 Nov 2026, Washington DC** (docs/library-briefs batch-68, round 3): +2 (Market Lunch, Tonic at Quigley's). Proof in `docs/library-proof/us-dc.json`.

- **24 Nov 2026, Athens** (docs/library-briefs batch-68, round 3): +4 (Ergon House, To Vrasto, O Telis, Vyrinis). Proof in `docs/library-proof/gr-athens.json`.

- **24 Nov 2026, Santiago** (docs/library-briefs batch-69, round 3): +5 (Bambinolli, Cassis La Dehesa, La Fuente Reina, El Cafetín de Virgilio, Chococafé). Proof in `docs/library-proof/cl-santiago.json`.

- **24 Nov 2026, Ireland** (docs/library-briefs batch-69, round 3): +2 (Two Pups, Deenagh Lodge). Proof in `docs/library-proof/ie-ireland.json`.

- **24 Nov 2026, Toronto** (docs/library-briefs batch-71, round 3): +2 (Avling, The Udupi Palace). Proof in `docs/library-proof/ca-toronto.json`.

- **24 Nov 2026, Tbilisi** (docs/library-briefs batch-72, round 3): +4 (Pause Family Cafe, Ninia's Garden, Manano, Bukhari). Proof in `docs/library-proof/ge-tbilisi.json`.

- **24 Nov 2026, Yogyakarta** (docs/library-briefs batch-72, round 3): +3 (Krasan, Little Goo, Padiku). Proof in `docs/library-proof/id-yogyakarta.json`.

- **24 Nov 2026, Vancouver** (docs/library-briefs batch-74, round 3): +1 (Kirin Restaurant). Proof in `docs/library-proof/ca-vancouver.json`.

- **24 Nov 2026, Prague** (docs/library-briefs batch-74, round 3): +2 (The Spot, Skákal pes). Proof in `docs/library-proof/cz-prague.json`.

- **24 Nov 2026, Geneva** (docs/library-briefs batch-75, round 3): +2 (Brasserie des Trois Rois, La Riguenette, both Lausanne). Proof in `docs/library-proof/ch-geneva.json`.

- **24 Nov 2026, Tallinn** (docs/library-briefs batch-75, round 3): +2 (PAAT, OKO Resto, both Viimsi). Proof in `docs/library-proof/ee-tallinn.json`.

- **24 Nov 2026, Hawaii** (docs/library-briefs batch-76, round 3): +1 (Da Kitchen, Kihei). Proof in `docs/library-proof/us-hawaii.json`.

- **24 Nov 2026, Provence** (docs/library-briefs batch-76, round 3): +1 (Le Carré du Palais, Avignon). Proof in `docs/library-proof/fr-provence.json`.

- **24 Nov 2026, Delhi, Agra & Jaipur** (docs/library-briefs batch-77, round 3): +1 (Sattvik). Proof in `docs/library-proof/in-golden.json`.

- **24 Nov 2026, Takayama & Nagoya** (docs/library-briefs batch-77, round 3): +6 (five in Nagoya with private rooms or baby seating, Marushin Shokudo in Takayama). Proof in `docs/library-proof/jp-takayama.json`.

- **24 Nov 2026, Cape Town** (docs/library-briefs batch-79, round 3): +4 (Folk Cafe, Picnic Cafe, Panarottis Kenilworth, Strolla). Proof in `docs/library-proof/za-capetown.json`.

- **24 Nov 2026, Interlaken** (docs/library-briefs batch-80, round 3): +1 (Waldcafé Heimwehfluh). Proof in `docs/library-proof/ch-interlaken.json`.

- **24 Nov 2026, Strasbourg & Colmar** (docs/library-briefs batch-80, round 3): +5 with a children's menu (Le Pfifferbriader; Au Cygne, Bistrot des Lavandières, Maison des Têtes brasserie, l'Auberge in Colmar). Proof in `docs/library-proof/fr-strasbourg.json`.

- **24 Nov 2026, Chicago** (docs/library-briefs batch-81, round 3): +1 (Honey Butter Fried Chicken). Proof in `docs/library-proof/us-chicago.json`.

- **24 Nov 2026, Tashkent** (docs/library-briefs batch-81, round 3): +1 (Broccoli Park). Proof in `docs/library-proof/uz-tashkent.json`.

- **24 Nov 2026, Boston** (docs/library-briefs batch-83, round 3): +3 (FiRE+iCE, Trident Booksellers & Cafe, Joe's Waterfront). Proof in `docs/library-proof/us-boston.json`.

- **24 Nov 2026, Hamburg** (docs/library-briefs batch-83, round 3): +3 (Q21 Gasthaus, Beach Hamburg family brunch, Familiencafé Krümel). Proof in `docs/library-proof/de-hamburg.json`.

- **24 Nov 2026, Helsinki** (docs/library-briefs batch-84, round 3): +1 (St. George Bakery). Proof in `docs/library-proof/fi-helsinki.json`.

- **24 Nov 2026, Chamonix & Annecy** (docs/library-briefs batch-84, round 3): +1 (PlanB Living Chamonix). Proof in `docs/library-proof/fr-alps.json`.

- **24 Nov 2026, Seattle** (docs/library-briefs batch-85, round 3): +6 (Portage Bay Cafe, Kisaku, Ivar's Salmon House, Razzi's, Agua Verde, Elemental Pizza). Proof in `docs/library-proof/us-seattle.json`.

- **24 Nov 2026, Dubrovnik** (docs/library-briefs batch-86, round 3): +4 (Paradise Garden and Kaluma in Hvar; Sunset Beach café and Prekala in Lapad). Proof in `docs/library-proof/hr-dubrovnik.json`.

- **24 Nov 2026, Bled & Ljubljana** (docs/library-briefs batch-86, round 3): +1 (Marley & Me). Proof in `docs/library-proof/si-bled.json`.

- **24 Nov 2026, Buenos Aires** (docs/library-briefs batch-88, round 3): +3 (La Payuca, Joe's Grill San Isidro, Mococo Kids Cafe). Proof in `docs/library-proof/ar-buenosaires.json`.

- **24 Nov 2026, Abu Dhabi** (docs/library-briefs batch-88, round 3): +4 (Amara, Shvili, Havana Cafe & Restaurant, Leo & Loona). Proof in `docs/library-proof/ae-abudhabi.json`.

- **24 Nov 2026, Valletta and Gozo** (docs/library-briefs batch-89, round 3): +1 (Carob Tree Food Court, St Julian's). Proof in `docs/library-proof/mt-valletta.json`.

- **24 Nov 2026, Patagonia** (docs/library-briefs batch-91, round 3): +1 (La Lechuza, El Calafate). Proof in `docs/library-proof/ar-patagonia.json`.

- **24 Nov 2026, Lucerne** (docs/library-briefs batch-91, round 3): +1 (Fürenalp mountain restaurant, Engelberg). Proof in `docs/library-proof/ch-lucerne.json`.

- **24 Nov 2026, Mont-Saint-Michel** (docs/library-briefs batch-92, round 3): +3 in Saint-Malo (La Touline, Les Embruns, La Brigantine). Proof in `docs/library-proof/fr-montstmichel.json`.

- **24 Nov 2026, Nice and the Riviera** (docs/library-briefs batch-92, round 3): +1 (Casa Nissa, Place Masséna). Proof in `docs/library-proof/fr-nice.json`.

- **24 Nov 2026, Grand Canyon and Las Vegas** (docs/library-briefs batch-93, round 3): +1 (Joe's Seafood, Prime Steak & Stone Crab). Proof in `docs/library-proof/us-southwest.json`.

- **24 Nov 2026, Český Krumlov** (docs/library-briefs batch-94, round 3): +1 (Travellers Restaurant). Proof in `docs/library-proof/cz-krumlov.json`.

- **24 Nov 2026, Bruges and Ghent** (docs/library-briefs batch-95, round 3): +2 in Ghent (Restaurant Cocotte, LAGO Bistro Rozebroeken). Proof in `docs/library-proof/be-bruges.json`.

- **24 Nov 2026, Nadi and the Fiji islands** (docs/library-briefs batch-95, round 3): +1 (Cantina Grill & Bar, Port Denarau). Proof in `docs/library-proof/fj-islands.json`.

- **24 Nov 2026, Luxembourg City and Vianden** (docs/library-briefs batch-95, round 3): +1 (Mu, Sofitel Le Grand Ducal). Proof in `docs/library-proof/lu-luxembourg.json`.

- **24 Nov 2026, Tromsø** (docs/library-briefs batch-96, round 3): +2 (Hard Rock Cafe, Spiseriet Konditori at Veita). Proof in `docs/library-proof/no-tromso.json`.

- **24 Nov 2026, Neuschwanstein** (docs/library-briefs batch-96, round 3): +1 (Tante Paula, Hopfen am See). Proof in `docs/library-proof/p-neuschwanstein.json`.

- **24 Nov 2026, Rio de Janeiro** (docs/library-briefs batch-97, round 3): +1 (Cortés Asador, Shopping Leblon). Proof in `docs/library-proof/br-rio.json`.

- **24 Nov 2026, Uluru and the Red Centre** (docs/library-briefs batch-98, round 3): +2 in Alice Springs (Tali, Coolamon Cafe). Proof in `docs/library-proof/au-uluru.json`.

- **24 Nov 2026, the Cinque Terre** (docs/library-briefs batch-100, round 3): +2 in Levanto (La Picea, Da Tapulin). Proof in `docs/library-proof/it-cinqueterre.json`.

- **24 Nov 2026, Zermatt** (docs/library-briefs batch-100, round 3): +2 (Buffet & Bar Riffelberg, Alphitta). Proof in `docs/library-proof/ch-zermatt.json`.

- **24 Nov 2026, Plitvice Lakes** (docs/library-briefs batch-101, round 3): +1 in Zagreb (Batak Centar Cvjetni). Proof in `docs/library-proof/hr-plitvice.json`.

- **24 Nov 2026, Petra, Wadi Rum and the Dead Sea** (docs/library-briefs batch-101, round 3): +1 (Buffalo Wings & Rings, Aqaba). Proof in `docs/library-proof/jo-petra.json`.

- **25 Nov 2026, Wellington (new town)**: 12, each checked on Google Maps. Proof in `docs/library-proof/nz-wellington.json`.

- **25 Nov 2026, Incheon (new town)**: 11 (8 restaurants with playrooms or kids’ menus, 3 cafés), each checked on Google Maps. Proof in `docs/library-proof/kr-incheon.json`.

- **25 Nov 2026, Fuji Five Lakes (new town)**: 8, each checked on Google Maps; two (Shirasu Udon, Sengen Chaya) from Mapple’s undated 2026 family-dining page, which the owner allowed. Proof in `docs/library-proof/jp-fuji.json`.

- **25 Nov 2026, Beppu (new town)**: 9, each checked on Google Maps; four from Mapple’s undated 2026 family-dining page, which the owner allowed. Proof in `docs/library-proof/jp-beppu.json`.

- **25 Nov 2026, Kagoshima (new town)**: 9, each checked on Google Maps; seven from undated Tabelog and Mapple guides, which the owner allowed. Proof in `docs/library-proof/jp-kagoshima.json`.

- **25 Nov 2026, Takamatsu (new town)**: 8, each checked on Google Maps; five from Mapple’s undated 2026 family-dining page, which the owner allowed. Proof in `docs/library-proof/jp-takamatsu.json`.

- **25 Nov 2026, Matsuyama (new town)**: 8, each checked on Google Maps; all from undated HotPepper and Mapple pages, which the owner allowed. Proof in `docs/library-proof/jp-matsuyama.json`.

- **25 Nov 2026, Sendai (new place)**: the 12 Sendai and Matsushima rows of `jp-tohoku` moved to `jp-sendai` unchanged; Tohoku keeps 9.

- **25 Nov 2026, Nagoya (new place)**: the 11 Nagoya rows of `jp-takayama` moved to `jp-nagoya` unchanged; Takayama keeps 21 and gains Cha-no-me (sweets, from Mapple’s undated family page, checked on Google Maps) so it still has two cafés or sweets shops.

- **25 Nov 2026, Kobe (new place)**: the 6 Kobe rows of `jp-hiroshima` moved to `jp-kobe` unchanged, and three added from Mapple’s undated family page (Hong Kong Charo, Kohoseki, Morozoff), each checked on Google Maps; Hiroshima keeps 18.

- **25 Nov 2026, Nara (new place)**: Horiuchi Kajitsuen moved from `jp-kyoto` to `jp-nara`, and seven added from Mapple’s undated family page (Kamameshi Shizuka, Ashibi no Sato, Tofu-an Kondo, RAhOTSU, Wazen Tamayura, TEN.TEN.CAFE, Kuki Cake.), each checked on Google Maps.

- **25 Nov 2026, Christchurch (new town)**: 8, from ChristchurchNZ's family dining guide (undated; owner's rule for undated food guides), each checked on Google Maps. Proof in `docs/library-proof/nz-christchurch.json`.
