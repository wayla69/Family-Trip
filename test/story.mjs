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
    const trans = String(b.system).startsWith('Translate');   // translate: answer JSON [{id, tr}] for the items it was given
    const parts = trans ? [JSON.stringify(JSON.parse(facts).map((x) => ({ id: x.id, tr: `${x.to}:${x.text}` })))]
      : refuse ? ['ขอโทษ'] : ['# นิทาน\n', '**กาลครั้งหนึ่ง** มีมี่บอกว่า ', '“ปลาอยู่ในน้ำเหมือนหนูเลย” ', 'ฝันดีนะ'];
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
  env: { ...process.env, PORT: String(port), DATA_DIR: data, DATABASE_URL: u.toString(), ANTHROPIC_API_KEY: 'test-key', ANTHROPIC_BASE_URL: `http://localhost:${mockPort}`, STORY_DAILY: '15' } });
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
  ok(c.body.system.includes('ภาษาเด็ก') && c.body.system.includes('ตื่นเต้น') && c.body.system.includes('สงบ'), 'prompt: little-kid words, exciting, calm at the end');
  ok(c.body.system.includes('ห้ามใช้สำนวนแบบ AI') && c.body.system.includes('วันแสนวิเศษ'), 'prompt: sounds like the parents, no AI clichés');

  await put('/api/b/entries/q-story-0002', { trip: T, day: 2, kind: 'quote', child: 'mimi', text: 'REFUSE' });
  const rr = events(await (await story({ trip: T, day: 2, lang: 'th' })).text());
  ok(rr.at(-1).ev === 'error' && rr.at(-1).data.error === 'refusal' && !(await state()).entries.some((e) => e.id === `${T}.story.d2`), 'refusal → error event, nothing saved');

  await put('/api/b/entries/q-story-0003', { trip: T, day: 3, kind: 'quote', child: 'mimi', text: 'SLOW' });
  const ctl = new AbortController();
  const rs = await story({ trip: T, day: 3, lang: 'th' }, ctl.signal);
  const rd = rs.body.getReader(); await rd.read(); ctl.abort();
  await new Promise((r2) => setTimeout(r2, 1500));
  ok(upstreamClosedEarly && !(await state()).entries.some((e) => e.id === `${T}.story.d3`), 'Stop: request to Claude aborted, nothing saved');

  // the day in a few lines (mode 'sum'): same facts, its own prompt, saved as the day's 'sum' entry; edits upsert the same id
  const before = calls.length;
  const rsum = events(await (await story({ trip: T, day: 1, lang: 'en', mode: 'sum' })).text());
  const cs = calls.at(-1);
  ok(calls.length === before + 1 && rsum.at(-1).ev === 'done' && rsum.at(-1).data.id === `${T}.sum.d1`, 'summary: streamed, then done with the day\'s sum id');
  ok(cs.body.system.includes('2–3 sentences') && cs.body.system.includes('only the facts') && cs.body.system.includes('AI-sounding') && cs.body.max_tokens === 1000 && cs.body.messages[0].content.includes('Hong Kong Disneyland'), 'summary: own prompt, same facts (en)');
  const sumRow = (await state()).entries.find((e) => e.id === `${T}.sum.d1`);
  ok(sumRow && sumRow.kind === 'sum' && sumRow.day === 1 && !sumRow.text.includes('**'), 'summary saved as kind sum on the day');
  ok((await put(`/api/b/entries/${T}.sum.d1`, { trip: T, day: 1, kind: 'sum', text: 'We went to Disneyland.' })).ok
    && (await state()).entries.find((e) => e.id === `${T}.sum.d1`).text === 'We went to Disneyland.', 'summary: a hand edit upserts the same row');
  ok((await story({ trip: T, day: null, lang: 'th', mode: 'sum' })).status === 400 && calls.length === before + 1, 'summary needs a day (whole trip → 400, model not called)');

  // a note for the relatives (mode 'msg'): own prompt, streamed back, never saved
  const nEntries = (await state()).entries.length, bm = calls.length;
  const rmsg = events(await (await story({ trip: T, day: 1, lang: 'th', mode: 'msg' })).text());
  ok(calls.length === bm + 1 && rmsg.at(-1).ev === 'done' && rmsg.at(-1).data.text.includes('ฝันดี') && !rmsg.at(-1).data.id, 'note for the family: streamed, done carries the text');
  ok(calls.at(-1).body.system.includes('คุณตาคุณยาย') && calls.at(-1).body.system.includes('ไม่ใส่ที่อยู่') && calls.at(-1).body.messages[0].content.includes('ปลาอยู่ในน้ำเหมือนหนูเลย'), 'note for the family: own prompt (no addresses), same facts');
  ok((await state()).entries.length === nEntries, 'note for the family: nothing saved on the server');
  ok((await story({ trip: T, day: null, lang: 'th', mode: 'msg' })).status === 400, 'note for the family needs a day');

  // ask the guide: the question travels with excerpts of the book's own manual — never the family's records; nothing saved
  const nE2 = (await state()).entries.length, ba = calls.length;
  const ask = (b) => fetch(BASE + '/api/b/ask', { method: 'POST', headers: H, body: JSON.stringify(b) });
  const ra = events(await (await ask({ trip: T, day: 0, lang: 'th', q: 'ถ้าเด็กหลงทำยังไง' })).text());
  const ca = calls.at(-1), content = ca.body.messages[0].content;
  ok(calls.length === ba + 1 && ra.at(-1).ev === 'done' && ra.at(-1).data.text, 'ask the guide: streamed answer, then done');
  ok(content.includes('คำถาม: ถ้าเด็กหลงทำยังไง') && content.includes('999') && ca.body.system.includes('ใช้เฉพาะข้อความจากคู่มือ'), 'ask the guide: the manual\'s lost-child text is in the excerpt; manual-only prompt');
  ok(content.length < 20000 && !content.includes('ปลาอยู่ในน้ำเหมือนหนูเลย') && !content.includes('ไอติมมิกกี้') && !content.includes('"image"'), 'ask the guide: a bounded excerpt, no family records, no photos');
  ok((await state()).entries.length === nE2, 'ask the guide: nothing saved');
  ok((await ask({ trip: T, day: 0, lang: 'en', q: '  ' })).status === 400 && calls.length === ba + 1, 'ask the guide: an empty question → 400, model not called');
  const re = events(await (await ask({ trip: T, day: 1, lang: 'en', q: 'Where can we eat dim sum?' })).text());
  ok(re.at(-1).ev === 'done' && calls.at(-1).body.messages[0].content.toLowerCase().includes('dim sum') && calls.at(-1).body.system.includes('ONLY the excerpts'), 'ask the guide (en): dim sum places from the manual');

  // both languages: the day's words go to Claude once, each translation is saved on its entry and dropped when the text changes
  const tl = (b) => fetch(BASE + '/api/b/translate', { method: 'POST', headers: H, body: JSON.stringify(b) });
  const bt = calls.length, rt = await tl({ trip: T, day: 1 });
  const ent = async (id) => (await state()).entries.find((e) => e.id === id);
  ok(rt.ok && (await rt.json()).n === 3 && calls.length === bt + 1, 'translate: quote, favourite and summary of day 1 in one call');
  const items = JSON.parse(calls.at(-1).body.messages[0].content);
  ok(items.find((x) => x.text === 'ปลาอยู่ในน้ำเหมือนหนูเลย').to === 'en' && items.find((x) => x.text === 'We went to Disneyland.').to === 'th' && !JSON.stringify(calls.at(-1).body).includes('base64'), 'translate: Thai → English, English → Thai, words only');
  ok((await ent('q-story-0001')).tr === 'en:ปลาอยู่ในน้ำเหมือนหนูเลย' && (await ent(`${T}.sum.d1`)).tr === 'th:We went to Disneyland.', 'translate: saved on each entry');
  ok((await tl({ trip: T, day: 1 })).status === 422 && calls.length === bt + 1, 'translate: nothing new → 422, model not called');
  await put('/api/b/entries/q-story-0001', { trip: T, day: 1, kind: 'quote', child: 'mika', text: 'ปลาอยู่ในน้ำเหมือนหนูเลย', highlight: true });
  await put(`/api/b/entries/${T}.fav.d1`, { trip: T, day: 1, kind: 'fav', text: 'ไอติมช็อกโกแลต' });
  ok((await ent('q-story-0001')).tr && !(await ent(`${T}.fav.d1`)).tr, 'translate: kept when only the star changes, dropped when the text changes');

  // bedtime questions (mode 'talk'): own prompt, saved as the day's talk entry, one question per line
  const btk = calls.length, rtk = events(await (await story({ trip: T, day: 1, lang: 'th', mode: 'talk' })).text());
  const talk = (await state()).entries.find((e) => e.id === `${T}.talk.d1`);
  ok(calls.length === btk + 1 && rtk.at(-1).ev === 'done' && calls.at(-1).body.system.includes('คำถามชวนคุยก่อนนอน 3 ข้อ') && calls.at(-1).body.system.includes('ตื่นเต้น'), 'bedtime questions: own prompt (kid words, exciting), streamed, done');
  ok(talk && talk.kind === 'talk' && talk.text.split('\n').length >= 2 && !talk.text.includes('**'), 'bedtime questions: saved on the day, one per line');

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
  await page.click('#sumgo');
  await page.waitForFunction(() => !document.querySelector('#sumstop') || document.querySelector('#sumstop').hidden);
  await page.waitForFunction(() => document.querySelector('#sumtext') && document.querySelector('#sumtext').value.includes('ฝันดี'));
  ok(await page.locator('#sumgo').isEnabled(), 'browser: Claude\'s summary lands in the editable box');
  await page.click('#msggo');
  await page.waitForFunction(() => { const b = document.querySelector('#msgsend'); return b && !b.hidden && document.querySelector('#msgtext').value.includes('ฝันดี'); });
  ok(true, 'browser: the note for the family lands in its box with a send button');
  await page.click('#talkgo');
  await page.waitForFunction(() => !document.querySelector('#talkstop') || document.querySelector('#talkstop').hidden);
  await page.waitForFunction(() => { const x = document.querySelector('#talktext'); return x && !x.hidden && x.textContent.includes('ฝันดี'); });
  ok(true, 'browser: bedtime questions written on the record page');
  await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kiddays');
  await page.click('.kiddays button[data-v="1"]');
  await page.waitForSelector('[data-v="#/kid/mimi/talk"]', { state: 'attached' });
  await page.goto(`${BASE}/#/kid/mimi/talk`); await page.waitForSelector('.kidtalk .qcard');
  await page.locator('.kidtalk .qcard').first().click();
  ok(await page.locator('.kidtalk .qcard').count() >= 2 && await page.locator('.kidtalk .qcard[aria-pressed="true"]').count() === 1, 'kid mode: 💬 Let\'s talk shows the questions as cards; a tap reads one');
  await page.goto(`${BASE}/#/t/${T}/today/1`); await page.waitForSelector('#askq');
  await page.locator('.ask .chip').first().click();
  await page.waitForFunction(() => { const a = document.querySelector('#askans'); return a && !a.hidden && a.textContent.includes('ฝันดี') && document.querySelector('#askstop').hidden; });
  ok(await page.inputValue('#askq') !== '', 'browser: a suggestion chip asks the guide and the answer shows on the Today page');
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
  ok(await page.locator('#d1 .call.pick', { hasText: 'ฝันดี' }).count() === 1, 'book: bedtime story on the day page');
  ok(await page.locator('#d1 .daysum').count() === 1, 'book: the day summary leads the day page');
  ok(await page.locator('#d1 .tr', { hasText: 'en:ปลาอยู่ในน้ำเหมือนหนูเลย' }).count() >= 1 && await page.locator('#d1 .daysum .tr').count() === 0, 'book: the translation under the quote; the re-written summary lost its old one');
  ok(errs.length === 0, 'no page errors ' + errs.join(' | '));

  // daily cap (STORY_DAILY=15 here, stories, summaries, notes, guide answers, translations and bedtime questions together): the 15th model call goes through, the 16th is refused before Claude is called
  ok(calls.length === 14 && events(await (await story({ trip: T, day: 1, lang: 'th' })).text()).at(-1).ev === 'done', 'daily cap: 15th call of the day still written');
  const capped = await story({ trip: T, day: 1, lang: 'th' });
  ok(capped.status === 429 && (await capped.json()).error === 'limit' && calls.length === 15, 'daily cap: 16th call refused with 429, model not called');
  ok((await story({ trip: T, day: 0, lang: 'th' })).status === 422, 'daily cap: an empty day still answers 422 (nothing counted)');
  await browser.close();
} finally {
  srv.kill(); await new Promise((r) => srv.on('exit', r)); mock.close();
  fs.rmSync(data, { recursive: true, force: true });
  await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`); await admin.end();
}
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
