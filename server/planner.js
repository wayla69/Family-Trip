'use strict';
// Plan with the helper (docs/AI-PLANNER.md): the family answers a few questions, the helper drafts the route (one town a night, a line
// a day — one call, editable), then the whole book is written by the PDF import's pipeline from a brief (server/bookimport.js run({brief})).
// Only the answers, the route and the children's AGES leave the server — never a child's name, a photo or a memory.
const CF = require('./countryfacts');

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const one = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, n);
const pick = (v, ok, d) => (ok.includes(v) ? v : d);
const i18n = (x, n = 120) => (x && typeof x === 'object' ? { th: one(x.th || x.en, n), en: one(x.en || x.th, n) } : { th: one(x, n), en: one(x, n) });

// what the family likes and needs, picked as chips on the page (the keys are the page's; the words are what the helper reads)
const LIKES = { animals: 'animals and zoos', aquarium: 'aquariums', sea: 'beach and sea', nature: 'nature and easy walks', park: 'theme parks', play: 'playgrounds and play centres', museum: 'hands-on museums',
  train: 'trains and vehicles', snow: 'snow', farm: 'farms and fruit picking', food: 'local food', shop: 'shopping', culture: 'temples and culture', onsen: 'hot springs' };
const NEEDS = { pram: 'we bring a pram — step-free ways', nap: 'a midday nap back at the hotel', walk: 'little walking', drive: 'no drive over two hours', mild: 'mild food for the children', crowd: 'avoid crowds and queues', early: 'early nights' };
const keysOf = (v, table) => [...new Set((Array.isArray(v) ? v : []).map(String).filter((k) => Object.prototype.hasOwnProperty.call(table, k)))];

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
    len: from ? 0 : Math.min(31, Math.max(0, parseInt(a.len, 10) || 0)),   // how many days, while there are no dates yet
    likes: keysOf(a.likes, LIKES), needs: keysOf(a.needs, NEEDS),
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
  return [`Where: ${a.dest || '(not given)'}`, a.from ? `Dates: ${a.from} to ${a.to || '?'} (${daysOf(a)} days)` : `When: ${a.approx || '(not given)'}${a.len ? ` — ${a.len} days` : ''}`,
    `Who: ${a.adults} adult${a.adults > 1 ? 's' : ''}${a.seniors ? ' (one is older, walks slowly)' : ''} and ${who}`,
    `Pace: ${PACE[a.pace]}`, `Getting around: ${MOVE[a.move]}`, `Budget: ${BUDGET[a.budget]}`,
    a.stays ? `Where we sleep (as typed): ${a.stays}` : 'Where we sleep: not booked yet — suggest areas', a.flights ? `Flights (as typed): ${a.flights}` : '',
    a.likes.length ? `We like: ${a.likes.map((k) => LIKES[k]).join(', ')}` : '', a.needs.length ? `We need: ${a.needs.map((k) => NEEDS[k]).join('; ')}` : '',
    a.want ? `Must do: ${a.want}` : '', a.avoid ? `Avoid / needs: ${a.avoid}` : ''].filter(Boolean).join('\n');
}

const ROUTE_SYS = 'You plan family trips for Thai families with small children. You draft only the route: where the family sleeps each night and the one-line plan of each day, with what a parent wants to know before saying yes. '
  + 'Keep the children\'s naps, an easy arrival and departure day, few hotel changes (a town at least two nights when you can), short legs. Real, well-known places only. '
  + 'Never name the children. Answer with JSON only, no prose, no code fence.';
