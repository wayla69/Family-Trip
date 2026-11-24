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

### au-cairns — Cairns and the Great Barrier Reef (Australia)
Area covered: Cairns and the Great Barrier Reef (also known as / includes: cairns, great barrier reef, port douglas, daintree, kuranda)

Now in the app: 18 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Prawn Star; Dundee's Restaurant on the Waterfront; Ochre Restaurant; Perrotta's at the Gallery; Bayleaf Balinese Restaurant; Salt House; Salsa Bar & Grill; The Tin Shed; Vivo Palm Cove; Rusty's Markets; Cairns Night Markets; Mocka's Pies; Muddy's Cafe; Petit Cafe Kuranda; Daintree Ice Cream Company; Gelocchio; Cazalys; Wharf One Cafe

Already in the app — things to do: Cairns Aquarium; Cairns Esplanade Lagoon; Cairns Esplanade playgrounds; Cairns Botanic Gardens and Flecker Garden; Kuranda Scenic Railway; Green Island ferry day; Fitzroy Island day trip; Hartley's Crocodile Adventures; Rusty's Markets; Cairns Night Markets; Birdworld Kuranda; Australian Butterfly Sanctuary; Cairns Museum; Cairns Art Gallery; Rainforestation Nature Park; Sugarworld Waterpark; Crystal Cascades; Skyrail Rainforest Cableway

### es-seville — Seville and Granada (Spain)
Area covered: Seville and Granada (also known as / includes: seville, sevilla, granada, alhambra, cordoba, malaga)

Now in the app: 18 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: El Rinconcillo; Taberna Coloniales; San Marco Santa Cruz; Las Golondrinas; Los Manueles; Restaurante Chikito; Carmela Restaurante; Mirador de Morayma; Kiosko Las Titas; Mercado Lonja del Barranco; Mercado de Triana; Mercado San Agustín; Confitería La Campana; Bar El Comercio; Heladería Los Italianos; Café Fútbol; La Escaloná; Arte y Sabor

Already in the app — things to do: Royal Alcázar of Seville / Real Alcázar de Sevilla; Alhambra and Generalife / La Alhambra y Generalife; Isla Mágica; Seville Aquarium / Acuario de Sevilla; Parque de las Ciencias; Metropol Parasol (the Setas) / Metropol Parasol; María Luisa Park and Plaza de España / Parque de María Luisa; Guadalquivir river cruise / Cruceros Torre del Oro; Aquaola water park / Aquaola; Casa de Pilatos; Torre del Oro; Triana Market / Mercado de Triana; Albaicín and Mirador de San Nicolás (Granada) / Albaicín; Itálica Roman ruins / Conjunto Arqueológico de Itálica; Alamillo Park / Parque del Alamillo; Seville Cathedral and the Giralda / Catedral de Sevilla; CajaGranada museum (Memoria de Andalucía); Botanical Garden of the University of Granada

### jp-hakone — Hakone (Japan)
Area covered: Hakone (also known as / includes: hakone, lake ashi, owakudani, gora, karuizawa, kawaguchiko)

Now in the app: 18 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Hatsuhana Soba Honten / はつ花そば 本店; Yubadon Naokichi / 湯葉丼 直吉; Tamura Ginkatsutei / 田むら銀かつ亭; Gyoza Center / 餃子センター; La Terrazza Ashinoko / ラ・テラッツァ 芦ノ湖; Shika-jaya / 知客茶家; Box Burger Miyagino Honten / BOX BURGER 宮城野本店; Owakudani Kurotamagokan / 大涌谷くろたまご館; Suzuhiro Kamaboko Village / 鈴廣かまぼこの里; Hakone-Yumoto Station Shopping Street / 箱根湯本駅前商店街; Bakery & Table Hakone / ベーカリー&テーブル 箱根; Amazake-chaya / 甘酒茶屋; Watanabe Bakery / 渡邊ベーカリー; Fujiya Hotel Bakery & Sweets Picot / 富士屋ホテル ベーカリー&スイーツ ピコット; Chimoto Ekimae-dori / 湯もち本舗 ちもと 駅前通り店; Naraya Cafe; Hakone no Mori Pancake; Hakone Sushi / はこねずし

