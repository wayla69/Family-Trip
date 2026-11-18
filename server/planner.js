'use strict';
// Plan with the helper (docs/AI-PLANNER.md): the family answers a few questions, the helper drafts the route (one town a night, a line
// a day — one call, editable), then the whole book is written by the PDF import's pipeline from a brief (server/bookimport.js run({brief})).
// Only the answers, the route and the children's AGES leave the server — never a child's name, a photo or a memory.
const CF = require('./countryfacts');

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const one = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, n);
const pick = (v, ok, d) => (ok.includes(v) ? v : d);
const i18n = (x, n = 120) => (x && typeof x === 'object' ? { th: one(x.th || x.en, n), en: one(x.en || x.th, n) } : { th: one(x, n), en: one(x, n) });

// the answers as the server keeps and sends them: every field trimmed and bounded, unknown keys dropped
function cleanAnswers(a) {
  a = a && typeof a === 'object' ? a : {};
  const from = DATE_RE.test(a.from) ? a.from : '', to = DATE_RE.test(a.to) ? a.to : '';
  return {
    dest: one(a.dest, 200), from, to: to && from && to >= from ? to : '', approx: one(a.approx, 80),
    adults: Math.min(8, Math.max(1, parseInt(a.adults, 10) || 2)), seniors: !!a.seniors,
    pace: pick(a.pace, ['slow', 'normal', 'full'], 'slow'), move: pick(a.move, ['transit', 'car', 'mix'], 'mix'),
    budget: pick(a.budget, ['low', 'mid', 'high'], 'mid'),
    stays: one(a.stays, 400), flights: one(a.flights, 200), want: one(a.want, 500), avoid: one(a.avoid, 300),
  };
}
const daysOf = (a) => (a.from && a.to ? Math.round((Date.parse(a.to) - Date.parse(a.from)) / 864e5) + 1 : 0);

// the children by age only, at the trip's start ("two children: 3½ and 1½ years old") — their names never leave the server
function whoLine(kids, date) {
  const at = Date.parse(date || '') || Date.now();
  const ages = (kids || []).map((k) => (k.birth_ym ? Math.max(0, (at - Date.parse(`${k.birth_ym}-01`)) / 31557600000) : null)).filter((x) => x !== null)
    .map((y) => (y < 1 ? `${Math.max(1, Math.round(y * 12))} months` : `${Math.floor(y)}${y % 1 >= 0.5 ? '½' : ''}`));
  if (!ages.length) return (kids || []).length ? `${kids.length} small child${kids.length > 1 ? 'ren' : ''}` : 'no children named';
  return `${ages.length === 1 ? 'one child' : `${ages.length} children`}, aged ${ages.join(' and ')}`;
}

const PACE = { slow: 'slow — one main thing a day, a long nap, home early', normal: 'normal — a main thing and a small one each day', full: 'full days, but still nap-friendly' };
const MOVE = { transit: 'public transport and taxis', car: 'a hire car', mix: 'public transport mostly, a car or taxi where it helps' };
const BUDGET = { low: 'careful with money', mid: 'a middle budget', high: 'comfortable' };
function answersText(a, who) {
  return [`Where: ${a.dest || '(not given)'}`, a.from ? `Dates: ${a.from} to ${a.to || '?'} (${daysOf(a)} days)` : `When: ${a.approx || '(not given)'}`,
    `Who: ${a.adults} adult${a.adults > 1 ? 's' : ''}${a.seniors ? ' (one is older, walks slowly)' : ''} and ${who}`,
    `Pace: ${PACE[a.pace]}`, `Getting around: ${MOVE[a.move]}`, `Budget: ${BUDGET[a.budget]}`,
    a.stays ? `Where we sleep (as typed): ${a.stays}` : 'Where we sleep: not booked yet — suggest areas', a.flights ? `Flights (as typed): ${a.flights}` : '',
    a.want ? `Must do: ${a.want}` : '', a.avoid ? `Avoid / needs: ${a.avoid}` : ''].filter(Boolean).join('\n');
}

const ROUTE_SYS = 'You plan family trips for Thai families with small children. You draft only the route: where the family sleeps each night and the one-line plan of each day. '
  + 'Keep the children\'s naps, an easy arrival and departure day, few hotel changes (a town at least two nights when you can), short legs. Real, well-known places only. '
  + 'Never name the children. Answer with JSON only, no prose, no code fence.';
