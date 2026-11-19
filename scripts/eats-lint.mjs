// The built-in list of places to eat (server/eats/*.json, read into the family's library by server/eatlib.js syncStarter):
//   node scripts/eats-lint.mjs            — every file, and that every city of the picture library has its list
//   node scripts/eats-lint.mjs jp-1.json  — only these files (no coverage check)
// A file: {"cc": "jp", "towns": [{"place": "jp-tokyo", "places": [row, …]}]} — a row is a book's "where to eat" row:
//   name (as on its sign, Latin letters), zh (the name in the local script, optional), kind 0 restaurant · 1 food court / quick bite ·
//   2 café / bakery / sweets, area {th,en}, tag {th,en}, what {th,en}, why {th,en} (why it is easy with small children),
//   pr {th,en} (a typical spend per adult as a range with ≈), q (a full Google Maps query). No opening hours: they change.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'server', 'eats');
const norm = (x) => String(x || '').normalize('NFKC').toLowerCase().replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
const THAI = /[฀-๿]/;
export const MIN = 10, MAX = 18;

export function lintEats(only) {
  const index = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'stock', 'index.json'), 'utf8'));
  const cities = Object.entries(index.places).filter(([k, p]) => k !== p.country);
  const files = (only && only.length ? only : fs.readdirSync(DIR).filter((f) => f.endsWith('.json'))).sort();
  const errs = [], seenTown = new Map();
  let rows = 0;
  for (const f of files) {
    let j; try { j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); } catch (e) { errs.push(`${f}: not JSON (${e.message})`); continue; }
    if (!/^[a-z]{2}$/.test(j.cc || '') || !Array.isArray(j.towns)) { errs.push(`${f}: needs {"cc", "towns": […]}`); continue; }
    if (!f.startsWith(j.cc)) errs.push(`${f}: the file's name starts with its country (${j.cc})`);
    for (const t of j.towns) {
      const p = index.places[t.place], at = `${f} ${t.place}`;
      if (!p || p.country !== j.cc || t.place === j.cc) { errs.push(`${at}: not a city of ${j.cc} in the picture library`); continue; }
      if (seenTown.has(t.place)) errs.push(`${at}: also in ${seenTown.get(t.place)}`);
      seenTown.set(t.place, f);
      const list = Array.isArray(t.places) ? t.places : [], names = new Set(), kinds = [0, 0, 0];
      if (list.length < MIN || list.length > MAX) errs.push(`${at}: ${list.length} places (want ${MIN}–${MAX})`);
      for (const x of list) {
        const w = `${at} "${x && x.name}"`; rows++;
        if (!x || typeof x.name !== 'string' || x.name.trim().length < 2 || x.name.length > 80 || !/[A-Za-z]/.test(x.name)) { errs.push(`${w}: a name in Latin letters, 2–80`); continue; }
        if (names.has(norm(x.name))) errs.push(`${w}: named twice in this town`);
        names.add(norm(x.name));
        if (![0, 1, 2].includes(x.kind)) errs.push(`${w}: kind 0, 1 or 2`); else kinds[x.kind]++;
        for (const k of ['area', 'tag', 'what', 'why', 'pr']) {
          const v = x[k];
          if (!v || typeof v.th !== 'string' || typeof v.en !== 'string' || !v.th.trim() || !v.en.trim()) { errs.push(`${w}: ${k} needs {th, en}`); continue; }
          if (v.th !== v.th.trim() || v.en !== v.en.trim() || / {2}/.test(v.th + v.en)) errs.push(`${w}: ${k} has stray spaces`);
          if (k !== 'pr' && k !== 'area' && !THAI.test(v.th)) errs.push(`${w}: ${k}.th has no Thai`);
          if (/เช็ค|ค่ะ|ครับ|นะคะ/.test(v.th)) errs.push(`${w}: ${k}.th — "เช็ก", and no ค่ะ/ครับ`);
          const max = { area: 60, tag: 40, what: 170, why: 170, pr: 80 }[k];
          if (v.en.length > max || v.th.length > max + 30) errs.push(`${w}: ${k} too long (${v.en.length}/${v.th.length}, at most ${max})`);
        }
        if (x.pr && !(x.pr.en || '').includes('≈')) errs.push(`${w}: pr is a range with ≈`);
        if (typeof x.q !== 'string' || x.q.length < 8 || x.q.length > 160 || /https?:/.test(x.q)) errs.push(`${w}: q is a full Google Maps query (name, district, town)`);
        if (x.zh !== undefined && (typeof x.zh !== 'string' || x.zh.length > 60)) errs.push(`${w}: zh is a short text`);
        const extra = Object.keys(x).filter((k) => !['name', 'zh', 'kind', 'area', 'tag', 'what', 'why', 'pr', 'q'].includes(k));
        if (extra.length) errs.push(`${w}: unknown fields ${extra.join(', ')}`);
      }
      // a short list (a place taken out after a check found it doubtful) only needs its restaurants: an honest gap beats a guess
      if (kinds[0] < 6 || (list.length >= 12 && (kinds[1] < 2 || kinds[2] < 2))) errs.push(`${at}: wants at least 6 restaurants, 2 quick bites and 2 cafés or sweets (${kinds.join('/')})`);
    }
  }
  const missing = only && only.length ? [] : cities.filter(([k]) => !seenTown.has(k)).map(([k]) => k);
  return { errs, rows, towns: seenTown.size, cities: cities.length, missing };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = lintEats(process.argv.slice(2));
  for (const e of r.errs.slice(0, 80)) console.log('  ✗', e);
  if (r.errs.length > 80) console.log(`  … and ${r.errs.length - 80} more`);
  console.log(`eats: ${r.rows} places in ${r.towns} towns${r.missing.length ? ` · ${r.missing.length} of ${r.cities} cities still without a list: ${r.missing.slice(0, 12).join(', ')}${r.missing.length > 12 ? '…' : ''}` : ''} · ${r.errs.length ? r.errs.length + ' problems' : 'ok'}`);
  process.exit(r.errs.length ? 1 : 0);
}
