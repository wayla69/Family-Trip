// Wave 9, group france (1/3): France, Paris, Disneyland Paris (no characters, no rides, no castle: the family's day around the park),
// Switzerland, Lucerne, Interlaken and Zermatt
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name; places whose scope differs from their folder are mapped (Disneyland Paris is a big-attraction place, scope p-)
const SCOPE = { 'fr-disney-paris': 'p-disney-paris' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport)
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
// a grown-up standing (head, body, legs)
const adult = (x, y, top, s = 1) => g(x, y, s, C(0, -46, 11, '#FFE0BD', 2.5) + P('M-13-34h26l4 40h-34z', top, 2.5) + Lc('M-7 6v26M7 6v26', INK, 5) + face(0, -44, 0.26));
const star = (x, y, c = '#FFEB3B') => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, c, 2);
const peaks = (c, snow) => P('M-4 120l50-60 30 30 40-56 50 60 30-24 48 50z', c, 3) + P('M38 70l8-10 10 10-8 2zM110 40l6-6 12 12-10-2z', snow, 0);
const water = (y, c = '#4FC3F7') => R(-4, y, 248, 248 - y, c, 0, 3) + Lc(`M20 ${y + 16}c10-4 20 4 30 0M150 ${y + 26}c10-4 20 4 30 0`, '#E1F5FE', 3);

