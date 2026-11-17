'use strict';
/* Photos from the relatives (owner, Nov 2026: "ญาติส่งรูปเข้าเล่มได้ แต่ต้องรอพ่อแม่กดอนุมัติก่อน"; migration 0031 photo_inbox).
   A relative who can see a book sends photos for it (PUT /api/b/inbox/:id?trip=&day=&from=&at=): each is made like every photo
   (images.js: turned upright, every piece of metadata and the position dropped, 2560 px + a 520 px thumbnail) and kept apart under
   i/<trip>/… — never in the book, the state, a film, the PDF, a backup or the helper's look until a parent puts it in. The parents see
   them on #/inbox (GET /api/b/inbox) and either put one in (POST /api/b/inbox/:id/ok {day} → a media row like any photo, its files
   moved to p/ and t/, "from" kept as who added it) or turn it away (DELETE → its files deleted). A sender sees and can take back their
   own. 40 a day per phone, 300 waiting at most; one nudge to the parents' phones per ten minutes (hooks.inbox, no name, no photo). */
const express = require('express');
const IMG = require('./images');

const ID_RE = /^[A-Za-z0-9_-]{6,60}$/;
const clip = (s, n) => String(s == null ? '' : s).slice(0, n);
const keyFull = (tid, id) => `i/${tid}/${id}.jpg`, keyThumb = (tid, id) => `i/${tid}/t/${id}.jpg`;

