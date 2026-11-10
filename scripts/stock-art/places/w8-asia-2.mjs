// Wave 8, Asia part 2: Langkawi, India (the country and Delhi, Agra and Jaipur) and Nepal (the country, Kathmandu and the Himalaya).
// No deities, Buddha images, painted eyes, prayer flags, prayer wheels or rituals: temples and stupas as buildings only, with no face on them.
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (in/golden/landmark-panchmahal.v1.svg → in-golden.landmark.panchmahal)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, transport, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
// a small domed pavilion (chhatri): four legs, a ledge and a dome
const chhatri = (x, y, s, c = '#FFF8E1') => g(x, y, s, Lc('M-8 0v-12M8 0v-12', INK, 2.5) + R(-12, -16, 24, 4, c, 0, 2) + P('M-9-16c0-12 18-12 18 0z', c, 2) + Lc('M0-26v-4', INK, 2));
// a jalebi coil: an Archimedean spiral of about three turns
const SP = 'M' + Array.from({ length: 34 }, (_, k) => { const a = k * 0.5, r = 2 + a * 1.7; return `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`; }).join('L');
const peak = (x, y, w, h) => P(`M${x - w} ${y}L${x} ${y - h}L${x + w} ${y}z`, '#90A4AE', 3) + P(`M${x - w * 0.36} ${y - h * 0.64}L${x} ${y - h}L${x + w * 0.36} ${y - h * 0.64}l-${w * 0.12} 8-${w * 0.12}-8-${w * 0.12} 8z`, '#FFFFFF', 2.5);

