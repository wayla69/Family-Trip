// Wave 12, group kz (1 of 3): Kazakhstan, the country — stamp, flag, hello, two guides (a saiga calf and a Djungarian
// hamster) and fifteen pictures of the country's own home, games, food, animals and family days. No horses, no eagles or
// falcons, no camels, no kumys (docs/STOCK-ART.md §8); the yurt is the library's only yurt.
import { P, R, C, E, Lc, g, face, free, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const G = (cc, key, th, en, hth, hen, kw, svg) => ({ id: `${cc}.guide.${key}`, cat: 'guide', file: `${cc}/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });
const X = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +(+v).toFixed(1);
const pole = Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A');
const flagShape = 'M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z';
// the ram's-horn curl (koshkar muiiz), the Kazakh ornament: two spirals back to back on a stem
const horns = (x, y, s, col, w = 4, rot = 0) => g(x, y, s, Lc('M0 12V-4c0-14-18-20-24-10-6 10 6 18 12 10M0-4c0-14 18-20 24-10 6 10-6 18-12 10', col, w), rot);
const KZ = { k1: '#00A3C4', k2: '#00799A', k3: '#FFD54F' };

const items = [
  { id: 'kz.stamp', cat: 'stamp', file: 'kz/stamp.v1.svg', name: nm('ตราประทับคาซัคสถาน', 'Kazakhstan stamp'), kw: ['kazakhstan', 'คาซัคสถาน', 'qazaqstan', 'shanyrak', 'ชานึรัก'],
    // the shanyrak, the round wooden crown at the top of a yurt: crossed curved bars inside a golden ring, roof poles spreading out all round
    svg: countryStamp({ name: 'KAZAKHSTAN', ...KZ, emblem: ring(18, (k) => { const a = (k / 18) * Math.PI * 2; return Lc(`M${f1(100 + Math.cos(a) * 30)} ${f1(86 + Math.sin(a) * 30)}L${f1(100 + Math.cos(a) * 52)} ${f1(86 + Math.sin(a) * 52)}`, '#A1673F', 4); }).replace(/<path/g, '<path stroke-linecap="round"')
      + C(100, 86, 30, '#FFE082', 3) + [-13, 0, 13].map((d) => Lc(`M${100 + d} ${f1(86 - Math.sqrt(900 - d * d))}q${d * 0.5} ${f1(Math.sqrt(900 - d * d))} 0 ${f1(2 * Math.sqrt(900 - d * d))}`, '#C62828', 3.5) + Lc(`M${f1(100 - Math.sqrt(900 - d * d))} ${86 + d}q${f1(Math.sqrt(900 - d * d))} ${d * 0.5} ${f1(2 * Math.sqrt(900 - d * d))} 0`, '#C62828', 3.5)).join('') + C(100, 86, 30, 'none', 3.5) + C(100, 86, 52, 'none', 2) }) },
  { id: 'kz.flag', ch: '🇰🇿', cat: 'flag', file: 'kz/flag.v1.svg', name: nm('ธงคาซัคสถาน', 'Flag of Kazakhstan'), kw: ['kazakhstan', 'คาซัคสถาน', 'flag', 'ธง', 'golden sun', 'ดวงอาทิตย์สีทอง', 'sky blue', 'ฟ้าคราม'],
    // a sky-blue flag: a golden sun with many short rays, a golden bird with spread wings under it, a gold band of ram's-horn curls by the pole
    svg: free(pole + P(flagShape, '#00AFCA') + ring(32, (k) => { const a = (k / 32) * Math.PI * 2; return Lc(`M${f1(136 + Math.cos(a) * 17)} ${f1(80 + Math.sin(a) * 17)}L${f1(136 + Math.cos(a) * 24)} ${f1(80 + Math.sin(a) * 24)}`, '#FEC50C', 2.5); }) + C(136, 80, 13, '#FEC50C', 0)
      + g(136, 114, 1, P('M-38-4c12-8 26-6 38 6 12-12 26-14 38-6-10 2-20 8-26 16-4-3-8-3-12 0-4-3-8-3-12 0-6-8-16-14-26-16z', '#FEC50C', 0) + C(0, 4, 5, '#FEC50C', 0))
      + ring(5, (k) => horns(57, 54 + k * 20, 0.34, '#FEC50C', 6)) + P(flagShape, 'none')) },
  { id: 'kz.hello', cat: 'hello', file: 'kz/hello.v1.svg', name: nm('ซาเลม สวัสดี', 'Sälem, hello'), kw: ['salem', 'sälem', 'ซาเลม', 'hello', 'สวัสดี', 'kazakh', 'ภาษาคาซัค', 'fur hat', 'หมวกขนสัตว์'],
    // a child in a red velvet waistcoat with gold trim and a round blue hat with a soft fur band and a white feather tuft, waving hello
    svg: free(P('M78 214c0-42 18-60 42-60s42 18 42 60z', '#C62828') + P('M108 156l12 20 12-20z', '#FFFFFF', 3) + Lc('M102 162c-4 18-6 34-6 52M138 162c4 18 6 34 6 52', '#FFCA28', 4) + horns(120, 196, 0.5, '#FFCA28', 5)
      + P('M154 154c12-16 18-36 16-52l14 2c2 20-6 42-18 56z', '#C62828') + C(178, 94, 11, '#F1C9A5') + P('M86 152c-6 12-12 28-12 42l12 2c2-14 6-26 12-36z', '#C62828') + C(80, 200, 8, '#F1C9A5')
      + C(120, 120, 30, '#F1C9A5') + P('M92 120c-2-12 2-20 8-22h40c6 2 10 10 8 22-6-6-16-8-28-8s-22 2-28 8z', '#3E2723')
      + P('M90 98c0-30 12-44 30-44s30 14 30 44z', '#1E88E5') + Lc('M100 76c5 8 15 8 20 0 5 8 15 8 20 0', '#FFCA28', 3) + R(84, 88, 72, 18, '#F3E5D0', 9) + ring(8, (k) => Lc(`M${92 + k * 8} 92v10`, '#D7C0A0', 2))
      + P('M120 56c-12-12-12-30 0-40 2 14 6 26 0 40z', '#FFFFFF') + P('M122 56c4-14 14-22 22-22-4 10-12 18-22 22z', '#FFFFFF') + face(120, 124, 0.55)) },
  G('kz', 'saki', 'ซากิ', 'Saki', 'ซาเลม {name}! ซากิพาเที่ยวทุ่งหญ้ากว้างของคาซัคสถานเอง', 'Sälem, {name}! Saki will show you the wide Kazakh steppe', ['saiga', 'ไซกา', 'saiga antelope', 'แอนทิโลปไซกา', 'big nose', 'จมูกใหญ่', 'steppe', 'ทุ่งหญ้าสเตปป์', 'animal'],
    // a saiga calf's face: a sandy coat, two short ridged horns, soft ears, and the saiga's huge droopy nose like a little trunk
    P('M66 100c-28-4-44-22-42-38 18-2 38 12 50 28z', '#E6C79C') + P('M174 100c28-4 44-22 42-38-18-2-38 12-50 28z', '#E6C79C') + P('M60 92c-14-4-24-14-26-22 10 0 22 8 30 18z', '#F8BBD0', 0) + P('M180 92c14-4 24-14 26-22-10 0-22 8-30 18z', '#F8BBD0', 0)
      + [100, 140].map((x) => P(`M${x - 6} 74c-4-18-2-36 6-48 6 14 8 32 6 48z`, '#FFF3C4') + Lc(`M${x - 6} 62h10M${x - 5} 50h9M${x - 3} 38h6`, '#D7C08A', 2.5)).join('')
      + E(120, 118, 60, 56, '#E6C79C') + Lc('M120 66v20', '#CDA674', 7)
      + P('M84 132c0-16 16-24 36-24s36 8 36 24c4 22 6 42-4 56-8 12-56 12-64 0-10-14-8-34-4-56z', '#D9B382') + Lc('M90 140c18-8 42-8 60 0M90 154c18-7 42-7 60 0M92 168c16-6 40-6 56 0', '#B8915F', 3)
      + E(106, 186, 7, 6, '#6D4C41', 0) + E(134, 186, 7, 6, '#6D4C41', 0) + Lc('M112 200q8 5 16 0', INK, 3)
      + face(120, 100, 1.0, 'none')),
  G('kz', 'jalma', 'จัลมา', 'Jalma', 'จัลมาแก้มตุ่ยเต็มไปด้วยเมล็ดพืช แบ่งให้ {name} ด้วยนะ', "Jalma's cheeks are full of seeds — want one, {name}?", ['djungarian hamster', 'แฮมสเตอร์ดจังกาเรียน', 'dwarf hamster', 'แฮมสเตอร์แคระ', 'hamster', 'แฮมสเตอร์', 'seeds', 'เมล็ดทานตะวัน'],
    // a round little steppe hamster: soft grey fur with a dark stripe down its back, a white tummy, pink ears and paws, cheeks stuffed with seeds, holding a sunflower seed
    [78, 162].map((x) => C(x, 70, 16, '#B0BEC5') + C(x, 70, 8, '#FFB6C1', 0)).join('') + E(120, 136, 78, 72, '#CFD8DC') + Lc('M120 66v40', '#78909C', 9) + E(120, 178, 54, 30, '#FFFFFF', 0)
      + [52, 188].map((x) => E(x, 148, 20, 24, '#CFD8DC')).join('') + E(120, 178, 54, 30, '#FFFFFF', 0) + E(120, 142, 7, 5, '#FF8FA3', 2.5) + Lc('M112 152q4 5 8 0q4 5 8 0', INK, 3)
      + Lc('M104 144l-16-3M104 150l-14 3M136 144l16-3M136 150l14 3', '#78909C', 2) + E(120, 186, 10, 15, '#6D4C41') + Lc('M120 174v24', '#D7CCC8', 2.5) + [106, 134].map((x) => C(x, 184, 8, '#FFCDD2')).join('')
      + face(120, 120, 1.0, 'none')),
  X('kz', 'culture', 'yurt', 'บ้านกระโจมคาซัค กียิซอุย', 'A Kazakh yurt, the kiyiz üi', ['yurt', 'กระโจม', 'kiyiz ui', 'กียิซอุย', 'felt tent', 'กระโจมสักหลาด', 'nomads', 'ชนเผ่าเร่ร่อน', 'steppe', 'ทุ่งหญ้า'],
    // a round white felt yurt on the green steppe: a red patterned band round its wall, ropes across the domed roof, the wooden crown on top and a carved red door
    E(120, 204, 106, 14, '#AED581', 0) + P('M38 134h164v66c-52 8-112 8-164 0z', '#FFF8E1') + R(38, 134, 164, 16, '#C62828', 0, 3) + ring(6, (k) => horns(54 + k * 26.4, 142, 0.26, '#FFFFFF', 7))
      + P('M32 138c10-42 44-72 88-76 44 4 78 34 88 76z', '#FFFDF5') + Lc('M120 64C96 90 70 112 44 134M120 64c24 26 50 48 76 70M120 64C110 90 98 112 86 136M120 64c10 26 22 48 34 72', '#BCAAA4', 3)
      + E(120, 64, 22, 8, '#A1673F') + Lc('M104 62l32 4M104 66l32-4', '#FFE082', 2)
      + R(102, 154, 36, 48, '#E53935', 5) + Lc('M120 158v40', '#B71C1C', 2.5) + horns(111, 176, 0.3, '#FFCA28', 6) + horns(129, 176, 0.3, '#FFCA28', 6) + face(120, 106, 0.5)
      + ring(5, (k) => Lc(`M${24 + k * 48} 210l4-10 4 10`, '#7CB342', 3))),
  X('kz', 'culture', 'dombra', 'ดอมบรา พิณสองสายของคาซัค', 'The dombra, the two-string Kazakh lute', ['dombra', 'ดอมบรา', 'two strings', 'สองสาย', 'kazakh music', 'ดนตรีคาซัค', 'kui', 'เพลงกุย', 'folk instrument', 'เครื่องดนตรีพื้นบ้าน'],
    // a wooden dombra lying slanted: a teardrop body with a carved ornament, a long thin neck with tied frets, two strings and two tuning pegs
    g(120, 124, 0.72, g(0, 44, 1, R(-7, -152, 14, 150, '#8D5A3B', 3) + P('M-9-150l2-30h14l2 30z', '#6D4C41') + Lc('M-6-172h-10M6-160h10', '#5D4037', 5) + C(-18, -172, 6, '#FFE0B2', 2.5) + C(18, -160, 6, '#FFE0B2', 2.5)
      + ring(7, (k) => Lc(`M-7 ${-24 - k * 18}h14`, '#3E2723', 2.5))
      + P('M-10-10c-30 10-42 40-36 66 6 26 28 36 46 36s40-10 46-36c6-26-6-56-36-66z', '#E3A35E') + P('M-24 70c10 12 38 12 48 0', 'none', 3) + horns(0, 52, 0.55, '#8D5A3B', 5) + R(-14, 66, 28, 6, '#5D4037', 2, 2)
      + Lc('M-3 70V-176M3 70V-176', '#FFF8E1', 1.5) + face(0, 18, 0.6)), 35)),
  X('kz', 'culture', 'asyk', 'อาซึก เกมดีดกระดูกข้อเท้า', 'Asyk, the knucklebone game', ['asyk', 'อาซึก', 'knucklebones', 'กระดูกข้อเท้า', 'asyk atu', 'kids game', 'เกมเด็ก', 'painted bones', 'เกมพื้นบ้าน'],
    // a row of little painted knucklebones standing on a chalk line, and the big shooter bone sliding in to knock them out
    E(120, 166, 108, 44, '#E8DCCB', 0) + Lc('M26 150h188', '#FFFFFF', 4)
      + ['#FFF8E1', '#FDD835', '#FFF8E1', '#1E88E5', '#FFF8E1', '#43A047'].map((c, k) => g(46 + k * 30, 142, 0.6, P('M-22-14c8-6 36-6 44 0 4 6-2 10-2 14s6 8 2 14c-8 6-36 6-44 0-4-6 2-10 2-14s-6-8-2-14z', c) + Lc('M-10-2c6 4 14 4 20 0', '#BCAAA4', 3), (k % 2 ? 8 : -6))).join('')
      + g(118, 196, 1.2, P('M-22-14c8-6 36-6 44 0 4 6-2 10-2 14s6 8 2 14c-8 6-36 6-44 0-4-6 2-10 2-14s-6-8-2-14z', '#E53935') + face(0, -2, 0.36), -8) + Lc('M60 200h-24M64 212h-30M66 188h-18', '#BCAAA4', 3)),
  X('kz', 'culture', 'tuskiiz', 'ตุสกียิซ ผ้าแขวนผนังปักลาย', 'A tus kiiz, an embroidered wall hanging', ['tus kiiz', 'ตุสกียิซ', 'wall hanging', 'ผ้าแขวนผนัง', 'embroidery', 'งานปัก', 'ram horn pattern', 'ลายเขาแกะ', 'yurt decoration', 'ของแต่งกระโจม'],
    // a deep red velvet hanging on a wooden rod, a gold border, a big gold ram's-horn curl in the middle with smaller blue and white ones round it, tassels below
    Lc('M28 46h184', '#8D6E63', 8) + C(28, 46, 6, '#FFCA28', 2.5) + C(212, 46, 6, '#FFCA28', 2.5) + R(44, 52, 152, 134, '#8E2430', 6) + Lc('M54 62h132v114H54z', '#FFCA28', 4)
      + horns(120, 112, 1.5, '#FFCA28', 4) + [[74, 80], [166, 80], [74, 156], [166, 156]].map(([x, y], k) => horns(x, y, 0.55, k % 3 ? '#4FC3F7' : '#FFFFFF', 5)).join('') + face(120, 150, 0.36)
      + ring(7, (k) => Lc(`M${56 + k * 21.3} 186v16`, '#FFCA28', 3) + C(56 + k * 21.3, 206, 5, ['#E53935', '#29B6F6'][k % 2], 2))),
  X('kz', 'culture', 'saukele', 'ซาวเคเล หมวกเจ้าสาวทรงสูง', 'The saukele, a tall bridal hat', ['saukele', 'ซาวเคเล', 'bridal hat', 'หมวกเจ้าสาว', 'kazakh wedding', 'งานแต่งคาซัค', 'tall hat', 'หมวกทรงกรวย', 'museum', 'พิพิธภัณฑ์'],
    // a tall red cone hat on a wooden stand, gold plaques down its front, a soft white fur band at the bottom, a feather tuft on top and coral beads hanging at the sides
    E(120, 212, 40, 8, '#A1673F') + Lc('M120 206v-24', '#8D6E63', 7) + P('M88 168L112 44h16l24 124z', '#D32F2F') + ring(5, (k) => P(`M120 ${58 + k * 20}l7 7-7 7-7-7z`, '#FFCA28', 2)) + Lc('M104 104l-4 30M136 104l4 30', '#FFCA28', 2.5)
      + R(80, 160, 80, 22, '#FAFAFA', 11) + ring(8, (k) => Lc(`M${88 + k * 9} 164v12`, '#E0E0E0', 2)) + C(120, 42, 6, '#FFCA28', 2.5)
      + [-16, 0, 16].map((d) => P(`M120 38c${d - 8}-6 ${d * 1.4 - 6}-20 ${d * 1.2}-30 ${d * 0.4 + 6} 8 ${d * 0.3 + 6} 20 ${-d * 1.2}30z`, '#FFFFFF', 2.5)).join('')
      + [[84, -1], [156, 1]].map(([x, s]) => Lc(`M${x} 176c${s * 6} 12 ${s * 8} 24 ${s * 6} 34`, '#FFCA28', 2) + ring(3, (k) => C(x + s * (4 + k * 2), 188 + k * 9, 3.5, '#FF7043', 1.5))).join('') + face(120, 128, 0.32)),
  X('kz', 'culture', 'togyzkumalak', 'โตกึซกุมาลัก เกมกระดานเก้าหลุม', 'Togyz kumalak, the nine-pit board game', ['togyz kumalak', 'โตกึซกุมาลัก', 'board game', 'เกมกระดาน', 'nine pits', 'เก้าหลุม', 'counting stones', 'นับลูก', 'mancala', 'เกมหลุม'],
    // a long wooden board with two rows of nine little pits full of white balls and two long store slots in the middle, a happy ball rolling in front
    R(14, 82, 212, 104, '#B9774A', 18) + R(22, 90, 196, 88, 'none', 12, 2.5) + horns(14, 134, 0.4, '#FFE0B2', 5, 90) + horns(226, 134, 0.4, '#FFE0B2', 5, -90)
      + [106, 160].map((y) => ring(9, (k) => { const x = 36 + k * 21; return C(x, y, 8.5, '#7A4A2A', 2.5) + C(x - 3, y - 1, 2.6, '#FFF8E1', 0) + C(x + 3, y + 1, 2.6, '#FFF8E1', 0) + C(x, y + 4, 2.6, '#FFF8E1', 0); })).join('')
      + R(30, 127, 84, 12, '#7A4A2A', 6, 2.5) + R(126, 127, 84, 12, '#7A4A2A', 6, 2.5) + ring(5, (k) => C(44 + k * 8, 133, 3, '#FFF8E1', 0)) + ring(3, (k) => C(150 + k * 8, 133, 3, '#FFF8E1', 0))
      + C(190, 208, 13, '#FFF8E1') + face(190, 206, 0.3)),
  X('kz', 'food', 'beshbarmak', 'เบชบาร์มัก เนื้อต้มบนแผ่นแป้ง', 'Beshbarmak, meat on flat noodles', ['beshbarmak', 'เบชบาร์มัก', 'five fingers', 'ห้านิ้ว', 'flat noodles', 'เส้นแป้งแผ่น', 'boiled meat', 'เนื้อต้ม', 'national dish', 'อาหารประจำชาติ'],
    // a big round platter of wide square noodle sheets topped with chunks of boiled meat and rings of onion, a bowl of steaming broth beside it
    E(116, 150, 100, 46, '#ECEFF1') + E(116, 146, 86, 38, '#FFFFFF', 2.5) + ring(10, (k) => C(116 + Math.cos(k * 0.628) * 93, 150 + Math.sin(k * 0.628) * 42, 3, '#1E88E5', 0))
      + [[66, 146, 10], [92, 162, -14], [140, 164, 20], [166, 146, -8], [88, 132, 30], [146, 130, -24], [116, 170, 4]].map(([x, y, r]) => g(x, y, 1, R(-14, -11, 28, 22, '#FFF0CC', 4, 2.5), r)).join('')
      + [[100, 138, 20, 14], [134, 140, 18, 13], [116, 124, 24, 17]].map(([x, y, rx, ry]) => E(x, y, rx, ry, '#A1673F')).join('') + Lc('M84 152c4-6 12-6 16 0M136 156c4-6 12-6 16 0', '#FFFFFF', 3)
      + [[74, 128], [158, 132], [126, 156]].map(([x, y]) => C(x, y, 2.5, '#66BB6A', 0)).join('') + face(116, 122, 0.4)
      + P('M176 70h46c0 18-10 28-23 28s-23-10-23-28z', '#FFFFFF') + E(199, 70, 23, 6, '#FFE082') + Lc('M190 56c-4-6 4-10 0-16M206 56c-4-6 4-10 0-16', '#CFD8DC', 3)),
  X('kz', 'food', 'baursak', 'เบาร์ซัก แป้งทอดพองฟู', 'Baursak, puffy fried dough', ['baursak', 'เบาร์ซัก', 'fried dough', 'แป้งทอด', 'puffy bread', 'ขนมปังพองฟู', 'tea time', 'เวลาน้ำชา', 'celebration', 'งานฉลอง'],
    // a blue patterned bowl heaped with golden puffed squares of fried dough, one little puff sitting out in front smiling
    P('M38 140h164c0 42-36 66-82 66s-82-24-82-66z', '#1E88E5') + ring(4, (k) => horns(68 + k * 34, 170, 0.36, '#FFFFFF', 5)) + E(120, 140, 82, 12, '#90CAF9')
      + [[72, 126, -10], [104, 120, 8], [140, 124, -4], [170, 128, 12], [88, 98, 14], [124, 94, -8], [156, 102, 6], [108, 70, 4], [140, 74, -12]].map(([x, y, r]) => g(x, y, 1, P('M-18-14c6-6 30-6 36 0 6 8 6 22 0 28-6 6-30 6-36 0-6-6-6-20 0-28z', '#E7A13E') + Lc('M-10-8c6-3 14-3 18 0', '#F7CF7E', 3), r)).join('')
      + g(196, 204, 0.9, P('M-18-14c6-6 30-6 36 0 6 8 6 22 0 28-6 6-30 6-36 0-6-6-6-20 0-28z', '#E7A13E') + face(0, -2, 0.3))),
  X('kz', 'food', 'kurt', 'กุร์ต ลูกชีสแห้งเค็ม', 'Kurt, little dried cheese balls', ['kurt', 'qurt', 'กุร์ต', 'dried cheese', 'ชีสแห้ง', 'salty snack', 'ของว่างรสเค็ม', 'nomad food', 'อาหารชาวเร่ร่อน'],
    // a cloth pouch tied with red string, spilling little white balls and finger-pressed ovals of dried cheese onto a striped cloth
    P('M10 196l30-26h170l20 26z', '#FFCC80') + Lc('M26 184h194M40 174h176', '#E57373', 3)
      + P('M64 180c-22-30-18-82 8-98 4-8 16-10 22-4 10-6 30-6 40 0 6-6 18-4 22 4 26 16 30 68 8 98z', '#C8A97E') + Lc('M80 84c14 8 50 8 66 0', '#C62828', 4) + Lc('M146 84c8-8 18-6 20 2', '#C62828', 3)
      + ring(4, (k) => C(96 + k * 12, 74 - (k % 2) * 4, 7, '#FFFDF5', 2.5))
      + [[150, 176], [170, 182], [190, 174], [208, 184], [134, 186], [182, 194]].map(([x, y], k) => (k % 3 === 2 ? g(x, y, 1, E(0, 0, 10, 7, '#FFFDF5') + Lc('M-4-5v10M2-5v10', '#E0D6C2', 2), -20) : C(x, y, 8, '#FFFDF5') + C(x - 2, y - 2, 1.5, '#E0D6C2', 0))).join('')
      + face(112, 136, 0.5)),
  X('kz', 'food', 'nauryzkozhe', 'นาอูรึซโคเจ ซุปเจ็ดอย่างวันขึ้นปีใหม่', 'Nauryz kozhe, the seven-ingredient spring soup', ['nauryz kozhe', 'นาอูรึซโคเจ', 'nauryz', 'นาอูรึซ', 'spring new year', 'ปีใหม่ฤดูใบไม้ผลิ', 'kazan', 'หม้อกาซาน', 'seven ingredients', 'ซุปเจ็ดอย่าง'],
    // a round iron kazan pot of creamy soup with seven kinds of bits floating in it, a wooden ladle, steam curling up, sitting on a clay stove with a little fire
    R(48, 176, 144, 38, '#C68A5E', 8) + P('M100 214v-14c0-14 40-14 40 0v14z', '#5D4037') + P('M110 212c-2-10 6-14 10-20 4 6 12 10 10 20z', '#FF7043', 2)
      + P('M36 112h168c0 54-38 84-84 84s-84-30-84-84z', '#78909C') + [30, 210].map((x) => E(x, 118, 10, 7, '#607D8B')).join('') + E(120, 112, 86, 15, '#546E7A') + E(120, 112, 76, 10, '#FFF8E1', 0)
      + [[84, 110, '#A1673F'], [100, 114, '#FFCA28'], [118, 108, '#FFFFFF'], [136, 114, '#8D6E63'], [152, 109, '#C5E1A5'], [74, 114, '#F48FB1'], [164, 113, '#FFE082']].map(([x, y, c]) => E(x, y, 4, 2.5, c, 1.5)).join('')
      + Lc('M150 108L190 42', '#A1673F', 8) + Lc('M80 90c-6-10 6-16 0-28M120 86c-6-10 6-16 0-28', '#CFD8DC', 4) + face(120, 150, 0.55)),
  X('kz', 'animal', 'jerboa', 'เจอร์บัว หนูกระโดดหูยาว', 'A long-eared jerboa', ['jerboa', 'เจอร์บัว', 'long-eared jerboa', 'หนูหูยาว', 'hopping', 'กระโดด', 'desert night', 'คืนทะเลทราย', 'tiny animal', 'สัตว์ตัวจิ๋ว'],
    // a tiny sandy jerboa standing on huge long back feet, enormous ears, a very long tail ending in a black-and-white tuft, a crescent moon behind
    P('M196 26a20 20 0 1 0 14 34 16 16 0 1 1-14-34z', '#FFF59D', 3) + E(120, 210, 70, 10, '#F3D9A4', 0)
      + Lc('M92 150c-34 10-60 26-70 56', INK, 10) + Lc('M92 150c-34 10-60 26-70 56', '#E8C39E', 5) + E(20, 208, 10, 13, '#FFFFFF') + P('M11 214c4 6 14 6 18 0-2 10-16 10-18 0z', INK, 0)
      + E(102, 158, 20, 24, '#E8C39E') + P('M96 176l-6 30h24l-4-4h-12l4-26z', '#E8C39E') + E(118, 136, 30, 32, '#E8C39E') + E(124, 146, 18, 18, '#FFF8E1', 0)
      + [[134, 74, -8], [160, 76, 14]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 13, 34, '#E8C39E') + E(0, 4, 7, 26, '#FFB6C1', 0), r)).join('') + C(146, 112, 24, '#E8C39E')
      + E(166, 118, 4, 3, '#FF8FA3', 0) + [[134, 150], [150, 146]].map(([x, y]) => E(x, y, 4, 6, '#E8C39E', 2)).join('') + face(146, 112, 0.42)),
  X('kz', 'animal', 'tazy', 'ตาซึ สุนัขล่าเนื้อคาซัค', 'The tazy, the Kazakh sighthound', ['tazy', 'ตาซึ', 'kazakh greyhound', 'สุนัขคาซัค', 'sighthound', 'สุนัขล่าเนื้อ', 'dog', 'หมา', 'national dog', 'สุนัขประจำชาติ'],
    // a slim cream sighthound standing tall: a long fine nose, silky feathered ears, a deep chest, long thin legs and a tail curled into a ring at the tip
    E(124, 210, 88, 7, '#E0E0E0', 0) + Lc('M182 118c16 16 18 48 6 62-8 8-20 0-14-8 4-5 12-3 11 4', INK, 9) + Lc('M182 118c16 16 18 48 6 62-8 8-20 0-14-8 4-5 12-3 11 4', '#F3E2C7', 4)
      + [0, 16].map((d) => P(`M${158 + d} 124c10 10 12 26 4 38l-4 44h-10l3-46c2-12-2-24 7-36z`, d ? '#F3E2C7' : '#E6CFAE')).join('') + R(72, 130, 9, 76, '#E6CFAE', 4) + R(88, 132, 9, 74, '#F3E2C7', 4)
      + P('M74 100c30-8 70-8 102 4 12 4 16 18 8 28-8 8-22 6-34 2-14-4-28 0-40 8-12 8-30 10-40 2-10-10-8-32 4-44z', '#F3E2C7') + P('M70 112c-8-16-6-34 2-44l20 6c-6 10-6 24-2 36z', '#F3E2C7')
      + P('M80 60c-14 0-38 10-52 18 2 6 8 9 16 9 14 0 32-4 40-10 6-8 6-16-4-17z', '#F3E2C7') + E(30, 79, 4, 3, INK, 0) + C(64, 70, 3.8, INK, 0) + E(58, 79, 6, 3.5, '#FF8FA3', 0) + Lc('M40 86q6 3 12 0', INK, 2.5)
      + P('M80 60c10 2 16 14 14 30-2 8-8 10-12 4-4-8-6-22-2-34z', '#D7B98E') + Lc('M84 92l-3 8M90 92l-1 8', '#D7B98E', 3) + Lc('M66 100l16 6', '#E53935', 4) + C(74, 104, 3.5, '#FFCA28', 1.5)),
  X('kz', 'culture', 'besik', 'เบซิก เปลไม้ของเด็กคาซัค', 'The besik, a wooden Kazakh cradle', ['besik', 'เบซิก', 'cradle', 'เปลเด็ก', 'baby', 'ทารก', 'besik toi', 'งานเบซิกโตย', 'lullaby', 'เพลงกล่อมเด็ก'],
    // a carved wooden cradle on curved rockers with a bar across the top, a baby asleep under a bright patterned blanket, a little moon toy hanging from the bar
    Lc('M24 192c44 24 148 24 192 0', INK, 14) + Lc('M24 192c44 24 148 24 192 0', '#8D5A3B', 8) + R(62, 170, 12, 26, '#8D5A3B', 3) + R(166, 170, 12, 26, '#8D5A3B', 3)
      + R(54, 88, 12, 50, '#8D5A3B', 4) + R(174, 88, 12, 50, '#8D5A3B', 4) + R(50, 80, 140, 12, '#A1673F', 6) + Lc('M120 92v20', '#FFFFFF', 2) + P('M120 112a10 10 0 1 0 8 16 8 8 0 1 1-8-16z', '#FFF59D', 2.5)
      + R(46, 128, 148, 50, '#C1834F', 12) + horns(86, 160, 0.42, '#FFE082', 5) + horns(154, 160, 0.42, '#FFE082', 5)
      + P('M58 132c26-14 100-14 124 0v10H58z', '#E53935') + Lc('M70 136h100', '#FFCA28', 3) + C(78, 124, 16, '#F8D9BC') + P('M62 120c2-14 30-16 32 0z', '#4FC3F7')
      + Lc('M70 126q4 4 8 0M82 126q4 4 8 0', INK, 2.5) + E(66, 132, 4, 2.5, '#FF8FA3', 0) + E(90, 132, 4, 2.5, '#FF8FA3', 0)),
  X('kz', 'culture', 'tusaukeser', 'ตูเซาเคเซอร์ งานฉลองก้าวแรก', 'Tusaukeser, the first-steps party', ['tusaukeser', 'ตูเซาเคเซอร์', 'first steps', 'ก้าวแรก', 'toddler', 'เด็กหัดเดิน', 'cutting the cord', 'ตัดเชือก', 'sweets', 'ลูกอม', 'family party', 'งานฉลองครอบครัว'],
    // a toddler stepping forward along a white cloth path, the black-and-white cord round its ankles just cut, wrapped sweets flying all round
    P('M74 222l26-110h40l26 110z', '#FFFFFF') + Lc('M90 220l18-98M150 220l-18-98', '#E0E0E0', 2)
      + P('M100 156l6-40h28l6 40z', '#F06292') + Lc('M106 124l-20 14M134 124l20 14', '#F06292', 9) + C(84, 140, 6, '#F8D9BC', 2) + C(156, 140, 6, '#F8D9BC', 2) + R(108, 156, 9, 24, '#F8D9BC', 4) + R(124, 156, 9, 24, '#F8D9BC', 4)
      + C(120, 94, 24, '#F8D9BC') + P('M98 88c4-18 40-18 44 0-10-6-34-6-44 0z', '#5D4037') + C(120, 66, 6, '#5D4037', 2) + face(120, 96, 0.42)
      + Lc('M96 176c10 6 20 6 28 0M120 178c8 6 20 6 28 0', '#FFFFFF', 5) + `<path d="M96 176c10 6 20 6 28 0M120 178c8 6 20 6 28 0" fill="none" stroke="${INK}" stroke-width="5" stroke-dasharray="4 4"/>`
      + ring(7, (k) => { const x = [34, 60, 188, 208, 44, 196, 170][k], y = [60, 104, 56, 108, 156, 160, 30][k]; return g(x, y, 1, E(0, 0, 9, 6, ['#E53935', '#FFCA28', '#29B6F6', '#AB47BC', '#66BB6A', '#FF7043', '#FFCA28'][k], 2) + P('M-9 0l-7-6v12zM9 0l7-6v12z', '#FFF8E1', 2), k * 25 - 40); })),
  X('kz', 'culture', 'shapan', 'ชาปัน เสื้อคลุมกำมะหยี่ปักทอง', 'A shapan, a velvet robe with gold trim', ['shapan', 'ชาปัน', 'velvet robe', 'เสื้อคลุมกำมะหยี่', 'gold embroidery', 'ปักดิ้นทอง', 'gift of honour', 'ของขวัญให้เกียรติ', 'kazakh dress', 'ชุดคาซัค'],
    // a long deep-blue velvet robe on a wooden hanger, wide sleeves, gold curls embroidered down the front, round the cuffs and along the hem
    Lc('M120 22v14', '#8D6E63', 4) + P('M120 22c0-8 10-8 10-2', 'none', 3) + Lc('M68 46h104', '#A1673F', 7)
      + P('M86 46L36 76l-18 74 28 6 18-50v104h112V106l18 50 28-6-18-74-50-30c-6 12-20 20-34 20s-28-8-34-20z', '#3949AB')
      + Lc('M120 66v144', '#283593', 3) + Lc('M110 66v144M130 66v144', '#FFCA28', 3) + ring(4, (k) => horns(98, 92 + k * 30, 0.36, '#FFCA28', 5) + horns(142, 92 + k * 30, 0.36, '#FFCA28', 5))
      + Lc('M66 202h108', '#FFCA28', 4) + Lc('M22 144l26 6M218 144l-26 6', '#FFCA28', 4) + P('M100 50c6 10 14 16 20 16s14-6 20-16', 'none', 3) + face(120, 136, 0.5).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
];

export default {
  places: {
    kz: { country: 'kz', wave: 3, name: nm('คาซัคสถาน', 'Kazakhstan'), tz: 'Asia/Almaty', alias: ['kazakhstan', 'คาซัคสถาน', 'qazaqstan'], colors: KZ },
  },
  items,
};
