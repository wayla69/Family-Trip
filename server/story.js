'use strict';
// Optional: asks Claude to write a short, warm day story. Needs ANTHROPIC_API_KEY; otherwise the feature is hidden.
const enabled = () => !!process.env.ANTHROPIC_API_KEY;

async function writeStory({ lang, kids, day, trip, moments, stops }) {
  const L = lang === 'th' ? 'Thai' : 'English';
  const prompt = [
    `Write a short, warm bedtime-style story (4-6 sentences, ${L}) about one day of a family road trip, for the children ${kids.join(' and ')} to read when they are older.`,
    'Use ONLY the facts below. Do not invent places, food, weather, people or things anyone said. Simple words, gentle tone, past tense. No title, no emojis.',
    `Trip: ${trip}. Day ${day.n}: ${day.title}.`,
    stops.length ? `Places and meals they checked in at: ${stops.join('; ')}.` : 'No check-ins that day.',
    moments.length ? `Moments written down by the parents:\n- ${moments.join('\n- ')}` : 'No written moments that day.',
  ].join('\n');
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: process.env.STORY_MODEL || 'claude-sonnet-5-5', max_tokens: 700, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!r.ok) throw new Error('story ' + r.status);
  const j = await r.json();
  return (j.content || []).map((c) => c.text || '').join('').trim();
}
module.exports = { enabled, writeStory };
