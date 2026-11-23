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

### jp-hiroshima — Hiroshima, Miyajima and Kobe (Japan)
Area covered: Hiroshima, Miyajima and Kobe (also known as / includes: hiroshima, miyajima, itsukushima, kobe, okayama, himeji)

Already in the app — places to eat: Micchan Sohonten Hatchobori / みっちゃん総本店 八丁堀本店; Nagataya / 長田屋; Anagomeshi Ueno / あなごめし うえの; Yakigaki no Hayashi / 焼がきのはやし; Kakiya / 牡蠣屋; Steakland Kobe / ステーキランド 神戸館; Grill Ippei Motomachi / グリル一平 元町店; Bekkan Botanen / 別館牡丹園; Okonomimura / お好み村; Miyajima Omotesando Shopping Street / 宮島表参道商店街; Nankinmachi Chinatown / 南京町; Hiroshima Andersen / 広島アンデルセン; Momijido Honten / 紅葉堂 本店; Kobe Nishimura Coffee Nakayamate Honten / 神戸にしむら珈琲店 中山手本店; Freundlieb / フロインドリーブ; Chano-ma Hiroshima / チャノマ 広島; mycafe / マイカフェ; All Day Dining Fruitier / オールデイダイニング フリュティエ; Cafe 1400 / カフェ1400; Cafe Flowery / カフェフロウリー; Italian Kitchen Bansan Parti Fujisaka / イタリアンキッチン バンサン パルティ・フジ坂店

Already in the app — things to do: Peace Memorial Park / 平和記念公園; Hiroshima Peace Memorial Museum / 広島平和記念資料館; Hiroshima Castle grounds / 広島城; Hiroshima City Asa Zoological Park / 広島市安佐動物公園; Miyajima Ropeway to Mount Misen / 宮島ロープウェー; Shukkeien Garden / 縮景園; Hiroshima Orizuru Tower / おりづるタワー; Okonomimura / お好み村; Kobe Anpanman Children's Museum and Mall / 神戸アンパンマンこどもミュージアム&モール; Himeji Castle / 姫路城; Kobe Suma Sea World / 神戸須磨シーワールド; Kobe Nunobiki Herb Garden and Ropeway / 神戸布引ハーブ園/ロープウェイ; Okayama Korakuen Garden / 岡山後楽園; Meriken Park, Kobe / メリケンパーク; Kobe Port Tower / 神戸ポートタワー; Miyajima Aquarium

### th-ubon — Ubon Ratchathani (Thailand)
Area covered: Ubon Ratchathani (also known as / includes: ubon ratchathani, ubon, khong chiam, pha taem, sam phan bok, kaeng tana)

Already in the app — places to eat: Indochine / อินโดจีน; Samchai Coffee (Thepyothi) / สามชัยกาแฟ; Sam Chai Kai Yang / สามชัยไก่ย่าง; Porntip Kai Yang Wat Jaeng / พรทิพย์ไก่ย่างวัดแจ้ง; Guay Jub Ubon / ก๋วยจั๊บอุบล; a-ga-ve Café & Restaurant / อากาเว่; Chiokee / เจียวกี่; Kuay Jap Tor Bor / ก๋วยจั๊บ ทบ.; Ubon Ocha / อุบลโอชา; Ubon Night Market / ตลาดโต้รุ่งราชบุตร; Central Ubon food court / ศูนย์อาหาร เซ็นทรัล อุบล; Abe Specialty Coffee; Arabus Experience Café / อาราบัส; Warichjitrana Cafe & Farm; Khwam Song Cham (Memory) Cafe

Already in the app — things to do: Ubon Ratchathani National Museum / พิพิธภัณฑสถานแห่งชาติ อุบลราชธานี; Ubon Ratchathani Science Centre for Education / ศูนย์วิทยาศาสตร์เพื่อการศึกษาอุบลราชธานี; Ubon Ratchathani Zoo / สวนสัตว์อุบลราชธานี; Pha Taem National Park / อุทยานแห่งชาติผาแต้ม; Two-colour river viewpoint / แม่น้ำสองสี; Sirindhorn Dam / เขื่อนสิรินธร; Nong Bua Public Park / สวนสาธารณะหนองบัว; Central Ubon / เซ็นทรัล อุบลราชธานี; Thung Sri Muang night market / ทุ่งศรีเมือง; Kaeng Tana National Park; Huai Luang Waterfall; Warin Chamrap market; Pattaya Noi, Sirindhorn Dam; Sam Phan Bok; Saeng Chan Waterfall; Wat Sirindhorn Wararam; Wat Phra That Nong Bua; Wat Thung Si Mueang; Golden Monument of Thung Sri Mueang; Sao Chaliang; Thung Na Mueang Waterfalls; Wat Tham Heo Sin Chai

