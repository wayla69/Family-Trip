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

### jp-takayama — Takayama, Shirakawa-go and Nagoya (Japan)
Area covered: Takayama, Shirakawa-go and Nagoya (also known as / includes: takayama, shirakawa-go, shirakawago, hida, gero, nagoya)

Already in the app — places to eat: Maruaki / 丸明 飛騨高山店; Ajikura Tengoku / 味蔵天国; Suzuya / 寿々や; Kyoya / 京や; Irori / いろり; Atsuta Horaiken Honten / あつた蓬莱軒 本店; Yabaton Yabacho Honten / 矢場とん 矢場町本店; Yamamotoya Sohonke / 山本屋総本家 本家; Miyagawa Morning Market / 宮川朝市; Hida Kotte Ushi / 飛騨こって牛; Osu Shopping Street / 大須商店街; Ochudo / 落人; Komeda's Coffee Honten / コメダ珈琲店 本店; Konparu Osu Honten / コンパル 大須本店; Hida Takayama Gyoza Sohonzan; Center4 Hamburgers; EVILTEX Hamburgers & Tex-Mex; Jakson Curry & Coffee; Hida Beef Curry House; Chacha; Ebisu Soba; Kitchen Hida; Hida Premium Beef Sushi; Jingoroh Ramen Main Restaurant; Debumaru Takayama Branch 2; Ebihachi

Already in the app — things to do: Hida Folk Village / 飛騨の里; Miyagawa and Jinya-mae morning markets / 宮川朝市・陣屋前朝市; Takayama Jinya / 高山陣屋; Takayama Festival Floats Exhibition Hall / 高山祭屋台会館; Sanmachi Suji old town streets / さんまち通り; Higashiyama Walking Course and Shiroyama Park / 東山遊歩道・城山公園; Hida Takayama Teddy Bear Eco Village / 飛騨高山テディベアエコビレッジ; Ogimachi village, Shirakawa-go / 白川郷 荻町; Gassho-zukuri Minkaen open-air museum / 白川郷合掌造り民家園; LEGOLAND Japan / レゴランド・ジャパン; Port of Nagoya Public Aquarium / 名古屋港水族館; SCMAGLEV and Railway Park / リニア・鉄道館; Nagoya Castle / 名古屋城; Higashiyama Zoo and Botanical Gardens / 東山動植物園; Ghibli Park / ジブリパーク; Harayama Citizens' Park / 原山市民公園; Alps Viewpoint Sky Park / アルプス展望公園 スカイパーク; Hida Great Limestone Cave / 飛騨大鍾乳洞

### jp-tohoku — Tohoku (Japan)
Area covered: Tohoku (also known as / includes: tohoku, sendai, zao, ginzan, yamagata, aomori)

Already in the app — places to eat: Rikyu Sendai Station Gyutan-dori / 牛たん炭焼 利久 仙台駅店; Aji Tasuke Honten / 味太助 本店; Azumaya Honten / 東家 本店; Pyon Pyon Sha Morioka Ekimae / ぴょんぴょん舎 盛岡駅前店; Pairon Honten / 白龍 本店; Ajino Sapporo Onishi / 味の札幌 大西; Shojiya Honten / 庄司屋 本店; Sendai Asaichi Morning Market / 仙台朝市; Matsushima Fish Market / 松島さかな市場; Aomori Gyosai Center / 青森魚菜センター; A-Factory / A-FACTORY; Zunda Saryo Sendai Station / ずんだ茶寮 仙台駅店; Fukuda Pan Honten / 福田パン 長田町本店; Taisho Roman Tea Room / 大正浪漫喫茶室; Ton Galliano Sendai Ekimae / トン・ガリアーノ仙台駅前店; Tanya Zenjiro Minamimachi-dori / たんや善治郎 南町通り店; Restaurant HACHI Sendai Honten; Restaurant Kaitakuka / レストラン開拓家; Cafe Craft / カフェ クラフト; Keyaki Cafe / ケヤキカフェ; Forest Kitchen with Outdoor Living / フォレストキッチン ウィズ アウトドアリビリング

Already in the app — things to do: Sendai Umino-Mori Aquarium / 仙台うみの杜水族館; Miyagi Zao Fox Village / 宮城蔵王キツネ村; Matsushima Bay pleasure cruise / 松島島巡り観光船; Sendai Mediatheque / せんだいメディアテーク; Yagiyama Zoological Park / 仙台市八木山動物公園 フジサキの杜; Spa Resort Hawaiians / スパリゾートハワイアンズ; Tsuruga Castle / 鶴ヶ城; Ouchi-juku thatched post town / 大内宿; Nebuta Museum Wa Rasse / ねぶたの家 ワ・ラッセ; Aomori Fish Market Nokke-don / 青森魚菜センター（のっけ丼）; Hirosaki Park / 弘前公園; Lake Towada sightseeing cruise / 十和田湖遊覧船; Akita City Omoriyama Zoo / 大森山動物園; Akita Neburi Nagashi Kan / 秋田市民俗芸能伝承館（ねぶり流し館）; Kakunodate samurai district / 角館武家屋敷通り; Kidsland US Sendai Nishikigaoka / キッズランドUS仙台錦ケ丘店; Sendai Anpanman Children's Museum & Mall / 仙台アンパンマンこどもミュージアム＆モール; Yagiyama Benyland / 八木山ベニーランド; HOKUSHU Sendai City Science Museum / 仙台市科学館; Kansei-no-Mori / 感性の森; JOYPOLIS SPORTS AEON Sendai Nakayama / JOYPOLIS SPORTS イオン仙台中山店; Sendai Astronomical Observatory / 仙台市天文台; Skids Garden Yodobashi Sendai / スキッズガーデン ヨドバシ仙台店; Aomori Prefectural Asamushi Aquarium; Sannai Maruyama Site; Aomori Museum of Art; Gappo Park; Oirase Stream; Tsurunomai Bridge; Hasshoku Center

