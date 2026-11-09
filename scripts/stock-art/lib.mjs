// The stock art drawing kit (docs/STOCK-ART.md §4, §6): the house style as code — outline #22213A 5 px, round joins,
// bright pastel fills, a white halo round every free-standing picture, kawaii faces on things (owner, Nov 2026: "cuter").
// Only the frame lives here (faces, halo, the round day scene, the stamp ring). Every landmark, food, animal and costume is
// drawn for its own place in scripts/stock-art/places/*.mjs — never a shared template (owner, Nov 2026: "ต้องเป็นเอกลักษณ์
// จริงๆ อย่าทำให้ซ้ำกัน") — and stock:lint refuses two pictures that draw the same thing.

export const INK = '#22213A';
const n = (v) => +(+v).toFixed(1);

// low-level shapes (fill, then an optional stroke width; the outline colour comes from the group; a width of 0 = no outline)
const sw_ = (sw) => (sw === 0 ? ' stroke="none"' : sw ? ` stroke-width="${sw}"` : '');
export const P = (d, fill = 'none', sw) => `<path d="${d}" fill="${fill}"${sw_(sw)}/>`;
export const R = (x, y, w, h, fill, rx = 0, sw) => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rx ? ` rx="${rx}"` : ''} fill="${fill}"${sw_(sw)}/>`;
export const C = (x, y, r, fill, sw) => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="${fill}"${sw_(sw)}/>`;
export const E = (x, y, rx, ry, fill, sw) => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}"${sw_(sw)}/>`;
// a coloured line (stripe, steam, noodles): its own stroke colour
export const Lc = (d, colour, w = 5) => `<path d="${d}" fill="none" stroke="${colour}" stroke-width="${w}"/>`;
export const g = (x, y, s, inner, rot = 0) => `<g transform="translate(${n(x)} ${n(y)})${rot ? ` rotate(${rot})` : ''}${s !== 1 ? ` scale(${n(s)})` : ''}">${inner}</g>`;

// a kawaii face: eyes, pink cheeks, a smile ("o" = a little open mouth, "w" = a cat mouth, "none" = eyes and cheeks only)
export function face(x, y, s = 1, mouth = 'smile') {
  const m = mouth === 'o' ? `<ellipse class="f" cx="${n(x)}" cy="${n(y + 9 * s)}" rx="${n(4 * s)}" ry="${n(5 * s)}" fill="#E4573D" stroke-width="${n(3 * s)}"/>`
    : mouth === 'w' ? `<path class="f" d="M${n(x - 8 * s)} ${n(y + 7 * s)}q${n(4 * s)} ${n(5 * s)} ${n(8 * s)} 0q${n(4 * s)} ${n(5 * s)} ${n(8 * s)} 0" fill="none" stroke-width="${n(3.2 * s)}"/>`
    : mouth === 'none' ? ''
    : `<path class="f" d="M${n(x - 6 * s)} ${n(y + 7 * s)}q${n(6 * s)} ${n(6 * s)} ${n(12 * s)} 0" fill="none" stroke-width="${n(3.5 * s)}"/>`;
  return `<circle class="f" cx="${n(x - 14 * s)}" cy="${n(y)}" r="${n(4.5 * s)}" fill="${INK}" stroke="none"/><circle class="f" cx="${n(x + 14 * s)}" cy="${n(y)}" r="${n(4.5 * s)}" fill="${INK}" stroke="none"/>`
    + `<ellipse class="f" cx="${n(x - 24 * s)}" cy="${n(y + 9 * s)}" rx="${n(7 * s)}" ry="${n(4.5 * s)}" fill="#FF8FA3" stroke="none" opacity=".7"/><ellipse class="f" cx="${n(x + 24 * s)}" cy="${n(y + 9 * s)}" rx="${n(7 * s)}" ry="${n(4.5 * s)}" fill="#FF8FA3" stroke="none" opacity=".7"/>` + m;
}

