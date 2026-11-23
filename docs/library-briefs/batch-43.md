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

### kr-jeonju — Jeonju (South Korea)
Area covered: Jeonju (also known as / includes: jeonju, jeonju hanok village, maisan, daedunsan, imsil, byeonsan)

Already in the app — places to eat: Hanguk-jip / 한국집; Gajok Hoegwan / 가족회관; Seongmidang / 성미당; Gogung Jeonju / 고궁 본점; Sambaekjip / 삼백집 본점; Waengi Kongnamul Gukbap / 왱이콩나물국밥; Veteran Kalguksu / 베테랑칼국수 본점; Jo Jeom-rye Nammun Pisundae / 조점례남문피순대; Gyodong Tteokgalbi / 교동떡갈비; Nambu Market Night Market / 전주남부시장 야시장; Gilgeoriya / 길거리야; Daurang / 다우랑; PNB Pungnyeon Bakery / PNB풍년제과 본점; Oehalmeoni Somssi / 외할머니솜씨; Gyodong Dawon / 교동다원; Gogung Suragan; Jeondong Ddeokgalbi; Galbi Hankki / 갈비한끼; Jongno Hall; Sinbaengi Kimchi; Gyodong Sarang; Haeyooldam / 해율담; Hwasim Sundubu Jeonju Branch / 화심순두부; Hyundaiok Ajung Branch / 현대옥; Ilpumhyang; Jungang Hoegwan; Baeksong Hoegwan / 백송회관

Already in the app — things to do: Jeonju Hanok Village / 전주한옥마을; Gyeonggijeon Shrine / 경기전; Omokdae viewpoint / 오목대; Jeonju Zoo / 전주동물원; National Jeonju Museum and Children's Museum / 국립전주박물관; Nambu Market and Youth Mall / 전주 남부시장 청년몰; Jeonju Natural Ecology Museum / 전주자연생태관; Jeonju Hanji Museum / 전주한지박물관; National Intangible Heritage Center / 국립무형유산원; Deokjin Park / 덕진공원; Hayan Yangokjip / 하얀양곡집; Jeonju Nanjang retro museum / 전주난장; Korea Expressway Corporation Jeonju Arboretum / 한국도로공사 전주수목원; Palbok Art Factory / 팔복예술공장; Jeonju Hanok Village History Museum; Jeonbuk Children's Creative Experience Centre / 전북특별자치도 어린이 창의체험관; Agricultural Science Museum / 농업과학관; Deokjin Park Yaho Forest Playground / 덕진공원 야호 맘껏숲놀이터; Nadeulmok Family Park / 나들목 가족공원

### tw-central — Central Taiwan (Taiwan)
Area covered: Central Taiwan (also known as / includes: sun moon lake, alishan, taichung, nantou, cingjing, gaomei)

Already in the app — places to eat: Fu Din Wang / 富鼎旺豬腳; Qin Yuan Chun / 沁園春; Taichung Meat Ball / 台中肉員; Jin Du Restaurant / 金都餐廳; Full House Resort Restaurant / 富豪群渡假民宿餐廳; Fountain Chicken Rice / 噴水雞肉飯 總店; Lin Cong Ming Fish Head Casserole / 林聰明沙鍋魚頭; Fenqihu Hotel Lunch Box / 奮起湖大飯店 便當; Fengjia Night Market / 逢甲夜市; Taichung Second Market / 台中第二市場; Ita Thao Shopping Street / 伊達邵商店街; A-Zhen Meat Buns / 阿振肉包; Miyahara / 宮原眼科; Chun Shui Tang Siwei Original Store / 春水堂 四維創始店; Feeling 18 Chocolate / 18度C巧克力工房; Yu Jen Jai / 玉珍齋; Island 3.5 Degrees Family Restaurant / 小島3.5度; Butter Hippo Family Restaurant / 奶油河馬家庭餐廳; Zanmen Xiaoshihou Kids' Restaurant / 咱們小時候; Paper Box King Science Museum Branch / 紙箱王博館店

Already in the app — things to do: National Museum of Natural Science / 國立自然科學博物館; Formosan Aboriginal Culture Village and Sun Moon Lake ropeway / 九族文化村; Rainbow Village / 彩虹眷村; Cingjing Farm Green Grassland / 清境農場青青草原; Fantasy Land indoor park (Dali) / 異想新樂園; Gaomei Wetlands / 高美濕地; Fengjia Night Market / 逢甲夜市; Wonder New Land / 新奇夢想樂園; Lihpao Land / 麗寶樂園; National Taiwan Museum of Fine Arts / 國立臺灣美術館; 921 Earthquake Museum of Taiwan / 921地震教育園區; Xitou Nature Education Area / 溪頭自然教育園區; Taiwan Glass Gallery / 台灣玻璃館; Guliu Playground, Aofeng Mountain Park / 鰲峰山谷溜遊戲場; Dakeng Hiking Trail No. 9; Museum of Illusions Taichung / 幻覺博物館; Yohocraft Craft Hall / 約客＆厚禮築夢手創館; Barefoot Eco Farm / 赤腳丫生態農莊; Wilson's Farm / 威爾森的農場; Yijian Dairy Goat Farm / 益健乳羊牧場; Paper Box King Creative Park / 紙箱王創意園區; Macaron Park / 馬卡龍公園; Dongshi Forest Recreation Area / 東勢林場遊樂區; National Comics Museum / 國家漫畫博物館; Jiujiufeng Zoo Park / 九九峰動物樂園; Kuang Hsing Paper Mill / 廣興紙寮

