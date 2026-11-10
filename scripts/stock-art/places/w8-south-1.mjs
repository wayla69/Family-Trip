// Wave 8, south (1): Italy — the country layer, Rome, Venice, Florence and Tuscany, Milan, the Amalfi Coast, the Dolomites, Sicily, the Cinque Terre
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (it/rome/landmark-forum.v1.svg → it-rome.landmark.forum)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture: <cc>.<cat>.<key> in <cc>/<cat>-<key>.v1.svg
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const cloud = (x, y, s = 1) => g(x, y, s, P('M-24 6c-10 0-10-14 0-14 2-10 18-12 22-4 6-8 22-4 20 6 10 0 10 12 0 12z', '#FFFFFF', 2));
const waves = (y, c = '#B3E5FC') => Lc(`M20 ${y}c14-4 28 4 42 0M150 ${y + 14}c14-4 28 4 42 0`, c, 2.5);
const cypress = (x, y, h = 60) => P(`M${x} ${y - h}c10 20 10 ${h - 10} 0 ${h}c-10-10-10-${h - 20} 0-${h}z`, '#2E7D32', 2);
const pine = (x, y, s = 1) => g(x, y, s, Lc('M0 0v-34', '#6D4C41', 4) + P('M-26-34c0-14 52-14 52 0z', '#388E3C', 2));
const fir = (x, y, h = 40) => P(`M${x} ${y - h}l${h * 0.35} ${h}h-${h * 0.7}z`, '#2E7D32', 2);

