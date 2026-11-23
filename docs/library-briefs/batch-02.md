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

### vn-hue — Huế (Vietnam)
Area covered: Huế (also known as / includes: hue city, perfume river, thua thien, thien mu)

Already in the app — places to eat: Quán Hạnh; Les Jardins de la Carambole; Lạc Thiện; Golden Rice Restaurant; Bún Bò Mệ Kéo; Cơm Hến Hoa Đông; Không Gian Xưa; Ancient Hue Garden Houses; Family Home Restaurant; Quán Bà Đỏ; Chạn Restaurant; Chợ Đông Ba; Hàng Me Mẹ; Chè Hẻm; Cà Phê Muối; Vỹ Dạ Xưa

Already in the app — things to do: Hue Imperial City / Đại Nội Huế; Hue Museum of Royal Antiquities / Bảo tàng Cổ vật Cung đình Huế; An Dinh Palace / Cung An Định; Hue Royal Theatre show / Duyệt Thị Đường; Khai Dinh Tomb / Lăng Khải Định; Minh Mang Tomb / Lăng Minh Mạng; Tu Duc Tomb / Lăng Tự Đức; Dong Ba Market / Chợ Đông Ba; Perfume River dragon boat / Thuyền rồng sông Hương; Thanh Toan Tile-Roofed Bridge / Cầu ngói Thanh Toàn; Bach Ma National Park / Vườn quốc gia Bạch Mã; Lang Co Beach / Bãi biển Lăng Cô; Thuan An Beach / Bãi biển Thuận An; Ho Quyen Tiger Arena / Hổ Quyền; Nguyen Dinh Chieu riverside walk / Phố đi bộ Nguyễn Đình Chiểu

### vn-nhatrang — Nha Trang (Vietnam)
Area covered: Nha Trang (also known as / includes: nha trang, cam ranh, khanh hoa, po nagar)

Already in the app — places to eat: Lanterns Vietnamese Restaurant; Lạc Cảnh; Nem Nướng Đặng Văn Quyên; Mix Restaurant; Nhà hàng Ngọc Trai; Phở Hồng; Nha Trang Xưa; Costa Seafood; Chợ Đầm; Bánh Căn 51; Alpaca Homestyle Café; Cộng Cà Phê; Red Gate Bakery Cafe; Iced Coffee

Already in the app — things to do: VinWonders Nha Trang / VinWonders Nha Trang; National Oceanographic Museum / Viện Hải dương học; Alexandre Yersin Museum / Bảo tàng Yersin; I-Resort hot springs and water park / I-Resort Nha Trang; Thap Ba Hot Springs and mud bath / Tháp Bà Hot Spring; Four-island boat trip / Tour 4 đảo; Yang Bay Tourist Park / Khu du lịch Yang Bay; Ba Ho Waterfalls / Thác Ba Hồ; Dam Market / Chợ Đầm; Nha Trang Beach / Bãi biển Nha Trang; Hon Chong Promontory / Hòn Chồng; Po Nagar Cham Towers / Tháp Bà Ponagar; Vinpearl Harbour; Do Theater – Chum Show; Hon Tam Island (day-visitor side); Doc Let Beach

### vn-phuquoc — Phu Quoc (Vietnam)
Area covered: Phu Quoc (also known as / includes: phu quoc, hon thom, sunset town)

Already in the app — places to eat: Crab House; Xin Chào; Saigonese Eatery; Ra Khơi; The Spice House at Cassia Cottage; Ganesh Indian Restaurant; Trùng Dương Marina; Bup Restaurant; Chợ đêm Phú Quốc; Bún Quậy Kiến Xây; Bún Kèn Út Lượm; Buddy Ice Cream & Info Café; Chuồn Chuồn Bistro; Phu Quoc Bee Farm

Already in the app — things to do: VinWonders Phu Quoc; Vinpearl Safari Phu Quoc; Hon Thom Cable Car / Cáp treo Hòn Thơm; Aquatopia Water Park; Grand World Phu Quoc; Teddy Bear Museum; Grand World Gondola Ride; Kiss of the Sea show / Nụ hôn của biển cả; Sunset Town; Sao Beach / Bãi Sao; Starfish Beach / Rạch Vẹm; Phu Quoc Night Market / Chợ đêm Phú Quốc; Duong Dong Market / Chợ Dương Đông; Phu Quoc pepper farms; Ho Quoc Pagoda / Thiền viện Trúc Lâm Hộ Quốc; Dinh Cau Shrine / Dinh Cậu; Ham Ninh fishing village / Làng chài Hàm Ninh

### my-borneo — Sabah, Borneo (Malaysia)
Area covered: Sabah, Borneo (also known as / includes: sabah, borneo, kota kinabalu, kinabalu)

Already in the app — places to eat: Welcome Seafood Restaurant / 大茄来海鲜餐厅; Kedai Kopi Yee Fung / 怡丰茶室; Sin Kee Bah Kut Teh / 新记肉骨茶; Kedai Kopi Fatt Kee / 发记茶室; Suang Tain Seafood Restaurant / 双天海鲜餐厅; Kedai Kopi Seng Hing / 成兴茶餐室; Little Italy; English Tea House & Restaurant; Kota Kinabalu Night Food Market; Gaya Street Sunday Market / 加雅街; Fook Yuen Cafe & Bakery / 富源茶餐厅; Keng Wan Hing / 琼万兴茶室; Kedai Kopi Yuit Cheong / 悦昌茶室; Nook Cafe; October Coffee House

Already in the app — things to do: Sepilok Orangutan Rehabilitation Centre; Bornean Sun Bear Conservation Centre; Labuk Bay Proboscis Monkey Sanctuary; Tunku Abdul Rahman Park, Manukan Island; Lok Kawi Wildlife Park; Kinabalu Park and Poring Hot Spring; Gaya Street Sunday Market; Kota Kinabalu Wetland Centre; Rainforest Discovery Centre, Sepilok; Sabah State Museum and Heritage Village; Rumah Terbalik (Upside-Down House) and 3D Wonders Museum; Aquarium and Marine Museum, UMS; Tanjung Aru Beach; Kipandi Butterfly Park; Handicraft Market, Kota Kinabalu; Sabah Tea Garden
