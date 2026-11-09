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
    const scored = pool.map((it) => [it, hits(words[i], it.kw)]).filter(([it, n]) => n > 0 && !used.has(it.id)).sort((a, b) => b[1] - a[1]);
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
    const best = items.filter((it) => it.cat === 'landmark' && cityOf.includes(scopeOf(it.id))).map((it) => [it, hits(text, it.kw)]).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1])[0];
    return best ? 'stock:' + best[0].id : '';
  };
  const firstCountry = countryOf(cityOf.find(Boolean));
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
