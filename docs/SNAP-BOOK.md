# Snap Book — a book from photos, no plan needed

Status: **P0, P1 and P2 built** (16 Nov 2026): the reader and `#/snaptest`, the book from photos after the trip (`#/snap`), the
share target into it, every upload taking the photo's own time, and the open book's day page during the trip (`viewSnapLive`).
R3 confirmed by the owner (16 Nov 2026). P3 (the helper drafts the book) is next. P2 left out the 21:30 nudge for a day the app
was never opened on (no day row exists for it) and the offline-day test in test/offline.mjs; P1 left out the B3 place sheet (a day's place is a text box with the library's names) and the "two trips" split. Written 16 Nov 2026 for handoff; the next session implements from this file.
Owner's ask: "บางครอบครัวไม่ได้วางแผน ให้ทำเล่มเปล่า ถ่ายรูป ใช้ location ในรูป แล้วใช้ AI ร่างเป็นเก็บประวัติ storybook เองได้เลย …
ทำให้การใช้งานแบบทริปพิเศษ หรือคนไทยเที่ยวใกล้ๆ ยกมือถือมาทำแล้วได้เล่มเลย".

Screens: Claude Design canvas **"LifeBook — เล่มจากรูป (Snap Book)"**, https://claude.ai/artifact/CSXLUsJd9dUGKVE5ChQNdS
(13 phone artboards A1–C5, built on the MM Memory design system; private to the owner). §9 maps each artboard to a route.

Thai name on screen: **เล่มจากรูป**. Code name: `snap`.

---

## 1. What we are building (PRD)

### 1.1 The gap today
Every good thing in the app hangs off a *plan*: Today, the bag, reminders, missions, the kids' map, the day pictures, the passport
all come from a seed written from a Trip Operations Manual. A family that did not plan has only "เล่มเปล่า": type a name and two
dates, then add photos one day at a time, and get a book with "วันที่ 1 … วันที่ n", no places, no pictures, an empty kid mode.
That is the wrong first experience for the most common Thai trip: a weekend in Khao Yai, a day at the beach, a temple fair.

### 1.2 Who it is for
- **P1 — "กลับมาแล้ว"**: a parent on the sofa on Sunday night with 80–300 photos on the phone. Wants a book in ten minutes.
- **P2 — "กำลังเที่ยวอยู่"**: a parent on a short or surprise trip. Opens the app, taps one button, the book starts today and
  grows as photos are added; closes it at home.
- **P3 — the children**: get what a planned book gives them — a stamp for the place, stickers, their photos, a road on the
  adventure map — without anyone having written missions.
- Unchanged: relatives (view-only), the printed book (PDF).

### 1.3 The promise
> Pick the photos. The app works out the days and the places on your phone. The helper drafts the words. You fix what is
> wrong and you have a book — for you and for the kids.

### 1.4 Goals and how we will know
| Goal | Measure (acceptance, not analytics — the app has none) |
| --- | --- |
| A book from a camera roll in one sitting | Test: 86 fixture photos over 3 dates → a book with 3 days, places per moment, in ≤ 6 taps before "สร้างเล่ม" |
| Works without location | Same test with GPS stripped → the A4 screen asks one place per day; book still made |
| Nothing new leaves the family | Test: no coordinate is ever in a request body/URL, a table, a log or a backup; stored photos still have no EXIF |
| Helper is optional | Whole flow passes with `ANTHROPIC_API_KEY` unset |
| Kids get something | A saved snap book has a crest/stamp, day pictures and a quest road when its places are in the stock library |

### 1.5 Non-goals (v1)
- No video. No shared/collaborative albums. No face recognition, ever. No map of exact photo positions (we do not keep them).
- No reverse-geocoding service in v1 (see D2). No automatic background import from the camera roll (the web cannot).
- Not a replacement for the planned book: a snap book has no Today timeline, bag, reminders-by-step or eat pages.

---

## 2. What exists and what is missing (code review, Nov 2026)

Facts the design rests on — each was read in the code, not assumed:

