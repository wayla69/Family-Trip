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

### de-cologne — Cologne and the Rhine valley (Germany)
Area covered: Cologne and the Rhine valley (also known as / includes: cologne, koln, rhine valley, loreley)

Already in the app — places to eat: Früh am Dom; Peters Brauhaus; Gaffel am Dom; Brauhaus Päffgen; Brauerei zur Malzmühle; Haxenhaus zum Rheingarten; Rüdesheimer Schloss; Altes Haus; Altes Brauhaus Koblenz; Weindorf Koblenz; Rievkoochebud; Habibi; Café Reichard; Café Eigel; Chocolat Grand Café am Schokoladenmuseum

Already in the app — things to do: Cologne Zoo; Chocolate Museum; Cologne cable car; Phantasialand; Heinzel's Winter Fairy Tale Christmas market; Flora and the Botanical Garden; Rautenstrauch-Joest Museum and SPACE4KIDS; German Sport and Olympic Museum; KD Rhine panorama cruise; Fragrance Museum in the Farina House; Rheinpark and its playground; Hänneschen puppet theatre; Lindenthal Animal Park; Brück deer enclosure; Cologne City Museum; Cologne Cathedral and its south tower / Kölner Dom

### de-hamburg — Hamburg (Germany)
Area covered: Hamburg (also known as / includes: hamburg, speicherstadt, elbphilharmonie, hafencity)

Already in the app — places to eat: Fischereihafen Restaurant; Old Commercial Room; Fischerhaus; Gröninger Privatbrauerei; Bullerei; Schönes Leben Speicherstadt; Oberhafen-Kantine; Alt Hamburger Aalspeicher; Brücke 10; Rindermarkthalle St. Pauli; Jim Block Jungfernstieg; Speicherstadt Kaffeerösterei; Luicella's Ice Cream; Mutterland Stammhaus

Already in the app — things to do: Miniatur Wunderland; Tierpark Hagenbeck; Planten un Blomen; Elbphilharmonie Plaza; International Maritime Museum; Harbour boat tour (Barkassen); Fish market (Fischmarkt); Planetarium Hamburg; Museum der Arbeit; Rickmer Rickmers museum ship; Elbe beach and Övelgönne museum harbour; Speicherstadt and HafenCity walk; Alster boat trip; Hamburger Kunsthalle; Altonaer Museum

### de-heidelberg — Heidelberg and the Black Forest (Germany)
Area covered: Heidelberg and the Black Forest (also known as / includes: heidelberg, black forest, schwarzwald, titisee)

Already in the app — places to eat: Vetter's Alt Heidelberger Brauhaus; Kulturbrauerei Heidelberg; Zum Güldenen Schaf; Zum Roten Ochsen; Hausbrauerei Feierling; Zum Roten Bären; Ganter Brauereiausschank; Löwenbräu Baden-Baden; Hofgut Sternen; Brauereigasthof Rothaus; Markthalle Freiburg; Münstermarkt Freiburg; Café Knösel; Café Gundel; Café König

Already in the app — things to do: Heidelberg Castle / Schloss Heidelberg; Heidelberg Zoo / Zoo Heidelberg; Old Bridge and the Bridge Monkey / Alte Brücke, Brückenaffe; Märchenparadies Königstuhl / Märchenparadies Königstuhl; Kurpfalz Museum / Kurpfälzisches Museum; Luisenpark Mannheim / Luisenpark Mannheim; Technoseum Mannheim / TECHNOSEUM; Technik Museum Sinsheim / Auto & Technik Museum Sinsheim; Technik Museum Speyer / Technik Museum Speyer; Europa-Park Winter Season / Europa-Park Rust; Black Forest Open-Air Museum Vogtsbauernhof / Schwarzwälder Freilichtmuseum Vogtsbauernhof; Triberg Waterfalls / Triberger Wasserfälle; Black Forest Treetop Walk / Baumwipfelpfad Schwarzwald; Titisee Lake Cruise / Titisee Seerundfahrt; Mummelsee / Mummelsee; Caracalla Spa Baden-Baden / Caracalla Therme

### de-munich — Munich (Germany)
Area covered: Munich (also known as / includes: munich, muenchen, marienplatz, english garden)

Already in the app — places to eat: Hofbräuhaus München; Augustiner-Keller; Augustiner Stammhaus; Ratskeller München; Königlicher Hirschgarten; Wirtshaus in der Au; Schneider Bräuhaus; Nürnberger Bratwurst Glöckl am Dom; Viktualienmarkt; Biergarten am Chinesischen Turm; Eataly München; Café Frischhut; Rischart Café am Marienplatz; Café Luitpold; Ballabeni Icecream

Already in the app — things to do: Hellabrunn Zoo / Tierpark Hellabrunn; Deutsches Museum and its Kinderreich; Deutsches Museum Verkehrszentrum; SEA LIFE Munich; Munich Marionette Theatre / Münchner Marionettentheater; Olympiapark; Englischer Garten and the children's carousel; Kleinhesseloher See boats; Viktualienmarkt; Glockenspiel at Marienplatz; Munich Christkindlmarkt at Marienplatz; Nymphenburg Palace park; BMW Welt; Bavaria Filmstadt; Therme Erding; LEGOLAND Deutschland
