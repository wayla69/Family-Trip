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

### it-sicily — Sicily (Italy)
Area covered: Sicily (also known as / includes: sicily, sicilia, palermo, taormina)

Already in the app — places to eat: Antica Focacceria San Francesco; Ferro di Cavallo; Osteria Antica Marina; Trattoria de Fiore; Trattoria Da Nino; Villa Zuccaro; Osteria Da Mariano; Sicilia in Tavola; Al Porticciolo; Mercato di Ballarò; Ke Palle; Caseificio Borderi; Pasticceria Savia; Bam Bar; Caffè Sicilia; Pasticceria Cappello

Already in the app — things to do: Valley of the Temples / Valle dei Templi, Agrigento; Mount Etna cable car and Silvestri craters / Funivia dell'Etna, Rifugio Sapienza; Neapolis Archaeological Park, Syracuse / Parco Archeologico della Neapolis, Siracusa; Maniace Castle, Ortigia / Castello Maniace, Ortigia; Ancient Theatre of Taormina / Teatro Antico di Taormina; Villa Romana del Casale / Villa Romana del Casale, Piazza Armerina; Zingaro Nature Reserve / Riserva dello Zingaro; Segesta Archaeological Park / Parco Archeologico di Segesta; Palermo Botanical Garden / Orto Botanico di Palermo; Antonino Pasqualino International Puppet Museum / Museo internazionale delle marionette Antonio Pasqualino; Salinas Archaeological Museum / Museo Archeologico Regionale Antonino Salinas; Mondello beach / Spiaggia di Mondello; Ursino Castle and Civic Museum, Catania / Castello Ursino, Catania; La Pescheria fish market, Catania / La Pescheria, Catania; Alcantara Gorge / Gole dell'Alcantara; Cefalù town beach and seafront / Spiaggia di Cefalù; La Rocca of Cefalù / La Rocca di Cefalù

### it-venice — Venice (Italy)
Area covered: Venice (also known as / includes: venice, venezia, rialto, san marco)

Already in the app — places to eat: Trattoria alla Madonna; Pizzeria Ae Oche; Birraria La Corte; Taverna San Trovaso; Rossopomodoro Venezia; Trattoria Al Gatto Nero; Trattoria da Romano; Paradiso Perduto; Dal Moro's Fresh Pasta To Go; Acqua e Mais; Mercato di Rialto; Gelateria Nico; Suso Gelatoteca; Pasticceria Tonolo; Rosa Salva

Already in the app — things to do: Doge's Palace / Palazzo Ducale; St Mark's Campanile / Campanile di San Marco; Vaporetto ride on the Grand Canal / Vaporetto sul Canal Grande; Peggy Guggenheim Collection / Collezione Peggy Guggenheim; Murano Glass Museum / Museo del Vetro di Murano; Burano island / Burano; Burano Lace Museum / Museo del Merletto; Lido beach (Alberoni) / Spiaggia libera di Alberoni, Lido; Rialto Market / Mercato di Rialto; Venice Carnival / Carnevale di Venezia; Gondola ride / Giro in gondola; Libreria Acqua Alta / Libreria Acqua Alta; Parco delle Rimembranze, Sant'Elena / Parco delle Rimembranze; Parco Savorgnan / Parco di Palazzo Savorgnan; Natural History Museum of Venice / Museo di Storia Naturale di Venezia

### kz-almaty — Almaty and the Tian Shan (Kazakhstan)
Area covered: Almaty and the Tian Shan (also known as / includes: almaty, big almaty lake, charyn, kolsai)

Already in the app — places to eat: Navat / Нават; Rumi / Руми; Tyubeteika / Тюбетейка; Kishlak / Кишлак; Daredzhani / Дареджани; Alasha / Алаша; Zheti Kazyna / Жеті Қазына; Kaganat / Каганат; Green Bazaar / Зелёный базар; MEGA Alma-Ata Food Court / MEGA Alma-Ata; La Skala; Nedelka / Неделька; Marrone Rosso / Marrone Rosso

Already in the app — things to do: Kok Tobe hill and cable car / Көктөбе; Medeu and Shymbulak gondola / Медеу – Шымбұлақ; Big Almaty Lake / Үлкен Алматы көлі; Almaty Zoo / Алматы хайуанаттар бағы; Almaty Botanical Garden / Алматы ботаникалық бағы; Almaty Museum of Arts / Almaty Museum of Arts; Central State Museum of Kazakhstan / Қазақстан Республикасының Орталық мемлекеттік музейі; Museum of Folk Musical Instruments / Ықылас атындағы халық музыкалық аспаптар мұражайы; Museum of Ice Cream and Sweets / Музей мороженого и сладостей; Green Bazaar / Жасыл базар; Central Park of Culture and Leisure / Центральный парк культуры и отдыха; Almaty State Puppet Theatre / Государственный академический театр кукол; Kazakh State Circus / Казахский государственный цирк; Hawaii-Miami Aquapark & SPA / Hawaii-Miami Aquapark & SPA; Fantasy World Almaty / Fantasy World; Butakovka Waterfall trail / Бутаковский водопад

### kz-astana — Astana and Burabay (Kazakhstan)
Area covered: Astana and Burabay (also known as / includes: astana, nur-sultan, burabay, borovoe)

Already in the app — places to eat: Saksaul / Саксаул; Arnau / Арнау; Navat / Нават; Qazaq Gourmet / Qazaq Gourmet; Line Brew / Line Brew; Rixos Borovoe / Rixos Borovoe; Wyndham Garden Burabay; Khan Shatyr Food Court / Хан Шатыр; MEGA Silk Way Food Court / MEGA Silk Way; Coffee Boom / Coffee Boom; Marrone Rosso / Marrone Rosso

Already in the app — things to do: Ailand oceanarium / Ailand (Duman) океанариум; DinoWorld / DinoWorld; Nur Alem sphere museum / Нұр Әлем; Baiterek tower / Бәйтерек; Astana Botanical Garden / Ботанический сад Астаны; Presidential Park / Президентский парк; National Museum of Kazakhstan / Национальный музей Республики Казахстан; Astana Circus / Астанинский цирк; Khan Shatyr entertainment centre / Хан Шатыр; Happylon family amusement park; Independence Palace / Тәуелсіздік сарайы; Nursultan Mosque / Нұрсұлтан мешіті; Mangilik El Triumphal Arch / Мәңгілік Ел салтанат арқасы; Uly Dala Eli Monument / Ұлы Дала Елі
