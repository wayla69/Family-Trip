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

### id-bali — Bali (Indonesia)
Area covered: Bali (also known as / includes: bali, ubud, kuta, seminyak, uluwatu, nusa dua)

Now in the app: 36 places to eat, 33 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Bebek Bengil; Warung Babi Guling Ibu Oka 3; Naughty Nuri's Warung Ubud; Bebek Tepi Sawah; Nasi Ayam Kedewatan Ibu Mangku; Made's Warung Seminyak; Menega Cafe; Warung Mak Beng; Massimo Italian Restaurant; Pasar Malam Sindhu; Gianyar Night Market; Eat & Eat Beachwalk; Gelato Secrets; Tukies Coconut Shop; Revolver Espresso; Bali Buda; Milk & Madu; Parklife; Lacalita; Roomah; TYGR Sushi; MILU by NOOK; Biku; Sea Circus; Mano Beach House; Clear Cafe; Taco Casa; Genius Cafe; Byrd House Bali; Naughty Nuri's Sanur; Prego; WAHAHA; The Cashew Tree; Sundara (Four Seasons Jimbaran Bay); Jamie Oliver Kitchen (Kuta Beach); Splash Bistro (Hard Rock Hotel)

Already in the app — things to do: Waterbom Bali; Bali Bird Park; Sacred Monkey Forest Sanctuary / Mandala Suci Wenara Wana; Tegallalang Rice Terraces; Tanah Lot / Pura Tanah Lot; Turtle Conservation and Education Center / TCEC Serangan; Uluwatu Temple and Kecak dance / Pura Luhur Uluwatu; Sindhu Night Market / Pasar Malam Sindhu; Campuhan Ridge Walk; Tegenungan Waterfall / Air Terjun Tegenungan; Ubud Art Market / Pasar Seni Ubud; Legong dance at Ubud Palace / Puri Saren Ubud; Sanur beach path; ICON Bali mall; Trans Studio Bali; Mai Main Playground Canggu; AeroXSpace Adventure; Clip 'n Climb Bali; KidzCafe Sanur; Kids SoHo Playground; Biosphere Playhouse; Nusa Dua Beach; Sanur Beach; The Blanco Renaissance Museum; Bali Ice Skating Arena; Kuta Market; Sukawati Art Market; Bali Zoo; Bali Safari Park (Taman Safari Bali); Alas Harum; Mason Adventures rafting (Ayung River); Bali International Archery; Berawa Art House

### us-newyork — New York (United States)
Area covered: New York (also known as / includes: new york, manhattan, brooklyn, times square, central park, statue of liberty)

Now in the app: 39 places to eat, 29 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Katz's Delicatessen; Joe's Shanghai; John's of Bleecker Street; Carmine's Times Square; Ellen's Stardust Diner; Junior's Restaurant; Grimaldi's Pizzeria; Nom Wah Tea Parlor; Shake Shack Madison Square Park; Chelsea Market; Time Out Market New York; Joe's Pizza; Levain Bakery; Magnolia Bakery; Serendipity 3; Fini Pizza at Pier 5; Brado; Dellarocco’s; Roberta’s at Domino Park; Juliana’s; Di Fara Pizza; Saraghina Restaurant; Peter Pan Donut and Pastry Shop; Brooklyn Crab; Bubby’s; Tom's Restaurant; Barking Dog; Cowgirl; Brooklyn Farmacy & Soda Fountain; Super Action Burger; Chez Nick; Pig Beach (Queens); Montague Diner; Al Badawi; Noodle Pudding; River Deli; Vineapple; Grand Canyon Restaurant; Dino

Already in the app — things to do: Central Park Zoo; Bronx Zoo; American Museum of Natural History; Children's Museum of Manhattan; New York Aquarium; Statue of Liberty and Ellis Island; Staten Island Ferry; Intrepid Museum; Top of the Rock; New York Hall of Science; New York Transit Museum; Brooklyn Bridge Park and Jane's Carousel; Winter Village at Bryant Park; Chelsea Market; The High Line; Central Park and Heckscher Playground; Brooklyn Children's Museum; Queens Zoo; Prospect Park Zoo; The Staten Island Zoo; Hammock Grove Play Area; NYC Ferry; Kids 'N Shape (Howard Beach); Kids Fun House; Kidz Fun Palace; Hapik Climbing Gym (Brooklyn); 81st Street Studio (The Met); Good Day Play Café; National Museum of Mathematics (MoMath)

### jp-okinawa — Okinawa (Japan)
Area covered: Okinawa (also known as / includes: okinawa, naha, churaumi, kouri, motobu, chatan)

