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

### kr-busan — Busan (South Korea)
Area covered: Busan (also known as / includes: busan, pusan, haeundae, gamcheon, gwangalli, nampo)

Already in the app — places to eat: Halmae Gaya Milmyeon / 할매가야밀면; Choryang Milmyeon / 초량밀면; Ssangdungi Dwaeji Gukbap / 쌍둥이돼지국밥; Bonjeon Dwaeji Gukbap / 본전돼지국밥; Haeundae Somunnan Amso Galbijip / 해운대소문난암소갈비집; Haeundae Wonjo Halmae Gukbap / 해운대원조할매국밥; Geumsu Bokguk Haeundae / 금수복국 해운대본점; Sinbalwon / 신발원; Songjeong 3-dae Gukbap / 송정3대국밥; Jagalchi Market / 자갈치시장; Samjin Eomuk Yeongdo Main Store / 삼진어묵 영도본점; BIFF Square street food / BIFF광장; Haeundae Traditional Market / 해운대전통시장; OPS Haeundae / 옵스 해운대점; B&C Bakery / 비엔씨; Momos Coffee / 모모스커피 본점; Nasari Sikdang Gwangalli; Seomgwa Seom Sa-i Clam BBQ Gwangalli; Hwadalgu Charcoal Jjukkumi Gwangalli; Haean Galbi Gwangalli Main Branch; Solsot Gwangalli; Jo Gae Dae Pyo Gwangalli Main Branch; Busan Tobagi Dwaeji Gukbap Gwangalli Main Branch; Dongmyeon Sik Milmyeon; Ilgwang Susan Raw Fish Restaurant; Cheonghwabaek Dwaeji Gukbap, Gwangalli; Somunnan Dwaeji Gukbap, Bupyeong; Subyeon Choego Dwaeji Gukbap, Millak; Onammae Dwaeji Gukbap, Jeonggwan; Hwanamjeong Dwaeji Gukbap, Choeup; Mokchon Dwaeji Gukbap, Yeonsan City Hall; Hapcheon Gukbapjip, Yongho; Snoopy Place Busan; Badadang; Choryang Galbi; Wonjo Ilmi Gisa Sikdang; Seomyeon Food Alley; Seomyeon Market; Haeundae Pojangmacha-chon; Arirang Street Food Street; Bupyeong Kkangtong Market

Already in the app — things to do: SEA LIFE Busan Aquarium / 씨라이프 부산아쿠아리움; Haeundae Blueline Park / 해운대 블루라인파크; Lotte World Adventure Busan / 롯데월드 어드벤처 부산; Skyline Luge Busan / 스카이라인 루지 부산; Busan National Science Museum / 국립부산과학관; Busan X the Sky / 부산엑스더스카이; Songdo Marine Cable Car (Busan Air Cruise) / 송도해상케이블카; Songdo Cloud Bridge / 송도구름산책로; Gamcheon Culture Village / 감천문화마을; Huinnyeoul Culture Village / 흰여울문화마을; Busan Tower and Yongdusan Park / 부산타워 · 용두산공원; Jagalchi Market / 자갈치시장; BIFF Square and Gukje Market / BIFF광장 · 국제시장; Busan Citizens Park / 부산시민공원; Gwangalli Beach drone light show / 광안리 M 드론 라이트쇼; Busan Museum of Art / 부산시립미술관; National Maritime Museum of Korea; Busan Museum; Busan Museum of Movies; Haedong Yonggungsa Temple; Champion Playtime Kids Cafe; Cheongsapo Daritdol Observatory; Songdo Yonggung Suspension Bridge; Dadaepo Sunset Fountain of Dreams; Danubi Train at Busan Taejongdae Park

### kr-jeju — Jeju (South Korea)
Area covered: Jeju (also known as / includes: jeju, jeju island, seogwipo, seongsan, hallasan)

Already in the app — places to eat: Myeongjin Jeonbok / 명진전복; Ollae Guksu / 올래국수; Jamae Guksu / 자매국수; Samdae Guksu Hoegwan / 삼대국수회관 본점; Donsadon / 돈사돈 본점; Chunsimine / 춘심이네 본점; Ojo Haenyeo-ui Jip / 오조해녀의집; Deokseongwon / 덕성원; Gozip Dol Wooluck Jungmun / 고집돌우럭 중문점; Dongmun Traditional Market / 동문재래시장; Seogwipo Maeil Olle Market / 서귀포매일올레시장; Jeju Kimmanbok / 제주김만복 본점; Osulloc Tea Museum / 오설록 티뮤지엄; Cafe Bomnal / 봄날카페; Cafe Delmoondo / 카페 델문도; Hanmaeum Butcher Restaurant Jeju Ido Branch; Dambaek Hamdeok Branch; Gozip Dolureok Jungmun Branch; Jungmun Godeungeo Ssambap; Jeju Seafood Bowl; Munmunseon; Oedo339; Westground; Iolle Inforest

