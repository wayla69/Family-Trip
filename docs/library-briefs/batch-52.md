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

### gb-london — London (United Kingdom)
Area covered: London (also known as / includes: london, westminster, thames, covent garden, camden, greenwich)

Already in the app — places to eat: Dishoom Covent Garden; Four Seasons; Gold Mine; Poppies Fish & Chips; The Golden Hind; Wahaca Covent Garden; Mother Mash; Hard Rock Cafe London; Royal China Baker Street; Wagamama Royal Festival Hall; Borough Market; Seven Dials Market; Harrods Food Halls; The Parlour at Fortnum & Mason; Bread Ahead; Peggy Porschen; Giraffe; Din Tai Fung; Dumpling's Legend; Cafe Murano; Heddon Street Kitchen; Roka Aldwych; Inko Nito; Kintan Oxford Circus; Darcie & May Green; Mercato Metropolitano; Arcade Food Hall Tottenham Court Road; Canteen Food Hall & Bar; Boxhall City; Science Museum cafe; Macaroni Penguin; Comptoir Libanais; Inamo Covent Garden; Koya Ko; Sarastro; The Top Hat; RedFarm; Maison Francois; Pizza East; Homeslice; Masala Zone; Gourmet Pizza Company; Homies on Donkeys; Bread Street Café; Toconoco Japanese Cafe; Brixton Village; Maltby Street Market; Camden Market; Brick Lane Market; Tao Tao Ju; Joy King Lau; Yauatcha City

Already in the app — things to do: Natural History Museum; Science Museum; ZSL London Zoo; Diana Memorial Playground; London Transport Museum; Young V&A; SEA LIFE London Aquarium; Tower of London; Horniman Museum and Gardens; Borough Market; Mudchute Park and Farm; Kew Gardens; London Eye; Changing the Guard; Coram's Fields; Battersea Park Children's Zoo; Hamleys; Hackney City Farm; Vauxhall City Farm; Spitalfields City Farm; Tate Modern; National Maritime Museum; Polka Theatre; Unicorn Theatre; Museum of the Home; Thames Clippers; Camden Market; British Museum; Museum of London Docklands; National Gallery; Imperial War Museum London; Hampstead Heath; Greenwich Park; Richmond Park; Battersea Park; Tumbling Bay Playground; Kentish Town City Farm; Sky Garden; Hyde Park and Kensington Gardens; Victoria Park (East London); Columbia Road Flower Market; Southbank Centre free events

### hk-hongkong — Hong Kong (Hong Kong)
Area covered: Hong Kong (also known as / includes: hong kong, kowloon, tsim sha tsui, mong kok, causeway bay, lantau)

Already in the app — places to eat: Tim Ho Wan Sham Shui Po / 添好運 深水埗; Mak's Noodle / 麥奀雲吞麵世家; Yat Lok / 一樂燒鵝; Maxim's Palace City Hall / 美心皇宮 大會堂; Ho Hung Kee / 何洪記; Tai Ping Koon / 太平館餐廳; Lan Fong Yuen / 蘭芳園; Lamma Rainbow Seafood Restaurant / 天虹海鮮酒家; Po Lin Monastery Vegetarian Kitchen / 寶蓮禪寺齋堂; Australia Dairy Company / 澳洲牛奶公司; Sing Heung Yuen / 勝香園; Lee Keung Kee North Point Egg Waffles / 利強記北角雞蛋仔; Tai Cheong Bakery / 泰昌餅家; Kam Wah Cafe / 金華冰廳; Kai Kai Dessert / 佳佳甜品; Yee Shun Milk Company / 港澳義順牛奶公司; Yum Cha; Duddell's; Tozzo; La Vache!; BluHouse; The Peak Lookout; Spices at The Repulse Bay; Honolulu; Swiss Cafe / 瑞士咖啡室; Hop Fat Cafe / 合發茶餐廳; Wing Lok Yuen; Ho Tak Kee; Tak Tou / 得島; Mr. Tree; Bathers; Explorer's Club Restaurant; The Conservatory; Cafe Roma; Jello & Mellow; The Sixteenth; FINI'S; Summer Palace; Kwan Kee Clay Pot Rice; Limewood; MeokBang BBQ Kidzone; Tree Café; Yakiniku Tabeyo; Luen Wah Cafe / 聯華茶餐廳; Kwong Ming Restaurant / 肥仔銘茶餐廳; Mido Cafe / 美都餐室; Tak Yu Restaurant / 德如茶餐廳; My Cup of Tea / 我杯茶; Luen Fat Restaurant / 聯發茶餐廳; Shui Kee Coffee / 瑞記咖啡; Sun Hang Yuen / 新香園; MD Cafe

