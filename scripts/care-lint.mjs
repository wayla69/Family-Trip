// The built-in list of help and play near a stay (server/care/*.json, read by server/care.js) — hospitals that take children,
// a pharmacy, playgrounds and indoor play, baby rooms (owner, Nov 2026: "โรงพยาบาลเด็ก ร้านยา สนามเด็กเล่น ห้องให้นม"):
//   node scripts/care-lint.mjs            — every file
//   node scripts/care-lint.mjs th-1.json  — only these files
// A file: {"cc": "jp", "towns": [{"place": "jp-tokyo", "places": [row, …]}]} — a row: name (as on its sign, Latin letters),
//   zh (the name in the local script, optional), kind hospital|pharmacy|play|baby, area {th,en}, what {th,en}, why {th,en} (optional),
//   q (a full Google Maps query), ok "YYYY-MM" = the month a web search confirmed it (required: this is help in an emergency, nothing
//   from memory). Never opening hours, never a phone number (they change; the app has each country's emergency number).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'server', 'care');
const norm = (x) => String(x || '').normalize('NFKC').toLowerCase().replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
const THAI = /[฀-๿]/;
export const KINDS = ['hospital', 'pharmacy', 'play', 'baby'];
const HOURS = /\b24[- ]?(hours?|hr|h)\b|\bopen (daily|every|from|until|till)\b|\d{1,2}[:.]\d{2}\s*(am|pm|–|-)|24 ชั่วโมง|เปิด(ทุกวัน|ตั้งแต่)|\d{1,2}[:.]\d{2}\s*น\./i;
const PHONE = /\+?\d[\d ()-]{7,}\d/;

export function lintCare(only) {
  const index = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'stock', 'index.json'), 'utf8'));
  const files = (only && only.length ? only : fs.readdirSync(DIR).filter((f) => f.endsWith('.json'))).sort();
  const errs = [], seenTown = new Map(), kinds = Object.fromEntries(KINDS.map((k) => [k, 0]));
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
      const list = Array.isArray(t.places) ? t.places : [], names = new Set();
      if (!list.length || list.length > 10) errs.push(`${at}: ${list.length} places (want 1–10)`);
      for (const x of list) {
        const w = `${at} "${x && x.name}"`; rows++;
        if (!x || typeof x.name !== 'string' || x.name.trim().length < 2 || x.name.length > 90 || !/[A-Za-z]/.test(x.name)) { errs.push(`${w}: a name in Latin letters, 2–90`); continue; }
        if (names.has(norm(x.name))) errs.push(`${w}: named twice in this town`);
        names.add(norm(x.name));
        if (!KINDS.includes(x.kind)) errs.push(`${w}: kind is one of ${KINDS.join(', ')}`); else kinds[x.kind]++;
        for (const k of ['area', 'what', 'why']) {
          const v = x[k];
          if (k === 'why' && v === undefined) continue;
          if (!v || typeof v.th !== 'string' || typeof v.en !== 'string' || !v.th.trim() || !v.en.trim()) { errs.push(`${w}: ${k} needs {th, en}`); continue; }
          if (v.th !== v.th.trim() || v.en !== v.en.trim() || / {2}/.test(v.th + v.en)) errs.push(`${w}: ${k} has stray spaces`);
          if (k !== 'area' && !THAI.test(v.th)) errs.push(`${w}: ${k}.th has no Thai`);
          if (/เช็ค|ค่ะ|ครับ|นะคะ/.test(v.th)) errs.push(`${w}: ${k}.th — "เช็ก", and no ค่ะ/ครับ`);
          if (HOURS.test(v.th + ' ' + v.en)) errs.push(`${w}: ${k} names opening hours — they change, leave them out`);
          if (PHONE.test(v.th + ' ' + v.en)) errs.push(`${w}: ${k} holds a phone number`);
          const max = { area: 70, what: 170, why: 170 }[k];
          if (v.en.length > max || v.th.length > max + 30) errs.push(`${w}: ${k} too long (${v.en.length}/${v.th.length}, at most ${max})`);
        }
        if (typeof x.q !== 'string' || x.q.length < 8 || x.q.length > 180 || /https?:/.test(x.q) || PHONE.test(x.q.replace(/\b\d{1,5}\b/g, ''))) errs.push(`${w}: q is a full Google Maps query (name, street, district, town)`);
        if (x.zh !== undefined && (typeof x.zh !== 'string' || x.zh.length > 70)) errs.push(`${w}: zh is a short text`);
        if (!/^20\d\d-(0[1-9]|1[0-2])$/.test(x.ok || '')) errs.push(`${w}: ok is the month a web search confirmed it, "YYYY-MM" (required)`);
        const extra = Object.keys(x).filter((k) => !['name', 'zh', 'kind', 'area', 'what', 'why', 'q', 'ok'].includes(k));
        if (extra.length) errs.push(`${w}: unknown fields ${extra.join(', ')}`);
      }
    }
  }
  return { errs, rows, towns: seenTown.size, kinds };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = lintCare(process.argv.slice(2));
  for (const e of r.errs.slice(0, 80)) console.log('  ✗', e);
  if (r.errs.length > 80) console.log(`  … and ${r.errs.length - 80} more`);
  console.log(`care: ${r.rows} places in ${r.towns} towns (${Object.entries(r.kinds).map(([k, n]) => `${k} ${n}`).join(' · ')}) · ${r.errs.length ? r.errs.length + ' problems' : 'ok'}`);
  process.exit(r.errs.length ? 1 : 0);
}
