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

### kr-seoul — Seoul (South Korea)
Area covered: Seoul (also known as / includes: seoul, myeongdong, hongdae, gangnam, insadong, jamsil)

Now in the app: 48 places to eat, 34 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Myeongdong Kyoja / 명동교자 본점; Tosokchon Samgyetang / 토속촌삼계탕; Hadongkwan / 하동관; Woo Lae Oak / 우래옥; Jinokhwa Halmae Wonjo Dakhanmari / 진옥화할매원조닭한마리; Maple Tree House Itaewon / 단풍나무집 이태원점; Bukchon Son Mandu / 북촌손만두 인사본점; Samcheongdong Sujebi / 삼청동수제비; Sinseon Seolnongtang Myeongdong / 신선설농탕 명동점; Gwangjang Market / 광장시장; Tongin Market / 통인시장; Namdaemun Market / 남대문시장; Taegeukdang / 태극당; Cafe Onion Anguk / 어니언 안국; Osulloc Tea House Bukchon / 오설록 티하우스 북촌점; Gordon Ramsay Burger; Suhadong Gomtang; Hwanggeum Mokjang Korean BBQ; Hong Kong Banjeom 0410+; Bonjuk Porridge; Solsot; Tasty Seoul; Cafe Layered; Miseongok / 미성옥; KimSambo / 김삼보; Hasuo Gomtang / 하수오곰탕; Chick Gimbap; Ssada Gimbap; Namdaemun Yachae Hotteok; 3rd Samgyetang; Gosari Express; Geumdwaeji Sikdang; Okdongsik; Oilje; Andeok; Hwangsaengga Kalguksu; Somunnan Seongsu Gamjatang; Soi Yeonnam; Nishimura Ramen; Mippeudong; Yeonnam Toma; Rust Bakery; Dallas Pizza; Jeongwon Urban Garden / 정원레스토랑 어반가든; Cheonggiwa Town (Gildong Sageori) / 청기와타운 길동사거리점; Casa de Tacos (Songridan-gil) / 카사데타코 송리단길점; Flubber (Yangjaecheon) / 플러버 양재천점; Hwangnam (Gwanghwamun) / 황남

Already in the app — things to do: Lotte World Adventure / 롯데월드 어드벤처; Lotte World Aquarium / 롯데월드 아쿠아리움; Seoul Sky, Lotte World Tower / 서울스카이; KidZania Seoul / 키자니아 서울; COEX Aquarium / 코엑스 아쿠아리움; Starfield Library / 별마당 도서관; Children's Museum, National Museum of Korea / 국립중앙박물관 어린이박물관; Children's Museum, National Folk Museum of Korea / 국립민속박물관 어린이박물관; Gyeongbokgung Palace / 경복궁; Bukchon Hanok Village / 북촌한옥마을; N Seoul Tower / N서울타워; Gwangjang Market / 광장시장; Seoul Forest / 서울숲; Banpo Hangang Park & Rainbow Fountain / 반포한강공원 달빛무지개분수; Seoul Children's Grand Park / 서울어린이대공원; Seoul Zoo, Seoul Grand Park / 서울대공원 동물원; Everland / 에버랜드; Nanta show, Myeongdong / 명동 난타; Seoul Science Center; Seoul Craft Museum / 서울공예박물관; Ikseon-dong Hanok Village / 익선동 한옥마을; Bukchon Traditional Culture Center / 북촌문화센터; Myeongdong Night Market / 명동야시장; Champion 1250; Dogok Children’s Indoor Playground; War Memorial of Korea; National Museum of Korean Contemporary History; Gyeongui Line Forest Path; Seonyudo; Insa-dong Culture Street; Ihwa-dong Mural Village / 이화동 벽화마을; Yongsan Family Park / 용산가족공원; Pororo Park Lotte Mart Max Geumcheon / 뽀로로파크 롯데마트 맥스 금천점; Seoul kids' café, Dream Forest (Cheongun Dapwon) / 북서울꿈의숲 청운답원

### kr-busan — Busan (South Korea)
Area covered: Busan (also known as / includes: busan, pusan, haeundae, gamcheon, gwangalli, nampo)

