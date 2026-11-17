#!/usr/bin/env node
/* How the app holds up with years of trips (owner, Nov 2026: "ทดสอบกับข้อมูลเยอะ"): fills a database with a family of many books —
   BOOKS books of DAYS days, PHOTOS photo rows, ENTRIES words, check-ins and hearts (rows only, no files; made-up text) — then
   measures what the phone waits for: the state's size and time (full, and the 304 when nothing changed), and in Chromium on a slow
   phone (CPU ×4) the shelf, a book's memory page, its record page, Today and kid mode.
   DATABASE_URL=… node scripts/scale-bench.mjs seed           fill (idempotent: rows named bench-*)
   BASE=http://localhost:3000 CODE=… node scripts/scale-bench.mjs measure    → one line per measure, and a JSON summary */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const BOOKS = +process.env.BOOKS || 12, DAYS = +process.env.DAYS || 14, PHOTOS = +process.env.PHOTOS || 6000, ENTRIES = +process.env.ENTRIES || 4000;

async function seed() {
  const { Pool } = require('pg'), pool = new Pool({ connectionString: process.env.DATABASE_URL }), q = (s, a) => pool.query(s, a);
  const fam = process.env.FAMILY_ID || 'family';
  await q('INSERT INTO families (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING', [fam, 'Family']);
  const day0 = Date.UTC(2020, 0, 6);
  for (let b = 0; b < BOOKS; b++) {
    const id = `bench-${String(b).padStart(2, '0')}`, from = new Date(day0 + b * 120 * 864e5), to = new Date(from.getTime() + (DAYS - 1) * 864e5);
    await q(`INSERT INTO trips (id, family_id, slug, title, date_from, date_to, timezone, theme, cover, source) VALUES ($1,$2,$1,$3,$4,$5,'Asia/Bangkok',$6,'{}','manual') ON CONFLICT (id) DO NOTHING`,
      [id, fam, { th: `ทริปทดสอบ ${b + 1}`, en: `Bench trip ${b + 1}` }, from, to, { accent: '#2F7FE0', children: [] }]);
    for (let d = 0; d < DAYS; d++) await q(`INSERT INTO trip_days (trip_id, day_index, date, title) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`, [id, d, new Date(from.getTime() + d * 864e5), { th: `วันที่ ${d + 1}`, en: `Day ${d + 1}` }]);
  }
  const per = Math.ceil(PHOTOS / BOOKS);
  for (let b = 0; b < BOOKS; b++) {
    const id = `bench-${String(b).padStart(2, '0')}`, rows = [];
    for (let k = 0; k < per; k++) rows.push([`bench-ph-${b}-${k}`, fam, id, k % DAYS, `p/${id}/bench-ph-${b}-${k}.jpg`, 2_400_000, 2560, 1920, k % 7 ? '' : 'ที่ทะเล วันนี้สนุกมาก', k % 23 === 0, k, new Date(Date.UTC(2020, 0, 6) + b * 120 * 864e5 + (k % DAYS) * 864e5 + k * 1000)]);
    for (let i = 0; i < rows.length; i += 500) {
      const part = rows.slice(i, i + 500), vals = part.map((_, j) => `(${Array.from({ length: 12 }, (__, c) => `$${j * 12 + c + 1}`).join(',')})`).join(',');
      await q(`INSERT INTO media (id, family_id, trip_id, day_index, storage_key, bytes, width, height, caption, highlight, pos, taken_at) VALUES ${vals} ON CONFLICT (id) DO NOTHING`, part.flat());
    }
    const ents = [], pe = Math.ceil(ENTRIES / BOOKS);
    for (let k = 0; k < pe; k++) ents.push([`bench-q-${b}-${k}`, fam, id, k % DAYS, k % 5 === 0 ? 'note' : 'quote', 'mimi', `มีมี่บอกว่า "${'ปลาตัวใหญ่มาก '.repeat(1 + (k % 4))}" ตอนเย็น`, k % 31 === 0]);
    for (let i = 0; i < ents.length; i += 500) {
      const part = ents.slice(i, i + 500), vals = part.map((_, j) => `(${Array.from({ length: 8 }, (__, c) => `$${j * 8 + c + 1}`).join(',')})`).join(',');
      await q(`INSERT INTO entries (id, family_id, trip_id, day_index, kind, child, text, highlight) VALUES ${vals} ON CONFLICT (id) DO NOTHING`, part.flat());
    }
  }
  const n = (await q("SELECT (SELECT count(*) FROM media WHERE id LIKE 'bench-%')::int m, (SELECT count(*) FROM entries WHERE id LIKE 'bench-%')::int e")).rows[0];
  console.log(`seeded ${BOOKS} books, ${n.m} photo rows, ${n.e} entries`);
  await pool.end();
}

async function measure() {
  const BASE = process.env.BASE, CODE = process.env.CODE, out = {};
  const lg = await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'bench' }) });
  const ck = lg.headers.get('set-cookie').split(';')[0];
  for (const lite of ['1', '']) {
    const t0 = performance.now(), r = await fetch(`${BASE}/api/b/state${lite ? '?lite=1' : ''}`, { headers: { cookie: ck, 'accept-encoding': 'gzip' } }), raw = await r.arrayBuffer();
    out[`state${lite ? '_lite' : ''}_ms`] = Math.round(performance.now() - t0); out[`state${lite ? '_lite' : ''}_kb`] = Math.round(raw.byteLength / 1024);
    if (lite) { const t1 = performance.now(), r2 = await fetch(`${BASE}/api/b/state?lite=1`, { headers: { cookie: ck, 'if-none-match': r.headers.get('etag') } }); out.state_304_ms = Math.round(performance.now() - t1); out.state_304 = r2.status; }
  }
  const { chromium } = require('playwright');
  const br = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const ctx = await br.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const [n, v] = ck.split('='); await ctx.addCookies([{ name: n, value: v, url: BASE }]);
  const page = await ctx.newPage(), cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const time = async (label, hash, sel) => {
    const t0 = Date.now(); await page.goto(`${BASE}/${hash}`); await page.waitForSelector(sel, { timeout: 120000 });
    const longest = await page.evaluate(() => (window.__lt || 0));
    out[label] = Date.now() - t0; return longest;
  };
  await time('shelf_first_ms', '#/', '.shelf');
  await time('shelf_again_ms', '#/', '.shelf');
  const big = await page.evaluate(() => S.trips.filter((t) => /^bench-/.test(t.id)).map((t) => t.id).pop());
  await time('book_ms', `#/t/${big}/book`, '.mbook');
  await time('record_ms', `#/t/${big}/log/3`, '#lgphotos');
  await time('menu_ms', `#/t/${big}`, '.hubgrid');
  // a render of the book page timed in the page itself (what a tap that redraws costs)
  out.render_book_ms = await page.evaluate(() => { location.hash = location.hash.replace(/\/?$/, '') + '/book'; const t0 = performance.now(); render(); return Math.round(performance.now() - t0); });
  out.render_shelf_ms = await page.evaluate(() => { location.hash = '#/'; const t0 = performance.now(); render(); return Math.round(performance.now() - t0); });
  out.idb_state_kb = await page.evaluate(async () => Math.round(JSON.stringify(await idb.get('state')).length / 1024));
  await br.close();
  for (const [k, x] of Object.entries(out)) console.log(`${k.padEnd(18)} ${x}`);
  console.log(JSON.stringify(out));
}

const cmd = process.argv[2];
if (cmd === 'seed') await seed(); else if (cmd === 'measure') await measure(); else { console.error('usage: scale-bench.mjs seed|measure'); process.exit(2); }
