'use strict';
// A rough budget for a planned route (docs/BUDGET.md B1). Every line is a range in the money it is paid in, and says where it came
// from: the app's library (tickets from the things-to-do prices, food from the places-to-eat prices) or the helper's estimate
// (a night's stay, getting around, flights — asked in the same route call). Nothing is converted here; the phone adds ≈ ฿ only
// with the rate the parents typed. A line we cannot work out is counted as unknown, never a guessed zero.
const { CC_CUR } = require('../public/tags.js');

const CUR_RE = /^[A-Z]{3}$/;
const num = (s) => +String(s).replace(/[,\s]/g, '');
// a money amount in a text: "¥8,900–10,900", "€9.50", "NZ$42", "50 JD", "LKR 2,000", "₩34,000"
const SYM = '(?:[A-Z]{2}\\$|US\\$|[$€£¥₩₫฿₹₱]|Rp|RM|Rs|Kč|zł|Ft|kr|[A-Z]{3})';
const AMT = '(\\d[\\d,]*(?:\\.\\d+)?)';
const MONEY_A = new RegExp(`${SYM}\\s?${AMT}(?:\\s*[–-]\\s*(?:${SYM}\\s?)?${AMT})?`);
const MONEY_B = new RegExp(`${AMT}(?:\\s*[–-]\\s*${AMT})?\\s?(?:[A-Z]{3}|JD|DH)\\b`);
function moneyIn(s) {
  const a = String(s).match(MONEY_A);
  if (a) { const lo = num(a[1]), hi = a[2] ? num(a[2]) : lo; return lo > 0 ? { lo, hi: Math.max(lo, hi) } : null; }
  const b = String(s).match(MONEY_B);
  if (b) { const lo = num(b[1]), hi = b[2] ? num(b[2]) : lo; return lo > 0 ? { lo, hi: Math.max(lo, hi) } : null; }
  return null;
}
const KIDWORD = /\b(child|children|kids?|junior|primary|youth|student|reduced|concession|age[sd]?)\b|\d+\s*[–-]\s*\d+\b|ปี|เด็ก/i;

// a sight's price text (English) → { adult: {lo,hi} | null, child: {lo,hi} | null, freeUnder: n, free: bool, unknown: bool }
function priceOf(text) {
  const s = String(text || '').trim();
  const o = { adult: null, child: null, freeUnder: 0, free: false, unknown: false };
  if (!s) { o.unknown = true; return o; }
  if (/^free\b/i.test(s)) { o.free = true; return o; }
  for (const p of s.split(/\s*·\s*/)) {
    const fu = p.match(/(?:under|below|up to|ต่ำกว่า)\s*(\d{1,2})\b[^·]*\bfree|(\d{1,2})\s*(?:and|&)\s*(?:under|younger)[^·]*\bfree/i);
    if (fu) { const n = +(fu[1] || fu[2]); o.freeUnder = Math.max(o.freeUnder, /up to|and under|younger/i.test(p) ? n + 1 : n); continue; }
    const zr = p.match(/(?:ages?\s*)?\b0\s*[–-]\s*(\d{1,2})\b[^·]*\bfree/i);   // "ages 0–5 free", "0–2 free"
    if (zr) { o.freeUnder = Math.max(o.freeUnder, +zr[1] + 1); continue; }
    if (/^\s*(?:children|kids)[^·\d]*\bfree\b/i.test(p) && !moneyIn(p)) { o.freeUnder = Math.max(o.freeUnder, 12); continue; }
    const m = moneyIn(p); if (!m) continue;
    if (KIDWORD.test(p) && !/adult|full|per person/i.test(p)) { if (!o.child) o.child = m; } else if (!o.adult) o.adult = m;
  }
  if (!o.adult && o.child && !/adult|full|per person/i.test(s)) { o.adult = o.child; o.child = null; }   // one price, said for children → treat as everyone's
  if (!o.adult) o.unknown = true;
  return o;
}
// the money a price text is in: its own symbol where it names one, else the country's
const SYMCUR = [[/US\$/, 'USD'], [/HK\$/, 'HKD'], [/NZ\$/, 'NZD'], [/A\$/, 'AUD'], [/S\$/, 'SGD'], [/C\$/, 'CAD'], [/NT\$/, 'TWD'], [/€/, 'EUR'], [/£/, 'GBP'], [/₩/, 'KRW'], [/₫/, 'VND'], [/฿/, 'THB'], [/₹/, 'INR'], [/₱/, 'PHP'], [/\bJD\b/, 'JOD']];
function curOf(text, cc) {
  const s = String(text || ''), code = s.match(/\b([A-Z]{3})\b/); const own = CC_CUR[cc] || '';
  if (code && CUR_RE.test(code[1]) && Object.values(CC_CUR).includes(code[1])) return code[1];
  for (const [re, c] of SYMCUR) if (re.test(s)) return c;
  return own;
}

