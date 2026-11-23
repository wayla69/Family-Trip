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

### kr-busan — Busan (South Korea)
Area covered: Busan (also known as / includes: busan, pusan, haeundae, gamcheon, gwangalli, nampo)

Already in the app — places to eat: Halmae Gaya Milmyeon / 할매가야밀면; Choryang Milmyeon / 초량밀면; Ssangdungi Dwaeji Gukbap / 쌍둥이돼지국밥; Bonjeon Dwaeji Gukbap / 본전돼지국밥; Haeundae Somunnan Amso Galbijip / 해운대소문난암소갈비집; Haeundae Wonjo Halmae Gukbap / 해운대원조할매국밥; Geumsu Bokguk Haeundae / 금수복국 해운대본점; Sinbalwon / 신발원; Songjeong 3-dae Gukbap / 송정3대국밥; Jagalchi Market / 자갈치시장; Samjin Eomuk Yeongdo Main Store / 삼진어묵 영도본점; BIFF Square street food / BIFF광장; Haeundae Traditional Market / 해운대전통시장; OPS Haeundae / 옵스 해운대점; B&C Bakery / 비엔씨; Momos Coffee / 모모스커피 본점; Nasari Sikdang Gwangalli; Seomgwa Seom Sa-i Clam BBQ Gwangalli; Hwadalgu Charcoal Jjukkumi Gwangalli; Haean Galbi Gwangalli Main Branch; Solsot Gwangalli; Jo Gae Dae Pyo Gwangalli Main Branch; Busan Tobagi Dwaeji Gukbap Gwangalli Main Branch; Dongmyeon Sik Milmyeon; Ilgwang Susan Raw Fish Restaurant; Cheonghwabaek Dwaeji Gukbap, Gwangalli; Somunnan Dwaeji Gukbap, Bupyeong; Subyeon Choego Dwaeji Gukbap, Millak; Onammae Dwaeji Gukbap, Jeonggwan; Hwanamjeong Dwaeji Gukbap, Choeup; Mokchon Dwaeji Gukbap, Yeonsan City Hall; Hapcheon Gukbapjip, Yongho; Snoopy Place Busan; Badadang; Choryang Galbi; Wonjo Ilmi Gisa Sikdang; Seomyeon Food Alley; Seomyeon Market; Haeundae Pojangmacha-chon; Arirang Street Food Street; Bupyeong Kkangtong Market

Already in the app — things to do: SEA LIFE Busan Aquarium / 씨라이프 부산아쿠아리움; Haeundae Blueline Park / 해운대 블루라인파크; Lotte World Adventure Busan / 롯데월드 어드벤처 부산; Skyline Luge Busan / 스카이라인 루지 부산; Busan National Science Museum / 국립부산과학관; Busan X the Sky / 부산엑스더스카이; Songdo Marine Cable Car (Busan Air Cruise) / 송도해상케이블카; Songdo Cloud Bridge / 송도구름산책로; Gamcheon Culture Village / 감천문화마을; Huinnyeoul Culture Village / 흰여울문화마을; Busan Tower and Yongdusan Park / 부산타워 · 용두산공원; Jagalchi Market / 자갈치시장; BIFF Square and Gukje Market / BIFF광장 · 국제시장; Busan Citizens Park / 부산시민공원; Gwangalli Beach drone light show / 광안리 M 드론 라이트쇼; Busan Museum of Art / 부산시립미술관; National Maritime Museum of Korea; Busan Museum; Busan Museum of Movies; Haedong Yonggungsa Temple; Champion Playtime Kids Cafe; Cheongsapo Daritdol Observatory; Songdo Yonggung Suspension Bridge; Dadaepo Sunset Fountain of Dreams; Danubi Train at Busan Taejongdae Park

### th-bangkok — Bangkok (Thailand)
Area covered: Bangkok (also known as / includes: bangkok, suvarnabhumi, don mueang, damnoen saduak, amphawa)

