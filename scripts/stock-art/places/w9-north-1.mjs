// Wave 9, the north (part 1): the United Kingdom, London, the Netherlands, Amsterdam, Finland, Lapland
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SCOPE = { 'fi-lapland': 'p-lapland' };
// the id follows the file name (fi/lapland/landmark-pulka.v1.svg → p-lapland.landmark.pulka)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): no background, its own halo
const X = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const pine = (x, y, s, snow) => g(x, y, s, P('M0-40l14 22h-7l11 18H-18l11-18h-7z', '#2E7D32', 2.5) + (snow ? P('M0-40l7 11h-7l-7-1zM-7-18h14l3 5h-20z', '#FFFFFF', 0) : '') + R(-3, 0, 6, 8, '#6D4C41', 0, 2));
const water = (y, c = '#4FC3F7') => P(`M-4 ${y}h248v${244 - y}H-4z`, c, 0);
const waves = (pts, c = '#E1F5FE') => pts.map(([x, y]) => Lc(`M${x} ${y}q6-5 12 0t12 0`, c, 2.5)).join('');

const items = [
  // ---------- United Kingdom
  X('gb', 'culture', 'postbox', 'ตู้ไปรษณีย์ทรงกระบอกสีแดง', 'A red pillar box', ['pillar box', 'ตู้ไปรษณีย์สีแดง', 'red postbox', 'ตู้ไปรษณีย์อังกฤษ', 'post a letter', 'ส่งจดหมาย', 'royal mail', 'postcard home', 'ส่งโปสการ์ด', 'british street'],
    // a fat red cylinder post box on the grass with a dark red domed cap, a golden crown on the cap, a black slot, a little white plate and a letter flying in
    E(120, 212, 78, 13, '#A5D6A7', 3) + R(82, 74, 76, 132, '#D32F2F', 8, 3.5) + R(76, 196, 88, 16, '#263238', 4, 3)
    + P('M78 76c0-44 84-44 84 0z', '#C62828', 3.5) + R(72, 68, 96, 12, '#B71C1C', 5, 3) + P('M108 50l3-12 9 7 9-7 3 12z', '#FFCA28', 2.5)
    + R(96, 94, 48, 9, '#3E2723', 3, 2.5) + R(100, 156, 40, 28, '#FFFFFF', 3, 2.5) + Lc('M106 165h28M106 174h20', '#B0BEC5', 2.5) + E(98, 120, 6, 18, '#EF5350', 0)
    + face(120, 124, 0.42) + g(170, 64, 1, R(-18, -12, 36, 24, '#FFF8E1', 2, 2.5) + P('M-18-12l18 13 18-13', 'none', 2) + R(8, -8, 7, 8, '#64B5F6', 1, 1.5), -22)
    + Lc('M196 50c8-4 14-2 18 4M200 74c8 0 12 4 14 10', '#90A4AE', 2.5)),
  X('gb', 'culture', 'conkers', 'เกมคองเกอร์ ลูกเกาลัดผูกเชือก', 'Conkers on a string', ['conkers', 'คองเกอร์', 'conker game', 'เกมลูกเกาลัด', 'horse chestnut', 'เกาลัดม้า', 'autumn game', 'เกมฤดูใบไม้ร่วง', 'conker on a string', 'school playground'],
    // two shiny brown conkers on knotted strings swinging towards each other, a spiky green shell split open with a conker peeping out and a big five-fingered chestnut leaf
    g(70, 168, 1, [-70, -35, 0, 35, 70].map((a) => E(0, -34, 13, 34, '#8BC34A', 3).replace('<ellipse', `<ellipse transform="rotate(${a})"`)).join('') + [-70, -35, 0, 35, 70].map((a) => Lc('M0 0v-60', '#558B2F', 2).replace('<path', `<path transform="rotate(${a})"`)).join('') + Lc('M0 0l6 30', '#6D4C41', 4))
    + g(176, 184, 1, P('M-30 0c0-24 14-34 30-34s30 10 30 34c-8 10-52 10-60 0z', '#AED581', 3) + [[-30, -4], [-24, -22], [-10, -34], [8, -34], [24, -22], [30, -4]].map(([x, y]) => P(`M${x} ${y}l${x / 6} ${y / 5 - 4}`, 'none', 2.5)).join('') + C(0, -6, 16, '#8D3B12', 3) + E(-4, -12, 6, 4, '#C1784A', 0))
    + Lc('M70 14l26 64', '#D7C29E', 3) + Lc('M190 14l-30 66', '#D7C29E', 3)
    + g(98, 98, 1, C(0, 0, 24, '#7B2E10', 3.5) + E(0, 14, 13, 7, '#D7B98E', 0) + E(-8, -10, 7, 4, '#B5663A', 0) + face(0, 0, 0.3) + C(0, -24, 3, '#D7C29E', 1.5))
    + g(156, 100, 1, C(0, 0, 22, '#8D3B12', 3.5) + E(0, 13, 12, 6, '#D7B98E', 0) + E(-8, -9, 6, 4, '#C1784A', 0) + face(0, 0, 0.28, 'o') + C(0, -22, 3, '#D7C29E', 1.5))
    + Lc('M120 76l4-12M128 88l12-6M116 66l-6-8', '#FFCA28', 3)),
  X('gb', 'food', 'cornishpasty', 'พายคอร์นิชพาสตี้ขอบจีบ', 'A Cornish pasty with its crimped edge', ['cornish pasty', 'คอร์นิชพาสตี้', 'pasty', 'พายเนื้อ', 'crimped pastry', 'ขอบจีบ', 'cornwall', 'คอร์นวอลล์', 'beef and potato pie', 'hand pie'],
    // a big half-moon golden pasty on a paper bag, its rope-like crimped edge curling over the top, steam rising, a broken end showing beef, potato and swede inside
    R(26, 170, 188, 22, '#EFE3CF', 3, 3) + Lc('M40 181h160', '#D7C3A3', 2)
    + P('M36 172c0-82 168-82 168 0z', '#E6A24A', 3.5) + P('M56 160c10-40 118-40 128 0', 'none', 0)
    + Array.from({ length: 13 }, (_, k) => { const a = Math.PI * (0.06 + 0.88 * k / 12), x = 120 - 82 * Math.cos(a), y = 172 - 64 * Math.sin(a); return E(x, y, 9, 6, '#F2BE6B', 2.5).replace('<ellipse', `<ellipse transform="rotate(${(a * 180 / Math.PI - 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"`); }).join('')
    + P('M180 172c4-18 14-26 24-22v22z', '#FFF3D6', 2.5) + C(190, 162, 4, '#8D5524', 0) + C(198, 168, 3, '#F9E79F', 0) + C(186, 168, 3, '#FFB74D', 0)
    + E(96, 140, 18, 6, '#F5C77E', 0) + face(116, 146, 0.45) + Lc('M100 70c-8-10 8-16 0-26M126 66c-8-10 8-16 0-26M152 72c-8-10 8-16 0-26', '#CFD8DC', 3)),
  X('gb', 'food', 'beansontoast', 'ถั่วอบซอสมะเขือเทศบนขนมปังปิ้ง', 'Beans on toast', ['beans on toast', 'ถั่วอบบนขนมปัง', 'baked beans', 'ถั่วอบซอสมะเขือเทศ', 'toast', 'ขนมปังปิ้ง', 'british breakfast', 'อาหารเช้าอังกฤษ', 'tomato sauce beans', 'quick lunch'],
    // a golden slice of toast on a white plate piled with shiny orange baked beans in tomato sauce dripping over the crust, a fork beside it
    E(120, 182, 106, 28, '#FFFFFF', 3) + E(120, 180, 90, 19, '#E8EAF6', 0)
    + P('M48 180V100c-14-4-12-34 14-36 22-2 36 8 58 8s38-10 58-8c26 2 28 32 14 36v80z', '#C98A3E', 3.5) + P('M58 172V104c-10-6-6-28 8-28 20 0 34 8 54 8s34-8 54-8c14 0 18 22 8 28v68z', '#F2C77F', 2.5)
    + P('M62 112c10-16 30-6 40-14s26-4 36 2 30-2 40 8 6 22 0 30c-4 10-6 18-14 14-8 12-24 4-34 10-12 6-26-2-36 2-14 6-30-6-30-20-6-8-8-24-2-32z', '#E2541E', 3)
    + Array.from({ length: 26 }, (_, k) => { const x = 74 + (k * 29) % 100, y = 106 + ((k * 41) % 50); return E(x, y, 7, 5, '#F57C30', 1.5).replace('<ellipse', `<ellipse transform="rotate(${(k * 47) % 180} ${x} ${y})"`) + E(x - 2, y - 2, 2, 1.2, '#FFCC80', 0); }).join('')
    + P('M172 152c2 10 0 18-4 22', 'none', 0) + E(178, 176, 6, 8, '#E2541E', 2) + face(120, 132, 0.42)
    + g(212, 122, 1, R(-4, -6, 8, 70, '#CFD8DC', 3, 2.5) + P('M-10-6v-30M-3-6v-30M4-6v-30M10-6v-30', 'none', 3) + R(-11, -12, 22, 8, '#CFD8DC', 3, 2.5), 8)),
  X('gb', 'transport', 'milkfloat', 'รถไฟฟ้าส่งนมยามเช้า', 'A milk float delivering bottles', ['milk float', 'รถส่งนม', 'milkman', 'คนส่งนม', 'milk bottles', 'ขวดนม', 'doorstep delivery', 'ส่งนมถึงหน้าบ้าน', 'electric van', 'early morning'],
    // a small white open-sided electric delivery van with a green stripe, crates of glass milk bottles with silver tops on the back, round headlamps and a little orange light on the roof
    E(120, 204, 108, 10, '#CFD8DC', 0)
    + R(26, 70, 188, 10, '#FFFFFF', 4, 3) + R(30, 80, 6, 70, '#90A4AE', 0, 2.5) + R(118, 80, 6, 70, '#90A4AE', 0, 2.5) + C(200, 64, 6, '#FF9800', 2.5)
    + R(22, 146, 190, 40, '#FFFFFF', 6, 3.5) + Lc('M24 164h186', '#43A047', 7)
    + [44, 84].map((x) => R(x - 4, 116, 38, 30, '#1565C0', 3, 3) + [x + 2, x + 12, x + 22].map((bx) => R(bx, 98, 8, 22, '#FFFFFF', 3, 2) + R(bx, 96, 8, 5, '#CFD8DC', 2, 1.5)).join('')).join('')
    + P('M138 146V80h50c14 0 22 10 22 24v42z', '#FFFFFF', 3.5) + P('M150 90h36c8 0 12 6 12 14v14h-48z', '#B3E5FC', 3) + C(206, 132, 6, '#FFF59D', 2.5)
    + face(176, 132, 0.36) + [64, 180].map((x) => C(x, 190, 16, '#37474F', 3.5) + C(x, 190, 6, '#B0BEC5', 2)).join('')),

  // ---------- London
  L('gb/london/landmark-tatemodern.v1.svg', 'หอศิลป์เทตโมเดิร์นในโรงไฟฟ้าเก่า', 'Tate Modern in the old power station', ['tate modern', 'เทตโมเดิร์น', 'bankside power station', 'โรงไฟฟ้าแบงก์ไซด์', 'art gallery', 'หอศิลป์', 'turbine hall', 'เทอร์ไบน์ฮอลล์', 'south bank', 'free museum'], 'หาปล่องไฟสี่เหลี่ยมสูงตรงกลาง', 'Find the tall square chimney in the middle',
    // a long brown-brick power station with tall thin slot windows, one huge square chimney rising from its middle topped with a glowing light box, birch trees and a lawn in front
    sky('#E3F2FD') + R(100, 24, 40, 100, '#A1673F', 2, 3.5) + R(100, 24, 40, 12, '#FFF59D', 2, 3) + Lc('M108 50v60M120 50v60M132 50v60', '#8D5232', 2)
    + R(14, 110, 212, 92, '#B5774B', 3, 3.5) + R(14, 104, 212, 10, '#FFF59D', 2, 3)
    + [32, 52, 72, 168, 188, 208].map((x) => R(x - 4, 124, 8, 64, '#5D4037', 3, 2)).join('') + R(96, 150, 48, 52, '#3E2723', 4, 3)
    + face(120, 72, 0.42) + P('M-4 202h248v42H-4z', '#9CCC65', 0)
    + [[40, 208], [196, 210]].map(([x, y]) => R(x - 2, y - 40, 5, 42, '#FAFAFA', 0, 2) + Lc(`M${x - 2} ${y - 30}h4M${x - 2} ${y - 18}h4`, INK, 1.5) + C(x, y - 48, 18, '#C5E1A5', 2.5)).join('')
    + kid(96, 228, '#E53935', 0.85) + kid(148, 228, '#1E88E5', 0.85)),
  L('gb/london/landmark-battersea.v1.svg', 'โรงไฟฟ้าแบตเตอร์ซีกับปล่องขาวสี่ปล่อง', 'Battersea Power Station and its four white chimneys', ['battersea power station', 'โรงไฟฟ้าแบตเตอร์ซี', 'four chimneys', 'ปล่องไฟสี่ต้น', 'upside down table', 'battersea park', 'แบตเตอร์ซีพาร์ก', 'chimney lift', 'ลิฟต์ขึ้นปล่องไฟ', 'nine elms'], 'นับปล่องไฟสีขาวให้ครบสี่ต้น', 'Count the four white chimneys',
    // a huge square red-brick building by the river with a white fluted chimney standing up at each corner, the chimneys a little apart like the legs of an upside-down table
    sky('#FFF3E0') + [36, 204].map((x) => R(x - 12, 26, 24, 110, '#FFFDF7', 3, 3.5) + Lc(`M${x - 4} 34v96M${x + 4} 34v96`, '#E0D6C6', 2) + R(x - 14, 24, 28, 8, '#ECEFF1', 2, 2.5)).join('')
    + [80, 160].map((x) => R(x - 11, 40, 22, 96, '#FFFDF7', 3, 3.5) + Lc(`M${x - 4} 48v84M${x + 4} 48v84`, '#E0D6C6', 2) + R(x - 13, 38, 26, 8, '#ECEFF1', 2, 2.5)).join('')
    + R(20, 120, 200, 76, '#B5543A', 3, 3.5) + R(52, 100, 136, 24, '#C0603A', 2, 3) + [60, 90, 120, 150, 180].map((x) => R(x - 6, 134, 12, 44, '#8D3B26', 3, 2)).join('')
    + Lc('M20 150h200', '#9C4530', 2) + face(120, 112, 0.36) + water(196) + waves([[30, 212], [120, 224], [180, 210]])),
  L('gb/london/landmark-millenniumbridge.v1.svg', 'สะพานมิลเลนเนียมสีเงินบางเฉียบข้ามเทมส์', 'The Millennium Bridge, a silver blade over the Thames', ['millennium bridge', 'สะพานมิลเลนเนียม', 'wobbly bridge', 'สะพานโยกเยก', 'footbridge', 'สะพานคนเดิน', 'blade of light', 'river thames', 'แม่น้ำเทมส์'], 'หาแขนเหล็กรูปตัววายที่รองสะพาน', 'Find the Y-shaped arms holding up the bridge',
    // a long, low, flat silver footbridge stretching across the river, held on two Y-shaped steel arms with cables running alongside, people walking across in a line
    sky('#E1F5FE') + water(150, '#4FC3F7') + waves([[20, 200], [80, 222], [170, 206], [200, 230]])
    + [80, 160].map((x) => P(`M${x - 6} 210V150l-18-18h8l16 14 16-14h8l-18 18v60z`, '#B0BEC5', 3) + R(x - 10, 206, 20, 10, '#90A4AE', 2, 2.5)).join('')
    + P('M-4 126c60 8 188 8 248 0v10c-60 8-188 8-248 0z', '#ECEFF1', 3.5) + Lc('M-4 122c60 8 188 8 248 0', '#90A4AE', 2.5) + Lc('M-4 140c60 8 188 8 248 0', '#90A4AE', 2)
    + [30, 60, 100, 140, 176, 214].map((x) => Lc(`M${x} ${127 + Math.sin(x / 76) * 3}v-12`, '#78909C', 2)).join('') + face(120, 152, 0.34)
    + [[40, '#E53935'], [76, '#FFCA28'], [112, '#7E57C2'], [190, '#26A69A']].map(([x, c]) => kid(x, 126, c, 0.7)).join('')),
  L('gb/london/landmark-walkietalkie.v1.svg', 'ตึกวอล์กกี้ทอล์กกี้กับสวนลอยฟ้าข้างบน', 'The Walkie-Talkie and its Sky Garden', ['walkie talkie', 'ตึกวอล์กกี้ทอล์กกี้', 'sky garden', 'สวนลอยฟ้า', '20 fenchurch street', 'เฟนเชิร์ชสตรีต', 'rooftop garden', 'สวนบนยอดตึก', 'free viewpoint', 'จุดชมวิวฟรี'], 'หาสวนต้นไม้เขียวๆ บนยอดตึกที่บานออก', 'Find the green garden at the top of the flared tower',
    // a tall glass tower that gets wider towards the top like an old walkie-talkie, its curved glass crown full of palm trees and leafy plants, small buildings at its feet
    sky('#FFF8E1') + P('M78 210l-6-150c0-20 96-20 96 0l-6 150z', '#90CAF9', 3.5).replace('M78 210l-6-150', 'M84 210l-16-150') + P('M66 60c0-30 108-30 108 0', '#B3E5FC', 3.5)
    + [80, 100, 120, 140, 160].map((y) => Lc(`M${70 + (y - 60) * 0.1} ${y + 30}H${170 - (y - 60) * 0.1}`, '#64B5F6', 2)).join('')
    + [[86, 48], [108, 40], [132, 40], [154, 48]].map(([x, y]) => C(x, y, 10, '#66BB6A', 2.5)).join('') + g(120, 52, 1, Lc('M0 10v-26', '#6D4C41', 3) + P('M0-16c-10-6-18-2-20 4M0-16c10-6 18-2 20 4M0-16c-4-10 0-16 6-16', 'none', 3)) + P('M68 60c20 6 84 6 104 0', 'none', 3)
    + face(120, 120, 0.42) + R(10, 168, 50, 62, '#CFD8DC', 2, 3) + R(184, 154, 48, 76, '#B0BEC5', 2, 3) + [[22, 180], [40, 180], [22, 202], [40, 202], [196, 168], [214, 168], [196, 192], [214, 192]].map(([x, y]) => R(x, y, 10, 12, '#E3F2FD', 1, 1.5)).join('')
    + R(-4, 210, 248, 34, '#90A4AE', 0, 3) + kid(96, 236, '#E53935', 0.8) + kid(146, 236, '#5C6BC0', 0.8)),
  L('gb/london/landmark-thamesbarrier.v1.svg', 'เขื่อนกั้นน้ำเทมส์ หลังคาเงินเรียงข้ามแม่น้ำ', 'The Thames Barrier and its shining silver hoods', ['thames barrier', 'เขื่อนกั้นน้ำเทมส์', 'flood barrier', 'ประตูกั้นน้ำ', 'silver hoods', 'หลังคาสีเงิน', 'woolwich', 'วูลิช', 'high tide', 'น้ำขึ้น'], 'นับหลังคาเงินรูปเปลือกหอยบนแม่น้ำ', 'Count the silver shell-shaped hoods on the river',
    // a row of shiny silver hoods shaped like curved shells standing on piers across a wide river, round gates hidden between them under the water, the sun glinting off the steel
    sky('#E8EAF6') + C(196, 44, 18, '#FFE082', 3) + water(140, '#4DB6AC') + waves([[20, 210], [100, 226], [170, 214]], '#B2DFDB')
    + Lc('M-4 172h248', '#80CBC4', 3)
    + [[34, 0.7], [92, 0.95], [156, 0.95], [214, 0.7]].map(([x, s]) => g(x, 150, s, R(-12, 0, 24, 30, '#CFD8DC', 2, 3) + P('M-26 0c0-36 10-60 26-66 16 6 26 30 26 66z', '#ECEFF1', 3.5) + Lc('M-14-4c0-24 6-42 14-48M-4-2c0-26 2-46 4-58', '#B0BEC5', 2.5) + Lc('M10-40c4 6 6 14 6 24', '#FFFFFF', 3))).join('')
    + face(124, 126, 0.32) + R(48, 164, 28, 8, '#FFCA28', 2, 2) + R(114, 166, 22, 8, '#FFCA28', 2, 2) + R(176, 164, 28, 8, '#FFCA28', 2, 2)),

  // ---------- Netherlands
  X('nl', 'food', 'tompouce', 'ขนมทอมปูสหน้าชมพูไส้คัสตาร์ด', 'Tompouce, the pink-iced custard slice', ['tompouce', 'ทอมปูส', 'pink pastry', 'ขนมหน้าชมพู', 'custard slice', 'ขนมไส้คัสตาร์ด', 'puff pastry', 'พัฟ', 'dutch bakery', 'orange tompouce'],
    // a neat rectangular pastry on a plate: a crisp puff pastry base, a thick layer of yellow custard and a smooth bright pink iced top, a little fork beside it
    E(120, 182, 104, 24, '#FFFFFF', 3) + E(120, 180, 88, 16, '#E0F7FA', 0)
    + R(46, 154, 148, 22, '#E9B872', 4, 3.5) + Lc('M52 162h136M52 170h136', '#C68B42', 2)
    + R(50, 108, 140, 48, '#FFE082', 3, 3.5) + E(50, 132, 4, 14, '#FFF59D', 0) + R(46, 92, 148, 18, '#E9B872', 4, 3.5)
    + P('M44 96c0-14 4-18 14-18h124c10 0 14 4 14 18z', '#F48FB1', 3.5) + E(84, 86, 20, 4, '#F8BBD0', 0) + face(120, 128, 0.42)
    + g(210, 140, 1, R(-3, -10, 6, 56, '#CFD8DC', 3, 2.5) + P('M-8-10v-24M0-10v-24M8-10v-24', 'none', 3) + R(-9, -14, 18, 6, '#CFD8DC', 3, 2.5), 10)),
  X('nl', 'food', 'oliebollen', 'โอลีบอลเลน โดนัทลูกกลมโรยน้ำตาลไอซิ่ง', 'Oliebollen, sugar-dusted New Year doughnuts', ['oliebollen', 'โอลีบอลเลน', 'new year doughnuts', 'โดนัทปีใหม่', 'powdered sugar', 'น้ำตาลไอซิ่ง', 'raisin doughnut', 'โดนัทลูกเกด', 'dutch new year', 'oud en nieuw'],
    // a paper tray piled with lumpy round golden doughnut balls studded with raisins, a snowfall of icing sugar shaken from a little sieve above, a sparkler fizzing beside them
    P('M36 160l14 40h140l14-40z', '#FFFFFF', 3.5) + Lc('M60 174h120M66 188h108', '#E1F5FE', 3)
    + [[80, 146], [124, 150], [166, 144], [100, 112], [146, 114]].map(([x, y], i) => g(x, y, 1, P('M-24 4c-4-18 10-28 22-26 12-6 28 4 26 18 6 12-4 24-16 24-12 6-30-2-32-16z', '#C98A3E', 3) + E(-4, -8, 12, 6, '#E3AA5C', 0)
      + [[-10, 2], [8, -6], [12, 10], [-2, 12]].map(([a, b]) => E(a, b, 3, 2, '#5D2B1A', 0)).join('') + P('M-18-12c10-10 26-10 34 0', 'none', 0) + E(0, -16, 16, 5, '#FFFFFF', 0) + (i === 3 ? face(0, 2, 0.3) : ''))).join('')
    + g(150, 42, 1, E(0, 0, 22, 8, '#B0BEC5', 3) + P('M-22 0c2 16 42 16 44 0', '#ECEFF1', 3) + Lc('M22-2l26-12', '#8D6E63', 5))
    + [[136, 70], [150, 76], [162, 68], [144, 88], [158, 92], [130, 96]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 1)).join('')
    + g(52, 70, 1, Lc('M0 60L14 6', '#90A4AE', 3) + [0, 60, 120, 180, 240, 300].map((a) => Lc(`M14 6l${(12 * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(12 * Math.sin(a * Math.PI / 180)).toFixed(1)}`, '#FFCA28', 3)).join('') + C(14, 6, 4, '#FFF59D', 1.5))),
  X('nl', 'culture', 'kingsday', 'วันกษัตริย์ เมืองทั้งเมืองเป็นสีส้ม', 'King’s Day, when the whole country turns orange', ['kings day', 'วันกษัตริย์', 'koningsdag', 'โคนิงส์ดัค', 'orange party', 'ปาร์ตี้สีส้ม', 'free market', 'ตลาดขายของมือสองบนถนน', 'orange crown', 'มงกุฎสีส้ม'],
    // a child in an orange T-shirt with a blow-up orange crown sitting on a blanket selling old toys, orange bunting strung above and an orange balloon tied to a lamp post
    Lc('M10 30c50 26 170 26 224 0', INK, 2.5) + [24, 48, 72, 96, 120, 144, 168, 192, 216].map((x, i) => { const y = 30 + 26 * Math.sin(Math.PI * (x - 10) / 224) * 0.9; return P(`M${x - 9} ${y}h18l-9 16z`, i % 2 ? '#FFB74D' : '#FB8C00', 2); }).join('')
    + R(196, 60, 6, 150, '#455A64', 2, 2.5) + C(199, 58, 8, '#FFF59D', 2.5) + Lc('M199 90c-14 10-18 20-22 30', INK, 1.5)
    + E(172, 112, 16, 20, '#FF9800', 3) + P('M172 132l-3 5h6z', '#FF9800', 2)
    + P('M20 214l16-50h150l16 50z', '#4FC3F7', 3.5) + Lc('M40 190h150M30 204h170', '#B3E5FC', 3)
    + g(150, 176, 1, R(-14, -14, 28, 20, '#FFCA28', 3, 2.5) + C(-8, 8, 5, INK, 0) + C(8, 8, 5, INK, 0)) + g(176, 178, 1, C(0, 0, 10, '#E53935', 2.5) + C(0, 0, 4, '#FFFFFF', 0)) + g(56, 186, 1, R(-12, -16, 24, 18, '#8D6E63', 2, 2.5) + C(-6, -16, 4, '#8D6E63', 2) + C(6, -16, 4, '#8D6E63', 2) + face(0, -8, 0.16))
    + g(100, 170, 1, P('M-22 30c0-30 8-40 22-40s22 10 22 40z', '#FF6F00', 3) + C(0, -24, 18, '#FFE0BD', 3) + P('M-18-38l-4-22 12 12 10-16 10 16 12-12-4 22z', '#FFA726', 3) + C(-12, -56, 3, '#FFF59D', 1.5) + C(12, -56, 3, '#FFF59D', 1.5) + face(0, -22, 0.3))),
  X('nl', 'food', 'kroketwall', 'ตู้กระจกหยอดเหรียญหยิบโครเก็ตร้อนๆ', 'Hot kroketten from a wall of little doors', ['kroket', 'โครเก็ต', 'automatiek', 'ตู้หยอดเหรียญอาหาร', 'snack wall', 'ผนังตู้ขนม', 'croquette', 'โครเก็ตทอด', 'frikandel', 'dutch snack bar'],
    // a shiny yellow wall of little glass doors, each with a golden fried croquette waiting inside, one door swung open and a child pulling out a croquette in a paper napkin
    R(24, 30, 192, 170, '#FFD54F', 8, 3.5) + R(24, 30, 192, 16, '#F57F17', 6, 3)
    + [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => { const x = 36 + c * 44, y = 56 + r * 34; return r === 2 && c === 1 ? R(x, y, 38, 28, '#3E2723', 3, 2.5) : R(x, y, 38, 28, '#FFF8E1', 3, 2.5) + R(x + 9, y + 9, 22, 11, '#C9802F', 5, 2) + R(x + 2, y + 2, 34, 24, 'none', 2, 1.5).replace('fill="none"', 'fill="none" stroke="#FFFFFF"') + C(x + 33, y + 14, 2, INK, 0); }).join('')).join('')
    + P('M80 124h-28l-6 28h28z', '#E3F2FD', 2.5)
    + face(194, 168, 0.3) + E(120, 214, 100, 10, '#B0BEC5', 0)
    + g(100, 214, 1, P('M-16 0v-30h32v30z', '#26A69A', 2.5) + C(0, -40, 12, '#FFE0BD', 2.5) + P('M-12-46c4-10 20-10 24 0', '#6D4C41', 2) + face(0, -38, 0.26) + Lc('M14-26l20-20', '#FFE0BD', 5) + g(40, -52, 1, R(-12, -6, 24, 12, '#C9802F', 6, 2.5) + P('M-8 6h16l-2 8h-12z', '#FFFFFF', 2), -30))),

  // ---------- Amsterdam
  L('nl/amsterdam/landmark-hoistbeam.v1.svg', 'คานกับตะขอบนหน้าจั่ว ยกโซฟาเข้าหน้าต่าง', 'The gable hook that lifts sofas through the window', ['hoisting beam', 'คานยกของ', 'gable hook', 'ตะขอหน้าจั่ว', 'moving furniture', 'ยกเฟอร์นิเจอร์', 'narrow stairs', 'บันไดแคบ', 'canal house gable', 'jordaan'], 'หาโซฟาที่ลอยขึ้นไปตามเชือก', 'Find the sofa floating up on the rope',
    // the top of a tall narrow brick canal house with a bell-shaped gable, a wooden beam poking out at the top with a hook and pulley, a sofa dangling on the rope outside an open window
    sky('#E1F5FE') + P('M50 244V90l12-6v-20l18-6c0-24 20-36 40-36s40 12 40 36l18 6v20l12 6v154z', '#B5543A', 3.5) + R(106, 30, 28, 16, '#FFFFFF', 3, 2.5)
    + R(96, 14, 76, 10, '#6D4C41', 2, 3) + Lc('M166 24v40', INK, 2.5) + C(166, 26, 6, '#BCAAA4', 2.5) + P('M162 64l4 8 4-8', 'none', 2.5)
    + [[72, 110], [122, 110], [72, 170], [122, 170]].map(([x, y]) => R(x, y, 46, 44, '#FFFFFF', 2, 3) + R(x + 5, y + 5, 36, 34, '#B3E5FC', 1, 2) + Lc(`M${x + 23} ${y + 5}v34M${x + 5} ${y + 22}h36`, '#FFFFFF', 3)).join('')
    + R(122, 110, 46, 44, '#3E2723', 2, 3) + P('M166 74l-10 10M166 74l10 10', 'none', 2)
    + g(166, 98, 1, R(-30, 0, 60, 18, '#E53935', 6, 3) + R(-32, -10, 12, 28, '#C62828', 5, 3) + R(20, -10, 12, 28, '#C62828', 5, 3) + R(-20, -12, 40, 14, '#EF5350', 5, 2.5) + face(0, 6, 0.24))
    + face(96, 66, 0.3) + kid(212, 236, '#FB8C00', 0.85)),
  L('nl/amsterdam/landmark-amsterdammertjes.v1.svg', 'เสาหลักสีน้ำตาลแดงริมคลอง อัมสเตอร์ดัมเมอร์ตเจส', 'The little brown Amsterdammertjes posts', ['amsterdammertje', 'อัมสเตอร์ดัมเมอร์ตเจ', 'street bollards', 'เสาหลักริมถนน', 'three crosses', 'กากบาทสามตัว', 'canal edge', 'ริมคลอง', 'cobbled street', 'jordaan streets'], 'หาเครื่องหมายกากบาทสีขาวสามตัวบนเสา', 'Find the three white crosses on the posts',
    // a row of chunky dark red-brown iron posts along a cobbled canal edge, each with three little white X marks stacked down its front, a bike leaning on one and the canal glinting behind
    sky('#FFF8E1') + water(84, '#4FC3F7') + waves([[30, 100], [150, 104], [200, 96]]) + P('M-4 118h248v126H-4z', '#BCAAA4', 0)
    + [[20, 140], [60, 150], [110, 144], [160, 154], [210, 142], [30, 200], [90, 210], [150, 204], [200, 214], [60, 180], [130, 182], [190, 176]].map(([x, y]) => E(x, y, 14, 7, '#A1887F', 2)).join('')
    + Lc('M-4 118h248', INK, 3)
    + [[50, 1], [120, 1.25], [190, 1]].map(([x, s]) => g(x, 210, s, P('M-14 0v-86c0-12 28-12 28 0V0z', '#7B2E1E', 3.5) + E(0, -90, 10, 6, '#7B2E1E', 3) + R(-16, -4, 32, 8, '#5D2014', 3, 2.5)
      + [-66, -50, -34].map((y) => Lc(`M-5 ${y - 5}l10 10M5 ${y - 5}l-10 10`, '#FFFFFF', 3)).join(''))).join('')
    + face(120, 152, 0.34)
    + g(176, 168, 0.9, C(-26, 18, 16, 'none', 3) + C(26, 18, 16, 'none', 3) + P('M-26 18l14-26h28l10 26M-12-8l-4-8h-8M16-8l2-10h8', 'none', 3) + R(18, -24, 18, 12, '#FFCA28', 2, 2))),
  L('nl/amsterdam/landmark-westertoren.v1.svg', 'หอคอยเวสเตอร์โทเรนกับมงกุฎสีฟ้าทอง', 'The Westertoren and its blue-and-gold crown', ['westertoren', 'เวสเตอร์โทเรน', 'westerkerk tower', 'หอระฆังเวสเตอร์', 'imperial crown', 'มงกุฎสีฟ้า', 'tallest tower', 'หอคอยสูงสุด', 'carillon bells', 'prinsengracht'], 'หามงกุฎสีฟ้าบนยอดหอคอย', 'Find the blue crown on top of the tower',
    // a tall stepped brick-and-stone tower rising in narrower and narrower stages, a clock face in the middle, a bright blue imperial crown with gold trims near the top and a little golden spire
    sky('#E8F5E9') + R(84, 140, 72, 104, '#B5543A', 2, 3.5) + R(78, 134, 84, 10, '#ECEFF1', 2, 3) + R(98, 170, 44, 50, '#3E2723', 20, 3) + Lc('M84 160h72', '#9C4530', 2)
    + R(94, 96, 52, 40, '#ECEFF1', 2, 3.5) + C(120, 116, 14, '#FFFFFF', 3) + Lc('M120 116v-9M120 116l6 4', INK, 2.5)
    + P('M98 96c0-14 6-24 22-24s22 10 22 24z', '#90A4AE', 3) + R(106, 60, 28, 14, '#ECEFF1', 2, 3)
    + P('M100 60c-4-12 2-20 8-16 2-10 8-14 12-14s10 4 12 14c6-4 12 4 8 16z', '#1E88E5', 3.5) + Lc('M100 60h40', '#FFCA28', 5) + Lc('M108 44l12 14 12-14', '#FFCA28', 3) + C(120, 28, 5, '#FFCA28', 2.5) + Lc('M120 22V8', INK, 2.5) + P('M116 8l4-6 4 6z', '#FFCA28', 2)
    + face(120, 86, 0.28) + P('M-4 220c50-10 80-6 88 0h72c10-6 40-10 88 0v24H-4z', '#81C784', 3)
    + kid(52, 232, '#E91E63', 0.85) + kid(190, 232, '#1E88E5', 0.85)),
  L('nl/amsterdam/landmark-poezenboot.v1.svg', 'บ้านเรือแมว เรือที่เป็นบ้านของแมวจร', 'The Cat Boat, a houseboat full of rescued cats', ['cat boat', 'เรือแมว', 'de poezenboot', 'โปเซนโบต', 'cat sanctuary', 'บ้านแมว', 'floating cat shelter', 'บ้านเรือ', 'singel canal', 'cats on a boat'], 'นับแมวที่นอนอยู่บนหลังคาเรือ', 'Count the cats lazing on the boat’s roof',
    // a long green houseboat moored on the canal with round porthole windows, flower pots on deck, cats curled on the roof, one peeping out of a window and one stretching on the deck
    sky('#FFF3E0') + water(168, '#4FC3F7') + waves([[20, 200], [90, 220], [170, 206], [206, 230]])
    + P('M14 166h212l-12 26H26z', '#2E7D32', 3.5) + R(34, 112, 172, 56, '#66BB6A', 6, 3.5) + R(28, 104, 184, 12, '#1B5E20', 4, 3)
    + [62, 104, 146, 184].map((x, i) => C(x, 140, 12, i === 1 ? '#FFE0B2' : '#B3E5FC', 3)).join('') + g(104, 140, 0.5, P('M-14 8c0-16 4-20 14-20s14 4 14 20z', '#FFB74D', 2) + P('M-12-8l2-10 8 6M12-8l-2-10-8 6', '#FFB74D', 2) + face(0, 0, 0.5, 'w'))
    + [[60, 98, '#FFB74D'], [124, 98, '#ECEFF1'], [182, 98, '#616161']].map(([x, y, c]) => g(x, y, 1, E(0, 0, 18, 10, c, 2.5) + C(14, -6, 9, c, 2.5) + P('M8-12l2-8 6 5M20-12l-2-8-6 5', c, 2) + Lc('M-18 2c-10 0-12-8-6-10', INK, 2) + face(14, -6, 0.18, 'w'))).join('')
    + [[38, 166], [218, 164]].map(([x, y]) => R(x - 8, y - 14, 16, 14, '#BF360C', 2, 2.5) + C(x - 4, y - 18, 5, '#F06292', 1.5) + C(x + 4, y - 20, 5, '#FFEB3B', 1.5)).join('')
    + face(120, 178, 0.3)),
  L('nl/amsterdam/landmark-stedelijk.v1.svg', 'พิพิธภัณฑ์สเตเดลิกกับตึกรูปอ่างอาบน้ำ', 'The Stedelijk Museum and its bathtub wing', ['stedelijk museum', 'พิพิธภัณฑ์สเตเดลิก', 'the bathtub', 'ตึกอ่างอาบน้ำ', 'modern art museum', 'พิพิธภัณฑ์ศิลปะสมัยใหม่', 'museumplein', 'มิวเซียมเพลน', 'white building', 'design museum'], 'หาตึกสีขาวที่หน้าตาเหมือนอ่างอาบน้ำ', 'Find the big white wing that looks like a bathtub',
    // an old red-brick museum with a small tower on the left and, joined to it, a huge smooth white wing shaped like a bathtub sitting on glass, a lawn with kids in front
    sky('#E3F2FD') + R(14, 70, 84, 130, '#C0603A', 2, 3.5) + R(40, 40, 32, 34, '#C0603A', 2, 3) + P('M36 42l20-16 20 16z', '#78909C', 3)
    + [[24, 94], [52, 94], [76, 94], [24, 140], [52, 140], [76, 140]].map(([x, y]) => R(x, y, 14, 26, '#FFF8E1', 6, 2)).join('')
    + R(100, 150, 128, 50, '#B3E5FC', 2, 3) + Lc('M130 150v50M160 150v50M190 150v50', '#81D4FA', 2)
    + P('M96 150c-8-50 0-76 18-76h104c14 0 22 20 18 60-2 12-8 16-18 16z', '#FAFAFA', 3.5) + P('M108 90c4-6 10-8 18-8h88', 'none', 2) + E(196, 152, 4, 4, '#ECEFF1', 2)
    + face(166, 112, 0.45) + P('M-4 200h248v44H-4z', '#9CCC65', 0) + Lc('M-4 200h248', INK, 3)
    + kid(60, 228, '#FFCA28', 0.85) + kid(118, 230, '#E53935', 0.85) + kid(180, 228, '#7E57C2', 0.85)),

  // ---------- Finland
  X('fi', 'food', 'runebergtorte', 'เค้กรูเนแบร์กกับวงไอซิ่งและแยมราสป์เบอร์รี', 'Runeberg torte with its ring of icing and jam', ['runeberg torte', 'เค้กรูเนแบร์ก', 'runebergintorttu', 'รูเนแบร์กินทอร์ตตู', 'raspberry jam', 'แยมราสป์เบอร์รี', 'almond cake', 'เค้กอัลมอนด์', 'february treat', 'finnish cake'],
    // a little tall round almond cake soaked brown on a saucer, a white icing ring piped on top and a shiny red dot of raspberry jam in its middle
    E(120, 190, 96, 22, '#FFFFFF', 3) + E(120, 188, 80, 14, '#FFF8E1', 0)
    + P('M72 184V86c0-14 96-14 96 0v98c0 12-96 12-96 0z', '#B7743A', 3.5) + Lc('M76 110c20 6 68 6 88 0M76 140c20 6 68 6 88 0', '#9A5E2C', 2)
    + E(120, 86, 48, 14, '#C98A4C', 3.5) + E(120, 84, 26, 8, 'none', 0) + P('M94 84c0-12 52-12 52 0s-52 12-52 0z', 'none', 7).replace('fill="none" stroke-width="7"', 'fill="none" stroke="#FFFFFF" stroke-width="8"')
    + E(120, 84, 11, 6, '#D81B60', 2.5) + E(116, 82, 4, 2, '#F48FB1', 0) + face(120, 140, 0.45)
    + Lc('M182 120c8-6 16-4 20 2M180 136h18', '#FFCA28', 3)),
  X('fi', 'food', 'mammi', 'มัมมี พุดดิ้งข้าวไรย์สีดำช่วงอีสเตอร์', 'Mämmi, the dark rye pudding of Easter', ['mammi', 'มัมมี', 'mämmi', 'easter pudding', 'พุดดิ้งอีสเตอร์', 'rye malt pudding', 'พุดดิ้งข้าวไรย์', 'cream and sugar', 'ครีมกับน้ำตาล', 'birch bark box'],
    // a small birch-bark style box filled with a dark brown malted rye pudding, a splash of cream and a sprinkle of sugar on top, a fuzzy pussy willow twig lying beside it
    P('M50 108h140l-10 84H60z', '#F3E5C7', 3.5) + [70, 92, 114, 136, 158, 180].map((x) => Lc(`M${x} 112l-4 76`, '#D7B98E', 2)).join('') + Lc('M54 140h132M56 166h128', '#D7B98E', 2)
    + E(120, 108, 70, 14, '#3E2116', 3.5) + P('M84 104c10-8 28-4 34 2 10-8 30-6 36 2-6 8-26 8-34 4-12 6-30 4-36-8z', '#FFF8E1', 2.5)
    + [[96, 102], [110, 106], [132, 100], [146, 106], [124, 110]].map(([x, y]) => R(x, y, 3, 3, '#FFFFFF', 0, 1)).join('') + face(120, 150, 0.45)
    + Lc('M30 218c40-10 80-26 120-60', '#6D4C41', 4) + [[56, 208], [84, 196], [110, 184], [132, 168]].map(([x, y]) => E(x, y - 8, 7, 10, '#ECEFF1', 2) + E(x + 1, y - 6, 4, 6, '#FFFFFF', 0)).join('')),
  X('fi', 'food', 'muikut', 'ปลามุยกูทอดกรอบตัวเล็กๆ', 'Crispy fried vendace, Finland’s little lake fish', ['muikku', 'มุยกู', 'fried vendace', 'ปลาตัวเล็กทอด', 'lake fish', 'ปลาน้ำจืด', 'savonlinna', 'ซาวอนลินนา', 'garlic mayo', 'kuopio'],
    // a paper tray heaped with lots of small crisp golden fried fish, each with a little tail and eye, a lemon wedge and a small pot of garlic dip on the side
    P('M30 150l18 50h144l18-50z', '#ECEFF1', 3.5) + Lc('M50 170h140M56 186h128', '#CFD8DC', 2)
    + [[70, 140, -10], [104, 146, 8], [140, 140, -6], [172, 146, 12], [88, 120, 4], [124, 120, -12], [160, 122, 6], [104, 98, -4], [142, 100, 10]].map(([x, y, r], i) => g(x, y, 1, P('M-24 0c8-10 28-10 36 0-8 10-28 10-36 0z', '#E3A24A', 2.5) + P('M12 0l12-8v16z', '#D08A35', 2.5) + C(-16, -1, 2, INK, 0) + Lc('M-6-6l2 4M2-6l2 4', '#B7743A', 1.5) + (i === 7 ? face(-2, 0, 0.18) : ''), r)).join('')
    + g(206, 120, 1, P('M-14 10c0-24 28-24 28 0z', '#FFF176', 3) + Lc('M-8 6l8-12M8 6l-8-12', '#FFFDE7', 2))
    + g(40, 116, 1, P('M-14-10h28l-4 22h-20z', '#FFFFFF', 3) + E(0, -10, 14, 5, '#FFFDE7', 2.5) + C(-4, -12, 1.5, '#81C784', 0) + C(4, -10, 1.5, '#81C784', 0))),
  X('fi', 'culture', 'wifecarrying', 'การแข่งแบกภรรยาวิ่งข้ามบ่อน้ำ', 'The wife-carrying race through the water pit', ['wife carrying', 'แข่งแบกภรรยา', 'eukonkanto', 'เออูกอนกันโต', 'sonkajarvi', 'ซงกาแยร์วี', 'piggyback race', 'วิ่งขี่หลัง', 'funny contest', 'การแข่งขันสุดฮา'],
    // a grown-up running and splashing through a shallow water pit with a laughing partner riding piggyback, a little wooden hurdle ahead and spray flying up
    E(120, 196, 104, 20, '#4FC3F7', 3) + Lc('M30 196q8-6 16 0t16 0M160 200q8-6 16 0t16 0', '#E1F5FE', 2.5)
    + R(186, 150, 6, 40, '#8D6E63', 2, 2.5) + R(220, 150, 6, 40, '#8D6E63', 2, 2.5) + R(180, 148, 50, 10, '#A1887F', 2, 2.5)
    + g(108, 128, 1, Lc('M-6 30l-18 34M6 30l20 30', '#1565C0', 9) + Lc('M-6 30l-18 34M6 30l20 30', INK, 1.5) + R(-16, -14, 32, 46, '#FDD835', 8, 3) + C(2, -30, 14, '#FFE0BD', 3) + P('M-12-34c2-12 22-14 28-2', '#5D4037', 2.5) + face(4, -28, 0.3, 'o') + Lc('M14-6l20 6', '#FFE0BD', 6))
    + g(94, 100, 1, R(-14, -10, 28, 34, '#E91E63', 8, 3) + C(-6, -24, 13, '#FFE0BD', 3) + P('M-20-26c0-14 22-18 28-6 10-2 12 8 6 12', '#FF7043', 2.5) + face(-6, -22, 0.28) + Lc('M14 4l20 12M-12 18l-6 26', '#FFE0BD', 6) + Lc('M14 20l18 20', '#E91E63', 8))
    + [[60, 176], [148, 174], [72, 162], [140, 160], [100, 168]].map(([x, y]) => C(x, y, 4, '#B3E5FC', 2)).join('')),

  // ---------- Lapland
  L('fi/lapland/landmark-icefloating.v1.svg', 'ลอยตัวในหลุมน้ำแข็งด้วยชุดกันหนาวสีส้ม', 'Floating in the frozen sea in an orange rescue suit', ['ice floating', 'ลอยตัวในน้ำแข็ง', 'arctic floating', 'ลอยตัวกลางทะเลน้ำแข็ง', 'survival suit', 'ชุดกันหนาว', 'frozen sea', 'ทะเลน้ำแข็ง', 'kemi', 'bothnian bay'], 'หาคนที่นอนลอยอยู่ในชุดสีส้ม', 'Find the people floating on their backs in orange suits',
    // a hole in thick white sea ice with dark blue water, two people in puffy orange survival suits lying on their backs smiling, blocks of ice around and pine trees on the shore
    sky('#B3E5FC') + pine(30, 92, 0.8, true) + pine(60, 86, 0.6, true) + pine(208, 90, 0.8, true) + P('M-4 96h248v148H-4z', '#FFFFFF', 0) + Lc('M-4 96h248', INK, 3)
    + P('M30 150c10-30 170-30 180 0 10 40-170 56-180 0z', '#1565C0', 3.5) + Lc('M60 170q8-5 16 0t16 0M150 176q8-5 16 0', '#64B5F6', 2.5)
    + [[44, 128, 18], [196, 132, 16], [120, 210, 20], [28, 196, 14], [210, 200, 14]].map(([x, y, s]) => P(`M${x - s} ${y}l${s * 0.4} ${-s * 0.6}h${s * 1.2}l${s * 0.4} ${s * 0.6}z`, '#E1F5FE', 2.5)).join('')
    + [[90, 152, -8], [152, 158, 6]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 30, 14, '#FF6F00', 3) + C(-28, -2, 12, '#FF8F00', 3) + E(-28, -2, 7, 8, '#FFE0BD', 2) + face(-28, -3, 0.16) + Lc('M-10-12v-6M10-12v-6', '#FF8F00', 6) + R(-4, -6, 8, 12, '#FFEB3B', 2, 1.5), r)).join('')),
  L('fi/lapland/landmark-kukkolankoski.v1.svg', 'ช้อนปลาด้วยสวิงด้ามยาวที่แก่งกุกโกลา', 'Scoop-net fishing on the Kukkolankoski rapids', ['kukkolankoski', 'แก่งกุกโกลา', 'scoop net fishing', 'ช้อนปลาด้วยสวิง', 'whitefish', 'ปลาไวท์ฟิช', 'tornio river', 'แม่น้ำทอร์นิโอ', 'rapids', 'grilled whitefish'], 'หาสวิงด้ามยาวที่จุ่มลงในแก่ง', 'Find the long-handled net dipping into the rapids',
    // a wooden pier on stilts sticking out over white foaming rapids, a fisher leaning out with a very long-handled scoop net, a silver whitefish jumping into it
    sky('#E8F5E9') + pine(20, 70, 0.8) + pine(50, 64, 0.6) + pine(220, 70, 0.8) + P('M-4 74h248v170H-4z', '#4FC3F7', 0)
    + [[30, 110], [110, 130], [170, 100], [60, 170], [150, 180], [200, 150], [90, 214], [200, 220]].map(([x, y]) => P(`M${x - 20} ${y}c6-10 14-10 20 0 6-10 14-10 20 0`, '#FFFFFF', 2.5)).join('')
    + [24, 52, 80].map((x) => R(x - 3, 118, 6, 100, '#6D4C41', 1, 2.5)).join('') + R(4, 110, 104, 12, '#A1887F', 2, 3) + Lc('M8 116h96', '#8D6E63', 1.5)
    + g(84, 96, 1, R(-12, -10, 24, 26, '#1976D2', 6, 3) + C(0, -22, 12, '#FFE0BD', 3) + P('M-12-26c4-12 22-12 24 0z', '#E53935', 2.5) + face(2, -20, 0.26) + Lc('M10 0l14 6', '#FFE0BD', 5))
    + Lc('M96 100l90 70', '#8D6E63', 5) + P('M176 160c-6 14 4 34 22 34s28-16 20-30z', 'none', 3) + Lc('M184 170l26-2M182 182l30-6M194 162l4 30M206 162l2 28', '#90A4AE', 1.5)
    + g(196, 136, 1, P('M-18 0c8-12 26-12 32 0-6 12-24 12-32 0z', '#CFD8DC', 2.5) + P('M14 0l10-8v16z', '#B0BEC5', 2.5) + C(-10, -2, 2, INK, 0), -30)),
  L('fi/lapland/landmark-treriksroset.v1.svg', 'กองหินสามประเทศกลางทะเลสาบที่คิลปิสยาร์วี', 'The Three-Country Cairn in the lake at Kilpisjärvi', ['three country cairn', 'หลักเขตสามประเทศ', 'treriksröset', 'เทรริกส์โรเซต', 'kilpisjarvi', 'คิลปิสยาร์วี', 'finland sweden norway', 'ฟินแลนด์ สวีเดน นอร์เวย์', 'border point', 'golddalsjärvi lake'], 'หาก้อนสีเหลืองกลางน้ำที่สามประเทศมาเจอกัน', 'Find the yellow cairn where three countries meet',
    // a bright yellow rounded concrete cairn standing in a calm lake, a wooden boardwalk leading to it with a child hopping round it, bare fells and a big flat-topped mountain behind
    sky('#E1F5FE') + P('M-4 110l50-40 40 26 40-40 50 34 40-20 28 20v40H-4z', '#B0BEC5', 3) + P('M136 64l26-14h30l20 18', '#ECEFF1', 2.5) + P('M-4 120h248v124H-4z', '#81D4FA', 0) + Lc('M-4 120h248', INK, 3)
    + waves([[30, 150], [190, 140], [40, 220], [200, 226]], '#E1F5FE')
    + P('M-4 196l100-24h12l-96 30H-4z', '#A1887F', 3) + [10, 40, 70].map((x) => Lc(`M${x} ${200 - (x + 4) * 0.25}v20`, '#6D4C41', 3)).join('')
    + P('M106 180c-4-46 10-74 30-74s34 28 30 74z', '#FDD835', 3.5) + E(136, 180, 32, 8, '#F9A825', 3) + E(126, 128, 6, 14, '#FFF59D', 0) + face(136, 150, 0.42)
    + kid(92, 172, '#E53935', 0.8)),
  L('fi/lapland/landmark-nokipannu.v1.svg', 'กาต้มกาแฟดำปี๋เหนือกองไฟในเพิงลาวู', 'A sooty coffee pot over the fire at a lean-to shelter', ['nokipannu', 'โนกิปันนู', 'campfire coffee', 'กาแฟต้มกองไฟ', 'laavu shelter', 'เพิงลาวู', 'lean-to', 'เพิงพักกลางป่า', 'grilled sausages', 'wilderness hut'], 'หากาต้มน้ำสีดำที่แขวนเหนือกองไฟ', 'Find the black pot hanging over the fire',
    // a little wooden lean-to shelter with a slanting log roof in the snowy forest, a crackling campfire in front with a soot-black coffee pot hanging from a stick, a sausage roasting on another
    sky('#C5CAE9') + pine(20, 120, 1, true) + pine(220, 116, 1, true) + P('M-4 150h248v94H-4z', '#FFFFFF', 0) + Lc('M-4 150h248', INK, 3)
    + P('M40 150L60 60h120l20 90z', '#8D6E63', 3.5) + [74, 98, 122, 146, 170].map((x) => Lc(`M${x - 4} 64l${(x - 120) * 0.15} 86`, '#6D4C41', 2)).join('') + P('M54 66h132l-4-12H58z', '#FFFFFF', 3) + R(54, 120, 132, 12, '#A1887F', 3, 2.5)
    + Lc('M90 210l30-60M150 210l-30-60', '#5D4037', 5) + g(120, 210, 1, P('M-26 0l12-6 14 4 14-6 12 8z', '#6D4C41', 2.5) + P('M-14-4c-6-20 6-24 8-34 4 10 10 12 6 22 6-6 12-2 12 4 4 6-2 12-6 12z', '#FF7043', 2.5) + P('M-4-6c-2-10 4-14 4-18 4 6 6 10 2 18z', '#FFEB3B', 0))
    + g(120, 162, 1, P('M-14 0h28l-4 26h-20z', '#263238', 3) + P('M-14 4l-12-10', 'none', 3) + E(0, 0, 14, 4, '#37474F', 2.5) + face(0, 14, 0.2)) + Lc('M110 162c-2-8 4-10 2-18M126 162c-2-8 4-10 2-18', '#ECEFF1', 2)
    + Lc('M200 230l-50-50', '#8D6E63', 3) + R(140, 168, 18, 7, '#C0603A', 3, 2)),
  L('fi/lapland/landmark-pulka.v1.svg', 'นั่งเลื่อนปุลกาให้พ่อแม่สกีลากไป', 'Riding in a pulka sled pulled by a skier', ['pulka', 'ปุลกา', 'pulk sled', 'เลื่อนเด็ก', 'cross country skiing', 'สกีทางเรียบ', 'ski trail', 'เส้นทางสกี', 'snowy forest', 'family ski trip'], 'หาเด็กที่นั่งในเลื่อนรูปเรือ', 'Find the child tucked into the boat-shaped sled',
    // a grown-up on long skis gliding along a snowy forest trail, poles in hand, pulling by two long poles a little boat-shaped red sled with a child bundled up inside
    sky('#E3F2FD') + pine(26, 120, 1.1, true) + pine(70, 106, 0.8, true) + pine(212, 112, 1, true) + P('M-4 130h248v114H-4z', '#FFFFFF', 0) + Lc('M-4 130h248', INK, 3)
    + Lc('M-4 196l248-20M-4 210l248-20', '#B3E5FC', 3)
    + g(166, 160, 1, Lc('M-34 30h70', INK, 4) + Lc('M-8 0l-10 28M8 0l12 28', '#37474F', 8) + R(-14, -40, 28, 42, '#26A69A', 8, 3) + C(0, -54, 12, '#FFE0BD', 3) + P('M-12-58c0-14 24-14 24 0z', '#FFCA28', 2.5) + C(0, -72, 5, '#FFCA28', 2) + face(0, -52, 0.26) + Lc('M12-30l20 54M-12-30l-12 50', '#90A4AE', 3))
    + Lc('M150 150L86 182M154 162L90 192', '#8D6E63', 3)
    + g(62, 194, 1, P('M-40-6h68c12 0 18 6 16 14-2 8-10 12-20 12h-60c-8 0-10-8-4-26z', '#E53935', 3.5) + R(-26, -30, 30, 26, '#7E57C2', 8, 3) + C(-10, -38, 13, '#FFE0BD', 3) + P('M-24-42c2-16 28-16 28 0z', '#EC407A', 2.5) + C(-10, -58, 5, '#FFFFFF', 2) + face(-10, -36, 0.28))),
];

export default { places: {}, items };