// the children's ages (years, at the trip's start) from the family's rows; a child with no birth month counts as 4
function agesOf(kids, date) {
  const at = Date.parse(date || '') || Date.now();
  return (kids || []).map((k) => (k.birth_ym ? Math.max(0, (at - Date.parse(`${k.birth_ym}-01`)) / 31557600000) : 4));
}
const at = (r) => (r.lo + r.hi) / 2;

// tickets for one sight for the whole family
function ticketFor(p, adults, ages) {
  if (p.free) return { lo: 0, hi: 0 };
  if (p.unknown) return null;
  let lo = adults * p.adult.lo, hi = adults * p.adult.hi;
  for (const y of ages) {
    if (p.freeUnder && y < p.freeUnder) continue;
    const c = p.child || p.adult; lo += c.lo; hi += c.hi;
  }
  return { lo, hi };
}
// how much a person eats on the bill: under 2 nothing, 2–11 half, else whole
const eaterOf = (ages, adults) => adults + ages.reduce((n, y) => n + (y < 2 ? 0 : y < 12 ? 0.5 : 1), 0);
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor((s.length - 1) / 2)] : 0; };
// the middle price of one kind of place in a town (per person): {lo, hi} from the rows' "≈ ¥1,800–2,800"
function mealOf(rows, kind) {
  const ps = rows.filter((r) => r.kind === kind).map((r) => moneyIn((r.pr && r.pr.en) || '')).filter(Boolean);
  if (!ps.length) return null;
  return { lo: median(ps.map((p) => p.lo)), hi: median(ps.map((p) => p.hi)), cur: curOf(rows.find((r) => r.kind === kind).pr.en, rows[0].cc) };
}

// the helper's three numbers, as it wrote them: {"cur":"JPY","stay":[lo,hi],"move":[lo,hi],"flights":[lo,hi]}
function cleanMoney(m) {
  if (!m || typeof m !== 'object') return null;
  const pair = (v) => { if (!Array.isArray(v) || !v.length) return null; const a = num(v[0]), b = num(v[1] == null ? v[0] : v[1]); return a >= 0 && b >= 0 && isFinite(a) && isFinite(b) && a + b > 0 ? [Math.round(Math.min(a, b)), Math.round(Math.max(a, b))] : null; };
  const cur = CUR_RE.test(String(m.cur || '').toUpperCase()) ? String(m.cur).toUpperCase() : '';
  const o = { ...(cur ? { cur } : {}), ...(pair(m.stay) ? { stay: pair(m.stay) } : {}), ...(pair(m.move) ? { move: pair(m.move) } : {}), ...(pair(m.flights) ? { flights: pair(m.flights) } : {}) };
  return Object.keys(o).length > (cur ? 1 : 0) ? o : null;
}


