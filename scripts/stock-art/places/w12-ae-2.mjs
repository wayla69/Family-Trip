// Wave 12, the United Arab Emirates: Abu Dhabi, Al Ain and Liwa — buildings only (no rulers, no portraits, no Arabic writing),
// the Grand Mosque drawn as its own building, no theme parks or brands, no falcons or camels (docs/STOCK-ART.md §8)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const LM = (slug, th, en, kw, spot, svg) => ({ id: `ae-abudhabi.landmark.${slug}`, cat: 'landmark', file: `ae/abudhabi/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const leaf = (x, y, r, fill = '#43A047', s = 1) => g(x, y, s, P('M0 0c14-14 34-14 46-2-16-2-32 0-46 2z', fill, 2.5), r);
const palm = (x, y, h, s = 1, dates) => g(x, y, s, P(`M-4 0c-2-${h * 0.5} 2-${h * 0.8} 6-${h}h4c-4 ${h * 0.2}-6 ${h * 0.5}-4 ${h}z`, '#8D6E63', 2.5) + [-160, -125, -55, -20, -95].map((r) => leaf(4, -h, r, '#43A047')).join('')
  + (dates ? [[-2, 8], [6, 10], [2, 14]].map(([dx, dy]) => C(4 + dx, -h + dy, 4, '#E65100', 1.5)).join('') : ''));
