// Bedtime stories (ACCEPTANCE D) against a local mock of the Anthropic streaming API — real SDK, no network, no cost.
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
console.log('stories');
const freePort = () => new Promise((res) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });

// ---- mock Messages API (SSE)
const calls = [];
let upstreamClosedEarly = false;
const mock = http.createServer((req, res) => {
  let body = ''; req.on('data', (d) => { body += d; });
  req.on('end', async () => {
    const b = JSON.parse(body); calls.push({ url: req.url, headers: req.headers, body: b });
    const facts = b.messages[0].content;
    res.writeHead(200, { 'content-type': 'text/event-stream' });
    const ev = (type, data) => res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);
    ev('message_start', { message: { id: 'msg_1', type: 'message', role: 'assistant', model: b.model, content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 0 } } });
    ev('content_block_start', { index: 0, content_block: { type: 'text', text: '' } });
    const refuse = facts.includes('REFUSE'), slow = facts.includes('SLOW');
    const parts = refuse ? ['ขอโทษ'] : ['# นิทาน\n', '**กาลครั้งหนึ่ง** มีมี่บอกว่า ', '“ปลาอยู่ในน้ำเหมือนหนูเลย” ', 'ฝันดีนะ'];
    // (IncomingMessage 'close' fires once the body is read, so only the response side tells us the client went away)
    let closed = false; res.on('close', () => { if (!res.writableEnded) { closed = true; upstreamClosedEarly = true; } });
    for (const p of parts) {
      if (closed) return;
      ev('content_block_delta', { index: 0, delta: { type: 'text_delta', text: p } });
      await new Promise((r) => setTimeout(r, slow ? 700 : 20));
    }
    ev('content_block_stop', { index: 0 });
    ev('message_delta', { delta: { stop_reason: refuse ? 'refusal' : 'end_turn', stop_sequence: null }, usage: { output_tokens: 20 } });
    ev('message_stop', {});
    res.end();
  });
});
const mockPort = await freePort(); await new Promise((r) => mock.listen(mockPort, r));

// ---- app server with ANTHROPIC_* pointing at the mock, own database
const { Client } = createRequire(import.meta.url)('pg');
const admin = new Client({ connectionString: process.env.TEST_DATABASE_URL }); await admin.connect();
const dbName = 'mb_story_' + Date.now().toString(36); await admin.query(`CREATE DATABASE ${dbName}`);
const u = new URL(process.env.TEST_DATABASE_URL); u.pathname = '/' + dbName;
const port = await freePort(), data = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-story-'));
const srv = spawn(process.execPath, ['server/index.js'], { cwd: process.cwd(), stdio: ['ignore', 'ignore', 'inherit'],
  env: { ...process.env, PORT: String(port), DATA_DIR: data, DATABASE_URL: u.toString(), ANTHROPIC_API_KEY: 'test-key', ANTHROPIC_BASE_URL: `http://localhost:${mockPort}` } });
