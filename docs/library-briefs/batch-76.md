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

### jp-yokohama — Yokohama and Kamakura (Japan)
Area covered: Yokohama and Kamakura (also known as / includes: yokohama, enoshima, minato mirai, minatomirai, shonan, enoden)

Now in the app: 24 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Manchinro Honten / 萬珍樓 本店; Katsuretsu-an Bashamichi Sohonten / 勝烈庵 馬車道総本店; Center Grill / センターグリル; The Cafe Hotel New Grand / ホテルニューグランド ザ・カフェ; Yoshimuraya / 家系総本山 吉村家; Bills Yokohama Red Brick Warehouse / bills 横浜赤レンガ倉庫; Kamakura Matsubara-an / 鎌倉 松原庵; Shirasuya Koshigoe Gyoko-mae / しらすや 腰越漁港前店; Tobiccho Honten / とびっちょ 本店; Shin-Yokohama Ramen Museum / 新横浜ラーメン博物館; Edosei Honten / 江戸清 中華街本店; Komachi-dori / 小町通り; Pompadour Motomachi Honten / ポンパドウル 元町本店; Bashamichi Jubankan / 馬車道十番館; Toshimaya Honten / 豊島屋 本店; Iwata Coffee / イワタコーヒー店; Babel Bayside Kitchen / バベル ベイサイド キッチン; Aloha Table Yokohama Bay Quarter / アロハテーブル 横浜ベイクォーター; COLONIAL BEACH Yokohama Hammerhead / COLONIAL BEACH 横浜ハンマーヘッド; Bubby's Landmark Plaza / バビーズ ランドマークプラザ; Kamakura Kaigai Table / 鎌倉海街テーブル; toi toi toi / トイ トイ トイ; Gather @ Eating House; Yamatoya (Yokohama) / 大和屋 横浜店

Already in the app — things to do: Yokohama Anpanman Children's Museum / 横浜アンパンマンこどもミュージアム; Cupnoodles Museum Yokohama / カップヌードルミュージアム 横浜; Yokohama Hakkeijima Sea Paradise / 横浜・八景島シーパラダイス; Enoshima Aquarium / 新江ノ島水族館; Nogeyama Zoo / 野毛山動物園; Yokohama Zoological Gardens Zoorasia / よこはま動物園ズーラシア; Hara Model Railway Museum / 原鉄道模型博物館; Nippon Maru sailing ship and Yokohama Port Museum / 帆船日本丸・横浜みなと博物館; Enoshima Sea Candle and Samuel Cocking Garden / 江の島シーキャンドル・江の島サムエル・コッキング苑; Yokohama Red Brick Warehouse / 横浜赤レンガ倉庫; Yamashita Park / 山下公園; Yokohama Chinatown / 横浜中華街; Yokohama Kodomo-no-kuni / こどもの国; Sankeien Garden / 三溪園; Komachi-dori food street / 小町通り; Enoden train ride, Kamakura to Enoshima / 江ノ電; Hamagin Children's Space Science Center / はまぎん こども宇宙科学館; Yokohama Cosmo World / よこはまコスモワールド; TOYLO PARK, Lalaport Yokohama / TOYLO PARK powered by リトルプラネット イトーヨーカドー ららぽーと横浜; Kanazawa Zoological Gardens; Osanbashi Pier

### us-hawaii — Hawaii (United States)
Area covered: Hawaii (also known as / includes: hawaii, honolulu, oahu, waikiki, maui, big island)

Now in the app: 17 places to eat, 28 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Duke's Waikiki; Hula Grill Waikiki; Eggs 'n Things; Helena's Hawaiian Food; Paia Fish Market; Ken's House of Pancakes; Marukame Udon Waikiki; Rainbow Drive-In; Giovanni's Shrimp Truck; Leonard's Bakery; Matsumoto Shave Ice; Island Vintage Coffee; Ululani's Hawaiian Shave Ice; Kahuku Farms; Liliha Bakery (International Market Place); Monkeypod Kitchen (Waikiki); Makahiki (Aulani)