Now in the app: 50 places to eat, 30 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Halmae Gaya Milmyeon / 할매가야밀면; Choryang Milmyeon / 초량밀면; Ssangdungi Dwaeji Gukbap / 쌍둥이돼지국밥; Bonjeon Dwaeji Gukbap / 본전돼지국밥; Haeundae Somunnan Amso Galbijip / 해운대소문난암소갈비집; Haeundae Wonjo Halmae Gukbap / 해운대원조할매국밥; Geumsu Bokguk Haeundae / 금수복국 해운대본점; Sinbalwon / 신발원; Songjeong 3-dae Gukbap / 송정3대국밥; Jagalchi Market / 자갈치시장; Samjin Eomuk Yeongdo Main Store / 삼진어묵 영도본점; BIFF Square street food / BIFF광장; Haeundae Traditional Market / 해운대전통시장; OPS Haeundae / 옵스 해운대점; B&C Bakery / 비엔씨; Momos Coffee / 모모스커피 본점; Nasari Sikdang Gwangalli; Seomgwa Seom Sa-i Clam BBQ Gwangalli; Hwadalgu Charcoal Jjukkumi Gwangalli; Haean Galbi Gwangalli Main Branch; Solsot Gwangalli; Jo Gae Dae Pyo Gwangalli Main Branch; Busan Tobagi Dwaeji Gukbap Gwangalli Main Branch; Dongmyeon Sik Milmyeon; Ilgwang Susan Raw Fish Restaurant; Cheonghwabaek Dwaeji Gukbap, Gwangalli; Somunnan Dwaeji Gukbap, Bupyeong; Subyeon Choego Dwaeji Gukbap, Millak; Onammae Dwaeji Gukbap, Jeonggwan; Hwanamjeong Dwaeji Gukbap, Choeup; Mokchon Dwaeji Gukbap, Yeonsan City Hall; Hapcheon Gukbapjip, Yongho; Snoopy Place Busan; Badadang; Choryang Galbi; Wonjo Ilmi Gisa Sikdang; Seomyeon Food Alley; Seomyeon Market; Haeundae Pojangmacha-chon; Arirang Street Food Street; Bupyeong Kkangtong Market; Shabussam Jumeoni (Osiria) / 샤브쌈주머니 부산오시리아점; Daepae Market (Daeyeon) / 대패마켓 부산대연점; Gwangan Jeil Dwaeji Gukbap / 광안제일돼지국밥 광안본점; Mad for Garlic (Lotte Busan Main) / 매드포갈릭 롯데부산본점; Old Mug / 올드머그; Miffy Café Busan / 미피카페 부산; Monyeo Jubang / 모녀주방; Ilsamyuk Meat House (Myeongji) / 일삼육고깃집; Gwanganri Daegyo Milmyeon / 광안리대교밀면

Already in the app — things to do: SEA LIFE Busan Aquarium / 씨라이프 부산아쿠아리움; Haeundae Blueline Park / 해운대 블루라인파크; Lotte World Adventure Busan / 롯데월드 어드벤처 부산; Skyline Luge Busan / 스카이라인 루지 부산; Busan National Science Museum / 국립부산과학관; Busan X the Sky / 부산엑스더스카이; Songdo Marine Cable Car (Busan Air Cruise) / 송도해상케이블카; Songdo Cloud Bridge / 송도구름산책로; Gamcheon Culture Village / 감천문화마을; Huinnyeoul Culture Village / 흰여울문화마을; Busan Tower and Yongdusan Park / 부산타워 · 용두산공원; Jagalchi Market / 자갈치시장; BIFF Square and Gukje Market / BIFF광장 · 국제시장; Busan Citizens Park / 부산시민공원; Gwangalli Beach drone light show / 광안리 M 드론 라이트쇼; Busan Museum of Art / 부산시립미술관; National Maritime Museum of Korea; Busan Museum; Busan Museum of Movies; Haedong Yonggungsa Temple; Champion Playtime Kids Cafe; Cheongsapo Daritdol Observatory; Songdo Yonggung Suspension Bridge; Dadaepo Sunset Fountain of Dreams; Danubi Train at Busan Taejongdae Park; Brick Campus / 브릭캠퍼스; Amnam Park / 암남공원; Sajik Baseball Stadium / 사직야구장; Wonder Space (Myeongji) / 원더스페이스 부산명지점; Zooraji (Shinsegae Centum City) / 주라지 신세계센텀시티점

### nz-auckland — Auckland (New Zealand)
Area covered: Auckland (also known as / includes: auckland, waiheke, piha, rangitoto, tiritiri matangi, waitemata)

Now in the app: 47 places to eat, 32 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Prego; Amano; Federal Delicatessen; Swashbucklers Restaurant & Bar; Barilla Dumpling; Eden Noodles; Orbit 360° Dining; Non Solo Pizza; Auckland Fish Market; Ponsonby Central; Best Ugly Bagels; Giapo; Chocolate Boutique; Devonport Chocolates; Jolin Shanghai; Guilin Rice Noodles; JadeTown; Paradise; Pici; Bianca; Osteria Uno; Depot; The Engine Room; Cazador; Gilt; Huami; Pearl Garden; Rumours; Holiday; Ooh-Fa; Ragtag; The Sando Guy; Chop Chop Noodle House; Munch; Wise Boys; Tianze; Hocho; Bodega; MASU; BODA; The Heke; Sugar at Chelsea Bay; K10 Sushi Train; Azabu Mission Bay; Baduzzi; Huddle Cafe; Cornwall Park Cafe

