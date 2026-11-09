// The stock art library (docs/STOCK-ART.md): pictures of popular cities and countries that ship with the app under public/stock,
// named in public/stock/index.json. A seed names one as "stock:<id>"; the server swaps each for its file's URL when it sends a
// book (state + seed), so the phone never needs the index. Only pictures the owner approved (`ok`) resolve — anything else
// (unknown, not yet approved, withdrawn) becomes '' and the page falls back as it does for a book without art.
// Nothing here is about a family: the files are public, served without sign-in, never in backups.
const fs = require('fs');
const path = require('path');
const { svgOf } = require('./bookart');

const DIR = path.join(__dirname, '..', 'public', 'stock');
// <scope>.<cat>[.<slug>] — scope: g (general) · t (landscape) · r (route) · jp (a country) · jp-tokyo (a city) · p-disney-paris (a big day out)
const ID_RE = /^(?:g|t|r|[a-z]{2}|[a-z]{2}-[a-z0-9-]{2,30}|p-[a-z0-9-]{2,40})\.[a-z]+(?:\.[a-z0-9-]{1,40})?$/;
const PLACE_RE = /^(?:[a-z]{2}(?:-[a-z0-9-]{2,30})?|p-[a-z0-9-]{2,40})$/;
const FILE_RE = /^[a-z0-9-]+(?:\/[a-z0-9-]+)*\.v\d+\.(svg|webp)$/;
const CATS = {   // category → the file types it may be (docs/STOCK-ART.md §2.2, §4.2; the owner chose SVG stickers too, Nov 2026)
  stamp: ['svg'], day: ['svg'], landmark: ['svg'],
  food: ['svg', 'webp'], animal: ['svg', 'webp'], transport: ['svg', 'webp'], culture: ['svg', 'webp'], flag: ['svg', 'webp'], hello: ['svg', 'webp'], money: ['svg', 'webp'],
};
const SVG_MAX = 12 * 1024, WEBP_MAX = 12 * 1024, INDEX_MAX = 300 * 1024;
const PREFIX = 'stock:';

const empty = () => ({ v: 1, places: {}, items: [] });
function read(dir = DIR) {
  const f = path.join(dir, 'index.json');
  if (!fs.existsSync(f)) return empty();
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}

// id → URL of every approved, not withdrawn picture; plus a short tag of the index, so a redrawn picture (a new file version)
// changes the hash the app keys a book's guide text on (bookshelf seedOf)
function load(dir = DIR) {
  let idx;
  try { idx = read(dir); } catch (e) { console.error('stock index unreadable:', e.message); idx = empty(); }
  const urls = new Map();
  for (const it of idx.items || []) if (it && it.ok && !it.withdrawn && ID_RE.test(it.id) && FILE_RE.test(it.file || '')) urls.set(it.id, '/stock/' + it.file);
  const tag = require('crypto').createHash('sha1').update(JSON.stringify([...urls])).digest('hex').slice(0, 8);
  return { urls, tag, size: urls.size };
}
let LIB = load();
const reload = (dir) => { LIB = load(dir); return LIB; };

const url = (id) => LIB.urls.get(id) || '';
// a copy of v with every "stock:<id>" string replaced by its URL ('' when the picture isn't there); nothing else is touched
function resolve(v) {
  if (typeof v === 'string') return v.startsWith(PREFIX) ? url(v.slice(PREFIX.length)) : v;
  if (Array.isArray(v)) return v.map(resolve);
  if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = resolve(v[k]); return o; }
  return v;
}
// does a value hold any stock reference at all (most books don't: skip the copy)
const uses = (v) => v != null && JSON.stringify(v).includes('"' + PREFIX);
const maybe = (v) => (uses(v) ? resolve(v) : v);

