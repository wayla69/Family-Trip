// The Netherlands and Amsterdam — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NL = { k1: '#E65100', k2: '#21468B', k3: '#FFF3E0' };
// a tulip: three cupped petals on a stem with one long leaf
const tulip = (x, y, s, c) => g(x, y, s, Lc('M0 0v-60', '#43A047', 5) + P('M0-20c-20-10-30-30-24-44 14 8 22 24 24 44z', '#66BB6A', 3) + P('M-18-60c0-24 8-34 18-34s18 10 18 34c-6 8-30 8-36 0z', c, 3.5) + P('M-6-90c4 10 4 22 0 30M6-90c-4 10-4 22 0 30', 'none', 2.5));

const items = [
  { id: 'nl.stamp', cat: 'stamp', file: 'nl/stamp.v1.svg', name: nm('ตราประทับเนเธอร์แลนด์', 'Netherlands stamp'), kw: ['netherlands', 'เนเธอร์แลนด์', 'holland', 'ฮอลแลนด์'],
    svg: countryStamp({ name: 'NEDERLAND', ...NL, emblem: tulip(76, 140, 0.8, '#E53935') + tulip(100, 136, 0.95, '#FF9800') + tulip(124, 140, 0.8, '#EC407A') }) },
  { id: 'nl.flag', ch: '🇳🇱', cat: 'flag', file: 'nl/flag.v1.svg', name: nm('ธงเนเธอร์แลนด์', 'Flag of the Netherlands'), kw: ['netherlands', 'เนเธอร์แลนด์', 'holland', 'flag', 'ธง'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF') + P('M44 38c40-12 84 12 126 0s28-4 42 0v37c-14-4 0-12-42 0s-86-12-126 0z', '#AE1C28') + P('M44 112c40-12 84 12 126 0s28-4 42 0v38c-14-4 0-12-42 0s-86-12-126 0z', '#21468B')) },
  { id: 'nl.hello', cat: 'hello', file: 'nl/hello.v1.svg', name: nm('ฮาโล สวัสดี', 'Hallo, hello'), kw: ['hallo', 'ฮาโล', 'hello', 'สวัสดี', 'volendam', 'โฟเลนดัม', 'clogs', 'รองเท้าไม้'],
    // a child in Volendam dress: the white lace cap with upturned wings, a striped skirt, yellow wooden clogs, holding tulips
    svg: free(P('M80 196c0-50 16-80 40-80s40 30 40 80z', '#E53935') + [150, 166, 182].map((y) => Lc(`M84 ${y}h72`, '#212121', 4)).join('') + P('M90 120h60l-6 20H96z', '#FFFFFF') + [92, 128].map((x) => P(`M${x} 214c0-12 6-18 10-18h10c4 0 8 6 8 12z`, '#FFCA28')).join('')
      + C(120, 88, 32, '#FFE0BD') + P('M86 70c0-20 68-20 68 0zM80 74c-14-10-14-26-4-30 6 10 8 20 4 30zM160 74c14-10 14-26 4-30-6 10-8 20-4 30z', '#FFFFFF') + Lc('M100 60h40', '#E0E0E0', 3)
      + tulip(178, 150, 0.6, '#FF9800') + P('M156 150c10-10 18-24 18-30', 'none', 10).replace('fill="none"', 'fill="none" stroke="#FFE0BD"') + face(120, 94, 0.6)) },
  { id: 'nl.food.stroopwafel', cat: 'food', file: 'nl/food-stroopwafel.v1.svg', name: nm('สโตรปวาฟเฟิล', 'Stroopwafel'), kw: ['stroopwafel', 'สโตรปวาฟเฟิล', 'syrup waffle', 'วาฟเฟิลไซรัป', 'market', 'ตลาด'], colour: true,
    // a thin round waffle with a criss-cross pattern, caramel syrup oozing from the middle, resting on a mug
    svg: free(P('M70 150h100l-10 64H80z', '#90A4AE') + Lc('M170 168c20 0 20 30 0 30', INK, 5) + E(120, 120, 92, 40, '#E2A855') + E(120, 128, 92, 40, '#D4943C')
      + Array.from({ length: 6 }, (_, i) => Lc(`M${50 + i * 26} 92l26 60M${76 + i * 26} 92l-26 60`, '#C47F2E', 3)).join('') + P('M40 126c20 8 40 8 60 4 10 10 20 10 30 0 20 4 40 4 66-4', '#B86E1E', 4) + face(120, 116, 0.6)) },
  { id: 'nl.food.cheese', ch: '🧀', cat: 'food', file: 'nl/food-cheese.v1.svg', name: nm('ชีสเกาดา', 'Gouda cheese wheel'), kw: ['gouda', 'เกาดา', 'cheese', 'ชีส', 'edam', 'อีดัม', 'cheese market', 'ตลาดชีส', 'alkmaar'], colour: true,
    // a big yellow cheese wheel in red wax with one wedge cut out to show the holes, and the wedge beside it
    svg: free(P('M30 140c0-50 40-80 90-80s90 30 90 80v20c0 30-40 50-90 50s-90-20-90-50z', '#E53935') + E(120, 140, 90, 50, '#FFD54A') + P('M120 140l70-30c10 10 16 20 20 30z', '#FFF59D')
      + [[90, 130], [140, 150], [70, 154], [110, 166]].map(([x, y]) => E(x, y, 8, 5, '#FFE082', 3)).join('') + P('M170 190l50-30v20l-50 30z', '#FFD54A') + face(110, 140, 0.7)) },
  { id: 'nl.food.poffertjes', cat: 'food', file: 'nl/food-poffertjes.v1.svg', name: nm('ปอฟเฟอร์ตเจส', 'Poffertjes'), kw: ['poffertjes', 'ปอฟเฟอร์ตเจส', 'mini pancakes', 'แพนเค้กจิ๋ว', 'dessert', 'ของหวาน'], colour: true,
    // a pile of puffy mini pancakes dusted with sugar, a melting pat of butter, a tiny fork
    svg: free(E(120, 186, 100, 24, '#FFFFFF') + [[70, 170], [110, 176], [150, 172], [90, 148], [130, 150], [170, 154], [110, 126]].map(([x, y]) => E(x, y, 26, 18, '#E9A64C') + E(x, y - 6, 14, 6, '#FFFFFF', 0)).join('')
      + R(98, 104, 26, 16, '#FFF59D', 4, 3.5) + Lc('M196 120l24-40M204 76l6 10M214 74l4 10', '#90A4AE', 4) + face(130, 150, 0.45)) },
  { id: 'nl.animal.cow', ch: '🐄', cat: 'animal', file: 'nl/animal-cow.v1.svg', name: nm('วัวฟรีเซียน', 'Friesian cow'), kw: ['cow', 'วัว', 'friesian', 'ฟรีเซียน', 'farm', 'ฟาร์ม', 'milk', 'นม'], colour: true,
    // a black-and-white patched cow with a pink nose, a cowbell on a ribbon, grass in its mouth
    svg: free(E(140, 150, 82, 46, '#FFFFFF') + P('M110 120c20-10 40 0 36 20-20 10-40 4-36-20zM170 150c20-6 30 10 20 24-14 4-26-6-20-24z', INK) + [[90, 184], [190, 184]].map(([x, y]) => R(x - 9, y, 18, 30, '#FFFFFF', 6)).join('')
      + P('M40 70l-14-10 10 20zM100 70l14-10-10 20z', '#FFFFFF') + C(70, 104, 40, '#FFFFFF') + P('M50 84c10-14 30-14 34 4-14 8-28 6-34-4z', INK) + E(70, 132, 30, 18, '#F8BBD0') + E(62, 132, 4, 5, INK) + E(78, 132, 4, 5, INK)
      + Lc('M40 70l-16-24M100 70l16-24', '#BCAAA4', 6) + Lc('M50 150q20 10 40 0', '#1E88E5', 4) + C(70, 162, 9, '#FFCA28') + face(70, 104, 0.6)) },
  { id: 'nl.animal.duck', cat: 'animal', file: 'nl/animal-duck.v1.svg', name: nm('เป็ดในคลอง', 'Canal duck'), kw: ['duck', 'เป็ด', 'canal', 'คลอง', 'mallard', 'swan', 'bird'], colour: true,
    // a mallard drake paddling: a glossy green head, a white collar, a chestnut chest, ripples round it
    svg: free(P('M10 196c30-8 60-8 90 0s60 8 90 0 40-6 40 0', 'none', 5).replace('fill="none"', 'fill="none" stroke="#4FC3F7"') + P('M50 180c-10-40 30-60 90-56 40 2 70 20 70 40s-20 20-40 18H70c-10 0-20 0-20-2z', '#ECEFF1')
      + P('M60 150c0-20 20-30 40-26v40c-20 4-40 0-40-14z', '#8D6E63') + P('M150 140c20-6 40 4 50 16-20 6-40 2-50-16z', '#90A4AE') + Lc('M196 150l10-14', '#1E88E5', 4) + C(90, 92, 28, '#2E7D32') + Lc('M70 116c10 6 30 6 40 0', '#FFFFFF', 5)
      + P('M62 96l-24 4 24 8z', '#FFCA28') + face(92, 90, 0.45)) },
  { id: 'nl.transport.bike', ch: '🚲', cat: 'transport', file: 'nl/transport-bike.v1.svg', name: nm('จักรยานดัตช์กับตะกร้าดอกไม้', 'Dutch bike with a flower basket'), kw: ['bike', 'bicycle', 'จักรยาน', 'fiets', 'cycling', 'ปั่นจักรยาน', 'bike lane'], colour: true,
    // an upright black Dutch bike with a big front crate full of tulips and a little bell
    svg: free(C(60, 170, 40, 'none') + C(184, 170, 40, 'none') + C(60, 170, 6, INK, 0) + C(184, 170, 6, INK, 0) + Lc('M60 170l40-70h60l24 70M100 100l26 70h58M150 100l-10-26h20M96 92h-16', INK, 6)
      + R(28, 80, 66, 40, '#C8A26B', 4) + Lc('M28 96h66M50 80v40M72 80v40', '#A1673F', 3) + [40, 60, 80].map((x, i) => P(`M${x - 8} 80c0-16 4-22 8-22s8 6 8 22z`, ['#E53935', '#FFCA28', '#EC407A'][i], 3)).join('') + C(160, 70, 5, '#FFD54A', 3) + face(140, 150, 0.4)) },
  { id: 'nl.culture.clogs', cat: 'culture', file: 'nl/culture-clogs.v1.svg', name: nm('รองเท้าไม้คล็อก', 'Wooden clogs'), kw: ['clogs', 'รองเท้าไม้', 'klompen', 'คล็อก', 'zaanse schans', 'souvenir', 'ของฝาก'], colour: true,
    // a pair of yellow wooden clogs with turned-up toes and painted red-and-blue flowers
    svg: free([[80, 170, -8], [160, 150, 8]].map(([x, y, r]) => g(x, y, 1, P('M-60 20c0-20 10-34 30-36h40c30 0 50 10 50 26v14c0 6-6 10-12 10h-98c-6 0-10-6-10-14z', '#FFCA28') + P('M-50 4c0-16 10-24 24-24h20v24z', '#FFE082') + C(20, 2, 7, '#E53935', 3) + C(36, 6, 5, '#1E88E5', 3) + Lc('M14 12l14-2', '#43A047', 3), r)).join('') + face(80, 186, 0.45) + face(160, 166, 0.45)) },
  // ---------- Amsterdam
  { id: 'nl-amsterdam.stamp', cat: 'stamp', file: 'nl/amsterdam/stamp.v1.svg', name: nm('ตราประทับอัมสเตอร์ดัม', 'Amsterdam stamp'), kw: ['amsterdam', 'อัมสเตอร์ดัม'],
    // three canal-house gables over a little arched bridge
    svg: cityStamp('nam-st', { name: 'AMSTERDAM', sub: 'NEDERLAND', ...NL, emblem: [[70, '#E57373'], [100, '#FFB74D'], [130, '#81C784']].map(([x, c]) => R(x - 14, 70, 28, 56, c) + P(`M${x - 14} 70h6v-6h6v-6h4v6h6v6h6`, c, 2.5) + R(x - 6, 82, 12, 12, '#FFFFFF', 2, 2)).join('') + Lc('M54 140c16-14 76-14 92 0', '#5D4037', 5) }) },
  { id: 'nl-amsterdam.day.canal', cat: 'day', file: 'nl/amsterdam/day-canal.v1.svg', name: nm('คลองอัมสเตอร์ดัม', 'Amsterdam canals'), kw: ['canal', 'คลอง', 'grachten', 'canal cruise', 'ล่องเรือคลอง', 'jordaan', 'houseboat', 'เรือบ้าน'],
    // narrow tilting canal houses, a humpback bridge lined with parked bikes, a glass-roofed tour boat on the water
    svg: scene('nam-d1', '#E3F2FD', [[-4, 50, '#8D6E63'], [40, 40, '#A1887F'], [84, 60, '#6D4C41'], [128, 44, '#8D6E63'], [172, 56, '#795548'], [216, 46, '#A1887F']].map(([x, h, c], i) => R(x, 140 - h - 50, 44, h + 50, c) + P(`M${x} ${90 - h}h8v-8h8v-8h12v8h8v8h8`, c, 3.5) + R(x + 12, 110 - h, 20, 18, '#FFFFFF', 2, 3) + R(x + 12, 140 - h, 20, 18, '#FFFFFF', 2, 3)).join('')
      + Lc('M40 150c40-30 120-30 160 0', '#5D4037', 10) + [70, 96, 144, 170].map((x) => C(x, 132, 8, 'none', 3)).join('') + P('M-4 160h248v90H-4z', '#5C7A99') + P('M50 186h130c10 0 10 14 0 14H50z', '#ECEFF1') + R(70, 172, 90, 14, '#B3E5FC', 6, 3.5)) },
  { id: 'nl-amsterdam.day.tulipfields', cat: 'day', file: 'nl/amsterdam/day-tulipfields.v1.svg', name: nm('ทุ่งทิวลิปกับกังหันลม', 'Tulip fields and a windmill'), kw: ['tulip fields', 'ทุ่งทิวลิป', 'keukenhof', 'เคอเคนฮอฟ', 'lisse', 'windmill', 'กังหันลม', 'spring'],
    // stripes of red, yellow and pink tulips running to the horizon, a black windmill turning
    svg: scene('nam-d2', '#E1F5FE', C(54, 60, 16, '#FFD54A') + P('M150 130l8-60h24l8 60z', '#424242') + P('M150 70l20-16 20 16z', '#424242') + [0, 90, 180, 270].map((a) => `<g transform="translate(170 64) rotate(${a + 20})">${R(-6, -70, 12, 64, '#FFF8E1', 2, 3)}</g>`).join('') + C(170, 64, 6, '#FFD54A')
      + P('M-4 128h248v8H-4z', '#7CB342') + [['#E53935', 136, 146], ['#7CB342', 146, 150], ['#FFEB3B', 150, 164], ['#7CB342', 164, 169], ['#EC407A', 169, 188], ['#7CB342', 188, 194], ['#FF9800', 194, 220], ['#7CB342', 220, 227], ['#E53935', 227, 252]].map(([c, y0, y1]) => P(`M-4 ${y0}Q120 ${y0 - 6} 244 ${y0}V${y1}Q120 ${y1 - 6} -4 ${y1}z`, c, 2.5)).join('')) },
  { id: 'nl-amsterdam.landmark.canalhouses', cat: 'landmark', file: 'nl/amsterdam/landmark-canalhouses.v1.svg', name: nm('บ้านเอียงริมคลอง', 'The dancing canal houses'), kw: ['canal houses', 'บ้านริมคลอง', 'dancing houses', 'บ้านเต้นรำ', 'damrak', 'ดัมรัก', 'gable'], colour: true, spot: nm('หาบ้านแคบๆ ที่เอียงพิงกัน', 'Find the skinny houses leaning on each other'),
    // five skinny gabled houses leaning on each other: step gables, bell gables, the hoisting hook at the top
    svg: free([[30, 160, -4, '#E57373', 's'], [70, 180, 2, '#FFB74D', 'b'], [110, 170, -3, '#4FC3F7', 's'], [150, 186, 3, '#81C784', 'b'], [190, 164, -2, '#BA68C8', 's']].map(([x, h, r, c, k]) => g(x, 220, 1, R(-20, -h, 40, h, c) + (k === 's' ? P(`M-20 ${-h}h6v-10h8v-10h12v10h8v10h6`, c, 4) : P(`M-20 ${-h}c0-10 6-14 10-14 0-10 20-10 20 0 4 0 10 4 10 14`, c, 4)) + R(-10, -h + 20, 20, 22, '#FFFFFF', 2, 3) + R(-10, -h + 60, 20, 22, '#FFFFFF', 2, 3) + Lc(`M0 ${-h - 16}v-8l6 4`, INK, 3), r)).join('') + face(110, 120, 0.4)) },
  { id: 'nl-amsterdam.landmark.rijksmuseum', cat: 'landmark', file: 'nl/amsterdam/landmark-rijksmuseum.v1.svg', name: nm('พิพิธภัณฑ์ไรก์ส', 'Rijksmuseum'), kw: ['rijksmuseum', 'ไรก์สมิวเซียม', 'museum', 'พิพิธภัณฑ์', 'museumplein', 'rembrandt', 'night watch'], colour: true, spot: nm('หาตึกอิฐแดงที่มีหอคอยคู่', 'Find the red-brick palace with twin towers'),
    // the red-brick museum with its two pointed towers and a tunnel arch through the middle for bikes
    svg: free(R(20, 100, 200, 120, '#C0634A') + Lc('M20 130h200M20 160h200', '#A1503B', 3) + [70, 170].map((x) => R(x - 22, 50, 44, 170, '#B5543D') + P(`M${x - 26} 52l26-36 26 36z`, '#37474F') + R(x - 10, 70, 20, 30, '#FFE082', 3, 3)).join('')
      + P('M96 220v-50c0-30 48-30 48 0v50z', '#4E342E') + [30, 120, 210].map((x) => R(x - 8, 114, 16, 20, '#FFE082', 3, 3)).join('') + R(126, 196, 30, 8, INK, 2, 3) + face(120, 140, 0.5)) },
  { id: 'nl-amsterdam.landmark.zaanse', cat: 'landmark', file: 'nl/amsterdam/landmark-zaanse.v1.svg', name: nm('กังหันลมซานส์สคันส์', 'Zaanse Schans windmill'), kw: ['zaanse schans', 'ซานส์สคันส์', 'windmill', 'กังหันลม', 'molen', 'zaandam'], colour: true, spot: nm('หากังหันลมสีเขียวริมน้ำ', 'Find the green windmill by the water'),
    // a green wooden windmill with a balcony ring, four lattice sails, standing over the river bank
    svg: free(P('M10 210c40-8 80-8 110 0s70 8 110 0v14H10z', '#4FC3F7') + P('M76 210l14-110h60l14 110z', '#2E7D32') + R(64, 140, 112, 10, '#8D6E63', 2) + P('M86 100l34-24 34 24z', '#5D4037') + R(108, 176, 24, 34, '#FFFFFF', 4)
      + [0, 90, 180, 270].map((a) => `<g transform="translate(120 88) rotate(${a + 30})">${R(-10, -96, 20, 86, '#FFF8E1', 2, 3.5)}${Lc('M-10-70h20M-10-46h20M0-96v86', '#BCAAA4', 2.5)}</g>`).join('') + C(120, 88, 9, '#FFD54A') + face(120, 120, 0.5)) },
  { id: 'nl-amsterdam.landmark.bikeparking', cat: 'landmark', file: 'nl/amsterdam/landmark-bikeparking.v1.svg', name: nm('ลานจอดจักรยานริมคลอง', 'Bikes on a canal bridge'), kw: ['bike parking', 'ที่จอดจักรยาน', 'bridge', 'สะพาน', 'centraal', 'บิกเกพาร์ค', 'bicycles'], colour: true, spot: nm('นับจักรยานบนสะพาน', 'Count the bikes on the bridge'),
    // a brick humpback bridge over a canal crowded with bikes of every colour leaning on its rail, flower boxes on top
    svg: free(P('M10 210c40-6 80-6 110 0s70 6 110 0v14H10z', '#5C7A99') + P('M10 150c50-40 170-40 220 0v20H10z', '#B5543D') + P('M70 210c0-40 100-40 100 0z', '#5C7A99') + Lc('M10 136c50-40 170-40 220 0', INK, 4)
      + [40, 76, 112, 148, 184].map((x, i) => { const y = 124 - Math.sin((x / 240) * Math.PI) * 30; const c = ['#E53935', '#1E88E5', '#FFCA28', '#43A047', '#EC407A'][i]; return C(x - 10, y, 9, 'none', 3) + C(x + 10, y, 9, 'none', 3) + Lc(`M${x - 10} ${y}l8-12h12l-2 12`, c, 4); }).join('') + face(120, 180, 0.45)) },
];
export default {
  places: {
    nl: { country: 'nl', wave: 1, name: nm('เนเธอร์แลนด์', 'Netherlands'), tz: 'Europe/Amsterdam', alias: ['netherlands', 'เนเธอร์แลนด์', 'holland', 'ฮอลแลนด์', 'dutch'], colors: NL },
    'nl-amsterdam': { country: 'nl', wave: 1, name: nm('อัมสเตอร์ดัม', 'Amsterdam'), tz: 'Europe/Amsterdam', ll: [52.37, 4.9], alias: ['amsterdam', 'อัมสเตอร์ดัม', 'jordaan', 'dam square', 'keukenhof', 'เคอเคนฮอฟ', 'zaanse schans', 'ซานส์สคันส์', 'volendam', 'โฟเลนดัม', 'giethoorn', 'schiphol', 'lisse'], colors: NL },
  },
  items,
};