### th-suratthani — Surat Thani and Khao Sok (Thailand)
Area covered: Surat Thani and Khao Sok (also known as / includes: surat thani, khao sok, cheow lan, ratchaprapha, chaiya)

Already in the app — places to eat: Lucky Restaurant / ลักกี้ภัตตาคาร; Yok Kheng / ยกเข่ง; Sum Gradang Nga / ซุ้มกระดังงา; Lamphu 2 / ลำพู 2; Milano; Pa Ting / ป้าทิ้ง; Pawn's Restaurant; San Chao Night Market / ตลาดศาลเจ้า; Pracharat Bang Bai Mai Floating Market / ตลาดน้ำประชารัฐบางใบไม้; Central Surat Thani food court / ศูนย์อาหาร เซ็นทรัล สุราษฎร์ธานี; Keo Pla / เกี๊ยวปลา; Backyard Cafe x TCT; Lian Tai / เลี่ยนไถ่; Good Time Cafe

Already in the app — things to do: Khao Sok National Park (headquarters area) / อุทยานแห่งชาติเขาสก; Cheow Lan Lake (Ratchaprapha Dam) / เขื่อนรัชชประภา เชี่ยวหลาน; Sok River tubing / ล่องห่วงยางคลองสก; Ton Sai Waterfall / น้ำตกโตนไทร; Kaeng Krung National Park / อุทยานแห่งชาติแก่งกรุง; Wat Phra Borommathat Chaiya / วัดพระบรมธาตุไชยา; Chaiya National Museum; Khlong Phanom National Park; Tai Rom Yen National Park (Namtok Dat Fa); Khlong Roi Sai canal community; Ban Phum Riang community; Khao Tha Phet forest and viewpoint; Namtok Vibhavadi; Pak Nam Tapi waterfront; Surat Thani Night Market (Talad Kaset); Ton Kloi Waterfall Trail; Wat Tham Phanthurat; Khao Sok night safari; Bamboo rafting on the Sok River; Mai Yai Waterfall; Coral Cave; Khlong Pae Nature Trail; Orchid Trail (rafflesia)

### kr-gyeongju — Gyeongju (South Korea)
Area covered: Gyeongju (also known as / includes: gyeongju, bulguksa, cheomseongdae, daereungwon, donggung, wolji)

Already in the app — places to eat: Dosol Maeul / 도솔마을; Gyodong Ssambap / 교동쌈밥; Ipungnyeo Guro Ssambap / 이풍녀구로쌈밥; Maetdol Sundubu / 맷돌순두부; Gyeongju Wonjo Kongguk / 경주원조콩국; Sukyeong Sikdang / 숙영식당; Gyeongju Cheonnyeon Hanwoo Bomun / 경주천년한우 보문점; Myeongdong Jjolmyeon / 명동쫄면; Hamyangjip / 함양집 경주점; Seongdong Market / 성동시장; Gyeongju Jungang Night Market / 경주중앙시장 야시장; Gyori Gimbap / 교리김밥; Hwangnam Bread / 황남빵 본점; Danseokga Chalboribbang / 단석가찰보리빵; Starbucks Gyeongju Daereungwon / 스타벅스 경주대릉원점; Bokgil Gyeongju Main Branch / 복길 경주본점; Gyodong Jipbap Gyeongju Hwangridan-gil Main Branch / 교동집밥 경주황리단길본점; Umawang Gyeongju Main Branch / 우마왕 경주본점

Already in the app — things to do: Gyeongju World / 경주월드; Donggung Palace and Wolji Pond / 경주 동궁과 월지; Daereungwon Tomb Complex / 경주 대릉원; Cheomseongdae / 경주 첨성대; Gyeongju National Museum and Children's Museum / 국립경주박물관 어린이박물관; Gyeongju Expo Park / 경주엑스포대공원; Zoolung Zoolung Gyeongju Bomun / 주렁주렁 경주보문점; Hwangnidan-gil / 황리단길; Bomun Lake path / 보문호; Woljeonggyo Bridge / 월정교; Gyerim Forest / 경주 계림; Yangdong Village / 경주 양동마을; Gyeongju Folk Craft Village / 경주민속공예촌; Hwangnyongsa Temple History and Culture Hall / 황룡사역사문화관; Bulguksa Temple / 불국사; Gyeongju World Automobile Museum / 경주세계자동차박물관; Korean Popular Music Museum / 한국대중음악박물관; Uyang Museum of Art / 우양미술관; Wonder Space Bomun Branch; Jungle Media Park
