'use strict';
// Bedtime story from the day's notes (Handoff §6, docs/ADR.md ADR-6). Only when someone presses the button; text only, never photos.
// Needs ANTHROPIC_API_KEY (Railway variable); otherwise the feature is hidden. ANTHROPIC_BASE_URL is honoured (tests use a local mock).
const Anthropic = require('@anthropic-ai/sdk');
const SDK = Anthropic.default || Anthropic;

const enabled = () => !!process.env.ANTHROPIC_API_KEY;
const MODEL = () => process.env.STORY_MODEL || 'claude-sonnet-5-5';
let client = null;
const api = () => (client = client || new SDK());   // reads ANTHROPIC_API_KEY / ANTHROPIC_BASE_URL
// the bookshelf adds each finished call's token usage to today's row (ai_usage) — set by router()
let usageHook = null;
const onUsage = (fn) => { usageHook = fn; };
const noteUsage = (msg) => { try { if (usageHook && msg && msg.usage) usageHook(msg.usage); } catch (_) { /* counting never breaks a story */ } };

// mode 'sum': two or three lines for the day page of the book (parents' voice), the same facts, the same rules
function sumPrompt(lang) {
  if (lang === 'en') {
    return 'Summarise this family day in 2–3 sentences (at most 60 words) for a printed memory book, in the parents’ voice ("we"), past tense. '
      + 'The children are Mimi (3) and Mika (1½). Use only the facts given — do not invent places, events or words anyone said. '
      + 'Reply with the summary only — no title, no markdown, no emoji.';
  }
  return 'สรุปวันนี้ของครอบครัว 2–3 ประโยค (ไม่เกิน 60 คำ) สำหรับสมุดความทรงจำ เล่าแบบพ่อแม่ ใช้ "เรา" ลูกชื่อ มีมี่ (3 ขวบ) และ มีก้า (1 ขวบครึ่ง) — '
    + 'ใช้เฉพาะข้อมูลที่ให้ ห้ามแต่งสถานที่/เหตุการณ์/คำพูดเพิ่ม ตอบเฉพาะข้อความสรุป ไม่มีหัวข้อ/markdown/อีโมจิ';
}

// mode 'msg': a short note from the parents to the grandparents for LINE; never saved, the parents edit and send it themselves
function msgPrompt(lang) {
  if (lang === 'en') {
    return 'Write a short, warm message (3–5 sentences, at most 80 words) from the parents to the grandparents about today, to send on LINE. '
      + 'The children are Mimi (3) and Mika (1½); use the children’s own words if there are any. Use only the facts given — do not invent places, events or words anyone said. '
      + 'No addresses, no hotel or room details. One or two emoji are fine. Reply with the message only — no greeting line like "Subject", no markdown.';
  }
  return 'เขียนข้อความสั้นๆ อบอุ่น 3–5 ประโยค (ไม่เกิน 80 คำ) จากพ่อแม่ถึงคุณตาคุณยาย เล่าเรื่องวันนี้ สำหรับส่งทาง LINE ลูกชื่อ มีมี่ (3 ขวบ) และ มีก้า (1 ขวบครึ่ง) ถ้ามีคำพูดของเด็กให้ใส่ด้วย — '
    + 'ใช้เฉพาะข้อมูลที่ให้ ห้ามแต่งสถานที่/เหตุการณ์/คำพูดเพิ่ม ไม่ใส่ที่อยู่หรือรายละเอียดที่พัก ใส่อีโมจิได้ 1–2 ตัว ตอบเฉพาะตัวข้อความ ไม่มี markdown';
}

// mode 'talk': three tiny bedtime questions about today for the children, read aloud to them in kid mode
function talkPrompt(lang) {
  if (lang === 'en') {
    return 'Write 3 bedtime questions to ask Mimi (3) and Mika (1½) about today, so they can talk about their day. '
      + 'Use only the facts given — do not invent places, events or words anyone said. Very short, easy to answer for a toddler (who, what, which animal, what colour, did you like…), '
      + 'in little-kid words and full of excitement (“Wow! What colour was the big bus?”). '
      + 'One question per line, each starting with one emoji; no numbers, no markdown. Reply with the 3 lines only.';
  }
  return 'ตั้งคำถามชวนคุยก่อนนอน 3 ข้อ ถามมีมี่ (3 ขวบ) และมีก้า (1 ขวบครึ่ง) เรื่องวันนี้ ให้เด็กได้เล่าเรื่องของวัน — '
    + 'ใช้เฉพาะข้อมูลที่ให้ ห้ามแต่งสถานที่/เหตุการณ์/คำพูดเพิ่ม คำถามสั้นมาก เด็กเล็กตอบได้ง่าย (ใคร อะไร สัตว์อะไร สีอะไร ชอบไหม) '
    + 'ใช้ภาษาเด็ก น้ำเสียงตื่นเต้น ชวนลุ้น (เช่น "ว้าว! รถบัสคันใหญ่สีอะไรน้า?") '
    + 'ข้อละบรรทัด ขึ้นต้นด้วยอีโมจิ 1 ตัว ไม่มีเลขข้อ ไม่มี markdown ตอบเฉพาะคำถาม 3 บรรทัด';
}

