// Wave 14, Indonesia 1: Yogyakarta and Borobudur — the stamp, two day scenes and landmarks.
// Borobudur and Prambanan are drawn only as buildings (no statues, no deities); no batik painting (Langkawi has it), no gamelan
// (Indonesia's country set), no shadow puppets (Cambodia, Nakhon Si), no satay, no caves, no markets, no horses, no coffee.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const YG = { k1: '#B5652B', k2: '#2E5E4E', k3: '#FFF3E0' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `id-yogyakarta.landmark.${slug}`, cat: 'landmark', file: `id/yogyakarta/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a Borobudur bell stupa standing on its base line: a lotus ring, the bell pierced with diamond holes, a square cap and a spike
const stupa = (x, y, s, fill = '#B0A79A', holes = true, sw = 4) => g(x, y, s, E(0, 0, 44, 7, '#8D8478', sw)
  + P('M-38-4c0-34 14-54 38-54s38 20 38 54z', fill, sw)
  + (holes ? [[-14, [-26, -13, 0, 13, 26]], [-30, [-19, -6, 7, 20]], [-44, [-7, 7]]].map(([yy, xs]) => xs.map((xx) => P(`M${xx} ${yy - 6}l5 6-5 6-5-6z`, '#4E4A44', 0)).join('')).join('') : '')
  + R(-7, -70, 14, 12, fill, 2, sw) + P('M-4-70l4-16 4 16z', fill, sw));
// a tiered Prambanan temple: a stepped body, rows of little knobs, a tall pointed crown
const candi = (x, y, s, fill = '#9E9384') => g(x, y, s, R(-30, -40, 60, 40, fill) + R(-12, -32, 24, 32, '#5D554B', 3)
  + [[-40, 26], [-62, 21], [-82, 16], [-100, 11]].map(([yy, w]) => P(`M${-w} ${yy}h${w * 2}l-4-22h${-w * 2 + 8}z`, fill) + [-1, 1].map((k) => C(k * (w - 3), yy - 24, 4, fill, 3)).join('')).join('')
  + P('M-7-122l7-34 7 34z', fill));
// a becak: the passenger seat in front under a hood, two front wheels, the rider's saddle and one wheel behind
const becak = (x, y, s, body = '#E53935', hood = '#1E88E5') => g(x, y, s, Lc('M10 -6L56 -6L64 -34', INK, 5) + C(62, 0, 16, '#FFFFFF', 4) + C(62, 0, 4, INK, 0)
  + P('M-44-6h56v-34c0-10-6-14-14-14h-28c-8 0-14 4-14 14z', body) + R(-38, -42, 44, 14, '#FFCA28', 3, 3) + P('M-50-46c0-30 16-40 34-40s34 10 34 40z', hood)
  + C(-36, 4, 14, '#FFFFFF', 4) + C(-36, 4, 4, INK, 0) + C(4, 4, 14, '#FFFFFF', 4) + C(4, 4, 4, INK, 0) + R(54, -42, 18, 6, INK, 3, 0));

