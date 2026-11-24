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

### jp-kumamoto — Kumamoto and Aso (Japan)
Area covered: Kumamoto and Aso (also known as / includes: kumamoto, aso, mount aso, takachiho, amakusa, kurokawa onsen)

Now in the app: 20 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Katsuretsu Tei Shinshigai Honten / 勝烈亭 新市街本店; Kokutei Honten / 黒亭 本店; Komurasaki Kamitori / こむらさき 上通中央店; Kourantei Shimotori Honten / 紅蘭亭 下通本店; Aoyagi / 青柳; Imakin Shokudo / いまきん食堂; Takamori Dengaku no Sato / 高森田楽の里; Sanzoku Tabiji / 山賊旅路; Sakuranobaba Josaien / 桜の馬場 城彩苑; Higo Yokamon Ichiba / 肥後よかモン市場; Aso Shrine Monzenmachi / 阿蘇神社 門前町商店街; Okada Coffee Kamitori / 岡田珈琲 上通本店; Swiss Shimotori / スイス 下通店; Kokin Denju-no-Ma / 古今伝授の間; Restaurant Noppo / レストラン野っぽ; Hale Cafe Tsunagu / ハレカフェつなぐ; Restaurant Fujiya / レストラン藤屋; Meshi no Yamaichi / めしのやまいち; Gyoza-ya Ni-no-Ni (Chuo); Kikyo-ya / ききょう家

Already in the app — things to do: Kumamoto Castle / 熊本城; Kumamoto Castle Museum Wakuwakuza / 熊本城ミュージアム わくわく座; Sakuranobaba Johsaien / 桜の馬場 城彩苑; Suizenji Jojuen Garden / 水前寺成趣園; Kumamoto City Zoological and Botanical Gardens / 熊本市動植物園; Kumamon Square / くまモンスクウェア; Kumamoto Museum / 熊本博物館; Aso Farm Land / 阿蘇ファームランド; Aso Volcano Museum / 阿蘇火山博物館; Mifune Dinosaur Museum / 御船町恐竜博物館; Kusasenri Grassland / 草千里ヶ浜; Kumamoto Prefectural Traditional Crafts Museum / 熊本県伝統工芸館; Nobikko Jumbo Kumamoto indoor playground; Kumamoto City Tram; Kamitori Shopping Arcade / 上通アーケード; Minamiaso Railway Trolley Train / 南阿蘇鉄道 トロッコ列車; Aso Kadorie Dominion / 阿蘇カドリー・ドミニオン; Aso Kogen Picture Book Museum / 葉祥明阿蘇高原絵本美術館; Takamori Yusui Tunnel Park / 高森湧水トンネル公園; Kajitsu no Kuni Couples / 果実の国カップルズ; Art Washi Kobo Shiramizu / あーと和紙工房白水; Aso Milk Farm / 阿蘇ミルク牧場; Asobi Park PLUS Sakura Machi Kumamoto / あそびパークPLUS サクラマチクマモト店; FUN VILLAGE; Yuberu Kids Land Kumamoto / ユウベルキッズランド熊本; Minamiaso Fureai Zoo Fairy Tale; Aso Otohime Onsen Yura Yura (Kosugi Resort)

### th-khaokho — Khao Kho and Phu Thap Boek (Thailand)
Area covered: Khao Kho and Phu Thap Boek (also known as / includes: khao kho, phu thap boek, phetchabun, si thep, phu hin rong kla, thung salaeng luang)

