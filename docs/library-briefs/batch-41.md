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

### mo-macau — Macau (Macau)
Area covered: Macau (also known as / includes: macau, macao, taipa, cotai, coloane, senado)

Already in the app — places to eat: A Lorcha / 船屋葡國餐廳; Restaurante Fernando / 法蘭度餐廳; O Santos / 山度士葡式餐廳; A Petisqueira / 葡國美食天地; Restaurante Dumbo / 小飛象葡國餐廳; Cafe Nga Tim / 雅憩花園餐廳; Wong Chi Kei / 黃枝記; Cheong Kei / 祥記麵家; Tai Lei Loi Kei / 大利來記豬扒包; Venetian Food Court; Tastes of Asia; Lord Stow's Bakery / 安德魯餅店; Margaret's Cafe e Nata / 瑪嘉烈蛋撻店; Leitaria I Son / 義順牛奶公司; Koi Kei Bakery / 鉅記餅家; Chiado; Mariazinha; Vic’s Restaurante; Portugália; Albergue 1601; Restaurante Litoral

Already in the app — things to do: Giant Panda Pavilion and Seac Pai Van Park / 澳門大熊貓館 · 石排灣郊野公園; Macao Science Center / 澳門科學館; teamLab SuperNature Macao; Senado Square and the Ruins of St Paul's / 議事亭前地 · 大三巴牌坊; Macau Tower observation deck / 澳門旅遊塔; Macao Grand Prix Museum / 澳門格蘭披治大賽車博物館; Lou Lim Ieoc Garden / 盧廉若公園; Guia Fortress and Flora Garden cable car / 東望洋炮台 · 二龍喉公園; Taipa Village and Rua do Cunha / 氹仔舊城區 · 官也街; Taipa Houses Museum / 龍環葡韻住宅式博物館; Coloane Village / 路環市區; Hac Sa Beach / 黑沙海灘; Studio City Water Park / 新濠影滙水上樂園; A-Ma Temple / 媽閣廟; Macao Museum and Monte Fortress / 澳門博物館 · 大炮台; Maritime Museum; Kun Iam Statue Waterfront; Happy Farm; Oscar Farm; Qube Kingdom (The Parisian); Super Fun Zone Macau; Aqua World; Go Airborne; Future Bright amusement centre; Macao Museum of Art / 澳門藝術博物館; Kids’ City, City of Dreams; Cotai Ecological Reserve

### sg-singapore — Singapore (Singapore)
Area covered: Singapore (also known as / includes: singapore, marina bay, sentosa, orchard road, chinatown, little india)

Already in the app — places to eat: Boon Tong Kee Balestier / 文東記; Jumbo Seafood East Coast / 珍宝海鲜; Song Fa Bak Kut Teh / 松發肉骨茶; Samy's Curry; The Banana Leaf Apolo; Zam Zam; Din Tai Fung Paragon / 鼎泰豐; Swee Choon Tim Sum / 瑞春; 328 Katong Laksa; Maxwell Food Centre / 麦士威熟食中心; Lau Pa Sat / 老巴刹; Rasapura Masters; Food Republic VivoCity / 大食代; Ya Kun Kaya Toast / 亚坤; Tiong Bahru Bakery; Birds of Paradise Gelato; Café Melba Goodman; Café Melba, Mediapolis; IKEA Alexandra; Frankie & Fern's, Holland Road Shopping Centre; Coastes; Trapizza; Splash Tribe at The Palawan @ Sentosa; Sabio By The Sea; Wildseed Café, Alkaff Mansion; Canopy, Changi Village; Zaffron Kitchen; Jimmy Monkey Café, PLQ; My Kampung Food Court at Changi City Point; Beauty in The Pot at KINEX; NOM Bistro & Bakery; Estate at Hilton Singapore; Marché Suntec City; Baker & Cook; Hard Rock Cafe Singapore; Eden Restaurant; Seasonal Tastes; Little Lazy Lizard

Already in the app — things to do: Singapore Zoo; Bird Paradise; River Wonders; Singapore Oceanarium; Flower Dome and Cloud Forest; Far East Organization Children's Garden; Jacob Ballas Children's Garden; Singapore Botanic Gardens; KidsSTOP; Universal Studios Singapore; Jewel Rain Vortex; Canopy Park; Marina Barrage; Singapore Cable Car; National Museum of Singapore; ArtScience Museum: Future World; Lau Pa Sat / 老巴刹; Palawan Beach; Rainforest Wild Adventure; Science Centre Singapore; Curiosity Cove; Kiztopia Marina Square; Pasir Ris Park; Sungei Buloh Wetland Reserve; Mount Faber Park; Night Safari; Coastal PlayGrove; Kidodo Space Indoor Playground; HappyWiz Indoor Playground; Kidz Amaze Toa Payoh; Yooland at Westgate

