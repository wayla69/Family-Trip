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

### in-golden — Delhi, Agra and Jaipur (India)
Area covered: Delhi, Agra and Jaipur (also known as / includes: delhi, new delhi, agra, taj mahal, jaipur, rajasthan)

Now in the app: 20 places to eat, 24 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Karim's; Saravana Bhavan; Moti Mahal; United Coffee House; Haldiram's Chandni Chowk; Dilli Haat INA; Wenger's; Pinch of Spice; Shankara Vegis Restaurant; Maya Restaurant; Panchhi Petha; Laxmi Mishthan Bhandar; Niros; Chokhi Dhani; Masala Chowk; Rawat Mishthan Bhandar; Lassiwala; Tapri Central; Anokhi Café; 1135 AD

Already in the app — things to do: Taj Mahal; Agra Fort; Mehtab Bagh; Red Fort; Lodhi Garden; Dilli Haat INA; National Science Centre; National Rail Museum; Amber Fort; Hawa Mahal; Jantar Mantar; Albert Hall Museum; Humayun's Tomb; Sunder Nursery; City Palace, Jaipur; Playhouse by Essex Farms; Anokhi Museum of Hand Printing; Nahargarh Fort; Galtaji, the Monkey Temple / Galta Ji; Jawahar Circle garden; Jungle Doodle Kids Zone; Sur Sarovar Bird Sanctuary / Soor Sarovar; Dolphin Water Park; Wildlife SOS Elephant Conservation and Care Centre

### jp-takayama — Takayama, Shirakawa-go and Nagoya (Japan)
Area covered: Takayama, Shirakawa-go and Nagoya (also known as / includes: takayama, shirakawa-go, shirakawago, hida, gero, nagoya)

Now in the app: 26 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Maruaki / 丸明 飛騨高山店; Ajikura Tengoku / 味蔵天国; Suzuya / 寿々や; Kyoya / 京や; Irori / いろり; Atsuta Horaiken Honten / あつた蓬莱軒 本店; Yabaton Yabacho Honten / 矢場とん 矢場町本店; Yamamotoya Sohonke / 山本屋総本家 本家; Miyagawa Morning Market / 宮川朝市; Hida Kotte Ushi / 飛騨こって牛; Osu Shopping Street / 大須商店街; Ochudo / 落人; Komeda's Coffee Honten / コメダ珈琲店 本店; Konparu Osu Honten / コンパル 大須本店; Hida Takayama Gyoza Sohonzan; Center4 Hamburgers; EVILTEX Hamburgers & Tex-Mex; Jakson Curry & Coffee; Hida Beef Curry House; Chacha; Ebisu Soba; Kitchen Hida; Hida Premium Beef Sushi; Jingoroh Ramen Main Restaurant; Debumaru Takayama Branch 2; Ebihachi

Already in the app — things to do: Hida Folk Village / 飛騨の里; Miyagawa and Jinya-mae morning markets / 宮川朝市・陣屋前朝市; Takayama Jinya / 高山陣屋; Takayama Festival Floats Exhibition Hall / 高山祭屋台会館; Sanmachi Suji old town streets / さんまち通り; Higashiyama Walking Course and Shiroyama Park / 東山遊歩道・城山公園; Hida Takayama Teddy Bear Eco Village / 飛騨高山テディベアエコビレッジ; Ogimachi village, Shirakawa-go / 白川郷 荻町; Gassho-zukuri Minkaen open-air museum / 白川郷合掌造り民家園; LEGOLAND Japan / レゴランド・ジャパン; Port of Nagoya Public Aquarium / 名古屋港水族館; SCMAGLEV and Railway Park / リニア・鉄道館; Nagoya Castle / 名古屋城; Higashiyama Zoo and Botanical Gardens / 東山動植物園; Ghibli Park / ジブリパーク; Harayama Citizens' Park / 原山市民公園; Alps Viewpoint Sky Park / アルプス展望公園 スカイパーク; Hida Great Limestone Cave / 飛騨大鍾乳洞

### ph-bohol — Bohol and Cebu (Philippines)
Area covered: Bohol and Cebu (also known as / includes: bohol, chocolate hills, panglao, cebu, loboc, mactan)

Now in the app: 22 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Bohol Bee Farm Restaurant; Gerarda's Family Restaurant; Rio Verde Floating Restaurant; Giuseppe Pizzeria & Sicilian Roast; Payag Restaurant; Rico's Lechon; House of Lechon; Casa Verde; Cafe Laguna; Larsian sa Fuente; Sugbo Mercado; Jojie's Painitang Bol-anon; The Buzzz Cafe; Shaka Bohol; Abaca Baking Company; Bohol Bee Farm; Overgrown; Giuseppe; Sushihan; Bougainvillea; Bollywood; Tavolata by Abaca

Already in the app — things to do: Chocolate Hills; Philippine Tarsier Sanctuary; Loboc River Cruise; Hinagdanan Cave; Bohol Python and Butterfly Sanctuary; Fort San Pedro; Tops Lookout; Cebu Safari and Adventure Park; Mag-Aso Falls; Dimiao Twin Falls; Bohol Bee Farm; Nova Shell Museum; Alona Beach; Island hopping to Balicasag and Virgin Island; National Museum of the Philippines, Bohol; Sagbayan Peak; Bohol Hanging Bridge; Balicasag Marine Sanctuary; Bohol Man-made Forest; Blood Compact Shrine; Bohol Beach Club; PlayMaze

### pl-krakow — Kraków (Poland)
Area covered: Kraków (also known as / includes: krakow, cracow, wawel, zakopane, wieliczka, warsaw)

Now in the app: 25 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Pod Wawelem Kompania Kuflowa; Morskie Oko; Pod Aniołami; Miód Malina; Restauracja Starka; Kuchnia u Doroty; Pierogarnia Krakowiacy; Czarna Kaczka; Ariel; Bar Mleczny Pod Temidą; Polakowski; Plac Nowy Okrąglak; Good Lood; Café Camelot; Nowa Prowincja; Charlotte Chleb i Wino; Biała Róża; Kogel Mogel; Cafe Oranżeria; Farina; Amarylis Restaurant; Szara Gęś w Kuchni; Orangery; ORZO; Pół na Pół

Already in the app — things to do: Wawel Royal Castle / Zamek Królewski na Wawelu; Rynek Underground; Barbican / Barbakan; Wieliczka Salt Mine / Kopalnia Soli Wieliczka; Museum of Engineering and Technology, tram depot / Muzeum Inżynierii i Techniki, Zajezdnia; Polish Aviation Museum / Muzeum Lotnictwa Polskiego; Kościuszko Mound / Kopiec Kościuszki; Henryk Jordan Park / Park Jordana; Kraków Christmas Market / Jarmark Bożonarodzeniowy; Vistula river cruise / Rejs po Wiśle; Kraków Zoo / Ogród Zoologiczny w Krakowie; Stanisław Lem Garden of Experiences / Ogród Doświadczeń im. Stanisława Lema; Energylandia (Zator) / Energylandia; Kraków Water Park / Park Wodny w Krakowie; Dragon's Den / Smocza Jama; Sukiennice (Cloth Hall) art gallery / MNK Sukiennice; GOjump! indoor playground / GoJump; Kraków Pinball Museum; House of Attractions
