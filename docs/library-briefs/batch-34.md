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

### cn-harbin — Harbin (China)
Area covered: Harbin (also known as / includes: harbin, ice festival, ice and snow world, snow town, yabuli)

Already in the app — places to eat: Lao Chu Jia / 老厨家 道里三道街旗舰店; Huamei Western Restaurant / 华梅西餐厅; Tatoc Restaurant / 塔道斯西餐厅; Oriental King of Dumplings / 东方饺子王 中央大街店; Lao Chang Chunbing / 老昌春饼; Zhang Bao Pu / 张包铺; Lao Du Yi Chu / 老都一处; Qiulin Food Store / 秋林公司 食品商场; Daoli Market / 道里菜市场; Hongzhuan Street Morning Market / 红专街早市; Madieer Ice Lolly Shop / 马迭尔冷饮厅; Lao Ding Feng / 老鼎丰; Russia Coffee & Food / 露西亚咖啡西餐厅; Be For Time Tea House; Maomao Smoked Meat House; Hot Pot Taidou

Already in the app — things to do: Harbin Ice and Snow World / 哈尔滨冰雪大世界; Sun Island Snow Sculpture Art Expo / 太阳岛国际雪雕艺术博览会; Zhaolin Park Ice Lantern Art Fair / 兆麟公园冰灯游园会; Harbin Polarland / 哈尔滨极地馆; Siberian Tiger Park / 东北虎林园; Harbin Northern Forest Zoo / 哈尔滨北方森林动物园; Central Street and Madier ice lollies / 中央大街; Saint Sophia Square and Architecture Art Gallery / 圣索菲亚教堂; Volga Manor / 伏尔加庄园; Heilongjiang Provincial Museum / 黑龙江省博物馆; Stalin Park and the Songhua River promenade; Dragon Tower, Harbin / 龙塔; Jile Temple (Bliss Temple) / 极乐寺; Songhua River Ice and Snow Carnival / 松花江冰雪嘉年华

### cn-guilin — Guilin and Yangshuo (China)
Area covered: Guilin and Yangshuo (also known as / includes: guilin, yangshuo, li river, longji, reed flute)

Already in the app — places to eat: Chunji Roast Goose / 椿记烧鹅 中山店; McFound / 麦香坊; Jinlong Zhai / 金龙寨; Xiao Nan Guo / 小南国; Xin Guoji Oil Tea / 新郭记油茶 伏波店; Shang Palace / 香宫 桂林香格里拉; Xie Sanjie Beer Fish / 谢三姐啤酒鱼; Dashifu Beer Fish / 大师傅啤酒鱼 西街口总店; Chongshan Rice Noodles / 崇善米粉 依仁路店; Lao Dongjiang Rice Noodles / 老东江米粉 总店; West Street Snack Stalls / 阳朔西街小吃; Rosemary Cafe / 迷迭香西餐厅; Mingyuan Cafe / 明园咖啡; Amy's on the Li; Lucy's Café

