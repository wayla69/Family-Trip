# Brief: grow the library of places to eat (D) and things to do (E) — LifeBook, a travel app for Thai families with children aged 1–8

Repository /home/user/Family-Trip is READ-ONLY for you. Write only your one output file.

## The one rule
Every row comes from a web page you opened yourself in this task, dated 2025 or 2026 (or a live official page). Nothing from memory.
A row whose facts you did not read on a page is left out. Fewer honest rows beat a full list. Your output is checked by a script that
opens every `src` and looks for the `name` and the `quote` on it — a row that fails is thrown away, so copy names and quotes exactly.

## How to work
1. Read the town's rows that already exist (the file named in your task; find the town by its "place" id) — never repeat one under any name.
2. Use WebSearch at most **5 times** in total (the search allowance is shared with other agents). Search for lists that name many
   places at once, from 2025–2026: e.g. `family friendly restaurants Bangkok 2026`, `kid friendly cafes Bangkok play area 2025`,
   `ร้านอาหาร เด็ก บางกอก 2569`, `Bangkok with kids indoor 2026`, an official tourism site's list.
3. Open each useful page with the Bash tool (WebFetch does not work here):
   `curl -sL --max-time 25 -A 'Mozilla/5.0' '<url>' | sed -e 's/<[^>]*>/ /g' | tr -s ' \n' | head -c 20000`
   and look for the page's date (`grep -oE 'datePublished[^,]{0,40}|dateModified[^,]{0,40}'` on the raw HTML).
   Skip a page dated before 2025 or with no date unless it is the place's own official site.
4. Take places from what the page says. Every field must be supported by that page's text:
   - `why` = only what the page says about children (high chair, kids' menu, play corner, pram, mild food, a show, a farm…) — else a plain
     true reason the page gives ("open all day", "a food hall next to the aquarium").
   - `price` = only an amount printed on the page (with ≈), else exactly "Check the price".
   - `quote` = one short sentence or phrase COPIED WORD FOR WORD from the page that names the place (≤ 200 letters).
5. Leave out: closed / under renovation / "temporarily closed", adults-only, bars and nightlife, casinos, riding animals (elephant,
   horse, camel, pony), places that ask visitors to keep away. Temples that welcome visitors are fine (say the dress code in `tip`).

## Output — ONE JSON array to the path given in your task (validate it with `node -e "JSON.parse(require('fs').readFileSync(f))"`)
Places to eat (D):
{"place": "<place id>", "name": "<name exactly as the page writes it>", "local": "<local-script name only if the page shows it, else ''>",
 "kind": "restaurant|quick|cafe", "area": "<district / mall / street the page gives>", "tag": "<cuisine or signature dish, 2–4 words>",
 "what": "<one sentence>", "why": "<one sentence>", "price": "<as printed, or 'Check the price'>",
 "kids": "<high chair / kids menu / play corner / pram space / mild — only what the page says, else ''>",
 "map": "<name, area, town>", "src": "<the https page>", "date": "<the page's date YYYY-MM, or 'official'>", "quote": "<copied from the page>"}
Things to do (E):
{"place": "<place id>", "name": "<English name exactly as the page writes it>", "local": "", "kind": "themepark|zoo|aquarium|museumkid|museum|park|play|beach|nature|views|culture|oldtown|market|show|farm|onsen|ride|shop",
 "area": "...", "what": "...", "why": "<what children enjoy there>", "tip": "<closing day, dress code, best time — only from a page>",
 "ages": [0-2, 3-5, 6-9, 10+] each 0|1|2, "hrs": <number>, "io": "in|out|both", "pram": "yes|part|no",
 "price": "<as printed, or 'Check the price'>", "book": "none|rec|req", "map": "...", "src": "...", "date": "...", "quote": "..."}

Finish with a short report: searches used, pages opened, rows written.

---

## For the session that runs the agents (not part of an agent's brief)

Owner, 21 Nov 2026: "ถ้า D และ E เราทำเองได้ไหม ใช้ agent haiku ทำ" — the library grows with our own small agents, not with
an outside research tool's unchecked lists. The pilot (Bangkok, 21 Nov 2026) is the pattern:

1. One agent a town and a kind (sit-down restaurants · quick bites and cafés · places for children and rainy days · landmarks,
   nature, markets), `model: haiku`, this brief + the town's file + an output path under the scratchpad. Four at a time; the web
   search allowance (about 200 a turn) is shared by every agent, so each gets five searches.
2. `node scripts/library-check.cjs <the agents' files>` (`OUT=` a report): a row passes only when its page opens, carries its
   name and the copied sentence, is dated 2025–2026 (or the row says `official`), shows any price it gives, and the library
   does not already hold it. File names with `.E.` (or starting `sights`) are things to do; the rest places to eat.
3. Then read every passing row yourself, because a fresh page is not proof a place is open: the pilot's KidZania came from a
   2025 blog, closed since April 2021; Pororo AquaPark had closed for renovation in January 2026. Search a place's status when
   two agents disagree, when a page only lists it, or when it is a big name that could have shut. Drop a row whose page gives
   no district (it cannot go on a map), a mall as a "sight", and two rows of one place under different names.
4. Write the library rows yourself (Thai too — never the agent's), through the scratchpad's `sights-add/` / `eats-add/` and the
   merge, then `npm run sights:lint`, `eats:lint`, the infra tests, a note in docs/SIGHTS.md or docs/EATS.md, a PR.

What the pilot measured: 79 rows offered, 41 passed the script, 30 went in. Things to do did well (city family sites with a page
per venue, dated, with prices — bkkfamilies.com); places to eat did poorly (family food guides block scripts or carry no date;
a mall's own "kids friendly" page worked). An undated ranking site that reads machine-made (restaurantsforkings.com) is refused.
