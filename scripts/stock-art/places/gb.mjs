// The United Kingdom and London — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const GB = { k1: '#C8102E', k2: '#012169', k3: '#E8EAF6' };
// the Tudor rose: a red outer ring of petals, a white inner one, a gold heart
const tudor = (x, y, s) => g(x, y, s, [0, 72, 144, 216, 288].map((a) => `<g transform="rotate(${a})">${C(0, -20, 15, '#C8102E', 3)}</g>`).join('') + [36, 108, 180, 252, 324].map((a) => `<g transform="rotate(${a})">${C(0, -11, 9, '#FFFFFF', 3)}</g>`).join('') + C(0, 0, 7, '#FFD54A', 3));

const items = [
  { id: 'gb.stamp', cat: 'stamp', file: 'gb/stamp.v1.svg', name: nm('ตราประทับสหราชอาณาจักร', 'UK stamp'), kw: ['uk', 'united kingdom', 'สหราชอาณาจักร', 'england', 'อังกฤษ', 'britain'],
    svg: countryStamp({ name: 'UK', ...GB, emblem: tudor(100, 92, 1.3) }) },
  { id: 'gb.flag', ch: '🇬🇧', cat: 'flag', file: 'gb/flag.v1.svg', name: nm('ธงยูเนียนแจ็ก', 'Union Jack'), kw: ['union jack', 'ยูเนียนแจ็ก', 'uk', 'อังกฤษ', 'flag', 'ธง'],
    // the Union Jack on a straight cloth: blue field, white and red saltires, the white-edged red cross
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + `<g><rect x="46" y="40" width="168" height="104" fill="#012169"/>`
      + `<path d="M46 40L214 144M214 40L46 144" stroke="#FFFFFF" stroke-width="20" fill="none"/><path d="M46 40L214 144M214 40L46 144" stroke="#C8102E" stroke-width="7" fill="none"/>`
      + `<path d="M130 40V144M46 92H214" stroke="#FFFFFF" stroke-width="30" fill="none"/><path d="M130 40V144M46 92H214" stroke="#C8102E" stroke-width="17" fill="none"/></g>` + R(46, 40, 168, 104, 'none')) },
  { id: 'gb.hello', cat: 'hello', file: 'gb/hello.v1.svg', name: nm('ฮัลโหล สวัสดี', 'Hello'), kw: ['hello', 'ฮัลโหล', 'สวัสดี', 'raincoat', 'เสื้อกันฝน', 'wellies', 'บูทยาง', 'rain'],
    // a child in a yellow raincoat and red wellies under a spotty umbrella, a raindrop on the hood
    svg: free(P('M30 70c20-50 160-50 180 0z', '#1E88E5') + [[70, 52], [120, 42], [170, 52]].map(([x, y]) => C(x, y, 6, '#FFFFFF', 3)).join('') + Lc('M120 70v40', INK, 4)
      + P('M78 200c0-54 16-86 42-86s42 32 42 86z', '#FFCA28') + R(88, 196, 24, 22, '#E53935', 6) + R(128, 196, 24, 22, '#E53935', 6) + C(120, 112, 30, '#FFE0BD') + P('M86 108c0-26 16-40 34-40s34 14 34 40c-8-12-20-18-34-18s-26 6-34 18z', '#FFCA28')
      + P('M156 150c12-14 16-30 12-44l12-2c6 18 2 38-12 52z', '#FFCA28') + face(120, 116, 0.6)) },
  { id: 'gb.food.fishandchips', cat: 'food', file: 'gb/food-fishandchips.v1.svg', name: nm('ฟิชแอนด์ชิปส์', 'Fish and chips'), kw: ['fish and chips', 'ฟิชแอนด์ชิปส์', 'chippy', 'mushy peas', 'pub', 'ผับ'], colour: true,
    // battered fish and a heap of fat chips in a paper cone, a lemon wedge, a pot of green mushy peas
    svg: free(P('M40 90l80-30 80 30-30 120H70z', '#FFFFFF') + Lc('M54 110l132-4', '#1E88E5', 4) + [[70, 70], [90, 60], [112, 56], [132, 58], [152, 64]].map(([x, y], i) => g(x, y, 1, R(-7, -26, 14, 52, '#FFD54A', 4, 3.5), -20 + i * 10)).join('')
      + P('M130 92c30-30 70-20 80 10-20 30-60 30-80-10zM210 102l20-14v28z', '#E9A64C') + P('M24 150c0-10 40-10 40 0v30c0 10-40 10-40 0z', '#FFFFFF') + E(44, 150, 20, 6, '#9CCC65') + P('M200 170l20-20 8 24z', '#FFF176', 3.5) + face(120, 150, 0.6)) },
  { id: 'gb.food.scones', cat: 'food', file: 'gb/food-scones.v1.svg', name: nm('สโคนกับแยมและครีม', 'Scones with jam and cream'), kw: ['scone', 'สโคน', 'afternoon tea', 'น้ำชายามบ่าย', 'cream tea', 'jam', 'แยม'], colour: true,
    // two split scones topped with strawberry jam and a dollop of clotted cream, a little pot of tea behind
    svg: free(P('M150 60h60v60c0 14-60 14-60 0z', '#FFFFFF') + Lc('M210 76c14 0 14 28 0 28', INK, 4) + P('M150 60c0-14 60-14 60 0z', '#E3F2FD') + C(180, 46, 5, '#FFFFFF', 3)
      + E(120, 190, 100, 20, '#FFFFFF') + [[80, 150], [150, 160]].map(([x, y]) => R(x - 34, y - 6, 68, 34, '#E9C17A', 10) + E(x, y - 6, 34, 10, '#C62828') + P(`M${x - 22} ${y - 14}c0-20 44-20 44 0z`, '#FFF8E1')).join('') + face(80, 160, 0.5) + face(150, 170, 0.5)) },
  { id: 'gb.food.sundayroast', cat: 'food', file: 'gb/food-sundayroast.v1.svg', name: nm('ยอร์กเชียร์พุดดิ้ง', 'Yorkshire pudding'), kw: ['yorkshire pudding', 'ยอร์กเชียร์พุดดิ้ง', 'sunday roast', 'roast', 'gravy', 'เกรวี'], colour: true,
    // a puffed golden Yorkshire pudding cup brimming with gravy, a sprig of rosemary, peas rolling about
    svg: free(E(120, 186, 104, 26, '#FFFFFF') + P('M40 150c0-60 30-90 80-90s80 30 80 90c0 30-160 30-160 0z', '#E9A64C') + P('M50 120c10-40 50-50 70-30 20-20 60-10 70 30z', '#C8862F')
      + E(120, 118, 50, 14, '#6D4C41') + Lc('M160 60l30-30M168 52l10 2M176 44l10 2', '#558B2F', 4) + [[60, 196], [76, 202], [180, 198]].map(([x, y]) => C(x, y, 6, '#7CB342', 3)).join('') + face(120, 156, 0.7)) },
  { id: 'gb.animal.corgi', cat: 'animal', file: 'gb/animal-corgi.v1.svg', name: nm('หมาคอร์กี้', 'Corgi'), kw: ['corgi', 'คอร์กี้', 'dog', 'หมา', 'welsh'], colour: true,
    // a long low ginger-and-white corgi with big pointed ears and short legs, a fluffy bottom
    svg: free(E(130, 150, 80, 36, '#F4A261') + E(140, 164, 54, 20, '#FFFFFF') + [[80, 184], [180, 184]].map(([x, y]) => R(x - 9, y, 18, 20, '#FFFFFF', 6)).join('') + C(210, 140, 14, '#FFFFFF')
      + P('M46 70l6-44 30 30zM104 70l-6-44-30 30z', '#F4A261') + P('M52 62l4-22 14 14zM98 62l-4-22-14 14z', '#F8BBD0', 3) + C(76, 100, 40, '#F4A261') + P('M76 76v40c-20 0-30 10-30 20 10 6 50 6 60 0 0-10-10-20-30-20z', '#FFFFFF', 0).replace('stroke-width="0"', 'stroke="none"')
      + E(76, 124, 18, 12, '#FFFFFF') + E(76, 118, 6, 4, INK) + face(76, 100, 0.6)) },
  { id: 'gb.animal.hedgehog', ch: '🦔', cat: 'animal', file: 'gb/animal-hedgehog.v1.svg', name: nm('เม่นแคระ', 'Hedgehog'), kw: ['hedgehog', 'เม่น', 'garden', 'สวน', 'autumn', 'ใบไม้ร่วง'], colour: true,
    // a round little hedgehog: spiky brown back, a soft pointed face, a red apple on its spines
    svg: free(P('M30 170c0-60 40-100 100-100s80 40 80 100z', '#8D6E63') + Array.from({ length: 9 }, (_, i) => { const a = Math.PI + (i * Math.PI) / 8; const x = 125 + Math.cos(a) * 92, y = 170 + Math.sin(a) * 92; return P(`M${(x - 8).toFixed(1)} ${(y + 6).toFixed(1)}L${(x + Math.cos(a) * 16).toFixed(1)} ${(y + Math.sin(a) * 16).toFixed(1)}L${(x + 8).toFixed(1)} ${(y + 6).toFixed(1)}z`, '#6D4C41', 3); }).join('')
      + P('M30 170c-10-30 10-50 40-50s40 30 30 50z', '#FFE0B2') + C(24, 162, 6, INK, 0) + C(150, 70, 16, '#E53935') + Lc('M150 54l4-10', '#558B2F', 3) + face(64, 150, 0.45)) },
  { id: 'gb.transport.narrowboat', cat: 'transport', file: 'gb/transport-narrowboat.v1.svg', name: nm('เรือแคบล่องคลอง', 'Canal narrowboat'), kw: ['narrowboat', 'เรือแคบ', 'canal boat', 'เรือคลอง', 'little venice', 'ลิตเติลเวนิส', 'canal'], colour: true,
    // a long thin green-and-red canal boat with painted roses and castles, round portholes, flower pots on the roof
    svg: free(P('M10 196c30-6 60-6 90 0s60 6 90 0 40-4 40 0', 'none', 5).replace('fill="none"', 'fill="none" stroke="#4FC3F7"') + P('M10 160h220l-20 30H30z', '#C62828') + R(30, 120, 180, 40, '#2E7D32', 6)
      + [60, 100, 140, 180].map((x) => C(x, 140, 9, '#FFF59D', 3.5)).join('') + R(84, 162, 36, 18, '#FFD54A', 4, 3) + C(102, 171, 5, '#E91E63', 2.5) + [[50, 112], [130, 112], [190, 112]].map(([x, y]) => R(x - 8, y - 6, 16, 10, '#8D6E63', 2, 3) + C(x, y - 12, 7, '#EC407A', 3)).join('') + face(214, 172, 0.4)) },
  { id: 'gb.culture.teapot', cat: 'culture', file: 'gb/culture-teapot.v1.svg', name: nm('กาน้ำชาอังกฤษ', 'A proper teapot'), kw: ['teapot', 'กาน้ำชา', 'tea', 'ชา', 'afternoon tea', 'น้ำชายามบ่าย', 'cuppa'], colour: true,
    // a round china teapot painted with blue flowers, a curly spout, a teacup on its saucer beside it
    svg: free(E(110, 140, 70, 60, '#FFFFFF') + Lc('M180 120c30 0 30 50 0 50', INK, 6) + P('M44 130c-24-10-34-30-30-40 16 0 26 14 34 30z', '#FFFFFF') + P('M70 84c0-16 80-16 80 0z', '#FFFFFF') + C(110, 70, 8, '#1E88E5')
      + [[80, 130], [130, 150], [100, 170]].map(([x, y]) => C(x, y, 7, '#64B5F6', 3)).join('') + E(196, 210, 34, 8, '#FFFFFF') + P('M172 186h48c0 20-48 20-48 0z', '#FFFFFF') + face(110, 136, 0.7)) },
  { id: 'gb.culture.bagpipes', cat: 'culture', file: 'gb/culture-bagpipes.v1.svg', name: nm('ปี่สก็อต', 'Bagpipes'), kw: ['bagpipes', 'ปี่สก็อต', 'scotland', 'สกอตแลนด์', 'edinburgh', 'เอดินบะระ', 'tartan', 'ลายสก็อต'], colour: true,
    // a tartan bag with three drone pipes and ribbons, a chanter pointing down
    svg: free(P('M50 140c0-50 40-70 80-70s70 30 70 70-40 60-80 60-70-20-70-60z', '#C62828') + Lc('M60 110h130M60 150h140M60 180h120', '#1B5E20', 6) + Lc('M90 80v130M140 74v130', '#1B5E20', 6) + Lc('M60 130h130M110 76v130', '#FFD54A', 2.5)
      + [[110, 30], [140, 20], [170, 34]].map(([x, y]) => Lc(`M${x} 80L${x} ${y}`, INK, 6) + R(x - 7, y - 8, 14, 10, '#FFFFFF', 3, 3)).join('') + Lc('M80 190l-20 30', INK, 6) + P('M170 80c10 10 20 10 30 0', '#1E88E5', 3) + face(130, 140, 0.6)) },
  // ---------- London
  { id: 'gb-london.stamp', cat: 'stamp', file: 'gb/london/stamp.v1.svg', name: nm('ตราประทับลอนดอน', 'London stamp'), kw: ['london', 'ลอนดอน'],
    // a red phone box
    svg: cityStamp('glo-st', { name: 'LONDON', sub: 'UK', ...GB, emblem: R(84, 70, 32, 70, '#C8102E') + P('M80 72q20-14 40 0z', '#C8102E') + R(89, 82, 22, 8, '#FFFFFF', 1, 2) + [0, 1, 2].map((i) => R(89, 96 + i * 13, 22, 10, '#BBDEFB', 1, 2)).join('') }) },
  { id: 'gb-london.day.towerbridge', cat: 'day', file: 'gb/london/day-towerbridge.v1.svg', name: nm('ทาวเวอร์บริดจ์กับรถบัสแดง', 'Tower Bridge with a red bus'), kw: ['tower bridge', 'ทาวเวอร์บริดจ์', 'thames', 'แม่น้ำเทมส์', 'tower of london', 'หอคอยลอนดอน'],
    // the two gothic towers with blue walkways across the top, the bascules down, a red double-decker crossing, the Thames
    svg: scene('glo-d1', '#E3F2FD', [[64, 60], [176, 60]].map(([x, y]) => R(x - 18, y, 36, 120, '#D7CCC8') + P(`M${x - 22} ${y}l22-28 22 28z`, '#78909C') + R(x - 8, y + 20, 16, 30, '#BBDEFB', 3, 3) + P(`M${x - 18} ${y + 120}v-20c0-14 36-14 36 0v20z`, '#5D4037')).join('')
      + R(82, 70, 76, 10, '#1E88E5') + R(82, 86, 76, 10, '#1E88E5') + Lc('M-4 150q34 30 50 30M244 150q-34 30-50 30', '#90A4AE', 4) + R(-4, 156, 248, 12, '#90A4AE')
      + R(96, 128, 52, 30, '#E53935', 6) + R(100, 132, 44, 8, '#BBDEFB', 2, 3) + C(108, 160, 6, INK) + C(138, 160, 6, INK) + P('M-4 176h248v70H-4z', '#5C7A99') + Lc('M30 196h30M160 206h40', '#BBDEFB', 4)) },
  { id: 'gb-london.day.guards', cat: 'day', file: 'gb/london/day-guards.v1.svg', name: nm('การเปลี่ยนเวรทหารพระราชวังบักกิงแฮม', 'Changing the guard at Buckingham Palace'), kw: ['buckingham palace', 'พระราชวังบักกิงแฮม', 'changing the guard', 'เปลี่ยนเวรทหาร', 'kings guard', 'the mall'],
    // the pale palace front with its balcony, the gold gates, a row of guards in red with tall black bearskins
    svg: scene('glo-d2', '#FFF8E1', R(20, 60, 200, 80, '#ECEFF1') + [40, 70, 100, 140, 170, 200].map((x) => R(x - 7, 76, 14, 22, '#90A4AE', 2, 3)).join('') + R(96, 110, 48, 30, '#ECEFF1') + P('M100 60l20-14 20 14z', '#90A4AE') + Lc('M120 46V34', INK, 3) + P('M120 34h14l-4 4 4 4h-14z', '#C8102E', 2.5)
      + P('M-4 150h248v100H-4z', '#BCAAA4') + [50, 96, 142, 188].map((x) => R(x - 12, 172, 24, 42, '#C8102E') + P(`M${x - 13} 172c-2-30 28-30 26 0z`, INK) + C(x, 170, 9, '#FFE0BD', 3) + Lc(`M${x - 12} 194h24`, '#FFFFFF', 3) + R(x - 10, 214, 8, 16, INK, 0, 3) + R(x + 2, 214, 8, 16, INK, 0, 3)).join('')) },
  { id: 'gb-london.landmark.bigben', cat: 'landmark', file: 'gb/london/landmark-bigben.v1.svg', name: nm('หอนาฬิกาบิ๊กเบน', 'Big Ben'), kw: ['big ben', 'บิ๊กเบน', 'elizabeth tower', 'westminster', 'เวสต์มินสเตอร์', 'parliament', 'clock'], colour: true, spot: nm('หาหอนาฬิกาที่สูงที่สุด', 'Find the tallest clock tower'),
    // the tall golden-stone tower, the big clock face with gold edging, the pointed green-black spire
    svg: free(R(90, 100, 60, 120, '#E0C48C') + Lc('M100 120v90M120 120v90M140 120v90', '#C8A26B', 3) + R(84, 60, 72, 46, '#E0C48C') + C(120, 82, 20, '#FFFDF7') + C(120, 82, 20, 'none') + Lc('M120 82v-13M120 82l9 5', INK, 3.5)
      + R(88, 44, 64, 16, '#D4B370') + P('M92 44l28-40 28 40z', '#455A64') + Lc('M120 4V-4', INK, 3) + [104, 136].map((x) => C(x, 52, 3, '#FFD54A', 0)).join('') + face(120, 160, 0.5)) },
  { id: 'gb-london.landmark.eye', cat: 'landmark', file: 'gb/london/landmark-eye.v1.svg', name: nm('ลอนดอนอาย', 'London Eye'), kw: ['london eye', 'ลอนดอนอาย', 'south bank', 'เซาท์แบงก์', 'ferris wheel', 'ชิงช้าสวรรค์'], colour: true, spot: nm('หาชิงช้าสวรรค์ที่มีขาค้ำข้างเดียว', 'Find the big wheel held up from one side'),
    // the great wheel tilted on its A-frame leg from one side only, egg-shaped glass pods, the river below
    svg: free(P('M10 210c40-8 80-8 110 0s70 8 110 0v14H10z', '#5C7A99') + C(120, 104, 82, 'none') + Array.from({ length: 16 }, (_, i) => { const a = (i * Math.PI) / 8; const x = 120 + Math.cos(a) * 82, y = 104 + Math.sin(a) * 82; return Lc(`M120 104L${x.toFixed(1)} ${y.toFixed(1)}`, '#B0BEC5', 2) + E(x, y, 8, 6, '#B3E5FC', 3); }).join('')
      + Lc('M120 104L200 206M120 104L176 206', INK, 6) + C(120, 104, 10, '#ECEFF1') + face(120, 104, 0.35, 'none')) },
  { id: 'gb-london.landmark.bus', cat: 'landmark', file: 'gb/london/landmark-bus.v1.svg', name: nm('รถบัสสองชั้นสีแดง', 'Red double-decker bus'), kw: ['double decker', 'รถบัสสองชั้น', 'red bus', 'รถบัสแดง', 'routemaster', 'oxford street', 'bus tour'], colour: true, spot: nm('หารถบัสสีแดงสองชั้น', 'Find a red bus with two floors'),
    // a tall red double-decker with two rows of windows, a destination blind, a back platform and black wheels
    svg: free(R(24, 40, 192, 160, '#E53935', 20) + [0, 1, 2, 3].map((i) => R(40 + i * 40, 56, 32, 34, '#BBDEFB', 6, 3.5)).join('') + [0, 1, 2].map((i) => R(40 + i * 40, 116, 32, 34, '#BBDEFB', 6, 3.5)).join('') + R(166, 110, 40, 74, '#FFFFFF', 4)
      + R(70, 96, 100, 12, '#FFCA28', 3, 3) + Lc('M24 160h192', '#B71C1C', 4) + C(66, 204, 18, '#455A64') + C(176, 204, 18, '#455A64') + face(110, 172, 0.55)) },
  { id: 'gb-london.landmark.guard', cat: 'landmark', file: 'gb/london/landmark-guard.v1.svg', name: nm('ทหารยามหมวกขนหมี', 'The Queen\'s/King\'s Guard'), kw: ['kings guard', 'ทหารยาม', 'bearskin', 'หมวกขนหมี', 'buckingham', 'บักกิงแฮม', 'sentry'], colour: true, spot: nm('หาทหารใส่หมวกสีดำสูงๆ', 'Find the soldier with the tall black hat'),
    // a guard in a red tunic with gold buttons and a white belt, the towering black bearskin hat, standing in a sentry box
    svg: free(R(50, 40, 140, 180, '#ECEFF1') + P('M40 44l80-30 80 30z', '#B0BEC5') + R(64, 60, 112, 160, '#FFFFFF') + R(92, 120, 56, 70, '#C8102E') + Lc('M92 160h56', '#FFFFFF', 6) + [130, 146, 176].map((y) => C(120, y, 3.5, '#FFD54A', 0)).join('')
      + R(96, 190, 20, 30, INK) + R(124, 190, 20, 30, INK) + C(120, 110, 18, '#FFE0BD') + P('M96 104c-6-50 54-50 48 0z', INK) + Lc('M110 124l20 0', INK, 2.5) + face(120, 112, 0.4)) },
];
export default {
  places: {
    gb: { country: 'gb', wave: 1, name: nm('สหราชอาณาจักร', 'United Kingdom'), tz: 'Europe/London', alias: ['united kingdom', 'uk', 'สหราชอาณาจักร', 'england', 'อังกฤษ', 'britain', 'scotland', 'สกอตแลนด์'], colors: GB },
    'gb-london': { country: 'gb', wave: 1, name: nm('ลอนดอน', 'London'), tz: 'Europe/London', ll: [51.51, -0.13], alias: ['london', 'ลอนดอน', 'westminster', 'เวสต์มินสเตอร์', 'thames', 'เทมส์', 'covent garden', 'camden', 'greenwich', 'oxford street', 'hyde park', 'ไฮด์ปาร์ก', 'heathrow', 'kensington'], colors: GB },
  },
  items,
};
