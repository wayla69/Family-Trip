'use strict';
const sharp = require('sharp');

// Re-encode: apply EXIF rotation, strip all metadata (incl. GPS), keep a 2560px display copy + 520px thumbnail.
async function processImage(buf) {
  const base = sharp(buf, { failOn: 'none', limitInputPixels: 120e6 }).rotate();
  const full = await base.clone().resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  const thumb = await base.clone().resize({ width: 520, height: 520, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 74, mozjpeg: true }).toBuffer();
  return { full: full.data, thumb, w: full.info.width, h: full.info.height, ph: await phOf(thumb).catch(() => null) };
}
/* What a photo looks like, coarsely (migration 0029): a 64×64 grey copy, the mean of each 4×4 block → 16×16 bytes as hex. Two copies of
   one picture — the original and one sent over LINE (smaller, re-encoded, its EXIF gone) — correlate above NEAR (0.985); a frame a
   moment later in a burst stays below (0.98 at most on the test set, most under 0.96), another picture far below (0.86 at most).
   The phone computes the same from its own copy (sheets.js phOfBitmap) and asks the server before it sends (POST /api/b/media/near). */
const NEAR = 0.985;
async function phOf(buf) {
  const { data } = await sharp(buf, { failOn: 'none' }).rotate().greyscale().resize(64, 64, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  let out = '';
  for (let by = 0; by < 16; by++) for (let bx = 0; bx < 16; bx++) {
    let s = 0; for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) s += data[(by * 4 + y) * 64 + bx * 4 + x];
    out += Math.round(s / 16).toString(16).padStart(2, '0');
  }
  return out;
}
const PH_RE = /^[0-9a-f]{512}$/;
// how alike two of them are: the correlation of their 256 values (1 = the same picture; a flat picture says 0)
function phCorr(a, b) {
  if (!PH_RE.test(a || '') || !PH_RE.test(b || '')) return 0;
  const x = new Array(256), y = new Array(256); let mx = 0, my = 0;
  for (let i = 0; i < 256; i++) { x[i] = parseInt(a.substr(i * 2, 2), 16); y[i] = parseInt(b.substr(i * 2, 2), 16); mx += x[i]; my += y[i]; }
  mx /= 256; my /= 256; let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < 256; i++) { const dx = x[i] - mx, dy = y[i] - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
  return sxx > 256 && syy > 256 ? sxy / Math.sqrt(sxx * syy) : 0;   // a near-flat picture (a wall, the sky) is never called a copy
}
module.exports = { processImage, phOf, phCorr, PH_RE, NEAR };
