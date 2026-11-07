// A book's own pictures, drawn by OpenAI's image model (the same key and model as the children's characters, server/avatar.js):
// one round picture per day — the "circles" that lead the story on the shelf, the day strip, the book pages and the kid games —
// and the book's crest, the round stamp on the kids' adventure passport. For books that arrive without drawings (a PDF import,
// an app-made book, the sample): the owner's hand-drawn SVGs under public/art stay as they are. Only the plan's words travel
// (a day's title, its timeline headlines, the place) — never a photo, a name or a record. The files live in the family's own
// storage (d/<trip>/day-<n>.png, d/<trip>/crest.png) and are served signed-in only.
const sharp = require('sharp');

const enabled = () => !!process.env.OPENAI_API_KEY;
const MODEL = () => process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const QUALITY = () => (['low', 'medium', 'high'].includes(process.env.OPENAI_IMAGE_QUALITY) ? process.env.OPENAI_IMAGE_QUALITY : 'medium');
const BASE = () => (process.env.OPENAI_BASE_URL || 'https://api.openai.com').replace(/\/+$/, '');
const RUNS = () => Math.max(1, Number(process.env.ART_RUNS) || 3);   // full drawings per book (a redraw costs a call per day)
const SIZE = 640;   // the stored side: the circles are 44–150 px on screen, the passport crest 120 px, the printed book 3 cm

// the house style: the owner's hand-drawn day circles (thick navy outline, flat soft colours, one scene in a round badge)
const STYLE = 'Flat vector-style illustration for a children\'s travel memory book, drawn inside a perfect circle (a round sticker badge) on a transparent background. '
  + 'Clean thick dark-navy outlines, flat soft pastel colours with only light shading, cheerful and simple, no gradients, no photo realism. '
  + 'No text, no letters, no numbers, no people\'s faces, no logos or brand marks. The circle fills the image edge to edge; everything outside the circle is transparent.';

// a day's circle: the scene of the day from its title and its timeline headlines (the fun lines, not the details)
const dayPrompt = ({ title, place, lines, accent }) => `${STYLE} The scene: "${title}" — a day of a family trip in ${place}. `
  + (lines.length ? `Moments of the day: ${lines.join('; ')}. ` : '')
  + `Pick the one or two most iconic things of that day (a landmark, a vehicle, an animal, a landscape) and draw them big and simple. `
  + `The main colour of this book is ${accent}; use it somewhere in the picture.`;
// the book's crest: the round passport stamp of the whole trip — one emblem of the place, a ring with the title
const crestPrompt = ({ title, place, when, accent }) => `${STYLE.replace('No text, no letters, no numbers, ', '')} A round passport stamp / expedition crest for a family trip: "${title}", ${place}, ${when}. `
  + `In the middle one iconic emblem of ${place} (an animal or a landmark), drawn big and simple. Around it a ring with the title "${title.toUpperCase()}" written in clean capital letters at the top and "${place.toUpperCase()}" at the bottom — nothing else written. `
  + `Colours: the ink is ${accent}, with cream and one warm highlight. It should look like a stamp pressed on paper, with a dotted or double border.`;

// one call to the image model → a square PNG, trimmed to its circle and resized; the usage block for the ledger
async function draw(prompt, { signal } = {}) {
  let r;
  try {
    r = await fetch(`${BASE()}/v1/images/generations`, { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL(), prompt, size: '1024x1024', quality: QUALITY(), background: 'transparent', output_format: 'png', n: 1 }), signal: signal || AbortSignal.timeout(240000) });
  } catch (e) { throw Object.assign(new Error(`openai: ${e.message}`), { code: 'failed' }); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = (j.error && j.error.message) || `http ${r.status}`;
    throw Object.assign(new Error(`openai: ${msg}`), { code: /safety|moderation|policy/i.test(msg) ? 'refused' : 'failed', status: r.status });
  }
  const b64 = j.data && j.data[0] && j.data[0].b64_json;
  if (!b64) throw Object.assign(new Error('openai: no image'), { code: 'failed' });
  const png = await sharp(Buffer.from(b64, 'base64')).trim({ threshold: 1 }).resize(SIZE, SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toBuffer();
  return { png, usage: j.usage || null };
}

const dayKey = (trip, n) => `d/${trip}/day-${n}.png`;
const crestKey = (trip) => `d/${trip}/crest.png`;
const FILE_RE = /^(day-\d{1,2}|crest)\.png$/;

// draw every missing picture of a book: days first (a failed day is tried once more, then the run stops and what is drawn stays —
// the next run picks up where this one ended), then the crest. onStep(done, total) reports progress; returns {drawn, usage}
async function drawBook({ trip, title, days, place, when, accent, media, onStep = () => {}, signal }) {
  const total = days.length + 1;
  let done = 0, drawn = 0;
  const usage = { calls: 0, in: 0, out: 0 };
  const add = (u) => { usage.calls++; if (u) { usage.in += u.input_tokens || 0; usage.out += u.output_tokens || 0; } };
  const once = async (prompt) => { try { return await draw(prompt, { signal }); } catch (e) { if (e.code === 'refused') throw e; return draw(prompt, { signal }); } };
  for (let i = 0; i < days.length; i++) {
    const key = dayKey(trip, i + 1);
    if (!(await media.get(key))) {
      const out = await once(dayPrompt({ ...days[i], place, accent }));
      add(out.usage); await media.put(key, out.png, 'image/png'); drawn++;
    }
    onStep(++done, total);
  }
  if (!(await media.get(crestKey(trip)))) {
    const out = await once(crestPrompt({ title, place, when, accent }));
    add(out.usage); await media.put(crestKey(trip), out.png, 'image/png'); drawn++;
  }
  onStep(++done, total);
  return { drawn, usage };
}

module.exports = { enabled, draw, drawBook, dayPrompt, crestPrompt, dayKey, crestKey, FILE_RE, RUNS, MODEL, STYLE };