// every text Claude writes for the family must sound like the parents themselves, not like an AI
const NATURAL = {
  th: ' — เขียนให้เหมือนพ่อแม่คนไทยพูดเองจริงๆ ใช้ภาษาพูดที่เป็นธรรมชาติ ใช้คำลงท้ายได้ (นะ จ้ะ น้า ค่ะ ครับ) '
    + 'ห้ามใช้สำนวนแบบ AI หรือภาษาหนังสือเกินไป เช่น "วันแสนวิเศษ" "การผจญภัยอันน่าตื่นตาตื่นใจ" "ความทรงจำอันล้ำค่า" "เต็มไปด้วยรอยยิ้มและเสียงหัวเราะ" "ช่างเป็นวันที่…" "ไม่รู้ลืม" '
    + 'ไม่สอนข้อคิด ไม่สรุปว่าวันนี้พิเศษแค่ไหน ไม่ซ้อนคำคุณศัพท์ ไม่ใช้เครื่องหมาย — เล่าสิ่งที่เกิดขึ้นจริงตรงๆ',
  en: ' Write like a real parent talking: plain, natural, everyday words. Avoid AI-sounding phrases such as "magical day", "unforgettable adventure", '
    + '"precious memories", "filled with laughter and joy", "what a day it was", "a day to remember", "truly", "delightful". '
    + 'No morals, no summing up how special the day was, no stacked adjectives, no em dashes. Just tell what happened.',
};

