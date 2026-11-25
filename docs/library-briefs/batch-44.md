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

### gb-london — London (United Kingdom)
Area covered: London (also known as / includes: london, westminster, thames, covent garden, camden, greenwich)

Already in the app — places to eat: Dishoom Covent Garden; Four Seasons; Gold Mine; Poppies Fish & Chips; The Golden Hind; Wahaca Covent Garden; Mother Mash; Hard Rock Cafe London; Royal China Baker Street; Wagamama Royal Festival Hall; Borough Market; Seven Dials Market; Harrods Food Halls; The Parlour at Fortnum & Mason; Bread Ahead; Peggy Porschen; Giraffe; Din Tai Fung; Dumpling's Legend; Cafe Murano; Heddon Street Kitchen; Roka Aldwych; Inko Nito; Kintan Oxford Circus; Darcie & May Green; Mercato Metropolitano; Arcade Food Hall Tottenham Court Road; Canteen Food Hall & Bar; Boxhall City; Science Museum cafe; Macaroni Penguin; Comptoir Libanais; Inamo Covent Garden; Koya Ko; Sarastro; The Top Hat; RedFarm; Maison Francois; Pizza East; Homeslice; Masala Zone; Gourmet Pizza Company; Homies on Donkeys; Bread Street Café; Toconoco Japanese Cafe; Brixton Village; Maltby Street Market; Camden Market; Brick Lane Market; Tao Tao Ju; Joy King Lau; Yauatcha City

Already in the app — things to do: Natural History Museum; Science Museum; ZSL London Zoo; Diana Memorial Playground; London Transport Museum; Young V&A; SEA LIFE London Aquarium; Tower of London; Horniman Museum and Gardens; Borough Market; Mudchute Park and Farm; Kew Gardens; London Eye; Changing the Guard; Coram's Fields; Battersea Park Children's Zoo; Hamleys; Hackney City Farm; Vauxhall City Farm; Spitalfields City Farm; Tate Modern; National Maritime Museum; Polka Theatre; Unicorn Theatre; Museum of the Home; Thames Clippers; Camden Market; British Museum; Museum of London Docklands; National Gallery; Imperial War Museum London; Hampstead Heath; Greenwich Park; Richmond Park; Battersea Park; Tumbling Bay Playground; Kentish Town City Farm; Sky Garden; Hyde Park and Kensington Gardens; Victoria Park (East London); Columbia Road Flower Market; Southbank Centre free events

### fr-paris — Paris (France)
Area covered: Paris (also known as / includes: paris, montmartre, louvre, eiffel, champs, seine)

Already in the app — places to eat: Bouillon Chartier Grands Boulevards; Bouillon Pigalle; Le Relais de l'Entrecôte; Breizh Café; Crêperie de Josselin; La Coupole; Bofinger; Au Pied de Cochon; Marché des Enfants Rouges; L'As du Fallafel; La Grande Épicerie de Paris; Galeries Lafayette Le Gourmet; Angelina; Berthillon; Ladurée Champs-Élysées; Carette; Ernestine Café; Petite Forêt; Wrap'n Roll Sushi; Galette; La Québécoise; Jardin Folia; La Mijoterie; Shwi; Chiv's Koy; Moncœur Belleville; Cơm Niêu Quán; Nonno Matteo; Horiz; Katsu Katsu; Osteria degli Amici; Zinqué; Tycoz; Laïa Monceau; As in Vietnam; La Table de Martine; Libertino; Entre 2 Siestes; Matignon; Suelo; Frame Brasserie; Maison Revka; Sacré Frenchy; Pub Saint-Germain; Chalet des Iles

Already in the app — things to do: Jardin d'Acclimatation; Cité des enfants 2–6 / Cité des enfants 2-6 ans; Ménagerie du Jardin des Plantes; Grande Galerie de l'Évolution; Paris Zoological Park / Parc zoologique de Paris; Aquarium de Paris; Eiffel Tower / Tour Eiffel; Jardin du Luxembourg and its puppet theatre / Jardin du Luxembourg; Parc de la Villette and the Dragon Garden / Parc de la Villette · Jardin du Dragon; Bateaux-Mouches Seine cruise / Bateaux-Mouches; Marché d'Aligre / Marché d'Aligre · Marché Beauvau; Musée des Arts et Métiers; Jardin des Tuileries; Arc de Triomphe; Sacré-Cœur and the Montmartre funicular / Basilique du Sacré-Cœur · Funiculaire de Montmartre; Musée Grévin; Musée en Herbe; Parc André-Citroën; Marcel Bleustein Blanchet park; Évasion Verte; The Sparks at the Palais de la Découverte; Musée de Poche; Philharmonie des enfants; Musée de l'Homme; Saint-Lambert Square; Les Jardins d’Éole; Square Sainte-Odile; René-Binet garden; Villemin garden; Square Marcel Sembat; Georges Brassens Park; Belleville Park; Parc de Choisy; Promenade Jane et Paulette Nardal

### au-sydney — Sydney and the Blue Mountains (Australia)
Area covered: Sydney and the Blue Mountains (also known as / includes: sydney, bondi, blue mountains, katoomba)

