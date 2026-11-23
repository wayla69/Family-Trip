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

### kr-gangwon — Nami Island and Gangwon (South Korea)
Area covered: Nami Island and Gangwon (also known as / includes: nami island, namiseom, chuncheon, gapyeong, gangwon, pyeongchang)

Already in the app — places to eat: Tongnamujip Dakgalbi / 통나무집닭갈비; Wonjo Sutbul Dakbulgogi / 원조숯불닭불고기집; Chodang Halmeoni Sundubu / 초당할머니순두부; Donghwa Garden / 동화가든; Gangneung Gamja Ongsimi / 강릉감자옹심이; Bongpo Meoguri-jip / 봉포머구리집; Dancheon Sikdang / 단천식당; Hwangtae Hoegwan / 황태회관; Napjak Sikdang / 납작식당; Sokcho Tourist & Fishery Market / 속초관광수산시장; Manseok Dakgangjeong / 만석닭강정 본점; Gangneung Jungang Market / 강릉중앙시장; Terarosa Coffee Factory / 테라로사 커피공장; Bohemian Roasters / 보헤미안 박이추 커피공장; Cafe Gamjabat / 카페 감자밭; Sundubu Gelato / 순두부젤라또 1호점; Kitchen Onyu / 키친온유; Sodori / 소도리; Gangnaengi Sokuri / 강냉이소쿠리; Pyeongchang Hanwoo Maeul Myeonon Branch / 평창한우마을 면온점; Pyeongchang Hanwoo Maeul Daegwallyeong Branch / 평창한우마을 대관령점; Daegwallyeong Tojong Hanwoo / 대관령토종한우; Yong Udong Alpensia Branch / 용우동 알펜시아점

Already in the app — things to do: Nami Island / 남이섬; LEGOLAND Korea Resort / 레고랜드 코리아; Seoraksan cable car / 설악산 케이블카; Daegwallyeong Sheep Farm / 대관령양떼목장; Alpaca World / 알파카월드; Gangchon Rail Bike / 강촌레일파크; Gyeongpo Beach / 경포해변; Anmok Beach coffee street / 안목해변 커피거리; Sokcho Tourist and Fishery Market / 속초관광수산시장; Ojukheon House and Gangneung Museum / 오죽헌; Soyang River Skywalk / 소양강스카이워크; Chuncheon Animation Museum and Toy Robot Studio / 춘천 애니메이션박물관&토이로봇관; Chuncheon National Museum and Children's Museum / 국립춘천박물관; Chuncheon Puppet Theatre and Puppet Museum / 춘천인형극장&인형극박물관; Sokcho Museum / 속초시립박물관; Samyang Roundhill / 삼양라운드힐; Chuncheon Makguksu Museum / 춘천막국수체험박물관; Gyeongpo Aquarium / 경포아쿠아리움; Hanwha Resort Seorak Waterpia / 설악 워터피아; Jayeona Nolja / 자연아놀자; Gangneung Wonder Sky / 강릉 원더스카이; Sogeumsan Suspension Bridge / 소금산 출렁다리

### tw-hualien — Hualien and Taroko (Taiwan)
Area covered: Hualien and Taroko (also known as / includes: hualien, taroko, taroko gorge, qingshui, yilan, taitung)

Already in the app — places to eat: Ye Xiang Bian Shi / 液香扁食店; Hai Pu Oyster Omelette / 海埔蚵仔煎; Mr. Goose / 鵝肉先生; Jiang Tai Tai Beef Noodles / 江太太牛肉麵; Lai Cheng Spare Ribs Noodle / 來成排骨麵; Salt Lick Smokehouse / 火車頭烤肉屋; Dageeli Tribe Restaurant / 達基力部落屋; Dongdamen Night Market / 東大門夜市; Gong Zheng Bao Zi / 公正包子; Zhou Jia Steamed Dumplings / 周家蒸餃; Lao Pai Zha Dan Cong You Bing / 老牌炸彈蔥油餅; Miaokou Red Tea / 廟口紅茶; Tzen Chi Mochi / 曾記麻糬; Jiaxing Ice Fruit Store / 佳興冰果室; Huilan Bay Landscape Restaurant / 洄瀾灣景觀餐廳

Already in the app — things to do: Farglory Ocean Park / 遠雄海洋公園; Taroko National Park Visitor Centre and plateau trail / 太魯閣國家公園遊客中心; Dongdamen Night Market / 東大門夜市; Liyu Lake / 鯉魚潭; Qixingtan Beach / 七星潭; Guangfu Sugar Factory / 花蓮觀光糖廠; Ruisui Ranch / 瑞穗牧場; Guanglong Museum / 光隆博物館; Hualien County Stone Sculpture Museum / 花蓮縣石雕博物館; Hualien Cultural and Creative Industries Park / 花蓮文化創意產業園區; Danong Dafu Forest Park / 大農大富平地森林園區; Fuyuan National Forest Recreation Area; Lintianshan Forestry Culture Park; Mataian Wetland Ecological Park; Pine Garden / 松園別館; Zhikaxuan Water Park / 知卡宣親水公園; Giraffe Family Park / 長頸鹿親子公園; Zhaofeng Farm / 兆豐農場; Hualien Archaeology Museum / 花蓮考古博物館; Zhang Family Tree Garden / 張家の樹園; Meilun Night Market / 美崙夜市; Chulu Ranch / 初鹿牧場; Native Applied Botanical Garden / 原生應用植物園; Taitung Forest Park / 台東森林公園; Fushan Fish Reserve / 富山護魚區; Zhiben National Forest Recreation Area / 知本國家森林遊樂區; Taiyuan Valley / 泰源幽谷; Cocona Coffee / 可可娜咖啡; Luye Sika Deer Park / 鹿野梅花鹿公園; Xinyuanchang Black Tea Culture Museum / 新元昌紅茶產業文化館

