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

### tr-istanbul — Istanbul (Türkiye)
Area covered: Istanbul (also known as / includes: istanbul, sultanahmet, bosphorus, galata, taksim, kadikoy)

Already in the app — places to eat: Hamdi Restaurant; Tarihi Sultanahmet Köftecisi Selim Usta; Çiya Sofrası; Karaköy Lokantası; Kanaat Lokantası; Şehzade Cağ Kebap; Develi Samatya; Hünkar; Dürümzade; Namlı Gurme; Kızılkayalar; Hafız Mustafa 1864; Karaköy Güllüoğlu; Vefa Bozacısı; Zubeyir Ocakbasi; Kayseri Manti Evi; Manti Evi; Van Kahvalti Evi; Baylan Pastanesi

Already in the app — things to do: Miniatürk; Rahmi M. Koç Museum / Rahmi M. Koç Müzesi; Istanbul Aquarium / İstanbul Akvaryum; Basilica Cistern / Yerebatan Sarnıcı; Topkapı Palace / Topkapı Sarayı; Istanbul Archaeology Museums / İstanbul Arkeoloji Müzeleri; Gülhane Park / Gülhane Parkı; Bosphorus cruise / Boğaz Turu; Spice Bazaar (Egyptian Bazaar) / Mısır Çarşısı; Istanbul Toy Museum / İstanbul Oyuncak Müzesi; Emirgan Park / Emirgan Korusu; Galata Tower / Galata Kulesi; Princes' Islands (Büyükada) / Büyükada; Panorama 1453 History Museum / Panorama 1453 Tarih Müzesi; Istanbul Naval Museum / Deniz Müzesi; Museum of Illusions – Istanbul; Dolmabahçe Palace; Blue Mosque; Süleymaniye Mosque; Eyüp Sultan Mosque; Eyüp–Pierre Loti Cable Car; Golden Horn Ferry; Galata Bridge; Müze Gazhane Children’s Science Center; Bilim Üsküdar; Nickelodeon Play Tersane Istanbul; Natural Science Museum; Kemerburgaz Urban Forest

### jp-yokohama — Yokohama and Kamakura (Japan)
Area covered: Yokohama and Kamakura (also known as / includes: yokohama, enoshima, minato mirai, minatomirai, shonan, enoden)

Already in the app — places to eat: Manchinro Honten / 萬珍樓 本店; Katsuretsu-an Bashamichi Sohonten / 勝烈庵 馬車道総本店; Center Grill / センターグリル; The Cafe Hotel New Grand / ホテルニューグランド ザ・カフェ; Yoshimuraya / 家系総本山 吉村家; Bills Yokohama Red Brick Warehouse / bills 横浜赤レンガ倉庫; Kamakura Matsubara-an / 鎌倉 松原庵; Shirasuya Koshigoe Gyoko-mae / しらすや 腰越漁港前店; Tobiccho Honten / とびっちょ 本店; Shin-Yokohama Ramen Museum / 新横浜ラーメン博物館; Edosei Honten / 江戸清 中華街本店; Komachi-dori / 小町通り; Pompadour Motomachi Honten / ポンパドウル 元町本店; Bashamichi Jubankan / 馬車道十番館; Toshimaya Honten / 豊島屋 本店; Iwata Coffee / イワタコーヒー店; Babel Bayside Kitchen / バベル ベイサイド キッチン; Aloha Table Yokohama Bay Quarter / アロハテーブル 横浜ベイクォーター; COLONIAL BEACH Yokohama Hammerhead / COLONIAL BEACH 横浜ハンマーヘッド; Bubby's Landmark Plaza / バビーズ ランドマークプラザ; Kamakura Kaigai Table / 鎌倉海街テーブル; toi toi toi / トイ トイ トイ

Already in the app — things to do: Yokohama Anpanman Children's Museum / 横浜アンパンマンこどもミュージアム; Cupnoodles Museum Yokohama / カップヌードルミュージアム 横浜; Yokohama Hakkeijima Sea Paradise / 横浜・八景島シーパラダイス; Enoshima Aquarium / 新江ノ島水族館; Nogeyama Zoo / 野毛山動物園; Yokohama Zoological Gardens Zoorasia / よこはま動物園ズーラシア; Hara Model Railway Museum / 原鉄道模型博物館; Nippon Maru sailing ship and Yokohama Port Museum / 帆船日本丸・横浜みなと博物館; Enoshima Sea Candle and Samuel Cocking Garden / 江の島シーキャンドル・江の島サムエル・コッキング苑; Yokohama Red Brick Warehouse / 横浜赤レンガ倉庫; Yamashita Park / 山下公園; Yokohama Chinatown / 横浜中華街; Yokohama Kodomo-no-kuni / こどもの国; Sankeien Garden / 三溪園; Komachi-dori food street / 小町通り; Enoden train ride, Kamakura to Enoshima / 江ノ電; Hamagin Children's Space Science Center / はまぎん こども宇宙科学館; Yokohama Cosmo World / よこはまコスモワールド; TOYLO PARK, Lalaport Yokohama / TOYLO PARK powered by リトルプラネット イトーヨーカドー ららぽーと横浜

