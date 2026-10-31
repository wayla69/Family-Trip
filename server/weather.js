'use strict';
// Live forecast for the Today page, from Open-Meteo (free, no key, no account). The server sends only a town-level point for
// each night's stay (seed `stay.ll`) and the book's timezone — never the phone's location or anything about the family.
// It asks only once the trip is within the forecast horizon, remembers each answer for three hours, and fails soft: a day
// without a forecast is simply an empty line on the page.
const BASE = () => process.env.WX_BASE_URL || 'https://api.open-meteo.com';
const HORIZON = () => Math.max(1, parseInt(process.env.WX_HORIZON_DAYS, 10) || 16);   // Open-Meteo looks 16 days ahead
const TTL = 3 * 3600e3, TTL_FAIL = 10 * 60e3;
const cache = new Map();   // "lat,lon,tz" → { at, daily: { 'YYYY-MM-DD': {tmin, tmax, pop, code} } }
const round2 = (n) => Math.round(Number(n) * 100) / 100;

async function daily(lat, lon, tz) {
  const key = `${lat},${lon},${tz}`, hit = cache.get(key);
  if (hit && Date.now() - hit.at < (hit.failed ? TTL_FAIL : TTL)) return hit.daily;
  try {
    const u = new URL('/v1/forecast', BASE());
    u.search = new URLSearchParams({ latitude: String(lat), longitude: String(lon), timezone: tz, forecast_days: String(HORIZON()),
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code' }).toString();
    const r = await fetch(u, { signal: AbortSignal.timeout(8000), headers: { accept: 'application/json' } });
    if (!r.ok) throw new Error('open-meteo ' + r.status);
    const d = (await r.json()).daily || {}, out = {};
    (d.time || []).forEach((date, i) => {
      out[date] = { tmin: d.temperature_2m_min[i], tmax: d.temperature_2m_max[i], pop: d.precipitation_probability_max ? d.precipitation_probability_max[i] : null, code: d.weather_code ? d.weather_code[i] : null };
    });
    cache.set(key, { at: Date.now(), daily: out });
    return out;
  } catch (e) {
    cache.set(key, { at: Date.now(), daily: {}, failed: true });   // don't hammer a service that is down: try again in ten minutes
    return {};
  }
}

// days: [{ date: 'YYYY-MM-DD', ll: [lat, lon] | null }] — a day without its own stay (the flight home) sleeps where the night before did.
// Returns one entry per day: { tmin, tmax, pop, code } or null (too far ahead, trip over, no coordinates, service silent).
async function forecast(days, tz, now = Date.now()) {
  const todayUtc = Math.floor(now / 864e5) * 864e5;
  const first = days.length && Date.parse(days[0].date + 'T00:00:00Z'), last = days.length && Date.parse(days[days.length - 1].date + 'T00:00:00Z');
  if (!days.length || (first - todayUtc) / 864e5 > HORIZON() || last < todayUtc - 864e5) return days.map(() => null);
  let prev = null; const out = [];
  for (const d of days) {
    const ll = Array.isArray(d.ll) && d.ll.length === 2 ? d.ll : prev; prev = ll;
    if (!ll) { out.push(null); continue; }
    const f = await daily(round2(ll[0]), round2(ll[1]), tz || 'UTC');
    out.push(f[d.date] || null);
  }
  return out;
}

module.exports = { forecast, _cache: cache };
