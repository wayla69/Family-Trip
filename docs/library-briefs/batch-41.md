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

### th-udon — Udon Thani (Thailand)
Area covered: Udon Thani (also known as / includes: udon thani, red lotus sea, kumphawapi, nong han kumphawapi, ban chiang, phu phrabat)

Already in the app — places to eat: VT Namnueng (Posri) / วีที แหนมเนือง; Madam Pahtehh 2515 / มาดามพาเท่ห์; Krua Khun Nid / ครัวคุณนิด; Rabiang Patchanee / ระเบียงพัชนี; Kao Piak Sen / ข้าวเปียกเส้น; Lab Mu Worachai / ลาบหมูวรชัย; Som Tam Je Kai / ส้มตำเจ๊ไก่; UD Town / ยูดี ทาวน์; Central Udon food court / ศูนย์อาหาร เซ็นทรัล อุดร; Preecha Night Market / ตลาดปรีชา; Beyond Cafe; Mavin Coffee Roaster; Option Coffee Bar; Maeya / แม่หยา; Bueng Mai Hom Garden Restaurant / สวนอาหารบึงไม้หอม; Dose Factory; Sa Muay & Sons / ซาหมวย แอนด์ ซันส์; King's Osha / คิงส์โอชา

Already in the app — things to do: World Horticultural Expo Udon Thani / มหกรรมพืชสวนโลกอุดรธานี 2569; Red Lotus Sea (Nong Han Kumphawapi) / ทะเลบัวแดง; Phu Phrabat Historical Park / อุทยานประวัติศาสตร์ภูพระบาท; Ban Chiang National Museum / พิพิธภัณฑสถานแห่งชาติ บ้านเชียง; Nong Prajak Park / หนองประจักษ์ศิลปาคม; Central Udon / เซ็นทรัล อุดรธานี; Udon City Walking Street / ถนนคนเดินหน้าศาลหลักเมือง; Udon Thani City Museum; Udon Sunshine Orchid Garden; Phu Foi Lom Park; Than Ngam Waterfall; Nong Samrong Reservoir; Huai Luang Reservoir; Ban Chiang Tai Phuan community; Na Kha silk village; Pa Phu Kon Temple / วัดป่าภูก้อน; Kham Chanod / คำชะโนด; Santiwanaram Temple / วัดสันติวนาราม; Sa Mani Temple / วัดสระมณี; Thai-Chinese Cultural Center / ศูนย์วัฒนธรรมไทย-จีน; Natural Park / Monkey Park / สวนธรรมชาติ/ สวนลิง; Na Yung - Nam Som National Park / อุทยานแห่งชาตินายูง-น้ำโสม; Tat Noi Waterfall / น้ำตกตาดน้อย; Khiri Wong Kot Village / หมู่บ้านคีรีวงกต

### jp-kumamoto — Kumamoto and Aso (Japan)
Area covered: Kumamoto and Aso (also known as / includes: kumamoto, aso, mount aso, takachiho, amakusa, kurokawa onsen)

Already in the app — places to eat: Katsuretsu Tei Shinshigai Honten / 勝烈亭 新市街本店; Kokutei Honten / 黒亭 本店; Komurasaki Kamitori / こむらさき 上通中央店; Kourantei Shimotori Honten / 紅蘭亭 下通本店; Aoyagi / 青柳; Imakin Shokudo / いまきん食堂; Takamori Dengaku no Sato / 高森田楽の里; Sanzoku Tabiji / 山賊旅路; Sakuranobaba Josaien / 桜の馬場 城彩苑; Higo Yokamon Ichiba / 肥後よかモン市場; Aso Shrine Monzenmachi / 阿蘇神社 門前町商店街; Okada Coffee Kamitori / 岡田珈琲 上通本店; Swiss Shimotori / スイス 下通店; Kokin Denju-no-Ma / 古今伝授の間; Restaurant Noppo / レストラン野っぽ; Hale Cafe Tsunagu / ハレカフェつなぐ; Restaurant Fujiya / レストラン藤屋; Meshi no Yamaichi / めしのやまいち

