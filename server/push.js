'use strict';
// Reminders on the trip (Web Push): 30 minutes before each timed step of a day's plan (trip_days.plan.plan rows with t "HH:MM"),
// every phone that switched reminders on gets "08:00 · in 30 min — Breakfast at …". Only the plan's own words travel
// (no photos, no names); the push service only relays the encrypted message. Times are the trip's timezone, or a row's
// own `tz` (the departure day's Bangkok check-in). One scheduler tick a minute; push_sent stops doubles across restarts.
const crypto = require('crypto');
const express = require('express');
const webpush = require('web-push');
const FAM = require('./family');

const LEAD = (+process.env.PUSH_LEAD_MIN || 30) * 60000;   // how early the reminder comes
const LATE = 15 * 60000;
// the browsers' push services only — the server never POSTs to any other address a phone (or a stolen cookie) gives it
const PUSH_HOST = /^https:\/\/([a-z0-9-]+\.)*(fcm\.googleapis\.com|android\.googleapis\.com|push\.apple\.com|push\.services\.mozilla\.com|notify\.windows\.com)\/[^\s]{4,600}$/i;                                    // a tick that comes late (deploy, sleep) still sends within this window

let KEYS = null;
async function init(pool) {
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) KEYS = { publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY };
  else {   // generated once and kept in Postgres, like the session secret
    const fresh = webpush.generateVAPIDKeys();
    await pool.query("INSERT INTO settings (key, value) VALUES ('vapid', $1) ON CONFLICT (key) DO NOTHING", [JSON.stringify(fresh)]);
    KEYS = JSON.parse((await pool.query("SELECT value FROM settings WHERE key='vapid'")).rows[0].value);
  }
  webpush.setVapidDetails(process.env.PUSH_SUBJECT || 'mailto:noreply@memory-bookshelf.invalid', KEYS.publicKey, KEYS.privateKey);
}

// the UTC instant of a wall-clock time in a timezone (two passes so a DST change that day lands right)
function zoned(date, hhmm, tz) {
  const [y, mo, d] = date.split('-').map(Number), [h, mi] = hhmm.split(':').map(Number);
  const want = Date.UTC(y, mo - 1, d, h, mi);
  const off = (t) => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).formatToParts(t).map((x) => [x.type, x.value])); return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - t; };
  let t = want - off(want); t = want - off(t);
  return t;
}
// the first point of a plan row, short enough for a lock screen
const short = (s, n = 140) => { const x = String(s || '').split(/\s+·\s+|;\s+/)[0].trim(); return x.length > n ? x.slice(0, n - 1).trimEnd() + '…' : x; };

// which reminders are due at `now` (ms) for these days [{trip, tz, day_index, date, rows}] — pure, for the tests
function due(days, now) {
  const out = [];
  for (const d of days) (d.rows || []).forEach((r, j) => {
    const m = /^([0-2]\d):([0-5]\d)$/.exec(r && r.t || ''); if (!m) return;
    const at = zoned(d.date, r.t, r.tz || d.tz), fire = at - LEAD;
    if (now >= fire && now < fire + LATE && now < at) out.push({ key: `${d.trip}.d${d.day_index}.p${j}`, trip: d.trip, day: d.day_index, t: r.t, th: r.th, en: r.en, at });
  });
  return out;
}
const message = (r, lang, now = Date.now()) => {
  const mins = Math.max(1, Math.round((r.at - now) / 60000)), th = lang === 'th';
  return JSON.stringify({
    title: th ? `${r.t} · อีก ${mins} นาที` : `${r.t} · in ${mins} min`,
    body: short(th ? r.th || r.en : r.en || r.th),
    tag: r.key, url: `/#/t/${r.trip}/today/${r.day}`,
  });
};