### th-maehongson — Mae Hong Son, Pang Ung and Mae Sariang (Thailand)
Area covered: Mae Hong Son, Pang Ung and Mae Sariang (also known as / includes: mae hong son, pang ung, mae sariang, ban rak thai, pang mapha, khun yuam)

Already in the app — places to eat: Fern Restaurant / ใบเฟิร์น; Salween River Restaurant; Kai Mook / ไข่มุก; Lee Wine Rak Thai / ลีไวน์รักไทย; Intira Restaurant / อินทิรา; Coriander in Redwood; Riverhouse Restaurant; Mae Hong Son Walking Street / ถนนคนเดินแม่ฮ่องสอน; Sai Yut Morning Market / ตลาดสายหยุด; Coffee Morning; Nompangngai Cafe / หนมปังไง คาเฟ่; One Off Coffee; Huean Tai Coffee / เฮือนไต คอฟฟี่; Alawaa Cafe; Om Garden Cafe; Joy's Place; Dang Thai Food; Earth Tone; Nong Beer Restaurant; Pang Pao Dim Sum / ปังเปาติ่มซำ; Baan Pai Restaurant / ร้านอาหารบ้านปาย; Somtam Tad Baan Suan Pai / ส้มตำถาดบ้านสวน ปาย; Kuaitiao Pa Hom / ก๋วยเตี๋ยวป้าหอม แม่ฮ่องสอน; Jok Samunphrai Lung Ot / โจ๊กสมุนไพรลุงออ๊อด

Already in the app — things to do: Pang Ung / ปางอุ๋ง โครงการพัฒนาตามพระราชดำริ 2; Pang Tong Palace / พระตำหนักปางตอง; Tham Pla (Fish Cave) and Pha Suea National Park / อุทยานแห่งชาติถ้ำปลา-น้ำตกผาเสื่อ; Pha Suea Waterfall / น้ำตกผาเสื่อ; Mae Surin Waterfall National Park / อุทยานแห่งชาติน้ำตกแม่สุรินทร์; Ban Rak Thai / บ้านรักไทย; Jong Kham Lake night market / ตลาดกลางคืนหนองจองคำ; Saiyut morning market (Kad Chao) / ตลาดสายหยุด (กาดเช้า); Wat Phra That Doi Kong Mu / วัดพระธาตุดอยกองมู; Tham Lod Cave; Wat Jong Kham and Wat Jong Klang; Doi Mae U Kho sunflower fields; Royal Folk Arts and Crafts Centre; Su Tong Pe bamboo bridge; Bua tong fields at Doi Mae Ho; Pai Canyon; Pai Walking Street Night Market; Pam Bok Waterfall; Mo Paeng Waterfall; Tha Pai Hot Springs; The Land Crack; Wat Phra That Mae Yen; Santichon Village

### tr-istanbul — Istanbul (Türkiye)
Area covered: Istanbul (also known as / includes: istanbul, sultanahmet, bosphorus, galata, taksim, kadikoy)

Already in the app — places to eat: Hamdi Restaurant; Tarihi Sultanahmet Köftecisi Selim Usta; Çiya Sofrası; Karaköy Lokantası; Kanaat Lokantası; Şehzade Cağ Kebap; Develi Samatya; Hünkar; Dürümzade; Namlı Gurme; Kızılkayalar; Hafız Mustafa 1864; Karaköy Güllüoğlu; Vefa Bozacısı; Zubeyir Ocakbasi; Kayseri Manti Evi; Manti Evi; Van Kahvalti Evi; Baylan Pastanesi

Already in the app — things to do: Miniatürk; Rahmi M. Koç Museum / Rahmi M. Koç Müzesi; Istanbul Aquarium / İstanbul Akvaryum; Basilica Cistern / Yerebatan Sarnıcı; Topkapı Palace / Topkapı Sarayı; Istanbul Archaeology Museums / İstanbul Arkeoloji Müzeleri; Gülhane Park / Gülhane Parkı; Bosphorus cruise / Boğaz Turu; Spice Bazaar (Egyptian Bazaar) / Mısır Çarşısı; Istanbul Toy Museum / İstanbul Oyuncak Müzesi; Emirgan Park / Emirgan Korusu; Galata Tower / Galata Kulesi; Princes' Islands (Büyükada) / Büyükada; Panorama 1453 History Museum / Panorama 1453 Tarih Müzesi; Istanbul Naval Museum / Deniz Müzesi; Museum of Illusions – Istanbul; Dolmabahçe Palace; Blue Mosque; Süleymaniye Mosque; Eyüp Sultan Mosque; Eyüp–Pierre Loti Cable Car; Golden Horn Ferry; Galata Bridge; Müze Gazhane Children’s Science Center; Bilim Üsküdar; Nickelodeon Play Tersane Istanbul; Natural Science Museum; Kemerburgaz Urban Forest
