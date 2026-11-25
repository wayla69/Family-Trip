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

### jp-osaka — Osaka (Japan)
Area covered: Osaka (also known as / includes: osaka, namba, dotonbori, umeda, shinsekai, kaiyukan)

Already in the app — places to eat: Kani Doraku Dotonbori Honten / かに道楽 道頓堀本店; Okonomiyaki Mizuno / お好み焼 美津の; Chibo Dotonbori / 千房 道頓堀ビル店; Kushikatsu Daruma Shinsekai Sohonten / 串かつだるま 新世界総本店; Hokkyokusei Shinsaibashi Honten / 北極星 心斎橋本店; Jiyuken Namba Honten / 自由軒 難波本店; Dotonbori Imai Honten / 道頓堀 今井 本店; Genrokuzushi Dotonbori / 元禄寿司 道頓堀店; Tsurutontan Soemoncho / つるとんたん 宗右衛門町店; Okonomiyaki Kiji Umeda Sky Building / お好み焼き きじ 梅田スカイビル店; Kuromon Ichiba Market / 黒門市場; Takoyaki Wanaka Sennichimae / たこ焼道楽 わなか 千日前本店; Hanshin Umeda Snack Park / 阪神梅田本店 スナックパーク; Rikuro Ojisan no Mise Namba Honten / りくろーおじさんの店 なんば本店; Marufuku Coffee Sennichimae Honten / 丸福珈琲店 千日前本店; Hokkyoku Namba Honten / 北極 なんば本店; Bornelund Play Cube; Bean there, UMEDA Canopy by Hilton Osaka Umeda; SØHOLM CAFE＋DINING; NORTH tRunk; Discovery Restaurant; Kinopio's Cafe; Okonomiyaki Oribe; Matsusakagyu Yakiniku M; Gyukatsu Motomura Namba; Okonomiyaki Chitose; Yakumido; Kyochabana Minami Senba; GYOZAOH! Dotonbori Store; Endo Sushi; GYUKATSU Kyoto Katsugyu; Kobe Beef Ishida Herbis Plaza; Yaekatsu; Honke Ohtako; Gion Tokuya; Taishuu Sukiyaki Hokuto GEMS Namba Branch; Café Absinthe; Sora-niwa Terrace; CRYDDERI CAFE; Futomasa; Kuma Kafe

Already in the app — things to do: Osaka Aquarium Kaiyukan / 海遊館; Universal Studios Japan / ユニバーサル・スタジオ・ジャパン; Kids Plaza Osaka / キッズプラザ大阪; Tennoji Zoo / 天王寺動物園; Tennoji Park Ten-shiba / てんしば; Osaka Castle Park / 大阪城公園; Cupnoodles Museum Osaka Ikeda / カップヌードルミュージアム 大阪池田; Osaka Science Museum / 大阪市立科学館; Expo '70 Commemorative Park / 万博記念公園; Tempozan Giant Ferris Wheel / 天保山大観覧車; LEGOLAND Discovery Center Osaka / レゴランド・ディスカバリー・センター大阪; Kuromon Market / 黒門市場; Dotonbori / 道頓堀; Tsutenkaku / 通天閣; Umeda Sky Building Floating Garden / 梅田スカイビル 空中庭園展望台; teamLab Botanical Garden Osaka; Osaka Science and Technology Museum; Asobi no Sekai Grand Front Osaka; Dotonbori Kukuru Konamon Museum; NIFREL; Osaka Museum of Natural History; National Museum of Ethnology; Osaka Museum of History; Mister Donut Museum; Shimaguru Land; Harukas 300; Nakanoshima Park; Tsuyu-no-Tenjinja Shrine; ATC Asobi Mare; Sumikko Asobi Studio; Nakanoshima Children’s Book Forest; Toy Toy Park; SKIDS GARDEN / スキッズガーデン; Minoh Falls; Minoh Park Insectarium; Katsuoji; Hirakata Park; Sylvanian Park; Utsubo-koen Park; Open-Air Museum of Japanese Farmhouses; Shitennoji Temple / 四天王寺; Osaka Korea Town; Namba Yasaka Shrine; Nakazakicho / 中崎町; Karahori

### jp-kyoto — Kyoto (Japan)
Area covered: Kyoto (also known as / includes: kyoto, gion, arashiyama, fushimi, higashiyama, nara)

