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

### vn-dalat — Đà Lạt (Vietnam)
Area covered: Đà Lạt (also known as / includes: dalat, da lat, lam dong, langbiang, xuan huong)

Now in the app: 21 places to eat, 28 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Góc Hà Thành; Lẩu Gà Lá É Tao Ngộ; Nem Nướng Bà Hùng; Artist Alley Restaurant; Ganesh Indian Restaurant; Thủy Tạ; Bánh Ướt Lòng Gà Trang; Lẩu Bò Ba Toa Quán Gỗ; Chợ đêm Đà Lạt; Bánh Căn Nhà Chung; Bánh Mì Xíu Mại Hoàng Diệu; Liên Hoa Bakery; Kem Bơ Thanh Thảo; Sữa Đậu Nành Hoa Sữa; Cà Phê Tùng; Chef's Dalat; Le Chalet Dalat Coffee & Bistro; Da Quy Restaurant; Thanh Thuy Restaurant; Rừng Thông Mơ Farm & Bistro; Léguda Buffet Rau Đà Lạt

Already in the app — things to do: Crazy House (Hang Nga Villa) / Biệt thự Hằng Nga; Datanla Waterfall and alpine coaster / Thác Datanla; Dalat Railway Station and Trai Mat train / Ga Đà Lạt; Bao Dai Palace (Dinh 3) / Dinh III Bảo Đại; Dalat Flower Gardens / Vườn hoa thành phố Đà Lạt; Zoodoo Dalat / Vườn thú Zoodoo; Langbiang Mountain / Núi Langbiang; Lam Dong Museum / Bảo tàng Lâm Đồng; Valley of Love / Thung lũng Tình Yêu; Dalat Cable Car / Cáp treo Đà Lạt; Cu Lan Village / Làng Cù Lần; Xuan Huong Lake / Hồ Xuân Hương; Dalat Night Market / Chợ đêm Đà Lạt; Dalat Market / Chợ Đà Lạt; Puppy Farm Dalat; Crazy House (Hang Nga Guesthouse); Datanla Falls Adventure Park; Da Lat Railway Station & Train Ride; Lang Biang Peak Cable Car; Valley of Love Pedal Boats; Strawberry Farm Tours; Linh Phuoc Pagoda (Dragon Temple); Coffee Farm Tours; La DaLat Children’s Play Area / Khu vui chơi trẻ em La DaLat; Nobi Town / Thị trấn Nobi; Mongo Land / Mongo Land Đà Lạt; Kids Coffee; Dalat Milk Farm / Dalat Milk

### vn-danang — Da Nang & Hoi An (Vietnam)
Area covered: Da Nang & Hoi An (also known as / includes: da nang, danang, hoi an, ba na, bana hills, my khe)

Now in the app: 27 places to eat, 22 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Mì Quảng Bà Mua; Bánh Xèo Bà Dưỡng; Madame Lân; Bé Mặn; Thìa Gỗ; Quán Trần; Morning Glory Original; Miss Ly Cafe; Bale Well; Bánh Mì Phượng; Madam Khanh The Banh Mi Queen; Chợ Cồn; Cộng Cà Phê Bạch Đằng; Hoi An Roastery; The Cargo Club; Epice Restaurant; The Temptation French Restaurant; Chops Da Nang; Osteria al Mare; Rang Restaurant; Bistecca Italian Restaurant; Han Market; Bac My An Market; Mango Mango; Soul Kitchen; La Plage; Good Morning Vietnam Pizza

Already in the app — things to do: Sun World Ba Na Hills / Sun World Bà Nà Hills; Asia Park (Sun World Danang Wonders); Marble Mountains / Ngũ Hành Sơn; VinWonders Nam Hoi An; Hoi An Ancient Town / Phố cổ Hội An; Bay Mau Coconut Forest basket boats / Rừng dừa Bảy Mẫu; Museum of Cham Sculpture / Bảo tàng Điêu khắc Chăm; Dragon Bridge fire show / Cầu Rồng; Than Tai Hot Spring Park / Công viên Suối khoáng nóng Núi Thần Tài; Art in Paradise 3D Museum; Han Market / Chợ Hàn; Linh Ung Pagoda, Son Tra / Chùa Linh Ứng Bãi Bụt; Tra Que Vegetable Village / Làng rau Trà Quế; My Khe Beach / Bãi biển Mỹ Khê; Hoi An Memories Land and show / Ký Ức Hội An; Hoi An Night Market and lantern boats / Chợ đêm Hội An; An Bang Beach / Bãi biển An Bàng; APEC Park / Công viên APEC; Mikazuki Water Park 365; Hoa Phu Thanh; Son Tra Peninsula; Cham Islands / Cù Lao Chàm