Already in the app — things to do: Aqua Planet Jeju / 아쿠아플라넷 제주; Seongsan Ilchulbong / 성산일출봉; Manjanggul Lava Tube / 만장굴; Hamdeok Beach / 함덕해수욕장; Hyeopjae Beach / 협재해수욕장; Hallim Park / 한림공원; Jeju Stone Park / 제주돌문화공원; Eco Land Theme Park / 에코랜드 테마파크; Snoopy Garden / 스누피가든; Jeju Aerospace Museum / 제주항공우주박물관; Jeju National Museum / 국립제주박물관; Jeju Folk Village / 제주민속촌; Cheonjiyeon Waterfall / 천지연폭포; Dongmun Market and Night Market / 동문재래시장; Seogwipo Maeil Olle Market / 서귀포매일올레시장; Teddy Bear Museum Jeju / 테디베어뮤지엄; Camellia Hill / 카멜리아힐; Hello Kitty Island; Jeju Clip 'N Climb; Bunker de Lumières / 빛의 벙커; Nexon Computer Museum / 넥슨컴퓨터박물관; Bonte Museum / 본태박물관

### tw-taipei — Taipei (Taiwan)
Area covered: Taipei (also known as / includes: taipei, ximending, shilin, jiufen, shifen, tamsui)

Already in the app — places to eat: Din Tai Fung Taipei 101 / 鼎泰豐 101店; Yong Kang Beef Noodle / 永康牛肉麵; Lin Dong Fang Beef Noodles / 林東芳牛肉麵; Jin Feng Braised Pork Rice / 金峰魯肉飯; Hangzhou Xiaolongbao / 杭州小籠湯包; Shin Yeh / 欣葉台菜 創始店; Formosa Chang / 鬍鬚張魯肉飯 寧夏總店; Fu Hang Soy Milk / 阜杭豆漿; Raohe Street Night Market / 饒河街觀光夜市; Ningxia Night Market / 寧夏夜市; Ay-Chung Flour-Rice Noodle / 阿宗麵線; Taipei 101 Food Court / 台北101 美食街; Smoothie House / 思慕昔 本館; Chun Shui Tang / 春水堂 中正紀念堂; Chia Te Bakery / 佳德糕餅; SunnyHills / 微熱山丘 台北民生公園門市; Farmer's Table / 農人餐桌; Mr.Tree / 大樹先生的家; Beetles Café / 甲蟲秘境; Taoqi Time Parent-Child Restaurant / 淘憩時光親子餐廳; Snow King Ice Cream; Lane 50 Food Market; Shilin Night Market Underground Food Court; Tamsui Wenhua A-gei / 淡水文化阿給

Already in the app — things to do: Taipei Zoo / 臺北市立動物園; Maokong Gondola / 貓空纜車; Taipei 101 Observatory / 台北101觀景台; Taipei Children's Amusement Park / 臺北市立兒童新樂園; Taipei Astronomical Museum / 臺北市立天文科學教育館; National Taiwan Science Education Center / 國立臺灣科學教育館; National Palace Museum / 國立故宮博物院; Miniatures Museum of Taiwan / 袖珍博物館; Shilin Night Market / 士林夜市; Raohe Night Market / 饒河街觀光夜市; Daan Forest Park / 大安森林公園; Beitou Hot Spring Museum / 北投溫泉博物館; Huashan 1914 Creative Park / 華山1914文化創意產業園區; Airplane Alley / 飛機巷; Yangmingshan: Xiaoyoukeng and Qingtiangang / 陽明山 小油坑・擎天崗; Expo Hall Playground; Xinsheng Park Playground; Land Bank Exhibition Hall; Taipei City Hakka Cultural Park; National Railway Museum / 國家鐵道博物館; Beitou Thermal Valley; Jimmy’s Moon Bus; Kuo Yuan Ye Museum of Cake and Pastry; Beimen Post Office; Ningxia Night Market; Taipei Fine Arts Museum; PaPark Nangang / 爬爬客親子樂園-南港中信店; Youxi Ai Leyuan, A8 Xinyi / 遊戲愛樂園; SNOOPY Play Center Taipei / SNOOPY Play Center台北兒童新樂園館; Taipei Dianzang Botanical Garden / 台北典藏植物園

