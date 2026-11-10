// Wave 9, Japan group part 4: Laos, Luang Prabang, Cambodia, Siem Reap, the Philippines, Boracay, Bohol and Cebu
// Temples and halls appear only as buildings, with no figures (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free, scene } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +v.toFixed(1);
const palm = (x, y, h, d = 1) => Lc(`M${x} ${y}c${d * 4}-${h / 2} ${-d * 2}-${h * 0.8} ${d * 8}-${h}`, '#6D4C41', 5)
  + ring(5, (j) => Lc(`M${x + d * 8} ${y - h}l${(-24 + j * 12) * d} ${-4 + Math.abs(j - 2) * 7}`, '#43A047', 4));

const items = [
  // ---------- Laos (the country)
  K('la.culture.sinh', 'ซิ่นลาว ผ้านุ่งทอลายตีนซิ่น', 'The Lao sinh, the woven tube skirt with its patterned hem', ['sinh', 'ซิ่น', 'lao skirt', 'ผ้าซิ่นลาว', 'tube skirt', 'ผ้านุ่ง', 'woven hem', 'ตีนซิ่น', 'lao silk', 'ไหมลาว', 'traditional dress'],
    // a long wrap skirt hanging on a wooden hanger, deep purple silk with a wide golden woven hem of diamonds and little birds, a silver belt draped over the top, a folded shoulder sash beside it
    Lc('M40 30h160', '#8D6E63', 6) + Lc('M120 30v-14', '#8D6E63', 4)
      + P('M56 34h128l10 170H46z', '#7B1FA2') + ring(6, (k) => Lc(`M${66 + k * 22} 40l-2 110`, '#9C27B0', 3))
      + P('M50 150h140l4 54H46z', '#FFC107') + ring(7, (k) => P(`M${58 + k * 19} 162l8 10-8 10-8-10z`, '#E53935', 2)) + Lc('M48 190h144', '#E53935', 3)
      + R(50, 36, 140, 12, '#CFD8DC', 3, 2.5) + ring(6, (k) => C(64 + k * 22, 42, 3, '#90A4AE', 0)) + face(120, 100, 0.4)
      + g(204, 180, 1, R(-14, -40, 28, 60, '#F48FB1', 4) + ring(3, (k) => Lc(`M-14 ${-28 + k * 18}h28`, '#FFD54F', 3)))),
  K('la.animal.gecko', 'ตุ๊กแก สัตว์ที่ร้องเรียกชื่อตัวเองในบ้านลาว', 'The tokay gecko, the house lizard that calls its own name', ['tokay gecko', 'ตุ๊กแก', 'gecko', 'จิ้งจกยักษ์', 'to-kay call', 'เสียงร้องตุ๊กแก', 'lao house', 'บ้านลาว', 'spotted lizard', 'สัตว์เลื้อยคลานลายจุด'],
    // a chubby blue-grey gecko with orange spots clinging to a wooden wall with its wide sticky toes, big golden eyes, curly tail, little sound lines coming from its mouth
    R(-4, -4, 248, 248, '#D7A86E', 0, 0) + ring(5, (k) => Lc(`M-4 ${30 + k * 48}h248`, '#B07A3E', 3))
      + g(120, 130, 1, E(0, 0, 26, 52, '#7986CB') + ring(8, (k) => C(-12 + (k % 2) * 22, -36 + k * 10, 4, '#FF8A65', 0))
        + [[-24, -30, -1], [24, -30, 1], [-24, 34, -1], [24, 34, 1]].map(([x, y, d]) => Lc(`M${x} ${y}l${d * 22} ${y < 0 ? -16 : 16}`, '#7986CB', 9) + ring(4, (j) => C(f1(x + d * 22 + d * (-6 + j * 4)), f1(y + (y < 0 ? -16 : 16) + (y < 0 ? -6 : 6) + Math.abs(j - 1.5) * -2), 3.5, '#9FA8DA', 1.5))).join('')
        + C(0, -60, 22, '#7986CB') + C(-12, -66, 7, '#FFC107', 2) + C(12, -66, 7, '#FFC107', 2) + Lc('M-12-70v8M12-70v8', '#22213A', 2.5) + P('M-8-50q8 6 16 0', 'none', 2.5)
        + Lc('M0 52c0 20 20 30 30 20s0-20-10-12', '#7986CB', 8))
      + Lc('M150 64l16-8M152 76l20 0M150 88l16 8', '#FFFFFF', 3)),
  K('la.transport.songthaew', 'รถสองแถวของลาว รถกระบะมีม้านั่งสองแถว', 'A Lao songthaew, the pickup bus with two benches', ['songthaew', 'สองแถว', 'pickup bus', 'รถกระบะโดยสาร', 'shared taxi', 'รถโดยสารร่วม', 'lao countryside', 'ชนบทลาว', 'two benches', 'ม้านั่งสองแถว', 'roof rack'],
    // a bright blue pickup truck with a roofed back, two benches facing each other inside with passengers, sacks and baskets tied on the roof rack, a dusty road and palms
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#E6C27A', 0, 0) + palm(220, 190, 80, -1)
      + g(110, 150, 1, R(-30, -40, 120, 60, '#29B6F6', 6) + R(-24, -32, 108, 30, '#E1F5FE', 2, 2.5) + Lc('M-30-6h120', '#0288D1', 3)
        + kid(0, -6, '#E53935', 0.7) + kid(30, -6, '#FFCA28', 0.7) + kid(60, -6, '#66BB6A', 0.7)
        + P('M-30 20v-36h-30l-20 20v16z', '#29B6F6') + R(-74, -12, 30, 16, '#E1F5FE', 2, 2.5) + C(-50, 22, 14, '#37474F', 3) + C(-50, 22, 5, '#B0BEC5', 0) + C(60, 22, 14, '#37474F', 3) + C(60, 22, 5, '#B0BEC5', 0)
        + Lc('M-34-44h128', '#5D4037', 3) + E(0, -54, 18, 10, '#D7A86E') + R(28, -62, 30, 18, '#8D6E63', 3) + C(-84, 2, 4, '#FFEB3B', 2) + face(-54, -4, 0.22))),
  K('la.culture.watphou', 'วัดพู ปราสาทหินโบราณบนเชิงเขาที่จำปาสัก', 'Wat Phou, the old stone temple on the mountainside at Champasak', ['wat phou', 'วัดพู', 'vat phou', 'champasak', 'จำปาสัก', 'ancient stone temple', 'ปราสาทหินโบราณ', 'unesco ruins', 'โบราณสถานมรดกโลก', 'mountain temple', 'ปราสาทบนเขา'],
    // crumbling sandstone ruins on terraces climbing a green mountainside, a long stone stairway up the middle, a mountain with a knob-shaped peak behind, a long baray pool at the foot
    sky('#FFF8E1') + P('M-4 150c30-60 70-100 110-110 6-20 20-24 26 0 40 10 80 60 112 110z', '#689F38') + C(124, 34, 10, '#558B2F', 2.5)
      + R(-4, 200, 248, 44, '#4FC3F7', 0, 0) + Lc('M30 214h50M150 226h50', '#B3E5FC', 3)
      + ring(3, (k) => R(60 + k * 16, 170 - k * 34, 120 - k * 32, 30, '#BCAAA4', 2, 2.5)) + P('M112 200l4-104h8l4 104z', '#A1887F') + ring(6, (k) => Lc(`M${113 - k * 0.3} ${190 - k * 16}h${14 + k * 0.6}`, '#8D6E63', 2))
      + [[70, 152], [170, 152]].map(([x, y]) => R(x - 16, y - 22, 32, 22, '#A1887F') + P(`M${x - 18} ${y - 22}l18-12 18 12z`, '#8D6E63', 2) + R(x - 5, y - 16, 10, 16, '#5D4037', 0, 2)).join('')
      + R(102, 64, 36, 26, '#A1887F') + P('M98 64l22-16 22 16z', '#8D6E63', 2.5) + face(120, 180, 0.3)),
  K('la.food.pingkai', 'ปิ้งไก่ ไก่ย่างหนีบไม้ไผ่ของลาว', 'Ping kai, Lao chicken grilled in a bamboo clamp', ['ping kai', 'ปิ้งไก่', 'ไก่ย่าง', 'lao grilled chicken', 'ไก่ย่างลาว', 'bamboo clamp', 'ไม้ไผ่หนีบ', 'charcoal grill', 'เตาถ่าน', 'street grill', 'ร้านปิ้งย่างข้างทาง'],
    // a flattened golden chicken held flat inside a split bamboo clamp, grilling over a long charcoal stove with glowing coals, a little basket of sticky rice and a dish of chilli dip beside it
    R(20, 160, 200, 40, '#5D4037', 6) + R(28, 148, 184, 16, '#3E2723', 4) + ring(8, (k) => C(40 + k * 23, 156, 7, k % 2 ? '#FF7043' : '#FFB74D', 0))
      + g(110, 108, 1, Lc('M-70 50l40-110M-40 50l10-110', '#C8A16B', 6) + P('M-40-30c10-14 50-14 64 0 10 14 6 40-6 52-12 8-40 8-50-4-12-14-16-34-8-48z', '#D9952E') + Lc('M-30-6h44M-26 8h40', '#C27F2A', 3) + Lc('M-20 40l-50 0M-20-30l-50 0', '#C8A16B', 4) + face(-8, 4, 0.36), 10)
      + g(196, 116, 1, P('M-16-20h32l-6 36h-20z', '#D7A86E') + Lc('M-12-8h24M-10 4h20', '#B07A3E', 2) + C(0, -24, 14, '#FFFFFF', 2.5))
      + g(204, 208, 1, E(0, 0, 18, 7, '#FFFFFF') + E(0, -2, 12, 4, '#C62828', 0))),

  // ---------- Luang Prabang
  L('la/luangprabang/landmark-khaosoi.v1.svg', 'ข้าวซอยหลวงพระบาง เส้นใหญ่ราดหมูสับมะเขือเทศ', 'Luang Prabang khao soi with tomato and pork sauce', ['khao soi', 'ข้าวซอย', 'lao khao soi', 'ข้าวซอยลาว', 'tomato pork sauce', 'น้ำพริกหมูสับมะเขือเทศ', 'wide rice noodles', 'เส้นใหญ่', 'morning noodles', 'ก๋วยเตี๋ยวเช้า'], 'หาก้อนหมูสับสีแดงส้มที่ราดอยู่ตรงกลาง', 'Find the red-orange spoonful of pork sauce in the middle',
    // a bowl of clear broth with wide flat white rice noodles, a big spoonful of red-orange tomato and minced pork sauce in the centre, a heap of fresh greens and lime-free herbs on a side plate
    P('M20 116h170c0 60-36 92-85 92s-85-32-85-92z', '#FFFFFF') + ring(3, (k) => C(50 + k * 55, 160, 8, 'none', 2.5)) + E(105, 116, 85, 22, '#FFFFFF') + E(105, 116, 77, 17, '#FFF3D6', 3)
      + ring(5, (k) => P(`M${40 + k * 26} 112c8-6 18 6 26 0l2 8c-8 6-18-6-26 0z`, '#FAFAFA', 2))
      + P('M84 112c0-16 16-24 22-24s22 8 22 24c-8 6-36 6-44 0z', '#E64A19') + ring(6, (k) => C(92 + k * 6, 102 + (k % 2) * 4, 2.5, '#BF360C', 0)) + face(106, 160, 0.42)
      + g(206, 96, 1, E(0, 0, 28, 12, '#FFFFFF') + ring(5, (k) => P(`M${-18 + k * 9} 0c-4-10 2-16 6-16 2 8 0 14-6 16z`, '#7CB342', 2)))),
  L('la/luangprabang/landmark-lpsalad.v1.svg', 'สลัดหลวงพระบาง ผักน้ำกับน้ำสลัดไข่', 'Luang Prabang salad with watercress and egg dressing', ['luang prabang salad', 'สลัดหลวงพระบาง', 'watercress', 'ผักน้ำ', 'watercress salad', 'ยำผักน้ำ', 'egg dressing', 'น้ำสลัดไข่', 'lao salad', 'สลัดลาว'], 'หาไข่ต้มที่ผ่าครึ่งวางบนผัก', 'Find the halved boiled egg on top of the greens',
    // a plate heaped with fresh green watercress, slices of tomato and cucumber, halved boiled eggs, a creamy yellow dressing poured over and crunchy peanuts sprinkled on top
    E(120, 160, 100, 40, '#FFFFFF') + E(120, 156, 86, 32, '#E3F2FD', 2.5)
      + ring(12, (k) => P(`M${48 + (k % 6) * 26} ${150 - Math.floor(k / 6) * 22}c-6-12 4-20 12-18 4 8-2 16-12 18z`, k % 2 ? '#43A047' : '#66BB6A', 2))
      + ring(3, (k) => g(80 + k * 40, 150 + (k % 2) * 6, 1, C(0, 0, 9, '#E53935', 2) + C(0, 0, 4, '#FFCDD2', 0)))
      + [[100, 124], [148, 128]].map(([x, y]) => E(x, y, 14, 10, '#FFFFFF') + C(x, y, 6, '#FFB300', 0)).join('')
      + Lc('M70 136c20 10 40-6 60 4s40-6 50 4', '#FFE082', 5) + ring(6, (k) => E(78 + k * 16, 168, 3, 2, '#C8A16B', 1.5)) + face(120, 180, 0.32)),
  { id: 'la-luangprabang.day.peninsula', cat: 'day', file: 'la/luangprabang/day-peninsula.v1.svg', name: nm('จุดบรรจบแม่น้ำคานกับแม่น้ำโขง', 'Where the Nam Khan meets the Mekong'), kw: ['nam khan', 'น้ำคาน', 'mekong confluence', 'จุดบรรจบแม่น้ำโขง', 'old town peninsula', 'คาบสมุทรเมืองเก่า', 'two rivers', 'สองแม่น้ำ', 'luang prabang', 'หลวงพระบาง', 'riverside walk'],
    // a green tongue of land between a wide brown river and a narrower green one, palm trees and low sweeping temple roofs among the trees, a long-tail boat on each river
    svg: scene('llp-d2', '#E1F5FE', P('M0 60c60-20 160-20 240 0v20H0z', '#7CB342') + R(0, 80, 240, 160, '#BF9B73') + P('M150 80c20 40 60 70 90 90v70H150c10-60-10-110 0-160z', '#4DB6AC')
      + P('M60 240c20-60 60-120 100-160 10 40-10 100 0 160z', '#8BC34A') + ring(4, (k) => P(`M${96 + k * 16} ${150 + k * 20}l14-10 14 10z`, '#C62828', 2) + R(98 + k * 16, 150 + k * 20, 24, 10, '#FFF8E1', 0, 2))
      + ring(3, (k) => Lc(`M${110 + k * 14} ${120 + k * 30}v-26`, '#6D4C41', 3) + C(110 + k * 14, 94 + k * 30, 9, '#43A047', 2))
      + g(60, 140, 1, P('M-30 0h60l-10 8h-40z', '#8D5524') + R(-10, -10, 20, 10, '#FFB300', 2, 2)) + g(200, 190, 1, P('M-24 0h48l-8 8h-32z', '#5D4037')) + Lc('M30 180h40M190 140h30', '#E0C3A0', 3) + face(130, 200, 0.26)) },
  L('la/luangprabang/landmark-khaokhiap.v1.svg', 'ข้าวเกรียบตากแดดบนแผงไม้ไผ่', 'Rice crackers drying in the sun on bamboo racks', ['rice crackers', 'ข้าวเกรียบ', 'khao khiap', 'ข้าวเกรียบตากแดด', 'bamboo racks', 'แผงไม้ไผ่', 'sun drying', 'ตากแดด', 'old town lane', 'ตรอกเมืองเก่า', 'crispy snack'], 'หาแผ่นข้าวเกรียบกลมๆ ที่เรียงอยู่บนแผงไม้ไผ่', 'Find the round crackers laid out on the bamboo racks',
    // tilted woven bamboo racks propped up in a sunny lane, covered in rows of round white rice crackers drying, some with sesame and some pink, a big sun overhead
    sky('#FFF8E1') + C(200, 40, 22, '#FFD54F', 2.5) + R(-4, 200, 248, 44, '#D7CCC8', 0, 0)
      + [[70, 150, -8], [170, 160, 8]].map(([x, y, r]) => g(x, y, 1, R(-60, -40, 120, 80, '#E6C27A', 4) + ring(5, (k) => Lc(`M-60 ${-32 + k * 16}h120`, '#C8A16B', 1.5)) + ring(5, (k) => Lc(`M${-48 + k * 24} -40v80`, '#C8A16B', 1.5))
        + ring(6, (k) => C(-40 + (k % 3) * 40, -18 + Math.floor(k / 3) * 36, 14, k % 3 === 1 ? '#F8BBD0' : '#FFFFFF', 2) + (k % 3 === 2 ? ring(3, (j) => C(-44 + (k % 3) * 40 + j * 4, -20 + Math.floor(k / 3) * 36, 1.2, '#22213A', 0)) : '')) + Lc('M-50 40l-6 30M50 40l6 30', '#8D6E63', 4), r)).join('')
      + face(70, 150, 0.22)),
  L('la/luangprabang/landmark-frenchvilla.v1.svg', 'บ้านลาว-ฝรั่งเศสหน้าต่างบานเกล็ดในเมืองเก่า', 'A Lao-French house with wooden shutters in the old town', ['lao-french house', 'บ้านลาว-ฝรั่งเศส', 'colonial villa', 'บ้านสมัยอาณานิคม', 'wooden shutters', 'หน้าต่างบานเกล็ด', 'sakkaline road', 'ถนนสักกะลิน', 'old town houses', 'บ้านในเมืองเก่า'], 'หาหน้าต่างบานเกล็ดไม้สีฟ้าที่เปิดอยู่', 'Find the blue wooden shutters folded open',
    // a two-storey white house with a terracotta roof, upstairs a wooden balcony with turned posts, tall windows with blue louvred shutters folded open, bougainvillea spilling over a low wall
    sky('#E3F2FD') + R(-4, 206, 248, 38, '#D7CCC8', 0, 0)
      + R(30, 90, 180, 116, '#FFFFFF') + P('M18 94l102-50 102 50z', '#C1583F') + Lc('M40 82l80-38 80 38', '#A0472F', 3)
      + R(30, 140, 180, 10, '#8D6E63', 0, 2.5) + ring(10, (k) => Lc(`M${38 + k * 18} 126v14`, '#8D6E63', 3)) + Lc('M30 126h180', '#8D6E63', 3)
      + ring(3, (k) => { const x = 50 + k * 60; return R(x, 96, 20, 30, '#5D4037', 0, 2) + R(x - 12, 96, 12, 30, '#4FC3F7', 0, 2) + R(x + 20, 96, 12, 30, '#4FC3F7', 0, 2) + ring(3, (j) => Lc(`M${x - 10} ${102 + j * 8}h8M${x + 22} ${102 + j * 8}h8`, '#0288D1', 1.5)); })
      + ring(3, (k) => { const x = 50 + k * 60; return R(x, 158, 20, 40, '#5D4037', 0, 2) + R(x - 12, 158, 12, 40, '#4FC3F7', 0, 2) + R(x + 20, 158, 12, 40, '#4FC3F7', 0, 2); })
      + R(-4, 192, 70, 16, '#FFF8E1', 0, 2.5) + ring(6, (k) => C(6 + k * 11, 186 - (k % 2) * 8, 7, '#EC407A', 1.5)) + face(120, 70, 0.3)),

  // ---------- Cambodia (the country)
  K('kh.food.baisachchrouk', 'บายซัจจรูก ข้าวหมูย่างอาหารเช้าของกัมพูชา', 'Bai sach chrouk, Cambodia\'s grilled pork and rice breakfast', ['bai sach chrouk', 'บายซัจจรูก', 'pork and rice', 'ข้าวหมูย่าง', 'khmer breakfast', 'อาหารเช้าเขมร', 'pickled vegetables', 'ผักดอง', 'coconut grilled pork', 'หมูย่างกะทิ'],
    // a plate of broken white rice with thin slices of glossy grilled pork fanned on top, a little heap of pickled cucumber and carrot, a fried egg-free bowl of clear soup with spring onion beside it
    E(100, 156, 90, 40, '#FFFFFF') + E(100, 152, 78, 32, '#E3F2FD', 2.5) + P('M40 156c0-30 30-48 60-48s60 18 60 48z', '#FFFFFF', 3)
      + ring(5, (k) => g(70 + k * 15, 124 + (k % 2) * 4, 1, P('M-12-6c8-6 20-4 24 2l-4 14c-6-4-14-6-22-4z', '#A0522D', 2) + Lc('M-6 0l12 2', '#D2691E', 1.5), -10 + k * 5))
      + ring(5, (k) => R(56 + k * 10, 168, 7, 7, k % 2 ? '#FF8A65' : '#C5E1A5', 1, 1.5)) + face(100, 168, 0.32)
      + g(194, 104, 1, P('M-26-10h52c0 20-12 30-26 30s-26-10-26-30z', '#FFFFFF') + E(0, -10, 26, 7, '#FFF3D6') + ring(4, (k) => C(-12 + k * 8, -10, 2.5, '#7CB342', 0)))),
  K('kh.culture.roneat', 'โรเนียตเอก ระนาดไม้รูปเรือของเขมร', 'The roneat, the boat-shaped Khmer xylophone', ['roneat', 'โรเนียต', 'roneat ek', 'โรเนียตเอก', 'khmer xylophone', 'ระนาดเขมร', 'pinpeat', 'วงพินพาทย์', 'boat-shaped xylophone', 'ระนาดรางรูปเรือ', 'khmer music'],
    // a curved wooden trough shaped like a boat standing on a little foot, a long row of wooden bars hanging across it on cords, two padded beaters and music notes
    g(120, 150, 1, P('M-100-30c20 30 60 46 100 46s80-16 100-46l-6 26c-20 30-54 42-94 42s-74-12-94-42z', '#8D5524') + Lc('M-96-30c20 26 58 42 96 42s76-16 96-42', '#A1673F', 3)
      + R(-16, 30, 32, 26, '#6D4C41', 4) + R(-34, 52, 68, 10, '#5D4037', 3)
      + ring(14, (k) => R(-91 + k * 13, -36 + Math.abs(k - 6.5) * -0.5, 11, 22 - Math.abs(k - 6.5) * 0.6, '#E6C27A', 2, 2)) + Lc('M-96-30h192', '#3E2723', 1.5) + face(0, 10, 0.4))
      + [[70, 66, -30], [170, 62, 30]].map(([x, y, r]) => g(x, y, 1, Lc('M0 0v40', '#5D4037', 4) + E(0, -4, 9, 7, '#FFFFFF', 2.5), r)).join('')
      + [[30, 50], [210, 44]].map(([x, y]) => C(x, y, 6, '#5C6BC0', 2) + Lc(`M${x + 5} ${y}v-18l10 5`, '#5C6BC0', 3)).join('')),
  K('kh.culture.moonlightpavilion', 'พลับพลาจันทฉายาในพระราชวังพนมเปญ', 'The Moonlight Pavilion of the Royal Palace in Phnom Penh', ['moonlight pavilion', 'พลับพลาจันทฉายา', 'chanchhaya', 'จันทฉายา', 'royal palace phnom penh', 'พระราชวังพนมเปญ', 'phnom penh', 'พนมเปญ', 'khmer roofs', 'หลังคาทรงเขมร'],
    // an open-sided pavilion on a high cream terrace, yellow-and-orange tiered roofs with tall curling finials, a golden spire on top, a lawn and frangipani-free palms in front
    sky('#E1F5FE') + R(-4, 200, 248, 44, '#81C784', 0, 0) + palm(20, 204, 70, 1) + palm(222, 204, 66, -1)
      + R(30, 150, 180, 50, '#FFF3E0') + ring(8, (k) => R(40 + k * 21, 160, 12, 30, '#FFE0B2', 2, 2)) + R(30, 144, 180, 8, '#E6C27A', 0, 2.5)
      + ring(6, (k) => Lc(`M${52 + k * 27} 144v-34`, '#FFF3E0', 6)) + P('M30 112l20-20h140l20 20z', '#FFB300') + P('M50 92l20-20h100l20 20z', '#FF8F00') + P('M70 72l20-20h60l20 20z', '#FFB300')
      + Lc('M30 112l-10-12M210 112l10-12M50 92l-8-10M190 92l8-10', '#FFD54F', 4) + P('M114 52l6-36 6 36z', '#FFD54F', 2.5) + face(120, 168, 0.3)),
  K('kh.food.sankyalapov', 'สังขยาฟักทองแบบเขมร (ซังเกียละเปา)', 'Sankya lapov, Khmer custard baked in a pumpkin', ['sankya lapov', 'ซังเกียละเปา', 'pumpkin custard', 'สังขยาฟักทอง', 'khmer dessert', 'ขนมหวานเขมร', 'coconut custard', 'คัสตาร์ดกะทิ', 'palm sugar custard', 'สังขยาน้ำตาลโตนด'],
    // a round green-skinned pumpkin with its lid set aside, filled with set golden custard, a thick slice cut out showing the orange flesh and the creamy custard layer inside
    g(96, 140, 1, P('M-70 0c0-40 30-60 70-60s70 20 70 60-30 60-70 60-70-20-70-60z', '#558B2F') + ring(4, (k) => Lc(`M${-46 + k * 30} -50c-8 30-8 70 0 104`, '#33691E', 3)) + E(0, -38, 50, 14, '#FFB300') + E(0, -38, 42, 10, '#FFE082', 0) + face(0, 10, 0.44))
      + g(184, 188, 1, P('M-40 20L0-30 40 20z', '#FF9800') + P('M-28 6L0-28 28 6z', '#FFE082', 2) + P('M-40 20h80', 'none') + Lc('M-40 20h80', '#558B2F', 6))
      + g(96, 76, 1, E(0, 0, 24, 8, '#558B2F') + Lc('M0-6v-12', '#6D4C41', 4))),

  // ---------- Siem Reap
  L('kh/siemreap/landmark-bakong.v1.svg', 'ปราสาทบากองแห่งกลุ่มโรลัวส์', 'Bakong, the stepped temple pyramid of Roluos', ['bakong', 'บากอง', 'roluos', 'โรลัวส์', 'roluos group', 'กลุ่มปราสาทโรลัวส์', 'temple pyramid', 'ปราสาททรงพีระมิด', 'hariharalaya', 'หริหราลัย'], 'หาบันไดที่ไต่ขึ้นตรงกลางทั้งห้าชั้น', 'Find the staircase climbing up the middle of all five levels',
    // a wide five-level sandstone pyramid with a steep staircase up the middle and a single lotus-bud tower on top, small red-brick towers around its base and a moat in front (the building only)
    sky('#FFF3E0') + R(-4, 212, 248, 32, '#4DB6AC', 0, 0)
      + ring(5, (k) => R(20 + k * 18, 186 - k * 24, 200 - k * 36, 26, ['#BCAAA4', '#C3B091', '#BCAAA4', '#C3B091', '#BCAAA4'][k], 2, 2.5))
      + P('M110 210l4-120h12l4 120z', '#A1887F') + ring(7, (k) => Lc(`M${111 + k * 0.4} ${200 - k * 16}h${18 - k * 0.8}`, '#8D6E63', 2))
      + P('M104 64c0-30 8-46 16-56 8 10 16 26 16 56z', '#C3B091') + ring(4, (k) => Lc(`M${106 + k} ${56 - k * 10}h${28 - k * 2}`, '#A1887F', 2)) + R(102, 62, 36, 10, '#A1887F', 0, 2.5)
      + [[14, 196], [226, 196]].map(([x, y]) => R(x - 10, y - 30, 20, 30, '#C1583F') + P(`M${x - 10} ${y - 30}c0-14 20-14 20 0z`, '#C1583F', 2.5)).join('') + face(120, 170, 0.34)),
  L('kh/siemreap/landmark-preahkhan.v1.svg', 'อาคารสองชั้นเสากลมในปราสาทพระขรรค์', 'The two-storey pillared hall of Preah Khan', ['preah khan', 'พระขรรค์', 'prasat preah khan', 'ปราสาทพระขรรค์', 'two-storey building', 'อาคารสองชั้น', 'round columns', 'เสากลม', 'jungle temple', 'ปราสาทกลางป่า'], 'หาเสากลมใหญ่ที่ค้ำชั้นบนไว้', 'Find the fat round columns holding up the top floor',
    // a sandstone building with two storeys: thick round columns on the ground floor and a row of square openings above, crumbled edges, a huge tree with pale roots draped over the side wall
    sky('#F1F8E9') + R(-4, 206, 248, 38, '#A1887F', 0, 0)
      + R(40, 96, 160, 110, '#C3B091') + ring(5, (k) => R(52 + k * 32, 150, 18, 56, '#BCAAA4', 9, 2.5)) + R(40, 136, 160, 14, '#A1887F', 0, 2.5)
      + ring(5, (k) => R(52 + k * 32, 106, 18, 22, '#5D4037', 0, 2)) + P('M40 96l10-14 20 6 30-8 40 6 30-6 30 8v8z', '#BCAAA4')
      + Lc('M226 20c-20 30-30 60-24 100s-30 60-40 86M214 40c-14 20-30 30-40 60M206 150c10 20 16 40 20 56', '#E6D3B3', 7) + C(220, 20, 30, '#558B2F', 2.5)
      + face(110, 168, 0.3)),
  L('kh/siemreap/landmark-kulenlychee.v1.svg', 'ลิ้นจี่แห่งเขาพนมกุเลน', 'The lychees of Phnom Kulen', ['kulen lychee', 'ลิ้นจี่กุเลน', 'phnom kulen', 'พนมกุเลน', 'lychee', 'ลิ้นจี่', 'kulen mountain', 'ภูเขากุเลน', 'lychee season', 'ฤดูลิ้นจี่'], 'หาลิ้นจี่ที่ปอกเปลือกแล้วเห็นเนื้อสีขาว', 'Find the peeled lychee showing its white flesh',
    // a leafy branch hanging heavy with bunches of bumpy red lychees, a flat-topped mountain in the distance, a bamboo basket of lychees and one peeled to its shiny white fruit
    sky('#E8F5E9') + P('M-4 110c40-10 50-30 100-30s80 20 148 26v30H-4z', '#689F38') + R(-4, 136, 248, 108, '#AED581', 0, 0)
      + Lc('M-4 30c60 10 120 0 200 20', '#6D4C41', 6) + ring(5, (k) => P(`M${20 + k * 40} ${30 + k * 3}c-14-10-10-24 4-24 8 8 6 18-4 24z`, '#43A047', 2))
      + [[60, 70], [140, 74]].map(([x, y]) => Lc(`M${x} ${y - 34}v14`, '#6D4C41', 3) + ring(6, (k) => C(x - 14 + (k % 3) * 14, y - 12 + Math.floor(k / 3) * 14, 9, '#E53935', 2) + C(x - 16 + (k % 3) * 14, y - 14 + Math.floor(k / 3) * 14, 1.8, '#B71C1C', 0))).join('')
      + g(90, 196, 1, P('M-40-16h80l-8 34h-64z', '#D7A86E') + Lc('M-34-4h68M-30 8h60', '#B07A3E', 2) + ring(5, (k) => C(-28 + k * 14, -20, 9, '#E53935', 2)))
      + g(176, 196, 1, C(0, 0, 18, '#FAFAFA') + E(-4, -6, 6, 4, '#FFFFFF', 0) + P('M12 10c8 6 14 4 16-4-6-2-12-2-16 4z', '#E53935', 2) + face(0, 2, 0.26))),
  L('kh/siemreap/landmark-spean.v1.svg', 'สะพานศิลาแลงโบราณสเปียนประปตอส', 'Spean Praptos, the ancient stone bridge of Kampong Kdei', ['spean praptos', 'สเปียนประปตอส', 'kampong kdei bridge', 'สะพานกำปงกเด', 'ancient bridge', 'สะพานโบราณ', 'laterite bridge', 'สะพานศิลาแลง', 'old royal road', 'ถนนหลวงโบราณ'], 'หาช่องโค้งแคบๆ หลายช่องใต้สะพาน', 'Find the many narrow pointed arches under the bridge',
    // a long, very old bridge of rusty-orange laterite blocks with a row of many tall narrow pointed arches, a slow river underneath, grass and palms on the banks
    sky('#FFF8E1') + R(-4, 160, 248, 84, '#8D6E63', 0, 0) + Lc('M20 200h40M150 214h50', '#A1887F', 3) + palm(14, 100, 60, 1) + palm(226, 100, 56, -1)
      + R(-4, 92, 248, 76, '#D9814F') + ring(11, (k) => ring(3, (j) => Lc(`M${-4 + k * 23} ${100 + j * 22}h22`, '#B8653A', 1.5)))
      + ring(10, (k) => P(`M${6 + k * 23.5} 168v-30l7-20 7 20v30z`, '#3E2723', 2.5))
      + R(-4, 86, 248, 10, '#B8653A', 0, 2.5) + face(120, 104, 0.24)),
  L('kh/siemreap/landmark-khmerhouse.v1.svg', 'บ้านไม้ใต้ถุนสูงแบบเขมร', 'A Khmer wooden house on stilts', ['khmer house', 'บ้านเขมร', 'wooden stilt house', 'บ้านไม้ใต้ถุนสูง', 'countryside house', 'บ้านชนบท', 'gable roof', 'หลังคาจั่ว', 'village life', 'ชีวิตในหมู่บ้าน'], 'หาบันไดไม้ที่พาดขึ้นไปที่ประตูบ้าน', 'Find the wooden ladder leading up to the door',
    // a dark wooden house raised high on tall posts with a steep gable roof of red tiles and carved gable boards, a ladder to the door, a water jar and a hammock-free cart under the house, palms and rice field
    sky('#E1F5FE') + R(-4, 196, 248, 48, '#AED581', 0, 0) + palm(220, 196, 100, -1)
      + ring(5, (k) => Lc(`M${40 + k * 36} 120v80`, '#5D4037', 6)) + R(30, 74, 164, 50, '#8D5524') + ring(8, (k) => Lc(`M${38 + k * 20} 80v40`, '#6D4C41', 2))
      + P('M20 78l92-56 92 56z', '#C1583F') + P('M60 78l52-32 52 32z', '#D7A86E', 2.5) + Lc('M112 22v-10', '#5D4037', 3)
      + R(70, 88, 24, 36, '#3E2723', 0, 2.5) + R(130, 88, 30, 20, '#81D4FA', 2, 2.5) + Lc('M60 200l18-76M80 200l18-76M64 184h18M68 166h18M72 148h18M76 132h18', '#A1673F', 3)
      + g(150, 186, 1, P('M-14-14h28c4 10 4 22-14 28-18-6-18-18-14-28z', '#BF6B4E')) + face(112, 60, 0.26)),
  L('kh/siemreap/landmark-angkormuseum.v1.svg', 'พิพิธภัณฑ์แห่งชาติอังกอร์', 'The Angkor National Museum', ['angkor national museum', 'พิพิธภัณฑ์แห่งชาติอังกอร์', 'angkor museum', 'พิพิธภัณฑ์อังกอร์', 'charles de gaulle avenue', 'ถนนชาร์ลเดอโกล', 'khmer history', 'ประวัติศาสตร์เขมร', 'museum galleries', 'ห้องจัดแสดง'], 'หาสระน้ำยาวที่สะท้อนหลังคาของตึก', 'Find the long pool reflecting the building\'s roofs',
    // a long low cream building with layered Khmer-style roofs in grey and gold trim, a row of square pillars at the front, a long reflecting pool and neat trimmed bushes
    sky('#E3F2FD') + R(-4, 176, 248, 68, '#A5D6A7', 0, 0) + R(30, 196, 180, 24, '#4FC3F7', 4, 2.5) + Lc('M50 208h40M140 208h40', '#B3E5FC', 3)
      + R(20, 116, 200, 60, '#FFF3E0') + ring(9, (k) => R(28 + k * 22, 130, 10, 46, '#FFE0B2', 0, 2))
      + P('M10 120l20-22h180l20 22z', '#78909C') + P('M60 98l16-18h88l16 18z', '#90A4AE') + Lc('M10 120h220M60 98h120', '#FFD54F', 3) + P('M104 80l16-18 16 18z', '#78909C', 2.5)
      + ring(6, (k) => E(30 + k * 36, 186, 10, 7, '#43A047', 2)) + face(120, 150, 0.3)),

  // ---------- The Philippines (the country)
  K('ph.food.sorbetes', 'ซอร์เบเตส ไอศกรีมรถเข็นหลากสีของฟิลิปปินส์', 'Sorbetes, the Philippines\' painted ice-cream cart', ['sorbetes', 'ซอร์เบเตส', 'dirty ice cream', 'ไอศกรีมรถเข็น', 'ice cream cart', 'รถเข็นไอศกรีม', 'sorbetero', 'ซอร์เบเตโร', 'ice cream in a bun', 'ไอศกรีมใส่ขนมปัง'],
    // a wooden pushcart painted with bright stripes and three round metal lids for three flavours, a little bell, and a scoop of purple, yellow and brown ice cream in a small bread bun
    g(110, 150, 1, R(-70, -40, 140, 70, '#FFEB3B', 8) + ring(3, (k) => Lc(`M-70 ${-24 + k * 16}h140`, ['#E53935', '#1E88E5', '#43A047'][k], 5)) + ring(3, (k) => E(-40 + k * 40, -46, 18, 7, '#CFD8DC', 2.5) + C(-40 + k * 40, -52, 4, '#90A4AE', 2))
      + C(-46, 40, 14, '#5D4037', 3) + C(46, 40, 14, '#5D4037', 3) + Lc('M70-20l30-20', '#8D6E63', 6) + face(0, 0, 0.4) + g(-80, -20, 1, P('M-8 0h16l-8-14z', '#FFD54F', 2) + C(0, 2, 3, '#FFD54F', 1.5)))
      + g(196, 80, 1, P('M-22 10c0-14 44-14 44 0v8c0 6-44 6-44 0z', '#E8A94E') + C(-10, -2, 10, '#9575CD', 2) + C(10, -2, 10, '#FFE082', 2) + C(0, -14, 10, '#8D5524', 2))),
  K('ph.food.bananacue', 'บานาน่าคิว กล้วยเคลือบน้ำตาลเสียบไม้', 'Banana cue, caramelised bananas on a stick', ['banana cue', 'บานาน่าคิว', 'saba banana', 'กล้วยซาบา', 'caramelised banana', 'กล้วยเคลือบคาราเมล', 'street snack', 'ของว่างข้างทาง', 'merienda', 'เมริเอนดา'],
    // two plump saba bananas coated in shiny brown caramel on a long bamboo skewer, a pan of bubbling sugar and oil behind with more bananas, sparkles of glaze
    g(160, 80, 1, P('M-60-10h120v30c0 10-20 14-60 14s-60-4-60-14z', '#455A64') + E(0, -10, 60, 12, '#C27F2A') + ring(3, (k) => E(-30 + k * 30, -12, 12, 5, '#8D5524', 2)) + Lc('M60-4h30', '#5D4037', 6))
      + Lc('M70 230l40-170', '#D7A86E', 5)
      + [[96, 120], [86, 168]].map(([x, y]) => g(x, y, 1, P('M-14-24c10-6 22 4 22 24s-12 30-22 24c-6-4-6-44 0-48z', '#B5651D') + E(2, -10, 4, 9, '#E0A44A', 0) + face(-2, 0, 0.26), -14)).join('')
      + ring(4, (k) => P(`M${130 + k * 12} ${140 + (k % 2) * 20}l3-6 3 6-3 6z`, '#FFE082', 1.5))),
  K('ph.animal.cloudrat', 'หนูเมฆแห่งลูซอน หนูต้นไม้หางพวง', 'The cloud rat of Luzon, a fluffy tree-top rodent', ['cloud rat', 'หนูเมฆ', 'luzon cloud rat', 'หนูเมฆลูซอน', 'bushy tail', 'หางพวง', 'philippine wildlife', 'สัตว์ป่าฟิลิปปินส์', 'tree-top animal', 'สัตว์บนยอดไม้'],
    // a round fluffy dark-grey and white animal with small ears, a pink nose and an enormous bushy tail curling up behind it, sitting on a mossy branch among leaves
    Lc('M-4 190c60-20 140-10 248-30', '#6D4C41', 12) + ring(4, (k) => P(`M${20 + k * 60} ${186 - k * 6}c-16-10-12-26 6-24 8 10 4 20-6 24z`, '#43A047', 2))
      + g(110, 140, 1, P('M30 20c40 0 60-30 50-60-8-26-36-30-46-10 20-4 30 10 26 26-6 20-20 30-30 44z', '#455A64') + ring(5, (k) => Lc(`M${44 + k * 6} ${-30 + k * 10}l8 2`, '#78909C', 2))
        + E(0, 10, 40, 34, '#546E7A') + E(0, 20, 24, 20, '#ECEFF1', 0) + C(-16, -26, 24, '#546E7A') + C(-34, -42, 8, '#546E7A', 2.5) + C(0, -46, 8, '#546E7A', 2.5) + C(-30, -20, 4, '#F48FB1', 1.5) + face(-16, -26, 0.36)
        + E(-20, 44, 10, 5, '#8D6E63', 2) + E(14, 44, 10, 5, '#8D6E63', 2))),
  K('ph.culture.bayanihan', 'บายานิฮัน เพื่อนบ้านช่วยกันแบกบ้านย้ายที่', 'Bayanihan, neighbours carrying a whole house together', ['bayanihan', 'บายานิฮัน', 'community spirit', 'น้ำใจชุมชน', 'carrying a house', 'แบกบ้าน', 'moving house', 'ย้ายบ้าน', 'neighbours helping', 'เพื่อนบ้านช่วยกัน'],
    // a little palm-thatched hut lifted on long bamboo poles by a row of smiling neighbours walking together across a field, the house's own face smiling too
    sky('#E3F2FD') + R(-4, 200, 248, 44, '#AED581', 0, 0)
      + g(120, 96, 1, P('M-60 0l60-44 60 44z', '#C8A16B') + R(-46, 0, 92, 50, '#E6C27A', 0, 2.5) + ring(5, (k) => Lc(`M${-40 + k * 20} 4v42`, '#C8A16B', 2)) + R(-12, 16, 24, 34, '#8D6E63', 0, 2) + face(0, -10, 0.34))
      + Lc('M20 150h200M30 162h180', '#A1673F', 6) + ring(5, (k) => kid(36 + k * 42, 196, ['#E53935', '#1E88E5', '#FFCA28', '#43A047', '#AB47BC'][k], 1.1))
      + ring(5, (k) => Lc(`M${36 + k * 42} 172v-12`, '#FFE0BD', 4))),

  // ---------- Boracay
  L('ph/boracay/landmark-pinacloth.v1.svg', 'ผ้าปิญญาใยสับปะรดของอัคลัน', 'Piña cloth, the sheer pineapple-fibre fabric of Aklan', ['pina cloth', 'piña', 'ผ้าปิญญา', 'pineapple fibre', 'ใยสับปะรด', 'aklan', 'อัคลัน', 'barong tagalog', 'บารองตากาล็อก', 'kalibo', 'คาลิโบ'], 'หาใบสับปะรดยาวๆ ที่ถูกขูดเป็นเส้นใย', 'Find the long pineapple leaf being scraped into fibres',
    // a sheer cream-coloured embroidered shirt of pineapple-leaf cloth on a hanger, a pineapple with long spiky leaves beside it, one leaf scraped into fine white threads
    Lc('M60 40h100', '#8D6E63', 5) + Lc('M110 40v-14', '#8D6E63', 3)
      + P('M70 46h80l30 30-18 16-12-12v110H70V80L58 92 40 76z', '#FFF8E1') + Lc('M110 50v130', '#E6D3B3', 2) + ring(4, (k) => P(`M${96 + (k % 2) * 28} ${70 + Math.floor(k / 2) * 34}l4-8 4 8-4 6z`, '#E6D3B3', 1.5)) + ring(3, (k) => Lc(`M84 ${120 + k * 18}h52`, '#F3E5C8', 2))
      + face(110, 110, 0.36)
      + g(196, 176, 1, E(0, 20, 22, 30, '#FFB300') + ring(6, (k) => Lc(`M${-16 + (k % 3) * 16} ${6 + Math.floor(k / 3) * 22}l8 8M${-8 + (k % 3) * 16} ${6 + Math.floor(k / 3) * 22}l-8 8`, '#E65100', 2)) + Lc('M0-8l-14-50M0-8l0-60M0-8l14-50M0-8l-30-30', '#43A047', 6))
      + Lc('M210 110c10-20 14-40 16-70', '#43A047', 6) + ring(4, (k) => Lc(`M${222 + k * 3} 40c2 20 0 50-4 76`, '#FFFFFF', 1.5))),
  L('ph/boracay/landmark-calamansi.v1.svg', 'มัฟฟินส้มคาลามันซีของโบราไกย์', 'Calamansi muffins of Boracay', ['calamansi muffin', 'มัฟฟินคาลามันซี', 'calamansi', 'คาลามันซี', 'philippine lime', 'มะนาวฟิลิปปินส์', 'calamansi juice', 'น้ำคาลามันซี', 'beach bakery', 'ร้านเบเกอรี่ริมหาด'], 'หาลูกคาลามันซีสีเขียวเล็กๆ ที่ผ่าครึ่ง', 'Find the tiny green calamansi cut in half',
    // two golden muffins with domed sugary tops drizzled with yellow glaze in paper cups, a few tiny round green calamansi, one cut to show its orange inside, a glass of juice
    [[80, 140], [140, 150]].map(([x, y]) => g(x, y, 1, P('M-26 0h52l-8 40h-36z', '#FFFFFF') + ring(4, (k) => Lc(`M${-18 + k * 12} 4l2 32`, '#E0E0E0', 2)) + P('M-32 2c0-30 64-30 64 0z', '#E8B04B') + Lc('M-20-8c8 6 14-6 22 0s14-6 18 0', '#FFF176', 4) + face(0, 18, 0.3))).join('')
      + [[40, 206], [200, 196], [64, 214]].map(([x, y]) => C(x, y, 10, '#7CB342', 2.5) + C(x - 3, y - 3, 2, '#C5E1A5', 0)).join('')
      + g(176, 214, 1, C(0, 0, 12, '#FFB300') + C(0, 0, 8, '#FFCC80', 1.5) + ring(4, (k) => Lc(`M0 0l${f1(7 * Math.cos(k * Math.PI / 2))} ${f1(7 * Math.sin(k * Math.PI / 2))}`, '#FB8C00', 1.5)))
      + g(196, 110, 1, P('M-16-30h32l-4 50h-24z', '#FFF59D') + Lc('M6-30l10-20', '#E53935', 3) + C(-10, -30, 8, '#7CB342', 2))),
  L('ph/boracay/landmark-willysrock.v1.svg', 'โขดหินวิลลีส์ร็อกหน้าหาดไวท์บีช', 'Willy\'s Rock off White Beach', ['willy\'s rock', 'วิลลีส์ร็อก', 'willys rock', 'station 1', 'สเตชั่น 1', 'rock formation', 'โขดหินกลางทะเล', 'white beach', 'ไวท์บีช', 'low tide walk', 'เดินตอนน้ำลง'], 'หาบันไดหินที่ขึ้นไปบนโขดหิน', 'Find the little stone steps going up the rock',
    // a lumpy dark volcanic rock rising from shallow turquoise water off a powdery white beach, little bushes on top and stone steps up its side, a child wading out at low tide
    sky('#E1F5FE') + R(-4, 110, 248, 100, '#4DD0E1', 0, 0) + Lc('M20 140h40M180 150h40', '#B2EBF2', 3) + P('M-4 200c60-20 180-20 248 0v44H-4z', '#FFF8E1', 0)
      + P('M70 180c-10-30 0-70 20-84 20-16 50-10 60 10 16 26 20 54 10 74z', '#5D4037') + Lc('M90 120c10 6 20 2 30 10M110 150c10 4 18 0 26 8', '#795548', 3)
      + [[96, 100], [124, 94], [146, 108]].map(([x, y]) => C(x, y, 10, '#43A047', 2)).join('') + ring(5, (k) => R(76 + k * 8, 174 - k * 12, 16, 6, '#BDBDBD', 1, 2))
      + E(120, 184, 66, 8, '#80DEEA', 0) + kid(196, 204, '#FF7043', 0.9) + face(126, 150, 0.36)),
  L('ph/boracay/landmark-nudibranch.v1.svg', 'ทากทะเลสีสดในแนวปะการังโบราไกย์', 'A bright nudibranch on Boracay\'s reef', ['nudibranch', 'ทากทะเล', 'sea slug', 'ทากทะเลสีสด', 'coral reef', 'แนวปะการัง', 'scuba diving', 'ดำน้ำลึก', 'reef creature', 'สัตว์แนวปะการัง'], 'หาพู่เหมือนดอกไม้ที่หลังทากทะเล', 'Find the flower-like frill on the sea slug\'s back',
    // a fat purple sea slug with an orange frilly edge, two little horns at the front and a feathery flower-like tuft on its back, crawling over pink and yellow coral, bubbles above
    sky('#0288D1') + ring(6, (k) => C(30 + k * 36, 30 + (k % 3) * 20, 4, '#B3E5FC', 2)) + P('M-4 190c40-20 80-10 120 0s80-20 128-6v60H-4z', '#FF8A80', 0)
      + ring(4, (k) => Lc(`M${20 + k * 60} 200c0-20 10-30 0-50M${20 + k * 60} 180l14-14`, k % 2 ? '#FFD54F' : '#F48FB1', 6))
      + g(118, 146, 1, P('M-80 10c0-24 40-34 80-34s70 10 80 30c-10 14-50 24-90 24s-70-6-70-20z', '#7E57C2') + Lc('M-80 12c30 14 120 14 150-6', '#FF9800', 5) + ring(6, (k) => C(-50 + k * 18, -6 + (k % 2) * 6, 4, '#FFD54F', 0))
        + Lc('M-70-8l-10-22M-60-12l-4-24', '#FF9800', 5) + C(-80, -32, 4, '#FF9800', 0) + C(-64, -38, 4, '#FF9800', 0)
        + ring(7, (k) => { const a = (-150 + k * 20) * Math.PI / 180; return Lc(`M50-14l${f1(22 * Math.cos(a))} ${f1(22 * Math.sin(a))}`, '#FFB74D', 4); }) + face(-40, 0, 0.4))),
  L('ph/boracay/landmark-flyboard.v1.svg', 'ฟลายบอร์ด ลอยตัวเหนือน้ำด้วยแรงพ่นน้ำ', 'Flyboarding above the sea at Boracay', ['flyboard', 'ฟลายบอร์ด', 'water jetpack', 'เจ็ตแพ็กน้ำ', 'jet water sport', 'กีฬาพ่นน้ำ', 'water sports', 'กีฬาทางน้ำ', 'hovering over water', 'ลอยเหนือน้ำ'], 'หาท่อยาวสีเหลืองที่ต่อจากเจ็ตสกีไปที่บอร์ด', 'Find the long yellow hose running from the jet ski to the board',
    // a rider in a life jacket standing on a small board lifted high above the sea by two jets of white water, a long yellow hose curving down to a jet ski bobbing below, splashes all round
    sky('#E1F5FE') + R(-4, 170, 248, 74, '#29B6F6', 0, 0) + Lc('M20 200h40M170 214h50', '#B3E5FC', 3)
      + Lc('M110 100c-6 30 0 50-4 74M130 100c6 30 0 50 4 74', '#FFFFFF', 12) + ring(5, (k) => C(96 + k * 12, 176 + (k % 2) * 4, 7, '#FFFFFF', 2))
      + R(96, 92, 48, 10, '#37474F', 4) + kid(120, 88, '#FF9800', 1.4)
      + Lc('M140 100c40 20 60 50 60 90', '#FFD54F', 6) + g(196, 196, 1, P('M-26 0h52l-6 10h-40z', '#E53935') + R(-10, -10, 20, 10, '#FFFFFF', 3, 2)) + face(120, 96, 0.16, 'none')),
  L('ph/boracay/landmark-lionfish.v1.svg', 'ปลาสิงโตกางครีบในแนวปะการัง', 'A lionfish fanning its fins on the reef', ['lionfish', 'ปลาสิงโต', 'striped fins', 'ครีบลาย', 'coral reef', 'แนวปะการัง', 'scuba diving', 'การดำน้ำ', 'yapak dive site', 'จุดดำน้ำยาปัก'], 'หาครีบยาวลายแดงขาวที่กางออกเหมือนพัด', 'Find the long red-and-white striped fins spread out like fans',
    // a striped red-and-white lionfish with long feathery fins fanned out all round it like spines, hovering over a blue reef with sea fans and bubbles
    sky('#0277BD') + ring(5, (k) => C(20 + k * 50, 20 + (k % 2) * 20, 4, '#B3E5FC', 2)) + P('M-4 200c40-20 80-6 120 0s80-16 128-4v52H-4z', '#5C6BC0', 0)
      + g(40, 200, 1, Lc('M0 0v-40M0-20l-14-14M0-24l14-12', '#FFB74D', 4)) + g(210, 204, 1, Lc('M0 0v-36M0-16l-12-12M0-20l12-10', '#F06292', 4))
      + g(120, 120, 1, ring(9, (k) => { const a = (-160 + k * 40) * Math.PI / 180; return P(`M0 0L${f1(70 * Math.cos(a))} ${f1(56 * Math.sin(a))}L${f1(60 * Math.cos(a + 0.18))} ${f1(48 * Math.sin(a + 0.18))}z`, k % 2 ? '#FFFFFF' : '#E53935', 2); })
        + E(0, 0, 40, 22, '#E53935') + ring(4, (k) => Lc(`M${-24 + k * 14} -18v36`, '#FFFFFF', 4)) + P('M38 0l20-14v28z', '#E53935', 2.5) + face(-22, -2, 0.34))),

  // ---------- Bohol and Cebu
  L('ph/bohol/landmark-osmenapeak.v1.svg', 'ยอดเขาออสเมญาและเนินแหลมหลายลูก', 'Osmeña Peak and its pointy green hills', ['osmena peak', 'osmeña peak', 'ยอดเขาออสเมญา', 'dalaguete', 'ดาลาเกเต', 'jagged hills', 'เนินแหลม', 'highest peak in cebu', 'ยอดเขาสูงสุดในเซบู', 'sunrise hike', 'เดินขึ้นดูพระอาทิตย์ขึ้น'], 'หาเด็กที่ยืนอยู่บนยอดเขาแหลมที่สูงที่สุด', 'Find the child standing on the tallest pointy peak',
    // rows of sharp, cone-shaped grassy hills one behind another under a sunrise sky, the sea glinting far off, a child with a flag-free backpack on the tallest point
    sky('#FFE0B2') + C(40, 70, 20, '#FFB74D', 2.5) + R(-4, 110, 248, 20, '#80DEEA', 0, 0)
      + ring(6, (k) => P(`M${-20 + k * 44} 170l${26} -${50 + (k % 3) * 18} ${26} ${50 + (k % 3) * 18}z`, '#7CB342', 2.5))
      + ring(5, (k) => P(`M${-30 + k * 56} 244l${30} -${70 + (k % 2) * 30} ${30} ${70 + (k % 2) * 30}z`, k === 2 ? '#558B2F' : '#689F38'))
      + kid(112, 136, '#E53935', 0.9) + face(112, 210, 0.3)),
  L('ph/bohol/landmark-sirao.v1.svg', 'สวนดอกไม้ซิเรา ทุ่งดอกหงอนไก่หลากสีบนเขาเซบู', 'The Sirao flower garden of bright celosias in the Cebu hills', ['sirao flower garden', 'สวนดอกไม้ซิเรา', 'sirao', 'ซิเรา', 'celosia', 'ดอกหงอนไก่', 'busay', 'บูไซ', 'flower farm', 'ฟาร์มดอกไม้', 'cebu hills', 'เนินเขาเซบู'], 'หาดอกไม้ที่เป็นพู่ฟูๆ เหมือนเปลวไฟ', 'Find the fluffy flowers shaped like little flames',
    // hillside rows of feathery flame-shaped celosia flowers in red, orange, yellow and pink, green hills and a little wooden hut-free lookout deck, a child taking a look
    sky('#E1F5FE') + P('M-4 100c40-30 80-30 120-10s80-20 128-10v40H-4z', '#81C784') + R(-4, 120, 248, 124, '#9CCC65', 0, 0)
      + ring(15, (k) => { const x = 18 + (k % 5) * 50, y = 150 + Math.floor(k / 5) * 34, c = ['#E53935', '#FB8C00', '#FDD835', '#EC407A', '#E53935'][k % 5]; return Lc(`M${x} ${y + 14}v-10`, '#558B2F', 3) + P(`M${x - 10} ${y + 4}c0-14 6-22 10-30 4 8 10 16 10 30z`, c, 2) + Lc(`M${x - 4} ${y}l4-14 4 14`, '#FFFFFF', 1.5); })
      + kid(196, 132, '#5C6BC0', 0.9) + face(68, 186, 0.26)),
  L('ph/bohol/landmark-templeofleah.v1.svg', 'เทมเปิลออฟลีอา อาคารเสาโรมันบนเขาเซบู', 'The Temple of Leah, a Roman-style hall in the Cebu hills', ['temple of leah', 'เทมเปิลออฟลีอา', 'busay hills', 'เนินเขาบูไซ', 'roman columns', 'เสาแบบโรมัน', 'cebu lookout', 'จุดชมวิวเซบู', 'hilltop hall', 'อาคารบนเขา'], 'หาเสาสีขาวหลายต้นที่เรียงอยู่หน้าอาคาร', 'Find the row of white columns along the front',
    // a grand white hall with a row of tall fluted columns, a triangular pediment and wide steps, standing on a green hill with the city and sea far below
    sky('#E3F2FD') + P('M-4 200c40-10 80-14 120-10s80 4 128 0v54H-4z', '#81C784') + R(-4, 210, 248, 34, '#90CAF9', 0, 0)
      + ring(5, (k) => R(28 + k * 8, 196 - k * 6, 184 - k * 16, 8, '#ECEFF1', 1, 2))
      + R(40, 80, 160, 90, '#FFFFFF') + ring(7, (k) => R(46 + k * 22, 90, 14, 76, '#F5F5F5', 2, 2.5) + Lc(`M${51 + k * 22} 94v68M${55 + k * 22} 94v68`, '#E0E0E0', 1.5))
      + R(34, 70, 172, 14, '#ECEFF1', 0, 2.5) + P('M34 70l86-38 86 38z', '#FFFFFF') + C(120, 56, 8, '#FFD54F', 2) + face(120, 128, 0.3)),
  L('ph/bohol/landmark-chicharon.v1.svg', 'ชิชารอนแห่งการ์การ์ หนังหมูพองกรอบ', 'Carcar chicharon, crispy puffed pork rinds', ['chicharon', 'ชิชารอน', 'carcar', 'การ์การ์', 'pork crackling', 'แคบหมู', 'crispy pork rind', 'หนังหมูพอง', 'vinegar dip', 'น้ำส้มสายชูจิ้ม', 'cebu pasalubong', 'ของฝากเซบู'], 'หาถ้วยน้ำส้มสายชูที่มีพริกลอยอยู่', 'Find the little cup of vinegar with chillies floating in it',
    // a paper bag spilling out puffy, bubbly golden pork crackling pieces, a little cup of vinegar dip with red chillies and onion, a few crumbs
    P('M40 70h100l10 140H30z', '#D7A86E') + Lc('M40 70l10-14h80l10 14', '#B07A3E', 3) + Lc('M50 110h80', '#E53935', 4)
      + ring(7, (k) => g(84 + (k % 4) * 28, 96 + Math.floor(k / 4) * 40 + (k % 2) * 6, 1, P('M-18 6c-4-14 8-24 20-20 12-4 22 8 14 20-6 10-28 10-34 0z', '#F2C14E') + ring(4, (j) => C(-8 + j * 6, -2 + (j % 2) * 6, 2.5, '#FFE082', 1.2)), -20 + k * 12))
      + g(190, 200, 1, P('M-24-14h48l-6 30h-36z', '#FFFFFF') + E(0, -14, 24, 6, '#FFF59D') + ring(3, (k) => E(-10 + k * 10, -14, 3, 1.6, '#E53935', 0)) + C(6, -14, 3, '#CE93D8', 0))
      + face(90, 150, 0.34)),
];

export default { places: {}, items };
