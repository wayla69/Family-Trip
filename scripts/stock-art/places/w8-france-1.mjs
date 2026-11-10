// Wave 8, group france (1/3): France, Paris, Disneyland Paris (no characters, no rides: the trip around the park), Switzerland,
// Lucerne, Interlaken and Zermatt
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name; places whose scope differs from their folder are mapped (Disneyland Paris is a big-attraction place, scope p-)
const SCOPE = { 'fr-disney-paris': 'p-disney-paris' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport)
const K = (cc, cat, key, th, en, kw, svg) => ({ id: `${cc}.${cat}.${key}`, cat, file: `${cc}/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const star = (x, y, c = '#FFEB3B') => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, c, 2);
const alps = (c, snow) => P('M-4 110l46-56 30 30 44-58 46 54 30-26 52 56z', c, 3) + P('M30 68l12-14 10 10-8 2zM106 34l12-8 12 14-10-2zM188 70l10-10 12 14-10-2z', snow, 0);

const items = [
  // ---------- France
  K('fr', 'food', 'eclair', 'เอแคลร์ช็อกโกแลต', 'A chocolate éclair', ['eclair', 'เอแคลร์', 'chocolate eclair', 'เอแคลร์ช็อกโกแลต', 'choux pastry', 'แป้งชู', 'patisserie', 'ร้านขนมฝรั่งเศส', 'cream filling', 'coffee eclair'],
    // a long golden éclair glazed with shiny chocolate on a round plate, cream peeping out of the end, a smaller coffee éclair behind, a happy face on the front one
    E(120, 170, 104, 34, '#FFFFFF', 3) + E(120, 166, 84, 22, '#E3F2FD', 0)
      + g(132, 98, 1, R(-70, -18, 140, 36, '#E9B872', 18, 3) + P('M-66-6c0-10 6-14 16-14h100c10 0 16 4 16 14-20 6-40-4-66 4-24 8-46-8-66-4z', '#C69C6D', 3), -8)
      + R(28, 116, 176, 48, '#F2C27B', 24, 3) + P('M32 136c0-14 10-20 26-20h120c16 0 24 6 24 20-30 10-48-6-82 4-30 8-62-10-88-4z', '#5D3A1A', 3)
      + Lc('M60 124c20-4 40-4 60 0', '#8D6E63', 3) + P('M202 140c12-4 16 8 8 12-6 4-12-2-8-12z', '#FFF8E1', 2.5) + C(40, 156, 3, '#E9B872', 0) + face(116, 146, 0.55)),
  K('fr', 'culture', 'cyclist', 'นักปั่นจักรยานเสื้อเหลืองในการแข่งตูร์เดอฟร็องส์', 'A racing cyclist in the yellow jersey', ['tour de france', 'ตูร์เดอฟร็องส์', 'yellow jersey', 'เสื้อเหลือง', 'maillot jaune', 'bike race', 'แข่งจักรยาน', 'racing cyclist', 'นักปั่น', 'cheering crowd'],
    // a cyclist in a yellow jersey and helmet leaning over a slim racing bike, speed lines behind, a tiny polka-dot cap and a cheering hand waving a scarf at the roadside
    E(120, 214, 108, 10, '#CFD8DC', 0) + Lc('M8 120h40M14 140h34M20 160h26', '#90CAF9', 5)
      + C(70, 176, 34, '#FFFFFF', 4) + C(184, 176, 34, '#FFFFFF', 4) + C(70, 176, 6, INK, 0) + C(184, 176, 6, INK, 0)
      + Lc('M70 176l40-50h56l18 50M110 126l18 50 38-50M128 176l-58 0', '#E53935', 6) + Lc('M106 118h14M166 126l-4-14 14-4', INK, 4)
      + P('M112 112c14-30 44-40 62-28l-4 22c-14-6-30 0-40 14z', '#FFEB3B', 3) + Lc('M150 92l20 30M126 116l14 34', '#FFE0BD', 9) + P('M118 110l14 40h-10l-10-36z', '#212121', 2.5)
      + C(184, 78, 17, '#FFE0BD', 3) + P('M166 74c0-20 34-24 38-2z', '#FFEB3B', 3) + Lc('M174 64l20-2', '#E53935', 3) + face(186, 84, 0.3)
      + g(34, 70, 1, Lc('M0 30v-30', '#FFE0BD', 7) + P('M2-2c16-8 28 4 42-4v20c-14 8-26-4-42 4z', '#FFFFFF', 2.5) + [[14, 4], [30, 6], [22, 12], [38, 12]].map(([x, y]) => C(x, y, 3, '#E53935', 0)).join(''))),
  K('fr', 'food', 'camembert', 'ชีสกาม็องแบร์ในกล่องไม้กลม', 'Camembert in its round wooden box', ['camembert', 'กาม็องแบร์', 'french cheese', 'ชีสฝรั่งเศส', 'cheese box', 'กล่องไม้', 'soft cheese', 'ชีสเนื้อนุ่ม', 'normandy cheese', 'cheese platter'],
    // a round wooden box with its lid leaning beside it, a white bloomy cheese inside with a wedge cut out showing the soft creamy middle, a slice on a little knife-free board, a smiling face
    g(176, 104, 1, E(0, 0, 44, 50, '#E2B57A', 3) + E(0, 0, 34, 40, '#F0CB93', 2) + Lc('M-20-30c10-6 30-4 34 10', '#B8854A', 2), 18)
      + P('M24 140v34c0 22 140 22 140 0v-34z', '#D9A55F', 3) + Lc('M24 160c30 14 110 14 140 0', '#B8854A', 2.5)
      + E(94, 140, 70, 22, '#FFFDF5', 3) + P('M94 140l60-10c6 4 8 8 8 12l-6 22-62-6z', '#F7D774', 3) + P('M94 140l62-10', '#FFFDF5', 0)
      + P('M94 140l58 4v20l-58-6z', '#FCE38A', 2.5) + Lc('M100 148l40 3', '#E9C46A', 2) + [[60, 134], [76, 146], [120, 128]].map(([x, y]) => C(x, y, 2.5, '#E0E0E0', 0)).join('') + face(70, 138, 0.45)
      + g(186, 196, 1, P('M-22 0l20-24c18 4 26 14 24 24z', '#FCE38A', 3) + P('M-22 0l20-24', '#FFFDF5', 4))),

  // ---------- Paris
  L('fr/paris/landmark-pompidou.v1.svg', 'ศูนย์ปงปีดูที่มีท่อสีสันอยู่ข้างนอก', 'The Centre Pompidou with its colourful pipes outside', ['centre pompidou', 'ศูนย์ปงปีดู', 'beaubourg', 'โบบูร์ก', 'colourful pipes', 'ท่อหลากสี', 'tube escalator', 'บันไดเลื่อนในหลอดแก้ว', 'modern art museum', 'piazza'], 'หาท่อสีแดงที่พาบันไดเลื่อนขึ้นไปบนตึก', 'Find the see-through tube that carries the escalator up the building',
    // a big box building wrapped in a frame of white crossed struts, fat blue, green, yellow and red pipes running up its side, a glass tube escalator zigzagging up the front, kids on the sloping square
    sky('#E1F5FE') + R(-4, 196, 248, 48, '#E0C9A6', 0, 3) + Lc('M-4 214l248-14', '#C9AE86', 2)
      + R(26, 44, 188, 152, '#F5F5F5', 0, 3) + Array.from({ length: 4 }, (_, k) => Lc(`M26 ${82 + k * 38}h188`, '#90A4AE', 3)).join('') + Array.from({ length: 5 }, (_, k) => Lc(`M${26 + k * 47} 44l47 38M${73 + k * 47} 44l-47 38`, '#B0BEC5', 2)).join('')
      + [[34, '#1E88E5'], [52, '#43A047'], [68, '#FDD835'], [84, '#E53935']].map(([x, c]) => R(x, 36, 12, 160, c, 6, 2.5)).join('') + [[44, 30, '#1E88E5'], [62, 26, '#43A047']].map(([x, y, c]) => P(`M${x - 10} ${y + 12}c0-12 20-12 20 0`, c, 2.5)).join('')
      + P('M110 190l92-150', '#E3F2FD', 0) + Lc('M108 194l20-30h40l20-30h-30l18-30h30l14-24', '#E53935', 12) + Lc('M108 194l20-30h40l20-30h-30l18-30h30l14-24', '#FFCDD2', 5)
      + face(150, 120, 0.42) + kid(40, 222, '#7E57C2', 0.85) + kid(200, 218, '#FFB300', 0.85)),
  L('fr/paris/landmark-bouquinistes.v1.svg', 'แผงหนังสือเก่าสีเขียวริมแม่น้ำแซน', 'The green bookstalls along the Seine', ['bouquinistes', 'บูกีนิสต์', 'bookstalls', 'แผงหนังสือ', 'old books', 'หนังสือเก่า', 'quai', 'ริมแม่น้ำแซน', 'second-hand books', 'old posters'], 'หาฝากล่องสีเขียวที่เปิดอ้าโชว์หนังสือ', 'Find the green box lid propped open to show the books',
    // three dark-green metal boxes sitting on a stone river wall, their lids propped up showing rows of colourful books and little posters, the river and a bridge arch below, a plane tree branch above
    sky('#FFF3E0') + R(-4, 160, 248, 84, '#4FC3F7', 0, 3) + P('M150 244c0-40 30-60 60-60s40 20 40 60', '#FFF3E0', 3) + R(-4, 120, 248, 44, '#D7CCC8', 0, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${k * 44} 120v44`, '#BCAAA4', 2)).join('')
      + [8, 86, 164].map((x, k) => R(x, 92, 68, 30, '#2E7D32', 2, 3) + P(`M${x} 92l6-50h56l6 50z`, '#388E3C', 3) + P(`M${x + 8} 88l4-40h44l4 40z`, '#FFF8E1', 2)
        + [0, 1, 2, 3, 4].map((j) => R(x + 12 + j * 9, 58 + (j % 2) * 4, 7, 28 - (j % 2) * 4, ['#E53935', '#1E88E5', '#FDD835', '#8E24AA', '#FB8C00'][(j + k) % 5], 1, 1.5)).join('')
        + (k === 1 ? face(x + 34, 108, 0.35) : '')).join('')
      + Lc('M-4 20c40 10 70 6 110 18', '#6D4C41', 6) + [[20, 26], [50, 16], [80, 32], [100, 20]].map(([x, y]) => P(`M${x} ${y}c10-10 20-6 18 6-8 8-18 6-18-6z`, '#7CB342', 2)).join('') + Lc('M16 210c20-6 40 6 60 0M100 224c20-6 30 6 46 0', '#E1F5FE', 3)),
  L('fr/paris/landmark-evolution.v1.svg', 'ขบวนสัตว์ในหอวิวัฒนาการ สวนพฤกษศาสตร์ปารีส', 'The animal parade of the Grand Gallery of Evolution', ['grande galerie de l\'evolution', 'หอวิวัฒนาการ', 'jardin des plantes', 'ฌาร์แด็งเดปลองต์', 'natural history museum', 'พิพิธภัณฑ์ธรรมชาติวิทยา', 'animal parade', 'ขบวนสัตว์', 'giraffe and elephant', 'glass roof hall'], 'หายีราฟที่คอยาวที่สุดในขบวน', 'Find the giraffe with the longest neck in the parade',
    // a tall hall under a curved glass roof, a long line of animals marching across the floor: an elephant, a giraffe, a zebra and a rhino, balconies on both sides, a kid pointing
    sky('#EDE7F6') + P('M-4 60c60-50 188-50 248 0v-64H-4z', '#B3E5FC', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${20 + k * 40} 54l${-8 + k * 3}-40`, '#81D4FA', 2)).join('') + Lc('M-4 60c60-50 188-50 248 0', INK, 3)
      + [[0, 80], [0, 120], [210, 80], [210, 120]].map(([x, y]) => R(x - 4, y, 38, 8, '#8D6E63', 0, 2.5) + Array.from({ length: 4 }, (_, j) => Lc(`M${x + j * 9} ${y + 8}v14`, '#8D6E63', 2)).join('')).join('')
      + R(-4, 190, 248, 54, '#A1887F', 0, 3)
      + g(64, 168, 1, E(0, 0, 34, 24, '#B0BEC5', 3) + R(-26, 14, 12, 26, '#B0BEC5', 3, 2.5) + R(14, 14, 12, 26, '#B0BEC5', 3, 2.5) + C(-34, -10, 18, '#B0BEC5', 3) + P('M-48-4c-12 10-10 30 0 38', 'none', 6) + E(-26, -14, 10, 14, '#CFD8DC', 2) + face(-36, -12, 0.25))
      + g(128, 174, 1, E(0, 0, 22, 14, '#FFCA28', 3) + Lc('M-14 10v28M14 10v28', INK, 4) + P('M14-6l20-70 10 4-18 72z', '#FFCA28', 3) + E(42, -72, 12, 8, '#FFCA28', 3) + [[-8, -2], [6, 4], [20, -30], [26, -54]].map(([x, y]) => C(x, y, 4, '#A1673F', 0)).join('') + face(42, -72, 0.18))
      + g(182, 186, 1, E(0, 0, 22, 14, '#FFFFFF', 3) + [-12, -4, 4, 12].map((x) => Lc(`M${x}-12v22`, INK, 3)).join('') + Lc('M-12 10v18M12 10v18', INK, 4) + E(26, -10, 9, 7, '#FFFFFF', 3) + face(26, -10, 0.15))
      + kid(214, 222, '#43A047', 0.85)),
  L('fr/paris/landmark-pendulum.v1.svg', 'ลูกตุ้มฟูโกใต้โดมแพนเทียน', 'Foucault\'s pendulum under the Panthéon dome', ['pantheon', 'แพนเทียน', 'foucault pendulum', 'ลูกตุ้มฟูโก', 'pendulum', 'ลูกตุ้ม', 'earth turning', 'โลกหมุน', 'latin quarter', 'science'], 'หาลูกตุ้มทองที่แกว่งไปมาเหนือวงกลม', 'Find the golden ball swinging over the big round dial',
    // inside a domed hall: a very long wire hanging from the top of the dome, a shiny golden ball swinging over a round dial on the floor marked with ticks, little pegs knocked over, a kid watching
    sky('#FFF8E1') + P('M20 120c0-80 200-80 200 0z', '#FFECB3', 3) + P('M60 120c0-50 120-50 120 0', 'none', 2) + R(10, 120, 220, 16, '#E0C9A6', 0, 3) + [24, 70, 150, 196].map((x) => R(x, 136, 20, 70, '#F5E6C8', 0, 3)).join('')
      + Lc('M120 30l40 130', '#90A4AE', 2.5) + C(120, 30, 5, '#8D6E63', 2) + E(120, 214, 96, 20, '#D7CCC8', 3) + E(120, 214, 72, 14, '#EFEBE9', 2)
      + Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2; return Lc(`M${(120 + Math.cos(a) * 80).toFixed(1)} ${(214 + Math.sin(a) * 17).toFixed(1)}l${(Math.cos(a) * 8).toFixed(1)} ${(Math.sin(a) * 2).toFixed(1)}`, INK, 2); }).join('')
      + [[54, 208], [66, 200], [180, 224]].map(([x, y], k) => (k === 1 ? P(`M${x} ${y}l10 4-2 4-10-4z`, '#E53935', 2) : R(x, y - 10, 4, 10, '#E53935', 1, 1.5))).join('')
      + C(160, 168, 18, '#FFC107', 3) + E(154, 162, 5, 4, '#FFF8E1', 0) + P('M160 186l-4 10h8z', '#FFA000', 2) + face(160, 168, 0.32) + Lc('M136 178c-6 8-6 16 0 22', '#BDBDBD', 2) + kid(38, 224, '#EC407A', 0.85)),
  L('fr/paris/landmark-ponyride.v1.svg', 'ขี่โพนี่ในสวนลักเซมบูร์ก', 'Pony rides in the Luxembourg Gardens', ['jardin du luxembourg', 'สวนลักเซมบูร์ก', 'pony ride', 'ขี่โพนี่', 'ponies', 'ม้าแคระ', 'kids in paris', 'luxembourg gardens', 'park walk', 'ทางเดินใต้ร่มไม้'], 'หาโพนี่ตัวที่มีผ้าปูหลังลายทาง', 'Find the pony with the striped saddle cloth',
    // two little ponies with striped saddle cloths walking on a sandy path, a child riding each, a grown-up leading one on a rope, clipped chestnut trees and green park chairs behind
    sky('#E8F5E9') + [[30, 70], [110, 60], [190, 70]].map(([x, y]) => R(x - 4, y + 20, 8, 70, '#6D4C41', 0, 2.5) + R(x - 34, y - 30, 68, 54, '#66BB6A', 14, 3)).join('') + R(-4, 160, 248, 84, '#F3DFB2', 0, 3)
      + [[66, 182, '#E53935', '#FFFFFF'], [170, 190, '#1E88E5', '#FFEB3B']].map(([x, y, a, b]) => g(x, y, 1, E(0, 0, 36, 20, '#A1673F', 3) + [-24, -10, 12, 26].map((lx) => R(lx - 4, 12, 8, 30, '#A1673F', 3, 2.5)).join('') + P('M30-6l16-26c10 0 16 8 14 16l-14 18z', '#A1673F', 3) + P('M34-30c-6-8-2-16 6-14', '#5D4037', 5) + P('M-36-4c-14 4-16 20-10 30', '#5D4037', 5)
        + R(-18, -16, 34, 20, a, 3, 2.5) + R(-12, -16, 8, 20, b, 0, 0) + R(4, -16, 8, 20, b, 0, 0) + face(50, -16, 0.2) + kid(0, -22, b === '#FFFFFF' ? '#FFCA28' : '#AB47BC', 0.9))).join('')
      + g(118, 196, 1, C(0, -40, 10, '#FFE0BD', 2.5) + P('M-12-28h24l4 40h-32z', '#5C6BC0', 2.5) + Lc('M-8 12v26M8 12v26', INK, 4) + face(0, -38, 0.25)) + Lc('M110 172c-10 6-20 4-26 0', '#795548', 2.5)),

  // ---------- Disneyland Paris (the trip around the park, no characters, no rides)
  L('fr/disney-paris/landmark-rer.v1.svg', 'รถไฟ RER สองชั้นไปสถานีมาร์น-ลา-วาเล', 'The double-decker RER train to the park station', ['rer a', 'รถไฟ rer', 'marne-la-vallee chessy', 'สถานีมาร์น-ลา-วาเล', 'double-decker train', 'รถไฟสองชั้น', 'train to the park', 'รถไฟไปสวนสนุก', 'from paris', 'station platform'], 'หาหน้าต่างชั้นบนที่มีเด็กโบกมือ', 'Find the child waving from the upstairs window',
    // a tall double-decker commuter train in white with a blue and red stripe pulling into a platform, two rows of windows with faces, a little family with a backpack on the platform, the overhead wire above
    sky('#E3F2FD') + Lc('M-4 26h248', '#546E7A', 2) + [40, 140].map((x) => Lc(`M${x} 26v20l14 8`, '#546E7A', 2)).join('')
      + P('M10 60h170c30 0 50 30 50 60v60H10z', '#FAFAFA', 3) + P('M180 60c30 0 50 30 50 60h-46z', '#B3E5FC', 3) + R(10, 150, 220, 10, '#1E88E5', 0, 0) + R(10, 160, 220, 6, '#E53935', 0, 0) + P('M10 60h170c30 0 50 30 50 60v60H10z', 'none', 3)
      + [0, 1, 2, 3].map((k) => R(20 + k * 40, 72, 30, 26, '#B3E5FC', 4, 2.5) + R(20 + k * 40, 112, 30, 26, '#B3E5FC', 4, 2.5)).join('') + kid(76, 102, '#FFB300', 0.7) + kid(116, 140, '#EC407A', 0.7)
      + face(206, 130, 0.38) + R(-4, 180, 248, 14, '#424242', 0, 3) + R(-4, 194, 248, 50, '#BDBDBD', 0, 3) + Lc('M-4 200h248', '#FDD835', 4)
      + kid(44, 232, '#43A047', 0.9) + kid(70, 236, '#7E57C2', 0.75) + g(110, 224, 1, C(0, -26, 10, '#FFE0BD', 2.5) + P('M-12-14h24l4 34h-32z', '#EF5350', 2.5) + R(10, -16, 12, 20, '#FFCA28', 3, 2) + face(0, -24, 0.25))),
  L('fr/disney-paris/landmark-strollers.v1.svg', 'ลานจอดรถเข็นเด็กหน้าเครื่องเล่น', 'The buggy parking outside a ride', ['stroller parking', 'ที่จอดรถเข็นเด็ก', 'buggy', 'รถเข็นเด็ก', 'pram', 'stroller', 'family day out', 'เที่ยวกับลูกเล็ก', 'park with toddlers', 'parking spot'], 'หารถเข็นคันที่มีลูกโป่งผูกไว้', 'Find the buggy with a balloon tied to it',
    // a neat row of colourful buggies parked on a striped painted area under a little roof sign with a buggy picture, one with a balloon tied to the handle, one with a sleepy teddy, a crowd queue rope behind
    sky('#FFF3E0') + R(-4, 150, 248, 94, '#CFD8DC', 0, 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${10 + k * 40} 160l-14 80`, '#FFFFFF', 4)).join('')
      + R(80, 28, 80, 44, '#5C6BC0', 8, 3) + g(120, 50, 0.5, P('M-24-16h30v22h-30zM6-16c14 0 22 10 22 22h-22z', '#FFFFFF', 3) + C(-16, 14, 6, '#FFFFFF', 3) + C(16, 14, 6, '#FFFFFF', 3)) + Lc('M120 72v20', INK, 3)
      + [[30, '#EF5350'], [84, '#42A5F5'], [138, '#66BB6A'], [192, '#AB47BC']].map(([x, c], k) => g(x, 186, 1, P('M-24-34h26v30h-26zM2-34c18 0 24 14 24 30H2z', c, 3) + R(-26, -4, 52, 8, '#455A64', 2, 2.5) + C(-18, 18, 9, '#FFFFFF', 3) + C(18, 18, 9, '#FFFFFF', 3) + Lc('M-24-34l-10-16', INK, 4)
        + (k === 1 ? face(14, -18, 0.25) : '') + (k === 2 ? C(-12, -40, 8, '#BCAAA4', 2.5) + C(-18, -46, 3.5, '#BCAAA4', 2) + C(-6, -46, 3.5, '#BCAAA4', 2) : ''))).join('')
      + Lc('M152 136c2-30 8-60 20-84', INK, 2) + E(176, 46, 14, 17, '#FFEB3B', 3) + P('M174 62l2 4 3-4z', '#FFEB3B', 2)),
  L('fr/disney-paris/landmark-bubblewand.v1.svg', 'ไม้เป่าฟองสบู่มีไฟยามค่ำคืน', 'A light-up bubble wand at night', ['bubble wand', 'ไม้เป่าฟองสบู่', 'light-up toy', 'ของเล่นมีไฟ', 'soap bubbles', 'ฟองสบู่', 'night show', 'souvenir', 'ของที่ระลึก', 'evening in the park'], 'หาฟองสบู่ลูกที่ใหญ่ที่สุดที่มีแสงสะท้อน', 'Find the biggest bubble shining with colours',
    // a child holding up a glowing wand that sends out a stream of rainbow bubbles into a dark blue night sky full of stars
    sky('#283593') + [[30, 30], [200, 24], [60, 90], [216, 120], [24, 150]].map(([x, y]) => star(x, y, '#FFF59D')).join('') + R(-4, 200, 248, 44, '#3949AB', 0, 3)
      + [[140, 70, 30], [190, 60, 16], [100, 40, 14], [176, 120, 20], [130, 120, 12], [210, 170, 10], [80, 76, 9]].map(([x, y, r]) => C(x, y, r, '#E1F5FE', 2.5) + P(`M${x - r * 0.6} ${y - r * 0.2}a${r * 0.7} ${r * 0.7} 0 0 1 ${r * 0.6} -${r * 0.5}`, 'none', 2) + Lc(`M${x - r * 0.5} ${y + r * 0.4}a${r * 0.6} ${r * 0.6} 0 0 0 ${r} 0`, '#F48FB1', 2.5)).join('') + face(140, 70, 0.4)
      + g(62, 150, 1, R(-6, -10, 12, 60, '#7E57C2', 4, 3) + C(0, -20, 16, '#FFF176', 3) + C(0, -20, 8, '#FFFFFF', 0) + [0, 72, 144, 216, 288].map((a) => g(0, -20, 1, Lc('M0-22v-8', '#FFF59D', 3), a)).join(''), 20)
      + g(44, 222, 1.1, C(0, -34, 12, '#FFE0BD', 2.5) + P('M-14-20h28l6 40h-40z', '#26A69A', 2.5) + Lc('M10-14l14-12', '#FFE0BD', 6) + face(0, -32, 0.3))),
  L('fr/disney-paris/landmark-dressup.v1.svg', 'เด็กแต่งตัวเป็นอัศวินกับเจ้าหญิงเที่ยวสวนสนุก', 'Kids dressed up as a knight and a princess for the day', ['dress up', 'แต่งตัว', 'costume', 'ชุดแฟนซี', 'princess dress', 'ชุดเจ้าหญิง', 'knight costume', 'ชุดอัศวิน', 'crown', 'fairy tale'], 'หามงกุฎกระดาษที่เอียงอยู่บนหัว', 'Find the paper crown sitting crooked on a head',
    // two happy children side by side: one in a puffy pink gown with a tiara and a star wand, one in a silver tunic with a shield-shaped bib and a paper crown, a red cape flowing, confetti around
    sky('#FCE4EC') + [[20, 30, '#FFCA28'], [210, 40, '#42A5F5'], [30, 120, '#66BB6A'], [216, 130, '#EF5350'], [120, 20, '#AB47BC']].map(([x, y, c], k) => R(x, y, 10, 6, c, 1, 0) + C(x + 20, y + 20, 3, c, 0)).join('')
      + g(80, 140, 1, P('M-14-8h28l30 92h-88z', '#F48FB1', 3) + P('M-30 50c10 8 50 8 60 0', 'none', 2.5) + Lc('M-26 72c12 6 40 6 52 0', '#F8BBD0', 3) + C(0, -30, 24, '#FFE0BD', 3) + P('M-26-36c0-28 52-28 52 0-8-10-44-10-52 0z', '#6D4C41', 3) + P('M-14-52l6-14 8 10 8-10 6 14z', '#FFD54F', 2.5) + face(0, -28, 0.45)
        + Lc('M-20 10l-26-30', '#FFE0BD', 7) + Lc('M-46-20l-8-14', '#AB47BC', 3) + star(-56, -40, '#FFEB3B'))
      + g(164, 140, 1, P('M-40 0c-10 40-6 70 0 84h80c6-14 10-44 0-84z', '#E53935', 3) + P('M-22-8h44v60h-44z', '#CFD8DC', 3) + P('M-12 4h24v20c0 10-12 16-12 16s-12-6-12-16z', '#42A5F5', 2.5) + Lc('M-16 52v32M16 52v32', INK, 5)
        + C(0, -30, 24, '#FFE0BD', 3) + P('M-22-48l8-20 10 12 6-14 8 12 10-10 2 20z', '#FFCA28', 3, -8) + face(0, -28, 0.45))),
  L('fr/disney-paris/landmark-parkmap.v1.svg', 'แผนที่สวนสนุกกับตั๋วเข้าสวน', 'The park map and a day ticket', ['park map', 'แผนที่สวนสนุก', 'ticket', 'ตั๋วเข้าสวน', 'day ticket', 'plan the day', 'วางแผนวันเที่ยว', 'which ride first', 'paper map', 'opening hours'], 'หาดาวที่ทำเครื่องหมายว่าเราอยู่ตรงนี้', 'Find the star that shows where we are',
    // an unfolded paper map with its folds showing: green land, a blue lake, winding paths in dotted lines, tiny towers and trees, a red star "you are here", a striped ticket tucked over the corner
    P('M20 50l66-14 68 14 66-14v160l-66 14-68-14-66 14z', '#FFF8E1', 3) + Lc('M86 36v160M154 50v160', '#E0D2B4', 2.5)
      + P('M36 72c30-10 60 0 90-6s60 6 80 0v110c-20 6-50-4-80 2s-60-6-90 4z', '#C5E1A5', 2.5) + E(150, 148, 30, 18, '#81D4FA', 2.5)
      + `<path d="M40 160c30-40 60 20 90-30s50-50 76-40" fill="none" stroke="#8D6E63" stroke-width="3" stroke-dasharray="5 6"/>`
      + g(110, 100, 0.55, R(-10, -10, 20, 30, '#F48FB1', 0, 3) + P('M-14-10l14-26 14 26z', '#7E57C2', 3) + R(-26, 0, 12, 20, '#F48FB1', 0, 3) + R(14, 0, 12, 20, '#F48FB1', 0, 3))
      + [[56, 100], [70, 140], [190, 90], [196, 170]].map(([x, y]) => C(x, y - 6, 8, '#43A047', 2) + Lc(`M${x} ${y}v8`, INK, 2)).join('') + star(80, 170, '#E53935') + face(150, 146, 0.3)
      + g(176, 196, 1, R(-46, -22, 92, 44, '#FFCA28', 6, 3) + Lc('M-22-22v44', INK, 2) + [0, 1, 2].map((k) => R(-14 + k * 18, -14, 10, 28, '#EF5350', 2, 0)).join('') + C(-34, 0, 7, '#FFFFFF', 2.5), -12)),

  // ---------- Switzerland
  K('ch', 'food', 'zopf', 'ขนมปังเปียซอพฟ์วันอาทิตย์', 'Zopf, the braided Sunday bread', ['zopf', 'ซอพฟ์', 'butterzopf', 'braided bread', 'ขนมปังถักเปีย', 'sunday breakfast', 'อาหารเช้าวันอาทิตย์', 'swiss bread', 'ขนมปังสวิส', 'butter and jam'],
    // a shiny golden braided loaf on a wooden board, its plaits clearly woven, a slice cut off with butter and red jam, a happy face on the loaf
    R(14, 160, 212, 34, '#C69C6D', 12, 3) + C(28, 176, 4, '#8D6E63', 0)
      + [0, 1, 2, 3, 4].map((k) => E(52 + k * 30, 130 - Math.sin(k * 0.8) * 2, 24, 30, k % 2 ? '#E2A04A' : '#EDB45E', 3, 0)).join('') + [0, 1, 2, 3, 4].map((k) => P(`M${36 + k * 30} ${118}c10-12 24-12 30 0`, 'none', 2.5) + P(`M${36 + k * 30} ${146}c10 12 24 12 30 0`, 'none', 2.5)).join('')
      + [[44, 112], [104, 110], [164, 112]].map(([x, y]) => E(x, y, 6, 3, '#FFF3D0', 0)).join('') + face(104, 128, 0.45)
      + g(196, 150, 1, R(-22, -26, 40, 44, '#FFF3D0', 10, 3) + P('M-22-14c6-12 34-12 40 0', '#E2A04A', 3) + R(-12, -8, 22, 14, '#FFE082', 3, 2) + C(-2, 0, 6, '#E53935', 2), 12)),
  K('ch', 'food', 'birchermuesli', 'มูสลีเบียร์เชอร์ใส่แอปเปิ้ลขูด', 'Bircher muesli with grated apple', ['birchermuesli', 'เบียร์เชอร์มูสลี', 'bircher muesli', 'มูสลี', 'soaked oats', 'ข้าวโอ๊ตแช่', 'grated apple', 'แอปเปิ้ลขูด', 'swiss breakfast', 'yoghurt and berries'],
    // a round blue bowl full of creamy oats with grated apple shreds, blueberries, raspberries and hazelnuts on top, a spoon resting in it, a half apple beside, a smiling bowl
    P('M30 110h180c0 60-40 96-90 96s-90-36-90-96z', '#64B5F6', 3) + Lc('M50 150c40 12 100 12 140 0', '#BBDEFB', 4) + E(120, 110, 90, 22, '#F5E6C8', 3)
      + Array.from({ length: 10 }, (_, k) => E(58 + k * 13, 106 + (k % 3) * 4, 5, 3, '#E0C9A6', 1.5)).join('') + Array.from({ length: 6 }, (_, k) => Lc(`M${70 + k * 18} ${100 + (k % 2) * 6}l10 ${4 - (k % 2) * 6}`, '#FFF59D', 3)).join('')
      + [[92, 100], [140, 98], [118, 112], [160, 108]].map(([x, y]) => C(x, y, 6, '#3949AB', 2)).join('') + [[74, 114], [176, 100]].map(([x, y]) => C(x, y, 7, '#E53935', 2)).join('') + C(104, 92, 5, '#A1673F', 2)
      + g(170, 80, 1, R(-4, -50, 8, 56, '#B0BEC5', 3, 2.5) + E(0, 8, 12, 14, '#CFD8DC', 2.5), 30) + face(120, 160, 0.5)
      + g(214, 190, 1, P('M-18 0c0-20 36-20 36 0s-14 22-18 22-18-2-18-22z', '#C5E1A5', 3) + E(0, 2, 12, 12, '#FFFDE7', 0) + C(-3, 0, 2, '#5D4037', 0) + C(3, 0, 2, '#5D4037', 0))),
  K('ch', 'transport', 'postbus', 'รถบัสไปรษณีย์สีเหลืองบนถนนภูเขา', 'The yellow PostBus on a mountain road', ['postbus', 'โพสต์บัส', 'postauto', 'yellow bus', 'รถบัสสีเหลือง', 'mountain pass', 'ถนนขึ้นเขา', 'three-tone horn', 'แตรสามเสียง', 'hairpin bends'],
    // a bright yellow coach with a red stripe climbing a zigzag mountain road, its horn playing three musical notes, snowy peaks behind, a happy face on the front
    alps('#90A4AE', '#FFFFFF') + P('M-4 110h248v134H-4z', '#A5D6A7', 3) + P('M-4 220c60 0 160-10 200-30s-150-10-120-40 110-20 168-34', 'none', 18) + Lc('M-4 220c60 0 160-10 200-30s-150-10-120-40 110-20 168-34', '#BDBDBD', 14)
      + g(110, 176, 1, R(-64, -40, 128, 60, '#FFCC00', 10, 3) + R(-64, 4, 128, 8, '#E53935', 0, 0) + R(-64, -40, 128, 60, 'none', 10, 3) + [0, 1, 2, 3].map((k) => R(-56 + k * 26, -32, 20, 22, '#B3E5FC', 3, 2.5)).join('') + R(46, -32, 14, 30, '#B3E5FC', 3, 2.5)
        + C(-38, 22, 11, '#424242', 3) + C(38, 22, 11, '#424242', 3) + face(52, 6, 0.24))
      + [[190, 120, 0], [208, 104, 1], [226, 120, 2]].map(([x, y]) => C(x, y, 5, INK, 0) + Lc(`M${x + 4} ${y}v-18l6 4`, INK, 2.5)).join('')),

  // ---------- Lucerne
  L('ch/lucerne/landmark-musegg.v1.svg', 'กำแพงเมืองมูเซกก์กับหอคอยเรียงแถว', 'The Musegg Wall and its row of towers', ['musegg wall', 'กำแพงมูเซกก์', 'museggmauer', 'city wall towers', 'หอคอยกำแพงเมือง', 'nine towers', 'walk on the wall', 'เดินบนกำแพง', 'mannliturm', 'old town hill'], 'หาหอคอยที่มีอัศวินเหล็กเล็กๆ อยู่บนยอด', 'Find the tower with a little iron figure on its top',
    // an old stone wall snaking along a green hill with five different towers: square, round, pointed roofs and a slim one topped by a tiny iron figure, sheep-free meadow, a kid on the wall walk
    sky('#E1F5FE') + P('M-4 150c60-30 180-40 248-20v114H-4z', '#9CCC65', 3) + P('M-4 160c60-30 180-40 248-20v14c-70-18-188-10-248 20z', '#D7CCC8', 3)
      + [[24, 146, 26, 54, '#BCAAA4', 'p'], [72, 132, 30, 66, '#D7CCC8', 'r'], [122, 126, 26, 56, '#BCAAA4', 'h'], [170, 128, 32, 70, '#D7CCC8', 'p'], [214, 134, 22, 48, '#BCAAA4', 'f']].map(([x, y, w, h, c, t]) => R(x - w / 2, y - h, w, h, c, 0, 3)
        + (t === 'p' ? P(`M${x - w / 2 - 4} ${y - h}l${w / 2 + 4} -36 ${w / 2 + 4} 36z`, '#C62828', 3) : t === 'r' ? P(`M${x - w / 2 - 4} ${y - h}l${w / 2 + 4} -22 ${w / 2 + 4} 22z`, '#6D4C41', 3) : t === 'h' ? P(`M${x - w / 2 - 4} ${y - h}h${w + 8}l-4 -14h${-w}z`, '#455A64', 3) : P(`M${x - w / 2} ${y - h}l${w / 2} -40 ${w / 2} 40z`, '#2E7D32', 3) + Lc(`M${x} ${y - h - 40}v-10`, INK, 3) + C(x, y - h - 54, 4, '#455A64', 2))
        + R(x - 5, y - h + 14, 10, 14, '#37474F', 5, 2)).join('') + face(72, 104, 0.35) + kid(150, 140, '#FF7043', 0.75)),
  L('ch/lucerne/landmark-kkl.v1.svg', 'หอแสดงดนตรี KKL หลังคาแบนยื่นออกไปเหนือทะเลสาบ', 'The KKL concert hall and its flat roof over the lake', ['kkl luzern', 'เคเคแอล', 'culture and congress centre', 'concert hall', 'หอแสดงดนตรี', 'flat roof', 'หลังคาแบนยื่น', 'lake lucerne', 'lucerne festival', 'station square'], 'หาหลังคาแบนบางๆ ที่ยื่นออกไปเหนือน้ำ', 'Find the thin flat roof sticking out over the water',
    // a long low glass-and-dark building on the lakeshore under a huge thin flat roof that juts far out over the water, its reflection below, a kid by the water's edge, mountains far behind
    sky('#E3F2FD') + P('M-4 120l40-30 30 20 40-34 50 30 40-20 48 34z', '#B0BEC5', 3) + R(-4, 140, 248, 104, '#4FC3F7', 0, 3)
      + P('M20 94h220v10H20z', '#546E7A', 3) + [[40, 104, 50, '#37474F'], [92, 104, 50, '#90CAF9'], [144, 104, 46, '#37474F'], [192, 104, 36, '#B0BEC5']].map(([x, y, w, c]) => R(x, y, w, 36, c, 0, 3)).join('') + Array.from({ length: 4 }, (_, k) => Lc(`M${100 + k * 12} 104v36`, '#E3F2FD', 2)).join('')
      + R(-4, 138, 248, 6, '#ECEFF1', 0, 2.5) + `<path d="M40 150h190M60 164h150M80 178h100" fill="none" stroke="#B3E5FC" stroke-width="4"/>` + face(116, 124, 0.32)
      + kid(16, 144, '#E53935', 0.8) + [[200, 60], [40, 50]].map(([x, y]) => P(`M${x} ${y}q6-6 12 0q6-6 12 0`, 'none', 2.5)).join('')),
  L('ch/lucerne/landmark-weinmarkt.v1.svg', 'บ้านภาพวาดสีสดรอบลานไวน์มาร์คท์', 'The painted houses round the Weinmarkt square', ['weinmarkt', 'ไวน์มาร์คท์', 'painted facades', 'บ้านภาพวาดผนัง', 'hirschenplatz', 'old town square', 'จัตุรัสเมืองเก่า', 'fountain column', 'น้ำพุกลางลาน', 'colourful houses'], 'หาบ้านที่มีลายวาดเป็นรูปดอกไม้ทั้งผนัง', 'Find the house whose whole wall is painted with flowers',
    // three tall narrow town houses whose fronts are painted with patterns: flower garlands, a sun, coloured stripes and window frames, a stone fountain column with a basin in the square, flower boxes
    sky('#FFF8E1') + R(-4, 196, 248, 48, '#D7CCC8', 0, 3)
      + [[6, '#FFE0B2', '#E53935'], [82, '#E1F5FE', '#1E88E5'], [158, '#F1F8E9', '#43A047']].map(([x, c, a], k) => R(x, 50 + k * 6, 76, 150 - k * 6, c, 0, 3) + P(`M${x - 4} ${50 + k * 6}l42-${30 - k * 4} 42 ${30 - k * 4}z`, '#8D6E63', 3)
        + [0, 1, 2].map((r) => [0, 1].map((cc) => R(x + 12 + cc * 32, 70 + k * 6 + r * 40, 20, 24, '#FFFFFF', 2, 2) + R(x + 10 + cc * 32, 66 + k * 6 + r * 40, 24, 4, a, 0, 0)).join('')).join('')
        + (k === 0 ? [0, 1, 2, 3].map((j) => C(x + 10 + j * 18, 182, 5, '#EC407A', 2) + C(x + 18 + j * 18, 176, 4, '#FFCA28', 2)).join('') : k === 1 ? C(x + 38, 186, 10, '#FFCA28', 2.5) + face(x + 38, 186, 0.2) : Lc(`M${x + 6} 184h64M${x + 6} 192h64`, a, 4))).join('')
      + R(110, 200, 20, 6, '#90A4AE', 0, 2.5) + R(114, 150, 12, 52, '#B0BEC5', 2, 2.5) + C(120, 146, 8, '#FFCA28', 2.5) + P('M88 206h64l-6 26h-52z', '#90A4AE', 3) + Lc('M100 214h40', '#81D4FA', 4) + face(120, 220, 0.25)),
  L('ch/lucerne/landmark-birnbrot.v1.svg', 'ขนมปังลูกแพร์แห่งลูเซิร์น', 'Lucerne pear bread', ['birnbrot', 'บีร์นโบรท', 'birnenweggen', 'pear bread', 'ขนมปังลูกแพร์', 'dried pears', 'ลูกแพร์อบแห้ง', 'lucerne bakery', 'ร้านเบเกอรี่', 'winter treat'], 'หาเนื้อแพร์สีน้ำตาลเข้มที่ม้วนอยู่ในชิ้นขนมปัง', 'Find the dark pear filling curled inside the slice',
    // a long golden loaf pricked with a fork pattern, one slice cut off showing a dark brown spiral of dried pear filling, two dried pear halves and a fresh pear beside it
    R(14, 170, 212, 26, '#C69C6D', 10, 3) + R(30, 110, 140, 64, '#D9A055', 26, 3) + Array.from({ length: 10 }, (_, k) => C(48 + (k % 5) * 26, 126 + Math.floor(k / 5) * 22, 2.5, '#8D5524', 0)).join('') + face(96, 138, 0.42)
      + g(194, 146, 1, E(0, 0, 26, 30, '#F3D29A', 3) + P('M-14 0c0-12 10-18 18-12s6 22-8 22-18-14-12-24 22-10 26 4', 'none', 0) + Lc('M-14 0c0-14 12-18 18-10s4 18-8 18-14-10-10-20 20-12 26 0', '#6D3B1F', 6))
      + g(56, 74, 1, P('M0-30c10 0 8 14 16 22 12 14 4 34-16 34s-28-20-16-34c8-8 6-22 16-22z', '#C0CA33', 3) + Lc('M0-30v-10', '#6D4C41', 3) + P('M2-38c8-6 14-2 14 4-6 2-12 0-14-4z', '#7CB342', 2))
      + [[110, 82], [146, 88]].map(([x, y]) => P(`M${x} ${y - 14}c8 0 6 10 12 16 6 10 0 18-12 18s-16-8-12-18c4-6 4-16 12-16z`, '#8D5524', 2.5)).join('')),

  // ---------- Interlaken & the Jungfrau
  L('ch/interlaken/landmark-trottibike.v1.svg', 'ปั่นสกู๊ตเตอร์ล้อโตลงเขาจากกรินเดลวัลด์', 'A trottibike ride down the mountain', ['trottibike', 'ทร็อตติไบค์', 'mountain scooter', 'สกู๊ตเตอร์ล้อโต', 'bort', 'grindelwald', 'downhill ride', 'ขี่ลงเขา', 'mountain path', 'scooter bike'], 'หาล้อหน้าที่ใหญ่กว่าล้อหลัง', 'Find the front wheel that is bigger than the back one',
    // a child in a helmet riding a tall scooter with a big front wheel and a smaller back wheel down a gravel path through a green meadow, a big rocky north face behind, dust puffs flying
    sky('#E1F5FE') + P('M-4 120l60-80 50 50 40-40 98 80v30H-4z', '#78909C', 3) + P('M48 50l8-10 10 14-8-2zM146 50l8-6 10 12z', '#FFFFFF', 0) + P('M-4 120h248v124H-4z', '#9CCC65', 3) + P('M-4 244c40-40 120-60 248-104v40c-110 30-170 40-200 64z', '#E0C9A6', 3)
      + g(122, 180, 1, C(44, 22, 24, '#FFFFFF', 4) + C(44, 22, 5, INK, 0) + C(-46, 30, 16, '#FFFFFF', 4) + C(-46, 30, 4, INK, 0) + P('M-46 30h20l10-8h40l20 0', 'none', 6) + Lc('M-46 30h20l10-8h40', '#E53935', 7) + Lc('M44 22l-8-50', '#455A64', 5) + Lc('M30-30h16', INK, 5)
        + Lc('M0 22l10-30M18 22l14-30', '#3949AB', 7) + P('M2-6h28l6-34h-30z', '#FF7043', 3) + Lc('M30-34l10 6', '#FFE0BD', 6) + C(16, -50, 13, '#FFE0BD', 3) + P('M2-54c0-14 28-16 28 0z', '#FFEB3B', 3) + face(18, -48, 0.27))
      + [[60, 220], [46, 210], [74, 230]].map(([x, y]) => C(x, y, 7, '#EFEBE9', 2)).join('')),
  L('ch/interlaken/landmark-iseltwald.v1.svg', 'สะพานไม้ยื่นลงทะเลสาบสีฟ้าเทอร์ควอยซ์ที่อีเซิลท์วาลด์', 'The little wooden jetty on the turquoise lake at Iseltwald', ['iseltwald', 'อีเซิลท์วาลด์', 'lake brienz', 'ทะเลสาบบรีนซ์', 'wooden jetty', 'สะพานไม้ท่าน้ำ', 'turquoise water', 'น้ำสีเทอร์ควอยซ์', 'photo spot', 'lakeside village'], 'หาเสาไม้ปลายสะพานที่ยืนอยู่ในน้ำใส', 'Find the wooden posts standing in the clear water at the end of the jetty',
    // a narrow wooden jetty running straight out into bright turquoise water, posts and a little rail, fir-covered mountains rising steeply from the lake, a kid at the end looking at the view
    sky('#E1F5FE') + P('M-4 100l40-40 30 20 40-36 40 30 40-26 58 52z', '#558B2F', 3) + Array.from({ length: 8 }, (_, k) => P(`M${10 + k * 30} ${96 - (k % 3) * 8}l8-18 8 18z`, '#33691E', 2)).join('') + R(-4, 98, 248, 146, '#26C6DA', 0, 3)
      + `<path d="M20 124h40M150 118h60M180 210h50M10 190h30" fill="none" stroke="#B2EBF2" stroke-width="4"/>`
      + P('M80 244l30-130h20l30 130z', '#A1673F', 3) + Array.from({ length: 8 }, (_, k) => Lc(`M${110 - k * 4} ${124 + k * 16}h${20 + k * 8}`, '#6D4C41', 2)).join('') + [[110, 114], [130, 114], [96, 170], [144, 170]].map(([x, y]) => R(x - 3, y - 4, 6, 26, '#5D4037', 1, 2)).join('')
      + face(120, 190, 0.4) + kid(120, 112, '#FFB300', 0.7)),
  L('ch/interlaken/landmark-eigerwand.v1.svg', 'หน้าต่างกลางหน้าผาไอเกอร์บนเส้นทางรถไฟยุงเฟรา', 'The windows cut into the Eiger\'s north face', ['eigerwand', 'ไอเกอร์วันด์', 'eiger north face', 'หน้าผาไอเกอร์', 'jungfrau railway', 'รถไฟยุงเฟรา', 'tunnel windows', 'หน้าต่างในอุโมงค์', 'eismeer', 'look out'], 'หาเด็กที่ส่องดูข้างนอกผ่านหน้าต่างในหน้าผา', 'Find the child peeping out of the window in the rock face',
    // a huge dark rock wall with snow ledges, a row of square windows cut into it with faces peeping out, a cut-away of the tunnel showing a red train inside, the valley far below
    sky('#E3F2FD') + R(-4, 200, 248, 44, '#AED581', 0, 3) + P('M-4 210l40-30 30 20 30-16 40 18 50-12 58 16z', '#9CCC65', 3)
      + P('M20 200L60-4h184v204z', '#5D6D7E', 3) + P('M70 40l40-10 30 14M90 90l50-8 40 12M60 150l40-8 60 10', 'none', 0) + Lc('M70 40l40-10 30 14M90 92l50-8 40 12M60 152l40-8 60 10', '#FFFFFF', 5)
      + [[96, 110], [140, 110], [184, 110]].map(([x, y], k) => R(x - 16, y - 14, 32, 28, '#B3E5FC', 3, 3) + (k === 1 ? kid(x, y + 14, '#FF7043', 0.6) : '')).join('')
      + R(80, 140, 150, 36, '#37474F', 6, 3) + R(96, 146, 110, 24, '#E53935', 8, 3) + [0, 1, 2, 3].map((k) => R(104 + k * 25, 150, 16, 10, '#FFFFFF', 2, 2)).join('') + face(184, 116, 0.32)),
  L('ch/interlaken/landmark-canyoning.v1.svg', 'แคนยอนนิ่งไถลรางหินลงแอ่งน้ำ', 'Canyoning down a rock slide into a pool', ['canyoning', 'แคนยอนนิ่ง', 'rock slide', 'สไลเดอร์หิน', 'natural water slide', 'jump into the pool', 'กระโดดลงน้ำ', 'helmet and wetsuit', 'ชุดดำน้ำหมวกกันน็อก', 'adventure sport'], 'หาหมวกกันน็อกสีแดงที่กำลังไถลลงมา', 'Find the red helmet sliding down the rock',
    // a smooth grey rock chute with white water rushing down it, a child in a black wetsuit and red helmet sliding down feet first, a green pool below with a splash, ferns at the sides
    sky('#C8E6C9') + P('M-4-4h90l-10 120 30 80-110 0z', '#78909C', 3) + P('M244-4h-80l10 110-40 90h110z', '#78909C', 3) + P('M86-4h78l-10 110-30 60-28-50z', '#B0BEC5', 3)
      + Lc('M110 0c10 40 10 80 18 110', '#E1F5FE', 10) + Lc('M136 0c-4 40-6 80-10 112', '#E1F5FE', 6)
      + E(120, 206, 110, 36, '#26A69A', 3) + Lc('M50 200c20-6 40 6 60 0', '#B2DFDB', 3)
      + [[100, 176], [120, 168], [140, 176], [90, 190], [150, 190]].map(([x, y]) => C(x, y, 7, '#E1F5FE', 2)).join('')
      + g(118, 108, 1, P('M-10 0l-10 40h12l6-30 6 30h12l-10-40z', '#263238', 3) + P('M-12-30h24l4 32h-32z', '#263238', 3) + Lc('M-12-22l-14 12M12-22l14 12', '#FFE0BD', 6) + C(0, -42, 13, '#FFE0BD', 3) + P('M-14-46c0-16 28-16 28 0z', '#E53935', 3) + face(0, -40, 0.27), -14)
      + [[20, 150], [220, 140]].map(([x, y]) => P(`M${x} ${y}c-10-20 0-30 10-40M${x} ${y}c0-20 10-26 20-30`, 'none', 0) + Lc(`M${x} ${y}c-8-18 0-30 10-40M${x} ${y}c4-20 12-26 22-30`, '#43A047', 5)).join('')),
  L('ch/interlaken/landmark-alpcheese.v1.svg', 'ทำชีสในหม้อทองแดงบนกระท่อมทุ่งเลี้ยงวัว', 'Making cheese in a copper cauldron at a mountain dairy', ['alp cheese', 'ชีสภูเขา', 'alpkase', 'cheese making', 'ทำชีส', 'copper cauldron', 'หม้อทองแดง', 'mountain dairy', 'กระท่อมนม', 'bergkase'], 'หาผ้าขาวที่ยกก้อนชีสขึ้นมาจากหม้อ', 'Find the white cloth lifting the cheese out of the pot',
    // inside a wooden alp hut: a big shiny copper cauldron hanging over a wood fire, a cheesemaker lifting a lump of curd in a white cloth, round cheeses resting on a shelf, the open door showing a peak
    sky('#D7CCC8') + Array.from({ length: 6 }, (_, k) => Lc(`M-4 ${30 + k * 34}h248`, '#BCAAA4', 2)).join('') + R(180, 30, 50, 80, '#BBDEFB', 2, 3) + P('M184 104l20-40 22 40z', '#ECEFF1', 2.5)
      + R(-4, 200, 248, 44, '#8D6E63', 0, 3) + R(14, 60, 70, 8, '#6D4C41', 0, 2.5) + [[26, 50], [50, 50], [72, 50]].map(([x, y]) => E(x, y, 11, 9, '#FFD54F', 2.5)).join('')
      + P('M70 176c-6 14 0 26 12 26h56c12 0 18-12 12-26z', '#FF7043', 3) + [[86, 190], [110, 186], [130, 192]].map(([x, y]) => P(`M${x} ${y}c-6-10 0-20 4-26 4 8 8 16-4 26z`, '#FFCA28', 2)).join('')
      + P('M50 100h140c0 50-30 76-70 76s-70-26-70-76z', '#D4793B', 3) + E(120, 100, 70, 12, '#FFF8E1', 3) + Lc('M70 130c30 10 70 10 100 0', '#F0A26B', 4) + face(120, 140, 0.45)
      + g(160, 92, 1, P('M-24-6c0 16 48 16 48 0z', '#FFFFFF', 3) + E(0, 0, 18, 10, '#FFF59D', 2.5) + Lc('M-22-6l-14-26M22-6l14-26', '#FFFFFF', 4))
      + g(196, 60, 1, C(0, 0, 12, '#FFE0BD', 2.5) + P('M-14 12h28l4 40h-36z', '#FFFFFF', 2.5) + face(0, 2, 0.28) + P('M-12-6c0-12 24-12 24 0z', '#455A64', 2.5))),

  // ---------- Zermatt
  L('ch/zermatt/landmark-edelweiss.v1.svg', 'ดอกเอเดลไวส์บนหินสูง', 'An edelweiss flower high on the rocks', ['edelweiss', 'เอเดลไวส์', 'alpine flower', 'ดอกไม้ภูเขา', 'woolly star flower', 'ดอกไม้รูปดาว', 'rocky slope', 'protected flower', 'ห้ามเด็ด', 'summer hike'], 'หากลีบดอกขาวนุ่มที่เป็นรูปดาว', 'Find the soft white petals shaped like a star',
    // a big woolly white star-shaped edelweiss with a yellow fuzzy centre and a smiling face growing from a crack in grey rocks, two smaller ones beside it, a peak far behind
    sky('#E3F2FD') + P('M150 120l40-80 50 80z', '#B0BEC5', 3) + P('M178 64l12-24 14 24-12-4z', '#FFFFFF', 0) + P('M-4 150c40-30 90-20 130-40s80-10 118 10v124H-4z', '#90A4AE', 3) + Lc('M60 170l20 20M150 150l-10 30', '#607D8B', 3)
      + [[118, 122, 1], [54, 168, 0.55], [190, 176, 0.5]].map(([x, y, s]) => g(x, y, s, Lc('M0 30v60', '#8BC34A', 6) + P('M0 60c-20-10-30 0-34 10 16 6 26 0 34-10zM0 70c20-10 30 0 34 10-16 6-26 0-34-10z', '#AED581', 3)
        + Array.from({ length: 7 }, (_, k) => g(0, 0, 1, P('M0-6c-10-14-6-38 0-46 6 8 10 32 0 46z', '#FAFAFA', 3), k * 51.4)).join('') + C(0, 0, 14, '#FDD835', 3) + [[-5, -4], [5, -4], [0, 5], [-6, 4], [6, 4]].map(([dx, dy]) => C(dx, dy, 2.5, '#F9A825', 0)).join('') + (s === 1 ? face(0, -2, 0.28) : ''))).join('')),
  L('ch/zermatt/landmark-museum.v1.svg', 'พิพิธภัณฑ์มัทเทอร์ฮอร์นหมู่บ้านใต้ดิน', 'The Matterhorn Museum, a village under the ground', ['matterhorn museum', 'พิพิธภัณฑ์มัทเทอร์ฮอร์น', 'zermatlantis', 'แซร์มัทลันติส', 'underground village', 'หมู่บ้านใต้ดิน', 'glass domes', 'โดมแก้ว', 'old chalets', 'mountain history'], 'หาโดมแก้วที่มองลงไปเห็นบ้านเก่าข้างล่าง', 'Find the glass dome you can look through to the old house below',
    // a cut-away picture: on the street, small glass domes poke up from the ground; below them under the earth lies a tiny old village of dark wooden houses with lights on, a kid on the street peering down
    sky('#E3F2FD') + P('M60 70l40-60 40 60z', '#ECEFF1', 3) + R(-4, 70, 248, 22, '#BDBDBD', 0, 3) + R(-4, 92, 248, 152, '#8D6E63', 0, 3) + R(14, 100, 212, 130, '#5D4037', 14, 3)
      + [[70, 72], [170, 72]].map(([x, y]) => P(`M${x - 26} ${y}c0-34 52-34 52 0z`, '#B3E5FC', 3) + Lc(`M${x - 12} ${y - 14}c4-6 10-8 14-8`, '#FFFFFF', 3)).join('')
      + [[60, 196, '#6D4C41'], [120, 190, '#795548'], [180, 196, '#6D4C41']].map(([x, y, c], k) => R(x - 26, y - 40, 52, 40, c, 0, 3) + P(`M${x - 32} ${y - 40}l32-24 32 24z`, '#4E342E', 3) + R(x - 16, y - 30, 12, 12, '#FFE082', 1, 2) + R(x + 4, y - 30, 12, 12, '#FFE082', 1, 2) + (k === 1 ? face(x, y - 12, 0.3) : '')).join('')
      + Lc('M30 218h180', '#3E2723', 3) + kid(120, 68, '#1E88E5', 0.8)),
  L('ch/zermatt/landmark-apricot.v1.svg', 'แอปริคอตแห่งวาเลกับทาร์ตแอปริคอต', 'Valais apricots and an apricot tart', ['valais apricots', 'แอปริคอตวาเล', 'apricot', 'แอปริคอต', 'apricot tart', 'ทาร์ตแอปริคอต', 'abricot', 'aprikosen', 'summer fruit', 'ผลไม้หน้าร้อน'], 'หาลูกแอปริคอตที่มีหน้ายิ้มบนกิ่ง', 'Find the smiling apricot on the branch',
    // a branch with three round orange apricots and leaves at the top, below it a round tart filled with neat rings of apricot halves on a white plate
    Lc('M20 40c50 10 100 0 200 20', '#6D4C41', 7) + [[60, 34], [120, 40], [180, 50]].map(([x, y]) => P(`M${x} ${y}c10-16 30-14 34-2-10 10-24 10-34 2z`, '#7CB342', 2.5)).join('')
      + [[80, 64, 20], [130, 70, 24], [176, 72, 18]].map(([x, y, r]) => C(x, y, r, '#FFA726', 3) + P(`M${x} ${y - r}c-4 ${r * 0.6}-4 ${r * 1.4} 0 ${r * 2}`, 'none', 2) + E(x - r * 0.4, y - r * 0.3, r * 0.25, r * 0.18, '#FFE0B2', 0)).join('') + face(130, 72, 0.3)
      + E(120, 180, 100, 30, '#FFFFFF', 3) + E(120, 172, 82, 24, '#E2A04A', 3) + E(120, 170, 70, 18, '#FFF3E0', 2)
      + [[-46, 0], [-24, -6], [0, -8], [24, -6], [46, 0], [-34, 8], [-10, 8], [14, 8], [36, 8]].map(([dx, dy]) => g(120 + dx, 170 + dy, 1, E(0, 0, 11, 7, '#FB8C00', 2.5) + E(-2, -2, 4, 2, '#FFCC80', 0))).join('')),
  L('ch/zermatt/landmark-goatparade.v1.svg', 'ขบวนแพะคอดำเดินผ่านหมู่บ้าน', 'The black-necked goats walking through the village', ['blackneck goats', 'แพะคอดำ', 'walliser schwarzhalsziege', 'goat parade', 'ขบวนแพะ', 'goatherd', 'คนเลี้ยงแพะ', 'village street', 'goat bells', 'summer evening'], 'หาแพะที่ครึ่งหน้าดำครึ่งหลังขาว', 'Find the goat that is black in front and white at the back',
    // three goats with black heads and front halves and white back halves trotting down a village street between dark wooden chalets, each with a little bell, a child goatherd with a stick and bell following
    sky('#E1F5FE') + [[-4, '#6D4C41'], [176, '#795548']].map(([x, c]) => R(x, 40, 72, 130, c, 0, 3) + P(`M${x - 6} 40l42-30 42 30z`, '#455A64', 3) + R(x + 14, 70, 18, 18, '#FFFFFF', 2, 2) + R(x + 42, 70, 18, 18, '#FFFFFF', 2, 2) + R(x + 10, 92, 52, 6, '#E53935', 0, 2)).join('') + R(-4, 170, 248, 74, '#BDBDBD', 0, 3)
      + [[66, 160, 1], [124, 178, 0.9], [176, 196, 0.8]].map(([x, y, s], k) => g(x, y, s, P('M0-14h28c10 0 14 8 14 16s-6 16-14 16H0z', '#FFFFFF', 3) + P('M0-14c-16 0-22 8-22 16s6 16 22 16z', '#212121', 3) + [-14, 2, 18, 32].map((lx) => Lc(`M${lx} 16v20`, lx < 4 ? '#212121' : '#FFFFFF', 6)).join('') + [-14, 2, 18, 32].map((lx) => Lc(`M${lx} 16v20`, INK, 1)).join('')
        + C(-26, -18, 13, '#212121', 3) + P('M-30-30c-6-10-2-18 4-20M-22-30c4-10 10-14 16-12', 'none', 3) + C(-30, -20, 2.5, '#FFFFFF', 0) + C(-22, -20, 2.5, '#FFFFFF', 0) + C(-24, -4, 4, '#FFCA28', 2) + E(-34, -12, 3, 2, '#FF8FA3', 0))).join('')
      + g(212, 214, 0.9, C(0, -30, 10, '#FFE0BD', 2.5) + P('M-12-18h24l4 30h-32z', '#43A047', 2.5) + Lc('M14-16l12 40', '#8D6E63', 3) + face(0, -28, 0.25))),
  L('ch/zermatt/landmark-avalanchefences.v1.svg', 'แนวรั้วกันหิมะถล่มบนเนินเขาเหนือหมู่บ้าน', 'The avalanche fences on the slopes above the village', ['avalanche fences', 'รั้วกันหิมะถล่ม', 'snow barriers', 'แนวกันหิมะ', 'lawinenverbauung', 'steep slope', 'เนินชัน', 'keeping the village safe', 'ปกป้องหมู่บ้าน', 'mountain safety'], 'หาแถวรั้วเหล็กที่เรียงเป็นขั้นบนเนินหิมะ', 'Find the rows of steel fences standing in steps on the snowy slope',
    // a steep white snowy slope rising above a cosy village, row after row of short steel fences in staggered lines holding the snow, a chalet roof with smoke at the bottom, a smiling snow slope
    sky('#BBDEFB') + P('M-4 200L150 10l98 60v174H-4z', '#FFFFFF', 3) + P('M150 10l20 30-20-6-14 12z', '#CFD8DC', 0)
      + Array.from({ length: 12 }, (_, k) => { const x = 40 + (k % 4) * 34 + Math.floor(k / 4) * 22; const y = 170 - Math.floor(k / 4) * 46 - (k % 4) * 6; return Lc(`M${x} ${y}h26`, '#546E7A', 4) + Lc(`M${x + 2} ${y}l-6 10M${x + 24} ${y}l-6 10M${x + 13} ${y}v-12`, '#546E7A', 3) + Lc(`M${x} ${y - 8}h26`, '#546E7A', 3); }).join('')
      + face(160, 120, 0.4) + [[30, 214], [90, 222], [150, 216]].map(([x, y]) => R(x - 18, y - 16, 36, 30, '#795548', 0, 3) + P(`M${x - 24} ${y - 16}l24-18 24 18z`, '#FFFFFF', 3) + R(x - 6, y - 6, 12, 10, '#FFE082', 1, 2)).join('') + P('M96 196c-6-8 6-12 0-20', 'none', 2.5)),
];

export default { places: {}, items };
