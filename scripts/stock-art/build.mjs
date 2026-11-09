#!/usr/bin/env node
// node scripts/stock-art/build.mjs [kr tw …] — draws the stock pictures of the named place files (scripts/stock-art/places/<name>.mjs;
// all of them when none is named) into public/stock and puts their entries in public/stock/index.json.
// A place file exports { places: { key: {…} }, items: [{ id, cat, file, name, kw, …, svg }] }.
// New pictures go live marked review: 'pending' (the owner asked for everything to ship and to review after the deploy, Nov 2026);
// an entry the owner already approved (ok without review) keeps its date unless its picture changed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(here, '../../public/stock');
const INDEX = path.join(DIR, 'index.json');
const today = process.env.STOCK_DATE || new Date().toISOString().slice(0, 10);
const want = process.argv.slice(2);
const files = fs.readdirSync(path.join(here, 'places')).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4)).filter((f) => !want.length || want.includes(f));

const idx = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
const byId = new Map(idx.items.map((it) => [it.id, it]));
let wrote = 0;
for (const f of files) {
  const mod = (await import(path.join(here, 'places', f + '.mjs'))).default;
  Object.assign(idx.places, mod.places || {});
  for (const { svg, ...it } of mod.items) {
    const out = path.join(DIR, it.file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const changed = !fs.existsSync(out) || fs.readFileSync(out, 'utf8') !== svg;
    fs.writeFileSync(out, svg);
    const old = byId.get(it.id);
    const approved = old && old.ok && !old.review && !changed && old.file === it.file;
    byId.set(it.id, { ...it, ok: approved ? old.ok : today, ...(approved ? {} : { review: 'pending' }) });
    wrote++;
  }
}
idx.items = [...byId.values()];
// the hand layout: places one per line, items one per line (diffs stay readable)
const line = (o) => JSON.stringify(o).replace(/":/g, '": ').replace(/,"/g, ', "').replace(/^\{/, '{ ').replace(/\}$/, ' }');
const text = `{\n  "v": 1,\n  "places": {\n${Object.entries(idx.places).map(([k, v]) => `    ${JSON.stringify(k)}: ${line(v)}`).join(',\n')}\n  },\n  "items": [\n${idx.items.map((it) => '    ' + line(it)).join(',\n')}\n  ]\n}\n`;
JSON.parse(text);
fs.writeFileSync(INDEX, text);
console.log(`${wrote} pictures from ${files.join(', ')} → public/stock (${idx.items.length} in the library)`);
