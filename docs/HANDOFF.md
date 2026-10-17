# HANDOFF — Memory Book → Railway (for Claude Code)

## Goal
Get this app live on Railway, verified on real phones, with a safe PR/CI workflow around it. Then fill in the Hong Kong–Macau trip details. Owner: Oshinei (Thai speaker, wants direct execution). Read `CLAUDE.md` for architecture and rules.

## State of the code
- Feature-complete v1, all e2e checks pass locally (`npm test`): login, capture with photos, offline queue → upload on reconnect, stamps/medals, kids pages, sealed letters, A5 print book, dark mode, read-only viewer link.
- Built and tested in a Linux sandbox only. **Never run on a real phone, real Safari, or real Railway.** Known unverified areas: iPhone HEIC photo picking, camera capture on iOS, "Add to Home Screen" behaviour, service-worker update flow, large batches of full-size photos over mobile data, Railway volume permissions.
- Not a git repo yet. Initial commit is part of the task below.

## Tasks (in order)
1. **Repo + CI.** `git init`, commit, create a private GitHub repo, push `main`. Confirm `.github/workflows/ci.yml` goes green (job `test` runs `npm test` with Playwright Chromium; job `docker` builds the production image and hits `/healthz`). Fix whatever the first CI run reveals. Protect `main` (PR + green CI required, squash merge).
2. **Railway deploy.** New project → Deploy from GitHub repo (Dockerfile + `railway.json` are detected; healthcheck `/healthz`). Add a **Volume mounted at `/data`** (without it every deploy wipes the photos and DB). Variables: `FAMILY_CODE` (long passphrase), `VIEW_TOKEN` (random 32+ chars, `openssl rand -hex 24`), optional `ANTHROPIC_API_KEY`. Generate a domain. Do **not** commit real values; `.env.example` documents them. Check the first boot log prints `data in /data` and that the volume is writable by the container user (if sharp/SQLite fail with EACCES, fix ownership in the Dockerfile/start command rather than running as root unless there is no alternative).
3. **Production verification** (curl + browser against the real URL): `/healthz` ok; wrong code → 401 and throttle after 10 fails; login works; upload a ≥5 MB JPEG → thumbnail + full image served; GPS/EXIF absent from stored file (`exiftool`); `/v/<VIEW_TOKEN>` gives a read-only session (writes return 403); redeploy and confirm data + photos persist; `/api/export.zip` downloads and contains photos.
4. **Real-device QA** — write the checklist results into the PR/issue; owner will do the phone part, you prepare a step list and a QR/link: iPhone Safari + Android Chrome: install to home screen, camera capture, pick 5+ photos incl. HEIC, airplane-mode capture then reconnect (queue drains, no duplicates), dark mode, text size, language toggle, lightbox swipe, print/PDF of the A5 book from the phone browser. Fix issues found (keep the no-build vanilla architecture).
5. **Hong Kong–Macau trip data** (`server/trips/harbourhop2026.json`). Currently only 6 days with a few places each and no weather/sleep text. Enrich with verified information only (opening hours/prices change — verify; mark unknowns instead of guessing): per-day `wx`, `sleep`, extra stops (`kind: "place"|"food"`, optional `meal`: Breakfast/Lunch/Dinner/Treat; bilingual `en`/`th`). Source facts from the owner:
   - Party: 2 adults + 2 kids (Mimi ≈3, Mika ≈1.5 at travel time). Public transport preferred for both airport transfers.
   - Flights: TG 638 BKK 14:00 → HKG 17:45 Sat 5 Dec 2026; TG 639 HKG 18:55 → BKK 20:55 Thu 10 Dec.
   - Hotels: Noah's Ark Hotel & Resort, Ma Wan (5–7 Dec); Studio City Hotel, Cotai (7–10 Dec).
   - Plan: D1 arrive + dinner near hotel · D2 Hong Kong Disneyland (kids' rest block) · D3 HZMB bridge bus to Macau, The Londoner free shuttle, walk to Studio City, short water-park session after nap (water park open 7 Dec only; whether free with the room is unconfirmed) · D4 Nickelodeon Town playground + Senado Square · D5 kids' day: pandas, Coloane, teamLab · D6 ferry back, shaved ice at Shari Shari (Causeway Bay), luggage at Shun Tak Centre, airport.
   - Never rename an existing stop `key`; only add. Keep the `cover`/`art:false` fields.
6. **Backups.** Add an automated off-site backup path (e.g. a scheduled GitHub Action or Railway cron that pulls `/api/export.zip` with a service credential, or documented manual monthly download). Prefer something that needs no secret stored in the repo. Document restore (there is currently no import endpoint — add `POST /api/import` from export.zip, editor-only, idempotent, if you do automated backups).
7. **Optional / later:** per-kid PDF generated server-side (currently browser print of `#/book/<trip>/<kid>`); web-push reminders; per-trip `art` generation for new trips; import of existing phone photos by date.

## Acceptance checklist (tick in the final PR)
- [ ] CI green on `main`; branch protection on
- [ ] Production URL reachable, HTTPS, `/healthz` ok
- [ ] Volume at `/data` confirmed by a redeploy that kept data
- [ ] Login, throttle, viewer link (read-only) verified in production
- [ ] Uploaded photo has no EXIF/GPS; thumbnail + full served
- [ ] `/api/export.zip` verified
- [ ] iPhone + Android install and capture (owner confirms)
- [ ] Offline capture drains once online, no duplicates
- [ ] No secrets in git history (`git log -p | grep -i -E "FAMILY_CODE|VIEW_TOKEN"` shows only `.env.example`/docs)
- [ ] After deploy, send the owner the production URL and the relatives' link format `https://<domain>/v/<VIEW_TOKEN>` (do not paste the token itself into PR text; give it to the owner privately)

## After go-live: tell Claude (chat) the production URL
The trip-guide app (a separate Claude Artifact, built by `trip/build_app.py` in the trip kit) has a `book_url.txt`. When it contains the Railway URL, the guide shows 📷 buttons per stop and a Home card that deep-link to `#/cap?t=<trip>&d=<day>&key=<stop>` here. That rebuild happens in the Claude chat, not in this repo — just give the owner the URL.

## Paste-ready prompt for Claude Code
```
อ่าน CLAUDE.md และ docs/HANDOFF.md ในโปรเจกต์นี้ แล้วทำตามลำดับ Tasks 1–3 ก่อน
(repo + CI เขียว → deploy Railway พร้อม Volume /data → ตรวจ production)
ทุกการเปลี่ยนแปลง: เขียนเทสต์/รัน npm test → commit → PR → รอ CI เขียว → squash merge
ห้าม commit ค่า FAMILY_CODE / VIEW_TOKEN จริง ใช้ .env.example เท่านั้น
ถ้าต้องให้ฉันทำเอง (กดใน Railway dashboard, ทดสอบบนมือถือ) ให้เขียนเป็นขั้นตอนสั้นๆ ภาษาไทย
จบแล้วสรุปเป็นข้อๆ: URL, สิ่งที่ผ่าน/ไม่ผ่านใน Acceptance checklist, และสิ่งที่ค้าง
```