### jp-kanazawa — Kanazawa (Japan)
Area covered: Kanazawa (also known as / includes: kanazawa, kenrokuen, higashi chaya, omicho, ishikawa)

Already in the app — places to eat: Mori Mori Sushi Omicho / もりもり寿し 近江町店; Yamasan Sushi / 山さん寿司 本店; Kanazawa Maimon Sushi Kanazawa Station / 金沢まいもん寿司 金沢駅店; Go Go Curry Kanazawa Station Sohonzan / ゴーゴーカレー 金沢駅総本山; Grill Otsuka / グリルオーツカ; Jiyuken / 自由軒; 8-ban Ramen Kanazawa Station / 8番らーめん 金沢駅店; Miyoshian / 兼六園 三芳庵; Omicho Market / 近江町市場; Kanazawa Hyakubangai Anto / 金沢百番街 あんと; Hakuichi Higashiyama / 箔一 東山店; Le Musee de H Kanazawa / ル ミュゼ ドゥ アッシュ KANAZAWA; Morihachi Honten / 森八 本店; Nodaya Tea Shop / 野田屋茶店; Kanazawa Food Garden; Shunsai Grill Korin; Harajuku Nangoku Shuka; The Dining; Ginza Ten-Ichi; HUM&Go#; Umi no Shokudo BAY ARCE; Wood Style Cafe / ウッドスタイルカフェ; migi to hidari; Kanazawa Nagomitei Hokuto / 金沢なごみ亭 北都; RRR Grill Kitchen; Yasai Kominka / 野菜古民家

Already in the app — things to do: Kenrokuen Garden / 兼六園; Kanazawa Castle Park / 金沢城公園; Higashi Chaya district / ひがし茶屋街; Shima teahouse / 志摩; Nagamachi samurai district / 長町武家屋敷跡; Nomura Samurai House / 武家屋敷跡 野村家; Omicho Market / 近江町市場; 21st Century Museum of Contemporary Art / 金沢21世紀美術館; Kanazawa Umimirai Library / 金沢海みらい図書館; Ishikawa Zoo / いしかわ動物園; Kaga-Honda Museum / 加賀本多博物館; Ishikawa Prefectural Museum of History / 石川県立歴史博物館; Fukui Prefectural Dinosaur Museum / 福井県立恐竜博物館; Notojima Aquarium / のとじま水族館; National Crafts Museum, Ishikawa / 国立工芸館; Kanazawa Port Ship Handling Simulator; Yamato Koji Park; Kodomo Land; Ninja Temple (Myoryu-ji); Ono Karakuri Museum

### kr-jeju — Jeju (South Korea)
Area covered: Jeju (also known as / includes: jeju, jeju island, seogwipo, seongsan, hallasan)

Already in the app — places to eat: Myeongjin Jeonbok / 명진전복; Ollae Guksu / 올래국수; Jamae Guksu / 자매국수; Samdae Guksu Hoegwan / 삼대국수회관 본점; Donsadon / 돈사돈 본점; Chunsimine / 춘심이네 본점; Ojo Haenyeo-ui Jip / 오조해녀의집; Deokseongwon / 덕성원; Gozip Dol Wooluck Jungmun / 고집돌우럭 중문점; Dongmun Traditional Market / 동문재래시장; Seogwipo Maeil Olle Market / 서귀포매일올레시장; Jeju Kimmanbok / 제주김만복 본점; Osulloc Tea Museum / 오설록 티뮤지엄; Cafe Bomnal / 봄날카페; Cafe Delmoondo / 카페 델문도; Hanmaeum Butcher Restaurant Jeju Ido Branch; Dambaek Hamdeok Branch; Gozip Dolureok Jungmun Branch; Jungmun Godeungeo Ssambap; Jeju Seafood Bowl; Munmunseon; Oedo339; Westground; Iolle Inforest

Already in the app — things to do: Aqua Planet Jeju / 아쿠아플라넷 제주; Seongsan Ilchulbong / 성산일출봉; Manjanggul Lava Tube / 만장굴; Hamdeok Beach / 함덕해수욕장; Hyeopjae Beach / 협재해수욕장; Hallim Park / 한림공원; Jeju Stone Park / 제주돌문화공원; Eco Land Theme Park / 에코랜드 테마파크; Snoopy Garden / 스누피가든; Jeju Aerospace Museum / 제주항공우주박물관; Jeju National Museum / 국립제주박물관; Jeju Folk Village / 제주민속촌; Cheonjiyeon Waterfall / 천지연폭포; Dongmun Market and Night Market / 동문재래시장; Seogwipo Maeil Olle Market / 서귀포매일올레시장; Teddy Bear Museum Jeju / 테디베어뮤지엄; Camellia Hill / 카멜리아힐; Hello Kitty Island; Jeju Clip 'N Climb; Bunker de Lumières / 빛의 벙커; Nexon Computer Museum / 넥슨컴퓨터박물관; Bonte Museum / 본태박물관
