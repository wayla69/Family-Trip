// Wave 8, group france (2/3): Belgium, Brussels, Bruges and Ghent, Mont-Saint-Michel and Normandy, Nice and the Riviera,
// Strasbourg and Colmar, Zurich
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (be/bruges/landmark-gravensteen.v1.svg → be-bruges.landmark.gravensteen)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport)
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const star = (x, y, c = '#FFEB3B') => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, c, 2);
const water = (y, c = '#4FC3F7') => R(-4, y, 248, 244 - y, c, 0, 3) + Lc(`M20 ${y + 16}h40M120 ${y + 26}h50M60 ${y + 40}h36M180 ${y + 12}h40`, '#E1F5FE', 3);

const items = [
  // ---------- Belgium
  K('be', 'food', 'chicons', 'ผักเอนไดฟ์ห่อแฮมอบซอสชีส', 'Chicons au gratin, endives wrapped in ham', ['chicons au gratin', 'ชีกงโอกราแต็ง', 'witloof', 'endive', 'เอนไดฟ์', 'belgian endive', 'ham and cheese sauce', 'ซอสชีส', 'oven bake', 'belgian home cooking'],
    // a white oval oven dish holding four pale endives each wrapped in pink ham, covered in bubbling golden cheese sauce with brown spots, a fresh endive lying beside it, steam curls
    E(120, 150, 108, 56, '#FFFFFF', 3) + E(120, 146, 92, 44, '#FFD54F', 2.5)
      + [-48, -16, 16, 48].map((dx, k) => g(120 + dx, 146, 1, E(0, 0, 14, 36, '#F8BBD0', 3) + E(0, -24, 9, 12, '#F1F8E9', 2) + P('M-12 4c6 8 18 8 24 0', '#FFE082', 2) + Lc('M-12-10c8 4 16 4 24 0M-12 12c8 4 16 4 24 0', '#F48FB1', 3), k % 2 ? 8 : -8)).join('')
      + [[72, 132], [104, 152], [136, 130], [168, 150], [88, 166]].map(([x, y]) => C(x, y, 4, '#C17A2B', 0)).join('') + face(136, 150, 0.4)
      + [[90, 76], [130, 70]].map(([x, y]) => Lc(`M${x} ${y + 20}c-8-8 8-14 0-24`, '#B0BEC5', 3)).join('')
      + g(206, 200, 1, P('M-30 0c0-12 50-16 60-6-10 12-50 18-60 6z', '#F1F8E9', 3) + P('M22-6c6-2 10 0 10 4-4 2-8 2-10-4z', '#C5E1A5', 2), -14)),
  K('be', 'food', 'boulets', 'มีตบอลยักษ์แบบลีแยฌราดซอสหวาน', 'Boulets à la liégeoise, big meatballs in sweet sauce', ['boulets a la liegeoise', 'บูเลอาลาลีแยฌ', 'liege meatballs', 'มีตบอลลีแยฌ', 'sirop de liege', 'ซอสน้ำเชื่อมแอปเปิ้ลลูกแพร์', 'big meatballs', 'brown sauce', 'liege food', 'apple sauce'],
    // two huge round meatballs sitting in a pool of dark glossy brown sauce on a deep plate, raisins and onion bits in the sauce, a small bowl of apple sauce beside, faces on the meatballs
    E(110, 166, 100, 40, '#FFFFFF', 3) + E(110, 160, 82, 28, '#7B3F1A', 3) + Lc('M50 160c20 6 40 8 60 6', '#A1582A', 3)
      + [[80, 130, 32], [142, 134, 28]].map(([x, y, r], k) => C(x, y, r, '#8D5524', 3) + [[-12, -14], [10, -18], [16, 4], [-16, 6], [0, -4]].map(([dx, dy]) => C(x + dx * r / 32, y + dy * r / 32, 2.5, '#5D3A1A', 0)).join('') + P(`M${x - r * 0.7} ${y - r * 0.5}c${r * 0.4}-${r * 0.5} ${r}-${r * 0.6} ${r * 1.2} -${r * 0.3}`, '#A1582A', 0) + face(x, y + 4, k ? 0.36 : 0.42)).join('')
      + [[60, 166], [96, 172], [160, 168]].map(([x, y]) => E(x, y, 4, 3, '#3E2723', 1.5)).join('')
      + g(206, 92, 1, P('M-26 0h52c0 22-12 32-26 32S-26 22-26 0z', '#E1F5FE', 3) + E(0, 0, 26, 8, '#FFF59D', 2.5) + P('M-6-30c10-6 18 0 14 10-8 4-16-2-14-10z', '#E53935', 2.5) + Lc('M2-30v-8', '#6D4C41', 2.5))),
  K('be', 'transport', 'cuistax', 'รถถีบสี่ล้อคุยสตักซ์ริมทะเล', 'A cuistax pedal kart on the seafront', ['cuistax', 'คุยสตักซ์', 'gocart', 'pedal kart', 'รถถีบสี่ล้อ', 'belgian coast', 'ชายทะเลเบลเยียม', 'seafront promenade', 'knokke', 'de panne'],
    // a four-wheeled pedal kart with a striped canopy roof, two children pedalling side by side on the seaside promenade, sand dunes and the sea behind
    R(-4, -4, 248, 120, '#E1F5FE', 0, 0) + R(-4, 90, 248, 30, '#4FC3F7', 0, 3) + P('M-4 120c40-14 80-10 120 0s80 10 128-4v34H-4z', '#FFE0A3', 3) + R(-4, 150, 248, 94, '#D7CCC8', 0, 3)
      + g(120, 176, 1, R(-70, -6, 140, 18, '#E53935', 6, 3) + C(-50, 26, 18, '#424242', 3) + C(50, 26, 18, '#424242', 3) + C(-50, 26, 6, '#BDBDBD', 2) + C(50, 26, 6, '#BDBDBD', 2)
        + Lc('M-60-6v-74M60-6v-74', '#90A4AE', 5) + P('M-74-80h148l-10-16H-64z', '#FFEB3B', 3) + [-50, -20, 10, 40].map((x) => P(`M${x}-96h14l-2 16h-14z`, '#1E88E5', 0)).join('') + P('M-74-80h148l-10-16H-64z', 'none', 3)
        + kid(-22, -6, '#43A047', 1.3) + kid(26, -6, '#AB47BC', 1.3) + face(0, 4, 0.3))),
  K('be', 'culture', 'saxophone', 'แซกโซโฟนสีสดแห่งเมืองดีน็อง บ้านเกิดของแซกโซโฟน', 'A giant painted saxophone of Dinant, the home of the sax', ['saxophone', 'แซกโซโฟน', 'dinant', 'ดีน็อง', 'adolphe sax', 'sax', 'jazz', 'ดนตรีแจ๊ส', 'music', 'meuse river'],
    // a big shiny golden saxophone painted with bright patches, keys along its body, musical notes rising out of its bell, a smiling face on the bell
    P('M120 30c0-10 16-10 16 0v20h-16z', '#455A64', 3) + P('M120 50h16l-2 110c0 30 20 40 40 40s34-14 34-40v-30h-30v30c0 10-4 12-6 12s-8-2-8-12l2-110z', '#FFC107', 3, 0)
      + P('M168 130c-2-20 6-36 20-40h28c10 4 18 20 14 40z', '#FFB300', 3) + E(198, 120, 28, 10, '#FF8F00', 3)
      + [[128, 70, '#E53935'], [128, 92, '#1E88E5'], [128, 114, '#43A047'], [128, 136, '#AB47BC'], [134, 160, '#E53935']].map(([x, y, c]) => C(x, y, 6, c, 2.5)).join('') + Lc('M104 46l18 6', INK, 3)
      + face(198, 150, 0.36) + [[60, 70], [40, 120], [74, 160]].map(([x, y], k) => C(x, y, 8, k % 2 ? '#7E57C2' : '#EC407A', 2.5) + Lc(`M${x + 7} ${y}v-28l12 6`, INK, 3)).join('')),

  // ---------- Brussels
  L('be/brussels/landmark-mannekenpis.v1.svg', 'รูปปั้นมานเนเกนพิสในชุดแต่งกาย', 'Manneken Pis in one of his costumes', ['manneken pis', 'มานเนเกนพิส', 'little statue', 'รูปปั้นเด็กน้อย', 'fountain', 'น้ำพุ', 'costume wardrobe', 'ตู้เสื้อผ้า', 'rue de l\'etuve', 'brussels icon'], 'หาเสื้อคลุมตัวจิ๋วที่รูปปั้นใส่อยู่', 'Find the tiny cape the little statue is wearing',
    // a little bronze boy statue on a carved stone fountain niche, dressed in a tiny red cape and feathered hat, a thin water arc falling into the basin, an iron railing and kids looking up
    sky('#ECEFF1') + R(40, 20, 160, 190, '#E0D2B4', 0, 3) + P('M70 140V60c0-40 100-40 100 0v80z', '#BCAAA4', 3) + R(84, 126, 72, 18, '#A1887F', 0, 3)
      + g(120, 96, 1, P('M-12 30l-6 24h10l4-16 4 16h10l-6-24z', '#8D6E63', 2.5) + P('M-16-4h32l4 36h-40z', '#5D4037', 2.5) + P('M-20-6h40l10 40-30-8-30 8z', '#E53935', 3) + C(0, -16, 12, '#8D6E63', 3) + P('M-16-24h32l-4-10h-24z', '#1E88E5', 2.5) + P('M10-32c10-10 18-6 18 2', '#FFEB3B', 4) + face(0, -14, 0.3))
      + Lc('M128 126c8 10 12 20 12 36', '#4FC3F7', 3) + P('M60 160h120l-10 40H70z', '#B0BEC5', 3) + Lc('M80 172h80', '#81D4FA', 5)
      + R(-4, 210, 248, 34, '#9E9E9E', 0, 3) + Lc('M20 190h200M20 190v30M70 190v30M170 190v30M220 190v30', INK, 3) + kid(36, 236, '#FFCA28', 0.8) + kid(206, 236, '#26A69A', 0.8)),
  L('be/brussels/landmark-horta.v1.svg', 'บันไดอาร์ตนูโวโค้งพลิ้วในบ้านออร์ตา', 'The swirling Art Nouveau staircase of the Horta House', ['horta museum', 'พิพิธภัณฑ์ออร์ตา', 'victor horta', 'art nouveau', 'อาร์ตนูโว', 'swirling staircase', 'บันไดโค้งพลิ้ว', 'stained glass skylight', 'saint-gilles', 'unesco house'], 'หาราวเหล็กที่ม้วนเหมือนเถาไม้', 'Find the iron railing that curls like a vine',
    // looking into a light-filled stairwell: a curving wooden staircase with curly iron railings twisting like vines, a coloured glass skylight above, a mosaic floor with swirls, a kid on the bottom step
    sky('#FFF8E1') + P('M20 10h200l-20 40H40z', '#B3E5FC', 3) + [[60, '#FFCC80'], [100, '#A5D6A7'], [140, '#F48FB1'], [180, '#FFCC80']].map(([x, c]) => P(`M${x - 18} 14h36l-6 32h-24z`, c, 2)).join('') + Lc('M40 50c40-20 120-20 160 0', '#8D6E63', 4)
      + R(-4, 196, 248, 48, '#FFE0B2', 0, 3) + Array.from({ length: 5 }, (_, k) => Lc(`M${10 + k * 50} 220c10-12 24-12 30 0s20 12 30 0`, '#E2A04A', 3)).join('')
      + P('M30 196c40-10 80-30 100-70s30-60 80-66v20c-40 6-56 30-72 64s-60 64-108 72z', '#C69C6D', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${48 + k * 26} ${190 - k * 22}l12 ${-2 - k}`, '#8D6E63', 2.5)).join('')
      + Lc('M30 176c40-10 76-30 96-70s30-60 84-66', '#4E6E4E', 4) + Array.from({ length: 5 }, (_, k) => Lc(`M${52 + k * 30} ${170 - k * 26}c-10-10 4-20 10-10s-6 16-10 8`, '#4E6E4E', 2.5)).join('')
      + face(120, 150, 0.36) + kid(30, 196, '#7E57C2', 0.85)),
  L('be/brussels/landmark-mim.v1.svg', 'พิพิธภัณฑ์เครื่องดนตรีในตึกเหล็กโอลด์อิงแลนด์', 'The Musical Instruments Museum in the Old England building', ['musical instruments museum', 'พิพิธภัณฑ์เครื่องดนตรี', 'mim', 'old england building', 'ตึกโอลด์อิงแลนด์', 'black iron and glass', 'mont des arts', 'rooftop view', 'drums and horns', 'listen to instruments'], 'หาหน้าต่างโค้งกลมบนยอดตึกเหล็กสีดำ', 'Find the round arched window at the top of the black iron building',
    // a tall slim black iron-and-glass shop-style building with curly window frames and a round arched top window, a tower on one side, instruments floating out: a drum, a horn and musical notes
    sky('#E8EAF6') + R(-4, 210, 248, 34, '#BDBDBD', 0, 3) + R(50, 50, 120, 160, '#263238', 0, 3) + R(170, 30, 30, 180, '#263238', 0, 3) + P('M166 30l19-20 19 20z', '#455A64', 3)
      + P('M66 96c0-40 88-40 88 0z', '#B3E5FC', 3) + Lc('M110 60v36M80 70l14 26M140 70l-14 26', INK, 2) + [[62, 110], [112, 110], [62, 160], [112, 160]].map(([x, y]) => R(x, y, 46, 42, '#B3E5FC', 2, 2.5) + Lc(`M${x + 6} ${y + 6}c10 10 20 10 34 0`, INK, 2)).join('') + R(176, 50, 18, 30, '#B3E5FC', 2, 2)
      + face(110, 132, 0.3) + g(30, 80, 1, R(-16, -10, 32, 26, '#E53935', 4, 3) + E(0, -10, 16, 6, '#FFF8E1', 3) + Lc('M-22-26l14 14M22-26l-14 14', '#8D6E63', 3), -10)
      + g(212, 110, 1, P('M-6 0c0-20 6-30 20-36l6 6c-10 6-14 16-14 30z', '#FFC107', 3) + E(18, -34, 10, 6, '#FFB300', 3)) + [[34, 160], [214, 170], [26, 24]].map(([x, y]) => C(x, y, 6, '#7E57C2', 2.5) + Lc(`M${x + 5} ${y}v-22l10 6`, INK, 2.5)).join('')),
  L('be/brussels/landmark-fleamarket.v1.svg', 'ตลาดนัดของเก่าที่จัตุรัสเฌอเดอบาลในย่านมาโรล', 'The flea market on the Place du Jeu de Balle', ['jeu de balle', 'เฌอเดอบาล', 'vossenplein', 'flea market', 'ตลาดนัดของเก่า', 'marolles', 'ย่านมาโรล', 'old treasures', 'ของเก่า', 'bric-a-brac'], 'หากาน้ำชาสีฟ้าที่วางอยู่บนพื้น', 'Find the blue teapot sitting on the ground',
    // a cobbled square covered in blankets of old things: a teapot, a gramophone horn, a lamp, a rocking horse, crates of records, a picture frame, old houses behind
    sky('#FFF3E0') + [[-4, '#FFCC80'], [56, '#BCAAA4'], [116, '#EF9A9A'], [176, '#A5D6A7']].map(([x, c]) => R(x, 30, 60, 80, c, 0, 3) + R(x + 12, 46, 14, 18, '#FFFFFF', 2, 2) + R(x + 34, 46, 14, 18, '#FFFFFF', 2, 2)).join('') + R(-4, 110, 248, 134, '#BDBDBD', 0, 3)
      + Array.from({ length: 5 }, (_, k) => Lc(`M-4 ${130 + k * 24}h248`, '#9E9E9E', 1.5)).join('')
      + P('M10 140h100l10 50H0z', '#7986CB', 3) + P('M124 150h104l10 60H114z', '#F48FB1', 3) + P('M30 200h100l6 40H24z', '#FFD54F', 3)
      + g(42, 160, 1, P('M-14 0c0-16 28-16 28 0v10h-28z', '#42A5F5', 2.5) + P('M14 0l10-6M-14 2c-8 0-8 8 0 8', 'none', 2.5) + C(0, -14, 3, '#42A5F5', 2) + face(0, 4, 0.2))
      + g(86, 166, 1, R(-14, -4, 28, 18, '#8D6E63', 2, 2.5) + Lc('M0-4l10-20', INK, 3) + P('M6-22l20-14 6 16z', '#FFC107', 2.5))
      + g(170, 178, 1, P('M-24 16c10 6 38 6 48 0', 'none', 3) + Lc('M-16 14l6-22M16 14l-6-22', '#E53935', 3) + E(0, -10, 18, 9, '#E53935', 2.5) + C(14, -20, 7, '#E53935', 2.5) + Lc('M16-26l6-6', '#5D4037', 3))
      + g(206, 182, 1, R(-12, -24, 24, 28, '#FFF8E1', 2, 3) + R(-8, -20, 16, 20, '#81D4FA', 0, 2)) + [[60, 220], [76, 214], [92, 220]].map(([x, y]) => C(x, y, 9, '#263238', 2) + C(x, y, 3, '#E53935', 0)).join('') + kid(132, 226, '#26A69A', 0.8)),
  L('be/brussels/landmark-soignes.v1.svg', 'ป่าบีชสูงตระหง่านแห่งป่าซวาญ', 'The tall beech trees of the Sonian Forest', ['sonian forest', 'ป่าซวาญ', 'foret de soignes', 'zonienwoud', 'beech trees', 'ต้นบีช', 'forest walk', 'เดินป่า', 'autumn leaves', 'unesco forest'], 'หาเห็ดหมวกแดงข้างรากต้นไม้', 'Find the red-capped mushroom by the tree roots',
    // very tall straight smooth grey beech trunks reaching up out of the picture, a carpet of orange autumn leaves, a winding path, a family of mushrooms, a kid with a leaf
    sky('#FFF8E1') + P('M-4-4h248v60c-40 10-80 0-120 6s-80-6-128 0z', '#FFB74D', 0) + [[20, 18], [72, 22], [124, 16], [178, 20], [222, 22]].map(([x, w]) => R(x - w / 2, -4, w, 210, '#B0BEC5', 0, 3) + Lc(`M${x - 2} 40c4 10 0 20 2 30M${x + 3} 120c-3 10 0 20-2 30`, '#90A4AE', 2)).join('')
      + R(-4, 190, 248, 54, '#E07B39', 0, 3) + P('M90 244c10-30 30-40 60-54', 'none', 0) + Lc('M80 244c10-26 34-40 70-54', '#F3DFB2', 14)
      + Array.from({ length: 12 }, (_, k) => E(10 + k * 20, 200 + (k % 3) * 12, 6, 3.5, ['#FFB300', '#E53935', '#FB8C00'][k % 3], 1.5)).join('')
      + g(48, 210, 1, R(-4, 0, 8, 14, '#FFF8E1', 2, 2) + P('M-14 2c0-14 28-14 28 0z', '#E53935', 2.5) + C(-4, -4, 2, '#FFFFFF', 0) + C(5, -6, 2, '#FFFFFF', 0)) + face(124, 120, 0.32)
      + [[60, 90], [180, 70], [150, 150]].map(([x, y]) => P(`M${x} ${y}c6-8 14-6 14 2-6 6-12 4-14-2z`, '#FB8C00', 2)).join('') + kid(196, 226, '#43A047', 0.85)),

  // ---------- Bruges and Ghent
  L('be/bruges/landmark-gravensteen.v1.svg', 'ปราสาทกราเฟินสตีนกลางเมืองเกนต์', 'Gravensteen, the castle of the counts in Ghent', ['gravensteen', 'กราเฟินสตีน', 'castle of the counts', 'ปราสาทเคานต์', 'ghent castle', 'ปราสาทเกนต์', 'medieval castle', 'moat', 'คูน้ำ', 'battlements'], 'หาหอคอยกลมเล็กที่ยื่นออกมาที่มุมกำแพง', 'Find the little round turret sticking out at the corner of the wall',
    // a grey stone castle with a tall square keep, crenellated walls, small round corner turrets, an arched gate over a bridge, sitting on a dark green moat
    sky('#E3F2FD') + water(180, '#4E8E7E') + R(20, 100, 200, 84, '#9E9E9E', 0, 3) + Array.from({ length: 10 }, (_, k) => R(20 + k * 20, 90, 12, 12, '#9E9E9E', 0, 2.5)).join('')
      + R(84, 30, 72, 110, '#BDBDBD', 0, 3) + Array.from({ length: 4 }, (_, k) => R(84 + k * 20, 20, 12, 12, '#BDBDBD', 0, 2.5)).join('') + [[104, 60], [128, 60]].map(([x, y]) => R(x, y, 8, 18, '#37474F', 4, 2)).join('')
      + [[22, 96], [218, 96]].map(([x, y]) => R(x - 10, y - 30, 20, 40, '#BDBDBD', 0, 2.5) + P(`M${x - 12} ${y - 30}l12-16 12 16z`, '#546E7A', 2.5)).join('')
      + P('M100 184v-34c0-24 40-24 40 0v34z', '#455A64', 3) + R(92, 180, 56, 10, '#8D6E63', 0, 2.5) + face(120, 116, 0.42) + Lc('M30 140h40M170 150h40', '#757575', 2)),
  L('be/bruges/landmark-bonifacius.v1.svg', 'สะพานหินเล็กโบนิฟาซีอุสริมคลอง', 'The little stone Bonifacius Bridge over the canal', ['bonifacius bridge', 'สะพานโบนิฟาซีอุส', 'bonifaciusbrug', 'little stone bridge', 'สะพานหินเล็ก', 'canal corner', 'มุมคลอง', 'ivy walls', 'quiet corner', 'gruuthuse'], 'หาซุ้มโค้งของสะพานที่สะท้อนเป็นวงกลมในน้ำ', 'Find the bridge arch that makes a full circle with its reflection',
    // a small humped stone footbridge with a round arch over a green canal, its reflection completing a circle, red-brick gabled houses with ivy on both sides, a kid on the bridge
    sky('#E8F5E9') + [[-4, 70, '#C0573E'], [170, 80, '#B5543A']].map(([x, w, c]) => R(x, 40, w, 140, c, 0, 3) + P(`M${x} 40l${w / 2} -30 ${w / 2} 30z`, c, 3) + R(x + 16, 70, 16, 22, '#FFF8E1', 2, 2) + R(x + 16, 110, 16, 22, '#FFF8E1', 2, 2)).join('')
      + [[20, 150], [36, 130], [200, 140], [214, 160]].map(([x, y]) => C(x, y, 10, '#558B2F', 2)).join('') + water(160, '#4E9A7E')
      + P('M50 160c0-30 20-50 70-50s70 20 70 50h-30c0-20-16-32-40-32s-40 12-40 32z', '#D7CCC8', 3) + `<path d="M80 160c0 24 16 36 40 36s40-12 40-36" fill="none" stroke="#D7CCC8" stroke-width="5" stroke-dasharray="6 6"/>`
      + Array.from({ length: 5 }, (_, k) => Lc(`M${70 + k * 26} ${124 - (k === 2 ? 10 : k % 2 ? 8 : 0)}v-12`, '#8D6E63', 3)).join('') + face(120, 142, 0.3) + kid(116, 112, '#FF7043', 0.75)),
  L('be/bruges/landmark-waterzooi.v1.svg', 'สตูว์ครีมวอเตอร์ซูยแห่งเกนต์', 'Ghent waterzooi, the creamy chicken stew', ['waterzooi', 'วอเตอร์ซูย', 'gentse waterzooi', 'creamy stew', 'สตูว์ครีม', 'chicken stew', 'สตูว์ไก่', 'leeks and carrots', 'ghent dish', 'soup bowl'],
    'หาแครอทชิ้นกลมที่ลอยอยู่ในน้ำซุป', 'Find the round carrot slices floating in the stew',
    // a deep blue-rimmed bowl of pale creamy stew with chunks of chicken, orange carrot coins, green leek rings and potato cubes, a parsley sprinkle, steam, a spoon and a slice of bread
    P('M30 120h180c0 50-40 84-90 84s-90-34-90-84z', '#FFFFFF', 3) + Lc('M40 140c40 12 120 12 160 0', '#1E88E5', 5) + E(120, 120, 90, 20, '#FFF3D6', 3)
      + [[80, 118], [130, 114], [160, 124]].map(([x, y]) => R(x - 12, y - 7, 24, 14, '#FFE0B2', 5, 2)).join('') + [[100, 112], [148, 126], [70, 128]].map(([x, y]) => C(x, y, 6, '#FF9800', 2) + C(x, y, 2, '#FFE0B2', 0)).join('')
      + [[116, 126], [180, 116]].map(([x, y]) => E(x, y, 7, 4, '#C5E1A5', 2)).join('') + [[90, 124], [140, 120], [170, 112]].map(([x, y]) => C(x, y, 1.5, '#2E7D32', 0)).join('') + face(120, 166, 0.45)
      + [[96, 70], [140, 64]].map(([x, y]) => Lc(`M${x} ${y + 26}c-8-8 8-14 0-26`, '#B0BEC5', 3)).join('') + g(212, 196, 1, P('M-26 0c0-20 52-20 52 0v14h-52z', '#E2A04A', 3) + E(0, 4, 18, 6, '#FFF3D6', 0))),
  L('be/bruges/landmark-ezelpoort.v1.svg', 'ประตูเมืองเอเซิลโพร์ตริมคูน้ำ', 'The Ezelpoort city gate on the moat', ['ezelpoort', 'เอเซิลโพร์ต', 'donkey gate', 'ประตูลา', 'city gate', 'ประตูเมือง', 'bruges ramparts', 'moat', 'คูเมือง', 'walk round bruges'], 'หารูปลาตัวเล็กบนป้ายหน้าประตู', 'Find the little donkey on the sign over the gate',
    // a brick city gate with two fat round towers topped by pointed slate roofs and a gate arch in the middle, standing at the water's edge with its reflection, a little donkey picture over the arch
    sky('#E1F5FE') + water(170, '#5C9EAD') + R(70, 70, 100, 100, '#C0673E', 0, 3) + Array.from({ length: 5 }, (_, k) => R(70 + k * 20, 60, 12, 12, '#C0673E', 0, 2.5)).join('')
      + [[60, '#B85C35'], [180, '#B85C35']].map(([x, c]) => R(x - 26, 60, 52, 110, c, 0, 3) + P(`M${x - 30} 60l30-44 30 44z`, '#455A64', 3) + R(x - 6, 90, 12, 20, '#37474F', 6, 2) + Lc(`M${x - 26} 140h52`, '#8D4A2B', 2)).join('')
      + P('M100 170v-40c0-26 40-26 40 0v40z', '#3E2723', 3) + R(104, 80, 32, 24, '#FFF8E1', 3, 2.5)
      + g(120, 92, 0.55, E(0, 4, 18, 10, '#9E9E9E', 3) + C(18, -8, 9, '#9E9E9E', 3) + P('M14-18l-2-10 6 6zM22-16l4-10 2 10z', '#9E9E9E', 2) + Lc('M-10 12v12M10 12v12', INK, 3)) + face(120, 144, 0.3)
      + `<path d="M40 186h160M60 200h120" fill="none" stroke="#B85C35" stroke-width="3" stroke-dasharray="8 6"/>`),
  // ---------- Mont-Saint-Michel and Normandy
  L('fr/montstmichel/landmark-honfleur.v1.svg', 'บ้านหน้าแคบสูงรอบท่าเรือเก่าออนเฟลอร์', 'The tall narrow houses round Honfleur\'s old harbour', ['honfleur', 'ออนเฟลอร์', 'vieux bassin', 'ท่าเรือเก่า', 'tall narrow houses', 'บ้านหน้าแคบ', 'slate fronts', 'sailing boat masts', 'harbour town', 'normandy coast'], 'หาบ้านที่ผนังมุงด้วยกระเบื้องหินชนวนสีเทา', 'Find the house whose wall is covered in grey slate tiles',
    // a row of very tall thin houses of different heights, some timber-framed, some covered in grey slates, packed round a harbour, two little sailing boats with masts reflected in the still water
    sky('#E3F2FD') + [[0, 44, 130, '#FFE0B2'], [44, 36, 150, '#78909C'], [80, 40, 120, '#FFCDD2'], [120, 34, 160, '#90A4AE'], [154, 42, 128, '#FFF59D'], [196, 48, 140, '#B0BEC5']].map(([x, w, h, c], k) => R(x, 150 - h, w, h, c, 0, 3) + P(`M${x} ${150 - h}l${w / 2} -18 ${w / 2} 18z`, '#546E7A', 3)
        + [0, 1, 2, 3].map((r) => R(x + w / 2 - 7, 160 - h + 12 + r * 28, 14, 16, '#FFFFFF', 1, 2)).join('') + (k % 2 ? Array.from({ length: 4 }, (_, j) => Lc(`M${x + 2} ${160 - h + 26 + j * 28}h${w - 4}`, '#607D8B', 1.5)).join('') : Lc(`M${x} ${100}l${w} 20M${x + w} 100l-${w} 20`, '#8D6E63', 2))).join('')
      + water(150, '#64B5F6') + [[70, 168], [168, 176]].map(([x, y], k) => P(`M${x - 26} ${y}h52l-8 14h-36z`, k ? '#E53935' : '#FFFFFF', 3) + Lc(`M${x} ${y}v-70`, INK, 3) + P(`M${x + 2} ${y - 66}l24 54h-24z`, '#FFF8E1', 2.5)).join('') + face(70, 124, 0.3)),
  L('fr/montstmichel/landmark-giverny.v1.svg', 'สระบัวกับสะพานโค้งสีเขียวที่ฌีแวร์นี', 'The water-lily pond and the green bridge at Giverny', ['giverny', 'ฌีแวร์นี', 'water lilies', 'ดอกบัวสาย', 'japanese bridge', 'สะพานโค้งสีเขียว', 'lily pond', 'สระบัว', 'painter\'s garden', 'wisteria'], 'หาดอกบัวสีชมพูที่ลอยอยู่ใต้สะพาน', 'Find the pink water lily floating under the bridge',
    // a curved green wooden footbridge arching over a pond full of round lily pads and pink and white water lilies, drooping wisteria and willow at the top, reflections in the water
    sky('#E8F5E9') + R(-4, 120, 248, 124, '#4DB6AC', 0, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${10 + k * 40} -4c4 30 0 50 6 70`, '#689F38', 4)).join('') + Array.from({ length: 7 }, (_, k) => P(`M${20 + k * 32} 4c-8 14-4 30 4 36 8-8 8-24-4-36z`, '#B39DDB', 2)).join('')
      + P('M10 130c40-60 180-60 220 0', 'none', 0) + Lc('M10 132c40-60 180-60 220 0', '#43A047', 10) + Lc('M10 116c40-60 180-60 220 0', '#43A047', 4) + Array.from({ length: 9 }, (_, k) => Lc(`M${30 + k * 22} ${118 - Math.sin((k + 0.5) / 9 * Math.PI) * 44}v16`, '#43A047', 4)).join('')
      + [[40, 170, 20], [100, 190, 24], [170, 168, 18], [200, 212, 22], [60, 224, 18], [140, 226, 16]].map(([x, y, r]) => P(`M${x} ${y}l${r} -4a${r} ${r * 0.5} 0 1 0 0 8z`, '#7CB342', 2.5)).join('')
      + [[100, 186, '#F48FB1'], [176, 164, '#FFFFFF'], [62, 220, '#F8BBD0']].map(([x, y, c]) => [-1, 0, 1].map((d) => P(`M${x + d * 7} ${y}c-6-8 0-16 ${-d * 2} -18 6 4 8 12 ${2 - d * 2} 18z`, c, 2)).join('')).join('') + face(120, 112, 0.3)),
  L('fr/montstmichel/landmark-briselames.v1.svg', 'แนวเสาไม้กันคลื่นบนหาดแซ็งมาโล', 'The wooden breakwater posts on the beach at Saint-Malo', ['saint-malo', 'แซ็งมาโล', 'brise-lames', 'breakwater posts', 'เสาไม้กันคลื่น', 'plage du sillon', 'หาดซียง', 'walled city', 'เมืองกำแพง', 'big tides'], 'หาเสาไม้ต้นที่สูงที่สุดที่เอียงนิดๆ', 'Find the tallest wooden post leaning a little',
    // rows of tall weathered tree-trunk posts sticking up out of the sand in a long staggered line, waves rolling in, the granite walled town with roofs and a spire behind
    sky('#E1F5FE') + R(10, 60, 220, 40, '#9E9E9E', 0, 3) + Array.from({ length: 9 }, (_, k) => R(14 + k * 24, 52, 12, 10, '#9E9E9E', 0, 2)).join('') + [[40, 60], [100, 60], [170, 60]].map(([x, y]) => P(`M${x - 18} ${y}l18-22 18 22z`, '#546E7A', 2.5)).join('') + P('M136 60l8-40 8 40z', '#546E7A', 2.5)
      + R(-4, 100, 248, 50, '#4FC3F7', 0, 3) + Lc('M10 116c20-8 40 8 60 0s40 8 60 0 40 8 60 0', '#FFFFFF', 4) + R(-4, 150, 248, 94, '#F3DFB2', 0, 3)
      + Array.from({ length: 9 }, (_, k) => { const x = 20 + k * 25; const h = 70 - Math.abs(k - 4) * 6; return R(x - 6, 200 - h - (k % 2) * 6, 12, h, '#8D6E63', 4, 3) + Lc(`M${x - 2} ${206 - h}v${h - 16}`, '#6D4C41', 1.5) + Lc(`M${x - 6} ${200 - h + 10}h12`, '#5D4037', 2); }).join('')
      + face(120, 166, 0.3) + kid(200, 232, '#E53935', 0.85)),
  L('fr/montstmichel/landmark-caramel.v1.svg', 'คาราเมลเนยเค็มแห่งนอร์ม็องดี', 'Normandy salted butter caramels', ['salted butter caramel', 'คาราเมลเนยเค็ม', 'caramel au beurre sale', 'normandy butter', 'เนยนอร์ม็องดี', 'isigny', 'caramels', 'ลูกอมคาราเมล', 'caramel sauce', 'sea salt'], 'หาเม็ดเกลือขาวบนคาราเมล', 'Find the white salt crystals on the caramel',
    // a glass jar of glossy caramel sauce with a dripping wooden dipper, a pile of square caramels wrapped in twisted paper, one unwrapped with salt crystals on top, a pat of butter
    P('M40 70h80v120c0 10-80 10-80 0z', '#FFE0B2', 3) + R(36, 58, 88, 16, '#E53935', 3, 3) + Array.from({ length: 5 }, (_, k) => C(46 + k * 17, 66, 3, '#FFFFFF', 0)).join('') + P('M44 110c20 8 52 8 72 0v76c-12 8-60 8-72 0z', '#C1752C', 2.5) + face(80, 150, 0.4)
      + g(118, 72, 1, R(-4, -40, 8, 60, '#C69C6D', 3, 2.5) + E(0, 24, 10, 12, '#C69C6D', 2.5) + P('M-6 34c0 10 4 16 6 22 2-6 6-12 6-22z', '#C1752C', 2), 24)
      + [[158, 174, '#FFF8E1'], [196, 180, '#E1F5FE'], [176, 146, '#FFF8E1']].map(([x, y, c]) => R(x - 16, y - 12, 32, 24, c, 3, 2.5) + P(`M${x - 16} ${y - 8}l-12-6v24l12-6zM${x + 16} ${y - 8}l12-6v24l-12-6z`, c, 2.5) + R(x - 10, y - 7, 20, 14, '#C1752C', 2, 0)).join('')
      + g(150, 214, 1, R(-18, -12, 36, 24, '#D4892F', 3, 3) + [[-8, -6], [4, -8], [10, 2], [-4, 2]].map(([x, y]) => R(x, y, 4, 4, '#FFFFFF', 0, 1)).join('')) + R(190, 204, 36, 22, '#FFF59D', 3, 3)),
  L('fr/montstmichel/landmark-kouignamann.v1.svg', 'ขนมกุยน์อามานเนยหวานกรอบ', 'Kouign-amann, the buttery caramel cake of Brittany', ['kouign-amann', 'กุยน์อามาน', 'breton butter cake', 'เค้กเนยเบรอตาญ', 'brittany', 'บริตทานี', 'caramelised pastry', 'ขนมเนยคาราเมล', 'saint-malo bakery', 'flaky layers'], 'หาชั้นแป้งที่ซ้อนกันเป็นเกลียว', 'Find the layers of pastry folded round like petals',
    // a round golden-brown pastry with folded corners like petals, a shiny caramel glaze and visible flaky layers, a slice cut showing the layers, on a blue-and-white striped cloth
    R(14, 150, 212, 60, '#E3F2FD', 6, 3) + Array.from({ length: 5 }, (_, k) => Lc(`M${30 + k * 40} 150v60`, '#1E88E5', 5)).join('')
      + [0, 72, 144, 216, 288].map((a) => g(104, 120, 1, P('M0-6c-24-10-30-50 0-60 30 10 24 50 0 60z', '#D4892F', 3) + Lc('M-10-24c6-6 14-6 20 0M-8-40c6-6 12-6 16 0', '#A65E1B', 2.5), a)).join('') + C(104, 120, 26, '#C1752C', 3) + E(96, 112, 8, 4, '#FFE0B2', 0) + face(104, 122, 0.4)
      + g(196, 126, 1, P('M-20 30l20-60 20 60z', '#D4892F', 3) + Array.from({ length: 4 }, (_, k) => Lc(`M${-14 + k * 3} ${18 - k * 12}h${28 - k * 6}`, '#FFE0B2', 2.5)).join(''))),

  // ---------- Nice and the Riviera
  L('fr/nice/landmark-negresco.v1.svg', 'โรงแรมเนเกรสโกโดมสีชมพูริมทะเล', 'The pink dome of the Hotel Negresco', ['hotel negresco', 'โรงแรมเนเกรสโก', 'pink dome', 'โดมสีชมพู', 'belle epoque hotel', 'promenade des anglais', 'ถนนเลียบทะเล', 'palm trees', 'ต้นปาล์ม', 'seafront'], 'หายอดแหลมเล็กๆ บนโดมสีชมพู', 'Find the little spike on top of the pink dome',
    // a grand white seaside hotel with rows of balconies and blue shutters, a big round dome on the corner with pink and green stripes, palm trees in front, the promenade railing
    sky('#E1F5FE') + R(20, 90, 200, 120, '#FAFAFA', 0, 3) + Array.from({ length: 3 }, (_, r) => Array.from({ length: 6 }, (_, c) => R(30 + c * 31, 104 + r * 32, 18, 22, '#81D4FA', 1, 2) + Lc(`M${28 + c * 31} ${126 + r * 32}h22`, INK, 2)).join('')).join('')
      + R(130, 60, 70, 40, '#FAFAFA', 0, 3) + P('M124 64c0-50 82-50 82 0z', '#F48FB1', 3) + Array.from({ length: 4 }, (_, k) => Lc(`M${140 + k * 16} 62c${-2 + k}-24 ${-6 + k * 3}-34 ${-12 + k * 8} -40`, '#81C784', 3)).join('') + Lc('M165 24v-14', INK, 3) + C(165, 8, 3, '#FFCA28', 2) + face(165, 48, 0.3)
      + R(-4, 210, 248, 34, '#90A4AE', 0, 3) + Lc('M-4 206h248', '#0277BD', 4)
      + [[20, 210], [222, 210]].map(([x, y]) => Lc(`M${x} ${y}c-2-30 2-60 0-90`, '#8D6E63', 6) + [[-30, -10], [30, -10], [-20, 14], [20, 14]].map(([dx, dy]) => P(`M${x} ${y - 90}c${dx / 2} ${dy - 10} ${dx} ${dy - 4} ${dx} ${dy + 6}`, 'none', 0) + Lc(`M${x} ${y - 90}c${dx / 2} ${dy - 10} ${dx} ${dy - 4} ${dx} ${dy + 6}`, '#43A047', 6)).join('')).join('')),
  L('fr/nice/landmark-redcarpet.v1.svg', 'พรมแดงขึ้นบันไดเทศกาลภาพยนตร์เมืองคานส์', 'The red carpet up the festival steps in Cannes', ['cannes', 'คานส์', 'red carpet', 'พรมแดง', 'film festival', 'เทศกาลภาพยนตร์', 'palais des festivals', 'croisette', 'flashing cameras', 'walk like a star'], 'หาเด็กที่โพสท่าอยู่บนพรมแดง', 'Find the child posing on the red carpet',
    // a wide white staircase with a red carpet running up the middle to a glass building, rope barriers with gold posts, camera flashes sparkling, a child striking a pose on the carpet, a palm tree
    sky('#FFF8E1') + R(30, 30, 180, 60, '#B3E5FC', 0, 3) + Array.from({ length: 5 }, (_, k) => Lc(`M${66 + k * 36} 30v60`, '#FFFFFF', 3)).join('')
      + Array.from({ length: 7 }, (_, k) => R(10 + k * 6, 90 + k * 20, 220 - k * 12, 20, '#FAFAFA', 0, 2.5)).join('') + P('M96 90h48l30 154H66z', '#E53935', 3) + Array.from({ length: 7 }, (_, k) => Lc(`M${94 - k * 4.5} ${110 + k * 20}h${52 + k * 9}`, '#C62828', 2)).join('')
      + [[50, 190], [190, 190], [40, 226], [200, 226]].map(([x, y]) => R(x - 3, y - 24, 6, 26, '#FFC107', 2, 2) + C(x, y - 26, 5, '#FFC107', 2)).join('') + Lc('M50 166h-10v36M190 166h10v36', '#B71C1C', 3)
      + [[30, 120], [210, 120], [24, 50], [216, 54]].map(([x, y]) => star(x, y, '#FFFFFF')).join('') + g(120, 176, 1.2, C(0, -24, 9, '#FFE0BD', 2) + P('M-10-14h20l8 26h-36z', '#FFEB3B', 2) + Lc('M10-12l14-12M-10-12l-12 8', '#FFE0BD', 4) + face(0, -22, 0.24))),
  L('fr/nice/landmark-grandprix.v1.svg', 'รถแข่งบนถนนในเมืองโมนาโก', 'A racing car on the Monaco street circuit', ['monaco grand prix', 'โมนาโกกรังด์ปรีซ์', 'race car', 'รถแข่ง', 'street circuit', 'สนามแข่งในเมือง', 'harbour bend', 'โค้งริมท่าเรือ', 'racing', 'monte carlo'], 'หาขอบถนนลายแดงขาวตรงโค้ง', 'Find the red-and-white kerb on the bend',
    // a low open-wheel racing car with big black tyres and a rear wing zooming round a street bend with red-and-white kerbs, crash barriers, the harbour and yachts behind, speed lines
    sky('#E1F5FE') + R(-4, 80, 248, 40, '#29B6F6', 0, 3) + [[40, 90], [120, 86], [190, 92]].map(([x, y]) => P(`M${x - 20} ${y}h40l-6 10h-28z`, '#FFFFFF', 2.5) + Lc(`M${x} ${y}v-24`, INK, 2)).join('') + R(-4, 118, 248, 12, '#ECEFF1', 0, 3)
      + R(-4, 130, 248, 114, '#757575', 0, 3) + Array.from({ length: 12 }, (_, k) => R(k * 20 - 4, 196, 20, 12, k % 2 ? '#FFFFFF' : '#E53935', 0, 2)).join('') + Lc('M20 160h30M10 176h20', '#BDBDBD', 4)
      + g(130, 170, 1, P('M-80 6h150c6 0 10-8 0-14l-40-8h-40l-10-10h-40v10l-20 4z', '#1E88E5', 3) + R(-90, -24, 20, 26, '#1E88E5', 2, 3) + R(-96, -30, 32, 8, '#0D47A1', 2, 2.5)
        + C(-60, 10, 16, '#212121', 3) + C(50, 10, 16, '#212121', 3) + C(-60, 10, 5, '#9E9E9E', 0) + C(50, 10, 5, '#9E9E9E', 0) + C(-6, -24, 12, '#FFEB3B', 3) + E(0, -24, 7, 4, '#90CAF9', 2) + face(20, -4, 0.28))
      + Lc('M10 150h40M0 166h30', '#FFFFFF', 3)),
  L('fr/nice/landmark-pointu.v1.svg', 'เรือประมงไม้ปวงตูหัวแหลมหลากสี', 'The colourful pointu fishing boats', ['pointu', 'เรือปวงตู', 'traditional fishing boat', 'เรือประมงไม้', 'port lympia', 'ท่าเรือลีมเปีย', 'villefranche', 'colourful boats', 'เรือหลากสี', 'fishermen'], 'หาเรือที่หัวและท้ายแหลมเหมือนกัน', 'Find the boat that is pointed at both ends',
    // two chubby wooden boats with pointed ends and curved sides painted in bright bands of blue, white, red and yellow, rocking in a calm harbour, a coil of rope and a buoy, yellow and red houses behind
    sky('#FFF8E1') + [[-4, '#FFCC80'], [50, '#EF9A9A'], [100, '#FFF59D'], [150, '#FFAB91'], [200, '#FFE082']].map(([x, c]) => R(x, 40, 50, 80, c, 0, 3) + R(x + 16, 56, 18, 22, '#43A047', 1, 2)).join('') + water(118, '#29B6F6')
      + [[86, 172, ['#1E88E5', '#FFFFFF', '#E53935'], 1], [180, 140, ['#FFEB3B', '#43A047', '#FFFFFF'], 0.7]].map(([x, y, cs, s]) => g(x, y, s, P('M-80-20c20 30 140 30 160 0l-10 20c-20 26-120 26-140 0z', cs[0], 3) + P('M-80-20c20 18 140 18 160 0l-4 8c-30 16-122 16-152 0z', cs[1], 2.5) + Lc('M-84-22l-10-10M84-22l10-10', INK, 4) + R(-30, -40, 50, 16, cs[2], 3, 2.5) + (s === 1 ? face(0, 4, 0.36) : ''))).join('')
      + C(30, 210, 10, '#FF7043', 2.5) + Lc('M30 200v-16', INK, 2)),
  L('fr/nice/landmark-mentonlemon.v1.svg', 'ประติมากรรมมะนาวยักษ์ในเทศกาลมะนาวเมืองมองตง', 'A giant lemon sculpture at the Menton Lemon Festival', ['menton', 'มองตง', 'fete du citron', 'เทศกาลมะนาว', 'lemon festival', 'citrus sculpture', 'ประติมากรรมผลไม้', 'oranges and lemons', 'มะนาวกับส้ม', 'february festival'], 'หาส้มลูกเดียวที่เป็นตาของช้าง', 'Find the single orange that makes the elephant\'s eye',
    // a giant elephant sculpture made of hundreds of yellow lemons and orange oranges on a wire frame in a garden, a lemon-dotted trunk raised, palm trees, a kid looking up
    sky('#E1F5FE') + R(-4, 196, 248, 48, '#9CCC65', 0, 3) + Lc('M220 196c-2-40 2-70 0-100', '#8D6E63', 5) + [[-24, -10], [24, -10], [-16, 12], [16, 12]].map(([dx, dy]) => Lc(`M220 96c${dx / 2} ${dy - 8} ${dx} ${dy - 2} ${dx} ${dy + 6}`, '#43A047', 5)).join('')
      + P('M40 190V120c0-50 40-70 80-70s70 20 70 60v80h-30v-40h-80v40z', '#FFEB3B', 3) + P('M50 110c-20 10-30 40-20 70 6 10 18 6 16-4-6-20 0-40 12-50z', '#FFEB3B', 3)
      + Array.from({ length: 30 }, (_, k) => { const x = 60 + (k % 6) * 20 + (Math.floor(k / 6) % 2) * 10; const y = 70 + Math.floor(k / 6) * 22; return y < 190 && !(y > 150 && x > 90 && x < 150) ? E(x, y, 7, 5.5, k % 4 ? '#FDD835' : '#FB8C00', 1.5) : ''; }).join('')
      + P('M150 74c20-10 40 0 40 20-10 0-30-6-40-20z', '#FB8C00', 3) + C(88, 92, 7, '#FB8C00', 2.5) + C(88, 92, 3, INK, 0) + E(102, 108, 8, 5, '#FF8FA3', 0) + kid(200, 228, '#7E57C2', 0.85)),

  // ---------- Strasbourg and Colmar
  L('fr/strasbourg/landmark-eguisheim.v1.svg', 'หมู่บ้านวงกลมเอกีซายม์', 'Eguisheim, the village built in circles', ['eguisheim', 'เอกีซายม์', 'round village', 'หมู่บ้านวงกลม', 'circular streets', 'ถนนเป็นวง', 'alsace village', 'หมู่บ้านอาลซัส', 'flowered houses', 'castle in the middle'], 'หาน้ำพุตรงกลางวงกลมของหมู่บ้าน', 'Find the fountain right in the middle of the village rings',
    // a bird's-eye view of a round village: rings of colourful roofs one inside another round a central square with a little castle and fountain, green fields round the outside
    sky('#AED581') + Array.from({ length: 6 }, (_, k) => Lc(`M${k * 44} -4l-20 248`, '#9CCC65', 6)).join('')
      + C(120, 120, 104, '#BCAAA4', 3) + Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2; return g(120 + Math.cos(a) * 90, 120 + Math.sin(a) * 90, 1, R(-10, -8, 20, 16, ['#E57373', '#FFB74D', '#FFF176', '#81C784', '#64B5F6'][k % 5], 2, 2.5), (a * 180) / Math.PI + 90); }).join('')
      + C(120, 120, 72, '#D7CCC8', 3) + Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2 + 0.2; return g(120 + Math.cos(a) * 58, 120 + Math.sin(a) * 58, 1, R(-10, -8, 20, 16, ['#FF8A65', '#FFD54F', '#AED581', '#F48FB1'][k % 4], 2, 2.5), (a * 180) / Math.PI + 90); }).join('')
      + C(120, 120, 40, '#EFEBE9', 3) + R(96, 98, 26, 26, '#A1887F', 0, 2.5) + P('M94 98l15-14 15 14z', '#6D4C41', 2.5) + C(140, 134, 10, '#81D4FA', 2.5) + C(140, 134, 3, '#FFFFFF', 0) + face(120, 140, 0.25)),
  L('fr/strasbourg/landmark-choucroute.v1.svg', 'ชูครูตกาลนี กะหล่ำดองกับไส้กรอกแบบอาลซัส', 'Choucroute garnie, Alsace sauerkraut with sausages', ['choucroute garnie', 'ชูครูตกาลนี', 'sauerkraut', 'กะหล่ำปลีดอง', 'strasbourg sausage', 'ไส้กรอกสตราสบูร์ก', 'alsace platter', 'boiled potatoes', 'มันฝรั่งต้ม', 'winstub'], 'หาไส้กรอกสีชมพูที่วางพาดบนกะหล่ำดอง', 'Find the pink sausage lying across the sauerkraut',
    // a big oval platter heaped with pale yellow shredded sauerkraut, two pink sausages, a thick slice of ham, a smoked sausage, round boiled potatoes at the sides and a few juniper berries
    E(120, 150, 110, 60, '#FFFFFF', 3) + E(120, 146, 94, 46, '#E3F2FD', 2) + P('M50 150c0-40 140-40 140 0-20 16-120 16-140 0z', '#F0E68C', 3) + Array.from({ length: 14 }, (_, k) => Lc(`M${60 + k * 9} ${130 + (k % 3) * 6}c4 4 8 4 10 0`, '#C9B458', 2)).join('')
      + g(110, 124, 1, R(-44, -9, 88, 18, '#F8BBD0', 9, 3), -10) + g(130, 146, 1, R(-40, -8, 80, 16, '#F48FB1', 8, 3), 8) + g(156, 118, 1, R(-24, -16, 48, 32, '#EF9A9A', 6, 3) + E(-8, -4, 8, 6, '#FFEBEE', 0), 12)
      + g(84, 152, 1, R(-30, -7, 60, 14, '#8D5524', 7, 3) + Lc('M-20-2l4 4M0-2l4 4M18-2l4 4', '#5D3A1A', 2), -4) + [[40, 154], [200, 150], [60, 178], [180, 176]].map(([x, y]) => E(x, y, 14, 11, '#FFE082', 2.5)).join('')
      + [[120, 164], [130, 168], [110, 170]].map(([x, y]) => C(x, y, 3, '#3949AB', 1.5)).join('') + face(110, 122, 0.25)),
  L('fr/strasbourg/landmark-maisondestetes.v1.svg', 'บ้านร้อยหน้าแห่งกอลมาร์', 'The Maison des Têtes, the house of a hundred faces in Colmar', ['maison des tetes', 'บ้านเมซงเดแต็ต', 'house of heads', 'บ้านร้อยหน้า', 'carved faces', 'หน้าแกะสลัก', 'colmar old town', 'กอลมาร์', 'stepped gable', 'grand rue'], 'หาหน้าแกะสลักที่กำลังแลบลิ้น', 'Find the carved face sticking its tongue out',
    // a tall stone house with a stepped gable and a bay window, its whole front covered with little round carved faces making funny expressions, one sticking out its tongue, a tiny figure on top
    sky('#E3F2FD') + R(-4, 210, 248, 34, '#BDBDBD', 0, 3) + P('M40 210V80h20V60h20V40h20V22h40v18h20v20h20v20h20v130z', '#E6D3B3', 3) + R(90, 110, 60, 60, '#B3E5FC', 3, 3) + P('M84 170h72l-6 14H90z', '#C9AE86', 3)
      + [[70, 96], [120, 70], [170, 96], [120, 40], [100, 52], [140, 52], [60, 130], [180, 130], [60, 170], [180, 170], [70, 196], [170, 196], [120, 196], [96, 90], [144, 90]].map(([x, y], k) => C(x, y, 9, '#D7BE95', 2) + C(x - 3, y - 1, 1.5, INK, 0) + C(x + 3, y - 1, 1.5, INK, 0) + (k === 3 ? E(x, y + 5, 2.5, 3.5, '#E57373', 1) : k % 3 === 0 ? E(x, y + 4, 2, 2.5, INK, 0) : Lc(`M${x - 3} ${y + 3}q3 3 6 0`, INK, 1.5))).join('')
      + Lc('M120 22v-12', INK, 2.5) + C(120, 6, 5, '#90A4AE', 2) + face(120, 136, 0.35)),
  L('fr/strasbourg/landmark-carmuseum.v1.svg', 'รถโบราณในพิพิธภัณฑ์รถยนต์มูลูซ', 'Old cars in the Mulhouse car museum', ['cite de l\'automobile', 'พิพิธภัณฑ์รถยนต์', 'mulhouse', 'มูลูซ', 'vintage cars', 'รถโบราณ', 'old cars', 'car museum', 'lamp-lined hall', 'alsace day trip'], 'หาไฟหน้ารถกลมโตสีทอง', 'Find the big round golden headlamp',
    // a long hall lined with old-fashioned lamp posts on a polished floor, a shiny red vintage car with tall spoked wheels, round brass headlamps and a running board in front, a blue one behind
    sky('#ECEFF1') + P('M-4 40h248v20H-4z', '#B0BEC5', 3) + R(-4, 180, 248, 64, '#A1887F', 0, 3) + Lc('M-4 200h248M-4 222h248', '#8D6E63', 2)
      + [[30, 180], [210, 180]].map(([x, y]) => Lc(`M${x} ${y}v-90`, '#455A64', 4) + C(x, y - 96, 9, '#FFF59D', 2.5)).join('')
      + g(160, 128, 0.6, R(-60, -30, 120, 40, '#42A5F5', 10, 3) + P('M-30-30v-26h50l14 26z', '#1E88E5', 3) + C(-38, 14, 18, '#424242', 3) + C(40, 14, 18, '#424242', 3))
      + g(108, 176, 1, P('M-80-12h40l10-34h50l10 34h50c10 0 10 20 0 20H-80z', '#E53935', 3) + R(-30, -40, 46, 26, '#B3E5FC', 3, 2.5) + R(-88, -2, 176, 6, INK, 2, 0)
        + [-56, 56].map((x) => C(x, 14, 22, '#FFF8E1', 3) + C(x, 14, 6, '#E53935', 2) + Array.from({ length: 8 }, (_, k) => g(x, 14, 1, Lc('M0 0v-20', INK, 1.5), k * 45)).join('')).join('') + C(84, -16, 9, '#FFC107', 3) + C(84, -16, 4, '#FFF8E1', 0) + face(0, -4, 0.28))),
  L('fr/strasbourg/landmark-baeckeoffe.v1.svg', 'แบคเคอออฟฟ์ หม้อดินเผาปิดผนึกด้วยแป้ง', 'Baeckeoffe, the stew baked in a dough-sealed pot', ['baeckeoffe', 'แบคเคอออฟฟ์', 'baker\'s oven stew', 'สตูว์หม้อดิน', 'painted clay pot', 'หม้อดินเผาลายดอกไม้', 'dough seal', 'ปิดผนึกด้วยแป้ง', 'alsace dish', 'potatoes and meat'], 'หาเส้นแป้งที่พันรอบฝาหม้อ', 'Find the ring of bread dough sealing the lid',
    // an oval glazed earthenware casserole painted with flowers, its lid sealed all round by a golden band of baked dough, two handles, steam escaping, a scoop of potatoes and meat on a plate beside it
    E(110, 200, 96, 16, '#D7CCC8', 0) + P('M30 120h160c0 50-20 80-80 80S30 170 30 120z', '#2E5E8E', 3) + [[60, 150], [110, 166], [160, 150]].map(([x, y]) => C(x, y, 7, '#FFCA28', 2) + [0, 72, 144, 216, 288].map((a) => g(x, y, 1, E(0, -11, 4, 5, '#F48FB1', 1.5), a)).join('')).join('')
      + [[28, 128], [192, 128]].map(([x, y]) => E(x, y, 10, 6, '#2E5E8E', 3)).join('') + R(26, 108, 168, 14, '#E2A04A', 7, 3) + Array.from({ length: 8 }, (_, k) => Lc(`M${40 + k * 20} 110l6 10`, '#C17A2B', 2)).join('')
      + P('M36 108c0-30 148-30 148 0z', '#2E5E8E', 3) + C(110, 80, 8, '#2E5E8E', 3) + Lc('M70 96c10-6 30-8 40-8', '#90CAF9', 3) + face(110, 150, 0.4)
      + [[80, 50], [140, 44]].map(([x, y]) => Lc(`M${x} ${y + 24}c-8-8 8-14 0-24`, '#B0BEC5', 3)).join('')
      + g(210, 190, 1, E(0, 6, 26, 10, '#FFFFFF', 3) + E(-6, 0, 9, 7, '#FFE082', 2) + E(8, -2, 9, 6, '#A1673F', 2))),

  // ---------- Zurich
  L('ch/zurich/landmark-tirggel.v1.svg', 'ขนมทิร์กเกลน้ำผึ้งลายนูน', 'Tirggel, thin honey biscuits with pictures pressed in', ['tirggel', 'ทิร์กเกล', 'honey biscuits', 'บิสกิตน้ำผึ้ง', 'pressed pictures', 'ลายนูน', 'christmas biscuit', 'zurich sweet', 'ขนมซูริก', 'wooden mould'], 'หารูปม้าตัวเล็กบนแผ่นบิสกิต', 'Find the little horse pressed into a biscuit',
    // three very thin pale golden biscuits with raised pictures: a house, a horse and a heart-shaped tree, the edges browned, a carved wooden mould and a honey pot beside them
    g(100, 120, 1, R(-56, -44, 112, 88, '#F3D29A', 8, 3) + R(-50, -38, 100, 76, '#E8C27E', 6, 2) + P('M-30 20v-30l30-20 30 20v30z', '#F3D29A', 2.5) + R(-8, 4, 16, 16, '#E8C27E', 2, 2) + face(0, -6, 0.26), -6)
      + g(176, 82, 1, R(-38, -30, 76, 60, '#F3D29A', 6, 3) + E(0, 2, 18, 10, '#E8C27E', 2) + C(18, -10, 7, '#E8C27E', 2) + Lc('M-12 10v12M12 10v12', '#C9A061', 3), 10)
      + g(178, 176, 1, C(0, 0, 32, '#F3D29A', 3) + C(0, 0, 26, '#E8C27E', 2) + P('M0 14c-18-10-18-28-4-24 4 2 4 6 4 6s0-4 4-6c14-4 14 14-4 24z', '#F3D29A', 2), -8)
      + g(54, 200, 1, R(-40, -16, 80, 32, '#A1673F', 4, 3) + R(-32, -10, 28, 20, '#8D5524', 2, 2) + R(4, -10, 28, 20, '#8D5524', 2, 2))
      + g(36, 60, 1, P('M-18-10h36c4 30-4 40-18 40s-22-10-18-40z', '#FFC107', 3) + R(-20, -16, 40, 8, '#6D4C41', 2, 2.5))),
  L('ch/zurich/landmark-chinagarten.v1.svg', 'สวนจีนริมทะเลสาบซูริก', 'The Chinese Garden by the lake', ['chinagarten', 'สวนจีน', 'chinese garden', 'zurichhorn', 'ซูริกฮอร์น', 'red pavilion', 'ศาลาสีแดง', 'zigzag bridge', 'สะพานซิกแซก', 'lotus pond'], 'หาสะพานซิกแซกที่ข้ามสระ', 'Find the zigzag bridge crossing the pond',
    // a red pavilion with curling golden-tiled roof corners standing by a pond, a white zigzag bridge across the water, round moon gate in a white wall, a weeping willow and lotus leaves
    sky('#E8F5E9') + R(-4, 60, 120, 90, '#FAFAFA', 0, 3) + P('M-8 60h128l-8-10H0z', '#455A64', 3) + C(50, 108, 30, '#E8F5E9', 3)
      + R(140, 74, 72, 70, '#E53935', 0, 3) + Lc('M150 74v70M200 74v70', '#B71C1C', 4) + P('M124 76c20-4 40-16 52-36 12 20 32 32 52 36-30 6-74 6-104 0z', '#FFC107', 3) + P('M124 76l-8-10M228 76l8-10', 'none', 3) + face(176, 112, 0.32)
      + water(150, '#4DB6AC') + P('M20 176h60l20 20h60l20-20h60', 'none', 0) + Lc('M10 178h60l20 20h60l20-20h70', '#FAFAFA', 10) + Lc('M10 172h60l20 20h60l20-20h70', '#E53935', 2.5)
      + [[50, 216], [130, 222], [200, 212]].map(([x, y]) => E(x, y, 16, 6, '#7CB342', 2)).join('') + C(130, 214, 6, '#F48FB1', 2)
      + Lc('M226 -4c-4 30-10 60-4 90', '#6D4C41', 5) + Array.from({ length: 5 }, (_, k) => Lc(`M${222 - k * 6} ${10 + k * 10}c-6 20-6 40-2 60`, '#9CCC65', 3)).join('')),
  L('ch/zurich/landmark-lindenhof.v1.svg', 'ลานเนินลินเดินโฮฟใต้ร่มต้นลินเดิน', 'The Lindenhof terrace under its linden trees', ['lindenhof', 'ลินเดินโฮฟ', 'linden trees', 'ต้นลินเดิน', 'hilltop terrace', 'ลานบนเนิน', 'old town view', 'วิวเมืองเก่า', 'limmat view', 'quiet square'], 'หาน้ำพุเล็กๆ ใต้ต้นไม้', 'Find the little fountain under the trees',
    // a gravel terrace on a hill shaded by round linden trees, a stone wall at the edge, the river and old town roofs with a green church spire far below, a small stone fountain, kids at the wall
    sky('#E1F5FE') + R(-4, 120, 248, 124, '#F3DFB2', 0, 3) + R(-4, 112, 248, 12, '#BCAAA4', 0, 3)
      + [[30, 100], [80, 104], [140, 100], [200, 104]].map(([x, y]) => R(x - 6, y - 40, 12, 40, '#6D4C41', 0, 2.5) + C(x, y - 60, 32, '#7CB342', 3) + C(x - 12, y - 66, 8, '#9CCC65', 0)).join('')
      + R(-4, 116, 248, 6, '#4FC3F7', 0, 0) + [[10, '#FFAB91'], [50, '#FFE082'], [180, '#FFAB91'], [214, '#FFE082']].map(([x, c]) => R(x, 92, 22, 20, c, 0, 2) + P(`M${x - 2} 92l13-8 13 8z`, '#B85C35', 2)).join('') + P('M110 112v-40l6-20 6 20v40z', '#4DB6AC', 2.5)
      + P('M90 200h60l-6 20h-48z', '#B0BEC5', 3) + R(114, 172, 12, 30, '#B0BEC5', 2, 2.5) + Lc('M120 172c-6-8-14-6-16 4M120 172c6-8 14-6 16 4', '#4FC3F7', 3) + face(120, 208, 0.25)
      + kid(40, 150, '#FF7043', 0.85) + kid(200, 156, '#5C6BC0', 0.85) + Array.from({ length: 6 }, (_, k) => C(20 + k * 40, 236 - (k % 2) * 6, 2, '#BCAAA4', 0)).join('')),
  L('ch/zurich/landmark-rathaus.v1.svg', 'ศาลาว่าการเมืองซูริกที่ตั้งอยู่กลางแม่น้ำ', 'Zurich\'s town hall standing in the river', ['zurich town hall', 'ศาลาว่าการซูริก', 'rathaus zurich', 'building in the river', 'ตึกกลางแม่น้ำ', 'limmat', 'แม่น้ำลิมมัต', 'stone arches', 'baroque hall', 'old town'], 'หาซุ้มโค้งที่น้ำไหลลอดใต้ตึก', 'Find the arches where the river flows right under the building',
    // a square baroque building with rows of tall windows and a hipped roof standing directly in a river on stone arches, water rushing through, a bridge beside it and old houses on the bank
    sky('#E3F2FD') + R(-4, 70, 40, 100, '#FFE0B2', 0, 3) + R(204, 80, 40, 90, '#FFCDD2', 0, 3) + water(170, '#4FC3F7')
      + R(50, 60, 140, 110, '#F5E6C8', 0, 3) + P('M44 60l20-30h112l20 30z', '#8D6E63', 3) + Array.from({ length: 2 }, (_, r) => Array.from({ length: 5 }, (_, c) => R(62 + c * 25, 74 + r * 40, 14, 28, '#81D4FA', 7, 2)).join('')).join('')
      + R(50, 160, 140, 14, '#BCAAA4', 0, 3) + [[70], [120], [170]].map(([x]) => P(`M${x - 20} 196v-22h40v22c0-16-40-16-40 0z`, '#BCAAA4', 3)).join('') + Array.from({ length: 3 }, (_, k) => Lc(`M${60 + k * 50} 200c6 6 14 6 20 0`, '#FFFFFF', 3)).join('')
      + R(190, 150, 54, 10, '#90A4AE', 0, 2.5) + face(120, 140, 0.35)),
  L('ch/zurich/landmark-containergarden.v1.svg', 'สวนลอยฟ้าบนตู้คอนเทนเนอร์ซ้อนกัน', 'The garden on top of stacked shipping containers', ['frau gerolds garten', 'สวนบนตู้คอนเทนเนอร์', 'container garden', 'shipping containers', 'ตู้คอนเทนเนอร์', 'zurich west', 'ซูริกตะวันตก', 'urban garden', 'สวนในเมือง', 'string lights'], 'หากระถางดอกทานตะวันบนหลังคาตู้', 'Find the sunflower growing on the container roof',
    // colourful corrugated shipping containers stacked in steps, plants and little trees growing on their roofs, a string of lights zigzagging between poles, a wooden picnic table with kids
    sky('#FFF8E1') + R(-4, 200, 248, 44, '#BDBDBD', 0, 3)
      + [[10, 150, 100, '#E53935'], [110, 150, 100, '#1E88E5'], [40, 100, 90, '#43A047'], [130, 100, 70, '#FFB300'], [70, 54, 80, '#AB47BC']].map(([x, y, w, c]) => R(x, y, w, 50, c, 2, 3) + Array.from({ length: Math.floor(w / 10) - 1 }, (_, k) => Lc(`M${x + 10 + k * 10} ${y + 6}v38`, '#000000', 1)).join('')).join('')
      + [[60, 54], [100, 40], [140, 54], [160, 100], [200, 150]].map(([x, y], k) => (k === 1 ? Lc(`M${x} ${y + 14}v-30`, '#7CB342', 3) + C(x, y - 20, 10, '#FFEB3B', 2.5) + C(x, y - 20, 4, '#6D4C41', 0) : C(x, y - 8, 12, '#66BB6A', 2.5) + C(x + 10, y - 4, 8, '#81C784', 2))).join('')
      + Lc('M0 20c30 16 60 16 90 0s60 16 90 0 50 10 60 6', INK, 2) + [10, 40, 70, 100, 130, 160, 190, 220].map((x, k) => C(x, 24 + (k % 2) * 8, 4, ['#FFEB3B', '#FF8A65', '#81D4FA'][k % 3], 1.5)).join('')
      + R(140, 210, 70, 8, '#A1673F', 2, 2.5) + Lc('M150 218v18M200 218v18', '#8D6E63', 4) + face(160, 176, 0.35) + kid(40, 236, '#26A69A', 0.85)),
];

export default { places: {}, items };
