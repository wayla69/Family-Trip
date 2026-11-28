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

### th-chiangmai — Chiang Mai and Chiang Rai (Thailand)
Area covered: Chiang Mai and Chiang Rai (also known as / includes: chiang mai, chiang rai, doi suthep, doi inthanon)

Already in the app — places to eat: Khao Soi Khun Yai / ข้าวซอยคุณยาย; Khao Soi Mae Sai / ข้าวซอยแม่สาย; Khao Soi Lam Duan Fa Ham / ข้าวซอยลำดวนฟ้าฮ่าม; Huen Phen / เฮือนเพ็ญ; Tong Tem Toh / ต๋องเต็มโต๊ะ; SP Chicken / เอสพี ไก่ย่าง; Huen Muan Jai / เฮือนม่วนใจ๋; Ginger Farm Kitchen; Lu Lam / หลู้ลำ; Khao Soi Pho Jai / ข้าวซอยพอใจ; Khao Kha Moo Chang Phueak / ข้าวขาหมูช้างเผือก; Warorot Market / กาดหลวง (ตลาดวโรรส); Chiang Rai Night Bazaar / เชียงรายไนท์บาซาร์; Fern Forest Cafe; Cheevit Cheeva / ชีวิต ชีวา; Chivit Thamma Da / ชีวิตธรรมดา

Already in the app — things to do: Chiang Mai Zoo; Chiang Mai Night Safari; Wat Phra That Doi Suthep; Royal Park Rajapruek; Bua Tong Sticky Waterfall; Sunday Walking Street; Warorot Market; Elephant Nature Park; Chiang Mai City Arts and Cultural Centre; Nong Buak Haad Public Park; Wat Chedi Luang; Huay Tung Tao Lake; Queen Sirikit Botanic Garden; Baan Kang Wat; Mon Cham; Pai Canyon (Kong Lan); Pai Walking Street; Sai Ngam hot spring; Boon Ko Ku So bamboo bridge; Lanna Folklife Museum; Chiang Mai National Museum; Art in Paradise Chiang Mai; Grand Canyon Water Park / แกรนด์แคนยอน วอเตอร์ปาร์ค; Ban Dam Museum / พิพิธภัณฑ์บ้านดำ

### th-bangkok — Bangkok (Thailand)
Area covered: Bangkok (also known as / includes: bangkok, suvarnabhumi, don mueang, damnoen saduak, amphawa)

Already in the app — places to eat: Thipsamai Pad Thai (Pratu Phi) / ทิพย์สมัย ผัดไทยประตูผี; Krua Apsorn (Dinso Road) / ครัวอัปษร; Somboon Seafood (Surawong) / สมบูรณ์โภชนา สาขาสุรวงศ์; Go-Ang Kaomunkai Pratunam / โกอ่างข้าวมันไก่ประตูน้ำ; Polo Fried Chicken / ไก่ทอดเจ๊กี (โปโล); Wattana Panich / วัฒนาพานิช; Som Tam Nua (Siam Square) / ส้มตำนัว สยามสแควร์; Savoey Tha Maharaj / เสวย ท่ามหาราช; Baan Khanitha & Gallery (Sathorn) / บ้านขนิษฐา สาทร; Supanniga Eating Room Tha Tien / สุพรรณิการ์ อีทติ้ง รูม ท่าเตียน; Pier 21 Food Terminal / เพียร์ 21 เทอร์มินอล 21 อโศก; Or Tor Kor Market / ตลาด อ.ต.ก.; Eathai / อีทไทย เซ็นทรัล เอ็มบาสซี; After You Dessert Cafe (Siam Paragon) / อาฟเตอร์ ยู สยามพารากอน; Mont Nomsod (Dinso Road) / มนต์นมสด เสาชิงช้า; Kor Panich / ก.พานิช; The Deck Bangkok; Baan Ying Cafe and Meal / บ้านหญิง; Cabbages and Condoms; theCOMMONS Thonglor; Helix Dining at EmQuartier; Patom Organic Living / ปฐม ออร์แกนิก ลิฟวิ่ง; Genius Kids Cafe; BABYCCINO & Co.; Mozza by Cocotte; BHC Chicken; Underhound; Benihana

Already in the app — things to do: SEA LIFE Bangkok Ocean World; Children's Discovery Museum; Lumphini Park; Benjakitti Forest Park; Museum Siam; Wat Pho; Grand Palace and Wat Phra Kaew; Chao Phraya Tourist Boat; Mahanakhon SkyWalk; Dream World; Siam Amazing Park; Chatuchak Weekend Market; ICONSIAM and SookSiam; Bangkok Art and Culture Centre; Yaowarat (Chinatown); Safari World; MEGA HarborLand, One Bangkok; MEGA HarborLand, ICONSIAM; HarborLand, Gateway Ekamai; Mega HarborLand, Seacon Bangkae; Funarium; BOUNCE, EmQuartier; MELAND, Siam Paragon; Kidzooona, Gateway Ekamai; Playville; Playmondo, CentralWorld; Playerbox, Siam Discovery; Yoyoland, Seacon Square; Mari Go Round Premium Kids Cafe; Kidzilla; WOW Park, Gateway Ekamai; Science Centre for Education; Siam Serpentarium; Wonder Woods Kids Cafe; Children's Discovery Museum II, Thung Khru; Bang Kachao; Bang Nam Phueng Floating Market; Ancient City; Bangkok Butterfly Garden and Insectarium

