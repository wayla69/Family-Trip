'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { DATA_DIR } = require('./db');

const fileFull = (id) => path.join(DATA_DIR, 'photos', id + '.jpg');
const fileThumb = (id) => path.join(DATA_DIR, 'thumbs', id + '.jpg');

// Re-encode: apply EXIF rotation, strip metadata (incl. GPS), keep a 2560px display copy + 520px thumbnail.
async function saveImage(id, buf) {
  const base = sharp(buf, { failOn: 'none', limitInputPixels: 120e6 }).rotate();
  const full = await base.clone().resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  const thumb = await base.clone().resize({ width: 520, height: 520, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 74, mozjpeg: true }).toBuffer();
  await fs.promises.writeFile(fileFull(id), full.data);
  await fs.promises.writeFile(fileThumb(id), thumb);
  return { w: full.info.width, h: full.info.height };
}
function removeImage(id) {
  for (const f of [fileFull(id), fileThumb(id)]) { try { fs.unlinkSync(f); } catch (_) {} }
}
module.exports = { saveImage, removeImage, fileFull, fileThumb };
