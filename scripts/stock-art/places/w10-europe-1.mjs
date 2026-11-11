// Wave 10, group europe (1/1): one or two new pictures for each European place still short of twenty —
// Paris, Switzerland, Lucerne, Mont-Saint-Michel, Strasbourg, Lyon, London, Tromsø, Bergen, Copenhagen, Ireland, Dublin and the west,
// Sweden, Stockholm, Budapest, Salzburg, Slovakia, Bratislava and the Tatras, Slovenia, Hamburg, Cologne and the Rhine
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport)
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const adult = (x, y, top, s = 1) => g(x, y, s, C(0, -46, 11, '#FFE0BD', 2.5) + P('M-13-34h26l4 40h-34z', top, 2.5) + Lc('M-7 6v26M7 6v26', INK, 5) + face(0, -44, 0.26));
const pine = (x, y, s) => g(x, y, s, P('M0-40l14 22h-7l11 18H-18l11-18h-7z', '#2E7D32', 2.5) + R(-3, 0, 6, 8, '#6D4C41', 0, 2));
const plate = (y, rx = 100, ry = 26) => E(120, y, rx, ry, '#FFFFFF', 3) + E(120, y - 2, rx - 16, ry - 8, '#F1F8E9', 0);
const dots = (pts, r, c) => pts.map(([x, y]) => C(x, y, r, c, 0)).join('');