Already in the app — things to do: Honolulu Zoo; Waikiki Aquarium; Hawaii Children's Discovery Center; Bishop Museum; Sea Life Park Hawaii; Hanauma Bay Nature Preserve; Kapiolani Park; Diamond Head State Monument; Polynesian Cultural Center; Kualoa Ranch Jungle Expedition; Dole Plantation; Maui Ocean Center; Haleakalā National Park; Hawaiʻi Volcanoes National Park; Pana'ewa Rainforest Zoo and Gardens; Kīlauea Point National Wildlife Refuge; Lydgate Beach Park and Kamalani Playground; Waimea Valley; Pearl Harbor National Memorial; Byodo-In Temple; Kailua Beach Park; Ko Olina lagoons; Ala Moana Beach Park; Kuhio Beach; Aloha Stadium Swap Meet; Laniakea Beach (turtle beach); Mānoa Falls Trail; ʻIolani Palace

### fr-provence — Provence (France)
Area covered: Provence (also known as / includes: provence, avignon, arles, gordes, luberon, aix-en-provence)

Now in the app: 17 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: La Fourchette; L'Épicerie de Ginette; Chez Féraud; Chez Etienne; Chez Sauveur; Toinou Les Fruits de Mer; Les Halles d'Avignon; Marché de la place Richelme; Maison Weibel; Maison Béchard; Le Four des Navettes; Café de France; Chez Mamie; Kouk; Le 26; Côté Arènes; Au Jardin des Carmes

Already in the app — things to do: Pont du Gard; Carrières de Lumières; Château des Baux; Palais des Papes; Parc Spirou Provence; Ochre Trail / Sentier des Ocres; Arles Amphitheatre / Arènes d'Arles; Lavender Museum / Musée de la Lavande; Aix-en-Provence fruit and vegetable market; Château d'If; MuCEM / Mucem; Marseille Natural History Museum / Muséum d'histoire naturelle; Parc Borély; Roman Theatre of Orange / Théâtre antique d'Orange; L'Isle-sur-la-Sorgue market; Pont d’Avignon / Pont Saint-Bénezet; Rocher des Doms garden; Île de la Barthelasse; Musée départemental Arles antique; Fondation Vincent van Gogh Arles; Roman Theatre of Arles / Théâtre antique d’Arles; Cryptoportiques of Arles; Calisson museum (Roy René); Cézanne’s studio / Atelier de Cézanne; Lac de Peyrolles; Gulli Parc Aix-en-Provence; Palomano Aix-en-Provence

### gb-york — York and Yorkshire (United Kingdom)
Area covered: York and Yorkshire (also known as / includes: york, yorkshire, the shambles, whitby, harrogate, durham)

Now in the app: 24 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: The Star Inn the City; Drakes Fish & Chips; Il Paradiso del Cibo; Guy Fawkes Inn; Rustique; Double Dutch Pancake House; The Magpie Café; Trenchers; Wensleydale Creamery; Bizzie Lizzie's; Shambles Market Food Court; York Roast Co; Leeds Kirkgate Market; Bettys Café Tea Rooms York; Bettys Café Tea Rooms Harrogate; The Harbour Bar; Ambiente Tapas (Fossgate); SPARK:York; Brew & Brownie; Partisan; Trinacria; The Pig & Pastry; Robinsons Café; Rowntree Park Reading Café

Already in the app — things to do: National Railway Museum; JORVIK Viking Centre; York Castle Museum; Yorkshire Museum and Museum Gardens; Yorkshire Wildlife Park; York's Chocolate Story; Barley Hall; DIG: An Archaeological Adventure; Clifford's Tower; Shambles Market; Rowntree Park play area; Castle Howard; Eden Camp Modern History Museum; York City Walls; Flamingo Land; The Web Adventure Park; The Hole in Wand; Rainbows Ceramics; York Minster; Hollywood Bowl (Monks Cross)