const items = [
  // ---------- Italy, the country
  K('it', 'food', 'tiramisu', 'ขนมทีรามิสุ', 'Tiramisù', ['tiramisu', 'tiramisù', 'ทีรามิสุ', 'mascarpone', 'มาสคาร์โปเน', 'cocoa powder', 'ผงโกโก้', 'ladyfingers', 'savoiardi', 'italian dessert', 'ขนมหวานอิตาลี'],
    // a tall square slice of tiramisù on a plate: cocoa-dusted top, cream and coffee-soaked sponge in stripes, a spoon beside it
    E(120, 196, 92, 20, '#E3F2FD') + E(120, 192, 70, 12, '#FFFFFF', 2)
      + g(120, 128, 1, R(-56, -50, 112, 110, '#FFF8E1', 6) + R(-56, -24, 112, 18, '#B9814A', 0, 2.5) + R(-56, 18, 112, 18, '#B9814A', 0, 2.5) + R(-56, -50, 112, 14, '#6D4C41', 6) + Array.from({ length: 8 }, (_, k) => C(-46 + k * 13, -44 + (k % 2) * 4, 2, '#4E342E', 0)).join('') + face(0, 0, 0.42))
      + g(196, 150, 1, Lc('M0 40l10-80', '#B0BEC5', 5) + E(11, -46, 8, 12, '#CFD8DC', 3), 10)),
  K('it', 'food', 'lasagne', 'ลาซานญ่าในถาดอบ', 'Lasagne in its baking dish', ['lasagne', 'lasagna', 'ลาซานญ่า', 'baking dish', 'ถาดอบ', 'pasta sheets', 'แผ่นพาสต้า', 'bolognese', 'ซอสเนื้อ', 'bechamel', 'emilia-romagna'],
    // a red baking dish of lasagne with a square lifted out on a spatula, showing wavy pasta, red sauce and melted cheese; steam rising
    R(26, 120, 188, 76, '#E53935', 14) + R(36, 112, 168, 22, '#F4C26B', 6) + Array.from({ length: 6 }, (_, k) => C(50 + k * 28, 120, 6, '#E07B39', 0)).join('') + R(14, 128, 18, 14, '#C62828', 5) + R(208, 128, 18, 14, '#C62828', 5)
      + g(140, 76, 1, R(-30, -26, 60, 52, '#F4C26B', 4) + Lc('M-30-12c10-4 20 4 30 0s20-4 30 0', '#C0392B', 6) + Lc('M-30 4c10-4 20 4 30 0s20-4 30 0', '#FFF59D', 5) + Lc('M-30 16c10-4 20 4 30 0s20-4 30 0', '#C0392B', 6) + face(0, -18, 0.3))
      + P('M110 104h60l14 18h-88z', '#B0BEC5') + Lc('M184 122l26 30', '#8D6E63', 8) + Lc('M60 96c-6-10 4-16 0-26M84 92c-6-10 4-16 0-26', '#CFD8DC', 3) + face(120, 166, 0.45)),
  K('it', 'animal', 'porcupine', 'เม่นหงอนอิตาลี', 'The crested porcupine', ['crested porcupine', 'istrice', 'เม่นหงอน', 'porcupine', 'เม่น', 'quills', 'ขนแหลม', 'italian wildlife', 'สัตว์ป่าอิตาลี', 'nocturnal animal', 'หากินกลางคืน'],
    // a round dark porcupine with a fan of long black-and-white striped quills raised over its back, a little crest of hair on its head, a friendly snout
    Array.from({ length: 11 }, (_, k) => { const a = (-170 + k * 16) * Math.PI / 180; const x2 = 128 + 92 * Math.cos(a); const y2 = 140 + 92 * Math.sin(a); return Lc(`M128 140L${x2.toFixed(1)} ${y2.toFixed(1)}`, INK, 9) + Lc(`M${(128 + 40 * Math.cos(a)).toFixed(1)} ${(140 + 40 * Math.sin(a)).toFixed(1)}L${(128 + 60 * Math.cos(a)).toFixed(1)} ${(140 + 60 * Math.sin(a)).toFixed(1)}M${(128 + 72 * Math.cos(a)).toFixed(1)} ${(140 + 72 * Math.sin(a)).toFixed(1)}L${(128 + 86 * Math.cos(a)).toFixed(1)} ${(140 + 86 * Math.sin(a)).toFixed(1)}`, '#FFFFFF', 4); }).join('')
      + E(128, 162, 70, 42, '#5D4037') + P('M58 168c-20-2-34 6-36 18 10 8 30 6 44-2z', '#795548') + C(30, 180, 6, INK, 0) + Lc('M70 128c-4-16 4-24 14-28M80 128c0-14 8-20 18-22', '#4E342E', 4)
      + E(84, 202, 12, 6, '#4E342E') + E(160, 204, 12, 6, '#4E342E') + face(68, 162, 0.42)),

  // ---------- Rome
  L('it/rome/landmark-forum.v1.svg', 'ซากโรมันฟอรัม', 'The ruins of the Roman Forum', ['roman forum', 'foro romano', 'โรมันฟอรัม', 'three columns', 'เสาสามต้น', 'via sacra', 'ancient ruins', 'ซากเมืองโบราณ', 'palatine hill', 'เนินพาลาไทน์', 'arch of septimius severus'], 'หาเสาสูงสามต้นที่ยังยืนเรียงกันกลางซากเมือง', 'Find the three tall columns still standing together among the ruins',
    // three tall fluted marble columns holding a scrap of roof beam, a stubby triumphal arch behind, fallen column drums and grass, an umbrella pine on the hill
    sky('#BBDEFB') + cloud(186, 40, 0.8) + P('M-4 120c60-30 140-34 248-10v40H-4z', '#9CCC65', 3) + pine(200, 112, 1)
      + g(66, 152, 1, R(-36, -50, 72, 50, '#EAD9B8', 2, 3) + P('M-12 0v-26c0-16 24-16 24 0v26z', '#8D6E63', 2.5) + R(-40, -60, 80, 12, '#D7C29A', 2, 3))
      + R(-4, 170, 248, 74, '#C5E1A5', 0, 3) + [96, 130, 164].map((x) => R(x, 60, 22, 150, '#FAF3E3', 2, 3) + Lc(`M${x + 7} 66v140M${x + 15} 66v140`, '#D7C9AE', 2) + R(x - 4, 52, 30, 10, '#EAD9B8', 2, 2.5)).join('')
      + R(88, 34, 106, 20, '#EAD9B8', 2, 3) + E(60, 214, 22, 10, '#EAD9B8', 3) + E(210, 206, 16, 8, '#EAD9B8', 3) + R(184, 186, 30, 16, '#D7C9AE', 3, 3) + face(141, 120, 0.4)),
  L('it/rome/landmark-appia.v1.svg', 'ถนนโบราณแอปเปียนเวย์', 'The old Appian Way', ['appian way', 'via appia antica', 'ถนนแอปเปียน', 'ancient road', 'ถนนโบราณ', 'umbrella pines', 'ต้นสนทรงร่ม', 'bike ride', 'ปั่นจักรยาน', 'basalt paving', 'catacombs park'], 'หาต้นสนทรงร่มที่ขึ้นเรียงริมถนนหินโบราณ', 'Find the umbrella pines lined up along the old stone road',
    // a road of big grey polygon paving stones running off into the distance between umbrella pines and a crumbling brick tomb, a family cycling along it
    sky('#FFE0B2') + C(56, 52, 18, '#FFF59D', 2) + P('M-4 120h248v124H-4z', '#AED581', 3) + P('M108 120h24l80 124H28z', '#90A4AE', 3)
      + [[118, 132, 10], [124, 142, 12], [112, 150, 14], [128, 162, 16], [104, 176, 18], [134, 184, 20], [96, 204, 22], [144, 210, 24], [86, 232, 22], [158, 236, 24]].map(([x, y, r]) => P(`M${x - r * 0.9} ${y}l${r * 0.4}-${r * 0.5}h${r}l${r * 0.4} ${r * 0.5}-${r * 0.4} ${r * 0.5}h-${r}z`, '#B0BEC5', 1.5)).join('')
      + pine(70, 122, 0.8) + pine(170, 122, 0.8) + pine(30, 150, 1.2) + pine(214, 150, 1.2) + g(56, 186, 1, P('M-24 20v-34h48v34z', '#C47A55', 3) + Lc('M-24 0h48M-10-14v14', '#8D4A2F', 2))
      + g(150, 196, 1, C(-14, 14, 10, 'none', 3) + C(14, 14, 10, 'none', 3) + Lc('M-14 14l10-16h16l6 16M0-2l-4-8', INK, 3) + C(-2, -26, 7, '#FFE0BD', 2) + P('M-8-18h12l2 14h-14z', '#E53935', 2) + face(-2, -26, 0.2)) + face(120, 140, 0.32)),
  L('it/rome/landmark-maritozzo.v1.svg', 'ขนมปังมาริตอซโซไส้วิปครีม', 'A maritozzo, Rome\'s cream bun', ['maritozzo', 'maritozzi', 'มาริตอซโซ', 'cream bun', 'ขนมปังไส้ครีม', 'whipped cream', 'วิปครีม', 'roman breakfast', 'อาหารเช้าโรม', 'pasticceria', 'ร้านขนม'], 'หาขนมปังที่ยิ้มกว้างด้วยครีมขาวฟู', 'Find the bun with a big smile of fluffy white cream',
    // a glossy golden bun split open and stuffed with a huge wave of whipped cream, dusted with sugar, on a little paper on a marble café table, a tiny cup beside it
    sky('#FCE4EC') + R(-4, 172, 248, 72, '#ECEFF1', 0, 3) + Lc('M20 200c30 10 60-6 90 4M140 220c30 6 50-8 80 0', '#CFD8DC', 2)
      + g(110, 140, 1, P('M-80 20c0-26 40-44 80-44s80 18 80 44z', '#D99A40', 3) + P('M-84 8c10-34 158-34 168 0-10 20-158 20-168 0z', '#FFFFFF', 3) + Lc('M-60 0c20 8 40-8 60 0s40-8 60 0', '#ECEFF1', 3) + P('M-84 22c10 30 158 30 168 0', '#D99A40', 3) + E(-30, 30, 14, 4, '#F3C77A', 0) + Array.from({ length: 6 }, (_, k) => C(-50 + k * 20, -10 + (k % 2) * 6, 2, '#FFF8E1', 0)).join('') + face(0, 34, 0.4))
      + g(200, 176, 1, P('M-14-16h28l-4 22h-20z', '#FFFFFF', 2.5) + R(-16, -20, 32, 6, '#8D6E63', 3, 2) + P('M14-10c8 0 8 10 0 10', 'none', 2.5) + E(0, 8, 20, 4, '#FFFFFF', 2))),
  L('it/rome/landmark-keyhole.v1.svg', 'รูกุญแจลับบนเนินอาเวนติโน', 'The secret keyhole on the Aventine Hill', ['aventine keyhole', 'buco della serratura', 'รูกุญแจ', 'aventine hill', 'เนินอาเวนติโน', 'secret view', 'วิวลับ', 'orange garden', 'giardino degli aranci', 'สวนส้ม', 'hedge tunnel'], 'หารูกุญแจเล็กๆ ที่แอบมองเห็นโดมไกลๆ', 'Find the little keyhole with a faraway dome inside it',
    // a big old green door in an ochre wall, a child standing on tiptoe to peep through the keyhole; a round bubble shows the view inside: a tunnel of hedges and a tiny dome
    sky('#FFE0B2') + R(-4, -4, 248, 248, '#F2C38B', 0, 0) + R(26, 54, 118, 170, '#2E7D32', 4, 3) + Lc('M85 54v170', '#1B5E20', 3) + R(36, 66, 40, 60, '#388E3C', 3, 2.5) + R(94, 66, 40, 60, '#388E3C', 3, 2.5) + R(36, 140, 40, 70, '#388E3C', 3, 2.5) + R(94, 140, 40, 70, '#388E3C', 3, 2.5)
      + R(98, 120, 26, 34, '#FFD54F', 4, 2.5) + C(111, 132, 4, INK, 0) + P('M109 134h4l2 10h-8z', INK, 0) + R(-4, 224, 248, 20, '#BCAAA4', 0, 3)
      + kid(160, 226, '#E53935', 1.6)
      + g(186, 72, 1, C(0, 0, 44, '#B3E5FC', 3) + P('M-44 0c0-24 18-40 26-40v80c-8 0-26-16-26-40zM44 0c0-24-18-40-26-40v80c8 0 26-16 26-40z', '#43A047', 2.5) + P('M-8 4c0-12 16-12 16 0z', '#ECEFF1', 2) + R(-8, 4, 16, 6, '#ECEFF1', 0, 2) + C(0, -10, 2.5, '#ECEFF1', 1.5) + face(0, 24, 0.25)) + Lc('M150 106l12-10M156 116l14-6', INK, 2)),
  L('it/rome/landmark-circusmaximus.v1.svg', 'ลานแข่งรถม้าเซอร์คัสแม็กซิมัส', 'The Circus Maximus racetrack', ['circus maximus', 'circo massimo', 'เซอร์คัสแม็กซิมัส', 'chariot race', 'แข่งรถม้าโบราณ', 'ancient racetrack', 'สนามแข่งโบราณ', 'long oval field', 'ลานหญ้ายาว', 'palatine ruins'], 'หารถม้าสองคันที่วิ่งแข่งกันรอบลานหญ้ารูปไข่', 'Find the two little chariots racing round the long grassy oval',
    // the long grassy oval valley with a low middle wall and a stone post at each end, two cartoon chariots pulled by happy horses racing round, brick ruins on the hill behind
    sky('#BBDEFB') + P('M-4 96c40-18 80-14 120-8v20H-4z', '#A1887F', 3) + R(10, 64, 26, 32, '#C47A55', 0, 3) + R(48, 56, 30, 40, '#C47A55', 0, 3) + Lc('M58 70v14M66 70v14M18 74v10', '#8D4A2F', 3) + pine(214, 100, 0.9)
      + P('M-4 108h248v136H-4z', '#9CCC65', 3) + E(120, 168, 112, 48, '#D7CCA1', 3) + E(120, 168, 76, 18, '#9CCC65', 3) + R(52, 164, 136, 8, '#EAD9B8', 3, 2.5) + [56, 184].map((x) => R(x - 4, 140, 8, 28, '#FAF3E3', 2, 2.5)).join('')
      + [[60, 206, '#E53935', 1], [176, 132, '#1E88E5', -1]].map(([x, y, c, d]) => g(x, y, 1, E(-18 * d, 0, 18, 10, '#FFFFFF', 2.5) + C(-30 * d, -12, 5, '#FFFFFF', 2) + Lc(`M${-8 * d} 0h${12 * d}`, '#8D6E63', 3) + P(`M${4 * d} -14h${16 * d}v14h-${16 * d}z`, c, 2.5) + C(12 * d, 4, 8, '#FFCA28', 2.5) + C(12 * d, -22, 6, '#FFE0BD', 2) + face(12 * d, -22, 0.16) + face(-24 * d, -2, 0.16))).join('')),

  // ---------- Venice
  L('it/venice/landmark-wellhead.v1.svg', 'ปากบ่อน้ำหินกลางจัตุรัสเล็ก', 'A carved stone wellhead in a Venetian campo', ['vera da pozzo', 'wellhead', 'ปากบ่อน้ำ', 'campo', 'จัตุรัสเล็ก', 'campiello', 'stone well', 'บ่อน้ำหิน', 'rainwater cistern', 'venetian square', 'ลานหน้าบ้าน'], 'หาบ่อน้ำหินแกะสลักที่มีฝาเหล็กปิดอยู่', 'Find the carved stone well with its iron lid',
    // a round carved white-stone wellhead with garland bumps and a little iron lid on a step, in a quiet square paved in grey stone, pastel houses with green shutters behind, a child sitting on the step
    sky('#B3E5FC') + R(-4, 30, 70, 130, '#F8BBD0', 0, 3) + R(66, 46, 90, 114, '#FFE0B2', 0, 3) + R(156, 24, 92, 136, '#C5E1A5', 0, 3)
      + [[14, 60], [34, 60], [14, 106], [34, 106], [86, 72], [126, 72], [178, 50], [210, 50], [178, 98], [210, 98]].map(([x, y]) => R(x, y, 14, 22, '#43A047', 2, 2.5) + Lc(`M${x + 7} ${y}v22`, '#2E7D32', 1.5)).join('')
      + P('M-4 160h248v84H-4z', '#B0BEC5', 3) + Lc('M-4 190h248M-4 220h248M40 160l-20 84M120 160v84M200 160l20 84', '#90A4AE', 2)
      + R(60, 196, 120, 14, '#ECEFF1', 3, 3) + g(120, 160, 1, P('M-42 36v-50c0-6 84-6 84 0v50z', '#FAFAFA', 3) + E(0, -14, 44, 10, '#ECEFF1', 3) + E(0, -16, 30, 6, '#546E7A', 2.5) + Lc('M0-22v-14', '#546E7A', 3) + C(0, -38, 4, '#546E7A', 2) + [-28, 0, 28].map((x) => P(`M${x - 10} 4c4 10 16 10 20 0`, 'none', 2.5) + C(x, 18, 4, '#E0E0E0', 2)).join('') + face(0, 6, 0.32))
      + kid(196, 194, '#7E57C2', 1)),
  L('it/venice/landmark-chimneys.v1.svg', 'ปล่องไฟทรงกรวยบนหลังคาเวนิส', 'The funnel chimneys on Venice\'s rooftops', ['comignoli', 'funnel chimneys', 'ปล่องไฟทรงกรวย', 'venetian rooftops', 'หลังคาเวนิส', 'altana', 'ระเบียงไม้บนหลังคา', 'terracotta roof tiles', 'กระเบื้องดินเผา', 'rooftop terrace'], 'หาปล่องไฟหน้าตาเหมือนกรวยคว่ำบนหลังคา', 'Find the chimneys shaped like upside-down funnels on the roofs',
    // a jumble of red-tiled roofs with tall funnel-topped chimneys (wide cones sitting on thin stacks), a little wooden rooftop terrace with flower pots, a seagull flying over the lagoon sky
    sky('#FFE0B2') + C(196, 50, 20, '#FFF59D', 2) + P('M40 40c6-6 12-6 16 0 4-6 10-6 16 0', 'none', 3)
      + P('M-4 150l60-30 60 30v94H-4z', '#D9663A', 3) + P('M100 170l70-40 78 34v80H100z', '#E07B39', 3) + Lc('M10 170h90M10 190h90M110 190h130M110 212h130', '#B84A23', 2)
      + [[40, 128, 1.1], [86, 136, 0.9], [150, 128, 1.2], [210, 136, 1]].map(([x, y, s]) => g(x, y, s, R(-6, -40, 12, 40, '#E8A27A', 0, 3) + P('M-22-62h44l-14 22h-16z', '#C9714A', 3) + Lc('M-18-56h36', '#E8A27A', 2.5))).join('')
      + g(152, 176, 1, R(-30, -6, 60, 6, '#8D6E63', 1, 2.5) + Lc('M-28-6v-22M-10-6v-22M10-6v-22M28-6v-22M-30-24h60', '#8D6E63', 3) + [-18, 0, 18].map((x) => P(`M${x - 5} -12h10l-2 8h-6z`, '#E07B39', 2) + C(x, -16, 5, ['#E91E63', '#FFCA28', '#AB47BC'][(x + 18) / 18], 2)).join('')) + face(150, 82, 0.3)),
  L('it/venice/landmark-watertaxi.v1.svg', 'เรือแท็กซี่ไม้ขัดมันในเวนิส', 'A shiny wooden water taxi', ['water taxi', 'taxi acqueo', 'เรือแท็กซี่', 'motoscafo', 'varnished wooden boat', 'เรือไม้ขัดมัน', 'lagoon', 'ลากูน', 'airport boat', 'เรือไปสนามบิน', 'grand canal ride'], 'หาเรือไม้สีน้ำตาลมันวาวที่มีหลังคาสีขาว', 'Find the glossy brown wooden boat with the white cabin roof',
    // a sleek varnished honey-brown motorboat with a white cabin and round windows speeding across green canal water, white wake behind, pastel palaces and a striped mooring pole
    sky('#B3E5FC') + R(-4, 40, 70, 90, '#FFCC80', 0, 3) + R(66, 56, 80, 74, '#F8BBD0', 0, 3) + R(146, 36, 102, 94, '#FFF59D', 0, 3) + [[14, 60], [40, 60], [86, 74], [118, 74], [168, 56], [206, 56]].map(([x, y]) => P(`M${x} ${y + 26}v-18c0-8 14-8 14 0v18z`, '#FFFFFF', 2.5)).join('')
      + R(-4, 130, 248, 114, '#4DB6AC', 0, 3) + Lc('M30 210c14-4 28 4 42 0M170 224c14-4 28 4 42 0', '#B2DFDB', 2.5) + R(210, 96, 10, 104, '#FFFFFF', 3, 2.5) + Lc('M210 110l10 8M210 130l10 8M210 150l10 8', '#1E88E5', 4)
      + P('M14 168c20-6 34 10 54 2', '#FFFFFF', 2.5) + g(118, 168, 1, P('M-86 0h160c10 0 24-8 30-16l-6 30c-6 8-14 12-24 12h-140c-12 0-20-10-20-26z', '#B5651D', 3) + Lc('M-80 6h160', '#E0A060', 3) + P('M-40 0v-22c0-8 6-12 14-12h50c10 0 16 6 18 14l2 20z', '#FFFFFF', 3) + [-26, -6, 14].map((x) => C(x, -16, 5, '#81D4FA', 2)).join('') + face(-50, 12, 0.3))),
  L('it/venice/landmark-arsenale.v1.svg', 'หอคอยคู่ประตูน้ำอาร์เซนาเล', 'The twin towers of the Arsenale water gate', ['arsenale', 'อาร์เซนาเล', 'old shipyard', 'อู่ต่อเรือโบราณ', 'twin towers', 'หอคอยคู่', 'water gate', 'ประตูน้ำ', 'castello district', 'wooden footbridge', 'สะพานไม้'], 'หาหอคอยอิฐสองหลังที่ยืนเฝ้าคลองเหมือนประตูเมือง', 'Find the two brick towers guarding the canal like a gate',
    // two square red-brick towers with white crenellated tops facing each other across a canal, a wooden footbridge between them, the canal running in through the gate
    sky('#E1F5FE') + cloud(120, 36, 0.8) + R(-4, 120, 248, 40, '#FFE0B2', 0, 3)
      + [[30, 0], [150, 1]].map(([x]) => R(x, 40, 60, 150, '#C9583A', 0, 3) + R(x - 4, 34, 68, 12, '#FAF3E3', 0, 3) + Array.from({ length: 4 }, (_, k) => R(x - 4 + k * 18, 22, 10, 12, '#FAF3E3', 0, 2.5)).join('') + Lc(`M${x} 80h60M${x} 120h60M${x} 160h60`, '#A84A2E', 2) + P(`M${x + 22} 100v-18c0-10 16-10 16 0v18z`, '#37474F', 2.5)).join('')
      + R(-4, 190, 248, 54, '#4DB6AC', 0, 3) + P('M90 170h60v20H90z', '#4DB6AC', 0) + Lc('M30 214c14-4 28 4 42 0M160 226c14-4 28 4 42 0', '#B2DFDB', 2.5)
      + P('M86 150c10-14 58-14 68 0v8c-10-12-58-12-68 0z', '#A1887F', 3) + Lc('M90 140h60', '#8D6E63', 3) + Lc('M94 140v10M110 136v10M130 136v10M146 140v10', '#8D6E63', 2) + kid(120, 140, '#FFCA28', 0.8) + face(60, 66, 0.32) + face(180, 66, 0.32)),
  L('it/venice/landmark-forcola.v1.svg', 'ที่วางพายฟอร์โคลาแกะสลักจากไม้', 'A carved forcola, the gondola\'s oarlock', ['forcola', 'ฟอร์โคลา', 'oarlock', 'ที่วางพาย', 'carved walnut', 'ไม้วอลนัตแกะสลัก', 'oar maker', 'remer', 'ช่างทำพาย', 'woodcarving workshop', 'gondolier tools'], 'หาท่อนไม้แกะโค้งๆ ที่ใช้วางพายเรือ', 'Find the curvy carved piece of wood that holds the oar',
    // a tall swirling walnut-wood oarlock with curved notches standing on the workbench, a long oar resting in its top notch, wood shavings curling on the bench, tools on the wall
    sky('#FFF3E0') + R(-4, -4, 248, 150, '#FFE0B2', 0, 0) + Lc('M30 40h60', '#8D6E63', 4) + [40, 60, 80].map((x) => Lc(`M${x} 40v30`, '#90A4AE', 4) + R(x - 4, 66, 8, 14, '#6D4C41', 2, 2)).join('')
      + R(-4, 170, 248, 74, '#A1673F', 0, 3) + Lc('M-4 186h248', '#8D4A2F', 2) + [[40, 196], [64, 206], [190, 200]].map(([x, y]) => P(`M${x} ${y}c6-8 16-4 12 4-4 6-12 2-8-2`, 'none', 2.5)).join('')
      + g(120, 170, 1, P('M-24 0c-6-30 10-40 0-66-8-20 4-40 18-50 6 10-6 18 2 30 10 16 24 10 22 30-2 14-16 18-10 34 4 12 16 14 12 22z', '#8D5A3B', 3) + P('M-6-110c4-6 14-6 18 0', 'none', 2.5) + Lc('M-4-62c8 4 14 2 18-4M-10-30c8 4 14 2 18-4', '#5D3A24', 2.5) + face(0, -40, 0.3))
      + Lc('M20 130L230 70', '#C9A06A', 9) + Lc('M20 130L230 70', INK, 0) + P('M204 72l30-10 4 12-30 10z', '#C9A06A', 2.5) + Lc('M22 126l210-60M22 134l210-60', INK, 1.5)),

  // ---------- Florence and Tuscany
  L('it/florence/landmark-lucca.v1.svg', 'ปั่นจักรยานบนกำแพงเมืองลุกกา', 'Cycling on the city walls of Lucca', ['lucca', 'ลุกกา', 'city walls', 'กำแพงเมือง', 'bike ride on the walls', 'ปั่นจักรยานบนกำแพง', 'tree-lined ramparts', 'guinigi tower', 'หอคอยที่มีต้นไม้บนยอด', 'tuscany day trip'], 'หาหอคอยที่มีต้นไม้ขึ้นอยู่บนยอด', 'Find the tower with trees growing on its top',
    // a wide grassy path along the top of thick brick walls shaded by a row of round trees, a family riding bikes; behind, the red-roofed town and a brick tower with little oak trees on its roof
    sky('#BBDEFB') + R(80, 30, 34, 84, '#C47A55', 0, 3) + [86, 98, 108].map((x, k) => C(x, 26 - (k % 2) * 6, 12, '#43A047', 2.5)).join('') + R(-4, 90, 248, 30, '#FFCCBC', 0, 3) + Lc('M10 90l20-12 20 12M150 90l20-12 20 12', '#D9663A', 3)
      + P('M-4 120h248v40H-4z', '#9CCC65', 3) + P('M-4 160h248v84H-4z', '#C9583A', 3) + Lc('M-4 186h248M-4 212h248M40 160v26M100 186v26M160 160v26M220 186v26M70 212v32M190 212v32', '#A84A2E', 2)
      + [20, 70, 120, 170, 220].map((x) => Lc(`M${x} 140v-20`, '#6D4C41', 4) + C(x, 108, 16, '#66BB6A', 2.5)).join('')
      + [[90, 154, '#E53935'], [150, 154, '#1E88E5']].map(([x, y, c]) => g(x, y, 0.9, C(-14, 0, 9, 'none', 3) + C(14, 0, 9, 'none', 3) + Lc('M-14 0l8-14h14l6 14', INK, 3) + C(0, -32, 7, '#FFE0BD', 2) + P('M-6-24h12l2 12h-14z', c, 2) + face(0, -32, 0.2))).join('') + face(97, 70, 0.3)),
  L('it/florence/landmark-boboli.v1.svg', 'สวนโบโบลีหลังพระราชวังพิตตี', 'The Boboli Gardens behind the Pitti Palace', ['boboli gardens', 'สวนโบโบลี', 'giardino di boboli', 'pitti palace', 'พระราชวังพิตตี', 'obelisk', 'เสาโอเบลิสก์', 'hedge amphitheatre', 'อัฒจันทร์พุ่มไม้', 'oltrarno'], 'หาเสาหินแหลมสูงกลางลานรูปเกือกม้า', 'Find the tall pointed stone pillar in the middle of the horseshoe garden',
    // a horseshoe of clipped green hedges stepping up the hill like theatre seats, a tall pointed stone obelisk and a big granite basin in the middle, the long stone palace front below
    sky('#E3F2FD') + P('M-4 100c20-50 228-50 248 0v20H-4z', '#2E7D32', 3) + P('M10 120c20-40 200-40 220 0', '#43A047', 3) + P('M30 134c20-30 160-30 180 0', '#66BB6A', 3) + P('M50 148c20-20 120-20 140 0', '#81C784', 3) + cypress(30, 100, 50) + cypress(210, 100, 50)
      + P('M-4 150h248v50H-4z', '#E8D9B0', 3) + P('M100 150l-4-90h8z', '#EAD9B8', 3) + R(92, 140, 16, 12, '#D7C29A', 0, 2.5) + E(150, 170, 26, 8, '#B0BEC5', 3) + R(140, 170, 20, 10, '#90A4AE', 0, 2.5)
      + R(-4, 200, 248, 44, '#E8C58E', 0, 3) + Array.from({ length: 9 }, (_, k) => P(`M${6 + k * 27} 234v-16c0-8 14-8 14 0v16z`, '#BCA071', 2)).join('') + face(100, 112, 0.22) + face(150, 172, 0.22)),
  L('it/florence/landmark-cantucci.v1.svg', 'บิสกิตอัลมอนด์คันตุชชี', 'Cantucci, Tuscan almond biscuits', ['cantucci', 'คันตุชชี', 'biscotti di prato', 'บิสกอตตี', 'almond biscuits', 'บิสกิตอัลมอนด์', 'twice-baked', 'อบสองครั้ง', 'tuscan bakery', 'ร้านขนมทัสคานี'], 'หาบิสกิตชิ้นยาวที่มีเม็ดอัลมอนด์โผล่ออกมา', 'Find the long biscuit slices with almonds peeping out',
    // a row of slanted golden biscuit slices studded with whole almonds on a blue-checked cloth, a jar of more biscuits and a glass of milk with one biscuit dunking in it
    sky('#FFF8E1') + R(-4, 170, 248, 74, '#E3F2FD', 0, 3) + Lc('M20 170v74M60 170v74M100 170v74M140 170v74M180 170v74M220 170v74M-4 196h248M-4 222h248', '#90CAF9', 3)
      + g(64, 104, 1, R(-30, -40, 60, 86, '#E3F2FD', 10, 3) + R(-34, -50, 68, 14, '#8D6E63', 4, 3) + [[-12, -10], [12, 6], [-10, 26]].map(([x, y]) => g(x, y, 1, R(-14, -6, 28, 12, '#E2B26A', 4, 2), 20)).join(''))
      + g(178, 112, 1, P('M-22-36h44l-6 80h-32z', '#FFFFFF', 3) + P('M-20-20h40l-5 62h-30z', '#FAFAFA', 0) + g(4, -38, 1, R(-8, -24, 16, 40, '#E2B26A', 4, 2.5), 12) + face(0, 14, 0.28))
      + [[60, 196], [116, 192], [168, 200]].map(([x, y]) => g(x, y, 1, P('M-34 12l8-26h60l-8 26z', '#E2B26A', 3) + [[-14, -2], [6, 0], [-2, -10]].map(([a, b]) => E(a, b, 6, 4, '#F5E1C0', 1.5)).join('') + face(4, 4, 0.2), -6)).join('')),
  L('it/florence/landmark-uffizi.v1.svg', 'ลานยาวของหอศิลป์อุฟฟิซิ', 'The long courtyard of the Uffizi', ['uffizi', 'อุฟฟิซิ', 'galleria degli uffizi', 'art gallery', 'หอศิลป์', 'piazzale degli uffizi', 'arcades', 'ระเบียงโค้ง', 'vasari corridor', 'ทางเดินวาซารี', 'street artists'], 'หาทางเดินโค้งยาวสองข้างที่หันหน้าเข้าหากัน', 'Find the two long arcades facing each other',
    // a long narrow courtyard between two grey-and-cream arcaded wings that meet at a big arched window over the river, a street painter's easel in the middle
    sky('#BBDEFB') + P('M-4 30l100 60v130H-4z', '#F5EBD8', 3) + P('M244 30l-100 60v130h100z', '#F5EBD8', 3) + R(96, 70, 48, 90, '#EFE3CB', 0, 3) + P('M106 130v-30c0-20 28-20 28 0v30z', '#81D4FA', 2.5) + R(104, 76, 32, 8, '#90A4AE', 0, 2)
      + [[6, 120, 30], [36, 132, 24], [62, 140, 18], [80, 146, 12]].map(([x, y, w]) => P(`M${x} ${y + 60}v-${w * 1.6}c0-${w * 0.7} ${w} -${w * 0.7} ${w} 0v${w * 1.6}z`, '#90A4AE', 2.5)).join('')
      + [[204, 120, 30], [180, 132, 24], [160, 140, 18], [148, 146, 12]].map(([x, y, w]) => P(`M${x} ${y + 60}v-${w * 1.6}c0-${w * 0.7} ${w} -${w * 0.7} ${w} 0v${w * 1.6}z`, '#90A4AE', 2.5)).join('')
      + Lc('M-4 66l100 44M244 66l-100 44', '#90A4AE', 3) + P('M-4 220h248v24H-4z', '#B0BEC5', 3) + P('M96 160h48l100 60H-4z', '#CFD8DC', 3)
      + g(120, 196, 1, Lc('M-14 20l14-44 14 44M0-24v44', '#8D6E63', 3) + R(-18, -30, 36, 26, '#FFFFFF', 2, 2.5) + C(-6, -18, 5, '#FFCA28', 0) + P('M-14-8l10-10 8 6 10-8v12h-28z', '#66BB6A', 0)) + kid(158, 214, '#26A69A', 0.9) + face(120, 112, 0.25)),
  L('it/florence/landmark-pienza.v1.svg', 'เมืองเปียนซากับชีสเปโกริโน', 'Pienza and its pecorino cheese', ['pienza', 'เปียนซา', 'pecorino', 'ชีสเปโกริโน', 'sheep\'s cheese', 'ชีสนมแกะ', 'val d\'orcia', 'วัลดอร์เชีย', 'hill town', 'เมืองบนเนิน', 'cheese shop'], 'หาก้อนชีสกลมเปลือกสีส้มที่ถูกตัดเป็นชิ้น', 'Find the round cheese with an orange rind and a slice cut out',
    // a little stone hill town with a bell tower on top of rolling golden hills, and in front a big round cheese with an orange-red rind, one wedge cut out and lying beside it
    sky('#FFE0B2') + P('M-4 120c40-30 90-30 130-10s80 10 118-10v40H-4z', '#F4D27A', 3) + P('M70 104h90v-20h-90z', '#E8C58E', 3) + R(100, 56, 18, 28, '#D9A86C', 0, 3) + P('M96 56h26l-13-14z', '#C9583A', 2.5) + Lc('M70 84l12-8 12 8M128 84l14-8 14 8', '#C9583A', 3) + cypress(186, 118, 34) + cypress(198, 118, 28)
      + P('M-4 140c60-20 160-20 248 0v104H-4z', '#C5E1A5', 3)
      + g(100, 186, 1, E(0, 22, 70, 18, '#E8A23A', 3) + R(-70, -10, 140, 32, '#E8A23A', 0, 0) + Lc('M-70-10v32M70-10v32', INK, 3) + E(0, -10, 70, 18, '#FFF3C4', 3) + P('M0-10l40-14 30 14z', '#E8A23A', 0) + P('M0-10l40-14M0-10l70 0', 'none', 2.5) + face(0, 12, 0.4))
      + g(196, 196, 1, P('M-22 14l20-32 26 32z', '#FFF3C4', 3) + P('M-22 14h46v8h-46z', '#E8A23A', 3) + C(-2, 6, 3, '#F4D27A', 0))),

  // ---------- Milan
  L('it/milan/landmark-velasca.v1.svg', 'ตึกตอร์เรเวลาสกาหัวโต', 'The top-heavy Torre Velasca', ['torre velasca', 'ตอร์เรเวลาสกา', 'top-heavy tower', 'ตึกหัวโต', 'skyscraper with legs', 'ตึกระฟ้าค้ำยัน', 'diagonal struts', 'brutalist tower', '1950s building', 'milan skyline'], 'หาตึกที่ชั้นบนกว้างกว่าชั้นล่างและมีขาค้ำเฉียง', 'Find the tower whose top is wider than its bottom, held up by slanted legs',
    // a tall rose-brown tower whose top floors bulge out wider, propped on slanted concrete struts, windows in a grid, little red roofs of the old town at its feet
    sky('#E1F5FE') + cloud(46, 40, 0.8)
      + g(120, 0, 1, R(-36, 110, 72, 120, '#C99B86', 0, 3) + P('M-54 30h108v70h-108z', '#C99B86', 3) + P('M-48 22h96l6 8h-108z', '#8D6E63', 3) + R(-20, 10, 40, 12, '#A1887F', 0, 2.5)
        + Lc('M-54 100L-36 136M54 100L36 136M-30 100L-24 130M30 100L24 130', '#8D6E63', 6)
        + Array.from({ length: 12 }, (_, k) => R(-46 + (k % 6) * 16, 38 + Math.floor(k / 6) * 26, 9, 16, '#B3E5FC', 1, 2)).join('') + Array.from({ length: 8 }, (_, k) => R(-28 + (k % 4) * 16, 150 + Math.floor(k / 4) * 30, 9, 18, '#B3E5FC', 1, 2)).join('') + face(0, 82, 0.32))
      + P('M-4 206l30-18 30 18 30-16 30 16v38H-4zM150 210l30-18 30 18 34-16v50h-94z', '#E07B39', 3) + R(-4, 226, 248, 18, '#B0BEC5', 0, 3)),
  L('it/milan/landmark-sirmione.v1.svg', 'ปราสาทกลางน้ำแห่งเซอร์มิโอเน', 'Sirmione\'s castle in Lake Garda', ['sirmione', 'เซอร์มิโอเน', 'lake garda', 'ทะเลสาบการ์ดา', 'scaliger castle', 'castello scaligero', 'ปราสาทสกาลิเจอร์', 'swallowtail battlements', 'moat', 'คูน้ำ', 'drawbridge'], 'หาใบเสมาปลายแฉกเหมือนหางนกนางแอ่นบนกำแพง', 'Find the battlements with forked tops like a swallow\'s tail',
    // a pale stone castle rising straight out of blue lake water, its walls and tall square tower topped with forked swallowtail battlements, a drawbridge and a little boat, hills behind
    sky('#BBDEFB') + P('M-4 120l50-40 50 30 60-46 50 36 38-14v40H-4z', '#90A4AE', 3) + R(-4, 140, 248, 104, '#42A5F5', 0, 3) + waves(214, '#BBDEFB')
      + g(120, 150, 1, R(-80, -44, 160, 60, '#E8D9B8', 0, 3) + R(-20, -110, 44, 126, '#EAD9B8', 0, 3)
        + Array.from({ length: 8 }, (_, k) => P(`M${-80 + k * 21} -44v-12l5 6 5-6v12z`, '#E8D9B8', 2.5)).join('') + Array.from({ length: 3 }, (_, k) => P(`M${-20 + k * 16} -110v-14l6 7 6-7v14z`, '#EAD9B8', 2.5)).join('')
        + P('M-10-10v-14c0-10 20-10 20 0v14z', '#5D4037', 2.5) + R(-6, -84, 8, 14, '#455A64', 2, 2) + R(8, -84, 8, 14, '#455A64', 2, 2) + Lc('M-10 16v-26', INK, 2) + P('M-14 16h28l-4 14h-20z', '#8D6E63', 2.5) + face(2, -54, 0.34))
      + g(190, 208, 1, P('M-20 0h40l-6 10h-28z', '#FFFFFF', 2.5) + C(0, -6, 5, '#FFE0BD', 2))),
  L('it/milan/landmark-gorgonzola.v1.svg', 'ชีสกอร์กอนโซลาลายฟ้า', 'Gorgonzola, the blue-veined cheese', ['gorgonzola', 'กอร์กอนโซลา', 'blue cheese', 'บลูชีส', 'blue-veined', 'ลายเส้นสีฟ้า', 'lombardy cheese', 'ชีสลอมบาร์เดีย', 'pear and walnut', 'ลูกแพร์กับวอลนัต'], 'หาก้อนชีสครีมที่มีลายจุดสีฟ้าเขียว', 'Find the creamy cheese with blue-green speckles',
    // a fat creamy wedge of soft cheese marbled with blue-green veins and wrapped in foil at the back, on a wooden board with pear slices and two walnuts
    R(20, 160, 200, 40, '#C9A06A', 10) + R(196, 170, 30, 12, '#C9A06A', 6) + C(214, 176, 3, '#8D6E63', 0)
      + g(100, 120, 1, P('M-66 40l26-90 80 30v60z', '#FFF8E1', 3) + P('M-40-50l80 30 10-8-74-30z', '#B0BEC5', 3) + P('M40-20l10-8v62l-10 6z', '#CFD8DC', 3)
        + [[-30, -10], [-16, 14], [4, -4], [20, 20], [-40, 26], [10, 32], [-24, -30]].map(([x, y]) => P(`M${x} ${y}c4-4 8 2 12-2 2 6-6 8-10 6z`, '#5C8D89', 0) + C(x + 4, y + 6, 2.5, '#4DB6AC', 0)).join('') + face(-6, 8, 0.36))
      + [[160, 140], [184, 148]].map(([x, y], k) => g(x, y, 1, P('M-8-20c14-4 20 14 14 30-4 8-14 8-18 0-6-12-6-26 4-30z', '#D4E157', 2.5) + E(0, 2, 4, 6, '#FFF9C4', 0), k ? 18 : -8)).join('')
      + [[60, 178], [84, 182]].map(([x, y]) => E(x, y, 11, 9, '#A1673F', 2.5) + Lc(`M${x} ${y - 9}v18`, '#6D4C41', 2)).join('')),
  L('it/milan/landmark-flyingmachine.v1.svg', 'เครื่องบินปีกค้างคาวในพิพิธภัณฑ์วิทยาศาสตร์', 'The wooden flying machine in the science museum', ['leonardo da vinci', 'museo della scienza', 'พิพิธภัณฑ์วิทยาศาสตร์', 'flying machine', 'เครื่องบินโบราณ', 'ornithopter', 'wooden wings', 'ปีกไม้', 'invention', 'สิ่งประดิษฐ์', 'science museum'], 'หาเครื่องบินไม้ที่มีปีกเหมือนค้างคาวแขวนอยู่บนเพดาน', 'Find the wooden machine with bat-like wings hanging from the ceiling',
    // a museum hall with a wooden flying machine hanging from the ceiling on wires: two big ribbed bat-shaped cloth wings, a wooden frame and pulleys; a child looking up and pointing
    sky('#FFF8E1') + R(-4, -4, 248, 40, '#D7CCC8', 0, 3) + Lc('M-4 36h248', '#A1887F', 3) + Lc('M80 36v40M160 36v40', '#90A4AE', 2) + R(-4, 200, 248, 44, '#BCAAA4', 0, 3) + Lc('M40 200l-20 44M120 200v44M200 200l20 44', '#A1887F', 2)
      + g(120, 96, 1, P('M-10 0c-30-30-80-30-104-10 16 6 24 18 26 30 14-8 30-6 40 4 10-12 26-14 38-24z', '#F3E5C0', 3) + P('M10 0c30-30 80-30 104-10-16 6-24 18-26 30-14-8-30-6-40 4-10-12-26-14-38-24z', '#F3E5C0', 3)
        + Lc('M-12 0l-40-20M-14 4l-62-12M-16 8l-80 0M12 0l40-20M14 4l62-12M16 8l80 0', '#A1673F', 2.5) + R(-12, -12, 24, 40, '#A1673F', 4, 3) + C(0, 36, 8, 'none', 3) + Lc('M-6 28l-10 18M6 28l10 18', '#8D6E63', 3) + face(0, 4, 0.22))
      + kid(70, 232, '#42A5F5', 1.3) + Lc('M78 196l16-26', INK, 3)),
  L('it/milan/landmark-ossobuco.v1.svg', 'ออสโซบูโคกับริซอตโต้สีเหลือง', 'Ossobuco with golden saffron risotto', ['ossobuco', 'ออสโซบูโค', 'risotto alla milanese', 'ริซอตโต้หญ้าฝรั่น', 'saffron rice', 'ข้าวสีเหลือง', 'braised veal shank', 'เนื้อตุ๋น', 'gremolata', 'milanese food', 'อาหารมิลาน'], 'หาชิ้นเนื้อที่มีวงกระดูกกลมอยู่ตรงกลางบนข้าวสีเหลือง', 'Find the round piece of meat with a ring of bone in its middle on the yellow rice',
    // a wide white plate with a mound of shiny saffron-yellow risotto and a round slice of braised shank with a bone ring in its centre, sprinkled with green gremolata, a fork beside it
    E(120, 140, 104, 70, '#ECEFF1') + E(120, 136, 96, 62, '#FFFFFF', 3) + E(120, 136, 70, 42, '#E3F2FD', 0)
      + P('M50 140c0-30 40-46 70-40 10-14 40-14 56 6 10 16 6 40-20 46-30 8-80 8-106-12z', '#FFC107', 3) + Array.from({ length: 12 }, (_, k) => E(64 + (k % 6) * 18, 124 + Math.floor(k / 6) * 16, 4, 2.5, '#FFE082', 0)).join('')
      + g(134, 128, 1, C(0, 0, 34, '#8D4A2F', 3) + C(0, 0, 13, '#FFF3E0', 3) + C(0, 0, 6, '#A1673F', 2) + [[-20, -14], [16, -20], [22, 12], [-16, 18], [-26, 4]].map(([x, y]) => C(x, y, 2.5, '#7CB342', 0)).join(''))
      + face(84, 140, 0.34) + Lc('M30 200l40-40', '#B0BEC5', 6) + Lc('M66 150l10-6M70 156l10-6M74 162l10-6', '#B0BEC5', 3)),

  // ---------- The Amalfi Coast, Naples and Pompeii
  L('it/amalfi/landmark-mozzarella.v1.svg', 'มอซซาเรลลาควายกับมะเขือเทศและโหระพา', 'Buffalo mozzarella with tomato and basil', ['mozzarella di bufala', 'มอซซาเรลลาควาย', 'buffalo mozzarella', 'caprese salad', 'สลัดคาเปรเซ', 'tomato and basil', 'มะเขือเทศกับโหระพา', 'fresh cheese', 'ชีสสด', 'campania'], 'หาก้อนชีสขาวกลมนุ่มสลับกับมะเขือเทศแดง', 'Find the soft white cheese balls next to red tomato slices',
    // a blue-and-yellow ceramic plate: slices of white mozzarella and red tomato in a ring with green basil leaves, two whole shiny mozzarella balls in a little bowl, an olive-oil drizzle
    E(110, 140, 96, 70, '#1E88E5') + E(110, 140, 84, 60, '#FFF8E1', 3) + Lc('M30 130c10-30 150-30 160 0', '#FFCA28', 3)
      + Array.from({ length: 8 }, (_, k) => { const a = k * 45 * Math.PI / 180; const x = 110 + 46 * Math.cos(a); const y = 140 + 30 * Math.sin(a); return k % 2 ? C(x, y, 16, '#E53935', 2.5) + C(x, y, 7, '#FF8A80', 0) : C(x, y, 17, '#FFFFFF', 2.5); }).join('')
      + [[110, 140, 0], [80, 118, 40], [140, 162, -30], [150, 120, 70]].map(([x, y, r]) => g(x, y, 1, P('M0-12c10 0 12 18 0 24-12-6-10-24 0-24z', '#43A047', 2), r)).join('')
      + g(192, 196, 1, P('M-34-6h68c-2 22-18 30-34 30s-32-8-34-30z', '#FFCA28', 3) + C(-12, -12, 15, '#FFFFFF', 2.5) + C(12, -14, 14, '#FFFFFF', 2.5) + face(0, 6, 0.28))),
  L('it/amalfi/landmark-ovo.v1.svg', 'ปราสาทไข่ริมอ่าวเนเปิลส์', 'Castel dell\'Ovo on the Bay of Naples', ['castel dell\'ovo', 'ปราสาทไข่', 'egg castle', 'naples', 'napoli', 'เนเปิลส์', 'bay of naples', 'อ่าวเนเปิลส์', 'borgo marinari', 'seafront fortress', 'ป้อมริมทะเล'], 'หาปราสาทสีเหลืองที่มีสะพานหินพาเดินออกไปกลางทะเล', 'Find the yellow castle reached by a stone causeway out into the sea',
    // a big squat honey-yellow fortress sitting on a rocky islet, a stone causeway leading to it, little boats in the harbour, the two-humped volcano soft and purple far across the bay
    sky('#FFE0B2') + P('M120 110l40-40 20 12 20-14 44 42z', '#B39DDB', 3) + R(-4, 110, 248, 134, '#29B6F6', 0, 3) + waves(212, '#B3E5FC')
      + P('M-4 170h90l6 10H-4z', '#D7CCC8', 3) + P('M60 168h50v8H60z', '#BCAAA4', 2.5)
      + g(150, 150, 1, P('M-70 30c0-20 10-30 30-34h80c20 4 30 14 30 34z', '#8D6E63', 3) + R(-60, -40, 120, 44, '#E8C470', 0, 3) + R(-30, -66, 60, 30, '#E8C470', 0, 3) + Array.from({ length: 6 }, (_, k) => R(-60 + k * 22, -48, 12, 10, '#E8C470', 0, 2.5)).join('') + Array.from({ length: 3 }, (_, k) => R(-30 + k * 22, -74, 12, 10, '#E8C470', 0, 2.5)).join('') + P('M-56 0c20-8 40-8 112 0', 'none', 2) + R(-8, -24, 16, 24, '#6D4C41', 2, 2.5) + face(26, -20, 0.34))
      + [[40, 200, '#E53935'], [90, 216, '#FFCA28']].map(([x, y, c]) => P(`M${x - 18} ${y}h36l-6 10h-24z`, c, 2.5)).join('')),
  L('it/amalfi/landmark-sandals.v1.svg', 'รองเท้าแตะหนังทำมือแห่งโพซิตาโน', 'Handmade leather sandals of Positano', ['positano sandals', 'รองเท้าแตะทำมือ', 'handmade sandals', 'leather sandals', 'รองเท้าหนัง', 'sandal maker', 'ช่างทำรองเท้า', 'made to measure', 'ตัดตามเท้า', 'capri sandals', 'beaded straps'], 'หารองเท้าแตะที่ติดลูกปัดและดอกไม้สีสด', 'Find the sandals decorated with bright beads and flowers',
    // a little shop front with pairs of sandals hanging on a board, and in front a big pair of tan leather sandals with criss-cross straps decorated with turquoise beads and coral flowers
    sky('#FFFDE7') + R(-4, -4, 248, 120, '#F8BBD0', 0, 0) + R(20, 10, 200, 84, '#FFFFFF', 4, 3) + [[44, 30], [84, 34], [124, 30], [164, 34], [200, 30]].map(([x, y], k) => Lc(`M${x} 16v${y - 16}`, '#8D6E63', 2) + P(`M${x - 8} ${y}h16v40c0 6-16 6-16 0z`, ['#A1673F', '#E8A27A', '#6D4C41', '#E8A27A', '#A1673F'][k], 2.5)).join('')
      + R(-4, 120, 248, 124, '#FFE0B2', 0, 3)
      + [[80, 176, -10], [160, 176, 10]].map(([x, y, r]) => g(x, y, 1, P('M-24-50c0-16 48-16 48 0v90c0 16-48 16-48 0z', '#D9A066', 3) + Lc('M-24-30l48 20M24-30l-48 20M-24 6l48 0', '#8D5A3B', 6) + [[-14, -24], [0, -18], [14, -24], [0, 6]].map(([a, b], k) => C(a, b, 5, ['#26C6DA', '#FF7043', '#26C6DA', '#FFCA28'][k], 2)).join('') + C(0, -36, 9, '#FF7043', 2.5) + C(0, -36, 3, '#FFF59D', 0), r)).join('') + face(120, 140, 0.32)),
  L('it/amalfi/landmark-intarsia.v1.svg', 'กล่องดนตรีไม้ฝังลายแห่งซอร์เรนโต', 'A Sorrento inlaid-wood music box', ['sorrento', 'ซอร์เรนโต', 'intarsia', 'inlaid wood', 'ไม้ฝังลาย', 'marquetry', 'music box', 'กล่องดนตรี', 'woodwork', 'งานไม้', 'souvenir'], 'หากล่องไม้ที่มีลายมะนาวทำจากไม้หลายสี', 'Find the wooden box with a lemon picture made of different woods',
    // an open wooden music box whose lid is inlaid with a lemon-branch picture in light and dark woods, a little brass key on the side, music notes floating out
    R(30, 120, 180, 80, '#A1673F', 8) + R(40, 130, 160, 60, '#C08A52', 4, 2.5) + R(30, 190, 180, 14, '#8D5A3B', 4)
      + P('M30 120l14-90h152l14 90z', '#A1673F') + P('M48 112l10-70h124l10 70z', '#E8C58E', 2.5)
      + g(120, 78, 1, E(-14, 4, 18, 13, '#F6D365', 2.5) + E(18, -4, 16, 12, '#F6D365', 2.5) + P('M-40 18c20-10 40-24 70-30', 'none', 2.5) + [[-30, 10, -30], [30, -18, 40], [0, -6, 10]].map(([x, y, r]) => g(x, y, 1, P('M0-8c8 0 10 14 0 18-10-4-8-18 0-18z', '#8D5A3B', 2), r)).join(''))
      + R(210, 150, 12, 8, '#FFCA28', 2, 2.5) + C(226, 154, 6, '#FFCA28', 2.5) + face(120, 160, 0.4)
      + [[60, 24], [190, 18]].map(([x, y]) => C(x, y + 14, 5, INK, 0) + Lc(`M${x + 5} ${y + 14}v-18l8 4`, INK, 2.5)).join('')),
  L('it/amalfi/landmark-cuoppo.v1.svg', 'กรวยกระดาษซีฟู้ดทอดของเนเปิลส์', 'A cuoppo of Neapolitan fried seafood', ['cuoppo', 'คอปโป', 'fried seafood cone', 'กรวยซีฟู้ดทอด', 'paper cone', 'กรวยกระดาษ', 'calamari', 'ปลาหมึกทอด', 'neapolitan street food', 'อาหารริมทางเนเปิลส์', 'frittura'], 'หากรวยกระดาษที่มีปลาหมึกวงทอดโผล่ออกมา', 'Find the paper cone with crispy squid rings poking out',
    // a brown paper cone overflowing with crispy golden squid rings, little whole fried fish, prawns and a lemon wedge on top
    g(120, 120, 1, P('M-60-30h120l-60 130z', '#C9A06A', 3) + Lc('M-40-10l40 86M40-10l-30 66', '#A1673F', 2) + P('M-60-30h120l-8 14h-104z', '#B88A50', 3))
      + [[80, 86], [112, 70], [146, 82], [96, 58], [134, 54]].map(([x, y]) => C(x, y, 14, '#F2C14E', 3) + C(x, y, 6, '#FFF8E1', 2)).join('')
      + g(160, 50, 1, P('M-20 0c10-10 26-10 36 0-10 10-26 10-36 0zM16 0l10-8v16z', '#E8A23A', 2.5) + C(-12, -2, 2, INK, 0), 30) + g(70, 52, 1, P('M-10 10c-6-14 4-26 18-24 6 2 6 8 0 10-8 0-10 8-6 14z', '#FF8A65', 2.5), -20)
      + g(118, 34, 1, P('M-16 10c0-20 32-20 32 0z', '#FFEB3B', 2.5) + Lc('M-10 6l10-10 10 10', '#FFF59D', 2)) + face(120, 132, 0.4)),

  // ---------- The Dolomites
  L('it/dolomites/landmark-earthpyramids.v1.svg', 'เสาดินหมวกหินแห่งเรนอน', 'The earth pyramids of the Renon', ['earth pyramids', 'erdpyramiden', 'piramidi di terra', 'เสาดินหมวกหิน', 'renon', 'ritten', 'เรนอน', 'stone hats', 'หินบนยอดเสา', 'hiking trail'], 'หาเสาดินผอมสูงที่มีก้อนหินวางอยู่บนหัวเหมือนหมวก', 'Find the thin earth pillars wearing boulders on their heads like hats',
    // a forest slope with tall thin cone-shaped earth pillars, each wearing a round grey boulder like a hat, a hiking path and a child waving; snowy peaks behind
    sky('#E3F2FD') + P('M-4 90l40-40 30 26 40-50 40 40 30-20 68 44z', '#ECEFF1', 3) + P('M-4 110c60-20 180-20 248 0v134H-4z', '#81C784', 3)
      + [[50, 220, 120, 16], [96, 224, 150, 18], [140, 222, 130, 16], [184, 220, 100, 14]].map(([x, y, h, w]) => P(`M${x - w} ${y}c${w * 0.4}-${h * 0.4} ${w * 0.6}-${h * 0.8} ${w * 0.7}-${h}h${w * 0.6}c${w * 0.1} ${h * 0.2} ${w * 0.3} ${h * 0.6} ${w * 0.7} ${h}z`, '#D7B98E', 3) + E(x, y - h - 10, w * 0.9, 12, '#90A4AE', 3)).join('')
      + fir(20, 210, 50) + fir(226, 210, 50) + P('M-4 224c80-6 160-6 248 0v20H-4z', '#A5D6A7', 3) + Lc('M30 236c40-6 100-6 180 0', '#BCAAA4', 4) + kid(206, 236, '#FF7043', 0.9) + face(96, 130, 0.25)),
  L('it/dolomites/landmark-speck.v1.svg', 'เขียงสเปคกับขนมปังกรอบ', 'A board of speck and crispy rye bread', ['speck', 'สเปค', 'smoked ham', 'แฮมรมควัน', 'schüttelbrot', 'ขนมปังไรย์กรอบ', 'south tyrol', 'ทีโรลใต้', 'marende', 'mountain snack', 'อาหารว่างบนเขา'], 'หาขนมปังแผ่นกลมแบนที่มีเมล็ดผักชีอยู่', 'Find the flat round crispy bread sprinkled with seeds',
    // a wooden board with a handle: rosy slices of smoked ham with white edges fanned out, a big flat round crispbread with seeds, a little gherkin and a wedge of mountain cheese
    R(20, 110, 190, 96, '#C9A06A', 14) + R(200, 146, 30, 22, '#C9A06A', 8) + C(218, 157, 4, '#8D6E63', 0)
      + [0, 1, 2, 3].map((k) => g(70 + k * 14, 150 + k * 6, 1, P('M-30-14c20-10 44-6 56 4-14 16-40 20-56 10z', '#E57373', 2.5) + Lc('M-30-14c20-10 44-6 56 4', '#FFFFFF', 3), -10 + k * 6)).join('')
      + g(156, 128, 1, C(0, 0, 40, '#A1673F', 3) + C(0, 0, 32, '#B88A50', 0) + Array.from({ length: 10 }, (_, k) => C(-20 + (k * 17) % 42, -20 + Math.floor(k / 3) * 13, 2, '#5D4037', 0)).join('') + face(0, 4, 0.36))
      + P('M150 186l40-12 6 16z', '#FFE082', 2.5) + g(48, 118, 1, E(0, 0, 18, 8, '#7CB342', 2.5) + C(-6, -2, 1.5, '#AED581', 0) + C(6, 2, 1.5, '#AED581', 0), -20)),
  L('it/dolomites/landmark-heumandl.v1.svg', 'ตุ๊กตาฟางบนทุ่งหญ้าภูเขา', 'Hay men drying in the alpine meadow', ['heumandl', 'hay men', 'ตุ๊กตาฟาง', 'haymaking', 'ตากหญ้าแห้ง', 'alpine meadow', 'ทุ่งหญ้าบนเขา', 'hay stacks on poles', 'กองฟาง', 'alpe di siusi', 'seiser alm'], 'หากองฟางที่ตั้งบนไม้ดูเหมือนคนตัวเล็กยืนอยู่', 'Find the hay piled on poles that looks like little people standing',
    // a sloping green meadow dotted with hay piled on wooden poles in the shape of little standing figures with straw hats, a wooden hay barn and a jagged peak behind
    sky('#BBDEFB') + P('M120 100l30-60 16 30 14-24 40 54z', '#CFD8DC', 3) + P('M-4 120c80-30 180-30 248-10v134H-4z', '#9CCC65', 3) + g(46, 112, 1, R(-22, -16, 44, 26, '#A1673F', 0, 3) + P('M-28-14l28-20 28 20z', '#6D4C41', 3) + Lc('M-14-6h28M-14 2h28', '#8D5A3B', 2))
      + [[70, 200, 1.1], [130, 186, 1], [186, 204, 1.15], [104, 150, 0.7], [166, 146, 0.65]].map(([x, y, s]) => g(x, y, s, Lc('M0 10v-80', '#8D6E63', 3) + P('M-22 10c-4-30 0-50 22-56 22 6 26 26 22 56z', '#E2C25A', 3) + P('M-14-46c0-16 28-16 28 0z', '#E2C25A', 3) + P('M-20-44h40', 'none', 3) + Lc('M-14-10c6 4 22 4 28 0M-16 0c8 4 24 4 32 0', '#C9A33A', 2) + face(0, -24, 0.28))).join('')),
  L('it/dolomites/landmark-bobsleigh.v1.svg', 'รางบอบสเลดน้ำแข็งที่คอร์ตินา', 'The icy bobsleigh run at Cortina', ['bobsleigh', 'bobsled', 'บอบสเลด', 'cortina d\'ampezzo', 'คอร์ตินา', 'ice track', 'รางน้ำแข็ง', 'winter sports', 'กีฬาฤดูหนาว', 'sled ride', 'เลื่อนหิมะ'], 'หาเลื่อนสีแดงที่พุ่งเลี้ยวโค้งในรางน้ำแข็ง', 'Find the red sled zooming round the icy curve',
    // a high banked curve of blue-white ice track sweeping round, a red bobsleigh with two smiling helmeted riders tilting on the bend, snowy fir trees and peaks behind
    sky('#E1F5FE') + P('M-4 80l50-50 40 34 40-44 50 46 30-20 38 34z', '#FFFFFF', 3) + P('M-4 110c60-10 180-10 248 0v134H-4z', '#FFFFFF', 3) + fir(30, 120, 40) + fir(60, 116, 34) + fir(200, 118, 40)
      + P('M-4 230c40-90 200-130 248-110v40c-50-20-180 20-210 90z', '#B3E5FC', 3) + P('M-4 230c40-90 200-130 248-110', 'none', 3) + Lc('M14 224c40-70 180-104 230-90', '#E1F5FE', 6)
      + g(124, 160, 1, P('M-46 10c0-20 14-30 40-30h40c14 0 20 10 16 26l-4 8h-84z', '#E53935', 3) + Lc('M-46 24h96', '#B0BEC5', 4) + [[-14, '#1E88E5'], [16, '#FFCA28']].map(([x, c]) => C(x, -28, 11, '#FFE0BD', 2.5) + P(`M${x - 12} -30c0-14 24-14 24 0z`, c, 2.5) + face(x, -26, 0.22)).join(''), -18)
      + Lc('M70 210c10-6 20-10 30-12M60 200c10-6 20-10 30-12', '#81D4FA', 3)),
  L('it/dolomites/landmark-sellaride.v1.svg', 'ปั่นจักรยานรอบภูเขาโต๊ะเซลลา', 'Mountain biking round the Sella massif', ['sella ronda', 'เซลลารอนดา', 'sella group', 'ภูเขาเซลลา', 'mountain bike', 'จักรยานเสือภูเขา', 'mountain pass', 'ช่องเขา', 'gravel trail', 'ทางกรวด', 'e-bike'], 'หาภูเขาหินที่ยอดแบนเหมือนโต๊ะใหญ่', 'Find the rocky mountain with a top as flat as a giant table',
    // a huge grey rock massif with a flat table top and cliff bands like a layered cake, a winding gravel trail through green pasture below, a child on a mountain bike with a helmet
    sky('#BBDEFB') + cloud(200, 30, 0.7) + P('M20 120l14-60h20l10-10h110l10 10h20l16 60z', '#B0BEC5', 3) + Lc('M34 80h176M30 100h184', '#90A4AE', 3) + P('M54 50h132l-6 10H60z', '#FFFFFF', 3)
      + P('M-4 120c80-14 180-14 248 0v124H-4z', '#9CCC65', 3) + P('M30 244c20-40 80-40 90-70s60-30 70-54', 'none', 0) + Lc('M30 244c20-40 80-40 90-70s60-30 70-54', '#E0C9A6', 12) + fir(20, 170, 36) + fir(220, 190, 40)
      + g(110, 196, 1, C(-20, 16, 13, 'none', 4) + C(20, 16, 13, 'none', 4) + Lc('M-20 16l12-22h20l8 22M-4-6l-6-10h10M14-6l6-8', INK, 3.5) + C(2, -36, 8, '#FFE0BD', 2) + P('M-8-40c0-12 20-12 20 0z', '#43A047', 2.5) + P('M-4-28h12l4 18h-16z', '#FF7043', 2) + face(2, -35, 0.2)) + face(120, 92, 0.34)),

  // ---------- Sicily
  L('it/sicily/landmark-agrigento.v1.svg', 'วิหารกรีกโบราณกลางดอกอัลมอนด์ที่อากริเจนโต', 'The Greek temple among almond blossom at Agrigento', ['valley of the temples', 'valle dei templi', 'หุบเขาวิหาร', 'temple of concordia', 'วิหารคอนคอร์เดีย', 'agrigento', 'อากริเจนโต', 'doric columns', 'เสาโดริก', 'almond blossom', 'ดอกอัลมอนด์'], 'หาต้นอัลมอนด์ดอกสีชมพูหน้าวิหารสีทอง', 'Find the pink almond trees in front of the golden temple',
    // a complete honey-gold Greek temple with a triangular roof and a row of fat columns on a ridge, pink-blossomed almond trees in front, the blue sea far behind
    sky('#FFF3E0') + R(-4, 100, 248, 24, '#4FC3F7', 0, 3) + P('M-4 124c60-10 180-10 248 0v120H-4z', '#C5E1A5', 3)
      + g(120, 120, 1, P('M-80-34l80-30 80 30z', '#E8B860', 3) + R(-84, -36, 168, 12, '#E8B860', 0, 3) + Array.from({ length: 7 }, (_, k) => R(-76 + k * 24, -24, 14, 54, '#F0C878', 2, 2.5)).join('') + R(-88, 30, 176, 10, '#D9A84E', 0, 3) + face(0, -46, 0.26))
      + [[40, 210], [120, 216], [200, 206]].map(([x, y]) => Lc(`M${x} ${y}v-28M${x} ${y - 18}l-12-12M${x} ${y - 20}l12-12`, '#6D4C41', 4) + [[-16, -36], [0, -44], [16, -36], [-8, -28], [10, -26]].map(([a, b]) => C(x + a, y + b, 9, '#F8BBD0', 2)).join('')).join('')),
  L('it/sicily/landmark-cefalu.v1.svg', 'หาดเชฟาลูใต้ภูเขาหินยักษ์', 'Cefalù\'s beach below its great rock', ['cefalù', 'cefalu', 'เชฟาลู', 'la rocca', 'ภูเขาหินลา รอกกา', 'sandy beach', 'หาดทราย', 'medieval town', 'เมืองยุคกลาง', 'tyrrhenian sea', 'swimming'], 'หาภูเขาหินมนใหญ่ที่ตั้งอยู่หลังเมืองริมหาด', 'Find the huge round rock sitting behind the seaside town',
    // a huge rounded rock hill rising behind a cluster of golden houses with a twin-towered old church, a curve of sandy beach and turquoise sea with a child swimming
    sky('#BBDEFB') + P('M30 130c0-80 50-110 100-110s110 40 110 110z', '#C8B08A', 3) + Lc('M70 70c20-10 40-10 60 0M150 60c20 0 40 10 50 24', '#A1887F', 3)
      + [[20, 110, 40, 40, '#FFE0B2'], [60, 100, 30, 50, '#FFCC80'], [150, 104, 34, 46, '#FFE0B2'], [184, 114, 40, 36, '#FFCC80']].map(([x, y, w, h, c]) => R(x, y, w, h, c, 0, 3) + R(x + 8, y + 10, 8, 12, '#8D6E63', 2, 2)).join('')
      + g(120, 150, 1, R(-26, -40, 52, 40, '#E8C58E', 0, 3) + R(-30, -70, 16, 70, '#E8C58E', 0, 3) + R(14, -70, 16, 70, '#E8C58E', 0, 3) + P('M-30-70l8-12 8 12zM14-70l8-12 8 12z', '#A1673F', 2.5) + P('M-8 0v-18c0-10 16-10 16 0v18z', '#6D4C41', 2.5) + face(0, -26, 0.25))
      + P('M-4 150h248v20c-60 20-160 30-248 20z', '#FFE082', 3) + P('M-4 186c80 10 180 0 248-14v72H-4z', '#26C6DA', 3) + waves(218, '#B2EBF2') + g(110, 218, 1, C(0, -6, 7, '#FFE0BD', 2) + Lc('M-14 2c6-4 22-4 28 0', '#FFFFFF', 2.5) + face(0, -6, 0.18))),
  L('it/sicily/landmark-earcave.v1.svg', 'ถ้ำรูปหูยักษ์แห่งซีรากูซา', 'The giant ear-shaped cave of Syracuse', ['ear cave', 'orecchio di dionisio', 'ถ้ำรูปหู', 'syracuse', 'siracusa', 'ซีรากูซา', 'echo cave', 'ถ้ำเสียงก้อง', 'ancient quarry', 'เหมืองหินโบราณ', 'neapolis park', 'latomia del paradiso'], 'หาปากถ้ำสูงที่โค้งเหมือนใบหูยักษ์', 'Find the tall cave mouth curved like a giant ear',
    // a pale limestone cliff with a tall narrow cave mouth curving at the top like the outline of a giant ear, a child shouting "hello" with echo rings, lemon trees in the quarry garden
    sky('#FFF8E1') + R(-4, -4, 248, 210, '#E8D9B8', 0, 0) + Lc('M20 40c30 6 40-10 70 0M160 30c20 8 40 0 70 6M20 150c10 6 20 0 30 4', '#C8B08A', 3)
      + P('M90 210c-4-50-2-100 10-140 10-30 40-40 54-20 10 14 6 30-6 40-14 12-18 30-14 50 4 24 10 50 10 70z', '#5D4037', 3) + P('M124 66c12-4 22 6 18 18', 'none', 2.5)
      + R(-4, 206, 248, 38, '#AED581', 0, 3) + [[30, 210], [210, 210]].map(([x, y]) => Lc(`M${x} ${y}v-30`, '#6D4C41', 4) + C(x, y - 42, 22, '#66BB6A', 2.5) + C(x - 8, y - 46, 4, '#FFEB3B', 1.5) + C(x + 10, y - 36, 4, '#FFEB3B', 1.5)).join('')
      + kid(170, 230, '#EC407A', 1) + P('M150 196c-6-6-6-14 0-20M140 202c-10-10-10-22 0-32', 'none', 2.5) + face(122, 150, 0.3)),
  L('it/sicily/landmark-cassata.v1.svg', 'เค้กคัสซาตาแต่งผลไม้เชื่อม', 'A Sicilian cassata cake', ['cassata', 'cassata siciliana', 'คัสซาตา', 'sicilian cake', 'เค้กซิซิลี', 'candied fruit', 'ผลไม้เชื่อม', 'ricotta cream', 'ครีมริคอตตา', 'green marzipan', 'palermo pastry'], 'หาเค้กสีขาวขอบเขียวที่ประดับผลไม้เชื่อมหลากสี', 'Find the white cake with a green rim and colourful candied fruit on top',
    // a round domed cake glazed white with a pale green marzipan band round its side, decorated with candied orange slices, red cherries and green swirls like a jewel box, on a lacy doily
    E(120, 200, 100, 16, '#FFFFFF', 2) + Array.from({ length: 12 }, (_, k) => C(26 + k * 17, 200 + (k % 2) * 2, 5, '#FFFFFF', 1.5)).join('')
      + P('M30 190v-40h180v40c0 10-180 10-180 0z', '#A5D6A7', 3) + Lc('M30 170h180', '#81C784', 2) + Array.from({ length: 6 }, (_, k) => P(`M${44 + k * 30} 160l8 10-8 10-8-10z`, '#C8E6C9', 2)).join('')
      + P('M30 150c0-60 180-60 180 0z', '#FFFFFF', 3) + P('M30 150c30 8 150 8 180 0', 'none', 2.5)
      + C(120, 96, 16, '#FF9800', 2.5) + C(120, 96, 9, '#FFCC80', 0) + Lc('M120 80v32M104 96h32M108 84l24 24M132 84l-24 24', '#FFB74D', 1.5)
      + [[80, 116], [160, 116], [100, 130], [140, 130], [70, 136], [170, 136]].map(([x, y], k) => k % 2 ? C(x, y, 6, '#E53935', 2) : g(x, y, 1, P('M0-8c8 0 10 14 0 16-10-2-8-16 0-16z', '#66BB6A', 2), 60)).join('') + face(120, 170, 0.4)),
  L('it/sicily/landmark-panelle.v1.svg', 'ขนมปังงาไส้แป้งถั่วทอดปาแนลเล', 'Pane e panelle, Palermo\'s chickpea fritter roll', ['panelle', 'pane e panelle', 'ปาแนลเล', 'chickpea fritters', 'แป้งถั่วลูกไก่ทอด', 'sesame roll', 'ขนมปังงา', 'palermo street food', 'อาหารริมทางปาแลร์โม', 'crocchè', 'friggitoria'], 'หาขนมปังงาที่มีแผ่นทอดสีทองบางๆ ซ้อนกันอยู่ข้างใน', 'Find the sesame roll stuffed with thin golden fried squares',
    // a soft oval sesame bun split open and stuffed with a stack of thin square golden chickpea fritters sticking out, a lemon wedge and a paper wrap
    P('M40 200l20-40h120l20 40z', '#FFFFFF', 3) + Lc('M60 186h120', '#E0E0E0', 2)
      + g(120, 124, 1, P('M-86 20c0-30 40-50 86-50s86 20 86 50z', '#E2A85A', 3) + Array.from({ length: 12 }, (_, k) => E(-60 + (k % 6) * 24, -14 + Math.floor(k / 6) * 14, 3, 1.6, '#FFF8E1', 0)).join('')
        + [0, 1, 2, 3].map((k) => g(-30 + k * 22, 26 - k * 2, 1, R(-30, -6, 60, 12, '#F6C343', 2, 2.5) + C(-14, 0, 1.5, '#E0A030', 0), -8 + k * 5)).join('')
        + P('M-86 34c0 26 40 40 86 40s86-14 86-40z', '#E2A85A', 3) + face(0, 54, 0.36))
      + g(200, 64, 1, P('M-16 10c0-20 32-20 32 0z', '#FFEB3B', 2.5) + Lc('M-10 6l10-10 10 10', '#FFF59D', 2), 20)),
  L('it/sicily/landmark-noto.v1.svg', 'ระเบียงบาโรกสีทองแห่งโนโต', 'The golden baroque balconies of Noto', ['noto', 'โนโต', 'sicilian baroque', 'บาโรกซิซิลี', 'golden stone', 'หินสีน้ำผึ้ง', 'carved balconies', 'ระเบียงแกะสลัก', 'infiorata', 'พรมดอกไม้', 'palazzo nicolaci'], 'หาระเบียงเหล็กโค้งที่มีหินแกะหน้ายิ้มรองอยู่ข้างใต้', 'Find the curvy iron balcony held up by carved smiling stone faces',
    // a honey-gold stone palace front with tall shuttered windows and a swelling curly iron balcony held up by carved stone brackets with smiling faces; a carpet of flower petals on the steps below
    sky('#BBDEFB') + R(10, 10, 220, 160, '#F2C77F', 0, 3) + Lc('M10 40h220M10 168h220', '#D9A84E', 3) + R(76, 52, 88, 60, '#F6D08F', 0, 0)
      + P('M90 104v-40c0-16 60-16 60 0v40z', '#4E342E', 3) + Lc('M120 52v52', '#6D4C41', 2) + R(20, 60, 36, 50, '#795548', 3, 3) + R(184, 60, 36, 50, '#795548', 3, 3)
      + P('M70 104h100c4 20-4 26-50 26s-54-6-50-26z', '#455A64', 3) + Lc('M84 106v20M100 106v22M120 106v22M140 106v22M156 106v20', '#455A64', 2.5) + Lc('M76 116c10 6 20-6 30 0s20 6 30 0 20-6 30 0', '#90A4AE', 2)
      + [84, 120, 156].map((x) => P(`M${x - 10} 130h20l-4 20c-2 6-10 6-12 0z`, '#E8B860', 2.5) + face(x, 140, 0.18)).join('')
      + R(-4, 170, 248, 74, '#E8C58E', 0, 3) + Lc('M-4 194h248M-4 218h248', '#D9A84E', 2.5)
      + Array.from({ length: 18 }, (_, k) => C(20 + (k % 9) * 25, 182 + Math.floor(k / 9) * 24, 7, ['#E91E63', '#FFCA28', '#7E57C2', '#FF7043', '#26A69A'][k % 5], 2)).join('')),

  // ---------- The Cinque Terre
  L('it/cinqueterre/landmark-lardarina.v1.svg', 'บันไดซิกแซกลาร์ดารินาขึ้นสู่คอร์นิเลีย', 'The zigzag Lardarina steps up to Corniglia', ['lardarina', 'ลาร์ดารินา', 'corniglia', 'คอร์นิเลีย', '382 steps', 'บันได 382 ขั้น', 'zigzag stairs', 'บันไดซิกแซก', 'hilltop village', 'หมู่บ้านบนผา', 'station climb'], 'หาบันไดซิกแซกยาวที่ขึ้นไปถึงหมู่บ้านบนยอดผา', 'Find the long zigzag staircase climbing to the village on the clifftop',
    // a clifftop village of pastel tower houses, a long brick staircase zigzagging up the green terraced slope from the railway at the bottom, a child half-way up puffing happily
    sky('#BBDEFB') + [[60, '#F8BBD0'], [92, '#FFE082'], [124, '#FFCC80'], [156, '#B3E5FC']].map(([x, c]) => R(x, 24, 32, 44, c, 0, 3) + R(x + 10, 34, 10, 12, '#43A047', 1, 2)).join('') + P('M50 24l20-12h110l14 12z', '#E07B39', 3)
      + P('M-4 68h248v176H-4z', '#7CB342', 3) + Lc('M-4 100h248M-4 140h248M-4 180h248', '#558B2F', 2.5)
      + P('M40 226l150-30-140-36 130-34-110-30', 'none', 0) + Lc('M40 226l150-30-140-36 130-34-110-30', '#C47A55', 14) + Lc('M40 226l150-30-140-36 130-34-110-30', '#E8A27A', 8)
      + R(-4, 228, 248, 16, '#90A4AE', 0, 3) + Lc('M-4 236h248', '#546E7A', 2)
      + kid(118, 160, '#E53935', 0.9) + face(108, 46, 0.25) + C(44, 226, 3, INK, 0) + C(80, 96, 3, INK, 0)),
  L('it/cinqueterre/landmark-farinata.v1.svg', 'แพนเค้กถั่วลูกไก่ฟารินาตาจากเตาฟืน', 'Farinata, the chickpea pancake from the wood oven', ['farinata', 'ฟารินาตา', 'chickpea pancake', 'แพนเค้กแป้งถั่วลูกไก่', 'copper pan', 'ถาดทองแดง', 'ligurian food', 'อาหารลิกูเรีย', 'wood oven', 'เตาฟืน', 'cecina'], 'หาถาดทองแดงกลมใหญ่ที่มีแผ่นแป้งสีทองบาง', 'Find the big round copper pan with a thin golden pancake',
    // a huge round copper pan holding a thin golden-orange chickpea pancake with a browned crust, cut into wedges with one lifted out on a paper, black pepper dots, steam curling up
    E(120, 140, 104, 76, '#C9783A') + E(120, 136, 94, 66, '#F2B24C', 3) + Array.from({ length: 14 }, (_, k) => C(60 + (k * 37) % 120, 100 + (k * 23) % 70, 2, '#5D4037', 0)).join('') + Lc('M120 136l-86-16M120 136l50-60M120 136l70 40', '#D88A2E', 2.5)
      + [[80, 120], [160, 120], [110, 170]].map(([x, y]) => E(x, y, 14, 6, '#E89A30', 0)).join('') + face(120, 140, 0.4)
      + g(196, 200, 1, P('M-30 0h60l-10 20h-40z', '#FFFFFF', 2.5) + P('M-20 4l30-6 4 12z', '#F2B24C', 2.5))
      + Lc('M80 58c-8-10 6-16 0-28M120 54c-8-10 6-16 0-28M160 58c-8-10 6-16 0-28', '#CFD8DC', 3)),
  L('it/cinqueterre/landmark-anchovies.v1.svg', 'ปลากะตักหมักเกลือแห่งมอนเตรอสโซ', 'The salted anchovies of Monterosso', ['anchovies of monterosso', 'acciughe', 'ปลากะตัก', 'salted anchovies', 'ปลากะตักหมักเกลือ', 'terracotta jar', 'โถดินเผา', 'fried anchovies', 'ligurian fish', 'ปลาลิกูเรีย', 'monterosso al mare'], 'หาปลาตัวเล็กสีเงินที่เรียงเป็นวงในโถดินเผา', 'Find the little silver fish laid in a circle in the clay jar',
    // a round terracotta jar with little silver fish laid head-to-tail in a circle under coarse salt, a few fresh silvery fish on a wooden board with a lemon beside it
    g(80, 130, 1, P('M-50-40h100c4 50 0 90-50 100-50-10-54-50-50-100z', '#D9784A', 3) + E(0, -40, 50, 14, '#C9683A', 3) + E(0, -42, 40, 10, '#ECEFF1', 2.5)
      + Array.from({ length: 8 }, (_, k) => { const a = k * 45 * Math.PI / 180; return g((26 * Math.cos(a)).toFixed(1), (-42 + 6 * Math.sin(a)).toFixed(1), 1, E(0, 0, 9, 3, '#90A4AE', 1.5), k * 45); }).join('') + face(0, 10, 0.42))
      + R(130, 170, 104, 40, '#C9A06A', 8)
      + [[160, 178], [196, 186], [170, 196]].map(([x, y]) => g(x, y, 1, P('M-24 0c10-8 30-8 40 0-10 8-30 8-40 0zM16 0l10-7v14z', '#B0BEC5', 2.5) + Lc('M-18 0h30', '#5C6BC0', 2) + C(-17, -1, 1.6, INK, 0))).join('')
      + g(210, 150, 1, E(0, 0, 18, 13, '#FFEB3B', 2.5) + P('M14-6l8-4', 'none', 2.5))),
  L('it/cinqueterre/landmark-terraces.v1.svg', 'กำแพงหินเรียงทำขั้นบันไดบนผา', 'The dry-stone terraces on the cliffs', ['dry-stone walls', 'muretti a secco', 'กำแพงหินเรียง', 'terraced cliffs', 'ผาขั้นบันได', 'stone terraces', 'ขั้นบันไดหิน', 'farmer', 'ชาวไร่', 'basil and lemons', 'unesco landscape'], 'หากำแพงหินก้อนเล็กที่เรียงซ้อนเป็นขั้นบันไดลงไปถึงทะเล', 'Find the walls of little stacked stones making steps down to the sea',
    // a steep hillside of stacked grey stone walls making narrow steps down to the sea, green rows on each step, a farmer kid carrying a basket of lemons up a little path
    sky('#BBDEFB') + R(-4, 190, 248, 54, '#29B6F6', 0, 3) + waves(222, '#B3E5FC')
      + [[30, 0], [60, 1], [90, 2], [120, 3], [150, 4]].map(([y, k]) => P(`M${-4 + k * 20} ${y + 40}h${248 - k * 20}v18h-${248 - k * 20}z`, '#9CCC65', 2.5) + R(-4 + k * 20, y + 58, 248 - k * 20, 16, '#B0BEC5', 0, 2.5) + Array.from({ length: 7 - k }, (_, j) => R(k * 20 + j * 36, y + 61, 28, 10, '#CFD8DC', 3, 1.5)).join('')).join('')
      + [[40, 64], [100, 64], [160, 64], [70, 94], [150, 124], [200, 154]].map(([x, y]) => C(x, y, 7, '#43A047', 2)).join('')
      + g(196, 96, 1, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#5C6BC0', 2) + face(0, -18, 0.22) + P('M8-10h20l-4 14h-12z', '#A1673F', 2) + C(14, -12, 4, '#FFEB3B', 1.5) + C(22, -12, 4, '#FFEB3B', 1.5))),
  L('it/cinqueterre/landmark-playground.v1.svg', 'สนามเด็กเล่นริมผาที่ปุนตาบอนฟิลิโอ', 'The clifftop playground at Punta Bonfiglio', ['punta bonfiglio', 'ปุนตาบอนฟิลิโอ', 'playground', 'สนามเด็กเล่น', 'swings', 'ชิงช้า', 'manarola viewpoint', 'จุดชมวิวมานาโรลา', 'picnic', 'ปิกนิก', 'sea view'], 'หาชิงช้าบนหน้าผาที่มองเห็นบ้านสีสดข้างล่าง', 'Find the swing on the cliff looking at the colourful houses below',
    // a small playground on a grassy clifftop with a swing set and a slide, a child swinging high over the sea view, the pastel houses of the village stacked on the rock across the cove
    sky('#FFE0B2') + R(-4, 110, 248, 134, '#29B6F6', 0, 3) + waves(214, '#B3E5FC')
      + P('M120 244V100c20-10 60-14 124-4v148z', '#8D6E63', 3) + [[136, 96, '#F8BBD0'], [160, 86, '#FFE082'], [184, 92, '#FFCC80'], [208, 84, '#B3E5FC'], [148, 120, '#FFCC80'], [176, 116, '#C5E1A5'], [204, 114, '#F8BBD0']].map(([x, y, c]) => R(x, y, 22, 30, c, 0, 2.5) + R(x + 7, y + 8, 7, 9, '#43A047', 1, 1.5)).join('')
      + P('M-4 150c30-6 70-6 100 10v84H-4z', '#7CB342', 3) + Lc('M8 152l14-70M70 152l-14-70M18 82h44', '#E53935', 4) + Lc('M30 82l10 40M50 82l-6 40', INK, 2) + R(32, 120, 18, 6, '#FFCA28', 2, 2) + g(42, 112, 1, C(0, -14, 7, '#FFE0BD', 2) + P('M-7-6h14v10h-14z', '#7E57C2', 2) + face(0, -14, 0.18))
      + P('M76 150l30-40h10v10l-30 40z', '#29B6F6', 2.5) + Lc('M106 110v40', '#90A4AE', 3)),
];

export default { places: {}, items };
