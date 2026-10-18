// Trip reminders (Web Push): which steps are due when, the subscribe API (grown-ups only), and one send per reminder.
// The scheduler runs here in-process against the group's database with a fake sender (no real push service).
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { Pool } = require('pg');
const PUSH = require('../server/push.js');
const A = require('../server/auth.js');

const { BASE, CODE, DATABASE_URL } = process.env;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('trip reminders');

// ---- due(): the trip's timezone, a row's own tz, the 30-minute lead, the late window
const Z = (iso) => Date.parse(iso);
const hkDay = { trip: 'hk-macau-2026', tz: 'Asia/Hong_Kong', day_index: 1, date: '2026-12-06', rows: [{ t: '08:00', th: 'มื้อเช้า', en: 'Breakfast' }, { t: '09:00', th: 'แท็กซี่', en: 'Taxi' }, { t: 'ตี 3', th: 'x', en: 'x' }] };
ok(PUSH.due([hkDay], Z('2026-12-05T23:29:00Z')).length === 0, 'nothing before 30 min ahead (07:29 Hong Kong for an 08:00 step)');
{ const d = PUSH.due([hkDay], Z('2026-12-05T23:30:00Z')); ok(d.length === 1 && d[0].key === 'hk-macau-2026.d1.p0' && d[0].en === 'Breakfast', '07:30 Hong Kong: the 08:00 breakfast is due'); }
ok(PUSH.due([hkDay], Z('2026-12-05T23:46:00Z')).length === 0, 'a tick more than 15 min late sends nothing (no stale reminders after a long outage)');
ok(PUSH.due([hkDay], Z('2026-12-06T00:30:00Z')).map((x) => x.t).join() === '09:00', '08:30 Hong Kong: the 09:00 taxi; rows without HH:MM never fire');
const dep = { trip: 'hk-macau-2026', tz: 'Asia/Hong_Kong', day_index: 0, date: '2026-12-05', rows: [{ t: '11:30', tz: 'Asia/Bangkok', th: 'เช็กอิน', en: 'Check in' }] };
ok(PUSH.due([dep], Z('2026-12-05T04:00:00Z')).length === 1 && PUSH.due([dep], Z('2026-12-05T03:00:00Z')).length === 0, 'departure day: the Bangkok check-in uses Bangkok time (its own tz)');
ok(new Date(PUSH.zoned('2027-04-04', '08:30', 'Australia/Sydney')).toISOString() === '2027-04-03T22:30:00.000Z' && new Date(PUSH.zoned('2027-04-03', '08:30', 'Australia/Sydney')).toISOString() === '2027-04-02T21:30:00.000Z', 'Sydney: daylight saving ends on 4 Apr 2027 — both sides of the change land right');

// ---- the seeds: departure-day rows before landing carry Bangkok time
{ const hk = require('../server/seeds/hk-macau-2026.json'), au = require('../server/seeds/big-hop-2027.json');
  ok(hk.days[0].plan.filter((r) => r.tz === 'Asia/Bangkok').map((r) => r.t).join() === '11:30,14:00' && au.days[0].plan.filter((r) => r.tz === 'Asia/Bangkok').map((r) => r.t).join() === '05:30,08:30', 'seeds: the Bangkok check-in and take-off rows are marked Asia/Bangkok'); }