Already in the app — things to do: Kumamoto Castle / 熊本城; Kumamoto Castle Museum Wakuwakuza / 熊本城ミュージアム わくわく座; Sakuranobaba Johsaien / 桜の馬場 城彩苑; Suizenji Jojuen Garden / 水前寺成趣園; Kumamoto City Zoological and Botanical Gardens / 熊本市動植物園; Kumamon Square / くまモンスクウェア; Kumamoto Museum / 熊本博物館; Aso Farm Land / 阿蘇ファームランド; Aso Volcano Museum / 阿蘇火山博物館; Mifune Dinosaur Museum / 御船町恐竜博物館; Kusasenri Grassland / 草千里ヶ浜; Kumamoto Prefectural Traditional Crafts Museum / 熊本県伝統工芸館; Nobikko Jumbo Kumamoto indoor playground; Kumamoto City Tram; Kamitori Shopping Arcade / 上通アーケード; Minamiaso Railway Trolley Train / 南阿蘇鉄道 トロッコ列車; Aso Kadorie Dominion / 阿蘇カドリー・ドミニオン; Aso Kogen Picture Book Museum / 葉祥明阿蘇高原絵本美術館; Takamori Yusui Tunnel Park / 高森湧水トンネル公園; Kajitsu no Kuni Couples / 果実の国カップルズ; Art Washi Kobo Shiramizu / あーと和紙工房白水; Aso Milk Farm / 阿蘇ミルク牧場; Asobi Park PLUS Sakura Machi Kumamoto / あそびパークPLUS サクラマチクマモト店; FUN VILLAGE; Yuberu Kids Land Kumamoto / ユウベルキッズランド熊本

### jp-takayama — Takayama, Shirakawa-go and Nagoya (Japan)
Area covered: Takayama, Shirakawa-go and Nagoya (also known as / includes: takayama, shirakawa-go, shirakawago, hida, gero, nagoya)

Already in the app — places to eat: Maruaki / 丸明 飛騨高山店; Ajikura Tengoku / 味蔵天国; Suzuya / 寿々や; Kyoya / 京や; Irori / いろり; Atsuta Horaiken Honten / あつた蓬莱軒 本店; Yabaton Yabacho Honten / 矢場とん 矢場町本店; Yamamotoya Sohonke / 山本屋総本家 本家; Miyagawa Morning Market / 宮川朝市; Hida Kotte Ushi / 飛騨こって牛; Osu Shopping Street / 大須商店街; Ochudo / 落人; Komeda's Coffee Honten / コメダ珈琲店 本店; Konparu Osu Honten / コンパル 大須本店; Hida Takayama Gyoza Sohonzan; Center4 Hamburgers; EVILTEX Hamburgers & Tex-Mex; Jakson Curry & Coffee; Hida Beef Curry House; Chacha; Ebisu Soba; Kitchen Hida; Hida Premium Beef Sushi; Jingoroh Ramen Main Restaurant; Debumaru Takayama Branch 2; Ebihachi

Already in the app — things to do: Hida Folk Village / 飛騨の里; Miyagawa and Jinya-mae morning markets / 宮川朝市・陣屋前朝市; Takayama Jinya / 高山陣屋; Takayama Festival Floats Exhibition Hall / 高山祭屋台会館; Sanmachi Suji old town streets / さんまち通り; Higashiyama Walking Course and Shiroyama Park / 東山遊歩道・城山公園; Hida Takayama Teddy Bear Eco Village / 飛騨高山テディベアエコビレッジ; Ogimachi village, Shirakawa-go / 白川郷 荻町; Gassho-zukuri Minkaen open-air museum / 白川郷合掌造り民家園; LEGOLAND Japan / レゴランド・ジャパン; Port of Nagoya Public Aquarium / 名古屋港水族館; SCMAGLEV and Railway Park / リニア・鉄道館; Nagoya Castle / 名古屋城; Higashiyama Zoo and Botanical Gardens / 東山動植物園; Ghibli Park / ジブリパーク; Harayama Citizens' Park / 原山市民公園; Alps Viewpoint Sky Park / アルプス展望公園 スカイパーク; Hida Great Limestone Cave / 飛騨大鍾乳洞