// every check in docs/STOCK-ART.md §6.3 that needs no browser; returns a list of problems (empty = clean)
async function lint(dir = DIR) {
  const errs = [], bad = (m) => errs.push(m);
  if (!fs.existsSync(dir)) return errs;
  const indexFile = path.join(dir, 'index.json');
  if (!fs.existsSync(indexFile)) { bad('index.json is missing'); return errs; }
  if (fs.statSync(indexFile).size > INDEX_MAX) bad(`index.json is over ${INDEX_MAX / 1024} KB — split it by country`);
  let idx;
  try { idx = JSON.parse(fs.readFileSync(indexFile, 'utf8')); } catch (e) { bad('index.json is not JSON: ' + e.message); return errs; }
  if (idx.v !== 1) bad('index.json: v must be 1');
  const places = idx.places && typeof idx.places === 'object' ? idx.places : (bad('index.json: places must be an object'), {});
  const items = Array.isArray(idx.items) ? idx.items : (bad('index.json: items must be a list'), []);
  const named = (n) => n && typeof n.th === 'string' && n.th.trim() && typeof n.en === 'string' && n.en.trim();
  const hex = /^#[0-9A-Fa-f]{6}$/;

  for (const [k, p] of Object.entries(places)) {
    if (!PLACE_RE.test(k)) bad(`place ${k}: bad key`);
    if (!p || typeof p !== 'object') { bad(`place ${k}: not an object`); continue; }
    if (!named(p.name)) bad(`place ${k}: needs name.th and name.en`);
    if (!/^[a-z]{2}$/.test(p.country || '')) bad(`place ${k}: country must be an ISO 3166-1 alpha-2 code in lower case`);
    else if (!k.startsWith('p-') && k.slice(0, 2) !== p.country) bad(`place ${k}: key must start with its country "${p.country}"`);
    if (![1, 2, 3].includes(p.wave)) bad(`place ${k}: wave must be 1, 2 or 3`);
    if (p.tz !== undefined) { try { new Intl.DateTimeFormat('en', { timeZone: p.tz }); } catch (_) { bad(`place ${k}: unknown timezone ${p.tz}`); } }
    if (p.ll !== undefined && !(Array.isArray(p.ll) && p.ll.length === 2 && Math.abs(p.ll[0]) <= 90 && Math.abs(p.ll[1]) <= 180)) bad(`place ${k}: ll must be [lat, lon]`);
    if (!Array.isArray(p.alias) || p.alias.length < 1) bad(`place ${k}: needs at least one alias`);
    if (p.colors !== undefined) for (const c of ['k1', 'k2', 'k3']) if (!hex.test((p.colors || {})[c] || '')) bad(`place ${k}: colors.${c} must be #RRGGBB`);
  }

  const seen = new Set(), files = new Set();
  for (const it of items) {
    const id = it && it.id;
    if (!ID_RE.test(id || '')) { bad(`item ${JSON.stringify(id)}: bad id`); continue; }
    if (seen.has(id)) bad(`item ${id}: duplicate id`); seen.add(id);
    const scope = id.split('.')[0], cat = id.split('.')[1];
    if (it.cat !== cat) bad(`item ${id}: cat must be "${cat}" (from the id)`);
    if (!CATS[cat]) { bad(`item ${id}: unknown category ${cat}`); continue; }
    if (/-/.test(scope) && !places[scope]) bad(`item ${id}: city ${scope} is not in places`);
    if (!named(it.name)) bad(`item ${id}: needs name.th and name.en`);
    if (!Array.isArray(it.kw) || it.kw.filter((w) => typeof w === 'string' && w.trim()).length < 2) bad(`item ${id}: needs at least two keywords (kw)`);
    if (/เช็ค/.test(JSON.stringify(it.name || {}))) bad(`item ${id}: spell เช็ก`);
    if (it.ok !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(String(it.ok))) bad(`item ${id}: ok must be the approval date YYYY-MM-DD`);
    // ch = the emoji this picture draws in the family's emoji library (the country pack, server/emoji.js stockPack)
    if (it.ch !== undefined && !(typeof it.ch === 'string' && /\p{Extended_Pictographic}|\p{Regional_Indicator}/u.test(it.ch) && it.ch.length <= 16)) bad(`item ${id}: ch must be one emoji`);
    if (it.alt !== undefined && !(Array.isArray(it.alt) && it.ch && it.alt.every((x) => typeof x === 'string' && /\p{Extended_Pictographic}/u.test(x)))) bad(`item ${id}: alt must be emoji (and needs ch)`);
    // `file` = the picture books use; `next` (optional) = a redraw waiting for the owner's review — checked the same way,
    // shown beside it on the review sheet, never served to a book until it is promoted to `file` (with a fresh `ok`)
    for (const [key, name] of [['file', it.file], ['next', it.next]]) {
      if (key === 'next' && it.next === undefined) continue;
      const m = FILE_RE.exec(name || '');
      if (!m) { bad(`item ${id}: ${key} must look like dir/name.v1.svg|webp`); continue; }
      if (!CATS[cat].includes(m[1])) bad(`item ${id}: a ${cat} is a .${CATS[cat].join(' or .')} file`);
      if (files.has(name)) bad(`item ${id}: file ${name} used twice`); files.add(name);
      const f = path.join(dir, name);
      if (!fs.existsSync(f)) { bad(`item ${id}: file ${name} is missing`); continue; }
      const size = fs.statSync(f).size;
      if (m[1] === 'svg') {
        if (size > SVG_MAX) bad(`item ${id}: ${name} is ${Math.round(size / 1024)} KB (max ${SVG_MAX / 1024})`);
        const text = fs.readFileSync(f, 'utf8');
        if (!svgOf(text)) bad(`item ${id}: ${name} is not a safe SVG (svgOf)`);
        if (cat !== 'stamp' && /<text[\s>]/i.test(text)) bad(`item ${id}: only a stamp may carry text`);
        const vb = /viewBox="([^"]+)"/.exec(text), want = cat === 'stamp' ? '0 0 200 200' : '0 0 240 240';
        if (vb && vb[1].trim().split(/[\s,]+/).join(' ') !== want) bad(`item ${id}: viewBox must be "${want}"`);
      } else {
        if (size > WEBP_MAX) bad(`item ${id}: ${name} is ${Math.round(size / 1024)} KB (max ${WEBP_MAX / 1024})`);
        try {
          const meta = await require('sharp')(f).metadata();
          if (meta.format !== 'webp') bad(`item ${id}: ${name} is not a webp`);
          if (meta.width !== 160 || meta.height !== 160) bad(`item ${id}: ${name} must be 160×160 (is ${meta.width}×${meta.height})`);
          if (!meta.hasAlpha) bad(`item ${id}: ${name} needs a transparent background`);
        } catch (e) { bad(`item ${id}: ${name} unreadable: ${e.message}`); }
      }
    }
  }
  // every file on disk is named by the index (a stray file would ship unseen)
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk(dir)) {
    const rel = path.relative(dir, f).split(path.sep).join('/');
    if (rel === 'index.json') continue;
    if (!files.has(rel)) bad(`file ${rel} is not in index.json`);
  }
  return errs;
}

module.exports = { DIR, ID_RE, FILE_RE, CATS, PREFIX, read, load, reload, url, resolve, uses, maybe, lint, get lib() { return LIB; } };
