// Wave 15, Fiji — the country layer and Nadi & the Fiji islands (Nadi, Denarau, the Mamanuca and Yasawa islands, the Coral Coast,
// Suva, Levuka, Savusavu, Taveuni). No kava, no sacred objects or ceremonies, no war clubs; a temple only as a building; every
// person a cute generic child; no writing but the stamps' names.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const G = (cc, key, th, en, hth, hen, kw, svg) => ({ id: `${cc}.guide.${key}`, cat: 'guide', file: `${cc}/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });
const I = (cat, slug, th, en, kw, svg) => ({ id: `fj.${cat}.${slug}`, cat, file: `fj/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `fj-islands.landmark.${slug}`, cat: 'landmark', file: `fj/islands/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const FJ = { k1: '#0277BD', k2: '#00579B', k3: '#E1F5FE' };
const FI = { k1: '#00897B', k2: '#EF6C00', k3: '#E0F2F1' };
const flagShape = 'M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z';
const pole = Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A');
const ring = (n, cx, cy, r, fn) => Array.from({ length: n }, (_, k) => { const a = (k / n) * Math.PI * 2; return fn(cx + Math.cos(a) * r, cy + Math.sin(a) * r, k, a); }).join('');
// a coconut palm: trunk from its foot (x, y) leaning by dx, fronds round the top
const palm = (x, y, h, dx = 10, s = 1) => Lc(`M${x} ${y}q${dx * 0.2} ${-h * 0.5} ${dx} ${-h}`, '#8D6E63', 7 * s) + g(x + dx, y - h, s, [-150, -110, -70, -30, 10, 200].map((a) => g(0, 0, 1, P('M0 0c10-10 30-12 44-2-16-2-30 2-44 2z', '#43A047', 2.5), a)).join('') + C(-3, 4, 5, '#8D6E63', 2) + C(4, 5, 5, '#8D6E63', 2));
const kid = (x, y, s, skin, shirt) => g(x, y, s, P('M-16 40c0-18 6-26 16-26s16 8 16 26z', shirt) + C(0, 0, 15, skin) + P('M-15 -2c0-14 8-18 15-18s15 4 15 18c-4-6-9-8-15-8s-11 2-15 8z', INK) + face(0, 2, 0.3));
const waves = (y, c = '#B3E5FC') => Lc(`M10 ${y}c14-8 28 8 42 0s28 8 42 0 28 8 42 0 28 8 42 0 28 8 42 0`, c, 4);

const items = [
  // ---------- Fiji, the country
  { id: 'fj.stamp', cat: 'stamp', file: 'fj/stamp.v1.svg', name: nm('ตราประทับฟิจิ', 'Fiji stamp'), kw: ['fiji', 'ฟิจิ', 'bula', 'บูลา'],
    // the tagimoucia, Fiji's own flower: red bells with white tips hanging from a green vine
    svg: countryStamp({ name: 'FIJI', ...FJ, emblem: Lc('M52 62c24-18 72-18 96 0', '#2E7D32', 4) + [[60, 58, -30], [140, 58, 30], [100, 46, 0]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 12, 5, '#43A047', 2), r)).join('')
      + [[72, 66, 0.8], [100, 58, 1], [128, 66, 0.8]].map(([x, y, s]) => g(x, y, s, P('M-7 0c-3 16-3 30 0 40h14c3-10 3-24 0-40z', '#D32F2F', 2.5) + P('M-12 40c-6 10 0 18 12 18s18-8 12-18c-4 4-8 4-12 0-4 4-8 4-12 0z', '#FFFFFF', 2.5))).join('') + face(100, 82, 0.3) }) },
  { id: 'fj.flag', ch: '🇫🇯', cat: 'flag', file: 'fj/flag.v1.svg', name: nm('ธงฟิจิ', 'Flag of Fiji'), kw: ['fiji', 'ฟิจิ', 'flag', 'ธง'],
    // sky blue with the Union Jack in the corner and the white shield with its red cross on the fly
    svg: free(pole + P(flagShape, '#68BFE5') + R(44, 40, 66, 52, '#012169', 0, 0) + Lc('M44 40l66 52M110 40l-66 52', '#FFFFFF', 9) + Lc('M44 40l66 52M110 40l-66 52', '#C8102E', 3) + Lc('M77 40v52M44 66h66', '#FFFFFF', 13) + Lc('M77 40v52M44 66h66', '#C8102E', 6)
      + P('M136 76h40v32c0 18-20 26-20 26s-20-8-20-26z', '#FFFFFF', 2) + R(136, 76, 40, 10, '#C8102E', 0, 0) + C(156, 81, 3.5, '#FFD54A', 0) + Lc('M156 86v46M137 104h38', '#C8102E', 3.5) + [[146, 96, '#FFD54A'], [166, 96, '#43A047'], [146, 118, '#43A047'], [166, 118, '#FFFFFF']].map(([x, y, c]) => C(x, y, 3.5, c, 1)).join('') + P(flagShape, 'none')) },
  { id: 'fj.hello', cat: 'hello', file: 'fj/hello.v1.svg', name: nm('บูลา สวัสดี', 'Bula, hello'), kw: ['bula', 'บูลา', 'hello', 'สวัสดี', 'fijian', 'ภาษาฟิจิ', 'bula shirt', 'เสื้อบูลา', 'hibiscus', 'ชบา'],
    // a curly-haired child in a bright flowery shirt with a red hibiscus behind one ear, waving a big "bula!"
    svg: free(P('M78 214c0-40 18-60 42-60s42 20 42 60z', '#29B6F6') + [[94, 182], [120, 196], [146, 180], [104, 206], [138, 204]].map(([x, y]) => ring(5, x, y, 4, (a, b) => C(a, b, 3, '#FFFFFF', 0)) + C(x, y, 2, '#FFCA28', 0)).join('') + P('M110 156l10 14 10-14z', '#FFFFFF', 3)
      + ring(10, 120, 104, 30, (x, y) => C(x, y, 11, INK, 0)) + C(120, 116, 30, '#8D5524') + P('M90 108c2-20 16-28 30-28s28 8 30 28c-8-8-18-12-30-12s-22 4-30 12z', INK)
      + ring(5, 150, 98, 7, (x, y) => C(x, y, 7, '#E53935', 2)) + C(150, 98, 3.5, '#FFEB3B', 1.5)
      + P('M156 160c10-16 16-34 14-50l14 2c2 18-4 40-16 54z', '#29B6F6') + C(178, 104, 11, '#8D5524') + face(120, 122, 0.55)) },
  G('fj', 'vula', 'วูลา', 'Vula', 'บูลา {name}! วูลาพาเที่ยวเกาะฟิจิเอง', 'Bula, {name}! Vula will show you the islands of Fiji', ['crested iguana', 'อิกัวนาหงอนฟิจิ', 'iguana', 'อิกัวนา', 'lizard', 'กิ้งก่า', 'yadua taba'],
    // a Fiji crested iguana: bright green with white stripes, a row of soft spikes on its head, golden eyes and a little throat flap
    P('M54 222c0-44 26-66 66-66s66 22 66 66z', '#43A047') + Lc('M66 196c34-12 74-12 108 0M60 216c38-12 82-12 120 0', '#E8F5E9', 6) + E(120, 118, 66, 54, '#66BB6A')
      + P('M72 84l4-20 10 14 6-22 10 18 8-22 10 20 8-22 10 22 6-22 10 18 4-20 8 22', '#2E7D32', 3) + Lc('M70 108c10 6 20 6 30 0M140 108c10 6 20 6 30 0', '#E8F5E9', 4) + P('M96 166c8 16 40 16 48 0', '#A5D6A7', 3)
      + [[105, 118], [135, 118]].map(([x, y]) => C(x, y, 9, '#FFD54F', 2.5)).join('') + C(110, 140, 2, INK, 0) + C(130, 140, 2, INK, 0) + face(120, 118, 1.05)),
  G('fj', 'kula', 'คูลา', 'Kula', 'คูลาบินนำทาง {name} ไปทุกเกาะเลย', 'Kula will fly ahead and lead {name} to every island', ['collared lory', 'นกแก้วคูลา', 'kula', 'lory', 'parrot', 'นกแก้ว', 'bird', 'นก'],
    // a collared lory: a round red bird with a deep purple cap, a green collar and wings, and a little orange hooked beak
    g(64, 150, 1, E(0, 0, 26, 46, '#43A047'), 20) + g(176, 150, 1, E(0, 0, 26, 46, '#43A047'), -20) + C(120, 132, 62, '#E53935') + P('M66 104c4-40 104-40 108 0-18-14-90-14-108 0z', '#4A148C', 3)
      + Lc('M66 170c30 18 78 18 108 0', '#43A047', 8) + E(120, 188, 30, 10, '#FFCA28', 2.5) + P('M108 138c0-12 24-12 24 0 0 10-12 18-12 18s-12-8-12-18z', '#FFB300', 3) + face(120, 124, 1.15, 'none')),
  I('animal', 'batfish', 'ปลาค้างคาวกลมแบนในทะเลฟิจิ', 'An orbicular batfish', ['batfish', 'ปลาค้างคาว', 'orbicular batfish', 'round fish', 'ปลาตัวกลม', 'snorkelling', 'ดำน้ำตื้น', 'lagoon', 'ลากูน', 'fish', 'ปลา'],
    // a tall round flat silver fish with long fins above and below like a dinner plate on its side, two soft dark bands across it, little bubbles rising
    P('M120 40c40 30 50 60 40 80 10 20 0 50-40 80-40-30-50-60-40-80-10-20 0-50 40-80z', '#FFCC80') + E(120, 120, 56, 58, '#CFD8DC') + Lc('M96 72c-8 30-8 66 0 96M146 70c8 30 8 70 0 100', '#78909C', 8)
      + P('M172 120l34-22v44z', '#B0BEC5') + Lc('M180 112l16-6M180 128l16 6', '#78909C', 2) + E(128, 150, 10, 6, '#FFE0B2', 2) + [[60, 70, 5], [50, 50, 4], [64, 34, 3]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2)).join('') + face(110, 116, 0.75)),
  I('food', 'kokoda', 'โคโคดา ปลาดิบในกะทิ', 'Kokoda, fish in coconut cream', ['kokoda', 'โคโคดา', 'raw fish', 'ปลาดิบ', 'coconut cream', 'กะทิ', 'lime', 'มะนาว', 'coconut shell', 'กะลามะพร้าว'],
    // cubes of white fish in coconut cream with red chilli and green onion, served in a half coconut shell, a lime wedge beside it
    P('M48 118c0 54 32 84 72 84s72-30 72-84z', '#8D6E63') + Array.from({ length: 9 }, (_, k) => Lc(`M${66 + k * 12} ${150 + (k % 3) * 12}l6 4`, '#5D4037', 2)).join('') + E(120, 118, 72, 14, '#FFFFFF') + E(120, 117, 62, 9, '#FFF8E1', 0)
      + [[92, 104, 10], [110, 98, -8], [130, 100, 14], [148, 106, -4], [120, 108, 4], [100, 112, 0], [140, 112, 6]].map(([x, y, r]) => g(x, y, 1, R(-8, -8, 16, 16, '#FFFDE7', 3, 2.5), r)).join('')
      + [[98, 96, '#E53935'], [126, 92, '#7CB342'], [144, 98, '#E53935'], [114, 104, '#7CB342'], [134, 108, '#E53935']].map(([x, y, c]) => C(x, y, 3, c, 1.5)).join('') + P('M180 200c0-20 30-30 40-10z', '#C0CA33', 3) + Lc('M186 198l14-10', '#F0F4C3', 2) + face(120, 158, 0.6)),
  I('food', 'palusami', 'ปาลูซามี ห่อใบเผือกใส่กะทิ', 'Palusami, taro leaves baked in coconut cream', ['palusami', 'ปาลูซามี', 'taro leaves', 'ใบเผือก', 'rourou', 'coconut cream', 'กะทิ', 'onion', 'fijian food', 'อาหารฟิจิ'],
    // a round bundle of soft green taro leaves opened on a plate, creamy coconut sauce spilling over the top with bits of onion
    E(120, 190, 98, 22, '#ECEFF1') + C(176, 156, 26, '#558B2F') + Lc('M160 150c10-6 24-6 32 0', '#33691E', 2) + C(116, 148, 50, '#7CB342') + Lc('M80 160c18-14 54-14 72 0M84 136c16 10 48 10 64 0', '#558B2F', 2.5)
      + P('M80 128c12-24 62-24 74 0-6 10-14 4-18 12-8-10-14 4-22-2-8 8-16-4-34-10z', '#FFFDE7', 3) + [[102, 118], [122, 112], [136, 120]].map(([x, y]) => E(x, y, 5, 3, '#E1BEE7', 1.5)).join('') + face(116, 154, 0.6)),
  I('food', 'vakalavalava', 'วาคาลาวาลาวา ขนมมันสำปะหลัง', 'Vakalavalava, sticky cassava pudding', ['vakalavalava', 'วาคาลาวาลาวา', 'cassava pudding', 'ขนมมันสำปะหลัง', 'cassava', 'มันสำปะหลัง', 'tavioka', 'banana leaf', 'ใบตอง', 'dessert', 'ของหวาน'],
    // golden squares of sticky cassava and coconut pudding on an opened banana leaf, a shiny caramel top on each
    P('M20 170c30-60 170-70 200-30-40 50-170 60-200 30z', '#81C784') + Lc('M28 168c60-20 120-30 186-30', '#4CAF50', 3)
      + [[74, 150], [112, 140], [150, 132], [94, 176], [134, 166]].map(([x, y]) => R(x - 18, y - 18, 36, 30, '#FFCA28', 5, 3) + R(x - 18, y - 18, 36, 8, '#F9A825', 4, 2) + Lc(`M${x - 10} ${y - 6}h8`, '#FFF8E1', 2)).join('') + face(112, 140, 0.4)),
  I('food', 'duruka', 'ดูรูกา หน่อดอกอ้อยในแกงกะทิ', 'Duruka, the Fijian asparagus', ['duruka', 'ดูรูกา', 'fijian asparagus', 'หน่อดอกอ้อย', 'cane shoots', 'coconut curry', 'แกงกะทิ', 'vegetable', 'ผัก'],
    // creamy white duruka pieces (a sugarcane-like flower bud) poking out of a bowl of yellow coconut curry, two whole ones in green sheaths beside it
    [[176, 194, -24], [196, 186, -10]].map(([x, y, r]) => g(x, y, 1, P('M-8 30c-4-24-2-50 8-64 10 14 12 40 8 64z', '#9CCC65', 2.5) + Lc('M0 -30v58', '#689F38', 2), r)).join('')
      + P('M44 128c0 50 32 74 72 74s72-24 72-74z', '#FFFFFF') + Lc('M52 150h128', '#4FC3F7', 4) + E(116, 128, 72, 14, '#FFE082')
      + [[86, 116, -16], [108, 108, -4], [130, 110, 10], [150, 118, 20]].map(([x, y, r]) => g(x, y, 1, R(-8, -24, 16, 34, '#FFF8E1', 8, 2.5) + Lc('M-4 -14l4 3 4-3M-4 -4l4 3 4-3', '#D7CCC8', 1.5), r)).join('') + face(116, 162, 0.6)),
  I('food', 'babakau', 'บาบาเกา แพนเค้กทอดฟิจิ', 'Babakau, Fijian fried pancakes', ['babakau', 'บาบาเกา', 'fried pancakes', 'แพนเค้กทอด', 'breakfast', 'อาหารเช้า', 'tea', 'ชา', 'butter', 'เนย'],
    // a stack of puffy golden fried pancakes with a pat of butter melting on top, a mug of milky tea beside them
    E(110, 196, 92, 20, '#ECEFF1') + [176, 158, 140].map((y) => E(110, y, 58, 16, '#E6A84C') + E(110, y - 4, 50, 10, '#F4C27A', 0)).join('') + R(98, 120, 24, 14, '#FFF59D', 3, 2.5) + Lc('M100 134c4 6 10 6 14 0', '#FFF59D', 3)
      + R(172, 150, 40, 46, '#FFFFFF', 8) + P('M212 160c14 0 14 24 0 24', 'none') + E(192, 152, 18, 5, '#D7A86E', 2) + Lc('M184 136c-6-8 6-12 0-20M198 136c-6-8 6-12 0-20', '#B0BEC5', 3) + face(110, 160, 0.5)),
  I('animal', 'orangedove', 'นกเขาสีส้มของฟิจิ', 'An orange dove', ['orange dove', 'นกเขาสีส้ม', 'flame dove', 'bird', 'นก', 'rainforest', 'ป่าดิบ', 'taveuni', 'birdwatching', 'ดูนก'],
    // a round bright-orange dove with an olive-green head, perched on a mossy branch with leaves
    Lc('M20 196c60-10 140-10 200 0', '#8D6E63', 10) + [[44, 188, -30], [196, 186, 30]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 16, 7, '#7CB342', 2.5), r)).join('') + P('M150 150c26 10 40 30 44 44l-24-6z', '#E65100')
      + E(120, 140, 52, 56, '#FF6D00') + P('M86 140c10-20 30-26 40-24-6 20-20 40-40 44z', '#FF9100', 3) + C(118, 82, 32, '#AFB42B') + C(104, 82, 8, '#DCE775', 2) + C(132, 82, 8, '#DCE775', 2) + P('M114 96l6 8 6-8z', '#FFF59D', 2.5)
      + Lc('M104 194v10M134 194v10', '#E57373', 4) + face(118, 82, 0.6, 'none')),
  I('animal', 'longhornbeetle', 'ด้วงหนวดยาวยักษ์ของฟิจิ', 'The giant Fijian longhorn beetle', ['giant longhorn beetle', 'ด้วงหนวดยาวยักษ์', 'beetle', 'ด้วง', 'insect', 'แมลง', 'rainforest', 'ป่าดิบ', 'big bug', 'แมลงตัวใหญ่'],
    // a big brown beetle with a shiny split back and enormous long feelers curling up and out, six little legs
    Lc('M108 66C86 30 44 22 22 54M132 66c22-36 64-44 86-12', '#5D4037', 5) + [[30, 44], [52, 30], [188, 30], [210, 44]].map(([x, y]) => C(x, y, 3, '#5D4037', 0)).join('')
      + [[-1, 110], [-1, 140], [-1, 170], [1, 110], [1, 140], [1, 170]].map(([s, y]) => Lc(`M${120 + s * 30} ${y}l${s * 26} ${y === 140 ? 0 : y < 140 ? -14 : 16}`, '#4E342E', 5)).join('')
      + E(120, 150, 42, 62, '#8D6E63') + Lc('M120 98v112', '#4E342E', 3) + E(104, 130, 8, 16, '#BCAAA4', 0) + E(120, 88, 32, 18, '#6D4C41') + C(120, 70, 20, '#6D4C41') + face(120, 152, 0.65)),
  I('culture', 'lali', 'กลองลาลี กลองไม้ซุงของฟิจิ', 'A lali, the Fijian log drum', ['lali', 'ลาลี', 'log drum', 'กลองไม้ซุง', 'slit drum', 'drum', 'กลอง', 'drumbeat', 'เสียงกลอง', 'village', 'หมู่บ้าน'],
    // a big hollowed log drum with a long slit along its top, two wooden beaters striking it and sound rings bouncing up
    E(120, 200, 100, 14, '#C8E6C9') + R(26, 120, 188, 66, '#A1673F', 30) + R(56, 128, 128, 12, '#4E342E', 6) + Lc('M44 130c-6 16-6 32 0 48M196 130c6 16 6 32 0 48', '#8D5524', 3)
      + Lc('M78 108l40-64M162 108l-40-64', '#D7A86E', 8) + C(80, 112, 7, '#8D6E63', 2.5) + C(160, 112, 7, '#8D6E63', 2.5) + Lc('M36 82c-8-12-8-26 0-38M204 82c8-12 8-26 0-38M22 92c-12-18-12-40 0-58M218 92c12-18 12-40 0-58', '#FFCA28', 4) + face(120, 160, 0.6)),
  I('culture', 'masi', 'ผ้ามาซี ผ้าเปลือกไม้ลายฟิจิ', 'Masi, Fijian bark cloth', ['masi', 'มาซี', 'tapa', 'ทาปา', 'bark cloth', 'ผ้าเปลือกไม้', 'pattern', 'ลวดลาย', 'craft', 'งานฝีมือ', 'souvenir', 'ของฝาก'],
    // a sheet of creamy bark cloth hanging from a pole, printed with brown and black bands of triangles, zigzags and diamonds
    Lc('M24 44h192', '#8D6E63', 8) + P('M40 46h160v148c-20 8-40-6-60 2s-40-8-60 0-30-4-40 0z', '#F5E6C8') + Lc('M44 70h152M44 152h152', '#5D4037', 6)
      + Array.from({ length: 8 }, (_, k) => P(`M${46 + k * 19} 82l9 16 9-16z`, k % 2 ? INK : '#8D5524', 0)).join('') + Lc('M46 138l10-12 10 12 10-12 10 12 10-12 10 12 10-12 10 12 10-12 10 12 10-12 10 12 10-12 10 12', INK, 3)
      + Array.from({ length: 6 }, (_, k) => P(`M${58 + k * 25} 166l8 8-8 8-8-8z`, '#8D5524', 0)).join('') + face(120, 114, 0.5)),
  I('culture', 'bure', 'บูเร บ้านหลังคามุงจากของฟิจิ', 'A bure, the Fijian thatched house', ['bure', 'บูเร', 'thatched house', 'บ้านหลังคามุงจาก', 'village', 'หมู่บ้าน', 'navala', 'นาวาลา', 'traditional house', 'บ้านดั้งเดิม'],
    // a tall steep-roofed thatched house with woven reed walls, a dark ridge beam with rounded ends, a little doorway and grass round it
    E(120, 206, 106, 14, '#9CCC65') + R(56, 136, 128, 66, '#D7B98E') + Array.from({ length: 6 }, (_, k) => Lc(`M60 ${146 + k * 10}h120`, '#BCA07A', 2)).join('') + R(104, 156, 32, 46, '#5D4037', 4)
      + P('M36 142L120 44l84 98z', '#C8A165') + Array.from({ length: 7 }, (_, k) => Lc(`M${52 + k * 22} 138l${(120 - (52 + k * 22)) * 0.6} -60`, '#A1887F', 2)).join('') + Lc('M98 46h44', INK, 8) + C(94, 46, 7, INK) + C(146, 46, 7, INK) + face(120, 116, 0.45)),
  I('culture', 'ibe', 'อีเบ เสื่อใบเตยทะเลขอบไหมพรม', 'An ibe, a woven pandanus mat', ['ibe', 'อีเบ', 'pandanus mat', 'เสื่อใบเตยทะเล', 'woven mat', 'เสื่อสาน', 'wool fringe', 'ไหมพรม', 'craft', 'งานฝีมือ'],
    // a pale woven mat half unrolled, its chequered weave edged with a fringe of bright pink, red, yellow and green wool pompoms
    P('M26 168l130-36 58 40-130 36z', '#E8D3A0') + Array.from({ length: 6 }, (_, k) => Lc(`M${40 + k * 22} ${164 - k * 6}l58 40`, '#C8A165', 2)).join('') + Array.from({ length: 3 }, (_, k) => Lc(`M${40 + k * 18} ${176 + k * 12}l130-36`, '#C8A165', 2)).join('')
      + R(126, 96, 40, 62, '#E0C88E', 0, 3) + g(146, 96, 1, E(0, 0, 20, 10, '#D7B98E') + E(0, 0, 10, 5, '#BCA07A', 2)) + Array.from({ length: 9 }, (_, k) => C(32 + k * 16, 174 + k * 4.4, 6, ['#EC407A', '#E53935', '#FFCA28', '#43A047'][k % 4], 2)).join('') + face(146, 132, 0.4)),
  I('transport', 'drua', 'เรือดรูอา เรือใบสองลำตัวของฟิจิ', 'A drua, the Fijian double canoe', ['drua', 'ดรูอา', 'double canoe', 'เรือแคนูสองลำตัว', 'sailing canoe', 'เรือใบ', 'crab claw sail', 'ใบเรือก้ามปู', 'voyaging', 'ล่องทะเล'],
    // a wooden double-hulled canoe with a deck and a tiny shelter between the hulls, a great curved crab-claw sail, sailing over blue waves
    E(120, 196, 108, 22, '#4FC3F7') + P('M20 178h116c-6 14-22 20-58 20s-52-6-58-20z', '#8D6E63') + P('M104 168h116c-6 12-22 16-58 16s-52-4-58-16z', '#A1673F') + R(54, 158, 132, 10, '#D7A86E', 2, 3) + P('M140 158v-14l12-8 12 8v14z', '#C8A165', 2.5)
      + Lc('M118 158V40', '#6D4C41', 4) + P('M118 150C84 112 74 72 92 28c12 32 42 52 84 60-22 20-42 42-58 62z', '#FFF3E0') + Lc('M100 46c10 22 30 36 58 44M96 70c10 20 26 34 46 44', '#E0C9A6', 2) + P('M118 40l20 6-20 6z', '#E53935', 2) + waves(208, '#E1F5FE') + face(122, 96, 0.55)),
  I('transport', 'bus', 'รถบัสฟิจิหน้าต่างเปิดโล่ง', 'An open-sided Fijian bus', ['fiji bus', 'รถบัสฟิจิ', 'open-sided bus', 'รถบัสไม่มีกระจก', 'local bus', 'รถเมล์', 'roll-down blinds', 'nadi', 'suva', 'ride'],
    // a long colourful bus with no glass in its windows, striped canvas blinds rolled up above them, kids' smiling faces at the openings
    R(18, 88, 204, 98, '#FDD835', 14) + R(14, 78, 212, 16, '#1E88E5', 8) + Lc('M22 170h196', '#1E88E5', 6) + [40, 82, 124].map((x) => R(x, 104, 34, 40, '#FFF8E1', 4, 3) + Lc(`M${x + 2} 104h30`, '#E53935', 7)).join('') + R(170, 100, 40, 58, '#B3E5FC', 6, 3)
      + [[57, 128, '#8D5524'], [99, 130, '#C68642'], [141, 128, '#8D5524']].map(([x, y, c]) => C(x, y, 11, c, 2.5) + face(x, y + 1, 0.22)).join('') + [[58, 190], [178, 190]].map(([x, y]) => C(x, y, 17, INK) + C(x, y, 7, '#B0BEC5', 0)).join('') + C(214, 172, 6, '#FFF59D', 2.5)),
  I('transport', 'carrier', 'รถคาร์ริเออร์ กระบะรับส่งของฟิจิ', 'A Fijian carrier, the pickup taxi', ['carrier', 'คาร์ริเออร์', 'pickup taxi', 'รถกระบะรับส่ง', 'shared ride', 'รถสองแถว', 'canopy', 'village road', 'ถนนหมู่บ้าน', 'ride'],
    // a little pickup with benches in its open back under a striped canvas canopy, kids sitting in a row, a round-eyed blue cab in front
    R(20, 76, 132, 10, '#E53935', 4) + Array.from({ length: 5 }, (_, k) => R(24 + k * 25, 76, 12, 10, '#FFFFFF', 0, 0)).join('') + Lc('M26 86v66M146 86v66', '#90A4AE', 4)
      + [[50, 128], [86, 126], [122, 128]].map(([x, y], k) => C(x, y, 12, ['#8D5524', '#C68642', '#8D5524'][k], 2.5) + face(x, y + 1, 0.24) + R(x - 12, y + 12, 24, 16, ['#43A047', '#FF7043', '#AB47BC'][k], 4, 2.5)).join('')
      + R(16, 150, 140, 34, '#1E88E5', 6) + P('M156 184v-74h40c14 0 24 14 26 30l2 44z', '#1E88E5') + P('M166 118h30c8 0 14 8 16 20h-46z', '#B3E5FC', 3) + [[52, 190], [190, 190]].map(([x, y]) => C(x, y, 16, INK) + C(x, y, 6, '#B0BEC5', 0)).join('') + face(196, 160, 0.4)),
  // ---------- Nadi and the Fiji islands
  { id: 'fj-islands.stamp', cat: 'stamp', file: 'fj/islands/stamp.v1.svg', name: nm('ตราประทับนาดีและหมู่เกาะฟิจิ', 'Nadi and the Fiji islands stamp'), kw: ['nadi', 'เมืองนาดี', 'mamanuca', 'มามานูกา', 'yasawa', 'ยาซาวา', 'fiji islands', 'หมู่เกาะฟิจิ'],
    // a tiny sandy island with two coconut palms on a turquoise lagoon and the sun behind
    svg: cityStamp('fji-st', { name: 'FIJI ISLES', sub: 'NADI · MAMANUCA', ...FI, emblem: C(124, 70, 12, '#FFD54F', 2.5) + E(100, 126, 46, 12, '#4DD0E1', 2.5) + E(100, 120, 34, 9, '#FFE082', 2.5) + palm(88, 120, 44, -8, 0.6) + palm(110, 120, 52, 10, 0.65) }) },
  { id: 'fj-islands.day.mamanuca', cat: 'day', file: 'fj/islands/day-mamanuca.v1.svg', name: nm('หมู่เกาะมามานูกากลางทะเลสีฟ้า', 'The Mamanuca islands on a turquoise sea'), kw: ['mamanuca', 'มามานูกา', 'island hopping', 'ทัวร์เกาะ', 'lagoon', 'ลากูน', 'yasawa', 'ยาซาวา', 'denarau', 'เดนาเรา', 'beach', 'ชายหาด'],
    // a blue sky over a turquoise sea dotted with little islands: a green hilly one, two flat ones with palms and white beaches, a canoe sail in between
    svg: scene('fji-d1', '#B3E5FC', C(190, 50, 18, '#FFF59D', 0) + P('M-4 100h248v150H-4z', '#26C6DA') + E(60, 128, 56, 14, '#80DEEA', 0) + E(176, 170, 54, 14, '#80DEEA', 0)
      + P('M20 126c10-30 30-46 44-46s30 18 40 46z', '#66BB6A') + Lc('M30 126h76', '#FFF3D6', 6) + E(176, 164, 32, 8, '#FFF3D6') + palm(166, 162, 34, -6, 0.55) + palm(184, 162, 40, 8, 0.6) + E(120, 210, 24, 6, '#FFF3D6') + palm(120, 208, 30, 6, 0.5)
      + P('M92 166h30c-4 6-10 8-15 8s-11-2-15-8z', '#8D6E63', 2.5) + P('M106 166c-10-14-10-28-4-40 6 12 16 20 30 24-8 6-18 10-26 16z', '#FFF3E0', 2.5) + waves(196, '#E0F7FA')) },
  { id: 'fj-islands.day.coralcoast', cat: 'day', file: 'fj/islands/day-coralcoast.v1.svg', name: nm('ชายหาดคอรัลโคสต์ยามเย็น', 'The Coral Coast at sunset'), kw: ['coral coast', 'คอรัลโคสต์', 'natadola', 'นาตาโดลา', 'sunset', 'พระอาทิตย์ตก', 'beach', 'ชายหาด', 'sandcastle', 'ก่อปราสาททราย', 'palm trees', 'ต้นมะพร้าว', 'sigatoka'],
    // a long white beach curving round a calm bay at sunset, a line of surf on the reef far out, leaning palms and a child with a bucket and spade
    svg: scene('fji-d2', '#FFCC80', C(150, 92, 26, '#FFF59D', 0) + Lc('M-4 60c60 10 120-6 248 6', '#F8BBD0', 8) + P('M-4 100h248v60H-4z', '#4FC3F7') + Lc('M-4 112c40-6 80 6 120 0s80-6 128 0', '#FFFFFF', 4) + Lc('M60 130h60M150 140h50', '#B3E5FC', 3)
      + P('M-4 160c60-14 160-20 248-4v94H-4z', '#FFF3D6') + palm(30, 220, 90, 26, 0.9) + palm(206, 216, 70, -20, 0.8) + kid(120, 176, 0.9, '#8D5524', '#FF7043') + P('M144 206h16l-3 14h-10z', '#E53935', 2.5) + P('M90 210l-6-20 4-2 6 20z', '#FFCA28', 2)) },
  L('sleepinggiant', 'สวนยักษ์หลับ', 'The Garden of the Sleeping Giant', ['garden of the sleeping giant', 'สวนยักษ์หลับ', 'sleeping giant', 'ยักษ์หลับ', 'sabeto mountains', 'lily pond', 'สระบัว', 'garden walk', 'สวน'], 'หาภูเขาที่นอนหลับเหมือนยักษ์', 'Find the mountain that looks like a giant fast asleep',
    // a long green mountain ridge shaped like a giant lying on his back (forehead, nose, chin, tummy) with a closed sleepy eye, a lily pond in the garden below
    P('M8 170v-20c0-34 20-58 48-62 12-12 34-10 42 6 4 10 2 18-4 26 32-10 74-12 106-2 22 8 34 18 32 52z', '#66BB6A') + P('M30 112l-10 6 8 6', '#66BB6A', 4) + Lc('M50 104c6 5 14 5 18 0', INK, 3.5) + E(62, 116, 7, 4, '#FF8FA3', 0) + Lc('M44 132c6 3 12 3 16 0', INK, 3) + Lc('M84 150c40-4 90-8 140-2', '#43A047', 3)
      + [[44, 70], [150, 74], [200, 96]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 0) + C(x + 8, y - 4, 6, '#FFFFFF', 0)).join('') + E(120, 196, 104, 24, '#4FC3F7') + [[70, 192], [120, 202], [168, 190], [96, 208]].map(([x, y]) => P(`M${x} ${y}m-14 0a14 6 0 1 0 28 0l-14-2z`, '#43A047', 2)).join('')
      + [[86, 186], [150, 200]].map(([x, y]) => ring(5, x, y, 4, (a, b) => C(a, b, 4, '#F48FB1', 1.5))).join('')),
  L('sivatemple', 'วัดศรีศิวะสุพรหมันยะที่นาดี', 'The Sri Siva Subramaniya temple in Nadi', ['sri siva subramaniya', 'ศรีศิวะสุพรหมันยะ', 'hindu temple', 'วัดฮินดู', 'nadi temple', 'colourful tower', 'หอสีสด', 'indo-fijian', 'อินโดฟิจิ'], 'หาหอสูงที่ทาสีชมพู ฟ้า เหลืองสลับกัน', 'Find the tall tower painted pink, blue and yellow in layers',
    // a tall stepped temple gateway tower in bright pastel tiers topped with a barrel roof and little golden pots, a white hall with pillars in front (the building only)
    R(30, 164, 180, 40, '#FFFFFF') + Array.from({ length: 7 }, (_, k) => R(38 + k * 26, 168, 10, 36, '#F8BBD0', 0, 2.5)).join('') + R(24, 156, 192, 12, '#4DB6AC', 2) + R(26, 204, 188, 8, '#BDBDBD', 0, 3)
      + Array.from({ length: 5 }, (_, k) => R(80 + k * 6, 140 - k * 20, 80 - k * 12, 20, ['#F48FB1', '#4FC3F7', '#FFD54F', '#81C784', '#CE93D8'][k], 0, 3) + Array.from({ length: 3 }, (_, j) => R(88 + k * 6 + j * ((64 - k * 12) / 2) - 4, 144 - k * 20, 8, 12, '#FFFFFF', 3, 1.5)).join('')).join('')
      + P('M108 40c0-14 24-14 24 0v6h-24z', '#FF8A65', 3) + [112, 120, 128].map((x) => C(x, 34, 4, '#FFC107', 2)).join('') + R(108, 176, 24, 28, '#8D6E63', 10, 3)),
  L('cloudbreak', 'คลื่นคลาวด์เบรก', 'The giant Cloudbreak wave', ['cloudbreak', 'คลาวด์เบรก', 'surfing', 'โต้คลื่น', 'big wave', 'คลื่นยักษ์', 'barrel', 'tavarua', 'ตาวารัว', 'reef break'], 'หาคลื่นยักษ์ที่ม้วนเป็นอุโมงค์', 'Find the giant wave curling over like a tunnel',
    // an enormous turquoise wave curling into a tunnel with a white frothy lip, a tiny surfer child zooming along inside it
    P('M10 210c10-80 60-150 140-160 40-4 70 16 80 44-24-20-56-16-70 6 20-4 34 10 30 30-30-30-80-10-90 40-6 30 0 40 4 40z', '#29B6F6') + P('M104 200c0-50 30-90 70-90 10 0 20 4 26 12-30-6-62 20-62 78z', '#B3E5FC', 0)
      + P('M150 50c40-4 70 16 80 44-10-6-20-8-30-6 0-10-10-18-20-16-2-12-14-20-30-22z', '#FFFFFF') + [[200, 110], [214, 96], [222, 120]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 2)).join('') + Lc('M10 214h220', '#E1F5FE', 6)
      + g(150, 168, 1, P('M-26 10c14-6 40-6 54 0-14 6-40 6-54 0z', '#FFCA28', 2.5) + P('M-6 6l4-18h10l4 18z', '#FF7043', 2) + C(2, -18, 7, '#C68642', 2) + face(2, -17, 0.14), -10) + face(60, 160, 0.55)),
  L('monuriki', 'เกาะโมนูริกิ', 'Monuriki island', ['monuriki', 'โมนูริกิ', 'desert island', 'เกาะร้าง', 'mamanuca', 'steep peak', 'ยอดเขาสูงชัน', 'reef', 'แนวปะการัง', 'island day trip'], 'หาเกาะเล็กที่มียอดเขาแหลมสูง', 'Find the little island with a tall pointy peak',
    // a small island with a steep green rocky peak, a white beach at its foot ringed by a pale turquoise reef, a few palms
    E(120, 190, 108, 28, '#80DEEA') + E(120, 184, 84, 18, '#FFF3D6') + P('M50 182c10-40 30-60 46-110 10-20 26-24 34 0 10 30 26 60 54 110z', '#558B2F') + P('M96 72c8-20 26-24 34 0-8 4-20 4-34 0z', '#8D6E63', 3) + Lc('M110 100c-6 20-6 40 4 60M140 110c4 20 0 40-8 60', '#33691E', 3)
      + palm(52, 186, 34, -10, 0.55) + palm(190, 186, 40, 10, 0.6) + face(120, 150, 0.5)),
  L('beachcomber', 'เกาะทรายกลมจิ๋ว', 'A tiny round sand island', ['tiny island', 'เกาะจิ๋ว', 'round island', 'เกาะกลม', 'beachcomber island', 'บีชคอมเบอร์', 'walk around the island', 'เดินรอบเกาะ', 'palm trees', 'mamanuca'], 'หาเกาะกลมเล็กนิดเดียวที่เดินรอบได้ในไม่กี่นาที', 'Find the tiny round island you can walk all the way round',
    // a perfectly round little island seen from above-ish: a ring of white sand, a clump of palms and a thatched roof in the middle, a ring of reef round it
    E(120, 150, 110, 64, '#4DD0E1') + E(120, 148, 92, 50, '#80DEEA', 0) + E(120, 146, 76, 40, '#FFF3D6') + E(120, 138, 54, 26, '#7CB342') + P('M98 140l22-20 22 20z', '#C8A165', 3)
      + palm(86, 140, 50, -6, 0.75) + palm(150, 140, 58, 6, 0.8) + palm(120, 132, 70, 2, 0.75) + [[60, 168], [178, 170]].map(([x, y]) => P(`M${x - 8} ${y}l8-4 8 4-8 4z`, '#FFCA28', 2)).join('') + face(120, 172, 0.45)),
  L('grandpacific', 'โรงแรมแกรนด์แปซิฟิกที่ซูวา', 'The Grand Pacific Hotel in Suva', ['grand pacific hotel', 'โรงแรมแกรนด์แปซิฟิก', 'suva', 'ซูวา', 'colonial building', 'ตึกเก่า', 'verandas', 'ระเบียง', 'seafront', 'ริมทะเล'], 'หาโรงแรมสีขาวที่มีระเบียงยาวริมทะเล', 'Find the white hotel with long verandas by the sea',
    // a long two-storey white hotel with rows of arched verandas, a portico in the middle and a red roof, palms on each side and the sea wall in front
    R(30, 92, 180, 104, '#FFFFFF') + P('M24 94l20-20h152l20 20z', '#E57373', 3) + R(96, 70, 48, 26, '#FFFFFF') + P('M92 72l28-18 28 18z', '#E57373', 3)
      + [118, 160].map((y) => Array.from({ length: 8 }, (_, k) => P(`M${40 + k * 21} ${y}v-18c0-8 14-8 14 0v18z`, '#B3E5FC', 2)).join('') + Lc(`M30 ${y + 2}h180`, '#BDBDBD', 3)).join('') + R(108, 170, 24, 26, '#8D6E63', 3, 2.5)
      + palm(18, 206, 80, 6, 0.75) + palm(222, 206, 76, -6, 0.75) + R(10, 196, 220, 12, '#BDBDBD', 2) + Lc('M10 218c20-6 40 6 60 0s40 6 60 0 40 6 60 0 30 6 40 0', '#4FC3F7', 4) + face(120, 136, 0.4)),
  L('turtlepot', 'หม้อดินรูปเต่าของฟิจิ', 'A Fijian clay pot shaped like a turtle', ['fijian pottery', 'เครื่องปั้นดินเผาฟิจิ', 'turtle pot', 'หม้อรูปเต่า', 'clay pot', 'หม้อดิน', 'sigatoka valley', 'nakabuta', 'lawai', 'handmade'], 'หาหม้อดินที่ปั้นเป็นรูปเต่า', 'Find the clay pot shaped like a little turtle',
    // a reddish-brown clay pot shaped like a turtle, its shell scratched with zigzag patterns, a spout on top, flippers and a smiling head, a plain round pot beside it
    E(120, 200, 100, 14, '#D7CCC8') + C(186, 162, 28, '#BF6A3A') + E(186, 136, 12, 5, '#8D4A26', 2.5) + Lc('M164 170c14 6 30 6 44 0', '#8D4A26', 2)
      + [[64, 186, -30], [140, 186, 30], [60, 146, -20], [146, 146, 20]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 16, 8, '#D9894F'), r)).join('') + C(42, 152, 20, '#D9894F') + E(102, 158, 54, 36, '#BF6A3A') + Lc('M58 160l10-10 10 10 10-10 10 10 10-10 10 10 10-10 10 10', '#8D4A26', 3)
      + Lc('M72 140h60M74 176h56', '#8D4A26', 2.5) + R(94, 112, 16, 14, '#BF6A3A', 3) + E(102, 112, 12, 4, '#8D4A26', 2) + face(40, 150, 0.4)),
  L('levuka', 'เมืองเก่าเลวูกา', 'The old wooden town of Levuka', ['levuka', 'เลวูกา', 'ovalau', 'โอวาเลา', 'old capital', 'เมืองหลวงเก่า', 'world heritage', 'มรดกโลก', 'wooden shopfronts', 'ห้องแถวไม้'], 'หาห้องแถวไม้สีพาสเทลที่มีระเบียงยื่นออกมา', 'Find the pastel wooden shops with verandas sticking out',
    // a row of old two-storey wooden shopfronts in pastel colours with tin roofs and covered verandas on posts, steep green hills behind
    P('M10 110c30-50 60-60 90-40 30-30 70-30 130 20v30H10z', '#7CB342') + [[14, '#FFAB91'], [70, '#B3E5FC'], [126, '#FFF59D'], [182, '#C5E1A5']].map(([x, c]) => R(x, 96, 52, 104, c) + P(`M${x - 2} 98l28-14 28 14z`, '#90A4AE', 3) + R(x + 8, 104, 14, 16, '#FFFFFF', 0, 2) + R(x + 30, 104, 14, 16, '#FFFFFF', 0, 2) + R(x + 16, 170, 20, 30, '#8D6E63', 0, 2.5)).join('')
      + R(8, 140, 228, 10, '#B0BEC5', 2) + Array.from({ length: 9 }, (_, k) => Lc(`M${14 + k * 27} 150v52`, '#8D6E63', 4)).join('') + R(8, 200, 228, 10, '#D7CCC8', 0, 3) + face(152, 126, 0.35)),
  L('coconuthusk', 'แกะเปลือกมะพร้าวกับหลักแหลม', 'Husking a coconut on a spike', ['coconut husking', 'แกะเปลือกมะพร้าว', 'coconut show', 'โชว์มะพร้าว', 'husk', 'เปลือกมะพร้าว', 'coconut palm', 'ต้นมะพร้าว', 'resort activity', 'กิจกรรมรีสอร์ต'], 'หามะพร้าวที่กำลังถูกแกะเปลือกบนไม้แหลม', 'Find the coconut being pulled off its husk on a pointy stick',
    // a child pushing a green coconut down onto a sharp wooden stake stuck in the sand, husk strips flying off, a pile of brown husked nuts beside
    E(120, 206, 104, 14, '#FFF3D6') + palm(200, 206, 120, -20, 0.8) + Lc('M100 206V140', '#8D6E63', 8) + P('M96 140l4-14 4 14z', '#BCAAA4', 2.5) + C(100, 116, 22, '#7CB342') + P('M88 102c-10-12-20-14-30-10M112 102c10-14 22-16 32-10', '#C5A26B', 0) + Lc('M84 104c-10-14-22-16-32-12M116 102c10-16 24-18 34-12', '#C5A26B', 5)
      + kid(60, 120, 1, '#8D5524', '#29B6F6') + Lc('M76 136l14-12', '#8D5524', 7) + [[150, 196], [168, 196], [159, 182]].map(([x, y]) => C(x, y, 10, '#8D6E63', 2.5) + C(x - 3, y - 3, 2, INK, 0)).join('') + face(100, 112, 0.4)),
  L('govbuildings', 'ตึกรัฐบาลเก่าที่ซูวา', 'The old Government Buildings in Suva', ['government buildings', 'ตึกรัฐบาล', 'suva', 'ซูวา', 'clock tower', 'หอนาฬิกา', 'stone building', 'ตึกหิน', 'ratu sukuna park', 'albert park'], 'หาตึกหินสีเทาที่มีหอนาฬิกาตรงกลาง', 'Find the grey stone building with a clock tower in the middle',
    // a big grey stone building with tall columns and long rows of windows, a square clock tower in the middle, green lawn and palms in front
    R(20, 104, 200, 96, '#CFD8DC') + R(16, 96, 208, 10, '#B0BEC5', 2) + R(96, 54, 48, 50, '#CFD8DC') + P('M92 56l28-22 28 22z', '#90A4AE', 3) + C(120, 76, 13, '#FFFFFF', 2.5) + Lc('M120 76v-8M120 76h6', INK, 2)
      + Array.from({ length: 6 }, (_, k) => R(98 + k * 8, 112, 5, 60, '#ECEFF1', 0, 2)).join('') + [26, 56, 152, 182].map((x) => R(x, 116, 22, 22, '#90CAF9', 2, 2) + R(x, 150, 22, 22, '#90CAF9', 2, 2)).join('') + R(104, 172, 32, 28, '#8D6E63', 2, 2.5)
      + R(10, 200, 220, 14, '#9CCC65', 4) + palm(14, 206, 70, 6, 0.7) + palm(226, 206, 70, -6, 0.7) + face(120, 126, 0.3)),
  L('copra', 'ลานตากเนื้อมะพร้าวที่ซาวูซาวู', 'Coconuts drying on copra racks in Savusavu', ['copra', 'มะพร้าวตากแห้ง', 'drying racks', 'ราวตาก', 'coconut plantation', 'สวนมะพร้าว', 'savusavu', 'ซาวูซาวู', 'vanua levu', 'coconut oil'], 'หามะพร้าวผ่าครึ่งที่วางตากแดดเป็นแถว', 'Find the coconut halves laid out in rows to dry in the sun',
    // a long wooden rack on legs covered in rows of coconut halves, white flesh facing up, under a hot sun with palms behind
    C(200, 44, 20, '#FFD54F', 0) + palm(30, 150, 110, 14, 0.8) + palm(210, 150, 96, -10, 0.7) + R(14, 140, 212, 14, '#A1673F', 2) + Lc('M28 154v54M112 154v54M210 154v54', '#8D6E63', 6)
      + Array.from({ length: 3 }, (_, r) => Array.from({ length: 7 - (r % 2) }, (_, k) => { const x = 34 + k * 29 + (r % 2) * 14, y = 134 - r * 14; return E(x, y, 14, 7, '#8D6E63', 2.5) + E(x, y - 2, 10, 4, '#FFFDF7', 0); }).join('')).join('') + face(120, 112, 0.35)),
  L('schoolboat', 'เรือรับส่งนักเรียนบนหมู่เกาะยาซาวา', 'The school boat in the Yasawa islands', ['school boat', 'เรือรับส่งนักเรียน', 'going to school', 'ไปโรงเรียน', 'yasawa', 'ยาซาวา', 'island school', 'โรงเรียนบนเกาะ', 'uniforms', 'ชุดนักเรียน'], 'หาเรือเล็กที่พาเด็กๆ ในชุดนักเรียนไปโรงเรียน', 'Find the little boat taking children in uniforms to school',
    // a small white boat with an outboard motor full of children in blue uniforms with backpacks, heading for an island with a school roof on the shore
    P('M150 110c14-24 50-30 80-10v20h-80z', '#7CB342') + R(176, 96, 34, 18, '#FFF8E1', 0, 2.5) + P('M172 98l21-12 21 12z', '#E53935', 2.5) + E(120, 180, 112, 28, '#4FC3F7')
      + [[60, 136, '#8D5524'], [90, 132, '#C68642'], [120, 134, '#8D5524'], [150, 136, '#C68642']].map(([x, y, c]) => R(x - 11, y + 8, 22, 18, '#1E88E5', 4, 2.5) + C(x, y, 11, c, 2.5) + face(x, y + 1, 0.22) + R(x + 6, y + 10, 8, 12, '#FFCA28', 2, 2)).join('')
      + P('M30 158h156l-14 22H44z', '#FFFFFF') + Lc('M38 166h140', '#1E88E5', 4) + R(18, 146, 14, 26, '#90A4AE', 3, 2.5) + waves(200, '#E1F5FE')),
  L('mithai', 'ขนมหวานอินเดียของชาวอินโดฟิจิ', 'An Indo-Fijian sweet shop tray', ['indian sweets', 'ขนมหวานอินเดีย', 'mithai', 'มิตไท', 'ladoo', 'ลาดู', 'barfi', 'บาร์ฟี', 'gulab jamun', 'indo-fijian', 'diwali sweets'], 'หาขนมลูกกลมสีส้มที่ซ้อนกันเป็นภูเขา', 'Find the round orange sweets piled up like a little mountain',
    // a round metal tray of colourful sweets: a pyramid of orange ladoo balls, pink and green barfi diamonds, and a bowl of dark gulab jamun in syrup
    E(120, 170, 106, 40, '#B0BEC5') + E(120, 166, 98, 34, '#ECEFF1') + [[80, 160], [100, 160], [120, 160], [90, 144], [110, 144], [100, 128]].map(([x, y]) => C(x, y, 11, '#FFA726', 2.5) + C(x - 3, y - 3, 1.5, '#FFE0B2', 0)).join('')
      + [[150, 146, '#F48FB1'], [176, 154, '#A5D6A7'], [158, 170, '#F48FB1'], [184, 176, '#A5D6A7']].map(([x, y, c]) => g(x, y, 1, R(-10, -10, 20, 20, c, 2, 2.5) + C(0, 0, 2.5, '#FFFFFF', 0), 45)).join('')
      + E(70, 186, 22, 10, '#FFFFFF', 2.5) + E(70, 184, 16, 6, '#FFB74D', 0) + [[62, 182], [76, 182]].map(([x, y]) => C(x, y, 6, '#6D3B1F', 2)).join('') + face(100, 152, 0.3)),
  L('conch', 'เป่าสังข์ต้อนรับยามเย็น', 'Blowing the conch shell at sunset', ['conch shell', 'หอยสังข์', 'davui', 'ดาวูอี', 'sunset welcome', 'ต้อนรับยามเย็น', 'beach', 'ชายหาด', 'trumpet shell', 'resort'], 'หาหอยสังข์ใหญ่ที่เด็กกำลังเป่า', 'Find the big conch shell a child is blowing like a trumpet',
    // a child on the beach at sunset holding a big pink-and-cream spiral conch shell to their lips, sound waves curling out across the sea
    C(190, 74, 26, '#FFCC80', 0) + E(120, 206, 108, 14, '#FFF3D6') + Lc('M10 168c30-6 60 6 90 0', '#81D4FA', 4) + kid(84, 134, 1.15, '#8D5524', '#FF7043')
      + g(132, 128, 1, P('M-24 0c0-20 20-30 40-24 16 6 20 20 12 30l-30 10c-14 4-22-4-22-16z', '#FFE0B2') + P('M-18 2c4-10 16-14 26-10', '#F8BBD0', 0) + Lc('M-14 -6c6-6 16-6 22 0M-18 6c8-4 18-4 24 0', '#F48FB1', 2.5) + P('M28 4c6 2 10 8 8 14-6-2-10-6-8-14z', '#F8BBD0', 2), -10)
      + Lc('M176 116c8-8 8-22 0-30M192 126c14-14 14-36 0-50M208 136c20-20 20-50 0-70', '#FFFFFF', 4)),
  L('bodyboard', 'เล่นบอดี้บอร์ดที่หาดนาตาโดลา', 'Bodyboarding at Natadola Beach', ['bodyboarding', 'บอดี้บอร์ด', 'natadola', 'นาตาโดลา', 'small waves', 'คลื่นเล็ก', 'beach fun', 'เล่นน้ำทะเล', 'coral coast', 'swimming'], 'หาเด็กที่นอนบนกระดานโต้คลื่นเล็ก', 'Find the child riding a little wave lying on a board',
    // a child lying on a short bright bodyboard, kicking, riding a small frothy wave towards the white sand
    E(120, 210, 108, 16, '#FFF3D6') + P('M10 150c40-24 80-30 130-18 30 8 60 4 90-10v70H10z', '#4FC3F7') + P('M60 150c20-16 50-22 76-12 10 4 20 4 30 0-10 14-40 26-106 12z', '#E1F5FE', 3)
      + [[66, 156], [84, 148], [168, 144]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 2)).join('') + g(118, 150, 1.3, R(-36, -6, 72, 14, '#FF4081', 7, 3) + E(-8, -10, 24, 9, '#29B6F6', 2.5) + Lc('M-30 -10l-16-6M-30 -6l-18 2', '#8D5524', 6) + C(26, -16, 12, '#8D5524', 2.5) + face(28, -15, 0.24), -6) + face(170, 180, 0.45)),
  L('fijimuseum', 'พิพิธภัณฑ์ฟิจิในสวนเทิร์สตัน', 'The Fiji Museum in Thurston Gardens', ['fiji museum', 'พิพิธภัณฑ์ฟิจิ', 'thurston gardens', 'สวนเทิร์สตัน', 'suva', 'ซูวา', 'museum', 'พิพิธภัณฑ์', 'old canoe', 'เรือแคนูโบราณ'], 'หาตึกสีขาวในสวนที่มีเรือแคนูยาวจอดอยู่ข้างหน้า', 'Find the white building in the garden with a long canoe in front',
    // a low white museum building with a wide veranda and a green roof in a garden of big trees, a long wooden canoe hull on a stand on the lawn
    C(30, 96, 30, '#43A047') + C(210, 90, 32, '#2E7D32') + R(40, 100, 160, 74, '#FFFFFF') + P('M30 102l20-26h140l20 26z', '#26A69A', 3) + Array.from({ length: 7 }, (_, k) => R(52 + k * 22, 112, 6, 62, '#ECEFF1', 0, 2)).join('') + R(106, 134, 28, 40, '#8D6E63', 3, 2.5)
      + R(10, 174, 220, 34, '#9CCC65', 4) + P('M40 186c20 12 140 12 160 0l-6 10c-30 8-118 8-148 0z', '#A1673F') + Lc('M60 200v10M180 200v10', '#5D4037', 4) + face(120, 116, 0.3)),
  L('coconutpaint', 'ระบายสีหน้ามะพร้าวที่คิดส์คลับ', 'Painting faces on coconuts at the kids\' club', ['kids club', 'คิดส์คลับ', 'coconut painting', 'ระบายสีมะพร้าว', 'crafts', 'งานประดิษฐ์', 'resort', 'รีสอร์ต', 'rainy day', 'วันฝนตก'], 'หามะพร้าวที่ถูกวาดหน้าตลกๆ', 'Find the coconuts painted with funny faces',
    // a little table with a row of brown coconuts painted with bright silly faces, a paintbrush and pots of paint
    R(20, 160, 200, 14, '#FFCA28', 4) + Lc('M40 174v34M200 174v34', '#8D6E63', 6) + [[56, 130, '#FF7043'], [108, 126, '#29B6F6'], [160, 130, '#AB47BC']].map(([x, y, c], k) => E(x, y, 24, 28, '#8D6E63') + C(x - 9, y - 8, 7, '#FFFFFF', 2) + C(x + 9, y - 8, 7, '#FFFFFF', 2) + C(x - 9, y - 7, 3, INK, 0) + C(x + 9, y - 7, 3, INK, 0) + P(`M${x - 10} ${y + 8}q10 ${10 - k * 4} 20 0`, c, 2.5) + Lc(`M${x - 14} ${y - 24}c8-6 20-6 28 0`, c, 4)).join('')
      + [[196, 150, '#43A047'], [210, 150, '#FFEB3B']].map(([x, y, c]) => R(x - 6, y - 8, 12, 10, c, 2, 2)).join('') + Lc('M180 154l24-40', '#A1673F', 4) + C(204, 112, 4, '#E53935', 1.5)),
];

export default {
  places: {
    fj: { country: 'fj', wave: 3, name: nm('ฟิจิ', 'Fiji'), tz: 'Pacific/Fiji', alias: ['fiji', 'ฟิจิ', 'viti levu', 'วิติเลวู', 'vanua levu'], colors: FJ },
    'fj-islands': { country: 'fj', wave: 3, name: nm('นาดีและหมู่เกาะฟิจิ', 'Nadi and the Fiji islands'), tz: 'Pacific/Fiji', ll: [-17.78, 177.44], alias: ['nadi', 'เมืองนาดี', 'denarau', 'เดนาเรา', 'mamanuca', 'มามานูกา', 'yasawa', 'ยาซาวา', 'coral coast', 'คอรัลโคสต์', 'natadola', 'sigatoka', 'suva', 'ซูวา', 'levuka', 'savusavu', 'taveuni', 'ตาเวอูนิ', 'pacific harbour'], colors: FI },
  },
  items,
};
