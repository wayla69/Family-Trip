#!/usr/bin/env node
// Trial from the command line: Trip Operations Manual PDF → plan → seed with Claude, and what it costs. The same engine the app
// uses on its #/import page (server/bookimport.js): pdftotext here, private lines/values redacted here before anything is sent,
// Haiku for the structure (the manual cached), Sonnet for the kids' pages and the Thai, plan-to-seed's defaults and privacy scan.
//   node scripts/import-pdf.mjs <manual.pdf> --out=<dir> [--slug=x] [--thb=35] [--dry]
//   IMPORT_EXTRACT_MODEL / IMPORT_WRITE_MODEL pick the models (defaults claude-haiku-5-5 / claude-sonnet-5-5); ANTHROPIC_API_KEY needed.
// --dry writes the redacted text to --out and stops (no API call) so you can read exactly what would leave the machine.
// The seed lands in --out, never in server/seeds: review it first. Text only — the PDF file and its images are never sent.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMPORT = createRequire(import.meta.url)('../server/bookimport.js');
const argv = process.argv.slice(2);
const flags = Object.fromEntries(argv.filter((a) => a.startsWith('--')).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return [m[1], m[2] === undefined ? true : m[2]]; }));
const pdf = argv.find((a) => !a.startsWith('--'));
if (!pdf || !flags.out) { console.error('usage: node scripts/import-pdf.mjs <manual.pdf> --out=<dir> [--slug=x] [--thb=35] [--dry]'); process.exit(1); }
const OUT = path.resolve(flags.out);
if (OUT.startsWith(path.join(root, 'server'))) { console.error('--out must not be inside server/ — review the result before it becomes a seed'); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });
const THB = Number(flags.thb || 35);
const slug = flags.slug || path.basename(pdf, path.extname(pdf)).normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
const buf = fs.readFileSync(pdf);

if (flags.dry) {
  const raw = execFileSync('pdftotext', ['-layout', pdf, '-'], { maxBuffer: 64 << 20 }).toString('utf8');
  const { text, dropped, masked } = IMPORT.redact(raw);
  fs.writeFileSync(path.join(OUT, 'manual.redacted.txt'), text);
  console.log(`text ${raw.length} chars → ${text.length} after redaction · ${dropped} lines dropped · ${masked} values masked → ${path.join(OUT, 'manual.redacted.txt')}`);
  console.log('--dry: nothing sent. Read the redacted file, then run again without --dry.');
  process.exit(0);
}
console.log(`import ${pdf} → ${slug} · extract ${IMPORT.EXTRACT()} · write ${IMPORT.WRITE()}`);
try {
  const out = await IMPORT.run({ buf, slug, client: new Anthropic(), log: (l) => console.log('  ' + l), dir: path.join(OUT, 'tmp') });
  fs.writeFileSync(path.join(OUT, 'plan.json'), JSON.stringify(out.plan, null, 1));
  fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(out.seed, null, 1) + '\n');
  fs.writeFileSync(path.join(OUT, 'cost.json'), JSON.stringify({ ...out.cost, thb: THB, report: out.report }, null, 1));
  for (const l of out.report.lines) console.log('  ' + l);
  for (const w of out.report.warns) console.log('  warn: ' + w);
  for (const n of out.report.notes) console.log('  default: ' + n);
  if (out.report.todo) console.log(`  TODO left: ${out.report.todo}`);
  const sum = (k) => out.cost.calls.reduce((a, r) => a + (r[k] || 0), 0);
  console.log(`\ncalls ${out.cost.calls.length} · input ${sum('in')} · cache write ${sum('cw')} · cache read ${sum('cr')} · output ${sum('out')} tokens · ${sum('s')} s`);
  console.log(out.cost.usd === null ? 'total: unknown model price' : `total ≈ $${out.cost.usd.toFixed(2)} ≈ ฿${Math.round(out.cost.usd * THB)} (at ${THB} THB/USD)`);
  console.log(`wrote ${path.join(OUT, `${slug}.json`)}, plan.json, cost.json`);
} catch (e) {
  console.error(`failed (${e.code || 'error'}): ${e.message}`); process.exit(2);
}
