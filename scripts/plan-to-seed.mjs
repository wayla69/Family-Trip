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

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flags = Object.fromEntries(argv.filter((a) => a.startsWith('--')).map((a) => { const m = /^--([^=]+)(?:=(.*))?$/.exec(a); return [m[1], m[2] === undefined ? true : m[2]]; }));
const files = argv.filter((a) => !a.startsWith('--'));
const { i18n, TODO } = D;
const rel = (f) => { const r = path.relative(root, f); return r.startsWith('..') ? f : r; };

// ---------- privacy: what may never reach the bookshelf (the repo is public)
const EXEMPT = new Set(['tel', 'url', 'route', 'href', 'q', 'speak']);   // phone numbers, Maps links/queries and speech text are allowed to hold digits
const KNOWN = /F5ARVC|1653717262744684|5651795979/;                        // references already excluded from the first two books — must never come back
const RULES = [
  ['known booking reference', KNOWN],
  ['booking reference', /(?:\b(?:PNR|booking|reservation|confirmation|conf\.?|e-?ticket|ticket|itinerary|locator)\b(?:\s*(?:ref(?:erence)?|no\.?|number|code|#))?|\bref(?:erence)?\b|เลขจอง|รหัสจอง|หมายเลขการจอง|เลขที่จอง|เลขยืนยัน|รหัสยืนยัน|รหัสอ้างอิง)[\s:#.\-–]*((?=[A-Z]*\d)[A-Z0-9]{5,8})\b/],
  ['e-ticket number', /\b\d{3}-\d{10}\b/],
  ['long number (confirmation?)', /\b\d{9,}\b/],
  ['passport number', /\b[A-Z]{1,2}\d{7}\b/],
  ['cost in baht', /฿\s?\d|\bTHB\s?\d/],
  ['blank form field', /_{4,}/],
  ['e-mail address', /[\w.+-]+@[\w-]+\.[a-z]{2,}/i],
  ['Thai mobile number', /\+66\s?[689]\d|\b0[689]\d[\s-]?\d{3}[\s-]?\d{4}\b/],
];
const SOFT = [['amount in baht (real cost?)', /\d\s?บาท/]];
function scan(v, at = '', hits = [], warns = []) {
  if (typeof v === 'string') {
    for (const [rule, re] of RULES) { const m = re.exec(v); if (m) hits.push({ at, rule, match: m[0].slice(0, 40) }); }
    for (const [rule, re] of SOFT) { const m = re.exec(v); if (m) warns.push({ at, rule, match: m[0] }); }
  } else if (Array.isArray(v)) v.forEach((x, i) => scan(x, `${at}[${i}]`, hits, warns));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!EXEMPT.has(k)) scan(x, at ? `${at}.${k}` : k, hits, warns);
  return { hits, warns };
}
const todos = (v, n = 0) => (typeof v === 'string' ? n + (/\bTODO\b/.test(v) ? 1 : 0) : Array.isArray(v) ? v.reduce((a, x) => todos(x, a), n) : v && typeof v === 'object' ? Object.values(v).reduce((a, x) => todos(x, a), n) : n);

// ---------- the plan: what must be there
const isI18n = (x) => x && typeof x === 'object' && typeof x.th === 'string' && typeof x.en === 'string' && x.th.trim() && x.en.trim();
function validate(p) {
  const errs = [], warns = [];
  const must = (c, m) => { if (!c) errs.push(m); };
  must(p && typeof p === 'object', 'plan must be a JSON object');
  if (errs.length) return { errs, warns };
  must(/^[a-z0-9-]{2,60}$/.test(p.slug || ''), 'slug: a-z 0-9 - only (2–60 chars)');
  must(isI18n(p.title), 'title: {th, en}');
  const d0 = D.parseDay(p.from), d1 = D.parseDay(p.to);
  must(d0 && d1 && d1 >= d0 && (d1 - d0) / 864e5 <= 60, 'from/to: YYYY-MM-DD, to after from, 60 days max');
  must(typeof p.tz === 'string' && /^[A-Za-z_]+\/[A-Za-z_]+/.test(p.tz), 'tz: an IANA zone like Asia/Tokyo');
  must(p.place && typeof p.place.th === 'string' && typeof p.place.en === 'string', 'place: {th, en, flag}');
  if (p.accent !== undefined) must(/^#[0-9a-fA-F]{6}$/.test(p.accent), 'accent: #rrggbb');
  if (p.kids !== undefined) must(Array.isArray(p.kids) && p.kids.every((k) => (typeof k === 'string' && /^[a-z0-9]+$/.test(k)) || (k && k.slug && k.name_th && k.name_en)), 'kids: slugs (mimi, mika) or {slug, name_th, name_en, emoji?, birth?}');
  must(Array.isArray(p.days) && p.days.length, 'days: an array, one per date');
  if (d0 && d1 && Array.isArray(p.days)) {
    const n = D.datesBetween(d0, d1).length;
    must(p.days.length === n, `days: ${p.days.length} given, ${n} dates from ${p.from} to ${p.to}`);
  }
  (p.days || []).forEach((d, i) => {
    const at = `days[${i}]`;
    must(isI18n(d.title), `${at}.title: {th, en}`);
    if (d.sleep !== undefined) must(isI18n(d.sleep), `${at}.sleep: {th, en} (or leave it out for Home)`);
    (d.planned || []).forEach((s, j) => {
      must(s && typeof s.en === 'string' && typeof s.th === 'string' && s.en.trim() && s.th.trim(), `${at}.planned[${j}]: needs th and en`);
      if (s.key !== undefined) must(/^[a-z0-9][a-z0-9._-]{0,59}$/i.test(s.key), `${at}.planned[${j}].key: letters, digits . _ - only`);
    });
    (d.plan || []).forEach((x, j) => { must(isI18n(x), `${at}.plan[${j}]: {t?, th, en}`); if (x.t !== undefined && !/^[0-2]\d:[0-5]\d$/.test(x.t)) warns.push(`${at}.plan[${j}].t "${x.t}" is not HH:MM`); if (x.tz !== undefined) { let ok = true; try { new Intl.DateTimeFormat('en', { timeZone: x.tz }); } catch { ok = false; } must(ok, `${at}.plan[${j}].tz "${x.tz}" is not an IANA timezone`); } });
    (d.legs || []).forEach((l, j) => must(l && l.from && l.to, `${at}.legs[${j}]: needs from and to`));
    (d.picks || []).forEach((x, j) => must(x && x.name, `${at}.picks[${j}]: needs name`));
    if (d.mission) { if (!Array.isArray(d.mission.facts) || !d.mission.facts.length) warns.push(`${at}.mission has no facts`); if (!Array.isArray(d.mission.spot) || d.mission.spot.length !== 4) warns.push(`${at}.mission.spot: 4 things to spot work best (${(d.mission.spot || []).length} given)`); }
    const known = new Set(['title', 'sleep', 'wx', 'emoji', 'planned', 'moving', 'pick', 'planB', 'money', 'plan', 'tips', 'stay', 'route', 'eat', 'learn', 'quiz', 'legs', 'picks', 'food', 'mission']);
    const extra = Object.keys(d).filter((k) => !known.has(k)); if (extra.length) warns.push(`${at}: unknown keys ignored: ${extra.join(', ')}`);
  });
  return { errs, warns };
}

// ---------- plan → seed
function toSeed(p, notes) {
  const d0 = D.parseDay(p.from), d1 = D.parseDay(p.to), dates = D.datesBetween(d0, d1);
  const slug = p.slug, accent = p.accent || '#1F3A5F', accent2 = p.accent2 || '#C8402B', place = p.place, pp = p.passport || {};
  const note = (m) => notes.push(m);
  const placeTh = place.th, placeEn = place.en;

  // stops: stable keys (derived from the English name when the plan gives none) + a full Maps query
  const used = new Set();
  for (const d of p.days) for (const s of d.planned || []) if (s.key) used.add(s.key);
  let derived = 0, noQ = 0;
  const keyFor = (en, i, j) => { let k = D.kebab(en) || `stop-${i + 1}-${j + 1}`, b = k, n = 2; while (used.has(k)) k = `${b}-${n++}`; used.add(k); return k; };
  const stayRows = [];   // info.stays from the days when the plan has none
  const days = dates.map((date, i) => {
    const d = p.days[i];
    const planned = (d.planned || []).map((s, j) => {
      const { key, kind, q, ...rest } = s;
      if (!key) derived++; if (!q) noQ++;
      return { key: key || keyFor(s.en, i, j), kind: kind || 'place', q: q || `${s.en}, ${placeEn}`, ...rest };
    });
    const out = { ...D.dayBase(i, date, accent), ...(d.emoji ? { emoji: d.emoji } : {}), title: d.title, sleep: d.sleep || i18n('บ้าน', 'Home'), planned };
    if (d.wx) out.wx = d.wx;
    for (const k of ['moving', 'pick', 'planB', 'money', 'plan', 'tips', 'stay', 'route', 'eat', 'learn', 'quiz', 'legs', 'picks', 'food']) if (d[k] !== undefined && d[k] !== null) out[k] = d[k];
    if (!out.stay && !D.isHome(out.sleep) && p.info && Array.isArray(p.info.stays)) {
      const st = p.info.stays.find((s) => s.prop && [s.prop.en, s.prop.th].some((n) => n && (out.sleep.en.includes(n) || n.includes(out.sleep.en))));
      if (st) { out.stay = { name: st.prop.en, addr: st.addr || '', q: st.q || `${st.prop.en}, ${placeEn}` }; note(`day ${i + 1}: tonight's stay card taken from info.stays (${st.prop.en})`); }
    }
    if (out.stay && !D.isHome(out.sleep)) {
      const last = stayRows[stayRows.length - 1];
      if (last && last.name === out.stay.name) { last.n++; last.co = D.addDays(d0, i + 1); } else stayRows.push({ name: out.stay.name, addr: out.stay.addr, q: out.stay.q, ci: D.addDays(d0, i), co: D.addDays(d0, i + 1), n: 1, base: out.sleep });
    }
    return out;
  });
  if (derived) note(`${derived} stop keys derived from English names — they are check-in keys: never rename one after the trip starts`);
  if (noQ) note(`${noQ} stops got a default Maps query "<name>, ${placeEn}" — a full query (name, street, town) finds the right pin`);

  // the pocket guide
  const info = { ...(p.info || {}) };
  if (p.restaurants) info.restaurants = p.restaurants;
  if (!info.emergency || !info.emergency.length) { info.emergency = [{ label: TODO('all emergencies — police, ambulance, fire'), tel: 'TODO', main: true }]; note('info.emergency missing → TODO (fill before the trip)'); }
  if (!info.lost) { info.lost = TODO('if a child is lost: where to stand, whom to call, what to show'); note('info.lost missing → TODO'); }
  if ((!info.stays || !info.stays.length) && stayRows.length) {
    info.stays = stayRows.map((s) => ({ base: s.base, prop: i18n(s.name, s.name), ci: i18n(D.fmtTh(s.ci), D.fmtEn(s.ci)), co: i18n(D.fmtTh(s.co), D.fmtEn(s.co)), n: s.n, why: TODO('why we chose it'), addr: s.addr, q: s.q }));
    note(`info.stays built from the days' stay cards (${stayRows.length} stays) — add "why we chose it"`);
  }

  // the kids' passport: missions ride on the days; lists, doors, pins and the map get sensible defaults
  const pdays = days.map((d, i) => {
    const m = p.days[i].mission || {};
    if (!p.days[i].mission) note(`day ${i + 1}: no kids' mission → title only`);
    return { title: m.title || d.title, stamp: m.stamp || `DAY ${i + 1}`, facts: m.facts || [], spot: m.spot || [], acc: m.acc || accent, tint: m.tint || '#F3F6FA' };
  });
  const lists = [];
  if (Array.isArray(pp.words) && pp.words.length) lists.push({ key: 'words', e: '💬', said: true, title: i18n('พูดแบบคนท้องถิ่น', 'Say It Like a Local'), sub: pp.wordsSub || i18n('วันละคำ พูดตามไกด์นะ', 'A word a day — say it after your guide'), groups: [{ items: pp.words }] });
  if (Array.isArray(pp.food) && pp.food.length) {
    const goal = Math.max(1, Math.ceil(pp.food.length * 0.6));
    lists.push({ key: 'food', e: '🍽️', yum: true, goal, title: i18n('ชิมของอร่อย', 'Tasting Card'), sub: i18n('ลองแล้วเป็นไง อร่อย 😋 หรือ ไม่ชอบ 😖', 'Tick what you tried — YUM 😋 or YUCK 😖'), goalText: i18n(`ลองครบ ${goal} อย่าง หนูคือนักชิมตัวจริง!`, `Try ${goal} and you are an official taster!`), groups: [{ items: pp.food }] });
  }
  if (Array.isArray(pp.lists)) lists.push(...pp.lists);
  if (!lists.some((l) => l.certificate)) {
    const items = days.flatMap((d) => d.planned.map((s) => ({ k: s.key, e: s.kind === 'food' ? '🍽️' : '📍', th: s.th, en: s.en })));
    const goal = Math.max(3, Math.ceil(items.length / 2));
    lists.push({ key: 'master', e: '✅', goal, certificate: true, title: i18n('นักสำรวจตัวจริง', 'Master Explorer'), sub: i18n('ติ๊กทุกที่ที่ไปถึง!', 'Tick every place you reach!'), goalText: i18n(`ติ๊กครบ ${goal} ช่องขึ้นไป ได้ใบประกาศนักสำรวจ!`, `Tick ${goal} or more and the certificate is yours!`), groups: [{ e: '📍', title: i18n('ไปถึงแล้ว', 'Reached'), items }] });
    note(`passport: Master Explorer list built from the ${items.length} planned stops (goal ${goal})`);
  }
  const doors = (pp.countdown && Array.isArray(pp.countdown.doors) ? pp.countdown.doors : []).slice(0, 14);
  const generic = D.doors(placeTh, placeEn);
  if (doors.length < 14) { note(`countdown: ${14 - doors.length} of 14 doors are the generic ones`); while (doors.length < 14) doors.push(generic[doors.length]); }
  let pins = pp.pins;
  if (!pins) {
    const seen = new Map();
    days.forEach((d, i) => { const s = d.planned.find((x) => x.kind !== 'food') || d.planned[0]; if (!s) return; const r = seen.get(s.en) || { e: '📍', th: s.th, en: s.en, ds: [] }; r.ds.push(i + 1); seen.set(s.en, r); });
    pins = { title: i18n('เราไปไหนบ้าง', 'Where we go'), sub: i18n(`หมุด ${seen.size} จุดบนแผนที่`, `${seen.size} pins on the map`), items: [...seen.values()].map(({ ds, ...r }) => ({ ...r, days: i18n(`วันที่ ${ds.join(', ')}`, `Day ${ds.join(', ')}`) })) };
    note(`passport.pins: one pin per day's first stop (${seen.size})`);
  }
  let map = pp.map;
  if (!map || !Array.isArray(map.stops) || !map.stops.length) {
    const stops = [];
    const keyOf = new Map();
    for (const d of days) if (!D.isHome(d.sleep) && !keyOf.has(d.sleep.en)) { const k = D.kebab(d.sleep.en) || `stop${stops.length + 1}`; keyOf.set(d.sleep.en, k); stops.push({ k, e: '🛏️', th: d.sleep.th, en: d.sleep.en, x: 50, y: 50 }); }
    stops.forEach((s, j) => { s.x = stops.length === 1 ? 50 : Math.round(15 + (70 * j) / (stops.length - 1)); s.y = j % 2 ? 62 : 38; });
    map = { title: i18n('แผนที่การผจญภัย', 'Our adventure map'), sea: (pp.map && pp.map.sea) || TODO('sea / ocean name on the map'), stops, days: days.map((d) => (D.isHome(d.sleep) ? [] : [keyOf.get(d.sleep.en)])) };
    note(`passport.map: ${stops.length} stops from where we sleep, spread evenly — hand-place x,y (percent) to match the drawing`);
  } else if (!Array.isArray(map.days)) { map = { ...map, days: days.map(() => []) }; note('passport.map.days missing → empty per day'); }
  const guides = Array.isArray(pp.guides) && pp.guides.length ? pp.guides : [
    { key: 'guide1', art: `/art/guides/${slug}-1.svg`, name: TODO('guide 1 name'), hello: TODO('hello from guide 1, use {name}') },
    { key: 'guide2', art: `/art/guides/${slug}-2.svg`, name: TODO('guide 2 name'), hello: TODO('hello from guide 2') },
  ];
  if (!(Array.isArray(pp.guides) && pp.guides.length)) note('passport.guides: two TODO guides (name them, draw public/art/guides/*.svg)');

  const kids = p.kids || ['mimi', 'mika'];
  const seed = {
    format: 2,
    slug, ...(p.legacy_trip_id ? { legacy_trip_id: p.legacy_trip_id } : {}), status: 'upcoming',
    title: p.title, sub: p.sub || i18n(`${dates.length} วัน · ${placeTh}`, `${dates.length} days · ${placeEn}`),
    date_from: p.from, date_to: p.to, timezone: p.tz,
    destinations: p.destinations || [placeEn],
    children: D.children(kids, d0),
    theme: D.theme({ slug, accent, accent2, display: p.display, kicker: p.kicker || p.title.en.toUpperCase(), badge: p.badge, flag: place.flag, placeTh, placeEn, places: p.places }),
    days,
    firsts_catalog: Array.isArray(p.firsts) && p.firsts.length ? p.firsts : D.FIRSTS,
    moods: p.moods || D.MOODS,
    stamp: { text: p.stamp || [placeEn.toUpperCase(), D.rangeText(d0, d1)], awarded_when: 'all days marked done OR trip end date passed' },
    cover: { emoji: p.emoji || place.flag || '📖', gradient: p.coverGradient || [accent, accent2] },
    notes: D.NOTES,
    info,
    passport: {
      code: pp.code || `${slug.toUpperCase()}-{KID}`,
      guides,
      greeting: pp.greeting || i18n('สวัสดี {name}!', 'Hello, {name}!'),
      days: pdays,
      lists,
      certificate: pp.certificate || { title: i18n(`Master ${placeEn} Explorer`, `Master ${placeEn} Explorer`), text: i18n(`เที่ยวจบทริป ${p.title.th} ครบทุกวัน`, `completed ${p.title.en}, every single day`), bye: i18n('เจอกันทริปหน้านะ!', 'See you on the next hop!') },
      style: pp.style || D.passportStyle({ slug, accent, placeTh, placeEn }),
      pins,
      ...(pp.declaration ? { declaration: pp.declaration } : {}),
      colour: pp.colour || `/art/${slug}/day-{n}.svg`,
      countdown: { doors, pack: (pp.countdown && pp.countdown.pack) || D.PACK },
      map,
    },
  };
  if (!(Array.isArray(p.firsts) && p.firsts.length)) note('firsts_catalog: the 10 generic firsts');
  return seed;
}

// ---------- report
const n = (a) => (Array.isArray(a) ? a.length : 0);
function report(seed) {
  const ds = seed.days, inf = seed.info || {}, pp = seed.passport || {};
  const sum = (k) => ds.reduce((a, d) => a + n(d[k]), 0);
  const rest = inf.restaurants && Array.isArray(inf.restaurants.groups) ? inf.restaurants.groups.reduce((a, g) => a + n(g.items), 0) : 0;
  const lines = [
    `  days ${ds.length} · stops ${sum('planned')} · timeline ${sum('plan')} · legs ${sum('legs')} · picks ${sum('picks')} · food-by-stop ${sum('food')} · eat ${sum('eat')} · learn ${sum('learn')} · quiz ${sum('quiz')} · stay cards ${ds.filter((d) => d.stay).length}`,
    `  info: emergency ${n(inf.emergency)} · stays ${n(inf.stays)} · guide ${n(inf.guide)} · prices ${inf.prices ? n(inf.prices.rows) + ' rows' : '—'} · pack ${n(inf.pack)} groups · general ${n(inf.general)} · wild ${n(inf.wild)} · restaurants ${rest ? `${rest} in ${inf.restaurants.groups.length} areas` : '— (built from the days)'} · also: ${['drive', 'car', 'kit', 'ifthen', 'visa', 'bio', 'eatRules'].filter((k) => inf[k]).join(', ') || 'none'}`,
    `  passport: missions ${n(pp.days)} (facts ${(pp.days || []).reduce((a, d) => a + n(d.facts), 0)}, spots ${(pp.days || []).reduce((a, d) => a + n(d.spot), 0)}) · lists ${(pp.lists || []).map((l) => `${l.key} ${(l.groups || []).reduce((a, g) => a + n(g.items), 0)}`).join(', ') || '—'} · doors ${n(pp.countdown && pp.countdown.doors)} · pack ${n(pp.countdown && pp.countdown.pack && pp.countdown.pack.items)} · map ${n(pp.map && pp.map.stops)} stops · pins ${n(pp.pins && pp.pins.items)} · guides ${n(pp.guides)}`,
  ];
  return lines.join('\n');
}
const artList = (seed) => `public/art/${seed.slug}/day-1..${seed.days.length}.svg` + (seed.passport && seed.passport.guides ? ', ' + seed.passport.guides.map((g) => 'public' + g.art).join(', ') : '') + (seed.passport && seed.passport.style && seed.passport.style.crest ? ', public' + seed.passport.style.crest : '');

function sanity(seed) {
  const errs = [], warns = [];
  if (seed.format !== 2) errs.push('format must be 2');
  if (!Array.isArray(seed.days) || !seed.days.length) errs.push('days missing');
  else {
    const keys = new Set(); let dup = 0, noQ = 0;
    seed.days.forEach((d, i) => {
      if (d.index !== i) errs.push(`days[${i}].index should be ${i}`);
      if (!D.parseDay(d.date)) errs.push(`days[${i}].date not YYYY-MM-DD`);
      if (!isI18n(d.title)) errs.push(`days[${i}].title needs th and en`);
      for (const s of d.planned || []) { if (!s.key) errs.push(`days[${i}] stop without key`); else if (keys.has(s.key)) dup++; else keys.add(s.key); if (!s.q) noQ++; }
    });
    if (dup) errs.push(`${dup} duplicate stop keys (check-ins would collide)`);
    if (noQ) warns.push(`${noQ} stops without a Maps query q`);
    if (seed.passport && Array.isArray(seed.passport.days) && seed.passport.days.length !== seed.days.length) warns.push(`passport has ${seed.passport.days.length} missions for ${seed.days.length} days`);
  }
  if (!seed.theme || !seed.theme.art) errs.push('theme.art missing');
  if (!Array.isArray(seed.firsts_catalog) || !seed.firsts_catalog.length) errs.push('firsts_catalog is empty — the 🌟 firsts page and the kids\' firsts trophy need it');
  if (!seed.info || !seed.info.emergency) warns.push('info.emergency missing');
  return { errs, warns };
}

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
