'use strict';
// Bedtime story from the day's notes (Handoff §6, docs/ADR.md ADR-6). Only when someone presses the button; text only, never photos.
// Needs ANTHROPIC_API_KEY (Railway variable); otherwise the feature is hidden. ANTHROPIC_BASE_URL is honoured (tests use a local mock).
const Anthropic = require('@anthropic-ai/sdk');
const SDK = Anthropic.default || Anthropic;

const enabled = () => !!process.env.ANTHROPIC_API_KEY;
const MODEL = () => process.env.STORY_MODEL || 'claude-sonnet-5-5';
let client = null;
const api = () => (client = client || new SDK());   // reads ANTHROPIC_API_KEY / ANTHROPIC_BASE_URL

function prompt({ lang, whole }) {
  if (lang === 'en') {
    return `Write an English bedtime story of ${whole ? '250–350' : '120–180'} words starring "Mimi" (3) and "Mika" (1½). `
      + 'Use only the facts given — do not invent places, events or words anyone said. If there is little to go on, make the story shorter. '
      + 'Simple words, short sentences, warm. Put the children’s own words into the story. End with a good-night line. Reply with the story only — no title, no markdown.';
  }
  return `เขียนนิทานก่อนนอนภาษาไทย ${whole ? '250–350' : '120–180'} คำ ตัวเอก "มีมี่" (3 ขวบ) และ "มีก้า" (1 ขวบครึ่ง) — `
    + 'ใช้เฉพาะข้อมูลที่ให้ ห้ามแต่งสถานที่/เหตุการณ์/คำพูดเพิ่ม ถ้าข้อมูลน้อยให้เล่าสั้นลง คำง่าย ประโยคสั้น อบอุ่น ใส่คำพูดของเด็กในเรื่อง '
    + 'ปิดด้วยประโยคฝันดี ตอบเฉพาะตัวนิทาน ไม่มีหัวข้อ/markdown';
}

const clean = (s) => s.replace(/^#+\s*/gm, '').replace(/\*\*|__|`/g, '').replace(/^\s*[-*]\s+/gm, '').replace(/\n{3,}/g, '\n\n').trim();

// Streams text chunks through onText; resolves with the cleaned story. Throws {code:'refusal'} if declined.
async function writeStory({ lang, whole, facts, onText, signal }) {
  const stream = api().beta.messages.stream({
    model: MODEL(),
    max_tokens: 4000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',                  // a policy decline is re-run server-side on Anthropic's recommended fallback
    output_config: { effort: 'low' },      // a short story from given facts needs little reasoning
    system: prompt({ lang, whole }),
    messages: [{ role: 'user', content: facts }],
  }, { signal });
  for await (const ev of stream) {
    if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') onText(ev.delta.text);
  }
  const msg = await stream.finalMessage();
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refusal'), { code: 'refusal' });
  return clean(msg.content.filter((b) => b.type === 'text').map((b) => b.text).join(''));
}

module.exports = { enabled, writeStory, clean, SDK };
