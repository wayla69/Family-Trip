'use strict';
/* What went wrong on the family's phones, and how much room the books take (owner, Nov 2026: "รู้เมื่อมีอะไรพังบนมือถือ … หน้าดูพื้นที่").
   POST /api/b/err   any signed-in phone: a script error the app threw (core.js errReport) — the message, our own file and line, the app
                     version, the kind of page (never its book or child), the kind of phone. Scrubbed again here; one row per error per
                     day, counted (migration 0030), kept 30 days, never in backups. Nothing a family wrote, no name, no address, no code.
   GET/DELETE /api/b/health/errors   editors: the list, or empty it.
   GET /api/b/health/storage         editors: photos, clips, voice memos, drawings and films per book, in bytes. */
const express = require('express');
const crypto = require('crypto');

const KEEP_DAYS = 30, MAX_ROWS = 500;
// a message keeps its shape, not its data: addresses, long numbers, quoted words and URLs are masked before it is stored
function scrub(msg) {
  return String(msg || '').slice(0, 600).replace(/[^\x20-\x7E฀-๿]/g, ' ')   // printable ASCII and Thai; control characters and emoji go
    .replace(/https?:\/\/[^\s'")]+/g, (u) => { try { const x = new URL(u); return x.pathname.replace(/\/[^/]*\d[^/]*/g, '/…'); } catch (_) { return '…'; } })
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '…@…')
    .replace(/#\/\S*/g, '#/…')
    .replace(/(["'`])((?:(?!\1).){1,200})\1/g, (m, q, x) => (/^[A-Za-z_$][\w$.]{0,40}$/.test(x) ? m : `${q}…${q}`))   // a property name stays ('foo'), a text does not
    .replace(/\d{5,}/g, '…')
    .replace(/\s+/g, ' ').trim().slice(0, 300);
}
const SRC_RE = /^\/[a-z0-9-]{1,30}\.(js|css)$/, ROUTE_RE = /^[a-z]{1,20}(\/[a-z]{1,20})?$/, VER_RE = /^mbs-v\d{1,5}(-[0-9a-f]{4,16})?$/;
const DEVICE_RE = /^(iphone|ipad|android|mac|windows|linux|other) (safari|chrome|samsung|firefox|edge|other) \d{1,3}( app)?$/;
const int = (x, max) => { const n = Math.floor(Number(x)); return Number.isFinite(n) && n >= 0 && n <= max ? n : 0; };

function create({ pool, media, A, family, reelKey }) {
  const r = express.Router(), q = async (s, a) => (await pool.query(s, a)).rows;
  // a phone sending in a loop cannot fill the table: 20 reports a minute per address, at most 200 different errors a day
  const hits = new Map();
  const tooMany = (ip) => {
    const now = Date.now(), h = (hits.get(ip) || []).filter((t) => now - t < 60e3); h.push(now); hits.set(ip, h);
    if (hits.size > 2000) hits.delete(hits.keys().next().value);
    return h.length > 20;
  };
  r.post('/api/b/err', A.requireUser, express.json({ limit: '4kb' }), async (req, res, next) => {
    try {
      if (tooMany(req.ip)) return res.status(429).json({ error: 'slow' });
      const b = req.body || {}, msg = scrub(b.msg);
      if (!msg) return res.status(400).json({ error: 'msg' });
      const src = SRC_RE.test(b.src) ? b.src : '', route = ROUTE_RE.test(b.route) ? b.route : '', ver = VER_RE.test(b.ver) ? b.ver : '', device = DEVICE_RE.test(b.device) ? b.device : 'other other 0';
      const line = int(b.line, 1e6), col = int(b.col, 1e6), day = new Date().toISOString().slice(0, 10);
      const sig = crypto.createHash('sha256').update([family, day, msg, src, line, col].join('|')).digest('hex').slice(0, 32);
      const known = (await q('SELECT 1 FROM client_errors WHERE sig=$1', [sig])).length;
      if (!known && (await q('SELECT count(*)::int AS n FROM client_errors WHERE family_id=$1 AND day=$2', [family, day]))[0].n >= 200) return res.json({ ok: true, kept: false });
      await q(`INSERT INTO client_errors (sig, family_id, day, msg, src, line, col, ver, route, device) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        ON CONFLICT (sig) DO UPDATE SET n = LEAST(client_errors.n + 1, 1000000), last_at = now(), ver = EXCLUDED.ver, route = EXCLUDED.route, device = EXCLUDED.device`,
      [sig, family, day, msg, src, line, col, ver, route, device]);
      if (!known && Math.random() < 0.1) {   // now and then: the old ones go
        await q(`DELETE FROM client_errors WHERE family_id=$1 AND (last_at < now() - interval '${KEEP_DAYS} days'
          OR sig IN (SELECT sig FROM client_errors WHERE family_id=$1 ORDER BY last_at DESC OFFSET ${MAX_ROWS}))`, [family]);
      }
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  r.get('/api/b/health/errors', A.requireEditor, async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const rows = await q(`SELECT msg, src, line, col, ver, route, device, n, first_at, last_at FROM client_errors
        WHERE family_id=$1 AND last_at > now() - interval '${KEEP_DAYS} days' ORDER BY last_at DESC LIMIT 100`, [family]);
      res.json({ errors: rows.map((x) => ({ ...x, first_at: new Date(x.first_at).getTime(), last_at: new Date(x.last_at).getTime() })) });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/health/errors', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM client_errors WHERE family_id=$1', [family]); res.json({ ok: true }); } catch (e) { next(e); }
  });
  // how much room each book takes: the stored sizes of photos (the full file; its thumbnail adds about a twentieth), clips, voice memos,
  // the children's drawings and the book's film. Counts and bytes only.
  r.get('/api/b/health/storage', A.requireEditor, async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const rows = await q(`SELECT trip_id,
          CASE WHEN mime LIKE 'video/%' THEN 'clips' WHEN mime LIKE 'audio/%' THEN 'voices' WHEN id LIKE 'dr-%' THEN 'drawings' ELSE 'photos' END AS kind,
          count(*)::int AS n, COALESCE(sum(bytes), 0)::bigint AS bytes
        FROM media WHERE family_id=$1 GROUP BY 1, 2`, [family]);
      const trips = await q('SELECT id, title, date_from, reel FROM trips WHERE family_id=$1 ORDER BY date_from', [family]);
      const books = [];
      for (const t of trips) {
        const k = {};
        for (const x of rows.filter((y) => y.trip_id === t.id)) k[x.kind] = { n: x.n, bytes: Number(x.bytes) };
        if (t.reel && t.reel.v) {
          let bytes = Number(t.reel.bytes) || 0;
          if (!bytes && media.size) bytes = Number(await media.size(reelKey(t.id, t.reel.v)).catch(() => 0)) || 0;
          k.films = { n: 1, bytes };
        }
        const total = Object.values(k).reduce((s, x) => s + x.bytes, 0);
        books.push({ id: t.id, title: t.title, kinds: k, total });
      }
      const all = {};
      for (const b of books) for (const [kind, x] of Object.entries(b.kinds)) { all[kind] = all[kind] || { n: 0, bytes: 0 }; all[kind].n += x.n; all[kind].bytes += x.bytes; }
      res.json({ books, all, total: books.reduce((s, b) => s + b.total, 0) });
    } catch (e) { next(e); }
  });
  return { router: r };
}
module.exports = { create, scrub };
