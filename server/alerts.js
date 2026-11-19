'use strict';
/* Telling the owner when something goes wrong (owner, Nov 2026: "แจ้งเตือนเจ้าของระบบ … ข้อผิดพลาดพุ่ง พื้นที่ใกล้เต็ม สำเนาล้มเหลว ซ้อมกู้ไม่ผ่าน"):
   a push to the parents' phones (push.js alert — the reminders' own channel, no new service), each kind at most once a day (a week for
   the room), opening the page that explains it:
   · problems on the phones: 20 or more reports in the last hour, or 5 new different ones (server/errors.js)  → #/health
   · problems on the server: 10 or more answers of 500+ in the last hour (server/watch.js)  → #/health
   · room: the server's own disk under 15 % free (photos on disk), or the photos past 85 % of STORAGE_LIMIT_GB (photos in a bucket)  → #/health
   · the nightly copy: the Backup workflow reports each run (POST /api/backup/report, Bearer BACKUP_TOKEN); a failed copy or a failed
     restore drill is told at once, and during a trip a copy older than 36 hours is told too  → #/health
   GET /api/b/health/alerts (editors): the last copy, the disk, the alerts sent lately — shown on the room page. */
const fs = require('fs');
const path = require('path');
const express = require('express');

const DAY = 864e5;
function create({ pool, A, family, push, dataDir, bucket, watch }) {
  const q = async (s, a) => (await pool.query(s, a)).rows;
  const getSet = async (k) => { const r = (await q('SELECT value FROM settings WHERE key=$1', [k]))[0]; try { return r ? JSON.parse(r.value) : null; } catch (_) { return null; } };
  const putSet = (k, v) => q('INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value', [k, JSON.stringify(v)]);
  const day = (now) => new Date(now).toISOString().slice(0, 10), week = (now) => `${new Date(now).getUTCFullYear()}w${Math.floor((now - Date.UTC(new Date(now).getUTCFullYear(), 0, 1)) / (7 * DAY))}`;
  const note = async (kind, key, th, en) => {   // sent once per key; the last few kept for the page
    const n = await push.alert({ key: `alert.${key}`, th, en, url: '/#/health' });
    const log = (await getSet('alerts_log')) || []; log.unshift({ kind, at: Date.now(), en: en.body }); await putSet('alerts_log', log.slice(0, 20));
    return n;
  };
  async function diskFree() {
    if (bucket) return null;
    try { const s = await fs.promises.statfs(path.resolve(dataDir)); return { free: s.bavail * s.bsize, total: s.blocks * s.bsize }; } catch (_) { return null; }
  }
  async function check(now = Date.now()) {
    const out = [];
    // problems on the phones
    const e = (await q("SELECT coalesce(sum(n) FILTER (WHERE last_at > now() - interval '1 hour'), 0)::int recent, count(*) FILTER (WHERE first_at > now() - interval '1 hour')::int fresh FROM client_errors WHERE family_id=$1", [family]))[0];
    if (e.recent >= 20 || e.fresh >= 5) out.push(['errors', `err.${day(now)}`, { title: 'แอปสะดุดบนมือถือหลายครั้ง', body: `ชั่วโมงที่ผ่านมามือถือรายงานปัญหา ${e.recent} ครั้ง เปิดดูว่าเกิดที่ไหน` }, { title: 'The app is tripping on phones', body: `${e.recent} problem reports in the last hour — see where` }]);
    // the server itself: ten answers of 500 or more in the last hour (server/watch.js)
    const sv = watch ? await watch.recent() : { errs: 0 };
    if (sv.errs >= 10) out.push(['server', `srv.${day(now)}`, { title: 'เซิร์ฟเวอร์ตอบผิดพลาดหลายครั้ง', body: `ชั่วโมงที่ผ่านมามีคำขอที่ล้มเหลว ${sv.errs} ครั้ง เปิดดูว่าเกิดที่ไหน` }, { title: 'The server is failing requests', body: `${sv.errs} failed requests in the last hour — see where` }]);
    // room
    const d = await diskFree();
    if (d && d.total && d.free / d.total < 0.15) out.push(['room', `disk.${week(now)}`, { title: 'พื้นที่เก็บรูปใกล้เต็ม', body: `เหลือที่ว่าง ${Math.round((d.free / d.total) * 100)}% เพิ่มพื้นที่ใน Railway ก่อนรูปใหม่จะเก็บไม่ได้` }, { title: 'Photo storage nearly full', body: `${Math.round((d.free / d.total) * 100)}% free — add room before new photos cannot be kept` }]);
    const lim = Number(process.env.STORAGE_LIMIT_GB) || 0;
    if (bucket && lim > 0) {
      const used = Number((await q('SELECT coalesce(sum(bytes),0)::bigint b FROM media WHERE family_id=$1', [family]))[0].b);
      if (used / (lim * 1073741824) >= 0.85) out.push(['room', `bucket.${week(now)}`, { title: 'พื้นที่เก็บรูปใกล้เต็ม', body: `ใช้ไปแล้ว ${Math.round(used / 1073741824)} จาก ${lim} GB` }, { title: 'Photo storage nearly full', body: `${Math.round(used / 1073741824)} of ${lim} GB used` }]);
    }
    // the nightly copy is late during a trip (only once the workflow has reported at least once)
    const last = await getSet('backup_last');
    if (last && last.at) {
      const due = (await q('SELECT EXISTS (SELECT 1 FROM trips WHERE family_id=$1 AND current_date BETWEEN date_from - 1 AND date_to + 2) AS due', [family]))[0].due;
      if (due && now - last.at > 36 * 36e5) out.push(['backup', `stale.${day(now)}`, { title: 'ยังไม่มีสำเนาใหม่', body: 'ช่วงทริปควรมีสำเนาทุกคืน แต่ครั้งล่าสุดนานเกิน 36 ชั่วโมงแล้ว' }, { title: 'No fresh copy', body: 'During a trip there is a copy every night, but the last one is over 36 hours old' }]);
    }
    let n = 0; for (const [kind, key, th, en] of out) n += await note(kind, key, th, en);
    return out.map((x) => x[1]);
  }
  const r = express.Router();
  // the Backup workflow's report: {ok, drill: 'ok'|'failed'|'skipped'} — never a code or a file name
  r.post('/api/backup/report', express.json({ limit: '2kb' }), async (req, res, next) => {
    const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
    if (!A.BACKUP_TOKEN || !m || !A.safeEq(m[1], A.BACKUP_TOKEN)) return res.status(401).json({ error: 'auth' });
    try {
      const b = req.body || {}, ok = b.ok === true, drill = ['ok', 'failed', 'skipped'].includes(b.drill) ? b.drill : 'skipped', now = Date.now();
      const prev = (await getSet('backup_last')) || {};
      await putSet('backup_last', ok ? { at: now, ok: true, drill, tried: now } : { ...prev, ok: false, drill, tried: now });
      if (!ok) await note('backup', `backup.${day(now)}`, { title: 'สำเนาคืนนี้ไม่สำเร็จ', body: 'การทำสำเนาข้อมูลล้มเหลว เปิดดูใน GitHub ว่าเกิดอะไรขึ้น' }, { title: 'Tonight’s copy failed', body: 'The backup did not finish — see the run on GitHub' });
      else if (drill === 'failed') await note('backup', `drill.${day(now)}`, { title: 'ซ้อมกู้ข้อมูลไม่ผ่าน', body: 'สำเนาเก็บไว้แล้ว แต่ลองกู้บนเครื่องใหม่แล้วข้อมูลไม่ครบ เปิดดูใน GitHub' }, { title: 'The restore drill failed', body: 'The copy is kept, but restoring it left something out — see the run on GitHub' });
      res.json({ ok: true });
    } catch (e) { next(e); }
  });
  r.get('/api/b/health/alerts', A.requireEditor, async (req, res, next) => {
    try {
      res.setHeader('Cache-Control', 'no-store');
      res.json({ backup: await getSet('backup_last'), disk: await diskFree(), log: (await getSet('alerts_log')) || [], limitGb: Number(process.env.STORAGE_LIMIT_GB) || null });
    } catch (e) { next(e); }
  });
  let timer = null;
  const start = () => { const run = () => check().catch((e) => console.error('alerts', e.message)); timer = setInterval(run, 36e5); timer.unref(); setTimeout(run, 60e3).unref(); };
  const stop = () => clearInterval(timer);
  return { router: r, check, start, stop };
}
module.exports = { create };
