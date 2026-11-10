// Wave 8, Japan group part 3: Vietnam (Ho Chi Minh City, Phu Quoc, Đà Lạt), Laos (the country, Luang Prabang), Cambodia (the country, Siem Reap)
// Temples appear only as buildings, with no figures on them (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (vn/dalat/landmark-avocado.v1.svg → vn-dalat.landmark.avocado)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +v.toFixed(1);
const pine = (x, y, h) => Lc(`M${x} ${y}v-${h * 0.3}`, '#6D4C41', 4) + P(`M${x - h * 0.3} ${y - h * 0.25}L${x} ${y - h}L${x + h * 0.3} ${y - h * 0.25}z`, '#2E7D32');
const flower = (x, y, r, c, mid) => ring(6, (k) => { const a = k * Math.PI / 3; return E(f1(x + r * Math.cos(a)), f1(y + r * Math.sin(a)), r * 0.55, r * 0.3, c, 0); }) + C(x, y, r * 0.45, mid, 1.5);

const items = [
  // ---------- Ho Chi Minh City and the Mekong Delta
  L('vn/saigon/landmark-banhtrangtron.v1.svg', 'บั๊ญจ๋างโจ่น ยำแผ่นแป้งเวียดนามของไซง่อน', 'Bánh tráng trộn, Saigon\'s rice paper salad', ['banh trang tron', 'bánh tráng trộn', 'บั๊ญจ๋างโจ่น', 'rice paper salad', 'ยำแผ่นแป้ง', 'saigon snack', 'ขนมไซง่อน', 'quail eggs', 'ไข่นกกระทา', 'street snack'], 'หาไข่นกกระทาลูกเล็กๆ ในถุงยำ', 'Find the little quail eggs in the bag of salad',
    // a clear plastic bag tied at the top with a rubber band, stuffed with strips of rice paper, little quail eggs, green mango shreds, herbs, orange dried shrimp and chilli, chopsticks poking out
    P('M70 70c-30 40-40 120-20 140h140c20-20 10-100-20-140z', '#F1F8FF') + P('M86 70h68l-4-20h-60z', '#F1F8FF') + Lc('M90 58h60', '#E53935', 5)
      + ring(10, (k) => Lc(`M${66 + (k * 23) % 108} ${120 + (k * 17) % 70}l${k % 2 ? 22 : -18} ${k % 3 ? 10 : -8}`, '#F5E6C8', 6))
      + [[96, 150], [140, 132], [120, 186], [156, 178]].map(([x, y]) => E(x, y, 10, 8, '#FFFFFF', 2.5) + C(x, y + 1, 4, '#FFC107', 0)).join('')
      + ring(6, (k) => Lc(`M${80 + k * 16} ${170 - (k % 2) * 30}l10-4`, '#AED581', 4)) + ring(5, (k) => C(84 + k * 18, 138 + (k % 3) * 18, 3.6, '#FF7043', 1.5)) + ring(3, (k) => P(`M${100 + k * 26} 116c6-10 14-8 16 0z`, '#43A047', 2))
      + Lc('M150 40l20 90M160 36l16 90', '#D7A86E', 4) + face(120, 160, 0.44)),
  L('vn/saigon/landmark-trada.v1.svg', 'ชาเย็นริมทางบนเก้าอี้พลาสติกตัวจิ๋ว', 'Iced tea on tiny plastic stools by the street', ['tra da', 'trà đá', 'จ่าด๋า', 'iced tea', 'ชาเย็น', 'plastic stools', 'เก้าอี้พลาสติก', 'sidewalk cafe', 'ร้านริมทาง', 'street corner'], 'หาเก้าอี้พลาสติกตัวเล็กจิ๋วที่วางอยู่บนทางเท้า', 'Find the tiny plastic stools on the pavement',
    // a pavement corner under a tree trunk, a low table with glasses of pale iced tea, tiny blue and red plastic stools round it, a big plastic jug, a child sitting knees-up on one
    sky('#FFF8E1') + R(150, -4, 30, 160, '#8D6E63', 0, 3) + E(166, 10, 70, 40, '#66BB6A') + R(-4, 150, 248, 94, '#CFD8DC', 0, 0) + ring(6, (k) => Lc(`M${k * 44} 150v94`, '#B0BEC5', 2))
      + R(70, 160, 80, 10, '#FF7043', 3) + Lc('M80 170v30M140 170v30', '#E64A19', 5)
      + [[86], [110], [134]].map(([x]) => R(x - 7, 138, 14, 22, '#FFF8E1', 3, 2.5) + R(x - 7, 144, 14, 16, '#F6E7B8', 2, 0) + ring(2, (k) => R(x - 4 + k * 4, 146 + k * 4, 4, 4, '#FFFFFF', 1, 1.5))).join('')
      + [[40, 210, '#1E88E5'], [190, 214, '#E53935'], [120, 228, '#1E88E5']].map(([x, y, c]) => R(x - 16, y - 22, 32, 8, c, 3) + Lc(`M${x - 12} ${y - 14}v16M${x + 12} ${y - 14}v16`, c, 5)).join('')
      + g(186, 130, 1, R(-14, -20, 28, 40, '#E1F5FE', 6) + R(-14, -4, 28, 24, '#FFE082', 0, 0) + R(-14, -20, 28, 40, 'none', 6) + R(-6, -28, 12, 8, '#1E88E5', 2)) + kid(40, 186, '#26A69A') + face(110, 196, 0.3)),
  L('vn/saigon/landmark-cafeapartments.v1.svg', 'ตึกอพาร์ตเมนต์คาเฟ่ ถนนเหงียนเหวะ', 'The Café Apartments on Nguyễn Huệ Street', ['cafe apartments', 'ตึกคาเฟ่', 'nguyen hue', 'nguyễn huệ', 'ถนนเหงียนเหวะ', 'walking street', 'ถนนคนเดิน', 'cafe building', 'balcony cafes', 'ร้านกาแฟบนระเบียง'], 'หาระเบียงที่ทาสีไม่ซ้ำกันเลยสักห้อง', 'Find the balconies, each one painted a different colour',
    // an old nine-storey apartment block whose every little balcony is a different colourful café with plants and lights, a wide pedestrian street with a fountain jet in front
    sky('#E3F2FD') + R(-4, 210, 248, 34, '#E0E0E0', 0, 0)
      + R(50, 20, 140, 192, '#ECEFF1') + ring(8, (k) => ring(3, (j) => { const c = ['#F48FB1', '#FFD54F', '#80CBC4', '#CE93D8', '#FFAB91', '#90CAF9', '#C5E1A5'][(k * 3 + j) % 7]; return R(58 + j * 44, 26 + k * 23, 38, 18, c, 2, 2) + Lc(`M${58 + j * 44} ${40 + k * 23}h38`, '#FFFFFF', 2) + C(64 + j * 44, 38 + k * 23, 3.5, '#43A047', 1.5); }))
      + R(96, 194, 48, 18, '#5D4037', 0, 3) + Lc('M30 208q0-30 4-50M34 158q-10 20-14 50M34 158q10 20 14 50', '#81D4FA', 3) + face(120, 172, 0.34)),
  L('vn/saigon/landmark-dragonfruit.v1.svg', 'สวนแก้วมังกรในที่ราบลุ่มแม่น้ำโขง', 'A dragon fruit farm in the south', ['dragon fruit', 'แก้วมังกร', 'thanh long', 'ทันลอง', 'pitaya', 'พิทายา', 'fruit farm', 'สวนผลไม้', 'mekong orchard', 'binh thuan'], 'หาลูกแก้วมังกรสีชมพูที่ห้อยอยู่บนเสาปูน', 'Find the pink dragon fruits hanging on the concrete post',
    // a cactus vine climbing a concrete post and spilling over a ring on top, bright pink dragon fruits with green flame tips hanging from it, a cut half beside showing white flesh with black seeds
    sky('#FFF8E1') + R(-4, 196, 248, 48, '#A1887F', 0, 0)
      + R(76, 80, 20, 120, '#BDBDBD') + E(86, 78, 46, 10, '#9E9E9E')
      + ring(7, (k) => { const a = (k / 6) * Math.PI; return P(`M86 78q${f1(-60 * Math.cos(a))} -10 ${f1(-70 * Math.cos(a))} ${f1(40 + 20 * Math.sin(a))}`, 'none', 0) + Lc(`M86 78q${f1(-60 * Math.cos(a))} -10 ${f1(-70 * Math.cos(a))} ${f1(40 + 20 * Math.sin(a))}`, '#7CB342', 8); })
      + [[34, 126], [140, 132], [62, 140], [118, 118]].map(([x, y]) => E(x, y, 14, 18, '#EC407A') + P(`M${x - 14} ${y - 4}l-8-4M${x + 14} ${y - 4}l8-4M${x - 8} ${y + 12}l-6 8M${x + 8} ${y + 12}l6 8`, '#9CCC65', 3) + P(`M${x - 6} ${y - 16}l6-10 6 10`, '#9CCC65', 3)).join('')
      + g(184, 190, 1, E(0, 0, 34, 24, '#EC407A') + E(0, -2, 28, 19, '#FAFAFA', 0) + ring(16, (k) => C(-18 + (k * 11) % 36, -12 + (k * 7) % 22, 1.5, '#212121', 0)) + face(0, -2, 0.36))),
  L('vn/saigon/landmark-hutieugo.v1.svg', 'ฮู่เตี๊ยวโก่ ก๋วยเตี๋ยวเคาะไม้ของไซง่อน', 'Hủ tiếu gõ, Saigon\'s knock-knock noodle cart', ['hu tieu go', 'hủ tiếu gõ', 'ฮู่เตี๊ยวโก่', 'knocking noodles', 'ก๋วยเตี๋ยวเคาะไม้', 'noodle cart', 'รถเข็นก๋วยเตี๋ยว', 'bamboo clappers', 'ไม้เคาะ', 'night snack'], 'หาไม้ไผ่สองท่อนที่เคาะกันเสียงดังป๊อกๆ', 'Find the two bamboo sticks knocking together to call out',
    // a little glass-fronted noodle cart on bicycle wheels with a steaming pot, hanging ladles and stacked bowls, two bamboo clappers knocking with sound lines, a bowl of noodles on a stool
    R(-4, 206, 248, 38, '#9E9E9E', 0, 0) + C(56, 206, 18, '#424242', 3) + C(150, 206, 18, '#424242', 3)
      + R(30, 110, 150, 82, '#5D9CEC') + R(40, 120, 70, 50, '#E3F2FD', 2, 3) + ring(3, (k) => E(60 + k * 16, 160, 8, 4, '#FFFFFF', 2)) + R(30, 104, 150, 10, '#3F7FD8', 2)
      + P('M126 104h44v-22c0-10-44-10-44 0z', '#B0BEC5') + Lc('M136 70q-6-10 0-20M156 70q-6-10 0-20', '#ECEFF1', 4) + Lc('M60 104V82h90', '#8D6E63', 3) + Lc('M70 82v14M86 82v14', '#90A4AE', 3)
      + g(206, 92, 1, Lc('M-10-20l14 34', '#C9A15A', 8) + Lc('M14-24l-6 36', '#C9A15A', 8)) + Lc('M220 60l10-8M224 76h12M218 44l4-10', '#FF7043', 3)
      + g(206, 188, 1, R(-14, 0, 28, 6, '#E53935', 2) + Lc('M-10 6v12M10 6v12', '#E53935', 4) + P('M-16 0c0-14 32-14 32 0z', '#FFFFFF') + Lc('M-10-4q10-6 20 0', '#F5E6C8', 3)) + face(110, 140, 0.34)),

  // ---------- Phu Quoc
  L('vn/phuquoc/landmark-simfruit.v1.svg', 'ลูกซิม ผลไม้ป่าสีม่วงของฟูก๊วก', 'Sim berries, Phú Quốc\'s purple wild fruit', ['sim fruit', 'ลูกซิม', 'rose myrtle', 'โรสเมอร์เทิล', 'sim berries', 'trái sim', 'purple berries', 'ผลไม้สีม่วง', 'hill fruit', 'ผลไม้ป่า'], 'หาลูกสีม่วงที่มีมงกุฎเล็กๆ ที่ปลาย', 'Find the purple berries with a tiny crown on the end',
    // a leafy branch with pink five-petal flowers and clusters of plump dark purple berries, each with a small crown at its tip, one berry cut open showing many little seeds
    Lc('M20 200c40-40 80-70 130-90s60-40 76-70', '#6D4C41', 6) + Lc('M110 124l-20-40M170 92l20 30', '#6D4C41', 4)
      + [[60, 150, -30], [140, 96, 20], [190, 60, -40], [96, 74, 30], [200, 128, 50]].map(([x, y, r]) => g(x, y, 1, P('M0 0c10-14 34-14 40 0-10 12-30 12-40 0z', '#81C784') + Lc('M0 0h40', '#43A047', 2), r)).join('')
      + [[80, 70], [196, 120]].map(([x, y]) => ring(5, (k) => { const a = k * 72 * Math.PI / 180; return C(f1(x + 9 * Math.cos(a)), f1(y + 9 * Math.sin(a)), 7, '#F8BBD0', 2); }) + C(x, y, 4, '#FFEB3B', 0)).join('')
      + [[100, 150], [120, 160], [112, 140], [160, 132], [176, 144]].map(([x, y]) => E(x, y, 12, 15, '#5E35B1') + P(`M${x - 5} ${y - 14}l2-6 3 4 3-4 2 6`, '#4527A0', 2) + E(x - 4, y - 4, 3, 5, '#9575CD', 0)).join('')
      + g(56, 204, 1, E(0, 0, 18, 14, '#5E35B1') + E(0, 0, 13, 10, '#EDE7F6', 0) + ring(8, (k) => C(-8 + (k % 4) * 5, -3 + Math.floor(k / 4) * 6, 1.5, '#7E57C2', 0))) + face(118, 154, 0.3)),
  L('vn/phuquoc/landmark-bunquay.v1.svg', 'บุ๋นกวาย ก๋วยเตี๋ยวผสมน้ำจิ้มเองของฟูก๊วก', 'Bún quậy, Phú Quốc\'s stir-it-yourself noodles', ['bun quay', 'bún quậy', 'บุ๋นกวาย', 'stirred noodles', 'ก๋วยเตี๋ยวคนเอง', 'shrimp paste dumplings', 'ลูกชิ้นกุ้ง', 'mix your own sauce', 'ผสมน้ำจิ้มเอง', 'phu quoc noodles'], 'หาถ้วยเล็กที่ต้องคนน้ำจิ้มเอง', 'Find the little dish where you stir your own sauce',
    // a bowl of fresh white noodles with soft pink shrimp-paste dumplings and spring onion, beside it a small saucer with salt, pepper, sugar, chilli and a lime wedge being stirred with a spoon
    P('M20 120h150c0 44-32 76-75 76s-75-32-75-76z', '#FFFFFF') + E(95, 120, 75, 16, '#E1F5FE') + ring(7, (k) => Lc(`M${36 + k * 18} 120c6-8 12 4 18-4`, '#FAFAFA', 5))
      + [[66, 114], [96, 110], [126, 114]].map(([x, y]) => E(x, y, 14, 9, '#F8BBD0', 2.5) + E(x - 4, y - 3, 4, 2, '#FCE4EC', 0)).join('') + ring(5, (k) => C(60 + k * 16, 104 + (k % 2) * 4, 3, '#7CB342', 1.5))
      + g(190, 186, 1, E(0, 0, 36, 14, '#FFFFFF') + E(0, -2, 28, 9, '#FFF8E1', 0) + C(-14, -2, 5, '#FFFFFF', 1.5) + C(-2, -4, 4, '#424242', 0) + C(10, -2, 4, '#E53935', 0) + P('M14-6c6-8 18-6 18 2z', '#9CCC65', 2)
        + Lc('M-6-2c-10-30-4-50 6-70', '#B0BEC5', 5) + Lc('M-22 4q-6-6 0-12M24 4q6-6 0-12', '#90A4AE', 2.5))
      + face(95, 164, 0.44)),
  L('vn/phuquoc/landmark-seaurchin.v1.svg', 'หอยเม่นย่างหอมน้ำมันต้นหอมของฟูก๊วก', 'Grilled sea urchin with spring onion oil in Phú Quốc', ['sea urchin', 'หอยเม่น', 'nhum', 'nhum nướng', 'grilled sea urchin', 'หอยเม่นย่าง', 'spring onion oil', 'น้ำมันต้นหอม', 'seafood grill', 'ham ninh'], 'หาหนามแหลมรอบเปลือกหอยเม่นสีม่วง', 'Find the spiky spines round the purple sea urchin shell',
    // three sea urchins on a charcoal grill, cut open on top, the round purple shells bristling with spines, the golden roe topped with green spring onion oil and crushed peanuts, glowing coals below
    R(16, 160, 208, 56, '#424242', 8) + ring(6, (k) => C(40 + k * 32, 196, 9, ['#FF7043', '#FFB300'][k % 2], 2)) + ring(9, (k) => Lc(`M${24 + k * 24} 158v14`, '#9E9E9E', 3)) + Lc('M20 160h200', '#9E9E9E', 4)
      + [[60, 130], [120, 120], [180, 130]].map(([x, y]) => ring(13, (k) => { const a = Math.PI * (1.05 + k * 0.9 / 12); return Lc(`M${f1(x + 26 * Math.cos(a))} ${f1(y + 6 + 18 * Math.sin(a))}L${f1(x + 40 * Math.cos(a))} ${f1(y + 6 + 30 * Math.sin(a))}`, '#4A148C', 3); }) + E(x, y + 6, 28, 20, '#7B1FA2') + E(x, y, 20, 8, '#FFB74D', 2.5) + ring(4, (k) => C(x - 9 + k * 6, y - 1 + (k % 2) * 2, 2.5, '#7CB342', 0)) + C(x + 6, y - 2, 2, '#D7A86E', 0)).join('')
      + face(120, 132, 0.3)),
  L('vn/phuquoc/landmark-seahorse.v1.svg', 'ม้าน้ำในทุ่งหญ้าทะเลของฟูก๊วก', 'A seahorse in Phú Quốc\'s seagrass meadows', ['seahorse', 'ม้าน้ำ', 'ca ngua', 'cá ngựa', 'seagrass', 'หญ้าทะเล', 'an thoi', 'อันเทย', 'snorkelling', 'ดำน้ำตื้น'], 'หาหางม้าน้ำที่ม้วนเกาะใบหญ้าทะเลอยู่', 'Find the seahorse\'s tail curled round a blade of seagrass',
    // a little orange seahorse with a curled tail wrapped round a blade of seagrass, swaying green seagrass on the sandy floor, bubbles rising, a tiny striped fish passing
    sky('#4FC3F7') + R(-4, 200, 248, 44, '#FFE0B2', 0, 0) + ring(8, (k) => Lc(`M${14 + k * 30} 204c${k % 2 ? 10 : -10}-40 ${k % 2 ? -6 : 6}-80 ${k % 2 ? 6 : -6}-${110 - (k % 3) * 20}`, '#43A047', 7))
      + g(124, 120, 1, P('M-6-60c18-6 30 6 26 20l20 4-20 8c6 20 4 40-8 56-8 12-6 30 8 34 10 2 14-8 6-14', '#FFB74D', 4)
        + P('M-6-60c18-6 30 6 26 20 6 20 4 40-8 56-12 14-26 4-24-12 2-16 12-26 8-44-2-10-10-16-2-20z', '#FFA726') + ring(5, (k) => Lc(`M${8 - k * 2} ${-30 + k * 14}h-10`, '#EF6C00', 2.5))
        + P('M-12-54l-8-10 10 2z', '#FFA726', 2.5) + C(6, -48, 4, '#FFFFFF', 2) + C(6, -48, 2, '#212121', 0) + E(14, -38, 5, 3, '#FF8FA3', 0) + P('M-20-10q-14 0-10 14', '#FFE0B2', 3))
      + ring(5, (k) => C(160 + (k % 2) * 8, 80 - k * 16, 3 + (k % 3), '#E1F5FE', 2)) + g(52, 70, 1, E(0, 0, 14, 8, '#FFEB3B') + Lc('M-4-7v14M4-7v14', '#212121', 2.5) + P('M-14 0l-8-6v12z', '#FFEB3B', 2))),
  // ---------- Đà Lạt
  L('vn/dalat/landmark-soymilk.v1.svg', 'นมถั่วเหลืองร้อนกับปาท่องโก๋บั๊ญเตียวยามค่ำของดาลัด', 'Hot soy milk and bánh tiêu on a chilly Đà Lạt night', ['soy milk', 'นมถั่วเหลือง', 'sua dau nanh', 'sữa đậu nành', 'banh tieu', 'bánh tiêu', 'บั๊ญเตียว', 'night snack', 'ของกินยามค่ำ', 'cold night'], 'หาขนมทอดพองกลมที่โรยงาขาว', 'Find the round puffy fried bread sprinkled with sesame',
    // a tall glass of warm creamy soy milk with steam curling up on a night stall, a puffy round fried bread covered in sesame seeds beside it, a knitted woolly hat on the table, pines and stars behind
    sky('#283593') + ring(5, (k) => C(20 + k * 50, 26 + (k % 2) * 14, 2.5, '#FFF59D', 0)) + pine(30, 150, 90) + pine(210, 150, 100) + R(-4, 150, 248, 94, '#8D6E63', 0, 0)
      + P('M70 70h50l-6 110h-38z', '#FFF8E1') + P('M72 90h46l-5 90h-36z', '#F3E5C0', 0) + P('M70 70h50l-6 110h-38z', 'none') + Lc('M84 60q-8-10 0-20t0-20M104 60q-8-10 0-20t0-20', '#ECEFF1', 4)
      + g(170, 170, 1, E(0, 0, 40, 30, '#E8A33D') + E(-6, -8, 14, 8, '#F2C14E', 0) + ring(14, (k) => E(-28 + (k * 13) % 56, -18 + (k * 9) % 34, 2.5, 1.4, '#FFF8E1', 0)) + face(0, 4, 0.4))
      + g(46, 206, 1, P('M-24 10c0-30 48-30 48 0z', '#E53935') + R(-26, 6, 52, 10, '#FFFFFF', 4) + C(0, -20, 7, '#FFFFFF', 2.5) + Lc('M-12-6v14M0-10v18M12-6v14', '#C62828', 2.5)) + face(95, 130, 0.34)),
  L('vn/dalat/landmark-daquy.v1.svg', 'ดอกดาฉุ่ย ทานตะวันป่าบานเหลืองริมถนนดาลัด', 'Wild sunflowers lining the hill roads of Đà Lạt', ['wild sunflowers', 'ทานตะวันป่า', 'da quy', 'dã quỳ', 'ดาฉุ่ย', 'tithonia', 'yellow flowers', 'ดอกไม้สีเหลือง', 'november bloom', 'hill road'], 'หาดอกไม้สีเหลืองสดที่บานเรียงตามโค้งถนน', 'Find the bright yellow flowers blooming along the bend of the road',
    // a hill road curving between pine slopes, both sides crowded with big bright yellow wild-sunflower bushes, a scooter on the bend, misty hills far away
    sky('#E3F2FD') + P('M-4 100c60-30 120-30 248-10v20H-4z', '#B0BEC5', 0) + P('M-4 110c60-20 160-30 248-10v144H-4z', '#81C784')
      + pine(40, 120, 60) + pine(196, 112, 56) + pine(220, 124, 46)
      + Lc('M240 244c-80-20-160-40-100-80s40-50-20-60', '#9E9E9E', 26) + Lc('M240 244c-80-20-160-40-100-80s40-50-20-60', '#FFFFFF', 2)
      + [[30, 200], [70, 176], [40, 148], [186, 200], [210, 166], [160, 148]].map(([x, y]) => E(x, y + 12, 20, 10, '#43A047') + flower(x, y, 10, '#FFC107', '#8D6E63')).join('')
      + g(130, 140, 0.7, C(-10, 8, 6, '#424242', 2) + C(10, 8, 6, '#424242', 2) + P('M-12 4h22l-6-12h-10z', '#29B6F6', 2) + C(0, -16, 6, '#FFE0BD', 2)) + face(186, 204, 0.24)),
  L('vn/dalat/landmark-baodaipalace.v1.svg', 'พระราชวังฤดูร้อนจักรพรรดิเบ๋าได่ ดาลัด', 'Emperor Bảo Đại\'s summer palace in Đà Lạt', ['bao dai summer palace', 'พระราชวังฤดูร้อนเบ๋าได่', 'dinh bao dai', 'dinh iii', 'ดิญบาว', 'summer palace', 'พระราชวังฤดูร้อน', 'art deco villa', 'วิลล่าอาร์ตเดโค', 'palace garden'], 'หาหอคอยสี่เหลี่ยมสูงที่อยู่ข้างตัวบ้านสีครีม', 'Find the tall square tower beside the cream-coloured house',
    // a cream art-deco villa with flat roofs, long rows of windows and a tall square tower on one side, a round flower bed in front, pine trees around it
    sky('#E1F5FE') + pine(24, 160, 120) + pine(216, 150, 110) + R(-4, 180, 248, 64, '#A5D6A7', 0, 0)
      + R(40, 110, 150, 72, '#FFF3D6') + R(40, 102, 150, 10, '#E9D7B0') + R(140, 60, 40, 52, '#FFF3D6') + R(136, 54, 48, 8, '#E9D7B0')
      + ring(6, (k) => R(48 + k * 22, 124, 14, 20, '#90CAF9', 2, 2)) + ring(6, (k) => R(48 + k * 22, 152, 14, 20, '#90CAF9', 2, 2)) + ring(3, (k) => R(148 + k * 0, 70 + k * 12, 24, 8, '#90CAF9', 2, 2))
      + R(96, 158, 30, 24, '#8D6E63', 4) + E(110, 214, 50, 14, '#81C784') + ring(5, (k) => C(76 + k * 17, 212 + (k % 2) * 4, 5, ['#F06292', '#FFEB3B', '#BA68C8'][k % 3], 1.5))
      + face(160, 96, 0.3)),
  L('vn/dalat/landmark-avocado.v1.svg', 'อะโวคาโดลูกโตของดาลัด', 'Big Đà Lạt avocados', ['avocado', 'อะโวคาโด', 'bo', 'quả bơ', 'อะโวคาโดดาลัด', 'avocado farm', 'สวนอะโวคาโด', 'kem bo', 'avocado ice', 'highland fruit'], 'หาเมล็ดกลมสีน้ำตาลกลางอะโวคาโดผ่าครึ่ง', 'Find the round brown seed in the middle of the halved avocado',
    // a branch with two big dark green avocados hanging, and a halved avocado in front with creamy pale green flesh and a smiling round brown seed
    Lc('M10 30c50 10 120 0 220 20', '#6D4C41', 6) + [[40, 34, 20], [110, 34, -20], [200, 44, 30]].map(([x, y, r]) => g(x, y, 1, P('M0 0c8-16 34-16 42 0-8 14-34 14-42 0z', '#66BB6A') + Lc('M0 0h42', '#43A047', 2), r)).join('')
      + [[70, 40], [160, 46]].map(([x, y]) => Lc(`M${x} ${y}v14`, '#6D4C41', 3) + P(`M${x} ${y + 12}c-24 0-30 40-22 56 8 16 36 16 44 0 8-16 2-56-22-56z`, '#33691E')).join('')
      + [[82, 176, -10], [158, 180, 10]].map(([x, y, r], k) => g(x, y, 1, P('M0-50c-30 0-40 50-30 70 10 20 50 20 60 0 10-20 0-70-30-70z', '#558B2F') + P('M0-42c-24 0-32 42-24 58 8 16 40 16 48 0 8-16 0-58-24-58z', '#DCEDC8', 0) + P('M0-36c-18 0-26 36-18 50 6 12 30 12 36 0 8-14 0-50-18-50z', '#F0F4C3', 0)
        + (k === 0 ? C(0, 4, 18, '#8D6E63', 3) + face(0, 4, 0.36) : E(0, 4, 18, 18, '#C5E1A5', 2)), r)).join('')),
  L('vn/dalat/landmark-banhmixiumai.v1.svg', 'บั๊ญหมี่ซิวหมายจิ้มน้ำซุปลูกชิ้นของดาลัด', 'Bánh mì xíu mại, Đà Lạt\'s bread with meatball soup', ['banh mi xiu mai', 'bánh mì xíu mại', 'บั๊ญหมี่ซิวหมาย', 'meatball soup', 'ซุปลูกชิ้น', 'xiu mai', 'ซิวหมาย', 'dalat breakfast', 'อาหารเช้าดาลัด', 'dipping bread'], 'หาขนมปังที่กำลังจุ่มลงในชามซุป', 'Find the bread being dipped into the soup bowl',
    // a small bowl of tomato broth with round pork meatballs, spring onion and pepper, a crusty bread roll dipping into it, a little dish of pickles and chilli beside, morning steam
    P('M30 120h130c0 40-28 68-65 68s-65-28-65-68z', '#FFFFFF') + E(95, 120, 65, 14, '#F4A261') + E(95, 122, 56, 9, '#E76F51', 0)
      + [[72, 118], [100, 114], [124, 120]].map(([x, y]) => C(x, y, 12, '#A1665E') + C(x - 3, y - 4, 3, '#C08D79', 0)).join('') + ring(5, (k) => C(66 + k * 15, 106 + (k % 2) * 4, 2.8, '#7CB342', 1.5))
      + g(170, 106, 1, P('M-50 10c-6-20 70-46 92-30 8 10-10 26-40 36-30 10-48 6-52-6z', '#E3A857') + Lc('M-30 0l10-8M-12-8l10-8M6-16l10-6', '#C68642', 3), -20)
      + E(196, 200, 26, 10, '#FFFFFF') + ring(4, (k) => R(184 + k * 7, 194, 5, 6, ['#FFB74D', '#FFFFFF', '#E53935', '#FFB74D'][k], 1, 1.5)) + Lc('M70 96q-6-10 0-20M110 96q-6-10 0-20', '#ECEFF1', 4)
      + face(95, 160, 0.44)),

  // ---------- Laos (the country)
  K('la.food.laap', 'ลาบลาว', 'Lao laap, the minced meat salad', ['laap', 'larb', 'ลาบ', 'lao laap', 'ลาบลาว', 'minced meat salad', 'ยำเนื้อสับ', 'toasted rice powder', 'ข้าวคั่ว', 'fresh herbs'],
    // a plate heaped with minced meat salad flecked with chilli and toasted rice, mint and coriander leaves on top, a lime wedge, lettuce cups, a cucumber and long beans beside it
    E(110, 150, 96, 44, '#FFFFFF') + E(110, 146, 82, 34, '#F5F5F5', 3)
      + P('M50 150c10-40 110-44 124-4-30 20-100 20-124 4z', '#B07D62') + ring(16, (k) => C(64 + (k * 37) % 100, 128 + (k * 13) % 22, 2, k % 3 ? '#E9C46A' : '#E53935', 0))
      + ring(5, (k) => g(80 + k * 16, 122 - (k % 2) * 6, 1, P('M0 0c4-10 14-10 16 0-4 8-12 8-16 0z', k % 2 ? '#66BB6A' : '#43A047', 2), -20 + k * 10)) + P('M156 140l16-14 4 16z', '#C5E1A5', 2.5)
      + P('M24 112c-4-20 20-30 34-18-8 14-20 20-34 18z', '#AED581') + E(194, 114, 20, 9, '#81C784') + E(194, 114, 14, 6, '#E8F5E9', 0) + Lc('M150 196c20 0 40-6 60-18M156 202c20 0 44-6 62-20', '#7CB342', 4)
      + face(112, 152, 0.4)),
  K('la.food.naemkhao', 'แหนมข้าวทอด ข้าวทอดคลุกห่อผักของลาว', 'Naem khao, Lao crispy rice salad', ['naem khao', 'แหนมข้าว', 'ข้าวทอดคลุก', 'crispy rice salad', 'ยำข้าวทอด', 'fried rice balls', 'ข้าวทอดก้อน', 'lettuce wraps', 'ผักห่อ', 'vientiane'],
    // a pile of golden crispy rice crumbs mixed with pink sour sausage, peanuts and chilli on a plate, a lettuce leaf wrap in front holding a scoop with mint, one whole crispy rice ball still round
    E(110, 160, 96, 40, '#FFFFFF') + P('M40 160c4-40 130-50 144-4-30 20-110 20-144 4z', '#E8B04B')
      + ring(18, (k) => C(56 + (k * 29) % 116, 132 + (k * 11) % 28, 4, ['#F2C14E', '#D9952E', '#F4A6A6', '#C68642'][k % 4], 1.5)) + ring(4, (k) => C(80 + k * 20, 130, 2.5, '#E53935', 0))
      + C(170, 118, 20, '#E8A33D', 3) + ring(6, (k) => C(160 + (k % 3) * 9, 112 + Math.floor(k / 3) * 10, 3, '#FFD180', 0))
      + g(70, 196, 1, P('M-40 0c0-20 30-32 50-28 20 4 34 20 30 30-30 14-60 10-80-2z', '#AED581') + ring(5, (k) => C(-14 + k * 7, -10 + (k % 2) * 4, 3.5, '#E8B04B', 1.5)) + P('M-4-24c4-8 12-8 14 0-4 6-10 6-14 0z', '#43A047', 2)) + face(110, 162, 0.38)),
  K('la.culture.plainofjars', 'ทุ่งไหหินแห่งเชียงขวาง', 'The Plain of Jars in Xieng Khouang', ['plain of jars', 'ทุ่งไหหิน', 'xieng khouang', 'เชียงขวาง', 'phonsavan', 'โพนสะหวัน', 'stone jars', 'ไหหิน', 'ancient jars', 'grassy hills'],
    // big round-bellied stone jars scattered on a grassy hill, one tipped on its side, a stone lid lying nearby, a child peeping over the rim of the biggest jar
    sky('#E3F2FD') + P('M-4 120c60-30 140-40 248-10v134H-4z', '#9CCC65') + P('M-4 150c60-20 140-20 248 0v94H-4z', '#8BC34A', 0)
      + [[60, 150, 0.7], [180, 140, 0.6], [200, 196, 0.8]].map(([x, y, s]) => g(x, y, s, P('M-24-40h48c10 20 10 50 0 70h-48c-10-20-10-50 0-70z', '#BDBDBD') + E(0, -40, 24, 7, '#757575'))).join('')
      + g(40, 210, 0.7, P('M-30-24h50c10 14 10 34 0 48h-50z', '#BDBDBD', 4) + E(-30, 0, 8, 24, '#757575'), -10)
      + g(118, 196, 1, P('M-40-60h80c16 30 16 70 0 100h-80c-16-30-16-70 0-100z', '#C8C8C8') + E(0, -60, 40, 11, '#757575') + Lc('M-30-10c10 6 20 6 30 0', '#9E9E9E', 3) + face(0, -14, 0.5))
      + kid(118, 136, '#FF7043', 0.9) + E(160, 226, 22, 7, '#9E9E9E')),
  // ---------- Luang Prabang
  L('la/luangprabang/landmark-bamboobridge.v1.svg', 'สะพานไม้ไผ่ข้ามน้ำคาน', 'The bamboo bridge over the Nam Khan', ['bamboo bridge', 'สะพานไม้ไผ่', 'nam khan', 'น้ำคาน', 'dry season bridge', 'สะพานหน้าแล้ง', 'river crossing', 'ข้ามแม่น้ำ', 'woven bamboo', 'ไม้ไผ่สาน'], 'หาสะพานไม้ไผ่ที่เดินซิกแซกข้ามแม่น้ำ', 'Find the bamboo bridge zigzagging across the river',
    // a long zigzag bridge of woven bamboo on thin bamboo legs crossing a wide brown-green river, a child walking across, palm and banana trees on both banks
    sky('#FFF3E0') + P('M-4 90c40-10 80 0 110-6s90-10 138 0v40H-4z', '#66BB6A') + R(-4, 110, 248, 100, '#8DB580', 0, 0) + R(-4, 200, 248, 44, '#D7B98E', 0, 0) + Lc('M20 160q20-6 40 0M160 176q20-6 40 0', '#B2DFDB', 3)
      + Lc('M10 200l70-50 50 20 70-60 40 20', '#D7B98E', 14) + Lc('M10 200l70-50 50 20 70-60 40 20', '#C9A15A', 2)
      + [[30, 186], [56, 168], [80, 150], [104, 160], [130, 170], [160, 144], [200, 110], [226, 120]].map(([x, y]) => Lc(`M${x} ${y + 6}v30`, '#C9A15A', 3)).join('')
      + Lc('M10 190l70-50 50 20 70-60 40 20', '#A88445', 2.5) + kid(110, 156, '#26A69A', 0.8)
      + [[30, 96], [210, 92]].map(([x, y]) => Lc(`M${x} ${y}v-50`, '#6D4C41', 4) + ring(4, (k) => Lc(`M${x} ${y - 50}q${-24 + k * 16} -10 ${-28 + k * 18} 12`, '#43A047', 5))).join('') + face(130, 186, 0.3)),
  L('la/luangprabang/landmark-orlam.v1.svg', 'เอาะหลาม แกงพื้นบ้านหลวงพระบาง', 'Or lam, Luang Prabang\'s herby stew', ['or lam', 'เอาะหลาม', 'luang prabang stew', 'แกงหลวงพระบาง', 'sakhan', 'สะค้าน', 'chilli wood', 'ไม้สะค้าน', 'eggplant stew', 'มะเขือ'], 'หาท่อนไม้สะค้านที่หั่นใส่ลงไปในแกง', 'Find the slices of chilli wood stem in the stew',
    // a clay pot of thick green-brown stew with round little eggplants, long beans, dill, pieces of dried buffalo and slices of knobbly chilli-wood stem, a wooden spoon and a basket of sticky rice
    P('M24 110h150c0 50-30 90-75 90s-75-40-75-90z', '#8D5524') + E(99, 110, 75, 16, '#A1673F') + E(99, 112, 64, 11, '#7A8B3A', 0)
      + ring(4, (k) => C(66 + k * 22, 108 + (k % 2) * 4, 8, '#C5E1A5', 2.5)) + ring(4, (k) => Lc(`M${60 + k * 22} 102l12-6`, '#558B2F', 4)) + [[96, 106], [138, 110]].map(([x, y]) => R(x - 8, y - 5, 16, 10, '#5D4037', 3, 2)).join('')
      + [[80, 114], [118, 118]].map(([x, y]) => C(x, y, 6, '#A1887F', 2) + C(x, y, 2, '#6D4C41', 0)).join('')
      + Lc('M150 60l-36 54', '#C68642', 6) + E(112, 116, 8, 5, '#C68642', 2.5)
      + g(196, 180, 1, P('M-24-20h48l-6 40h-36z', '#E6C27A') + ring(4, (k) => Lc(`M-18 ${-14 + k * 9}h36`, '#C9A15A', 2)) + Lc('M-8-20v-14M8-20v-14', '#C9A15A', 3)) + face(99, 160, 0.42)),
  L('la/luangprabang/landmark-povpob.v1.svg', 'โยนลูกช่วงในงานปีใหม่ม้ง', 'Tossing the ball at Hmong New Year', ['hmong new year', 'ปีใหม่ม้ง', 'pov pob', 'ball toss', 'โยนลูกช่วง', 'hmong costume', 'ชุดม้ง', 'embroidery', 'ผ้าปัก', 'new year games'], 'หาลูกบอลผ้าที่ลอยอยู่ระหว่างเด็กสองคน', 'Find the cloth ball flying between the two children',
    // two children facing each other in black Hmong outfits with bright embroidered bands, sashes and coin trims, one with a tall wrapped hat, tossing a little cloth ball across, a grassy field with flags
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#9CCC65', 0, 0) + ring(5, (k) => P(`M${10 + k * 52} 40l20-6v12z`, ['#E53935', '#43A047', '#FFC107', '#1E88E5', '#EC407A'][k], 2)) + Lc('M0 34q120 10 240-4', '#8D6E63', 2)
      + [[64, 1, '#212121'], [176, -1, '#212121']].map(([x, d, c], k) => g(x, 200, 1, P('M-22-70h44l10 70h-64z', c) + ring(3, (j) => Lc(`M-26 ${-20 + j * 8}h52`, ['#E53935', '#FFC107', '#43A047'][j], 4)) + Lc('M-22-60h44', '#EC407A', 6)
        + ring(5, (j) => C(-16 + j * 8, -52, 2.5, '#E0E0E0', 1.5)) + C(0, -88, 16, '#FFE0BD', 3) + face(0, -86, 0.34) + Lc(`M${18 * d}-60l${16 * d}-22`, '#FFE0BD', 6)
        + (k === 0 ? P('M-16-100c0-16 32-16 32 0l-4 6h-24z', '#E53935') + Lc('M-16-104h32', '#FFC107', 3) : P('M-16-100c4-14 28-14 32 0z', '#212121')))).join('')
      + C(120, 76, 10, '#7E57C2', 3) + Lc('M126 70l10-10M114 70l-6-10', '#FFC107', 3) + Lc('M88 116q30-50 64 0', '#90A4AE', 2.5)),
  L('la/luangprabang/landmark-jeowbong.v1.svg', 'แจ่วบอง น้ำพริกหวานเผ็ดของหลวงพระบาง', 'Jeow bong, Luang Prabang\'s sweet chilli paste', ['jeow bong', 'แจ่วบอง', 'chilli paste', 'น้ำพริก', 'lao dip', 'แจ่วลาว', 'buffalo skin', 'หนังควาย', 'luang prabang souvenir', 'ของฝากหลวงพระบาง'], 'หาก้อนข้าวเหนียวที่จิ้มลงในแจ่วสีแดงเข้ม', 'Find the ball of sticky rice dipped into the dark red paste',
    // a small glass jar and an open bowl of glossy dark red chilli paste dotted with seeds and strips of buffalo skin, a pinch of sticky rice dipping in, whole dried chillies, garlic and shallots beside it
    P('M30 96h70v90c0 10-8 16-18 16H48c-10 0-18-6-18-16z', '#E1F5FE') + P('M30 120h70v66c0 10-8 16-18 16H48c-10 0-18-6-18-16z', '#8E2B1F', 0) + P('M30 96h70v90c0 10-8 16-18 16H48c-10 0-18-6-18-16z', 'none') + R(26, 82, 78, 16, '#C62828', 4)
      + P('M110 160c0 30 100 30 100 0z', '#FFFFFF') + E(160, 160, 50, 12, '#9C2A1C') + ring(10, (k) => C(124 + (k * 9) % 72, 156 + (k % 3) * 3, 1.6, '#FFC107', 0)) + ring(3, (k) => Lc(`M${136 + k * 16} 154l8 4`, '#D7A86E', 3))
      + g(170, 120, 1, E(0, 0, 18, 14, '#FFFFFF') + ring(6, (k) => E(-8 + (k % 3) * 8, -4 + Math.floor(k / 3) * 7, 4, 2.6, '#F5F5F5', 1.5)) + E(0, 14, 12, 5, '#9C2A1C', 0))
      + [[40, 216, 10], [100, 222, -10]].map(([x, y, r]) => g(x, y, 1, P('M-24 0c10-8 40-8 48 0-8 6-38 6-48 0z', '#B71C1C') + Lc('M24 0l8-4', '#43A047', 3), r)).join('')
      + C(206, 212, 10, '#FFFFFF', 2.5) + C(186, 222, 8, '#CE93D8', 2.5) + face(65, 160, 0.38)),
  L('la/luangprabang/landmark-castnet.v1.svg', 'ทอดแหในแม่น้ำโขงยามเช้า', 'Casting a fishing net on the Mekong at dawn', ['cast net', 'ทอดแห', 'fishing net', 'แหจับปลา', 'mekong fishing', 'หาปลาแม่น้ำโขง', 'fisherman', 'ชาวประมง', 'dawn', 'longtail boat'], 'หาแหวงกลมที่กางออกกลางอากาศ', 'Find the round net spreading open in the air',
    // a narrow wooden longtail boat on the wide calm river at dawn, a fisherman in a straw hat swinging a round cast net that opens into a big circle in the air, hills and a pink sky
    sky('#FFCCBC') + C(190, 70, 22, '#FFF59D', 2.5) + P('M-4 120c40-30 80-30 120-10s90-20 128 0v20H-4z', '#7E9F6E') + R(-4, 128, 248, 116, '#80A9B8', 0, 0) + Lc('M20 170h40M160 190h50M80 210h40', '#E0F2F1', 3)
      + P('M30 176h170l-20 18H44z', '#8D5524') + Lc('M200 176l20-10', '#5D4037', 3)
      + g(100, 176, 1, C(0, -46, 9, '#FFE0BD', 2.5) + P('M-14-50l14-12 14 12z', '#E6C27A', 2.5) + P('M-10-36h20l2 28h-24z', '#1E88E5', 2.5) + Lc('M8-32l22-26', '#FFE0BD', 5) + face(0, -46, 0.22))
      + E(160, 64, 54, 22, '#ECEFF1', 3) + ring(9, (k) => { const a = k * Math.PI / 4.5; return Lc(`M130 98L${f1(160 + 52 * Math.cos(a))} ${f1(64 + 20 * Math.sin(a))}`, '#90A4AE', 1.5); }) + E(160, 64, 54, 22, 'none', 3)
      + ring(10, (k) => { const a = k * Math.PI / 5; return C(f1(160 + 54 * Math.cos(a)), f1(64 + 22 * Math.sin(a)), 3, '#616161', 0); }) + face(120, 186, 0.26)),

  // ---------- Cambodia (the country)
  K('kh.food.loklak', 'ลกลัก เนื้อผัดกัมพูชากับไข่ดาว', 'Lok lak, Cambodian stir-fried beef with an egg', ['lok lak', 'ลกลัก', 'beef lok lak', 'เนื้อลกลัก', 'stir-fried beef', 'เนื้อผัด', 'fried egg', 'ไข่ดาว', 'lime pepper dip', 'น้ำจิ้มพริกไทยมะนาว'],
    // a plate with a bed of lettuce, tomato slices and onion rings, cubes of glossy stir-fried beef on top, a sunny fried egg, a small bowl of lime and black pepper dip
    E(110, 150, 98, 44, '#FFFFFF') + P('M30 150c10-30 40-40 60-30 20-16 60-16 80 0 20-4 34 14 30 30-50 20-120 20-170 0z', '#AED581')
      + ring(3, (k) => C(48 + k * 22, 160 - (k % 2) * 4, 12, '#E53935', 2.5) + C(48 + k * 22, 160 - (k % 2) * 4, 6, '#EF9A9A', 0))
      + ring(9, (k) => R(76 + (k % 3) * 18 + (Math.floor(k / 3) % 2) * 6, 124 + Math.floor(k / 3) * 12, 14, 12, '#7B3F2A', 3, 2.5))
      + g(158, 132, 1, P('M-24 0c-4-16 20-26 32-16 16-6 26 12 16 22-10 14-44 12-48-6z', '#FFFFFF') + C(0, 0, 10, '#FFB300', 2.5) + face(0, 0, 0.26))
      + C(200, 196, 20, '#FFFFFF') + C(200, 196, 14, '#E8F5E9', 0) + ring(6, (k) => C(194 + (k % 3) * 6, 192 + Math.floor(k / 3) * 6, 1.6, '#424242', 0)) + P('M206 180l14 4-10 8z', '#C5E1A5', 2)),
  K('kh.transport.norry', 'รถไฟไม้ไผ่นอร์รีแห่งพระตะบอง', 'The norry, Battambang\'s bamboo train', ['bamboo train', 'รถไฟไม้ไผ่', 'norry', 'nori', 'นอร์รี', 'battambang', 'พระตะบอง', 'rail cart', 'รถรางไม้ไผ่', 'countryside ride'],
    // a flat bamboo platform sitting on two pairs of heavy wheels on a single rail track through rice fields, a small engine with a belt at the back, kids sitting on a mat, palms behind
    sky('#E1F5FE') + R(-4, 120, 248, 124, '#AED581', 0, 0) + [[30], [206]].map(([x]) => Lc(`M${x} 120c4-20-2-40 8-60`, '#6D4C41', 4) + C(x + 8, 58, 14, '#43A047')).join('')
      + Lc('M-4 214h248M-4 196h248', '#757575', 4) + ring(9, (k) => Lc(`M${k * 30} 194v22`, '#8D6E63', 6))
      + [[70], [170]].map(([x]) => C(x, 188, 14, '#616161', 4) + C(x, 188, 5, '#9E9E9E', 0)).join('')
      + R(30, 166, 180, 12, '#D7B98E', 2) + ring(12, (k) => Lc(`M${36 + k * 15} 166v12`, '#C9A15A', 2))
      + R(170, 140, 32, 26, '#455A64', 4) + Lc('M184 166l-8 22', '#212121', 3) + R(60, 156, 80, 10, '#E57373', 3, 2.5)
      + kid(80, 152, '#FFCA28', 0.8) + kid(116, 152, '#26A69A', 0.8) + face(120, 172, 0.22)),
  K('kh.culture.chapei', 'จะเปย์ดองแวง พิณคอยาวของเขมร', 'The chapei dong veng, the Khmer long-necked lute', ['chapei', 'จะเปย์', 'chapei dong veng', 'จะเปย์ดองแวง', 'khmer lute', 'พิณเขมร', 'long-necked guitar', 'กีตาร์คอยาว', 'storytelling song', 'ดนตรีกัมพูชา'],
    // a round-bodied wooden lute with a very long thin neck that curves back at the top, two strings, tuning pegs, a little wooden bridge, music notes rising
    g(120, 130, 1, Lc('M0 60L0-96', '#8D5524', 10) + P('M-6-96c0-14 20-20 26-10', 'none') + Lc('M-4-96c-2-14 18-22 28-12', '#8D5524', 8) + Lc('M-8-80h-10M8-72h10', '#5D4037', 5)
      + C(0, 70, 42, '#C68642') + C(0, 70, 34, '#D7A86E', 0) + R(-14, 92, 28, 6, '#5D4037', 2, 2) + Lc('M-3 94V-90M3 94V-90', '#FFF8E1', 1.5) + face(0, 66, 0.44), 20)
      + [[60, 60], [190, 90], [170, 40]].map(([x, y]) => C(x, y, 7, '#AB47BC', 2) + Lc(`M${x + 6} ${y}v-24l12 6`, '#AB47BC', 3)).join('')),
  K('kh.food.kralan', 'กระลาน ข้าวหลามเผาไฟของกัมพูชา', 'Kralan, sticky rice roasted in bamboo', ['kralan', 'กระลาน', 'bamboo sticky rice', 'ข้าวหลาม', 'roasted bamboo', 'กระบอกไม้ไผ่เผา', 'coconut milk rice', 'ข้าวเหนียวกะทิ', 'black beans', 'roadside snack'],
    // bamboo tubes leaning over a long bed of glowing coals with smoke curling, one tube split and peeled open showing sticky rice studded with black beans, a stack of finished tubes beside it
    R(20, 190, 150, 24, '#5D4037', 6) + ring(6, (k) => C(34 + k * 24, 194, 8, ['#FF7043', '#FFB300'][k % 2], 2))
      + ring(5, (k) => g(36 + k * 28, 190, 1, R(-8, -92, 16, 92, '#8D6E63', 6) + Lc('M-8-60h16M-8-30h16', '#6D4C41', 2.5) + R(-8, -20, 16, 20, '#3E2723', 0, 0), 14)) + Lc('M60 80q-8-12 0-24M120 74q-8-12 0-24', '#B0BEC5', 4)
      + g(196, 170, 1, R(-14, -56, 28, 104, '#FFF8E1', 12) + ring(8, (k) => E(-6 + (k % 2) * 12, -44 + k * 12, 2.5, 3.5, '#4E342E', 0)) + P('M-14-56c-14 30-14 70 0 104', '#D7A86E', 4) + P('M14-56c14 30 14 70 0 104', '#D7A86E', 4) + face(0, 0, 0.32))),

  // ---------- Siem Reap
  L('kh/siemreap/landmark-bugs.v1.svg', 'แผงแมลงทอดกรอบในตลาดเสียมราฐ', 'A fried-insect stall in Siem Reap', ['fried insects', 'แมลงทอด', 'fried crickets', 'จิ้งหรีดทอด', 'silkworms', 'ดักแด้', 'bug snacks', 'ของทานเล่นแมลง', 'pub street', 'crunchy snack'], 'หาจิ้งหรีดทอดที่มีขายาวๆ ในถาด', 'Find the fried crickets with their long legs in the tray',
    // a round flat basket tray on a stall piled with golden fried crickets with long legs, a heap of brown silkworm pupae, chilli and lime leaves, a little paper cone ready to fill
    R(-4, 180, 248, 64, '#A1673F', 0, 0) + E(120, 160, 108, 40, '#D7B98E') + E(120, 156, 96, 32, '#C9A15A', 3) + ring(8, (k) => Lc(`M${30 + k * 26} 140l10 40`, '#B08D50', 2))
      + ring(6, (k) => g(56 + (k % 3) * 30, 140 + Math.floor(k / 3) * 22, 1, E(0, 0, 12, 6, '#B5651D') + Lc('M-4 4l-10 12M4 4l12 10M8-2l16-14', '#7A4A1A', 2) + C(12, 0, 4, '#8D5524', 2), -10 + k * 8))
      + ring(9, (k) => E(160 + (k % 3) * 14, 140 + Math.floor(k / 3) * 12, 7, 5, '#8D6E63', 2) + Lc(`M${156 + (k % 3) * 14} ${140 + Math.floor(k / 3) * 12}h8`, '#6D4C41', 1.5))
      + ring(3, (k) => P(`M${100 + k * 14} 168l6 12-12 0z`, '#E53935', 2)) + g(206, 92, 1, P('M-20-20h40l-20 50z', '#FFFFFF') + Lc('M-14-12h28', '#E57373', 3), 12) + face(70, 166, 0.28)),
  L('kh/siemreap/landmark-stonecarving.v1.svg', 'โรงแกะสลักหินทรายของช่างเขมร', 'A Khmer sandstone carving workshop', ['stone carving', 'แกะสลักหิน', 'sandstone carving', 'แกะหินทราย', 'artisans', 'ช่างฝีมือ', 'khmer crafts', 'งานฝีมือเขมร', 'carving workshop', 'chisel and mallet'], 'หาสิงโตหินที่แกะเสร็จไปครึ่งตัว', 'Find the stone lion carved only halfway out of its block',
    // a pink-grey sandstone block on a wooden stand with a little guardian lion half carved out of it, a chisel and wooden mallet resting against it, stone chips and dust round it
    R(-4, 196, 248, 48, '#D7CCC8', 0, 0) + R(50, 176, 140, 24, '#8D6E63', 4) + Lc('M60 200v24M180 200v24', '#6D4C41', 6)
      + R(60, 60, 120, 118, '#D9B7A8') + ring(5, (k) => Lc(`M64 ${80 + k * 20}h${30 - k * 3}`, '#C49A88', 2))
      + g(130, 128, 1, P('M-36 46v-40c0-30 20-50 44-50 20 0 34 14 34 34v56z', '#E8C9BA') + C(10, -20, 24, '#E8C9BA', 3) + ring(8, (k) => { const a = k * Math.PI / 4; return C(f1(10 + 22 * Math.cos(a)), f1(-20 + 22 * Math.sin(a)), 7, '#D9B7A8', 2); }) + C(10, -20, 16, '#E8C9BA', 2) + face(10, -22, 0.4) + Lc('M-20 46v-20M10 46v-16', '#C49A88', 3))
      + g(48, 160, 1, Lc('M0 0l36-30', '#B0BEC5', 5) + R(-6, -4, 14, 12, '#8D6E63', 2, 2)) + g(206, 180, 1, R(-14, -16, 28, 18, '#A1673F', 4) + Lc('M0 2v26', '#6D4C41', 6), 20)
      + ring(7, (k) => P(`M${70 + k * 18} ${210 + (k % 2) * 8}l6-6 6 6z`, '#D9B7A8', 1.5))),
  L('kh/siemreap/landmark-neakpean.v1.svg', 'ปราสาทนาคพันกลางสระกลม', 'Neak Pean, the little temple in the round pool', ['neak pean', 'นาคพัน', 'prasat neak pean', 'ปราสาทนาคพัน', 'island temple', 'ปราสาทกลางน้ำ', 'round pool', 'สระกลม', 'jayatataka', 'angkor'], 'หาปราสาทหลังเล็กบนเกาะกลมกลางสระ', 'Find the little temple on the round island in the middle of the pool',
    // a big square pool seen from above at an angle with a small round island in its centre ringed by stone steps, a little stone temple tower on the island, water lilies, trees around
    sky('#E8F5E9') + ring(5, (k) => C(20 + k * 50, 50, 26, '#43A047')) + P('M10 120l40-50h140l40 50-40 60H50z', '#BCAAA4') + P('M24 120l34-42h124l34 42-34 50H58z', '#4FC3F7')
      + ring(3, (k) => E(120, 132 - k * 4, 60 - k * 12, 22 - k * 4, ['#A1887F', '#BCAAA4', '#D7CCC8'][k])) + Lc('M60 132a60 22 0 0 0 120 0', '#8D6E63', 3)
      + g(120, 124, 1, R(-14, -10, 28, 12, '#A1887F', 0, 2.5) + P('M-12-10c0-30 6-46 12-56 6 10 12 26 12 56z', '#A1887F') + Lc('M-10-24h20M-8-38h16', '#8D6E63', 2.5) + R(-5, -8, 10, 10, '#5D4037', 0, 2))
      + [[50, 116], [190, 120], [80, 160], [168, 158]].map(([x, y]) => E(x, y, 10, 5, '#66BB6A', 2) + C(x + 3, y - 3, 3.5, '#F48FB1', 1.5)).join('') + face(120, 148, 0.3)),
  L('kh/siemreap/landmark-bakheng.v1.svg', 'ปราสาทพนมบาแค็งบนยอดเขายามเย็น', 'Phnom Bakheng, the temple on the hill at sunset', ['phnom bakheng', 'พนมบาแค็ง', 'bakheng', 'บาแค็ง', 'sunset hill', 'เนินชมพระอาทิตย์ตก', 'temple mountain', 'ปราสาทบนเขา', 'angkor sunset', 'พระอาทิตย์ตกอังกอร์'], 'หาขั้นบันไดหินชันๆ ที่ไต่ขึ้นปราสาทหลายชั้น', 'Find the steep stone steps climbing the stepped temple',
    // a stepped pyramid temple of five terraces with small towers on top, on a forested hill, steep stairs up the middle, an orange setting sun and a pink sky behind
    sky('#FFCC80') + C(190, 70, 30, '#FF7043', 0) + P('M-4 190c40-50 80-70 124-70s90 20 124 70v54H-4z', '#558B2F') + ring(6, (k) => C(14 + k * 44, 180 + (k % 2) * 10, 18, '#33691E'))
      + ring(5, (k) => R(50 + k * 14, 150 - k * 18, 140 - k * 28, 20, ['#BCAAA4', '#B0A096', '#A1887F', '#B0A096', '#BCAAA4'][k]))
      + R(110, 70, 20, 100, '#8D6E63', 0, 3) + ring(9, (k) => Lc(`M110 ${78 + k * 10}h20`, '#6D4C41', 2))
      + [[96, 70], [120, 56], [144, 70]].map(([x, y]) => P(`M${x - 9} ${y + 14}c0-18 4-28 9-36 5 8 9 18 9 36z`, '#A1887F')).join('') + face(120, 148, 0.3)
      + kid(206, 210, '#FFCA28', 0.8)),
];

export default { places: {}, items };
