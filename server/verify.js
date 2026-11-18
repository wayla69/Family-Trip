'use strict';
// Plan with the helper, phase 3 (docs/AI-PLANNER.md §11.1, owner-approved Nov 2026): check the book's places on the web — is the
// restaurant still there, are its hours what we think, has the sight moved or closed. Only a place's name and its map address
// (a public street address, never anything about the family) go to the helper, which searches the web with the API's own
// web search tool. The answers are kept on the book (trips.theme.verify) and shown on the check page and on Today.

const one = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, n);
const norm = (x) => String(x || '').toLowerCase().replace(/[^a-z0-9฀-๿一-鿿]+/g, '');
const T = (x) => (x && typeof x === 'object' ? x.en || x.th || '' : x || '');
const BATCH = 8, MAX_PLACES = 32;
const SEARCHES = Math.max(1, Math.min(10, parseInt(process.env.VERIFY_SEARCHES, 10) || 6));   // web searches the helper may make for one batch

// the places of a book worth checking, in the order of the trip: each day's meal picks (and their backups), then its planned stops;
// a name met twice is checked once (on its first day); at most MAX_PLACES
function placesOf(days) {
  const out = [], seen = new Set();
  const add = (name, q, day, kind) => {
    const n = one(name, 120), k = norm(n);
    if (!n || !k || seen.has(k) || out.length >= MAX_PLACES) return;
    seen.add(k); out.push({ name: n, q: one(q || n, 200), day, kind });
  };
  for (const d of days) {
    const pl = d.plan || {};
    for (const p of pl.picks || []) { add(p.name, p.q, d.day_index, 'food'); if (p.alt) add(p.alt.name, p.alt.q, d.day_index, 'food'); }
    for (const s of d.planned || []) if (!/hotel|resort|inn\b|airport|station|port\b|ท่า|สนามบิน|โรงแรม/i.test(`${s.en} ${s.q}`)) add(T(s), s.q, d.day_index, s.kind === 'food' ? 'food' : 'place');
  }
  return out;
}

const SYS = 'You check places for a family trip, using web search: is each place still open for business, where it is, and its usual opening hours. '
  + 'Search for each place by its name and address. Prefer the place\'s own site, an official tourism site or a recent map listing; say "unsure" rather than guess. '
  + 'Answer with JSON only, no prose, no code fence.';
const user = (list) => `Check these places:\n${list.map((p, i) => `${i + 1}. ${p.name} — ${p.q}`).join('\n')}

Return {"places":[{"i": number (as listed), "st": "open"|"closed"|"moved"|"unsure", "hours": "usual opening hours in a few words, in English, or \\"\\"", "note": {"th": "…", "en": "…"} (one short line: what you found — closed since when, moved where, a day it shuts; "" when nothing to say), "url": "the best source you used, or \\"\\""}]} — one entry per place.`;

const ST = ['open', 'closed', 'moved', 'unsure'];
function clean(ans, list) {
  const rows = Array.isArray(ans && ans.places) ? ans.places : [];
  return list.map((p, k) => {
    const a = rows.find((r) => r && Number(r.i) === k + 1) || {};
    const url = /^https?:\/\/[^\s"<>]{3,300}$/.test(String(a.url || '')) ? String(a.url) : '';
    const note = a.note && typeof a.note === 'object' ? { th: one(a.note.th || a.note.en, 200), en: one(a.note.en || a.note.th, 200) } : { th: '', en: '' };
    return { key: norm(p.name), name: p.name, day: p.day, kind: p.kind, st: ST.includes(a.st) ? a.st : 'unsure', hours: one(a.hours, 120), note, url };
  });
}

// one batch: one model call with the web search tool; a long search turn may pause (pause_turn) and is carried on, at most three times
async function checkBatch({ client, model, list, take, onUsage }) {
  if (take && !(await take())) throw Object.assign(new Error('limit'), { code: 'limit' });
  const messages = [{ role: 'user', content: user(list) }];
  let msg, searches = 0;
  for (let round = 0; round < 4; round++) {
    msg = await client.messages.stream({ model, max_tokens: 16000, system: SYS, messages, tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: SEARCHES }] }).finalMessage();
    if (onUsage) { try { onUsage(msg.usage || {}); } catch (_) { /* counting never breaks a check */ } }
    searches += ((msg.usage || {}).server_tool_use || {}).web_search_requests || 0;
    if (msg.stop_reason !== 'pause_turn') break;
    messages.push({ role: 'assistant', content: msg.content });
  }
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refused'), { code: 'refusal' });
  const t = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('').replace(/```(?:json)?/g, '').trim();
  let ans; try { ans = JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1)); } catch (_) { throw Object.assign(new Error('verify json'), { code: 'json' }); }
  return { rows: clean(ans, list), searches };
}

const calls = (n) => Math.ceil(Math.min(n, MAX_PLACES) / BATCH);
module.exports = { placesOf, checkBatch, clean, calls, BATCH, MAX_PLACES, norm };