### my-kualalumpur — Kuala Lumpur (Malaysia)
Area covered: Kuala Lumpur (also known as / includes: kuala lumpur, klcc, petronas, batu caves, bukit bintang, genting)

Already in the app — places to eat: Madam Kwan's KLCC; Yut Kee / 镒记茶餐室; Nasi Kandar Pelita; Sek Yuen Restaurant / 适苑酒家; Restoran Kin Kin / 建记辣椒板面; Din Tai Fung Pavilion / 鼎泰豐; Old China Cafe / 老中国茶室; Village Park Restaurant; Sri Nirwana Maju; Lot 10 Hutong / 十号胡同; Jalan Alor Food Street / 亚罗街; Signatures Food Court; VCR; Kenny Hills Bakers; Inside Scoop Bangsar; Ho Kow Hainam Kopitiam / 何九海南茶店; Marmalade; Kanteen; Yellow Brick Road; RGB & The Bean Hive; The Little Owl Korean Cafe; Bucket B Cafe; Haru Cafe Gallery; ATE TEA Cafe

Already in the app — things to do: Aquaria KLCC; Petrosains Discovery Centre; KL Bird Park; Zoo Negara; KLCC Park; Batu Caves; KL Tower; National Museum / Muzium Negara; Perdana Botanical Garden; KL Forest Eco Park; Petaling Street and Central Market; Jalan Alor; Islamic Arts Museum Malaysia; Sunway Lagoon; Thean Hou Temple; MoSAIC (Museum of Science, Arts & Innovation for Children); Planetarium Negara; VroomTown Malaysia; Pusat Sains Negara; Titiwangsa Lake Gardens / Taman Tasik Titiwangsa; Taman Rekreasi Bukit Jalil; TRX City Park; Farm In The City; Farm Fresh UPM; Immersify Kuala Lumpur; Museum of Illusions; Illusion 3D Art Museum; MinNature Malaysia; Chocolate Museum Malaysia; Balai Seni Negara; Bank Negara Malaysia Museum and Art Gallery; Hang Tuah Fire Station

### vn-hanoi — Hanoi and Halong Bay (Vietnam)
Area covered: Hanoi and Halong Bay (also known as / includes: hanoi, ha noi, halong, ha long, old quarter, hoan kiem)

Already in the app — places to eat: Phở 10 Lý Quốc Sư; Bún Chả Hương Liên; Bún Chả Đắc Kim; Chả Cá Thăng Long; Quán Ăn Ngon; Cau Go Vietnamese Cuisine; Sen Tây Hồ; Pizza 4P's Tràng Tiền; Hồng Hạnh 3; Cua Vàng; Xôi Yến; Bánh Mì 25; Giảng Café; Cộng Cà Phê Nhà Thờ; Maison Marou Hanoi; Phở Gia Truyền; Phở Khôi Hói; Phở Gà Nguyệt; Bun Cha Ta; Tuyết Bún Chả 34; Bún Chả Chan; Bánh Cuốn Gia Truyền Thanh Vân; Xới Cơm; Luk Lak; Hà Thành Mansion; Mammom; The East; 1946 Cua Bac; Chào Bạn; Tầm Vị; Ưu Đàm; Phở Bò Thanh Béo; Hidden Gem Coffee; Always Café; Blackbird Coffee; Sociō Coffee; Hanoi Shouten; Cà Phê Duy Trí; Loading T; Café Đinh; Tranquil Books & Coffee; The Note Coffee; Cafe Pho Co; Hanoi House

Already in the app — things to do: Thang Long Water Puppet Theatre / Nhà hát Múa rối Thăng Long; Vietnam Museum of Ethnology / Bảo tàng Dân tộc học Việt Nam; Temple of Literature / Văn Miếu – Quốc Tử Giám; Thu Le Zoo and Park / Công viên Thủ Lệ; VinKE and Vinpearl Aquarium Times City / VinKE & Vinpearl Aquarium Times City; Imperial Citadel of Thang Long / Hoàng thành Thăng Long; Lotte World Aquarium Hanoi / Lotte World Aquarium Hà Nội; Hoan Kiem Lake and the weekend walking street / Hồ Hoàn Kiếm · Phố đi bộ; Ngoc Son Temple / Đền Ngọc Sơn; Old Quarter weekend night market / Chợ đêm Hàng Đào; Bat Trang pottery village / Làng gốm Bát Tràng; Thong Nhat Park / Công viên Thống Nhất; Vietnamese Women's Museum / Bảo tàng Phụ nữ Việt Nam; Ba Dinh Square and One Pillar Pagoda / Quảng trường Ba Đình · Chùa Một Cột; Tran Quoc Pagoda on West Lake / Chùa Trấn Quốc; Vietnam National Museum of History / Bảo tàng Lịch sử Quốc gia; Vietnam Military History Museum / Bảo tàng Lịch sử Quân sự Việt Nam; Vietnam National Museum of Nature / Bảo tàng Thiên nhiên Việt Nam
