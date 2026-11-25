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

### th-sukhothai — Sukhothai and Si Satchanalai (Thailand)
Area covered: Sukhothai and Si Satchanalai (also known as / includes: sukhothai, si satchanalai, sawankhalok, hat siao)

Now in the app: 22 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Jayhae Sukhothai Noodle / ก๋วยเตี๋ยวสุโขทัยเจ๊แฮ; Ta Pui Sukhothai Noodle / ก๋วยเตี๋ยวสุโขทัยตาปุ้ย; Baan Kru Iw / บ้านครูอิ๋ว; Poo Restaurant / ร้านปู; Fueang Fah / เฟื่องฟ้า; Mai Klang Krung / ไม้กลางกรุง; Khao Poep Yai Khrueang / ข้าวเปิ๊บยายเครื่อง; Ko Heng / โกเฮง; Sukhothai Night Market / ตลาดโต้รุ่งสุโขทัย; Wat Traphang Thong Market / ตลาดวัดตระพังทอง; The Coffee Cup; Cafe Thammada / ทำมาดาคาเฟ่; Lung Joi Restaurant / ร้านลุงจ้อย; Api Bistro; Khanom Chin Ban Na / ร้านขนมจีนบ้านนา; Mee Khao Phan Phak / หมี ข้าวพันผัก; Kuaytiew Saep Pak / ก๋วยเตี๋ยวแซ่บปาก; Krua Sukho / ครัวสุโข; Na Sukhothai / ณ โขทัย; Baan Chan Chai / บ้านจันทร์ฉาย; Pa Pen Mystery Noodles / ป้าเพ็ญ ก๋วยเตี๋ยวลึกลับ; Kuay Teow Rim Rabiang / ก๋วยเตี๋ยวริมระเบียง

Already in the app — things to do: Sukhothai Historical Park, central zone / อุทยานประวัติศาสตร์สุโขทัย; Wat Sa Si, the temple on the lake; Wat Si Sawai; Ramkhamhaeng National Museum; Si Satchanalai Historical Park; Sawanworanayok National Museum; Ramkhamhaeng National Park, Sai Rung waterfall; Ban Ko Noi Sangkhalok Kiln Study Centre; Ban Phra Phim learning centre (clay stamping); Wat Mahathat, Sukhothai; Wat Chang Lom; Sathorn Golden Textile Museum; Sarit Phong Dam; Tat Duean Waterfall; Wat Phra Phai Luang; Wat Si Chum / วัดศรีชุม; Chao Ram Beach / หาดเจ้าราม; Chao Ram Cave (bat flight) / ถ้ำเจ้าราม; Tha Nam Rap Sadet Market / ตลาดท่าน้ำรับเสด็จ

### us-boston — Boston (United States)
Area covered: Boston (also known as / includes: boston, beacon hill, freedom trail, boston common, harvard, cape cod)

Now in the app: 21 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Union Oyster House; Legal Sea Foods; Regina Pizzeria; The Paramount; The Barking Crab; Mr. Bartley's Burger Cottage; Summer Shack; Antico Forno; Quincy Market; Boston Public Market; Eataly Boston; James Hook & Co.; Mike's Pastry; Modern Pastry; Tatte Bakery & Café; Flour Bakery + Cafe; Alamo Drafthouse Cinema (Seaport); Little Cocoa Bean Co.; Life Alive (Central Square); The Friendly Toast (Back Bay); American Flatbread at Sacco's Bowl Haven

Already in the app — things to do: Boston Children's Museum; Museum of Science; New England Aquarium; Franklin Park Zoo; Swan Boats in the Public Garden; Freedom Trail and Boston National Historical Park; Faneuil Hall; USS Constitution and its museum; Boston Tea Party Ships and Museum; Museum of Fine Arts, Boston; Harvard Museum of Natural History; Boston Harbor Islands ferry; Arnold Arboretum; Boston Public Library, Central Library; Boston Common and the Frog Pond; LEGO Discovery Center Boston; Castle Island and Fort Independence; Rose Kennedy Greenway; The Mapparium; Stone Zoo