Now in the app: 40 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Jack's Steak House / ジャッキーステーキハウス; Steak House 88 Tsuji Honten / ステーキハウス88 辻本店; Sam's Sailor Inn Kokusai-dori / サムズセーラーイン 国際通り店; Shuri Soba / 首里そば; Kishimoto Shokudo / きしもと食堂; Ufuya / 百年古家 大家; Pizza in the Sky Kajinho / ピザ喫茶 花人逢; Cafe Kurukuma / カフェくるくま; Makishi Public Market / 第一牧志公設市場; King Tacos Kin Honten / キングタコス 金武本店; A&W Makiminato / A&W 牧港店; Umikaji Terrace / 瀬長島ウミカジテラス; Blue Seal Makiminato Honten / ブルーシール 牧港本店; Hamabe no Chaya / 浜辺の茶屋; Okashigoten Onna / 御菓子御殿 恩納店; CAFE Soylabo; Ryukyo Ama Sans Souci; Hawaiian Pancake House Panilani; Taco Rice Cafe Kijimunaa; The Caliph Kitchen Okinawa; GOOD DAY COFFEE; Subtropical Tea House; Dohana Dohana; Two Dots Cafe; Café Kokuu; Banta Cafe; 2 Adan (Makishi Public Market); Okinawa Cuisine Manza Table; Uminchu Cuisine Kamenu-hama; Pork Tamago Onigiri Makishi Market Store; Ocean Blue; Inoh; SUGAR BROTHERS; Beachy Okinawa; EAS Okinawa Toyosaki Store; Mikado; Piparchi Kitchen; Gaishokuya Kujira; Asian Shokudo Shirokuma; Ishigama Pizza Sakaba Maruki

Already in the app — things to do: Okinawa Churaumi Aquarium / 沖縄美ら海水族館; Ocean Expo Park and Emerald Beach / 海洋博公園; DMM Kariyushi Aquarium / DMMかりゆし水族館; Okinawa Zoo and Museum / 沖縄こどもの国; Okinawa World and Gyokusendo Cave / おきなわワールド 玉泉洞; Shurijo Castle Park / 首里城公園; Busena Marine Park / ブセナ海中公園; Neo Park Okinawa / ネオパークオキナワ; Okinawa Fruits Land / OKINAWAフルーツらんど; Kouri Island and Kouri Beach / 古宇利島; Araha Beach / アラハビーチ; Mihama American Village / 美浜アメリカンビレッジ; Makishi Public Market / 第一牧志公設市場; Naminoue Beach / 波の上ビーチ; Okinawa Prefectural Museum / 沖縄県立博物館・美術館; Cape Manzamo / 万座毛; JUNGLIA Okinawa / ジャングリア沖縄; Bios no Oka / ビオスの丘; Nago Pineapple Park / ナゴパイナップルパーク; Ryukyu Mura / 琉球村; Unko Museum OKINAWA; Shuri Ryusen; Southeast Botanical Gardens; Sunset Beach; Onna no Eki Nakayukui Market; Blue Seal Ice Park; Murasaki Mura (Experience Kingdom)

### nz-rotorua — Rotorua, Taupō and Waitomo (New Zealand)
Area covered: Rotorua, Taupō and Waitomo (also known as / includes: rotorua, waitomo, taupo, tongariro)

Now in the app: 33 places to eat, 34 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Fat Dog Cafe; Capers Café + Store; Stratosfare Restaurant; Atticus Finch; Pig & Whistle Historic Pub; Dixie Browns; Huka Prawn Park Restaurant; HUHU Cafe; Eat Streat; Rotorua Night Market; McDonald's Taupō; Waitomo General Store; Lady Jane's Ice Cream Parlour; Replete Cafe & Store; L'Arté Café & Gallery; The Regent Room; Eastwood Café; Parc; Okere Falls Store; Smith & Co; The Mains at On The Point; Pātaka Kai Restaurant & Bar; Hiakai Café; Te Rourou Café; Lime Café; Eighty Six; Mr Wolf; Patrick’s Boutique Bakery; Black Label Barbecue; Charlie’s Café at Chipmunks Playland; Lone Star Rotorua; River’s Catch; Scope Rotorua

Already in the app — things to do: Skyline Rotorua gondola and luge; Whakarewarewa Living Maori Village; Te Puia Marama Geyser Light Trail; Redwoods Treewalk; Wonderworld Rotorua; Polynesian Spa family pools; Kuirau Park; Wai-O-Tapu Thermal Wonderland; Huka Falls walk from Taupō; Huka Prawn Park; Waitomo Glowworm Caves; Agrodome Farm Experience; Hell's Gate Geothermal Walk; Buried Village of Te Wairoa; Paradise Valley Springs Wildlife Park; Velocity Valley; Waimangu Volcanic Valley; Kiwi Conservation Centre; Redwoods Nightlights; Motion Entertainment; Tarawera Falls; Tarawera Trail; Te Rātā Bay / Hot Water Beach; Rotorua Duck Tours; Katoa Lake Rotorua Jet; Volcanic Air floatplane; Lake Tikitapu (the Blue Lake); Taupō DeBretts Hot Pools; Huka Honey Hive; AC Baths; Taupō Museum and Art Gallery; Mind Junction; Aratiatia Rapids; Starlight Cinema
