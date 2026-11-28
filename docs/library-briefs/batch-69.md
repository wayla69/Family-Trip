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

### ie-ireland — Dublin and the west coast (Ireland)
Area covered: Dublin and the west coast (also known as / includes: dublin, galway, cliffs of moher, ring of kerry, killarney, connemara)

Now in the app: 23 places to eat, 27 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: The Woollen Mills; Gallagher's Boxty House; Elephant & Castle; McDonagh's; Ard Bia at Nimmos; The Dough Bros; Gus O'Connor's Pub; Bricín; Quinlan's Seafood Bar; Leo Burdock; Galway Market; Bewley's Grafton Street; Murphy's Ice Cream; The Bad Ass Cafe; Carluccio's; Wagamama Dundrum; Brother Hubbard (North); The Fumbally; Overends Kitchen; Blackrock Cottage; Freddy's; Aniar; Saba

Already in the app — things to do: Dublin Zoo; Cliffs of Moher Visitor Experience; National Leprechaun Museum; Dublinia; Phoenix Park; Phoenix Park Visitor Centre and Ashtown Castle; National Botanic Gardens, Glasnevin; Malahide Castle and Gardens; Howth village and harbour; National Aquarium of Ireland (Galway Atlantaquaria); Galway Christmas Market; Aillwee Cave and Burren Birds of Prey Centre; Bunratty Castle and Folk Park; Connemara National Park; Connemara Pony Heritage Centre; Moher Hill Open Farm; Doolin Cave; Caherconnell Fort; Dromore Wood nature reserve; Shannon Aviation Museum; Lahinch beach; National Museum of Ireland – Archaeology; National Gallery of Ireland; National Wax Museum Plus; The Little Museum of Dublin; AquaZone; EPIC The Irish Emigration Museum

### tr-istanbul — Istanbul (Türkiye)
Area covered: Istanbul (also known as / includes: istanbul, sultanahmet, bosphorus, galata, taksim, kadikoy)

Now in the app: 20 places to eat, 30 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Hamdi Restaurant; Tarihi Sultanahmet Köftecisi Selim Usta; Çiya Sofrası; Karaköy Lokantası; Kanaat Lokantası; Şehzade Cağ Kebap; Develi Samatya; Hünkar; Dürümzade; Namlı Gurme; Kızılkayalar; Hafız Mustafa 1864; Karaköy Güllüoğlu; Vefa Bozacısı; Zubeyir Ocakbasi; Kayseri Manti Evi; Manti Evi; Van Kahvalti Evi; Baylan Pastanesi; Happy Moon's (Vadi İstanbul)

Already in the app — things to do: Miniatürk; Rahmi M. Koç Museum / Rahmi M. Koç Müzesi; Istanbul Aquarium / İstanbul Akvaryum; Basilica Cistern / Yerebatan Sarnıcı; Topkapı Palace / Topkapı Sarayı; Istanbul Archaeology Museums / İstanbul Arkeoloji Müzeleri; Gülhane Park / Gülhane Parkı; Bosphorus cruise / Boğaz Turu; Spice Bazaar (Egyptian Bazaar) / Mısır Çarşısı; Istanbul Toy Museum / İstanbul Oyuncak Müzesi; Emirgan Park / Emirgan Korusu; Galata Tower / Galata Kulesi; Princes' Islands (Büyükada) / Büyükada; Panorama 1453 History Museum / Panorama 1453 Tarih Müzesi; Istanbul Naval Museum / Deniz Müzesi; Museum of Illusions – Istanbul; Dolmabahçe Palace; Blue Mosque; Süleymaniye Mosque; Eyüp Sultan Mosque; Eyüp–Pierre Loti Cable Car; Golden Horn Ferry; Galata Bridge; Müze Gazhane Children’s Science Center; Bilim Üsküdar; Nickelodeon Play Tersane Istanbul; Natural Science Museum; Kemerburgaz Urban Forest; Isfanbul (Vialand); Nostalgic Tram (İstiklal Avenue)