const items = [
  // ---------- Langkawi
  L('my/langkawi/landmark-fishfarm.v1.svg', 'กระชังปลาลอยน้ำกลางป่าชายเลนคีลิม', 'A floating fish farm in the Kilim mangroves', ['floating fish farm', 'กระชังปลาลอยน้ำ', 'kilim geoforest', 'อุทยานคีลิม', 'fish feeding', 'ให้อาหารปลา', 'archer fish', 'ปลาเสือพ่นน้ำ', 'stingray pen', 'บ่อปลากระเบน'], 'หาปลาที่กระโดดขึ้นมากินอาหาร', 'Find the fish jumping up for its food',
    // a wooden platform floating on green-blue water in a mangrove channel under limestone cliffs, square net pens in the deck, a little hut with a tin roof, fish leaping for pellets a child is throwing
    sky('#E0F2F1') + P('M-4 100l30-50 30 20 20-40 40 60 50-30 30 20 48-10v60H-4z', '#B0BEC5', 3) + ring(6, (k) => C(10 + k * 46, 110, 22, '#43A047', 3))
      + P('M-4 120h248v124H-4z', '#4DB6AC', 0) + Lc('M-4 120h248', INK, 3)
      + R(20, 150, 200, 64, '#C68B59', 0, 3) + ring(3, (k) => R(32 + k * 64, 160, 50, 40, '#26A69A', 0, 2.5) + Lc(`M${32 + k * 64} 180h50M${57 + k * 64} 160v40`, '#B2DFDB', 1.5))
      + R(170, 110, 44, 40, '#FFF3E0', 0, 3) + P('M164 112l28-20 28 20z', '#90A4AE', 3) + R(186, 124, 12, 26, '#6D4C41', 0, 2)
      + g(122, 150, 1, P('M-14 0c6-16 22-20 32-8-10 10-22 12-32 8zM-14 0l-8-8v14z', '#90A4AE', 2.5) + C(12, -6, 2, INK, 0), -30) + ring(5, (k) => C(110 + k * 6, 132 - (k % 2) * 6, 2, '#8D6E63', 0))
      + Lc('M-4 226c20-6 40 6 60 0s40 6 60 0', '#B2DFDB', 3) + kid(78, 148, '#FFCA28') + face(57, 186, 0.3)),
  L('my/langkawi/landmark-firespin.v1.svg', 'การแสดงควงไฟบนหาดเจอนังยามค่ำ', 'A fire-spinning show on Cenang beach at night', ['fire show', 'การแสดงควงไฟ', 'fire spinning', 'ควงลูกไฟ', 'pantai cenang', 'หาดเจอนัง', 'beach night', 'ชายหาดยามค่ำ', 'beach bar show', 'โชว์ริมหาด'], 'หาวงไฟสีส้มที่หมุนเป็นวงกลม', 'Find the orange rings of fire spinning round',
    // a dark blue night beach with stars and a moon, a performer in silhouette swinging two fire balls on chains that draw big glowing orange and yellow loops, children sitting on the sand watching
    sky('#1A237E') + C(200, 40, 16, '#FFF9C4', 0) + ring(7, (k) => C(20 + k * 30, 20 + (k % 3) * 16, 2, '#FFF59D', 0)) + P('M-4 150h248v20H-4z', '#283593', 0)
      + P('M-4 166h248v78H-4z', '#D7B98E', 0) + Lc('M-4 166h248', INK, 3)
      + C(84, 104, 34, 'none', 0) + Lc('M84 70a34 34 0 1 1 -1 0', '#FF9800', 7) + Lc('M84 70a34 34 0 1 1 -1 0', '#FFEB3B', 2.5)
      + Lc('M150 54c40 0 60 30 40 60s-60 20-60-10', '#FF7043', 7) + Lc('M150 54c40 0 60 30 40 60s-60 20-60-10', '#FFEB3B', 2.5)
      + C(118, 104, 9, '#37474F', 2) + P('M108 166l4-40h12l4 40z', '#37474F', 2.5) + Lc('M112 128l-22-20M124 128l20-16', '#37474F', 5)
      + [[86, 70], [170, 112]].map(([x, y]) => C(x, y, 8, '#FFEB3B', 2) + P(`M${x - 6} ${y - 4}c2-12 6-16 6-22 4 6 6 14 6 22z`, '#FF7043', 2)).join('')
      + kid(40, 220, '#EF5350') + kid(186, 222, '#29B6F6') + kid(150, 236, '#66BB6A', 1.1)),
  L('my/langkawi/landmark-lamanpadi.v1.svg', 'นาข้าวกับหุ่นไล่กาที่ลามันปาดี', 'The rice fields and scarecrow of Laman Padi', ['laman padi', 'ลามันปาดี', 'rice garden', 'สวนนาข้าว', 'scarecrow', 'หุ่นไล่กา', 'paddy fields', 'ทุ่งนา', 'rice planting', 'ปลูกข้าว'], 'หาหุ่นไล่กาใส่หมวกกลางนา', 'Find the scarecrow in a hat in the field',
    // flat bright green rice fields in rows of water-filled paddies, a cheerful scarecrow with a cone hat and a patched shirt standing in the middle, a wooden Malay house and hills behind, a child with a basket
    sky('#E1F5FE') + P('M-4 100c40-30 80-30 120-10s80-20 128 0v20H-4z', '#7CB342', 3) + R(150, 76, 50, 30, '#C68B59', 0, 2.5) + P('M144 78l31-20 31 20z', '#8D4A2B', 2.5)
      + P('M-4 108h248v136H-4z', '#81D4FA', 0) + ring(4, (k) => Lc(`M-4 ${130 + k * 30}h248`, '#8BC34A', 6))
      + ring(24, (k) => Lc(`M${8 + (k % 8) * 30} ${120 + Math.floor(k / 8) * 30}l-4-14M${8 + (k % 8) * 30} ${120 + Math.floor(k / 8) * 30}l4-14`, '#43A047', 3))
      + Lc('M120 220V100M92 130h56', '#8D6E63', 6) + P('M102 120h36l6 44h-48z', '#E53935', 3) + R(110, 134, 12, 10, '#29B6F6', 0, 2) + Lc('M90 130l-6 10M150 130l6 10', '#FFD54F', 4)
      + C(120, 98, 16, '#FFE082', 3) + P('M96 90l24-24 24 24z', '#D7A86E', 3) + face(120, 98, 0.4) + kid(196, 226, '#FF7043')),
  L('my/langkawi/landmark-galeria.v1.svg', 'กาเลรีอาเปอร์ดานาพิพิธภัณฑ์หลังคาซ้อนชั้น', 'Galeria Perdana, the museum of gifts with layered roofs', ['galeria perdana', 'กาเลรีอาเปอร์ดานา', 'museum of gifts', 'พิพิธภัณฑ์ของขวัญ', 'kilim', 'คีลิม', 'malay roofs', 'หลังคามลายู', 'rainy day visit', 'เที่ยววันฝนตก'], 'หาหลังคาสีเขียวที่ซ้อนกันหลายชั้น', 'Find the green roofs stacked one on another',
    // a white museum building of several wings whose turquoise-green Malay roofs are stacked in tiers with crossed tips at the gables, a stair entrance and palm trees, a child at the steps
    sky('#FFF8E1') + C(30, 150, 30, '#66BB6A', 3) + C(214, 150, 26, '#66BB6A', 3) + P('M-4 196h248v48H-4z', '#9CCC65', 0) + Lc('M-4 196h248', INK, 3)
      + R(30, 130, 180, 66, '#FFFFFF', 0, 3) + ring(7, (k) => R(42 + k * 24, 146, 12, 30, '#B3E5FC', 0, 2))
      + P('M14 134l40-30h132l40 30z', '#26A69A', 3) + P('M56 106l30-26h68l30 26z', '#4DB6AC', 3) + P('M90 82l30-30 30 30z', '#26A69A', 3)
      + Lc('M110 50l20 6M130 50l-20 6', INK, 3) + Lc('M14 134l-6-8M226 134l6-8', INK, 3) + Lc('M14 134h212M56 106h128', '#FFCA28', 2.5)
      + R(98, 168, 44, 28, '#8D6E63', 0, 3) + ring(3, (k) => R(92 - k * 6, 196 + k * 8, 56 + k * 12, 8, '#E0E0E0', 0, 2)) + kid(170, 230, '#AB47BC')),
  L('my/langkawi/landmark-batik.v1.svg', 'หมู่บ้านศิลปะผ้าบาติกกับการเขียนเทียน', 'Painting batik with wax at the batik art village', ['batik', 'ผ้าบาติก', 'batik painting', 'เขียนผ้าบาติก', 'canting', 'จันติ้ง', 'wax drawing', 'วาดลายด้วยเทียน', 'atma alam', 'อัตมาอาลัม'], 'หาปากกาทองแดงเล็กๆ ที่ใช้วาดเทียน', 'Find the little copper pen for drawing wax',
    // a big white cloth stretched on a wooden frame with a bright batik flower and leaf pattern half painted in pink, orange and blue inside wax outlines, a tiny copper canting pen dripping wax, paint pots and a child with a brush
    sky('#FFF3E0') + Lc('M30 30v170M210 30v170M20 36h200', '#8D6E63', 7) + R(40, 40, 160, 140, '#FFFDF7', 0, 3)
      + [[90, 90, '#F06292'], [150, 130, '#FFB74D'], [100, 150, '#4FC3F7']].map(([x, y, c]) => ring(6, (k) => g(x, y, 1, E(0, -14, 9, 14, c, 2.5), k * 60)) + C(x, y, 7, '#FFF59D', 2)).join('')
      + Lc('M60 60c30 40 70 60 110 100M150 60c-10 30 10 40 30 30', '#8D6E63', 2.5) + ring(4, (k) => E(130 + k * 14, 66 + k * 10, 8, 4, '#81C784', 2))
      + g(176, 90, 1, P('M-12 0c0-14 24-14 24 0 0 8-24 8-24 0z', '#D17A3A', 2.5) + Lc('M10 2l14 14', '#B0703A', 3) + Lc('M-10-4l-34-30', '#8D6E63', 4) + C(26, 20, 2.5, '#FFF8E1', 1.2) + face(0, 0, 0.18))
      + ring(3, (k) => R(52 + k * 34, 196, 26, 22, ['#F06292', '#FFB74D', '#4FC3F7'][k], 4, 2.5)) + kid(190, 236, '#26A69A', 1.1) + face(120, 110, 0.4)),

  // ---------- India (the country)
  K('in.food.panipuri', 'ปานีปูรีขนมแป้งกรอบใส่น้ำเปรี้ยว', 'Pani puri, crisp puffs filled with tangy water', ['pani puri', 'ปานีปูรี', 'golgappa', 'โกลกัปปา', 'puchka', 'ปุจกา', 'street snack', 'ของว่างข้างทาง', 'tamarind water', 'น้ำมะขาม'],
    // a steel plate of round golden hollow puris, one cracked open on top and being filled from a little jug of green minty water, with spiced potato and chickpeas inside, smiling faces on two puris
    E(120, 190, 100, 30, '#B0BEC5') + E(120, 186, 88, 22, '#ECEFF1', 2.5)
      + [[64, 176], [104, 182], [144, 182], [184, 176], [84, 160], [128, 160], [168, 158]].map(([x, y], k) => C(x, y, 20, '#E8A84A') + C(x - 6, y - 6, 4, '#F5CB7A', 0) + (k === 1 || k === 4 ? face(x, y + 2, 0.32) : '')).join('')
      + g(124, 120, 1, C(0, 0, 22, '#E8A84A') + E(0, -8, 14, 7, '#7CB342', 2.5) + ring(4, (k) => C(-8 + k * 5, -10 + (k % 2) * 3, 2.5, '#FFE082', 1)))
      + g(170, 62, 1, P('M-16-20h28l4 32c0 10-36 10-36 0z', '#B0BEC5', 3) + P('M12-16l20-6-2 10z', '#B0BEC5', 2.5) + R(-14, -6, 28, 18, '#66BB6A', 4, 0), 30) + Lc('M150 90c-6 8-12 14-18 18', '#81C784', 4)),
  K('in.food.jalebi', 'จาเลบีขนมขดวงน้ำเชื่อม', 'Jalebi, the sticky orange swirls', ['jalebi', 'จาเลบี', 'sweet swirls', 'ขนมขดวง', 'sugar syrup', 'น้ำเชื่อม', 'indian sweets', 'ขนมหวานอินเดีย', 'sweet shop', 'ร้านขนมหวาน'],
    // a plate piled with bright orange crispy spirals of jalebi glistening with syrup, one big swirl in front with a happy face and a drip of syrup, a few more frying in a pan behind
    E(120, 196, 100, 26, '#FFFFFF', 3) + E(120, 192, 86, 18, '#FFF3E0', 0)
      + [[70, 170, 0.8], [168, 170, 0.8], [116, 154, 0.85], [76, 136, 0.7], [160, 132, 0.7]].map(([x, y, s]) => g(x, y, s, Lc(SP, '#E65100', 9) + Lc(SP, '#FF9800', 4))).join('')
      + g(120, 190, 1.2, Lc(SP, '#E65100', 9) + Lc(SP, '#FFB300', 4) + face(0, 0, 0.3))
      + E(146, 222, 5, 7, '#FFC107', 2) + ring(4, (k) => P(`M${70 + k * 30} 120l3-6 3 6-3 3z`, '#FFFFFF', 0))),
  K('in.culture.mehndi', 'เฮนน่าลายเมห์นดีบนฝ่ามือ', 'Mehndi, henna patterns on a hand', ['mehndi', 'เมห์นดี', 'henna', 'เฮนน่า', 'hand painting', 'วาดลายบนมือ', 'henna cone', 'กรวยเฮนน่า', 'festival hands', 'มือในงานเทศกาล'],
    // an open little hand with lacy reddish-brown henna patterns: a big flower in the palm, dots and vines up each finger; beside it a henna cone with a drop at its tip and a small flower
    g(110, 120, 1, P('M-46 90c-10-40-10-70-4-90l2-56c0-12 16-12 16 0l2 40 2-60c0-12 16-12 16 0l2 58 4-52c0-12 16-12 16 0l0 58 6-36c2-12 18-10 16 2l-6 60c-2 30-10 56-24 76z', '#FFE0BD', 3.5)
      + ring(8, (k) => g(0, 40, 1, E(0, -12, 6, 11, 'none', 0) + Lc('M0-2c-6-6-6-16 0-22 6 6 6 16 0 22', '#A1452A', 2.5), k * 45)) + C(0, 40, 6, '#A1452A', 0)
      + ring(4, (k) => { const x = -38 + k * 18 + (k === 3 ? 6 : 0); return C(x, -40 + (k === 0 || k === 3 ? 20 : 0), 3, '#A1452A', 0) + Lc(`M${x} ${-26 + (k === 0 || k === 3 ? 20 : 0)}v18`, '#A1452A', 2.5); })
      + Lc('M-30 74c10 8 40 8 54-4', '#A1452A', 2.5) + ring(5, (k) => C(-26 + k * 12, 82, 2, '#A1452A', 0)) + face(0, 10, 0.32))
      + g(196, 110, 1, P('M-14-40h28L0 34z', '#2E7D32', 3) + Lc('M-14-28h28', '#A5D6A7', 2.5) + C(0, 42, 3, '#A1452A', 1.5), 20) + ring(5, (k) => g(196, 196, 1, E(0, -8, 5, 8, '#F06292', 2), k * 72))),
  // ---------- Delhi, Agra and Jaipur
  L('in/golden/landmark-paranthe.v1.svg', 'ปาราตาไส้ต่างๆ ในตรอกปารันเตวาลีกลีของเดลี', 'Stuffed parathas in Delhi’s Paranthe Wali Gali', ['paranthe wali gali', 'ตรอกปารันเตวาลีกลี', 'stuffed paratha', 'ปาราตาสอดไส้', 'chandni chowk lane', 'ตรอกในย่านเมืองเก่า', 'old delhi food', 'อาหารเดลีเก่า', 'chutney', 'ชัตนีย์'], 'หาปาราตาที่พองฟูในกระทะ', 'Find the puffy paratha in the pan',
    // a narrow old lane stall: a big shallow iron pan of hot oil with a golden puffed stuffed flatbread frying in it, a steel plate in front with a torn paratha, little bowls of green, orange and white chutney, hanging wires above
    sky('#FFE0B2') + Lc('M-4 30c60 10 120-10 248 6M-4 46c80-6 160 10 248-4', INK, 2) + R(-4, 60, 60, 150, '#BCAAA4', 0, 3) + R(184, 60, 60, 150, '#D7CCC8', 0, 3) + R(8, 80, 30, 40, '#FFF59D', 0, 2.5) + R(198, 84, 30, 40, '#80CBC4', 0, 2.5)
      + E(120, 120, 74, 20, '#424242', 3.5) + E(120, 116, 64, 14, '#FFB300', 0) + P('M76 116c0-24 88-24 88 0z', '#E8A84A', 3) + ring(5, (k) => C(90 + k * 15, 106 + (k % 2) * 4, 3, '#C77A2A', 0)) + face(120, 108, 0.4)
      + R(-4, 140, 248, 104, '#8D6E63', 0, 0) + Lc('M-4 140h248', INK, 3) + E(110, 196, 70, 22, '#CFD8DC', 3) + P('M60 192c0-24 70-30 90-10-10 10-40 18-90 10z', '#E8A84A', 3) + Lc('M104 186l10-10 6 12', '#FFE082', 2.5)
      + [[178, 184, '#7CB342'], [196, 212, '#FF7043'], [160, 222, '#FFFFFF']].map(([x, y, c]) => E(x, y, 16, 8, '#B0BEC5', 2.5) + E(x, y - 2, 11, 4, c, 0)).join('')),
  L('in/golden/landmark-patrikagate.v1.svg', 'ประตูปาตริกาในชัยปุระที่ทาสีทุกซุ้ม', 'Patrika Gate, Jaipur’s painted gateway', ['patrika gate', 'ประตูปาตริกา', 'jawahar circle', 'จาวาฮาร์เซอร์เคิล', 'painted gate', 'ประตูทาสีสดใส', 'rajasthani patterns', 'ลวดลายราชสถาน', 'pink city', 'นครสีชมพู'], 'หาซุ้มประตูที่ลายสีไม่ซ้ำกันเลย', 'Find the arches each painted a different pattern',
    // a tall gateway of pink stone with three scalloped arches, every arch and pillar painted in bright patterns of flowers, peacock-blue and saffron bands, little domed pavilions on top, a child under the middle arch
    sky('#E1F5FE') + P('M-4 206h248v38H-4z', '#E0C9A6', 0) + Lc('M-4 206h248', INK, 3)
      + R(16, 70, 208, 136, '#F48FB1', 0, 3.5) + R(16, 70, 208, 18, '#FFB300', 0, 3) + ring(10, (k) => C(26 + k * 21, 79, 4, '#1E88E5', 1.5))
      + [[48, 26, '#4DD0E1'], [120, 34, '#FFF59D'], [192, 26, '#4DD0E1']].map(([x, w, c]) => P(`M${x - w} 206v-70c0-10 6-14 10-18 4-8 12-12 ${w - 10} -12s${w - 4} 4 ${w - 10} 12c4 4 10 8 10 18v70z`, c, 3)
        + ring(4, (k) => C(x, 140 + k * 16, 4, '#E53935', 1.5)) + Lc(`M${x - w + 6} 140c10-14 ${2 * w - 22}-14 ${2 * w - 12} 0`, '#7E57C2', 3)).join('')
      + ring(4, (k) => R(16 + k * 66, 92, 12, 114, ['#7E57C2', '#FF7043', '#FF7043', '#7E57C2'][k], 0, 2.5)) + Lc('M16 110h208', '#FFFFFF', 2)
      + chhatri(40, 70, 1.4, '#FFE082') + chhatri(120, 70, 1.8, '#FFE082') + chhatri(200, 70, 1.4, '#FFE082') + kid(120, 204, '#29B6F6')),
  L('in/golden/landmark-panchmahal.v1.svg', 'ปัญจมหัลศาลาห้าชั้นที่ฟาเตห์ปูร์สิกรี', 'Panch Mahal, the five-storey pavilion at Fatehpur Sikri', ['panch mahal', 'ปัญจมหัล', 'fatehpur sikri', 'ฟาเตห์ปูร์สิกรี', 'five storeys', 'ห้าชั้น', 'wind palace pavilion', 'ศาลารับลม', 'red sandstone', 'หินทรายแดง'], 'หาชั้นที่เล็กลงทีละชั้นจนถึงศาลาบนยอด', 'Find the floors getting smaller up to the tiny dome on top',
    // a tall open pavilion of red sandstone in five stacked storeys, each smaller than the one below and held up by rows of thin columns, a little domed kiosk on the top, a paved courtyard with a square pool and a child
    sky('#FFF3E0') + P('M-4 196h248v48H-4z', '#E6B98A', 0) + Lc('M-4 196h248', INK, 3) + R(150, 206, 70, 26, '#4FC3F7', 0, 3)
      + [[0, 180, 30], [1, 140, 28], [2, 104, 26], [3, 70, 24], [4, 40, 22]].map(([k, w, h]) => { const y = 196 - (k + 1) * h - k * 2; return R(120 - w / 2, y, w, h, '#FFE0B2', 0, 0) + R(120 - w / 2 - 6, y - 6, w + 12, 8, '#C1502E', 0, 3) + ring(Math.round(w / 18) + 1, (j) => Lc(`M${120 - w / 2 + j * (w / Math.round(w / 18))} ${y + 2}v${h - 2}`, '#B5502E', 4)); }).join('')
      + chhatri(120, 50, 1.6, '#E57E5B') + kid(40, 236, '#AB47BC')),
  L('in/golden/landmark-alberthall.v1.svg', 'พิพิธภัณฑ์อัลเบิร์ตฮอลล์ในชัยปุระ', 'The Albert Hall Museum in Jaipur', ['albert hall museum', 'พิพิธภัณฑ์อัลเบิร์ตฮอลล์', 'ram niwas garden', 'สวนรามนิวาส', 'indo-saracenic', 'สถาปัตยกรรมอินโดซาราเซนิก', 'pigeons', 'นกพิราบ', 'museum at night', 'พิพิธภัณฑ์ยามค่ำ'], 'หาฝูงนกพิราบหน้าพิพิธภัณฑ์', 'Find the flock of pigeons in front of the museum',
    // a cream and sandstone palace-like museum with a tall central tower crowned by a dome, rows of little domed pavilions along the roofline, carved arched balconies, a flock of grey pigeons on the square in front with a child
    sky('#FFE0B2') + P('M-4 196h248v48H-4z', '#D7CCC8', 0) + Lc('M-4 196h248', INK, 3)
      + R(14, 120, 212, 76, '#FFE0B2', 0, 3) + ring(8, (k) => P(`M${24 + k * 26} 192v-26c0-12 16-12 16 0v26z`, '#E57E5B', 2.5) + P(`M${24 + k * 26} 152v-14c0-10 16-10 16 0v14z`, '#FFF8E1', 2))
      + R(90, 70, 60, 126, '#FFCC80', 0, 3) + P('M90 72c0-36 60-36 60 0z', '#FFF3E0', 3) + Lc('M120 36v-12', INK, 3) + P('M100 196v-40c0-26 40-26 40 0v40z', '#C1502E', 3) + ring(3, (k) => R(98 + k * 16, 84, 10, 22, '#FFF8E1', 4, 2))
      + chhatri(30, 120, 1.3, '#FFF3E0') + chhatri(66, 120, 1.1, '#FFF3E0') + chhatri(174, 120, 1.1, '#FFF3E0') + chhatri(210, 120, 1.3, '#FFF3E0')
      + [[40, 220, 1], [70, 230, -1], [150, 226, 1], [184, 214, -1]].map(([x, y, d]) => g(x, y, 1, E(0, 0, 10, 7, '#90A4AE', 2) + C(8 * d, -6, 5, '#78909C', 2) + P(`M${12 * d} -6l${5 * d} 2-${5 * d} 2z`, '#FFB74D', 1.5))).join('')
      + g(110, 216, 1, E(0, 0, 10, 7, '#90A4AE', 2) + C(-8, -6, 5, '#78909C', 2), -30) + kid(214, 236, '#FF7043')),
  L('in/golden/landmark-petha.v1.svg', 'ขนมเปทาของเมืองอัครา', 'Agra petha, the glassy candied gourd sweets', ['petha', 'เปทา', 'agra sweets', 'ขนมหวานอัครา', 'candied ash gourd', 'ฟักเชื่อม', 'sweet shop', 'ร้านขนมหวาน', 'souvenir box', 'กล่องของฝาก'], 'หาก้อนขนมใสๆ สีเขียวกับสีขาว', 'Find the shiny green and white sweet cubes',
    // a sweet-shop tray piled with shiny translucent cubes of candied gourd in white, pale green and saffron, a decorated cardboard sweet box opened in front, a big cube with a happy face and sparkles
    sky('#FFF8E1') + R(-4, 120, 248, 124, '#A1673F', 0, 0) + Lc('M-4 120h248', INK, 3) + E(120, 132, 110, 26, '#CFD8DC', 3) + E(120, 128, 98, 18, '#ECEFF1', 0)
      + ring(14, (k) => { const x = 40 + (k % 7) * 26 + (k > 6 ? 12 : 0), y = 122 - (k > 6 ? 16 : 0); return g(x, y, 1, R(-11, -11, 22, 22, ['#F1F8E9', '#DCEDC8', '#FFE0B2'][k % 3], 5, 2.5) + Lc('M-6-6l4-2', '#FFFFFF', 2)); })
      + R(40, 170, 160, 60, '#FFB74D', 6, 3) + Lc('M40 186h160', '#E65100', 3) + ring(5, (k) => C(60 + k * 30, 210, 7, '#FFF59D', 2))
      + g(120, 160, 1.7, R(-14, -14, 28, 28, '#DCEDC8', 6, 3) + Lc('M-8-8l5-2', '#FFFFFF', 2) + face(0, 0, 0.3)) + [[60, 60], [190, 70]].map(([x, y]) => P(`M${x} ${y - 10}l3 7 7 3-7 3-3 7-3-7-7-3 7-3z`, '#FFCA28', 0)).join('')),

  // ---------- Nepal (the country)
  K('np.food.selroti', 'เซลโรตีขนมวงแหวนทอด', 'Sel roti, the crispy rice-flour rings', ['sel roti', 'เซลโรตี', 'rice bread ring', 'ขนมวงแหวน', 'tihar treat', 'ขนมเทศกาลติฮาร์', 'deep fried', 'ทอดกรอบ', 'nepali snack', 'ของว่างเนปาล'],
    // a woven bamboo plate stacked with big golden-brown rings of fried rice dough, the top ring standing up with a happy face, a little cup of milky tea beside it
    E(110, 196, 96, 26, '#D4A055') + ring(5, (k) => Lc(`M${30 + k * 40} 188c10 10 20 10 30 0`, '#A1673F', 2))
      + [[80, 180], [140, 182], [110, 166]].map(([x, y]) => E(x, y, 40, 14, '#C77A2A') + E(x, y, 22, 6, '#D4A055', 2.5)).join('')
      + g(110, 112, 1, C(0, 0, 46, '#D9902A') + C(0, 0, 24, '#FFF8E1', 3) + ring(10, (k) => C(Math.cos(k * 0.63) * 35, Math.sin(k * 0.63) * 35, 2.5, '#A1673F', 0)) + face(0, -35, 0.25))
      + g(200, 172, 1, P('M-18-18h36l-4 34h-28z', '#FFFFFF', 3) + R(-16, -14, 32, 8, '#D7B98E', 0, 0) + Lc('M18-10c10 0 10 14 0 14', INK, 3) + Lc('M-6-28c-4-6 4-10 0-16M6-28c-4-6 4-10 0-16', '#B0BEC5', 2.5))),
  K('np.food.jujudhau', 'จูจูเดาโยเกิร์ตราชาแห่งภักตะปูร์', 'Juju dhau, the king of yoghurts from Bhaktapur', ['juju dhau', 'จูจูเดา', 'king curd', 'โยเกิร์ตราชา', 'bhaktapur', 'ภักตะปูร์', 'clay pot yoghurt', 'โยเกิร์ตในถ้วยดินเผา', 'newari sweet', 'ขนมหวานเนวาร์'],
    // a round terracotta clay bowl filled with thick creamy yellow-white set yoghurt, a spoon lifting a wobbly scoop, a smiling face on the bowl, two more little clay bowls behind
    [[56, 120], [184, 120]].map(([x, y]) => P(`M${x - 30} ${y}c0 30 12 40 30 40s30-10 30-40z`, '#C1693C') + E(x, y, 30, 8, '#FFF3C4', 2.5)).join('')
      + P('M36 140c0 54 34 76 84 76s84-22 84-76z', '#D9784A') + E(120, 140, 84, 20, '#FFF3C4') + E(120, 142, 64, 12, '#FFE9A8', 0) + Lc('M50 172c40 10 100 10 140 0', '#B5552C', 3)
      + Lc('M150 136l40-70', '#B0BEC5', 6) + Lc('M150 136l40-70', INK, 2) + P('M136 130c0-12 26-12 26 0s-26 10-26 0z', '#FFF3C4', 2.5) + face(120, 180, 0.6)),
  K('np.animal.monal', 'ไก่ฟ้าหิมาลัยโมนัลขนสีรุ้ง', 'The Himalayan monal, the rainbow pheasant', ['himalayan monal', 'ไก่ฟ้าโมนัล', 'danphe', 'ดันเฟ', 'national bird of nepal', 'นกประจำชาติเนปาล', 'rainbow pheasant', 'ไก่ฟ้าสีรุ้ง', 'mountain forest', 'ป่าบนภูเขา'],
    // a plump pheasant shining in metallic green, purple, blue and copper, a crest of little spoon-shaped feathers on its head, blue skin round its eye, a wide rust-orange tail fanned out behind, standing on a rock
    E(120, 216, 70, 12, '#B0BEC5', 0) + P('M40 140c-20-30-10-70 20-70 20 30 30 60 40 76z', '#E07B39') + Lc('M40 100c10 10 20 26 26 40', '#C0561C', 2.5)
      + E(122, 150, 56, 46, '#3949AB') + P('M90 130c20-20 60-20 80 0-10 30-60 40-80 0z', '#00897B', 2.5) + P('M104 166c20 10 50 10 70-6-6 20-40 34-70 6z', '#8E24AA', 2.5)
      + Lc('M110 194v18M140 194v18', '#78909C', 4) + C(160, 98, 28, '#2E7D32') + E(168, 98, 9, 8, '#4FC3F7', 2) + C(170, 98, 4, INK, 0)
      + P('M186 104l14 4-14 6z', '#BCAAA4', 2.5) + ring(5, (k) => Lc(`M${150 + k * 5} 72l${-4 + k * 2}-20`, '#2E7D32', 2) + C(146 + k * 7, 50 - (k % 2) * 4, 4, '#43A047', 1.5))
      + E(150, 112, 6, 4, '#FF8FA3', 0) + Lc('M152 112q6 4 12 0', INK, 2.5)),
  K('np.culture.peacockwindow', 'หน้าต่างไม้แกะสลักรูปนกยูงแห่งภักตะปูร์', 'The carved peacock window of Bhaktapur', ['peacock window', 'หน้าต่างนกยูง', 'woodcarving', 'งานแกะสลักไม้', 'newari craft', 'งานช่างเนวาร์', 'bhaktapur', 'ภักตะปูร์', 'lattice window', 'หน้าต่างฉลุ'],
    // a dark wooden window frame set in a red brick wall, carved in the middle with a peacock fanning its round tail of feather-eyes inside a fine lattice, carved flower borders around it
    R(10, 20, 220, 200, '#C1502E', 0, 3) + ring(10, (k) => Lc(`M10 ${40 + k * 18}h220`, '#A3402A', 2)) + R(40, 40, 160, 160, '#6D4C41', 6, 4) + R(54, 54, 132, 132, '#8D6E63', 0, 3)
      + ring(12, (k) => C(48 + (k % 6) * 29, k < 6 ? 46 : 194, 4, '#D7A86E', 1.5))
      + ring(9, (k) => { const a = Math.PI + (k / 8) * Math.PI, x = 120 + Math.cos(a) * 52, y = 140 + Math.sin(a) * 56; return Lc(`M120 140L${x.toFixed(1)} ${y.toFixed(1)}`, '#A1887F', 3) + E(x, y, 9, 11, '#BCAAA4', 2) + C(x, y, 4, '#6D4C41', 0); })
      + E(120, 152, 14, 22, '#A1887F', 3) + C(120, 124, 8, '#A1887F', 2.5) + Lc('M120 116l-4-10M120 116l4-10', INK, 2) + P('M126 124l8 2-8 3z', '#D7A86E', 1.5) + face(120, 150, 0.22)
      + ring(6, (k) => Lc(`M${60 + k * 24} 180h12`, '#D7A86E', 2.5))),

  // ---------- Kathmandu and the Himalaya
  L('np/kathmandu/landmark-gardenofdreams.v1.svg', 'สวนแห่งความฝันในกาฐมาณฑุ', 'The Garden of Dreams in Kathmandu', ['garden of dreams', 'สวนแห่งความฝัน', 'swapna bagaicha', 'สวัปนาบาไกชา', 'thamel', 'ทาเมล', 'neoclassical garden', 'สวนสไตล์ยุโรป', 'lily pond', 'บ่อบัว'], 'หาศาลาเสาขาวริมบ่อน้ำ', 'Find the white pillared pavilion by the pond',
    // a calm walled garden: a white neoclassical pavilion with columns and a little roof urn beside a rectangular lily pond, trimmed lawns, flower pots on the low wall and a family picnic rug with a child
    sky('#E8F5E9') + R(-4, 70, 248, 22, '#FFE0B2', 0, 3) + ring(6, (k) => R(10 + k * 40, 58, 14, 14, '#E57373', 4, 2) + C(17 + k * 40, 54, 7, '#66BB6A', 2))
      + P('M-4 120h248v124H-4z', '#9CCC65', 0) + Lc('M-4 120h248', INK, 3)
      + R(30, 74, 110, 60, '#FFFFFF', 0, 3) + P('M24 76l61-30 61 30z', '#ECEFF1', 3) + ring(5, (k) => R(38 + k * 22, 84, 8, 50, '#ECEFF1', 0, 2)) + P('M78 46c0-12 14-12 14 0z', '#FFCA28', 2)
      + R(60, 150, 140, 46, '#4FC3F7', 4, 3) + ring(4, (k) => E(80 + k * 34, 166 + (k % 2) * 12, 9, 4, '#66BB6A', 2) + C(80 + k * 34, 162 + (k % 2) * 12, 3, '#F48FB1', 1.5))
      + C(206, 100, 24, '#43A047', 3) + Lc('M206 124v26', '#6D4C41', 5) + R(150, 206, 70, 26, '#E57373', 4, 2.5) + ring(4, (k) => Lc(`M${160 + k * 16} 206v26`, '#FFFFFF', 2))
      + kid(176, 206, '#29B6F6') + kid(202, 206, '#FFCA28', 0.9)),
  L('np/kathmandu/landmark-gokyo.v1.svg', 'ทะเลสาบโกเกียวสีฟ้าครามใต้ยอดเขาหิมะ', 'The turquoise Gokyo lakes under the snow peaks', ['gokyo lakes', 'ทะเลสาบโกเกียว', 'gokyo ri', 'โกเกียวรี', 'turquoise lake', 'ทะเลสาบสีเทอร์คอยส์', 'everest trek', 'เส้นทางเดินป่าเอเวอเรสต์', 'stone huts', 'กระท่อมหิน'], 'หาทะเลสาบสีฟ้าครามระหว่างภูเขา', 'Find the bright turquoise lake between the mountains',
    // a brilliant turquoise lake in a bare stony valley under jagged white peaks, a few small stone lodges with blue roofs on the shore, a cairn of stacked stones and a child trekker with a walking pole
    sky('#BBDEFB') + peak(50, 120, 60, 90) + peak(140, 120, 70, 108) + peak(214, 120, 50, 76)
      + P('M-4 118h248v126H-4z', '#BCAAA4', 0) + Lc('M-4 118h248', INK, 3) + P('M30 150c20-20 160-24 190 0 10 30-30 50-100 50s-110-20-90-50z', '#1DE9B6', 3.5) + P('M60 160c30-12 110-12 130 0', 'none', 0) + Lc('M60 160c30-12 110-12 130 0', '#A7FFEB', 3)
      + [[24, 140], [52, 132]].map(([x, y]) => R(x - 12, y - 14, 24, 16, '#9E9E9E', 0, 2.5) + P(`M${x - 15} ${y - 14}l15-10 15 10z`, '#1E88E5', 2.5)).join('')
      + ring(4, (k) => E(196, 226 - k * 10, 14 - k * 3, 5, '#90A4AE', 2)) + face(124, 176, 0.42)
      + g(76, 232, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#E53935', 2) + R(-14, -14, 8, 14, '#FFCA28', 2, 2) + face(0, -18, 0.22) + Lc('M10-8l6 14', INK, 2))),
  L('np/kathmandu/landmark-krishnamandir.v1.svg', 'วัดหินกฤษณะมันดิรที่ปาฏันดูร์บาร์', 'The stone Krishna Mandir in Patan', ['krishna mandir', 'กฤษณะมันดิร', 'patan durbar square', 'ปาฏันดูร์บาร์', 'stone temple', 'วัดหิน', 'shikhara spires', 'ยอดศิขระ', 'lalitpur', 'ลลิตปุระ'], 'หายอดหินเล็กๆ ที่รายล้อมยอดใหญ่', 'Find the little stone spires round the big one',
    // a tall pale stone temple building: three storeys of little open pavilions with pillars, a tall ridged corn-cob spire on top surrounded by small spires, on a stepped plinth in a brick square with pigeons (the building only)
    sky('#FFF3E0') + R(-4, 200, 248, 44, '#C1502E', 0, 0) + ring(6, (k) => Lc(`M-4 ${206 + k * 7}h248`, '#A3402A', 1.5)) + Lc('M-4 200h248', INK, 3)
      + ring(3, (k) => R(56 - k * 8, 184 + k * 6, 128 + k * 16, 8, '#D7CCC8', 0, 2.5))
      + R(60, 150, 120, 34, '#E6DCCB', 0, 3) + ring(7, (k) => P(`M${66 + k * 16} 184v-24c0-8 10-8 10 0v24z`, '#8D6E63', 2))
      + R(72, 120, 96, 30, '#E6DCCB', 0, 3) + ring(5, (k) => P(`M${78 + k * 17} 150v-20c0-8 10-8 10 0v20z`, '#8D6E63', 2))
      + [[72, 120], [168, 120], [60, 150], [180, 150]].map(([x, y]) => P(`M${x - 8} ${y}l8-26 8 26z`, '#D7CCC8', 2.5)).join('')
      + P('M98 120c0-40 10-80 22-90 12 10 22 50 22 90z', '#E6DCCB', 3) + ring(5, (k) => Lc(`M${100 + k * 2} ${110 - k * 16}h${40 - k * 4}`, '#BCAAA4', 2)) + C(120, 26, 5, '#FFC107', 2)
      + [[30, 222], [200, 226], [176, 214]].map(([x, y]) => E(x, y, 8, 6, '#90A4AE', 2) + C(x + 6, y - 5, 4, '#78909C', 1.5)).join('') + kid(36, 236, '#7E57C2')),
  L('np/kathmandu/landmark-teahouse.v1.svg', 'บ้านพักทีเฮาส์ระหว่างเดินป่าในหิมาลัย', 'A teahouse lodge on a Himalayan trek', ['teahouse', 'ทีเฮาส์', 'trekking lodge', 'บ้านพักนักเดินป่า', 'annapurna circuit', 'เส้นทางอันนาปุรณะ', 'hot lemon', 'น้ำมะนาวร้อน', 'stone house', 'บ้านหิน'], 'หารองเท้าเดินป่าที่วางเรียงหน้าประตู', 'Find the hiking boots lined up by the door',
    // a cosy stone lodge with bright blue window frames and a green tin roof on a mountain path, smoke curling from the chimney, a stack of firewood, walking boots and backpacks by the door, snowy peaks behind, a child with a hot drink
    sky('#E3F2FD') + peak(60, 110, 70, 80) + peak(190, 110, 66, 92) + P('M-4 110h248v134H-4z', '#A5D6A7', 0) + P('M140 244c10-40 40-80 104-100v100z', '#D7CCC8', 0)
      + R(30, 110, 130, 84, '#BCAAA4', 0, 3) + ring(12, (k) => R(36 + (k % 4) * 30 + (Math.floor(k / 4) % 2) * 10, 118 + Math.floor(k / 4) * 22, 22, 12, '#A1887F', 3, 1.5))
      + P('M20 112l75-36 75 36z', '#43A047', 3) + R(120, 72, 14, 24, '#8D6E63', 0, 2.5) + Lc('M127 66c-6-10 6-14 0-24s6-14 0-22', '#ECEFF1', 4)
      + R(46, 132, 30, 26, '#E3F2FD', 0, 3) + Lc('M46 132h30v26H46zM61 132v26', '#1E88E5', 3) + R(118, 140, 30, 54, '#1E88E5', 0, 3)
      + ring(3, (k) => E(186, 186 - k * 10, 20, 5, '#8D6E63', 2)) + [[96, 190], [108, 190]].map(([x, y]) => P(`M${x} ${y}v-10h6v6h6v4z`, '#6D4C41', 1.5)).join('') + R(80, 172, 14, 18, '#FF7043', 4, 2)
      + g(206, 236, 1.2, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#FFCA28', 2) + face(0, -18, 0.22) + R(8, -10, 8, 9, '#FFFFFF', 2, 1.5) + Lc('M12-14c-2-4 2-6 0-10', '#B0BEC5', 1.5)) + face(95, 172, 0.3)),
  L('np/kathmandu/landmark-boudhanath.v1.svg', 'สถูปโพธินาถโดมขาวองค์ใหญ่', 'Boudhanath, the great white dome', ['boudhanath', 'โพธินาถ', 'boudha', 'บูดา', 'great stupa', 'สถูปใหญ่', 'white dome', 'โดมสีขาว', 'walking round', 'เดินรอบสถูป'], 'หาโดมสีขาวที่ใหญ่มาก', 'Find the huge white dome',
    // a huge round white dome on three stepped white terraces, a square gold tower with a tiered gold spire rising from its top, small houses ringing the square, pigeons flying up and children walking round the terrace (the building only)
    sky('#E1F5FE') + ring(6, (k) => R(-4 + k * 42, 150 - (k % 2) * 14, 40, 70, ['#FFCC80', '#EF9A9A', '#FFF59D', '#A5D6A7', '#90CAF9', '#FFAB91'][k], 0, 2.5))
      + R(-4, 200, 248, 44, '#E0E0E0', 0, 0) + Lc('M-4 200h248', INK, 3)
      + ring(3, (k) => R(30 + k * 12, 200 - (k + 1) * 10, 180 - k * 24, 10, '#FFFFFF', 0, 2.5))
      + P('M60 172c0-50 30-76 60-76s60 26 60 76z', '#FFFFFF', 3.5) + R(102, 70, 36, 28, '#FFC107', 0, 3) + Lc('M102 84h36', '#FFA000', 2)
      + ring(6, (k) => R(108 + k * 2, 64 - k * 7, 24 - k * 4, 7, '#FFC107', 0, 2)) + P('M114 22h12l-6-10z', '#FFC107', 2)
      + [[40, 60, -15], [196, 50, 10], [180, 84, 20]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 9, 5, '#90A4AE', 2) + P('M-2-2l-8-10 12 6zM2-2l8-12-4 12z', '#B0BEC5', 2), r)).join('')
      + kid(72, 192, '#E53935', 0.9) + kid(170, 192, '#29B6F6', 0.9)),
];

export default { places: {}, items };
