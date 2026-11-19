'use strict';
// Help and play near a stay (owner, Nov 2026: "โรงพยาบาลเด็ก ร้านยา สนามเด็กเล่น ห้องให้นม"): the built-in list server/care/*.json
// (scripts/care-lint.mjs) — per library town, hospitals that take children, a pharmacy, playgrounds and indoor play, baby rooms,
// each confirmed by a web search in the month `ok` names. Read once; no family data in it or about it.
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'care');
const ORDER = { hospital: 0, pharmacy: 1, play: 2, baby: 3 };
let byPlace = null;

function load() {
  if (byPlace) return byPlace;
  byPlace = new Map();
  let files = [];
  try { files = fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).sort(); } catch { return byPlace; }
  for (const f of files) {
    let j; try { j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); } catch { continue; }
    for (const t of j.towns || []) {
      const rows = (t.places || []).filter((x) => x && x.name && ORDER[x.kind] !== undefined)
        .map((x) => ({ name: x.name, ...(x.zh ? { zh: x.zh } : {}), kind: x.kind, area: x.area, what: x.what, ...(x.why ? { why: x.why } : {}), q: x.q, ok: x.ok }))
        .sort((a, b) => ORDER[a.kind] - ORDER[b.kind]);
      if (rows.length) byPlace.set(t.place, (byPlace.get(t.place) || []).concat(rows));
    }
  }
  return byPlace;
}

// the places of up to 20 library towns: { <place id>: [row, …] } — a town with none is left out
function forPlaces(ids) {
  const m = load(), out = {};
  for (const id of [...new Set((ids || []).map(String))].slice(0, 20)) if (m.has(id)) out[id] = m.get(id);
  return out;
}

module.exports = { forPlaces, load, ORDER };
