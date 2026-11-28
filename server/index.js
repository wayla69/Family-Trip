'use strict';
// Memory Bookshelf server: Express + Postgres + photo bucket (docs/ADR.md). Static PWA in public/.
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const A = require('./auth');
const STORY = require('./story');
const BK = require('./backup');
const { health } = require('./health');
const PGM = require('./pg');
const BS = require('./bookshelf');
const EMOJI = require('./emoji');
const HH = require('./importer');
const PDF = require('./pdf');
const PUSH = require('./push');
const WX = require('./weather');
const STOCK = require('./stock');

const DATA_DIR = path.resolve(process.env.DATA_DIR || './data');
const PG = PGM.create();
const MEDIA = require('./storage').create(process.env, DATA_DIR);
const clip = (s, n) => String(s == null ? '' : s).slice(0, n);

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
// what went wrong on the server and what was slow, counted per kind of request (server/watch.js) — the first thing every request passes
const WATCH = require('./watch').create({ pool: PG, A });
app.use(WATCH.mw);
// one ceiling for the whole API per address (a stolen cookie or a stuck phone cannot hammer the database or the storage); far above a
// family's use — a phone polls every 30 s, a big photo upload is one request a photo. The server's own Chromium (PDF, film cards) and
// the tests come from this machine and are not counted. The sign-in has its own, stricter throttle (auth.js).
const { rateLimit } = require('express-rate-limit');
app.use(['/api', '/media', '/v'], rateLimit({ windowMs: 60e3, limit: +process.env.API_RATE_PER_MIN || 1200, standardHeaders: 'draft-8', legacyHeaders: false,
  skip: (req) => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.ip), handler: (_req, res) => res.status(429).json({ error: 'too-many' }) }));

// CSP: only our own origin. No inline scripts exist; style 'unsafe-inline' is for the style="" attributes the views render;
// blob:/data: images are queued photos and drawings shown before upload. Maps open as plain links (no frames).
const CSP = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' data: blob:; " +
  "font-src 'self'; connect-src 'self'; worker-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'";
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', CSP);
  if (req.secure) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');   // children's photos: never in search engines
  next();
});
app.use(A.attachUser);

// Railway's deploy health check (Postgres); ?full=1 adds photo storage for the uptime alert — see server/health.js
app.get('/healthz', async (req, res) => {
  const h = await health(PG, MEDIA, req.query.full === '1');
  if (h.ok) return res.type('text').send('ok');
  console.error('healthz', h.why); res.status(503).type('text').send('unhealthy');
});
app.get('/robots.txt', (_req, res) => res.type('text').send('User-agent: *\nDisallow: /\n'));

const isSecure = (req) => req.secure || req.headers['x-forwarded-proto'] === 'https';