// two routes to compare (phase 3): one call, two real choices the family can feel the difference between
const TWO = '\n\nGive TWO different routes to choose between — really different (one base and day trips vs moving towns, slower vs fuller, sea vs mountains), both good for small children. Return {"routes":[route, route]} where each route is the object above plus "label":{"th","en"} (2–4 words naming the choice) and "why":{"th","en"} (one line: who it suits).';
const routeUser = (a, who, prev, ask) => `${answersText(a, who)}
${prev ? `\nThe route so far (change it as asked, keep what was not asked about):\n${JSON.stringify(prev)}\nAsked: ${one(ask, 400)}` : ''}
Return {"title":{"th","en"} (short, fun, the place's name in it), "place":{"th","en"}, "countries":["2-letter codes in the order visited"], "tz":"IANA zone of the main place", "from":"YYYY-MM-DD", "to":"YYYY-MM-DD",
"why":{"th","en"} (one line: why this route suits this family), "season":{"th","en"} (one line: the usual weather and crowds at that time of year — say "usually", it is not a forecast),
"cost":{"th","en"} (one line: a rough daily spend for the family on food, getting around and tickets, as a range with ≈ in the local currency — no flights, no hotels), "ahead":[{"th","en"}] (up to 5 things worth booking ahead, a short phrase each; [] when none),
"days":[{"date":"YYYY-MM-DD","town":{"th","en"},"title":{"th","en"} (one short line),"emoji":"one emoji","stops":[{"th","en"}] (2–3 main stops),"sleep":{"th","en"} (the town or area we sleep in; a hotel only if the family named it),
"kid":{"th","en"} (the children's best bit of the day, a few words), "move":{"th","en"} (only on a day we change towns or arrive or leave: how and about how long, e.g. "Shinkansen ≈ 2 h 15"; else ""), "rain":{"th","en"} (a nearby indoor swap for a wet day, a few words)}]}.
One day per date${a.from ? ` from ${a.from} to ${a.to}` : ' (pick sensible dates in the month asked)'}. Thai is natural Thai a Thai parent says (place names the way Thais say them).`;

// optional lines of a route or a day: kept only when they say something
const more = (o, keys) => Object.fromEntries(Object.entries(keys).map(([k, n]) => [k, o && o[k] ? i18n(o[k], n) : null]).filter(([, v]) => v && (v.th || v.en)));
// the helper's answer → a route the page can show and edit; anything malformed is dropped, the days are one per date
function cleanRoute(r, a) {
  if (!r || typeof r !== 'object' || !Array.isArray(r.days) || !r.days.length) throw Object.assign(new Error('route'), { code: 'route' });
  const days = r.days.slice(0, 31).map((d) => ({
    date: DATE_RE.test(d && d.date) ? d.date : '', town: i18n(d && d.town, 80), title: i18n(d && d.title, 120), emoji: one(d && d.emoji, 8) || '📍',
    stops: (Array.isArray(d && d.stops) ? d.stops : []).slice(0, 4).map((s) => i18n(s, 80)).filter((s) => s.en || s.th), sleep: i18n(d && d.sleep, 120),
    ...more(d, { kid: 120, move: 120, rain: 120 }),
  }));
  const from = a.from || (DATE_RE.test(r.from) ? r.from : days[0].date), tz = /^[A-Za-z_]+\/[A-Za-z_+-]+(\/[A-Za-z_+-]+)?$/.test(r.tz || '') ? r.tz : 'Asia/Bangkok';
  // the dates are the family's: day i is from + i, whatever the helper wrote
  if (DATE_RE.test(from)) days.forEach((d, i) => { d.date = new Date(Date.parse(from) + i * 864e5).toISOString().slice(0, 10); });
  const ahead = (Array.isArray(r.ahead) ? r.ahead : []).slice(0, 5).map((x) => i18n(x, 120)).filter((x) => x.en || x.th);
  return { ...more(r, { label: 40, why: 200, season: 200, cost: 200 }), ...(ahead.length ? { ahead } : {}), title: i18n(r.title, 80), place: i18n(r.place, 80), countries: (Array.isArray(r.countries) ? r.countries : []).map((c) => String(c).toLowerCase()).filter((c) => /^[a-z]{2}$/.test(c)).slice(0, 6),
    tz, from: days[0].date, to: days[days.length - 1].date, days };
}
// the parents' edits come back from the page: the same cleaning, the dates laid out again from the first day
const cleanEdited = (r, a) => cleanRoute(r, { ...a, from: (r && DATE_RE.test(r.from) ? r.from : a.from) });

async function route({ client, model, answers, who, prev, ask, take, onUsage, two }) {
  if (take && !(await take())) throw Object.assign(new Error('limit'), { code: 'limit' });
  // the import's redaction runs on the answers too: a booking number typed into "flights" never leaves the server
  const { text } = require('./bookimport').redact(routeUser(answers, who, prev, ask) + (two && !prev ? TWO : ''));
  const msg = await client.messages.stream({ model, max_tokens: 8000, system: ROUTE_SYS, messages: [{ role: 'user', content: text }] }).finalMessage();
  if (onUsage) { try { onUsage(msg.usage || {}); } catch (_) { /* counting never breaks planning */ } }
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refused'), { code: 'refusal' });
  const t = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('').replace(/^```(?:json)?\s*/m, '').replace(/```\s*$/m, '').trim();
  let r; try { r = JSON.parse(t.slice(t.indexOf('{'))); } catch (e) { throw Object.assign(new Error('route json'), { code: 'json' }); }
  if (two && !prev) {   // two routes to choose between: both cleaned the same way; one that does not read is left out, none → an error
    const list = (Array.isArray(r.routes) ? r.routes : []).slice(0, 2).map((x) => { try { return cleanRoute(x, answers); } catch (_) { return null; } }).filter(Boolean);
    if (!list.length) throw Object.assign(new Error('route'), { code: 'route' });
    return list;
  }
  return cleanRoute(r, answers);
}

