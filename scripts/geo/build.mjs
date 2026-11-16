#!/usr/bin/env node
// The phone's list of place names (owner, Nov 2026: "บอกชื่อสถานที่จากตำแหน่งให้ละเอียดขึ้น"): for every country the stock library
// knows, its towns and its best-known spots (temples, parks, beaches, airports, museums…) with their latitude/longitude, from
// GeoNames (CC BY 4.0 — credited on the privacy page). The phone downloads one country's file when a photo's position falls in it
// and names the nearest spot or town itself (snap.js snapSpot) — the position never leaves the phone.
//   node scripts/geo/build.mjs [cc …]   (default: every country of public/stock/index.json) → public/geo/<cc>.json
// Needs download.geonames.org. Each country's dump is streamed and thrown away; only the picked rows are kept.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import readline from 'node:readline';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const yauzl = require('yauzl');

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT = path.join(ROOT, 'public/geo');
const TOWNS = 2500, SPOTS = 3000;
// the kinds of spot a family photographs, and how far from one a photo still counts as "there" (km)
const SPOT = {
  AIRP: 3, AIRF: 0, ZOO: 1.5, AMUS: 1.5, PRK: 2, RSRT: 1, BCH: 1.2, ISL: 3, ISLS: 4, FLLS: 1, CAVE: 0.8, LK: 2, RSV: 0, BAY: 2, CAPE: 1.2,
  MT: 2, PK: 2, VLC: 4, HLL: 0, MUS: 0.6, MALL: 0.5, MKT: 0.5, PAL: 0.8, CSTL: 0.8, MNMT: 0.5, HSTS: 0.8, RUIN: 0.8, TOWR: 0.5, GDN: 1,
  SQR: 0.4, PIER: 0.4, TMPL: 0.6, SHRN: 0.5, PGDA: 0.6, MSTY: 0.6, CH: 0.4, CTRL: 0, MSQE: 0.5, STDM: 0.8, THTR: 0.4, OPRA: 0.4, LTHSE: 0.6,
  BDG: 0.6, HTL: 0.3, RESN: 12, NP: 12, UNIV: 0.8, AQC: 0, OBS: 0, RLG: 0, BTL: 0, PSTB: 0.5, PO: 0, SPA: 0.5, CMP: 0.5, RDST: 0, MTRO: 0, RSTN: 0.4, RSTP: 0, BUSTN: 0.3,
};
const FAMOUS_ONLY = new Set(['MSTY', 'CH', 'MSQE', 'HTL', 'MT', 'PK', 'SHRN', 'LK', 'ISL', 'BCH', 'PIER', 'RSTN', 'BUSTN', 'BDG', 'MKT', 'SQR']);   // too many minor ones: only with a few names in other languages
const THAI = /[฀-๿]/;

// curl: it follows the machine's proxy settings (Node's own https does not)
const get = (url, file) => new Promise((ok, no) => execFile('curl', ['-sSf', '--retry', '3', '-o', file, url], { maxBuffer: 1e6 }, (e) => (e ? no(e) : ok())));
const lines = (zip, name) => new Promise((ok, no) => yauzl.open(zip, { lazyEntries: true }, (e, z) => {
  if (e) return no(e);
  z.on('entry', (en) => { if (en.fileName !== name) return z.readEntry(); z.openReadStream(en, (e2, s) => (e2 ? no(e2) : ok(readline.createInterface({ input: s, crlfDelay: Infinity })))); });
  z.on('end', () => no(new Error(name + ' not in zip'))); z.readEntry();
}));
const r4 = (x) => Math.round(Number(x) * 1e4) / 1e4;
const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, 60);

async function build(cc) {
  const CC = cc.toUpperCase(), zip = path.join(os.tmpdir(), `gn-${CC}.zip`);
  await get(`https://download.geonames.org/export/dump/${CC}.zip`, zip);
  const towns = [], spots = [];
  try {
    for await (const line of await lines(zip, `${CC}.txt`)) {
      const r = line.split('\t'); if (r.length < 15) continue;
      const [gid, name, ascii, alts, lat, lon, fcl, fco, , , , , , , pop] = r;
      const al = alts ? alts.split(',') : [], th = al.find((a) => THAI.test(a)) || '', en = clean(/^[\x20-\x7EÀ-ɏ]+$/.test(name) ? name : ascii || name);
      if (!en) continue;
      if (fcl === 'P') {
        const rank = fco === 'PPLC' ? 4 : fco === 'PPLA' ? 3 : fco === 'PPLA2' ? 2 : fco === 'PPLA3' ? 1 : 0, p = Number(pop) || 0;
        if (rank || p >= 5000) towns.push({ gid, en, th: clean(th), lat: r4(lat), lon: r4(lon), score: rank * 1e7 + p });
      } else if (fco in SPOT && SPOT[fco] > 0) {
        const n = al.length;
        if (FAMOUS_ONLY.has(fco) && n < (fco === 'MSTY' ? 4 : fco === 'MT' || fco === 'PK' ? 1 : 2)) continue;
        const k = fco === 'PRK' && /national park|nationalpark|parc national|parque nacional/i.test(name) ? 'NP' : fco;   // a national park: a whole region, not a lawn
        spots.push({ gid, en, th: clean(th), lat: r4(lat), lon: r4(lon), k, score: n + (th ? 3 : 0) + (k === 'NP' || fco === 'RESN' ? 20 : ['AIRP', 'ZOO', 'AMUS', 'MUS', 'PAL', 'CSTL', 'MNMT', 'HSTS', 'TMPL', 'PGDA', 'BCH', 'FLLS'].includes(fco) ? 6 : 0) });
      }
    }
  } finally { fs.rmSync(zip, { force: true }); }
  towns.sort((a, b) => b.score - a.score); spots.sort((a, b) => b.score - a.score);
  const T = towns.slice(0, TOWNS), S = spots.slice(0, SPOTS);
  const out = { v: 1, cc, src: 'GeoNames (CC BY 4.0)', r: Object.fromEntries(Object.entries(SPOT).filter(([, v]) => v > 0)),
    t: T.map((x) => [x.gid, x.en, x.th === x.en ? '' : x.th, x.lat, x.lon]),
    s: S.map((x) => [x.gid, x.en, x.th === x.en ? '' : x.th, x.lat, x.lon, x.k]) };
  fs.writeFileSync(path.join(OUT, `${cc}.json`), JSON.stringify(out));
  return { cc, towns: T.length, spots: S.length, kb: Math.round(fs.statSync(path.join(OUT, `${cc}.json`)).size / 1024) };
}

const index = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/stock/index.json'), 'utf8'));
const all = [...new Set(Object.values(index.places).map((p) => p.country))].sort();
const want = process.argv.slice(2).length ? process.argv.slice(2) : all;
fs.mkdirSync(OUT, { recursive: true });
for (const cc of want) {
  try { console.log(JSON.stringify(await build(cc))); } catch (e) { console.error(cc, e.message); process.exitCode = 1; }
}
