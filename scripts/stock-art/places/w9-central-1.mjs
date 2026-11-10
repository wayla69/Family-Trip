// Wave 9 (central Europe, part 1): Germany, Munich, around Neuschwanstein, Austria, Vienna, Hallstatt and the Salzkammergut
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SCOPE = { 'de-neuschwanstein': 'p-neuschwanstein' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); const s = `${cc}-${city}`; return `${SCOPE[s] || s}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const F = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const wins = (x, y, n, dx, w, h, fill = '#B3E5FC') => Array.from({ length: n }, (_, k) => R(x + k * dx, y, w, h, fill, 1, 1.5)).join('');
const fir = (x, y, s = 1, c = '#2E7D32') => g(x, y, s, P('M0-40l14 22h-7l11 18h-36l11-18h-7z', c, 2) + R(-3, 0, 6, 6, '#6D4C41', 0, 1.5));
const tree = (x, y, s = 1, c = '#43A047') => g(x, y, s, C(0, -16, 16, c, 2.5) + R(-3, 0, 6, 10, '#6D4C41', 0, 2));

const items = [
  // ---------- Germany
  F('de', 'food', 'gruenesosse', 'กรีนซอสแฟรงก์เฟิร์ต ซอสสมุนไพรเจ็ดอย่างกับไข่ต้ม', 'Frankfurt green sauce with boiled eggs and potatoes', ['grüne soße', 'gruene sosse', 'green sauce', 'กรีนซอส', 'frankfurt green sauce', 'ซอสสมุนไพรเจ็ดอย่าง', 'seven herbs', 'boiled eggs', 'ไข่ต้มผ่าครึ่ง', 'frankfurt food'],
    // a white plate with a pool of pale green herb sauce, two halved boiled eggs and three little boiled potatoes, sprigs of seven herbs at the side
    E(120, 150, 100, 46, '#FFFFFF', 3) + E(120, 146, 80, 32, '#AED581', 2.5) + [[86, 140], [104, 156], [140, 158], [156, 140], [120, 132]].map(([x, y]) => C(x, y, 2, '#558B2F', 0)).join('')
      + [[92, 142], [146, 146]].map(([x, y]) => E(x, y, 18, 13, '#FFFFFF', 2.5) + C(x, y, 7, '#FFCA28', 1.5)).join('')
      + [[58, 112], [86, 102], [116, 104]].map(([x, y]) => E(x, y, 15, 11, '#FFE082', 2.5) + C(x - 4, y - 3, 2, '#D7A86E', 0)).join('')
      + [0, 1, 2, 3, 4, 5, 6].map((k) => g(170 + (k % 4) * 10, 96 + Math.floor(k / 4) * 12, 1, P('M0 0c-6-8-2-16 6-18 2 8-2 14-6 18z', ['#43A047', '#66BB6A', '#2E7D32', '#9CCC65'][k % 4], 1.5), k * 18 - 40)).join('')
      + face(120, 160, 0.35)),
  F('de', 'culture', 'weihnachtspyramide', 'พีระมิดคริสต์มาสไม้หมุนได้ด้วยเทียน', 'An Erzgebirge Christmas pyramid turned by candles', ['christmas pyramid', 'weihnachtspyramide', 'พีระมิดคริสต์มาส', 'erzgebirge', 'แอร์ซเกอบีร์เกอ', 'candle carousel', 'propeller', 'ใบพัดหมุนด้วยไอเทียน', 'wooden christmas decoration', 'ของตกแต่งไม้'],
    // a wooden tower of three round turning tiers on one pole, little fir trees and children on each tier, four candles at the bottom whose warm air spins the wooden propeller on top
    Lc('M120 30v168', '#8D6E63', 5) + g(120, 32, 1, [0, 60, 120, 180, 240, 300].map((a) => g(0, 0, 1, P('M0 0l40-6 2 8z', '#D7A86E', 2), a)).join('') + C(0, 0, 6, '#FFCA28', 2))
      + [[70, 52], [110, 66], [150, 80]].map(([y, w], k) => E(120, y + 50, w, 9, ['#A1673F', '#BF8A5A', '#D7A86E'][k], 2.5)).join('')
      + [[96, 112], [144, 112], [86, 156], [154, 156], [76, 200], [164, 200]].map(([x, y], k) => (k % 2 ? fir(x, y, 0.45) : kid(x, y, ['#E53935', '#1E88E5', '#FB8C00'][k / 2], 0.8))).join('')
      + R(40, 200, 160, 12, '#8D6E63', 3, 2.5) + [44, 76, 164, 196].map((x) => R(x - 4, 178, 8, 22, '#FFFFFF', 2, 2) + P(`M${x} 176c-6-6 0-14 0-14s6 8 0 14z`, '#FFB300', 1.5)).join('')
      + Lc('M44 156c0-10 6-14 0-22M196 156c0-10 6-14 0-22', '#FFE082', 3) + face(120, 196, 0.25)),
  F('de', 'food', 'maultaschen', 'เมาล์ทัชเชิน เกี๊ยวสี่เหลี่ยมแบบชวาเบินในน้ำซุป', 'Swabian Maultaschen pasta pockets in broth', ['maultaschen', 'เมาล์ทัชเชิน', 'swabian ravioli', 'เกี๊ยวเยอรมัน', 'pasta pockets', 'swabia', 'ชวาเบิน', 'broth', 'น้ำซุปใส', 'stuttgart food'],
    // a deep blue bowl of clear golden broth with three big square pasta pockets with pinched edges, rings of fried onion and green chives floating, a spoon
    P('M28 120h184c-6 56-44 86-92 86s-86-30-92-86z', '#5C6BC0', 3) + E(120, 120, 92, 22, '#FFE082', 3)
      + [[84, 116, -8], [124, 112, 6], [160, 120, -4]].map(([x, y, a]) => g(x, y, 1, R(-22, -16, 44, 32, '#FFF3C4', 6, 2.5) + Lc('M-18-12h36M-18 12h36', '#E6C77A', 2), a)).join('')
      + [[100, 130], [146, 106], [178, 128]].map(([x, y]) => E(x, y, 6, 3, 'none', 0) + Lc(`M${x - 6} ${y}a6 3 0 1 0 12 0a6 3 0 1 0-12 0`, '#A1673F', 2.5)).join('')
      + Lc('M70 106l8-2M108 132l8 2M150 132l8-2M176 110l6 2', '#43A047', 3) + g(206, 80, 1, R(-4, -40, 8, 46, '#B0BEC5', 3, 2) + E(0, 12, 12, 16, '#B0BEC5', 2), 30) + face(124, 108, 0.32)),
  F('de', 'food', 'bienenstich', 'บีเนนชติช เค้กผึ้งต่อยหน้าอัลมอนด์คาราเมล', 'Bienenstich, bee sting cake with a caramel almond top', ['bienenstich', 'บีเนนชติช', 'bee sting cake', 'เค้กผึ้งต่อย', 'caramel almonds', 'อัลมอนด์คาราเมล', 'vanilla cream', 'ครีมวานิลลา', 'german cake', 'kaffee und kuchen'],
    // a thick square slice of cake on a plate: soft yeast bread bottom, a fat layer of vanilla cream, a top crusted with shiny caramel and flaked almonds; a cartoon bee buzzing round it
    E(120, 196, 92, 16, '#FFFFFF', 3) + R(52, 150, 136, 40, '#F2C98A', 4, 3) + R(52, 118, 136, 34, '#FFF8E1', 0, 3) + P('M52 96h136v24H52z', '#F6D58E', 3) + P('M50 98c10-12 130-12 140 0', '#D98E2B', 3)
      + Array.from({ length: 9 }, (_, k) => E(62 + k * 15, 90 + (k % 2) * 4, 6, 3, '#FFF3E0', 1.5)).join('') + [[70, 168], [110, 176], [160, 166]].map(([x, y]) => C(x, y, 2, '#D7A86E', 0)).join('')
      + g(196, 56, 1, E(0, 0, 14, 10, '#FFCA28', 2.5) + Lc('M-4-9v18M4-9v18', INK, 3) + E(-4, -12, 8, 6, '#E3F2FD', 2) + E(6, -12, 8, 6, '#E3F2FD', 2) + C(12, -2, 2, INK, 0)) + Lc('M180 60c-10 6-20 0-26 8', INK, 2) + face(120, 132, 0.35)),

  // ---------- Munich
  L('de/munich/landmark-flossfahrt.v1.svg', 'ล่องแพซุงยักษ์บนแม่น้ำอีซาร์', 'A big timber raft ride down the Isar', ['isar raft', 'ล่องแพอีซาร์', 'flossfahrt', 'floßfahrt', 'timber raft', 'แพซุงยักษ์', 'wolfratshausen', 'brass band', 'วงดนตรีบนแพ', 'raft slide'], 'หาแตรทูบาสีทองบนแพ', 'Find the golden tuba on the raft',
    // a long raft of tied tree trunks floating on a green-blue river, a wooden railing, children sitting on benches, a musician with a shiny tuba, steep wooded banks on both sides
    sky('#E3F2FD') + P('M-4 70c40 10 60 40 70 80H-4z', '#66BB6A', 3) + P('M244 70c-40 10-60 40-70 80h70z', '#43A047', 3) + P('M-4 130h248v114H-4z', '#4DB6AC', 3) + Lc('M20 210h40M170 226h50', '#B2DFDB', 3)
      + Array.from({ length: 9 }, (_, k) => R(34 + k * 20, 150, 18, 52, '#A1673F', 9, 2.5)).join('') + Lc('M34 164h176M34 190h176', '#6D4C41', 3) + Lc('M40 150v-22h164v22', '#8D6E63', 4)
      + kid(70, 150, '#E53935') + kid(100, 150, '#FFCA28') + kid(176, 150, '#7E57C2')
      + g(140, 150, 1, C(0, -32, 10, '#FFE0BD', 2) + P('M-10 0v-22h20v22z', '#2E7D32', 2) + P('M-12-42h24l-4-8h-16z', '#5D4037', 2) + face(0, -30, 0.24) + P('M10-26c16-6 22 6 18 20-6 10-18 6-18-2z', '#FFC107', 2.5) + C(24, -30, 8, '#FFE082', 2)) + face(120, 196, 0.3)),
  L('de/munich/landmark-schaefflertanz.v1.svg', 'การเต้นรำชแฟลเลอร์ของช่างทำถังกับซุ้มไม้สนสีเขียว', 'The coopers\' Schäfflertanz with green fir hoops', ['schäfflertanz', 'schaefflertanz', 'ชแฟลเลอร์ทันซ์', 'coopers dance', 'การเต้นของช่างทำถัง', 'green hoops', 'ซุ้มไม้สนโค้ง', 'every seven years', 'ทุกเจ็ดปี', 'carnival in munich'], 'หาคนที่ยืนอยู่บนถังไม้ตรงกลาง', 'Find the dancer standing on the wooden barrel in the middle',
    // dancers in red jackets, black hats and white trousers holding up arches of green fir twigs in a row; in the middle a dancer balancing on a little barrel, swinging a hoop
    sky('#FFF8E1') + P('M-4 196h248v48H-4z', '#D7CCC8', 3)
      + [52, 120, 188].map((x) => P(`M${x - 34} 196c0-80 68-80 68 0`, 'none', 0) + Lc(`M${x - 34} 196c0-80 68-80 68 0`, '#2E7D32', 12) + Lc(`M${x - 34} 196c0-80 68-80 68 0`, '#66BB6A', 5)).join('')
      + [18, 86, 154, 222].map((x) => g(x, 196, 1, R(-7, -22, 14, 22, '#FFFFFF', 2, 2) + R(-9, -48, 18, 28, '#E53935', 3, 2) + C(0, -58, 9, '#FFE0BD', 2) + R(-8, -72, 16, 8, INK, 2, 0) + face(0, -56, 0.22))).join('')
      + g(120, 150, 1, E(0, 26, 16, 6, '#A1673F', 2.5) + R(-16, 2, 32, 26, '#A1673F', 4, 2.5) + Lc('M-16 10h32M-16 20h32', '#5D4037', 2) + R(-8, -24, 16, 26, '#E53935', 3, 2) + C(0, -34, 9, '#FFE0BD', 2) + R(-8, -48, 16, 8, INK, 2, 0) + face(0, -32, 0.22, 'o') + C(18, -36, 12, 'none', 3))),
  L('de/munich/landmark-herrenchiemsee.v1.svg', 'พระราชวังแฮร์เรนคีมเซบนเกาะกลางทะเลสาบ', 'Herrenchiemsee, the island palace on Lake Chiemsee', ['herrenchiemsee', 'แฮร์เรนคีมเซ', 'chiemsee', 'คีมเซ', 'island palace', 'พระราชวังบนเกาะ', 'bavarian sea', 'ทะเลบาวาเรีย', 'palace fountains', 'king ludwig palace'], 'หาน้ำพุสามสายพุ่งขึ้นหน้าพระราชวัง', 'Find the three fountain jets in front of the palace',
    // a long cream palace with many tall windows and a balustrade roof, three fountains spouting in a round pool in front, all on a green island in a big blue lake with mountains far away
    sky('#E1F5FE') + P('M-4 92l50-30 40 22 50-34 50 30 60-20v40H-4z', '#B0BEC5', 3) + P('M-4 110h248v134H-4z', '#4FC3F7', 3) + P('M10 150c20-30 200-30 220 0 0 30-220 30-220 0z', '#9CCC65', 3)
      + R(40, 96, 160, 46, '#FFF3E0', 0, 3) + R(96, 84, 48, 58, '#FFF8E1', 0, 3) + P('M90 84l30-14 30 14z', '#FFE0B2', 2.5) + wins(46, 104, 6, 10, 6, 14) + wins(150, 104, 5, 10, 6, 14) + wins(102, 98, 4, 10, 6, 14) + Lc('M40 96h160', '#BCAAA4', 3)
      + E(120, 170, 44, 10, '#81D4FA', 2.5) + [100, 120, 140].map((x, k) => Lc(`M${x} 168c0-${k === 1 ? 30 : 20} 0-${k === 1 ? 30 : 20} 0-${k === 1 ? 36 : 24}`, '#E1F5FE', 4)).join('') + Lc('M30 200h40M180 210h40', '#B3E5FC', 3) + face(120, 124, 0.28)),
  L('de/munich/landmark-brandhorst.v1.svg', 'พิพิธภัณฑ์บรันด์ฮอร์สต์ผนังแท่งกระเบื้องหลากสี', 'Museum Brandhorst and its wall of coloured rods', ['museum brandhorst', 'พิพิธภัณฑ์บรันด์ฮอร์สต์', 'colourful facade', 'ผนังหลากสี', 'ceramic rods', 'แท่งกระเบื้องสี', 'kunstareal', 'คุนสท์อาเรอัล', 'modern art museum', 'pinakothek'], 'หาแถบสีชมพูที่ซ่อนอยู่ระหว่างสีเขียว', 'Find the pink stripes hiding between the greens',
    // a long low museum box covered in thousands of upright coloured rods in bands of green, pink, yellow and blue, a taller block at the side, a lawn with children walking past
    sky('#E3F2FD') + P('M-4 196h248v48H-4z', '#AED581', 3) + R(20, 90, 140, 106, '#FFFFFF', 0, 3) + R(150, 60, 70, 136, '#FFFFFF', 0, 3)
      + Array.from({ length: 26 }, (_, k) => R(24 + k * 5, 94, 4, 98, ['#66BB6A', '#F06292', '#FFD54F', '#4FC3F7', '#9575CD', '#26A69A', '#FF8A65'][k % 7], 0, 0)).join('')
      + Array.from({ length: 13 }, (_, k) => R(154 + k * 5, 64, 4, 128, ['#FFD54F', '#F06292', '#81C784', '#4FC3F7', '#FF8A65'][k % 5], 0, 0)).join('')
      + R(20, 90, 140, 106, 'none', 0, 3) + R(150, 60, 70, 136, 'none', 0, 3) + kid(60, 226, '#1E88E5') + kid(92, 226, '#FB8C00') + face(186, 120, 0.35)),
  L('de/munich/landmark-flugwerft.v1.svg', 'พิพิธภัณฑ์เครื่องบินฟลุกแวร์ฟท์ชไลส์ไฮม์', 'The old aircraft hangar museum at Schleißheim', ['flugwerft schleissheim', 'ฟลุกแวร์ฟท์ชไลส์ไฮม์', 'aircraft museum', 'พิพิธภัณฑ์เครื่องบิน', 'old biplane', 'เครื่องบินปีกสองชั้น', 'glider', 'เครื่องร่อน', 'deutsches museum', 'hangar'], 'หาเครื่องร่อนสีเหลืองที่แขวนจากหลังคา', 'Find the yellow glider hanging from the roof',
    // inside a big glass-and-steel hangar with a curved roof: a red biplane with two wings and a wooden propeller on the floor, a long yellow glider hanging from the roof on wires, a child pointing
    sky('#ECEFF1') + P('M10 220V90c40-50 180-50 220 0v130z', '#E3F2FD', 3) + Lc('M40 66v154M80 52v168M120 48v172M160 52v168M200 66v154', '#B0BEC5', 3) + P('M-4 220h248v24H-4z', '#BDBDBD', 3)
      + Lc('M80 56v26M160 56v26', INK, 2) + g(120, 88, 1, P('M-80 0h160l-10 6h-140z', '#FFEB3B', 2.5) + E(0, 2, 24, 7, '#FFF59D', 2.5) + P('M-30 2l-20-12h10l20 12z', '#FFEB3B', 2))
      + g(120, 176, 1, R(-70, -36, 140, 8, '#E53935', 3, 2.5) + R(-70, -4, 140, 8, '#E53935', 3, 2.5) + Lc('M-50-28v24M50-28v24M-20-28v24M20-28v24', '#5D4037', 3) + E(0, -6, 46, 12, '#EF5350', 2.5) + C(-46, -6, 6, '#BDBDBD', 2) + P('M-52-26l4 40', 'none', 3) + Lc('M-52-26l4 40', '#8D6E63', 5) + C(30, 22, 9, '#37474F', 2.5) + C(-24, 22, 9, '#37474F', 2.5) + P('M44-10l26-12v16z', '#EF5350', 2))
      + kid(212, 220, '#43A047') + face(130, 170, 0.28)),

  // ---------- around Neuschwanstein (Linderhof, Füssen, Garmisch)
  L('de/neuschwanstein/landmark-wishingtable.v1.svg', 'โต๊ะวิเศษที่เลื่อนขึ้นลงได้ในพระราชวังลินเดอร์ฮอฟ', 'The magic table that rises from the kitchen at Linderhof', ['tischlein deck dich', 'magic table', 'โต๊ะวิเศษ', 'wishing table', 'linderhof dining room', 'ห้องอาหารลินเดอร์ฮอฟ', 'table lift', 'โต๊ะเลื่อนขึ้นจากครัว', 'king who dined alone', 'linderhof palace'], 'หาพ่อครัวที่ดันโต๊ะขึ้นมาจากชั้นล่าง', 'Find the cook pushing the table up from the floor below',
    // a cutaway: an elegant golden dining room with a round table already laid with plates, cake and a candlestick, rising through a round hole in the parquet floor; underneath, a kitchen where a cook cranks it up
    sky('#FFF3E0') + R(-4, 120, 248, 14, '#A1673F', 0, 3) + R(-4, 134, 248, 110, '#ECEFF1', 0, 0) + Lc('M30 30c20-20 40 0 30 20M180 30c20-20 40 0 30 20', '#FFC107', 4) + R(10, 40, 40, 70, '#FFF8E1', 0, 2.5) + R(190, 40, 40, 70, '#FFF8E1', 0, 2.5)
      + E(120, 122, 50, 6, '#3E2723', 0) + Lc('M120 112v100', '#8D6E63', 6) + E(120, 104, 54, 12, '#FFFFFF', 3) + C(98, 98, 7, '#E3F2FD', 2) + C(142, 98, 7, '#E3F2FD', 2) + P('M112 98h16l-2-14h-12z', '#F48FB1', 2) + Lc('M120 84v-6', '#FFB300', 3) + R(156, 70, 4, 26, '#FFC107', 0, 1.5) + P('M158 70c-4-4 0-10 0-10s4 6 0 10z', '#FF7043', 1)
      + Lc('M90 160l-8-8M150 160l8-8', '#FF8A65', 3) + g(60, 220, 1, C(0, -30, 10, '#FFE0BD', 2) + P('M-10-46h20v-10c-4-6-16-6-20 0z', '#FFFFFF', 2) + P('M-12 0v-22h24v22z', '#FFFFFF', 2) + face(0, -28, 0.24, 'o') + Lc('M12-14h28', '#FFE0BD', 5)) + R(100, 210, 40, 10, '#90A4AE', 2, 2) + C(100, 190, 10, '#90A4AE', 2.5) + face(120, 194, 0.3)),
  L('de/neuschwanstein/landmark-hundinghut.v1.svg', 'กระท่อมฮุนดิงที่มีต้นไม้ใหญ่ทะลุหลังคา', 'Hunding\'s Hut, the log cabin with a tree growing through it', ['hunding hut', 'hundinghütte', 'กระท่อมฮุนดิง', 'linderhof park', 'สวนลินเดอร์ฮอฟ', 'tree through the roof', 'ต้นไม้ทะลุหลังคา', 'log cabin', 'กระท่อมซุง', 'wagner opera hut'], 'หากิ่งไม้ที่ยื่นออกมาจากหลังคา', 'Find the branches growing out through the roof',
    // a rough log cabin with a steep shingled roof in a forest clearing, a huge old tree trunk rising right through the middle of the roof with a leafy crown above, a wooden door and a bench outside
    sky('#E8F5E9') + fir(20, 200, 1.2) + fir(222, 204, 1.1) + P('M-4 200h248v44H-4z', '#81C784', 3)
      + R(54, 120, 132, 84, '#8D6E63', 0, 3) + Array.from({ length: 5 }, (_, k) => Lc(`M54 ${134 + k * 16}h132`, '#5D4037', 3)).join('') + P('M40 124l80-56 80 56z', '#795548', 3) + Lc('M60 110l20 0M150 100l20 0M90 90l20 0', '#5D4037', 3)
      + R(108, 20, 24, 104, '#6D4C41', 4, 3) + C(120, 32, 40, '#43A047', 3) + C(90, 46, 22, '#66BB6A', 2.5) + C(152, 44, 22, '#66BB6A', 2.5) + Lc('M120 60l-18-16M120 54l18-14', '#6D4C41', 4)
      + R(132, 150, 30, 54, '#4E342E', 3, 2.5) + R(72, 148, 26, 22, '#FFF59D', 2, 2.5) + R(80, 196, 40, 8, '#A1673F', 2, 2) + face(120, 98, 0.3)),
  L('de/neuschwanstein/landmark-hohesschloss.v1.svg', 'ปราสาทโฮเอสชลอสฟึสเซินกับหน้าต่างหลอกตาที่วาดไว้', 'The painted pretend windows of the Hohes Schloss in Füssen', ['hohes schloss', 'โฮเอสชลอส', 'füssen castle', 'ปราสาทฟึสเซิน', 'trompe l\'oeil', 'ภาพลวงตา', 'painted windows', 'หน้าต่างวาด', 'illusion painting', 'füssen old town'], 'หาหน้าต่างที่เป็นแค่ภาพวาด ไม่ใช่หน้าต่างจริง', 'Find the windows that are only painted on, not real',
    // a castle courtyard wall in pale yellow with a tall tower; some windows are real glass, others are painted fakes with painted shadows and a painted bay window with a pretend lady peeking; a puzzled child below
    sky('#E3F2FD') + R(150, 30, 60, 170, '#FFF59D', 0, 3) + P('M144 32l36-24 36 24z', '#E53935', 3) + R(30, 80, 130, 120, '#FFF9C4', 0, 3) + P('M24 82l66-30 76 30z', '#E57373', 3) + P('M-4 200h248v44H-4z', '#BDBDBD', 3)
      + R(50, 100, 22, 30, '#81D4FA', 2, 2.5) + Lc('M61 100v30M50 115h22', INK, 2)
      + R(96, 100, 22, 30, '#B39DDB', 2, 2) + Lc('M96 100l22 30M118 100l-22 30', '#9575CD', 2) + P('M118 100l6 4v30l-6-4z', '#7E57C2', 1.5)
      + P('M48 150h40v36h-40z', '#FFE0B2', 2) + P('M44 150l24-12 24 12z', '#FFCC80', 2) + C(68, 166, 7, '#FFE0BD', 1.5) + Lc('M48 186l-6 6M88 186l6 6', '#FFB74D', 2)
      + R(166, 60, 26, 34, '#81D4FA', 2, 2.5) + R(166, 120, 26, 34, '#B39DDB', 2, 2) + Lc('M166 120l26 34', '#9575CD', 2)
      + g(126, 232, 1, C(0, -24, 10, '#FFE0BD', 2) + P('M-10 4v-18h20v18z', '#43A047', 2) + face(0, -22, 0.24, 'o')) + Lc('M140 194c4-8 10-8 12-2', INK, 2)),
  L('de/neuschwanstein/landmark-kneipp.v1.svg', 'บ่อเดินย่ำน้ำเย็นไคน์ปแบบบาวาเรีย', 'A Kneipp pool for wading through cold water', ['kneipp', 'ไคน์ป', 'water treading', 'ย่ำน้ำเย็น', 'kneipp pool', 'บ่อย่ำน้ำ', 'stork walk', 'เดินแบบนกกระสา', 'allgäu', 'cold water cure'], 'หาเด็กที่ยกขาสูงเหมือนนกกระสา', 'Find the child lifting their legs high like a stork',
    // a long stone basin of clear cold water with a wooden handrail down the middle, children wading through lifting their knees high, towels and shoes waiting on the grass, mountains behind
    sky('#E1F5FE') + P('M-4 110l60-50 50 34 50-40 60 46 30-14v40H-4z', '#B0BEC5', 3) + P('M-4 120h248v124H-4z', '#9CCC65', 3)
      + P('M30 160h180l16 50H14z', '#B0BEC5', 3) + P('M40 168h160l10 34H30z', '#4FC3F7', 2.5) + Lc('M50 178h40M130 190h50', '#B3E5FC', 3) + Lc('M30 150h180', '#A1673F', 5) + Lc('M40 150v24M120 150v24M200 150v24', '#A1673F', 4)
      + g(84, 184, 1, C(0, -40, 9, '#FFE0BD', 2) + P('M-8-12v-20h16v20z', '#E53935', 2) + face(0, -38, 0.22, 'o') + Lc('M-4-12l-4 16M4-12l14-6 2 14', '#FFE0BD', 5))
      + g(150, 188, 1, C(0, -40, 9, '#FFE0BD', 2) + P('M-8-12v-20h16v20z', '#FFCA28', 2) + face(0, -38, 0.22) + Lc('M-4-12l-12-4-2 14M4-12l4 16', '#FFE0BD', 5))
      + R(18, 218, 30, 10, '#F48FB1', 3, 2) + E(206, 226, 8, 4, '#1E88E5', 2) + E(222, 226, 8, 4, '#1E88E5', 2)),
  L('de/neuschwanstein/landmark-zugspitze.v1.svg', 'ยอดเขาซุกชปิทเซอ ยอดสูงสุดของเยอรมนี กับทะเลสาบไอบ์เซ', 'The Zugspitze, Germany\'s highest peak, above the Eibsee', ['zugspitze', 'ซุกชปิทเซอ', 'highest mountain in germany', 'ภูเขาสูงสุดของเยอรมนี', 'eibsee', 'ไอบ์เซ', 'garmisch', 'การ์มิช', 'summit station', 'snow in summer'], 'หาสถานีบนยอดเขาที่เกาะอยู่บนก้อนหิน', 'Find the summit station perched on the rocks',
    // a jagged grey rock peak with snow, a little terrace station building balanced on the very top, a cloud below it, and far beneath a turquoise lake ringed by dark firs
    sky('#E1F5FE') + P('M20 170l60-90 26 22 26-70 30 50 26-20 52 108z', '#90A4AE', 3) + P('M106 102l26-70 16 26-10 6-10-10-10 22z', '#FFFFFF', 2.5) + P('M60 120l20-40 14 12-8 6-8-4z', '#FFFFFF', 2)
      + R(116, 22, 34, 16, '#FFF8E1', 2, 2.5) + wins(120, 26, 4, 7, 4, 6) + Lc('M112 22h42', '#E53935', 3)
      + g(160, 84, 1, P('M-30 10c-8 0-10-14 4-14 2-12 22-12 26 0 12-4 20 6 14 14z', '#FFFFFF', 2.5))
      + P('M-4 170h248v74H-4z', '#2E7D32', 3) + E(120, 204, 80, 22, '#26C6DA', 3) + Lc('M80 200h30M130 212h30', '#B2EBF2', 3) + [14, 34, 206, 226].map((x) => fir(x, 196, 0.7, '#1B5E20')).join('') + face(132, 70, 0.3)),

  // ---------- Austria
  F('at', 'food', 'frittatensuppe', 'ฟริททาเทนซุปเปอ ซุปใสใส่เส้นแพนเค้ก', 'Frittatensuppe, clear soup with pancake strips', ['frittatensuppe', 'ฟริททาเทนซุปเปอ', 'pancake soup', 'ซุปเส้นแพนเค้ก', 'clear beef broth', 'ซุปใส', 'pancake strips', 'chives', 'ต้นหอม', 'austrian soup'],
    // a white soup plate of clear amber broth full of thin curly strips of rolled pancake, chopped chives sprinkled on top, a spoon resting at the side
    E(120, 150, 100, 44, '#FFFFFF', 3) + E(120, 146, 78, 30, '#FFB74D', 2.5) + E(120, 146, 70, 24, '#FFCC80', 0)
      + Array.from({ length: 10 }, (_, k) => Lc(`M${66 + (k % 5) * 22} ${134 + Math.floor(k / 5) * 18}c6-6 12 6 18 0`, '#FFF59D', 5) + Lc(`M${66 + (k % 5) * 22} ${134 + Math.floor(k / 5) * 18}c6-6 12 6 18 0`, '#E6B84A', 1.5)).join('')
      + [[80, 128], [104, 160], [142, 130], [160, 156], [120, 146]].map(([x, y]) => Lc(`M${x} ${y}l5-2`, '#43A047', 3)).join('')
      + g(206, 116, 1, R(-4, -50, 8, 52, '#B0BEC5', 3, 2) + E(0, 12, 12, 16, '#B0BEC5', 2), 20) + face(120, 148, 0.35)),
  F('at', 'culture', 'schuhplattler', 'ระบำชูพลัทเลอร์ ตบรองเท้าตบต้นขา', 'Schuhplattler, the slap dance', ['schuhplattler', 'ชูพลัทเลอร์', 'slap dance', 'ระบำตบรองเท้า', 'lederhosen', 'กางเกงหนัง', 'tyrol folk dance', 'ระบำพื้นเมืองทีโรล', 'thigh slapping', 'alpine dance'],
    // a dancer in leather shorts, braces and a green feathered hat hopping on one leg and slapping the sole of his raised shoe; a second dancer clapping; little motion stars round the slaps
    sky('#FFF8E1') + P('M-4 200h248v44H-4z', '#A1887F', 3)
      + g(96, 200, 1, Lc('M-8-46l-4 46', '#FFE0BD', 7) + Lc('M8-46l20 4 6 24', '#FFE0BD', 7) + E(-14, 0, 10, 5, '#4E342E', 2) + E(36, -18, 6, 10, '#4E342E', 2) + R(-14, -66, 28, 24, '#6D4C41', 3, 2.5) + R(-14, -104, 28, 40, '#FFFFFF', 4, 2.5) + Lc('M-8-104v38M8-104v38', '#2E7D32', 4) + C(0, -118, 14, '#FFE0BD', 2.5) + E(0, -128, 18, 5, '#2E7D32', 2) + P('M-10-128c0-14 20-14 20 0z', '#388E3C', 2) + Lc('M10-132l14-14', '#795548', 3) + face(0, -116, 0.28, 'o') + Lc('M-14-96l-10 26 36 46', '#FFE0BD', 6))
      + g(178, 200, 1, Lc('M-6-46v46M6-46v46', '#FFE0BD', 7) + E(-8, 0, 9, 5, '#4E342E', 2) + E(8, 0, 9, 5, '#4E342E', 2) + R(-13, -64, 26, 22, '#6D4C41', 3, 2.5) + R(-13, -100, 26, 38, '#FFFFFF', 4, 2.5) + Lc('M-7-100v36M7-100v36', '#C62828', 4) + C(0, -114, 13, '#FFE0BD', 2.5) + E(0, -124, 17, 5, '#2E7D32', 2) + P('M-9-124c0-12 18-12 18 0z', '#388E3C', 2) + face(0, -112, 0.26) + Lc('M-12-92l-16 8M12-92l-14 10', '#FFE0BD', 6))
      + [[138, 176], [56, 120], [160, 92]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 1-5 4 2 7-6-4-6 4 2-7-5-4 6-1z`, '#FFCA28', 1.5)).join('')),
  F('at', 'food', 'vanillekipferl', 'วานิลเลคิพเฟิร์ล คุกกี้พระจันทร์เสี้ยวโรยน้ำตาลวานิลลา', 'Vanillekipferl, vanilla crescent biscuits', ['vanillekipferl', 'วานิลเลคิพเฟิร์ล', 'vanilla crescents', 'คุกกี้พระจันทร์เสี้ยว', 'christmas biscuits', 'คุกกี้คริสต์มาส', 'icing sugar', 'น้ำตาลไอซิ่ง', 'almond biscuits', 'weihnachtskekse'],
    // a round tin with a red rim full of little pale crescent-moon biscuits snowed with icing sugar, one biscuit outside with a bite, a dark vanilla pod and a vanilla flower beside
    E(110, 150, 90, 50, '#E53935', 3) + E(110, 146, 78, 40, '#FFF8E1', 2.5)
      + [[70, 136, -20], [104, 126, 10], [140, 136, 30], [84, 160, 0], [122, 162, -10], [156, 158, 20]].map(([x, y, a]) => g(x, y, 1, P('M-18 4c4-18 32-18 36 0-8-8-28-8-36 0z', '#FFE0A3', 2.5) + C(-6, -2, 1.5, '#FFFFFF', 0) + C(6, -4, 1.5, '#FFFFFF', 0), a)).join('')
      + g(200, 200, 1, P('M-22 4c4-18 32-18 36 0-8-8-28-8-36 0z', '#FFE0A3', 2.5) + C(14, 0, 6, '#FFFFFF', 0), -10) + Lc('M150 214c20-4 40-14 64-34', '#4E342E', 6)
      + g(206, 92, 1, [0, 72, 144, 216, 288].map((a) => g(0, 0, 1, E(0, -10, 6, 10, '#FFF9C4', 2), a)).join('') + C(0, 0, 4, '#FFCA28', 1.5)) + face(110, 146, 0.32)),
  F('at', 'food', 'tafelspitz', 'ทาเฟิลชปิทซ์ เนื้อต้มในหม้อทองแดงแบบเวียนนา', 'Tafelspitz, boiled beef served in its copper pot', ['tafelspitz', 'ทาเฟิลชปิทซ์', 'boiled beef', 'เนื้อต้ม', 'copper pot', 'หม้อทองแดง', 'apple horseradish', 'ซอสแอปเปิลฮอร์สแรดิช', 'viennese classic', 'beef broth'],
    // a shiny copper pot of golden broth holding sliced boiled beef, carrots, celery and a marrow bone; beside it little bowls of apple-horseradish and chive sauce and golden fried potatoes
    P('M30 110h140v60c0 26-30 40-70 40s-70-14-70-40z', '#D9773E', 3) + E(100, 110, 70, 14, '#E8925A', 3) + E(100, 112, 60, 10, '#FFCA28', 2) + Lc('M30 120h-14M170 120h14', '#B85C2A', 6) + Lc('M40 150c20 10 100 10 120 0', '#F0A26F', 4)
      + [[72, 98], [98, 94], [124, 98]].map(([x, y]) => P(`M${x - 14} ${y + 8}c0-10 28-10 28 0z`, '#BC8A7A', 2.5)).join('') + R(140, 86, 8, 20, '#FF8A65', 3, 2) + R(56, 90, 8, 18, '#C5E1A5', 3, 2) + C(150, 104, 8, '#FFF8E1', 2)
      + g(200, 180, 1, E(0, 0, 22, 10, '#FFFFFF', 2.5) + E(0, -3, 16, 5, '#FFF3E0', 1.5)) + g(208, 140, 1, E(0, 0, 18, 8, '#FFFFFF', 2.5) + E(0, -3, 13, 4, '#C5E1A5', 1.5))
      + g(110, 216, 1, E(0, 0, 50, 10, '#FFFFFF', 2.5) + [-30, -10, 10, 30].map((x) => E(x, -4, 10, 5, '#FFB300', 1.5)).join('')) + face(100, 136, 0.35)),

  // ---------- Vienna
  L('at/vienna/landmark-stadtbahnpavillon.v1.svg', 'ศาลาสถานีรถไฟคาร์ลสพลัทซ์ลายดอกทานตะวันทอง', 'The Karlsplatz railway pavilion with golden sunflowers', ['karlsplatz pavilion', 'ศาลาคาร์ลสพลัทซ์', 'otto wagner pavilion', 'stadtbahn', 'ชตัดท์บาห์น', 'golden sunflowers', 'ลายทานตะวันทอง', 'jugendstil', 'อาร์ตนูโว', 'green iron frame'], 'หาดอกทานตะวันสีทองที่ขอบหลังคา', 'Find the golden sunflowers along the roof',
    // a small white marble pavilion in a green iron frame with a curved arch entrance and a gently curved roof, rows of golden sunflower ornaments; a twin pavilion behind; trees and a lamp
    sky('#E8F5E9') + P('M-4 200h248v44H-4z', '#BDBDBD', 3) + tree(20, 196, 1.2) + tree(220, 196, 1.2)
      + R(40, 80, 160, 120, '#FFFFFF', 0, 3) + Array.from({ length: 5 }, (_, k) => Lc(`M${40 + k * 40} 80v120`, '#2E7D32', 5)).join('') + Lc('M40 120h160M40 160h160', '#2E7D32', 4)
      + P('M30 82c30-22 150-22 180 0z', '#43A047', 3) + P('M90 200v-50c0-34 60-34 60 0v50z', '#A5D6A7', 3) + Lc('M100 200v-48c0-22 40-22 40 0v48', '#2E7D32', 2)
      + [60, 100, 140, 180].map((x) => g(x, 100, 1, [0, 45, 90, 135, 180, 225, 270, 315].map((a) => g(0, 0, 1, E(0, -7, 3, 5, '#FFC107', 1), a)).join('') + C(0, 0, 3, '#8D6E63', 1))).join('')
      + [60, 180].map((x) => C(x, 140, 9, '#FFC107', 2) + C(x, 140, 4, '#8D6E63', 1)).join('') + face(120, 176, 0.3)),
  L('at/vienna/landmark-donauturm.v1.svg', 'หอคอยโดเนาทวร์มกับร้านกาแฟหมุนได้', 'The Danube Tower with its turning café', ['donauturm', 'โดเนาทวร์ม', 'danube tower', 'หอคอยแม่น้ำดานูบ', 'revolving cafe', 'ร้านกาแฟหมุนได้', 'donaupark', 'โดเนาพาร์ค', 'tallest tower in austria', 'view over vienna'], 'หาวงแหวนที่หมุนอยู่บนยอดหอคอย', 'Find the round ring that slowly turns at the top',
    // a very tall slim concrete tower with a bulging round head of windows (the turning café) and a needle antenna, green park with flowerbeds and a little lake below, a child looking up
    sky('#E1F5FE') + P('M-4 196h248v48H-4z', '#9CCC65', 3) + E(70, 214, 40, 10, '#4FC3F7', 2.5) + [[160, 210, '#F06292'], [190, 220, '#FFCA28'], [210, 206, '#BA68C8']].map(([x, y, c]) => C(x, y, 6, c, 2)).join('')
      + P('M112 196l4-130h8l4 130z', '#ECEFF1', 3) + P('M96 70c0-14 48-14 48 0l-4 16h-40z', '#FFFFFF', 3) + R(98, 72, 44, 8, '#4FC3F7', 2, 2) + R(102, 58, 36, 8, '#B3E5FC', 2, 2) + E(120, 56, 18, 5, '#ECEFF1', 2.5) + Lc('M120 52V10', INK, 3) + C(120, 10, 3, '#E53935', 1.5)
      + R(102, 184, 36, 14, '#ECEFF1', 2, 2.5) + Lc('M130 34c8-4 14-4 18 2M110 34c-8-4-14-4-18 2', '#90A4AE', 2) + kid(40, 226, '#FB8C00') + face(120, 140, 0.25)),
  L('at/vienna/landmark-punschkrapfen.v1.svg', 'พุนช์คราพเฟิน ขนมเค้กเหลี่ยมเคลือบน้ำตาลสีชมพู', 'A Punschkrapfen, Vienna\'s bright pink iced cake', ['punschkrapfen', 'พุนช์คราพเฟิน', 'pink iced cake', 'เค้กเคลือบชมพู', 'viennese pastry', 'ขนมเวียนนา', 'konditorei', 'ร้านขนมเวียนนา', 'petit four', 'pink cube'], 'หาชั้นแยมสีแดงที่ซ่อนอยู่ข้างใน', 'Find the red jam layer hiding inside',
    // a fat cube of cake covered in glossy shocking-pink icing, one slice cut away to show layers of yellow sponge, red jam and a darker soaked middle, a chocolate dot on top, on a little gold-edged plate with a fork
    E(116, 196, 86, 18, '#FFFFFF', 3) + E(116, 196, 74, 12, 'none', 0) + Lc('M40 198c40 12 112 12 152 0', '#FFC107', 2)
      + P('M54 100h112v86H54z', '#F06292', 3) + P('M54 100l20-16h112l-20 16z', '#F48FB1', 3) + P('M166 100l20-16v86l-20 16z', '#EC407A', 3)
      + R(100, 110, 66, 76, '#FFE082', 0, 2.5) + R(100, 128, 66, 8, '#E53935', 0, 1.5) + R(100, 146, 66, 16, '#C68B4A', 0, 1.5) + R(100, 168, 66, 6, '#E53935', 0, 1.5) + Lc('M54 104c10 6 20-6 30 0', '#FCE4EC', 3)
      + C(126, 92, 7, '#4E342E', 2) + g(206, 170, 1, R(-3, -40, 6, 40, '#FFC107', 2, 1.5) + Lc('M-6-40v-14M0-40v-14M6-40v-14', '#FFC107', 3), 20) + face(78, 140, 0.35)),
  L('at/vienna/landmark-gasometer.v1.svg', 'กาโซเมเตอร์ ถังก๊าซอิฐยักษ์สี่ถังที่กลายเป็นบ้านคน', 'The four brick Gasometers that became homes', ['gasometer', 'กาโซเมเตอร์', 'gas holders', 'ถังก๊าซเก่า', 'simmering', 'ซิมเมอริง', 'brick drums', 'ถังอิฐยักษ์', 'apartments inside', 'บ้านในถังก๊าซ'], 'หาหน้าต่างบ้านที่มีกระถางดอกไม้', 'Find the home window with a flower box',
    // four huge round red-brick drums standing in a row with rows of arched windows and shallow glass domes on top, one with a little flower box and a waving face; a road in front
    sky('#E3F2FD') + P('M-4 206h248v38H-4z', '#BDBDBD', 3)
      + [[40, 96, 60], [92, 84, 62], [146, 90, 60], [198, 100, 56]].map(([x, top, w]) => R(x - w / 2, top, w, 206 - top, '#C0583D', 0, 3) + E(x, top, w / 2, 8, '#B3E5FC', 2.5) + Lc(`M${x - w / 2} ${top + 20}h${w}M${x - w / 2} ${top + 52}h${w}M${x - w / 2} ${top + 84}h${w}`, '#A1442D', 2)
        + [0, 1, 2].map((r) => [-14, 0, 14].map((dx) => P(`M${x + dx - 4} ${top + 44 + r * 32}v-10c0-6 8-6 8 0v10z`, '#FFE082', 1.5)).join('')).join('')).join('')
      + R(84, 152, 16, 6, '#8D6E63', 1, 1.5) + [86, 92, 98].map((x) => C(x, 150, 3, '#F06292', 1)).join('') + face(146, 120, 0.35)),
  L('at/vienna/landmark-majolikahaus.v1.svg', 'บ้านมาโยลิกาที่ผนังเป็นกระเบื้องลายดอกกุหลาบ', 'The Majolica House covered in tiled roses', ['majolikahaus', 'บ้านมาโยลิกา', 'majolica house', 'tiled flowers', 'กระเบื้องลายดอกไม้', 'otto wagner', 'ออทโท วากเนอร์', 'linke wienzeile', 'jugendstil facade', 'pink roses'], 'หาเถากุหลาบสีชมพูที่เลื้อยขึ้นไปบนผนัง', 'Find the pink rose vines climbing up the wall',
    // a tall flat apartment front with even rows of windows, the wall covered in painted tiles: big pink and red roses on green trailing vines spreading out from the top, iron balconies, a shop row below
    sky('#FFF8E1') + R(30, 30, 180, 190, '#FFFDE7', 0, 3) + R(30, 190, 180, 30, '#BCAAA4', 0, 3) + Lc('M24 30h192', '#8D6E63', 6)
      + Lc('M40 50c40 30 60 10 80 40s50 0 80 30M60 40c10 60 50 60 60 120M180 40c-10 60-40 70-50 120', '#66BB6A', 4)
      + [[60, 52], [100, 66], [140, 60], [180, 54], [80, 92], [160, 96], [120, 110], [70, 140], [170, 136], [118, 150]].map(([x, y], k) => C(x, y, 9, k % 2 ? '#F06292' : '#E53935', 2) + C(x, y, 3.5, '#FCE4EC', 0)).join('')
      + [0, 1, 2].map((r) => [48, 92, 136, 180].map((x) => R(x, 66 + r * 40, 14, 22, '#90CAF9', 1, 2)).join('') + Lc(`M44 ${90 + r * 40}h152`, INK, 2)).join('')
      + [50, 110, 170].map((x) => R(x, 196, 30, 24, '#5D4037', 2, 2)).join('') + face(120, 172, 0.3)),

  // ---------- Hallstatt and the Salzkammergut
  L('at/hallstatt/landmark-soleleitung.v1.svg', 'ท่อน้ำเกลือไม้ที่เก่าแก่ที่สุดในโลกริมทางเดินป่า', 'The old wooden brine pipeline along the forest path', ['soleleitung', 'ท่อน้ำเกลือ', 'brine pipeline', 'ท่อน้ำเกลือไม้', 'soleweg', 'ทางเดินโซเลเวก', 'oldest pipeline in the world', 'salt water pipe', 'gosauzwang bridge', 'forest walk'], 'หาท่อไม้ยาวที่วิ่งอยู่ใต้ทางเดิน', 'Find the long wooden pipe running under the path',
    // a narrow forest path along a steep mountainside with a long round wooden pipe resting on little posts beside it, a stone arch bridge across a gorge ahead, children walking, the lake far below
    sky('#E1F5FE') + P('M-4 150h248v94H-4z', '#4FC3F7', 3) + P('M-4 40c60 20 120 60 248 70v80H-4z', '#558B2F', 3) + fir(30, 90, 0.8) + fir(70, 104, 0.8) + fir(200, 128, 0.8)
      + P('M-4 140c80-10 160 6 248 40v20c-90-30-170-46-248-38z', '#D7CCC8', 3) + Lc('M-4 168c80-8 160 6 248 36', '#8D6E63', 10) + Lc('M-4 168c80-8 160 6 248 36', '#A1673F', 6) + [20, 70, 120, 170, 220].map((x, k) => Lc(`M${x} ${168 + k * 7}v14`, '#5D4037', 3)).join('')
      + P('M150 136c10-20 40-20 50 0', 'none', 0) + Lc('M150 140c10-24 46-24 56 0', '#B0BEC5', 8) + kid(80, 150, '#E53935') + kid(110, 154, '#1E88E5', 0.9) + face(120, 196, 0.25)),
  L('at/hallstatt/landmark-narzissenfest.v1.svg', 'เทศกาลดอกนาร์ซิสซัสที่บาดเอาส์เซ ตุ๊กตาดอกไม้ลอยน้ำ', 'The Narcissus Festival floats made of flowers at Bad Aussee', ['narzissenfest', 'เทศกาลนาร์ซิสซัส', 'narcissus festival', 'เทศกาลดอกไม้ขาว', 'bad aussee', 'บาดเอาส์เซ', 'flower figures', 'ตุ๊กตาดอกไม้', 'altaussee lake', 'daffodil meadows'], 'หาหอยทากยักษ์ที่ทำจากดอกไม้สีขาว', 'Find the giant snail made of white flowers',
    // a giant snail figure covered all over in white narcissus flowers riding on a raft across a calm lake, a smaller flower fish beside it, meadows of white narcissus on the shore and mountains behind
    sky('#E3F2FD') + P('M-4 100l50-40 40 30 50-44 60 50 48-20v44H-4z', '#B0BEC5', 3) + P('M-4 120h248v80H-4z', '#4FC3F7', 3) + P('M-4 196h248v48H-4z', '#9CCC65', 3)
      + R(60, 168, 120, 12, '#A1673F', 3, 2.5) + C(140, 130, 36, '#FFFFFF', 3) + Lc('M140 130m-24 0a24 24 0 1 1 24 24a14 14 0 1 1 -10-14', '#FFE082', 3) + P('M72 168c0-20 20-24 40-24h34v24z', '#FFFFFF', 3) + Lc('M82 146l-6-20M92 146l2-20', '#43A047', 3) + C(76, 124, 5, '#FFFFFF', 2) + C(94, 124, 5, '#FFFFFF', 2)
      + Array.from({ length: 14 }, (_, k) => C(110 + (k % 5) * 14, 106 + Math.floor(k / 5) * 18, 4, '#FFF59D', 0)).join('')
      + Array.from({ length: 8 }, (_, k) => C(18 + k * 29, 218 + (k % 2) * 10, 7, '#FFFFFF', 2) + C(18 + k * 29, 218 + (k % 2) * 10, 3, '#FFB300', 0)).join('') + face(92, 158, 0.3)),
  L('at/hallstatt/landmark-ischlertoertchen.v1.svg', 'ขนมอิชเลอร์ทอร์ทเชิน บิสกิตอัลมอนด์ไส้ช็อกโกแลตแบบบาดอิชล์', 'Ischler Törtchen, Bad Ischl\'s chocolate almond biscuits', ['ischler törtchen', 'ischler toertchen', 'อิชเลอร์ทอร์ทเชิน', 'bad ischl', 'บาดอิชล์', 'almond biscuits', 'บิสกิตอัลมอนด์', 'chocolate filling', 'ไส้ช็อกโกแลต', 'imperial town pastry'], 'หาบิสกิตที่จุ่มช็อกโกแลตแค่ครึ่งเดียว', 'Find the biscuit dipped in chocolate only halfway',
    // a lace doily on a plate with three round double biscuits sandwiched with chocolate cream, each with a pistachio crumb on top; one half-dipped in shiny dark chocolate; a little jam jar behind
    E(120, 180, 96, 26, '#FFFFFF', 3) + Array.from({ length: 12 }, (_, k) => C(120 + 86 * Math.cos(k * Math.PI / 6), 180 + 22 * Math.sin(k * Math.PI / 6), 6, '#FFFFFF', 2)).join('')
      + [[76, 156], [164, 158]].map(([x, y]) => E(x, y + 10, 30, 10, '#E0B97A', 2.5) + R(x - 30, y, 60, 10, '#5D4037', 0, 2) + E(x, y, 30, 10, '#EED29B', 2.5) + C(x, y - 2, 4, '#9CCC65', 1.5)).join('')
      + g(120, 130, 1, E(0, 12, 34, 11, '#E0B97A', 2.5) + R(-34, 0, 68, 12, '#5D4037', 0, 2) + E(0, 0, 34, 11, '#EED29B', 2.5) + P('M0-11a34 11 0 0 1 0 22v12a34 11 0 0 0 0-22z', '#4E342E', 2.5) + P('M0-11c20 0 34 4 34 11s-14 11-34 11z', '#4E342E', 2.5))
      + g(196, 96, 1, R(-14, -20, 28, 30, '#E53935', 4, 2.5) + R(-16, -26, 32, 8, '#FFFFFF', 2, 2)) + face(76, 160, 0.3)),
  L('at/hallstatt/landmark-welterbespirale.v1.svg', 'จุดชมวิวเกลียวมรดกโลกบนคริพเพนชไตน์', 'The World Heritage Spiral lookout on the Krippenstein', ['welterbespirale', 'เกลียวมรดกโลก', 'world heritage spiral', 'krippenstein', 'คริพเพนชไตน์', 'spiral lookout', 'จุดชมวิวรูปเกลียว', 'view of hallstatt lake', 'dachstein plateau', 'cliff edge platform'], 'หาทะเลสาบไกลๆ ที่มองเห็นจากปลายเกลียว', 'Find the faraway lake you can see from the end of the spiral',
    // a curling steel walkway like a snail shell sticking out over a cliff edge on a high rocky plateau, children at its tip pointing, a deep valley with a long blue lake far below and peaks around
    sky('#E1F5FE') + P('M-4 150h248v94H-4z', '#78909C', 0) + P('M90 200c10-30 40-50 150-50v94H90z', '#90A4AE', 0) + P('M-4 150h248', 'none', 0) + E(120, 214, 70, 12, '#29B6F6', 2.5) + P('M-4 160l40-30 30 20 30-10v84H-4z', '#B0BEC5', 3)
      + P('M-4 110h120l10 40H-4z', '#CFD8DC', 3) + Lc('M100 110c40 0 70 14 70 36s-24 30-44 30-34-10-34-24 12-20 26-20 22 6 22 14', '#FFCC80', 8) + Lc('M100 110c40 0 70 14 70 36s-24 30-44 30-34-10-34-24 12-20 26-20 22 6 22 14', '#BF8A5A', 2)
      + Lc('M100 104c42 0 78 16 78 42', '#90A4AE', 2) + kid(40, 110, '#E53935') + kid(140, 166, '#FFCA28', 0.8) + P('M196 60l20-30 24 30z', '#ECEFF1', 2.5) + face(126, 144, 0.25)),
  L('at/hallstatt/landmark-pferdeeisenbahn.v1.svg', 'รถไฟม้าลากสายแรกของยุโรปถึงกมุนเดิน', 'The horse-drawn railway to Gmunden', ['pferdeeisenbahn', 'รถไฟม้าลาก', 'horse railway', 'horse-drawn railway', 'gmunden', 'กมุนเดิน', 'salt transport', 'ขนเกลือ', 'budweis to gmunden', 'oldest railway in europe'], 'หาม้าที่ลากรถไฟไม้บนราง', 'Find the horse pulling the wooden carriage on the rails',
    // a brown horse in a collar pulling a little green-and-cream wooden coach on iron rails, a driver in a top hat on the box, passengers waving from the windows, sleepers on the ground, a lake town behind
    sky('#FFF8E1') + P('M-4 120h248v40H-4z', '#81D4FA', 3) + P('M-4 160h248v84H-4z', '#AED581', 3) + Lc('M-4 206h248M-4 222h248', '#78909C', 4) + Array.from({ length: 12 }, (_, k) => R(4 + k * 20, 204, 8, 20, '#8D6E63', 0, 1.5)).join('')
      + g(170, 202, 1, E(0, -34, 30, 16, '#8D5524', 3) + P('M22-44l16-24 14 8-8 22z', '#8D5524', 3) + C(44, -64, 2, INK, 0) + Lc('M-20-20v20M-10-20v20M14-20v20M22-20v20', '#8D5524', 5) + Lc('M30-62l-8-14', '#4E342E', 4) + P('M14-52c4 8 4 18-2 22', 'none', 0) + R(10, -56, 12, 20, '#E53935', 5, 2) + P('M-30-38c-10 6-14 14-12 22', 'none', 0) + Lc('M-30-38c-10 6-12 16-8 24', '#4E342E', 3))
      + R(36, 140, 92, 58, '#81C784', 6, 3) + R(36, 140, 92, 14, '#FFF8E1', 6, 2.5) + wins(46, 160, 3, 26, 18, 16, '#FFF59D') + C(58, 204, 9, '#5D4037', 2.5) + C(108, 204, 9, '#5D4037', 2.5) + Lc('M128 180h20', '#5D4037', 3)
      + g(110, 134, 1, C(0, -10, 8, '#FFE0BD', 2) + R(-6, -30, 12, 14, INK, 1, 0) + face(0, -8, 0.2)) + face(160, 168, 0.25)),
];

export default { places: {}, items };