### cl-santiago — Santiago and Valparaíso (Chile)
Area covered: Santiago and Valparaíso (also known as / includes: santiago de chile, santiago, valparaiso, vina del mar, cajon del maipo, pomaire)

Now in the app: 24 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Donde Augusto; Galindo; Divertimento Chileno; Tiramisú; Las Vacas Gordas; Confitería Torres; Café Turri; Casino Social J. Cruz; Tierra de Fuego; La Vega Central; Dominó; Patio Bellavista; Emporio La Rosa; Café del Poeta; Gino Lautaro; La Argentina (Barrio Italia); Neko-San; DeCalle; Parigó; Dipsy’s Backyard; El Portal Exbahamondes; Café Estación; Oiso; Casa Regina

Already in the app — things to do: Zoológico Nacional (Metropolitan Park) / Zoológico Nacional; Museo Interactivo Mirador (MIM); Buin Zoo; Sky Costanera viewpoint; Teleférico and funicular, San Cristóbal hill / Teleférico y Funicular Santiago; National Museum of Natural History / Museo Nacional de Historia Natural; Santiago Railway Museum / Museo Ferroviario; Artequin art museum for children / Museo Artequin; Chilean Museum of Pre-Columbian Art / Museo Chileno de Arte Precolombino; Cerro Santa Lucía; Wonder Park Maipú; Quinta Normal park pool / Piscina del Parque Quinta Normal; Mercado Central; Parque Quinta Vergara; La Sebastiana (Neruda's house) / Museo La Sebastiana; Fantasilandia; Parque Araucano; Parque Bicentenario, Vitacura; KidZania Santiago; Biblioteca de Santiago; Ascensor Concepción; Ascensor Artillería; Paseo 21 de Mayo; National Maritime Museum / Museo Marítimo Nacional; Mercado Puerto

### is-reykjavik — Reykjavík and the Golden Circle (Iceland)
Area covered: Reykjavík and the Golden Circle (also known as / includes: reykjavik, golden circle, geysir, gullfoss, blue lagoon, thingvellir)

Now in the app: 24 places to eat, 25 things to do. Round 3 aims at 40 places to eat and 35 things to do.

Already in the app — places to eat: Sægreifinn; Icelandic Street Food; Messinn; Café Loki; Tommi's Burger Joint; Þrír Frakkar; Reykjavik Fish Restaurant; Friðheimar; Efstidalur II; Bæjarins Beztu Pylsur; Hlemmur Mathöll; Gullfoss Kaffi; Brauð & Co; Sandholt; Valdís; Mokka Kaffi; Kaffi Laugalækur; The Laundromat Café; Kattakaffihúsið (The Cat Café); Grandi Mathöll; Flóran (Kaffi Flóra); Iðnó; 101 Reykjavik Street Food; Arna Ís og Kaffi

Already in the app — things to do: Perlan: Wonders of Iceland / Perlan; Reykjavík Family Park and Zoo / Fjölskyldu- og húsdýragarðurinn; Whales of Iceland / Hvalasýning; Laugardalslaug swimming pool / Laugardalslaug; Nauthólsvík geothermal beach / Ylströndin í Nauthólsvík; Árbær Open Air Museum / Árbæjarsafn; National Museum of Iceland / Þjóðminjasafn Íslands; The Settlement Exhibition (Reykjavík 871±2) / Landnámssýningin; Reykjavík Art Museum / Listasafn Reykjavíkur; FlyOver Iceland; Þingvellir National Park / Þingvellir; Geysir and Strokkur geothermal area / Geysir, Strokkur; Gullfoss waterfall / Gullfoss; Friðheimar tomato farm / Friðheimar; Blue Lagoon / Bláa Lónið; Hljóðhimnar at Harpa / Hljóðhimnar; Reykjavík Botanic Garden / Grasagarður Reykjavíkur; Viðey Island / Viðey; Volcano Express; Tjörnin pond / Tjörnin; Hljómskálagarður park / Hljómskálagarður; Öskjuhlíð hill / Öskjuhlíð; Árbæjarlaug pool / Árbæjarlaug; Secret Lagoon / Gamla Laugin; Fontana baths / Laugarvatn Fontana
