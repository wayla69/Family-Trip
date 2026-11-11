// Wave 11, Thailand (Isan) 1: Khon Kaen and Phu Wiang — no religious figures (the nine-tiered pagoda as a building only),
// no people on the mor lam stage, no buffalo, no elephants, no khaen, laap or grilled chicken (already in the library)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const KK = { k1: '#00897B', k2: '#E65100', k3: '#E0F2F1' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `th-khonkaen.landmark.${slug}`, cat: 'landmark', file: `th/khonkaen/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
// the nine-tiered square pagoda of Phra Mahathat Kaen Nakhon: white stepped storeys with red and gold trims, a golden spire
const pagoda = (x, base, s, tiers = 6) => {
  let o = '';
  for (let k = 0; k < tiers; k++) {
    const w = (76 - k * 11) * s, h = 15 * s, y = base - (k + 1) * h;
    o += R(x - w / 2, y, w, h, '#FFFFFF', 0, 3 * s) + Lc(`M${x - w / 2} ${y + 2 * s}h${w}`, k % 2 ? '#E53935' : '#FFB300', 3 * s);
    if (k < 3) o += [-1, 0, 1].map((j) => R(x + j * w * 0.28 - 3 * s, y + 6 * s, 6 * s, 7 * s, '#4FC3F7', 1, 0)).join('');
  }
  const top = base - tiers * 15 * s;
  return o + P(`M${x - 9 * s} ${top}q${9 * s}-${6 * s} ${18 * s} 0l-${4 * s}-${8 * s}h-${10 * s}z`, '#FFCA28', 3 * s) + P(`M${x - 4 * s} ${top - 8 * s}l${4 * s}-${30 * s} ${4 * s} ${30 * s}z`, '#FFCA28', 3 * s);
};

