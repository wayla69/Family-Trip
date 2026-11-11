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

// ---- extras(): store-the-book two evenings before, a countdown door each morning, record-the-day each evening
{ const hk = { trip: 'hk-macau-2026', title: { th: 'ฮ่องกง', en: 'Hong Kong' }, tz: 'Asia/Hong_Kong', from: '2026-12-05', to: '2026-12-10', doors: 14 };
  const at = (d, t) => PUSH.zoned(d, t, 'Asia/Bangkok'), atHK = (d, t) => PUSH.zoned(d, t, 'Asia/Hong_Kong'), keys = (now) => PUSH.extras([hk], now).map((x) => x.key).join();
  ok(keys(at('2026-12-03', '19:00')) === 'hk-macau-2026.x.pack' && PUSH.extras([hk], at('2026-12-03', '19:00'))[0].url === '/#/t/hk-macau-2026/offline' && keys(at('2026-12-03', '18:59')) === '' && keys(at('2026-12-03', '19:16')) === '', 'two evenings before the flight, 19:00 Thai time (still at home): "keep this book on the phone" (opens the Offline page)');
  ok(keys(at('2026-11-21', '08:00')) === 'hk-macau-2026.x.door1' && keys(at('2026-12-04', '08:05')) === 'hk-macau-2026.x.door14' && keys(at('2026-11-20', '08:00')) === '' && keys(at('2026-12-05', '08:00')) === '', 'countdown doors: door 1 at 08:00 Thai time 14 sleeps before, door 14 the last morning — none before or on the day');
  ok(keys(atHK('2026-11-21', '08:00')) === '', 'a door is not sent at 08:00 Hong Kong time (07:00 at home)');
  { const x = PUSH.extras([hk], at('2026-11-30', '08:00'))[0]; ok(x.key === 'hk-macau-2026.x.door10' && /5 sleeps to Hong Kong/.test(x.en.body) && /อีก 5 วันไปฮ่องกง/.test(x.th.body), 'door 10 says 5 sleeps to go, in both languages'); }
  ok(keys(atHK('2026-12-05', '21:30')) === 'hk-macau-2026.x.log.d0' && keys(atHK('2026-12-10', '21:30')) === 'hk-macau-2026.x.log.d5' && keys(atHK('2026-12-11', '21:30')) === '' && PUSH.extras([hk], atHK('2026-12-06', '21:31'))[0].url === '/#/t/hk-macau-2026/log/1/ai', 'every trip evening, 21:30 trip time: "record day N" (opens that day’s record page at the evening Claude buttons)');
  ok(PUSH.extras([{ ...hk, doors: 0 }], at('2026-11-21', '08:00')).length === 0, 'a book without countdown doors sends no door mornings');
  ok(keys(at('2027-12-06', '09:00')) === 'hk-macau-2026.x.ann1.d1' && keys(at('2028-12-10', '09:00')) === 'hk-macau-2026.x.ann2.d5' && keys(at('2026-12-06', '09:00')) === '' && PUSH.extras([hk], at('2027-12-06', '09:00'))[0].url === '/#/t/hk-macau-2026/book/d/1', 'on this day: each trip day\'s anniversary at 09:00 home time, years later — never during the trip'); }

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
{ const n0 = sent.length;
  ok(await R.tick(PUSH.zoned('2026-12-03', '19:00', 'Asia/Bangkok')) === 1 && sent[n0].p.url === '/#/t/hk-macau-2026/offline' && /เก็บเล่มนี้ไว้ในเครื่อง/.test(sent[n0].p.body) && sent[n0].p.tag === 'hk-macau-2026.x.pack', 'scheduler: the store-the-book nudge goes out two evenings before, in the phone’s language');
  ok(await R.tick(PUSH.zoned('2026-12-03', '19:01', 'Asia/Bangkok')) === 0, '…once');
  ok(await R.tick(PUSH.zoned('2026-11-21', '08:00', 'Asia/Bangkok')) === 1 && /ประตูที่ 1/.test(sent[sent.length - 1].p.title), 'scheduler: door 1 the morning 14 sleeps before');
  const rec = async (i) => (await pool.query(`SELECT 1 FROM entries WHERE trip_id='hk-macau-2026' AND day_index=$1 AND kind IN ('quote','mood','fav','note','first') UNION ALL SELECT 1 FROM media WHERE trip_id='hk-macau-2026' AND day_index=$1`, [i])).rowCount > 0;
  const days = [0, 1, 2, 3, 4, 5], recorded = []; for (const i of days) if (await rec(i)) recorded.push(i);
  const empty = days.find((i) => !recorded.includes(i)), done = recorded[0];
  if (empty !== undefined) ok(await R.tick(PUSH.zoned(`2026-12-${String(5 + empty).padStart(2, '0')}`, '21:30', 'Asia/Hong_Kong')) === 1 && sent[sent.length - 1].p.url === `/#/t/hk-macau-2026/log/${empty}/ai`, `scheduler: day ${empty + 1} has nothing recorded yet — “record day ${empty + 1}” at 21:30`);
  if (done !== undefined) ok(await R.tick(PUSH.zoned(`2026-12-${String(5 + done).padStart(2, '0')}`, '21:30', 'Asia/Hong_Kong')) === 0, `scheduler: day ${done + 1} already has memories — no record nudge`);
  // on this day, a year later: 09:00 home time, only for a day that has memories, opening that day of the book
  if (done !== undefined) { const n1 = sent.length;
    ok(await R.tick(PUSH.zoned(`2027-12-${String(5 + done).padStart(2, '0')}`, '09:00', 'Asia/Bangkok')) === 1 && /1 ปีก่อน/.test(sent[n1].p.title) && sent[n1].p.url === `/#/t/hk-macau-2026/book/d/${done}`, `on this day: a year later, day ${done + 1} (with memories) comes back at 09:00 Thai time`); }
  if (empty !== undefined) ok(await R.tick(PUSH.zoned(`2027-12-${String(5 + empty).padStart(2, '0')}`, '09:00', 'Asia/Bangkok')) === 0, `on this day: day ${empty + 1} had nothing recorded — no nudge`);
  ok(empty !== undefined || done !== undefined, 'the record nudge was checked'); }
