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

### tw-central — Central Taiwan (Taiwan)
Area covered: Central Taiwan (also known as / includes: sun moon lake, alishan, taichung, nantou, cingjing, gaomei)

Now in the app: 22 places to eat, 30 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Fu Din Wang / 富鼎旺豬腳; Qin Yuan Chun / 沁園春; Taichung Meat Ball / 台中肉員; Jin Du Restaurant / 金都餐廳; Full House Resort Restaurant / 富豪群渡假民宿餐廳; Fountain Chicken Rice / 噴水雞肉飯 總店; Lin Cong Ming Fish Head Casserole / 林聰明沙鍋魚頭; Fenqihu Hotel Lunch Box / 奮起湖大飯店 便當; Fengjia Night Market / 逢甲夜市; Taichung Second Market / 台中第二市場; Ita Thao Shopping Street / 伊達邵商店街; A-Zhen Meat Buns / 阿振肉包; Miyahara / 宮原眼科; Chun Shui Tang Siwei Original Store / 春水堂 四維創始店; Feeling 18 Chocolate / 18度C巧克力工房; Yu Jen Jai / 玉珍齋; Island 3.5 Degrees Family Restaurant / 小島3.5度; Butter Hippo Family Restaurant / 奶油河馬家庭餐廳; Zanmen Xiaoshihou Kids' Restaurant / 咱們小時候; Paper Box King Science Museum Branch / 紙箱王博館店; Lizi Café (Tunghai Forest) / 梨子 東海森林店; Apple Castle Family Restaurant / 蘋果堡親子餐廳

Already in the app — things to do: National Museum of Natural Science / 國立自然科學博物館; Formosan Aboriginal Culture Village and Sun Moon Lake ropeway / 九族文化村; Rainbow Village / 彩虹眷村; Cingjing Farm Green Grassland / 清境農場青青草原; Fantasy Land indoor park (Dali) / 異想新樂園; Gaomei Wetlands / 高美濕地; Fengjia Night Market / 逢甲夜市; Wonder New Land / 新奇夢想樂園; Lihpao Land / 麗寶樂園; National Taiwan Museum of Fine Arts / 國立臺灣美術館; 921 Earthquake Museum of Taiwan / 921地震教育園區; Xitou Nature Education Area / 溪頭自然教育園區; Taiwan Glass Gallery / 台灣玻璃館; Guliu Playground, Aofeng Mountain Park / 鰲峰山谷溜遊戲場; Dakeng Hiking Trail No. 9; Museum of Illusions Taichung / 幻覺博物館; Yohocraft Craft Hall / 約客＆厚禮築夢手創館; Barefoot Eco Farm / 赤腳丫生態農莊; Wilson's Farm / 威爾森的農場; Yijian Dairy Goat Farm / 益健乳羊牧場; Paper Box King Creative Park / 紙箱王創意園區; Macaron Park / 馬卡龍公園; Dongshi Forest Recreation Area / 東勢林場遊樂區; National Comics Museum / 國家漫畫博物館; Jiujiufeng Zoo Park / 九九峰動物樂園; Kuang Hsing Paper Mill / 廣興紙寮; Fongnian Mushroom Farm / 豐年靈芝菇類生態農場; Shuili Snake Kiln / 水里蛇窯陶藝文化園區; Xinshe Mushroom Farm (Baigu Zhuang) / 新社百菇莊; Futian Water Reclamation Centre Playground / 福田水資源回收中心兒童遊樂場

### vn-hue — Huế (Vietnam)
Area covered: Huế (also known as / includes: hue city, perfume river, thua thien, thien mu, lang co)

Now in the app: 29 places to eat, 23 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Quán Hạnh; Les Jardins de la Carambole; Lạc Thiện; Golden Rice Restaurant; Bún Bò Mệ Kéo; Cơm Hến Hoa Đông; Không Gian Xưa; Ancient Hue Garden Houses; Family Home Restaurant; Quán Bà Đỏ; Chạn Restaurant; Chợ Đông Ba; Hàng Me Mẹ; Chè Hẻm; Cà Phê Muối; Vỹ Dạ Xưa; Little Italy Hue; Bistro La Carambole; Madam Thu Restaurant; Sala Vegtarian Restaurant; Lien Hoa Vegetarian Restaurant; Song Huong Floating Restaurant; Banh Canh Ca Loc Thuy; Ancient Hue Garden House Restaurant; Y Thao Restaurant; Le Parfum Restaurant; Huong Restaurant; Nook Eatery; Tinh Gia Vien / Tịnh Gia Viên

Already in the app — things to do: Hue Imperial City / Đại Nội Huế; Hue Museum of Royal Antiquities / Bảo tàng Cổ vật Cung đình Huế; An Dinh Palace / Cung An Định; Hue Royal Theatre show / Duyệt Thị Đường; Khai Dinh Tomb / Lăng Khải Định; Minh Mang Tomb / Lăng Minh Mạng; Tu Duc Tomb / Lăng Tự Đức; Dong Ba Market / Chợ Đông Ba; Perfume River dragon boat / Thuyền rồng sông Hương; Thanh Toan Tile-Roofed Bridge / Cầu ngói Thanh Toàn; Bach Ma National Park / Vườn quốc gia Bạch Mã; Lang Co Beach / Bãi biển Lăng Cô; Thuan An Beach / Bãi biển Thuận An; Ho Quyen Tiger Arena / Hổ Quyền; Nguyen Dinh Chieu riverside walk / Phố đi bộ Nguyễn Đình Chiểu; Imperial City; Thien Mu Pagoda; Perfume River boat trip to Thien Mu Pagoda; The garden houses of Kim Long; Thủy Xuân Incense Village / Làng hương Thủy Xuân; Tân Cảnh Dương Beach / Bãi biển Tân Cảnh Dương; Tam Giang Lagoon / Phá Tam Giang; Thanh Tiên Paper Flower Village / Làng hoa giấy Thanh Tiên

