// Wave 2, China: the country (stamp, flag, hello, food, animals, ride, culture, two guides) and Beijing, Shanghai, Chengdu with Jiuzhaigou — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const CN = { k1: '#C62828', k2: '#C62828', k3: '#FFF8E1' };
const BJ = { k1: '#B71C1C', k2: '#F9A825', k3: '#FFEBEE' };
const SH = { k1: '#6A1B9A', k2: '#00838F', k3: '#F3E5F5' };
const CD = { k1: '#2E7D32', k2: '#C62828', k3: '#E8F5E9' };
const star = (x, y, r, fill, rot = 0) => g(x, y, 1, `<path d="M0 ${-r}` + Array.from({ length: 9 }, (_, i) => { const a = -Math.PI / 2 + ((i + 1) * Math.PI) / 5, rr = i % 2 ? r : r * 0.4; return `L${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`; }).join('') + `z" fill="${fill}" stroke="none"/>`, rot);
const G = (key, th, en, hth, hen, kw, svg) => ({ id: `cn.guide.${key}`, cat: 'guide', file: `cn/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });

const items = [
  // ---------- China
  { id: 'cn.stamp', cat: 'stamp', file: 'cn/stamp.v1.svg', name: nm('ตราประทับจีน', 'China stamp'), kw: ['china', 'จีน', 'zhongguo', '中国'],
    // a red Chinese knot with a golden bead and long tassels
    svg: countryStamp({ name: 'CHINA', ...CN, emblem: g(100, 82, 1, [0, 90].map((a) => g(0, 0, 1, R(-22, -22, 44, 44, 'none', 10, 6).replace('fill="none"', 'fill="none" stroke="#C62828"'), a + 45)).join('') + C(0, 0, 9, '#FFCA28', 3)) + Lc('M100 112v12', '#C62828', 5) + [92, 100, 108].map((x) => Lc(`M${x} 124v20`, '#C62828', 3)).join('') + R(94, 120, 12, 6, '#FFCA28', 2, 2) }) },
  { id: 'cn.flag', ch: '🇨🇳', cat: 'flag', file: 'cn/flag.v1.svg', name: nm('ธงจีน', 'Flag of China'), kw: ['china', 'จีน', 'flag', 'ธง'],
    // red, one large yellow star and four small ones in an arc
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#DE2910') + star(74, 70, 18, '#FFDE00') + [[104, 50, 20], [116, 64, 45], [116, 84, 0], [104, 98, 20]].map(([x, y, r]) => star(x, y, 6, '#FFDE00', r)).join('') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', 'none')) },
  { id: 'cn.hello', cat: 'hello', file: 'cn/hello.v1.svg', name: nm('หนีห่าว สวัสดี', 'Ni hao, hello'), kw: ['ni hao', 'nihao', 'หนีห่าว', 'hello', 'สวัสดี', 'mandarin', 'จีนกลาง', 'lantern', 'chinese new year', 'ตรุษจีน'],
    // a child in a red padded jacket with frog-button knots and two little hair buns, holding up a round red lantern on a stick
    svg: free(P('M78 214c0-40 18-58 42-58s42 18 42 58z', '#E53935') + Lc('M120 160v54', '#FFCA28', 3) + [172, 188, 204].map((y) => Lc(`M112 ${y}h16`, '#FFCA28', 3)).join('') + C(120, 116, 32, '#FFE0BD') + P('M88 110c0-24 14-36 32-36s32 12 32 36c-8-10-18-14-32-14s-24 4-32 14z', INK) + C(92, 78, 11, INK) + C(148, 78, 11, INK)
      + Lc('M156 160l24-60', '#8D6E63', 4) + Lc('M180 100v14', INK, 2) + E(180, 130, 20, 18, '#E53935', 3) + Lc('M168 130h24M180 112v36', '#FFCA28', 2) + face(120, 122, 0.55)) },
  { id: 'cn.food.pekingduck', cat: 'food', file: 'cn/food-pekingduck.v1.svg', name: nm('เป็ดปักกิ่ง', 'Peking duck'), kw: ['peking duck', 'เป็ดปักกิ่ง', 'roast duck', 'เป็ดย่าง', 'pancakes', 'แผ่นแป้ง', 'beijing', 'ปักกิ่ง'], colour: true,
    // a glossy mahogany roast duck on a platter, a stack of thin pancakes, sliced spring onion and a dish of dark sauce
    svg: free(E(110, 176, 96, 26, '#ECEFF1') + P('M40 160c0-40 30-60 70-60 30 0 56 14 64 40 8 2 16 6 20 14-20 14-60 16-90 16-40 0-64-2-64-10z', '#B5521F') + Lc('M70 128c20-10 50-10 70 0', '#E58A4E', 4) + P('M174 140c6-16 18-24 30-20-6 6-14 16-18 26z', '#B5521F', 4)
      + [0, 1, 2].map((k) => E(196, 196 - k * 6, 26, 8, '#FFF8E1')).join('') + E(40, 196, 16, 8, '#4E342E') + [[60, 200], [70, 206], [80, 200]].map(([x, y]) => Lc(`M${x} ${y}l10-4`, '#7CB342', 3)).join('') + face(100, 140, 0.55)) },
  { id: 'cn.food.hotpot', cat: 'food', file: 'cn/food-hotpot.v1.svg', name: nm('หม้อไฟหยินหยาง', 'Two-flavour hotpot'), kw: ['hotpot', 'hot pot', 'หม้อไฟ', 'สุกี้หม่าล่า', 'mala', 'หม่าล่า', 'chengdu', 'เฉิงตู', 'sichuan', 'เสฉวน', 'chongqing'], colour: true,
    // a round pot split by a curved wall: one half bubbling red chilli soup, the other clear broth, mushrooms and tofu bobbing, steam
    svg: free(E(120, 180, 96, 30, '#78909C') + Lc('M24 170h-14M216 170h14', INK, 8) + E(120, 160, 86, 34, '#B0BEC5') + E(120, 158, 76, 28, '#E53935') + P('M120 130c20 10-20 46 0 56 40-2 76-14 76-28s-40-28-76-28z', '#FFF3E0', 0)
      + E(120, 158, 76, 28, 'none') + Lc('M120 130c20 10-20 46 0 56', INK, 4) + [[80, 152], [96, 168], [160, 150], [176, 164]].map(([x, y], k) => (k < 2 ? C(x, y, 6, '#FFCA28', 2.5) : R(x - 7, y - 6, 14, 12, '#FFF8E1', 2, 2.5))).join('') + [[90, 140], [70, 160]].map(([x, y]) => P(`M${x} ${y}c-4-6 2-10 4-4z`, '#B71C1C', 2)).join('')
      + Lc('M90 116c-6-10 6-14 0-26M150 116c-6-10 6-14 0-26', '#BDBDBD', 3) + face(150, 160, 0.4)) },
  { id: 'cn.food.mooncake', cat: 'food', file: 'cn/food-mooncake.v1.svg', name: nm('ขนมไหว้พระจันทร์', 'Mooncake'), kw: ['mooncake', 'ขนมไหว้พระจันทร์', 'mid-autumn', 'เทศกาลไหว้พระจันทร์', 'lotus paste', 'bakery', 'ขนม'], colour: true,
    // a round golden mooncake with a scalloped edge and a pressed flower pattern, one slice cut showing a yellow salted yolk inside
    svg: free(E(120, 190, 90, 20, '#ECEFF1') + Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2; return C(110 + Math.cos(a) * 66, 140 + Math.sin(a) * 50, 12, '#D68A3C'); }).join('') + E(110, 140, 64, 48, '#E9A64C')
      + E(110, 140, 40, 30, 'none', 3) + [0, 60, 120, 180, 240, 300].map((a) => g(110, 140, 1, E(0, -16, 6, 10, 'none', 3), a)).join('') + P('M170 150l50-10-10 50-40-10z', '#E9A64C') + P('M176 152l30-6-6 30z', '#8D5524', 3) + C(188, 160, 8, '#FFCA28', 2.5) + face(110, 140, 0.4, 'none')) },
  { id: 'cn.animal.panda', cat: 'animal', file: 'cn/animal-panda.v1.svg', name: nm('แพนด้ายักษ์กินไผ่', 'Giant panda eating bamboo'), kw: ['giant panda', 'แพนด้ายักษ์', 'panda', 'แพนด้า', 'chengdu', 'เฉิงตู', 'panda base', 'ศูนย์แพนด้า', 'bamboo', 'ไผ่'], colour: true,
    // a whole round panda sitting back on its bottom, legs out, munching a long green bamboo stalk held in both paws
    svg: free(E(120, 160, 64, 56, '#FFFFFF') + E(76, 206, 22, 16, INK) + E(164, 206, 22, 16, INK) + P('M70 150c-14 0-20-20-6-30 16-4 30 10 30 20zM170 150c14 0 20-20 6-30-16-4-30 10-30 20z', INK)
      + C(120, 90, 44, '#FFFFFF') + C(86, 56, 14, INK) + C(154, 56, 14, INK) + E(102, 88, 12, 14, INK) + E(138, 88, 12, 14, INK) + C(104, 88, 4, '#FFFFFF', 0) + C(140, 88, 4, '#FFFFFF', 0) + E(120, 104, 7, 5, INK)
      + Lc('M150 70l-50 120', '#7CB342', 8) + [[140, 80], [116, 150]].map(([x, y]) => P(`M${x} ${y}c10-10 24-10 30-4-10 4-20 6-30 4z`, '#9CCC65', 2.5)).join('') + Lc('M112 116q8 6 16 0', INK, 3)) },
  { id: 'cn.animal.crane', cat: 'animal', file: 'cn/animal-crane.v1.svg', name: nm('นกกระเรียนมงกุฎแดง', 'Red-crowned crane'), kw: ['red-crowned crane', 'นกกระเรียนมงกุฎแดง', 'crane', 'นกกระเรียน', 'bird', 'นก', 'lucky bird', 'harbin'], colour: true,
    // an elegant white crane on one thin leg, black neck and tail feathers, a red cap on its head, wings half open in a little dance
    svg: free(Lc('M120 220v-60', INK, 4) + Lc('M120 190l14-20', INK, 4) + E(120, 140, 50, 30, '#FFFFFF') + P('M70 130c-30-30-50-20-60-6 20 0 40 6 60 20zM170 130c30-30 50-20 60-6-20 0-40 6-60 20z', '#FFFFFF') + P('M150 150c20 6 30 20 34 30-14-4-26-10-34-18z', INK)
      + Lc('M100 120c-10-30-6-60 6-80', INK, 10) + C(110, 40, 14, '#FFFFFF') + C(110, 32, 7, '#E53935', 0) + P('M122 40l30 6-30 4z', '#BCAAA4', 3) + face(108, 42, 0.35)) },
  { id: 'cn.transport.pedicab', cat: 'transport', file: 'cn/transport-pedicab.v1.svg', name: nm('สามล้อปั่นในหูท่ง', 'A hutong pedicab'), kw: ['pedicab', 'สามล้อ', 'rickshaw', 'hutong tour', 'ทัวร์หูท่ง', 'tricycle', 'beijing', 'ปักกิ่ง'], colour: true,
    // a red tricycle rickshaw with a curved black canopy and a padded seat for two, the rider's bike up front, a hutong grey wall behind
    svg: free(R(10, 40, 220, 110, '#B0BEC5') + Array.from({ length: 5 }, (_, k) => Lc(`M10 ${56 + k * 20}h220`, '#90A4AE', 2)).join('') + R(150, 60, 40, 60, '#C62828', 2) + R(156, 66, 28, 48, '#FFF8E1', 2, 3)
      + P('M30 170v-50c0-30 30-50 70-50v100z', INK) + R(30, 140, 80, 34, '#E53935', 6) + R(36, 130, 68, 14, '#FFCA28', 4) + Lc('M110 160h60l20-30', INK, 4) + Lc('M184 130h14', INK, 4) + Lc('M170 160v-30', INK, 4)
      + [[50, 190], [100, 190], [190, 190]].map(([x, y]) => C(x, y, 16, 'none', 5) + C(x, y, 4, INK, 0)).join('') + face(70, 152, 0.4)) },
  { id: 'cn.culture.opera', cat: 'culture', file: 'cn/culture-opera.v1.svg', name: nm('หน้ากากงิ้วเปลี่ยนหน้า', 'Face-changing opera mask'), kw: ['face changing', 'งิ้วเปลี่ยนหน้ากาก', 'bian lian', 'sichuan opera', 'งิ้วเสฉวน', 'opera', 'งิ้ว', 'mask', 'หน้ากาก'], colour: true,
    // a bold oval opera mask painted red, black and gold with swooping eyebrows and a curled pattern, a second blue mask peeking behind
    svg: free(g(160, 110, 0.8, E(0, 0, 50, 64, '#1E88E5') + Lc('M-30-20c10-10 20-10 30 0M0-20c10-10 20-10 30 0', '#FFFFFF', 6), 16) + E(100, 120, 60, 76, '#E53935')
      + P('M60 90c10-20 30-24 40-10 10-14 30-10 40 10-10-4-26-4-40 6-14-10-30-10-40-6z', INK) + P('M80 104c6-10 20-10 20 0-6 8-14 8-20 0zM100 104c6-10 20-10 20 0-6 8-14 8-20 0z', '#FFFFFF', 3) + C(90, 104, 4, INK, 0) + C(110, 104, 4, INK, 0)
      + P('M92 130c4 10 12 10 16 0z', INK, 3) + Lc('M70 150c20 30 40 30 60 0', '#FFCA28', 5) + Lc('M100 60c-10-14 10-20 0-34', '#FFCA28', 5) + Lc('M84 160q16 10 32 0', INK, 4)) },
  { id: 'cn.culture.calligraphy', cat: 'culture', file: 'cn/culture-calligraphy.v1.svg', name: nm('พู่กันกับหมึกจีน', 'Brush and ink'), kw: ['calligraphy', 'พู่กันจีน', 'brush', 'พู่กัน', 'ink', 'หมึกจีน', 'chinese writing', 'อักษรจีน', 'workshop'], colour: true,
    // a bamboo brush with a soft black tip resting on a red stand, a round ink stone, a paper with three big swirly strokes (no real characters)
    svg: free(R(20, 120, 140, 100, '#FFF8E1', 4) + Lc('M50 150c20-10 30 10 50 0M60 170c10 20 30 20 40 0M70 196h40', INK, 9) + E(190, 196, 30, 14, '#424242') + E(190, 192, 20, 8, INK)
      + R(150, 90, 70, 12, '#C62828', 4) + Lc('M160 90v-8M210 90v-8', '#C62828', 5) + g(150, 60, 1, R(-60, -5, 100, 10, '#D7A86E', 4) + P('M40-5c16 0 24 5 24 5s-8 5-24 5z', INK, 3), -10) + face(190, 194, 0.3, 'none')) },
  G('huahua', 'ฮวาฮวา', 'Huahua', 'หนีห่าว {name}! ฮวาฮวาพาเที่ยวจีนเอง', 'Ni hao, {name}! Huahua will show you China', ['red panda', 'แพนด้าแดง', 'panda', 'แพนด้า'],
    // a red panda: a russet face with white cheeks, eyebrow spots and ear rims, a dark nose, a little red-and-gold Chinese knot on one ear
    C(62, 74, 22, '#C1440E') + C(178, 74, 22, '#C1440E') + C(62, 74, 12, '#FFFFFF', 3) + C(178, 74, 12, '#FFFFFF', 3) + C(120, 132, 74, '#D35400') + P('M66 140c10-24 30-30 54-30s44 6 54 30c-10 30-30 50-54 50s-44-20-54-50z', '#FFFFFF')
    + P('M88 132c6-14 20-14 24 0-8 6-18 6-24 0zM128 132c4-14 18-14 24 0-6 6-16 6-24 0z', '#C1440E', 0) + [[100, 96], [140, 96]].map(([x, y]) => E(x, y, 9, 5, '#FFFFFF', 0)).join('') + E(120, 152, 10, 7, INK)
    + R(180, 50, 14, 14, '#C62828', 3, 2.5) + Lc('M187 64v14', '#FFCA28', 3) + face(120, 132, 1.3, 'w')),
  G('jinjin', 'จินจิน', 'Jinjin', 'จินจินกระโดดจากต้นไม้มาเจอ {name}', 'Jinjin jumped down from the trees to meet {name}', ['golden snub-nosed monkey', 'ลิงจมูกเชิดสีทอง', 'monkey', 'ลิง'],
    // a golden snub-nosed monkey: a fluffy golden-orange fur ring, a pale blue face with a tiny upturned nose, small ears
    Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return C(120 + Math.cos(a) * 66, 130 + Math.sin(a) * 64, 22, '#FFB300'); }).join('') + C(120, 130, 60, '#FFA000') + E(120, 140, 40, 46, '#B3E5FC') + C(70, 110, 10, '#FFE0B2', 3) + C(170, 110, 10, '#FFE0B2', 3)
    + C(120, 140, 5, '#90CAF9', 2.5) + C(114, 144, 2, INK, 0) + C(126, 144, 2, INK, 0) + face(120, 126, 1.2, 'none') + Lc('M110 164q10 8 20 0', INK, 3.5)),
  // ---------- Beijing
  { id: 'cn-beijing.stamp', cat: 'stamp', file: 'cn/beijing/stamp.v1.svg', name: nm('ตราประทับปักกิ่ง', 'Beijing stamp'), kw: ['beijing', 'ปักกิ่ง', 'peking', '北京'],
    // the round triple-roofed Hall of Prayer of the Temple of Heaven
    svg: cityStamp('cbj-st', { name: 'BEIJING', sub: 'CHINA', ...BJ, emblem: R(70, 124, 60, 12, '#FFFFFF', 0, 3) + [[100, 116, 30], [100, 100, 24], [100, 84, 18]].map(([x, y, w]) => P(`M${x - w} ${y}c10-10 ${w * 2 - 20}-10 ${w * 2} 0z`, '#1565C0', 3) + R(x - w + 6, y, w * 2 - 12, 10, '#C62828', 0, 2.5)).join('') + C(100, 70, 5, '#FFCA28', 2.5) }) },
  { id: 'cn-beijing.day.forbiddencity', cat: 'day', file: 'cn/beijing/day-forbiddencity.v1.svg', name: nm('พระราชวังต้องห้าม', 'The Forbidden City'), kw: ['forbidden city', 'พระราชวังต้องห้าม', 'palace museum', 'กู้กง', 'gugong', 'imperial palace', 'beijing', 'ปักกิ่ง'],
    // rows of golden-yellow glazed roofs over red walls stretching back, a white marble bridge in front, a blue sky
    svg: scene('cbj-d1', '#BBDEFB', [[20, 70, 70], [110, 60, 90], [210, 70, 70]].map(([x, y, w]) => R(x - w / 2 + 6, y + 10, w - 12, 30, '#C62828') + P(`M${x - w / 2 - 6} ${y + 12}c10-14 ${w - 8}-14 ${w + 12} 0l-10-16H${x - w / 2 + 4}z`, '#FBC02D', 3)).join('')
      + R(-4, 110, 248, 40, '#C62828') + P('M-4 112h248l-10-14H6z', '#FBC02D', 3) + [40, 80, 160, 200].map((x) => R(x - 8, 120, 16, 30, '#8D6E63', 2)).join('') + P('M100 150v-26c0-14 40-14 40 0v26z', '#5D4037')
      + P('M-4 150h248v100H-4z', '#E0E0E0') + Lc('M40 196c40-30 120-30 160 0', '#FFFFFF', 12) + Lc('M40 196c40-30 120-30 160 0', INK, 2) + [60, 90, 120, 150, 180].map((x) => Lc(`M${x} ${196 - Math.sin(((x - 40) / 160) * Math.PI) * 22}v-10`, '#FFFFFF', 4)).join('')) },
  { id: 'cn-beijing.landmark.greatwall', cat: 'landmark', file: 'cn/beijing/landmark-greatwall.v1.svg', name: nm('กำแพงเมืองจีน', 'The Great Wall'), kw: ['great wall', 'กำแพงเมืองจีน', 'mutianyu', 'มู่เถียนอวี้', 'badaling', 'ปาต้าหลิง', 'toboggan', 'cable car', 'wall'], colour: true, spot: nm('หากำแพงยาวที่คดเคี้ยวไปบนภูเขา', 'Find the long wall winding over the mountains'),
    // the wall snaking over green ridges with crenellated tops and two square watchtowers, autumn trees on the slopes
    svg: free(P('M-4 200c40-60 70-100 110-110s80 40 138 10v120H-4z', '#81C784') + Lc('M-4 190c40-60 70-90 110-100s70 40 100 20 30-50 38-60', '#D7CCC8', 18) + Lc('M-4 182c40-60 70-90 110-100s70 40 100 20 30-50 38-60', INK, 3).replace('stroke-width="3"', 'stroke-width="3" stroke-dasharray="6 6"')
      + [[100, 74], [220, 40]].map(([x, y]) => R(x - 16, y - 10, 32, 30, '#D7CCC8') + P(`M${x - 18} ${y - 10}v-8h8v4h6v-4h8v4h6v-4h8v8z`, '#D7CCC8') + R(x - 5, y + 4, 10, 16, INK, 3)).join('')
      + [[40, 210], [170, 196], [200, 214]].map(([x, y]) => C(x, y, 14, ['#FF8A65', '#FFCA28', '#E57373'][x % 3])).join('') + face(100, 82, 0.3)) },
  { id: 'cn-beijing.landmark.hutong', cat: 'landmark', file: 'cn/beijing/landmark-hutong.v1.svg', name: nm('ตรอกหูท่ง', 'A hutong lane'), kw: ['hutong', 'หูท่ง', 'courtyard', 'บ้านสี่ประสาน', 'siheyuan', 'old lane', 'ตรอกเก่า', 'nanluoguxiang', 'shichahai'], colour: true, spot: nm('หาประตูแดงมีห่วงทองในตรอกเก่า', 'Find the red door with golden knockers in the old lane'),
    // a narrow lane of grey brick walls, a red courtyard door with round golden knockers and two stone drums beside it, a red lantern, a bicycle
    svg: free(R(10, 60, 220, 160, '#90A4AE') + Array.from({ length: 7 }, (_, k) => Lc(`M10 ${80 + k * 20}h220`, '#78909C', 2)).join('') + P('M0 62h240l-10-16H10z', '#455A64', 3) + R(80, 100, 80, 120, '#C62828') + Lc('M120 100v120', '#7F0000', 3) + [[106, 150], [134, 150]].map(([x, y]) => C(x, y, 7, 'none', 3).replace('fill="none"', 'fill="none" stroke="#FFCA28"')).join('')
      + R(84, 86, 72, 14, '#1565C0', 2) + [[62, 200], [178, 200]].map(([x, y]) => E(x, y, 14, 20, '#BDBDBD')).join('') + Lc('M40 60v14', INK, 2) + E(40, 88, 12, 14, '#E53935', 3)
      + C(196, 196, 14, 'none', 4) + C(226, 196, 14, 'none', 4) + Lc('M196 196l10-20h16l4 20M206 176v-6', INK, 3) + face(120, 132, 0.35)) },
  { id: 'cn-beijing.landmark.birdsnest', cat: 'landmark', file: 'cn/beijing/landmark-birdsnest.v1.svg', name: nm('สนามรังนก', 'The Bird\'s Nest stadium'), kw: ['bird\'s nest', 'birds nest', 'สนามรังนก', 'olympic park', 'สวนโอลิมปิก', 'national stadium', 'water cube', 'stadium'], colour: true, spot: nm('หาสนามที่หน้าตาเหมือนรังนกใหญ่', 'Find the stadium that looks like a giant bird\'s nest'),
    // a wide oval stadium wrapped in a criss-cross lattice of grey steel like a woven nest, glowing red inside, a little bird perched on top
    svg: free(E(120, 150, 110, 56, '#C62828') + E(120, 150, 110, 56, '#B0BEC5') + Array.from({ length: 12 }, (_, k) => Lc(`M${14 + k * 18} ${120 + (k % 3) * 6}l${30 - (k % 2) * 60} 70`, '#78909C', 4)).join('') + E(120, 110, 80, 18, '#E53935') + E(120, 150, 110, 56, 'none')
      + C(120, 84, 10, '#8D6E63', 3) + P('M128 82l10 2-10 4z', '#FFCA28', 2) + face(120, 156, 0.4)) },
  // ---------- Shanghai
  { id: 'cn-shanghai.stamp', cat: 'stamp', file: 'cn/shanghai/stamp.v1.svg', name: nm('ตราประทับเซี่ยงไฮ้', 'Shanghai stamp'), kw: ['shanghai', 'เซี่ยงไฮ้', '上海'],
    // a white magnolia (the city's flower) in bloom
    svg: cityStamp('csh-st', { name: 'SHANGHAI', sub: 'CHINA', ...SH, emblem: [-40, -15, 15, 40].map((a) => g(100, 116, 1, P('M0 0c-14-20-12-44 0-56 12 12 14 36 0 56z', '#FFFFFF', 3), a)).join('') + P('M100 116c-4-20-2-36 0-44 2 8 4 24 0 44z', '#F8BBD0', 2) + Lc('M100 118v24', '#6D4C41', 4) }) },
  { id: 'cn-shanghai.day.bund', cat: 'day', file: 'cn/shanghai/day-bund.v1.svg', name: nm('เดอะบันด์ยามค่ำ', 'The Bund at night'), kw: ['the bund', 'เดอะบันด์', 'bund', 'waitan', 'huangpu', 'แม่น้ำหวงผู่', 'pudong', 'ผู่ตง', 'skyline', 'night view', 'shanghai', 'เซี่ยงไฮ้'],
    // across the river a skyline of a tall twisted tower, a bottle-opener tower and the pink-ball tower, lit up purple; a cruise boat with lights on the water
    svg: scene('csh-d1', '#311B92', [[30, 30], [200, 20], [90, 50]].map(([x, y]) => C(x, y, 2, '#FFFFFF', 0)).join('') + [[20, 110, 24], [50, 90, 22], [190, 100, 24], [220, 112, 22]].map(([x, top, w]) => R(x - w / 2, top, w, 150 - top, '#4527A0') + R(x - w / 2 + 4, top + 8, w - 8, 4, '#FFF59D', 1, 0)).join('')
      + P('M150 150l4-110c2-10 14-10 16 0l4 110z', '#7E57C2') + Lc('M156 50l14 90', '#B39DDB', 3) + P('M114 150V62h20v88z', '#5E35B1') + R(118, 70, 12, 10, '#311B92', 2, 2) + Lc('M90 150V50', '#F48FB1', 4) + C(90, 112, 12, '#EC407A', 3) + C(90, 76, 8, '#EC407A', 3) + Lc('M90 50V30', INK, 2)
      + P('M-4 150h248v100H-4z', '#1A237E') + [40, 90, 130, 160, 200].map((x, k) => Lc(`M${x} 160v${16 + (k % 2) * 14}`, ['#F48FB1', '#FFF59D', '#B39DDB'][k % 3], 3)).join('') + P('M60 210h80l-10 12H70z', '#FFFFFF', 3) + R(70, 198, 60, 12, '#FFCA28', 3, 2.5) + [80, 96, 112].map((x) => C(x, 204, 3, '#FFFFFF', 0)).join('')) },
  { id: 'cn-shanghai.landmark.pearl', cat: 'landmark', file: 'cn/shanghai/landmark-pearl.v1.svg', name: nm('หอไข่มุกตะวันออก', 'The Oriental Pearl Tower'), kw: ['oriental pearl', 'หอไข่มุก', 'pearl tower', 'tv tower', 'pudong', 'ผู่ตง', 'observation deck', 'glass floor', 'พื้นกระจก'], colour: true, spot: nm('หาหอคอยที่มีลูกบอลชมพูร้อยอยู่', 'Find the tower threaded with pink balls'),
    // three slim legs holding a big pink sphere, a column up to a smaller pink sphere and a tiny one, a long needle on top
    svg: free(Lc('M90 220l24-70M150 220l-24-70M120 220v-70', '#B0BEC5', 8) + Lc('M90 220l24-70M150 220l-24-70', INK, 2) + C(120, 140, 30, '#EC407A') + Lc('M100 128c10-6 20-6 30-2', '#F8BBD0', 4) + R(114, 60, 12, 54, '#B0BEC5') + C(120, 56, 18, '#EC407A') + R(116, 28, 8, 12, '#B0BEC5', 0, 3) + C(120, 26, 7, '#EC407A', 3) + Lc('M120 20V2', INK, 3)
      + P('M10 220c60-8 160-8 220 0v8H10z', '#4FC3F7') + face(120, 142, 0.45)) },
  { id: 'cn-shanghai.landmark.yuyuan', cat: 'landmark', file: 'cn/shanghai/landmark-yuyuan.v1.svg', name: nm('สวนอวี้หยวนกับสะพานซิกแซก', 'Yu Garden and the zigzag bridge'), kw: ['yu garden', 'yuyuan', 'สวนอวี้หยวน', 'zigzag bridge', 'สะพานซิกแซก', 'huxinting', 'tea house', 'โรงน้ำชา', 'old town', 'city god temple'], colour: true, spot: nm('หาสะพานที่เดินเลี้ยวซ้ายขวาไปหาโรงน้ำชา', 'Find the bridge that zigzags to the teahouse'),
    // a two-storey teahouse with flying upturned roof corners standing in a lotus pond, a stone bridge zigzagging to it, koi and lily pads
    svg: free(E(120, 180, 116, 40, '#4DB6AC') + R(90, 96, 60, 40, '#C62828') + P('M76 100c10-6 30-4 44-14 14 10 34 8 44 14l-8-12H84z', '#424242', 3) + R(96, 70, 48, 22, '#C62828') + P('M84 74c10-6 24-4 36-14 12 10 26 8 36 14l-8-12H92z', '#424242', 3)
      + Lc('M80 74l-8-8M160 74l8-8M70 100l-8-8M170 100l8-8', INK, 3) + [104, 120, 136].map((x) => R(x - 5, 104, 10, 14, '#FFE082', 1, 2)).join('')
      + Lc('M10 200h40l14-24h40l14 18h40l14-20h50', '#E0E0E0', 10) + Lc('M10 200h40l14-24h40l14 18h40l14-20h50', INK, 2) + [[40, 170], [190, 196]].map(([x, y]) => E(x, y, 14, 6, '#81C784', 2.5)).join('') + P('M60 214c6-6 14-6 18 0-4 6-12 6-18 0z', '#FF7043', 2.5) + face(120, 120, 0.35)) },
  { id: 'cn-shanghai.landmark.huangpu', cat: 'landmark', file: 'cn/shanghai/landmark-huangpu.v1.svg', name: nm('เรือข้ามแม่น้ำหวงผู่', 'The Huangpu river ferry'), kw: ['huangpu ferry', 'เรือข้ามฟากหวงผู่', 'river cruise', 'ล่องแม่น้ำหวงผู่', 'ferry', 'เรือข้ามฟาก', 'shanghai', 'เซี่ยงไฮ้'], colour: true, spot: nm('หาเรือข้ามฟากที่มีห้องคนขับอยู่ข้างบน', 'Find the ferry with its little wheelhouse on top'),
    // a stubby blue-and-white river ferry, its wheelhouse perched high, crowds of tiny passengers at the rail, a stone bank with old domed buildings behind
    svg: free([[30, 70, 50], [100, 60, 60], [180, 74, 50]].map(([x, top, w]) => R(x - w / 2, top, w, 70, '#D7CCC8') + P(`M${x - 14} ${top}c0-20 28-20 28 0z`, '#4DB6AC', 3) + [x - 12, x + 4].map((wx) => R(wx, top + 16, 8, 14, '#5D4037', 1, 2)).join('')).join('') + R(-4, 140, 248, 12, '#9E9E9E')
      + P('M-4 160h248v70H-4z', '#8D6E63') + P('M30 180h180l-14 26H44z', '#1565C0') + R(40, 160, 160, 20, '#FFFFFF') + [60, 80, 100, 120, 140, 160, 180].map((x, k) => C(x, 156, 5, ['#FFE0BD', '#D7A86E'][k % 2], 2)).join('') + R(100, 132, 40, 20, '#FFFFFF') + R(108, 138, 24, 8, '#4FC3F7', 2, 2) + face(120, 192, 0.35)) },
  // ---------- Chengdu and Jiuzhaigou
  { id: 'cn-chengdu.stamp', cat: 'stamp', file: 'cn/chengdu/stamp.v1.svg', name: nm('ตราประทับเฉิงตู', 'Chengdu stamp'), kw: ['chengdu', 'เฉิงตู', 'sichuan', 'เสฉวน', '成都'],
    // a long-spouted copper teapot pouring an arc of tea into a lidded cup
    svg: cityStamp('ccd-st', { name: 'CHENGDU', sub: 'SICHUAN', ...CD, emblem: E(80, 92, 18, 16, '#D68A3C', 3) + R(74, 72, 12, 6, '#D68A3C', 2, 2.5) + Lc('M96 90l50-30', '#D68A3C', 4) + Lc('M146 60c4 20 0 40-10 56', '#8D6E63', 3) + P('M124 124h28l-4 14h-20z', '#FFFFFF', 3) + E(138, 124, 16, 4, '#26A69A', 2.5) }) },
  { id: 'cn-chengdu.day.pandas', cat: 'day', file: 'cn/chengdu/day-pandas.v1.svg', name: nm('ศูนย์วิจัยแพนด้ายักษ์', 'The giant panda base'), kw: ['panda base', 'ศูนย์แพนด้า', 'giant panda', 'แพนด้ายักษ์', 'panda', 'แพนด้า', 'chengdu', 'เฉิงตู', 'research base', 'baby pandas', 'แพนด้าเด็ก'],
    // a wooden climbing frame among tall bamboo, one panda flopped over a branch asleep and a cub tumbling on the grass below
    svg: scene('ccd-d1', '#E8F5E9', [20, 40, 200, 222].map((x) => Lc(`M${x} 250V0`, '#7CB342', 7) + [60, 120].map((y) => P(`M${x} ${y}c10-10 24-10 30-4-10 4-20 6-30 4z`, '#9CCC65', 2.5)).join('')).join('')
      + Lc('M60 250V90M180 250V100M50 110h140', '#8D6E63', 8) + g(120, 100, 1, E(0, 0, 36, 18, '#FFFFFF') + E(-30, 14, 9, 14, INK) + E(28, 14, 9, 14, INK) + C(-36, -8, 16, '#FFFFFF') + C(-46, -20, 6, INK) + E(-40, -8, 4, 5, INK) + face(-36, -6, 0.3, 'none')) + P('M-4 200c60-10 180-10 248 0v60H-4z', '#9CCC65')
      + g(120, 196, 1, C(0, 0, 18, '#FFFFFF') + C(-12, -14, 6, INK) + C(12, -14, 6, INK) + E(-6, -2, 5, 6, INK) + E(6, -2, 5, 6, INK) + E(-14, 14, 7, 6, INK) + E(14, 14, 7, 6, INK))) },
  { id: 'cn-chengdu.landmark.jiuzhaigou', cat: 'landmark', file: 'cn/chengdu/landmark-jiuzhaigou.v1.svg', name: nm('ทะเลสาบสีฟ้าจิ่วไจ้โกว', 'Jiuzhaigou\'s blue lakes'), kw: ['jiuzhaigou', 'จิ่วไจ้โกว', 'five flower lake', 'ทะเลสาบห้าดอกไม้', 'huanglong', 'หวงหลง', 'turquoise lake', 'ทะเลสาบสีฟ้า', 'nuorilang'], colour: true, spot: nm('หาทะเลสาบใสจนเห็นต้นไม้ใต้น้ำ', 'Find the lake so clear you can see the trees under the water'),
    // a lake of bands of turquoise, teal and aqua so clear the fallen tree trunks show beneath, autumn trees round its edge, a wooden boardwalk
    svg: free(P('M10 120c40-30 180-30 220 0v80c-40 20-180 20-220 0z', '#26C6DA') + P('M30 140c40-16 140-16 180 0v40c-40 14-140 14-180 0z', '#4DD0E1', 0) + P('M60 156c30-8 90-8 120 0v20c-30 8-90 8-120 0z', '#80DEEA', 0) + Lc('M60 160l40 14M120 156l30 18M80 182l60-4', '#8D6E63', 4)
      + [[20, 110, '#FF8A65'], [50, 96, '#FFCA28'], [190, 96, '#E57373'], [220, 110, '#FFCA28'], [120, 90, '#81C784']].map(([x, y, c]) => C(x, y, 16, c) + Lc(`M${x} ${y + 16}v10`, '#6D4C41', 4)).join('') + Lc('M10 214h220', '#A1673F', 8) + [30, 70, 110, 150, 190].map((x) => Lc(`M${x} 214v12`, '#6D4C41', 4)).join('') + face(120, 170, 0.35)) },
  { id: 'cn-chengdu.landmark.kuanzhai', cat: 'landmark', file: 'cn/chengdu/landmark-kuanzhai.v1.svg', name: nm('ตรอกควานไจ่', 'Kuanzhai Alley'), kw: ['kuanzhai alley', 'ตรอกควานไจ่', 'kuan zhai xiang zi', 'jinli', 'จิ่นหลี่', 'ancient street', 'ถนนโบราณ', 'teahouse', 'snacks'], colour: true, spot: nm('หาบ้านไม้สีเข้มที่มีโคมแดงห้อยเรียงกัน', 'Find the dark wooden houses with a row of red lanterns'),
    // dark timber-framed old houses with grey tiled roofs, a string of red lanterns across the lane, a tea stall with a tall kettle
    svg: free([[50, 70, 80], [160, 60, 90]].map(([x, top, w]) => R(x - w / 2, top, w, 210 - top, '#795548') + P(`M${x - w / 2 - 10} ${top + 4}c10-10 ${w}-10 ${w + 20} 0l-8-16H${x - w / 2 - 2}z`, '#616161', 3) + Lc(`M${x - w / 2 + 6} ${top + 30}h${w - 12}M${x - w / 2 + 6} ${top + 60}h${w - 12}`, '#4E342E', 3) + R(x - 14, top + 80, 28, 210 - top - 80, '#3E2723', 2)).join('')
      + Lc('M10 54c60 30 160 30 220 0', INK, 2) + [40, 80, 120, 160, 200].map((x) => E(x, 70 + Math.sin(((x - 10) / 220) * Math.PI) * 14, 9, 11, '#E53935', 2.5)).join('') + R(90, 170, 60, 30, '#A1673F', 3) + E(120, 156, 12, 10, '#D68A3C', 3) + Lc('M130 152l24-14', '#D68A3C', 3) + P('M10 210h220v12H10z', '#9E9E9E') + face(120, 186, 0.3)) },
];
export default {
  places: {
    cn: { country: 'cn', wave: 2, name: nm('จีน', 'China'), tz: 'Asia/Shanghai', alias: ['china', 'จีน', '中国', 'mainland china', 'จีนแผ่นดินใหญ่'], colors: CN },
    'cn-beijing': { country: 'cn', wave: 2, name: nm('ปักกิ่ง', 'Beijing'), tz: 'Asia/Shanghai', ll: [39.9, 116.4], alias: ['beijing', 'ปักกิ่ง', 'peking', '北京', 'great wall', 'กำแพงเมืองจีน', 'forbidden city', 'พระราชวังต้องห้าม', 'mutianyu', 'badaling', 'hutong', 'หูท่ง', 'pek', 'pkx'], colors: BJ },
    'cn-shanghai': { country: 'cn', wave: 2, name: nm('เซี่ยงไฮ้', 'Shanghai'), tz: 'Asia/Shanghai', ll: [31.23, 121.47], alias: ['shanghai', 'เซี่ยงไฮ้', '上海', 'the bund', 'เดอะบันด์', 'pudong', 'ผู่ตง', 'yu garden', 'อวี้หยวน', 'zhujiajiao', 'pvg', 'sha'], colors: SH },
    'cn-chengdu': { country: 'cn', wave: 2, name: nm('เฉิงตูและจิ่วไจ้โกว', 'Chengdu and Jiuzhaigou'), tz: 'Asia/Shanghai', ll: [30.57, 104.07], alias: ['chengdu', 'เฉิงตู', '成都', 'sichuan', 'เสฉวน', 'jiuzhaigou', 'จิ่วไจ้โกว', 'huanglong', 'หวงหลง', 'panda base', 'kuanzhai', 'ctu', 'tfu'], colors: CD },
  },
  items,
};