Already in the app — things to do: Auckland Zoo; SEA LIFE Kelly Tarlton's Aquarium; MOTAT; Auckland War Memorial Museum / Tāmaki Paenga Hira; Sky Tower; Rainbow's End; Domain Wintergardens; Auckland Botanic Gardens; Butterfly Creek; Snowplanet; Ambury Regional Park; Western Springs Lakeside Park / Te Wai Ōrea; Auckland Night Markets; Devonport and Mount Victoria / Takarunga; Auckland Art Gallery / Toi o Tāmaki; Maungawhau Mount Eden / Maungawhau; Thrillzone Escape Adventure Takapuna; Vector Wero Whitewater Park; Britomart Market; Takapuna's Sunday Market; Avondale Sunday Market; Catalina Bay Farmer's Market; Smales Farm Market; Howick's Saturday Market; My Wonderland; Archie Brothers Cirque Electriq; Cornwall Park; Long Bay Regional Park; Auckland Dockline Tram; Manukau Live Steamers; Adventure Alley; Magic Loft

### cn-shanghai — Shanghai (China)
Area covered: Shanghai (also known as / includes: shanghai, the bund, pudong, yu garden, zhujiajiao)

Now in the app: 34 places to eat, 42 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Nanxiang Steamed Bun Restaurant / 南翔馒头店; Lv Bo Lang / 绿波廊; Shanghai Lao Fandian / 上海老饭店; Lao Zheng Xing / 老正兴菜馆; Jia Jia Tang Bao / 佳家汤包; Lost Heaven on the Bund / 花马天堂 外滩店; Jianguo 328 / 建国328小馆; Guang Ming Cun / 光明邨大酒家; Yang's Fry-Dumpling / 小杨生煎; Da Hu Chun / 大壶春; Shanghai First Foodhall / 上海市第一食品商店; Lillian Bakery / 莉莲蛋挞; Shen Da Cheng / 沈大成; Harbin Food Factory / 哈尔滨食品厂; Lokal by Wagas (Hubindao) / Lokal by Wagas 湖滨道店; Mickey & Pals Market Café; Donald's Dine 'n Delights; Sunnyside Café; Tangled Tree Tavern; Lumière’s Kitchen; Fu 1039; Ren He Guan (Zhaojiabang Road); Shanghai Old Restaurant (Yuyuan Branch); Cheng Long Wang · Crab Mansion (Jiujiang Road Branch); Rui Fu Yuan (Maoming South Road); Auntie Maodou Restaurant; Shun Ji Restaurant (Shaanxi South Road Branch); Longfeng Restaurant · Peace Hotel Shanghai; The Press (Hankou Lu); Dong Tai Xiang (Changning Lu); Wang Jia Sha (Changning Lu); Fahua Tangbao; Lai Lai Xiao Long / 莱莱小笼; Fuchun Xiao Long Guan / 富春小笼馆

Already in the app — things to do: Shanghai Disneyland / 上海迪士尼乐园; LEGOLAND Shanghai / 上海乐高乐园; Shanghai Ocean Aquarium / 上海海洋水族馆; Shanghai Zoo / 上海动物园; Shanghai Wild Animal Park / 上海野生动物园; Shanghai Science and Technology Museum / 上海科技馆; Shanghai Natural History Museum / 上海自然博物馆; Shanghai Astronomy Museum / 上海天文馆; Shanghai Children's Museum / 上海儿童博物馆; Oriental Pearl Tower / 东方明珠广播电视塔; The Bund / 外滩; Huangpu River cruise / 黄浦江游览; Yu Garden / 豫园; Century Park / 世纪公园; Shanghai Chenshan Botanical Garden / 上海辰山植物园; Zhujiajiao Water Town / 朱家角; Shanghai Haichang Ocean Park / 上海海昌海洋公园; Shanghai Tower; Qibao Old Town; Temple of the Seven Treasures; Shanghai Changfeng Aquarium & Stingray Bay; LEGOLAND Discovery Centre, Changfeng; Gongqing Forest Park; Fuxing Park; Expo Culture Park Greenhouse; Shanghai Natural Wildlife Insect Kingdom; Bund Sightseeing Tunnel; Shanghai World Financial Center; Shanghai Circus World; People's Park; Zhongshan Park; Lujiazui Central Green; Shanghai Urban Planning Center; Pottery People; Peppa Pig World of Play; Jump 360 (Xingyi Lu); Adventure Zone; Nanyuan Riverside Green Belt Children's Sports Park; Shanghai Submarine Exhibition Hall; Shanghai Tunnel Science and Technology Museum; One East; Shanghai Children's Art Theatre
