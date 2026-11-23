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

### th-chiangmai — Chiang Mai and Chiang Rai (Thailand)
Area covered: Chiang Mai and Chiang Rai (also known as / includes: chiang mai, chiang rai, doi suthep, doi inthanon)

Already in the app — places to eat: Khao Soi Khun Yai / ข้าวซอยคุณยาย; Khao Soi Mae Sai / ข้าวซอยแม่สาย; Khao Soi Lam Duan Fa Ham / ข้าวซอยลำดวนฟ้าฮ่าม; Huen Phen / เฮือนเพ็ญ; Tong Tem Toh / ต๋องเต็มโต๊ะ; SP Chicken / เอสพี ไก่ย่าง; Huen Muan Jai / เฮือนม่วนใจ๋; Ginger Farm Kitchen; Lu Lam / หลู้ลำ; Khao Soi Pho Jai / ข้าวซอยพอใจ; Khao Kha Moo Chang Phueak / ข้าวขาหมูช้างเผือก; Warorot Market / กาดหลวง (ตลาดวโรรส); Chiang Rai Night Bazaar / เชียงรายไนท์บาซาร์; Fern Forest Cafe; Cheevit Cheeva / ชีวิต ชีวา; Chivit Thamma Da / ชีวิตธรรมดา

Already in the app — things to do: Chiang Mai Zoo; Chiang Mai Night Safari; Wat Phra That Doi Suthep; Royal Park Rajapruek; Bua Tong Sticky Waterfall; Sunday Walking Street; Warorot Market; Elephant Nature Park; Chiang Mai City Arts and Cultural Centre; Nong Buak Haad Public Park; Wat Chedi Luang; Huay Tung Tao Lake; Queen Sirikit Botanic Garden; Baan Kang Wat; Mon Cham; Pai Canyon (Kong Lan); Pai Walking Street; Sai Ngam hot spring; Boon Ko Ku So bamboo bridge; Lanna Folklife Museum; Chiang Mai National Museum; Art in Paradise Chiang Mai; Grand Canyon Water Park / แกรนด์แคนยอน วอเตอร์ปาร์ค; Ban Dam Museum / พิพิธภัณฑ์บ้านดำ

### th-krabi — Krabi and Phi Phi (Thailand)
Area covered: Krabi and Phi Phi (also known as / includes: krabi, ao nang, railay, phi phi, koh lanta)

Already in the app — places to eat: Ruen Mai / เรือนไม้; Krua Thara / ครัวธารา; Kotung / โกตุง; Lae Lay Grill; D&E's Jungle Kitchen; KoDam Kitchen / ครัวโกดำ; Wang Sai Seafood / วังทรายซีฟู้ด; Papaya Restaurant; Garlic 1992; Krabi Town Walking Street / ถนนคนเดินกระบี่; Chao Fah Night Market / ตลาดโต้รุ่งท่าเรือเจ้าฟ้า; Ao Nang Landmark Night Market; Café 8.98; Pee Pee Bakery; Thongyib Thongyod / ทองหยิบทองหยอดคาเฟ่; Pum Thai Restaurant

Already in the app — things to do: Ao Nang Beach; Nopparat Thara Beach; Railay Beach; Krabi 4 Islands tour; Emerald Pool; Khlong Thom Hot Springs; Than Bok Khorani National Park; Tha Pom Khlong Song Nam; Tiger Cave Temple; Wat Khlong Thom Museum; Klang Cave; Shell Fossil Cemetery; Krabi Town Walking Street; Thara Park; Ao Nang Landmark Night Market; The Fun Garden; Krabi Aquarium; Hong Island (Koh Hong) / เกาะห้อง; Maya Bay; Koh Phi Phi Don; Blue Pool (Sa Nam Phut); Khlong Muang Beach / หาดคลองม่วง; Tubkaek Beach; Kayaking on Ao Thalane

### th-samui — Koh Samui, Koh Phangan and Koh Tao (Thailand)
Area covered: Koh Samui, Koh Phangan and Koh Tao (also known as / includes: koh samui, samui, koh phangan, koh tao, ang thong marine park)

