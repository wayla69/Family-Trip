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

### jp-hiroshima — Hiroshima, Miyajima and Kobe (Japan)
Area covered: Hiroshima, Miyajima and Kobe (also known as / includes: hiroshima, miyajima, itsukushima, kobe, okayama, himeji)

Now in the app: 22 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Micchan Sohonten Hatchobori / みっちゃん総本店 八丁堀本店; Nagataya / 長田屋; Anagomeshi Ueno / あなごめし うえの; Yakigaki no Hayashi / 焼がきのはやし; Kakiya / 牡蠣屋; Steakland Kobe / ステーキランド 神戸館; Grill Ippei Motomachi / グリル一平 元町店; Bekkan Botanen / 別館牡丹園; Okonomimura / お好み村; Miyajima Omotesando Shopping Street / 宮島表参道商店街; Nankinmachi Chinatown / 南京町; Hiroshima Andersen / 広島アンデルセン; Momijido Honten / 紅葉堂 本店; Kobe Nishimura Coffee Nakayamate Honten / 神戸にしむら珈琲店 中山手本店; Freundlieb / フロインドリーブ; Chano-ma Hiroshima / チャノマ 広島; mycafe / マイカフェ; All Day Dining Fruitier / オールデイダイニング フリュティエ; Cafe 1400 / カフェ1400; Cafe Flowery / カフェフロウリー; Italian Kitchen Bansan Parti Fujisaka / イタリアンキッチン バンサン パルティ・フジ坂店; Marina Mario Espresso / マリーナ マリオ エスプレッソ

Already in the app — things to do: Peace Memorial Park / 平和記念公園; Hiroshima Peace Memorial Museum / 広島平和記念資料館; Hiroshima Castle grounds / 広島城; Hiroshima City Asa Zoological Park / 広島市安佐動物公園; Miyajima Ropeway to Mount Misen / 宮島ロープウェー; Shukkeien Garden / 縮景園; Hiroshima Orizuru Tower / おりづるタワー; Okonomimura / お好み村; Kobe Anpanman Children's Museum and Mall / 神戸アンパンマンこどもミュージアム&モール; Himeji Castle / 姫路城; Kobe Suma Sea World / 神戸須磨シーワールド; Kobe Nunobiki Herb Garden and Ropeway / 神戸布引ハーブ園/ロープウェイ; Okayama Korakuen Garden / 岡山後楽園; Meriken Park, Kobe / メリケンパーク; Kobe Port Tower / 神戸ポートタワー; Miyajima Aquarium; 5-Days Children's Cultural Science Museum / ５－Ｄａｙｓこども文化科学館; Kodomocchi Park Kobe Park / こどもっちパーク こうべパーク; Bornelund Asobi no Sekai (Gakuen-minami) / あそびのせかい 学園南店; Bornelund Asobi no Sekai (Marine Pia Kobe) / あそびのせかい マリンピア神戸店

### ke-mara — Nairobi and the Masai Mara (Kenya)
Area covered: Nairobi and the Masai Mara (also known as / includes: masai mara, maasai mara, nairobi, mara river, naivasha, amboseli)

Now in the app: 22 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Carnivore; Talisman; Mama Oliech; Habesha; Open House; Fogo Gaucho; CJ's; Mara Serena Safari Lodge; Keekorok Lodge; Village Market Food Court; Sarit Centre Food Court; Java House; Artcaffé; Pili Restaurant (GTC Mall); Hunger's Nest; Bao Box; Bwibo Restaurant; Zen Garden; Golden Star Restaurant; Under the Swahili Tree; Red Ginger; Tamambo (Tatu City)

Already in the app — things to do: Nairobi National Park; Nairobi Safari Walk and Animal Orphanage; Giraffe Centre; Sheldrick Elephant Orphanage; Nairobi National Museum and Snake Park; Karen Blixen Museum; Karura Forest; Nairobi Arboretum; Kazuri Beads Centre; Maasai Market; Hell's Gate National Park; Crescent Island Game Sanctuary; Maasai Mara National Reserve; Maasai Mara hot air balloon flight; Nairobi Gallery; Ngong Hills; Uhuru Gardens; Nairobi Railway Museum; John Michuki Memorial Park; City Park

### us-chicago — Chicago (United States)
Area covered: Chicago (also known as / includes: chicago, navy pier, millennium park, lake michigan, field museum, magnificent mile)

Now in the app: 21 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Lou Malnati's Pizzeria; Giordano's; Pizzeria Uno; Gino's East; The Berghoff; Lou Mitchell's; Wildberry Pancakes and Cafe; R.J. Grunts; Portillo's; Al's #1 Italian Beef; Eataly Chicago; Chicago French Market; Garrett Popcorn Shops; Stan's Donuts & Coffee; Margie's Candies; Little Goat Diner; Parson's Chicken & Fish (Logan Square); Beatrix (River North); Sterling Food Hall; Eleven City Diner; The Original Rainbow Cone (Navy Pier)

Already in the app — things to do: Shedd Aquarium; The Field Museum; Adler Planetarium; Griffin Museum of Science and Industry; Chicago Children's Museum; Lincoln Park Zoo; Peggy Notebaert Nature Museum; Art Institute of Chicago; Millennium Park and Cloud Gate; Maggie Daley Park; Navy Pier Centennial Wheel; Lincoln Park Conservatory; Garfield Park Conservatory; Chicago Riverwalk; Christkindlmarket Chicago; Brookfield Zoo Chicago; Bronzeville Children's Museum; Color Factory Chicago; Skydeck Chicago; American Writers Museum; Pier Park

### uz-tashkent — Tashkent and the Chimgan mountains (Uzbekistan)
Area covered: Tashkent and the Chimgan mountains (also known as / includes: tashkent, chimgan, charvak, chorvoq)

Now in the app: 21 places to eat, 21 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Besh Qozon; Caravan; Afsona; Sim-Sim; Rayhon / Rayhon Milliy Taomlar; Jumanji; Bibigon / Бибигон; Gruzinskiy Dvorik / Грузинский дворик; Shashleek; Chorsu Bazaar / Chorsu bozori; Alay Bazaar / Oloy bozori; Milliy Taomlar (National Food) / Milliy Taomlar; Bon!; Breadly; Safia; Ribambelle (Tashkent City Mall); Benedict; Gōsht (Mirobod); Yuzhanin; Tanuki (Tashkent City Mall); JUNE

Already in the app — things to do: Magic City park / Magic City; Magic Safari; Tashkent Zoo / Toshkent hayvonot bogʻi; Japanese Garden / Yapon bogʻi; Chorsu Bazaar / Chorsu bozori; Tashkent TV Tower / Toshkent teleminorasi; Center of Islamic Civilization museum / Islom sivilizatsiyasi markazi; Tashkent metro stations / Toshkent metropoliteni; Amir Temur Square / Amir Temur xiyoboni; Tashkent City Park / Tashkent City; Ice City rink / Ice City; Beldersay cable car, Chimgan / Beldersoy; Charvak reservoir / Chorvoq suv ombori; Dino Park at Tashkent Zoo / Dino Park; Uzbek National Puppet Theatre / Ўзбек миллий қўғирчоқ театри; Sky Park, Tashkent City Mall; Hello Park interactive play; Tashkent Planetarium; Museum of Telecommunication History; Independence Square / Mustaqillik Maydoni; Hazrati Imam complex / Hazrati Imom
