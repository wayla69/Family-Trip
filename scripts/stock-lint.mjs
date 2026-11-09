#!/usr/bin/env node
// npm run stock:lint [dir] — checks the stock art library (public/stock: index.json + files) against docs/STOCK-ART.md §6.3.
// test/infra.mjs runs the same check on every CI run.
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const STOCK = require('../server/stock.js');

const dir = process.argv[2] ? path.resolve(process.argv[2]) : STOCK.DIR;
const errs = await STOCK.lint(dir);
const idx = STOCK.read(dir);
const n = (idx.items || []).length, approved = (idx.items || []).filter((i) => i.ok && !i.withdrawn).length;
if (errs.length) {
  for (const e of errs) console.log('  ✗ ' + e);
  console.log(`\n${errs.length} problem(s) in ${path.relative(process.cwd(), dir) || '.'}`);
  process.exit(1);
}
console.log(`stock library clean: ${Object.keys(idx.places || {}).length} places, ${n} pictures (${approved} approved)`);
