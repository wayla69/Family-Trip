// What the old full plan of a day said that Today (opened) and the learn page it links to no longer say — run in the page, for the books named.
// Every piece of text of planHtml(…, {full: true}) must be found; the old page's own headings and buttons are not content.
export const todayLost = (ids) => { const norm = (x) => String(x).toLowerCase().replace(/\s+/g, '').replace(/[↗›‹★·]/g, ''), div = (h) => { const d = document.createElement('div'); d.innerHTML = h; return d; };
      const CHROME = /^(Plan for the day|· \d+ steps|Local tip|Today's picks|All places|The whole day's route|Timeline|Getting around|Tonight|Map|Plan B|Money today|Good to know today|Backup:|Eat along|More places|Learn on the way|Quiz in the car|For the kids|Directions|Weather)/, out = [];
      for (const t of S.trips.filter((x) => ids.includes(x.id))) { const learn = norm(div(viewLearn(t, true)).textContent);
        t.days.forEach((d, i) => { const today = norm(div(viewToday(t, i, true)).textContent), w = document.createTreeWalker(div(planHtml(t, i, true, false, { full: true })), NodeFilter.SHOW_TEXT); let n;
          while ((n = w.nextNode())) { const leaf = n.nodeValue.trim(); if (leaf.length < 2 || CHROME.test(leaf)) continue;
            leaf.split(/\s+·\s+|\s+—\s+|\s*\(|\)\s*/).forEach((x) => { const y = norm(x).replace(/^[—–-]+|[.,;:]+$/g, ''); if (y.length >= 3 && !today.includes(y) && !learn.includes(y)) out.push(`${t.id} d${i + 1}: ${x.slice(0, 50)}`); }); } }); }
      return out; };