function router({ pool, media, A, family, hooks = {} }) {
  const r = express.Router(), q = async (s, a) => (await pool.query(s, a)).rows;
  const trip = async (id) => (await q('SELECT id, (SELECT count(*)::int FROM trip_days WHERE trip_id=t.id) AS days FROM trips t WHERE id=$1 AND family_id=$2', [id, family]))[0];
  const bad = (res, error, code = 400) => res.status(code).json({ error });
  const out = (x) => ({ id: x.id, trip: x.trip_id, day: x.day_index, w: x.width, h: x.height, caption: x.caption, from: x.from_name, at: x.taken_at ? new Date(x.taken_at).getTime() : null, sent: new Date(x.created_at).getTime() });

  r.put('/api/b/inbox/:id', A.requireUser, express.raw({ type: () => true, limit: '40mb' }), async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!ID_RE.test(id)) return bad(res, 'id');
      if (req.headers['x-mb'] !== '1') return bad(res, 'bad-request');
      const ex = (await q('SELECT id FROM photo_inbox WHERE id=$1', [id]))[0] || (await q('SELECT id FROM media WHERE id=$1', [id]))[0];
      if (ex) return res.json({ ok: true, id, dup: true });   // the phone retried
      const t = await trip(String(req.query.trip || '')); if (!t || !A.canSee(req.user, t.id)) return bad(res, 'trip', 404);
      const day = req.query.day === undefined || req.query.day === '' ? null : Number(req.query.day);
      if (day !== null && !(Number.isInteger(day) && day >= 0 && day < t.days)) return bad(res, 'day');
      const from = clip(req.query.from, 24).trim(); if (!from) return bad(res, 'from');
      if (!Buffer.isBuffer(req.body) || req.body.length < 100) return bad(res, 'empty');
      const n = (await q("SELECT count(*) FILTER (WHERE created_uid=$2 AND created_at > now() - interval '1 day')::int mine, count(*)::int all_ FROM photo_inbox WHERE family_id=$1", [family, req.user.uid]))[0];
      if (n.mine >= 40 || n.all_ >= 300) return bad(res, 'limit', 429);
      let img; try { img = await IMG.processImage(req.body); } catch (_) { return bad(res, 'bad-image', 415); }
      await media.put(keyFull(t.id, id), img.full);
      await media.put(keyThumb(t.id, id), img.thumb);
      const atMs = Number(req.query.at);
      await q(`INSERT INTO photo_inbox (id, family_id, trip_id, day_index, bytes, width, height, caption, taken_at, from_name, created_uid, ph) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) ON CONFLICT (id) DO NOTHING`,
        [id, family, t.id, day, img.full.length, img.w, img.h, clip(req.query.caption, 300), Number.isFinite(atMs) && atMs > 0 && atMs < Date.now() + 864e5 ? new Date(atMs) : null, from, req.user.uid, img.ph || null]);
      if (hooks.inbox) Promise.resolve(hooks.inbox({ trip: t.id })).catch((e) => console.error('inbox push', e.message));
      res.json({ ok: true, id });
    } catch (e) { next(e); }
  });
  // the parents: every photo waiting; a relative: the ones they sent
  r.get('/api/b/inbox', A.requireUser, async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const rows = req.user.role === 'editor'
        ? await q('SELECT * FROM photo_inbox WHERE family_id=$1 ORDER BY created_at', [family])
        : await q('SELECT * FROM photo_inbox WHERE family_id=$1 AND created_uid=$2 ORDER BY created_at', [family, req.user.uid]);
      res.json({ items: rows.filter((x) => A.canSee(req.user, x.trip_id)).map(out) });
    } catch (e) { next(e); }
  });
  const mine = (req, x) => req.user.role === 'editor' || (x.created_uid === req.user.uid && A.canSee(req.user, x.trip_id));
  const send = (thumb) => async (req, res, next) => {
    try {
      const x = (await q('SELECT * FROM photo_inbox WHERE id=$1 AND family_id=$2', [req.params.id, family]))[0];
      if (!x || !mine(req, x)) return res.sendStatus(404);
      const buf = await media.get(thumb ? keyThumb(x.trip_id, x.id) : keyFull(x.trip_id, x.id)); if (!buf) return res.sendStatus(404);
      res.setHeader('Cache-Control', 'private, no-store'); res.type('image/jpeg').send(buf);
    } catch (e) { next(e); }
  };
  r.get('/media/inbox/:id', A.requireUser, send(false));
  r.get('/media/inbox/:id/t', A.requireUser, send(true));
  // put it in the book: a photo like any other (the day the parents pick, else the one it was sent for)
  r.post('/api/b/inbox/:id/ok', A.requireEditor, express.json({ limit: '4kb' }), async (req, res, next) => {
    try {
      if (req.headers['x-mb'] !== '1') return bad(res, 'bad-request');
      const x = (await q('SELECT * FROM photo_inbox WHERE id=$1 AND family_id=$2', [req.params.id, family]))[0]; if (!x) return bad(res, 'gone', 404);
      const t = await trip(x.trip_id); if (!t) return bad(res, 'trip', 404);
      const b = req.body || {}, day = b.day === undefined ? x.day_index : b.day === null || b.day === '' ? null : Number(b.day);
      if (day !== null && !(Number.isInteger(day) && day >= 0 && day < t.days)) return bad(res, 'day');
      const full = await media.get(keyFull(t.id, x.id)), thumb = await media.get(keyThumb(t.id, x.id));
      if (!full || !thumb) return bad(res, 'gone', 404);
      await media.put(`p/${t.id}/${x.id}.jpg`, full); await media.put(`t/${t.id}/${x.id}.jpg`, thumb);
      const pos = (await q('SELECT count(*)::int n FROM media WHERE trip_id=$1 AND day_index IS NOT DISTINCT FROM $2', [t.id, day]))[0].n;
      await q(`INSERT INTO media (id, family_id, trip_id, day_index, storage_key, bytes, width, height, caption, pos, taken_at, created_by, created_uid, ph)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) ON CONFLICT (id) DO NOTHING`,
      [x.id, family, t.id, day, `p/${t.id}/${x.id}.jpg`, x.bytes, x.width, x.height, x.caption, pos, x.taken_at || x.created_at, x.from_name, x.created_uid, x.ph]);
      await q('DELETE FROM photo_inbox WHERE id=$1', [x.id]);
      await media.del(keyFull(t.id, x.id)).catch(() => {}); await media.del(keyThumb(t.id, x.id)).catch(() => {});
      res.json({ ok: true, id: x.id, day });
    } catch (e) { next(e); }
  });
  // turned away (the parents), or taken back (the one who sent it): its files go at once
  r.delete('/api/b/inbox/:id', A.requireUser, async (req, res, next) => {
    try {
      if (req.headers['x-mb'] !== '1') return bad(res, 'bad-request');
      const x = (await q('SELECT * FROM photo_inbox WHERE id=$1 AND family_id=$2', [req.params.id, family]))[0];
      if (!x || !mine(req, x)) return bad(res, 'gone', 404);
      await q('DELETE FROM photo_inbox WHERE id=$1', [x.id]);
      await media.del(keyFull(x.trip_id, x.id)).catch(() => {}); await media.del(keyThumb(x.trip_id, x.id)).catch(() => {});
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  return r;
}
// every file the waiting photos hold (a book's delete, "delete everything")
async function keysOf(pool, family, trip) {
  const rows = (await pool.query(`SELECT id, trip_id FROM photo_inbox WHERE family_id=$1${trip ? ' AND trip_id=$2' : ''}`, trip ? [family, trip] : [family])).rows;
  return rows.flatMap((x) => [keyFull(x.trip_id, x.id), keyThumb(x.trip_id, x.id)]);
}
module.exports = { router, keysOf };
