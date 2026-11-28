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

### jp-nagasaki — Nagasaki (Japan)
Area covered: Nagasaki (also known as / includes: nagasaki, dejima, glover garden, gunkanjima, hashima island, sasebo)

Already in the app — places to eat: Shikairo / 四海樓; Kozanro Chinatown Honten / 江山楼 中華街本店; Kairakuen / 会楽園; Tsuruchan / ツル茶ん; Hamakatsu Honten / 浜勝 長崎本店; Kaisen Ichiba Nagasaki-ko Dejima Wharf / 海鮮市場 長崎港 出島ワーフ店; Yossou Honten / 吉宗 本店; Nagasaki Shinchi Chinatown / 長崎新地中華街; Iwasaki Honpo / 岩崎本舗; Nagasaki Kaido Kamome Ichiba / 長崎街道かもめ市場; Fukusaya Honten / 福砂屋 本店; Bunmeido Sohonten / 文明堂総本店; Shooken Honten / 松翁軒 本店; New York-do / ニューヨーク堂; Gusto Nagasaki Oura Kaigan / ガスト 長崎大浦海岸店; Wakatakemaru Hamamachi; Attic; Ringer Hut

Already in the app — things to do: Nagasaki Penguin Aquarium / 長崎ペンギン水族館; Nagasaki Bio Park / 長崎バイオパーク; Glover Garden / グラバー園; Nagasaki Peace Park / 平和公園; Huis Ten Bosch / ハウステンボス; Dejima / 出島; Dejima Wharf / 出島ワーフ; Nagasaki Seaside Park / 長崎水辺の森公園; Shinchi Chinatown / 新地中華街; Mount Inasa ropeway and observatory / 稲佐山ロープウェイ; Nagasaki City Dinosaur Museum / 長崎市恐竜博物館; Nagasaki Museum of History and Culture / 長崎歴史文化博物館; Kujukushima Aquarium Umikirara / 九十九島水族館海きらら; Nagasaki Science Museum (Starship) / 長崎市科学館; Nagasaki Prefectural Art Museum / 長崎県美術館; Aguri Dome / あぐりドーム; Play Kids Land; Kids Park Zone; VS Stadium Nagasaki; Kujira Dome; Omura City Children's Science Museum / 大村市子ども科学館

### jp-nikko — Nikko and Kinugawa (Japan)
Area covered: Nikko and Kinugawa (also known as / includes: nikko, kinugawa, chuzenji, oku-nikko, okunikko, senjogahara)

Already in the app — places to eat: Meiji-no-Yakata / 明治の館; Nikko Kanaya Hotel Main Dining Room / 日光金谷ホテル メインダイニングルーム; Hippari Dako / ひっぱり凧; Yuba Soba Nikko Momijian / ゆばそば 日光もみぢ庵; Komekichi Kozushi / 米吉 晃寿司; Coffee House Yukon / コーヒーハウス ユーコン; Sakaeya / さかえや; Michi-no-Eki Nikko Nikoniko Honjin / 道の駅日光 日光街道ニコニコ本陣; Nishisando Chaya / 西参道茶屋; Kanaya Hotel Bakery / 金谷ホテルベーカリー; Nikko Coffee Goyoteidori / 日光珈琲 御用邸通; Shogetsu Himuro / 松月氷室; Nikko Pudding Tei / 日光ぷりん亭 日光本店; Baumkuchen Kobo Hachiya / バウムクーヘン工房 はちや; Azconexion; Yuba-gozen Sun Field; Maruhide Shokudo; Nikko Yuba Tsuruya Imaichi

Already in the app — things to do: Edo Wonderland Nikko Edomura / 日光江戸村; Tobu World Square / 東武ワールドスクウェア; Kegon Falls / 華厳滝; Kinugawa Onsen Ropeway / 鬼怒川温泉ロープウェイ; Nikko Tamozawa Imperial Villa Memorial Park / 日光田母沢御用邸記念公園; Kirifuri Falls / 霧降の滝; Ryuzu Falls / 竜頭の滝; Kanmangafuchi Abyss / 憾満ヶ淵; Nikko Botanical Garden / 日光植物園; Lake Chuzenji Sightseeing Boat / 中禅寺湖遊覧船; Nikko Toshogu Museum / 日光東照宮宝物館; Kanaya Hotel History House / 日光金谷ホテル歴史館; Shinkyo Bridge / 神橋; Senjogahara Marshland / 戦場ヶ原; Lake Chuzenji / 中禅寺湖; Akechidaira Ropeway; Kinugawa River Boat Ride; Nikko Strawberry Park; Kirifuri Highland; Nikko Toshogu Shrine / 日光東照宮; Minogahara Forest Park / 美濃が原森林公園

### jp-nagano — Nagano and Matsumoto (Japan)
Area covered: Nagano and Matsumoto (also known as / includes: nagano, matsumoto, kamikochi, togakushi, hakuba, azumino)

