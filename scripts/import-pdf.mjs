#!/usr/bin/env node
// Trial: Trip Operations Manual PDF → plan.json → seed, with Claude — and what it costs.
//   node scripts/import-pdf.mjs <manual.pdf> --out=<dir> [--slug=x] [--extract=claude-haiku-5-5] [--write=claude-sonnet-5-5] [--thb=35] [--dry]
// Steps: (1) pdftotext on this machine, (2) redact private lines HERE before anything leaves (e-tickets, PNR/booking lines, long
// numbers, passport/birth/policy lines, e-mails, costs in baht, blank form lines), (3) the extract model turns the redacted text into
// the plan's structure in English (days; pocket guide; restaurants), (4) the write model adds the kids' pages (learn, quiz, mission,
// tale — bilingual) and translates every English string to Thai, (5) scripts/plan-to-seed.mjs builds the seed in --out with its own
// privacy scan. Prints the tokens and cost of every call. Text only — the PDF itself and its images are never sent.
// --dry stops after step 2: writes the redacted text to --out so you can read exactly what would be sent, no API call.
// Needs ANTHROPIC_API_KEY (or a proxy that injects it). Never write the output into server/seeds by hand from here: review it first.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flags = Object.fromEntries(argv.filter((a) => a.startsWith('--')).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return [m[1], m[2] === undefined ? true : m[2]]; }));
const pdf = argv.find((a) => !a.startsWith('--'));
if (!pdf || !flags.out) { console.error('usage: node scripts/import-pdf.mjs <manual.pdf> --out=<dir> [--slug=x] [--extract=model] [--write=model] [--thb=35] [--dry]'); process.exit(1); }
const OUT = path.resolve(flags.out);
if (OUT.startsWith(path.join(root, 'server'))) { console.error('--out must not be inside server/ — review the result before it becomes a seed'); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });
const EXTRACT = flags.extract || 'claude-haiku-5-5';
const WRITE = flags.write || 'claude-sonnet-5-5';
const THB = Number(flags.thb || 35);

// ---------- 1. text
const raw = execFileSync('pdftotext', ['-layout', pdf, '-'], { maxBuffer: 64 << 20 }).toString('utf8');

// ---------- 2. redact before anything leaves this machine
const DROP_LINE = /\b(e-?tickets?|PNR|booking no|confirmation no|booking record|policy|passport no|born|allergies)\b|Trip\.com\s+\d|เลขจอง|เลขยืนยัน/i;
const SUB = [
  [/\b\d{3}-\d{10}\b/g, '[e-ticket]'],
  [/\b\d{9,}\b/g, '[number]'],
  [/\b[A-Z]{1,2}\d{7}\b/g, '[passport]'],
  [/[\w.+-]+@[\w-]+\.[a-z]{2,}/gi, '[e-mail]'],
  [/฿\s?[\d,]+(?:\.\d+)?|\bTHB\s?[\d,]+/g, '[baht]'],
  [/_{4,}/g, ''],
];
let dropped = 0, subs = 0;
const kept = raw.split('\n').filter((l) => { if (DROP_LINE.test(l)) { dropped++; return false; } return true; }).map((l) => {
  let s = l; for (const [re, rep] of SUB) s = s.replace(re, () => { subs++; return rep; }); return s.replace(/[ \t]{2,}/g, '  ').trimEnd();
}).join('\n').replace(/\n{3,}/g, '\n\n');
fs.writeFileSync(path.join(OUT, 'manual.redacted.txt'), kept);
console.log(`text: ${raw.length} chars → redacted ${kept.length} chars · ${dropped} lines dropped · ${subs} values masked → ${path.join(OUT, 'manual.redacted.txt')}`);
if (flags.dry) { console.log('--dry: nothing sent. Read the redacted file, then run again without --dry.'); process.exit(0); }