### jp-kanazawa — Kanazawa (Japan)
Area covered: Kanazawa (also known as / includes: kanazawa, kenrokuen, higashi chaya, omicho, ishikawa)

Already in the app — places to eat: Mori Mori Sushi Omicho / もりもり寿し 近江町店; Yamasan Sushi / 山さん寿司 本店; Kanazawa Maimon Sushi Kanazawa Station / 金沢まいもん寿司 金沢駅店; Go Go Curry Kanazawa Station Sohonzan / ゴーゴーカレー 金沢駅総本山; Grill Otsuka / グリルオーツカ; Jiyuken / 自由軒; 8-ban Ramen Kanazawa Station / 8番らーめん 金沢駅店; Miyoshian / 兼六園 三芳庵; Omicho Market / 近江町市場; Kanazawa Hyakubangai Anto / 金沢百番街 あんと; Hakuichi Higashiyama / 箔一 東山店; Le Musee de H Kanazawa / ル ミュゼ ドゥ アッシュ KANAZAWA; Morihachi Honten / 森八 本店; Nodaya Tea Shop / 野田屋茶店; Kanazawa Food Garden; Shunsai Grill Korin; Harajuku Nangoku Shuka; The Dining; Ginza Ten-Ichi; HUM&Go#; Umi no Shokudo BAY ARCE; Wood Style Cafe / ウッドスタイルカフェ; migi to hidari; Kanazawa Nagomitei Hokuto / 金沢なごみ亭 北都; RRR Grill Kitchen; Yasai Kominka / 野菜古民家

Already in the app — things to do: Kenrokuen Garden / 兼六園; Kanazawa Castle Park / 金沢城公園; Higashi Chaya district / ひがし茶屋街; Shima teahouse / 志摩; Nagamachi samurai district / 長町武家屋敷跡; Nomura Samurai House / 武家屋敷跡 野村家; Omicho Market / 近江町市場; 21st Century Museum of Contemporary Art / 金沢21世紀美術館; Kanazawa Umimirai Library / 金沢海みらい図書館; Ishikawa Zoo / いしかわ動物園; Kaga-Honda Museum / 加賀本多博物館; Ishikawa Prefectural Museum of History / 石川県立歴史博物館; Fukui Prefectural Dinosaur Museum / 福井県立恐竜博物館; Notojima Aquarium / のとじま水族館; National Crafts Museum, Ishikawa / 国立工芸館; Kanazawa Port Ship Handling Simulator; Yamato Koji Park; Kodomo Land; Ninja Temple (Myoryu-ji); Ono Karakuri Museum

### jp-hiroshima — Hiroshima, Miyajima and Kobe (Japan)
Area covered: Hiroshima, Miyajima and Kobe (also known as / includes: hiroshima, miyajima, itsukushima, kobe, okayama, himeji)

Already in the app — places to eat: Micchan Sohonten Hatchobori / みっちゃん総本店 八丁堀本店; Nagataya / 長田屋; Anagomeshi Ueno / あなごめし うえの; Yakigaki no Hayashi / 焼がきのはやし; Kakiya / 牡蠣屋; Steakland Kobe / ステーキランド 神戸館; Grill Ippei Motomachi / グリル一平 元町店; Bekkan Botanen / 別館牡丹園; Okonomimura / お好み村; Miyajima Omotesando Shopping Street / 宮島表参道商店街; Nankinmachi Chinatown / 南京町; Hiroshima Andersen / 広島アンデルセン; Momijido Honten / 紅葉堂 本店; Kobe Nishimura Coffee Nakayamate Honten / 神戸にしむら珈琲店 中山手本店; Freundlieb / フロインドリーブ; Chano-ma Hiroshima / チャノマ 広島; mycafe / マイカフェ; All Day Dining Fruitier / オールデイダイニング フリュティエ; Cafe 1400 / カフェ1400; Cafe Flowery / カフェフロウリー; Italian Kitchen Bansan Parti Fujisaka / イタリアンキッチン バンサン パルティ・フジ坂店

Already in the app — things to do: Peace Memorial Park / 平和記念公園; Hiroshima Peace Memorial Museum / 広島平和記念資料館; Hiroshima Castle grounds / 広島城; Hiroshima City Asa Zoological Park / 広島市安佐動物公園; Miyajima Ropeway to Mount Misen / 宮島ロープウェー; Shukkeien Garden / 縮景園; Hiroshima Orizuru Tower / おりづるタワー; Okonomimura / お好み村; Kobe Anpanman Children's Museum and Mall / 神戸アンパンマンこどもミュージアム&モール; Himeji Castle / 姫路城; Kobe Suma Sea World / 神戸須磨シーワールド; Kobe Nunobiki Herb Garden and Ropeway / 神戸布引ハーブ園/ロープウェイ; Okayama Korakuen Garden / 岡山後楽園; Meriken Park, Kobe / メリケンパーク; Kobe Port Tower / 神戸ポートタワー; Miyajima Aquarium