const items = [
  { id: 'th-khonkaen.stamp', cat: 'stamp', file: 'th/khonkaen/stamp.v1.svg', name: nm('ตราประทับขอนแก่น', 'Khon Kaen stamp'), kw: ['khon kaen', 'ขอนแก่น', 'phu wiang', 'ภูเวียง', 'isan', 'อีสาน', 'kaen nakhon', 'แก่นนคร'],
    // the white stepped storeys of the Kaen Nakhon pagoda standing on blue lake water
    svg: cityStamp('tkk-st', { name: 'KHON KAEN', sub: 'THAILAND', ...KK, emblem: E(100, 136, 40, 8, '#4FC3F7', 2.5) + pagoda(100, 134, 0.82, 5) }) },
  { id: 'th-khonkaen.day.kaennakhon', cat: 'day', file: 'th/khonkaen/day-kaennakhon.v1.svg', name: nm('บึงแก่นนครยามเย็น', 'Kaen Nakhon lake at sunset'), kw: ['kaen nakhon lake', 'บึงแก่นนคร', 'khon kaen', 'ขอนแก่น', 'sunset', 'พระอาทิตย์ตก', 'lakeside', 'ริมบึง', 'evening walk', 'เดินเล่นตอนเย็น', 'cycling path', 'ทางจักรยาน'],
    // an orange sunset over the wide city lake, the white tiered pagoda on the far bank, palms and the lakeside cycle path in front with a little red bicycle
    svg: scene('tkk-d1', '#FFCC80', C(170, 92, 26, '#FFE082', 0) + P('M-4 132h248v20H-4z', '#7CB342') + [[30, 120], [210, 118]].map(([x, y]) => C(x, y, 18, '#558B2F')).join('') + g(0, 0, 1, pagoda(96, 138, 0.9, 6))
      + P('M-4 140h248v60H-4z', '#4FC3F7') + Lc('M30 160h40M140 156h50M80 176h60', '#E1F5FE', 4) + Lc('M150 150h40', '#FFE082', 4)
      + P('M-4 196c80-10 160-10 248 0v50H-4z', '#D7CCC8') + Lc('M-4 206c80-10 160-10 248 0', '#FFFFFF', 3)
      + g(150, 196, 0.8, C(-18, 10, 12, 'none', 4) + C(18, 10, 12, 'none', 4) + Lc('M-18 10l14-18h20l-2 18M-4-8l14 18', '#E53935', 4) + Lc('M14-12h8', INK, 3))) },
  { id: 'th-khonkaen.day.isanfields', cat: 'day', file: 'th/khonkaen/day-isanfields.v1.svg', name: nm('ทุ่งนาอีสานรอบขอนแก่น', 'Isan rice fields around Khon Kaen'), kw: ['rice fields', 'ทุ่งนา', 'isan countryside', 'ชนบทอีสาน', 'khon kaen', 'ขอนแก่น', 'sugar palm', 'ต้นตาล', 'scarecrow', 'หุ่นไล่กา', 'farm stay', 'โฮมสเตย์'],
    // flat green paddies divided by little earth bunds, tall round sugar palms, a scarecrow in a farmer's hat, puffy clouds
    svg: scene('tkk-d2', '#B3E5FC', [[60, 54], [160, 44]].map(([x, y]) => E(x, y, 26, 10, '#FFFFFF', 0)).join('')
      + P('M-4 120h248v130H-4z', '#9CCC65') + [130, 150, 176, 206].map((y, k) => Lc(`M-4 ${y}c80 ${-6 + k * 2} 160 ${6 - k * 2} 248 0`, '#C5A572', 4)).join('') + [80, 150].map((x) => Lc(`M${x} 120l${(x - 120) * 0.6} 130`, '#C5A572', 4)).join('')
      + [[40, 46], [196, 56], [220, 70]].map(([x, top]) => Lc(`M${x} 126V${top}`, '#795548', 6) + C(x, top, 18, '#43A047') + Lc(`M${x - 18} ${top}h36M${x} ${top - 18}v36`, '#2E7D32', 2)).join('')
      + Lc('M120 196v-60M98 154h44', '#8D6E63', 5) + C(120, 130, 12, '#FFE0B2', 3) + P('M100 126c4-12 36-12 40 0z', '#F9A825', 3) + R(110, 144, 20, 28, '#1E88E5', 3, 3) + face(120, 128, 0.3)) },

  L('phuwiang', 'แหล่งขุดไดโนเสาร์ภูเวียง', 'The Phu Wiang dinosaur dig', ['phu wiang', 'ภูเวียง', 'dinosaur dig', 'แหล่งขุดค้นไดโนเสาร์', 'sauropod', 'ซอโรพอด', 'fossil bones', 'กระดูกฟอสซิล', 'phuwiangosaurus', 'ภูเวียงโกซอรัส'], 'หาโครงกระดูกไดโนเสาร์คอยาวที่โผล่จากดินแดง', 'Find the long-necked dinosaur bones peeking out of the red earth',
    // a red earth hillside under a little shelter roof, the long-necked skeleton of a sauropod lying in it, smiling skull, a brush and a bucket beside
    P('M14 150c40-30 80-40 120-36s70 20 92 40v62H14z', '#E07A4F') + P('M30 70h180l-14-22H44z', '#FFB74D') + Lc('M44 70v84M196 70v80', '#8D6E63', 5)
      + Lc('M60 176c20-20 50-28 80-26', '#FFF8E1', 9) + Array.from({ length: 6 }, (_, k) => Lc(`M${78 + k * 11} ${166 - k * 2}c-2 12 0 20 4 26`, '#FFF8E1', 5)).join('') + Lc('M140 150c16-6 26-26 34-50', '#FFF8E1', 7)
      + E(180, 96, 14, 10, '#FFF8E1') + face(181, 94, 0.32) + Lc('M60 176c-14 10-26 14-40 12', '#FFF8E1', 5) + [[86, 196], [120, 192]].map(([x, y]) => Lc(`M${x} ${y}v20`, '#FFF8E1', 6)).join('')
      + R(164, 178, 22, 20, '#29B6F6', 3) + Lc('M162 178c4-12 22-12 26 0', INK, 3) + Lc('M40 200l20-20', '#8D6E63', 4) + R(56, 172, 10, 12, '#FFCA28', 2, 2)),
  L('pagoda', 'พระมหาธาตุแก่นนคร', 'The nine-tiered Kaen Nakhon pagoda', ['phra mahathat kaen nakhon', 'พระมหาธาตุแก่นนคร', 'wat nong waeng', 'วัดหนองแวง', 'nine-tiered pagoda', 'เจดีย์เก้าชั้น', 'white pagoda', 'บึงแก่นนคร', 'viewpoint', 'จุดชมวิว'], 'หาเจดีย์สีขาวสูงเก้าชั้นริมบึง', 'Find the tall white pagoda with nine floors by the lake',
    // the square white pagoda of nine stepped storeys with red and gold bands, little blue windows, a golden spire, standing on the lake shore
    E(120, 214, 96, 14, '#4FC3F7') + Lc('M50 214h40M140 216h40', '#E1F5FE', 3) + pagoda(120, 212, 1.15, 9) + face(120, 198, 0.42)),
  L('bike', 'ปั่นจักรยานรอบบึงแก่นนคร', 'Cycling round Kaen Nakhon lake', ['cycling', 'ปั่นจักรยาน', 'bicycle', 'จักรยาน', 'bike path', 'ทางจักรยาน', 'lakeside', 'ริมบึง', 'bike rental', 'เช่าจักรยาน', 'bueng kaen nakhon'], 'หาจักรยานคันเล็กที่มีตะกร้าดอกไม้', 'Find the little bicycle with a basket of flowers',
    // a little red bicycle with a front basket of pink flowers standing on the lakeside path, the evening sun dipping into the water behind
    bg('#FFE0B2') + C(160, 80, 26, '#FFCA28', 0) + P('M16 116h208v40H16z', '#4FC3F7', 0) + Lc('M40 130h40M140 136h50', '#E1F5FE', 3) + P('M16 156h208v38a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#D7CCC8', 0) + R(16, 16, 208, 208, 'none', 30)
      + C(72, 172, 30, '#FFFFFF', 5) + C(170, 172, 30, '#FFFFFF', 5) + C(72, 172, 5, INK, 0) + C(170, 172, 5, INK, 0) + Lc('M72 172l34-48h50l14 48M106 124l26 48 24-48M120 172h12', '#E53935', 7)
      + Lc('M100 116h18M150 110l6 14', INK, 5) + R(150, 96, 34, 22, '#FFCC80', 4, 4) + [[156, 92], [168, 88], [180, 92]].map(([x, y]) => C(x, y, 7, '#F06292', 2.5)).join('') + face(167, 108, 0.3)),
  L('morlam', 'เวทีหมอลำ', 'A mor lam show stage', ['mor lam', 'หมอลำ', 'mor lam stage', 'เวทีหมอลำ', 'isan music', 'ดนตรีอีสาน', 'stage lights', 'ไฟเวที', 'temple fair', 'งานวัด', 'concert'], 'หาเวทีที่มีไฟหลากสีกับลำโพงซ้อนกันสูง', 'Find the stage with rainbow lights and towers of speakers',
    // an outdoor show stage with a shiny pink-gold backdrop, a lighting rig shining coloured beams, tall stacks of speakers at both sides (no people)
    P('M60 70l-30 140h40zM180 70l30 140h-40z', '#FFF59D', 0).replace('fill="#FFF59D"', 'fill="#FFF59D" opacity=".55"') + R(36, 132, 168, 30, '#7E57C2') + R(50, 60, 140, 76, '#EC407A') + Array.from({ length: 6 }, (_, k) => Lc(`M${62 + k * 22} 66v64`, '#F8BBD0', 3)).join('') + P('M50 60c30 30 110 30 140 0', '#FFCA28', 4)
      + Lc('M40 48h160', '#455A64', 6) + ['#FF5252', '#FFEB3B', '#69F0AE', '#40C4FF', '#E040FB'].map((c, k) => C(60 + k * 30, 52, 8, c, 3)).join('') + [[20, 120], [196, 120]].map(([x, y]) => [0, 1, 2].map((j) => R(x, y + j * 30, 26, 30, '#37474F', 3, 3) + C(x + 13, y + j * 30 + 15, 9, '#90A4AE', 2.5)).join('')).join('')
      + Lc('M36 162h168', '#FFCA28', 4) + R(36, 166, 168, 44, '#8D6E63') + face(120, 100, 0.55)),
  L('ponglang', 'โปงลาง', 'A pong lang log xylophone', ['pong lang', 'โปงลาง', 'log xylophone', 'ระนาดไม้แขวน', 'isan music', 'ดนตรีอีสาน', 'wooden bars', 'ไม้มะหาด', 'folk band', 'วงโปงลาง'], 'หาระนาดท่อนไม้ที่แขวนเอียงกับไม้ตีสองอัน', 'Find the hanging row of wooden logs and the two beaters',
    // a row of twelve round wooden logs, long to short, strung on cords and hanging slanting from a wooden post, two little beaters with round heads
    Lc('M40 214V36M40 40h56', '#6D4C41', 8) + Lc('M30 214h30', '#6D4C41', 8) + Lc('M62 42l84 160', '#FFCA28', 3) + Lc('M96 42l110 150', '#FFCA28', 3)
      + Array.from({ length: 10 }, (_, k) => { const t = k / 9, y = 58 + t * 136, l = 62 + t * 84, r = 92 + t * 110; return R(l - 6, y - 6, r - l + 12, 13, ['#D7A86E', '#C68C4B'][k % 2], 6, 3); }).join('')
      + [[150, 60, 20], [186, 84, 34]].map(([x, y, r]) => g(x, y, 1, Lc('M0 0v46', '#8D6E63', 5) + C(0, -4, 9, '#EF5350'), r)).join('') + face(112, 120, 0.3)),
  L('saikrok', 'ไส้กรอกอีสาน', 'Isan sour sausages on sticks', ['sai krok isan', 'ไส้กรอกอีสาน', 'isan sausage', 'ไส้กรอกเปรี้ยว', 'grilled', 'ปิ้ง', 'cabbage', 'กะหล่ำปลี', 'ginger', 'ขิง', 'bird chilli', 'พริกขี้หนู'], 'หาไส้กรอกกลมๆ เสียบไม้กับขิงและกะหล่ำ', 'Find the round little sausages on sticks with ginger and cabbage',
    // three bamboo sticks threaded with plump round grilled sausages, a wedge of crunchy cabbage, ginger slices and three green chillies on a banana leaf
    P('M24 190c40-30 150-40 196-10-40 30-150 40-196 10z', '#66BB6A') + Lc('M40 186c50-12 120-16 170-8', '#43A047', 3)
      + [[70, 40], [110, 30], [150, 40]].map(([x, top], j) => Lc(`M${x} 196V${top}`, '#D7B377', 5) + [0, 1, 2, 3].map((k) => C(x, top + 26 + k * 30, 15, '#C9705A') + Lc(`M${x - 8} ${top + 22 + k * 30}l10 8`, '#8D3B2F', 3)).join('')).join('')
      + P('M170 186c0-24 20-34 40-26-4 18-20 28-40 26z', '#C5E1A5') + Lc('M176 182c10-8 18-14 28-18', '#9CCC65', 3) + [[38, 196], [48, 204]].map(([x, y]) => E(x, y, 10, 6, '#FFE082', 2.5)).join('') + [[196, 200, 20], [206, 196, 40]].map(([x, y, r]) => g(x, y, 1, P('M0 0c4-10 14-14 20-12-4 4-10 10-20 12z', '#43A047', 2), r)).join('')
      + face(110, 120, 0.3)),
  L('dam', 'เขื่อนอุบลรัตน์', 'Ubolratana Dam and its lake', ['ubolratana dam', 'เขื่อนอุบลรัตน์', 'dam', 'เขื่อน', 'reservoir', 'อ่างเก็บน้ำ', 'lake view', 'วิวทะเลสาบ', 'phu kao', 'picnic', 'ปิกนิก'], 'หาเขื่อนยาวที่กั้นทะเลสาบสีฟ้าไว้', 'Find the long dam wall holding back the big blue lake',
    // a long curving grey dam wall with spillway gates holding back a wide blue lake, green hills behind, a grassy slope below with a picnic mat
    bg('#E1F5FE') + P('M16 100c40-30 70-20 100-6 30-20 70-26 108 0v20H16z', '#81C784', 0) + P('M16 104h208v34H16z', '#29B6F6', 0) + Lc('M40 118h30M150 114h40', '#E1F5FE', 3)
      + P('M16 136c60-10 148-10 208 0v24c-60-10-148-10-208 0z', '#CFD8DC') + Array.from({ length: 5 }, (_, k) => R(70 + k * 22, 138, 14, 16, '#90A4AE', 2, 2.5)).join('') + Lc('M16 136c60-10 148-10 208 0', INK, 4)
      + P('M16 160c60-10 148-10 208 0v34c0 16-14 30-30 30H46c-16 0-30-14-30-30z', '#9CCC65', 0) + R(16, 16, 208, 208, 'none', 30) + R(150, 180, 40, 22, '#FF8A65', 3, 3) + Lc('M150 191h40', '#FFFFFF', 3) + face(120, 140, 0.32)),
  L('pillow', 'หมอนขิดสามเหลี่ยม', 'An Isan triangle pillow', ['triangle pillow', 'หมอนสามเหลี่ยม', 'mon khit', 'หมอนขิด', 'khit pattern', 'ลายขิด', 'isan handicraft', 'หัตถกรรมอีสาน', 'souvenir', 'ของฝาก'], 'หาหมอนรูปสามเหลี่ยมที่มีลายข้าวหลามตัด', 'Find the triangle-shaped pillow with diamond patterns',
    // a big red triangular backrest cushion covered in yellow-and-white diamond khit patterns, a flat cushion of little triangles folded out in front
    P('M30 196l60-140h60l60 140z', '#E53935') + Lc('M90 56h60', '#FFCA28', 5) + Array.from({ length: 3 }, (_, r) => Array.from({ length: 3 + r }, (_, c) => { const x = 120 + (c - (2 + r) / 2) * 28, y = 92 + r * 32; return P(`M${x} ${y - 11}l11 11-11 11-11-11z`, '#FFCA28', 2.5) + C(x, y, 3, '#FFFFFF', 0); }).join('')).join('')
      + Array.from({ length: 7 }, (_, k) => P(`M${22 + k * 28} 218l14-22 14 22z`, k % 2 ? '#1E88E5' : '#E53935', 3)).join('') + Lc('M20 196h200', '#FFCA28', 5) + face(120, 168, 0.4)),
  L('fishtrap', 'ไซดักปลา', 'Bamboo fish traps', ['fish trap', 'ไซดักปลา', 'sai', 'ไซ', 'bamboo basket', 'เครื่องจักสาน', 'fishing', 'หาปลา', 'paddy pond', 'หนองน้ำ', 'isan farm'], 'หาไซไม้ไผ่สานที่ตั้งอยู่ริมหนองน้ำ', 'Find the woven bamboo traps standing by the pond',
    // two woven bamboo fish traps shaped like tall vases with funnel mouths, standing at the edge of a little pond where a fish peeks out
    E(120, 196, 100, 24, '#4FC3F7') + Lc('M60 196c10-4 20 4 30 0M150 204c10-4 20 4 30 0', '#E1F5FE', 3) + E(184, 192, 14, 8, '#FF8A65', 2.5) + C(178, 190, 1.8, INK, 0)
      + [[86, 1], [146, 0.8]].map(([x, s]) => g(x, 190, s, P('M-26 0c-10-40-6-80 6-110h40c12 30 16 70 6 110z', '#E9C46A') + Array.from({ length: 6 }, (_, k) => Lc(`M-28 ${-14 - k * 16}h56`, '#C8962F', 3)).join('') + Array.from({ length: 5 }, (_, k) => Lc(`M${-16 + k * 8} -2v-104`, '#C8962F', 2)).join('') + E(0, -110, 22, 8, '#C8962F') + E(0, -110, 10, 4, INK, 0) + face(0, -50, 0.42))).join('')),
  L('oxcart', 'เกวียนอีสาน', 'A wooden Isan cart', ['ox cart', 'เกวียน', 'wooden cart', 'เกวียนไม้', 'cart wheel', 'ล้อเกวียน', 'isan village', 'หมู่บ้านอีสาน', 'old times', 'สมัยก่อน'], 'หาเกวียนไม้ที่มีล้อซี่ใหญ่และหลังคาโค้ง', 'Find the wooden cart with the big spoked wheel and a curved roof',
    // a wooden farm cart with a curved woven hood like a boat, a big round spoked wheel and two long shafts reaching forward
    P('M60 120c0-40 30-56 70-56s64 16 64 56z', '#D7A86E') + Array.from({ length: 6 }, (_, k) => Lc(`M${74 + k * 20} ${120}c0-30 4-46 8-54`, '#B9874F', 3)).join('') + R(50, 120, 160, 24, '#8D6E63', 4) + Lc('M50 132L14 166', '#8D6E63', 8) + Lc('M50 142L22 178', '#6D4C41', 6)
      + C(130, 170, 44, '#A1673F') + C(130, 170, 34, '#FFE0B2', 3) + Array.from({ length: 8 }, (_, k) => Lc(`M130 170l${(Math.cos((k / 8) * Math.PI * 2) * 34).toFixed(1)} ${(Math.sin((k / 8) * Math.PI * 2) * 34).toFixed(1)}`, '#6D4C41', 4)).join('') + C(130, 170, 9, '#6D4C41') + face(130, 92, 0.4)),
  L('sugarcane', 'ไร่อ้อย', 'A sugar cane field', ['sugar cane', 'อ้อย', 'cane field', 'ไร่อ้อย', 'sweet', 'หวาน', 'farm', 'ไร่', 'cane juice', 'น้ำอ้อย', 'harvest'], 'หาลำอ้อยที่มีข้อเป็นปล้องๆ', 'Find the tall cane stalks with their knobbly joints',
    // tall purple-green sugar cane stalks with knobbly rings and long arching leaves, one chopped piece lying in front with a sweet smile
    bg('#FFF8E1') + Array.from({ length: 5 }, (_, k) => { const x = 50 + k * 34; return Lc(`M${x} 214V${50 + (k % 2) * 14}`, k % 2 ? '#8D6E9E' : '#9CCC65', 10) + [0, 1, 2, 3].map((j) => Lc(`M${x - 6} ${80 + j * 34 + (k % 2) * 8}h12`, '#5D4037', 3)).join('') + P(`M${x} ${56 + (k % 2) * 14}c-20 0-34 14-40 30M${x} ${56 + (k % 2) * 14}c20-4 32 6 40 22`, 'none').replace('fill="none"', 'fill="none" stroke="#43A047" stroke-width="5"'); }).join('')
      + g(120, 196, 1, R(-50, -14, 100, 28, '#9CCC65', 12) + Lc('M-16-14v28M20-14v28', '#5D4037', 3) + E(50, 0, 6, 13, '#FFF9C4', 2.5) + face(2, -4, 0.38))),
  L('khaojee', 'ข้าวจี่', 'Khao jee, grilled egg-glazed sticky rice', ['khao jee', 'ข้าวจี่', 'grilled sticky rice', 'ข้าวเหนียวปิ้ง', 'egg glaze', 'ทาไข่', 'breakfast snack', 'ของกินเช้า', 'charcoal grill', 'เตาถ่าน'], 'หาก้อนข้าวเหนียวสีทองเสียบไม้บนเตาถ่าน', 'Find the golden sticky rice patties on sticks over the coals',
    // three flat sticky-rice patties glazed golden with egg on bamboo sticks, laid across a small round clay charcoal stove with glowing coals
    P('M50 150h140l-14 60H64z', '#A1673F') + Lc('M56 170h128', '#8D5524', 3) + E(120, 150, 70, 12, '#424242') + [96, 120, 144].map((x) => C(x, 150, 6, '#FF7043', 0)).join('') + Lc('M44 140h152', '#9E9E9E', 3)
      + [[84, 100, -6], [124, 96, 0], [164, 100, 6]].map(([x, y, r]) => g(x, y, 1, Lc('M0 38V-48', '#D7B377', 5) + E(0, 0, 22, 32, '#FFB300') + E(-6, -10, 8, 10, '#FFE082', 0) + Lc('M-12 14c6 4 18 4 24 0', '#E65100', 2), r)).join('') + face(124, 96, 0.32)),
  L('waterjar', 'ตุ่มน้ำหน้าบ้าน', 'A clay water jar for passers-by', ['water jar', 'ตุ่มน้ำ', 'clay pot', 'หม้อดิน', 'free water', 'น้ำบริการ', 'coconut ladle', 'กะลาตักน้ำ', 'isan kindness', 'น้ำใจอีสาน'], 'หาตุ่มดินใต้หลังคาเล็กๆ กับกะลาตักน้ำ', 'Find the clay jar under a tiny roof with a coconut-shell ladle',
    // a round brown clay water jar with a wooden lid on a little stand under its own tiny shingle roof, a coconut-shell ladle on a long handle hanging beside it
    Lc('M60 214V80M180 214V80', '#8D6E63', 7) + P('M40 84l80-44 80 44z', '#C1694F') + Lc('M56 72h128', '#A1522E', 3) + R(76, 182, 88, 12, '#8D6E63', 3)
      + P('M84 182c-20-30-12-70 36-76 48 6 56 46 36 76z', '#A0522D') + E(120, 108, 28, 7, '#D7A86E') + C(120, 102, 5, '#8D6E63', 2.5) + Lc('M90 150c20 6 40 6 60 0', '#7B3F20', 3) + face(120, 140, 0.45)
      + Lc('M168 100l-16 60', '#D7B377', 4) + E(150, 166, 12, 8, '#6D4C41')),
  L('wot', 'โหวด', 'A wot, the Isan round panpipe', ['wot', 'โหวด', 'panpipe', 'ปี่แพน', 'bamboo pipes', 'ไม้ซาง', 'isan music', 'ดนตรีอีสาน', 'blowing', 'เป่า', 'pong lang band'], 'หาเครื่องเป่าไม้ไผ่ที่เรียงเป็นวงกลม', 'Find the ring of bamboo pipes tied round a stick',
    // a ring of thin bamboo pipes of different lengths bound round a central stick, a lump of dark beeswax on top, coloured ribbons fluttering
    Lc('M120 214V60', '#8D6E63', 6) + Array.from({ length: 9 }, (_, k) => { const x = 72 + k * 12, len = 70 + Math.abs(4 - k) * -10 + 50; return R(x - 5, 186 - len, 10, len, k % 2 ? '#E6C27A' : '#D7B377', 4, 3) + Lc(`M${x - 5} ${186 - len + 10}h10`, '#A1673F', 2); }).join('')
      + Lc('M66 150h108M66 168h108', '#E53935', 4) + E(120, 56, 16, 12, '#4E342E') + face(120, 132, 0.45)
      + [[70, 150, '#FFCA28'], [174, 150, '#29B6F6']].map(([x, y, c], k) => Lc(`M${x} ${y}c${k ? 20 : -20} 10 ${k ? 10 : -10} 30 ${k ? 30 : -30} 40`, c, 5)).join('')),
  L('strawrooster', 'หุ่นฟางไก่ยักษ์', 'A giant straw rooster in the harvested field', ['straw sculpture', 'หุ่นฟาง', 'straw festival', 'เทศกาลหุ่นฟาง', 'giant rooster', 'ไก่ยักษ์', 'harvest', 'หลังเกี่ยวข้าว', 'rice straw', 'ฟางข้าว'], 'หาไก่ตัวโตที่ทำจากฟางข้าวกลางนา', 'Find the big rooster made of rice straw standing in the field',
    // a huge rooster woven from golden rice straw with a red cloth comb and a fan tail of straw, standing in a harvested field of short stubble
    P('M16 196h208v12c0 10-8 16-16 16H32c-10 0-16-6-16-16z', '#C5A572') + Array.from({ length: 12 }, (_, k) => Lc(`M${24 + k * 17} 210v-10`, '#8D6E63', 2.5)).join('')
      + P('M150 150c40-20 50-70 30-110-6 30-20 50-40 60', '#F2C94C') + P('M60 170c-10-50 20-90 60-90 40 0 50 40 40 90z', '#F2C94C') + C(96, 70, 26, '#F2C94C')
      + Array.from({ length: 8 }, (_, k) => Lc(`M${70 + k * 10} 110c4 20 4 40 0 60`, '#D4A72C', 2.5)).join('') + P('M84 46c0-12 6-18 12-12 4-8 12-6 12 2 8-2 10 8 4 12z', '#E53935') + P('M70 72l-16 6 16 6z', '#FFB300') + E(84, 92, 6, 9, '#E53935')
      + Lc('M100 170v20M120 170v20', '#8D6E63', 6) + face(98, 68, 0.38)),
  L('kaipam', 'ไข่ป่าม', 'Khai pam, eggs cooked in banana-leaf cups', ['khai pam', 'ไข่ป่าม', 'banana leaf cup', 'กระทงใบตอง', 'charcoal grill', 'เตาถ่าน', 'egg', 'ไข่', 'isan breakfast', 'อาหารเช้าอีสาน', 'spring onion'], 'หากระทงใบตองที่มีไข่สุกอยู่บนเตาถ่าน', 'Find the little banana-leaf cups of egg cooking on the coals',
    // three square cups folded from green banana leaf and pinned with little sticks, full of golden beaten egg with spring onion, sitting on a grill over a round clay charcoal stove
    P('M44 160h152l-16 52H60z', '#A1673F') + Lc('M52 182h136', '#8D5524', 3) + E(120, 160, 78, 12, '#424242') + [90, 120, 150].map((x) => C(x, 160, 6, '#FF7043', 0)).join('') + Lc('M40 150h160', '#9E9E9E', 3)
      + [[74, 128], [120, 124], [166, 128]].map(([x, y]) => P(`M${x - 24} ${y - 14}l6 34h36l6-34z`, '#66BB6A') + Lc(`M${x - 24} ${y - 14}l-6-8M${x + 24} ${y - 14}l6-8`, '#43A047', 4) + E(x, y - 14, 24, 6, '#FFC107') + [[-8, -15], [6, -13]].map(([dx, dy]) => Lc(`M${x + dx} ${y + dy}l5-2`, '#7CB342', 3)).join('') + Lc(`M${x - 18} ${y}v-20M${x + 18} ${y}v-20`, '#D7B377', 2)).join('')
      + Lc('M100 96c-6-10 6-16 0-26M140 96c-6-10 6-16 0-26', '#B0BEC5', 3) + face(120, 132, 0.3)),
  L('termitemound', 'จอมปลวกกลางทุ่งนา', 'A tall termite mound in the paddy', ['termite mound', 'จอมปลวก', 'red earth', 'ดินแดง', 'rice paddy', 'ทุ่งนา', 'isan countryside', 'ชนบทอีสาน', 'nature walk', 'เดินทุ่ง', 'termites'], 'หาเนินดินแดงสูงๆ ที่มีต้นไม้งอกอยู่ข้างบนกลางนา', 'Find the tall red-earth mound with a little tree growing on top in the rice field',
    // a tall lumpy red-earth termite mound with chimney bumps standing in green paddy rows, a small tree sprouting from its top, a tiny trail of termites at its foot
    bg('#E3F2FD') + P('M16 150h208v44a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#9CCC65', 0) + [168, 190, 210].map((y) => Lc(`M16 ${y}c60-6 140-6 208 0`, '#7CB342', 3)).join('') + R(16, 16, 208, 208, 'none', 30)
      + P('M62 196c-6-40 4-80 22-100 4-20 14-26 22-14 8-14 22-10 22 8 18 20 28 60 22 106z', '#C1693F') + P('M84 96c-2-14 2-24 8-26 6 4 8 14 6 26zM128 108c0-12 4-20 10-20 4 6 4 14 0 22z', '#C1693F') + Lc('M80 140c8 4 16 4 24 0M100 170c8 4 16 4 24 0M120 130c6 4 12 4 18 0', '#9C4F2B', 3)
      + Lc('M106 92V44', '#6D4C41', 5) + C(106, 36, 22, '#43A047') + C(88, 44, 12, '#66BB6A') + C(124, 44, 12, '#66BB6A')
      + [[150, 204], [164, 206], [178, 204], [192, 206]].map(([x, y]) => E(x, y, 3, 2, '#FFF8E1', 1.2)).join('') + face(106, 150, 0.42)),
];

export default {
  places: {
    'th-khonkaen': { country: 'th', wave: 3, home: true, name: nm('ขอนแก่น', 'Khon Kaen'), tz: 'Asia/Bangkok', ll: [16.43, 102.84], alias: ['khon kaen', 'ขอนแก่น', 'KKC', 'phu wiang', 'ภูเวียง', 'kaen nakhon', 'แก่นนคร', 'ubolratana', 'อุบลรัตน์', 'ban khok sa-nga', 'บ้านโคกสง่า'], colors: KK },
  },
  items,
};
