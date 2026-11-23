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

### th-ubon — Ubon Ratchathani (Thailand)
Area covered: Ubon Ratchathani (also known as / includes: ubon ratchathani, ubon, khong chiam, pha taem, sam phan bok, kaeng tana)

Already in the app — places to eat: Indochine / อินโดจีน; Samchai Coffee (Thepyothi) / สามชัยกาแฟ; Sam Chai Kai Yang / สามชัยไก่ย่าง; Porntip Kai Yang Wat Jaeng / พรทิพย์ไก่ย่างวัดแจ้ง; Guay Jub Ubon / ก๋วยจั๊บอุบล; a-ga-ve Café & Restaurant / อากาเว่; Chiokee / เจียวกี่; Kuay Jap Tor Bor / ก๋วยจั๊บ ทบ.; Ubon Ocha / อุบลโอชา; Ubon Night Market / ตลาดโต้รุ่งราชบุตร; Central Ubon food court / ศูนย์อาหาร เซ็นทรัล อุบล; Abe Specialty Coffee; Arabus Experience Café / อาราบัส; Warichjitrana Cafe & Farm; Khwam Song Cham (Memory) Cafe

Already in the app — things to do: Ubon Ratchathani National Museum / พิพิธภัณฑสถานแห่งชาติ อุบลราชธานี; Ubon Ratchathani Science Centre for Education / ศูนย์วิทยาศาสตร์เพื่อการศึกษาอุบลราชธานี; Ubon Ratchathani Zoo / สวนสัตว์อุบลราชธานี; Pha Taem National Park / อุทยานแห่งชาติผาแต้ม; Two-colour river viewpoint / แม่น้ำสองสี; Sirindhorn Dam / เขื่อนสิรินธร; Nong Bua Public Park / สวนสาธารณะหนองบัว; Central Ubon / เซ็นทรัล อุบลราชธานี; Thung Sri Muang night market / ทุ่งศรีเมือง; Kaeng Tana National Park; Huai Luang Waterfall; Warin Chamrap market; Pattaya Noi, Sirindhorn Dam; Sam Phan Bok; Saeng Chan Waterfall; Wat Sirindhorn Wararam; Wat Phra That Nong Bua; Wat Thung Si Mueang; Golden Monument of Thung Sri Mueang; Sao Chaliang; Thung Na Mueang Waterfalls; Wat Tham Heo Sin Chai

### th-suratthani — Surat Thani and Khao Sok (Thailand)
Area covered: Surat Thani and Khao Sok (also known as / includes: surat thani, khao sok, cheow lan, ratchaprapha, chaiya)

Already in the app — places to eat: Lucky Restaurant / ลักกี้ภัตตาคาร; Yok Kheng / ยกเข่ง; Sum Gradang Nga / ซุ้มกระดังงา; Lamphu 2 / ลำพู 2; Milano; Pa Ting / ป้าทิ้ง; Pawn's Restaurant; San Chao Night Market / ตลาดศาลเจ้า; Pracharat Bang Bai Mai Floating Market / ตลาดน้ำประชารัฐบางใบไม้; Central Surat Thani food court / ศูนย์อาหาร เซ็นทรัล สุราษฎร์ธานี; Keo Pla / เกี๊ยวปลา; Backyard Cafe x TCT; Lian Tai / เลี่ยนไถ่; Good Time Cafe

Already in the app — things to do: Khao Sok National Park (headquarters area) / อุทยานแห่งชาติเขาสก; Cheow Lan Lake (Ratchaprapha Dam) / เขื่อนรัชชประภา เชี่ยวหลาน; Sok River tubing / ล่องห่วงยางคลองสก; Ton Sai Waterfall / น้ำตกโตนไทร; Kaeng Krung National Park / อุทยานแห่งชาติแก่งกรุง; Wat Phra Borommathat Chaiya / วัดพระบรมธาตุไชยา; Chaiya National Museum; Khlong Phanom National Park; Tai Rom Yen National Park (Namtok Dat Fa); Khlong Roi Sai canal community; Ban Phum Riang community; Khao Tha Phet forest and viewpoint; Namtok Vibhavadi; Pak Nam Tapi waterfront; Surat Thani Night Market (Talad Kaset); Ton Kloi Waterfall Trail; Wat Tham Phanthurat; Khao Sok night safari; Bamboo rafting on the Sok River; Mai Yai Waterfall; Coral Cave; Khlong Pae Nature Trail; Orchid Trail (rafflesia)

### th-udon — Udon Thani (Thailand)
Area covered: Udon Thani (also known as / includes: udon thani, red lotus sea, kumphawapi, nong han kumphawapi, ban chiang, phu phrabat)

Already in the app — places to eat: VT Namnueng (Posri) / วีที แหนมเนือง; Madam Pahtehh 2515 / มาดามพาเท่ห์; Krua Khun Nid / ครัวคุณนิด; Rabiang Patchanee / ระเบียงพัชนี; Kao Piak Sen / ข้าวเปียกเส้น; Lab Mu Worachai / ลาบหมูวรชัย; Som Tam Je Kai / ส้มตำเจ๊ไก่; UD Town / ยูดี ทาวน์; Central Udon food court / ศูนย์อาหาร เซ็นทรัล อุดร; Preecha Night Market / ตลาดปรีชา; Beyond Cafe; Mavin Coffee Roaster; Option Coffee Bar; Maeya / แม่หยา; Bueng Mai Hom Garden Restaurant / สวนอาหารบึงไม้หอม; Dose Factory; Sa Muay & Sons / ซาหมวย แอนด์ ซันส์; King's Osha / คิงส์โอชา