### hk-hongkong — Hong Kong (Hong Kong)
Area covered: Hong Kong (also known as / includes: hong kong, kowloon, tsim sha tsui, mong kok, causeway bay, lantau)

Already in the app — places to eat: Tim Ho Wan Sham Shui Po / 添好運 深水埗; Mak's Noodle / 麥奀雲吞麵世家; Yat Lok / 一樂燒鵝; Maxim's Palace City Hall / 美心皇宮 大會堂; Ho Hung Kee / 何洪記; Tai Ping Koon / 太平館餐廳; Lan Fong Yuen / 蘭芳園; Lamma Rainbow Seafood Restaurant / 天虹海鮮酒家; Po Lin Monastery Vegetarian Kitchen / 寶蓮禪寺齋堂; Australia Dairy Company / 澳洲牛奶公司; Sing Heung Yuen / 勝香園; Lee Keung Kee North Point Egg Waffles / 利強記北角雞蛋仔; Tai Cheong Bakery / 泰昌餅家; Kam Wah Cafe / 金華冰廳; Kai Kai Dessert / 佳佳甜品; Yee Shun Milk Company / 港澳義順牛奶公司; Yum Cha; Duddell's; Tozzo; La Vache!; BluHouse; The Peak Lookout; Spices at The Repulse Bay; Honolulu; Swiss Cafe / 瑞士咖啡室; Hop Fat Cafe / 合發茶餐廳; Wing Lok Yuen; Ho Tak Kee; Tak Tou / 得島; Mr. Tree; Bathers; Explorer's Club Restaurant; The Conservatory; Cafe Roma; Jello & Mellow; The Sixteenth; FINI'S; Summer Palace; Kwan Kee Clay Pot Rice; Limewood; MeokBang BBQ Kidzone; Tree Café; Yakiniku Tabeyo; Luen Wah Cafe / 聯華茶餐廳; Kwong Ming Restaurant / 肥仔銘茶餐廳; Mido Cafe / 美都餐室; Tak Yu Restaurant / 德如茶餐廳; My Cup of Tea / 我杯茶; Luen Fat Restaurant / 聯發茶餐廳; Shui Kee Coffee / 瑞記咖啡; Sun Hang Yuen / 新香園; MD Cafe

Already in the app — things to do: Hong Kong Disneyland / 香港迪士尼樂園; Ocean Park / 香港海洋公園; Water World Ocean Park / 水上樂園; The Peak Tram and Sky Terrace 428 / 山頂纜車 · 凌霄閣摩天台428; Ngong Ping 360 / 昂坪360; Hong Kong Science Museum / 香港科學館; Hong Kong Space Museum / 香港太空館; Hong Kong Palace Museum / 香港故宮文化博物館; Hong Kong Wetland Park / 香港濕地公園; Star Ferry / 天星小輪; Hong Kong Tram (Ding Ding) / 香港電車; Hong Kong Park and Edward Youde Aviary / 香港公園 · 尤德觀鳥園; Hong Kong Zoological and Botanical Gardens / 香港動植物公園; Temple Street Night Market / 廟街夜市; Ladies' Market / 女人街; LEGOLAND® Discovery Centre Hong Kong; Kowloon Park; Victoria Park; Hong Kong Museum of Art; Repulse Bay Beach Children's Playground; Mount Austin Playground; Sai On Lane Children's Playground; Quarry Bay Park; Ap Lei Chau Park; Wan Chai Park; Lai Chi Kok Park; Cherry Street Park; Middle Road Children's Playground; Tung Chung North Park; Ma On Shan Park; Tai Po Waterfront Park; Sai Kung Waterfront Park; Tsing Yi Northeast Park; M+; Kadoorie Farm and Botanical Garden; Hong Kong Children’s Discovery Museum; Sai Ying Pun Waterfront Park; EpicLand; Ryze Hong Kong; Kiztopia Wan Chai; High Island Geo Trail; Playfield 5, Kai Tak Sports Park; Art Park, West Kowloon; Dragon’s Back Trail