// mode 'letter': the parents' letter to the children, to read when they are older — from the whole trip's notes
function letterPrompt(lang) {
  if (lang === 'en') {
    return 'Write a letter from Mum and Dad to Mimi and Mika about this trip, for them to read when they are grown up (around 15). 200–300 words. '
      + 'Start with "Dear Mimi and Mika," and end with a short line of love from Mum and Dad. Tell them what they did, said and loved on the trip, '
      + 'the small moments, and how it felt to be their parents there. Use only the facts given — do not invent places, events or words anyone said. Plain text, no title, no markdown.';
  }
  return 'เขียนจดหมายจากพ่อกับแม่ถึงมีมี่และมีก้า เรื่องทริปนี้ ให้ลูกอ่านตอนโต (ราว 15 ปี) ยาว 200–300 คำ '
    + 'ขึ้นต้นว่า "ถึงมีมี่และมีก้า" และปิดด้วยประโยคสั้นๆ ว่ารักจากพ่อกับแม่ เล่าว่าลูกทำอะไร พูดอะไร ชอบอะไรในทริปนี้ ช่วงเล็กๆ ที่จำได้ และความรู้สึกของพ่อแม่ตอนนั้น '
    + 'ใช้เฉพาะข้อมูลที่ให้ ห้ามแต่งสถานที่/เหตุการณ์/คำพูดเพิ่ม ข้อความธรรมดา ไม่มีหัวข้อ ไม่มี markdown';
}
// 'likes': what this family likes, from the travel notebook across every trip — for planning the next one
function likesPrompt(lang) {
  if (lang === 'en') {
    return 'From this family\'s travel notebook (their own ratings, tags, the kids\' verdicts and notes, across trips) write what works for this family, for planning the next trip. '
      + 'Short sections with a plain heading line each: Stays · Food · Places · What to skip · Ideas for next time. Use short lines starting with "• ". '
      + 'Name the real places from the notebook as examples. Use only what the notebook says — never invent. At most 220 words. No markdown symbols other than "• ".';
  }
  return 'จากสมุดโน้ตนักเดินทางของครอบครัวนี้ (ดาว แท็ก ความเห็นของเด็กๆ และโน้ตของพ่อแม่ ทุกทริป) สรุปว่าอะไรเวิร์กสำหรับครอบครัวนี้ เพื่อวางแผนทริปหน้า '
    + 'แบ่งหัวข้อสั้นๆ บรรทัดละหัวข้อ: ที่พัก · อาหาร · สถานที่ · สิ่งที่ควรเลี่ยง · ไอเดียทริปหน้า ใต้หัวข้อขึ้นบรรทัดด้วย "• " '
    + 'ยกชื่อที่จริงจากสมุดเป็นตัวอย่าง ใช้เฉพาะที่สมุดบอก ห้ามแต่งเพิ่ม ไม่เกิน 220 คำ ไม่ใช้ markdown นอกจาก "• "';
}
function prompt({ lang, whole, mode }) { return basePrompt({ lang, whole, mode }) + NATURAL[lang === 'en' ? 'en' : 'th']; }
function basePrompt({ lang, whole, mode }) {
  if (mode === 'sum') return sumPrompt(lang);
  if (mode === 'talk') return talkPrompt(lang);
  if (mode === 'letter') return letterPrompt(lang);
  if (mode === 'likes') return likesPrompt(lang);
  if (mode === 'msg') return msgPrompt(lang);
  if (lang === 'en') {
    return `Write an English bedtime story of ${whole ? '250–350' : '120–180'} words starring "Mimi" (3) and "Mika" (1½). `
      + 'Use only the facts given — do not invent places, events or words anyone said. If there is little to go on, make the story shorter. '
      + 'Talk like a children’s picture book for a 3-year-old: tiny words, very short sentences, and make it EXCITING — sound words (Whoosh! Splash! Wow!), '
      + 'a little “guess what happened next?”, a happy repeating line the kids can say along. Put the children’s own words into the story. '
      + 'Then slow down at the end: calm and cosy, and finish with a good-night line. Reply with the story only — no title, no markdown.';
  }
  return `เขียนนิทานก่อนนอนภาษาไทย ${whole ? '250–350' : '120–180'} คำ ตัวเอก "มีมี่" (3 ขวบ) และ "มีก้า" (1 ขวบครึ่ง) — `
    + 'ใช้เฉพาะข้อมูลที่ให้ ห้ามแต่งสถานที่/เหตุการณ์/คำพูดเพิ่ม ถ้าข้อมูลน้อยให้เล่าสั้นลง '
    + 'ใช้ภาษาเด็กแบบนิทานภาพสำหรับเด็ก 3 ขวบ คำง่ายมาก ประโยคสั้นมาก เล่าให้ตื่นเต้นสนุก มีเสียงประกอบ (ว้าว! ฟิ้ว~ ตูม! จ๋อม!) '
    + 'มีชวนลุ้น (แล้วรู้ไหมว่าเจออะไร?) มีประโยคซ้ำๆ ให้เด็กพูดตามได้ ใส่คำพูดของเด็กในเรื่อง '
    + 'ตอนท้ายค่อยๆ ช้าลง สงบ อบอุ่น แล้วปิดด้วยประโยคฝันดี ตอบเฉพาะตัวนิทาน ไม่มีหัวข้อ/markdown';
}

