// Wave 9 (central Europe, part 3): Heidelberg and the Black Forest, Salzburg and Tyrol, Český Krumlov and South Bohemia, Poland, Kraków, Slovakia
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const F = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const wins = (x, y, n, dx, w, h, fill = '#B3E5FC') => Array.from({ length: n }, (_, k) => R(x + k * dx, y, w, h, fill, 1, 1.5)).join('');
const fir = (x, y, s = 1, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', c, 2) + R(-3, 0, 6, 6, '#6D4C41', 0, 1.5));
const tree = (x, y, s = 1, c = '#43A047') => g(x, y, s, C(0, -16, 16, c, 2.5) + R(-3, 0, 6, 10, '#6D4C41', 0, 2));

const items = [
  // ---------- Heidelberg and the Black Forest
  L('de/heidelberg/landmark-schwetzingen.v1.svg', 'สวนพระราชวังชเวทซิงเงินกับศาลาโดมสีชมพู', 'Schwetzingen palace garden and its pink domed pavilion', ['schwetzingen', 'ชเวทซิงเงิน', 'schwetzingen palace garden', 'สวนพระราชวังชเวทซิงเงิน', 'garden mosque', 'ศาลาโดมสีชมพู', 'baroque garden', 'สวนบาโรก', 'end of the world view', 'rococo garden'], 'หาหอคอยเรียวสองหอที่อยู่สองข้างโดม', 'Find the two slim towers on either side of the dome',
    // a fanciful pink and cream garden pavilion with a big green dome, two slender towers with little balconies, a long arcade in front of a pond with clipped round trees and a gravel path
    sky('#E1F5FE') + P('M-4 190h248v54H-4z', '#9CCC65', 3) + E(120, 214, 60, 12, '#4FC3F7', 2.5) + [24, 216].map((x) => C(x, 170, 18, '#388E3C', 2.5)).join('')
      + R(50, 120, 140, 70, '#F8BBD0', 0, 3) + Array.from({ length: 6 }, (_, k) => P(`M${58 + k * 22} 190v-36c0-10 14-10 14 0v36z`, '#FFF8E1', 2)).join('') + Lc('M50 132h140', '#E91E63', 3)
      + P('M84 120c0-46 72-46 72 0z', '#66BB6A', 3) + C(120, 70, 5, '#FFC107', 2) + Lc('M120 74v-4', INK, 2)
      + [40, 200].map((x) => R(x - 7, 54, 14, 136, '#FFF8E1', 2, 3) + R(x - 11, 90, 22, 6, '#E91E63', 2, 2) + P(`M${x - 8} 56l8-22 8 22z`, '#66BB6A', 2.5)).join('') + face(120, 158, 0.25)),
  L('de/heidelberg/landmark-sauschwaenzle.v1.svg', 'รถไฟไอน้ำเซาชเวนซ์เลบาห์นที่วิ่งวนเป็นหางหมู', 'The Sauschwänzlebahn, the pig\'s-tail steam railway', ['sauschwänzlebahn', 'sauschwaenzlebahn', 'เซาชเวนซ์เลบาห์น', 'pig tail railway', 'รถไฟหางหมู', 'wutach valley railway', 'หุบเขาวูทาค', 'steam train', 'รถไฟไอน้ำ', 'spiral tunnel'], 'หารางที่วนเป็นห่วงเหมือนหางหมูขด', 'Find the track that loops round like a curly pig\'s tail',
    // a little black steam engine puffing white clouds with two red coaches on a track that curls in a big loop through green hills, in and out of a tunnel mouth, over a tall stone viaduct
    sky('#E3F2FD') + P('M-4 140c40-30 80-20 120 0s80 20 128-6v110H-4z', '#81C784', 3) + P('M-4 190c60-20 140-20 248 0v54H-4z', '#66BB6A', 0)
      + Lc('M20 200c40-10 80-20 110-60 20-30 0-60-30-56-30 4-30 40 0 52 40 16 80 4 130-14', '#8D6E63', 8) + Lc('M20 200c40-10 80-20 110-60 20-30 0-60-30-56-30 4-30 40 0 52 40 16 80 4 130-14', '#D7CCC8', 3)
      + P('M70 110c0-16 22-16 22 0z', '#424242', 2.5) + R(150, 140, 60, 50, '#BDBDBD', 0, 3) + [160, 180, 200].map((x) => P(`M${x - 6} 190v-24c0-8 12-8 12 0v24z`, '#81C784', 2)).join('')
      + g(176, 132, 1, R(-30, -18, 36, 18, '#424242', 4, 2.5) + R(-4, -30, 18, 30, '#424242', 3, 2.5) + R(-26, -30, 8, 12, '#424242', 1, 2) + C(-20, 2, 6, '#E53935', 2) + C(4, 2, 6, '#E53935', 2) + R(12, -16, 30, 16, '#E53935', 3, 2.5) + wins(16, -12, 2, 12, 8, 6))
      + [[150, 92, 10], [136, 78, 12], [118, 64, 14]].map(([x, y, r]) => C(x, y, r, '#FFFFFF', 2)).join('') + face(160, 106, 0.2)),
  L('de/heidelberg/landmark-koehler.v1.svg', 'กองเผาถ่านโบราณของคนเผาถ่านป่าดำ', 'A Black Forest charcoal burner\'s smoking kiln', ['charcoal burner', 'คนเผาถ่าน', 'köhler', 'เคอเลอร์', 'charcoal kiln', 'กองเผาถ่าน', 'kohlenmeiler', 'black forest craft', 'งานฝีมือป่าดำ', 'smoking mound'], 'หาควันที่ลอยออกจากรูเล็กๆ บนกองดิน', 'Find the smoke curling out of the little holes in the mound',
    // a big round dome of stacked logs covered with earth and leaves, thin smoke rising from little holes, a charcoal burner in a hat with a long rake, his small wooden hut and a pile of black charcoal, fir trees around
    sky('#ECEFF1') + fir(20, 170, 1.2) + fir(220, 166, 1.3) + fir(60, 140, 0.8) + P('M-4 170h248v74H-4z', '#8D6E63', 3)
      + P('M50 190c0-70 140-70 140 0z', '#6D4C41', 3) + Lc('M70 160c20-10 80-10 100 0M64 176c26-6 86-6 112 0', '#5D4037', 3) + [[90, 140], [120, 130], [150, 140], [110, 160]].map(([x, y]) => C(x, y, 3, '#212121', 0) + Lc(`M${x} ${y - 4}c-6-10 6-14 0-24`, '#B0BEC5', 3)).join('')
      + R(186, 150, 46, 40, '#A1673F', 0, 2.5) + P('M180 152l29-24 29 24z', '#795548', 2.5) + R(200, 168, 14, 22, '#4E342E', 1, 2)
      + g(30, 204, 1, C(0, -40, 10, '#FFE0BD', 2) + E(0, -48, 14, 4, '#3E2723', 2) + P('M-10-6v-24h20v24z', '#455A64', 2) + face(0, -38, 0.24) + Lc('M10-26l26-30', '#A1673F', 4) + Lc('M30-60l12 6', '#A1673F', 4))
      + [[180, 214], [194, 222], [170, 224]].map(([x, y]) => E(x, y, 9, 6, '#212121', 1.5)).join('') + face(120, 172, 0.3)),
  L('de/heidelberg/landmark-lotharpfad.v1.svg', 'เส้นทางผจญภัยโลธาร์ปฟาดผ่านต้นไม้ล้มจากพายุ', 'The Lotharpfad adventure trail through storm-felled trees', ['lotharpfad', 'โลธาร์ปฟาด', 'storm forest trail', 'ทางเดินป่าหลังพายุ', 'fallen trees', 'ต้นไม้ล้ม', 'ladders and walkways', 'บันไดและสะพานไม้', 'schwarzwaldhochstrasse', 'black forest adventure'], 'หาบันไดไม้ที่พาดข้ามลำต้นไม้ล้ม', 'Find the wooden ladder leaning over the fallen trunk',
    // a jumble of big fallen grey tree trunks lying criss-cross with roots sticking up, wooden ladders and plank walkways with handrails winding over them, young green firs sprouting, children climbing across
    sky('#E8F5E9') + P('M-4 170h248v74H-4z', '#A5D6A7', 3) + fir(206, 170, 0.8, '#43A047') + fir(40, 176, 0.6, '#43A047') + fir(140, 200, 0.5, '#66BB6A')
      + g(80, 170, 1, R(-70, -8, 150, 16, '#A1887F', 8, 3), -18) + g(150, 186, 1, R(-70, -8, 140, 16, '#BCAAA4', 8, 3), 14) + g(110, 140, 1, R(-50, -7, 100, 14, '#8D6E63', 7, 3), -40)
      + g(20, 196, 1, C(0, 0, 22, 'none', 0) + Lc('M0 0l-16-26M0 0l-24-8M0 0l-8-28M0 0l-22 10', '#6D4C41', 4) + C(0, 0, 10, '#8D6E63', 2.5))
      + Lc('M40 210h120l40-50', '#FFCC80', 8) + Lc('M40 198h120l40-50', '#A1673F', 3) + Lc('M60 198v12M100 198v12M140 198v12M176 178v14', '#A1673F', 3)
      + g(122, 120, 1, Lc('M-10 30l20-60M10 30l20-60', '#A1673F', 4) + Lc('M-6 18h20M-2 6h20M2-6h20M6-18h20', '#A1673F', 3))
      + kid(96, 198, '#E53935') + kid(186, 160, '#1E88E5') + face(80, 172, 0.25)),
  L('de/heidelberg/landmark-bergbahn.v1.svg', 'รถรางขึ้นเขาไม้รุ่นเก่าของไฮเดลแบร์กขึ้นเขาเคอนิกส์ชตูล', 'Heidelberg\'s old wooden mountain railway to the Königstuhl', ['heidelberger bergbahn', 'แบร์กบาห์นไฮเดลแบร์ก', 'königstuhl', 'เคอนิกส์ชตูล', 'old wooden carriage', 'รถรางไม้เก่า', 'mountain railway', 'molkenkur', 'มอลเคนคูร์', 'steep track'], 'หาตู้ไม้ที่เอียงเป็นขั้นบันไดตามทางชัน', 'Find the wooden car built in steps to fit the steep slope',
    // a sloping wooden carriage built like a staircase of little compartments, painted dark red and cream, climbing a steep track through the forest, a cable between the rails, a valley town and river far below
    sky('#E1F5FE') + P('M-4 244V150c80-20 160-80 248-150v244z', '#43A047', 3) + P('M-4 190h80v54H-4z', '#4FC3F7', 0) + [[30, 186], [50, 180]].map(([x, y]) => R(x, y, 14, 14, '#FFCC80', 0, 2)).join('')
      + Lc('M30 240L230 40', '#8D6E63', 10) + Lc('M30 240L230 40', '#5D4037', 2) + Array.from({ length: 10 }, (_, k) => Lc(`M${40 + k * 20} ${226 - k * 20}l10 10`, '#5D4037', 3)).join('')
      + g(130, 140, 1, P('M-46 26h18v-14h18v-14h18v-14h18v-14h18v56h-90z', '#B71C1C', 3) + Lc('M-46 26h90', '#FFF8E1', 6) + [[-40, 6], [-22, -8], [-4, -22], [14, -36]].map(([x, y]) => R(x, y, 12, 10, '#E3F2FD', 1, 1.5)).join('') + C(-30, 32, 5, INK, 0) + C(30, 32, 5, INK, 0), -45)
      + [190, 210, 60].map((x, k) => fir(x, [90, 70, 196][k], 0.7, '#2E7D32')).join('') + face(132, 138, 0.25)),

  // ---------- Salzburg and Tyrol
  L('at/salzburg/landmark-felsenreitschule.v1.svg', 'โรงละครเฟลเซนไรท์ชูเลอ ระเบียงโค้งที่เจาะในหน้าผา', 'The Felsenreitschule, a stage with arches cut into the cliff', ['felsenreitschule', 'เฟลเซนไรท์ชูเลอ', 'rock riding school', 'โรงเรียนขี่ม้าในหน้าผา', 'salzburg festival', 'เทศกาลซาลซ์บวร์ก', 'arcades in the rock', 'ระเบียงโค้งในหิน', 'mönchsberg cliff', 'open air stage'], 'หาซุ้มโค้งสามชั้นที่เจาะอยู่ในหน้าผา', 'Find the three rows of arches carved into the cliff',
    // a sheer brown rock wall with three rows of little round arches cut into it like theatre boxes, a wide wooden stage in front with musicians' stands and a red curtain at the side
    sky('#FFF3E0') + R(-4, -4, 248, 180, '#A1887F', 0, 0) + P('M-4 176V30c40-10 60 6 100-4s80 8 148-8v158z', '#BCAAA4', 3)
      + Array.from({ length: 3 }, (_, r) => Array.from({ length: 8 - r }, (_, k) => P(`M${22 + r * 14 + k * 26} ${84 + r * 34}v-16c0-10 16-10 16 0v16z`, '#5D4037', 2)).join('')).join('')
      + R(-4, 176, 248, 30, '#A1673F', 0, 3) + Lc('M-4 186h248', '#8D6E63', 2) + R(-4, 206, 248, 38, '#5D4037', 0, 3)
      + P('M-4 40c20 40 20 110 10 150h-6z', '#C62828', 3) + P('M244 40c-20 40-20 110-10 150h6z', '#C62828', 3)
      + [70, 120, 170].map((x) => Lc(`M${x} 176v-24M${x - 10} 152h20`, INK, 3)).join('') + face(120, 140, 0.28)),
  L('at/salzburg/landmark-papageno.v1.svg', 'ปาปาเกโน คนจับนกจากอุปรากรขลุ่ยวิเศษของโมซาร์ท', 'Papageno the bird-catcher from Mozart\'s Magic Flute', ['papageno', 'ปาปาเกโน', 'magic flute', 'ขลุ่ยวิเศษ', 'die zauberflöte', 'bird catcher', 'คนจับนก', 'mozart opera', 'อุปรากรโมซาร์ท', 'feather costume'], 'หากรงนกที่ปาปาเกโนแบกอยู่บนหลัง', 'Find the birdcage Papageno carries on his back',
    // a cheerful bird-catcher in a costume covered in bright green and yellow feathers, a feathered cap, a cage of little birds on his back, blowing a little row of pan pipes, birds fluttering round
    sky('#E8F5E9') + P('M-4 206h248v38H-4z', '#A5D6A7', 3)
      + g(120, 206, 1, Lc('M-10-50v50M10-50v50', '#FFE0BD', 8) + E(-12, 0, 10, 5, '#5D4037', 2) + E(12, 0, 10, 5, '#5D4037', 2)
        + P('M-30-40c-6-40 6-80 30-80s36 40 30 80z', '#66BB6A', 3) + Array.from({ length: 12 }, (_, k) => P(`M${-22 + (k % 4) * 14} ${-100 + Math.floor(k / 4) * 20}c-4 8 4 12 8 8`, k % 2 ? '#FDD835' : '#2E7D32', 2)).join('')
        + R(26, -120, 40, 50, '#FFF8E1', 6, 2.5) + Lc('M34-120v50M46-120v50M58-120v50', '#A1673F', 2) + P('M24-120c6-14 38-14 44 0', '#A1673F', 2.5) + C(40, -94, 6, '#E53935', 1.5) + C(54, -86, 5, '#42A5F5', 1.5)
        + C(0, -134, 18, '#FFE0BD', 2.5) + P('M-18-140c0-22 36-22 36 0z', '#FDD835', 2.5) + P('M10-154c10-20 30-20 34-8-12 0-24 4-34 8z', '#43A047', 2) + face(0, -130, 0.32)
        + g(-20, -116, 1, Array.from({ length: 5 }, (_, k) => R(-24 + k * 6, 0, 5, 14 + k * 4, '#A1673F', 1, 1.5)).join(''), -20))
      + [[40, 60, '#FDD835'], [200, 50, '#E53935'], [190, 110, '#42A5F5']].map(([x, y, c]) => g(x, y, 1, E(0, 0, 10, 7, c, 2) + P('M-4-4l-8-8 4 10z', c, 1.5) + P('M10 0l6-2-6 4z', '#FF8F00', 1) + C(4, -2, 1.5, INK, 0))).join('')),
  L('at/salzburg/landmark-helblinghaus.v1.svg', 'บ้านเฮลบลิงในอินส์บรุคที่ประดับปูนปั้นเหมือนเค้กแต่งงาน', 'The Helbling House in Innsbruck, iced like a wedding cake', ['helblinghaus', 'บ้านเฮลบลิง', 'innsbruck old town', 'เมืองเก่าอินส์บรุค', 'stucco facade', 'ผนังปูนปั้น', 'rococo house', 'บ้านโรโกโก', 'bay windows', 'icing sugar house'], 'หาหน้าต่างยื่นที่มีลายปูนปั้นม้วนเป็นวง', 'Find the bay windows covered in curly white plasterwork',
    // a tall narrow pastel house whose whole front is covered in frothy white plaster swirls, garlands and shells like icing on a cake, with stacked bay windows, a pointed roof and the mountains behind
    sky('#E3F2FD') + P('M-4 90l40-50 40 30 40-44 50 40 40-20 38 30v40H-4z', '#B0BEC5', 3) + P('M-4 206h248v38H-4z', '#BDBDBD', 3) + R(10, 100, 50, 106, '#FFCC80', 0, 3) + R(180, 100, 56, 106, '#A5D6A7', 0, 3)
      + R(60, 60, 120, 146, '#FFF59D', 0, 3) + P('M54 62l66-40 66 40z', '#E57373', 3) + R(88, 76, 64, 120, '#FFF9C4', 0, 2.5)
      + Array.from({ length: 3 }, (_, r) => R(100, 84 + r * 36, 40, 26, '#B3E5FC', 2, 2) + Lc(`M92 ${82 + r * 36}c6-8 14 0 20-6s14 4 20-4 14 6 18 0M92 ${114 + r * 36}c8 6 16-4 24 2s16-6 24 2`, '#FFFFFF', 4)).join('')
      + [[72, 90], [72, 140], [166, 100], [166, 150]].map(([x, y]) => C(x, y, 8, 'none', 0) + Lc(`M${x - 8} ${y}a8 8 0 1 1 8 8`, '#FFFFFF', 4)).join('') + R(110, 190, 20, 16, '#8D6E63', 0, 2) + face(120, 64, 0.22)),
  L('at/salzburg/landmark-reisszug.v1.svg', 'ไรส์ซุก รางขนของขึ้นป้อมโฮเอนซาลซ์บวร์กที่เก่าแก่ที่สุด', 'The Reisszug, the ancient goods railway up to the fortress', ['reisszug', 'ไรส์ซุก', 'fortress goods lift', 'รางขนของขึ้นป้อม', 'oldest railway', 'รางเก่าแก่ที่สุด', 'hohensalzburg', 'โฮเอนซาลซ์บวร์ก', 'rope pulled cart', 'supply cart'], 'หาเกวียนเล็กที่ถูกเชือกดึงขึ้นตามราง', 'Find the little cart being pulled up the rails by a rope',
    // a steep wooden track climbing the white fortress wall, a small wooden cart full of barrels and sacks being hauled up by a rope from a big wheel turned at the top, a tower window above
    sky('#E1F5FE') + R(110, -4, 134, 200, '#ECEFF1', 0, 3) + Array.from({ length: 6 }, (_, k) => R(116 + k * 22, -4, 12, 12, '#ECEFF1', 0, 2)).join('') + R(170, 40, 20, 26, '#90A4AE', 2, 2) + P('M-4 200c40-30 80-30 248-10v54H-4z', '#81C784', 3)
      + Lc('M20 210L196 40', '#8D6E63', 12) + Lc('M14 204L190 34M26 216L202 46', '#5D4037', 3) + Array.from({ length: 9 }, (_, k) => Lc(`M${30 + k * 19} ${200 - k * 18}l12 10`, '#5D4037', 2.5)).join('')
      + g(196, 34, 1, C(0, 0, 18, 'none', 0) + Lc('M-18 0a18 18 0 1 0 36 0a18 18 0 1 0-36 0M0-18v36M-18 0h36', '#A1673F', 4)) + Lc('M100 120L190 34', INK, 2)
      + g(96, 128, 1, R(-22, -16, 40, 20, '#A1673F', 3, 2.5) + E(-12, -22, 8, 10, '#8D6E63', 2) + E(4, -20, 9, 7, '#FFE0B2', 2) + C(-14, 6, 5, INK, 0) + C(10, 6, 5, INK, 0), -44) + face(96, 126, 0.2)),
  // ---------- Český Krumlov and South Bohemia
  L('cz/krumlov/landmark-telc.v1.svg', 'จัตุรัสเตลช์กับบ้านหน้าจั่วสีพาสเทลเรียงแถว', 'The pastel gabled houses round the square in Telč', ['telč', 'telc', 'เตลช์', 'telč square', 'จัตุรัสเตลช์', 'pastel gables', 'บ้านหน้าจั่วสีพาสเทล', 'renaissance arcades', 'ทางเดินโค้ง', 'moravian town'], 'หาบ้านที่หน้าจั่วเป็นขั้นบันไดสีชมพู', 'Find the house with a pink stepped gable',
    // a row of narrow houses each painted a different pastel with fancy curved or stepped gables and arched arcades at ground level, a cobbled square in front with a little fountain
    sky('#E3F2FD') + R(-4, 196, 248, 48, '#D7CCC8', 0, 3)
      + [['#FFCDD2', 'step'], ['#FFF59D', 'curve'], ['#B2DFDB', 'step'], ['#D1C4E9', 'curve'], ['#FFE0B2', 'step']].map(([c, t], k) => {
        const x = 4 + k * 46;
        const top = t === 'step' ? `M${x} 90h8v-12h8v-12h14v12h8v12h8` : `M${x} 90c4-30 14-30 23-40 9 10 19 10 23 40`;
        return P(`${top}v106h-46z`, c, 3) + R(x + 10, 100, 10, 14, '#B3E5FC', 1, 1.5) + R(x + 26, 100, 10, 14, '#B3E5FC', 1, 1.5) + R(x + 10, 126, 10, 14, '#B3E5FC', 1, 1.5) + R(x + 26, 126, 10, 14, '#B3E5FC', 1, 1.5) + P(`M${x + 6} 196v-26c0-12 34-12 34 0v26z`, '#FFFFFF', 2);
      }).join('')
      + E(120, 222, 22, 6, '#90A4AE', 2.5) + Lc('M120 220v-14', '#4FC3F7', 4) + face(120, 156, 0.25)),
  L('cz/krumlov/landmark-kulajda.v1.svg', 'ซุปคูลายดา ซุปครีมเห็ดผักชีลาวกับไข่ลวก', 'Kulajda, South Bohemian creamy dill soup with a poached egg', ['kulajda', 'คูลายดา', 'dill soup', 'ซุปผักชีลาว', 'creamy mushroom soup', 'ซุปครีมเห็ด', 'poached egg', 'ไข่ลวก', 'south bohemian food', 'potato soup'], 'หาไข่ลวกที่ลอยอยู่กลางชามซุป', 'Find the poached egg floating in the middle of the soup',
    // a deep bowl of pale creamy soup with potato cubes and mushroom slices, a soft poached egg floating in the middle, sprigs of feathery green dill on top, a slice of rye bread beside
    E(110, 140, 92, 40, '#FFFFFF', 3) + P('M18 140h184c-6 46-44 70-92 70s-86-24-92-70z', '#ECEFF1', 3) + E(110, 140, 80, 30, '#FFF8E1', 2.5)
      + [[70, 132], [90, 150], [146, 150], [158, 132]].map(([x, y]) => R(x - 6, y - 5, 12, 10, '#FFE082', 2, 1.5)).join('') + [[80, 146], [140, 126]].map(([x, y]) => P(`M${x - 8} ${y}c0-10 16-10 16 0z`, '#A1887F', 1.5)).join('')
      + E(112, 140, 20, 14, '#FFFFFF', 2.5) + C(112, 138, 8, '#FFCA28', 1.5)
      + [[86, 120], [130, 118], [146, 140]].map(([x, y]) => Lc(`M${x} ${y}l6-8M${x + 3} ${y - 4}l6 2M${x + 3} ${y - 4}l-4-4`, '#43A047', 2)).join('')
      + g(206, 200, 1, P('M-24 10c-4-30 52-30 48 0z', '#6D4C41', 2.5) + P('M-18 6c0-18 36-18 36 0z', '#D7A86E', 2), -10) + face(112, 160, 0.3)),
  L('cz/krumlov/landmark-rondel.v1.svg', 'ศาลากลมรอนเดลสีชมพูที่ปราสาทยินดริคูฟ ฮราเด็ตส์', 'The round pink Rondel pavilion at Jindřichův Hradec', ['rondel', 'รอนเดล', 'jindřichův hradec', 'ยินดริคูฟ ฮราเด็ตส์', 'round pavilion', 'ศาลาทรงกลม', 'golden ceiling', 'เพดานทอง', 'music pavilion', 'castle garden'], 'หาโดมกลมสีเขียวที่มีโคมเล็กบนยอด', 'Find the round green dome with a tiny lantern on top',
    // a round pink renaissance garden pavilion with tall arched windows between white pilasters, a green copper dome with a tiny lantern on top, sitting on the castle wall above a pond
    sky('#E1F5FE') + P('M-4 190h248v54H-4z', '#4FC3F7', 3) + R(-4, 160, 248, 34, '#D7CCC8', 0, 3) + Array.from({ length: 12 }, (_, k) => R(-4 + k * 22, 160, 12, 8, '#BCAAA4', 0, 1.5)).join('')
      + R(60, 90, 120, 72, '#F48FB1', 0, 3) + Array.from({ length: 4 }, (_, k) => P(`M${72 + k * 28} 150v-36c0-12 18-12 18 0v36z`, '#E1F5FE', 2) + R(66 + k * 28, 90, 4, 72, '#FFFFFF', 0, 1.5)).join('') + R(176, 90, 4, 72, '#FFFFFF', 0, 1.5)
      + E(120, 90, 64, 10, '#FFFFFF', 3) + P('M58 88c0-54 124-54 124 0z', '#4DB6AC', 3) + Lc('M80 64c26-10 54-10 80 0', '#80CBC4', 3) + R(112, 30, 16, 14, '#FFFFFF', 2, 2.5) + P('M110 30c0-12 20-12 20 0z', '#4DB6AC', 2.5) + C(120, 16, 3, '#FFC107', 1.5)
      + Lc('M20 214h40M160 224h50', '#B3E5FC', 3) + face(120, 132, 0.25)),
  L('cz/krumlov/landmark-kratochvile.v1.svg', 'ปราสาทล่าสัตว์คราโตชวิเลกับคูน้ำรอบสวน', 'Kratochvíle, the little hunting chateau inside a moat', ['kratochvíle', 'kratochvile', 'คราโตชวิเล', 'hunting chateau', 'ปราสาทล่าสัตว์', 'renaissance villa', 'วิลลาเรอเนซองส์', 'moat garden', 'คูน้ำรอบสวน', 'south bohemia'], 'หาสะพานเล็กที่ข้ามคูน้ำไปยังประตู', 'Find the little bridge over the moat to the gate',
    // a square white renaissance villa with a red hipped roof and painted window frames, standing in a walled garden ringed by a square water moat with a little bridge to an arched gate tower
    sky('#E8F5E9') + P('M-4 120h248v124H-4z', '#9CCC65', 3) + R(20, 140, 200, 90, '#4FC3F7', 6, 3) + R(36, 150, 168, 70, '#AED581', 4, 3) + R(36, 150, 168, 70, 'none', 4, 0)
      + R(80, 100, 80, 80, '#FFFFFF', 0, 3) + P('M70 102l50-40 50 40z', '#E53935', 3) + Array.from({ length: 2 }, (_, r) => wins(90, 114 + r * 30, 4, 16, 10, 16)).join('') + Array.from({ length: 2 }, (_, r) => Array.from({ length: 4 }, (_, k) => R(88 + k * 16, 112 + r * 30, 14, 20, 'none', 1, 1.5)).join('')).join('')
      + R(104, 210, 32, 22, '#A1673F', 0, 2.5) + Lc('M104 216h32M104 224h32', '#5D4037', 2) + R(106, 190, 28, 24, '#FFFFFF', 0, 2.5) + P('M112 214v-12c0-8 16-8 16 0v12z', '#5D4037', 2)
      + [56, 184].map((x) => C(x, 170, 10, '#388E3C', 2)).join('') + face(120, 172, 0.25)),
  L('cz/krumlov/landmark-blacktower.v1.svg', 'หอคอยดำแห่งเชสเกบุดเยโยวิตเซ', 'The Black Tower of České Budějovice', ['black tower', 'หอคอยดำ', 'černá věž', 'české budějovice', 'เชสเกบุดเยโยวิตเซ', 'budweis', 'bell tower', 'หอระฆัง', 'tower gallery', 'big square'], 'หาระเบียงรอบหอที่คนขึ้นไปชมวิว', 'Find the gallery round the tower where people look out',
    // a tall dark grey stone tower with a walk-round gallery near the top, a curvy copper cap with a lantern, a big bell visible in the open belfry, the huge square of arcaded houses at its foot
    sky('#E3F2FD') + R(-4, 160, 248, 84, '#D7CCC8', 0, 3) + [[-4, '#FFE0B2'], [46, '#C8E6C9'], [160, '#FFCDD2'], [204, '#FFF9C4']].map(([x, c]) => R(x, 130, 42, 80, c, 0, 3) + P(`M${x + 8} 210v-20c0-10 26-10 26 0v20z`, '#FFFFFF', 2) + R(x + 12, 142, 16, 18, '#B3E5FC', 1, 1.5)).join('')
      + R(98, 50, 44, 160, '#616161', 0, 3) + Lc('M98 110h44M98 160h44', '#424242', 2) + R(90, 68, 60, 8, '#424242', 0, 2.5) + Lc('M92 68v-10M104 68v-10M116 68v-10M128 68v-10M140 68v-10M148 68v-10M90 58h60', INK, 2)
      + P('M106 104v-20c0-8 28-8 28 0v20z', '#212121', 2) + P('M112 100c0-10 16-10 16 0z', '#FFC107', 2) + P('M96 50c0-20 10-30 24-36 14 6 24 16 24 36z', '#26A69A', 3) + R(114, 6, 12, 10, '#26A69A', 1, 2) + kid(80, 236, '#E53935') + face(120, 134, 0.3)),

  // ---------- Poland
  F('pl', 'food', 'barszcz', 'บาร์ชช์ ซุปบีทรูทแดงใสกับเกี๊ยวหูเล็กอูชกา', 'Barszcz, clear red beet soup with little uszka dumplings', ['barszcz', 'บาร์ชช์', 'beetroot soup', 'ซุปบีทรูท', 'uszka', 'อูชกา', 'little ear dumplings', 'เกี๊ยวหูเล็ก', 'christmas eve soup', 'polish wigilia'],
    // a white bowl of clear ruby-red beet soup with several tiny folded ear-shaped dumplings floating in it, a whole beetroot with leaves and a few dried mushrooms beside it
    E(110, 150, 92, 38, '#FFFFFF', 3) + P('M18 150h184c-6 40-44 62-92 62s-86-22-92-62z', '#FFFFFF', 3) + E(110, 150, 80, 28, '#C2185B', 2.5) + E(96, 146, 30, 8, '#E91E63', 0)
      + [[76, 146], [104, 156], [132, 142], [150, 156], [96, 136]].map(([x, y]) => g(x, y, 1, P('M-10 4c0-12 20-12 20 0-4 4-16 4-20 0z', '#FFF3E0', 2) + C(0, 0, 3, 'none', 1.5))).join('')
      + g(206, 200, 1, C(0, 0, 18, '#880E4F', 2.5) + Lc('M0 18l2 10', '#880E4F', 3) + P('M-4-16c-10-16-6-30 4-34 6 10 4 24-4 34z', '#66BB6A', 2) + P('M4-16c8-14 20-18 26-12-6 8-16 12-26 12z', '#43A047', 2)) + face(110, 152, 0.3)),
  F('pl', 'culture', 'smigusdyngus', 'ชมิกุสดึงกุส วันสาดน้ำกันหลังอีสเตอร์ของโปแลนด์', 'Śmigus-dyngus, Poland\'s Easter Monday water fight', ['śmigus-dyngus', 'smigus dyngus', 'ชมิกุสดึงกุส', 'wet monday', 'วันจันทร์เปียก', 'water fight', 'สงครามสาดน้ำ', 'water pistols', 'ปืนฉีดน้ำ', 'easter monday'],
    // children laughing and splashing each other: one throwing water from a bucket, another squirting a water pistol, droplets flying everywhere, puddles, spring tulips by a garden fence
    sky('#E1F5FE') + P('M-4 196h248v48H-4z', '#AED581', 3) + Array.from({ length: 9 }, (_, k) => P(`M${6 + k * 28} 196v-30l6-8 6 8v30z`, '#FFFFFF', 2)).join('') + [[24, 170, '#E53935'], [64, 174, '#FFCA28'], [196, 172, '#EC407A']].map(([x, y, c]) => Lc(`M${x} ${y + 26}v-20`, '#43A047', 3) + P(`M${x - 6} ${y}c0-12 12-12 12 0 0 6-12 6-12 0z`, c, 2)).join('')
      + g(70, 210, 1, C(0, -60, 12, '#FFE0BD', 2.5) + P('M-12-8v-40h24v40z', '#1E88E5', 2.5) + face(0, -58, 0.28, 'o') + Lc('M-6-8v14M6-8v14', '#FFE0BD', 6) + Lc('M12-40l20-16', '#FFE0BD', 6) + P('M24-70h24l-4 22h-16z', '#FFCA28', 2.5) + Lc('M48-66c20-10 40-6 56 6', '#4FC3F7', 6))
      + g(176, 210, 1, C(0, -60, 12, '#FFE0BD', 2.5) + P('M-14-8l4-40h20l4 40z', '#F06292', 2.5) + face(0, -58, 0.28) + Lc('M-6-8v14M6-8v14', '#FFE0BD', 6) + Lc('M-12-40l-18-6', '#FFE0BD', 6) + P('M-44-54h20v10h-26z', '#43A047', 2) + Lc('M-50-50c-20 0-30 4-38 10', '#4FC3F7', 4))
      + [[120, 140], [134, 156], [108, 160], [96, 130], [150, 128]].map(([x, y]) => P(`M${x} ${y - 7}c4 6 4 10 0 10s-4-4 0-10z`, '#4FC3F7', 1.5)).join('') + E(120, 230, 30, 6, '#81D4FA', 2)),
  F('pl', 'culture', 'wianki', 'เวียนกิ ลอยพวงมาลัยดอกไม้ในคืนกลางฤดูร้อน', 'Wianki, floating flower wreaths on midsummer night', ['wianki', 'เวียนกิ', 'flower wreaths', 'พวงมาลัยดอกไม้', 'midsummer night', 'คืนกลางฤดูร้อน', 'noc kupały', 'floating wreaths', 'ลอยพวงมาลัย', 'vistula'],
    // two girls with flower crowns kneeling on a riverbank under a pink evening sky, gently setting round wreaths of daisies, poppies and cornflowers afloat; more wreaths drifting away on the water
    sky('#FFE0B2') + C(190, 70, 20, '#FFCC80', 2.5) + P('M-4 150h248v94H-4z', '#7986CB', 3) + Lc('M20 180h40M150 210h60M90 230h40', '#C5CAE9', 3) + P('M-4 140h120c10 20 0 40-10 50H-4z', '#81C784', 3)
      + [[150, 176, 1], [196, 196, 0.8], [130, 214, 0.9]].map(([x, y, s]) => g(x, y, s, E(0, 0, 26, 9, 'none', 0) + Lc('M-26 0a26 9 0 1 0 52 0a26 9 0 1 0-52 0', '#43A047', 5) + [[-20, -2, '#E53935'], [-6, -8, '#FFFFFF'], [10, -7, '#42A5F5'], [22, -1, '#FFCA28'], [0, 8, '#E53935']].map(([dx, dy, c]) => C(dx, dy, 4.5, c, 1.5)).join(''))).join('')
      + [[50, 150, '#FFFFFF'], [92, 160, '#FFF59D']].map(([x, y, c]) => g(x, y, 1, C(0, -30, 10, '#FFE0BD', 2) + P('M-12 0c0-12 4-24 12-24s12 12 12 24z', c, 2.5) + face(0, -28, 0.24) + [-8, 0, 8].map((dx) => C(dx, -42, 3.5, ['#E53935', '#42A5F5', '#FFCA28'][(dx + 8) / 8], 1)).join('') + Lc('M8-12l20 10', '#FFE0BD', 5))).join('')),
  F('pl', 'animal', 'konik', 'ม้าโคนิกโปแลนด์ ม้าสีเทาหนูกับแถบดำบนหลัง', 'A Polish konik, the little mouse-grey wild horse', ['polish konik', 'โคนิกโปแลนด์', 'konik horse', 'ม้าโคนิก', 'mouse grey horse', 'ม้าสีเทาหนู', 'dorsal stripe', 'แถบดำบนหลัง', 'wild meadow horse', 'popielno'],
    // a sturdy little mouse-grey horse with a dark mane, a dark stripe down its back and dark legs, grazing in a wet meadow with tall grass, a foal beside it, reeds and a pond
    sky('#E8F5E9') + P('M-4 160h248v84H-4z', '#AED581', 3) + E(196, 214, 40, 10, '#81D4FA', 2.5) + [180, 194, 214].map((x) => Lc(`M${x} 210v-30`, '#8D6E63', 3) + E(x, 178, 3, 8, '#6D4C41', 1.5)).join('')
      + g(100, 150, 1, E(0, 0, 50, 26, '#A1A1A1', 3) + Lc('M-40-16c20-10 60-10 80 0', '#424242', 4) + Lc('M-34 20v36M-18 22v36M22 22v36M38 20v36', '#616161', 9) + P('M40-10l20 30 14-6-6-34z', '#A1A1A1', 3) + P('M58 20c4 8 14 10 18 2', '#757575', 2.5) + C(62, 4, 2, INK, 0) + Lc('M44-20l12 26', '#424242', 6) + P('M-48-6c-12 10-14 26-8 40', 'none', 0) + Lc('M-48-6c-12 10-14 26-8 40', '#424242', 6) + P('M48-24l4-10 6 8z', '#757575', 2))
      + g(48, 196, 0.55, E(0, 0, 40, 22, '#BDBDBD', 3) + Lc('M-28 18v32M28 18v32', '#757575', 9) + P('M30-10l14-26 14 6-8 24z', '#BDBDBD', 3) + C(46, -24, 2.5, INK, 0) + Lc('M34-20l8-14', '#616161', 5)) + face(80, 150, 0.3)),

  // ---------- Kraków and around
  L('pl/krakow/landmark-morskieoko.v1.svg', 'ทะเลสาบมอร์สเกโอโกะ ดวงตาแห่งทะเลในเทือกเขาตาตรา', 'Morskie Oko, the Eye of the Sea lake in the Tatras', ['morskie oko', 'มอร์สเกโอโกะ', 'eye of the sea', 'ดวงตาแห่งทะเล', 'tatra lake', 'ทะเลสาบตาตรา', 'mountain hut', 'กระท่อมบนเขา', 'horse cart road', 'tatra national park'], 'หากระท่อมไม้หลังเล็กริมทะเลสาบ', 'Find the little wooden hut on the lakeshore',
    // a round clear green-blue lake held in a bowl of jagged grey granite peaks streaked with snow, dark dwarf pines on the slopes, a wooden mountain hostel with a steep roof on the near shore, hikers
    sky('#E1F5FE') + P('M-4 150l30-70 30 30 30-80 30 50 26-40 30 60 30-40 32 90z', '#90A4AE', 3) + P('M86 30l14 24-8-2-6 10-8-6z', '#FFFFFF', 2) + P('M176 50l10 20-6-2-6 6z', '#FFFFFF', 2)
      + P('M-4 150h248v94H-4z', '#558B2F', 3) + E(130, 176, 100, 34, '#26A69A', 3) + Lc('M80 170h40M150 186h40', '#80CBC4', 3) + [[20, 160], [44, 150], [218, 156]].map(([x, y]) => C(x, y, 10, '#2E7D32', 2)).join('')
      + R(20, 196, 52, 30, '#A1673F', 0, 3) + P('M14 198l32-26 32 26z', '#5D4037', 3) + wins(26, 204, 3, 15, 10, 10, '#FFF59D') + kid(100, 232, '#E53935', 0.8) + kid(122, 232, '#FFCA28', 0.8) + face(130, 170, 0.32)),
  L('pl/krakow/landmark-collegiummaius.v1.svg', 'ลานคอลเลจิอุมไมอุสกับนาฬิกาตุ๊กตาเดินขบวน', 'The Collegium Maius courtyard and its parading clock figures', ['collegium maius', 'คอลเลจิอุมไมอุส', 'jagiellonian university', 'มหาวิทยาลัยยาเกียลโลเนียน', 'gothic courtyard', 'ลานโกธิก', 'clock with figures', 'นาฬิกาตุ๊กตาเดิน', 'oldest university', 'arcaded courtyard'], 'หาตุ๊กตาตัวเล็กที่เดินออกมาจากนาฬิกา', 'Find the little figures parading out of the clock',
    // a brick gothic courtyard with a ring of pointed arcades on slender columns and a well in the middle; on the wall a clock with a little stage where tiny wooden figures walk out in a row
    sky('#FFF3E0') + R(-4, 30, 248, 180, '#C0583D', 0, 3) + Array.from({ length: 6 }, (_, k) => P(`M${6 + k * 40} 210v-50c0-24 32-24 32 0v50z`, '#FFE0B2', 2.5) + R(k * 40 - 2, 150, 8, 60, '#ECEFF1', 0, 2)).join('') + Lc('M-4 150h248', '#ECEFF1', 4)
      + R(80, 50, 80, 70, '#ECEFF1', 4, 3) + C(120, 76, 20, '#FFF8E1', 3) + Lc('M120 76v-14M120 76l10 6', INK, 3) + R(84, 100, 72, 16, '#5D4037', 2, 2)
      + [92, 106, 120, 134, 148].map((x, k) => g(x, 112, 1, C(0, -8, 4, '#FFE0BD', 1.5) + P('M-4 2v-6h8v6z', ['#E53935', '#1E88E5', '#FFCA28', '#43A047', '#7E57C2'][k], 1.5))).join('')
      + R(-4, 210, 248, 34, '#BDBDBD', 0, 3) + R(104, 186, 32, 26, '#90A4AE', 3, 2.5) + Lc('M108 186v-20h24v20M120 166v6', INK, 2) + face(120, 78, 0.28)),
  L('pl/krakow/landmark-niedzica.v1.svg', 'ปราสาทนีดซิตซาบนหน้าผาเหนือทะเลสาบชอร์ชติน', 'Niedzica Castle on its rock above Lake Czorsztyn', ['niedzica castle', 'ปราสาทนีดซิตซา', 'czorsztyn lake', 'ทะเลสาบชอร์ชติน', 'castle on a rock', 'ปราสาทบนผา', 'pieniny', 'เปียนีนี', 'dunajec', 'white castle with red roofs'], 'หาหอคอยกลมที่ยืนอยู่บนขอบหิน', 'Find the round tower standing right on the rock edge',
    // a white castle with red tile roofs, a round tower and wooden galleries perched on a steep limestone crag above a wide blue lake, forested hills and a second ruined castle far across the water
    sky('#E1F5FE') + P('M-4 150h248v94H-4z', '#4FC3F7', 3) + P('M140 150c10-20 30-24 40-30 10 4 24 10 30 30z', '#81C784', 2.5) + R(176, 112, 14, 16, '#BDBDBD', 0, 2) + Lc('M30 200h40M150 220h50', '#B3E5FC', 3)
      + P('M10 244c0-60 10-100 40-120 30-6 70 0 90 30 10 40 10 70 0 90z', '#ECEFF1', 3) + Lc('M30 200l16-30M80 220l10-40M110 190l8-20', '#BDBDBD', 3)
      + R(50, 80, 80, 54, '#FFFFFF', 0, 3) + P('M44 82l46-30 46 30z', '#E53935', 3) + R(110, 50, 30, 84, '#FFFFFF', 0, 3) + P('M106 52l19-24 19 24z', '#E53935', 3) + R(54, 108, 50, 10, '#A1673F', 0, 2) + wins(60, 92, 3, 16, 8, 10) + R(118, 70, 12, 14, '#B3E5FC', 2, 2) + face(84, 110, 0.2)),
  L('pl/krakow/landmark-sokolica.v1.svg', 'ต้นสนโดดเดี่ยวบนยอดผาโซโกลิตซาเหนือแม่น้ำดูนาเยตส์', 'The lone pine on Sokolica above the Dunajec gorge', ['sokolica', 'โซโกลิตซา', 'lone pine', 'ต้นสนโดดเดี่ยว', 'pieniny', 'เปียนีนี', 'dunajec gorge', 'หุบเขาแม่น้ำดูนาเยตส์', 'limestone peak', 'crooked old tree'], 'หาต้นสนเก่าที่ลำต้นคดงอบนขอบผา', 'Find the crooked old pine growing on the cliff edge',
    // a sharp white limestone peak with a tiny railed viewpoint, one ancient twisted pine with flat tufts leaning out over the edge, the green river winding in a deep gorge far below, a hiker taking a photo
    sky('#E3F2FD') + P('M-4 244V180c40-20 60 0 100-10s60 30 148 20v54z', '#2E7D32', 3) + Lc('M-4 214c50-10 80 20 130 6s80 10 118-6', '#4DB6AC', 12)
      + P('M40 244l40-150 30-30 30 30 20 150z', '#ECEFF1', 3) + Lc('M70 160l10-40M120 200l6-60M90 220l4-40', '#BDBDBD', 3) + Lc('M80 70h50M84 70v-8M126 70v-8', '#8D6E63', 3)
      + Lc('M118 66c4-16-4-26 10-40 14-10 30-6 40-16', '#6D4C41', 7) + [[132, 34, 18], [160, 20, 14], [108, 44, 12], [176, 34, 12]].map(([x, y, r]) => E(x, y, r, r * 0.45, '#388E3C', 2.5)).join('')
      + kid(96, 66, '#E53935', 0.8) + R(100, 44, 8, 6, '#424242', 1, 1.5) + face(110, 140, 0.28)),
  L('pl/krakow/landmark-manggha.v1.svg', 'ศูนย์ศิลปะญี่ปุ่นมังกาที่หลังคาเป็นคลื่นริมแม่น้ำวิสวา', 'The Manggha centre with its wavy roof by the Vistula', ['manggha', 'มังกา', 'japanese art centre', 'ศูนย์ศิลปะญี่ปุ่น', 'wavy roof', 'หลังคาคลื่น', 'vistula riverbank', 'ริมแม่น้ำวิสวา', 'krakow museum', 'wave building'], 'หาหลังคาที่เป็นลูกคลื่นสามลูก', 'Find the roof shaped like three rolling waves',
    // a low modern building with a roof of three smooth rolling waves in pale grey, long glass walls, a stony garden with a little pond in front and the river with the castle hill shape faint behind
    sky('#E3F2FD') + P('M-4 130h248v20H-4z', '#4FC3F7', 3) + P('M170 130c10-30 40-40 74-36v36z', '#C5E1A5', 2.5) + P('M-4 150h248v94H-4z', '#AED581', 3)
      + R(30, 150, 180, 50, '#E1F5FE', 0, 3) + Lc('M60 150v50M90 150v50M120 150v50M150 150v50M180 150v50', '#B3E5FC', 2)
      + P('M20 152c20-50 40-50 60-20 20-50 40-50 60-20 20-50 40-50 60-20 10 0 20-4 20-4v12H20z', '#CFD8DC', 3)
      + E(120, 222, 40, 8, '#4FC3F7', 2.5) + [[50, 222], [190, 220], [70, 236]].map(([x, y]) => E(x, y, 9, 5, '#BDBDBD', 1.5)).join('') + face(120, 178, 0.28)),

  // ---------- Slovakia
  F('sk', 'culture', 'cicmany', 'บ้านไม้ชิชมานีลายขาวบนผนังสีเข้ม', 'The log houses of Čičmany painted with white patterns', ['čičmany', 'cicmany', 'ชิชมานี', 'painted log houses', 'บ้านไม้วาดลาย', 'white patterns', 'ลายเส้นสีขาว', 'folk ornament', 'ลวดลายพื้นบ้าน', 'slovak village'],
    // a dark brown wooden log house with a steep shingle roof, its whole front covered in bright white geometric patterns of zigzags, crosses, triangles and little stars; a neighbour house behind, a wooden fence
    sky('#E8F5E9') + P('M-4 196h248v48H-4z', '#9CCC65', 3) + R(166, 110, 74, 86, '#5D4037', 0, 3) + P('M160 112l40-40 40 40z', '#795548', 3)
      + R(30, 96, 130, 100, '#4E342E', 0, 3) + P('M22 98l73-62 73 62z', '#6D4C41', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M30 ${108 + k * 16}h130`, '#3E2723', 2)).join('')
      + Lc('M40 110l8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8', '#FFFFFF', 3) + Lc('M40 186l8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8', '#FFFFFF', 3)
      + [[48, 148], [140, 148]].map(([x, y]) => P(`M${x} ${y - 14}l10 14-10 14-10-14z`, 'none', 0) + Lc(`M${x} ${y - 14}l10 14-10 14-10-14zM${x} ${y - 6}v12M${x - 4} ${y}h8`, '#FFFFFF', 2.5)).join('')
      + R(72, 126, 22, 24, '#FFF59D', 1, 2.5) + R(110, 126, 22, 24, '#FFF59D', 1, 2.5) + [[83, 122], [121, 122], [83, 156], [121, 156]].map(([x, y]) => P(`M${x - 8} ${y}h16`, 'none', 0) + Lc(`M${x - 8} ${y}h16`, '#FFFFFF', 3)).join('')
      + Lc('M80 78l15-12 15 12M88 60l7-6 7 6', '#FFFFFF', 2.5) + Array.from({ length: 9 }, (_, k) => P(`M${4 + k * 27} 236v-22l5-6 5 6v22z`, '#D7A86E', 2)).join('') + face(95, 168, 0.24)),
  F('sk', 'transport', 'tez', 'รถไฟไฟฟ้าตาตราสีแดงครีมวิ่งใต้ยอดเขา', 'The red and cream Tatra Electric Railway', ['tatra electric railway', 'รถไฟไฟฟ้าตาตรา', 'tatranské elektrické železnice', 'tež', 'red mountain train', 'รถไฟภูเขาสีแดง', 'poprad', 'ป็อปราด', 'štrbské pleso train', 'high tatras'],
    // a short red-and-cream electric train with a pantograph on top running on a track through dwarf pines, the sharp grey peaks of the High Tatras with snow behind, overhead wires
    sky('#E1F5FE') + P('M-4 130l40-70 30 30 34-60 30 50 30-40 34 50 50 40z', '#90A4AE', 3) + P('M90 30l14 24-8-2-6 8z', '#FFFFFF', 2) + P('M164 40l12 20-6-2-6 6z', '#FFFFFF', 2)
      + P('M-4 130h248v114H-4z', '#7CB342', 3) + Lc('M-4 74h248', INK, 1.5) + Lc('M-4 206h248M-4 216h248', '#616161', 3) + Array.from({ length: 12 }, (_, k) => R(4 + k * 21, 204, 8, 14, '#8D6E63', 0, 1)).join('')
      + R(30, 140, 180, 60, '#E53935', 12, 3) + R(30, 140, 180, 22, '#FFF8E1', 12, 2.5) + wins(42, 166, 6, 28, 18, 16, '#E3F2FD') + R(30, 186, 180, 6, '#B71C1C', 0, 0) + C(60, 202, 7, INK, 0) + C(180, 202, 7, INK, 0)
      + Lc('M100 140l14-30 14 30M108 110h40', INK, 2.5) + [[16, 150], [226, 160]].map(([x, y]) => C(x, y, 12, '#33691E', 2)).join('') + face(120, 150, 0.24)),
  F('sk', 'culture', 'centreofeurope', 'จุดศูนย์กลางยุโรปที่ครัมนิตสเกบาเน', 'The centre of Europe marker near Kremnické Bane', ['centre of europe', 'จุดศูนย์กลางยุโรป', 'geographical centre', 'ศูนย์กลางภูมิศาสตร์', 'kremnické bane', 'ครัมนิตสเกบาเน', 'stone marker', 'หินหลักหมาย', 'kremnica mountains', 'compass'],
    // a round stone marker on a green hilltop with a compass rose carved on top, a little outline map of Europe with a red dot at its middle on a board beside it, children standing on the stone with arms out
    sky('#E1F5FE') + P('M-4 170c60-40 180-40 248 0v74H-4z', '#81C784', 3) + [[20, 160], [220, 160]].map(([x, y]) => C(x, y, 16, '#388E3C', 2.5)).join('')
      + E(120, 176, 46, 14, '#BDBDBD', 3) + R(74, 176, 92, 20, '#BDBDBD', 0, 0) + E(120, 196, 46, 14, '#9E9E9E', 3) + Lc('M74 176v20M166 176v20', INK, 3) + E(120, 176, 46, 14, '#E0E0E0', 3)
      + P('M120 166l4 10-4 10-4-10z', '#E53935', 1.5) + P('M106 176l14-4 14 4-14 4z', '#90A4AE', 1.5)
      + g(196, 132, 1, Lc('M0 40V0', '#8D6E63', 4) + R(-30, -40, 60, 44, '#FFF8E1', 3, 2.5) + P('M-20-28c10-8 20-2 26-6 6 4 14 2 16 10-4 10-10 6-14 14-8 2-14-4-20-2-6-4-10-8-8-16z', '#A5D6A7', 2) + C(0, -18, 3.5, '#E53935', 1))
      + kid(106, 168, '#1E88E5', 0.9) + kid(134, 168, '#FFCA28', 0.9) + Lc('M90 152l8-4M150 152l-8-4', '#FFE0BD', 4)),
];

export default { places: {}, items };
