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

### p-orlando — Orlando (The United States)
Area covered: Orlando (also known as / includes: orlando, kissimmee, kennedy space center, cape canaveral, theme parks)

Already in the app — places to eat: Rainforest Cafe; T-REX Cafe; Chef Mickey's; Chef Art Smith's Homecomin'; The Toothsome Chocolate Emporium; Bubba Gump Shrimp Co.; Cafe Tu Tu Tango; Hash House A Go Go; Columbia Restaurant; Earl of Sandwich; The Polite Pig; Three Broomsticks; Gideon's Bakehouse; Voodoo Doughnut; ʻOhana; Sanaa; Hot Dog Hall of Fame; Antojitos Authentic Mexican Food; Sugar Factory; Shake Shack; Ford's Garage; The Cheesecake Factory; Erin McKenna's Bakery NYC; Ghirardelli Soda Fountain & Chocolate Shop

Already in the app — things to do: Magic Kingdom; EPCOT; Disney's Animal Kingdom; Disney's Hollywood Studios; Universal Studios Florida; Universal's Islands of Adventure; Universal Epic Universe; LEGOLAND Florida; SeaWorld Orlando; Aquatica Orlando; Kennedy Space Center Visitor Complex; Gatorland; Orlando Science Center; Crayola Experience Orlando; SEA LIFE Orlando Aquarium; Wild Florida Gator Park and airboats; Disney Springs; Lake Eola Park; Orlando Farmers Market at Lake Eola; WonderWorks Orlando; Dezerland Park; Madame Tussauds Orlando; Central Florida Zoo & Botanical Gardens

### mo-macau — Macau (Macau)
Area covered: Macau (also known as / includes: macau, macao, taipa, cotai, coloane, senado)

Already in the app — places to eat: A Lorcha / 船屋葡國餐廳; Restaurante Fernando / 法蘭度餐廳; O Santos / 山度士葡式餐廳; A Petisqueira / 葡國美食天地; Restaurante Dumbo / 小飛象葡國餐廳; Cafe Nga Tim / 雅憩花園餐廳; Wong Chi Kei / 黃枝記; Cheong Kei / 祥記麵家; Tai Lei Loi Kei / 大利來記豬扒包; Venetian Food Court; Tastes of Asia; Lord Stow's Bakery / 安德魯餅店; Margaret's Cafe e Nata / 瑪嘉烈蛋撻店; Leitaria I Son / 義順牛奶公司; Koi Kei Bakery / 鉅記餅家; Chiado; Mariazinha; Vic’s Restaurante; Portugália; Albergue 1601; Restaurante Litoral

Already in the app — things to do: Giant Panda Pavilion and Seac Pai Van Park / 澳門大熊貓館 · 石排灣郊野公園; Macao Science Center / 澳門科學館; teamLab SuperNature Macao; Senado Square and the Ruins of St Paul's / 議事亭前地 · 大三巴牌坊; Macau Tower observation deck / 澳門旅遊塔; Macao Grand Prix Museum / 澳門格蘭披治大賽車博物館; Lou Lim Ieoc Garden / 盧廉若公園; Guia Fortress and Flora Garden cable car / 東望洋炮台 · 二龍喉公園; Taipa Village and Rua do Cunha / 氹仔舊城區 · 官也街; Taipa Houses Museum / 龍環葡韻住宅式博物館; Coloane Village / 路環市區; Hac Sa Beach / 黑沙海灘; Studio City Water Park / 新濠影滙水上樂園; A-Ma Temple / 媽閣廟; Macao Museum and Monte Fortress / 澳門博物館 · 大炮台; Maritime Museum; Kun Iam Statue Waterfront; Happy Farm; Oscar Farm; Qube Kingdom (The Parisian); Super Fun Zone Macau; Aqua World; Go Airborne; Future Bright amusement centre; Macao Museum of Art / 澳門藝術博物館; Kids’ City, City of Dreams; Cotai Ecological Reserve

### kr-suwon — Suwon and the Korean Folk Village (South Korea)
Area covered: Suwon and the Korean Folk Village (also known as / includes: suwon, hwaseong, korean folk village, yongin, paldalmun, haenggung)

