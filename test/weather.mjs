// Live forecast (Today page) against a local mock of Open-Meteo — no network, nothing about the family leaves the server.
import http from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const { CODE } = process.env;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('live forecast');
const freePort = () => new Promise((res) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });

// ---- mock Open-Meteo: answers the requested horizon from today, remembers what was asked
const calls = [];
const mock = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x'); calls.push(Object.fromEntries(u.searchParams));
  const n = +u.searchParams.get('forecast_days') || 16, t0 = Date.now();
  const time = [], tmax = [], tmin = [], pop = [], code = [];
  for (let i = 0; i < n; i++) { const d = new Date(t0 + i * 864e5); time.push(d.toISOString().slice(0, 10)); tmax.push(22 + (i % 3)); tmin.push(15 + (i % 2)); pop.push(10 * (i % 5)); code.push([0, 2, 3, 61, 80][i % 5]); }
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ latitude: +u.searchParams.get('latitude'), longitude: +u.searchParams.get('longitude'), daily: { time, temperature_2m_max: tmax, temperature_2m_min: tmin, precipitation_probability_max: pop, weather_code: code } }));
});
const mockPort = await freePort(); await new Promise((r) => mock.listen(mockPort, r));

// ---- unit: too far ahead → no request at all; a silent service → nulls, not an error
const WX = createRequire(import.meta.url)('../server/weather.js');
process.env.WX_BASE_URL = `http://localhost:${mockPort}`;
const far = await WX.forecast([{ date: '2031-01-01', ll: [22.35, 114.06] }, { date: '2031-01-02', ll: null }], 'Asia/Hong_Kong');
ok(far.every((x) => x === null) && calls.length === 0, 'a trip beyond the 16-day horizon asks nothing and gets nulls');
process.env.WX_BASE_URL = 'http://127.0.0.1:9'; WX._cache.clear();
const dead = await WX.forecast([{ date: new Date().toISOString().slice(0, 10), ll: [22.35, 114.06] }], 'Asia/Hong_Kong');
ok(dead.length === 1 && dead[0] === null, 'a service that does not answer → null, no throw');
process.env.WX_BASE_URL = `http://localhost:${mockPort}`; WX._cache.clear();

// ---- app server pointing at the mock, with a horizon wide enough to cover the shipped books, own database
const { Client } = createRequire(import.meta.url)('pg');
const admin = new Client({ connectionString: process.env.TEST_DATABASE_URL }); await admin.connect();
const dbName = 'mb_wx_' + Date.now().toString(36); await admin.query(`CREATE DATABASE ${dbName}`);
const u = new URL(process.env.TEST_DATABASE_URL); u.pathname = '/' + dbName;
const port = await freePort(), data = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-wx-'));
const srv = spawn(process.execPath, ['server/index.js'], { cwd: process.cwd(), stdio: ['ignore', 'ignore', 'inherit'],
  env: { ...process.env, PORT: String(port), DATA_DIR: data, DATABASE_URL: u.toString(), WX_BASE_URL: `http://localhost:${mockPort}`, WX_HORIZON_DAYS: '400' } });
const BASE = `http://localhost:${port}`;
try {
  for (let i = 0; i < 80; i++) { try { if ((await fetch(BASE + '/healthz')).ok) break; } catch (_) {} await new Promise((r) => setTimeout(r, 250)); }
  ok((await fetch(BASE + '/api/b/wx/hk-macau-2026')).status === 401, 'forecast needs a signed-in user');
  const ck = (await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'แม่' }) })).headers.get('set-cookie').split(';')[0];
  const H = { cookie: ck };
  calls.length = 0;
  const hk = await (await fetch(BASE + '/api/b/wx/hk-macau-2026', { headers: H })).json();
  ok(hk.trip === 'hk-macau-2026' && hk.days.length === 6 && hk.days.every((d) => d && typeof d.tmin === 'number' && typeof d.tmax === 'number' && typeof d.code === 'number'), 'HK: a forecast for each of the 6 days (the flight-home day sleeps where the night before did)');
  const pts = [...new Set(calls.map((c) => `${c.latitude},${c.longitude}`))];
  ok(pts.length === 2 && calls.every((c) => c.timezone === 'Asia/Hong_Kong' && !('family' in c)), `HK: only two town-level points asked (Ma Wan, Cotai) in the book's timezone — ${pts.join(' | ')}`);
  const before = calls.length; await fetch(BASE + '/api/b/wx/hk-macau-2026', { headers: H });
  ok(calls.length === before, 'second request within three hours is served from memory (no new call)');
  const au = await (await fetch(BASE + '/api/b/wx/big-hop-2027', { headers: H })).json();
  ok(au.days.length === 16 && au.days.filter(Boolean).length === 16 && new Set(calls.slice(before).map((c) => `${c.latitude},${c.longitude}`)).size === 8, 'AU: 16 days from 8 bases');
  ok((await fetch(BASE + '/api/b/wx/nope', { headers: H })).status === 404, 'unknown book → 404');

  // browser: the Today page shows the live line under the manual's climate note
  const exe = process.env.CHROME || (fs.existsSync(chromium.executablePath()) ? undefined : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(BASE + '/'); await page.fill('#lcode', CODE); await page.click('#lf button[type=submit]'); await page.waitForSelector('.shelf');
  await page.goto(`${BASE}/#/t/hk-macau-2026/today/1`); await page.waitForSelector('.wxlive', { timeout: 10000 });
  const line = await page.locator('.wxlive').first().textContent();
  ok(/Forecast \d+–\d+°C/.test(line) && /rain \d+%/.test(line), `Today page: live forecast line "${line.trim()}"`);
  ok(await page.evaluate(() => { const c = JSON.parse(localStorage.getItem('mbs_wx:hk-macau-2026') || 'null'); return !!(c && c.days && c.days.length === 6); }), 'forecast kept on the phone for the next hour (and for offline)');
  ok(errs.length === 0, 'no page errors ' + errs.join(' | '));
  await browser.close();
} finally {
  srv.kill(); mock.close();
  await new Promise((r) => setTimeout(r, 300));
  await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`).catch(() => {});
  await admin.end();
  fs.rmSync(data, { recursive: true, force: true });
}
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
