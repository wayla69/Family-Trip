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

### kr-suwon — Suwon and the Korean Folk Village (South Korea)
Area covered: Suwon and the Korean Folk Village (also known as / includes: suwon, hwaseong, korean folk village, yongin, paldalmun, haenggung)

Already in the app — places to eat: Gabojeong / 가보정; Bonsuwon Galbi / 본수원갈비; Yeonpo Galbi / 연포갈비; Yuchi Hoegwan / 유치회관; Jinmi Tongdak / 진미통닭; Yongseong Tongdak / 용성통닭; Maehyang Tongdak / 매향통닭; Suwon Mandu / 수원만두; Boyoung Mandu / 보영만두 북문본점; Jidong Market Sundae Town / 지동시장 순대타운; Motgol Market / 못골시장; Korean Folk Village Market Street / 한국민속촌 장터; Hayan Pungcha Bakery / 하얀풍차제과점 망포역점; Jeongjiyeong Coffee Roasters / 정지영커피로스터즈 행궁본점; Instep Coffee / 인스텝커피; Shinseon Seolleongtang Yeongtong; Hyotte Starfield Suwon; Baengbaeng Donkatsu Suwon City Hall; Hansol Naengmyeon AK Suwon; Hanmaeum Butcher Restaurant Omokcheon; Horangi Gul Time Villas Suwon; Porto 7 AK Suwon; Tasting Museum Haenggung-dong / 테이스팅뮤지엄 행궁동; Cabinet Bagel / 캐비넷베이글; Stone-plate Jjajang Jjama Haenggung-dong / 돌판짜장 짜마 수원행궁동본점; Teddy Plate / 테디플레이트

Already in the app — things to do: Hwaseong Haenggung Palace / 화성행궁; Suwon Hwaseong Fortress walls and gates / 수원화성; Hwaseong Fortress sightseeing train / 수원화성어차; Suwon Hwaseong Museum / 수원화성박물관; Korean Folk Village / 한국민속촌; Flying Suwon balloon / 플라잉수원; Starfield Library Kids (Starfield Suwon) / 별마당 도서관 키즈; Suwon Chicken Street / 수원통닭거리; Paldalmun and Jidong traditional markets / 팔달문시장·지동시장; Gwanggyo Lake Park / 광교호수공원; Gyeonggi Children's Museum / 경기도어린이박물관; Haengnidan-gil / 행리단길; Everland / 에버랜드; National Agricultural Museum / 국립농업박물관; Aqua Planet Gwanggyo / 아쿠아플라넷 광교; Hwaseong Traditional Archery at Yeonmudae / 연무대 국궁체험; Suwon Museum / 수원박물관; Haesujae Toilet Culture Exhibition Hall / 해우재; Gwanggyo Gyeonggi Library / 광교경기도서관; Yeongheung Arboretum / 영흥수목원; Hwaseong Fortress Media Art / 수원화성 미디어아트; Iwol Arboretum and Iwol Lake / 일월수목원 + 일월호수; Dalgeurak Dodone / 달그락 도도네

### tw-hualien — Hualien and Taroko (Taiwan)
Area covered: Hualien and Taroko (also known as / includes: hualien, taroko, taroko gorge, qingshui, yilan, taitung)

Already in the app — places to eat: Ye Xiang Bian Shi / 液香扁食店; Hai Pu Oyster Omelette / 海埔蚵仔煎; Mr. Goose / 鵝肉先生; Jiang Tai Tai Beef Noodles / 江太太牛肉麵; Lai Cheng Spare Ribs Noodle / 來成排骨麵; Salt Lick Smokehouse / 火車頭烤肉屋; Dageeli Tribe Restaurant / 達基力部落屋; Dongdamen Night Market / 東大門夜市; Gong Zheng Bao Zi / 公正包子; Zhou Jia Steamed Dumplings / 周家蒸餃; Lao Pai Zha Dan Cong You Bing / 老牌炸彈蔥油餅; Miaokou Red Tea / 廟口紅茶; Tzen Chi Mochi / 曾記麻糬; Jiaxing Ice Fruit Store / 佳興冰果室; Huilan Bay Landscape Restaurant / 洄瀾灣景觀餐廳