Now in the app: 27 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Rai Chan Raem / ไร่จันทร์แรม; Khao Kho Talay Phu / เขาค้อทะเลภู; B.N. Farm / ไร่ บี.เอ็น.; Imperial Phukaew Hill Resort restaurant / ห้องอาหาร อิมพีเรียล ภูแก้ว ฮิลล์ รีสอร์ท; The Blue Sky Resort restaurant / ห้องอาหาร เดอะ บลู สกาย รีสอร์ท; Rai Kamnan Chul / ไร่กำนันจุล; Krua Mong Meng / ครัวโม่งเม่ง; Rai Song Rao / ไร่สองเรา; Phu Thap Boek Hmong Market / ตลาดม้งภูทับเบิก; Khao Kho Wind Farm stalls / ร้านค้าทุ่งกังหันลมเขาค้อ; Thai Lom Walking Street / ถนนคนเดินไทหล่ม; Pino Latte / พีโน่ ลาเต้; Rai GB / ไร่จีบี; Hydrangea Cafe / ไฮเดรนเยีย คาเฟ่; Takmoh Coffee Khao Kho / ตั๊กม้อ คอฟฟี่ เขาค้อ; Lap Lung Wang / ลาบลุงหวัง; Taen Rak Talay Mok / แทนรักทะเลหมอก; Rong Tiam Tak Mo (Sut Khop Fa) / โรงเตี๊ยม ตั้กม้อ (สุดขอบฟ้า); The Piney Bistro Cafe; Boran Niyom Steak House / โบราณนิยม@เขาค้อ Steak House & Restaurant; Krua Khao Kho / ครัวเขาค้อ; Krua Pan Suk Khao Kho / ครัวปันสุข เขาค้อ; Le Khuat Khao Kho / Le-เลอ ขวต @เขาค้อ KhaoKho; Le Bonheur Pha Son Kaeo / Le Bonheur ผาซ่อนแก้ว; Le Dak Khao Kho / เลอแดก เขาค้อ; Jolly Cafe by Cup Mellow; Barbara Steakhouse (The Montanas)

Already in the app — things to do: Phu Thap Boek viewpoint and cabbage fields / ภูทับเบิก; Khao Kho Open Zoo (wildlife breeding station) / สถานีเพาะเลี้ยงสัตว์ป่าเขาค้อ; Khao Kho Upland Agricultural Experiment Station / สถานีทดลองเกษตรที่สูงเขาค้อ; Than Thip Waterfall, Khao Kho National Park / น้ำตกธารทิพย์; Thung Salaeng Luang National Park (Nong Mae Na) / อุทยานแห่งชาติทุ่งแสลงหลวง; Amazing Dinosaur Khao Kho / อะเมซซิ่ง ไดโนซอร์ เขาค้อ; Khao Kho windmill field / ทุ่งกังหันลมเขาค้อ; Mon Kae sheep farm and café / ฟาร์มแกะ เขาค้อ; Magic Hill; Itti Base Weapon Museum; Khao Kho International Library; Khao Kho Royal Palace; Phukaew Adventure Park; Khao Kho Sacrificial Monument; Khao Kho National Park; Lom Sak Museum; Nakhonban Phetchabun Cultural Hall; LinnyLand Fun and Farm / ลินนี่แลนด์ ฟัน แอนด์ ฟาร์ม; Khao Takhian Ngo Viewpoint / เขาตะเคียนโง๊ะ; Wat Phra That Pha Son Kaeo / วัดพระธาตุผาซ่อนแก้ว

### th-khonkaen — Khon Kaen (Thailand)
Area covered: Khon Kaen (also known as / includes: khon kaen, phu wiang, kaen nakhon, ubolratana, ban khok sa-nga)

Now in the app: 18 places to eat, 29 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Guang Tang Noodles / บะหมี่กวงตัง; Baan Heng / บ้านเฮง; Kaen / แก่น; Wan Kai Yang / วรรณไก่ย่าง; Krua Supanniga / ครัวสุพรรณิการ์; Pho Tha Bo / เฝอท่าบ่อ; Em Oht / เอมโอช; Nam Nueng Lablae / แหนมเนืองลับแล; Pomodoro; Ton Tann Market / ตลาดต้นตาล; Khon Kaen Walking Street / ถนนคนเดินขอนแก่น; Central Khon Kaen food court / ศูนย์อาหาร เซ็นทรัล ขอนแก่น; Godfather Coffee; Kaen Ground; 11AM cafe and space; Murmur Baker / เมอเมอ เบเคอร์; Chujai Cafe / ชูใจ คาเฟ่; Huean Kham Nang / เฮือนคำนาง