const items = [
  { id: 'id-yogyakarta.stamp', cat: 'stamp', file: 'id/yogyakarta/stamp.v1.svg', name: nm('ตราประทับยอกยาการ์ตาและบุโรพุทโธ', 'Yogyakarta and Borobudur stamp'), kw: ['yogyakarta', 'ยอกยาการ์ตา', 'jogja', 'borobudur', 'บุโรพุทโธ', 'bell stupa', 'สถูประฆัง', 'merapi', 'เมราปี'],
    // a big pierced bell stupa on a stone terrace with the smoking cone of Merapi behind it
    svg: cityStamp('yog-st', { name: 'YOGYAKARTA', sub: 'BOROBUDUR', ...YG, emblem: P('M54 120l26-46c6-6 12-6 18 0l26 46z', '#8D6E63', 3) + P('M80 74c-6-8 2-16 10-12 2-8 14-6 12 2', '#ECEFF1', 2.5)
      + R(56, 132, 88, 10, '#9E9384', 2, 3) + stupa(100, 132, 0.62, '#BDB3A6', true, 4) + face(100, 112, 0.3) }) },
  { id: 'id-yogyakarta.day.borobudur', cat: 'day', file: 'id/yogyakarta/day-borobudur.v1.svg', name: nm('บุโรพุทโธยามพระอาทิตย์ขึ้น', 'Borobudur at sunrise'), kw: ['borobudur', 'บุโรพุทโธ', 'sunrise', 'พระอาทิตย์ขึ้น', 'stone terraces', 'ลานหินขั้นบันได', 'bell stupas', 'สถูประฆัง', 'morning mist', 'หมอกยามเช้า', 'merapi', 'เมราปี'],
    // a peach dawn, the sun rising beside the smoking cone of Merapi, the great stepped stone monument with rows of little bell stupas and the big one on top, palm tops poking out of the mist
    svg: scene('yog-d1', '#FFCCBC', C(64, 76, 22, '#FFE082', 0) + P('M120 120l46-70c6-6 12-6 18 0l60 70z', '#A1887F') + P('M166 50c-8-10 0-20 10-16 4-10 18-6 14 4 10 0 10 12 0 12', '#ECEFF1', 3)
      + P('M-4 128c60-10 160-10 248 0v120H-4z', '#B2DFDB', 0)
      + [[176, 210], [158, 176], [142, 144], [128, 112]].map(([y, w]) => R(120 - w / 2, y, w, 18, '#A1887F', 2) + Lc(`M${124 - w / 2} ${y + 9}h${w - 8}`, '#8D6E63', 2)).join('')
      + [[-1, 0], [1, 0]].map(([d]) => [0, 1, 2].map((k) => stupa(120 + d * (30 + k * 18), 128, 0.18, '#BCAAA4', false, 3)).join('')).join('') + stupa(120, 112, 0.42, '#BCAAA4', true, 4)
      + P('M-4 196c40-10 80-4 120-8s80-10 128 0v60H-4z', '#FFFFFF', 0) + Lc('M10 206c30-6 60-2 90-6M140 214c30-6 60-2 90-6', '#ECEFF1', 4)
      + [[22, 196], [216, 192], [196, 214]].map(([x, y]) => Lc(`M${x} ${y + 30}v-34`, '#6D4C41', 4) + P(`M${x} ${y - 4}c-14-6-22 0-26 8M${x} ${y - 4}c14-6 22 0 26 8M${x} ${y - 4}c-6-12-2-20 6-22`, 'none').replace('fill="none"', 'fill="none" stroke="#2E7D32" stroke-width="6"')).join('') + face(120, 96, 0.22)) },
  { id: 'id-yogyakarta.day.malioboro', cat: 'day', file: 'id/yogyakarta/day-malioboro.v1.svg', name: nm('ถนนมาลิโอโบโรยามเย็น', 'Malioboro Street in the evening'), kw: ['malioboro', 'มาลิโอโบโร', 'street walk', 'เดินเล่นถนน', 'shophouses', 'ตึกแถว', 'street lamps', 'โคมไฟถนน', 'becak', 'เบอจัก', 'evening', 'ยามเย็น'],
    // a dusky street running away between rows of old shophouses with striped awnings, tall green lamp posts with round lights, two colourful becaks rolling along
    svg: scene('yog-d2', '#9FA8DA', C(186, 46, 14, '#FFF59D', 0)
      + P('M-4 70h86v120H-4z', '#FFE0B2') + P('M158 70h86v120h-86z', '#FFCCBC') + P('M82 70l24 70v50H82z', '#FFCC80') + P('M158 70l-24 70v50h24z', '#FFAB91')
      + [[-4, 82, 1], [158, 82, 1]].map(([x]) => [0, 1, 2].map((k) => R(x + 6 + k * 27, 100, 20, 22, '#5C6BC0', 2, 3)).join('') + [0, 1, 2, 3, 4].map((k) => P(`M${x + k * 17.2} 132h17.2l-3 12h-11z`, k % 2 ? '#FFFFFF' : '#E53935', 2.5)).join('')).join('')
      + P('M106 140h28l60 110H46z', '#78909C', 0) + Lc('M120 150v14M120 176v18M120 208v24', '#FFFFFF', 4)
      + [[58, 120], [182, 120], [96, 140], [144, 140]].map(([x, y], k) => Lc(`M${x} ${y + (k < 2 ? 90 : 40)}V${y}`, '#2E7D32', k < 2 ? 5 : 3) + C(x, y - 4, k < 2 ? 8 : 5, '#FFF59D', 3)).join('')
      + becak(70, 218, 0.48) + becak(178, 226, 0.42, '#43A047', '#FFCA28') + face(54, 196, 0.2) + face(166, 206, 0.18)) },

  L('stupa', 'สถูประฆังเจาะลายบุโรพุทโธ', 'A pierced bell stupa at Borobudur', ['bell stupa', 'สถูประฆัง', 'borobudur', 'บุโรพุทโธ', 'diamond holes', 'ช่องลายข้าวหลามตัด', 'stone terrace', 'ลานหิน', 'top terraces', 'ชั้นบนสุด'], 'หาสถูปทรงระฆังที่มีช่องรูปข้าวหลามตัดรอบตัว', 'Find the bell-shaped stupa with diamond holes all round it',
    // one big grey stone bell stupa full of diamond-shaped holes on a round lotus base, two smaller ones behind on the terrace edge, the sky beyond
    stupa(46, 132, 0.6, '#A79E91', true, 4) + stupa(194, 132, 0.6, '#A79E91', true, 4) + R(14, 132, 212, 18, '#8D8478', 3) + Lc('M20 141h200', '#7A7266', 2)
      + R(26, 150, 188, 64, '#9E9384', 4) + Array.from({ length: 6 }, (_, k) => Lc(`M${42 + k * 32} 150v64`, '#857C70', 2)).join('') + Lc('M26 182h188', '#857C70', 2)
      + stupa(120, 160, 1.45, '#BDB3A6', true, 5) + face(120, 104, 0.55)),
  L('prambanan', 'ปราสาทพรัมบานัน', 'The tall temples of Prambanan', ['prambanan', 'พรัมบานัน', 'hindu temple building', 'ปราสาทหิน', 'tall pointed towers', 'ยอดแหลมสูง', 'stone carvings', 'หินแกะสลัก', 'world heritage', 'มรดกโลก'], 'หายอดปราสาทที่สูงที่สุดตรงกลาง', 'Find the tallest pointed temple in the middle',
    // three grey stone temples on a long base, the middle one much taller, each made of stepped tiers edged with little knobs and a sharp point, green lawn in front
    R(14, 196, 212, 18, '#7CB342', 6) + candi(56, 196, 0.62) + candi(184, 196, 0.62) + candi(120, 196, 1.05, '#ACA191') + face(120, 176, 0.32) + R(30, 196, 180, 8, '#8D8478', 2, 3)),
  L('merapi', 'รถจี๊ปเที่ยวลาวาภูเขาไฟเมราปี', 'A lava tour jeep under Mount Merapi', ['merapi', 'เมราปี', 'volcano', 'ภูเขาไฟ', 'lava tour', 'ทัวร์ลาวา', 'jeep', 'รถจี๊ป', 'grey sand', 'ทรายภูเขาไฟ', 'kaliurang', 'กาลีอูรัง'], 'หาควันที่ลอยออกจากยอดภูเขาไฟ', 'Find the smoke puffing out of the top of the volcano',
    // a steep grey-brown volcano with a white smoke cloud curling from its top, green slopes below, an open olive jeep bumping over grey volcanic sand in front
    bg('#B3E5FC') + P('M16 150l70-90c10-10 20-10 30 0l92 90v44H16z', '#8D6E63', 0) + P('M86 60l18 30 14-14 12 18 10-6-24-28c-10-10-20-10-30 0z', '#6D4C41', 0) + P('M16 150c40-14 70-10 104-2s70 10 104-4v64H16z', '#7CB342', 0)
      + P('M88 54c-14-2-20-16-8-24-2-14 16-20 24-10 8-12 28-6 26 8 12 2 12 18 0 22z', '#FFFFFF', 4) + low(176, '#B0A79A') + frame
      + g(120, 192, 1, R(-56, -26, 112, 30, '#7E8F4A', 6) + P('M-30-26v-22h44l10 22', 'none') + Lc('M-30-26v-24h46', INK, 4) + Lc('M16-50l12 24', INK, 4) + R(-50, -16, 20, 10, '#FFF59D', 3, 3) + C(-32, 6, 15, INK, 0) + C(32, 6, 15, INK, 0) + C(-32, 6, 6, '#BDBDBD', 0) + C(32, 6, 6, '#BDBDBD', 0))
      + face(130, 178, 0.32)),
  L('becak', 'เบอจัก สามล้อปั่นของยอกยา', 'A becak, the pedal tricycle of Yogyakarta', ['becak', 'เบอจัก', 'pedal tricycle', 'สามล้อถีบ', 'passenger seat in front', 'ที่นั่งอยู่ข้างหน้า', 'canopy', 'ประทุน', 'city ride', 'นั่งรถชมเมือง'], 'หาที่นั่งผู้โดยสารที่อยู่ด้านหน้าคนปั่น', 'Find the passenger seat in front of the rider',
    // a big becak seen from the side: a red seat box with a yellow panel painted with flowers under a blue folding hood, two front wheels, the rider's saddle and wheel behind
    becak(108, 180, 1.55) + [[60, 130], [80, 136], [100, 130]].map(([x, y]) => C(x, y, 4, '#E91E63', 2)).join('') + face(84, 118, 0.42)),
  L('gudeg', 'กูเด็ก แกงขนุนอ่อนหวาน', 'Gudeg, sweet young-jackfruit stew', ['gudeg', 'กูเด็ก', 'jackfruit stew', 'แกงขนุนอ่อน', 'brown egg', 'ไข่ต้มสีน้ำตาล', 'banana leaf', 'ใบตอง', 'rice plate', 'ข้าวราดแกง', 'krecek', 'เกรเจ็ก'], 'หาไข่สีน้ำตาลที่วางอยู่บนกองขนุน', 'Find the brown egg sitting on the jackfruit',
    // a woven bamboo tray lined with a banana leaf: a mound of white rice, a heap of brown jackfruit stew in chunks, a whole brown boiled egg, tofu and a spoon of red krecek
    E(120, 168, 96, 42, '#D7A86E') + Array.from({ length: 9 }, (_, k) => Lc(`M${40 + k * 20} 136l-6 64`, '#B98A55', 2)).join('') + E(120, 160, 84, 32, '#66BB6A') + Lc('M44 160h152', '#388E3C', 2)
      + P('M48 160c0-26 22-38 42-38s34 14 34 38z', '#FFFFFF') + P('M110 160c0-30 24-46 50-46s38 20 38 46z', '#8D5A33')
      + [[134, 138], [154, 128], [176, 142], [146, 150], [170, 154]].map(([x, y]) => R(x - 7, y - 5, 14, 10, '#A0673C', 3, 2.5)).join('') + R(70, 148, 24, 16, '#FFE0A0', 3, 3) + E(164, 104, 22, 26, '#7B4A2A') + E(160, 96, 7, 9, '#9C6640', 0)
      + P('M40 176c10-12 30-10 38 0-8 10-28 12-38 0z', '#E53935', 3) + face(164, 106, 0.38).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('kraton', 'ศาลาโถงในวังกราตน', 'The golden pavilion of the Kraton palace', ['kraton', 'กราตน', 'sultan palace', 'วังสุลต่าน', 'joglo roof', 'หลังคาโจโกล', 'bangsal kencana', 'บังซัลเกินจานา', 'green and gold pillars', 'เสาเขียวทอง', 'open pavilion', 'ศาลาโปร่ง'], 'หาหลังคาทรงสูงที่ยอดแหลมขึ้นตรงกลาง', 'Find the roof that rises steeply up to a peak in the middle',
    // an open Javanese pavilion: a tall two-part roof, steep in the middle and wide below, green tiles edged with gold, slim dark green pillars with gold bands on a white floor
    P('M86 92l14-60h40l14 60z', '#2E7D32') + Lc('M100 32h40', '#FFCA28', 5) + P('M30 120l56-28h68l56 28z', '#388E3C') + Lc('M30 120h180', '#FFCA28', 6) + Lc('M94 52h52M90 72h60', '#1B5E20', 2)
      + [44, 82, 120, 158, 196].map((x) => R(x - 5, 124, 10, 66, '#1B5E20', 2, 3) + R(x - 7, 136, 14, 6, '#FFCA28', 1, 2) + R(x - 7, 176, 14, 6, '#FFCA28', 1, 2)).join('')
      + R(22, 190, 196, 14, '#FFFFFF', 3) + R(14, 204, 212, 12, '#E0E0E0', 3) + face(120, 62, 0.34).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('tamansari', 'สระอาบน้ำทามันซารี', 'The bathing pools of Taman Sari', ['taman sari', 'ทามันซารี', 'water castle', 'ปราสาทน้ำ', 'royal pools', 'สระอาบน้ำโบราณ', 'umbul pasiraman', 'อุมบุลปาซีรามัน', 'flower pots', 'กระถางหิน'], 'หากระถางดอกไม้หินที่มุมสระ', 'Find the stone flower pots at the corners of the pool',
    // a cream stone bathhouse with a curvy gable and two arched doors behind a long turquoise pool, stone edging with big carved urns at the corners, a small fountain spout
    R(56, 46, 128, 70, '#FFF3D6') + P('M56 46c10-24 34-20 40-30 6 8 12 8 24 0 12 8 18 8 24 0 6 10 30 6 40 30z', '#FFE7B0') + [96, 144].map((x) => P(`M${x - 12} 116v-30c0-16 24-16 24 0v30z`, '#5D4037', 3)).join('') + C(120, 34, 6, '#FFCA28', 3)
      + R(14, 116, 212, 96, '#E8D9B5', 6) + R(28, 128, 184, 72, '#4DD0E1', 4) + Lc('M40 150c20-6 40 6 60 0s40-6 60 0 30 6 40 0M44 176c20-6 40 6 60 0s40-6 60 0', '#B2EBF2', 3)
      + [[30, 120], [210, 120]].map(([x, y]) => P(`M${x - 14} ${y}c0-14 6-22 14-22s14 8 14 22z`, '#D7A86E', 3) + R(x - 10, y, 20, 8, '#BCAAA4', 2, 3) + C(x - 6, y - 26, 6, '#66BB6A', 2) + C(x + 6, y - 28, 7, '#43A047', 2) + C(x + 4, y - 30, 3.5, '#E91E63', 0)).join('')
      + face(120, 166, 0.4)),
  L('blangkon', 'บลังกอน หมวกผ้าบาติกชวา', 'A blangkon, the Javanese batik head cap', ['blangkon', 'บลังกอน', 'javanese head cap', 'หมวกผ้าชวา', 'batik cloth', 'ผ้าบาติก', 'knot at the back', 'ปมด้านหลัง', 'traditional dress', 'ชุดพื้นเมือง', 'souvenir', 'ของฝาก'], 'หาปมกลมๆ ที่ด้านหลังหมวก', 'Find the round knot bump at the back of the cap',
    // a smiling child wearing a brown batik cap: the cap hugs the head down to the brow with a dark folded band, two little cloth tips by the ear and a fat round knot bulging at the back, cream batik dots over it
    P('M58 226c0-28 26-40 56-40s56 12 56 40z', '#FFFFFF') + Lc('M114 188v38', '#BDBDBD', 3) + E(176, 148, 22, 26, '#5D4037') + Lc('M166 134c10 4 16 14 14 28', '#A1887F', 3) + C(114, 136, 56, '#F2C29B')
      + P('M56 130c-6-52 22-82 60-82s66 30 60 78c-34-16-86-16-120 4z', '#6D4C41') + P('M56 130c34-20 86-20 120-4l2 10c-36-14-86-14-122 6z', '#3E2723') + P('M172 118l14-10 2 16zM170 104l14-6-2 14z', '#8D6E63', 3)
      + [[78, 104], [104, 88], [134, 86], [158, 98], [92, 116], [124, 108], [150, 116]].map(([x, y]) => C(x, y, 5, '#FFE0B2', 2) + Lc(`M${x - 8} ${y + 8}q8 5 16 0`, '#FFE0B2', 2)).join('') + face(112, 160, 0.6)),
  L('masangin', 'เดินปิดตาลอดต้นไทรคู่', 'Walking blindfolded between the twin banyans', ['masangin', 'มาซังงิน', 'twin banyan trees', 'ต้นไทรคู่', 'alun-alun kidul', 'อาลุนอาลุนกีดุล', 'blindfold walk', 'เดินปิดตา', 'south square', 'ลานกว้างทิศใต้', 'evening game', 'เกมยามเย็น'], 'หาเด็กที่ผูกผ้าปิดตาเดินระหว่างต้นไม้สองต้น', 'Find the child walking blindfolded between the two trees',
    // a twilight square with two huge round banyan trees in little white fences, their hanging roots dangling; between them a child walks with arms out and a red blindfold
    bg('#B39DDB') + C(196, 52, 12, '#FFF59D', 0) + low(176, '#C5E1A5') + frame
      + [52, 188].map((x) => R(x - 8, 110, 16, 72, '#6D4C41', 3) + C(x, 82, 40, '#2E7D32') + C(x - 22, 98, 22, '#388E3C', 0) + C(x + 20, 96, 22, '#43A047', 0) + Lc(`M${x - 24} 104v34M${x - 12} 112v40M${x + 14} 110v36M${x + 26} 102v30`, '#8D6E63', 2) + R(x - 26, 172, 52, 18, '#FFFFFF', 2, 3) + Lc(`M${x - 18} 172v18M${x - 6} 172v18M${x + 6} 172v18M${x + 18} 172v18`, INK, 2)).join('')
      + g(120, 160, 1, C(0, -26, 13, '#F2C29B', 3) + R(-14, -32, 28, 8, '#E53935', 3, 2.5) + Lc('M14-28l8 6', '#E53935', 3) + R(-10, -12, 20, 26, '#FFCA28', 5, 3) + Lc('M-10-6l-22-6M10-6l22-6', '#F2C29B', 5) + Lc('M-5 14l-4 18M5 14l6 18', '#5D4037', 5))
      + face(52, 84, 0.42)),
  L('ratuboko', 'ประตูหินรัตบอโกยามเย็น', 'The stone gate of Ratu Boko at sunset', ['ratu boko', 'รัตบอโก', 'stone gateway', 'ซุ้มประตูหิน', 'hilltop ruins', 'ซากโบราณบนเนิน', 'sunset', 'พระอาทิตย์ตก', 'old palace', 'วังโบราณ'], 'หาช่องประตูเล็กๆ ห้าช่องในซุ้มหิน', 'Find the little doorways in the stone gate',
    // an orange sunset sky, a wide grey stone gateway in two steps with three doorways in front and five behind, stone stairs up to it on a grassy hill
    bg('#FFAB91') + C(120, 82, 30, '#FFE082', 0) + low(170, '#9CCC65') + frame
      + R(30, 92, 180, 66, '#8D8478') + [42, 72, 102, 132, 162].map((x) => P(`M${x} 158v-36c0-10 16-10 16 0v36z`, '#FFCC80', 3)).join('') + R(24, 86, 192, 10, '#7A7266', 2, 3)
      + R(60, 120, 120, 54, '#A79E91') + [74, 110, 146].map((x) => P(`M${x} 174v-34c0-12 20-12 20 0v34z`, '#FFE0B2', 3)).join('') + R(54, 114, 132, 10, '#8D8478', 2, 3)
      + P('M84 174h72l16 36H68z', '#BCAAA4') + Lc('M80 186h80M74 198h92', '#8D8478', 2.5) + face(120, 102, 0.26)),
  L('bakpia', 'บักเปีย ขนมเปี๊ยะไส้ถั่วเขียว', 'Bakpia, little mung-bean pastries', ['bakpia', 'บักเปีย', 'mung bean pastry', 'ขนมเปี๊ยะไส้ถั่ว', 'pathok', 'ปาโถก', 'souvenir box', 'กล่องของฝาก', 'snack', 'ขนม', 'flaky', 'แป้งพับ'], 'หาขนมชิ้นที่ถูกหักครึ่งให้เห็นไส้สีเขียว', 'Find the pastry broken in half to show the green filling',
    // an open cardboard box with rows of round flat golden pastries with brown-toasted tops, one in front broken in half showing pale green bean filling
    P('M28 122h184l-12 80H40z', '#FFE0B2') + P('M28 122l-12-30h184l12 30z', '#FFCC80') + Lc('M40 140h160', '#E0B47A', 2)
      + [[64, 134], [104, 134], [144, 134], [184, 134], [80, 112], [120, 112], [160, 112]].map(([x, y]) => E(x, y, 22, 10, '#F5C26B', 3) + E(x, y - 2, 12, 5, '#C98A3A', 0)).join('')
      + g(120, 196, 1, P('M-46 0c0-16 18-24 38-24l6 24z', '#F5C26B', 4) + P('M-40-4c4-8 16-12 26-12l4 16z', '#C5E1A5', 0) + P('M4 0l6-24c20 0 38 8 38 24z', '#F5C26B', 4) + P('M10-4l4-14c12 0 26 6 28 14z', '#C5E1A5', 0) + E(0, 2, 52, 6, '#E6A85A', 3))
      + face(120, 112, 0.36)),
  L('angkringan', 'แผงอังกริงงันกับห่อข้าวแมว', 'An angkringan cart and its tiny rice parcels', ['angkringan', 'อังกริงงัน', 'nasi kucing', 'ข้าวแมว', 'street food cart', 'รถเข็นอาหาร', 'charcoal kettles', 'กาต้มน้ำบนเตาถ่าน', 'bench', 'ม้านั่ง', 'late night snack', 'ของกินกลางคืน'], 'หาห่อข้าวเล็กๆ ที่ห่อด้วยใบตอง', 'Find the tiny rice parcels wrapped in leaves',
    // a wooden pushcart under an orange tarp roof: three fat kettles steaming on a charcoal stove at one end, little triangle rice parcels in banana leaf piled on trays, a long bench in front
    Lc('M36 70v70M204 70v70', '#8D6E63', 5) + P('M22 74c30-22 166-22 196 0l-8 10H30z', '#FF7043') + Lc('M48 66v14M80 62v16M112 60v18M144 62v16M176 64v16', '#E64A19', 2)
      + R(28, 130, 184, 56, '#D7A86E', 3) + Lc('M28 150h184', '#B98A55', 2) + R(148, 114, 56, 18, '#5D4037', 2) + [[160, 108], [178, 104], [196, 108]].map(([x, y]) => E(x, y, 9, 10, '#B0BEC5', 3) + Lc(`M${x + 8} ${y - 2}l7-4`, INK, 3) + Lc(`M${x} ${y - 16}c-4-6 4-8 0-14`, '#FFFFFF', 3)).join('')
      + [[46, 124], [66, 124], [86, 124], [106, 124], [126, 124], [56, 110], [76, 110], [96, 110], [116, 110], [86, 96]].map(([x, y]) => P(`M${x - 10} ${y + 6}l10-16 10 16z`, '#7CB342', 2.5) + Lc(`M${x - 4} ${y + 2}h8`, '#33691E', 1.5)).join('')
      + C(50, 192, 12, INK, 0) + C(190, 192, 12, INK, 0) + R(40, 204, 160, 10, '#A1887F', 3) + Lc('M54 214v12M186 214v12', '#6D4C41', 5) + face(86, 102, 0.24)),
  L('tugu', 'อนุสาวรีย์ตูกูกลางวงเวียน', 'The Tugu monument on its roundabout', ['tugu yogyakarta', 'ตูกูยอกยา', 'white monument', 'อนุสาวรีย์สีขาว', 'golden spiral top', 'ยอดเกลียวสีทอง', 'roundabout', 'วงเวียน', 'city landmark', 'จุดสังเกตกลางเมือง'], 'หายอดเกลียวสีทองบนเสาสีขาว', 'Find the golden spiral on top of the white column',
    // a white column on a square stepped base with green and gold trim, tapering up to a round golden spiral like a twisted flame, on a little round island in the road
    E(120, 204, 96, 18, '#90A4AE', 0) + E(120, 198, 70, 12, '#7CB342') + R(84, 168, 72, 30, '#FFFFFF', 3) + Lc('M84 176h72', '#2E7D32', 4) + R(92, 150, 56, 20, '#FFFFFF', 3)
      + P('M100 150l8-84h24l8 84z', '#FFFFFF') + Lc('M104 120h32M106 96h28', '#2E7D32', 3) + R(104, 58, 32, 10, '#FFCA28', 2, 3)
      + P('M120 18c18 6 18 22 6 30 10 4 6 12-6 12-14 0-20-10-12-18-8-8 0-20 12-24z', '#FFCA28') + Lc('M114 38c6 4 14 0 12-8', '#E0A100', 2.5) + face(120, 128, 0.3)),
  L('breksi', 'หน้าผาหินแกะสลักเตอบิงเบรกซี', 'The carved cliffs of Tebing Breksi', ['tebing breksi', 'เตอบิงเบรกซี', 'carved cliff', 'หน้าผาแกะสลัก', 'old stone quarry', 'เหมืองหินเก่า', 'stairs to the top', 'บันไดขึ้นยอด', 'sunset view', 'ชมวิวพระอาทิตย์ตก'], 'หาบันไดที่แกะลงไปในหน้าผา', 'Find the stairs carved into the cliff',
    // tall cream limestone walls cut in flat blocks, a big swirl and leaf pattern carved deep into the front face, a stair cut zigzagging up the side to a child waving on top
    bg('#B3E5FC') + low(196, '#AED581') + frame + P('M30 210V74h70v-20h80v40h30v116z', '#F3E5C8') + Lc('M100 74v136M180 94v116', '#D7C29E', 3)
      + C(140, 150, 26, 'none', 0) + Lc('M140 150m-24 0a24 24 0 1 0 24-24c-14 0-18 16-8 20s14-6 8-8', '#C8AE80', 6) + P('M44 120c14-14 30-14 40 0-10 14-26 14-40 0z', '#E8D4AA') + Lc('M44 120h40', '#C8AE80', 3)
      + Array.from({ length: 6 }, (_, k) => R(186 + (k % 2) * 8, 196 - k * 18, 20, 8, '#D7C29E', 1, 2.5)).join('')
      + g(140, 46, 1, C(0, -6, 8, '#F2C29B', 2.5) + R(-7, 2, 14, 14, '#29B6F6', 3, 2.5) + Lc('M7 4l10-10', '#F2C29B', 4)) + face(64, 168, 0.4)),
  L('wedangronde', 'เวดังรนเด น้ำขิงบัวลอย', 'Wedang ronde, hot ginger soup with rice balls', ['wedang ronde', 'เวดังรนเด', 'ginger soup', 'น้ำขิงร้อน', 'glutinous rice balls', 'บัวลอยไส้ถั่ว', 'peanuts', 'ถั่วลิสง', 'warm drink', 'เครื่องดื่มอุ่นๆ', 'evening treat', 'ของหวานยามค่ำ'], 'หาลูกบัวลอยสีชมพูในถ้วย', 'Find the pink rice ball in the bowl',
    // a big white bowl of golden ginger soup with steam curls: white, pink and green round rice balls, roasted peanuts, a slice of ginger and cubes of bread floating
    E(120, 196, 70, 10, '#D7CCC8', 0) + Lc('M90 70c-8-12 8-18 0-30M120 64c-8-12 8-18 0-30M150 70c-8-12 8-18 0-30', '#B0BEC5', 4)
      + P('M30 112h180c0 50-40 84-90 84s-90-34-90-84z', '#FFFFFF') + Lc('M44 150c30 12 122 12 152 0', '#64B5F6', 4) + E(120, 112, 90, 20, '#FFCA6B')
      + [[86, 110, '#FFFFFF'], [120, 104, '#F8BBD0'], [156, 112, '#FFFFFF'], [104, 118, '#C5E1A5']].map(([x, y, c]) => C(x, y, 12, c, 3)).join('')
      + [[66, 114], [72, 106], [176, 106], [140, 120]].map(([x, y]) => E(x, y, 5, 3.5, '#C98A3A', 2)).join('') + R(136, 100, 12, 10, '#FFF3D6', 2, 2) + E(176, 118, 8, 5, '#FFE082', 2) + face(120, 103, 0.22)),
  L('salak', 'ซาลัก ผลไม้หนังงู', 'Salak, the snake-skin fruit', ['salak', 'ซาลัก', 'snake fruit', 'ผลไม้หนังงู', 'salak pondoh', 'ซาลักปนโดะห์', 'scaly skin', 'เปลือกเกล็ด', 'sweet fruit', 'ผลไม้หวาน', 'sleman', 'เซอเลอมัน'], 'หาผลที่ปอกเปลือกแล้วเห็นเนื้อสีขาว', 'Find the peeled fruit with white flesh inside',
    // three teardrop fruits with pointed tips, their brown skin covered in rows of dark triangle scales like a snake, on a stem; in front one peeled open with its skin curling back round three plump cream lobes
    Lc('M120 26v36', '#6D4C41', 6) + [[78, 112], [162, 112], [120, 98]].map(([x, y]) => P(`M${x} ${y - 52}c10 10 34 30 34 56s-14 40-34 40-34-14-34-40 24-46 34-56z`, '#9A5A33')
      + [[-28, [-14, 0, 14]], [-12, [-21, -7, 7, 21]], [4, [-21, -7, 7, 21]], [20, [-14, 0, 14]], [-42, [0]]].map(([dy, xs]) => xs.map((dx) => P(`M${x + dx - 5} ${y + dy - 4}h10l-5 8z`, '#4E2612', 0)).join('')).join('')).join('')
      + g(120, 200, 1, P('M-46 0c-6-20 0-34 12-40l14 30zM46 0c6-20 0-34-12-40l-14 30z', '#9A5A33', 4) + P('M-26 4c-4-24 6-44 26-48 20 4 30 24 26 48z', '#FFF8E1', 4) + Lc('M-8-38c-4 14-4 30 0 40M8-38c4 14 4 30 0 40', '#E6D3A8', 2.5) + E(0, 6, 48, 6, '#A1774A', 3))
      + face(120, 174, 0.32)),
  L('jamu', 'ยาจามูในขวดแก้วกับตะกร้าไม้ไผ่', 'Jamu tonics in a bamboo basket', ['jamu', 'จามู', 'herbal tonic', 'เครื่องดื่มสมุนไพร', 'turmeric drink', 'น้ำขมิ้น', 'kunyit asam', 'กุนยิตอาซัม', 'ginger root', 'รากขิง', 'bamboo basket', 'ตะกร้าไม้ไผ่'], 'หาขวดน้ำสีเหลืองสดในตะกร้า', 'Find the bright yellow bottle in the basket',
    // a round woven bamboo basket holding tall glass bottles of yellow, green, orange and brown tonics, a little glass cup in front, knobbly turmeric and ginger roots beside it
    [[78, '#FFCA28'], [104, '#8BC34A'], [130, '#FF8A3D'], [156, '#8D6E63']].map(([x, c], k) => R(x - 11, 64 + (k % 2) * 8, 22, 72, c, 6, 3.5) + R(x - 6, 50 + (k % 2) * 8, 12, 16, '#FFFFFF', 3, 3) + R(x - 8, 44 + (k % 2) * 8, 16, 8, '#A1887F', 2, 3) + Lc(`M${x - 5} ${84 + (k % 2) * 8}v34`, '#FFFFFF', 3)).join('')
      + P('M44 120h152l-12 76H56z', '#E0B47A') + Array.from({ length: 8 }, (_, k) => Lc(`M${58 + k * 18} 120l-2 76`, '#B98A55', 2.5)).join('') + Lc('M46 140h148M50 164h140M54 186h132', '#B98A55', 2.5)
      + P('M188 184l6 28h20l6-28z', '#FFF8E1', 3.5) + R(193, 196, 22, 14, '#FFCA28', 2, 0) + P('M20 206c4-12 14-12 20-6 6-8 16-6 18 4-6 8-34 10-38 2z', '#E6A040', 3) + Lc('M30 202v-6M46 200v-8', '#C77A1E', 2.5)
      + face(78, 104, 0.24)),
];

export default {
  places: {
    'id-yogyakarta': { country: 'id', wave: 3, name: nm('ยอกยาการ์ตาและบุโรพุทโธ', 'Yogyakarta and Borobudur'), tz: 'Asia/Jakarta', ll: [-7.8, 110.37], alias: ['yogyakarta', 'ยอกยาการ์ตา', 'jogja', 'jogjakarta', 'ย็อกยา', 'borobudur', 'บุโรพุทโธ', 'prambanan', 'พรัมบานัน', 'malioboro', 'มาลิโอโบโร', 'YIA', 'JOG'], colors: YG },
  },
  items,
};
