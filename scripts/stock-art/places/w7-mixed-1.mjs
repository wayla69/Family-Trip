// Wave 7 (mixed group, part 1): Türkiye (Istanbul, Cappadocia, Pamukkale and Ephesus), Georgia (Tbilisi, Kazbegi, Batumi), Peru (Cusco, Lima)
import { P, R, C, E, Lc, g, face, free, scene, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (tr/istanbul/landmark-cistern.v1.svg → tr-istanbul.landmark.cistern)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport): tr/culture-nazar.v1.svg → tr.culture.nazar
const K = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const star4 = (x, y, r, c) => P(`M${x} ${y - r}l${r * 0.3} ${r * 0.7} ${r * 0.7} ${r * 0.3}-${r * 0.7} ${r * 0.3}-${r * 0.3} ${r * 0.7}-${r * 0.3}-${r * 0.7}-${r * 0.7}-${r * 0.3} ${r * 0.7}-${r * 0.3}z`, c, 0);
const steam = (x, y) => Lc(`M${x} ${y}c-6-8 6-12 0-20M${x + 14} ${y + 2}c-6-8 6-12 0-20`, '#B0BEC5', 3);

const items = [
  // ---------- Türkiye
  K('tr', 'culture', 'nazar', 'นาซาร์ ลูกปัดตาสีน้ำเงิน', 'The nazar, the blue eye bead', ['nazar', 'นาซาร์', 'nazar boncuk', 'evil eye bead', 'ลูกปัดตาสีฟ้า', 'blue glass', 'แก้วสีน้ำเงิน', 'lucky charm', 'เครื่องราง', 'souvenir'],
    // a big round blue glass bead with rings of white, light blue and a dark middle like an eye, hanging from a string with a small bead and a gold ring on top, a shine on the glass
    Lc('M120 14v52', '#8D6E63', 4) + C(120, 14, 7, '#FFCA28', 2.5) + C(120, 50, 9, '#1565C0', 2.5) + C(120, 50, 3.5, '#FFFFFF', 0)
      + C(120, 146, 82, '#1565C0') + C(120, 146, 58, '#FFFFFF', 3.5) + C(120, 146, 38, '#4FC3F7', 3.5) + C(120, 146, 18, INK, 0) + C(112, 138, 5, '#FFFFFF', 0)
      + Lc('M64 110c10-18 26-30 44-34', '#90CAF9', 7) + Lc('M176 196c-8 8-18 12-28 14', '#0D47A1', 5)),

  // ---------- Istanbul
  L('tr/istanbul/landmark-cistern.v1.svg', 'บาซิลิกาซิสเทิร์น อ่างเก็บน้ำใต้ดิน', 'The Basilica Cistern under the city', ['basilica cistern', 'บาซิลิกาซิสเทิร์น', 'yerebatan', 'เยเรบาทัน', 'underground water palace', 'วังใต้น้ำ', 'stone columns', 'เสาหิน', 'carp', 'ปลาคาร์ป'], 'หาปลาสีส้มที่ว่ายอยู่ระหว่างเสาหินในน้ำ', 'Find the orange fish swimming between the stone columns',
    // a dim underground hall full of rows of stone columns under brick arches, standing in still green water lit by warm lamps, orange carp swimming, a child on the wooden walkway
    sky('#4E342E') + Array.from({ length: 7 }, (_, k) => { const x = 18 + k * 34; return Lc(`M${x} 74q17-26 34 0`, '#8D6E63', 5) + R(x - 4, 74, 8, 76, '#A1887F', 0, 2); }).join('')
      + P('M-4 150h248v94H-4z', '#00695C', 0) + Lc('M14 170h30M70 186h40M150 172h36M190 192h30', '#4DB6AC', 3)
      + [16, 90, 164, 238].map((x) => E(x, 168, 18, 6, '#FFB74D', 0) + R(x - 10, 34, 20, 134, '#D7CCC8', 0, 3) + R(x - 14, 28, 28, 10, '#EFEBE9', 2, 2.5)).join('')
      + [16, 90, 164].map((x) => Lc(`M${x + 14} 40q30-42 60 0`, '#BCAAA4', 7)).join('')
      + g(56, 196, 1, E(0, 0, 14, 7, '#FF7043', 2.5) + P('M12 0l10-7v14z', '#FF7043', 2.5) + C(-6, -2, 2, INK, 0)) + g(196, 184, 0.8, E(0, 0, 14, 7, '#FFA726', 2.5) + P('M-12 0l-10-7v14z', '#FFA726', 2.5) + C(6, -2, 2, INK, 0))
      + R(-4, 214, 248, 10, '#8D6E63', 0, 3) + Lc('M-4 204h248M20 204v10M70 204v10M170 204v10M220 204v10', '#5D4037', 3) + kid(122, 212, '#E53935', 1.3) + face(90, 112, 0.3)),
  L('tr/istanbul/landmark-topkapi.v1.svg', 'ประตูพระราชวังทอปกาปึ', 'The towered gate of Topkapı Palace', ['topkapi palace', 'topkapı', 'พระราชวังทอปกาปึ', 'gate of salutation', 'ประตูแห่งการทักทาย', 'sultan\'s palace', 'วังสุลต่าน', 'palace museum', 'pointed towers', 'หอคอยหลังคาแหลม'], 'หาหอคอยสองหลังที่มีหลังคาแหลมเหมือนหมวกแม่มด', 'Find the two towers with pointy roofs like witches\' hats',
    // a white palace gate in a crenellated wall between two tall octagonal towers with dark pointed cone roofs and gold tips, a blue painted panel with gold dots over the arched wooden doors, a green lawn
    sky('#BBDEFB') + P('M-4 206h248v38H-4z', '#81C784', 0) + R(20, 110, 200, 96, '#F5F5F5', 0, 3) + Array.from({ length: 10 }, (_, k) => R(24 + k * 20, 100, 10, 12, '#F5F5F5', 0, 2.5)).join('')
      + [62, 178].map((x) => R(x - 24, 72, 48, 134, '#FAFAFA', 0, 3) + P(`M${x - 30} 74l30-62 30 62z`, '#455A64', 3) + C(x, 10, 4, '#FFCA28', 2) + R(x - 6, 98, 12, 20, '#90A4AE', 6, 2) + Lc(`M${x - 24} 132h48`, '#B0BEC5', 3)).join('')
      + P('M98 206v-50a22 22 0 0 1 44 0v50z', '#6D4C41', 3) + Lc('M120 136v70', '#4E342E', 2) + R(92, 114, 56, 20, '#1E88E5', 2, 2.5) + [104, 120, 136].map((x) => C(x, 124, 3, '#FFD54F', 0)).join('')
      + face(62, 166, 0.36) + kid(196, 230, '#FB8C00', 1.1)),
  L('tr/istanbul/landmark-galatabridge.v1.svg', 'คนตกปลาบนสะพานกาลาตา', 'The fishing rods of Galata Bridge', ['galata bridge', 'สะพานกาลาตา', 'galata köprüsü', 'golden horn', 'โกลเดนฮอร์น', 'fishing rods', 'คันเบ็ด', 'fishermen', 'คนตกปลา', 'eminonu'], 'หาคันเบ็ดยาวเรียงกันเป็นแถวที่ห้อยสายลงไปในน้ำ', 'Find the long row of fishing rods with their lines dropping into the water',
    // a long bridge across blue water with arches below, a row of anglers leaning on the railing with their rods sticking out and lines dropping to the water, domes and minarets in a soft purple skyline, gulls, a fish on one line
    sky('#FFE0B2') + C(66, 98, 22, '#B39DDB', 0) + R(44, 96, 44, 18, '#B39DDB', 0, 0) + C(110, 104, 12, '#B39DDB', 0) + [30, 102].map((x) => R(x, 52, 5, 62, '#B39DDB', 0, 0) + P(`M${x - 1} 52l3.5-12 3.5 12z`, '#B39DDB', 0)).join('')
      + R(186, 62, 18, 52, '#9575CD', 0, 0) + P('M184 62l11-22 11 22z', '#9575CD', 0) + P('M-4 112h248v132H-4z', '#4FC3F7', 0)
      + Array.from({ length: 7 }, (_, k) => { const x = 14 + k * 32; return C(x - 4, 104, 7, '#FFE0BD', 2) + R(x - 11, 110, 14, 14, ['#E53935', '#43A047', '#1E88E5', '#FB8C00'][k % 4], 2, 2) + Lc(`M${x} 120l18-60`, '#5D4037', 2.5) + Lc(`M${x + 18} 60V${190 + (k % 3) * 10}`, '#37474F', 1.2); }).join('')
      + R(-4, 124, 248, 14, '#90A4AE', 0, 3) + Lc('M-4 112h248', INK, 3) + R(-4, 138, 248, 22, '#B0BEC5', 0, 3) + Array.from({ length: 6 }, (_, k) => P(`M${8 + k * 42} 160v-6a12 9 0 0 1 24 0v6z`, '#0277BD', 2)).join('')
      + g(64, 212, 0.8, E(0, 0, 12, 6, '#CFD8DC', 2.5) + P('M10 0l9-6v12z', '#CFD8DC', 2.5) + C(-5, -1, 2, INK, 0)) + Lc('M140 30q6-7 12 0q6-7 12 0M180 46q5-6 10 0q5-6 10 0', INK, 2.5) + Lc('M30 200h30M120 220h44M180 196h36', '#B3E5FC', 3) + face(120, 145, 0.3)),
  L('tr/istanbul/landmark-kumpir.v1.svg', 'คุมเปียร์ มันฝรั่งอบยักษ์ที่ออร์ทาเคย', 'A giant kumpir potato in Ortaköy', ['kumpir', 'คุมเปียร์', 'ortakoy', 'ortaköy', 'ออร์ทาเคย', 'stuffed baked potato', 'มันฝรั่งอบไส้ทะลัก', 'street food', 'อาหารริมทาง', 'bosphorus bridge'], 'หามันฝรั่งยักษ์ที่มีข้าวโพด ถั่ว และมะกอกกองอยู่ข้างบน', 'Find the giant potato piled with corn, peas and olives',
    // a huge baked potato split open in a silver foil boat, its fluffy inside heaped with sweetcorn, peas, pink sausage slices, black olives, pickles and purple cabbage, the Bosphorus bridge far behind
    sky('#E1F5FE') + Lc('M-4 92q124-48 248 0', '#90A4AE', 3) + R(52, 54, 6, 44, '#90A4AE', 0, 0) + R(182, 54, 6, 44, '#90A4AE', 0, 0) + Lc('M55 56l40 34M185 56l-40 34', '#B0BEC5', 1.5) + P('M-4 98h248v40H-4z', '#81D4FA', 0) + P('M-4 160h248v84H-4z', '#FFCC80', 0)
      + E(120, 142, 86, 42, '#A1673F') + E(120, 132, 72, 28, '#FFF3C4', 3)
      + [[78, 124], [92, 114], [150, 118], [164, 130], [104, 140], [136, 142]].map(([x, y]) => C(x, y, 4, '#FDD835', 1.5)).join('') + [[112, 118], [124, 112], [146, 136], [86, 134]].map(([x, y]) => C(x, y, 4, '#7CB342', 1.5)).join('')
      + [[100, 124], [132, 126], [70, 136]].map(([x, y]) => C(x, y, 6, '#F48FB1', 2) + C(x, y, 2, '#E57373', 0)).join('') + [[118, 132], [156, 124], [96, 106]].map(([x, y]) => C(x, y, 4.5, INK, 0) + C(x, y, 1.6, '#FFF3C4', 0)).join('')
      + Lc('M140 106c6 4 12-4 18 0M66 120c6 4 10-4 16 0', '#8E24AA', 3) + E(124, 100, 10, 4, '#9CCC65', 2)
      + P('M30 150c10 46 170 46 180 0-30 14-150 14-180 0z', '#CFD8DC', 3) + Lc('M60 172l10-6M170 172l-10-6', '#ECEFF1', 3) + face(120, 172, 0.42)),

  // ---------- Cappadocia
  L('tr/cappadocia/landmark-derinkuyu.v1.svg', 'เมืองใต้ดินเดรินคูยู', 'Derinkuyu, the city under the ground', ['derinkuyu', 'เดรินคูยู', 'underground city', 'เมืองใต้ดิน', 'rolling stone door', 'ประตูหินกลิ้ง', 'tunnels', 'อุโมงค์', 'kaymakli', 'ไคมักลึ'], 'หาประตูหินกลมใหญ่ที่กลิ้งปิดทางเดินได้', 'Find the big round stone door that rolls across the tunnel',
    // a cut-away of the ground: a little house and tree on top, and below it floor after floor of rounded cave rooms joined by narrow tunnels and a deep air shaft, jars in a storeroom, a lamp in each room, a big round millstone door
    sky('#B3E5FC') + R(-4, 44, 248, 204, '#D7A86E', 0, 0) + P('M-4 40h248v8H-4z', '#8BC34A', 0) + R(150, 16, 40, 26, '#EFD9B4', 0, 2.5) + P('M146 18l24-14 24 14z', '#BF6B4E', 2.5) + R(164, 28, 10, 14, '#6D4C41', 0, 2)
      + Lc('M40 42v-12', '#6D4C41', 4) + C(40, 22, 13, '#66BB6A', 2.5) + R(104, 44, 14, 186, '#6D4C41', 0, 2.5) + Lc('M106 60h10M106 90h10M106 120h10M106 150h10M106 180h10', '#A1887F', 2)
      + [[18, 64, 76, 38], [132, 70, 92, 36], [24, 128, 70, 34], [130, 128, 96, 42], [36, 190, 176, 36]].map(([x, y, w, h]) => R(x, y, w, h, '#8D6E63', 16, 3)).join('')
      + R(92, 80, 44, 12, '#8D6E63', 0, 0) + R(90, 140, 42, 12, '#8D6E63', 0, 0) + R(70, 160, 12, 32, '#8D6E63', 0, 0) + Lc('M150 170v20M160 170v20', '#8D6E63', 10)
      + [[44, 84], [176, 88], [50, 144]].map(([x, y]) => P(`M${x} ${y}c-4-6 0-10 0-14 0 4 4 8 0 14z`, '#FFB300', 1.5) + R(x - 3, y, 6, 6, '#FFF8E1', 0, 1.5)).join('')
      + [[150, 112], [166, 112], [182, 112]].map(([x, y]) => P(`M${x - 6} ${y}c0-10 2-14 6-14s6 4 6 14z`, '#E0864A', 2)).join('')
      + g(184, 148, 1, C(0, 0, 22, '#BCAAA4', 3) + C(0, 0, 6, '#8D6E63', 2.5) + face(0, 2, 0.3, 'none')) + kid(120, 222, '#1E88E5', 1.2) + P('M132 196c-3-5 0-8 0-11 0 3 3 6 0 11z', '#FFB300', 1.5)),
  L('tr/cappadocia/landmark-uchisarcastle.v1.svg', 'ปราสาทหินอุชฮิซาร์', 'Uçhisar Castle, the giant rock', ['uchisar castle', 'uçhisar castle', 'ปราสาทอุชฮิซาร์', 'rock castle', 'ปราสาทหิน', 'honeycomb rock', 'หินรังผึ้ง', 'highest point', 'จุดชมวิว', 'pigeon holes'], 'หาก้อนหินยักษ์ที่มีหน้าต่างเล็กๆ เต็มไปหมดเหมือนรังผึ้ง', 'Find the giant rock full of little windows like a beehive',
    // a huge cream-coloured rock rising like a giant sandcastle, dotted all over with little arched windows and doors, a few cave houses huddled at its foot, warm sky
    sky('#FFE0B2') + P('M-4 170c60-20 120-10 248-30v104H-4z', '#E6C9A0', 0) + P('M54 222c-6-62 6-112 22-142 12-22 26-36 44-42 18 6 32 20 44 42 16 30 28 80 22 142z', '#F0DDBE')
      + Array.from({ length: 8 }, (_, r) => { const y = 66 + r * 19, hw = Math.min(66, 26 + r * 10); const n = Math.max(1, Math.floor((hw * 2 - 16) / 20)); return Array.from({ length: n }, (_, j) => { const x = 120 - hw + 12 + j * ((hw * 2 - 24) / Math.max(1, n - 1)); return (y > 96 && y < 134 && Math.abs(x - 120) < 34) ? '' : P(`M${(x - 4).toFixed(1)} ${y}v-6a4 4 0 0 1 8 0v6z`, '#6D4C41', 1.5); }).join(''); }).join('')
      + [[20, 196, 30], [190, 190, 34], [52, 214, 26]].map(([x, y, w]) => R(x, y, w, 30, '#EAD3AE', 6, 2.5) + P(`M${x + w / 2 - 5} ${y + 30}v-12a5 5 0 0 1 10 0v12z`, '#6D4C41', 2)).join('')
      + face(120, 110, 0.48)),
  L('tr/cappadocia/landmark-pigeonvalley.v1.svg', 'หุบเขานกพิราบ', 'Pigeon Valley and its dovecotes', ['pigeon valley', 'หุบเขานกพิราบ', 'güvercinlik vadisi', 'dovecotes', 'บ้านนกพิราบ', 'pigeon houses', 'รังนกในหิน', 'valley walk', 'เดินหุบเขา', 'uchisar'], 'หารูเล็กๆ ที่ทาสีขาวไว้ซึ่งเป็นบ้านของนกพิราบ', 'Find the little holes painted white where the pigeons live',
    // tall pinkish rock pinnacles carved with rows of tiny square pigeon holes framed in white and red ochre paint, grey pigeons flying in and out, a path in the valley below
    sky('#E3F2FD') + P('M-4 220c60-10 180-10 248 0v24H-4z', '#C5A880', 0)
      + [[52, 60, 40], [124, 40, 46], [196, 70, 38]].map(([x, top, w]) => P(`M${x - w} 224V${top + 40}c0-30 ${w * 0.4}-${40} ${w}-${40}s${w} 10 ${w} 40v${184 - top}z`, '#F3D1B5') + R(x - w + 6, top + 50, w * 2 - 12, 26, '#FFFFFF', 4, 2.5) + Lc(`M${x - w + 8} ${top + 82}l6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6`, '#C0603A', 2.5)
        + Array.from({ length: Math.floor((w * 2 - 16) / 14) }, (_, j) => R(x - w + 12 + j * 14, top + 58, 7, 9, '#5D4037', 0, 0)).join('') + Array.from({ length: 3 }, (_, j) => R(x - 12 + j * 10, top + 112 + (j % 2) * 10, 6, 8, '#5D4037', 0, 0)).join('')).join('')
      + [[40, 34, 1, 1], [178, 30, 0.8, -1], [96, 130, 0.9, 1], [210, 150, 0.7, -1]].map(([x, y, s, d]) => `<g transform="translate(${x} ${y}) scale(${s * d} ${s})">` + E(0, 0, 11, 6, '#B0BEC5', 2) + P('M-2-2l-8-12 12 6z', '#90A4AE', 2) + C(9, -3, 4.5, '#B0BEC5', 2) + P('M13-3l5 1-5 1z', '#FF8A65', 0) + '</g>').join('')
      + face(124, 152, 0.4) + kid(30, 232, '#43A047', 1.1)),
  L('tr/cappadocia/landmark-testikebab.v1.svg', 'เทสติเคบับ สตูว์ในหม้อดินที่ต้องทุบ', 'Testi kebab, the stew in a cracked clay pot', ['testi kebab', 'เทสติเคบับ', 'pottery kebab', 'เคบับหม้อดิน', 'clay pot', 'หม้อดินเผา', 'crack open', 'ทุบหม้อ', 'avanos', 'stew'], 'หาหม้อดินที่ถูกทุบปากออกแล้วมีสตูว์ร้อนๆ อยู่ข้างใน', 'Find the clay pot cracked open with the hot stew inside',
    // a red clay jug on a wooden table with its neck knocked off in a jagged break, steam rising from the stew inside, the broken top lying beside it with a little wooden mallet, a plate of stew and rice in front
    sky('#FFF3E0') + P('M-4 168h248v76H-4z', '#A1673F', 0) + Lc('M-4 190h248M-4 220h248', '#8D5524', 2)
      + E(140, 120, 46, 54, '#C8693E') + Lc('M100 110c26 8 54 8 80 0M104 140c24 8 48 8 72 0', '#E39466', 3) + P('M112 72l6 7 6-7 6 7 6-7 6 7 6-7 6 7 6-7 6 7v10h-60z', '#C8693E', 3) + E(140, 74, 26, 6, '#6D3A1E', 2) + steam(132, 62)
      + g(208, 160, 1, P('M-16 0l6-7 6 7 6-7 6 7v-20h-24z', '#C8693E', 3), 30) + g(204, 196, 1, R(-4, -30, 8, 30, '#D7B074', 2, 2) + R(-14, -42, 28, 14, '#A1887F', 3, 2.5), -40)
      + E(78, 200, 54, 16, '#FFFFFF', 3) + E(70, 196, 30, 8, '#D84315', 2) + E(100, 198, 16, 6, '#FFF8E1', 2) + C(62, 194, 3, '#43A047', 0) + C(78, 196, 3, '#E53935', 0) + face(140, 130, 0.45)),
  L('tr/cappadocia/landmark-atvrosevalley.v1.svg', 'ขี่รถเอทีวีในหุบเขากุหลาบ', 'A quad bike ride in the Rose Valley', ['atv tour', 'ทัวร์รถเอทีวี', 'quad bike', 'รถสี่ล้อวิบาก', 'rose valley', 'หุบเขากุหลาบ', 'red valley', 'หุบเขาแดง', 'sunset ride', 'dusty trail'], 'หารถสี่ล้อที่วิ่งตะลุยฝุ่นผ่านหินสีชมพู', 'Find the quad bike kicking up dust past the pink rocks',
    // a chunky orange quad bike with four knobbly wheels and a child in a red helmet riding along a dusty track, pink and cream striped rock ridges of the Rose Valley behind, puffs of dust
    sky('#FFE0B2') + P('M-4 150c20-46 40-66 64-44s30-54 60-34 40-44 70-14 36-24 54-4v86H-4z', '#F48FB1', 3) + Lc('M-4 130c30-10 60 4 90-6s60 6 90-4 50 2 68-2M-4 150c40-8 80 6 120-4s80 6 128-2', '#FCE4EC', 4)
      + P('M-4 178c80-10 160-6 248 0v66H-4z', '#E6C9A0', 0) + [[34, 200, 14], [52, 186, 10], [18, 182, 9]].map(([x, y, r]) => C(x, y, r, '#F5E6D3', 2)).join('')
      + g(130, 190, 1, C(-44, 22, 20, '#37474F') + C(-44, 22, 8, '#90A4AE', 2) + C(44, 22, 20, '#37474F') + C(44, 22, 8, '#90A4AE', 2) + P('M-60 8c4-16 22-24 44-24h36c22 0 38 8 42 24z', '#FB8C00') + R(-22, -24, 40, 9, '#263238', 4, 2) + Lc('M24-18l12-16h10', INK, 3.5)
        + R(-6, -52, 16, 28, '#1E88E5', 4, 2.5) + C(2, -62, 13, '#E53935', 3) + P('M4-64h12v8H4z', '#B3E5FC', 2) + Lc('M10-44l20 6', '#FFE0BD', 4) + face(0, 0, 0.32))),

  // ---------- Pamukkale, Hierapolis and Ephesus
  L('tr/pamukkale/landmark-frontinusgate.v1.svg', 'ประตูฟรอนตินุสแห่งเฮียราโปลิส', 'The Frontinus Gate of Hierapolis', ['frontinus gate', 'ประตูฟรอนตินุส', 'hierapolis gate', 'ประตูเมืองโบราณ', 'triple arch', 'ซุ้มประตูสามช่อง', 'round towers', 'หอคอยกลม', 'colonnaded street', 'roman road'], 'หาซุ้มประตูสามช่องที่มีหอคอยกลมอยู่สองข้าง', 'Find the three arches between two round towers',
    // a white limestone gateway with three round arches and a cornice on top, a round stone tower on each side, a stone road through it, red poppies in the dry grass, blue sky
    sky('#B3E5FC') + P('M-4 200h248v44H-4z', '#E8DFC8', 0) + P('M100 244l10-44h20l10 44z', '#D7CCB8', 0)
      + [44, 196].map((x) => R(x - 26, 76, 52, 124, '#F5F0E6', 0, 3) + P(`M${x - 26} 78q26-20 52 0z`, '#F5F0E6', 3) + Lc(`M${x - 14} 82v116M${x + 14} 82v116`, '#E0D6C2', 3) + R(x - 6, 104, 12, 24, '#6D4C41', 6, 2) + Lc(`M${x - 26} 150h52`, '#D7CCB8', 2)).join('')
      + R(70, 94, 100, 106, '#EFE6D6', 0, 3) + R(66, 86, 108, 10, '#FFFFFF', 0, 2.5) + [91, 120, 149].map((x) => P(`M${x - 12} 200v-46a12 12 0 0 1 24 0v46z`, '#90A4AE', 2.5)).join('') + Lc('M74 140h92', '#D7CCB8', 2)
      + [[20, 220], [36, 228], [204, 222], [222, 232], [70, 230]].map(([x, y]) => Lc(`M${x} ${y + 10}v-10`, '#558B2F', 2) + C(x, y, 4.5, '#E53935', 1.5)).join('') + face(120, 118, 0.36)),
  L('tr/pamukkale/landmark-latrines.v1.svg', 'ห้องน้ำโรมันโบราณที่เอเฟซัส', 'The old Roman toilets of Ephesus', ['roman toilets', 'ห้องน้ำโรมัน', 'latrines', 'ส้วมโบราณ', 'ephesus latrina', 'marble bench', 'ม้านั่งหินอ่อน', 'water channel', 'ร่องน้ำ', 'ancient city'], 'หาม้านั่งหินยาวที่มีรูเรียงกันเป็นแถว นั่นคือห้องน้ำสมัยโรมัน', 'Find the long stone bench with a row of holes, the old Roman toilets',
    // a long white marble bench with a row of keyhole-shaped holes along its front, a little water channel running at its foot, a mosaic floor, columns and a ruined wall behind, a giggling child sitting on the bench
    sky('#FFF8E1') + R(-4, 40, 248, 96, '#E8DCC8', 0, 0) + Lc('M-4 70h248M-4 100h248', '#D7C7AC', 2) + [30, 90, 150, 210].map((x) => R(x - 8, 30, 16, 104, '#F5F0E6', 0, 2.5) + R(x - 12, 26, 24, 8, '#FFFFFF', 1, 2)).join('')
      + R(8, 128, 224, 16, '#FAFAFA', 0, 3) + R(12, 144, 216, 52, '#EDE7D9', 0, 3) + Array.from({ length: 7 }, (_, k) => { const x = 28 + k * 31; return C(x, 160, 7, '#5D4037', 0) + R(x - 3.5, 160, 7, 34, '#5D4037', 0, 0); }).join('')
      + R(-4, 198, 248, 14, '#4FC3F7', 0, 3) + R(-4, 212, 248, 32, '#D7CCC8', 0, 0) + Array.from({ length: 8 }, (_, k) => P(`M${14 + k * 30} 228l8-8 8 8-8 8z`, k % 2 ? '#8D6E63' : '#FFFFFF', 1.5)).join('')
      + kid(150, 132, '#43A047', 1.3) + face(206, 170, 0.32)),
  L('tr/pamukkale/landmark-terracehouses.v1.svg', 'บ้านขั้นบันไดโรมันที่เอเฟซัส', 'The painted Terrace Houses of Ephesus', ['terrace houses', 'บ้านขั้นบันได', 'yamaç evler', 'roman frescoes', 'ภาพเขียนฝาผนังโรมัน', 'mosaic floor', 'พื้นโมเสก', 'rich roman homes', 'บ้านเศรษฐีโรมัน', 'ephesus'], 'หานกสีเหลืองที่วาดอยู่บนผนังสีแดง', 'Find the yellow bird painted on the red wall',
    // inside an old Roman house under a light modern roof: deep red walls painted with framed panels of birds and plants, a floor of patterned mosaic, a glass walkway with a rail where a child looks in
    sky('#ECEFF1') + P('M-4 40l124-32 124 32v10H-4z', '#B0BEC5', 3) + Lc('M30 40l90-26 90 26', '#90A4AE', 2) + R(-4, 50, 248, 128, '#B71C1C', 0, 0)
      + [12, 92, 172].map((x, k) => R(x, 62, 58, 84, '#E57373', 0, 3) + R(x + 6, 68, 46, 72, '#FFCDD2', 0, 2) + (k === 1 ? g(x + 29, 98, 1.3, E(0, 0, 9, 6, '#FFCA28', 2) + C(8, -4, 4.5, '#FFCA28', 2) + P('M12-4l5 1-5 2z', '#FB8C00', 0) + P('M-4-2l-12-6 4 8z', '#FFB300', 2) + Lc('M-2 6v6M2 6v6', INK, 1.5)) + Lc(`M${x + 14} 140v-14M${x + 44} 140v-14`, '#2E7D32', 3) : Lc(`M${x + 29} 136v-48`, '#2E7D32', 3) + [[-8, 100], [8, 92], [-8, 116], [8, 108]].map(([dx, y]) => E(x + 29 + dx, y, 7, 4, '#66BB6A', 1.5)).join('') + C(x + 29, 84, 6, '#FF8A65', 1.5))).join('')
      + R(-4, 156, 248, 22, '#8D2A1F', 0, 0) + P('M-4 178h248v66H-4z', '#F5E6C8', 0) + Array.from({ length: 6 }, (_, k) => P(`M${20 + k * 40} 206l14-14 14 14-14 14z`, k % 2 ? '#1565C0' : '#C62828', 2) + C(34 + k * 40 - 14, 206, 3, INK, 0)).join('')
      + Lc('M-4 196h248', '#90A4AE', 4) + Lc('M30 196v-20M120 196v-20M210 196v-20M-4 176h248', '#90A4AE', 3) + kid(160, 232, '#1E88E5', 1.2) + face(41, 122, 0.3)),
  L('tr/pamukkale/landmark-sirince.v1.svg', 'หมู่บ้านชิรินเจบนเนินเขา', 'Şirince, the hillside village', ['sirince', 'şirince', 'ชิรินเจ', 'hillside village', 'หมู่บ้านบนเนิน', 'white houses', 'บ้านสีขาว', 'wooden bay windows', 'หน้าต่างไม้ยื่น', 'selcuk', 'olive trees'], 'หาบ้านที่มีหน้าต่างไม้สีน้ำตาลยื่นออกมาจากผนังขาว', 'Find the house with a brown wooden window poking out of its white wall',
    // white stone houses with red tile roofs and brown wooden bay windows stacked up a green hillside among olive trees, cobbled lanes between them, blue sky
    sky('#E3F2FD') + P('M-4 92c80-44 160-44 248-12v164H-4z', '#9CCC65', 0)
      + [[22, 116, 50], [86, 100, 54], [152, 92, 52], [40, 164, 58], [114, 150, 56], [182, 146, 52], [72, 208, 54], [148, 204, 60]].map(([x, y, w], k) => R(x, y, w, 36, '#FAFAFA', 0, 2.5) + P(`M${x - 4} ${y + 2}l${w / 2 + 4}-16 ${w / 2 + 4} 16z`, '#D84315', 2.5)
        + R(x + w * 0.52, y + 8, w * 0.34, 18, '#8D6E63', 0, 2) + R(x + w * 0.58, y + 12, w * 0.22, 9, '#B3E5FC', 0, 1.5) + R(x + 8, y + 16, 10, 20, k % 2 ? '#1565C0' : '#6D4C41', 0, 2)).join('')
      + [[10, 150], [222, 120], [218, 190], [10, 210]].map(([x, y]) => Lc(`M${x} ${y + 20}v-10`, '#6D4C41', 3) + C(x, y + 4, 11, '#7CB342', 2)).join('') + face(108, 82, 0.3)),
  L('tr/pamukkale/landmark-caravanserai.v1.svg', 'คาราวานเซอไร โรงเตี๊ยมของกองคาราวานที่คูซาดาซึ', 'The caravanserai of Kuşadası', ['caravanserai', 'คาราวานเซอไร', 'kervansaray', 'kusadasi', 'คูซาดาซึ', 'old inn', 'โรงเตี๊ยมโบราณ', 'courtyard', 'ลานกลางบ้าน', 'silk road', 'camel'], 'หาอูฐที่นั่งพักอยู่ในลานที่มีซุ้มโค้งรอบด้าน', 'Find the camel resting in the courtyard of arches',
    // a stone courtyard with two floors of round arches all round and a battlemented top, a palm tree, a red rug, and a camel lying down to rest
    sky('#B3E5FC') + R(-4, 52, 248, 146, '#D7B98E', 0, 3) + Array.from({ length: 12 }, (_, k) => R(-2 + k * 21, 42, 11, 12, '#D7B98E', 0, 2.5)).join('')
      + Array.from({ length: 7 }, (_, k) => { const x = 8 + k * 33; return P(`M${x} 116v-34a13 13 0 0 1 26 0v34z`, '#8D6E63', 2.5) + P(`M${x} 194v-44a13 13 0 0 1 26 0v44z`, '#6D4C41', 2.5); }).join('') + Lc('M-4 126h248', '#B89A6E', 4)
      + P('M-4 194h248v50H-4z', '#EEDCB8', 0) + Lc('M60 200c4-40 0-80 8-110', '#8D6E63', 6) + Array.from({ length: 6 }, (_, j) => Lc(`M68 92q${-24 + j * 10} ${-12 + Math.abs(j - 2.5) * 6} ${-36 + j * 14} ${8 + Math.abs(j - 2.5) * 4}`, '#43A047', 5)).join('')
      + R(22, 206, 70, 24, '#C62828', 2, 2.5) + Lc('M30 218h54', '#FFCA28', 3)
      + g(166, 214, 1, E(0, 0, 34, 14, '#D7A86E', 2.5) + P('M-14-10c4-16 18-16 22 0z', '#D7A86E', 2.5) + P('M26-6c8-10 8-30 16-34 8-2 16 2 16 8-6 2-10 2-12 6-2 8-4 18-10 26z', '#D7A86E', 2.5) + C(46, -36, 1.8, INK, 0) + E(50, -32, 3, 2, '#FF8FA3', 0) + Lc('M-20 12h16M8 12h16', '#C8964F', 4))
      + face(120, 100, 0.3)),
  L('tr/pamukkale/landmark-boyoz.v1.svg', 'บอยอซ ขนมปังเกลียวกับไข่ต้มของอิซมีร์', 'İzmir\'s boyoz breakfast by the sea', ['boyoz', 'บอยอซ', 'izmir breakfast', 'อาหารเช้าอิซมีร์', 'boiled egg', 'ไข่ต้ม', 'tulip tea glass', 'ชาแก้วทิวลิป', 'kordon', 'คอร์ดอน'], 'หาขนมปังม้วนเกลียวที่วางอยู่ข้างไข่ต้มผ่าครึ่ง', 'Find the swirly little pastry next to the boiled egg',
    // round swirled boyoz pastries on a white plate beside a halved boiled egg, a tulip-shaped glass of red tea on a saucer, the sea and gulls behind the seafront table
    sky('#B3E5FC') + P('M-4 108h248v54H-4z', '#29B6F6', 0) + Lc('M20 124h30M120 140h40M190 120h30', '#B3E5FC', 3) + Lc('M60 46q6-7 12 0q6-7 12 0M150 64q5-6 10 0q5-6 10 0', INK, 2.5)
      + P('M-4 160h248v84H-4z', '#FFFFFF', 0) + Lc('M-4 176h248M-4 204h248M-4 232h248M30 160v84M90 160v84M150 160v84M210 160v84', '#90CAF9', 2) + E(104, 196, 84, 28, '#FFFFFF', 3)
      + [[66, 192], [108, 202]].map(([x, y]) => C(x, y, 20, '#F2C46D', 3) + Lc(`M${x - 4} ${y}a4 4 0 1 1 8 0a8 8 0 1 1 -16 0a12 12 0 1 1 24 0`, '#C8862F', 2)).join('') + C(92, 176, 18, '#F2C46D', 3)
      + [[142, 184], [160, 198]].map(([x, y]) => E(x, y, 15, 11, '#FFFFFF', 3) + C(x, y, 6, '#FFCA28', 2)).join('')
      + E(204, 212, 20, 5, '#E53935', 2.5) + P('M194 160c-8 10-8 20 0 26-6 8-6 16 0 24h20c6-8 6-16 0-24 8-6 8-16 0-26z', '#FFE0B2', 3) + P('M195 172c-4 6-4 10 1 14-5 7-5 14-1 20h16c4-6 4-13-1-20 5-4 5-8 1-14z', '#D84315', 0) + face(92, 174, 0.3)),

  // ---------- Georgia
  K('ge', 'food', 'khinkali', 'คินคาลี เกี๊ยวจอร์เจีย', 'Khinkali, Georgian soup dumplings', ['khinkali', 'คินคาลี', 'georgian dumplings', 'เกี๊ยวจอร์เจีย', 'soup dumplings', 'เกี๊ยวน้ำซุป', 'pleated', 'จีบ', 'black pepper', 'georgian food'],
    // three plump pleated dumplings with a twisted knot on top sitting on a plate, sprinkled with black pepper, steam rising from the middle one, which smiles
    E(120, 182, 100, 32, '#FFFFFF') + E(120, 178, 84, 22, '#E3F2FD', 2)
      + [[64, 166, 0.78], [176, 166, 0.78], [120, 156, 1.1]].map(([x, y, s], k) => g(x, y, s, P('M-36 10c-6-28 14-46 32-52h8c18 6 38 24 32 52-6 14-66 14-72 0z', '#FFF3DC')
        + Array.from({ length: 7 }, (_, j) => { const bx = (-30 + j * 10) * 0.62; return Lc(`M${bx.toFixed(1)} -14Q${(bx * 0.4).toFixed(1)} -30 0 -42`, '#D9BF92', 2); }).join('') + R(-6, -56, 12, 15, '#FFF3DC', 4, 3) + (k === 2 ? face(0, -2, 0.45) : ''))).join('')
      + [[80, 140], [96, 176], [150, 136], [160, 178], [196, 150], [44, 156]].map(([x, y]) => C(x, y, 1.8, INK, 0)).join('') + steam(112, 86)),
  K('ge', 'food', 'tonispuri', 'โทนิสปูรี ขนมปังจากเตาดินกลม', 'Tonis puri, bread from the round clay oven', ['tonis puri', 'โทนิสปูรี', 'shotis puri', 'โชติสปูรี', 'tone oven', 'เตาโทเน', 'georgian bread', 'ขนมปังจอร์เจีย', 'clay oven', 'canoe bread'],
    // a round brick clay oven with a glowing mouth at the top and long canoe-shaped loaves stuck inside, and in front a big golden pointed loaf with a hollow middle and a smile
    P('M88 120v66c0 18 128 18 128 0v-66z', '#D98A5F') + Lc('M90 140c40 10 84 10 124 0M90 164c40 10 84 10 124 0', '#BF6B4E', 3) + Lc('M120 124v18M170 126v16M140 150v16M196 148v18', '#BF6B4E', 2)
      + E(152, 120, 66, 18, '#BF6B4E') + E(152, 120, 50, 12, '#FF7043', 3) + E(152, 122, 38, 7, '#FFCA28', 0) + P('M124 116c8-6 20-8 30-6l-4 6c-8-2-18 0-26 4z', '#E9A64C', 1.5) + Lc('M140 96c-6-8 6-12 0-20M164 98c-6-8 6-12 0-20', '#FFAB91', 3)
      + g(96, 196, 1, P('M-84 0c24-26 144-26 168 0-24 22-144 22-168 0z', '#E9A64C') + E(0, -1, 54, 7, '#C8862F', 2) + Lc('M-60 8c20 6 100 6 120 0', '#F5C77E', 2) + face(0, 6, 0.32), -8)),
  K('ge', 'culture', 'svantower', 'หอคอยหินสวาน', 'A Svan stone tower', ['svan tower', 'หอคอยสวาน', 'svaneti', 'สวาเนติ', 'mestia', 'เมสเทีย', 'ushguli', 'อุชกูลี', 'stone tower house', 'บ้านหอคอยหิน', 'caucasus village'],
    // a tall square stone tower with tiny windows and a sloping wooden roof beside a little stone house, snow-capped Caucasus peaks behind, on a green hill
    P('M24 160l40-64 26 30 34-62 40 58 22-26 34 64z', '#CFD8DC', 3) + P('M54 112l10-16 10 16-6-4-4 6-4-6zM114 82l10-18 10 18-6-4-4 6-4-6z', '#FFFFFF', 0)
      + P('M14 222c40-30 172-30 212 0z', '#7CB342') + P('M96 206l5-150h38l5 150z', '#BCAAA4') + P('M94 58l26-28 26 28z', '#795548')
      + [[114, 74], [114, 110]].map(([x, y]) => R(x, y, 12, 14, '#4E342E', 1, 2)).join('') + Lc('M104 92h10M128 128h10M106 150h12M124 168h10M104 186h10', '#A1887F', 2)
      + R(144, 160, 60, 48, '#BCAAA4', 0, 3) + P('M140 162l34-22 34 22z', '#795548', 3) + R(166, 182, 14, 26, '#5D4037', 0, 2) + face(120, 172, 0.36)),
  K('ge', 'culture', 'panduri', 'ปันดูรี พิณสามสายของจอร์เจีย', 'The panduri, a three-string lute', ['panduri', 'ปันดูรี', 'georgian lute', 'พิณจอร์เจีย', 'three strings', 'สามสาย', 'folk music', 'ดนตรีพื้นบ้าน', 'polyphonic song', 'เพลงประสานเสียง'],
    // a wooden lute with a pear-shaped carved body, a long neck and three tuning pegs, three strings, a ring of little holes, smiling, with music notes floating up
    g(108, 150, 0.68, R(-8, -150, 16, 112, '#A1673F', 3) + R(-13, -182, 26, 34, '#8D5524', 5) + [[-18, -174], [18, -170], [-18, -158]].map(([x, y]) => C(x, y, 5, '#5D4037', 2.5)).join('')
      + P('M-40 40c-8-44 12-80 40-84 28 4 48 40 40 84-10 32-70 32-80 0z', '#C8862F') + Array.from({ length: 6 }, (_, k) => C(Math.cos(k * 1.05) * 12, -10 + Math.sin(k * 1.05) * 12, 2.5, '#5D4037', 0)).join('')
      + R(-14, 46, 28, 6, '#5D4037', 1, 2) + Lc('M-4-150v198M0-150v198M4-150v198', '#FFF8E1', 1.2) + face(0, 18, 0.5), 12)
      + [[180, 70], [200, 110]].map(([x, y]) => E(x, y, 7, 5, INK, 0) + Lc(`M${x + 6} ${y}v-22h8`, INK, 3)).join('')),

  // ---------- Tbilisi, Kazbegi, Batumi
  L('ge/tbilisi/landmark-ananuri.v1.svg', 'ป้อมอนานูรีริมทะเลสาบสีฟ้า', 'Ananuri fortress by the blue lake', ['ananuri', 'อนานูรี', 'ananuri fortress', 'ป้อมอนานูรี', 'zhinvali reservoir', 'อ่างเก็บน้ำจินวาลี', 'georgian military road', 'ถนนทหารจอร์เจีย', 'aragvi', 'on the way to kazbegi'], 'หากำแพงหินที่ตั้งอยู่ริมทะเลสาบสีฟ้าสดใส', 'Find the stone walls by the bright blue lake',
    // a stone fortress wall with square corner towers enclosing two little stone churches with pointed cone domes, on the green shore of a bright turquoise lake, wooded mountains behind
    sky('#E3F2FD') + P('M-4 124c40-62 80-72 120-42 40-52 90-42 128 10v40H-4z', '#66BB6A', 3) + P('M-4 168h248v76H-4z', '#26C6DA', 0) + Lc('M20 196h40M110 214h50M180 190h36', '#B2EBF2', 3)
      + P('M-4 170c60-8 180-8 248 0v-18H-4z', '#A5D6A7', 0)
      + R(94, 82, 48, 46, '#EFEBE9', 0, 3) + R(108, 60, 20, 24, '#EFEBE9', 0, 3) + P('M104 62l14-26 14 26z', '#78909C', 3) + R(150, 96, 34, 32, '#E0D6CC', 0, 3) + R(160, 80, 14, 18, '#E0D6CC', 0, 3) + P('M156 82l11-20 11 20z', '#78909C', 3)
      + R(30, 122, 180, 46, '#D7CCC8', 0, 3) + Array.from({ length: 9 }, (_, k) => R(34 + k * 20, 114, 10, 10, '#D7CCC8', 0, 2.5)).join('') + R(22, 100, 28, 68, '#C8B9AE', 0, 3) + R(192, 94, 30, 74, '#C8B9AE', 0, 3)
      + R(32, 112, 6, 14, '#4E342E', 0, 0) + R(204, 108, 6, 14, '#4E342E', 0, 0) + P('M108 168v-22a12 12 0 0 1 24 0v22z', '#6D4C41', 2.5) + face(120, 104, 0.32)),
  L('ge/tbilisi/landmark-friendshipmonument.v1.svg', 'ระเบียงโมเสกที่กูดาอูรี', 'The round mosaic balcony at Gudauri', ['gudauri viewpoint', 'จุดชมวิวกูดาอูรี', 'friendship monument', 'อนุสาวรีย์มิตรภาพ', 'mosaic balcony', 'ระเบียงโมเสก', 'devil\'s valley', 'หุบเขาปีศาจ', 'georgian military road', 'caucasus view'], 'หาระเบียงโค้งใหญ่ที่มีภาพโมเสกสีสดใส', 'Find the big round balcony covered in a bright mosaic',
    // a big curved concrete balcony on a cliff edge, its inside wall covered in a bright mosaic of colourful squares, a deep green valley below and snowy Caucasus peaks behind, children looking out
    sky('#BBDEFB') + P('M-4 120l40-50 30 30 40-60 40 50 34-34 64 64z', '#ECEFF1', 3) + P('M-4 130c60-30 100-40 124-10 30-40 70-30 124 0v114H-4z', '#7CB342', 3) + Lc('M60 170c30 20 80 30 120 10', '#558B2F', 4)
      + P('M24 244v-50c40-12 152-12 192 0v50z', '#A1887F', 3)
      + P('M36 196V124c0-58 168-58 168 0v72h-22v-70c0-34-124-34-124 0v70z', '#ECEFF1', 3)
      + Array.from({ length: 11 }, (_, k) => { const a = Math.PI + k * Math.PI / 10; const x = 120 + Math.cos(a) * 73, y = 128 + Math.sin(a) * 52; return R(x - 6, y - 6, 12, 12, ['#E53935', '#FDD835', '#1E88E5', '#43A047', '#FB8C00', '#8E24AA'][k % 6], 1, 1.5); }).join('')
      + [[48, 150], [48, 176], [192, 150], [192, 176]].map(([x, y], k) => R(x - 6, y - 6, 12, 12, ['#E53935', '#FDD835', '#1E88E5', '#43A047'][k], 1, 1.5)).join('')
      + kid(104, 208, '#E53935', 1.2) + kid(136, 208, '#FDD835', 1.1) + face(120, 228, 0.36)),
  L('ge/tbilisi/landmark-rikeconcerthall.v1.svg', 'หอแสดงดนตรีรูปท่อยักษ์ในสวนริเก', 'The giant tubes of Rike Park', ['rike park', 'สวนริเก', 'concert hall tubes', 'ท่อยักษ์', 'music theatre and exhibition hall', 'หอแสดงดนตรี', 'modern architecture', 'สถาปัตยกรรมสมัยใหม่', 'mtkvari river', 'แม่น้ำมตควารี'], 'หาท่อเงินยักษ์สองท่อที่นอนอยู่บนสนามหญ้า', 'Find the two giant silver tubes lying on the grass',
    // two huge shiny metal tubes like telescopes lying at angles on a green park lawn, their ends made of glass, round trees and a river in front
    sky('#E3F2FD') + P('M-4 132c80-10 160-10 248 0v60H-4z', '#8BC34A', 0) + P('M-4 190h248v54H-4z', '#4FC3F7', 0) + Lc('M20 210h40M120 226h50M196 204h30', '#B3E5FC', 3)
      + g(158, 102, 1, R(-62, -18, 124, 36, '#B0BEC5', 18, 3) + E(-60, 0, 9, 18, '#81D4FA', 3) + Lc('M-20-18v36M20-18v36', '#90A4AE', 2), 16)
      + g(92, 128, 1, R(-74, -24, 148, 48, '#CFD8DC', 24, 3) + E(72, 0, 11, 24, '#81D4FA', 3) + Lc('M-30-24v48M10-24v48M46-24v48', '#B0BEC5', 2.5) + face(-18, -2, 0.42), -12)
      + [[24, 150], [214, 148]].map(([x, y]) => Lc(`M${x} ${y + 20}v-12`, '#6D4C41', 3) + C(x, y, 13, '#43A047', 2.5)).join('') + kid(196, 186, '#FB8C00', 1)),
  L('ge/tbilisi/landmark-servicehall.v1.svg', 'หลังคาดอกเห็ดยักษ์ของทบิลิซี', 'The giant white mushroom roofs of Tbilisi', ['public service hall', 'หอบริการประชาชน', 'mushroom roofs', 'หลังคาดอกเห็ด', 'white petals', 'กลีบสีขาว', 'modern architecture', 'สถาปัตยกรรมสมัยใหม่', 'mtkvari', 'riverside'], 'หาหลังคาสีขาวรูปดอกเห็ดยักษ์ที่อยู่บนตึกกระจก', 'Find the giant white mushrooms on top of the glass building',
    // a low glass building by a river with a cluster of huge white mushroom-shaped canopies on tall stems rising over it, the biggest one smiling
    sky('#E1F5FE') + P('M-4 196h248v48H-4z', '#4FC3F7', 0) + P('M-4 186h248v12H-4z', '#B0BEC5', 0) + R(44, 146, 152, 42, '#B3E5FC', 0, 3) + Lc('M70 146v42M96 146v42M122 146v42M148 146v42M174 146v42', '#81D4FA', 2)
      + [[178, 120, 0.8], [62, 116, 0.95], [150, 94, 1], [96, 128, 0.75], [114, 84, 1.25]].map(([x, y, s], k) => g(x, y, s, R(-5, 0, 10, 60, '#ECEFF1', 0, 2.5) + P('M-38 0c6-26 70-26 76 0-22 9-54 9-76 0z', '#FAFAFA', 3) + Lc('M-22-6c10-8 34-8 44 0', '#E0E0E0', 2) + (k === 4 ? face(0, -6, 0.32) : ''))).join('')
      + Lc('M20 214h30M150 226h40', '#B3E5FC', 3)),
  L('ge/tbilisi/landmark-alphabettower.v1.svg', 'หอคอยเกลียวคู่ริมทะเลบาตูมี', 'Batumi\'s twisting Alphabet Tower', ['alphabetic tower', 'alphabet tower', 'หอคอยตัวอักษร', 'batumi boulevard', 'ถนนเลียบทะเลบาตูมี', 'twisted tower', 'หอคอยเกลียว', 'black sea', 'ทะเลดำ', 'double spiral'], 'หาหอคอยที่มีริบบิ้นพันเป็นเกลียวและมีลูกบอลอยู่บนยอด', 'Find the tower wrapped in a twisting ribbon with a ball on top',
    // a tall slim steel tower wrapped in two twisting ribbons, one white and one green, a shiny silver ball on top, beside the Black Sea with palm trees on the promenade
    sky('#B3E5FC') + P('M-4 182h248v40H-4z', '#0288D1', 0) + Lc('M14 196h30M180 202h40', '#81D4FA', 3) + P('M-4 214h248v30H-4z', '#E0E0E0', 0) + R(112, 46, 16, 170, '#90A4AE', 0, 3)
      + [['#FFFFFF', 0], ['#66BB6A', 1]].map(([c, ph]) => { let d = `M${ph ? 144 : 96} 210`, y = 210; for (let i = 0; i < 10; i++) { const a = (i + ph) % 2 ? 96 : 144, b = (i + ph) % 2 ? 144 : 96; d += `C${a} ${y - 8} ${b} ${y - 8} ${b} ${y - 16}`; y -= 16; } return Lc(d, INK, 11) + Lc(d, c, 6); }).join('')
      + C(120, 38, 15, '#ECEFF1', 3) + Lc('M112 32a9 9 0 0 1 8-6', '#FFFFFF', 3)
      + [[30, 214, 1], [214, 214, -1]].map(([x, y]) => Lc(`M${x} ${y}c2-30 0-50 4-70`, '#6D4C41', 4) + Array.from({ length: 5 }, (_, j) => Lc(`M${x + 4} ${y - 70}q${-14 + j * 7} -10 ${-24 + j * 12} ${4 + Math.abs(j - 2) * 4}`, '#2E7D32', 4)).join('')).join('') + face(120, 40, 0.3)),
  { id: 'ge-tbilisi.day.sighnaghi', cat: 'day', file: 'ge/tbilisi/day-sighnaghi.v1.svg', name: nm('ซิกนากี เมืองบนเนินเหนือหุบเขาอาลาซานี', 'Sighnaghi on its hill above the Alazani Valley'), kw: ['sighnaghi', 'signagi', 'ซิกนากี', 'alazani valley', 'หุบเขาอาลาซานี', 'kakheti', 'คาเคติ', 'city of love', 'เมืองแห่งความรัก', 'red roofs', 'caucasus view'],
    // a little town of red-roofed houses with wooden balconies climbing a green hill, a round stone tower and cypress trees, the wide patchwork Alazani Valley below and a long line of snowy Caucasus peaks far away
    svg: scene('gts-d1', '#E3F2FD', P('M-4 96l26-24 20 12 30-34 26 24 22-18 34 30 30-26 30 22 34-14v40H-4z', '#ECEFF1', 3) + P('M-4 104h248v54H-4z', '#AED581', 0) + Lc('M-4 118h248M-4 134h248M40 104l-20 54M110 104l-6 54M180 104l12 54', '#C5E1A5', 3)
      + P('M-4 250V174c40-34 100-44 150-34s80 20 102 34v76z', '#8BC34A', 3)
      + [[30, 176], [68, 162], [108, 156], [150, 160], [188, 172], [50, 204], [94, 196], [140, 198], [184, 206]].map(([x, y], k) => R(x, y, 34, 26, ['#FFF8E1', '#FFE0B2', '#FFFFFF'][k % 3], 0, 2.5) + P(`M${x - 3} ${y + 2}l20-12 20 12z`, '#D84315', 2.5) + R(x + 4, y + 12, 26, 4, '#8D6E63', 0, 1.5) + R(x + 12, y + 16, 8, 10, '#6D4C41', 0, 1.5)).join('')
      + R(118, 120, 22, 40, '#BCAAA4', 0, 3) + P('M114 122l15-14 15 14z', '#8D6E63', 3) + R(125, 132, 8, 10, '#4E342E', 0, 1.5)
      + [[18, 170], [222, 178], [76, 150]].map(([x, y]) => P(`M${x} ${y}c-8-10-8-34 0-46 8 12 8 36 0 46z`, '#2E7D32', 2.5)).join('')) },

  // ---------- Peru
  K('pe', 'food', 'ceviche', 'เซบีเช ปลาดิบหมักมะนาว', 'Ceviche, fish in lime', ['ceviche', 'เซบีเช', 'cebiche', 'lime fish', 'ปลาหมักมะนาว', 'red onion', 'หอมแดง', 'sweet potato', 'มันหวาน', 'choclo corn', 'peruvian food'],
    // a white bowl of cubes of white fish in lime juice with rings of red onion and coriander leaves, a big-kernel Andean corn cob and a slice of orange sweet potato beside it, lime halves
    P('M28 118h184c-6 56-42 86-92 86s-86-30-92-86z', '#FFFFFF') + Lc('M40 140c40 10 120 10 160 0', '#D91023', 3) + E(120, 118, 92, 20, '#FFF8E1')
      + [[74, 112], [96, 106], [120, 114], [144, 106], [164, 114], [108, 124], [136, 124], [86, 122]].map(([x, y]) => R(x - 6, y - 6, 12, 12, '#FAFAFA', 2, 2)).join('')
      + Lc('M70 104a10 6 0 1 0 20 0M128 100a10 6 0 1 0 20 0M150 124a10 6 0 1 0 18-4', '#AD1457', 3) + [[100, 114], [156, 102], [82, 128]].map(([x, y]) => E(x, y, 5, 3, '#43A047', 1.5)).join('')
      + g(48, 92, 1, E(0, 0, 28, 13, '#FFF59D', 3) + Array.from({ length: 6 }, (_, k) => C(-18 + k * 7, -3 + (k % 2) * 6, 3, '#FDD835', 1.2)).join(''), -20)
      + R(150, 70, 40, 26, '#FB8C00', 8, 3) + g(206, 104, 1, C(0, 0, 17, '#AED581', 3) + C(0, 0, 11, '#DCEDC8', 0) + Lc('M0-10v20M-9-5l18 10M-9 5l18-10', '#AED581', 1.5)) + face(120, 162, 0.5)),
  K('pe', 'animal', 'vizcacha', 'วิสกาชา กระต่ายหางยาวแห่งเทือกเขาแอนดีส', 'A vizcacha on the rocks', ['vizcacha', 'วิสกาชา', 'mountain viscacha', 'andes rodent', 'สัตว์แทะเทือกเขาแอนดีส', 'long tail', 'หางยาว', 'chinchilla cousin', 'ญาติชินชิลลา', 'machu picchu rocks'],
    // a fluffy grey animal like a rabbit with a long curly tail sitting up on a grey rock, long ears with pink insides, long whiskers, a sleepy smile
    P('M26 214c0-40 32-62 94-62s96 22 96 62z', '#9E9E9E') + Lc('M60 186l14-10M170 182l-12 12', '#757575', 3)
      + Lc('M150 160c34 6 50-14 42-38-4-12-14-14-18-6', '#757575', 9) + E(120, 144, 40, 34, '#BDBDBD') + E(120, 152, 22, 20, '#E0E0E0', 0)
      + [[102, 60, -12], [138, 60, 12]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 9, 24, '#BDBDBD') + E(0, 2, 4, 16, '#F8BBD0', 0), r)).join('') + C(120, 98, 28, '#C7C7C7')
      + Lc('M96 108h-26M96 112l-24 6M144 108h26M144 112l24 6', INK, 1.5) + [[104, 176], [136, 176]].map(([x, y]) => E(x, y, 9, 6, '#BDBDBD', 2.5)).join('') + face(120, 98, 0.5, 'w')),
  K('pe', 'culture', 'siku', 'ซิกุ ขลุ่ยแพนของชาวแอนดีส', 'The siku, Andean pan pipes', ['siku', 'ซิกุ', 'zampoña', 'ซัมโปญา', 'pan pipes', 'ขลุ่ยแพน', 'andean music', 'ดนตรีแอนดีส', 'bamboo pipes', 'ท่อไม้ไผ่'],
    // a row of bamboo pipes from long to short tied together with a bright woven band, little pompom tassels hanging from the end, music notes floating out
    g(116, 120, 1, Array.from({ length: 7 }, (_, k) => R(-66 + k * 19, -70, 18, 146 - k * 15, '#D7B074', 4, 2.5) + E(-57 + k * 19, -70, 7, 2.5, '#8D6E63', 1.5)).join('')
      + R(-70, -36, 140, 16, '#E53935', 2, 2.5) + Lc('M-66-28l6-5 6 5 6-5 6 5 6-5 6 5 6-5 6 5 6-5 6 5 6-5 6 5 6-5 6 5 6-5 6 5 6-5 6 5 6-5 6 5', '#FFCA28', 2)
      + Lc('M70-28c10 4 12 20 8 34M70-28c16 0 22 14 22 26', '#E53935', 2) + C(78, 10, 6, '#43A047', 2) + C(92, 2, 6, '#1E88E5', 2) + face(-30, 14, 0.4), -10)
      + [[196, 48], [214, 84]].map(([x, y]) => E(x, y, 7, 5, INK, 0) + Lc(`M${x + 6} ${y}v-22h8`, INK, 3)).join('')),

  // ---------- Cusco, the Sacred Valley, Titicaca and Lima
  L('pe/cusco/landmark-sacsayhuaman.v1.svg', 'กำแพงหินยักษ์ซักไซวามาน', 'The giant stone walls of Sacsayhuamán', ['sacsayhuaman', 'sacsayhuamán', 'ซักไซวามาน', 'inca walls', 'กำแพงอินคา', 'giant fitted stones', 'หินยักษ์ต่อกันพอดี', 'zigzag walls', 'กำแพงซิกแซก', 'rodadero rock slide'], 'หาก้อนหินยักษ์ที่ต่อกันพอดีเหมือนจิ๊กซอว์', 'Find the huge stones that fit together like a jigsaw',
    // zigzag terraces of enormous grey stones fitted together with no gaps, a green field in front, a smooth rock slide on the side with a child sliding down it, hills and blue sky
    sky('#B3E5FC') + P('M-4 80c50-30 100-20 140-4s80-10 108 4v40H-4z', '#9CCC65', 3) + P('M-4 96l40-16 40 16 40-16 40 16 40-16 48 16v20H-4z', '#CFC8BA', 3)
      + [['M-4 120l26-14 20 6 2 34-48 4z', '#BDB5A6'], ['M42 112l26-8 22 14-4 40-42-4z', '#CFC8BA'], ['M90 118l30-14 22 10-2 46-46 2z', '#B0A796'], ['M142 114l28-10 24 16-6 42-48-2z', '#C8C0B0'], ['M194 120l30-16 20 12v44l-56 2z', '#BDB5A6'],
        ['M-4 160l48-4 8 22H-4z', '#C8C0B0'], ['M44 156l42 4 6 18H52z', '#B0A796'], ['M86 160l50-2 2 20H92z', '#D2CBBD'], ['M136 158l52 2-6 18h-44z', '#B0A796'], ['M188 160l56-2v20h-62z', '#C8C0B0']].map(([d, c]) => P(d, c, 3)).join('')
      + P('M-4 178h248v66H-4z', '#9CCC65', 0)
      + P('M170 244c0-30 24-56 74-64v64z', '#9E9E9E', 3) + Lc('M186 238c6-20 22-38 54-46M200 240c6-16 18-28 40-34', '#BDBDBD', 4) + g(214, 208, 1, kid(0, 0, '#FB8C00', 1.2), -30)
      + face(116, 138, 0.38)),
  L('pe/cusco/landmark-qeswachaka.v1.svg', 'สะพานเชือกหญ้าเกสวาชากา', 'Q\'eswachaka, the woven grass bridge', ['qeswachaka', 'q\'eswachaka', 'เกสวาชากา', 'grass rope bridge', 'สะพานเชือกหญ้า', 'inca bridge', 'สะพานอินคา', 'apurimac river', 'แม่น้ำอาปูริมัก', 'woven every year'], 'หาสะพานที่ทำจากเชือกหญ้าสานห้อยข้ามหุบเหว', 'Find the bridge made of woven grass ropes hanging over the gorge',
    // a sagging bridge of thick golden woven grass ropes strung between two rocky cliffs over a deep gorge with a river at the bottom, a child crossing holding the rope rails
    sky('#E3F2FD') + P('M60 120l30-30 30 20 30-24 30 34v124H60z', '#BCAAA4', 3) + Lc('M90 150l10 30M140 140l-6 40M110 200l14 20', '#A1887F', 3) + P('M-4 92h72l14 152H-4z', '#8D6E63', 3) + P('M244 92h-72l-14 152h86z', '#8D6E63', 3) + P('M-4 92h72v-10H-4zM244 92h-72v-10h72z', '#8BC34A', 0)
      + P('M76 234c30-12 58-12 88 0v10H76z', '#4FC3F7', 3) + Lc('M20 140l20 10M200 150l20-10M30 200l14 6M196 206l14-6', '#6D4C41', 3)
      + Lc('M68 96Q120 150 172 96', INK, 12) + Lc('M68 96Q120 150 172 96', '#D4B04A', 7) + Lc('M68 64Q120 112 172 64', INK, 8) + Lc('M68 64Q120 112 172 64', '#E3C565', 4)
      + Array.from({ length: 9 }, (_, k) => { const t = (k + 1) / 10, x = 68 + 104 * t, yb = 96 + 2 * t * (1 - t) * 54, yt = 64 + 2 * t * (1 - t) * 48; return Lc(`M${x.toFixed(1)} ${yt.toFixed(1)}V${yb.toFixed(1)}`, '#A1887F', 1.5); }).join('')
      + R(58, 58, 12, 44, '#BCAAA4', 2, 2.5) + R(170, 58, 12, 44, '#BCAAA4', 2, 2.5) + kid(112, 118, '#E53935', 1.2) + face(26, 170, 0.36)),
  L('pe/cusco/landmark-huacapucllana.v1.svg', 'พีระมิดดินฮัวกาปุกยานาในลิมา', 'Huaca Pucllana, the mud-brick pyramid of Lima', ['huaca pucllana', 'ฮัวกาปุกยานา', 'adobe pyramid', 'พีระมิดอิฐดิน', 'miraflores', 'มิราฟลอเรส', 'mud bricks', 'อิฐดินเหนียว', 'ancient lima', 'ลิมาโบราณ'], 'หาอิฐที่ตั้งเรียงเหมือนหนังสือบนชั้น', 'Find the bricks standing up like books on a shelf',
    // a stepped pyramid of sandy mud bricks set upright in rows like books on a shelf, a ramp up its side, tall pale city flats behind it under a soft grey sky, a child at the foot
    sky('#ECEFF1') + [[10, 60, 40], [176, 40, 50], [70, 76, 30]].map(([x, y, w]) => R(x, y, w, 150, '#E0E0E0', 0, 2.5) + Array.from({ length: 5 }, (_, j) => Lc(`M${x + 6} ${y + 14 + j * 24}h${w - 12}`, '#B0BEC5', 3)).join('')).join('')
      + [[18, 192, 204, 40], [40, 152, 160, 40], [62, 114, 116, 38], [86, 82, 68, 32]].map(([x, y, w, h]) => R(x, y, w, h, '#C8A27A', 0, 3) + Lc(Array.from({ length: Math.floor(w / 7) - 1 }, (_, j) => `M${x + 6 + j * 7} ${y + 5}v${h - 10}`).join(''), '#A07850', 2)).join('')
      + Lc('M150 232l32-40M162 232l32-40', '#E6C9A0', 5) + P('M-4 232h248v12H-4z', '#D7C4A3', 0) + kid(40, 230, '#43A047', 1.2) + face(120, 134, 0.36)),
  L('pe/cusco/landmark-pinkuylluna.v1.svg', 'ยุ้งฉางหินบนภูเขาที่โอยันไตตัมโบ', 'The stone storehouses of Ollantaytambo', ['ollantaytambo', 'โอยันไตตัมโบ', 'pinkuylluna', 'ปินกุยยูนา', 'inca storehouses', 'ยุ้งฉางอินคา', 'colcas', 'mountain path', 'ทางเดินภูเขา', 'sacred valley'], 'หาบ้านหินเล็กๆ ที่เกาะอยู่สูงบนภูเขาชัน', 'Find the little stone storehouses high up on the steep mountain',
    // a steep green mountain with little stone storehouses with pointed gable walls perched along a zigzag path, stone houses of the old village at the foot, blue sky
    sky('#B3E5FC') + P('M-4 244V140c40-70 80-110 112-120 44 22 96 86 140 150v74z', '#8D9B5A', 3) + Lc('M60 214l60-20-50-24 70-24-44-26 50-30', '#E6C9A0', 4)
      + [[76, 96, 1], [124, 60, 1.1], [156, 112, 0.9], [96, 146, 0.95]].map(([x, y, s], k) => g(x, y, s, R(-18, -14, 36, 24, '#BCAAA4', 0, 2.5) + P('M-20-14l20-14 20 14z', '#BCAAA4', 2.5) + R(-4, -6, 8, 16, '#5D4037', 0, 2) + (k === 1 ? face(0, -16, 0.22, 'none') : ''))).join('')
      + P('M-4 244v-34h248v34z', '#A1887F', 0) + [[10, 206], [56, 212], [150, 208], [196, 204]].map(([x, y]) => R(x, y, 40, 24, '#BCAAA4', 0, 2.5) + P(`M${x - 4} ${y + 2}l24-14 24 14z`, '#C8A050', 2.5) + R(x + 16, y + 10, 8, 14, '#5D4037', 0, 1.5)).join('')
      + kid(120, 238, '#E53935', 1.1)),
  L('pe/cusco/landmark-starllama.v1.svg', 'ลามาแห่งทางช้างเผือกของชาวอินคา', 'The Inca llama in the Milky Way', ['milky way llama', 'ลามาในทางช้างเผือก', 'inca stars', 'ดาวของชาวอินคา', 'dark constellations', 'กลุ่มดาวเงามืด', 'planetarium cusco', 'ท้องฟ้าจำลองคุสโก', 'stargazing', 'ดูดาว'], 'หาลามาสีเข้มที่ซ่อนอยู่ในทางช้างเผือก มีดาวสว่างสองดวงเป็นตา', 'Find the dark llama hiding in the Milky Way, with two bright stars for eyes',
    // a deep night sky with a pale band of the Milky Way across it, a llama shape made of dark clouds inside the band with two bright stars for eyes, dark mountains below and a child with a telescope
    sky('#0D1B3E') + Array.from({ length: 24 }, (_, k) => C((k * 47) % 240, 6 + ((k * 31) % 150), k % 5 ? 1.2 : 2, '#FFFFFF', 0)).join('')
      + g(120, 118, 1, R(-220, -66, 440, 132, '#3F51B5', 0, 0) + R(-220, -40, 440, 80, '#5C6BC0', 0, 0) + R(-220, -16, 440, 32, '#7986CB', 0, 0), -24)
      + g(122, 122, 1, g(-111, -160, 1, P('M70 176c0-10 12-18 30-18h26v-30c0-8 6-12 12-12l2-10 6 10h4c8 2 10 10 4 14h-8v34c6 4 6 12 0 16v20h-8v-18h-10v18h-8v-18h-26v18h-8v-18h-8v18h-8z', '#0D1B3E', 3)
        + star4(142, 122, 9, '#FFF59D') + star4(156, 128, 7, '#FFF59D')))
      + P('M-4 244V214l40-24 30 18 40-36 40 26 30-18 68 32v32z', '#1B2A49', 3)
      + g(196, 226, 1, Lc('M0 0l-10 16M0 0l10 16M0 0v16', '#90A4AE', 2.5) + R(-22, -16, 30, 9, '#B0BEC5', 3, 2), -24) + kid(170, 232, '#FDD835', 1.1)),
];

export default { places: {}, items };
