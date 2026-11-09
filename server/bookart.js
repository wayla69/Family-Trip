// A book's own pictures, drawn by Claude as SVG — the same way the two shipped books were drawn (their day circles, crests
// and guide characters are 1–2 KB of hand-written SVG in public/art): one round picture per day (the circles that lead the
// story on the shelf, the day strip, the book pages, the kid games — and, being SVG, the colouring pages too), the book's crest
// (the round stamp on the kids' adventure passport) and the two guide characters. For books that arrive without drawings
// (a PDF import, an app-made book, the sample); the owner's own SVGs stay as they are. Only the plan's words travel (a day's
// title, its timeline headlines, the place) — never a photo, a name or a record. Every answer is checked before it is kept:
// one <svg> with a viewBox, no script, no event handlers, no links, no images, no foreign objects, a size cap; a bad answer
// is asked once more. Files live in the family's storage (d/<trip>/day-<n>.svg, crest.svg, guide-1.svg, guide-2.svg) and are
// served signed-in only. Each drawing is one call on the family's daily Claude cap (STORY_DAILY).
const fs = require('fs');
const path = require('path');

const enabled = () => !!process.env.ANTHROPIC_API_KEY;
const MODEL = () => process.env.ART_MODEL || process.env.STORY_MODEL || 'claude-sonnet-5-5';
const RUNS = () => Math.max(1, Number(process.env.ART_RUNS) || 3);   // full drawings per book (a redraw is a call per picture again)
const MAX_SVG = 12000;   // chars kept: the shipped drawings are 1–3 KB; a crest with its ring of dots about 3 KB

// the owner's drawings as the style sheet (read once): a day circle, the crest, a guide character
const example = (f) => { try { return fs.readFileSync(path.join(__dirname, '..', 'public', 'art', f), 'utf8').trim(); } catch (_) { return ''; } };
const EX = { day: example('hk/day-1.svg'), crest: example('crest/hk.svg'), guide: example('guides/pinky.svg') };

const SYSTEM = 'You draw the pictures of a children\'s travel memory book as SVG code, in the book\'s hand-drawn house style: '
  + 'simple flat shapes, thick dark outlines (stroke #22213A, stroke-width about 2.4 in a 100-unit box; stroke-linejoin and stroke-linecap round), '
  + 'soft flat colours (no gradients, no filters, no text unless asked), two or three big simple things rather than many small ones, cheerful and clear at 48 px. '
  + 'Answer with ONE complete <svg> element and nothing else: no prose, no code fence, no XML declaration, no <script>, no event attributes, no href, no <image>, no <foreignObject>, no external references. '
  + 'Keep it under 3000 characters. Give every id a unique prefix you choose for this picture.';

// a day's circle: the scene of the day from its title, its timeline headlines and the place
const dayPrompt = ({ title, place, lines, accent, n }) => `Draw day ${n}'s round picture: "${title}" — a day of a family trip in ${place}.`
  + (lines.length ? ` Moments of the day: ${lines.join('; ')}.` : '')
  + ` Pick the one or two most iconic things of that day (a landmark, a vehicle, an animal, a landscape, a dish) and draw them big and simple. `
  + `Same frame as the example: viewBox="-4 -4 108 108", a white circle r=50 under a pale filled circle r=46 at (50,50), the scene clipped to that circle; the book's colour is ${accent} — use it or a tint of it for the sky, sea or ground. No text.\n\nExample (the look to match, a different scene):\n${EX.day}`;
// the book's crest: the round passport stamp of the whole trip, an emblem of the place in a ring with the title
const crestPrompt = ({ title, place, when, accent }) => `Draw the book's crest: a round passport stamp / expedition crest for "${title}" — a family trip to ${place}, ${when}. `
  + `Same frame as the example: viewBox="0 0 200 200", a cream disc with a ring of dots, the title in capitals on a text path along the top and "${place.toUpperCase()} · ${when.toUpperCase()}" along the bottom (short; use <text> with font-family sans-serif, font-weight 700, letter-spacing), and in the middle one iconic emblem of ${place} (an animal or a landmark) drawn big and simple. Ink ${accent}, with cream and one warm highlight.\n\nExample (the look to match, a different trip):\n${EX.crest}`;
// the two guides: their names first (one small JSON), then a character each
const namesPrompt = ({ title, place, kids }) => `Invent the two guide characters of the kids' adventure passport for "${title}", a family trip to ${place}. Each is a friendly animal or creature that belongs to ${place} (never a trademarked character). `
  + `The children are ${kids}. Answer with JSON only: {"guides":[{"key":"<a-z, 3-10 letters>","kind":"<the animal, in English>","colour":"<hex>","name":{"th":"…","en":"…"},"hello":{"th":"…","en":"…"}}, {…}]}. `
  + `The hello is one or two warm sentences the guide says to the child, in natural Thai (transliterate the names) and in English, with {name} where the child's name goes; it may name the other guide.`;
const guidePrompt = ({ name, kind, colour, place }) => `Draw the guide character "${name}": a ${kind} from ${place}, a friendly cartoon with a big head, big round eyes, rosy cheeks and a happy smile, facing the viewer, body colour ${colour}. `
  + `Same frame as the example: viewBox="0 0 120 120", no background, stroke #1e293b stroke-width 4 on every shape. No text.\n\nExample (the look to match, a different character):\n${EX.guide}`;