Already in the app — things to do: Hong Kong Disneyland / 香港迪士尼樂園; Ocean Park / 香港海洋公園; Water World Ocean Park / 水上樂園; The Peak Tram and Sky Terrace 428 / 山頂纜車 · 凌霄閣摩天台428; Ngong Ping 360 / 昂坪360; Hong Kong Science Museum / 香港科學館; Hong Kong Space Museum / 香港太空館; Hong Kong Palace Museum / 香港故宮文化博物館; Hong Kong Wetland Park / 香港濕地公園; Star Ferry / 天星小輪; Hong Kong Tram (Ding Ding) / 香港電車; Hong Kong Park and Edward Youde Aviary / 香港公園 · 尤德觀鳥園; Hong Kong Zoological and Botanical Gardens / 香港動植物公園; Temple Street Night Market / 廟街夜市; Ladies' Market / 女人街; LEGOLAND® Discovery Centre Hong Kong; Kowloon Park; Victoria Park; Hong Kong Museum of Art; Repulse Bay Beach Children's Playground; Mount Austin Playground; Sai On Lane Children's Playground; Quarry Bay Park; Ap Lei Chau Park; Wan Chai Park; Lai Chi Kok Park; Cherry Street Park; Middle Road Children's Playground; Tung Chung North Park; Ma On Shan Park; Tai Po Waterfront Park; Sai Kung Waterfront Park; Tsing Yi Northeast Park; M+; Kadoorie Farm and Botanical Garden; Hong Kong Children’s Discovery Museum; Sai Ying Pun Waterfront Park; EpicLand; Ryze Hong Kong; Kiztopia Wan Chai; High Island Geo Trail; Playfield 5, Kai Tak Sports Park; Art Park, West Kowloon; Dragon’s Back Trail

### ae-dubai — Dubai (United Arab Emirates)
Area covered: Dubai (also known as / includes: dubai, deira, jumeirah, palm jumeirah, dubai marina, hatta)

Already in the app — places to eat: Al Ustad Special Kabab / الأستاذ سبيشل كباب; Arabian Tea House; Bu Qtair / بو قطير; Al Mallah / الملاح; Ravi Restaurant; Al Fanar Restaurant & Café / الفنار; Operation: Falafel; Aroos Damascus / عروس دمشق; Al Safadi / الصفدي; Al Hallab / الحلاب; Time Out Market Dubai; The Dubai Mall Food Court; SALT; Bateel Café; Filli Café; Home Bakery; Reform Social & Grill; Ribambelle; Wavehouse; Luigia; Konjiki Hototogisu; Eataly Dubai Mall; The Cheesecake Factory; 3Fils; Bait Maryam; Wagamama Dubai Mall; Shake Shack Dubai Mall; The Bhukkad Café; La Serre Boulangerie; Crunch Dubai; Twiggy Family; Hyperama; Pepe Cucina; The Garden Project; Eggspectation; Al Baba Sweets; Al Samadi Sweets; Qwaider Al Nabulsi; Neighbourhood Food Hall; Depachika; The Market Island; Culinara Social Dining; Wok In; Baker & Spice; The Sum of Us; Ripe Market

