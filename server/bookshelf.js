'use strict';
// Memory Bookshelf API on Postgres (docs/PRD.md, docs/ADR.md). Mounted at /api/b and /media.
// Every query is scoped to one family; ids are client-generated so the offline queue can retry any write safely.
const fs = require('fs');
const path = require('path');
const express = require('express');
const zlib = require('zlib');
const crypto = require('crypto');
const IMG = require('./images');

const FAMILY = process.env.FAMILY_ID || 'family';
const ID_RE = /^[A-Za-z0-9_.:-]{4,80}$/;
const SLUG_RE = /^[a-z0-9-]{2,60}$/;
const KINDS = ['quote', 'mood', 'fav', 'note', 'first', 'story', 'tick', 'field'];
const TRIP_WIDE = ['story', 'tick', 'field'];   // kinds that may have no day (whole-trip story, passport checklists, Explorer ID)
const HEART_EMOJI = ['💗', '🤗', '😘', '⭐', '👏', '🎈'];
const REVIEW_KINDS = ['stay', 'food', 'place'], KID_VERDICT = ['love', 'ok', 'no'];
const HEARTS_PER_DAY = { sender: 40, family: 400 };   // the view link is shared: cap what one phone, and everyone together, can send
const clip = (s, n) => String(s == null ? '' : s).slice(0, n);
const i18n = (o, n = 200) => (o && typeof o === 'object' ? { th: clip(o.th, n), en: clip(o.en, n), ...(o.zh ? { zh: clip(o.zh, n) } : {}) } : { th: clip(o, n), en: clip(o, n) });
const at = (v) => new Date(Math.min(Number.isFinite(+v) && +v > 0 ? +v : Date.now(), Date.now() + 86400e3));
const bad = (res, error, code = 400) => res.status(code).json({ error });
// the state carries every book's plan (~1 MB of text for a 16-day road trip): gzip it, a phone on hotel wifi feels the difference
const sha = (s) => crypto.createHash('sha1').update(s).digest('base64url').slice(0, 20);
// etag: answer 304 (no body) when the phone already holds exactly this — the app asks every 30 s and on every return
function sendJson(req, res, obj, etag) {
  const body = Buffer.from(typeof obj === 'string' ? obj : JSON.stringify(obj));   // a string is already JSON
  if (etag) {
    const tag = `"${etag === true ? sha(body) : etag}"`;
    res.setHeader('ETag', tag);
    if ((req.headers['if-none-match'] || '').split(/\s*,\s*/).includes(tag)) return res.status(304).end();
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Vary', 'Accept-Encoding');
  if (body.length > 1024 && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) { res.setHeader('Content-Encoding', 'gzip'); return res.end(zlib.gzipSync(body, { level: 6 })); }
  res.end(body);
}

// ---------- seeds: server/seeds/*.json (trip.schema.json + theme) → trips, trip_days, firsts_catalog, children ----------
async function syncSeeds(pool, dir = path.join(__dirname, 'seeds')) {
  const seeds = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    await c.query('INSERT INTO families (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING', [FAMILY, 'Family']);
    const kidColor = { mimi: '#FF4F8B', mika: '#2F8BFF' };
    const kids = new Map();
    for (const t of seeds) for (const k of t.children || []) kids.set(k.slug, k);
    let pos = 0;
    for (const k of kids.values()) {
      await c.query(`INSERT INTO children (id, family_id, slug, name_th, name_en, emoji, color, pos) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        ON CONFLICT (family_id, slug) DO UPDATE SET name_th=EXCLUDED.name_th, name_en=EXCLUDED.name_en, emoji=EXCLUDED.emoji`,
      [`${FAMILY}:${k.slug}`, FAMILY, k.slug, k.name_th, k.name_en, k.emoji || '', kidColor[k.slug] || '#8B3DFF', pos++]);
    }
    for (const t of seeds) {
      const id = t.slug;
      await c.query(`INSERT INTO trips (id, family_id, slug, legacy_id, title, sub, date_from, date_to, timezone, theme, cover, stamp, moods, passport, info, source)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'seed')
        ON CONFLICT (family_id, slug) DO UPDATE SET legacy_id=EXCLUDED.legacy_id, title=EXCLUDED.title, sub=EXCLUDED.sub, date_from=EXCLUDED.date_from,
          date_to=EXCLUDED.date_to, timezone=EXCLUDED.timezone, theme=EXCLUDED.theme, cover=EXCLUDED.cover, stamp=EXCLUDED.stamp, moods=EXCLUDED.moods,
          passport=EXCLUDED.passport, info=EXCLUDED.info
        WHERE trips.source = 'seed'`,
      [id, FAMILY, t.slug, t.legacy_trip_id || null, t.title, t.sub || null, t.date_from, t.date_to, t.timezone || 'Asia/Bangkok',
        { ...(t.theme || {}), children: (t.children || []).map((k) => ({ slug: k.slug, age: k.age_at_trip || null })) },
        t.cover || {}, t.stamp || {}, JSON.stringify(t.moods || []), t.passport || {}, t.info || {}]);
      for (const d of t.days) {
        const plan = {};   // the day card's plan block (seed keys: timeline, how we move, local pick, plan B, money, tips, tonight's stay, maps route, nearby food, learn cards, quiz, the guide's story, legs with directions, meal picks, food by stop)
        for (const k of ['moving', 'pick', 'planB', 'money', 'plan', 'tips', 'stay', 'route', 'eat', 'learn', 'quiz', 'tale', 'legs', 'picks', 'food']) if (d[k]) plan[k] = d[k];
        await c.query(`INSERT INTO trip_days (trip_id, day_index, date, title, sleep, emoji, gradient, planned, wx, plan) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
          ON CONFLICT (trip_id, day_index) DO UPDATE SET date=EXCLUDED.date, title=EXCLUDED.title, sleep=EXCLUDED.sleep, emoji=EXCLUDED.emoji,
            gradient=EXCLUDED.gradient, planned=EXCLUDED.planned, wx=EXCLUDED.wx, plan=EXCLUDED.plan`,
        [id, d.index, d.date, d.title, d.sleep || null, d.emoji || '', JSON.stringify(d.gradient || null), JSON.stringify(d.planned || []), d.wx || null, plan]);
      }
      let fp = 0;
      for (const f of t.firsts_catalog || []) {
        await c.query(`INSERT INTO firsts_catalog (trip_id, key, emoji, label, pos) VALUES ($1,$2,$3,$4,$5)
          ON CONFLICT (trip_id, key) DO UPDATE SET emoji=EXCLUDED.emoji, label=EXCLUDED.label, pos=EXCLUDED.pos`, [id, f.key, f.emoji || '', f.label, fp++]);
      }
    }
    await c.query('COMMIT');
    return seeds.length;
  } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
}