/* B2 (docs/BUDGET.md): the family's own spending on past trips, as rows {trip, title, days, cat, cur, total} (bookshelf.js reads them
   from `spend`, ended trips only) → for each spending category and money, what a day cost (a night for stays), over every trip that
   paid in that money; the trips named newest first. Only categories the planner has a line for count (shopping and "other" never). */
const PAST_CAT = { food: 'food', tickets: 'tickets', move: 'transport', stay: 'stay' };
function pastPer(rows) {
  const per = {}, trips = new Map();
  const acc = new Map();   // cat|cur → {sum, days, trips:Set}
  for (const r of rows) {
    if (!Object.values(PAST_CAT).includes(r.cat) || !(r.total > 0) || !(r.days > 0) || !CUR_RE.test(r.cur || '')) continue;
    const span = r.cat === 'stay' ? Math.max(1, r.days - 1) : r.days, key = `${r.cat}|${r.cur}`;
    const a = acc.get(key) || { sum: 0, days: 0, trips: new Set() };
    a.sum += r.total; if (!a.trips.has(r.trip)) { a.days += span; a.trips.add(r.trip); } acc.set(key, a);
    if (!trips.has(r.trip)) trips.set(r.trip, { id: r.trip, title: r.title || null, at: r.date_from || '' });
  }
  for (const [key, a] of acc) { const [cat, cur] = key.split('|'); (per[cat] = per[cat] || {})[cur] = { v: a.sum / a.days, n: a.trips.size }; }
  return { per, trips: [...trips.values()].sort((x, y) => String(y.at).localeCompare(String(x.at))).map(({ id, title }) => ({ id, title })) };
}

const round = (v) => (v >= 10000 ? Math.round(v / 1000) * 1000 : v >= 1000 ? Math.round(v / 100) * 100 : v >= 100 ? Math.round(v / 10) * 10 : Math.round(v));
/* route: a cleaned planner route (days with town, stops with `lib`, money); answers: the cleaned answers; kids: the family's rows;
   sightById: id → the library's out() row; eatsOfTown(town{en,th}) → the eat library's out() rows (with cc); ccOfPlace(place) → cc */
