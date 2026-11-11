// Italy: Rome, Venice, Florence (with Pisa and Tuscany) — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const IT = { k1: '#2E7D32', k2: '#C62828', k3: '#F1F8E9' };
const RO = { k1: '#BF360C', k2: '#6D4C41', k3: '#FBE9E7' };
const VE = { k1: '#00838F', k2: '#AD1457', k3: '#E0F7FA' };
const FI = { k1: '#C2185B', k2: '#2E7D32', k3: '#FCE4EC' };

const items = [
  { id: 'it.stamp', cat: 'stamp', file: 'it/stamp.v1.svg', name: nm('ตราประทับอิตาลี', 'Italy stamp'), kw: ['italy', 'อิตาลี', 'italia'],
    // an Amalfi lemon branch: two fat lemons with leaves
    svg: countryStamp({ name: 'ITALIA', ...IT, emblem: Lc('M60 60c20 10 50 20 80 18', '#6D4C41', 4) + [[80, 100, -20], [124, 108, 15]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 22, 16, '#FFEB3B') + P('M20-2l8-2-6 6z', '#FFEB3B', 2.5), r)).join('') + [[72, 66], [104, 72], [136, 74]].map(([x, y]) => P(`M${x} ${y}c6-14 20-16 26-10-6 10-16 12-26 10z`, '#43A047', 2.5)).join('') }) },
  { id: 'it.flag', ch: '🇮🇹', cat: 'flag', file: 'it/flag.v1.svg', name: nm('ธงอิตาลี', 'Flag of Italy'), kw: ['italy', 'อิตาลี', 'flag', 'ธง', 'tricolore'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF') + P('M44 38c18-4 36-2 56 2v112c-20-4-38-6-56-2z', '#009246') + P('M170 38c18-6 28-4 42 0v112c-14-4-24-6-42 0z', '#CE2B37')) },
  { id: 'it.hello', cat: 'hello', file: 'it/hello.v1.svg', name: nm('ชาว สวัสดี', 'Ciao, hello'), kw: ['ciao', 'ชาว', 'hello', 'สวัสดี', 'chef', 'pizzaiolo', 'pizza'],
    // a little pizzaiolo: a tall white chef's hat, a red neckerchief, holding up a tiny pizza on a wooden peel
    svg: free(P('M78 214c0-54 16-86 42-86s42 32 42 86z', '#FFFFFF') + P('M100 132l20 18 20-18z', '#E53935') + C(120, 96, 32, '#FFE0BD') + P('M90 76c-14-6-14-28 2-30 0-16 18-22 28-12 10-10 28-4 28 12 16 2 16 24 2 30z', '#FFFFFF') + R(90, 70, 60, 12, '#FFFFFF', 3)
      + Lc('M160 150l40-60', '#A1673F', 6) + E(206, 82, 22, 16, '#FFCC80') + C(206, 82, 14, '#E53935', 3) + [[200, 78], [212, 86]].map(([x, y]) => C(x, y, 3.5, '#FFFFFF', 2)).join('') + face(120, 100, 0.6)) },
  { id: 'it.food.pizza', ch: '🍕', cat: 'food', file: 'it/food-pizza.v1.svg', name: nm('พิซซ่ามาร์เกริต้า', 'Pizza margherita'), kw: ['pizza', 'พิซซ่า', 'margherita', 'มาร์เกริต้า', 'naples', 'เนเปิลส์', 'pizzeria'], colour: true,
    // a round Neapolitan pizza with a puffy charred crust, tomato, white mozzarella pools and basil leaves, one slice pulled out
    svg: free(P('M120 120L30 110a90 90 0 1 1 18 64z', '#F4C47C') + P('M120 120L44 112a76 76 0 1 1 14 54z', '#E53935') + [[150, 80], [170, 140], [110, 170], [90, 70]].map(([x, y]) => E(x, y, 14, 10, '#FFFDF7', 3)).join('') + [[134, 112], [80, 140], [160, 104]].map(([x, y]) => P(`M${x} ${y}c6-8 16-6 16 2-6 6-12 4-16-2z`, '#43A047', 2.5)).join('')
      + [[60, 60], [190, 100], [150, 190]].map(([x, y]) => C(x, y, 4, '#6D4C41', 0)).join('') + g(60, 150, 1, P('M0 0l-50-10c0-20 10-36 26-44z', '#F4C47C') + P('M-6-4l-38-8c2-14 8-24 18-32z', '#E53935') + E(-24, -18, 7, 5, '#FFFDF7', 2.5), 0) + face(150, 134, 0.6)) },
  { id: 'it.food.gelato', ch: '🍨', cat: 'food', file: 'it/food-gelato.v1.svg', name: nm('เจลาโต้', 'Gelato'), kw: ['gelato', 'เจลาโต้', 'ice cream', 'ไอศกรีม', 'gelateria', 'pistachio', 'พิสตาชิโอ'], colour: true,
    // a little paper cup piled with two flat-paddle scoops, pistachio green and strawberry pink, a tiny spade spoon stuck in
    svg: free(P('M66 120h108l-14 90H80z', '#FFF8E1') + Lc('M70 140h100', '#E53935', 5) + P('M60 120c0-30 30-46 60-36 0-26 40-30 54-4 14 16 6 40-16 40z', '#AED581') + P('M60 122c-10-30 20-56 50-40 20-14 40-4 46 10-20 20-60 30-96 30z', '#F48FB1')
      + Lc('M150 90l20-40', '#FFCA28', 7) + R(162, 34, 16, 20, '#FFCA28', 4) + [[90, 96], [120, 84]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('') + face(120, 168, 0.6)) },
  { id: 'it.food.spaghetti', cat: 'food', file: 'it/food-spaghetti.v1.svg', name: nm('สปาเก็ตตี้', 'Spaghetti'), kw: ['spaghetti', 'สปาเก็ตตี้', 'pasta', 'พาสต้า', 'bolognese', 'carbonara', 'trattoria'], colour: true,
    // a heap of spaghetti in tomato sauce twirled on a fork lifted above the bowl, a basil sprig, a sprinkle of cheese
    svg: free(P('M30 120h180c0 50-40 80-90 80s-90-30-90-80z', '#FFFFFF') + Lc('M40 150c20 10 40-10 60 0s40-10 60 0 30-10 40 0', '#00838F', 4) + E(120, 120, 86, 20, '#FFE082')
      + Lc('M60 116c20-10 30 10 50 0s30 10 50 0 30 10 40 0M70 126c20-6 30 6 50 0s30 6 50 0', '#F4C47C', 6) + E(120, 112, 30, 10, '#E53935') + Lc('M150 30v60M144 30v20M156 30v20', '#B0BEC5', 4) + P('M140 90c-10 10-6 20 10 20s20-10 10-20z', '#F4C47C', 3)
      + P('M106 104c6-8 16-6 16 2-6 6-12 4-16-2z', '#43A047', 2.5) + face(120, 160, 0.7)) },
  { id: 'it.animal.cat', ch: '🐈', cat: 'animal', file: 'it/animal-cat.v1.svg', name: nm('แมวโรมัน', 'Roman street cat'), kw: ['cat', 'แมว', 'roman cats', 'แมวโรม', 'largo argentina', 'gatto'], colour: true,
    // a stripy ginger tabby lounging on a broken ancient column, tail curled
    svg: free(R(40, 170, 160, 30, '#ECEFF1', 4) + Lc('M60 170v30M100 170v30M140 170v30M180 170v30', '#CFD8DC', 3) + E(120, 150, 64, 26, '#F4A261') + Lc('M100 130v20M120 128v22M140 130v20', '#E07A3F', 5)
      + P('M184 150c20-4 30 10 24 24-10-4-16-12-24-24z', '#F4A261') + C(70, 120, 30, '#F4A261') + P('M46 102l2-26 18 16zM94 102l-2-26-18 16z', '#F4A261') + Lc('M58 110v8M70 106v8M82 110v8', '#E07A3F', 3) + face(70, 122, 0.55, 'w')) },
  { id: 'it.animal.pigeon', cat: 'animal', file: 'it/animal-pigeon.v1.svg', name: nm('นกพิราบเวนิส', 'Piazza pigeon'), kw: ['pigeon', 'นกพิราบ', 'piazza', 'จัตุรัส', 'st marks square', 'bird', 'นก'], colour: true,
    // a plump grey pigeon with a shimmering green-purple neck, red feet, pecking at a crumb
    svg: free(E(120, 140, 70, 46, '#90A4AE') + P('M150 130c30-10 60 0 70 20-30 10-60 4-70-20z', '#78909C') + Lc('M100 132c20 10 50 10 70 0', '#607D8B', 4) + C(70, 104, 30, '#90A4AE') + P('M54 120c10 10 30 10 40 0 0 10-10 20-20 20s-20-10-20-20z', '#7E57C2')
      + P('M46 104l-18 6 18 6z', '#FFAB91') + Lc('M110 184v20M134 184v20', '#E57373', 4) + C(28, 130, 4, '#FFE082', 2) + face(72, 100, 0.45)) },
  { id: 'it.transport.frecciarossa', cat: 'transport', file: 'it/transport-frecciarossa.v1.svg', name: nm('รถไฟเร็วเฟรชเชียรอสซา', 'Frecciarossa train'), kw: ['frecciarossa', 'เฟรชเชียรอสซา', 'italo', 'trenitalia', 'high-speed train', 'รถไฟความเร็วสูง'], colour: true,
    // the red arrow: a long scarlet train with a pointed silver-grey nose and a dark window band
    svg: free(P('M10 176v-56c0-16 10-26 26-26h120c34 0 64 14 80 46l4 36z', '#D32F2F') + P('M156 94c30 4 54 18 66 42h-66z', '#90A4AE') + R(20, 104, 130, 24, '#37474F', 6) + Lc('M10 156h226', '#ECEFF1', 6)
      + Lc('M60 104v24M100 104v24', '#546E7A', 2.5) + P('M4 190h232') + C(54, 184, 9, '#5F6B7A') + C(168, 184, 9, '#5F6B7A') + face(196, 126, 0.45)) },
  { id: 'it.culture.moka', cat: 'culture', file: 'it/culture-moka.v1.svg', name: nm('หม้อต้มกาแฟโมก้า', 'Moka pot'), kw: ['moka pot', 'หม้อโมก้า', 'espresso', 'เอสเพรสโซ', 'coffee', 'กาแฟ', 'bar', 'cappuccino'], colour: true,
    // the eight-sided aluminium coffee maker, waisted in the middle, a black handle, a puff of steam from its spout
    svg: free(P('M80 210l10-70h60l10 70z', '#B0BEC5') + P('M90 140h60l-6-10H96z', '#90A4AE') + P('M96 130l-6-70h60l-6 70z', '#B0BEC5') + P('M90 60l30-14 30 14z', '#90A4AE') + C(120, 44, 6, INK)
      + Lc('M150 70c30 0 30 50 0 60', INK, 9) + P('M90 66l-20-10 6 18z', '#90A4AE') + Lc('M74 50c-6-10 4-16 0-26', '#CFD8DC', 4) + Lc('M110 60v70M130 60v70', '#CFD8DC', 3) + face(120, 172, 0.6)) },
  { id: 'it.culture.carnivalmask', cat: 'culture', file: 'it/culture-carnivalmask.v1.svg', name: nm('หน้ากากคาร์นิวัลเวนิส', 'Venetian carnival mask'), kw: ['carnival mask', 'หน้ากากคาร์นิวัล', 'carnevale', 'venice carnival', 'คาร์นิวัลเวนิส', 'masquerade'], colour: true,
    // a gold-and-purple eye mask with swirls, sequins and a tall feather plume, held on a ribbon stick
    svg: free(Lc('M60 150l-30 70', '#8D6E63', 5) + P('M40 110c20-30 60-40 80-20 20-20 60-10 80 20-10 30-40 40-60 30-10 10-30 10-40 0-20 10-50 0-60-30z', '#7E57C2') + P('M40 110c20-30 60-40 80-20 20-20 60-10 80 20', 'none', 0).replace('stroke-width="0"', 'stroke="#FFD54A" stroke-width="6"')
      + E(86, 112, 16, 10, '#FFFFFF') + E(154, 112, 16, 10, '#FFFFFF') + [[60, 100], [180, 100], [120, 128]].map(([x, y]) => C(x, y, 4, '#FFD54A', 2.5)).join('') + P('M180 90c10-40 30-60 50-70-10 30-24 54-44 76z', '#EC407A') + P('M170 92c4-40 16-64 30-74-4 30-12 54-26 78z', '#4FC3F7', 3)
      + face(120, 112, 0.35, 'none')) },
  // ---------- Rome
  { id: 'it-rome.stamp', cat: 'stamp', file: 'it/rome/stamp.v1.svg', name: nm('ตราประทับโรม', 'Rome stamp'), kw: ['rome', 'roma', 'โรม'],
    svg: cityStamp('iro-st', { name: 'ROMA', sub: 'ITALIA', ...RO, emblem: P('M54 140v-52c26-16 66-16 92 0v52z', '#E0C48C') + [0, 1].map((r) => Array.from({ length: 5 }, (_, i) => P(`M${62 + i * 16} ${134 - r * 22}v-8c0-6 8-6 8 0v8z`, '#8D6E63', 2)).join('')).join('') + P('M54 88l12-16h40', '#E0C48C', 3) }) },
  { id: 'it-rome.day.trevi', cat: 'day', file: 'it/rome/day-trevi.v1.svg', name: nm('โยนเหรียญที่น้ำพุเทรวี', 'A coin in the Trevi Fountain'), kw: ['trevi', 'เทรวี', 'trevi fountain', 'น้ำพุเทรวี', 'coin toss', 'โยนเหรียญ', 'wish', 'อธิษฐาน'],
    // the grand palace-front fountain: the sea god in his niche, water cascading over rocks into the turquoise pool, a coin in the air
    svg: scene('iro-d1', '#FFF8E1', R(-4, 20, 248, 130, '#F3E5C2') + Array.from({ length: 6 }, (_, i) => R(10 + i * 40, 30, 12, 110, '#E8D5A3', 0, 3)).join('') + P('M96 140v-60c0-20 48-20 48 0v60z', '#E8D5A3') + C(120, 96, 10, '#FFFFFF', 3) + R(110, 106, 20, 30, '#FFFFFF', 4, 3)
      + P('M-4 150c40-10 70 0 90 10l30-6 40 4 30-8c20-4 40 0 58 4v20H-4z', '#BCAAA4') + Lc('M80 150c0 10 4 20 10 30M150 150c0 10-4 20-10 30M120 140v40', '#B3E5FC', 6) + P('M-4 176h248v80H-4z', '#4DD0E1')
      + C(176, 84, 8, '#FFD54A', 3) + Lc('M184 92l20 14', '#FFE082', 2) + Lc('M30 196h20M190 210h24', '#E0F7FA', 4)) },
  { id: 'it-rome.landmark.colosseum', cat: 'landmark', file: 'it/rome/landmark-colosseum.v1.svg', name: nm('โคลอสเซียม', 'The Colosseum'), kw: ['colosseum', 'โคลอสเซียม', 'colosseo', 'roman forum', 'gladiator', 'กลาดิเอเตอร์', 'arena'], colour: true, spot: nm('หาสนามกีฬาโบราณที่มีประตูโค้งหลายชั้น', 'Find the old arena with rows of arches'),
    // the great oval of arches in three storeys, the broken top where one side has crumbled lower, a cypress beside it
    svg: free(P('M20 210v-140c50-28 150-28 200 0v40l-40 10v-20c-40-10-100-10-140 0v110z', '#E0C48C') + P('M180 120l40-10v100h-40z', '#E0C48C') + P('M20 210h200', 'none')
      + [0, 1, 2].map((r) => Array.from({ length: 6 }, (_, i) => P(`M${32 + i * 30} ${200 - r * 40}v-18c0-12 18-12 18 0v18z`, '#8D6E63', 3.5)).join('')).join('') + Lc('M20 160h200M20 120h160', '#C8A26B', 4) + P('M226 210c-10-40-10-80 0-120 10 40 10 80 0 120z', '#2E7D32') + face(110, 140, 0.45, 'none')) },
  { id: 'it-rome.landmark.pantheon', cat: 'landmark', file: 'it/rome/landmark-pantheon.v1.svg', name: nm('วิหารแพนธีออน', 'The Pantheon'), kw: ['pantheon', 'แพนธีออน', 'piazza della rotonda', 'dome', 'โดม', 'columns', 'เสา'], colour: true, spot: nm('หาวิหารที่มีเสาหินเรียงหน้าและโดมกลม', 'Find the temple with a row of columns and a round dome'),
    // the columned porch with its triangle pediment in front of the round drum and flat dome, a fountain with an obelisk in the piazza
    svg: free(P('M40 110c0-60 160-60 160 0z', '#D7C9AE') + R(40, 110, 160, 30, '#D7C9AE') + P('M30 116l90-40 90 40z', '#E8DCC6') + R(36, 116, 168, 10, '#E8DCC6', 2)
      + Array.from({ length: 8 }, (_, i) => R(46 + i * 20, 126, 10, 74, '#F3E5C2', 0, 3)).join('') + R(30, 200, 180, 12, '#E8DCC6', 2) + E(212, 210, 22, 8, '#4DD0E1') + R(208, 150, 8, 56, '#E8DCC6', 0, 3) + face(120, 98, 0.45)) },
  { id: 'it-rome.landmark.bocca', cat: 'landmark', file: 'it/rome/landmark-bocca.v1.svg', name: nm('ปากแห่งความจริง', 'The Mouth of Truth'), kw: ['bocca della verita', 'bocca della verità', 'ปากแห่งความจริง', 'mouth of truth', 'santa maria in cosmedin', 'roman holiday'], colour: true, spot: nm('หาหน้ากากหินที่ต้องเอามือใส่ปาก', 'Find the stone face you put your hand in'),
    // the big round marble face with its open mouth, a little hand going in (it only nips liars, and it's only pretend)
    svg: free(C(120, 120, 96, '#ECEFF1') + C(120, 120, 84, '#E0E0E0', 3) + P('M70 80c10-10 26-10 30 0M140 80c4-10 20-10 30 0', 'none', 5) + C(86, 96, 12, '#9E9E9E') + C(154, 96, 12, '#9E9E9E') + P('M112 100l8 24 8-24', 'none', 4)
      + E(120, 160, 26, 18, '#616161') + Lc('M60 60c10-20 20-30 30-36M150 24c10 6 20 16 30 36', '#BDBDBD', 4) + P('M120 160c-6-24 16-40 30-50 6 10-8 26-14 40z', '#FFE0BD') + Lc('M70 190c20 10 80 10 100 0', '#BDBDBD', 4)) },
  // ---------- Venice
  { id: 'it-venice.stamp', cat: 'stamp', file: 'it/venice/stamp.v1.svg', name: nm('ตราประทับเวนิส', 'Venice stamp'), kw: ['venice', 'venezia', 'เวนิส'],
    svg: cityStamp('ive-st', { name: 'VENEZIA', sub: 'ITALIA', ...VE, emblem: P('M54 124c20 10 70 10 92-4l-4 8c-20 12-66 12-86 2z', INK, 2) + Lc('M136 120l16-50', '#8D6E63', 3) + C(96, 110, 6, '#FFE0BD', 2) + R(90, 114, 12, 10, '#FFFFFF', 2, 2) + Lc('M90 116h12M90 120h12', '#C62828', 2) + E(96, 104, 10, 3, '#FFD54A', 2) + Lc('M52 132c16-4 32-4 48 0s32 4 50 0', '#00838F', 3) }) },
  { id: 'it-venice.day.grandcanal', cat: 'day', file: 'it/venice/day-grandcanal.v1.svg', name: nm('คลองใหญ่กับสะพานริอัลโต', 'The Grand Canal and the Rialto'), kw: ['grand canal', 'คลองใหญ่', 'canal grande', 'rialto', 'ริอัลโต', 'vaporetto', 'water bus', 'เรือเมล์'],
    // pastel palaces with pointed windows lining the canal, the white stone arch of the Rialto, striped mooring poles, a water bus
    svg: scene('ive-d1', '#E1F5FE', [[-4, '#F8BBD0'], [44, '#FFE0B2'], [176, '#FFCCBC'], [212, '#FFF9C4']].map(([x, c]) => R(x, 50, 36, 110, c) + [70, 104].map((y) => P(`M${x + 8} ${y + 20}v-12c0-8 8-14 10-14s10 6 10 14v12z`, '#BBDEFB', 3)).join('')).join('')
      + P('M70 150c0-50 100-50 100 0h-14c0-30-72-30-72 0z', '#F5F5F5') + R(96, 92, 48, 18, '#F5F5F5') + P('M92 94l28-14 28 14z', '#E57373') + P('M-4 160h248v90H-4z', '#26A69A')
      + [[40, 150], [196, 150]].map(([x, y]) => Lc(`M${x} ${y}v40`, '#FFFFFF', 7) + [0, 1, 2].map((i) => Lc(`M${x - 3} ${y + 6 + i * 12}l6 6`, '#1E88E5', 4)).join('')).join('') + R(76, 190, 90, 18, '#ECEFF1', 6) + R(86, 182, 50, 10, '#FFCA28', 3, 3)) },
  { id: 'it-venice.landmark.gondola', cat: 'landmark', file: 'it/venice/landmark-gondola.v1.svg', name: nm('เรือกอนโดลา', 'A gondola and its gondolier'), kw: ['gondola', 'กอนโดลา', 'gondolier', 'คนพายเรือ', 'gondola ride', 'นั่งเรือกอนโดลา'], colour: true, spot: nm('หาเรือสีดำที่คนพายใส่เสื้อลายทาง', 'Find the black boat rowed by someone in stripes'),
    // the long black gondola curling up at both ends with its silver comb-shaped prow, a gondolier in stripes and a straw boater rowing at the back
    svg: free(P('M10 196c40-6 80-6 110 0s70 6 110 0v24H10z', '#26A69A') + P('M10 170c40 20 160 20 210 0l6-30c-6 30-40 44-90 44H60c-30 0-50-10-50-14z', INK) + P('M18 168l-8-36 10 4 2-8 6 6 2-8 6 6z', '#ECEFF1', 3)
      + R(80, 156, 40, 16, '#C62828', 4) + C(186, 96, 14, '#FFE0BD') + E(186, 84, 22, 5, '#FFE082') + R(176, 74, 20, 10, '#FFE082', 2, 3) + Lc('M184 80h4', '#1E88E5', 3) + R(174, 110, 26, 40, '#FFFFFF', 4) + [118, 128, 138].map((y) => Lc(`M174 ${y}h26`, INK, 3)).join('')
      + Lc('M200 120l-40 80', '#8D6E63', 5) + face(186, 98, 0.35)) },
  { id: 'it-venice.landmark.stmarks', cat: 'landmark', file: 'it/venice/landmark-stmarks.v1.svg', name: nm('หอระฆังจัตุรัสซานมาร์โก', 'St Mark\'s bell tower'), kw: ['st marks', 'ซานมาร์โก', 'san marco', 'campanile', 'หอระฆัง', 'piazza san marco', 'pigeons'], colour: true, spot: nm('หาหอระฆังอิฐสูงที่ยอดเป็นสีเขียว', 'Find the tall brick tower with a green pointed top'),
    // the tall red-brick campanile with its white belfry arches and green pyramid spire topped by a golden angel, the domes beside
    svg: free(R(106, 70, 40, 150, '#C0634A') + Lc('M116 80v120M136 80v120', '#A1503B', 3) + R(100, 52, 52, 22, '#F5F5F5') + [112, 126, 140].map((x) => P(`M${x - 4} 72v-14c0-6 8-6 8 0v14z`, '#90A4AE', 2.5)).join('') + R(104, 40, 44, 14, '#E8DCC6')
      + P('M108 40l18-30 18 30z', '#4DB6AC') + P('M120 10l6-8 6 8z', '#FFD54A', 2.5) + [[40, 160], [70, 150]].map(([x, y]) => P(`M${x - 22} ${y + 10}c0-30 44-30 44 0z`, '#B0BEC5')).join('') + R(14, 160, 86, 60, '#F3E5C2') + face(126, 170, 0.45)) },
  { id: 'it-venice.landmark.burano', cat: 'landmark', file: 'it/venice/landmark-burano.v1.svg', name: nm('บ้านหลากสีเกาะบูราโน', 'Burano\'s colourful houses'), kw: ['burano', 'บูราโน', 'colourful houses', 'บ้านหลากสี', 'lace', 'ลูกไม้', 'murano', 'island'], colour: true, spot: nm('หาบ้านที่ทาสีสดๆ ริมคลอง', 'Find the brightly painted houses by the canal'),
    // a row of boxy fisherman's houses painted every bright colour, green shutters, washing on a line, little boats tied up
    svg: free([[14, '#E53935'], [54, '#FFEB3B'], [94, '#42A5F5'], [134, '#EC407A'], [174, '#66BB6A']].map(([x, c], i) => R(x, 80 + (i % 2) * 10, 40, 120 - (i % 2) * 10, c) + R(x + 10, 100 + (i % 2) * 10, 20, 20, '#FFFFFF', 2, 3) + Lc(`M${x + 8} ${100 + (i % 2) * 10}v20M${x + 32} ${100 + (i % 2) * 10}v20`, '#2E7D32', 4) + R(x + 12, 160, 16, 40, '#5D4037', 2, 3)).join('')
      + Lc('M30 140c40 10 80 10 120 0', INK, 2) + [[60, 146, '#FFFFFF'], [100, 148, '#FFCA28']].map(([x, y, c]) => R(x, y, 12, 14, c, 2, 2.5)).join('') + P('M10 200h220v24H10z', '#26A69A') + P('M40 200h40l-6 8H46z', '#1E88E5', 3) + face(114, 132, 0.4)) },
  // ---------- Florence (with Pisa and Tuscany)
  { id: 'it-florence.stamp', cat: 'stamp', file: 'it/florence/stamp.v1.svg', name: nm('ตราประทับฟลอเรนซ์', 'Florence stamp'), kw: ['florence', 'firenze', 'ฟลอเรนซ์', 'tuscany', 'ทัสคานี'],
    svg: cityStamp('ifl-st', { name: 'FIRENZE', sub: 'TOSCANA', ...FI, emblem: R(60, 112, 80, 28, '#F3E5C2') + Lc('M60 124h80', '#2E7D32', 3) + P('M68 112c0-46 64-46 64 0z', '#E64A19') + Lc('M84 74c0 10 0 26 0 38M116 74c0 10 0 26 0 38M100 66v46', '#FFFFFF', 2) + R(94, 58, 12, 10, '#FFFFFF', 1, 2) }) },
  { id: 'it-florence.day.pontevecchio', cat: 'day', file: 'it/florence/day-pontevecchio.v1.svg', name: nm('สะพานปอนเตเวกคีโอยามเย็น', 'Ponte Vecchio at sunset'), kw: ['ponte vecchio', 'ปอนเตเวกคีโอ', 'arno', 'แม่น้ำอาร์โน', 'old bridge', 'สะพานเก่า', 'sunset'],
    // the old bridge with little shops perched along it in ochre and orange, three arches over the Arno, the Duomo far behind in the sunset
    svg: scene('ifl-d1', '#FFCC80', P('M150 90c0-30 50-30 50 0z', '#E64A19') + R(150, 90, 50, 20, '#F3E5C2') + P('M-4 110h248v20H-4z', '#D7C9AE')
      + [[10, '#FFB74D'], [52, '#FFE0B2'], [94, '#FFCC80'], [136, '#FFB74D'], [178, '#FFE0B2']].map(([x, c]) => R(x, 104, 40, 40, c) + R(x + 12, 112, 14, 14, '#5D4037', 2, 3)).join('') + R(-4, 140, 248, 14, '#D7A86E')
      + [20, 100, 180].map((x) => P(`M${x} 200v-46h60v46c0-30-60-30-60 0z`, '#D7A86E')).join('') + P('M-4 196h248v60H-4z', '#4DB6AC') + Lc('M30 214h30M160 220h40', '#FFE0B2', 4)) },
  { id: 'it-florence.landmark.duomo', cat: 'landmark', file: 'it/florence/landmark-duomo.v1.svg', name: nm('มหาวิหารฟลอเรนซ์กับโดมบรูเนลเลสกี', 'Florence Cathedral dome'), kw: ['duomo', 'ดูโอโม', 'florence cathedral', 'มหาวิหารฟลอเรนซ์', 'brunelleschi', 'บรูเนลเลสกี', 'giotto bell tower'], colour: true, spot: nm('หาโดมสีส้มที่ใหญ่ที่สุดในเมือง', 'Find the biggest orange dome in town'),
    // the great terracotta-red dome with its white ribs and lantern on top of the striped green-pink-and-white cathedral, Giotto's bell tower beside
    svg: free(R(30, 140, 150, 80, '#FAFAFA') + Lc('M30 160h150M30 190h150', '#2E7D32', 4) + [60, 100, 140].map((x) => R(x - 8, 166, 16, 20, '#F48FB1', 3, 3)).join('') + R(70, 110, 70, 34, '#FAFAFA') + Lc('M70 126h70', '#2E7D32', 4)
      + P('M66 110c0-90 78-90 78 0z', '#E64A19') + Lc('M84 40c-4 20-6 50-6 70M126 40c4 20 6 50 6 70M105 30v80', '#FFFFFF', 4) + R(96, 18, 18, 18, '#FAFAFA', 2) + P('M96 18l9-12 9 12z', '#FAFAFA', 3)
      + R(186, 50, 34, 170, '#FAFAFA') + [80, 120, 160].map((y) => Lc(`M186 ${y}h34`, '#2E7D32', 4)).join('') + R(196, 60, 14, 20, '#F48FB1', 3, 3) + face(105, 80, 0.45)) },
  { id: 'it-florence.landmark.pisa', cat: 'landmark', file: 'it/florence/landmark-pisa.v1.svg', name: nm('หอเอนปิซา', 'The Leaning Tower of Pisa'), kw: ['leaning tower', 'หอเอน', 'pisa', 'ปิซา', 'piazza dei miracoli', 'torre pendente'], colour: true, spot: nm('หาหอคอยที่เอียง', 'Find the tower that leans'),
    // the round white tower leaning over, ringed with six storeys of little arches, a child pretending to hold it up
    svg: free(`<g transform="translate(110 214) rotate(8)">${R(-30, -190, 60, 190, '#FAFAFA')}${Array.from({ length: 6 }, (_, k) => Lc(`M-30 ${-28 - k * 28}h60`, '#D7C9AE', 3) + [-20, -6, 8, 22].map((dx) => P(`M${dx - 3} ${-4 - k * 28}v-14c0-6 6-6 6 0v14z`, '#BDBDBD', 2)).join('')).join('')}${R(-22, -210, 44, 20, '#FAFAFA')}${face(0, -100, 0.5)}</g>`
      + C(190, 160, 12, '#FFE0BD', 3) + R(182, 172, 16, 30, '#42A5F5', 4, 3) + Lc('M184 178l-24-34', '#FFE0BD', 6) + Lc('M186 202l-6 16M194 202l6 16', INK, 4) + face(190, 160, 0.25)) },
  { id: 'it-florence.landmark.tuscany', cat: 'landmark', file: 'it/florence/landmark-tuscany.v1.svg', name: nm('เนินเขาทัสคานีกับต้นสน', 'Tuscan hills and cypresses'), kw: ['tuscany', 'ทัสคานี', 'val dorcia', "val d'orcia", 'cypress', 'ต้นสนไซเปรส', 'sunflowers', 'ทานตะวัน', 'countryside', 'chianti'], colour: true, spot: nm('หาต้นไม้สูงแหลมเรียงแถวบนเนินเขา', 'Find the row of tall pointy trees on the hill'),
    // rolling golden hills, a farmhouse on top, a winding white road lined with dark cypress candles, sunflowers in front
    svg: free(P('M10 150c40-40 80-50 120-30s70 0 100-20v100H10z', '#C5E1A5') + P('M10 180c50-30 110-20 220-10v40H10z', '#E9C46A') + R(150, 92, 40, 26, '#F4C99A') + P('M146 94l24-14 24 14z', '#BF360C')
      + Lc('M40 210c30-20 60-30 80-50s50-30 70-50', '#FAFAFA', 6) + [[70, 168], [96, 150], [124, 132], [150, 120]].map(([x, y]) => P(`M${x} ${y}c-8-20-8-40 0-60 8 20 8 40 0 60z`, '#1B5E20')).join('')
      + [[30, 206], [200, 204]].map(([x, y]) => Lc(`M${x} ${y + 14}v-14`, '#558B2F', 4) + C(x, y - 6, 10, '#FFCA28', 3) + C(x, y - 6, 4, '#6D4C41', 0)).join('') + face(170, 108, 0.35, 'none')) },
];
export default {
  places: {
    it: { country: 'it', wave: 1, name: nm('อิตาลี', 'Italy'), tz: 'Europe/Rome', alias: ['italy', 'อิตาลี', 'italia'], colors: IT },
    'it-rome': { country: 'it', wave: 1, name: nm('โรม', 'Rome'), tz: 'Europe/Rome', ll: [41.9, 12.5], alias: ['rome', 'roma', 'โรม', 'colosseum', 'โคลอสเซียม', 'trevi', 'เทรวี', 'pantheon', 'vatican', 'วาติกัน', 'trastevere', 'spanish steps', 'piazza navona'], colors: RO },
    'it-venice': { country: 'it', wave: 1, name: nm('เวนิส', 'Venice'), tz: 'Europe/Rome', ll: [45.44, 12.34], alias: ['venice', 'venezia', 'เวนิส', 'rialto', 'ริอัลโต', 'san marco', 'ซานมาร์โก', 'burano', 'บูราโน', 'murano', 'มูราโน', 'Lido', 'grand canal'], colors: VE },
    'it-florence': { country: 'it', wave: 1, name: nm('ฟลอเรนซ์และทัสคานี', 'Florence & Tuscany'), tz: 'Europe/Rome', ll: [43.77, 11.25], alias: ['florence', 'firenze', 'ฟลอเรนซ์', 'tuscany', 'toscana', 'ทัสคานี', 'pisa', 'ปิซา', 'siena', 'เซียนา', 'chianti', 'val dorcia', 'uffizi', 'ponte vecchio', 'san gimignano'], colors: FI },
  },
  items,
};
