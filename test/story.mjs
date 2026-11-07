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
const calls = [], importCalls = [];
let upstreamClosedEarly = false;
const openaiCalls = [];
const mock = http.createServer((req, res) => {
  if (req.url === '/v1/images/edits') {   // OpenAI's image model: the first call is turned down by its safety system, the rest draw a small PNG
    const chunks = []; req.on('data', (d) => chunks.push(d));
    req.on('end', async () => {
      const raw = Buffer.concat(chunks); openaiCalls.push({ headers: req.headers, raw });
      if (openaiCalls.length === 1) { res.writeHead(400, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ error: { message: 'Your request was rejected by the safety system.' } })); }
      const png = await createRequire(import.meta.url)('sharp')({ create: { width: 400, height: 600, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
        .composite([{ input: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="400"><circle cx="100" cy="90" r="80" fill="#F8DCC6"/><rect x="40" y="170" width="120" height="220" fill="#8E5BE0"/></svg>'), left: 100, top: 100 }]).png().toBuffer();
      res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ data: [{ b64_json: png.toString('base64') }], usage: { input_tokens: 500, output_tokens: 6000 } }));
    });
    return;
  }
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
    const sysText = JSON.stringify(b.system);   // the import sends system as blocks (the redacted manual cached in the second one)
    const imp = sysText.includes('Trip Operations Manual') ? (facts.includes('top level and its days') ? 'top' : facts.includes('pocket guide') ? 'info' : facts.startsWith('List EVERY restaurant') ? 'restlist' : facts.startsWith('List only the area headings') ? 'restareas' : facts.startsWith('For these areas') ? 'restnames' : facts.startsWith('For each of these places') ? 'rest' : 'other')
      : sysText.includes("children's pages") ? 'kids' : sysText.includes('playful pages') ? 'extras' : sysText.includes('You translate a family trip guide') ? 'thai' : null;
    if (imp) importCalls.push({ step: imp, system: sysText, user: facts });
    const en = (x) => ({ en: x }), L2 = (th, e) => ({ th, en: e });
    const IMP = {
      top: () => JSON.stringify({ slug: 'wrong-slug', title: en('The Test Hop · Testland'), from: '2027-03-10', to: '2027-03-11', tz: 'Asia/Tokyo', place: { en: 'Testland', flag: '🏳️' },
        days: [0, 1].map((i) => ({ title: en(`Day ${i + 1} of the test`), sleep: en('Test Inn'), planned: [{ en: 'Test Square', th: i ? null : '', zh: '測試', q: 'Test Square, Testland' }], moving: { en: 'Walk 5 min', th: ' ' },
          plan: [{ t: '09:00', en: 'Breakfast' }, { t: '11:00', en: 'Super Fun Zone opens' }], tips: [en('Show the driver: 測試')], stay: { name: 'Test Inn', addr: '1 Test St', q: 'Test Inn, Testland' } })) }),
      info: () => JSON.stringify({ emergency: [{ label: en('All emergencies'), tel: '999', main: true }], lost: en('Stand still'), guide: [{ title: en('Clocks'), text: en('One hour ahead') }, { title: en('Front desk'), text: en('Show booking ref KL4PQZ at check-in') }] }),
      restlist: () => JSON.stringify({ areas: [{ area: en('Test town'), kind: 0, names: ['Test Noodles', 'Test Dumplings'] }, { area: en('Test sweets'), kind: 2, names: ['Test Tarts'] }] }),
      // the list overflows once (stop_reason max_tokens below), so the fallback asks for the headings, then the names
      restareas: () => JSON.stringify({ areas: [{ area: en('Test town'), kind: 0 }, { area: en('Test sweets'), kind: 2 }] }),
      restnames: () => JSON.stringify({ areas: [{ area: en('Test town'), names: ['Test Noodles', 'Test Dumplings'] }, { area: en('Test sweets'), names: ['Test Tarts'] }] }),
      // the rows for the names asked; "Test Dumplings" is left out the first time so the retry is exercised
      rest: () => JSON.stringify({ items: JSON.parse(/Places: (\[.*\])/.exec(facts)[1]).filter((n) => n !== 'Test Dumplings' || importCalls.filter((c) => c.step === 'rest').length > 1).map((n) => ({ name: n, what: en(n === 'Test Tarts' ? 'Egg tarts' : 'Noodles'), pr: 'MOP 50', q: `${n}, Testland`, pick: n === 'Test Noodles' ? ['Day 1 · Lunch'] : [] })) }),
      extras: () => JSON.stringify({ wild: [{ name: L2('นกนางนวล', 'Seagull'), emo: '🐦', text: L2('บินเหนือท่าเรือ', 'Flies over the pier') }, { name: L2('ปูทะเล', 'Crab'), emo: '🦀', text: L2('ซ่อนอยู่ใต้ก้อนหิน', 'Hides under rocks') }], wildLabel: { emo: '🐾', title: L2('สัตว์ที่อาจได้เจอ', 'Animals we may meet'), short: L2('สัตว์', 'Animals') },
        firsts: [{ key: 'ferry', emoji: '⛴️', label: L2('นั่งเรือ', 'A ferry') }, { key: 'tram', emoji: '🚋', label: L2('นั่งรถราง', 'A tram') }, { key: 'tart', emoji: '🥧', label: L2('ทาร์ตไข่', 'An egg tart') }, { key: 'bad', label: 'x' }, { key: 'ferry', emoji: '⛴️', label: L2('ซ้ำ', 'dup') }],
        words: [{ k: 'hello', e: '👋', th: 'เฮลโล', en: 'Hello', note: L2('สวัสดี', 'Hi'), say: 'Hello, Kiki!', speak: { text: 'hello', lang: 'en-GB' } }, { k: 'thanks', e: '🙏', th: 'แธงกิ้ว', en: 'Thank you', note: L2('ขอบคุณ', 'Thanks'), speak: { text: 'thank you', lang: 'en-GB' } }, { k: 'bye', e: '👋', th: 'บ๊ายบาย', en: 'Bye', note: L2('ลาก่อน', 'Bye') }],
        food: [{ k: 'tart', e: '🥧', th: 'ทาร์ตไข่', en: 'Egg tart', note: L2('ไส้คัสตาร์ด', 'custard') }, { k: 'noodle', e: '🍜', th: 'บะหมี่', en: 'Noodles' }, { k: 'bun', e: '🥟', th: 'ซาลาเปา', en: 'Bun' }],
        map: { sea: L2('ทะเลทดสอบ', 'Test Sea'), stops: [{ k: 'inn', e: '🛏️', th: 'โรงแรม', en: 'Test Inn', q: 'Test Inn', x: 20, y: 40 }, { k: 'square', e: '🏮', th: 'จัตุรัส', en: 'Test Square', q: 'Test Square', x: 150, y: -3 }], days: [['inn'], ['square', 'inn', 'nowhere']] },
        stays: [{ name: 'Test Inn', why: L2('ใกล้ทุกอย่าง', 'Close to everything') }] }),
      kids: () => JSON.stringify({ days: [0, 1].map((i) => ({ learn: [{ name: L2('จัตุรัส', 'The square'), facts: [L2('กว้าง', 'Wide'), L2('เก่า', 'Old')], kid: L2('นับเสา', 'Count the posts') }], quiz: [{ q: L2('สีอะไร', 'What colour?'), a: L2('แดง', 'Red') }],
        mission: { title: L2('ไปกัน!', "Let's go!"), stamp: `TEST ${i + 1}`, facts: [L2('สนุก', 'Fun')], spot: [{ k: 'ball', e: '🟡', th: 'ลูกบอล', en: 'A ball' }] },
        tale: { th: 'วันนี้สนุก', en: 'Today was fun', scenes: [{ e: '🌉', h: L2('สะพาน', 'The bridge'), th: 'วันนี้สนุก', en: 'Today was fun' }] } })) }),
      thai: () => JSON.stringify(JSON.parse(facts).map((x) => `ไทย: ${x}`)),
    };
    const badJson = imp === 'kids' && importCalls.filter((c) => c.step === 'kids').length === 1;   // the first kids' answer is broken JSON (a missing comma), as a live run once got
    const parts = imp ? [badJson ? '{"days":[{"learn":[{"name":{"th":"x" "en":"x"}}]}]}' : IMP[imp]()] : photo ? [JSON.stringify(pids.map((id, k) => (k === 0 ? { id, cap: '## เด็กๆ **ยิ้ม** หน้าปราสาท', tags: ['kids', 'Character', 'bogus', 'kids'], place: stop0, best: true } : { id, cap: 'เรากินติ่มซำ', tags: ['food'], place: 'Narnia', best: 'yes' })))]
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
    const tooLong = imp === 'restlist' && importCalls.filter((c) => c.step === 'restlist').length === 1;   // the guide's first list answer runs out of room
    ev('message_delta', { delta: { stop_reason: refuse ? 'refusal' : tooLong ? 'max_tokens' : 'end_turn', stop_sequence: null }, usage: { output_tokens: 20 } });
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
  env: { ...process.env, PORT: String(port), DATA_DIR: data, DATABASE_URL: u.toString(), ANTHROPIC_API_KEY: 'test-key', ANTHROPIC_BASE_URL: `http://localhost:${mockPort}`, OPENAI_API_KEY: 'test-openai', OPENAI_BASE_URL: `http://localhost:${mockPort}`, STORY_DAILY: '17', PHOTO_AI: '1' } });
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
  const ctx1 = await browser.newContext({ viewport: { width: 390, height: 844 } }); await ctx1.addInitScript(() => localStorage.setItem('mbs_logall', '1'));   // every record-page box on the page
  const page = await ctx1.newPage();
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(BASE + '/'); await page.fill('#lcode', CODE); await page.keyboard.press('Enter'); await page.waitForSelector('.shelf');
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
  // the 21:30 reminder opens the record page at tonight's Claude panel: every Claude button of the day in one place, after the recording
  await page.goto(`${BASE}/#/t/${T}/log/1/ai`); await page.waitForSelector('#aipanel.flash');
  const order = await page.evaluate(() => { const y = (q) => document.querySelector(q).getBoundingClientRect().top; return y('#qtext') < y('#aipanel') && y('#aipanel') < y('.sumblk') && y('.sumblk') < y('#storyblk') && y('#storyblk') < y('.talkblk') && y('.talkblk') < y('.msgblk'); });
  ok(order && await page.locator('.aijump').count() === 1, 'record page: the recording first, then tonight\'s Claude panel and its boxes in the order they are used');
  ok(await page.locator('#aipanel .aistep').count() === 6 && await page.locator('#aiall').isDisabled() && (await page.textContent('#aiall')).includes('All done'), 'panel: six steps (no photos today), summary/story/questions already done → nothing for "do it all"');
  ok(!(await page.textContent('.talkblk')).includes('never photos') && (await page.locator('#aipanel .ainote').count()) === 1, 'panel: the privacy note lives once, behind ⓘ');
  await page.click('#aipanel [data-k="talk"]');
  ok(await page.locator('.talkblk.flash').count() === 1, 'evening link: three Claude buttons on top; a tap jumps to its block');
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
  { const b2 = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] }); const ctx2 = await b2.newContext({ viewport: { width: 390, height: 844 } }); await ctx2.addInitScript(() => localStorage.setItem('mbs_logall', '1')); const pg2 = await ctx2.newPage();
    await pg2.goto(BASE + '/'); await pg2.fill('#lcode', CODE); await pg2.keyboard.press('Enter'); await pg2.waitForSelector('.shelf');
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
    await pg2.goto(`${BASE}/#/t/${T}/log/1/ai`); await pg2.waitForSelector('#aipanel.flash');
    await pg2.click('#aipanel .aistep >> nth=0');
    ok(await pg2.locator('#aipanel .aistep').count() === 7 && (await pg2.locator('#aipanel .aistep').first().textContent()).includes('👀') && (await pg2.locator('#aipanel .aistep').first().textContent()).includes('3/3') && await pg2.locator('.phaiblk.flash').count() === 1, 'panel: on a day with photos, "Photos" is the first step (3/3 seen) and jumps to its box');
    // "do it all" on a fresh day: photos → summary → story → questions, one Claude call each, each saved where its own button saves it
    await put('/api/b/entries/q-allday-0001', { trip: T, day: 4, kind: 'quote', child: 'mimi', text: 'ม้าหมุนสีชมพู' });
    await fetch(`${BASE}/api/b/media/ph-all-0001?trip=${T}&day=4`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: await createRequire(import.meta.url)('sharp')({ create: { width: 900, height: 600, channels: 3, background: '#f59e0b' } }).jpeg().toBuffer() });
    await pg2.goto(`${BASE}/#/t/${T}/log/4`); await pg2.reload(); await pg2.waitForSelector('#aiall:not([disabled])');
    ok((await pg2.textContent('#aiall')).includes('4'), 'do it all: the button says it will use 4 Claude calls');
    const c0 = calls.length;
    await pg2.click('#aiall');
    await pg2.waitForFunction(() => { const b = document.querySelector('#aiall'); return b && b.disabled && !b.getAttribute('aria-busy') && /All done/.test(b.textContent); }, null, { timeout: 30000 });
    const st4 = await state(), e4 = (k) => st4.entries.some((e) => e.kind === k && e.day === 4);
    ok(calls.length === c0 + 4 && st4.media.find((m) => m.id === 'ph-all-0001').ai && e4('sum') && e4('story') && e4('talk'), `do it all: four calls in turn — photos seen, summary, story and questions saved (${calls.length - c0} calls)`);
    ok(calls.slice(c0).map((c) => (c.body.messages[0].content.some ? (c.body.messages[0].content.some((x) => x.type === 'image') ? 'photo' : 'text') : 'text')).join(',') === 'photo,text,text,text', 'do it all: the photos go first, so their captions feed the rest');
    ok(/(Photo|รูป): /.test(calls.at(-2).body.messages[0].content), 'do it all: the story is written with the photo captions among its facts');
    // a day of 13 photos: "do it all" sees them in two rounds of up to 12 (the button counts both), then the three text calls
    const sharp2 = createRequire(import.meta.url)('sharp');
    for (let k = 0; k < 13; k++) await fetch(`${BASE}/api/b/media/ph-many-${String(k).padStart(4, '0')}?trip=${T}&day=3&at=${Date.now() - (13 - k) * 60000}`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: await sharp2({ create: { width: 640, height: 480, channels: 3, background: `hsl(${k * 27},70%,55%)` } }).jpeg().toBuffer() });
    await pg2.goto(`${BASE}/#/t/${T}/log/3`); await pg2.reload(); await pg2.waitForSelector('#aiall:not([disabled])');
    ok((await pg2.textContent('#aiall')).includes('5'), `do it all: 13 unseen photos count as two calls, five in all (${(await pg2.textContent('#aiall')).trim()})`);
    const c1 = calls.length;
    await pg2.click('#aiall');
    await pg2.waitForFunction(() => { const b = document.querySelector('#aiall'); return b && b.disabled && !b.getAttribute('aria-busy') && /All done/.test(b.textContent); }, null, { timeout: 40000 });
    const imgs3 = calls.slice(c1).map((c) => (Array.isArray(c.body.messages[0].content) ? c.body.messages[0].content.filter((x) => x.type === 'image').length : 0));
    ok(calls.length === c1 + 5 && imgs3.join(',') === '12,1,0,0,0' && (await state()).media.filter((m) => m.day === 3 && m.ai).length === 13, `do it all: photos in rounds of 12 + 1, then summary, story, questions (${imgs3.join(',')})`);
    // the book's search finds photos by tag (its key, its Thai or English name), by caption and by place
    await pg2.goto(`${BASE}/#/t/${T}/search`); await pg2.waitForSelector('#bookq');
    await pg2.fill('#bookq', 'food'); await pg2.waitForSelector('.sphotos .mosaic button');
    ok(await pg2.locator('.sphotos [data-v="ph-ai-0002"]').count() === 1 && await pg2.locator('.sphotos [data-v="ph-ai-0001"]').count() === 0, 'search: a tag finds its photos (food → the dim sum photo only)');
    await pg2.fill('#bookq', 'อาหาร'); await pg2.waitForTimeout(200);
    ok(await pg2.locator('.sphotos [data-v="ph-ai-0002"]').count() === 1, 'search: the tag\'s Thai name finds it too');
    await pg2.fill('#bookq', 'ปราสาท'); await pg2.waitForTimeout(200);
    ok(await pg2.locator('.sphotos [data-v="ph-ai-0001"]').count() === 1, 'search: a word of the caption finds the photo');
    await pg2.locator('.sphotos [data-v="ph-ai-0001"]').click(); await pg2.waitForSelector('#lb:not([hidden]) .stage img');
    ok(true, 'search: a found photo opens in the photo viewer');
    await pg2.click('[data-lb="close"]');
    await pg2.goto(`${BASE}/#/t/${T}/book`); await pg2.waitForSelector('#d1 .phgrp');
    ok(await pg2.locator('#d1 .phgrp').count() === 2 && (await pg2.locator('#d1 .phgrp .label').first().textContent()).includes('Hong Kong Disneyland'), 'book: the day\'s photos grouped by stop, the placed ones first');
    await pg2.goto(`${BASE}/#/t/${T}`); await pg2.waitForSelector('.tile.t-photos');
    await pg2.click('.tile.t-photos'); await pg2.waitForSelector('#phtags');
    await pg2.click('#phtags [data-v="food"]');
    const nFood = (await state()).media.filter((m) => (m.tags || []).includes('food')).length;
    ok(nFood >= 1 && await pg2.locator('#phlist .mosaic button:visible').count() === nFood && await pg2.locator('#phlist [data-v="ph-ai-0001"]:visible').count() === 0 && await pg2.locator('#phtags [data-v="food"][aria-pressed="true"]').count() === 1, `photos by tag: the food chip shows exactly the ${nFood} food photos, in place`);
    await pg2.locator('#phlist .mosaic button:visible').first().click(); await pg2.waitForSelector('#lbtags');
    ok((await pg2.inputValue('#lbtags')).includes('food') && (await pg2.textContent('#lb .tags')).includes('🍜'), 'lightbox: tags and place shown and editable');
    await b2.close(); }
  // ---- a book from a PDF (#/import): a tiny PDF whose made-up "manual" has private-looking lines that must never reach the mock
  { const db = new Client({ connectionString: u.toString() }); await db.connect(); await db.query('UPDATE ai_usage SET calls=0'); await db.end(); }
  const pdfOf = (lines) => {   // the smallest PDF that pdftotext reads: one page, Helvetica, one line per Tj
    const content = `BT /F1 11 Tf 40 780 Td 13 TL ${lines.map((l) => `(${l.replace(/[()\\]/g, '\\$&')}) Tj T*`).join(' ')} ET`;
    const objs = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
      `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
    let out = '%PDF-1.4\n'; const offs = [];
    objs.forEach((o, i) => { offs.push(Buffer.byteLength(out)); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
    const xref = Buffer.byteLength(out);
    out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offs.map((o) => String(o).padStart(10, '0') + ' 00000 n \n').join('')}trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    return Buffer.from(out, 'latin1');
  };
  const FAKE = { pnr: 'ZZ9ZZ9', tripcom: '1111222233334444', eticket: '999-0000000001', hotel: '5555666677778888', baht: '12,345', ref: 'QX7KLM', conf: 'HB4471', resv: 'TQ9302' };   // invented values, not any real booking
  const manualLines = ['THE TEST HOP - Trip Operations Manual', 'Day 1 - Wed 10 Mar 2027 - Test Square, breakfast 09:00', 'Day 2 - Thu 11 Mar 2027 - Super Fun Zone opens 11:00',
    `Flights TG 123 - PNR ${FAKE.pnr} - Trip.com ${FAKE.tripcom} - e-tickets ${FAKE.eticket}`, `Hotel booking ${FAKE.hotel} - paid ${FAKE.baht} baht`, `Front desk: show booking ref ${FAKE.ref} at check-in`, `Ferry confirmation number ${FAKE.conf}`, `Dinner reservation code: ${FAKE.resv}`, 'Children: born 2023-06 - allergies none', 'Emergency 999 - Test Inn, 1 Test St - restaurants: Test Noodles MOP 50',
    ...Array.from({ length: 40 }, (_, i) => `Line ${i} of filler text so the manual is long enough to count as a real document with many words in it.`)];
  const pdf = pdfOf(manualLines);
  const IH = { 'x-mb': '1', cookie: ck, 'content-type': 'application/pdf' };
  ok((await fetch(BASE + '/api/b/import?slug=test-hop', { method: 'POST', headers: { ...IH, cookie: vck.split(';')[0] }, body: pdf })).status === 403, 'import: relatives cannot start one');
  ok((await fetch(BASE + '/api/b/import?slug=Bad Slug', { method: 'POST', headers: IH, body: pdf })).status === 400, 'import: a bad book id is refused');
  ok((await fetch(BASE + '/api/b/import?slug=hk-macau-2026', { method: 'POST', headers: IH, body: pdf })).status === 409, 'import: an existing book id is refused');
  ok((await fetch(BASE + '/api/b/import?slug=test-hop', { method: 'POST', headers: IH, body: Buffer.from('not a pdf at all '.repeat(200)) })).status === 400, 'import: not a PDF → 400');
  const st = await fetch(BASE + '/api/b/import?slug=test-hop', { method: 'POST', headers: IH, body: pdf });
  ok(st.status === 202 && (await st.json()).job, 'import: a PDF starts a job (202)');
  ok((await fetch(BASE + '/api/b/import?slug=test-hop-2', { method: 'POST', headers: IH, body: pdf })).status === 409, 'import: one job at a time (409 busy)');
  let imp;
  for (let i = 0; i < 120; i++) { imp = await (await fetch(BASE + '/api/b/import', { headers: { cookie: ck } })).json(); if (imp.job.status !== 'running') break; await new Promise((r) => setTimeout(r, 250)); }
  ok(imp.job.status === 'done' && imp.job.draft && imp.job.draft.slug === 'test-hop' && imp.job.draft.days === 2, `import: job done → a draft (${imp.job.status}: ${(imp.job.log || []).at(-1)})`);
  ok(importCalls.map((c) => c.step).join(',') === 'top,info,restlist,restareas,restnames,rest,rest,kids,kids,extras,thai', `import: the model calls in order — structure, guide, restaurant names, rows, the retry for the missing row, kids, extras, Thai (${importCalls.map((c) => c.step).join(',')})`);
  const sent = importCalls.map((c) => c.system + c.user).join('\n');
  ok(sent.includes('Test Square') && sent.includes('Super Fun Zone') && sent.includes('Test Noodles'), 'import: the manual\'s text reached the model');
  ok(!Object.values(FAKE).some((v) => sent.includes(v)) && !/born 2023|allergies/.test(sent), 'import: PNR, booking numbers and references, confirmation and reservation codes, e-tickets, the baht amount, birth and allergy lines never reached the model');
  ok(importCalls[1].system.includes('cache_control') && JSON.parse(importCalls[0].system)[1].text.startsWith('<manual>'), 'import: the manual rides as one cached system block');
  ok(imp.drafts.length === 1 && imp.drafts[0].slug === 'test-hop' && imp.drafts[0].days === 2 && typeof imp.drafts[0].cost.usd === 'number', 'import: the draft is listed with its size and cost');
  const d0 = imp.drafts[0] || {};
  ok(d0.seed === undefined && d0.cover && Array.isArray(d0.toc) && d0.toc.length === 2 && d0.peek && d0.peek.stops > 0 && d0.peek.restaurants > 0 && d0.peek.firsts >= 3 && d0.peek.words >= 3 && d0.peek.wild >= 1, `import: the list carries the cover, the contents and the peek counts, never the seed (${JSON.stringify(d0.peek)})`);
  const dr = await (await fetch(BASE + '/api/b/import/' + imp.drafts[0].id, { headers: { cookie: ck } })).json();
  ok(dr.seed && dr.seed.slug === 'test-hop' && dr.seed.days.length === 2 && dr.seed.days[1].plan[1].t === '11:00' && dr.seed.days[0].title.th === 'ไทย: Day 1 of the test' && dr.seed.days[0].tale.scenes.length === 1 && dr.seed.theme.art === '' && dr.seed.passport.guides[0].art === '/art/guides/kiki.svg', 'import: the seed has the days, the Thai, the kids\' pages, no drawn art and the generic guides');
  const rg = dr.seed.info.restaurants.groups;
  ok(rg.length === 2 && rg[0].items.map((x) => x.name).join(',') === 'Test Noodles,Test Dumplings' && rg[0].items[1].what && rg[0].items[1].what.th.startsWith('ไทย:') && rg[1].kind === 2 && rg[1].items[0].name === 'Test Tarts' && dr.seed.info.emergency[0].tel === '999', 'import: every listed restaurant has its row (the missing one came back on the retry), areas and kinds kept, pocket guide in the seed');
  const px = dr.seed.passport, fx = dr.seed.firsts_catalog;
  ok(dr.seed.info.wild.length === 2 && dr.seed.info.wild[1].emo === '🦀' && dr.seed.info.wildLabel.short.th === 'สัตว์', 'import: animals & friends to spot, with their label');
  ok(fx.length === 3 && fx.map((f) => f.key).join(',') === 'ferry,tram,tart', 'import: the trip\'s own firsts (a broken one and a duplicate key dropped)');
  const wl = px.lists.find((l) => l.key === 'words'), fl = px.lists.find((l) => l.key === 'food');
  ok(wl && wl.groups[0].items.length === 3 && wl.groups[0].items[0].speak.lang === 'en-GB' && fl && fl.groups[0].items.length === 3 && fl.goal === 2, 'import: say-it-like-a-local words (read aloud) and the tasting card');
  ok(px.map.sea.en === 'Test Sea' && px.map.stops.length === 2 && px.map.stops[1].x === 92 && px.map.stops[1].y === 8 && JSON.stringify(px.map.days) === '[["inn"],["square","inn"]]', 'import: the living map with clamped positions and only known stops per day');
  ok(dr.seed.info.stays[0].why.en === 'Close to everything' && dr.report.todo === 0, 'import: "why we chose it" filled, nothing left TODO');
  ok(dr.seed.info.guide.length === 1 && dr.seed.info.guide[0].title.en === 'Clocks' && !JSON.stringify(dr.seed).includes('KL4PQZ') && dr.report.warns.some((w) => /removed info\.guide\[1\] \(looked like a booking reference\)/.test(w)), `import: a guide card that looks like a booking reference is taken out and named, the book is kept (${JSON.stringify(dr.report.warns)})`);
  ok(dr.seed.days[0].moving.th === 'ไทย: Walk 5 min' && dr.seed.days[0].planned[0].th === 'ไทย: Test Square' && dr.seed.days[1].planned[0].th === 'ไทย: Test Square', 'import: a blank, a space or a null Thai from the model counts as missing and is translated');
  const sv = await fetch(BASE + '/api/b/import/' + imp.drafts[0].id + '/save', { method: 'POST', headers: H, body: '{}' });
  ok(sv.status === 200 && (await sv.json()).id === 'test-hop', 'import: saved as a book');
  const stt = await state(), nt = stt.trips.find((t) => t.id === 'test-hop');
  ok(nt && nt.source === 'manual' && nt.days.length === 2 && nt.days[1].plan.plan[1].en === 'Super Fun Zone opens' && nt.days[0].planned[0].th === 'ไทย: Test Square' && nt.days[1].planned[0].th === 'ไทย: Test Square' && nt.firsts.length === 3 && nt.firsts[0].key === 'ferry' && nt.passport.days.length === 2, 'import: the new book is in the state with its days, plans, its own firsts and passport');
  ok((await (await fetch(BASE + '/api/b/import', { headers: { cookie: ck } })).json()).drafts.length === 0, 'import: the draft is gone once saved');
  ok((await fetch(BASE + '/api/b/import?slug=test-hop', { method: 'POST', headers: IH, body: pdf })).status === 409, 'import: the saved book\'s id is now taken');
  const lite = (await (await fetch(BASE + '/api/b/state?lite=1', { headers: { cookie: ck } })).json()).trips.find((t) => t.id === 'test-hop');
  ok(lite && lite.seed && (await fetch(BASE + '/api/b/seed/test-hop/' + lite.seed, { headers: { cookie: ck } })).status === 200, 'import: the book\'s guide text is served by its hash');
  // ---- a child's own character from a photo (#/family, OpenAI): a refused try is free, three a year, the drawing is family-only
  { const sharp = createRequire(import.meta.url)('sharp');
    const photo = await sharp({ create: { width: 2400, height: 3200, channels: 3, background: '#8B5A2B' } }).jpeg().toBuffer();
    const draw = () => fetch(BASE + '/api/b/family/avatar/mimi', { method: 'POST', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: photo });
    const quota = async () => (await (await fetch(BASE + '/api/b/family/avatars', { headers: { cookie: ck } })).json());
    const noBirth = await draw();
    ok(noBirth.status === 400 && (await noBirth.json()).error === 'birth' && openaiCalls.length === 0, 'avatars: no drawing before the birth month is set (the character is drawn at the child\'s age)');
    const ym = (mAgo) => { const d = new Date(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() - mAgo); return d.toISOString().slice(0, 7); };
    const fam = await fetch(BASE + '/api/b/family', { method: 'PUT', headers: H, body: JSON.stringify({ profile: {}, children: [{ slug: 'mimi', name_th: 'มีมี่', name_en: 'Mimi', emoji: '👧', birth_ym: ym(42) }, { slug: 'mika', name_th: 'มีก้า', name_en: 'Mika', emoji: '👶', birth_ym: ym(18) }] }) });
    ok(fam.ok, 'avatars: the parents set the birth months');
    const q0 = await quota();
    ok(q0.on === true && q0.yearly === 3 && q0.left.mimi === 3 && q0.left.mika === 3, 'avatars: on with the OpenAI key, three a year for each child');
    const r0 = await draw();
    ok(r0.status === 502 && (await r0.json()).error === 'refused' && (await quota()).left.mimi === 3, 'avatars: a picture the safety system turns down says so and does not use a try');
    const c = openaiCalls[0], body = c.raw.toString('latin1');
    ok(c.headers.authorization === 'Bearer test-openai' && /multipart\/form-data/.test(c.headers['content-type']) && /name="model"\r\n\r\ngpt-image-1/.test(body) && /name="background"\r\n\r\ntransparent/.test(body) && /name="size"\r\n\r\n1024x1536/.test(body) && body.includes('Transparent background.') && body.includes('The child is 3 and a half years old: draw them at exactly that age'), 'avatars: one multipart call to the image model, transparent background, portrait, the child\'s age today');
    ok(c.raw.length < photo.length && c.raw.length < 2.5e6, 'avatars: the photo is shrunk to 1024 px before it leaves');
    const r1 = await draw(), j1 = await r1.json();
    ok(r1.ok && /^[0-9a-f]{12}$/.test(j1.avatar) && j1.left === 2, `avatars: drawn and used at once, two tries left (${JSON.stringify(j1)})`);
    const st = await (await fetch(BASE + '/api/b/state', { headers: { cookie: ck } })).json();
    ok(st.children.find((k) => k.slug === 'mimi').avatar === j1.avatar && st.features.avatar === true, 'avatars: the state carries the drawing id');
    const full = await fetch(BASE + `/media/kid/mimi/full.png?v=${j1.avatar}`, { headers: { cookie: ck } }), face = await fetch(BASE + '/media/kid/mimi/face.png', { headers: { cookie: ck } });
    const fm = await sharp(Buffer.from(await full.arrayBuffer())).metadata(), cm = await sharp(Buffer.from(await face.arrayBuffer())).metadata();
    ok(full.ok && full.headers.get('content-type') === 'image/png' && fm.hasAlpha && fm.height <= 900 && fm.width < 400 && cm.width === 256 && cm.height === 256, `avatars: a trimmed full figure with transparency and a 256 px face (${fm.width}×${fm.height})`);
    ok((await fetch(BASE + '/media/kid/mimi/full.png')).status === 401, 'avatars: never without signing in');
    const brand = await (await fetch(BASE + '/api/brand')).json();
    ok(brand.kids.find((k) => k.slug === 'mimi').a === 1 && !JSON.stringify(brand).includes(j1.avatar), 'avatars: the sign-in page only learns that a drawing exists, not where');
    const r2 = await draw(), j2 = await r2.json();
    ok(r2.ok && j2.left === 1 && j2.avatars.length === 2 && j2.avatars[0].id === j1.avatar && j2.avatars[1].id === j2.avatar && j2.avatars[1].age_m === 42 && /^\d{4}-\d{2}-\d{2}$/.test(j2.avatars[1].at), `avatars: every drawing is kept with its day and the age it was drawn at (${JSON.stringify(j2.avatars)})`);
    ok((await fetch(BASE + `/media/kid/mimi/full.png?v=${j1.avatar}`, { headers: { cookie: ck } })).ok && (await fetch(BASE + '/media/kid/mimi/full.png?v=deadbeef0000', { headers: { cookie: ck } })).ok, 'avatars: an older book still gets its own drawing; an id the child doesn\'t own falls back to the newest');
    const st2 = await (await fetch(BASE + '/api/b/state', { headers: { cookie: ck } })).json();
    ok(st2.children.find((k) => k.slug === 'mimi').avatars.length === 2 && st2.children.find((k) => k.slug === 'mimi').avatar === j2.avatar, 'avatars: the state carries the drawing history for each book to pick from');
    await draw();
    const r4 = await draw();
    ok(r4.status === 429 && (await r4.json()).left === 0 && openaiCalls.length === 4, 'avatars: the fourth try in a year is refused before any call');
    ok((await fetch(BASE + '/api/b/family/avatar/mimi', { method: 'DELETE', headers: { 'x-mb': '1', cookie: ck } })).ok && (await fetch(BASE + '/media/kid/mimi/full.png', { headers: { cookie: ck } })).status === 404 && (await fetch(BASE + `/media/kid/mimi/full.png?v=${j1.avatar}`, { headers: { cookie: ck } })).status === 404 && (await quota()).left.mimi === 0, 'avatars: back to the plain drawing — every drawing goes; the tries used stay used');
    ok((await fetch(BASE + '/api/b/family/avatar/nobody', { method: 'POST', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: photo })).status === 404, 'avatars: only for a child of this family');
  }
  await browser.close();
} finally {
  srv.kill(); await new Promise((r) => srv.on('exit', r)); mock.close();
  fs.rmSync(data, { recursive: true, force: true });
  await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`); await admin.end();
}
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