Already in the app — things to do: Reed Flute Cave / 芦笛岩; Seven Star Park / 七星公园; Li River cruise (Guilin to Yangshuo) / 漓江游船; Yulong River bamboo rafting / 遇龙河竹筏; Silver Cave / 银子岩; Impression Liu Sanjie / 印象·刘三姐; Longji Rice Terraces (Ping'an and Dazhai) / 龙脊梯田; Two Rivers and Four Lakes night cruise / 两江四湖夜游; Yangshuo West Street / 阳朔西街; Elephant Trunk Hill / 象鼻山; Chuanshan Park / 穿山公园; Daxu Ancient Town / 大圩古镇; Guilin Zoo / 桂林动物园; Folded Brocade Hill (Diecai Hill) / 叠彩山; Gudong Waterfall / 古东瀑布; Yangshuo biking (Yulong River); Moon Hill

### th-nan — Nan, Pua and Bo Kluea (Thailand)
Area covered: Nan, Pua and Bo Kluea (also known as / includes: nan province, nan old town, pua, bo kluea, sapan village, doi samer dao)

Already in the app — places to eat: Huen Hom / เฮือนฮอม; Huen Phukha / เฮือนภูคา; Khao Soi Ton Nam / ข้าวซอยต้นน้ำ; Wanda / ร้านวันดา; Poom 3 / ปุ้ม 3; Suriya Garden / สุริยาการ์เด้น; Huen Chao Nang / เฮือนเจ้านาง; Pongza Restaurant / ปองซา; Hua Saphan / ร้านหัวสะพาน; Kad Khuang Mueang Nan Walking Street / ถนนคนเดินกาดข่วงเมืองน่าน; Tang Chit Nuson Market / ตลาดตั้งจิตนุสรณ์; Baan Tai Lue Cafe / กาแฟบ้านไทลื้อ; Hot Bread; Pa Nim Dessert / ของหวานป้านิ่ม; Erabica Coffee / เอราบิก้า คอฟฟี่

Already in the app — things to do: Nan National Museum / พิพิธภัณฑสถานแห่งชาติ น่าน; Doi Phu Kha National Park / อุทยานแห่งชาติดอยภูคา; Doi Samer Dao viewpoint / ดอยเสมอดาว; Sao Din Na Noi / เสาดินนาน้อย; Wat Phumin / วัดภูมินทร์; Nan Riverside Art Gallery; Hong Chao Fong Kham; Ban Phra Koet Community Museum; Cocoa Valley Nan; Tham Pha Tup Forest Park; Wat Phrathat Chae Haeng; Bo Suak ancient kiln site; Namtok Sapan; Bo Kluea rock salt wells; Nan Walking Street (Kad Kuang Mueang Nan); Sila Phet Waterfall; Route 1081 Viewpoint (Skyroad 1715)

### jp-hakone — Hakone (Japan)
Area covered: Hakone (also known as / includes: hakone, lake ashi, owakudani, gora, karuizawa, kawaguchiko)

Already in the app — places to eat: Hatsuhana Soba Honten / はつ花そば 本店; Yubadon Naokichi / 湯葉丼 直吉; Tamura Ginkatsutei / 田むら銀かつ亭; Gyoza Center / 餃子センター; La Terrazza Ashinoko / ラ・テラッツァ 芦ノ湖; Shika-jaya / 知客茶家; Box Burger Miyagino Honten / BOX BURGER 宮城野本店; Owakudani Kurotamagokan / 大涌谷くろたまご館; Suzuhiro Kamaboko Village / 鈴廣かまぼこの里; Hakone-Yumoto Station Shopping Street / 箱根湯本駅前商店街; Bakery & Table Hakone / ベーカリー&テーブル 箱根; Amazake-chaya / 甘酒茶屋; Watanabe Bakery / 渡邊ベーカリー; Fujiya Hotel Bakery & Sweets Picot / 富士屋ホテル ベーカリー&スイーツ ピコット; Chimoto Ekimae-dori / 湯もち本舗 ちもと 駅前通り店; Naraya Cafe; Hakone no Mori Pancake

Already in the app — things to do: Hakone Open-Air Museum / 彫刻の森美術館; Hakone Ropeway to Owakudani / 箱根ロープウェイ; Hakone Pirate Ship cruise on Lake Ashi / 箱根海賊船; Hakone Gora Park / 箱根強羅公園; Hakone Tozan Railway / 箱根登山電車; Hakone Tozan Cable Car / 箱根登山ケーブルカー; Hakone Kowakien Yunessun / 箱根小涌園ユネッサン; Hakone-en Aquarium / 箱根園水族館; Hakone Komagatake Ropeway / 箱根駒ヶ岳ロープウェー; Hakone Venetian Glass Museum / 箱根ガラスの森美術館; Pola Museum of Art / ポーラ美術館; Sengokuhara pampas grass fields / 仙石原すすき草原; Hakone Checkpoint and museum / 箱根関所; Odawara Castle / 小田原城; Suzuhiro Kamaboko Museum and workshop / 鈴廣かまぼこの里; Forest Adventure Hakone