Already in the app — places to eat: Omen Ginkakuji / おめん 銀閣寺本店; Honke Owariya Honten / 本家尾張屋 本店; Katsukura Sanjo Honten / 名代とんかつ かつくら 三条本店; Musashi Sushi Sanjo Honten / 寿しのむさし 三条本店; Okutan Kiyomizu / 総本家ゆどうふ 奥丹 清水; Izuju / いづ重; Arashiyama Yoshimura / 嵐山よしむら; Hinode Udon / 日の出うどん; Ganko Takasegawa Nijoen / がんこ 高瀬川二条苑; Nishiki Market / 錦市場; Kyoto Ramen Koji / 京都拉麺小路; JR Kyoto Isetan Food Hall / ジェイアール京都伊勢丹 デパ地下; Saryo Tsujiri Gion Honten / 茶寮都路里 祇園本店; Inoda Coffee Honten / イノダコーヒ 本店; Smart Coffee / スマート珈琲店; Demachi Futaba / 出町ふたば; Hyoto Shijokarasuma / 瓢斗 四条烏丸; Sukiyaki Jyuniten Kyoto / すき焼き十二天 京都; Tempura Izakaya KYOTO GATTEN / 酒と肉天ぷら 勝天; Kyoto Kanigin Kawaramachi / 京都 かに銀 河原町; Yakiniku Yazawa Kyoto / 焼肉矢澤 京都; Gion Gyuzen / 祗園 牛禅; Torisee Saiin / 鳥せゑ 西院; Kura Sushi Plus; Kyoto Yodobashi; Daimaru Kyoto; Kyoto Takashimaya; The Cube Food Court; Ramen Toritani; Shokudo Ogawa; Soba Minagawa; Tempura Matsu; Tsuroku; Komefuku; Hafuu; Menya Inoichi; Shigetsu; Nishiki Warai; Kyoto Maruyama; Omen Kodai-ji

Already in the app — things to do: Kyoto Railway Museum / 京都鉄道博物館; Kyoto Aquarium / 京都水族館; Umekoji Park / 梅小路公園; Kyoto City Zoo / 京都市動物園; Fushimi Inari Taisha / 伏見稲荷大社; Nishiki Market / 錦市場; Arashiyama Bamboo Grove / 嵐山 竹林の小径; Iwatayama Monkey Park / 嵐山モンキーパークいわたやま; Sagano Romantic Train / 嵯峨野トロッコ列車; Kiyomizu-dera / 清水寺; Kinkaku-ji / 金閣寺; Kyoto Imperial Palace / 京都御所; Kyoto International Manga Museum / 京都国際マンガミュージアム; Kyoto Botanical Gardens / 京都府立植物園; Kyoto Tower / 京都タワー; teamLab Biovortex Kyoto; Kodomo no Rakuen; Toei Kyoto Studio Park (Uzumasa Eigamura); Maruyama Park; Demachiyanagi Turtle Stepping Stones; Okazaki Park; Nintendo Museum; Heian-jingu; Tenryū-ji; Nanzen-ji; Kyoto Municipal Science Center for Youth; Samurai Ninja Museum; Kyoto City Disaster Prevention Center; Kyoto Museum of Crafts and Design; VS Park AEON Mall Kyoto; GEAR; Round1 Kyoto Kawaramachi

### jp-hokkaido — Hokkaido (Japan)
Area covered: Hokkaido (also known as / includes: hokkaido, sapporo, otaru, furano, biei, asahikawa)

Already in the app — places to eat: Sapporo Beer Garden / サッポロビール園; Soup Curry Garaku / スープカレー GARAKU; Nemuro Hanamaru JR Tower Stellar Place / 回転寿司 根室花まる JRタワーステラプレイス店; Sumire Sapporo Honten / すみれ 札幌本店; Kani Honke Sapporo Ekimae Honten / 札幌かに本家 札幌駅前本店; Otaru Masazushi Honten / おたる政寿司 本店; Wakadori Jidai Naruto Honten / 若鶏時代なると 本店; Lucky Pierrot Bay Area Honten / ラッキーピエロ ベイエリア本店; Ajisai Honten / 函館麺厨房 あじさい 本店; Kumagera / くまげら; Nijo Market / 二条市場; Hakodate Morning Market / 函館朝市; LeTAO Honten / 小樽洋菓子舗ルタオ 本店; Rokkatei Sapporo Honten / 六花亭 札幌本店; Kitakaro Sapporo Honkan / 北菓楼 札幌本館; Furano Delice / フラノデリス; Jingisukan Daruma; Sapporo Genghis Khan; Sumibiyaki Jingisukan Ishida; Ganso Sapporo Ramen Yokocho; Suage; Hotei; Hyousetsu No Mon; Uni Senmonten Yoichiya Hakodate Asaichi Branch; Miso Senka Ramen Shop TSUBAKI; Sapporo Zangi Hompo Sapporo Station Store; Furano Wine House

