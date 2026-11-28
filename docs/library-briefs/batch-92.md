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

### cn-guilin — Guilin and Yangshuo (China)
Area covered: Guilin and Yangshuo (also known as / includes: guilin, yangshuo, li river, longji, reed flute)

Now in the app: 16 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Chunji Roast Goose / 椿记烧鹅 中山店; McFound / 麦香坊; Jinlong Zhai / 金龙寨; Xiao Nan Guo / 小南国; Xin Guoji Oil Tea / 新郭记油茶 伏波店; Shang Palace / 香宫 桂林香格里拉; Xie Sanjie Beer Fish / 谢三姐啤酒鱼; Dashifu Beer Fish / 大师傅啤酒鱼 西街口总店; Chongshan Rice Noodles / 崇善米粉 依仁路店; Lao Dongjiang Rice Noodles / 老东江米粉 总店; West Street Snack Stalls / 阳朔西街小吃; Rosemary Cafe / 迷迭香西餐厅; Mingyuan Cafe / 明园咖啡; Amy's on the Li; Lucy's Café; Sister Liu Beer Fish (West Street) / 刘姐啤酒鱼民族演艺餐厅(西街总店)

Already in the app — things to do: Reed Flute Cave / 芦笛岩; Seven Star Park / 七星公园; Li River cruise (Guilin to Yangshuo) / 漓江游船; Yulong River bamboo rafting / 遇龙河竹筏; Silver Cave / 银子岩; Impression Liu Sanjie / 印象·刘三姐; Longji Rice Terraces (Ping'an and Dazhai) / 龙脊梯田; Two Rivers and Four Lakes night cruise / 两江四湖夜游; Yangshuo West Street / 阳朔西街; Elephant Trunk Hill / 象鼻山; Chuanshan Park / 穿山公园; Daxu Ancient Town / 大圩古镇; Guilin Zoo / 桂林动物园; Folded Brocade Hill (Diecai Hill) / 叠彩山; Gudong Waterfall / 古东瀑布; Yangshuo biking (Yulong River); Moon Hill; Moon Water Cave / 月亮水岩; Ruyi Peak cable car / 阳朔如意峰索道景区

### fr-montstmichel — Mont-Saint-Michel (France)
Area covered: Mont-Saint-Michel (also known as / includes: mont-saint-michel, mont saint michel, normandy, normandie, saint-malo, bayeux)

Now in the app: 19 places to eat, 16 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: La Mère Poulard; Les Terrasses Poulard; Crêperie La Sirène; Le Mouton Blanc; Auberge Saint-Pierre; Le Pré Salé; La Ferme Saint-Michel; Le Relais Saint-Michel; Breizh Café Cancale; Crêperie Le Corps de Garde; Brioche Dorée Mont-Saint-Michel; Marché aux Huîtres de Cancale; Grain de Vanille; Sanchez Artisan Glacier; Le Grillon; Restaurant Eugénie; Saint James Café; Le Café de la Baie; Le Logis Sainte-Catherine

Already in the app — things to do: Mont-Saint-Michel Abbey / Abbaye du Mont-Saint-Michel; Village of Mont-Saint-Michel and the Grande Rue / Grande Rue, Le Mont-Saint-Michel; Cancale oyster market / Marché aux huîtres de Cancale; Saint-Malo ramparts walk / Remparts de Saint-Malo; Grand Aquarium de Saint-Malo; Écomusée de la Baie du Mont-Saint-Michel; Scriptorial d'Avranches; Guided walk across the bay (Découverte de la Baie); Tombelaine island walk from the Mont; Dinan ramparts and old town; Parc zoologique de la Bourbansais; Bon-Secours beach and sea pool; Sillon beach, Saint-Malo; Fort National, Saint-Malo; Mont-Saint-Michel Historical Museum; Archéoscope

### fr-nice — Nice and the Riviera (France)
Area covered: Nice and the Riviera (also known as / includes: cote d'azur, riviera, monaco, monte carlo, cannes, eze)

Now in the app: 20 places to eat, 15 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Chez Pipo; Chez Acchiardo; Le Safari; Le Café de Turin; La Favola; La Pizza Cresci; Aux Bons Enfants; Café de Paris Monte-Carlo; Lou Pilha Leva; Chez René Socca; Marché du Cours Saleya; Marché Forville; Marché Provençal d'Antibes; Fenocchio; Pâtisserie LAC; Maison Auer; Lou Balico; La Verrière (Hôtel Monsigny); Brasserie Le Gioffredo; Lu Fran Calin

Already in the app — things to do: Parc Phoenix; Castle Hill park and waterfall / Parc de la Colline du Château; Promenade du Paillon and Albert I garden / Promenade du Paillon, Jardin Albert 1er; Nice public beaches / Plages publiques de Nice; Cours Saleya flower and food market / Marché du Cours Saleya; Matisse Museum / Musée Matisse; Marc Chagall National Museum / Musée national Marc Chagall; Villa Masséna museum and garden / Villa Masséna, musée d'art et d'histoire; Jules Chéret Fine Arts Museum / Musée des Beaux-Arts Jules Chéret; Exotic Garden of Èze / Jardin Exotique d'Èze; Oceanographic Museum of Monaco / Musée océanographique de Monaco; Villa Ephrussi de Rothschild; Picasso Museum Antibes / Musée Picasso, Antibes; Nice tourist little train; Cimiez Archaeological Museum and Roman ruins

### th-ayutthaya — Ayutthaya and Kanchanaburi (Thailand)
Area covered: Ayutthaya and Kanchanaburi (also known as / includes: ayutthaya, kanchanaburi, bang pa-in, sangkhlaburi, river kwai, sai yok)

Now in the app: 14 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Pae Krung Kao / แพกรุงเก่า; Ruan Thai Kung Pao / เรือนไทยกุ้งเผา; Baan Mai Rim Nam / บ้านไม้ริมน้ำ; Malakor Kitchen and Cafe / มะละกอ; Sai Thong River / ไทรทองริเวอร์; Keeree Tara / คีรีธารา; Blue Rice Restaurant by Apple & Noi; On's Thai-Issan; Pa Lek Boat Noodles / ก๋วยเตี๋ยวเรือป้าเล็ก; Bang Lan Night Market / ตลาดโต้รุ่งบางลาน; JJ Night Market Kanchanaburi / ตลาดเจเจ กาญจนบุรี; Roti Sai Mai Abeedeen-Pranom Sangaroon / โรตีสายไหมอาบีดีน-ประนอม แสงอรุณ; Baan Kao Nhom / บ้านข้าวหนม; Busaba Cafe & Bake Lab

Already in the app — things to do: Ayutthaya Historical Park / อุทยานประวัติศาสตร์พระนครศรีอยุธยา; Ayutthaya Historical Study Centre / ศูนย์ศึกษาประวัติศาสตร์พระนครศรีอยุธยา; Chao Sam Phraya National Museum / พิพิธภัณฑสถานแห่งชาติ เจ้าสามพระยา; Ayothaya Floating Market / ตลาดน้ำอโยธยา; Bang Pa-In Palace / พระราชวังบางปะอิน; Elephant Kraal Pavilion / เพนียดคล้องช้างอยุธยา; Chao Phrom Market / ตลาดเจ้าพรหม; Thailand-Burma Railway Centre / ศูนย์รถไฟไทย-พม่า; JEATH War Museum / พิพิธภัณฑ์สงครามเจอาร์ท; Death Railway train to Nam Tok / ทางรถไฟสายมรณะ สะพานข้ามแม่น้ำแคว; Bridge over the River Kwai / สะพานข้ามแม่น้ำแคว; Erawan National Park / อุทยานแห่งชาติเอราวัณ; Chantharakasem National Museum / พิพิธภัณฑสถานแห่งชาติ จันทรเกษม; Baan Hollanda Dutch Village Museum; Bang Sai Royal Folk Arts and Crafts Centre / ศูนย์ศิลปาชีพบางไทร; Ayutthaya Japanese Village; Kanchanaburi Skywalk; Walking Street; Wat Ban Tham; Wat Yai Chaya Mongkol; Wat Chai Wattanaram
