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

### mn-gobi — The Gobi (Mongolia)
Area covered: The Gobi (also known as / includes: gobi, gobi desert, khongoryn els, bayanzag)

Already in the app — places to eat: Three Camel Lodge (Bulagtai Restaurant); Gobi Mirage Camp; Dream Gobi Lodge; Gobi Nomad Lodge; Gobi Discovery Camp; Gobi Tour Camp; Secret of Ongi Camp; Dalanzadgad Market; Coffee by Khot Ail

Already in the app — things to do: Yolyn Am (Vulture Valley) / Ёлын ам; Khongoryn Els sand dunes / Хонгорын элс; Bayanzag (Flaming Cliffs) / Баянзаг; South Gobi museum at Dalanzadgad

### mn-ulaanbaatar — Ulaanbaatar and Terelj (Mongolia)
Area covered: Ulaanbaatar and Terelj (also known as / includes: ulaanbaatar, ulan bator, ulaan baatar, terelj)

Already in the app — places to eat: Modern Nomads / Модерн Номадс; BD's Mongolian Grill / БД'с Монгол Барбекю; Hazara / Хазара; Namaste / Намасте; Veranda / Веранда; Rosewood Kitchen + Enoteca / Роузвүүд; The Bull / Зэ Булл; Terelj Hotel / Тэрэлж зочид буудал; Ayanchin Four Seasons Lodge / Аянчин; Khaan Buuz / Хаан Бууз; State Department Store Food Court / Улсын Их Дэлгүүр; Shangri-La Centre Food Court / Шангри-Ла төв; Millie's Espresso / Миллис; Jur Ur / Жүр Үр; Tom N Toms Coffee / Том Н Томс

Already in the app — things to do: Chinggis Khaan National Museum / Чингис хаан үндэсний музей; Chinggis Khaan Statue Complex / Чингис хаан хөшөөт цогцолбор; Gorkhi-Terelj National Park and Turtle Rock / Горхи-Тэрэлж; Natural History Museum of Mongolia / Монголын Байгалийн түүхийн музей; National Amusement Park / Үндэсний соёл амралтын хүрээлэн; National Garden Park / Үндэсний цэцэрлэгт хүрээлэн; Zaisan Memorial / Зайсан толгой; National Museum of Mongolia / Монгол Улсын Үндэсний музей

### mv-atolls — The Maldives atolls (The Maldives)
Area covered: The Maldives atolls (also known as / includes: maldives, atoll, water villa, resort island)

Already in the app — places to eat: Seagull Cafe House; Symphony Restaurant; Belle Amie Bistro; The Sea House Maldives; Oishii - The House of Sushi; Bombay Darbar; Hot Bite; Kaani Beach Restaurant; Dawn Cafe; Burger King Velana International Airport; Bread Matters Centro; The Family Room by Coffee Lab; Meraki Coffee Roasters; Shell Beans; FineBake by Suzy

Already in the app — things to do: Artificial Beach, Malé; Sultan Park; National Museum of the Maldives; Bikini Beach, Maafushi; Hulhumalé Central Park leisure zone

### np-kathmandu — Kathmandu and the Himalaya (Nepal)
Area covered: Kathmandu and the Himalaya (also known as / includes: kathmandu, pokhara, bhaktapur, chitwan)

Already in the app — places to eat: OR2K; Fire and Ice Pizzeria; Yangling Tibetan Restaurant; Rosemary Kitchen & Coffee Shop; Roadhouse Cafe Thamel; Thamel House Restaurant; Bhojan Griha; Moondance Restaurant; Caffe Concerto; Pokhara Thakali Kitchen; Honacha; Labim Mall; Pumpernickel Bakery; Himalayan Java Coffee; The Juicery Cafe; am/pm Organic Cafe

Already in the app — things to do: Garden of Dreams / स्वप्नबगैँचा; Central Zoo, Jawalakhel / केन्द्रीय चिडियाखाना; Chandragiri Hills cable car / चन्द्रागिरि केबलकार; Patan Durbar Square and Patan Museum / पाटन संग्रहालय; Bhaktapur old town walk / भक्तपुर; Whoopee Land amusement and water park; Godawari Botanical Garden / राष्ट्रिय वनस्पति उद्यान; Swayambhunath (Monkey Temple); Shivapuri Nagarjun National Park
