'use strict';
// Video clips from the phone (owner, Nov 2026: "วิดีโอ" — up to 30 s). A clip is re-encoded with ffmpeg before it is kept:
// the first 30 s only, at most 1280 px on its long side, H.264 + AAC in an MP4 that starts playing at once (faststart), and
// **every piece of metadata dropped** — a phone video carries where it was filmed (QuickTime ©xyz / ISO 6709 "location" keys),
// the phone's make and model and the time; none of it is kept (CLAUDE.md: no GPS/EXIF kept). A poster frame becomes the thumbnail.
// One clip at a time: a 30 s 4K clip takes a while on a small instance, and two at once would only slow both.
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
const sharp = require('sharp');

const MAX_SECS = 30;
const MAX_IN = 400e6;   // what a phone may send (a 30 s 4K clip can be 200 MB+); the kept file is a few MB
const MIMES = { 'video/mp4': 'mp4', 'video/quicktime': 'mov', 'video/webm': 'webm', 'video/3gpp': '3gp', 'video/x-m4v': 'm4v' };
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

const { ffmpegTurn } = require('./heavy');
function run(args, ms = 240e3) { return ffmpegTurn(() => runNow(args, ms)); }   // one ffmpeg at a time across clips and films (server/heavy.js)
function runNow(args, ms) {
  return new Promise((resolve, reject) => {
    const p = spawn(FFMPEG, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    const timer = setTimeout(() => { p.kill('SIGKILL'); reject(new Error('ffmpeg timeout')); }, ms);
    p.stderr.on('data', (d) => { err = (err + d).slice(-2000); });
    p.on('error', (e) => { clearTimeout(timer); reject(e); });
    p.on('close', (code) => { clearTimeout(timer); code === 0 ? resolve() : reject(Object.assign(new Error('ffmpeg failed'), { detail: err })); });
  });
}
let ok = null;   // is ffmpeg on this machine? (asked once)
async function available() {
  if (ok === null) ok = await run(['-hide_banner', '-version'], 10e3).then(() => true, () => false);
  return ok;
}
let chain = Promise.resolve();   // one clip at a time
// in: the path of the phone's file. Out: { video: Buffer (mp4), thumb: Buffer (jpeg, 520 px), w, h, secs }
function processVideo(inPath) {
  const job = chain.then(() => doProcess(inPath));
  chain = job.catch(() => {});
  return job;
}
async function doProcess(inPath) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mbv-')), out = path.join(dir, 'v.mp4'), still = path.join(dir, 'p.jpg');
  try {
    await run(['-nostdin', '-hide_banner', '-loglevel', 'error', '-y', '-i', inPath, '-t', String(MAX_SECS),
      '-map', '0:v:0', '-map', '0:a:0?',
      '-vf', "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))',format=yuv420p",
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '27', '-profile:v', 'main',
      '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
      '-map_metadata', '-1', '-map_metadata:s:v', '-1', '-map_metadata:s:a', '-1', '-map_chapters', '-1',
      '-fflags', '+bitexact', '-flags:v', '+bitexact', '-flags:a', '+bitexact',
      '-movflags', '+faststart', out]);
    // the poster: a frame half a second in (the first frame is often black), else the very first
    await run(['-nostdin', '-hide_banner', '-loglevel', 'error', '-y', '-ss', '0.5', '-i', out, '-frames:v', '1', still]).catch(() => {});
    if (!fs.existsSync(still) || !fs.statSync(still).size) await run(['-nostdin', '-hide_banner', '-loglevel', 'error', '-y', '-i', out, '-frames:v', '1', still]);
    const video = fs.readFileSync(out), frame = fs.readFileSync(still);
    const meta = await sharp(frame).metadata();
    const thumb = await sharp(frame).resize({ width: 520, height: 520, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true }).toBuffer();
    return { video, thumb, w: meta.width || 0, h: meta.height || 0 };
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
// the phone's upload, streamed to a temporary file (never held in memory), at most MAX_IN bytes
function receive(req) {
  return new Promise((resolve, reject) => {
    const file = path.join(os.tmpdir(), 'mbin-' + crypto.randomBytes(8).toString('hex'));
    const ws = fs.createWriteStream(file);
    let n = 0, done = false;
    const fail = (e) => { if (done) return; done = true; ws.destroy(); fs.rm(file, { force: true }, () => {}); reject(e); };
    req.on('data', (c) => { n += c.length; if (n > MAX_IN) { req.unpipe(ws); req.resume(); fail(Object.assign(new Error('too big'), { code: 'big' })); } });
    req.on('error', fail);
    ws.on('error', fail);
    ws.on('finish', () => { if (!done) { done = true; resolve({ file, bytes: n }); } });
    req.pipe(ws);
  });
}
module.exports = { processVideo, receive, available, MIMES, MAX_SECS, MAX_IN };