const clean = (s) => s.replace(/^#+\s*/gm, '').replace(/\*\*|__|`/g, '').replace(/^\s*[-*]\s+/gm, '').replace(/\n{3,}/g, '\n\n').trim();

// Streams text chunks through onText; resolves with the cleaned story (or day summary). Throws {code:'refusal'} if declined.
async function writeStory({ lang, whole, mode, facts, onText, signal }) {
  const stream = api().beta.messages.stream({
    model: MODEL(),
    max_tokens: !mode || mode === 'story' || mode === 'letter' ? 4000 : mode === 'likes' ? 2000 : 1000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',                  // a policy decline is re-run server-side on Anthropic's recommended fallback
    output_config: { effort: 'low' },      // a short story from given facts needs little reasoning
    system: prompt({ lang, whole, mode }),
    messages: [{ role: 'user', content: facts }],
  }, { signal });
  for await (const ev of stream) {
    if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') onText(ev.delta.text);
  }
  const msg = await stream.finalMessage();
  noteUsage(msg);
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refusal'), { code: 'refusal' });
  return clean(msg.content.filter((b) => b.type === 'text').map((b) => b.text).join(''));
}

// "Ask the guide": answer a grown-up's question from excerpts of the book's own manual (server/guide.js), never from memory.
// Not saved. Streams like a story; resolves with the cleaned answer.
function askPrompt(lang) {
  if (lang === 'en') {
    return 'You are the pocket guide for a family trip (two small children, Mimi 3 and Mika 1½). Answer the parent’s question using ONLY the excerpts from the trip manual below. '
      + 'If the excerpts do not answer it, say so in one line and name the page of the app to check (Today, Plan, Eat, Stays, SOS, Prep, Learn). '
      + 'Be short and practical: at most 120 words; plain text; short lines starting with "• " are fine; keep times, names and numbers exactly as written. '
      + 'Never invent opening hours, prices, phone numbers or addresses. In an emergency, tell them to call the local emergency number first.';
  }
  return 'คุณคือไกด์ประจำทริปของครอบครัวที่มีลูกเล็กสองคน (มีมี่ 3 ขวบ มีก้า 1 ขวบครึ่ง) ตอบคำถามของพ่อแม่ โดยใช้เฉพาะข้อความจากคู่มือทริปที่ให้มาเท่านั้น '
    + 'ถ้าคู่มือไม่ได้ตอบเรื่องนี้ ให้บอกสั้นๆ ว่าไม่มีในคู่มือ แล้วบอกหน้าในแอปที่ควรดู (วันนี้ แผน ร้านอาหาร ที่พัก ฉุกเฉิน เตรียมตัว เรียนรู้) '
    + 'ตอบสั้นและใช้ได้จริง ไม่เกิน 120 คำ เป็นข้อความธรรมดา ขึ้นบรรทัดด้วย "• " ได้ เวลา ชื่อ และตัวเลขให้คงตามคู่มือ '
    + 'ห้ามแต่งเวลาเปิดปิด ราคา เบอร์โทร หรือที่อยู่ ถ้าเป็นเหตุฉุกเฉิน ให้บอกโทรเบอร์ฉุกเฉินก่อน';
}

// guide = { stable, rest } from server/guide.js: the stable part (trip overview + the day's plan) is the same for every
// question asked from that day, so it goes first and is marked for the prompt cache — a second question within a few
// minutes reads it from the cache (cheaper, faster); the excerpts that match this question and the question follow.
async function askGuide({ lang, guide, q, onText, signal }) {
  const stream = api().beta.messages.stream({
    model: MODEL(),
    max_tokens: 1500,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: askPrompt(lang),
    messages: [{ role: 'user', content: [
      { type: 'text', text: `${lang === 'en' ? 'TRIP MANUAL (excerpts)' : 'คู่มือทริป (บางส่วน)'}:\n${guide.stable}`, cache_control: { type: 'ephemeral' } },
      { type: 'text', text: `${guide.rest}\n\n${lang === 'en' ? 'QUESTION' : 'คำถาม'}: ${q}` },
    ] }],
  }, { signal });
  for await (const ev of stream) {
    if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') onText(ev.delta.text);
  }
  const msg = await stream.finalMessage();
  noteUsage(msg);
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refusal'), { code: 'refusal' });
  return clean(msg.content.filter((b) => b.type === 'text').map((b) => b.text).join(''));
}

// Translate a day's words (Thai ↔ English) for the two-language book: items [{id, text, to}] → {id: translation}.
// Children's words stay a child's words — simple, not polished. Returns only ids it was given.
async function translate({ items, signal }) {
  const stream = api().beta.messages.stream({
    model: MODEL(),
    max_tokens: 4000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: 'Translate each item of a family travel diary into the language in its "to" field ("en" = English, "th" = Thai). '
      + 'Mimi (มีมี่) and Mika (มีก้า) are small children: keep their quotes childlike and simple, do not polish them; keep names, places and numbers as they are. '
      + 'Use natural everyday language, the way a parent would say it, not a stiff word-for-word or bookish translation. '
      + 'Reply with JSON only: an array of {"id": ..., "tr": ...} with the same ids — no markdown, no commentary.',
    messages: [{ role: 'user', content: JSON.stringify(items) }],
  }, { signal });
  const msg = await stream.finalMessage();
  noteUsage(msg);
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refusal'), { code: 'refusal' });
  const raw = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  const a = raw.indexOf('['), z = raw.lastIndexOf(']');
  let arr = [];
  try { arr = JSON.parse(raw.slice(a, z + 1)); } catch (_) { throw Object.assign(new Error('bad json'), { code: 'failed' }); }
  const ids = new Set(items.map((x) => x.id)), out = {};
  for (const x of Array.isArray(arr) ? arr : []) if (x && ids.has(x.id) && typeof x.tr === 'string' && x.tr.trim()) out[x.id] = x.tr.trim().slice(0, 4000);
  return out;
}

module.exports = { enabled, writeStory, askGuide, translate, clean, onUsage, SDK };
