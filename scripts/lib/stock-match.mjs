// Picks pictures from the stock art library for a book (docs/STOCK-ART.md §5.6, S3). Pure: the caller passes the library's
// index (server/stock.js read()); only approved, not withdrawn pictures are considered. Used by plan-to-seed-core toSeed
// when a book has no drawings of its own (a PDF import, the sample, a plan without art).
//
// For each day: which city it is in (the place aliases found in the day's words, else the day before's city, else the book's
// own place), then the picture whose keywords best match the day (a landmark or a day scene of that city, never the same one
// twice while another fits), else the city's own scene, else a landscape / route scene the day names (t.* / r.*), else none
// (the helper may draw it). The passport gets the
// country's stamp as its crest and a stamp per city and country in the order the trip reaches them, each earned on that day.

const lc = (s) => String(s || '').normalize('NFKC').toLowerCase();
const T = (x) => (x && typeof x === 'object' ? [x.th, x.en].join(' ') : String(x || ''));

// a day's words; `addr` adds the stops' map queries (street addresses) — they help pick the picture, but never say which city the
// day is in: a Sydney book's "5 Whistler St, Manly" and "Oxford Street, Paddington NSW" named Vancouver and London (Nov 2026)
function dayRaw(d, addr) {
  const bits = [T(d.title), T(d.sleep), T(d.moving)];
  for (const s of d.planned || []) bits.push(T(s), addr ? s.q || '' : '');
  for (const r of d.plan || []) bits.push(T(r), T(r.h));
  return bits.join(' \n ').normalize('NFKC');
}
const dayWords = (d) => lc(dayRaw(d, true));
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const latin = (s) => /[a-z]/i.test(s) && !/[^\x00-\x7FÀ-ɏ\s'’.-]/.test(s);
// a Latin word counts as a whole word, plural s/es allowed ("bath" is not in "bathroom", "ella" not in "umbrella", "ice" not in
// "price" — Nov 2026: a Sydney book took the Cotswolds, Interlaken and Plitvice); other scripts (Thai, Chinese) have no spaces,
// so they match inside the text
// (a plain search and a look at the letters around it — a Unicode-class regular expression per keyword made a book take seconds)
const wordCh = (c) => !!c && ((c >= '0' && c <= '9') || c.toLowerCase() !== c.toUpperCase() || (c >= '฀' && c <= '๿'));
function hasWord(text, k) {
  if (!latin(k)) return text.includes(k);
  for (let i = text.indexOf(k); i >= 0; i = text.indexOf(k, i + 1)) {
    if (wordCh(text[i - 1])) continue;
    let e = i + k.length;
    if (text[e] === 's') e++; else if (text[e] === 'e' && text[e + 1] === 's') e += 2;
    if (!wordCh(text[e]) || !wordCh(text[i + k.length])) return true;
  }
  return false;
}
// how many of the words appear
function hits(text, words) {
  let n = 0;
  for (const w of words || []) { const k = lc(w).trim(); if (k && hasWord(text, k)) n++; }
  return n;
}

// the cities a text names, through the place aliases (the data says how each is matched):
// - lower case ("dubrovnik"): a whole word, any case, plurals allowed
// - written with capitals ("Nice", "Split", "Bath", "Ella"): an everyday word as well, so only with those capitals
// - all capitals ("ZAG", "TAG"): an airport code, only in capitals ("Zig Zag" is not Zagreb)
// - Thai or Chinese: inside the text, but the longest name found wins — อเมริกา is not ริกา, มาเลเซีย is not มาเล, and a
//   longer Latin name wins too (New York is not York)
// built once per library (two regular expressions for the ~2,000 Latin aliases, a plain search for the rest): a book is read in
// milliseconds, not seconds
const finders = new WeakMap();
function aliasFinder(places) {
  if (finders.has(places)) return finders.get(places);
  const plain = [], lower = new Map(), caseful = new Map();
  for (const [k, p] of Object.entries(places)) for (const a of p.alias || []) {
    const s = String(a || '').normalize('NFKC').trim(); if (!s) continue;
    if (!latin(s)) { plain.push({ k, a: s }); continue; }
    const m = s !== s.toLowerCase() ? caseful : lower, key = m === lower ? s.toLowerCase() : s;
    if (!m.has(key)) m.set(key, []);
    m.get(key).push(k);
  }
  const alt = (m) => [...m.keys()].sort((x, y) => y.length - x.length).map(reEsc).join('|');
  const reLower = lower.size ? new RegExp(`(?<![\\p{L}\\p{N}])(${alt(lower)})(?:e?s)?(?![\\p{L}\\p{N}])`, 'giu') : null;
  const reCase = caseful.size ? new RegExp(`(?<![\\p{L}\\p{N}])(${alt(caseful)})(?![\\p{L}\\p{N}])`, 'gu') : null;
  const find = (raw) => {
    const out = [];
    for (const [re, m, low] of [[reLower, lower, true], [reCase, caseful, false]]) if (re) for (const x of raw.matchAll(re)) {
      const key = low ? x[1].toLowerCase() : x[1];
      for (const k of m.get(key) || []) out.push({ k, a: key, s: x.index, e: x.index + x[0].length });
    }
    for (const { k, a } of plain) { let i = -1; while ((i = raw.indexOf(a, i + 1)) >= 0) out.push({ k, a, s: i, e: i + a.length }); }
    return out;
  };
  const fn = (raw) => {
    const found = find(raw);
    found.sort((x, y) => (y.e - y.s) - (x.e - x.s));
    const kept = [];
    for (const f of found) if (!kept.some((g) => g.s <= f.s && f.e <= g.e && (g.e - g.s) > (f.e - f.s))) kept.push(f);
    const by = {};
    for (const f of kept) { const b = (by[f.k] = by[f.k] || { names: new Set(), n: 0 }); b.names.add(f.a); b.n++; }
    return by;   // place key → the aliases it was named by and how many times
  };
  finders.set(places, fn);
  return fn;
}

export function stockMatch(days, placeText, index) {
  const places = (index && index.places) || {};
  const items = ((index && index.items) || []).filter((it) => it && it.ok && !it.withdrawn);
  const cities = Object.keys(places).filter((k) => k.includes('-'));
  const scopeOf = (id) => id.split('.')[0];
  const has = (id) => items.some((it) => it.id === id);
  const words = days.map(dayWords);
  const raws = days.map((d) => dayRaw(d));
  const named = aliasFinder(places);
  const placeRaw = T(placeText).normalize('NFKC');
  // the book's own city comes from its place or title only; a street, district or nearby town ("Oxford Street", "Whistler")
  // counts for a city only once the book names that city itself or its country somewhere — a Sydney book's "Oxford Street,
  // Paddington" is not London, and it must not become every day's city (Nov 2026)
  const inBook = named(placeRaw + ' \n ' + raws.join(' \n '));
  const fromPlace = named(placeRaw);
  const mainNames = (k) => { const p = places[k] || {}; return [p.name && p.name.en, p.name && p.name.th, ...(p.alias || []).slice(0, 2)].filter(Boolean).map((s) => String(s).normalize('NFKC')); };
  // home places (Thailand, Nov 2026: every trip starts and ends in Bangkok) count only when the book's place or title is about
  // them and about nowhere else — "fly from Bangkok" in a Tokyo book never makes Bangkok a day's city or Thailand the crest
  const home = (k) => !!(places[k] && places[k].home);
  const awayInPlace = Object.keys(fromPlace).some((k) => places[k] && !home(k));
  const homeOk = (c) => !home(c) || (!awayInPlace && (!!fromPlace[c] || (!!places[c].country && !!fromPlace[places[c].country])));
  const ok = (c) => homeOk(c) && (!!fromPlace[c] || (!!inBook[c] && ([...inBook[c].names].some((a) => mainNames(c).includes(a))
    || (!!places[c].country && !!inBook[places[c].country]))));
  const best = (raw, by = named(raw)) => cities.filter(ok).map((c) => [c, by[c] ? by[c].names.size : 0]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1])[0];
  const bookCity = (best(placeRaw, fromPlace) || [null])[0];

  let prev = null;
  const cityOf = raws.map((w) => { const b = best(w); prev = b ? b[0] : prev || bookCity; return prev; });
  const used = new Set();
  // a landmark's keywords without its own city's main name (Nov 2026: "tokyo" in the capsule-toy picture's keywords matched every
  // Tokyo day and beat the city's own scene) — a landmark is picked for the place the day goes to, never for the city it is in
  const mainOf = (city) => { const p = places[city] || {}; return new Set([p.name && p.name.en, p.name && p.name.th, ...(p.alias || []).slice(0, 2)].filter(Boolean).map((s) => lc(s))); };
  // (a piece of the main alias is the name too: "เดลี" inside "นิวเดลี"; but a place's display name may list the places it covers —
  // "Sydney and the Blue Mountains" — and those keep their keywords, or a Blue Mountains day never finds the Three Sisters)
  const aliasMain = (city) => new Set(((places[city] || {}).alias || []).slice(0, 2).map((s) => lc(s)));
  const kwOf = (it) => { if (it.cat !== 'landmark') return it.kw; const city = scopeOf(it.id), main = mainOf(city), part = [...aliasMain(city)];
    return (it.kw || []).filter((k) => { const x = lc(k); return !main.has(x) && !part.some((m) => m.includes(x)); }); };
  // the landscape (t.*) and route (r.*) scenes: for a day the city layer cannot picture — a town the library does not have,
  // or a city without a scene — the one whose keywords the day names (a lake, a glacier, a ferry crossing), unused first
  const wide = items.filter((it) => it.cat === 'day' && (scopeOf(it.id) === 't' || scopeOf(it.id) === 'r'));
  const scene = (i) => {
    const s = wide.map((it) => [it, hits(words[i], it.kw) - (used.has(it.id) ? 0.5 : 0)]).filter(([, n]) => n >= 1).sort((a, b) => b[1] - a[1] || (scopeOf(a[0].id) === 't' ? -1 : 1))[0];
    return s ? s[0] : null;
  };
  const artDays = cityOf.map((city, i) => {
    if (!city) { const w = scene(i); if (!w) return ''; used.add(w.id); return w.id; }
    const pool = items.filter((it) => scopeOf(it.id) === city && (it.cat === 'landmark' || it.cat === 'day'));
    const scored = pool.map((it) => [it, hits(words[i], kwOf(it))]).filter(([it, n]) => n > 0 && !used.has(it.id)).sort((a, b) => b[1] - a[1]);
    // no picture of what the day does: the city's own scene (a picture whose keywords name the city), repeated if need be —
    // never a specific place the day doesn't go to (Fuji on a day spent in Ueno)
    const generic = pool.filter((it) => it.cat === 'day' && hits(lc((it.kw || []).join(' ')), places[city].alias) > 0);
    const pick = (scored[0] && scored[0][0]) || generic.find((it) => !used.has(it.id)) || generic[0] || scene(i);
    if (!pick) return '';
    used.add(pick.id);
    return pick.id;
  });

  const countryOf = (city) => (city && places[city] ? places[city].country : null);
  const stamps = [], seen = new Set();
  cityOf.forEach((city, i) => {
    const c = countryOf(city);
    for (const id of [c && `${c}.stamp`, city && `${city}.stamp`]) if (id && !seen.has(id) && has(id)) { seen.add(id); stamps.push({ art: 'stock:' + id, day: i }); }
  });
  // the living map's pins: a stop named like one of the library's landmarks of the trip's cities shows that picture (stop.art)
  const mapArt = (stop) => {
    const text = lc([T(stop), stop.q || ''].join(' '));
    const best = items.filter((it) => it.cat === 'landmark' && cityOf.includes(scopeOf(it.id))).map((it) => [it, hits(text, kwOf(it))]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1])[0];
    return best ? 'stock:' + best[0].id : '';
  };
  // the crest and the guides are the country the book is about — its place or title names it (a city or the country) — and only
  // without one the first country reached: a Paris book that changes planes in Dubai on day 1 is still French (Nov 2026)
  const reached = [...new Set(cityOf.filter(Boolean).map(countryOf))];
  const ownCountry = reached.find((c) => !!fromPlace[c] || (!!bookCity && countryOf(bookCity) === c));
  const firstCountry = ownCountry || reached[0] || null;
  const crest = firstCountry && has(`${firstCountry}.stamp`) ? 'stock:' + firstCountry + '.stamp' : '';
  // the passport's two guides (S8): the first country's own pair, when the library has both
  const gs = firstCountry ? items.filter((it) => it.cat === 'guide' && scopeOf(it.id) === firstCountry).slice(0, 2) : [];
  const guides = gs.length === 2 ? gs.map((it) => ({ key: it.id.split('.').pop(), art: 'stock:' + it.id, name: it.name, hello: it.hello })) : null;
  const placesUsed = [...new Set(cityOf.filter(Boolean))];
  return {
    artDays: artDays.map((id) => (id ? 'stock:' + id : '')),
    crest,
    guides,
    stamps,
    places: placesUsed,
    countries: [...new Set(placesUsed.map(countryOf).filter(Boolean))],
    filled: artDays.filter(Boolean).length,
    mapArt,
  };
}
