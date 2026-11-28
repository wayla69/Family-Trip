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

### cn-xian — Xi'an (China)
Area covered: Xi'an (also known as / includes: xian, xi'an, terracotta, city wall)

Already in the app — places to eat: De Fa Chang / 德发长饺子馆; Tong Sheng Xiang / 同盛祥; Lao Sun Jia / 老孙家饭庄; Xi'an Fanzhuang / 西安饭庄; Chang'an Da Pai Dang / 长安大牌档; Zui Chang'an / 醉长安; Lao Mi Jia Paomo / 老米家大雨泡馍; First Noodle Under the Sun / 天下第一面; Jia San Soup Dumplings / 贾三灌汤包子馆; Fan Ji Lazhi Roujiamo / 樊记腊汁肉夹馍; Wei Jia Liangpi / 魏家凉皮; Muslim Quarter (Beiyuanmen) / 回民街 北院门; Yongxingfang / 永兴坊; De Mao Gong / 德懋恭; Miqi Bakery / 米旗

Already in the app — things to do: Terracotta Army / 秦始皇帝陵博物院 兵马俑; Xi'an City Wall / 西安城墙; Shaanxi History Museum / 陕西历史博物馆; Bell Tower / 西安钟楼; Tang Paradise / 大唐芙蓉园; Datang Everbright City / 大唐不夜城; Muslim Quarter street food / 回民街; Huaqing Palace / 华清宫; Daming Palace National Heritage Park / 大明宫国家遗址公园; Xi'an Banpo Museum / 西安半坡博物馆; Qujiang Polar Ocean Park / 西安曲江极地海洋公园; Xi'an Museum and Small Wild Goose Pagoda / 西安博物院 小雁塔; Qinling Wildlife Park / 秦岭野生动物园; Xingqing Palace Park / 兴庆宫公园; Shaanxi Natural History Museum / 陕西自然博物馆; Giant Wild Goose Pagoda and Da Ci'en Temple / 大慈恩寺 · 大雁塔

### cn-yunnan — Yunnan (China)
Area covered: Yunnan (also known as / includes: yunnan, kunming, lijiang, dali)

Already in the app — places to eat: Lao Fangzi / 昆明老房子; 1910 La Gare du Sud / 1910火车南站; Shiping Huiguan / 石屏会馆; Fu Zhao Lou / 福照楼; Meizi Jing / 梅子井酒家; Yi Ran Tang / 一然堂; Amayi Naxi Snacks / 阿妈意纳西饮食院; No. 88 Snack Shop / 88号小吃店; Jianxin Yuan / 建新园; Zhuanxin Farmers' Market / 篆新农贸市场; Zai Hui Shou / 再回首; Zhongyi Market / 忠义市场; Jiahua Flower Cakes / 嘉华鲜花饼; Bakery 88 / 88号西点店

Already in the app — things to do: Stone Forest (Shilin) / 石林; Green Lake Park / 翠湖公园; Yunnan Provincial Museum / 云南省博物馆; Yunnan Nationalities Village / 云南民族村; Kunming Zoo / 昆明动物园; Jade Dragon Snow Mountain and Blue Moon Valley / 玉龙雪山 蓝月谷; Black Dragon Pool Park, Lijiang / 黑龙潭公园; Dali Old Town / 大理古城; Cangshan cable cars / 苍山索道; Kunming World Horticultural Expo Garden; Lijiang Old Town; Chongsheng Temple and the Three Pagodas / 崇圣寺三塔; Dali Museum / 大理市博物馆; Yan Compound, Xizhou / 喜洲严家大院; Mu's Residence, Lijiang / 木府; Butterfly Spring, Dali / 蝴蝶泉; Daguan Park, Kunming / 大观公园; Western Hills, Kunming / 西山; Jiuxiang Scenic Area caves / 九乡风景区; Yuantong Temple, Kunming / 圆通寺

### cn-zhangjiajie — Zhangjiajie (China)
Area covered: Zhangjiajie (also known as / includes: zhangjiajie, tianmen, wulingyuan, fenghuang)

Already in the app — places to eat: Starbucks Biaozhimen / 星巴克 标志门街区; Hu Shifu Sanxiaguo / 胡师傅三下锅; Le Kou Fu / 乐口福; Tang Shifu Tujia Restaurant / 唐师傅土家食府; Zhaizili Bobo Cai / 寨子里的钵钵菜; Suoxi Shanzhai / 索溪山寨 湘西民间土菜; Zui Xiang Qin / 醉湘亲私房菜; V Cafe (Pullman Zhangjiajie) / 张家界京武铂尔曼酒店; Maoshi Specialty Restaurant / 毛氏小馆; Zhunaoke Cold Noodles / 猪脑壳凉面 南正街店; McDonald's Tianzi Mountain / 麦当劳 天子山餐厅; Xibu Street / 溪布街; KFC Biaozhimen / 肯德基 标志门街区; Chayan Yuese Biaozhimen / 茶颜悦色 标志门街区

Already in the app — things to do: Zhangjiajie National Forest Park / 张家界国家森林公园; Bailong Elevator / 百龙天梯; Tianzi Mountain cable car / 天子山索道; Tianmen Mountain / 天门山; Zhangjiajie Grand Canyon Glass Bridge / 张家界大峡谷玻璃桥; Yellow Dragon Cave / 黄龙洞; Baofeng Lake / 宝峰湖; Charming Xiangxi show / 魅力湘西; Tianmen Fox Fairy show / 天门狐仙; Golden Whip Stream; Ten-Mile Gallery tram; 72 Strange Buildings / 七十二奇楼; Sky Garden, Tianzi Mountain / 天空之园; Huangshizhai (Yellow Stone Village) / 黄石寨; Zhangjiajie Museum / 张家界市博物馆; Tujia Folk Customs Park / 张家界土家风情园

### vn-dalat — Đà Lạt (Vietnam)
Area covered: Đà Lạt (also known as / includes: dalat, da lat, lam dong, langbiang)

Already in the app — places to eat: Góc Hà Thành; Lẩu Gà Lá É Tao Ngộ; Nem Nướng Bà Hùng; Artist Alley Restaurant; Ganesh Indian Restaurant; Thủy Tạ; Bánh Ướt Lòng Gà Trang; Lẩu Bò Ba Toa Quán Gỗ; Chợ đêm Đà Lạt; Bánh Căn Nhà Chung; Bánh Mì Xíu Mại Hoàng Diệu; Liên Hoa Bakery; Kem Bơ Thanh Thảo; Sữa Đậu Nành Hoa Sữa; Cà Phê Tùng

Already in the app — things to do: Crazy House (Hang Nga Villa) / Biệt thự Hằng Nga; Datanla Waterfall and alpine coaster / Thác Datanla; Dalat Railway Station and Trai Mat train / Ga Đà Lạt; Bao Dai Palace (Dinh 3) / Dinh III Bảo Đại; Dalat Flower Gardens / Vườn hoa thành phố Đà Lạt; Zoodoo Dalat / Vườn thú Zoodoo; Langbiang Mountain / Núi Langbiang; Lam Dong Museum / Bảo tàng Lâm Đồng; Valley of Love / Thung lũng Tình Yêu; Dalat Cable Car / Cáp treo Đà Lạt; Cu Lan Village / Làng Cù Lần; Xuan Huong Lake / Hồ Xuân Hương; Dalat Night Market / Chợ đêm Đà Lạt; Dalat Market / Chợ Đà Lạt; Puppy Farm Dalat
