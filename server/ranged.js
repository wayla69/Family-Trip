'use strict';
// A voice memo, a clip or a trip's film, to a phone: Safari's <audio>/<video> asks for byte ranges and plays only a 206 answer, and asks
// many times while it plays. Only the bytes asked for are read from storage (storage.js size/stream) — a film of tens of MB read whole
// for every small range was a way to tie up the server's memory and the bucket (review of Nov 2026).
const { pipeline } = require('stream/promises');
async function sendRanged(req, res, media, key, mime) {
  const size = await media.size(key);
  if (size == null) return res.sendStatus(404);
  res.setHeader('Accept-Ranges', 'bytes'); res.type(mime);
  const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
  let a = 0, b = size - 1;
  if (m && !(m[1] === '' && m[2] === '')) {
    a = m[1] === '' ? Math.max(0, size - Number(m[2])) : Number(m[1]);
    b = m[1] !== '' && m[2] !== '' ? Math.min(Number(m[2]), size - 1) : size - 1;
    if (!(a <= b) || a >= size) { res.setHeader('Content-Range', `bytes */${size}`); return res.sendStatus(416); }
    res.status(206); res.setHeader('Content-Range', `bytes ${a}-${b}/${size}`);
  }
  res.setHeader('Content-Length', String(b - a + 1));
  if (req.method === 'HEAD' || size === 0) return res.end();
  try { await pipeline(await media.stream(key, a, b), res); }
  catch (e) { if (!res.headersSent) throw e; res.destroy(); }   // the phone stopped listening (a seek) — nothing to report
}
module.exports = { sendRanged };
