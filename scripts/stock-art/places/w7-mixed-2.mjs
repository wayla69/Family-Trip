// Wave 7 (mixed group, part 2): Brazil (Rio de Janeiro, Paraty) and Argentina (Buenos Aires, Iguazú, Patagonia, Península Valdés)
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (br/rio/landmark-maracana.v1.svg → br-rio.landmark.maracana)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport): br/food-acai.v1.svg → br.food.acai
const K = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
// a grown-up: a head, a shirt, legs
const adult = (x, y, top, s = 1) => g(x, y, s, C(0, -50, 10, '#E0B48A', 2.5) + P('M-12-38h24l4 30h-32z', top, 2.5) + Lc('M-6-8v30M6-8v30', '#37474F', 6) + face(0, -48, 0.25));
// a mirrored group (faces the other way)
const flip = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${-s} ${s})">${inner}</g>`;
const dog = (col, ear) => E(0, 0, 18, 10, col, 2.5) + Lc('M-12 8v12M-4 8v12M6 8v12M14 8v12', INK, 3) + Lc('M-18-2c-6-4-8-10-6-14', INK, 3) + C(18, -10, 10, col, 2.5) + E(13, -18, 4, 7, ear, 2) + C(27, -10, 2.5, INK, 0) + C(19, -12, 1.8, INK, 0) + R(10, -4, 10, 4, '#E53935', 1, 1.5);
const bfly = (x, y, s, c1, c2, rot = 0) => g(x, y, s, E(-9, -7, 10, 9, c1, 2) + E(9, -7, 10, 9, c1, 2) + E(-7, 7, 7, 6, c2, 2) + E(7, 7, 7, 6, c2, 2) + E(0, 0, 2.5, 11, INK, 0) + Lc('M0-10l-5-8M0-10l5-8', INK, 1.5), rot);
const hand = (x, y, s, rot, spray) => g(x, y, s, C(0, -6, 26, spray, 0) + R(-12, -12, 24, 26, '#E8C39E', 9, 0) + [[-10, -20, -14], [-4, -24, -4], [3, -24, 4], [10, -20, 12]].map(([fx, fy, r]) => g(fx, fy, 1, R(-3.5, -12, 7, 20, '#E8C39E', 3.5, 0), r)).join('') + g(-14, 2, 1, R(-3.5, -10, 7, 16, '#E8C39E', 3.5, 0), -50), rot);

