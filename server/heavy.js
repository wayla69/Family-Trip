'use strict';
/* Heavy work takes turns (owner, Nov 2026: "ตรวจหน่วยความจำของเซิร์ฟเวอร์"): a phone's video clip, the trip's film and the year's film
   each start ffmpeg, and two or three of them at once on a small Railway instance pushed the server and its children past 2 GB (measured
   with scripts/stress: a film, two 1080p clips and a PDF together). One ffmpeg runs at a time — a clip waits for the film's current
   step, not for the whole film, so a phone's upload is never stuck behind minutes of work. The PDF's Chromium has its own one-at-a-time
   queue (server/pdf.js) and closes after two idle minutes. */
let chain = Promise.resolve(), waiting = 0;
function ffmpegTurn(fn) {
  waiting++;
  const job = chain.then(() => fn()).finally(() => { waiting--; });
  chain = job.catch(() => {});
  return job;
}
module.exports = { ffmpegTurn, waiting: () => waiting };
