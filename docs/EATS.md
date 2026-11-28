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

- **26 Nov 2026, Zhangjiajie**: +3 from Amap place pages. Proof in `docs/library-proof/cn-zhangjiajie.json`.

- **26 Nov 2026, Yunnan**: +4 from Amap place pages (Kunming, Dali). Proof in `docs/library-proof/cn-yunnan.json`.

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

- **25 Nov 2026, Hangzhou (new town)**: 8, from Dianping shop pages (owner's China rule ข), each checked on Amap. Proof in `docs/library-proof/cn-hangzhou.json`.

- **26 Nov 2026, Hangzhou**: +4 from Amap place pages (owner: Amap as the source and the status check). Proof in `docs/library-proof/cn-hangzhou.json`.

- **25 Nov 2026, Shenzhen (new town)**: 11, from Amap place pages (owner: Amap as the source and the status check), each with a children's tag or review. Proof in `docs/library-proof/cn-shenzhen.json`.

- **26 Nov 2026, Shenzhen**: +5 from Amap place pages (three Hong Kong cafes, Green Tea, Dian Dou De). Proof in `docs/library-proof/cn-shenzhen.json`.

- **25 Nov 2026, Chongqing**: +7, from Amap place pages (owner: Amap as the source and the status check). Proof in `docs/library-proof/cn-chongqing.json`.

- **25 Nov 2026, Harbin**: +8, from Amap place pages (owner: Amap as the source and the status check). Proof in `docs/library-proof/cn-harbin.json`.

- **25 Nov 2026, Guilin**: +6, from Amap place pages (owner: Amap as the source and the status check). Proof in `docs/library-proof/cn-guilin.json`.

- **26 Nov 2026, Beijing**: +11, from Amap place pages (owner: Amap as the source and the status check). Proof in `docs/library-proof/cn-beijing.json`.

- **26 Nov 2026, Shanghai**: +11, from Amap place pages (owner: Amap as the source and the status check). Proof in `docs/library-proof/cn-shanghai.json`.

- **26 Nov 2026, Guangzhou (new town)**: 13, from Amap place pages (owner: Amap as the source and the status check). Proof in `docs/library-proof/cn-guangzhou.json`.

- **26 Nov 2026, Chengdu**: +5 from Amap place pages (owner: Amap as the source and the status check). Proof in `docs/library-proof/cn-chengdu.json`.

- **26 Nov 2026, Xi'an**: +5 from Amap place pages (owner: Amap as the source and the status check). Proof in `docs/library-proof/cn-xian.json`.

- **26 Nov 2026, Guangzhou, round 5**: +4 from Amap place pages. Proof in `docs/library-proof/cn-guangzhou.json`.

- **26 Nov 2026, Shenzhen, round 5**: +2 from Amap place pages. Proof in `docs/library-proof/cn-shenzhen.json`.

- **26 Nov 2026, Beijing, round 5**: +3 from Amap place pages. Proof in `docs/library-proof/cn-beijing.json`.

- **26 Nov 2026, Shanghai, round 5**: +2 from Amap place pages. Proof in `docs/library-proof/cn-shanghai.json`.

- **26 Nov 2026, Guilin, round 5**: +1 from Amap place pages. Proof in `docs/library-proof/cn-guilin.json`.

- **26 Nov 2026, Chongqing, round 5**: +3 from Amap place pages. Proof in `docs/library-proof/cn-chongqing.json`.

- **26 Nov 2026, Harbin, round 5**: +1 from Amap place pages. Proof in `docs/library-proof/cn-harbin.json`.

- **26 Nov 2026, Guangzhou, round 6**: +4 from Amap place pages (children's meals). Proof in `docs/library-proof/cn-guangzhou.json`.

- **26 Nov 2026, Shenzhen, round 6**: +3 from Amap place pages (children's meals, high chairs). Proof in `docs/library-proof/cn-shenzhen.json`.

- **26 Nov 2026, Chongqing, round 6**: +4 from Amap place pages (children's meals). Proof in `docs/library-proof/cn-chongqing.json`.

- **26 Nov 2026, Harbin, round 6**: +3 from Amap place pages (children's meals). Proof in `docs/library-proof/cn-harbin.json`.

- **26 Nov 2026, Chengdu, round 6**: +5 from Amap place pages (children's meals, high chairs). Proof in `docs/library-proof/cn-chengdu.json`.

- **26 Nov 2026, Xi'an, round 6**: +3 from Amap place pages (children's meals, high chairs). Proof in `docs/library-proof/cn-xian.json`.

- **26 Nov 2026, Yunnan, round 6**: +2 from Amap place pages (children's meals). Proof in `docs/library-proof/cn-yunnan.json`.

- **26 Nov 2026, Guilin, round 6**: +2 from Amap place pages (children's meals). Proof in `docs/library-proof/cn-guilin.json`.

- **26 Nov 2026, Shanghai, round 6**: +5 from Amap place pages (children's meals). Proof in `docs/library-proof/cn-shanghai.json`.

- **26 Nov 2026, Beijing, round 6**: +4 from Amap place pages (children's meals). Proof in `docs/library-proof/cn-beijing.json`.

- **26 Nov 2026, Hangzhou, round 7**: +7 from Amap place pages (high chairs, children's meals; a quick bite and a café, so the list may pass 12). Proof in `docs/library-proof/cn-hangzhou.json`.

- **26 Nov 2026, Guangzhou, round 7**: +2 from Amap place pages. Proof in `docs/library-proof/cn-guangzhou.json`.

- **26 Nov 2026, Shenzhen, round 7**: +3 from Amap place pages. Proof in `docs/library-proof/cn-shenzhen.json`.

- **26 Nov 2026, Beijing, round 7**: +5 from Amap place pages. Proof in `docs/library-proof/cn-beijing.json`.

- **26 Nov 2026, Shanghai, round 7**: +4 from Amap place pages. Proof in `docs/library-proof/cn-shanghai.json`.

- **26 Nov 2026, Guilin, round 8**: +3 from Amap place pages (high chairs). Proof in `docs/library-proof/cn-guilin.json`.

- **26 Nov 2026, Harbin, round 8**: +4 from Amap place pages (high chairs). Proof in `docs/library-proof/cn-harbin.json`.

- **26 Nov 2026, Chongqing, round 8**: +3 from Amap place pages (high chairs). Proof in `docs/library-proof/cn-chongqing.json`.
- **25 Nov 2026, Kyoto** (round 4: Japan, Korea, New Zealand): +3 (IN THE GREEN, Merry Go Round kids' café, The Kitchen Salvatore Cuomo). Proof in `docs/library-proof/jp-kyoto.json`.
- **25 Nov 2026, Tokyo** (round 4: Japan, Korea, New Zealand): +2 (Shumi no Mori, Shinjuku Kabuki Hall). Proof in `docs/library-proof/jp-tokyo.json`.
- **25 Nov 2026, Osaka** (round 4: Japan, Korea, New Zealand): +2 (Babyleaf, MOULiN). Proof in `docs/library-proof/jp-osaka.json`.
- **25 Nov 2026, Hiroshima** (round 4: Japan, Korea, New Zealand): +1 (Cafe Flowry, Hatsukaichi). Proof in `docs/library-proof/jp-hiroshima.json`.
- **25 Nov 2026, Yokohama** (round 4: Japan, Korea, New Zealand): +7 in Minato Mirai (Hard Rock Cafe, Soup Stock Tokyo, American House, J.S. Pancake Cafe, RHC CAFE, Blue Bottle Coffee, Megumi Suisan). Proof in `docs/library-proof/jp-yokohama.json`.
- **25 Nov 2026, Nikko** (round 4: Japan, Korea, New Zealand): +3 in Utsunomiya (WHAT'S UP?, Wild Kitchen Kumakuma, TURQUOISE / TOKU). Proof in `docs/library-proof/jp-nikko.json`.
- **25 Nov 2026, Kumamoto** (round 4: Japan, Korea, New Zealand): +1 (Yakiniku Horumon Ebisu). Proof in `docs/library-proof/jp-kumamoto.json`.
- **25 Nov 2026, Tohoku** (round 4: Japan, Korea, New Zealand): +1 (Trenta, Yamagata). Proof in `docs/library-proof/jp-tohoku.json`.
- **25 Nov 2026, Hokkaido** (round 4: Japan, Korea, New Zealand): +3 in Sapporo (Ohno Buono, Taguto, Sankatei). Proof in `docs/library-proof/jp-hokkaido.json`.
- **25 Nov 2026, Fukuoka** (round 4: Japan, Korea, New Zealand): +2 in Tenjin (chano-ma, Anion). Proof in `docs/library-proof/jp-fukuoka.json`.

- **26 Nov 2026, Guangzhou, round 9**: +5 from Amap place pages (high chairs). Proof in `docs/library-proof/cn-guangzhou.json`.

- **26 Nov 2026, Shenzhen, round 9**: +3 from Amap place pages (children's meals). Proof in `docs/library-proof/cn-shenzhen.json`.

- **26 Nov 2026, Beijing, round 10**: +6 from Amap place pages (Haidian). Proof in `docs/library-proof/cn-beijing.json`.

- **26 Nov 2026, Shanghai, round 10**: +3 from Amap place pages (Xuhui, Changning). Proof in `docs/library-proof/cn-shanghai.json`.

- **26 Nov 2026, Chengdu, round 11**: +2 from Amap place pages (high chairs). Proof in `docs/library-proof/cn-chengdu.json`.

- **26 Nov 2026, Hangzhou, round 13**: +11 from Amap place pages (Xihu, Shangcheng). Proof in `docs/library-proof/cn-hangzhou.json`.
- **26 Nov 2026, Yunnan, round 12**: +3 from Amap place pages (Kunming). Proof in `docs/library-proof/cn-yunnan.json`.

- **26 Nov 2026, Xi'an, round 12**: +4 from Amap place pages. Proof in `docs/library-proof/cn-xian.json`.

- **26 Nov 2026, nine thin Japan towns**: Nara +8, Kobe +18 (13 Mapple Western-food places, then 5 quick bites so the list has its mix), Nagoya +8, Fuji +11, Sendai +3, Beppu +1, Takamatsu +16 (11 udon shops and 5 cafés and sweets), Matsuyama +7, Kagoshima +6. Haiku agents found them on dated pages or undated Mapple/Tabelog family lists; each was then opened on Google Maps on 26 Nov 2026 and kept only when it was not marked closed and sat in the town (three were closed though a list still names them: つばめcafe, 食房たけだ, ひげぱんだ). Six national chains were left out. Proof in `docs/library-proof/jp-thin-2026-11-26.json`.
- **26 Nov 2026, Guangzhou, round 14**: +6 from Amap place pages (Tianhe, Haizhu). Proof in `docs/library-proof/cn-guangzhou.json`.

- **26 Nov 2026, Shenzhen, round 15**: +6 from Amap place pages (Futian, Nanshan). Proof in `docs/library-proof/cn-shenzhen.json`.

- **26 Nov 2026, Zhangjiajie, round 17**: +6 from Amap place pages (Wulingyuan, Yongding). Proof in `docs/library-proof/cn-zhangjiajie.json`.
- **26 Nov 2026, Guilin, round 16**: +2 from Amap place pages; restaurants with children's tags are few on Amap in Guilin. Proof in `docs/library-proof/cn-guilin.json`.

- **26 Nov 2026, Japan in full (owner: "ทำญี่ปุ่นทั้งหมดเลย เพิ่มเมือง เพิ่มให้ลึกเองเลย จนจบ")**: +349 places to eat in 30 towns, six of them new (Ise and Shima 14, Shirahama and Wakayama 11, Izu and Atami 16, Miyazaki 8, Toyama and Kurobe 12, Niigata and Echigo-Yuzawa 12); Tokyo and Osaka reach 71, Kyoto 62, Nagoya 39, Tohoku 32, Beppu 29, Kagoshima 29. Haiku agents found them (dated pages, or undated Mapple/Tabelog family lists as allowed on 25 Nov 2026), `library-check.cjs` checked each page, and every place was opened on Google Maps on 26 Nov 2026 by checker agents: 30 that a 2025–2026 page still lists turned out closed (Pompompurin Cafe Harajuku, three Ueno cafés, two Nikko yuba houses, Kyushu Pancake Cafe Miyazaki …) and about 30 more matched another branch or town — all left out, with national chains, izakaya and karaoke. Big cities stay short of 70 (Kyoto 62) and Kanazawa, Hakone and Takamatsu gained little: the honest family lists there are already in the library. Proof in `docs/library-proof/jp-all-2026-11-26.json`.
- **26 Nov 2026, the Japan gaps**: Kyoto 62→68, Kanazawa 31→42, Hakone 23→42 (with Karuizawa and Odawara, which the library files under it), Takamatsu 28→39 (Shodoshima and Naoshima cafés). Same pipeline: dated pages or undated Mapple family lists, `library-check.cjs`, then every place opened on Google Maps on 26 Nov 2026 — seven closed (dot.S and Hokkyokusei in Kyoto, whole cacao Nishijin, BASILICO CAFE on Shodoshima, Taiheitei in Hakone for now …) and five matched another place, all left out. Kyoto and Takamatsu stay just short of 70 and 40. Proof in `docs/library-proof/jp-gaps-2026-11-26.json`.
- **26 Nov 2026, Japan round 4**: +130 places to eat in 12 towns — Miyazaki 8→21, Shirahama 11→20 (mostly Wakayama city), Niigata 12→23, Toyama 12→21, Ise 14→24, Izu 16→26, Matsuyama 21→34, Nara 23→36, Fuji 24→33 (cafés: the dated lists named no restaurant the library lacks), Sendai 26→38, Nagasaki 28→39, Kagoshima 29→39. Same pipeline (dated pages, Mapple/Tabelog/Retty family lists, `library-check.cjs`, every place opened on Google Maps on 26 Nov 2026): closed ones (ICHIBANYA FRUITS CAFE, Jiyutei's tea room, cafe Verde) and eight that matched another branch or business left out, with second branches of places already listed. Proof in `docs/library-proof/jp-more-2026-11-26.json`.
- **26 Nov 2026, Japan round 5**: +102 places to eat, and every one of these towns now holds 40 or more — Beppu 29→42 (with Yufuin), Fuji 33→42 (restaurants this time), Hiroshima 32→43 (seven on Miyajima), Kobe 33→40, Matsuyama 34→44, Nagano 32→40, Nara 36→43, Nikko 31→40, Takayama 34→44, Tohoku 32→43 (Hirosaki apple pie, Akita kiritanpo, Morioka reimen, Yamagata imoni), Yokohama 35→42. Same pipeline; left out: Kotori Cafe and Goemon (closed on Maps), six that Maps could not match, a beer hall, a restaurant chain, a spice shop, a place already listed under another name. Proof in `docs/library-proof/jp-r5-2026-11-26.json`.
- **26 Nov 2026, Japan round 6**: the last small gaps — Kyoto 68→70 (its big-city target), Kumamoto 37→40, Okinawa 39→40, Sendai 38→39, Miyazaki 21→22, Toyama 21→22. Left out: Hassen in Sendai (closed on Maps), two Fukuoka places whose only page is from 2021, a yakitori bar. Proof in `docs/library-proof/jp-r6-2026-11-26.json`.
- **26 Nov 2026, Japan round 7**: Shirahama 20→22, Fukuoka 39→41, Kagoshima 39→41, Nagasaki 39→40, Nagoya 39→40. Every Japan town now meets its places-to-eat target except Sendai and Takamatsu (39 of 40). Left out: Hasegawa in Nagoya (closed on Maps), a Nagasaki shop whose quote was not on its page, two that earlier rounds had found closed or unmatched. Proof in `docs/library-proof/jp-r7-2026-11-26.json`.
- **27 Nov 2026, Japan round 8**: Sendai 39→42 (Kirin Beer Port's restaurant, two gyutan houses), Takamatsu 39→42 — every Japan town now meets its places-to-eat target. Proof in `docs/library-proof/jp-r8-2026-11-27.json`.
- **27 Nov 2026, Korea round 1**: +47 places to eat — Seoul 47→64 (Gangnam, Sinsa, Jamsil, Yeonnam, Seongsu: most with high chairs or a kids' menu confirmed on the page), Gangwon 31→40 (Sokcho restaurants, Gangneung cafés), Gyeongju 19→25, Incheon 11→17, Suwon 31→36, Jeju 35→37, Jeonju 33→35. Korea notes: VisitKorea and the cities' tourism pages count as official; mom-mom.net place pages carry their own update date; no national franchises, bars or no-kids-zone places. Every place was opened on Google Maps on 27 Nov 2026 (nine closed, among them two Gyeongju cafés, a Busan Lego café and two Jeju tangerine cafés for now; about 20 more matched another business). Earlier Korea passes used Kakao Map, where reviews are fuller. Proof in `docs/library-proof/kr-1-2026-11-27.json`.
- **27 Nov 2026, Korea round 2**: +27 places to eat — Gyeongju 25→36 (ssambap, bulgogi and milmyeon by Bomun and Bulguksa, chalbori-bread bakeries, cafés), Incheon 17→28 (Chinatown jajangmyeon, Wolmido and Songdo cafés, Bupyeong), Jeju 37→39, Seoul 64→66, Suwon 36→37. Left out: Lee Nam Jang in Myeongdong (closed on Maps), chains (Sega & Cook, Manokamana, Casa de Taco), a bar, places already listed, eleven Maps could not match. Proof in `docs/library-proof/kr-2-2026-11-27.json`.
- **27 Nov 2026, Korea round 3**: +20 places to eat — Incheon 28→37 (Songdo and Yeongjong: a naengmyeon house, a kids' café with food, a garden café, Inspire's food village), Seoul 66→71 (two hotel buffets, a chicken house, a drivers' canteen), Jeonju 35→38, Jeju 39→42. Suwon and Gyeongju found nothing on a dated page this round. Left out: FA Jeonju (closed on Maps), two animal cafés, a kids'-café chain, a hotel's basement café, food-court shops Maps does not list. Proof in `docs/library-proof/kr-3-2026-11-27.json`.
- **27 Nov 2026, Thailand round 1**: +50 places to eat — Chiang Mai 17→30 (cafés with play areas from a 2026 family guide: a creek, lambs to feed, soft play, a sandpit), Bangkok 33→44 (four kids' cafés from The Standard, March 2026, and family restaurants from Grab's 2025 list), Rayong 15→24 (Mae Ramphueng beach and Ban Phe seafood, hor mok before the Samet ferry), Loei 12→20 (Loei town and Chiang Khan), Ubon 15→23, Pattaya 22→23. Left out: four closed on Maps, a Koh Lipe list made from Google review counts, two animal cafés, two chains, two hotel restaurants, a wine restaurant. Koh Chang, Nakhon Si Thammarat, Nan and Ayutthaya found nothing on a dated page (single Wongnai place pages carry no date). Proof in `docs/library-proof/th-1-2026-11-27.json`.
- **28 Nov 2026, Thailand round 2**: +37 places to eat — Phuket 37→51 (Old Town's family kitchens from a November 2026 guide: Hokkien noodles, crab curry, Thai sweets, an Italian place with a playroom), Sukhothai 22→30, Lampang 21→27 (khao soi, egg noodles at Kad Kong Ta, a Chinese-teahouse café), Krabi 29→34, Surat Thani 18→20, Khon Kaen 21→22, Hat Yai 20→21. Left out: two closed on Maps, a Koh Samui list of machine-written review summaries (atly.com), two tasting-menu restaurants, a guesthouse kitchen, three places 30+ km from Sukhothai, three Udon cafés the list said nothing about. Chanthaburi found nothing that could be read as text. Proof in `docs/library-proof/th-2-2026-11-28.json`.
- **28 Nov 2026, Thailand round 3**: +80 places to eat — Bangkok 44→61 (Lat Phrao family restaurants from Grab's 2025 list, Chao Phraya riverside places from Trip.com's 2026 guide, kids' cafés), Nakhon Si Thammarat 10→20, Trat and Koh Chang 17→27, Ayutthaya 15→23 (riverside prawn restaurants from KTC's 2026 guides), Hat Yai and Songkhla 21→28, Korat 21→27, Samui 20→25, Koh Lipe and Pak Bara 17→21, Udon 18→22, Loei 20→23, Khon Kaen, Surat Thani and Pattaya +2 each. Left out: six closed on Maps, about twenty Maps could not pin to one place, trip.com user posts and auto-ranked pages, a beach bar, two chains, rooftop and hotel dining. Nan and Chanthaburi found nothing on a dated page again. Proof in `docs/library-proof/th-3-2026-11-28.json`.
- **28 Nov 2026, Thailand round 5**: +80 places to eat — Chiang Mai 30→41 (Daddy Lion, Nic's Restaurant & Playground, Namthoeng and eight kids' play cafés from cnxlocal's July 2026 guide, with the price per child where the page prints one), Lampang 27→38 (cafés from KTC's July 2026 guide), Pattaya 25→36 (cafés from Wongnai's 2025 list), Rayong 24→33, Khao Kho 27→34, Trat and Koh Chang 27→33, Sukhothai 30→34, Koh Lipe 21→25, Surat Thani 22→26, Mae Hong Son and Pai 30→33, Samui 25→28, Ayutthaya, Khao Yai and Korat +2 each, Hat Yai +1. Left out: seven closed on Maps, a list of names from a card promotion, an automatic ranking page, a Trang list dated 2024, bar-like places, two chains, a resort, places 30+ km out. Ubon, Khon Kaen and Nakhon Si Thammarat found nothing new on a dated page. Proof in `docs/library-proof/th-5-2026-11-28.json`.
- **28 Nov 2026, Vietnam round 1**: +92 places to eat — Saigon 16→37 (broken-rice houses from Vietnam Airlines' September 2026 guide, banh mi shops, Thao Dien and District 7 seafood), Da Nang and Hoi An 26→46 (the city's own Michelin page, mi Quang, banh mi, kids' play cafés, Hoi An cao lau), Hanoi 44→56 (Michelin-listed pho and noodle houses from 2026 lists), Da Lat 21→33 (chicken hotpot, garden cafés), Hue 29→40 (bun bo Hue, banh khoai, royal-set restaurants), Nha Trang 13→22, Phu Quoc 19→26. Pages that carry their date as VinWonders' dd/mm/yyyy or Vietnam Airlines' contentDatePublished were dated by hand. Left out: four closed on Maps, about forty Maps could not pin to one place, chains, a café that is in Da Nang, not Phu Quoc. Proof in `docs/library-proof/vn-1-2026-11-28.json`.
- **28 Nov 2026, Europe round 2**: +77 places to eat — Nice 21→31 (the Riviera board's 2026 family-restaurant list, Vence and Cagnes), York 24→33 (play cafés, the SOPHiE bridge cafés, an ice-cream boat), Ireland 25→34 (Dublin, Malahide and Galway from the Irish Times' August 2025 family list), Sicily 22→30 (Catania granita and pastry, Taormina, Ortigia), Amalfi 26→33 (Ravello, Positano, Atrani, Maiori, Sorrento gelato), Copenhagen 28→35 (bakeries and Visit Copenhagen's family restaurants), Edinburgh 27→33, Venice 36→42 (Murano and Burano too), Brussels 26→31 (play cafés), Milan 37→42, Strasbourg 22→26 (three winstubs, one in Colmar), the Lake District 21→22. Left out: seventeen marked closed on Maps (three Brussels cafés from a March 2025 guide closed for good), chains, bars and a hotel restaurant, three Munich rows on a 2022 city page, a holiday-rental blog's Catania rows. Proof in `docs/library-proof/eu-2-2026-11-28.json`.
- **28 Nov 2026, Europe round 3**: +54 places to eat — Stockholm 39→53 (fika cafés from Visit Stockholm's 2026 guide, an ice-cream shop), the Dolomites 20→31 (Cortina's mountain huts, pizzerias and pastry shops, Ütia Cherz in Alta Badia), Amsterdam 43→52 (play cafés and family restaurants from I amsterdam and Dutch family guides), Mont-Saint-Michel 22→30 (crêperies in the bay, Saint-Malo and Cancale), Madrid 43→48 (esmadrid.com's family restaurants and ice cream), the Disneyland Paris area 33→38 (restaurants inside the parks), Florence 50→52. Left out: twelve Florence rows from two affiliate sites, eight marked closed on Maps, three Madrid addresses where another business trades now, chains and a wine bar. Proof in `docs/library-proof/eu-3-2026-11-28.json`.
- **28 Nov 2026, Europe round 4**: +62 places to eat — Heidelberg 17→26 (the city's own *Viel mehr Heidelberg* directory: cafés with play corners, ice cream, a wholegrain bakery), Hamburg 25→33 (hamburg.de and the tourism board: family restaurants, ice-cream parlours, the fish-market hall), Barcelona 34→42 (a June 2026 guide to restaurants for children — the first Barcelona rows since round 1), Berlin 60→67 (Kindercafés), Bruges 18→25 (Visit Bruges' child-friendly cafés and waffle places), Rome 62→69 (turismoroma.it pizzerias), Cologne 23→27 (cafés and two family beer gardens), Munich 36→40, Chamonix and Annecy 18→22, Paris 51→54, the Cotswolds 28→29. Les Fils à Maman (Aix, round 1) taken out: a franchise chain. Left out: eleven marked closed on Maps (three Paris, Barcelona and Cologne cafés for good), chains, two hotel restaurants. Proof in `docs/library-proof/eu-4-2026-11-28.json`.
- **28 Nov 2026, Europe round 1**: +90 places to eat — Provence 16→28 (Avignon, Aix, Arles and Luberon family restaurants from the region's tourism pages and Gault&Millau), the Cotswolds 16→28 (tearooms and cafés in Bourton, Stow, Burford and Broadway), Lyon 19→30 (play-corner cafés, family bistros, three ice-cream makers), Cologne 13→23 (parent-and-child cafés, two Brauhäuser with children's menus), Hamburg 16→25 (Franzbrötchen bakeries, harbour fish restaurants and stands), Seville 18→25 (churros and ice cream), London 59→66 (from Time Out's 2026 child-friendly list), Rothenburg 15→20, Cinque Terre 13→18, Paris 47→51, Chamonix and Annecy 15→18, Bruges, Neuschwanstein and Füssen, Heidelberg. Left out: twelve marked closed on Maps (most for winter: five in Cinque Terre, four ice-cream shops), the heidelberg24.de lists (ranked from Google reviews), an undated Chamonix restaurant list, bars and drinking pubs, hotel restaurants, about twenty-four Maps could not pin to one place. Proof in `docs/library-proof/eu-1-2026-11-28.json`.
- **26 Nov 2026, Hangzhou, round 20**: +7 from Amap place pages (Gongshu, Binjiang). Proof in `docs/library-proof/cn-hangzhou.json`.
- **26 Nov 2026, Harbin, round 19**: +5 from Amap place pages. Proof in `docs/library-proof/cn-harbin.json`.
- **26 Nov 2026, Chongqing, round 18**: +9 from Amap place pages (Yuzhong, Nan'an). Proof in `docs/library-proof/cn-chongqing.json`.

- **26 Nov 2026, Yunnan, round 27**: +1 from an Amap place page (Kunming). Proof in `docs/library-proof/cn-yunnan.json`.
- **26 Nov 2026, Chengdu, round 26**: +1 from an Amap place page. Proof in `docs/library-proof/cn-chengdu.json`.
- **26 Nov 2026, Guangzhou, round 25**: +4 from Amap place pages (Panyu). Proof in `docs/library-proof/cn-guangzhou.json`.
- **26 Nov 2026, Beijing, round 23**: +4 from Amap place pages (Fengtai). Proof in `docs/library-proof/cn-beijing.json`.
- **26 Nov 2026, Shanghai, round 22**: +7 from Amap place pages (Pudong, Minhang). Proof in `docs/library-proof/cn-shanghai.json`.
- **26 Nov 2026, Shenzhen, round 21**: +3 from Amap place pages (Bao'an, Longgang). Proof in `docs/library-proof/cn-shenzhen.json`.

- **26 Nov 2026, Guangzhou, round 31**: +5 from Amap place pages (Liwan). Proof in `docs/library-proof/cn-guangzhou.json`.
- **26 Nov 2026, Harbin, round 30**: +6 from Amap place pages (Nangang). Proof in `docs/library-proof/cn-harbin.json`.
- **26 Nov 2026, Hangzhou, round 29**: +4 from Amap place pages (Xiaoshan). Proof in `docs/library-proof/cn-hangzhou.json`.
- **26 Nov 2026, Shanghai, round 28**: +2 from Amap place pages (Changning). Proof in `docs/library-proof/cn-shanghai.json`.

- **26 Nov 2026, Shenzhen, round 32**: +5 from Amap place pages (Nanshan, Shekou). Proof in `docs/library-proof/cn-shenzhen.json`.

- **26 Nov 2026, Yunnan, round 38**: +4 from Amap place pages (Kunming, Xishan). Proof in `docs/library-proof/cn-yunnan.json`.
- **26 Nov 2026, Shanghai, round 37**: +4 from Amap place pages (Xuhui). Proof in `docs/library-proof/cn-shanghai.json`.

- **26 Nov 2026, Zhangjiajie, round 40**: +6 from Amap place pages (Yongding, near Tianmen Mountain). Proof in `docs/library-proof/cn-zhangjiajie.json`.
- **26 Nov 2026, Guilin, round 39**: +11 from Amap place pages (city, Yangshuo, rice noodles); this round also takes places with 15–30 reviews that meet the owner's rule. Proof in `docs/library-proof/cn-guilin.json`.

- **26 Nov 2026, Chongqing, round 41**: +3 from Amap place pages (Jiefangbei). Proof in `docs/library-proof/cn-chongqing.json`.

- **27 Nov 2026, Chengdu, round 43**: +2 from Amap place pages (Wuhou). Proof in `docs/library-proof/cn-chengdu.json`.

- **27 Nov 2026, Macau, round 44**: +13 from the resorts' own dining pages (The Londoner, Studio City, City of Dreams, Galaxy), each checked on Google Maps (not closed, a review in the last six months). Proof in `docs/library-proof/mo-macau.json`.
### Hong Kong towards 300–400 places, 27 Nov 2026
Owner: "ฮ่องกงมีร้านอาหารเยอะมาก อยากให้มีร้านอาหารแนว hidden gem และ local guide ด้วย ควรมีประมาณ 300-400 ร้าน" and "พอเสร็จแล้วเช็คกับ
google map และ open rice อีกที". Hong Kong may now hold up to 420 places (`MAX_TOWN` in `scripts/eats-lint.mjs`; every other town stays at
80). In the app the town page groups a town's places by the district before any brackets ("Central (IFC Mall)" → Central) and shows the
bracket part on the card, and "near tonight's bed" puts the places in the district the stay's address names first. Each place is read from a
dated page in the owner's Chrome (Little Steps Asia's family list updated 15 Oct 2026, the MICHELIN Guide's 2026 Hong Kong selection), then
checked on Google Maps (not marked closed, a review in the last six months, the same name) and on OpenRice (listed, not Closed Down or
Relocated); a price is OpenRice's band per person where it showed one. Proof in `docs/library-proof/hk-hongkong.json` (round 2 on).
- **Round 2**: +19 (Falcone IFC, Pecorino, The Grill at Grand Hyatt, One Small Step, Origami Kids Cafe, Fiata, Mr Wolf, Shiro Pacific
  Place, Madame Fù, Rajasthan Rifles, BaseHall, Burger Circus, Zuma, Pondside, The Cheesecake Factory, Hutong, Dockyard, Kau Kee, Tsim Chai
  Kee). Six places on the 2026 family list are marked permanently closed on Maps (Chiikawa Ramen Buta, Mr. Tree, Baked at The Pulse, Turtle
  by the Sea, Cafe Roma, Groundswell) and were left out with the rest named in the proof. OpenRice shows a slide puzzle after a run of
  searches, so the next rounds go a few dozen places at a time.
- **Round 3**: +50. Seven more from the family list (Treasure Island Beach Club, Pane e Latte, Cococabana, Classified, Amalfitana, Nonna,
  Little Cove Espresso), checked on both maps, and 43 of the MICHELIN Guide 2026's Bib Gourmand on the island and in Kowloon (Uncle Quek,
  Sister Wah, Mak Man Kee, Ah Chun Shandong Dumpling…). OpenRice now puts up its slide puzzle after every
  search, so the owner chose (27 Nov 2026) Google Maps and the MICHELIN Guide 2026 — re-inspected every year — as the two checks for places
  in the guide; every other place still needs OpenRice (Little Mario's, One-ThirtyOne, Lantana and Oolaa wait for it). The proof says which
  check each place had.
- **Round 4**: +50 from the MICHELIN Guide 2026: the rest of the Bib Gourmand in Kowloon and the New Territories (Kung Wo Beancurd
  Factory, Lau Sum Kee, Yue Kee, Tai Wing Wah…), the street-food stalls and sweet shops (Hop Yik Tai, Man Kee Cart Noodles, Mrs. Fong,
  Hung Hom Pancake, So Kee, Owl's…) and the island's casual picks (Luk Yu Tea House, Ho Lee Fook, Kam's Roast Goose…). Each checked on
  Google Maps; Temple Street Beef Offal left out (another name at its address). Hong Kong now holds 165.
- **Round 5**: +62. The MICHELIN Guide 2026's other Hong Kong picks that take an à la carte order (Lung King Heen, Man Wah, T'ang Court,
  Spring Moon, Chesa, Yè Shanghai, Jardin de Jade, Liu Yuan Pavilion, Kam's Roast Goose, Yardbird…), and four from the family list
  (Little Mario's on Ma Wan, One-ThirtyOne, Lantana, Oolaa Central). The owner then asked (27 Nov 2026): "Use Google Maps only, skip
  OpenRice" — from this round every place is checked on Google Maps alone, and the proof says so. Hansik Goo left out (newest review 8 months
  ago). Hong Kong now holds 227.
- **Round 6**: +46 from Little Steps Asia's current guides — dim sum (June 2025), playrooms (Aug 2026), pizza (May 2026), beach (Aug
  2026), Kai Tak (Oct 2026), alfresco (Oct 2026): Lin Heung Tea House, LockCha, Sun Hing, Dragon-i, Frites Quarry Bay, Q Time Cafe, Vincenzo
  Capuano, Pocofino, Peak Pizza, BRKLYN, Motorino Wan Chai, Ming Kee on Po Toi, Yau Ley on High Island, Concerto Inn, the Kai Tak malls'
  restaurants, Shiro Central, Portico at Spiga… Google Maps only. Closed although still listed: Dim Sum Icon, Mr Tree (Causeway Bay),
  Jacomax. Hong Kong now holds 273.

- **27 Nov 2026, Macau, round 45**: Macau may hold up to 100 (owner: "Macau can have more than 40 to 100"); +12 from The Venetian's and The Londoner's own restaurant pages, each checked on Google Maps. Proof in `docs/library-proof/mo-macau.json`.
- **27 Nov 2026, Macau, round 46**: +19 from The Parisian's and Galaxy Macau's own restaurant pages (with Broadway Macau's food street of Macau favourites), each checked on Google Maps. Proof in `docs/library-proof/mo-macau.json`.
- **Round 7**: +46. Eighteen local spots from Discover Hong Kong's food pages (the cha chaan teng, dai pai dong, Temple Street, street
  food and dim sum pages — the tourism board's pages carry no date; read 27 Nov 2026 while the site links the MICHELIN Guide 2026): Cheung
  Hing Coffee Shop, the Haiphong Road and Woosung Street cooked-food bazaars, Bing Kee Cha Dong, So Kee and Sing Kee dai pai dongs, Dim Sum
  Here, Hing Kee claypot rice, Foodtrip Bedañas, Manakamana, My Kitchen Tibetan, Kung Lee sugar cane, Tung Tat, Mott 32, Le Petit Chef…
  And 28 of Little Steps Asia's 2026 openings (Lola María, Stübli, Dan Ryan's Causeway Bay, NOOK@The Peak, Tienmo, Food Atlas, Terrace
  Boulud…). Google Maps only; nine left out (not found, only the building on the map, or bars). Hong Kong now holds 319 — the owner's
  300–400. Sources not used: Little Steps' breakfast, kids-eat-free, vegetarian and airport guides (last updated 2023–2024).
- **Round 8**: +31 from more of Little Steps Asia's current guides — budget lunches in Central (Sept 2026: NOOD Food, Tommy Yummy, Priyo
  Shaad, One Dim Sum, The Monogamous Chinese under the escalator, Central Market…), kids' menus and unique family meals (Tung Po Kitchen,
  Nadaman, Aqua), frozen yoghurt (Myka, Law of Yogurt, Yo Mama, Smile, Noon, Drool…), teppanyaki (Benkei, Teppanroom, Matsubishi, IM
  Teppanyaki) and Sai Kung (Dec 2025: Sing Kee Seafood, Jaspas, Thai Dao, Zeugma, Honeymoon Dessert, Camden Town…). Google Maps only.
  Nine places in these guides are closed on Maps (Walt's Café temporarily; Yoajung, More Yogurt, Cali-Mex and five in Sai Kung for good).
  Hong Kong now holds 350.

- **27 Nov 2026, Macau, rounds 47–48**: +30 to reach 100, from the own restaurant pages of City of Dreams, Wynn Palace and Wynn Macau, MGM Macau, the Venetian food court, Galaxy and Broadway Macau, Studio City, the Londoner, the Parisian and Macau Tower, each checked on Google Maps. Proof in `docs/library-proof/mo-macau.json`.
- **Round 9**: +23 from Discover Hong Kong's food pages (official, undated, read 2026-11-27): Tai Kwun (Café Claudel, The Chinese
  Library), desserts (Nun, Fleur, Via Tokyo, Messina at the Peak), Kai Tak (Food Gala, Gyu-Kaku J, Ha Noi, Bellavista, Yonna Yonna),
  buffets (The Food Gallery, Jashan, The Grand Buffet), cheese (The Swiss Chalet, Terroirs by LQV, ROUCOU) and special meals (The
  Verandah, Louise, Popinjays, Lobster Bar & Grill, L'Atelier de Joël Robuchon, Wing). Google Maps only. Eight left out: Jing closed for
  good, The Dutch's newest review two years old, six with no matching place on Maps. Hong Kong now holds 373.
- **Round 10**: +27 from more Discover Hong Kong pages (official, undated, read 2026-11-27): celebrations (VEA, Grissini, TATE,
  Tosca di Angelo, Felix), family dining (Divino Patio's pizza making), Michelin for every budget (Amber, Mora, 8½ Otto e Mezzo), the
  traditional desserts (Luk Lam, Chiu Chow Hop Shing), the chefs' own picks (Stone Coffee, Sai Kung Cafe & Bakery, Stellar House, Kong
  Chai Kee, ABC Kitchen, Caprice), romantic meals (La Taverna, Casa Lisboa, Francis West, Embla, Hugo's, Angelini, La Rambla, Paper
  Moon, Petrus) and Hay Market at Sha Tin Racecourse. Google Maps only. Left out: Pak Loh (newest review a year old), Auntie ĀYI and
  Genso/Keiba (no matching place), Sushi Saito (the map's address did not match), a cruise and a show, two chains. Hong Kong now holds
  400.

### Macau towards 200 places, 27 Nov 2026
The owner raised Macau's limit from 100 to 200 ("Raise to 200"). Rows come from dated pages read in the owner's Chrome and are checked
on Google Maps only (not closed, a review in the last six months, the name matching); OpenRice is skipped at the owner's request.
- **Round 1**: +47 from the MICHELIN Guide Hong Kong Macau 2026 — every Macau restaurant of the selection not yet in the list: old-town
  noodle, congee, rice-roll and dessert shops (Lok Kei, Ngao Kei Ka Lei Chon, Lun Kee, Ving Kei, Yi Shun, Kika), Taipa (Manuel, O Castiço,
  Litoral, Kapok, Unique, Fong Kei, Mok Yee Kei), the UTM training restaurant's Macanese menu, and the resorts' Cantonese, Japanese and
  European rooms. Left out: The Kitchen, 002 Mohinga, Ng Teng Kei, Chan Seng Kei and Mizumi (no recent review), Don Alfonso 1890 (Maps
  shows another name). Macau now holds 147. Proof in `docs/library-proof/mo-macau.json`.
- **Round 2**: +31 from Time Out (the Macau "off the eaten path" guide of 2020, and Time Out Hong Kong's cha chaan teng and street-food guides
  updated September 2026) and Little Steps Asia (family-friendly 2023, brunches 2025, hotel breakfasts 2026). The owner allowed older
  guides for the place and its facts; each place is kept only with a Google Maps review from the last six months and a matching name and
  address. Old-town cafés, bakeries and dessert shops (Nam Peng, Ma Hing Hong, Chion Chau, Jim Sai, Hang Heong Un, Sei Kee), Clube Militar,
  Coloane's pier noodles and La Gondola, Taipa's La Famiglia and Cafe Neptune, and the hotels' breakfast rooms. Seven places in these
  guides are closed for good on Maps, one temporarily. Macau now holds 178.
- **Round 3**: +16 from Time Out (Macau cafés 2025–2026, dessert spots 2024, signature dishes 2023, Quarter Square's page) and Tatler
  Asia (Macanese and iconic local restaurants 2023, the Guincho a Galera and Tapas de Portugal pages): António, Riquexó, Chan Kong Kei,
  Seng Cheong, One Brother Food's crab congee, Henri's Galley, Lai Kei Sorvetes and Cocos Hung Heng's ice cream, five cafés. Same rule
  as round 2. Tou Tou Koi is closed for good on Maps although Time Out's page still lists it. Macau now holds 194; the readable guides
  are used up, so the last six of the 200 limit stay open for later.

- **27 Nov 2026, Macau, round 50**: +6 to reach 200 (Fat Siu Lau, Cozinha Pinocchio, Miramar, Brown & Friends at Lisboeta, Chinese Cafe Imprint, Shanghai 4.5.6), from the Macao Government Tourism Office's award register and Trip.com's November 2026 list, each checked on Google Maps; more confirmed places are named in the proof for a later swap. Proof in `docs/library-proof/mo-macau.json`.