Already in the app — things to do: Hakone Open-Air Museum / 彫刻の森美術館; Hakone Ropeway to Owakudani / 箱根ロープウェイ; Hakone Pirate Ship cruise on Lake Ashi / 箱根海賊船; Hakone Gora Park / 箱根強羅公園; Hakone Tozan Railway / 箱根登山電車; Hakone Tozan Cable Car / 箱根登山ケーブルカー; Hakone Kowakien Yunessun / 箱根小涌園ユネッサン; Hakone-en Aquarium / 箱根園水族館; Hakone Komagatake Ropeway / 箱根駒ヶ岳ロープウェー; Hakone Venetian Glass Museum / 箱根ガラスの森美術館; Pola Museum of Art / ポーラ美術館; Sengokuhara pampas grass fields / 仙石原すすき草原; Hakone Checkpoint and museum / 箱根関所; Odawara Castle / 小田原城; Suzuhiro Kamaboko Museum and workshop / 鈴廣かまぼこの里; Forest Adventure Hakone; Hakone Shrine / 箱根神社; Hakone Kamon day plan / 箱根 花紋

### th-nakhonsi — Nakhon Si Thammarat and Khanom (Thailand)
Area covered: Nakhon Si Thammarat and Khanom (also known as / includes: nakhon si thammarat, khiriwong, khanom beach, sichon)

Now in the app: 11 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Krua Nakhon / ครัวนคร; Khanom Jeen Mueang Khon / ขนมจีนเมืองคอน; Chao Ruea / ชาวเรือ; Krua Nai Nang / ครัวนายหนัง; Ao Khanom Seafood / อ่าวขนอมซีฟู้ด; Na Phra That Saturday Market / หลาดหน้าพระธาตุ; Central Nakhon Si food court / ศูนย์อาหาร เซ็นทรัล นครศรี; Kopi / โกปี๊; Hao Coffee / เฮาคอฟฟี่; Likor Baan Tham Khanom / ลิกอร์ บ้านทำขนม; Swansea Cafe

Already in the app — things to do: Nakhon Si Thammarat National Museum / พิพิธภัณฑสถานแห่งชาติ นครศรีธรรมราช; Walailak University Botanical Garden / อุทยานพฤกษศาสตร์ มวล.; Hat Khanom–Mu Ko Thale Tai National Park / อุทยานแห่งชาติหาดขนอม-หมู่เกาะทะเลใต้; Khao Luang National Park / อุทยานแห่งชาติเขาหลวง; Phrom Lok Waterfall / น้ำตกพรหมโลก; Suchart Subsin shadow-puppet workshop; Wat Phra Mahathat Woramahawihan; Hat Sichon; Hat Nai Phlao; Hat Hin Ngam; Ban Wang Hon bamboo rafting; Hat Sai Kaeo Museum; Namtok Sunantha (Khao Nan National Park); Krung Ching hot spring; Thong Yee Bay; Ao Telet Wooden Bridge / สะพานไม้อ่าวเตล็ด; Tha Phae Waterfall / น้ำตกท่าแพ; Khao Wang Thong Cave / ถ้ำเขาวังทอง; Wynd Voyage; Nakhon Si Thammarat City Museum / พิพิธภัณฑ์เมืองนครศรีธรรมราช; Buddhism Park / อุทยานพระพุทธศาสนา; Mahanakhon Walking Street / มาหานคร; Pancake Rock / เขาหินพับผ้า; Khao Sun Viewpoint / จุดชมวิวทะเลหมอกเขาศูนย์; Thung Song Water Park / สวนน้ำทุ่งสง วอเตอร์พาร์ค
