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

### th-huahin — Hua Hin, Cha-am and Pranburi (Thailand)
Area covered: Hua Hin, Cha-am and Pranburi (also known as / includes: hua hin, cha-am, pranburi, sam roi yot, phetchaburi, kaeng krachan)

Already in the app — places to eat: Chao Lay Seafood / ชาวเล ซีฟู้ด; Jek Pia / เจ๊กเปี๊ยะ; Baan Itsara / บ้านอิสระ; Koti / โกทิ; You Yen Hua Hin Balcony / อยู่เย็น หัวหิน บัลโคนี; Ratama / ระตะมะ; Supatra by the Sea / สุพัตรา บายเดอะซี; Krua Medsai / ครัวเม็ดทราย; Baan Mae Phongsri / บ้านแม่ผ่องศรี; OX Seafood / โอเอ็กซ์ซีฟู้ด; Hua Hin Night Market / ตลาดโต้รุ่งหัวหิน; Cicada Market / ตลาดจักจั่น; Tamarind Market / ตลาดแทมมารีน; Baan Khrai Wang / บ้านใกล้วัง; Pa Jua Mango Sticky Rice / ข้าวเหนียวมะม่วงป้าเจือ; The Chocolate Factory Hua Hin; Saen Suk Som Seafood; Ao Takiab Seafood Hua Hin; Suk Suk Phochana Hua Hin; Rosarin Restaurant Hua Hin; Ba ribot Khaotakiab / บริบท เขาตะเกียบ; Ban Ko Restaurant Hua Hin; Sailom Hotel & Restaurant; Tharachan Hua Hin; CASA MARE Huahin; Khrua Ban Khru Hua Hin; Khrua Khai Muk Cha-am Fish Pier; Chom Wiew Seafood; Khrua Huai Sai; Khrua Khong Samut Seafood; Pla Thu Restaurant; Wiew Thale Seafood Cha-am; Luckyseafood2 Cha-am; Im Jang; Eureka Beach Cafe; Oceanside Beach Club & Restaurant / โอเชี่ยนไซด์ บีช คลับ & เรสเตอรองต์; Ko Mark HuaHin Restaurant / โกหมาก หัวหิน; Baantuayen x The Dogs Space / บ้านถั่วเย็น; Air Space Hua Hin

Already in the app — things to do: Vana Nava Water Jungle; Black Mountain Water Park; Swiss Sheep Farm; Cicada Market; Hua Hin Night Market; Khao Sam Roi Yot National Park; Khao Hin Lek Fai Viewpoint; Raruek Hua Hin; Hua Hin Railway Station; Pak Nam Pran; Hua Hin Artist Village; Market Village Hua Hin; Blúport Hua Hin; Sirindhorn International Environmental Park; Rajabhakti Park; Wildlife Friends Foundation Thailand

### my-kualalumpur — Kuala Lumpur (Malaysia)
Area covered: Kuala Lumpur (also known as / includes: kuala lumpur, klcc, petronas, batu caves, bukit bintang, genting)

Already in the app — places to eat: Madam Kwan's KLCC; Yut Kee / 镒记茶餐室; Nasi Kandar Pelita; Sek Yuen Restaurant / 适苑酒家; Restoran Kin Kin / 建记辣椒板面; Din Tai Fung Pavilion / 鼎泰豐; Old China Cafe / 老中国茶室; Village Park Restaurant; Sri Nirwana Maju; Lot 10 Hutong / 十号胡同; Jalan Alor Food Street / 亚罗街; Signatures Food Court; VCR; Kenny Hills Bakers; Inside Scoop Bangsar; Ho Kow Hainam Kopitiam / 何九海南茶店; Marmalade; Kanteen; Yellow Brick Road; RGB & The Bean Hive; The Little Owl Korean Cafe; Bucket B Cafe; Haru Cafe Gallery; ATE TEA Cafe

Already in the app — things to do: Aquaria KLCC; Petrosains Discovery Centre; KL Bird Park; Zoo Negara; KLCC Park; Batu Caves; KL Tower; National Museum / Muzium Negara; Perdana Botanical Garden; KL Forest Eco Park; Petaling Street and Central Market; Jalan Alor; Islamic Arts Museum Malaysia; Sunway Lagoon; Thean Hou Temple; MoSAIC (Museum of Science, Arts & Innovation for Children); Planetarium Negara; VroomTown Malaysia; Pusat Sains Negara; Titiwangsa Lake Gardens / Taman Tasik Titiwangsa; Taman Rekreasi Bukit Jalil; TRX City Park; Farm In The City; Farm Fresh UPM; Immersify Kuala Lumpur; Museum of Illusions; Illusion 3D Art Museum; MinNature Malaysia; Chocolate Museum Malaysia; Balai Seni Negara; Bank Negara Malaysia Museum and Art Gallery; Hang Tuah Fire Station

### jp-fukuoka — Fukuoka (Japan)
Area covered: Fukuoka (also known as / includes: fukuoka, hakata, tenjin, nakasu, dazaifu, momochi)

