// Wave 7 (central Europe, part 1): Munich, around Neuschwanstein, Vienna, Hallstatt, Salzburg and Innsbruck, Czechia, Prague
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (de/munich/landmark-nymphenburg.v1.svg → de-munich.landmark.nymphenburg); a few folders sit under another scope
const SCOPE = { 'de-neuschwanstein': 'p-neuschwanstein' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); const s = `${cc}-${city}`; return `${SCOPE[s] || s}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture)
const F = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const wins = (x, y, n, dx, w, h, fill = '#B3E5FC') => Array.from({ length: n }, (_, k) => R(x + k * dx, y, w, h, fill, 1, 1.5)).join('');
const fir = (x, y, s = 1, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', c, 2) + R(-3, 0, 6, 6, '#6D4C41', 0, 1.5));

const items = [
  // ---------- Munich
  L('de/munich/landmark-nymphenburg.v1.svg', 'พระราชวังนิมเฟนบวร์ก', 'Nymphenburg Palace and its long canal', ['nymphenburg palace', 'พระราชวังนิมเฟนบวร์ก', 'schloss nymphenburg', 'palace canal', 'คลองหน้าวัง', 'fountain', 'น้ำพุ', 'palace park', 'baroque palace', 'พระราชวังบาโรก'], 'หาน้ำพุที่พุ่งสูงกลางคลองยาวหน้าวัง', 'Find the fountain shooting up in the middle of the long canal',
    // a long white palace with a taller middle block and low wings, grey roofs, a straight canal running towards it with a tall fountain jet, lawns on both sides
    sky('#E3F2FD') + P('M-4 120h248v124H-4z', '#9CCC65', 0)
      + [[14, 96, 60], [166, 96, 60]].map(([x, y, w]) => R(x, y, w, 30, '#FFFDE7', 0, 2.5) + P(`M${x - 2} ${y}l6-10h${w - 8}l6 10z`, '#78909C', 2.5) + wins(x + 6, y + 8, 5, 11, 6, 12)).join('')
      + R(74, 66, 92, 60, '#FFFDE7', 0, 3) + P('M70 66l10-16h80l10 16z', '#78909C', 3) + P('M104 50l16-12 16 12z', '#78909C', 2.5) + wins(80, 74, 7, 12, 7, 14) + wins(80, 100, 3, 12, 7, 14) + wins(140, 100, 2, 12, 7, 14) + P('M114 126v-20c0-8 12-8 12 0v20z', '#8D6E63', 2)
      + P('M100 132h40l50 112H50z', '#4FC3F7', 3) + Lc('M90 170h60M80 200h80', '#B3E5FC', 3)
      + Lc('M120 186V140', '#B3E5FC', 6) + P('M120 138c-10 6-14 14-12 22M120 138c10 6 14 14 12 22', 'none', 3) + C(120, 136, 5, '#E1F5FE', 2) + E(120, 188, 16, 5, '#E1F5FE', 2)
      + [[34, 168], [206, 168], [30, 214], [210, 214]].map(([x, y]) => g(x, y, 1, C(0, -12, 12, '#558B2F', 2) + R(-2, 0, 4, 8, '#6D4C41', 0, 1.5))).join('') + face(120, 84, 0.4)),
  L('de/munich/landmark-monopteros.v1.svg', 'ศาลาโมโนปเทรอสในอิงลิชการ์เดน', 'The Monopteros temple on its hill in the English Garden', ['monopteros', 'โมโนปเทรอส', 'english garden', 'อิงลิชการ์เดน', 'englischer garten', 'round temple', 'ศาลาทรงกลม', 'grassy hill', 'เนินหญ้า', 'picnic'], 'หาศาลาทรงกลมมีเสาเรียงรอบบนยอดเนิน', 'Find the round little temple with columns on top of the grassy hill',
    // a little round open temple with slim white columns and a domed roof on top of a round green hill, the city's onion-domed towers far behind, a child rolling down the slope
    sky('#FFF3E0') + g(30, 120, 1, R(-6, -30, 12, 34, '#B0BEC5', 0, 2) + C(0, -34, 8, '#558B2F', 2) + R(10, -30, 12, 34, '#B0BEC5', 0, 2) + C(16, -34, 8, '#558B2F', 2)) + P('M-4 126c60-6 100-4 130 4v10H-4z', '#B0BEC5', 0)
      + P('M-4 244V170c50-80 200-90 248-20v94z', '#7CB342', 3) + Lc('M40 200c20-10 40-14 60-14', '#9CCC65', 4)
      + R(82, 104, 76, 10, '#ECEFF1', 1, 2.5) + R(76, 114, 88, 8, '#CFD8DC', 1, 2.5)
      + [88, 104, 120, 136, 152].map((x) => R(x - 3, 66, 6, 38, '#FFFFFF', 0, 2)).join('') + R(82, 58, 76, 10, '#ECEFF1', 1, 2.5) + P('M84 58c4-24 68-24 72 0z', '#90A4AE', 2.5) + C(120, 38, 4, '#90A4AE', 2) + face(120, 46, 0.3)
      + g(186, 178, 1, C(0, 0, 9, '#FFE0BD', 2) + P('M6 6l14 6-4 10-14-6z', '#FB8C00', 2) + face(0, 0, 0.22, 'o'), 30) + Lc('M168 170c-6 4-10 4-14 2M210 196c4 2 6 6 6 10', INK, 2)),
  L('de/munich/landmark-deutschesmuseum.v1.svg', 'พิพิธภัณฑ์เยอรมันริมแม่น้ำอีซาร์', 'The Deutsches Museum on its river island', ['deutsches museum', 'พิพิธภัณฑ์ดอยท์เชส', 'science museum', 'พิพิธภัณฑ์วิทยาศาสตร์', 'technology museum', 'museum island', 'weather tower', 'หอวัดอากาศ', 'isar', 'แม่น้ำอีซาร์'], 'หาหอสูงที่มีหน้าปัดบอกลมและอากาศ', 'Find the tall tower with the big wind and weather dials',
    // a long pale museum building on an island in a green river, a tall square tower with big round weather dials and a wind arrow on top, a child pointing
    sky('#E1F5FE') + P('M-4 190h248v54H-4z', '#4DB6AC', 0) + Lc('M20 210h40M140 220h50', '#B2DFDB', 3) + P('M-4 176h248v16H-4z', '#A5D6A7', 2.5)
      + R(10, 120, 120, 56, '#FFF8E1', 0, 3) + P('M6 120l6-10h116l6 10z', '#8D6E63', 3) + wins(18, 132, 8, 14, 8, 16) + wins(18, 154, 8, 14, 8, 14)
      + R(140, 34, 50, 142, '#FFF8E1', 0, 3) + P('M136 34l8-12h42l8 12z', '#8D6E63', 3) + Lc('M165 22V6M165 8l14 4-14 4', INK, 3)
      + C(165, 62, 17, '#FFFFFF', 3) + Lc('M165 62l9-9', '#E53935', 3) + Lc('M152 62h-4M178 62h4M165 49v-4', INK, 2)
      + C(165, 106, 17, '#FFFFFF', 3) + Lc('M165 106l-8 10', '#1E88E5', 3) + P('M156 102c4-6 14-6 18 0', 'none', 2) + R(156, 140, 18, 36, '#8D6E63', 1, 2.5)
      + R(194, 140, 40, 36, '#FFF8E1', 0, 3) + wins(200, 150, 2, 16, 8, 14) + kid(110, 228, '#43A047') + Lc('M118 210l20-16', '#FFE0BD', 3)),

  // ---------- around Neuschwanstein (Schwangau, Füssen, Tegelberg)
  L('de/neuschwanstein/landmark-hohenschwangau.v1.svg', 'ปราสาทโฮเอินชวังเกาสีเหลือง', 'Hohenschwangau, the yellow castle', ['hohenschwangau castle', 'ปราสาทโฮเอินชวังเกา', 'yellow castle', 'ปราสาทสีเหลือง', 'schloss hohenschwangau', 'alpsee', 'ทะเลสาบอัลป์เซ', 'schwangau', 'king ludwig childhood', 'ปราสาทวัยเด็กของกษัตริย์'], 'หาปราสาทสีเหลืองที่มีหอคอยฟันเฟืองบนเนินเขียว', 'Find the yellow castle with jagged tower tops on the green hill',
    // a warm yellow castle with square towers topped by little jagged battlements on a wooded hill, a blue lake and mountains behind
    sky('#E3F2FD') + P('M-4 120l50-60 40 40 40-50 60 60 58-30v60H-4z', '#B0BEC5', 3) + P('M100 66l14-16 16 20z', '#FFFFFF', 0) + P('M-4 120h248v30H-4z', '#4FC3F7', 0)
      + P('M-4 244V170c40-30 80-40 124-40s90 10 124 40v74z', '#558B2F', 3) + [[24, 206], [52, 196], [196, 200], [222, 212]].map(([x, y]) => fir(x, y, 0.9)).join('')
      + R(70, 96, 100, 54, '#FFCA28', 0, 3) + wins(80, 108, 6, 15, 8, 14, '#FFFFFF') + wins(80, 130, 6, 15, 8, 12, '#FFFFFF')
      + [[56, 70, 22, 80], [160, 76, 24, 74], [106, 56, 28, 40]].map(([x, y, w, h]) => R(x, y, w, h, '#FFB300', 0, 3) + [0, 1, 2].map((k) => R(x - 2 + k * (w - 4) / 2, y - 9, 8, 9, '#FFB300', 0, 2.5)).join('') + R(x + w / 2 - 4, y + 12, 8, 12, '#FFFFFF', 1, 1.5)).join('')
      + P('M110 150v-14c0-12 20-12 20 0v14z', '#8D6E63', 2.5) + face(120, 82, 0.4)),
  L('de/neuschwanstein/landmark-marienbruecke.v1.svg', 'สะพานมารีนเหนือหุบผาโพลลัท', 'The Marienbrücke over the Pöllat gorge', ['marienbrücke', 'marienbrucke', 'marys bridge', 'สะพานมารีน', 'pöllat gorge', 'pollat gorge', 'หุบผาโพลลัท', 'iron bridge', 'สะพานเหล็ก', 'castle viewpoint'], 'หาสะพานเหล็กบางๆ ที่ข้ามหุบเขาลึก', 'Find the thin iron bridge high above the deep gorge',
    // a slim iron footbridge with a lacy criss-cross truss underneath, spanning between two tall rock walls of a deep forested gorge, tiny people on it
    sky('#E1F5FE') + P('M-4 244V40c20 10 30 40 40 70s10 80 20 134z', '#8D8D7A', 3) + P('M244 244V30c-20 20-34 50-40 90s-6 80-14 124z', '#8D8D7A', 3)
      + [[10, 150], [22, 200], [222, 140], [210, 196]].map(([x, y]) => fir(x, y, 0.8, '#33691E')).join('') + P('M70 244c10-30 30-50 50-56s40 26 50 56z', '#33691E', 2.5)
      + R(36, 92, 172, 8, '#546E7A', 1, 3) + Lc('M36 86h172', '#455A64', 3) + Array.from({ length: 12 }, (_, k) => Lc(`M${42 + k * 14} 86v6`, '#455A64', 2)).join('')
      + P('M40 100h164l-12 22H52z', 'none', 3) + Array.from({ length: 10 }, (_, k) => Lc(`M${52 + k * 14} 122l14-22M${66 + k * 14} 122l-14-22`, '#78909C', 2)).join('').replace(/M192 122l14-22/, '')
      + kid(96, 92, '#E53935', 0.7) + kid(132, 92, '#1E88E5', 0.7) + kid(150, 92, '#FFCA28', 0.7)),
  L('de/neuschwanstein/landmark-thronehall.v1.svg', 'ห้องบัลลังก์ในปราสาทนอยชวานสไตน์', 'The throne hall inside Neuschwanstein', ['throne hall', 'ห้องบัลลังก์', 'golden chandelier', 'โคมระย้าทอง', 'castle interior', 'ภายในปราสาท', 'mosaic floor', 'พื้นโมเสก', 'neuschwanstein tour', 'blue ceiling with stars'], 'หาโคมระย้าทองรูปมงกุฎยักษ์ที่ห้อยกลางห้อง', 'Find the giant golden crown-shaped chandelier hanging in the middle of the hall',
    // a tall hall with a deep blue starry ceiling, gold and red columns on both sides, a huge golden crown-shaped chandelier with candles, a mosaic floor of circles, a child looking up
    sky('#1A237E') + Array.from({ length: 14 }, (_, k) => C(14 + (k * 37) % 212, 10 + ((k * 23) % 40), 2.2, '#FFD54F', 0)).join('')
      + [[20, '#C62828'], [52, '#1565C0'], [176, '#1565C0'], [208, '#C62828']].map(([x, c]) => R(x, 56, 14, 140, c, 0, 2.5) + R(x - 3, 52, 20, 8, '#FFC107', 1, 2) + R(x - 3, 192, 20, 8, '#FFC107', 1, 2)).join('')
      + P('M34 56c0-30 172-30 172 0', 'none', 3) + Lc('M120 0v40', '#FFC107', 3)
      + E(120, 74, 54, 12, '#FFC107', 3) + P('M66 74l8 16h92l8-16', '#FFB300', 3) + Array.from({ length: 9 }, (_, k) => R(70 + k * 12, 56, 4, 12, '#FFFFFF', 1, 1.5) + C(72 + k * 12, 52, 2.5, '#FF7043', 0)).join('') + [74, 120, 166].map((x) => C(x, 92, 4, '#E53935', 1.5)).join('')
      + P('M-4 200h248v44H-4z', '#D7CCC8', 3) + [[60, 222], [120, 222], [180, 222]].map(([x, y]) => E(x, y, 26, 9, '#A1887F', 2) + E(x, y, 13, 4, '#4DB6AC', 1.5)).join('') + kid(120, 196, '#FB8C00') + face(120, 78, 0.3)),
  L('de/neuschwanstein/landmark-grotto.v1.svg', 'ห้องถ้ำในปราสาทนอยชวานสไตน์', 'The secret grotto room inside Neuschwanstein', ['grotto room', 'ห้องถ้ำในปราสาท', 'artificial cave', 'ถ้ำประดิษฐ์', 'castle interior', 'ภายในปราสาท', 'stalactites', 'หินย้อย', 'neuschwanstein tour', 'coloured lights'], 'หาหินย้อยในห้องถ้ำที่ซ่อนอยู่ในปราสาท', 'Find the stalactites in the cave room hidden inside the castle',
    // a cave-like room built inside the castle: lumpy rock walls lit green and purple, pointed stalactites from the ceiling, a little arched glass door to the garden room, a child with a torch
    sky('#4A148C') + P('M-4-4h248v60c-20 10-30-6-50 6s-30-4-50 4-40-6-60 4-40-4-50 2-30-6-38 0z', '#7B1FA2', 3)
      + [[30, 54, 26], [74, 60, 34], [118, 58, 28], [160, 62, 36], [204, 56, 24]].map(([x, y, h]) => P(`M${x - 8} ${y}l8 ${h} 8-${h}z`, '#CE93D8', 2.5)).join('')
      + P('M-4 244V120c20-20 30 10 50-6s20 30 20 60l-6 70z', '#2E7D32', 3) + P('M244 244V110c-20-14-34 14-50 0s-20 40-16 70l6 64z', '#2E7D32', 3)
      + P('M96 200v-54c0-30 48-30 48 0v54z', '#B2EBF2', 3) + Lc('M120 120v80M96 160h48', '#4DD0E1', 3)
      + P('M-4 244v-40c60-12 180-12 248 0v40z', '#6A1B9A', 3) + E(60, 220, 18, 6, '#80DEEA', 2) + kid(178, 222, '#FFCA28') + R(188, 186, 5, 18, '#8D6E63', 1, 1.5) + C(190, 182, 6, '#FFEB3B', 2) + face(120, 172, 0.35)),
  L('de/neuschwanstein/landmark-kitchen.v1.svg', 'ห้องครัวโบราณในปราสาทนอยชวานสไตน์', 'The old castle kitchen of Neuschwanstein', ['castle kitchen', 'ห้องครัวปราสาท', 'copper pots', 'หม้อทองแดง', 'roasting spit', 'เหล็กเสียบย่าง', 'castle interior', 'ภายในปราสาท', 'neuschwanstein tour', 'old stove'], 'หาหม้อทองแดงที่แขวนเรียงบนผนัง', 'Find the shiny copper pots hanging in a row on the wall',
    // a vaulted castle kitchen: a pale pillar holding the arches, a long black iron stove, shiny copper pots and pans hanging in a row with little faces, a roasting spit with a wheel
    sky('#FFF8E1') + P('M-4 70c40-60 80-60 124 0 44-60 84-60 124 0V-4H-4z', '#D7CCC8', 3) + R(112, 66, 16, 120, '#EFEBE9', 0, 3)
      + Lc('M10 92h220', '#8D6E63', 4) + [[30, 22], [64, 28], [168, 24], [206, 20]].map(([x, r]) => Lc(`M${x} 92v10`, INK, 2) + P(`M${x - r} ${102}h${2 * r}c0 ${r} -${2 * r} ${r} -${2 * r} 0z`, '#E07B39', 2.5) + face(x, 110, 0.25)).join('')
      + R(14, 150, 212, 50, '#37474F', 2, 3) + [[40, 150], [92, 150], [148, 150], [200, 150]].map(([x, y]) => E(x, y, 16, 4, '#263238', 2)).join('') + R(26, 170, 30, 22, '#263238', 1, 2) + R(184, 170, 30, 22, '#263238', 1, 2) + C(120, 176, 10, '#FF7043', 2)
      + Lc('M70 140h100', '#9E9E9E', 3) + C(176, 140, 9, 'none', 3) + Lc('M176 131v18M167 140h18', '#9E9E9E', 2)
      + P('M-4 200h248v44H-4z', '#BCAAA4', 3) + kid(60, 236, '#E53935')),
  L('de/neuschwanstein/landmark-almabtrieb.v1.svg', 'ขบวนวัวลงจากทุ่งเขาประดับดอกไม้', 'Cows coming down from the Alps in flower crowns', ['almabtrieb', 'อาล์มอาพทรีบ', 'cattle drive', 'ขบวนต้อนวัว', 'flower crown cow', 'วัวสวมมงกุฎดอกไม้', 'cow bells', 'กระดิ่งวัว', 'alpine pasture', 'schwangau'], 'หาวัวที่สวมมงกุฎดอกไม้ใหญ่บนหัว', 'Find the cow wearing a big flower crown on her head',
    // a brown Alpine cow walking down a mountain path wearing a tall headdress of flowers and ribbons and a big bell on a wide collar, green slopes and peaks behind
    sky('#E3F2FD') + P('M-4 110l50-50 40 30 50-60 60 50 48-20v60H-4z', '#CFD8DC', 3) + P('M120 20l18 18-14-2-10 8-10-8z', '#FFFFFF', 0) + P('M-4 244V120c80-20 160-10 248 20v104z', '#7CB342', 3)
      + Lc('M40 244c20-40 60-60 120-80', '#D7CCC8', 18)
      + g(118, 160, 1, E(0, 0, 56, 30, '#A1673F') + R(-46, 18, 12, 30, '#A1673F', 3) + R(30, 18, 12, 30, '#A1673F', 3) + R(-28, 22, 12, 28, '#A1673F', 3) + R(12, 22, 12, 28, '#A1673F', 3) + Lc('M54-6c10 10 8 24 2 32', '#A1673F', 4)
        + E(-58, -14, 26, 24, '#A1673F') + E(-64, -2, 16, 10, '#D7CCC8') + C(-70, -4, 2, INK, 0) + C(-58, -4, 2, INK, 0) + P('M-40-34c4-10 12-12 16-8M-74-34c-4-10-12-12-16-8', 'none', 3)
        + Lc('M-36 8c-12 8-28 8-38 0', '#E53935', 6) + P('M-62 12h12l4 20h-20z', '#FFC107', 2.5)
        + [[-82, -46, '#E53935'], [-70, -54, '#FFEB3B'], [-56, -56, '#EC407A'], [-42, -50, '#42A5F5'], [-34, -40, '#FFFFFF']].map(([x, y, c]) => C(x, y, 10, c, 2) + C(x, y, 3, '#FFB300', 0)).join('')
        + Lc('M-66-46l-6 30M-52-48l4 30', '#AB47BC', 3) + face(-58, -12, 0.35, 'none'))
      + [[30, 120], [210, 150]].map(([x, y]) => C(x, y, 3, '#FFEB3B', 0) + C(x + 8, y + 4, 3, '#FFFFFF', 0)).join('')),
  L('de/neuschwanstein/landmark-rodelbahn.v1.svg', 'รางเลื่อนฤดูร้อนที่เขาเทเกิลแบร์ก', 'The summer toboggan run on the Tegelberg', ['summer toboggan', 'รางเลื่อนฤดูร้อน', 'sommerrodelbahn', 'tegelberg', 'เทเกิลแบร์ก', 'alpine slide', 'สไลเดอร์ภูเขา', 'mountain coaster', 'schwangau', 'sled ride'], 'หาเลื่อนคันเล็กที่วิ่งลงมาตามรางเงิน', 'Find the little sled whizzing down the shiny silver track',
    // a shiny steel rail track winding in curves down a green mountainside, a child on a little sled cart holding the brake stick, speed lines, peaks above
    sky('#E1F5FE') + P('M-4 90l60-60 50 40 40-30 98 60v20H-4z', '#B0BEC5', 3) + P('M56 30l14 14-10 0-6 6-8-8z', '#FFFFFF', 0) + P('M-4 244V100c80-30 160-30 248 0v144z', '#8BC34A', 3)
      + Lc('M30 110c120 10 160 30 100 56s-110 30-10 60 150 10 150 10', '#90A4AE', 14) + Lc('M30 110c120 10 160 30 100 56s-110 30-10 60 150 10 150 10', '#ECEFF1', 6)
      + [[24, 150], [210, 120], [214, 196], [16, 214]].map(([x, y]) => fir(x, y, 0.8)).join('')
      + g(90, 176, 1, P('M-22 6h44l-4 10h-36z', '#E53935', 3) + C(0, -18, 10, '#FFE0BD', 2) + P('M-10-6h20v12h-20z', '#1E88E5', 2) + Lc('M8 0l14-14', '#5D4037', 3) + face(0, -16, 0.26, 'o'), -12)
      + Lc('M126 170h20M130 180h24M128 160h14', '#FFFFFF', 3)),

  // ---------- Vienna
  L('at/vienna/landmark-belvedere.v1.svg', 'พระราชวังเบลเวเดียร์และสระน้ำ', 'The Belvedere Palace and its mirror pond', ['belvedere', 'เบลเวเดียร์', 'belvedere palace', 'พระราชวังเบลเวเดียร์', 'mirror pond', 'สระกระจกเงา', 'baroque garden', 'สวนบาโรก', 'green copper roofs', 'art museum'], 'หาพระราชวังที่มองเห็นเงาตัวเองในสระน้ำยาว', 'Find the palace looking at its own reflection in the long pond',
    // a white baroque palace with green copper domed roofs on its corner pavilions, a long flat pond in front holding its upside-down reflection
    sky('#FFF8E1') + P('M-4 118h248v18H-4z', '#9CCC65', 0)
      + R(20, 78, 200, 40, '#FFFFFF', 0, 3) + wins(28, 88, 13, 15, 7, 16, '#90CAF9')
      + [[20, 30], [190, 30], [96, 48]].map(([x, w]) => P(`M${x} 78c0-24 ${w} -24 ${w} 0z`, '#4DB6AC', 3) + C(x + w / 2, 58, 4, '#4DB6AC', 2)).join('')
      + R(96, 70, 48, 48, '#FFFFFF', 0, 3) + P('M104 118v-18c0-10 32-10 32 0v18z', '#B0BEC5', 2.5)
      + P('M-4 136h248v108H-4z', '#81D4FA', 3) + g(0, 254, 1, '<g transform="scale(1 -1)" opacity=".45">' + R(20, 78, 200, 40, '#FFFFFF', 0, 0) + R(96, 70, 48, 48, '#FFFFFF', 0, 0) + P('M96 78c0-24 48-24 48 0z', '#4DB6AC', 0) + '</g>')
      + Lc('M30 214h50M150 226h60', '#E1F5FE', 3) + [[10, 136], [222, 136]].map(([x, y]) => g(x, y, 1, P('M-8 0l8-30 8 30z', '#2E7D32', 2))).join('') + face(120, 92, 0.35)),
  L('at/vienna/landmark-karlskirche.v1.svg', 'โบสถ์คาร์ลสเคียร์เชอกับเสาคู่', 'The Karlskirche with its two great columns', ['karlskirche', 'คาร์ลสเคียร์เชอ', 'st charles church', 'โบสถ์เซนต์ชาร์ลส์', 'green dome', 'โดมสีเขียว', 'two columns', 'เสาคู่ลายเกลียว', 'karlsplatz', 'baroque church'], 'หาเสาใหญ่สองต้นที่มีลายเกลียววนขึ้นไป', 'Find the two giant columns with stripes spiralling up them',
    // a baroque church with a big oval green dome and lantern, a temple-front porch in the middle, two tall columns with spiralling bands on either side, small bell towers at the ends, a pond in front
    sky('#E3F2FD') + R(20, 112, 200, 70, '#FFF8E1', 0, 3) + R(4, 90, 30, 92, '#FFF8E1', 0, 3) + R(206, 90, 30, 92, '#FFF8E1', 0, 3) + P('M2 90l17-14 17 14zM204 90l17-14 17 14z', '#4DB6AC', 2.5)
      + P('M78 112c0-70 84-70 84 0z', '#4DB6AC', 3) + R(110, 26, 20, 18, '#FFF8E1', 0, 2.5) + P('M108 26l12-12 12 12z', '#4DB6AC', 2.5) + R(78, 104, 84, 10, '#FFF8E1', 0, 2.5) + wins(88, 74, 4, 18, 6, 14, '#FFF8E1')
      + P('M96 126l24-18 24 18z', '#FFF8E1', 3) + [100, 112, 128, 140].map((x) => R(x - 3, 128, 6, 50, '#FFFFFF', 0, 2)).join('')
      + [[60], [180]].map(([x]) => R(x - 9, 60, 18, 120, '#ECEFF1', 2, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${x - 9} ${74 + k * 18}l18-10`, '#B0BEC5', 3)).join('') + R(x - 12, 52, 24, 10, '#ECEFF1', 2, 2.5) + C(x, 46, 6, '#FFC107', 2)).join('')
      + P('M-4 182h248v62H-4z', '#81D4FA', 3) + Lc('M30 206h60M130 220h70', '#E1F5FE', 3) + face(120, 90, 0.35)),
  L('at/vienna/landmark-hundertwasser.v1.svg', 'บ้านฮุนเดิร์ทวัสเซอร์สีสดเป็นคลื่น', 'The wavy, colourful Hundertwasser House', ['hundertwasserhaus', 'hundertwasser house', 'บ้านฮุนเดิร์ทวัสเซอร์', 'colourful building', 'ตึกหลากสี', 'wavy lines', 'เส้นคลื่น', 'trees on the roof', 'ต้นไม้บนหลังคา', 'golden onion domes'], 'หาต้นไม้ที่งอกออกมาจากหน้าต่างและบนหลังคา', 'Find the trees growing out of the windows and on the roof',
    // a block of flats painted in patches of red, yellow, blue and white with wavy lines between floors, windows of all sizes, trees sprouting from windows and the roof, two little golden onion domes
    sky('#E1F5FE') + R(20, 70, 200, 150, '#FFFFFF', 0, 3)
      + P('M20 70h70v40c-20 6-50-6-70 0z', '#E53935', 2.5) + P('M90 70h60v44c-20 6-40-4-60-4z', '#FFCA28', 2.5) + P('M150 70h70v36c-30 8-40-2-70 8z', '#1E88E5', 2.5)
      + P('M20 150c40-8 60 8 100 0s60-10 100 0v30H20z', '#81C784', 2.5) + P('M20 180c30 8 70-8 110 2s60-4 90 0v38H20z', '#FFAB91', 2.5)
      + [[34, 82, 12, 18], [108, 84, 14, 12], [178, 80, 10, 16], [40, 122, 14, 14], [92, 126, 10, 12], [140, 120, 16, 16], [196, 124, 12, 14], [58, 160, 12, 12], [158, 160, 14, 12], [34, 192, 12, 16], [120, 194, 14, 14], [190, 192, 12, 16]].map(([x, y, w, h], k) => R(x, y, w, h, ['#B3E5FC', '#FFF59D', '#C5E1A5'][k % 3], 2, 2)).join('')
      + [[46, 70, 18], [174, 70, 16], [148, 128, 12], [66, 160, 12]].map(([x, y, r]) => C(x, y - r, r, '#43A047', 2.5) + Lc(`M${x} ${y}v-${r / 2}`, '#6D4C41', 3)).join('')
      + [[96, 70], [124, 70]].map(([x, y]) => P(`M${x - 9} ${y}c0-14 9-14 9-24 0 10 9 10 9 24z`, '#FFC107', 2.5)).join('') + R(108, 200, 16, 20, '#8D6E63', 2, 2.5) + face(120, 132, 0.4)),
  L('at/vienna/landmark-palmhouse.v1.svg', 'เรือนกระจกปาล์มแห่งเชินบรุนน์', 'The Palm House glasshouse at Schönbrunn', ['palmenhaus', 'palm house', 'เรือนกระจกปาล์ม', 'glasshouse', 'เรือนกระจก', 'greenhouse', 'tropical plants', 'ต้นไม้เมืองร้อน', 'schönbrunn gardens', 'iron and glass'], 'หาต้นปาล์มที่อยู่ข้างในบ้านกระจกหลังใหญ่', 'Find the palm trees growing inside the huge glass house',
    // a long iron-and-glass greenhouse with three rounded glass halls, the middle one tallest, green palm leaves showing through the panes, flower beds in front
    sky('#FFF3E0') + P('M-4 190h248v54H-4z', '#9CCC65', 0)
      + [[20, 80, 64], [156, 80, 64], [74, 92, 50]].map(([x, w, h]) => P(`M${x} 190v-${h - 20}c0-${h - 10} ${w}-${h - 10} ${w} 0v${h - 20}z`, '#E0F7FA', 3)).join('')
      + P('M70 190v-80c0-60 100-60 100 0v80z', '#E0F7FA', 3)
      + [[46, 160], [120, 120], [196, 160], [96, 160], [146, 160]].map(([x, y]) => Lc(`M${x} 190v-${190 - y}`, '#8D6E63', 3) + [-28, -14, 0, 14, 28].map((a) => g(x, y, 1, P('M0 0c4-10 14-16 24-14-6 4-14 8-24 14z', '#43A047', 1.5), a - 60 + 90)).join('')).join('')
      + Array.from({ length: 6 }, (_, k) => Lc(`M${80 + k * 16} 190v-${k === 0 || k === 5 ? 50 : 100}`, '#546E7A', 2)).join('') + Lc('M74 140h92M24 160h52M164 160h52', '#546E7A', 2)
      + [[30, 206, '#EC407A'], [60, 210, '#FFEB3B'], [180, 208, '#AB47BC'], [212, 206, '#FF7043']].map(([x, y, c]) => C(x, y, 6, c, 2)).join('') + kid(120, 230, '#1E88E5') + face(120, 98, 0.35)),

  // ---------- Hallstatt and the Salzkammergut
  L('at/hallstatt/landmark-icecave.v1.svg', 'ถ้ำน้ำแข็งยักษ์ดัคชไตน์', 'The Dachstein giant ice cave', ['dachstein ice cave', 'ถ้ำน้ำแข็งดัคชไตน์', 'rieseneishöhle', 'giant ice cave', 'ถ้ำน้ำแข็งยักษ์', 'ice formations', 'กำแพงน้ำแข็ง', 'obertraun', 'โอเบอร์เทราน์', 'warm jacket'], 'หากำแพงน้ำแข็งสีฟ้าใสในถ้ำ', 'Find the shiny blue walls of ice inside the cave',
    // inside a dark rock cave: a huge frozen waterfall-like wall of pale blue ice, ice pillars, wooden steps with a railing and small warm lamps, a child in a bobble hat
    sky('#263238') + P('M-4 70c40-40 80-50 124-40s90 10 124 50V-4H-4z', '#455A64', 3) + P('M-4 244V90c20 20 30 80 26 154zM244 244V100c-20 30-26 80-24 144z', '#37474F', 3)
      + P('M60 210c-6-50 0-110 20-140 20 10 30-6 46 0 20 4 30 20 34 30 10 40 10 80 4 110z', '#B3E5FC', 3) + Lc('M84 90c-6 40-4 80 0 110M112 80c-4 40-2 90 2 120M140 96c2 40 4 70 2 104', '#E1F5FE', 4)
      + [[40, 70, 50], [190, 76, 46]].map(([x, y, h]) => P(`M${x - 8} ${y + h}c0-${h} 16-${h} 16 0z`, '#81D4FA', 2.5)).join('')
      + P('M-4 244v-28h40v-10h40v-8h60v8h40v10h68v28z', '#8D6E63', 3) + Lc('M20 196h190', '#6D4C41', 3) + [30, 90, 150, 200].map((x) => Lc(`M${x} 196v16`, '#6D4C41', 3) + C(x, 190, 4, '#FFCA28', 2)).join('')
      + g(120, 206, 1, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#E53935', 2) + P('M-9-24c0-10 18-10 18 0z', '#1E88E5', 2) + C(0, -32, 3, '#FFFFFF', 1.5) + face(0, -18, 0.22, 'o')) + face(118, 150, 0.4)),
  L('at/hallstatt/landmark-gosausee.v1.svg', 'ทะเลสาบโกเซาเซสะท้อนธารน้ำแข็งดัคชไตน์', 'Lake Gosausee mirroring the Dachstein', ['gosausee', 'ทะเลสาบโกเซาเซ', 'gosau lake', 'gosau', 'โกเซา', 'dachstein reflection', 'เงาภูเขาดัคชไตน์', 'mirror lake', 'ทะเลสาบกระจก', 'lakeside walk'], 'หายอดเขาหิมะที่กลับหัวอยู่ในน้ำ', 'Find the snowy mountain standing upside-down in the water',
    // a still emerald-green lake with a jagged grey peak capped in snow and ice standing behind, its full reflection upside-down in the water, larch trees on both shores
    sky('#E3F2FD') + P('M-4 120l40-36 30 16 40-70 26 30 20-20 50 50 42-10v40H-4z', '#90A4AE', 3) + P('M106 30l-14 24 10-4 6 8 8-10 10 6z', '#FFFFFF', 2) + P('M132 60l20-20 22 22-8-2-6 6-10-6z', '#FFFFFF', 2)
      + P('M-4 120h248v124H-4z', '#26A69A', 3) + '<g opacity=".4">' + P('M-4 120l40 36 30-16 40 70 26-30 20 20 50-50 42 10v-40H-4z', '#B0BEC5', 0) + P('M106 210l-14-24 10 4 6-8 8 10 10-6z', '#FFFFFF', 0) + '</g>'
      + [[12, 124], [34, 122], [210, 124], [230, 124]].map(([x, y]) => fir(x, y, 0.9, '#558B2F')).join('') + Lc('M40 170h40M150 190h50M70 214h60', '#B2DFDB', 3) + kid(200, 238, '#FFCA28', 0.9) + face(106, 84, 0.3)),
  L('at/hallstatt/landmark-marktplatz.v1.svg', 'ลานตลาดกลางหมู่บ้านฮัลล์สตัทท์', 'Hallstatt\'s little market square', ['hallstatt market square', 'ลานตลาดฮัลล์สตัทท์', 'marktplatz', 'มาร์คท์พลัทซ์', 'painted houses', 'บ้านทาสี', 'flower boxes', 'กระบะดอกไม้', 'village fountain', 'old village'], 'หากระบะดอกไม้แดงที่ทุกหน้าต่าง', 'Find the red flowers in a box under every window',
    // a cosy square of tall narrow pastel houses with steep roofs and wooden balconies, red geraniums in boxes under every window, a round stone fountain trough in front
    sky('#E1F5FE') + P('M-4 40l40-30 60 40 50-36 60 40 38-14v40H-4z', '#78909C', 0)
      + [[-4, 48, '#FFF59D'], [46, 52, '#FFCCBC'], [96, 48, '#C8E6C9'], [146, 52, '#B3E5FC'], [196, 48, '#F8BBD0']].map(([x, w, c], k) => R(x, 90 - (k % 2) * 10, w, 130, c, 0, 3) + P(`M${x - 4} ${90 - (k % 2) * 10}l${w / 2 + 4}-34 ${w / 2 + 4} 34z`, '#6D4C41', 3) + [0, 1].map((r) => R(x + 10, 110 - (k % 2) * 10 + r * 40, 12, 16, '#FFFFFF', 1, 2) + R(x + w - 22, 110 - (k % 2) * 10 + r * 40, 12, 16, '#FFFFFF', 1, 2) + R(x + 8, 126 - (k % 2) * 10 + r * 40, w - 16, 6, '#8D6E63', 1, 2) + [x + 14, x + w / 2, x + w - 14].map((fx) => C(fx, 124 - (k % 2) * 10 + r * 40, 3.5, '#E53935', 1.5)).join('')).join('')).join('')
      + P('M-4 210h248v34H-4z', '#BDBDBD', 3) + E(120, 214, 46, 12, '#90A4AE', 3) + R(74, 198, 92, 16, '#90A4AE', 0, 0) + Lc('M74 198v16M166 198v16', INK, 3) + E(120, 198, 46, 10, '#4FC3F7', 3) + R(116, 172, 8, 26, '#78909C', 1, 2) + Lc('M124 180c8 0 10 6 10 14', '#4FC3F7', 3) + face(70, 168, 0.3)),
  L('at/hallstatt/landmark-boathouses.v1.svg', 'โรงเก็บเรือไม้บนเสาริมทะเลสาบ', 'The wooden boathouses on stilts', ['boathouses', 'โรงเก็บเรือ', 'bootshütten', 'stilt houses', 'บ้านบนเสา', 'plätte', 'เรือพแลทเทอ', 'flat wooden boat', 'เรือไม้ท้องแบน', 'hallstatter see'], 'หาโรงเรือนไม้หลังคาแหลมที่ยืนบนเสาในน้ำ', 'Find the wooden huts with pointy roofs standing on legs in the water',
    // a row of dark wooden boathouses with very steep roofs standing on wooden posts in the lake, a long narrow flat-bottomed boat with an upturned bow moored in front, mountains behind
    sky('#E3F2FD') + P('M-4 120c30-70 70-90 120-60s90-40 128 10v50H-4z', '#558B2F', 3) + P('M-4 120h248v124H-4z', '#4FC3F7', 3)
      + [[30, 52], [96, 48], [158, 56]].map(([x, w]) => R(x, 96, w, 40, '#6D4C41', 0, 3) + P(`M${x - 6} 96l${w / 2 + 6}-44 ${w / 2 + 6} 44z`, '#4E342E', 3) + Array.from({ length: 4 }, (_, k) => Lc(`M${x + 6 + k * (w - 12) / 3} 136v24`, '#4E342E', 4)).join('') + P(`M${x + w / 2 - 12} 136v-22h24v22z`, '#263238', 2.5) + Lc(`M${x + 6} 100v34M${x + w - 6} 100v34`, '#8D6E63', 2)).join('')
      + P('M30 196h160c10 0 20-10 26-20l4 6c-6 14-16 24-30 26H30z', '#A1673F', 3) + Lc('M50 196l-6-8M110 196v-10', '#5D4037', 3) + Lc('M20 220h60M140 226h70', '#E1F5FE', 3) + face(122, 120, 0.3)),
  L('at/hallstatt/landmark-rudolfsturm.v1.svg', 'หอคอยรูดอล์ฟเหนือหมู่บ้าน', 'The Rudolfsturm tower high above the village', ['rudolfsturm', 'หอคอยรูดอล์ฟ', 'salzberg', 'ภูเขาเกลือ', 'viewpoint tower', 'หอชมวิว', 'mountain terrace', 'ระเบียงบนเขา', 'salt mountain', 'hallstatt'], 'หาหอคอยหินที่เกาะอยู่บนหน้าผาสูง', 'Find the stone tower perched on a ledge high on the cliff',
    // a sturdy square stone tower with a red-and-white shuttered window and a low hipped roof sitting on a rocky ledge, sun umbrellas on its terrace, the lake and tiny village roofs far below
    sky('#FFF8E1') + P('M-4 244V150h248v94z', '#4FC3F7', 0) + [[30, 150], [50, 146], [70, 152]].map(([x, y]) => P(`M${x - 8} ${y}l8-8 8 8z`, '#FF7043', 1.5)).join('') + Lc('M100 200h40M150 220h50', '#B3E5FC', 3)
      + P('M244 244V40c-30 20-50 60-60 100s-30 70-40 104z', '#8D8D7A', 3) + P('M90 120c30-10 80-10 120 0l-6 20H96z', '#A1887F', 3)
      + R(110, 54, 52, 66, '#E0E0E0', 0, 3) + Array.from({ length: 4 }, (_, k) => Lc(`M110 ${66 + k * 14}h52`, '#BDBDBD', 2)).join('') + P('M104 54l32-24 32 24z', '#6D4C41', 3) + R(126, 74, 20, 22, '#FFFFFF', 1, 2) + Lc('M126 78h20M126 86h20M126 94h20', '#E53935', 2.5)
      + [[178, 106, '#E53935'], [200, 110, '#43A047']].map(([x, y, c]) => P(`M${x - 12} ${y}c0-10 24-10 24 0z`, c, 2) + Lc(`M${x} ${y}v12`, INK, 2)).join('') + [[30, 90], [52, 80]].map(([x, y]) => P(`M${x - 6} ${y}c0-4 12-4 12 0`, 'none', 2)).join('') + face(136, 104, 0.25)),

  // ---------- Salzburg and Innsbruck
  L('at/salzburg/landmark-hellbrunn.v1.svg', 'น้ำพุแกล้งคนที่วังเฮลบรุนน์', 'The trick fountains of Hellbrunn', ['hellbrunn palace', 'วังเฮลบรุนน์', 'trick fountains', 'น้ำพุแกล้งคน', 'wasserspiele', 'water games', 'stone table', 'โต๊ะหิน', 'surprise squirts', 'get wet'], 'หาน้ำที่พุ่งออกมาจากเก้าอี้หินแบบไม่ทันตั้งตัว', 'Find the water squirting up out of the stone seats by surprise',
    // a long stone table with stone stools in a garden, thin jets of water suddenly squirting up from the stools and the ground, a laughing child jumping away with arms up
    sky('#E8F5E9') + P('M-4 90c40-20 80-20 120 0s80-20 128 0v24H-4z', '#81C784', 3) + P('M-4 114h248v130H-4z', '#D7CCC8', 3)
      + R(56, 146, 128, 16, '#BDBDBD', 2, 3) + R(64, 162, 12, 30, '#9E9E9E', 0, 2.5) + R(164, 162, 12, 30, '#9E9E9E', 0, 2.5)
      + [[44, 180], [86, 200], [154, 200], [196, 180]].map(([x, y]) => R(x - 9, y, 18, 16, '#BDBDBD', 2, 2.5) + Lc(`M${x} ${y}v-${y - 110}`, '#4FC3F7', 4) + Lc(`M${x} ${y - 30}c-6 -4 -8 -10 -6 -18M${x} ${y - 30}c6 -4 8 -10 6 -18`, '#81D4FA', 2) + C(x - 6, 112, 3, '#81D4FA', 0) + C(x + 6, 116, 3, '#81D4FA', 0)).join('')
      + g(120, 230, 1, C(0, -26, 10, '#FFE0BD', 2) + P('M-10 4v-20h20v20z', '#FFCA28', 2) + Lc('M-10-14l-12-14M10-14l12-14', '#FFE0BD', 4) + face(0, -24, 0.26, 'o'))),
  L('at/salzburg/landmark-nockerl.v1.svg', 'ซัลซ์บวร์กเกอร์น็อคเคิร์ล ของหวานสามยอดเขา', 'Salzburger Nockerl, the three-peak pudding', ['salzburger nockerl', 'ซัลซ์บวร์กเกอร์น็อคเคิร์ล', 'nockerl', 'soufflé', 'ซูเฟล่', 'three peaks', 'สามยอดเขา', 'sweet dessert', 'ของหวาน', 'powdered sugar'], 'หายอดขนมสีทองสามยอดที่โรยน้ำตาลเหมือนหิมะ', 'Find the three golden puffs dusted with sugar like snow',
    // an oval baking dish holding three puffy golden soufflé peaks dusted with white sugar like snowy mountains, raspberry sauce at the side, a smiling face on the middle peak
    P('M30 150h180c0 34-30 56-90 56s-90-22-90-56z', '#FFFFFF') + Lc('M44 172c40 10 112 10 152 0', '#1E88E5', 3) + E(120, 150, 90, 20, '#FFF3E0')
      + P('M44 150c4-44 22-62 36-62s28 24 30 62z', '#FFB74D') + P('M130 150c2-38 16-58 30-58s30 18 36 58z', '#FFB74D') + P('M78 150c4-60 24-90 42-90s38 30 42 90z', '#FFCC80')
      + P('M96 82c10-12 20-16 24-16s14 4 24 16c-8 4-16 0-24 4-8-4-16 0-24-4z', '#FFFFFF', 2) + P('M64 100c6-8 12-10 16-10s10 2 14 10c-6 2-10 0-14 2-4-2-10 0-16-2z', '#FFFFFF', 2) + P('M146 104c6-8 10-10 14-10s10 2 16 10c-6 2-10 0-16 2-4-2-8 0-14-2z', '#FFFFFF', 2)
      + E(186, 160, 14, 6, '#C2185B', 2) + [[60, 70], [180, 64], [120, 40]].map(([x, y]) => C(x, y, 2, '#FFFFFF', 1)).join('') + face(120, 118, 0.45)),
  L('at/salzburg/landmark-pferdeschwemme.v1.svg', 'สระอาบน้ำม้าที่มีภาพม้าบนกำแพง', 'The horse pond with its painted horses', ['pferdeschwemme', 'แพร์เดอชเวมเมอ', 'horse pond', 'สระอาบน้ำม้า', 'horse paintings', 'ภาพวาดม้า', 'baroque fountain', 'น้ำพุบาโรก', 'herbert von karajan platz', 'old town'], 'หาภาพม้าในกรอบที่วาดเรียงบนกำแพง', 'Find the horses painted in frames along the wall',
    // a curved baroque wall with framed paintings of prancing horses, a balustrade in front of a long basin of water, a stone rearing horse on a plinth in the middle
    sky('#E3F2FD') + P('M-4 200V70c40-14 80-20 124-20s84 6 124 20v130z', '#FFF8E1', 3) + R(-4, 60, 248, 12, '#BCAAA4', 0, 3)
      + [[24, 86], [80, 80], [140, 80], [196, 86]].map(([x, y]) => R(x - 22, y, 44, 40, '#FFE082', 2, 3) + R(x - 18, y + 4, 36, 32, '#90CAF9', 1, 2) + g(x, y + 26, 1, E(0, -4, 10, 5, '#FFFFFF', 1.5) + P('M8-6l6-10 4 2-4 10z', '#FFFFFF', 1.5) + Lc('M-6 0l-4 8M4 0l4 8M-10-6l-6-4', '#FFFFFF', 2))).join('')
      + R(-4, 150, 248, 50, '#BCAAA4', 0, 3) + Array.from({ length: 12 }, (_, k) => R(4 + k * 20, 156, 8, 18, '#D7CCC8', 3, 2)).join('') + P('M-4 200h248v44H-4z', '#4FC3F7', 3)
      + R(100, 160, 40, 50, '#BDBDBD', 1, 3) + g(112, 160, 1, Lc('M-6-28c-16 2-22 14-18 26', '#9E9E9E', 6) + Lc('M0-2l-4-26M10-2l-2-26', '#E0E0E0', 7) + P('M-10-24c-4-16 8-36 28-44 12-4 20 4 16 14-4 12-20 26-34 34z', '#E0E0E0') + P('M22-58l8-26c4-8 18-8 22 2l-2 8-14-2-4 22z', '#E0E0E0') + P('M34-92l2-8 4 7z', '#E0E0E0', 2) + Lc('M24-62l6-24', '#9E9E9E', 5) + Lc('M32-54l14-4 2 12M26-46l14 2 0 12', '#E0E0E0', 6) + C(42, -82, 1.8, INK, 0))
      + Lc('M20 222h50M160 228h50', '#E1F5FE', 3) + face(120, 184, 0.3)),
  L('at/salzburg/landmark-stier.v1.svg', 'ออร์แกนกระทิงซัลซ์บวร์กในป้อมโฮเอินซัลซ์บวร์ก', 'The Salzburg Bull, the fortress\'s roaring organ', ['salzburger stier', 'salzburg bull', 'ออร์แกนกระทิงซัลซ์บวร์ก', 'barrel organ', 'ออร์แกนลม', 'organ pipes', 'ท่อออร์แกน', 'hohensalzburg fortress', 'ป้อมโฮเอินซัลซ์บวร์ก', 'music box'], 'หาท่อออร์แกนขนาดใหญ่ที่ส่งเสียงดังเหมือนวัวกระทิงร้อง', 'Find the giant pipes that roar like a bull',
    // a wooden cabinet of tall shiny organ pipes set into a stone fortress wall, loud wavy sound lines puffing out like a bull's snort, a pinned barrel with a crank, a child covering their ears and grinning
    sky('#ECEFF1') + Array.from({ length: 5 }, (_, r) => Array.from({ length: 6 }, (_, k) => R(-10 + k * 48 + (r % 2) * 24, r * 30, 48, 30, '#CFD8DC', 0, 2)).join('')).join('')
      + P('M50 210V70c0-30 140-30 140 0v140z', '#8D6E63', 3) + [[64, 120], [80, 96], [96, 80], [112, 70], [128, 70], [144, 80], [160, 96], [176, 120]].map(([x, y]) => R(x - 6, y, 12, 150 - y, '#FFD54F', 3, 2.5) + P(`M${x - 6} ${150}l6 8 6-8z`, '#212121', 1.5)).join('')
      + R(56, 160, 128, 46, '#6D4C41', 2, 3) + R(80, 170, 80, 26, '#A1887F', 12, 2.5) + Array.from({ length: 8 }, (_, k) => C(88 + k * 9, 176 + (k % 3) * 6, 2, '#FFD54F', 0)).join('') + Lc('M160 183h20v-14', '#455A64', 3) + C(180, 166, 4, '#E53935', 2)
      + Lc('M196 70c10-6 20 6 30 0M196 90c14-6 24 6 38 0M196 110c10-6 20 6 30 0', '#E53935', 3) + Lc('M44 70c-10-6-20 6-30 0M44 90c-14-6-24 6-38 0', '#E53935', 3)
      + g(30, 236, 1, C(0, -22, 9, '#FFE0BD', 2) + P('M-9 4v-16h18v16z', '#43A047', 2) + R(-14, -28, 6, 10, '#FFE0BD', 2, 1.5) + R(8, -28, 6, 10, '#FFE0BD', 2, 1.5) + face(0, -20, 0.22, 'o')) + face(120, 132, 0.35)),
  L('at/salzburg/landmark-alpenzoo.v1.svg', 'แพะภูเขาไอเบ็กซ์ที่สวนสัตว์อัลไพน์อินส์บรุค', 'An ibex at the Alpine Zoo in Innsbruck', ['alpenzoo', 'alpine zoo', 'สวนสัตว์อัลไพน์', 'innsbruck', 'อินส์บรุค', 'ibex', 'แพะภูเขาไอเบ็กซ์', 'steinbock', 'curved horns', 'nordkette'], 'หาแพะภูเขาที่มีเขาโค้งยาวยืนบนก้อนหิน', 'Find the mountain goat with long curved horns standing on the rock',
    // an Alpine ibex with huge ridged horns curving back, standing proudly on a big grey boulder, a rocky mountain range above the zoo behind
    sky('#E1F5FE') + P('M-4 120l40-50 30 20 40-60 40 40 30-30 68 60v20H-4z', '#B0BEC5', 3) + P('M106 30l-12 18 10-2 8 6 6-8z', '#FFFFFF', 0) + P('M-4 244V150c80-20 160-20 248 0v94z', '#9CCC65', 3)
      + P('M50 244c-4-50 20-90 70-96s80 30 80 96z', '#9E9E9E', 3) + Lc('M90 180c10 4 20 2 30-6M150 190c6 6 14 8 24 6', '#757575', 3)
      + g(118, 128, 1, E(0, 0, 40, 20, '#A1887F') + R(-32, 10, 8, 30, '#A1887F', 2) + R(-16, 12, 8, 28, '#A1887F', 2) + R(10, 12, 8, 28, '#A1887F', 2) + R(26, 10, 8, 30, '#A1887F', 2)
        + P('M30-8c6-14 14-22 24-22s14 10 12 22c-4 8-14 10-22 8z', '#A1887F') + E(60, -4, 9, 7, '#D7CCC8') + P('M54 12c2 8-2 14-6 16', 'none', 3)
        + P('M42-26c-6-30 6-56 34-64 6 2 8 6 6 8-22 10-30 30-28 54z', '#8D6E63', 2.5) + Array.from({ length: 6 }, (_, k) => Lc(`M${44 + k * 4} ${-30 - k * 9}l7 3`, INK, 2)).join('') + face(50, -14, 0.3, 'none'))),

  // ---------- Czechia
  F('cz', 'food', 'svickova', 'สวีชโควา เนื้อซอสครีมกับขนมปังนึ่ง', 'Svíčková with bread dumplings', ['svickova', 'svíčková', 'สวีชโควา', 'cream sauce beef', 'เนื้อซอสครีม', 'bread dumplings', 'knedlíky', 'ขนมปังนึ่งชิ้น', 'cranberries', 'czech food'],
    // a plate of beef slices under a smooth orange cream sauce, round slices of fluffy bread dumpling, a swirl of whipped cream topped with red cranberries and a lemon slice
    E(120, 150, 100, 54, '#FFFFFF') + E(120, 150, 84, 42, '#ECEFF1', 2) + P('M50 150c10-30 60-40 90-28s40 30 20 46c-30 16-90 14-110-18z', '#FFB74D', 3)
      + [[66, 132, -10], [100, 126, 0], [134, 132, 10]].map(([x, y, a]) => g(x, y, 1, E(0, 0, 20, 10, '#A1673F', 2.5) + Lc('M-12 0h24', '#8D6E63', 2), a)).join('')
      + [[150, 160], [176, 148], [178, 174], [204, 162]].map(([x, y]) => E(x, y, 16, 12, '#FFF8E1', 2.5) + C(x - 4, y - 2, 1.5, '#E0D7C0', 0) + C(x + 5, y + 3, 1.5, '#E0D7C0', 0)).join('')
      + P('M90 104c-6-14 8-22 16-14 4-10 18-6 16 6 6 6 0 16-8 14H98c-10 0-12-6-8-6z', '#FFFFFF', 2.5) + [[100, 96], [110, 92], [108, 102]].map(([x, y]) => C(x, y, 4, '#C62828', 1.5)).join('') + C(130, 106, 9, '#FFF176', 2) + Lc('M130 97v18M121 106h18', '#FBC02D', 1.5) + face(100, 160, 0.4)),
  F('cz', 'food', 'oplatky', 'แผ่นเวเฟอร์สปาจากคาร์โลวีวารี', 'Karlovy Vary spa wafers', ['spa wafers', 'oplatky', 'lázeňské oplatky', 'แผ่นเวเฟอร์สปา', 'karlovy vary', 'คาร์โลวีวารี', 'round wafer', 'ขนมเวเฟอร์กลม', 'hazelnut filling', 'czech sweets'],
    // a stack of big round paper-thin wafers with a pressed pattern of rings and dots, the top one with a bite missing and a smiling face, crumbs around
    [[120, 186], [120, 172], [120, 158], [120, 144]].map(([x, y], k) => E(x, y, 86, 22, k % 2 ? '#FFE0B2' : '#FFCC80', 3)).join('')
      + P('M34 130c0-30 172-30 172 0 0 14-40 24-86 24S34 144 34 130z', '#FFE0B2', 3) + P('M182 116c8 2 14 6 18 10-6 6-14 4-16 0-6 2-8-4-2-10z', '#FFFFFF', 0)
      + E(120, 128, 66, 15, 'none', 2) + E(120, 128, 42, 9, 'none', 2) + Array.from({ length: 10 }, (_, k) => C(120 + Math.cos(k * 0.63) * 54, 128 + Math.sin(k * 0.63) * 12, 2, '#E59E3F', 0)).join('') + C(120, 128, 5, '#E59E3F', 1.5)
      + [[30, 210], [56, 220], [196, 214]].map(([x, y]) => C(x, y, 3, '#FFCC80', 1.5)).join('') + face(120, 172, 0.4)),
  F('cz', 'food', 'kolace', 'ขนมโกลาเชไส้เมล็ดป๊อปปี้ ชีส และพลัม', 'Koláče, round Czech pastries', ['kolace', 'koláče', 'โกลาเช', 'kolache', 'round pastry', 'ขนมอบกลม', 'poppy seed', 'เมล็ดป๊อปปี้', 'plum jam', 'czech bakery'],
    // three round golden pastries on a wooden board, one filled with dark poppy seeds, one with white sweet cheese and one with purple plum jam, crumble sprinkles on top
    R(20, 150, 200, 50, '#A1673F', 10) + Lc('M30 170h180', '#8D5524', 2) + C(210, 175, 4, '#8D5524', 2)
      + [[64, 140, '#37474F'], [120, 120, '#FFFDE7'], [176, 140, '#7B1FA2']].map(([x, y, c]) => C(x, y, 36, '#FFB74D') + C(x, y, 24, c, 2.5) + [[-8, -6], [6, -10], [10, 6], [-6, 10], [0, 0]].map(([dx, dy]) => C(x + dx, y + dy, 2.5, '#FFE0B2', 1)).join('')).join('')
      + face(120, 118, 0.35)),
  F('cz', 'culture', 'carp', 'ปลาคาร์พว่ายในอ่างอาบน้ำก่อนคริสต์มาส', 'The Christmas carp in the bathtub', ['christmas carp', 'ปลาคาร์พคริสต์มาส', 'kapr', 'carp in the bathtub', 'ปลาในอ่างอาบน้ำ', 'czech christmas', 'คริสต์มาสแบบเช็ก', 'christmas eve', 'czech tradition', 'ประเพณีเช็ก'],
    // an old white bathtub on little claw feet filled with water, a big golden-brown carp swimming in it with a happy face, bubbles, a child peeking over the rim
    R(150, 50, 40, 70, '#B2DFDB', 4) + Lc('M170 50V30c0-10 20-10 20 0', '#90A4AE', 4) + C(190, 34, 4, '#90A4AE', 2)
      + P('M24 120h192c0 50-30 80-96 80s-96-30-96-80z', '#FFFFFF') + R(16, 112, 208, 12, '#ECEFF1', 6) + P('M36 124h168c-4 34-32 56-84 56s-80-22-84-56z', '#4FC3F7', 0)
      + [[50, 198], [190, 198]].map(([x, y]) => P(`M${x - 8} ${y}l4 14h8l4-14z`, '#FFC107', 2.5)).join('')
      + g(118, 150, 1, E(0, 0, 44, 20, '#E0A030') + P('M40-2l26-18v40z', '#E0A030') + P('M-10-18c6-10 18-12 26-6', 'none', 3) + Array.from({ length: 5 }, (_, k) => P(`M${-14 + k * 10} -6c4 4 4 10 0 14`, 'none', 2)).join('') + face(-22, -4, 0.3))
      + [[80, 126], [92, 116], [160, 128]].map(([x, y]) => C(x, y, 4, '#E1F5FE', 1.5)).join('') + g(196, 114, 1.7, C(0, -10, 10, '#FFE0BD', 2) + P('M-10-14c4-10 16-10 20 0', '#8D6E63', 2) + face(0, -8, 0.24, 'o'))),

  // ---------- Prague
  L('cz/prague/landmark-klementinum.v1.svg', 'ห้องสมุดบาโรกในเคลเมนทินุม', 'The baroque library hall of the Klementinum', ['klementinum', 'เคลเมนทินุม', 'baroque library', 'ห้องสมุดบาโรก', 'old books', 'หนังสือเก่า', 'painted ceiling', 'เพดานภาพวาด', 'globes', 'ลูกโลกโบราณ'], 'หาลูกโลกโบราณที่ตั้งเรียงกลางห้องสมุด', 'Find the old globes standing in a row in the middle of the library',
    // a long library hall with golden carved wooden shelves full of leather books up both walls and a gallery, a painted sky ceiling, old globes standing in a row down the middle
    sky('#FFF3E0') + P('M-4 50c40-40 208-40 248 0V-4H-4z', '#B3E5FC', 3) + P('M60 20c10-8 30-8 40 0M150 26c10-8 24-8 34 0', '#FFFFFF', 2)
      + [[-4, 52], [192, 52]].map(([x, w]) => R(x, 50, w, 170, '#A1673F', 0, 3) + Array.from({ length: 6 }, (_, r) => Array.from({ length: 5 }, (_, k) => R(x + 4 + k * 9.5, 56 + r * 26, 8, 20, ['#8D3B2B', '#2E5E4E', '#7B5E2B', '#3E4A7A'][(k + r) % 4], 1, 1)).join('')).join('') + Lc(`M${x} ${106}h${w}`, '#FFC107', 4)).join('')
      + R(48, 100, 144, 8, '#FFC107', 1, 2.5) + P('M48 100c30-30 114-30 144 0', 'none', 3)
      + [[84, 186, 16, '#81D4FA'], [120, 180, 20, '#A5D6A7'], [156, 186, 16, '#FFE082']].map(([x, y, r, c]) => C(x, y, r, c, 2.5) + Lc(`M${x - r} ${y}h${2 * r}M${x} ${y - r}c-${r / 2} ${r / 2}-${r / 2} ${r * 1.5} 0 ${r * 2}`, '#5D4037', 1.5) + P(`M${x - 6} ${y + r + 20}l6-20 6 20z`, '#8D6E63', 2)).join('')
      + P('M-4 226h248v18H-4z', '#D7CCC8', 3) + face(120, 178, 0.35)),
  L('cz/prague/landmark-powdertower.v1.svg', 'หอดินปืน ประตูเมืองเก่าปราก', 'The Powder Tower, Prague\'s dark old gate', ['powder tower', 'หอดินปืน', 'prašná brána', 'prasna brana', 'gothic gate', 'ประตูเมืองโกธิก', 'old town gate', 'ประตูเมืองเก่า', 'municipal house', 'royal route'], 'หาประตูโค้งที่ทะลุผ่านตรงฐานหอคอยสีดำ', 'Find the arched gateway that goes right through the bottom of the dark tower',
    // a tall dark gothic tower with a steep pointed slate roof and little pointed turrets at the corners, carved stone bands, a big arched gateway at the bottom with a yellow tram passing beside
    sky('#E3F2FD') + R(-4, 120, 60, 110, '#FFE0B2', 0, 3) + wins(4, 132, 3, 16, 8, 14) + P('M-4 120l30-20 30 20z', '#4DB6AC', 2.5) + R(184, 130, 60, 100, '#FFF8E1', 0, 3) + wins(192, 142, 3, 16, 8, 14)
      + R(80, 70, 80, 160, '#5D5048', 0, 3) + P('M74 70l46-56 46 56z', '#37474F', 3) + Lc('M120 14v-10', INK, 3)
      + [[78, 70], [162, 70]].map(([x, y]) => P(`M${x - 6} ${y}l6-26 6 26z`, '#37474F', 2.5)).join('')
      + [96, 132, 168].map((y) => Lc(`M80 ${y}h80`, '#8D7B6E', 3)).join('') + [[98, 104], [142, 104], [98, 144], [142, 144]].map(([x, y]) => P(`M${x - 6} ${y + 14}v-10c0-8 12-8 12 0v10z`, '#3E3530', 2)).join('')
      + P('M100 230v-40c0-26 40-26 40 0v40z', '#263238', 3) + P('M-4 230h248v14H-4z', '#BDBDBD', 3) + face(120, 118, 0.35)),
  L('cz/prague/landmark-millwheel.v1.svg', 'กังหันน้ำริมคลองเชร์ตอฟกา', 'The old mill wheel on the Čertovka', ['certovka', 'čertovka', 'คลองเชร์ตอฟกา', 'mill wheel', 'กังหันน้ำ', 'water wheel', 'กังหันโรงสี', 'kampa island', 'เกาะคัมปา', 'devil\'s stream'], 'หากังหันไม้ใหญ่ที่หมุนอยู่ข้างบ้าน', 'Find the big wooden wheel turning beside the house',
    // a big wooden water wheel with paddles turning on the side of an old yellow house over a narrow green canal, water splashing, a stone bridge arch and red roofs behind
    sky('#E1F5FE') + P('M-4 100l30-20 30 20 30-24 30 24 30-18 30 18 30-22 38 22v20H-4z', '#E64A19', 2.5) + P('M150 120c0-30 94-30 94 0v20h-94z', '#BCAAA4', 3)
      + R(-4, 90, 104, 110, '#FFE082', 0, 3) + wins(10, 104, 3, 28, 14, 18) + wins(10, 140, 3, 28, 14, 18)
      + P('M-4 200h248v44H-4z', '#4DB6AC', 3) + Lc('M110 220h40M170 214h50', '#B2DFDB', 3)
      + g(150, 170, 1, C(0, 0, 52, 'none', 5) + C(0, 0, 40, 'none', 3) + C(0, 0, 10, '#6D4C41', 3) + Array.from({ length: 12 }, (_, k) => g(0, 0, 1, Lc('M0 10V40', '#8D6E63', 4) + R(-6, 40, 12, 14, '#A1673F', 1, 2.5), k * 30)).join(''))
      + '<g stroke="#8D6E63" stroke-width="5" fill="none"><circle cx="150" cy="170" r="52"/></g>' + Lc('M98 214c4-8 10-10 14-4M196 212c4-8 10-10 14-4', '#E1F5FE', 3) + face(50, 172, 0.35)),
  L('cz/prague/landmark-dancinghouse.v1.svg', 'ตึกเต้นรำริมแม่น้ำวัลตาวา', 'The Dancing House by the Vltava', ['dancing house', 'ตึกเต้นรำ', 'tančící dům', 'tancici dum', 'fred and ginger', 'curvy building', 'ตึกโค้งงอ', 'modern architecture', 'สถาปัตยกรรมสมัยใหม่', 'rasin embankment'], 'หาตึกสองหลังที่เหมือนกำลังจับมือเต้นรำกัน', 'Find the two buildings that look like they are dancing together',
    // two towers leaning together like dancing partners: a glass tower pinched at the waist like a swirling skirt, and a solid cream tower with wavy rows of windows and a round metal knot on top
    sky('#FFF3E0') + R(-4, 150, 60, 80, '#FFE0B2', 0, 3) + wins(4, 162, 3, 16, 8, 12) + R(196, 140, 48, 90, '#FFCCBC', 0, 3) + wins(202, 152, 2, 18, 8, 12)
      + P('M60 230l6-80c-12-20-8-60 0-90h50c4 30 6 70-6 90l8 80z', '#B3E5FC', 3) + Lc('M70 60l40 170M90 60l20 80M66 110l50 30', '#E1F5FE', 3) + P('M66 150c10 6 30 6 44 0', 'none', 3)
      + P('M120 230V80c20-6 50 6 70 0v150z', '#FFF8E1', 3) + Array.from({ length: 6 }, (_, r) => Array.from({ length: 4 }, (_, k) => R(128 + k * 15, 92 + r * 22 + (k % 2 ? 4 : -2) + (r % 2 ? 3 : 0), 9, 10, '#90CAF9', 1, 1.5)).join('')).join('')
      + g(160, 64, 1, E(0, 0, 26, 16, '#B0BEC5', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${-20 + k * 8} -12c4 8 4 16 0 24`, '#78909C', 2)).join(''))
      + face(88, 100, 0.3) + P('M-4 230h248v14H-4z', '#BDBDBD', 3)),
];

export default { places: {}, items };
