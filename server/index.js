'use strict';
// Memory Bookshelf server: Express + Postgres + photo bucket (docs/ADR.md). Static PWA in public/.
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const A = require('./auth');
const STORY = require('./story');
const BK = require('./backup');
const PGM = require('./pg');
const BS = require('./bookshelf');
const HH = require('./importer');
const PDF = require('./pdf');

const DATA_DIR = path.resolve(process.env.DATA_DIR || './data');
const PG = PGM.create();
const MEDIA = require('./storage').create(process.env, DATA_DIR);
const clip = (s, n) => String(s == null ? '' : s).slice(0, n);

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');   // children's photos: never in search engines
  next();
});
app.use(A.attachUser);

// Railway healthcheck: "ok" only when Postgres and photo storage answer
app.get('/healthz', async (_req, res) => {
  try {
    await PG.query('SELECT 1');
    await MEDIA.ping();
    res.type('text').send('ok');
  } catch (e) { console.error('healthz', e.message); res.status(503).type('text').send('unhealthy'); }
});
app.get('/robots.txt', (_req, res) => res.type('text').send('User-agent: *\nDisallow: /\n'));

const isSecure = (req) => req.secure || req.headers['x-forwarded-proto'] === 'https';

// relatives' link: /v/<VIEW_TOKEN> → read-only session
app.get('/v/:token', (req, res) => {
  if (!A.VIEW_TOKEN || !A.safeEq(req.params.token, A.VIEW_TOKEN)) return res.status(404).send('Not found');
  A.setCookie(res, A.makeToken('viewer', 'Guest', crypto.randomBytes(6).toString('hex')), isSecure(req));
  res.redirect('/');
});
app.post('/api/login', express.json({ limit: '10kb' }), (req, res) => {
  if (req.headers['x-mb'] !== '1') return res.status(400).json({ error: 'bad-request' });
  const ip = req.ip;
  if (A.throttled(ip)) return res.status(429).json({ error: 'too-many' });
  const code = String((req.body && req.body.code) || '');
  const name = clip((req.body && req.body.name) || '', 24).trim() || 'Family';
  if (!A.FAMILY_CODE || !A.safeEq(code, A.FAMILY_CODE)) { A.noteFail(ip); return res.status(401).json({ error: 'wrong-code' }); }
  A.setCookie(res, A.makeToken('editor', name, crypto.randomBytes(6).toString('hex')), isSecure(req));
  res.json({ ok: true });
});
app.post('/api/logout', (req, res) => { A.clearCookie(res); res.json({ ok: true }); });

// bookshelf API (+ /media photo proxy)
app.use(BS.router({ pool: PG, media: MEDIA, A, ai: STORY }));

// backup / restore (photos included): editors download, the scheduled job uses Bearer BACKUP_TOKEN
app.get('/api/export.zip', A.requireEditor, (req, res, next) => BK.sendZip(res, PG, MEDIA).catch(next));
app.get('/api/backup.zip', (req, res, next) => {
  const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
  if (!A.BACKUP_TOKEN || !m || !A.safeEq(m[1], A.BACKUP_TOKEN)) return res.status(401).json({ error: 'auth' });
  BK.sendZip(res, PG, MEDIA).catch(next);
});
app.post('/api/import', A.requireEditor, async (req, res, next) => {
  let file;
  try {
    file = await BK.receive(req, DATA_DIR, 8e9);
    res.json({ ok: true, ...(await BK.importZip(file, PG, MEDIA)) });
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  } finally { if (file) fs.rm(file, { force: true }, () => {}); }
});

// A4 PDF of a book, rendered by the server (relatives may download it too)
app.get('/api/b/pdf/:trip', A.requireUser, async (req, res, next) => {
  try {
    const t = (await PG.query('SELECT slug, title FROM trips WHERE id=$1 AND family_id=$2', [req.params.trip, BS.FAMILY])).rows[0];
    if (!t) return res.status(404).json({ error: 'trip' });
    const cookie = A.makeToken('viewer', 'PDF', crypto.randomBytes(6).toString('hex'));   // read-only session for the renderer
    const pdf = await PDF.render({ base: `http://127.0.0.1:${PORT}`, cookie, trip: t.slug, footer: `${t.title.en || t.title.th} · ${new Date().toISOString().slice(0, 10)}` });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${t.slug}.pdf"`);
    res.setHeader('Cache-Control', 'no-store');
    res.end(pdf);
  } catch (e) { console.error('pdf', e.message); res.status(503).json({ error: 'pdf-unavailable' }); }
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
app.use(express.static(PUB, { maxAge: 0, etag: true, setHeaders: (res, f) => { if (/\.(woff2|svg|png)$/.test(f)) res.setHeader('Cache-Control', 'public, max-age=604800'); } }));
app.get(/^\/(?!api\/|media\/).*/, (req, res) => res.sendFile(path.join(PUB, 'index.html')));
app.use('/api', (_req, res) => res.status(404).json({ error: 'not-found' }));

app.use((err, _req, res, _next) => { console.error(err.message); if (!res.headersSent) res.status(err.status || 500).json({ error: 'server' }); });

const PORT = +process.env.PORT || 3000;
if (require.main === module) {
  if (!A.FAMILY_CODE) console.warn('WARNING: FAMILY_CODE is not set — nobody can log in. Set it in Railway → Variables.');
  if (process.env.NODE_ENV === 'production' && MEDIA.kind !== 's3') console.warn('WARNING: BUCKET is not set — photos go to local disk and are lost on the next deploy unless /data is a Railway volume.');
  if (!PG) { console.error('DATABASE_URL is not set — add Railway Postgres and reference ${{Postgres.DATABASE_URL}} (locally: see CLAUDE.md)'); process.exit(1); }
  PGM.ready(PG)
    .then(async (n) => { await A.init(PG); const seeds = await BS.syncSeeds(PG); return [n, seeds]; })
    .then(([n, seeds]) => {
      const server = app.listen(PORT, () => console.log(`Memory Bookshelf on :${PORT} · postgres ${n} migrations · ${seeds} seeded trips · photos ${MEDIA.kind}`));
      // Railway sends SIGTERM on every redeploy: stop taking requests, close Chromium + the pool, exit
      const stop = () => {
        setTimeout(() => process.exit(0), 8000).unref();
        server.close();
        Promise.all([PDF.close(), PG.end().catch(() => {})]).then(() => process.exit(0));
      };
      process.once('SIGTERM', stop); process.once('SIGINT', stop);
    })
    .catch((e) => { console.error(e.message); process.exit(1); });
}
module.exports = app;
