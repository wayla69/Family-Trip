// Wave 13, Thailand (north): Mae Hong Son, Pang Ung, Ban Rak Thai, Pang Mapha and Mae Sariang — the city stamp, two day scenes
// and the valley's own Shan temples (as buildings only), Shan foods and crafts, mountain lake and river; no figures, no people
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const MH = { k1: '#2E6B5E', k2: '#C8902E', k3: '#EAF5EF' };
const CITY = 'th-maehongson', DIR = 'th/maehongson';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a Shan (Tai Yai) temple hall: a white base and a stack of shrinking tin roofs with flicked-up corners and lacy gold edges
// (x = centre, b = base, w = width, n = tiers, s = scale, roof = tin colour)
const shan = (x, b, w, n, s, roof = '#CFD8DC', sw) => {
  let o = R(x - w / 2, b - 30 * s, w, 30 * s, '#FFFFFF', 0, sw) + R(x - 8 * s, b - 22 * s, 16 * s, 22 * s, '#8D6E63', 0, sw);
  let y = b - 30 * s;
  for (let k = 0; k < n; k++) {
    const hw = w / 2 * (1 - k * 0.2) + 8 * s, h = 14 * s;
    o += P(`M${x - hw - 6 * s} ${y + 2 * s}l${6 * s}-${4 * s}l${6 * s}-${h - 4 * s}h${2 * hw - 12 * s}l${6 * s} ${h - 4 * s}l${6 * s} ${4 * s}z`, roof, sw)
      + Lc(`M${x - hw} ${y}h${2 * hw}`, '#FFCA28', 2.5);
    if (k < n - 1) o += R(x - hw * 0.62, y - h - 7 * s, hw * 1.24, 7 * s, '#FFFFFF', 0, sw);
    y -= h + 7 * s;
  }
  return o + Lc(`M${x} ${y + 7 * s}v-${16 * s}`, '#FFCA28', 3) + C(x, y - 10 * s, 3 * s, '#FFCA28', sw);
};
// a white Shan pagoda: two square steps, a round bell and a golden tiered umbrella on top
const shanChedi = (x, b, s, sw) => R(x - 26 * s, b - 14 * s, 52 * s, 14 * s, '#FFFFFF', 0, sw) + R(x - 20 * s, b - 26 * s, 40 * s, 12 * s, '#FFFFFF', 0, sw)
  + P(`M${x - 18 * s} ${b - 26 * s}c0-${22 * s} ${10 * s}-${34 * s} ${18 * s}-${40 * s}c${8 * s} ${6 * s} ${18 * s} ${18 * s} ${18 * s} ${40 * s}z`, '#FFFFFF', sw)
  + P(`M${x - 5 * s} ${b - 64 * s}l${5 * s}-${26 * s} ${5 * s} ${26 * s}z`, '#FFCA28', sw) + Lc(`M${x - 9 * s} ${b - 70 * s}h${18 * s}M${x - 6 * s} ${b - 80 * s}h${12 * s}`, '#FFB300', 2.5)
  + Lc(`M${x - 18 * s} ${b - 26 * s}h${36 * s}`, '#FFCA28', 2.5);
