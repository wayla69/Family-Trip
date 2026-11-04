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
    const mc = b.messages[0].content, facts = typeof mc === 'string' ? mc : mc.map((x) => x.text || '').join('\n');   // ask-the-guide sends blocks; photos send image blocks too
    res.writeHead(200, { 'content-type': 'text/event-stream' });
    const ev = (type, data) => res.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);
    ev('message_start', { message: { id: 'msg_1', type: 'message', role: 'assistant', model: b.model, content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 0 } } });
    ev('content_block_start', { index: 0, content_block: { type: 'text', text: '' } });
    const refuse = facts.includes('REFUSE'), slow = facts.includes('SLOW');
    const trans = String(b.system).startsWith('Translate');
    const photo = String(b.system).includes('"cap"');   // look at today's photos: JSON per id; a stop from the STOPS line, plus junk that must be dropped
    const pids = [...facts.matchAll(/^id: (\S+)$/gm)].map((m) => m[1]), stop0 = (/STOPS: "([^"]*)"/.exec(facts) || [])[1] || '';
    const quiz = String(b.system).includes('"ok":');   // the memory game answers JSON (once with a bad item, which must be dropped)   // translate: answer JSON [{id, tr}] for the items it was given
    const parts = photo ? [JSON.stringify(pids.map((id, k) => (k === 0 ? { id, cap: '## เด็กๆ **ยิ้ม** หน้าปราสาท', tags: ['kids', 'Character', 'bogus', 'kids'], place: stop0, best: true } : { id, cap: 'เรากินติ่มซำ', tags: ['food'], place: 'Narnia', best: 'yes' })))]
      : quiz ? ['```json\n[{"q":"เมื่อวานมีมี่บอกว่าปลาอยู่ที่ไหน","a":[{"e":"💧","t":"ในน้ำ"},{"e":"🌳","t":"บนต้นไม้"},{"e":"🚌","t":"บนรถบัส"}],"ok":0},',
      '{"q":"ไปไหนมา","a":[{"e":"🏰","t":"ดิสนีย์"},{"e":"🏖️","t":"ทะเล"},{"e":"🏔️","t":"ภูเขา"}],"ok":0},{"q":"bad","a":[{"t":"x"}],"ok":3}]\n```']
      : trans ? [JSON.stringify(JSON.parse(facts).map((x) => ({ id: x.id, tr: `${x.to}:${x.text}` })))]
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
  env: { ...process.env, PORT: String(port), DATA_DIR: data, DATABASE_URL: u.toString(), ANTHROPIC_API_KEY: 'test-key', ANTHROPIC_BASE_URL: `http://localhost:${mockPort}`, STORY_DAILY: '17', PHOTO_AI: '1' } });
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
  const ca = calls.at(-1), blocks = ca.body.messages[0].content, content = blocks.map((x) => x.text).join('\n');
  ok(Array.isArray(blocks) && blocks[0].cache_control && blocks[0].cache_control.type === 'ephemeral' && !blocks[1].cache_control && blocks[1].text.includes('ถ้าเด็กหลงทำยังไง'), 'ask the guide: the day\'s manual goes first, marked for the prompt cache; the question last');
  ok(calls.length === ba + 1 && ra.at(-1).ev === 'done' && ra.at(-1).data.text, 'ask the guide: streamed answer, then done');
  ok(content.includes('คำถาม: ถ้าเด็กหลงทำยังไง') && content.includes('999') && ca.body.system.includes('ใช้เฉพาะข้อความจากคู่มือ'), 'ask the guide: the manual\'s lost-child text is in the excerpt; manual-only prompt');
  ok(content.length < 20000 && !content.includes('ปลาอยู่ในน้ำเหมือนหนูเลย') && !content.includes('ไอติมมิกกี้') && !content.includes('"image"'), 'ask the guide: a bounded excerpt, no family records, no photos');
  ok((await state()).entries.length === nE2, 'ask the guide: nothing saved');
  ok((await ask({ trip: T, day: 0, lang: 'en', q: '  ' })).status === 400 && calls.length === ba + 1, 'ask the guide: an empty question → 400, model not called');
  const re = events(await (await ask({ trip: T, day: 1, lang: 'en', q: 'Where can we eat dim sum?' })).text());
  ok(re.at(-1).ev === 'done' && calls.at(-1).body.messages[0].content.map((x) => x.text).join(' ').toLowerCase().includes('dim sum') && calls.at(-1).body.system.includes('ONLY the excerpts'), 'ask the guide (en): dim sum places from the manual');

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

  // the letter to the kids: whole trip only, saved as the trip's letter entry; the PDF's last page carries it
  for (const id of ['q-story-0002', 'q-story-0003']) await fetch(BASE + '/api/b/entries/' + id, { method: 'DELETE', headers: H });   // the mock refuses REFUSE / stalls on SLOW — not for the letter
  const bl = calls.length;
  ok((await story({ trip: T, day: 1, lang: 'th', mode: 'letter' })).status === 400 && calls.length === bl, 'letter: whole trip only (a day → 400, model not called)');
  const rl = events(await (await story({ trip: T, day: null, lang: 'th', mode: 'letter' })).text());
  const letter = (await state()).entries.find((e) => e.id === `${T}.letter.all`);
  ok(rl.at(-1).ev === 'done' && letter && letter.kind === 'letter' && letter.day === null && calls.at(-1).body.system.includes('ถึงมีมี่และมีก้า') && calls.at(-1).body.messages[0].content.includes('ปลาอยู่ในน้ำเหมือนหนูเลย'), 'letter: drafted from the whole trip, saved for the trip');
  ok((await put(`/api/b/entries/${T}.letter.all`, { trip: T, day: null, kind: 'letter', text: 'ถึงมีมี่และมีก้า — พ่อแม่เขียนเอง' })).ok, 'letter: a hand edit saves (no day needed)');
  // what our family likes: the travel notebook of every trip → Claude → saved for both parents
  const lk = () => fetch(BASE + '/api/b/likes', { method: 'POST', headers: H, body: JSON.stringify({ lang: 'th' }) });
  const bk = calls.length;
  ok((await lk()).status === 422 && calls.length === bk, 'likes: an empty notebook → 422, model not called');
  await put('/api/b/reviews/' + `${T}.rev.food.yat-lok`, { trip: T, day: 1, kind: 'food', key: 'yat-lok', name: { en: 'Yat Lok', th: 'ยัดลก' }, rating: 5, tags: ['kidsate'], kids: { mimi: 'love' }, again: true, note: 'ห่านย่างอร่อย เด็กกินได้' });
  const rk = events(await (await lk()).text());
  const saved2 = await (await fetch(BASE + '/api/b/likes', { headers: { cookie: ck } })).json();
  ok(rk.at(-1).ev === 'done' && saved2 && saved2.text && saved2.n === 1 && calls.at(-1).body.messages[0].content.includes('ยัดลก') && calls.at(-1).body.messages[0].content.includes('มีมี่: loved it'), 'likes: the notebook goes to Claude (names, stars, the kids\' verdicts) and the summary is saved');

  const vck = (await fetch(BASE + '/v/grandma', { redirect: 'manual' })).headers.get('set-cookie');
  ok(!vck || (await fetch(BASE + '/api/b/story', { method: 'POST', headers: { ...H, cookie: vck.split(';')[0] }, body: '{}' })).status === 403, 'viewer cannot ask for stories');
  ok(!vck || (await fetch(BASE + '/api/b/likes', { headers: { cookie: vck.split(';')[0] } })).status === 403, 'relatives cannot read the family-likes summary (it names places from every trip)');

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
  // no signal: the same box answers from the manual on the phone (the book's own search), without Claude
  const nCalls = calls.length;
  await page.context().setOffline(true);
  await page.fill('#askq', 'ถ้าเด็กหลงทำยังไง'); await page.press('#askq', 'Enter');
  await page.waitForFunction(() => { const a = document.querySelector('#askans'); return a && a.textContent.includes('📴') && a.querySelector('.sres a'); });
  ok(calls.length === nCalls && (await page.textContent('#askans .sres')).includes('999'), 'offline: the lost-child section of the manual is offered (no Claude call)');
  await page.context().setOffline(false);
  // the trip's spending: per currency (never converted), by category with bars, day by day, biggest items
  for (const [id, day, amount, cur, cat, note] of [['sp-t-01', 0, 120, 'HKD', 'food', 'dim sum'], ['sp-t-02', 0, 60, 'HKD', 'transport', 'taxi'], ['sp-t-03', 1, 800, 'HKD', 'tickets', 'Disneyland'], ['sp-t-04', 1, 300, 'THB', 'food', 'airport']])
    await put('/api/b/spend/' + id, { trip: T, day, amount, cur, cat, note });
  await page.goto(`${BASE}/#/t/${T}`); await page.reload(); await page.waitForSelector('.tile.t-spend');
  await page.click('.tile.t-spend'); await page.waitForSelector('.spsum');
  const sp = await page.textContent('main');
  ok(await page.locator('.spsum').count() === 2 && await page.locator('.spsum').first().locator('.spbars li').count() === 3 && await page.locator('.spdays li').count() === 2, 'spending: one block per currency, a bar per category, a row per day');
  ok(/Disneyland/.test(await page.textContent('.blk:last-child .items li:first-child')) && !/THB\s*1,?28/.test(sp), 'spending: biggest item first; currencies never added together');
  // the 21:30 reminder opens the record page at the evening Claude buttons
  await page.goto(`${BASE}/#/t/${T}/log/1/ai`); await page.waitForSelector('.evening');
  await page.click('.evening [data-v=".talkblk"]');
  ok(await page.locator('.evening button').count() === 3 && await page.locator('.talkblk.flash').count() === 1, 'evening link: three Claude buttons on top; a tap jumps to its block');
  // sound words in a bedtime story: drawn big, a sound + sparkles when the reader gets there; the last page stays quiet
  await put(`/api/b/entries/${T}.story.d2`, { trip: T, day: 2, kind: 'story', text: 'ว้าว! เครื่องบินบิน ฟิ้ว~ ไปเลย\nเราไปจากกรุงเทพฯ กินขนมปัง\nแล้วก็ ตูม! ฝันดีนะ' });
  await page.goto(`${BASE}/#/t/${T}/book`); await page.reload(); await page.waitForSelector('#d2');
  await page.locator(`#d2 [data-a="bedtime"]`).first().click(); await page.waitForSelector('#bedtime .bttext');
  await page.waitForFunction(() => typeof bt !== 'undefined' && bt && bt.sfx >= 1, null, { timeout: 8000 });
  ok(await page.locator('#bedtime .sfxw').count() === 2 && (await page.locator('#bedtime .sfxw').allTextContents()).join(',') === 'ว้าว,ฟิ้ว', 'bedtime: sound words drawn big and played on page 1');
  await page.click('[data-a="btnext"]'); await page.click('[data-a="btnext"]');
  ok(await page.locator('#bedtime .sfxw').count() === 0 && (await page.textContent('#bedtime .bttext')).includes('ตูม'), 'bedtime: the last page stays quiet (no effect on ตูม)');
  await page.click('[data-a="btprev"]');
  ok(await page.locator('#bedtime .sfxw').count() === 0, 'bedtime: "ขนมปัง" and "กรุงเทพฯ" are not sound words');
  await page.click('[data-a="btclose"]');
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
  ok(await page.locator('#d1 .call.pick', { hasText: 'ฝันดี' }).count() === 1, 'book: bedtime story on the day page');
  ok(await page.locator('#d1 .daysum').count() === 1, 'book: the day summary leads the day page');
  ok(await page.locator('#d1 .tr', { hasText: 'en:ปลาอยู่ในน้ำเหมือนหนูเลย' }).count() >= 1 && await page.locator('#d1 .daysum .tr').count() === 0, 'book: the translation under the quote; the re-written summary lost its old one');
  ok(await page.inputValue('#lettertext') === 'ถึงมีมี่และมีก้า — พ่อแม่เขียนเอง', 'book: the letter box holds the saved letter');
  await page.goto(`${BASE}/#/print/${T}`); await page.waitForSelector('.letterp');
  ok((await page.textContent('.letterp')).includes('พ่อแม่เขียนเอง'), 'PDF route: the letter is a page before the back cover');
  await page.goto(`${BASE}/#/notebook`); await page.waitForSelector('#likestext:not([hidden])');
  ok(await page.locator('#likesgo').count() === 1, 'notebook: the saved family-likes summary shows, with a button to sum up again');
  ok(errs.length === 0, 'no page errors ' + errs.join(' | '));

  // daily cap (STORY_DAILY=17 here, every Claude button together): the 17th model call goes through, the 18th is refused before Claude is called
  ok(calls.length === 16 && events(await (await story({ trip: T, day: 1, lang: 'th' })).text()).at(-1).ev === 'done', 'daily cap: 17th call of the day still written');
  const capped = await story({ trip: T, day: 1, lang: 'th' });
  ok(capped.status === 429 && (await capped.json()).error === 'limit' && calls.length === 17, 'daily cap: 18th call refused with 429, model not called');
  ok((await story({ trip: T, day: 0, lang: 'th' })).status === 422, 'daily cap: an empty day still answers 422 (nothing counted)');
  // Claude usage card: today's calls (counted in Postgres) and the tokens the finished calls used
  const use = await (await fetch(BASE + '/api/b/ai', { headers: { cookie: ck } })).json();
  ok(use.limit === 17 && use.today.calls === 17 && use.days30.calls === 17, `usage: today ${use.today.calls}/${use.limit} calls counted`);
  ok(use.today.tout > 0 && use.today.tin > 0 && use.usd30 === null, 'usage: tokens added from each finished call; no price guessed when none is set');
  ok(!vck || (await fetch(BASE + '/api/b/ai', { headers: { cookie: vck.split(';')[0] } })).status === 403, 'usage: relatives cannot see it');

  // ---- tomorrow in five lines · the morning memory game · the book's foreword (a fresh day's cap for these)
  { const db = new Client({ connectionString: u.toString() }); await db.connect(); await db.query('UPDATE ai_usage SET calls=0'); await db.end(); }
  const bn = calls.length;
  ok((await story({ trip: T, day: 5, lang: 'th', mode: 'next' })).status === 400 && calls.length === bn, 'tomorrow: no tomorrow after the last day (400, model not called)');
  const rn = events(await (await story({ trip: T, day: 1, lang: 'th', mode: 'next' })).text());
  const nc = calls.at(-1).body.messages[0].content;
  ok(rn.at(-1).ev === 'done' && rn.at(-1).data.text && !rn.at(-1).data.id && !(await state()).entries.some((e) => e.kind === 'next'), 'tomorrow: streamed, never saved');
  ok(nc.includes('พรุ่งนี้: วันที่ 3') && /\d\d:\d\d /.test(nc) && nc.includes('วันนี้เป็นยังไง') && nc.includes('ปลาอยู่ในน้ำเหมือนหนูเลย') && calls.at(-1).body.system.includes('แผนสำรอง') && calls.at(-1).body.system.includes('ห้ามแต่งเวลา'), 'tomorrow: tomorrow\'s timeline + how today went go to Claude; the prompt asks for times, bag, rain plan, naps — nothing invented');
  const rq = events(await (await story({ trip: T, day: 1, lang: 'th', mode: 'mquiz' })).text());
  const mq = (await state()).entries.find((e) => e.id === `${T}.mquiz.d1`), qs = mq ? JSON.parse(mq.text) : [];
  ok(rq.at(-1).ev === 'done' && mq && mq.kind === 'mquiz' && qs.length === 2 && qs.every((x) => x.a.length === 3 && x.a[x.ok] && ['ในน้ำ', 'ดิสนีย์'].includes(x.a[x.ok].t)), 'memory game: saved on the day as picture questions; a broken item is dropped; the right answer is kept after shuffling');
  ok(!calls.at(-1).body.system.includes('ห้ามใช้สำนวนแบบ AI') && calls.at(-1).body.system.includes('JSON'), 'memory game: a JSON prompt (no "sound like the parents" tail)');
  ok((await story({ trip: T, day: 1, lang: 'th', mode: 'fore' })).status === 400, 'foreword: whole trip only');
  const rf = events(await (await story({ trip: T, day: null, lang: 'th', mode: 'fore' })).text());
  const fw = (await state()).entries.find((e) => e.id === `${T}.fore.all`);
  ok(rf.at(-1).ev === 'done' && fw && fw.kind === 'fore' && fw.day === null && calls.at(-1).body.system.includes('คำนำ') && calls.at(-1).body.max_tokens === 2000, 'foreword: drafted from the whole trip, saved for the book');
  ok((await put(`/api/b/entries/${T}.fore.all`, { trip: T, day: null, kind: 'fore', text: 'ทริปนี้เราไปฮ่องกง — พ่อแม่เขียนเอง' })).ok, 'foreword: a hand edit saves (no day needed)');
  // ---- look at today's photos (PHOTO_AI=1 here): the day's unseen thumbnails go once, with the day's stop names; caption/tags/place come back
  { const sharp = createRequire(import.meta.url)('sharp');
    const jpg = async (c) => sharp({ create: { width: 1600, height: 1200, channels: 3, background: c } }).jpeg().toBuffer();
    const up = async (id, color, extra = '') => (await fetch(`${BASE}/api/b/media/${id}?trip=${T}&day=1${extra}`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: await jpg(color) })).ok;
    ok(await up('ph-ai-0001', '#3b82f6') && await up('ph-ai-0002', '#ef4444', '&caption=' + encodeURIComponent('แม่เขียนเอง')), 'photos: two uploaded on day 1, one with the parents\' caption');
    const look = (b) => fetch(BASE + '/api/b/photos/ai', { method: 'POST', headers: H, body: JSON.stringify(b) });
    ok((await state()).features.photoAi === true, 'photos: the feature is on with PHOTO_AI=1');
    const bp = calls.length, rp = await look({ trip: T, day: 1, lang: 'th' }), jp = await rp.json();
    ok(rp.ok && jp.n === 2 && jp.left === 0 && calls.length === bp + 1, `photos: one call for the two photos (n=${jp.n}, left=${jp.left})`);
    const pc = calls.at(-1).body, blocks = pc.messages[0].content, imgs = blocks.filter((x) => x.type === 'image'), txt = blocks.filter((x) => x.type === 'text').map((x) => x.text).join('\n');
    ok(imgs.length === 2 && imgs.every((x) => x.source.type === 'base64' && x.source.media_type === 'image/jpeg' && x.source.data.length < 120000), 'photos: two small JPEG thumbnails travel (never the full file)');
    ok(txt.includes('STOPS:') && txt.includes('ฮ่องกงดิสนีย์แลนด์') && txt.includes('id: ph-ai-0001') && !txt.includes('ปลาอยู่ในน้ำเหมือนหนูเลย') && !txt.includes('ไอติม'), 'photos: the day\'s stop names go along, the family\'s words do not');
    ok(pc.system.includes('"cap"') && pc.system.includes('เด็กๆ') && pc.system.includes('ห้ามเรียกชื่อ') && pc.system.includes('ห้ามใช้สำนวนแบบ AI'), 'photos: prompt — no names, no guessing, sounds like the parents');
    const med = async (id) => (await state()).media.find((m) => m.id === id);
    const m1 = await med('ph-ai-0001'), m2 = await med('ph-ai-0002');
    ok(m1.caption === 'เด็กๆ ยิ้ม หน้าปราสาท' && m1.ai === true && m1.tags.join(',') === 'kids,character' && m1.place === 'Hong Kong Disneyland', `photos: caption cleaned, tags only from the list, place from the stops (${JSON.stringify([m1.caption, m1.tags, m1.place])})`);
    ok(m2.caption === 'แม่เขียนเอง' && m2.tags.join(',') === 'food' && m2.place === '' && m2.ai === true, 'photos: the parents\' caption is kept; a place not in the list is dropped');
    ok(jp.starred === 1 && m1.highlight === true && m2.highlight === false, `photos: Claude's best pick gets the ⭐ on a day without one (only a real true counts; starred=${jp.starred})`);
    ok(pc.system.includes('"best"') && pc.system.includes('รูปเด่น'), 'photos: the prompt asks for the day\'s best photos');
    ok((await look({ trip: T, day: 1, lang: 'th' })).status === 422 && calls.length === bp + 1, 'photos: nothing unseen → 422, model not called');
    await fetch(BASE + '/api/b/media/ph-ai-0001', { method: 'PATCH', headers: H, body: JSON.stringify({ highlight: false }) });
    await fetch(BASE + '/api/b/media/ph-ai-0002', { method: 'PATCH', headers: H, body: JSON.stringify({ highlight: true }) });
    const again = await look({ trip: T, day: 1, lang: 'en', all: true }), ja = await again.clone().json();
    ok(ja.starred === 0 && (await med('ph-ai-0001')).highlight === false && (await med('ph-ai-0002')).highlight === true, 'photos: the parents\' own ⭐ wins — Claude stars nothing on a day that has one');
    ok(again.ok && calls.length === bp + 2 && calls.at(-1).body.messages[0].content.filter((x) => x.type === 'image').length === 2, 'photos: "look again" sends the whole day once more');
    ok((await look({ trip: T, day: null, lang: 'th' })).status === 400 && (await look({ trip: T, day: 0, lang: 'th' })).status === 422, 'photos: needs a day; a day without photos → 422');
    const patch = (id, b) => fetch(BASE + '/api/b/media/' + id, { method: 'PATCH', headers: H, body: JSON.stringify(b) });
    ok((await patch('ph-ai-0002', { tags: ['Food', ' ride ', 'our own', 'food'], place: 'ไทม์สแควร์' })).ok && (await med('ph-ai-0002')).tags.join(',') === 'food,ride,our own' && (await med('ph-ai-0002')).place === 'ไทม์สแควร์', 'photos: the parents edit tags and place by hand');
    ok((await patch('ph-ai-0002', { tags: 'food' })).status === 400 && (await patch('ph-ai-0002', { tags: Array(11).fill('x') })).status === 400, 'photos: tags must be a short list');
    ok(!vck || (await fetch(BASE + '/api/b/photos/ai', { method: 'POST', headers: { ...H, cookie: vck.split(';')[0] }, body: '{}' })).status === 403, 'photos: relatives cannot send photos to Claude');
    ok(!vck || (await (await fetch(BASE + '/api/b/state', { headers: { cookie: vck.split(';')[0] } })).json()).media.find((m) => m.id === 'ph-ai-0001').tags.includes('kids'), 'photos: relatives see the tags in the book'); }
  { const P = createRequire(import.meta.url)('../server/story.js').parseQuiz;
    ok(P('no json here') === null && P('[{"q":"x","a":[{"t":"a"}],"ok":0}]') === null && P('[{"q":"x","a":[{"t":"a"},{"t":"b"}],"ok":1}]')[0].a.length === 2, 'memory game parser: no JSON or too few answers → nothing kept'); }
  { const b2 = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] }); const pg2 = await (await b2.newContext({ viewport: { width: 390, height: 844 } })).newPage();
    await pg2.goto(BASE + '/'); await pg2.fill('#lcode', CODE); await pg2.click('#lf button[type=submit]'); await pg2.waitForSelector('.shelf');
    await pg2.goto(`${BASE}/#/t/${T}/book`); await pg2.waitForSelector('#foretext');
    ok(await pg2.inputValue('#foretext') === 'ทริปนี้เราไปฮ่องกง — พ่อแม่เขียนเอง' && await pg2.locator('#forego').count() === 1, 'book: the foreword box holds the saved foreword, with a Claude draft button');
    await pg2.goto(`${BASE}/#/print/${T}`); await pg2.waitForSelector('.forep');
    ok(await pg2.evaluate(() => { const p = [...document.querySelectorAll('section.pg')].map((x) => x.className); const c = p.findIndex((x) => /\bcover\b/.test(x)), f = p.findIndex((x) => /\bforep\b/.test(x)); return c >= 0 && f === c + 1; }), 'PDF route: the foreword is the first page after the cover');
    await pg2.goto(`${BASE}/#/t/${T}/today/1`); await pg2.waitForSelector('#nextgo');
    ok(await pg2.locator('.nextblk').count() === 1, 'today page: the "ready for tomorrow" button for grown-ups');
    await pg2.goto(`${BASE}/#/t/${T}/log/1`); await pg2.waitForSelector('#mquiztext:not([hidden])');
    ok((await pg2.textContent('#mquiztext')).includes('✓'), 'record page: the memory game is listed with its right answers for the grown-ups');
    // look at today's photos: the block counts what Claude has seen; a third photo makes the button live, a press sends it and the page redraws
    ok(await pg2.locator('.phaiblk').count() === 1 && (await pg2.textContent('.phaiblk h3')).includes('2/2') && await pg2.locator('#phaigo').isDisabled(), 'record page: "Claude looks at today\'s photos" shows 2/2 seen, nothing new to send');
    await fetch(`${BASE}/api/b/media/ph-ai-0003?trip=${T}&day=1`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: await createRequire(import.meta.url)('sharp')({ create: { width: 800, height: 600, channels: 3, background: '#22c55e' } }).jpeg().toBuffer() });
    await pg2.reload(); await pg2.waitForSelector('#phaigo:not([disabled])');
    await pg2.click('#phaigo');
    await pg2.waitForFunction(() => document.querySelector('.phaiblk h3') && document.querySelector('.phaiblk h3').textContent.includes('3/3'));
    ok(true, 'record page: a press sends the new photo and the block shows 3/3 seen');
    await pg2.goto(`${BASE}/#/t/${T}/log/1/ai`); await pg2.waitForSelector('.evening');
    await pg2.click('.evening [data-v=".phaiblk"]');
    ok(await pg2.locator('.evening button').count() === 4 && (await pg2.locator('.evening button').first().textContent()).includes('👀') && await pg2.locator('.phaiblk.flash').count() === 1, 'evening panel: "photos first" leads the Claude buttons on a day with photos and jumps to the block');
    await pg2.goto(`${BASE}/#/t/${T}/book`); await pg2.waitForSelector('#d1 .phgrp');
    ok(await pg2.locator('#d1 .phgrp').count() === 2 && (await pg2.locator('#d1 .phgrp .label').first().textContent()).includes('Hong Kong Disneyland'), 'book: the day\'s photos grouped by stop, the placed ones first');
    await pg2.goto(`${BASE}/#/t/${T}`); await pg2.waitForSelector('.tile.t-photos');
    await pg2.click('.tile.t-photos'); await pg2.waitForSelector('#phtags');
    await pg2.click('#phtags [data-v="food"]');
    ok(await pg2.locator('#phlist .mosaic button:visible').count() === 1 && await pg2.locator('#phtags [data-v="food"][aria-pressed="true"]').count() === 1, 'photos by tag: the food chip leaves one photo showing, in place');
    await pg2.locator('#phlist .mosaic button:visible').first().click(); await pg2.waitForSelector('#lbtags');
    ok((await pg2.inputValue('#lbtags')).includes('food') && (await pg2.textContent('#lb .tags')).includes('🍜'), 'lightbox: tags and place shown and editable');
    await b2.close(); }
  await browser.close();
} finally {
  srv.kill(); await new Promise((r) => srv.on('exit', r)); mock.close();
  fs.rmSync(data, { recursive: true, force: true });
  await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`); await admin.end();
}
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
