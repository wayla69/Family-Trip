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

// An AVIF the way a phone writes a HEIC: the main picture and its small preview as two items, the preview pointed at the main one by an
// 'iref' 'thmb' (sharp writes no preview item, so the two pictures sharp makes are put together here). Synthetic pictures only.
const boxes = (b, from, to) => { const r = []; let o = from; while (o + 8 <= to) { const size = b.readUInt32BE(o), t = b.toString('latin1', o + 4, o + 8); if (size < 8 || o + size > to) break; r.push({ t, at: o, start: o + 8, end: o + size }); o += size; } return r; };
function avifParts(buf) {   // the primary item of a one-picture AVIF from sharp → its property boxes and its bytes
  const top = boxes(buf, 0, buf.length), meta = top.find((x) => x.t === 'meta'), kids = boxes(buf, meta.start + 4, meta.end), get = (t) => kids.find((x) => x.t === t);
  const pitm = get('pitm'), id = buf.readUInt16BE(pitm.start + 4), iloc = get('iloc'), v = buf[iloc.start];
  if (v > 1) throw new Error('snap-jpeg: iloc v' + v);
  let o = iloc.start + 4; const off = buf[o] >> 4, len = buf[o] & 15, base = buf[o + 1] >> 4; o += 2; const cnt = buf.readUInt16BE(o); o += 2;
  const rd = (q, s) => (s === 0 ? 0 : s === 4 ? buf.readUInt32BE(q) : s === 8 ? Number(buf.readBigUInt64BE(q)) : buf.readUInt16BE(q));
  let data = null;
  for (let i = 0; i < cnt; i++) { const iid = buf.readUInt16BE(o); o += 2; if (v === 1) o += 2; o += 2; const b0 = rd(o, base); o += base; const ec = buf.readUInt16BE(o); o += 2; const parts = [];
    for (let k = 0; k < ec; k++) { const eo = rd(o, off); o += off; const el = rd(o, len); o += len; parts.push(buf.subarray(b0 + eo, b0 + eo + el)); } if (iid === id) data = Buffer.concat(parts); }
  const iprp = get('iprp'), ip = boxes(buf, iprp.start, iprp.end), ipco = ip.find((x) => x.t === 'ipco'), ipma = ip.find((x) => x.t === 'ipma'), all = boxes(buf, ipco.start, ipco.end);
  const props = []; { const mv = buf[ipma.start], wide = buf[ipma.start + 3] & 1; let q = ipma.start + 4; const n = buf.readUInt32BE(q); q += 4;
    for (let i = 0; i < n; i++) { const iid = mv < 1 ? buf.readUInt16BE(q) : buf.readUInt32BE(q); q += mv < 1 ? 2 : 4; const ac = buf[q]; q += 1;
      for (let k = 0; k < ac; k++) { const x = wide ? buf.readUInt16BE(q) : buf[q]; q += wide ? 2 : 1; if (iid === id) props.push({ box: buf.subarray(all[(wide ? x & 0x7FFF : x & 0x7F) - 1].at, all[(wide ? x & 0x7FFF : x & 0x7F) - 1].end), ess: !!(wide ? x & 0x8000 : x & 0x80) }); } } }
  return { ftyp: buf.subarray(top[0].at, top[0].end), props, data };
}
export async function avifWithPreview(svg, width = 1200) {
  const a = avifParts(await sharp(Buffer.from(svg)).resize({ width }).avif({ quality: 50 }).toBuffer()), b = avifParts(await sharp(Buffer.from(svg)).resize({ width: 160 }).avif({ quality: 50 }).toBuffer());
  const u16 = (x) => { const z = Buffer.alloc(2); z.writeUInt16BE(x); return z; }, u32 = (x) => { const z = Buffer.alloc(4); z.writeUInt32BE(x); return z; };
  const box = (t, ...p) => { const body = Buffer.concat(p); return Buffer.concat([u32(body.length + 8), Buffer.from(t, 'latin1'), body]); }, full = (t, v, ...p) => box(t, Buffer.from([v, 0, 0, 0]), ...p);
  const infe = (id) => full('infe', 2, u16(id), u16(0), Buffer.from('av01', 'latin1'), Buffer.from([0]));
  const n1 = a.props.length, ipma = full('ipma', 0, u32(2), u16(1), Buffer.from([n1]), Buffer.from(a.props.map((p, k) => (p.ess ? 128 : 0) | (k + 1))), u16(2), Buffer.from([b.props.length]), Buffer.from(b.props.map((p, k) => (p.ess ? 128 : 0) | (n1 + k + 1))));
  const iloc = (o1) => full('iloc', 0, Buffer.from([0x44, 0]), u16(2), u16(1), u16(0), u16(1), u32(o1), u32(a.data.length), u16(2), u16(0), u16(1), u32(o1 + a.data.length), u32(b.data.length));
  const parts = (o1) => [full('hdlr', 0, u32(0), Buffer.from('pict', 'latin1'), Buffer.alloc(12), Buffer.from([0])), full('pitm', 0, u16(1)), iloc(o1), full('iinf', 0, u16(2), infe(1), infe(2)),
    full('iref', 0, box('thmb', u16(2), u16(1), u16(1))), box('iprp', box('ipco', ...a.props.map((p) => p.box), ...b.props.map((p) => p.box)), ipma)];
  const metaLen = full('meta', 0, ...parts(0)).length, o1 = a.ftyp.length + metaLen + 8;
  return { buffer: Buffer.concat([a.ftyp, full('meta', 0, ...parts(o1)), box('mdat', a.data, b.data)]), thumbBytes: b.data.length };
}