Already in the app — things to do: Dubai Aquarium & Underwater Zoo / دبي أكواريوم وحديقة الحيوانات المائية; Dubai Safari Park / دبي سفاري بارك; KidZania Dubai; LEGOLAND Dubai; The Green Planet; Dubai Frame / برواز دبي; Dubai Miracle Garden; Dubai Butterfly Garden; The Dubai Fountain; At the Top, Burj Khalifa / برج خليفة; Ski Dubai Snow Park; Museum of the Future / متحف المستقبل; Kite Beach; Zabeel Park / حديقة زعبيل; Al Fahidi Historical Neighbourhood / حي الفهيدي التاريخي; Abra across Dubai Creek / عبرة; Gold Souk and Spice Souk / سوق الذهب; Lost World Aquarium, Atlantis; Aquaventure World, Atlantis; Wild Wadi Waterpark; LEGOLAND Water Park; MOTIONGATE Dubai; Real Madrid World; Dubai Garden Glow; Aventura Parks, Mushrif; Mushrif National Park; Boo Boo Laand; House of Hype; ARTE MUSEUM Dubai; SuperPark Dubai; Global Village; OliOli Children's Play Museum; Ain Dubai; IMG Worlds of Adventure; Air Maniax; Bounce at X-Park; BOUNCE-X; Hello Park; Glitch Arabia; Loco Bear; Ready Set Go; Dubai Ice Rink; Al Mamzar Beach Park; Creek Park; Safa Park; Al Barsha Pond Park; Dubai Hills Park; Town Square Park; JLT Park; Al Ittihad Park; Quranic Park; Children's City

### au-melbourne — Melbourne and the Great Ocean Road (Australia)
Area covered: Melbourne and the Great Ocean Road (also known as / includes: melbourne, great ocean road, phillip island, dandenong)

Already in the app — places to eat: Stalactites; HuTong Dumpling Bar / 胡同; Pellegrini's Espresso Bar; Tiamo; D.O.C Pizza & Mozzarella Bar; ShanDong MaMa / 山东妈妈; The Hardware Société; 12 Rocks Beach Bar Cafe; The Bottle of Milk; Queen Victoria Market; South Melbourne Market; Apollo Bay Fishermen's Co-op; Brunetti Classico; Lune Croissanterie; Great Ocean Road Chocolaterie & Ice Creamery; La Camera Southgate; Hophaus Bier Bar Grill; Hopscotch; Good Nature; The Vincent; New Shanghai (Emporium); Superhiro; il Mercato Centrale; Emporium Cafe Court; Operator Diner; Henry and the Fox; The Farm Cafe; Ichi Ni Nana Izakaya; Pingo Kids Club Cafe; Dohtonbori Docklands; Seoul Garden BBQ; Saluministi; Renzo's Bar Cafe Italiano; Limonetto Gelati; Miss Pings; Yassas; Riverside Deli and Coffee House; Momami; Platform 28; Baci Restaurant; Waterfront Southgate; Kitchen Workshop, Crown Melbourne; Teatro Southbank; Red Emperor Chinese Restaurant; Melba Restaurant, The Langham Hotel Melbourne; Hanoia; Heebi; Tone Coffee; Pinned Coffee; Milkbar; Kombu; Austro Bakery; Le Yeahllow; Union Kiosk; Bakemono Bakers; Maker; Ten Square Cafe; Tom Thumb; Chapter House Coffee; Jungle Juice; Tori's; Overlay; Traveller

Already in the app — things to do: Melbourne Zoo; Melbourne Museum; SEA LIFE Melbourne Aquarium; Scienceworks; Ian Potter Foundation Children's Garden; Queen Victoria Market; Luna Park Melbourne; Melbourne Skydeck; Puffing Billy Railway; ACMI; South Melbourne Market; NGV International; St Kilda Pier penguins; Nature Play at Royal Park; Collingwood Children's Farm; Werribee Open Range Zoo; Phillip Island Penguin Parade; Koala Conservation Reserve, Phillip Island; Churchill Island Heritage Farm; Prahran Market; MoPA: Museum of Play and Art; LEGOLAND® Discovery Centre Melbourne; Chipmunks Docklands; Dreamskape Docklands; Little Builders; ArtVo Melbourne; Victoria Green Playground; Buluk Park playground; Ron Barassi Snr Park; Wharfs Landing Playground; Harmony Garden / Point Park; Jumpside; Bounce (formerly Latitude); Imaginationation at Chadstone; Landing Play Centre