### be-brussels — Brussels (Belgium)
Area covered: Brussels (also known as / includes: brussels, bruxelles, brussel, grand-place, atomium, antwerp)

Now in the app: 26 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Chez Léon; Aux Armes de Bruxelles; 't Kelderke; Fin de Siècle; Restaurant Vincent; La Roue d'Or; Amadeo; Le Chou de Bruxelles; La Quincaillerie; Maison Antoine; Fritland; Noordzee - Mer du Nord; Wolf; Maison Dandoy; Wittamer; Gaston; Arsouille; Le Balmoral; Garage-à-Manger; La Fabbrica; Chicago; Biga Pizzeria; Le Fox; Lloyd Coffee Eatery Louise; Cōcina Châtelain; Brasserie du Miroir

Already in the app — things to do: Atomium; Mini-Europe; Train World; Museum of Natural Sciences / Muséum des Sciences naturelles; Belgian Comic Strip Center / Centre belge de la Bande dessinée; Autoworld; Musée des Enfants / Le Musée des Enfants; Musical Instruments Museum / MIM; Choco-Story Brussels; Brussels Tram Museum / Musée du Transport urbain bruxellois; Grand Place and Manneken Pis / Grand-Place; Winter Wonders Christmas market / Plaisirs d'Hiver; Place du Jeu de Balle flea market / Vieux Marché; AfricaMuseum; Brussels Planetarium; Farm Maximilien; Royal Park; Cinquantenaire Park; St. Catherine Playground; Mont des Arts; Roodebeek small playground; SUPER; WOM (World of Mind); LEGO Discovery Centre; Koezio

### cn-chengdu — Chengdu and Jiuzhaigou (China)
Area covered: Chengdu and Jiuzhaigou (also known as / includes: chengdu, sichuan, jiuzhaigou, huanglong, panda base, kuanzhai)

Now in the app: 25 places to eat, 26 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Chen Mapo Tofu / 陈麻婆豆腐 青华路店; Ming Ting Fandian / 明婷饭店; Ma Wang Zi / 马旺子川小馆; Tao De Sha Guo (Chunxi Road) / 陶德砂锅 春熙路店; Wenshu Monastery Vegetarian Restaurant / 文殊院素斋; Shu Jiu Xiang Hot Pot / 蜀九香火锅酒楼; Huangcheng Laoma / 皇城老妈; Xiaolongkan Hot Pot / 小龙坎老火锅 春熙店; Long Chao Shou / 龙抄手 春熙路总店; Zhong Shuijiao (People's Park) / 钟水饺 人民公园店; Nuorilang Restaurant / 诺日朗餐厅; Lai Tang Yuan / 赖汤圆 总府路店; Heming Teahouse / 鹤鸣茶社; Gongting Pastry Shop / 宫廷糕点铺; Peter's Tex-Mex Grill; Chunyang Guan / 纯阳馆鱼香排骨面 吉祥街店; Chongqing Blanket Noodles / 重庆铺盖面 四道街店; Dan Dumplings / 但水饺; He Dumplings / 贺水饺; Zha Zha Noodles / 查渣面 宽窄巷子长顺店; Zhang Laowu Liangfen / 张老五凉粉店 槐树街店; Xiao Ming Tang Dandan Noodles / 小名堂担担甜水面 东城根上街店; He Ji Egg Cakes / 贺记蛋烘糕 文庙西街店; Nanchong Taste / 南充味道·正宗川北凉粉顺庆米粉; Mi Xun Teahouse / 谧寻茶室 成都居舍店

Already in the app — things to do: Chengdu Research Base of Giant Panda Breeding / 成都大熊猫繁育研究基地; Chengdu Zoo / 成都动物园; Chengdu Museum of Natural History / 成都自然博物馆; Sichuan Science and Technology Museum / 四川科技馆; Chengdu Museum / 成都博物馆; Haichang Polar Ocean Park / 成都海昌极地海洋公园; Chengdu Happy Valley / 成都欢乐谷; Du Fu Thatched Cottage / 杜甫草堂; Wide and Narrow Alleys / 宽窄巷子; Jinli Ancient Street / 锦里古街; Dujiangyan Irrigation System / 都江堰景区; Jiuzhaigou Valley / 九寨沟; Chengdu Teddy Bear Museum / 成都泰迪熊博物馆; Sanxingdui Museum / 三星堆博物馆; People's Park / 人民公园; Haihai Cube Aquarium / 浩海立方海洋馆; Shiye Natural History Museum / 拾野自然博物馆; Cloud Paradise Play Park / 云朵乐园; Lu Ke Island / 麓客岛; Lichao Aviation Museum / 立巢航空博物馆; Mount Qingcheng; Wuhou Shrine / 成都武侯祠博物馆; Jiaozi Park / 交子公园; Super Neobio / 超级奈尔宝·儿童乐园; Chengdu Science Fiction Museum / 成都科幻馆; Chengdu Xin Zhihui Music Museum / 成都芯智慧音乐博物馆
