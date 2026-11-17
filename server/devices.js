'use strict';
/* The phones signed in and the family code (owner, Nov 2026: "มือถือหาย … เปลี่ยนรหัสครอบครัวได้โดยไม่ทำให้เครื่องอื่นหลุด"; migration 0033).
   GET  /api/b/devices                 editors: every phone still signed in — who (the name typed at sign-in or the relatives' group),
                                       which kind of phone ("iphone safari"), when it signed in and was last used; this phone marked
   POST /api/b/devices/:uid/out        editors: that phone is signed out at once (its next request is a stranger's)
   POST /api/b/devices/out-others      editors: every phone but this one (and any cookie older than the list)
   PUT  /api/b/family/code {old, code, others?}  editors: a new family code (6–12 digits; the old one typed again). Phones already
                                       signed in stay signed in unless `others` — a new code changes only what a new sign-in types. */
const express = require('express');

function router({ pool, A, family }) {
  const r = express.Router(), q = async (s, a) => (await pool.query(s, a)).rows;
  const json = express.json({ limit: '4kb' });
  r.get('/api/b/devices', A.requireEditor, async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const rows = await q(`SELECT s.uid, s.role, s.name, s.device, s.created_at, s.last_seen, g.name AS grp FROM sessions s LEFT JOIN viewer_groups g ON g.id = s.group_id
        WHERE s.family_id=$1 AND s.revoked_at IS NULL ORDER BY s.last_seen DESC LIMIT 200`, [family]);
      res.json({ me: req.user.uid, list: rows.map((x) => ({ uid: x.uid, role: x.role, name: x.name, group: x.grp || null, device: x.device, since: new Date(x.created_at).getTime(), seen: new Date(x.last_seen).getTime(), me: x.uid === req.user.uid })) });
    } catch (e) { next(e); }
  });
  r.post('/api/b/devices/out-others', A.requireEditor, async (req, res, next) => {
    try {
      const n = (await q('UPDATE sessions SET revoked_at=now() WHERE family_id=$1 AND uid<>$2 AND revoked_at IS NULL RETURNING uid', [family, req.user.uid])).length;
      await q("INSERT INTO settings (key, value) VALUES ('sessions_cut', $1) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", [JSON.stringify({ at: Date.now(), keep: [req.user.uid] })]);
      A.sessionsChanged();
      res.json({ ok: true, out: n });
    } catch (e) { next(e); }
  });
  r.post('/api/b/devices/:uid/out', A.requireEditor, async (req, res, next) => {
    try {
      if (!/^[0-9a-f]{6,32}$/.test(req.params.uid)) return res.status(400).json({ error: 'uid' });
      const n = (await q('UPDATE sessions SET revoked_at=now() WHERE uid=$1 AND family_id=$2 AND revoked_at IS NULL RETURNING uid', [req.params.uid, family])).length;
      A.sessionsChanged();
      res.status(n ? 200 : 404).json({ ok: !!n });
    } catch (e) { next(e); }
  });
  r.put('/api/b/family/code', A.requireEditor, json, async (req, res, next) => {
    try {
      const b = req.body || {}, old = String(b.old || ''), code = String(b.code || '');
      if (A.throttled(req.ip)) return res.status(429).json({ error: 'too-many' });
      if (!A.isFamilyCode(old)) { A.noteFail(req.ip); return res.status(403).json({ error: 'old' }); }   // a phone in someone else's hands cannot change it
      if (!/^\d{6,12}$/.test(code)) return res.status(400).json({ error: 'code' });
      if (code === old) return res.status(400).json({ error: 'same' });
      if ((A.VIEW_PIN && A.safeEq(code, A.VIEW_PIN)) || (await q('SELECT 1 FROM viewer_groups WHERE pin_hash=$1', [A.pinHash(code)])).length) return res.status(409).json({ error: 'pin-taken' });
      await A.setFamilyCode(code);
      let out = 0;
      if (b.others) {
        out = (await q('UPDATE sessions SET revoked_at=now() WHERE family_id=$1 AND uid<>$2 AND revoked_at IS NULL RETURNING uid', [family, req.user.uid])).length;
        await q("INSERT INTO settings (key, value) VALUES ('sessions_cut', $1) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value", [JSON.stringify({ at: Date.now(), keep: [req.user.uid] })]);
        A.sessionsChanged();
      }
      console.log('family code changed in the app');   // never the code
      res.json({ ok: true, out });
    } catch (e) { next(e); }
  });
  return r;
}
module.exports = { router };