Already in the app — places to eat: Thipsamai Pad Thai (Pratu Phi) / ทิพย์สมัย ผัดไทยประตูผี; Krua Apsorn (Dinso Road) / ครัวอัปษร; Somboon Seafood (Surawong) / สมบูรณ์โภชนา สาขาสุรวงศ์; Go-Ang Kaomunkai Pratunam / โกอ่างข้าวมันไก่ประตูน้ำ; Polo Fried Chicken / ไก่ทอดเจ๊กี (โปโล); Wattana Panich / วัฒนาพานิช; Som Tam Nua (Siam Square) / ส้มตำนัว สยามสแควร์; Savoey Tha Maharaj / เสวย ท่ามหาราช; Baan Khanitha & Gallery (Sathorn) / บ้านขนิษฐา สาทร; Supanniga Eating Room Tha Tien / สุพรรณิการ์ อีทติ้ง รูม ท่าเตียน; Pier 21 Food Terminal / เพียร์ 21 เทอร์มินอล 21 อโศก; Or Tor Kor Market / ตลาด อ.ต.ก.; Eathai / อีทไทย เซ็นทรัล เอ็มบาสซี; After You Dessert Cafe (Siam Paragon) / อาฟเตอร์ ยู สยามพารากอน; Mont Nomsod (Dinso Road) / มนต์นมสด เสาชิงช้า; Kor Panich / ก.พานิช; The Deck Bangkok; Baan Ying Cafe and Meal / บ้านหญิง; Cabbages and Condoms; theCOMMONS Thonglor; Helix Dining at EmQuartier; Patom Organic Living / ปฐม ออร์แกนิก ลิฟวิ่ง; Genius Kids Cafe; BABYCCINO & Co.; Mozza by Cocotte; BHC Chicken; Underhound; Benihana

Already in the app — things to do: SEA LIFE Bangkok Ocean World; Children's Discovery Museum; Lumphini Park; Benjakitti Forest Park; Museum Siam; Wat Pho; Grand Palace and Wat Phra Kaew; Chao Phraya Tourist Boat; Mahanakhon SkyWalk; Dream World; Siam Amazing Park; Chatuchak Weekend Market; ICONSIAM and SookSiam; Bangkok Art and Culture Centre; Yaowarat (Chinatown); Safari World; MEGA HarborLand, One Bangkok; MEGA HarborLand, ICONSIAM; HarborLand, Gateway Ekamai; Mega HarborLand, Seacon Bangkae; Funarium; BOUNCE, EmQuartier; MELAND, Siam Paragon; Kidzooona, Gateway Ekamai; Playville; Playmondo, CentralWorld; Playerbox, Siam Discovery; Yoyoland, Seacon Square; Mari Go Round Premium Kids Cafe; Kidzilla; WOW Park, Gateway Ekamai; Science Centre for Education; Siam Serpentarium; Wonder Woods Kids Cafe; Children's Discovery Museum II, Thung Khru; Bang Kachao; Bang Nam Phueng Floating Market; Ancient City; Bangkok Butterfly Garden and Insectarium

### sg-singapore — Singapore (Singapore)
Area covered: Singapore (also known as / includes: singapore, marina bay, sentosa, orchard road, chinatown, little india)

Already in the app — places to eat: Boon Tong Kee Balestier / 文東記; Jumbo Seafood East Coast / 珍宝海鲜; Song Fa Bak Kut Teh / 松發肉骨茶; Samy's Curry; The Banana Leaf Apolo; Zam Zam; Din Tai Fung Paragon / 鼎泰豐; Swee Choon Tim Sum / 瑞春; 328 Katong Laksa; Maxwell Food Centre / 麦士威熟食中心; Lau Pa Sat / 老巴刹; Rasapura Masters; Food Republic VivoCity / 大食代; Ya Kun Kaya Toast / 亚坤; Tiong Bahru Bakery; Birds of Paradise Gelato; Café Melba Goodman; Café Melba, Mediapolis; IKEA Alexandra; Frankie & Fern's, Holland Road Shopping Centre; Coastes; Trapizza; Splash Tribe at The Palawan @ Sentosa; Sabio By The Sea; Wildseed Café, Alkaff Mansion; Canopy, Changi Village; Zaffron Kitchen; Jimmy Monkey Café, PLQ; My Kampung Food Court at Changi City Point; Beauty in The Pot at KINEX; NOM Bistro & Bakery; Estate at Hilton Singapore; Marché Suntec City; Baker & Cook; Hard Rock Cafe Singapore; Eden Restaurant; Seasonal Tastes; Little Lazy Lizard

