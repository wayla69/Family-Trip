// Wave 9 (mixed group, part 1): Türkiye (Istanbul, Cappadocia, Pamukkale with İzmir and Ephesus) and Georgia (Tbilisi, Kazbegi, Batumi)
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (tr/istanbul/landmark-dolmabahce.v1.svg → tr-istanbul.landmark.dolmabahce)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport): tr/food-pide.v1.svg → tr.food.pide
const K = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const tree = (x, y, s, c) => g(x, y, s, R(-3, 0, 6, 16, '#795548', 0, 2) + C(0, -8, 14, c, 2.5));
const pine = (x, y, s) => g(x, y, s, R(-3, 0, 6, 12, '#795548', 0, 2) + P('M0-40l16 28h-8l12 14h-40l12-14h-8z', '#388E3C', 2.5));
const col = (x, y, h, w = 14, c = '#F5F0E6') => R(x - w / 2 - 4, y - h - 8, w + 8, 8, c, 1, 2.5) + R(x - w / 2, y - h, w, h, c, 0, 2.5) + R(x - w / 2 - 4, y, w + 8, 7, c, 1, 2.5);

const items = [
  // ---------- Türkiye
  K('tr', 'food', 'pide', 'พีเด ขนมปังรูปเรือของตุรกี', 'Pide, the boat-shaped Turkish flatbread', ['pide', 'พีเด', 'turkish pizza', 'พิซซ่าตุรกี', 'boat bread', 'ขนมปังรูปเรือ', 'kıymalı pide', 'yumurtalı', 'karadeniz pide', 'stone oven'],
    // a long golden boat-shaped flatbread with pinched pointy ends on a wooden oven paddle, a red minced-meat filling, an egg with a sunny yolk in the middle, butter melting, green parsley
    R(14, 160, 212, 22, '#A1673F', 8, 3.5) + R(200, 166, 34, 10, '#8D5524', 4, 2.5)
      + P('M14 128C50 86 190 86 226 128 190 170 50 170 14 128z', '#E3A857', 3.5) + P('M44 128C76 104 164 104 196 128 164 152 76 152 44 128z', '#C0503A', 3)
      + [[66, 124], [82, 138], [158, 120], [170, 136], [94, 116], [148, 142]].map(([x, y]) => C(x, y, 4, '#8E2B1C', 0)).join('')
      + E(120, 128, 30, 20, '#FFFFFF', 2.5) + C(120, 128, 13, '#FFB300', 2.5) + E(144, 112, 9, 5, '#FFF59D', 0)
      + [[76, 112], [168, 146], [100, 146]].map(([x, y]) => P(`M${x} ${y}l6-6 4 6-6 4z`, '#7CB342', 1.5)).join('') + face(120, 70, 0.36, 'o')
      + Lc('M108 60c-6-10 6-14 0-24M132 60c-6-10 6-14 0-24', '#CFD8DC', 4)),
  K('tr', 'food', 'baklava', 'บักลาวา ขนมชั้นพิสตาชิโอ', 'Baklava, layers of pastry and pistachio', ['baklava', 'บักลาวา', 'pistachio', 'พิสตาชิโอ', 'gaziantep', 'กาเซียนเท็ป', 'syrup pastry', 'ขนมน้ำเชื่อม', 'filo layers', 'turkish sweets'],
    // a round copper tray of diamond-cut golden pastry pieces each topped with bright green pistachio, one big piece in front on a little plate showing its many thin crispy layers
    E(120, 116, 104, 54, '#B87333', 3.5) + E(120, 112, 92, 44, '#E9B566', 3)
      + [[72, 100], [116, 100], [160, 100], [94, 120], [138, 120], [182, 120], [50, 120]].map(([x, y]) => P(`M${x} ${y - 14}l22 14-22 14-22-14z`, '#F2C46D', 2.5) + C(x, y, 5, '#7CB342', 0)).join('')
      + E(120, 200, 66, 16, '#FFFFFF', 3) + P('M74 196l14-42h64l14 42z', '#F4CB7A', 3.5) + P('M88 154h64l-6-10H94z', '#8BC34A', 3)
      + [0, 1, 2, 3].map((k) => Lc(`M${82 - k * 2} ${170 + k * 8}h${76 + k * 4}`, '#C98E3A', 2.5)).join('') + face(120, 176, 0.3)),
  K('tr', 'food', 'kunefe', 'คูเนเฟ ขนมเส้นกรอบไส้ชีสยืด', 'Künefe, crispy shreds with stretchy cheese', ['künefe', 'kunefe', 'คูเนเฟ', 'kadayıf', 'shredded pastry', 'ขนมเส้นกรอบ', 'hatay', 'stretchy cheese', 'ชีสยืด', 'antakya dessert'],
    // a small round copper pan of crispy orange shredded pastry, a wedge lifted out on a fork with long strings of white cheese stretching back to the pan, pistachio crumbs on top
    R(14, 116, 42, 12, '#8D5524', 5, 3) + C(110, 138, 84, '#B87333', 3.5) + C(110, 138, 70, '#F57C00', 3)
      + [0, 1, 2, 3, 4].map((k) => Lc(`M${56 + k * 8} ${118 + k * 10}c20-14 60-14 ${92 - k * 10} 0`, '#FFB74D', 3)).join('')
      + [[82, 108], [124, 150], [96, 166], [140, 118]].map(([x, y]) => C(x, y, 4, '#7CB342', 0)).join('')
      + Lc('M150 120c20-20 30-40 40-60M140 132c24-24 40-44 54-66M156 142c20-28 36-52 46-74', '#FFFDE7', 5) + Lc('M150 120c20-20 30-40 40-60M140 132c24-24 40-44 54-66', INK, 1.5)
      + g(196, 52, 1, P('M-24 6l28-34 22 18z', '#F57C00', 3) + Lc('M-20 0l22-26', '#FFB74D', 3) + C(-2, -8, 3, '#7CB342', 0), 10) + Lc('M218 40l14-30', '#B0BEC5', 6) + face(100, 160, 0.32)),
  K('tr', 'culture', 'iznik', 'จานกระเบื้องอิซนิก', 'An İznik tile plate with tulips', ['iznik', 'อิซนิก', 'iznik tiles', 'กระเบื้องอิซนิก', 'tulip pattern', 'ลายดอกทิวลิป', 'ottoman ceramics', 'เครื่องเคลือบออตโตมัน', 'cobalt blue', 'carnation'],
    // a big round white plate painted with a cobalt-blue border of waves, red tulips, blue curly saz leaves and a turquoise carnation fanning out from the middle
    C(120, 120, 100, '#FFFFFF', 4) + C(120, 120, 100, 'none', 0) + Lc('M120 30a90 90 0 1 0 .1 0', '#1E5AA8', 12)
      + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => g(120, 120, 1, C(0, -90, 4, '#4FC3F7', 0), k * 45)).join('')
      + Lc('M120 176V96M120 150c-20-10-34-30-38-56M120 150c20-10 34-30 38-56', '#2E7D32', 4)
      + P('M82 94c-10-14-4-30 0-34 4 6 6 10 0 18 6-8 12-8 16-2-4 10-10 16-16 18z', '#E53935', 2.5) + P('M158 94c10-14 4-30 0-34-4 6-6 10 0 18-6-8-12-8-16-2 4 10 10 16 16 18z', '#E53935', 2.5)
      + P('M120 96c-16-4-22-24-10-34 4 8 6 8 10 0 4 8 6 8 10 0 12 10 6 30-10 34z', '#26C6DA', 2.5)
      + P('M86 170c-16-4-26-16-26-30 14 2 24 12 26 30zM154 170c16-4 26-16 26-30-14 2-24 12-26 30z', '#1E5AA8', 2.5) + face(120, 132, 0.3)),

  // ---------- Istanbul
  L('tr/istanbul/landmark-dolmabahce.v1.svg', 'ประตูพระราชวังโดลมาบาห์เช', 'The grand gate of Dolmabahçe Palace', ['dolmabahçe', 'dolmabahce', 'โดลมาบาห์เช', 'palace gate', 'ประตูพระราชวัง', 'saltanat kapısı', 'ottoman palace', 'วังออตโตมัน', 'beşiktaş', 'crystal staircase'],
    'หาประตูขาวลายทองที่สูงเหมือนเค้ก', 'Find the white gate with gold curls, tall like a cake',
    // a tall white marble palace gate like a wedding cake: a big round arch with gold curls, paired columns either side, a curvy crown on top, iron railings and the blue Bosphorus behind
    R(-4, 176, 248, 40, '#4FC3F7', 0, 0) + R(-4, 196, 248, 30, '#B0BEC5', 0, 0)
      + Lc('M10 150h40M190 150h40', '#455A64', 3) + [14, 26, 38, 202, 214, 226].map((x) => Lc(`M${x} 150v40`, '#455A64', 3)).join('')
      + R(54, 70, 132, 126, '#FFFFFF', 0, 3.5) + P('M84 196V128a36 36 0 0 1 72 0v68z', '#5D4037', 3.5) + Lc('M88 196V130a32 32 0 0 1 64 0v66', '#FFCA28', 3)
      + [62, 74, 166, 178].map((x) => R(x - 4, 90, 8, 106, '#F5F0E6', 0, 2.5)).join('') + R(48, 62, 144, 12, '#F5F0E6', 2, 3)
      + P('M74 62c0-24 18-30 46-40 28 10 46 16 46 40z', '#FFFFFF', 3.5) + C(120, 40, 10, '#FFCA28', 2.5) + Lc('M94 48c8-6 16-6 24 0M122 48c8-6 16-6 24 0', '#FFCA28', 3)
      + Lc('M100 110c4-8 12-8 16 0M124 110c4-8 12-8 16 0', '#FFCA28', 3) + face(120, 156, 0.34)),
  L('tr/istanbul/landmark-redschool.v1.svg', 'โรงเรียนอิฐแดงแห่งเฟเนร์บนเนินบาลัต', 'The red-brick school on the Fener hill', ['fener', 'เฟเนร์', 'balat', 'บาลัต', 'red castle', 'ปราสาทแดง', 'phanar greek school', 'red brick school', 'golden horn', 'โกลเด้นฮอร์น'],
    'หาตึกอิฐแดงหลังคาโดมที่ดูเหมือนปราสาท', 'Find the red-brick building with a dome that looks like a castle',
    // a big red-brick castle-like school with a tall middle tower topped by a red dome, rows of arched windows, sitting on a hill above a row of little houses painted yellow, mint and pink
    P('M-4 160c50-30 200-30 248 0v60H-4z', '#81C784', 0) + R(36, 96, 168, 70, '#C0503A', 0, 3.5) + R(96, 56, 48, 110, '#C0503A', 0, 3.5)
      + P('M92 58c0-32 56-32 56 0z', '#B23A2A', 3.5) + Lc('M120 26v-14', INK, 3) + C(120, 10, 4, '#FFCA28', 2)
      + [52, 72, 160, 180].map((x) => P(`M${x} 140v-22a6 6 0 0 1 12 0v22z`, '#FFF3E0', 2)).join('') + [106, 126].map((x) => P(`M${x} 98v-20a4 4 0 0 1 8 0v20z`, '#FFF3E0', 2)).join('')
      + Lc('M36 108h168M36 124h168', '#E57373', 2) + [[10, '#FFEB3B'], [50, '#80CBC4'], [90, '#F48FB1'], [130, '#FFCC80'], [170, '#B39DDB'], [210, '#AED581']].map(([x, c]) => R(x, 180, 34, 40, c, 0, 3) + P(`M${x - 2} 180l19-14 19 14z`, '#E57373', 2.5) + R(x + 12, 196, 10, 12, '#FFFFFF', 1, 2)).join('')
      + face(120, 128, 0.34)),
  L('tr/istanbul/landmark-ahmetfountain.v1.svg', 'น้ำพุสุลต่านอาห์เมตที่ 3', 'The Fountain of Sultan Ahmed III', ['ahmed iii fountain', 'น้ำพุอาห์เมต', 'çeşme', 'ottoman fountain', 'น้ำพุออตโตมัน', 'topkapı gate', 'sultanahmet square', 'wide roof', 'หลังคากว้าง', 'tiled kiosk'],
    'หาซุ้มน้ำพุหลังคากว้างที่มีโดมจิ๋วห้าลูก', 'Find the fountain kiosk with a wide roof and five tiny domes',
    // a square little fountain house with a very wide overhanging roof and five tiny domes on top, its walls covered in blue and green tile panels and gold, a water tap pouring into a stone basin
    R(-4, 200, 248, 40, '#D7CCC8', 0, 0) + R(50, 96, 140, 104, '#FFF8E1', 0, 3.5)
      + P('M20 96h200l-20-20H40z', '#2E7D32', 3.5) + Lc('M24 98h192', '#FFCA28', 4)
      + [[70, 10], [100, 12], [120, 16], [140, 12], [170, 10]].map(([x, r]) => P(`M${x - r} 76a${r} ${r} 0 0 1 ${2 * r} 0z`, '#90A4AE', 2.5) + Lc(`M${x} ${76 - r}v-8`, '#FFCA28', 2.5)).join('')
      + [62, 160].map((x) => R(x, 110, 18, 60, '#1E88E5', 2, 2.5) + Lc(`M${x + 9} 116v48`, '#80DEEA', 3)).join('')
      + P('M96 176v-46a24 24 0 0 1 48 0v46z', '#26A69A', 3) + Lc('M120 140v14', '#B0BEC5', 5) + Lc('M120 156v20', '#4FC3F7', 4)
      + R(94, 176, 52, 14, '#BCAAA4', 3, 3) + face(120, 116, 0.28)),
  L('tr/istanbul/landmark-shoeshine.v1.svg', 'กล่องขัดรองเท้าทองเหลืองของอิสตันบูล', 'An Istanbul brass shoe-shine box', ['shoe shine', 'ขัดรองเท้า', 'boyacı', 'shoeshine box', 'กล่องขัดรองเท้า', 'brass', 'ทองเหลือง', 'istiklal street', 'kadıköy', 'street craft'],
    'หากล่องไม้ที่มีขวดยาขัดโดมทองเหลือง', 'Find the wooden box with shiny brass polish pots on top',
    // a fancy wooden shoe-shine box covered in shiny brass corners and studs, a row of tall brass polish pots with little domed lids on top, a foot rest, two brushes and a shiny shoe
    R(40, 120, 160, 80, '#8D5524', 6, 3.5) + R(40, 120, 160, 14, '#FFCA28', 3, 3) + R(40, 188, 160, 12, '#FFCA28', 3, 3)
      + [[48, 136], [192, 136]].map(([x, y]) => R(x - 6, y, 12, 52, '#FFD54F', 2, 2.5)).join('') + [70, 100, 140, 170].map((x) => C(x, 168, 4, '#FFE082', 2)).join('')
      + [[72, '#FFCA28'], [100, '#FFB300'], [140, '#FFCA28'], [168, '#FFB300']].map(([x, c]) => R(x - 9, 82, 18, 38, c, 3, 2.5) + P(`M${x - 10} 82a10 12 0 0 1 20 0z`, c, 2.5) + C(x, 68, 3, c, 2)).join('')
      + P('M108 120l6-40h12l6 40z', '#5D4037', 3) + R(104, 74, 32, 8, '#FFCA28', 2, 2.5)
      + P('M150 220c10-16 50-16 66-6 4 6-2 10-8 10h-58z', '#4E342E', 3) + E(196, 212, 8, 3, '#FFFFFF', 0)
      + R(14, 204, 42, 12, '#A1673F', 3, 2.5) + Lc('M18 216v6M26 216v6M34 216v6M42 216v6M50 216v6', INK, 2) + face(120, 152, 0.34)),

  // ---------- Cappadocia
  L('tr/cappadocia/landmark-kizilirmak.v1.svg', 'สะพานแขวนข้ามแม่น้ำแดงที่อาวานอส', 'The swing bridge over the Red River at Avanos', ['kızılırmak', 'kizilirmak', 'คึซึลเออร์มัก', 'red river', 'แม่น้ำแดง', 'avanos bridge', 'สะพานอาวานอส', 'swing bridge', 'สะพานแขวน', 'river walk'],
    'หาสะพานแขวนเหนือแม่น้ำสีแดงอิฐ', 'Find the wobbly bridge over the brick-red river',
    // a brick-red river flowing under a wobbly wooden suspension footbridge hung from two little towers, a child walking across, stone houses of Avanos on the far bank, a clay pot on the bank
    R(-4, -4, 248, 248, '#E3F2FD', 0, 0) + [[20, 86], [60, 76], [180, 78], [214, 88]].map(([x, y]) => R(x, y, 30, 34, '#E6C9A8', 0, 3) + R(x + 10, y + 14, 10, 12, '#6D4C41', 1, 2)).join('')
      + R(-4, 112, 248, 20, '#C5A27A', 0, 0) + P('M-4 132h248v70H-4z', '#B5532F', 0) + Lc('M10 156c30-8 60 8 90 0s60 8 90 0 40 6 50 2M20 184c30-8 60 8 90 0s60 8 90 0', '#E07A55', 4)
      + R(30, 92, 14, 60, '#8D6E63', 2, 3) + R(196, 92, 14, 60, '#8D6E63', 2, 3) + Lc('M37 94c40 50 126 50 166 0', INK, 3)
      + P('M30 146c50 18 130 18 180 0v8c-50 18-130 18-180 0z', '#D7A86E', 3) + [60, 84, 108, 132, 156, 180].map((x) => Lc(`M${x} ${x < 120 ? 112 + (x - 37) * 0.25 : 112 + (203 - x) * 0.25}v${x < 120 ? 40 - (x - 37) * 0.15 : 40 - (203 - x) * 0.15}`, INK, 2)).join('')
      + kid(132, 150, '#FFCA28', 0.9) + g(30, 214, 1, P('M-14 10c-4-16 0-26 8-30h12c8 4 12 14 8 30z', '#C0503A', 3) + face(0, -2, 0.18)) + face(120, 196, 0.28, 'none')),
  L('tr/cappadocia/landmark-mustafapasa.v1.svg', 'คฤหาสน์หินแกะสลักแห่งมุสตาฟาปาชา', 'The carved stone mansions of Mustafapaşa', ['mustafapaşa', 'mustafapasa', 'มุสตาฟาปาชา', 'sinasos', 'carved stone house', 'บ้านหินแกะสลัก', 'stone mansion', 'คฤหาสน์หิน', 'greek houses', 'carved doorway'],
    'หาบ้านหินที่มีลายแกะเหมือนลูกไม้รอบหน้าต่าง', 'Find the stone house with carving like lace around its windows',
    // a honey-coloured stone mansion with a tall carved arch over its wooden door, lacy carved stone frames round its two upper windows, a small balcony and a vine on the wall
    R(-4, 206, 248, 40, '#D7CCC8', 0, 0) + R(36, 56, 168, 150, '#EBCB94', 0, 3.5) + P('M28 58l92-28 92 28z', '#C69C6D', 3.5)
      + [[70, 80], [146, 80]].map(([x, y]) => R(x - 4, y - 4, 32, 46, '#F5DEB3', 2, 3) + R(x + 2, y + 4, 20, 32, '#5D7FA3', 1, 2.5) + Lc(`M${x - 2} ${y + 2}c6-6 10 0 16-6s10 0 16 0`, '#B8865B', 2.5) + C(x + 12, y - 8, 4, '#B8865B', 2)).join('')
      + R(60, 126, 120, 8, '#C69C6D', 2, 3) + [70, 90, 110, 130, 150, 170].map((x) => Lc(`M${x} 134v-14`, '#8D6E63', 2.5)).join('') + Lc('M60 120h120', '#8D6E63', 3)
      + P('M88 206v-42a32 32 0 0 1 64 0v42z', '#F5DEB3', 3.5) + P('M98 206v-38a22 22 0 0 1 44 0v38z', '#8D5524', 3) + Lc('M90 160c10-14 20-4 30-14 10 10 20 0 30 14', '#B8865B', 3)
      + Lc('M40 200c10-30 0-60 14-90', '#558B2F', 3) + [[46, 178], [50, 150], [54, 124]].map(([x, y]) => E(x, y, 7, 4, '#7CB342', 2)).join('') + face(120, 192, 0.24, 'none')),
  // ---------- Pamukkale, Ephesus and İzmir
  L('tr/pamukkale/landmark-artemis.v1.svg', 'เสาต้นเดียวของวิหารอาร์เทมิส', 'The lone column of the Temple of Artemis', ['temple of artemis', 'วิหารอาร์เทมิส', 'artemision', 'lone column', 'เสาต้นเดียว', 'selçuk', 'เซลชุก', 'seven wonders', 'เจ็ดสิ่งมหัศจรรย์', 'ancient wonder'],
    'หาเสาหินต้นเดียวที่ยืนอยู่กลางทุ่งหญ้า', 'Find the one tall stone column standing alone in the meadow',
    // one very tall patched-up marble column made of stacked round drums standing alone in a green marshy meadow with a little pond, broken column pieces lying in the grass
    R(-4, -4, 248, 248, '#E3F2FD', 0, 0) + P('M-4 180c60-14 180-14 248 0v64H-4z', '#9CCC65', 3) + E(70, 206, 44, 12, '#4FC3F7', 3)
      + R(98, 12, 44, 12, '#F5F0E6', 2, 3) + [0, 1, 2, 3, 4, 5, 6].map((k) => R(104, 24 + k * 22, 32, 22, k % 2 ? '#EDE4D3' : '#F5F0E6', 0, 2.5)).join('') + R(94, 178, 52, 12, '#E0D6C2', 2, 3)
      + g(178, 196, 1, E(0, 0, 26, 12, '#EDE4D3', 3) + E(-20, 0, 6, 12, '#F5F0E6', 2.5), -10) + g(36, 176, 1, R(-14, -10, 28, 20, '#EDE4D3', 3, 3))
      + [[150, 176], [200, 172], [30, 196]].map(([x, y]) => Lc(`M${x} ${y}v-14M${x + 6} ${y}v-10`, '#558B2F', 3)).join('') + face(120, 100, 0.3)),
  L('tr/pamukkale/landmark-tetrapylon.v1.svg', 'ประตูเตตราไพลอนแห่งอโฟรดิเซียส', 'The Tetrapylon gate of Aphrodisias', ['tetrapylon', 'เตตราไพลอน', 'aphrodisias', 'อโฟรดิเซียส', 'twisted columns', 'เสาเกลียว', 'ancient gate', 'ประตูโบราณ', 'marble city', 'aydın'],
    'หาประตูหินที่มีเสาเกลียวเหมือนลูกอม', 'Find the stone gate with columns twisted like candy sticks',
    // a grand marble gateway with four columns in front, two of them twisted with spiral grooves like candy, a triangle top with a round arch cut into it, pine trees behind
    pine(20, 186, 1) + pine(220, 186, 1.1) + R(-4, 196, 248, 44, '#D7CCC8', 0, 0) + R(26, 186, 188, 12, '#EDE4D3', 1, 3)
      + [[46, 0], [94, 1], [146, 1], [194, 0]].map(([x, tw]) => col(x, 178, 92, 18) + (tw ? [0, 1, 2, 3, 4].map((k) => Lc(`M${x - 9} ${92 + k * 18}l18 12`, '#C9B99A', 2.5)).join('') : Lc(`M${x - 4} 90v84M${x + 4} 90v84`, '#C9B99A', 2))).join('')
      + R(22, 70, 196, 14, '#F5F0E6', 1, 3) + P('M22 70L120 22l98 48z', '#F5F0E6', 3.5) + P('M88 70a32 32 0 0 1 64 0z', '#FFF3E0', 3) + P('M96 70a24 24 0 0 1 48 0z', '#B3E5FC', 2.5)
      + face(120, 120, 0.3)),
  L('tr/pamukkale/landmark-izmirclock.v1.svg', 'หอนาฬิกาอิซมีร์ที่จัตุรัสโคนัค', 'İzmir Clock Tower on Konak Square', ['izmir clock tower', 'หอนาฬิกาอิซมีร์', 'saat kulesi', 'konak square', 'จัตุรัสโคนัค', 'ottoman tower', 'หอคอยออตโตมัน', 'fountains', 'pigeons', 'konak'],
    'หาหอนาฬิกาแปดเหลี่ยมที่มีน้ำพุรอบฐาน', 'Find the eight-sided clock tower with fountains round its foot',
    // a slim cream eight-sided Ottoman clock tower in four storeys with lacy arches and a little dome cap, round clock faces near the top, four small fountains with water arcs round its base, pigeons
    R(-4, 204, 248, 40, '#CFD8DC', 0, 0) + R(64, 176, 112, 30, '#EDE4D3', 2, 3.5)
      + [[52, 1], [188, -1]].map(([x, d]) => R(x - 18, 186, 36, 18, '#B0BEC5', 3, 3) + Lc(`M${x} 186c${d * 4}-16 ${d * 14}-20 ${d * 24}-8`, '#4FC3F7', 4)).join('')
      + R(88, 130, 64, 46, '#F5ECD7', 0, 3.5) + R(94, 86, 52, 44, '#F5ECD7', 0, 3.5) + R(100, 50, 40, 36, '#F5ECD7', 0, 3.5)
      + [[96, 140], [124, 140], [100, 96], [122, 96]].map(([x, y]) => P(`M${x} ${y + 26}v-18a9 9 0 0 1 18 0v18z`, '#80CBC4', 2.5)).join('')
      + R(84, 124, 72, 8, '#C9A96E', 1, 2.5) + R(90, 80, 60, 8, '#C9A96E', 1, 2.5) + R(96, 44, 48, 8, '#C9A96E', 1, 2.5)
      + P('M106 44c0-20 28-20 28 0z', '#FFE082', 3) + Lc('M120 24v-12', INK, 3) + C(120, 10, 3, '#FFCA28', 2)
      + C(120, 68, 13, '#FFFFFF', 3) + face(120, 66, 0.22, 'none') + Lc('M120 68v-8M120 68l6 3', INK, 2)
      + [[30, 226], [210, 222]].map(([x, y]) => E(x, y, 10, 6, '#90A4AE', 2.5) + C(x + 9, y - 6, 4, '#90A4AE', 2)).join('')),
  L('tr/pamukkale/landmark-arcadian.v1.svg', 'ถนนอาร์คาเดียนแห่งเอเฟซัสที่ทอดไปสู่ทะเล', 'The Arcadian Way of Ephesus, the road to the old harbour', ['arcadian way', 'ถนนอาร์คาเดียน', 'harbour street', 'ถนนท่าเรือ', 'ephesus street', 'colonnaded road', 'ถนนเสาเรียง', 'marble road', 'ancient harbour', 'ท่าเรือโบราณ'],
    'หาถนนหินอ่อนที่มีเสาเรียงสองข้างพาไปถึงทะเล', 'Find the marble road lined with columns that leads to the sea',
    // a long straight marble road seen down its middle, rows of columns on both sides getting smaller into the distance, a strip of blue sea and a sailboat at the far end, poppies in the grass
    R(-4, -4, 248, 248, '#FFF3E0', 0, 0) + R(-4, 96, 248, 18, '#4FC3F7', 0, 0) + P('M140 100l10-16 10 16z', '#FFFFFF', 2) + Lc('M150 100v4', INK, 2)
      + P('M-4 114h248v130H-4z', '#AED581', 0) + P('M104 114h32l80 130H24z', '#F5F0E6', 3.5) + Lc('M120 120v14M120 150v20M120 190v28', '#D7CCC8', 3)
      + [[96, 112, 0.25], [82, 128, 0.45], [62, 152, 0.7], [30, 188, 1]].map(([x, y, s]) => g(x, y, s, col(0, 0, 80, 14))).join('')
      + [[144, 112, 0.25], [158, 128, 0.45], [178, 152, 0.7], [210, 188, 1]].map(([x, y, s]) => g(x, y, s, col(0, 0, 80, 14))).join('')
      + [[14, 222], [226, 230], [60, 236]].map(([x, y]) => C(x, y, 5, '#E53935', 2)).join('') + C(200, 40, 18, '#FFD54F', 3) + face(200, 38, 0.2)),
  L('tr/pamukkale/landmark-salda.v1.svg', 'ทะเลสาบซัลดาและหาดทรายขาว', 'Lake Salda and its white shore', ['lake salda', 'ทะเลสาบซัลดา', 'salda gölü', 'turkish maldives', 'มัลดีฟส์ตุรกี', 'white sand', 'หาดทรายขาว', 'turquoise lake', 'ทะเลสาบสีฟ้าคราม', 'burdur'],
    'หาทะเลสาบสีฟ้าครามที่มีหาดขาวเหมือนหิมะ', 'Find the turquoise lake with a beach as white as snow',
    // a wide turquoise lake shading to deep blue, a snow-white sandy shore with white rocks, green pine hills all round, a child paddling at the edge, a white pebble with a smile
    R(-4, -4, 248, 248, '#E1F5FE', 0, 0) + P('M-4 96c40-30 90-36 130-20s80-16 118 4v40H-4z', '#2E7D32', 3) + pine(30, 92, 0.7) + pine(196, 90, 0.7) + pine(60, 84, 0.6)
      + P('M-4 116h248v60c-60-10-180-10-248 0z', '#26C6DA', 3) + P('M-4 116h248v20c-60 10-180 10-248 0z', '#00838F', 0)
      + P('M-4 176c60-14 188-14 248 0v68H-4z', '#FFFFFF', 3.5) + Lc('M20 182c40-6 160-6 200 0', '#B2EBF2', 4)
      + kid(150, 180, '#FF8A65') + [[60, 212, 14], [92, 224, 9], [190, 218, 11]].map(([x, y, r]) => E(x, y, r, r * 0.7, '#F5F5F5', 3)).join('') + face(60, 210, 0.18)),

  // ---------- Georgia
  K('ge', 'food', 'badrijani', 'บาดริจานี มะเขือม้วนวอลนัต', 'Badrijani, aubergine rolls with walnut', ['badrijani', 'บาดริจานี', 'aubergine rolls', 'มะเขือม้วน', 'eggplant rolls', 'walnut paste', 'ซอสวอลนัต', 'pomegranate seeds', 'เมล็ดทับทิม', 'georgian starter'],
    // a long white plate with four plump rolls of fried aubergine, purple skin at the edges, a pale walnut filling peeking out, sprinkled with ruby pomegranate seeds and green herbs
    E(120, 150, 108, 42, '#FFFFFF', 3.5)
      + [[50, 144], [94, 150], [140, 150], [186, 144]].map(([x, y]) => g(x, y, 1, E(0, 0, 22, 26, '#A0522D', 3) + E(0, -2, 16, 20, '#7B1FA2', 0).replace('<ellipse', '<ellipse opacity=".5"') + P('M-14-16c10 10 18 10 28 0', '#F5E6C8', 3) + E(0, -18, 10, 5, '#F5E6C8', 2))).join('')
      + [[40, 126], [62, 132], [88, 128], [108, 136], [134, 126], [152, 134], [178, 126], [196, 132], [120, 168], [70, 166]].map(([x, y]) => C(x, y, 4, '#D81B60', 1.5)).join('')
      + [[50, 120], [146, 122], [100, 174]].map(([x, y]) => P(`M${x} ${y}l6-6 3 7z`, '#43A047', 1.5)).join('') + face(94, 156, 0.26)),
  K('ge', 'food', 'lobiani', 'โลเบียนี ขนมปังไส้ถั่ว', 'Lobiani, bread filled with beans', ['lobiani', 'โลเบียนี', 'bean bread', 'ขนมปังไส้ถั่ว', 'kidney beans', 'ถั่วแดง', 'racha lobiani', 'flatbread pie', 'georgian pastry', 'ขนมปังจอร์เจีย'],
    // a round golden flat bread pie cut into wedges, one wedge pulled out showing a thick brown-red bean filling, a little bowl of red beans beside it
    E(110, 140, 92, 70, '#E3A857', 3.5) + E(110, 136, 80, 60, '#F0C070', 0) + Lc('M110 76v120M30 136h160M54 92l112 88M54 180l112-88', '#C98E3A', 3)
      + g(186, 82, 1, P('M-36 30L0-34 36 30z', '#E3A857', 3.5) + P('M-26 22L0-22 26 22z', '#8E3B2B', 2.5) + [[-8, 10], [6, 4], [0, 16], [10, 14]].map(([x, y]) => E(x, y, 4, 3, '#B5523A', 1.5)).join(''), 20)
      + E(48, 210, 30, 14, '#FFFFFF', 3) + [[38, 204], [50, 202], [60, 206], [44, 210], [56, 212]].map(([x, y]) => E(x, y, 5, 3.5, '#B23A2A', 1.5)).join('') + face(100, 148, 0.34)),
  K('ge', 'food', 'gozinaki', 'โกซินากิ วอลนัตเคลือบน้ำผึ้ง', 'Gozinaki, walnuts in honey', ['gozinaki', 'โกซินากิ', 'honey walnuts', 'วอลนัตน้ำผึ้ง', 'walnut brittle', 'new year sweet', 'ขนมปีใหม่', 'georgian sweets', 'ขนมจอร์เจีย', 'diamond pieces'],
    // shiny amber diamond-shaped pieces of honey candy packed with walnut halves, laid on two glossy green leaves, a little honey dipper dripping
    P('M30 150c20-50 80-60 110-30-30 40-80 50-110 30z', '#66BB6A', 3) + P('M100 170c30-50 90-56 120-24-30 40-90 46-120 24z', '#43A047', 3)
      + Lc('M36 148c30-10 60-20 100-28M106 168c30-10 70-18 110-22', '#A5D6A7', 2)
      + [[82, 130], [130, 124], [106, 152], [154, 150], [178, 128]].map(([x, y]) => P(`M${x} ${y - 22}l26 22-26 22-26-22z`, '#E08A1E', 3) + E(x - 6, y - 4, 7, 5, '#8D5524', 1.5) + E(x + 7, y + 6, 6, 4, '#8D5524', 1.5) + E(x + 4, y - 10, 4, 2, '#FFE082', 0)).join('')
      + g(186, 52, 1, Lc('M0 0l34-30', '#A1673F', 5) + E(0, 0, 12, 10, '#FFB300', 3) + Lc('M-2 10c0 14-4 20-4 28', '#FFB300', 4), 0) + face(106, 156, 0.24)),
  K('ge', 'culture', 'polyphony', 'นักร้องประสานเสียงจอร์เจียสามเสียง', 'Georgian three-voice singing', ['georgian polyphony', 'ร้องประสานเสียงจอร์เจีย', 'three voices', 'สามเสียง', 'folk singing', 'เพลงพื้นเมือง', 'chokha coat', 'ชุดโชคา', 'choir', 'unesco song'],
    // three singers side by side in long chokha coats in red, black and blue, mouths wide open singing, hands on each other's shoulders, music notes floating up in three lines
    R(14, 214, 212, 10, '#A1887F', 4, 0) + [[64, '#C62828', 'o'], [120, '#37474F', 'o'], [176, '#1565C0', 'o']].map(([x, c, m]) => g(x, 140, 1,
      P('M-24 74l4-70c0-12 40-12 40 0l4 70z', c, 3.5) + R(-22, 18, 44, 6, '#FFCA28', 2, 2) + [-14, -8, 8, 14].map((dx) => Lc(`M${dx} 4v12`, '#EEEEEE', 2.5)).join('')
      + C(0, -22, 20, '#FFE0BD', 3) + P('M-20-28c4-16 36-16 40 0-10-6-30-6-40 0z', '#4E342E', 2.5) + face(0, -24, 0.34, m))).join('')
      + Lc('M86 140h12M142 140h12', INK, 3)
      + [[44, 70], [70, 50], [112, 62], [140, 40], [172, 64], [196, 44]].map(([x, y]) => C(x, y, 6, INK, 0) + Lc(`M${x + 5} ${y}v-20l8 4`, INK, 3)).join('')),

  // ---------- Tbilisi, Kazbegi and Batumi
  L('ge/tbilisi/landmark-gabriadze.v1.svg', 'หอนาฬิกาเอียงของโรงละครหุ่นกาบรีอาดเซ', 'The leaning clock tower of the Gabriadze puppet theatre', ['gabriadze theatre', 'โรงละครกาบรีอาดเซ', 'puppet theatre', 'โรงละครหุ่น', 'leaning clock tower', 'หอนาฬิกาเอียง', 'crooked tower', 'old tbilisi', 'shavteli street', 'ชาฟเตลี'],
    'หาหอคอยเบี้ยวที่ดูเหมือนจะล้มแต่ไม่ล้ม', 'Find the crooked tower that looks like it might fall but never does',
    // a skinny crooked tower leaning to one side, built from patchy bricks and tiles of every colour, a round clock face near the top, a little balcony, a door at the bottom where puppets peep out
    R(-4, 206, 248, 40, '#BCAAA4', 0, 0)
      + g(118, 206, 1, P('M-24 0l6-150h36l6 150z', '#E8D5B7', 3.5)
        + [[-16, -30, '#80CBC4'], [6, -46, '#F48FB1'], [-10, -80, '#FFCC80'], [8, -100, '#90CAF9'], [-12, -120, '#A5D6A7']].map(([x, y, c]) => R(x, y, 14, 10, c, 1, 2)).join('')
        + R(-26, -64, 52, 8, '#8D6E63', 1, 2.5) + [-20, -10, 0, 10, 20].map((x) => Lc(`M${x} -64v-10`, '#8D6E63', 2)).join('') + Lc('M-22-74h44', '#8D6E63', 2.5)
        + C(0, -126, 16, '#FFFFFF', 3) + Lc('M0-126v-10M0-126l8 4', INK, 2.5) + P('M-22-150l22-30 22 30z', '#4FC3F7', 3) + C(0, -184, 5, '#FFCA28', 2)
        + P('M-12 0v-26a12 12 0 0 1 24 0v26z', '#5D4037', 3) + C(-4, -14, 5, '#FFE0BD', 2) + C(5, -12, 4, '#F48FB1', 2), 8)
      + face(108, 136, 0.28)),
  L('ge/tbilisi/landmark-ethnomuseum.v1.svg', 'บ้านดาร์บาซีในพิพิธภัณฑ์กลางแจ้ง', 'A darbazi house at the open-air museum', ['open air museum', 'พิพิธภัณฑ์กลางแจ้ง', 'ethnographic museum', 'พิพิธภัณฑ์ชาติพันธุ์', 'darbazi', 'ดาร์บาซี', 'stepped wooden ceiling', 'เพดานไม้ซ้อนชั้น', 'turtle lake', 'old georgian house'],
    'หาบ้านที่หลังคาเป็นไม้ซ้อนกันเป็นขั้นบันได', 'Find the house whose roof is wooden logs stacked like steps',
    // a low stone farmhouse with a grassy flat roof, a pyramid of logs stacked in rings rising from it like steps with a smoke hole at the top and a puff of smoke, a carved wooden porch below
    R(-4, 200, 248, 44, '#9CCC65', 0, 0) + R(30, 122, 180, 80, '#BCAAA4', 0, 3.5)
      + [[44, 140], [80, 160], [150, 140], [184, 168], [110, 180]].map(([x, y]) => E(x, y, 10, 6, '#D7CCC8', 2)).join('')
      + P('M24 122h192l-10-12H34z', '#7CB342', 3)
      + [0, 1, 2, 3, 4].map((k) => R(70 + k * 10, 98 - k * 14, 100 - k * 20, 14, k % 2 ? '#A1673F' : '#8D5524', 2, 3)).join('') + R(110, 30, 20, 14, '#5D4037', 2, 3)
      + Lc('M120 26c-8-8 8-12 0-20', '#CFD8DC', 5)
      + R(76, 160, 88, 6, '#A1673F', 1, 2.5) + [82, 104, 136, 158].map((x) => P(`M${x - 3} 202v-36h6v36z`, '#C68B59', 2.5) + Lc(`M${x - 3} 178h6M${x - 3} 190h6`, INK, 1.5)).join('')
      + P('M108 202v-26h24v26z', '#5D4037', 3) + face(120, 140, 0.28)),
  L('ge/tbilisi/landmark-batumibotanical.v1.svg', 'สวนพฤกษศาสตร์บาตูมีบนหน้าผาริมทะเล', 'Batumi Botanical Garden on the cliffs by the sea', ['batumi botanical garden', 'สวนพฤกษศาสตร์บาตูมี', 'green cape', 'แหลมเขียว', 'mtsvane kontskhi', 'bamboo', 'ไผ่', 'black sea', 'ทะเลดำ', 'magnolia'],
    'หาดอกแมกโนเลียยิ้มบนหน้าผาเหนือทะเล', 'Find the smiling magnolia on the cliff above the sea',
    // a green cliff dropping steeply to the dark blue Black Sea, a winding garden path with a railing, tall bamboo stalks, a palm, and a big creamy-white magnolia flower in front
    R(-4, -4, 248, 248, '#E1F5FE', 0, 0) + R(-4, 150, 248, 100, '#1A5DAB', 0, 0) + Lc('M140 176c10-4 20 4 30 0M180 206c10-4 20 4 30 0', '#64B5F6', 3)
      + P('M-4 40c40-10 80 0 110 20l20 100c-30 30-80 40-134 40z', '#43A047', 3.5) + Lc('M20 80c30 6 60 20 80 40', '#FFE0B2', 6) + Lc('M30 72l2 10M60 84l2 10M86 100l2 10', INK, 2)
      + [[20, 30], [34, 24], [48, 34]].map(([x, top]) => Lc(`M${x} 150V${top}`, '#9CCC65', 6) + Lc(`M${x - 3} 110h6M${x - 3} 70h6`, INK, 2) + E(x + 8, top + 10, 8, 3, '#66BB6A', 1.5)).join('')
      + Lc('M100 160c0-30 4-50 10-70', '#8D6E63', 6) + [[-30, -8], [-10, -26], [20, -20], [30, 6]].map(([dx, dy]) => P(`M110 90q${dx / 2} ${dy - 6} ${dx} ${dy}`, 'none', 3)).join('')
      + g(170, 92, 1, [0, 72, 144, 216, 288].map((r) => g(0, 0, 1, E(0, -22, 14, 24, '#FFF8E1', 3), r)).join('') + C(0, 0, 12, '#F8BBD0', 2.5) + face(0, -2, 0.2))),
  L('ge/tbilisi/landmark-highways.v1.svg', 'ตึกกล่องซ้อนของกระทรวงทางหลวงเก่า', 'The stacked-box tower of the old Highways Ministry', ['ministry of highways', 'กระทรวงทางหลวงเก่า', 'stacked blocks', 'ตึกกล่องซ้อน', 'soviet building', 'อาคารยุคโซเวียต', 'nutsubidze', 'tbilisi architecture', 'block tower', 'forest building'],
    'หาตึกที่เหมือนเอาไม้บล็อกยาวมาวางไขว้กัน', 'Find the building that looks like long toy blocks stacked crisscross',
    // long grey concrete boxes with rows of windows stacked crisscross on top of each other on a green wooded slope, like a giant pile of toy blocks
    P('M-4 200c50-30 120-50 248-40v84H-4z', '#7CB342', 3) + tree(20, 186, 1, '#43A047') + tree(220, 160, 1, '#388E3C')
      + R(100, 70, 22, 136, '#B0BEC5', 0, 3.5) + R(150, 90, 22, 110, '#B0BEC5', 0, 3.5)
      + [[40, 150, 140], [70, 104, 150], [30, 58, 130]].map(([x, y, w]) => R(x, y, w, 26, '#ECEFF1', 2, 3.5) + Array.from({ length: Math.floor(w / 16) }, (_, k) => R(x + 6 + k * 16, y + 7, 10, 12, '#4FC3F7', 1, 2)).join('')).join('')
      + R(126, 128, 26, 48, '#CFD8DC', 0, 3) + [134, 144].map((y) => R(132, y, 14, 8, '#4FC3F7', 1, 2)).join('') + face(110, 166, 0.28)),
];

export default { places: {}, items };
