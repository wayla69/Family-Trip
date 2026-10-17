# CLAUDE.md — Memory Book

Family memory book for Mimi (มีมี่) and Mika (มีก้า) across many trips. Self-hosted on **Railway** (Node 22 + SQLite on a volume at `/data`). The owner (Oshinei) writes Thai and wants direct execution, concise replies. UI strings are bilingual (TH/EN) through `L(th, en)`.

Read `docs/HANDOFF.md` first for the task backlog and acceptance checklist. `README.md` is the user-facing deploy/usage doc (Thai + English).

## Commands
```bash
npm ci
npx playwright install chromium     # once
npm run dev                         # http://localhost:3000  code hop2027 · read-only link /v/grandma
npm test                            # test/run.mjs: temp DATA_DIR + free port + Playwright e2e (light, dark, offline queue, viewer, book)
docker build -t memory-book .       # same Dockerfile Railway uses (entrypoint chowns /data, then runs as `node`)
BASE=https://<domain> CODE=<code> VIEW_TOKEN=<token> node test/verify-prod.mjs   # HANDOFF task 3 checks against a deploy (THROTTLE=1 locks your IP 10 min)
```
Screenshots from the e2e test go to `$SHOTS` (default `/tmp/mb-shots`) — look at them after UI changes (light + dark, 390px phone and ≥1440px desktop).

## Architecture (no build step, no framework)
- `server/index.js` Express 4 REST API + static + SPA fallback. `server/db.js` better-sqlite3 (WAL) schema. `server/auth.js` family-code login → HMAC-signed cookie `mb` (role editor/viewer). `server/images.js` sharp: EXIF-rotate, strip all metadata/GPS, 2560px full + 520px thumb. `server/story.js` optional Anthropic call (only when `ANTHROPIC_API_KEY` is set).
- `server/trips/*.json` = trips bundled with the app (`bighop2027`, `harbourhop2026`). Trips created in the app live in table `trips_extra`. `loadTrips()` returns all trips sorted by `start` (earliest first). Optional per-trip fields: `cover: [c1,c2]` (gradient), `art: false` (no day SVG art, use emoji), `custom: true` (app-created).
- `public/` vanilla-JS PWA: classic `<script>`s sharing one global scope — `core.js` (state, `api()`, IndexedDB offline queue, helpers, router) → `views.js` (render functions return HTML strings) → `sheets.js` (bottom sheets, capture flow, `A` action map, global event delegation, boot). `sw.js` service worker (bump the cache name `mb-vN` when shipped shell files change). Hash routing: `#/`, `#/trip/<id>`, `#/stamps`, `#/kids`, `#/letters`, `#/book/<trip>/<kid>`, `#/cap?t=&d=&key=` (deep link from the trip-guide app that opens the capture sheet).
- `GET /api/state` returns everything in one payload (cached in localStorage for offline). All writes need header `x-mb: 1` (CSRF) and role editor; writes are idempotent (client-generated ids) so the offline queue can retry safely.
- Backup/restore in `server/backup.js`: `backup.json` = raw tables. `GET /api/backup.zip` (Bearer `BACKUP_TOKEN`) is complete; editor `export.zip` omits other authors' sealed letters. `POST /api/import` is editor-only and `INSERT OR IGNORE` (never overwrites); keep `TABLES` in FK order when adding tables. `.github/workflows/backup.yml` only runs on a private repo.
- Letters are sealed **server-side**: text is withheld from everyone but the author until `open_at`.

## Conventions and rules (from the owner — keep)
- Use the Edit/Write tools for file changes; never shell heredocs / `Set-Content` for Thai text (mangles UTF-8). After writing, verify the edit landed (OneDrive swap races).
- Flow for every change: implement → `npm test` → commit → open PR → wait for **green CI** → squash-merge → Railway auto-deploys from `main`. Never merge on red CI.
- The font is **KIRA UI** (Regular/Medium/SemiBold/Bold, in `public/fonts/`) for all UI and printed output. Do not replace it.
- UI sizing: verify on a wide desktop screen as well as a phone; use auto-fill grids rather than fixed columns. No horizontal overflow at 360/390px; no dropped or near-empty print pages in the A5 book view.
- Child photos are sensitive: nothing public, no analytics/third-party scripts, no GPS/EXIF kept, no logging of cookies/codes/tokens.
- DB changes: the schema in `db.js` uses `CREATE TABLE IF NOT EXISTS`. Any change to an existing table needs an additive, idempotent migration that runs on boot (existing production data lives on the volume and must never be lost). If you add numbered migration files, check the latest number on `main` first — parallel PRs collide — and resolve journal/triage files by union.
- Stable keys: stop `key`s in trip JSON are the foreign key for check-in stamps. Never rename a key of a trip that has started; add new stops instead.

## Gotchas
- Don't run `pkill -f` patterns that can match your own shell; kill by PID.
- Test server must not be started in the same process group you will kill.
- `FAMILY_CODE` unset ⇒ nobody can log in (server only warns). `SESSION_SECRET` is auto-generated into `DATA_DIR/.session-secret` when not set — keep the volume.
- Service worker caches `/img`, `/art`, `/fonts` cache-first; `/api` is never cached.
- Test files may use sandbox-only browser paths; `CHROME=/path` overrides.
