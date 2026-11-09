// Taiwan + Taipei — each picture drawn for its own subject. No flag (docs/STOCK-ART.md §8.2): the stamp carries Yushan and the plum blossom.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const K = { k1: '#D84315', k2: '#00796B', k3: '#FFF3E0' };
const nm = (th, en) => ({ th, en });
// the plum blossom: five round white-pink petals, a gold heart (rounder than Korea's pointed rose of Sharon)
const plum = (x, y, s) => g(x, y, s, [0, 72, 144, 216, 288].map((a) => g(0, -14, 1, C(0, 0, 11, '#FCE4EC', 3), 0).replace('translate(0 -14)', `rotate(${a}) translate(0 -14)`)).join('') + C(0, 0, 7, '#FFD54A', 3));

const items = [
  { id: 'tw.stamp', cat: 'stamp', file: 'tw/stamp.v1.svg', name: nm('ตราประทับไต้หวัน', 'Taiwan stamp'), kw: ['taiwan', 'ไต้หวัน', 'formosa'],
    svg: countryStamp({ name: 'TAIWAN', ...K, emblem: P('M44 128l34-50 16 16 24-34 38 68z', '#4DB6AC') + P('M118 60l10 14-8 4-6-6-6 6-6-4z', '#fff', 3) + plum(66, 66, 0.9) }) },
  { id: 'tw.hello', ch: '👋', cat: 'hello', file: 'tw/hello.v1.svg', name: nm('หนีห่าว สวัสดี', 'Ni hao, hello'), kw: ['ni hao', 'หนีห่าว', 'hello', 'สวัสดี', 'tea', 'ชา'],
    // a child in a wide straw tea-picker's hat with a little tea basket on the hip
    svg: free(P('M74 214c0-50 18-84 46-84s46 34 46 84z', '#4DB6AC') + R(140, 160, 40, 34, '#D7A86E', 6) + Lc('M146 170h28M146 182h28', '#A1673F', 3) + P('M150 160c0-14 20-14 20 0', 'none', 4)
      + C(120, 90, 38, '#FFE0BD') + E(120, 62, 78, 16, '#F4D58D') + P('M88 60c0-26 64-26 64 0z', '#F4D58D') + Lc('M88 62c20 6 44 6 64 0', '#A1673F', 4)
      + P('M76 150c-14-16-18-38-12-54l-14-4c-8 22-2 46 14 64z', '#FFE0BD') + C(58, 88, 12, '#FFE0BD') + face(120, 96, 0.7)) },
  { id: 'tw.food.bubbletea', ch: '🧋', cat: 'food', file: 'tw/food-bubbletea.v1.svg', name: nm('ชานมไข่มุก', 'Bubble tea'), kw: ['bubble tea', 'ชานมไข่มุก', 'boba', 'pearl milk tea', 'ไข่มุก', 'ชานม'], colour: true,
    // a tall clear cup of milk tea, a dome lid, a fat striped straw, black pearls at the bottom
    svg: free(P('M64 64h112l-16 150H80z', '#D7B48A') + P('M64 64h112l-4 30H68z', '#F5E6D3') + P('M58 66c0-34 124-34 124 0z', '#E3F2FD') + R(108, 4, 24, 50, '#F48FB1', 12) + Lc('M110 20h20M110 34h20', '#fff', 4)
      + [[90, 196], [110, 202], [130, 196], [150, 200], [100, 182], [140, 182]].map(([x, y]) => C(x, y, 8, INK, 0)).join('') + face(120, 132, 0.8)) },
  { id: 'tw.food.xiaolongbao', cat: 'food', file: 'tw/food-xiaolongbao.v1.svg', name: nm('เสี่ยวหลงเปา', 'Xiaolongbao'), kw: ['xiaolongbao', 'เสี่ยวหลงเปา', 'soup dumpling', 'ซาลาเปาน้ำซุป', 'din tai fung', 'ติ่นไท่ฟง'], colour: true,
    // a round bamboo steamer, three pleated soup dumplings with the swirl on top, a whisp of steam
    svg: free(E(120, 170, 104, 30, '#D7A86E') + R(16, 140, 208, 30, '#D7A86E') + Lc('M16 154h208', '#A1673F', 4) + E(120, 140, 104, 26, '#EFD9B4')
      + [[72, 128], [168, 128], [120, 116]].map(([x, y]) => P(`M${x - 34} ${y + 10}c0-30 14-44 34-46 20 2 34 16 34 46z`, '#FFFDF7') + P(`M${x} ${y - 36}c-6 6-6 12 0 14`, 'none', 4) + Lc(`M${x - 20} ${y - 20}l8 12M${x + 20} ${y - 20}l-8 12`, '#E0D6C8', 3)).join('')
      + Lc('M120 50c-6-12 6-18 0-30', '#B0BEC5', 5) + face(120, 106, 0.5)) },
  { id: 'tw.food.jipai', cat: 'food', file: 'tw/food-jipai.v1.svg', name: nm('ไก่ทอดชิ้นยักษ์', 'Giant fried chicken cutlet'), kw: ['ji pai', 'jipai', 'ไก่ทอดชิ้นใหญ่', 'ไก่ทอด', 'night market', 'ตลาดกลางคืน', 'hot star'], colour: true,
    // the famous cutlet bigger than a face, poking out of a paper bag, crumbly edges
    svg: free(P('M50 40c40-20 110-20 140 0 20 40 20 90 0 120-40 14-100 14-140 0-20-30-20-80 0-120z', '#E9A64C') + [[80, 70], [150, 64], [170, 120], [70, 130], [120, 150]].map(([x, y]) => C(x, y, 4, '#C8862F', 0)).join('')
      + P('M60 140h120l-10 80H70z', '#FFF3E0') + Lc('M60 160h120', '#E4573D', 6) + face(120, 98)) },
  { id: 'tw.food.mangoice', cat: 'food', file: 'tw/food-mangoice.v1.svg', name: nm('น้ำแข็งไสมะม่วง', 'Mango shaved ice'), kw: ['mango ice', 'น้ำแข็งไสมะม่วง', 'mango', 'มะม่วง', 'shaved ice', 'ice monster'], colour: true,
    // a big glass bowl of snowy ice piled with orange mango cubes and a scoop of mango ice cream
    svg: free(P('M44 140h152l-20 64H64z', '#E1F5FE') + P('M40 140c10-60 50-90 80-90s70 30 80 90z', '#FFFDF7')
      + [[70, 110], [96, 90], [124, 80], [152, 96], [172, 120], [110, 116], [140, 120], [84, 128]].map(([x, y], i) => g(x, y, 1, R(-11, -11, 22, 22, '#FFB300', 4, 3.5), (i * 17) % 30 - 15)).join('')
      + C(122, 52, 22, '#FFCA28') + face(120, 156, 0.6)) },
  { id: 'tw.animal.bear', ch: '🐻', cat: 'animal', file: 'tw/animal-bear.v1.svg', name: nm('หมีดำฟอร์โมซา', 'Formosan black bear'), kw: ['black bear', 'หมีดำ', 'formosan', 'bear', 'หมี', 'oh-bear'], colour: true,
    // a round black bear with the creamy V on its chest
    svg: free(C(70, 64, 22, INK) + C(170, 64, 22, INK) + C(120, 100, 64, INK) + E(120, 186, 72, 44, INK) + P('M90 160l30 30 30-30-10-4-20 18-20-18z', '#FFF3E0')
      + E(120, 120, 28, 20, '#8D6E63') + E(120, 110, 10, 7, '#3E2723') + face(120, 92, 0.75).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFDF7" stroke="none"')) },
  { id: 'tw.animal.bluemagpie', cat: 'animal', file: 'tw/animal-bluemagpie.v1.svg', name: nm('นกสาลิกาสีน้ำเงินไต้หวัน', 'Taiwan blue magpie'), kw: ['blue magpie', 'นกสาลิกาสีน้ำเงิน', 'bird', 'นก', 'yangmingshan', 'หยางหมิงซาน'], colour: true,
    // in flight: bright blue body and wings, black head, red beak and feet, the very long white-tipped tail
    svg: free(P('M120 130l100 70-8 12-104-60z', '#1E88E5') + P('M196 184l20 14-8 12-20-14z', '#fff', 4) + P('M70 120c20-40 80-40 90 0-20 24-70 24-90 0z', '#1E88E5')
      + P('M96 104c10-40 50-60 80-60-10 30-40 50-80 60z', '#42A5F5') + C(66, 104, 26, INK) + P('M42 104l-22 6 22 6z', '#E53935') + face(66, 100, 0.4).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFDF7" stroke="none"')) },
  { id: 'tw.transport.scooter', ch: '🛵', cat: 'transport', file: 'tw/transport-scooter.v1.svg', name: nm('สกู๊ตเตอร์', 'Scooter'), kw: ['scooter', 'สกู๊ตเตอร์', 'motorbike', 'มอเตอร์ไซค์', 'taipei traffic'], colour: true,
    // a round mint scooter seen from the side, a little box on the back, a smiling headlight
    svg: free(P('M50 170c0-40 20-60 50-60h40l20-60h20l-14 70c30 6 40 30 40 50z', '#80CBC4') + R(60, 104, 50, 16, '#5D4037', 8) + R(30, 70, 50, 40, '#FFCC80', 6)
      + C(66, 178, 24, '#5F6B7A') + C(186, 178, 24, '#5F6B7A') + C(66, 178, 8, '#ECEFF1') + C(186, 178, 8, '#ECEFF1') + Lc('M170 50h30', INK, 6) + face(150, 140, 0.55)) },
  { id: 'tw.culture.puppet', cat: 'culture', file: 'tw/culture-puppet.v1.svg', name: nm('หุ่นมือโป้วเต๋ไห่', 'Glove puppet'), kw: ['glove puppet', 'หุ่นมือ', 'budaixi', 'puppet theatre', 'ละครหุ่น'], colour: true,
    // a glove-puppet hero: painted face, golden crown with pom-poms, embroidered robe, a hand inside
    svg: free(P('M70 214c4-50 20-90 50-90s46 40 50 90z', '#C62828') + Lc('M90 150l30 20 30-20', '#FFD54A', 6) + C(120, 92, 34, '#FFE0BD')
      + P('M84 70c0-30 72-30 72 0l-6 8H90z', '#FFD54A') + C(92, 52, 7, '#E53935') + C(148, 52, 7, '#E53935') + C(120, 40, 8, '#1E88E5')
      + P('M98 92c8-6 16-6 20 0M122 92c6-6 14-6 20 0', 'none', 4) + R(96, 200, 48, 22, '#FFE0BD', 10) + face(120, 98, 0.6)) },
  { id: 'tw.culture.umbrella', cat: 'culture', file: 'tw/culture-umbrella.v1.svg', name: nm('ร่มกระดาษน้ำมัน', 'Oil-paper umbrella'), kw: ['paper umbrella', 'ร่มกระดาษ', 'meinong', 'เหม่ยหนง', 'umbrella', 'ร่ม'], colour: true,
    // an open oil-paper umbrella from above at a tilt: ribs, a painted flower, a bamboo handle
    svg: free(Lc('M120 120l40 100', '#A1673F', 7) + E(120, 110, 104, 56, '#FFCA28') + [0, 30, 60, 90, 120, 150].map((a) => { const r = (a * Math.PI) / 180; return Lc(`M120 110L${(120 + Math.cos(r) * 100).toFixed(1)} ${(110 + Math.sin(r) * 54).toFixed(1)}M120 110L${(120 - Math.cos(r) * 100).toFixed(1)} ${(110 - Math.sin(r) * 54).toFixed(1)}`, '#E0A800', 3); }).join('')
      + C(120, 110, 10, '#E53935') + P('M150 90c10-10 26-6 24 6-10 6-20 4-24-6z', '#E57373', 3) + face(120, 136, 0.55)) },
  // ---------- Taipei
  { id: 'tw-taipei.stamp', cat: 'stamp', file: 'tw/taipei/stamp.v1.svg', name: nm('ตราประทับไทเป', 'Taipei stamp'), kw: ['taipei', 'ไทเป'],
    svg: cityStamp('ttp-st', { name: 'TAIPEI', sub: 'TAIWAN', ...K, emblem: [0, 1, 2, 3, 4, 5].map((i) => P(`M86 ${140 - i * 12}l4-12h20l4 12z`, '#4DB6AC')).join('') + R(96, 56, 8, 16, '#4DB6AC') + P('M100 56v-10') + R(60, 140, 80, 6, '#00796B', 2) }) },
  { id: 'tw-taipei.day.jiufen', cat: 'day', file: 'tw/taipei/day-jiufen.v1.svg', name: nm('จิ่วเฟิ่นยามเย็น', 'Jiufen at dusk'), kw: ['jiufen', 'จิ่วเฟิ่น', 'old street', 'ถนนเก่า', 'teahouse', 'โรงน้ำชา', 'a-mei'],
    // the teahouse on the steep hillside stairs, rows of red lanterns glowing, the sea at dusk behind
    svg: scene('ttp-d1', '#FFCCBC', P('M-4 120c60-14 120-14 248 0v20H-4z', '#7986CB') + C(60, 70, 16, '#FFB74D')
      + R(70, 70, 120, 140, '#5D4037') + P('M56 76l74-34 74 34z', '#3E2723') + R(84, 92, 92, 40, '#FFE0B2') + P('M60 132h140l-8 14H68z', '#3E2723') + R(84, 152, 92, 40, '#FFE0B2')
      + [94, 122, 150, 178].map((x) => E(x, 136, 9, 12, '#E53935', 3.5)).join('') + [96, 124, 152].map((x) => E(x + 6, 196, 8, 11, '#E53935', 3.5)).join('')
      + P('M-4 210l80-26h20l-90 40z', '#BCAAA4') + Lc('M10 214l70-24M20 222l70-24', INK, 3)) },
  { id: 'tw-taipei.day.shifen', cat: 'day', file: 'tw/taipei/day-shifen.v1.svg', name: nm('ปล่อยโคมลอยที่สือเฟิ่น', 'Sky lanterns at Shifen'), kw: ['shifen', 'สือเฟิ่น', 'sky lantern', 'โคมลอย', 'pingxi', 'ผิงซี', 'railway', 'ทางรถไฟ'],
    // paper sky lanterns rising over the old railway line that runs between the shops
    svg: scene('ttp-d2', '#B3E5FC', [[70, 70, '#E53935'], [130, 50, '#FFCA28'], [176, 84, '#F48FB1'], [100, 110, '#81C784']].map(([x, y, c]) => P(`M${x - 18} ${y + 22}l-4-34c0-14 44-14 44 0l-4 34z`, c) + E(x, y + 24, 16, 5, '#FFE082', 3)).join('')
      + R(-4, 140, 60, 70, '#A1887F') + R(184, 136, 60, 74, '#90A4AE') + P('M-4 210l92-60h64l92 60z', '#BCAAA4') + Lc('M100 150l-34 60M140 150l34 60', '#5D4037', 6) + Lc('M96 164h48M90 180h60M82 196h76', '#8D6E63', 5)) },
  { id: 'tw-taipei.landmark.taipei101', cat: 'landmark', file: 'tw/taipei/landmark-taipei101.v1.svg', name: nm('ไทเป 101', 'Taipei 101'), kw: ['taipei 101', 'ไทเป 101', 'xinyi', 'ซินอี้', 'skyscraper', 'fireworks'], colour: true, spot: nm('หาตึกที่เหมือนต้นไผ่ซ้อนกัน', 'Find the tower like stacked bamboo'),
    // eight stacked flared sections like bamboo, a podium, the spire
    svg: free(R(70, 196, 100, 24, '#80CBC4', 4) + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => P(`M92 ${196 - i * 18}l-6-18h68l-6 18z`, i % 2 ? '#4DB6AC' : '#80CBC4')).join('')
      + R(108, 42, 24, 14, '#80CBC4', 3) + Lc('M120 42V6', INK, 5) + C(120, 6, 4, '#FFD54A') + face(120, 172, 0.45)) },
  { id: 'tw-taipei.landmark.memorial', cat: 'landmark', file: 'tw/taipei/landmark-memorial.v1.svg', name: nm('อนุสรณ์สถานเจียงไคเช็ก', 'Chiang Kai-shek Memorial Hall'), kw: ['memorial hall', 'อนุสรณ์สถาน', 'chiang kai-shek', 'เจียงไคเช็ก', 'liberty square', 'changing of the guard'], colour: true, spot: nm('หาหลังคาสีน้ำเงินแปดเหลี่ยม', 'Find the blue eight-sided roof'),
    // the white hall on its wide stairs under the octagonal blue roof
    svg: free(P('M20 220l40-50h120l40 50z', '#ECEFF1') + Lc('M44 204h152M56 188h128', '#B0BEC5', 4) + R(66, 104, 108, 66, '#FFFDF7') + R(104, 130, 32, 40, '#1565C0', 3)
      + P('M50 108l70-34 70 34-10 8H60z', '#1565C0') + R(90, 54, 60, 22, '#FFFDF7') + P('M74 60l46-28 46 28-8 6H82z', '#1565C0') + C(120, 28, 6, '#FFD54A') + face(120, 92, 0.45, 'none')) },
  { id: 'tw-taipei.landmark.maokong', cat: 'landmark', file: 'tw/taipei/landmark-maokong.v1.svg', name: nm('กระเช้าเหมาคง', 'Maokong Gondola'), kw: ['maokong', 'เหมาคง', 'gondola', 'กระเช้า', 'tea', 'ชา', 'taipei zoo', 'สวนสัตว์ไทเป'], colour: true, spot: nm('หากระเช้าที่พื้นเป็นกระจก', 'Find the cable car with a glass floor'),
    // a round crystal cabin with a clear floor gliding over rows of green tea bushes
    svg: free(Lc('M4 40l232 34', INK, 5) + Lc('M120 56v28', INK, 6) + R(66, 84, 108, 92, '#FFFDF7', 26) + R(80, 98, 80, 40, '#BFD9F2', 10) + R(84, 150, 72, 20, '#B3E5FC', 8)
      + [40, 90, 140, 190].map((x, i) => E(x, 214 - (i % 2) * 6, 26, 12, '#7CB342')).join('') + face(120, 118, 0.6)) },
  { id: 'tw-taipei.landmark.longshan', cat: 'landmark', file: 'tw/taipei/landmark-longshan.v1.svg', name: nm('วัดหลงซาน', 'Longshan Temple'), kw: ['longshan', 'หลงซาน', 'temple', 'วัด', 'wanhua', 'ว่านหัว'], colour: true, spot: nm('หามังกรบนหลังคา', 'Find the dragons on the roof'),
    // the temple front: swallowtail roof curling up at both ends, two little dragons riding the ridge, red pillars
    svg: free(R(40, 130, 160, 90, '#FFCC80') + [60, 100, 140, 180].map((x) => R(x - 6, 130, 12, 90, '#C62828', 0, 3.5)).join('') + R(96, 160, 48, 60, '#8D6E63', 3)
      + P('M16 124c40 0 64-24 104-24s64 24 104 24l-10-24c-30 6-60-6-94-6s-64 12-94 6z', '#2E7D32') + P('M16 124c-6-10-4-24 6-30M224 124c6-10 4-24-6-30', 'none', 5)
      + P('M70 98c10-16 26-16 30 0-8 4-20 4-30 0zM140 98c10-16 26-16 30 0-8 4-20 4-30 0z', '#4DB6AC', 3.5) + C(120, 88, 8, '#FFCA28') + face(120, 186, 0.5)) },
];
export default {
  places: {
    tw: { country: 'tw', wave: 1, name: nm('ไต้หวัน', 'Taiwan'), tz: 'Asia/Taipei', alias: ['taiwan', 'ไต้หวัน', '台灣'], colors: K },
    'tw-taipei': { country: 'tw', wave: 1, name: nm('ไทเป', 'Taipei'), tz: 'Asia/Taipei', ll: [25.03, 121.56], alias: ['taipei', 'ไทเป', '台北', 'ximending', 'ซีเหมินติง', 'shilin', 'ซื่อหลิน', 'jiufen', 'จิ่วเฟิ่น', 'shifen', 'สือเฟิ่น', 'tamsui', 'ตั้นสุ่ย', 'beitou', 'yehliu', 'เย่หลิ่ว'], colors: K },
  },
  items,
};