// the answer must be one safe <svg>: nothing that could run or load anything when the file is opened or inlined for colouring
function svgOf(text) {
  const m = /<svg[\s>][\s\S]*?<\/svg>/i.exec(String(text || ''));
  if (!m) return null;
  const svg = m[0];
  if (svg.length > MAX_SVG) return null;
  if (!/\bviewBox="/.test(svg)) return null;
  if (/<\s*(script|image|foreignObject|iframe|object|embed|use|set|animate)/i.test(svg)) return null;
  if (/\bon[a-z]+\s*=/i.test(svg) || /(?:xlink:)?href\s*=\s*["'](?!#)/i.test(svg) || /url\((?!#)/i.test(svg) || /<!ENTITY|<!DOCTYPE/i.test(svg)) return null;   // a link only to an id in the same file (a textPath on its arc)
  if (/javascript:|data:/i.test(svg)) return null;
  return svg;
}
const nameOk = (g) => g && typeof g === 'object' && /^[a-z]{3,10}$/.test(String(g.key || '')) && g.name && typeof g.name.th === 'string' && typeof g.name.en === 'string' && g.name.th.trim() && g.name.en.trim()
  && g.hello && typeof g.hello.th === 'string' && typeof g.hello.en === 'string' && g.hello.th.trim() && g.hello.en.trim();

// one call: ask Claude, read the text back (streamed like the import, so the mock and the SDK agree), count the usage
async function ask(client, user, { take, onUsage, max = 6000 }) {
  if (take && !(await take())) throw Object.assign(new Error('limit'), { code: 'limit' });
  const stream = client.messages.stream({ model: MODEL(), max_tokens: max, system: SYSTEM, messages: [{ role: 'user', content: user }] });
  const msg = await stream.finalMessage();
  if (onUsage) { try { onUsage(msg.usage || {}); } catch (_) { /* counting never breaks a drawing */ } }
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refused'), { code: 'refused' });
  return msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
}
// a drawing: asked once more when the answer is not one safe <svg>
async function drawSvg(client, user, o) {
  let svg = svgOf(await ask(client, user, o));
  if (!svg) svg = svgOf(await ask(client, user, o));
  if (!svg) throw Object.assign(new Error('no usable svg'), { code: 'failed' });
  return svg;
}

// every run draws into its own version folder (v): the book keeps its previous pictures until the new run has finished, and a run that
// stops leaves nothing behind (the caller removes the folder)
const dayKey = (trip, v, n) => `d/${trip}/${v}/day-${n}.svg`;
const crestKey = (trip, v) => `d/${trip}/${v}/crest.svg`;
const guideKey = (trip, v, k) => `d/${trip}/${v}/guide-${k}.svg`;
const FILE_RE = /^(day-\d{1,2}|crest|guide-[12])\.svg$/;
const V_RE = /^[a-z0-9]{4,16}$/;
const CALLS = (days, crest = true, guides = true) => days + (crest ? 1 : 0) + (guides ? 3 : 0);   // one per day still to draw, the crest, the guides' names, two guides (retries on top)

// draw every picture of a book into version v: the days, the crest, then the two guides (their names in one call; kept only when
// both are usable). onStep(done, total) reports progress.
// days[i].skip = that day already has a stock library picture (not drawn, no file); keepCrest = the passport keeps its crest;
// keepGuides = the passport keeps its guides (the country's pair from the library, S8): no names call, no guide drawings
async function drawBook({ trip, v, title, days, place, when, accent, kids, media, client, take, onUsage, onStep = () => {}, keepCrest = false, keepGuides = false }) {
  const total = days.filter((d) => !d.skip).length + (keepCrest ? 0 : 1) + (keepGuides ? 0 : 1) + 1, o = { take, onUsage };
  let done = 0, drawn = 0;
  for (let i = 0; i < days.length; i++) {
    if (days[i].skip) continue;
    await media.put(dayKey(trip, v, i + 1), Buffer.from(await drawSvg(client, dayPrompt({ ...days[i], place, accent, n: i + 1 }), o)), 'image/svg+xml'); drawn++;
    onStep(++done, total);
  }
  if (!keepCrest) {
    await media.put(crestKey(trip, v), Buffer.from(await drawSvg(client, crestPrompt({ title, place, when, accent }), o)), 'image/svg+xml'); drawn++;
    onStep(++done, total);
  }
  let guides = null;
  if (!keepGuides) {
    let j = null;
    for (let k = 0; k < 2 && !j; k++) { try { const t = await ask(client, namesPrompt({ title, place, kids }), o); j = JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1)); } catch (e) { if (e.code === 'limit' || e.code === 'refused') throw e; } }
    const gs = j && Array.isArray(j.guides) ? j.guides.filter(nameOk).slice(0, 2) : [];
    if (gs.length !== 2 || gs[0].key === gs[1].key) throw Object.assign(new Error('no usable guides'), { code: 'failed' });
    onStep(++done, total);
    for (let k = 0; k < 2; k++) { await media.put(guideKey(trip, v, k + 1), Buffer.from(await drawSvg(client, guidePrompt({ name: gs[k].name.en, kind: String(gs[k].kind || 'animal').slice(0, 40), colour: /^#[0-9a-f]{6}$/i.test(gs[k].colour) ? gs[k].colour : '#F9A8C9', place }), o)), 'image/svg+xml'); drawn++; }
    guides = gs.map((g) => ({ key: g.key, name: { th: g.name.th.trim().slice(0, 40), en: g.name.en.trim().slice(0, 40) }, hello: { th: g.hello.th.trim().slice(0, 300), en: g.hello.en.trim().slice(0, 300) } }));
  }
  onStep(++done, total);
  return { drawn, guides };
}

module.exports = { enabled, drawBook, svgOf, dayPrompt, crestPrompt, namesPrompt, guidePrompt, dayKey, crestKey, guideKey, FILE_RE, V_RE, RUNS, CALLS, MODEL, SYSTEM };