const items = [
  // ---------- Paris
  L('fr/paris/landmark-livingwall.v1.svg', 'กำแพงต้นไม้ของพิพิธภัณฑ์เกบรองลี', 'The plant-covered wall of the Musée du quai Branly', ['musée du quai branly', 'quai branly', 'พิพิธภัณฑ์เกบรองลี', 'living wall', 'กำแพงต้นไม้', 'vertical garden', 'สวนแนวตั้ง', 'green wall', 'plants on a building', 'ต้นไม้บนตึก'], 'หาหน้าต่างที่โผล่ออกมาจากต้นไม้', 'Find the windows peeking out of the plants',
    // the tall wall of a building covered from top to bottom in a patchwork of leafy plants in many greens, a few windows peeking through, a child on the pavement looking up
    R(30, 30, 180, 176, '#6D8F3C', 6, 3)
      + Array.from({ length: 30 }, (_, k) => { const x = 44 + (k % 6) * 30 + (Math.floor(k / 6) % 2) * 10; const y = 46 + Math.floor(k / 6) * 32; return E(x, y, 17, 13, ['#2E7D32', '#7CB342', '#43A047', '#9CCC65', '#558B2F', '#AED581'][(k * 7) % 6], 2); }).join('')
      + [[60, 92], [150, 60], [176, 140], [84, 170]].map(([x, y]) => R(x - 9, y - 11, 18, 22, '#37474F', 2, 2.5) + Lc(`M${x} ${y - 11}v22`, '#90A4AE', 2)).join('')
      + dots([[100, 60], [170, 90], [56, 140], [130, 180], [196, 50]], 4, '#F06292') + face(120, 118, 0.5)
      + R(10, 206, 220, 12, '#BDBDBD', 4, 3) + kid(196, 204, '#FFCA28', 1.2)),
  L('fr/paris/landmark-trampolines.v1.svg', 'แทรมโพลีนฝังพื้นในสวนตุยเลอรี', 'Bouncing on the trampolines in the Tuileries Garden', ['tuileries trampolines', 'แทรมโพลีนตุยเลอรี', 'jardin des tuileries', 'สวนตุยเลอรี', 'trampolines', 'แทรมโพลีน', 'kids in paris', 'เด็กเล่นในปารีส', 'bouncing', 'garden playground'], 'หาเด็กที่กระโดดสูงที่สุด', 'Find the child jumping the highest',
    // a row of round trampolines sunk in the sandy ground with bright rims, one child flying high above one with arms up, another bouncing on the next, clipped trees behind
    [[30, 92], [210, 92]].map(([x, y]) => R(x - 18, y - 30, 36, 40, '#43A047', 10, 3) + R(x - 3, y + 10, 6, 30, '#6D4C41', 0, 2.5)).join('')
      + E(120, 192, 116, 34, '#F0D9A8', 3)
      + [[66, 186, '#E53935'], [120, 196, '#1E88E5'], [174, 186, '#FFCA28']].map(([x, y, c]) => E(x, y, 30, 11, c, 3) + E(x, y, 22, 7, '#37474F', 2)).join('')
      + g(120, 96, 1.5, kid(0, 0, '#F06292') + Lc('M-6 -8l-10-14M6-8l10-14', '#FFE0BD', 3) + Lc('M-4 4l-4 10M4 4l4 10', INK, 3))
      + Lc('M100 150v14M120 146v18M140 150v14', '#90A4AE', 3) + g(174, 172, 1.2, kid(0, 0, '#26A69A') + Lc('M-4 4v8M4 4v8', INK, 3))
      + Lc('M36 60c4-6 10-6 14 0M190 56c4-6 10-6 14 0', '#FFB300', 3)),

  // ---------- Switzerland
  K('ch', 'food', 'vermicelles', 'แวร์มิเชลล์ เส้นเกาลัดบดบนเมอแรงก์', 'Vermicelles, chestnut purée piped like noodles', ['vermicelles', 'แวร์มิเชลล์', 'chestnut puree', 'เกาลัดบด', 'chestnut noodles', 'เส้นเกาลัด', 'meringue', 'เมอแรงก์', 'whipped cream', 'autumn dessert'],
    // a plate with a meringue base under a tall heap of brown chestnut purée piped into wiggly noodle strands, a cloud of whipped cream and a glazed chestnut on top
    plate(190) + E(120, 174, 66, 18, '#FFF8E1', 3) + P('M58 174c0-52 32-84 62-84s62 32 62 84z', '#8D6E63', 3)
      + Array.from({ length: 7 }, (_, k) => { const y = 104 + k * 10; const w = 26 + k * 8; return Lc(`M${120 - w} ${y}${Array.from({ length: Math.ceil(w / 6) }, (_, j) => `q3 ${j % 2 ? 4 : -4} 6 0`).join('')}`, '#6D4C41', 2.5); }).join('')
      + face(120, 146, 0.48) + P('M92 92c-10-6-6-20 6-18 0-14 22-16 26-4 10-8 26 0 20 12 10 4 6 16-6 14z', '#FFFFFF', 3)
      + E(120, 70, 13, 10, '#A1673F', 3) + E(116, 66, 4, 2.5, '#FFE0B2', 0)),

  // ---------- Lucerne
  L('ch/lucerne/landmark-trychler.v1.svg', 'นักเขย่าระฆังวัวยักษ์ทริชเลอร์ของสวิสกลาง', 'Trychler swinging giant cowbells in a parade', ['trychler', 'ทริชเลอร์', 'trychlen', 'giant cowbells', 'ระฆังวัวยักษ์', 'bell parade', 'ขบวนเขย่าระฆัง', 'central switzerland custom', 'ประเพณีสวิสกลาง', 'chlausjagen'], 'หาระฆังใบใหญ่ที่สุด', 'Find the biggest bell',
    // two men in white shirts, dark trousers and caps walking in step, each swinging a huge bronze cowbell hung from a wide leather strap, the clapper showing, ringing lines all round
    g(72, 150, 1.05, adult(0, 0, '#FFFFFF') + P('M-12-58h24l-2-6h-20z', '#263238', 2) + Lc('M-12-30l12 26 12-26', '#6D4C41', 5)
      + g(4, 2, 1, P('M-16-6c-8 0-10 6-12 14l-6 26c14 8 54 8 68 0l-6-26c-2-8-4-14-12-14z', '#C9A227', 3) + C(0, 36, 5, '#8D6E63', 2) + Lc('M-14 4h28', '#E8C766', 3), -12))
      + g(166, 160, 0.9, adult(0, 0, '#FFFFFF') + P('M-12-58h24l-2-6h-20z', '#263238', 2) + Lc('M-12-30l12 26 12-26', '#6D4C41', 5)
      + g(4, 2, 1, P('M-16-6c-8 0-10 6-12 14l-6 26c14 8 54 8 68 0l-6-26c-2-8-4-14-12-14z', '#B8892B', 3) + C(0, 36, 5, '#8D6E63', 2) + Lc('M-14 4h28', '#E8C766', 3), 14))
      + Lc('M28 150c-8 8-10 20-6 30M20 140c-14 12-16 32-8 48M210 160c8 8 10 20 6 30M218 150c14 12 16 32 8 48M120 120c4 8 4 16 0 24', '#FFB300', 3)
      + E(120, 216, 104, 10, '#A5D6A7', 3)),

  // ---------- Mont-Saint-Michel, Normandy and Brittany
  L('fr/montstmichel/landmark-rochetremblante.v1.svg', 'หินโยกแห่งอูเอลก็อต ก้อนยักษ์ที่ผลักแล้วโยก', 'The trembling rock of Huelgoat that rocks when you push it', ['roche tremblante', 'หินโยก', 'huelgoat', 'อูเอลก็อต', 'trembling rock', 'rocking stone', 'ก้อนหินยักษ์', 'huelgoat forest', 'ป่าอูเอลก็อต', 'brittany boulders'], 'หาเด็กที่ออกแรงผลักก้อนหิน', 'Find the child pushing the giant rock',
    // a huge grey granite boulder balanced on a low rock in a mossy forest, a child pushing it with both hands, wobble lines on either side, two trees behind
    g(30, 120, 1.1, P('M0-60c-20 0-26 20-14 30-14 10-4 30 14 26 18 4 26-16 14-28 10-12 2-28-14-28z', '#66BB6A', 3) + R(-3, 0, 6, 34, '#6D4C41', 0, 2.5)) + g(214, 116, 1, P('M0-60c-20 0-26 20-14 30-14 10-4 30 14 26 18 4 26-16 14-28 10-12 2-28-14-28z', '#43A047', 3) + R(-3, 0, 6, 36, '#6D4C41', 0, 2.5))
      + E(120, 212, 112, 18, '#7CB342', 3) + P('M68 210c0-22 18-32 56-32s54 10 54 32z', '#9E9E9E', 3)
      + g(130, 128, 1, E(0, 0, 72, 50, '#BDBDBD', 3) + P('M-50-30c10-8 24-12 36-10', 'none', 3) + E(-30, 36, 18, 6, '#8BC34A', 0) + E(30, -42, 16, 5, '#8BC34A', 0) + face(4, -2, 0.6), -6)
      + Lc('M210 96c8 12 8 28 0 40M222 90c10 16 10 36 0 52', '#FFB74D', 3) + kid(48, 206, '#E53935', 1.6) + Lc('M54 170l20-10M54 178l20 0', '#FFE0BD', 5)),
  L('fr/montstmichel/landmark-neufchatel.v1.svg', 'ชีสเนอชาแตลรูปหัวใจของนอร์มังดี', 'Neufchâtel, Normandy’s heart-shaped cheese', ['neufchatel', 'เนอชาแตล', 'heart cheese', 'ชีสรูปหัวใจ', 'normandy cheese', 'ชีสนอร์มังดี', 'soft white cheese', 'ชีสผิวขาว', 'pays de bray', 'cheese board'], 'หาชิ้นชีสที่ถูกตัดออกมา', 'Find the piece that has been cut out',
    // a soft white heart-shaped cheese with a velvety rind on a wooden board, a creamy wedge cut from it lying beside, two red Normandy apples with a leaf
    R(26, 164, 188, 38, '#C8A165', 10, 3) + Lc('M40 176h70M130 190h70', '#A1673F', 2)
      + P('M108 180c-48-26-66-56-54-80 12-22 40-20 54 0 14-20 42-22 54 0 12 24-6 54-54 80z', '#FAFAFA', 3)
      + dots([[82, 112], [96, 124], [132, 112], [146, 126], [110, 146], [124, 160], [86, 136]], 2.5, '#E0E0E0') + face(108, 128, 0.5)
      + P('M168 180l18-36 22 36z', '#FFF3C4', 3) + Lc('M168 180l18-36', '#FFFFFF', 4)
      + [[48, 150], [66, 168]].map(([x, y]) => C(x, y, 15, '#E53935', 3) + Lc(`M${x} ${y - 14}v-8`, '#5D4037', 3)).join('') + P('M50 128c8-10 18-8 20-2-8 6-16 6-20 2z', '#7CB342', 2.5)),

  // ---------- Strasbourg and Alsace
  L('fr/strasbourg/landmark-orangerie.v1.svg', 'ศาลาโฌเซฟีนในสวนโอรองเฌอรี สตราสบูร์ก', 'The Pavillon Joséphine in the Orangerie park', ['parc de l\'orangerie', 'สวนโอรองเฌอรี', 'pavillon josephine', 'ศาลาโฌเซฟีน', 'orangerie park', 'flower beds', 'แปลงดอกไม้', 'park picnic', 'ปิกนิกในสวน', 'strasbourg park'], 'หาแปลงดอกไม้สีแดงหน้าศาลา', 'Find the red flower bed in front of the pavilion',
    // a pale-yellow garden pavilion with tall arched windows, a little columned porch and a low dome on its roof, round flower beds and a fountain jet in a pool in front, clipped trees either side
    [30, 210].map((x) => C(x, 126, 20, '#66BB6A', 3) + R(x - 3, 144, 6, 22, '#6D4C41', 0, 2.5)).join('')
      + R(50, 92, 140, 74, '#FFF3C4', 0, 3) + P('M44 92h152l-12-14H56z', '#B0BEC5', 3) + P('M100 78c0-24 40-24 40 0z', '#90A4AE', 3) + C(120, 52, 4, '#90A4AE', 2)
      + [64, 90, 150, 176].map((x) => P(`M${x - 8} 148v-30c0-12 16-12 16 0v30z`, '#B3E5FC', 2.5)).join('')
      + P('M104 166v-40h32v40z', '#FFFFFF', 3) + P('M100 126l20-12 20 12z', '#FFF8E1', 3) + R(114, 140, 12, 26, '#8D6E63', 0, 2) + face(120, 100, 0.36)
      + E(120, 202, 104, 22, '#9CCC65', 3) + E(64, 198, 22, 8, '#E53935', 2.5) + E(176, 198, 22, 8, '#FFCA28', 2.5)
      + E(120, 206, 20, 7, '#4FC3F7', 2.5) + Lc('M120 204v-22M114 186l6-6 6 6', '#81D4FA', 3)),
  L('fr/strasbourg/landmark-schlitte.v1.svg', 'ชลิตต์ เลื่อนไม้ขนท่อนซุงลงเขาโวฌ', 'The schlitte, the Vosges sledge that brought logs downhill', ['schlitte', 'ชลิตต์', 'timber sledge', 'เลื่อนขนไม้', 'vosges', 'เทือกเขาโวฌ', 'schlitteur', 'chemin de schlitte', 'ทางไม้ลาดเขา', 'log sledge'], 'หาเขาโค้งสองอันที่หน้าเลื่อน', 'Find the two curved horns at the front of the sledge',
    // a track of wooden rungs running down a hill through fir trees, a wooden sledge piled with logs sliding down it, its curly front horns held by a man walking in front and leaning back
    pine(196, 64, 1.1) + pine(220, 84, 0.9) + pine(30, 200, 1) + P('M8 76l224 100c8 4 8 30-6 32H18c-8 0-12-6-12-14z', '#C5E1A5', 3)
      + Array.from({ length: 11 }, (_, k) => { const x = 8 + k * 21; const y = 84 + k * 9.3; return Lc(`M${x - 4} ${y + 8}l8-18`, '#8D6E63', 6); }).join('')
      + g(112, 128, 1, P('M-46 10h86c10 0 14-12 10-20', 'none', 4) + Lc('M-46 10h86c10 0 14-12 10-20', '#6D4C41', 5)
        + [[-30, -6], [0, -6], [-16, -20]].map(([x, y]) => R(x - 18, y - 7, 50, 14, '#A1673F', 6, 3) + C(x + 32, y, 7, '#FFE0B2', 2.5)).join('') + face(16, 4, 0.2)
        + Lc('M36 -16c8-12 18-8 14 2', '#6D4C41', 4), 24)
      + adult(178, 162, '#C62828') + Lc('M166 124l-10 10M190 124l-28-8', '#FFE0BD', 4)),

  // ---------- Lyon
  L('fr/lyon/landmark-saladelyonnaise.v1.svg', 'สลัดลียงแนส ผักฟริเซ่ เบคอนชิ้น ไข่ลวก', 'Salade lyonnaise with crispy bacon and a poached egg', ['salade lyonnaise', 'สลัดลียงแนส', 'frisee salad', 'ผักฟริเซ่', 'lardons', 'เบคอนชิ้น', 'poached egg', 'ไข่ลวก', 'croutons', 'bouchon lunch'], 'หาไข่ขาวกลมๆ บนยอดสลัด', 'Find the round white egg on top of the salad',
    // a wide bowl of curly pale-green frisée leaves, pink bacon cubes and golden croutons tucked in, a soft poached egg on top with its yolk just running
    P('M20 150c4 46 50 66 100 66s96-20 100-66z', '#E3F2FD', 3) + E(120, 150, 100, 24, '#FFFFFF', 3)
      + [[64, 138, 30], [100, 126, 34], [146, 128, 32], [178, 142, 24], [120, 150, 30]].map(([x, y, r]) => P(`M${Array.from({ length: 14 }, (_, k) => { const a = k * Math.PI / 7; const rr = k % 2 ? r * 0.62 : r; return `${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr * 0.6).toFixed(1)}`; }).join('L')}z`, '#AED581', 2.5)).join('')
      + [[70, 132], [92, 146], [160, 136], [180, 148], [136, 152]].map(([x, y]) => R(x - 7, y - 6, 14, 12, '#E57373', 3, 2.5) + Lc(`M${x - 5} ${y}h10`, '#FFCDD2', 2)).join('')
      + [[82, 120], [150, 118], [116, 160]].map(([x, y]) => R(x - 6, y - 6, 12, 12, '#F6C26B', 2, 2.5)).join('')
      + E(118, 112, 30, 20, '#FFFFFF', 3) + C(118, 108, 11, '#FFB300', 2.5) + Lc('M126 116c4 6 4 12 2 18', '#FFB300', 4) + face(118, 120, 0.34)),
  L('fr/lyon/landmark-pateencroute.v1.svg', 'ปาเตอองครูต พายเนื้อในเปลือกแป้งของลียง', 'Pâté en croûte, the meat pie with a mosaic inside', ['pate en croute', 'ปาเตอองครูต', 'pâté en croûte', 'meat pie', 'พายเนื้อ', 'pastry crust', 'เปลือกแป้งพาย', 'charcuterie', 'ชาร์กูเตอรี', 'pistachio'], 'หาจุดสีเขียวพิสตาชิโอในชิ้นพาย', 'Find the green pistachio dots in the slice',
    // a long golden pie with a crimped edge, pastry leaves and two little steam chimneys on top, its cut end showing pink meat with green pistachios and a band of amber jelly, a slice lying in front
    P('M140 92l60-24v84l-60 24z', '#E2A04A', 3) + P('M30 92l60-24h110l-60 24z', '#F2B65C', 3) + Lc('M40 92q6-6 12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0', '#C0812F', 2.5)
      + [[96, 80], [126, 80], [156, 80]].map(([x, y]) => E(x, y, 11, 4, '#F6D08E', 2)).join('') + [[111, 80], [141, 80]].map(([x, y]) => C(x, y, 3.5, '#8D5A2B', 2)).join('')
      + R(30, 92, 110, 84, '#E2A04A', 6, 3) + R(42, 112, 86, 54, '#F48FB1', 2, 2.5) + R(42, 102, 86, 10, '#FFB74D', 0, 2) + E(85, 140, 16, 10, '#FCE4EC', 2) + dots([[56, 124], [70, 156], [104, 124], [116, 154], [58, 146], [112, 138]], 3.5, '#7CB342') + face(172, 118, 0.42)
      + g(150, 196, 1, R(-44, -22, 88, 40, '#E2A04A', 6, 3) + R(-36, -14, 72, 24, '#F48FB1', 2, 2.5) + Lc('M-36-10h72', '#FFB74D', 3)
        + dots([[-24, 0], [-8, 6], [10, -2], [24, 4], [-16, -4]], 3, '#7CB342') + R(-6, -4, 12, 8, '#FCE4EC', 2, 1.5), -4)),

  // ---------- London
  L('gb/london/landmark-pearly.v1.svg', 'ชุดเพิร์ลลีคิงปักกระดุมมุกทั้งตัว', 'A Pearly King’s suit sewn all over with pearl buttons', ['pearly kings and queens', 'เพิร์ลลีคิง', 'pearly king', 'pearl buttons', 'กระดุมมุก', 'cockney tradition', 'ประเพณีค็อกนีย์', 'button suit', 'ชุดปักกระดุม', 'harvest festival'], 'หาวงกลมกระดุมบนเสื้อ', 'Find the circle of buttons on the jacket',
    // a smiling man in a black suit and flat cap covered in rows and swirls of white pearl buttons, a big flower of buttons on the chest, standing on a cobbled street
    E(120, 222, 70, 12, '#B0BEC5', 3) + P('M96 150h48l6 66h-24l-6-44-6 44h-24z', '#263238', 3)
      + P('M86 82h68l14 76h-22l-4-40v44H98v-44l-4 40H72z', '#37474F', 3) + P('M110 82l10 18 10-18z', '#FFFFFF', 2.5)
      + C(120, 58, 20, '#FFE0BD', 3) + face(120, 60, 0.4) + P('M98 46c0-18 44-18 44 0l6 4H94z', '#263238', 3)
      + dots([[102, 44], [112, 40], [122, 40], [132, 42], [140, 46], [96, 50], [106, 50], [116, 50], [126, 50], [136, 50]], 2.5, '#FFFFFF')
      + dots(Array.from({ length: 10 }, (_, k) => [100 + Math.cos(k * Math.PI / 5) * 12, 116 + Math.sin(k * Math.PI / 5) * 12]), 3, '#FFFFFF') + C(100, 116, 4, '#FFFFFF', 0)
      + dots(Array.from({ length: 8 }, (_, k) => [140 + Math.cos(k * Math.PI / 4) * 9, 120 + Math.sin(k * Math.PI / 4) * 9]), 2.6, '#FFFFFF')
      + dots(Array.from({ length: 6 }, (_, k) => [80 + k * 2, 100 + k * 9]), 2.6, '#FFFFFF') + dots(Array.from({ length: 6 }, (_, k) => [160 - k * 2, 100 + k * 9]), 2.6, '#FFFFFF')
      + dots(Array.from({ length: 5 }, (_, k) => [106, 160 + k * 11]), 2.6, '#FFFFFF') + dots(Array.from({ length: 5 }, (_, k) => [134, 160 + k * 11]), 2.6, '#FFFFFF')),

  // ---------- Tromsø
  L('no/tromso/landmark-snowcinema.v1.svg', 'โรงหนังกลางแจ้งบนหิมะในเทศกาลหนังทรอมโซ', 'The open-air snow cinema of the Tromsø film festival', ['snow cinema', 'โรงหนังหิมะ', 'tromso film festival', 'เทศกาลหนังทรอมโซ', 'tiff', 'outdoor cinema', 'ดูหนังกลางแจ้ง', 'snow benches', 'ม้านั่งหิมะ', 'stortorget winter'], 'หาปลาที่ยิ้มบนจอหนัง', 'Find the smiling fish on the screen',
    // a dark winter sky with stars and a moon, a big white screen on two posts showing a smiling fish, rows of benches cut from snow with children in woolly hats watching, little snow lanterns glowing
    R(12, 18, 216, 150, '#283593', 26, 3) + C(198, 44, 12, '#FFF59D', 2.5) + dots([[34, 40], [52, 30], [170, 30], [210, 70], [28, 80]], 2.5, '#FFFFFF')
      + Lc('M70 116v40M170 116v40', '#5D4037', 5) + R(58, 38, 124, 80, '#FFFFFF', 4, 3)
      + g(120, 78, 1, E(0, 0, 30, 18, '#FF8A65', 3) + P('M28 0l18-14v28z', '#FF7043', 3) + face(-8, -2, 0.3))
      + P('M-4 156c60-16 188-16 248 0v88H-4z', '#E3F2FD', 3)
      + [[176, 70, 180], [198, 60, 200]].map(([y, x0, w]) => R(120 - w / 2, y, w, 12, '#FFFFFF', 5, 3)).join('')
      + [[80, 172, '#E53935'], [112, 172, '#1E88E5'], [146, 172, '#FFCA28'], [64, 194, '#43A047'], [100, 194, '#AB47BC'], [138, 194, '#FF7043'], [172, 194, '#26C6DA']].map(([x, y, c]) => C(x, y - 6, 10, c, 2.5) + C(x, y - 18, 4, '#FFFFFF', 2)).join('')
      + [[26, 214], [214, 214]].map(([x, y]) => P(`M${x - 12} ${y}c0-18 24-18 24 0z`, '#FFFFFF', 3) + C(x, y - 6, 4, '#FFB300', 0)).join('')),

  // ---------- Bergen
  L('no/bergen/landmark-skolebolle.v1.svg', 'สกูเลบอลเลอ ขนมปังครีมคัสตาร์ดโรยมะพร้าว', 'Skolebolle, the custard bun with coconut icing', ['skolebolle', 'สกูเลบอลเลอ', 'skolebrød', 'school bun', 'ขนมปังโรงเรียน', 'custard bun', 'ขนมปังคัสตาร์ด', 'coconut icing', 'มะพร้าวขูด', 'bakery bergen'], 'หาครีมสีเหลืองตรงกลางขนมปัง', 'Find the yellow custard in the middle of the bun',
    // two round golden buns on a plate, each with a ring of white icing sprinkled with grated coconut and a pool of yellow custard in the middle
    plate(190, 104, 30) + g(176, 150, 0.68, C(0, 0, 58, '#E7A955', 3) + C(0, 0, 44, '#FFFFFF', 3) + C(0, 0, 21, '#FFD54F', 3))
      + C(102, 132, 62, '#E7A955', 3) + C(102, 132, 47, '#FFFFFF', 3)
      + Array.from({ length: 16 }, (_, k) => { const a = k * Math.PI / 8; const r = 34 + (k % 3) * 3; return Lc(`M${(102 + Math.cos(a) * r).toFixed(1)} ${(132 + Math.sin(a) * r).toFixed(1)}l${k % 2 ? 4 : -3} 3`, '#D7CCC8', 2.5); }).join('')
      + C(102, 132, 23, '#FFD54F', 3) + face(102, 130, 0.4)),

  // ---------- Copenhagen
  L('dk/copenhagen/landmark-borsen.v1.svg', 'ยอดแหลมหางมังกรพันเกลียวของตึกเบอร์เซิน', 'Børsen and its spire of twisted dragon tails', ['børsen', 'borsen', 'เบอร์เซิน', 'old stock exchange', 'ตลาดหลักทรัพย์เก่า', 'dragon spire', 'ยอดหางมังกร', 'slotsholmen', 'สล็อตส์โฮลเมน', 'twisted spire'], 'หาหัวมังกรที่โคนยอดแหลม', 'Find the dragon heads at the foot of the spire',
    // a long low red-brick Renaissance building with a green roof and ornate gables, in the middle a tall green spire made of four dragon tails twisted together, the dragons' heads poking out at its foot
    R(14, 128, 212, 70, '#C0573E', 0, 3) + P('M8 128l20-22h184l20 22z', '#4E8C78', 3)
      + [44, 80, 160, 196].map((x) => P(`M${x - 12} 108v-14l6-6v-6h12v6l6 6v14z`, '#C0573E', 2.5) + C(x, 96, 3, '#FFE082', 1.5)).join('')
      + Array.from({ length: 18 }, (_, k) => R(22 + (k % 9) * 23.5, 140 + Math.floor(k / 9) * 28, 12, 16, '#FFF3E0', 2, 2)).join('') + face(120, 182, 0.4)
      + P('M108 108L120 14l12 94z', '#5FA38B', 3) + [96, 76, 56, 36].map((y, k) => { const w = 10 - k * 2; return Lc(`M${120 - w} ${y + 10}L${120 + w} ${y - 2}`, '#2E6B57', 3); }).join('')
      + [64, 88].map((y) => Lc(`M${116 - (y - 64) / 12} ${y}h${8 + (y - 64) / 6}`, '#FFCA28', 3)).join('')
      + P('M108 106c-8-2-14 2-18-4 6-2 10-6 16-4z', '#5FA38B', 2.5) + P('M132 106c8-2 14 2 18-4-6-2-10-6-16-4z', '#5FA38B', 2.5) + C(96, 102, 1.8, INK, 0) + C(144, 102, 1.8, INK, 0)),

  // ---------- Ireland
  K('ie', 'animal', 'wren', 'นกเรนตัวจิ๋วของไอร์แลนด์ หางชี้ฟ้า', 'The tiny Irish wren with its tail cocked up', ['wren', 'นกเรน', 'dreoilín', 'dreoilin', 'tiny bird', 'นกตัวจิ๋ว', 'wren day', 'วันนกเรน', 'stone wall', 'gorse'],
    // a little round brown wren with fine stripes and a pale eyebrow, its short tail cocked straight up, perched on a dry-stone wall with a sprig of yellow gorse
    [[20, 186], [64, 190], [108, 186], [152, 190], [196, 186], [42, 210], [86, 212], [130, 210], [174, 212], [218, 210]].map(([x, y]) => E(x, y, 24, 12, '#9E9E9E', 3)).join('')
      + Lc('M196 176c-6-20-4-40 8-56', '#5D7A2E', 3) + dots([[200, 146], [208, 130], [196, 160], [210, 116]], 5, '#FFD54F')
      + Lc('M110 172l-6 10M124 172l2 10', '#8D6E63', 3)
      + P('M144 128l26-50 12 6-20 50z', '#795548', 3) + Lc('M152 118l10-4M158 106l10-4M164 94l10-4', '#4E342E', 2)
      + E(120, 140, 40, 32, '#8D6E63', 3) + Lc('M106 150l18-4M112 160l16-4M128 140l14-2', '#5D4037', 2.5)
      + C(90, 114, 22, '#8D6E63', 3) + Lc('M80 106l20-4', '#D7CCC8', 3) + P('M70 116l-14 4 14 4z', '#5D4037', 2.5) + C(84, 114, 3.5, INK, 0) + E(92, 124, 6, 3.5, '#FF8FA3', 0)),

  // ---------- Dublin and the west coast
  L('ie/ireland/landmark-newgrange.v1.svg', 'นิวเกรนจ์ เนินหินโบราณที่แสงอาทิตย์ส่องเข้าประตู', 'Newgrange, the ancient mound the winter sun shines into', ['newgrange', 'นิวเกรนจ์', 'brú na bóinne', 'boyne valley', 'หุบเขาบอยน์', 'passage tomb', 'เนินหินโบราณ', 'winter solstice', 'วันเหมายัน', 'spiral stone'], 'หาลายก้นหอยบนหินหน้าประตู', 'Find the spirals on the stone at the door',
    // a great round grass-topped mound with a white quartz wall dotted with dark round stones, a small dark doorway with a box window above, a big kerbstone carved with spirals in front, a low sun sending a beam to the door
    C(30, 60, 14, '#FFD54F', 3) + Lc('M42 66l66 74', '#FFE082', 5)
      + P('M8 158c10-60 70-88 112-88s102 28 112 88z', '#7CB342', 3) + face(120, 104, 0.5)
      + P('M8 158c40-18 184-18 224 0v28c-40-18-184-18-224 0z', '#F5F5F5', 3)
      + dots([[24, 166], [44, 160], [66, 158], [86, 156], [154, 156], [176, 158], [196, 160], [216, 166], [34, 178], [60, 172], [180, 172], [206, 178]], 4, '#546E7A')
      + R(108, 148, 24, 32, '#37474F', 2, 3) + R(108, 134, 24, 8, '#37474F', 1, 2.5) + Lc('M104 146h32', '#9E9E9E', 4)
      + E(120, 204, 58, 16, '#BDBDBD', 3) + [[94, 204], [120, 202], [146, 204]].map(([x, y]) => P(`M${x} ${y}m-2 0a2 2 0 1 1 4 0a5 5 0 1 1-10 0a8 8 0 1 1 16 0`, 'none', 2)).join('')),

  // ---------- Sweden
  K('se', 'food', 'lussekatt', 'ลุสเซกัตต์ ขนมปังหญ้าฝรั่นรูปตัวเอส', 'Lussekatter, the S-shaped saffron buns', ['lussekatt', 'ลุสเซกัตต์', 'lussekatter', 'saffron bun', 'ขนมปังหญ้าฝรั่น', 'lucia buns', 'ขนมปังรูปตัวเอส', 'december baking', 'raisins', 'ลูกเกด'],
    // three bright-yellow saffron buns rolled into an S with both ends curled into snails, a raisin in the middle of each curl, on a round tray
    E(120, 150, 108, 64, '#B0BEC5', 3) + E(120, 146, 96, 54, '#ECEFF1', 0)
      + [[76, 126, -10, 0.8], [164, 128, 12, 0.8], [120, 168, 0, 1]].map(([x, y, r, s], k) => g(x, y, s,
        P('M-34-14c-2-14 18-18 22-6 6 14-4 22 4 30 10 10 34 4 36-12 2-14-18-18-22-6', 'none', 0) + Lc('M-34-14c-2-14 18-18 22-6 6 14-4 22 4 30 10 10 34 4 36-12 2-14-18-18-22-6', INK, 27) + Lc('M-34-14c-2-14 18-18 22-6 6 14-4 22 4 30 10 10 34 4 36-12 2-14-18-18-22-6', '#FFC107', 19)
        + Lc('M-30-14c2-6 10-6 12 0M14 2c2 6 10 6 12 0', '#FFE082', 3) + C(-24, -12, 4.5, '#4E342E', 2) + C(20, 4, 4.5, '#4E342E', 2) + (k === 2 ? face(-2, 20, 0.28) : ''), r)).join('')),

  // ---------- Stockholm
  L('se/stockholm/landmark-toastskagen.v1.svg', 'โทสต์สกาเกน ขนมปังปิ้งหน้ากุ้งกับไข่ปลา', 'Toast Skagen, shrimps on golden toast', ['toast skagen', 'โทสต์สกาเกน', 'skagenröra', 'shrimp toast', 'ขนมปังหน้ากุ้ง', 'prawns and dill', 'กุ้งกับผักชีลาว', 'fish roe', 'ไข่ปลา', 'swedish starter'], 'หาไข่ปลาสีส้มบนยอดกุ้ง', 'Find the orange roe on top of the shrimps',
    // a slice of golden buttery toast on a plate heaped with pink shrimps in a creamy dressing, a spoon of orange fish roe and a feathery dill sprig on top, a lemon wedge beside
    plate(178, 104, 32) + P('M50 170l20-58h104l20 58z', '#E2A04A', 3) + P('M58 166l18-48h92l18 48z', '#F6D08E', 0)
      + P('M70 150c4-30 30-44 52-44s48 14 52 44z', '#FFF8E1', 3)
      + [[86, 140, -20], [108, 128, 0], [132, 126, 10], [154, 140, 30], [100, 150, -10], [126, 146, 6], [146, 152, 20]].map(([x, y, r]) => g(x, y, 1, P('M-10 4c-4-10 2-18 12-16 8 2 10 10 6 16-2-6-6-8-10-6s-4 6-2 10z', '#FF8A80', 2.5) + Lc('M-4-8l2 4M2-10l0 4', '#E57373', 1.5), r)).join('')
      + C(120, 112, 12, '#FF7043', 3) + dots([[114, 108], [122, 106], [126, 114], [116, 116]], 2, '#FFAB91') + face(120, 156, 0.36)
      + Lc('M132 100c8-8 16-12 26-10M140 96l-2-10M148 92l2-10M154 92l8-6', '#43A047', 2.5)
      + P('M186 154l26-14-4 24z', '#FFEB3B', 3) + Lc('M190 154l18-8', '#FFF59D', 2)),

  // ---------- Budapest
  L('hu/budapest/landmark-balna.v1.svg', 'บาลนา อาคารกระจกรูปวาฬริมแม่น้ำดานูบ', 'Bálna, the glass whale building on the Danube', ['bálna', 'balna', 'บาลนา', 'whale building', 'อาคารรูปวาฬ', 'glass whale', 'วาฬกระจก', 'danube bank', 'ริมแม่น้ำดานูบ', 'fővám tér'], 'หาตาของวาฬบนหลังคากระจก', 'Find the whale’s eye on the glass roof',
    // two old yellow-brick warehouses joined by a bulging blue glass roof shaped like a whale's back and head, a criss-cross grid on the glass, a friendly eye and smile on its front, the river in front
    P('M-4 196c40-8 80 8 120 0s80-8 124 0v48H-4z', '#4FC3F7', 3) + Lc('M30 214q8-5 16 0t16 0M150 220q8-5 16 0t16 0', '#E1F5FE', 3)
      + R(18, 104, 56, 92, '#E8C27A', 0, 3) + P('M14 104l32-22 32 22z', '#A1673F', 3) + R(166, 112, 58, 84, '#E8C27A', 0, 3) + P('M162 112l33-20 33 20z', '#A1673F', 3)
      + Array.from({ length: 8 }, (_, k) => R(k < 4 ? 26 + (k % 2) * 24 : 174 + (k % 2) * 26, 120 + Math.floor((k % 4) / 2) * 34, 14, 20, '#FFF3E0', 6, 2)).join('')
      + P('M70 196V128c10-56 70-80 120-54 24 12 26 40 22 122z', '#4FC3F7', 3)
      + Lc('M80 196c0-50 20-90 70-104M110 196c0-50 20-80 60-88M150 196c4-40 20-70 50-74M72 150c40-10 100-10 142 0M76 120c40-16 90-20 132-6', '#E1F5FE', 2.5)
      + C(110, 120, 6, INK, 0) + C(112, 118, 2, '#FFFFFF', 0) + P('M88 150q20 14 40 4', 'none', 3) + E(124, 134, 7, 4, '#FF8FA3', 0)
      + Lc('M168 70c-6-12-2-24 6-30M168 70c6-12 14-16 22-14', '#81D4FA', 3)),

  // ---------- Salzburg
  L('at/salzburg/landmark-zwergerlgarten.v1.svg', 'สวนคนแคระหินอ่อนในสวนมีราเบลล์', 'The marble dwarfs of the Mirabell dwarf garden', ['zwergerlgarten', 'สวนคนแคระ', 'dwarf garden', 'marble dwarfs', 'รูปปั้นคนแคระหินอ่อน', 'mirabell', 'มีราเบลล์', 'funny statues', 'รูปปั้นตลก', 'baroque garden'], 'หาคนแคระที่ใส่หมวกปีกกว้าง', 'Find the dwarf in the wide-brimmed hat',
    // two chubby white marble dwarf statues on stone pedestals among clipped hedges: one with a tall pointed cap and a round belly, one with a wide hat and hands on hips, flowers at their feet
    R(10, 120, 220, 50, '#66BB6A', 22, 3) + E(120, 214, 112, 16, '#A5D6A7', 3)
      + [[74, '#ECEFF1'], [166, '#ECEFF1']].map(([x]) => R(x - 26, 176, 52, 34, '#BDBDBD', 3, 3) + R(x - 30, 172, 60, 8, '#9E9E9E', 2, 2.5)).join('')
      + g(74, 172, 1, P('M-20 0c-8-30 4-52 20-52s28 22 20 52z', '#F5F5F5', 3) + E(0, -24, 16, 14, '#FFFFFF', 2.5) + C(0, -62, 16, '#F5F5F5', 3) + P('M-14-70l14-36 14 36z', '#E0E0E0', 3) + face(0, -62, 0.34))
      + g(166, 172, 1, P('M-22 0c-6-28 2-50 22-50s28 22 22 50z', '#F5F5F5', 3) + Lc('M-20-32l-10 8 8 8M20-32l10 8-8 8', INK, 3) + C(0, -60, 15, '#F5F5F5', 3) + E(0, -74, 30, 7, '#E0E0E0', 3) + P('M-12-76c0-16 24-16 24 0z', '#E0E0E0', 3) + face(0, -58, 0.32))
      + dots([[24, 206], [40, 214], [200, 206], [216, 214], [120, 214]], 5, '#F06292') + dots([[32, 212], [208, 212]], 5, '#FFCA28')),

  // ---------- Slovakia
  K('sk', 'culture', 'krpce', 'รองเท้าหนังกร์ปเซ่ผูกสายพันขา', 'Krpce, leather shepherd shoes laced up the leg', ['krpce', 'กร์ปเซ่', 'leather moccasins', 'รองเท้าหนัง', 'folk shoes', 'รองเท้าพื้นบ้าน', 'shepherd shoes', 'รองเท้าคนเลี้ยงแกะ', 'onuce', 'folk costume'],
    // a pair of soft brown leather shoes with gathered pointed toes: one worn over a white wool foot wrap with long leather straps criss-crossed up the leg, one lying on its side with its strap coiled
    P('M70 40c-6 40-8 80-4 122h44c4-42 2-82-4-122z', '#FAFAFA', 3) + Lc('M68 60c14 6 28 10 40 10M106 76c-12 6-26 10-40 10M66 104c14 6 30 10 44 10M110 120c-14 6-30 10-44 10M66 144c14 4 30 8 44 8', '#6D4C41', 4)
      + P('M54 158c0-10 10-14 20-14h44c18 0 50 10 56 26 2 8-4 12-12 12H66c-8 0-12-8-12-24z', '#8D5A3B', 3)
      + Lc('M150 162l12-4M152 170l14 0M150 178l12 4', '#5D3A1A', 2.5) + face(98, 164, 0.36)
      + g(170, 92, 1, P('M-34 10c0-14 10-20 24-20h22c14 0 26 8 26 20 0 8-8 12-16 12h-42c-8 0-14-4-14-12z', '#A1673F', 3) + Lc('M30 4l10-4M32 12l12 0', '#5D3A1A', 2.5)
        + P('M-30-6c-20-10-14-32 8-28 20 4 12 22-2 18', 'none', 0) + Lc('M-30-6c-20-10-14-32 8-28 20 4 12 22-2 18', '#6D4C41', 4), -10)),

  // ---------- Bratislava and the High Tatras
  L('sk/bratislava/landmark-pagac.v1.svg', 'ปากาช ขนมปังกรอบลายตารางของบราติสลาวา', 'Pagáč, the little scones with a criss-cross top', ['pagáč', 'pagac', 'ปากาช', 'pagáče', 'savoury scones', 'ขนมปังกรอบ', 'criss-cross top', 'ลายตาราง', 'bakery snack', 'ของว่างร้านเบเกอรี'], 'หาลายตารางบนหลังขนม', 'Find the criss-cross pattern on top',
    // a little pile of round golden scones, each with a shiny criss-cross pattern scored into its top, one broken open to show flaky layers, on a checked napkin
    P('M30 176l90-30 96 30-90 34z', '#FFFFFF', 3) + Lc('M60 166l94 34M90 156l94 34M48 186l92-30M78 196l92-30', '#90CAF9', 3)
      + [[86, 150, 1], [150, 156, 1], [118, 112, 1.05], [70, 186, 0.9]].map(([x, y, s], k) => g(x, y, s, P('M-30 0v12c0 8 14 12 30 12s30-4 30-12V0z', '#E2A04A', 3) + E(0, 0, 30, 14, '#F2B65C', 3)
        + Lc('M-18-8l18 16M-6-12l18 16M6-12l16 14M-22 0l12 10M-8 10l-14-12M6 12l-18-16M18 8l-18-18', '#C0812F', 2) + (k === 2 ? face(0, 2, 0.3) : ''))).join('')
      + g(176, 196, 0.85, E(0, 0, 26, 12, '#F2B65C', 3) + Lc('M-22 0h44M-20 6h40M-20-6h40', '#FFF3D6', 2.5))),

  // ---------- Slovenia
  K('si', 'culture', 'klopotec', 'โคลปอเตตส์ กังหันไม้ส่งเสียงไล่นกในไร่', 'The klopotec, a wooden wind clapper that scares birds', ['klopotec', 'โคลปอเตตส์', 'wind rattle', 'กังหันส่งเสียง', 'wooden clapper', 'ไม้ตีเสียง', 'scare the birds', 'ไล่นก', 'štajerska hills', 'autumn harvest'],
    // a tall wooden pole on a green hill of striped rows, on top a wooden box with a whirling eight-bladed propeller at one end and a fanned tail of twigs at the other, little hammers tapping a board, clack lines round it
    P('M-4 210c40-40 90-60 124-60s88 20 124 60v34H-4z', '#9CCC65', 3) + Lc('M20 206c30-26 70-40 100-40M60 214c20-20 40-28 60-28M150 172c30 6 60 20 80 40', '#689F38', 3)
      + Lc('M120 196V96', '#8D6E63', 6)
      + Array.from({ length: 8 }, (_, k) => g(80, 84, 1, R(-3, -40, 6, 34, '#D7A86E', 2, 2.5), k * 45)).join('') + C(80, 84, 7, '#8D6E63', 2.5)
      + R(84, 76, 80, 18, '#A1673F', 3, 3) + P('M164 84l44-24-6 24 6 24z', '#795548', 3) + Lc('M168 84l34-18M168 84h36M168 84l34 18', '#5D4037', 2)
      + R(96, 100, 56, 8, '#D7A86E', 2, 2.5) + [104, 124, 144].map((x) => Lc(`M${x} 94v8`, '#5D4037', 3)).join('') + face(126, 84, 0.24, 'o')
      + Lc('M92 122c-6 4-8 10-6 16M160 122c6 4 8 10 6 16M100 132c-4 2-6 6-4 10', '#FFB300', 3)),

  // ---------- Hamburg
  L('de/hamburg/landmark-michel.v1.svg', 'หอระฆังโบสถ์มิเชล สัญลักษณ์ของฮัมบวร์ก', 'The Michel, Hamburg’s copper-green church tower', ['michel', 'มิเชล', 'st michael\'s church', 'hauptkirche st michaelis', 'โบสถ์เซนต์ไมเคิล', 'tower viewpoint', 'จุดชมวิวบนหอคอย', 'tower clock', 'นาฬิกาบนหอคอย', 'neustadt'], 'หานาฬิกาบนหอคอย', 'Find the clock on the tower',
    // a tall baroque tower: a red-brick base, a white clock storey, then copper-green stages with little columns, a round lantern and a slim spire with a ball, low church wings on both sides
    R(34, 156, 58, 64, '#B5653E', 0, 3) + R(148, 156, 58, 64, '#B5653E', 0, 3) + P('M30 156l20-18h42v18zM210 156l-20-18h-42v18z', '#5FA38B', 3)
      + [48, 72, 168, 192].map((x) => P(`M${x - 6} 200v-20c0-8 12-8 12 0v20z`, '#FFF3E0', 2)).join('')
      + R(94, 120, 52, 100, '#B5653E', 0, 3) + face(120, 196, 0.38) + P('M112 220v-14c0-10 16-10 16 0v14z', '#5D4037', 2.5)
      + R(98, 90, 44, 30, '#ECEFF1', 0, 3) + C(120, 105, 10, '#FFFFFF', 2.5) + Lc('M120 105v-6M120 105l5 3', INK, 2)
      + P('M100 90h40l-6-26h-28z', '#5FA38B', 3) + [108, 120, 132].map((x) => Lc(`M${x} 88v-20`, '#2E6B57', 2.5)).join('')
      + P('M106 64c0-14 28-14 28 0z', '#5FA38B', 3) + R(112, 42, 16, 12, '#5FA38B', 0, 2.5) + P('M110 42c0-10 20-10 20 0z', '#5FA38B', 2.5) + Lc('M120 32V8', '#5FA38B', 3) + C(120, 20, 4, '#FFCA28', 2)),
  L('de/hamburg/landmark-birnenbohnen.v1.svg', 'แพร์ ถั่วแขก และเบคอน อาหารฤดูร้อนของฮัมบวร์ก', 'Birnen, Bohnen und Speck: pears, beans and bacon', ['birnen bohnen und speck', 'เบียร์เนนโบเนินอุนด์ชเป็ก', 'pears beans and bacon', 'แพร์ ถั่ว เบคอน', 'green beans', 'ถั่วแขก', 'cooked pears', 'แพร์ต้ม', 'hamburg summer dish', 'north german food'], 'หาลูกแพร์ที่มีก้านชี้ขึ้น', 'Find the pear with its stalk pointing up',
    // a big plate with a heap of long green beans, three small whole cooked pears with their stalks, thick slices of pink-and-white bacon and two boiled potatoes with parsley
    plate(166, 106, 42) + [[-30, 0], [-20, 8], [-10, -4], [0, 6], [10, -2], [20, 10]].map(([dx, dy]) => Lc(`M${66 + dx} ${150 + dy}l60-20`, '#558B2F', 7) + Lc(`M${66 + dx} ${150 + dy}l60-20`, '#8BC34A', 4)).join('')
      + [[60, 130, -12], [96, 118, 0], [196, 150, 14]].map(([x, y, r], k) => g(x, y, 1, P('M0-26c-6 0-8 8-8 14-10 6-14 16-12 24 2 10 12 14 20 14s18-4 20-14c2-8-2-18-12-24 0-6-2-14-8-14z', '#E9C46A', 3) + Lc('M0-26l2-10', '#6D4C41', 3) + (k === 1 ? face(0, 4, 0.3) : ''), r)).join('')
      + [[140, 166, -6], [166, 172, 4]].map(([x, y, r]) => g(x, y, 1, R(-24, -10, 48, 20, '#F48FB1', 5, 3) + Lc('M-22-2h44M-22 4h44', '#FFFFFF', 3), r)).join('')
      + [[150, 132], [180, 128]].map(([x, y]) => E(x, y, 16, 12, '#FFE082', 3) + dots([[x - 4, y - 3], [x + 5, y + 2]], 2, '#43A047')).join('')),

  // ---------- Cologne and the Rhine
  L('de/cologne/landmark-sauerbraten.v1.svg', 'ซาวเออร์บราเทินแบบไรน์ เนื้ออบซอสลูกเกด กะหล่ำม่วง', 'Rhineland Sauerbraten with red cabbage and a potato dumpling', ['sauerbraten', 'ซาวเออร์บราเทิน', 'rhenish sauerbraten', 'pot roast', 'เนื้ออบซอส', 'red cabbage', 'กะหล่ำปลีม่วง', 'potato dumpling', 'เกี๊ยวมันฝรั่ง', 'raisin gravy'], 'หากะหล่ำสีม่วงบนจาน', 'Find the purple cabbage on the plate',
    // a white plate with slices of dark roast meat in a glossy brown raisin gravy, a heap of shredded purple red cabbage and a big round pale potato dumpling, a little bowl of apple sauce
    E(120, 160, 108, 50, '#FFFFFF', 3) + E(120, 158, 92, 40, '#F5F5F5', 0)
      + E(92, 168, 50, 24, '#5D3A1A', 3) + [[72, 160, -10], [96, 158, 0], [118, 164, 10]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 18, 12, '#8D5A3B', 3) + Lc('M-10-2h18', '#A1673F', 2), r)).join('')
      + dots([[70, 178], [88, 182], [110, 180], [124, 174]], 3, '#2B1A0C') + Lc('M60 172q8 3 14 0', '#8D6E63', 2)
      + P('M134 118c0-14 18-20 30-14 12-6 30 2 28 16 8 6 4 22-8 22h-44c-12 0-14-16-6-24z', '#7B1FA2', 3) + Lc('M142 116c8 4 18 4 24 0M140 128c10 4 26 4 38 0M150 136c8 2 16 2 24 0', '#BA68C8', 2.5)
      + C(170, 176, 24, '#F5E6C8', 3) + dots([[160, 168], [176, 164], [168, 182]], 2.5, '#D7B98E') + face(170, 178, 0.38)
      + g(44, 106, 1, E(0, 0, 22, 8, '#FFFFFF', 3) + P('M-22 0c2 18 42 18 44 0z', '#FFFFFF', 3) + E(0, 0, 16, 5, '#FFE082', 0))),
];

export default { places: {}, items };
