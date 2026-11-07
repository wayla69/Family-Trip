// The plan → seed logic shared by scripts/plan-to-seed.mjs (CLI) and server/bookimport.js (a PDF imported inside the app):
// privacy scan, plan validation, toSeed (every default filled), report and sanity. Pure: no file IO, no process.exit.
import crypto from 'node:crypto';
import * as D from './book-defaults.mjs';
const { i18n, TODO } = D;

// ---------- privacy: what may never reach the bookshelf (the repo is public)
const EXEMPT = new Set(['tel', 'url', 'route', 'href', 'q', 'speak']);   // phone numbers, Maps links/queries and speech text are allowed to hold digits
// references already excluded from the first two books — must never come back; kept as SHA-256 prefixes so the values themselves never sit in this public repo
const KNOWN_HASH = new Set(['434fc7c1d7b2fc33', '331e521aaaa8230a', '003c189251bbdfec']);
const h16 = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const KNOWN = { exec: (v) => { for (const m of v.match(/\b[A-Z0-9]{6,16}\b/g) || []) if (KNOWN_HASH.has(h16(m))) return [m]; return null; } };
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
  if (typeof p.tz === 'string') { let ok = true; try { new Intl.DateTimeFormat('en', { timeZone: p.tz }); } catch { ok = false; } must(ok, `tz "${p.tz}" is not a timezone the platform knows (reminders run in it)`); }   // a model-written "Pacific/Sidney" would stop every reminder
  must(p.place && typeof p.place.th === 'string' && typeof p.place.en === 'string', 'place: {th, en, flag}');
  if (p.accent !== undefined) must(/^#[0-9a-fA-F]{6}$/.test(p.accent), 'accent: #rrggbb');
  if (p.kids !== undefined) must(Array.isArray(p.kids) && p.kids.every((k) => (typeof k === 'string' && /^[a-z0-9]+$/.test(k)) || (k && k.slug && k.name_th && k.name_en)), 'kids: slugs (mimi, mika) or {slug, name_th, name_en, emoji?, birth?}');
  must(Array.isArray(p.days) && p.days.length, 'days: an array, one per date');
  if (d0 && d1 && Array.isArray(p.days)) {
    const n = D.datesBetween(d0, d1).length;
    must(p.days.length === n, `days: ${p.days.length} given, ${n} dates from ${p.from} to ${p.to}`);
  }
  let noH = 0;   // timeline steps without their own headline h (the Today page then shows the step's first clause)
  (p.days || []).forEach((d, i) => {
    const at = `days[${i}]`;
    must(isI18n(d.title), `${at}.title: {th, en}`);
    if (d.sleep !== undefined) must(isI18n(d.sleep), `${at}.sleep: {th, en} (or leave it out for Home)`);
    (d.planned || []).forEach((s, j) => {
      must(s && typeof s.en === 'string' && typeof s.th === 'string' && s.en.trim() && s.th.trim(), `${at}.planned[${j}]: needs th and en`);
      if (s.key !== undefined) must(/^[a-z0-9][a-z0-9._-]{0,59}$/i.test(s.key), `${at}.planned[${j}].key: letters, digits . _ - only`);
    });
    (d.plan || []).forEach((x, j) => { must(isI18n(x), `${at}.plan[${j}]: {t?, th, en}`); if (x.h !== undefined) must(isI18n(x.h), `${at}.plan[${j}].h: {th, en}`); else noH++; if (x.t !== undefined && !/^[0-2]\d:[0-5]\d$/.test(x.t)) warns.push(`${at}.plan[${j}].t "${x.t}" is not HH:MM`); if (x.tz !== undefined) { let ok = true; try { new Intl.DateTimeFormat('en', { timeZone: x.tz }); } catch { ok = false; } must(ok, `${at}.plan[${j}].tz "${x.tz}" is not an IANA timezone`); } });
    (d.legs || []).forEach((l, j) => must(l && l.from && l.to, `${at}.legs[${j}]: needs from and to`));
    (d.picks || []).forEach((x, j) => must(x && x.name, `${at}.picks[${j}]: needs name`));
    if (d.mission) { if (!Array.isArray(d.mission.facts) || !d.mission.facts.length) warns.push(`${at}.mission has no facts`); if (!Array.isArray(d.mission.spot) || d.mission.spot.length !== 4) warns.push(`${at}.mission.spot: 4 things to spot work best (${(d.mission.spot || []).length} given)`); }
    const known = new Set(['title', 'sleep', 'wx', 'emoji', 'planned', 'moving', 'pick', 'planB', 'money', 'plan', 'tips', 'stay', 'route', 'eat', 'learn', 'quiz', 'tale', 'legs', 'picks', 'food', 'mission']);
    const extra = Object.keys(d).filter((k) => !known.has(k)); if (extra.length) warns.push(`${at}: unknown keys ignored: ${extra.join(', ')}`);
  });
  if (noH) warns.push(`${noH} timeline step${noH === 1 ? '' : 's'} without a headline h — the Today page shows each one's first clause instead`);
  return { errs, warns };
}