### ie-ireland — Dublin and the west coast (Ireland)
Area covered: Dublin and the west coast (also known as / includes: dublin, galway, cliffs of moher, ring of kerry, killarney, connemara)

Now in the app: 23 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: The Woollen Mills; Gallagher's Boxty House; Elephant & Castle; McDonagh's; Ard Bia at Nimmos; The Dough Bros; Gus O'Connor's Pub; Bricín; Quinlan's Seafood Bar; Leo Burdock; Galway Market; Bewley's Grafton Street; Murphy's Ice Cream; The Bad Ass Cafe; Carluccio's; Wagamama Dundrum; Brother Hubbard (North); The Fumbally; Overends Kitchen; Blackrock Cottage; Freddy's; Aniar; Saba

Already in the app — things to do: Dublin Zoo; Cliffs of Moher Visitor Experience; National Leprechaun Museum; Dublinia; Phoenix Park; Phoenix Park Visitor Centre and Ashtown Castle; National Botanic Gardens, Glasnevin; Malahide Castle and Gardens; Howth village and harbour; National Aquarium of Ireland (Galway Atlantaquaria); Galway Christmas Market; Aillwee Cave and Burren Birds of Prey Centre; Bunratty Castle and Folk Park; Connemara National Park; Connemara Pony Heritage Centre; Moher Hill Open Farm; Doolin Cave; Caherconnell Fort; Dromore Wood nature reserve; Shannon Aviation Museum; Lahinch beach; National Museum of Ireland – Archaeology; National Gallery of Ireland; National Wax Museum Plus; The Little Museum of Dublin; AquaZone; EPIC The Irish Emigration Museum

### tr-istanbul — Istanbul (Türkiye)
Area covered: Istanbul (also known as / includes: istanbul, sultanahmet, bosphorus, galata, taksim, kadikoy)

Now in the app: 20 places to eat, 30 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Hamdi Restaurant; Tarihi Sultanahmet Köftecisi Selim Usta; Çiya Sofrası; Karaköy Lokantası; Kanaat Lokantası; Şehzade Cağ Kebap; Develi Samatya; Hünkar; Dürümzade; Namlı Gurme; Kızılkayalar; Hafız Mustafa 1864; Karaköy Güllüoğlu; Vefa Bozacısı; Zubeyir Ocakbasi; Kayseri Manti Evi; Manti Evi; Van Kahvalti Evi; Baylan Pastanesi; Happy Moon's (Vadi İstanbul)

Already in the app — things to do: Miniatürk; Rahmi M. Koç Museum / Rahmi M. Koç Müzesi; Istanbul Aquarium / İstanbul Akvaryum; Basilica Cistern / Yerebatan Sarnıcı; Topkapı Palace / Topkapı Sarayı; Istanbul Archaeology Museums / İstanbul Arkeoloji Müzeleri; Gülhane Park / Gülhane Parkı; Bosphorus cruise / Boğaz Turu; Spice Bazaar (Egyptian Bazaar) / Mısır Çarşısı; Istanbul Toy Museum / İstanbul Oyuncak Müzesi; Emirgan Park / Emirgan Korusu; Galata Tower / Galata Kulesi; Princes' Islands (Büyükada) / Büyükada; Panorama 1453 History Museum / Panorama 1453 Tarih Müzesi; Istanbul Naval Museum / Deniz Müzesi; Museum of Illusions – Istanbul; Dolmabahçe Palace; Blue Mosque; Süleymaniye Mosque; Eyüp Sultan Mosque; Eyüp–Pierre Loti Cable Car; Golden Horn Ferry; Galata Bridge; Müze Gazhane Children’s Science Center; Bilim Üsküdar; Nickelodeon Play Tersane Istanbul; Natural Science Museum; Kemerburgaz Urban Forest; Isfanbul (Vialand); Nostalgic Tram (İstiklal Avenue)