// a relative's heart: one nudge to the grown-ups' phones per 10 minutes, no names or heart text, opens the hearts page
ok((await pool.query("SELECT count(*)::int n FROM push_sent WHERE key LIKE 'heart.%'")).rows[0].n >= 1, 'heart: a relative\'s heart on the live server (bookshelf suite) reached the push scheduler');
{ const n0 = sent.length, t0 = Date.UTC(2026, 11, 6, 12, 0);
  ok(await R.heart({ trip: 'hk-macau-2026' }, t0) === 1 && sent[n0].p.url === '/#/t/hk-macau-2026/hearts' && sent[n0].p.tag === 'heart', 'heart: the parents\' phone hears a heart arrived (opens the hearts page)');
  ok(!/มีมี่ได้|คุณยาย|from|💗.*:/.test(sent[n0].p.body) && sent[n0].p.body.length <= 140, 'heart: no sender name or heart text on the lock screen');
  ok(await R.heart({ trip: 'hk-macau-2026' }, t0 + 5 * 60000) === 0 && await R.heart({ trip: 'hk-macau-2026' }, t0 + 11 * 60000) === 1, 'heart: a burst within 10 minutes is one nudge'); }
gone = true;
await R.tick(PUSH.zoned('2026-12-06', '09:00', 'Asia/Hong_Kong') - 30 * 60000);
ok((await pool.query("SELECT count(*)::int n FROM push_subs")).rows[0].n === 0, 'a phone the push service reports gone (410) is removed');
ok((await post('/api/b/push/sub', sub)).ok && (await post('/api/b/push/unsub', { endpoint: sub.endpoint })).ok && (await pool.query("SELECT count(*)::int n FROM push_subs")).rows[0].n === 0, 'turning reminders off removes the phone');
// ---- iPhone/iPad (Apple's push service): a subject Apple accepts, and a refusal that says why
{ const sj = PUSH.subject;
  ok(sj({}) === 'mailto:noreply@memory-bookshelf.invalid' && sj({ RAILWAY_PUBLIC_DOMAIN: 'mm.up.railway.app' }) === 'https://mm.up.railway.app'
    && sj({ PUSH_SUBJECT: 'mailto:mum@family.co', RAILWAY_PUBLIC_DOMAIN: 'mm.up.railway.app' }) === 'mailto:mum@family.co'
    && sj({ PUSH_SUBJECT: 'mailto:x@y.invalid', RAILWAY_PUBLIC_DOMAIN: 'mm.up.railway.app' }) === 'https://mm.up.railway.app', 'push subject: PUSH_SUBJECT if real, else the app\'s own https address (Apple refuses a placeholder)'); }
{ const express = require('express'), http = require('node:http');
  await A.init(pool);
  const apple = { ...sub, endpoint: 'https://web.push.apple.com/QAbcdEfgh1234567890' };
  ok((await post('/api/b/push/sub', apple)).ok, 'an iPad subscribes through Apple\'s push service');
  const R3 = PUSH.create({ pool, family: 'family', A, sender: async () => { throw Object.assign(new Error('refused'), { statusCode: 403, body: '{"reason":"BadJwtToken"}' }); } });
  const app = express(); app.use(A.attachUser); app.use(R3.router);
  const srv = http.createServer(app); await new Promise((r) => srv.listen(0, r));
  const r3 = await fetch(`http://localhost:${srv.address().port}/api/b/push/test`, { method: 'POST', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'application/json' }, body: JSON.stringify({ endpoint: apple.endpoint }) });
  const j3 = await r3.json();
  ok(r3.status === 502 && j3.status === 403 && j3.reason === 'BadJwtToken' && j3.apple === true && !JSON.stringify(j3).includes('QAbcd'), `test push refused by Apple: the phone hears the code and reason, never the endpoint (${JSON.stringify(j3)})`);
  srv.close(); await post('/api/b/push/unsub', { endpoint: apple.endpoint }); }