Already in the app — things to do: World Horticultural Expo Udon Thani / มหกรรมพืชสวนโลกอุดรธานี 2569; Red Lotus Sea (Nong Han Kumphawapi) / ทะเลบัวแดง; Phu Phrabat Historical Park / อุทยานประวัติศาสตร์ภูพระบาท; Ban Chiang National Museum / พิพิธภัณฑสถานแห่งชาติ บ้านเชียง; Nong Prajak Park / หนองประจักษ์ศิลปาคม; Central Udon / เซ็นทรัล อุดรธานี; Udon City Walking Street / ถนนคนเดินหน้าศาลหลักเมือง; Udon Thani City Museum; Udon Sunshine Orchid Garden; Phu Foi Lom Park; Than Ngam Waterfall; Nong Samrong Reservoir; Huai Luang Reservoir; Ban Chiang Tai Phuan community; Na Kha silk village; Pa Phu Kon Temple / วัดป่าภูก้อน; Kham Chanod / คำชะโนด; Santiwanaram Temple / วัดสันติวนาราม; Sa Mani Temple / วัดสระมณี; Thai-Chinese Cultural Center / ศูนย์วัฒนธรรมไทย-จีน; Natural Park / Monkey Park / สวนธรรมชาติ/ สวนลิง; Na Yung - Nam Som National Park / อุทยานแห่งชาตินายูง-น้ำโสม; Tat Noi Waterfall / น้ำตกตาดน้อย; Khiri Wong Kot Village / หมู่บ้านคีรีวงกต

### th-khaokho — Khao Kho and Phu Thap Boek (Thailand)
Area covered: Khao Kho and Phu Thap Boek (also known as / includes: khao kho, phu thap boek, phetchabun, si thep, phu hin rong kla, thung salaeng luang)

Already in the app — places to eat: Rai Chan Raem / ไร่จันทร์แรม; Khao Kho Talay Phu / เขาค้อทะเลภู; B.N. Farm / ไร่ บี.เอ็น.; Imperial Phukaew Hill Resort restaurant / ห้องอาหาร อิมพีเรียล ภูแก้ว ฮิลล์ รีสอร์ท; The Blue Sky Resort restaurant / ห้องอาหาร เดอะ บลู สกาย รีสอร์ท; Rai Kamnan Chul / ไร่กำนันจุล; Krua Mong Meng / ครัวโม่งเม่ง; Rai Song Rao / ไร่สองเรา; Phu Thap Boek Hmong Market / ตลาดม้งภูทับเบิก; Khao Kho Wind Farm stalls / ร้านค้าทุ่งกังหันลมเขาค้อ; Thai Lom Walking Street / ถนนคนเดินไทหล่ม; Pino Latte / พีโน่ ลาเต้; Rai GB / ไร่จีบี; Hydrangea Cafe / ไฮเดรนเยีย คาเฟ่; Takmoh Coffee Khao Kho / ตั๊กม้อ คอฟฟี่ เขาค้อ; Lap Lung Wang / ลาบลุงหวัง; Taen Rak Talay Mok / แทนรักทะเลหมอก; Rong Tiam Tak Mo (Sut Khop Fa) / โรงเตี๊ยม ตั้กม้อ (สุดขอบฟ้า); The Piney Bistro Cafe; Boran Niyom Steak House / โบราณนิยม@เขาค้อ Steak House & Restaurant; Krua Khao Kho / ครัวเขาค้อ; Krua Pan Suk Khao Kho / ครัวปันสุข เขาค้อ; Le Khuat Khao Kho / Le-เลอ ขวต @เขาค้อ KhaoKho; Le Bonheur Pha Son Kaeo / Le Bonheur ผาซ่อนแก้ว; Le Dak Khao Kho / เลอแดก เขาค้อ; Jolly Cafe by Cup Mellow; Barbara Steakhouse (The Montanas)

Already in the app — things to do: Phu Thap Boek viewpoint and cabbage fields / ภูทับเบิก; Khao Kho Open Zoo (wildlife breeding station) / สถานีเพาะเลี้ยงสัตว์ป่าเขาค้อ; Khao Kho Upland Agricultural Experiment Station / สถานีทดลองเกษตรที่สูงเขาค้อ; Than Thip Waterfall, Khao Kho National Park / น้ำตกธารทิพย์; Thung Salaeng Luang National Park (Nong Mae Na) / อุทยานแห่งชาติทุ่งแสลงหลวง; Amazing Dinosaur Khao Kho / อะเมซซิ่ง ไดโนซอร์ เขาค้อ; Khao Kho windmill field / ทุ่งกังหันลมเขาค้อ; Mon Kae sheep farm and café / ฟาร์มแกะ เขาค้อ; Magic Hill; Itti Base Weapon Museum; Khao Kho International Library; Khao Kho Royal Palace; Phukaew Adventure Park; Khao Kho Sacrificial Monument; Khao Kho National Park; Lom Sak Museum; Nakhonban Phetchabun Cultural Hall