const items = [
  // ---------- Brazil
  K('br', 'food', 'acai', 'อาซาอีโบวล์', 'An açaí bowl', ['acai', 'açaí', 'อาซาอี', 'acai bowl', 'อาซาอีโบวล์', 'purple berry', 'เบอร์รีสีม่วง', 'banana', 'กล้วย', 'granola', 'brazilian snack'],
    // a bowl heaped with thick purple açaí, topped with banana slices, crunchy granola and strawberries, a spoon stuck in, the bowl smiling
    P('M32 120h176c-4 52-40 84-88 84s-84-32-88-84z', '#FFFFFF') + Lc('M44 142c40 10 112 10 152 0', '#7B1FA2', 3) + E(120, 118, 88, 22, '#6A1B9A') + P('M50 116c10-20 40-30 70-30s60 10 70 30z', '#7B1FA2')
      + [[76, 104], [96, 96], [118, 100]].map(([x, y]) => C(x, y, 10, '#FFF59D', 2.5) + C(x, y, 2, '#BCAAA4', 0)).join('') + [[140, 98], [150, 106], [160, 96], [134, 108], [168, 106]].map(([x, y]) => R(x - 4, y - 3, 8, 6, '#D7A86E', 1, 1.5)).join('')
      + [[60, 112], [180, 112]].map(([x, y]) => P(`M${x - 9} ${y - 4}c0-6 18-6 18 0 0 10-6 14-9 16-3-2-9-6-9-16z`, '#E53935', 2.5) + P(`M${x - 5} ${y - 8}l5 4 5-4`, '#43A047', 2)).join('')
      + Lc('M150 92l40-60', '#B0BEC5', 7) + face(120, 164, 0.5)),
  K('br', 'food', 'coxinha', 'โคชินญา ไส้ไก่ทอดรูปหยดน้ำ', 'Coxinha, the chicken drop', ['coxinha', 'โคชินญา', 'chicken croquette', 'ไก่ทอดชุบเกล็ดขนมปัง', 'teardrop snack', 'ของว่างรูปหยดน้ำ', 'brazilian street food', 'อาหารริมทางบราซิล', 'lanchonete', 'salgadinho'],
    // a big golden fried teardrop with a crumb coat and a smile on a paper napkin, and a smaller one bitten open showing its creamy shredded chicken inside
    P('M20 196l100-20 100 20-100 22z', '#FFFFFF') + Lc('M60 196l60-12 60 12', '#E0E0E0', 2)
      + P('M104 32c18 40 58 70 58 110 0 34-26 56-58 56s-58-22-58-56c0-40 40-70 58-110z', '#E9A64C') + [[90, 110], [118, 100], [132, 132], [80, 150], [140, 170], [110, 176], [100, 80]].map(([x, y]) => C(x, y, 2.5, '#C8862F', 0)).join('')
      + face(104, 150, 0.55)
      + g(188, 168, 0.62, P('M0-60c14 30 40 50 40 80 0 26-18 40-40 40s-40-14-40-40c0-30 26-50 40-80z', '#E9A64C') + P('M-30 0c10-16 50-16 60 0-6 22-54 22-60 0z', '#FFE0B2', 3) + Lc('M-16 2l8 6M0-2l4 10M14 2l-6 8', '#E0A060', 3))),
  K('br', 'animal', 'toucan', 'นกทูแคน', 'A toco toucan', ['toucan', 'ทูแคน', 'toco toucan', 'นกทูแคนปากใหญ่', 'big orange beak', 'ปากสีส้มใหญ่', 'rainforest bird', 'นกป่าฝน', 'pantanal', 'amazon'],
    // a black bird with a white bib and a huge orange beak with a black tip, a blue ring round its eye and a red patch under the tail, perched on a branch
    Lc('M20 200c60-10 140-4 200-16', '#6D4C41', 9) + P('M98 196l-6 30h18l-2-28z', '#263238') + E(100, 140, 36, 56, '#263238') + E(116, 104, 20, 22, '#FFFFFF', 3) + E(100, 194, 12, 6, '#E53935', 2.5)
      + P('M126 82c34-16 76-10 100 10-28 10-66 16-98 10z', '#FF9800') + P('M204 86c8 2 16 4 22 6-6 4-14 6-22 8z', INK, 0) + Lc('M130 92c30 0 60-2 94 0', '#E65100', 2)
      + C(122, 86, 10, '#29B6F6', 2.5) + C(122, 86, 4, INK, 0) + C(123.5, 84.5, 1.4, '#FFFFFF', 0) + E(112, 104, 6, 3.5, '#FF8FA3', 0) + Lc('M90 196l-4 8M106 196l4 8', '#78909C', 3)),
  K('br', 'transport', 'hammockboat', 'เรือแม่น้ำแอมะซอนกับเปลญวน', 'An Amazon riverboat full of hammocks', ['amazon riverboat', 'เรือแม่น้ำแอมะซอน', 'hammock boat', 'เรือเปลญวน', 'hammocks', 'เปลญวน', 'manaus', 'มาเนาส์', 'river trip', 'amazon river'],
    // a two-deck white wooden riverboat with a blue stripe on brown river water, colourful hammocks strung across both decks, palm trees on the jungle bank
    P('M8 196c60-8 164-8 224 0v26H8z', '#A1887F') + Lc('M30 208h30M150 212h40', '#D7CCC8', 3) + [[20, 120], [222, 116]].map(([x, y]) => Lc(`M${x} ${y + 70}c2-30 0-50 4-70`, '#6D4C41', 4) + Array.from({ length: 5 }, (_, j) => Lc(`M${x + 4} ${y}q${-14 + j * 7} -10 ${-24 + j * 12} ${4 + Math.abs(j - 2) * 4}`, '#2E7D32', 4)).join('')).join('')
      + R(58, 82, 128, 6, '#1E88E5', 1, 2.5) + R(62, 88, 120, 34, '#FFFFFF', 0, 3) + R(44, 122, 158, 6, '#1E88E5', 1, 2.5) + R(48, 128, 150, 38, '#FFFFFF', 0, 3)
      + Lc('M70 88v34M110 88v34M150 88v34M56 128v38M96 128v38M136 128v38M176 128v38', INK, 2.5)
      + [[70, 92, '#E53935'], [110, 92, '#FDD835'], [150, 92, '#43A047'], [56, 134, '#8E24AA'], [96, 134, '#FB8C00'], [136, 134, '#29B6F6']].map(([x, y, c]) => P(`M${x} ${y}q20 22 40 0q-20 12-40 0z`, c, 2)).join('')
      + P('M30 166h188l-18 30H48z', '#FFFFFF') + Lc('M40 178h168', '#1E88E5', 5) + face(124, 186, 0.36)),

  // ---------- Rio de Janeiro and Paraty
  L('br/rio/landmark-maracana.v1.svg', 'สนามกีฬามาราคานา', 'The Maracanã stadium', ['maracana', 'maracanã', 'มาราคานา', 'football stadium', 'สนามฟุตบอล', 'stadium tour', 'ทัวร์สนามกีฬา', 'big round stadium', 'สนามกลมใหญ่', 'football match'], 'หาสนามกลมใหญ่ที่มีสนามหญ้าสีเขียวอยู่ตรงกลาง', 'Find the big round stadium with the green pitch in the middle',
    // a huge oval stadium seen from above at an angle, a white roof ring, rows of blue and yellow seats, the green pitch with white lines in the middle, a ball, green hills behind
    sky('#B3E5FC') + P('M-4 92c40-36 90-40 130-20s80-20 118 0v40H-4z', '#66BB6A', 3) + E(120, 152, 116, 70, '#ECEFF1') + Lc('M10 170v30M40 196v20M80 210v14M160 210v14M200 196v20M230 170v30', '#B0BEC5', 4)
      + E(120, 144, 104, 58, '#FFFFFF', 3) + E(120, 146, 88, 46, '#42A5F5', 3) + E(120, 146, 76, 38, '#FDD835', 0) + E(120, 146, 68, 32, '#42A5F5', 0)
      + E(120, 148, 56, 24, '#43A047', 3) + Lc('M120 124v48', '#FFFFFF', 2.5)  + Lc('M110 148a10 6 0 1 0 20 0a10 6 0 1 0 -20 0M68 140h10v16h-10M172 140h-10v16h10', '#FFFFFF', 2.5)
      + C(146, 152, 4, '#FFFFFF', 1.5) + face(120, 196, 0.4)),
  L('br/rio/landmark-pedratelegrafo.v1.svg', 'หินเทเลกราโฟ ภาพลวงตาห้อยหน้าผา', 'The Pedra do Telégrafo cliff photo trick', ['pedra do telegrafo', 'pedra do telégrafo', 'หินเทเลกราโฟ', 'cliff photo', 'รูปห้อยหน้าผา', 'optical illusion', 'ภาพลวงตา', 'guaratiba', 'barra de guaratiba', 'hiking viewpoint'], 'หาเด็กที่แกล้งทำเป็นห้อยหน้าผา ทั้งที่พื้นอยู่ใต้เท้านิดเดียว', 'Find the child pretending to hang off a cliff, with the ground just under their feet',
    // a child hanging by their hands from the edge of a big grey rock high above a beach and the sea far below, but just under their feet a grassy ledge where a grown-up takes the photo
    sky('#B3E5FC') + P('M-4 120h248v124H-4z', '#29B6F6', 0) + P('M-4 160c60-14 180-14 248 0v84H-4z', '#FFE082', 0) + P('M150 120c20-30 50-40 94-30v30z', '#43A047', 3) + Lc('M20 140h30M90 134h40', '#B3E5FC', 3)
      + P('M-4 40h126c18 0 26 10 26 24v30H-4z', '#9E9E9E', 3) + Lc('M20 60h30M70 76h24', '#BDBDBD', 3)
      + g(134, 84, 1.3, Lc('M-6 0v14M6 0v14', '#FFE0BD', 5) + C(0, 22, 9, '#FFE0BD', 2) + P('M-9 30h18v20H-9z', '#E53935', 2) + Lc('M-4 50v14M4 50v14', '#1565C0', 5) + face(0, 22, 0.24, 'o'))
      + P('M84 182h160v62H84z', '#8BC34A', 3) + Lc('M100 196l4-6M140 204l4-6M220 200l4-6', '#558B2F', 2.5) + adult(200, 210, '#7E57C2', 1) + R(180, 156, 12, 16, '#37474F', 2, 2) + Lc('M190 168l8 2', '#E0B48A', 4)),
  L('br/rio/landmark-paraty.v1.svg', 'ถนนหินที่น้ำทะเลท่วมในปาราตี', 'Paraty\'s streets at high tide', ['paraty', 'ปาราตี', 'colonial town', 'เมืองยุคอาณานิคม', 'cobblestone streets', 'ถนนหินก้อนใหญ่', 'high tide', 'น้ำขึ้น', 'colourful doors', 'saveiro boats'], 'หาถนนหินก้อนใหญ่ที่มีน้ำทะเลไหลเข้ามาท่วม', 'Find the street of big round stones with seawater flowing over it',
    // a row of white colonial houses with doors and windows framed in bright blue, yellow and green, tile roofs, a street of big round cobblestones with seawater lapping over it, a colourful wooden boat at the end
    sky('#B3E5FC') + [[-4, 60, '#1E88E5'], [62, 50, '#FDD835'], [128, 64, '#43A047'], [188, 54, '#E53935']].map(([x, h, c]) => R(x, 140 - h - 40, 64, h + 40, '#FAFAFA', 0, 3) + P(`M${x - 4} ${140 - h - 38}h72l-8-12h-56z`, '#BF6B4E', 2.5)
        + R(x + 8, 140 - h - 20, 16, 18, '#B3E5FC', 0, 2) + Lc(`M${x + 6} ${140 - h - 22}h20v22h-20z`, c, 3) + R(x + 36, 104, 18, 36, c, 0, 2.5) + R(x + 40, 108, 10, 28, '#FAFAFA', 0, 0)).join('')
      + P('M-4 140h248v104H-4z', '#B0BEC5', 0) + Array.from({ length: 18 }, (_, k) => E(10 + (k % 6) * 42 + (Math.floor(k / 6) % 2) * 20, 152 + Math.floor(k / 6) * 26, 16, 9, '#CFD8DC', 2)).join('')
      + P('M-4 196c40-8 80 4 124-4s90 6 124-2v54H-4z', '#4FC3F7', 0) + Lc('M14 214h30M90 226h40M170 210h36', '#E1F5FE', 3) + [[60, 204], [150, 220]].map(([x, y]) => E(x, y, 14, 6, '#CFD8DC', 2)).join('')
      + g(196, 220, 1, P('M-34-8h68l-10 18h-48z', '#FFCA28', 2.5) + Lc('M-30-2h60', '#1E88E5', 4) + R(-10, -20, 20, 12, '#E53935', 2, 2)) + face(158, 92, 0.32)),
  L('br/rio/landmark-beachvendor.v1.svg', 'คนขายชาเย็นบนชายหาดริโอ', 'The iced-tea seller on Rio\'s beach', ['beach vendor', 'คนขายของบนชายหาด', 'mate gelado', 'ชามาเตเย็น', 'iced tea', 'ชาเย็น', 'polvilho biscuits', 'ขนมห่วงโปวิลโย', 'ipanema beach', 'copacabana beach'], 'หาถังเงินแวววาวสองใบที่ใส่ชาเย็น', 'Find the two shiny silver tanks full of iced tea',
    // a beach seller in a big hat carrying two shiny silver tanks with taps on a shoulder strap and a pole hung with bags of ring biscuits, striped beach umbrellas, the sea, a child with a cup
    sky('#B3E5FC') + P('M-4 100h248v40H-4z', '#0288D1', 0) + Lc('M10 116h30M150 124h40', '#81D4FA', 3) + P('M-4 136h248v108H-4z', '#FFE082', 0)
      + [[36, 132, '#E53935'], [206, 128, '#43A047']].map(([x, y, c]) => Lc(`M${x} ${y}v60`, '#8D6E63', 3) + P(`M${x - 30} ${y + 4}c4-24 56-24 60 0z`, c, 2.5) + Lc(`M${x - 10} ${y - 12}v16M${x + 10} ${y - 12}v16`, '#FFFFFF', 4)).join('')
      + adult(120, 214, '#FB8C00', 1.3) + P('M100 140c4-14 36-14 40 0z', '#FFF8E1', 2.5) + E(120, 140, 26, 5, '#FFF8E1', 2.5)
      + [[86, 172], [154, 172]].map(([x, y]) => R(x - 15, y - 30, 30, 50, '#CFD8DC', 8, 3) + Lc(`M${x - 15} ${y - 16}h30M${x - 15} ${y + 6}h30`, '#90A4AE', 2) + R(x - 3, y + 20, 6, 8, '#607D8B', 1, 2) + Lc(`M${x - 8} ${y - 22}v34`, '#FFFFFF', 3)).join('') + Lc('M86 142l34-30 34 30', '#5D4037', 3) + face(86, 166, 0.3)
      + Lc('M160 120l40-50', '#A1887F', 4) + [[186, 76], [174, 92]].map(([x, y]) => R(x - 9, y, 18, 22, '#FFFFFF', 3, 2) + C(x, y + 11, 5, 'none', 2)).join('') + kid(42, 230, '#1E88E5', 1.2) + R(50, 202, 8, 10, '#FFCC80', 1, 2)),
  L('br/rio/landmark-sandcastle.v1.svg', 'ปราสาททรายยักษ์ที่โคปาคาบานา', 'A giant sandcastle on Copacabana', ['sand castle', 'ปราสาททราย', 'sand sculpture', 'ประติมากรรมทราย', 'copacabana beach', 'หาดโคปาคาบานา', 'build in the sand', 'ก่อทราย', 'bucket and spade', 'ถังกับพลั่ว'], 'หาปราสาทใหญ่ที่ทำจากทรายทั้งหลัง', 'Find the big castle made all of sand',
    // a big sculpted sandcastle with round towers, little battlements and an arched gate decorated with shells, on a golden beach by the sea, a child with a bucket and spade
    sky('#B3E5FC') + P('M-4 96h248v40H-4z', '#29B6F6', 0) + Lc('M-4 130c30-6 60 6 90 0s60-6 90 0 50 4 68 0', '#FFFFFF', 4) + P('M-4 132h248v112H-4z', '#FFE082', 0)
      + P('M30 206c20-10 160-10 180 0v10H30z', '#F0C46E', 3) + R(60, 140, 120, 66, '#F5CF7E', 0, 3) + Array.from({ length: 6 }, (_, k) => R(62 + k * 20, 132, 12, 10, '#F5CF7E', 0, 2.5)).join('')
      + [[50, 112], [190, 112], [120, 92]].map(([x, top]) => R(x - 16, top, 32, 206 - top, '#F7D68E', 0, 3) + Array.from({ length: 3 }, (_, j) => R(x - 16 + j * 12, top - 10, 8, 10, '#F7D68E', 0, 2.5)).join('') + R(x - 4, top + 16, 8, 12, '#8D6E63', 4, 2)).join('')
      + P('M104 206v-28a16 16 0 0 1 32 0v28z', '#C8964F', 3) + [[80, 170, '#F8BBD0'], [160, 170, '#FFFFFF'], [120, 150, '#F8BBD0']].map(([x, y, c]) => P(`M${x - 6} ${y + 4}l6-10 6 10z`, c, 2)).join('') + face(120, 112, 0.36)
      + kid(206, 232, '#E53935', 1.2) + P('M218 222h14l-2 12h-10z', '#29B6F6', 2) + Lc('M226 222q0-8 4-8', INK, 1.5)),
  L('br/rio/landmark-museumoftomorrow.v1.svg', 'พิพิธภัณฑ์แห่งวันพรุ่งนี้ริมอ่าวกวานาบารา', 'The Museum of Tomorrow by the bay', ['museum of tomorrow', 'พิพิธภัณฑ์แห่งวันพรุ่งนี้', 'museu do amanhã', 'praça mauá', 'จัตุรัสเมาอา', 'science museum', 'พิพิธภัณฑ์วิทยาศาสตร์', 'porto maravilha', 'futuristic building'], 'หาตึกสีขาวที่มีหลังคาเหมือนก้างปลายักษ์', 'Find the white building with a roof like a giant fish skeleton',
    // a long low white building on the waterfront with a huge pointed roof stretching out at both ends, ribbed like a fish skeleton with fins along its back, a long reflecting pool in front, the bay behind
    sky('#E1F5FE') + P('M-4 120h248v40H-4z', '#4FC3F7', 0) + Lc('M14 132h30M180 136h40', '#B3E5FC', 3) + P('M-4 160h248v84H-4z', '#E0E0E0', 0)
      + R(40, 146, 160, 20, '#B3E5FC', 0, 3) + Lc('M60 146v20M80 146v20M100 146v20M120 146v20M140 146v20M160 146v20M180 146v20', '#81D4FA', 2)
      + P('M2 150L120 104L238 150L120 132z', '#FAFAFA', 3) + Lc(Array.from({ length: 13 }, (_, k) => { const x = 24 + k * 16, top = 150 - (46 - Math.abs(x - 120) * 0.39) - 18; return `M${x} ${(150 - (46 - Math.abs(x - 120) * 0.39) + 4).toFixed(1)}L${x + (x - 120) * 0.12} ${top.toFixed(1)}`; }).join(''), INK, 3)
      + R(30, 184, 180, 22, '#29B6F6', 3, 3) + Lc('M60 194h120', '#E1F5FE', 2.5) + kid(26, 232, '#43A047', 1.1) + face(120, 156, 0.3)),

  // ---------- Argentina
  K('ar', 'food', 'empanadas', 'เอมปานาดา พายพับขอบจีบ', 'Empanadas', ['empanadas', 'เอมปานาดา', 'empanada', 'half-moon pies', 'พายครึ่งวงกลม', 'repulgue', 'ขอบจีบ', 'beef filling', 'ไส้เนื้อ', 'argentine food'],
    // three golden half-moon pies with a twisted braided edge on a wooden board, one cut open to show its beef, egg and olive filling, the middle one smiling
    R(14, 160, 212, 40, '#A1673F', 14) + Lc('M30 176h180', '#8D5524', 2)
      + [[60, 152, 0.8, -12], [176, 152, 0.8, 12]].map(([x, y, s, r]) => g(x, y, s, P('M-54 0a54 44 0 0 1 108 0z', '#E9A64C') + Lc('M-50-6c4-4 8 4 12 0s8-4 12 0 8 4 12 0 8-4 12 0 8 4 12 0 8-4 12 0 8 4 12 0 8-4 12 0', '#C8862F', 3), r)).join('')
      + g(122, 168, 1, P('M-60 0a60 50 0 0 1 120 0z', '#F0B25C') + Lc('M-58-4c4-6 8 2 12-2s8-6 12-2 8 4 12 0 8-4 12 0 8 4 12 0 8-4 12 0 8 4 12 0 8-4 12 0 8 4 12 0', '#C8862F', 3) + face(0, -22, 0.48))
      + g(184, 214, 0.55, P('M-54 0a54 44 0 0 1 108 0z', '#E9A64C') + P('M-44 0a44 30 0 0 1 88 0z', '#8D4E2A', 3) + C(-14, -10, 6, '#FFF59D', 2) + C(12, -12, 5, '#558B2F', 2))),
  K('ar', 'animal', 'condor', 'แร้งคอนดอร์แอนดีส', 'An Andean condor soaring', ['andean condor', 'แร้งคอนดอร์', 'condor', 'คอนดอร์', 'giant wings', 'ปีกใหญ่', 'andes', 'เทือกเขาแอนดีส', 'colca canyon', 'biggest flying bird'],
    // a big black bird gliding with its huge wings spread wide, long finger feathers at the wing tips, white patches on the wings, a fluffy white collar and a bald pinkish head
    P('M120 110C90 92 50 84 8 96l12 6-10 8 16 2-6 10 18-2-2 10 18-6c20 4 40 4 56-6z', '#212121') + P('M120 110C150 92 190 84 232 96l-12 6 10 8-16 2 6 10-18-2 2 10-18-6c-20 4-40 4-56-6z', '#212121')
      + Lc('M100 104c-20-6-44-8-66-4M140 104c20-6 44-8 66-4', '#FAFAFA', 5) + E(120, 124, 22, 36, '#212121') + P('M110 158l10 20 10-20z', '#212121') + E(120, 92, 20, 9, '#FFFFFF', 3)
      + C(120, 76, 13, '#E0A99A', 3) + P('M114 64c2-6 10-6 12 0z', '#8D6E63', 2) + P('M128 78c8 0 12 4 10 10-4-2-8-4-10-4z', '#ECEFF1', 2) + face(118, 76, 0.28, 'none')),
  K('ar', 'animal', 'anteater', 'ตัวกินมดยักษ์', 'A giant anteater', ['giant anteater', 'ตัวกินมดยักษ์', 'oso hormiguero', 'long snout', 'จมูกยาว', 'bushy tail', 'หางพุ่ม', 'ants', 'มด', 'ibera wetlands'],
    // a shaggy brown animal with a very long thin snout and a tiny eye, a black and white stripe across its shoulder, a big bushy tail, sticking out a long pink tongue at a line of ants
    P('M60 130c-40-30-50-80-26-92 10 24 30 56 44 76z', '#6D4C41') + Lc('M44 60l10 20M36 80l14 16', '#8D6E63', 3)
      + E(118, 136, 62, 34, '#8D6E63') + P('M84 112c20 6 48 30 70 50l-10 6c-24-18-48-36-66-44z', INK, 0) + P('M92 106c20 6 44 28 64 46l-6 6c-20-18-42-38-62-44z', '#FFFFFF', 0)
      + P('M168 118c26 4 48 14 60 26-4 4-50-4-62-10z', '#8D6E63') + Lc('M228 144c4 8 0 20-10 24', '#F48FB1', 3) + C(176, 124, 3, INK, 0) + E(172, 132, 6, 3.5, '#FF8FA3', 0)
      + [[80, 168], [104, 170], [136, 170], [158, 166]].map(([x, y]) => Lc(`M${x} ${y}v26`, '#6D4C41', 9) + Lc(`M${x - 4} ${y + 28}h10`, INK, 2.5)).join('')
      + [[196, 196], [208, 192], [220, 198], [232, 192]].map(([x, y]) => E(x, y, 3.5, 2.5, INK, 0) + C(x + 4, y - 1, 2, INK, 0)).join('')),

  // ---------- Buenos Aires and Iguazú
  L('ar/buenosaires/landmark-rosedal.v1.svg', 'สวนกุหลาบโรเซดัลในปาเลร์โม', 'El Rosedal, the rose garden of Palermo', ['el rosedal', 'โรเซดัล', 'rose garden', 'สวนกุหลาบ', 'palermo woods', 'สวนปาเลร์โม', 'white bridge', 'สะพานสีขาว', 'bosques de palermo', 'paddle boats'], 'หาสะพานสีขาวที่ข้ามทะเลสาบท่ามกลางดอกกุหลาบ', 'Find the white bridge over the lake among the roses',
    // a white arched bridge with little railings over a calm lake, pink and red rose bushes in front, a white pergola, tall park trees behind
    sky('#E1F5FE') + [[30, 90], [100, 80], [180, 88], [222, 96]].map(([x, y]) => C(x, y, 26, '#66BB6A', 2.5)).join('') + P('M-4 120h248v80H-4z', '#4FC3F7', 0) + Lc('M20 180h40M170 186h40', '#B3E5FC', 3)
      + P('M34 150q86-70 172 0h-16q-70-50-140 0z', '#FFFFFF', 3) + Lc('M44 136q76-56 152 0', INK, 2.5) + Lc(Array.from({ length: 9 }, (_, k) => { const x = 56 + k * 16, y = 144 - (1 - ((x - 120) / 80) ** 2) * 36; return `M${x} ${y.toFixed(1)}v-12`; }).join(''), INK, 2)
      + P('M-4 196c40-10 80-4 124-8s90 6 124 2v54H-4z', '#66BB6A', 0) + R(196, 120, 6, 70, '#FFFFFF', 0, 2.5) + R(226, 120, 6, 70, '#FFFFFF', 0, 2.5) + P('M190 124q24-24 48 0', 'none', 4)
      + [[30, 208], [70, 214], [112, 210], [154, 214], [196, 208], [228, 216]].map(([x, y], k) => C(x, y, 16, '#43A047', 2.5) + [[-6, -4], [6, -6], [0, 6]].map(([dx, dy]) => C(x + dx, y + dy, 5, k % 2 ? '#E53935' : '#F48FB1', 1.5)).join('')).join('') + face(120, 121, 0.2)),
  L('ar/buenosaires/landmark-dogwalker.v1.svg', 'คนพาสุนัขเดินเล่นทีละหลายตัว', 'A dog walker with a whole pack of dogs', ['dog walker', 'คนพาสุนัขเดินเล่น', 'paseaperros', 'ปาเซอาเปร์โรส', 'lots of dogs', 'หมาหลายตัว', 'palermo park', 'สวนปาเลร์โม', 'recoleta', 'leashes'], 'หาคนที่จูงสุนัขพร้อมกันหลายตัว', 'Find the person walking lots and lots of dogs at once',
    // a dog walker in the park holding a fan of leads tied to eight happy dogs of every size and colour trotting round them, green lawn and trees
    sky('#E3F2FD') + [[30, 70], [200, 66]].map(([x, y]) => Lc(`M${x} ${y + 40}v-20`, '#6D4C41', 5) + C(x, y, 26, '#66BB6A', 2.5)).join('') + P('M-4 110h248v134H-4z', '#9CCC65', 0)
      + Lc('M120 150L40 142M120 150L48 192M120 150L70 214M120 150L100 222M120 150L150 220M120 150L182 210M120 150L196 190M120 150L200 146', '#E53935', 1.5)
      + adult(120, 200, '#1E88E5', 1.4)
      + [[40, 150, 0.8, '#FFFFFF', '#8D6E63', -1], [48, 200, 1, '#FFCC80', '#A1673F', -1], [70, 222, 0.7, '#8D6E63', '#5D4037', -1], [100, 230, 0.6, '#212121', '#424242', -1], [150, 228, 0.7, '#FFF59D', '#C8862F', 1], [182, 218, 0.9, '#BDBDBD', '#757575', 1], [196, 196, 1.1, '#D7A86E', '#8D5524', 1], [202, 152, 0.75, '#ECEFF1', '#212121', 1]]
        .map(([x, y, s, c, ear, d]) => (d > 0 ? g(x, y, s, dog(c, ear)) : flip(x, y, s, dog(c, ear)))).join('')),
  L('ar/buenosaires/landmark-gomero.v1.svg', 'ต้นยางยักษ์แห่งเรโกเลตา', 'The giant rubber tree of Recoleta', ['gomero de la recoleta', 'ต้นยางยักษ์เรโกเลตา', 'giant rubber tree', 'ต้นยางยักษ์', 'propped branches', 'กิ่งค้ำไม้', 'plaza francia', 'recoleta', 'huge old tree', 'ต้นไม้เก่าแก่'], 'หาต้นไม้ยักษ์ที่วางกิ่งยาวๆ พักบนไม้ค้ำ', 'Find the giant tree resting its long arms on wooden crutches',
    // an enormous old tree with a thick knobbly trunk, huge long branches stretching far out to the sides and resting on wooden crutch posts, a wide dark green crown, children playing underneath
    sky('#E1F5FE') + P('M-4 196h248v48H-4z', '#9CCC65', 0)
      + P('M-4 90c10-40 60-60 124-60s116 20 124 60c-20 20-60 26-124 26S6 110-4 90z', '#2E7D32') + [[40, 70], [100, 50], [170, 56], [210, 80]].map(([x, y]) => C(x, y, 18, '#388E3C', 0)).join('')
      + P('M118 110c-30 6-70 10-120 16v14c50-4 90-8 120-14zM122 104c30 6 70 12 126 20v14c-56-6-96-12-126-18z', '#8D6E63', 3)
      + P('M96 200c10-30 10-70 4-96h40c-6 26-6 66 4 96 8 4 12 4 18 4H80c6 0 12 0 16-4z', '#8D6E63') + Lc('M110 130c4 20 0 40 4 60M128 128c-2 20 2 40-2 60', '#6D4C41', 3)
      + [[30, 132], [70, 128], [180, 130], [222, 136]].map(([x, y]) => Lc(`M${x} ${y}v${196 - y}`, '#D7B074', 6) + Lc(`M${x - 8} ${y - 6}l8 6 8-6`, '#D7B074', 4)).join('')
      + face(120, 160, 0.42) + kid(52, 218, '#E53935', 1.1) + kid(190, 220, '#FDD835', 1.1)),
  L('ar/buenosaires/landmark-puentedelamujer.v1.svg', 'สะพานปวยนเตเดลามูเฮร์ที่ปวยร์โตมาเดโร', 'The Puente de la Mujer in Puerto Madero', ['puente de la mujer', 'ปวยนเตเดลามูเฮร์', 'woman\'s bridge', 'สะพานแห่งสตรี', 'puerto madero', 'ปวยร์โตมาเดโร', 'turning bridge', 'สะพานหมุน', 'old docks', 'red brick warehouses'], 'หาสะพานสีขาวที่มีเสาเอียงยาวเพียงต้นเดียว', 'Find the white bridge with one tall leaning arm',
    // a slim white footbridge over the dock water with a single tall mast leaning back and fanned cables holding the deck, red brick dock warehouses and tall glass towers behind
    sky('#E1F5FE') + [[150, 30, 30], [190, 46, 34]].map(([x, y, w]) => R(x, y, w, 110 - y + 30, '#B3E5FC', 0, 2.5) + Lc(`M${x + 8} ${y + 10}v${110 - y}M${x + w - 8} ${y + 10}v${110 - y}`, '#81D4FA', 2)).join('')
      + R(-4, 100, 140, 40, '#B5533C', 0, 3) + Lc(Array.from({ length: 6 }, (_, k) => `M${8 + k * 22} 110v18`).join(''), '#FFE0B2', 5) + P('M-4 100l20-14h100l20 14z', '#8D6E63', 3)
      + P('M-4 140h248v104H-4z', '#0288D1', 0) + Lc('M20 200h30M160 210h40M90 228h30', '#81D4FA', 3)
      + Lc('M96 140L60 162M96 140L84 162M96 140L108 162M96 140L132 162M96 140L156 162M96 140L180 162', '#90A4AE', 1.5)
      + P('M96 166L62 34l8-2 38 134z', '#FAFAFA', 3) + Lc('M66 34L36 162M66 34L60 162M66 34L84 162M66 34L120 162M66 34L150 162M66 34L180 162', '#B0BEC5', 1.5)
      + R(10, 160, 220, 9, '#FAFAFA', 0, 3) + R(88, 166, 20, 34, '#ECEFF1', 0, 3) + Lc('M10 160h220', INK, 2) + face(98, 184, 0.28) + kid(160, 158, '#FB8C00', 0.9)),
  L('ar/buenosaires/landmark-iguazubutterflies.v1.svg', 'ผีเสื้อหลากสีที่อีกวาซู', 'The butterflies of Iguazú', ['butterflies', 'ผีเสื้อ', 'iguazu butterflies', 'ผีเสื้ออีกวาซู', 'blue morpho', 'ผีเสื้อมอร์โฟสีฟ้า', '88 butterfly', 'rainforest trail', 'ทางเดินในป่าฝน', 'iguazú national park'], 'หาผีเสื้อที่เกาะอยู่บนหมวกของเด็ก', 'Find the butterfly resting on the child\'s hat',
    // a child in a sun hat on a rainforest trail among huge leaves, colourful butterflies of blue, orange and yellow fluttering all round, one sitting on the hat brim, misty spray in the distance
    sky('#C8E6C9') + P('M120 30c30 0 60 20 70 50-40-6-100-6-140 0 10-30 40-50 70-50z', '#FFFFFF', 0) + Lc('M70 60c20-10 80-10 100 0', '#E8F5E9', 6)
      + [[10, 120, -30], [230, 110, 30], [30, 200, -60], [214, 200, 60]].map(([x, y, r]) => g(x, y, 1, P('M0 0c-20-30-10-70 10-80 20 10 30 50 10 80z', '#43A047') + Lc('M2-4l6-66', '#2E7D32', 2), r)).join('')
      + P('M-4 214c80-10 160-10 248 0v30H-4z', '#A1887F', 0)
      + g(120, 214, 1.8, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#FB8C00', 2) + E(0, -27, 14, 3.5, '#FFF59D', 2) + P('M-7-27c0-8 14-8 14 0z', '#FFF59D', 2) + face(0, -18, 0.22))
      + bfly(132, 170, 0.9, '#FFFFFF', '#E53935', 10) + bfly(60, 90, 1.2, '#1E88E5', '#64B5F6', -20) + bfly(180, 70, 1, '#FB8C00', '#FFCA28', 20) + bfly(70, 160, 0.8, '#FFEB3B', '#FB8C00', -10) + bfly(176, 140, 0.9, '#7E57C2', '#B39DDB', 15) + bfly(120, 96, 0.7, '#E53935', '#FFCA28', 0)),

  // ---------- Patagonia
  L('ar/patagonia/landmark-cuevadelasmanos.v1.svg', 'ถ้ำแห่งมือ กูเอบาเดลาสมาโนส', 'The Cave of the Hands', ['cueva de las manos', 'กูเอบาเดลาสมาโนส', 'cave of the hands', 'ถ้ำแห่งมือ', 'hand stencils', 'ภาพลายมือ', 'rock art', 'ภาพเขียนบนหิน', 'pinturas river', 'ancient paintings'], 'หามือเล็กๆ ของเด็กที่ยกขึ้นเทียบกับรอยมือโบราณ', 'Find the child\'s little hand held up beside the old painted hands',
    // a sandy cave wall covered with stencilled hands outlined in sprays of red, orange, white and black paint, a little painted guanaco, a child holding up their own hand to compare
    sky('#5D4037') + P('M-4 244V30c40-30 200-30 248 0v214z', '#E8C39E', 3) + Lc('M30 60c10 4 20 0 30 4M150 50c10 4 30 0 40 6M20 150c10-4 20 4 30 0', '#D4A77A', 3)
      + hand(60, 92, 1, -10, '#C62828') + hand(116, 74, 0.9, 6, '#FB8C00') + hand(176, 100, 1, 14, '#212121') + hand(80, 160, 0.85, -18, '#FFFFFF') + hand(150, 156, 0.95, 4, '#C62828') + hand(206, 172, 0.8, 22, '#FB8C00')
      + g(30, 200, 1, E(0, 0, 14, 7, '#C62828', 0) + Lc('M10-4l6-14M-8 6v10M-2 6v10M6 6v10M12 6v10', '#C62828', 3) + E(17, -20, 5, 4, '#C62828', 0))
      + g(120, 238, 1.4, kid(0, 0, '#1E88E5', 1) + Lc('M8-6l10-16', '#FFE0BD', 4) + C(20, -26, 5, '#FFE0BD', 2))),
  L('ar/patagonia/landmark-arrayanes.v1.svg', 'ป่าต้นอาร์ราจาเนสเปลือกสีอบเชย', 'The cinnamon-coloured Arrayanes forest', ['bosque de arrayanes', 'ป่าอาร์ราจาเนส', 'arrayanes', 'myrtle trees', 'ต้นเมอร์เทิล', 'cinnamon bark', 'เปลือกสีอบเชย', 'villa la angostura', 'boardwalk', 'nahuel huapi'], 'หาต้นไม้ที่มีเปลือกสีส้มเหมือนอบเชย', 'Find the trees with orange bark like cinnamon',
    // a forest of twisting trees with smooth bright cinnamon-orange bark patched with white, small dark green leaves above, a wooden boardwalk with a rail winding through, a child walking on it
    sky('#C5E1A5') + [[20, 0.9], [62, 1.1], [150, 1], [200, 1.2], [104, 0.8]].map(([x, s]) => g(x, 0, s, P('M-10 240c-4-60 10-110-2-170-4-20 10-40 6-70h12c-4 30 6 50 2 70-8 60 4 110 0 170z', '#E07B39') + E(-2, 160, 4, 7, '#FFF3E0', 0) + E(4, 110, 3, 6, '#FFF3E0', 0) + E(-4, 60, 3, 5, '#FFF3E0', 0))).join('')
      + Array.from({ length: 12 }, (_, k) => C((k * 41) % 240, 18 + (k % 3) * 18, 18, ['#2E7D32', '#388E3C', '#1B5E20'][k % 3], 0)).join('')
      + P('M-4 220c60-30 120-34 248-20v18c-120-10-180-8-248 20z', '#A1673F', 3) + Lc('M-4 206c60-30 120-34 248-20', '#8D5524', 3) + Lc('M30 194v18M90 180v18M150 176v18M210 180v18', '#8D5524', 3)
      + kid(126, 204, '#FDD835', 1.2) + face(62, 150, 0.3)),
  L('ar/patagonia/landmark-petrifiedforest.v1.svg', 'ป่าหินโบราณแห่งปาตาโกเนีย', 'The petrified forest of Patagonia', ['petrified forest', 'ป่าหิน', 'bosque petrificado', 'jaramillo', 'stone trees', 'ต้นไม้กลายเป็นหิน', 'giant fossil logs', 'ซุงฟอสซิล', 'tree rings', 'วงปีต้นไม้'], 'หาลำต้นไม้ที่กลายเป็นหินไปแล้ว', 'Find the tree trunk that has turned into stone',
    // a huge stone tree trunk lying on the dry desert, its cut end showing colourful stone tree rings, striped red and cream hills behind, a child sitting on top of the log
    sky('#FFE0B2') + P('M-4 120c30-20 50-20 70-6s40-30 70-24 40 20 60 10 30-6 48 4v40H-4z', '#D84315', 3) + Lc('M-4 130c40-6 80 4 120-2s80 4 128-2', '#FFCCBC', 5) + P('M-4 140h248v104H-4z', '#E6C9A0', 0)
      + [[40, 200], [200, 214], [80, 228]].map(([x, y]) => E(x, y, 8, 4, '#BCAAA4', 2)).join('')
      + P('M30 160h150v50H30z', '#A1887F', 3) + Lc('M50 170c20 4 50-4 80 2M44 196c30 4 70-6 120 0', '#8D6E63', 3)
      + E(180, 185, 20, 25, '#BCAAA4', 3) + E(180, 185, 14, 18, '#FFB74D', 2) + E(180, 185, 8, 11, '#BA68C8', 2) + E(180, 185, 3, 4, '#5D4037', 0)
      + kid(90, 162, '#43A047', 1.2) + face(110, 186, 0.36)),
  L('ar/patagonia/landmark-calafate.v1.svg', 'พุ่มเบอร์รีกาลาฟาเต', 'The calafate berry bush', ['calafate berries', 'เบอร์รีกาลาฟาเต', 'calafate bush', 'พุ่มกาลาฟาเต', 'el calafate', 'eat one and come back', 'กินแล้วได้กลับมาอีก', 'purple berries', 'เบอร์รีสีม่วง', 'patagonian steppe'], 'หาเบอร์รีสีม่วงเข้มบนพุ่มไม้มีหนาม', 'Find the dark purple berries on the prickly bush',
    // a round prickly bush covered with little dark purple-blue berries and tiny yellow flowers on the steppe, a child picking berries into a bowl with a purple-stained smile, snowy mountains far away
    sky('#E3F2FD') + P('M-4 120l40-30 30 16 40-40 40 30 30-20 68 44z', '#ECEFF1', 3) + P('M-4 124h248v120H-4z', '#D7C9A0', 0)
      + P('M30 210c-14-40 10-84 70-92 56-6 96 30 90 92z', '#558B2F') + Lc('M50 150l-8-4M80 130l-4-8M150 132l6-6M176 160l8-2M60 190l-8 2', '#33691E', 2)
      + [[64, 150], [88, 138], [112, 146], [140, 138], [160, 160], [76, 176], [104, 170], [130, 182], [150, 196], [58, 196], [120, 128]].map(([x, y], k) => C(x, y, 6, k % 2 ? '#3949AB' : '#4A148C', 2) + C(x - 2, y - 2, 1.5, '#FFFFFF', 0)).join('')
      + [[96, 158], [128, 160], [70, 164]].map(([x, y]) => C(x, y, 3.5, '#FDD835', 1.5)).join('')
      + g(200, 220, 1.4, kid(0, 0, '#FB8C00', 1) + E(0, -13, 3, 1.5, '#7B1FA2', 0)) + P('M168 214c0 12 28 12 28 0z', '#FFFFFF', 2.5) + [[176, 212], [184, 210], [190, 213]].map(([x, y]) => C(x, y, 3.5, '#4A148C', 1.5)).join('') + face(110, 196, 0.36)),
  L('ar/patagonia/landmark-windbenttree.v1.svg', 'ต้นไม้ที่ถูกลมพัดจนเอนของปาตาโกเนีย', 'A tree bent by the Patagonian wind', ['patagonian wind', 'ลมปาตาโกเนีย', 'wind-bent tree', 'ต้นไม้ลมพัดเอน', 'windy steppe', 'ทุ่งหญ้าลมแรง', 'flag tree', 'ruta 40', 'strong wind', 'ลมแรง'], 'หาต้นไม้ที่ถูกลมพัดจนเอนไปข้างเดียว', 'Find the tree blown sideways by the strong wind',
    // a lone tree on the open golden steppe with its trunk and leaves all swept to one side by the wind, white wind swirls, a child holding onto a flying hat, long streaky clouds
    sky('#BBDEFB') + Lc('M20 40h60M110 30h90M60 64h70', '#FFFFFF', 7) + P('M-4 160c60-10 180-10 248 0v84H-4z', '#D7C9A0', 0) + Lc('M20 190l6-10M60 210l6-10M180 196l6-10M220 220l6-10', '#A1887F', 3)
      + P('M60 168c4-40 20-70 60-90 30-14 70-16 100-10-30 4-70 14-90 30-20 18-40 40-50 72z', '#6D4C41') + P('M100 84c30-30 80-40 130-30 6 16-20 30-60 34-30 4-60 4-80 0z', '#689F38') + P('M120 70c30-16 70-20 100-14-20 8-60 14-100 14z', '#8BC34A', 2.5)
      + Lc('M20 100c20-10 40 6 60-4s30-10 40-4M10 140c30-10 50 6 80-4', '#FFFFFF', 4) + Lc('M150 130c20-6 34 4 50-4', '#FFFFFF', 4)
      + kid(170, 214, '#E53935', 1.3) + g(206, 172, 1, E(0, 0, 10, 3, '#FFCA28', 2) + P('M-6 0c0-8 12-8 12 0z', '#FFCA28', 2), 25) + face(84, 140, 0.32)),
  L('ar/patagonia/landmark-armadillo.v1.svg', 'ตัวนิ่มขนยาวบนคาบสมุทรบัลเดส', 'A hairy armadillo on Península Valdés', ['hairy armadillo', 'ตัวนิ่มขนยาว', 'armadillo', 'ตัวนิ่ม', 'piche', 'peludo', 'banded shell', 'กระดองเป็นปล้อง', 'valdes wildlife', 'puerto madryn'], 'หาตัวนิ่มที่มีกระดองเป็นปล้องๆ เดินอยู่ในพุ่มไม้', 'Find the armadillo with a stripy banded shell walking through the bushes',
    // a little armadillo with a domed shell of stripy bands and wiry hairs poking out, a pointy snout and small ears, trotting past low grey-green shrubs on the dry steppe by the sea
    sky('#E1F5FE') + P('M-4 110h248v26H-4z', '#4FC3F7', 0) + P('M-4 134h248v110H-4z', '#D7C9A0', 0) + [[30, 150], [200, 146], [60, 214], [220, 222]].map(([x, y]) => C(x, y, 14, '#9E9D24', 2.5) + C(x + 12, y + 4, 10, '#827717', 2.5)).join('')
      + P('M60 186c0-46 30-70 64-70s62 24 62 70z', '#A1887F') + P('M92 186c0-50 12-68 32-68s32 18 32 68z', '#D7CCC8', 0) + P('M108 186c0-54 6-68 16-68s16 14 16 68z', '#A1887F', 0)
      + Lc('M92 186c0-50 12-68 32-68s32 18 32 68M108 186c0-54 6-68 16-68s16 14 16 68', INK, 2.5) + Lc('M66 160c40-8 76-8 116 0', '#6D4C41', 2.5)
      + P('M184 172c18-8 34-4 46 8-12 6-32 8-46 4z', '#D7CCC8') + E(184, 158, 5, 10, '#D7CCC8', 2) + E(194, 160, 4, 9, '#D7CCC8', 2) + C(200, 170, 2.5, INK, 0) + E(198, 178, 4, 2.5, '#FF8FA3', 0)
      + P('M62 180c-14 0-26 4-36 12 12 2 26 0 36-4z', '#BCAAA4') + [[80, 186], [106, 188], [140, 188], [166, 186]].map(([x, y]) => Lc(`M${x} ${y}v14`, '#BCAAA4', 7) + Lc(`M${x - 3} ${y + 16}h8`, INK, 2)).join('') + face(122, 156, 0.4)),
];

export default { places: {}, items };
