'use strict';
/* Letters to open in the future (owner, Nov 2026: "จดหมายเปิดในอนาคต … แจ้งเตือนให้เปิดเมื่อถึงวันที่ตั้งไว้ เช่น วันเกิดอายุ 18"; migration 0034).
   GET    /api/b/capsules            editors: every letter — a sealed one before its day says only to whom and when (never its text)
   PUT    /api/b/capsules/:id        editors: write or change one {child, title, text, open_on} while it is not sealed
   POST   /api/b/capsules/:id/seal   editors: sealed — from now its text stays on the server until open_on (home time)
   DELETE /api/b/capsules/:id        editors: gone (two taps on the page)
   push.js capsules(): at 09:00 home time on the day, the parents' phones hear that it may be opened (no text in the push). */
const express = require('express');
const ID_RE = /^[A-Za-z0-9_-]{6,60}$/, DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const HOME_TZ = process.env.HOME_TZ || 'Asia/Bangkok';
const todayHome = () => new Date().toLocaleDateString('en-CA', { timeZone: HOME_TZ });

function router({ pool, A, family }) {
  const r = express.Router(), q = async (s, a) => (await pool.query(s, a)).rows, json = express.json({ limit: '64kb' });
  const out = (x, today) => {
    const open = x.open_on <= today, sealed = !!x.sealed_at;
    return { id: x.id, child: x.child, title: x.title, open_on: x.open_on, sealed, open, by: x.created_by, at: new Date(x.created_at).getTime(), ...(!sealed || open ? { text: x.text } : {}) };
  };
  r.get('/api/b/capsules', A.requireEditor, async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const rows = await q("SELECT id, child, title, text, to_char(open_on,'YYYY-MM-DD') open_on, sealed_at, created_by, created_at FROM capsules WHERE family_id=$1 ORDER BY open_on, created_at", [family]);
      const today = todayHome();
      res.json({ today, list: rows.map((x) => out(x, today)) });
    } catch (e) { next(e); }
  });
  r.put('/api/b/capsules/:id', A.requireEditor, json, async (req, res, next) => {
    try {
      const id = req.params.id, b = req.body || {};
      if (!ID_RE.test(id)) return res.status(400).json({ error: 'id' });
      if (!DATE_RE.test(String(b.open_on || '')) || isNaN(Date.parse(b.open_on + 'T00:00:00Z'))) return res.status(400).json({ error: 'date' });
      if (b.open_on <= todayHome()) return res.status(400).json({ error: 'past' });   // a letter to the future opens after today
      const kids = (await q('SELECT slug FROM children WHERE family_id=$1', [family])).map((k) => k.slug), child = String(b.child || 'both');
      if (child !== 'both' && !kids.includes(child)) return res.status(400).json({ error: 'child' });
      const cur = (await q('SELECT sealed_at FROM capsules WHERE id=$1 AND family_id=$2', [id, family]))[0];
      if (cur && cur.sealed_at) return res.status(409).json({ error: 'sealed' });
      await q(`INSERT INTO capsules (id, family_id, child, title, text, open_on, created_by) VALUES ($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT (id) DO UPDATE SET child=EXCLUDED.child, title=EXCLUDED.title, text=EXCLUDED.text, open_on=EXCLUDED.open_on, updated_at=now() WHERE capsules.family_id=EXCLUDED.family_id AND capsules.sealed_at IS NULL`,
      [id, family, child, String(b.title || '').slice(0, 120), String(b.text || '').slice(0, 20000), b.open_on, String(req.user.name || '').slice(0, 40)]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  r.post('/api/b/capsules/:id/seal', A.requireEditor, async (req, res, next) => {
    try {
      const n = (await q("UPDATE capsules SET sealed_at=now() WHERE id=$1 AND family_id=$2 AND sealed_at IS NULL AND length(text) > 0 RETURNING id", [req.params.id, family])).length;
      res.status(n ? 200 : 409).json({ ok: !!n });
    } catch (e) { next(e); }
  });
  r.delete('/api/b/capsules/:id', A.requireEditor, async (req, res, next) => {
    try { await q('DELETE FROM capsules WHERE id=$1 AND family_id=$2', [req.params.id, family]); res.json({ ok: true }); } catch (e) { next(e); }
  });
  return r;
}
module.exports = { router, todayHome };
