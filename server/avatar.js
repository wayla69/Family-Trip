// A child's own cartoon character, drawn by OpenAI's image model from one photo the parents upload at #/family.
// The photo is shrunk to 1024 px and sent once (OPENAI_API_KEY on the server is the owner's switch); only the drawing is kept:
// a full figure on a transparent background and a round-crop face, both PNG in the family's own storage. A few tries a year
// per child (AVATAR_YEARLY, default 3); a failed try does not count.
const sharp = require('sharp');

const enabled = () => !!process.env.OPENAI_API_KEY;
const MODEL = () => process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const QUALITY = () => (['low', 'medium', 'high'].includes(process.env.OPENAI_IMAGE_QUALITY) ? process.env.OPENAI_IMAGE_QUALITY : 'medium');
const YEARLY = () => Math.max(1, Number(process.env.AVATAR_YEARLY) || 3);
const BASE = () => (process.env.OPENAI_BASE_URL || 'https://api.openai.com').replace(/\/+$/, '');

// one style for every family, so the characters sit well with the app's own drawings (thick outline, flat soft colour, big head)
const PROMPT = 'Turn the child in this photo into a cute cartoon character for a children\'s travel memory book. '
  + 'Full body, standing, facing the viewer, a happy friendly smile, arms relaxed. Chibi proportions: a big round head and a small body. '
  + 'Clean thick dark navy outlines, flat soft colours with only light shading, rosy cheeks, big shiny eyes. '
  + 'Keep what makes the child recognisable: the hairstyle and hair colour, the skin tone, and the colours and pattern of the clothes in the photo. '
  + 'Simple sneakers. Only the child: no background, no text, no props, no other people. Transparent background.';

// the child's age as the prompt says it: "18 months" under two, else "3 years" / "3 and a half years"
const ageWords = (m) => (m == null ? '' : m < 24 ? `${m} months` : `${Math.floor(m / 12)}${m % 12 >= 6 ? ' and a half' : ''} years`);
// photo (any image) → { full: PNG, face: PNG, usage }; ageM = the child's age in months today, so the character is drawn at that age
async function draw(photo, { signal, ageM = null } = {}) {
  const src = await sharp(photo, { failOn: 'none', limitInputPixels: 120e6 }).rotate().resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true }).png().toBuffer();
  const fd = new FormData();
  fd.append('model', MODEL());
  fd.append('image', new Blob([src], { type: 'image/png' }), 'child.png');
  fd.append('prompt', ageM == null ? PROMPT : `${PROMPT} The child is ${ageWords(ageM)} old: draw them at exactly that age (body proportions, face, hair length), even if the photo is older.`);
  fd.append('size', '1024x1536');
  fd.append('quality', QUALITY());
  fd.append('background', 'transparent');
  fd.append('output_format', 'png');
  fd.append('n', '1');
  let r;
  try { r = await fetch(`${BASE()}/v1/images/edits`, { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body: fd, signal: signal || AbortSignal.timeout(240000) }); }
  catch (e) { throw Object.assign(new Error(`openai: ${e.message}`), { code: 'failed' }); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = (j.error && j.error.message) || `http ${r.status}`;
    // the model's safety system turned the picture down: say so, and the try is not counted
    throw Object.assign(new Error(`openai: ${msg}`), { code: /safety|moderation|policy/i.test(msg) ? 'refused' : 'failed', status: r.status });
  }
  const b64 = j.data && j.data[0] && j.data[0].b64_json;
  if (!b64) throw Object.assign(new Error('openai: no image'), { code: 'failed' });
  // trim the empty margin, keep a tidy size; the face is the top of the figure (a chibi head is its upper part), squared
  const full = await sharp(Buffer.from(b64, 'base64')).trim({ threshold: 1 }).resize({ height: 900, withoutEnlargement: true }).png({ compressionLevel: 9 }).toBuffer();
  const m = await sharp(full).metadata();
  const side = Math.min(m.width, m.height);
  const face = await sharp(full).extract({ left: Math.max(0, Math.round((m.width - side) / 2)), top: 0, width: side, height: Math.min(side, m.height) })
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toBuffer();
  return { full, face, usage: j.usage || null };
}

module.exports = { enabled, draw, ageWords, YEARLY, MODEL, PROMPT };
