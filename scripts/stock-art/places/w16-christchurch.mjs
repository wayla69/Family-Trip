// Wave 16: Christchurch (Ōtautahi) with Akaroa, Lyttelton and Banks Peninsula — the garden city on the Avon:
// punts under the willows, the heritage tram on New Regent Street, the Peacock Fountain, Margaret Mahy playground,
// Cave Rock at Sumner, Hector's dolphins and the Giant's House at Akaroa, the Lyttelton timeball, an Afghan biscuit.
// Skipped as repeats or bans: the earthquake and its damage (Quake City, the old cathedral, the 185 chairs), the Bridge of
// Remembrance and the Air Force Museum (war), the Cardboard Cathedral (a church as the subject), the Port Hills gondola
// (Queenstown and others have one), the kiwi, takahē, kea and pāua (already drawn for New Zealand), the Akaroa lighthouse
// (lighthouses everywhere), Canterbury lamb and fish and chips (generic), Orana's lions and giraffes (any zoo).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const CH = { k1: '#C62828', k2: '#2E7D32', k3: '#F1F8E9' };
const T = 'nz/christchurch/';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `nz-christchurch.landmark.${slug}`, cat: 'landmark', file: `${T}landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
// a little cottage of Akaroa: white wall, coloured roof
const cot = (x, y, c, s = 1) => g(x, y, s, R(-7, -5, 14, 10, '#FFFFFF', 0, 2.5) + P('M-9-5l9-7 9 7z', c, 2.5));
// a weeping willow's crown: a dome whose hem hangs in tassels (w wide, from x, top y, h tall)
const willow = (x, y, w, h, c) => P(`M${x} ${y + h}c0-${h * 0.9} ${w * 0.15}-${h} ${w / 2}-${h}s${w / 2} ${h * 0.1} ${w / 2} ${h}`
  + ring(5, () => `l-${w / 10} -${h * 0.25}l-${w / 10} ${h * 0.25}`) + 'z', c);

const items = [
  { id: 'nz-christchurch.stamp', cat: 'stamp', file: T + 'stamp.v1.svg', name: nm('ตราประทับไครสต์เชิร์ช', 'Christchurch stamp'), kw: ['christchurch', 'ไครสต์เชิร์ช', 'otautahi', 'โอเตาตาฮิ', 'avon river', 'แม่น้ำเอวอน', 'punt', 'เรือพันต์', 'garden city', 'เมืองแห่งสวน', 'canterbury nz'],
    // a punt gliding on the river under a weeping willow, the punter in a straw boater pushing a long pole
    svg: cityStamp('chc-st', { name: 'CHRISTCHURCH', sub: 'NEW ZEALAND', ...CH, emblem: P('M48 110h104c-6 22-28 34-52 34s-46-12-52-34z', '#4FC3F7', 0)
      + Lc('M64 112V80', '#6D4C41', 4) + willow(48, 62, 34, 40, '#9CCC65')
      + R(120, 96, 10, 14, '#FFFFFF', 2, 2) + C(125, 90, 5, '#F1C9A5', 2) + E(125, 85, 8, 2.5, '#FFE082', 2) + R(121, 80, 8, 5, '#FFE082', 1, 2)
      + Lc('M140 74l-8 44', '#5D4037', 3) + P('M84 110h64l-6 8H90z', '#A1887F') + Lc('M60 128c6-3 12 3 18 0M112 132c6-3 12 3 18 0', '#E1F5FE', 2.5) + face(110, 114, 0.18, 'none') }) },
  { id: 'nz-christchurch.day.avon', cat: 'day', file: T + 'day-avon.v1.svg', name: nm('ล่องเรือพันต์บนแม่น้ำเอวอน', 'Punting on the Avon'), kw: ['avon river', 'แม่น้ำเอวอน', 'otakaro', 'โอตาคาโร', 'punting', 'ล่องเรือพันต์', 'punt', 'เรือพันต์', 'willow trees', 'ต้นหลิว', 'christchurch', 'ไครสต์เชิร์ช', 'botanic gardens', 'สวนพฤกษศาสตร์', 'ducks', 'เป็ด'],
    // a calm green river between weeping willows, a flat wooden punt with two children sitting in it, the punter standing at the back in a striped vest and straw boater, a duck swimming by
    svg: scene('chc-d1', '#DCEDC8', C(70, 86, 24, '#81C784', 0) + C(110, 80, 20, '#66BB6A', 0) + C(150, 84, 22, '#81C784', 0) + R(-4, 104, 248, 40, '#9CCC65')
      + P('M-4 136c60-10 180-10 248 0v114H-4z', '#4DB6AC') + ring(4, (k) => Lc(`M${20 + k * 56} ${206 + (k % 2) * 14}c10-5 20 5 30 0`, '#B2DFDB', 3))
      + Lc('M22 170c4-30 0-60 10-92', '#6D4C41', 8) + willow(-14, 52, 80, 90, '#AED581') + Lc('M218 170c-4-30 0-60-10-92', '#6D4C41', 8) + willow(178, 52, 80, 90, '#AED581')
      + R(77, 160, 14, 14, '#FFCA28', 3, 2.5) + C(84, 152, 8, '#F1C9A5', 2.5) + face(84, 153, 0.2) + R(101, 160, 14, 14, '#EF5350', 3, 2.5) + C(108, 152, 8, '#F1C9A5', 2.5) + face(108, 153, 0.2)
      + R(158, 150, 12, 22, '#37474F', 2, 2.5) + R(155, 126, 18, 26, '#FFFFFF', 3, 2.5) + Lc('M156 133h16M156 140h16M156 147h16', '#C62828', 2.5)
      + C(164, 116, 9, '#F1C9A5', 2.5) + face(164, 117, 0.22) + E(164, 108, 14, 3.5, '#FFE082', 2.5) + R(156, 100, 16, 8, '#FFE082', 2, 2.5)
      + ol('M186 92l-10 112', '#8D6E63', 4) + R(56, 170, 128, 8, '#8D6E63', 2) + P('M52 178h136l-12 12H64z', '#A1887F')
      + g(40, 214, 1, E(0, 0, 12, 7, '#A1887F', 2.5) + C(10, -7, 5, '#2E7D32', 2.5) + P('M14-7l7 1-7 3z', '#FFB300', 2))) },
  { id: 'nz-christchurch.day.akaroa', cat: 'day', file: T + 'day-akaroa.v1.svg', name: nm('อ่าวอาคาโรอาบนคาบสมุทรแบงส์', 'Akaroa Harbour on Banks Peninsula'), kw: ['akaroa', 'อาคาโรอา', 'akaroa harbour', 'อ่าวอาคาโรอา', 'banks peninsula', 'คาบสมุทรแบงส์', 'old volcano', 'ภูเขาไฟเก่า', 'green hills', 'เนินเขาเขียว', 'harbour cruise', 'ล่องเรือในอ่าว', 'hectors dolphins', 'โลมาเฮกเตอร์'],
    // a deep blue harbour ringed by rolling green hills of an old volcano, little cottages with red and blue roofs on the shore, a white sailing boat and two small dolphins with round fins
    svg: scene('chc-d2', '#B3E5FC', C(60, 54, 14, '#FFF59D', 0) + P('M-4 98c40-24 70-20 100-6 30-16 60-18 90-4 20-6 40-4 58 4v40H-4z', '#7CB342')
      + P('M-4 112c30-28 60-36 90-20 20-20 50-24 76-8 24-18 56-14 82 6v40H-4z', '#9CCC65') + P('M-4 132c60-8 180-8 248 0v118H-4z', '#29B6F6')
      + P('M-4 146c30-6 62 0 72 20 8 18-12 40-72 64z', '#8BC34A') + P('M244 164c-30-4-60 4-66 24-4 16 20 40 66 46z', '#9CCC65')
      + [[12, 158, '#E53935'], [30, 162, '#1E88E5'], [20, 180, '#FFB300'], [44, 178, '#E53935'], [204, 186, '#1E88E5'], [224, 182, '#E53935']].map(([x, y, c]) => cot(x, y, c, 1.1)).join('')
      + P('M98 160h44l-7 9h-30z', '#FFFFFF') + Lc('M120 160V116', INK, 3) + P('M122 156V118l20 36z', '#FFFFFF') + P('M118 156V124l-16 30z', '#FFCDD2')
      + P('M148 204c8-18 30-20 40-4-8-2-14 2-18 6-6-6-12-6-22-2z', '#B0BEC5') + P('M164 190c0-9 7-13 13-11-2 4-2 7 0 11z', '#37474F') + face(172, 198, 0.16, 'none')
      + P('M86 218c6-12 22-14 30-3-6-1-10 1-13 4-5-4-9-4-17-1z', '#B0BEC5') + P('M98 209c0-7 5-9 9-8-1 3-1 5 0 8z', '#37474F')
      + Lc('M60 196c8-4 16 4 24 0M190 218c8-4 16 4 24 0M110 238c8-4 16 4 24 0', '#E1F5FE', 3.5)) },

  L('newregent', 'ถนนนิวรีเจนต์กับรถรางโบราณ', 'New Regent Street and the heritage tram', ['new regent street', 'ถนนนิวรีเจนต์', 'heritage tram', 'รถรางโบราณ', 'christchurch tram', 'รถรางไครสต์เชิร์ช', 'pastel shops', 'ร้านสีพาสเทล', 'spanish mission style', 'ตึกแบบสแปนิชมิชชัน', 'christchurch', 'ไครสต์เชิร์ช'], 'หารถรางสีเขียวที่วิ่งผ่านหน้าร้านสีพาสเทล', 'Find the green tram passing the pastel shops',
    // a row of three little two-storey shops with curved gable tops in pink, mint and lemon, arched windows upstairs, and a green-and-cream heritage tram with a trolley pole rolling past in front
    [[28, '#F8BBD0'], [88, '#B2DFDB'], [148, '#FFF59D']].map(([x, c]) => P(`M${x} 160V80q0-12 12-14q18-20 36 0q12 2 12 14v80z`, c)
      + P(`M${x + 12} 98v-8q6-8 12 0v8zM${x + 36} 98v-8q6-8 12 0v8z`, '#90CAF9', 2.5) + R(x + 4, 104, 56, 6, '#FFFFFF', 0, 2.5)).join('')
      + Lc('M20 60h200', '#546E7A', 2) + ol('M146 62l-18 40', '#546E7A', 2.5) + R(110, 100, 26, 6, '#37474F', 2, 2.5)
      + R(36, 106, 168, 70, '#2E7D32', 12) + R(36, 122, 168, 18, '#FFF8E1', 0, 3) + ring(5, (k) => R(46 + k * 31, 124, 22, 14, '#B3E5FC', 2, 2.5))
      + R(36, 158, 168, 8, '#FFCA28', 0, 2.5) + [64, 100, 140, 176].map((x) => C(x, 182, 9, '#455A64') + C(x, 182, 3, '#B0BEC5', 0)).join('')
      + R(24, 190, 192, 8, '#B0BEC5', 3) + face(120, 150, 0.4)),
  L('peacock', 'น้ำพุนกยูงในสวนพฤกษศาสตร์ไครสต์เชิร์ช', 'The Peacock Fountain in the Botanic Gardens', ['peacock fountain', 'น้ำพุนกยูง', 'christchurch botanic gardens', 'สวนพฤกษศาสตร์ไครสต์เชิร์ช', 'victorian fountain', 'น้ำพุสมัยวิกตอเรีย', 'hagley park', 'สวนแฮกลีย์', 'fountain', 'น้ำพุ'], 'หาจานน้ำพุสีทองชั้นบนสุด', 'Find the golden bowl at the very top',
    // a fancy old fountain painted teal and gold: a wide pool, a pedestal with a big bowl, a smaller bowl above it and a golden top, water arching out and falling back into the pool
    E(120, 190, 96, 22, '#26A69A') + E(120, 188, 84, 15, '#81D4FA', 0) + P('M104 184l6-40h20l6 40z', '#26A69A')
      + P('M60 140h120c-6 18-30 26-60 26s-54-8-60-26z', '#26A69A') + R(58, 134, 124, 8, '#FFCA28', 4) + ring(5, (k) => C(76 + k * 22, 150 + (k % 2 ? 4 : 0), 3, '#E57373', 0))
      + P('M112 134l4-34h8l4 34z', '#26A69A') + P('M88 100h64c-4 12-16 18-32 18s-28-6-32-18z', '#26A69A') + R(86, 94, 68, 7, '#FFCA28', 3)
      + C(120, 82, 10, '#FFCA28') + P('M114 74l6-16 6 16z', '#E57373')
      + Lc('M112 62c-20-10-40 0-48 26M128 62c20-10 40 0 48 26M60 144c-10 10-12 24-10 38M180 144c10 10 12 24 10 38', '#B3E5FC', 4) + face(120, 152, 0.3)),
  L('mahyplay', 'สนามเด็กเล่นมาร์กาเร็ต มาฮี', 'Margaret Mahy Playground', ['margaret mahy playground', 'สนามเด็กเล่นมาร์กาเร็ต มาฮี', 'big playground', 'สนามเด็กเล่นใหญ่', 'tower slide', 'หอสไลเดอร์', 'water play', 'เล่นน้ำ', 'swings', 'ชิงช้า', 'christchurch', 'ไครสต์เชิร์ช'], 'หาสไลเดอร์ท่อสีฟ้าที่วนรอบหอ', 'Find the blue tube slide twisting round the tower',
    // a tall orange climbing tower with a red pointed roof and a blue tube slide spiralling down round it, a swing on the left, little fountains of water play on the ground
    E(120, 200, 100, 14, '#C5E1A5') + Lc('M30 196l18-80 18 80M48 116h44M86 116v80', '#8D6E63', 5) + Lc('M60 118v42M76 118v42', INK, 2) + R(56, 160, 24, 6, '#EF5350', 2, 2.5)
      + R(132, 62, 44, 134, '#FFB74D', 4) + P('M126 64l28-28 28 28z', '#E53935') + R(144, 76, 20, 16, '#FFF3E0', 3, 2.5) + Lc('M132 120h44M132 160h44', '#FB8C00', 3)
      + ol('M176 90c34 6 34 42 0 48s-36 36-4 44c14 4 24 6 34 14', '#4FC3F7', 14)
      + Lc('M100 196c-4-10-4-18 0-26M112 196c0-10 2-18 8-24M88 196c-6-8-8-14-6-22', '#81D4FA', 3) + face(154, 112, 0.32)),
  L('caverock', 'หินถ้ำบนหาดซัมเนอร์', 'Cave Rock on Sumner Beach', ['cave rock', 'หินถ้ำ', 'tuawera', 'ทูอาเวรา', 'sumner beach', 'หาดซัมเนอร์', 'sea cave', 'ถ้ำริมทะเล', 'rock pools', 'แอ่งหินริมทะเล', 'beach', 'ชายหาด', 'christchurch', 'ไครสต์เชิร์ช'], 'หาโพรงถ้ำที่เดินลอดได้ใต้ก้อนหิน', 'Find the cave you can walk through under the rock',
    // a big round brown rock sitting on golden sand with an arched cave right through it, a tuft of grass on top, small waves on one side and a red bucket and spade on the sand
    P('M20 188h200v8c0 6-4 10-10 10H30c-6 0-10-4-10-10z', '#FFE082') + P('M40 188c-4-40 10-80 40-100 24-16 60-18 84-4 30 18 40 60 38 104z', '#A1887F')
      + P('M92 188c0-30 10-48 26-48s26 18 26 48z', '#4E342E') + Lc('M60 120c10-6 20-6 28 0M150 104c10 2 18 8 22 16M56 160c6-4 12-4 18 0', '#8D6E63', 3)
      + P('M104 88c4-10 8-14 10-4 4-12 8-12 10 0 4-8 8-6 8 4z', '#7CB342', 2.5)
      + Lc('M188 208c8-4 16 4 24 0M196 220c8-4 16 4 24 0', '#4FC3F7', 4) + P('M44 210l4 14h16l4-14z', '#E53935', 2.5) + Lc('M48 210c0-8 16-8 16 0', INK, 2.5) + ol('M76 222l10-24', '#FFCA28', 3)
      + face(122, 112, 0.4)),
  L('hectors', 'โลมาเฮกเตอร์ที่อาคาโรอา', "Hector's dolphin at Akaroa", ["hector's dolphin", 'โลมาเฮกเตอร์', 'hectors dolphin', 'smallest dolphin', 'โลมาตัวเล็กที่สุด', 'round fin', 'ครีบกลม', 'akaroa', 'อาคาโรอา', 'dolphin cruise', 'ล่องเรือดูโลมา'], 'หาครีบสีดำกลมๆ บนหลังโลมา', 'Find the round black fin on its back',
    // a small chubby grey dolphin leaping out of the blue sea with a round black fin like a mouse ear, a black face, a white tummy and splashes under it
    E(120, 196, 92, 16, '#4FC3F7') + Lc('M44 190c8-4 16 4 24 0M172 192c8-4 16 4 24 0', '#E1F5FE', 3.5)
      + g(120, 128, 1, P('M-60 0c-10-6-20-18-34-18 4 8 10 14 16 18-6 4-12 10-16 18 14 0 24-12 34-18z', '#78909C') + E(0, 0, 66, 30, '#B0BEC5') + P('M-52 8c30 18 80 18 112 0-20 20-92 22-112 0z', '#FFFFFF')
        + P('M46-20c14 4 24 12 28 20-4 10-14 16-28 18-6-12-6-26 0-38z', '#37474F') + P('M-16-26a15 15 0 0 1 30 0z', '#37474F') + P('M8 14l-8 22 22-16z', '#37474F') + E(70, 6, 10, 6, '#37474F') + face(22, -6, 0.42), -14)
      + [[70, 176], [164, 174], [184, 180]].map(([x, y]) => C(x, y, 5, '#B3E5FC', 2.5)).join('')),
  L('hagglund', 'รถตีนตะขาบแฮกลุนด์ที่ศูนย์แอนตาร์กติกนานาชาติ', 'The Hägglund snow truck at the International Antarctic Centre', ['hagglund', 'แฮกลุนด์', 'international antarctic centre', 'ศูนย์แอนตาร์กติกนานาชาติ', 'antarctic centre', 'ศูนย์แอนตาร์กติก', 'snow vehicle', 'รถลุยหิมะ', 'tracked vehicle', 'รถตีนตะขาบ', 'antarctica', 'แอนตาร์กติกา', 'christchurch airport', 'สนามบินไครสต์เชิร์ช'], 'หาไฟสีเหลืองบนหลังคารถสีส้ม', 'Find the yellow light on the orange truck’s roof',
    // a bright orange two-part snow truck on wide grey tracks, big windows in the front cab, a yellow light on the roof, driving over white snow with snowflakes falling
    P('M20 184c40-10 160-10 200 0v10c0 6-4 10-10 10H30c-6 0-10-4-10-10z', '#ECEFF1') + C(80, 84, 6, '#FFCA28')
      + R(40, 92, 82, 60, '#FF7043', 10) + R(50, 102, 28, 22, '#B3E5FC', 3, 2.5) + R(84, 102, 28, 22, '#B3E5FC', 3, 2.5)
      + R(116, 130, 16, 10, '#455A64', 0, 2.5) + R(128, 102, 78, 50, '#FF7043', 8) + R(140, 112, 54, 18, '#B3E5FC', 3, 2.5)
      + R(34, 150, 94, 32, '#455A64', 16) + R(124, 150, 90, 32, '#455A64', 16) + [52, 72, 92, 112, 142, 162, 182, 200].map((x) => C(x, 166, 7, '#90A4AE', 2.5)).join('')
      + [[40, 52], [120, 40], [178, 60], [210, 92], [24, 116]].map(([x, y]) => C(x, y, 4, '#FFFFFF', 2.5)).join('') + face(81, 140, 0.28)),
  L('chalice', 'ประติมากรรมชาลิสที่จัตุรัสคาทีดรัล', 'The Chalice sculpture in Cathedral Square', ['the chalice', 'ประติมากรรมชาลิส', 'chalice sculpture', 'ประติมากรรมรูปกรวย', 'cathedral square', 'จัตุรัสคาทีดรัล', 'leaf pattern', 'ลายใบไม้', 'city centre', 'ใจกลางเมือง', 'christchurch', 'ไครสต์เชิร์ช'], 'หาใบไม้สีเขียวบนกรวยสูง', 'Find the green leaves on the tall cone',
    // a tall upside-down silver cone standing on a short base in a paved square, cut with a pattern of little green leaves, its open rim at the top
    E(120, 204, 70, 10, '#E0E0E0') + R(98, 190, 44, 12, '#B0BEC5', 2) + P('M68 54h104l-38 138h-28z', '#CFD8DC') + E(120, 54, 52, 10, '#ECEFF1')
      + [[92, 72, -30], [120, 70, 0], [148, 72, 30], [104, 96, -20], [136, 96, 20], [120, 124, 0], [112, 150, -15], [128, 170, 15]].map(([x, y, a]) => g(x, y, 1, P('M0-9c6 4 6 14 0 18-6-4-6-14 0-18z', '#81C784', 2.5), a)).join('')
      + Lc('M92 72l28 52 28-52M104 96l16 28 16-28', '#B0BEC5', 2) + face(120, 104, 0.3)),
  L('timeball', 'หอลูกบอลบอกเวลาที่ลิตเทิลตัน', 'The Lyttelton Timeball Station', ['lyttelton timeball', 'หอลูกบอลบอกเวลาลิตเทิลตัน', 'timeball station', 'หอลูกบอลบอกเวลา', 'lyttelton', 'ลิตเทิลตัน', 'lyttelton harbour', 'ท่าเรือลิตเทิลตัน', 'ships', 'เรือ', 'stone tower', 'หอหิน'], 'หาลูกบอลสีแดงบนเสา', 'Find the red ball on the mast',
    // a small stone castle tower with battlements on a green hill above the harbour, a tall mast on top with a big red ball halfway up, a little stone house beside it
    P('M20 186c40-20 160-24 200-6v12c0 6-4 10-10 10H30c-6 0-10-4-10-10z', '#AED581') + P('M20 172c20-2 40 0 50 8H20z', '#4FC3F7', 0)
      + R(148, 128, 58, 58, '#D7CCC8') + P('M148 128v-10h10v6h10v-6h10v6h10v-6h10v6h8v4z', '#D7CCC8') + R(164, 146, 12, 16, '#5D4037', 0, 2.5) + R(184, 146, 12, 16, '#5D4037', 0, 2.5)
      + ol('M122 88V28', '#8D6E63', 4) + ol('M108 36h28', '#8D6E63', 3) + C(122, 54, 12, '#E53935')
      + R(94, 88, 56, 100, '#D7CCC8') + P('M90 92v-14h10v8h10v-8h10v8h10v-8h10v8h10v-8h4v14z', '#D7CCC8') + P('M112 188v-20q10-12 20 0v20z', '#8D6E63')
      + Lc('M94 116h56M94 150h56', '#BCAAA4', 2.5) + face(122, 132, 0.34)),
  L('turanga', 'ห้องสมุดทูรางา', 'Tūranga, the central library', ['turanga', 'ทูรางา', 'tūranga', 'central library', 'ห้องสมุดกลาง', 'christchurch library', 'ห้องสมุดไครสต์เชิร์ช', 'copper fins', 'ครีบสีทองแดง', 'books', 'หนังสือ', 'christchurch', 'ไครสต์เชิร์ช'], 'หาครีบสีทองแดงตั้งเรียงหน้าตึก', 'Find the copper fins standing in rows on the building',
    // a modern glass library of five floors wrapped in tall copper-coloured fins set at different gaps, a big glass door at the bottom and a round tree beside it
    R(36, 60, 168, 132, '#B3E5FC', 4) + Lc('M36 86h168M36 112h168M36 138h168M36 164h168', '#81D4FA', 2.5)
      + [44, 58, 66, 88, 98, 142, 152, 170, 184, 194].map((x) => R(x, 56, 6, 136, '#D4A373', 2, 2.5)).join('') + R(32, 52, 176, 8, '#8D6E63', 2)
      + R(104, 160, 32, 32, '#E1F5FE', 2) + Lc('M120 160v32', INK, 2.5) + Lc('M214 196v-24', '#6D4C41', 5) + C(214, 162, 14, '#66BB6A')
      + R(24, 192, 200, 8, '#BDBDBD', 3) + face(120, 124, 0.42)),
  L('floralclock', 'นาฬิกาดอกไม้ที่จัตุรัสวิกตอเรีย', 'The floral clock in Victoria Square', ['floral clock', 'นาฬิกาดอกไม้', 'victoria square', 'จัตุรัสวิกตอเรีย', 'flower clock', 'นาฬิกาจากดอกไม้', 'garden city', 'เมืองแห่งสวน', 'flowers', 'ดอกไม้', 'christchurch', 'ไครสต์เชิร์ช'], 'หาเข็มนาฬิกาบนแปลงดอกไม้', 'Find the clock hands on the flower bed',
    // a big round flower bed tilted like a clock face, twelve flower clumps for the hours round its edge, a ring of pink flowers, two long hands meeting in the middle
    E(120, 150, 96, 64, '#BCAAA4') + E(120, 140, 92, 60, '#81C784') + E(120, 140, 72, 44, '#AED581', 0)
      + ring(12, (k) => { const a = (k * 30 - 90) * Math.PI / 180; return C(120 + 82 * Math.cos(a), 140 + 52 * Math.sin(a), 6, ['#F48FB1', '#FFD54F', '#FFFFFF', '#CE93D8'][k % 4], 2.5); })
      + ol('M120 140V102', '#FFFFFF', 5) + ol('M120 140l42-14', '#FFFFFF', 5) + C(120, 140, 7, '#FFCA28') + face(120, 166, 0.3)),
  L('artscentre', 'หอนาฬิกาของศูนย์ศิลปะไครสต์เชิร์ช', 'The clock tower of the Arts Centre', ['arts centre', 'ศูนย์ศิลปะ', 'christchurch arts centre', 'ศูนย์ศิลปะไครสต์เชิร์ช', 'clock tower', 'หอนาฬิกา', 'stone buildings', 'อาคารหิน', 'gothic revival', 'สถาปัตยกรรมกอทิกรีไววัล', 'christchurch', 'ไครสต์เชิร์ช'], 'หาหน้าปัดนาฬิกาบนหอหิน', 'Find the clock face on the stone tower',
    // a grey stone clock tower with a steep slate roof and pointed windows, low stone wings on each side with gable roofs, a lawn in front
    P('M20 194h200v4c0 6-4 10-10 10H30c-6 0-10-4-10-10z', '#AED581') + R(40, 128, 56, 66, '#CFD8DC') + P('M36 130l32-26 32 26z', '#78909C')
      + R(144, 128, 56, 66, '#CFD8DC') + P('M140 130l32-26 32 26z', '#78909C') + P('M54 172v-18q6-10 12 0v18zM74 172v-18q6-10 12 0v18zM154 172v-18q6-10 12 0v18zM174 172v-18q6-10 12 0v18z', '#90CAF9', 2.5)
      + R(96, 74, 48, 120, '#CFD8DC') + P('M92 76l28-48 28 48z', '#607D8B') + C(120, 96, 12, '#FFFFFF') + Lc('M120 96v-7M120 96l5 4', INK, 2.5)
      + P('M112 194v-22q8-12 16 0v22z', '#8D6E63') + face(120, 140, 0.34)),
  L('giantspiano', 'เปียโนโมเสกที่บ้านยักษ์ อาคาโรอา', "The mosaic piano at the Giant's House, Akaroa", ["the giant's house", 'บ้านยักษ์', 'giants house', 'mosaic garden', 'สวนโมเสก', 'mosaic piano', 'เปียโนโมเสก', 'akaroa', 'อาคาโรอา', 'sculpture garden', 'สวนประติมากรรม', 'colourful tiles', 'กระเบื้องหลากสี'], 'หากระเบื้องสีชมพูบนเปียโน', 'Find the pink tiles on the piano',
    // a grand piano covered all over in a sparkling mosaic of little coloured tiles, its lid propped open, white keys at the front, flowers growing round its legs
    R(56, 166, 10, 30, '#4FC3F7', 0, 3) + R(176, 166, 10, 30, '#4FC3F7', 0, 3) + P('M100 126L206 82l-2 22-92 30z', '#FFCA28')
      + P('M40 126h104c40 0 64 12 64 30v12H40z', '#4FC3F7') + R(40, 116, 62, 12, '#FFFFFF', 2) + Lc('M50 116v7M60 116v7M74 116v7M84 116v7M94 116v7', INK, 2.5)
      + [[52, 136, '#F48FB1'], [70, 144, '#FFD54F'], [150, 134, '#F48FB1'], [168, 142, '#81C784'], [186, 150, '#FFD54F'], [60, 156, '#81C784'], [176, 158, '#F48FB1'], [196, 160, '#CE93D8'], [136, 158, '#CE93D8'], [86, 158, '#F48FB1']].map(([x, y, c]) => R(x, y, 8, 8, c, 1, 2)).join('')
      + [[48, 200, '#F48FB1'], [72, 204, '#FFD54F'], [170, 202, '#FFD54F'], [194, 198, '#F48FB1']].map(([x, y, c]) => C(x, y, 6, c, 2.5)).join('') + face(112, 148, 0.32)),
  L('kahikatea', 'ต้นคาฮิคาเทียสูงในป่าริกคาร์ตัน', 'Tall kahikatea trees in Riccarton Bush', ['riccarton bush', 'ป่าริกคาร์ตัน', 'putaringamotu', 'ปูตารินกาโมตู', 'kahikatea', 'คาฮิคาเทีย', 'native forest', 'ป่าพื้นเมือง', 'boardwalk', 'ทางเดินไม้', 'riccarton house', 'บ้านริกคาร์ตัน'], 'หาต้นไม้สูงที่สุดกลางป่า', 'Find the tallest tree in the middle of the forest',
    // three very tall straight-trunked native trees with small tufted crowns at the top, a wooden boardwalk with a rail winding between them and a curly fern at the front
    ol('M70 196V70', '#8D6E63', 8) + ol('M170 196V64', '#8D6E63', 8) + E(70, 60, 22, 16, '#2E7D32') + E(170, 54, 22, 16, '#388E3C')
      + R(106, 50, 28, 146, '#8D6E63', 10) + E(120, 40, 30, 20, '#2E7D32') + C(102, 46, 10, '#388E3C') + C(138, 44, 10, '#388E3C')
      + P('M60 200l40-30h40l40 30z', '#BCAAA4') + Lc('M70 198l34-26M170 198l-34-26M84 190h72M96 180h48', '#A1887F', 2.5) + Lc('M64 180l38-28M176 180l-38-28', '#6D4C41', 3)
      + P('M30 200c-6-20 0-40 16-44 10 0 14 10 6 16-6 4-12-2-8-6', '#66BB6A', 3) + face(120, 140, 0.28)),
  L('bluepenguin', 'เพนกวินสีน้ำเงินตัวเล็ก', 'A little blue penguin by its nest box', ['little blue penguin', 'เพนกวินสีน้ำเงินตัวเล็ก', 'korora', 'โคโรรา', 'kororā', 'smallest penguin', 'เพนกวินตัวเล็กที่สุด', 'nest box', 'กล่องรัง', 'banks peninsula', 'คาบสมุทรแบงส์', 'antarctic centre', 'ศูนย์แอนตาร์กติก'], 'หากล่องรังไม้ข้างเพนกวิน', 'Find the wooden nest box next to the penguin',
    // a tiny round penguin with a slate-blue back and a white front standing on a rock, little pink feet, flippers out, a wooden nest box with a round door behind it
    E(120, 200, 90, 12, '#B0BEC5') + R(130, 104, 70, 62, '#BCAAA4', 4) + P('M124 106l41-26 41 26z', '#8D6E63') + C(166, 138, 14, '#4E342E')
      + R(124, 166, 82, 10, '#A1887F', 2) + E(94, 196, 9, 4, '#F48FB1', 2.5) + E(114, 196, 9, 4, '#F48FB1', 2.5)
      + P('M66 140l-16 22 20-6zM134 140l16 22-20-6z', '#5C8FC4') + E(104, 140, 34, 54, '#5C8FC4') + E(104, 154, 24, 36, '#FFFFFF', 0)
      + P('M104 116l14 2-14 6z', '#37474F', 2.5) + face(98, 112, 0.28)),
  L('afghan', 'บิสกิตอัฟกัน ช็อกโกแลตหน้าวอลนัต', 'An Afghan biscuit with a walnut on top', ['afghan biscuit', 'บิสกิตอัฟกัน', 'afghan', 'chocolate biscuit', 'บิสกิตช็อกโกแลต', 'cornflakes', 'คอร์นเฟลก', 'walnut', 'วอลนัต', 'kiwi baking', 'ขนมอบนิวซีแลนด์', 'bakery', 'ร้านเบเกอรี'], 'หาวอลนัตครึ่งซีกบนหน้าช็อกโกแลต', 'Find the half walnut on the chocolate icing',
    // a big round crunchy chocolate biscuit with bits of cornflake poking out of its edge, thick shiny chocolate icing on top and half a walnut sitting in the middle
    P('M36 140v16c0 22 38 40 84 40s84-18 84-40v-16z', '#C49A6C') + E(120, 140, 84, 40, '#D2A679')
      + ring(8, (k) => { const a = (k * 45 + 20) * Math.PI / 180; return C(120 + 80 * Math.cos(a), 146 + 40 * Math.sin(a), 5, '#D7A86E', 2.5); })
      + P('M50 136c0-18 30-30 70-30s70 12 70 30c-6 6-10 4-14 10-6-6-12-2-16 4-8-6-14-2-20 2-8-4-16-4-22 0-6-4-12-8-20-2-4-6-10-10-16-4-4-6-8-4-12-10z', '#6D4C41')
      + E(120, 114, 24, 14, '#C8A165') + Lc('M104 112c6-4 10 4 16 0s10 4 16 0M108 120c4-3 8 3 12 0s8 3 12 0', '#A1887F', 2) + face(120, 164, 0.34)),
  L('kiwidip', 'กีวีดิป ดิปหัวหอมกับมันฝรั่งทอดกรอบ', 'Kiwi onion dip with ridged chips', ['kiwi dip', 'กีวีดิป', 'onion dip', 'ดิปหัวหอม', 'reduced cream dip', 'ดิปครีม', 'potato chips', 'มันฝรั่งทอดกรอบ', 'ridged chips', 'มันฝรั่งแผ่นหยัก', 'picnic snack', 'ของว่างปิกนิก', 'kiwi party food', 'อาหารปาร์ตี้นิวซีแลนด์'], 'หามันฝรั่งแผ่นที่จุ่มอยู่ในดิป', 'Find the chip dipped in the bowl',
    // a blue bowl full of creamy white onion dip with little green specks, ridged golden potato chips piled round it and one chip dunked in the dip
    [[46, 176, -20], [70, 192, 10], [176, 190, -10], [196, 172, 20], [124, 204, 0]].map(([x, y, a]) => g(x, y, 1, P('M-18-4c6-8 30-8 36 0 2 8-4 12-18 12s-20-4-18-12z', '#FFD54F') + Lc('M-12-2h24M-10 3h20', '#FFB300', 2), a)).join('')
      + P('M50 120h140c0 40-30 64-70 64s-70-24-70-64z', '#4FC3F7') + E(120, 120, 70, 14, '#FFF8E1') + Lc('M90 118h6M110 122h6M140 116h6M156 122h5M100 126h5', '#7CB342', 2.5)
      + g(146, 108, 1, P('M-16-14c6-8 26-8 32 0 2 10-2 20-16 22-14-2-18-12-16-22z', '#FFD54F') + Lc('M-10-8h20M-10-2h20', '#FFB300', 2), 18) + face(120, 152, 0.34)),
  L('minceandcheese', 'พายเนื้อสับชีสแบบนิวซีแลนด์', 'A mince and cheese pie', ['mince and cheese pie', 'พายเนื้อสับชีส', 'kiwi pie', 'พายนิวซีแลนด์', 'mince pie', 'พายเนื้อสับ', 'meat pie', 'พายเนื้อ', 'bakery', 'ร้านเบเกอรี', 'melted cheese', 'ชีสละลาย'], 'หาชีสเยิ้มที่ไหลออกมาจากกลางพาย', 'Find the gooey cheese melting out of the middle',
    // a round golden pie with a crimped pastry edge, a slit in its lid and bubbly melted cheese spilling out over the top, steam curling up
    P('M44 128l12 56h128l12-56z', '#D7A55A') + Lc('M60 140l6 40M88 140l3 40M120 140v40M152 140l-3 40M180 140l-6 40', '#C68A3E', 2.5)
      + E(120, 128, 78, 24, '#F4C16B') + ring(12, (k) => { const a = (k * 30) * Math.PI / 180; return C(120 + 72 * Math.cos(a), 128 + 21 * Math.sin(a), 5, '#F4C16B', 2.5); })
      + P('M90 124c4-12 56-12 60 0 4 8-4 10-8 10 0 8-6 10-8 4-2 8-8 8-10 0-4 6-12 6-12-2-6 4-14 0-12-6-6 2-12-2-10-6z', '#FFD54F')
      + Lc('M110 122l20-4', '#C68A3E', 2.5) + Lc('M96 96c-6-10 6-16 0-26M120 90c-6-10 6-16 0-26M144 96c-6-10 6-16 0-26', '#CFD8DC', 4) + face(120, 160, 0.36)),
];

export default {
  places: {
    'nz-christchurch': { country: 'nz', wave: 3, name: nm('ไครสต์เชิร์ชและอาคาโรอา', 'Christchurch and Akaroa'), tz: 'Pacific/Auckland', ll: [-43.53, 172.64], alias: ['christchurch', 'ไครสต์เชิร์ช', 'otautahi', 'ōtautahi', 'โอเตาตาฮิ', 'CHC', 'akaroa', 'อาคาโรอา', 'banks peninsula', 'คาบสมุทรแบงส์', 'lyttelton', 'ลิตเทิลตัน', 'port hills', 'พอร์ตฮิลส์'], colors: CH },
  },
  items,
};
