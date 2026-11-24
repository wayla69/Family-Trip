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

### gb-lakes — The Lake District (United Kingdom)
Area covered: The Lake District (also known as / includes: lake district, windermere, ambleside, grasmere, keswick, bowness)

Now in the app: 21 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Zeffirellis; Dodds Restaurant; The Angel Inn; Hole in t' Wall; The Queen's Head; Tower Bank Arms; The Dog & Gun; The Black Bull Inn; The Old Keswickian; Wilf's Café; Tebay Services; The Grasmere Gingerbread Shop; The Apple Pie; Chesters by the River; Boardwalk Bar & Grill; Villa Positano; YHA Ambleside café; Cuckoo Brow Inn; The Kellbank; Boot Inn; Woolpack Inn

Already in the app — things to do: Lakes Aquarium; Windermere Lake Cruises; The World of Beatrix Potter; Windermere Jetty Museum; Brockhole on Windermere; Rheged Centre; Keswick Museum and Art Gallery; Whinlatter Forest; Ravenglass and Eskdale Railway; Lakeland Wildlife Oasis; Hill Top; Muncaster Castle, Gardens and Hawk and Owl Centre; Ullswater Steamers; Lakeland Motor Museum; Tarn Hows; Wray Castle; Lowther Castle and Gardens; Allan Bank; Lake District Wildlife Park; Alpacaly Ever After; Wastwater Alpaca Trekking; Steam Yacht Gondola; Lakeside and Haverthwaite Railway; Puzzling Place; Derwent Pencil Museum; Kong Adventure; Millerground

### ge-tbilisi — Tbilisi and Kazbegi (Georgia)
Area covered: Tbilisi and Kazbegi (also known as / includes: tbilisi, kazbegi, stepantsminda, gergeti, mtskheta, signagi)

Now in the app: 21 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Shavi Lomi / შავი ლომი; Salobie Bia; Pasanauri; Machakhela; Zakhar Zakharich; Keto and Kote; Maspindzelo; Sofia Melnikova's Fantastic Douqan; Tsiskvili; Rooms Hotel Kazbegi; Dezerter Bazaar; Fabrika; Funicular Restaurant; Entrée; Luca Polare; Puri Guliani; Cafe Daphna; Lolita; Sakhachapure N1 (Galleria Tbilisi); Café Leila; Cafe Monastery (Dariali)

Already in the app — things to do: Tbilisi Zoo; Mtatsminda Park / მთაწმინდის პარკი; Rike Park–Narikala cable car; Dry Bridge Market; Open Air Museum of Ethnography; Tbilisi Sea; Georgian National Museum / საქართველოს ეროვნული მუზეუმი; National Botanical Garden of Georgia / საქართველოს ეროვნული ბოტანიკური ბაღი; Mushtaidi Garden and Children’s Railway / მუშთაიდის ბაღი; Mziuri Park / მზიური; Gabriadze Theatre clock tower / გაბრიაძის თეატრის კოშკი; Tbilisi History Museum; Tbilisi Auto Museum; Museum of Georgian Weaponry; Museum of Illusions Tbilisi; Experimentorium Science Museum; Gino Paradise Water Park; Vake Park; Turtle Lake; Gergeti Trinity Church; Leghvtakhevi waterfall; Bridge of Peace; Sioni Basilica; Giant stone heads of Sno; Zakagori Fortress; Dariali Monastery; Ioane Natlismcemeli monastery

### jp-nagano — Nagano and Matsumoto (Japan)
Area covered: Nagano and Matsumoto (also known as / includes: nagano, matsumoto, kamikochi, togakushi, hakuba, azumino)