const routeUser = (a, who, prev, ask) => `${answersText(a, who)}
${prev ? `\nThe route so far (change it as asked, keep what was not asked about):\n${JSON.stringify(prev)}\nAsked: ${one(ask, 400)}` : ''}
Return {"title":{"th","en"} (short, fun, the place's name in it), "place":{"th","en"}, "countries":["2-letter codes in the order visited"], "tz":"IANA zone of the main place", "from":"YYYY-MM-DD", "to":"YYYY-MM-DD",
"days":[{"date":"YYYY-MM-DD","town":{"th","en"},"title":{"th","en"} (one short line),"emoji":"one emoji","stops":[{"th","en"}] (2–3 main stops),"sleep":{"th","en"} (the town or area we sleep in; a hotel only if the family named it)}]}.
One day per date${a.from ? ` from ${a.from} to ${a.to}` : ' (pick sensible dates in the month asked)'}. Thai is natural Thai a Thai parent says (place names the way Thais say them).`;

// the helper's answer → a route the page can show and edit; anything malformed is dropped, the days are one per date
function cleanRoute(r, a) {
  if (!r || typeof r !== 'object' || !Array.isArray(r.days) || !r.days.length) throw Object.assign(new Error('route'), { code: 'route' });
  const days = r.days.slice(0, 31).map((d) => ({
    date: DATE_RE.test(d && d.date) ? d.date : '', town: i18n(d && d.town, 80), title: i18n(d && d.title, 120), emoji: one(d && d.emoji, 8) || '📍',
    stops: (Array.isArray(d && d.stops) ? d.stops : []).slice(0, 4).map((s) => i18n(s, 80)).filter((s) => s.en || s.th), sleep: i18n(d && d.sleep, 120),
  }));
  const from = a.from || (DATE_RE.test(r.from) ? r.from : days[0].date), tz = /^[A-Za-z_]+\/[A-Za-z_+-]+(\/[A-Za-z_+-]+)?$/.test(r.tz || '') ? r.tz : 'Asia/Bangkok';
  // the dates are the family's: day i is from + i, whatever the helper wrote
  if (DATE_RE.test(from)) days.forEach((d, i) => { d.date = new Date(Date.parse(from) + i * 864e5).toISOString().slice(0, 10); });
  return { title: i18n(r.title, 80), place: i18n(r.place, 80), countries: (Array.isArray(r.countries) ? r.countries : []).map((c) => String(c).toLowerCase()).filter((c) => /^[a-z]{2}$/.test(c)).slice(0, 6),
    tz, from: days[0].date, to: days[days.length - 1].date, days };
}
// the parents' edits come back from the page: the same cleaning, the dates laid out again from the first day
const cleanEdited = (r, a) => cleanRoute(r, { ...a, from: (r && DATE_RE.test(r.from) ? r.from : a.from) });

async function route({ client, model, answers, who, prev, ask, take, onUsage }) {
  if (take && !(await take())) throw Object.assign(new Error('limit'), { code: 'limit' });
  // the import's redaction runs on the answers too: a booking number typed into "flights" never leaves the server
  const { text } = require('./bookimport').redact(routeUser(answers, who, prev, ask));
  const msg = await client.messages.stream({ model, max_tokens: 8000, system: ROUTE_SYS, messages: [{ role: 'user', content: text }] }).finalMessage();
  if (onUsage) { try { onUsage(msg.usage || {}); } catch (_) { /* counting never breaks planning */ } }
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refused'), { code: 'refusal' });
  const t = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('').replace(/^```(?:json)?\s*/m, '').replace(/```\s*$/m, '').trim();
  let r; try { r = JSON.parse(t.slice(t.indexOf('{'))); } catch (e) { throw Object.assign(new Error('route json'), { code: 'json' }); }
  return cleanRoute(r, answers);
}

// the brief the book is written from: the answers, then the agreed route day by day
function brief(answers, rt, who) {
  const days = rt.days.map((d, i) => `Day ${i + 1} (${d.date}) — ${d.title.en}; town: ${d.town.en}; main stops: ${d.stops.map((s) => s.en).join(', ') || '—'}; sleep: ${d.sleep.en || d.town.en}`).join('\n');
  return { text: `${answersText(answers, who)}\n\nTrip: ${rt.title.en} — ${rt.place.en}, ${rt.from} to ${rt.to}, time zone ${rt.tz}\nThe agreed route:\n${days}`,
    facts: CF.factsFor(rt.countries), who };
}

// a slug for the new book: the title's words + the year, made unique by the caller
const slugOf = (rt) => `${String(rt.title.en || rt.place.en || 'trip').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'trip'}-${String(rt.from).slice(0, 4)}`;

module.exports = { cleanAnswers, whoLine, route, cleanRoute: cleanEdited, brief, slugOf, daysOf };
