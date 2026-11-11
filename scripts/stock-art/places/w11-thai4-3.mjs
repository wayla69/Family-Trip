// Wave 11, Thailand (Isan) 3: Udon Thani, the Red Lotus Sea, Ban Chiang and Phu Phrabat — the Red Lotus Sea is the only
// lotus picture of the Thai set; the Chinese shrine as its gate only (no deities); no sacred forest of Kham Chanot
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const UD = { k1: '#C2185B', k2: '#00838F', k3: '#FCE4EC' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `th-udon.landmark.${slug}`, cat: 'landmark', file: `th/udon/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a Ban Chiang pot: a round cream body on a little foot, painted with red swirls
const pot = (x, y, s, k) => g(x, y, s, P('M-34 30c-20-20-16-56 14-64v-10h40v10c30 8 34 44 14 64z', '#F3D9B1') + R(-22, 28, 44, 10, '#F3D9B1', 3, 3) + E(0, -44, 22, 6, '#E8C08C')
  + [[-16, -6], [14, -2], [-2, 16]].map(([cx, cy], j) => P(`M${cx} ${cy}c0-6 8-8 10-2s-4 12-12 10-10-10-4-16 16-8 18 4`, 'none').replace('fill="none"', `fill="none" stroke="${(j + k) % 2 ? '#C62828' : '#B23A1E'}" stroke-width="3.5"`)).join(''));

const items = [
  { id: 'th-udon.stamp', cat: 'stamp', file: 'th/udon/stamp.v1.svg', name: nm('ตราประทับอุดรธานี', 'Udon Thani stamp'), kw: ['udon thani', 'อุดรธานี', 'ban chiang', 'บ้านเชียง', 'red lotus sea', 'ทะเลบัวแดง', 'phu phrabat', 'ภูพระบาท'],
    // a round Ban Chiang pot painted with red swirls, the town's famous Bronze Age pottery
    svg: cityStamp('tud-st', { name: 'UDON THANI', sub: 'THAILAND', ...UD, emblem: pot(100, 102, 0.85, 0) }) },
  { id: 'th-udon.day.redlotus', cat: 'day', file: 'th/udon/day-redlotus.v1.svg', name: nm('ทะเลบัวแดงยามเช้า', 'The Red Lotus Sea at dawn'), kw: ['red lotus sea', 'ทะเลบัวแดง', 'kumphawapi', 'กุมภวาปี', 'nong han', 'หนองหาน', 'lotus lake', 'บึงบัว', 'boat trip', 'นั่งเรือชมบัว', 'udon thani', 'อุดรธานี', 'sunrise'],
    // a misty pink dawn over a lake carpeted from shore to shore with pink-red lotus flowers and round green leaves, the bow of a little wooden boat in front
    svg: scene('tud-d1', '#F8BBD0', C(160, 70, 20, '#FFF59D', 0) + E(60, 80, 50, 8, '#FFFFFF', 0) + P('M-4 96h248v160H-4z', '#80CBC4')
      + Array.from({ length: 26 }, (_, k) => { const r = Math.floor(k / 6), x = 10 + ((k * 41) % 230), y = 104 + r * 26 + ((k * 7) % 10), s = 0.5 + r * 0.18; return E(x, y + 6 * s, 16 * s, 6 * s, '#43A047', 2) + (k % 3 ? g(x, y, s, P('M0 0c-14-4-16-16-10-22 4 2 8 10 10 22zM0 0c14-4 16-16 10-22-4 2-8 10-10 22zM0 0c-6-10-4-22 0-28 4 6 6 18 0 28z', '#EC407A', 2.5)) : ''); }).join('')
      + P('M60 250l20-40h80l20 40z', '#8D6E63') + Lc('M80 210h80', '#5D4037', 4) + Lc('M90 226h60', '#A1887F', 3)) },
  { id: 'th-udon.day.nongprajak', cat: 'day', file: 'th/udon/day-nongprajak.v1.svg', name: nm('สวนหนองประจักษ์ยามค่ำ', 'Nong Prajak park in the evening'), kw: ['nong prajak park', 'สวนสาธารณะหนองประจักษ์', 'udon thani', 'อุดรธานี', 'city park', 'สวนสาธารณะ', 'evening walk', 'เดินเล่นตอนเย็น', 'footbridge', 'สะพานข้ามบึง', 'lakeside lights'],
    // a city park lake at dusk with a white arched footbridge across it, round trees, glowing lamp posts along the bank and their reflections
    svg: scene('tud-d2', '#9FA8DA', C(190, 54, 14, '#FFF59D', 0) + [[30, 108], [70, 100], [170, 104], [214, 110]].map(([x, y]) => C(x, y, 22, '#388E3C')).join('') + P('M-4 120h248v130H-4z', '#3F51B5')
      + P('M20 150c40-50 160-50 200 0', 'none').replace('fill="none"', 'fill="none" stroke="#FFFFFF" stroke-width="10"') + Lc('M20 150c40-50 160-50 200 0', INK, 3) + Array.from({ length: 7 }, (_, k) => Lc(`M${44 + k * 26} ${150 - Math.sin(((k + 1) / 8) * Math.PI) * 36}v${12 + Math.sin(((k + 1) / 8) * Math.PI) * 10}`, '#FFFFFF', 3)).join('')
      + P('M-4 190h248v60H-4z', '#7CB342') + [30, 90, 150, 210].map((x) => Lc(`M${x} 196v-26`, INK, 3) + C(x, 166, 6, '#FFE082', 2.5) + Lc(`M${x} 176v14`, '#FFE082', 0)).join('') + Lc('M40 170h30M150 176h30', '#FFE082', 3)) },

  L('banchiangpots', 'ไหลายเขียนสีบ้านเชียง', 'Ban Chiang painted pots', ['ban chiang', 'บ้านเชียง', 'painted pottery', 'ไหลายเขียนสี', 'red swirls', 'ลายก้นหอยสีแดง', 'bronze age', 'ยุคสำริด', 'world heritage', 'มรดกโลก', 'museum'], 'หาไหดินเผาสีครีมที่มีลายวงก้นหอยสีแดง', 'Find the cream clay pots painted with red swirls',
    // two round cream clay pots on little feet, painted all over with red spiral swirls like fingerprints, one big and one small
    E(120, 206, 92, 12, '#D7CCC8') + pot(90, 140, 1.5, 0) + pot(176, 166, 0.95, 1) + face(90, 150, 0.4)),
  L('roller', 'ลูกกลิ้งดินเผาบ้านเชียง', 'Ban Chiang clay roller stamps', ['clay roller', 'ลูกกลิ้งดินเผา', 'ban chiang', 'บ้านเชียง', 'pattern printing', 'พิมพ์ลาย', 'ancient craft', 'ของโบราณ', 'pottery workshop', 'เวิร์กช็อปปั้นดิน'], 'หาลูกกลิ้งดินเผาที่กลิ้งแล้วเป็นลายยาว', 'Find the clay roller that prints a long pattern as it rolls',
    // a terracotta cylinder roller carved with spirals rolling along, leaving a long red printed band of swirls behind it, a second little roller standing up
    R(24, 150, 150, 34, '#FFF8E1', 4) + Array.from({ length: 5 }, (_, k) => P(`M${36 + k * 28} 168c0-6 8-8 10-2s-4 12-12 10-10-10-4-16 16-8 18 4`, 'none').replace('fill="none"', 'fill="none" stroke="#C62828" stroke-width="3"')).join('')
      + g(180, 160, 1, R(-24, -40, 48, 72, '#D2691E', 12) + E(0, -40, 24, 8, '#E07B39') + Lc('M-24-16c16 8 32-8 48 0M-24 8c16 8 32-8 48 0', '#8D3B1E', 3) + face(0, -2, 0.36))
      + g(54, 96, 1, R(-14, -30, 28, 56, '#E07B39', 8) + E(0, -30, 14, 5, '#F0A070') + Lc('M-14-6c10 6 18-6 28 0', '#8D3B1E', 2.5))),
  L('nueadaet', 'เนื้อแดดเดียว', 'Sun-dried beef with sticky rice', ['nuea daet diao', 'เนื้อแดดเดียว', 'sun-dried beef', 'เนื้อตากแดด', 'drying rack', 'ตะแกรงตาก', 'isan snack', 'กับแกล้มอีสาน', 'jaew sauce', 'แจ่ว', 'sticky rice'], 'หาเนื้อชิ้นยาวที่ตากแดดอยู่บนตะแกรงไม้ไผ่', 'Find the strips of meat drying in the sun on a bamboo rack',
    // a woven bamboo drying rack in the sunshine with long red-brown strips of seasoned beef laid out on it, sesame seeds, a smiling sun above
    C(184, 56, 22, '#FFD54F', 0) + Lc('M184 22v-6M218 56h6M208 32l4-4', '#FFB300', 4) + g(120, 150, 1, P('M-96 0l20-40h152l20 40z', '#E6C27A') + Array.from({ length: 8 }, (_, k) => Lc(`M${-80 + k * 22} -38l${-6 + k * 1.6} 38`, '#C8962F', 2)).join('') + Lc('M-88-20h176', '#C8962F', 2) + Lc('M-96 0v30M96 0v30', '#8D6E63', 5))
      + [[70, 130], [106, 124], [142, 128], [178, 132]].map(([x, y], k) => g(x, y, 1, P('M-12-18c6-2 14 0 14 6l-2 30c0 6-8 8-14 4z', '#B5523B') + C(-4, -4, 1.6, '#FFF8E1', 0) + C(0, 6, 1.6, '#FFF8E1', 0), -40 + k * 4)).join('') + face(184, 56, 0.32)),
  L('phuphrabat', 'หอนางอุสา ภูพระบาท', 'Hor Nang Usa, the stone table of Phu Phrabat', ['phu phrabat', 'ภูพระบาท', 'hor nang usa', 'หอนางอุสา', 'table rock', 'หินรูปโต๊ะ', 'historical park', 'อุทยานประวัติศาสตร์', 'sandstone pillar', 'เสาหิน', 'legend'], 'หาเสาหินผอมสูงที่มีแผ่นหินใหญ่วางอยู่ข้างบน', 'Find the tall thin rock with a big flat stone balanced on top',
    // a tall thin sandstone pillar with a huge flat stone slab balanced on top like a table, a tiny stone-walled room tucked under the slab, dry forest trees around
    E(120, 210, 96, 10, '#C5A572') + [[40, 170], [206, 176]].map(([x, y]) => Lc(`M${x} 210V${y}`, '#6D4C41', 5) + C(x, y - 10, 20, '#7CB342')).join('')
      + P('M104 210c-4-40 8-80 0-120h34c-8 40 6 80 0 120z', '#C9A27E') + Lc('M112 120c4 30 0 60 4 86', '#A67C52', 3) + P('M44 66c20-14 130-20 156-4 6 10 0 22-10 24-50 6-100 8-140 0-10-4-12-14-6-20z', '#B98B61') + Lc('M54 70c40-6 100-8 136-2', '#9C7049', 3)
      + R(122, 92, 34, 26, '#A1887F', 2, 3) + Lc('M122 104h34M138 92v26', '#8D6E63', 2) + R(132, 104, 12, 14, INK, 2, 0) + face(120, 156, 0.36)),
  L('khaopiaksen', 'ข้าวเปียกเส้น', 'Khao piak sen, thick rice noodle soup', ['khao piak sen', 'ข้าวเปียกเส้น', 'thick rice noodles', 'เส้นข้าวเปียก', 'noodle soup', 'ก๋วยเตี๋ยวน้ำ', 'crispy garlic', 'กระเทียมเจียว', 'pork', 'หมู', 'breakfast'], 'หาตะเกียบที่คีบเส้นหนาๆ ขึ้นมาจากชามดินเผา', 'Find the chopsticks lifting fat round noodles out of the clay bowl',
    // a brown clay bowl of thick cloudy soup with fat round rice noodles lifted up high by chopsticks, slices of pork, crispy garlic and coriander on top
    E(120, 206, 86, 12, '#ECEFF1') + P('M36 130h168c0 46-34 74-84 74S36 176 36 130z', '#8D5524') + Lc('M44 156c40 10 112 10 152 0', '#6D3F1A', 3) + E(120, 130, 84, 16, '#F5E6C8')
      + [[80, 126], [150, 128]].map(([x, y]) => E(x, y, 14, 6, '#E8A68A', 2.5)).join('') + [[110, 136], [130, 124], [100, 122], [170, 132], [60, 134]].map(([x, y]) => C(x, y, 3, '#F4B942', 0)).join('') + [[124, 138], [64, 126]].map(([x, y]) => P(`M${x} ${y}c-4-6 4-8 4-2 4-6 10 0 2 4z`, '#43A047', 1.5)).join('')
      + [-8, 0, 8].map((dx) => Lc(`M${116 + dx} 126c-2-30 4-50 0-74`, '#FFF8E1', 6)).join('') + Lc('M100 46l40 10M98 56l42 8', '#A1673F', 4) + face(120, 170, 0.42)),
  L('shrinegate', 'ประตูศาลเจ้าปู่ย่า', 'The Chinese shrine gate of Udon', ['pu ya shrine', 'ศาลเจ้าปู่-ย่า', 'chinese shrine gate', 'ซุ้มประตูจีน', 'chinese new year', 'ตรุษจีน', 'red pillars', 'เสาแดง', 'udon chinese community', 'ชุมชนจีน'], 'หาซุ้มประตูเสาแดงหลังคากระเบื้องเขียวโค้งงอน', 'Find the gate with red pillars and a curly green-tiled roof',
    // a Chinese-style gateway with four red pillars, a green-tiled roof with swooping upturned eaves in two tiers, golden trim and a round medallion (no figures)
    R(24, 200, 192, 14, '#B0BEC5', 3) + [44, 84, 156, 196].map((x) => R(x - 8, 104, 16, 96, '#E53935', 2) + R(x - 12, 196, 24, 8, '#9E9E9E', 2, 2.5)).join('') + R(36, 120, 168, 12, '#FFCA28', 0, 3) + R(92, 136, 56, 18, '#FFCA28', 3, 3)
      + P('M20 104c30 0 40-14 100-14s70 14 100 14l-10-14c-20 0-40-16-90-16S50 76 30 90z', '#26A69A') + Lc('M30 98c30-4 50-14 90-14s60 10 90 14', '#00796B', 3) + P('M60 74c20-2 30-16 60-16s40 14 60 16l-8-12c-14 0-24-12-52-12s-38 12-52 12z', '#26A69A') + C(120, 48, 7, '#FFCA28', 3)
      + face(120, 146, 0.32)),
  L('namnueng', 'แหนมเนือง', 'Naem nueang, roll-your-own pork rolls', ['naem nueang', 'แหนมเนือง', 'rice paper', 'แผ่นแป้งเปาะเปี๊ยะ', 'grilled pork balls', 'หมูเนือง', 'fresh herbs', 'ผักสด', 'vietnamese food', 'อาหารเวียดนาม', 'wrap'], 'หาแผ่นแป้งใสกับลูกชิ้นหมูย่างเสียบไม้และผักสด', 'Find the see-through rice papers, grilled pork sticks and fresh greens',
    // a round tray of grilled pork balls on sticks, a stack of round see-through rice papers, lettuce, mint, cucumber and star fruit slices, a finished roll with a smile and a cup of sauce
    E(120, 150, 104, 64, '#D7B377') + E(120, 146, 96, 56, '#FFF8E1', 3)
      + [[70, 110], [92, 106]].map(([x, y]) => Lc(`M${x} ${y + 40}l30-60`, '#D7B377', 4) + [0, 1, 2].map((k) => C(x + 7 + k * 8, y + 22 - k * 16, 8, '#B5523B', 2.5)).join('')).join('') + [0, 1, 2].map((k) => E(160, 112 - k * 5, 30, 12, '#F5F5F5', 2.5)).join('')
      + P('M40 160c10-20 40-20 50 0-10 10-40 10-50 0z', '#9CCC65') + [[120, 176], [140, 168]].map(([x, y]) => C(x, y, 9, '#C5E1A5', 2.5)).join('') + P('M164 170l8-12 8 12-12 4-12-4z', '#FDD835', 2.5)
      + g(120, 130, 1, R(-22, -10, 44, 20, '#F1F8E9', 10) + Lc('M-14-10v20M0-10v20M14-10v20', '#A5D6A7', 2) + face(0, -2, 0.3)) + E(204, 196, 14, 8, '#FFFFFF', 3) + E(204, 194, 9, 4, '#E65100', 0)),
  L('antnest', 'รังมดแดงบนต้นมะม่วง', 'A weaver-ant nest in the mango tree', ['red ant nest', 'รังมดแดง', 'weaver ants', 'มดแดง', 'ant eggs', 'ไข่มดแดง', 'mango tree', 'ต้นมะม่วง', 'isan foraging', 'หาของป่า', 'hot season'], 'หารังใบไม้ที่มดแดงตัวเล็กเดินอยู่รอบๆ', 'Find the ball of leaves with little red ants walking round it',
    // a leafy branch with a ball nest of green leaves stitched together, tiny orange weaver ants marching round it, a woven basket on a long bamboo pole held up underneath
    Lc('M16 60c60 10 120 0 208 20', '#6D4C41', 8) + [[40, 52], [80, 72], [170, 70], [206, 90]].map(([x, y], k) => g(x, y, 1, P('M0 0c10-14 30-14 40-4-10 12-30 14-40 4z', '#66BB6A', 2.5), k * 40 - 20)).join('')
      + g(120, 112, 1, [0, 1, 2, 3, 4].map((k) => g(0, 0, 1, P('M0-36c18 0 30 16 30 36s-12 36-30 36z', ['#81C784', '#66BB6A'][k % 2], 3), k * 72)).join('') + face(0, 4, 0.36))
      + [[84, 92], [160, 120], [140, 150], [96, 140]].map(([x, y]) => E(x, y, 4, 2.5, '#E65100', 1.2) + C(x + 5, y, 2.5, '#E65100', 1.2)).join('')
      + Lc('M160 230L130 168', '#D7B377', 5) + P('M112 168c0 14 36 14 36 0l-4-12h-28z', '#E6C27A', 3) + Lc('M114 162h32', '#C8962F', 2)),
  L('phufoilom', 'ทางเดินป่าภูฝอยลม', 'The misty forest walk at Phu Foi Lom', ['phu foi lom', 'ภูฝอยลม', 'misty forest', 'ป่าในหมอก', 'boardwalk', 'สะพานไม้', 'nature trail', 'เส้นทางศึกษาธรรมชาติ', 'fern', 'เฟิร์น', 'eco park'], 'หาทางเดินไม้ที่หายเข้าไปในหมอกในป่า', 'Find the wooden walkway disappearing into the mist of the forest',
    // a wooden boardwalk zigzagging away into a soft white mist between tall dark-green trees and big feathery ferns
    bg('#E0F2F1') + [[40, 50], [76, 40], [168, 44], [204, 54]].map(([x, top], k) => Lc(`M${x} 210V${top + 20}`, '#5D4037', 6 - k % 2) + E(x, top + 20, 22, 30, k % 2 ? '#2E7D32' : '#388E3C')).join('') + E(120, 90, 70, 22, '#FFFFFF', 0) + E(120, 116, 90, 14, '#FFFFFF', 0)
      + P('M106 110h28l40 100H66z', '#BC8A5F') + Array.from({ length: 6 }, (_, k) => Lc(`M${104 - k * 7} ${120 + k * 16}h${32 + k * 14}`, '#8D5E3C', 3)).join('') + Lc('M100 110L56 210M140 110l44 100', '#6D4C41', 4)
      + [[44, 196, -1], [196, 196, 1]].map(([x, y, f]) => Array.from({ length: 4 }, (_, k) => Lc(`M${x} ${y}c${f * (10 + k * 6)}-${20 + k * 6} ${f * (24 + k * 4)}-${26 + k * 4} ${f * (34 + k * 2)}-${24 + k * 4}`, '#7CB342', 4)).join('')).join('') + frame + face(120, 160, 0.36)),
  L('clocktower', 'หอนาฬิกาอุดรธานี', 'The Udon Thani clock tower', ['clock tower', 'หอนาฬิกา', 'udon city centre', 'ใจกลางเมืองอุดร', 'roundabout', 'วงเวียน', 'landmark', 'แลนด์มาร์ก', 'city walk', 'เดินชมเมือง'], 'หาหอนาฬิกาสูงกลางวงเวียนที่มีดอกไม้รอบๆ', 'Find the tall clock tower standing on the roundabout with flowers round it',
    // a slim cream clock tower with a round white clock face on each side and a little pointed red roof, standing on a round roundabout bed of flowers
    E(120, 204, 96, 16, '#9CCC65') + Array.from({ length: 12 }, (_, k) => C(36 + k * 15.5, 204 + Math.sin(k) * 6, 5, ['#E91E63', '#FFCA28', '#FF7043'][k % 3], 2)).join('') + R(96, 190, 48, 12, '#BCAAA4', 2)
      + R(100, 70, 40, 122, '#FFF3E0') + Lc('M100 110h40M100 150h40', '#E0C9A6', 3) + R(110, 160, 20, 26, '#8D6E63', 8, 3) + P('M92 72l28-40 28 40z', '#E53935') + Lc('M120 32v-10', INK, 3)
      + C(120, 90, 14, '#FFFFFF', 3) + Lc('M120 90v-9M120 90l6 4', INK, 2.5) + face(120, 128, 0.32)),
  L('kaengom', 'แกงอ่อม', 'Kaeng om, Isan herb stew', ['kaeng om', 'แกงอ่อม', 'isan curry', 'แกงอีสาน', 'dill', 'ผักชีลาว', 'herb stew', 'แกงผัก', 'clay pot', 'หม้อดิน', 'country cooking'], 'หาหม้อดินที่มีแกงสีเขียวกับผักชีลาวฟูๆ', 'Find the clay pot of green stew with fluffy dill on top',
    // a round black clay pot on three little stones of a wood fire, full of a pale green herb stew with feathery dill, chillies, lemongrass and vegetables, gentle steam
    [[70, 196], [120, 204], [170, 196]].map(([x, y]) => E(x, y, 16, 10, '#9E9E9E')).join('') + [[96, 196], [144, 196]].map(([x, y]) => P(`M${x - 8} ${y}c2-14 8-14 8-22 4 8 10 10 8 22z`, '#FF7043', 2.5)).join('')
      + P('M42 120c0 40 30 70 78 70s78-30 78-70z', '#37474F') + E(120, 120, 78, 18, '#455A64') + E(120, 120, 66, 12, '#AED581', 0)
      + Array.from({ length: 6 }, (_, k) => Lc(`M${78 + k * 16} 118c-4-10 6-14 2-22M${80 + k * 16} 110l-6-4M${80 + k * 16} 104l6-4`, '#2E7D32', 2.5)).join('') + [[96, 124], [150, 120]].map(([x, y]) => P(`M${x} ${y}c6-6 12-6 16 0-6 4-12 4-16 0z`, '#E53935', 2)).join('')
      + Lc('M90 84c-6-10 6-16 0-26M130 84c-6-10 6-16 0-26', '#B0BEC5', 3) + face(120, 156, 0.42)),
  L('jacana', 'นกพริกบนใบบัว', 'A pheasant-tailed jacana walking on lily pads', ['jacana', 'นกพริก', 'pheasant-tailed jacana', 'นกอีแจว', 'water bird', 'นกน้ำ', 'long toes', 'นิ้วเท้ายาว', 'birdwatching', 'ดูนก', 'wetland'], 'หานกหางยาวที่เดินบนใบไม้ลอยน้ำได้', 'Find the long-tailed bird walking on the floating leaves',
    // a pheasant-tailed jacana with a white face, golden neck, dark body and a long curved tail, tiptoeing on round floating leaves on its very long thin toes
    E(120, 196, 100, 20, '#4DB6AC') + [[60, 192, 28], [130, 200, 34], [196, 190, 22]].map(([x, y, r]) => P(`M${x} ${y}m${-r} 0a${r} ${r * 0.35} 0 1 0 ${r * 2} 0a${r} ${r * 0.35} 0 1 0 ${-r * 2} 0z`, '#66BB6A') + Lc(`M${x} ${y}l${r * 0.8}-${r * 0.2}`, '#43A047', 2)).join('')
      + P('M152 126c26-4 44-24 54-50-6 22-26 40-50 48z', '#263238') + E(132, 136, 32, 22, '#37474F') + P('M104 126c-4-12-2-26 4-34h18c6 10 6 24 2 34z', '#FFCA28') + C(114, 86, 18, '#FFFFFF') + Lc('M96 92l-14 4', '#78909C', 4) + Lc('M124 74c6 8 8 18 4 28', INK, 3)
      + Lc('M124 156l-8 38M142 156l6 40', '#78909C', 3) + Lc('M100 196l16-2 16 2M132 198l16-2 16 2', '#78909C', 2.5) + face(112, 86, 0.28)),
  L('tamarind', 'มะขามหวานกับมะขามแช่อิ่ม', 'Sweet tamarind pods', ['tamarind', 'มะขาม', 'sweet tamarind', 'มะขามหวาน', 'tamarind candy', 'มะขามคลุกน้ำตาล', 'thai fruit', 'ผลไม้ไทย', 'roadside stall', 'ของฝาก', 'snack'], 'หาฝักมะขามโค้งสีน้ำตาลที่แกะเปลือกออกเห็นเนื้อ', 'Find the curvy brown pods with one peeled open to show the sticky fruit',
    // a woven tray of curvy brown tamarind pods, one cracked open showing the sticky orange-brown fruit with its stringy veins, and sugared tamarind balls on a stick
    E(120, 170, 100, 40, '#E6C27A') + E(120, 166, 88, 32, '#F3DBA4', 3) + Lc('M50 160c40 10 100 10 140 0M56 176c40 8 90 8 128 0', '#D9B46B', 2)
      + [[80, 150, -20], [140, 146, 15], [110, 176, 5]].map(([x, y, r]) => g(x, y, 1, P('M-46 0c0-12 10-14 18-10s12-10 24-6 14 10 24 4 22-6 26 6c4 12-12 16-24 12s-14 10-26 6-12-10-24-4-18 4-18-8z', '#A1673F') + Lc('M-30-4l4 8M-6-6l4 10M18-4l4 8', '#7B4A2A', 2), r)).join('')
      + g(160, 110, 1, P('M-36 0c0-10 10-12 18-8s12-8 22-4 14 8 22 4l2 12c-8 4-14-2-22 0s-14 10-24 4-18 2-18-8z', '#C1694F') + Lc('M-30 2c20-6 40 4 56-4', '#FFCC80', 2), -10) + face(110, 170, 0.36)
      + Lc('M196 70v80', '#D7B377', 4) + [0, 1, 2].map((k) => C(196, 70 + k * 18, 10, '#B5523B', 2.5) + [[-4, -4], [4, 2]].map(([dx, dy]) => C(196 + dx, 70 + k * 18 + dy, 1.8, '#FFFFFF', 0)).join('')).join('')),
  L('mookata', 'หมูกระทะ', 'Moo kata, the grill-and-soup dome', ['moo kata', 'หมูกระทะ', 'thai barbecue', 'ปิ้งย่าง', 'hotpot', 'หม้อจุ่ม', 'grill dome', 'กระทะทรงโดม', 'family dinner', 'มื้อเย็นครอบครัว', 'charcoal'], 'หากระทะทรงโดมที่มีน้ำซุปรอบขอบ', 'Find the dome-shaped grill pan with soup all round its edge',
    // a domed black grill pan on a clay charcoal bucket, slices of pork sizzling on the dome, a moat of soup round the edge with cabbage, mushrooms and an egg
    P('M60 160h120l-12 50H72z', '#A1673F') + Lc('M66 180h108', '#8D5524', 3) + [96, 120, 144].map((x) => C(x, 162, 6, '#FF7043', 0)).join('')
      + E(120, 140, 90, 24, '#37474F') + E(120, 138, 80, 18, '#FFE0B2', 3) + P('M74 136c0-30 20-50 46-50s46 20 46 50z', '#455A64') + Array.from({ length: 4 }, (_, k) => Lc(`M${84 + k * 12} ${128 - k * 4}l${30 - k * 6}-${24 - k * 4}`, '#263238', 1.5)).join('')
      + [[100, 100, -20], [138, 104, 20], [118, 122, 0]].map(([x, y, r]) => g(x, y, 1, R(-14, -7, 28, 14, '#F48FB1', 5, 2.5) + Lc('M-10-2h20', '#FFFFFF', 2), r)).join('')
      + [[54, 142, '#9CCC65'], [186, 142, '#9CCC65'], [168, 152, '#FFFFFF']].map(([x, y, c]) => C(x, y, 7, c, 2)).join('') + E(70, 152, 8, 6, '#FFFFFF', 2) + C(70, 152, 3, '#FFB300', 0) + face(120, 116, 0.32)),
  L('salapier', 'ศาลากลางหนองหาน', 'The pavilion at the end of the lake pier', ['lake pavilion', 'ศาลาริมน้ำ', 'pier', 'สะพานไม้', 'nong han', 'หนองหาน', 'sunset', 'พระอาทิตย์ตก', 'thai sala', 'ศาลาทรงไทย', 'lake view'], 'หาศาลาหลังคาไทยที่ปลายสะพานไม้กลางน้ำ', 'Find the Thai-roofed pavilion at the end of the wooden pier on the water',
    // a little Thai pavilion with a tiered orange roof and curly gable tips standing at the end of a long wooden pier over a calm golden-evening lake
    bg('#FFE0B2') + C(64, 80, 20, '#FFB74D', 0) + low(110, '#4FC3F7') + Lc('M40 140h40M150 200h50', '#E1F5FE', 3) + frame
      + P('M16 200l90-50h20l-80 74H30c-8 0-14-6-14-14z', '#BC8A5F') + Array.from({ length: 5 }, (_, k) => Lc(`M${30 + k * 18} ${206 - k * 10}v20`, '#6D4C41', 3)).join('')
      + R(110, 112, 80, 38, '#FFF3E0') + Lc('M116 150v-38M184 150v-38M150 150v-38', '#A1673F', 4) + P('M100 116l50-28 50 28z', '#FB8C00') + P('M112 94l38-22 38 22z', '#E65100') + Lc('M150 72v-10M100 116l-6-8M200 116l6-8', '#FFCA28', 3)
      + Lc('M110 154h80', '#8D6E63', 6) + face(150, 132, 0.34)),
  L('bulbul', 'นกปรอดหัวโขน', 'A red-whiskered bulbul on a branch', ['red-whiskered bulbul', 'นกปรอดหัวโขน', 'songbird', 'นกร้องเพลง', 'crest', 'หงอน', 'garden bird', 'นกในสวน', 'birdsong', 'เสียงนก', 'morning'], 'หานกตัวเล็กที่มีหงอนแหลมและแก้มแดง', 'Find the little bird with a pointy crest and a red cheek patch',
    // a round little bulbul with a tall pointed black crest, a red cheek patch, white cheeks and chest, a red patch under the tail, singing on a branch with leaves
    Lc('M20 180c60-10 140-10 200 6', '#6D4C41', 8) + [[40, 172], [196, 176]].map(([x, y], k) => g(x, y, 1, P('M0 0c10-12 28-12 34-2-10 10-26 10-34 2z', '#66BB6A', 2.5), k ? 200 : -30)).join('')
      + P('M150 150c30 10 46 24 52 40-20-6-40-14-56-24z', '#795548') + E(120, 134, 44, 40, '#8D6E63') + E(112, 148, 28, 26, '#FFFFFF', 0) + P('M90 96c-2-30 10-52 24-60-2 16 0 30 8 40z', '#212121') + C(110, 100, 26, '#212121')
      + E(112, 112, 12, 9, '#FFFFFF', 0) + C(124, 104, 5, '#E53935', 0) + P('M86 100l-14 4 14 4z', INK, 2) + E(156, 168, 8, 6, '#E53935', 2) + Lc('M110 172l-4 10M128 172l2 10', INK, 3)
      + face(104, 100, 0.26).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"') + [[60, 70], [50, 50]].map(([x, y], k) => g(x, y, 1, Lc('M0 0v-16l10-4v16', INK, 2.5) + E(-3, 1, 4, 3, INK, 0) + E(7, -3, 4, 3, INK, 0), k * 10)).join('')),
  L('supnormai', 'ซุปหน่อไม้', 'Sup nor mai, bamboo shoot salad', ['sup nor mai', 'ซุปหน่อไม้', 'bamboo shoot salad', 'ยำหน่อไม้', 'bamboo shoots', 'หน่อไม้', 'yanang leaves', 'ใบย่านาง', 'rainy season food', 'อาหารหน้าฝน', 'isan food'], 'หาเส้นหน่อไม้สีขาวในจานกับหน่อไม้ทั้งหน่อ', 'Find the plate of pale shredded bamboo shoots and the whole shoot beside it',
    // a plate of shredded pale bamboo shoots tossed in a dark green herb dressing with sesame seeds and mint, a whole pointed bamboo shoot in its brown husk beside it
    E(110, 170, 86, 30, '#FFFFFF') + E(110, 164, 70, 22, '#558B2F') + Array.from({ length: 12 }, (_, k) => Lc(`M${60 + (k % 6) * 18} ${152 + Math.floor(k / 6) * 12}c6 4 12 4 16 0`, '#FFF9C4', 4)).join('')
      + Array.from({ length: 10 }, (_, k) => E(62 + ((k * 23) % 96), 154 + ((k * 13) % 22), 2.5, 1.5, '#FFF8E1', 0)).join('') + [[84, 146], [132, 150]].map(([x, y]) => P(`M${x} ${y}c-6-8 2-12 6-6 4-6 12-2 6 6z`, '#43A047', 2)).join('')
      + g(194, 120, 1, P('M-22 50c-6-40 6-80 22-104 16 24 28 64 22 104z', '#A1673F') + P('M-14 50c-6-30 2-60 14-80', '#8D5524', 2.5) + Lc('M-22 30c14 6 30 6 44 0M-20 6c12 6 28 6 40 0', '#6D4C41', 2.5) + E(0, 52, 22, 6, '#FFF9C4', 2.5) + face(0, 26, 0.3))
      + face(110, 172, 0.4).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
];

export default {
  places: {
    'th-udon': { country: 'th', wave: 3, home: true, name: nm('อุดรธานี', 'Udon Thani'), tz: 'Asia/Bangkok', ll: [17.41, 102.79], alias: ['udon thani', 'อุดรธานี', 'UTH', 'red lotus sea', 'ทะเลบัวแดง', 'kumphawapi', 'กุมภวาปี', 'nong han kumphawapi', 'หนองหานกุมภวาปี', 'ban chiang', 'บ้านเชียง', 'phu phrabat', 'ภูพระบาท', 'nong prajak', 'หนองประจักษ์', 'phu foi lom', 'ภูฝอยลม'], colors: UD },
  },
  items,
};
