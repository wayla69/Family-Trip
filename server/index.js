'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const archiver = require('archiver');
const { db, DATA_DIR } = require('./db');
const A = require('./auth');
const IMG = require('./images');
const STORY = require('./story');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

const ID_RE = /^[A-Za-z0-9_-]{4,48}$/;
const now = () => Date.now();
const j = (s, d) => { try { return JSON.parse(s); } catch (_) { return d; } };
const clip = (s, n) => String(s == null ? '' : s).slice(0, n);

// ---------- trips: bundled JSON + trips created in the app ----------
function loadTrips() {
  const dir = path.join(__dirname, 'trips');
  const out = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) out.push(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
  for (const r of db.prepare('SELECT json FROM trips_extra ORDER BY at').all()) out.push(JSON.parse(r.json));
  return out.sort((a, b) => String(a.start).localeCompare(String(b.start)));   // chronological: earliest trip first
}
const PALETTE = [['#FFE3EE', '#E0529C'], ['#FFF0D6', '#FF8A1F'], ['#DDF6F1', '#14C2A3'], ['#E3ECFF', '#3D7BFF'], ['#EEE5FF', '#8B5CF6'], ['#FFF6C9', '#E0A800']];

// ---------- middleware ----------
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});
app.use(A.attachUser);
app.get('/healthz', (_req, res) => res.type('text').send('ok'));

const isSecure = (req) => req.secure || req.headers['x-forwarded-proto'] === 'https';

// viewer link:  /v/<VIEW_TOKEN>  → read-only session
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

// ---------- state (one small payload; the app caches it for offline) ----------
function buildState(user) {
  const kids = db.prepare('SELECT id, th, en, color, emoji, birth FROM kids ORDER BY pos').all();
  const photoRows = db.prepare('SELECT id, mem, w, h FROM photos ORDER BY pos, at').all();
  const photosBy = {};
  for (const p of photoRows) (photosBy[p.mem] = photosBy[p.mem] || []).push({ id: p.id, w: p.w, h: p.h });
  const memories = db.prepare('SELECT * FROM memories ORDER BY at').all().map((m) => ({
    id: m.id, trip: m.trip, day: m.day, kids: j(m.kids, []), mood: j(m.mood, {}), text: m.text, stop: j(m.stop, null),
    at: m.at, by: m.by, mine: m.uid === user.uid, photos: photosBy[m.id] || [],
  }));
  const checkins = db.prepare('SELECT trip, key, day, kind, name, at, by FROM checkins ORDER BY at').all();
  const stories = db.prepare('SELECT trip, day, lang, text, at FROM stories').all();
  const tripkid = db.prepare('SELECT * FROM tripkid').all();
  const today = new Date().toISOString().slice(0, 10);
  const letters = db.prepare('SELECT * FROM letters ORDER BY open_at, at').all().map((l) => {
    const open = l.open_at <= today, mine = l.uid === user.uid;
    return { id: l.id, to: l.to_kid, title: l.title, open_at: l.open_at, at: l.at, by: l.by, open, mine,
      text: open || mine ? l.text : null };
  });
  return { me: { role: user.role, name: user.name, uid: user.uid }, kids, trips: loadTrips(), memories, checkins, stories, tripkid, letters,
    features: { story: STORY.enabled() }, serverNow: now() };
}
app.get('/api/state', A.requireUser, (req, res) => { res.setHeader('Cache-Control', 'no-store'); res.json(buildState(req.user)); });

// ---------- writes (editors only; X-MB header required) ----------
const json = express.json({ limit: '200kb' });
const W = [A.requireEditor, json];

