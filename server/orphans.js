'use strict';
/* Stray files (owner, Nov 2026: "เก็บกวาดไฟล์ที่ไม่มีเจ้าของ"): files in the family's storage that no row names any more — an upload
   cut off between the file and its row, a delete that failed half-way. They cost room and are never seen.
   Only the photo folders are looked at (p/ t/ a/ v/ i/ r/ = photos, thumbnails, voice memos, clips, relatives' photos waiting, films);
   drawn pictures, characters and emoji are left alone. A file counts as stray only when it is older than two days (an upload in
   flight writes its file before its row) and no row names it (bookshelf.js familyKeys, the same list "delete everything" uses).
   GET /api/b/health/orphans (editors): the last count {at, n, bytes}, looked at again in the background when older than a day.
   POST /api/b/health/orphans (editors): looks again and removes them; answers the new count + removed. */
const express = require('express');

const DIRS = ['p/', 't/', 'a/', 'v/', 'i/', 'r/'];
const AGE = 2 * 864e5;

function create({ pool, media, A, hooks }) {
  const q = async (s, a) => (await pool.query(s, a)).rows;
  const getSet = async (k) => { const r = (await q('SELECT value FROM settings WHERE key=$1', [k]))[0]; try { return r ? JSON.parse(r.value) : null; } catch (_) { return null; } };
  const putSet = (k, v) => q('INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value', [k, JSON.stringify(v)]);
  let busy = null;
  async function scan(remove, now = Date.now()) {
    if (!media.list || !hooks.keys) return { at: now, n: 0, bytes: 0 };
    const named = new Set(await hooks.keys());
    let n = 0, bytes = 0, removed = 0;
    for (const dir of DIRS) {
      for await (const o of media.list(dir)) {
        if (named.has(o.key) || !(o.at && now - o.at > AGE)) continue;
        if (remove) { try { await media.del(o.key); removed++; continue; } catch (_) { /* counted below as still there */ } }
        n++; bytes += o.size;
      }
    }
    const out = { at: now, n, bytes };
    await putSet('orphans_last', out);
    if (removed) console.log(`stray files removed: ${removed}`);   // a count only
    return { ...out, removed };
  }
  const once = (remove) => { if (!busy) busy = scan(remove).finally(() => { busy = null; }); return busy; };
  const r = express.Router();
  r.get('/api/b/health/orphans', A.requireEditor, async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      const last = await getSet('orphans_last');
      if (!last || Date.now() - last.at > 864e5) { if (last) once(false).catch(() => {}); else return res.json(await once(false)); }
      res.json(last);
    } catch (e) { next(e); }
  });
  r.post('/api/b/health/orphans', A.requireEditor, async (req, res, next) => {
    try { if (busy) await busy.catch(() => {}); res.json(await once(true)); } catch (e) { next(e); }
  });
  return { router: r, scan };
}
module.exports = { create, DIRS };
