// Wave 8 (mixed group, part 2): Peru (Cusco, the Sacred Valley, Titicaca, Lima), Brazil (Rio de Janeiro) and Argentina (Buenos Aires, Iguazú, Patagonia)
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (pe/cusco/landmark-tipon.v1.svg → pe-cusco.landmark.tipon)
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
// a country picture (food, animal, culture, transport): pe/food-causa.v1.svg → pe.food.causa
const K = (cc, cat, slug, th, en, kw, svg) => ({ id: `${cc}.${cat}.${slug}`, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const palm = (x, y, h) => Lc(`M${x} ${y}c2-${h / 2} -4-${h} 4-${h}`, '#795548', 5) + Lc(`M${x + 4} ${y - h}c-16-6-24 2-26 12M${x + 4} ${y - h}c16-6 24 2 26 12M${x + 4} ${y - h}c-8-12-18-14-24-10M${x + 4} ${y - h}c8-12 18-14 24-10`, '#43A047', 5);
const leaf = (x, y, s, rot, c = '#43A047') => g(x, y, s, P('M0 0c10-20 34-24 50-14-10 18-34 26-50 14z', c, 2.5) + Lc('M4 0c14-6 28-10 42-12', '#2E7D32', 2), rot);

const items = [
  // ---------- Peru
  K('pe', 'food', 'causa', 'กาวซา มันฝรั่งเหลืองซ้อนชั้น', 'Causa, layered yellow potato', ['causa', 'causa limeña', 'กาวซา', 'yellow potato', 'มันฝรั่งเหลือง', 'ají amarillo', 'avocado', 'อะโวคาโด', 'peruvian starter', 'layered potato'],
    // a neat round tower of bright yellow mashed potato with a green avocado layer and a creamy filling in between, topped with a slice of boiled egg, a black olive and a red pepper strip, on a white plate with sauce dots
    E(120, 196, 96, 26, '#FFFFFF', 3.5) + [[80, 208], [160, 208], [60, 192], [180, 192]].map(([x, y]) => C(x, y, 4, '#FFCA28', 0)).join('')
      + P('M64 190V96c0-14 112-14 112 0v94c0 14-112 14-112 0z', '#FFD54F', 3.5) + E(120, 96, 56, 12, '#FFE082', 3)
      + P('M64 124c30 8 82 8 112 0v14c-30 8-82 8-112 0z', '#9CCC65', 2.5) + P('M64 156c30 8 82 8 112 0v12c-30 8-82 8-112 0z', '#FFF3E0', 2.5)
      + E(120, 86, 22, 10, '#FFFFFF', 2.5) + C(120, 86, 7, '#FDD835', 0) + E(100, 80, 7, 9, INK, 0) + Lc('M136 78c6 6 12 6 18 4', '#E53935', 5) + face(120, 168, 0.36)),
  K('pe', 'food', 'chichamorada', 'ชิชาโมราดา น้ำข้าวโพดม่วง', 'Chicha morada, the purple corn drink', ['chicha morada', 'ชิชาโมราดา', 'purple corn', 'ข้าวโพดม่วง', 'maíz morado', 'purple drink', 'น้ำสีม่วง', 'pineapple', 'cinnamon', 'peruvian drink'],
    // a big glass jug of deep purple drink with a pineapple slice and a cinnamon stick floating in it, a cob of dark purple corn lying beside it, a small glass poured and smiling
    g(66, 150, 1, E(0, 0, 18, 54, '#4A148C', 3.5) + [[-8, -36], [6, -24], [-6, -8], [8, 6], [-6, 22], [6, 38]].map(([x, y]) => E(x, y, 6, 5, '#7B1FA2', 1.5)).join('') + P('M0-54c-20-10-26-30-20-44M0-54c16-8 22-26 18-40', '#C5E1A5', 3), -16)
      + P('M106 56h84l-6 154c0 8-72 8-72 0z', '#F3E5F5', 3.5) + P('M110 84h76l-4 122c0 6-68 6-68 0z', '#6A1B9A', 0) + Lc('M190 70c22 0 24 50 0 60', '#E1BEE7', 7) + Lc('M190 70c22 0 24 50 0 60', INK, 2)
      + C(140, 110, 16, '#FFEB3B', 2.5) + C(140, 110, 6, '#FBC02D', 0) + R(160, 60, 8, 60, '#8D6E63', 3, 2.5) + face(148, 160, 0.38)
      + P('M188 168h40l-4 52h-32z', '#F3E5F5', 3) + R(194, 180, 28, 38, '#6A1B9A', 2, 0) + face(208, 200, 0.2)),
  K('pe', 'animal', 'hummingbird', 'นกฮัมมิงเบิร์ดหางพาย', 'A marvellous spatuletail hummingbird', ['hummingbird', 'นกฮัมมิงเบิร์ด', 'marvellous spatuletail', 'spatuletail', 'หางพาย', 'cloud forest', 'ป่าเมฆ', 'tiny bird', 'นกจิ๋ว', 'amazonas peru'],
    // a tiny shiny green hummingbird hovering in front of a red trumpet flower, its wings a blur, a long thin beak, two long wire tail feathers ending in big round violet-blue discs
    Lc('M196 20c-10 40-20 80-30 120', '#558B2F', 4) + [[180, 70], [168, 118]].map(([x, y]) => leaf(x, y, 0.6, 160)).join('')
      + g(176, 82, 1, P('M0 0c-6 20-10 34-8 48l12-2c2-14 2-30-4-46z', '#E53935', 3) + P('M-8 48l-10 8M4 46l10 10', '#E53935', 3), 10)
      + E(96, 112, 26, 16, '#43A047', 3.5) + C(124, 100, 14, '#2E7D32', 3) + Lc('M136 98l38-8', INK, 3) + C(128, 96, 3, INK, 0) + E(100, 120, 14, 6, '#26C6DA', 0)
      + P('M90 100c-10-30-30-46-50-44 10 16 26 30 50 44z', '#C8E6C9', 3) + P('M100 98c4-30 0-52-16-62-2 20 4 40 16 62z', '#E8F5E9', 3)
      + Lc('M72 120c-20 20-30 50-44 80M74 124c-10 26-12 56-20 86', INK, 2.5) + C(28, 204, 13, '#5C6BC0', 3) + C(54, 214, 13, '#7E57C2', 3) + face(108, 116, 0.28)),
  K('pe', 'culture', 'mateburilado', 'มาเตบูริลาโด น้ำเต้าแกะลาย', 'Mate burilado, the carved gourd', ['mate burilado', 'มาเตบูริลาโด', 'carved gourd', 'น้ำเต้าแกะลาย', 'huancayo', 'อวนกาโย', 'peruvian craft', 'หัตถกรรมเปรู', 'gourd box', 'folk art'],
    // a round golden gourd box with a lid, its skin carved in dark brown lines showing little houses, mountains, a llama and a sun in bands, a carving tool beside it
    E(120, 146, 74, 64, '#E8B85C', 3.5) + P('M60 112c20-16 100-16 120 0', 'none') + Lc('M54 110c30-14 102-14 132 0', '#8D6E63', 3) + P('M74 108c4-34 88-34 92 0z', '#F0C978', 3.5) + C(120, 74, 7, '#8D6E63', 2.5)
      + Lc('M62 130l14-14 12 10 14-18 14 18 12-12 16 16 14-14 14 14', '#5D3A1A', 3) + C(150, 92, 7, 'none', 2) + Lc('M150 80v-4M162 92h4M138 92h-4', '#5D3A1A', 2)
      + g(84, 154, 1, R(-10, -12, 20, 14, 'none', 0, 2) + P('M-12-12l12-8 12 8', 'none')) + Lc('M74 142l10-8 10 8', '#5D3A1A', 2)
      + g(150, 156, 1, P('M-12 4h18l6-16 4 2-4 16v10M-10 4v10M2 4v10', 'none')) + Lc('M58 176c30 10 94 10 124 0', '#5D3A1A', 2.5) + face(120, 186, 0.32)
      + g(206, 196, 1, R(-4, -40, 8, 40, '#A1887F', 2, 2.5) + P('M-4 0l4 14 4-14z', '#B0BEC5', 2), 24)),
  K('pe', 'culture', 'cochineal', 'สีแดงจากแมลงโคชินีล', 'Red dye from cochineal', ['cochineal', 'โคชินีล', 'cochinilla', 'natural dye', 'สีย้อมธรรมชาติ', 'red dye', 'สีแดง', 'dyed wool', 'ไหมพรมย้อม', 'cactus pads'],
    // a green prickly cactus pad dotted with little white fluffy specks, a small stone bowl of bright crimson crushed powder with a few drops of lime making it orange, skeins of wool dyed red, pink and purple hanging from a stick
    g(56, 150, 1, E(0, 0, 34, 50, '#7CB342', 3.5) + [[-14, -24], [10, -30], [-6, 0], [14, 10], [-12, 26], [8, 34]].map(([x, y]) => C(x, y, 5, '#FAFAFA', 1.5)).join('') + face(0, 0, 0.3)) + R(46, 196, 20, 22, '#7CB342', 4, 3)
      + E(130, 200, 40, 14, '#9E9E9E', 3.5) + P('M90 200c0 22 80 22 80 0z', '#9E9E9E', 3.5) + E(130, 198, 32, 8, '#C2185B', 2) + C(150, 196, 4, '#FF7043', 0) + face(130, 214, 0.25)
      + Lc('M100 30h130', '#8D6E63', 6) + [[118, '#D32F2F'], [160, '#EC407A'], [202, '#8E24AA']].map(([x, c]) => P(`M${x - 12} 32c-4 40-4 80 0 110h24c4-30 4-70 0-110z`, c, 3) + Lc(`M${x - 6} 40v96M${x + 6} 40v96`, 'rgba(255,255,255,.4)', 2)).join('')),

  // ---------- Cusco, the Sacred Valley, Titicaca and Lima
  L('pe/cusco/landmark-taquile.v1.svg', 'ซุ้มประตูหินบนเกาะตากีเล', 'The stone arches of Taquile Island', ['taquile island', 'isla taquile', 'เกาะตากีเล', 'stone arch', 'ซุ้มประตูหิน', 'lake titicaca island', 'เกาะในทะเลสาบติติกากา', 'island walk', 'knitting island', 'puno'], 'หาซุ้มประตูหินที่มองทะลุไปเห็นทะเลสาบสีน้ำเงิน', 'Find the stone arch you can see the deep blue lake through',
    // a stone archway with a little peaked top on a dirt path along a green island ridge, the deep blue lake and snowy mountains far beyond seen through it, stone-walled terraces, a child walking under it
    sky('#B3E5FC') + P('M-4 108c40-10 200-10 248 0v40H-4z', '#1565C0', 0) + P('M-4 108l30-26 26 18 30-30 30 30 30-20 40 28z', '#ECEFF1', 3) + P('M-4 140c60-20 180-20 248 0v104H-4z', '#9CCC65', 0)
      + Lc('M-4 168c60-10 180-10 248 0M-4 196c60-10 180-10 248 0', '#A1887F', 5) + Lc('M60 244c20-40 40-70 60-90', '#D7CCC8', 18)
      + P('M70 236V110l30-30h40l30 30v126h-30v-80a20 20 0 0 0-40 0v80z', '#BCAAA4', 3.5) + P('M100 80l20-26 20 26z', '#A1887F', 3) + C(120, 52, 5, '#E0E0E0', 2)
      + Lc('M76 130h22M142 130h22M76 160h22M142 160h22M76 190h22M142 190h22', '#8D6E63', 2.5) + P('M100 236v-80a20 20 0 0 1 40 0v80z', '#64B5F6', 0) + Lc('M100 196h40', '#1565C0', 6)
      + face(120, 100, 0.3) + kid(124, 230, '#E53935', 1.2)),
  L('pe/cusco/landmark-tipon.v1.svg', 'ทางน้ำอินคาที่ตีปอน', 'The Inca water channels of Tipón', ['tipón', 'tipon', 'ตีปอน', 'inca water channels', 'ทางน้ำอินคา', 'stone fountains', 'น้ำพุหิน', 'inca terraces', 'นาขั้นบันได', 'water engineering'], 'หาน้ำที่พุ่งออกจากรางหินลงไปเป็นสายเล็กๆ', 'Find the little streams spouting out of the stone channel',
    // broad grassy terraces held up by neat grey stone walls, a stone channel running down the middle with water splashing out in four little spouts from each wall, green hills behind
    sky('#E3F2FD') + P('M-4 80c50-30 120-40 248-10v40H-4z', '#7CB342', 0)
      + [[100, 52], [140, 46], [180, 42], [220, 38]].map(([y, h], k) => R(-4, y, 248, h, k % 2 ? '#9CCC65' : '#8BC34A', 0, 0) + R(-4, y + h - 14, 248, 14, '#B0BEC5', 0, 3) + Lc(`M10 ${y + h - 7}h20M50 ${y + h - 10}h24M100 ${y + h - 7}h18M160 ${y + h - 10}h22M206 ${y + h - 7}h20`, '#78909C', 2)).join('')
      + R(110, 100, 20, 144, '#90A4AE', 0, 3) + R(114, 100, 12, 144, '#4FC3F7', 0, 0)
      + [138, 176, 214].map((y) => Lc(`M120 ${y}c8 4 10 12 10 20`, '#81D4FA', 5) + Lc(`M120 ${y}c-8 4-10 12-10 20`, '#81D4FA', 5) + C(120, y + 22, 3, '#E1F5FE', 0)).join('')
      + face(60, 170, 0.3) + kid(190, 236, '#FDD835', 1)),
  L('pe/cusco/landmark-intipunku.v1.svg', 'อินตีปุงกู ประตูพระอาทิตย์', 'Inti Punku, the Sun Gate', ['inti punku', 'intipunku', 'อินตีปุงกู', 'sun gate', 'ประตูพระอาทิตย์', 'inca trail', 'เส้นทางอินคา', 'sunrise hike', 'เดินป่าชมพระอาทิตย์ขึ้น', 'stone doorway'], 'หาพระอาทิตย์ที่ส่องผ่านประตูหิน', 'Find the sun shining through the stone doorway',
    // a stone doorway with a flat top and sloping sides standing on a mountain ridge at sunrise, the golden sun rising in the frame between far green peaks wrapped in mist, stone steps leading up, a child with a backpack
    sky('#FFE0B2') + P('M-4 160l30-50 30 20 30-40 20 30 30-30 30 40 30-40 40 50v20H-4z', '#689F38', 3) + C(120, 140, 24, '#FFCA28', 3) + Lc('M120 106v-12M96 116l-10-8M144 116l10-8', '#FFB300', 4) + P('M70 170c20-26 80-26 100 0z', '#558B2F', 3) + Lc('M10 150c30-6 60 6 90 0s60 6 90 0', '#FFFFFF', 7)
      + P('M30 244V80l20-20h140l20 20v164h-40V100H70v144z', '#B0A79C', 3.5) + Lc('M30 120h40M170 120h40M30 160h40M170 160h40M30 200h40M170 200h40', '#8D8378', 2.5) + R(46, 50, 148, 14, '#A1978C', 0, 3)
      + P('M70 244l14-14h72l14 14z', '#D7CCC8', 2.5) + P('M84 230l10-10h52l10 10z', '#CDBFB4', 2.5) + kid(120, 214, '#00897B', 1.1) + R(126, 196, 8, 14, '#E53935', 3, 2) + face(120, 116, 0.3)),
  L('pe/cusco/landmark-twelveangle.v1.svg', 'หินสิบสองมุมในตรอกฮาตุนรูมิโยก', 'The twelve-cornered stone of Hatun Rumiyoc', ['twelve-angled stone', '12 angled stone', 'หินสิบสองมุม', 'hatun rumiyoc', 'ฮาตุนรูมิโยก', 'inca wall street', 'กำแพงอินคา', 'puzzle stones', 'san blas', 'count the corners'], 'หาหินก้อนใหญ่ที่มีสิบสองมุมแล้วลองนับดู', 'Find the big stone with twelve corners and count them',
    // a narrow cobbled lane beside a wall of dark grey stones fitted like a puzzle, one huge green-grey stone in the middle with twelve corners, a child pointing and counting, a little window high above
    sky('#FFF8E1') + R(-4, -4, 248, 190, '#78909C', 0, 0) + R(170, 10, 30, 30, '#90CAF9', 2, 2.5)
      + P('M-4 40l40-10 30 14-4 40-40 6-26-6zM66 44l40-8 10 30-40 10zM116 66l30-34 50 10 10 36-60 12zM-4 90l26 6 0 50-26 4zM196 78l48-4v70l-44-6zM20 150l20 36H-4v-36zM190 140l54 4v42h-60z', '#90A4AE', 3)
      + P('M54 120l20-36 34-8 40 4 24 14 14 30-10 28-24 18-40 6-32-6-20-20z', '#7C9A8A', 4) + [[54, 120], [74, 84], [108, 76], [148, 80], [172, 94], [186, 124], [176, 152], [152, 170], [112, 176], [80, 170], [60, 150], [56, 134]].map(([x, y]) => C(x, y, 4, '#FFCA28', 2)).join('')
      + P('M-4 186h248v58H-4z', '#BCAAA4', 0) + [[20, 200], [60, 214], [100, 200], [150, 210], [200, 200], [40, 232], [130, 232], [220, 228]].map(([x, y]) => E(x, y, 14, 7, '#A1887F', 2)).join('')
      + face(120, 120, 0.4) + kid(210, 214, '#E91E63', 1.2) + Lc('M202 196l-14-14', '#FFE0BD', 4)),
  L('pe/cusco/landmark-raqchi.v1.svg', 'กำแพงดินสูงลิ่วที่รักชี', 'The giant adobe wall of Raqchi', ['raqchi', 'รักชี', 'raqchi wall', 'adobe wall', 'กำแพงอิฐดิน', 'inca ruins', 'ซากอินคา', 'round storehouses', 'cusco to puno', 'route of the sun'], 'หาหน้าต่างเล็กๆ บนกำแพงดินที่สูงที่สุด', 'Find the little windows high up in the tallest mud wall',
    // a very tall wall of reddish-brown mud bricks standing on a base of fitted grey stones, with a row of trapezoid doorways and little windows, the top capped with straw, round stone storehouses in rows on the grass, a child dwarfed beside it
    sky('#E1F5FE') + P('M-4 180c60-10 180-10 248 0v64H-4z', '#AED581', 0) + P('M-4 150c40-30 100-30 140-10s80-20 108 0v40H-4z', '#C5E1A5', 0)
      + R(60, 30, 80, 112, '#B9714A', 0, 3.5) + R(54, 140, 92, 46, '#90A4AE', 0, 3.5) + Lc('M60 150h80M66 164h70M60 176h80', '#78909C', 2) + Lc('M70 140v10M100 140v10M126 150v14M84 164v12', '#78909C', 2)
      + P('M56 30l8-10h72l8 10z', '#E6C26E', 3) + [74, 100, 126].map((x) => P(`M${x - 8} 186v-30l3-12h10l3 12v30z`, '#4E342E', 2.5)).join('') + [80, 120].map((x) => P(`M${x - 5} 96v-14l2-6h6l2 6v14z`, '#4E342E', 2)).join('')
      + Lc('M64 60h72M64 90h72M64 120h72', '#A3613C', 2) + [[176, 196], [208, 196], [192, 220]].map(([x, y]) => g(x, y, 1, E(0, 6, 14, 6, '#90A4AE', 2.5) + R(-14, -14, 28, 20, '#B0BEC5', 0, 2.5) + P('M-16-14c4-14 28-14 32 0z', '#E6C26E', 2.5))).join('')
      + face(100, 70, 0.3) + kid(30, 220, '#7E57C2', 1)),
  L('pe/cusco/landmark-titicacafrog.v1.svg', 'กบยักษ์แห่งทะเลสาบติติกากา', 'The giant Titicaca water frog', ['titicaca water frog', 'กบติติกากา', 'giant frog', 'กบยักษ์', 'lake titicaca', 'ทะเลสาบติติกากา', 'baggy skin', 'ผิวหนังย่น', 'telmatobius', 'puno wildlife'], 'หาผิวหนังย่นๆ ที่ห้อยเป็นจีบรอบตัวกบ', 'Find the baggy folds of skin hanging round the frog',
    // a big olive-green frog with loose baggy folds of skin draped round its body and legs, sitting in clear blue lake water among golden reeds, little bubbles rising, a happy grin
    sky('#B3E5FC') + P('M-4 120h248v124H-4z', '#4FC3F7', 0) + [20, 36, 200, 216, 228].map((x) => Lc(`M${x} 130v-90`, '#E6C26E', 5) + E(x, 40, 4, 12, '#A1887F', 1.5)).join('')
      + g(120, 160, 1, E(0, 10, 70, 40, '#7C8F4A', 3.5) + Lc('M-60 16c10 14 20 4 30 18s20-6 30 10 20-8 30 8 20-6 30-12', '#5E6E36', 4) + Lc('M-56 30c12 10 24 0 34 10M20 34c14 6 24 0 36-6', '#5E6E36', 3)
        + P('M-70 30c-20 10-30 30-20 40h30', '#7C8F4A', 3) + P('M70 30c20 10 30 30 20 40h-30', '#7C8F4A', 3) + E(0, -24, 50, 30, '#8BA05A', 3.5) + C(-26, -48, 12, '#8BA05A', 3) + C(26, -48, 12, '#8BA05A', 3) + C(-26, -48, 5, INK, 0) + C(26, -48, 5, INK, 0)
        + Lc('M-20-14c10 8 30 8 40 0', INK, 3) + E(-34, -18, 7, 4, '#FF8FA3', 0) + E(34, -18, 7, 4, '#FF8FA3', 0))
      + [[60, 110], [180, 100], [170, 80]].map(([x, y]) => C(x, y, 5, '#E1F5FE', 2)).join('') + Lc('M10 220h40M170 226h50', '#B3E5FC', 3)),

  // ---------- Brazil
  K('br', 'food', 'paodequeijo', 'ปาวเดเกโจ ขนมปังชีสก้อนกลม', 'Pão de queijo, cheese bread balls', ['pão de queijo', 'pao de queijo', 'ปาวเดเกโจ', 'cheese bread', 'ขนมปังชีส', 'cheese balls', 'ก้อนกลมนุ่ม', 'minas gerais', 'brazilian breakfast', 'tapioca flour'],
    // a woven basket lined with a checked cloth heaped with puffy golden cheese bread balls, one broken open on top with soft stretchy cheese inside and a wisp of steam
    P('M30 140h180l-20 70H50z', '#C68642', 3.5) + Lc('M40 162h160M46 184h148M60 140l-6 70M90 140l-2 70M120 140v70M150 140l2 70M180 140l6 70', '#A0632F', 2.5) + P('M26 140l20-20 40 22 34-26 34 26 40-22 20 20z', '#E53935', 3) + Lc('M50 126l10 10M90 132l10-8M150 132l-10-8', '#FFFFFF', 3)
      + [[70, 120], [104, 112], [138, 112], [172, 120], [88, 96], [154, 96]].map(([x, y]) => C(x, y, 22, '#F2B55A', 3) + E(x - 6, y - 8, 7, 4, '#FBD38D', 0)).join('')
      + g(120, 70, 1, P('M-22 6a22 22 0 0 1 20-28v28z', '#F2B55A', 3) + P('M24 6a22 22 0 0 0-20-28v28z', '#F2B55A', 3) + P('M-4 6c2-12 8-12 8 0', '#FFF3C4', 2) + Lc('M-2-4c-6-4 6-8 0-12M2-4c6-4-6-8 0-12', '#FFF9C4', 4) + Lc('M-6-24c-4-6 4-10 0-16', '#CFD8DC', 2.5))
      + face(120, 112, 0.34)),
  K('br', 'food', 'guarana', 'ผลกวารานา', 'Guaraná fruit', ['guaraná', 'guarana', 'กวารานา', 'amazon fruit', 'ผลไม้แอมะซอน', 'eye fruit', 'ผลไม้ตาโต', 'guaraná soda', 'น้ำอัดลมกวารานา', 'maués'],
    // a branch with a cluster of bright red guaraná pods split open, each showing white flesh with a shiny black seed so they look like big eyes, green leaves, a glass of golden fizzy drink with bubbles
    Lc('M20 40c40 20 70 40 90 80', '#6D4C41', 5) + leaf(40, 52, 0.9, 20) + leaf(70, 64, 0.8, -40, '#66BB6A')
      + [[98, 110], [126, 122], [104, 142], [134, 152], [78, 132]].map(([x, y]) => g(x, y, 1, E(0, 0, 18, 20, '#E53935', 3) + E(0, 2, 11, 13, '#FFFFFF', 2.5) + C(0, 4, 7, INK, 0) + C(-2, 1, 2, '#FFFFFF', 0))).join('')
      + P('M160 120h52l-6 96h-40z', '#FFFDE7', 3.5) + P('M164 140h44l-5 72h-34z', '#FFB300', 0) + [[176, 160], [192, 176], [182, 196], [198, 150]].map(([x, y]) => C(x, y, 3, '#FFF3C4', 1.5)).join('') + face(186, 186, 0.28) + R(156, 112, 60, 10, '#FFFDE7', 2, 3)),
  K('br', 'culture', 'festajunina', 'เฟสตาจูนินา งานรื่นเริงเดือนมิถุนายน', 'Festa Junina, the June party', ['festa junina', 'เฟสตาจูนินา', 'festa de são joão', 'june festival', 'งานเดือนมิถุนายน', 'paper flags', 'ธงกระดาษ', 'straw hat', 'หมวกฟาง', 'quadrilha'],
    // strings of little colourful paper flags criss-crossing the sky, a frayed straw hat with patches and a checked brim band, a small bonfire with corn cobs roasting beside it, a child in a checked shirt
    sky('#1A237E') + [[[-4, 20], [244, 50]], [[-4, 60], [244, 30]]].map(([[x1, y1], [x2, y2]]) => Lc(`M${x1} ${y1}Q120 ${(y1 + y2) / 2 + 30} ${x2} ${y2}`, '#FFFFFF', 2) + Array.from({ length: 8 }, (_, k) => { const t = (k + 0.5) / 8, x = x1 + (x2 - x1) * t, y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * ((y1 + y2) / 2 + 30) + t * t * y2; return P(`M${x - 8} ${y}h16v16l-8-6-8 6z`, ['#E53935', '#FDD835', '#43A047', '#1E88E5', '#FB8C00', '#EC407A'][k % 6], 2); }).join('')).join('')
      + P('M-4 190h248v54H-4z', '#6D4C41', 0) + C(170, 120, 6, '#FFF59D', 0)
      + g(70, 168, 1, E(0, 8, 54, 14, '#F2D06B', 3.5) + P('M-28 6c0-34 56-34 56 0z', '#F2D06B', 3.5) + R(-28, -4, 56, 10, '#E53935', 0, 2.5) + Lc('M-24-2h48', '#FFFFFF', 2) + R(-8, -24, 12, 10, '#1E88E5', 1, 2) + Lc('M-50 12l-6 6M46 14l8 6M-30 20l-4 8', '#C9A43A', 3))
      + g(160, 210, 1, P('M-26 0h52', 'none') + Lc('M-24 4l48-10M-24-6l48 10', '#6D4C41', 7) + P('M-14 0c-6-24 10-30 14-44 6 14 22 22 14 44z', '#FF7043', 3) + P('M-6 0c-2-12 4-16 6-24 4 8 10 12 6 24z', '#FFEB3B', 0))
      + g(214, 214, 1, E(0, 0, 8, 18, '#FFCA28', 2.5) + Lc('M-4-10v20M4-10v20', '#F9A825', 1.5), 20) + kid(108, 232, '#E53935', 1.2) + Lc('M100 222h16M108 214v16', '#FFFFFF', 2)),
  K('br', 'transport', 'jangada', 'ฌังกาดา แพใบเรือของชาวประมง', 'A jangada, the fishermen\'s sail raft', ['jangada', 'ฌังกาดา', 'sail raft', 'แพใบเรือ', 'fishing raft', 'เรือประมง', 'northeast brazil', 'ceará', 'fortaleza', 'jericoacoara'],
    // a flat raft of logs with a tall curved triangular white sail patched in colours, a little wooden bench and a steering oar, gliding on turquoise water past a beach with coconut palms and dunes
    sky('#E1F5FE') + P('M-4 150c40-20 90-20 130-4v20H-4z', '#FFE082', 0) + palm(40, 150, 60) + palm(84, 148, 44) + P('M-4 160h248v84H-4z', '#26C6DA', 0) + Lc('M20 210h40M170 226h50M90 236h40', '#B2EBF2', 3)
      + Lc('M140 190V40', '#8D6E63', 6) + P('M144 44c40 30 60 80 56 140h-56z', '#FFFFFF', 3.5) + P('M146 96c20 6 38 12 50 22l2 20h-52z', '#FFCA28', 0) + P('M146 140h54v20h-54z', '#EF5350', 0) + Lc('M144 44c40 30 60 80 56 140', INK, 3.5)
      + R(90, 190, 130, 14, '#C68642', 7, 3) + Lc('M100 197h110', '#A0632F', 2) + R(112, 178, 30, 12, '#8D6E63', 0, 2.5) + Lc('M220 196l16 30', '#8D6E63', 5) + face(156, 158, 0.3)),

  // ---------- Rio de Janeiro
  L('br/rio/landmark-arcoslapa.v1.svg', 'ซุ้มโค้งสีขาวแห่งลาปา', 'The white Lapa Arches', ['arcos da lapa', 'lapa arches', 'ซุ้มโค้งลาปา', 'carioca aqueduct', 'aqueduto da carioca', 'ท่อส่งน้ำโบราณ', 'lapa', 'ย่านลาปา', 'white arches', 'santa teresa'], 'หาซุ้มโค้งสองชั้นที่ซ้อนกันเป็นแถว', 'Find the two rows of arches, one on top of the other',
    // a long white structure with two tiers of tall round arches, the top row smaller, colourful old houses and palm trees in front, green hills behind
    sky('#E1F5FE') + P('M-4 90c40-30 100-30 140-6s80-20 108-10v60H-4z', '#81C784', 0)
      + R(-4, 70, 248, 130, '#FFFFFF', 0, 3.5) + Array.from({ length: 8 }, (_, k) => P(`M${2 + k * 30} 200v-58a12 12 0 0 1 24 0v58z`, '#B3E5FC', 3)).join('') + Array.from({ length: 12 }, (_, k) => P(`M${2 + k * 20} 128v-36a7 7 0 0 1 14 0v36z`, '#B3E5FC', 2.5)).join('') + R(-4, 64, 248, 8, '#ECEFF1', 0, 3)
      + [[20, '#FFCA28'], [60, '#EF5350'], [178, '#4DB6AC'], [214, '#BA68C8']].map(([x, c]) => R(x - 18, 180, 36, 64, c, 0, 3) + R(x - 8, 196, 16, 20, '#FFFFFF', 2, 2)).join('') + palm(120, 244, 70) + face(150, 110, 0.3)),
  L('br/rio/landmark-arpoador.v1.svg', 'ปรบมือส่งพระอาทิตย์ที่หินอาร์โปอาดอร์', 'Clapping for the sunset at Arpoador', ['arpoador', 'อาร์โปอาดอร์', 'pedra do arpoador', 'sunset clapping', 'ปรบมือให้พระอาทิตย์ตก', 'dois irmãos', 'สองพี่น้อง', 'ipanema sunset', 'พระอาทิตย์ตกอิปาเนมา', 'leblon'], 'หาเด็กที่ปรบมือตอนพระอาทิตย์ตกหลังภูเขาสองยอด', 'Find the child clapping as the sun sets behind the twin peaks',
    // a big round rock by the sea at sunset, a child sitting on it clapping, the orange sun going down behind two rounded twin peaks across the bay, the curve of Ipanema beach, waves
    sky('#FFB74D') + R(-4, -4, 248, 60, '#FF8A65', 0, 0) + C(150, 110, 24, '#FFEB3B', 3) + P('M90 140c10-60 40-60 50-20 10-50 40-50 60 20z', '#6D4C41', 3) + P('M120 120c4-30 14-36 20-20', 'none')
      + P('M-4 136h248v108H-4z', '#FF7043', 0) + Lc('M100 150h100M120 170h70M60 160h30', '#FFCA28', 3) + P('M140 136c30 4 70 8 104 4v6c-34 4-74 0-104-4z', '#FFE082', 0)
      + P('M-4 244V180c20-30 60-40 100-30 30 8 50 40 50 94z', '#8D6E63', 3.5) + Lc('M20 200c20-10 40-12 60-8', '#A1887F', 3) + kid(70, 162, '#1E88E5', 1.3) + Lc('M56 150l8-6M84 150l-8-6', '#FFE0BD', 4) + Lc('M48 138l-6-6M92 138l6-6M70 126v-8', '#FFFFFF', 2.5) + face(150, 106, 0.3)),
  L('br/rio/landmark-ilhafiscal.v1.svg', 'ปราสาทสีเขียวบนเกาะอีลยาฟิสกาล', 'The little green palace of Ilha Fiscal', ['ilha fiscal', 'อีลยาฟิสกาล', 'fiscal island palace', 'ปราสาทสีเขียว', 'guanabara bay', 'อ่าวกวานาบารา', 'gothic palace', 'last imperial ball', 'praça xv', 'island palace'], 'หาหอคอยแหลมสีเขียวอ่อนบนเกาะเล็ก', 'Find the pointed mint-green tower on the little island',
    // a small mint-green gothic palace with pointed arched windows, little spires and a tall pointed tower with a round window, on a tiny island in the blue bay linked by a little bridge, green hills behind
    sky('#E1F5FE') + P('M-4 120c40-40 90-50 140-30 30-20 70-20 108 0v40H-4z', '#81C784', 0) + P('M-4 150h248v94H-4z', '#29B6F6', 0) + Lc('M14 210h40M180 220h40', '#B3E5FC', 3)
      + E(140, 184, 90, 16, '#BCAAA4', 3) + R(76, 110, 128, 74, '#A5D6A7', 0, 3.5) + Array.from({ length: 9 }, (_, k) => P(`M${78 + k * 14} 112l6-12 6 12z`, '#80CBC4', 2)).join('') + [92, 116, 164, 188].map((x) => P(`M${x - 7} 170v-30l7-10 7 10v30z`, '#1E88E5', 2.5)).join('')
      + R(124, 56, 32, 128, '#B9E3BB', 0, 3.5) + P('M120 58l20-40 20 40z', '#4DB6AC', 3) + C(140, 82, 8, '#FFFFFF', 2.5) + P('M134 184v-26l6-10 6 10v26z', '#5D4037', 2.5) + C(140, 16, 3, '#FFCA28', 1.5)
      + Lc('M-4 186h60', '#8D6E63', 8) + Lc('M-4 186h60', '#BCAAA4', 4) + face(140, 120, 0.3)),
  L('br/rio/landmark-hanggliding.v1.svg', 'บินเครื่องร่อนลงหาดเซาคอนราโด', 'Hang gliding down to São Conrado beach', ['hang gliding', 'asa delta', 'เครื่องร่อน', 'pedra bonita', 'เปดราโบนิตา', 'são conrado', 'sao conrado', 'หาดเซาคอนราโด', 'pedra da gávea', 'tandem flight'], 'หาปีกสามเหลี่ยมสีรุ้งที่ลอยเหนือหาด', 'Find the rainbow triangle wing floating over the beach',
    // a big triangle wing striped like a rainbow carrying a pilot and a happy child in harness hanging below, flying over green forest hills with a big flat-topped rock and down to a long golden beach with waves
    sky('#B3E5FC') + P('M120 120c4-40 20-60 60-60s60 20 70 60z', '#8D8378', 3) + P('M-4 150c40-40 80-50 130-30 40-20 80-20 120 0v40H-4z', '#43A047', 3) + P('M-4 180c60-10 180-10 248 0v20H-4z', '#FFE082', 0) + P('M-4 200h248v44H-4z', '#29B6F6', 0) + Lc('M10 204c20-6 30 6 50 0s30 6 50 0 30 6 50 0 30 6 50 0', '#FFFFFF', 3)
      + g(110, 64, 1, P('M-80 20L0-20l80 40z', '#FFFFFF', 3.5) + P('M-60 10L0-20l-20 30z', '#E53935', 0) + P('M-20 10L0-20l20 30z', '#FDD835', 0) + P('M20 10L0-20l60 30z', '#1E88E5', 0) + P('M-80 20L0-20l80 40z', 'none') + Lc('M0-20v20M-30 16l30 30 30-24M0 46v4', INK, 2.5) + R(-14, 46, 28, 6, '#90A4AE', 3, 2)
        + g(-6, 70, 0.9, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#FB8C00', 2) + face(0, -18, 0.22)) + g(10, 72, 0.7, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#AB47BC', 2) + face(0, -18, 0.22)), -8)),
  L('br/rio/landmark-parquelage.v1.svg', 'สระน้ำในลานคฤหาสน์ปาร์กีลาจี', 'The pool courtyard of Parque Lage', ['parque lage', 'ปาร์กีลาจี', 'mansion courtyard', 'ลานคฤหาสน์', 'square pool', 'สระน้ำกลางลาน', 'tijuca forest', 'ป่าตีจูกา', 'jardim botânico', 'arcade columns'], 'หาสระน้ำสี่เหลี่ยมที่มีเสาเรียงรอบลาน', 'Find the square pool with columns all round the courtyard',
    // inside an old mansion courtyard: a square pool of green-blue water in the middle, rows of columns and round arches all round, cream walls, the steep green jungle mountain rising behind over the roof, a child sitting by the pool
    sky('#B3E5FC') + P('M-4 90c30-60 80-90 130-80 50 10 80 40 118 70v20H-4z', '#2E7D32', 3) + Lc('M30 70c10-6 20-4 26 0M150 50c10-6 20-4 26 0', '#66BB6A', 4)
      + R(-4, 80, 248, 16, '#BCAAA4', 0, 3) + R(-4, 96, 248, 70, '#FFF3E0', 0, 3) + Array.from({ length: 7 }, (_, k) => P(`M${6 + k * 34} 166v-50a14 14 0 0 1 28 0v50z`, '#D7CCC8', 2.5) + R(2 + k * 34, 110, 6, 56, '#FFFFFF', 0, 2)).join('')
      + P('M-4 166h248v78H-4z', '#E0D3C0', 0) + P('M40 180h160l20 50H20z', '#ECEFF1', 3) + P('M54 188h132l14 34H40z', '#4DB6AC', 3) + Lc('M70 200c10-4 20 4 30 0M140 210c10-4 20 4 30 0', '#B2DFDB', 3)
      + face(120, 130, 0.3) + kid(212, 220, '#EC407A', 1)),

  // ---------- Argentina
  K('ar', 'food', 'provoleta', 'โปรโวเลตา ชีสย่างบนเตา', 'Provoleta, cheese grilled on the parrilla', ['provoleta', 'โปรโวเลตา', 'grilled provolone', 'ชีสย่าง', 'parrilla', 'เตาย่าง', 'asado starter', 'oregano', 'ออริกาโน', 'argentine grill'],
    // a thick round slice of provolone cheese bubbling golden-brown in a little cast-iron pan, sprinkled with oregano and red chilli flakes, sitting on the bars of a grill over glowing embers
    P('M10 210c20-26 200-26 220 0v20H10z', '#5D4037', 3) + [[50, 214], [90, 210], [130, 214], [170, 210], [200, 216]].map(([x, y]) => C(x, y, 9, '#FF7043', 2)).join('') + Lc('M20 186h200M20 172h200', '#424242', 5)
      + E(120, 152, 86, 30, '#37474F', 3.5) + Lc('M200 150h34', '#37474F', 10) + E(120, 146, 72, 22, '#F8C55A', 3) + P('M60 146c4-12 116-12 120 0', '#E8A33A', 0) + [[86, 140], [112, 134], [148, 140], [130, 152], [96, 154]].map(([x, y]) => E(x, y, 8, 4, '#C9822A', 0)).join('')
      + [[80, 146], [104, 142], [140, 136], [160, 148], [118, 156]].map(([x, y]) => C(x, y, 2, '#43A047', 0) + C(x + 8, y - 4, 2, '#E53935', 0)).join('') + face(120, 140, 0.3) + Lc('M90 110c-4-10 6-14 0-24M130 104c-4-10 6-14 0-24', '#CFD8DC', 3)),
  K('ar', 'animal', 'guanaco', 'กัวนาโก', 'A guanaco', ['guanaco', 'กัวนาโก', 'wild llama', 'ลามาป่า', 'patagonian steppe', 'ทุ่งปาตาโกเนีย', 'camelid', 'chulengo', 'torres del paine', 'ruta 40'],
    // a slender guanaco with a long neck, cinnamon-brown back, white belly and legs and a grey face, standing alert on the yellow steppe with low tufts of grass and blue hills behind
    sky('#E1F5FE') + P('M-4 150c50-20 90-20 140-6s80-20 108-6v30H-4z', '#90A4AE', 0) + P('M-4 170h248v74H-4z', '#E6CF8B', 0) + [[30, 200], [70, 214], [190, 204], [214, 226]].map(([x, y]) => Lc(`M${x - 8} ${y}l4-12M${x} ${y}v-14M${x + 8} ${y}l-4-12`, '#B39250', 3)).join('')
      + [86, 104, 146, 162].map((x) => R(x - 6, 158, 12, 64, '#F5F0E6', 5, 3) + R(x - 6, 158, 12, 26, '#C68642', 0, 3)).join('')
      + E(124, 148, 58, 28, '#C68642', 3.5) + P('M78 160c24 14 72 14 96 0', '#F5F0E6', 3) + P('M66 140c-12 2-16 10-14 18', '#C68642', 3)
      + P('M162 140c-4-30 2-64 8-84h22c2 24-6 54-12 84z', '#C68642', 3.5) + P('M166 64c4-6 10-12 22-12', 'none') + E(186, 52, 20, 14, '#9E9E9E', 3) + P('M172 42l-4-16 10 10zM190 40l2-16 6 14z', '#9E9E9E', 2.5)
      + C(184, 48, 3.5, INK, 0) + E(202, 56, 3, 2, INK, 0) + E(176, 56, 5, 3, '#FF8FA3', 0) + Lc('M186 60q6 4 12 0', INK, 2.5)),
  K('ar', 'transport', 'colectivo', 'รถเมล์โกเลกติโบ', 'A colectivo, the city bus', ['colectivo', 'โกเลกติโบ', 'city bus', 'รถเมล์', 'buenos aires bus', 'รถเมล์บัวโนสไอเรส', 'painted bus', 'รถเมล์ลายวาด', 'bondi', 'sube card'],
    // a chunky red-and-cream city bus with a rounded front, big round headlights, curly painted flourishes along its side, a destination window, a smiling grille, black wheels
    P('M20 70h176c14 0 24 10 24 24v80H20z', '#E53935', 3.5) + R(20, 124, 200, 22, '#FFF3C4', 0, 3) + Lc('M40 135c10-8 20 8 30 0s20 8 30 0M140 135c10-8 20 8 30 0s20 8 30 0', '#1E88E5', 3) + C(120, 135, 6, '#FDD835', 2)
      + [32, 72, 112, 152].map((x) => R(x, 82, 32, 32, '#B3E5FC', 3, 2.5)).join('') + R(190, 82, 28, 40, '#B3E5FC', 3, 2.5) + R(26, 60, 120, 14, '#263238', 2, 2.5) + [36, 50, 64].map((x) => R(x, 64, 8, 6, '#FFCA28', 0, 0)).join('')
      + R(20, 172, 200, 12, '#9E9E9E', 3, 3) + C(206, 164, 9, '#FFF59D', 3) + face(196, 148, 0.25) + [62, 178].map((x) => C(x, 184, 18, INK, 3) + C(x, 184, 7, '#B0BEC5', 2)).join('')),
  K('ar', 'culture', 'potrero', 'เตะฟุตบอลในลานดิน', 'Street football on a dirt pitch', ['potrero', 'ลานดิน', 'street football', 'ฟุตบอลข้างถนน', 'kick-about', 'เตะบอล', 'argentine football', 'ฟุตบอลอาร์เจนตินา', 'little goal', 'picadito'],
    // a dusty dirt pitch with a goal made of two piles of jumpers and stones, a child mid-kick in a sky-blue and white striped shirt, a smiling patched leather ball flying, a dog-free fence and a tree
    sky('#E1F5FE') + P('M-4 140h248v104H-4z', '#D7B07A', 0) + Lc('M-4 150h248', '#8D6E63', 3) + Lc('M10 110v40M50 110v40M90 110v40M130 110v40M170 110v40M210 110v40M-4 124h248', '#A1887F', 3)
      + g(214, 100, 1, R(-3, 0, 6, 40, '#795548', 0, 2) + C(0, -10, 22, '#66BB6A', 3))
      + [[30, 196, '#E53935'], [94, 186, '#1E88E5']].map(([x, y, c]) => E(x, y, 14, 8, c, 2.5) + C(x + 8, y - 6, 6, '#9E9E9E', 2)).join('')
      + C(110, 80, 22, '#FFFFFF', 3.5) + P('M110 66l10 8-4 12h-12l-4-12z', INK, 0) + face(110, 82, 0.28, 'o') + Lc('M84 98l-12 10M80 86l-14 2', '#8D6E63', 2.5)
      + g(170, 196, 1, C(0, -44, 11, '#FFE0BD', 2.5) + R(-12, -32, 24, 28, '#81D4FA', 3, 2.5) + Lc('M-4-32v28M4-32v28', '#FFFFFF', 3) + Lc('M-6-4l-10 28M6-4l20 16', '#37474F', 6) + Lc('M-12-26l-14 12M12-26l14-6', '#FFE0BD', 5) + face(0, -44, 0.28))),

  // ---------- Buenos Aires and Iguazú
  L('ar/buenosaires/landmark-teatrocolon.v1.svg', 'โรงละครโกลอน', 'Inside the Teatro Colón', ['teatro colón', 'teatro colon', 'โรงละครโกลอน', 'opera house', 'โรงอุปรากร', 'red velvet seats', 'เก้าอี้กำมะหยี่แดง', 'golden balconies', 'ระเบียงสีทอง', 'giant chandelier'], 'หาโคมระย้าใหญ่ที่ห้อยลงมาจากเพดาน', 'Find the giant chandelier hanging from the ceiling',
    // a horseshoe-shaped hall with tier after tier of golden balconies, rows of red velvet seats, a red stage curtain with gold tassels on one side, a huge round chandelier sparkling from the painted dome ceiling
    sky('#4A1F1F') + P('M-4 -4h248v40c-40-14-200-14-248 0z', '#D9A441', 3) + C(120, 18, 30, '#7E57C2', 3)
      + [60, 90, 120].map((y, k) => Lc(`M-4 ${y + 10}c40 30 208 30 248 0`, '#D4A33A', 12 - k * 2) + Lc(`M-4 ${y + 10}c40 30 208 30 248 0`, '#FFE082', 3)).join('')
      + Lc('M120 36v20', '#FFCA28', 3) + C(120, 70, 20, '#FFF59D', 3) + [[-14, 82], [0, 88], [14, 82], [-20, 72], [20, 72]].map(([dx, y]) => Lc(`M${120 + dx} ${y}v8`, '#FFEB3B', 3) + C(120 + dx, y + 10, 2.5, '#FFFFFF', 0)).join('')
      + P('M-4 160h248v84H-4z', '#7F1D1D', 0) + [176, 196, 216, 236].map((y) => Array.from({ length: 10 }, (_, k) => R(-2 + k * 25, y, 20, 12, '#C62828', 5, 2)).join('')).join('')
      + P('M196 100h48v80h-48c10-20 10-60 0-80z', '#B71C1C', 3) + C(200, 140, 5, '#FFCA28', 2) + face(120, 66, 0.25)),
  L('ar/buenosaires/landmark-aguascorrientes.v1.svg', 'พระราชวังน้ำประปาที่หรูหราที่สุด', 'The Palace of Running Water', ['palacio de aguas corrientes', 'palace of running water', 'พระราชวังน้ำประปา', 'water palace', 'ถังเก็บน้ำในวัง', 'terracotta tiles', 'กระเบื้องดินเผา', 'avenida córdoba', 'balvanera', 'secret water tanks'], 'หาถังน้ำสีฟ้าที่ซ่อนอยู่ข้างในวังลายกระเบื้อง', 'Find the blue water tanks hiding inside the tiled palace',
    // a grand palace covered in glossy cream and terracotta tiles, slate mansard roofs with little round windows on the corners and middle, a cut-away window showing big blue water tanks inside, trees on the avenue
    sky('#E3F2FD') + R(20, 90, 200, 120, '#F3D9B1', 0, 3.5) + Array.from({ length: 6 }, (_, k) => Lc(`M20 ${100 + k * 18}h200`, '#C9784A', 3)).join('')
      + [[20, 46], [104, 32], [176, 46]].map(([x, w]) => P(`M${x - 4} 92l6-34h${w - 4}l6 34z`, '#546E7A', 3) + C(x + w / 2, 72, 6, '#FFF3E0', 2.5) + C(x + w / 2, 52, 3, '#FFCA28', 1.5)).join('')
      + [[40, 118], [80, 118], [160, 118], [196, 118], [40, 164], [196, 164]].map(([x, y]) => R(x - 9, y, 18, 26, '#D7CCC8', 9, 2.5)).join('')
      + R(96, 120, 52, 60, '#ECEFF1', 4, 3) + R(100, 130, 44, 46, '#4FC3F7', 0, 2.5) + Lc('M100 140h44M100 156h44', '#B3E5FC', 3) + P('M110 210v-28a12 12 0 0 1 24 0v28z', '#6D4C41', 2.5)
      + [[0, 214], [236, 214]].map(([x, y]) => C(x, y - 30, 20, '#66BB6A', 3) + R(x - 3, y - 16, 6, 30, '#795548', 0, 2)).join('') + face(122, 156, 0.3)),
  L('ar/buenosaires/landmark-barolo.v1.svg', 'ปาลาซิโอบาโรโล ตึกที่มีโดมไฟบนยอด', 'Palacio Barolo and its lantern top', ['palacio barolo', 'ปาลาซิโอบาโรโล', 'barolo palace', 'avenida de mayo', 'ถนนอเบนิดาเดมาโย', 'old skyscraper', 'ตึกสูงเก่า', 'lantern dome', 'โดมแก้วบนยอด', 'rooftop view'], 'หาโดมแก้วที่ส่องแสงอยู่บนยอดตึก', 'Find the glowing glass dome on top of the tower',
    // a tall cream ornate office tower with rows of windows, a wide base with arches, rising in stepped tiers to a slim domed top crowned by a small glowing glass lantern, evening sky, lower buildings either side
    sky('#5C6BC0') + C(40, 40, 3, '#FFFFFF', 0) + C(200, 26, 2.5, '#FFFFFF', 0) + C(180, 70, 2, '#FFFFFF', 0)
      + R(-4, 150, 64, 94, '#8C7AA9', 0, 3) + R(180, 140, 64, 104, '#9C8DB8', 0, 3)
      + R(70, 120, 100, 124, '#F3E5C8', 0, 3.5) + R(84, 80, 72, 42, '#F3E5C8', 0, 3) + R(96, 54, 48, 28, '#EAD9B6', 0, 3) + P('M100 56c0-28 40-28 40 0z', '#B0A48A', 3) + R(110, 18, 20, 16, '#FFF59D', 4, 3) + P('M108 20l12-12 12 12z', '#B0A48A', 2.5) + Lc('M104 26l-10-4M136 26l10-4M120 4v-4', '#FFF59D', 3)
      + [130, 152, 174, 196].map((y) => [82, 102, 122, 142, 158].map((x) => R(x, y, 10, 14, '#FFE082', 2, 2)).join('')).join('') + [90, 110, 130].map((x) => R(x + 2, 88, 10, 14, '#FFE082', 2, 2)).join('')
      + [82, 112, 142].map((x) => P(`M${x} 244v-20a8 8 0 0 1 16 0v20z`, '#6D4C41', 2.5)).join('') + face(120, 64, 0.24)),
  L('ar/buenosaires/landmark-transbordador.v1.svg', 'สะพานเหล็กนิโกลัสอาเบยาเนดาในลาโบกา', 'The old transporter bridge of La Boca', ['puente transbordador', 'transporter bridge', 'สะพานทรานส์บอร์ดาดอร์', 'nicolás avellaneda', 'riachuelo', 'แม่น้ำริอาชูเอโล', 'la boca bridge', 'สะพานเหล็กเขียว', 'vuelta de rocha', 'iron bridge'], 'หากระเช้าแบนๆ ที่ห้อยจากสะพานเหล็ก', 'Find the flat platform hanging from the iron bridge',
    // a tall dark green iron bridge like a giant gate over a river, two lattice towers joined by a high latticed beam, a flat platform hanging by cables just above the water to carry people across, colourful tin houses on the bank
    sky('#FFE0B2') + P('M-4 190h248v54H-4z', '#5D8C8A', 0) + Lc('M20 210h30M170 226h40', '#B2DFDB', 3)
      + [40, 200].map((x) => P(`M${x - 18} 196l10-170h16l10 170z`, '#2E7D32', 3.5) + Lc(`M${x - 14} 180l24-30M${x - 12} 150l20-30M${x - 10} 120l18-30M${x - 8} 90l16-30M${x - 6} 60l12-26`, '#A5D6A7', 2.5)).join('')
      + R(20, 26, 200, 26, '#2E7D32', 0, 3.5) + Lc('M30 50l20-20 20 20 20-20 20 20 20-20 20 20 20-20 20 20 20-20', '#A5D6A7', 2.5)
      + Lc('M104 52v120M136 52v120', INK, 2.5) + R(92, 170, 56, 10, '#FFCA28', 2, 3) + R(98, 158, 44, 12, '#ECEFF1', 2, 2.5) + kid(120, 168, '#E53935', 0.8)
      + [[-4, '#FDD835'], [24, '#1E88E5'], [212, '#EF5350']].map(([x, c]) => R(x, 168, 28, 26, c, 0, 2.5) + P(`M${x - 2} 168l16-10 16 10z`, '#90A4AE', 2)).join('') + face(120, 38, 0.24)),
  L('ar/buenosaires/landmark-jacarandas.v1.svg', 'ถนนสายต้นจาคารันดาสีม่วง', 'The purple jacaranda streets in spring', ['jacaranda', 'jacarandá', 'จาคารันดา', 'purple trees', 'ต้นไม้ดอกม่วง', 'spring in november', 'ฤดูใบไม้ผลิ', 'palermo streets', 'purple petals', 'avenida'], 'หากลีบดอกสีม่วงที่ร่วงเต็มทางเท้า', 'Find the purple petals carpeting the pavement',
    // a wide avenue lined with big round jacaranda trees covered in lilac-purple flowers, purple petals falling and carpeting the pavement, old cream buildings with balconies behind, a child catching petals
    sky('#E3F2FD') + R(-4, 60, 248, 120, '#F3E5C8', 0, 3) + Array.from({ length: 6 }, (_, k) => R(8 + k * 40, 80, 20, 26, '#90CAF9', 2, 2) + Lc(`M${4 + k * 40} 112h28`, INK, 2.5)).join('')
      + P('M-4 180h248v64H-4z', '#CFD8DC', 0) + Lc('M-4 200h248', '#B0BEC5', 3)
      + [[40, 120], [130, 110], [214, 124]].map(([x, y]) => R(x - 5, y, 10, 72, '#6D4C41', 0, 3) + C(x - 24, y - 4, 26, '#B39DDB', 3) + C(x + 22, y - 6, 26, '#B39DDB', 3) + C(x, y - 26, 30, '#9575CD', 3) + [[-24, -10], [14, -30], [24, 0], [-8, -4]].map(([a, b]) => C(x + a, y + b, 4, '#E1BEE7', 0)).join('')).join('')
      + [[20, 220], [60, 214], [90, 232], [150, 226], [190, 216], [226, 236], [110, 210], [80, 160], [170, 150], [100, 140]].map(([x, y]) => E(x, y, 4, 2.5, '#9575CD', 1)).join('')
      + kid(170, 230, '#FFCA28', 1.2) + face(130, 86, 0.3)),
  L('ar/buenosaires/landmark-iguazutrain.v1.svg', 'รถไฟเล็กในป่าอีกวาซู', 'The little jungle train of Iguazú', ['tren ecológico de la selva', 'jungle train', 'รถไฟในป่า', 'iguazú train', 'รถไฟอีกวาซู', 'estación cataratas', 'garganta station', 'open carriages', 'ตู้โดยสารเปิดโล่ง', 'iguazú national park'], 'หาตู้รถไฟเปิดโล่งที่มีเด็กโบกมืออยู่', 'Find the open carriage with a child waving',
    // a little green engine pulling two open-sided carriages with striped roofs along narrow tracks through thick rainforest, huge leaves and ferns on both sides, a child waving from a carriage, a wisp of mist from the falls far ahead
    sky('#C8E6C9') + C(200, 40, 30, '#E8F5E9', 0) + C(224, 54, 22, '#FFFFFF', 0) + P('M-4 40c20-30 60-30 80 0 20-30 50-30 70 0v60H-4z', '#2E7D32', 0)
      + P('M-4 180h248v64H-4z', '#7CB342', 0) + Lc('M-4 206h248M-4 222h248', '#6D4C41', 4) + Lc('M10 200v28M40 200v28M70 200v28M100 200v28M130 200v28M160 200v28M190 200v28M220 200v28', '#8D6E63', 4)
      + [[30, '#FFCA28'], [100, '#EF5350']].map(([x, c]) => R(x - 30, 160, 62, 40, '#ECEFF1', 3, 3) + R(x - 34, 140, 70, 10, c, 2, 3) + Lc(`M${x - 28} 150v12M${x + 30} 150v12`, INK, 3) + C(x - 16, 202, 7, INK, 0) + C(x + 16, 202, 7, INK, 0)).join('')
      + kid(110, 172, '#1E88E5', 1) + Lc('M118 156l8-10', '#FFE0BD', 4) + kid(20, 172, '#AB47BC', 0.9)
      + g(168, 180, 1, R(-30, -20, 60, 40, '#43A047', 6, 3) + R(-26, -46, 30, 28, '#43A047', 3, 3) + R(-22, -40, 22, 14, '#B3E5FC', 2, 2) + R(14, -40, 10, 22, '#37474F', 2, 2.5) + C(30, 0, 6, '#FFF59D', 2) + C(-14, 22, 9, INK, 0) + C(14, 22, 9, INK, 0) + face(4, -2, 0.26))
      + leaf(210, 150, 1, -60, '#388E3C') + leaf(236, 120, 1.1, -150, '#43A047') + leaf(-4, 110, 1, 10, '#388E3C')),

  // ---------- Patagonia and Península Valdés
  L('ar/patagonia/landmark-elephantseal.v1.svg', 'แมวน้ำช้างบนหาดคาบสมุทรบัลเดส', 'Elephant seals on a Valdés beach', ['elephant seal', 'แมวน้ำช้าง', 'elefante marino', 'punta delgada', 'ปุนตาเดลกาดา', 'península valdés', 'คาบสมุทรบัลเดส', 'seal pup', 'ลูกแมวน้ำ', 'wildlife beach'], 'หาจมูกห้อยยาวเหมือนงวงช้างของแมวน้ำตัวใหญ่', 'Find the big seal\'s droopy nose like a little trunk',
    // a huge grey-brown elephant seal lying on a pebble beach lifting its head, its droopy trunk-like nose hanging down, a small round dark pup snuggled beside it, low cliffs and the sea behind
    sky('#E1F5FE') + P('M-4 100c40-10 60 4 90 0s80-14 154 0v40H-4z', '#D7B899', 3) + P('M-4 130h248v40H-4z', '#4FC3F7', 0) + P('M-4 160c80-10 180-10 248 0v84H-4z', '#D7CCC8', 0)
      + [[20, 220], [60, 236], [200, 226], [226, 210], [180, 238]].map(([x, y]) => E(x, y, 8, 5, '#BCAAA4', 2)).join('')
      + P('M30 214c0-34 40-50 90-50 30 0 50-20 60-40 18 0 30 14 26 34-4 24-20 40-50 56z', '#8D8378', 3.5) + Lc('M70 190c10 8 30 10 50 6', '#A1978C', 3) + E(70, 214, 14, 6, '#796F66', 2.5)
      + P('M200 156c8 10 10 26 4 40-4-6-10-10-10-20', '#6E655D', 3) + C(184, 136, 3.5, INK, 0) + C(196, 140, 3.5, INK, 0) + E(176, 150, 6, 4, '#FF8FA3', 0)
      + g(140, 214, 1, E(0, 0, 24, 14, '#4E4741', 3) + C(16, -6, 3, '#FFFFFF', 0) + C(16, -6, 2, INK, 0) + C(4, -6, 2, INK, 0))),
  L('ar/patagonia/landmark-gaiman.v1.svg', 'ชายามบ่ายแบบเวลส์ที่ไกมาน', 'A Welsh tea in Gaiman', ['gaiman', 'ไกมาน', 'welsh tea', 'ชาแบบเวลส์', 'té galés', 'torta negra', 'เค้กผลไม้สีเข้ม', 'chubut valley', 'trelew', 'tea house'], 'หาเค้กผลไม้สีเข้มที่หั่นเป็นชิ้นบนจาน', 'Find the slice of dark fruit cake on the plate',
    // a table with a lace cloth set for tea: a round flowery teapot, a tall plate stand piled with scones, little tarts and a dark fruit cake with a slice cut, a jar of red jam, a cottage window with lace curtains and roses behind
    sky('#FFF3E0') + R(70, 10, 100, 74, '#B3E5FC', 0, 3) + P('M70 10h30c-6 30-6 50 0 74H70zM170 10h-30c6 30 6 50 0 74h30z', '#FFFFFF', 2.5) + [[56, 60], [184, 60], [58, 30]].map(([x, y]) => C(x, y, 9, '#EC407A', 2.5)).join('')
      + P('M-4 130h248v114H-4z', '#FFFFFF', 0) + Lc('M-4 134c10 10 20 0 30 10s20-10 30 0 20-10 30 0 20-10 30 0 20-10 30 0 20-10 30 0 20-10 30 0 20-10 30 0', '#E0E0E0', 3)
      + g(64, 168, 1, E(0, 0, 36, 32, '#E1F5FE', 3.5) + P('M-14-30c4-10 24-10 28 0z', '#E1F5FE', 3) + C(0, -36, 5, '#90CAF9', 2) + Lc('M34-6c16-6 20-20 22-30', '#E1F5FE', 7) + Lc('M-34-8c-14-2-16 12-8 16', '#E1F5FE', 6) + C(-10, -6, 6, '#F48FB1', 1.5) + C(14, 8, 6, '#F48FB1', 1.5) + face(0, 4, 0.3))
      + Lc('M156 110v100', '#B0BEC5', 4) + E(156, 210, 40, 6, '#ECEFF1', 3) + E(156, 160, 40, 6, '#ECEFF1', 3) + E(156, 112, 30, 5, '#ECEFF1', 3)
      + [136, 156, 176].map((x) => E(x, 148, 10, 10, '#F2C47A', 2.5) + R(x - 9, 146, 18, 3, '#E53935', 0, 0)).join('') + [140, 172].map((x) => P(`M${x - 8} 104h16v-6h-16z`, '#5D4037', 2) + C(x, 98, 4, '#E53935', 1.5)).join('')
      + P('M126 206v-30h56v30z', '#4E342E', 3) + P('M182 176l20 10v24l-20-4z', '#3E2723', 3) + [[136, 188], [150, 194], [166, 186], [190, 196]].map(([x, y]) => C(x, y, 2.5, '#FFCA28', 0)).join('') + face(154, 192, 0.24)
      + g(214, 216, 1, R(-14, -20, 28, 26, '#C62828', 4, 3) + R(-16, -26, 32, 8, '#FFFFFF', 3, 2.5))),
  L('ar/patagonia/landmark-mara.v1.svg', 'มารา กระต่ายขายาวแห่งปาตาโกเนีย', 'A Patagonian mara', ['patagonian mara', 'mara', 'มารา', 'patagonian cavy', 'กระต่ายปาตาโกเนีย', 'liebre patagónica', 'long legs', 'ขายาว', 'valdés wildlife', 'steppe animal'], 'หาก้นสีขาวของสัตว์ขายาวที่เหมือนกระต่ายผสมกวาง', 'Find the white bottom of the long-legged animal that looks like a rabbit and a deer',
    // a mara sitting up on long thin legs like a cross between a rabbit and a small deer: grey-brown back, a white patch on its bottom, round ears, big eyes, a baby mara peeping from a burrow in the dry steppe
    sky('#FFF8E1') + P('M-4 160c60-14 180-14 248 0v84H-4z', '#E6CF8B', 0) + [[20, 190], [200, 196], [226, 220]].map(([x, y]) => Lc(`M${x - 8} ${y}l4-12M${x} ${y}v-14M${x + 8} ${y}l-4-12`, '#A1887F', 3)).join('')
      + g(110, 140, 1, Lc('M-24 30v54M-10 30v54M24 34v50M34 30v54', '#9E8467', 7) + E(0, 10, 44, 30, '#A08A70', 3.5) + E(-34, 18, 16, 14, '#FFFFFF', 3) + E(4, 26, 30, 10, '#F5F0E6', 0)
        + C(40, -18, 22, '#A08A70', 3.5) + E(28, -44, 8, 14, '#A08A70', 3) + E(50, -44, 8, 14, '#A08A70', 3) + E(28, -44, 4, 8, '#F8BBD0', 0) + E(50, -44, 4, 8, '#F8BBD0', 0) + E(58, -14, 6, 4, INK, 0) + face(42, -18, 0.3, 'none'))
      + g(200, 168, 1, E(0, 10, 26, 12, '#6D4C41', 3) + C(0, 0, 12, '#A08A70', 3) + E(-8, -12, 4, 7, '#A08A70', 2.5) + E(8, -12, 4, 7, '#A08A70', 2.5) + face(0, 0, 0.18, 'none'))),
  L('ar/patagonia/landmark-civiccentre.v1.svg', 'ลานศูนย์กลางเมืองบาริโลเช', 'Bariloche\'s stone and log civic centre', ['centro cívico', 'civic centre bariloche', 'ศูนย์กลางเมืองบาริโลเช', 'san carlos de bariloche', 'stone and timber', 'อาคารหินและไม้ซุง', 'alpine style', 'nahuel huapi', 'ทะเลสาบนาอวยลวาปี', 'main square'], 'หาระเบียงไม้ซุงบนตึกหินสีเทา', 'Find the log balconies on the grey stone buildings',
    // a square framed by grey-green stone buildings with dark log beams, wooden balconies and steep slate roofs, a slim stone tower with a pointed roof, a deep blue lake and snowy mountains behind, a child on the paving
    sky('#BBDEFB') + P('M-4 70l40-30 30 20 40-40 40 34 40-24 58 40v20H-4z', '#ECEFF1', 3) + P('M-4 76h248v30H-4z', '#1565C0', 0)
      + [[-4, 60], [170, 74]].map(([x, w]) => R(x, 120, w, 90, '#90A4AE', 0, 3.5) + P(`M${x - 4} 122l${w / 2 + 4}-30 ${w / 2 + 4} 30z`, '#455A64', 3) + Lc(`M${x} 150h${w}M${x} 180h${w}`, '#5D4037', 5) + R(x + 10, 128, 16, 18, '#FFE082', 2, 2) + R(x + w - 26, 156, 16, 18, '#FFE082', 2, 2)).join('')
      + R(96, 52, 30, 158, '#90A4AE', 0, 3.5) + P('M90 54l21-40 21 40z', '#455A64', 3) + R(104, 70, 14, 20, '#5D4037', 0, 2) + Lc('M96 120h30M96 150h30', '#5D4037', 4)
      + R(126, 130, 44, 80, '#A7B6BE', 0, 3) + R(126, 150, 44, 8, '#6D4C41', 0, 2.5) + Lc('M130 158v14M140 158v14M150 158v14M160 158v14', '#6D4C41', 3)
      + P('M-4 210h248v34H-4z', '#D7CCC8', 0) + Lc('M20 226h40M100 232h40M170 224h50', '#BCAAA4', 3) + kid(60, 236, '#E53935', 1.1) + face(111, 104, 0.24)),
  L('ar/patagonia/landmark-lupins.v1.svg', 'ดอกลูพินริมทะเลสาบนาอวยลวาปี', 'Lupins by Lake Nahuel Huapi', ['lupins', 'lupines', 'ดอกลูพิน', 'chochos', 'nahuel huapi', 'ทะเลสาบนาอวยลวาปี', 'circuito chico', 'วงรอบชิโก', 'spring flowers', 'villa la angostura'], 'หาดอกไม้ช่อยาวสีม่วงและชมพูริมทะเลสาบ', 'Find the tall purple and pink flower spikes by the lake',
    // tall spikes of purple, pink and lilac lupin flowers with fan-shaped leaves crowding the shore of a deep blue lake, forested hills and snowy peaks across the water
    sky('#B3E5FC') + P('M-4 90l30-30 30 20 40-40 40 30 40-30 40 30 28-10v40H-4z', '#ECEFF1', 3) + P('M-4 96c40-14 100-14 140 0s80-14 108 0v20H-4z', '#2E7D32', 0) + P('M-4 112h248v50H-4z', '#1565C0', 0) + Lc('M20 130h40M150 140h50', '#64B5F6', 3)
      + P('M-4 156c60-10 180-10 248 0v88H-4z', '#7CB342', 0)
      + [[22, 170, '#7E57C2'], [52, 160, '#EC407A'], [84, 174, '#BA68C8'], [118, 160, '#7E57C2'], [150, 172, '#F48FB1'], [182, 162, '#9575CD'], [214, 174, '#EC407A']].map(([x, y, c]) => Lc(`M${x} ${y + 60}V${y}`, '#558B2F', 4) + P(`M${x} ${y - 40}c8 10 10 30 8 44h-16c-2-14 0-34 8-44z`, c, 2.5) + Lc(`M${x - 6} ${y - 20}h12M${x - 7} ${y - 6}h14`, 'rgba(255,255,255,.5)', 2.5) + Lc(`M${x} ${y + 40}l-12-8M${x} ${y + 40}l12-8M${x} ${y + 40}v-12`, '#33691E', 3)).join('')
      + face(118, 140, 0.26)),
  L('ar/patagonia/landmark-curanto.v1.svg', 'กุรันโต อาหารอบใต้หินร้อน', 'Curanto, a feast cooked under hot stones', ['curanto', 'กุรันโต', 'earth oven', 'เตาใต้ดิน', 'hot stones', 'หินร้อน', 'colonia suiza', 'โกโลเนียซุยซา', 'bariloche feast', 'cooked under leaves'], 'หาไอน้ำที่ลอยขึ้นจากกองใบไม้ใหญ่บนพื้น', 'Find the steam rising from the big pile of leaves on the ground',
    // a round pit in the ground with a mound of big green leaves and a cloth on top puffing out steam, round hot stones glowing at the edge, beside it a wooden board with corn cobs, potatoes and sausages that came out of it
    sky('#E8F5E9') + P('M-4 130c60-14 180-14 248 0v114H-4z', '#A1887F', 0) + E(90, 170, 80, 26, '#5D4037', 3)
      + [[24, 168], [40, 186], [70, 194], [110, 194], [140, 186], [158, 170], [30, 152], [150, 152]].map(([x, y]) => C(x, y, 9, '#9E9E9E', 2.5) + C(x - 2, y - 2, 3, '#FF7043', 0)).join('')
      + P('M30 168c0-40 120-40 120 0z', '#388E3C', 3.5) + [[50, 150, -30], [90, 136, 0], [126, 150, 30]].map(([x, y, r]) => g(x, y, 1, P('M-22 0c6-16 38-16 44 0-6 10-38 10-44 0z', '#66BB6A', 2.5) + Lc('M-18 0h36', '#2E7D32', 2), r)).join('') + P('M66 130c4-10 44-10 48 0', '#BCAAA4', 3)
      + Lc('M70 116c-6-10 6-14 0-26M90 110c-6-10 6-14 0-26M110 116c-6-10 6-14 0-26', '#ECEFF1', 4) + face(90, 156, 0.3)
      + g(194, 206, 1, R(-40, -16, 80, 32, '#C68642', 6, 3) + E(-20, -6, 16, 7, '#FDD835', 2.5) + C(6, -4, 8, '#D7B899', 2.5) + C(22, 4, 7, '#D7B899', 2.5) + R(-28, 2, 32, 9, '#B23A2A', 4, 2.5))),
];

export default { places: {}, items };