// "where shall we go?": a few places that suit this family, before there is a destination (one call). Flight times are from Bangkok and
// rough ("≈"); nothing here is a fact the book will print — an idea only fills the "where" box.
const IDEAS_SYS = 'You suggest where a Thai family with small children could travel, flying from Bangkok. Real, well-known, family-friendly places only; an easy flight for the children\'s ages; right for the time of year asked. '
  + 'Never name the children. Answer with JSON only, no prose, no code fence.';
const ideasUser = (a, who) => `${answersText({ ...a, dest: a.dest || '(open — suggest)' }, who)}

Suggest 4 different places (mix near and far, a city and nature or sea) that fit. Return {"ideas":[{"place":{"th","en"} (a city or region, the way Thais say it), "cc":"2-letter country code", "emoji":"one emoji",
"why":{"th","en"} (one line: why it suits these children), "fly":{"th","en"} (e.g. "≈ 6 h direct"), "best":{"th","en"} (a few words: the weather then, usually), "days": number (a good length)}]}.`;
function cleanIdeas(r) {
  return (Array.isArray(r && r.ideas) ? r.ideas : []).slice(0, 4).map((x) => ({ place: i18n(x && x.place, 60), cc: /^[a-z]{2}$/i.test(String(x && x.cc || '')) ? String(x.cc).toLowerCase() : '', emoji: one(x && x.emoji, 8) || '🧭',
    ...more(x, { why: 160, fly: 60, best: 80 }), days: Math.min(21, Math.max(2, parseInt(x && x.days, 10) || 5)) })).filter((x) => x.place.en || x.place.th);
}
async function ideas({ client, model, answers, who, take, onUsage }) {
  if (take && !(await take())) throw Object.assign(new Error('limit'), { code: 'limit' });
  const { text } = require('./bookimport').redact(ideasUser(answers, who));
  const msg = await client.messages.stream({ model, max_tokens: 3000, system: IDEAS_SYS, messages: [{ role: 'user', content: text }] }).finalMessage();
  if (onUsage) { try { onUsage(msg.usage || {}); } catch (_) { /* counting never breaks planning */ } }
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refused'), { code: 'refusal' });
  const t = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('').replace(/^```(?:json)?\s*/m, '').replace(/```\s*$/m, '').trim();
  let r; try { r = JSON.parse(t.slice(t.indexOf('{'))); } catch (e) { throw Object.assign(new Error('ideas json'), { code: 'json' }); }
  const list = cleanIdeas(r);
  if (!list.length) throw Object.assign(new Error('ideas'), { code: 'route' });
  return list;
}

// a plan kept on the server for both parents' phones: the free text goes through the import's redaction piece by piece first,
// so a booking number typed into "stays" or "flights" is not kept
function keepAnswers(a) {
  const c = cleanAnswers(a);
  for (const k of ['dest', 'approx', 'stays', 'flights', 'want', 'avoid']) if (c[k]) c[k] = askClean(c[k]).slice(0, 500);
  return c;
}

