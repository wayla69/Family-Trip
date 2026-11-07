'use strict';
// A book from a Trip Operations Manual PDF, inside the app (editors only; needs ANTHROPIC_API_KEY):
//   1. pdftotext on the server (poppler-utils in the image) — the PDF is deleted the moment its text is out;
//   2. redaction HERE, before anything leaves: lines with e-tickets, PNR/booking numbers, passport/birth/policy details are dropped,
//      long numbers, e-mails, baht amounts and blank form fields are masked;
//   3. the extract model (IMPORT_EXTRACT_MODEL, default claude-haiku-5-5) writes the plan's structure in English — days, pocket guide,
//      restaurants — with the redacted manual as one cached system block shared by its three calls;
//   4. the write model (IMPORT_WRITE_MODEL, default STORY_MODEL / claude-sonnet-5-5) writes the kids' pages bilingually and
//      translates every English string to Thai (only the Thai comes back, in batches);
//   5. scripts/lib/plan-to-seed-core.mjs builds the seed (every default filled, no drawn art) and runs the privacy scan.
// Text only: the PDF file and its images are never sent. The result is a draft (table book_drafts) the parents review and save.
// Also the engine of scripts/import-pdf.mjs. Each model call goes through the family's daily cap (take) and usage hook.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFile } = require('node:child_process');
const core = require('../scripts/lib/plan-to-seed-core.mjs');   // ESM via require (Node ≥ 22.12), like archiver 8
const ROOT = path.resolve(__dirname, '..');

const EXTRACT = () => process.env.IMPORT_EXTRACT_MODEL || 'claude-haiku-5-5';
const WRITE = () => process.env.IMPORT_WRITE_MODEL || process.env.STORY_MODEL || 'claude-sonnet-5-5';

// ---------- 1. text out of the PDF (pdftotext keeps the column layout; the file is removed right after)
function pdfText(buf, dir) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(dir, { recursive: true });
    const f = path.join(dir, `import-${crypto.randomBytes(6).toString('hex')}.pdf`);
    fs.writeFileSync(f, buf);
    execFile('pdftotext', ['-layout', f, '-'], { maxBuffer: 64 << 20 }, (err, out) => {
      fs.rm(f, { force: true }, () => {});
      if (err) return reject(Object.assign(new Error(err.code === 'ENOENT' ? 'pdftotext' : 'pdf'), { code: err.code === 'ENOENT' ? 'pdftotext' : 'pdf' }));
      resolve(out.toString('utf8'));
    });
  });
}