const pine = (x, b, s, c = '#2E7D32') => Lc(`M${x} ${b}v-${20 * s}`, '#6D4C41', 4) + [0, 1, 2].map((k) => P(`M${x - (20 - k * 5) * s} ${b - (16 + k * 16) * s}l${(20 - k * 5) * s}-${24 * s} ${(20 - k * 5) * s} ${24 * s}z`, c)).join('');

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับแม่ฮ่องสอน', 'Mae Hong Son stamp'), kw: ['mae hong son', 'แม่ฮ่องสอน', 'wat chong kham', 'วัดจองคำ', 'shan temple', 'วัดไทใหญ่', 'pang ung', 'ปางอุ๋ง'],
    // a Shan temple hall with three stacked silver roofs above the little lake's ripples
    svg: cityStamp('mhs-st', { name: 'MAE HONG SON', sub: 'PANG UNG · THAILAND', ...MH, emblem: shan(100, 128, 60, 3, 0.85, '#CFD8DC', 2.5) + Lc('M58 136c14-4 28 4 42 0s28-4 42 0', '#4FC3F7', 3) + Lc('M66 144c10-3 22 3 34 0s22-3 34 0', '#4FC3F7', 2.5) }) },

  D('jongkham', 'เมืองแม่ฮ่องสอนริมหนองจองคำ', 'Mae Hong Son town round its little lake', ['mae hong son town', 'เมืองแม่ฮ่องสอน', 'nong chong kham', 'หนองจองคำ', 'lakeside temples', 'วัดริมหนอง', 'doi kong mu', 'ดอยกองมู', 'valley town', 'เมืองในหุบเขา'],
    // two Shan temple halls with silver tiered roofs on the far bank, their reflections in the round lake, the hill of Doi Kong Mu behind with two tiny white pagodas, misty blue mountains
    scene('mhs-d1', '#E3F2FD', P('M-4 110c40-30 80-34 120-24s90-30 128-6v40H-4z', '#B0BEC5', 0) + P('M30 130c20-60 60-80 90-80s70 30 90 80z', '#66BB6A')
      + shanChedi(104, 64, 0.55, 2.5) + shanChedi(134, 64, 0.45, 2.5) + P('M-4 128h248v30H-4z', '#81C784') + shan(84, 158, 52, 3, 0.8) + shan(160, 158, 46, 2, 0.8)
      + P('M-4 158h248v90H-4z', '#4FC3F7') + Lc('M60 172h50M130 176h56M40 196h40M110 206h70', '#B3E5FC', 3) + E(84, 176, 22, 5, '#CFD8DC', 0) + E(160, 176, 20, 5, '#CFD8DC', 0)
      + C(30, 150, 14, '#43A047') + C(214, 150, 14, '#43A047') + face(120, 214, 0.32))),

  D('banrakthai', 'บ้านรักไทยหมู่บ้านดินริมทะเลสาบ', 'Ban Rak Thai, the clay village by the lake', ['ban rak thai', 'บ้านรักไทย', 'yunnanese village', 'หมู่บ้านยูนนาน', 'clay houses', 'บ้านดิน', 'mountain lake', 'ทะเลสาบบนดอย', 'chinese village', 'หมู่บ้านจีน'],
    // ochre clay houses with grey tiled roofs climbing a green slope round a still lake, a little wooden pavilion on stilts over the water, mountain ridges behind
    scene('mhs-d2', '#FFF3E0', P('M-4 96c40-24 70-30 110-14s80-20 138 0v40H-4z', '#A5D6A7', 0) + P('M-4 120c50-30 110-34 160-14s70 0 88 4v60H-4z', '#81C784')
      + [[40, 128], [70, 116], [104, 112], [140, 118], [176, 124], [58, 146], [96, 140], [196, 144]].map(([x, y]) => R(x - 12, y, 24, 16, '#E0A060', 0, 3) + P(`M${x - 16} ${y + 2}l4-10h24l4 10z`, '#78909C', 3) + R(x - 3, y + 6, 6, 10, '#6D4C41', 0, 2)).join('')
      + P('M-4 162h248v90H-4z', '#80DEEA') + R(150, 150, 34, 14, '#A1887F', 0, 3) + P('M144 152l23-16 23 16z', '#C62828', 3) + Lc('M154 164v20M180 164v20', '#6D4C41', 4)
      + Lc('M40 186h40M100 200h50M30 214h40', '#E0F7FA', 3) + face(104, 122, 0.3))),

  L('chongkham', 'วัดจองคำจองกลางริมหนอง', 'Wat Chong Kham and Wat Chong Klang by the lake', ['wat chong kham', 'วัดจองคำ', 'wat chong klang', 'วัดจองกลาง', 'shan temple', 'วัดศิลปะไทใหญ่', 'tiered tin roofs', 'หลังคาซ้อนชั้น', 'lake reflection', 'เงาสะท้อนในน้ำ'], nm('หาหลังคาที่ซ้อนกันหลายชั้นเหมือนขนมชั้น', 'Find the roofs stacked up like a layer cake'),
    // two white Shan temple halls side by side, silver tin roofs stacked in many tiers with gold lace edges, mirrored upside-down in the lake below (buildings only)
    R(14, 150, 212, 70, '#4FC3F7', 30) + shan(80, 150, 70, 4, 1) + shan(170, 150, 58, 3, 1, '#B0BEC5')
    + E(80, 170, 34, 7, '#CFD8DC', 0) + E(80, 186, 22, 6, '#CFD8DC', 0) + E(170, 170, 28, 7, '#B0BEC5', 0) + E(170, 184, 18, 5, '#B0BEC5', 0) + Lc('M30 202h40M110 206h60', '#B3E5FC', 3)
    + face(80, 132, 0.36) + face(170, 132, 0.32)),

  L('kongmu', 'เจดีย์ขาวบนดอยกองมู', 'The white pagodas on Doi Kong Mu', ['doi kong mu', 'ดอยกองมู', 'wat phra that doi kong mu', 'วัดพระธาตุดอยกองมู', 'white pagodas', 'เจดีย์ขาว', 'shan style', 'ศิลปะไทใหญ่', 'hilltop', 'บนยอดดอย'], nm('หาร่มสีทองเล็กๆ บนยอดเจดีย์', 'Find the little golden umbrellas on top'),
    // a big and a small white Shan pagoda side by side on a green hilltop, each crowned with a golden tiered umbrella, a white low wall in front
    P('M10 214c30-40 70-54 110-54s80 14 110 54z', '#81C784') + shanChedi(92, 170, 1.45) + shanChedi(160, 170, 1.05) + R(40, 168, 160, 10, '#FFFFFF')
    + [56, 80, 104, 128, 152, 176].map((x) => R(x - 4, 160, 8, 8, '#FFFFFF', 0, 3)).join('') + face(92, 124, 0.42) + face(160, 138, 0.3)),

  L('pangung', 'ทะเลสาบปางอุ๋งกับแนวสนยามเช้า', 'Pang Ung\'s pine-lined lake at dawn', ['pang ung', 'ปางอุ๋ง', 'pine forest', 'ป่าสน', 'mountain lake', 'อ่างเก็บน้ำบนดอย', 'dawn', 'ยามเช้า', 'reflection', 'เงาสะท้อน'], nm('หาต้นสนที่กลับหัวอยู่ในน้ำ', 'Find the pine trees upside down in the water'),
    // a still lake in a pink-and-yellow dawn, tall tufty pine trees on both banks mirrored in the water, a small wooden jetty poking out
    R(16, 30, 208, 186, '#FFE0B2', 36) + C(120, 98, 22, '#FFD54F') + P('M16 112c40-20 80-16 104-6s70-18 104-6v14H16z', '#C5CAE9', 0)
    + [[34, 128, 1], [58, 126, 0.8], [186, 128, 1], [208, 126, 0.85]].map(([x, b, s]) => pine(x, b, s)).join('') + R(16, 126, 208, 90, '#80CBC4', 0)
    + [[34, 128, 1], [186, 128, 1]].map(([x, b, s]) => g(0, 2 * b, 1, `<g transform="scale(1 -1)">${pine(x, b, s * 0.8, '#4DB6AC')}</g>`)).join('')
    + R(70, 150, 74, 10, '#A1887F', 0) + Lc('M80 160v18M134 160v18', '#6D4C41', 5) + Lc('M90 186h50M70 200h80', '#E0F2F1', 3) + face(120, 96, 0.34)),

  L('khaokanjin', 'ข้าวกั๊นจิ๊นห่อใบตอง', 'Khao kan jin, Shan rice wrapped in banana leaf', ['khao kan jin', 'ข้าวกั๊นจิ๊น', 'shan rice', 'ข้าวไทใหญ่', 'banana leaf parcel', 'ห่อใบตอง', 'fried garlic', 'กระเทียมเจียว', 'dried chilli', 'พริกแห้ง'], nm('หาพริกแห้งสีแดงที่วางอยู่ข้างๆ', 'Find the red dried chillies on the side'),
    // an opened green banana-leaf parcel holding a soft pink-red mound of rice topped with golden fried garlic, two dried chillies, a cucumber and a spring onion beside it
    P('M24 176c20-40 70-60 96-60s76 20 96 60c-30 22-162 22-192 0z', '#66BB6A') + Lc('M24 176c50 6 142 6 192 0', '#388E3C', 3) + P('M40 168c10-26 50-44 80-44s70 18 80 44c-20 10-140 10-160 0z', '#A5D6A7')
    + P('M64 160c4-30 30-44 56-44s52 14 56 44c-20 10-92 10-112 0z', '#EF9A9A') + [[90, 128], [112, 122], [134, 126], [104, 138], [148, 140]].map(([x, y]) => C(x, y, 4, '#FFB74D', 2)).join('')
    + P('M168 196c10-6 30-6 40 4l-6 6c-10-6-24-6-30-2z', '#E53935') + P('M172 210c10-4 26 0 34 8l-8 4c-6-6-16-8-24-6z', '#C62828')
    + E(44, 206, 18, 8, '#9CCC65') + E(44, 206, 10, 4, '#F1F8E9', 2) + Lc('M60 194l40-12', '#7CB342', 4) + face(120, 140, 0.4)),

  L('alawa', 'ขนมอาละหว่าสีทอง', 'Alawa, the golden Shan semolina cake', ['alawa', 'อาละหว่า', 'shan dessert', 'ขนมไทใหญ่', 'coconut cake', 'ขนมกะทิอบ', 'baked tray', 'ถาดอบ', 'mae hong son sweets', 'ของฝากแม่ฮ่องสอน'], nm('หาชิ้นที่ถูกยกขึ้นมาจากถาด', 'Find the piece lifted out of the tray'),
    // a silver baking tray of soft cream cake with a shiny golden-brown top cut into squares, one square lifted out above it, sesame seeds sprinkled
    P('M20 150l20-30h160l20 30v34H20z', '#B0BEC5') + R(36, 120, 168, 40, '#FFE0B2', 0) + R(36, 120, 168, 14, '#E8A045', 0)
    + Lc('M78 120v40M120 120v40M162 120v40', '#C77F2E', 3) + Lc('M20 184h200', INK, 3)
    + R(92, 52, 52, 40, '#FFE0B2', 6) + R(92, 52, 52, 14, '#E8A045', 6) + [[102, 58], [114, 56], [128, 60], [138, 56]].map(([x, y]) => E(x, y, 2.5, 1.5, '#FFF8E1', 0)).join('')
    + Lc('M118 98v12M110 104l8 8 8-8', '#8D6E63', 3) + face(118, 76, 0.38)),

  L('jabo', 'ก๋วยเตี๋ยวห้อยขาบ้านจ่าโบ่', 'Noodles at the cliff-edge counter of Ban Jabo', ['ban jabo', 'บ้านจ่าโบ่', 'pang mapha', 'ปางมะผ้า', 'cliff noodle shop', 'ก๋วยเตี๋ยวห้อยขา', 'mountain view', 'วิวภูเขา', 'misty valley', 'หุบเขา'], nm('หาชามก๋วยเตี๋ยวสองชามบนเคาน์เตอร์ไม้', 'Find the two noodle bowls on the wooden counter'),
    // a long wooden counter running along the edge of a mountain slope, two steaming noodle bowls and chopsticks on it, a plank bench with nothing but air under it, blue mountain ridges far below
    R(14, 26, 212, 150, '#E1F5FE', 30) + P('M14 120c40-20 70-10 100-24s70-8 112 4v40H14z', '#9FA8DA') + P('M14 146c50-16 100-4 140-14s50 6 72 8v40H14z', '#7986CB')
    + R(14, 150, 212, 14, '#A1887F') + Lc('M30 164v40M210 164v40', '#6D4C41', 6) + R(24, 196, 192, 10, '#8D6E63')
    + [[80, 150], [154, 150]].map(([x, y]) => P(`M${x - 24} ${y - 22}h48c0 16-10 22-24 22s-24-6-24-22z`, '#FFFFFF') + Lc(`M${x - 22} ${y - 22}h44`, '#E53935', 3) + E(x, y - 22, 22, 4, '#FFE082', 2) + Lc(`M${x - 6} ${y - 30}c-4-8 4-12 0-20M${x + 8} ${y - 30}c-4-8 4-12 0-20`, '#CFD8DC', 3) + Lc(`M${x + 14} ${y - 46}l16 26`, '#6D4C41', 3)).join('')
    + face(80, 136, 0.3) + face(154, 136, 0.3)),

  L('salween', 'แม่น้ำสาละวินที่แม่สามแลบ', 'The Salween River at Mae Sam Laep', ['salween river', 'แม่น้ำสาละวิน', 'mae sam laep', 'แม่สามแลบ', 'mae sariang', 'แม่สะเรียง', 'border river', 'แม่น้ำชายแดน', 'river boat', 'เรือแม่น้ำ'], nm('หาเรือไม้ลำยาวที่มีหลังคา', 'Find the long wooden boat with a roof'),
    // a wide brown river winding between steep jungle mountains on both sides, a sandy bank, a long wooden river boat with a little curved roof gliding on it
    R(14, 24, 212, 192, '#E3F2FD', 34) + P('M14 60l40-30 40 40 30-30 40 36 30-26 32 26v60H14z', '#43A047') + P('M14 110c40-10 60 10 90 0s50-20 80-10 30 10 42 10v30H14z', '#2E7D32')
    + P('M14 144c50-14 120-10 212-6v78H14z', '#C8A26E') + P('M14 166c60-16 140-12 212-4v34c-80-8-150-10-212 4z', '#E6CFA0')
    + P('M44 150c10 14 140 14 156 0l-8-12H54z', '#8D6E63') + P('M80 140c4-24 76-24 80 0z', '#FFB74D') + Lc('M92 140v-10M148 140v-10', '#6D4C41', 3) + Lc('M30 172c30 6 160 6 190 0', '#A1887F', 3) + Lc('M34 184h30M180 182h30', '#E6CFA0', 3) + face(120, 130, 0.34)),

  L('shanhat', 'กุ๊บไต หมวกไทใหญ่', 'The Shan hat, kup tai', ['kup tai', 'กุ๊บไต', 'shan hat', 'หมวกไทใหญ่', 'bamboo hat', 'หมวกไม้ไผ่', 'shan costume', 'ชุดไทใหญ่', 'shan bag', 'ย่ามไต'], nm('หาปุ่มกลมๆ บนยอดหมวก', 'Find the little round knob on top of the hat'),
    // a wide, flat-brimmed woven bamboo hat with a tall pointed crown ending in a small knob, a woven strap, and a striped Shan shoulder bag beside it
    E(110, 134, 100, 24, '#E6C27A') + Lc('M30 134c30 10 130 10 160 0', '#C9A15A', 3) + P('M76 128c4-30 18-56 34-70 16 14 30 40 34 70z', '#F0D08A') + C(110, 54, 8, '#C9A15A')
    + Lc('M84 110c18 6 34 6 52 0M90 92c14 4 26 4 40 0', '#C9A15A', 3) + Lc('M80 148c10 30 50 40 60 0', '#8D6E63', 3)
    + R(162, 158, 54, 52, '#E53935', 8) + Lc('M162 174h54M162 190h54', '#FFCA28', 4) + Lc('M168 158c4-30 38-30 42 0', '#E53935', 5) + face(110, 102, 0.36)),

  L('tinlace', 'ลายฉลุสังกะสีชายคาไทใหญ่', 'The cut-tin lace on a Shan roof', ['shan tin lace', 'ลายฉลุสังกะสี', 'roof fringe', 'ชายคาฉลุ', 'tai yai craft', 'งานช่างไทใหญ่', 'silver eaves', 'ชายคาสีเงิน', 'temple roof detail', 'หลังคาวัดไทใหญ่'], nm('หาชายระบายรูปสามเหลี่ยมที่ห้อยลงมา', 'Find the little triangles hanging down like a fringe'),
    // a close-up of two tiers of a Shan roof corner, each edge hung with a row of silver cut-tin lace triangles with tiny holes, a curled gold tip at each corner, blue sky behind
    R(14, 30, 212, 180, '#BBDEFB', 32) + P('M30 110l40-50h120l20 50z', '#CFD8DC') + P('M30 110l-10 8 14-2z', '#FFCA28')
    + Array.from({ length: 9 }, (_, k) => P(`M${34 + k * 20} 110l10 18 10-18z`, '#ECEFF1', 3) + C(44 + k * 20, 116, 2.5, '#90A4AE', 0)).join('')
    + R(60, 128, 140, 14, '#FFFFFF') + P('M50 182l30-40h110l20 40z', '#B0BEC5') + Array.from({ length: 8 }, (_, k) => P(`M${54 + k * 20} 182l10 16 10-16z`, '#ECEFF1', 3)).join('')
    + P('M50 182l-12 6 16 0z', '#FFCA28') + [[200, 60], [28, 160]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, '#FFFFFF', 2)).join('') + face(130, 86, 0.36)),

  L('garlic', 'กระเทียมแม่ฮ่องสอนแขวนเป็นพวง', 'Mae Hong Son garlic hanging in bunches', ['mae hong son garlic', 'กระเทียมแม่ฮ่องสอน', 'garlic bunches', 'กระเทียมพวง', 'drying garlic', 'ตากกระเทียม', 'local produce', 'ผลผลิตท้องถิ่น', 'shan kitchen', 'ครัวไทใหญ่'], nm('หากระเทียมหัวที่ยิ้มอยู่ตรงกลาง', 'Find the smiling bulb in the middle'),
    // a bamboo pole with three bunches of plump white-and-purple garlic bulbs hanging by their dry stalks, papery tails curling
    Lc('M14 40h212', '#C0A060', 9) + [[54, 0], [120, 1], [186, 0]].map(([x, mid]) => Lc(`M${x} 40v30M${x - 6} 40l-10 40M${x + 6} 40l10 40`, '#D7CCA0', 4)
      + [[x - 14, 108], [x + 14, 108], [x, 150 + (mid ? 6 : 0)]].map(([bx, by]) => P(`M${bx} ${by - 22}c-6 6-24 16-24 34 0 14 12 20 24 20s24-6 24-20c0-18-18-28-24-34z`, '#FAFAFA') + Lc(`M${bx} ${by - 2}v28M${bx - 12} ${by + 6}c2 10 6 18 12 22M${bx + 12} ${by + 6}c-2 10-6 18-12 22`, '#CE93D8', 2)).join('')).join('')
    + face(120, 166, 0.36)),

  L('khaoramfuen', 'ข้าวแรมฟืนเต้าหู้เหลืองไทใหญ่', 'Khao ram fuen, the yellow Shan pea jelly', ['khao ram fuen', 'ข้าวแรมฟืน', 'shan tofu', 'เต้าหู้ไทใหญ่', 'yellow pea jelly', 'เต้าหู้ถั่วลันเตา', 'chilli sauce', 'น้ำพริก', 'shan street food', 'อาหารไทใหญ่'], nm('หาถั่วลิสงที่โรยอยู่ข้างบน', 'Find the peanuts sprinkled on top'),
    // a round plate of soft yellow pea-jelly cut into wobbly strips, drizzled with red chilli sauce and dark soy, peanuts, coriander leaves and a lime wedge on top
    E(120, 150, 100, 46, '#FFFFFF') + E(120, 146, 82, 34, '#ECEFF1', 3)
    + [[80, 140], [104, 132], [128, 138], [152, 130], [96, 154], [122, 158], [148, 152]].map(([x, y], k) => R(x - 14, y - 9, 28, 18, '#FFD54F', 6, 3)).join('')
    + Lc('M74 132c20 10 40-6 60 4s40-4 56 6', '#E53935', 4) + Lc('M84 158c20 6 40-8 70 0', '#5D4037', 3)
    + [[96, 126], [138, 124], [118, 150], [160, 144]].map(([x, y]) => E(x, y, 4, 3, '#D7A86E', 2)).join('') + [[84, 146], [150, 160]].map(([x, y]) => P(`M${x} ${y}c-6-6-2-12 4-8 4-6 10 0 4 6z`, '#66BB6A', 2)).join('')
    + P('M180 164c10-14 24-12 28 0z', '#C5E1A5') + face(122, 112, 0.34)),

  L('kalaga', 'ผ้ากาล่าก๋าปักเลื่อม', 'A kalaga, the sequinned Shan tapestry', ['kalaga', 'กาล่าก๋า', 'sequin tapestry', 'ผ้าปักเลื่อม', 'shan embroidery', 'งานปักไทใหญ่', 'peacock pattern', 'ลายนกยูง', 'mae hong son craft', 'หัตถกรรมแม่ฮ่องสอน'], nm('หานกยูงที่ปักด้วยเลื่อมระยิบระยับ', 'Find the sparkly sequinned peacock'),
    // a red velvet wall hanging on a little rod, a gold border of round sequins, a puffed-up peacock in green and gold sequins with a fanned tail in the middle, gold tassels below
    Lc('M24 34h192', '#8D6E63', 7) + R(34, 38, 172, 160, '#C62828', 6) + R(44, 48, 152, 140, '#B71C1C', 4, 2.5)
    + Array.from({ length: 18 }, (_, k) => C(48 + k * 8.4, 44, 3, '#FFCA28', 1.5) + C(48 + k * 8.4, 192, 3, '#FFCA28', 1.5)).join('')
    + P('M120 150c-40-6-56-50-30-80 10 20 22 24 30 24s20-4 30-24c26 30 10 74-30 80z', '#26A69A') + [[92, 90], [104, 78], [120, 74], [136, 78], [148, 90], [100, 110], [140, 110]].map(([x, y]) => C(x, y, 5, '#FFD54F', 2)).join('')
    + E(120, 136, 18, 22, '#1E88E5') + C(120, 108, 9, '#1E88E5') + P('M128 106l10 4-10 3z', '#FFCA28', 2) + Lc('M116 98l-4-8M120 98v-9M124 98l4-8', '#FFCA28', 2)
    + [60, 90, 150, 180].map((x) => Lc(`M${x} 198v18`, '#FFCA28', 4) + C(x, 220, 4, '#FFCA28', 2)).join('') + face(120, 132, 0.3)),

  L('thuanao', 'ถั่วเน่าแผ่นตากแดด', 'Thua nao discs drying in the sun', ['thua nao', 'ถั่วเน่าแผ่น', 'shan seasoning', 'เครื่องปรุงไทใหญ่', 'sun drying', 'ตากแดด', 'bamboo tray', 'กระด้งไม้ไผ่', 'shan kitchen', 'ครัวไทใหญ่'], nm('หาแผ่นกลมๆ ที่ยิ้มรับแดด', 'Find the round disc smiling up at the sun'),
    // a big round woven bamboo tray on a stand covered in thin round brown discs laid out in rings, a smiling sun above
    C(184, 50, 22, '#FFD54F') + Array.from({ length: 8 }, (_, k) => g(184, 50, 1, Lc('M0 -28v-8', '#FFB300', 3), k * 45)).join('')
    + Lc('M60 196l20-40M180 196l-20-40', '#8D6E63', 6) + E(120, 150, 100, 40, '#E6C27A') + E(120, 150, 88, 33, '#D7B46A', 2.5) + Lc('M40 150c40 12 120 12 160 0M50 140c40 10 100 10 140 0', '#C9A15A', 2)
    + [[60, 150], [84, 138], [110, 134], [136, 134], [162, 138], [184, 150], [76, 160], [104, 166], [134, 166], [162, 160], [120, 150]].map(([x, y]) => E(x, y, 12, 6, '#A1662F', 2.5)).join('')
    + face(184, 48, 0.32) + face(120, 146, 0.18, 'none')),

  L('kamko', 'ระเบียงยาวมีหลังคาวัดกำก่อ', 'The long roofed walkway of Wat Kam Ko', ['wat kam ko', 'วัดกำก่อ', 'covered walkway', 'ระเบียงมีหลังคา', 'shan temple', 'วัดไทใหญ่', 'wooden corridor', 'ทางเดินไม้', 'mae hong son', 'แม่ฮ่องสอน'], nm('หาเสาที่เรียงกันเป็นแถวยาว', 'Find the long row of posts'),
    // a long covered walkway seen slanting away: a row of white posts under a continuous grey tin roof with lace edges, leading to a small Shan hall with stacked roofs at the far end (building only)
    shan(186, 150, 50, 3, 0.8) + P('M14 112l150 10v14L14 140z', '#B0BEC5') + Array.from({ length: 7 }, (_, k) => P(`M${18 + k * 22} ${118 + k * 0.6}l8 14 8-14z`, '#ECEFF1', 2)).join('')
    + [24, 52, 80, 108, 136, 160].map((x, k) => R(x - 4, 136 - k * 0.5, 8, 58 - k * 6, '#FFFFFF', 0, 3)).join('') + P('M14 196l150-18v6L14 210z', '#BCAAA4')
    + face(90, 160, 0.3)),

  L('hillrice', 'นาข้าวไร่บนเนินกับห้างนา', 'Hill rice on the slope and its little field hut', ['hill rice', 'ข้าวไร่', 'upland fields', 'ไร่บนดอย', 'field hut', 'ห้างนา', 'harvest time', 'ฤดูเกี่ยวข้าว', 'mountain farm', 'ไร่บนภูเขา'], nm('หากระท่อมเล็กๆ บนเสาสูง', 'Find the little hut up on its stilts'),
    // a steep green-and-gold hillside of upland rice, a tiny bamboo hut on tall stilts with a leaf roof and a ladder, blue mountains and a white cloud behind
    R(14, 26, 212, 190, '#E1F5FE', 34) + P('M14 96c30-30 70-40 110-20s70-30 102-10v30H14z', '#9FA8DA') + E(70, 56, 22, 10, '#FFFFFF', 3)
    + P('M14 120c60-30 140-40 212-10v106H14z', '#9CCC65') + P('M14 150c60-24 140-34 212-4v70H14z', '#FFD54F')
    + Array.from({ length: 10 }, (_, k) => Lc(`M${28 + k * 20} ${178 - (k % 3) * 6}c-2-10 2-16 6-20`, '#F9A825', 3)).join('')
    + Lc('M134 150v-30M166 146v-30', '#8D6E63', 5) + R(126, 98, 48, 22, '#D7B46A') + P('M118 100l32-26 32 26z', '#A1887F') + Lc('M128 156l14-36M134 146h10M130 154h10', '#8D6E63', 3) + face(150, 108, 0.26)),

  L('kongmuview', 'มองเมืองและสนามบินจากดอยกองมู', 'The town and its little runway seen from Doi Kong Mu', ['doi kong mu viewpoint', 'จุดชมวิวดอยกองมู', 'valley view', 'วิวหุบเขา', 'mae hong son airport', 'สนามบินแม่ฮ่องสอน', 'plane landing', 'เครื่องบินลงจอด', 'town in the valley', 'เมืองในหุบ'], nm('หาเครื่องบินลำเล็กที่กำลังบินลงมา', 'Find the little plane coming down to land'),
    // a white balustrade at the front, below it a green valley with a cluster of tiny red and grey roofs, a long grey runway striped with white, a little plane gliding in over the hills
    R(14, 26, 212, 180, '#FFF8E1', 32) + P('M14 90c40-30 80-30 110-14s70-26 102-8v30H14z', '#9FA8DA') + P('M14 104h212v76H14z', '#A5D6A7')
    + P('M40 150l160-22 10 10-160 22z', '#90A4AE') + Lc('M70 151l12-2M110 145l12-2M150 140l12-2', '#FFFFFF', 3)
    + [[56, 118], [80, 124], [104, 116], [130, 120], [168, 112]].map(([x, y]) => R(x - 7, y, 14, 8, '#FFF8E1', 0, 2) + P(`M${x - 9} ${y}l9-6 9 6z`, x % 3 ? '#E53935' : '#78909C', 2)).join('')
    + g(160, 62, 1, P('M-30 0h56l8-6v12l-8-2H-30z', '#FFFFFF', 3) + P('M-6 0l-10 16h10l12-16z', '#4FC3F7', 3) + P('M-26 -2l-6-10h6l8 10z', '#4FC3F7', 3), 12)
    + R(14, 180, 212, 10, '#FFFFFF') + [30, 66, 102, 138, 174, 210].map((x) => R(x - 5, 190, 10, 20, '#FFFFFF', 3)).join('') + face(120, 156, 0.26)),

  L('bamboorat', 'อ้นตัวกลมในกอไผ่', 'A chubby bamboo rat in the bamboo grove', ['bamboo rat', 'อ้น', 'hoary bamboo rat', 'อ้นในป่าไผ่', 'bamboo grove', 'กอไผ่', 'forest animal', 'สัตว์ป่า', 'northern hills', 'ป่าภาคเหนือ'], nm('หาฟันสีส้มสองซี่', 'Find the two orange front teeth'),
    // a round, fluffy grey-brown bamboo rat with tiny ears and two orange front teeth, nibbling a bamboo shoot among tall green bamboo stems
    [40, 70, 176, 204].map((x) => Lc(`M${x} 214V30`, '#7CB342', 10) + Lc(`M${x - 5} 90h10M${x - 5} 150h10`, '#558B2F', 3)).join('')
    + [[40, 60, -1], [204, 110, 1], [176, 50, 1]].map(([x, y, d]) => P(`M${x} ${y}c${d * 20}-10 ${d * 34}-4 ${d * 40} 6-${d * 18} 6-${d * 30} 2-${d * 40}-6z`, '#9CCC65', 2.5)).join('')
    + E(120, 160, 62, 48, '#A1887F') + C(84, 118, 12, '#BCAAA4') + C(156, 118, 12, '#BCAAA4') + C(84, 118, 6, '#F8BBD0', 0) + C(156, 118, 6, '#F8BBD0', 0)
    + E(120, 160, 30, 22, '#D7CCC8', 0) + R(113, 162, 6, 10, '#FF9800', 1, 2) + R(121, 162, 6, 10, '#FF9800', 1, 2) + P('M150 196l26-20 6 8-24 18z', '#C5E1A5') + E(96, 206, 12, 5, '#8D6E63') + E(144, 206, 12, 5, '#8D6E63') + face(120, 140, 0.55, 'none')),
];

export default {
  places: {
    'th-maehongson': { country: 'th', wave: 3, home: true, name: nm('แม่ฮ่องสอน ปางอุ๋งและแม่สะเรียง', 'Mae Hong Son, Pang Ung and Mae Sariang'), tz: 'Asia/Bangkok', ll: [19.3, 97.97], alias: ['mae hong son', 'แม่ฮ่องสอน', 'HGN', 'pang ung', 'ปางอุ๋ง', 'mae sariang', 'แม่สะเรียง', 'ban rak thai', 'บ้านรักไทย', 'pang mapha', 'ปางมะผ้า', 'khun yuam', 'ขุนยวม', 'ban jabo', 'บ้านจ่าโบ่'], colors: MH },
  },
  items,
};