Already in the app — things to do: Otaru Aquarium / おたる水族館; Otaru Museum (Main Building) / 小樽市総合博物館 本館; Mt Moiwa Ropeway / もいわ山ロープウェイ; Moerenuma Park / モエレ沼公園; Sapporo Science Center / 札幌市青少年科学館; Takino Suzuran Hillside National Park / 国営滝野すずらん丘陵公園; Nijo Market / 二条市場; Okurayama Ski Jump Stadium / 大倉山ジャンプ競技場; Otaru Tenguyama Ropeway / 小樽天狗山ロープウエイ; Otaru Canal / 小樽運河; Sakaimachi Street / 堺町通り; Sapporo Satoland / サッポロさとらんど; JR Tower Observatory T38 / JRタワー展望室 タワー・スリーエイト; Odori Park / 大通公園; Otaru Sankaku Market / 小樽三角市場; Asahiyama Zoo; Shiroi Koibito Park; Chacha World; Historical Village of Hokkaido; AOAO SAPPORO; Sunpiazza Aquarium; Sapporo Teine Snow Land; Farm Tomita; Otaru Music Box Museum Main Building

### kr-seoul — Seoul (South Korea)
Area covered: Seoul (also known as / includes: seoul, myeongdong, hongdae, gangnam, insadong, jamsil)

Already in the app — places to eat: Myeongdong Kyoja / 명동교자 본점; Tosokchon Samgyetang / 토속촌삼계탕; Hadongkwan / 하동관; Woo Lae Oak / 우래옥; Jinokhwa Halmae Wonjo Dakhanmari / 진옥화할매원조닭한마리; Maple Tree House Itaewon / 단풍나무집 이태원점; Bukchon Son Mandu / 북촌손만두 인사본점; Samcheongdong Sujebi / 삼청동수제비; Sinseon Seolnongtang Myeongdong / 신선설농탕 명동점; Gwangjang Market / 광장시장; Tongin Market / 통인시장; Namdaemun Market / 남대문시장; Taegeukdang / 태극당; Cafe Onion Anguk / 어니언 안국; Osulloc Tea House Bukchon / 오설록 티하우스 북촌점; Gordon Ramsay Burger; Suhadong Gomtang; Hwanggeum Mokjang Korean BBQ; Hong Kong Banjeom 0410+; Bonjuk Porridge; Solsot; Tasty Seoul; Cafe Layered; Miseongok / 미성옥; KimSambo / 김삼보; Hasuo Gomtang / 하수오곰탕; Chick Gimbap; Ssada Gimbap; Namdaemun Yachae Hotteok; 3rd Samgyetang; Gosari Express; Geumdwaeji Sikdang; Okdongsik; Oilje; Andeok; Hwangsaengga Kalguksu; Somunnan Seongsu Gamjatang; Soi Yeonnam; Nishimura Ramen; Mippeudong; Yeonnam Toma; Rust Bakery; Dallas Pizza

Already in the app — things to do: Lotte World Adventure / 롯데월드 어드벤처; Lotte World Aquarium / 롯데월드 아쿠아리움; Seoul Sky, Lotte World Tower / 서울스카이; KidZania Seoul / 키자니아 서울; COEX Aquarium / 코엑스 아쿠아리움; Starfield Library / 별마당 도서관; Children's Museum, National Museum of Korea / 국립중앙박물관 어린이박물관; Children's Museum, National Folk Museum of Korea / 국립민속박물관 어린이박물관; Gyeongbokgung Palace / 경복궁; Bukchon Hanok Village / 북촌한옥마을; N Seoul Tower / N서울타워; Gwangjang Market / 광장시장; Seoul Forest / 서울숲; Banpo Hangang Park & Rainbow Fountain / 반포한강공원 달빛무지개분수; Seoul Children's Grand Park / 서울어린이대공원; Seoul Zoo, Seoul Grand Park / 서울대공원 동물원; Everland / 에버랜드; Nanta show, Myeongdong / 명동 난타; Seoul Science Center; Seoul Craft Museum / 서울공예박물관; Ikseon-dong Hanok Village / 익선동 한옥마을; Bukchon Traditional Culture Center / 북촌문화센터; Myeongdong Night Market / 명동야시장; Champion 1250; Dogok Children’s Indoor Playground; War Memorial of Korea; National Museum of Korean Contemporary History; Gyeongui Line Forest Path; Seonyudo; Insa-dong Culture Street; Ihwa-dong Mural Village / 이화동 벽화마을; Yongsan Family Park / 용산가족공원; Pororo Park Lotte Mart Max Geumcheon / 뽀로로파크 롯데마트 맥스 금천점