// relatives' link: /v/<VIEW_TOKEN> (sees every book) or a group's own link (sees the group's books) → read-only session
app.get('/v/:token', async (req, res, next) => {
  try {
    const tok = String(req.params.token);
    if (A.VIEW_TOKEN && A.safeEq(tok, A.VIEW_TOKEN)) {
      const uid = crypto.randomBytes(6).toString('hex');
      A.setCookie(res, A.makeToken('viewer', 'Guest', uid), isSecure(req));
      await A.noteSession({ uid, role: 'viewer', name: 'Guest', ua: req.headers['user-agent'], family: BS.FAMILY });
      return res.redirect('/');
    }
    const g = /^[A-Za-z0-9_-]{24,64}$/.test(tok) && (await PG.query('SELECT id, name FROM viewer_groups WHERE link_token=$1 AND family_id=$2', [tok, BS.FAMILY])).rows[0];
    if (!g) return res.status(404).send('Not found');
    const uid = crypto.randomBytes(6).toString('hex');
    A.setCookie(res, A.makeToken('viewer', g.name.slice(0, 24), uid, g.id), isSecure(req));
    await A.noteSession({ uid, role: 'viewer', name: g.name, group: g.id, ua: req.headers['user-agent'], family: BS.FAMILY });
    res.redirect('/');
  } catch (e) { next(e); }
});
app.post('/api/login', express.json({ limit: '10kb' }), async (req, res, next) => {
  if (req.headers['x-mb'] !== '1') return res.status(400).json({ error: 'bad-request' });
  const ip = req.ip;
  if (A.throttled(ip)) return res.status(429).json({ error: 'too-many' });
  const code = String((req.body && req.body.code) || '');
  const name = clip((req.body && req.body.name) || '', 24).trim() || 'Family';
  // the family PIN writes; the relatives' PIN (VIEW_PIN) and each group's own PIN only read — all share the throttle
  let role = A.isFamilyCode(code) ? 'editor' : A.VIEW_PIN && A.safeEq(code, A.VIEW_PIN) ? 'viewer' : null, group = null;
  if (!role && /^\d{6,12}$/.test(code)) {
    try { group = (await PG.query('SELECT id, name FROM viewer_groups WHERE pin_hash=$1 AND family_id=$2', [A.pinHash(code), BS.FAMILY])).rows[0] || null; } catch (e) { return next(e); }
    if (group) role = 'viewer';
  }
  if (!role) { A.noteFail(ip); return res.status(401).json({ error: 'wrong-code' }); }
  const who = role === 'viewer' && name === 'Family' ? (group ? group.name.slice(0, 24) : 'Guest') : name;
  const uid = crypto.randomBytes(6).toString('hex');
  A.setCookie(res, A.makeToken(role, who, uid, group && group.id), isSecure(req));
  await A.noteSession({ uid, role, name: who, group: group && group.id, ua: req.headers['user-agent'], family: BS.FAMILY });
  res.json({ ok: true, role });
});
app.post('/api/logout', async (req, res) => {   // this phone's row goes too (the parents' list shows only phones still signed in)
  if (req.user) await PG.query('DELETE FROM sessions WHERE uid=$1', [req.user.uid]).catch(() => {});
  A.clearCookie(res); res.json({ ok: true });
});
// the phones signed in, and the family code (server/devices.js)
app.use(require('./devices').router({ pool: PG, A, family: BS.FAMILY }));

// bookshelf API (+ /media photo proxy)
const HOOKS = {};   // filled below once the push scheduler exists
// passkeys: a parent's phone signs in with Face ID or a fingerprint (server/passkey.js)
const PASSKEY = require('./passkey').create({ pool: PG, A, family: BS.FAMILY, isSecure, appName: async () => { const b = await BS.brand(PG); return b.app.en || b.app.th; } });
app.use(PASSKEY.router);
HOOKS.passkeys = () => PASSKEY.count();
// a book's own film (server/reel.js): its cards are the app's #/reelcards page, photographed by the PDF's Chromium with a read-only session
const REEL = require('./reel').create({ pool: PG, media: MEDIA, A, family: BS.FAMILY,
  cards: (trip, lang, days, caps, at) => PDF.cards({ base: `http://127.0.0.1:${PORT}`, cookie: A.makeToken('viewer', 'REEL', crypto.randomBytes(6).toString('hex')), trip, lang, days, caps, path: at }),
  done: (x) => HOOKS.reel && HOOKS.reel(x) });
HOOKS.home = (x) => REEL.home(x);   // "we're home" on a book from photos: its film is made by itself
app.use(REEL.router);
// photos from the relatives, waiting for a parent's yes (server/inbox.js)
app.use(require('./inbox').router({ pool: PG, media: MEDIA, A, family: BS.FAMILY, hooks: HOOKS }));
// letters to open in the future (server/capsule.js)
app.use(require('./capsule').router({ pool: PG, A, family: BS.FAMILY }));
// a book as one HTML file to keep for ever (server/keep.js)
app.use(require('./keep').router({ pool: PG, media: MEDIA, A, family: BS.FAMILY, stock: require('./stock') }));
// the family map: every town of every book the viewer may see (server/famap.js)
app.use(require('./famap').router({ pool: PG, A, family: BS.FAMILY }));
// what went wrong on the family's phones, and how much room the books take (server/errors.js)
app.use(WATCH.router);
app.use(require('./orphans').create({ pool: PG, media: MEDIA, A, hooks: HOOKS }).router);   // files no row names any more (room page)
app.use(require('./errors').create({ pool: PG, media: MEDIA, A, family: BS.FAMILY, reelKey: REEL.key }).router);
app.use(BS.router({ pool: PG, media: MEDIA, A, ai: STORY, hooks: HOOKS }));

