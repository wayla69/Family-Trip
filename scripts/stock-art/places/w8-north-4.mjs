// Wave 8, the north (part 4): Ireland, Dublin and the west coast, Sweden, Stockholm, York and Yorkshire, the Lake District
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (ie/ireland/landmark-spire.v1.svg → ie-ireland.landmark.spire)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const X = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const tree = (x, y, s, c = '#43A047') => g(x, y, s, Lc('M0 0v-14', '#6D4C41', 4) + C(0, -24, 14, c, 2.5));
// a drystone wall running across a field
const wall = (d) => Lc(d, INK, 9) + Lc(d, '#BDBDBD', 6);

const items = [
  // ---------- Ireland
  X('ie', 'culture', 'irishdancing', 'ระบำไอริชเท้าไวในชุดปักลาย', 'Irish dancing with flying feet', ['irish dancing', 'ระบำไอริช', 'step dancing', 'เต้นสเต็ป', 'hard shoes', 'รองเท้าเต้นไม้', 'feis', 'เฟช', 'riverdance style', 'curly wig'],
    // a child mid-leap in a bright embroidered dancing dress, arms held straight down at the sides, bouncing ringlet curls, one hard shoe kicked high, little sound marks under the other foot
    E(120, 218, 70, 10, '#D7CCC8', 3) + Lc('M70 214l-8 6M78 220l-4 8M166 214l8 6', '#7E57C2', 3)
    + g(120, 120, 1, P('M-36 30l12-50h48l12 50c-20 10-52 10-72 0z', '#1E88E5', 3.5) + [[-20, 10], [0, 18], [20, 10], [-10, -6], [10, -6]].map(([x, y]) => C(x, y, 5, '#FFCA28', 1.5) + C(x, y, 2, '#E53935', 0)).join('') + Lc('M-30 24c20 8 40 8 60 0', '#FFFFFF', 3)
      + R(-18, -50, 36, 32, '#1E88E5', 6, 3) + Lc('M-18-40h36', '#FFCA28', 3) + Lc('M-18-46l-6 50M18-46l6 50', '#FFE0BD', 6) + Lc('M-18-46l-6 50M18-46l6 50', INK, 1)
      + Lc('M-10 34l-4 58M10 34c10 20 30 30 46 26', '#FFFFFF', 8) + Lc('M-10 34l-4 58M10 34c10 20 30 30 46 26', INK, 1.5) + E(-16, 94, 10, 5, INK, 0) + E(58, 60, 10, 5, INK, 0).replace('<ellipse', '<ellipse transform="rotate(-20 58 60)"')
      + C(0, -70, 18, '#FFE0BD', 3) + [-20, -14, 14, 20].map((x) => Lc(`M${x} -76c${x > 0 ? 6 : -6} 6 ${x > 0 ? -6 : 6} 12 0 18`, '#D84315', 5)).join('') + P('M-18-74c0-24 36-24 36 0z', '#D84315', 2.5) + face(0, -66, 0.36))),
  X('ie', 'transport', 'currach', 'เรือเคอร์รักผ้าใบดำของเกาะอารัน', 'A currach, the black canvas rowing boat', ['currach', 'เรือเคอร์รัก', 'naomhóg', 'เนียวโฮก', 'tarred canvas boat', 'เรือผ้าใบทาน้ำมันดิน', 'aran islands', 'หมู่เกาะอารัน', 'rowing boat', 'west of ireland'],
    // a long light black boat with a high curved bow riding a green-blue wave, two rowers pulling thin bladeless oars, white spray at the bow
    P('M8 160c40-20 70 10 110 0s70-20 114 0v40H8z', '#26A69A', 3) + Lc('M20 176c20-6 30 6 50 0M150 178c20-6 30 6 50 0', '#B2DFDB', 3)
    + g(120, 140, 1, P('M-90-6c40 10 120 10 160 0 14-4 22-18 24-28-6 20-20 40-40 44H-70c-10 0-18-8-20-16z', '#263238', 3.5) + Lc('M-84 0c50 8 120 8 150-2', '#455A64', 2) + face(0, 10, 0.3)
      + [[-40, '#E53935'], [20, '#FFCA28']].map(([x, c]) => g(x, -8, 1, C(0, -22, 8, '#FFE0BD', 2) + P('M-8 4v-18h16v18z', c, 2) + face(0, -20, 0.22)) + Lc(`M${x + 6} -16l40 36`, '#A1673F', 4) + Lc(`M${x - 6} -16l-30 36`, '#A1673F', 4)).join(''))
    + Lc('M200 120c6-10 14-12 20-6M206 132c8-4 14-2 16 4', '#FFFFFF', 3)),
  X('ie', 'culture', 'claddagh', 'แหวนคลาดดาห์ มือประคองหัวใจใส่มงกุฎ', 'The Claddagh ring: hands, heart and crown', ['claddagh ring', 'แหวนคลาดดาห์', 'hands holding a heart', 'มือประคองหัวใจ', 'friendship ring', 'แหวนมิตรภาพ', 'galway', 'กอลเวย์', 'irish ring', 'love loyalty friendship'],
    // a shiny silver ring standing up on a little velvet cushion, its front made of two little hands holding a red heart that wears a golden crown
    R(52, 170, 136, 40, '#7E57C2', 14, 3) + Lc('M60 180c20 6 100 6 120 0', '#9575CD', 3)
    + E(120, 138, 52, 44, 'none', 0) + Lc('M70 150c0-40 100-40 100 0s-100 40-100 0', INK, 15) + Lc('M70 150c0-40 100-40 100 0s-100 40-100 0', '#CFD8DC', 10) + Lc('M76 142c10-24 40-28 50-26', '#FFFFFF', 3)
    + g(120, 108, 1, P('M0 26c-30-20-34-38-22-46 10-6 18 0 22 8 4-8 12-14 22-8 12 8 8 26-22 46z', '#E53935', 3.5) + face(0, 0, 0.3)
      + P('M-34 10c-10-8-10-22 2-26l14 18zM34 10c10-8 10-22-2-26l-14 18z', '#CFD8DC', 3) + P('M-16-22l-2-16 9 8 9-12 9 12 9-8-2 16z', '#FFCA28', 3))),
  X('ie', 'food', 'irishstew', 'สตูไอริชเนื้อแกะกับมันฝรั่งและแครอท', 'Irish stew with lamb, potatoes and carrots', ['irish stew', 'สตูไอริช', 'lamb stew', 'สตูเนื้อแกะ', 'potatoes and carrots', 'มันฝรั่งกับแครอท', 'pub lunch', 'อาหารกลางวันในผับ', 'hearty soup', 'parsley'],
    // a deep earthenware bowl of thick brown stew with chunks of lamb, halved potatoes, round carrot slices and a sprinkle of parsley, steam rising and a spoon resting in it
    E(120, 196, 96, 14, '#D7CCC8', 3) + P('M28 120h184c0 50-40 76-92 76s-92-26-92-76z', '#5C8D89', 3.5) + Lc('M40 150c40 14 120 14 160 0', '#4A7A76', 2.5) + E(120, 120, 92, 22, '#A1673F', 3)
    + [[-50, -2], [-20, 6], [20, -6], [56, 2], [0, -10]].map(([x, y]) => E(120 + x, 120 + y, 12, 8, '#FFE082', 2)).join('') + [[-34, -8], [36, 8], [6, 8], [-62, 8]].map(([x, y]) => C(120 + x, 120 + y, 6, '#FB8C00', 2) + C(120 + x, 120 + y, 2, '#FFB74D', 0)).join('')
    + [[-40, 6], [44, -6], [-6, -2]].map(([x, y]) => R(110 + x, 116 + y, 14, 10, '#6D4C41', 3, 2)).join('') + [[-20, -4], [30, 2], [64, -8], [-56, -6]].map(([x, y]) => C(120 + x, 120 + y, 2, '#43A047', 0)).join('')
    + Lc('M150 116l40-50', '#B0BEC5', 6) + Lc('M150 116l40-50', INK, 1) + Lc('M80 90c-6-10 6-16 0-28M120 86c-6-10 6-16 0-28', '#FFFFFF', 5) + Lc('M80 90c-6-10 6-16 0-28M120 86c-6-10 6-16 0-28', '#B0BEC5', 1.5) + face(120, 162, 0.42)),

  // ---------- Dublin and the west coast
  L('ie/ireland/landmark-jauntingcar.v1.svg', 'นั่งรถม้าจอนติงคาร์ในคิลลาร์นีย์', 'A jaunting car ride in Killarney National Park', ['jaunting car', 'รถม้าจอนติงคาร์', 'killarney national park', 'อุทยานคิลลาร์นีย์', 'jarvey', 'คนขับรถม้า', 'horse and cart', 'รถม้า', 'muckross', 'gap of dunloe'], 'หาที่นั่งที่หันออกด้านข้างของรถม้า', 'Find the seats that face out to the sides of the cart',
    // a brown horse with a white blaze pulling a two-wheeled cart whose seats face sideways, children sitting back to back, a driver in a flat cap, green mountains and a lake behind
    sky('#E1F5FE') + P('M-4 130l50-50 40 30 50-50 60 50 48-20v40H-4z', '#66BB6A', 3) + E(180, 140, 60, 10, '#4FC3F7', 2.5) + P('M-4 150h248v94H-4z', '#9CCC65', 0) + Lc('M-4 200h248', '#BCAAA4', 22)
    + g(64, 170, 1, E(0, 0, 34, 18, '#8D5524', 3.5) + Lc('M-24 12v26M-10 14v24M14 14v24M26 12v26', '#8D5524', 7) + Lc('M-24 12v26M-10 14v24M14 14v24M26 12v26', INK, 1.2) + P('M22-10c10-20 20-30 30-26 6 6 4 16-2 22l-16 14z', '#8D5524', 3) + Lc('M44-30l2 14', '#FFFFFF', 4) + P('M28-22c-10-8-12-16-6-20', '#3E2723', 4) + C(42-0, -26, 1.8, INK, 0) + face(-6, -2, 0.3))
    + Lc('M90 168h40', '#5D4037', 4) + g(160, 168, 1, R(-36, -10, 72, 14, '#C62828', 3, 3) + R(-40, -26, 10, 20, '#A1673F', 2, 2.5) + R(30, -26, 10, 20, '#A1673F', 2, 2.5) + C(0, 18, 18, '#A1673F', 3) + C(0, 18, 4, '#5D4037', 2) + Lc('M0 0v36M-18 18h36', '#5D4037', 2)
      + kid(-20, -10, '#FFCA28', 0.85) + kid(20, -10, '#1E88E5', 0.85) + g(-34, -26, 1, C(0, -16, 8, '#FFE0BD', 2) + P('M-10-20h20l-2-6h-16z', '#795548', 2) + P('M-8 6v-16h16v16z', '#455A64', 2) + face(0, -14, 0.22)))),
  L('ie/ireland/landmark-kylemore.v1.svg', 'ไคล์มอร์แอบบีย์ริมทะเลสาบในคอนนามารา', 'Kylemore Abbey by its lake in Connemara', ['kylemore abbey', 'ไคล์มอร์แอบบีย์', 'connemara', 'คอนนามารา', 'lakeside castle', 'ปราสาทริมทะเลสาบ', 'victorian walled garden', 'สวนในกำแพง', 'pollacappul lough', 'mountain backdrop'], 'หาภาพสะท้อนของตึกในทะเลสาบ', 'Find the building’s reflection in the lake',
    // a long grey granite castle-like house with battlements and little turrets nestled at the foot of a steep wooded mountain, mirrored in a calm lake in front, rhododendron pink bushes
    sky('#E1F5FE') + P('M-4 140c30-80 90-110 140-110s90 40 108 110z', '#2E7D32', 3.5) + P('M60 100c20-30 60-50 90-40', 'none', 2)
    + R(30, 100, 180, 50, '#B0BEC5', 2, 3.5) + Array.from({ length: 15 }, (_, k) => R(30 + k * 12, 92, 8, 9, '#B0BEC5', 1, 2)).join('') + [[40, 80], [120, 70], [200, 80]].map(([x, y]) => R(x - 10, y, 20, 70, '#9E9E9E', 2, 3) + Array.from({ length: 3 }, (_, k) => R(x - 10 + k * 7.3, y - 8, 5, 9, '#9E9E9E', 1, 1.5)).join('')).join('')
    + Array.from({ length: 8 }, (_, k) => R(52 + k * 18, 114, 8, 16, '#37474F', 4, 1.5)).join('')
    + P('M-4 150h248v94H-4z', '#4FC3F7', 0) + R(30, 152, 180, 30, '#CFD8DC', 0, 0) + Lc('M30 152h180', INK, 2) + Lc('M40 166h40M120 172h70', '#E1F5FE', 3) + P('M-4 150h248', 'none', 3)
    + [[14, 146], [226, 146]].map(([x, y]) => C(x, y, 12, '#F06292', 2.5)).join('') + face(120, 126, 0.32)),
  L('ie/ireland/landmark-rockofcashel.v1.svg', 'ศิลาแห่งแคเชลบนเนินหินเขียว', 'The Rock of Cashel on its green hill', ['rock of cashel', 'ศิลาแห่งแคเชล', 'cashel', 'แคเชล', 'st patricks rock', 'เนินเซนต์แพทริก', 'medieval ruins', 'ซากยุคกลาง', 'tipperary', 'hilltop ruins'], 'หากำแพงหน้าต่างแหลมที่ไม่มีหลังคา', 'Find the pointed windows in walls with no roof',
    // a cluster of grey medieval stone ruins with tall pointed gables, roofless walls with lancet windows and a sturdy square castle block, crowning a rocky limestone outcrop on a green hill with cows-free fields
    sky('#FFF3E0') + P('M-4 190c60-30 180-30 248 0v54H-4z', '#7CB342', 3) + P('M30 196c10-40 40-60 90-60s80 20 90 60z', '#BDBDBD', 3.5) + Lc('M60 180l20-10M150 178l20 6', '#9E9E9E', 2)
    + P('M50 140V90l30-30 30 30v50z', '#A1A1A1', 3.5) + [64, 80, 96].map((x) => P(`M${x - 4} 130v-26c0-8 8-8 8 0v26z`, '#455A64', 2)).join('')
    + R(110, 80, 50, 60, '#9E9E9E', 2, 3.5) + Array.from({ length: 5 }, (_, k) => R(110 + k * 10.5, 72, 7, 9, '#9E9E9E', 1, 2)).join('') + R(124, 96, 10, 14, '#455A64', 3, 1.5) + R(140, 116, 10, 14, '#455A64', 3, 1.5)
    + P('M160 140V100l20-20 20 20v40z', '#A1A1A1', 3.5) + P('M174 130v-26c0-8 12-8 12 0v26z', '#455A64', 2) + face(135, 128, 0.3) + kid(40, 214, '#43A047', 0.9)),
  L('ie/ireland/landmark-cobh.v1.svg', 'บ้านหลากสีเรียงเหมือนไพ่ที่เมืองโคฟ', 'The deck-of-cards houses of Cobh', ['cobh', 'เมืองโคฟ', 'deck of cards houses', 'บ้านเรียงเหมือนไพ่', 'colourful terrace', 'บ้านแถวหลากสี', 'steep street', 'ถนนชัน', 'cork harbour', 'west view'], 'หาบ้านสีต่างๆ ที่เรียงลดหลั่นตามถนนชัน', 'Find the coloured houses stepping down the steep street',
    // a very steep street with a row of tall narrow houses in bright colours stepping down it one below the other like a fanned-out deck of cards, the harbour water at the bottom
    sky('#E1F5FE') + P('M-4 220L244 70v174H-4z', '#B0BEC5', 3.5) + P('M-4 220h248v24H-4z', '#1E88E5', 0)
    + ['#E53935', '#FDD835', '#43A047', '#1E88E5', '#8E24AA', '#FB8C00', '#F06292', '#26A69A'].map((c, k) => { const x = 4 + k * 29, base = 214 - k * 18.5; return R(x, base - 70, 29, 70, c, 1, 3) + P(`M${x} ${base - 70}l14.5-10 14.5 10z`, '#455A64', 2.5) + R(x + 9, base - 56, 11, 12, '#FFFFFF', 1, 1.5) + R(x + 9, base - 32, 11, 18, '#FFFFFF', 1, 1.5); }).join('')
    + face(130, 156, 0.3) + g(200, 232, 1, P('M-20-4h40l-6 10h-28z', '#FFFFFF', 2.5)) + kid(70, 230, '#7E57C2', 0.8)),
  L('ie/ireland/landmark-spire.v1.svg', 'เดอะสไปร์ เข็มเหล็กสูงกลางถนนโอคอนเนลล์', 'The Spire, the giant steel needle on O’Connell Street', ['the spire', 'เดอะสไปร์', 'spire of dublin', 'เข็มเหล็กดับลิน', "o'connell street", 'ถนนโอคอนเนลล์', 'monument of light', 'อนุสรณ์แห่งแสง', 'meeting point', 'tallest sculpture'], 'หาปลายเข็มที่เรืองแสงบนยอด', 'Find the glowing tip at the very top of the needle',
    // an enormously tall, thin shining steel needle rising from a busy street between rows of Georgian buildings, its tip glowing in the sky, children craning their heads back
    sky('#E8EAF6') + R(-4, 120, 70, 110, '#C0603A', 1, 3) + R(174, 110, 70, 120, '#FFCC80', 1, 3) + [[6, 136], [34, 136], [6, 170], [34, 170], [184, 128], [212, 128], [184, 164], [212, 164]].map(([x, y]) => R(x, y, 16, 22, '#FFFFFF', 1, 2)).join('')
    + P('M112 216L119 6h2l7 210z', '#CFD8DC', 3) + Lc('M121 30l3 180', '#FFFFFF', 2) + C(120, 8, 6, '#FFF59D', 0) + Lc('M108 10l-8-4M132 10l8-4M120-2v-6', '#FFF59D', 2.5)
    + R(-4, 216, 248, 28, '#90A4AE', 0, 3) + face(120, 180, 0.22) + kid(84, 236, '#43A047', 0.9) + kid(156, 236, '#FFCA28', 0.9)),

  // ---------- Sweden
  X('se', 'food', 'semla', 'เซมลา ขนมปังกระวานไส้ครีม', 'Semla, the cream-filled cardamom bun', ['semla', 'เซมลา', 'semlor', 'เซมลอร์', 'cream bun', 'ขนมปังไส้ครีม', 'almond paste', 'อัลมอนด์บด', 'fat tuesday', 'cardamom bun'],
    // a round golden cardamom bun with its top cut off, a thick swirl of whipped cream and a peek of almond paste in between, the little lid perched on top dusted with icing sugar
    E(120, 194, 90, 16, '#FFFFFF', 3) + P('M44 180c-6-40 20-60 76-60s82 20 76 60c-20 10-132 10-152 0z', '#E0A458', 3.5) + E(120, 126, 70, 14, '#C8A165', 2.5) + E(120, 124, 44, 8, '#D7B47E', 0)
    + P('M50 126c-8-24 14-40 30-30 4-16 26-20 40-10 14-10 36-6 40 10 16-10 38 6 30 30-30 10-110 10-140 0z', '#FFFFFF', 3) + Lc('M70 110c10-6 20-6 26 0M130 106c10-6 20-6 26 0', '#ECEFF1', 2)
    + g(122, 84, 1, P('M-36 6c0-24 72-24 72 0-20 6-52 6-72 0z', '#E0A458', 3) + [[-16, -6], [0, -10], [16, -6], [-6, 0], [10, 0]].map(([x, y]) => C(x, y, 2.4, '#FFFFFF', 0)).join('')) + face(120, 156, 0.42)),
  X('se', 'food', 'knackebrod', 'แคร็กเกอร์ข้าวไรย์กลมมีรูตรงกลาง', 'Knäckebröd, round rye crispbread with a hole', ['knäckebröd', 'เคนเนกเกอเบรอด', 'crispbread', 'ขนมปังกรอบ', 'rye crispbread', 'ขนมปังไรย์กรอบ', 'bread with a hole', 'ขนมปังมีรู', 'swedish breakfast', 'cheese slicer'],
    // big round crispbreads with a hole in the middle stacked on a wooden pole, and a broken piece in front topped with butter, cheese slices and cucumber, a cheese slicer beside it
    E(120, 204, 96, 12, '#C8A165', 3) + Lc('M70 204V40', '#8D6E63', 7) + Lc('M70 204V40', INK, 1.2)
    + [0, 1, 2].map((k) => g(70, 120 + k * 22, 1, E(0, 0, 54, 14, '#D9A85C', 3) + E(0, -2, 10, 4, '#A1673F', 2) + [[-30, -2], [-16, 4], [18, -4], [34, 2]].map(([x, y]) => C(x, y, 1.6, '#A1673F', 0)).join(''))).join('')
    + g(170, 168, 1, P('M-46 20l10-40 70 4 10 34z', '#D9A85C', 3) + Array.from({ length: 12 }, (_, k) => C(-36 + (k % 6) * 14, -10 + Math.floor(k / 6) * 18, 1.6, '#A1673F', 0)).join('') + P('M-34 4l6-20 54 4 4 14z', '#FFE082', 2.5) + [[-18, -6], [8, -4]].map(([x, y]) => C(x, y, 7, '#AED581', 2) + C(x, y, 3, '#F1F8E9', 0)).join('') + face(-4, 12, 0.3))
    + g(206, 110, 1, R(-6, 0, 12, 34, '#8D6E63', 4, 2.5) + P('M-14 0l-2-20h32l-2 20z', '#B0BEC5', 2.5) + Lc('M-12-10h24', INK, 1.5), 10)),
  X('se', 'culture', 'falured', 'บ้านไม้สีแดงฟาลูขอบขาวริมทะเลสาบ', 'A Falu-red wooden cottage by a lake', ['falu red', 'สีแดงฟาลู', 'red wooden cottage', 'บ้านไม้สีแดง', 'stuga', 'สตูกา', 'summer house', 'บ้านพักฤดูร้อน', 'white corners', 'lakeside cabin'],
    // a little deep-red wooden cottage with crisp white corners, window frames and a white porch, a grass meadow with daisies, a wooden jetty and a calm blue lake beside it, birch trees
    C(120, 120, 104, '#E1F5FE', 3.5) + P('M16 140h208v10c-20 60-180 60-208 0z', '#9CCC65', 0) + P('M150 150c20-6 60-6 74 0v10c-20 30-60 40-80 40z', '#4FC3F7', 0) + R(140, 160, 50, 6, '#8D6E63', 1, 2)
    + R(50, 92, 92, 66, '#B71C1C', 2, 3.5) + Array.from({ length: 6 }, (_, k) => Lc(`M${62 + k * 14} 96v58`, '#8E1414', 1.5)).join('') + P('M42 94l54-40 54 40z', '#37474F', 3.5) + Lc('M52 94v64M140 94v64', '#FFFFFF', 5)
    + R(64, 108, 22, 22, '#B3E5FC', 1, 3) + Lc('M75 108v22M64 119h22', '#FFFFFF', 3) + R(104, 118, 22, 40, '#FFFFFF', 2, 3) + R(108, 122, 14, 32, '#B71C1C', 1, 1.5)
    + g(32, 148, 1, Lc('M0 0v-60', '#FFFFFF', 7) + Lc('M0 0v-60', INK, 1.2) + Lc('M-3-20h6M-3-40h6', INK, 2) + C(0, -66, 16, '#AED581', 2.5))
    + [[70, 180], [100, 186], [130, 178], [56, 196]].map(([x, y]) => C(x, y, 3.5, '#FFFFFF', 1.5) + C(x, y, 1.4, '#FFCA28', 0)).join('') + C(120, 120, 104, 'none', 3.5) + face(76, 142, 0.25)),
  X('se', 'food', 'lordagsgodis', 'ลูกกวาดวันเสาร์ ตักใส่ถุงเอง', 'Lördagsgodis, Saturday pick-and-mix sweets', ['lördagsgodis', 'เลอร์ดากส์โกดิส', 'saturday sweets', 'ขนมวันเสาร์', 'pick and mix', 'ตักลูกกวาดเอง', 'lösgodis', 'เลิสโกดิส', 'candy wall', 'paper bag of sweets'],
    // a striped paper bag stuffed with colourful jelly sweets: sour pink-and-white, a gummy car, foam bananas, liquorice wheels, a little scoop pouring more in
    g(120, 150, 1, P('M-50-40h100l-10 90h-80z', '#FFFFFF', 3.5) + [-34, -14, 6, 26].map((x) => Lc(`M${x} -38l${-x * 0.12} 86`, '#F06292', 6)).join('') + P('M-50-40h100l-10 90h-80z', 'none', 3.5) + face(0, 18, 0.42))
    + [[86, 104, '#F06292'], [110, 96, '#FFEB3B'], [136, 100, '#66BB6A'], [156, 108, '#E53935'], [100, 112, '#FF7043']].map(([x, y, c]) => E(x, y, 12, 9, c, 2.5)).join('')
    + g(126, 84, 1, E(0, 0, 14, 6, '#FFEE58', 2.5).replace('<ellipse', '<ellipse transform="rotate(-20)"')) + g(148, 86, 1, C(0, 0, 9, '#263238', 2.5) + Lc('M0 0m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0', '#455A64', 2))
    + g(92, 86, 1, C(0, 0, 8, '#F8BBD0', 2) + C(0, 0, 3, '#FFFFFF', 0))
    + g(190, 52, 1, P('M-20 0h30l6 22h-42z', '#CFD8DC', 3) + Lc('M16 10l20-20', '#90A4AE', 6), 30) + [[176, 80, '#AB47BC'], [168, 92, '#4FC3F7']].map(([x, y, c]) => C(x, y, 5, c, 2)).join('')),

  // ---------- Stockholm
  L('se/stockholm/landmark-vasamuseum.v1.svg', 'พิพิธภัณฑ์วาซาที่มีเสากระโดงโผล่หลังคา', 'The Vasa Museum with masts poking through its roof', ['vasa museum', 'พิพิธภัณฑ์วาซา', 'vasamuseet', 'วาซามูเซเอต', 'old ship museum', 'พิพิธภัณฑ์เรือโบราณ', 'masts on the roof', 'เสากระโดงบนหลังคา', 'djurgården', 'ship from the seabed'], 'หาเสากระโดงเรือสามต้นบนหลังคา', 'Find the three ship masts sticking out of the roof',
    // a big dark copper-roofed museum building on the waterfront, three thin outline masts with rigging rising out of its roof, the stern of an old carved wooden ship glimpsed through a glass wall
    sky('#E3F2FD') + P('M-4 190h248v54H-4z', '#1E88E5', 0) + Lc('M30 214h40M150 222h50', '#90CAF9', 3)
    + P('M14 190V110l50-30h120l42 30v80z', '#5D4037', 3.5) + P('M14 110l50-30h120l42 30z', '#00897B', 3) + Lc('M40 120v70M80 120v70M160 120v70M200 120v70', '#4E342E', 2)
    + [[70, 20], [118, 6], [166, 30]].map(([x, top]) => Lc(`M${x} 84V${top}`, '#A1673F', 4) + Lc(`M${x - 18} ${top + 20}h36M${x - 14} ${top + 40}h28`, '#A1673F', 3) + Lc(`M${x} ${top}l-22 64M${x} ${top}l22 64`, '#8D6E63', 1)).join('')
    + R(96, 140, 60, 50, '#B3E5FC', 2, 3) + g(126, 176, 1, P('M-22 14l4-30h40l-6 30z', '#8D5524', 2.5) + Lc('M-16-8h32M-18 0h36', '#FFCA28', 2)) + face(56, 158, 0.38)),
  L('se/stockholm/landmark-drottningholm.v1.svg', 'พระราชวังดรอตนิงโฮล์มกับสวนน้ำพุ', 'Drottningholm Palace and its fountain garden', ['drottningholm palace', 'พระราชวังดรอตนิงโฮล์ม', 'royal residence', 'ที่ประทับของราชวงศ์', 'baroque garden', 'สวนบาโรก', 'lake mälaren', 'ทะเลสาบเมลาเรน', 'palace by the water', 'clipped hedges'], 'หาพุ่มไม้ตัดเป็นกรวยเรียงแถว', 'Find the hedges clipped into little cones in rows',
    // a long pale-yellow palace with a green copper roof and a central dome, wings either side, a formal garden in front with clipped cone hedges, flower beds and a splashing fountain
    sky('#E1F5FE') + R(10, 90, 220, 60, '#FFE082', 2, 3.5) + P('M6 90l14-16h200l14 16z', '#4DB6AC', 3) + P('M96 74c0-30 48-30 48 0z', '#4DB6AC', 3) + C(120, 38, 4, '#FFCA28', 1.5)
    + Array.from({ length: 2 }, (_, r) => Array.from({ length: 10 }, (_, k) => R(20 + k * 21, 100 + r * 24, 10, 16, '#FFFFFF', 3, 1.5)).join('')).join('') + R(108, 124, 24, 26, '#6D4C41', 4, 2.5)
    + P('M-4 150h248v94H-4z', '#9CCC65', 0) + Lc('M120 150v94', '#E8D29A', 18) + Lc('M30 196h180', '#E8D29A', 10)
    + [40, 80, 160, 200].map((x) => [170, 220].map((y) => P(`M${x} ${y - 24}l10 24h-20z`, '#2E7D32', 2.5)).join('')).join('')
    + g(120, 200, 1, E(0, 6, 26, 8, '#4FC3F7', 3) + Lc('M0 0c-4-14 4-24 0-34M0-34c-8-4-12 4-16 0M0-34c8-4 12 4 16 0', '#4FC3F7', 4)) + face(120, 106, 0.3)),
  L('se/stockholm/landmark-trotzigsgrand.v1.svg', 'ตรอกที่แคบที่สุดในกัมลาสตาน', 'Mårten Trotzigs gränd, the narrowest lane', ['mårten trotzigs gränd', 'ตรอกมอร์เทินทรอตซิกส์', 'narrowest street', 'ตรอกที่แคบที่สุด', 'gamla stan alley', 'ตรอกกัมลาสตาน', 'stepped lane', 'ตรอกขั้นบันได', 'touch both walls', '90 centimetres'], 'หาเด็กที่กางแขนแตะผนังได้ทั้งสองข้าง', 'Find the child touching both walls at once',
    // a very narrow lane climbing up worn stone steps between two tall ochre and orange plastered walls, an old lamp on an iron bracket, a child in the middle touching both walls with outstretched hands
    sky('#FFF8E1') + R(-4, -4, 98, 248, '#E6A55C', 0, 3.5) + R(146, -4, 98, 248, '#F2C14E', 0, 3.5) + [[20, 40], [56, 40], [20, 110], [56, 110], [168, 60], [204, 60], [168, 140], [204, 140]].map(([x, y]) => R(x, y, 20, 28, '#8D6E63', 2, 2)).join('')
    + P('M94-4h52v248H94z', '#E1F5FE', 0) + Array.from({ length: 9 }, (_, k) => R(94, 60 + k * 20, 52, 20, k % 2 ? '#BDBDBD' : '#CFCFCF', 0, 2)).join('') + Lc('M94-4v248M146-4v248', INK, 3.5)
    + Lc('M146 40h-14v8', INK, 2.5) + P('M128 48h8l2 12h-12z', '#FFF59D', 2)
    + g(120, 200, 1, Lc('M-6 0v20M6 0v20', '#1E88E5', 6) + R(-10, -30, 20, 30, '#E53935', 4, 2.5) + Lc('M-10-24l-16-6M10-24l16-6', '#FFE0BD', 5) + C(0, -42, 11, '#FFE0BD', 2.5) + face(0, -40, 0.28)) + face(44, 186, 0.38)),
  L('se/stockholm/landmark-stadsbiblioteket.v1.svg', 'ห้องสมุดเมืองสต็อกโฮล์มที่หนังสือเรียงเป็นวงกลม', 'Stockholm City Library and its round wall of books', ['stockholm city library', 'ห้องสมุดเมืองสต็อกโฮล์ม', 'stadsbiblioteket', 'สตัดส์บิบลิโอเตเกต', 'round book hall', 'ห้องหนังสือทรงกลม', 'orange building', 'ตึกสีส้ม', 'asplund rotunda', '360 books'], 'หาชั้นหนังสือที่วนรอบห้องเป็นวงกลม', 'Find the bookshelves that go all the way round the room',
    // a round cylinder of a hall rising out of an orange box-shaped building, cut open to show the inside: three rings of colourful book spines all the way round and a child reading in the middle
    sky('#E3F2FD') + R(10, 140, 220, 80, '#F4A259', 2, 3.5) + Array.from({ length: 2 }, (_, r) => Array.from({ length: 8 }, (_, k) => R(20 + k * 27, 154 + r * 30, 12, 20, '#FFF8E1', 1, 1.5)).join('')).join('')
    + R(56, 30, 128, 120, '#F7B26A', 2, 3.5) + E(120, 30, 64, 14, '#FFE0B2', 3)
    + [52, 82, 112].map((y) => R(66, y, 108, 24, '#FFF3E0', 2, 2.5) + Array.from({ length: 12 }, (_, k) => R(68 + k * 8.8, y + 3 + (k % 3), 7, 20 - (k % 3), ['#E53935', '#1E88E5', '#FDD835', '#43A047', '#8E24AA', '#FB8C00'][(k + y) % 6], 1, 1.2)).join('')).join('')
    + R(-4, 220, 248, 24, '#B0BEC5', 0, 3) + g(120, 136, 1, C(0, -10, 8, '#FFE0BD', 2) + P('M-12 4l12-6 12 6v-12l-12 4-12-4z', '#E53935', 2) + face(0, -8, 0.2)) + face(120, 186, 0.38)),
  L('se/stockholm/landmark-sergelstorg.v1.svg', 'ลานเซอร์เกลส์ทอร์กลายสามเหลี่ยมขาวดำ', 'Sergels torg and its black-and-white triangles', ['sergels torg', 'ลานเซอร์เกลส์ทอร์ก', 'plattan', 'แพลตตัน', 'black and white pattern', 'ลายขาวดำ', 'glass column', 'เสาแก้ว', 'city centre square', 'kulturhuset'], 'หาเสาแก้วสูงกลางวงน้ำพุ', 'Find the tall glass column in the middle of the fountain',
    // a sunken square paved with a bold pattern of black and white triangles, a round pool above it with a tall slim glowing glass column in the middle, a long glass culture-house building behind
    sky('#E1F5FE') + R(-4, 60, 248, 60, '#B3E5FC', 2, 3) + Array.from({ length: 10 }, (_, k) => Lc(`M${10 + k * 24} 62v56`, '#E1F5FE', 2)).join('') + Lc('M-4 90h248', '#81D4FA', 2)
    + R(-4, 140, 248, 104, '#FFFFFF', 0, 3) + Array.from({ length: 5 }, (_, r) => Array.from({ length: 9 }, (_, k) => P(`M${-4 + k * 28} ${140 + r * 21}l14 21 14-21z`, '#263238', 0)).join('')).join('') + R(-4, 140, 248, 104, 'none', 0, 3)
    + E(120, 132, 70, 14, '#4FC3F7', 3) + R(112, 22, 16, 108, '#E1F5FE', 6, 3) + Lc('M116 30v90M124 30v90', '#B3E5FC', 2) + Array.from({ length: 5 }, (_, k) => P(`M112 ${36 + k * 18}l16 8`, 'none', 1.5)).join('')
    + face(120, 76, 0.22) + kid(40, 132, '#FFCA28', 0.9) + kid(200, 132, '#E53935', 0.9)),

  // ---------- York and Yorkshire
  L('gb/york/landmark-castlehoward.v1.svg', 'คาสเซิลฮาวเวิร์ดโดมใหญ่กับน้ำพุ', 'Castle Howard, the great domed house and its fountain', ['castle howard', 'คาสเซิลฮาวเวิร์ด', 'stately home', 'คฤหาสน์ใหญ่', 'painted dome', 'โดมทาสี', 'atlas fountain', 'น้ำพุแอตลาส', 'north yorkshire', 'adventure playground'], 'หาโดมสีทองกลางคฤหาสน์', 'Find the golden-topped dome in the middle of the house',
    // a grand honey-stone house with a tall central dome and lantern, long wings with columns either side, a big round fountain pool with leaping jets on the lawn in front
    sky('#E3F2FD') + R(10, 100, 220, 64, '#EED9A4', 2, 3.5) + Array.from({ length: 2 }, (_, r) => Array.from({ length: 10 }, (_, k) => R(18 + k * 21, 110 + r * 26, 10, 16, '#FFF8E1', 3, 1.5)).join('')).join('')
    + R(94, 70, 52, 94, '#EED9A4', 2, 3) + [102, 114, 126, 138].map((x) => R(x - 2.5, 112, 5, 52, '#FFF8E1', 1, 1.5)).join('') + P('M88 70h64l-32-22z', '#EED9A4', 3)
    + R(104, 30, 32, 22, '#EED9A4', 2, 3) + P('M100 30c0-24 40-24 40 0z', '#90A4AE', 3) + R(115, 2, 10, 10, '#EED9A4', 1, 2) + C(120, 0, 4, '#FFCA28', 1.5)
    + P('M-4 164h248v80H-4z', '#8BC34A', 0) + E(120, 206, 70, 18, '#4FC3F7', 3.5) + E(120, 204, 20, 8, '#BDBDBD', 2.5)
    + Lc('M120 196c-2-16 0-30 0-40M120 160c-12-8-20 0-26 10M120 160c12-8 20 0 26 10M104 196c-10-10-14-20-12-30M136 196c10-10 14-20 12-30', '#B3E5FC', 4) + face(120, 140, 0.3)),
  L('gb/york/landmark-cattrail.v1.svg', 'ตามหาแมวปั้นบนตึกในเมืองยอร์ก', 'The York cat trail: little cat statues on the buildings', ['york cat trail', 'เส้นทางตามหาแมว', 'cat statues', 'รูปปั้นแมว', 'cats on buildings', 'แมวบนตึก', 'lucky cats', 'แมวนำโชค', 'old york lanes', 'spot the cats'], 'หาแมวตัวเล็กที่นั่งอยู่บนขอบหน้าต่างและหลังคา', 'Find the little cats sitting on the window ledges and roofs',
    // old black-and-white timber-framed houses leaning over a lane, with little black cat statues perched on a window ledge, a gutter and a roof ridge, a child pointing up at one
    sky('#E8EAF6') + R(10, 50, 100, 170, '#FFF8E1', 2, 3.5) + R(120, 70, 110, 150, '#FFF3E0', 2, 3.5) + Lc('M10 100h100M10 150h100M30 50v170M90 50v170M10 50l40 50M110 50l-40 50M120 120h110M120 170h110M150 70v150M200 70v150', '#3E2723', 4)
    + P('M4 50l56-34 56 34zM114 70l61-30 61 30z', '#6D4C41', 3) + [[44, 116], [132, 186], [170, 128]].map(([x, y]) => R(x, y, 26, 22, '#90CAF9', 1, 2)).join('')
    + [[56, 118, 0], [76, 32, 1], [182, 122, 0], [150, 64, 1]].map(([x, y], i) => g(x, y, 1, E(0, -6, 8, 9, '#263238', 2.5) + C(0, -18, 7, '#263238', 2.5) + P('M-6-22l-2-8 6 4zM6-22l2-8-6 4z', '#263238', 2) + Lc('M8-2c8 0 10-8 6-12', '#263238', 3) + C(-2.5, -18, 1.4, '#FFEB3B', 0) + C(2.5, -18, 1.4, '#FFEB3B', 0))).join('')
    + R(-4, 220, 248, 24, '#B0BEC5', 0, 3) + g(110, 234, 1, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#E53935', 2) + face(0, -18, 0.22) + Lc('M6-10l20-20', '#FFE0BD', 4)) + face(60, 176, 0.35)),
  L('gb/york/landmark-fieldbarn.v1.svg', 'โรงนาหินกลางทุ่งในหุบเขาสเวลเดล', 'Stone field barns in Swaledale', ['swaledale barns', 'โรงนาสเวลเดล', 'field barns', 'โรงนากลางทุ่ง', 'yorkshire dales', 'หุบเขายอร์กเชียร์', 'drystone walls', 'กำแพงหินเรียง', 'muker meadows', 'hay meadows'], 'หาโรงนาหินเล็กๆ ที่อยู่ในแต่ละช่องทุ่ง', 'Find a little stone barn in each walled field',
    // a green dale criss-crossed by grey drystone walls making a patchwork of fields, a small square stone barn with a stone roof in each field, buttercups and a river along the bottom
    sky('#E3F2FD') + P('M-4 90c60-30 180-30 248 0v154H-4z', '#7CB342', 3) + P('M-4 140c80-20 180-20 248 0v104H-4z', '#9CCC65', 0) + Lc('M-4 226c60-10 120 10 248-6', '#4FC3F7', 10)
    + wall('M-4 130c80-16 170-16 248 0') + wall('M-4 186c80-12 170-12 248 0') + wall('M70 96l-6 124M160 94l10 124')
    + [[30, 120], [116, 116], [204, 122], [36, 176], [120, 172], [206, 178]].map(([x, y], i) => g(x, y, i === 4 ? 1.1 : 0.8, R(-18, -22, 36, 22, '#BDBDBD', 1, 2.5) + P('M-22-22l22-14 22 14z', '#78909C', 2.5) + R(-5, -14, 10, 14, '#5D4037', 1, 1.5))).join('')
    + [[90, 150], [100, 200], [190, 150], [50, 206], [140, 206]].map(([x, y]) => C(x, y, 3, '#FFEB3B', 1.2)).join('') + face(120, 150, 0.35) + kid(90, 214, '#E53935', 0.8)),
  L('gb/york/landmark-whitbykippers.v1.svg', 'โรงรมควันปลาคิปเปอร์ที่วิตบี', 'The old kipper smokehouse at Whitby', ['whitby kippers', 'ปลาคิปเปอร์วิตบี', 'smokehouse', 'โรงรมควัน', 'smoked herring', 'ปลาเฮร์ริงรมควัน', 'fortunes kippers', 'ร้านรมควันเก่า', 'golden kippers', 'oak smoke'], 'หาปลาสีทองที่แขวนเรียงเป็นแถวในควัน', 'Find the golden fish hanging in rows in the smoke',
    // inside a dark old smokehouse, rows of split golden-brown kipper fish hanging from wooden rails, wisps of oak smoke curling up from a low fire, a little window letting in light
    sky('#4E342E') + R(160, 30, 44, 40, '#FFE082', 2, 3) + Lc('M182 30v40M160 50h44', '#4E342E', 3)
    + [60, 110].map((y) => Lc(`M-4 ${y}h248`, '#8D6E63', 7) + Lc(`M-4 ${y}h248`, INK, 1.2) + [20, 50, 80, 110, 140].map((x) => g(x, y + 4, 1, P('M-8 0h16l-2 30c-2 6-10 6-12 0z', '#D9862F', 2.5) + P('M-6 30l-6 10h24l-6-10z', '#B9622A', 2) + Lc('M0 4v24', '#F6CB86', 2))).join('')).join('')
    + P('M60 236c10-20 30-24 60-24s50 4 60 24z', '#3E2723', 3) + P('M100 220c-4-10 6-18 8-26 4 8 12 14 8 26zM126 222c-2-8 4-14 6-20 2 6 8 10 6 20z', '#FF7043', 2)
    + Lc('M110 190c-10-20 10-30 0-50s10-30 0-50M140 190c-10-20 10-30 0-50', '#CFD8DC', 6) + face(80, 130, 0.25) + kid(200, 214, '#FFCA28', 0.9)),
  L('gb/york/landmark-bemptongannets.v1.svg', 'นกกานเน็ตหัวเหลืองบนหน้าผาชอล์กเบมป์ตัน', 'Gannets on the chalk cliffs at Bempton', ['bempton cliffs', 'หน้าผาเบมป์ตัน', 'gannets', 'นกกานเน็ต', 'seabird city', 'เมืองนกทะเล', 'chalk cliffs', 'หน้าผาชอล์ก', 'flamborough', 'cliff viewpoint'], 'หานกสีขาวหัวเหลืองที่นั่งบนชั้นหิน', 'Find the white birds with golden heads on the cliff ledges',
    // tall white chalk cliffs with narrow ledges crowded with big white gannets with buttery-yellow heads and black wingtips, more gliding over the sea, a wooden viewing platform with children at the top
    sky('#E1F5FE') + P('M-4 180h248v64H-4z', '#1E88E5', 0) + P('M90 -4h154v248H90c10-40-10-80 10-120S90 40 90-4z', '#F5F5F5', 3.5) + [70, 120, 170, 210].map((y) => Lc(`M${100 - (y % 3) * 4} ${y}h140`, '#BDBDBD', 3)).join('')
    + [[120, 66], [160, 66], [200, 66], [140, 116], [186, 116], [124, 166], [170, 166], [214, 166]].map(([x, y], i) => g(x, y, 0.8, E(0, -10, 16, 10, '#FFFFFF', 2.5) + C(10, -22, 8, '#FFE082', 2.5) + P('M16-22l14 4-14 2z', '#B0BEC5', 2) + P('M-14-10l-10 6 8 2z', '#263238', 1.5) + (i === 3 ? face(10, -22, 0.2) : ''))).join('')
    + [[40, 80, 1], [60, 130, -1]].map(([x, y, d]) => g(x, y, 1, P('M-30 0c10-8 20-8 30 0 10-8 20-8 30 0-10 4-20 4-30 2-10 2-20 2-30-2z', '#FFFFFF', 2.5) + Lc('M-30 0l-6 4M30 0l6 4', INK, 3) + C(4, -2, 5, '#FFE082', 2))).join('')
    + R(170, -4, 74, 20, '#A1673F', 1, 3) + kid(190, -2, '#E53935', 0.7) + kid(220, -2, '#FFCA28', 0.7)),
  L('gb/york/landmark-ropemakers.v1.svg', 'ช่างฟั่นเชือกที่ฮอวส์ในเดลส์', 'The ropemakers of Hawes twisting a rope', ['hawes ropemakers', 'ช่างฟั่นเชือกฮอวส์', 'rope making', 'ฟั่นเชือก', 'twisting rope', 'บิดเชือก', 'wensleydale', 'เวนส์ลีย์เดล', 'colourful skipping ropes', 'old craft'], 'หาเชือกสามสีที่ถูกบิดเป็นเกลียว', 'Find the three-coloured rope being twisted into a spiral',
    // a long workshop with three coloured strands stretched from a hand-cranked wooden wheel with hooks, twisting together into one striped rope, a child turning the crank and coils of finished ropes on hooks
    sky('#FFF3E0') + R(-4, 30, 248, 20, '#8D6E63', 0, 3) + [30, 70, 110, 150, 190, 230].map((x) => Lc(`M${x} 50v14`, INK, 2) + C(x, 74, 10, ['#E53935', '#1E88E5', '#FDD835', '#43A047', '#8E24AA', '#FB8C00'][x % 6], 3) + C(x, 74, 4, '#FFF3E0', 0)).join('')
    + R(-4, 200, 248, 44, '#BCAAA4', 0, 3)
    + g(40, 150, 1, R(-8, -40, 16, 90, '#A1673F', 2, 3) + C(0, -20, 24, '#C08A55', 3) + [0, 1, 2].map((k) => C(16 * Math.cos(k * 2.1), -20 + 16 * Math.sin(k * 2.1), 3, '#5D4037', 1.5)).join('') + Lc('M0-20l24 20', '#5D4037', 4) + C(26, 2, 4, '#5D4037', 1.5))
    + (() => { let d = ''; for (let k = 0; k < 3; k++) { const c = ['#E53935', '#FDD835', '#1E88E5'][k]; let p = `M56 ${124 + (k - 1) * 8}`; for (let x = 70; x <= 220; x += 14) { const amp = 8 * (1 - (x - 56) / 200); p += `L${x} ${(130 + Math.sin(x / 7 + k * 2.1) * amp + (k - 1) * 8 * (1 - (x - 56) / 170)).toFixed(1)}`; } d += Lc(p, INK, 6) + Lc(p, c, 3.5); } return d; })()
    + R(214, 118, 20, 26, '#8D6E63', 2, 2.5) + kid(66, 200, '#FFCA28', 0.9) + face(40, 160, 0.3)),

  // ---------- The Lake District
  L('gb/lakes/landmark-stickytoffee.v1.svg', 'พุดดิ้งสติกกีท็อฟฟีราดซอสคาราเมล', 'Sticky toffee pudding from Cartmel', ['sticky toffee pudding', 'พุดดิ้งสติกกีท็อฟฟี', 'cartmel', 'คาร์ตเมล', 'toffee sauce', 'ซอสท็อฟฟี', 'date sponge', 'เค้กอินทผลัม', 'custard', 'village shop pudding'], 'หาซอสท็อฟฟีที่ไหลเยิ้มลงจากพุดดิ้ง', 'Find the toffee sauce dripping down the pudding',
    // a warm dark sponge pudding on a plate soaked with glossy toffee sauce running down its sides into a puddle, a scoop of vanilla custard beside it and a jug of more sauce
    sky('#FFF8E1') + E(110, 186, 96, 22, '#FFFFFF', 3) + E(110, 184, 80, 15, '#E3F2FD', 0) + E(110, 182, 66, 12, '#A0612A', 2)
    + P('M60 176v-50c0-30 100-30 100 0v50c-20 8-80 8-100 0z', '#6D3D1E', 3.5) + P('M60 128c0-22 100-22 100 0-6 10-4 20-10 24-4-12-8-12-12 0-6-8-12-8-16 4-6-10-10-10-14 0-8-8-14-8-20 0-6-10-8-14-14-6-4-10-10-14-14-22z', '#C27C2C', 3)
    + [[78, 120], [110, 112], [140, 120]].map(([x, y]) => E(x, y, 6, 3, '#E9A64C', 0)).join('') + face(110, 160, 0.42)
    + g(196, 150, 1, P('M-16-20h28l4 40h-36z', '#FFFFFF', 3) + E(-2, -20, 14, 4, '#C27C2C', 2) + P('M12-12c10 0 10 16 0 16', 'none', 3))
    + E(46, 188, 14, 7, '#FFF59D', 2.5)),
  L('gb/lakes/landmark-hardknottfort.v1.svg', 'ซากป้อมโรมันฮาร์ดน็อตบนช่องเขา', 'Hardknott Roman Fort high on the mountain pass', ['hardknott roman fort', 'ป้อมโรมันฮาร์ดน็อต', 'mediobogdum', 'เมดิโอบ็อกดุม', 'hardknott pass', 'ช่องเขาฮาร์ดน็อต', 'roman ruins', 'ซากโรมัน', 'eskdale', 'steepest road'], 'หากำแพงหินเตี้ยๆ ที่เป็นสี่เหลี่ยมบนภูเขา', 'Find the low stone walls making a square on the mountain',
    // the low square outline of an old stone fort with rounded corners and gateways sitting on a grassy shelf high on a steep pass, fells all around and a twisting road climbing up
    sky('#E3F2FD') + P('M-4 100l50-60 50 40 50-50 60 50 38-20v60H-4z', '#78909C', 3) + P('M-4 110c80-30 170-30 248 0v134H-4z', '#7CB342', 3)
    + g(124, 160, 1, P('M-70-30h140v60h-140z', '#9CCC65', 0) + R(-70, -30, 140, 60, 'none', 14, 0) + Lc('M-60-30h50M10-30h50M-60 30h50M10 30h50M-70-20v40M70-20v40', INK, 12) + Lc('M-60-30h50M10-30h50M-60 30h50M10 30h50M-70-20v40M70-20v40', '#BDBDBD', 8)
      + R(-30, -10, 24, 20, '#BDBDBD', 1, 3) + face(30, 0, 0.32))
    + Lc('M20 244c20-30 0-40 30-60s-10-30 20-50', '#B0BEC5', 9) + Lc('M20 244c20-30 0-40 30-60s-10-30 20-50', INK, 1.2)
    + kid(200, 214, '#E53935', 0.9) + g(30, 200, 1, Lc('M-6 10l12-20', '#A1673F', 3))),
  L('gb/lakes/landmark-stoneskimming.v1.svg', 'แข่งปาหินกระโดดน้ำบนทะเลสาบ', 'Skimming stones across a still lake', ['stone skimming', 'ปาหินกระโดดน้ำ', 'skipping stones', 'หินกระโดดน้ำ', 'flat stones', 'หินแบน', 'lake shore', 'ริมทะเลสาบ', 'derwentwater', 'count the bounces'], 'หาวงคลื่นเล็กๆ ที่หินกระโดดผ่าน', 'Find the little rings where the stone bounced',
    // a child on a pebbly shore flicking a flat stone that skips across a calm lake in a dotted arc, leaving a row of rings that get smaller, fells mirrored in the water
    sky('#E1F5FE') + P('M-4 100l60-50 50 40 50-40 84 50v20H-4z', '#81C784', 3) + P('M-4 110h248v90H-4z', '#4FC3F7', 0) + P('M-4 110l60 30 50-20 50 20 84-30z', '#A5D6A7', 0) + P('M-4 110h248', 'none', 3)
    + P('M-4 200c60-10 180-10 248 0v44H-4z', '#D7CCC8', 3) + [[20, 216], [60, 226], [150, 214], [200, 230], [110, 232]].map(([x, y]) => E(x, y, 9, 5, '#9E9E9E', 2)).join('')
    + [[70, 178, 16], [116, 164, 13], [156, 154, 10], [188, 148, 7], [212, 144, 5]].map(([x, y, r]) => E(x, y, r, r * 0.35, 'none', 2.5).replace('fill="none"', 'fill="none" stroke="#FFFFFF"')).join('')
    + Lc('M40 196q15-30 30-18q23-24 46-14q20-18 40-10q16-12 32-6q12-8 24-4', '#FFFFFF', 2).replace('stroke-width="2"', 'stroke-width="2" stroke-dasharray="4 5"') + E(218, 140, 5, 2.5, '#757575', 1.5)
    + g(34, 212, 1, C(0, -26, 10, '#FFE0BD', 2.5) + P('M-10 4v-20h20v20z', '#E53935', 2.5) + Lc('M8-12l14-6', '#FFE0BD', 5) + face(0, -24, 0.26)) + face(140, 80, 0.38)),
  L('gb/lakes/landmark-wraycastle.v1.svg', 'ปราสาทเรย์ป้อมแบบนิทานริมวินเดอร์เมียร์', 'Wray Castle, the storybook castle on Windermere', ['wray castle', 'ปราสาทเรย์', 'mock gothic castle', 'ปราสาทแบบโกธิก', 'windermere shore', 'ริมทะเลสาบวินเดอร์เมียร์', 'castle playroom', 'ห้องเล่นในปราสาท', 'turrets', 'claife'], 'หาหอคอยกลมที่มีกำแพงหยักบนยอด', 'Find the round towers with bumpy battlements',
    // a grey stone storybook castle with a tall square keep, round towers with battlements and slit windows, perched on a green slope above a lake, children rolling down the grass
    sky('#E8EAF6') + P('M-4 190h248v54H-4z', '#4FC3F7', 0) + P('M-4 150c80-20 180-20 248 0v40c-80 14-180 14-248 0z', '#7CB342', 3)
    + R(60, 80, 120, 80, '#9E9E9E', 2, 3.5) + Array.from({ length: 10 }, (_, k) => R(60 + k * 12.4, 72, 8, 9, '#9E9E9E', 1, 2)).join('')
    + R(100, 30, 40, 50, '#8D8D8D', 2, 3) + Array.from({ length: 4 }, (_, k) => R(100 + k * 11, 22, 7, 9, '#8D8D8D', 1, 2)).join('')
    + [[52, 60], [188, 60]].map(([x, y]) => R(x - 16, y, 32, 100, '#A1A1A1', 6, 3) + Array.from({ length: 3 }, (_, k) => R(x - 16 + k * 11.5, y - 8, 9, 9, '#A1A1A1', 1, 2)).join('') + R(x - 3, y + 20, 6, 16, '#37474F', 3, 1.5)).join('')
    + P('M108 160v-30c0-14 24-14 24 0v30z', '#5D4037', 3) + [[84, 100], [148, 100]].map(([x, y]) => R(x - 6, y, 12, 20, '#37474F', 6, 1.5)).join('') + face(120, 112, 0.3)
    + kid(40, 182, '#FFCA28', 0.8) + kid(204, 180, '#E53935', 0.8)),
  L('gb/lakes/landmark-bowderstone.v1.svg', 'หินโบว์เดอร์ก้อนยักษ์กับบันไดปีน', 'The giant Bowder Stone and its ladder', ['bowder stone', 'หินโบว์เดอร์', 'giant boulder', 'หินก้อนยักษ์', 'borrowdale', 'บอร์โรว์เดล', 'climb the ladder', 'ปีนบันได', 'balancing rock', 'shake hands under the stone'], 'หาบันไดไม้ที่พาขึ้นไปบนยอดหิน', 'Find the wooden ladder up to the top of the rock',
    // a huge grey boulder balanced on one narrow edge in a woodland clearing, a tall wooden ladder leaning against it with a child at the top waving, ferns and birches around
    sky('#E8F5E9') + P('M-4 190c60-10 180-10 248 0v54H-4z', '#7CB342', 3) + [[20, 190], [220, 186]].map(([x, y]) => g(x, y, 1, Lc('M0 0v-80', '#FFFFFF', 7) + Lc('M0 0v-80', INK, 1.2) + C(0, -86, 20, '#AED581', 2.5))).join('')
    + P('M100 196l-30-40c-20-40 10-110 70-110 50 0 80 40 60 90-10 30-50 50-90 60z', '#9E9E9E', 3.5) + Lc('M80 100c20-20 50-30 80-20M110 150c20-6 40-16 60-30', '#BDBDBD', 3) + E(120, 74, 20, 8, '#BDBDBD', 0)
    + Lc('M176 196L150 52M196 196L170 52', '#A1673F', 5) + Array.from({ length: 9 }, (_, k) => Lc(`M${174 - k * 3} ${184 - k * 16}h20`, '#A1673F', 4)).join('') + Lc('M176 196L150 52M196 196L170 52', INK, 1)
    + kid(150, 56, '#E53935', 0.9) + [[40, 210], [70, 216], [214, 212]].map(([x, y]) => Lc(`M${x} ${y}c-6-10-14-12-20-10M${x} ${y}c6-10 14-12 20-10M${x} ${y}v-14`, '#43A047', 3)).join('') + face(120, 120, 0.42)),
];

export default { places: {}, items };