### vn-saigon — Ho Chi Minh City and the Mekong Delta (Vietnam)
Area covered: Ho Chi Minh City and the Mekong Delta (also known as / includes: ho chi minh city, saigon, mekong delta, can tho, cu chi, ben thanh)

Now in the app: 16 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Phở Hòa Pasteur; Cục Gạch Quán; Quán Ăn Ngon 138; Secret Garden; Hoa Túc; Pizza 4P's Bến Thành; Cơm Tấm Ba Ghiền; Bánh Xèo 46A; Mekong Rest Stop; Sao Hôm; Chợ Bến Thành; Bánh Mì Huỳnh Hoa; Saigon Centre Takashimaya food hall; Maison Marou Saigon; The Workshop Coffee; Au Parc

Already in the app — things to do: Saigon Zoo and Botanical Gardens / Thảo Cầm Viên Sài Gòn; Dam Sen Cultural Park / Công viên Văn hóa Đầm Sen; Dam Sen Water Park / Công viên nước Đầm Sen; Suoi Tien Theme Park / Khu du lịch Văn hóa Suối Tiên; Saigon Waterbus / Buýt sông Sài Gòn; Independence Palace / Dinh Độc Lập; Ben Thanh Market / Chợ Bến Thành; Saigon Central Post Office / Bưu điện Trung tâm Sài Gòn; Tao Dan Park / Công viên Tao Đàn; Nguyen Hue Walking Street / Phố đi bộ Nguyễn Huệ; Binh Tay Market / Chợ Bình Tây; Thien Hau Temple / Chùa Bà Thiên Hậu; Landmark 81 SkyView; A O Show at the Saigon Opera House / Nhà hát Thành phố; Gia Dinh Park / Công viên Gia Định; VinWonders Grand Park; tiNiWorld, AEON Tan Phu; War Remnants Museum / Bảo tàng Chứng tích Chiến tranh; Ho Chi Minh City Museum of History / Bảo tàng Lịch sử Thành phố Hồ Chí Minh; Tien Dong Ngoc Nu Beach; Cu Chi Water Park; Fanpekka; Dream Kids; Vietopia; Golden Dragon Water Puppet Theatre

### de-hamburg — Hamburg (Germany)
Area covered: Hamburg (also known as / includes: hamburg, speicherstadt, elbphilharmonie, hafencity, st. pauli, st pauli)

Now in the app: 15 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Fischereihafen Restaurant; Old Commercial Room; Fischerhaus; Gröninger Privatbrauerei; Bullerei; Schönes Leben Speicherstadt; Oberhafen-Kantine; Alt Hamburger Aalspeicher; Brücke 10; Rindermarkthalle St. Pauli; Jim Block Jungfernstieg; Speicherstadt Kaffeerösterei; Luicella's Ice Cream; Mutterland Stammhaus; Alsterdorfer Kesselhaus

Already in the app — things to do: Miniatur Wunderland; Tierpark Hagenbeck; Planten un Blomen; Elbphilharmonie Plaza; International Maritime Museum; Harbour boat tour (Barkassen); Fish market (Fischmarkt); Planetarium Hamburg; Museum der Arbeit; Rickmer Rickmers museum ship; Elbe beach and Övelgönne museum harbour; Speicherstadt and HafenCity walk; Alster boat trip; Hamburger Kunsthalle; Altonaer Museum; Urbaneo – young architecture centre; SpielScheune der Geschichten; Energieberg Georgswerder; Wildgehege Klövensteen; Wasserkunst Elbinsel Kaltehofe; Gut Karlshöhe; KLICK Children’s Museum / KLICK Kindermuseum; Goblinstadt; Cap San Diego; Museum of Nature – Zoology / Museum der Natur Hamburg – Zoologie
