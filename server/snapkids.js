'use strict';
// A book from photos gets the kids' side a planned book has (docs/SNAP-BOOK.md D7–D8, P4): pictures from the stock library for
// its days, the country's crest, guides and stamps, a colour per day, a secret per town for the adventure map's chests, the
// living map (one stop per place, in the order we reached them) and a certificate for when the book is closed.
// Pure: the caller reads the book and writes back what this returns. Nothing here is about the family — only the place names
// the parents gave (or the library's own) and the library's pictures.
const { stockMatch } = require('../scripts/lib/stock-match.mjs');
const D = require('../scripts/lib/book-defaults.mjs');

const T = (x, l) => (x && typeof x === 'object' ? x[l] || x.en || x.th || '' : String(x || ''));
const light = (hex) => { const m = /^#([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return false; const n = parseInt(m[1], 16); return 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255) > 215; };
const slugOf = (s) => String(s || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9฀-๿]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'here';
const lower1 = (s) => (/^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);

/**
 * @param {object} a
 * @param {{title, theme, passport, open}} a.trip
 * @param {{day_index, title, place, emoji}[]} a.days   in day order
 * @param {{day, key, name}[]} a.checks                 the book's check-ins ('snap.<placeId>' = a library place)
 * @param {object} a.index                              the stock library's index (places + items)
 * @returns {{theme: object, passport: object}}         the book's theme and passport, rebuilt
 */
function snapKids({ trip, days, checks, index }) {
  const places = (index && index.places) || {}, items = new Map(((index && index.items) || []).filter((it) => it && it.ok && !it.withdrawn).map((it) => [it.id, it]));
  const theme = { ...(trip.theme || {}) }, old = trip.passport || {};
  const lib = (k) => (k && k.startsWith('snap.') && places[k.slice(5)] ? k.slice(5) : null);
  const named = new Set(((theme.snap || {}).places || []).filter((id) => places[id]));
  const libDay = days.map((d) => checks.filter((c) => c.day === d.day_index).map((c) => lib(c.key)).filter(Boolean));
  libDay.flat().forEach((id) => named.add(id));
  const nameOf = (id) => [T(places[id].name, 'en'), T(places[id].name, 'th'), ...(places[id].alias || []).slice(0, 2)].join(' · ');
  // what the matcher reads of a day: its name, the place the parents gave, what was checked in, the library places' own names
  const mdays = days.map((d, i) => ({ title: d.title, planned: [d.place, ...checks.filter((c) => c.day === d.day_index).map((c) => c.name), ...libDay[i].map(nameOf)].filter(Boolean) }));
  const placeText = [...named].map(nameOf).join(' \n ') || days.map((d) => T(d.place, 'en') + ' ' + T(d.place, 'th')).join(' \n ');
  const m = stockMatch(mdays, placeText, index);
  // a day's place: the library city the matcher saw (or one checked in), else the name the parents typed
  const cityOf = days.map((d, i) => (m.cityOf && m.cityOf[i]) || libDay[i][0] || null);

  // a photo book's days rarely say what they did, so the matcher falls back to the town's own scene and repeats it: give a repeated
  // day another picture of the same town instead (its scenes first, then its landmarks, in the library's order) — never twice while one is left
  const seen = new Set();
  m.artDays = m.artDays.map((id, i) => {
    if (id && !seen.has(id)) { seen.add(id); return id; }
    const city = cityOf[i] || (m.cityOf && m.cityOf[i]); if (!city) return id;
    const pool = [...items.values()].filter((it) => it.id.startsWith(city + '.') && (it.cat === 'day' || it.cat === 'landmark')).sort((a, b) => (a.cat === b.cat ? 0 : a.cat === 'day' ? -1 : 1));
    const pick = pool.find((it) => !seen.has('stock:' + it.id)); if (!pick) return id;
    seen.add('stock:' + pick.id); return 'stock:' + pick.id;
  });
  m.filled = m.artDays.filter(Boolean).length;
  if (m.filled) theme.artDays = m.artDays; else delete theme.artDays;
  const first = cityOf.find(Boolean);
  if (first && !(theme.snap || {}).accentOwn && places[first].colors && places[first].colors.k1) theme.accent = places[first].colors.k1;
  const accent = theme.accent || '#2C5646';

  const placeName = (i, l) => (cityOf[i] ? T(places[cityOf[i]].name, l) : T(days[i].place, l));
  const townList = (l) => [...new Set(days.map((_, i) => placeName(i, l)).filter(Boolean))];
  const pp = { ...old };
  const style = { ...D.passportStyle({ slug: 'snap', accent, placeTh: townList('th').join(' · ') || T(trip.title, 'th'), placeEn: townList('en').join(' · ') || T(trip.title, 'en') }), crest: '' };
  pp.style = { ...style, ...(old.style || {}), ink: accent, places: style.places };
  const ownCrest = old.style && old.style.crest && !String(old.style.crest).startsWith('stock:');   // the helper drew one: keep it
  // a trip at home (every town a home place: Thailand) wears its first town's stamp — a Khao Yai weekend is about Khao Yai, not "Thailand"
  const towns0 = cityOf.filter(Boolean), homeCrest = towns0.length && towns0.every((c) => places[c].home) && items.has(towns0[0] + '.stamp') ? 'stock:' + towns0[0] + '.stamp' : '';
  if (!ownCrest) pp.style.crest = homeCrest || m.crest || '';
  const ownGuides = Array.isArray(old.guides) && old.guides.length && old.guides.some((g) => g.art && !String(g.art).startsWith('stock:') && !/^\/art\/guides\//.test(g.art));
  if (!ownGuides) pp.guides = m.guides || D.GENERIC_GUIDES;
  pp.stamps = m.stamps;

  // a colour per day (the place's own), and the town's secret for the adventure map's chest: what the day's picture shows
  pp.days = days.map((d, i) => {
    const was = (old.days || [])[i] || {}, c = cityOf[i] && places[cityOf[i]].colors, art = m.artDays[i] && items.get(m.artDays[i].slice(6));
    const kept = (was.facts || []).filter((f) => !f.auto);
    const where = { th: placeName(i, 'th'), en: placeName(i, 'en') };
    const auto = art && where.en ? { th: `ที่${where.th} มี${art.name.th}ให้ดูด้วย`, en: `In ${where.en} you can see ${lower1(art.name.en)}.`, auto: true }
      : where.en || where.th ? { th: `วันนี้เราไปเที่ยว${where.th || where.en}`, en: `Today we went to ${where.en || where.th}.`, auto: true } : null;
    // a day the parents (or the helper) have not named yet is called by its place on the kids' side ("Khao Yai", not "Day 1"),
    // and its passport stamp says where, short (the date stays on the stamp's ring)
    const auto0 = /^(Day \d+)?$/.test(T(d.title, 'en').trim()) && /^(วันที่ \d+)?$/.test(T(d.title, 'th').trim());
    const short = (l) => T(d.place, l) || (cityOf[i] ? (l === 'en' ? T(places[cityOf[i]].name, 'en').split(/ and | & |,/)[0] : T(places[cityOf[i]].name, 'th').split(/และ|,/)[0]) : '');
    const title = auto0 && (short('en') || short('th')) ? { th: short('th') || short('en'), en: short('en') || short('th') } : d.title;
    const stamp = short('en') && short('en').length <= 16 ? short('en').toUpperCase() : was.stamp;
    return { ...was, title, ...(stamp ? { stamp } : {}), acc: (c && c.k1) || accent, tint: c && light(c.k3) ? c.k3 : '#F3F6FA', facts: kept.length ? kept : auto ? [auto] : [], spot: was.spot || [] };
  });

  // the living map: one stop per place, in the order we reached them, laid out left to right in a gentle zigzag
  const stops = [], keyOf = [];
  days.forEach((d, i) => {
    const k = cityOf[i] || (T(d.place, 'en') || T(d.place, 'th') ? 'p-' + slugOf(T(d.place, 'en') || T(d.place, 'th')) : null);
    keyOf.push(k);
    if (!k || stops.some((s) => s.k === k)) return;
    stops.push({ k, e: d.emoji || '📍', th: placeName(i, 'th') || placeName(i, 'en'), en: placeName(i, 'en') || placeName(i, 'th'), ...(m.artDays[i] ? { art: m.artDays[i] } : {}) });
  });
  const n = stops.length;
  stops.forEach((s, j) => { s.x = n > 1 ? Math.round(12 + (76 * j) / (n - 1)) : 50; s.y = n > 1 ? (j % 2 ? 66 : 34) : 50; });
  pp.map = n ? { title: { th: 'แผนที่การผจญภัย', en: 'Our adventure map' }, sea: { th: '', en: '' }, stops, days: keyOf.map((k) => (k ? [k] : [])) } : undefined;
  if (!pp.map) delete pp.map;

  // the certificate: earned when the parents close the book ("we're home"), never by ticking things off
  const towns = { th: townList('th').join(' '), en: townList('en').join(', ') };
  pp.certificate = { title: { th: 'นักผจญภัยตัวจริง', en: 'A true adventurer' },
    text: { th: `เที่ยวจบทริป${T(trip.title, 'th')}${towns.th ? ` — ${towns.th}` : ''}`, en: `completed ${T(trip.title, 'en')}${towns.en ? ` — ${towns.en}` : ''}` } };
  return { theme, passport: pp, stock: m.places.length ? { places: m.places, countries: m.countries } : null };
}

module.exports = { snapKids };
