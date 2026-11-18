'use strict';
// Facts a planned book must get right, from our own table — never from the helper (docs/AI-PLANNER.md §6, owner's decision 18 Nov 2026:
// every country of the picture library). Emergency numbers, plugs and mains voltage, currency, the side of the road, and the visa line
// for a Thai ordinary passport. Visa rules change: every visa line says when it was checked and to check the official site, and a row we
// are not sure of (sure: false) says so plainly — the owner reviews those before launch. CHECKED = when this table was last reviewed.
const CHECKED = '2026-11';

// e = [[en label, th label, number], …] — the first is the main one (shown big on the emergency card)
// (rows reviewed against the Thai Department of Consular Affairs' 2026 list, the countries' own embassies and current reports, 18 Nov 2026;
//  vn = a condition of the rule, said after it)
// v = visa for a Thai ordinary passport: ['free', days] · ['voa'] on arrival · ['evisa'] apply online · ['eta'] travel authorisation online
//     · ['visa'] apply before travel · ['schengen'] a Schengen visa · ['home'] Thailand; s = sure (false → "we have not confirmed this")
const ALL = ['All emergencies', 'เหตุฉุกเฉินทั้งหมด'], POL = ['Police', 'ตำรวจ'], AMB = ['Ambulance', 'รถพยาบาล'], FIRE = ['Fire', 'ดับเพลิง'], AMBF = ['Ambulance · fire', 'รถพยาบาล · ดับเพลิง'];
const E = (...rows) => rows.map(([lab, n]) => [lab[0], lab[1], n]);
const SCH = ['schengen'];
const T = {
  th: { n: ['Thailand', 'ไทย'], e: E([POL, '191'], [AMB, '1669'], [FIRE, '199'], [['Tourist police', 'ตำรวจท่องเที่ยว'], '1155']), plug: 'A/B/C/O', volt: 230, cur: 'THB', side: 'L', v: ['home'], s: true },
  jp: { n: ['Japan', 'ญี่ปุ่น'], e: E([POL, '110'], [AMBF, '119']), plug: 'A/B', volt: 100, cur: 'JPY', side: 'L', v: ['free', 15], s: true },
  kr: { n: ['South Korea', 'เกาหลีใต้'], e: E([POL, '112'], [AMBF, '119']), plug: 'C/F', volt: 220, cur: 'KRW', side: 'R', v: ['eta'], s: true },
  tw: { n: ['Taiwan', 'ไต้หวัน'], e: E([POL, '110'], [AMBF, '119']), plug: 'A/B', volt: 110, cur: 'TWD', side: 'R', v: ['free', 14], s: true },
  hk: { n: ['Hong Kong', 'ฮ่องกง'], e: E([ALL, '999']), plug: 'G', volt: 220, cur: 'HKD', side: 'L', v: ['free', 30], s: true },
  mo: { n: ['Macau', 'มาเก๊า'], e: E([ALL, '999']), plug: 'G', volt: 220, cur: 'MOP', side: 'L', v: ['free', 30], s: true },
  cn: { n: ['China', 'จีน'], e: E([POL, '110'], [AMB, '120'], [FIRE, '119']), plug: 'A/C/I', volt: 220, cur: 'CNY', side: 'R', v: ['free', 30], s: true },
  sg: { n: ['Singapore', 'สิงคโปร์'], e: E([POL, '999'], [AMBF, '995']), plug: 'G', volt: 230, cur: 'SGD', side: 'L', v: ['free', 30], s: true },
  my: { n: ['Malaysia', 'มาเลเซีย'], e: E([ALL, '999']), plug: 'G', volt: 240, cur: 'MYR', side: 'L', v: ['free', 30], s: true },
  vn: { n: ['Vietnam', 'เวียดนาม'], e: E([AMB, '115'], [POL, '113'], [FIRE, '114']), plug: 'A/C/F', volt: 220, cur: 'VND', side: 'R', v: ['free', 30], s: true },
  id: { n: ['Indonesia', 'อินโดนีเซีย'], e: E([ALL, '112'], [POL, '110'], [AMB, '118']), plug: 'C/F', volt: 230, cur: 'IDR', side: 'L', v: ['free', 30], s: true },
  la: { n: ['Laos', 'ลาว'], e: E([POL, '1191'], [AMB, '1195'], [FIRE, '1190']), plug: 'A/B/C/E/F', volt: 230, cur: 'LAK', side: 'R', v: ['free', 30], s: true },
  kh: { n: ['Cambodia', 'กัมพูชา'], e: E([POL, '117'], [AMB, '119'], [FIRE, '118']), plug: 'A/C/G', volt: 230, cur: 'KHR', side: 'R', v: ['free', 14], s: true },
  ph: { n: ['The Philippines', 'ฟิลิปปินส์'], e: E([ALL, '911']), plug: 'A/B/C', volt: 220, cur: 'PHP', side: 'R', v: ['free', 30], s: true },
  mm: { n: ['Myanmar', 'เมียนมา'], e: E([POL, '199'], [AMB, '192'], [FIRE, '191']), plug: 'C/D/F/G', volt: 230, cur: 'MMK', side: 'R', v: ['free', 14], s: true, vn: { en: 'entering by an international airport only', th: 'เฉพาะเข้าทางสนามบินนานาชาติ' } },
  mv: { n: ['The Maldives', 'มัลดีฟส์'], e: E([POL, '119'], [AMB, '102'], [FIRE, '118']), plug: 'D/G', volt: 230, cur: 'MVR', side: 'L', v: ['voa'], s: true },
  in: { n: ['India', 'อินเดีย'], e: E([ALL, '112']), plug: 'C/D/M', volt: 230, cur: 'INR', side: 'L', v: ['evisa'], s: true },
  np: { n: ['Nepal', 'เนปาล'], e: E([POL, '100'], [AMB, '102'], [FIRE, '101']), plug: 'C/D/M', volt: 230, cur: 'NPR', side: 'L', v: ['voa'], s: true },
  bt: { n: ['Bhutan', 'ภูฏาน'], e: E([POL, '113'], [AMB, '112'], [FIRE, '110']), plug: 'D/F/G', volt: 230, cur: 'BTN', side: 'L', v: ['visa'], s: true },
  lk: { n: ['Sri Lanka', 'ศรีลังกา'], e: E([POL, '119'], [AMB, '1990'], [FIRE, '110']), plug: 'D/G/M', volt: 230, cur: 'LKR', side: 'L', v: ['eta'], s: true },
  au: { n: ['Australia', 'ออสเตรเลีย'], e: E([ALL, '000'], [['From a mobile', 'จากมือถือ'], '112']), plug: 'I', volt: 230, cur: 'AUD', side: 'L', v: ['visa'], s: true },
  nz: { n: ['New Zealand', 'นิวซีแลนด์'], e: E([ALL, '111']), plug: 'I', volt: 230, cur: 'NZD', side: 'L', v: ['visa'], s: true },
  fj: { n: ['Fiji', 'ฟิจิ'], e: E([ALL, '911']), plug: 'I', volt: 240, cur: 'FJD', side: 'L', v: ['free', 120], s: false },
  gb: { n: ['United Kingdom', 'สหราชอาณาจักร'], e: E([ALL, '999'], [['Also works', 'ใช้ได้เหมือนกัน'], '112']), plug: 'G', volt: 230, cur: 'GBP', side: 'L', v: ['visa'], s: true },
  ie: { n: ['Ireland', 'ไอร์แลนด์'], e: E([ALL, '112'], [['Also works', 'ใช้ได้เหมือนกัน'], '999']), plug: 'G', volt: 230, cur: 'EUR', side: 'L', v: ['visa'], s: true },
  fr: { n: ['France', 'ฝรั่งเศส'], e: E([ALL, '112'], [AMB, '15'], [POL, '17'], [FIRE, '18']), plug: 'C/E', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  nl: { n: ['Netherlands', 'เนเธอร์แลนด์'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  be: { n: ['Belgium', 'เบลเยียม'], e: E([ALL, '112']), plug: 'C/E', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  lu: { n: ['Luxembourg', 'ลักเซมเบิร์ก'], e: E([ALL, '112'], [POL, '113']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  de: { n: ['Germany', 'เยอรมนี'], e: E([AMBF, '112'], [POL, '110']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  at: { n: ['Austria', 'ออสเตรีย'], e: E([ALL, '112'], [POL, '133'], [AMB, '144'], [FIRE, '122']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  ch: { n: ['Switzerland', 'สวิตเซอร์แลนด์'], e: E([ALL, '112'], [POL, '117'], [AMB, '144'], [FIRE, '118']), plug: 'C/J', volt: 230, cur: 'CHF', side: 'R', v: SCH, s: true },
  it: { n: ['Italy', 'อิตาลี'], e: E([ALL, '112']), plug: 'C/F/L', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  es: { n: ['Spain', 'สเปน'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  pt: { n: ['Portugal', 'โปรตุเกส'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  gr: { n: ['Greece', 'กรีซ'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  mt: { n: ['Malta', 'มอลตา'], e: E([ALL, '112']), plug: 'G', volt: 230, cur: 'EUR', side: 'L', v: SCH, s: true },
  hr: { n: ['Croatia', 'โครเอเชีย'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  si: { n: ['Slovenia', 'สโลวีเนีย'], e: E([ALL, '112'], [POL, '113']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  hu: { n: ['Hungary', 'ฮังการี'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'HUF', side: 'R', v: SCH, s: true },
  cz: { n: ['Czechia', 'เช็กเกีย'], e: E([ALL, '112']), plug: 'C/E', volt: 230, cur: 'CZK', side: 'R', v: SCH, s: true },
  sk: { n: ['Slovakia', 'สโลวาเกีย'], e: E([ALL, '112']), plug: 'C/E', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  pl: { n: ['Poland', 'โปแลนด์'], e: E([ALL, '112']), plug: 'C/E', volt: 230, cur: 'PLN', side: 'R', v: SCH, s: true },
  ee: { n: ['Estonia', 'เอสโตเนีย'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  fi: { n: ['Finland', 'ฟินแลนด์'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'EUR', side: 'R', v: SCH, s: true },
  se: { n: ['Sweden', 'สวีเดน'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'SEK', side: 'R', v: SCH, s: true },
  no: { n: ['Norway', 'นอร์เวย์'], e: E([ALL, '112'], [AMB, '113'], [FIRE, '110']), plug: 'C/F', volt: 230, cur: 'NOK', side: 'R', v: SCH, s: true },
  dk: { n: ['Denmark', 'เดนมาร์ก'], e: E([ALL, '112']), plug: 'C/E/F/K', volt: 230, cur: 'DKK', side: 'R', v: SCH, s: true },
  is: { n: ['Iceland', 'ไอซ์แลนด์'], e: E([ALL, '112']), plug: 'C/F', volt: 230, cur: 'ISK', side: 'R', v: SCH, s: true },
  tr: { n: ['Türkiye', 'ตุรกี'], e: E([ALL, '112']), plug: 'C/F', volt: 220, cur: 'TRY', side: 'R', v: ['free', 30], s: true },
  ge: { n: ['Georgia', 'จอร์เจีย'], e: E([ALL, '112']), plug: 'C/F', volt: 220, cur: 'GEL', side: 'R', v: ['free', 365], s: true },
  uz: { n: ['Uzbekistan', 'อุซเบกิสถาน'], e: E([ALL, '112'], [POL, '102'], [AMB, '103'], [FIRE, '101']), plug: 'C/F', volt: 220, cur: 'UZS', side: 'R', v: ['free', 30], s: false },
  kz: { n: ['Kazakhstan', 'คาซัคสถาน'], e: E([ALL, '112'], [POL, '102'], [AMB, '103'], [FIRE, '101']), plug: 'C/F', volt: 220, cur: 'KZT', side: 'R', v: ['free', 30], s: true },
  mn: { n: ['Mongolia', 'มองโกเลีย'], e: E([POL, '102'], [AMB, '103'], [FIRE, '101']), plug: 'C/E', volt: 220, cur: 'MNT', side: 'R', v: ['free', 30], s: true },
  ae: { n: ['United Arab Emirates', 'สหรัฐอาหรับเอมิเรตส์'], e: E([POL, '999'], [AMB, '998'], [FIRE, '997']), plug: 'G', volt: 230, cur: 'AED', side: 'R', v: ['evisa'], s: false },
  jo: { n: ['Jordan', 'จอร์แดน'], e: E([ALL, '911']), plug: 'C/D/F/G/J', volt: 230, cur: 'JOD', side: 'R', v: ['voa'], s: false },
  eg: { n: ['Egypt', 'อียิปต์'], e: E([POL, '122'], [AMB, '123'], [FIRE, '180']), plug: 'C/F', volt: 220, cur: 'EGP', side: 'R', v: ['evisa'], s: true },
  ma: { n: ['Morocco', 'โมร็อกโก'], e: E([POL, '19'], [AMBF, '150'], [['Gendarmerie (outside towns)', 'ตำรวจนอกเมือง'], '177']), plug: 'C/E', volt: 220, cur: 'MAD', side: 'R', v: ['evisa'], s: false },
  ke: { n: ['Kenya', 'เคนยา'], e: E([ALL, '999'], [['Also works', 'ใช้ได้เหมือนกัน'], '112']), plug: 'G', volt: 240, cur: 'KES', side: 'L', v: ['eta'], s: true },
  za: { n: ['South Africa', 'แอฟริกาใต้'], e: E([POL, '10111'], [AMB, '10177'], [['From a mobile', 'จากมือถือ'], '112']), plug: 'C/M/N', volt: 230, cur: 'ZAR', side: 'L', v: ['free', 30], s: true },
  us: { n: ['The United States', 'สหรัฐอเมริกา'], e: E([ALL, '911']), plug: 'A/B', volt: 120, cur: 'USD', side: 'R', v: ['visa'], s: true },
  ca: { n: ['Canada', 'แคนาดา'], e: E([ALL, '911']), plug: 'A/B', volt: 120, cur: 'CAD', side: 'R', v: ['visa'], s: true },
  mx: { n: ['Mexico', 'เม็กซิโก'], e: E([ALL, '911']), plug: 'A/B', volt: 127, cur: 'MXN', side: 'R', v: ['visa'], s: false },
  pe: { n: ['Peru', 'เปรู'], e: E([POL, '105'], [AMB, '106'], [FIRE, '116']), plug: 'A/C', volt: 220, cur: 'PEN', side: 'R', v: ['free', 90], s: true },
  br: { n: ['Brazil', 'บราซิล'], e: E([POL, '190'], [AMB, '192'], [FIRE, '193']), plug: 'C/N', volt: 127, cur: 'BRL', side: 'R', v: ['free', 90], s: true },
  ar: { n: ['Argentina', 'อาร์เจนตินา'], e: E([ALL, '911'], [AMB, '107'], [FIRE, '100']), plug: 'C/I', volt: 220, cur: 'ARS', side: 'R', v: ['free', 90], s: true },
  cl: { n: ['Chile', 'ชิลี'], e: E([POL, '133'], [AMB, '131'], [FIRE, '132']), plug: 'C/L', volt: 220, cur: 'CLP', side: 'R', v: ['free', 90], s: true },
};

const has = (cc) => Object.prototype.hasOwnProperty.call(T, String(cc || '').toLowerCase());
const get = (cc) => (has(cc) ? T[String(cc).toLowerCase()] : null);

// the visa line in both languages; a row we are not sure of says so, every row says to check the official site
function visaLine(r) {
  const [k, d] = r.v, c = ` (${CHECKED})`;
  const head = {
    home: ['No visa needed — home', 'ไม่ต้องใช้วีซ่า'],
    free: [`Thai passports: no visa for up to ${d} days`, `หนังสือเดินทางไทย: ไม่ต้องขอวีซ่า อยู่ได้ไม่เกิน ${d} วัน`],
    voa: ['Thai passports: visa on arrival', 'หนังสือเดินทางไทย: ขอวีซ่าที่ด่านเมื่อไปถึง'],
    evisa: ['Thai passports: apply for an e-visa online before the trip', 'หนังสือเดินทางไทย: ขอวีซ่าออนไลน์ (e-visa) ก่อนเดินทาง'],
    eta: ['Thai passports: an online travel authorisation before the trip', 'หนังสือเดินทางไทย: ลงทะเบียนขออนุญาตเดินทางออนไลน์ก่อนเดินทาง'],
    visa: ['Thai passports: apply for a visa before the trip — allow weeks', 'หนังสือเดินทางไทย: ต้องขอวีซ่าก่อนเดินทาง เผื่อเวลาหลายสัปดาห์'],
    schengen: ['Thai passports: a Schengen visa before the trip — allow weeks', 'หนังสือเดินทางไทย: ต้องขอวีซ่าเชงเก้นก่อนเดินทาง เผื่อเวลาหลายสัปดาห์'],
  }[k];
  if (k === 'home') return { en: head[0], th: head[1] };
  if (r.vn) { head[0] += ` (${r.vn.en})`; head[1] += ` (${r.vn.th})`; }   // a condition of the rule (Myanmar: by air only)
  const tail = r.s ? [` · checked${c} — rules change, check the embassy's site before booking`, ` · ตรวจล่าสุด${c} — กฎเปลี่ยนได้ เช็กเว็บสถานทูตก่อนจอง`]
    : [` · not yet confirmed by us${c} — check the embassy's site before booking`, ` · เรายังไม่ได้ยืนยัน${c} — เช็กเว็บสถานทูตก่อนจอง`];
  return { en: head[0] + tail[0], th: head[1] + tail[1] };
}

// what a planned book takes from the table for the countries it visits (in the order visited, home left out unless it is the only one)
function factsFor(codes) {
  const ccs = [...new Set((codes || []).map((c) => String(c || '').toLowerCase()).filter(has))];
  const away = ccs.filter((c) => c !== 'th');
  const use = away.length ? away : ccs;
  if (!use.length) return null;
  const emergency = [];
  for (const cc of use) {
    const r = T[cc];
    r.e.forEach(([en, th, tel], i) => emergency.push({ label: { en: use.length > 1 ? `${r.n[0]} · ${en}` : en, th: use.length > 1 ? `${r.n[1]} · ${th}` : th }, tel, ...(i === 0 && cc === use[0] ? { main: true } : {}) }));
  }
  const guide = use.map((cc) => { const r = T[cc]; return {
    title: { en: use.length > 1 ? `${r.n[0]}: power, money, roads` : 'Power, money, roads', th: use.length > 1 ? `${r.n[1]}: ไฟ เงิน ถนน` : 'ไฟ เงิน ถนน' },
    text: { en: `Plugs ${r.plug}, ${r.volt} V · money ${r.cur} · cars drive on the ${r.side === 'L' ? 'left' : 'right'}`, th: `ปลั๊ก ${r.plug} ไฟ ${r.volt} V · เงิน ${r.cur} · รถวิ่ง${r.side === 'L' ? 'ซ้าย' : 'ขวา'}` } }; });
  const visa = use.map((cc) => { const l = visaLine(T[cc]); return use.length > 1 ? { en: `${T[cc].n[0]}: ${l.en}`, th: `${T[cc].n[1]}: ${l.th}` } : l; });
  return { countries: use, emergency, guide, visa, unsure: use.filter((cc) => !T[cc].s) };
}

module.exports = { T, has, get, factsFor, visaLine, CHECKED };
