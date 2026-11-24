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

### cl-atacama — The Atacama desert (Chile)
Area covered: The Atacama desert (also known as / includes: atacama, san pedro de atacama, valle de la luna, calama, licancabur, toconao)

Now in the app: 16 places to eat, 14 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Adobe; La Casona; Baltinache; Las Delicias de Carmen; Ckunna; Tierra Todo Natural; Pizzería El Charrúa; La Picada del Indio; Emporio Andino; Franchuteria; Heladería Babalú; Café Peregrino; Roots; Jardín Meraki; Rincón de Solor; Pulpería Atacama

Already in the app — things to do: Valle de la Luna (Moon Valley) / Valle de la Luna; Laguna Cejar; Laguna Tebinquinche; Laguna Chaxa; Miscanti and Meñiques lagoons, Piedras Rojas; Termas de Puritama hot springs; Pukará de Quitor; El Tatio Geysers; SPACE stargazing tour; Chuquicamata mine tour; Mars Valley / Valle de Marte; Kari viewpoint (Piedra del Coyote) / Mirador de Kari; Rainbow Valley / Valle del Arcoíris; Baltinache hidden lagoons / Lagunas Escondidas de Baltinache

### cn-chongqing — Chongqing (China)
Area covered: Chongqing (also known as / includes: chongqing, hongyadong, liziba, yangtze, three gorges)

Now in the app: 12 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Pei Jie Lao Huoguo / 珮姐老火锅; Liu Yi Shou Hot Pot / 刘一手火锅; Cygnet Hot Pot (Hongyadong) / 小天鹅火锅 洪崖洞店; Yang Ji Long Fu / 杨记隆府; Xi Yang Yang; Hua Shi Wan Za Mian / 花市豌杂面; Bayi Road Food Street / 八一路好吃街; Hao You Lai Suan La Fen / 好又来酸辣粉; Shancheng Xiao Tangyuan / 山城小汤圆; Chen Changyin Mahua / 陈昌银麻花; Jiaotong Teahouse / 交通茶馆; Uncle Biao Tea Restaurant / 表叔Uncle·港式茶餐厅

Already in the app — things to do: Chongqing Zoo / 重庆动物园; Chongqing Science and Technology Museum / 重庆科技馆; Chongqing Natural History Museum / 重庆自然博物馆; Chongqing China Three Gorges Museum / 重庆中国三峡博物馆; Chongqing Happy Valley / 重庆欢乐谷; Chongqing Hanhai Ocean Park / 重庆汉海海洋公园; Hongyadong / 洪崖洞; Ciqikou Ancient Town / 磁器口古镇; Jiefangbei pedestrian street / 解放碑步行街; Yangtze River Cableway / 长江索道; Nanshan One Tree Viewing Platform / 南山一棵树观景台; Madame Tussauds Chongqing / 重庆杜莎夫人蜡像馆; Black Mountain Valley / 黑山谷; Chongqing People's Assembly Hall / 重庆人民大礼堂; Wansheng Stone Forest / 万盛石林; E'ling Park; Light Rail Line 2 at Liziba Station; Pan Xiaobao Indoor Play and Learning Park / 盘小宝重庆店

### kz-astana — Astana and Burabay (Kazakhstan)
Area covered: Astana and Burabay (also known as / includes: astana, nur-sultan, burabay, borovoe)

Now in the app: 13 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Saksaul / Саксаул; Arnau / Арнау; Navat / Нават; Qazaq Gourmet; Line Brew; Rixos Borovoe; Wyndham Garden Burabay; Khan Shatyr Food Court / Хан Шатыр; MEGA Silk Way Food Court / MEGA Silk Way; Coffee Boom; Marrone Rosso; Cappuccino; TomYumBar

Already in the app — things to do: Ailand oceanarium / Ailand (Duman) океанариум; DinoWorld; Nur Alem sphere museum / Нұр Әлем; Baiterek tower / Бәйтерек; Astana Botanical Garden / Ботанический сад Астаны; Presidential Park / Президентский парк; National Museum of Kazakhstan / Национальный музей Республики Казахстан; Astana Circus / Астанинский цирк; Khan Shatyr entertainment centre / Хан Шатыр; Happylon family amusement park; Independence Palace / Тәуелсіздік сарайы; Nursultan Mosque / Нұрсұлтан мешіті; Mangilik El Triumphal Arch / Мәңгілік Ел салтанат арқасы; Uly Dala Eli Monument / Ұлы Дала Елі; Kidburg / КидБург; Baby BOOM; Bee Karting

### np-kathmandu — Kathmandu and the Himalaya (Nepal)
Area covered: Kathmandu and the Himalaya (also known as / includes: kathmandu, pokhara, bhaktapur, chitwan, everest, annapurna)

Now in the app: 19 places to eat, 11 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: OR2K; Fire and Ice Pizzeria; Yangling Tibetan Restaurant; Rosemary Kitchen & Coffee Shop; Roadhouse Cafe Thamel; Thamel House Restaurant; Bhojan Griha; Moondance Restaurant; Caffe Concerto; Pokhara Thakali Kitchen; Honacha; Labim Mall; Pumpernickel Bakery; Himalayan Java Coffee; The Juicery Cafe; am/pm Organic Cafe; Jimbu Thakali by Capital Grill; Alice Restaurant; Kaiser Café

Already in the app — things to do: Garden of Dreams / स्वप्नबगैँचा; Central Zoo, Jawalakhel / केन्द्रीय चिडियाखाना; Chandragiri Hills cable car / चन्द्रागिरि केबलकार; Patan Durbar Square and Patan Museum / पाटन संग्रहालय; Bhaktapur old town walk / भक्तपुर; Whoopee Land amusement and water park; Godawari Botanical Garden / राष्ट्रिय वनस्पति उद्यान; Swayambhunath (Monkey Temple); Shivapuri Nagarjun National Park; Kathmandu Durbar Square; Pottery Square