function upsertMemory(req, res) {
  const id = req.params.id; if (!ID_RE.test(id)) return res.status(400).json({ error: 'id' });
  const b = req.body || {};
  const kids = (Array.isArray(b.kids) ? b.kids : []).filter((k) => /^[a-z0-9_-]{1,24}$/.test(k)).slice(0, 8);
  const mood = {}; if (b.mood && typeof b.mood === 'object') for (const k of kids) if (b.mood[k]) mood[k] = clip(b.mood[k], 8);
  const stop = b.stop && b.stop.name ? { key: clip(b.stop.key || b.stop.name, 120), name: clip(b.stop.name, 120), kind: b.stop.kind === 'food' ? 'food' : 'place' } : null;
  const ex = db.prepare('SELECT uid FROM memories WHERE id=?').get(id);
  if (ex) {
    db.prepare('UPDATE memories SET day=?, kids=?, mood=?, text=?, stop=? WHERE id=?')
      .run(Math.max(0, Math.min(400, +b.day || 0)), JSON.stringify(kids), JSON.stringify(mood), clip(b.text, 4000), stop ? JSON.stringify(stop) : null, id);
  } else {
    db.prepare('INSERT INTO memories (id, trip, day, kids, mood, text, stop, at, by, uid) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .run(id, clip(b.trip, 60), Math.max(0, Math.min(400, +b.day || 0)), JSON.stringify(kids), JSON.stringify(mood), clip(b.text, 4000),
        stop ? JSON.stringify(stop) : null, Math.min(+b.at || now(), now() + 86400000), req.user.name, req.user.uid);
  }
  res.json({ ok: true });
}
app.put('/api/memories/:id', ...W, upsertMemory);
app.delete('/api/memories/:id', A.requireEditor, (req, res) => {
  const ps = db.prepare('SELECT id FROM photos WHERE mem=?').all(req.params.id);
  db.prepare('DELETE FROM memories WHERE id=?').run(req.params.id);
  ps.forEach((p) => IMG.removeImage(p.id));
  res.json({ ok: true });
});

app.put('/api/photos/:id', A.requireEditor, express.raw({ type: () => true, limit: '40mb' }), async (req, res) => {
  const id = req.params.id, mem = String(req.query.mem || '');
  if (!ID_RE.test(id) || !ID_RE.test(mem)) return res.status(400).json({ error: 'id' });
  if (!db.prepare('SELECT 1 FROM memories WHERE id=?').get(mem)) return res.status(409).json({ error: 'no-memory' });
  const ex = db.prepare('SELECT w, h FROM photos WHERE id=?').get(id);
  if (ex) return res.json({ ok: true, id, ...ex, dup: true });
  if (!Buffer.isBuffer(req.body) || req.body.length < 100) return res.status(400).json({ error: 'empty' });
  try {
    const { w, h } = await IMG.saveImage(id, req.body);
    const pos = db.prepare('SELECT COUNT(*) c FROM photos WHERE mem=?').get(mem).c;
    db.prepare('INSERT INTO photos (id, mem, w, h, at, pos) VALUES (?,?,?,?,?,?)').run(id, mem, w, h, now(), pos);
    res.json({ ok: true, id, w, h });
  } catch (e) { console.error('photo', e.message); res.status(415).json({ error: 'bad-image' }); }
});
app.delete('/api/photos/:id', A.requireEditor, (req, res) => {
  db.prepare('DELETE FROM photos WHERE id=?').run(req.params.id); IMG.removeImage(req.params.id); res.json({ ok: true });
});
function sendImg(thumb) {
  return (req, res) => {
    const id = req.params.id; if (!ID_RE.test(id)) return res.sendStatus(404);
    const f = thumb ? IMG.fileThumb(id) : IMG.fileFull(id);
    res.setHeader('Cache-Control', 'private, max-age=31536000, immutable');
    res.sendFile(f, (e) => { if (e && !res.headersSent) res.sendStatus(404); });
  };
}
app.get('/img/:id', A.requireUser, sendImg(false));
app.get('/img/:id/t', A.requireUser, sendImg(true));

