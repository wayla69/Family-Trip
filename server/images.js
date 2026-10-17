'use strict';
const sharp = require('sharp');

// Re-encode: apply EXIF rotation, strip all metadata (incl. GPS), keep a 2560px display copy + 520px thumbnail.
async function processImage(buf) {
  const base = sharp(buf, { failOn: 'none', limitInputPixels: 120e6 }).rotate();
  const full = await base.clone().resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  const thumb = await base.clone().resize({ width: 520, height: 520, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 74, mozjpeg: true }).toBuffer();
  return { full: full.data, thumb, w: full.info.width, h: full.info.height };
}
module.exports = { processImage };