const BASE = `http://localhost:${port}`;
try {
  for (let i = 0; i < 80; i++) { try { if ((await fetch(BASE + '/healthz')).ok) break; } catch (_) {} await new Promise((r) => setTimeout(r, 250)); }
  const ck = (await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'แม่' }) })).headers.get('set-cookie').split(';')[0];
  const H = { 'x-mb': '1', cookie: ck, 'content-type': 'application/json' };
  const T = 'hk-macau-2026';
  const put = (u2, b) => fetch(BASE + u2, { method: 'PUT', headers: H, body: JSON.stringify(b) });
  const story = (b, signal) => fetch(BASE + '/api/b/story', { method: 'POST', headers: H, body: JSON.stringify(b), signal });
  const state = async () => (await fetch(BASE + '/api/b/state', { headers: { cookie: ck } })).json();
  const events = (txt) => txt.split('\n\n').filter(Boolean).map((c) => ({ ev: (/^event: (.*)$/m.exec(c) || [])[1] || null, data: JSON.parse((/^data: (.*)$/m.exec(c) || [])[1] || '{}') }));

  ok((await state()).features.story === true, 'story feature on when ANTHROPIC_API_KEY is set');
  ok((await story({ trip: T, day: 0, lang: 'th' })).status === 422 && calls.length === 0, 'day with nothing written → 422, model not called');

  await put('/api/b/entries/q-story-0001', { trip: T, day: 1, kind: 'quote', child: 'mika', text: 'ปลาอยู่ในน้ำเหมือนหนูเลย' });
  await put('/api/b/places', { trip: T, key: 'Hong Kong Disneyland', day: 1, name: { en: 'Hong Kong Disneyland', th: 'ฮ่องกงดิสนีย์แลนด์' } });
  await put(`/api/b/entries/${T}.fav.d1`, { trip: T, day: 1, kind: 'fav', text: 'ไอติมมิกกี้' });
  const r = await story({ trip: T, day: 1, lang: 'th' });
  ok(r.headers.get('content-type').startsWith('text/event-stream'), 'streams as server-sent events');
  const evs = events(await r.text());
  ok(evs.filter((e) => !e.ev).length === 4 && evs.at(-1).ev === 'done', `text arrives in chunks, then done (${evs.length} events)`);
  const saved = (await state()).entries.find((e) => e.id === `${T}.story.d1`);
  ok(saved && !saved.text.includes('#') && !saved.text.includes('**') && saved.text.includes('ฝันดี'), 'markdown removed before saving; story kept with the day');
  const c = calls[0];
  ok(c.body.model === 'claude-sonnet-5-5' && c.body.fallbacks === 'default' && String(c.headers['anthropic-beta']).includes('server-side-fallback-2026-07-01'), 'model + server-side refusal fallback opted in');
  ok(typeof c.body.messages[0].content === 'string' && !JSON.stringify(c.body).includes('"image"') && !JSON.stringify(c.body).includes('base64'), 'text only — no photos sent');
  ok(c.body.messages[0].content.includes('ปลาอยู่ในน้ำเหมือนหนูเลย') && c.body.messages[0].content.includes('ฮ่องกงดิสนีย์แลนด์') && c.body.messages[0].content.includes('ไอติมมิกกี้'), 'facts: quote, place, favourite');
  ok(c.body.system.includes('ห้ามแต่ง') && c.body.system.includes('ฝันดี'), 'prompt: no invented events, ends with good night (Handoff §6)');

  await put('/api/b/entries/q-story-0002', { trip: T, day: 2, kind: 'quote', child: 'mimi', text: 'REFUSE' });
  const rr = events(await (await story({ trip: T, day: 2, lang: 'th' })).text());
  ok(rr.at(-1).ev === 'error' && rr.at(-1).data.error === 'refusal' && !(await state()).entries.some((e) => e.id === `${T}.story.d2`), 'refusal → error event, nothing saved');

  await put('/api/b/entries/q-story-0003', { trip: T, day: 3, kind: 'quote', child: 'mimi', text: 'SLOW' });
  const ctl = new AbortController();
  const rs = await story({ trip: T, day: 3, lang: 'th' }, ctl.signal);
  const rd = rs.body.getReader(); await rd.read(); ctl.abort();
  await new Promise((r2) => setTimeout(r2, 1500));
  ok(upstreamClosedEarly && !(await state()).entries.some((e) => e.id === `${T}.story.d3`), 'Stop: request to Claude aborted, nothing saved');

  const vck = (await fetch(BASE + '/v/grandma', { redirect: 'manual' })).headers.get('set-cookie');
  ok(!vck || (await fetch(BASE + '/api/b/story', { method: 'POST', headers: { ...H, cookie: vck.split(';')[0] }, body: '{}' })).status === 403, 'viewer cannot ask for stories');

  // browser: the button streams the story into the page and saves it
  const exe = process.env.CHROME || (fs.existsSync(chromium.executablePath()) ? undefined : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(BASE + '/'); await page.fill('#lcode', CODE); await page.click('#lf button[type=submit]'); await page.waitForSelector('.shelf');
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('#storygo');
  await page.click('#storygo');
  await page.waitForFunction(() => document.querySelector('#storytext') && document.querySelector('#storytext').textContent.includes('ฝันดี'));
  await page.waitForFunction(() => !document.querySelector('#storystop') || document.querySelector('#storystop').hidden);
  ok(true, 'browser: story streamed into the record page');
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
  ok(await page.locator('#d1 .call.pick', { hasText: 'ฝันดี' }).count() === 1, 'book: bedtime story on the day page');
  ok(errs.length === 0, 'no page errors ' + errs.join(' | '));
  await browser.close();
} finally {
  srv.kill(); await new Promise((r) => srv.on('exit', r)); mock.close();
  fs.rmSync(data, { recursive: true, force: true });
  await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`); await admin.end();
}
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