Already in the app — places to eat: Gabojeong / 가보정; Bonsuwon Galbi / 본수원갈비; Yeonpo Galbi / 연포갈비; Yuchi Hoegwan / 유치회관; Jinmi Tongdak / 진미통닭; Yongseong Tongdak / 용성통닭; Maehyang Tongdak / 매향통닭; Suwon Mandu / 수원만두; Boyoung Mandu / 보영만두 북문본점; Jidong Market Sundae Town / 지동시장 순대타운; Motgol Market / 못골시장; Korean Folk Village Market Street / 한국민속촌 장터; Hayan Pungcha Bakery / 하얀풍차제과점 망포역점; Jeongjiyeong Coffee Roasters / 정지영커피로스터즈 행궁본점; Instep Coffee / 인스텝커피; Shinseon Seolleongtang Yeongtong; Hyotte Starfield Suwon; Baengbaeng Donkatsu Suwon City Hall; Hansol Naengmyeon AK Suwon; Hanmaeum Butcher Restaurant Omokcheon; Horangi Gul Time Villas Suwon; Porto 7 AK Suwon; Tasting Museum Haenggung-dong / 테이스팅뮤지엄 행궁동; Cabinet Bagel / 캐비넷베이글; Stone-plate Jjajang Jjama Haenggung-dong / 돌판짜장 짜마 수원행궁동본점; Teddy Plate / 테디플레이트

Already in the app — things to do: Hwaseong Haenggung Palace / 화성행궁; Suwon Hwaseong Fortress walls and gates / 수원화성; Hwaseong Fortress sightseeing train / 수원화성어차; Suwon Hwaseong Museum / 수원화성박물관; Korean Folk Village / 한국민속촌; Flying Suwon balloon / 플라잉수원; Starfield Library Kids (Starfield Suwon) / 별마당 도서관 키즈; Suwon Chicken Street / 수원통닭거리; Paldalmun and Jidong traditional markets / 팔달문시장·지동시장; Gwanggyo Lake Park / 광교호수공원; Gyeonggi Children's Museum / 경기도어린이박물관; Haengnidan-gil / 행리단길; Everland / 에버랜드; National Agricultural Museum / 국립농업박물관; Aqua Planet Gwanggyo / 아쿠아플라넷 광교; Hwaseong Traditional Archery at Yeonmudae / 연무대 국궁체험; Suwon Museum / 수원박물관; Haesujae Toilet Culture Exhibition Hall / 해우재; Gwanggyo Gyeonggi Library / 광교경기도서관; Yeongheung Arboretum / 영흥수목원; Hwaseong Fortress Media Art / 수원화성 미디어아트; Iwol Arboretum and Iwol Lake / 일월수목원 + 일월호수; Dalgeurak Dodone / 달그락 도도네

### us-newyork — New York (The United States)
Area covered: New York (also known as / includes: new york, manhattan, brooklyn, times square, central park, statue of liberty)

Already in the app — places to eat: Katz's Delicatessen; Joe's Shanghai; John's of Bleecker Street; Carmine's Times Square; Ellen's Stardust Diner; Junior's Restaurant; Grimaldi's Pizzeria; Nom Wah Tea Parlor; Shake Shack Madison Square Park; Chelsea Market; Time Out Market New York; Joe's Pizza; Levain Bakery; Magnolia Bakery; Serendipity 3; Fini Pizza at Pier 5; Brado; Dellarocco’s; Roberta’s at Domino Park; Juliana’s; Di Fara Pizza; Saraghina Restaurant; Peter Pan Donut and Pastry Shop; Brooklyn Crab; Bubby’s; Tom's Restaurant; Barking Dog

Already in the app — things to do: Central Park Zoo; Bronx Zoo; American Museum of Natural History; Children's Museum of Manhattan; New York Aquarium; Statue of Liberty and Ellis Island; Staten Island Ferry; Intrepid Museum; Top of the Rock; New York Hall of Science; New York Transit Museum; Brooklyn Bridge Park and Jane's Carousel; Winter Village at Bryant Park; Chelsea Market; The High Line; Central Park and Heckscher Playground; Brooklyn Children's Museum; Queens Zoo; Prospect Park Zoo; The Staten Island Zoo; Hammock Grove Play Area; NYC Ferry