const items = [
  // ---------- France
  K('fr', 'food', 'baguette', 'ขนมปังบาแก็ตต์อบใหม่', 'A fresh crusty baguette', ['baguette', 'บาแก็ตต์', 'french bread', 'ขนมปังฝรั่งเศส', 'boulangerie', 'ร้านขนมปัง', 'crusty bread', 'ขนมปังกรอบ', 'breakfast bread', 'tradition'],
    // a long golden baguette lying slanted with its diagonal cuts, a paper sleeve wrapped round the middle, the broken end showing the holey white crumb, crumbs scattered, a happy face on the crust
    g(120, 120, 1, P('M-100-18c0-12 8-16 20-16h170c12 0 18 8 18 16v24c0 10-6 16-18 16h-170c-12 0-20-6-20-16z', '#E2A04A', 3)
      + [-80, -50, -20, 10, 40, 70].map((x) => P(`M${x}-24c8 2 16 10 20 22`, '#F6D08E', 3)).join('')
      + R(-30, -38, 60, 58, '#FFFFFF', 4, 3) + Lc('M-30-26h60M-30 8h60', '#90CAF9', 3) + E(108, -6, 10, 22, '#FFF3D6', 3)
      + [[104, -14], [110, 0], [104, 8]].map(([x, y]) => C(x, y, 2.5, '#E8C98A', 0)).join('') + face(-66, -4, 0.45), -24)
      + [[60, 196], [76, 204], [176, 206], [190, 196]].map(([x, y]) => C(x, y, 3, '#E2A04A', 2)).join('')),
  K('fr', 'food', 'madeleine', 'ขนมมาเดอแลนรูปเปลือกหอย', 'Shell-shaped madeleine cakes', ['madeleine', 'มาเดอแลน', 'madeleines', 'shell cake', 'เค้กรูปเปลือกหอย', 'little sponge cake', 'เค้กชิ้นเล็ก', 'goûter', 'ของว่างตอนบ่าย', 'lemon cake'],
    // three golden scallop-shell sponge cakes on a round plate: two lying ridged side up, one turned over showing its round hump, a lemon half beside them, a face on the front cake
    E(120, 176, 104, 36, '#FFFFFF', 3) + E(120, 172, 86, 24, '#E8F5E9', 0)
      + [[76, 132, -14], [162, 130, 16]].map(([x, y, r]) => g(x, y, 1, P('M0 34c-30 0-46-26-44-46 2-18 22-30 44-30s42 12 44 30c2 20-14 46-44 46z', '#F2B65C', 3)
        + [-36, -24, -12, 0, 12, 24, 36].map((a) => Lc(`M0 30L${(Math.sin(a * Math.PI / 100) * 40).toFixed(1)} ${(-Math.cos(a * Math.PI / 100) * 36).toFixed(1)}`, '#D48A2E', 2.5)).join(''), r)).join('')
      + g(120, 174, 1, P('M-44 0c0-22 20-34 44-34s44 12 44 34c-10 8-30 10-44 10s-34-2-44-10z', '#E9A64A', 3) + E(-6, -18, 16, 8, '#F7CB82', 0) + face(0, -10, 0.42))
      + g(196, 196, 1, C(0, 0, 20, '#FFEB3B', 3) + C(0, 0, 13, '#FFF59D', 2) + Lc('M0-13v26M-13 0h26M-9-9l18 18M9-9l-18 18', '#FBC02D', 1.5))),
  K('fr', 'culture', 'mariniere', 'เสื้อลายทางกะลาสีกับหมวกเบเรต์', 'The striped sailor top and a beret', ['mariniere', 'มารินิแยร์', 'breton stripes', 'เสื้อลายทาง', 'striped top', 'beret', 'หมวกเบเรต์', 'sailor shirt', 'เสื้อกะลาสี', 'french style'],
    // a navy-and-white striped long-sleeved top hanging on a wooden hanger, a little red neckerchief tied at the collar, a black beret with its tiny stalk hooked on the hanger, a happy face on the shirt
    Lc('M120 22v14', '#8D6E63', 4) + P('M120 36c-4-12 10-14 10-4', 'none', 3) + P('M70 56l50-14 50 14', '#A1673F', 6)
      + P('M76 56h88l40 40-22 20-18-16v100H76V100l-18 16-22-20z', '#FFFFFF', 3)
      + Array.from({ length: 9 }, (_, k) => Lc(`M${k < 2 ? 50 + k * 10 : 78} ${70 + k * 16}h${k < 2 ? 140 - k * 20 : 84}`, '#1A237E', 6)).join('')
      + P('M76 56h88l40 40-22 20-18-16v100H76V100l-18 16-22-20z', 'none', 3) + P('M104 56l16 22 16-22z', '#E53935', 3) + P('M114 74l-8 20 14-8 14 8-8-20z', '#E53935', 2.5)
      + face(120, 128, 0.5) + g(176, 34, 1, E(0, 0, 30, 12, '#263238', 3) + E(-4, -4, 20, 6, '#37474F', 0) + Lc('M0-12v-6', INK, 3), 14)),
  K('fr', 'transport', 'peniche', 'เรือเพนิชล่องคลองในฝรั่งเศส', 'A péniche barge on a French canal', ['peniche', 'เรือเพนิช', 'canal barge', 'เรือล่องคลอง', 'canal du midi', 'คลองดูมีดี', 'houseboat', 'เรือบ้าน', 'towpath', 'plane trees'],
    // a long low barge painted green and red gliding along a straight canal lined with tall plane trees, flower pots and a bicycle on its roof, a round porthole face, a towpath with a cyclist
    sky('#E8F5E9') + [20, 80, 140, 200].map((x) => R(x - 4, 40, 8, 90, '#A1887F', 0, 2.5) + E(x, 40, 30, 24, '#66BB6A', 3)).join('') + R(-4, 126, 248, 14, '#D7CCC8', 0, 3)
      + water(140, '#4DB6AC') + P('M14 172h200c10 0 16 6 12 14l-6 10H24l-14-14c-2-6 0-10 4-10z', '#2E7D32', 3) + R(14, 172, 212, 8, '#E53935', 0, 2.5)
      + R(40, 146, 120, 26, '#FFF3E0', 4, 3) + [56, 86, 116].map((x) => R(x, 152, 18, 12, '#81D4FA', 3, 2)).join('') + R(170, 140, 30, 32, '#FFF3E0', 4, 3)
      + [[48, '#EC407A'], [70, '#FFCA28'], [150, '#AB47BC']].map(([x, c]) => R(x - 6, 138, 12, 8, '#A1673F', 1, 2) + C(x, 134, 6, c, 2)).join('')
      + g(110, 132, 0.5, C(-20, 0, 10, 'none', 4) + C(20, 0, 10, 'none', 4) + Lc('M-20 0l12-16h20l8 16M-8-16l8 16', '#1E88E5', 4)) + C(208, 182, 8, '#B3E5FC', 2.5) + face(185, 156, 0.3)
      + kid(206, 120, '#FFB300', 0.8)),

  // ---------- Paris
  L('fr/paris/landmark-orsay.v1.svg', 'นาฬิกายักษ์ในพิพิธภัณฑ์ออร์แซ', 'The giant clock window of the Musée d\'Orsay', ['musee d\'orsay', 'พิพิธภัณฑ์ออร์แซ', 'orsay clock', 'นาฬิกาออร์แซ', 'clock window', 'หน้าต่างนาฬิกา', 'old railway station', 'สถานีรถไฟเก่า', 'impressionists', 'view over the seine'], 'หาเข็มนาฬิกาที่ชี้ขึ้นข้างบน', 'Find the clock hand pointing straight up',
    // inside the museum: an enormous round clock face of glass panes with golden ticks and black hands, the city's rooftops and a white hilltop dome seen through it, two kids' silhouettes looking out
    sky('#5D4037') + C(120, 108, 100, '#BBDEFB', 4) + P('M20 150c30-14 50 0 70-10s40 4 60-6 40 6 70-4v40H20z', '#90A4AE', 0)
      + g(176, 100, 1, P('M-16 0c0-16 32-16 32 0z', '#FAFAFA', 2) + R(-18, 0, 36, 10, '#FAFAFA', 0, 2) + Lc('M0-16v-6', INK, 2))
      + Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return Lc(`M${(120 + Math.cos(a) * 30).toFixed(1)} ${(108 + Math.sin(a) * 30).toFixed(1)}L${(120 + Math.cos(a) * 98).toFixed(1)} ${(108 + Math.sin(a) * 98).toFixed(1)}`, '#8D6E63', 2.5); }).join('')
      + C(120, 108, 30, '#BBDEFB', 3) + C(120, 108, 100, 'none', 9) + C(120, 108, 100, 'none', 3)
      + Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return C(120 + Math.cos(a) * 86, 108 + Math.sin(a) * 86, 5, '#FFC107', 2); }).join('')
      + Lc('M120 108V40M120 108l40 22', INK, 7) + C(120, 108, 7, '#FFC107', 2.5) + face(120, 128, 0.32)
      + R(-4, 210, 248, 34, '#3E2723', 0, 3) + g(84, 210, 1.1, C(0, -26, 9, '#3E2723', 2) + P('M-10-16h20l4 26h-28z', '#3E2723', 2)) + g(150, 210, 0.9, C(0, -26, 9, '#3E2723', 2) + P('M-10-16h20l4 26h-28z', '#3E2723', 2))),
  L('fr/paris/landmark-grandearche.v1.svg', 'ประตูโค้งลาเดฟองซ์ รูปกล่องกลวงยักษ์', 'The Grande Arche of La Défense, a giant hollow cube', ['grande arche', 'กร็องดาร์ช', 'la defense', 'ลาเดฟองซ์', 'hollow cube', 'ลูกบาศก์กลวง', 'modern arch', 'business district', 'giant steps', 'บันไดยักษ์'], 'หาก้อนเมฆผ้าใบที่แขวนอยู่ในช่องกลาง', 'Find the cloud-shaped canopy hanging inside the hole',
    // a huge white hollow cube seen slightly from the side, its inside walls in pale grey, a soft white cloud-like canopy hanging in the opening, a wide flight of steps below with tiny people, glass towers either side
    sky('#E3F2FD') + [[14, 60, 30, 150, '#90CAF9'], [196, 40, 34, 170, '#81D4FA']].map(([x, y, w, h, c]) => R(x, y, w, h, c, 0, 3) + Lc(`M${x + w / 2} ${y}v${h}`, '#E3F2FD', 2)).join('')
      + P('M50 34h140l14 10v150l-14 6H50z', '#FAFAFA', 3) + P('M190 34l14 10v150l-14 6z', '#CFD8DC', 3) + P('M76 58h88v126H76z', '#B3E5FC', 3) + P('M76 58l-0 126 12-8V66zM164 58v126l-10-8V66z', '#ECEFF1', 2.5)
      + Array.from({ length: 6 }, (_, k) => Lc(`M50 ${54 + k * 24}h26M164 ${54 + k * 24}h26`, '#E0E0E0', 2)).join('')
      + P('M94 112c-10-14 10-24 20-14 6-14 26-12 28 2 14-4 20 14 8 18-4 8-50 8-56-6z', '#FFFFFF', 3) + face(120, 108, 0.32)
      + Array.from({ length: 5 }, (_, k) => R(36 - k * 8, 204 + k * 8, 168 + k * 16, 8, '#E0E0E0', 0, 2)).join('') + kid(110, 210, '#E53935', 0.7) + kid(136, 216, '#FFCA28', 0.7)),
  L('fr/paris/landmark-tertre.v1.svg', 'จิตรกรวาดรูปที่จัตุรัสแตร์ทร์ มงมาร์ทร์', 'Painters at their easels on the Place du Tertre', ['place du tertre', 'จัตุรัสแตร์ทร์', 'street painters', 'จิตรกรข้างถนน', 'easel', 'ขาตั้งภาพ', 'portrait artist', 'วาดภาพเหมือน', 'artists square', 'paint palette'], 'หาจานสีที่มีสีหยดเป็นจุดๆ', 'Find the palette with blobs of paint on it',
    // a wooden easel holding a canvas painted with a little rooftop scene, a palette with bright paint blobs and two brushes leaning on it, red café parasols and leafy trees behind, a kid on a stool waiting for a portrait
    sky('#FFF3E0') + [[40, 60], [200, 54]].map(([x, y]) => R(x - 3, y, 6, 60, '#5D4037', 0, 2.5) + P(`M${x - 36} ${y + 4}c10-26 62-26 72 0z`, '#E53935', 3) + Lc(`M${x - 24} ${y}l6-10M${x + 24} ${y}l-6-10`, '#FFCDD2', 2)).join('')
      + E(120, 40, 40, 24, '#81C784', 3) + R(-4, 170, 248, 74, '#D7CCC8', 0, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${k * 44} 170l-10 74`, '#BCAAA4', 2)).join('')
      + Lc('M96 210l24-130 24 130M120 80v136M100 150h40', '#A1673F', 5) + R(88, 92, 64, 54, '#FFFFFF', 2, 3) + R(94, 98, 52, 42, '#B3E5FC', 0, 0)
      + P('M94 140v-18l12-8 10 10 12-14 18 12v18z', '#FFCC80', 2) + P('M104 112l10-8 6 6', 'none', 2) + C(136, 106, 5, '#FFEB3B', 1.5) + face(120, 126, 0.3)
      + g(186, 196, 1, P('M-28 0c-6-24 14-34 34-28 20 6 28 28 10 34-10 4-14-6-24-2s-16 4-20-4z', '#F3D9A4', 3) + C(-4, -8, 6, '#FFFFFF', 0) + C(-16, -14, 5, '#E53935', 1.5) + C(0, -20, 5, '#1E88E5', 1.5) + C(14, -16, 5, '#FFEB3B', 1.5) + C(14, -2, 5, '#43A047', 1.5)
        + Lc('M-30-20l-14-28', '#8D6E63', 4) + Lc('M-30-20l-14-28', '#8D6E63', 4)) + Lc('M150 214l-14-36', '#5D4037', 3) + C(135, 176, 4, '#AB47BC', 1.5)
      + g(44, 214, 1, R(-14, -6, 28, 6, '#8D6E63', 1, 2) + Lc('M-10 0v18M10 0v18', '#8D6E63', 3)) + kid(44, 206, '#26A69A', 0.95)),
  // ---------- Disneyland Paris (the family's day around the park: no characters, no rides, no castle)
  L('fr/disney-paris/landmark-heightcheck.v1.svg', 'วัดส่วนสูงก่อนขึ้นเครื่องเล่น', 'The height check before a ride', ['height check', 'วัดส่วนสูง', 'how tall am i', 'สูงพอหรือยัง', 'height stick', 'ไม้วัดส่วนสูง', 'tall enough', 'tiptoes', 'เขย่งเท้า', 'ride queue'], 'หาเท้าที่กำลังเขย่งอยู่', 'Find the feet standing on tiptoe',
    // a tall striped measuring post with big coloured bands and a star-shaped marker sticking out at the top, a small child standing very straight on tiptoe under the marker, a grown-up's hand pointing, footprints painted on the ground
    sky('#F3E5F5') + R(-4, 200, 248, 44, '#FFE0B2', 0, 3) + [[100, 226], [124, 226]].map(([x, y]) => E(x, y, 9, 5, '#FFB74D', 2)).join('')
      + R(136, 30, 30, 176, '#FFFFFF', 4, 3) + ['#EF5350', '#FFCA28', '#66BB6A', '#42A5F5', '#AB47BC'].map((c, k) => R(136, 46 + k * 32, 30, 16, c, 0, 0)).join('') + R(136, 30, 30, 176, 'none', 4, 3)
      + Array.from({ length: 10 }, (_, k) => Lc(`M136 ${46 + k * 16}h${k % 2 ? 8 : 14}`, INK, 2)).join('')
      + Lc('M118 96h44', '#5D4037', 4) + P('M110 96l6-10 4 8 10 2-8 6 2 10-8-6-8 6 2-10-8-6 10-2z', '#FFEB3B', 2.5) + face(152, 40, 0.3)
      + g(112, 200, 1, C(0, -80, 14, '#FFE0BD', 3) + P('M-14-94c4-12 24-12 28 0-10-4-18-4-28 0z', '#6D4C41', 2.5) + P('M-14-66h28l4 46h-36z', '#4FC3F7', 3) + Lc('M-6-20v18M6-20v18', INK, 5) + P('M-10-2l4-6 4 6zM2-2l4-6 4 6z', '#E53935', 2) + Lc('M-14-60l-10 20M14-60l10 20', '#FFE0BD', 6) + face(0, -78, 0.32))
      + g(40, 210, 1, adult(0, 0, '#7E57C2', 1.1)) + Lc('M54 150l40-30', '#FFE0BD', 6)),
  L('fr/disney-paris/landmark-poncho.v1.svg', 'เสื้อกันฝนพลาสติกตัวโคร่งวันฝนตก', 'Rain ponchos on a drizzly park day', ['rain poncho', 'เสื้อกันฝน', 'rainy day', 'วันฝนตก', 'puddles', 'แอ่งน้ำ', 'wellies', 'รองเท้าบูท', 'see-through poncho', 'drizzle'], 'หาเด็กที่กำลังกระโดดลงแอ่งน้ำ', 'Find the child jumping into a puddle',
    // a grey drizzly sky, a grown-up and two children in big see-through ponchos tinted yellow, pink and blue with hoods up, one child jumping into a puddle with a splash, wellies, raindrops falling
    sky('#ECEFF1') + P('M10 50c0-20 30-24 40-10 10-20 44-14 44 6 16-6 30 8 22 18H14c-8-2-10-8-4-14zM140 30c4-16 30-16 36 0 14-4 26 8 18 18h-56c-8-8-6-18 2-18z', '#B0BEC5', 3)
      + Array.from({ length: 16 }, (_, k) => Lc(`M${(k * 47) % 230 + 6} ${86 + (k * 31) % 90}l-4 10`, '#64B5F6', 3)).join('') + R(-4, 200, 248, 44, '#90A4AE', 0, 3)
      + E(170, 222, 46, 10, '#64B5F6', 2.5) + [[134, 204], [146, 196], [196, 198], [208, 206]].map(([x, y]) => C(x, y, 4, '#BBDEFB', 2)).join('')
      + g(62, 200, 1.2, C(0, -46, 11, '#FFE0BD', 2.5) + P('M-20-50c0-20 40-20 40 0l14 52h-68z', '#FFF176', 3) + P('M-12-40c0-16 24-16 24 0', 'none', 2) + Lc('M-6 2v12M8 2v12', '#283593', 6) + face(0, -44, 0.26))
      + g(116, 210, 1, C(0, -28, 9, '#FFE0BD', 2.5) + P('M-16-30c0-18 32-18 32 0l10 34h-52z', '#F48FB1', 3) + R(-9, 4, 8, 12, '#E53935', 2, 2) + R(2, 4, 8, 12, '#E53935', 2, 2) + face(0, -26, 0.22))
      + g(170, 196, 1, C(0, -28, 9, '#FFE0BD', 2.5) + P('M-16-30c0-18 32-18 32 0l10 34h-52z', '#81D4FA', 3) + Lc('M-10 4l-6 12M10 4l6 12', '#43A047', 6) + Lc('M-22-18l-10-14M22-18l10-14', '#FFE0BD', 5) + face(0, -26, 0.22, 'o'))),
  L('fr/disney-paris/landmark-pins.v1.svg', 'สายคล้องคอติดเข็มกลัดสะสม', 'A lanyard full of collectable pins', ['pin trading', 'แลกเข็มกลัด', 'collectable pins', 'เข็มกลัดสะสม', 'lanyard', 'สายคล้องคอ', 'enamel pins', 'souvenir pins', 'ของที่ระลึก', 'swap'], 'หาเข็มกลัดรูปจรวด', 'Find the rocket-shaped pin',
    // a wide ribbon lanyard looped in a U, covered in shiny enamel pins shaped like a star, a heart, a rocket, an ice cream, a rainbow and a balloon, a child's hand holding out one pin to swap
    sky('#E8EAF6') + Lc('M40 10c0 100 20 170 80 170s80-70 80-170', '#5C6BC0', 24) + Lc('M40 10c0 100 20 170 80 170s80-70 80-170', '#9FA8DA', 3)
      + g(52, 70, 1, P('M0-14l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z', '#FFCA28', 2.5))
      + g(60, 124, 1, P('M0 10c-14-8-16-20-8-24 4-2 8 0 8 4 0-4 4-6 8-4 8 4 6 16-8 24z', '#EF5350', 2.5))
      + g(92, 168, 1, P('M-4 12v-20c0-8 4-14 8-18 4 4 8 10 8 18v20z', '#ECEFF1', 2.5) + C(4, -2, 3, '#42A5F5', 1.5) + P('M-4 12l-6 6v-10zM12 12l6 6v-10z', '#EF5350', 2) + P('M0 12l4 8 4-8z', '#FF9800', 1.5), -30)
      + g(150, 168, 1, P('M-8-4h16l-8 20z', '#E2A04A', 2.5) + C(-4, -8, 6, '#F8BBD0', 2) + C(4, -10, 6, '#C5E1A5', 2))
      + g(180, 120, 1, P('M-14 6c0-20 28-20 28 0', 'none', 5) + Lc('M-14 6c0-20 28-20 28 0', '#EF5350', 4) + Lc('M-9 6c0-12 18-12 18 0', '#FFEB3B', 4) + Lc('M-4 6c0-6 8-6 8 0', '#42A5F5', 3))
      + g(186, 66, 1, E(0, -4, 10, 12, '#AB47BC', 2.5) + Lc('M0 8v10', INK, 1.5)) + face(120, 196, 0.3)
      + g(150, 222, 1, P('M-30 20c0-14 10-22 24-22h22c8 0 8 10 0 10h-10', '#FFE0BD', 3) + C(16, -6, 9, '#26C6DA', 2.5) + C(16, -6, 4, '#FFFFFF', 0))),
  L('fr/disney-paris/landmark-piggyback.v1.svg', 'ลูกหลับบนบ่าพ่อตอนเดินกลับบ้าน', 'Asleep on a grown-up\'s shoulders on the way home', ['tired kids', 'ลูกหลับ', 'piggyback', 'ขี่คอพ่อ', 'end of the day', 'หมดแรง', 'walk home', 'เดินกลับบ้าน', 'night time', 'sleepy'], 'หาเด็กที่หลับตาพริ้มบนบ่า', 'Find the child sleeping on the shoulders',
    // a dark blue night with stars and a crescent moon, a grown-up walking with a sleepy child slumped on their shoulders, eyes closed and cheek on the grown-up's head, a little glowing star wand drooping from one hand, a path of lamps
    sky('#283593') + [[30, 40], [80, 24], [196, 60], [214, 140], [40, 120]].map(([x, y]) => star(x, y, '#FFF59D')).join('') + P('M186 20a24 24 0 1 0 22 34 20 20 0 1 1-22-34z', '#FFF59D', 2.5)
      + R(-4, 206, 248, 38, '#3949AB', 0, 3) + [24, 214].map((x) => R(x - 2, 130, 4, 76, '#212121', 0, 2) + C(x, 126, 9, '#FFE082', 2.5)).join('')
      + g(120, 206, 1, P('M-22-90h44l8 64h-60z', '#26A69A', 3) + Lc('M-10-26v26M10-26v26', INK, 7) + C(0, -104, 16, '#FFE0BD', 3) + P('M-16-108c2-14 30-14 32 0-10-4-22-4-32 0z', '#5D4037', 2.5) + face(0, -102, 0.34)
        + P('M-18-124c0-16 36-16 36 0v8h-36z', '#FFB74D', 3) + C(-2, -140, 14, '#FFE0BD', 3) + P('M-16-146c4-14 26-14 30 0-8-6-22-6-30 0z', '#8D6E63', 2.5)
        + P('M-10-142q4 3 8 0M4-142q4 3 8 0', 'none', 2.5) + E(-14, -134, 5, 3, '#FF8FA3', 0) + E(10, -134, 5, 3, '#FF8FA3', 0)
        + Lc('M-18-118l-10 30M18-118l12 28', '#FFE0BD', 6) + Lc('M-22-90l-10 22', '#FFE0BD', 6) + Lc('M30-90l8 20', '#FFE082', 3) + star(40, -64, '#FFF176'))),
  L('fr/disney-paris/landmark-facepaint.v1.svg', 'เพ้นท์หน้าเป็นผีเสื้อ', 'Face painting: a butterfly on a cheek', ['face painting', 'เพ้นท์หน้า', 'butterfly face', 'หน้าผีเสื้อ', 'face paint', 'สีเพ้นท์หน้า', 'mirror', 'กระจก', 'sparkles', 'kids treat'], 'หาผีเสื้อสีม่วงบนหน้าผาก', 'Find the purple butterfly across the forehead',
    // a big happy child's face with a colourful butterfly painted across the forehead and eyes and dots of glitter on the cheeks, a hand mirror held up, a palette of round paint pots and a brush
    sky('#FFFDE7') + C(110, 116, 70, '#FFE0BD', 3) + P('M40 100c0-60 140-60 140 0-20-24-120-24-140 0z', '#6D4C41', 3)
      + P('M110 96c-16-26-50-30-56-10-4 16 20 30 56 10z', '#AB47BC', 2.5) + P('M110 96c16-26 50-30 56-10 4 16-20 30-56 10z', '#AB47BC', 2.5)
      + P('M110 98c-14 6-36 18-32 30 4 8 20 4 32-30zM110 98c14 6 36 18 32 30-4 8-20 4-32-30z', '#F48FB1', 2.5) + E(110, 104, 4, 16, INK, 0)
      + C(80, 82, 5, '#FFEB3B', 0) + C(140, 82, 5, '#FFEB3B', 0) + [[64, 140], [72, 150], [150, 140], [158, 150]].map(([x, y]) => C(x, y, 2.5, '#4FC3F7', 0)).join('') + face(110, 108, 0.7)
      + g(206, 120, 1, E(0, 0, 22, 28, '#B3E5FC', 3) + E(-6, -8, 6, 10, '#FFFFFF', 0) + R(-5, 26, 10, 40, '#F48FB1', 3, 3), 10)
      + g(66, 212, 1, R(-56, -14, 112, 26, '#FFFFFF', 10, 3) + ['#EF5350', '#FFCA28', '#66BB6A', '#42A5F5', '#AB47BC'].map((c, k) => C(-42 + k * 21, -1, 8, c, 2)).join('')) + Lc('M150 222l40-30', '#8D6E63', 5) + P('M190 192l8-8 4 4-8 8z', '#AB47BC', 2)),

  // ---------- Switzerland
  K('ch', 'food', 'nusstorte', 'ทาร์ตวอลนัตคาราเมลแห่งเอ็งกาดีน', 'Engadine nut tart with caramel and walnuts', ['nusstorte', 'นุสส์ทอร์เต', 'engadiner nusstorte', 'walnut tart', 'ทาร์ตวอลนัต', 'caramel filling', 'ไส้คาราเมล', 'engadin', 'เอ็งกาดีน', 'graubunden'],
    // a round golden pastry tart with a fork-pricked lid, one slice pulled out to show the thick dark caramel and walnut filling inside, walnut halves and a whole walnut beside it, a face on the tart
    E(120, 168, 104, 34, '#FFFFFF', 3) + P('M30 150c0-30 180-30 180 0v16c0 30-180 30-180 0z', '#E2A04A', 3) + E(120, 150, 90, 24, '#F2C27B', 3)
      + Array.from({ length: 10 }, (_, k) => C(70 + (k % 5) * 25, 142 + Math.floor(k / 5) * 12, 2, '#C17A2B', 0)).join('') + P('M120 150l70-10c4 6 6 10 0 16v14l-70-6z', '#FFFFFF', 3) + face(84, 152, 0.45)
      + g(170, 92, 1, P('M-40 30l60-50 30 26v20l-60 50-30-26z', '#E2A04A', 3) + P('M-40 30l60-50 30 26-60 50z', '#F2C27B', 3) + P('M-38 34l58-48', 'none', 2) + P('M-10 50v20l-30-26v-14z', '#7B4A1E', 3) + [[-30, 44], [-20, 54]].map(([x, y]) => E(x, y, 4, 3, '#C9A06A', 1.5)).join(''))
      + [[40, 200], [204, 204]].map(([x, y]) => E(x, y, 14, 11, '#C9A06A', 3) + Lc(`M${x - 8} ${y}c4-4 12-4 16 0M${x} ${y - 10}v20`, '#8D6E63', 2)).join('')),
  K('ch', 'culture', 'hornussen', 'ฮอร์นุสเซิน กีฬาตีลูกบินกับแผ่นไม้รับลูก', 'Hornussen, hitting the flying puck and catching it on boards', ['hornussen', 'ฮอร์นุสเซิน', 'swiss farmers sport', 'กีฬาชาวนาสวิส', 'wooden boards', 'แผ่นไม้รับลูก', 'flying puck', 'ลูกบินได้', 'long whippy stick', 'emmental'],
    // a player swinging a long whippy rod over a little iron ramp, a tiny black puck whizzing high across the sky with speed lines, far out in the field players holding up big wooden paddle boards on poles to stop it
    sky('#E3F2FD') + R(-4, 150, 248, 94, '#9CCC65', 0, 3) + P('M-4 150c50-14 100-10 150-6s70-4 94-8', '#7CB342', 3)
      + g(52, 200, 1, adult(0, 0, '#E53935', 1)) + Lc('M60 166c30-30 50-80 60-120', '#8D6E63', 3) + C(120, 46, 5, '#FFE082', 2) + P('M66 206l30-10v12z', '#607D8B', 3)
      + C(150, 64, 6, INK, 2) + Lc('M126 70l16-4M122 80l18-8M130 60l12 0', '#90A4AE', 3) + face(150, 52, 0.18)
      + [[178, 150, -10], [210, 170, 8], [160, 184, 0]].map(([x, y, r]) => g(x, y, 1, Lc('M0 20v-60', '#8D6E63', 4) + R(-14, -64, 28, 30, '#E2B57A', 4, 3) + Lc('M-8-50h16', '#C6974F', 2) + kid(10, 26, '#1E88E5', 0.8), r)).join('')),
  K('ch', 'food', 'magronen', 'มักกะโรนีชาวเขาสวิสกับซอสแอปเปิล', 'Älplermagronen, alpine macaroni with apple sauce', ['alplermagronen', 'แอลพเลอร์มักโรเนิน', 'alpine macaroni', 'มักกะโรนีชาวเขา', 'macaroni and potatoes', 'มันฝรั่ง', 'apple sauce', 'ซอสแอปเปิล', 'crispy onions', 'mountain hut meal'],
    // a wide brown pottery dish of short pasta tubes and potato cubes in melted cheese, crispy golden onion rings scattered on top, a little bowl of pale apple sauce beside it with a spoon, a face on the dish
    E(110, 160, 96, 46, '#8D6E63', 3) + E(110, 150, 84, 34, '#FFE082', 3)
      + Array.from({ length: 16 }, (_, k) => g(52 + (k * 29) % 116, 134 + (k * 11) % 32, 1, R(-7, -4, 14, 8, '#FFF3C4', 4, 1.5) + E(7, 0, 1.5, 3, '#E2B85F', 0), (k * 40) % 180)).join('')
      + [[70, 150], [130, 140], [150, 160], [96, 128]].map(([x, y]) => R(x - 6, y - 6, 12, 12, '#F6D08E', 2, 2)).join('')
      + [[80, 132], [120, 150], [146, 130], [100, 160]].map(([x, y]) => E(x, y, 8, 5, 'none', 3) + Lc(`M${x - 8} ${y}a8 5 0 1 0 16 0`, '#B5651D', 3)).join('') + face(110, 176, 0.42)
      + g(200, 196, 1, E(0, 0, 30, 14, '#ECEFF1', 3) + E(0, -4, 24, 8, '#F0E2A8', 2) + Lc('M8-4l18-36', '#B0BEC5', 4) + E(28, -44, 6, 8, '#B0BEC5', 2.5))),

  // ---------- Lucerne
  L('ch/lucerne/landmark-swissarena.v1.svg', 'เดินบนแผนที่ภาพถ่ายทางอากาศของสวิตเซอร์แลนด์', 'Walking across the giant aerial map of Switzerland', ['swiss arena', 'สวิสอารีนา', 'giant floor map', 'แผนที่บนพื้น', 'aerial photo map', 'ภาพถ่ายทางอากาศ', 'museum of transport', 'พิพิธภัณฑ์คมนาคม', 'walk across switzerland', 'magnifying glass'], 'หาเด็กที่ถือแว่นขยายส่องทะเลสาบ', 'Find the child looking at a lake through a magnifying glass',
    // a huge floor map seen from above at a slant: a green country shape with white snowy mountain patches, blue lakes and thin roads, kids in socks walking on it, one bending down with a big magnifying glass over a lake
    sky('#ECEFF1') + P('M10 120l220-30 10 140H0z', '#CFD8DC', 3)
      + P('M30 150c20-20 50-24 70-30 20-14 60-10 80-24 20 6 40 6 50 20-6 16-20 20-30 40-30 10-60 4-80 14-30 6-70 4-90-20z', '#A5D6A7', 3)
      + [[90, 160, 26, 8], [150, 150, 20, 7], [170, 132, 14, 6]].map(([x, y, rx, ry]) => E(x, y, rx, ry, '#FAFAFA', 2)).join('') + [[60, 160, 14, 6], [120, 138, 10, 4], [190, 120, 8, 4], [116, 170, 10, 4]].map(([x, y, rx, ry]) => E(x, y, rx, ry, '#4FC3F7', 2)).join('')
      + Lc('M40 156c40-10 80 0 110-12s50-6 74-24', '#FFFFFF', 2) + face(140, 152, 0.3)
      + kid(70, 206, '#EF5350', 1.2) + kid(206, 186, '#43A047', 1.1)
      + g(120, 196, 1, C(-6, -30, 10, '#FFE0BD', 2.5) + P('M-14-20h24l4 30h-30z', '#FFCA28', 2.5) + Lc('M8-12l16-6', '#FFE0BD', 5) + C(34, -24, 12, '#E1F5FE', 3) + Lc('M26-16l-6 6', INK, 4) + face(-6, -28, 0.24))),
  L('ch/lucerne/landmark-marblerun.v1.svg', 'รางลูกแก้วยักษ์ที่โรงงานแก้วแฮร์กิสวิล', 'The giant glass-marble run at the Hergiswil glassworks', ['marble run', 'รางลูกแก้ว', 'glass marbles', 'ลูกแก้ว', 'glasi hergiswil', 'โรงงานแก้วแฮร์กิสวิล', 'rolling marbles', 'ลูกแก้วกลิ้ง', 'chain reaction', 'kids play'], 'หาลูกแก้วลายเกลียวที่กำลังกลิ้งลงมา', 'Find the swirly marble rolling down',
    // a tall wooden wall with a long zigzag track of see-through tubes and chutes, a spiral funnel, a little bell and a seesaw, shiny swirled glass marbles rolling down it, a child dropping a marble in at the top
    sky('#FFF8E1') + R(20, 20, 200, 200, '#E2B57A', 6, 3) + Array.from({ length: 5 }, (_, k) => Lc(`M20 ${50 + k * 40}h200`, '#C6974F', 2)).join('')
      + Lc('M40 50l140 30-130 30 140 30-130 30', '#B3E5FC', 12) + Lc('M40 50l140 30-130 30 140 30-130 30', '#E1F5FE', 4) + Lc('M40 50l140 30-130 30 140 30-130 30', INK, 1)
      + E(70, 196, 26, 10, '#B3E5FC', 3) + P('M44 196l26 18 26-18', 'none', 2.5) + Lc('M70 214v6', INK, 3)
      + [[96, 62, '#EF5350'], [146, 98, '#42A5F5'], [104, 128, '#FFCA28'], [160, 160, '#66BB6A'], [74, 194, '#AB47BC']].map(([x, y, c]) => C(x, y, 8, c, 2.5) + P(`M${x - 5} ${y - 2}c3-5 8-5 10 0`, '#FFFFFF', 0) + Lc(`M${x - 4} ${y + 3}c4 2 6 0 7-4`, '#FFFFFF', 2)).join('')
      + g(196, 170, 1, P('M-12 0h24l-12-12z', '#5D4037', 2.5) + Lc('M-20-14l40 6', '#8D6E63', 4)) + face(160, 160, 0.18)
      + g(206, 56, 1, C(0, -16, 10, '#FFE0BD', 2.5) + P('M-10-6h20l4 26h-28z', '#26A69A', 2.5) + Lc('M-8 0l-14-6', '#FFE0BD', 5) + face(0, -14, 0.24))),
  L('ch/lucerne/landmark-schillerstein.v1.svg', 'หินชิลเลอร์ แท่งหินที่ยืนอยู่กลางทะเลสาบ', 'The Schillerstein rock standing in the lake', ['schillerstein', 'หินชิลเลอร์', 'rock in the lake', 'หินกลางทะเลสาบ', 'lake lucerne', 'ทะเลสาบลูเซิร์น', 'urnersee', 'swiss path', 'boat trip', 'golden plaque'], 'หาแผ่นป้ายสีทองบนหิน', 'Find the golden plate on the rock',
    // a tall natural pointed rock rising straight out of deep green-blue water near a wooded cliff, a blank golden plaque on its side, a white steamer gliding past behind, steep green mountains with a little snow
    sky('#E3F2FD') + peaks('#81C784', '#FFFFFF') + P('M150 60c30-10 60 0 94 0v100h-94z', '#558B2F', 3) + Array.from({ length: 5 }, (_, k) => E(170 + k * 14, 70 + (k % 2) * 10, 10, 14, '#33691E', 2)).join('')
      + water(130, '#26A69A') + g(56, 146, 0.8, P('M-40 0h80l-8 12h-64z', '#FFFFFF', 3) + R(-26, -14, 46, 14, '#FFFFFF', 2, 3) + R(-6, -26, 8, 12, '#FFCA28', 0, 2.5) + Lc('M-20-8h36', '#4FC3F7', 3))
      + P('M96 210c-6-50 0-120 18-170 6 0 10 6 14 10 10 50 14 110 8 160z', '#A1887F', 3) + Lc('M110 80c4 30 4 60 0 100', '#8D6E63', 2) + Lc('M126 70c2 40 4 80 0 120', '#BCAAA4', 2)
      + R(104, 110, 28, 36, '#FFC107', 3, 3) + Lc('M110 120h16M110 128h16M110 136h12', '#FFE082', 2) + face(118, 172, 0.36) + P('M86 210c20-6 40-6 60 0', 'none', 2.5)),
  L('ch/lucerne/landmark-fritschi.v1.svg', 'ขบวนแห่ฟริตชีโยนส้มให้เด็กๆ ในงานคาร์นิวัล', 'Oranges thrown to the children from the Fritschi carnival wagon', ['fritschi', 'ฟริตชี', 'lucerne carnival', 'คาร์นิวัลลูเซิร์น', 'fasnacht', 'ฟาสนัคท์', 'oranges for children', 'โยนส้ม', 'carnival wagon', 'confetti'], 'หาส้มลูกที่ลอยกลางอากาศ', 'Find the orange flying through the air',
    // a decorated carnival wagon with big painted wheels and garlands, a grown-up in a feathered hat and a funny mask throwing oranges, oranges arcing through the air full of confetti, kids holding out bags to catch them
    sky('#FFF3E0') + Array.from({ length: 18 }, (_, k) => R((k * 53) % 230 + 4, (k * 29) % 120 + 6, 6, 4, ['#EF5350', '#42A5F5', '#FFEB3B', '#66BB6A', '#AB47BC'][k % 5], 1, 0)).join('') + R(-4, 200, 248, 44, '#BDBDBD', 0, 3)
      + P('M20 120h120l-6 60H26z', '#7E57C2', 3) + Lc('M20 130c20 14 40 14 60 0s40 14 60 0', '#FFEB3B', 4) + [50, 116].map((x) => C(x, 190, 20, '#FFCA28', 3) + C(x, 190, 6, '#E53935', 2) + Lc(`M${x - 18} 190h36M${x} 172v36`, '#E53935', 2)).join('')
      + g(80, 120, 1, P('M-16-46h32l6 46h-44z', '#E53935', 3) + C(0, -58, 14, '#FFE0BD', 3) + E(0, -58, 12, 7, '#FFFFFF', 2.5) + C(-5, -59, 2.5, INK, 0) + C(5, -59, 2.5, INK, 0) + P('M-18-68c6-16 30-16 36 0z', '#43A047', 3) + P('M10-76c10-16 22-10 18 0', '#FFEB3B', 2.5) + Lc('M14-40l24-24', '#FFE0BD', 6))
      + [[132, 52], [168, 70], [194, 100]].map(([x, y]) => C(x, y, 10, '#FB8C00', 2.5) + Lc(`M${x} ${y - 10}l4-4`, '#43A047', 3)).join('') + face(168, 70, 0.2)
      + g(176, 216, 1, kid(0, 0, '#26A69A', 1.1) + P('M10-8h18l-2 16H12z', '#FFFFFF', 2) + Lc('M8-16l10-8', '#FFE0BD', 4)) + kid(214, 222, '#EC407A', 1)),
  L('ch/lucerne/landmark-guetsch.v1.svg', 'โรงแรมปราสาทกึทช์บนเนินป่าเหนือเมือง', 'Château Gütsch, the castle hotel on the wooded hill', ['chateau gutsch', 'ชาโตกึทช์', 'castle hotel', 'โรงแรมปราสาท', 'gutsch hill', 'เนินกึทช์', 'view over the old town', 'วิวเมืองเก่า', 'turrets', 'forest walk'], 'หายอดหอคอยแหลมที่มีธงเล็กๆ', 'Find the pointed turret with a little pennant',
    // a white fairy-tale building with many pointed grey-green turrets and red window shutters perched on a steep forested hill, a zigzag footpath up through the trees, the lake and tiny old-town roofs at the foot
    sky('#E8F5E9') + P('M-4 150c40-90 120-120 180-110s70 50 68 110z', '#66BB6A', 3) + Array.from({ length: 8 }, (_, k) => P(`M${20 + k * 26} ${150 - Math.sin(k / 7 * Math.PI) * 50}l12-24 12 24z`, '#2E7D32', 2)).join('')
      + Lc('M40 150l40-20-30-14 50-16', '#FFE082', 3)
      + g(150, 72, 1, R(-40, -20, 80, 46, '#FAFAFA', 0, 3) + [-30, 0, 30].map((x) => R(x - 6, -10, 12, 14, '#81D4FA', 2, 2) + Lc(`M${x - 10}-10v14M${x + 10}-10v14`, '#E53935', 3)).join('')
        + [[-44, -20], [40, -20], [-4, -40]].map(([x, y]) => R(x - 8, y, 16, 22, '#FAFAFA', 0, 2.5) + P(`M${x - 11} ${y}l11-26 11 26z`, '#78909C', 2.5)).join('') + Lc('M-4-66v-10', INK, 2) + P('M-4-76l12 4-12 4z', '#E53935', 2) + face(0, 12, 0.3))
      + water(170, '#4FC3F7') + Array.from({ length: 6 }, (_, k) => R(20 + k * 32, 152, 26, 18, ['#FFE0B2', '#FFCCBC', '#FFF9C4'][k % 3], 0, 2) + P(`M${18 + k * 32} 152l15-12 15 12z`, '#D84315', 2)).join('')),

  // ---------- Interlaken & the Jungfrau
  L('ch/interlaken/landmark-beatuscaves.v1.svg', 'ถ้ำเซนต์บีทุสริมทะเลสาบทูน', 'The St Beatus Caves above Lake Thun', ['st beatus caves', 'ถ้ำเซนต์บีทุส', 'beatushohlen', 'cave walk', 'เดินในถ้ำ', 'stalactites', 'หินย้อย', 'lake thun', 'ทะเลสาบทูน', 'underground stream'], 'หาหินย้อยที่ห้อยลงมาเหมือนน้ำแข็ง', 'Find the stalactites hanging down like icicles',
    // a huge arched mouth in a pale limestone cliff, a stream running out over rocks, inside a lit path with little lamps and stalactites and stalagmites in yellow and orange light, a kid in a jacket at the entrance, fir trees around
    sky('#E3F2FD') + R(-4, -4, 248, 210, '#D7CCC8', 0, 3) + Lc('M20 30c40 10 80 0 120 10M150 20c30 6 60 0 90 8', '#BCAAA4', 3)
      + P('M50 200c0-90 30-140 70-140s70 50 70 140z', '#4E342E', 3) + P('M68 200c4-60 24-104 52-104s48 44 52 104z', '#6D4C41', 0)
      + Array.from({ length: 6 }, (_, k) => P(`M${76 + k * 18} ${96 - Math.sin((k + 0.5) / 6 * Math.PI) * 20}l5 ${24 - (k % 2) * 8} 5-${24 - (k % 2) * 8}z`, '#EFEBE9', 2)).join('')
      + [[86, 200], [140, 200]].map(([x, y]) => P(`M${x - 6} ${y}l6-26 6 26z`, '#EFEBE9', 2)).join('') + [[96, 150], [120, 136], [146, 156]].map(([x, y]) => C(x, y, 9, '#FFF59D', 0) + C(x, y, 5, '#FFC107', 2)).join('')
      + P('M80 206c20-10 60-10 90 0 30 10 50 10 70 0v40H80z', '#4FC3F7', 3) + Lc('M100 220c20-4 30 4 50 0', '#E1F5FE', 3) + face(120, 116, 0.34)
      + [[24, 140], [214, 150]].map(([x, y]) => P(`M${x} ${y - 50}l18 50h-36z`, '#2E7D32', 2.5) + R(x - 3, y, 6, 12, '#5D4037', 0, 2)).join('') + kid(44, 224, '#EF5350', 1.1)),
  L('ch/interlaken/landmark-oberhofen.v1.svg', 'ปราสาทโอเบอร์โฮเฟินกับหอคอยกลางน้ำ', 'Oberhofen Castle and its little tower in the lake', ['oberhofen castle', 'ปราสาทโอเบอร์โฮเฟิน', 'tower in the lake', 'หอคอยกลางน้ำ', 'lake thun', 'ทะเลสาบทูน', 'castle garden', 'สวนปราสาท', 'pointed roof', 'lakeside castle'], 'หาหอคอยเล็กที่ยืนอยู่ในน้ำ', 'Find the little tower standing in the water',
    // a small square tower with a steep red pointed roof and a little round spire standing on stone footings right in the lake, joined by a short wooden walkway to a yellow-and-white castle with turrets on the shore, trees and snowy peaks behind
    sky('#E3F2FD') + peaks('#B0BEC5', '#FFFFFF') + R(-4, 120, 248, 30, '#8BC34A', 0, 3) + [20, 54, 214].map((x) => E(x, 112, 20, 24, '#43A047', 2.5)).join('')
      + R(30, 86, 74, 50, '#FFF59D', 0, 3) + P('M24 88l43-30 43 30z', '#D84315', 3) + R(84, 70, 22, 66, '#FFF9C4', 0, 3) + P('M80 72l15-26 15 26z', '#BF360C', 3) + [44, 70].map((x) => R(x, 104, 12, 16, '#81D4FA', 2, 2)).join('')
      + water(146, '#4FC3F7') + Lc('M106 134h50', '#8D6E63', 6) + Lc('M110 134v14M130 134v14M150 134v14', '#8D6E63', 3)
      + R(156, 166, 44, 20, '#9E9E9E', 0, 3) + R(158, 90, 40, 78, '#FAFAFA', 0, 3) + P('M152 92l26-58 26 58z', '#E53935', 3) + Lc('M178 34v-14', INK, 2.5) + C(178, 18, 4, '#FFC107', 2)
      + R(170, 110, 16, 20, '#81D4FA', 3, 2) + face(178, 146, 0.34) + Lc('M150 200c10-4 20 4 30 0s20 4 30 0', '#E1F5FE', 3)),
  L('ch/interlaken/landmark-meringue.v1.svg', 'เมอแรงก์กับครีมสดแห่งไมริงเงิน', 'Meringues with cream from Meiringen', ['meiringen meringue', 'เมอแรงก์ไมริงเงิน', 'meringue', 'เมอแรงก์', 'double cream', 'ครีมสด', 'meringue with cream', 'haslital', 'ฮัสลีทาล', 'sweet treat'], 'หาเบอร์รีสีแดงบนกองครีม', 'Find the red berry on the pile of cream',
    // two big crisp white meringue shells standing up like a sandwich with a fat swirl of whipped cream between them, a red raspberry on top, a few more meringue kisses and berries on a blue plate, faces on the meringues
    E(120, 182, 104, 30, '#90CAF9', 3) + E(120, 178, 86, 20, '#E3F2FD', 0)
      + g(80, 142, 1, P('M-30 30c-8-30 4-56 26-62 22 4 34 30 28 62z', '#FFFDF5', 3) + Lc('M-14 20c0-16 6-30 14-36M6 24c0-12-2-28-8-38', '#F5E6C8', 2) + face(-2, 6, 0.36), -10)
      + g(168, 142, 1, P('M-30 30c-8-30 4-56 26-62 22 4 34 30 28 62z', '#FFFDF5', 3) + Lc('M-14 20c0-16 6-30 14-36M6 24c0-12-2-28-8-38', '#F5E6C8', 2) + face(-2, 6, 0.36), 10)
      + P('M100 170c-10-30 0-70 24-74 24 4 30 44 18 74z', '#FFFFFF', 3) + Lc('M108 120c10 6 20 6 28 0M106 140c12 6 24 6 34 0', '#E0E0E0', 2.5)
      + C(124, 92, 10, '#E53935', 2.5) + [[120, 88], [126, 94], [128, 86]].map(([x, y]) => C(x, y, 1.5, '#FFCDD2', 0)).join('')
      + [[44, 186], [196, 188]].map(([x, y]) => P(`M${x - 12} ${y}c0-14 6-22 12-26 6 4 12 12 12 26z`, '#FFFDF5', 2.5)).join('') + [[66, 196], [176, 198]].map(([x, y]) => C(x, y, 6, '#C62828', 2)).join('')),
  L('ch/interlaken/landmark-hardermannli.v1.svg', 'ฮาร์เดอร์มันน์ลี ใบหน้าที่ซ่อนอยู่ในหน้าผา', 'The Hardermannli, the face hidden in the Harder cliff', ['hardermannli', 'ฮาร์เดอร์มันน์ลี', 'face in the cliff', 'หน้าคนในหน้าผา', 'harder mountain', 'ภูเขาฮาร์เดอร์', 'local legend', 'ตำนานท้องถิ่น', 'wooden masks parade', 'interlaken legend'], 'หาตากับจมูกที่ซ่อนในต้นไม้บนหน้าผา', 'Find the eyes and nose hiding in the trees on the cliff',
    // a steep forested mountainside where the bare rock and dark fir patches make a big friendly bearded face with two eyes and a nose, a kid in the meadow below pointing up with a carved wooden mask in the other hand
    sky('#E3F2FD') + P('M-4 220c10-120 60-200 124-200s114 80 124 200z', '#A5D6A7', 3)
      + P('M50 70c20-30 120-30 140 0 10 40 6 90-20 120-30 20-70 20-100 0-26-30-30-80-20-120z', '#BCAAA4', 3)
      + [[92, 96], [148, 96]].map(([x, y]) => E(x, y, 14, 10, '#33691E', 2.5) + C(x, y, 4, INK, 0)).join('') + P('M120 104l-10 34h20z', '#8D6E63', 2.5)
      + P('M100 146c10 10 30 10 40 0', 'none', 4) + E(80, 132, 8, 5, '#FF8FA3', 0) + E(160, 132, 8, 5, '#FF8FA3', 0) + Array.from({ length: 7 }, (_, k) => P(`M${78 + k * 14} ${166 + Math.sin(k / 6 * Math.PI) * 12}l7-16 7 16z`, '#2E7D32', 2)).join('')
      + Array.from({ length: 8 }, (_, k) => P(`M${10 + k * 30} ${200 - (k % 3) * 8}l10-22 10 22z`, '#2E7D32', 2)).join('') + R(-4, 206, 248, 38, '#8BC34A', 0, 3)
      + g(196, 228, 1.1, kid(0, 0, '#FF7043', 1) + Lc('M-6-18l-14-20', '#FFE0BD', 4) + g(12, -10, 1, E(0, 0, 8, 11, '#A1673F', 2) + C(-3, -2, 1.5, INK, 0) + C(3, -2, 1.5, INK, 0)))),
  L('ch/interlaken/landmark-violin.v1.svg', 'โรงเรียนทำไวโอลินที่ไบรเอินซ์', 'Making a violin at the Brienz violin-making school', ['violin making', 'ทำไวโอลิน', 'brienz', 'ไบรเอินซ์', 'violin maker', 'ช่างทำไวโอลิน', 'luthier', 'workshop', 'โรงงานไม้', 'wood shavings'], 'หาหัวไวโอลินที่ม้วนเป็นก้นหอย', 'Find the curly scroll at the top of the violin',
    // a workbench with a pale unvarnished violin body held in a wooden cradle, a finished shiny red-brown violin hanging on the wall, a curly scroll neck, little clamps, a tiny plane and golden curls of wood shavings
    sky('#FFF3E0') + R(-4, 160, 248, 84, '#A1673F', 0, 3) + Lc('M-4 172h248', '#8D5A2B', 3) + R(10, 20, 220, 6, '#8D6E63', 0, 2)
      + g(196, 80, 0.7, P('M0-60c-16 0-22 12-18 24 4 10-8 14-8 24s12 14 8 24c-4 12 2 24 18 24s22-12 18-24c-4-10 8-14 8-24s-12-14-8-24c4-12-2-24-18-24z', '#BF6A2A', 3) + Lc('M0-60v-30', '#3E2723', 6) + C(0, -96, 7, '#3E2723', 2) + Lc('M-6-24v8M6-24v8', INK, 2))
      + g(96, 104, 0.8, P('M0-56c-20 0-28 14-22 28 4 10-10 14-10 28s14 18 10 28c-6 14 2 28 22 28s28-14 22-28c-4-10 10-14 10-28s-14-18-10-28c6-14-2-28-22-28z', '#F2D49B', 3)
        + P('M-8-6c-4 4-4 10 0 14M8-6c4 4 4 10 0 14', 'none', 2.5) + face(0, 26, 0.45))
      + R(40, 148, 120, 12, '#6D4C41', 2, 3) + g(186, 150, 1, P('M-10 0c0-10 20-14 26-6 8 10 0 20-12 16', '#FBE3A8', 2.5) + C(-14, 6, 6, '#FBE3A8', 2))
      + [[40, 190], [70, 200], [200, 196]].map(([x, y]) => P(`M${x} ${y}c6-8 16-4 12 4-4 6-12 2-8-6`, '#FBE3A8', 2)).join('') + g(140, 196, 1, R(-20, -6, 40, 12, '#8D6E63', 2, 2.5) + R(-10, -16, 14, 10, '#455A64', 2, 2))),

  // ---------- Zermatt
  L('ch/zermatt/landmark-gornergorge.v1.svg', 'ทางเดินไม้ในหุบเขาแคบกอร์เนอร์', 'The wooden walkway through the Gorner Gorge', ['gorner gorge', 'หุบเขาแคบกอร์เนอร์', 'gornerschlucht', 'wooden walkway', 'ทางเดินไม้', 'rushing river', 'สายน้ำเชี่ยว', 'narrow canyon', 'zermatt walk', 'turquoise water'], 'หาราวไม้ที่ยึดติดกับผนังหิน', 'Find the wooden walkway hanging on the rock wall',
    // a deep narrow slot of grey-green rock walls with a bright turquoise torrent foaming at the bottom, a wooden plank walkway with a rail bolted along one wall, two kids in helmets walking it, a strip of blue sky above
    sky('#BBDEFB') + P('M-4-4h100c-20 60 10 120-10 248H-4z', '#78909C', 3) + P('M244-4H150c20 60-14 120 6 248h88z', '#607D8B', 3)
      + Lc('M30 30c10 30-6 60 4 90M200 40c-10 40 8 70-6 110', '#546E7A', 3) + Lc('M60 60l14 10M180 120l-12 8', '#90A4AE', 3)
      + P('M70 244c10-20 30-24 50-24s40 4 56 24z', '#26C6DA', 3) + Lc('M96 236c6-6 14-6 20 0M130 232c4-6 10-6 14 0', '#FFFFFF', 3) + Array.from({ length: 6 }, (_, k) => C(98 + k * 10, 236 - (k % 2) * 6, 3, '#FFFFFF', 0)).join('')
      + P('M0 150l120-40 10 6-130 46z', '#C6974F', 3) + Lc('M0 140l120-40M0 140v10M40 126v12M80 113v12M120 100v14', '#8D6E63', 3) + Lc('M20 158l-10 40M70 142l-10 40', '#6D4C41', 3)
      + kid(52, 136, '#EF5350', 0.95) + P('M44 112c0-8 16-8 16 0z', '#FFEB3B', 2) + kid(90, 122, '#42A5F5', 0.95) + P('M82 98c0-8 16-8 16 0z', '#FFEB3B', 2) + face(196, 190, 0.34)),
  L('ch/zermatt/landmark-stadel.v1.svg', 'ยุ้งไม้บนเสาหินกันหนูในหมู่บ้านเก่า', 'An old larch barn standing on mouse stones', ['stadel', 'ยุ้งข้าวชตาเดล', 'mouse stones', 'หินกันหนู', 'hinterdorf', 'หมู่บ้านฮินเทอร์ดอร์ฟ', 'larch barn', 'ยุ้งไม้ลาร์ช', 'old village', 'stone roof'], 'หาหนูที่ปีนขึ้นยุ้งไม่ได้', 'Find the mouse that can\'t climb into the barn',
    // a dark sun-blackened wooden barn of stacked logs with a roof of big grey stone slabs, standing on short wooden legs topped with round flat stone discs, a puzzled little mouse looking up from below one disc
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#9CCC65', 0, 3)
      + P('M30 98l90-60 90 60z', '#90A4AE', 3) + Array.from({ length: 4 }, (_, k) => Lc(`M${48 + k * 6} ${88 - k * 12}l${144 - k * 12} 0`, '#78909C', 2)).join('')
      + R(44, 96, 152, 70, '#5D4037', 0, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M44 ${108 + k * 11}h152`, '#3E2723', 2)).join('') + R(104, 116, 30, 24, '#4E342E', 2, 2.5) + face(120, 130, 0.32)
      + [64, 120, 176].map((x) => R(x - 6, 172, 12, 28, '#8D6E63', 0, 2.5) + E(x, 170, 22, 6, '#B0BEC5', 3)).join('') + R(40, 164, 160, 6, '#4E342E', 0, 2)
      + g(150, 212, 1, E(0, 0, 14, 10, '#BDBDBD', 2.5) + C(-10, -10, 6, '#BDBDBD', 2) + C(4, -12, 6, '#BDBDBD', 2) + C(-4, -2, 2, INK, 0) + C(4, -2, 2, INK, 0) + Lc('M14 4c10 0 14 6 10 12', INK, 2))
      + [[24, 200], [220, 196]].map(([x, y]) => C(x, y, 5, '#FFEB3B', 1.5)).join('')),
  L('ch/zermatt/landmark-leisee.v1.svg', 'แพไม้ลากเชือกบนทะเลสาบไลเซ', 'The rope-pulled wooden raft on Lake Leisee', ['leisee', 'ทะเลสาบไลเซ', 'wooden raft', 'แพไม้', 'rope raft', 'แพลากเชือก', 'sunnegga', 'ซุนเนกกา', 'mountain lake playground', 'family picnic'], 'หาเชือกที่ลากแพข้ามทะเลสาบ', 'Find the rope that pulls the raft across the lake',
    // a small round mountain lake with a square wooden raft, two kids hauling it across by a rope stretched from shore to shore, a picnic blanket and a wooden playground fort on the grassy bank, rocky peaks behind
    sky('#E3F2FD') + P('M-4 110l40-40 30 20 50-56 40 40 30-20 58 56z', '#B0BEC5', 3) + P('M110 40l14-6 6 12-10-2zM34 74l8-6 8 8z', '#FFFFFF', 0) + R(-4, 106, 248, 138, '#8BC34A', 0, 3)
      + E(120, 170, 104, 40, '#4FC3F7', 3) + Lc('M16 160h208', '#FFE082', 2.5) + R(96, 150, 50, 30, '#C6974F', 2, 3) + Lc('M100 160h42M100 170h42', '#8D6E63', 2)
      + kid(110, 154, '#EF5350', 0.85) + kid(132, 154, '#7E57C2', 0.85) + face(120, 196, 0.3)
      + g(40, 118, 1, R(-14, -4, 28, 30, '#A1673F', 0, 2.5) + P('M-18-4l18-14 18 14z', '#D84315', 2.5) + Lc('M-14 26v10M14 26v10', '#6D4C41', 3) + Lc('M14 10l14 26', '#FFCA28', 5))
      + g(196, 226, 1, R(-30, -10, 60, 20, '#EF9A9A', 2, 2.5) + Lc('M-20-10v20M0-10v20M20-10v20', '#FFFFFF', 3) + C(-12, -14, 6, '#E53935', 2))),
  L('ch/zermatt/landmark-cholera.v1.svg', 'พายโชเลราของวาเลส์ ไส้ต้นหอมแอปเปิลชีส', 'Cholera, the Valais pie of leeks, apples and cheese', ['cholera pie', 'พายโชเลรา', 'chollera', 'valais pie', 'พายวาเลส์', 'leek and apple', 'ต้นหอมแอปเปิล', 'potato and cheese', 'มันฝรั่งชีส', 'mountain bakery'], 'หาชิ้นแอปเปิลสีเหลืองในไส้พาย', 'Find the slice of apple in the pie filling',
    // a tall round golden pie with a crimped lid and a pastry leaf on top, a wedge lifted out showing the layers inside: green leeks, potato slices, apple slices and melted cheese, a leek and an apple beside it
    E(120, 182, 100, 26, '#FFFFFF', 3) + P('M30 120v46c0 22 160 22 160 0v-46z', '#E2A04A', 3) + E(110, 120, 80, 22, '#F2C27B', 3)
      + Array.from({ length: 14 }, (_, k) => C(36 + k * 11.4, 166 + Math.sin(k / 13 * Math.PI) * 10, 4, '#D48A2E', 0)).join('') + P('M96 112c0-10 18-14 26-8-6 8-18 10-26 8z', '#E2A04A', 2.5) + face(80, 132, 0.4)
      + P('M130 120l60-10v46l-60 18z', '#FFF3C4', 3) + Lc('M134 132l52-12', '#7CB342', 5) + Lc('M134 144l52-14', '#FFE082', 5) + Lc('M134 156l52-14', '#C5E1A5', 5) + Lc('M134 168l52-14', '#F3E5AB', 5)
      + g(36, 210, 1, Lc('M0 0l60-10', '#E8F5E9', 10) + Lc('M50-8l26-6', '#66BB6A', 10) + Lc('M70-12l10-10M72-10l12-4', '#43A047', 4))
      + g(208, 206, 1, C(0, 0, 16, '#FBC02D', 3) + Lc('M0-16l2-8', '#6D4C41', 3) + P('M2-20c6-8 14-6 14 0-6 4-12 2-14 0z', '#7CB342', 2))),
  L('ch/zermatt/landmark-arolla.v1.svg', 'ต้นสนหินอาโรลลาเก่าแก่กับนกกาแหวกเมล็ดสน', 'An old Arolla pine and the nutcracker bird', ['arolla pine', 'ต้นสนอาโรลลา', 'swiss stone pine', 'สนหินสวิส', 'arve', 'riffelalp forest', 'ป่าริฟเฟิลอัลพ์', 'spotted nutcracker', 'นกจุดลายแหวกเมล็ดสน', 'pine cones'], 'หานกลายจุดที่คาบเมล็ดสนอยู่', 'Find the spotted bird holding a pine seed',
    // a twisted old pine with a gnarled trunk growing out of grey boulders, dense tufts of dark needles and fat purple-brown cones, a brown bird speckled with white dots perched on a branch with a seed in its beak
    sky('#E1F5FE') + R(-4, 196, 248, 48, '#AED581', 0, 3) + [[40, 200, 34, 20], [150, 206, 40, 18]].map(([x, y, rx, ry]) => E(x, y, rx, ry, '#B0BEC5', 3)).join('')
      + P('M100 200c-4-40 20-60 10-100-6-20 10-40 20-50 4 20-6 30 0 50 10 30-10 60-6 100z', '#6D4C41', 3) + Lc('M112 120c20-10 40-8 56-24M108 150c-20-6-40 0-60-12', '#6D4C41', 7)
      + [[120, 50, 44, 26], [70, 96, 40, 24], [170, 80, 40, 24], [80, 136, 30, 18], [164, 120, 30, 18]].map(([x, y, rx, ry]) => E(x, y, rx, ry, '#2E7D32', 3) + Lc(`M${x - rx * 0.6} ${y}h${rx * 1.2}`, '#43A047', 2)).join('')
      + [[100, 66], [140, 46], [56, 106], [184, 90], [96, 144]].map(([x, y]) => E(x, y, 7, 10, '#7B4A6A', 2.5) + Lc(`M${x - 4} ${y - 3}h8M${x - 4} ${y + 3}h8`, '#4A2C40', 1.5)).join('')
      + g(168, 108, 1, E(0, 0, 18, 12, '#6D4C41', 3) + C(14, -10, 10, '#6D4C41', 3) + P('M22-10l14 2-14 4z', '#3E2723', 2) + E(36, -7, 3, 2, '#FFE082', 1.5) + P('M-16 2l-16 6 16 4z', '#3E2723', 2.5)
        + [[-8, -2], [0, 4], [6, -4], [-4, 6], [10, 4], [12, -14]].map(([x, y]) => C(x, y, 2, '#FFFFFF', 0)).join('') + C(16, -12, 2.5, INK, 0) + E(14, -4, 3.5, 2, '#FF8FA3', 0))),
];

export default { places: {}, items };