Already in the app — things to do: Khon Kaen Zoo / สวนสัตว์ขอนแก่น; Scientific Centre for Education Khon Kaen / ศูนย์วิทยาศาสตร์เพื่อการศึกษาขอนแก่น; Phu Wiang Dinosaur Museum / ศูนย์ศึกษาวิจัยและพิพิธภัณฑ์ไดโนเสาร์ภูเวียง; Phu Wiang National Park / อุทยานแห่งชาติภูเวียง; Khon Kaen National Museum / พิพิธภัณฑสถานแห่งชาติ ขอนแก่น; Bueng Kaen Nakhon lake park / บึงแก่นนคร; Treasure Hall, Khon Kaen city museum / หอนิทรรศการเมืองขอนแก่น; Ubolratana Dam park / เขื่อนอุบลรัตน์ (เขื่อนพองหนีบ); Ton Tann Market / ตลาดต้นตาล; Si Wiang Dinosaur Park; Xventure Khon Kaen; Chalermphrakiat 72 Phansa Maharachini Park; Turtle Village (Ban Kok); Art Culture Institute, Khon Kaen University; Khon Kaen Philatelic Museum; Phra Mahathat Kaen Nakhon (Wat Nong Waeng) / พระมหาธาตุแก่นนคร วัดหนองแวง; Mikin Farm / มีกิน Farm; Phu Pha Man National Park / อุทยานแห่งชาติภูผาม่าน; Hin Chang Si Viewpoint / จุดชมวิวหินช้างสี; Pha Nok Khao (The Cliff of Owl) / ผานกเค้า; HarborLand Central Khon Kaen; Khonkaen Exotic Pets; Columbo Craft Village; Phu Kao–Phu Phan Kham National Park; Blue Lagoon, Phu Pha Man; Wat Thung Setthi; Phra That Kham Kaen; Ba Luang waterfall; Nam Phong National Park

### th-suratthani — Surat Thani and Khao Sok (Thailand)
Area covered: Surat Thani and Khao Sok (also known as / includes: surat thani, khao sok, cheow lan, ratchaprapha, chaiya)

Now in the app: 18 places to eat, 29 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Lucky Restaurant / ลักกี้ภัตตาคาร; Yok Kheng / ยกเข่ง; Sum Gradang Nga / ซุ้มกระดังงา; Lamphu 2 / ลำพู 2; Milano; Pa Ting / ป้าทิ้ง; Pawn's Restaurant; San Chao Night Market / ตลาดศาลเจ้า; Pracharat Bang Bai Mai Floating Market / ตลาดน้ำประชารัฐบางใบไม้; Central Surat Thani food court / ศูนย์อาหาร เซ็นทรัล สุราษฎร์ธานี; Keo Pla / เกี๊ยวปลา; Backyard Cafe x TCT; Lian Tai / เลี่ยนไถ่; Good Time Cafe; Tapee Seafood / ตาปี ซีฟู้ด; Nai Aow Seafood / ร้านในอ่าวซีฟู๊ด; Ban Lung Moon Garden Restaurant / สวนอาหารบ้านลุงมูล; Phunisa / ภูณิศา

Already in the app — things to do: Khao Sok National Park (headquarters area) / อุทยานแห่งชาติเขาสก; Cheow Lan Lake (Ratchaprapha Dam) / เขื่อนรัชชประภา เชี่ยวหลาน; Sok River tubing / ล่องห่วงยางคลองสก; Ton Sai Waterfall / น้ำตกโตนไทร; Kaeng Krung National Park / อุทยานแห่งชาติแก่งกรุง; Wat Phra Borommathat Chaiya / วัดพระบรมธาตุไชยา; Chaiya National Museum; Khlong Phanom National Park; Tai Rom Yen National Park (Namtok Dat Fa); Khlong Roi Sai canal community; Ban Phum Riang community; Khao Tha Phet forest and viewpoint; Namtok Vibhavadi; Pak Nam Tapi waterfront; Surat Thani Night Market (Talad Kaset); Ton Kloi Waterfall Trail; Wat Tham Phanthurat; Khao Sok night safari; Bamboo rafting on the Sok River; Mai Yai Waterfall; Coral Cave; Khlong Pae Nature Trail; Orchid Trail (rafflesia); Surat Thani City Pillar Shrine / ศาลหลักเมืองสุราษฎร์ธานี; Hokkien Shrine / ศาลเจ้าฮกเกี้ยน; Laem Pho Beach / แหลมโพธิ์; Ban Nam Rad Spring Forest / ป่าต้นน้ำ บ้านน้ำราด; Khao Phang Suspension Bridge / สะพานแขวน ภูเขารูปหัวใจ; Khao Na Nai Luang Dharma Park / อุทยานธรรมเขานาในหลวง
