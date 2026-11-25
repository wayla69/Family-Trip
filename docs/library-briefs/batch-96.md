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

### no-tromso — Tromsø (Norway)
Area covered: Tromsø (also known as / includes: tromso, lofoten, svalbard, north cape, arctic norway)

Now in the app: 15 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Fiskekompaniet; Mathallen Tromsø; Bardus Bistro; Arctandria Sjømatrestaurant; Peppes Pizza Tromsø; Egon Tromsø; Full Steam Tromsø; Yonas Pizzeria; Raketten Bar & Pølse; Dragøy; Fjellstua Café; Kaffebønna; Risø Mat & Kaffebar; Smørtorget; Pastafabrikken

Already in the app — things to do: Polaria; Science Centre of Northern Norway / Nordnorsk Vitensenter; Troll Museum; Arctic University Museum of Norway; Polar Museum / Polarmuseet; Fjellheisen cable car; Tromsøbadet; Silent whale watching by Brim Explorer; Rødne Fjord Cruise; Arctic-Alpine Botanic Garden; Telegrafbukta beach and playground; Perspektivet Folkeparken open-air museum; Prestvannet; Charlottenlund play area; Tromsø Climbing Centre family climbing; Tromsø City Library / Tromsø bibliotek; Arctic Cathedral / Ishavskatedralen

### p-neuschwanstein — Neuschwanstein (Germany)
Area covered: Neuschwanstein (also known as / includes: neuschwanstein, hohenschwangau, fussen, schwangau)

Now in the app: 13 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Schlossrestaurant Neuschwanstein; Alpenrose am See; Restaurant Café Kainz; Schlossbrauhaus Schwangau; Restaurant Ritterstub'n; Gasthof zum Schwanen; Altstadthotel Zum Hechten; Gasthof Krone; Il Pescatore; Schloss Bräustüberl Hohenschwangau; Tegelberghaus; Eiscafé Hohes Schloss; Konditorei Kurcafé

Already in the app — things to do: Neuschwanstein Castle / Schloss Neuschwanstein; Hohenschwangau Castle / Schloss Hohenschwangau; Museum of the Bavarian Kings / Museum der bayerischen Könige; Marienbrücke and Pöllat Gorge / Marienbrücke, Pöllatschlucht; Alpsee Bathing Spot and Boat House / Alpseebad, Alpsee Bootshaus; Tegelberg Summer Toboggan Run / Sommerrodelbahn Tegelberg; Königliche Kristall-Therme / Königliche Kristall-Therme Schwangau; Linderhof Palace / Schloss Linderhof; Highline179 Suspension Bridge / highline179; Füssen City Museum in St Mang Monastery / Museum der Stadt Füssen; High Castle Füssen / Hohes Schloss Füssen; Lech Falls / Lechfall; Füssen Forest Centre Treetop Path / Walderlebniszentrum Füssen-Ziegelwies, Baumkronenweg; Forggensee Boat Trips / Forggensee-Schifffahrt; Waldwelt Skywalk Allgäu; Weißensee lakeside lawn; Füssen high ropes course; Füssen skate and bike park; Hopfen castle ruins

### th-loei — Loei and Chiang Khan (Thailand)
Area covered: Loei and Chiang Khan (also known as / includes: loei, chiang khan, phu kradueng, phu ruea, dan sai, kaeng khut khu)

Now in the app: 12 places to eat, 20 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Heuan Luang Prabang / เฮือนหลวงพระบาง; Rabiang Rim Khong / ระเบียงริมโขง; Chiang Khan Hill Resort restaurant / ห้องอาหาร เชียงคานฮิลล์ รีสอร์ท; Loei Palace Hotel restaurant / ห้องอาหาร โรงแรมเลยพาเลซ; Luk Phochana / ลุกโภชนา; Chiang Khan Walking Street / ถนนคนเดินเชียงคาน; Kaeng Khut Khu Women’s Group Local Food / กลุ่มสตรีอาหารพื้นเมืองแก่งคุดคู้; Kaeng Khut Khu coconut candy shops / ร้านมะพร้าวแก้ว แก่งคุดคู้; Husband and Wife / ฮัสแบนด์แอนด์ไวฟ์; Buppa Kaffe / บับภา คาเฟ่; Tiny Tea Coffee and Bakes; Toffee Coffee by Baan Supichaya / บ้านสุพิชญา

Already in the app — things to do: Chiang Khan Skywalk / สกายวอล์คเชียงคาน; Chiang Khan Walking Street / ถนนคนเดินเชียงคาน; Kaeng Khut Khu rapids by boat / แก่งคุดคู้; Chiang Khan sunset boat on the Mekong / ล่องเรือโขงเชียงคาน; Suan Hin Pha Ngam / สวนหินผางาม; Phu Ruea National Park / อุทยานแห่งชาติภูเรือ; V.C. Garden, Phu Ruea / วี.ซี. การ์เด้น; Phu Kradueng National Park / อุทยานแห่งชาติภูกระดึง; Phi Ta Khon Museum, Dan Sai / พิพิธภัณฑ์ผีตาโขนด่านซ้าย; Phu Phra, Dan Sai / ภูพระ; Loei Museum / พิพิธภัณฑ์เมืองเลย; Ban Kang Pla Thai Loei weaving group / กลุ่มทอผ้าไทเลย บ้านแก่งปลา; Bananaland Phu Luang; Huai Krathing Reservoir; Na Haeo Walking Street; Mekong Riverfront; Wat Si Khun Muang; Tai Dam culture village; Wat Phra Phutthabat Phu Khwai Ngoen; Phu Khok Ngio big Buddha

### th-nan — Nan, Pua and Bo Kluea (Thailand)
Area covered: Nan, Pua and Bo Kluea (also known as / includes: nan province, nan old town, pua, bo kluea, sapan village, doi samer dao)

Now in the app: 15 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Huen Hom / เฮือนฮอม; Huen Phukha / เฮือนภูคา; Khao Soi Ton Nam / ข้าวซอยต้นน้ำ; Wanda / ร้านวันดา; Poom 3 / ปุ้ม 3; Suriya Garden / สุริยาการ์เด้น; Huen Chao Nang / เฮือนเจ้านาง; Pongza Restaurant / ปองซา; Hua Saphan / ร้านหัวสะพาน; Kad Khuang Mueang Nan Walking Street / ถนนคนเดินกาดข่วงเมืองน่าน; Tang Chit Nuson Market / ตลาดตั้งจิตนุสรณ์; Baan Tai Lue Cafe / กาแฟบ้านไทลื้อ; Hot Bread; Pa Nim Dessert / ของหวานป้านิ่ม; Erabica Coffee / เอราบิก้า คอฟฟี่

Already in the app — things to do: Nan National Museum / พิพิธภัณฑสถานแห่งชาติ น่าน; Doi Phu Kha National Park / อุทยานแห่งชาติดอยภูคา; Doi Samer Dao viewpoint / ดอยเสมอดาว; Sao Din Na Noi / เสาดินนาน้อย; Wat Phumin / วัดภูมินทร์; Nan Riverside Art Gallery; Hong Chao Fong Kham; Ban Phra Koet Community Museum; Cocoa Valley Nan; Tham Pha Tup Forest Park; Wat Phrathat Chae Haeng; Bo Suak ancient kiln site; Namtok Sapan; Bo Kluea rock salt wells; Nan Walking Street (Kad Kuang Mueang Nan); Sila Phet Waterfall; Route 1081 Viewpoint (Skyroad 1715)
