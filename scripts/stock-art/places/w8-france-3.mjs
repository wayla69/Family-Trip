// Wave 8, group france (3/3): Geneva and Lake Léman, Luxembourg, Luxembourg City and Vianden, Provence, Chamonix and Annecy, Lyon
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (ch/geneva/landmark-carouge.v1.svg → ch-geneva.landmark.carouge)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport)
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const star = (x, y, c = '#FFEB3B') => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, c, 2);
const steam = (xs, y) => xs.map((x) => Lc(`M${x} ${y + 24}c-8-8 8-14 0-24`, '#B0BEC5', 3)).join('');

const items = [
  // ---------- Geneva and Lake Léman
  L('ch/geneva/landmark-lausannemetro.v1.svg', 'รถไฟใต้ดินล้อยางไต่เนินชันที่โลซาน', 'Lausanne\'s rubber-tyred metro climbing the steep hill', ['lausanne metro', 'รถไฟใต้ดินโลซาน', 'm2 line', 'สายเอ็มทู', 'steepest metro', 'เนินชันมาก', 'ouchy', 'อูชี', 'rubber tyres', 'lake view'], 'หาล้อยางสีดำใต้ตัวรถไฟที่เอียงขึ้นเนิน', 'Find the black rubber wheels under the tilted train',
    // a short blue-and-white metro train tilted steeply up a hillside track, black rubber tyres showing, terraced houses stacked up the slope, the lake and mountains at the bottom
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#4FC3F7', 0, 3) + P('M-4 196l40-14 30 10 40-12 30 10z', '#B0BEC5', 0) + P('M-4 190L244 30v214H-4z', '#C5E1A5', 3)
      + [[40, 150, '#FFE0B2'], [100, 112, '#FFCDD2'], [160, 72, '#FFF59D'], [200, 46, '#E1BEE7']].map(([x, y, c]) => R(x - 20, y - 50, 40, 40, c, 0, 2.5) + P(`M${x - 24} ${y - 50}l24-14 24 14z`, '#B85C35', 2.5) + R(x - 6, y - 40, 12, 12, '#81D4FA', 1, 2)).join('')
      + Lc('M-4 214L244 54', '#9E9E9E', 8) + Lc('M-4 222L244 62', '#757575', 3)
      + g(110, 146, 1, R(-70, -26, 140, 42, '#FAFAFA', 10, 3) + R(-70, 4, 140, 8, '#1E88E5', 0, 0) + R(-70, -26, 140, 42, 'none', 10, 3) + [0, 1, 2, 3].map((k) => R(-58 + k * 30, -18, 22, 16, '#B3E5FC', 3, 2)).join('') + C(-44, 22, 9, '#212121', 3) + C(44, 22, 9, '#212121', 3) + face(50, -4, 0.25), -33)),
  L('ch/geneva/landmark-carouge.v1.svg', 'บ้านเตี้ยสไตล์อิตาลีกับสวนในลานบ้านที่การูจ', 'The low Italian-style houses and hidden gardens of Carouge', ['carouge', 'การูจ', 'sardinian town', 'เมืองแบบซาร์ดิเนีย', 'low houses', 'บ้านเตี้ยสีพาสเทล', 'courtyard gardens', 'สวนในลานบ้าน', 'green shutters', 'craft shops'], 'หาประตูโค้งที่เปิดเข้าไปเห็นสวนข้างใน', 'Find the open arched door that shows a garden inside',
    // a row of low two-storey houses in soft yellow, pink and green with green shutters, one big arched gateway open to a sunny courtyard garden with a tree and flowers, a plane tree in front
    sky('#E1F5FE') + R(-4, 190, 248, 54, '#E0C9A6', 0, 3)
      + [[-4, 80, '#FFF59D'], [76, 90, '#F8BBD0'], [166, 80, '#C5E1A5']].map(([x, w, c]) => R(x, 80, w, 110, c, 0, 3) + P(`M${x - 4} 80h${w + 8}l-10-16h${-w + 12}z`, '#C0673E', 3) + [0, 1].map((r) => [0, 1].map((cc) => R(x + 10 + cc * (w - 34), 94 + r * 46, 14, 22, '#FFFFFF', 1, 2) + R(x + 4 + cc * (w - 34), 94 + r * 46, 6, 22, '#43A047', 0, 1.5) + R(x + 24 + cc * (w - 34), 94 + r * 46, 6, 22, '#43A047', 0, 1.5)).join('')).join('')).join('')
      + P('M98 190v-40c0-26 46-26 46 0v40z', '#AED581', 3) + C(121, 152, 14, '#43A047', 2.5) + Lc('M121 166v20', '#6D4C41', 3) + [[106, 182], [136, 182], [114, 176]].map(([x, y]) => C(x, y, 4, '#EC407A', 1.5)).join('') + face(121, 108, 0.3)
      + Lc('M210 190v-60', '#8D6E63', 6) + C(210, 120, 24, '#7CB342', 3) + kid(40, 226, '#FF7043', 0.85)),
  L('ch/geneva/landmark-watchmaker.v1.svg', 'ช่างทำนาฬิกาเจนีวากับเฟืองเล็กจิ๋ว', 'A Geneva watchmaker and the tiny cogs', ['watchmaking', 'การทำนาฬิกา', 'watchmaker', 'ช่างนาฬิกา', 'tiny cogs', 'เฟืองจิ๋ว', 'loupe', 'แว่นขยายช่างนาฬิกา', 'watch museum', 'swiss watch workshop'], 'หาเฟืองสีทองที่เล็กที่สุดบนโต๊ะ', 'Find the smallest golden cog on the bench',
    // a watchmaker with a loupe screwed into one eye bent over a workbench, an open round watch showing gold cogs, tweezers, tiny screws and springs, a desk lamp shining down
    sky('#ECEFF1') + R(-4, 160, 248, 84, '#8D6E63', 0, 3) + R(-4, 160, 248, 12, '#A1887F', 0, 3)
      + Lc('M190 160v-90l-40-30', '#455A64', 5) + P('M140 30l-30 30h50z', '#FFCA28', 3) + `<path d="M118 64l-20 60h70l-20-60z" fill="#FFF59D" opacity=".4" stroke="none"/>`
      + C(120, 190, 40, '#ECEFF1', 3) + C(120, 190, 32, '#FFF8E1', 2.5) + [[108, 182, 12, '#FFC107'], [134, 196, 9, '#FFB300'], [116, 206, 6, '#E53935'], [138, 176, 5, '#FFC107']].map(([x, y, r, c]) => C(x, y, r, c, 2) + Array.from({ length: 8 }, (_, k) => g(x, y, 1, R(-1.5, -r - 3, 3, 4, c, 0, 1), k * 45)).join('') + C(x, y, 2, INK, 0)).join('') + face(120, 228, 0.25)
      + g(50, 110, 1, C(0, 0, 26, '#FFE0BD', 3) + P('M-26-6c0-30 52-30 52 0-10-14-42-14-52 0z', '#90A4AE', 3) + C(12, 0, 9, '#455A64', 3) + C(12, 0, 5, '#B3E5FC', 0) + C(-10, 0, 3.5, INK, 0) + E(-16, 10, 6, 3.5, '#FF8FA3', 0) + Lc('M-6 14q6 4 10 0', INK, 3) + P('M-30 30h60l10 40h-80z', '#FFFFFF', 3))
      + Lc('M70 160l30-10', '#B0BEC5', 3) + [[186, 194], [196, 200], [190, 210]].map(([x, y]) => C(x, y, 2.5, '#FFC107', 1)).join('') + Lc('M200 186c4-4 8 0 4 4s-8 0-4 4', INK, 1.5)),
  L('ch/geneva/landmark-tavel.v1.svg', 'แบบจำลองเมืองเจนีวาเก่าในบ้านตาแวล', 'The giant model of old Geneva in the Maison Tavel', ['maison tavel', 'บ้านตาแวล', 'relief magnin', 'แบบจำลองเมือง', 'model city', 'old geneva', 'เจนีวาเก่า', 'oldest house', 'บ้านที่เก่าที่สุด', 'city walls model'], 'หาโบสถ์จิ๋วที่มีหอคอยคู่ในแบบจำลอง', 'Find the tiny twin towers inside the model',
    // a big table-sized model of an old walled town with tiny roofs, little towers and a star-shaped wall, kids peering over the edge of its glass case, an old stone window behind
    sky('#EFEBE9') + R(20, 20, 60, 70, '#D7CCC8', 0, 3) + Lc('M50 20v70M20 55h60', INK, 2) + R(-4, 200, 248, 44, '#A1887F', 0, 3)
      + P('M10 200l30-80h160l30 80z', '#B3E5FC', 3) + P('M30 196l22-60h136l22 60z', '#C5E1A5', 2.5) + P('M60 190l10-46 40-6 50 6 20 46-60 6z', '#D7CCC8', 2.5)
      + Array.from({ length: 14 }, (_, k) => { const x = 74 + (k % 5) * 20; const y = 152 + Math.floor(k / 5) * 14; return R(x - 6, y - 5, 12, 8, ['#FFAB91', '#FFE082', '#EF9A9A'][k % 3], 0, 1.5) + P(`M${x - 7} ${y - 5}l7-5 7 5z`, '#8D6E63', 1.5); }).join('')
      + R(110, 132, 8, 18, '#BDBDBD', 0, 1.5) + R(122, 132, 8, 18, '#BDBDBD', 0, 1.5) + Lc('M76 196l-4 10M168 196l4 10', INK, 2) + face(170, 176, 0.25)
      + kid(30, 140, '#E53935', 0.9) + kid(210, 140, '#1E88E5', 0.9) + Lc('M10 200h220', INK, 3)),
  L('ch/geneva/landmark-perch.v1.svg', 'ปลาเพิร์ชทะเลสาบเลมองทอดกับมะนาว', 'Lake Léman perch fillets with lemon', ['filets de perche', 'ปลาเพิร์ชทอด', 'perch fillets', 'lake perch', 'ปลาทะเลสาบ', 'lake geneva fish', 'lemon and butter', 'มะนาว', 'lakeside lunch', 'tartare sauce'], 'หาฝานมะนาวสีเหลืองบนจาน', 'Find the yellow slice of lemon on the plate',
    // a white oval plate with a fan of small golden fried fish fillets, a lemon wedge, a little pot of white sauce with green herbs and a few thin chips, a tiny fish jumping from a blue lake curl
    E(120, 160, 108, 54, '#FFFFFF', 3) + E(120, 156, 92, 42, '#E3F2FD', 2)
      + [-50, -28, -6, 16, 38].map((dx, k) => g(110 + dx * 0.9, 154, 1, E(0, 0, 13, 30, '#E9B054', 3) + Lc('M-6-14c4 2 8 2 12 0M-6 4c4 2 8 2 12 0', '#C9852E', 2), -30 + k * 15)).join('') + face(104, 152, 0.4)
      + g(186, 134, 1, P('M-18 10a20 20 0 0 1 36 0z', '#FFEB3B', 3) + Lc('M0 10v-16M-10 8l-8-10M10 8l8-10', '#FBC02D', 2))
      + g(178, 184, 1, P('M-18-6h36v14c0 10-36 10-36 0z', '#FAFAFA', 3) + E(0, -6, 18, 6, '#FFFDE7', 2.5) + [[-6, -6], [4, -8], [8, -4]].map(([x, y]) => C(x, y, 1.6, '#43A047', 0)).join(''))
      + [[60, 196], [74, 200], [88, 196]].map(([x, y]) => R(x - 3, y - 14, 6, 22, '#FFD54F', 2, 2)).join('')
      + g(56, 60, 1, Lc('M-40 30c20-14 60-14 80 0', '#4FC3F7', 6) + P('M-10 0c10-12 30-10 34 0-6 10-24 12-34 0z', '#90A4AE', 2.5) + P('M-10 0l-10-8v16z', '#90A4AE', 2.5) + C(14, -2, 2, INK, 0), -10)),

  // ---------- Luxembourg
  K('lu', 'food', 'bouneschlupp', 'ซุปถั่วแขกบูเนอชลุป', 'Bouneschlupp, Luxembourg\'s green bean soup', ['bouneschlupp', 'บูเนอชลุป', 'green bean soup', 'ซุปถั่วแขก', 'potatoes and bacon', 'มันฝรั่งและเบคอน', 'luxembourg soup', 'ซุปลักเซมเบิร์ก', 'mettwurst', 'cosy dinner'],
    // a wide brown bowl of creamy pale-green soup full of cut green beans, potato cubes, bacon bits and slices of smoked sausage, a wooden spoon, steam, a smiling bowl
    P('M26 110h188c0 56-40 92-94 92s-94-36-94-92z', '#8D6E63', 3) + Lc('M40 140c40 14 120 14 160 0', '#A1887F', 5) + E(120, 110, 94, 22, '#DCE775', 3)
      + Array.from({ length: 10 }, (_, k) => g(56 + k * 13, 108 + (k % 3) * 5, 1, R(-8, -2.5, 16, 5, '#7CB342', 2.5, 1.5), (k * 37) % 90 - 45)).join('') + [[84, 118], [150, 106], [176, 116]].map(([x, y]) => R(x - 6, y - 5, 12, 10, '#FFF59D', 2, 1.5)).join('')
      + [[110, 102], [134, 120]].map(([x, y]) => E(x, y, 10, 6, '#C62828', 2) + C(x - 3, y, 1.5, '#FFCDD2', 0) + C(x + 3, y - 1, 1.5, '#FFCDD2', 0)).join('') + [[70, 104], [160, 98], [96, 124]].map(([x, y]) => R(x, y, 6, 4, '#E57373', 1, 1)).join('')
      + g(184, 76, 1, R(-4, -40, 8, 60, '#C69C6D', 3, 2.5) + E(0, 24, 11, 13, '#C69C6D', 2.5), 28) + steam([90, 130], 56) + face(120, 162, 0.5)),
  K('lu', 'food', 'kniddelen', 'เกี๊ยวแป้งนิดเดเลินราดครีมเบคอน', 'Kniddelen, flour dumplings with bacon and cream', ['kniddelen', 'นิดเดเลิน', 'flour dumplings', 'เกี๊ยวแป้ง', 'bacon cream sauce', 'ซอสครีมเบคอน', 'apple sauce', 'แอปเปิ้ลบด', 'luxembourg comfort food', 'buttery dumplings'],
    // a deep plate of chubby pale oval dumplings glistening with melted butter, crispy bacon bits and a creamy sauce over them, a small bowl of apple sauce beside, two dumplings with faces
    E(110, 160, 100, 44, '#FFFFFF', 3) + E(110, 154, 84, 32, '#FFF8E1', 2.5)
      + [[70, 148, -20], [100, 140, 10], [132, 146, -10], [160, 156, 25], [86, 166, 15], [120, 168, -5]].map(([x, y, r], k) => g(x, y, 1, E(0, 0, 18, 12, '#FFF3D6', 3) + E(-5, -4, 6, 3, '#FFFFFF', 0) + (k === 1 || k === 4 ? face(0, 0, 0.24) : ''), r)).join('')
      + Array.from({ length: 9 }, (_, k) => R(70 + (k * 23) % 100, 136 + (k * 13) % 34, 6, 4, '#C62828', 1, 1)).join('') + Lc('M64 138c20 10 40-6 60 4s30 0 40 4', '#FFFDE7', 4)
      + g(206, 92, 1, P('M-24 0h48c0 20-10 30-24 30S-24 20-24 0z', '#E1F5FE', 3) + E(0, 0, 24, 7, '#FFE082', 2.5) + C(-6, -2, 2, '#D4A017', 0) + C(6, 0, 2, '#D4A017', 0))),
  K('lu', 'animal', 'redkite', 'เหยี่ยวแดงหางแฉกบินเหนือทุ่ง', 'A red kite gliding over the fields', ['red kite', 'เหยี่ยวแดง', 'roude milan', 'forked tail', 'หางแฉก', 'bird of prey', 'นกล่าเหยื่อ', 'gutland fields', 'ทุ่งนา', 'soaring bird'],
    // a reddish-brown bird of prey with long angled wings with white patches and black tips and a deeply forked orange tail gliding over a patchwork of green and yellow fields
    P('M-4 170c40-10 80 0 120-8s80 6 128-4v86H-4z', '#AED581', 3) + P('M60 244c10-40 40-70 80-80l40 80z', '#FFF176', 3) + P('M-4 210c30-10 60-4 80 6v34H-4z', '#9CCC65', 3) + Lc('M140 166l-20 78M30 214l50-46', '#7CB342', 2)
      + g(120, 96, 1, P('M-10-4C-40-30-80-40-112-30c20 4 40 14 56 30 26 8 40 8 46 6z', '#B5543A', 3) + P('M10-4C40-30 80-40 112-30c-20 4-40 14-56 30-26 8-40 8-46 6z', '#B5543A', 3)
        + P('M-112-30c8-2 16 0 22 4l-10 4zM112-30c-8-2-16 0-22 4l10 4z', '#263238', 2) + E(-66, -18, 10, 5, '#FAFAFA', 1.5) + E(66, -18, 10, 5, '#FAFAFA', 1.5)
        + E(0, 4, 16, 34, '#C0673E', 3) + P('M-10 30l-8 40 18-14 18 14-8-40z', '#E07B39', 3) + C(0, -26, 14, '#CFD8DC', 3) + P('M-4-16l4 8 4-8z', '#FFCA28', 2) + face(0, -28, 0.26))),
  K('lu', 'food', 'bamkuch', 'เค้กต้นไม้บามคุคแบบลักเซมเบิร์ก', 'Baamkuch, the tree cake with rings', ['baamkuch', 'บามคุค', 'tree cake', 'เค้กต้นไม้', 'spit cake', 'เค้กวงปี', 'cake rings', 'luxembourg wedding cake', 'christmas cake', 'icing drips'],
    // a tall bumpy golden cake shaped like a tree trunk dripping with white icing, a thick round slice in front showing many brown and yellow rings like a tree, a smiling slice
    P('M60 40c-6 20 6 30 0 50s6 30 0 50 6 30 0 50h80c-6-20 6-30 0-50s6-30 0-50-6-30 0-50z', '#E9B054', 3) + Array.from({ length: 5 }, (_, k) => Lc(`M58 ${60 + k * 30}h84`, '#C9852E', 3)).join('')
      + P('M60 40h80c0 14-8 10-10 22-2-10-8-10-12 0-4-10-10-10-14 2-4-12-10-12-14 0-4-10-10-8-12-6-6-6-14-8-18-18z', '#FFFFFF', 3) + E(100, 40, 40, 8, '#FFFFFF', 3)
      + g(168, 170, 1, C(0, 0, 50, '#E9B054', 3) + [42, 34, 26, 18, 10].map((r, k) => C(0, 0, r, k % 2 ? '#F7D774' : '#C9852E', 2)).join('') + C(0, 0, 4, '#FFF8E1', 1.5) + face(0, 14, 0.32))
      + R(24, 210, 90, 10, '#BCAAA4', 4, 2.5)),

  // ---------- Luxembourg City and Vianden
  L('lu/luxembourg/landmark-eschsursure.v1.svg', 'หมู่บ้านเอชซูร์ซูร์ในโค้งแม่น้ำ', 'Esch-sur-Sûre, the village in a river loop', ['esch-sur-sure', 'เอชซูร์ซูร์', 'river loop', 'โค้งแม่น้ำ', 'sure river', 'แม่น้ำซูร์', 'castle ruin', 'ซากปราสาท', 'upper sure', 'ardennes village'], 'หาหอคอยปราสาทเก่าบนเนินหิน', 'Find the old castle tower on the rocky hill',
    // a river bending in an almost full circle around a little village of white houses with slate roofs, a ruined castle tower on the rock in the middle, wooded hills all round
    sky('#C5E1A5') + P('M-4 70c40-10 80 10 120-6s90 4 128-6v-62H-4z', '#7CB342', 3) + Array.from({ length: 6 }, (_, k) => C(10 + k * 46, 60 - (k % 2) * 10, 16, '#558B2F', 2)).join('')
      + P('M-4 150c40 0 50-60 110-70s110 20 110 70-50 80-110 80-90-40-90-60', 'none', 0) + Lc('M-4 150c40 0 50-60 110-70s110 20 110 70-50 80-110 80-80-30-84-56', '#4FC3F7', 22)
      + P('M70 176c0-50 30-70 50-70s50 20 50 60-30 50-60 50-40-14-40-40z', '#9CCC65', 3) + P('M100 140l20-36 20 36z', '#9E9E9E', 3) + R(112, 82, 16, 40, '#BDBDBD', 0, 2.5) + Array.from({ length: 3 }, (_, k) => R(112 + k * 6, 76, 4, 6, '#BDBDBD', 0, 1.5)).join('')
      + [[86, 176], [108, 186], [134, 184], [156, 170], [96, 158]].map(([x, y]) => R(x - 9, y - 8, 18, 14, '#FAFAFA', 0, 2) + P(`M${x - 11} ${y - 8}l11-8 11 8z`, '#455A64', 2)).join('') + face(120, 156, 0.3)),
  L('lu/luxembourg/landmark-dreieechelen.v1.svg', 'ป้อมสามลูกโอ๊กดรายเอเคเลิน', 'The Three Acorns fort, Dräi Eechelen', ['drai eechelen', 'ดรายเอเคเลิน', 'three acorns', 'สามลูกโอ๊ก', 'fort thungen', 'ป้อมทึงเงิน', 'fortress museum', 'พิพิธภัณฑ์ป้อม', 'kirchberg', 'acorn towers'], 'หาลูกโอ๊กสีทองบนยอดหอคอยทั้งสาม', 'Find the golden acorns on top of the three towers',
    // a pale stone fort wall with three round towers side by side, each with a domed top crowned by a big golden acorn, a grassy slope and a glass museum block behind
    sky('#E1F5FE') + R(130, 60, 100, 70, '#B3E5FC', 0, 3) + Lc('M150 60v70M180 60v70M210 60v70', '#FFFFFF', 2) + P('M-4 190c60-14 180-14 248 0v54H-4z', '#9CCC65', 3)
      + R(20, 120, 200, 72, '#E6D3B3', 0, 3) + Lc('M20 150h200', '#C9AE86', 2)
      + [50, 120, 190].map((x, k) => R(x - 24, 84, 48, 108, '#EFE2C8', 0, 3) + P(`M${x - 26} 86c0-30 52-30 52 0z`, '#D7C29E', 3) + R(x - 8, 120, 16, 22, '#455A64', 8, 2)
        + g(x, 48, 1, E(0, 6, 12, 14, '#FFC107', 3) + P('M-14-4c0-12 28-12 28 0z', '#A1673F', 3) + Lc('M0-12v-6', INK, 3) + (k === 1 ? face(0, 8, 0.18) : ''))).join('') + face(120, 170, 0.32)),
  L('lu/luxembourg/landmark-redbridge.v1.svg', 'สะพานแดงข้ามหุบเขาไปเคียร์ชแบร์ก', 'The Red Bridge across the valley to Kirchberg', ['red bridge', 'สะพานแดง', 'pont grande-duchesse charlotte', 'kirchberg', 'เคียร์ชแบร์ก', 'pfaffenthal valley', 'หุบเขาพฟัฟเฟนทาล', 'steel bridge', 'สะพานเหล็ก', 'deep valley'], 'หาขาสะพานสีแดงที่ตั้งอยู่ในหุบเขา', 'Find the red legs of the bridge standing in the valley',
    // a long straight bright red steel bridge with slanting legs spanning a deep green valley, rooftops of a village and a little river far below, trees on the slopes
    sky('#E3F2FD') + P('M-4 90l60 10 30 100h70l40-110 48-6v164H-4z', '#7CB342', 3) + P('M86 200h70v44H86z', '#9CCC65', 3) + Lc('M90 230c20-6 40 6 62 0', '#4FC3F7', 6)
      + [[96, 214], [116, 220], [140, 212]].map(([x, y]) => R(x - 8, y - 8, 16, 12, '#FFF8E1', 0, 2) + P(`M${x - 10} ${y - 8}l10-7 10 7z`, '#C0673E', 2)).join('')
      + R(-4, 80, 248, 16, '#E53935', 0, 3) + Lc('M-4 88h248', '#B71C1C', 2) + Lc('M70 96l30 110M170 96l-30 110M100 206h40', '#E53935', 9) + Lc('M70 96l30 110M170 96l-30 110', INK, 1.5)
      + [[30, 120], [210, 124], [50, 160], [196, 170]].map(([x, y]) => C(x, y, 12, '#558B2F', 2)).join('') + face(120, 68, 0.32) + kid(20, 80, '#FFCA28', 0.7)),
  L('lu/luxembourg/landmark-pirateship.v1.svg', 'เรือโจรสลัดไม้ในสนามเด็กเล่นหุบเขาเปทรูส', 'The wooden pirate ship playground in the Pétrusse valley', ['pirate ship playground', 'สนามเด็กเล่นเรือโจรสลัด', 'petrusse valley', 'หุบเขาเปทรูส', 'playground', 'สนามเด็กเล่น', 'wooden ship', 'เรือไม้', 'slide and nets', 'park for kids'], 'หาสไลเดอร์ที่ไหลลงจากเรือ', 'Find the slide coming down from the ship',
    // a big wooden play ship with a mast, a striped sail, rope nets to climb and a slide down its side, sitting on soft bark chips in a green park, kids climbing
    sky('#E1F5FE') + R(-4, 190, 248, 54, '#C69C6D', 0, 3) + Array.from({ length: 12 }, (_, k) => R(8 + k * 20, 206 + (k % 3) * 10, 8, 4, '#A1673F', 1, 0)).join('') + P('M-4 120c40-10 80 0 120-6s80 6 128-2v80H-4z', '#9CCC65', 3)
      + P('M30 140h170l-20 50H50z', '#A1673F', 3) + Lc('M40 156h150M48 172h136', '#8D5524', 2.5) + P('M190 140l24-20v20z', '#A1673F', 3) + Lc('M110 140V30', '#6D4C41', 6)
      + P('M114 40h70l-10 70h-60z', '#FFFFFF', 3) + Lc('M114 60h64M114 80h62M114 100h60', '#E53935', 6) + P('M106 30l-30 14 30 12z', '#212121', 2.5)
      + P('M30 140l-30 70', 'none', 0) + Lc('M40 140c-20 20-30 40-40 66', '#FFCA28', 12) + Lc('M100 140L60 70M60 140l40-70M70 120h20M80 100h14', '#F3DFB2', 3) + face(120, 166, 0.36)
      + kid(80, 80, '#43A047', 0.7) + kid(160, 130, '#AB47BC', 0.8) + [[16, 50], [56, 26]].map(([x, y]) => C(x, y, 16, '#7CB342', 2.5)).join('')),
  L('lu/luxembourg/landmark-fouerfesch.v1.svg', 'ปลาตัวเล็กทอดกรอบที่งานชูเบอร์ฟวาร์', 'Fried little fish at the Schueberfouer fair', ['schueberfouer', 'ชูเบอร์ฟวาร์', 'fouerfesch', 'fried fish', 'ปลาทอด', 'funfair food', 'อาหารงานวัด', 'glacis', 'august fair', 'paper cone'], 'หาปลาตัวเล็กที่ยิ้มอยู่ในกรวยกระดาษ', 'Find the little fish smiling in the paper cone',
    // a striped paper cone overflowing with small crispy golden fried fish, a lemon wedge on top, a string of round fair bulbs and a striped stall roof behind
    sky('#FFF8E1') + P('M-4 40h248l-10 30H6z', '#E53935', 3) + Array.from({ length: 6 }, (_, k) => P(`M${10 + k * 40} 40l-4 30h20l2-30z`, '#FFFFFF', 0)).join('') + P('M-4 40h248l-10 30H6z', 'none', 3)
      + Lc('M-4 90c40 20 80 20 120 0s80 20 128 0', INK, 2) + [10, 50, 90, 130, 170, 210].map((x, k) => C(x, 96 + (k % 2) * 8, 6, '#FFEB3B', 2)).join('')
      + [[86, 124, -40], [106, 116, -10], [130, 120, 20], [152, 130, 40], [98, 136, -20], [138, 136, 10]].map(([x, y, r], k) => g(x, y, 1, E(0, 0, 9, 22, '#E9B054', 2.5) + P('M0 20l-8 10h16z', '#E9B054', 2) + C(0, -14, 1.8, INK, 0) + (k === 1 ? E(-4, -8, 2.5, 1.6, '#FF8FA3', 0) + E(4, -8, 2.5, 1.6, '#FF8FA3', 0) + Lc('M-3-6q3 3 6 0', INK, 1.5) : ''), r)).join('')
      + P('M70 140h100l-50 96z', '#FFFFFF', 3) + Lc('M84 160h72M96 184h48M108 208h24', '#1E88E5', 5) + P('M70 140h100l-50 96z', 'none', 3)
      + g(154, 114, 1, P('M-14 8a16 16 0 0 1 28 0z', '#FFEB3B', 2.5), 20)),

  // ---------- Provence
  L('fr/provence/landmark-calanques.v1.svg', 'อ่าวหินผาขาวคาล็องก์น้ำทะเลสีเทอร์ควอยซ์', 'The white cliffs and turquoise coves of the Calanques', ['calanques', 'คาล็องก์', 'calanque de sugiton', 'en-vau', 'white limestone cliffs', 'หน้าผาหินปูนขาว', 'turquoise cove', 'อ่าวน้ำสีเทอร์ควอยซ์', 'cassis', 'coastal hike'], 'หาต้นสนที่เกาะอยู่บนหน้าผาขาว', 'Find the pine tree clinging to the white cliff',
    // two tall white jagged limestone cliffs with a narrow inlet of bright turquoise water between them, a tiny pebble beach at the end, umbrella pines clinging to the rocks, a kayak in the water
    sky('#E1F5FE') + R(-4, 120, 248, 124, '#1E88E5', 0, 3) + P('M90 244l20-150 20 0 20 150z', '#26C6DA', 0) + P('M98 120h44l-8-20h-28z', '#F5E6C8', 3)
      + P('M-4 40l30-20 30 24 30-10 18 30-6 50 14 60-20 80H-4z', '#FAFAFA', 3) + P('M244 30l-30-6-30 30-26-6-10 40 10 40-16 60 16 56h86z', '#FAFAFA', 3)
      + Lc('M20 80l20 30M60 130l-10 40M190 90l10 40M210 150l-10 30', '#D7CCC8', 3)
      + [[40, 36], [180, 50], [214, 30]].map(([x, y]) => Lc(`M${x} ${y + 20}l4-20`, '#6D4C41', 3) + E(x + 4, y - 4, 20, 9, '#2E7D32', 2.5)).join('')
      + g(120, 196, 1, P('M-24 0c10 8 38 8 48 0l-4 8c-12 6-28 6-40 0z', '#FFCA28', 2.5) + kid(0, -2, '#E53935', 0.7) + Lc('M-20-14l40 20', '#6D4C41', 2.5), -10) + face(120, 150, 0.3)),
  L('fr/provence/landmark-bouillabaisse.v1.svg', 'ซุปปลาบุยยาแบสแห่งมาร์แซย์', 'Bouillabaisse, Marseille\'s fish soup', ['bouillabaisse', 'บุยยาแบส', 'marseille fish soup', 'ซุปปลามาร์แซย์', 'saffron broth', 'น้ำซุปหญ้าฝรั่น', 'rouille croutons', 'ขนมปังกรอบซอสรุย', 'vieux port', 'seafood'], 'หาขนมปังกรอบที่มีซอสสีส้มอยู่ข้างบน', 'Find the crispy toast with orange sauce on top',
    // a deep bowl of bright orange-red saffron broth with chunks of white fish, a mussel shell and a little crab claw, round croutons topped with orange rouille floating on it, a spoon
    P('M28 110h184c0 56-40 92-92 92s-92-36-92-92z', '#FFF8E1', 3) + Lc('M40 140c40 14 120 14 160 0', '#1565C0', 4) + Lc('M48 158c40 12 104 12 144 0', '#FFC107', 3) + E(120, 110, 92, 22, '#F4511E', 3)
      + [[84, 108], [150, 104]].map(([x, y]) => R(x - 12, y - 7, 24, 14, '#FFF3E0', 5, 2)).join('') + g(120, 116, 1, P('M-14 0c0-10 28-10 28 0-4 6-24 6-28 0z', '#3949AB', 2.5) + E(0, 0, 8, 3, '#FFAB91', 0), -10)
      + g(176, 112, 1, P('M-8 0c-6-10 4-16 10-10l6-6c4 4 0 8-2 10 4 4 0 10-6 8z', '#E53935', 2), 10)
      + [[60, 104], [104, 98], [134, 118]].map(([x, y]) => C(x, y, 9, '#E9B054', 2.5) + C(x, y - 2, 5, '#FF7043', 0)).join('') + face(120, 160, 0.45) + steam([80, 140], 50)
      + g(200, 72, 1, R(-4, -36, 8, 56, '#B0BEC5', 3, 2.5) + E(0, 22, 11, 13, '#CFD8DC', 2.5), 30)),
  L('fr/provence/landmark-ombriere.v1.svg', 'หลังคากระจกเงายักษ์ที่ท่าเรือเก่ามาร์แซย์', 'The giant mirror canopy at Marseille\'s Old Port', ['ombriere', 'หลังคากระจกเงา', 'mirror canopy', 'vieux port', 'ท่าเรือเก่ามาร์แซย์', 'upside-down reflection', 'เงาสะท้อนกลับหัว', 'marseille', 'quai des belges', 'wave hello'], 'หาเงาของเด็กที่กลับหัวอยู่บนหลังคากระจก', 'Find the child\'s upside-down reflection in the mirror roof',
    // a huge flat shiny mirror roof held up on very thin silver poles over the harbourside paving, the people below reflected upside down in it, waving kids, masts of boats and a hill behind
    sky('#E1F5FE') + P('M150 70c10-40 50-50 94-30v40z', '#C5E1A5', 3) + R(-4, 120, 248, 20, '#29B6F6', 0, 3) + [[30, 120], [70, 120]].map(([x, y]) => Lc(`M${x} ${y}v-50`, INK, 2)).join('') + R(-4, 140, 248, 104, '#E0E0E0', 0, 3)
      + R(10, 60, 220, 50, '#CFD8DC', 0, 3) + Lc('M30 66l60 38M110 66l60 38', '#FFFFFF', 4) + [[60, 106, '#E53935', 0], [116, 106, '#FFCA28', 0], [170, 106, '#43A047', 0]].map(([x, y, c]) => g(x, y - 22, 1, C(0, 20, 8, '#FFE0BD', 2) + P('M-8-4v16h16v-16z', c, 2) + face(0, 18, 0.22), 180)).join('')
      + [40, 200].map((x) => Lc(`M${x} 110v80`, '#90A4AE', 3)).join('') + [[60, 210, '#E53935'], [116, 210, '#FFCA28'], [170, 210, '#43A047']].map(([x, y, c]) => kid(x, y, c, 1)).join('')
      + Lc('M48 176l-10-12M132 176l10-12', '#FFE0BD', 4) + face(120, 84, 0.3)),
  L('fr/provence/landmark-fougasse.v1.svg', 'ขนมปังฟูกัสรูปใบไม้ใส่มะกอก', 'Fougasse, the leaf-shaped bread with olives', ['fougasse', 'ฟูกัส', 'leaf-shaped bread', 'ขนมปังรูปใบไม้', 'olive bread', 'ขนมปังมะกอก', 'provence bakery', 'ร้านขนมปังโพรวองซ์', 'rosemary', 'picnic'], 'หารูเจาะบนขนมปังที่ทำให้เป็นลายใบไม้', 'Find the slits that make the bread look like a leaf',
    // a big flat golden bread shaped like a leaf with slits cut in a vein pattern, black olives pressed in, a sprig of rosemary and a little dish of olive oil beside it
    g(108, 120, 1, P('M0-90c50 20 70 70 60 120-6 30-30 50-60 60-30-10-54-30-60-60-10-50 10-100 60-120z', '#E2A04A', 3) + Lc('M0-80v160', '#C17A2B', 2)
      + [[-1, -40], [-1, 0], [-1, 40], [1, -40], [1, 0], [1, 40]].map(([d, y]) => P(`M${d * 10} ${y}c${d * 14}-6 ${d * 30}-6 ${d * 40} 0c${-d * 10} 6 ${-d * 30} 6 ${-d * 40} 0z`, '#FFF3D6', 2.5)).join('')
      + [[-24, -20], [26, -16], [-26, 22], [24, 26], [0, 60], [0, -62]].map(([x, y]) => E(x, y, 6, 5, '#37474F', 2)).join('') + face(0, 72, 0.25), -18)
      + g(196, 186, 1, E(0, 0, 26, 12, '#FFFFFF', 3) + E(0, -2, 18, 7, '#CDDC39', 0)) + g(196, 110, 1, Lc('M0 40v-80', '#6D4C41', 3) + Array.from({ length: 8 }, (_, k) => Lc(`M0 ${-34 + k * 9}l${k % 2 ? 10 : -10}-6`, '#558B2F', 3)).join(''))),
  L('fr/provence/landmark-navettes.v1.svg', 'ขนมนาแวตต์รูปเรือแห่งมาร์แซย์', 'Navettes, Marseille\'s boat-shaped biscuits', ['navettes', 'นาแวตต์', 'navettes de marseille', 'boat-shaped biscuits', 'บิสกิตรูปเรือ', 'orange blossom', 'กลิ่นดอกส้ม', 'saint-victor', 'marseille bakery', 'ขนมมาร์แซย์'], 'หาบิสกิตที่มีรอยผ่ากลางเหมือนเรือ', 'Find the biscuit with a slit down the middle like a boat',
    // a woven basket full of long golden biscuits shaped like little boats with a slit along the top, one biscuit floating on blue paper waves with a tiny sail, orange blossom flowers
    P('M30 150h180l-20 66H50z', '#C69C6D', 3) + Array.from({ length: 5 }, (_, k) => Lc(`M${40 + k * 38} 152l${-4 + k * 2} 62`, '#A1673F', 2.5)).join('') + Lc('M36 176h168M44 198h152', '#A1673F', 2.5)
      + [[70, 140, -10], [120, 132, 0], [170, 140, 10], [94, 150, -4], [146, 150, 6]].map(([x, y, r]) => g(x, y, 1, P('M-34 0c10-16 58-16 68 0-10 12-58 12-68 0z', '#E9B054', 3) + Lc('M-20-2h40', '#C17A2B', 3), r)).join('') + face(120, 140, 0.24)
      + g(120, 70, 1, Lc('M-60 30c20-10 40 10 60 0s40 10 60 0', '#4FC3F7', 5) + P('M-34 10c10-16 58-16 68 0-10 12-58 12-68 0z', '#E9B054', 3) + Lc('M0 2v-40', INK, 3) + P('M2-38l24 30H2z', '#FFFFFF', 2.5) + face(0, 10, 0.2))
      + [[30, 50], [210, 60]].map(([x, y]) => [0, 72, 144, 216, 288].map((a) => g(x, y, 1, E(0, -8, 5, 8, '#FFFFFF', 2), a)).join('') + C(x, y, 4, '#FFCA28', 1.5)).join('')),

  // ---------- Chamonix and Annecy
  L('fr/alps/landmark-biscuitsavoie.v1.svg', 'เค้กฟองน้ำบิสกุยเดอซาวัว', 'Biscuit de Savoie, the tall Savoy sponge cake', ['biscuit de savoie', 'บิสกุยเดอซาวัว', 'savoy sponge cake', 'เค้กฟองน้ำซาวัว', 'tall sponge', 'เค้กเนื้อเบา', 'powdered sugar', 'น้ำตาลไอซิ่ง', 'savoy dessert', 'afternoon snack'], 'หาน้ำตาลไอซิ่งที่โรยบนยอดเค้ก', 'Find the powdered sugar dusted on top of the cake',
    // a tall fluffy golden sponge cake baked in a fluted crown mould, dusted with white sugar, on a stand, a slice cut showing the airy yellow inside, a sieve tapping sugar
    P('M70 200h100l-10 10H80z', '#B0BEC5', 3) + R(110, 210, 20, 16, '#B0BEC5', 0, 3) + E(120, 228, 40, 6, '#B0BEC5', 3)
      + P('M50 196c-6-40 0-80 10-100h120c10 20 16 60 10 100z', '#E9B054', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${66 + k * 22} 98c-4 30-4 70 0 98`, '#C9852E', 3)).join('')
      + P('M60 96c0-40 120-40 120 0-20 8-100 8-120 0z', '#E9B054', 3) + P('M70 92c10-24 90-24 100 0-20 6-80 6-100 0z', '#FFFFFF', 0) + C(120, 70, 12, '#E9B054', 3) + C(120, 70, 7, '#FFFFFF', 0)
      + face(120, 150, 0.48) + g(206, 170, 1, P('M-20 30l20-60 20 60z', '#FFF59D', 3) + Lc('M-12 20h24M-6 0h12', '#FFF176', 2))
      + g(178, 30, 1, C(0, 0, 18, '#E0E0E0', 3) + Lc('M14 -10l20-14', '#8D6E63', 5) + `<path d="M-12 8l24 0M-10 0h20M-12-8h24" stroke="#9E9E9E" stroke-width="1.5" fill="none"/>`) + [[170, 56], [180, 62], [166, 66]].map(([x, y]) => C(x, y, 2, '#FFFFFF', 1)).join('')),
  L('fr/alps/landmark-pontdesamours.v1.svg', 'สะพานแห่งความรักริมคลองที่อานซี', 'The Pont des Amours over Annecy\'s canal', ['pont des amours', 'สะพานแห่งความรัก', 'lovers bridge', 'canal du vasse', 'คลองวาส', 'annecy', 'jardins de l\'europe', 'สวนยุโรป', 'green water', 'lakeside walk'], 'หาโคมไฟบนราวสะพานสีเขียว', 'Find the lamp on the green bridge railing',
    // a slim pale-green iron footbridge with lamp posts arching low over a narrow canal of clear green water lined with tall plane trees, flowers in boxes on the railing, the lake opening behind
    sky('#E1F5FE') + P('M-4 120l50-30 40 20 50-30 50 26 58-20v40H-4z', '#90A4AE', 3) + R(-4, 120, 248, 20, '#4FC3F7', 0, 3)
      + [[20, 140], [56, 150], [184, 150], [220, 140]].map(([x, y]) => Lc(`M${x} ${y}v-70`, '#6D4C41', 6) + C(x, y - 90, 30, '#66BB6A', 3)).join('') + P('M-4 150h80l30 94H-4zM244 150h-80l-30 94h110z', '#9CCC65', 3)
      + P('M76 150h88l-30 94h-28z', '#26A69A', 3) + Lc('M100 210c10 6 30 6 40 0', '#B2DFDB', 3)
      + P('M30 160c50-30 130-30 180 0v10c-50-26-130-26-180 0z', '#A5D6A7', 3) + Lc('M30 142c50-30 130-30 180 0', '#81C784', 4) + Array.from({ length: 7 }, (_, k) => Lc(`M${50 + k * 23} ${152 - Math.sin((k + 0.5) / 7 * Math.PI) * 18}v-14`, '#81C784', 3)).join('')
      + [60, 180].map((x) => Lc(`M${x} 150v-36`, '#455A64', 3) + C(x, 108, 6, '#FFF59D', 2.5)).join('') + [[96, 134], [120, 130], [144, 134]].map(([x, y]) => C(x, y, 4, '#EC407A', 1.5)).join('') + face(120, 156, 0.3)),
  L('fr/alps/landmark-crozets.v1.svg', 'พาสต้าสี่เหลี่ยมจิ๋วโครเซต์อบชีส', 'Crozets, the tiny square pasta of Savoy', ['crozets', 'โครเซต์', 'tiny square pasta', 'พาสต้าสี่เหลี่ยมจิ๋ว', 'buckwheat pasta', 'พาสต้าบักวีต', 'croziflette', 'savoy dish', 'อาหารซาวัว', 'cheese gratin'], 'หาพาสต้าสี่เหลี่ยมชิ้นเล็กที่ตกอยู่นอกจาน', 'Find the tiny square of pasta that fell off the dish',
    // a rustic brown dish full of tiny square brown and yellow pasta pieces with melted cheese stretching and golden spots, a wooden spoon lifting some with a cheese string, a few squares scattered
    E(120, 160, 100, 46, '#8D6E63', 3) + E(120, 154, 86, 34, '#FFE082', 2.5)
      + Array.from({ length: 24 }, (_, k) => R(52 + (k % 8) * 17 + (Math.floor(k / 8) % 2) * 6, 136 + Math.floor(k / 8) * 13, 8, 8, k % 3 ? '#C9A061' : '#F3D29A', 1, 1.5)).join('') + Lc('M60 150c20-8 40 6 60-4s40 6 60-2', '#FFF59D', 5) + [[80, 146], [140, 160], [170, 146]].map(([x, y]) => C(x, y, 4, '#E07B39', 0)).join('')
      + g(170, 96, 1, R(-4, -40, 8, 52, '#C69C6D', 3, 2.5) + E(0, 18, 14, 10, '#C69C6D', 2.5) + R(-8, 14, 7, 7, '#C9A061', 1, 1.5) + R(2, 14, 7, 7, '#F3D29A', 1, 1.5), 20) + Lc('M162 124c-4 10-6 16-6 24', '#FFF59D', 3)
      + [[30, 206], [44, 214], [206, 210]].map(([x, y]) => R(x, y, 9, 9, '#C9A061', 1, 2)).join('') + face(110, 182, 0.4)),
  L('fr/alps/landmark-myrtilles.v1.svg', 'ทาร์ตบลูเบอร์รีภูเขาจากกระท่อมบนเขา', 'A wild blueberry tart from a mountain refuge', ['tarte aux myrtilles', 'ทาร์ตบลูเบอร์รี', 'wild blueberries', 'บลูเบอร์รีป่า', 'bilberries', 'mountain tart', 'ขนมกระท่อมบนเขา', 'hiking snack', 'ขนมหลังเดินเขา', 'summer in the alps'], 'หาบลูเบอร์รีลูกที่กลิ้งออกมานอกทาร์ต', 'Find the blueberry that rolled out of the tart',
    // a round tart with a golden crinkled crust heaped with dark blue wild blueberries, one wedge cut out on a plate, a little bush of blueberries with green leaves beside it
    E(110, 166, 96, 34, '#FFFFFF', 3) + E(110, 158, 82, 26, '#E2A04A', 3) + P('M28 158c0-10 4-10 8-14M192 158c0-10-4-10-8-14', 'none', 2.5)
      + P('M40 154c0-22 140-22 140 0-20 14-120 14-140 0z', '#3949AB', 3) + Array.from({ length: 22 }, (_, k) => C(50 + (k % 11) * 12, 146 + Math.floor(k / 11) * 10 + (k % 2) * 3, 5.5, k % 3 ? '#283593' : '#5C6BC0', 1.5)).join('') + face(110, 152, 0.36)
      + g(196, 108, 1, P('M-28 6l28-40 28 40z', '#E2A04A', 3) + P('M-20 2l20-28 20 28z', '#3949AB', 2) + [[-6, -6], [6, -4], [0, -16]].map(([x, y]) => C(x, y, 4, '#283593', 1.5)).join(''))
      + g(40, 82, 1, Lc('M0 30c-4-20 0-40 6-50M0 30c8-16 20-24 30-28', '#6D4C41', 3) + [[6, -16], [22, 0], [-8, -2]].map(([x, y]) => E(x, y, 8, 5, '#66BB6A', 2)).join('') + [[12, -6], [26, 10], [-2, 8]].map(([x, y]) => C(x, y, 5, '#283593', 1.5)).join('')) + C(176, 214, 5, '#283593', 1.5)),
  L('fr/alps/landmark-sup.v1.svg', 'พายบอร์ดยืนบนทะเลสาบอานซีน้ำใส', 'Stand-up paddling on the clear water of Lake Annecy', ['stand-up paddle', 'บอร์ดยืนพาย', 'paddleboard', 'sup', 'lake annecy', 'ทะเลสาบอานซี', 'clear water', 'น้ำใส', 'summer swim', 'mountains round the lake'], 'หาไม้พายในมือเด็กที่ยืนบนบอร์ด', 'Find the paddle in the hands of the child standing on the board',
    // a child standing on a long bright paddleboard on clear blue-green water, a long paddle dipping in, mountains rising round the lake, a little fish visible under the clear water
    sky('#E1F5FE') + P('M-4 110l40-50 30 26 40-50 40 40 30-24 68 58z', '#7E9F8A', 3) + P('M100 40l14-14 12 14-8-2z', '#FFFFFF', 0) + R(-4, 108, 248, 136, '#4DD0E1', 0, 3) + Lc('M10 130h50M170 124h50M20 220h40', '#E0F7FA', 3)
      + g(70, 210, 1, P('M-10 0c6-8 20-8 24 0-4 8-20 8-24 0z', '#FFB74D', 2) + P('M-10 0l-8-6v12z', '#FFB74D', 2))
      + E(126, 180, 80, 10, '#FF7043', 3) + Lc('M60 180h130', '#FFFFFF', 2)
      + g(126, 170, 1, Lc('M-8 0v-26M8 0v-26', '#1E88E5', 6) + P('M-12-26h24l2-30h-28z', '#FFEB3B', 3) + C(0, -68, 12, '#FFE0BD', 3) + P('M-12-74c0-12 24-12 24 0z', '#6D4C41', 2.5) + face(0, -66, 0.26) + Lc('M12-50l24 4M-10-50l26 6', '#FFE0BD', 5)
        + Lc('M44-80l-12 110', '#5D4037', 4) + P('M32 28c-6 6-6 18 0 20 6-2 6-14 0-20z', '#1E88E5', 2.5)) + face(150, 182, 0.2)),

  // ---------- Lyon
  L('fr/lyon/landmark-coussin.v1.svg', 'ขนมกุสแซ็งเดอลียง หมอนผ้าไหมสีเขียว', 'Coussins de Lyon, the green silk-cushion sweets', ['coussin de lyon', 'กุสแซ็งเดอลียง', 'green cushion sweet', 'ขนมหมอนสีเขียว', 'marzipan and chocolate', 'มาร์ซิปันช็อกโกแลต', 'lyon sweets', 'ของฝากลียง', 'silk cushion', 'gift box'], 'หาเส้นสีฟ้าตรงกลางขนมรูปหมอน', 'Find the blue line across the middle of the cushion sweet',
    // a little open gift box lined with paper holding pale green pillow-shaped sweets, each with a darker green blue-striped seam, one big sweet in front with a smiling face, a ribbon
    P('M30 120h180l-14 90H44z', '#FFFFFF', 3) + P('M30 120l-10-40h200l-10 40z', '#ECEFF1', 3) + Lc('M60 120l-6 90M180 120l6 90', '#B0BEC5', 2)
      + [[64, 116], [104, 110], [144, 110], [184, 116]].map(([x, y]) => P(`M${x - 20} ${y}c0-14 10-16 20-14s20 0 20 14-10 16-20 14-20 0-20-14z`, '#9CCC65', 3) + Lc(`M${x - 18} ${y}h36`, '#29B6F6', 2.5)).join('')
      + g(120, 176, 1, P('M-46 0c0-30 20-34 46-30s46 0 46 30-20 34-46 30-46 0-46-30z', '#AED581', 3) + Lc('M-44 0h88', '#1E88E5', 4) + Lc('M-44-4h88', '#7CB342', 2) + face(0, -14, 0.36))
      + P('M194 80c20-20 40-10 30 10-12 4-24 0-30-10zM194 80c-6 20 4 34 20 34', '#EC407A', 3)),
  L('fr/lyon/landmark-cervelle.v1.svg', 'ดิปชีสสมุนไพรแซร์แวลเดอกานุต', 'Cervelle de canut, the herby cheese dip of Lyon', ['cervelle de canut', 'แซร์แวลเดอกานุต', 'herb cheese dip', 'ดิปชีสสมุนไพร', 'fromage blanc', 'ชีสขาว', 'chives and shallots', 'กุยช่ายฝรั่ง', 'bouchon starter', 'bread dip'], 'หาต้นกุยช่ายฝรั่งที่ปักอยู่ในชีสขาว', 'Find the chives poking out of the white cheese',
    // a round earthenware bowl of fluffy white cheese speckled with green herbs, a swirl on top, chive stalks sticking up, slices of crusty bread for dipping around it
    P('M50 120h140c0 46-30 74-70 74s-70-28-70-74z', '#C0673E', 3) + Lc('M60 150c30 10 90 10 120 0', '#E08A5F', 4) + P('M54 120c0-26 132-26 132 0z', '#FAFAFA', 3) + P('M90 108c10-10 40-12 60 0-10 8-40 10-60 0z', 'none', 2.5)
      + Array.from({ length: 14 }, (_, k) => R(68 + (k * 17) % 100, 102 + (k * 7) % 16, 4, 2.5, '#43A047', 0.5, 0)).join('') + [[104, 96], [114, 90], [126, 94]].map(([x, y], k) => Lc(`M${x} ${y + 10}l${(k - 1) * 4}-34`, '#43A047', 3.5)).join('') + face(120, 156, 0.42)
      + [[30, 200, -20], [210, 196, 18], [196, 120, 30]].map(([x, y, r]) => g(x, y, 1, P('M-24-14h48c4 0 6 4 6 8v20h-60v-20c0-4 2-8 6-8z', '#E2A04A', 3) + R(-20, -8, 40, 20, '#FFF3D6', 4, 0) + [[-10, 0], [6, 4], [10, -4]].map(([dx, dy]) => C(dx, dy, 2, '#E2A04A', 0)).join(''), r)).join('')),
  L('fr/lyon/landmark-bugnes.v1.svg', 'ขนมทอดบุญญ์ช่วงเทศกาลคาร์นิวัลของลียง', 'Bugnes, Lyon\'s carnival fritters', ['bugnes', 'บุญญ์', 'bugnes lyonnaises', 'carnival fritters', 'ขนมทอดคาร์นิวัล', 'mardi gras', 'มาร์ดีกรา', 'icing sugar', 'น้ำตาลไอซิ่ง', 'twisted dough'], 'หาขนมชิ้นที่บิดเป็นปมตรงกลาง', 'Find the fritter twisted into a knot in the middle',
    // a heap of puffy golden fried dough strips, each twisted through a slit in the middle, heavily dusted with white sugar, on a paper doily, a dusting of sugar falling, a smiling one on top
    E(120, 180, 104, 30, '#FFFFFF', 3) + Array.from({ length: 12 }, (_, k) => C(24 + k * 17.5, 180 + Math.sin(k) * 24, 5, '#FFFFFF', 2)).join('') + E(120, 180, 90, 22, '#FFF8E1', 2)
      + [[70, 166, -20], [120, 172, 10], [170, 166, 30], [94, 146, 20], [146, 146, -15], [120, 120, 0]].map(([x, y, r], k) => g(x, y, 1, P('M-30-14h60c6 0 10 6 10 14s-4 14-10 14h-60c-6 0-10-6-10-14s4-14 10-14z', '#E2A04A', 3) + P('M-12-4c6-6 18-6 24 0-6 6-18 6-24 0z', '#C17A2B', 2) + P('M-4-2c4 4 4 8 0 10', 'none', 2)
        + [[-22, -8], [-14, 6], [18, -6], [24, 6], [0, 8]].map(([dx, dy]) => C(dx, dy, 2.2, '#FFFFFF', 0)).join('') + (k === 5 ? face(0, -2, 0.22) : ''), r)).join('')
      + [[100, 60], [120, 50], [140, 64], [110, 84], [134, 88]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 1.5)).join('')),
  L('fr/lyon/landmark-terreaux.v1.svg', 'น้ำพุบาร์ทอลดีกับม้าพ่นน้ำที่จัตุรัสแตโร', 'The Bartholdi Fountain and its galloping horses on the Place des Terreaux', ['place des terreaux', 'จัตุรัสแตโร', 'bartholdi fountain', 'น้ำพุบาร์ทอลดี', 'galloping horses', 'ม้าพ่นน้ำ', 'water jets', 'สายน้ำพุ่ง', 'hotel de ville', 'presqu\'ile'], 'หาม้าที่พ่นน้ำออกจากจมูก', 'Find the horse snorting water from its nose',
    // a big stone fountain basin with two leaping horses rising out of curling waves and puffing water from their noses, a chariot shell above them, the grand town hall behind, little jets of water across the square
    sky('#E3F2FD') + R(10, 30, 220, 110, '#E6D3B3', 0, 3) + Array.from({ length: 6 }, (_, k) => R(22 + k * 36, 50, 18, 30, '#81D4FA', 8, 2)).join('') + R(108, 4, 24, 26, '#E6D3B3', 0, 2.5) + R(-4, 140, 248, 104, '#D7CCC8', 0, 3)
      + Array.from({ length: 8 }, (_, k) => C(18 + k * 30, 226, 3, '#4FC3F7', 1.5) + Lc(`M${18 + k * 30} 226v-10`, '#81D4FA', 2)).join('')
      + P('M30 200h180l-10 20H40z', '#BDBDBD', 3) + E(120, 200, 90, 12, '#4FC3F7', 3) + P('M90 180c0-30 60-30 60 0z', '#CFD8DC', 3) + P('M100 150c6-20 34-20 40 0z', '#B0BEC5', 3)
      + [[70, 172, -1], [170, 172, 1]].map(([x, y, d]) => g(x, y, 1, P(`M${-20 * d} 20c0-24 ${10 * d}-36 ${30 * d}-40l${10 * d} 10c${-6 * d} 4 ${-10 * d} 14 ${-10 * d} 30z`, '#B0BEC5', 3) + P(`M${10 * d}-20c${6 * d}-14 ${18 * d}-18 ${26 * d}-10l${-4 * d} 14c${-8 * d}-2 ${-14 * d} 0 ${-22 * d} 4z`, '#B0BEC5', 3) + P(`M${4 * d}-28l${4 * d}-10 ${4 * d} 10`, '#90A4AE', 2) + C(20 * d, -18, 2, INK, 0) + Lc(`M${36 * d}-8c${10 * d} 6 ${16 * d} 20 ${14 * d} 36`, '#4FC3F7', 3) + Lc(`M${-24 * d} 20c${-4 * d}-10 ${-12 * d}-12 ${-18 * d}-4`, '#4FC3F7', 3))).join('')
      + face(120, 170, 0.32) + Lc('M76 196c10-6 20 6 30 0s20 6 30 0 20 6 30 0', '#E1F5FE', 3)),
  L('fr/lyon/landmark-jacquard.v1.svg', 'กี่ทอผ้าไหมฌักการ์กับบัตรเจาะรู', 'The Jacquard silk loom and its punched cards', ['jacquard loom', 'กี่ทอฌักการ์', 'silk weaving', 'ทอผ้าไหม', 'punched cards', 'บัตรเจาะรู', 'canuts', 'ช่างทอกานุต', 'maison des canuts', 'croix-rousse'], 'หาสายบัตรเจาะรูที่ห้อยอยู่บนยอดกี่', 'Find the chain of punched cards hanging at the top of the loom',
    // a tall wooden loom frame with a chain of punched cards looping over its top, hundreds of coloured threads running down to a shiny piece of patterned silk being woven, a weaver child at the bench
    sky('#FFF8E1') + R(-4, 210, 248, 34, '#A1887F', 0, 3) + Lc('M40 210V30h160v180M40 30l-10-10M200 30l10-10', '#8D6E63', 8) + Lc('M40 120h160', '#8D6E63', 6)
      + Array.from({ length: 7 }, (_, k) => g(66 + k * 18, 24 + Math.abs(k - 3) * 4, 1, R(-8, -12, 16, 24, '#FFF3D6', 1, 2) + C(-3, -4, 1.8, INK, 0) + C(3, 4, 1.8, INK, 0) + C(3, -6, 1.8, INK, 0), (k - 3) * 6)).join('')
      + Array.from({ length: 12 }, (_, k) => Lc(`M${58 + k * 11} 50v74`, ['#E53935', '#FFC107', '#1E88E5', '#43A047'][k % 4], 2)).join('')
      + R(56, 124, 128, 54, '#7E57C2', 2, 3) + Array.from({ length: 4 }, (_, k) => P(`M${72 + k * 30} 140l10 10-10 10-10-10z`, '#FFD54F', 2) + C(72 + k * 30, 150, 3, '#F48FB1', 0)).join('') + face(120, 166, 0.3)
      + R(70, 178, 100, 8, '#6D4C41', 2, 2.5) + R(60, 196, 120, 14, '#A1673F', 2, 3) + kid(120, 196, '#26A69A', 0.9)),
];

export default { places: {}, items };