### kr-gyeongju — Gyeongju (South Korea)
Area covered: Gyeongju (also known as / includes: gyeongju, bulguksa, cheomseongdae, daereungwon, donggung, wolji)

Already in the app — places to eat: Dosol Maeul / 도솔마을; Gyodong Ssambap / 교동쌈밥; Ipungnyeo Guro Ssambap / 이풍녀구로쌈밥; Maetdol Sundubu / 맷돌순두부; Gyeongju Wonjo Kongguk / 경주원조콩국; Sukyeong Sikdang / 숙영식당; Gyeongju Cheonnyeon Hanwoo Bomun / 경주천년한우 보문점; Myeongdong Jjolmyeon / 명동쫄면; Hamyangjip / 함양집 경주점; Seongdong Market / 성동시장; Gyeongju Jungang Night Market / 경주중앙시장 야시장; Gyori Gimbap / 교리김밥; Hwangnam Bread / 황남빵 본점; Danseokga Chalboribbang / 단석가찰보리빵; Starbucks Gyeongju Daereungwon / 스타벅스 경주대릉원점; Bokgil Gyeongju Main Branch / 복길 경주본점; Gyodong Jipbap Gyeongju Hwangridan-gil Main Branch / 교동집밥 경주황리단길본점; Umawang Gyeongju Main Branch / 우마왕 경주본점

Already in the app — things to do: Gyeongju World / 경주월드; Donggung Palace and Wolji Pond / 경주 동궁과 월지; Daereungwon Tomb Complex / 경주 대릉원; Cheomseongdae / 경주 첨성대; Gyeongju National Museum and Children's Museum / 국립경주박물관 어린이박물관; Gyeongju Expo Park / 경주엑스포대공원; Zoolung Zoolung Gyeongju Bomun / 주렁주렁 경주보문점; Hwangnidan-gil / 황리단길; Bomun Lake path / 보문호; Woljeonggyo Bridge / 월정교; Gyerim Forest / 경주 계림; Yangdong Village / 경주 양동마을; Gyeongju Folk Craft Village / 경주민속공예촌; Hwangnyongsa Temple History and Culture Hall / 황룡사역사문화관; Bulguksa Temple / 불국사; Gyeongju World Automobile Museum / 경주세계자동차박물관; Korean Popular Music Museum / 한국대중음악박물관; Uyang Museum of Art / 우양미술관; Wonder Space Bomun Branch; Jungle Media Park

### kr-gangwon — Nami Island and Gangwon (South Korea)
Area covered: Nami Island and Gangwon (also known as / includes: nami island, namiseom, chuncheon, gapyeong, gangwon, pyeongchang)

Already in the app — places to eat: Tongnamujip Dakgalbi / 통나무집닭갈비; Wonjo Sutbul Dakbulgogi / 원조숯불닭불고기집; Chodang Halmeoni Sundubu / 초당할머니순두부; Donghwa Garden / 동화가든; Gangneung Gamja Ongsimi / 강릉감자옹심이; Bongpo Meoguri-jip / 봉포머구리집; Dancheon Sikdang / 단천식당; Hwangtae Hoegwan / 황태회관; Napjak Sikdang / 납작식당; Sokcho Tourist & Fishery Market / 속초관광수산시장; Manseok Dakgangjeong / 만석닭강정 본점; Gangneung Jungang Market / 강릉중앙시장; Terarosa Coffee Factory / 테라로사 커피공장; Bohemian Roasters / 보헤미안 박이추 커피공장; Cafe Gamjabat / 카페 감자밭; Sundubu Gelato / 순두부젤라또 1호점; Kitchen Onyu / 키친온유; Sodori / 소도리; Gangnaengi Sokuri / 강냉이소쿠리; Pyeongchang Hanwoo Maeul Myeonon Branch / 평창한우마을 면온점; Pyeongchang Hanwoo Maeul Daegwallyeong Branch / 평창한우마을 대관령점; Daegwallyeong Tojong Hanwoo / 대관령토종한우; Yong Udong Alpensia Branch / 용우동 알펜시아점

Already in the app — things to do: Nami Island / 남이섬; LEGOLAND Korea Resort / 레고랜드 코리아; Seoraksan cable car / 설악산 케이블카; Daegwallyeong Sheep Farm / 대관령양떼목장; Alpaca World / 알파카월드; Gangchon Rail Bike / 강촌레일파크; Gyeongpo Beach / 경포해변; Anmok Beach coffee street / 안목해변 커피거리; Sokcho Tourist and Fishery Market / 속초관광수산시장; Ojukheon House and Gangneung Museum / 오죽헌; Soyang River Skywalk / 소양강스카이워크; Chuncheon Animation Museum and Toy Robot Studio / 춘천 애니메이션박물관&토이로봇관; Chuncheon National Museum and Children's Museum / 국립춘천박물관; Chuncheon Puppet Theatre and Puppet Museum / 춘천인형극장&인형극박물관; Sokcho Museum / 속초시립박물관; Samyang Roundhill / 삼양라운드힐; Chuncheon Makguksu Museum / 춘천막국수체험박물관; Gyeongpo Aquarium / 경포아쿠아리움; Hanwha Resort Seorak Waterpia / 설악 워터피아; Jayeona Nolja / 자연아놀자; Gangneung Wonder Sky / 강릉 원더스카이; Sogeumsan Suspension Bridge / 소금산 출렁다리
