# CLAUDE.md — Memory Bookshelf

Family memory bookshelf for Mimi (มีมี่) and Mika (มีก้า): one book per trip. Self-hosted on **Railway**: Node 22 + **Postgres** + photos in a **Railway Storage Bucket**. The owner (Oshinei) writes Thai and wants direct execution, concise replies. UI strings are bilingual (TH/EN) through `L(th, en)`.

Read first: `docs/PRD.md` (scope, approved) · `docs/ADR.md` (stack decisions) · `docs/DESIGN.md` (look = the owner's Trip Operations Manuals) · `docs/handoff/ACCEPTANCE.md` (acceptance criteria). `README.md` is the Thai deploy/usage doc.

## Commands
```bash
npm ci && npx playwright install chromium
docker run -d --name pg -p 5432:5432 -e POSTGRES_PASSWORD=pg postgres:16-alpine   # local Postgres
npm run s3 &                                                                        # optional S3 emulator on :4569
TEST_DATABASE_URL=postgres://postgres:pg@localhost:5432/postgres npm test           # all suites (each group gets a temp DB)
TEST_ONLY=ui TEST_DATABASE_URL=… npm test                                           # one group: infra | bookshelf | ui
# + TEST_S3_ENDPOINT=http://localhost:4569 TEST_S3_KEY=S3RVER TEST_S3_SECRET=S3RVER to also test the bucket adapter (CI does)
DATABASE_URL=postgres://postgres:pg@localhost:5432/mb FAMILY_CODE=hop2027 VIEW_TOKEN=grandma npm start   # http://localhost:3000
npm run check:migrations            # CI "migrations-journaled"
BASE=https://<domain> CODE=<code> VIEW_TOKEN=<token> node test/verify-prod.mjs   # smoke checks against a deploy (THROTTLE=1 locks your IP 10 min)
docker build -t memory-bookshelf .  # same image Railway runs (entrypoint fixes /data ownership, then runs as `node`)
```
UI screenshots go to `$SHOTS` (default `/tmp/mb-shots`) — look at them after UI changes (390/320 px phone, 1440 px desktop, light + dark).

## Architecture (no build step, no framework)
- `server/index.js` Express: login/viewer link, `/healthz` (Postgres + storage), bookshelf router, backup/import, static + SPA fallback. Refuses to boot without `DATABASE_URL`.
- `server/bookshelf.js` the API (`/api/b/*`, `/media/:id(/t)`) + `syncSeeds()`. Everything is scoped by `family_id` (one family in MVP). Writes are idempotent upserts with client ids (offline queue retries safely). mood/fav/note use deterministic ids (`<trip>.mood.d<day>.<kid>`).
- `server/seeds/*.json` trips bundled with the app, in `docs/handoff/trip.schema.json` format + `theme` (DESIGN.md tokens) + per-day plan keys (→ `trip_days.plan`: timeline, moving, pick, planB, money, tips, stay, route, eat, learn, quiz) + `info` (→ `trips.info` pocket guide) + `passport`. Synced on every boot; "Done" marks and app-made trips are kept. AU content was imported from the owner's *The Big Hop* artifact; a test asserts no booking refs/confirmation numbers/costs reach the state.
- `server/migrate.js` + `migrations/NNNN_*.sql` + `migrations/journal.json`: run on boot under an advisory lock; an edited applied migration is refused.
- `server/storage.js` bucket (`BUCKET`, `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `REGION`, `ENDPOINT`) or local disk. Objects `p/<trip>/<id>.jpg` + `t/…` are never public.
- `server/images.js` sharp: EXIF-rotate, strip all metadata/GPS, 2560 px + 520 px thumb. `server/backup.js` complete zip + idempotent restore. `server/auth.js` family code → HMAC cookie `mb` (editor/viewer); secret from `SESSION_SECRET` or Postgres `settings`.
- `server/story.js` bedtime stories via `@anthropic-ai/sdk` (`STORY_MODEL`, default `claude-sonnet-5-5`; `fallbacks: "default"` opted in): only on button press, text facts only (never photos), streamed to the page as SSE by `POST /api/b/story`; disconnect = abort upstream, nothing saved. Tests use a local mock via `ANTHROPIC_BASE_URL`.
- `server/pdf.js` A4 PDF: headless Chromium (Playwright shell installed in the image) prints the app's memory-book route `#/print/<trip>` (views.js `viewPrint`: cover · numbers+map · contents · day pages · firsts · words · passport spread per child · hearts · story · notes · back) with a read-only session; one render at a time. `GET /api/b/pdf/:trip`.
- **New book workflow** (owner's rule): the owner writes the Trip Operations Manual PDF first, then Claude Code builds the seed from it per `docs/NEW-BOOK.md` (`npm run new-book -- …` scaffolds; seeds carry `format: 2`). Format changes never rewrite older books — the renderer stays backward compatible.
- `server/importer.js` + `scripts/import-harbour-hop.mjs`: Harbour Hop app export → bookshelf (dry run by default, idempotent via `external_id`).
- Graceful shutdown on SIGTERM (Railway redeploys): close server, Chromium, pool.
- `public/` vanilla-JS PWA, classic scripts sharing one global scope: `core.js` (state, `api()`, IndexedDB op queue + optimistic `applyLocal`, helpers) → `views.js` (render functions return HTML) → `sheets.js` (actions `A`, photos, lightbox, sheets, boot) → `kid.js` (kid mode, colouring, finger drawing, sounds, read-aloud, bedtime story player, countdown doors, stickers, living map). `app.css` = DESIGN.md tokens; each book sets its theme on `<html>`. `sw.js` (bump `mbs-vN` when shell files change; its `ART` list must name every file under `public/art` — test/infra.mjs checks; shell network-first with a 4 s timeout, art/media/fonts cache-first). Offline copy of the state lives in IndexedDB `kv` (core.js `idb.get/set`); "Keep this book on the phone" (`packOffline`) warms the SW cache with a book's thumbnails, favourites and art.
- Routes: `#/` shelf · `#/t/<trip>` book · `#/t/<trip>/log/<day>` record a day (editors) · `#/t/<trip>/firsts` · `#/passport/<kid>/<trip>` kids' adventure passports (seed `passport`: guides, daily missions, checklists, certificate; ticks = entries kind `tick`, Explorer ID = `field`; a stamp per recorded/Done day; no real passport data) · `#/kid/<kid>/<view>` kid mode (locked; grown-ups hold the 🔒 1.2 s; colouring = field `colour.d<i>`, own stamp = tick `stamp.d<i>`, words read by speechSynthesis; drawings = media ids `dr-<kid>-…` (storage keys allow no dots); before the trip: countdown doors = tick `cd.<n>`, packing = tick `pack.<k>`, from seed `passport.countdown`; family hearts = table `hearts`, the only thing viewers may write; stickers = field `stickers` (JSON `[key,x%,y%,rot]`, earned from stamps/ticks/doors/firsts); living map = seed `passport.map` (hand-placed `x,y` %, `days[i]` = stops visited that day)) · `#/t/<trip>/eat` every place to eat (seed `info.restaurants` = the manual's "Where to eat"; falls back to the day plans' picks/food/eat; search + chips filter in place, never re-render) · `#/notebook` travel notebook (table `reviews`, one per stay/food/place per trip, id `<trip>.rev.<kind>.<slug>`; written from the record page, read across trips) · `#/cap?t=&d=&key=` deep link from the trip-guide app (accepts legacy ids like `hk2026`).

## Conventions and rules (from the owner — keep)
- Use the Edit/Write tools for file changes; never shell heredocs / `Set-Content` for Thai text (mangles UTF-8). Verify the edit landed (OneDrive swap races).
- Flow for every change: implement → `npm test` → commit → PR → wait for **green CI** (test, docker, migrations-journaled) → squash-merge → Railway (connected to this repo) deploys `main` by itself; check `/sw.js` shows the new `mbs-vN`. Never merge on red CI. (The GitHub "Deploy" workflow is a manual fallback only.)
- New migration: check the latest number on `main` first (parallel PRs collide); on conflict keep both journal entries (union) and renumber yours. Never edit a migration that is on `main`.
- Look: follow `docs/DESIGN.md` (the manuals). Fonts: **KIRA UI** for all UI/print; Cormorant Garamond only as the HK display face. Verify on a wide desktop and a phone; auto-fill grids, no horizontal overflow at 320/390 px.
- Children's photos: nothing public, no analytics/third-party scripts, no GPS/EXIF kept, never sent to an AI, no logging of cookies/codes/tokens. No booking numbers / passports in seeds.
- Never re-render over a focused field (`safeRender`) — a late render swaps the box and loses typed text (this bug happened; see `enqueue`).
- Stable keys: planned-place `key`s in seeds are check-in keys; never rename one for a trip that has started — add a new stop instead.

## Gotchas
- Don't `pkill -f`/grep-kill node servers in a shell that runs tests — kill by PID.
- `FAMILY_CODE` unset ⇒ nobody can log in (server only warns).
- Headless Chromium reports `en-US`, so tests see the English UI unless they toggle.
- Docker Hub `minio/minio` is not pullable here; tests use `s3rver` (devDependency) as the S3 emulator.
