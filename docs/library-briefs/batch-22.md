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

### p-lapland — Lapland (Finland)
Area covered: Lapland (also known as / includes: lapland, rovaniemi, santa claus village, saariselka)

Already in the app — places to eat: Nili; Roka Kitchen & Wine Bar; Gaissa; Arctic Restaurant; Kotahovi; Three Elves Restaurant; Ämmilä; Restaurant Aanaar; Laanilan Kievari; Santa's Salmon Place; Kauppayhtiö; Cafe & Bar 21; Choco Deli; Kotileipomo Antinkaapo

Already in the app — things to do: Santa Claus Village / Joulupukin Pajakylä; SantaPark / Joulupukin Pajakylä SantaPark; Arktikum Science Centre / Arktikum; Ranua Wildlife Park / Ranuan eläinpuisto; Pilke Science Centre / Tiedekeskus Pilke; Snowman World / Snowman World; Arctic Snow Hotel / Arctic Snow Hotel; Kotatieva Winter Leisure Park / Kotatieva; Santa Claus Office; Santa Claus Main Post Office; Santa's Pets; Mrs Santa Claus Christmas Cottage; Arctic Garden; Santa's Snowtubing; Korundi – Rovaniemi Art Museum / Kulttuuritalo Korundi

### pl-krakow — Kraków (Poland)
Area covered: Kraków (also known as / includes: krakow, cracow, wawel, zakopane)

Already in the app — places to eat: Pod Wawelem Kompania Kuflowa; Morskie Oko; Pod Aniołami; Miód Malina; Restauracja Starka; Kuchnia u Doroty; Pierogarnia Krakowiacy; Czarna Kaczka; Ariel; Bar Mleczny Pod Temidą; Polakowski; Plac Nowy Okrąglak; Good Lood; Café Camelot; Nowa Prowincja; Charlotte Chleb i Wino

Already in the app — things to do: Wawel Royal Castle / Zamek Królewski na Wawelu; Rynek Underground / Rynek Underground; Barbican / Barbakan; Wieliczka Salt Mine / Kopalnia Soli Wieliczka; Museum of Engineering and Technology, tram depot / Muzeum Inżynierii i Techniki, Zajezdnia; Polish Aviation Museum / Muzeum Lotnictwa Polskiego; Kościuszko Mound / Kopiec Kościuszki; Henryk Jordan Park / Park Jordana; Kraków Christmas Market / Jarmark Bożonarodzeniowy; Vistula river cruise / Rejs po Wiśle; Kraków Zoo / Ogród Zoologiczny w Krakowie; Stanisław Lem Garden of Experiences / Ogród Doświadczeń im. Stanisława Lema; Energylandia (Zator) / Energylandia; Kraków Water Park / Park Wodny w Krakowie; Dragon's Den / Smocza Jama; Sukiennice (Cloth Hall) art gallery / MNK Sukiennice

### pt-lisbon — Lisbon and Sintra (Portugal)
Area covered: Lisbon and Sintra (also known as / includes: lisbon, lisboa, alfama, belem)

Already in the app — places to eat: Cervejaria Trindade; Bonjardim; Portugália Cervejaria Almirante Reis; Solar dos Presuntos; Laurentina, o Rei do Bacalhau; Casa da Índia; Tascantiga; Restaurante Tulhas; Time Out Market Lisboa; Mercado de Campo de Ourique; Pão Pão Queijo Queijo; Pastéis de Belém; Manteigaria; Santini; Casa Piriquita

Already in the app — things to do: Lisbon Oceanarium / Oceanário de Lisboa; Lisbon Zoo / Jardim Zoológico de Lisboa; Pavilion of Knowledge / Pavilhão do Conhecimento; Castelo de São Jorge / Castelo de São Jorge; Pena Palace / Palácio Nacional da Pena; Quinta da Regaleira / Quinta da Regaleira; National Coach Museum / Museu Nacional dos Coches; Lisbon Cable Car / Telecabine Lisboa; Time Out Market Lisboa / Mercado da Ribeira; Navy Museum / Museu de Marinha; Vasco da Gama Aquarium / Aquário Vasco da Gama; Gulbenkian Garden / Jardim Gulbenkian; Puppet Museum / Museu da Marioneta; Eduardo VII Park / Parque Eduardo VII; Feira da Ladra flea market / Feira da Ladra

### pt-porto — Porto (Portugal)
Area covered: Porto (also known as / includes: porto, oporto, ribeira, douro)

Already in the app — places to eat: Café Santiago; Cervejaria Brasão Aliados; Abadia do Porto; Adega São Nicolau; Capa Negra II; Restaurante Antunes; Cufra; Solar Moinho de Vento; O Buraco; Mercado do Bolhão; Casa Guedes; Conga; Mercado Beira-Rio; Majestic Café; Confeitaria do Bolhão; Leitaria da Quinta do Paço

Already in the app — things to do: Santo Inácio Zoo / Zoo Santo Inácio; Serralves Park and Museum / Fundação de Serralves; Gaia Cable Car / Teleférico de Gaia; Bolhão Market / Mercado do Bolhão; SEA LIFE Porto / SEA LIFE Porto; WOW Cultural District / WOW – World of Wine; Crystal Palace Gardens / Jardins do Palácio de Cristal; Tram Museum / Museu do Carro Eléctrico; City Park / Parque da Cidade do Porto; Porto Planetarium / Planetário do Porto; Six Bridges Douro Cruise / Cruzeiro das Seis Pontes; Casa da Música / Casa da Música; Livraria Lello / Livraria Lello; Water Pavilion (Pavilhão da Água); Porto Botanical Garden
