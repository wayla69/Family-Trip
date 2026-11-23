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

### vn-saigon — Ho Chi Minh City and the Mekong Delta (Vietnam)
Area covered: Ho Chi Minh City and the Mekong Delta (also known as / includes: ho chi minh city, saigon, mekong delta, can tho, cu chi, ben thanh)

Already in the app — places to eat: Phở Hòa Pasteur; Cục Gạch Quán; Quán Ăn Ngon 138; Secret Garden; Hoa Túc; Pizza 4P's Bến Thành; Cơm Tấm Ba Ghiền; Bánh Xèo 46A; Mekong Rest Stop; Sao Hôm; Chợ Bến Thành; Bánh Mì Huỳnh Hoa; Saigon Centre Takashimaya food hall; Maison Marou Saigon; The Workshop Coffee; Au Parc

Already in the app — things to do: Saigon Zoo and Botanical Gardens / Thảo Cầm Viên Sài Gòn; Dam Sen Cultural Park / Công viên Văn hóa Đầm Sen; Dam Sen Water Park / Công viên nước Đầm Sen; Suoi Tien Theme Park / Khu du lịch Văn hóa Suối Tiên; Saigon Waterbus / Buýt sông Sài Gòn; Independence Palace / Dinh Độc Lập; Ben Thanh Market / Chợ Bến Thành; Saigon Central Post Office / Bưu điện Trung tâm Sài Gòn; Tao Dan Park / Công viên Tao Đàn; Nguyen Hue Walking Street / Phố đi bộ Nguyễn Huệ; Binh Tay Market / Chợ Bình Tây; Thien Hau Temple / Chùa Bà Thiên Hậu; Landmark 81 SkyView; A O Show at the Saigon Opera House / Nhà hát Thành phố; Gia Dinh Park / Công viên Gia Định; VinWonders Grand Park; tiNiWorld, AEON Tan Phu; War Remnants Museum / Bảo tàng Chứng tích Chiến tranh; Ho Chi Minh City Museum of History / Bảo tàng Lịch sử Thành phố Hồ Chí Minh; Tien Dong Ngoc Nu Beach; Cu Chi Water Park; Fanpekka; Dream Kids; Vietopia

### jp-yokohama — Yokohama and Kamakura (Japan)
Area covered: Yokohama and Kamakura (also known as / includes: yokohama, enoshima, minato mirai, minatomirai, shonan, enoden)

Already in the app — places to eat: Manchinro Honten / 萬珍樓 本店; Katsuretsu-an Bashamichi Sohonten / 勝烈庵 馬車道総本店; Center Grill / センターグリル; The Cafe Hotel New Grand / ホテルニューグランド ザ・カフェ; Yoshimuraya / 家系総本山 吉村家; Bills Yokohama Red Brick Warehouse / bills 横浜赤レンガ倉庫; Kamakura Matsubara-an / 鎌倉 松原庵; Shirasuya Koshigoe Gyoko-mae / しらすや 腰越漁港前店; Tobiccho Honten / とびっちょ 本店; Shin-Yokohama Ramen Museum / 新横浜ラーメン博物館; Edosei Honten / 江戸清 中華街本店; Komachi-dori / 小町通り; Pompadour Motomachi Honten / ポンパドウル 元町本店; Bashamichi Jubankan / 馬車道十番館; Toshimaya Honten / 豊島屋 本店; Iwata Coffee / イワタコーヒー店; Babel Bayside Kitchen / バベル ベイサイド キッチン; Aloha Table Yokohama Bay Quarter / アロハテーブル 横浜ベイクォーター; COLONIAL BEACH Yokohama Hammerhead / COLONIAL BEACH 横浜ハンマーヘッド; Bubby's Landmark Plaza / バビーズ ランドマークプラザ; Kamakura Kaigai Table / 鎌倉海街テーブル; toi toi toi / トイ トイ トイ

Already in the app — things to do: Yokohama Anpanman Children's Museum / 横浜アンパンマンこどもミュージアム; Cupnoodles Museum Yokohama / カップヌードルミュージアム 横浜; Yokohama Hakkeijima Sea Paradise / 横浜・八景島シーパラダイス; Enoshima Aquarium / 新江ノ島水族館; Nogeyama Zoo / 野毛山動物園; Yokohama Zoological Gardens Zoorasia / よこはま動物園ズーラシア; Hara Model Railway Museum / 原鉄道模型博物館; Nippon Maru sailing ship and Yokohama Port Museum / 帆船日本丸・横浜みなと博物館; Enoshima Sea Candle and Samuel Cocking Garden / 江の島シーキャンドル・江の島サムエル・コッキング苑; Yokohama Red Brick Warehouse / 横浜赤レンガ倉庫; Yamashita Park / 山下公園; Yokohama Chinatown / 横浜中華街; Yokohama Kodomo-no-kuni / こどもの国; Sankeien Garden / 三溪園; Komachi-dori food street / 小町通り; Enoden train ride, Kamakura to Enoshima / 江ノ電; Hamagin Children's Space Science Center / はまぎん こども宇宙科学館; Yokohama Cosmo World / よこはまコスモワールド; TOYLO PARK, Lalaport Yokohama / TOYLO PARK powered by リトルプラネット イトーヨーカドー ららぽーと横浜

