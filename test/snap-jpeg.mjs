// A camera-like JPEG for the tests of a book from photos: the picture, an EXIF block with the time it was taken (DateTimeOriginal) and
// the camera's own small preview (IFD1: JPEGInterchangeFormat + its length), as phones write it. sharp writes no preview, so the
// EXIF block is put together here, little-endian. Synthetic pictures only — never a real photo.
import sharp from 'sharp';

// main / thumb: JPEG buffers; when: 'YYYY:MM:DD HH:MM:SS'
export function withPreview(main, thumb, when) {
  const dt = Buffer.from(when + '\0', 'latin1');   // 20 bytes
  const entry = (tag, type, count, value) => { const b = Buffer.alloc(12); b.writeUInt16LE(tag, 0); b.writeUInt16LE(type, 2); b.writeUInt32LE(count, 4); b.writeUInt32LE(value, 8); return b; };
  // layout (offsets from the TIFF header): 8 IFD0 (2 entries) · 38 Exif IFD (1 entry) · 56 IFD1 (2 entries) · 86 the date · 106 the preview
  const IFD0 = 8, EXIF = 38, IFD1 = 56, DATE = 86, TH = 106;
  const ifd = (entries, next) => { const n = Buffer.alloc(2); n.writeUInt16LE(entries.length, 0); const nx = Buffer.alloc(4); nx.writeUInt32LE(next, 0); return Buffer.concat([n, ...entries, nx]); };
  const tiff = Buffer.concat([
    Buffer.from([0x49, 0x49, 42, 0, IFD0, 0, 0, 0]),
    ifd([entry(0x0132, 2, 20, DATE), entry(0x8769, 4, 1, EXIF)], IFD1),
    ifd([entry(0x9003, 2, 20, DATE)], 0),
    ifd([entry(0x0201, 4, 1, TH), entry(0x0202, 4, 1, thumb.length)], 0),
    dt, thumb]);
  if (tiff.length !== TH + thumb.length) throw new Error('snap-jpeg: layout');
  const body = Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), tiff]), app1 = Buffer.alloc(4); app1.writeUInt16BE(0xFFE1, 0); app1.writeUInt16BE(body.length + 2, 2);
  return { buffer: Buffer.concat([main.subarray(0, 2), app1, body, main.subarray(2)]), thAt: 2 + 4 + 6 + TH, thLen: thumb.length };
}

// an SVG drawn as a camera JPEG with its preview (160 px wide)
export async function cameraJpeg(svg, when, width = 1200) {
  const main = await sharp(Buffer.from(svg)).resize({ width }).jpeg({ quality: 85 }).toBuffer();
  const thumb = await sharp(Buffer.from(svg)).resize({ width: 160 }).jpeg({ quality: 75 }).toBuffer();
  return withPreview(main, thumb, when);
}

// a café receipt lying on a table (made up: no real shop, no real card)
export function receiptSvg(bg = '#7a5a40', lines = 24, tilt = 0) {
  let rows = ''; for (let i = 0; i < lines; i++) rows += `<text x="70" y="${90 + i * 22}" font-family="monospace" font-size="15" fill="#222">${['Flat white', 'Juice 300ml', 'Lamington x2', 'TOTAL', 'VISA ****', 'Thank you!'][i % 6]}</text><text x="290" y="${90 + i * 22}" font-family="monospace" font-size="15" fill="#222">${((i * 3.7) % 30).toFixed(2)}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="720"><rect width="480" height="720" fill="${bg}"/><g transform="rotate(${tilt} 240 360)"><rect x="50" y="40" width="330" height="${lines * 22 + 80}" fill="#f6f4ee"/>${rows}</g></svg>`;
}
