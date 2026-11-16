'use strict';
// The online place-name lookup (owner, Nov 2026: "ถามแผนที่ออนไลน์", off unless a parent turns it on, snap.js snapSpot): the phone
// sends a position already rounded to two decimals (~1 km); this rounds it again, asks OpenStreetMap's Nominatim for the named
// place there (a temple, a park, a mall, else the district) in Thai and English, and answers only the names. Nothing about the
// family goes with it (a generic User-Agent, no referrer, no cookie); nothing is logged or stored but an in-memory cache by
// rounded cell. Nominatim's rules: at most one request a second — the calls wait their turn.
const BASE = () => process.env.NOMINATIM_URL || 'https://nominatim.openstreetmap.org';
const UA = 'family-photo-book/1.0 (self-hosted; place names for a private family album)';
const cache = new Map();   // "13.75,100.49" → {name, id} | null
let turn = Promise.resolve(), lastAt = 0;
const pick = (j, lang) => {
  const n = (j && j.namedetails) || {}, a = (j && j.address) || {};
  return String(n[`name:${lang}`] || (lang === 'en' ? n.name : '') || a.tourism || a.leisure || a.amenity || a.suburb || a.village || a.town || a.city_district || a.city || '').trim().slice(0, 80);
};
async function ask(lat, lon) {
  const u = new URL('/reverse', BASE());
  u.search = new URLSearchParams({ format: 'jsonv2', lat: String(lat), lon: String(lon), zoom: '17', namedetails: '1', addressdetails: '1', 'accept-language': 'en' }).toString();
  const r = await fetch(u, { signal: AbortSignal.timeout(6000), headers: { 'user-agent': UA, accept: 'application/json' } });
  if (!r.ok) return null;
  const j = await r.json();
  const en = pick(j, 'en'), th = pick(j, 'th');
  return en || th ? { id: String(j.osm_type || '').slice(0, 1) + String(j.osm_id || ''), name: { th: th || en, en: en || th } } : null;
}
async function near(ll) {
  if (!Array.isArray(ll) || ll.length !== 2) return null;
  const lat = Math.round(Number(ll[0]) * 100) / 100, lon = Math.round(Number(ll[1]) * 100) / 100;
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  const key = `${lat},${lon}`;
  if (cache.has(key)) return cache.get(key);
  const job = turn.then(async () => {
    const wait = lastAt + 1100 - Date.now(); if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastAt = Date.now();
    try { return await ask(lat, lon); } catch (_) { return undefined; }   // undefined: not cached, the phone's own list answers
  });
  turn = job.catch(() => {});
  const out = await job;
  if (out !== undefined) { if (cache.size > 5000) cache.delete(cache.keys().next().value); cache.set(key, out); }
  return out || null;
}
module.exports = { near };