// ---------- 2. redact before anything leaves this machine
// a line naming a booking / reservation / confirmation / ticket / itinerary reference, a record locator or a policy never leaves the server
// (the same words the seed's privacy scan looks for: a live import once carried "booking ref …" this far and was thrown away at the end)
const DROP_LINE = /\b(e-?tickets?|PNR|booking no|confirmation no|booking record|policy|passport no|born|allergies|record locator)\b|\b(booking|reservation|confirmation|conf\.?|ticket|itinerary)\s*(ref(erence)?|no\.?|number|code|#|id)\b|\bbooking\s+\d|\bref(erence)?\b\s*(no\.?|number|code|#)?\s*[:#]?\s*(?=[A-Z0-9]*\d)[A-Z0-9]{5,}\b|Trip\.com\s+\d|เลขจอง|เลขยืนยัน|เลขที่จอง|หมายเลขการจอง|รหัสจอง|รหัสยืนยัน|รหัสอ้างอิง/i;
const SUB = [
  [/\b\d{3}-\d{10}\b/g, '[e-ticket]'],
  [/\b\d{9,}\b/g, '[number]'],
  [/\b[A-Z]{1,2}\d{7}\b/g, '[passport]'],
  [/[\w.+-]+@[\w-]+\.[a-z]{2,}/gi, '[e-mail]'],
  [/฿\s?[\d,]+(?:\.\d+)?|\bTHB\s?[\d,]+/g, '[baht]'],
  [/\b\d[\d,]*(?:\.\d+)?\s?(?:baht|บาท)/gi, '[baht]'],
  [/_{4,}/g, ''],
];
function redact(raw) {
  let dropped = 0, masked = 0;
  const text = raw.split('\n').filter((l) => { if (DROP_LINE.test(l)) { dropped++; return false; } return true; }).map((l) => {
    let s = l; for (const [re, rep] of SUB) s = s.replace(re, () => { masked++; return rep; }); return s.replace(/[ \t]{2,}/g, '  ').trimEnd();
  }).join('\n').replace(/\n{3,}/g, '\n\n');
  return { text, dropped, masked };
}

// ---------- prices (USD per million tokens) only to show an estimate on the draft — never used for anything else
const PRICE = {
  'claude-haiku-5-5': (p) => (p <= 100000 ? [0.10, 0.50] : [0.50, 2.50]),
  'claude-sonnet-5-5': () => [2, 10], 'claude-sonnet-5': () => [2, 10],
  'claude-opus-5-5': () => [4, 20], 'claude-opus-5': () => [5, 25],
  'claude-fable-5-1': () => [10, 50],
};
const READ = { 'claude-opus-5-5': 0.05, 'claude-fable-5-1': 0.025 };
function usd(model, u) {
  const p = PRICE[model]; if (!p) return null;
  const prompt = (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
  const [pin, pout] = p(prompt);
  return ((u.input_tokens || 0) * pin + (u.cache_creation_input_tokens || 0) * pin * 1.25 + (u.cache_read_input_tokens || 0) * pin * (READ[model] || 0.1) + (u.output_tokens || 0) * pout) / 1e6;
}

const parseJSON = (s) => {
  const t = s.replace(/^```(?:json)?\s*/m, '').replace(/```\s*$/m, '').trim();
  const a = Math.min(...['{', '['].map((c) => { const i = t.indexOf(c); return i < 0 ? Infinity : i; }));
  if (!isFinite(a)) throw Object.assign(new Error('no JSON in the answer'), { code: 'json' });
  try { return JSON.parse(t.slice(a)); } catch (e) { throw Object.assign(new Error(`unreadable JSON: ${e.message}`), { code: 'json' }); }
};
let schema = null;
const SCHEMA = () => (schema = schema || JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/handoff/plan.schema.json'), 'utf8')));
const SAMPLE = () => fs.readFileSync(path.join(ROOT, 'docs/handoff/plan.sample.json'), 'utf8');
const RULES = 'Copy times, names, prices, hours, phone numbers and addresses exactly as the manual writes them; never invent one. '
  + 'Leave out anything private: booking references, confirmation numbers, e-tickets, passport numbers, what the family paid in baht, e-mails, personal phone numbers, travellers\' full names. '
  + 'Masked values like [number] were removed on purpose — never guess them. Answer with JSON only, no prose, no code fence.';
const EN_ONLY = 'Wherever the schema asks for an {th, en} object, write {"en": "…"} only — the Thai is added later.';

// ---------- 3–5. the import itself. client = an Anthropic SDK instance; take() = the daily cap (false → stop); log(line) = progress
async function run({ buf, slug, client, take, onUsage, log = () => {}, dir, kids }) {
  const raw = await pdfText(buf, dir);
  if (raw.replace(/\s+/g, '').length < 2000) throw Object.assign(new Error('too little text (a scanned PDF?)'), { code: 'text' });
  const { text, dropped, masked } = redact(raw);
  log(`text ${raw.length} chars → ${text.length} after redaction (${dropped} lines dropped, ${masked} values masked)`);
  const ledger = [];
  const manualBlock = { type: 'text', text: `<manual>\n${text}\n</manual>`, cache_control: { type: 'ephemeral' } };
  // a model call; an answer that isn't readable JSON (a missing comma killed a live import) is asked once more before giving up
  async function ask(step, model, opts) {
    try { return await askOnce(step, model, opts); } catch (e) {
      if (e.code !== 'json') throw e;
      log(`${step}: ${e.message} — asking once more`);
      return askOnce(`${step} (again)`, model, opts);
    }
  }
  async function askOnce(step, model, { system, user, max = 32000, effort = 'low', manual = true }) {
    if (take && !(await take())) throw Object.assign(new Error('limit'), { code: 'limit' });
    const t0 = Date.now();
    const stream = client.messages.stream({
      model, max_tokens: max, output_config: { effort },
      system: manual ? [{ type: 'text', text: system }, manualBlock] : system,
      messages: [{ role: 'user', content: user }],
    });
    const msg = await stream.finalMessage();
    const u = msg.usage || {};
    if (onUsage) { try { onUsage(u); } catch (_) { /* counting never breaks an import */ } }
    const c = usd(model, u);
    ledger.push({ step, model, in: u.input_tokens || 0, cw: u.cache_creation_input_tokens || 0, cr: u.cache_read_input_tokens || 0, out: u.output_tokens || 0, usd: c, s: Math.round((Date.now() - t0) / 1000) });
    log(`${step}: ${model} · in ${u.input_tokens || 0} · cache ${u.cache_creation_input_tokens || 0}/${u.cache_read_input_tokens || 0} · out ${u.output_tokens || 0}${c === null ? '' : ` · $${c.toFixed(3)}`} · ${Math.round((Date.now() - t0) / 1000)} s`);
    if (msg.stop_reason === 'refusal') throw Object.assign(new Error(`${step}: refused`), { code: 'refusal' });
    if (msg.stop_reason === 'max_tokens') throw Object.assign(new Error(`${step}: answer too long`), { code: 'long' });
    return parseJSON(msg.content.filter((b) => b.type === 'text').map((b) => b.text).join(''));
  }
  const S = SCHEMA();
  const sys = `You turn a family's Trip Operations Manual into the plan.json of a memory-book app. ${RULES}`;
  const top = await ask('structure', EXTRACT(), {
    system: sys,
    user: `Write the plan's top level and its days from the manual: {slug, title, sub, from, to, tz, place, places, kicker, display, emoji, days}. `
      + `slug = "${slug}". One day per date from the first to the last day. For each day fill title, sleep, wx, planned (every stop, with a FULL Google Maps query q and a local-script name zh when the manual gives one), moving, pick, planB, money (prices only), plan (the timeline: t = HH:MM; h = the step's headline for the trip itself — one emoji, then at most 6 short, fun, concrete words a parent reads at a glance, never a bare noun list ("🏰 Off to Disneyland!", "🌉 Golden bus over the sea"); en = every detail of the step, ' · ' between the pieces, opened with a tap), tips (include the "show the driver" names), legs (every move with from/to/by/min), picks (each meal: the pick, with alt = the backup), stay {name, addr, q}. `
      + `Day item schema: ${JSON.stringify(S.properties.days.items)}\nExample of a whole plan (format only): ${SAMPLE()}\n${EN_ONLY}`,
    max: 48000,
  });
  const info = await ask('info', EXTRACT(), {
    system: sys,
    user: `Write the pocket guide "info" from the manual's chapters (key facts → guide; where we sleep → stays; emergency card → emergency + lost; prices/attractions → prices; packing → pack; entry & documents → visa as {lede, groups:[{title, items}]}; contingency plans → ifthen as {plans:{head, cols, rows}}; anything else worth keeping, e.g. getting around, customs, a park touring plan → more). Schema: ${JSON.stringify(S.properties.info)}\n${EN_ONLY}`,
    max: 48000,
  });
  // restaurants in two passes, so a long guide (200+ places) comes through complete: first every name by area (cheap), then the
  // rows for 25 names at a time (halved again when an answer runs too long); names still missing after that are asked for once more
  const restSchema = JSON.stringify(S.properties.restaurants);
  // every name by area in one answer; a guide too long for one answer (it happened live) is asked again as the area headings, then the names four areas at a time
  const normA = (x) => String((x && (x.en || x)) || '').toLowerCase().replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
  let index;
  try {
    index = await ask('restaurants: list', EXTRACT(), {
      system: sys,
      user: 'List EVERY restaurant, café, food court, bakery, dessert shop and snack stall in the manual\'s restaurant guide (and its "where to eat" pages), grouped by the manual\'s own area headings in order. Return {"areas":[{"area":{"en":"…"},"kind":0|1|2,"names":["…", …]}]} — kind 0 restaurants · 1 food courts and quick bites · 2 cafés and sweets. Names exactly as the manual writes them, one entry per place, none left out, no details yet.',
      max: 32000,
    });
  } catch (e) {
    if (e.code !== 'long') throw e;
    log('restaurants: the list ran too long — asking for the area headings, then the names a few areas at a time');
    const heads = await ask('restaurants: areas', EXTRACT(), {
      system: sys,
      user: 'List only the area headings of the manual\'s restaurant guide (and its "where to eat" pages), in order. Return {"areas":[{"area":{"en":"…"},"kind":0|1|2}]} — kind 0 restaurants · 1 food courts and quick bites · 2 cafés and sweets. No place names.',
      max: 8000,
    });
    const hs = (heads && Array.isArray(heads.areas) ? heads.areas : []).filter((h) => h && h.area);
    index = { areas: [] };
    for (let i = 0; i < hs.length; i += 4) {
      const part = hs.slice(i, i + 4);
      const got = await ask(`restaurants: names ${i / 4 + 1}/${Math.ceil(hs.length / 4)}`, EXTRACT(), {
        system: sys,
        user: `For these areas of the manual's restaurant guide, list EVERY place under each, names exactly as the manual writes them, one entry per place, none left out, no details. Areas: ${JSON.stringify(part.map((h) => (h.area && (h.area.en || h.area)) || ''))}. Return {"areas":[{"area":{"en":"…"},"names":["…"]}]} in the same order.`,
        max: 16000,
      });
      const byArea = new Map(((got && Array.isArray(got.areas)) ? got.areas : []).filter((g) => g && Array.isArray(g.names)).map((g) => [normA(g.area), g.names]));
      for (const h of part) index.areas.push({ area: h.area, kind: h.kind, names: byArea.get(normA(h.area)) || [] });
    }
  }
  const areas = (index && Array.isArray(index.areas) ? index.areas : []).filter((a) => a && Array.isArray(a.names) && a.names.length);
  const wanted = areas.flatMap((a) => a.names.map((n) => String(n).trim()).filter(Boolean));
  log(`restaurants: ${wanted.length} names in ${areas.length} areas`);
  const rows = new Map();
  const norm = (n) => String(n || '').toLowerCase().replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
  // an answer that outgrows the output window (a 290-place guide did, at 40 rows a call) is asked again in halves, never given up on
  const fetchRows = async (names, step) => {
    let got;
    try { got = await askRows(names, step); } catch (e) {
      if (e.code !== 'long' || names.length < 6) throw e;
      const h = Math.ceil(names.length / 2); log(`${step}: answer too long, asking in two halves`);
      await fetchRows(names.slice(0, h), `${step}a`); await fetchRows(names.slice(h), `${step}b`); return;
    }
    for (const it of (got && Array.isArray(got.items) ? got.items : [])) if (it && it.name) rows.set(norm(it.name), it);
  };
  const askRows = (names, step) => ask(step, EXTRACT(), {
      system: sys,
      user: `For each of these places, in this order, write its row from the manual: {"items":[{"name", "zh" (local name), "what" ({en}: food · famous for), "why" ({en}: why for us), "where" ({en}), "pr" (budget), "hours", "q" (full Google Maps query), "pick" (["<Day n> · <Meal>" labels when the manual ties it to a day's meal)}]}. Item schema: ${JSON.stringify(S.properties.restaurants.properties.groups.items.properties.items.items)}\nPlaces: ${JSON.stringify(names)}\n${EN_ONLY}`,
      max: 32000,
    });
  const BATCH_R = 25;
  for (let i = 0; i < wanted.length; i += BATCH_R) await fetchRows(wanted.slice(i, i + BATCH_R), `restaurants ${Math.floor(i / BATCH_R) + 1}/${Math.ceil(wanted.length / BATCH_R)}`);
  const missing = wanted.filter((n) => !rows.has(norm(n)));
  if (missing.length) { log(`restaurants: ${missing.length} rows missing, asking once more`); await fetchRows(missing.slice(0, BATCH_R), 'restaurants: retry'); }
  const rest = wanted.length ? {
    lede: { en: 'Everything within an easy ride of where we sleep. Budget = a typical meal per adult, service included; the children share or eat for less. Hours change — check the day before.' },
    kinds: [{ en: 'Restaurants' }, { en: 'Food courts & quick bites' }, { en: 'Cafés & sweets' }],
    groups: areas.map((a) => ({ area: { en: String((a.area && (a.area.en || a.area)) || 'Places to eat') }, kind: [0, 1, 2].includes(a.kind) ? a.kind : 0,
      items: a.names.map((n) => rows.get(norm(n)) || { name: String(n) }).map((it) => ({ ...it, name: String(it.name).slice(0, 120) })) })),
  } : null;
  log(`restaurants: ${rows.size} of ${wanted.length} rows written`);
  if (!top || !Array.isArray(top.days) || !top.days.length) throw Object.assign(new Error('no days found'), { code: 'days' });
  top.slug = slug;
  const who = kids && kids.length ? kids.map((k) => `${k.name_en} (${k.age})`).join(' and ') : 'Mimi (3, a girl) and Mika (1½, a boy)';
  const brief = top.days.map((d, i) => ({ i, title: d.title, plan: d.plan, planned: (d.planned || []).map((p) => p.en || p.name), pick: d.pick }));
  const kidsOut = await ask('kids', WRITE(), {
    system: `You write the children's pages of a family memory book. The children: ${who}. Write warm, simple, true sentences a small child enjoys hearing; every text bilingual {"th": "…", "en": "…"} with natural Thai for a Thai family (not a word-for-word translation). Only facts that are true and that the day really includes. Answer with JSON only, no code fence.`,
    user: `For each day below write: learn (2–3 cards: name, facts[2], kid), quiz (3: q, a), mission {title, stamp (short CAPITALS), facts[3], spot[4] {k, e (emoji), th, en}}, tale {th, en, scenes:[4–5 × {e, h:{th,en}, th, en}]} — the guide's story of the day, the scenes cut from the same words. Return {"days":[{learn, quiz, mission, tale}, …]} in day order.\nDays: ${JSON.stringify(brief)}`,
    max: 48000, effort: 'medium', manual: false,
  });

  // every English string → Thai (only the Thai comes back: cheaper than re-writing the JSON)
  // the trip's own extras in one call: animals & friends to spot, the trip's firsts, local words (read aloud), a tasting card,
  // the living map and why we chose each stay — the parts a hand-made book has and a plain extraction does not
  const stayNames = [...new Set(top.days.map((d) => d.stay && d.stay.name).filter(Boolean))];
  const placeEn = (top.place && top.place.en) || '';
  const extras = await ask('extras', WRITE(), {
    system: `You add the playful pages of a family memory book for a trip to ${placeEn}. The children: ${who}. Every text bilingual {"th": "…", "en": "…"} in natural Thai. Only things that are true of this trip and this place; keep them simple and concrete. Answer with JSON only, no code fence.`,
    user: `From this trip brief write:
"wild": 6–10 animals, birds, sea creatures or famous characters the children may really meet on this trip (each {name:{th,en}, emo, text:{th,en} — two or three friendly sentences and where to look}); "wildLabel": {emo, title:{th,en}, short:{th,en}} (e.g. "Animals and friends we may meet");
"firsts": 8–12 real possible "firsts" of this trip for a small child ({key (a-z), emoji, label:{th,en}} — e.g. a ferry, a tram, snow, a temple), ordered by the days;
"words": 6–10 say-it-like-a-local words of the place's language ({k (a-z), e, th, en = how to say it in Latin letters, note:{th,en} = meaning, say = a playful English line using it, speak:{text = in the local script, lang = BCP-47 like zh-HK / ja-JP}});
"food": 6–10 local foods the children can try ({k, e, th, en, note:{th,en}});
"map": the living map: {sea:{th,en} = the sea/ocean's name, stops: 5–8 of the trip's main places ({k (a-z), e, th, en, q = Google Maps query, x, y = percent positions 8–92 laid out roughly like the real geography}), days: for each day the stop keys visited that day};
"stays": [{name, why:{th,en} — one warm sentence on why this stay suits the family}] for: ${JSON.stringify(stayNames)}.
Trip: ${JSON.stringify({ title: top.title, place: top.place, from: top.from, to: top.to, days: brief })}`,
    max: 24000, effort: 'medium', manual: false,
  });
  const plan = { ...top, info: info || {}, ...(rest && rest.groups ? { restaurants: rest } : {}) };
  const asI18n = (x) => (x && typeof x === 'object' && typeof x.en === 'string' ? { th: typeof x.th === 'string' ? x.th : x.en, en: x.en } : null);
  const keyOf = (k, i) => (String(k || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `x${i + 1}`);
  if (extras && typeof extras === 'object') {
    const E = extras;
    const wild = (Array.isArray(E.wild) ? E.wild : []).map((w) => (w && asI18n(w.name) && asI18n(w.text) ? { name: asI18n(w.name), emo: String(w.emo || '🐾').slice(0, 8), text: asI18n(w.text) } : null)).filter(Boolean).slice(0, 12);
    if (wild.length) { plan.info.wild = wild; if (E.wildLabel && asI18n(E.wildLabel.title)) plan.info.wildLabel = { emo: String(E.wildLabel.emo || '🐾').slice(0, 8), title: asI18n(E.wildLabel.title), short: asI18n(E.wildLabel.short) || asI18n(E.wildLabel.title) }; }
    const seen = new Set();
    const firsts = (Array.isArray(E.firsts) ? E.firsts : []).map((f, i) => (f && asI18n(f.label) ? { key: keyOf(f.key, i), emoji: String(f.emoji || '⭐').slice(0, 8), label: asI18n(f.label) } : null)).filter((f) => f && !seen.has(f.key) && seen.add(f.key)).slice(0, 14);
    if (firsts.length >= 3) plan.firsts = firsts;
    const pp = plan.passport = plan.passport || {};
    const words = (Array.isArray(E.words) ? E.words : []).map((w, i) => (w && w.en && w.th ? { k: keyOf(w.k, i), e: String(w.e || '💬').slice(0, 8), th: String(w.th), en: String(w.en), ...(asI18n(w.note) ? { note: asI18n(w.note) } : {}), ...(w.say ? { say: String(w.say) } : {}), ...(w.speak && w.speak.text ? { speak: { text: String(w.speak.text), lang: String(w.speak.lang || 'en') } } : {}) } : null)).filter(Boolean).slice(0, 12);
    if (words.length >= 3) pp.words = words;
    const food = (Array.isArray(E.food) ? E.food : []).map((f, i) => (f && f.en && f.th ? { k: keyOf(f.k, i), e: String(f.e || '🍽️').slice(0, 8), th: String(f.th), en: String(f.en), ...(asI18n(f.note) ? { note: asI18n(f.note) } : {}) } : null)).filter(Boolean).slice(0, 12);
    if (food.length >= 3) pp.food = food;
    const M = E.map || {};
    const stops = (Array.isArray(M.stops) ? M.stops : []).map((st, i) => (st && st.en && st.th ? { k: keyOf(st.k, i), e: String(st.e || '📍').slice(0, 8), th: String(st.th), en: String(st.en), x: Math.min(92, Math.max(8, Number(st.x) || 50)), y: Math.min(92, Math.max(8, Number(st.y) || 50)), q: String(st.q || st.en) } : null)).filter(Boolean).slice(0, 10);
    if (stops.length >= 2 && asI18n(M.sea)) {
      const keys = new Set(stops.map((st) => st.k));
      pp.map = { sea: asI18n(M.sea), stops, days: top.days.map((_, i) => ((Array.isArray(M.days) && Array.isArray(M.days[i]) ? M.days[i] : []).map((k, j) => keyOf(k, j)).filter((k) => keys.has(k)))) };
    }
    const whys = new Map((Array.isArray(E.stays) ? E.stays : []).filter((s2) => s2 && s2.name && asI18n(s2.why)).map((s2) => [norm(s2.name), asI18n(s2.why)]));
    if (whys.size) { plan.info.stays = (Array.isArray(plan.info.stays) ? plan.info.stays : []); for (const st of plan.info.stays) { const w = st.prop && whys.get(norm(st.prop.en || st.prop)); if (w && (!st.why || !st.why.en)) st.why = w; } plan.staysWhy = (Array.isArray(E.stays) ? E.stays : []).filter((s2) => s2 && s2.name && asI18n(s2.why)).map((s2) => ({ name: String(s2.name), why: asI18n(s2.why) })); }
    log(`extras: ${wild.length} animals & friends · ${firsts.length} firsts · ${words.length} words · ${food.length} foods · map ${stops.length} stops · ${whys.size} stays' why`);
  }
  // every text that has English but no usable Thai yet — the models sometimes send "th": "" or null, which counts as missing
  const holes = [];
  (function walk(v) {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') {
      if (typeof v.en === 'string' && v.en.trim() && !(typeof v.th === 'string' && v.th.trim())) holes.push(v);
      for (const x of Object.values(v)) if (x && typeof x === 'object') walk(x);
    }
  })(plan);
  const BATCH = 350;
  const thaiBatch = async (part, step) => {
    const th = await ask(step, WRITE(), {
      system: 'You translate a family trip guide from English into natural Thai for Thai parents. Keep times, prices and numbers as written. Never translate a proper name word by word (a bus line, a hotel, an attraction, a place): keep it in Latin script, or in a short headline write it the way Thais say it (Golden Bus → โกลเด้นบัส, Luna Park → ลูน่าพาร์ค, Scenic World → ซีนิกเวิลด์). Short and clear; a timeline headline (one emoji + a few words) stays as short and as fun in Thai. Answer with a JSON array of strings only — the same length and order as the input.',
      user: JSON.stringify(part.map((h) => h.en)),
      max: 32000, manual: false,
    });
    if (!Array.isArray(th) || th.length !== part.length) throw Object.assign(new Error(`${step}: ${th && th.length} strings for ${part.length}`), { code: 'thai' });
    part.forEach((h, i) => { h.th = String(th[i]); });
  };
  for (let b = 0; b < holes.length; b += BATCH) {
    const part = holes.slice(b, b + BATCH), step = `thai ${b / BATCH + 1}/${Math.ceil(holes.length / BATCH)}`;
    // a batch that comes back the wrong length (or too long) is asked once more in halves; what still fails keeps its English, never the whole book
    try { await thaiBatch(part, step); } catch (e) {
      if (!['thai', 'long', 'json'].includes(e.code)) throw e;
      log(`${step}: ${e.message} — asking again in halves`);
      const h = Math.ceil(part.length / 2);
      for (const [half, tag] of [[part.slice(0, h), 'a'], [part.slice(h), 'b']]) { try { await thaiBatch(half, step + tag); } catch (e2) { if (!['thai', 'long', 'json'].includes(e2.code)) throw e2; } }
    }
  }
  // whatever has no Thai after all that stays readable in English rather than failing the import after every call was paid for
  const left = holes.filter((h) => !(typeof h.th === 'string' && h.th.trim()));
  for (const h of left) h.th = h.en;
  if (left.length) log(`thai: ${left.length} texts kept in English (no translation came back)`);
  plan.days.forEach((d, i) => Object.assign(d, ((kidsOut && kidsOut.days) || [])[i] || {}));

  // plan → seed (no drawn art: an imported book keeps its colours and the generic guides) + the privacy scan
  const v = core.validate(plan);
  if (v.errs.length) throw Object.assign(new Error(`plan: ${v.errs.slice(0, 3).join('; ')}`), { code: 'plan', errs: v.errs });
  const notes = [];
  const seed = core.toSeed(plan, notes, { art: false });
  // the privacy scan: an item that trips it (a guide card, a timeline row, a fact — any entry of a list below the days) is taken out
  // and named in the warnings, rather than throwing away a whole book whose calls were already paid for; a hit anywhere else still fails
  let { hits, warns: soft } = core.scan(seed);
  const removed = [];
  if (hits.length) {
    const drops = new Map();
    for (const h of hits) {
      const toks = [...h.at.matchAll(/([^.[\]]+)|\[(\d+)\]/g)].map((m) => (m[2] !== undefined ? Number(m[2]) : m[1]));
      const last = toks.map((t, i) => (typeof t === 'number' ? i : -1)).filter((i) => i >= 0).pop();
      if (last === undefined || (last === 1 && toks[0] === 'days')) continue;   // not inside a list, or a whole day: leave it to fail below
      const key = toks.slice(0, last + 1).join('/');
      if (!drops.has(key)) drops.set(key, { toks: toks.slice(0, last + 1), why: h.rule });
    }
    // deepest and latest first, so removing one never shifts another
    for (const { toks, why } of [...drops.values()].sort((a, b) => b.toks.length - a.toks.length || String(b.toks).localeCompare(String(a.toks), undefined, { numeric: true }))) {
      let o = seed; for (const t of toks.slice(0, -1)) o = o && o[t];
      if (Array.isArray(o) && toks[toks.length - 1] < o.length) { o.splice(toks[toks.length - 1], 1); removed.push(`removed ${toks.map((t) => (typeof t === 'number' ? `[${t}]` : `.${t}`)).join('').replace(/^\./, '')} (looked like a ${why})`); }
    }
    ({ hits, warns: soft } = core.scan(seed));
  }
  if (hits.length) throw Object.assign(new Error(`privacy: ${hits.map((h) => `${h.rule} at ${h.at}`).slice(0, 5).join('; ')}`), { code: 'privacy' });
  if (removed.length) log(`privacy: ${removed.length} item(s) taken out`);
  const { errs, warns } = core.sanity(seed, { art: false });
  if (errs.length) throw Object.assign(new Error(`seed: ${errs.join('; ')}`), { code: 'seed', errs });
  const cost = ledger.reduce((a, r) => a + (r.usd || 0), 0);
  const report = { lines: core.report(seed).split('\n').map((l) => l.trim()), warns: [...v.warns, ...warns, ...soft.map((w) => `${w.rule} at ${w.at}`), ...(left.length ? [`${left.length} texts have no Thai yet (kept in English)`] : []), ...removed], notes, todo: core.todos(seed), dropped, masked };
  log(`seed: ${report.lines[0]}`);
  return { seed, plan, report, cost: { usd: ledger.some((r) => r.usd === null) ? null : cost, calls: ledger } };
}

module.exports = { run, redact, pdfText, EXTRACT, WRITE };
