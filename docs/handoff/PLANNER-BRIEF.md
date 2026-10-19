# Planner brief — what a trip plan must contain so it becomes a full Memory Bookshelf book

For the **planning session** (claude.ai, skill `family-trip-kit`). Paste this section into that skill, or link it:
`https://github.com/wayla69/Family-Trip/blob/main/docs/handoff/PLANNER-BRIEF.md`.
It is the bar set by the two finished books — *The Harbour Hop* (HK–Macau, 6 days) and *The Big Hop* (Australia, 16 days).
The bookshelf side (`docs/PLAN-TO-BOOK.md`) turns the result into a book; this file says what the plan has to carry for that.

## 0. Hand-off (end of every planning session)
1. The Trip Operations Manual PDF (TH and EN) as usual — the source of truth.
2. **Plus `plan.json`** following `docs/handoff/plan.schema.json` (example `plan.sample.json`), embedded in the trip-app Artifact as
   `<script type="application/json" id="plan">…</script>` or sent as a file. Every text field bilingual `{ "th": "…", "en": "…" }`.
3. Never in `plan.json`: booking refs/PNR, confirmation or e-ticket numbers, passport numbers, formal names, full birthdates
   (year-month only), costs we paid, THB amounts, e-mails, personal phones. Prices of entry/food in **local currency** are fine.
   The converter refuses the file if it finds them; the manual PDF itself may keep them.

## 1. The manual's parts the book reads (keep these headings)
| Part | Book page it fills | Must include |
|---|---|---|
| Key facts / What shapes this trip | 📚 Learn → "What shapes this trip" (`info.guide`) | 8–13 cards: title, one-line sub, 1–3 sentences (clocks, currency, holidays, weather, kids' ages, the shape of the trip, open questions) |
| Day by day (one page per day) | 🗓️ Today · 🧭 Plan · reminders | see §2 — the heart of the book |
| Legs chart | Plan → legs | every leg `from → to`, time, mode, a Google Maps directions link |
| Where we sleep | 🛏️ Stays · "Tonight" card | per base: property, check-in/out days, nights, address, why we chose it, kitchen/laundry, cot |
| Getting around / Driving / Car | 🧳 Get ready | the rules a parent needs on the road (tolls, child seats, fuel, parking, ferries, cards) |
| Entry & documents · Customs/biosecurity | Get ready → visa, bio | what to apply for, what not to carry |
| Budget | Get ready → prices table | entry and transport prices per adult/child/free-below age — local currency only |
| Packing | Get ready → packing (tickable) | groups of items (clothes, kids, documents, health…) |
| Contingency / If–then | 🆘 SOS → if-then table | 6–12 rows "if this happens → do this" |
| Emergency card | 🆘 SOS | emergency number, nearest hospitals per base (name + tel), lost-child script, taxi/driver cards in local script |
| Where to eat (big guide) | 🍽️ Eat → all places | see §3 |
| **The guide's stories** (one per day) | 📖 story card on Today, Learn and the passport, read aloud | see §4 — *the HK manual lacked this part; every new manual must have it* |
| Learn (app-only content) | 📚 Learn per day + quiz + animals + local words | see §5 |

## 2. Each day page — target density (both books)
- **Timeline**: 9–10 rows, `t` = `HH:MM` (local time; rows before landing on departure day carry their own `tz`, e.g. Asia/Bangkok).
  Include the small rows too: breakfast/packing, the drive legs, nap, bath, bed — reminders fire 30 min before every `HH:MM` row.
  Each row: main line + a **note** with the practical facts (duration, toilets, prams, opening hours, local-currency price) **and one
  history/nature fact** ("Hampden Bridge opened 2 Feb 1898; its towers were quarried on site").
- `wx`: temperature range · sea temp · sunset time. `moving`: total travel time "2 h 55 in 3 legs". `legs[]` with directions links.
- **Nap** line ("In the van, Kiama → Vincentia 14:15–15:25") and **If tired, cut first** (→ `planB`), plus a real Plan B for risky days.
- `pick`: the local's pick of the day (one paragraph). `money`: "Today ≈ …" in local currency.
- `tips`: 2–3 per day, each tagged warn / tip / info (closures, timetables to check, safety, booking ahead).
- `stay`: tonight's name + full address + Maps query.
- `planned[]`: every stop with a stable `key` (never renamed later), emoji, and a **full Google Maps query** (name, street, town).
- `picks`: one ★ pick per meal (breakfast/lunch/tea/dinner) with what to order + a backup place; `food` = places along the route by stop.

## 3. Where to eat (whole trip)
Grouped by area in travel order. Each place: name, local-script name (CJK etc.) for driver cards, kind (restaurant / café / dessert /
market / cook-it-yourself), what it serves, why it is good for us, hours, price per adult in local currency, Maps query, and the
day/meal it belongs to. Locals' places first; mark "check before going" rather than dropping unverifiable ones. ~25 per base area
(the AU book has 294 in 26 areas, HK 223 in 21).

## 4. The guide's story — one per day (manual part "The guide's stories")
- 150–180 words, warm, present tense, read aloud to a 3-year-old and the grown-ups, told by the trip's first guide mascot.
- Weave in 3–5 true facts from that day's places (years, heights, animals, first peoples' names for places); end with a gentle line.
- Cut into **4–5 scenes** in time order: each scene = one emoji + a 2–5-word heading + 1–4 sentences of the story's own words.
  In `plan.json`: `days[i].tale = { th, en, scenes: [{ e, h:{th,en}, th, en }] }` (the scenes joined with spaces = the story).
