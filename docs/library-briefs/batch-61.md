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

### th-nan — Nan, Pua and Bo Kluea (Thailand)
Area covered: Nan, Pua and Bo Kluea (also known as / includes: nan province, nan old town, pua, bo kluea, sapan village, doi samer dao)

Now in the app: 15 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Huen Hom / เฮือนฮอม; Huen Phukha / เฮือนภูคา; Khao Soi Ton Nam / ข้าวซอยต้นน้ำ; Wanda / ร้านวันดา; Poom 3 / ปุ้ม 3; Suriya Garden / สุริยาการ์เด้น; Huen Chao Nang / เฮือนเจ้านาง; Pongza Restaurant / ปองซา; Hua Saphan / ร้านหัวสะพาน; Kad Khuang Mueang Nan Walking Street / ถนนคนเดินกาดข่วงเมืองน่าน; Tang Chit Nuson Market / ตลาดตั้งจิตนุสรณ์; Baan Tai Lue Cafe / กาแฟบ้านไทลื้อ; Hot Bread; Pa Nim Dessert / ของหวานป้านิ่ม; Erabica Coffee / เอราบิก้า คอฟฟี่

Already in the app — things to do: Nan National Museum / พิพิธภัณฑสถานแห่งชาติ น่าน; Doi Phu Kha National Park / อุทยานแห่งชาติดอยภูคา; Doi Samer Dao viewpoint / ดอยเสมอดาว; Sao Din Na Noi / เสาดินนาน้อย; Wat Phumin / วัดภูมินทร์; Nan Riverside Art Gallery; Hong Chao Fong Kham; Ban Phra Koet Community Museum; Cocoa Valley Nan; Tham Pha Tup Forest Park; Wat Phrathat Chae Haeng; Bo Suak ancient kiln site; Namtok Sapan; Bo Kluea rock salt wells; Nan Walking Street (Kad Kuang Mueang Nan); Sila Phet Waterfall; Route 1081 Viewpoint (Skyroad 1715)

### th-rayong — Rayong and Koh Samet (Thailand)
Area covered: Rayong and Koh Samet (also known as / includes: rayong, koh samet, ko samet, samet island, ban phe, ao wong duean)

Now in the app: 15 places to eat, 17 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Laem Charoen Seafood / แหลมเจริญซีฟู้ด; Tamnanpar / ตำนานป่า; Waree Seafood / วารีซีฟู้ด; Jae Yindee Seafood / เจ๊ยินดีซีฟู้ด; Jep’s Restaurant; Ploy Talay / พลอยทะเล; The Kitt & Food; Samed Villa Restaurant; Central Rayong food court / ศูนย์อาหาร เซ็นทรัล ระยอง; Ban Phe Market / ตลาดบ้านเพ; Taphong Fruit Market / ตลาดผลไม้ตะพง; Suphattra Land / สวนสุภัทราแลนด์; Swensen’s Central Rayong / สเวนเซ่นส์ เซ็นทรัล ระยอง; Gazebo Cafe Rayong / กาซีโบ; Ran Choei / ร้านเชย

Already in the app — things to do: Koh Samet beaches (Khao Laem Ya–Mu Ko Samet National Park) / เกาะเสม็ด; Hat Mae Ramphueng beach; Khao Chamao–Khao Wong National Park, Khao Chamao waterfall; Rayong Botanical Garden; Sopha Arboretum; Saeng Chan beach; Raksa Sam Bridge mangrove walkway / สะพานรักษ์แสม; Thung Prong Thong (golden mangrove meadow); Suan Lung Thong Bai fruit orchard; Suan La-Mai fruit orchard; Suphattra Land; Koh Kloi floating market; Laem Charoen Beach; Rock and Mineral Research Centre; Wat Ban Don shadow play museum; Rayong Aquarium / สถานแสดงพันธุ์สัตว์น้ำระยอง; Laem Mae Phim beach

### tr-cappadocia — Cappadocia (Türkiye)
Area covered: Cappadocia (also known as / includes: cappadocia, kapadokya, goreme, uchisar, urgup, nevsehir)

Now in the app: 13 places to eat, 19 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Dibek; Topdeck Cave Restaurant; Pumpkin Göreme Restaurant and Art Gallery; Seten Anatolian Cuisine; Old Cappadocia Cafe & Restaurant; Ziggy Cafe & Restaurant; Han Çırağan; Bizim Ev; Old Greek House; Fırın Express; Nazar Börek & Cafe; Cafe Şafak; King's Coffee Shop

Already in the app — things to do: Göreme Open Air Museum / Göreme Açık Hava Müzesi; Kaymaklı Underground City / Kaymaklı Yeraltı Şehri; Derinkuyu Underground City / Derinkuyu Yeraltı Şehri; Zelve Open Air Museum / Zelve Açık Hava Müzesi; Güray Ceramics Museum / Güray Müze; Ihlara Valley / Ihlara Vadisi; Uçhisar Castle / Uçhisar Kalesi; Hot air balloon flight over Göreme; Avanos pottery workshops / Avanos çömlek; Ortahisar castle and old town / Ortahisar; Pigeon Valley walk / Güvercinlik Vadisi; Özkonak Underground City / Özkonak Yeraltı Şehri; Love Valley / Aşk Vadisi; Devrent Valley (Imagination Valley) / Devrent Vadisi; Hair Museum of Avanos (Chez Galip); Paşabağ; Rose Valley / Gül Vadisi; Cappadocia Art & History Museum (dolls); The Three Beauties

### cz-krumlov — Český Krumlov (Czechia)
Area covered: Český Krumlov (also known as / includes: cesky krumlov, krumlov, vltava rafting, karlovy vary)

Now in the app: 15 places to eat, 18 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Krčma Šatlava; Papa's Living Restaurant; Švejk Restaurant; Restaurace Konvice; Hospoda Na Louži; Laibon; Nonna Gina; U Dwau Maryí; Krumlovský mlýn; Kolektiv; Bistro Topinka; Egon Schiele Café; Ideál Coffee Roastery; Caffé Klášter; Restaurant Pivoňka

Already in the app — things to do: Český Krumlov Castle (tour route I) / Státní hrad a zámek Český Krumlov; Castle Tower / Zámecká věž; Castle Garden / Zámecká zahrada; Wooden raft cruise on the Vltava; Historic Play World at the Monasteries / Klášterní dvůr; Museum Fotoatelier Seidel; Regional Museum in Český Krumlov / Regionální muzeum v Českém Krumlově; Hradební Street playground; Linecká Street children's traffic playground; Egon Schiele Art Centrum; Picasso Life exhibition; Palace of Illustration; Port 1560 manor brewery; Marionette Museum and Fairy Tale House; Brown bears in the castle moat; Film Legends Experience Museum; Wax Museum; Moldavite Museum