| Area | Today | Consequence for Snap Book |
| --- | --- | --- |
| Blank book | `POST /api/b/trips` (server/bookshelf.js): needs slug, title, `date_from`, `date_to` (≤ 60 days); makes every `trip_days` row at once titled "วันที่ n" | Need: dates from photos, days added later, day titles/places editable. No endpoint does any of this yet |
| Day edits | `PUT /api/b/days/:trip/:day` only sets `done` | Need a day PATCH (title, sleep/place, emoji) for app-made books |
| Photo time | sheets.js `addPhotos`: `at = file.lastModified` (clamped to 400 days); the *user* picks the day | Need EXIF `DateTimeOriginal`; day chosen by the app |
| Photo place | `media.place` (text, ≤ 120), set from a chip or by the helper | Reuse as is; the place name is the only location we keep |
| EXIF | Client `shrink()` re-encodes through a canvas (drops EXIF) before upload; server `images.js` strips all metadata again | EXIF **must be read on the phone from the original `File`, before `shrink()`** |
| HEIC | Accepted; the browser usually hands a JPEG; a raw `.heic` goes to the server unshrunk | The EXIF reader needs a HEIC path or a fallback (D1) |
| Check-ins | table `places` via `PUT /api/b/places {trip, key, day, kind, name, done, at}`; drives `mapReal`, photo chips, the notebook | A snap "moment place" is a check-in row — no new table for places |
| Places with coordinates | `public/stock/index.json` `places`: 274 entries, **207 with `ll`** (city/region centre), `tz`, `alias`, `home` flag; 28 Thai places. Items (5,512 pictures) have **no** coordinates. The index is server-only (3.7 MB) | Region-level lookup is free. District-level needs a small gazetteer (D2). Landmarks can be *suggested by region*, not by coordinates |
| Stock matcher | `scripts/lib/stock-match.mjs` `stockMatch(days, placeText, index)` → `theme.artDays`, crest, guides, `passport.stamps`, map pin art; runs in `toSeed` for imports and the sample | Run it for a snap book once places are known (D7) |
| Helper modes | `POST /api/b/story` modes `sum`, `fore`, `story`, `talk`, `letter`, …; `sum` answers 422 on a day with nothing written; `POST /api/b/photos/ai` (≤ 12 thumbs a call, only with `PHOTO_AI=1`); daily cap `STORY_DAILY` (60) taken by `aiTake` | Need a facts builder that counts places/moments as "something", and a job that chains the calls (D6) |
| Jobs | Import and bookart are single in-memory jobs: claim before first await, 202 + poll, `GET` reads the job **before** the list | Copy that pattern exactly for the draft job |
| Kid mode | Handles a book with no `passport`/`info` (empty lists, no map) | Works, but is empty → D8 fills it |
| Print | `viewPrint` builds from days, entries, media; cover = day pictures or ⭐ photo | Works once days have titles, art and a summary |
| Offline queue | IndexedDB op queue with blobs, Wi-Fi-only switch, idempotent upserts by client id | Reuse; uploads start only after "สร้างเล่ม" |
| Privacy page | `#/privacy` says what is kept and who sees it | **Must** gain a paragraph on reading time and place from photos (D9) |

---

## 3. Rules that bind this work (from CLAUDE.md — do not relax)

- Children's photos: nothing public, no third-party scripts, **no GPS/EXIF kept**, no logging of codes/tokens. Photos reach the
  helper only with `PHOTO_AI=1`, only 520 px thumbnails, only on a press.
- Thai UI glossary: ผู้ช่วย (never a vendor/model name), เล่ม, สมุดความทรงจำ, ไม่มีเน็ต, ญาติ, รหัส, ตราประทับ, `เช็ก`.
- No zeros ("ยังว่าง", never `0 รูป`). Taps ≥ 44 px. 320 px at reading size 3 must not scroll sideways.
- One look per job: a selected choice is tinted + ringed with a ✓ (`.tpo`), `.btn` is an action; one fold marker; top bar is
  back · title · search only.
- Play, not homework: kid side never shows what is missing.
- Never re-render over a focused field (`safeRender`). Older iPads: no regex lookbehind, guard new APIs, `color-mix` has the
  legacy stylesheet.
- Flow: implement → `npm test` → PR → green CI → merge on the owner's ask. New migration: check the latest number on `main`
  first (currently `0024_book_age.sql`).
- New client pages: the app has no "use client" ratchet (vanilla JS), but `test/infra.mjs` checks every `data-a` has a handler
  (one action per line), `sw.js` shell list and `ART`, the dark-mode selector scoping.

---

## 4. Journeys

### J1 — กลับมาแล้ว (after the trip) — the main path
1. Shelf → **เล่มใหม่** (A1) → **เล่มจากรูป**.
2. A2: "กลับมาแล้ว" is pre-selected; optional name; children chips (all on); **เลือกรูปจากเครื่อง** opens the system picker (multi).
3. A3: the phone reads each file's time and position (D1), names places (D2), groups days and moments (D5). Nothing is uploaded.
   Shows: n photos, the date span, what has a position, the days found with their library picture.
4. If no (or few) photos had a position → A4: one place per day, with suggestions; skippable.
5. B1: the book as the app sees it — title (auto: "<place> n วัน"), days with place line and counts, "รูปไม่รู้วัน". Tap a day → B2
   (moments; rename; move photos; ⭐). Tap a pin → B3 (place sheet).
6. **สร้างเล่ม** → the server creates the trip + days, the uploads are queued; → C1 (helper plan) or straight to the book.
7. C1 → C2 (job runs; can be left) → C3 (review each day's draft) → C4 (the book: read, PDF, relatives, kids' stamp).

### J2 — กำลังเที่ยวอยู่ (during the trip)
1. A2 with "กำลังเที่ยวอยู่" → the book is created **now**: one day (today), open-ended.
2. The book's home is B4 ("วันนี้"): ถ่ายรูป · เลือกรูป · คำพูดเด็ก · อัดเสียง; a place line "ตอนนี้อยู่แถว …" (D3: live location →
   place name on the phone, or typed). Photos added carry that place unless their own EXIF names another.
3. A new calendar day with a first photo/quote adds a day by itself. Days with nothing are never created (no "วันที่ 3 ยังว่าง").
4. **กลับถึงบ้านแล้ว ปิดเล่ม** → the book closes (`date_to` = last day) → C1.

### J3 — one-day outing
J2 that is closed the same evening, or J1 with one date. Title rule gives "<place> วันเดียว".

