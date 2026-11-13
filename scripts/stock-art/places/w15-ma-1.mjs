// Wave 15, Morocco — the country layer: stamp, flag, hello, two guides (a fennec fox and a northern bald ibis), foods, animals,
// culture and transport. No religious figures or sacred objects, no ridden or captive animals, buildings only as buildings.
import { P, R, C, E, Lc, g, face, free, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const G = (cc, key, th, en, hth, hen, kw, svg) => ({ id: `${cc}.guide.${key}`, cat: 'guide', file: `${cc}/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });
const flagShape = 'M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z';
const pole = Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A');
export const MA = { k1: '#C1272D', k2: '#006233', k3: '#FFF3E0' };
// a five-pointed star outline (the flag's seal), points in drawing order 0-2-4-1-3
const star5 = (cx, cy, r) => 'M' + [0, 2, 4, 1, 3].map((k) => { const a = (-90 + k * 72) * Math.PI / 180; return `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`; }).join('L') + 'z';
// an eight-pointed star: two squares, one turned 45°
const star8 = (cx, cy, r) => [0, 45].map((t) => g(cx, cy, 1, R(-r, -r, 2 * r, 2 * r, 'X', 0), t)).join('');

const items = [
  { id: 'ma.stamp', cat: 'stamp', file: 'ma/stamp.v1.svg', name: nm('ตราประทับโมร็อกโก', 'Morocco stamp'), kw: ['morocco', 'โมร็อกโก', 'maroc', 'มาร็อก'],
    // a keyhole (horseshoe) arched doorway with a studded blue wooden door, a green tiled frame and a little eight-point star above
    svg: countryStamp({ name: 'MOROCCO', ...MA, emblem: R(62, 50, 76, 92, '#E0B060', 6, 3) + P('M76 142V92c0-30 48-30 48 0v50z', '#1E6BB8', 3) + P('M70 92c0-38 60-38 60 0', 'none', 3) + Lc('M100 70v72', INK, 2) + [[88, 104], [112, 104], [88, 124], [112, 124]].map(([x, y]) => C(x, y, 2.5, '#FFD54A', 1.5)).join('') + C(94, 116, 3, '#FFD54A', 1.5)
      + g(100, 60, 1, star8(0, 0, 5).replace(/fill="X"/g, 'fill="#006233"')) }) },
  { id: 'ma.flag', ch: '🇲🇦', cat: 'flag', file: 'ma/flag.v1.svg', name: nm('ธงโมร็อกโก', 'Flag of Morocco'), kw: ['morocco', 'โมร็อกโก', 'flag', 'ธง'],
    // a red field with a green interlaced five-pointed star outline in the middle
    svg: free(pole + P(flagShape, '#C1272D') + Lc(star5(127, 96, 34), '#006233', 6) + P(flagShape, 'none')) },
  { id: 'ma.hello', cat: 'hello', file: 'ma/hello.v1.svg', name: nm('ซาลาม สวัสดี', 'Salam, hello'), kw: ['salam', 'ซาลาม', 'hello', 'สวัสดี', 'azul', 'อาซุล', 'darija', 'ภาษาอาหรับโมร็อกโก', 'amazigh'],
    // a child in a striped hooded djellaba robe with yellow pointed slippers, waving one hand, the pointed hood hanging behind
    svg: free(P('M120 86l-34 10-10-40z', '#8D6E63') + P('M84 214l8-96c4-10 52-10 56 0l8 96z', '#8D6E63') + Array.from({ length: 5 }, (_, k) => Lc(`M${98 + k * 11} 124v88`, '#D7CCC8', 2.5)).join('') + Lc('M120 118v34', '#FFD54A', 3)
      + P('M92 124l-28-34', 'none') + Lc('M94 126l-26-38', '#8D6E63', 14) + C(64, 82, 9, '#C8915F') + Lc('M146 128l18 34', '#8D6E63', 14) + C(166, 166, 8, '#C8915F')
      + C(120, 92, 28, '#C8915F') + P('M92 88c0-22 14-32 28-32s28 10 28 32c-6-8-16-12-28-12s-22 4-28 12z', INK) + face(120, 96, 0.55)
      + [[100, 216], [140, 216]].map(([x, y]) => P(`M${x - 14} ${y}c0-8 20-10 30 0z`, '#FFCA28', 2.5)).join('')) },
  G('ma', 'fenno', 'เฟนโน่', 'Fenno', 'ซาลาม {name}! เฟนโน่พาเที่ยวโมร็อกโกเอง', 'Salam, {name}! Fenno will show you Morocco', ['fennec fox', 'จิ้งจอกเฟนเนก', 'fennec', 'desert fox', 'จิ้งจอกทะเลทราย', 'big ears', 'หูใหญ่'],
    // a fennec fox cub: a small cream face under two enormous pointed ears with pink insides, a black button nose
    P('M78 120L40 22l66 70z', '#F2C88A') + P('M162 120l38-98-66 70z', '#F2C88A') + P('M78 106L54 46l40 46z', '#FFB3C1', 3) + P('M162 106l24-60-40 46z', '#FFB3C1', 3)
      + E(120, 146, 64, 56, '#F2C88A') + P('M80 166c10 24 70 24 80 0-10 14-70 14-80 0z', '#FFF8E1', 3) + E(120, 160, 8, 6, INK) + face(120, 140, 1.15, 'none') + Lc('M110 172q10 6 20 0', INK, 3)),
  G('ma', 'bibo', 'บีโบ', 'Bibo', 'บีโบนกไอบิสหัวล้านโบกปีกทักทาย {name}', 'Bibo the bald ibis flaps hello to {name}', ['northern bald ibis', 'นกไอบิสหัวล้าน', 'bald ibis', 'ibis', 'souss-massa', 'ซูส-มาสซา', 'bird', 'นก'],
    // a northern bald ibis chick: a glossy purple-black body, a bald red face, a long curved red beak, a shaggy crest of feathers at the back
    Lc('M110 210v18M140 210v18', '#E25C5C', 5) + E(126, 176, 54, 40, '#3E2F5B') + P('M86 170c-14 16-10 38 10 46M168 168c18 14 18 38-2 48', '#4A3A6E') + Lc('M100 168c12 10 40 10 52 0', '#7E6BC4', 3)
      + [[-60, 30], [-25, 40], [10, 44], [45, 40], [80, 32]].map(([a, r]) => g(136, 96, 1, E(0, -r, 12, 22, '#3E2F5B'), a)).join('') + C(130, 98, 36, '#E25C5C')
      + Lc('M100 110c-26 8-46 30-52 62', '#C62828', 12) + Lc('M100 110c-26 8-46 30-52 62', '#EF6F6F', 5) + face(132, 96, 0.8, 'none')),
  { id: 'ma.food.tagine', cat: 'food', file: 'ma/food-tagine.v1.svg', name: nm('ทาจีนหม้อดินฝาทรงกรวย', 'A tagine pot'), kw: ['tagine', 'ทาจีน', 'tajine', 'stew', 'สตู', 'clay pot', 'หม้อดิน', 'chicken with olives', 'moroccan dinner', 'อาหารโมร็อกโก'], colour: true,
    // a painted clay tagine: a tall cone-shaped lid with a knob on top, zigzag patterns, sitting on a wide shallow dish, steam curling out
    svg: free(E(120, 190, 96, 22, '#C1693F') + E(120, 184, 84, 14, '#E08A5A') + P('M44 182c20-6 132-6 152 0L132 62h-24z', '#D9774A') + C(120, 56, 12, '#E08A5A')
      + Lc('M64 160h112M80 130h80M96 100h48', '#FFE0B2', 4) + Array.from({ length: 6 }, (_, k) => P(`M${72 + k * 17} 152l8-14 8 14`, 'none', 2.5)).join('') + face(120, 118, 0.55)
      + Lc('M70 150c-14-14 6-26-6-42M172 150c14-14-6-26 6-42', '#B0BEC5', 3)) },
  { id: 'ma.food.couscous', cat: 'food', file: 'ma/food-couscous.v1.svg', name: nm('คูสคูสกองโตกับผัก', 'A mountain of couscous'), kw: ['couscous', 'คูสคูส', 'friday couscous', 'semolina', 'เซโมลินา', 'seven vegetables', 'ผักเจ็ดอย่าง', 'chickpeas', 'ถั่วลูกไก่'], colour: true,
    // a wide painted dish heaped with a golden dome of couscous, carrots, courgettes and pumpkin standing up on top, chickpeas round the sides
    svg: free(E(120, 186, 100, 24, '#1E6BB8') + E(120, 180, 90, 16, '#E3F2FD') + P('M38 180c6-60 50-96 82-96s76 36 82 96z', '#F6D27A') + Array.from({ length: 18 }, (_, k) => C(56 + (k % 9) * 16, 150 + Math.floor(k / 9) * 18 - (k % 2) * 4, 1.8, '#E0B060', 0)).join('')
      + [[100, 70, -20, '#FB8C00'], [124, 64, 6, '#FB8C00'], [146, 74, 24, '#7CB342']].map(([x, y, r, f]) => g(x, y, 1, P('M-7 0l7 40 7-40z', f), r)).join('') + P('M100 104c0-14 40-14 40 0z', '#FFB74D')
      + [[60, 176], [78, 180], [160, 178], [178, 174]].map(([x, y]) => C(x, y, 6, '#F0C27B', 2)).join('') + face(120, 132, 0.6)) },
  { id: 'ma.food.minttea', cat: 'food', file: 'ma/food-minttea.v1.svg', name: nm('ชามินต์รินจากกาเงิน', 'Mint tea poured high'), kw: ['mint tea', 'ชามินต์', 'atay', 'อาเตย์', 'silver teapot', 'กาน้ำชาเงิน', 'tea glass', 'แก้วชา', 'moroccan whisky', 'pour from high'], colour: true,
    // a round silver teapot with a domed lid and a long curved spout pouring a tall amber stream into a little gold-patterned glass with mint leaves
    svg: free(R(40, 196, 168, 12, '#B0BEC5', 6) + P('M70 100c-26 0-34 70 0 76h54c34-6 26-76 0-76z', '#CFD8DC') + P('M76 100c4-20 38-20 42 0z', '#B0BEC5') + P('M90 80c0-14 14-14 14 0z', '#ECEFF1') + C(97, 74, 5, '#B0BEC5', 2.5)
      + Lc('M136 130c22-4 30-30 36-44', '#B0BEC5', 9) + Lc('M54 118c-20 0-20 40 0 40', '#B0BEC5', 6) + Lc('M174 86c4 30 4 70 4 96', '#E0A030', 4) + face(96, 140, 0.55)
      + P('M164 160h28l-4 36h-20z', '#FFE082') + P('M166 172h24l-2 24h-20z', '#E0A030', 0) + Lc('M168 166h24', '#FFB300', 3) + [[172, 152, -30], [184, 150, 20]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 8, 4, '#43A047', 2), r)).join('') + P('M164 160h28l-4 36h-20z', 'none')) },
  { id: 'ma.food.msemen', cat: 'food', file: 'ma/food-msemen.v1.svg', name: nm('เมสเมนแป้งพับสี่เหลี่ยมราดน้ำผึ้ง', 'Msemen square pancakes'), kw: ['msemen', 'เมสเมน', 'square pancake', 'แพนเค้กสี่เหลี่ยม', 'rghaif', 'moroccan breakfast', 'อาหารเช้าโมร็อกโก', 'honey', 'น้ำผึ้ง'], colour: true,
    // a stack of square flaky flatbreads with folded layered edges and brown griddle spots, honey dripping down from a little clay pot
    svg: free(E(116, 192, 92, 16, '#ECEFF1') + [[124, 172, 4], [116, 148, -6], [120, 122, 3]].map(([x, y, r]) => g(x, y, 1, R(-56, -18, 112, 36, '#F2C26B', 6) + Lc('M-48 -6h96M-48 6h96', '#E0A04A', 2) + [[-30, -8], [10, 4], [34, -4]].map(([a, b]) => C(a, b, 4, '#C8862F', 0)).join(''), r)).join('')
      + P('M150 104c10 0 14 10 6 18', '#FFB300', 0) + Lc('M150 96c6 10 4 20-2 30', '#FFB300', 6) + P('M156 60h40l-4 36h-32z', '#C1693F') + E(176, 60, 22, 6, '#E08A5A') + Lc('M176 54l-24 44', '#8D6E63', 4) + face(120, 122, 0.5)) },
  { id: 'ma.food.harira', cat: 'food', file: 'ma/food-harira.v1.svg', name: nm('ซุปฮารีราเสิร์ฟคู่อินทผลัม', 'Harira soup with dates'), kw: ['harira', 'ฮารีรา', 'tomato lentil soup', 'ซุปถั่วเลนทิล', 'chickpea soup', 'ซุปมะเขือเทศ', 'dates', 'อินทผลัม', 'lemon', 'เลมอน'], colour: true,
    // a deep patterned bowl of orange-red soup with chickpeas, lentils and green herbs floating, a wooden spoon, a lemon wedge and three dates beside
    svg: free(P('M40 116c0 54 36 80 80 80s80-26 80-80z', '#1E6BB8') + Lc('M48 140h144', '#FFFFFF', 4) + Array.from({ length: 6 }, (_, k) => C(64 + k * 22, 160 + (k % 2) * 4, 4, '#FFD54A', 2)).join('') + E(120, 116, 80, 18, '#E25C2B')
      + [[90, 112], [112, 120], [138, 110], [156, 118], [100, 122]].map(([x, y]) => C(x, y, 5, '#F6D27A', 2)).join('') + [[124, 108, 20], [78, 118, -30], [150, 108, 40]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 6, 3, '#43A047', 0), r)).join('')
      + Lc('M164 112l40-60', '#A1673F', 8) + P('M24 206c0-20 30-20 34 0z', '#FFEB3B') + [[176, 210], [196, 202], [214, 212]].map(([x, y]) => E(x, y, 10, 6, '#6D3B1E', 2.5)).join('') + face(120, 152, 0.45)) },
  { id: 'ma.food.argan', cat: 'food', file: 'ma/food-argan.v1.svg', name: nm('ผลอาร์แกนกับอัมลูทาขนมปัง', 'Argan nuts and amlou dip'), kw: ['argan', 'อาร์แกน', 'argan nuts', 'ถั่วอาร์แกน', 'argan oil', 'น้ำมันอาร์แกน', 'amlou', 'อัมลู', 'almond honey dip', 'souss'], colour: true,
    // a thorny argan sprig with plump yellow-green fruits, a heap of brown argan nuts, a little golden bottle of oil and a bowl of brown amlou dip with bread
    svg: free(Lc('M20 60c40 0 80 10 110 34', '#6D4C41', 5) + Array.from({ length: 6 }, (_, k) => g(34 + k * 16, 58 + k * 6, 1, E(0, -8, 4, 9, '#558B2F', 2), k % 2 ? 30 : -30)).join('') + [[60, 74], [92, 84], [118, 100]].map(([x, y]) => E(x, y, 10, 13, '#C0CA33')).join('')
      + [[40, 170], [58, 178], [48, 156], [70, 162], [32, 186]].map(([x, y]) => E(x, y, 10, 7, '#8D5524', 2.5)).join('') + P('M156 120h20v12l8 10v56h-36v-56l8-10z', '#FFCA28') + R(156, 112, 20, 10, '#6D4C41', 2)
      + P('M90 178c0 20 16 30 34 30s34-10 34-30z', '#E08A5A') + E(124, 178, 34, 8, '#8D5524') + P('M100 168c10-20 34-20 40 0', '#F6D27A', 2.5) + face(124, 194, 0.35)) },
  { id: 'ma.food.chebakia', cat: 'food', file: 'ma/food-chebakia.v1.svg', name: nm('ชบากียาขนมดอกไม้น้ำผึ้งงา', 'Chebakia honey flowers'), kw: ['chebakia', 'ชบากียา', 'sesame cookie', 'คุกกี้งา', 'honey cookie', 'ขนมน้ำผึ้ง', 'flower pastry', 'ขนมรูปดอกไม้', 'moroccan sweets', 'ขนมโมร็อกโก'], colour: true,
    // a white plate piled with four big flower-shaped pastries glazed dark gold with honey, each with a darker middle and white sesame seeds
    svg: free(E(120, 186, 96, 22, '#FFFFFF') + Lc('M30 190c40 14 140 14 180 0', '#1E6BB8', 3) + [[78, 158, 1], [162, 160, 1], [120, 108, 1.15], [120, 168, 1]].map(([x, y, s], i) => g(x, y, s, Array.from({ length: 6 }, (_, k) => C(Math.cos(k * 1.047) * 20, Math.sin(k * 1.047) * 20, 15, '#C0741F')).join('') + C(0, 0, 16, '#8D4A12') + [[-22, -6], [18, -18], [22, 10], [-8, 24], [-6, -26]].map(([a, b]) => E(a, b, 2.2, 1.4, '#FFF8E1', 0)).join('') + (i === 2 ? face(0, -2, 0.4) : ''))).join('')) },
  { id: 'ma.food.sfenj', cat: 'food', file: 'ma/food-sfenj.v1.svg', name: nm('สเฟนจ์โดนัทร้อยเชือกใบปาล์ม', 'Sfenj doughnuts on a palm string'), kw: ['sfenj', 'สเฟนจ์', 'moroccan doughnut', 'โดนัทโมร็อกโก', 'palm leaf', 'ใบปาล์ม', 'fried dough', 'แป้งทอด', 'morning snack', 'ของว่างตอนเช้า'], colour: true,
    // three big golden puffy ring doughnuts threaded on a green strip of palm leaf tied in a loop at the top, a dusting of sugar
    svg: free(Lc('M120 30c-20 0-24 20-10 26M120 30c20 0 24 20 10 26', '#7CB342', 6) + Lc('M120 50v150', '#7CB342', 6)
      + [[120, 80], [120, 128], [120, 176]].map(([x, y], i) => E(x, y, 46, 26, '#E8A93F') + E(x, y, 18, 9, '#FFF8E1', 3) + P(`M${x - 40} ${y - 6}c10-14 70-14 80 0`, 'none', 0) + Lc(`M${x - 34} ${y - 12}c10-8 58-8 68 0`, '#F6D27A', 4) + (i === 1 ? face(x - 26, y + 6, 0.3) : '')).join('') + Lc('M120 60v20', '#7CB342', 6)) },
  { id: 'ma.animal.uromastyx', cat: 'animal', file: 'ma/animal-uromastyx.v1.svg', name: nm('กิ้งก่าหางหนาม', 'Spiny-tailed lizard'), kw: ['spiny-tailed lizard', 'กิ้งก่าหางหนาม', 'uromastyx', 'dabb', 'desert lizard', 'กิ้งก่าทะเลทราย', 'sunbathing', 'อาบแดด', 'sahara'], colour: true,
    // a chubby yellow-and-olive lizard sunbathing on a warm rock, a thick tail ringed with little spikes, a round smiling head
    svg: free(P('M10 200c20-30 60-40 110-40s110 10 110 40z', '#BCAAA4') + E(110, 152, 50, 22, '#C0CA33') + Array.from({ length: 5 }, (_, k) => C(90 + k * 12, 148, 3, '#827717', 0)).join('')
      + Lc('M156 156c30 0 50 10 66 30', '#9E9D24', 16) + Array.from({ length: 5 }, (_, k) => P(`M${166 + k * 11} ${150 + k * 6}l5-8 3 9z`, '#FFFFFF', 2)).join('')
      + [[86, 170], [130, 172]].map(([x, y]) => Lc(`M${x} ${y}l-8 14`, '#C0CA33', 8)).join('') + E(56, 140, 32, 24, '#D4E157') + face(56, 138, 0.55)) },
  { id: 'ma.animal.caracal', cat: 'animal', file: 'ma/animal-caracal.v1.svg', name: nm('แมวคาราคัล', 'Caracal'), kw: ['caracal', 'คาราคัล', 'desert lynx', 'แมวป่าทะเลทราย', 'ear tufts', 'หูพู่', 'wild cat', 'แมวป่า', 'high atlas'], colour: true,
    // a tawny caracal kitten face with very tall pointed ears ending in long black tufts, black lines above the eyes, a white chin
    svg: free(P('M66 120L60 34l46 52z', '#D49A5A') + P('M174 120l6-86-46 52z', '#D49A5A') + Lc('M60 34l-6-22M180 34l6-22', INK, 5) + P('M70 110l-2-50 26 32z', '#3E2723', 0) + P('M170 110l2-50-26 32z', '#3E2723', 0)
      + E(120, 140, 66, 58, '#D49A5A') + E(120, 174, 30, 20, '#FFF8E1') + P('M112 160h16l-8 8z', '#E91E63', 2) + Lc('M88 112c6-6 14-6 20 0M132 112c6-6 14-6 20 0', INK, 3) + face(120, 132, 1, 'w')) },
  { id: 'ma.culture.babouche', cat: 'culture', file: 'ma/culture-babouche.v1.svg', name: nm('รองเท้าบาบูชหัวแหลม', 'Babouche slippers'), kw: ['babouche', 'บาบูช', 'leather slippers', 'รองเท้าแตะหนัง', 'pointed slippers', 'รองเท้าหัวแหลม', 'yellow slippers', 'craft', 'งานหัตถกรรม'], colour: true,
    // a pair of soft yellow leather slippers seen from the side: long pointed toes curling up, the uppers covering the front, the backs folded flat, one with a stitched red flower
    svg: free([[118, 108, '#FFCA28', 0], [124, 172, '#FFB300', 1]].map(([x, y, f, i]) => g(x, y, 1, P('M-86 14c-4-10 0-16 10-16h120c22 0 40-10 48-26 4 20-6 42-34 46h-134c-8 0-10-2-10-4z', '#C1693F') + P('M-10 -2c4-30 40-40 70-34 20 2 28 0 36-10-2 22-20 44-52 46h-56z', f) + P('M-80 -2h70', 'none', 3) + Lc('M-80 2c20-4 50-4 70-4', '#FFE082', 5) + (i ? C(36, -16, 7, '#E53935', 2) + Lc('M36 -6v6', '#43A047', 3) : face(30, -14, 0.35)))).join('')) },
  { id: 'ma.culture.zellige', cat: 'culture', file: 'ma/culture-zellige.v1.svg', name: nm('กระเบื้องเซลลีจลายดาวแปดแฉก', 'A zellige tile star'), kw: ['zellige', 'เซลลีจ', 'mosaic tile', 'กระเบื้องโมเสก', 'eight-pointed star', 'ดาวแปดแฉก', 'geometric pattern', 'ลายเรขาคณิต', 'tilework'], colour: true,
    // a square of hand-cut glazed tiles: a big green eight-pointed star in the middle, a blue ring of little stars round it, white and yellow pieces between
    svg: free(R(24, 24, 192, 192, '#FFFFFF', 10) + [[56, 56], [184, 56], [56, 184], [184, 184]].map(([x, y]) => star8(x, y, 18).replace(/fill="X"/g, 'fill="#1E6BB8"')).join('') + [[120, 44], [120, 196], [44, 120], [196, 120]].map(([x, y]) => g(x, y, 1, R(-10, -10, 20, 20, '#FFCA28', 0), 45)).join('')
      + star8(120, 120, 46).replace(/fill="X"/g, 'fill="#2E9E5B"') + star8(120, 120, 22).replace(/fill="X"/g, 'fill="#FFFFFF"') + C(120, 120, 9, '#C1272D') + face(120, 118, 0.25, 'none')) },
  { id: 'ma.culture.qraqeb', cat: 'culture', file: 'ma/culture-qraqeb.v1.svg', name: nm('กราเกบฉิ่งเหล็กดนตรีกนาวา', 'Qraqeb iron castanets'), kw: ['qraqeb', 'กราเกบ', 'krakebs', 'iron castanets', 'ฉิ่งเหล็ก', 'gnawa music', 'ดนตรีกนาวา', 'clack clack', 'music', 'ดนตรี'], colour: true,
    // two pairs of shiny iron castanets, each a pair of round cups joined by a thin waist like a figure eight, one pair clacking open, little sound lines and music notes
    svg: free([[80, 128, -24, 0], [160, 128, 24, 1]].map(([x, y, r, i]) => g(x, y, 1, [-1, 1].map((d) => g(d * 12, 0, 1, C(0, -32, 22, '#B0BEC5') + C(0, 32, 22, '#B0BEC5') + R(-5, -12, 10, 24, '#90A4AE', 3) + C(-6, -38, 6, '#ECEFF1', 0) + C(-6, 26, 6, '#ECEFF1', 0))).join('') + (i ? '' : face(-12, -30, 0.28, 'none')), r)).join('') + Lc('M120 92v-22M104 98l-12-16M136 98l12-16', '#FFB300', 4) + Lc('M40 52V30l14 4v18', INK, 3) + E(36, 54, 6, 4, INK) + E(50, 56, 6, 4, INK) + Lc('M196 48V26', INK, 3) + E(192, 50, 6, 4, INK)) },
  { id: 'ma.culture.pouf', cat: 'culture', file: 'ma/culture-pouf.v1.svg', name: nm('ปูฟเบาะหนังปักลาย', 'An embroidered leather pouf'), kw: ['pouf', 'ปูฟ', 'leather pouffe', 'เบาะหนัง', 'footstool', 'เบาะนั่ง', 'embroidery', 'ลายปัก', 'riad', 'ไรแยด'], colour: true,
    // a round squashy leather floor cushion in orange-red with a stitched star on top and a ring of embroidered arches round its side
    svg: free(P('M30 120c0 60 20 80 90 80s90-20 90-80z', '#E0693F') + E(120, 120, 90, 34, '#F08A5D') + Array.from({ length: 6 }, (_, k) => Lc(`M${44 + k * 28} 186v-26c0-16 20-16 20 0v26`, '#FFE082', 4)).join('')
      + Lc('M30 140c40 20 140 20 180 0', '#FFE082', 3) + [0, 45, 90, 135].map((a) => g(120, 120, 1, Lc('M-40 0c10-8 70-8 80 0c-10 8-70 8-80 0z', '#FFE082', 3), a)).join('') + C(120, 120, 8, '#FFE082', 2) + face(120, 170, 0.45)) },
  { id: 'ma.transport.grandtaxi', cat: 'transport', file: 'ma/transport-grandtaxi.v1.svg', name: nm('แกรนด์แท็กซี่หลังคาท่วมกระเป๋า', 'A grand taxi with bags on the roof'), kw: ['grand taxi', 'แกรนด์แท็กซี่', 'shared taxi', 'แท็กซี่ร่วม', 'roof rack', 'แร็คหลังคา', 'between towns', 'เดินทางข้ามเมือง', 'petit taxi', 'แท็กซี่'], colour: true,
    // a chunky old cream sedan from the side with a roof rack piled high with bags and a rolled rug tied on, a smiling front, round wheels
    svg: free(P('M20 170v-30c0-10 10-16 24-18l26-30h88l30 30c22 2 32 10 32 22v26z', '#F3E5C0') + P('M76 98h36v26H60zM120 98h34l22 26h-56z', '#B3E5FC', 3) + Lc('M20 154h200', '#C1A56A', 4) + Lc('M66 92h104', INK, 4)
      + R(76, 66, 30, 24, '#E53935', 5) + R(110, 72, 34, 18, '#1E6BB8', 5) + g(150, 74, 1, R(-4, -10, 34, 20, '#FFB300', 10), -6) + Lc('M70 80h108', '#8D6E63', 3) + R(206, 140, 14, 10, '#FFF59D', 3, 2)
      + [[64, 172], [176, 172]].map(([x, y]) => C(x, y, 20, '#424242') + C(x, y, 8, '#BDBDBD', 2)).join('') + face(200, 156, 0.3)) },
];

export default {
  places: {
    ma: { country: 'ma', wave: 3, name: nm('โมร็อกโก', 'Morocco'), tz: 'Africa/Casablanca', alias: ['morocco', 'โมร็อกโก', 'maroc', 'casablanca', 'คาซาบลังกา', 'tangier', 'แทนเจียร์', 'essaouira', 'เอสซาอุยรา', 'CMN'], colors: MA },
  },
  items,
};
