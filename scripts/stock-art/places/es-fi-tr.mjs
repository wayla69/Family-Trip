// Spain (Barcelona), Finland (the Lapland day), Turkey (Istanbul, Cappadocia) — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const ES = { k1: '#C62828', k2: '#F9A825', k3: '#FFF8E1' };
const BC = { k1: '#1565C0', k2: '#E65100', k3: '#E3F2FD' };
const FI = { k1: '#1565C0', k2: '#0D47A1', k3: '#E3F2FD' };
const LP = { k1: '#C62828', k2: '#2E7D32', k3: '#FFEBEE' };
const TR = { k1: '#C62828', k2: '#00838F', k3: '#FFEBEE' };
const IS = { k1: '#283593', k2: '#C62828', k3: '#E8EAF6' };
const CP = { k1: '#E65100', k2: '#6D4C41', k3: '#FFF3E0' };
// a glowing aurora band
const aurora = (c1, c2) => Lc('M-4 60c40-30 80 20 120-10s80 10 128-20', c1, 14) + Lc('M-4 84c50-20 90 20 130-6s80 6 118-14', c2, 9);

const items = [
  // ---------- Spain
  { id: 'es.stamp', cat: 'stamp', file: 'es/stamp.v1.svg', name: nm('ตราประทับสเปน', 'Spain stamp'), kw: ['spain', 'สเปน', 'españa'],
    // a flamenco fan open, red with yellow dots, a carnation on the handle
    svg: countryStamp({ name: 'ESPAÑA', ...ES, emblem: P('M100 130L54 84c20-34 72-34 92 0z', '#C62828', 3) + Array.from({ length: 6 }, (_, i) => Lc(`M100 130L${(62 + i * 15).toFixed(1)} ${(80 - Math.sin((i / 5) * Math.PI) * 12).toFixed(1)}`, '#B71C1C', 2)).join('') + [[78, 90], [100, 78], [122, 90]].map(([x, y]) => C(x, y, 4, '#FFD54A', 2)).join('') + C(100, 132, 7, '#F48FB1', 2.5) }) },
  { id: 'es.flag', ch: '🇪🇸', cat: 'flag', file: 'es/flag.v1.svg', name: nm('ธงสเปน', 'Flag of Spain'), kw: ['spain', 'สเปน', 'flag', 'ธง'],
    // red, a wide yellow band (drawn without the coat of arms, as on everyday civil flags)
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#AA151B') + P('M44 66c40-12 84 12 126 0s28-4 42 0v56c-14-4 0-12-42 0s-86-12-126 0z', '#F1BF00')) },
  { id: 'es.hello', cat: 'hello', file: 'es/hello.v1.svg', name: nm('โอลา สวัสดี', 'Hola, hello'), kw: ['hola', 'โอลา', 'hello', 'สวัสดี', 'flamenco', 'ฟลาเมงโก', 'dance'],
    // a child dancing in a polka-dot flamenco dress with tiered ruffles, a flower in the hair, one arm raised
    svg: free(P('M70 214c4-30 10-46 20-56h60c10 10 16 26 20 56z', '#E53935') + Lc('M74 190c16 8 32-8 46 0s30 8 46 0M70 210c18 8 36-8 50 0s32 8 50 0', '#B71C1C', 5) + [[90, 176], [130, 180], [110, 200], [150, 200]].map(([x, y]) => C(x, y, 4, '#FFFFFF', 0)).join('')
      + P('M92 158c0-24 12-38 28-38s28 14 28 38z', '#E53935') + C(120, 90, 32, '#FFE0BD') + P('M88 84c0-26 16-38 32-38s32 12 32 38c-6-10-18-16-32-16s-26 6-32 16z', '#3E2723') + C(150, 56, 9, '#F48FB1', 3)
      + P('M150 130c14-18 22-42 18-62l14-2c6 26-2 52-18 70z', '#FFE0BD') + C(176, 64, 11, '#FFE0BD') + face(120, 96, 0.6)) },
  { id: 'es.food.paella', cat: 'food', file: 'es/food-paella.v1.svg', name: nm('ปาเอญ่า', 'Paella'), kw: ['paella', 'ปาเอญ่า', 'paella pan', 'seafood rice', 'ข้าวผัดอาหารทะเล', 'valencia', 'บาเลนเซีย'], colour: true,
    // a wide shallow pan with two handles: saffron-yellow rice, prawns, mussels, peas, lemon wedges, red pepper strips
    svg: free(Lc('M10 130h20M210 130h20', INK, 9) + E(120, 130, 96, 50, '#455A64') + E(120, 126, 84, 40, '#FBC02D') + [[80, 110], [150, 116], [110, 146]].map(([x, y]) => P(`M${x - 14} ${y}c0-14 28-14 28 0-4 10-24 10-28 0z`, '#FF7043', 3)).join('')
      + [[130, 98], [70, 140], [170, 140]].map(([x, y]) => E(x, y, 12, 7, INK) + E(x, y, 8, 4, '#FF8A65', 0)).join('') + [[96, 126], [146, 136], [120, 108]].map(([x, y]) => C(x, y, 4, '#7CB342', 2.5)).join('') + P('M180 104l20-10 4 14z', '#FFF176', 3) + face(112, 124, 0.55)) },
  { id: 'es.food.churros', cat: 'food', file: 'es/food-churros.v1.svg', name: nm('ชูร์โรสจิ้มช็อกโกแลต', 'Churros and hot chocolate'), kw: ['churros', 'ชูร์โรส', 'chocolate con churros', 'hot chocolate', 'ช็อกโกแลตร้อน', 'san gines', 'breakfast'], colour: true,
    // ridged golden churros sprinkled with sugar, one dipping into a cup of thick hot chocolate
    svg: free(P('M130 150h80c0 40-20 60-40 60s-40-20-40-60z', '#FFFFFF') + E(170, 150, 40, 10, '#4E342E') + Lc('M210 160c16 0 16 24 0 24', INK, 5)
      + [[60, 120, -30], [86, 130, -20], [112, 120, -40]].map(([x, y, r]) => g(x, y, 1, R(-14, -60, 28, 120, '#E9A64C', 14) + Lc('M-6-50v100M6-50v100', '#C8862F', 3) + [-30, 0, 30].map((dy) => C(-2, dy, 2.5, '#FFFFFF', 0)).join(''), r)).join('') + face(170, 182, 0.55)) },
  { id: 'es.food.tapas', cat: 'food', file: 'es/food-tapas.v1.svg', name: nm('ทาปาส', 'Tapas'), kw: ['tapas', 'ทาปาส', 'patatas bravas', 'tortilla', 'ตอร์ติยา', 'croquetas', 'pintxos'], colour: true,
    // three little clay dishes: patatas bravas with red sauce, a wedge of Spanish omelette, golden croquettes
    svg: free([[64, 120], [176, 120], [120, 180]].map(([x, y]) => E(x, y + 8, 50, 20, '#BF6B3C') + E(x, y, 44, 16, '#D88A5A')).join('')
      + [[50, 110], [70, 106], [64, 120], [80, 116]].map(([x, y]) => R(x - 7, y - 7, 14, 14, '#FFD54A', 3, 3)).join('') + Lc('M48 110c10 4 30 4 40 0', '#E53935', 4)
      + P('M150 124l26-26 26 26z', '#FFE082') + Lc('M160 118l8-6M178 116l8-4', '#81C784', 3) + [[104, 176], [126, 172], [146, 178]].map(([x, y]) => E(x, y, 12, 8, '#E9A64C')).join('') + face(120, 186, 0.45)) },
  { id: 'es.animal.bull', cat: 'animal', file: 'es/animal-bull.v1.svg', name: nm('วัวกระทิงสเปน', 'Spanish bull'), kw: ['bull', 'วัวกระทิง', 'toro', 'osborne bull', 'วัวกระทิงริมทาง', 'countryside'], colour: true,
    // a friendly round black bull with pale curved horns, a pink nose ring-free snout, a flower behind one ear
    svg: free(E(130, 160, 70, 38, INK) + [[90, 186], [170, 186]].map(([x, y]) => R(x - 9, y, 18, 28, INK, 6)).join('') + P('M196 150c14 6 20 20 14 30', 'none', 5) + C(80, 110, 42, INK) + P('M40 92c-20-6-28-26-20-38 8 10 18 18 30 20zM120 92c20-6 28-26 20-38-8 10-18 18-30 20z', '#FFF8E1')
      + E(80, 134, 26, 18, '#F48FB1') + E(72, 134, 4, 5, INK) + E(88, 134, 4, 5, INK) + C(116, 76, 8, '#FFCA28', 3) + face(80, 108, 0.6).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFDF7" stroke="none"')) },
  { id: 'es.transport.cablecar', cat: 'transport', file: 'es/transport-cablecar.v1.svg', name: nm('กระเช้ามงต์จูอิก', 'Montjuïc cable car'), kw: ['montjuic', 'มงต์จูอิก', 'cable car', 'กระเช้า', 'telefèric', 'teleferic', 'port cable car'], colour: true,
    // a little round red gondola on a single wire over the harbour, sailboats below
    svg: free(Lc('M4 50l232 40', INK, 4) + Lc('M120 72v20', INK, 5) + C(120, 130, 40, '#E53935') + E(120, 124, 28, 18, '#B3E5FC') + Lc('M84 150h72', '#B71C1C', 4)
      + P('M10 210c40-6 80-6 110 0s70 6 110 0v14H10z', '#4FC3F7') + [[50, 200], [190, 196]].map(([x, y]) => P(`M${x - 16} ${y}h32l-6 8h-20z`, '#FFFFFF', 3) + P(`M${x} ${y - 4}v-26l14 26z`, '#FFFFFF', 3)).join('') + face(120, 126, 0.5)) },
  { id: 'es.culture.guitar', ch: '🎸', cat: 'culture', file: 'es/culture-guitar.v1.svg', name: nm('กีตาร์สแปนิช', 'Spanish guitar'), kw: ['spanish guitar', 'กีตาร์สแปนิช', 'flamenco guitar', 'กีตาร์ฟลาเมงโก', 'music', 'ดนตรี'], colour: true,
    // a classical guitar: a curvy honey body with a rosette round the sound hole, a long neck and tuning pegs
    svg: free(g(120, 120, 1, P('M0-6c26 0 36 20 26 36 22 8 26 44 0 58-14 8-38 8-52 0-26-14-22-50 0-58-10-16 0-36 26-36z', '#E9A64C') + C(0, 34, 14, INK) + C(0, 34, 18, 'none', 3) + R(-6, -100, 12, 96, '#6D4C41', 2) + R(-10, -120, 20, 24, '#6D4C41', 4) + Lc('M-2-100v188M2-100v188', '#ECEFF1', 1.2) + R(-14, 70, 28, 8, '#4E342E', 2, 3), 30) + face(110, 160, 0.5)) },
  // Barcelona
  { id: 'es-barcelona.stamp', cat: 'stamp', file: 'es/barcelona/stamp.v1.svg', name: nm('ตราประทับบาร์เซโลนา', 'Barcelona stamp'), kw: ['barcelona', 'บาร์เซโลนา'],
    // the mosaic lizard of Park Güell
    svg: cityStamp('ebc-st', { name: 'BARCELONA', sub: 'CATALUNYA', ...BC, emblem: P('M60 124c10-30 30-40 50-36 20 4 30-6 40-20-2 20-10 34-30 40-16 6-20 20-40 26z', '#4DB6AC', 3) + [[80, 108, '#FFCA28'], [100, 100, '#E53935'], [120, 96, '#1E88E5'], [90, 118, '#FF7043']].map(([x, y, c]) => R(x - 4, y - 4, 8, 8, c, 1, 1.5)).join('') + C(140, 72, 3, INK, 0) }) },
  { id: 'es-barcelona.day.parkguell', cat: 'day', file: 'es/barcelona/day-parkguell.v1.svg', name: nm('ปาร์กเกวลล์', 'Park Güell'), kw: ['park guell', 'park güell', 'ปาร์กเกวลล์', 'gaudi', 'เกาดี', 'mosaic bench', 'ม้านั่งโมเสก', 'gingerbread houses'],
    // the wavy mosaic bench over the terrace, the two gingerbread gatehouses with their swirly roofs, the city and sea beyond
    svg: scene('ebc-d1', '#E1F5FE', P('M-4 90h248v30H-4z', '#4FC3F7') + [[30, 100], [80, 90], [150, 96], [200, 92]].map(([x, y]) => R(x, y - 20, 20, 30, '#ECEFF1', 0, 3)).join('')
      + [[60, 130], [180, 136]].map(([x, y]) => R(x - 22, y, 44, 60, '#F4C99A') + P(`M${x - 26} ${y + 2}c4-30 48-30 52 0z`, '#FFFFFF') + Lc(`M${x - 16} ${y - 6}c8-6 24-6 32 0`, '#795548', 4) + P(`M${x - 4} ${y - 22}l4-14 4 14z`, '#1E88E5', 3)).join('')
      + P('M-4 200c30-20 50 10 80-6s50 14 80-4 50 12 88-4v70H-4z', '#FFFFFF') + Array.from({ length: 10 }, (_, i) => R(4 + i * 24, 206 + (i % 2) * 4, 12, 8, ['#FFCA28', '#E53935', '#1E88E5', '#43A047', '#FF7043'][i % 5], 1, 2)).join('')) },
  { id: 'es-barcelona.landmark.sagrada', cat: 'landmark', file: 'es/barcelona/landmark-sagrada.v1.svg', name: nm('มหาวิหารซากราดาฟามีเลีย', 'Sagrada Família'), kw: ['sagrada familia', 'sagrada família', 'ซากราดาฟามีเลีย', 'gaudi', 'เกาดี', 'basilica', 'cranes'], colour: true, spot: nm('หาโบสถ์ที่ยอดเหมือนเทียนหยดและมีปั้นจั่น', 'Find the church with drippy spires and a crane'),
    // a cluster of tall honeycombed spires like dripping sandcastles, bright fruit-bowl tips, a yellow building crane beside
    svg: free(R(30, 150, 160, 70, '#E8D5A3') + [[52, 70, 18], [82, 40, 20], [116, 26, 22], [150, 46, 20], [178, 80, 16]].map(([x, top, w]) => P(`M${x - w / 2} 150l4-${150 - top - 20}c0-14 ${w - 8}-14 ${w - 8} 0l4 ${150 - top - 20}z`, '#D7C090') + Array.from({ length: 4 }, (_, k) => C(x, top + 30 + k * 22, 2.5, '#8D6E63', 0)).join('') + C(x, top + 2, 7, ['#E53935', '#FFCA28', '#43A047'][x % 3], 3)).join('')
      + Lc('M210 220V40M190 46h40M230 46v30', '#FFCA28', 5) + Lc('M210 220V40', INK, 2) + P('M96 220v-40c0-20 40-20 40 0v40z', '#8D6E63') + face(116, 120, 0.45)) },
  { id: 'es-barcelona.landmark.batllo', cat: 'landmark', file: 'es/barcelona/landmark-batllo.v1.svg', name: nm('คาซาบัตโย บ้านกระดูกมังกร', 'Casa Batlló'), kw: ['casa batllo', 'casa batlló', 'คาซาบัตโย', 'gaudi', 'dragon house', 'บ้านมังกร', 'passeig de gracia'], colour: true, spot: nm('หาบ้านที่หลังคาเหมือนหลังมังกร', 'Find the house with a dragon\'s back for a roof'),
    // the house with a scaly blue-green dragon-back roof, mask-shaped balconies and wavy bone pillars, sparkling tiles
    svg: free(R(50, 70, 140, 150, '#B3E5FC') + [[70, 90, '#F48FB1'], [110, 110, '#FFF59D'], [160, 96, '#AED581'], [90, 150, '#80DEEA'], [150, 160, '#FFCC80']].map(([x, y, c]) => C(x, y, 5, c, 2)).join('')
      + P('M44 74c10-30 30-46 56-50 30-4 60 10 96 40z', '#26A69A') + Lc('M60 60c10-6 20-6 30 0M110 40c10-6 20-6 30 0M150 50c10-4 20-2 26 6', '#00695C', 4) + C(170, 44, 8, '#FFCA28', 3)
      + [[80, 120], [160, 120]].map(([x, y]) => P(`M${x - 18} ${y}c4-14 32-14 36 0v10c-10 6-26 6-36 0z`, '#ECEFF1') + E(x - 6, y + 2, 4, 3, INK, 0) + E(x + 6, y + 2, 4, 3, INK, 0)).join('')
      + P('M70 220v-40c4-10 10 10 14 0s10 10 14 0v40zM142 220v-40c4-10 10 10 14 0s10 10 14 0v40z', '#ECEFF1') + face(120, 170, 0.45)) },
  { id: 'es-barcelona.landmark.boqueria', cat: 'landmark', file: 'es/barcelona/landmark-boqueria.v1.svg', name: nm('ตลาดบูเกเรีย', 'La Boqueria market'), kw: ['boqueria', 'บูเกเรีย', 'la rambla', 'ลารัมบลา', 'market', 'ตลาด', 'fruit juice', 'น้ำผลไม้'], colour: true, spot: nm('หาแผงผลไม้สีสดในตลาด', 'Find the bright fruit stall in the market'),
    // the iron-and-glass market gate with its stained-glass sign, a stall of fruit cups and juices in rainbow colours
    svg: free(R(20, 40, 200, 30, '#2E7D32') + P('M30 40c20-30 160-30 180 0z', '#B3E5FC') + [50, 90, 130, 170].map((x) => C(x, 26, 6, ['#E53935', '#FFCA28', '#1E88E5', '#EC407A'][x % 4 === 2 ? 1 : 0], 2.5)).join('') + Lc('M30 70v150M210 70v150', '#2E7D32', 7)
      + R(50, 150, 140, 60, '#A1673F', 4) + [[70, 140, '#E53935'], [96, 140, '#FFCA28'], [122, 140, '#AED581'], [148, 140, '#EC407A'], [174, 140, '#FF9800']].map(([x, y, c]) => P(`M${x - 10} ${y - 30}h20l-3 30h-14z`, c, 3.5) + Lc(`M${x + 4} ${y - 30}l6-14`, INK, 2)).join('') + face(120, 180, 0.5)) },
  // ---------- Finland: the Lapland day
  { id: 'fi.stamp', cat: 'stamp', file: 'fi/stamp.v1.svg', name: nm('ตราประทับฟินแลนด์', 'Finland stamp'), kw: ['finland', 'ฟินแลนด์', 'suomi'],
    // a reindeer head under the northern lights
    svg: countryStamp({ name: 'SUOMI', ...FI, emblem: Lc('M40 60c30-20 60 10 90-6s20 0 30-6', '#69F0AE', 8) + Lc('M76 74c-14-14-14-30-6-36M76 66l-10-6M124 74c14-14 14-30 6-36M124 66l10-6', '#8D6E63', 4) + C(100, 104, 26, '#A1887F') + E(100, 120, 14, 10, '#D7CCC8') + C(100, 116, 4, '#E53935', 2) }) },
  { id: 'fi.flag', ch: '🇫🇮', cat: 'flag', file: 'fi/flag.v1.svg', name: nm('ธงฟินแลนด์', 'Flag of Finland'), kw: ['finland', 'ฟินแลนด์', 'flag', 'ธง'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF') + `<path d="M90 36V150M44 94H212" stroke="#003580" stroke-width="22" fill="none"/>` + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', 'none')) },
  { id: 'fi.hello', cat: 'hello', file: 'fi/hello.v1.svg', name: nm('เฮย์ สวัสดี', 'Hei, hello'), kw: ['hei', 'moi', 'เฮย์', 'hello', 'สวัสดี', 'snowsuit', 'ชุดหิมะ'],
    // a round little child in a puffy snowsuit, a knitted hat with ear flaps and a pompom, sitting on a wooden sled
    svg: free(P('M40 200h160l10-14', 'none', 5) + R(50, 186, 140, 14, '#A1673F', 4) + P('M70 190c0-60 20-80 50-80s50 20 50 80z', '#1E88E5') + Lc('M80 150h80', '#FFFFFF', 4) + C(120, 92, 32, '#FFE0BD')
      + P('M86 88c0-34 68-34 68 0z', '#E53935') + Lc('M88 82l-6 26M152 82l6 26', '#E53935', 7) + C(120, 52, 10, '#FFFFFF') + Lc('M90 72h60', '#FFFFFF', 4)
      + P('M168 140c14-14 18-34 14-50l14-2c6 20 0 42-14 58z', '#1E88E5') + C(188, 84, 12, '#E53935') + face(120, 98, 0.6)) },
  { id: 'fi.food.cinnamonbun', cat: 'food', file: 'fi/food-cinnamonbun.v1.svg', name: nm('ขนมปังอบเชย', 'Cinnamon bun (korvapuusti)'), kw: ['korvapuusti', 'cinnamon bun', 'ขนมปังอบเชย', 'pulla', 'cafe', 'คาเฟ่', 'fika'], colour: true,
    // a swirly cinnamon roll squashed into its "slapped ear" shape, pearl sugar on top, a mug of cocoa beside
    svg: free(P('M30 150c0-50 40-80 90-80s90 30 90 80c0 30-40 50-90 50s-90-20-90-50z', '#E9A64C') + P('M120 136m-50 0c0-30 30-46 50-40 26 6 30 40 6 46-20 4-28-20-12-26', 'none', 6).replace('fill="none"', 'fill="none" stroke="#A0522D"')
      + [[80, 106], [120, 96], [160, 110], [100, 120], [150, 130]].map(([x, y]) => R(x - 3, y - 3, 6, 6, '#FFFFFF', 1, 2)).join('') + face(120, 168, 0.6)) },
  { id: 'fi.food.blueberrypie', cat: 'food', file: 'fi/food-blueberrypie.v1.svg', name: nm('พายบลูเบอร์รีป่า', 'Wild blueberry pie'), kw: ['blueberry pie', 'พายบลูเบอร์รี', 'mustikkapiirakka', 'bilberries', 'blueberries', 'บลูเบอร์รี'], colour: true,
    // a round pie tin crowded with dark wild blueberries, a dollop of vanilla cream, a little pile of fresh berries
    svg: free(E(120, 150, 100, 44, '#E9A64C') + E(120, 142, 84, 34, '#3949AB') + Array.from({ length: 14 }, (_, i) => C(60 + (i * 37) % 120, 130 + (i * 13) % 26, 6, '#5C6BC0', 2.5)).join('') + P('M100 120c0-16 40-16 40 0 8 6 2 14-8 12-8 6-24 6-28-2-8-2-8-10-4-10z', '#FFF8E1')
      + [[196, 196], [208, 186], [186, 186]].map(([x, y]) => C(x, y, 8, '#3949AB', 3)).join('') + face(120, 174, 0.55)) },
  { id: 'fi.animal.reindeer', ch: '🦌', cat: 'animal', file: 'fi/animal-reindeer.v1.svg', name: nm('กวางเรนเดียร์', 'Reindeer'), kw: ['reindeer', 'เรนเดียร์', 'poro', 'sleigh ride', 'นั่งเลื่อน', 'lapland', 'แลปแลนด์'], colour: true,
    // a chunky grey-brown reindeer with a cream neck mane, big branching antlers and a frosty breath
    svg: free(E(140, 160, 66, 36, '#8D7B68') + [[100, 186], [176, 186]].map(([x, y]) => R(x - 9, y, 18, 28, '#8D7B68', 6)).join('') + P('M80 130c10 20 30 30 50 26-10-20-30-30-50-26z', '#F5F0E6')
      + C(80, 110, 34, '#8D7B68') + Lc('M62 82c-14-20-10-40 0-52M62 64l-14-10M56 46l-12 0M98 82c14-20 10-40 0-52M98 64l14-10M104 46l12 0', '#D7CCC8', 6) + E(76, 134, 18, 12, '#A1887F') + E(70, 130, 4, 3, INK)
      + Lc('M44 134c-8 2-14 0-18-4', '#E1F5FE', 4) + face(80, 108, 0.55)) },
  { id: 'fi.animal.husky', cat: 'animal', file: 'fi/animal-husky.v1.svg', name: nm('หมาฮัสกี้ลากเลื่อน', 'Sled husky'), kw: ['husky', 'ฮัสกี้', 'husky safari', 'สุนัขลากเลื่อน', 'dog sled', 'sled dogs'], colour: true,
    // a grey-and-white husky with icy blue eyes, the classic face mask, a harness on, tongue out happy
    svg: free(E(130, 170, 64, 30, '#90A4AE') + E(130, 180, 44, 18, '#FFFFFF') + Lc('M90 160h80', '#E53935', 6) + P('M54 74l6-40 26 30zM126 74l-6-40-26 30z', '#90A4AE')
      + C(90, 110, 42, '#90A4AE') + P('M90 80c-20 10-30 30-26 50 10 10 42 10 52 0 4-20-6-40-26-50z', '#FFFFFF') + E(90, 128, 7, 5, INK) + P('M84 140c0 12 12 12 12 0z', '#F48FB1', 3)
      + face(90, 110, 0.6, 'none').replace(/fill="#22213A" stroke="none"/g, 'fill="#29B6F6" stroke="none"')) },
  { id: 'fi.transport.sleigh', cat: 'transport', file: 'fi/transport-sleigh.v1.svg', name: nm('เลื่อนกวางเรนเดียร์', 'Reindeer sleigh'), kw: ['sleigh', 'เลื่อน', 'reindeer sleigh', 'เลื่อนกวาง', 'santa', 'ซานต้า', 'snow ride'], colour: true,
    // a curly red wooden sleigh on runners full of fur blankets, a jingle-bell strap, sliding over snow
    svg: free(P('M10 214c60-6 160-6 220 0', 'none', 5) + P('M40 200h170c20 0 26-20 14-30', 'none', 5) + P('M50 194c-20-10-26-40-10-60 20 10 30 30 40 60z', '#C62828') + R(60, 130, 140, 64, '#C62828', 10)
      + Lc('M70 150h120', '#FFD54A', 5) + P('M80 130c10-20 40-20 50 0z', '#ECEFF1') + P('M130 130c10-16 40-16 50 0z', '#D7CCC8') + [[90, 176], [130, 176], [170, 176]].map(([x, y]) => C(x, y, 7, '#FFD54A', 3)).join('') + face(130, 160, 0.4)) },
  { id: 'fi.culture.sauna', cat: 'culture', file: 'fi/culture-sauna.v1.svg', name: nm('ซาวน่ากระท่อมไม้', 'Lakeside sauna hut'), kw: ['sauna', 'ซาวน่า', 'finnish sauna', 'ซาวน่าฟินแลนด์', 'lake', 'ทะเลสาบ', 'cabin'], colour: true,
    // a small red log sauna hut with a smoking chimney beside a frozen lake, a wooden bucket and ladle on the step
    svg: free(R(50, 100, 120, 90, '#C0392B') + Lc('M50 120h120M50 140h120M50 160h120', '#922B21', 3) + P('M36 104l74-50 74 50z', '#5D4037') + R(140, 50, 16, 34, '#5D4037') + Lc('M148 46c-6-10 6-16 0-28', '#ECEFF1', 5)
      + R(96, 140, 30, 50, '#8D6E63', 3) + R(60, 120, 24, 18, '#FFE082', 2, 3) + P('M10 196h220v24H10z', '#B3E5FC') + P('M180 168h22l-4 22h-14z', '#A1673F', 3.5) + Lc('M196 168l12-20', INK, 3) + face(140, 166, 0.4)) },
  { id: 'p-lapland.stamp', cat: 'stamp', file: 'fi/lapland/stamp.v1.svg', name: nm('ตราประทับแลปแลนด์', 'Lapland stamp'), kw: ['lapland', 'แลปแลนด์', 'rovaniemi', 'โรวาเนียมิ', 'santa claus village', 'หมู่บ้านซานต้า', 'arctic circle'],
    // a red cabin with a snowy roof and a star above it on the Arctic Circle line
    svg: cityStamp('plp-st', { name: 'LAPLAND', sub: 'ARCTIC CIRCLE', ...LP, emblem: R(76, 98, 48, 34, '#C62828') + P('M70 100l30-22 30 22z', '#FFFFFF') + R(92, 112, 14, 20, '#5D4037', 2) + Lc('M50 138h100', '#1565C0', 3) + P('M100 52l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z', '#FFD54A', 2) }) },
  { id: 'p-lapland.day.aurora', cat: 'day', file: 'fi/lapland/day-aurora.v1.svg', name: nm('แสงเหนือเหนือกระท่อมแก้ว', 'Northern lights over a glass igloo'), kw: ['northern lights', 'แสงเหนือ', 'aurora borealis', 'aurora', 'glass igloo', 'อิกลูแก้ว', 'kakslauttanen', 'night'],
    // green and pink aurora ribbons over snowy pines, a glass igloo glowing with warm light, stars
    svg: scene('plp-d1', '#1A237E', [[40, 30], [200, 40], [120, 20], [80, 110]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('') + aurora('#69F0AE', '#F48FB1')
      + [20, 50, 190, 220].map((x, i) => P(`M${x - 18} 190l18-${50 + i * 6} 18 ${50 + i * 6}z`, '#1B5E20') + P(`M${x - 10} ${150 - i * 6}l10-14 10 14z`, '#FFFFFF', 3)).join('') + P('M-4 190c40-10 80-10 120 0s80 10 128 0v60H-4z', '#FFFFFF')
      + P('M80 196c0-40 80-40 80 0z', '#B3E5FC') + P('M90 196c0-30 60-30 60 0z', '#FFE082', 0).replace('stroke-width="0"', 'stroke="none"') + Lc('M120 158v38M96 170l48 20M144 170l-48 20', '#81D4FA', 2) + P('M80 196c0-40 80-40 80 0z', 'none')) },
  { id: 'p-lapland.landmark.santavillage', cat: 'landmark', file: 'fi/lapland/landmark-santavillage.v1.svg', name: nm('หมู่บ้านซานตาคลอส', 'Santa Claus Village'), kw: ['santa claus village', 'หมู่บ้านซานตาคลอส', 'santa', 'ซานต้า', 'rovaniemi', 'โรวาเนียมิ', 'arctic circle line', 'christmas'], colour: true, spot: nm('หาเส้นอาร์กติกเซอร์เคิลบนพื้น', 'Find the Arctic Circle line on the ground'),
    // the timber-and-red village house with fairy lights and a tall pointed roof, the painted Arctic Circle line across the snow, a signpost of directions
    svg: free(R(50, 100, 140, 90, '#8D6E63') + P('M30 106l90-80 90 80z', '#C62828') + P('M30 106l90-80 90 80', 'none', 0).replace('stroke-width="0"', 'stroke="#FFFFFF" stroke-width="10"') + P('M30 106l90-80 90 80', 'none')
      + Lc('M40 108c20 10 40 10 60 0s40-10 60 0 30 10 40 0', INK, 2) + [[50, 110], [86, 114], [120, 110], [154, 114], [186, 110]].map(([x, y], i) => C(x, y, 4, ['#FFEB3B', '#E53935', '#4FC3F7', '#69F0AE', '#FFEB3B'][i], 2)).join('')
      + R(100, 140, 40, 50, '#5D4037', 4) + [[70, 130], [160, 130]].map(([x, y]) => R(x - 12, y, 24, 22, '#FFE082', 2, 3)).join('') + P('M10 196h220v24H10z', '#FFFFFF') + Lc('M10 206h220', '#1565C0', 4)
      + Lc('M216 200V130', '#8D6E63', 5) + [[216, 140, '#E53935'], [216, 160, '#1E88E5']].map(([x, y, c]) => P(`M${x} ${y}h-30l-6 6 6 6h30z`, c, 3)).join('') + face(120, 92, 0.4)) },
  { id: 'p-lapland.landmark.huskysafari', cat: 'landmark', file: 'fi/lapland/landmark-huskysafari.v1.svg', name: nm('ซาฟารีสุนัขฮัสกี้', 'A husky safari'), kw: ['husky safari', 'ซาฟารีฮัสกี้', 'dog sledding', 'สุนัขลากเลื่อน', 'snow forest', 'ป่าหิมะ'], colour: true, spot: nm('นับสุนัขที่ลากเลื่อน', 'Count the dogs pulling the sled'),
    // a team of four huskies pulling a sled through a snowy forest, the musher in a red coat standing on the back
    svg: free(P('M10 200c60-10 160-10 220 0v20H10z', '#FFFFFF') + [[30, 120], [210, 110]].map(([x, h]) => P(`M${x - 22} 200l22-${h} 22 ${h}z`, '#2E7D32')).join('') + Lc('M60 180H150', INK, 2)
      + [56, 86, 116, 146].map((x) => E(x, 176, 14, 8, '#90A4AE') + C(x - 12, 168, 7, '#90A4AE', 3) + P(`M${x - 16} 162l2-8 4 6z`, '#90A4AE', 2.5)).join('') + P('M160 186h50c6 0 8-10 2-14', 'none', 4) + R(166, 164, 40, 20, '#A1673F', 4) + Lc('M200 164V130', INK, 4)
      + C(190, 124, 10, '#FFE0BD', 3) + R(180, 134, 20, 30, '#E53935', 4, 3) + face(190, 124, 0.25)) },
  // ---------- Turkey
  { id: 'tr.stamp', cat: 'stamp', file: 'tr/stamp.v1.svg', name: nm('ตราประทับตุรกี', 'Türkiye stamp'), kw: ['turkey', 'türkiye', 'ตุรกี', 'turkiye'],
    // a blue glass evil-eye charm (nazar) hanging on a red thread, with a tulip
    svg: countryStamp({ name: 'TÜRKİYE', ...TR, emblem: Lc('M100 46v20', '#C62828', 3) + C(100, 94, 28, '#1565C0') + C(100, 94, 19, '#FFFFFF', 2.5) + C(100, 94, 11, '#4FC3F7', 2) + C(100, 94, 5, INK, 0) + P('M146 140c0-10 4-16 8-16s8 6 8 16c-2 4-14 4-16 0z', '#E53935', 2) + Lc('M154 140v12', '#43A047', 2) }) },
  { id: 'tr.flag', ch: '🇹🇷', cat: 'flag', file: 'tr/flag.v1.svg', name: nm('ธงตุรกี', 'Flag of Türkiye'), kw: ['turkey', 'türkiye', 'ตุรกี', 'flag', 'ธง'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#E30A17')
      + P('M110 64a30 30 0 1 0 0 60 24 24 0 1 1 0-60z', '#FFFFFF', 0).replace('stroke-width="0"', 'stroke="none"') + (() => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + Math.PI / 10 + (i * Math.PI) / 5, r = i % 2 ? 6 : 14; d += `${i ? 'L' : 'M'}${(134 + Math.cos(a) * r).toFixed(1)} ${(94 + Math.sin(a) * r).toFixed(1)}`; } return `<path d="${d}z" fill="#FFFFFF" stroke="none"/>`; })()) },
  { id: 'tr.hello', cat: 'hello', file: 'tr/hello.v1.svg', name: nm('แมร์ฮาบา สวัสดี', 'Merhaba, hello'), kw: ['merhaba', 'แมร์ฮาบา', 'hello', 'สวัสดี', 'simit', 'ซิมิต'],
    // a child waving with a sesame simit ring on one arm like a bracelet, a little red fez-free cap, a waistcoat
    svg: free(P('M78 214c0-54 16-86 42-86s42 32 42 86z', '#FFFFFF') + P('M84 144c0-14 12-18 22-18v80H84zM156 144c0-14-12-18-22-18v80h22z', '#C62828') + C(120, 92, 32, '#FFE0BD') + P('M90 84c0-24 16-34 30-34s30 10 30 34c-6-10-16-14-30-14s-24 4-30 14z', '#3E2723')
      + P('M158 150c14-16 18-38 12-54l14-4c8 22 2 46-14 64z', '#FFE0BD') + C(178, 88, 11, '#FFE0BD') + C(172, 124, 18, 'none') + Lc('M172 124m-18 0a18 18 0 1 0 36 0a18 18 0 1 0-36 0', '#C8862F', 9) + face(120, 96, 0.6)) },
  { id: 'tr.food.turkishdelight', cat: 'food', file: 'tr/food-turkishdelight.v1.svg', name: nm('ขนมเตอร์กิชดีไลท์', 'Turkish delight'), kw: ['turkish delight', 'เตอร์กิชดีไลท์', 'lokum', 'โลคุม', 'sweets', 'ขนม', 'grand bazaar', 'souvenir'], colour: true,
    // soft cubes of lokum, rose pink and pistachio green, dusted in snowy sugar, on a little copper plate
    svg: free(E(120, 180, 100, 24, '#D4A04C') + E(120, 176, 86, 18, '#E8B860') + [[80, 150, '#F48FB1'], [120, 146, '#AED581'], [160, 150, '#F48FB1'], [100, 116, '#AED581'], [140, 116, '#F48FB1']].map(([x, y, c]) => R(x - 20, y - 20, 40, 34, c, 8) + [[-8, -12], [6, -14], [0, -6]].map(([dx, dy]) => C(x + dx, y + dy, 2.5, '#FFFFFF', 0)).join('')).join('') + face(120, 112, 0.45)) },
  { id: 'tr.food.simit', cat: 'food', file: 'tr/food-simit.v1.svg', name: nm('ขนมปังซิมิต', 'Simit'), kw: ['simit', 'ซิมิต', 'sesame bread', 'ขนมปังงา', 'street food', 'breakfast', 'ferry snack'], colour: true,
    // a big twisted sesame-crusted bread ring, the seller's red cart-tray under it
    svg: free(R(30, 180, 180, 20, '#C62828', 6) + C(120, 120, 72, 'none') + Lc('M120 120m-60 0a60 60 0 1 0 120 0a60 60 0 1 0-120 0', '#B5713E', 30) + Lc('M120 120m-60 0a60 60 0 1 0 120 0a60 60 0 1 0-120 0', INK, 3)
      + Array.from({ length: 10 }, (_, i) => { const a = (i * Math.PI) / 5; return Lc(`M${(120 + Math.cos(a) * 46).toFixed(1)} ${(120 + Math.sin(a) * 46).toFixed(1)}l${(Math.cos(a + 1) * 20).toFixed(1)} ${(Math.sin(a + 1) * 20).toFixed(1)}`, '#8D4A2B', 3); }).join('')
      + Array.from({ length: 16 }, (_, i) => { const a = (i * Math.PI) / 8; return E(120 + Math.cos(a) * 64, 120 + Math.sin(a) * 64, 3, 2, '#FFF8E1', 0); }).join('') + face(120, 120, 0.45, 'none')) },
  { id: 'tr.food.kebab', cat: 'food', file: 'tr/food-kebab.v1.svg', name: nm('เคบับไก่ห่อ', 'Chicken döner wrap'), kw: ['doner', 'döner', 'kebab', 'เคบับ', 'durum', 'dürüm', 'wrap', 'street food'], colour: true,
    // a fat wrap rolled in paper, sliced chicken, tomato, lettuce and a dab of yogurt peeking out of the top
    svg: free(g(120, 130, 1, P('M-40-70h80l-10 150h-60z', '#F4D9A6') + P('M-40-70c10-20 70-20 80 0z', '#E9C17A') + [[-20, -74, '#D7A86E'], [0, -78, '#E53935'], [20, -74, '#81C784']].map(([x, y, c]) => E(x, y, 12, 8, c, 3)).join('') + E(10, -84, 8, 5, '#FFFFFF', 2.5) + P('M-36 0h72l-8 80h-56z', '#FFFFFF') + Lc('M-36 20h72', '#1565C0', 4), 12) + face(116, 140, 0.55)) },
  { id: 'tr.animal.cat', cat: 'animal', file: 'tr/animal-cat.v1.svg', name: nm('แมวอิสตันบูล', 'Istanbul street cat'), kw: ['istanbul cats', 'แมวอิสตันบูล', 'street cat', 'แมวจร', 'kedi', 'cat'], colour: true,
    // a white-and-grey tabby cat curled up asleep in a shop doorway on a colourful kilim rug
    svg: free(R(30, 170, 180, 30, '#C62828', 4) + Lc('M40 185h160', '#FFCA28', 4) + [60, 100, 140, 180].map((x) => P(`M${x - 8} 185l8-8 8 8-8 8z`, '#1565C0', 2.5)).join('') + E(120, 152, 70, 28, '#ECEFF1') + P('M120 128c20-10 50-6 60 14-20 6-40 2-60-14z', '#90A4AE')
      + P('M184 150c20 4 20 20 4 20-20 0-30-6-34-14z', '#90A4AE') + C(70, 140, 28, '#ECEFF1') + P('M50 122l0-20 16 12zM90 122l0-20-16 12z', '#90A4AE') + P('M56 140q6 4 12 0M74 140q6 4 12 0', 'none', 3) + P('M68 150q2 4 4 0', 'none', 2.5)) },
  { id: 'tr.transport.ferry', cat: 'transport', file: 'tr/transport-ferry.v1.svg', name: nm('เรือข้ามฟากบอสฟอรัส', 'Bosphorus ferry'), kw: ['bosphorus ferry', 'เรือข้ามฟาก', 'vapur', 'eminonu', 'kadikoy', 'ข้ามทวีป', 'seagulls'], colour: true,
    // the white-and-yellow city ferry with its tall black-topped funnel, seagulls following for simit
    svg: free(P('M10 196c30-8 60-8 90 0s60 8 90 0 40-6 40 0', 'none', 5).replace('fill="none"', 'fill="none" stroke="#1565C0"') + P('M20 160h200l-20 30H40z', '#FFFFFF') + Lc('M24 172h192', '#FFCA28', 7) + R(50, 120, 140, 40, '#FFFFFF', 6)
      + Array.from({ length: 6 }, (_, i) => R(60 + i * 21, 130, 14, 14, '#90CAF9', 3, 3)).join('') + R(108, 80, 24, 40, '#FFFFFF') + R(108, 80, 24, 12, INK) + [[60, 70], [170, 60], [200, 90]].map(([x, y]) => Lc(`M${x - 12} ${y}q6-8 12 0q6-8 12 0`, INK, 3)).join('') + face(120, 144, 0.4)) },
  { id: 'tr.culture.lamps', cat: 'culture', file: 'tr/culture-lamps.v1.svg', name: nm('โคมโมเสกตุรกี', 'Turkish mosaic lamps'), kw: ['mosaic lamp', 'โคมโมเสก', 'turkish lamp', 'โคมตุรกี', 'grand bazaar', 'แกรนด์บาซาร์', 'souvenir'], colour: true,
    // three glass-mosaic hanging lamps on chains, glowing in jewel colours with diamond patterns
    svg: free([[60, 70, '#1E88E5'], [120, 50, '#E53935'], [180, 80, '#43A047']].map(([x, top, c]) => Lc(`M${x} 0v${top}`, '#B0BEC5', 3) + P(`M${x - 8} ${top}h16l4 10h-24z`, '#D4A04C', 3) + E(x, top + 44, 30, 34, c) + [[-12, 34], [6, 30], [-4, 52], [14, 50], [0, 66]].map(([dx, dy]) => P(`M${x + dx} ${top + dy - 6}l5 6-5 6-5-6z`, '#FFF59D', 2)).join('') + P(`M${x - 10} ${top + 76}h20l-10 14z`, '#D4A04C', 3)).join('') + face(120, 96, 0.45)) },
  // Istanbul
  { id: 'tr-istanbul.stamp', cat: 'stamp', file: 'tr/istanbul/stamp.v1.svg', name: nm('ตราประทับอิสตันบูล', 'Istanbul stamp'), kw: ['istanbul', 'อิสตันบูล'],
    svg: cityStamp('tis-st', { name: 'İSTANBUL', sub: 'TÜRKİYE', ...IS, emblem: R(70, 110, 60, 30, '#90A4AE') + P('M78 110c0-30 44-30 44 0z', '#5C6BC0') + [60, 140].map((x) => R(x - 3, 66, 6, 74, '#90A4AE') + P(`M${x - 4} 68l4-14 4 14z`, '#5C6BC0', 2)).join('') + C(100, 74, 3, '#FFD54A', 2) }) },
  { id: 'tr-istanbul.day.bosphorus', cat: 'day', file: 'tr/istanbul/day-bosphorus.v1.svg', name: nm('ช่องแคบบอสฟอรัสยามพระอาทิตย์ตก', 'The Bosphorus at sunset'), kw: ['bosphorus', 'บอสฟอรัส', 'galata', 'กาลาตา', 'sunset', 'พระอาทิตย์ตก', 'skyline', 'two continents', 'สองทวีป'],
    // the old city's skyline of domes and pencil minarets dark against an orange sunset, the Galata tower, the strait with a ferry
    svg: scene('tis-d1', '#FFB74D', C(120, 120, 30, '#FFE082') + [[30, 120, 30], [90, 110, 40], [170, 116, 34]].map(([x, y, w]) => P(`M${x - w} ${y + 20}c0-${w} ${w * 2}-${w} ${w * 2} 0z`, '#6D4C41') + R(x - w, y + 20, w * 2, 30, '#6D4C41')).join('')
      + [[48, 60], [130, 50], [200, 64]].map(([x, top]) => R(x - 3, top, 6, 110 - top + 60, '#6D4C41', 0, 3) + P(`M${x - 4} ${top}l4-14 4 14z`, '#6D4C41', 3)).join('') + R(214, 100, 20, 70, '#795548') + P('M210 102l14-20 14 20z', '#5D4037')
      + P('M-4 170h248v80H-4z', '#1565C0') + R(80, 186, 70, 14, '#FFFFFF', 4, 3.5) + R(110, 172, 10, 14, INK, 1, 3) + Lc('M30 214h30M170 220h40', '#FFE082', 4)) },
  { id: 'tr-istanbul.landmark.bluemosque', cat: 'landmark', file: 'tr/istanbul/landmark-bluemosque.v1.svg', name: nm('สุเหร่าสีน้ำเงิน', 'The Blue Mosque'), kw: ['blue mosque', 'สุเหร่าสีน้ำเงิน', 'sultanahmet', 'สุลต่านอาเหม็ด', 'mosque', 'มัสยิด', 'six minarets', 'domes'], colour: true, spot: nm('นับหอคอยแหลมรอบโดมใหญ่', 'Count the pencil towers round the big dome'),
    // seen from outside: a cascade of grey domes rising to the big central one, six slender pencil minarets with balconies
    svg: free(R(40, 150, 160, 70, '#CFD8DC') + [[60, 150, 22], [180, 150, 22], [90, 130, 30], [150, 130, 30]].map(([x, y, r]) => P(`M${x - r} ${y}c0-${r * 1.3} ${r * 2}-${r * 1.3} ${r * 2} 0z`, '#90A4AE')).join('') + R(80, 110, 80, 40, '#CFD8DC') + P('M76 112c0-60 88-60 88 0z', '#90A4AE') + Lc('M120 66v-14', INK, 3) + C(120, 50, 3, '#FFD54A', 2)
      + [16, 36, 204, 224].map((x) => R(x - 4, 60, 8, 160, '#ECEFF1', 0, 3) + R(x - 7, 100, 14, 6, '#ECEFF1', 2, 3) + P(`M${x - 5} 60l5-28 5 28z`, '#78909C', 3)).join('') + P('M96 220v-30c0-16 48-16 48 0v30z', '#5C6BC0') + face(120, 170, 0.45, 'none')) },
  { id: 'tr-istanbul.landmark.galata', cat: 'landmark', file: 'tr/istanbul/landmark-galata.v1.svg', name: nm('หอคอยกาลาตา', 'Galata Tower'), kw: ['galata tower', 'หอคอยกาลาตา', 'galata', 'กาลาตา', 'beyoglu', 'karakoy', 'view'], colour: true, spot: nm('หาหอคอยหินกลมหลังคาแหลม', 'Find the round stone tower with a cone hat'),
    // the round stone tower with a ring of windows and balcony near the top, the steep grey cone roof, colourful houses at its feet
    svg: free(R(90, 50, 60, 170, '#BCAAA4') + Lc('M90 100h60M90 140h60M90 180h60', '#A1887F', 3) + R(84, 60, 72, 10, '#8D6E63', 2) + [100, 114, 128, 140].map((x) => R(x - 4, 72, 8, 16, '#FFE082', 2, 2.5)).join('') + P('M84 60l36-50 36 50z', '#607D8B')
      + [[20, '#F48FB1'], [50, '#FFE082'], [160, '#AED581'], [190, '#81D4FA']].map(([x, c]) => R(x, 160, 30, 60, c) + P(`M${x - 4} 162l19-14 19 14z`, '#E64A19', 3)).join('') + face(120, 150, 0.45)) },
  { id: 'tr-istanbul.landmark.bazaar', cat: 'landmark', file: 'tr/istanbul/landmark-bazaar.v1.svg', name: nm('แกรนด์บาซาร์', 'The Grand Bazaar'), kw: ['grand bazaar', 'แกรนด์บาซาร์', 'kapalicarsi', 'kapalıçarşı', 'spice bazaar', 'ตลาดเครื่องเทศ', 'market', 'ตลาด'], colour: true, spot: nm('หาซุ้มโค้งลายทางในตลาดเก่า', 'Find the striped arches in the old market'),
    // vaulted striped arches over a lane of shops: hanging lamps, cone piles of red, yellow and green spices, rugs
    svg: free([40, 120, 200].map((x) => P(`M${x - 40} 220V80c0-40 80-40 80 0v140h-12V84c0-30-56-30-56 0v136z`, '#FFF3E0') + Lc(`M${x - 34} 90c4-30 64-30 68 0`, '#C62828', 5)).join('')
      + [[60, 180, '#E53935'], [90, 184, '#FFCA28'], [120, 180, '#7CB342'], [150, 184, '#FF7043'], [180, 180, '#8D6E63']].map(([x, y, c]) => P(`M${x - 14} ${y + 20}l14-30 14 30z`, c, 3.5)).join('') + R(40, 200, 160, 20, '#A1673F', 3)
      + [[90, 110, '#1E88E5'], [150, 110, '#E53935']].map(([x, y, c]) => Lc(`M${x} 70v${y - 80}`, '#B0BEC5', 2) + E(x, y, 12, 14, c, 3)).join('') + face(120, 194, 0.4)) },
  // Cappadocia
  { id: 'tr-cappadocia.stamp', cat: 'stamp', file: 'tr/cappadocia/stamp.v1.svg', name: nm('ตราประทับคัปปาโดเกีย', 'Cappadocia stamp'), kw: ['cappadocia', 'คัปปาโดเกีย', 'goreme', 'göreme', 'เกอเรเม'],
    // a hot-air balloon with stripes
    svg: cityStamp('tcp-st', { name: 'CAPPADOCIA', sub: 'TÜRKİYE', ...CP, emblem: P('M100 56c-24 0-30 30-18 50l10 14h16l10-14c12-20 6-50-18-50z', '#E53935') + P('M100 56c-8 4-10 36-4 64h8c6-28 4-60-4-64z', '#FFCA28', 2.5) + R(92, 124, 16, 12, '#A1673F', 2, 2) + Lc('M92 120l2 4M108 120l-2 4', INK, 2) }) },
  { id: 'tr-cappadocia.day.balloons', cat: 'day', file: 'tr/cappadocia/day-balloons.v1.svg', name: nm('บอลลูนลมร้อนยามเช้า', 'Hot-air balloons at sunrise'), kw: ['hot air balloon', 'บอลลูนลมร้อน', 'balloon ride', 'ขึ้นบอลลูน', 'sunrise', 'พระอาทิตย์ขึ้น', 'goreme', 'love valley'],
    // a pink-and-gold sunrise sky full of striped balloons drifting over the rocky valley and fairy chimneys
    svg: scene('tcp-d1', '#FFCCBC', C(180, 150, 24, '#FFE082') + [[60, 60, 22, '#E53935', '#FFCA28'], [130, 40, 18, '#1E88E5', '#FFFFFF'], [190, 70, 16, '#43A047', '#FFCA28'], [100, 100, 14, '#AB47BC', '#F8BBD0'], [30, 120, 10, '#FF7043', '#FFF59D']].map(([x, y, r, c1, c2]) => P(`M${x} ${y - r}c-${r * 1.2} 0-${r * 1.4} ${r * 1.4}-${r * 0.8} ${r * 2.2}l${r * 0.4} ${r * 0.4}h${r * 0.8}l${r * 0.4}-${r * 0.4}c${r * 0.6}-${r * 0.8} ${r * 0.4}-${r * 2.2}-${r * 0.8}-${r * 2.2}z`, c1, 3) + Lc(`M${x} ${y - r}v${r * 2.4}`, c2, Math.max(2, r * 0.3)) + R(x - r * 0.3, y + r * 1.7, r * 0.6, r * 0.4, '#8D6E63', 1, 2)).join('')
      + [[40, 120], [90, 140], [150, 130], [210, 150]].map(([x, h]) => P(`M${x - 18} 250c2-${h * 0.7} 8-${h} 18-${h} 10 0 16 ${h * 0.3} 18 ${h}z`, '#F4C99A') + E(x, 250 - h, 14, 6, '#A1673F', 3)).join('') + P('M-4 230h248v20H-4z', '#E0B07A')) },
  { id: 'tr-cappadocia.landmark.chimneys', cat: 'landmark', file: 'tr/cappadocia/landmark-chimneys.v1.svg', name: nm('ปล่องนางฟ้า', 'Fairy chimneys'), kw: ['fairy chimneys', 'ปล่องนางฟ้า', 'pasabag', 'paşabağ', 'rock formations', 'หินรูปร่างแปลก', 'devrent'], colour: true, spot: nm('หาหินที่เหมือนเห็ดสวมหมวก', 'Find the rocks that look like mushrooms in hats'),
    // three tall soft-pink rock cones each wearing a dark stone cap, little doors and windows carved in one of them
    svg: free(P('M10 220c40-10 180-10 220 0v8H10z', '#E0B07A') + [[60, 150, 26], [126, 180, 32], [190, 130, 24]].map(([x, h, w]) => P(`M${x - w} 220c4-${h * 0.6} 10-${h} ${w}-${h} ${w - 10} 0 ${w - 4} ${h * 0.4} ${w} ${h}z`, '#F4C99A') + P(`M${x - w * 0.8} ${222 - h}c4-14 ${w * 1.6 - 8}-14 ${w * 1.6} 0-6 6-${w * 1.6 - 6} 6-${w * 1.6} 0z`, '#8D6E63')).join('')
      + R(118, 130, 14, 20, '#5D4037', 6) + R(112, 176, 18, 30, '#5D4037', 8) + face(126, 154, 0.45)) },
  { id: 'tr-cappadocia.landmark.cavehotel', cat: 'landmark', file: 'tr/cappadocia/landmark-cavehotel.v1.svg', name: nm('โรงแรมถ้ำ', 'A cave hotel'), kw: ['cave hotel', 'โรงแรมถ้ำ', 'cave room', 'ห้องในถ้ำ', 'goreme', 'uchisar', 'อุชฮิซาร์', 'terrace'], colour: true, spot: nm('หาห้องพักที่เจาะเข้าไปในหิน', 'Find the rooms dug into the rock'),
    // a cliff of pale rock carved with arched doors and windows, a terrace with cushions and a rug, a lantern, a balloon in the corner
    svg: free(P('M10 220V70c40-40 180-50 220-10v160z', '#F4C99A') + [[50, 100], [100, 90], [160, 104]].map(([x, y]) => P(`M${x - 14} ${y + 26}v-14c0-16 28-16 28 0v14z`, '#5D4037') + R(x - 8, y + 6, 16, 14, '#FFE082', 2, 3)).join('')
      + P('M80 220v-40c0-20 40-20 40 0v40z', '#8D6E63') + R(130, 176, 90, 16, '#C62828', 4) + [[146, 172], [176, 170], [204, 172]].map(([x, y]) => E(x, y, 12, 8, ['#FFCA28', '#1E88E5', '#43A047'][x % 3], 3)).join('') + C(60, 160, 8, '#FFCA28', 3)
      + P('M210 30c-12 0-14 16-8 24l4 6h8l4-6c6-8 4-24-8-24z', '#E53935', 3) + face(100, 150, 0.4)) },
];
export default {
  places: {
    es: { country: 'es', wave: 1, name: nm('สเปน', 'Spain'), tz: 'Europe/Madrid', alias: ['spain', 'สเปน', 'españa', 'espana'], colors: ES },
    'es-barcelona': { country: 'es', wave: 1, name: nm('บาร์เซโลนา', 'Barcelona'), tz: 'Europe/Madrid', ll: [41.39, 2.17], alias: ['barcelona', 'บาร์เซโลนา', 'sagrada', 'ซากราดา', 'park guell', 'park güell', 'ปาร์กเกวลล์', 'la rambla', 'ลารัมบลา', 'gothic quarter', 'barceloneta', 'montjuic', 'montjuïc', 'gaudi', 'tibidabo'], colors: BC },
    fi: { country: 'fi', wave: 1, name: nm('ฟินแลนด์', 'Finland'), tz: 'Europe/Helsinki', alias: ['finland', 'ฟินแลนด์', 'suomi'], colors: FI },
    'p-lapland': { country: 'fi', wave: 1, name: nm('แลปแลนด์', 'Lapland'), tz: 'Europe/Helsinki', ll: [66.5, 25.73], alias: ['lapland', 'แลปแลนด์', 'rovaniemi', 'โรวาเนียมิ', 'santa claus village', 'หมู่บ้านซานตา', 'Levi', 'saariselka', 'saariselkä', 'kakslauttanen', 'arctic circle', 'inari', 'ivalo'], colors: LP },
    tr: { country: 'tr', wave: 1, name: nm('ตุรกี', 'Türkiye'), tz: 'Europe/Istanbul', alias: ['turkey', 'türkiye', 'turkiye', 'ตุรกี'], colors: TR },
    'tr-istanbul': { country: 'tr', wave: 1, name: nm('อิสตันบูล', 'Istanbul'), tz: 'Europe/Istanbul', ll: [41.01, 28.98], alias: ['istanbul', 'อิสตันบูล', 'sultanahmet', 'สุลต่านอาเหม็ด', 'bosphorus', 'บอสฟอรัส', 'galata', 'กาลาตา', 'taksim', 'kadikoy', 'kadıköy', 'eminonu', 'eminönü', 'hagia sophia', 'grand bazaar'], colors: IS },
    'tr-cappadocia': { country: 'tr', wave: 1, name: nm('คัปปาโดเกีย', 'Cappadocia'), tz: 'Europe/Istanbul', ll: [38.64, 34.83], alias: ['cappadocia', 'คัปปาโดเกีย', 'kapadokya', 'goreme', 'göreme', 'เกอเรเม', 'uchisar', 'uçhisar', 'urgup', 'ürgüp', 'nevsehir', 'love valley', 'derinkuyu'], colors: CP },
  },
  items,
};
