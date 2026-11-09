// The passport guides of each country (S8, docs/STOCK-ART.md §5.6 item 6): two animals of the place, each its own portrait
// in the guides' house style (a round head, one thing of its own) — standing in for Kiki and Roo in a book from the library
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const G = (cc, key, th, en, hth, hen, kw, svg) => ({ id: `${cc}.guide.${key}`, cat: 'guide', file: `${cc}/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });
const ear = (d, fill, inner) => P(d, fill) + (inner ? P(inner, '#FFB3C6', 3) : '');

const items = [
  // Japan
  G('jp', 'hana', 'ฮานะ', 'Hana', 'สวัสดี {name}! ฮานะพาเที่ยวญี่ปุ่นเอง', 'Hi {name}! Hana will show you Japan', ['shiba', 'ชิบะ', 'dog', 'หมา'],
    // a shiba inu: fox-like ears, ginger with a cream mask, a red-and-white twisted headband
    ear('M58 92L50 26l50 38z', '#E9964A', 'M64 78l-6-36 28 22z') + ear('M182 92l8-66-50 38z', '#E9964A', 'M176 78l6-36-28 22z') + C(120, 130, 78, '#E9964A') + P('M60 150c10 40 40 58 60 58s50-18 60-58c-20 10-40 0-60-20-20 20-40 30-60 20z', '#FFF3E0', 0) + C(120, 130, 78, 'none')
    + Lc('M46 96c40-18 108-18 148 0', '#FFFFFF', 12) + Lc('M58 90l12 10M86 82l12 10M114 80l12 10M142 82l12 10M170 88l10 10', '#E53935', 5) + E(120, 156, 10, 7, INK) + face(120, 138, 1.5, 'w')),
  G('jp', 'momo', 'โมโมะ', 'Momo', 'โมโมะชอบแช่น้ำร้อน มาเล่นกันนะ {name}', 'Momo loves a hot spring — come and play, {name}', ['snow monkey', 'ลิงหิมะ', 'macaque', 'onsen', 'ออนเซ็น'],
    // a snow monkey: fluffy grey-brown fur round a pink heart-shaped face, a little white towel folded on its head, snowflakes
    C(120, 132, 80, '#A1887F') + [[48, 132], [192, 132]].map(([x, y]) => C(x, y, 16, '#D7A6A6')).join('') + P('M120 92c-40-20-70 20-56 54 10 30 40 44 56 44s46-14 56-44c14-34-16-74-56-54z', '#F4A3A8') + R(84, 44, 72, 22, '#FFFFFF', 8) + Lc('M90 55h60', '#90CAF9', 3)
    + [[30, 60], [210, 70], [200, 200]].map(([x, y]) => Lc(`M${x - 8} ${y}h16M${x} ${y - 8}v16`, '#B3E5FC', 3)).join('') + face(120, 136, 1.5)),
  // Korea
  G('kr', 'bori', 'โบรี', 'Bori', 'อันนยอง {name}! โบรีพาเที่ยวเกาหลีเอง', 'Annyeong, {name}! Bori will show you Korea', ['jindo', 'จินโด', 'dog', 'หมา'],
    // a white Jindo dog with upright triangle ears and a scarf in the bright stripes of saekdong cloth
    ear('M56 96l4-64 46 40z', '#FFF8E1', 'M64 84l2-38 26 24z') + ear('M184 96l-4-64-46 40z', '#FFF8E1', 'M176 84l-2-38-26 24z') + C(120, 128, 76, '#FFF8E1')
    + ['#E53935', '#FFCA28', '#43A047', '#1E88E5', '#EC407A'].map((c, k) => P(`M${52 + k * 28} 196h28l-4 22h-28z`, c, 3)).join('') + E(120, 152, 11, 8, INK) + face(120, 134, 1.5, 'w')),
  G('kr', 'kachi', 'กาชี', 'Kachi', 'กาชีมีข่าวดีมาบอก {name}', 'Kachi brings good news, {name}', ['magpie', 'korean magpie', 'bird', 'นก'],
    // a Korean magpie: a glossy black head, a white belly, a blue-green wing tip, a little norigae tassel ornament hanging from its beak
    C(120, 126, 76, INK) + P('M70 160c10 40 40 56 50 56s40-16 50-56c-20 16-80 16-100 0z', '#FFFFFF') + P('M168 120c30 4 50 20 52 40-20-4-40-14-52-24z', '#26A69A') + P('M112 140l8 14 8-14z', '#FFCA28', 3)
    + Lc('M120 154v26', '#E53935', 3) + P('M114 180h12l-2 20h-8z', '#E53935', 3) + [[100, 120], [140, 120]].map(([x, y]) => C(x, y, 9, '#FFFFFF', 0) + C(x, y, 5, INK, 0)).join('') + [[86, 136], [154, 136]].map(([x, y]) => E(x, y, 9, 5, '#FF8FA3', 0)).join('')),
  // Taiwan
  G('tw', 'hei', 'เฮย', 'Hei', 'หนีห่าว {name}! เฮยพาเที่ยวไต้หวันเอง', 'Ni hao, {name}! Hei will show you Taiwan', ['formosan black bear', 'หมีดำไต้หวัน', 'bear', 'หมี'],
    // a Formosan black bear: round black ears and head, a tan muzzle, the white V of the moon on its chest, a bubble-tea straw tucked behind an ear
    C(60, 64, 24, INK) + C(180, 64, 24, INK) + C(120, 124, 74, '#37474F') + E(120, 152, 30, 22, '#D7B99A') + E(120, 142, 10, 7, INK) + P('M74 196l46 24 46-24-8-8-38 18-38-18z', '#FFFFFF')
    + Lc('M176 60l30-40', '#E53935', 6) + [[100, 112], [140, 112]].map(([x, y]) => C(x, y, 7, '#FFFFFF', 0) + C(x, y, 4, INK, 0)).join('') + Lc('M110 164q10 8 20 0', INK, 3.5) + [[84, 140], [156, 140]].map(([x, y]) => E(x, y, 9, 5, '#FF8FA3', 0)).join('')),
  G('tw', 'miao', 'เหมียว', 'Miao', 'เหมียวรู้ว่าตลาดกลางคืนอยู่ไหน ไปกัน {name}', 'Miao knows where the night market is — let\'s go, {name}', ['leopard cat', 'แมวดาว', 'cat', 'แมว'],
    // a leopard cat: rounded ears with white spots behind, a golden coat with dark spots, white stripes from the eyes, a little paper lantern
    ear('M62 92l2-54 42 30z', '#E9B55A', 'M70 82l2-30 22 18z') + ear('M178 92l-2-54-42 30z', '#E9B55A', 'M170 82l-2-30-22 18z') + C(120, 130, 74, '#E9B55A') + [[80, 100], [150, 96], [70, 150], [172, 152], [120, 88]].map(([x, y]) => E(x, y, 6, 4, '#6D4C41', 0)).join('')
    + Lc('M100 124v-30M140 124v-30', '#FFFFFF', 4) + E(120, 160, 26, 18, '#FFF8E1') + P('M114 150h12l-6 7z', '#F48FB1', 2.5) + Lc('M196 150v20', INK, 3) + E(196, 190, 14, 18, '#E53935', 3) + face(120, 136, 1.4, 'w')),
  // Singapore
  G('sg', 'ollie', 'ออลลี', 'Ollie', 'หวัดดี {name}! ออลลีพาเที่ยวสิงคโปร์เอง', 'Hello, {name}! Ollie will show you Singapore', ['otter', 'นาก', 'smooth-coated otter', 'gardens'],
    // a smooth-coated otter: a sleek brown head with tiny round ears, a pale chin, long whiskers, a drop of water on its nose
    C(64, 72, 14, '#8D6E63') + C(176, 72, 14, '#8D6E63') + E(120, 130, 80, 70, '#8D6E63') + E(120, 166, 48, 28, '#D7CCC8') + E(120, 146, 12, 8, INK) + Lc('M80 152l-30-6M80 160l-30 4M160 152l30-6M160 160l30 4', INK, 2.5)
    + P('M136 112c0-10 8-16 8-16s8 6 8 16c0 6-4 8-8 8s-8-2-8-8z', '#81D4FA', 2.5) + face(120, 126, 1.4)),
  G('sg', 'toki', 'โทกิ', 'Toki', 'โทกิบินนำทางให้ {name} เอง', 'Toki flies ahead to show {name} the way', ['hornbill', 'นกเงือก', 'oriental pied hornbill', 'bird', 'นก'],
    // an oriental pied hornbill: a black head, a big curved yellow-and-cream beak with a casque on top, a white eye patch
    C(100, 128, 70, INK) + P('M140 110c40-4 76 10 90 40-30 8-60 4-90-10z', '#FFE082') + P('M140 110c20-24 50-28 70-18-16 8-40 14-70 18z', '#FFCA28') + Lc('M146 134c26 6 50 8 76 6', INK, 3)
    + E(108, 112, 18, 14, '#FFFFFF', 0) + C(110, 112, 7, INK, 0) + C(112, 110, 2.5, '#FFFFFF', 0) + E(72, 140, 10, 6, '#FF8FA3', 0) + P('M60 196c20 20 60 20 80 0', '#FFFFFF', 4)),
  // Vietnam
  G('vn', 'bin', 'บิน', 'Bin', 'ซินจ่าว {name}! บินพาเที่ยวเวียดนามเอง', 'Xin chào, {name}! Bin will show you Vietnam', ['water buffalo', 'ควาย', 'buffalo', 'rice fields'],
    // a grey water-buffalo calf with short curved horns, wearing a conical nón lá hat tied with a pink ribbon
    P('M54 120c-30-4-40-30-30-40 10 10 22 16 36 16zM186 120c30-4 40-30 30-40-10 10-22 16-36 16z', '#ECEFF1') + C(120, 134, 72, '#90A4AE') + E(120, 172, 36, 24, '#B0BEC5') + E(108, 172, 4, 5, INK) + E(132, 172, 4, 5, INK)
    + P('M40 84L120 20l80 64z', '#F4D58D') + Lc('M70 76l50-40 50 40', '#D7A86E', 3) + Lc('M50 84c20 60 120 60 140 0', '#F48FB1', 4) + face(120, 130, 1.3, 'none')),
  G('vn', 'cha', 'ชา', 'Cha', 'ชาห้อยโหนต้นไม้รอ {name} อยู่นะ', 'Cha is swinging in the trees, waiting for {name}', ['douc langur', 'ค่างห้าสี', 'langur', 'ค่าง', 'son tra'],
    // a red-shanked douc: a white beard round a golden-yellow face, slanted eyes, a dark grey cap, chestnut-red under the chin
    C(120, 128, 78, '#78909C') + P('M70 120c0-30 24-44 50-44s50 14 50 44c0 40-22 70-50 70s-50-30-50-70z', '#FFFFFF') + E(120, 136, 34, 38, '#FFD54F') + P('M90 196c10 14 50 14 60 0-10-6-50-6-60 0z', '#C62828', 3)
    + [[104, 124], [136, 124]].map(([x, y]) => E(x, y, 8, 5, INK, 0)).join('') + E(120, 144, 5, 3, INK, 0) + Lc('M110 156q10 8 20 0', INK, 3.5) + [[94, 144], [146, 144]].map(([x, y]) => E(x, y, 7, 4, '#FF8FA3', 0)).join('')),
  // Indonesia
  G('id', 'oto', 'โอโตะ', 'Oto', 'สลามัต ดาตัง {name}! โอโตะพาเที่ยวเอง', 'Selamat datang, {name}! Oto will show you round', ['orangutan', 'อุรังอุตัง', 'ape', 'borneo', 'sumatra'],
    // an orangutan: shaggy orange hair sticking up, a wide tan face with a big mouth, a frangipani tucked behind its ear
    Array.from({ length: 7 }, (_, k) => P(`M${66 + k * 18} 70l8-26 8 26z`, '#E65100', 3)).join('') + C(120, 130, 76, '#E65100') + P('M74 130c0-34 20-50 46-50s46 16 46 50-20 60-46 60-46-26-46-60z', '#F4C99A')
    + [0, 72, 144, 216, 288].map((a) => g(186, 96, 1, P('M0 0c-4-10 0-18 6-18s8 10-6 18z', '#FFFFFF', 2.5), a)).join('') + C(186, 96, 4, '#FFCA28', 0) + E(120, 168, 22, 10, '#D7A86E', 3) + face(120, 124, 1.4)),
  G('id', 'komo', 'โคโม', 'Komo', 'โคโมตัวใหญ่แต่ใจดีนะ {name}', 'Komo is big but very kind, {name}', ['komodo dragon', 'มังกรโคโมโด', 'komodo', 'โคโมโด', 'lizard'],
    // a Komodo dragon's long head in profile-ish front view: bumpy olive-grey skin, a forked pink tongue, a little batik bandana
    P('M40 130c0-50 40-80 90-80s80 30 80 70c0 30-30 50-80 50H80c-20 0-40-16-40-40z', '#9E9D24') + [[80, 90], [110, 74], [150, 76], [180, 96]].map(([x, y]) => C(x, y, 6, '#827717', 2.5)).join('') + Lc('M120 170l-10 30M110 200l-8 6M110 200l2 8', '#EC407A', 4)
    + P('M70 176c30 20 90 20 120 0l-6 26c-30 12-78 12-108 0z', '#8D6E63') + [[90, 190], [120, 194], [150, 190]].map(([x, y]) => C(x, y, 4, '#FFCA28', 2)).join('') + face(126, 116, 1.5)),
  // France
  G('fr', 'bijou', 'บิฌู', 'Bijou', 'บงชูร์ {name}! บิฌูพาเที่ยวฝรั่งเศสเอง', 'Bonjour, {name}! Bijou will show you France', ['french bulldog', 'เฟรนช์บูลด็อก', 'dog', 'หมา'],
    // a French bulldog: tall bat ears, a fawn face with a dark muzzle, a blue-and-white striped sailor collar, a red beret
    ear('M56 110l-6-74c26 0 50 20 56 44z', '#D7B99A', 'M64 96l-2-46c14 4 26 16 30 30z') + ear('M184 110l6-74c-26 0-50 20-56 44z', '#D7B99A', 'M176 96l2-46c-14 4-26 16-30 30z') + C(120, 134, 72, '#D7B99A') + E(120, 160, 34, 24, '#6D4C41') + E(120, 150, 10, 7, INK)
    + P('M66 196c30 20 78 20 108 0l-6 22c-30 10-66 10-96 0z', '#FFFFFF') + Lc('M74 206c30 10 62 10 92 0', '#1E88E5', 4) + E(150, 66, 30, 12, '#E53935') + Lc('M150 54v-8', INK, 4) + face(120, 132, 1.4, 'none') + Lc('M110 172q10 6 20 0', '#FFFFFF', 3)),
  G('fr', 'lulu', 'ลูลู', 'Lulu', 'ลูลูเดินช้าๆ แต่เห็นทุกอย่างนะ {name}', 'Lulu goes slowly but sees everything, {name}', ['snail', 'หอยทาก', 'escargot', 'garden'],
    // a snail: a big round spiral shell in caramel, a soft pale-green head with two eye-stalks, a tiny striped scarf
    C(140, 130, 66, '#D68A3C') + Lc('M140 130c0-14 20-14 20 0s-30 24-40 0 30-44 56-24 0 70-56 60', '#A0522D', 5) + P('M30 200c0-50 20-90 50-90s40 40 40 90z', '#C5E1A5') + Lc('M60 116l-14-40M90 114l6-40', '#C5E1A5', 7) + C(46, 74, 8, '#C5E1A5', 3) + C(96, 72, 8, '#C5E1A5', 3)
    + R(40, 160, 80, 14, '#E53935', 6) + Lc('M60 160v14M80 160v14M100 160v14', '#FFFFFF', 3) + face(76, 140, 1.2)),
  // United Kingdom
  G('gb', 'robbie', 'ร็อบบี', 'Robbie', 'ฮัลโหล {name}! ร็อบบีพาเที่ยวอังกฤษเอง', 'Hello, {name}! Robbie will show you Britain', ['robin', 'นกโรบิน', 'bird', 'นก'],
    // a round robin: brown head and back, the orange-red breast filling the lower face, a tiny pointed beak, a knitted tartan scarf
    C(120, 128, 78, '#8D6E63') + P('M60 150c0-40 30-60 60-60s60 20 60 60c0 30-30 56-60 56s-60-26-60-56z', '#FF7043') + P('M112 128l8 10 8-10z', '#FFCA28', 3)
    + R(56, 186, 128, 24, '#C62828', 10) + Lc('M76 186v24M100 186v24M124 186v24M148 186v24M56 198h128', '#1B5E20', 3) + face(120, 116, 1.4, 'none')),
  G('gb', 'biscuit', 'บิสกิต', 'Biscuit', 'บิสกิตพา {name} ไปดื่มชาตอนบ่ายนะ', 'Biscuit will take {name} for afternoon tea', ['corgi', 'คอร์กี้', 'dog', 'หมา', 'tea'],
    // a corgi: big upright ears, an orange face with a white blaze down the middle, holding a little teacup in its mouth... beside its chin
    ear('M50 114l10-80 46 50z', '#F0A04B', 'M60 100l6-48 26 30z') + ear('M190 114l-10-80-46 50z', '#F0A04B', 'M180 100l-6-48-26 30z') + C(120, 136, 72, '#F0A04B') + P('M108 70c-4 30-30 50-36 90 10 40 40 50 48 50s38-10 48-50c-6-40-32-60-36-90z', '#FFFFFF', 0) + C(120, 136, 72, 'none') + E(120, 166, 10, 7, INK)
    + P('M170 190h40c0 20-8 28-20 28s-20-8-20-28z', '#FFFFFF') + Lc('M210 196c10 0 10 14 0 14', INK, 3) + Lc('M184 180c-4-6 4-10 0-16', '#BDBDBD', 3) + face(120, 140, 1.4, 'w')),
  // the Netherlands
  G('nl', 'fenna', 'เฟนนา', 'Fenna', 'ฮาโล {name}! เฟนนาพาเที่ยวเนเธอร์แลนด์เอง', 'Hallo, {name}! Fenna will show you the Netherlands', ['cow', 'วัว', 'frisian cow', 'cheese', 'ชีส'],
    // a black-and-white Frisian cow with a pink nose, small horns, a red tulip behind one ear
    P('M66 76c-6-14-2-26 6-30 2 12 6 20 14 24zM174 76c6-14 2-26-6-30-2 12-6 20-14 24z', '#FFF8E1') + E(46, 104, 22, 12, '#FFFFFF') + E(194, 104, 22, 12, '#FFFFFF') + C(120, 124, 72, '#FFFFFF') + P('M70 90c20-10 40 10 30 30s-30 10-40-10zM160 120c10-20 26-20 30-6-6 16-20 20-30 6z', INK, 0)
    + E(120, 170, 40, 26, '#F8BBD0') + E(106, 170, 5, 6, INK) + E(134, 170, 5, 6, INK) + Lc('M200 92l10-24', '#43A047', 4) + P('M200 70c-6-14 4-24 10-14 6-10 16 0 10 14-6 6-14 6-20 0z', '#E53935', 3) + face(120, 128, 1.4, 'none')),
  G('nl', 'kees', 'เกส', 'Kees', 'เกสชอบปั่นจักรยาน ตามมาเลย {name}', 'Kees loves a bike ride — follow me, {name}', ['keeshond', 'คีสฮอนด์', 'dog', 'หมา', 'bike', 'จักรยาน'],
    // a keeshond: a big fluffy grey-and-cream ruff, small pointed ears, dark "spectacles" round the eyes, a little bike bell
    Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return C(120 + Math.cos(a) * 70, 132 + Math.sin(a) * 66, 22, '#B0BEC5'); }).join('') + P('M82 82l10-40 26 30zM158 82l-10-40-26 30z', '#78909C') + C(120, 132, 60, '#CFD8DC')
    + [[100, 126], [140, 126]].map(([x, y]) => C(x, y, 13, '#455A64', 0)).join('') + E(120, 160, 18, 12, '#ECEFF1') + E(120, 152, 7, 5, INK) + C(196, 200, 12, '#FFCA28', 3) + R(192, 186, 8, 6, '#FFCA28', 1, 2) + face(120, 126, 1.4, 'w')),
  // Switzerland
  G('ch', 'bernie', 'เบอร์นี', 'Bernie', 'กรือเอ็ตซี {name}! เบอร์นีพาขึ้นเขาเอง', 'Grüezi, {name}! Bernie will take you up the mountains', ['st bernard', 'เซนต์เบอร์นาร์ด', 'dog', 'หมา', 'alps', 'แอลป์'],
    // a St Bernard: long floppy brown ears, a white blaze and muzzle, droopy cheeks, a little wooden barrel hanging under the chin
    P('M50 100c-20 30-14 70 6 80 10-20 14-50 10-80zM190 100c20 30 14 70-6 80-10-20-14-50-10-80z', '#8D4E2A') + C(120, 120, 70, '#B5651D') + P('M108 54c-6 30-6 50-30 80 0 30 20 50 42 50s42-20 42-50c-24-30-24-50-30-80z', '#FFFFFF', 0) + C(120, 120, 70, 'none') + E(120, 152, 12, 8, INK)
    + R(98, 196, 44, 26, '#A1673F', 10) + Lc('M106 196v26M134 196v26', '#6D4C41', 3) + Lc('M120 190v6', INK, 3) + face(120, 126, 1.4, 'none') + Lc('M108 166q12 10 24 0', INK, 3.5)),
  G('ch', 'mumel', 'มูเมล', 'Mumel', 'มูเมลจะผิวปากเรียก {name} เอง', 'Mumel will whistle to call {name}', ['marmot', 'มาร์มอต', 'alpine marmot', 'edelweiss', 'เอเดลไวส์'],
    // an alpine marmot: a chubby tawny face, tiny round ears, two big front teeth, an edelweiss flower in its paws
    C(66, 76, 14, '#A1887F') + C(174, 76, 14, '#A1887F') + E(120, 134, 76, 78, '#BCAAA4') + E(120, 160, 34, 26, '#EFEBE9') + E(120, 148, 9, 6, INK) + R(112, 164, 16, 14, '#FFFFFF', 2, 2.5) + Lc('M120 164v14', INK, 2)
    + g(120, 206, 1, [0, 60, 120, 180, 240, 300].map((a) => g(0, 0, 1, E(0, -12, 5, 10, '#FFFFFF', 2.5), a)).join('') + C(0, 0, 5, '#FFCA28', 2)) + face(120, 126, 1.4, 'none')),
  // Germany
  G('de', 'wursti', 'วูร์สตี', 'Wursti', 'ฮัลโล {name}! วูร์สตีพาเที่ยวเยอรมนีเอง', 'Hallo, {name}! Wursti will show you Germany', ['dachshund', 'ดัชชุน', 'dog', 'หมา', 'pretzel', 'เพรทเซล'],
    // a dachshund: long floppy ears, a reddish-brown face, a long nose, a little green felt hat with a feather
    P('M54 90c-24 20-26 70-6 90 16-10 22-50 18-80zM186 90c24 20 26 70 6 90-16-10-22-50-18-80z', '#8D4E2A') + C(120, 124, 66, '#B5651D') + E(120, 168, 26, 20, '#B5651D') + E(120, 180, 10, 7, INK)
    + P('M76 70c0-30 88-30 88 0z', '#2E7D32') + E(120, 70, 60, 10, '#2E7D32') + Lc('M88 64h64', '#A1673F', 4) + P('M150 56c10-20 30-30 40-26-10 6-24 16-34 30z', '#FFFFFF', 3) + face(120, 132, 1.3, 'none') + Lc('M112 194q8 6 16 0', INK, 3)),
  G('de', 'adebar', 'อาเดบาร์', 'Adebar', 'อาเดบาร์บินไกลมาเจอ {name} เลยนะ', 'Adebar flew a long way to meet {name}', ['stork', 'นกกระสาขาว', 'white stork', 'bird', 'นก'],
    // a white stork: a white head and long red beak pointing down, black wing tips peeking at the sides, a small bundle on a string
    P('M44 140c-10-40 10-70 30-70l10 70zM196 140c10-40-10-70-30-70l-10 70z', INK) + C(120, 116, 64, '#FFFFFF') + P('M110 140l10 80 10-80z', '#E53935') + E(98, 112, 8, 10, INK, 0) + E(142, 112, 8, 10, INK, 0) + C(100, 110, 3, '#FFFFFF', 0) + C(144, 110, 3, '#FFFFFF', 0)
    + [[80, 134], [160, 134]].map(([x, y]) => E(x, y, 9, 5, '#FF8FA3', 0)).join('') + Lc('M130 190c20 10 30 10 40 0', INK, 2.5) + P('M160 190c0-14 24-14 24 0 0 14-24 14-24 0z', '#F8BBD0', 3)),
  // Austria
  G('at', 'hafi', 'ฮาฟี', 'Hafi', 'เซอร์วุส {name}! ฮาฟีพาเที่ยวออสเตรียเอง', 'Servus, {name}! Hafi will show you Austria', ['haflinger', 'ม้าฮาฟลิงเงอร์', 'horse', 'ม้า', 'pony'],
    // a Haflinger pony: a chestnut face with a long blond forelock and mane, pointed ears, a white stripe down the nose, a flower garland
    P('M74 66l6-40 26 30zM166 66l-6-40-26 30z', '#C77D3A') + E(120, 130, 60, 80, '#C77D3A') + P('M84 60c10-20 60-20 72 0-10 4-20 30-36 34-16-4-26-30-36-34z', '#FFE082') + Lc('M120 100v80', '#FFFFFF', 10) + E(120, 186, 34, 22, '#A1673F') + E(108, 186, 4, 5, INK) + E(132, 186, 4, 5, INK)
    + Array.from({ length: 7 }, (_, k) => C(70 + k * 17, 72 - Math.sin((k / 6) * Math.PI) * 16, 7, ['#E53935', '#FFFFFF', '#FFCA28'][k % 3], 2.5)).join('') + face(120, 130, 1.3, 'none')),
  G('at', 'gams', 'กัมส์', 'Gams', 'กัมส์ปีนเขาเก่งที่สุด ตามมา {name}', 'Gams is the best climber — follow me, {name}', ['chamois', 'ชามัวส์', 'goat', 'แพะภูเขา', 'mountain'],
    // a chamois: short black horns hooked back at the tips, a cream face with dark stripes from eye to nose, a tiny edelweiss behind an ear
    Lc('M96 70c-4-30 4-44 16-40M144 70c4-30-4-44-16-40', INK, 8) + P('M64 96l-20-14 30-4zM176 96l20-14-30-4z', '#D7B99A') + E(120, 130, 60, 76, '#F5E6C8') + Lc('M98 100l8 70M142 100l-8 70', '#5D4037', 9) + E(120, 186, 24, 16, '#D7B99A') + E(120, 180, 8, 5, INK)
    + face(120, 124, 1.3, 'none') + g(178, 70, 0.8, [0, 72, 144, 216, 288].map((a) => g(0, 0, 1, E(0, -10, 4, 9, '#FFFFFF', 2.5), a)).join('') + C(0, 0, 4, '#FFCA28', 2))),
  // Czechia
  G('cz', 'jezek', 'เยเชค', 'Ježek', 'อาฮอย {name}! เยเชคพาเที่ยวเช็กเอง', 'Ahoj, {name}! Ježek will show you Czechia', ['hedgehog', 'เม่นแคระ', 'เม่น', 'forest'],
    // a hedgehog: a fan of brown spines all round, a pale pointy face, a shiny black nose, a red apple balanced on its spines
    Array.from({ length: 14 }, (_, k) => { const a = Math.PI * (0.9 + (k / 13) * 1.2); return P(`M${(120 + Math.cos(a) * 60).toFixed(1)} ${(130 + Math.sin(a) * 60).toFixed(1)}l${(Math.cos(a - 0.2) * 40).toFixed(1)} ${(Math.sin(a - 0.2) * 40).toFixed(1)}l${(Math.cos(a + 0.4) * 22).toFixed(1)} ${(Math.sin(a + 0.4) * 22).toFixed(1)}z`, '#6D4C41', 3); }).join('')
    + C(120, 136, 62, '#8D6E63') + P('M74 146c0-30 20-44 46-44s46 14 46 44c0 30-30 50-46 64-16-14-46-34-46-64z', '#FFE0B2') + C(120, 200, 8, INK) + C(120, 52, 16, '#E53935', 3) + Lc('M120 36l6-8', '#43A047', 3) + face(120, 144, 1.3, 'none')),
  G('cz', 'lev', 'เลฟ', 'Lev', 'เลฟเป็นสิงโตตัวน้อยของปราก หวัดดี {name}', 'Lev is Prague\'s little lion — hello, {name}', ['lion', 'สิงโต', 'bohemian lion', 'lion cub'],
    // a white lion cub (the Bohemian lion's colour) with a soft red mane all round and a funny double-tufted tail curling up beside it
    Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return C(120 + Math.cos(a) * 66, 128 + Math.sin(a) * 66, 22, '#E53935'); }).join('') + C(120, 128, 62, '#FFF8E1') + C(78, 78, 14, '#FFF8E1') + C(162, 78, 14, '#FFF8E1') + E(120, 152, 22, 16, '#FFE0B2') + E(120, 144, 8, 5, '#F48FB1', 2.5)
    + Lc('M200 210c20-20 10-50 30-60', '#FFF8E1', 6) + C(224, 140, 7, '#E53935', 2.5) + C(234, 154, 7, '#E53935', 2.5) + face(120, 124, 1.3, 'w')),
  // Italy
  G('it', 'lupo', 'ลูโป', 'Lupo', 'ชาว {name}! ลูโปพาเที่ยวอิตาลีเอง', 'Ciao, {name}! Lupo will show you Italy', ['wolf', 'หมาป่า', 'wolf cub', 'apennine wolf', 'rome'],
    // a grey wolf cub: big pointed ears, a pale cream mask, amber eyes, a scoop of pistachio-and-strawberry gelato in a cone beside it
    ear('M56 96l4-64 44 38z', '#9E9E9E', 'M64 84l2-38 24 22z') + ear('M184 96l-4-64-44 38z', '#9E9E9E', 'M176 84l-2-38-24 22z') + C(120, 130, 72, '#9E9E9E') + P('M78 140c10-30 30-34 42-34s32 4 42 34c-10 40-30 56-42 56s-32-16-42-56z', '#F5F5F5') + E(120, 158, 11, 8, INK)
    + P('M196 210l-14-40h28z', '#E9A64C') + C(190, 162, 13, '#AED581', 3) + C(202, 150, 11, '#F48FB1', 3) + face(120, 134, 1.3, 'w')),
  G('it', 'bianca', 'เบียงกา', 'Bianca', 'เบียงกาจะดูแล {name} ทั้งวันเลย', 'Bianca will look after {name} all day', ['maremma', 'มาเรมมา', 'sheepdog', 'หมาเลี้ยงแกะ', 'dog', 'หมา', 'tuscany'],
    // a Maremma sheepdog: a big fluffy white head of curls, small folded ears, a black nose, a sprig of olive leaves behind one ear
    Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2; return C(120 + Math.cos(a) * 66, 132 + Math.sin(a) * 62, 20, '#FFFFFF'); }).join('') + C(120, 132, 64, '#FFFDF7') + P('M60 104c-10 10-10 30 4 40l14-30zM180 104c10 10 10 30-4 40l-14-30z', '#F5E6C8')
    + E(120, 160, 12, 8, INK) + Lc('M176 66l26-20', '#6D8B3A', 3) + [[184, 60], [196, 52]].map(([x, y]) => E(x, y, 8, 4, '#8BC34A', 2)).join('') + C(204, 44, 4, '#33691E', 2) + face(120, 134, 1.3, 'none') + Lc('M110 172q10 8 20 0', INK, 3.5)),
  // Spain
  G('es', 'lia', 'เลีย', 'Lía', 'โอลา {name}! เลียพาเที่ยวสเปนเอง', 'Hola, {name}! Lía will show you Spain', ['iberian lynx', 'ลิงซ์ไอบีเรีย', 'lynx', 'cat', 'แมว'],
    // an Iberian lynx: black ear tufts on tall ears, a spotted golden face, a bearded ruff of cheek fur, a red carnation behind one ear
    Lc('M70 60V30M170 60V30', INK, 5) + ear('M60 96l10-40 36 30z', '#D4A35C', 'M68 86l6-20 20 16z') + ear('M180 96l-10-40-36 30z', '#D4A35C', 'M172 86l-6-20-20 16z') + P('M48 150c0-50 30-80 72-80s72 30 72 80l-16 40-20-10-36 20-36-20-20 10z', '#D4A35C')
    + P('M48 150l-10 30 20-6M192 150l10 30-20-6', '#FFF3E0', 3) + [[86, 110], [150, 108], [76, 150], [164, 152], [120, 96]].map(([x, y]) => C(x, y, 4, INK, 0)).join('') + E(120, 160, 22, 14, '#FFF3E0') + P('M114 150h12l-6 7z', INK, 2) + C(186, 70, 12, '#E53935', 3) + face(120, 132, 1.3, 'w')),
  G('es', 'paco', 'ปาโก', 'Paco', 'ปาโกพา {name} เดินเล่นในเมืองขาวเอง', 'Paco will walk {name} through the white villages', ['donkey', 'ลา', 'burro', 'andalusia', 'อันดาลูเซีย'],
    // a soft grey donkey: very long ears with dark tips, a pale muzzle, a fringe of mane, a flat-brimmed black cordobés hat
    P('M84 80l-20-60c14-6 24 20 30 54zM156 80l20-60c-14-6-24 20-30 54z', '#9E9E9E') + Lc('M66 26l8-4M174 26l-8-4', INK, 6) + E(120, 136, 56, 72, '#9E9E9E') + E(120, 178, 38, 28, '#F5F5F5') + E(108, 180, 4, 5, INK) + E(132, 180, 4, 5, INK)
    + E(120, 66, 64, 10, INK) + R(92, 44, 56, 22, INK, 4) + Lc('M92 60h56', '#E53935', 4) + face(120, 126, 1.3, 'none')),
  // Finland
  G('fi', 'poro', 'โปโร', 'Poro', 'โมย {name}! โปโรพาเที่ยวฟินแลนด์เอง', 'Moi, {name}! Poro will show you Finland', ['reindeer', 'กวางเรนเดียร์', 'lapland', 'แลปแลนด์'],
    // a reindeer calf: small velvet antlers, a soft brown face with a white muzzle, wearing a red-and-white knitted bobble hat
    Lc('M80 72c-10-20-30-24-34-44M66 50l-16-4M160 72c10-20 30-24 34-44M174 50l16-4', '#A1887F', 6) + P('M54 112l-24-8 26-14zM186 112l24-8-26-14z', '#8D6E63') + C(120, 134, 66, '#8D6E63') + E(120, 172, 32, 24, '#EFEBE9') + E(120, 166, 10, 7, INK)
    + P('M66 112c0-50 108-50 108 0z', '#E53935') + Lc('M70 100h100', '#FFFFFF', 6) + [84, 104, 124, 144, 160].map((x) => C(x, 100, 3, '#E53935', 0)).join('') + C(120, 56, 12, '#FFFFFF', 3) + face(120, 136, 1.3, 'none')),
  G('fi', 'norppa', 'นอร์ปปา', 'Norppa', 'นอร์ปปาว่ายน้ำมาทักทาย {name}', 'Norppa swam over to say hello to {name}', ['ringed seal', 'แมวน้ำ', 'saimaa seal', 'seal', 'lake'],
    // a Saimaa ringed seal: a round grey head with pale ring patterns, big glossy eyes, whiskers, resting on a little ice floe in a lake
    P('M20 200h200l-14 20H34z', '#E1F5FE') + E(120, 128, 78, 72, '#78909C') + [[80, 90], [160, 96], [70, 150], [176, 156], [120, 76]].map(([x, y]) => C(x, y, 10, 'none', 3).replace('fill="none"', 'fill="none" stroke="#B0BEC5"')).join('')
    + E(120, 160, 26, 16, '#B0BEC5') + E(120, 150, 7, 5, INK) + Lc('M90 160l-34-4M90 168l-34 6M150 160l34-4M150 168l34 6', INK, 2.5)
    + [[98, 126], [142, 126]].map(([x, y]) => C(x, y, 11, INK, 0) + C(x + 3, y - 3, 4, '#FFFFFF', 0)).join('') + [[80, 146], [160, 146]].map(([x, y]) => E(x, y, 9, 5, '#FF8FA3', 0)).join('')),
  // Türkiye
  G('tr', 'van', 'วาน', 'Van', 'แมร์ฮาบา {name}! วานพาเที่ยวตุรกีเอง', 'Merhaba, {name}! Van will show you Türkiye', ['van cat', 'แมววาน', 'cat', 'แมว', 'odd eyes'],
    // a white Van cat: one blue eye and one amber eye, a ginger patch on the head, pink ears, a little blue evil-eye bead on a string collar
    ear('M58 96l4-60 44 34z', '#FFFFFF', 'M66 86l2-34 24 20z') + ear('M182 96l-4-60-44 34z', '#FFFFFF', 'M174 86l-2-34-24 20z') + C(120, 132, 72, '#FFFFFF') + P('M92 66c10-10 46-10 56 0-6 14-50 14-56 0z', '#FFB74D', 0)
    + C(98, 126, 10, '#42A5F5', 2.5) + C(142, 126, 10, '#FFB300', 2.5) + C(98, 126, 4, INK, 0) + C(142, 126, 4, INK, 0) + P('M114 146h12l-6 7z', '#F48FB1', 2.5) + Lc('M108 158q6 6 12 0q6 6 12 0', INK, 3)
    + Lc('M70 196c30 14 70 14 100 0', INK, 2.5) + C(120, 206, 10, '#1E88E5', 2.5) + C(120, 206, 5, '#FFFFFF', 0) + C(120, 206, 2.5, INK, 0) + [[84, 146], [156, 146]].map(([x, y]) => E(x, y, 9, 5, '#FF8FA3', 0)).join('')),
  G('tr', 'karabas', 'การาบัช', 'Karabaş', 'การาบัชตัวใหญ่ ปลอดภัยแน่ {name}', 'Karabaş is big and keeps {name} safe', ['kangal', 'คังกัล', 'dog', 'หมา', 'shepherd'],
    // a Kangal shepherd dog: a fawn head, the black mask round the muzzle and black floppy ears, a wide spiked-free leather collar with a bell
    P('M52 96c-20 14-20 50 0 66 14-10 18-40 14-60zM188 96c20 14 20 50 0 66-14-10-18-40-14-60z', INK) + C(120, 126, 68, '#E0C08A') + P('M84 150c0-24 16-34 36-34s36 10 36 34-16 40-36 40-36-16-36-40z', '#4E342E') + E(120, 140, 10, 7, INK)
    + R(70, 192, 100, 16, '#8D6E63', 6) + C(120, 214, 9, '#FFCA28', 3) + face(120, 116, 1.3, 'none') + Lc('M112 164q8 6 16 0', '#FFFFFF', 3)),
  // the United States
  G('us', 'rocky', 'ร็อกกี', 'Rocky', 'ไฮ {name}! ร็อกกีพาเที่ยวอเมริกาเอง', 'Hi, {name}! Rocky will show you America', ['raccoon', 'แรคคูน', 'animal', 'park'],
    // a raccoon: a grey face with the black bandit mask, white eyebrows, rounded ears, wearing a backwards red baseball cap
    C(64, 72, 22, '#78909C') + C(176, 72, 22, '#78909C') + C(64, 72, 10, '#ECEFF1', 3) + C(176, 72, 10, '#ECEFF1', 3) + C(120, 130, 70, '#90A4AE') + P('M60 120c20-20 40-10 60-6 20-4 40-14 60 6-10 20-40 20-60 8-20 12-50 12-60-8z', INK)
    + Lc('M84 104c10-6 20-6 28 0M128 104c8-6 18-6 28 0', '#FFFFFF', 4) + E(120, 166, 26, 18, '#ECEFF1') + E(120, 158, 8, 5, INK) + P('M70 82c10-30 90-30 100 0z', '#E53935') + Lc('M70 82h-20', '#E53935', 8)
    + [[100, 124], [140, 124]].map(([x, y]) => C(x, y, 5, '#FFFFFF', 0)).join('') + Lc('M112 176q8 6 16 0', INK, 3)),
  G('us', 'buffy', 'บัฟฟี', 'Buffy', 'บัฟฟีอยู่ในทุ่งกว้างใหญ่ มาวิ่งเล่นกัน {name}', 'Buffy lives on the big open plains — come and run, {name}', ['bison', 'ไบซัน', 'buffalo', 'yellowstone', 'เยลโลว์สโตน'],
    // a bison calf: a big shaggy dark-brown crown of curls, short curved horns, a lighter face, a tiny tuft of beard
    P('M50 110c-20-6-24-26-14-34 6 10 14 16 24 18zM190 110c20-6 24-26 14-34-6 10-14 16-24 18z', '#FFF8E1') + Array.from({ length: 9 }, (_, k) => C(64 + k * 14, 86 - Math.sin((k / 8) * Math.PI) * 20, 18, '#4E342E')).join('') + E(120, 140, 58, 64, '#795548')
    + E(120, 176, 30, 20, '#8D6E63') + E(110, 176, 4, 5, INK) + E(130, 176, 4, 5, INK) + P('M110 200l10 18 10-18z', '#4E342E', 3) + face(120, 136, 1.3, 'none')),
  // Canada
  G('ca', 'polo', 'โปโล', 'Polo', 'เฮลโล {name}! โปโลพาเที่ยวแคนาดาเอง', 'Hello, {name}! Polo will show you Canada', ['polar bear', 'หมีขั้วโลก', 'bear', 'หมี', 'churchill'],
    // a polar bear cub: a creamy white head with small round ears, a black nose, wearing a red toque with a white maple-leaf patch
    C(64, 82, 18, '#FFFDF7') + C(176, 82, 18, '#FFFDF7') + C(120, 134, 70, '#FFFDF7') + E(120, 164, 26, 18, '#F5F0E6') + E(120, 154, 10, 7, INK) + P('M64 104c0-50 112-50 112 0z', '#D52B1E') + R(60, 96, 120, 14, '#FFFFFF', 6)
    + C(120, 50, 12, '#FFFFFF', 3) + g(146, 80, 0.3, P('M0-40l8 16 10-4-4 22 14-14 4 8 14-2-6 16 6 4-22 14 4 10-20-4-4 20h-4l-4-20-20 4 4-10-22-14 6-4-6-16 14 2 4-8 14 14-4-22 10 4z', '#FFFFFF', 3)) + face(120, 134, 1.3, 'none') + Lc('M112 172q8 6 16 0', INK, 3)),
  G('ca', 'honk', 'ฮองก์', 'Honk', 'ฮองก์บินนำฝูงมาพา {name} เที่ยว', 'Honk leads the flock to show {name} round', ['canada goose', 'ห่านแคนาดา', 'goose', 'ห่าน', 'bird', 'นก'],
    // a Canada goose: a black head and long black neck, the white chinstrap band across the cheeks, a short black bill, a brown body peeking below
    E(120, 214, 70, 24, '#A1887F') + R(98, 120, 44, 90, INK, 20) + C(120, 100, 52, INK) + P('M70 100c10 44 90 44 100 0l-8-2c-12 30-72 30-84 0z', '#FFFFFF', 3) + P('M154 92l34 6-34 10z', INK, 3)
    + [[102, 92], [138, 92]].map(([x, y]) => C(x, y, 7, '#FFFFFF', 0) + C(x, y, 4, INK, 0)).join('') + [[88, 106], [152, 106]].map(([x, y]) => E(x, y, 8, 4, '#FF8FA3', 0)).join('')),
  // Hong Kong
  G('hk', 'lun', 'หลุน', 'Lun', 'เหน่ยโหว {name}! หลุนพาเที่ยวฮ่องกงเอง', 'Nei hou, {name}! Lun will show you Hong Kong', ['pangolin', 'ตัวนิ่ม', 'animal', 'country park'],
    // a Chinese pangolin: overlapping golden-brown scales over the head like a little helmet, a pink pointed face, tiny eyes
    C(120, 136, 72, '#C68642') + Array.from({ length: 3 }, (_, row) => Array.from({ length: 5 - row }, (_, k) => P(`M${76 + row * 12 + k * 22} ${86 + row * 16}c0-12 22-12 22 0l-11 10z`, '#A0522D', 3)).join('')).join('')
    + P('M84 150c0-24 16-34 36-34s36 10 36 34c0 20-16 50-36 60-20-10-36-40-36-60z', '#F8BBD0') + C(120, 206, 6, INK) + face(120, 144, 1.2, 'none') + Lc('M114 172q6 4 12 0', INK, 3)),
  G('hk', 'bobo', 'โปโป', 'Bobo', 'โปโปร้องเพลงปลุก {name} ทุกเช้าเลย', 'Bobo sings {name} awake every morning', ['red-whiskered bulbul', 'นกปรอดหัวโขน', 'bulbul', 'bird', 'นก'],
    // a red-whiskered bulbul: a tall pointed black crest, a white cheek, the little red whisker patch, a red-and-white tummy hint
    P('M110 64l20-50 20 54z', INK) + C(120, 128, 66, '#6D4C41') + P('M80 110c0-24 20-40 40-40s40 16 40 40l-10 40H90z', INK) + E(144, 136, 26, 20, '#FFFFFF') + C(160, 120, 8, '#E53935', 2.5) + P('M150 116l24 6-24 6z', INK, 3)
    + C(130, 112, 6, '#FFFFFF', 0) + C(131, 112, 3.5, INK, 0) + E(140, 150, 8, 4, '#FF8FA3', 0) + P('M84 190c20 20 52 20 72 0', '#FFFFFF', 4) + C(120, 198, 6, '#E53935', 2)),
  // Macau
  G('mo', 'galito', 'กาลีโต', 'Galito', 'โอลา {name}! กาลีโตพาเที่ยวมาเก๊าเอง', 'Olá, {name}! Galito will show you Macau', ['rooster', 'ไก่', 'galo', 'portuguese rooster', 'tile'],
    // a black Portuguese-style rooster painted with bright hearts and dots: a tall red comb, a yellow beak, a red wattle
    Array.from({ length: 4 }, (_, k) => C(88 + k * 20, 64 - (k % 2) * 6, 14, '#E53935')).join('') + C(120, 132, 66, INK) + P('M150 120l30 10-30 10z', '#FFCA28', 3) + P('M150 142c0 20-10 24-14 14z', '#E53935', 3)
    + [[86, 150, '#E53935'], [116, 172, '#FFCA28'], [84, 110, '#1E88E5'], [150, 178, '#43A047']].map(([x, y, c]) => P(`M${x} ${y + 6}c-10-8-10-16-4-18 3-1 4 2 4 2s1-3 4-2c6 2 6 10-4 18z`, c, 2)).join('')
    + C(132, 112, 8, '#FFFFFF', 0) + C(134, 112, 4, INK, 0) + E(146, 136, 7, 4, '#FF8FA3', 0)),
  G('mo', 'leilei', 'เหลยเหลย', 'Lei Lei', 'เหลยเหลยว่ายวนในบ่อรอ {name} อยู่นะ', 'Lei Lei swims round the garden pond, waiting for {name}', ['koi', 'ปลาคาร์ป', 'carp', 'fish', 'ปลา', 'garden pond'],
    // a round koi face-on: white with orange-red patches, flowing fins out to the sides, barbels, a lotus pad beneath
    E(120, 214, 70, 16, '#81C784') + P('M60 130c-30-20-50-10-56 0 16 10 36 20 56 10zM180 130c30-20 50-10 56 0-16 10-36 20-56 10z', '#FFAB91') + E(120, 128, 64, 70, '#FFFFFF') + P('M70 100c10-30 50-36 70-20-10 20-50 30-70 20zM130 170c20 0 40-10 46-30-10 30-30 40-46 30z', '#FF7043', 0)
    + E(120, 128, 64, 70, 'none') + Lc('M100 170c-6 10-10 16-18 20M140 170c6 10 10 16 18 20', INK, 3) + E(120, 168, 12, 8, '#FFCCBC', 3) + face(120, 132, 1.3, 'none') + C(190, 208, 10, '#F48FB1', 3)),
];
export default { places: {}, items };
