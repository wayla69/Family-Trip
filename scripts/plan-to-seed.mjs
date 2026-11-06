#!/usr/bin/env node
// Plan → book. Turns a trip plan (docs/handoff/plan.schema.json — what a planning session writes, see docs/PLAN-TO-BOOK.md)
// into a format-2 seed the app loads on boot (server/seeds/<slug>.json).
//   npm run plan-to-seed -- plan.json [--out=server/seeds/<slug>.json] [--force]
//   npm run plan-to-seed -- --check server/seeds/<slug>.json        privacy scan + sanity on a finished seed (also run by the tests on every seed)
// It fills every default a book needs (dates, children and ages, theme tokens, stop keys and Maps queries, tonight's stay, the passport
// scaffold, countdown doors, the map), refuses anything private (booking references, confirmation numbers, e-tickets, passport numbers,
// costs in baht, e-mails, Thai mobiles, blank form fields) and prints a report of what is there, what was defaulted and what is still TODO.
// Exit codes: 0 written · 1 the plan is not valid · 2 private data found (nothing written).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from './lib/book-defaults.mjs';
import { scan, todos, validate, toSeed, report, artList, sanity } from './lib/plan-to-seed-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flags = Object.fromEntries(argv.filter((a) => a.startsWith('--')).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return [m[1], m[2] === undefined ? true : m[2]]; }));
const files = argv.filter((a) => !a.startsWith('--'));
const rel = (f) => { const r = path.relative(root, f); return r.startsWith('..') ? f : r; };

// ---------- main
function finish(label, seed, extraWarns, out) {
  const { hits, warns: soft } = scan(seed);
  const { errs, warns } = sanity(seed);
  const todo = todos(seed);
  console.log(label);
  console.log(report(seed));
  for (const w of [...extraWarns, ...warns]) console.log(`  warn: ${w}`);
  for (const w of soft) console.log(`  warn: ${w.rule} at ${w.at}: "${w.match}"`);
  if (todo) console.log(`  TODO left: ${todo} → grep -n TODO ${out || 'the seed'}`);
  for (const e of errs) console.log(`  ERROR: ${e}`);
  if (hits.length) { console.log(`  PRIVACY: ${hits.length} hit(s) — nothing written`); for (const h of hits) console.log(`    ${h.rule} at ${h.at}: "${h.match}"`); return 2; }
  console.log('  privacy: clean');
  return errs.length ? 1 : 0;
}

if (flags.check) {
  const f = files[0] || (typeof flags.check === 'string' ? flags.check : null);
  if (!f) { console.error('usage: plan-to-seed --check server/seeds/<slug>.json'); process.exit(1); }
  const seed = JSON.parse(fs.readFileSync(f, 'utf8'));
  process.exit(finish(`check ${f}`, seed, [], f));
}
if (!files[0]) { console.error('usage: plan-to-seed plan.json [--out=server/seeds/<slug>.json] [--force] | --check <seed>'); process.exit(1); }
let plan;
try { plan = JSON.parse(fs.readFileSync(files[0], 'utf8')); } catch (e) { console.error(`cannot read ${files[0]}: ${e.message}`); process.exit(1); }
const v = validate(plan);
if (v.errs.length) { console.log(`plan ${files[0]} is not valid:`); for (const e of v.errs) console.log(`  ERROR: ${e}`); process.exit(1); }
const notes = [];
const seed = toSeed(plan, notes);
const out = flags.out ? path.resolve(flags.out) : path.join(root, 'server', 'seeds', `${seed.slug}.json`);
if (fs.existsSync(out) && !flags.force) { console.error(`${out} exists — pass --force to overwrite`); process.exit(1); }
const code = finish(`plan → seed ${rel(out)} (format 2)`, seed, v.warns, rel(out));
if (code === 2) process.exit(2);
for (const m of notes) console.log(`  default: ${m}`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(seed, null, 1) + '\n');
console.log(`  wrote ${rel(out)}
next:
  [ ] art: ${artList(seed)} → add each to ART in public/sw.js and bump mbs-vN
  [ ] fill the TODOs, hand-place the map, name the guides
  [ ] test/bookshelf.mjs: extend the privacy regex with this trip's own booking references
  [ ] npm test → screenshots 390/320/1440 light+dark → PR → green CI → squash-merge`);
process.exit(code);
