'use strict';
// app.css for an older Safari (iPadOS 15 on an iPad mini 4 / Air 2, iPadOS 16.0–16.1): color-mix() arrived in Safari 16.2, and a browser
// that does not know it drops every declaration that uses it — buttons lose their fill and borders (white on white). This copy replaces
// each color-mix(in <space>, A [p%], B [q%]) by its stronger colour (the side with ≥ 50 %, the first on a tie), so every colour is still
// there, only the in-between tint is lost. core.js swaps the stylesheet only when CSS.supports says color-mix() is missing.

// the end of a balanced "(…)" that starts at s[open] === '('
function closeParen(s, open) {
  let d = 0;
  for (let i = open; i < s.length; i++) { if (s[i] === '(') d++; else if (s[i] === ')' && --d === 0) return i; }
  return -1;
}
// split on top-level commas only (a var(--x, fallback) or rgb(…) keeps its own)
function args(s) {
  const out = []; let d = 0, last = 0;
  for (let i = 0; i < s.length; i++) { const c = s[i]; if (c === '(') d++; else if (c === ')') d--; else if (c === ',' && d === 0) { out.push(s.slice(last, i)); last = i + 1; } }
  out.push(s.slice(last));
  return out.map((x) => x.trim());
}
// "var(--sun) 40%" → { color: 'var(--sun)', pct: 40 } (the percentage may come first or last)
function side(x) {
  let m = /^(\d+(?:\.\d+)?)%\s+([\s\S]+)$/.exec(x); if (m) return { color: m[2].trim(), pct: +m[1] };
  m = /^([\s\S]+?)\s+(\d+(?:\.\d+)?)%$/.exec(x); if (m) return { color: m[1].trim(), pct: +m[2] };
  return { color: x, pct: null };
}
function pick(inner) {
  const a = args(inner);
  if (a.length < 3) return a[a.length - 1] || 'currentColor';
  const A = side(a[1]), B = side(a[2]);
  const pa = A.pct != null ? A.pct : B.pct != null ? 100 - B.pct : 50;
  return pa >= 50 ? A.color : B.color;
}
// every color-mix(…) in a stylesheet, innermost first, replaced by its stronger colour
function legacy(css) {
  let s = css, guard = 0;
  for (;;) {
    const at = s.lastIndexOf('color-mix(');   // the last one is never inside another that starts later
    if (at < 0 || ++guard > 5000) break;
    const open = at + 'color-mix'.length, close = closeParen(s, open);
    if (close < 0) break;
    s = s.slice(0, at) + pick(s.slice(open + 1, close)) + s.slice(close + 1);
  }
  return s;
}

module.exports = { legacy, pick };