- Follow with **"Ask Mimi"**: 2–3 questions with answers → `days[i].quiz`.
- Legends: say "a popular legend", and that the first people have their own story.

## 5. Learn & the kids' passport (per day)
- `learn`: 3 cards per day (one per stop): place, the Country/local people of the place, 2–3 fact-checked facts, one line for the kids.
- `quiz`: 3 per day. Trip-wide: `info.wild` (8–12 animals with a fun fact), `info.general` (local words, food, nature, first peoples),
  `passport.words` (8 local words with pronunciation), `passport.food` (8–12 foods to try), `info.eatRules` if the place has them.
- `mission` per day: `title` (fun), `stamp` (one short word for the stamp, e.g. KIAMA), **3 kid facts**, **4 things to spot**
  (emoji + 2–4 words), and a day colour pair (`acc`/`tint`) shared with the app and the printed passport.
- `passport.guides`: 2 mascots (name TH/EN, one-line intro) — the first one tells the stories. `countdown`: 14 doors before the trip
  (a fact, a word or a picture each) + the kids' packing list. `certificate` wording. No real passport data, ever.
- `passport.map.stops`: the bases in order with a Maps query; `days[i]` = stops visited that day (positions are placed by Claude Code).

## 6. Art (Claude Code draws it from the plan, but the plan names it)
- Per day: the highlight to draw — one **day badge** (sticker style, shared with the app) and one **colouring page** subject
  (e.g. "Kiama blowhole + lighthouse", "Opera House sails + Luna Park wheel"). Bookshelf colouring pages are 400×390 SVG line art,
  12–24 closed pastel shapes, `#1e293b` strokes, at `public/art/colour/<book>/day-N.svg`.
- Two guide mascots and a round crest for the book, new colours per trip (must not look like the previous book).

## 7. Done means
Every day has: 9–10 timed rows with notes · nap + "cut first" · pick · money · 2–3 tips · stay · legs · meal picks · 3 learn cards ·
3 quiz · mission (3 facts, 4 spots, stamp) · a guide's story in 4–5 scenes · a colouring subject.
Whole trip: guide cards, stays, emergency, if-then, prices, packing, visa/bio, drive/car, where-to-eat, wildlife, words, food, countdown.