function estimate({ route, answers, kids, sightById, eatsOfTown, ccOfPlace, past }) {
  if (!route || !Array.isArray(route.days) || !route.days.length) return null;
  const adults = Math.max(1, (answers && answers.adults) || 2), b = (answers && answers.budget) || 'mid';
  const ages = agesOf(kids, route.from), eaters = eaterOf(ages, adults);
  const sums = new Map();   // `${k}|${cur}` → {k, cur, lo, hi, src, n, unknown}
  const add = (k, cur, lo, hi, src) => { if (!cur) return; const key = `${k}|${cur}`; const o = sums.get(key) || { k, cur, lo: 0, hi: 0, src, n: 0, unknown: 0 }; o.lo += lo; o.hi += hi; o.n++; sums.set(key, o); };
  const unknown = { tickets: 0, food: 0 };
  // tickets: each library stop once
  const seen = new Set();
  for (const d of route.days) for (const s of d.stops || []) {
    if (!s.lib || seen.has(s.lib)) continue; seen.add(s.lib);
    const x = sightById(s.lib); if (!x) continue;
    const en = (x.price && x.price.en) || '', p = priceOf(en), t = ticketFor(p, adults, ages);
    if (!t) { unknown.tickets++; continue; }
    add('tickets', curOf(en, ccOfPlace(x.place)), t.lo, t.hi, 'lib');
  }
  // food: each day in its town (the eat library's middle prices, per person)
  for (const d of route.days) {
    const rows = d.town ? eatsOfTown(d.town) : [];
    const dinner = mealOf(rows, 0), lunch = mealOf(rows, 1) || dinner, morning = mealOf(rows, 2);
    if (!dinner && !lunch) { unknown.food++; continue; }
    const meals = [dinner || lunch, lunch || dinner, morning || { lo: (lunch || dinner).lo * 0.5, hi: (lunch || dinner).hi * 0.5, cur: (lunch || dinner).cur }];
    const cur = meals[0].cur;
    const lo = meals.filter((m) => m.cur === cur).reduce((n, m) => n + m.lo, 0) * eaters, hi = meals.filter((m) => m.cur === cur).reduce((n, m) => n + m.hi, 0) * eaters;
    add('food', cur, lo, hi, 'lib');
  }
  // the helper's numbers
  const m = route.money || {}, nights = Math.max(0, route.days.length - 1), own = m.cur || '';
  if (m.stay && own && nights) add('stay', own, m.stay[0] * nights, m.stay[1] * nights, 'helper');
  if (m.move && own) add('move', own, m.move[0], m.move[1], 'helper');
  if (m.flights && !(answers && answers.flights)) add('flights', 'THB', m.flights[0], m.flights[1], 'helper');
  const ORDER = ['flights', 'stay', 'food', 'tickets', 'move'];
  const lines = [...sums.values()].map((o) => {
    // the family's budget answer keeps the half of the range it leans to (careful: low to middle, comfortable: middle to high)
    const mid = at(o), lo = b === 'high' ? mid : o.lo, hi = b === 'low' ? mid : o.hi;
    return { k: o.k, cur: o.cur, lo: round(Math.min(lo, hi)), hi: round(Math.max(lo, hi)), src: o.src, ...(o.k === 'tickets' ? { n: o.n } : {}) };
  }).sort((a, z) => ORDER.indexOf(a.k) - ORDER.indexOf(z.k) || a.cur.localeCompare(z.cur));
  // B2: what this family really spent before in the same money leans each line towards it (half the estimate, half what we spent)
  const pp = pastPer(past || []);
  if (pp.trips.length) {
    for (const [k, cat] of Object.entries(PAST_CAT)) {
      // only the money this trip is paid in (its lines and the helper's local currency) — a Tokyo trip never borrows a Paris bill
      const curs = new Set([...lines.filter((l) => l.k === k).map((l) => l.cur), ...Object.keys(pp.per[cat] || {}).filter((c) => c === own || lines.some((l) => l.cur === c && l.k !== 'flights'))]);
      for (const cur of curs) {
        const per = pp.per[cat] && pp.per[cat][cur]; if (!per) continue;
        const span = k === 'stay' ? nights : route.days.length; if (!span) continue;
        const was = per.v * span, l = lines.find((x) => x.k === k && x.cur === cur);
        if (l) { const lo = (l.lo + was * 0.9) / 2, hi = (l.hi + was * 1.1) / 2; Object.assign(l, { lo: round(Math.min(lo, hi)), hi: round(Math.max(lo, hi)), past: round(was), pastN: per.n }); }
        else { lines.push({ k, cur, lo: round(was * 0.9), hi: round(was * 1.1), src: 'past', past: round(was), pastN: per.n }); if (k === 'food') unknown.food = 0; }
      }
    }
    lines.sort((a, z) => ORDER.indexOf(a.k) - ORDER.indexOf(z.k) || a.cur.localeCompare(z.cur));
  }
  if (!lines.length && !unknown.tickets && !unknown.food) return null;
  const tot = new Map(); for (const l of lines) { const t = tot.get(l.cur) || { cur: l.cur, lo: 0, hi: 0 }; t.lo += l.lo; t.hi += l.hi; tot.set(l.cur, t); }
  return { lines, totals: [...tot.values()].map((t) => ({ cur: t.cur, lo: round(t.lo), hi: round(t.hi) })), unknown, days: route.days.length, eaters,
    ...(pp.trips.length && lines.some((l) => l.past != null) ? { past: { trips: pp.trips.slice(0, 3) } } : {}) };
}

module.exports = { estimate, pastPer, priceOf, moneyIn, curOf, ticketFor, cleanMoney, agesOf, eaterOf };