// the brief the book is written from: the answers, then the agreed route day by day
function brief(answers, rt, who, eats) {
  const days = rt.days.map((d, i) => `Day ${i + 1} (${d.date}) — ${d.title.en}; town: ${d.town.en}; main stops: ${d.stops.map((s) => s.en).join(', ') || '—'}; sleep: ${d.sleep.en || d.town.en}${d.move ? `; getting there: ${d.move.en}` : ''}${d.kid ? `; the children's best bit: ${d.kid.en}` : ''}${d.rain ? `; if it rains: ${d.rain.en}` : ''}`).join('\n');
  return { text: `${answersText(answers, who)}\n\nTrip: ${rt.title.en} — ${rt.place.en}, ${rt.from} to ${rt.to}, time zone ${rt.tz}\nThe agreed route:\n${days}${eats ? `\n\nPlaces to eat already in the family's library — use them (the name exactly) for the days' meal picks where they fit the day's area:\n${eats.groups.map((g) => `${g.area.en}: ${g.items.map((x) => `${x.name}${x.tag ? ` (${x.tag.en || x.tag})` : ''}`).join('; ')}`).join('\n')}` : ''}`,
    facts: CF.factsFor(rt.countries), who };
}

// a slug for the new book: the title's words + the year, made unique by the caller
const slugOf = (rt) => `${String(rt.title.en || rt.place.en || 'trip').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'trip'}-${String(rt.from).slice(0, 4)}`;

// ---------- phase 2: change one day of a book already made ("it rains", "the little one is unwell", "the place is shut")
// One call writes the day again in both languages from: the day's plan as it stands, tonight's bed (never changed — it is booked),
// the live forecast, the children's ages and what the parents typed. Nothing is saved until the parents press "use this".
const I18 = (x, n = 600) => (x && typeof x === 'object' ? { th: one(x.th || x.en, n), en: one(x.en || x.th, n) } : null);
const DAY_SYS = () => {
  const IMP = require('./bookimport');
  return 'You change one day of a family trip that is already planned, for Thai parents travelling with small children. Keep the date and keep tonight\'s bed exactly (it is booked). '
    + 'Change only what the parents ask for, and what that forces; keep the rest of the day as it was. Prefer places near the day\'s route or tonight\'s bed. '
    + `${IMP.PLAN_RULES} ${IMP.THAI_STYLE} ${IMP.EN_STYLE} Every text is {"th": "…", "en": "…"}.`;
};
function dayUser({ day, place, forecast, ask, who, tz }) {
  const pl = day.plan || {};
  const now = { title: day.title, planned: (day.planned || []).map((p) => ({ en: p.en, th: p.th, q: p.q, kind: p.kind })), timeline: pl.plan || [], legs: (pl.legs || []).map((l) => ({ from: l.from, to: l.to, by: l.by, min: l.min })),
    picks: (pl.picks || []).map((k) => ({ meal: k.meal, name: k.name, what: k.what, q: k.q, alt: k.alt && { name: k.alt.name, q: k.alt.q } })), planB: pl.planB, moving: pl.moving, money: pl.money, tips: pl.tips };
  return `The trip: ${place || '(a family trip)'}, time zone ${tz}. Who: ${who}.
The day as planned now (${day.date}, day ${day.day_index + 1}):
${JSON.stringify(now).slice(0, 14000)}
Tonight's bed (keep it): ${JSON.stringify(pl.stay ? { name: pl.stay.name, addr: pl.stay.addr } : day.sleep || null)}
${forecast ? `Live forecast for this day: ${forecast}` : 'No live forecast for this day.'}
What the parents ask: ${askClean(ask)}

Return the whole day again as JSON: {"why": {th,en} (one short line: what you changed and why), "title": {th,en}, "emoji": "one emoji",
"plan": [{"t": "HH:MM", "h": {th,en} (one emoji + at most 6 fun words), "th": "…", "en": "…" (the details, " · " between pieces), "go": true on exactly one row (the step the family leaves the bed on)}],
"planned": [{"th","en","q" (a full Google Maps query),"kind": "place"|"food"}], "legs": [{"from","to","by": {th,en},"min": number}],
"picks": [{"meal": {th,en},"name","what": {th,en},"q","alt": {"name","q"}}], "planB": {th,en}, "moving": {th,en}, "money": {th,en} (prices as ranges with ≈), "tips": [{th,en}]}`;
}
// the ask goes through the import's redaction piece by piece, so a typed booking number drops only its own piece, not the whole ask
const askClean = (ask) => require('./bookimport').redact(one(ask, 400).split(/\s+[·,;|]\s+|\s*\n\s*/).join('\n')).text.split('\n').filter(Boolean).join(' · ');
const MAPS = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const DIR = (a, b) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(a)}&destination=${encodeURIComponent(b)}`;
// the helper's answer → a day the app can show; the checked-in stops keep their keys (a check-in names its key: never renamed),
// a stop the family already checked in at stays in the day even when the new plan leaves it out
function cleanDay(a, old, checked = new Set()) {
  if (!a || typeof a !== 'object' || !Array.isArray(a.plan) || !a.plan.length) throw Object.assign(new Error('day'), { code: 'day' });
  const op = old.plan || {}, oldPl = Array.isArray(old.planned) ? old.planned : [];
  const norm = (x) => String(x || '').toLowerCase().replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
  let go = false;
  const rows = a.plan.slice(0, 24).map((r) => {
    const row = { ...(/^\d{1,2}:\d{2}$/.test(String(r && r.t || '')) ? { t: String(r.t).padStart(5, '0') } : {}), ...(I18(r && r.h, 60) ? { h: I18(r.h, 60) } : {}), th: one(r && (r.th || r.en), 600), en: one(r && (r.en || r.th), 600) };
    if (r && r.go === true && !go) { row.go = true; go = true; }
    return row;
  }).filter((r) => r.en || r.th);
  const keys = new Set(), keyOf = (en) => { let k = one(en, 80) || 'stop', n = 2; while (keys.has(k)) k = `${one(en, 76)} ${n++}`; keys.add(k); return k; };
  const planned = (Array.isArray(a.planned) ? a.planned : []).slice(0, 16).filter((p) => p && (p.en || p.th)).map((p) => {
    const was = oldPl.find((o) => norm(o.en) === norm(p.en) || (p.th && norm(o.th) === norm(p.th)));
    const key = was && !keys.has(was.key) ? (keys.add(was.key), was.key) : keyOf(p.en || p.th);
    return { key, kind: p.kind === 'food' ? 'food' : 'place', q: one(p.q || p.en, 200), en: one(p.en || p.th, 120), th: one(p.th || p.en, 120), ...(was && was.zh ? { zh: was.zh } : {}) };
  });
  for (const o of oldPl) if (checked.has(o.key) && !planned.some((p) => p.key === o.key)) planned.push(o);   // where we already were stays
  const legs = (Array.isArray(a.legs) ? a.legs : []).slice(0, 10).filter((l) => l && l.from && l.to).map((l) => ({ from: one(l.from, 160), to: one(l.to, 160), by: I18(l.by, 200) || { th: '', en: '' }, min: Math.max(0, Math.min(600, parseInt(l.min, 10) || 0)), url: DIR(one(l.from, 160), one(l.to, 160)) }));
  const picks = (Array.isArray(a.picks) ? a.picks : []).slice(0, 6).filter((k) => k && k.name && I18(k.meal, 60)).map((k) => ({ meal: I18(k.meal, 60), name: one(k.name, 120), ...(I18(k.what, 300) ? { what: I18(k.what, 300) } : {}), q: one(k.q || k.name, 200),
    ...(k.alt && k.alt.name ? { alt: { name: one(k.alt.name, 120), q: one(k.alt.q || k.alt.name, 200) } } : {}) }));
  const plan = { ...op, plan: rows };
  if (legs.length) plan.legs = legs; else delete plan.legs;
  if (picks.length) plan.picks = picks;
  for (const k of ['planB', 'moving', 'money']) { const v = I18(a[k], 1500); if (v && (v.th || v.en)) plan[k] = v; }
  const tips = (Array.isArray(a.tips) ? a.tips : []).map((x) => I18(x, 500)).filter((x) => x && (x.en || x.th)).slice(0, 8);
  if (tips.length) plan.tips = tips;
  delete plan.prev;
  return { title: I18(a.title, 120) || old.title, emoji: one(a.emoji, 8) || old.emoji || '', planned, plan, why: I18(a.why, 240) || { th: '', en: '' } };
}
async function dayAsk({ client, model, day, place, forecast, ask, who, tz, take, onUsage }) {
  if (take && !(await take())) throw Object.assign(new Error('limit'), { code: 'limit' });
  const { text } = require('./bookimport').redact(dayUser({ day, place, forecast, ask, who, tz }));   // a booking number typed into the ask never leaves
  const msg = await client.messages.stream({ model, max_tokens: 16000, system: DAY_SYS(), messages: [{ role: 'user', content: text }] }).finalMessage();
  if (onUsage) { try { onUsage(msg.usage || {}); } catch (_) { /* counting never breaks planning */ } }
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refused'), { code: 'refusal' });
  const t = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('').replace(/^```(?:json)?\s*/m, '').replace(/```\s*$/m, '').trim();
  try { return JSON.parse(t.slice(t.indexOf('{'))); } catch (e) { throw Object.assign(new Error('day json'), { code: 'json' }); }
}

module.exports = { cleanAnswers, keepAnswers, whoLine, route, ideas, cleanRoute: cleanEdited, brief, slugOf, daysOf, dayAsk, cleanDay, MAPS, LIKES, NEEDS };