// an iPad in Safari calls itself a Mac: the app still recognises it and shows the Home-Screen step instead of a button that cannot work
{ const fs = require('node:fs'), { chromium } = require('playwright');
  const exe = process.env.CHROME || (fs.existsSync(chromium.executablePath()) ? undefined : '/opt/pw-browsers/chromium');
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 820, height: 1180 }, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15' });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 5 }); try { delete window.PushManager; } catch (_) {} window.PushManager = undefined; });
  const page = await ctx.newPage();
  await page.goto(BASE + '/'); await page.waitForSelector('#lf');
  ok(await page.evaluate(() => document.querySelector('.login form').getBoundingClientRect().width >= 520 && document.querySelector('.pinpad button').getBoundingClientRect().width >= 88), 'iPad: the sign-in card and its keys are tablet-sized, not a phone card in the middle');
  await page.fill('#lcode', CODE); await page.keyboard.press('Enter'); await page.waitForSelector('.shelf');
  const ask = page.locator('.remind.ask');
  await page.goto(BASE + '/#/kid/mimi/numbers'); await page.waitForSelector('.cnt');
  ok(await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.cnt span')).fontSize) >= 80), 'iPad: the things to count are big on a tablet');
  await page.goto(BASE + '/#/'); await page.waitForSelector('.shelf');
  ok(await page.evaluate(() => isIOS()) && await ask.count() === 1 && /iPad/.test(await ask.textContent()) && await ask.locator('[data-a="remind"]').count() === 0, 'iPad in Safari: recognised as Apple, told to add it to the Home Screen (no button that cannot work)');
  await browser.close(); }
await pool.end();

if (failures) { console.log(`${failures} FAILED`); process.exit(1); }