Now in the app: 26 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Fujikian / 藤木庵; Kadono Daimaru / かどの大丸; Meijitei Nagano Station / 明治亭 長野駅ビルMIDORI店; Chikufudo Zenkoji Daimon / 竹風堂 善光寺大門店; Enza Cafe / 猿座カフェ; Kobayashi Soba / こばやし本店; Soba Takagi / そば処 たかぎ; Ogawa-no-Sho Oyaki Mura Daimon / 小川の庄 おやき村 大門店; Zenkoji Nakamise Street / 善光寺 仲見世通り; Nawate Street / 縄手通り; Heigoro Honten / 平五郎 本店; Yokomachi Cafe Yawataya Isogoro / 八幡屋礒五郎 横町カフェ; Coffee Marumo / 珈琲まるも; Masamura / マサムラ 本店; Gosenjaku Kitchen; Gyoza no Ohsho Alpico Plaza Matsumoto; CAFE SWEET Nawate Street; Korean BBQ Namsan Nagano Terminal East Entrance; Saizeriya; Sky Restaurant Hakuba; Keitei / 桂亭; Soba Asada / あさ田; Soba Club Sasaki; Kawasho; Temariya; Coffee Bigaku Abe

Already in the app — things to do: Jigokudani Snow Monkey Park / 地獄谷野猿公苑; Matsumoto Castle / 松本城; Daio Wasabi Farm / 大王わさび農場; Alps Azumino National Government Park, Horigane and Hotaka area / 国営アルプスあづみの公園 堀金・穂高地区; Nagano Chausuyama Zoo / 茶臼山動物園; Togakushi Chibikko Ninja Village / 戸隠 チビッコ忍者村; Matsumoto City Alps Park / 松本市アルプス公園; Nawate-dori and Nakamachi streets / 縄手通り・中町通り; Nagano City Museum and Planetarium / 長野市立博物館; Matsumoto City Museum / 松本市立博物館; Japan Ukiyo-e Museum / 日本浮世絵博物館; Narai-juku post town / 奈良井宿; Matsumoto City Museum of Art / 松本市美術館; Ikenotaira Family Land / 白樺高原 池の平ファミリーランド; Nagano Prefectural Art Museum / 長野県立美術館; Nakamise-dori street / 仲見世通り; Forest Adventure Nagano; Shiga Fossil House; Ta Kagi; Japan Radio Museum; Ishii Miso Brewery; Zenkoji Temple / 善光寺

### cl-santiago — Santiago and Valparaíso (Chile)
Area covered: Santiago and Valparaíso (also known as / includes: santiago de chile, santiago, valparaiso, vina del mar, cajon del maipo, pomaire)

Now in the app: 24 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Donde Augusto; Galindo; Divertimento Chileno; Tiramisú; Las Vacas Gordas; Confitería Torres; Café Turri; Casino Social J. Cruz; Tierra de Fuego; La Vega Central; Dominó; Patio Bellavista; Emporio La Rosa; Café del Poeta; Gino Lautaro; La Argentina (Barrio Italia); Neko-San; DeCalle; Parigó; Dipsy’s Backyard; El Portal Exbahamondes; Café Estación; Oiso; Casa Regina

Already in the app — things to do: Zoológico Nacional (Metropolitan Park) / Zoológico Nacional; Museo Interactivo Mirador (MIM); Buin Zoo; Sky Costanera viewpoint; Teleférico and funicular, San Cristóbal hill / Teleférico y Funicular Santiago; National Museum of Natural History / Museo Nacional de Historia Natural; Santiago Railway Museum / Museo Ferroviario; Artequin art museum for children / Museo Artequin; Chilean Museum of Pre-Columbian Art / Museo Chileno de Arte Precolombino; Cerro Santa Lucía; Wonder Park Maipú; Quinta Normal park pool / Piscina del Parque Quinta Normal; Mercado Central; Parque Quinta Vergara; La Sebastiana (Neruda's house) / Museo La Sebastiana; Fantasilandia; Parque Araucano; Parque Bicentenario, Vitacura; KidZania Santiago; Biblioteca de Santiago; Ascensor Concepción; Ascensor Artillería; Paseo 21 de Mayo; National Maritime Museum / Museo Marítimo Nacional; Mercado Puerto