// ---------- 3–4. Claude
const client = new Anthropic();
const PRICE = {                       // USD per million tokens (input, output); cache read/write as multiples of input
  'claude-haiku-5-5': (p) => (p <= 100_000 ? [0.10, 0.50] : [0.50, 2.50]),
  'claude-sonnet-5-5': () => [2, 10],
  'claude-opus-5-5': () => [4, 20],
  'claude-fable-5-1': () => [10, 50],
};
const READ = { 'claude-opus-5-5': 0.05, 'claude-fable-5-1': 0.025 };
const ledger = [];
function cost(model, u) {
  const prompt = (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
  const [pin, pout] = (PRICE[model] || PRICE['claude-sonnet-5-5'])(prompt);
  return ((u.input_tokens || 0) * pin + (u.cache_creation_input_tokens || 0) * pin * 1.25 + (u.cache_read_input_tokens || 0) * pin * (READ[model] || 0.1) + (u.output_tokens || 0) * pout) / 1e6;
}
const parseJSON = (s) => {
  const t = s.replace(/^```(?:json)?\s*/m, '').replace(/```\s*$/m, '').trim();
  const a = Math.min(...['{', '['].map((c) => { const i = t.indexOf(c); return i < 0 ? Infinity : i; }));
  return JSON.parse(t.slice(a));
};
const schema = JSON.parse(fs.readFileSync(path.join(root, 'docs/handoff/plan.schema.json'), 'utf8'));
const sample = fs.readFileSync(path.join(root, 'docs/handoff/plan.sample.json'), 'utf8');
const RULES = 'Copy times, names, prices, hours, phone numbers and addresses exactly as the manual writes them; never invent one. '
  + 'Leave out anything private: booking references, confirmation numbers, e-tickets, passport numbers, what the family paid in baht, e-mails, personal phone numbers, travellers\' full names. '
  + 'Masked values like [number] were removed on purpose — never guess them. Answer with JSON only, no prose, no code fence.';
const manualBlock = { type: 'text', text: `<manual>\n${kept}\n</manual>`, cache_control: { type: 'ephemeral' } };

async function ask(step, model, { system, user, max = 32000, effort = 'low', manual = true }) {
  const t0 = Date.now();
  const stream = client.messages.stream({
    model, max_tokens: max, output_config: { effort },
    system: manual ? [{ type: 'text', text: system }, manualBlock] : system,
    messages: [{ role: 'user', content: user }],
  });
  const msg = await stream.finalMessage();
  const u = msg.usage || {};
  const c = cost(model, u);
  ledger.push({ step, model, in: u.input_tokens || 0, cw: u.cache_creation_input_tokens || 0, cr: u.cache_read_input_tokens || 0, out: u.output_tokens || 0, usd: c, s: Math.round((Date.now() - t0) / 1000) });
  console.log(`  ${step.padEnd(14)} ${model.padEnd(18)} in ${u.input_tokens} · cache w ${u.cache_creation_input_tokens || 0} r ${u.cache_read_input_tokens || 0} · out ${u.output_tokens} · $${c.toFixed(3)} · ${Math.round((Date.now() - t0) / 1000)} s`);
  if (msg.stop_reason === 'refusal') throw new Error(`${step}: refused`);
  if (msg.stop_reason === 'max_tokens') throw new Error(`${step}: ran out of max_tokens (${max})`);
  const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  fs.writeFileSync(path.join(OUT, `${step}.json`), text);
  return parseJSON(text);
}

// English-only i18n during extraction: every {th, en} is written as {"en": "..."}; Thai comes in step 4.
const EN_ONLY = 'Wherever the schema asks for an {th, en} object, write {"en": "…"} only — the Thai is added later.';
const dayItem = JSON.stringify(schema.properties.days.items);
const infoSchema = JSON.stringify(schema.properties.info);
const restSchema = JSON.stringify(schema.properties.restaurants);

console.log(`Claude: extract ${EXTRACT} · write ${WRITE}`);
const top = await ask('structure', EXTRACT, {
  system: `You turn a family's Trip Operations Manual into the plan.json of a memory-book app. ${RULES}`,
  user: `Write the plan's top level and its days from the manual: {slug, title, sub, from, to, tz, place, places, kicker, display, emoji, days}. `
    + `${flags.slug ? `slug = "${flags.slug}". ` : ''}One day per date from the first to the last day. For each day fill title, sleep, wx, planned (every stop, with a FULL Google Maps query q and a local-script name zh when the manual gives one), moving, pick, planB, money (prices only), plan (the timeline: t = HH:MM), tips (include the "show the driver" names), legs (every move with from/to/by/min), picks (each meal: the pick, with alt = the backup), stay {name, addr, q}. `
    + `Day item schema: ${dayItem}\nExample of a whole plan (format only): ${sample}\n${EN_ONLY}`,
  max: 48000,
});
const info = await ask('info', EXTRACT, {
  system: `You turn a family's Trip Operations Manual into the plan.json of a memory-book app. ${RULES}`,
  user: `Write the pocket guide "info" from the manual's chapters (key facts → guide; where we sleep → stays; emergency card → emergency + lost; prices/attractions → prices; packing → pack; entry & documents → visa as {lede, groups:[{title, items}]}; contingency plans → ifthen as {plans:{head, cols, rows}}; anything else worth keeping, e.g. getting around, customs, a park touring plan → more). Schema: ${infoSchema}\n${EN_ONLY}`,
  max: 48000,
});
const rest = await ask('restaurants', EXTRACT, {
  system: `You turn a family's Trip Operations Manual into the plan.json of a memory-book app. ${RULES}`,
  user: `Write "restaurants" from the manual's restaurant guide: every restaurant, grouped by the manual's areas, kinds 0 restaurants · 1 food courts and quick bites · 2 cafés and sweets. Per place: name, zh (local name), what (food · famous for), why (why for us), where, pr (budget), hours, q (full Maps query). Schema: ${restSchema}\n${EN_ONLY}`,
  max: 64000,
});

const brief = top.days.map((d, i) => ({ i, title: d.title, plan: d.plan, planned: (d.planned || []).map((p) => p.en || p.name), pick: d.pick }));
const kids = await ask('kids', WRITE, {
  system: 'You write the children\'s pages of a family memory book. The children: Mimi (3, a girl) and Mika (1½, a boy). Write warm, simple, true sentences a 3-year-old enjoys hearing; every text bilingual {"th": "…", "en": "…"} with natural Thai for a Thai family (not a word-for-word translation). Only facts that are true and that the day really includes. Answer with JSON only, no code fence.',
  user: `For each day below write: learn (2–3 cards: name, facts[2], kid), quiz (3: q, a), mission {title, stamp (short CAPITALS), facts[3], spot[4] {k, e (emoji), th, en}}, tale {th, en, scenes:[4–5 × {e, h:{th,en}, th, en}]} — the guide's story of the day, the scenes cut from the same words. Return {"days":[{learn, quiz, mission, tale}, …]} in day order.\nDays: ${JSON.stringify(brief)}`,
  max: 48000, effort: 'medium', manual: false,
});

// ---------- translate every English string to Thai (only the Thai comes back: cheaper than re-writing the JSON)
const plan = { ...top, info, restaurants: rest };
const holes = [];
(function walk(v) {
  if (Array.isArray(v)) v.forEach(walk);
  else if (v && typeof v === 'object') {
    if (typeof v.en === 'string' && v.th === undefined) holes.push(v);
    for (const x of Object.values(v)) if (x && typeof x === 'object') walk(x);
  }
})(plan);
const BATCH = 350;
for (let b = 0; b < holes.length; b += BATCH) {
  const part = holes.slice(b, b + BATCH);
  const th = await ask(`thai-${b / BATCH + 1}`, WRITE, {
    system: 'You translate a family trip guide from English into natural Thai for Thai parents. Keep proper names, place names, times, prices and numbers as written (Latin script for names is fine). Short and clear. Answer with a JSON array of strings only — the same length and order as the input.',
    user: JSON.stringify(part.map((h) => h.en)),
    max: 32000, manual: false,
  });
  if (!Array.isArray(th) || th.length !== part.length) throw new Error(`thai-${b / BATCH + 1}: got ${th && th.length} strings for ${part.length}`);
  part.forEach((h, i) => { h.th = String(th[i]); });
}
plan.days.forEach((d, i) => Object.assign(d, (kids.days || [])[i] || {}));

// ---------- 5. plan → seed (with the converter's privacy scan)
const planFile = path.join(OUT, 'plan.json');
fs.writeFileSync(planFile, JSON.stringify(plan, null, 1));
const seedFile = path.join(OUT, `${plan.slug}.json`);
let conv = '';
try { conv = execFileSync(process.execPath, [path.join(root, 'scripts/plan-to-seed.mjs'), planFile, `--out=${seedFile}`, '--force'], { encoding: 'utf8' }); }
catch (e) { conv = `${e.stdout || ''}${e.stderr || ''}\n(plan-to-seed exit ${e.status})`; }
console.log(conv.trim().split('\n').slice(-12).join('\n'));

// ---------- the bill
const sum = (k) => ledger.reduce((a, r) => a + r[k], 0);
const usd = sum('usd');
console.log(`\ncalls ${ledger.length} · input ${sum('in')} · cache write ${sum('cw')} · cache read ${sum('cr')} · output ${sum('out')} tokens`);
console.log(`total ≈ $${usd.toFixed(2)} ≈ ฿${Math.round(usd * THB)} (at ${THB} THB/USD) · ${sum('s')} s`);
fs.writeFileSync(path.join(OUT, 'cost.json'), JSON.stringify({ extract: EXTRACT, write: WRITE, thb: THB, usd, calls: ledger }, null, 1));
