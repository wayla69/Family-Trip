// Wave 7, the Americas (1): New York, California, Orlando, Hawaii, Vancouver, Banff, the Grand Canyon and Las Vegas — one new idea per picture
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (us/newyork/landmark-grandcentral.v1.svg → us-newyork.landmark.grandcentral; us/orlando/… → p-orlando…)
const SCOPE = { 'us-orlando': 'p-orlando', 'us-yellowstone': 'p-yellowstone' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
// a thick coloured band with an ink outline (slides, rivers, arches)
const band = (d, colour, w) => Lc(d, INK, w + 5) + Lc(d, colour, w);
const pine = (x, y, h, c = '#2E7D32') => P(`M${x} ${y - h}l${h * 0.32} ${h * 0.55}h-${h * 0.12}l${h * 0.2} ${h * 0.45}h-${h * 0.8}l${h * 0.2}-${h * 0.45}h-${h * 0.12}z`, c, 2);
const palm = (x, y, h) => Lc(`M${x} ${y}c4-${h * 0.4}-2-${h * 0.7} 4-${h}`, '#6D4C41', 5) + [-26, -12, 0, 14, 28].map((dx) => Lc(`M${x + 4} ${y - h}q${dx * 0.6}-10 ${dx} ${8 - Math.abs(dx) * 0.1}`, '#2E7D32', 4)).join('');
const star = (x, y, r, c) => P(`M${x} ${y - r}l${r * 0.3} ${r * 0.7} ${r * 0.7} ${r * 0.3}-${r * 0.7} ${r * 0.3}-${r * 0.3} ${r * 0.7}-${r * 0.3}-${r * 0.7}-${r * 0.7}-${r * 0.3} ${r * 0.7}-${r * 0.3}z`, c, 0);

const items = [
  // ---------- New York
  L('us/newyork/landmark-grandcentral.v1.svg', 'โถงใหญ่สถานีแกรนด์เซ็นทรัล', 'The great hall of Grand Central', ['grand central terminal', 'แกรนด์เซ็นทรัล', 'main concourse', 'โถงสถานีรถไฟ', 'golden clock', 'นาฬิกาทอง', 'starry ceiling', 'เพดานดวงดาว', 'information booth', 'train station'], 'หานาฬิกาทองกลมที่มีสี่หน้าบนซุ้มกลางโถง', 'Find the round golden clock with four faces on the booth in the middle of the hall',
    // the great hall of a station: a teal vaulted ceiling with golden stars, three huge arched windows with beams of light, the round information booth with its four-faced golden clock, tiny travellers on the marble floor
    sky('#F3E0B5') + P('M-4-4h248v74c-70-26-178-26-248 0z', '#26A69A') + [[30, 20], [70, 34], [112, 14], [158, 30], [206, 18], [190, 46], [48, 50]].map(([x, y]) => star(x, y, 6, '#FFD54F')).join('') + Lc('M70 34l42-20 46 16', '#FFD54F', 1.5)
      + [30, 95, 160].map((x) => P(`M${x} 170V100a25 25 0 0 1 50 0v70z`, '#E3F2FD', 3) + Lc(`M${x + 17} 80v90M${x + 33} 80v90M${x} 120h50M${x} 145h50`, '#90A4AE', 1.5) + P(`M${x + 6} 172l-22 46h${66}l-10-46z`, '#FFF9C4', 0)).join('')
      + P('M-4 188h248v56H-4z', '#D7B98E') + Lc('M-4 206h248M-4 226h248', '#C8A165', 1.5)
      + R(78, 178, 84, 34, '#C8A165', 6, 3) + R(88, 186, 64, 12, '#8D6E63', 2, 2) + Lc('M120 178v-22', '#B8860B', 4) + C(120, 140, 19, '#FFD54F', 3) + C(120, 140, 13, '#FFFDF7', 2) + face(120, 138, 0.3)
      + kid(40, 228, '#E53935', 0.8) + kid(200, 230, '#1E88E5', 0.8)),
  L('us/newyork/landmark-chrysler.v1.svg', 'ตึกไครสเลอร์ยอดโค้งเงินวาว', 'The Chrysler Building\'s shiny crown', ['chrysler building', 'ตึกไครสเลอร์', 'art deco', 'อาร์ตเดโค', 'silver spire', 'ยอดแหลมเงิน', 'sunburst windows', 'หน้าต่างรูปรัศมี', 'midtown', 'skyscraper'], 'หายอดตึกที่มีโค้งสีเงินซ้อนกันเหมือนรัศมีพระอาทิตย์', 'Find the tower top made of silver arches stacked like a sunburst',
    // a slim skyscraper whose top is a stack of shrinking shiny silver arches with rows of little triangle windows, a needle spire on top, a smiling face on the tower, shorter buildings around it
    sky('#BBDEFB') + R(-4, 150, 70, 100, '#90A4AE', 0, 3) + R(176, 130, 70, 120, '#B0BEC5', 0, 3) + [0, 1, 2].map((k) => R(8 + k * 18, 162, 10, 12, '#FFF59D', 0, 1.5) + R(188 + k * 18, 142, 10, 12, '#FFF59D', 0, 1.5)).join('')
      + R(88, 120, 64, 130, '#CFD8DC', 0, 3) + Array.from({ length: 4 }, (_, r) => [0, 1, 2, 3].map((k) => R(94 + k * 14, 178 + r * 16, 8, 10, '#455A64', 0, 1)).join('')).join('')
      + [0, 1, 2, 3, 4].map((k) => { const w = 64 - k * 12, x = 88 + k * 6, y = 120 - k * 18; return P(`M${x} ${y}a${w / 2} ${w / 2 * 0.9} 0 0 1 ${w} 0z`, k % 2 ? '#ECEFF1' : '#B0BEC5', 3) + (w > 20 ? [-1, 0, 1].map((j) => P(`M${120 + j * w * 0.28} ${y - 2}l-3-${w * 0.18}h6z`, '#37474F', 0)).join('') : ''); }).join('')
      + Lc('M120 48V6', '#B0BEC5', 3) + Lc('M120 48V6', INK, 1) + face(120, 146, 0.45)),
  // ---------- California
  L('us/california/landmark-redwoods.v1.svg', 'ต้นเรดวูดยักษ์ที่รถลอดผ่านได้', 'A giant redwood a car can drive through', ['redwoods', 'เรดวูด', 'drive-through tree', 'ต้นไม้ที่รถลอดได้', 'tallest trees', 'ต้นไม้สูงที่สุด', 'redwood forest', 'ป่าเรดวูด', 'avenue of the giants', 'ferns'], 'หาอุโมงค์ในโคนต้นไม้ที่มีรถสีเหลืองลอดผ่าน', 'Find the tunnel in the tree trunk with a yellow car driving through',
    // a forest of enormous red-brown trunks taller than the picture, the biggest one with a tunnel cut through its foot and a little yellow car inside, ferns on the ground, a child tiny beside it
    sky('#DCEDC8') + Lc('M10 -4v220M30 -4v220', '#B0896B', 18) + R(200, -4, 40, 222, '#8D5A3B', 0, 3) + Lc('M60 30l40 -20M60 60l20 -10', '#A5D6A7', 0)
      + P('M66-4h108v196c0 12 10 20 26 28H40c16-8 26-16 26-28z', '#A0522D', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${76 + k * 17} 0c-3 50 3 110-2 180`, '#7B3F1E', 2)).join('')
      + P('M94 220v-44a26 26 0 0 1 52 0v44z', '#3E2723', 3) + g(120, 206, 1, R(-18, -6, 36, 14, '#FFCA28', 4, 2.5) + P('M-12-6l4-8h16l4 8z', '#FFCA28', 2.5) + R(-6, -12, 10, 6, '#B3E5FC', 1, 1.5) + C(-10, 9, 4, INK, 0) + C(10, 9, 4, INK, 0))
      + P('M-4 216h248v28H-4z', '#6D4C41') + [[14, 222], [60, 228], [176, 226], [226, 220]].map(([x, y]) => [-1, 0, 1].map((j) => Lc(`M${x} ${y}q${j * 10}-14 ${j * 18}-18`, '#43A047', 4)).join('')).join('')
      + kid(186, 236, '#1E88E5', 0.7) + face(120, 110, 0.5)),
  L('us/california/landmark-bixbybridge.v1.svg', 'สะพานโค้งบิกซ์บีริมทะเลบิ๊กเซอร์', 'Bixby Bridge on the Big Sur coast', ['bixby bridge', 'สะพานบิกซ์บี', 'big sur', 'บิ๊กเซอร์', 'highway 1', 'ไฮเวย์วัน', 'pacific coast highway', 'ถนนเลียบชายฝั่ง', 'concrete arch bridge', 'sea cliffs'], 'หาสะพานโค้งสีขาวที่มีเสาเล็กๆ ยืนเรียงบนโค้ง', 'Find the white arch with rows of little posts standing on it',
    // one tall white concrete arch leaping across a green coastal canyon, a row of thin posts holding the road on top, a red car crossing, blue Pacific waves crashing on rocks below, golden hills behind
    sky('#B3E5FC') + P('M-4 90c50-30 100-34 140-20s70-10 108 6v80H-4z', '#C5A55A', 0) + P('M-4 130h248v114H-4z', '#1E88E5') + Lc('M10 190c20-8 40 8 60 0M150 210c20-8 40 8 60 0', '#E3F2FD', 3)
      + P('M-4 100c30 0 50 20 56 60s0 84 0 84H-4z', '#7CB342', 3) + P('M244 100c-30 0-50 20-56 60s0 84 0 84h56z', '#7CB342', 3) + E(64, 222, 18, 10, '#8D6E63', 2.5) + E(178, 226, 16, 9, '#8D6E63', 2.5)
      + [62, 78, 94, 110, 130, 146, 162, 178].map((x) => { const t = (x - 50) / 140; const y = 200 - 260 * t * (1 - t); return R(x - 3, 104, 6, y - 104, '#ECEFF1', 0, 2); }).join('')
      + band('M50 200Q120 70 190 200', '#ECEFF1', 9) + R(14, 96, 212, 10, '#ECEFF1', 2, 3) + g(150, 90, 1, R(-12, -4, 24, 9, '#E53935', 3, 2) + P('M-7-4l3-5h8l3 5z', '#E53935', 2) + C(-7, 6, 3, INK, 0) + C(7, 6, 3, INK, 0))
      + face(120, 120, 0.35)),
  // ---------- Orlando
  L('us/orlando/landmark-manatee.v1.svg', 'พะยูนแมนาทีในน้ำพุใส', 'A manatee in a clear spring', ['manatee', 'แมนาที', 'sea cow', 'วัวทะเล', 'blue spring', 'บลูสปริง', 'clear spring water', 'น้ำพุใส', 'gentle giant', 'florida springs'], 'หาหางรูปพายกลมแบนของแมนาที', 'Find the manatee\'s flat round paddle tail',
    // a chubby grey manatee with a round paddle tail and a whiskery snout floating through clear blue spring water, beams of sunlight, eelgrass on the sandy bottom, little fish and bubbles
    sky('#4FC3F7') + [[30, 0], [90, 0], [150, 0]].map(([x]) => P(`M${x} -4l30 0-40 180h-14z`, '#81D4FA', 0)).join('') + P('M-4 200c60-12 180-12 248 0v44H-4z', '#FFE0B2', 0)
      + [20, 44, 190, 214].map((x) => Lc(`M${x} 220c-6-20 6-34-2-54`, '#43A047', 4)).join('')
      + P('M44 132c0-34 40-50 80-46s68 22 66 46c-2 26-40 42-80 40s-66-14-66-40z', '#90A4AE', 3) + P('M186 128c18-24 52-20 52 4s-34 26-52 4z', '#90A4AE', 3)
      + P('M84 160c-6 14-16 20-26 18 4-10 10-16 18-22z', '#78909C', 2.5) + E(52, 138, 18, 16, '#B0BEC5', 3) + [[42, 140], [48, 146], [56, 142]].map(([x, y]) => C(x, y, 1.6, INK, 0)).join('') + face(84, 122, 0.5, 'none')
      + E(170, 58, 12, 6, '#FFD54F', 2) + P('M182 58l8-6v12z', '#FFD54F', 2) + E(36, 70, 9, 5, '#FF8A65', 2) + P('M27 70l-7-5v10z', '#FF8A65', 2) + [[110, 60, 5], [118, 44, 4], [112, 30, 3]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 1.5)).join('')),
  L('us/orlando/landmark-orangegrove.v1.svg', 'สวนส้มฟลอริดา', 'A Florida orange grove', ['orange grove', 'สวนส้ม', 'florida oranges', 'ส้มฟลอริดา', 'orange picking', 'เก็บส้ม', 'orange juice', 'น้ำส้มคั้น', 'citrus', 'ส้ม'], 'หาส้มลูกยิ้มที่อยู่ในตะกร้า', 'Find the smiling orange in the basket',
    // rows of round green orange trees heavy with fruit under a sunny sky, one big tree in front, a wicker basket piled with oranges (one smiling), a child holding up an orange
    sky('#FFF3E0') + C(206, 34, 18, '#FFD54F', 0) + P('M-4 120h248v124H-4z', '#AED581') + Lc('M-4 150h248M-4 180h248', '#9CCC65', 3)
      + [[20, 110], [70, 104], [180, 104], [228, 110]].map(([x, y]) => Lc(`M${x} ${y + 10}v18`, '#6D4C41', 4) + C(x, y, 22, '#388E3C', 2.5) + C(x - 8, y - 4, 4, '#FB8C00', 1.5) + C(x + 9, y + 6, 4, '#FB8C00', 1.5)).join('')
      + R(112, 120, 14, 70, '#6D4C41', 3, 3) + C(120, 96, 54, '#43A047', 3) + [[90, 80], [118, 60], [150, 84], [100, 112], [140, 116], [126, 92], [80, 104]].map(([x, y]) => C(x, y, 8, '#FB8C00', 2) + Lc(`M${x} ${y - 8}l2-4`, '#2E7D32', 2)).join('')
      + P('M142 196h76l-8 40h-60z', '#C8A165', 3) + Lc('M146 210h68M148 222h64', '#A1673F', 2) + [[154, 192], [170, 186], [188, 190], [204, 192]].map(([x, y]) => C(x, y, 10, '#FB8C00', 2.5)).join('') + face(170, 184, 0.25)
      + kid(70, 232, '#FFCA28') + C(58, 206, 7, '#FB8C00', 2)),
  L('us/orlando/landmark-upsidedownhouse.v1.svg', 'บ้านกลับหัวบนถนนอินเตอร์เนชันแนลไดรฟ์', 'The upside-down house on International Drive', ['upside-down house', 'บ้านกลับหัว', 'upside down building', 'ตึกกลับหัว', 'international drive', 'อินเตอร์เนชันแนลไดรฟ์', 'science play museum', 'พิพิธภัณฑ์วิทยาศาสตร์', 'i-drive', 'funny building'], 'หาประตูบ้านที่อยู่ข้างบนสุดแทนที่จะอยู่ข้างล่าง', 'Find the front door that is at the very top instead of the bottom',
    // a big white columned building standing on its head: the pointed roof touches the ground, the columns hang upside down, the front door and steps are at the top, a palm tree upside down on the roof, a laughing child below
    sky('#B3E5FC') + P('M-4 206h248v38H-4z', '#BDBDBD') + Lc('M-4 222h248', '#9E9E9E', 2)
      + P('M30 150h180l-90 54z', '#FFFFFF', 3) + R(40, 52, 160, 98, '#F5F5F5', 0, 3) + R(34, 140, 172, 10, '#E0E0E0', 0, 3) + R(34, 52, 172, 10, '#E0E0E0', 0, 3)
      + [52, 82, 140, 170].map((x) => R(x, 62, 16, 78, '#FFFFFF', 0, 2.5) + R(x - 3, 62, 22, 6, '#E0E0E0', 0, 2) + R(x - 3, 134, 22, 6, '#E0E0E0', 0, 2)).join('') + R(104, 62, 32, 44, '#8D6E63', 2, 3) + C(126, 90, 2.5, '#FFD54F', 0)
      + R(96, 38, 48, 8, '#E0E0E0', 0, 2.5) + R(100, 44, 40, 8, '#EEEEEE', 0, 2.5) + g(186, 48, 1, Lc('M0 0c-4-14 2-26-2-36', '#6D4C41', 5), 180) + [-20, -8, 4, 16].map((dx) => Lc(`M186 86q${dx * 0.6} 10 ${dx} 6`, '#2E7D32', 4)).join('')
      + face(120, 170, 0.35) + kid(50, 236, '#E53935') + kid(208, 236, '#7B1FA2')),
  L('us/orlando/landmark-minigolf.v1.svg', 'มินิกอล์ฟภูเขาไฟกับไดโนเสาร์', 'Adventure mini golf with a volcano', ['mini golf', 'มินิกอล์ฟ', 'adventure golf', 'กอล์ฟผจญภัย', 'putt putt', 'พัตต์กอล์ฟ', 'fake volcano', 'ภูเขาไฟจำลอง', 'dinosaur statue', 'family games'], 'หาธงสีแดงที่ปักอยู่ตรงหลุม', 'Find the little red flag sticking out of the hole',
    // a twisting bright green putting course edged with stones, a pretend volcano with red lava and a smiling face, a friendly long-necked dinosaur statue, a child with a putter and a white ball, the hole with a red flag, palm trees
    sky('#B3E5FC') + palm(20, 120, 70) + palm(226, 110, 64) + P('M100 120l30-70h30l34 70z', '#8D6E63', 3) + P('M130 50c6 10 24 10 30 0l-6 18c-6-6-12-6-18 0z', '#E53935', 3) + Lc('M140 62c-2 14 4 20 0 34M152 60c2 10-2 16 2 26', '#FF7043', 3) + face(145, 96, 0.4)
      + P('M30 140c4-20-4-40 8-56 6-8 18-6 18 4 0 8-8 10-10 20 0 10 12 14 14 32z', '#66BB6A', 3) + C(46, 82, 2, INK, 0) + E(60, 136, 14, 10, '#66BB6A', 3)
      + P('M-4 132h248v112H-4z', '#B2DFDB', 0) + P('M-4 160c40-10 80 20 120 10s80-40 128-20v40c-48-20-88 10-128 20S36 200-4 210z', '#4CAF50', 3) + P('M-4 160c40-10 80 20 120 10s80-40 128-20', 'none', 0)
      + E(186, 172, 7, 3.5, INK, 0) + Lc('M186 172V136', '#5D4037', 2.5) + P('M187 136l18 6-18 6z', '#E53935', 2) + C(120, 196, 4, '#FFFFFF', 2)
      + kid(96, 220, '#FFCA28') + Lc('M104 214l12-20', '#8D6E63', 3) + R(110, 192, 10, 4, '#90A4AE', 1, 1.5)),
  L('us/orlando/landmark-springtubing.v1.svg', 'ล่องห่วงยางในลำธารน้ำใส', 'Floating in tubes down a clear spring run', ['tubing', 'ล่องห่วงยาง', 'spring run', 'ลำธารน้ำใส', 'rock springs', 'ร็อกสปริงส์', 'wekiwa springs', 'เวคิวาสปริงส์', 'inner tube', 'cypress trees'], 'หาห่วงยางสีส้มที่ลอยอยู่บนน้ำใส', 'Find the orange tube floating on the clear water',
    // a clear turquoise stream winding between cypress trees draped with grey moss, the sandy bottom and a fish showing through the water, two children lazing in big rubber tubes, one orange, one pink
    sky('#E8F5E9') + [[20, 150], [214, 140]].map(([x, y]) => P(`M${x - 10} ${y}l6-130h8l6 130z`, '#795548', 3) + E(x, 26, 34, 18, '#558B2F', 3) + Lc(`M${x - 18} 34v26M${x - 4} 38v34M${x + 12} 34v22`, '#B0BEC5', 3)).join('')
      + P('M60 244c-10-40 30-80 10-120s10-60 40-80h60c-30 20-40 40-20 80s-10 80 0 120z', '#4DD0E1', 3) + P('M-4 244V140c30 0 50 30 64 104zM244 244V130c-30 0-56 40-64 114z', '#7CB342', 3)
      + P('M84 200c10 4 20 4 30 0-4 8-4 14 0 20-10-4-20-4-30 0 4-6 4-14 0-20z', 'none', 0) + E(120, 230, 9, 4, '#FFB74D', 1.5) + P('M129 230l7-4v8z', '#FFB74D', 1.5) + Lc('M90 110c8-4 16 4 24 0M98 200c8-4 16 4 24 0', '#E0F7FA', 2.5)
      + [[100, 170, '#FF7043', '#1E88E5'], [134, 112, '#F06292', '#FFCA28']].map(([x, y, tube, top]) => E(x, y, 26, 11, tube, 3) + E(x, y, 11, 4, '#26C6DA', 2) + g(x, y - 2, 1, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 2v-14h16v14z', top, 2) + face(0, -18, 0.22))).join('')),
  L('us/orlando/landmark-waterpark.v1.svg', 'สไลเดอร์บิดเกลียวในสวนน้ำ', 'The twisting slides of a water park', ['water park', 'สวนน้ำ', 'water slides', 'สไลเดอร์น้ำ', 'lazy river', 'ล่องห่วงยาง', 'splash pool', 'สระน้ำ', 'tube slide', 'สไลเดอร์ห่วงยาง'], 'หาสไลเดอร์สีเหลืองที่บิดเป็นเกลียวลงมาที่สระ', 'Find the yellow slide twisting round and round down to the pool',
    // a tall wooden slide tower with a smiling face, red, yellow and blue tube slides twisting down from it into a splash pool, a child whooshing out on a ring, big splashes, palm trees
    sky('#B3E5FC') + palm(18, 160, 80) + palm(230, 150, 70) + R(100, 30, 40, 150, '#A1673F', 0, 3) + R(92, 24, 56, 10, '#8D6E63', 2, 3) + P('M92 24l28-18 28 18z', '#E53935', 3) + Lc('M106 60v110M134 60v110M100 90h40M100 130h40', '#8D6E63', 3) + face(120, 70, 0.35)
      + band('M100 40c-60 10-70 40-30 54s40 40-10 56c-30 10-26 34-10 46', '#FFCA28', 14) + band('M140 40c70 0 80 40 40 60s-20 60 10 90', '#1E88E5', 14) + band('M140 110c30 10 30 40 0 50s-30 30-6 44', '#E53935', 12)
      + P('M-4 196c40-8 200-8 248 0v48H-4z', '#4FC3F7', 3) + Lc('M20 218c14-4 28 4 42 0M170 226c14-4 28 4 42 0', '#E1F5FE', 3)
      + [[60, 196], [72, 186], [50, 184], [84, 196]].map(([x, y]) => C(x, y, 5, '#E1F5FE', 2)).join('') + g(96, 206, 1, E(0, 0, 18, 7, '#FF7043', 2.5) + C(0, -16, 8, '#FFE0BD', 2) + P('M-7 0v-10h14v10z', '#7B1FA2', 2) + face(0, -14, 0.22) + Lc('M-8-10l-8-8M8-10l8-8', '#FFE0BD', 3))),
  // ---------- Hawaii
  L('us/hawaii/landmark-napali.v1.svg', 'หน้าผาจีบเขียวชายฝั่งนาปาลี', 'The green pleated cliffs of the Nā Pali Coast', ['na pali coast', 'ชายฝั่งนาปาลี', 'kauai', 'เกาะคาวาอี', 'sea cliffs', 'หน้าผาริมทะเล', 'kalalau trail', 'เส้นทางคาลาเลา', 'helicopter tour', 'green ridges'], 'หาหน้าผาสีเขียวที่มีร่องพับเหมือนผ้าจีบ', 'Find the green cliffs folded in deep pleats like a curtain',
    // towering jagged green cliffs with deep vertical pleats dropping straight into a deep blue sea, white surf at their feet, a tiny helicopter flying past, a red-dirt trail in front with a child hiking
    sky('#B3E5FC') + P('M-4 244V90l26-60 18 50 22-70 24 60 20-44 22 64 24-56 18 50 22-40 20 46 32-20v204z', '#43A047', 3)
      + [16, 34, 52, 70, 88, 106, 124, 142, 160, 178, 196, 214, 230].map((x, k) => Lc(`M${x} ${60 + (k % 3) * 14}c-4 30 4 60-2 ${100 + (k % 2) * 20}`, '#2E7D32', 3)).join('')
      + P('M-4 186c60-10 140 6 248-6v64H-4z', '#1565C0', 3) + Lc('M-4 190c20-6 40 6 60 0s40 6 60 0 40 6 60 0 40 6 68 0', '#FFFFFF', 4)
      + P('M-4 222c40-12 80-6 120-16 30-6 60 0 90-10v48H-4z', '#C1502E', 3) + kid(70, 222, '#FFCA28', 0.8)
      + g(180, 34, 1, E(0, 0, 14, 8, '#E53935', 2.5) + Lc('M12 0h16M-18-11h36', INK, 2) + Lc('M0-8v-3M-8 10h18', INK, 2) + R(-6, -4, 8, 6, '#B3E5FC', 1, 1.2)) + face(108, 120, 0.35)),
  L('us/hawaii/landmark-haleakala.v1.svg', 'พระอาทิตย์ขึ้นเหนือทะเลเมฆฮาเลอาคาลา', 'Sunrise above the clouds on Haleakalā', ['haleakala', 'ฮาเลอาคาลา', 'sunrise above the clouds', 'พระอาทิตย์ขึ้นเหนือเมฆ', 'sea of clouds', 'ทะเลเมฆ', 'silversword', 'ต้นซิลเวอร์สอร์ด', 'summit', 'maui'], 'หาต้นไม้กลมสีเงินที่มีใบแหลมเหมือนดาบ', 'Find the round silver plant with leaves like little swords',
    // a summit of red-brown cinder hills above a sea of fluffy white clouds, a huge orange sun rising, a round spiky silver plant with a smiling face, a child wrapped in a blanket watching
    sky('#FFCC80') + P('M-4-4h248v60H-4z', '#CE93D8', 0) + C(120, 112, 32, '#FF7043', 0) + Lc('M60 70h30M150 70h34M40 90h20', '#FFE0B2', 3)
      + P('M-4 120c10-10 24-10 30 0 8-12 26-12 34 0 10-10 24-8 30 2 10-12 28-12 36 0 10-10 26-10 32 0 8-10 24-10 32 0 8-8 22-8 28 2v40H-4z', '#FFFFFF', 3) + Lc('M20 146h40M120 140h50', '#E1F5FE', 3)
      + P('M-4 244V176c40-20 70-16 100-6 30-24 60-26 90-10 20-8 40-6 58 2v82z', '#A1572D', 3) + C(170, 180, 10, '#8D3E1E', 2) + C(40, 196, 8, '#8D3E1E', 2)
      + g(84, 214, 1, Lc('M0 0V-92', '#6D4C41', 5) + Array.from({ length: 9 }, (_, k) => C(k % 2 ? 7 : -7, -34 - k * 7, 5, '#AD1457', 2)).join('') + Array.from({ length: 13 }, (_, k) => { const a = (k / 12) * Math.PI; return Lc(`M0 0l${(-Math.cos(a) * 26).toFixed(1)} ${(-Math.sin(a) * 22).toFixed(1)}`, INK, 6) + Lc(`M0 0l${(-Math.cos(a) * 26).toFixed(1)} ${(-Math.sin(a) * 22).toFixed(1)}`, '#CFD8DC', 3.5); }).join('') + E(0, 0, 18, 8, '#ECEFF1', 3))
      + g(120, 96, 1, face(0, 0, 0.45))
      + g(176, 234, 1, P('M-16 0c0-20 6-30 16-30s16 10 16 30z', '#E53935', 2.5) + C(0, -32, 9, '#FFE0BD', 2) + face(0, -30, 0.24))),
  L('us/hawaii/landmark-taro.v1.svg', 'นาเผือกในหุบเขาฮานาเลย์', 'The taro fields of Hanalei valley', ['taro fields', 'นาเผือก', 'loi kalo', 'โลอีคาโล', 'hanalei valley', 'หุบเขาฮานาเลย์', 'taro', 'เผือก', 'poi', 'kauai'], 'หาใบเผือกรูปหัวใจใบใหญ่ที่มีหน้ายิ้ม', 'Find the big heart-shaped taro leaf with a smiling face',
    // a green valley floor cut into flooded paddies full of heart-shaped taro leaves, steep green mountains with clouds behind, a winding river, one giant taro leaf in front with a face
    sky('#E1F5FE') + E(60, 30, 30, 10, '#FFFFFF', 0) + P('M-4 110c20-60 40-80 60-50 20-40 40-50 60-10 20-40 50-50 70 0 20-30 40-30 58 0v60H-4z', '#2E7D32', 3) + Lc('M40 80c4 10-4 20 0 30M150 60c4 14-4 26 0 40', '#1B5E20', 3)
      + P('M-4 110h248v134H-4z', '#7CB342', 3) + [[6, 120, 70, 30], [84, 118, 76, 34], [170, 120, 70, 30], [10, 160, 90, 34], [110, 162, 120, 34]].map(([x, y, w, h]) => R(x, y, w, h, '#80DEEA', 4, 2.5) + Array.from({ length: Math.floor(w / 16) }, (_, k) => P(`M${x + 9 + k * 16} ${y + h / 2 + 4}c-6-4-8-12-2-14 3-1 2 2 2 2s0-3 3-2c6 2 4 10-3 14z`, '#43A047', 1.5)).join('')).join('')
      + g(120, 224, 1, Lc('M0 20v-14', '#558B2F', 5) + P('M0 6c-40-10-46-40-26-46 12-3 22 6 26 12 4-6 14-15 26-12 20 6 14 36-26 46z', '#43A047', 3) + Lc('M0 6V-28M0-10l-16-10M0-10l16-10', '#2E7D32', 2) + face(0, -14, 0.35))),
  L('us/hawaii/landmark-blacksand.v1.svg', 'หาดทรายดำเกาะฮาวาย', 'A black sand beach on the Big Island', ['black sand beach', 'หาดทรายดำ', 'punaluu', 'ปูนาลูอู', 'lava sand', 'ทรายลาวา', 'big island', 'เกาะใหญ่ฮาวาย', 'coconut palms', 'ต้นมะพร้าว'], 'หาหาดทรายสีดำที่มีรอยเท้าเด็กเดินอยู่', 'Find the black sand with a child\'s footprints on it',
    // a beach of sparkling jet-black sand between dark lava rocks, bright blue waves with white foam, tall coconut palms, a child leaving a trail of footprints, one round lava rock smiling
    sky('#B3E5FC') + P('M-4 96h248v60H-4z', '#0288D1') + Lc('M-4 130c30-8 60 8 90 0s60-8 90 0 40 8 68 0', '#E1F5FE', 4) + Lc('M-4 112c30-6 60 6 90 0s60-6 90 0', '#4FC3F7', 3)
      + P('M-4 150c40-10 80 6 120 0s90-10 128 0v94H-4z', '#37474F', 3) + Lc('M-4 152c40-10 80 6 120 0s90-10 128 0', '#FFFFFF', 4) + Array.from({ length: 16 }, (_, k) => C(10 + (k * 47) % 230, 172 + (k * 13) % 60, 1.5, '#B0BEC5', 0)).join('')
      + palm(40, 180, 110) + palm(196, 170, 100) + E(160, 202, 26, 16, '#212121', 3) + face(160, 198, 0.3) + E(16, 216, 18, 12, '#212121', 3)
      + [[70, 230], [84, 222], [98, 232], [112, 224]].map(([x, y]) => E(x, y, 3.5, 5, '#263238', 0)).join('') + kid(130, 230, '#FFCA28', 0.85)),
  // ---------- Vancouver
  L('ca/vancouver/landmark-steamclock.v1.svg', 'นาฬิกาไอน้ำแก๊สทาวน์', 'The Gastown steam clock', ['steam clock', 'นาฬิกาไอน้ำ', 'gastown', 'แก๊สทาวน์', 'water street', 'ถนนวอเตอร์', 'cobblestones', 'ถนนหินปู', 'whistle', 'old town'], 'หานาฬิกาที่มีไอน้ำพวยพุ่งออกจากหลังคา', 'Find the clock with puffs of steam coming out of its roof',
    // a tall brown iron-and-glass clock on a cobbled street, puffs of white steam whistling from its little roof, a cream clock face with a smile, old red-brick buildings and gas lamps either side
    sky('#FFE0B2') + R(-4, 30, 60, 214, '#A1673F', 0, 3) + R(184, 40, 60, 204, '#B5651D', 0, 3) + [50, 90, 130].map((y) => R(10, y, 14, 20, '#FFF59D', 1, 2) + R(30, y, 14, 20, '#FFF59D', 1, 2) + R(196, y + 6, 14, 20, '#FFF59D', 1, 2) + R(218, y + 6, 14, 20, '#FFF59D', 1, 2)).join('')
      + P('M-4 190h248v54H-4z', '#90A4AE') + Array.from({ length: 18 }, (_, k) => E(8 + (k % 9) * 28 + (Math.floor(k / 9) * 14), 204 + Math.floor(k / 9) * 18, 11, 6, '#B0BEC5', 1.5)).join('')
      + R(100, 140, 40, 60, '#4E342E', 2, 3) + R(96, 196, 48, 10, '#3E2723', 2, 3) + R(104, 76, 32, 66, '#5D4037', 2, 3) + Lc('M108 120h24M108 130h24', '#FFD54F', 2) + C(120, 98, 13, '#FFF8E1', 2.5) + face(120, 96, 0.28)
      + P('M100 76l20-18 20 18z', '#3E2723', 3) + Lc('M120 58v-10', INK, 3) + [[112, 36, 9], [126, 26, 11], [114, 14, 8], [134, 8, 7]].map(([x, y, r]) => C(x, y, r, '#FFFFFF', 2)).join('')
      + [[70, 120], [170, 120]].map(([x, y]) => Lc(`M${x} 196V${y}`, '#263238', 4) + R(x - 7, y - 16, 14, 16, '#FFE082', 2, 2.5)).join('')),
  L('ca/vancouver/landmark-scienceworld.v1.svg', 'ลูกบอลเงินไซแอนซ์เวิลด์', 'Science World\'s shiny silver ball', ['science world', 'ไซแอนซ์เวิลด์', 'geodesic dome', 'โดมทรงลูกบอล', 'silver ball', 'ลูกบอลเงิน', 'false creek', 'ฟอลส์ครีก', 'science museum', 'expo 86'], 'หาลูกบอลยักษ์สีเงินที่ทำจากสามเหลี่ยมเล็กๆ', 'Find the giant silver ball made of little triangles',
    // a huge shiny silver ball made of triangles sitting on a low white building at the water's edge, the ball reflected in the calm creek, snowy blue mountains behind, a tiny rowing boat
    sky('#B3E5FC') + P('M-4 120l40-50 30 30 40-56 46 50 36-34 56 60z', '#90A4AE', 3) + P('M74 44l12 16-12-4-10 6zM120 54l12 14-12-4-8 6z', '#FFFFFF', 0)
      + P('M-4 150h248v94H-4z', '#4FC3F7', 3) + E(120, 186, 50, 14, '#B0BEC5', 0) + Lc('M80 186h80M90 196h60', '#E1F5FE', 2.5)
      + R(66, 140, 108, 14, '#FFFFFF', 2, 3) + C(120, 88, 56, '#CFD8DC', 3)
      + [52, 70, 88, 106, 124].map((y, r) => { const half = Math.sqrt(Math.max(0, 56 * 56 - (y - 88 + 9) * (y - 88 + 9))) - 4; const n = 8; return Lc(Array.from({ length: n + 1 }, (_, k) => `${k ? 'L' : 'M'}${(120 - half + (2 * half * k) / n).toFixed(1)} ${(y + ((k + r) % 2) * 18).toFixed(1)}`).join(''), '#90A4AE', 2); }).join('')
      + C(120, 88, 56, 'none', 3) + E(98, 60, 14, 8, '#FFFFFF', 0) + face(120, 100, 0.5)),
  L('ca/vancouver/landmark-lumberjack.v1.svg', 'โชว์คนตัดไม้กลิ้งซุงบนภูเขากราวส์', 'The lumberjack log-rolling show on Grouse Mountain', ['lumberjack show', 'โชว์คนตัดไม้', 'log rolling', 'กลิ้งซุง', 'grouse mountain', 'ภูเขากราวส์', 'plaid shirt', 'เสื้อลายสก็อต', 'logger sports', 'mountain top'], 'หาคนเสื้อลายสก็อตที่ยืนทรงตัวบนท่อนซุงในน้ำ', 'Find the person in the checked shirt balancing on a log in the water',
    // a pond in a pine forest on a mountain top, a lumberjack in a red-and-black checked shirt balancing with arms out on a spinning log, a second one splashing into the water, wooden benches of cheering children
    sky('#C8E6C9') + [10, 40, 70, 180, 210, 236].map((x, k) => pine(x, 120, 90 - (k % 2) * 16, '#2E7D32')).join('') + P('M-4 120h248v124H-4z', '#5D4037', 0)
      + E(120, 170, 120, 40, '#4FC3F7', 3) + Lc('M40 160c10-4 20 4 30 0M170 186c10-4 20 4 30 0', '#E1F5FE', 2.5)
      + g(120, 170, 1, R(-50, -9, 100, 18, '#A1673F', 9, 3) + E(50, 0, 6, 9, '#D7B98E', 2.5) + Lc('M-40 -6v12M-20 -8v16M0 -8v16M20 -8v16', '#8D6E63', 1.5) + face(0, 2, 0.25))
      + g(116, 160, 1, R(-9, -32, 18, 22, '#E53935', 3, 2.5) + Lc('M-9-24h18M-9-16h18M-3-32v22M3-32v22', INK, 1.5) + Lc('M-9-28l-20-10M9-28l20-10', '#E53935', 5) + R(-8, -12, 7, 12, '#1565C0', 1, 2) + R(1, -12, 7, 12, '#1565C0', 1, 2) + C(0, -42, 9, '#FFE0BD', 2) + face(0, -40, 0.24) + P('M-9-46h18v-6c-4-4-14-4-18 0z', '#795548', 2))
      + [[176, 150, 6], [186, 140, 5], [168, 140, 5]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2)).join('') + g(178, 158, 1, C(0, -8, 8, '#FFE0BD', 2) + Lc('M-8-10l-8-10M8-10l8-10', '#FFE0BD', 3) + face(0, -6, 0.22, 'o'))
      + R(-4, 216, 248, 12, '#A1673F', 0, 3) + [30, 70, 170, 210].map((x, k) => kid(x, 214, ['#FFCA28', '#7B1FA2', '#26A69A', '#FB8C00'][k], 0.75)).join('')),
  L('ca/vancouver/landmark-canadaplace.v1.svg', 'หลังคาใบเรือห้าใบแคนาดาเพลส', 'The five white sails of Canada Place', ['canada place', 'แคนาดาเพลส', 'white sails', 'หลังคาใบเรือ', 'cruise terminal', 'ท่าเรือสำราญ', 'coal harbour', 'โคลฮาร์เบอร์', 'waterfront walk', 'north shore mountains'], 'หาหลังคาสีขาวแหลมๆ ห้ายอดเหมือนใบเรือ', 'Find the five pointy white roofs shaped like sails',
    // a long pier building whose roof is five tall white fabric sails, flags along its deck, blue harbour water in front, green-blue mountains with snow behind, a child waving on the boardwalk
    sky('#BBDEFB') + P('M-4 120c30-40 60-50 90-30 30-40 70-46 100-20 20-14 40-12 58 0v40H-4z', '#78909C', 3) + P('M54 82l14 10-12-2zM176 74l12 10-12-2z', '#FFFFFF', 0)
      + P('M-4 150h248v94H-4z', '#1E88E5', 3) + Lc('M10 200c14-4 28 4 42 0M150 220c14-4 28 4 42 0', '#E3F2FD', 3)
      + R(30, 130, 180, 26, '#ECEFF1', 2, 3) + Array.from({ length: 10 }, (_, k) => R(36 + k * 17, 138, 10, 10, '#4FC3F7', 1, 1.5)).join('')
      + [[50, 70], [82, 54], [116, 46], [150, 54], [182, 68]].map(([x, top]) => P(`M${x - 18} 130c4-30 12-${130 - top - 20} 18-${130 - top}c6 ${130 - top - 20} 14 ${130 - top - 30} 18 ${130 - top}z`, '#FFFFFF', 3)).join('') + face(116, 108, 0.35)
      + [40, 80, 160, 200].map((x) => Lc(`M${x} 130v-16`, INK, 2) + P(`M${x} 114l10 3-10 3z`, '#E53935', 1.5)).join('')
      + R(-4, 176, 248, 10, '#A1673F', 0, 3) + kid(200, 174, '#FFCA28', 0.8)),
  // ---------- Banff
  L('ca/banff/landmark-peytolake.v1.svg', 'ทะเลสาบเพย์โตรูปหัวหมาป่า', 'Peyto Lake, shaped like a wolf\'s head', ['peyto lake', 'ทะเลสาบเพย์โต', 'wolf head lake', 'ทะเลสาบรูปหัวหมาป่า', 'bow summit', 'โบว์ซัมมิต', 'icefields parkway', 'ถนนไอซ์ฟิลด์ปาร์กเวย์', 'turquoise lake', 'viewpoint'], 'หาทะเลสาบสีฟ้าที่มีหูสองข้างเหมือนหัวหมาป่า', 'Find the turquoise lake with two ears like a wolf\'s head',
    // looking down from a high viewpoint: a milky turquoise lake shaped like a wolf's head with two pointed ears, deep green pine forest all round, grey peaks with snow, a wooden railing with a child in front
    sky('#B3E5FC') + P('M-4 90l40-60 30 40 34-56 40 50 30-36 74 62z', '#90A4AE', 3) + P('M106 18l10 14-10-4-8 6zM36 30l8 12-8-4-6 4z', '#FFFFFF', 0)
      + P('M-4 84h248v160H-4z', '#2E7D32', 3) + [[20, 120], [50, 104], [190, 110], [222, 126], [30, 170], [210, 168]].map(([x, y]) => pine(x, y, 34, '#1B5E20')).join('')
      + P('M80 150c-6-18 0-34 10-44l-6-28 22 18c8-4 20-4 28 0l22-18-6 28c10 10 16 26 10 44l-24 44c-8 14-24 14-32 0z', '#26C6DA', 3) + Lc('M100 168c10 6 30 6 40 0', '#80DEEA', 3) + face(120, 134, 0.4)
      + R(-4, 210, 248, 8, '#A1673F', 0, 3) + Lc('M20 210v34M80 210v34M160 210v34M220 210v34', '#8D6E63', 5) + kid(186, 210, '#E53935', 0.8)),
  L('ca/banff/landmark-hoodoos.v1.svg', 'เสาหินฮูดูริมแม่น้ำโบว์', 'The hoodoos above the Bow River', ['hoodoos', 'เสาหินฮูดู', 'bow river', 'แม่น้ำโบว์', 'rock pillars', 'เสาหินธรรมชาติ', 'hoodoos trail', 'ทางเดินฮูดู', 'tunnel mountain', 'mount rundle'], 'หาเสาหินสูงที่มีหินก้อนแบนวางอยู่บนหัวเหมือนหมวก', 'Find the tall rock pillar with a flat stone on its head like a hat',
    // tall pale sandy pillars with flat dark caprocks like hats standing on a slope, one smiling, the green Bow River winding below, pine trees and a long grey mountain with a sloping ridge behind
    sky('#BBDEFB') + P('M-4 110l110-90 140 90z', '#78909C', 3) + Lc('M60 60l40-30', '#B0BEC5', 3) + P('M-4 160c40-20 120-30 248-10v94H-4z', '#558B2F', 3) + band('M-4 210c50-20 100 10 140-6s70-20 108-4', '#26A69A', 12)
      + [[52, 160, 18, 70], [96, 150, 22, 90], [146, 160, 16, 60], [184, 166, 14, 50]].map(([x, base, w, h]) => P(`M${x - w / 2} ${base}c2-${h * 0.5} 6-${h * 0.6} ${w * 0.2}-${h}h${w * 0.6}c2 ${h * 0.4} 6 ${h * 0.5} ${w * 0.2} ${h}z`, '#E0C9A6', 3) + E(x, base - h - 4, w * 0.55, 6, '#795548', 3) + Lc(`M${x - w * 0.3} ${base - h * 0.4}h${w * 0.5}`, '#C8A165', 2)).join('')
      + face(96, 100, 0.3) + [12, 220, 236].map((x) => pine(x, 186, 44)).join('')),
  L('ca/banff/landmark-wildlifebridge.v1.svg', 'สะพานหญ้าข้ามทางหลวงให้สัตว์เดิน', 'The green wildlife bridge over the highway', ['wildlife overpass', 'สะพานข้ามสำหรับสัตว์ป่า', 'wildlife crossing', 'ทางข้ามสัตว์ป่า', 'trans-canada highway', 'ทางหลวงทรานส์แคนาดา', 'green bridge', 'สะพานหญ้า', 'red fox', 'จิ้งจอกแดง'], 'หาสุนัขจิ้งจอกที่กำลังเดินข้ามสะพานหญ้า', 'Find the fox trotting across the grassy bridge',
    // a wide arched bridge covered in grass and little pine trees over a two-lane highway, cars passing underneath, a red fox trotting across the top, mountains behind
    sky('#B3E5FC') + P('M-4 100l50-60 40 40 40-56 50 56 30-30 38 50z', '#90A4AE', 3) + P('M-4 96h248v148H-4z', '#7CB342', 0)
      + P('M90 244l20-110h20l20 110z', '#616161', 3) + Lc('M120 140v12M120 166v14M120 196v18M120 228v16', '#FFFFFF', 3) + R(126, 210, 18, 12, '#1E88E5', 3, 2) + R(98, 178, 14, 9, '#E53935', 3, 2)
      + P('M-4 150c40-30 200-30 248 0v20H-4z', '#689F38', 3) + P('M60 170c0-30 120-30 120 0z', '#424242', 3) + P('M-4 150c40-30 200-30 248 0', 'none', 3) + [[30, 140], [210, 140], [74, 128], [166, 128]].map(([x, y]) => pine(x, y, 28)).join('')
      + g(120, 128, 1, E(0, 0, 18, 8, '#F4511E', 2.5) + P('M16-2c10-4 20 0 24 8-10 2-18 0-24-4z', '#F4511E', 2.5) + P('M38 6l6 2-4 2z', '#FFFFFF', 0) + C(-18, -8, 8, '#F4511E', 2.5) + P('M-22-14l2-8 4 6zM-14-15l4-7 1 8z', '#F4511E', 2) + P('M-26-8l-6 3 6 2z', '#FFFFFF', 1.5) + Lc('M-10 6v8M10 6v8', INK, 3) + face(-18, -9, 0.17))),
  L('ca/banff/landmark-catwalk.v1.svg', 'ทางเดินเกาะผนังหุบเขาจอห์นสตัน', 'The catwalk on the walls of Johnston Canyon', ['johnston canyon', 'หุบเขาจอห์นสตัน', 'catwalk', 'ทางเดินเกาะหน้าผา', 'canyon walk', 'เดินชมหุบเขา', 'johnston creek', 'ลำธารจอห์นสตัน', 'bow valley parkway', 'easy hike'], 'หาทางเดินเหล็กที่ยึดติดกับผนังหินเหนือลำธาร', 'Find the metal walkway bolted to the rock wall above the stream',
    // a narrow grey limestone canyon, a metal walkway with railings bolted along one wall above a rushing turquoise creek with white ripples, ferns and pine trees on the rim, a child walking along it
    sky('#C8E6C9') + [20, 60, 180, 220].map((x) => pine(x, 50, 50)).join('') + P('M-4 40h100c-10 40 10 90-6 204H-4z', '#90A4AE', 3) + P('M244 40H150c14 50-6 100 10 204h84z', '#78909C', 3)
      + Lc('M20 80c10 10 30 6 40 20M200 90c-10 10-20 20-10 40M30 180c10-6 30 0 40-10', '#607D8B', 2.5) + band('M110 40c-10 60 16 120-6 204', '#26C6DA', 34) + Lc('M106 80c8 4 4 10 10 14M104 150c6 4 4 10 10 14M110 210c8 4 4 10 10 14', '#FFFFFF', 3)
      + P('M-4 140h110l-6 14H-4z', '#B0BEC5', 3) + Lc('M-4 124h108M10 124v16M40 124v16M70 124v16M98 124v16', '#546E7A', 3) + Lc('M10 154l12 12M60 154l12 12', '#546E7A', 3)
      + kid(56, 138, '#E53935', 0.8) + face(200, 160, 0.3)),
  L('ca/banff/landmark-pika.v1.svg', 'พิกาตัวกลมบนลานหินภูเขา', 'A pika on the mountain rock slope', ['pika', 'พิกา', 'rock rabbit', 'กระต่ายหิน', 'talus slope', 'ลานหินภูเขา', 'alpine meadow', 'ทุ่งหญ้าบนเขา', 'sentinel pass', 'larch valley'], 'หาเจ้าตัวกลมหูกลมที่คาบดอกไม้ไว้เต็มปาก', 'Find the little round animal with round ears and a mouthful of flowers',
    // a round grey-brown pika with big round ears sitting on a boulder in a slope of grey rocks, a bunch of pink and yellow flowers in its mouth, golden larch trees and a snowy peak behind
    sky('#B3E5FC') + P('M40 110l60-80 70 90z', '#B0BEC5', 3) + P('M86 50l14-20 14 22-14-6z', '#FFFFFF', 0) + [16, 200, 228].map((x) => pine(x, 120, 50, '#FBC02D')).join('')
      + P('M-4 120h248v124H-4z', '#9E9E9E', 0) + [[20, 140, 22], [64, 150, 18], [196, 146, 24], [230, 170, 16], [30, 200, 26], [210, 214, 28], [90, 226, 20]].map(([x, y, r]) => E(x, y, r, r * 0.7, '#BDBDBD', 3)).join('')
      + E(120, 200, 64, 26, '#B0BEC5', 3)
      + g(120, 150, 1, E(0, 10, 44, 32, '#A1887F', 3) + E(0, 26, 26, 12, '#D7CCC8', 0) + C(-26, -20, 10, '#8D6E63', 3) + C(26, -20, 10, '#8D6E63', 3) + C(-26, -20, 5, '#F8BBD0', 0) + C(26, -20, 5, '#F8BBD0', 0) + face(0, 4, 0.5, 'none') + C(0, 14, 2.5, INK, 0)
        + Lc('M-8 22l-12 18M0 22v22M8 22l12 18', '#43A047', 3) + C(-20, 40, 6, '#F06292', 2) + C(0, 46, 6, '#FFEB3B', 2) + C(20, 40, 6, '#BA68C8', 2))),
  // ---------- the Grand Canyon and Las Vegas
  L('us/southwest/landmark-horseshoebend.v1.svg', 'โค้งเกือกม้าของแม่น้ำโคโลราโด', 'Horseshoe Bend on the Colorado River', ['horseshoe bend', 'ฮอร์สชูเบนด์', 'colorado river', 'แม่น้ำโคโลราโด', 'river bend', 'โค้งแม่น้ำ', 'page arizona', 'เพจ แอริโซนา', 'cliff viewpoint', 'red rock'], 'หาแม่น้ำสีเขียวที่ไหลอ้อมหินก้อนใหญ่เป็นรูปเกือกม้า', 'Find the green river curling round a big rock in the shape of a horseshoe',
    // looking down into a deep red-orange gorge where a green river bends in a perfect horseshoe round a tall rock island, layered cliff walls, a safety rail with a child at the edge in front
    sky('#FFE0B2') + P('M-4 30h248v214H-4z', '#E07A3F', 3) + Lc('M-4 48h248', '#C1502E', 3) + Lc('M-4 90c20 4 20 20 30 30M244 90c-20 4-20 20-30 30', '#C1502E', 2.5)
      + P('M54 30c-30 70-44 140-4 170s138 20 140-40c0-50-24-90-10-130z', '#9C3D17', 3) + band('M66 30c-24 70-36 130-2 156s110 16 112-34c2-44-20-84-8-122', '#26A69A', 16)
      + P('M84 30c-18 60-26 110 0 130s82 10 84-28c2-36-16-70-8-102z', '#E8955A', 3) + Lc('M90 70h64M86 100h72M92 130h64', '#C1502E', 2.5) + face(126, 112, 0.4)
      + P('M-4 206c40-8 80-4 120 6s90 6 128-4v36H-4z', '#B94A1E', 3) + Lc('M-4 200c40-8 80-4 120 6', '#5D4037', 3) + kid(46, 214, '#1E88E5', 0.8)),
  L('us/southwest/landmark-muleride.v1.svg', 'ขี่ล่อลงหุบเขาแกรนด์แคนยอน', 'A mule ride down into the Grand Canyon', ['mule ride', 'ขี่ล่อ', 'bright angel trail', 'เส้นทางไบรต์แองเจิล', 'canyon trail', 'ทางเดินในหุบเขา', 'switchbacks', 'ทางซิกแซก', 'south rim', 'grand canyon'], 'หาล่อหูยาวที่มีเด็กใส่หมวกขี่อยู่บนหลัง', 'Find the long-eared mule with a child in a hat riding on its back',
    // layered red, orange and cream canyon walls with a zigzag trail cut down them and a line of tiny mules far below, a big friendly brown mule with long ears in front carrying a child in a cowboy hat
    sky('#FFE0B2') + [[40, '#E07A3F'], [70, '#F4A460'], [100, '#C1502E'], [130, '#E8B88A'], [160, '#D9773C']].map(([y, c]) => P(`M-4 ${y}c40-6 80 6 120 0s80-6 128 0v${200 - y}H-4z`, c, 2.5)).join('')
      + Lc('M40 70l140 20-130 24 120 22-100 20', '#FFF3E0', 3) + [[90, 78], [120, 84], [150, 88]].map(([x, y]) => E(x, y, 4, 2.5, '#5D4037', 0)).join('')
      + P('M-4 190c60-10 180-10 248 0v54H-4z', '#C8A165', 3)
      + g(118, 196, 1, E(0, 0, 44, 20, '#8D6E63', 3) + Lc('M-30 16v24M-14 18v22M18 18v22M32 16v24', '#6D4C41', 6) + Lc('M40-6c10-14 16-20 24-18', '#8D6E63', 12) + E(66, -20, 14, 10, '#8D6E63', 3) + P('M58-28l-4-22 8 18zM66-30l2-22 4 20z', '#8D6E63', 2.5) + E(76, -16, 6, 5, '#BCAAA4', 2) + face(64, -22, 0.2, 'none') + Lc('M-44-4c-10 6-12 16-8 24', '#6D4C41', 4)
        + R(-16, -26, 32, 10, '#E53935', 3, 2.5) + C(0, -48, 9, '#FFE0BD', 2) + face(0, -46, 0.24) + P('M-12-34h24l-2-10h-20z', '#1E88E5', 2) + E(0, -55, 16, 4, '#C8A165', 2) + P('M-8-56c0-10 16-10 16 0z', '#C8A165', 2))),
];

export default { places: {}, items };