// reminders on the trip: phones that switched them on get a push 30 min before each timed step of the day
const REMIND = PUSH.create({ pool: PG, family: BS.FAMILY, A });
HOOKS.heart = (h) => REMIND.heart(h);   // a relative's heart nudges the parents' phones
HOOKS.comment = (c) => REMIND.comment(c);   // a relative's line under a photo, the same
HOOKS.draft = (x) => REMIND.draft(x);
HOOKS.reel = (x) => REMIND.reel(x);
HOOKS.closed = (x) => REMIND.closed(x);   // the web check of a coming book found a place closed or moved
HOOKS.inbox = (x) => REMIND.inbox(x);   // a relative sent photos: a nudge to the parents' phones   // the film made by itself is ready: a push to the parents' phones   // the helper finished a photo book's draft: "ready to check" on the parents' phones
app.use(REMIND.router);
// the owner hears when something goes wrong: problems on the phones, room running out, the nightly copy failing (server/alerts.js)
const ALERTS = require('./alerts').create({ pool: PG, A, family: BS.FAMILY, push: REMIND, dataDir: DATA_DIR, bucket: MEDIA.kind === 's3', watch: WATCH });
app.use(ALERTS.router);

// backup / restore (photos included): editors download, the scheduled job uses Bearer BACKUP_TOKEN
app.get('/api/export.zip', A.requireEditor, (req, res, next) => BK.sendZip(res, PG, MEDIA).catch(next));
app.get('/api/backup.zip', (req, res, next) => {
  const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
  if (!A.BACKUP_TOKEN || !m || !A.safeEq(m[1], A.BACKUP_TOKEN)) return res.status(401).json({ error: 'auth' });
  BK.sendZip(res, PG, MEDIA).catch(next);
});
// the nightly backup job asks first: is a trip on (from the day before it starts to two days after it ends)? Only then a nightly
// copy is worth taking; otherwise the weekly one is enough. Same Bearer token; answers only yes/no.
app.get('/api/backup/due', async (req, res, next) => {
  const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
  if (!A.BACKUP_TOKEN || !m || !A.safeEq(m[1], A.BACKUP_TOKEN)) return res.status(401).json({ error: 'auth' });
  try {
    const { rows } = await PG.query('SELECT EXISTS (SELECT 1 FROM trips WHERE current_date BETWEEN date_from - 1 AND date_to + 2) AS due');
    res.json({ due: rows[0].due });
  } catch (e) { next(e); }
});
app.post('/api/import', A.requireEditor, async (req, res, next) => {
  let file;
  // the uploaded zip is removed before the answer goes out (a test read the folder right after a refused upload and found it)
  const drop = async () => { if (file) { await fs.promises.rm(file, { force: true }).catch(() => {}); file = null; } };
  try {
    file = await BK.receive(req, DATA_DIR, 8e9);
    const out = await BK.importZip(file, PG, MEDIA);
    await drop(); res.json({ ok: true, ...out });
  } catch (e) {
    await drop();
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

// A4 PDF of a year's books (views.js viewYearBook; editors — a relatives' group may not see every book of the year)
app.get('/api/b/pdf-year/:y', A.requireEditor, async (req, res, next) => {
  try {
    if (!/^\d{4}$/.test(req.params.y)) return res.status(404).json({ error: 'year' });
    const n = (await PG.query('SELECT count(*)::int n FROM trips WHERE family_id=$1 AND extract(year FROM date_from)=$2', [BS.FAMILY, +req.params.y])).rows[0].n;
    if (!n) return res.status(404).json({ error: 'year' });
    const cookie = A.makeToken('viewer', 'PDF', crypto.randomBytes(6).toString('hex'));
    const pdf = await PDF.render({ base: `http://127.0.0.1:${PORT}`, cookie, route: `printyear/${req.params.y}`, footer: `${req.params.y} · ${new Date().toISOString().slice(0, 10)}` });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="year-${req.params.y}.pdf"`);
    res.setHeader('Cache-Control', 'no-store');
    res.end(pdf);
  } catch (e) { next(e); }
});
// A4 PDF of a book, rendered by the server (relatives may download it too)
app.get('/api/b/pdf/:trip', A.requireUser, async (req, res, next) => {
  try {
    if (!A.canSee(req.user, req.params.trip)) return res.status(404).json({ error: 'trip' });
    const t = (await PG.query('SELECT slug, title FROM trips WHERE id=$1 AND family_id=$2', [req.params.trip, BS.FAMILY])).rows[0];
    if (!t) return res.status(404).json({ error: 'trip' });
    const cookie = A.makeToken('viewer', 'PDF', crypto.randomBytes(6).toString('hex'));   // read-only session for the renderer
    const size = req.query.size === 'a5' ? 'a5' : 'a4', shop = req.query.shop === '1';   // A5, and a print shop's copy without our page footer
    const pdf = await PDF.render({ base: `http://127.0.0.1:${PORT}`, cookie, trip: t.slug, size, shop, footer: `${t.title.en || t.title.th} · ${new Date().toISOString().slice(0, 10)}` });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${t.slug}${size === 'a5' ? '-a5' : ''}${shop ? '-print' : ''}.pdf"`);
    res.setHeader('Cache-Control', 'no-store');
    res.end(pdf);
  } catch (e) { console.error('pdf', e.message); res.status(503).json({ error: 'pdf-unavailable' }); }
});

// live forecast for each day of a book (Today page): Open-Meteo asked with the stays' town-level coordinates only — server/weather.js
app.get('/api/b/wx/:trip', A.requireUser, async (req, res, next) => {
  try {
    if (!A.canSee(req.user, req.params.trip)) return res.status(404).json({ error: 'trip' });
    const t = (await PG.query('SELECT id, timezone FROM trips WHERE id=$1 AND family_id=$2', [req.params.trip, BS.FAMILY])).rows[0];
    if (!t) return res.status(404).json({ error: 'trip' });
    const days = (await PG.query("SELECT to_char(date,'YYYY-MM-DD') date, plan->'stay'->'ll' ll FROM trip_days WHERE trip_id=$1 ORDER BY day_index", [t.id])).rows;
    res.setHeader('Cache-Control', 'private, max-age=1800');
    res.json({ trip: t.id, at: Date.now(), days: await WX.forecast(days, t.timezone) });
  } catch (e) { next(e); }
});

// more pictures for kid mode's colouring page: the stock library's colouring pictures of the places the book names (server/stock.js)
app.get('/api/b/colour/:trip', A.requireUser, async (req, res, next) => {
  try {
    if (!A.canSee(req.user, req.params.trip)) return res.status(404).json({ error: 'trip' });
    const t = (await PG.query('SELECT id, title, sub FROM trips WHERE id=$1 AND family_id=$2', [req.params.trip, BS.FAMILY])).rows[0];
    if (!t) return res.status(404).json({ error: 'trip' });
    const days = (await PG.query('SELECT title FROM trip_days WHERE trip_id=$1 ORDER BY day_index', [t.id])).rows;
    const words = (o) => (o && typeof o === 'object' ? [o.en, o.th].filter(Boolean).join(' \n ') : String(o || ''));
    const title = [words(t.title), words(t.sub)].join(' \n '), text = [title, ...days.map((d) => words(d.title))].join(' \n ');
    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.json({ trip: t.id, pics: STOCK.colourFor(text, title) });
  } catch (e) { next(e); }
});

// import from the Harbour Hop app (zip of moments/visits/days + assets); ?dry=1 reports without writing
app.post('/api/b/import/harbour-hop', A.requireEditor, async (req, res, next) => {
  let file;
  try {
    file = await BK.receive(req, DATA_DIR, 4e9);
    res.json({ ok: true, ...(await HH.run(file, PG, MEDIA, { dry: req.query.dry === '1' })) });
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  } finally { if (file) fs.rm(file, { force: true }, () => {}); }
});

// static PWA
const PUB = path.join(__dirname, '..', 'public');
const GEO_DIR = path.join(PUB, 'geo');   // each country's place names (scripts/geo/build.mjs): read on the phone, cached apart from the app shell
// the service worker serves the app shell from its cache first (instant open, even on hotel wifi), so a changed file must
// change sw.js too: its cache name carries a hash of every file under public/, a forgotten mbs-vN bump can't strand a phone
const SW = (() => {
  const h = crypto.createHash('sha1');
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1)).forEach((e) => {
    const f = path.join(d, e.name);
    if (e.isDirectory()) { if (f !== STOCK.DIR && f !== GEO_DIR) walk(f); } else if (e.name !== 'sw.js') h.update(e.name).update(fs.readFileSync(f));
  });   // public/stock and public/geo are left out: a new city's pictures are not a new app shell (they have their own cache, docs/STOCK-ART.md §5.2)
  walk(PUB);
  const tag = h.digest('hex').slice(0, 10);
  return fs.readFileSync(path.join(PUB, 'sw.js'), 'utf8').replace(/const V = '(mbs-v\d+)'/, `const V = '$1-${tag}'`);
})();
// the web app manifest carries the family's own app name (Add to Home Screen), the rest as in public/manifest.webmanifest
const MANIFEST = JSON.parse(fs.readFileSync(path.join(PUB, 'manifest.webmanifest'), 'utf8'));
app.get('/manifest.webmanifest', async (_req, res) => {
  const m = { ...MANIFEST };
  try { const b = await BS.brand(PG); m.name = m.short_name = b.app.en || b.app.th || m.name; } catch (_) { /* the stock name */ }
  res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8'); res.setHeader('Cache-Control', 'no-cache'); res.end(JSON.stringify(m));
});
app.post('/share', (_req, res) => res.redirect(303, '/#/snap?shared=0'));   // a share before the service worker is in place: open the book-from-photos page (the photos were not kept)
app.get('/sw.js', (_req, res) => { res.setHeader('Content-Type', 'text/javascript; charset=utf-8'); res.setHeader('Cache-Control', 'no-cache'); res.end(SW); });
// the stock art library: versioned file names (name.v2.svg), so a file never changes — a year's cache; a missing one is a 404, never the app page
app.use('/stock', express.static(STOCK.DIR, { index: false, fallthrough: true, setHeaders: (res, f) => { res.setHeader('Cache-Control', f.endsWith('index.json') ? 'no-cache' : 'public, max-age=31536000, immutable'); if (f.endsWith('.svg')) res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'"); } }));
app.use('/stock', (_req, res) => res.status(404).end());
app.use('/geo', express.static(GEO_DIR, { index: false, fallthrough: true, setHeaders: (res) => res.setHeader('Cache-Control', 'public, max-age=604800') }));
app.use('/geo', (_req, res) => res.status(404).end());
// an older Safari (iPadOS 15, 16.0–16.1) gets app.css with every color-mix() resolved (server/legacycss.js); core.js asks for it only there
const LEGACY_CSS = require('./legacycss').legacy(fs.readFileSync(path.join(PUB, 'app.css'), 'utf8'));
app.get('/app-legacy.css', (_req, res) => { res.setHeader('Content-Type', 'text/css; charset=utf-8'); res.setHeader('Cache-Control', 'no-cache'); res.end(LEGACY_CSS); });
app.use(express.static(PUB, { maxAge: 0, etag: true, setHeaders: (res, f) => { if (/\.(woff2|svg|png)$/.test(f)) res.setHeader('Cache-Control', 'public, max-age=604800'); } }));
app.get(/^\/(?!api\/|media\/|stock\/).*/, (req, res) => res.sendFile(path.join(PUB, 'index.html')));
app.use('/api', (_req, res) => res.status(404).json({ error: 'not-found' }));

app.use((err, _req, res, _next) => { console.error(err.message); if ((err.status || 500) >= 500) WATCH.error(err, res); if (!res.headersSent) res.status(err.status || 500).json({ error: 'server' }); });

const PORT = +process.env.PORT || 3000;
if (require.main === module) {
  if (!A.FAMILY_CODE) console.warn('WARNING: FAMILY_CODE is not set — nobody can log in. Set it in Railway → Variables.');
  else if (A.FAMILY_CODE.length < 6) console.warn('WARNING: FAMILY_CODE is shorter than 6 characters — use a PIN of at least 6 digits.');
  if (process.env.VIEW_PIN && !A.VIEW_PIN) console.warn('WARNING: VIEW_PIN equals FAMILY_CODE — ignored (relatives would get the family write access). Pick a different PIN.');
  else if (A.VIEW_PIN && A.VIEW_PIN.length < 6) console.warn('WARNING: VIEW_PIN is shorter than 6 characters — use at least 6 digits.');
  const bt = (process.env.BACKUP_TOKEN || '').trim();   // never print the token itself, only whether it can work
  if (!bt) console.warn('NOTE: BACKUP_TOKEN is not set — the weekly off-site backup (GitHub Action) cannot download anything.');
  else if (!A.BACKUP_TOKEN) console.warn(`WARNING: BACKUP_TOKEN is only ${bt.length} characters — it needs 24 or more, so /api/backup.zip stays off.`);
  else console.log('backup endpoint on (BACKUP_TOKEN set)');
  if (process.env.NODE_ENV === 'production' && MEDIA.kind !== 's3') console.warn('WARNING: BUCKET is not set — photos go to local disk and are lost on the next deploy unless /data is a Railway volume.');
  if (!PG) { console.error('DATABASE_URL is not set — add Railway Postgres and reference ${{Postgres.DATABASE_URL}} (locally: see CLAUDE.md)'); process.exit(1); }
  PGM.ready(PG)
    .then(async (n) => { await A.init(PG); await PUSH.init(PG); const seeds = await BS.syncSeeds(PG); await EMOJI.seed(PG, BS.FAMILY); await BS.eatSyncAll(PG); return [n, seeds]; })
    .then(([n, seeds]) => {
      REMIND.start(); ALERTS.start();
      // what older photos look like (migration 0029), filled in the background a few at a time: the "already in the book?" check covers them too
      setTimeout(() => BS.backfillPh(PG, MEDIA).then((k) => { if (k) console.log(`photo look-alike prints filled in: ${k}`); }).catch((e) => console.error('backfill ph', e.message)), 8000).unref();
      const server = app.listen(PORT, () => console.log(`Memory Bookshelf on :${PORT} · postgres ${n} migrations · ${seeds} seeded trips · photos ${MEDIA.kind}`));
      // Railway sends SIGTERM on every redeploy: stop taking requests, close Chromium + the pool, exit
      const stop = () => {
        setTimeout(() => process.exit(0), 8000).unref();
        server.close(); REMIND.stop();
        Promise.all([PDF.close(), PG.end().catch(() => {})]).then(() => process.exit(0));
      };
      process.once('SIGTERM', stop); process.once('SIGINT', stop);
    })
    .catch((e) => { console.error(e.message); process.exit(1); });
}
module.exports = app;
