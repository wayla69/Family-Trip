// A day with no signal, for real: the book is stored on the phone, then the SERVER IS STOPPED (Playwright's offline switch
// does not reach the service worker, so only a dead server proves the shell, art and state come from the phone). The whole
// day is used offline — menu, today, plan, eat, stays, SOS, prep, learn, book, passport, kid mode, ask-the-guide — and
// recorded offline (quote, photo, a real voice clip from Chromium's fake microphone, a spend, a mood). The server comes back
// on the same port and the queue must reach it once, complete. Then "photos on Wi-Fi only": words go at once, photos wait
// until "send now".
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const { Client } = require('pg');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('a day without signal (server stopped)');
const T = 'hk-macau-2026', CODE = '271205';

const admin = new Client({ connectionString: process.env.TEST_DATABASE_URL }); await admin.connect();
const dbName = 'mb_offline_' + Date.now().toString(36); await admin.query(`CREATE DATABASE ${dbName}`);
const u = new URL(process.env.TEST_DATABASE_URL); u.pathname = '/' + dbName;
const port = await new Promise((res) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
const data = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-offline-'));
const env = { ...process.env, PORT: String(port), DATA_DIR: data, DATABASE_URL: u.toString(), FAMILY_CODE: CODE, SESSION_SECRET: 'offline-secret',
  ANTHROPIC_API_KEY: 'sk-test-offline', ANTHROPIC_BASE_URL: 'http://127.0.0.1:9' };   // Claude "on" (ask box shown) but unreachable
delete env.BUCKET;
const BASE = `http://localhost:${port}`;
let srv = null;
async function up() {
  srv = spawn(process.execPath, ['server/index.js'], { cwd: root, env, stdio: ['ignore', 'ignore', 'inherit'] });
  for (let i = 0; i < 80; i++) { try { if ((await fetch(BASE + '/healthz')).ok) return; } catch (_) {} await new Promise((r) => setTimeout(r, 250)); }
  throw new Error('server did not start');
}
async function down() { if (!srv) return; const s = srv; srv = null; s.kill(); await new Promise((r) => (s.exitCode !== null ? r() : s.on('exit', r))); }
const jpg = (c) => sharp({ create: { width: 1600, height: 1200, channels: 3, background: c } }).jpeg().toBuffer();

const exe = process.env.CHROME || (fs.existsSync(chromium.executablePath()) ? undefined : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] });
try {
  await up();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ['microphone'] });
  await ctx.addInitScript(() => localStorage.setItem('mbs_logall', '1'));   // every record-page box on the page
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(BASE + '/'); await page.fill('#lcode', CODE); await page.click('#lf button[type=submit]'); await page.waitForSelector('.shelf');
  await page.goto(`${BASE}/#/t/${T}/offline`); await page.waitForSelector('#offl');
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 15000 });
  await page.click('#offl [data-a="offline"]');
  await page.waitForFunction((tid) => !!ls('offline_' + tid), T, { timeout: 30000 });
  await page.evaluate((tid) => withSeeds ? withSeeds(trip(tid)) : null, T).catch(() => {});   // guide text on the phone too

  // ---- the server goes away
  await down();
  ok((await fetch(BASE + '/healthz').then(() => 'up', () => 'down')) === 'down', 'the server is really stopped');
  await page.goto(`${BASE}/#/t/${T}`); await page.reload(); await page.waitForSelector('.hubgrid', { timeout: 20000 });
  ok(await page.locator('.notice').count() === 1, 'no server: the menu opens from the phone, with the "last synced" notice');
  const pages = [['today/1', '.tl.plan.brief'], ['today/1', '.bag'], ['plan', 'main h1'], ['plan/full', '.itin'], ['eat', 'main h1'], ['eat/all', '.eatpage .eatc'], ['stays', 'main h1'],
    ['sos', 'main h1'], ['prep', 'main h1'], ['learn', 'main h1'], ['book', '.cover'], ['log/1', '#qtext']];
  for (const [r, sel] of pages) {
    await page.goto(`${BASE}/#/t/${T}/${r}`);
    const there = await page.waitForSelector(sel, { timeout: 8000 }).then(() => true, () => false);
    const words = there ? (await page.textContent('main')).trim().length : 0;
    ok(there && words > 80, `no server: #/t/${T}/${r} opens with its content (${words} chars)`);
  }
  await page.goto(`${BASE}/#/passport/mimi/${T}`);
  ok(await page.waitForSelector('.pp .advc', { timeout: 8000 }).then(() => true, () => false), 'no server: the adventure passport opens');
  const art = await page.evaluate(() => Promise.all([...document.querySelectorAll('img')].slice(0, 6).map((i) => (i.complete ? i.naturalWidth : new Promise((r) => { i.onload = () => r(i.naturalWidth); i.onerror = () => r(0); })))));
  ok(art.length > 0 && art.every((w) => w > 0), `no server: the passport's art loads from the phone (${art.length} pictures)`);
  await page.click('.kidgo'); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.kidtiles button').count() >= 4, 'no server: kid mode opens with its tiles');
  await page.evaluate(() => { ls('kidmode', null); });
  await page.goto(`${BASE}/#/t/${T}/today/1`); await page.waitForSelector('#askq');
  await page.fill('#askq', 'แท็กซี่'); await page.click('#askgo');
  ok(await page.waitForSelector('#askans .sres a, .ask .sres a', { timeout: 15000 }).then(() => true, () => false), 'no server: "ask the guide" answers from the manual on the phone');

  // ---- record the day with no server
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('#qtext');
  await page.fill('#qtext', 'ไม่มีเน็ตก็จดได้'); await page.click('button[data-a="savequote"]');
  await page.waitForSelector('.items .tag'); await page.waitForTimeout(50);
  await page.setInputFiles('#fpick', [{ name: 'a.jpg', mimeType: 'image/jpeg', buffer: await jpg('#C8402B') }]);
  await page.waitForFunction(() => queue.some((o) => o.blob && /^image/.test(o.blob.type)), null, { timeout: 15000 });
  await page.click('[data-a="rec"]'); await page.waitForTimeout(1500); await page.click('[data-a="rec"]');
  const clip = await page.waitForFunction(() => queue.some((o) => o.blob && /^audio/.test(o.blob.type)), null, { timeout: 15000 }).then(() => true, () => false);
  ok(clip, 'no server: a voice clip records from the microphone and waits in the queue');
  await page.click('[data-a="spendcat"][data-v="food"]'); await page.fill('#spendamt', '86'); await page.fill('#spendnote', 'ติ่มซำ'); await page.click('[data-a="addspend"]');
  await page.waitForFunction(() => queue.some((o) => /\/spend\//.test(o.url)), null, { timeout: 5000 });
  const queued = await page.evaluate(() => idb.all().then((a) => a.length));
  ok(queued >= 4, `no server: quote, photo, clip and spend are kept on the phone (${queued} waiting)`);
  await page.reload(); await page.waitForSelector('#qtext', { timeout: 20000 });
  ok(await page.evaluate(() => queue.length) === queued && (await page.textContent('main')).includes('ไม่มีเน็ตก็จดได้'), 'no server: the waiting records survive closing and opening the app');

  // ---- back online: everything reaches the server once
  await up();
  await page.evaluate(() => { offline = false; return flush(); });
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 });
  await page.evaluate(() => flush());
  const st = await page.evaluate(async () => (await fetch('/api/b/state')).json());
  const ph = st.media.filter((m) => m.trip === T && m.day === 1 && !String(m.mime || '').startsWith('audio/'));
  const au = st.media.filter((m) => m.trip === T && m.day === 1 && String(m.mime || '').startsWith('audio/'));
  ok(st.entries.filter((e) => e.text === 'ไม่มีเน็ตก็จดได้').length === 1 && ph.length === 1 && au.length === 1 && st.spend.filter((s) => s.amount === 86 && s.cur === 'HKD').length === 1,
    `back online: quote, photo, voice clip and spend all arrived once (${ph.length} photo, ${au.length} clip)`);
  const ck = (await ctx.cookies()).map((c) => `${c.name}=${c.value}`).join('; ');
  ok((await fetch(`${BASE}/media/${ph[0].id}/t`, { headers: { cookie: ck } })).status === 200 && (await fetch(`${BASE}/media/${au[0].id}`, { headers: { cookie: ck } })).status === 200, 'back online: the photo has its thumbnail and the clip plays from the server');
  await page.waitForSelector('.notice', { state: 'detached', timeout: 10000 }).catch(() => {});
  ok(await page.locator('.notice').count() === 0, 'back online: the "offline" notice is gone');

  // ---- photos on Wi-Fi only (headless Chromium does not say its network type, like an iPhone: photos wait for "send now")
  await page.goto(`${BASE}/#/t/${T}/log/2`); await page.waitForSelector('#qtext');
  await page.check('.upw input[data-a="wifionly"]'); await page.waitForSelector('.upw input[data-a="wifionly"]:checked');
  ok(/tap send/.test(await page.textContent('.upw')), 'Wi-Fi only: ticking it explains at once (with the switch still focused) that photos wait for "send now" here');
  await page.setInputFiles('#fpick', [{ name: 'b.jpg', mimeType: 'image/jpeg', buffer: await jpg('#14C2A3') }]);
  await page.waitForFunction(() => queue.some((o) => o.blob), null, { timeout: 15000 });
  const pid = await page.evaluate(() => queue.find((o) => o.blob).url.match(/media\/([^?]+)/)[1]);
  await page.evaluate((id) => enqueue({ method: 'PATCH', url: '/api/b/media/' + id, body: { highlight: true }, local: { coll: 'media', id, row: { highlight: true } } }), pid);
  await page.fill('#qtext', 'คำพูดไปก่อน รูปรอ Wi-Fi'); await page.click('button[data-a="savequote"]');
  await page.waitForFunction(() => queue.length === 2, null, { timeout: 15000 });
  await page.evaluate(() => flush());
  const st2 = await page.evaluate(async () => (await fetch('/api/b/state')).json());
  ok(st2.entries.some((e) => e.text === 'คำพูดไปก่อน รูปรอ Wi-Fi') && !st2.media.some((m) => m.id === pid), 'Wi-Fi only: the words went at once, the photo (and its ⭐) wait on the phone');
  await page.waitForSelector('.upw [data-a="upnow"]');
  ok(/Wi-Fi/.test(await page.textContent('#prog')), `Wi-Fi only: the top bar says what is waiting for Wi-Fi ("${await page.textContent('#prog')}")`);
  await page.click('.upw [data-a="upnow"]');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 20000 });
  const st3 = await page.evaluate(async () => (await fetch('/api/b/state')).json());
  ok(st3.media.some((m) => m.id === pid && m.highlight), '"send now": the photo goes, then its ⭐ (in order)');
  await page.goto(`${BASE}/#/t/${T}/offline`); await page.waitForSelector('.upw');
  ok(await page.isChecked('.upw input[data-a="wifionly"]'), 'the Wi-Fi switch is also on the offline page, and remembered');
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll at 390 px');
  ok(errs.length === 0, 'no page errors ' + errs.join(' | '));
} finally {
  await browser.close(); await down();
  fs.rmSync(data, { recursive: true, force: true });
  await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`); await admin.end();
}
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