// the trip's own nudges, at a fixed local time rather than before a plan row — pure, for the tests.
// trips: [{trip, title:{th,en}, tz, from, to, doors}] · each nudge: {key, at, url, th:{title, body}, en:{title, body}, day?}
const PACK_AT = '19:00', DOOR_AT = '08:00', LOG_AT = '21:30';
// before the trip the family is still at home: the store-the-book evening and the countdown-door mornings use home time
// (HOME_TZ, default Bangkok — the owner's ask: 08:00 Thai time), the trip's own evenings use the trip's timezone
const HOME_TZ = process.env.HOME_TZ || 'Asia/Bangkok';
const ANN_AT = '09:00', ANN_YEARS = 20;
const addYears = (date, n) => { const y = +date.slice(0, 4) + n, s = `${y}${date.slice(4)}`; return s.slice(5) === '02-29' && !(y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? null : s; };   // 29 Feb only in leap years
const addDays = (date, n) => new Date(Date.parse(date + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10);
// kids = {th, en}: the children's names as one phrase (server/family.js names), 'เด็กๆ' / 'the kids' when none are set up yet
function extras(trips, now, kids = { th: 'เด็กๆ', en: 'the kids' }) {
  const out = [], live = (at) => now >= at && now < at + LATE;
  for (const x of trips) {
    const name = x.title || {}, nTh = name.th || name.en || '', nEn = name.en || name.th || '';
    // two evenings before the flight: store the book on the phone (the shelf can't see which phones already did)
    const home = x.home || HOME_TZ;
    const pack = zoned(addDays(x.from, -2), PACK_AT, home);
    if (live(pack)) out.push({ key: `${x.trip}.x.pack`, at: pack, url: `/#/t/${x.trip}/offline`,
      th: { title: `อีก 2 วันออกเดินทาง · ${nTh}`, body: 'กด "เก็บเล่มนี้ไว้ในเครื่อง" ก่อนขึ้นเครื่อง ถ้ายังไม่ได้เก็บ — เปิดได้แม้ไม่มีสัญญาณ' },
      en: { title: `2 days to go · ${nEn}`, body: 'Tap "Keep this book on the phone" before the flight, if you haven’t yet — it opens without signal' } });
    // the countdown doors: door k opens when N-k+1 sleeps are left (kid.js doorOpen), one morning each
    for (let left = x.doors || 0; left >= 1; left--) {
      const k = (x.doors || 0) - left + 1, at = zoned(addDays(x.from, -left), DOOR_AT, home);
      if (live(at)) out.push({ key: `${x.trip}.x.door${k}`, at, url: '/#/',
        th: { title: `🎁 ประตูที่ ${k} เปิดได้แล้ว`, body: `อีก ${left} วันไป${nTh} — ให้${kids.th}เปิดเซอร์ไพรส์ของวันนี้` },
        en: { title: `🎁 Door ${k} is ready`, body: `${left} ${left === 1 ? 'sleep' : 'sleeps'} to ${nEn} — today's surprise for ${kids.en}` } });
    }
    // every evening of the trip: record the day (tick() skips a day that already has something in it)
    for (let i = 0, d = x.from; d <= x.to; i++, d = addDays(d, 1)) {
      const at = zoned(d, LOG_AT, x.tz);
      // opens the record page at the evening buttons (/ai): today in brief, the bedtime story, the bedtime questions
      if (live(at)) out.push({ key: `${x.trip}.x.log.d${i}`, at, trip: x.trip, day: i, url: `/#/t/${x.trip}/log/${i}/ai`,
        th: { title: `บันทึกวันที่ ${i + 1} · ${nTh}`, body: 'รูป อารมณ์ คำพูดเด็ก — แล้วกดให้ Claude สรุปวันนี้ แต่งนิทาน และตั้งคำถามก่อนนอน' },
        en: { title: `Record day ${i + 1} · ${nEn}`, body: 'Photos, moods, what the kids said — then let Claude sum up the day, write the story and the bedtime questions' } });
    }
    // on this day, years later: 09:00 home time on each trip day's anniversary, opening that day of the book
    // (tick() sends it only when that day has something in it — a photo, a quote, a mood…; words only, never a photo)
    if (x.to < new Date(now).toISOString().slice(0, 10)) {
      for (let i = 0, d = x.from; d <= x.to; i++, d = addDays(d, 1)) {
        for (let n = 1; n <= ANN_YEARS; n++) {
          const ad = addYears(d, n); if (!ad) continue;
          const at = zoned(ad, ANN_AT, home);
          if (live(at)) out.push({ key: `${x.trip}.x.ann${n}.d${i}`, at, trip: x.trip, day: i, need: true, url: `/#/t/${x.trip}/book/d/${i}`,
            th: { title: `📅 วันนี้เมื่อ ${n} ปีก่อน`, body: `${nTh} · วันที่ ${i + 1} — เปิดดูรูปและคำพูดของเด็กๆ วันนั้น` },
            en: { title: `📅 On this day, ${n} year${n > 1 ? 's' : ''} ago`, body: `${nEn} · day ${i + 1} — the photos and the kids' words from that day` } });
        }
      }
    }
  }
  return out;
}

function create({ pool, family, A, sender = (sub, payload, opt) => webpush.sendNotification(sub, payload, opt) }) {   // sender: the tests pass a fake
  const send = async (sub, payload) => {
    try {
      await sender({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload, { TTL: 1800, urgency: 'high' });
      await pool.query('UPDATE push_subs SET last_ok=now() WHERE id=$1', [sub.id]);
      return true;
    } catch (e) {
      if (e.statusCode === 404 || e.statusCode === 410) await pool.query('DELETE FROM push_subs WHERE id=$1', [sub.id]);   // the phone unsubscribed
      else console.error('push', e.statusCode || e.message);
      return false;
    }
  };
  const kidNames = async () => {
    const rows = (await pool.query('SELECT name_th, name_en FROM children WHERE family_id=$1 ORDER BY pos', [family])).rows;
    return rows.length ? { th: FAM.names(rows, 'th'), en: FAM.names(rows, 'en') } : { th: 'เด็กๆ', en: 'the kids' };
  };
  async function tick(now = Date.now()) {
    const days = (await pool.query(`SELECT t.id trip, t.timezone tz, d.day_index, to_char(d.date,'YYYY-MM-DD') date, d.plan->'plan' rows
      FROM trip_days d JOIN trips t ON t.id=d.trip_id WHERE t.family_id=$1 AND d.date BETWEEN $2::date - 1 AND $2::date + 1`, [family, new Date(now).toISOString().slice(0, 10)])).rows;
    const trips = (await pool.query(`SELECT id trip, title, timezone tz, to_char(date_from,'YYYY-MM-DD') "from", to_char(date_to,'YYYY-MM-DD') "to",
        coalesce(jsonb_array_length(passport->'countdown'->'doors'), 0) doors
      FROM trips WHERE family_id=$1 AND ($2::date BETWEEN date_from - 16 AND date_to + 1 OR date_to < $2::date)`, [family, new Date(now).toISOString().slice(0, 10)])).rows;   // past trips too: their days come back on the anniversary
    const list = due(days, now).map((r) => ({ ...r, msg: (lang) => message(r, lang, now) }));
    for (const x of extras(trips, now, await kidNames())) {
      if (x.day !== undefined) {
        const has = (await pool.query(`SELECT 1 FROM entries WHERE trip_id=$1 AND day_index=$2 AND kind IN ('quote','mood','fav','note','first')
          UNION ALL SELECT 1 FROM media WHERE trip_id=$1 AND day_index=$2 LIMIT 1`, [x.trip, x.day])).rowCount > 0;
        if (x.need ? !has : has) continue;   // record-the-day: only an empty day · on-this-day: only a day with memories
      }
      list.push({ key: x.key, msg: (lang) => JSON.stringify({ ...(lang === 'en' ? x.en : x.th), tag: x.key, url: x.url }) });
    }
    if (!list.length) return 0;
    const subs = (await pool.query('SELECT * FROM push_subs WHERE family_id=$1', [family])).rows;
    let n = 0;
    for (const r of list) {
      const claimed = (await pool.query('INSERT INTO push_sent (key) VALUES ($1) ON CONFLICT DO NOTHING RETURNING key', [r.key])).rowCount;
      if (!claimed) continue;
      for (const s of subs) if (await send(s, r.msg(s.lang))) n++;
    }
    return n;
  }
  // a relative sent a heart: the grown-ups' phones hear about it (at most one push per 10 minutes, so a burst of hearts is one
  // nudge). Like every push here it carries no names and no heart text — only that one arrived — and opens the book's hearts page.
  const HEART_GAP = 10 * 60000;
  async function heart({ trip }, now = Date.now()) {
    const key = `heart.${Math.floor(now / HEART_GAP)}`;
    if (!(await pool.query('INSERT INTO push_sent (key) VALUES ($1) ON CONFLICT DO NOTHING RETURNING key', [key])).rowCount) return 0;
    const subs = (await pool.query('SELECT * FROM push_subs WHERE family_id=$1', [family])).rows, kids = await kidNames();
    const msg = (lang) => JSON.stringify(lang === 'en'
      ? { title: 'A heart for the kids 💗', body: `Someone in the family sent one — open it with ${kids.en} at bedtime`, tag: 'heart', url: `/#/t/${trip}/hearts` }
      : { title: 'ญาติส่งหัวใจมาให้เด็กๆ 💗', body: `เปิดดูด้วยกันกับ${kids.th}ก่อนนอนนะ`, tag: 'heart', url: `/#/t/${trip}/hearts` });
    let n = 0;
    for (const s of subs) if (await send(s, msg(s.lang))) n++;
    return n;
  }
  let timer = null;
  const start = () => { const run = () => tick().catch((e) => console.error('push tick', e.message)); timer = setInterval(run, 60000); timer.unref(); setTimeout(run, 5000).unref(); };
  const stop = () => clearInterval(timer);

  const r = express.Router();
  const json = express.json({ limit: '10kb' });
  r.get('/api/b/push/key', A.requireEditor, (_req, res) => res.json({ key: KEYS.publicKey, lead: LEAD / 60000 }));
  r.post('/api/b/push/sub', A.requireEditor, json, async (req, res) => {
    const s = req.body || {}, k = s.keys || {};
    if (!PUSH_HOST.test(String(s.endpoint || '')) || !k.p256dh || !k.auth || String(k.p256dh).length > 200 || String(k.auth).length > 100) return res.status(400).json({ error: 'bad-sub' });
    const id = crypto.createHash('sha256').update(s.endpoint).digest('hex'), lang = s.lang === 'en' ? 'en' : 'th';
    await pool.query(`INSERT INTO push_subs (id, family_id, endpoint, p256dh, auth, lang) VALUES ($1,$2,$3,$4,$5,$6)
      ON CONFLICT (id) DO UPDATE SET p256dh=EXCLUDED.p256dh, auth=EXCLUDED.auth, lang=EXCLUDED.lang`, [id, family, s.endpoint, k.p256dh, k.auth, lang]);
    res.json({ ok: true });
  });
  r.post('/api/b/push/unsub', A.requireEditor, json, async (req, res) => {
    const e = String((req.body || {}).endpoint || '');
    await pool.query('DELETE FROM push_subs WHERE id=$1 AND family_id=$2', [crypto.createHash('sha256').update(e).digest('hex'), family]);
    res.json({ ok: true });
  });
  // "send me a test" — only to the phone that asks
  r.post('/api/b/push/test', A.requireEditor, json, async (req, res) => {
    const e = String((req.body || {}).endpoint || '');
    const s = (await pool.query('SELECT * FROM push_subs WHERE id=$1 AND family_id=$2', [crypto.createHash('sha256').update(e).digest('hex'), family])).rows[0];
    if (!s) return res.status(404).json({ error: 'not-subscribed' });
    const th = s.lang === 'th';
    const ok = await send(s, JSON.stringify({ title: th ? 'ทดสอบการเตือน' : 'Test reminder', body: th ? `ใช้ได้แล้ว — จะเตือนก่อนทุกกิจกรรม ${LEAD / 60000} นาที` : `Working — you will hear ${LEAD / 60000} min before each step`, tag: 'test', url: '/' }));
    res.status(ok ? 200 : 502).json({ ok });
  });
  return { router: r, tick, heart, start, stop };
}

module.exports = { init, create, due, extras, zoned, short, LEAD };