// ---------- plan → seed
function toSeed(p, notes, opts = {}) {
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
    for (const k of ['moving', 'pick', 'planB', 'money', 'plan', 'tips', 'stay', 'route', 'eat', 'learn', 'quiz', 'tale', 'legs', 'picks', 'food']) if (d[k] !== undefined && d[k] !== null) out[k] = d[k];
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
    // p.staysWhy [{name, why:{th,en}}] (the app's PDF import writes it) fills "why we chose it" where the names match
    const whyFor = (name) => { const n = String(name).toLowerCase(); const hit = (p.staysWhy || []).find((w) => w && w.name && w.why && (n.includes(String(w.name).toLowerCase()) || String(w.name).toLowerCase().includes(n))); return hit ? hit.why : null; };
    info.stays = stayRows.map((s) => ({ base: s.base, prop: i18n(s.name, s.name), ci: i18n(D.fmtTh(s.ci), D.fmtEn(s.ci)), co: i18n(D.fmtTh(s.co), D.fmtEn(s.co)), n: s.n, why: whyFor(s.name) || TODO('why we chose it'), addr: s.addr, q: s.q }));
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
    for (const d of days) if (!D.isHome(d.sleep) && !keyOf.has(d.sleep.en)) { const k = D.kebab(d.sleep.en) || `stop${stops.length + 1}`; keyOf.set(d.sleep.en, k); stops.push({ k, e: '🛏️', th: d.sleep.th, en: d.sleep.en, x: 50, y: 50, q: (d.stay && (d.stay.q || d.stay.addr)) || d.sleep.en }); }
    stops.forEach((s, j) => { s.x = stops.length === 1 ? 50 : Math.round(15 + (70 * j) / (stops.length - 1)); s.y = j % 2 ? 62 : 38; });
    map = { title: i18n('แผนที่การผจญภัย', 'Our adventure map'), sea: (pp.map && pp.map.sea) || TODO('sea / ocean name on the map'), stops, days: days.map((d) => (D.isHome(d.sleep) ? [] : [keyOf.get(d.sleep.en)])) };
    note(`passport.map: ${stops.length} stops from where we sleep, spread evenly — hand-place x,y (percent) to match the drawing`);
  } else if (!Array.isArray(map.days)) { map = { ...map, days: days.map(() => []) }; note('passport.map.days missing → empty per day'); }
  const guides = Array.isArray(pp.guides) && pp.guides.length ? pp.guides : opts.art === false ? D.GENERIC_GUIDES : [
    { key: 'guide1', art: `/art/guides/${slug}-1.svg`, name: TODO('guide 1 name'), hello: TODO('hello from guide 1, use {name}') },
    { key: 'guide2', art: `/art/guides/${slug}-2.svg`, name: TODO('guide 2 name'), hello: TODO('hello from guide 2') },
  ];
  if (!(Array.isArray(pp.guides) && pp.guides.length)) note(opts.art === false ? 'passport.guides: Kiki and Roo stand in (no drawings of its own)' : 'passport.guides: two TODO guides (name them, draw public/art/guides/*.svg)');

  const kids = p.kids || ['mimi', 'mika'];
  const seed = {
    format: 2,
    slug, ...(p.legacy_trip_id ? { legacy_trip_id: p.legacy_trip_id } : {}), status: 'upcoming',
    title: p.title, sub: p.sub || i18n(`${dates.length} วัน · ${placeTh}`, `${dates.length} days · ${placeEn}`),
    date_from: p.from, date_to: p.to, timezone: p.tz,
    destinations: p.destinations || [placeEn],
    children: D.children(kids, d0),
    theme: { ...D.theme({ slug, accent, accent2, display: p.display, kicker: p.kicker || p.title.en.toUpperCase(), badge: p.badge, flag: place.flag, placeTh, placeEn, places: p.places }), ...(opts.art === false ? { art: '' } : {}) },
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
      style: pp.style || { ...D.passportStyle({ slug, accent, placeTh, placeEn }), ...(opts.art === false ? { crest: '' } : {}) },
      pins,
      ...(pp.declaration ? { declaration: pp.declaration } : {}),
      colour: pp.colour || (opts.art === false ? '' : `/art/${slug}/day-{n}.svg`),
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

// ---------- the Thai a parent reads at a glance (owner's rule, Nov 2026): the book title, day titles, weather lines and timeline
// headlines must hold Thai letters (a transliteration counts; a bare English name does not), and the spelling is เช็ก, never เช็ค.
// Warnings only: a book is never refused for its wording, the warnings name what to fix.
const THAI = /[\u0E00-\u0E7F]/;
const noThai = (x) => x && typeof x === 'object' && typeof x.th === 'string' && x.th.trim() && !THAI.test(x.th);
function thaiCheck(seed) { return styleCheck(seed); }   // the old name, kept for callers
// docs/STYLE.md §7 — what a machine can see of the book's writing; warnings only, the book is never refused for its wording
const EMOJI_FIRST = /^\p{Extended_Pictographic}/u;
const US_SPELLING = /\b(colors?|colored|centers?|centered|favorites?|traveled|traveling|organiz\w*|(?:kilo|centi)meters?)\b/;   // lower case only ("Baby Care Center" is a name); a taxi "meter" is right in British English too
const TIMES = (x) => (String(x).match(/\b\d{1,2}:\d{2}\b/g) || []).map((t) => t.replace(/^0(?=\d:)/, '')).sort().join(' ');
const MONEY = (x) => (String(x).match(/(?:HK\$|MOP|A\$|AU\$|NZ\$|US\$|\$|€|£|¥)\s?\d[\d,.]*/g) || []).map((m) => m.replace(/\s/g, '').replace('AU$', 'A$').replace(/[.,]+$/, '')).sort().join(' ');
const PAPER = /\bPart \d+\b|\bOption [A-C]\b|ตัดตามเส้นประ|cut along the (?:dotted|dashed) line/i;   // the paper manual's chapters and cut-outs
const BUILT = /^\s*(?:บัตรฉุกเฉิน|คืนต่อคืน|ที่อยู่คืนนี้)|\b(?:Emergency card|Night by night|Tonight's address)\b/i;
const KID_PATHS = [/\.learn\[\d+\]\.kid$/, /\.quiz\[\d+\]\.(q|a)$/, /\.tale(\.scenes\[\d+\])?$/, /^passport\.days\[\d+\]\.(title|spot\[\d+\]|facts\[\d+\])$/, /^passport\.countdown\.doors\[\d+\]$/, /^passport\.little\.days\[\d+\]\[\d+\]$/, /^passport\.guides\[\d+\]\.hello$/];
function styleCheck(seed) {
  const warns = [], add = (w) => warns.push(w);
  if (noThai(seed.title)) add(`title.th "${seed.title.th}" has no Thai — transliterate the name (ออสเตรเลีย, not Australia)`);
  (seed.days || []).forEach((d, i) => {
    const at = `days[${i}]`;
    if (noThai(d.title)) add(`${at}.title.th "${d.title.th}" has no Thai — write it the way Thais say it (ฮ่องกงดิสนีย์แลนด์)`);
    if (noThai(d.wx)) add(`${at}.wx.th has no Thai`);
    const rows = Array.isArray(d.plan) ? d.plan : (d.plan && Array.isArray(d.plan.plan) ? d.plan.plan : []);
    rows.forEach((r, j) => {
      const h = r && r.h; if (!h || typeof h !== 'object') return;
      if (noThai(h)) add(`${at}.plan[${j}].h.th "${h.th}" has no Thai`);
      for (const l of ['th', 'en']) {
        const x = String(h[l] || '');
        if (!EMOJI_FIRST.test(x)) add(`${at}.plan[${j}].h.${l} "${x}" — a headline starts with one emoji`);
        if (/ · |[()]/.test(x)) add(`${at}.plan[${j}].h.${l} "${x}" — no " · " or brackets in a headline (the detail is below it)`);
      }
      const words = String(h.en || '').replace(EMOJI_FIRST, '').trim().split(/\s+/).filter((w) => /\w/.test(w)).length;
      if (words > 6) add(`${at}.plan[${j}].h.en "${h.en}" — ${words} words; a headline is 6 at most`);
      const thLen = [...String(h.th || '').replace(/^\P{L}+/u, '').replace(/\p{M}/gu, '')].length;   // what the eye sees: Thai vowel and tone marks sit on a letter
      if (thLen > 32) add(`${at}.plan[${j}].h.th "${h.th}" — ${thLen} characters; about 25, 32 at most`);
    });
  });
  // every {th, en} text of the book: spelling, spacing, times and prices that agree, the kids' lines
  const walk = (x, path) => {
    if (Array.isArray(x)) return x.forEach((v, k) => walk(v, `${path}[${k}]`));
    if (!x || typeof x !== 'object') return;
    if (typeof x.th === 'string' && typeof x.en === 'string') {
      const p = path.replace(/^\./, '');
      if (US_SPELLING.test(x.en)) add(`${p}.en — American spelling "${x.en.match(US_SPELLING)[0]}" (the book is in British English)`);
      // docs/STYLE.md §7.1 — the full report reads on its own: no paper-manual references, Thai says วันที่ N, durations without ":00"
      for (const l of ['th', 'en']) { const m = x[l].match(PAPER); if (m) add(`${p}.${l} — "${m[0]}" refers to the paper manual; write it so it reads on its own (docs/STYLE.md §7.1)`); }
      if (/\bDays? \d/.test(x.th)) add(`${p}.th — "${x.th.match(/\bDays? \d+/)[0]}" in Thai text; write วันที่ N`);
      for (const l of ['th', 'en']) if (/\d\s*(?:ชม\.|h)\s*00\b/.test(x[l])) add(`${p}.${l} — a duration with ":00" ("1 ชม. 00 นาที"); write "1 ชม." / "1 h"`);
      for (const l of ['th', 'en']) { if (/ {2}/.test(x[l])) add(`${p}.${l} — a double space`); if (x[l] !== x[l].trim()) add(`${p}.${l} — a space at the start or the end`); }
      if (x.th.trim() && x.en.trim()) {
        if (TIMES(x.th) !== TIMES(x.en)) add(`${p} — the times differ: th [${TIMES(x.th)}] en [${TIMES(x.en)}]`);
        if (MONEY(x.th) !== MONEY(x.en)) add(`${p} — the prices differ: th [${MONEY(x.th)}] en [${MONEY(x.en)}]`);
      }
      if (KID_PATHS.some((r) => r.test(p))) for (const l of ['th', 'en']) {
        if (/ · /.test(x[l])) add(`${p}.${l} — a kids' line is read aloud: no " · "`);
        if (/\b\d{1,2}:\d{2}\b/.test(x[l])) add(`${p}.${l} — a kids' line says the time in words ("in the evening"), not HH:MM`);
      }
    }
    for (const [k, v] of Object.entries(x)) if (k !== 'speak' && k !== 'zh') walk(v, `${path}.${k}`);
  };
  walk(seed, '');
  // a child's name in a Thai text is written in Thai (มีมี่, not Mimi)
  const kidNames = (seed.children || []).map((k) => k && (k.name_en || (k.name && k.name.en))).filter((n) => n && /^[A-Za-z]/.test(n));
  if (kidNames.length) { const re = new RegExp(`\\b(${kidNames.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`);
    const hit = []; const look = (x, path) => { if (Array.isArray(x)) return x.forEach((v, k) => look(v, `${path}[${k}]`)); if (!x || typeof x !== 'object') return; if (typeof x.th === 'string' && re.test(x.th)) hit.push(path.replace(/^\./, '')); for (const [k, v] of Object.entries(x)) if (k !== 'children') look(v, `${path}.${k}`); };
    look(seed, ''); hit.slice(0, 12).forEach((p) => add(`${p}.th — a child's name in Latin script; write it in Thai (${(seed.children || []).map((k) => k.name_th || (k.name && k.name.th)).filter(Boolean).join(', ')})`)); if (hit.length > 12) add(`… and ${hit.length - 12} more Thai texts with a child's name in Latin script`); }
  // a manual chapter that repeats a section the app builds itself (the emergency card, night by night, tonight's address)
  ((seed.info || {}).more || []).forEach((m, k) => { const tt = `${(m.title || {}).th || ''} ${(m.title || {}).en || ''}`;
    if (BUILT.test(tt)) add(`info.more[${k}] "${(m.title || {}).th || (m.title || {}).en}" — the app builds this section itself; leave the chapter out (docs/STYLE.md §7.1)`); });
  const wrong = (JSON.stringify(seed).match(/เช็ค/g) || []).length;
  if (wrong) add(`${wrong} × "เช็ค" — the spelling is เช็ก (เช็กอิน / เช็กเอาต์)`);
  return warns;
}
function sanity(seed, opts = {}) {
  const errs = [], warns = styleCheck(seed);
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
  if (opts.art !== false && (!seed.theme || !seed.theme.art)) errs.push('theme.art missing');
  if (!Array.isArray(seed.firsts_catalog) || !seed.firsts_catalog.length) errs.push('firsts_catalog is empty — the 🌟 firsts page and the kids\' firsts trophy need it');
  if (!seed.info || !seed.info.emergency) warns.push('info.emergency missing');
  return { errs, warns };
}


export { EXEMPT, RULES, SOFT, scan, todos, isI18n, validate, toSeed, report, artList, sanity, thaiCheck, styleCheck };