Already in the app — things to do: Singapore Zoo; Bird Paradise; River Wonders; Singapore Oceanarium; Flower Dome and Cloud Forest; Far East Organization Children's Garden; Jacob Ballas Children's Garden; Singapore Botanic Gardens; KidsSTOP; Universal Studios Singapore; Jewel Rain Vortex; Canopy Park; Marina Barrage; Singapore Cable Car; National Museum of Singapore; ArtScience Museum: Future World; Lau Pa Sat / 老巴刹; Palawan Beach; Rainforest Wild Adventure; Science Centre Singapore; Curiosity Cove; Kiztopia Marina Square; Pasir Ris Park; Sungei Buloh Wetland Reserve; Mount Faber Park; Night Safari; Coastal PlayGrove; Kidodo Space Indoor Playground; HappyWiz Indoor Playground; Kidz Amaze Toa Payoh; Yooland at Westgate

### jp-kyoto — Kyoto (Japan)
Area covered: Kyoto (also known as / includes: kyoto, gion, arashiyama, fushimi, higashiyama, nara)

Already in the app — places to eat: Omen Ginkakuji / おめん 銀閣寺本店; Honke Owariya Honten / 本家尾張屋 本店; Katsukura Sanjo Honten / 名代とんかつ かつくら 三条本店; Musashi Sushi Sanjo Honten / 寿しのむさし 三条本店; Okutan Kiyomizu / 総本家ゆどうふ 奥丹 清水; Izuju / いづ重; Arashiyama Yoshimura / 嵐山よしむら; Hinode Udon / 日の出うどん; Ganko Takasegawa Nijoen / がんこ 高瀬川二条苑; Nishiki Market / 錦市場; Kyoto Ramen Koji / 京都拉麺小路; JR Kyoto Isetan Food Hall / ジェイアール京都伊勢丹 デパ地下; Saryo Tsujiri Gion Honten / 茶寮都路里 祇園本店; Inoda Coffee Honten / イノダコーヒ 本店; Smart Coffee / スマート珈琲店; Demachi Futaba / 出町ふたば; Hyoto Shijokarasuma / 瓢斗 四条烏丸; Sukiyaki Jyuniten Kyoto / すき焼き十二天 京都; Tempura Izakaya KYOTO GATTEN / 酒と肉天ぷら 勝天; Kyoto Kanigin Kawaramachi / 京都 かに銀 河原町; Yakiniku Yazawa Kyoto / 焼肉矢澤 京都; Gion Gyuzen / 祗園 牛禅; Torisee Saiin / 鳥せゑ 西院; Kura Sushi Plus; Kyoto Yodobashi; Daimaru Kyoto; Kyoto Takashimaya; The Cube Food Court; Ramen Toritani; Shokudo Ogawa; Soba Minagawa; Tempura Matsu; Tsuroku; Komefuku; Hafuu; Menya Inoichi; Shigetsu; Nishiki Warai; Kyoto Maruyama; Omen Kodai-ji

Already in the app — things to do: Kyoto Railway Museum / 京都鉄道博物館; Kyoto Aquarium / 京都水族館; Umekoji Park / 梅小路公園; Kyoto City Zoo / 京都市動物園; Fushimi Inari Taisha / 伏見稲荷大社; Nishiki Market / 錦市場; Arashiyama Bamboo Grove / 嵐山 竹林の小径; Iwatayama Monkey Park / 嵐山モンキーパークいわたやま; Sagano Romantic Train / 嵯峨野トロッコ列車; Kiyomizu-dera / 清水寺; Kinkaku-ji / 金閣寺; Kyoto Imperial Palace / 京都御所; Kyoto International Manga Museum / 京都国際マンガミュージアム; Kyoto Botanical Gardens / 京都府立植物園; Kyoto Tower / 京都タワー; teamLab Biovortex Kyoto; Kodomo no Rakuen; Toei Kyoto Studio Park (Uzumasa Eigamura); Maruyama Park; Demachiyanagi Turtle Stepping Stones; Okazaki Park; Nintendo Museum; Heian-jingu; Tenryū-ji; Nanzen-ji; Kyoto Municipal Science Center for Youth; Samurai Ninja Museum; Kyoto City Disaster Prevention Center; Kyoto Museum of Crafts and Design; VS Park AEON Mall Kyoto; GEAR; Round1 Kyoto Kawaramachi