// ---- the API: grown-ups only, endpoints validated
const login = async (code) => (await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code }) })).headers.get('set-cookie').split(';')[0];
const ck = await login(CODE), vck = await login('835911');
const post = (u, b, c = ck) => fetch(BASE + u, { method: 'POST', headers: { 'x-mb': '1', cookie: c, 'content-type': 'application/json' }, body: JSON.stringify(b) });
const key = await (await fetch(BASE + '/api/b/push/key', { headers: { cookie: ck } })).json();
ok(/^[A-Za-z0-9_-]{80,}$/.test(key.key) && key.lead === 30, 'the phone gets the server’s public key and the 30-minute lead');
const sub = { endpoint: 'https://fcm.googleapis.com/fcm/send/abc123', keys: { p256dh: 'BOr8Z1aQ0Vb7Z_qX8kJd3oWwz0x6hQZ0bX4rjQ0L6lE5gP9kq8nV2u3T1yR0wS7aZ', auth: 'kq1F0v8wQ2mZ7xY3cR5tNg' }, lang: 'en' };
ok((await post('/api/b/push/sub', sub, vck)).status === 403 && (await fetch(BASE + '/api/b/push/key', { headers: { cookie: vck } })).status === 403, 'relatives (view-only) cannot switch reminders on');
ok((await post('/api/b/push/sub', { ...sub, endpoint: 'http://fcm.googleapis.com/fcm/send/x' })).status === 400 && (await post('/api/b/push/sub', { endpoint: sub.endpoint })).status === 400, 'only an https endpoint with its keys is accepted');
ok((await post('/api/b/push/sub', { ...sub, endpoint: 'https://internal.example/fcm.googleapis.com/x' })).status === 400 && (await post('/api/b/push/sub', { ...sub, endpoint: 'https://web.push.apple.com/QAbc-123' })).ok && (await post('/api/b/push/unsub', { endpoint: 'https://web.push.apple.com/QAbc-123' })).ok, 'only the browsers’ push services (Google, Apple, Mozilla, Microsoft) — never another address'); 
ok((await post('/api/b/push/sub', sub)).ok && (await post('/api/b/push/sub', { ...sub, lang: 'th' })).ok, 'a grown-up’s phone subscribes (again = update, e.g. the language)');
ok((await post('/api/b/push/test', { endpoint: 'https://fcm.googleapis.com/fcm/send/other' })).status === 404, 'test push only to a subscribed phone');

// ---- the scheduler: one send per reminder per phone, in the phone's language; a gone phone is dropped
const pool = new Pool({ connectionString: DATABASE_URL });
await PUSH.init(pool);
const sent = [];
let gone = false;
const R = PUSH.create({ pool, family: 'family', A, sender: async (s, payload) => { if (gone) throw Object.assign(new Error('gone'), { statusCode: 410 }); sent.push({ s, p: JSON.parse(payload) }); } });
const rows = (await pool.query("SELECT count(*)::int n FROM push_subs")).rows[0].n;
ok(rows === 1, 'one row for the phone (same endpoint twice)');
const at = PUSH.zoned('2026-12-06', '08:00', 'Asia/Hong_Kong') - 30 * 60000;   // Disneyland day, breakfast at Hoi Lin
ok(await R.tick(at) === 1 && sent.length === 1 && sent[0].p.title === '08:00 · อีก 30 นาที' && /Hoi Lin/.test(sent[0].p.body) && sent[0].p.url === '/#/t/hk-macau-2026/today/1' && sent[0].s.endpoint === sub.endpoint, 'tick at 07:30 Hong Kong: “08:00 · อีก 30 นาที — Hoi Lin…”, opens Disneyland day');
ok(await R.tick(at + 60000) === 0 && sent.length === 1, 'the next tick does not send it again');
ok(sent[0].p.body.length <= 140 && !/booking|PNR|passport no/i.test(sent[0].p.body), 'a short lock-screen line, the plan’s own words');
gone = true;
await R.tick(PUSH.zoned('2026-12-06', '09:00', 'Asia/Hong_Kong') - 30 * 60000);
ok((await pool.query("SELECT count(*)::int n FROM push_subs")).rows[0].n === 0, 'a phone the push service reports gone (410) is removed');
ok((await post('/api/b/push/sub', sub)).ok && (await post('/api/b/push/unsub', { endpoint: sub.endpoint })).ok && (await pool.query("SELECT count(*)::int n FROM push_subs")).rows[0].n === 0, 'turning reminders off removes the phone');
await pool.end();

if (failures) { console.log(`${failures} FAILED`); process.exit(1); }
