'use strict';
/* The family map (owner, Nov 2026: "แผนที่ของครอบครัว ปักหมุดทุกที่ที่เคยไปจากทุกเล่ม ให้เด็กกดดูได้ว่าเคยไปที่ไหนตอนอายุเท่าไร"):
   every town of every book the viewer may see, as pins. A town comes from where the family slept (a day plan's town-level
   `stay.ll`, the same point the weather uses) or, for a book from photos, from the library towns it names (`theme.snap.places`,
   else the days' place names). Each point is named by the nearest library town within 60 km (else the stay's own name) and
   merged with the same book's other points of that town. GET /api/b/famap → {pins: [{trip, id, name, ll, art, c, from, to}]}.
   Nothing is a position of a phone or a photo: only towns of the plans and the place names the parents gave. */
const STOCK = require('./stock');
const fs = require('fs');
const path = require('path');
// a point far from every library town is named by the nearest town of its country's GeoNames list (public/geo/<cc>.json, the
// list the phone reads for photo places), within 40 km — never by the name of a hotel
const GEO = {};
const geoOf = (cc) => { if (!/^[a-z]{2}$/.test(cc || '')) return null; if (!(cc in GEO)) { try { GEO[cc] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'geo', cc + '.json'), 'utf8')); } catch (_) { GEO[cc] = null; } } return GEO[cc]; };

const R = 6371;
const km = (a, b) => { const r = Math.PI / 180, dLa = (b[0] - a[0]) * r, dLo = (b[1] - a[1]) * r, x = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
const llOk = (ll) => Array.isArray(ll) && ll.length === 2 && ll.every((x) => Number.isFinite(Number(x))) && Math.abs(ll[0]) <= 90 && Math.abs(ll[1]) <= 180;

// trips: [{id, title, kind, theme}], days: [{trip_id, day_index, date, place, stay}] (stay = the plan's stay {name, ll}); index = STOCK.read()
function pinsOf(trips, days, index) {
  const towns = Object.entries((index && index.places) || {}).filter(([id, p]) => llOk(p.ll) && id !== p.country);   // towns, not whole countries
  const nearest = (ll) => { let best = null, bd = 60; for (const [id, p] of towns) { const d = km(ll, p.ll); if (d < bd) { bd = d; best = [id, p]; } } return best; };
  const near = (ll, max) => { let best = null, bd = max; for (const [id, p] of towns) { const d = km(ll, p.ll); if (d < bd) { bd = d; best = [id, p]; } } return best; };
  const gnTown = (ll) => {
    const lib = near(ll, 1500), g = lib && geoOf(lib[1].country); if (!g) return null;
    let best = null, bd = 40; for (const x of g.t || []) { const d = km(ll, [x[3], x[4]]); if (d < bd) { bd = d; best = x; } }
    return best ? { id: 'g' + best[0], name: { th: best[2] || best[1], en: best[1] }, ll: [best[3], best[4]] } : null;
  };
  const byName = (nm) => { const n = String(nm || '').trim().toLowerCase(); if (!n) return null; return towns.find(([, p]) => [p.name && p.name.th, p.name && p.name.en, ...(p.aliases || [])].some((x) => String(x || '').toLowerCase() === n)) || null; };
  const pins = [];
  for (const t of trips) {
    const own = [], add = (key, name, ll, art, c, date) => {
      let pin = own.find((x) => x.id === key || km(x.ll, ll) < 15);
      if (!pin) { pin = { trip: t.id, id: key, name, ll: [+ll[0].toFixed(3), +ll[1].toFixed(3)], art, c, from: date, to: date }; own.push(pin); }
      if (date && (!pin.from || date < pin.from)) pin.from = date;
      if (date && (!pin.to || date > pin.to)) pin.to = date;
    };
    const lib = ([id, p], date) => add(id, p.name, p.ll, STOCK.url(id + '.stamp') || '', (p.colors || {}).k1 || '', date);
    const td = days.filter((d) => d.trip_id === t.id).sort((a, b) => a.day_index - b.day_index);
    for (const d of td) {
      const ll = d.stay && llOk(d.stay.ll) ? d.stay.ll.map(Number) : null;
      if (ll) {
        const n = nearest(ll); if (n) { lib(n, d.date); continue; }
        const g = gnTown(ll); if (g) add(g.id, g.name, g.ll, '', '', d.date);
        continue;   // nothing named near it: no pin rather than a hotel's name
      }
      const nm = d.place && (d.place.en || d.place.th);
      for (const part of String(nm || '').split(' · ')) { const m = byName(part); if (m) lib(m, d.date); }
    }
    if (t.kind === 'snap') for (const id of ((t.theme || {}).snap || {}).places || []) { const p = index.places && index.places[id]; if (p && llOk(p.ll) && id !== p.country && !own.some((x) => x.id === id)) lib([id, p], (td[0] || {}).date || null); }
    pins.push(...own);
  }
  return pins;
}

function router({ pool, A, family }) {
  const r = require('express').Router();
  r.get('/api/b/famap', A.requireUser, async (req, res, next) => {
    try {
      const trips = (await pool.query('SELECT id, title, kind, theme FROM trips WHERE family_id=$1', [family])).rows.filter((t) => A.canSee(req.user, t.id));
      const days = (await pool.query(`SELECT d.trip_id, d.day_index, to_char(d.date,'YYYY-MM-DD') date, d.place, d.plan->'stay' AS stay FROM trip_days d JOIN trips t ON t.id = d.trip_id WHERE t.family_id=$1`, [family])).rows;
      res.setHeader('Cache-Control', 'private, no-cache');
      res.json({ pins: pinsOf(trips, days, STOCK.read()) });
    } catch (e) { next(e); }
  });
  return r;
}
module.exports = { pinsOf, router, km };
