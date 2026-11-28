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

### ae-dubai — Dubai (United Arab Emirates)
Area covered: Dubai (also known as / includes: dubai, deira, jumeirah, palm jumeirah, dubai marina, hatta)

Already in the app — places to eat: Al Ustad Special Kabab / الأستاذ سبيشل كباب; Arabian Tea House; Bu Qtair / بو قطير; Al Mallah / الملاح; Ravi Restaurant; Al Fanar Restaurant & Café / الفنار; Operation: Falafel; Aroos Damascus / عروس دمشق; Al Safadi / الصفدي; Al Hallab / الحلاب; Time Out Market Dubai; The Dubai Mall Food Court; SALT; Bateel Café; Filli Café; Home Bakery; Reform Social & Grill; Ribambelle; Wavehouse; Luigia; Konjiki Hototogisu; Eataly Dubai Mall; The Cheesecake Factory; 3Fils; Bait Maryam; Wagamama Dubai Mall; Shake Shack Dubai Mall; The Bhukkad Café; La Serre Boulangerie; Crunch Dubai; Twiggy Family; Hyperama; Pepe Cucina; The Garden Project; Eggspectation; Al Baba Sweets; Al Samadi Sweets; Qwaider Al Nabulsi; Neighbourhood Food Hall; Depachika; The Market Island; Culinara Social Dining; Wok In; Baker & Spice; The Sum of Us; Ripe Market

Already in the app — things to do: Dubai Aquarium & Underwater Zoo / دبي أكواريوم وحديقة الحيوانات المائية; Dubai Safari Park / دبي سفاري بارك; KidZania Dubai; LEGOLAND Dubai; The Green Planet; Dubai Frame / برواز دبي; Dubai Miracle Garden; Dubai Butterfly Garden; The Dubai Fountain; At the Top, Burj Khalifa / برج خليفة; Ski Dubai Snow Park; Museum of the Future / متحف المستقبل; Kite Beach; Zabeel Park / حديقة زعبيل; Al Fahidi Historical Neighbourhood / حي الفهيدي التاريخي; Abra across Dubai Creek / عبرة; Gold Souk and Spice Souk / سوق الذهب; Lost World Aquarium, Atlantis; Aquaventure World, Atlantis; Wild Wadi Waterpark; LEGOLAND Water Park; MOTIONGATE Dubai; Real Madrid World; Dubai Garden Glow; Aventura Parks, Mushrif; Mushrif National Park; Boo Boo Laand; House of Hype; ARTE MUSEUM Dubai; SuperPark Dubai; Global Village; OliOli Children's Play Museum; Ain Dubai; IMG Worlds of Adventure; Air Maniax; Bounce at X-Park; BOUNCE-X; Hello Park; Glitch Arabia; Loco Bear; Ready Set Go; Dubai Ice Rink; Al Mamzar Beach Park; Creek Park; Safa Park; Al Barsha Pond Park; Dubai Hills Park; Town Square Park; JLT Park; Al Ittihad Park; Quranic Park; Children's City

### us-newyork — New York (The United States)
Area covered: New York (also known as / includes: new york, manhattan, brooklyn, times square, central park, statue of liberty)

Already in the app — places to eat: Katz's Delicatessen; Joe's Shanghai; John's of Bleecker Street; Carmine's Times Square; Ellen's Stardust Diner; Junior's Restaurant; Grimaldi's Pizzeria; Nom Wah Tea Parlor; Shake Shack Madison Square Park; Chelsea Market; Time Out Market New York; Joe's Pizza; Levain Bakery; Magnolia Bakery; Serendipity 3; Fini Pizza at Pier 5; Brado; Dellarocco’s; Roberta’s at Domino Park; Juliana’s; Di Fara Pizza; Saraghina Restaurant; Peter Pan Donut and Pastry Shop; Brooklyn Crab; Bubby’s; Tom's Restaurant; Barking Dog

Already in the app — things to do: Central Park Zoo; Bronx Zoo; American Museum of Natural History; Children's Museum of Manhattan; New York Aquarium; Statue of Liberty and Ellis Island; Staten Island Ferry; Intrepid Museum; Top of the Rock; New York Hall of Science; New York Transit Museum; Brooklyn Bridge Park and Jane's Carousel; Winter Village at Bryant Park; Chelsea Market; The High Line; Central Park and Heckscher Playground; Brooklyn Children's Museum; Queens Zoo; Prospect Park Zoo; The Staten Island Zoo; Hammock Grove Play Area; NYC Ferry

### us-california — California (The United States)
Area covered: California (also known as / includes: california, los angeles, san francisco, santa monica, san diego, yosemite)

Already in the app — places to eat: Boudin Bakery Cafe; Tony's Pizza Napoletana; R&G Lounge; Philippe The Original; Canter's Deli; El Cholo; Bubba Gump Shrimp Co.; Hodad's; Old Town Mexican Cafe; Ferry Building Marketplace; Grand Central Market; The Original Farmers Market; Ghirardelli Chocolate Experience; Tartine Bakery; Randy's Donuts; Porto's Bakery & Cafe; Gott's Roadside; Lovely's; Pacific Catch; Mamahuhu; The Cove on Castro; Little Original Joe's; La Palma Mexicatessen; Devil's Teeth Baking Company; The Little Chihuahua; United Dumplings; On the Bridge; Fiorella; Original Joe's; The Crack Shack; Smokey & The Brisket; Refreshment Corner; Boardwalk Pizza and Pasta; Smorgasburg LA; Corporation Food Hall; Blossom Market

Already in the app — things to do: Disneyland Park; Disney California Adventure; Universal Studios Hollywood; San Diego Zoo; LEGOLAND California; SeaWorld San Diego; California Science Center; Natural History Museum of Los Angeles County; Griffith Observatory; Aquarium of the Pacific; Los Angeles Zoo; Santa Monica Pier; The Original Farmers Market; Balboa Park; USS Midway Museum; Knott's Berry Farm; California Academy of Sciences; Getty Center

### p-orlando — Orlando (The United States)
Area covered: Orlando (also known as / includes: orlando, kissimmee, kennedy space center, cape canaveral, theme parks)

Already in the app — places to eat: Rainforest Cafe; T-REX Cafe; Chef Mickey's; Chef Art Smith's Homecomin'; The Toothsome Chocolate Emporium; Bubba Gump Shrimp Co.; Cafe Tu Tu Tango; Hash House A Go Go; Columbia Restaurant; Earl of Sandwich; The Polite Pig; Three Broomsticks; Gideon's Bakehouse; Voodoo Doughnut; ʻOhana; Sanaa; Hot Dog Hall of Fame; Antojitos Authentic Mexican Food; Sugar Factory; Shake Shack; Ford's Garage; The Cheesecake Factory; Erin McKenna's Bakery NYC; Ghirardelli Soda Fountain & Chocolate Shop

Already in the app — things to do: Magic Kingdom; EPCOT; Disney's Animal Kingdom; Disney's Hollywood Studios; Universal Studios Florida; Universal's Islands of Adventure; Universal Epic Universe; LEGOLAND Florida; SeaWorld Orlando; Aquatica Orlando; Kennedy Space Center Visitor Complex; Gatorland; Orlando Science Center; Crayola Experience Orlando; SEA LIFE Orlando Aquarium; Wild Florida Gator Park and airboats; Disney Springs; Lake Eola Park; Orlando Farmers Market at Lake Eola; WonderWorks Orlando; Dezerland Park; Madame Tussauds Orlando; Central Florida Zoo & Botanical Gardens
