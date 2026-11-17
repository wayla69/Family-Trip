#!/usr/bin/env node
/* The family map's land (owner, Nov 2026: "แผนที่ของครอบครัว"): Natural Earth's 1:50m land polygons (public domain,
   https://www.naturalearthdata.com — ne_50m_land.geojson from github.com/nvkelso/natural-earth-vector) made small for a phone:
   each ring simplified (Douglas–Peucker, 0.04°), rounded to 0.02°, tiny islands dropped, written as delta-coded integers.
   → public/geo/land.json {v: 1, q: 50, r: [[lon0, lat0, dx, dy, dx, dy, …], …]} (coordinates × q). Read on the phone (views.js
   famMap); nothing about the family is in it.
   node scripts/geo/land.mjs <ne_50m_land.geojson> */
import fs from 'node:fs';
import path from 'node:path';

const src = process.argv[2];
if (!src) { console.error('usage: node scripts/geo/land.mjs <ne_50m_land.geojson>'); process.exit(2); }
const Q = 50, TOL = 0.04, MIN_AREA = 0.02;
const gj = JSON.parse(fs.readFileSync(src, 'utf8'));
function dp(pts, tol) {   // Douglas–Peucker, iterative
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop(); let best = -1, bi = -1;
    const [x1, y1] = pts[a], [x2, y2] = pts[b], dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    for (let i = a + 1; i < b; i++) {   // a closed ring starts and ends on one point: then the distance from that point
      const d = len ? Math.abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / len : Math.hypot(pts[i][0] - x1, pts[i][1] - y1);
      if (d > best) { best = d; bi = i; }
    }
    if (best > tol) { keep[bi] = 1; stack.push([a, bi], [bi, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const area = (r) => { let s = 0; for (let i = 0; i < r.length; i++) { const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % r.length]; s += x1 * y2 - x2 * y1; } return Math.abs(s / 2); };
const rings = [];
for (const f of gj.features) {
  const g = f.geometry, polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
  for (const p of polys) {
    const outer = p[0]; if (area(outer) < MIN_AREA) continue;
    const s = dp(outer, TOL).map(([x, y]) => [Math.round(x * Q), Math.round(y * Q)]).filter((pt, i, a) => !i || pt[0] !== a[i - 1][0] || pt[1] !== a[i - 1][1]);
    if (s.length < 4) continue;
    const out = [s[0][0], s[0][1]]; for (let i = 1; i < s.length; i++) out.push(s[i][0] - s[i - 1][0], s[i][1] - s[i - 1][1]);
    rings.push(out);
  }
}
const dest = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../public/geo/land.json');
fs.writeFileSync(dest, JSON.stringify({ v: 1, q: Q, src: 'Natural Earth 1:50m land (public domain)', r: rings }));
console.log(`${rings.length} rings, ${(fs.statSync(dest).size / 1024).toFixed(0)} KB → ${dest}`);