### Edge journeys (must be designed, not discovered)
- Photos span two trips (a gap of ≥ 3 empty days between clusters): A3 offers "ดูเหมือนสองทริป" → make two books or keep one.
- More than 60 days between first and last photo: refuse with the reason; suggest picking one trip's photos.
- A photo dated outside every cluster by > 2 days (an old picture saved again): goes to "รูปไม่รู้วัน".
- Screenshots / chat-app saves (no EXIF time): use `lastModified` if it falls inside the trip span, else "รูปไม่รู้วัน".
- The page reloads between A3 and "สร้างเล่ม": the picked files are gone (the web cannot keep file handles) → back to A2 with a
  line saying so. Do not try to persist blobs before the book exists.
- Adding more photos later to a closed snap book: the same reader runs; new dates add days at either end (≤ 60 total).
- No helper configured: C1–C3 never show; B1's only button is "สร้างเล่ม".

---

## 5. Decisions (ADR-13 — fold into docs/ADR.md when built)

### D1 — Read time and position on the phone, from the original file
- New client module `public/snap.js` (classic script after `sheets.js`; add to `index.html` and the `sw.js` shell list).
- `snapMeta(file) → { at: 'YYYY-MM-DDTHH:MM:SS' | null, tz: '+07:00' | null, ll: [lat, lon] | null, src: 'exif'|'file' }`.
- JPEG: scan markers to APP1 "Exif\0\0", parse the TIFF: IFD0 → ExifIFD (0x8769): `DateTimeOriginal` 0x9003,
  `OffsetTimeOriginal` 0x9011; GPS IFD (0x8825): 0x0001–0x0004 → decimal degrees. Read only the first 256 KB
  (`file.slice`). ~120 lines, no dependency (the app has none on the client and must not gain a CDN one).
- HEIC/HEIF: ISO-BMFF `meta` → `iinf` item of type `Exif` → `iloc` extent → the same TIFF parser (skip the 4-byte offset
  prefix). If parsing fails, fall back — never block the photo.
- No EXIF time: `file.lastModified` (`src: 'file'`).
- **The day of a photo is the EXIF local date as written** (wall clock where it was taken). Do not convert through UTC: a
  22:30 photo in Sydney must not land on the next Bangkok day. `taken_at` sent to the server = that wall time read in the
  trip's timezone.
- `ll` never leaves `snap.js`: it is consumed by `placeOf(ll)` (D2) and dropped. It is not put on any object that is
  enqueued, stored in IndexedDB, logged or rendered. A test greps the queue and the requests.

### D2 — From position to a name without sending the position anywhere
- v1 is **offline lookup on the phone**:
  1. `GET /api/b/geo` (signed-in, cacheable, ~25 KB): the stock index's places reduced to `{id, name{th,en}, ll, country, tz, home}`
     (207 with `ll`). Nearest place within 60 km (Thai `home` places) / 80 km (abroad) = the **region** ("เขาใหญ่และปากช่อง").
  2. `public/geo/th.json` (new, bundled, target ≤ 80 KB gzipped): Thai **provinces (77) and districts (~930)** with a centroid
     → the **district** ("อ.ปากช่อง นครราชสีมา"). Nearest centroid within 25 km. Data source to choose in P0 (must be an open
     licence; record it in the file header and in docs). Thai trips are the target of this feature, so Thailand gets the fine
     layer; abroad stays region-level in v1.
  3. Finer than a district comes from people or the helper, not from coordinates: the place sheet (B3) lists the region's
     **library landmarks** by name (`GET /api/b/geo/<placeId>/landmarks` → `[{id, name, art}]` from stock items of category
     `landmark`), what the family typed before, and free text.