app.put('/api/checkins', ...W, (req, res) => {
  const b = req.body || {}; if (!b.trip || !b.key) return res.status(400).json({ error: 'bad' });
  if (b.done === false) db.prepare('DELETE FROM checkins WHERE trip=? AND key=?').run(clip(b.trip, 60), clip(b.key, 120));
  else db.prepare('INSERT OR REPLACE INTO checkins (trip, key, day, kind, name, at, by) VALUES (?,?,?,?,?,?,?)')
    .run(clip(b.trip, 60), clip(b.key, 120), +b.day || 0, b.kind === 'food' ? 'food' : 'place', clip(b.name || b.key, 120), +b.at || now(), req.user.name);
  res.json({ ok: true });
});
app.put('/api/stories', ...W, (req, res) => {
  const b = req.body || {}; const lang = b.lang === 'en' ? 'en' : 'th';
  if (!clip(b.text, 8000).trim()) db.prepare('DELETE FROM stories WHERE trip=? AND day=? AND lang=?').run(clip(b.trip, 60), +b.day || 0, lang);
  else db.prepare('INSERT OR REPLACE INTO stories (trip, day, lang, text, at) VALUES (?,?,?,?,?)').run(clip(b.trip, 60), +b.day || 0, lang, clip(b.text, 8000), now());
  res.json({ ok: true });
});
app.post('/api/story', ...W, async (req, res) => {
  if (!STORY.enabled()) return res.status(501).json({ error: 'no-key' });
  try {
    const b = req.body || {};
    const trip = loadTrips().find((t) => t.id === b.trip); if (!trip) return res.status(404).json({ error: 'trip' });
    const lang = b.lang === 'en' ? 'en' : 'th';
    const d = trip.days.find((x) => x.n === +b.day) || { n: +b.day, title: {} };
    const kids = db.prepare('SELECT th, en FROM kids ORDER BY pos').all().map((k) => k[lang]);
    const mems = db.prepare('SELECT text, kids, mood FROM memories WHERE trip=? AND day=? ORDER BY at').all(trip.id, +b.day);
    const moments = mems.filter((m) => m.text).map((m) => m.text);
    const stops = db.prepare('SELECT name FROM checkins WHERE trip=? AND day=? ORDER BY at').all(trip.id, +b.day).map((s) => s.name);
    const text = await STORY.writeStory({ lang, kids, day: { n: d.n, title: (d.title && d.title[lang]) || '' }, trip: (trip.title && trip.title[lang]) || trip.id, moments, stops });
    res.json({ text });
  } catch (e) { console.error('story', e.message); res.status(502).json({ error: 'story-failed' }); }
});
app.put('/api/tripkid', ...W, (req, res) => {
  const b = req.body || {}; if (!b.trip || !/^[a-z0-9_-]{1,24}$/.test(b.kid || '')) return res.status(400).json({ error: 'bad' });
  db.prepare('INSERT OR REPLACE INTO tripkid (trip, kid, age, height, fav, note) VALUES (?,?,?,?,?,?)')
    .run(clip(b.trip, 60), b.kid, clip(b.age, 40), clip(b.height, 20), clip(b.fav, 200), clip(b.note, 600));
  res.json({ ok: true });
});
app.put('/api/kids/:id', ...W, (req, res) => {
  const b = req.body || {}; const birth = /^\d{4}-\d{2}(-\d{2})?$/.test(b.birth || '') ? b.birth : null;
  db.prepare('UPDATE kids SET birth=? WHERE id=?').run(birth, req.params.id); res.json({ ok: true });
});
app.put('/api/letters/:id', ...W, (req, res) => {
  const id = req.params.id; if (!ID_RE.test(id)) return res.status(400).json({ error: 'id' });
  const b = req.body || {};
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.open_at || '') || !clip(b.text, 20000).trim()) return res.status(400).json({ error: 'bad' });
  const ex = db.prepare('SELECT uid, open_at FROM letters WHERE id=?').get(id);
  if (ex) {
    if (ex.uid !== req.user.uid) return res.status(403).json({ error: 'not-yours' });
    if (ex.open_at <= new Date().toISOString().slice(0, 10)) return res.status(409).json({ error: 'already-open' });
    db.prepare('UPDATE letters SET to_kid=?, title=?, text=?, open_at=? WHERE id=?').run(clip(b.to, 24), clip(b.title, 120), clip(b.text, 20000), b.open_at, id);
  } else {
    db.prepare('INSERT INTO letters (id, to_kid, title, text, open_at, at, by, uid) VALUES (?,?,?,?,?,?,?,?)')
      .run(id, clip(b.to, 24), clip(b.title, 120), clip(b.text, 20000), b.open_at, now(), req.user.name, req.user.uid);
  }
  res.json({ ok: true });
});
app.delete('/api/letters/:id', A.requireEditor, (req, res) => {
  const ex = db.prepare('SELECT uid FROM letters WHERE id=?').get(req.params.id);
  if (ex && ex.uid !== req.user.uid) return res.status(403).json({ error: 'not-yours' });
  db.prepare('DELETE FROM letters WHERE id=?').run(req.params.id); res.json({ ok: true });
});
app.post('/api/trips', ...W, (req, res) => {
  const b = req.body || {};
  const s = new Date((b.start || '') + 'T00:00:00Z'), e = new Date((b.end || '') + 'T00:00:00Z');
  if (isNaN(s) || isNaN(e) || e < s || (e - s) / 864e5 > 120) return res.status(400).json({ error: 'dates' });
  const title = clip(b.title, 80).trim(); if (!title) return res.status(400).json({ error: 'title' });
  const id = 't' + now().toString(36) + crypto.randomBytes(2).toString('hex');
  const days = [];
  for (let d = new Date(s), i = 0; d <= e; d = new Date(d.getTime() + 864e5), i++) {
    const [tint, acc] = PALETTE[i % PALETTE.length];
    const fmt = (loc) => d.toLocaleDateString(loc, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
    days.push({ n: i + 1, date: { en: fmt('en-GB'), th: fmt('th-TH') }, title: { en: 'Day ' + (i + 1), th: 'วันที่ ' + (i + 1) },
      wx: { en: '', th: '' }, sleep: { en: '', th: '' }, acc, tint, a2: acc, t2: tint, emo: '📍', stops: [] });
  }
  const trip = { id, title: { en: title, th: title }, sub: { en: clip(b.place, 80), th: clip(b.place, 80) }, start: b.start, end: b.end, place: clip(b.place, 80), days, custom: true };
  db.prepare('INSERT INTO trips_extra (id, json, at) VALUES (?,?,?)').run(id, JSON.stringify(trip), now());
  res.json({ ok: true, id });
});

// ---------- export / backup ----------
app.get('/api/export.json', A.requireUser, (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="memory-book.json"');
  res.json(buildState(req.user));
});
app.get('/api/export.zip', A.requireUser, (req, res) => {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="memory-book-backup.zip"');
  const z = archiver('zip', { zlib: { level: 1 } });
  z.on('error', () => res.end());
  z.pipe(res);
  z.append(JSON.stringify(buildState(req.user), null, 1), { name: 'memory-book.json' });
  for (const p of db.prepare('SELECT id FROM photos').all()) {
    const f = IMG.fileFull(p.id); if (fs.existsSync(f)) z.file(f, { name: 'photos/' + p.id + '.jpg' });
  }
  z.finalize();
});

// ---------- static app ----------
app.use('/trips-art', express.static(path.join(__dirname, '..', 'public', 'art'), { maxAge: '7d' }));
const PUB = path.join(__dirname, '..', 'public');
app.use(express.static(PUB, { maxAge: 0, etag: true, setHeaders: (res, f) => { if (/\.(woff2|svg)$/.test(f)) res.setHeader('Cache-Control', 'public, max-age=604800'); } }));
app.get('*', (req, res) => res.sendFile(path.join(PUB, 'index.html')));

app.use((err, _req, res, _next) => { console.error(err.message); res.status(err.status || 500).json({ error: 'server' }); });

const PORT = +process.env.PORT || 3000;
if (require.main === module) {
  if (!A.FAMILY_CODE) console.warn('WARNING: FAMILY_CODE is not set — nobody can log in. Set it in Railway → Variables.');
  app.listen(PORT, () => console.log('Memory Book on :' + PORT + ' · data in ' + DATA_DIR));
}
module.exports = app;
