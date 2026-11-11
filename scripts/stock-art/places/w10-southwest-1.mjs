// Wave 10, southwest (1): Spain, Barcelona, Porto, Greece, Athens, Malta, Sicily, Istanbul, Cappadocia, Tbilisi, Rio, Argentina,
// Buenos Aires, Patagonia, New York, Vancouver, Banff, Yellowstone, Boston — one new idea per picture
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (es/barcelona/landmark-coca.v1.svg → es-barcelona.landmark.coca; us/yellowstone/… → p-yellowstone…)
const SCOPE = { 'us-yellowstone': 'p-yellowstone' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport): free-standing on a transparent ground
const K = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const cloud = (x, y, s = 1) => g(x, y, s, P('M-24 6c-10 0-10-14 0-14 2-10 18-12 22-4 6-8 22-4 20 6 10 0 10 12 0 12z', '#FFFFFF', 2));
const plate = (y = 196, w = 92, c = '#E3F2FD') => E(120, y, w, w * 0.22, c) + E(120, y - 4, w * 0.78, w * 0.14, '#FFFFFF', 2);

const items = [
  // ---------- Spain
  K('es', 'food', 'padron', 'พริกปาดรอนทอดโรยเกลือ', 'Pimientos de Padrón, little fried green peppers', ['pimientos de padrón', 'padron peppers', 'พริกปาดรอน', 'fried green peppers', 'พริกเขียวทอด', 'sea salt flakes', 'เกลือทะเล', 'galicia', 'กาลิเซีย', 'tapa'],
    // a round brown clay dish heaped with small wrinkled bright green peppers with curly stems, blistered and shiny from the pan, flakes of white salt on them, one cheeky pepper on the table beside the dish
    E(120, 170, 96, 40, '#B5652F') + E(120, 160, 82, 30, '#D9894E', 3) + E(120, 162, 70, 22, '#8D4A2F', 0)
      + [[78, 146, -30], [104, 136, 10], [134, 140, -12], [162, 148, 34], [96, 158, 60], [146, 160, -60], [122, 152, 90]].map(([x, y, r]) => g(x, y, 1, P('M0-26c12 0 16 12 13 28-3 14-9 20-13 20s-12-8-12-24c0-14 4-24 12-24z', '#7CB342') + E(-4, -6, 3, 10, '#AED581', 0) + Lc('M0-26c0-8 5-12 10-12', '#558B2F', 4), r)).join('')
      + [[84, 132], [118, 124], [150, 132], [108, 150], [140, 150], [70, 150]].map(([x, y]) => R(x, y, 5, 5, '#FFFFFF', 1, 1.5)).join('')
      + g(194, 208, 1, P('M-30 4c0-14 16-22 36-18 14 2 22 10 20 18-2 10-18 14-34 12-14-2-22-6-22-12z', '#8BC34A') + Lc('M26 2c8-2 12-8 12-14', '#558B2F', 4) + face(-2, 2, 0.3))
      + face(120, 178, 0.4)),

  // ---------- Barcelona
  L('es/barcelona/landmark-coca.v1.svg', 'โกกาเดซันโจอันขนมปังหวานคืนกลางฤดูร้อน', 'Coca de Sant Joan, the midsummer sweet bread', ['coca de sant joan', 'coca de sant joan', 'โกกาเดซันโจอัน', 'sant joan', 'คืนซันโจอัน', 'midsummer night', 'คืนกลางฤดูร้อน', 'candied fruit', 'ผลไม้เชื่อม', 'pine nuts', 'verbena de sant joan'], 'หาเมล็ดสนเล็กๆ ที่โรยอยู่ระหว่างผลไม้เชื่อมสีแดงเขียว', 'Find the little pine nuts sprinkled between the red and green candied fruit',
    // a long oval golden flat sweet bread glazed and topped with red cherries, green and orange candied fruit strips, pine nuts and sugar, on a wooden board; a midsummer night sky with stars and a little bonfire glow at the back
    sky('#283593') + [[30, 30], [72, 50], [196, 26], [214, 70], [150, 40], [110, 20]].map(([x, y]) => P(`M${x} ${y - 6}l2 4 4 2-4 2-2 4-2-4-4-2 4-2z`, '#FFF59D', 1.5)).join('')
      + P('M150 120c4-20 12-30 20-40 2 14 10 18 10 30 6-6 6-12 6-18 10 12 12 22 10 28z', '#FF7043', 2.5) + P('M162 120c2-10 6-16 10-20 2 8 6 12 4 20z', '#FFEB3B', 0)
      + R(-4, 120, 248, 124, '#5D4037', 0, 3) + R(14, 150, 212, 70, '#C68B59', 14, 3)
      + E(120, 180, 98, 34, '#E8A953', 3.5) + E(120, 176, 88, 26, '#F6C76B', 2)
      + [[54, 172], [94, 166], [138, 184], [176, 170], [116, 188]].map(([x, y]) => C(x, y, 8, '#E53935', 2) + C(x - 3, y - 3, 2, '#FF8A80', 0)).join('')
      + [[70, 186, 20, '#43A047'], [156, 162, -20, '#43A047'], [108, 162, 10, '#FB8C00'], [186, 186, -10, '#FB8C00'], [42, 178, 70, '#FB8C00']].map(([x, y, r, c]) => g(x, y, 1, R(-11, -4, 22, 8, c, 3, 2), r)).join('')
      + [[80, 176], [124, 172], [100, 192], [150, 192], [164, 180], [62, 162], [196, 176], [134, 160]].map(([x, y]) => E(x, y, 3, 5, '#FFF3D6', 1.5)).join('')
      + face(120, 200, 0.32)),

  // ---------- Porto
  L('pt/porto/landmark-queijo.v1.svg', 'ป้อมกัสเตลูดูเคย์ฌูบนก้อนหินกลม', 'Castelo do Queijo, the cheese castle on the rocks', ['castelo do queijo', 'กัสเตลูดูเคย์ฌู', 'forte de são francisco xavier', 'cheese castle', 'ป้อมชีส', 'little sea fort', 'ป้อมริมทะเล', 'round granite rock', 'หินแกรนิตกลม', 'avenida da boavista', 'matosinhos beach'], 'หาก้อนหินกลมเหมือนชีสที่ป้อมเล็กๆ ตั้งอยู่ข้างบน', 'Find the round rock like a cheese that the little fort sits on',
    // a squat grey stone fort with sharp pointed corner walls and a little round lookout box, sitting on a big round pale-yellow granite boulder with holes like a cheese, Atlantic waves splashing against it, a seagull-free sky with a cloud
    sky('#B3E5FC') + cloud(46, 44) + R(-4, 178, 248, 66, '#29B6F6', 0, 3)
      + E(120, 168, 92, 46, '#FFE082') + [[78, 160, 9], [112, 182, 7], [150, 158, 10], [168, 186, 6], [92, 190, 5]].map(([x, y, r]) => C(x, y, r, '#F9C74F', 2.5)).join('')
      + P('M50 126l20-22h100l20 22-20 4H70z', '#B0BEC5', 3) + P('M58 126V92l-14-8 26-6h100l26 6-14 8v34z', '#CFD8DC', 3) + Lc('M70 98h100M70 112h100', '#90A4AE', 2)
      + [64, 84, 104, 124, 144, 164].map((x) => R(x, 72, 12, 10, '#CFD8DC', 1, 2.5)).join('') + R(108, 100, 24, 26, '#5D4037', 10, 2.5)
      + g(178, 70, 1, R(-10, -6, 20, 20, '#ECEFF1', 2, 2.5) + P('M-13-6c0-14 26-14 26 0z', '#90A4AE', 2.5) + R(-3, 0, 6, 8, INK, 2, 0))
      + Lc('M-4 196c20-10 30 6 50-2M150 200c16-12 30 2 48-6', '#FFFFFF', 4) + P('M30 186c-6-14 8-24 18-14 6-10 20-6 18 6z', '#FFFFFF', 2.5) + P('M192 182c-4-12 10-20 18-10 8-6 18 2 12 12z', '#FFFFFF', 2.5)
      + face(120, 160, 0.42)),

  // ---------- Greece
  K('gr', 'food', 'pasteli', 'ปาสเตลีขนมงาน้ำผึ้งห่อใบมะนาว', 'Pasteli, sesame and honey bars on lemon leaves', ['pasteli', 'ปาสเตลี', 'sesame honey bar', 'ขนมงาน้ำผึ้ง', 'thyme honey', 'น้ำผึ้งไทม์', 'lemon leaves', 'ใบมะนาว', 'greek island sweet', 'energy bar', 'ขนมกรีกโบราณ'],
    // three glossy golden diamond-shaped bars packed with sesame seeds, each lying on a shiny green lemon leaf, a little clay pot of honey with a wooden dipper dripping, a sprig of thyme
    [[78, 160, -14], [146, 176, 10], [118, 118, -4]].map(([x, y, r]) => g(x, y, 1, P('M-46 6c4-24 30-38 54-30 20 6 38 20 38 30-10 14-40 22-60 18-18-4-32-8-32-18z', '#43A047', 3) + Lc('M-40 6c30 2 60 0 84-4', '#2E7D32', 2)
      + P('M-32 2l26-18 34 4-24 20z', '#E8A953', 3) + P('M-26 2l22-14 26 4-20 14z', '#F6C76B', 0)
      + [[-18, -2], [-10, -8], [-2, -2], [6, -8], [12, -2], [-6, 4], [2, -12], [10, 4]].map(([a, b]) => E(a, b, 2.2, 1.2, '#FFF8E1', 0)).join(''), r)).join('')
      + g(196, 112, 1, P('M-22-14c-6 10-6 30 4 40h36c10-10 10-30 4-40z', '#C9714A', 3) + E(0, -14, 24, 7, '#FFB300', 3) + Lc('M8-12l24-40', '#A1673F', 5) + Lc('M8-12l24-40', INK, 1.2) + P('M22 26c0 8 4 12 6 12s4-6 0-12z', '#FFB300', 2) + face(0, 6, 0.28))
      + g(40, 98, 1, Lc('M0 30c4-20 0-40-6-54', '#558B2F', 3) + [[-4, 16], [2, 4], [-6, -8], [-2, -18]].map(([x, y], k) => E(x + (k % 2 ? 6 : -6), y, 5, 2.5, '#7CB342', 1.5)).join(''))
      + face(118, 134, 0.3)),
  K('gr', 'food', 'bougatsa', 'บูกัตซาพายครีมแป้งบางกรอบ', 'Bougatsa, the crisp custard pie of Thessaloniki', ['bougatsa', 'บูกัตซา', 'custard pie', 'พายครีม', 'filo pastry', 'แป้งฟิโล', 'icing sugar and cinnamon', 'น้ำตาลไอซิ่งกับอบเชย', 'thessaloniki breakfast', 'เทสซาโลนิกิ', 'cream pie'],
    // a big square of golden crackly filo pastry cut into little squares, one square lifted to show the thick yellow custard inside, all dusted with white sugar and brown cinnamon, on a round plate with a small fork
    plate(196, 100) + P('M44 170l22-62h120l-10 62z', '#E8A953', 3.5) + P('M50 166l18-52h112l-8 52z', '#F6C76B', 2)
      + Lc('M96 112l-12 56M128 112l-6 56M156 112l-2 56M58 142h118', '#C9853B', 2.5)
      + [[70, 126], [100, 122], [134, 128], [160, 124], [84, 152], [118, 156], [148, 150]].map(([x, y]) => E(x, y, 6, 2, '#FFFFFF', 0) + C(x + 6, y + 4, 2, '#8D5524', 0)).join('')
      + g(176, 92, 1, P('M-22-14h40l-6 30h-40z', '#F6C76B', 3) + R(-28, 10, 40, 10, '#FFE082', 2, 2.5) + P('M-22-14l-6 34', 'none', 2.5) + E(-2, -6, 6, 2, '#FFFFFF', 0), -14)
      + g(206, 168, 1, Lc('M0-40v52', '#B0BEC5', 5) + Lc('M-6-40v-14M0-40v-14M6-40v-14', '#B0BEC5', 3), 20) + face(112, 140, 0.4)),
  K('gr', 'culture', 'lyra', 'ไลราเครตันซอสามสายกับคันชักติดกระดิ่ง', 'The Cretan lyra and its bow with little bells', ['cretan lyra', 'lyra', 'ไลราเครตัน', 'crete', 'เกาะครีต', 'three-string fiddle', 'ซอสามสาย', 'bow with bells', 'คันชักติดกระดิ่ง', 'kritika music', 'cretan dance music'],
    // a pear-shaped wooden fiddle held upright, with a flat front, two small half-moon sound holes, three strings over a little bridge and a round flat head; a curved bow across it hung with tiny round bells
    g(116, 126, 1, P('M-34 74c-14-40-10-90 14-112h40c24 22 28 72 14 112-10 20-58 20-68 0z', '#A0522D') + P('M-26 66c-10-34-6-78 12-96h28c18 18 22 62 12 96-8 14-44 14-52 0z', '#D7A86E', 3)
      + P('M-16 10c-6 6-6 14 0 18M16 10c6 6 6 14 0 18', 'none', 3.5) + R(-12, 44, 24, 6, '#5D4037', 2, 2) + R(-8, 66, 16, 8, '#5D4037', 2, 2)
      + R(-12, -64, 24, 28, '#A0522D', 3, 3) + C(0, -82, 22, '#A0522D') + C(0, -82, 12, '#D7A86E', 2.5) + [[-8, -88], [8, -88], [0, -74]].map(([x, y]) => C(x, y, 3.5, '#FFD54F', 1.5)).join('')
      + Lc('M-5-60v130M0-60v130M5-60v130', '#FFF8E1', 1.5) + face(0, -2, 0.34))
      + g(124, 134, 1, P('M-96 26c50-30 130-50 190-50', 'none', 5) + Lc('M-90 30c54-26 124-44 182-46', '#8D6E63', 2) + C(-98, 28, 5, '#5D4037', 2)
        + [-66, -40, -14, 12, 38].map((x, k) => Lc(`M${x} ${14 - k * 8}v10`, INK, 1.5) + C(x, 30 - k * 8, 6, '#FFC107', 2.5) + C(x, 32 - k * 8, 1.5, INK, 0)).join(''), -6)),

  // ---------- Athens
  L('gr/athens/landmark-kapnikarea.v1.svg', 'โบสถ์คัปนิคาเรอากลางถนนเอร์มู', 'Kapnikarea, the little old church in the middle of Ermou Street', ['kapnikarea', 'คัปนิคาเรอา', 'ermou street', 'ถนนเอร์มู', 'byzantine church', 'โบสถ์ไบแซนไทน์', 'shopping street', 'ถนนช้อปปิ้ง', 'monastiraki', 'syntagma walk'], 'หาโบสถ์อิฐเล็กๆ ที่ถนนต้องแยกเดินอ้อมสองข้าง', 'Find the little brick church that the street has to split around',
    // a small pale stone and red-brick church with a round drum and a tiled little dome, arched windows and a porch, sunk a little below a pedestrian street paved in stone, tall cream shop buildings on both sides and people walking past
    sky('#E1F5FE') + R(-4, 40, 60, 160, '#FFF3E0', 0, 3) + R(184, 30, 60, 170, '#FFE0B2', 0, 3)
      + [[6, 60], [30, 60], [6, 100], [30, 100], [6, 140], [30, 140], [196, 54], [220, 54], [196, 94], [220, 94], [196, 134], [220, 134]].map(([x, y]) => R(x, y, 14, 22, '#90CAF9', 2, 2)).join('')
      + P('M-4 200h248v44H-4z', '#D7CCC8', 3) + Lc('M20 220h40M100 232h50M180 220h40', '#BCAAA4', 2.5)
      + R(66, 130, 108, 74, '#F5DEC4', 0, 3) + [142, 158, 174, 190].map((y) => Lc(`M66 ${y}h108`, '#C9714A', 2.5)).join('')
      + R(98, 90, 44, 40, '#F5DEC4', 0, 3) + Lc('M98 106h44M98 118h44', '#C9714A', 2.5) + P('M94 92c4-30 48-30 52 0z', '#E07A4F', 3) + C(120, 62, 4, '#E07A4F', 2)
      + [80, 150].map((x) => P(`M${x} 186v-26c0-12 12-12 12 0v26z`, '#6D4C41', 2.5)).join('') + P('M108 204v-34c0-16 24-16 24 0v34z', '#5D4037', 3) + R(112, 96, 6, 14, '#5D4037', 3, 2) + R(122, 96, 6, 14, '#5D4037', 3, 2)
      + P('M60 132l60-18 60 18', 'none', 3) + kid(40, 232, '#EC407A', 1.2) + kid(206, 232, '#42A5F5', 1.2) + face(120, 148, 0.34)),

  // ---------- Malta
  K('mt', 'culture', 'arlogg', 'นาฬิกาแขวนมอลตาทรงไวโอลิน', 'The Maltese clock with its fiddle-shaped case', ['maltese clock', 'arloġġ tal-lira', 'arlogg tal-lira', 'นาฬิกามอลตา', 'pendulum wall clock', 'นาฬิกาลูกตุ้ม', 'painted clock case', 'ตัวเรือนวาดลาย', 'gilded flowers', 'ลายดอกไม้สีทอง', 'maltese craft'],
    // a tall wall clock whose case curves in and out like a fiddle, painted deep green with golden flowers and curls, a round white dial with dots and two hands at the top, a glass window low down showing a swinging brass pendulum, a little gold crest on top
    P('M120 20c18 0 22 10 22 18 34 4 40 30 40 56 0 22-26 30-26 50 0 20 22 30 22 52 0 18-24 26-58 26s-58-8-58-26c0-22 22-32 22-52 0-20-26-28-26-50 0-26 6-52 40-56 0-8 4-18 22-18z', '#2E7D32')
      + C(120, 82, 36, '#FFFDF5', 3.5) + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => C(120 + 28 * Math.sin(k * Math.PI / 6), 82 - 28 * Math.cos(k * Math.PI / 6), 2.5, INK, 0)).join('') + Lc('M120 82V60M120 82l14 8', INK, 4) + C(120, 82, 4, '#FFC107', 1.5)
      + E(120, 180, 22, 30, '#B2DFDB', 3) + Lc('M120 156v30', '#FFC107', 3) + C(120, 192, 10, '#FFC107', 2.5)
      + [[70, 140, 20], [170, 140, -20], [66, 210, 40], [174, 210, -40]].map(([x, y, r]) => g(x, y, 1, C(0, 0, 6, '#FFC107', 2) + P('M0-6c-6-10 0-18 8-16-2 6-4 10-8 16zM6 2c10-2 16 4 14 12-6-2-10-6-14-12z', '#FFD54F', 1.5), r)).join('')
      + P('M108 18c4-12 20-12 24 0z', '#FFC107', 2.5) + face(120, 130, 0.36)),

  // ---------- Sicily
  L('it/sicily/landmark-sfincione.v1.svg', 'สฟินโชเนพิซซ่าหนานุ่มของปาแลร์โม', "Sfincione, Palermo's thick spongy street pizza", ['sfincione', 'สฟินโชเน', 'sfinciuni', 'palermo street food', 'อาหารริมทางปาแลร์โม', 'thick pizza', 'พิซซ่าหนา', 'tomato and onion', 'มะเขือเทศกับหัวหอม', 'three-wheeled van', 'ape van'], 'หาเกล็ดขนมปังสีทองที่โรยอยู่บนซอสมะเขือเทศ', 'Find the golden breadcrumbs sprinkled on top of the tomato sauce',
    // a deep tray of tall fluffy pizza cut into squares, red tomato and onion sauce with golden breadcrumbs and green oregano on top, one square lifted showing its spongy side; a little three-wheeled street van with a striped awning behind
    sky('#FFF3E0') + g(170, 92, 1, P('M-46 26V-6c0-18 10-26 26-26h34c10 0 18 8 18 18v40z', '#FFCA28', 3) + R(-40, -24, 22, 18, '#B3E5FC', 3, 2.5) + C(-30, 28, 10, '#455A64', 3) + C(26, 28, 10, '#455A64', 3)
        + P('M-46-6h86l8 10H-54z', '#E53935', 2.5) + Lc('M-34-6l-4 10M-14-6v10M6-6l4 10M26-6l6 10', '#FFFFFF', 3))
      + R(-4, 150, 248, 94, '#A1887F', 0, 3) + R(22, 136, 196, 70, '#78909C', 6, 3.5) + R(30, 140, 180, 58, '#F6C76B', 2, 2.5) + R(30, 140, 180, 20, '#D84315', 0, 2.5)
      + Lc('M90 140v58M150 140v58', '#C9853B', 3)
      + [[44, 146], [70, 152], [104, 146], [130, 154], [160, 146], [188, 152], [56, 154], [176, 148]].map(([x, y]) => E(x, y, 6, 3, '#FFF3D6', 1.5)).join('')
      + [[50, 150], [118, 150], [196, 146]].map(([x, y]) => C(x, y, 2, '#2E7D32', 0)).join('') + [[84, 150], [142, 144], [168, 154]].map(([x, y]) => C(x, y, 3, '#FFB74D', 0)).join('')
      + g(120, 108, 1, R(-26, -8, 52, 40, '#F6C76B', 4, 3) + R(-26, -10, 52, 12, '#D84315', 3, 2.5) + [[-14, -6], [2, -4], [14, -6]].map(([x, y]) => E(x, y, 5, 2, '#FFF3D6', 0)).join('') + C(-12, 14, 3, '#E8A953', 0) + C(8, 22, 3, '#E8A953', 0) + face(0, 12, 0.3))),

  // ---------- Istanbul
  L('tr/istanbul/landmark-macun.v1.svg', 'มาจุนลูกอมหลากสีพันไม้จากถาดกลม', 'Macun, rainbow Turkish taffy twirled onto a stick', ['macun', 'mesir macunu', 'มาจุน', 'turkish taffy', 'ลูกอมตุรกี', 'rainbow candy', 'ลูกอมสีรุ้ง', 'twirled on a stick', 'พันไม้', 'street sweet seller', 'eminönü square'], 'หาถาดกลมที่แบ่งเป็นช่องสีต่างๆ เหมือนวงล้อ', 'Find the round tray split into coloured slices like a wheel',
    // a round metal tray on a little cart, divided into wedges of soft sticky candy in red, yellow, green, orange and pink round a white middle; a lollipop stick wound with stripes of every colour held above it, a lemon squeeze dripping on top
    sky('#FFF3E0') + R(-4, 190, 248, 54, '#BCAAA4', 0, 3) + Lc('M60 196l-10 40M180 196l10 40', '#6D4C41', 6) + C(50, 232, 10, '#455A64', 3) + C(190, 232, 10, '#455A64', 3)
      + E(120, 176, 98, 26, '#90A4AE', 3.5) + E(120, 170, 90, 22, '#CFD8DC', 3)
      + ['#E53935', '#FFCA28', '#66BB6A', '#FB8C00', '#EC407A', '#AB47BC'].map((c, k) => { const a = k * Math.PI / 3, b = a + Math.PI / 3; return P(`M120 170L${(120 + 84 * Math.cos(a)).toFixed(1)} ${(170 + 20 * Math.sin(a)).toFixed(1)}A84 20 0 0 1 ${(120 + 84 * Math.cos(b)).toFixed(1)} ${(170 + 20 * Math.sin(b)).toFixed(1)}z`, c, 2); }).join('') + E(120, 170, 18, 5, '#FFFFFF', 2)
      + Lc('M120 150V40', '#D7A86E', 5) + Lc('M120 150V40', INK, 1.2)
      + g(120, 74, 1, E(0, 0, 26, 32, '#FFFFFF', 3.5) + ['#E53935', '#FFCA28', '#66BB6A', '#EC407A', '#FB8C00'].map((c, k) => Lc(`M-24 ${-22 + k * 11}c16 8 32 8 48-2`, c, 6)).join('') + face(0, 2, 0.3))
      + g(170, 40, 1, E(0, 0, 16, 11, '#FFEB3B', 2.5) + Lc('M-10 14v8', '#FFEB3B', 3), -20)),

  // ---------- Cappadocia
  L('tr/cappadocia/landmark-gozleme.v1.svg', 'เกิซเลเมแป้งบางพับไส้ผักบนกระทะโดม', 'Gözleme, thin folded flatbread on the dome griddle', ['gözleme', 'gozleme', 'เกิซเลเม', 'saç griddle', 'กระทะโดม', 'yufka dough', 'แป้งยุฟกา', 'long rolling pin', 'oklava', 'ไม้คลึงแป้งยาว', 'village breakfast'], 'หาไม้คลึงแป้งยาวบางๆ ที่วางข้างแผ่นแป้งกลม', 'Find the long thin rolling pin lying beside the round sheet of dough',
    // a round black dome griddle over glowing embers with a folded half-moon flatbread on it, green spinach and white cheese peeking out, brown toasted spots; a round low wooden table with a paper-thin sheet of dough and a very long thin rolling pin; a fairy chimney far behind
    sky('#FFE0B2') + P('M190 120v-44c0-14 20-14 20 0v44z', '#F5DEB3', 3) + P('M186 78c4-18 24-18 28 0z', '#A1673F', 2.5) + R(-4, 118, 248, 126, '#D7B98E', 0, 3)
      + g(74, 176, 1, E(0, 12, 64, 20, '#8D6E63', 3) + E(0, 0, 64, 20, '#C68B59', 3) + E(0, -2, 52, 14, '#FFF3D6', 2) + Lc('M-60 28l100-34', '#D7A86E', 6) + Lc('M-60 28l100-34', INK, 1.5))
      + g(164, 182, 1, [-20, -6, 8, 22].map((x) => P(`M${x} 30c-4-10 4-12 0-20`, '#FF7043', 2)).join('') + E(0, 34, 40, 8, '#6D4C41', 2.5) + P('M-56 18c10-36 102-36 112 0z', '#37474F', 3.5)
        + P('M-36 4c0-22 72-22 72 0z', '#F3C77B', 3) + Lc('M-34 4h68', '#7CB342', 4) + [[-18, -8], [4, -12], [20, -6]].map(([x, y]) => E(x, y, 4, 3, '#B5652F', 0)).join('') + C(-6, 2, 3, '#FFFFFF', 0) + C(14, 2, 3, '#FFFFFF', 0) + face(0, -4, 0.28))),
  L('tr/cappadocia/landmark-pastirma.v1.svg', 'พาสเติร์มาเนื้อตากแห้งเคลือบเครื่องเทศของไกเซรี', 'Pastırma, the spice-coated dried beef of Kayseri', ['pastırma', 'pastirma', 'พาสเติร์มา', 'kayseri', 'ไกเซรี', 'çemen spice paste', 'เครื่องเทศเชเมน', 'dried beef', 'เนื้อตากแห้ง', 'cured meat shop', 'sucuk'], 'หาเนื้อแผ่นยาวที่เคลือบเครื่องเทศสีแดงแขวนอยู่หน้าร้าน', 'Find the long flat meat coated in red spice hanging at the shop front',
    // a shop front with a striped awning, long flat slabs of beef coated in thick red spice paste hanging from hooks on a rail, below a wooden board with thin translucent pink slices fanned out and a knife-free chopping board
    sky('#FFF8E1') + R(14, 30, 212, 24, '#C62828', 0, 3) + [14, 56, 98, 140, 182].map((x) => P(`M${x} 54h42l-6 12h-30z`, '#FFFFFF', 2.5)).join('') + Lc('M24 78h192', '#8D6E63', 5)
      + [[40, 74], [82, 80], [124, 72], [166, 78], [206, 70]].map(([x, h]) => Lc(`M${x} 78v8`, INK, 2) + R(x - 12, 86, 24, h, '#B23A1E', 6, 3) + R(x - 6, 92, 8, h - 14, '#D84315', 3, 0)).join('')
      + R(-4, 184, 248, 60, '#8D6E63', 0, 3) + R(30, 176, 180, 30, '#C68B59', 10, 3)
      + [0, 1, 2, 3, 4].map((k) => g(70 + k * 24, 190, 1, E(0, 0, 18, 9, '#F48FB1', 2) + P('M-18 0c0-6 8-9 18-9s18 3 18 9', 'none', 3).replace('fill="none"', 'fill="none" stroke="#B23A1E"'), -10 + k * 4)).join('')
      + face(124, 116, 0.32)),
  L('tr/cappadocia/landmark-tahinpekmez.v1.svg', 'ทาฮินกับเปกเมซน้ำเชื่อมองุ่นข้นของคัปปาโดเกีย', 'Tahin-pekmez, sesame paste swirled with thick grape syrup', ['tahin pekmez', 'tahin-pekmez', 'ทาฮินเปกเมซ', 'pekmez', 'เปกเมซ', 'grape molasses', 'น้ำเชื่อมองุ่นข้น', 'tahini', 'งาบด', 'cappadocian grapes', 'องุ่นคัปปาโดเกีย'], 'หาลายวนสีน้ำตาลเข้มกับสีครีมในถ้วย', 'Find the dark brown and cream swirl in the little bowl',
    // a small round bowl of creamy tahini with a dark brown grape-syrup swirl through it, a piece of bread dipping in, a bunch of purple grapes and a little jar of syrup beside it, grapes drying on a flat cave-house roof in the background
    sky('#FFE0B2') + R(-4, 78, 248, 30, '#F5DEB3', 0, 3) + [[30, 82], [70, 86], [168, 82], [208, 86]].map(([x, y]) => [0, 1, 2].map((k) => C(x + k * 8, y + (k % 2) * 4, 4, '#7B1FA2', 1.5)).join('')).join('')
      + R(-4, 108, 248, 136, '#C8A27A', 0, 3)
      + E(112, 196, 66, 22, '#5C6BC0', 3) + P('M46 168c0 36 132 36 132 0z', '#5C6BC0', 3.5) + E(112, 168, 66, 18, '#FFF3D6', 3)
      + P('M70 168c10-12 40-12 50-2s34 10 40 0c-6 14-36 18-48 8s-34-10-42-6z', '#4E342E', 0) + P('M90 172c8 6 26 6 34-2', 'none', 3).replace('fill="none"', 'fill="none" stroke="#4E342E"')
      + g(166, 140, 1, P('M-18 10c-6-20 6-34 22-34 16 2 22 14 18 30z', '#E8A953', 3) + E(2, -16, 8, 3, '#F6C76B', 0), 30)
      + g(196, 196, 1, [[0, -20], [-8, -10], [8, -10], [-12, 0], [0, 0], [12, 0], [-6, 10], [6, 10], [0, 20]].map(([x, y]) => C(x, y, 7, '#8E24AA', 2)).join('') + Lc('M0-28v-10', '#6D4C41', 3) + P('M2-34c10-8 22-2 20 6-8 2-16-2-20-6z', '#7CB342', 2))
      + g(36, 186, 1, R(-14, -18, 28, 36, '#4E342E', 6, 3) + R(-16, -26, 32, 10, '#C9714A', 3, 2.5) + E(-4, -4, 3, 8, '#8D6E63', 0))
      + face(112, 196, 0.36)),

  // ---------- Tbilisi
  L('ge/tbilisi/landmark-weddingpalace.v1.svg', 'พระราชวังพิธีทบิลิซีหอโค้งสีขาว', "Tbilisi's Ceremonial Palace and its curling white tower", ['ceremonial palace', 'wedding palace', 'พระราชวังพิธี', 'วังแต่งงาน', 'tbilisi sea', 'curved white tower', 'หอคอยโค้งสีขาว', 'stained glass windows', 'กระจกสี', 'soviet modernism', 'avlabari road'], 'หาหอคอยสีขาวที่โค้งขึ้นไปเหมือนเปลวเทียน', 'Find the white tower that curls up like a candle flame',
    // a white building of a round hall with a tall tower rising from it in two curved shell-like ribs that bend up and away like a flame, a long strip of coloured glass between the ribs, steps, a lawn and pine trees
    sky('#E3F2FD') + cloud(190, 40, 0.9) + R(-4, 196, 248, 48, '#9CCC65', 0, 3)
      + P('M40 196v-50c0-24 160-24 160 0v50z', '#FAFAFA', 3.5) + [60, 90, 150, 180].map((x) => R(x - 6, 160, 12, 30, '#90CAF9', 5, 2)).join('') + P('M96 196v-26h48v26z', '#B0BEC5', 3)
      + P('M100 150c-6-50 0-100 30-132 14 30 20 80 6 132z', '#FFFFFF', 3.5) + P('M110 150c0-40 6-80 20-110 6 30 8 70 0 110z', '#F48FB1', 2.5)
      + [[116, 120, '#FFEB3B'], [122, 96, '#4FC3F7'], [126, 72, '#81C784']].map(([x, y, c]) => R(x - 6, y, 12, 18, c, 2, 1.5)).join('')
      + P('M136 150c18-40 26-90 6-128 30 26 38 90 10 128z', '#ECEFF1', 3.5)
      + Lc('M80 196l-10 16h100l-10-16', '#BDBDBD', 3) + [20, 222].map((x) => g(x, 200, 1, Lc('M0 0v-16', '#6D4C41', 4) + P('M-14-14l14-34 14 34z', '#2E7D32', 2.5))).join('') + face(120, 176, 0.3)),

  // ---------- Rio de Janeiro
  L('br/rio/landmark-gavea.v1.svg', 'เปดราดากาเวอาภูเขาหน้าคน', 'Pedra da Gávea, the mountain with a giant face', ['pedra da gávea', 'pedra da gavea', 'เปดราดากาเวอา', 'face in the rock', 'ภูเขาหน้าคน', 'tijuca national park', 'อุทยานชีจูกา', 'barra da tijuca', 'บาร์ราดาชีจูกา', 'granite mountain'], 'หาตา จมูก และปากที่ลมกับฝนแกะไว้บนหน้าผา', 'Find the eyes, nose and mouth that wind and rain carved on the cliff',
    // a huge flat-topped grey granite mountain rising out of green rainforest, its cliff side worn into a giant face with brow, eyes, a long nose and a mouth line, the green forest at its foot and a sandy beach with the blue sea in front
    sky('#B3E5FC') + cloud(40, 40, 0.9) + P('M18 180c6-60 20-120 50-130h110c22 20 36 80 40 130z', '#B0BEC5', 3.5) + P('M64 52h118l-8-10H72z', '#81C784', 3)
      + P('M86 88c10-8 22-8 30 0M136 88c10-8 22-8 30 0', 'none', 4) + E(102, 98, 8, 7, '#78909C', 2.5) + E(150, 98, 8, 7, '#78909C', 2.5)
      + P('M126 92c-4 18-8 30-2 38 6 4 12 2 14-2', '#CFD8DC', 3) + Lc('M106 146c12 8 30 8 42 0', '#78909C', 4) + E(84, 120, 10, 6, '#FF8FA3', 0) + E(170, 120, 10, 6, '#FF8FA3', 0)
      + [[22, 176], [52, 168], [84, 178], [118, 170], [150, 178], [186, 168], [218, 176]].map(([x, y]) => C(x, y, 20, '#43A047', 2.5)).join('')
      + P('M-4 192h248v16H-4z', '#FFE0A3', 3) + R(-4, 208, 248, 36, '#29B6F6', 0, 3) + Lc('M20 222c14-6 24 6 38 0M150 228c14-6 24 6 38 0', '#FFFFFF', 3)),

  // ---------- Argentina
  K('ar', 'food', 'pastelitos', 'ปาสเตลิโตสขนมทอดรูปดอกไม้ไส้ควินซ์', 'Pastelitos criollos, flower-shaped pastries with quince', ['pastelitos', 'pastelitos criollos', 'ปาสเตลิโตส', 'quince paste', 'membrillo', 'แยมควินซ์', 'flower-shaped pastry', 'ขนมรูปดอกไม้', '25 de mayo', 'วันชาติอาร์เจนตินา', 'fried puff pastry'],
    // two golden fried pastries made of stacked square layers turned into a star-flower shape, glossy with syrup and dotted with coloured sugar sprinkles, dark red quince jam peeking out of the middle, on a white plate with a little dish of syrup
    plate(200, 98) + [[86, 150, 0], [156, 158, 20]].map(([x, y, r]) => g(x, y, 1, R(-34, -34, 68, 68, '#F6C76B', 10, 3.5) + g(0, 0, 1, R(-30, -30, 60, 60, '#E8A953', 10, 3), 45) + R(-22, -22, 44, 44, '#FFD580', 8, 2.5)
      + C(0, 0, 12, '#8E1B2E', 2.5) + E(-3, -4, 4, 2, '#C2185B', 0) + [[-18, -10, '#E91E63'], [14, -16, '#42A5F5'], [16, 14, '#FFEB3B'], [-12, 18, '#66BB6A'], [-24, 6, '#42A5F5'], [4, -24, '#FFEB3B']].map(([a, b, c]) => C(a, b, 2.5, c, 0)).join(''), r)).join('')
      + g(190, 104, 1, E(0, 6, 22, 10, '#FFFFFF', 2.5) + E(0, 4, 16, 6, '#FFB300', 0))
      + face(86, 186, 0.32)),

  // ---------- Buenos Aires
  L('ar/buenosaires/landmark-sifones.v1.svg', 'ขวดโซดาไซฟอนแก้วสีในตลาดของเก่าซานเตลโม', 'Coloured soda siphons at the San Telmo antiques fair', ['soda siphon', 'sifón', 'sifones', 'ขวดโซดาไซฟอน', 'plaza dorrego', 'พลาซาดอร์เรโก', 'san telmo antiques fair', 'ตลาดของเก่าซานเตลโม', 'old glass bottles', 'ขวดแก้วเก่า', 'feria de san pedro telmo'], 'หาขวดที่กำลังพ่นฟองโซดาเป็นสายโค้ง', 'Find the bottle squirting a curving stream of fizzy water',
    // a row of tall glass siphon bottles in blue, green and amber, each with a shiny metal head, a lever and a spout, on a table with a striped cloth; one is squirting a fizzy arc into a small glass; an awning above
    sky('#FFF8E1') + R(-4, 20, 248, 22, '#1E88E5', 0, 3) + [-4, 40, 84, 128, 172, 216].map((x) => P(`M${x} 42h22v10c-4 6-18 6-22 0z`, '#FFFFFF', 2)).join('')
      + R(-4, 176, 248, 68, '#C62828', 0, 3) + [10, 50, 90, 130, 170, 210].map((x) => R(x, 176, 18, 68, '#FFFFFF', 0, 0)).join('') + Lc('M-4 176h248', INK, 3)
      + [[44, '#42A5F5'], [92, '#66BB6A'], [140, '#FFB300']].map(([x, c], k) => g(x, 174, 1, P('M-18 0v-70c0-10 36-10 36 0V0z', c, 3) + E(-6, -40, 4, 20, '#FFFFFF', 0) + Lc('M-12-14h24M-12-28h24', INK, 1.2)
        + R(-12, -96, 24, 26, '#CFD8DC', 6, 3) + P('M-8-96l-4-14h26l-6 14z', '#B0BEC5', 2.5) + P('M12-104h18l2 6H12z', '#B0BEC5', 2.5) + face(0, -46, 0.28, k === 1 ? 'o' : 'smile'))).join('')
      + g(190, 160, 1, P('M-12 14l-4-30h32l-4 30z', '#E1F5FE', 3) + R(-12, -6, 24, 18, '#B3E5FC', 0, 0))
      + Lc('M172 70c20-4 26 30 18 72', '#81D4FA', 5) + [[178, 72], [190, 92], [192, 116], [188, 136]].map(([x, y]) => C(x, y, 3, '#FFFFFF', 1.5)).join('')),

  // ---------- Patagonia
  L('ar/patagonia/landmark-albatross.v1.svg', 'นกอัลบาทรอสคิ้วดำเหนือช่องแคบบีเกิล', 'A black-browed albatross over the Beagle Channel', ['black-browed albatross', 'albatross', 'นกอัลบาทรอส', 'beagle channel', 'ช่องแคบบีเกิล', 'ushuaia', 'อูซัวยา', 'tierra del fuego', 'เตียร์ราเดลฟวยโก', 'seabird gliding'], 'หาเส้นคิ้วสีดำเหนือตาของนกตัวใหญ่', 'Find the black eyebrow stripe above the big bird\'s eye',
    // a big white seabird gliding with very long straight dark-grey wings stretched wide, a pale yellow hooked beak with an orange tip, a dark brow stripe over the eye, grey sea waves and snowy jagged mountains behind
    sky('#CFD8DC') + P('M-4 150l30-40 24 22 30-46 34 40 26-30 40 44 30-26 34 36z', '#90A4AE', 3) + P('M74 86l10 14-10 6-8-6zM176 78l10 14-12 4-6-6z', '#FFFFFF', 2) + R(-4, 150, 248, 94, '#546E7A', 0, 3)
      + Lc('M10 186c16-8 28 8 44 0M160 204c16-8 28 8 44 0M70 222c16-8 28 8 44 0', '#B0BEC5', 3)
      + P('M14 96c40-14 76-6 92 10l-12 10C74 104 44 104 14 96z', '#37474F', 3) + P('M226 96c-40-14-76-6-92 10l12 10c20-12 50-12 80-20z', '#37474F', 3)
      + E(120, 112, 40, 18, '#FFFFFF', 3.5) + P('M156 108l14-4-14 10z', '#37474F', 2.5) + C(92, 104, 15, '#FFFFFF', 3) + P('M78 106c-14 0-24 4-28 8 8 2 18 0 28-2z', '#FFE082', 2.5) + C(52, 113, 2.5, '#FB8C00', 0)
      + C(90, 101, 2.5, INK, 0) + Lc('M84 96c4-3 10-3 14 0', INK, 3) + E(98, 108, 4, 2.5, '#FF8FA3', 0)),

  // ---------- New York
  L('us/newyork/landmark-littleisland.v1.svg', 'ลิตเติลไอแลนด์สวนบนเสาทรงทิวลิปเหนือแม่น้ำฮัดสัน', 'Little Island, the park on tulip pots over the Hudson', ['little island', 'ลิตเติลไอแลนด์', 'pier 55', 'พีร์ 55', 'hudson river park', 'แม่น้ำฮัดสัน', 'tulip-shaped pillars', 'เสาทรงทิวลิป', 'meatpacking district', 'floating park'], 'หาเสาคอนกรีตที่บานออกเหมือนดอกทิวลิปใต้สวน', 'Find the concrete pillars that open out like tulips under the park',
    // a wavy green park lifted over the river on a cluster of pale concrete pillars that each spread out at the top like a tulip cup, trees and grass and a small lawn amphitheatre on top, a walkway bridge from the shore, river water below
    sky('#BBDEFB') + R(-4, 160, 248, 84, '#4FC3F7', 0, 3) + Lc('M20 210c14-6 24 6 38 0M170 224c14-6 24 6 38 0', '#FFFFFF', 3)
      + [[46, 140], [74, 148], [102, 136], [130, 146], [158, 138], [186, 144]].map(([x, y]) => P(`M${x - 4} 200v-${200 - y - 16}l-12-16h32l-12 16v${200 - y - 16}z`, '#ECEFF1', 2.5) + E(x, 200, 8, 3, '#81D4FA', 0)).join('')
      + P('M24 132c20-24 40-30 70-22 20-14 50-18 74-6 22-6 40 0 50 18v10H24z', '#7CB342', 3.5) + P('M24 132h194l-6 6H30z', '#BDBDBD', 2.5)
      + [[56, 104], [104, 92], [170, 96], [196, 110]].map(([x, y]) => Lc(`M${x} ${y + 18}v-8`, '#6D4C41', 4) + C(x, y, 13, '#388E3C', 2.5)).join('') + P('M120 128c0-14 30-14 30 0', 'none', 2.5)
      + P('M218 128h30', 'none', 4) + R(216, 124, 30, 8, '#BDBDBD', 2, 2.5) + kid(132, 118, '#FFCA28', 0.8) + face(120, 140, 0.24)),

  // ---------- Vancouver
  L('ca/vancouver/landmark-hollowtree.v1.svg', 'ต้นไม้กลวงยักษ์ในสแตนลีย์พาร์ก', 'The giant Hollow Tree in Stanley Park', ['hollow tree', 'ต้นไม้กลวง', 'stanley park', 'สแตนลีย์พาร์ก', 'western red cedar', 'ต้นซีดาร์แดง', 'giant stump', 'ตอไม้ยักษ์', 'old-growth forest', 'ป่าดึกดำบรรพ์'], 'หาเด็กสองคนที่ยืนอยู่ข้างในลำต้นไม้กลวง', 'Find the two children standing inside the hollow trunk',
    // a huge broken-topped red cedar stump, ridged reddish-grey bark, with a tall arched hollow opening big enough for two children standing inside; ferns at its foot, tall dark green trees behind
    sky('#C8E6C9') + [[20, 60], [60, 40], [190, 46], [226, 70]].map(([x, y]) => P(`M${x} 200V${y + 40}l-18 10 18-50 18 50-18-10`, '#2E7D32', 2.5)).join('') + R(-4, 196, 248, 48, '#6D8B4E', 0, 3)
      + P('M50 210c6-60 4-120 20-160l14 10 10-18 14 14 16-20 12 16 14-10 14 14c14 46 12 104 20 154z', '#8D6E63', 3.5)
      + Lc('M70 80c-4 40-2 80-6 120M178 84c4 40 2 80 6 120M84 60c2 30 0 50 2 70M164 60c-2 30 0 50-2 70', '#6D4C41', 3)
      + P('M88 210v-82c0-40 64-40 64 0v82z', '#3E2723', 3) + kid(108, 206, '#E53935', 1.3) + kid(134, 206, '#29B6F6', 1.3)
      + [[30, 214], [204, 212], [72, 220]].map(([x, y]) => [-40, -10, 20].map((r) => g(x, y, 1, P('M0 0c4-12 16-18 26-16-4 10-16 16-26 16z', '#43A047', 2), r - 70)).join('')).join('') + face(120, 92, 0.36)),

  // ---------- Banff
  L('ca/banff/landmark-bluebird.v1.svg', 'นกบลูเบิร์ดภูเขาบนเสารั้วกลางทุ่งดอกไม้', 'A mountain bluebird on a fence post in the meadow', ['mountain bluebird', 'นกบลูเบิร์ดภูเขา', 'bow valley meadow', 'ทุ่งหญ้าหุบเขาโบว์', 'sky-blue bird', 'นกสีฟ้า', 'wildflowers', 'ดอกไม้ป่า', 'indian paintbrush', 'birdwatching'], 'หานกสีฟ้าสดที่เกาะอยู่บนหัวเสารั้วไม้', 'Find the bright sky-blue bird sitting on top of the wooden post',
    // a round sky-blue bird with a paler belly perched on top of a grey weathered wooden fence post, red paintbrush flowers and purple and yellow wildflowers in green grass, snowy grey peaks behind
    sky('#E1F5FE') + P('M-4 130l40-60 30 34 36-56 40 50 30-28 40 60z', '#B0BEC5', 3) + P('M100 48l12 16-10 6-10-8zM36 70l10 14-10 4-8-6z', '#FFFFFF', 2) + R(-4, 130, 248, 114, '#9CCC65', 0, 3)
      + R(104, 126, 34, 110, '#A1887F', 4, 3.5) + Lc('M112 140v80M128 150v70', '#8D6E63', 2.5) + Lc('M-4 168h108M138 168h110', '#A1887F', 6) + Lc('M-4 168h108M138 168h110', INK, 1.2)
      + [[28, 210, '#E53935'], [60, 196, '#AB47BC'], [176, 204, '#FFCA28'], [210, 190, '#E53935'], [86, 224, '#FFCA28'], [160, 228, '#AB47BC']].map(([x, y, c]) => Lc(`M${x} ${y + 18}v-18`, '#558B2F', 3) + E(x, y - 4, 6, 9, c, 2)).join('')
      + g(122, 100, 1, E(0, 0, 32, 24, '#42A5F5', 3.5) + E(4, 8, 18, 12, '#BBDEFB', 0) + P('M-30-4l-24 8 22 6z', '#1E88E5', 3) + P('M-10-8c10-8 26-4 30 6-10 4-22 2-30-6z', '#1976D2', 2.5) + P('M30-6l12 3-12 4z', INK, 1.5) + Lc('M-6 22v8M8 22v8', INK, 3) + face(10, -6, 0.3, 'none'))),

  // ---------- Yellowstone
  L('us/yellowstone/landmark-fishingcone.v1.svg', 'ฟิชชิงโคนกรวยร้อนในทะเลสาบที่คนเคยต้มปลาจากเบ็ด', 'Fishing Cone, where anglers once cooked fish on the hook', ['fishing cone', 'ฟิชชิงโคน', 'west thumb geyser basin', 'เวสต์ทัมบ์', 'yellowstone lake', 'ทะเลสาบเยลโลว์สโตน', 'cook on the hook', 'ต้มปลาจากเบ็ด', 'lakeshore cone', 'old angler story'], 'หากรวยหินกลางน้ำที่มีไอร้อนพวยขึ้นมาตรงปลายเบ็ด', 'Find the stone cone in the water with hot steam rising round the fishing hook',
    // a round knobbly grey-white stone cone sticking out of the blue lake near the shore, a steaming hot blue pool in its top; an old-time fisherman in a hat on the boardwalk dangling a fish on his line into the steam, pine-covered hills behind
    sky('#E3F2FD') + P('M-4 110c40-20 80-24 120-10 40-16 90-14 128 6v20H-4z', '#558B2F', 3) + R(-4, 124, 248, 120, '#4FC3F7', 0, 3) + Lc('M20 200c14-6 24 6 38 0M160 222c14-6 24 6 38 0', '#FFFFFF', 3)
      + P('M90 196c6-30 18-52 40-52s34 22 40 52c-26 10-54 10-80 0z', '#ECEFF1', 3.5) + [[104, 182], [150, 176], [126, 190], [116, 164]].map(([x, y]) => C(x, y, 4, '#CFD8DC', 1.5)).join('') + E(130, 148, 18, 6, '#29B6F6', 3)
      + P('M120 140c-8-12 6-18 2-30M138 138c-8-12 6-18 2-30', 'none', 3).replace('fill="none"', 'fill="none" stroke="#FFFFFF"') + face(130, 172, 0.34)
      + R(-4, 140, 70, 10, '#A1887F', 2, 3) + Lc('M10 150v40M50 150v40', '#8D6E63', 4)
      + g(36, 118, 1, C(0, -10, 9, '#FFE0BD', 2) + P('M-12-16h24l-4-8h-16z', '#6D4C41', 2) + R(-18, -18, 36, 4, '#6D4C41', 2, 2) + P('M-10 0v20h20V0z', '#3949AB', 2) + face(0, -10, 0.22))
      + Lc('M46 116l60-40', '#6D4C41', 3) + Lc('M106 76c14 10 18 40 18 64', INK, 1.5) + g(124, 130, 1, P('M0-8c8 0 10 8 0 14-10-6-8-14 0-14z', '#FF8A65', 2) + P('M-4 4l4 8 4-8z', '#FF8A65', 1.5))),

  // ---------- Boston
  L('us/boston/landmark-terrier.v1.svg', 'สุนัขบอสตันเทอร์เรียร์ข้างโคมแก๊สบนทางเท้าอิฐ', 'A Boston terrier by a gas lamp on the brick sidewalk', ['boston terrier', 'บอสตันเทอร์เรียร์', 'tuxedo dog', 'หมาลายทักซิโด้', 'american gentleman', 'brick sidewalk', 'ทางเท้าอิฐ', 'gas lamp', 'โคมแก๊ส', 'state dog of massachusetts'], 'หาหูตั้งใหญ่เหมือนปีกค้างคาวของสุนัขตัวเล็ก', 'Find the little dog\'s big upright ears like bat wings',
    // a small sturdy black-and-white dog sitting up proudly: black head with a white stripe down the middle, huge upright pointed ears, big round eyes, a white chest like a shirt front and white paws; an old black gas lamp post and red brick paving with a brick house front behind
    sky('#FFE0B2') + R(-4, -4, 248, 170, '#C0573E', 0, 0) + Array.from({ length: 6 }, (_, k) => Lc(`M-4 ${18 + k * 26}h248`, '#A1452F', 2)).join('') + R(150, 30, 60, 70, '#ECEFF1', 2, 3) + Lc('M180 30v70M150 64h60', '#FFFFFF', 3)
      + R(-4, 166, 248, 78, '#B5523A', 0, 3) + Array.from({ length: 5 }, (_, k) => Lc(`M-4 ${182 + k * 16}h248`, '#8D3B28', 2)).join('')
      + R(34, 60, 8, 150, '#263238', 2, 2.5) + P('M24 60l14-26 14 26z', '#263238', 2.5) + R(26, 34, 24, 10, '#FFF59D', 2, 2.5) + E(38, 212, 14, 5, '#263238', 2.5)
      + g(130, 150, 1, E(0, 40, 40, 34, '#263238', 3.5) + E(0, 30, 20, 30, '#FFFFFF', 0) + E(-22, 72, 12, 7, '#FFFFFF', 3) + E(22, 72, 12, 7, '#FFFFFF', 3)
        + P('M-30-30l-14-46 30 26zM30-30l14-46-30 26z', '#263238', 3.5) + P('M-28-36l-8-28 16 16zM28-36l8-28-16 16z', '#F48FB1', 0)
        + C(0, -18, 34, '#263238', 3.5) + P('M-6-52h12l4 46H-10z', '#FFFFFF', 0) + E(0, -2, 16, 12, '#FFFFFF', 2)
        + C(-14, -20, 8, '#FFFFFF', 2) + C(14, -20, 8, '#FFFFFF', 2) + C(-13, -19, 5, INK, 0) + C(15, -19, 5, INK, 0) + C(-11, -21, 1.5, '#FFFFFF', 0) + C(17, -21, 1.5, '#FFFFFF', 0)
        + E(0, -6, 6, 4, INK, 0) + P('M-6 2q6 6 12 0', 'none', 2.5) + E(-24, -4, 6, 4, '#FF8FA3', 0) + E(24, -4, 6, 4, '#FF8FA3', 0))),
  L('us/boston/landmark-steamingkettle.v1.svg', 'กาน้ำทองแดงยักษ์พ่นไอน้ำที่กัฟเวิร์นเมนต์เซ็นเตอร์', 'The giant steaming kettle sign at Government Center', ['steaming kettle', 'กาน้ำพ่นไอ', 'giant copper kettle', 'กาน้ำทองแดงยักษ์', 'government center', 'กัฟเวิร์นเมนต์เซ็นเตอร์', 'court street', 'old shop sign', 'ป้ายร้านเก่า', 'scollay square'], 'หาไอน้ำที่พวยพุ่งออกจากปากกาน้ำยักษ์', 'Find the steam puffing out of the giant kettle\'s spout',
    // a huge shiny copper kettle with a curved handle and a long spout hanging from an iron bracket on the corner of an old red-brick building, white steam really puffing out of its spout, a doorway below and a little person looking up
    sky('#E1F5FE') + R(-4, 40, 140, 204, '#C0573E', 0, 3) + Array.from({ length: 7 }, (_, k) => Lc(`M-4 ${64 + k * 26}h140`, '#A1452F', 2)).join('') + [[14, 70], [70, 70], [14, 130], [70, 130]].map(([x, y]) => R(x, y, 34, 40, '#90CAF9', 2, 2.5)).join('')
      + R(30, 190, 60, 54, '#5D4037', 0, 3) + R(-4, 30, 144, 12, '#8D6E63', 0, 3)
      + Lc('M136 60h40M136 84l40-24', '#37474F', 5) + Lc('M168 60v14', '#37474F', 4)
      + g(170, 120, 1, E(0, 6, 46, 40, '#D9773F', 3.5) + E(-14, -6, 10, 18, '#F2A876', 0) + R(-30, -38, 60, 10, '#B85A2B', 4, 3) + C(0, -42, 7, '#B85A2B', 3)
        + P('M-30-30c-24-10-30 30-10 36', 'none', 6).replace('fill="none"', 'fill="none" stroke="#B85A2B"') + P('M38 10c16-6 24-18 30-34l8 4c-6 20-16 34-34 40z', '#D9773F', 3) + face(0, 12, 0.44))
      + P('M214 84c-8-14 10-22 18-12 6-10 22-4 14 10z', '#FFFFFF', 2.5) + P('M200 56c-8-14 8-24 18-14 6-10 22-4 16 10z', '#FFFFFF', 2.5) + P('M218 30c-6-12 8-18 14-10 6-8 18-2 12 8z', '#FFFFFF', 2.5)
      + kid(176, 236, '#43A047', 1.2)),
];

export default { places: {}, items };