// straight lines across a circle (cx, cy, r) at an angle, `step` apart, cut where they meet the rim (a glass grid, a wire mesh)
const chords = (cx, cy, r, deg, step, colour, w = 2.5, ymax = 1e9) => {
  const a = (deg * Math.PI) / 180, dx = Math.cos(a), dy = Math.sin(a), nx = -dy, ny = dx; let out = '';
  for (let o = -r + step / 2; o < r; o += step) {
    const h = Math.sqrt(r * r - o * o), mx = cx + nx * o, my = cy + ny * o;
    let x1 = mx - dx * h, y1 = my - dy * h, x2 = mx + dx * h, y2 = my + dy * h;
    if (y1 > ymax && y2 > ymax) continue;
    if (y1 > ymax) { const t = (ymax - y2) / (y1 - y2); x1 = x2 + (x1 - x2) * t; y1 = ymax; }
    if (y2 > ymax) { const t = (ymax - y1) / (y2 - y1); x2 = x1 + (x2 - x1) * t; y2 = ymax; }
    out += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return out ? Lc(out, colour, w) : '';
};
const AD = { k1: '#00897B', k2: '#B8860B', k3: '#FFF8E1' };

const items = [
  { id: 'ae-abudhabi.stamp', cat: 'stamp', file: 'ae/abudhabi/stamp.v1.svg', name: nm('ตราประทับอาบูดาบี', 'Abu Dhabi stamp'), kw: ['abu dhabi', 'อาบูดาบี', 'al ain', 'อัลไอน์', 'liwa', 'ลีวา', 'saadiyat', 'yas island'],
    // a wide flat lacy dome floating over little white cube buildings at the edge of the sea
    svg: cityStamp('aad-st', { name: 'ABU DHABI', sub: 'UAE', ...AD, emblem: P('M50 132c16-6 34 4 50 0s34-6 50 0v14H50z', '#4FC3F7', 3) + [[62, 104, 18], [84, 110, 16], [104, 102, 20], [128, 108, 16]].map(([x, y, w]) => R(x, y, w, 132 - y, '#FFFFFF', 0, 2.5)).join('')
      + P('M50 96c14-22 86-22 100 0l-2 4H52z', '#B0BEC5', 3) + [[66, 88], [82, 84], [100, 82], [118, 84], [134, 88]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('') + Lc('M66 102l-2 8M100 102v8M134 102l2 8', '#FFF59D', 2) }) },
  { id: 'ae-abudhabi.day.corniche', cat: 'day', file: 'ae/abudhabi/day-corniche.v1.svg', name: nm('ถนนเลียบชายหาดคอร์นิชอาบูดาบี', 'The Abu Dhabi Corniche'), kw: ['corniche', 'คอร์นิช', 'abu dhabi corniche', 'beach promenade', 'ทางเดินริมทะเล', 'corniche beach', 'ชายหาดคอร์นิช', 'abu dhabi', 'อาบูดาบี', 'cycling path'],
    // a long white beach and turquoise sea in front, a curving promenade lined with palms and lamps, glassy towers along the shore behind
    svg: scene('aad-d1', '#B3E5FC', [[6, 50, 24, '#90CAF9'], [34, 70, 20, '#B0BEC5'], [58, 40, 22, '#80DEEA'], [84, 64, 20, '#CFD8DC'], [140, 46, 24, '#90CAF9'], [168, 66, 22, '#B0BEC5'], [194, 36, 24, '#80DEEA'], [220, 60, 22, '#CFD8DC']].map(([x, y, w, c]) => R(x, y, w, 120 - y, c, 0, 3) + Lc(`M${x + 5} ${y + 14}h${w - 10}M${x + 5} ${y + 34}h${w - 10}`, '#E1F5FE', 2.5)).join('')
      + R(-4, 118, 248, 14, '#C5E1A5') + P('M-4 132h248v18H-4z', '#ECEFF1') + [20, 70, 120, 170, 220].map((x) => palm(x, 132, 36, 0.6)).join('') + [45, 145].map((x) => Lc(`M${x} 132v-26`, '#607D8B', 3) + C(x, 104, 4, '#FFF59D', 2)).join('')
      + P('M-4 150h248v34H-4z', '#FBE3B4') + P('M-4 184c60-8 160-8 248 0v66H-4z', '#26C6DA') + Lc('M20 204c14-6 28 6 42 0M150 214c14-6 28 6 42 0', '#E0F7FA', 3) + E(150, 170, 10, 6, '#EF5350', 2.5) + face(120, 166, 0.3)) },
  { id: 'ae-abudhabi.day.liwa', cat: 'day', file: 'ae/abudhabi/day-liwa.v1.svg', name: nm('เนินทรายยักษ์ลีวากับโอเอซิส', 'The giant dunes of Liwa and an oasis'), kw: ['liwa', 'ลีวา', 'liwa oasis', 'โอเอซิสลีวา', 'moreeb dune', 'เนินทรายโมรีบ', 'empty quarter', 'ทะเลทรายรุบอัลคอลี', 'giant dunes', 'เนินทรายยักษ์'],
    // huge smooth orange dunes curving one behind another at sunset, and at their foot a green oasis of date palms round a little blue pool
    svg: scene('aad-d2', '#FFCC80', C(176, 64, 24, '#FFF59D', 0) + P('M-4 120c40-60 90-80 130-40s60-30 118-10v180H-4z', '#F6A452') + Lc('M126 80c-20 40-30 60-30 100', '#E8853B', 3)
      + P('M-4 160c50-50 110-60 160-20s60-10 88 0v110H-4z', '#E8853B') + Lc('M156 140c-30 20-50 50-60 110', '#D9732B', 3) + P('M-4 200c50-20 140-30 248-10v60H-4z', '#F4B27A')
      + E(120, 214, 46, 9, '#4FC3F7') + [[70, 214], [96, 204], [146, 206], [172, 216], [120, 200]].map(([x, y], k) => palm(x, y, 34 + (k % 2) * 8, 0.65, true)).join('') + E(84, 224, 24, 6, '#9CCC65', 2.5) + E(160, 226, 22, 6, '#9CCC65', 2.5) + face(120, 216, 0.25)) },
  LM('grandmosque', 'มัสยิดหลวงชีคซายิดสีขาว', 'Sheikh Zayed Grand Mosque', ['sheikh zayed grand mosque', 'มัสยิดชีคซายิด', 'grand mosque', 'มัสยิดหลวง', 'white domes', 'โดมสีขาว', 'reflecting pool', 'สระสะท้อนเงา', 'marble', 'หินอ่อน'],
    nm('หาอาคารสีขาวที่มีโดมหลายลูกและหอคอยสูงสี่มุม', 'Find the white building with many domes and four tall towers'),
    // a gleaming white building with one big dome and many small domes, four very tall slim towers at the corners, a long blue pool reflecting it all (the building only)
    P('M8 184h224v34H8z', '#4FC3F7') + [[120, 196, 30], [64, 194, 14], [176, 194, 14]].map(([x, y, r]) => P(`M${x - r} ${y}c0 ${r * 0.9} ${r * 2} ${r * 0.9} ${r * 2} 0z`, '#B3E5FC', 0)).join('')
    + [[20, 26], [220, 26], [44, 56], [196, 56]].map(([x, y]) => R(x - 6, y + 16, 12, 168 - y, '#FFFFFF') + R(x - 9, y + 46, 18, 6, '#F4D9A0') + R(x - 9, y + 96, 18, 6, '#F4D9A0') + P(`M${x - 6} ${y + 16}c0-12 12-12 12 0z`, '#FFE082') + Lc(`M${x} ${y + 6}v-6`, INK, 2)).join('')
    + R(52, 122, 136, 62, '#FFFFFF') + Array.from({ length: 6 }, (_, k) => P(`M${62 + k * 21} 182v-30c0-12 14-12 14 0v30z`, '#F4D9A0', 2.5)).join('') + Lc('M52 140h136', '#E0E0E0', 3)
    + [[66, 122, 14], [174, 122, 14], [92, 122, 12], [148, 122, 12]].map(([x, y, r]) => P(`M${x - r} ${y}c0-${r * 1.6} ${r * 2}-${r * 1.6} ${r * 2} 0z`, '#FFFFFF') + Lc(`M${x} ${y - r * 1.2}v-6`, '#E0B040', 2.5)).join('')
    + P('M88 122c0-50 64-50 64 0z', '#FFFFFF') + Lc('M120 84v-14', '#E0B040', 3) + C(120, 68, 4, '#FFCA28', 2) + face(120, 106, 0.35)),
  LM('louvre', 'โดมลายลูกไม้ของพิพิธภัณฑ์ลูฟวร์อาบูดาบี', 'The lace dome of Louvre Abu Dhabi', ['louvre abu dhabi', 'ลูฟวร์อาบูดาบี', 'rain of light', 'ฝนแสง', 'lace dome', 'โดมลายฉลุ', 'art museum', 'พิพิธภัณฑ์ศิลปะ', 'saadiyat', 'ซาดิยาต'],
    nm('หาโดมแบนลายฉลุที่ลอยอยู่เหนืออาคารสีขาวริมทะเล', 'Find the flat lacy dome floating over white buildings by the sea'),
    // a wide flat silver dome full of star-shaped holes floating over a cluster of little white cube buildings at the water's edge, dots of light falling through
    P('M8 172c30-10 60 8 90 0s60-8 90 0 30 4 44 2v40H8z', '#4FC3F7') + Lc('M24 196c14-6 28 6 42 0M160 202c14-6 28 6 42 0', '#E1F5FE', 3)
    + [[30, 118, 30, 54], [62, 128, 28, 44], [92, 112, 34, 60], [128, 124, 30, 48], [160, 116, 32, 56], [194, 130, 22, 42]].map(([x, y, w, h]) => R(x, y, w, h, '#FFFFFF')).join('')
    + [56, 120, 184].map((x) => Lc(`M${x} 100v${x === 120 ? 12 : 16}`, '#90A4AE', 4)).join('') + [[50, 136], [80, 150], [110, 132], [146, 146], [176, 138], [96, 158], [160, 160]].map(([x, y]) => C(x, y, 3, '#FFE082', 0)).join('')
    + P('M8 98c30-48 194-48 224 0l-4 8H12z', '#B0BEC5') + Lc('M14 102h212', '#78909C', 2.5) + [[40, 84], [70, 74], [100, 70], [130, 70], [160, 74], [190, 82], [56, 92], [86, 86], [116, 84], [146, 86], [176, 92], [210, 94]].map(([x, y]) => P(`M${x} ${y - 6}l2 4 4 2-4 2-2 4-2-4-4-2 4-2z`, '#ECEFF1', 1.5)).join('') + face(110, 144, 0.35)),
  LM('qasralwatan', 'ทำเนียบกัสร์อัลวาตันโดมขาวใหญ่', 'Qasr Al Watan, the palace with the great dome', ['qasr al watan', 'กัสร์อัลวาตัน', 'presidential palace', 'ทำเนียบ', 'palace dome', 'โดมทำเนียบ', 'great hall', 'โถงใหญ่', 'palace tour', 'ชมวัง'],
    nm('หาวังสีขาวที่มีโดมใหญ่ลูกเดียวตรงกลางและซุ้มประตูสูงเรียงกัน', 'Find the white palace with one great dome in the middle and a row of tall arches'),
    // a long white-and-sand palace with one great white dome ribbed in gold, two smaller domes beside it and a front of tall pointed arches, a long garden path (the building only)
    P('M70 218l20-34h60l20 34z', '#E0C9A6') + Lc('M120 184v34', '#FFFFFF', 3) + R(14, 112, 212, 72, '#F5F0E6') + Lc('M14 126h212', '#E0C9A6', 4)
    + Array.from({ length: 8 }, (_, k) => P(`M${22 + k * 25.5} 184v-40c0-16 18-16 18 0v40z`, '#B3E5FC', 2.5)).join('') + R(14, 112, 212, 72, 'none')
    + [[44, 112, 18], [196, 112, 18]].map(([x, y, r]) => P(`M${x - r} ${y}c0-${r * 1.5} ${r * 2}-${r * 1.5} ${r * 2} 0z`, '#FFFFFF') + C(x, y - r * 1.15, 3, '#E0B040', 2)).join('')
    + R(72, 92, 96, 20, '#F5F0E6') + P('M76 92c0-64 88-64 88 0z', '#FFFFFF') + Array.from({ length: 5 }, (_, k) => Lc(`M${86 + k * 17} 92Q${(86 + k * 17 + 120) / 2} 52 120 44`, '#E0B040', 2.5)).join('') + Lc('M120 44V30', INK, 2.5) + C(120, 28, 4, '#FFCA28', 2) + face(120, 74, 0.35)),
  LM('qasralhosn', 'ป้อมขาวกัสร์อัลฮุสน์', 'Qasr Al Hosn, the white fort', ['qasr al hosn', 'กัสร์อัลฮุสน์', 'white fort', 'ป้อมสีขาว', 'oldest building', 'อาคารเก่าแก่ที่สุด', 'watchtower', 'หอสังเกตการณ์', 'old abu dhabi', 'อาบูดาบีเก่า'],
    nm('หาป้อมสีขาวที่มีหอคอยกลมกับหอคอยสี่เหลี่ยม', 'Find the white fort with a round tower and a square tower'),
    // a white coral-stone fort with a fat round tower, a tall square watchtower and a crenellated wall with a big wooden gate, a palm by the wall
    R(60, 104, 120, 100, '#FFFFFF') + Array.from({ length: 8 }, (_, k) => R(62 + k * 15, 94, 10, 12, '#FFFFFF')).join('') + R(104, 150, 32, 54, '#8D5524', 3) + Lc('M120 152v50', '#5D2E14', 2.5) + [[112, 176], [128, 176]].map(([x, y]) => C(x, y, 2.5, '#FFCA28', 0)).join('')
    + R(26, 80, 52, 124, '#FFFFFF', 12) + Array.from({ length: 4 }, (_, k) => R(28 + k * 13, 70, 9, 12, '#FFFFFF')).join('') + R(46, 110, 10, 16, '#5D4037', 3) + R(170, 40, 44, 164, '#FFFFFF') + Array.from({ length: 3 }, (_, k) => R(172 + k * 14, 30, 10, 12, '#FFFFFF')).join('') + [[192, 66], [192, 108]].map(([x, y]) => R(x - 5, y, 10, 18, '#5D4037', 3)).join('')
    + E(120, 208, 108, 8, '#F4D19B') + palm(150, 206, 70, 0.8) + face(52, 150, 0.4)),
  LM('alainoasis', 'สวนอินทผลัมกับลำรางน้ำฟาลาจในอัลไอน์', 'The palm oasis of Al Ain and its falaj channel', ['al ain oasis', 'โอเอซิสอัลไอน์', 'falaj', 'ฟาลาจ', 'water channel', 'ลำรางน้ำ', 'date palm grove', 'สวนต้นอินทผลัม', 'shady walk', 'unesco'],
    nm('หาลำรางน้ำแคบๆ ที่ไหลผ่านใต้ต้นอินทผลัม', 'Find the narrow water channel running under the date palms'),
    // a shady grove of tall date palms with orange date bunches, a narrow stone-lined water channel winding through the green ground, a low mud wall behind
    E(120, 196, 110, 30, '#AED581') + R(14, 150, 212, 22, '#D7A86E', 4) + Lc('M14 160h212', '#C8962F', 2.5) + [[28, 168, 100], [74, 172, 120], [168, 172, 116], [212, 168, 96], [120, 166, 90]].map(([x, y, h]) => palm(x, y, h, 0.95, true)).join('')
    + P('M60 226c20-20 60-10 70-30s50-14 70-22', 'none') + Lc('M60 226c20-20 60-10 70-30s50-14 70-22', '#BCAAA4', 18) + Lc('M60 226c20-20 60-10 70-30s50-14 70-22', '#4FC3F7', 10) + Lc('M70 220c8-6 16-8 24-8', '#E1F5FE', 2) + face(120, 200, 0.3)),
  LM('jahili', 'ป้อมอัลจาฮิลีหอคอยกลมสี่ชั้น', 'Al Jahili Fort and its four-ringed tower', ['al jahili fort', 'ป้อมอัลจาฮิลี', 'mud brick fort', 'ป้อมอิฐดิน', 'round tower', 'หอคอยกลม', 'al ain', 'อัลไอน์', 'museum'],
    nm('หาหอคอยกลมที่ซ้อนกันเป็นชั้นๆ เหมือนเค้ก', 'Find the round tower stacked in rings like a cake'),
    // a sandy mud-brick fort with a round tower stacked in four rings getting smaller to the top, each ring with pointed battlements, a long wall and gate beside it
    R(100, 120, 120, 86, '#E3B778') + Array.from({ length: 8 }, (_, k) => P(`M${102 + k * 15} 120l5-12 5 12z`, '#E3B778', 2.5)).join('') + R(150, 156, 30, 50, '#8D5524', 15) + R(200, 96, 18, 110, '#E3B778') + P('M198 96l11-12 11 12z', '#E3B778', 2.5)
    + [[22, 184, 76], [28, 146, 64], [34, 112, 52], [40, 82, 40]].map(([x, y, w], k) => R(x, y, w, k ? 34 : 22, '#D9A766') + Array.from({ length: Math.round(w / 12) }, (_, j) => P(`M${x + 1 + j * (w / Math.round(w / 12))} ${y}l${w / Math.round(w / 12) / 2}-10 ${w / Math.round(w / 12) / 2} 10z`, '#D9A766', 2.5)).join('')).join('')
    + [[52, 128], [56, 96], [48, 160]].map(([x, y]) => R(x, y, 8, 12, '#5D4037', 2, 0)).join('') + E(120, 210, 112, 8, '#F4D19B') + face(60, 196, 0.35)),
  LM('hilitomb', 'สุสานหินกลมโบราณที่ฮิลี', 'The round stone Hili Tomb', ['hili tomb', 'สุสานฮิลี', 'hili archaeological park', 'อุทยานโบราณคดีฮิลี', 'ancient tomb', 'สุสานโบราณ', 'bronze age', 'ยุคสำริด', 'al ain'],
    nm('หาสิ่งก่อสร้างหินกลมเหมือนกลองยักษ์ที่มีประตูเล็กสองช่อง', 'Find the round stone building like a giant drum with two little doors'),
    // a big round drum of pale stone blocks with a flat top, two small doorways in its front, standing on a green lawn with little palms
    E(120, 196, 104, 20, '#AED581') + P('M34 100v84c0 18 172 18 172 0v-84z', '#E6D3B3') + E(120, 100, 86, 20, '#F0E2C8') + Array.from({ length: 5 }, (_, k) => Lc(`M34 ${118 + k * 16}c40 ${12 + k} 132 ${12 + k} 172 0`, '#C8B08A', 2.5)).join('')
    + Array.from({ length: 6 }, (_, k) => Lc(`M${50 + k * 28} ${126 + (k % 2) * 16}v14`, '#C8B08A', 2.5)).join('') + [[84, 164], [156, 164]].map(([x, y]) => P(`M${x - 11} ${y + 28}v-20c0-10 22-10 22 0v20z`, '#5D4037', 2.5)).join('') + palm(22, 200, 50, 0.6) + palm(218, 200, 46, 0.6) + face(120, 140, 0.45)),
  LM('yashotel', 'หลังคาตาข่ายเรืองแสงเหนือสนามแข่งบนเกาะยาส', 'The glowing net roof over the Yas race track', ['yas island', 'เกาะยาส', 'yas marina', 'ยาสมารีนา', 'race track', 'สนามแข่งรถ', 'glowing roof', 'หลังคาเรืองแสง', 'grand prix', 'night lights'],
    nm('หาหลังคาตาข่ายที่เปลี่ยนสีได้คร่อมทับสนามแข่งรถ', 'Find the colour-changing net roof stretched over the race track'),
    // two low hotel blocks joined by a long wavy roof of diamond-shaped net glowing pink and blue, a grey race track curving underneath with a tiny race car
    P('M8 200c40-30 180-30 224 0v20H8z', '#78909C') + Lc('M12 208c40-24 176-24 216 0', '#FFFFFF', 2.5) + g(152, 194, 1, R(-14, -7, 28, 10, '#EF5350', 4) + C(-8, 4, 4, INK, 0) + C(8, 4, 4, INK, 0)) + R(30, 126, 60, 50, '#ECEFF1') + R(150, 126, 60, 50, '#ECEFF1') + Array.from({ length: 6 }, (_, k) => Lc(`M${38 + (k % 3) * 18} ${138 + Math.floor(k / 3) * 18}h10M${158 + (k % 3) * 18} ${138 + Math.floor(k / 3) * 18}h10`, '#90CAF9', 4)).join('')
    + P('M14 130c20-60 60-80 106-60s86 0 106 60c-30-14-70-30-106-24S44 116 14 130z', '#CE93D8') + P('M40 112c20-30 50-36 80-28s50 0 80 20c-24-6-56-10-80-8s-56 6-80 16z', '#80DEEA', 0)
    + Array.from({ length: 9 }, (_, k) => Lc(`M${26 + k * 22} ${110 - Math.sin((k / 8) * Math.PI) * 30}l14 ${18 - Math.sin((k / 8) * Math.PI) * 4}M${40 + k * 22} ${110 - Math.sin((k / 8) * Math.PI) * 30}l-14 ${18 - Math.sin((k / 8) * Math.PI) * 4}`, '#FFFFFF', 2)).join('')
    + P('M14 130c20-60 60-80 106-60s86 0 106 60c-30-14-70-30-106-24S44 116 14 130z', 'none') + face(120, 96, 0.35)),
  LM('masdar', 'รถพ็อดไร้คนขับในเมืองมัสดาร์', 'A driverless pod car in Masdar City', ['masdar city', 'เมืองมัสดาร์', 'driverless pod', 'รถพ็อดไร้คนขับ', 'eco city', 'เมืองรักษ์โลก', 'wind tower', 'solar', 'โซลาร์', 'future city'],
    nm('หารถคันเล็กสีขาวที่วิ่งเองได้โดยไม่มีคนขับ', 'Find the little white car that drives itself'),
    // a little round white pod car with big windows gliding along a track, sandy modern buildings with patterned screens behind and a tall slim modern wind tower
    R(18, 60, 70, 110, '#E3B778') + R(150, 74, 74, 96, '#D9A766') + [[26, 70], [154, 84]].map(([x, y]) => Array.from({ length: 12 }, (_, k) => C(x + 10 + (k % 4) * 15, y + 12 + Math.floor(k / 4) * 22, 4, '#8D5524', 0)).join('')).join('')
    + R(104, 20, 16, 150, '#ECEFF1') + P('M100 20h24l-4-12h-16z', '#B0BEC5') + Array.from({ length: 6 }, (_, k) => Lc(`M106 ${34 + k * 20}h12`, '#90A4AE', 2)).join('')
    + R(10, 196, 220, 10, '#90A4AE') + Lc('M10 201h220', '#ECEFF1', 2) + P('M64 196v-40c0-24 26-34 56-34s56 10 56 34v40z', '#FFFFFF') + P('M76 160c0-18 18-26 44-26s44 8 44 26z', '#80DEEA', 2.5) + Lc('M120 136v24', INK, 2.5) + [[82, 198], [158, 198]].map(([x, y]) => C(x, y, 7, INK)).join('') + face(120, 176, 0.35)),
  LM('etihadtowers', 'ตึกเอทิฮัดห้าตึกโค้งริมทะเล', 'The five curved Etihad Towers by the sea', ['etihad towers', 'ตึกเอทิฮัด', 'five towers', 'ตึกห้าตึก', 'observation deck 300', 'จุดชมวิว', 'curved skyscrapers', 'ตึกระฟ้าโค้ง', 'corniche', 'คอร์นิช'],
    nm('หาตึกกระจกโค้งห้าตึกที่สูงไม่เท่ากันยืนรวมกลุ่มกัน', 'Find the five curved glass towers of different heights standing together'),
    // five tall glassy towers with gently curved fronts, each a different height, standing close together on the shore above a blue sea
    [[30, 70, 34, '#90CAF9'], [64, 30, 36, '#B3E5FC'], [100, 18, 38, '#81D4FA'], [140, 46, 36, '#B3E5FC'], [176, 84, 34, '#90CAF9']].map(([x, y, w, c]) => P(`M${x} 196V${y + 20}c0-14 ${w * 0.4}-20 ${w}-${20}V196z`, c) + Array.from({ length: Math.floor((176 - y) / 22) }, (_, k) => Lc(`M${x + 4} ${y + 34 + k * 22}h${w - 8}`, '#E1F5FE', 2.5)).join('') + Lc(`M${x + w * 0.3} ${y + 14}V192`, '#FFFFFF', 2.5)).join('')
    + R(14, 194, 212, 10, '#ECEFF1') + P('M8 204c40-8 80 6 120 0s70-8 104 0v18H8z', '#29B6F6') + face(119, 120, 0.4)),
  LM('capitalgate', 'ตึกแคปิตอลเกตที่เอียงกว่าหอปิซา', 'Capital Gate, the leaning tower', ['capital gate', 'แคปิตอลเกต', 'leaning tower', 'ตึกเอียง', 'most leaning building', 'ตึกที่เอียงที่สุด', 'diamond glass', 'กระจกลายเพชร', 'adnec'],
    nm('หาตึกที่เอียงไปข้างเหมือนกำลังจะล้ม', 'Find the tower that leans over as if it might tip'),
    // a tall glass tower leaning far to one side, covered in a diamond-shaped glass grid, a swooping silver canopy at its foot and low buildings around
    R(14, 160, 56, 40, '#ECEFF1') + R(170, 168, 56, 32, '#ECEFF1') + P('M96 200l-4-150c20-14 50-8 74-20l4 30c-20 40-30 90-34 140z', '#81D4FA')
    + Array.from({ length: 7 }, (_, k) => Lc(`M${94 - k * 0.6} ${70 + k * 20}l${60 - k * 4} -14M${94 - k * 0.6} ${70 + k * 20}l${60 - k * 4} 14`, '#E1F5FE', 2)).join('') + P('M96 200l-4-150c20-14 50-8 74-20l4 30c-20 40-30 90-34 140z', 'none')
    + P('M60 204c20-40 70-50 120-20 20 10 40 10 50 4-10 14-40 22-70 12-30-10-70-6-100 4z', '#CFD8DC') + R(10, 200, 220, 10, '#B0BEC5') + face(116, 120, 0.4)),
  LM('aldar', 'ตึกอัลดาร์รูปเหรียญยักษ์', 'Aldar HQ, the giant coin building', ['aldar hq', 'ตึกอัลดาร์', 'coin building', 'ตึกรูปเหรียญ', 'round building', 'ตึกกลม', 'al raha beach', 'อัลราฮา', 'disc tower'],
    nm('หาตึกกลมแบนที่ตั้งอยู่เหมือนเหรียญยักษ์', 'Find the round flat building standing up like a giant coin'),
    // a huge round glass building standing on its edge like a giant coin, a diamond grid across its face, on a little island by blue water
    P('M8 196c40-8 80 6 120 0s70-8 104 0v26H8z', '#29B6F6') + E(120, 198, 70, 10, '#F4D19B') + C(120, 106, 92, '#90CAF9') + chords(120, 106, 92, 40, 22, '#E1F5FE', 2.5) + chords(120, 106, 92, -40, 22, '#E1F5FE', 2.5)
    + C(120, 106, 92, 'none') + Lc('M40 70c10-20 30-36 50-44', '#FFFFFF', 5) + face(120, 110, 0.5)),
  LM('fossildunes', 'เนินทรายฟอสซิลอัลวัธบา', 'The Al Wathba fossil dunes', ['fossil dunes', 'เนินทรายฟอสซิล', 'al wathba', 'อัลวัธบา', 'wind-carved rock', 'หินที่ลมกัดเซาะ', 'sandstone shapes', 'หินทรายรูปร่างแปลก', 'desert walk'],
    nm('หาหินทรายลายเป็นชั้นๆ ที่ลมแกะเป็นรูปคลื่น', 'Find the striped sand rocks the wind carved into waves'),
    // tall wind-carved sandstone shapes curling over like frozen waves, striped in layers of cream and caramel, on flat golden sand
    E(120, 204, 110, 16, '#F4D19B') + P('M24 204c-6-60 20-110 60-120 30-6 40 20 26 30-14 10-30 0-30 20 0 20 20 30 22 70z', '#E8C27A') + Lc('M30 160c20-6 40-6 56 0M36 130c16-8 34-10 50-4M60 104c12-6 26-8 40-2', '#C8962F', 3)
    + P('M120 204c-4-40 10-74 40-84 26-8 50 6 50 26 0 16-20 20-26 10 0 20 10 30 16 48z', '#F0D49A') + Lc('M126 180c20-6 46-6 66 0M132 156c16-6 36-8 54-2M150 134c12-4 26-4 40 0', '#C8962F', 3) + face(70, 176, 0.35)),
  LM('zayedbridge', 'สะพานโค้งคลื่นเชคซายิด', 'The wavy arches of Sheikh Zayed Bridge', ['sheikh zayed bridge', 'สะพานเชคซายิด', 'wave bridge', 'สะพานคลื่น', 'dune arches', 'ซุ้มรูปเนินทราย', 'bridge', 'สะพาน', 'night lights'],
    nm('หาสะพานที่มีซุ้มโค้งขึ้นลงเหมือนเนินทราย', 'Find the bridge whose arches rise and fall like sand dunes'),
    // a bridge over blue water with three silver arches swooping up and down like rolling sand dunes, the deck running through them on slim piers
    P('M8 168h224v54H8z', '#4FC3F7') + Lc('M20 196c14-6 28 6 42 0M160 204c14-6 28 6 42 0', '#E1F5FE', 3)
    + [[0, 70], [1, 40], [2, 90]].map(([k, top]) => { const x0 = 12 + k * 72; return P(`M${x0} 160C${x0 + 20} ${top - 20} ${x0 + 70} ${top - 20} ${x0 + 90} 160h-12C${x0 + 64} ${top - 2} ${x0 + 26} ${top - 2} ${x0 + 12} 160z`, '#ECEFF1'); }).join('')
    + R(8, 140, 224, 12, '#B0BEC5') + Lc('M8 146h224', '#FFFFFF', 2) + [50, 120, 190].map((x) => R(x - 5, 152, 10, 22, '#90A4AE', 0, 2.5)).join('') + face(120, 192, 0.35)),
  LM('jebelhafeet', 'ภูเขาเจเบลฮาฟีตยามเช้า', 'Jebel Hafeet at sunrise', ['jebel hafeet', 'เจเบลฮาฟีต', 'mountain', 'ภูเขา', 'mountain top view', 'วิวยอดเขา', 'green mubazzarah', 'กรีนมูบัซซาเราะห์', 'sunrise'],
    nm('หาภูเขาหินลูกใหญ่ที่มีจุดชมวิวเล็กๆ อยู่บนยอด', 'Find the big rocky mountain with a little lookout on top'),
    // a huge bare rocky mountain glowing in the sunrise with a tiny lookout on its peak, green lawns and palms at its foot
    C(190, 60, 24, '#FFE082', 0) + P('M8 196L70 80l30 20 30-56 30 36 30-10 42 126z', '#BC8F6F') + Lc('M70 80l10 40M130 44l-10 50 20 30M160 80l-6 40', '#9C6F50', 3) + R(122, 34, 18, 10, '#FFFFFF', 2) + Lc('M126 34v-8M136 34v-8', INK, 2)
    + E(120, 204, 112, 18, '#9CCC65') + [30, 70, 170, 210].map((x, k) => palm(x, 206, 30 + (k % 2) * 8, 0.6)).join('') + face(130, 130, 0.45)),
  LM('emiratespalace', 'วังโรงแรมเอมิเรตส์พาเลซโดมยอดทอง', 'Emirates Palace and its golden-tipped domes', ['emirates palace', 'เอมิเรตส์พาเลซ', 'palace hotel', 'วังโรงแรม', 'golden domes', 'โดมยอดทอง', 'palace gardens', 'สวนหน้าวัง', 'west corniche', 'afternoon tea'],
    nm('หาวังสีทรายสีชมพูที่มีโดมเล็กโดมใหญ่เรียงกันยาว', 'Find the long sandy-pink palace with a row of big and little domes'),
    // a very long sandy-pink palace with one big pale dome in the middle and rows of smaller domes on towers along both wings, gold tips on every dome, green lawns and a path in front
    E(120, 206, 112, 14, '#9CCC65') + P('M96 220l12-26h24l12 26z', '#F4D19B') + R(10, 132, 220, 62, '#E8C9A8') + Lc('M10 146h220', '#D4A984', 3) + Array.from({ length: 10 }, (_, k) => P(`M${18 + k * 21.5} 192v-26c0-10 13-10 13 0v26z`, '#B3E5FC', 2.5)).join('')
    + [[22, 132, 10], [52, 132, 10], [188, 132, 10], [218, 132, 10], [76, 132, 12], [164, 132, 12]].map(([x, y, r]) => R(x - r, y - 16, r * 2, 16, '#E8C9A8') + P(`M${x - r} ${y - 16}c0-${r * 1.6} ${r * 2}-${r * 1.6} ${r * 2} 0z`, '#F4E4C8') + Lc(`M${x} ${y - 16 - r * 1.2}v-6`, '#E0B040', 3)).join('')
    + R(92, 108, 56, 24, '#E8C9A8') + P('M90 108c0-50 60-50 60 0z', '#F4E4C8') + Array.from({ length: 4 }, (_, k) => Lc(`M${100 + k * 13} 108Q${(100 + k * 13 + 120) / 2} 78 120 72`, '#D4A984', 2.5)).join('') + Lc('M120 72V56', '#E0B040', 4) + C(120, 54, 4, '#FFCA28', 2) + face(120, 162, 0.35)),
  LM('cheetah', 'เสือชีตาห์บนเกาะเซอร์บานียาส', 'A cheetah on Sir Bani Yas Island', ['sir bani yas', 'เซอร์บานียาส', 'cheetah', 'เสือชีตาห์', 'island safari', 'ซาฟารีบนเกาะ', 'wildlife park', 'อุทยานสัตว์ป่า', 'game drive'],
    nm('หาเสือชีตาห์ลายจุดที่นอนพักใต้ต้นไม้', 'Find the spotty cheetah resting under a tree'),
    // a slim golden cheetah cub lying in the shade of a flat-topped acacia tree on golden grass, black tear-lines under its eyes and a spotty tail
    E(120, 200, 110, 18, '#E8C27A') + Lc('M180 196c-4-40 0-80 10-110', '#6D4C41', 7) + Lc('M188 120l-24-20M190 104l20-14', '#6D4C41', 4) + P('M110 92c20-24 110-24 126 0-20 10-110 10-126 0z', '#7CB342')
    + E(118, 172, 66, 22, '#F2B33D') + Array.from({ length: 12 }, (_, k) => C(80 + (k % 6) * 15, 164 + Math.floor(k / 6) * 12 + (k % 2) * 3, 3, INK, 0)).join('') + Lc('M180 176c20 0 30 8 34 20', '#F2B33D', 8) + Lc('M184 176l2 2M196 180l2 2M206 186l2 2', INK, 3)
    + C(40, 136, 6, '#F2B33D', 2.5) + C(76, 136, 6, '#F2B33D', 2.5) + C(58, 156, 24, '#F2B33D') + E(58, 168, 11, 8, '#FFF3E0', 0) + [[48, 142], [58, 138], [68, 142], [40, 160], [76, 160]].map(([x, y]) => C(x, y, 1.8, INK, 0)).join('') + Lc('M50 156l-3 10M66 156l3 10', INK, 2.5) + face(58, 152, 0.45, 'w')),
];
export default {
  places: {
    'ae-abudhabi': { country: 'ae', wave: 3, name: nm('อาบูดาบี อัลไอน์ และลีวา', 'Abu Dhabi, Al Ain and Liwa'), tz: 'Asia/Dubai', ll: [24.47, 54.37], alias: ['abu dhabi', 'อาบูดาบี', 'AUH', 'yas island', 'เกาะยาส', 'saadiyat', 'ซาดิยาต', 'liwa', 'ลีวา', 'al ain', 'อัลไอน์', 'sir bani yas', 'เซอร์บานียาส', 'jebel hafeet', 'เจเบลฮาฟีต'], colors: AD },
  },
  items,
};