- The name written on a photo/moment is plain text (`media.place`, the check-in's `name`), plus `placeId` (stock place id) kept
  **on the trip** (`theme.snap.places = [ids]`) for the matcher — never coordinates.
- v2 option, off by default (`GEOCODE=1`, owner's decision): the server proxies a reverse-geocode with the position **rounded to
  0.01° (~1 km)**, no family identifier, cached by cell — the same shape as `weather.js` (town-level `ll` to Open-Meteo). Needs
  a privacy-page line and a provider whose terms allow it. Not in v1.

### D3 — Android may strip the position; design for it
- **Unverified here, must be tested first (P0):** Chrome on Android opening the system photo picker returns files whose GPS
  tags are redacted by the OS (the time tags stay). iOS Safari keeps location unless the user turns it off in the picker's
  Options. The owner's phone is a Samsung, so "no position" is the *main* Android path, not an error state.
- Order of sources for a moment's place: EXIF position → live position at the time of adding (J2 only;
  `navigator.geolocation.getCurrentPosition`, one read on the user's tap "ใช้ตำแหน่งตอนนี้", converted by `placeOf` and dropped)
  → the day's place typed once on A4 → the helper's guess from the thumbnail (only with photo help on) → none.
- P0 also tries `accept="image/*,.heic"` vs the document picker ("ไฟล์") to see whether one route keeps GPS; if so A2 gets a
  second, quieter button "เลือกจากไฟล์ (เก็บตำแหน่ง)". Decide from the device result, not from this document.
- Never ask for the location permission on page load; only on that tap; a denial is silent (the field stays).

### D4 — An open-ended, app-made book
- Migration `0025_snap.sql` (check the number on `main`): `ALTER TABLE trips ADD COLUMN kind text NOT NULL DEFAULT 'plan'`
  (`'plan' | 'snap'`), `ADD COLUMN open boolean NOT NULL DEFAULT false`. (`theme` jsonb already exists for `snap.places`.)
  Journal it. Backups: `kind`/`open` travel with the trip row (backup.js copies trip columns — verify, add if it names columns).
- `POST /api/b/snap` `{title?, dates: ['YYYY-MM-DD', …] | null, open, timezone, children?, places?: [stockPlaceId]}` →
  creates the trip (`source 'manual'`, `kind 'snap'`), **only the dates given** as `trip_days` (sorted; `day_index` dense),
  `date_from/to` = min/max. `dates: null` + `open: true` = today only (J2). Slug: `snap-<yyyymmdd>-<4 random>`; the parents
  never see or type an id. Title empty → server default "ทริป <d MMM>" until D5/D6 name it.
- `POST /api/b/snap/:trip/days` `{dates: [...]}` → inserts missing dates. **Re-index rule:** `day_index` must stay dense and
  date-ordered. Inserting a date *before* an existing day would shift every later index, and the index is not only a
  column: six tables carry `day_index` (entries, media, places, hearts, reviews, spend) **and ids embed it**
  (`<trip>.sum.d<i>`, `<trip>.mood.d<i>.<kid>`, ticks `stamp.d<i>`, `gift.d<i>`, `quest.d<i>.<slot>`, fields `colour.d<i>`),
  including ids already sitting in a phone's offline queue. Renumbering is therefore out for v1: **allow appending after
  the last day, and inserting earlier dates only while the book holds no entries, media, places, hearts, reviews or spend**
  (then the days are simply rebuilt); otherwise 409 `order` and the UI says "วันนี้อยู่ก่อนวันแรกของเล่ม — เริ่มเล่มใหม่
  หรือย้ายรูปไปวันแรก". J1 never hits this (all dates are known before the book is made); it can only happen when older
  photos are added to a book that already has memories.
- **Days need not be consecutive** (12 and 14 Dec, nothing on the 13th → two days). Each `trip_days` row has its own `date`
  and `dayNow` finds today by that date, so this works — but grep the client and `push.js` for any place that derives a
  day's date from `date_from + index` before relying on it, and add a test with a gap.
- `PATCH /api/b/days/:trip/:day` `{title?, place?, emoji?}` — only for `source 'manual'`; `place` is stored in `trip_days.sleep`
  as `{th, en}`? **No** — `sleep` means the bed. Add `trip_days.place jsonb` in the same migration and show it where a planned
  book shows the bed line.
- `POST /api/b/snap/:trip/close` → `open = false`, drops trailing empty days (none should exist), sets `date_to`.
- 60-day cap and the timezone check stay as in `POST /api/b/trips`. Timezone default: nearest stock place's `tz`, else
  `Asia/Bangkok`.
- State: `trips[].kind/open` in `/api/b/state`; `S.trips` consumers must treat `kind === 'snap'` as "no plan" (§8).

### D5 — Days and moments
- **Day** = EXIF local date. **Moment** = a run of photos in a day whose place name is the same and with no gap > 90 min;
  a place change or a longer gap starts a new moment. Label = `dayPart` of its first photo (ช่วงเช้า / ตอนกลางวัน / ช่วงบ่าย /
  ตอนเย็น / ตอนค่ำ — the printed book already has `dayPart`) + the place.
- Moments are **computed, not stored**: `snapMoments(t, i)` from `media.at` + `media.place` (+ entries with a time). Storing
  them would need syncing on every move; the inputs are already synced.
- Photos with no position inherit the place of the nearest photo in time within 45 min in the same day; else the day's place;
  else none (shown as "ยังไม่ได้ใส่สถานที่" once, on the moment, never a zero).
- A moment's place = a **check-in** row (`places`, `kind 'place'`, `key` = slug of the name, `at` = first photo's time): this
  lights the kid map (`mapReal`), the photo chips and the notebook for free.
- Day place line (B1) = the day's places by photo count, top three, " · " between.
- Auto title: one region → "<region short name> n วัน" / "… วันเดียว"; several → "<first> ถึง <last>"; none → "ทริป <date span>".
  `shortName` exists in views.js for stays; reuse the idea (drop "และ…").
- Featured photos on B1 before any upload: first photo of each moment (object URLs made lazily, revoked on leave).
- Limits: ≤ 600 files a pick (say so past it), read 6 files at a time (keep the UI live; a progress number, never a spinner
  alone).

### D6 — The helper drafts the book (optional, one job)
- `POST /api/b/snap/:trip/draft` `{parts: {names, sums, fore, stories}, photos: bool, lang}` → 202; `GET /api/b/snap/:trip/draft`
  → `{job, on}`. One job at a time per server (like import/bookart): claim before the first await; `GET` reads the job first.
- Refuse up front with 429 `limit` when today's allowance cannot carry the whole job (`aiTake` budget check like the import).
  Calls: `names` 1 · `sums` 1 per day with memories · `fore` 1 · `stories` 1 per day · photos `ceil(min(n,12)/12)` per day
  (D6.2). The C1 footer shows the number computed by the client from the same formula; the server is the authority.
- **D6.1 facts** (text only, built in `server/story.js` beside the existing fact builders): per day — date, weekday, the
  moments (part of day + place + photo count), quotes/notes/favourites the parents wrote, photo captions and tags if photo
  help ran, the children via `FAM.kidsFor`. No file names, no coordinates, no relatives' hearts.
- **D6.2 photo help** reuses `POST /api/b/photos/ai` logic: per day at most **12 thumbnails chosen evenly across moments**
  (new `pick` parameter server-side; today it takes the first 12 unseen). It fills captions/tags/place only where empty and
  stars ≤ 2 (existing rules). Only when `PHOTO_AI=1` **and** the C1 switch is on. With it on and a day without a place, the
  prompt may propose one place name per moment — stored only where the parents gave none.
- **D6.3 names call** (new mode `snapnames`, JSON): in → the facts of every day; out → `{title{th,en}, days[{title{th,en},
  emoji, fact{th,en}}]}`. `fact` = one kid-friendly sentence about the day's place, used by the quest chest (D8). Validate
  like `parseQuiz` does: shape, lengths (title ≤ 40, day title ≤ 32 Thai letters like `styleCheck`), one emoji.
- Summaries, foreword, stories: the **existing** modes (`sum`, `fore`, `story`) called server-side by the job with the D6.1
  facts, saved to the same entry ids (`<trip>.sum.d<i>`, `<trip>.fore.all`, story) so the book, the record page and the PDF
  need no change. `sum`'s 422 "nothing written" must count a moment/place as something for `kind 'snap'`.
- **Draft mark**: migration adds `entries.src text` (`'ai'` when the helper wrote it; cleared by the upsert when the text
  changes — the same trick as `entries.tr`). The "ร่างโดยผู้ช่วย" tag (C3, and a quiet one in the book for editors only) reads
  it. "ใช้ร่างนี้" clears `src` without changing the text.
- Progress for C2: `job.steps = [{k, day?, status: 'done'|'now'|'wait'}]`, `job.preview` = the text streaming for the
  current step (optional; a plain "กำลังเขียน…" is acceptable in v1). When done: a push "ร่างเล่มพร้อมแล้ว" through the existing
  `push.js` (opens `/draft`), only if the phone has reminders on.
- Stop: `DELETE /api/b/snap/:trip/draft` aborts upstream; what was already saved stays (each step is saved as it ends).
- A failed step stops the job with the reason on C2 (cap, refusal, network); nothing is retried silently.

### D7 — Pictures from the stock library
- After the trip is created (and again after places change or the draft job ends): `STOCK.matchSnap(trip)` on the server —
  build `days = [{title, text: places.join(' ')}]` and the book's `placeText` from the region names, call `stockMatch`, write
  `theme.artDays`, `passport.style.crest`, `passport.guides`, `passport.stamps`, and `theme.accent` from the first place's
  `colors.k1` when the family did not pick a colour. Thai places are `home: true`: `homeOk` already allows them when the
  book's place names Thailand and no place abroad — pass the region names as `placeText` so it does.
- Days with no library picture: the existing `server/bookart.js` path (`startArt`) draws them when the helper is on; else
  the day's emoji stands in, as for any app-made book.
- Offline pack and backups already handle `stock:` ids and drawn art.

### D8 — The kids' side of a book nobody planned
- Build a minimal `passport` at D7 time (stored in `trips.passport` like an imported book's):
  - `style.crest`, `guides`, `stamps` — from the matcher.
  - `days[i] = { acc, tint, facts: [fact] }` — colours from the place, `fact` from D6.3 (or the place's name line without
    the helper). Enough for `questPlan` (one town per day, the chest's secret).
  - `map`: one stop per distinct region/district in visit order, `x,y` laid out left-to-right in a gentle zigzag
    (`i/(n-1)`, alternating 35 % / 65 %), `days[i]` = that day's stops; pin art from the matcher (`mapArt`).
  - No `spot` missions, no quiz, no countdown: a snap book has no "find it" list — the stickers come from check-ins
    (`been.<stop>`, already built by `mapReal`) and from ⭐ photos.
- Kid home for a snap book: the same tiles minus the ones that need a plan (missions, countdown, packing); "ดูรูปของหนู",
  games, colouring (stock SVGs pass `canColour`), the adventure map, dress-up stay. Check `kid.js` for every place that
  assumes `passport.days[i].spot` exists (it already defaults to `[]` in most; verify with the test in P4).
- Wardrobe: `wearAuto` reads the day's title + headlines; for a snap day feed it the day title + place names.
- Certificate: `certEarned` on the last day — for a snap book, when it is closed.

### D9 — What the family is told
- A2 note (always visible): "แอปอ่านวันเวลาและตำแหน่งจากรูปบนเครื่องนี้ แล้วเก็บไว้แค่ชื่อเมืองหรือย่าน ไม่เก็บพิกัด".
- A3 note: "ทั้งหมดนี้ทำบนเครื่องของคุณ รูปยังไม่ได้ส่งไปไหน".
- C1 states exactly what the helper sees, in both switch positions (names + ages of the children are already sent by the
  existing story prompts — say so; do not claim otherwise).
- `#/privacy`: add "อ่านวันเวลาและตำแหน่งจากรูป" under what is processed on the phone and never kept; the vendor is named only
  there. English mirrors it.
- `docs/PRD.md` privacy section and CLAUDE.md "Children's photos" bullet gain one sentence each: position is read on the
  device, converted to a place name, never stored or sent.

### D10 — Offline and failure
- A1–B3 work with no signal except `GET /api/b/geo` (cache it in the SW's shell cache on first sign-in; `th.json` is a shell
  file). "สร้างเล่ม" needs the server (the trip id must exist before media can be queued) → offline: the button says
  "ต้องมีเน็ตเพื่อสร้างเล่ม" and keeps the session in memory.
- After creation everything is the existing queue: photos upload in the background, Wi-Fi-only honoured, progress in the
  existing `.upw`. The review screens read `S.media` (optimistic rows), so they work while uploads are pending.
- J2 offline: the day page works from the queue as the record page does today.

### D11 — What a snap book hides and shows
`kind === 'snap'` in views.js:
- Book menu (`viewHub`): tiles = วันนี้ (only while `open`) · สมุดความทรงจำ · รูปทั้งหมด · จ่ายไปเท่าไร (if used) · หัวใจจากญาติ;
  no plan/eat/stays/sos/prep/learn tiles (they are already hidden when `hasInfo` is false — verify, do not duplicate).
- Bottom bar while open: เมนู · วันนี้ · สมุด · โหมดเด็ก (B4). Closed: the normal bar minus Today/eat.
- "On the trip the app opens on Today" (sheets.js boot) → for an open snap book open B4.
- Reminders: only the 21:30 "record the day" nudge applies (no timeline). `push.js extras()` must not assume a plan.
- Record page (`#/t/<trip>/log/<i>`): stays the detailed editor (quotes, mood, spend, the helper's panel); B2 links to it.
  Its photo-spot chips already include hand check-ins, so snap moments appear as chips.

---

## 6. API summary (all editors-only, `x-mb: 1`, scoped by family)

| Method + path | Body → answer | Notes |
| --- | --- | --- |
| `GET /api/b/geo` | → `{places:[{id,name,ll,country,tz,home}]}` | From `STOCK.read()`; ETag by index hash |
| `GET /api/b/geo/:place/landmarks` | → `[{id,name{th,en},art}]` | Approved stock landmarks of that place |
| `POST /api/b/snap` | `{title?, dates?, open, timezone?, places?}` → `{id}` | 400 `dates`/`timezone`, 409 never (random slug) |
| `POST /api/b/snap/:trip/days` | `{dates}` → `{days}` | 409 `order` (D4), 400 `dates` (> 60) |
| `PATCH /api/b/days/:trip/:day` | `{title?, place?, emoji?}` | 409 `seed` for bundled books |
| `PATCH /api/b/trips/:trip` | `{title?, accent?}` | App-made books only |
| `POST /api/b/snap/:trip/close` | → `{ok}` | Idempotent |
| `POST /api/b/snap/:trip/match` | → `{art, crest}` | Runs D7/D8; also called by the server itself |
| `POST /api/b/snap/:trip/draft` | `{parts, photos, lang}` → 202 `{job}` | 409 `busy`, 429 `limit`, 503 helper off |
| `GET /api/b/snap/:trip/draft` | → `{job, on}` | Job first, then anything read from the DB |
| `DELETE /api/b/snap/:trip/draft` | → `{ok}` | Stop |
| existing | `PUT /api/b/media/:id?trip&day&at&place`, `PATCH /api/b/media/:id`, `PUT /api/b/places` | Unchanged; `PATCH media` gains `day` (move a photo to another day) |

Moving a photo between days: `PATCH /api/b/media/:id {day}` — today the day is fixed at upload; the storage key
(`p/<trip>/<id>.jpg`) has no day in it, so it is a column update only. Add it; test that the helper's `ai_at` and the ⭐ stay.

---

## 7. Client structure

- `public/snap.js` (new): `snapMeta`, TIFF/HEIC readers, `placeOf`, `snapRead(files, onProgress)`, `snapCluster`,
  `snapMoments`, the in-memory session `snap = {files, meta, days, title, mode}`, the views `viewNew`, `viewSnapStart`,
  `viewSnapRead`, `viewSnapPlaces`, `viewSnapDays`, `viewSnapDay`, `viewSnapLive`, `viewSnapDraft`, and their actions
  (one per line in `Object.assign(A, {...})`).
- `public/geo/th.json` (new data), `GET /api/b/geo` cached.
- views.js: `viewHub`/bar/boot branches for `kind 'snap'` (D11); the shelf's "new book" card opens `#/new` instead of the
  sheet (A1) — `newTripSheet` stays as the "เล่มเปล่า" step.
- sheets.js: `addPhotos(t, day, files, spot)` gains `meta` (time from EXIF) — **use EXIF time for every upload, not only
  snap books**; it fixes "all photos say they were taken when I picked them" everywhere.
- app.css: the classes in the canvas's `snap.css` (`.addway.main`, `.tpo`, `.dayrow`, `.mom`, `.ph`, `.sheet`, `.act`, `.sw`,
  `.draft`, `.bar2`, `.big`, `.ok`) — several already exist under other names (`.addway`, `.tpo`, `.navb`, `.chip`, `.row1`≈
  `.glc`, `.field`): **reuse the app's class before adding one**; `snap.css` is a mockup aid, not a file to copy.
- `sw.js`: bump `mbs-vN`; add `snap.js`, `geo/th.json` to the shell.

---

## 8. Phases — each is one PR, green on its own

### P0 — Device facts (half a day; no product code merged unless useful)
- A throw-away page `#/snaptest` (editors, not linked): pick photos → table of `{name, type, size, exif time?, offset?, gps?
  (yes/no only — never print coordinates), src}` + the same through the "ไฟล์" picker. The owner runs it on the Samsung, the
  iPhone and an iPad and sends a screenshot.
- Decide: D3's Android route; HEIC share; how many photos lack time. Choose the Thai gazetteer source and check its licence.
- **Exit:** a filled table in this file (§11) and the two decisions written down.
- **Built** (16 Nov 2026): `public/snap.js` `snapTiff` / `snapJpegTiff` / `snapHeifExif` / `snapMeta` / `snapRead` (the D1 reader,
  no dependency) and `viewSnapTest`: three pickers (photo library `accept=image/*`, files with no `accept`, the camera with
  `capture`) + a live-position check that shows only its accuracy; per picker the counts (time, zone, position, HEIC) and a
  table; "copy the results" gives the device and counts as text, never a position or a file name. The file inputs live
  outside `#app` (`body > #snapin-<k>`), as `#fpick` does. Tests: test/infra.mjs runs the reader in a vm on
  `test/fixtures/snap` (synthetic 64×48 pictures: little- and big-endian JPEG, AVIF for the HEIF path, time only, no EXIF,
  0,0, south); test/ui.mjs picks five through the page and checks counts, no upload, no position on the page.

### P1 — After the trip, no helper (J1 to "สร้างเล่ม")
Build: migration 0025 (`kind`, `open`, `trip_days.place`, `entries.src`), `POST /api/b/snap`, days/day/trip PATCH, `media` day
move, `GET /api/b/geo`, `snap.js` reader + cluster + views A1–B3, hub/bar branches, EXIF time in `addPhotos`, privacy copy.
Acceptance:
- Fixture set (commit small synthetic JPEGs with EXIF written by `sharp().withExif` in the test, like `verify-prod.mjs` does —
  never real photos): 3 dates, 7 places near Khao Yai, some without GPS → B1 shows 3 days, right counts, right place lines.
- GPS-less set → A4 appears; skipping still makes the book.
- No request, queue row or DB row contains a coordinate (test intercepts every request body/URL and greps `\d{1,3}\.\d{3,}`
  pairs near the fixture's values; also `SELECT` the new columns).
- The stored photo has no EXIF (existing check) and `taken_at` equals the EXIF wall time in the trip's zone.
- 390 px, 320 px at size 3, 1440 px, dark: no sideways scroll, taps ≥ 44 px, no zeros.
- Planned books are untouched: both bundled books' tests pass unchanged.
Tests: `test/snap.mjs` (new group in `test/run.mjs`), unit tests of the TIFF/HEIC reader in `test/infra.mjs` (pure functions —
load `public/snap.js` in a vm like other pure checks), UI flow in `test/ui.mjs`.

### P2 — During the trip (J2)
Build: B4, open book, day append, close, live place (geolocation → `placeOf`), boot opens B4, the 21:30 nudge for snap.
Acceptance: clock-driven test (fixed time day 1 → add → day 2 → add → close): two days exist, none empty; offline add then
sync arrives once (extend `test/offline.mjs`); permission denied → no error, field stays.

### P3 — The helper drafts (C1–C3)
Build: facts builder, `snapnames`, the job, photo pick-12, `entries.src`, C1–C3, push when done, cap check.
Acceptance (mock via `ANTHROPIC_BASE_URL` as test/story.mjs does): calls in order and count as the formula says; nothing but
text facts without the switch; ≤ 12 thumbnails a day with it; a parents' text is never overwritten; a refused step stops the
job and says why; the job survives the page closing; `GET` never says done before its entries are readable (the import race).

### P4 — Pictures and the kids' side (C4–C5)
Build: `matchSnap`, minimal passport, quest/map/kid-home branches, PDF check, certificate on close.
Acceptance: Khao Yai fixture → crest = Khao Yai stamp, 3 day pictures from the library, a quest road of 3 towns, stickers for
checked-in places; a place not in the library → emoji/day art fallback, no broken image; kid home fits one screen (the
existing 7-size test) with a snap book; printed PDF has a cover, 3 day pages, no "nothing recorded" text.

### P5 — Later, only if asked
Opt-in reverse geocode (D2 v2) · "ดูเหมือนสองทริป" split UI polish · video · finer gazetteers abroad · turning a snap book
into the seed of next year's plan.

Rough size: P1 ≈ 5–7 days of focused work, P2 ≈ 2, P3 ≈ 3–4, P4 ≈ 3. P1 alone is shippable and useful.

---

## 9. Screens ↔ routes (design handoff)

| Artboard | Route | View fn | Notes |
| --- | --- | --- | --- |
| A1 เล่มใหม่ | `#/new` | `viewNew` | Replaces the shelf's three inline cards; "เล่มจากรูป" is `.addway.main` |
| A2 เริ่มเล่ม | `#/snap` | `viewSnapStart` | Mode `.tpo` pair, name, children chips, privacy note, picker button |
| A3 อ่านรูป | `#/snap/read` | `viewSnapRead` | Live progress while reading; rows update in place (never re-render the whole page) |
| A4 ไม่มีตำแหน่ง | `#/snap/places` | `viewSnapPlaces` | Only when < 30 % of photos have a position; one field per day + chips |
| B1 วันที่จัดให้ | `#/snap/days` | `viewSnapDays` | Before creation: from the session. After: `#/t/<trip>/days` from state, same view |
| B2 หนึ่งวัน | `#/snap/day/<i>` · `#/t/<trip>/day/<i>` | `viewSnapDay` | Moments; pin → B3; photo tap → existing lightbox |
| B3 สถานที่ | sheet | `placeSheet` | Search filters in place; "ใช้ตำแหน่งตอนนี้" row only in J2 |
| B4 วันนี้ | `#/t/<trip>/today` (snap, open) | `viewSnapLive` | Four actions = existing `pickphotos`, camera input, quote, `startRec` |
| C1 ให้ผู้ช่วยร่าง | `#/t/<trip>/draft` | `viewSnapDraft` | Switch rows; the photo switch shows only when `features.photoAi` |
| C2 กำลังร่าง | same route, job running | — | Poll like `artPoll`; safe to leave |
| C3 ตรวจร่าง | `#/t/<trip>/draft/<i>` | — | Blur-save boxes (existing pattern); "ใช้ร่างทุกวันเลย" clears every `src` |
| C4 ได้เล่ม | `#/t/<trip>/book` | `viewBook` | Existing page; add the kids' stamp row for snap books |
| C5 ฝั่งเด็ก | `#/kid/<kid>` | kid.js | Existing home with D8's data; the mockup shows the intent, not new chrome |

Design notes that are easy to lose:
- Photo placeholders in the canvas are tinted squares on purpose: no family photo is ever put in a design file.
- The canvas uses the "Big Hop" light theme tokens as the look of a fresh Thai book; the real accent comes from D7.
- Kid-side copy is one short sentence, read aloud: "มีมี่ไปเขาใหญ่มาแล้ว!".
- English strings: write them with the Thai ones through `L(th, en)`; the canvas is Thai-only.

---

## 10. Risks and open questions

| # | Risk / question | Proposed answer | Who decides |
| --- | --- | --- | --- |
| R1 | Android strips GPS | P0 test; A4 is first-class; J2 uses live position | Owner (after P0) |
| R2 | Thai district data: source and licence | Choose in P0; fall back to provinces only (77) if none is clean | Implementer, owner informed |
| R3 | Using position at all vs the "no GPS" rule | D1/D2: read on device, name only, never stored/sent; privacy page says so | **Owner — must confirm before P1** |
| R4 | Helper cost on big trips (10 days, stories on) | Cap check up front; stories off by default; number shown on C1 | Owner |
| R5 | `day_index` renumbering | v1 forbids inserting before a day with memories (D4) | Implementer |
| R6 | 600 photos in memory on an old iPad | Read 6 at a time; no decode until needed; test on the mini 4 | Implementer |
| R7 | Wrong places typed by nobody (auto-inherit) | Always editable; "ร่าง" look for auto place names? — **no**: keep quiet, B1 is the review | — |
| Q1 | Name on screen "เล่มจากรูป" | Proposed; alternatives "เล่มด่วน", "เล่มจากอัลบั้ม" | Owner |
| Q2 | Should EXIF time fix apply to planned books' uploads too | Yes (§7) | Owner informed |
| Q3 | Photo help default for snap books when `PHOTO_AI=1` | Off on C1 each time; the family switches it on per job | Owner |

---

## 11. P0 results (fill in)

| Device / browser | Picker | EXIF time | GPS | HEIC handed as | Notes |
| --- | --- | --- | --- | --- | --- |
| Samsung S26 Ultra · Android 17 · Chrome 157 (Home-Screen app) | photo picker | 14 of 14 (v217) | 0 of 14 | HEIC as is (`image/heic`, 8 of 14) | 16 Nov 2026. Every miss is `nogps`: Android takes the position out. Zone on 9 of 14. Before v217 the reader missed Samsung's HEIC layout (8 of 32 with a time) |
| Samsung (same) | "ไฟล์" (no `accept`) | 1 of 1 HEIC | 0 | HEIC as is | the document picker takes the position out too — no second route on Android |
| Samsung (same) | camera (`capture`) | 1 of 1 | **1 of 1** | JPEG | a photo taken through the app keeps its position and zone |
| Samsung (same) | live position | — | yes, about 25 m | — | `getCurrentPosition` after one permission tap |
| Samsung (same) | share from Gallery to the installed app | 19 of 19 | 0 of 19 | HEIC as is (14) | the share target works (one tap for many photos) but Android takes the position out here too: no web route on Android keeps it |
| iPhone / Safari (Home-Screen app) | Photos | | | | |
| iPad Pro 10.5" (iPadOS 17) | Photos | | | | |
| iPad mini 4 (iPadOS 15) | Photos | | | | |

Decisions after P0: **D3 route (Android, decided from the Samsung):** a photo picked from the phone carries its time but never
its position, through either picker; so on Android "after the trip" asks one place per day (A4) as its main path, and "during the
trip" takes photos through the app's own camera button (position kept) or reads the live position on "ใช้ตำแหน่งตอนนี้". No second
picker button; a share from the gallery keeps no position either (tested), but stays as the easiest way in. **Share from the gallery** (owner: "ทำข้อ 1", 16 Nov 2026): LifeBook is a share target, so photos chosen in Samsung's
Gallery or Google Photos can be shared into `#/snaptest` — whether that route keeps the position is the next device check. Still to run: iPhone and iPads (expected to keep the position) · gazetteer source = … · R3 confirmed by the owner on 16 Nov 2026.
