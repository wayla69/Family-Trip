// npm run sights:lint [file …] — the built-in things-to-do files (docs/SIGHTS.md): shape, both languages, a web check on every row
// (owner, 19 Nov 2026: "เช็กเว็บทุกแห่งก่อนเข้าคลัง" — no row without `ok` and `src`). Exit 1 on any problem.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(root, 'server', 'sights');
export const KINDS = ['themepark', 'zoo', 'aquarium', 'museumkid', 'museum', 'park', 'play', 'beach', 'nature', 'views', 'culture', 'oldtown', 'market', 'show', 'farm', 'onsen', 'ride', 'shop'];
const both = (v, n) => v && typeof v === 'object' && typeof v.en === 'string' && typeof v.th === 'string' && v.en.trim() && v.th.trim() && v.en.length <= n && v.th.length <= n;
const THAI = /[฀-๿]/;

export function lintFile(file, places) {
  const errs = [], bad = (m) => errs.push(`${path.basename(file)}: ${m}`);
  let j; try { j = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { bad('not JSON: ' + e.message); return errs; }
  if (!/^[a-z]{2}$/.test(j.cc || '')) bad('cc must be two letters');
  if (!Array.isArray(j.towns) || !j.towns.length) { bad('towns must be a list'); return errs; }
  for (const t of j.towns) {
    const p = places[t.place];
    if (!p) { bad(`unknown place ${t.place}`); continue; }
    if (p.country !== j.cc) bad(`${t.place} is not in ${j.cc}`);
    const seen = new Set();
    for (const [i, x] of (Array.isArray(t.sights) ? t.sights : []).entries()) {
      const at = `${t.place}[${i}] ${x && x.name && x.name.en}`;
      if (!both(x.name, 120)) { bad(`${at}: name {en, th}`); continue; }
      if (!THAI.test(x.name.th)) bad(`${at}: name.th has no Thai`);
      const k = x.name.en.toLowerCase().replace(/[^a-z0-9]+/g, ''); if (seen.has(k)) bad(`${at}: twice in one town`); seen.add(k);
      if (!KINDS.includes(x.kind)) bad(`${at}: kind ${x.kind}`);
      for (const f of ['area', 'what', 'why']) if (!both(x[f], 240)) bad(`${at}: ${f} {en, th} ≤ 240`);
      if (x.tip !== undefined && !both(x.tip, 240)) bad(`${at}: tip {en, th} ≤ 240`);
      if (!Array.isArray(x.ages) || x.ages.length !== 4 || x.ages.some((a) => ![0, 1, 2].includes(a))) bad(`${at}: ages = four of 0/1/2`);
      if (!(typeof x.hrs === 'number' && x.hrs >= 0.5 && x.hrs <= 10)) bad(`${at}: hrs 0.5–10`);
      if (!['in', 'out', 'both'].includes(x.io)) bad(`${at}: io in/out/both`);
      if (!['yes', 'part', 'no'].includes(x.pram)) bad(`${at}: pram yes/part/no`);
      if (!both(x.price, 160)) bad(`${at}: price {en, th}`);
      if (!['none', 'rec', 'req'].includes(x.book)) bad(`${at}: book none/rec/req`);
      if (typeof x.q !== 'string' || x.q.length < 4 || x.q.length > 200) bad(`${at}: q`);
      if (!/^20(2[5-9]|3\d)-(0[1-9]|1[0-2])$/.test(x.ok || '')) bad(`${at}: ok = the month of the web check (YYYY-MM, 2025 or later)`);
      if (!/^https:\/\/[^\s"<>]{4,300}$/.test(x.src || '')) bad(`${at}: src = the https page that confirmed it`);
      if (/ค่ะ|ครับ|เช็ค/.test(JSON.stringify(x))) bad(`${at}: Thai style (no ค่ะ/ครับ, spell เช็ก)`);
    }
    // a city holds 15 or more; one resort (a place id p-…: Disneyland Paris, Orlando) 10 or more — never padded with what was not checked
    const min = /^p-/.test(t.place || '') ? 10 : 15;
    if ((t.sights || []).length < min) bad(`${t.place}: ${(t.sights || []).length} sights (${min} or more)`);
    const s = t.sights || [];
    if (s.filter((x) => x.io === 'in' || x.io === 'both').length < 3) bad(`${t.place}: fewer than three for a rainy day (io in/both)`);
  }
  return errs;
}

export function lintAll(files) {
  const index = JSON.parse(fs.readFileSync(path.join(root, 'public', 'stock', 'index.json'), 'utf8'));
  const list = files && files.length ? files : (fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => path.join(DIR, f)) : []);
  const errs = [], towns = new Set();
  for (const f of list) { errs.push(...lintFile(f, index.places || {})); try { for (const t of JSON.parse(fs.readFileSync(f, 'utf8')).towns || []) { if (towns.has(t.place)) errs.push(`${t.place} is in two files`); towns.add(t.place); } } catch (_) { /* reported above */ } }
  return { errs, towns: towns.size, files: list.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = lintAll(process.argv.slice(2).map((f) => path.resolve(f)));
  for (const e of r.errs) console.log('  ' + e);
  console.log(r.errs.length ? `${r.errs.length} problem(s)` : `sights clean: ${r.files} files, ${r.towns} towns`);
  process.exit(r.errs.length ? 1 : 0);
}