Already in the app — places to eat: Ichiran Honten / 一蘭 本社総本店; Ippudo Daimyo Honten / 一風堂 大名本店; Hakata Ramen Shin-Shin Tenjin Honten / 博多らーめん ShinShin 天神本店; Hakata Hanamidori Nakasu Honten / 博多華味鳥 中洲本店; Tempura Hirao Tenjin Acros / 天麩羅処ひらお 天神アクロス店; Ganso Hakata Mentaiju / 元祖博多めんたい重; Makino Udon Hakata Bus Terminal / 牧のうどん 博多バスターミナル店; Hyotan Sushi / ひょうたん寿司; Yoshizuka Unagiya / 博多名代 吉塚うなぎ屋; Canal City Ramen Stadium / ラーメンスタジアム; Hakata Men Kaido / 博多めん街道; Yanagibashi Rengo Market / 柳橋連合市場; Il Forno del Mignon / イル フォルノ デル ミニョン; Suzukake Honten / 鈴懸 本店; Kasanoya / かさの家; Hakata kuimonya Masumasa; comecome BURGER; Daimei Dandan Noodles; Nagahama No. 1; Yakisoba specialty restaurant Basokiya; Hakata Tempura and Fried Appetizers Ebizou; Manpuku Reimen (Manpuku Shokudo); Iwataya; Kirby Cafe Hakata; Royal Garden Cafe

Already in the app — things to do: Marine World Uminonakamichi / マリンワールド海の中道; Uminonakamichi Seaside Park / 海の中道海浜公園; Fukuoka City Zoo and Botanical Garden / 福岡市動植物園; Fukuoka City Science Museum / 福岡市科学館; Fukuoka Tower / 福岡タワー; Fukuoka Anpanman Children's Museum in Mall / 福岡アンパンマンこどもミュージアムinモール; Ohori Park / 大濠公園; Canal City Hakata fountain show / キャナルシティ博多 噴水ショー; Nokonoshima Island Park / のこのしまアイランドパーク; Nakasu yatai stalls / 中洲屋台; Hakata Machiya Folk Museum / 「博多町家」ふるさと館; Momochi Seaside Park / シーサイドももち海浜公園; Yanagibashi Rengo Market / 柳橋連合市場; Dazaifu Tenmangu / 太宰府天満宮; Fukuoka City Museum / 福岡市博物館; Fukuoka Toy Museum / 福岡おもちゃ美術館; KidZania Fukuoka / キッザニア福岡; teamLab Forest Fukuoka / チームラボフォレスト 福岡-SBI証券; NOBOLT / ノボルト（NOBOLT）; Kasuga Kodomo Land / かすがこどもランド; Acoopa Kurieito Munakata / アクーパくりえいと宗像店; Fukuoka City Central Children's Hall Aikuru / 福岡市立中央児童会館 あいくる; Chikyu no Niwa Fukuoka / ちきゅうのにわ 福岡店; Fantasy Kids Resort Fukuoka / ファンタジーキッズリゾート福岡; Kids Land US MAX Fukuoka Hisayama / キッズランドUS MAX 福岡久山店; Kushida Shrine; Sakurai Futamigaura; Nogita Beach; Keya Beach; Tenjin Central Park / 天神中央公園; Maizuru Park / 舞鶴公園; Higashi-Hirao Park (Otani Plaza) / 東平尾公園（大谷広場）

### id-bali — Bali (Indonesia)
Area covered: Bali (also known as / includes: bali, ubud, kuta, seminyak, uluwatu, nusa dua)

Already in the app — places to eat: Bebek Bengil; Warung Babi Guling Ibu Oka 3; Naughty Nuri's Warung Ubud; Bebek Tepi Sawah; Nasi Ayam Kedewatan Ibu Mangku; Made's Warung Seminyak; Menega Cafe; Warung Mak Beng; Massimo Italian Restaurant; Pasar Malam Sindhu; Gianyar Night Market; Eat & Eat Beachwalk; Gelato Secrets; Tukies Coconut Shop; Revolver Espresso; Bali Buda; Milk & Madu; Parklife; Lacalita; Roomah; TYGR Sushi; MILU by NOOK; Biku; Sea Circus; Mano Beach House; Clear Cafe; Taco Casa; Genius Cafe; Byrd House Bali; Naughty Nuri's Sanur; Prego; WAHAHA

Already in the app — things to do: Waterbom Bali; Bali Bird Park; Sacred Monkey Forest Sanctuary / Mandala Suci Wenara Wana; Tegallalang Rice Terraces; Tanah Lot / Pura Tanah Lot; Turtle Conservation and Education Center / TCEC Serangan; Uluwatu Temple and Kecak dance / Pura Luhur Uluwatu; Sindhu Night Market / Pasar Malam Sindhu; Campuhan Ridge Walk; Tegenungan Waterfall / Air Terjun Tegenungan; Ubud Art Market / Pasar Seni Ubud; Legong dance at Ubud Palace / Puri Saren Ubud; Sanur beach path; ICON Bali mall; Trans Studio Bali; Mai Main Playground Canggu; AeroXSpace Adventure; Clip 'n Climb Bali; KidzCafe Sanur; Kids SoHo Playground; Biosphere Playhouse; Nusa Dua Beach; Sanur Beach; The Blanco Renaissance Museum; Bali Ice Skating Arena; Kuta Market; Sukawati Art Market