Already in the app — places to eat: Fujikian / 藤木庵; Kadono Daimaru / かどの大丸; Meijitei Nagano Station / 明治亭 長野駅ビルMIDORI店; Chikufudo Zenkoji Daimon / 竹風堂 善光寺大門店; Enza Cafe / 猿座カフェ; Kobayashi Soba / こばやし本店; Soba Takagi / そば処 たかぎ; Ogawa-no-Sho Oyaki Mura Daimon / 小川の庄 おやき村 大門店; Zenkoji Nakamise Street / 善光寺 仲見世通り; Nawate Street / 縄手通り; Heigoro Honten / 平五郎 本店; Yokomachi Cafe Yawataya Isogoro / 八幡屋礒五郎 横町カフェ; Coffee Marumo / 珈琲まるも; Masamura / マサムラ 本店; Gosenjaku Kitchen; Gyoza no Ohsho Alpico Plaza Matsumoto; CAFE SWEET Nawate Street; Korean BBQ Namsan Nagano Terminal East Entrance; Saizeriya; Sky Restaurant Hakuba; Keitei / 桂亭

Already in the app — things to do: Jigokudani Snow Monkey Park / 地獄谷野猿公苑; Matsumoto Castle / 松本城; Daio Wasabi Farm / 大王わさび農場; Alps Azumino National Government Park, Horigane and Hotaka area / 国営アルプスあづみの公園 堀金・穂高地区; Nagano Chausuyama Zoo / 茶臼山動物園; Togakushi Chibikko Ninja Village / 戸隠 チビッコ忍者村; Matsumoto City Alps Park / 松本市アルプス公園; Nawate-dori and Nakamachi streets / 縄手通り・中町通り; Nagano City Museum and Planetarium / 長野市立博物館; Matsumoto City Museum / 松本市立博物館; Japan Ukiyo-e Museum / 日本浮世絵博物館; Narai-juku post town / 奈良井宿; Matsumoto City Museum of Art / 松本市美術館; Ikenotaira Family Land / 白樺高原 池の平ファミリーランド; Nagano Prefectural Art Museum / 長野県立美術館; Nakamise-dori street / 仲見世通り; Forest Adventure Nagano; Shiga Fossil House; Ta Kagi; Japan Radio Museum; Ishii Miso Brewery

### jp-kumamoto — Kumamoto and Aso (Japan)
Area covered: Kumamoto and Aso (also known as / includes: kumamoto, aso, mount aso, takachiho, amakusa, kurokawa onsen)

Already in the app — places to eat: Katsuretsu Tei Shinshigai Honten / 勝烈亭 新市街本店; Kokutei Honten / 黒亭 本店; Komurasaki Kamitori / こむらさき 上通中央店; Kourantei Shimotori Honten / 紅蘭亭 下通本店; Aoyagi / 青柳; Imakin Shokudo / いまきん食堂; Takamori Dengaku no Sato / 高森田楽の里; Sanzoku Tabiji / 山賊旅路; Sakuranobaba Josaien / 桜の馬場 城彩苑; Higo Yokamon Ichiba / 肥後よかモン市場; Aso Shrine Monzenmachi / 阿蘇神社 門前町商店街; Okada Coffee Kamitori / 岡田珈琲 上通本店; Swiss Shimotori / スイス 下通店; Kokin Denju-no-Ma / 古今伝授の間; Restaurant Noppo / レストラン野っぽ; Hale Cafe Tsunagu / ハレカフェつなぐ; Restaurant Fujiya / レストラン藤屋; Meshi no Yamaichi / めしのやまいち

Already in the app — things to do: Kumamoto Castle / 熊本城; Kumamoto Castle Museum Wakuwakuza / 熊本城ミュージアム わくわく座; Sakuranobaba Johsaien / 桜の馬場 城彩苑; Suizenji Jojuen Garden / 水前寺成趣園; Kumamoto City Zoological and Botanical Gardens / 熊本市動植物園; Kumamon Square / くまモンスクウェア; Kumamoto Museum / 熊本博物館; Aso Farm Land / 阿蘇ファームランド; Aso Volcano Museum / 阿蘇火山博物館; Mifune Dinosaur Museum / 御船町恐竜博物館; Kusasenri Grassland / 草千里ヶ浜; Kumamoto Prefectural Traditional Crafts Museum / 熊本県伝統工芸館; Nobikko Jumbo Kumamoto indoor playground; Kumamoto City Tram; Kamitori Shopping Arcade / 上通アーケード; Minamiaso Railway Trolley Train / 南阿蘇鉄道 トロッコ列車; Aso Kadorie Dominion / 阿蘇カドリー・ドミニオン; Aso Kogen Picture Book Museum / 葉祥明阿蘇高原絵本美術館; Takamori Yusui Tunnel Park / 高森湧水トンネル公園; Kajitsu no Kuni Couples / 果実の国カップルズ; Art Washi Kobo Shiramizu / あーと和紙工房白水; Aso Milk Farm / 阿蘇ミルク牧場; Asobi Park PLUS Sakura Machi Kumamoto / あそびパークPLUS サクラマチクマモト店; FUN VILLAGE; Yuberu Kids Land Kumamoto / ユウベルキッズランド熊本