Already in the app — places to eat: Krua Chao Baan / ครัวชาวบ้าน; Sabeinglae (Lamai) / สบายเล ละไม; Bang Po Seafood (Takho) / บางปอซีฟู้ด (ตาโข่); The Hut Cafe; Khaw Glong Thai Restaurant; Krua Bophut / ครัวบ่อผุด; Kob Thai; Fisherman's Restaurant & Bar; 995 Roasted Duck; Fisherman's Village Walking Street / ถนนคนเดินหมู่บ้านชาวประมง; Central Samui food court / ศูนย์อาหาร เซ็นทรัล สมุย; Phantip Night Market / ตลาดพันทิพย์ ท้องศาลา; La Fabrique; Sweet Sisters Cafe; Zest Coffee Lounge; Lamai Sunday Night Market; Lamai Night Plaza; Chaweng Night Market food court; Samui Seafood Grill; Zoo Café; Bliss Café

Already in the app — things to do: Big Buddha Temple / วัดพระใหญ่; Wat Plai Laem / วัดปลายแหลม; Hin Ta Hin Yai / หินตาหินยาย; Na Muang Waterfall 1 / น้ำตกหน้าเมือง; Fisherman's Village Walking Street; Maenam Beach / หาดแม่น้ำ; Choeng Mon Beach / หาดเชิงมน; Lipa Noi Beach / หาดลิปะน้อย; Ang Thong National Marine Park / อุทยานแห่งชาติหมู่เกาะอ่างทอง; Samui Elephant Sanctuary; Paradise Park Farm; Kidomo Kids Club; Fun House Samui; Le Blocks Playroom; Central Samui; Chaweng Beach / หาดเฉวง; Secret Buddha Garden (Magic Garden) / สวนลับ ตาร์นิม; Renaissance Art Center; MK Ultra Artists Pottery Studio

### th-chanthaburi — Chanthaburi (Thailand)
Area covered: Chanthaburi (also known as / includes: chanthaburi, chantaburi, chanthaboon, chao lao, kung krabaen, namtok phlio)

Already in the app — places to eat: Chanthorn Phochana / จันทรโภชนา; Kuay Jap Pa Mai / ก๋วยจั๊บป้าไหม; Farm Pu Nim / ฟาร์มปูนิ่ม; The Tamajun Restaurant; Krua Lung Choey / ครัวลุงเชย; Jae Eid Tom Yam Seafood Noodles / เจ๊อี๊ด ก๋วยเตี๋ยวต้มยำทะเล; Nam Phu Market / ตลาดน้ำพุ; Chanthaboon Waterfront Walking Street / ถนนคนเดินชุมชนริมน้ำจันทบูร; Robinson Chanthaburi food court / ศูนย์อาหาร โรบินสัน จันทบุรี; Central Chanthaburi food court / ศูนย์อาหาร เซ็นทรัล จันทบุรี; Khanom Khai Pa Tai / ขนมไข่ป้าไต๊; Rocket Ice Cream / ไอศกรีมตราจรวด; Baan Luang Rajamaitri cafe / บ้านหลวงราชไมตรี; Sweet at Moon; Koff House Coffee Bar & Eatery; Soi Dao Restaurant; Shabu Phu Ing Dao / ชาบู ภูอิงดาว; Je Nong Ao Yang; Yai Tu Seafood

Already in the app — things to do: Chanthaboon Waterfront Community; Chanthaburi gem market; National Maritime Museum, Noen Wong; Namtok Phliu National Park; Kung Krabaen Bay Royal Development Study Centre; Kung Krabaen mangrove walkway; Khao Khitchakut National Park / อุทยานแห่งชาติเขาคิชฌกูฏ; Chanthaburi Cathedral; King Taksin Maharat Public Park; Hat Chao Lao; Laem Sadet beach; Chanthaburi Herb Garden; Bang Sra Kao mat-weaving village; Wat Khao Sukim; Khao Laem Sing Forest Park; Krathing Waterfall; Khao Sip Ha Chan Waterfall; Trok Nong Waterfall; Khao Phloi Waen; Noen Nang Phaya Viewpoint; Hat Khung Wiman