### th-khaoyai — Khao Yai and Pak Chong (Thailand)
Area covered: Khao Yai and Pak Chong (also known as / includes: khao yai, pak chong, wang nam khiao, thap lan)

Already in the app — places to eat: Krua Khao Yai / ครัวเขาใหญ่; Pen Lao / เป็นลาว; Dairy Home / แดรี่โฮม; Chokchai Steakhouse / โชคชัยสเต็กเฮาส์; Midwinter Green; The Great Hornbill Grill; Yungkhaow Khaoyai / ยุ้งข้าว เขาใหญ่; Ban Mai Chay Nam / บ้านไม้ชายน้ำ; Pak Chong Night Market / ตลาดไนท์บาซาร์ปากช่อง; Rai Suwan / ไร่สุวรรณ; The Chocolate Factory Khao Yai; Umm!.. Milk / อืมม!..มิลค์; Yellow Submarine Coffee Tank; Like A Mountain / ไลค์ อะ เมาท์เท่น; EL Cafe / เอล คาเฟ่; Pirom Cafe / ภิรมย์ คาเฟ่; Blossom Bloom / บลอสซั่ม บลูม; Banyakart Khaoyai / บรรยากาศ เขาใหญ่; Donghouse / บ้านดง; Floryday Khaoyai Cafe & Flower / ฟลอรี่เดย์ เขาใหญ่ คาเฟ่ แอนด์ ฟลาวเวอร์; Rosebay Home Cooking & Cafe / โรสเบย์ โฮม คุกกิ้ง แอนด์ คาเฟ่; KHAAM Khaoyai / ขาม เขาใหญ่; Olna x PY Roasters / โอลนา พีวาย โรสเตอร์ส

Already in the app — things to do: Khao Yai National Park / อุทยานแห่งชาติเขาใหญ่; Farm Chokchai / ฟาร์มโชคชัย; Khao Yai Art Museum / เขาใหญ่ อาร์ต มิวเซียม; Khao Yai Art Forest; Scenical World / Scenical World Khao Yai; Pak Chong Night Market / ตลาดโต้รุ่งปากช่อง; PB Valley Khao Yai Winery; The Chocolate Factory Khao Yai / The Chocolate Factory Khaoyai; Primo Piazza; Mae Mon Mulberry Farm and Café; Flora Park Learning Centre; Klang Phana Rose Garden; Haew Suwat Waterfall; Takrao Waterfall; Lam Phra Phloeng Reservoir; Kong Kaew Waterfall; Pha Kluai Mai Waterfall; Nong Phak Chi Observation Tower

### jp-nagano — Nagano and Matsumoto (Japan)
Area covered: Nagano and Matsumoto (also known as / includes: nagano, matsumoto, kamikochi, togakushi, hakuba, azumino)

Already in the app — places to eat: Fujikian / 藤木庵; Kadono Daimaru / かどの大丸; Meijitei Nagano Station / 明治亭 長野駅ビルMIDORI店; Chikufudo Zenkoji Daimon / 竹風堂 善光寺大門店; Enza Cafe / 猿座カフェ; Kobayashi Soba / こばやし本店; Soba Takagi / そば処 たかぎ; Ogawa-no-Sho Oyaki Mura Daimon / 小川の庄 おやき村 大門店; Zenkoji Nakamise Street / 善光寺 仲見世通り; Nawate Street / 縄手通り; Heigoro Honten / 平五郎 本店; Yokomachi Cafe Yawataya Isogoro / 八幡屋礒五郎 横町カフェ; Coffee Marumo / 珈琲まるも; Masamura / マサムラ 本店; Gosenjaku Kitchen; Gyoza no Ohsho Alpico Plaza Matsumoto; CAFE SWEET Nawate Street; Korean BBQ Namsan Nagano Terminal East Entrance; Saizeriya; Sky Restaurant Hakuba; Keitei / 桂亭

Already in the app — things to do: Jigokudani Snow Monkey Park / 地獄谷野猿公苑; Matsumoto Castle / 松本城; Daio Wasabi Farm / 大王わさび農場; Alps Azumino National Government Park, Horigane and Hotaka area / 国営アルプスあづみの公園 堀金・穂高地区; Nagano Chausuyama Zoo / 茶臼山動物園; Togakushi Chibikko Ninja Village / 戸隠 チビッコ忍者村; Matsumoto City Alps Park / 松本市アルプス公園; Nawate-dori and Nakamachi streets / 縄手通り・中町通り; Nagano City Museum and Planetarium / 長野市立博物館; Matsumoto City Museum / 松本市立博物館; Japan Ukiyo-e Museum / 日本浮世絵博物館; Narai-juku post town / 奈良井宿; Matsumoto City Museum of Art / 松本市美術館; Ikenotaira Family Land / 白樺高原 池の平ファミリーランド; Nagano Prefectural Art Museum / 長野県立美術館; Nakamise-dori street / 仲見世通り; Forest Adventure Nagano; Shiga Fossil House; Ta Kagi; Japan Radio Museum; Ishii Miso Brewery
