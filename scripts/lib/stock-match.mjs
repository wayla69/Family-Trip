// Picks pictures from the stock art library for a book (docs/STOCK-ART.md §5.6, S3). Pure: the caller passes the library's
// index (server/stock.js read()); only approved, not withdrawn pictures are considered. Used by plan-to-seed-core toSeed
// when a book has no drawings of its own (a PDF import, the sample, a plan without art).
//
// For each day: which city it is in (the place aliases found in the day's words, else the day before's city, else the book's
// own place), then the picture whose keywords best match the day (a landmark or a day scene of that city, never the same one
// twice while another fits), else an unused picture of that city, else none (the helper may draw it). The passport gets the
// country's stamp as its crest and a stamp per city and country in the order the trip reaches them, each earned on that day.

const lc = (s) => String(s || '').normalize('NFKC').toLowerCase();
const T = (x) => (x && typeof x === 'object' ? [x.th, x.en].join(' ') : String(x || ''));

function dayWords(d) {
  const bits = [T(d.title), T(d.sleep), T(d.moving)];
  for (const s of d.planned || []) bits.push(T(s), s.q || '');
  for (const r of d.plan || []) bits.push(T(r), T(r.h));
  return lc(bits.join(' \n '));
}
// how many of the words appear (a word of one or two Latin letters counts only as a whole word)
function hits(text, words) {
  let n = 0;
  for (const w of words || []) {
    const k = lc(w).trim();
    if (!k) continue;
    if (/^[a-z0-9]{1,3}$/.test(k) ? new RegExp(`\\b${k}\\b`).test(text) : text.includes(k)) n++;
  }
  return n;
}

export function stockMatch(days, placeText, index) {
  const places = (index && index.places) || {};
  const items = ((index && index.items) || []).filter((it) => it && it.ok && !it.withdrawn);
  const cities = Object.keys(places).filter((k) => k.includes('-'));
  const scopeOf = (id) => id.split('.')[0];
  const has = (id) => items.some((it) => it.id === id);
  const words = days.map(dayWords);
  const whole = lc(T(placeText)) + ' \n ' + words.join(' \n ');
  const best = (text) => cities.map((c) => [c, hits(text, places[c].alias)]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1])[0];
  const bookCity = (best(lc(T(placeText))) || best(whole) || [null])[0];

  let prev = null;
  const cityOf = words.map((w) => { const b = best(w); prev = b ? b[0] : prev || bookCity; return prev; });
  const used = new Set();
  const artDays = cityOf.map((city, i) => {
    if (!city) return '';
    const pool = items.filter((it) => scopeOf(it.id) === city && (it.cat === 'landmark' || it.cat === 'day'));
    const scored = pool.map((it) => [it, hits(words[i], it.kw)]).filter(([it, n]) => n > 0 && !used.has(it.id)).sort((a, b) => b[1] - a[1]);
    // no picture of what the day does: the city's own scene (a picture whose keywords name the city), repeated if need be —
    // never a specific place the day doesn't go to (Fuji on a day spent in Ueno)
    const generic = pool.filter((it) => it.cat === 'day' && hits(lc((it.kw || []).join(' ')), places[city].alias) > 0);
    const pick = (scored[0] && scored[0][0]) || generic.find((it) => !used.has(it.id)) || generic[0];
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
  const firstCountry = countryOf(cityOf.find(Boolean));
  const crest = firstCountry && has(`${firstCountry}.stamp`) ? 'stock:' + firstCountry + '.stamp' : '';
  const placesUsed = [...new Set(cityOf.filter(Boolean))];
  return {
    artDays: artDays.map((id) => (id ? 'stock:' + id : '')),
    crest,
    stamps,
    places: placesUsed,
    countries: [...new Set(placesUsed.map(countryOf).filter(Boolean))],
    filled: artDays.filter(Boolean).length,
  };
}