Already in the app — things to do: Farglory Ocean Park / 遠雄海洋公園; Taroko National Park Visitor Centre and plateau trail / 太魯閣國家公園遊客中心; Dongdamen Night Market / 東大門夜市; Liyu Lake / 鯉魚潭; Qixingtan Beach / 七星潭; Guangfu Sugar Factory / 花蓮觀光糖廠; Ruisui Ranch / 瑞穗牧場; Guanglong Museum / 光隆博物館; Hualien County Stone Sculpture Museum / 花蓮縣石雕博物館; Hualien Cultural and Creative Industries Park / 花蓮文化創意產業園區; Danong Dafu Forest Park / 大農大富平地森林園區; Fuyuan National Forest Recreation Area; Lintianshan Forestry Culture Park; Mataian Wetland Ecological Park; Pine Garden / 松園別館; Zhikaxuan Water Park / 知卡宣親水公園; Giraffe Family Park / 長頸鹿親子公園; Zhaofeng Farm / 兆豐農場; Hualien Archaeology Museum / 花蓮考古博物館; Zhang Family Tree Garden / 張家の樹園; Meilun Night Market / 美崙夜市; Chulu Ranch / 初鹿牧場; Native Applied Botanical Garden / 原生應用植物園; Taitung Forest Park / 台東森林公園; Fushan Fish Reserve / 富山護魚區; Zhiben National Forest Recreation Area / 知本國家森林遊樂區; Taiyuan Valley / 泰源幽谷; Cocona Coffee / 可可娜咖啡; Luye Sika Deer Park / 鹿野梅花鹿公園; Xinyuanchang Black Tea Culture Museum / 新元昌紅茶產業文化館

### tw-central — Central Taiwan (Taiwan)
Area covered: Central Taiwan (also known as / includes: sun moon lake, alishan, taichung, nantou, cingjing, gaomei)

Already in the app — places to eat: Fu Din Wang / 富鼎旺豬腳; Qin Yuan Chun / 沁園春; Taichung Meat Ball / 台中肉員; Jin Du Restaurant / 金都餐廳; Full House Resort Restaurant / 富豪群渡假民宿餐廳; Fountain Chicken Rice / 噴水雞肉飯 總店; Lin Cong Ming Fish Head Casserole / 林聰明沙鍋魚頭; Fenqihu Hotel Lunch Box / 奮起湖大飯店 便當; Fengjia Night Market / 逢甲夜市; Taichung Second Market / 台中第二市場; Ita Thao Shopping Street / 伊達邵商店街; A-Zhen Meat Buns / 阿振肉包; Miyahara / 宮原眼科; Chun Shui Tang Siwei Original Store / 春水堂 四維創始店; Feeling 18 Chocolate / 18度C巧克力工房; Yu Jen Jai / 玉珍齋; Island 3.5 Degrees Family Restaurant / 小島3.5度; Butter Hippo Family Restaurant / 奶油河馬家庭餐廳; Zanmen Xiaoshihou Kids' Restaurant / 咱們小時候; Paper Box King Science Museum Branch / 紙箱王博館店

Already in the app — things to do: National Museum of Natural Science / 國立自然科學博物館; Formosan Aboriginal Culture Village and Sun Moon Lake ropeway / 九族文化村; Rainbow Village / 彩虹眷村; Cingjing Farm Green Grassland / 清境農場青青草原; Fantasy Land indoor park (Dali) / 異想新樂園; Gaomei Wetlands / 高美濕地; Fengjia Night Market / 逢甲夜市; Wonder New Land / 新奇夢想樂園; Lihpao Land / 麗寶樂園; National Taiwan Museum of Fine Arts / 國立臺灣美術館; 921 Earthquake Museum of Taiwan / 921地震教育園區; Xitou Nature Education Area / 溪頭自然教育園區; Taiwan Glass Gallery / 台灣玻璃館; Guliu Playground, Aofeng Mountain Park / 鰲峰山谷溜遊戲場; Dakeng Hiking Trail No. 9; Museum of Illusions Taichung / 幻覺博物館; Yohocraft Craft Hall / 約客＆厚禮築夢手創館; Barefoot Eco Farm / 赤腳丫生態農莊; Wilson's Farm / 威爾森的農場; Yijian Dairy Goat Farm / 益健乳羊牧場; Paper Box King Creative Park / 紙箱王創意園區; Macaron Park / 馬卡龍公園; Dongshi Forest Recreation Area / 東勢林場遊樂區; National Comics Museum / 國家漫畫博物館; Jiujiufeng Zoo Park / 九九峰動物樂園; Kuang Hsing Paper Mill / 廣興紙寮