// the white halo: every shape again in white, thick, under the drawing (opacity=1 so the colouring page leaves it alone)
export function halo(body) {
  return body
    .replace(/<(path|circle|rect|ellipse|polygon)\s+class="f"[^>]*\/>/g, '')
    .replace(/<(path|circle|rect|ellipse|polygon)\b([^>]*?)\/>/g, (_, tag, attrs) => `<${tag}${attrs.replace(/\s(fill|stroke|stroke-width|opacity|stroke-dasharray)="[^"]*"/g, '')} opacity="1"/>`)
    .replace(/<g\b([^>]*)>/g, (_, attrs) => `<g${attrs.replace(/\s(fill|stroke|stroke-width|opacity)="[^"]*"/g, '')}>`);
}
const open = (vb) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`;
const ink = (body, w = 5) => `<g stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round">${body}</g>`;

// a free-standing picture (landmark, sticker): transparent background, white halo, the outline group
export const free = (body) => `${open('0 0 240 240')}\n<g fill="#fff" stroke="#fff" stroke-width="15" stroke-linejoin="round" stroke-linecap="round">${halo(body)}</g>\n${ink(body)}\n</svg>\n`;

// a day picture: a round scene, ringed like the shipped books' day stamps; `body` draws everything inside (sky colour given)
export const scene = (id, sky, body) => `${open('0 0 240 240')}\n<defs><clipPath id="${id}"><circle cx="120" cy="120" r="110"/></clipPath></defs>\n`
  + `<circle cx="120" cy="120" r="120" fill="#fff"/><circle cx="120" cy="120" r="110" fill="${sky}"/>\n<g clip-path="url(#${id})">${ink(body)}</g>\n`
  + `<circle cx="120" cy="120" r="110" fill="none" stroke="${INK}" stroke-width="5"/>\n</svg>\n`;

// a city stamp (scalloped round) or a country stamp (rounded square): the name in the ring, the place's own emblem inside
// (emblem drawn in a 200 frame, inside the inner circle ≈ x 50–150, y 50–150)
export function cityStamp(id, { name, sub, k1, k2, k3, emblem }) {
  const big = name.length > 10 ? 13 : name.length > 7 ? 15 : 19;
  return `${open('0 0 200 200')}\n<defs><path id="${id}-a" d="M 38 100 A 62 62 0 0 1 162 100"/><path id="${id}-b" d="M 30 106 A 70 70 0 0 0 170 106"/></defs>\n`
    + `<circle cx="100" cy="100" r="96" fill="#FFF7F2" stroke="${k1}" stroke-width="5" stroke-dasharray="7 5"/>\n<circle cx="100" cy="100" r="84" fill="none" stroke="${k1}" stroke-width="3"/>\n<circle cx="100" cy="100" r="54" fill="${k3}" stroke="${k1}" stroke-width="3"/>\n`
    + `${ink(emblem, 3.5)}\n`
    + `<text font-family="KIRA UI, Arial, sans-serif" font-weight="800" font-size="${big}" letter-spacing="3" fill="${k1}"><textPath href="#${id}-a" startOffset="50%" text-anchor="middle">${name}</textPath></text>\n`
    + `<text font-family="KIRA UI, Arial, sans-serif" font-weight="700" font-size="11" letter-spacing="3" fill="${k2}"><textPath href="#${id}-b" startOffset="50%" text-anchor="middle">${sub}</textPath></text>\n`
    + `<path d="M22 100l5-3 5 3-5 3zM168 100l5-3 5 3-5 3z" fill="${k1}"/>\n</svg>\n`;
}
export function countryStamp({ name, k2, k3, emblem }) {
  return `${open('0 0 200 200')}\n<rect x="8" y="8" width="184" height="184" rx="34" fill="#FFFDF7" stroke="${k2}" stroke-width="5" stroke-dasharray="8 5"/>\n<rect x="22" y="22" width="156" height="156" rx="24" fill="none" stroke="${k2}" stroke-width="3"/>\n`
    + `${ink(emblem, 3.5)}\n<text x="100" y="166" text-anchor="middle" font-family="KIRA UI, Arial, sans-serif" font-weight="800" font-size="${name.length > 9 ? 15 : 20}" letter-spacing="4" fill="${k2}">${name}</text>\n`
    + `<g fill="${k3}" stroke="${INK}" stroke-width="2"><circle cx="44" cy="46" r="6"/><circle cx="156" cy="46" r="6"/></g>\n</svg>\n`;
}