### th-khaokho — Khao Kho and Phu Thap Boek (Thailand)
Area covered: Khao Kho and Phu Thap Boek (also known as / includes: khao kho, phu thap boek, phetchabun, si thep, phu hin rong kla, thung salaeng luang)

Already in the app — places to eat: Rai Chan Raem / ไร่จันทร์แรม; Khao Kho Talay Phu / เขาค้อทะเลภู; B.N. Farm / ไร่ บี.เอ็น.; Imperial Phukaew Hill Resort restaurant / ห้องอาหาร อิมพีเรียล ภูแก้ว ฮิลล์ รีสอร์ท; The Blue Sky Resort restaurant / ห้องอาหาร เดอะ บลู สกาย รีสอร์ท; Rai Kamnan Chul / ไร่กำนันจุล; Krua Mong Meng / ครัวโม่งเม่ง; Rai Song Rao / ไร่สองเรา; Phu Thap Boek Hmong Market / ตลาดม้งภูทับเบิก; Khao Kho Wind Farm stalls / ร้านค้าทุ่งกังหันลมเขาค้อ; Thai Lom Walking Street / ถนนคนเดินไทหล่ม; Pino Latte / พีโน่ ลาเต้; Rai GB / ไร่จีบี; Hydrangea Cafe / ไฮเดรนเยีย คาเฟ่; Takmoh Coffee Khao Kho / ตั๊กม้อ คอฟฟี่ เขาค้อ; Lap Lung Wang / ลาบลุงหวัง; Taen Rak Talay Mok / แทนรักทะเลหมอก; Rong Tiam Tak Mo (Sut Khop Fa) / โรงเตี๊ยม ตั้กม้อ (สุดขอบฟ้า); The Piney Bistro Cafe; Boran Niyom Steak House / โบราณนิยม@เขาค้อ Steak House & Restaurant; Krua Khao Kho / ครัวเขาค้อ; Krua Pan Suk Khao Kho / ครัวปันสุข เขาค้อ; Le Khuat Khao Kho / Le-เลอ ขวต @เขาค้อ KhaoKho; Le Bonheur Pha Son Kaeo / Le Bonheur ผาซ่อนแก้ว; Le Dak Khao Kho / เลอแดก เขาค้อ; Jolly Cafe by Cup Mellow; Barbara Steakhouse (The Montanas)

Already in the app — things to do: Phu Thap Boek viewpoint and cabbage fields / ภูทับเบิก; Khao Kho Open Zoo (wildlife breeding station) / สถานีเพาะเลี้ยงสัตว์ป่าเขาค้อ; Khao Kho Upland Agricultural Experiment Station / สถานีทดลองเกษตรที่สูงเขาค้อ; Than Thip Waterfall, Khao Kho National Park / น้ำตกธารทิพย์; Thung Salaeng Luang National Park (Nong Mae Na) / อุทยานแห่งชาติทุ่งแสลงหลวง; Amazing Dinosaur Khao Kho / อะเมซซิ่ง ไดโนซอร์ เขาค้อ; Khao Kho windmill field / ทุ่งกังหันลมเขาค้อ; Mon Kae sheep farm and café / ฟาร์มแกะ เขาค้อ; Magic Hill; Itti Base Weapon Museum; Khao Kho International Library; Khao Kho Royal Palace; Phukaew Adventure Park; Khao Kho Sacrificial Monument; Khao Kho National Park; Lom Sak Museum; Nakhonban Phetchabun Cultural Hall