### th-phuket — Phuket and Phang Nga Bay (Thailand)
Area covered: Phuket and Phang Nga Bay (also known as / includes: phuket, patong, kata, karon, phang nga, khao lak)

Already in the app — places to eat: Raya Restaurant / ระย้า; One Chun Cafe & Restaurant / วันจันทร์; Tu Kab Khao / ตู้กับข้าว; Mor Mu Dong / หมอมูดง; Kan Eang@Pier / กันเอง แอท เพียร์; Laem Hin Seafood / แหลมหินซีฟู้ด; Mee Ton Poe / หมี่ต้นโพธิ์; Kopitiam by Wilai / โกปี้เตี่ยม บาย วิไล; Samchong Seafood / สามช่องซีฟู้ด; Banzaan Fresh Market / ตลาดบันซ้าน; Lard Yai Sunday Walking Street / หลาดใหญ่ ถนนคนเดินภูเก็ต; Torry's Ice Cream; Campus Coffee Roasters; A Pong Mae Sunee / อาโป๊งแม่สุณี; Lemonade Club Phuket; BIRDS Restaurant; Cookies Cafe; Coconut Garden; 333 At The Beach; Charoen Restaurant; Ohlala Restaurant; Casa Boho; Kamala Night Market; Lock Tien; Phuket Weekend Market (Naka Market); Flying Lizard Restaurant and Family Club; Gagarin Chaihana Restaurant; Butterfly Restaurant; Nikita's; Home Grain; Poached; View Cafe; Ah Hong Seafood; Soul; Kata Night Market

Already in the app — things to do: Phuket Aquarium; Aquaria Phuket; Trickeye Museum Phuket; Andamanda Phuket; Phuket Elephant Sanctuary; Naka Weekend Market; Lard Yai Sunday Walking Street; Phuket Thai Hua Museum; Promthep Cape; Big Buddha; Khao Rang Viewpoint; Nai Harn Beach and Lake; Kata Beach; Gibbon Rehabilitation Project; Dino Park Mini Golf; Phang Nga Bay and James Bond Island / อุทยานแห่งชาติอ่าวพังงา; Rawai Seafood Market; Saphan Hin Park; Phuket Bird Park; Blue Tree Waterpark Phuket; Coral Island; Phuket Wake Park; Carnival Magic; Kamala Beach; Mai Khao Beach; Jungle Xtrem; Formula Fun Indoor Go-Karts; Rebel Rock Climbing; Oto Play Park; Rawai Park

### th-pattaya — Pattaya and the Chonburi coast (Thailand)
Area covered: Pattaya and the Chonburi coast (also known as / includes: pattaya, koh larn, jomtien, sattahip, bang saen, si racha)

Already in the app — places to eat: Mum Aroi (Naklua) / มุมอร่อย นาเกลือ; Pupen Seafood / ปูเป็น ซีฟู้ด; The Glass House; Rimpa Lapin / ริมผาลาพิน; Lung Sawai Seafood / ลุงไสว ซีฟู๊ด; The Sky Gallery; Suttangrak Pattaya / สุดทางรัก พัทยา; Preecha Seafood / ปรีชา ซีฟู้ด; Lan Pho Naklua Market / ตลาดลานโพธิ์นาเกลือ; Pier 21 Food Court (Terminal 21 Pattaya) / เพียร์ 21 เทอร์มินอล 21 พัทยา; Nong Mon Market / ตลาดหนองมน; La Baguette; The Chocolate Factory Pattaya; Cabbages & Condoms; Nara Thai Cuisine; Ruenthai; Leng Kee; Glass House Silver; Thepprasit Night Market; Tess Vegan Cafe

Already in the app — things to do: Sanctuary of Truth; Art in Paradise Pattaya; Underwater World Pattaya; Khao Kheow Open Zoo; Ramayana Water Park; Mini Siam; Phra Tamnak Viewpoint; Lan Pho Naklua Park; Thepprasit Night Market; Koh Larn; Pattaya Floating Market; Frost Magical Ice of Siam; Columbia Pictures Aquaverse; Jomtien Beach; Terminal 21 Pattaya; Pattaya Water Park; Harborland; Monster Aquarium; Ripley's Believe It or Not
