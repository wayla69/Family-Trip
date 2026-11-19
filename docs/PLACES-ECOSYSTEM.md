# The places ecosystem — plan for owner review

Owner, 19 Nov 2026: "อยากให้ทำคลังข้อมูลเพิ่มในแอปให้ลึกขึ้นกว่านี้ เวลาใช้ AI จะได้ไม่ต้องไปหาเยอะ และพวกร้านอาหารและสถานที่ท่องเที่ยว
ให้เลือกแนวที่ชอบได้ ทำเชิงลึกเลย สร้าง ecosystem".

Status: **approved 19 Nov 2026, being built phase by phase**. Phase 1 (PRD · UX · design system · tokens · ADR) of the owner's process.

Owner's decisions (19 Nov 2026):
1. One PR per phase, E1 → E6.
2. **Every built-in sight is checked on the web before it enters the library** ("เช็กเว็บทุกแห่งก่อนเข้าคลัง") — no "from memory, not
   checked" rows for sights. A row ships only with `ok` (the month a search confirmed it) and a source; cities fill in over time.
3. Taste = one family profile **plus each child's own favourites** (optional), learned from reviews too.

## 1. PRD — what we are building

### Goal
One shared knowledge base of **places to eat and things to do** in every city of the picture library. It is detailed enough that:

1. the planner builds a route from it first and only asks the web about the gaps;
2. the parents pick the **style** they like (food and outings), and the planner, Today and the eat pages follow that taste;
3. each part of the app feeds the next: the plan, the trip, the reviews, the next plan.

### What exists today (the starting point)

| Piece | Today | Gap |
|---|---|---|
| Places to eat | `eat_lib` + `server/eats/*.json`: 3,089 places in 207 cities, `kind` 0/1/2, a free-text tag | No shared style labels; nothing a child-friendly filter can rely on except words in the text |
| Things to do | Only **pictures**: 3,638 `landmark` items in `public/stock/index.json` (name th/en, keywords) | No facts at all: what it is, for which ages, how long, price, indoor or outdoor, opening, pram |
| Country facts | `server/countryfacts.js`: emergency numbers, visa, power, money | Fine as it is |
| Family taste | Planner `LIKES` / `NEEDS` chips (14 likes, 7 needs), typed again for each plan; the notebook's reviews | Not kept as the family's profile; never used by the eat pages or Today |
| The helper | Writes routes, then writes a whole book, suggesting places itself; web search for checking | It still invents most of the sights and spends searches on facts the app could hold |

### Users and jobs
- **A parent planning:** "show me what fits our children in Seoul and build the days from it."
- **A parent on the day:** "it's raining, what is indoors near here for a 3-year-old?" · "where do we eat tonight, mild food, near the hotel?"
- **A parent after the trip:** stars and "would go again" teach the app the family's taste.
- **The owner:** fewer and cheaper helper calls, and facts that do not change from one call to the next.

### Features
**F1. The things-to-do library** (`sight_lib`). One row per place, the same shape for the built-in list, the books and the helper's
finds, with the same three sources and trust order as the eat library: helper (checked) › book › built-in.

Fields of a row:
- name (th/en, local script);
- town, area and map query;
- kind: one of about 18 (theme park · zoo/safari · aquarium · museum (hands-on) · museum (classic) · park/garden · playground/play centre · beach · nature walk · viewpoint/tower · temple/shrine/church · old town/street · market · show/performance · farm/fruit picking · hot spring · train/boat/cable car ride · shopping);
- for which ages (0–2 · 3–5 · 6–9 · 10+, each 0–2 = no / ok / great);
- how long (h) and best time of day;
- indoor / outdoor / both, so it can be a rain plan;
- pram (step-free / partly / no) · nap-friendly (shade, benches) · toilets and baby change (yes/no, only when known);
- price ≈ (adult / child, free under N) and booking (none / recommended / required, how far ahead);
- why it suits children and one tip;
- the landmark picture's id when the library has one (map pins, the kids' passport, colouring);
- `ok` = the month a web check confirmed it.