Already in the app — places to eat: Chat Thai Haymarket; Mamak Haymarket; Doyles on the Beach; Pancakes on the Rocks; Bills Bondi; The Grounds of Alexandria; The Boathouse Shelly Beach; Aunty Ed's Restaurant and Bar; Sydney Fish Market; Harry's Cafe de Wheels; Spice Alley; Mountain High Pies; Gelato Messina Darlinghurst; Bourke Street Bakery; Bygone Beautys Treasured Teapot Museum & Tearooms; Blue Mountains Chocolate Company; Three Blue Ducks Rosebery; Fratelli Fresh Darling Harbour; Centennial Homestead; The Henson; Harbord Diggers; The Greens North Sydney; 2773 Glenbrook; The Vineyard; Shuk North Bondi; Cow and the Moon; Black Cockatoo Bakery; Local Hive Cafe; Coogee Pavilion; Cook at Kurnell; Promenade Bondi; Luna Lu; Sandy's; Hai Au Lang Nuong; Everyday Creamery; Casa do Benfica; Polish Club; Camperdown Commons; Outfield; Sushi Wow; Splash; Sit; Angus Marrickville; White Rabbit Marrickville; Two Chaps; Superfreak; Hearthe Bakeries; Lunas Portuguese; The Wedge; One Another; Happyfield; Single O Surry Hills; Paramount Coffee Project; Humble Bakery; Reuben Hills; Parami; Brickfields; Bathers' Pavilion; The Boathouse; Chiosco by Ormeggio; St Siandra; Celsius Coffee & Dining Co.; Kurtosh; Frenchy’s Cafe; Oliver Brown Belgian Chocolate Cafe

Already in the app — things to do: Taronga Zoo; SEA LIFE Sydney Aquarium; Luna Park Sydney; Australian Museum; Featherdale Sydney Wildlife Park; Ian Potter Children's Wild Play Garden; Darling Quarter Kids Playground; Australian National Maritime Museum; Sydney Tower Eye; The Rocks Markets; Sydney Fish Market; Sydney Opera House Tour; Manly Ferry and Manly Beach; Paddy's Markets Haymarket; Royal Botanic Garden Sydney; Bondi Beach; WILD LIFE Sydney Zoo; Madame Tussauds Sydney; Chinese Garden of Friendship; Sydney Harbour Bridge Museum; Art Gallery of New South Wales; Symbio Wildlife Park; Sydney Zoo; Scenic World Blue Mountains; Calmsley Hill City Farm; Pirrama Park Playground; Gunyama Park Playground; Waverley Park Playground; Clifton Gardens Playground; Wadanggari Park; Sydney Park Playground; Livvi's Place, Timbrell Park; Burwood Park Inclusive Play Space; Memory Park; Fagan Park; Flying Fox Park at Winnererremy Bay Park; Robertson Park Playground; Shelly Beach; Camp Cove; Shark Beach (Nielsen Park); Little Manly Beach; Gunnamatta Bay Tidal Baths, Cronulla; Fairy Bower; Northbridge Baths; Andrew (Boy) Charlton Pool; Putney Beach; Balmoral Beach; Cockatoo Island; Wendy Whiteley's Secret Garden; The Goods Line; Glebe Foreshore Walk; Barangaroo Reserve; Museum of Fire; Powerhouse Parramatta; IMAX; Hyde Park Barracks; Sydney Olympic Park; Bradleys Head; Royal National Park; Wattamolla

### au-melbourne — Melbourne and the Great Ocean Road (Australia)
Area covered: Melbourne and the Great Ocean Road (also known as / includes: melbourne, great ocean road, phillip island, dandenong)

Already in the app — places to eat: Stalactites; HuTong Dumpling Bar / 胡同; Pellegrini's Espresso Bar; Tiamo; D.O.C Pizza & Mozzarella Bar; ShanDong MaMa / 山东妈妈; The Hardware Société; 12 Rocks Beach Bar Cafe; The Bottle of Milk; Queen Victoria Market; South Melbourne Market; Apollo Bay Fishermen's Co-op; Brunetti Classico; Lune Croissanterie; Great Ocean Road Chocolaterie & Ice Creamery; La Camera Southgate; Hophaus Bier Bar Grill; Hopscotch; Good Nature; The Vincent; New Shanghai (Emporium); Superhiro; il Mercato Centrale; Emporium Cafe Court; Operator Diner; Henry and the Fox; The Farm Cafe; Ichi Ni Nana Izakaya; Pingo Kids Club Cafe; Dohtonbori Docklands; Seoul Garden BBQ; Saluministi; Renzo's Bar Cafe Italiano; Limonetto Gelati; Miss Pings; Yassas; Riverside Deli and Coffee House; Momami; Platform 28; Baci Restaurant; Waterfront Southgate; Kitchen Workshop, Crown Melbourne; Teatro Southbank; Red Emperor Chinese Restaurant; Melba Restaurant, The Langham Hotel Melbourne; Hanoia; Heebi; Tone Coffee; Pinned Coffee; Milkbar; Kombu; Austro Bakery; Le Yeahllow; Union Kiosk; Bakemono Bakers; Maker; Ten Square Cafe; Tom Thumb; Chapter House Coffee; Jungle Juice; Tori's; Overlay; Traveller

Already in the app — things to do: Melbourne Zoo; Melbourne Museum; SEA LIFE Melbourne Aquarium; Scienceworks; Ian Potter Foundation Children's Garden; Queen Victoria Market; Luna Park Melbourne; Melbourne Skydeck; Puffing Billy Railway; ACMI; South Melbourne Market; NGV International; St Kilda Pier penguins; Nature Play at Royal Park; Collingwood Children's Farm; Werribee Open Range Zoo; Phillip Island Penguin Parade; Koala Conservation Reserve, Phillip Island; Churchill Island Heritage Farm; Prahran Market; MoPA: Museum of Play and Art; LEGOLAND® Discovery Centre Melbourne; Chipmunks Docklands; Dreamskape Docklands; Little Builders; ArtVo Melbourne; Victoria Green Playground; Buluk Park playground; Ron Barassi Snr Park; Wharfs Landing Playground; Harmony Garden / Point Park; Jumpside; Bounce (formerly Latitude); Imaginationation at Chadstone; Landing Play Centre