function router({ pool, media, A, ai }) {
  const r = express.Router();
  const json = express.json({ limit: '200kb' });
  const W = [A.requireEditor, json];
  const q = (sql, args) => pool.query(sql, args).then((x) => x.rows);
  const trip = async (id) => (await q('SELECT id, date_from, date_to, (SELECT count(*)::int FROM trip_days WHERE trip_id=t.id) AS days FROM trips t WHERE id=$1 AND family_id=$2', [id, FAMILY]))[0];
  const dayOk = (t, d) => d === null || (Number.isInteger(d) && d >= 0 && d < t.days);
  const dayArg = (v) => (v === null || v === undefined || v === '' ? null : Number(v));
  const keyFull = (tid, id) => `p/${tid}/${id}.jpg`;
  const keyThumb = (tid, id) => `t/${tid}/${id}.jpg`;

  // ----- everything in one payload (cached by the app for offline use)
  r.get('/api/b/state', A.requireUser, async (req, res, next) => {
    try {
      const [children, trips, days, firsts, entries, mediaRows, places, hearts, reviews, spendRows] = await Promise.all([
        q('SELECT slug, name_th, name_en, emoji, color, birth_ym FROM children WHERE family_id=$1 ORDER BY pos', [FAMILY]),
        q("SELECT id, slug, legacy_id, title, sub, to_char(date_from,'YYYY-MM-DD') date_from, to_char(date_to,'YYYY-MM-DD') date_to, timezone, theme, cover, stamp, moods, passport, info, source FROM trips WHERE family_id=$1 ORDER BY date_from", [FAMILY]),
        q("SELECT d.trip_id, d.day_index, to_char(d.date,'YYYY-MM-DD') date, d.title, d.sleep, d.emoji, d.gradient, d.planned, d.wx, d.plan, d.done_at FROM trip_days d JOIN trips t ON t.id=d.trip_id WHERE t.family_id=$1 ORDER BY d.trip_id, d.day_index", [FAMILY]),
        q('SELECT f.trip_id, f.key, f.emoji, f.label FROM firsts_catalog f JOIN trips t ON t.id=f.trip_id WHERE t.family_id=$1 ORDER BY f.trip_id, f.pos, f.key', [FAMILY]),
        q('SELECT id, trip_id, day_index, kind, child, text, mood, first_key, lang, highlight, occurred_at, created_by, created_uid FROM entries WHERE family_id=$1 ORDER BY occurred_at', [FAMILY]),
        q('SELECT id, trip_id, day_index, width, height, caption, highlight, pos, taken_at, created_by FROM media WHERE family_id=$1 ORDER BY taken_at, pos', [FAMILY]),
        q('SELECT id, trip_id, day_index, key, kind, name, visited_at, created_by FROM places WHERE family_id=$1 ORDER BY visited_at', [FAMILY]),
        q('SELECT id, trip_id, day_index, child, emoji, text, from_name, created_uid, created_at FROM hearts WHERE family_id=$1 ORDER BY created_at', [FAMILY]),
        q('SELECT id, trip_id, day_index, kind, key, name, rating, tags, kids, again, note, created_by, updated_at FROM reviews WHERE family_id=$1 ORDER BY updated_at', [FAMILY]),
        q('SELECT id, trip_id, day_index, amount, cur, cat, note, created_by, updated_at FROM spend WHERE family_id=$1 ORDER BY updated_at', [FAMILY]),
      ]);
      const ms = (d) => (d ? new Date(d).getTime() : null);
      // ?lite=1 (the app): each book's guide text (info, passport, day plans — ~95% of the bytes, changes only with a new seed)
      // is left out and named by a hash; the app keeps the copy it has or fetches /api/b/seed/<trip>/<hash> once
      const lite = req.query.lite === '1';
      res.setHeader('Cache-Control', 'no-store');
      sendJson(req, res, {
        me: { role: req.user.role, name: req.user.name, uid: req.user.uid },
        children,
        trips: trips.map((t) => {
          const td = days.filter((d) => d.trip_id === t.id).map(({ trip_id, ...d }) => ({ ...d, done_at: ms(d.done_at) }));
          const out = { ...t, days: td, firsts: firsts.filter((f) => f.trip_id === t.id).map(({ trip_id, ...f }) => f) };
          if (!lite) return out;
          const g = seedOf(t, td);
          return { ...out, info: undefined, passport: undefined, days: td.map(({ plan, ...d }) => d), seed: g.hash };
        }),
        entries: entries.map(({ trip_id, day_index, occurred_at, created_uid, ...e }) => ({ ...e, trip: trip_id, day: day_index, at: ms(occurred_at), mine: created_uid === req.user.uid })),
        media: mediaRows.map(({ trip_id, day_index, taken_at, width, height, ...m }) => ({ ...m, trip: trip_id, day: day_index, w: width, h: height, at: ms(taken_at) })),
        places: places.map(({ trip_id, day_index, visited_at, ...p }) => ({ ...p, trip: trip_id, day: day_index, at: ms(visited_at) })),
        hearts: hearts.map(({ trip_id, day_index, created_uid, created_at, from_name, ...h }) => ({ ...h, trip: trip_id, day: day_index, from: from_name, at: ms(created_at), mine: created_uid === req.user.uid })),
        reviews: reviews.map(({ trip_id, day_index, updated_at, ...r }) => ({ ...r, trip: trip_id, day: day_index, at: ms(updated_at) })),
        spend: spendRows.map(({ trip_id, day_index, updated_at, amount, ...s }) => ({ ...s, trip: trip_id, day: day_index, amount: Number(amount), at: ms(updated_at) })),
        features: { story: !!(ai && ai.enabled()) },
      }, true);
    } catch (e) { next(e); }
  });
  // one book's guide text by its hash: never changes for that hash, so the phone (and its HTTP cache) keeps it
  const seedOf = (t, td) => { const body = JSON.stringify({ info: t.info, passport: t.passport, plans: td.map((d) => d.plan) }); return { body, hash: sha(body) }; };
  r.get('/api/b/seed/:trip/:hash', A.requireUser, async (req, res, next) => {
    try {
      const t = (await q('SELECT id, passport, info FROM trips WHERE id=$1 AND family_id=$2', [req.params.trip, FAMILY]))[0];
      if (!t) return bad(res, 'trip', 404);
      const td = await q('SELECT plan FROM trip_days WHERE trip_id=$1 ORDER BY day_index', [t.id]);
      const g = seedOf(t, td);
      if (g.hash !== req.params.hash) return bad(res, 'stale', 409);   // the seed moved on (new deploy): the app reloads the state
      res.setHeader('Cache-Control', 'private, max-age=31536000, immutable');
      sendJson(req, res, g.body, g.hash);
    } catch (e) { next(e); }
  });

  // ----- entries: quote | mood | fav | note | first | story | tick | field (one row per item; mood/fav/note/tick/field use deterministic ids → upsert)
  r.put('/api/b/entries/:id', ...W, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!ID_RE.test(id)) return bad(res, 'id');
      if (!KINDS.includes(b.kind)) return bad(res, 'kind');
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      if (day === null && !TRIP_WIDE.includes(b.kind)) return bad(res, 'day');
      const kids = (await q('SELECT slug FROM children WHERE family_id=$1', [FAMILY])).map((k) => k.slug);
      const child = b.child == null || b.child === '' ? null : String(b.child);
      if (child !== null && child !== 'both' && !kids.includes(child)) return bad(res, 'child');
      if (['mood', 'tick', 'field'].includes(b.kind) && (!child || child === 'both')) return bad(res, 'child');
      if (['tick', 'field'].includes(b.kind) && !b.first_key) return bad(res, 'key');
      if (b.kind === 'tick' && !['', 'yum', 'yuck', '1', '2', '3'].includes(String(b.text || ''))) return bad(res, 'text');   // plain tick, food yum/yuck, 1–3 stars
      const row = [id, FAMILY, t.id, day, b.kind, child, clip(b.text, 4000), b.mood ? clip(b.mood, 16) : null, b.first_key ? clip(b.first_key, 40) : null,
        ['th', 'en'].includes(b.lang) ? b.lang : null, !!b.highlight, at(b.at), clip(req.user.name, 40), req.user.uid];
      const out = await q(`INSERT INTO entries (id, family_id, trip_id, day_index, kind, child, text, mood, first_key, lang, highlight, occurred_at, created_by, created_uid)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        ON CONFLICT (id) DO UPDATE SET day_index=EXCLUDED.day_index, child=EXCLUDED.child, text=EXCLUDED.text, mood=EXCLUDED.mood,
          first_key=EXCLUDED.first_key, lang=EXCLUDED.lang, highlight=EXCLUDED.highlight, updated_at=now()
        WHERE entries.family_id = EXCLUDED.family_id AND entries.kind = EXCLUDED.kind AND entries.trip_id = EXCLUDED.trip_id
        RETURNING id`, row);
      if (!out.length) return bad(res, 'conflict', 409);   // id taken by another trip/kind/family
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/entries/:id', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM entries WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]); res.json({ ok: true }); } catch (e) { next(e); }
  });

  // ----- photos: EXIF/GPS stripped, 2560 px + 520 px thumb, stored in the private bucket
  r.put('/api/b/media/:id', A.requireEditor, express.raw({ type: () => true, limit: '40mb' }), async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!ID_RE.test(id)) return bad(res, 'id');
      if (req.headers['x-mb'] !== '1') return bad(res, 'bad-request');
      const ex = (await q('SELECT width w, height h, family_id FROM media WHERE id=$1', [id]))[0];
      if (ex) return ex.family_id === FAMILY ? res.json({ ok: true, id, w: ex.w, h: ex.h, dup: true }) : bad(res, 'conflict', 409);
      const t = await trip(String(req.query.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(req.query.day); if (!dayOk(t, day)) return bad(res, 'day');
      if (!Buffer.isBuffer(req.body) || req.body.length < 100) return bad(res, 'empty');
      let img;
      try { img = await IMG.processImage(req.body); } catch (e) { return bad(res, 'bad-image', 415); }
      await media.put(keyFull(t.id, id), img.full);
      await media.put(keyThumb(t.id, id), img.thumb);
      const pos = (await q('SELECT count(*)::int n FROM media WHERE trip_id=$1 AND day_index IS NOT DISTINCT FROM $2', [t.id, day]))[0].n;
      await q(`INSERT INTO media (id, family_id, trip_id, day_index, storage_key, bytes, width, height, caption, pos, taken_at, created_by, created_uid)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ON CONFLICT (id) DO NOTHING`,
      [id, FAMILY, t.id, day, keyFull(t.id, id), img.full.length, img.w, img.h, clip(req.query.caption, 500), pos, at(req.query.at), clip(req.user.name, 40), req.user.uid]);
      res.json({ ok: true, id, w: img.w, h: img.h });
    } catch (e) { next(e); }
  });
  r.patch('/api/b/media/:id', ...W, async (req, res, next) => {
    try {
      const b = req.body || {}, sets = [], args = [req.params.id, FAMILY];
      if ('caption' in b) { args.push(clip(b.caption, 500)); sets.push(`caption=$${args.length}`); }
      if ('highlight' in b) { args.push(!!b.highlight); sets.push(`highlight=$${args.length}`); }
      if (!sets.length) return bad(res, 'nothing');
      const out = await q(`UPDATE media SET ${sets.join(', ')} WHERE id=$1 AND family_id=$2 RETURNING id`, args);
      res.status(out.length ? 200 : 404).json({ ok: !!out.length });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/media/:id', A.requireEditor, async (req, res, next) => {
    try {
      const m = (await q('DELETE FROM media WHERE id=$1 AND family_id=$2 RETURNING trip_id', [req.params.id, FAMILY]))[0];
      if (m) { await media.del(keyFull(m.trip_id, req.params.id)); await media.del(keyThumb(m.trip_id, req.params.id)); }   // really gone (PDPA)
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  // stream a photo to a signed-in user; never a public URL, never another family's photo (IDOR)
  const send = (thumb) => async (req, res, next) => {
    try {
      const m = (await q('SELECT trip_id FROM media WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]))[0];
      if (!m) return res.sendStatus(404);
      const buf = await media.get(thumb ? keyThumb(m.trip_id, req.params.id) : keyFull(m.trip_id, req.params.id));
      if (!buf) return res.sendStatus(404);
      res.setHeader('Cache-Control', 'private, max-age=31536000, immutable');
      res.type('image/jpeg').send(buf);
    } catch (e) { next(e); }
  };
  r.get('/media/:id', A.requireUser, send(false));
  r.get('/media/:id/t', A.requireUser, send(true));

  // ----- travel notebook: how a stay / restaurant / place worked for us (editors; one row per thing per trip)
  r.put('/api/b/reviews/:id', ...W, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!ID_RE.test(id)) return bad(res, 'id');
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      if (!REVIEW_KINDS.includes(b.kind)) return bad(res, 'kind');
      const key = clip(b.key, 120).trim(); if (!key) return bad(res, 'key');
      const rating = b.rating == null || b.rating === '' ? null : Number(b.rating);
      if (rating !== null && !(Number.isInteger(rating) && rating >= 1 && rating <= 5)) return bad(res, 'rating');
      const tags = Array.isArray(b.tags) ? [...new Set(b.tags.map((x) => clip(x, 24)).filter((x) => /^[a-z0-9_-]+$/.test(x)))].slice(0, 12) : [];
      const kidSlugs = (await q('SELECT slug FROM children WHERE family_id=$1', [FAMILY])).map((k) => k.slug), kids = {};
      for (const [k, v] of Object.entries(b.kids && typeof b.kids === 'object' ? b.kids : {})) { if (!kidSlugs.includes(k)) return bad(res, 'child'); if (KID_VERDICT.includes(v)) kids[k] = v; }
      const again = typeof b.again === 'boolean' ? b.again : null;
      const out = await q(`INSERT INTO reviews (id, family_id, trip_id, day_index, kind, key, name, rating, tags, kids, again, note, created_by, created_uid)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        ON CONFLICT (id) DO UPDATE SET day_index=EXCLUDED.day_index, name=EXCLUDED.name, rating=EXCLUDED.rating, tags=EXCLUDED.tags, kids=EXCLUDED.kids,
          again=EXCLUDED.again, note=EXCLUDED.note, updated_at=now()
        WHERE reviews.family_id = EXCLUDED.family_id AND reviews.trip_id = EXCLUDED.trip_id AND reviews.kind = EXCLUDED.kind AND reviews.key = EXCLUDED.key
        RETURNING id`, [id, FAMILY, t.id, day, b.kind, key, i18n(b.name || key, 120), rating, JSON.stringify(tags), kids, again, clip(b.note, 500), clip(req.user.name, 40), req.user.uid]);
      if (!out.length) return bad(res, 'conflict', 409);
      res.json({ ok: true });
    } catch (e) { if (e.code === '23505') return bad(res, 'conflict', 409); next(e); }   // same trip+kind+key under another id
  });
  r.delete('/api/b/reviews/:id', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM reviews WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]); res.json({ ok: true }); } catch (e) { next(e); }
  });

  // ----- hearts from the family: anyone signed in (relatives on the view link too) may send one; text only
  const sameSite = (req, res, next) => (req.headers['x-mb'] === '1' ? next() : bad(res, 'bad-request'));
  r.put('/api/b/hearts/:id', A.requireUser, sameSite, json, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!ID_RE.test(id)) return bad(res, 'id');
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      const kids = (await q('SELECT slug FROM children WHERE family_id=$1', [FAMILY])).map((k) => k.slug);
      const child = String(b.child || ''); if (child !== 'both' && !kids.includes(child)) return bad(res, 'child');
      if (!HEART_EMOJI.includes(b.emoji)) return bad(res, 'emoji');
      const from = clip(b.from, 24).trim(); if (!from) return bad(res, 'from');
      const text = clip(b.text, 140).trim();
      const ex = (await q('SELECT family_id FROM hearts WHERE id=$1', [id]))[0];
      if (ex) return ex.family_id === FAMILY ? res.json({ ok: true, dup: true }) : bad(res, 'conflict', 409);
      const [n] = await q("SELECT count(*) FILTER (WHERE created_uid=$2)::int mine, count(*)::int alls FROM hearts WHERE family_id=$1 AND created_at > now() - interval '1 day'", [FAMILY, req.user.uid]);
      if (n.mine >= HEARTS_PER_DAY.sender || n.alls >= HEARTS_PER_DAY.family) return bad(res, 'too-many', 429);
      await q(`INSERT INTO hearts (id, family_id, trip_id, day_index, child, emoji, text, from_name, created_uid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        ON CONFLICT (id) DO NOTHING`, [id, FAMILY, t.id, day, child, b.emoji, text, from, req.user.uid]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  // grown-ups may remove any heart; a sender may take back their own
  r.delete('/api/b/hearts/:id', A.requireUser, sameSite, async (req, res, next) => {
    try {
      const out = await q('DELETE FROM hearts WHERE id=$1 AND family_id=$2 AND ($3 OR created_uid=$4) RETURNING id', [req.params.id, FAMILY, req.user.role === 'editor', req.user.uid]);
      res.status(out.length ? 200 : 404).json({ ok: !!out.length });
    } catch (e) { next(e); }
  });

  // ----- check-ins at planned places / meals (stamps)
  r.put('/api/b/places', ...W, async (req, res, next) => {
    try {
      const b = req.body || {};
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const key = clip(b.key, 120).trim(); if (!key) return bad(res, 'key');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      if (b.done === false) { await q('DELETE FROM places WHERE trip_id=$1 AND key=$2 AND family_id=$3', [t.id, key, FAMILY]); return res.json({ ok: true }); }
      await q(`INSERT INTO places (id, family_id, trip_id, day_index, key, kind, name, visited_at, created_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        ON CONFLICT (trip_id, key) DO NOTHING`,
      [`${t.id}:${key}`.slice(0, 200), FAMILY, t.id, day, key, b.kind === 'food' ? 'food' : 'place', i18n(b.name || key, 120), at(b.at), clip(req.user.name, 40)]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  // ----- "Done" for a day (stamp rule: all days done OR trip over)
  r.put('/api/b/days/:trip/:day', ...W, async (req, res, next) => {
    try {
      const t = await trip(req.params.trip); if (!t) return bad(res, 'trip');
      const day = Number(req.params.day); if (!dayOk(t, day) || day === null) return bad(res, 'day');
      await q('UPDATE trip_days SET done_at = CASE WHEN $3 THEN COALESCE(done_at, now()) ELSE NULL END WHERE trip_id=$1 AND day_index=$2', [t.id, day, !!(req.body || {}).done]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  // ----- what we actually spent (the manual's budget is an estimate; this is the real number, per day — editors only;
  // stays in this family's database, never in a seed or the printed book)
  const SPEND_CATS = ['food', 'transport', 'tickets', 'stay', 'shop', 'other'];
  r.put('/api/b/spend/:id', ...W, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!ID_RE.test(id)) return bad(res, 'id');
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      const amount = Number(b.amount);
      if (!Number.isFinite(amount) || amount < 0 || amount > 1e7) return bad(res, 'amount');
      const cur = String(b.cur || '').toUpperCase(); if (!/^[A-Z]{3}$/.test(cur)) return bad(res, 'cur');
      if (!SPEND_CATS.includes(b.cat)) return bad(res, 'cat');
      await q(`INSERT INTO spend (id, family_id, trip_id, day_index, amount, cur, cat, note, created_by, created_uid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        ON CONFLICT (id) DO UPDATE SET day_index=EXCLUDED.day_index, amount=EXCLUDED.amount, cur=EXCLUDED.cur, cat=EXCLUDED.cat, note=EXCLUDED.note, updated_at=now()
        WHERE spend.family_id = EXCLUDED.family_id`, [id, FAMILY, t.id, day, amount.toFixed(2), cur, b.cat, clip(b.note, 200), clip(req.user.name, 40), req.user.uid]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/spend/:id', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM spend WHERE id=$1 AND family_id=$2', [req.params.id, FAMILY]); res.json({ ok: true }); } catch (e) { next(e); }
  });

  // ----- a new trip (book) created in the app
  r.post('/api/b/trips', ...W, async (req, res, next) => {
    const c = await pool.connect();
    try {
      const b = req.body || {};
      const slug = clip(b.slug, 60);
      const from = new Date(b.date_from + 'T00:00:00Z'), to = new Date(b.date_to + 'T00:00:00Z');
      if (!SLUG_RE.test(slug)) return bad(res, 'slug');
      if (isNaN(from) || isNaN(to) || to < from || (to - from) / 864e5 > 60) return bad(res, 'dates');
      if (!clip(b.title && (b.title.th || b.title.en || b.title), 120).trim()) return bad(res, 'title');
      await c.query('BEGIN');
      const ins = await c.query(`INSERT INTO trips (id, family_id, slug, title, sub, date_from, date_to, timezone, theme, cover, source)
        VALUES ($1,$2,$1,$3,$4,$5,$6,$7,$8,$9,'manual') ON CONFLICT DO NOTHING RETURNING id`,
      [slug, FAMILY, i18n(b.title, 120), b.sub ? i18n(b.sub, 120) : null, b.date_from, b.date_to, clip(b.timezone || 'Asia/Bangkok', 60),
        { accent: /^#[0-9a-fA-F]{6}$/.test(b.accent) ? b.accent : '#1F3A5F', display: 'sans' }, { emoji: clip(b.emoji || '📖', 8) }]);
      if (!ins.rows.length) { await c.query('ROLLBACK'); return bad(res, 'exists', 409); }
      for (let i = 0, d = new Date(from); d <= to; i++, d = new Date(d.getTime() + 864e5)) {
        await c.query('INSERT INTO trip_days (trip_id, day_index, date, title) VALUES ($1,$2,$3,$4)', [slug, i, d.toISOString().slice(0, 10), { th: `วันที่ ${i + 1}`, en: `Day ${i + 1}` }]);
      }
      await c.query('COMMIT');
      res.json({ ok: true, id: slug });
    } catch (e) { await c.query('ROLLBACK').catch(() => {}); next(e); } finally { c.release(); }
  });

  // ----- bedtime story (Claude): only when pressed, text facts only, streamed as SSE; disconnect = stop, nothing saved
  async function storyFacts(t, day, lang) {
    const days = await q("SELECT day_index, to_char(date,'YYYY-MM-DD') date, title FROM trip_days WHERE trip_id=$1 ORDER BY day_index", [t.id]);
    const kids = Object.fromEntries((await q('SELECT slug, name_th, name_en FROM children WHERE family_id=$1', [FAMILY])).map((k) => [k.slug, lang === 'en' ? k.name_en : k.name_th]));
    const who = (s) => (s === 'both' ? (lang === 'en' ? 'Mimi and Mika' : 'มีมี่และมีก้า') : kids[s] || s);
    const firsts = Object.fromEntries((await q('SELECT key, label FROM firsts_catalog WHERE trip_id=$1', [t.id])).map((f) => [f.key, f.label[lang] || f.label.en]));
    const pp = ((await q('SELECT passport FROM trips WHERE id=$1', [t.id]))[0] || {}).passport || {};
    const spot = (di, k) => { const it = (((pp.days || [])[di] || {}).spot || []).find((x) => `spot.d${di}.${x.k}` === k); return it ? it[lang] || it.en : null; };
    const lines = [];
    for (const d of days.filter((x) => day === null || x.day_index === day)) {
      const es = await q("SELECT kind, child, text, mood, first_key FROM entries WHERE trip_id=$1 AND day_index=$2 AND kind<>'story' ORDER BY occurred_at", [t.id, d.day_index]);
      const pl = await q('SELECT name FROM places WHERE trip_id=$1 AND day_index=$2 ORDER BY visited_at', [t.id, d.day_index]);
      const caps = (await q("SELECT caption FROM media WHERE trip_id=$1 AND day_index=$2 AND caption<>'' ORDER BY taken_at", [t.id, d.day_index])).map((m) => m.caption);
      const part = [];
      if (pl.length) part.push(`${lang === 'en' ? 'Places' : 'ที่ไป'}: ${pl.map((p) => p.name[lang] || p.name.en).join(', ')}`);
      es.filter((e) => e.kind === 'mood' && e.mood).forEach((e) => part.push(`${lang === 'en' ? 'Mood' : 'อารมณ์'} ${who(e.child)}: ${e.mood}`));
      es.filter((e) => e.kind === 'quote').forEach((e) => part.push(`${who(e.child)} ${lang === 'en' ? 'said' : 'พูดว่า'}: "${e.text}"`));
      caps.forEach((c) => part.push(`${lang === 'en' ? 'Photo' : 'รูป'}: ${c}`));
      es.filter((e) => e.kind === 'fav').forEach((e) => part.push(`${lang === 'en' ? 'Favourite today' : 'ของโปรดวันนี้'}: ${e.text}`));
      es.filter((e) => e.kind === 'note').forEach((e) => part.push(`${lang === 'en' ? 'Parents’ note' : 'บันทึกพ่อแม่'}: ${e.text}`));
      es.filter((e) => e.kind === 'first').forEach((e) => part.push(`${lang === 'en' ? 'First time' : 'ครั้งแรก'} (${who(e.child)}): ${e.first_key === 'custom' ? e.text : firsts[e.first_key] || e.first_key}`));
      es.filter((e) => e.kind === 'tick' && spot(d.day_index, e.first_key)).forEach((e) => part.push(`${lang === 'en' ? 'Spotted' : 'เจอแล้ว'} (${who(e.child)}): ${spot(d.day_index, e.first_key)}`));
      (await q('SELECT kind, name, rating, kids, note FROM reviews WHERE trip_id=$1 AND day_index=$2 AND (rating IS NOT NULL OR note<>\'\') ORDER BY updated_at', [t.id, d.day_index]))
        .forEach((r) => part.push(`${{ stay: lang === 'en' ? 'Stay' : 'ที่พัก', food: lang === 'en' ? 'Food' : 'ร้านอาหาร', place: lang === 'en' ? 'Place' : 'สถานที่' }[r.kind]}: ${r.name[lang] || r.name.en}${r.rating ? ` ${'★'.repeat(r.rating)}` : ''}${Object.entries(r.kids || {}).map(([k, v]) => ` · ${who(k)} ${{ love: '😍', ok: '🙂', no: '😖' }[v]}`).join('')}${r.note ? ` — ${r.note}` : ''}`));
      if (part.length) lines.push(`${lang === 'en' ? 'Day' : 'วันที่'} ${d.day_index + 1} (${d.date}) — ${d.title[lang] || d.title.en}\n- ${part.join('\n- ')}`);
    }
    return lines.join('\n\n');
  }
  const STORY_DAILY = Math.max(1, parseInt(process.env.STORY_DAILY, 10) || 30);   // model calls per family per UTC day — a cap on the API bill, not a quota anyone should meet
  const storyUse = { day: '', n: 0 };
  r.post('/api/b/story', ...W, async (req, res, next) => {
    try {
      if (!ai || !ai.enabled()) return bad(res, 'no-key', 501);
      const b = req.body || {}, lang = b.lang === 'en' ? 'en' : 'th';
      const t = await trip(String(b.trip || '')); if (!t) return bad(res, 'trip');
      const day = dayArg(b.day); if (!dayOk(t, day)) return bad(res, 'day');
      const facts = await storyFacts(t, day, lang);
      if (!facts) return bad(res, 'empty', 422);   // nothing written down → don't call the model
      const today = new Date().toISOString().slice(0, 10);
      if (storyUse.day !== today) Object.assign(storyUse, { day: today, n: 0 });
      if (storyUse.n >= STORY_DAILY) return bad(res, 'limit', 429);
      storyUse.n++;
      const ctl = new AbortController();
      let done = false;
      res.on('close', () => { if (!done) ctl.abort(); });
      res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' });
      const send = (ev, data) => res.write(`${ev ? `event: ${ev}\n` : ''}data: ${JSON.stringify(data)}\n\n`);
      try {
        const text = await ai.writeStory({ lang, whole: day === null, facts, signal: ctl.signal, onText: (x) => send(null, { t: x }) });
        const id = day === null ? `${t.id}.story.all` : `${t.id}.story.d${day}`;
        await q(`INSERT INTO entries (id, family_id, trip_id, day_index, kind, text, lang, created_by, created_uid) VALUES ($1,$2,$3,$4,'story',$5,$6,$7,$8)
          ON CONFLICT (id) DO UPDATE SET text=EXCLUDED.text, lang=EXCLUDED.lang, updated_at=now()`, [id, FAMILY, t.id, day, text, lang, 'Claude', req.user.uid]);
        done = true;
        send('done', { id, text });
      } catch (e) {
        done = true;
        if (ctl.signal.aborted) return res.end();   // stopped by the user: nothing saved
        console.error('story', e.code || e.status || e.message);
        send('error', { error: e.code === 'refusal' ? 'refusal' : 'failed' });
      }
      res.end();
    } catch (e) { next(e); }
  });

  // ----- PDPA: everything we hold about the family, in one JSON (photos via /api/b/backup.zip later)
  r.get('/api/b/export.json', A.requireEditor, async (_req, res, next) => {
    try {
      const out = {};
      for (const t of ['children', 'trips', 'entries', 'media', 'places', 'hearts', 'reviews']) out[t] = await q(`SELECT * FROM ${t} WHERE family_id=$1`, [FAMILY]);
      out.trip_days = await q('SELECT d.* FROM trip_days d JOIN trips t ON t.id=d.trip_id WHERE t.family_id=$1', [FAMILY]);
      out.firsts_catalog = await q('SELECT f.* FROM firsts_catalog f JOIN trips t ON t.id=f.trip_id WHERE t.family_id=$1', [FAMILY]);
      res.setHeader('Content-Disposition', 'attachment; filename="memory-bookshelf.json"');
      res.json({ format: 'memory-bookshelf-export', version: 1, at: Date.now(), ...out });
    } catch (e) { next(e); }
  });

  return r;
}

module.exports = { router, syncSeeds, FAMILY };