Target: 15–25 per city, about 4,000 rows. Each built-in row starts from a landmark picture that already exists where one fits, so the
pictures and the facts share an id.

**F2. One style vocabulary for both libraries.** About 40 shared tags in three groups:
- the experience: animals, water, active, calm, hands-on, culture, food tour, views, shopping, night;
- the practical side: indoor, free, cheap, pram-ok, nap-ok, quick (< 1 h), half day, full day, booking;
- the food: mild, local classic, noodles, rice, seafood, BBQ/grill, vegetarian-friendly, halal, sweets/café, food court, buffet,
  kids' menu, high chair, play area.

The eat rows get these tags too: added to the built-in files, read from the books, asked from the helper. A card and a filter always
use the same words and pictures.

**F3. The family's taste.** A page `#/taste` (shelf card "สิ่งที่ครอบครัวเราชอบ"):
- tap the styles you like and the ones to avoid, for food and for outings;
- each child's own favourites (optional), the family's needs (pram, nap, early nights, mild food);
- one profile for the family in `settings.family_taste` (each child's favourites inside it, by slug), in backups.
- It learns, without changing what the parents set: a 4–5★ review or "would go again" raises its styles a little, a 1–2★ lowers
  them. The page shows "learned from your trips".

It is used:
- in the planner, in place of the per-plan likes/needs, which become "this trip only" changes;
- by the eat pages and Today, which put the matching places first and mark them "ตรงใจเรา";
- by the helper, which receives the taste as words.

**F4. Explore** `#/explore[/<town>]`. One page per city, built from the libraries:
- tabs for things to do and places to eat, style chips (taste-matched ones pre-lit), an age filter (from the children's ages),
  indoor-only and free-only;
- cards with picture, kind, ages, time, price ≈ in baht and the source;
- "อยากไป" ♥ adds a place to the family's wish list (`settings.family_wish`, per town, in backups).

The planner reads the wish list: wished places go into the route first.

**F5. The planner uses the library first.**
- `POST /api/b/planner/route` gets, per town, a short menu of library ids that fit the ages, taste and needs (≤ 25 sights and
  ≤ 12 eats a town). The helper must build the days from those ids and may add a place outside the menu only marked `new`.
- The book draft then carries each stop's library facts (hours, price, tip, picture), so the import does not ask for them again.
- Only `new` places, and library rows not checked for 12 months, go to the web check.
- Measured goal: fewer output tokens per book and fewer searches. The job log reports "from the library n · new n".

**F6. Today and the trip.**
- Rain or a tired day: "เปลี่ยนวันนี้" offers indoor library sights near tonight's bed or today's stops. Each comes with distance
  (town-level coordinates only) and age fit, and can be tapped into the change request.
- "กินอะไรดี": the eat library near the bed, filtered by taste and the time of day.

**F7. The loop closes.**
- A check-in at a library place, a review or a star writes back to the family's view of that place: ✓ been, our stars.
- The family map and the kids' map already show the town; a sight with a picture also becomes a map pin and a passport sticker.
- "ไปอีกครั้ง" and the next plan show "ที่ที่เคยไปแล้วชอบ" for the same town.

### Out of scope
- Live opening hours, live prices or bookings from third parties.
- Reviews from strangers.
- Sending the family's position anywhere: distance uses the stay's town-level coordinates, as weather does today.

### Acceptance (excerpt)
- Every library city has ≥ 15 sights; every sight has a kind, ages, indoor/outdoor and a map query; `npm run sights:lint` checks it
  (as `eats:lint`).
- With the taste set to "animals + mild food, pram, 3 y and 1 y", a Seoul plan's stops are ≥ 70 % library ids; no stop has
  ages 0–2 = no for a child under 2 without a note.
- On Today in the rain, the change box offers ≥ 3 indoor sights within the town.
- No new call sends a name, a photo or a position.

## 2. UX
New screens:
- `#/taste`: three cards (food · outings · our needs), chips with pictures, "learned" chips in a lighter style, children's favourites.
- `#/explore/<town>`: the eat page's look (search, chips, cards); tabs Things to do · Places to eat; a sticky filter row.

Changed screens:
- planner: "where to" → after a town is picked, a "เลือกจากคลัง" sheet opens Explore for that town;
- Today's change box: an indoor list;
- the eat pages: a "ตรงใจเรา" badge;
- the travel notebook: links to taste.

All of these follow the settings pages' look (`pageHead`, `pcard`), 44 px taps, no zeros.

## 3. Design system and tokens
- Reuse `.pcard`, `.eatc`, the chips and `.tpk > .tpo`.
- New: `.sightc` (the eat card's grid plus an ages row and an indoor/time row) and `.tastechip` (three states: like, avoid, learned).
- Style tags use a picture each from `public/art/game|food|hub`; new ones are drawn in the house style where none fits (about 15).
- Colours: the kinds map to the menu's `PG` brights; no new raw colours.

## 4. ADR (proposed)

| # | Decision | Why |
|---|---|---|
| ADR-14 | A `sight_lib` table + `server/sights/<cc>-<n>.json` files, the same pattern as `eat_lib` (starter rows synced once per version, families' own rows and `gone` marks kept, in backups) | Proven pattern, offline-friendly, no new service |
| ADR-15 | One tag vocabulary in `server/tags.js`, shared by client and server (served in `/api/b/geo` once a day) | The filter, the cards, the taste and the helper must use the same words |
| ADR-16 | Taste in `settings.family_taste` (JSON), learned weights apart from the parents' choices | One family per database (ADR-11); nothing per-phone |
| ADR-17 | The planner's route prompt carries a menu of library ids; the answer refers to ids; `new` places are flagged | Shorter prompts and answers, stable facts, check-in keys from ids |
| ADR-18 | The built-in sights are drafted per city, then **every row is confirmed by a web search before it ships** (`ok` + `src` url required; `sights:lint` refuses a row without them); a city ships when ≥ 15 rows passed | The owner's choice: only checked facts in the library; cities arrive over several passes |

Migration numbers: the next free on `main` at build time.

## 5. Phases (each its own PR, tests, CI, owner merge)

| Phase | Contents | Size |
|---|---|---|
| E1 | `server/tags.js` vocabulary; tags on the eat library (files + books + helper); `#/taste` page + `settings.family_taste`; "ตรงใจเรา" on eat cards | M |
| E2 | `sight_lib` table, sync, API, lint; built-in **web-checked** sights for the 40 most-used cities first (Japan, Korea, Taiwan, HK, Singapore, Thailand, Vietnam, Australia, Europe's big ones), then the rest in later passes | L (data) |
| E3 | `#/explore/<town>` + wish list — **built** (Nov 2026) | M |
| E4 | Planner uses the library first (menus, ids, `new`, the draft carries facts, fewer web checks) + job log counts — **built** (Nov 2026; the route's menu holds the things to do — places to eat already reach the book through the eat library's `groupsFor`) | M |
| E5 | Today: indoor plan B, "กินอะไรดี" near the bed; check-ins/reviews write back; next-plan "เคยไปแล้วชอบ" — **built** (Nov 2026) | M |
| E6 | Taste learning from reviews; style pictures drawn where missing; the remaining cities' sights; second web-check pass | M |

## 6. Risks
- **Data accuracy.** Sights written from memory can be closed or moved. Mitigation: the same honest labels as the eats, the book's
  web check before a trip, and a twice-yearly re-check of the built-in sights (the eat list already has one).
- **Size.** About 4,000 rows at ~1 KB is 4 MB on the server only; the phone loads a town at a time.
- **Prompt size.** The menu per town is capped; ids are short.
