'use strict';
/* What went wrong on the server, and what was slow (owner, Nov 2026: "จับปัญหาฝั่งเซิร์ฟเวอร์"; migration 0036 server_events).
   mw: the first middleware — when an answer is 500 or more, or took longer than SLOW_MS (5 s; the long jobs and streams are left out),
   one row per kind of request per day is counted: the method + the path with every id masked (/api/b/media/:), the status, the error's
   message scrubbed like the phones' (errors.js scrub), the longest time. Never a body, a query string, a cookie, a name or an id.
   GET/DELETE /api/b/health/server (editors): the list for the room page; alerts.js tells the owner when errors pile up. */
const crypto = require('crypto');
const express = require('express');
const { scrub } = require('./errors');

const SLOW_MS = Number(process.env.SLOW_MS) || 5000;
const KEEP_DAYS = 30, MAX_ROWS = 500, WRITES_PER_MIN = 30;
// /api/b/media/ab12 → /api/b/media/: — the first three parts of an API path stay (they name the kind), the rest are masked; any part
// holding a digit or longer than 24 letters is masked too
function label(method, url) {
  const p = String(url || '').split('?')[0].split('/').filter(Boolean);
  if (!p.length) return `${method} /`;
  const keep = p[0] === 'api' ? (p[1] === 'b' ? 3 : 2) : 1;
  const out = p.map((s, i) => (i < keep && !/\d/.test(s) && s.length <= 24 && /^[a-z0-9_-]+$/i.test(s) ? s : ':'));
  if (p[0] !== 'api' && p[0] !== 'media' && p[0] !== 'v') return `${method} static`;
  return `${method} /${out.join('/').replace(/(\/:)+$/, '/:')}`;
}
// long on purpose: streams and big jobs are never "slow"
const LONG = /^(GET|POST|PUT) \/(api\/b\/(story|ask|lessons|translate|likes|pdf|pdf-year|keep|photos|import|plannext|reel|reel-year|snap|art|backup)|api\/(backup|import|export)|media)\b|^PUT \/api\/b\/(media|inbox)\//;

function create({ pool, A }) {
  const q = async (s, a) => (await pool.query(s, a)).rows;
  let minute = 0, writes = 0;
  async function note(kind, route, status, msg, ms) {
    const now = Date.now(); if (Math.floor(now / 60e3) !== minute) { minute = Math.floor(now / 60e3); writes = 0; }
    if (++writes > WRITES_PER_MIN) return;   // a storm of failures cannot flood the table
    const day = new Date(now).toISOString().slice(0, 10);
    const sig = crypto.createHash('sha256').update([day, kind, route, status, msg].join('|')).digest('hex').slice(0, 32);
    await q(`INSERT INTO server_events (sig, day, kind, route, status, msg, ms_max) VALUES ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT (sig) DO UPDATE SET n = LEAST(server_events.n + 1, 1000000), last_at = now(), ms_max = GREATEST(server_events.ms_max, EXCLUDED.ms_max)`,
    [sig, day, kind, route, status, msg, Math.min(ms, 2e9)]);
    if (Math.random() < 0.05) await q(`DELETE FROM server_events WHERE last_at < now() - interval '${KEEP_DAYS} days' OR sig IN (SELECT sig FROM server_events ORDER BY last_at DESC OFFSET ${MAX_ROWS})`);
  }
  function mw(req, res, next) {
    const t0 = process.hrtime.bigint();
    res.on('finish', () => {
      const ms = Number((process.hrtime.bigint() - t0) / 1000000n), st = res.statusCode, route = label(req.method, req.originalUrl);
      const kind = st >= 500 ? 'error' : ms > SLOW_MS && !LONG.test(route) && !/event-stream/.test(String(res.getHeader('content-type') || '')) ? 'slow' : '';
      if (kind) note(kind, route, st, kind === 'error' ? res.locals.errMsg || '' : '', ms).catch(() => {});
    });
    next();
  }
  // the error handler hands the message here before it answers (never the stack, never a value from the request)
  const error = (err, res) => { res.locals.errMsg = scrub(err && err.message).slice(0, 200); };
  const recent = async () => (await q("SELECT coalesce(sum(n) FILTER (WHERE kind='error' AND last_at > now() - interval '1 hour'), 0)::int errs FROM server_events"))[0];
  const r = express.Router();
  r.get('/api/b/health/server', A.requireEditor, async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const rows = await q(`SELECT kind, route, status, msg, n, ms_max, first_at, last_at FROM server_events WHERE last_at > now() - interval '${KEEP_DAYS} days' ORDER BY last_at DESC LIMIT 100`);
      res.json({ events: rows.map((x) => ({ ...x, first_at: new Date(x.first_at).getTime(), last_at: new Date(x.last_at).getTime() })), slowMs: SLOW_MS });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/health/server', A.requireEditor, async (req, res, next) => { try { await q('DELETE FROM server_events'); res.json({ ok: true }); } catch (e) { next(e); } });
  return { mw, error, recent, router: r, label };
}
module.exports = { create, label };
