// Wave 12, the United Arab Emirates: the country layer and Dubai — no rulers or portraits, no Arabic writing,
// a mosque only as its own building, no camels or falcons, no theme parks or brands (docs/STOCK-ART.md §8)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const G = (cc, key, th, en, hth, hen, kw, svg) => ({ id: `${cc}.guide.${key}`, cat: 'guide', file: `${cc}/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });
const LM = (slug, th, en, kw, spot, svg) => ({ id: `ae-dubai.landmark.${slug}`, cat: 'landmark', file: `ae/dubai/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const flagShape = 'M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z';
const pole = Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A');
const band = (k, n, fill) => `<path d="M44 ${38 + (k + 0.5) * (112 / n)}c40-12 84 12 126 0s28-4 42 0" stroke="${fill}" stroke-width="${(112 / n + 1).toFixed(1)}" fill="none" stroke-linecap="butt"/>`;
const leaf = (x, y, r, fill = '#43A047', s = 1) => g(x, y, s, P('M0 0c14-14 34-14 46-2-16-2-32 0-46 2z', fill, 2.5), r);
const palm = (x, y, h, s = 1) => g(x, y, s, P(`M-4 0c-2-${h * 0.5} 2-${h * 0.8} 6-${h}h4c-4 ${h * 0.2}-6 ${h * 0.5}-4 ${h}z`, '#8D6E63', 2.5) + [-160, -125, -55, -20, -95].map((r) => leaf(4, -h, r, '#43A047')).join(''));
const INF = 'M' + Array.from({ length: 49 }, (_, k) => { const t = (k / 48) * Math.PI * 2, d = 1 + Math.sin(t) ** 2; return `${(120 + 104 * Math.cos(t) / d).toFixed(1)} ${(104 - 140 * Math.sin(t) * Math.cos(t) / d).toFixed(1)}`; }).join('L');
const AE = { k1: '#00732F', k2: '#C62828', k3: '#FFF8E1' };
const DX = { k1: '#1565C0', k2: '#B8860B', k3: '#E3F2FD' };

const items = [
  // ---------- the United Arab Emirates
  { id: 'ae.stamp', cat: 'stamp', file: 'ae/stamp.v1.svg', name: nm('ตราประทับสหรัฐอาหรับเอมิเรตส์', 'United Arab Emirates stamp'), kw: ['united arab emirates', 'สหรัฐอาหรับเอมิเรตส์', 'uae', 'ยูเออี'],
    // a date palm heavy with orange dates on a golden dune under a round sun
    svg: countryStamp({ name: 'EMIRATES', ...AE, emblem: C(136, 62, 14, '#FFCA28', 2.5) + P('M44 140c20-26 52-32 72-16s38-14 42 16z', '#FFB74D', 3) + P('M92 140c-2-30 0-50 6-68h6c-4 18-6 38-4 68z', '#8D6E63', 2.5)
      + [-165, -130, -95, -55, -18].map((r) => g(102, 72, 0.8, P('M0 0c14-14 34-14 46-2-16-2-32 0-46 2z', '#43A047', 2.5), r)).join('') + [[94, 82], [100, 86], [106, 82], [97, 90], [104, 91]].map(([x, y]) => C(x, y, 4, '#E65100', 1.5)).join('') }) },
  { id: 'ae.flag', ch: '🇦🇪', cat: 'flag', file: 'ae/flag.v1.svg', name: nm('ธงสหรัฐอาหรับเอมิเรตส์', 'Flag of the United Arab Emirates'), kw: ['united arab emirates', 'สหรัฐอาหรับเอมิเรตส์', 'uae', 'flag', 'ธง'],
    // green, white and black stripes with a red band down the side by the pole
    svg: free(pole + P(flagShape, '#FFFFFF') + band(0, 3, '#00732F') + band(2, 3, '#1B1B1B') + P('M44 38q18-5 36-4v112q-18-1-36 4z', '#E53935', 0) + P(flagShape, 'none')) },
  { id: 'ae.hello', cat: 'hello', file: 'ae/hello.v1.svg', name: nm('มัรฮะบา สวัสดี', 'Marhaba, hello'), kw: ['marhaba', 'มัรฮะบา', 'hello', 'สวัสดี', 'arabic', 'ภาษาอาหรับ', 'kandura', 'ชุดกันดูรา', 'ghutra'],
    // a child in a long white kandura robe and a white headscarf held by a black cord, waving hello with a big smile
    svg: free(P('M78 218l12-90h60l12 90z', '#FFFFFF') + Lc('M120 134v34', '#B0BEC5', 3) + C(120, 170, 3, '#B0BEC5', 0) + P('M146 140l22-44 12 6-20 44z', '#FFFFFF') + C(176, 94, 10, '#D7A86E') + P('M94 140l-16 40 12 4 14-38z', '#FFFFFF')
      + P('M86 92l-12 54 26-10 2-40zM154 92l12 54-26-10-2-40z', '#FFFFFF') + C(120, 102, 28, '#D7A86E') + P('M88 100c0-28 14-42 32-42s32 14 32 42c-8-12-18-16-32-16s-24 4-32 16z', '#FFFFFF') + Lc('M96 72q24-10 48 0', INK, 6)
      + face(120, 108, 0.55) + [[58, 70], [186, 50], [196, 150]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, '#FFCA28', 2)).join('')) },
  G('ae', 'maha', 'มาฮา', 'Maha', 'มัรฮะบา {name}! มาฮาพาเที่ยวเอมิเรตส์เอง', 'Marhaba, {name}! Maha will show you the Emirates', ['arabian oryx', 'ออริกซ์อาหรับ', 'oryx', 'ออริกซ์', 'national animal', 'สัตว์ประจำชาติ', 'antelope', 'แอนทีโลป'],
    // an Arabian oryx calf face-on: two long straight horns in a V, a white face with chocolate stripes down the cheeks and a brown nose
    Lc('M100 76L74 14', '#5D4037', 8) + Lc('M140 76L166 14', '#5D4037', 8) + [0, 1, 2, 3].map((k) => Lc(`M${92 - k * 5} ${62 - k * 11}l8-3M${148 + k * 5} ${62 - k * 11}l-8-3`, '#3E2723', 2)).join('')
      + g(62, 104, 1, E(0, 0, 26, 11, '#FFFFFF'), 25) + g(178, 104, 1, E(0, 0, 26, 11, '#FFFFFF'), -25) + g(62, 104, 1, E(0, 0, 14, 5, '#FFCDD2', 0), 25) + g(178, 104, 1, E(0, 0, 14, 5, '#FFCDD2', 0), -25)
      + E(120, 132, 54, 64, '#FFFFFF') + P('M82 126c-4 22 0 42 12 56l10-6c-8-14-12-32-8-50zM158 126c4 22 0 42-12 56l-10-6c8-14 12-32 8-50z', '#6D4C41', 0)
      + E(120, 180, 26, 16, '#6D4C41') + E(110, 180, 4, 5, INK, 0) + E(130, 180, 4, 5, INK, 0) + face(120, 116, 1.1, 'none')),
  G('ae', 'rimal', 'ริมาล', 'Rimal', 'ริมาลแมวทรายตัวจิ๋ว ชวน {name} ไปเดินเล่นบนเนินทราย', 'Rimal the little sand cat wants to explore the dunes with {name}', ['sand cat', 'แมวทราย', 'desert cat', 'แมวทะเลทราย', 'kitten', 'ลูกแมว', 'desert', 'ทะเลทราย'],
    // a sand cat kitten: a wide flat sandy head, huge ears set low and wide, soft stripes on the cheeks and a little pink nose
    P('M60 120L30 50l64 34z', '#E8C99B') + P('M180 120l30-70-64 34z', '#E8C99B') + P('M58 104L42 66l36 20z', '#FFCDD2', 0) + P('M182 104l16-38-36 20z', '#FFCDD2', 0) + E(120, 136, 70, 56, '#E8C99B')
      + Lc('M110 86v14M120 84v16M130 86v14', '#B07A45', 3) + Lc('M54 140h18M54 152l18-4M186 140h-18M186 152l-18-4', '#B07A45', 3) + E(120, 160, 24, 14, '#FFF3E0', 0) + P('M113 148h14l-7 8z', '#FF8FA3', 2) + face(120, 134, 1.2, 'w')
      + Lc('M92 164l-30 4M92 170l-28 12M148 164l30 4M148 170l28 12', INK, 1.5)),
  { id: 'ae.food.luqaimat', cat: 'food', file: 'ae/food-luqaimat.v1.svg', name: nm('ลูไกมัต ขนมแป้งทอดราดน้ำเชื่อมอินทผลัม', 'Luqaimat with date syrup'), kw: ['luqaimat', 'ลูไกมัต', 'sweet dumplings', 'แป้งทอดกลม', 'date syrup', 'น้ำเชื่อมอินทผลัม', 'dessert', 'ของหวาน', 'sesame', 'งา'], colour: true,
    // a plate piled with crispy golden dough balls drizzled with dark date syrup and sprinkled with sesame seeds
    svg: free(E(120, 186, 96, 22, '#ECEFF1') + E(120, 182, 76, 14, '#FFFFFF', 2) + [[70, 168], [106, 172], [142, 172], [176, 166], [88, 140], [124, 142], [158, 138], [106, 110], [142, 110], [124, 82]].map(([x, y]) => C(x, y, 19, '#F2B33D') + E(x - 6, y - 7, 6, 4, '#FFE082', 0)).join('')
      + Lc('M70 160c20-10 30 10 50-6s30 6 56 0M88 132c14-8 30 8 46-4s20 4 30 0M106 102c10-6 26 6 40-2', '#6D3B1F', 4) + [[80, 176], [116, 180], [150, 178], [98, 148], [134, 150], [118, 118], [130, 90], [168, 146]].map(([x, y]) => E(x, y, 2.5, 1.5, '#FFFDE7', 0)).join('') + face(124, 84, 0.3)) },
  { id: 'ae.food.dates', cat: 'food', file: 'ae/food-dates.v1.svg', name: nm('อินทผลัมในชามทองเหลือง', 'A bowl of dates'), kw: ['dates', 'อินทผลัม', 'khalas', 'คาลาส', 'date palm', 'ต้นอินทผลัม', 'sweet', 'ของหวาน', 'welcome', 'ต้อนรับ'], colour: true,
    // a shiny brass bowl heaped with glossy brown dates, a fresh green palm leaf tucked behind and a few dates on the table
    svg: free(leaf(60, 108, -150, '#66BB6A', 1.6) + leaf(180, 108, -30, '#43A047', 1.6) + [[86, 112], [104, 102], [122, 98], [140, 102], [158, 112], [96, 122], [116, 116], [136, 116], [154, 124], [106, 92], [130, 88]].map(([x, y], k) => g(x, y, 1, E(0, 0, 13, 8, ['#7B3F1E', '#8D4A24', '#6D3518'][k % 3]) + E(-4, -3, 4, 2, '#C1693C', 0), (k * 37) % 60 - 30)).join('')
      + P('M50 126h140c0 40-30 64-70 64s-70-24-70-64z', '#E0B040') + Lc('M58 142h124', '#B8860B', 3) + R(100, 186, 40, 14, '#E0B040', 4) + [[36, 206], [204, 204]].map(([x, y], k) => g(x, y, 1, E(0, 0, 13, 8, '#7B3F1E'), k ? 20 : -20)).join('') + face(120, 160, 0.5)) },
  { id: 'ae.food.karak', cat: 'food', file: 'ae/food-karak.v1.svg', name: nm('ชาการัก ชานมใส่กระวาน', 'A glass of karak tea'), kw: ['karak', 'การัก', 'karak chai', 'chai karak', 'milk tea', 'ชานม', 'cardamom', 'กระวาน', 'tea stall', 'ร้านชา'], colour: true,
    // a small glass of creamy caramel-coloured spiced milk tea on a white saucer, curls of steam and green cardamom pods beside it
    svg: free(E(120, 192, 64, 14, '#FFFFFF') + P('M88 76h64l-10 112h-44z', '#E3F2FD') + P('M92 96h56l-8 88h-40z', '#C8894A', 0) + E(120, 96, 28, 5, '#E0B07A', 0) + P('M88 76h64l-10 112h-44z', 'none') + Lc('M100 104l4 70', '#FFFFFF', 3)
      + Lc('M106 64c-8-10 8-16 0-28M126 62c-8-10 8-16 0-28', '#B0BEC5', 4) + [[40, 196, -30], [56, 206, 10], [196, 198, 30]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 10, 6, '#9CCC65') + Lc('M-8 0h16', '#689F38', 1.5), r)).join('') + face(120, 138, 0.45)) },
  { id: 'ae.food.machboos', cat: 'food', file: 'ae/food-machboos.v1.svg', name: nm('ข้าวมัจบูส ข้าวหมกเครื่องเทศ', 'Machboos spiced rice'), kw: ['machboos', 'มัจบูส', 'majboos', 'spiced rice', 'ข้าวหมกเครื่องเทศ', 'chicken and rice', 'ข้าวไก่', 'emirati food', 'อาหารเอมิเรตส์', 'lunch'], colour: true,
    // a big round platter heaped with saffron-orange spiced rice, a roast chicken leg on top, raisins, almonds and crispy onions, a lime half
    svg: free(E(120, 170, 104, 34, '#B0BEC5') + E(120, 166, 92, 26, '#ECEFF1', 2) + P('M40 166c0-40 36-70 80-70s80 30 80 70c-40 10-120 10-160 0z', '#F4B860') + Array.from({ length: 18 }, (_, k) => E(56 + (k % 6) * 26, 132 + Math.floor(k / 6) * 12 + (k % 2) * 4, 3.5, 1.6, '#FFE0A0', 0)).join('')
      + Lc('M132 92l26-22', '#FFF8E1', 9) + C(162, 66, 6, '#FFF8E1', 2.5) + C(154, 70, 6, '#FFF8E1', 2.5) + E(118, 102, 30, 20, '#B5652D') + E(108, 96, 10, 5, '#D7894E', 0) + [[76, 136], [94, 120], [150, 128], [170, 146], [64, 154]].map(([x, y]) => E(x, y, 4, 3, '#4E2A15', 0)).join('')
      + [[86, 150], [140, 148], [160, 120]].map(([x, y]) => E(x, y, 5, 3, '#FFF3E0', 1.5)).join('') + Lc('M100 122c6-4 10 2 16-2M134 112c6-4 10 2 16-2', '#8D4A24', 2.5) + P('M196 170c0-14 22-14 22 0z', '#AED581', 2.5) + face(118, 104, 0.35)) },
  { id: 'ae.food.balaleet', cat: 'food', file: 'ae/food-balaleet.v1.svg', name: nm('บาลาลีต เส้นหมี่หวานโปะไข่', 'Balaleet, sweet noodles with an omelette'), kw: ['balaleet', 'บาลาลีต', 'sweet vermicelli', 'เส้นหมี่หวาน', 'omelette', 'ไข่เจียว', 'saffron', 'หญ้าฝรั่น', 'emirati breakfast', 'อาหารเช้า'], colour: true,
    // a bowl of golden saffron-sweet vermicelli noodles in wiggles, a thin round omelette laid on top, a few red saffron threads
    svg: free(Array.from({ length: 7 }, (_, k) => Lc(`M${56 + k * 4} ${110 + (k % 3) * 6}c10-10 20 10 30 0s20 10 30 0s20 10 30 0s20 10 ${28 - k * 2} 0`, ['#FFD54F', '#FFB300'][k % 2], 4)).join('')
      + E(120, 108, 52, 15, '#FFE082') + [[100, 106], [128, 102], [146, 110], [112, 114]].map(([x, y]) => E(x, y, 5, 2.5, '#E0A030', 0)).join('') + Lc('M88 104l8 4M150 100l6 6M132 116l8-2', '#D84315', 2)
      + P('M48 120h144c0 46-32 74-72 74s-72-28-72-74z', '#4DB6AC') + Lc('M58 142c20 8 104 8 124 0', '#FFFFFF', 3) + Array.from({ length: 5 }, (_, k) => C(76 + k * 22, 160, 4, '#FFFFFF', 0)).join('') + face(120, 106, 0.35)) },
  { id: 'ae.food.chebab', cat: 'food', file: 'ae/food-chebab.v1.svg', name: nm('เชบาบ แพนเค้กกระวานเอมิเรตส์', 'Chebab, Emirati pancakes'), kw: ['chebab', 'เชบาบ', 'emirati pancakes', 'แพนเค้กเอมิเรตส์', 'cardamom', 'กระวาน', 'cream cheese', 'ครีมชีส', 'date syrup', 'น้ำเชื่อมอินทผลัม'], colour: true,
    // a stack of three small thick golden pancakes speckled with cardamom, a dollop of white cream cheese on top and dark date syrup dripping down
    svg: free(E(120, 190, 92, 18, '#E1F5FE') + [[176, 0], [150, 1], [124, 2]].map(([y, k]) => E(120, y, 58, 16, '#E8A84A') + E(120, y - 6, 56, 10, '#F4C27A', 0) + [-30, -10, 12, 32].map((dx) => C(120 + dx + k * 4, y - 6 + (dx % 3), 2, '#6D4C41', 0)).join('')).join('')
      + P('M80 122c10 14 0 30 6 40 6-10 2-24 12-36M150 124c4 10 0 26 6 34 6-8 0-22 6-30', '#5D2E14', 2) + P('M90 120c0-18 60-18 60 0-10 10-50 10-60 0z', '#6D3B1F') + P('M100 112c0-20 40-20 40 0-8 8-32 8-40 0z', '#FFFFFF') + face(120, 156, 0.4)) },
  { id: 'ae.transport.dhow', cat: 'transport', file: 'ae/transport-dhow.v1.svg', name: nm('เรือเดาว์ไม้แล่นใบ', 'A wooden dhow under sail'), kw: ['dhow', 'เรือเดาว์', 'wooden boat', 'เรือไม้', 'lateen sail', 'ใบเรือสามเหลี่ยม', 'trading boat', 'เรือสินค้า', 'dhow cruise', 'ล่องเรือ'], colour: true,
    // a curved wooden trading boat with a high carved stern and a big slanted triangle sail on a long tilted pole, waves below
    svg: free(Lc('M122 150V56', '#6D4C41', 6) + Lc('M52 128L206 34', '#6D4C41', 5) + P('M58 124L200 40l-46 104z', '#FFF8E1') + Lc('M100 100l40 38M140 74l20 60', '#E0D6C0', 2.5)
      + P('M20 132c14 6 30 10 50 10h112l36-24c-4 30-22 50-50 54H66c-26 0-40-18-46-40z', '#A1673F') + Lc('M30 152h170M44 166h146', '#8D5524', 2.5) + R(178, 118, 26, 14, '#8D5524', 2) + [92, 120, 148].map((x) => C(x, 158, 4, '#FFCA28', 2)).join('')
      + P('M8 190c20-10 40 10 60 0s40 10 60 0 40 10 60 0 30 8 44 2v30H8z', '#4FC3F7') + Lc('M24 204c10-6 20 6 30 0M150 206c10-6 20 6 30 0', '#FFFFFF', 3) + face(110, 156, 0.35)) },
  { id: 'ae.transport.dunebash', cat: 'transport', file: 'ae/transport-dunebash.v1.svg', name: nm('รถโฟร์วีลตะลุยเนินทรายแดง', 'A 4×4 over the red dunes'), kw: ['desert safari', 'ซาฟารีทะเลทราย', 'dune bashing', 'ขับรถตะลุยเนินทราย', '4x4', 'รถโฟร์วีล', 'red dunes', 'เนินทรายแดง', 'desert drive'], colour: true,
    // a chunky white 4×4 tipping over the crest of a big orange-red dune, sand spraying from its wheels, a smaller dune behind
    svg: free(P('M8 150c40-20 70-20 100 0s60-30 124-10v80H8z', '#F4A25B') + P('M8 220c30-70 120-110 224-60v60z', '#E8853B') + Lc('M40 210c40-40 100-60 170-50', '#F4B27A', 3)
      + g(118, 130, 1, R(-56, -26, 112, 40, '#FFFFFF', 10) + P('M-34-26l10-28h52l12 28z', '#FFFFFF') + R(-24, -48, 20, 18, '#B3E5FC', 3, 2.5) + R(4, -48, 20, 18, '#B3E5FC', 3, 2.5) + Lc('M-30-58h56', INK, 4) + R(40, -16, 14, 8, '#FFF59D', 2, 2) + Lc('M-56 0h112', '#E53935', 4)
        + [[-34, 16], [34, 16]].map(([x, y]) => C(x, y, 17, INK) + C(x, y, 7, '#B0BEC5', 0)).join('') + face(-6, -6, 0.3), -14)
      + [[48, 168], [36, 152], [58, 150], [28, 172], [46, 138]].map(([x, y], k) => C(x, y, 5 - (k % 3), '#F4B27A', 2)).join('')) },
  { id: 'ae.culture.sandart', cat: 'culture', file: 'ae/culture-sandart.v1.svg', name: nm('ขวดศิลปะทรายสี', 'A bottle of sand art'), kw: ['sand art', 'ศิลปะทราย', 'coloured sand', 'ทรายสี', 'sand bottle', 'ขวดทราย', 'souvenir', 'ของฝาก', 'craft', 'งานฝีมือ'], colour: true,
    // a clear bottle filled with layers of coloured sand making a little desert picture: red and gold dunes, a blue sky band and a tiny palm
    svg: free(R(102, 18, 36, 18, '#A1673F', 4) + P('M100 36h40v30c26 10 36 32 36 62v70c0 10-6 16-16 16H80c-10 0-16-6-16-16v-70c0-30 10-52 36-62z', '#E3F2FD')
      + P('M68 126h104v18c-30-14-64 10-104-2z', '#81D4FA', 0) + P('M68 142c40 12 74-12 104 2v20c-34-16-60 14-104 0z', '#FFD54F', 0) + P('M68 164c44 14 70-16 104 0v20c-30-10-66 12-104 0z', '#FF8A65', 0) + P('M68 184c36 12 74-10 104 0v6c0 8-6 14-14 14H82c-8 0-14-6-14-14z', '#E53935', 0)
      + Lc('M140 152v-18', '#6D4C41', 3) + [-150, -100, -40].map((r) => g(140, 134, 0.35, P('M0 0c14-14 34-14 46-2-16-2-32 0-46 2z', '#2E7D32', 0), r)).join('') + C(92, 112, 7, '#FFF59D', 0)
      + P('M100 36h40v30c26 10 36 32 36 62v70c0 10-6 16-16 16H80c-10 0-16-6-16-16v-70c0-30 10-52 36-62z', 'none') + Lc('M80 120v70', '#FFFFFF', 4) + face(120, 90, 0.4)) },
  { id: 'ae.culture.khoos', cat: 'culture', file: 'ae/culture-khoos.v1.svg', name: nm('ตะกร้าสานใบปาล์มกับฝาชีทรงกรวย', 'A woven palm-leaf basket and food cover'), kw: ['khoos', 'คูส', 'palm weaving', 'สานใบปาล์ม', 'basket', 'ตะกร้า', 'food cover', 'ฝาชี', 'handicraft', 'หัตถกรรม'], colour: true,
    // a round basket woven from dried palm leaves with bright purple, red and green zigzag bands, and a tall cone-shaped woven food cover beside it
    svg: free(P('M30 110h112l-10 92c-10 10-82 10-92 0z', '#E8C27A') + [126, 150, 174].map((y, k) => Lc(`M${36 + k * 3} ${y}l10-8 10 8 10-8 10 8 10-8 10 8 10-8 10 8 10-8 ${10 - k * 2} 8`, ['#8E24AA', '#E53935', '#43A047'][k], 5)).join('') + E(86, 110, 56, 10, '#F4D9A0') + Lc('M44 110c0-40 84-40 84 0', '#C8962F', 6)
      + P('M146 204l34-150 34 150z', '#F4D9A0') + [86, 118, 150, 182].map((y, k) => Lc(`M${180 - (y - 54) * 0.227} ${y}h${(y - 54) * 0.454}`, ['#E53935', '#8E24AA', '#43A047', '#FFB300'][k], 5)).join('') + C(180, 52, 6, '#E53935', 2.5) + E(180, 204, 34, 6, '#E0B060')
      + face(86, 186, 0.35)) },
  { id: 'ae.culture.sadu', cat: 'culture', file: 'ae/culture-sadu.v1.svg', name: nm('เบาะมัจลิสลายผ้าทอซาดู', 'Majlis cushions in Al Sadu weave'), kw: ['al sadu', 'ซาดู', 'sadu weaving', 'ผ้าทอซาดู', 'majlis', 'มัจลิส', 'cushions', 'เบาะ', 'bedouin', 'เบดูอิน'], colour: true,
    // a low floor seat with a long back cushion and arm bolsters woven in red, black and white Al Sadu stripes and triangles, a rug in front
    svg: free(P('M14 196h212l-12 26H26z', '#8D6E63') + Lc('M30 210h180', '#FFCA28', 3) + R(24, 104, 192, 52, '#C62828', 12) + Lc('M30 116h180M30 146h180', '#1B1B1B', 4) + Array.from({ length: 9 }, (_, k) => P(`M${36 + k * 20} 140l10-18 10 18z`, k % 2 ? '#FFFFFF' : '#1B1B1B', 2)).join('')
      + R(14, 154, 212, 36, '#B71C1C', 10) + Array.from({ length: 10 }, (_, k) => P(`M${24 + k * 20} 172l10-8 10 8-10 8z`, ['#FFFFFF', '#FFCA28'][k % 2], 2)).join('') + [[22, 150], [218, 150]].map(([x, y]) => E(x, y, 16, 26, '#1B1B1B') + Lc(`M${x - 12} ${y - 8}h24M${x - 12} ${y + 8}h24`, '#FFFFFF', 3)).join('') + face(120, 128, 0.35)) },
  { id: 'ae.culture.pearl', cat: 'culture', file: 'ae/culture-pearl.v1.svg', name: nm('หอยมุกกับไข่มุกจากการดำน้ำงมมุก', 'An oyster pearl from the pearl divers'), kw: ['pearl diving', 'ดำน้ำงมมุก', 'pearl', 'ไข่มุก', 'oyster', 'หอยมุก', 'pearling', 'heritage', 'มรดก', 'diver'], colour: true,
    // a big open oyster shell with a shiny round pearl smiling inside, a string of pearls looping round the front
    svg: free(P('M46 150c-6-56 36-100 74-100s82 44 74 100c-26-22-122-22-148 0z', '#90A4AE') + Array.from({ length: 6 }, (_, k) => Lc(`M120 140L${58 + k * 25} ${84 - Math.sin((k / 5) * Math.PI) * 28}`, '#78909C', 2.5)).join('')
      + P('M40 156c4-24 40-34 80-34s76 10 80 34c-20 30-140 30-160 0z', '#B0BEC5') + E(120, 152, 64, 18, '#F3E5F5') + C(120, 140, 22, '#FFFFFF') + E(112, 132, 6, 4, '#E1F5FE', 0) + face(120, 142, 0.4)
      + Array.from({ length: 13 }, (_, k) => C(44 + k * 12.6, 196 + Math.sin((k / 12) * Math.PI) * 14, 6, '#FFFFFF', 2)).join('')) },
  { id: 'ae.culture.ghaf', cat: 'culture', file: 'ae/culture-ghaf.v1.svg', name: nm('ต้นกาฟต้นไม้ประจำชาติ', 'The ghaf tree'), kw: ['ghaf tree', 'ต้นกาฟ', 'national tree', 'ต้นไม้ประจำชาติ', 'desert tree', 'ต้นไม้ทะเลทราย', 'shade', 'ร่มเงา', 'desert'], colour: true,
    // a lone ghaf tree with a twisty trunk and a wide drooping canopy of fine pale-green leaves standing on golden sand
    svg: free(E(120, 206, 100, 16, '#F4D19B') + P('M104 206c4-30-10-50 4-74l12 4c-10 22 8 40 4 70z', '#6D4C41') + Lc('M112 150l-34-22M118 140l38-26', '#6D4C41', 6)
      + [[70, 104, 34], [120, 86, 40], [170, 104, 34], [94, 118, 30], [148, 120, 30]].map(([x, y, r], k) => C(x, y, r, ['#9CCC65', '#AED581', '#8BC34A'][k % 3])).join('') + Array.from({ length: 9 }, (_, k) => Lc(`M${48 + k * 18} ${120 + (k % 2) * 8}c-2 14 2 22 0 34`, '#7CB342', 3)).join('')
      + Array.from({ length: 6 }, (_, k) => C(70 + k * 20, 96 + (k % 2) * 10, 3, '#FFF59D', 0)).join('') + face(120, 176, 0.35)) },
  { id: 'ae.animal.gazelle', cat: 'animal', file: 'ae/animal-gazelle.v1.svg', name: nm('ละมั่งทรายอาหรับ', 'An Arabian sand gazelle'), kw: ['gazelle', 'ละมั่ง', 'sand gazelle', 'ละมั่งทราย', 'reem', 'desert reserve', 'เขตอนุรักษ์ทะเลทราย', 'wildlife', 'สัตว์ป่า'], colour: true,
    // a slim pale sand gazelle standing on a dune, lyre-shaped ringed horns curving back, a dark stripe along its side, a white tummy and a flicking tail
    svg: free(P('M8 214c50-20 120-26 224-8v20H8z', '#F4D19B') + [[96, 150], [108, 150], [152, 150], [164, 152]].map(([x, y]) => R(x - 4, y, 8, 58, '#D9B47E', 3)).join('')
      + E(130, 136, 46, 24, '#D9B47E') + P('M88 138c20 6 64 6 84 0-6 14-76 14-84 0z', '#FFFFFF', 2.5) + Lc('M90 132c24 4 56 4 80 0', '#8D6E63', 4) + P('M174 128c10-6 14-2 12 8z', '#5D4037', 2.5)
      + P('M90 128c-8-20-8-36 0-46l14 6c-6 10-4 26 2 40z', '#D9B47E') + E(84, 78, 18, 22, '#D9B47E') + Lc('M80 58c-6-14-2-28 8-34M92 58c0-14 6-24 16-26', '#5D4037', 4) + [0, 1, 2].map((k) => Lc(`M${78 - k} ${50 - k * 8}h6M${92 + k * 2} ${50 - k * 7}h6`, '#3E2723', 1.5)).join('')
      + E(66, 62, 11, 5, '#D9B47E') + E(102, 60, 11, 5, '#D9B47E') + E(84, 96, 7, 4, INK, 0) + Lc('M76 70v18M92 70v18', '#FFFFFF', 3) + face(84, 78, 0.45, 'none')) },
  { id: 'ae.animal.hamour', cat: 'animal', file: 'ae/animal-hamour.v1.svg', name: nm('ปลาเก๋าฮามูร์', 'A hamour grouper'), kw: ['hamour', 'ฮามูร์', 'grouper', 'ปลาเก๋า', 'fish', 'ปลา', 'arabian gulf', 'อ่าวอาหรับ', 'seafood', 'อาหารทะเล'], colour: true,
    // a chubby orange-brown grouper covered in dark spots with big pouty lips, swimming past a pink coral and bubbles
    svg: free(P('M30 214c0-30 10-50 24-50s10 30 20 20 16-20 20 4l2 26z', '#F48FB1') + P('M196 120l36-30v68z', '#C1693C') + P('M110 80c20-20 56-14 60 6zM120 160c20 18 44 16 50 0z', '#B5652D')
      + E(120, 120, 82, 46, '#D9844C') + Array.from({ length: 16 }, (_, k) => C(90 + (k % 6) * 18, 98 + Math.floor(k / 6) * 18 + (k % 2) * 6, 4, '#7B3F1E', 0)).join('') + P('M40 112c-6 4-6 14 0 18 8 2 14-2 16-8-2-8-8-12-16-10z', '#E57373') + Lc('M48 116h10', INK, 2)
      + E(116, 130, 14, 10, '#E8A06A', 0) + face(80, 110, 0.5, 'none') + [[30, 70], [20, 44], [42, 30]].map(([x, y], k) => C(x, y, 6 - k, '#E1F5FE', 2)).join('')) },

  // ---------- Dubai
  { id: 'ae-dubai.stamp', cat: 'stamp', file: 'ae/dubai/stamp.v1.svg', name: nm('ตราประทับดูไบ', 'Dubai stamp'), kw: ['dubai', 'ดูไบ', 'deira', 'เดียรา', 'jumeirah', 'จูไมราห์', 'dubai marina'],
    // a white sail-shaped hotel tower on its own little island in a blue sea
    svg: cityStamp('aed-st', { name: 'DUBAI', sub: 'UAE', ...DX, emblem: P('M52 132c16-6 32 4 48 0s32-6 48 0v12H52z', '#4FC3F7', 3) + E(98, 132, 26, 5, '#F4D19B', 2.5) + P('M88 130V58c26 14 36 40 30 72z', '#FFFFFF', 3) + Lc('M88 130V52', INK, 3) + Lc('M90 72l24 20M90 100l28 4', '#90A4AE', 2) + E(118, 80, 10, 3, '#FFFFFF', 2.5) }) },
  { id: 'ae-dubai.day.skyline', cat: 'day', file: 'ae/dubai/day-skyline.v1.svg', name: nm('เส้นขอบฟ้าดูไบกับตึกสูงที่สุดในโลก', 'Dubai skyline with the world\'s tallest tower'), kw: ['dubai skyline', 'เส้นขอบฟ้าดูไบ', 'downtown dubai', 'ดาวน์ทาวน์ดูไบ', 'burj khalifa', 'เบิร์จคาลิฟา', 'skyscrapers', 'ตึกระฟ้า', 'dubai', 'ดูไบ', 'sunset'],
    // a sunset over downtown: the tallest needle tower in the middle, glassy towers on both sides, a desert edge and tiny palms
    svg: scene('aed-d1', '#FFCC80', C(176, 72, 22, '#FFF59D', 0) + P('M-4 120c60-6 160-6 248 0v130H-4z', '#FFE0B2', 0)
      + [[10, 150, 26, '#90CAF9'], [40, 120, 22, '#B0BEC5'], [64, 140, 20, '#80DEEA'], [150, 128, 24, '#B0BEC5'], [176, 104, 22, '#90CAF9'], [200, 136, 26, '#80DEEA']].map(([x, y, w, c]) => R(x, y, w, 120, c) + Array.from({ length: 4 }, (_, k) => Lc(`M${x + 5} ${y + 12 + k * 18}h${w - 10}`, '#FFF59D', 3)).join('')).join('')
      + P('M84 250V180h10v-40h9v-40h8V60h5V30h8v45h6v40h9v40h8v40h9v55z', '#CFD8DC') + Lc('M120 30V8', INK, 3) + Lc('M120 36v200', '#ECEFF1', 4) + R(-4, 214, 248, 40, '#F4D19B')
      + [30, 70, 170, 210].map((x) => palm(x, 222, 22, 0.6)).join('') + face(120, 200, 0.35)) },
  { id: 'ae-dubai.day.beach', cat: 'day', file: 'ae/dubai/day-beach.v1.svg', name: nm('ชายหาดจูไมราห์ในดูไบ', 'Jumeirah Beach in Dubai'), kw: ['jumeirah beach', 'หาดจูไมราห์', 'kite beach', 'beach day', 'วันเที่ยวทะเล', 'swimming', 'ว่ายน้ำ', 'sandcastle bucket', 'dubai', 'ดูไบ'],
    // a turquoise sea and pale sand, a striped umbrella and a bucket and spade in front, palms, and the sail-shaped hotel far out on the water
    svg: scene('aed-d2', '#B3E5FC', C(60, 60, 18, '#FFF59D', 0) + P('M-4 120h248v40H-4z', '#26C6DA') + Lc('M10 136h40M90 142h50M180 134h40', '#E0F7FA', 3) + E(196, 122, 18, 4, '#F4D19B', 2) + P('M190 120V70c14 8 18 26 14 50z', '#FFFFFF', 3) + Lc('M190 120V66', INK, 2.5)
      + P('M-4 160c60-10 160-10 248 0v90H-4z', '#FBE3B4') + Lc('M84 236V150', '#8D6E63', 4) + P('M40 156c0-30 88-30 88 0z', '#FFFFFF') + P('M62 156c0-24 22-30 22-30s22 6 22 30z', '#EF5350', 0) + P('M40 156c0-30 88-30 88 0z', 'none')
      + P('M150 200h30l-4 30h-22z', '#29B6F6') + Lc('M150 200c0-14 30-14 30 0', INK, 3) + Lc('M190 190l-10 40', '#FFCA28', 5) + palm(26, 190, 50, 0.8) + palm(222, 196, 46, 0.7) + face(165, 214, 0.3)) },
  LM('burjkhalifa', 'ตึกเบิร์จคาลิฟาสูงที่สุดในโลก', 'Burj Khalifa, the tallest tower in the world', ['burj khalifa', 'เบิร์จคาลิฟา', 'tallest building', 'ตึกสูงที่สุดในโลก', 'at the top', 'จุดชมวิว', 'observation deck', 'ชั้นชมวิว', 'downtown', 'ดาวน์ทาวน์'],
    nm('หาตึกที่สูงที่สุดในโลกที่ยอดแหลมเหมือนเข็ม', 'Find the tallest tower in the world with a top like a needle'),
    // a silver needle tower rising in uneven steps from a wide base to a thin spire, glinting stars round the tip, palms at its foot
    P('M84 218V180h10v-40h9v-40h8V60h5V30h8v45h6v40h9v40h8v40h9v38z', '#CFD8DC') + Lc('M120 30V6', INK, 3) + Lc('M120 36v178', '#ECEFF1', 4) + Lc('M100 150v60M140 156v54', '#B0BEC5', 3)
    + [[96, 26], [148, 50], [88, 66]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, '#FFCA28', 2)).join('') + E(120, 220, 90, 10, '#B2DFDB') + palm(52, 218, 40, 0.7) + palm(190, 218, 40, 0.7) + face(120, 196, 0.45)),
  LM('burjalarab', 'โรงแรมเบิร์จอัลอาหรับรูปใบเรือ', 'Burj Al Arab, the sail-shaped hotel', ['burj al arab', 'เบิร์จอัลอาหรับ', 'sail hotel', 'โรงแรมรูปใบเรือ', 'helipad', 'ลานจอดเฮลิคอปเตอร์', 'island hotel', 'jumeirah', 'จูไมราห์'],
    nm('หาตึกรูปใบเรือที่มีลานกลมยื่นออกมาด้านข้าง', 'Find the sail-shaped tower with a round pad sticking out'),
    // a white sail-shaped tower on its own little island, a criss-cross frame on its edge, a round landing pad sticking out near the top, a curved bridge
    P('M8 196c30-10 60 8 90 0s60-8 90 0 30 4 44 2v30H8z', '#4FC3F7') + E(110, 196, 70, 12, '#F4D19B') + Lc('M170 194c20-4 40-4 62 2', '#ECEFF1', 6) + Lc('M170 194c20-4 40-4 62 2', INK, 1.5)
    + P('M78 192V28c66 30 96 92 80 164z', '#FFFFFF') + Lc('M78 192V20', INK, 5) + Array.from({ length: 6 }, (_, k) => Lc(`M80 ${44 + k * 26}l${36 + k * 6} 13`, '#90A4AE', 2.5)).join('') + Lc('M78 192h80', INK, 4)
    + E(148, 64, 18, 5, '#FFFFFF') + Lc('M140 66l8 12', INK, 3) + C(148, 62, 3, '#E53935', 0) + face(114, 140, 0.45)),
  LM('frame', 'กรอบรูปยักษ์ดูไบเฟรม', 'The Dubai Frame', ['dubai frame', 'ดูไบเฟรม', 'giant picture frame', 'กรอบรูปยักษ์', 'glass floor', 'พื้นกระจก', 'zabeel park', 'สวนซาบีล', 'old and new dubai'],
    nm('หากรอบรูปสีทองที่ใหญ่เท่าตึก', 'Find the golden picture frame as big as a building'),
    // a giant golden picture frame standing on end, a glass bridge across its top, little old and new buildings seen through the middle
    R(62, 18, 116, 196, '#E0B040', 6) + R(86, 44, 68, 160, '#B3E5FC', 0) + R(86, 18, 68, 26, '#81D4FA', 0) + Lc('M88 31h64', '#FFFFFF', 2) + R(62, 18, 116, 196, 'none', 6) + R(86, 44, 68, 160, 'none', 0)
    + [[92, 160, 14], [110, 120, 10], [124, 140, 12], [140, 104, 10]].map(([x, y, w]) => R(x, y, w, 204 - y, '#90A4AE', 0, 2.5)).join('') + R(90, 180, 16, 24, '#E6C9A0', 0, 2.5) + Array.from({ length: 8 }, (_, k) => Lc(`M66 ${56 + k * 20}h16M158 ${56 + k * 20}h16`, '#B8860B', 2.5)).join('')
    + E(120, 218, 96, 8, '#AED581') + face(120, 192, 0.3).replace(/cy="192"/g, 'cy="192"')),
  LM('museumfuture', 'พิพิธภัณฑ์แห่งอนาคตรูปวงแหวน', 'The Museum of the Future, a silver ring', ['museum of the future', 'พิพิธภัณฑ์แห่งอนาคต', 'silver ring building', 'ตึกวงแหวนสีเงิน', 'torus', 'future', 'อนาคต', 'robots', 'หุ่นยนต์', 'sheikh zayed road'],
    nm('หาตึกสีเงินรูปไข่ที่มีรูโหว่ตรงกลาง', 'Find the silver egg-shaped building with a hole in the middle'),
    // a shining silver oval ring of a building with a big hole through it, dotted window patterns all over, sitting on a green grassy hill
    P('M20 210c20-40 60-56 100-56s80 16 100 56z', '#81C784') + E(120, 108, 72, 92, '#CFD8DC') + E(130, 108, 32, 56, '#E1F5FE') + Array.from({ length: 24 }, (_, k) => { const a = (k / 24) * Math.PI * 2; return Lc(`M${(120 + Math.cos(a) * 56).toFixed(1)} ${(108 + Math.sin(a) * 76).toFixed(1)}l${(Math.cos(a + 1.2) * 6).toFixed(1)} ${(Math.sin(a + 1.2) * 6).toFixed(1)}`, '#78909C', 3); }).join('')
    + Lc('M64 70c-6 20-6 50 2 70', '#FFFFFF', 4) + [[180, 36], [60, 28]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, '#80DEEA', 2)).join('') + face(78, 160, 0.35)),
  LM('palm', 'เกาะปาล์มจูไมราห์มองจากฟ้า', 'Palm Jumeirah seen from the sky', ['palm jumeirah', 'ปาล์มจูไมราห์', 'palm island', 'เกาะรูปต้นปาล์ม', 'man-made island', 'เกาะเทียม', 'from the sky', 'มองจากฟ้า', 'crescent'],
    nm('หาเกาะที่หน้าตาเหมือนต้นปาล์มกลางทะเล', 'Find the island shaped like a palm tree in the sea'),
    // an island shaped like a palm tree seen from above: a sandy trunk and a fan of frond fingers with green dots of trees, ringed by a crescent wall in the blue sea
    E(120, 116, 108, 100, '#4FC3F7') + P('M26 104c4-60 50-92 94-92s90 32 94 92l-14 2c-4-50-40-80-80-80s-76 30-80 80z', '#FBE3B4') + R(112, 120, 16, 100, '#FBE3B4', 4)
    + Array.from({ length: 9 }, (_, k) => { const a = Math.PI * (1.05 + (k / 8) * 0.9); return Lc(`M120 124l${(Math.cos(a) * 74).toFixed(1)} ${(Math.sin(a) * 74).toFixed(1)}`, '#FBE3B4', 11) + Lc(`M120 124l${(Math.cos(a) * 74).toFixed(1)} ${(Math.sin(a) * 74).toFixed(1)}`, '#66BB6A', 3); }).join('')
    + C(120, 124, 14, '#FBE3B4') + Lc('M28 98c8-50 44-80 92-82M212 98c-8-50-44-80-92-82', INK, 1.5) + face(120, 178, 0.35)),
  LM('abra', 'นั่งเรืออับราข้ามลำน้ำดูไบ', 'An abra across Dubai Creek', ['abra', 'เรืออับรา', 'water taxi', 'เรือข้ามฟาก', 'dubai creek', 'ลำน้ำดูไบ', 'bur dubai', 'บูร์ดูไบ', 'one dirham ride'],
    nm('หาเรือไม้หลังคาแบนที่มียางรถห้อยข้างเรือ', 'Find the wooden boat with a flat roof and tyres hanging on its side'),
    // a low wooden boat with a flat roof on thin posts, a bench of passengers and old black tyres hanging along its side, crossing green-blue water
    P('M8 120h224v100H8z', '#4DB6AC') + Lc('M20 150c14-6 28 6 42 0M150 196c14-6 28 6 42 0M30 206c14-6 28 6 42 0', '#E0F2F1', 3)
    + R(40, 66, 160, 12, '#8D6E63', 3) + [50, 90, 150, 190].map((x) => Lc(`M${x} 78v52`, '#6D4C41', 4)).join('') + R(60, 112, 120, 10, '#A1887F', 2)
    + [[76, 102, '#FFCA28'], [104, 100, '#EF5350'], [136, 102, '#42A5F5'], [164, 100, '#AB47BC']].map(([x, y, c]) => R(x - 9, y, 18, 16, c, 6) + C(x, y - 8, 9, '#D7A86E')).join('')
    + P('M24 128h192c6 0 10 6 6 14l-14 26H36l-16-26c-4-8-2-14 4-14z', '#A1673F') + Lc('M30 144h180', '#8D5524', 3) + [60, 104, 148, 190].map((x) => C(x, 154, 8, INK) + C(x, 154, 3, '#757575', 0)).join('') + face(120, 156, 0.3)),
  LM('miraclegarden', 'ซุ้มดอกไม้ในสวนมิราเคิลการ์เดน', 'Flower arches in the Miracle Garden', ['miracle garden', 'มิราเคิลการ์เดน', 'flower garden', 'สวนดอกไม้', 'flower arches', 'ซุ้มดอกไม้', 'petunias', 'flowers', 'ดอกไม้'],
    nm('หาซุ้มประตูที่ทำจากดอกไม้หลากสีทั้งซุ้ม', 'Find the arch made all of colourful flowers'),
    // three arches one behind another covered all over in pink, yellow and purple flowers, a path running through and flower beds either side
    [[0, '#CE93D8', '#8E24AA'], [1, '#FFE082', '#FFB300'], [2, '#F48FB1', '#E91E63']].map(([k, c, d]) => { const w = 92 - k * 18, top = 40 + k * 22; return P(`M${120 - w} 200V${top + 50}c0-${70 - k * 10} ${w * 2} -${70 - k * 10} ${w * 2} 0V200h-22V${top + 54}c0-${44 - k * 8} -${w * 2 - 44} -${44 - k * 8} -${w * 2 - 44} 0V200z`, c) + Array.from({ length: 10 }, (_, j) => { const a = Math.PI * (1 + j / 9); return C(120 + Math.cos(a) * (w - 11), top + 54 + Math.sin(a) * (54 - k * 6), 4, d, 0); }).join(''); }).join('')
    + P('M96 220l12-40h24l12 40z', '#E0C9A6') + [[30, 212], [62, 214], [178, 214], [210, 212]].map(([x, y], k) => C(x, y, 12, ['#EF5350', '#FFCA28', '#AB47BC', '#EC407A'][k]) + C(x, y, 4, '#FFF59D', 0)).join('') + face(120, 150, 0.35)),
  LM('alfahidi', 'ตรอกบ้านหอลมย่านอัลฟาฮิดี', 'The wind-tower lanes of Al Fahidi', ['al fahidi', 'อัลฟาฮิดี', 'bastakiya', 'บัสตากียา', 'wind tower', 'หอลม', 'barjeel', 'บาร์จีล', 'old dubai', 'ดูไบเก่า', 'heritage quarter'],
    nm('หาหอคอยสี่เหลี่ยมบนหลังคาที่มีช่องให้ลมเข้า', 'Find the square tower on the roof with slots to catch the wind'),
    // a narrow sandy lane between two old sand-coloured houses, each with a tall square wind tower full of slots on its roof, carved wooden doors
    R(14, 96, 92, 120, '#E6C9A0') + R(134, 110, 92, 106, '#D7B98C') + [[44, 34, 36], [160, 52, 34]].map(([x, y, w]) => R(x, y, w, 64, '#E6C9A0') + Array.from({ length: 3 }, (_, k) => Lc(`M${x + 8 + k * 10} ${y + 8}v36`, '#6D4C41', 4)).join('') + Lc(`M${x - 4} ${y}h${w + 8}`, '#8D6E63', 6) + Lc(`M${x + 6} ${y + 56}l${w / 2 - 6}-8 ${w / 2 - 6} 8`, '#8D6E63', 3)).join('')
    + R(40, 160, 34, 56, '#8D5524', 4) + Lc('M57 162v52', '#5D2E14', 2.5) + C(66, 190, 3, '#FFCA28', 0) + R(160, 166, 40, 50, '#8D5524', 20) + [[30, 120], [80, 120], [150, 132], [200, 132]].map(([x, y]) => R(x - 7, y, 14, 18, '#5D4037', 3)).join('') + P('M106 216l14-40 14 40z', '#F4D19B', 2.5) + face(180, 186, 0.3)),
  LM('marina', 'ตึกระฟ้ากับเรือยอชต์ที่ดูไบมารีนา', 'Towers and yachts at Dubai Marina', ['dubai marina', 'ดูไบมารีนา', 'yachts', 'เรือยอชต์', 'marina walk', 'ทางเดินริมน้ำ', 'twisting tower', 'ตึกบิดเกลียว', 'jbr', 'skyscrapers'],
    nm('หาตึกที่บิดเป็นเกลียวข้างเรือยอชต์สีขาว', 'Find the twisting tower next to the white yachts'),
    // a curving blue water channel between tall glassy towers, one tower twisted like a ribbon, little white motor yachts moored along the edge
    [[14, 50, 30, '#90CAF9'], [48, 30, 26, '#B0BEC5'], [184, 40, 28, '#80DEEA'], [210, 70, 24, '#B0BEC5']].map(([x, y, w, c]) => R(x, y, w, 150 - y + 40, c) + Array.from({ length: 5 }, (_, k) => Lc(`M${x + 5} ${y + 14 + k * 22}h${w - 10}`, '#E1F5FE', 3)).join('')).join('')
    + P('M104 190V30h32v160z', '#B3E5FC') + Array.from({ length: 8 }, (_, k) => Lc(`M104 ${40 + k * 20}l32 ${k % 2 ? -8 : 8}`, '#4FC3F7', 3)).join('') + P('M104 190V30h32v160z', 'none') + Lc('M120 30V20', INK, 3)
    + P('M8 190c40-10 80 6 120 0s70-8 104 0v34H8z', '#29B6F6') + [[50, 196], [160, 202]].map(([x, y]) => P(`M${x - 30} ${y}h60l-8 12H${x - 24}z`, '#FFFFFF') + R(x - 16, y - 12, 28, 12, '#FFFFFF', 4) + Lc(`M${x - 12} ${y - 6}h20`, '#4FC3F7', 3)).join('') + face(50, 204, 0.25)),
  LM('hatta', 'ทะเลสาบสีฟ้าเขื่อนฮัตตาในหุบเขา', 'The turquoise lake of Hatta Dam', ['hatta', 'ฮัตตา', 'hatta dam', 'เขื่อนฮัตตา', 'hajar mountains', 'เทือกเขาฮาจาร์', 'kayak', 'พายเรือคายัก', 'turquoise lake', 'ทะเลสาบสีฟ้า'],
    nm('หาทะเลสาบสีฟ้าใสกลางภูเขาหินสีน้ำตาล', 'Find the bright turquoise lake between the brown rocky mountains'),
    // a bright turquoise lake held by a curved grey dam between bare brown rocky mountains, two little kayaks paddling across
    P('M8 120l40-74 34 42 30-58 40 64 30-36 50 62z', '#A1887F') + Lc('M48 46l10 30M112 30l-8 36M182 58l8 26', '#8D6E63', 3) + P('M8 120h224v100H8z', '#26C6DA') + Lc('M30 150c14-6 28 6 42 0M140 140c14-6 28 6 42 0', '#B2EBF2', 3)
    + P('M8 196c60-14 160-14 224 0v20H8z', '#B0BEC5') + Lc('M8 204c60-12 160-12 224 0', '#90A4AE', 3) + [[80, 166, '#FFCA28'], [160, 158, '#EF5350']].map(([x, y, c]) => E(x, y, 26, 6, c) + C(x, y - 8, 7, '#D7A86E') + Lc(`M${x - 18} ${y - 16}l36 12`, '#5D4037', 3)).join('') + face(120, 180, 0.3)),
  LM('lovelakes', 'ทะเลสาบรูปหัวใจกลางทะเลทราย', 'The heart-shaped Love Lakes in the desert', ['love lakes', 'ทะเลสาบหัวใจ', 'al qudra', 'อัลกุดรา', 'heart lakes', 'ทะเลสาบรูปหัวใจ', 'desert lake', 'ทะเลสาบกลางทะเลทราย', 'cycling track'],
    nm('หาทะเลสาบสองรูปหัวใจที่คล้องกันอยู่', 'Find the two lakes shaped like hearts holding hands'),
    // two heart-shaped blue lakes overlapping in golden desert sand seen from above, ringed with little green trees
    E(120, 120, 108, 96, '#F4D19B') + Lc('M30 70c40-14 60 10 100-4M110 196c40-14 60 10 100-4', '#E8C27A', 4)
    + [[92, 106, 1, '#4FC3F7'], [150, 132, 0.85, '#29B6F6']].map(([x, y, s, c]) => g(x, y, s, P('M0 44C-50 10-54-30-28-40-12-46 0-34 0-24 0-34 12-46 28-40 54-30 50 10 0 44z', c) + Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2; return C(Math.cos(a) * 46, Math.sin(a) * 40 - 2, 5, '#66BB6A', 2); }).join(''))).join('')
    + face(92, 104, 0.35)),
  LM('childrenscity', 'ตึกบล็อกหลากสีของชิลเดรนส์ซิตี้', 'The toy-block building of Children\'s City', ['children\'s city', 'ชิลเดรนส์ซิตี้', 'creek park', 'ครีกพาร์ก', 'kids museum', 'พิพิธภัณฑ์เด็ก', 'science for kids', 'วิทยาศาสตร์', 'play'],
    nm('หาตึกที่หน้าตาเหมือนบล็อกของเล่นหลากสี', 'Find the building that looks like colourful toy blocks'),
    // a children's museum built like a stack of giant toy blocks: a red cube, a yellow cylinder, blue arches, a green triangle on top, round windows
    R(30, 120, 80, 86, '#EF5350') + [[50, 140], [86, 140], [50, 176], [86, 176]].map(([x, y]) => C(x, y, 9, '#FFF59D', 2.5)).join('') + R(110, 96, 54, 110, '#FFCA28', 0) + E(137, 96, 27, 8, '#FFE082') + R(164, 140, 52, 66, '#42A5F5')
    + P('M174 206v-24c0-16 32-16 32 0v24z', '#E3F2FD', 2.5) + P('M110 96l27-60 27 60z', '#66BB6A') + R(42, 96, 56, 24, '#AB47BC') + C(190, 128, 12, '#FF7043') + E(120, 210, 104, 8, '#AED581') + face(137, 150, 0.4)),
  LM('alwasl', 'โดมโครงตาข่ายอัลวัสล์ที่เอ็กซ์โปซิตี้', 'The lattice dome of Al Wasl at Expo City', ['al wasl dome', 'โดมอัลวัสล์', 'expo city', 'เอ็กซ์โปซิตี้', 'expo 2020', 'lattice dome', 'โดมโครงตาข่าย', 'light show', 'การแสดงแสงสี'],
    nm('หาโดมโปร่งที่ทำจากโครงตาข่ายทั้งลูก', 'Find the see-through dome made all of lattice'),
    // a huge see-through dome made of a lacy lattice of white rings, glowing purple and pink light inside it, tiny people-sized dots at the bottom
    P('M18 210C18 50 222 50 222 210z', '#D1C4E9') + E(120, 170, 70, 30, '#F8BBD0', 0) + Array.from({ length: 9 }, (_, k) => { const x = 18 + k * 25.5; return Lc(`M${x.toFixed(1)} 210Q${(x + (x - 120) * 0.2).toFixed(1)} ${(84 + Math.abs(x - 120) * 0.4).toFixed(1)} 120 90`, '#FFFFFF', 4); }).join('')
    + [120, 150, 180].map((y) => { const hw = 102 * Math.sqrt(1 - ((210 - y) / 124) ** 2); return Lc(`M${(120 - hw).toFixed(1)} ${y}Q120 ${y + 22} ${(120 + hw).toFixed(1)} ${y}`, '#FFFFFF', 4); }).join('')
    + P('M18 210C18 50 222 50 222 210z', 'none') + Lc('M10 212h220', INK, 5) + [70, 110, 150, 176].map((x) => C(x, 204, 3, '#5E35B1', 0)).join('') + face(120, 140, 0.4)),
  LM('terra', 'หลังคาโซลาร์ยักษ์และต้นไม้พลังงาน', 'Terra\'s giant solar roof and energy trees', ['terra pavilion', 'ศาลาเทอร์รา', 'sustainability pavilion', 'solar panels', 'แผงโซลาร์', 'energy trees', 'ต้นไม้พลังงาน', 'expo city', 'เอ็กซ์โปซิตี้'],
    nm('หาหลังคากลมแบนที่ปูแผงโซลาร์เต็มไปหมด', 'Find the flat round roof covered in solar panels'),
    // a huge flat round roof tilted like a plate and covered in dark blue solar panels on a slim stem, two smaller mushroom-like energy trees beside it
    Lc('M120 92v110', '#B0BEC5', 14) + Lc('M120 92v110', INK, 2) + P('M14 80c20-30 192-30 212 0-20 24-192 24-212 0z', '#1A3A6B') + Array.from({ length: 7 }, (_, k) => Lc(`M${40 + k * 27} ${66 - (k === 0 || k === 6 ? 0 : 4)}l-4 ${32}`, '#90CAF9', 2)).join('') + Lc('M24 80c30-10 162-10 192 0', '#90CAF9', 2)
    + [[40, 150], [200, 156]].map(([x, y]) => Lc(`M${x} ${y}v52`, '#B0BEC5', 6) + P(`M${x - 28} ${y}c4-14 52-14 56 0-8 8-48 8-56 0z`, '#1A3A6B') + Lc(`M${x - 22} ${y}h44`, '#90CAF9', 2)).join('')
    + E(120, 210, 104, 8, '#AED581') + [[92, 30], [150, 26]].map(([x, y]) => P(`M${x} ${y - 9}l3 6 6 3-6 3-3 6-3-6-6-3 6-3z`, '#FFCA28', 2)).join('') + face(120, 150, 0.3)),
  LM('infinitybridge', 'สะพานอินฟินิตี้ซุ้มเลขแปด', 'The Infinity Bridge and its loop arch', ['infinity bridge', 'สะพานอินฟินิตี้', 'loop arch', 'ซุ้มวงรี', 'dubai creek', 'ลำน้ำดูไบ', 'bridge', 'สะพาน', 'night lights'],
    nm('หาสะพานที่มีซุ้มรูปเลขแปดนอนอยู่ด้านบน', 'Find the bridge with a lying-down number eight arch on top'),
    // a road bridge across the water with a giant white arch looped like an infinity sign over it, cars crossing
    P(INF + 'z', '#E1F5FE', 0) + Lc(INF, '#FFFFFF', 14) + Lc(INF, INK, 2) + R(8, 136, 224, 14, '#B0BEC5') + Lc('M8 143h224', '#FFFFFF', 2) + [[60, '#EF5350'], [168, '#FFCA28']].map(([x, c]) => R(x - 12, 126, 24, 10, c, 4, 2.5)).join('')
    + P('M8 170h224v54H8z', '#4FC3F7') + Lc('M20 196c14-6 28 6 42 0M170 204c14-6 28 6 42 0', '#E1F5FE', 3) + [70, 170].map((x) => R(x - 5, 150, 10, 22, '#90A4AE', 0, 2.5)).join('') + face(66, 100, 0.3)),
  LM('opera', 'โรงอุปรากรดูไบโอเปร่า', 'Dubai Opera', ['dubai opera', 'ดูไบโอเปร่า', 'opera house', 'โรงอุปรากร', 'concert', 'คอนเสิร์ต', 'theatre', 'โรงละคร', 'downtown'],
    nm('หาตึกแก้วที่หัวเชิดขึ้นเหมือนหัวเรือ', 'Find the glass building whose front lifts up like the bow of a boat'),
    // a long low glass theatre whose front sweeps up into a pointed bow, a tall glass window wall showing warm lights, steps and palms in front
    P('M24 190V128c40-6 100-8 150-10l46-60c4 40 0 90-10 132z', '#ECEFF1') + P('M176 120l40-52c2 30 0 66-6 98h-34z', '#81D4FA') + Array.from({ length: 5 }, (_, k) => Lc(`M${182 + k * 7} ${110 - k * 9}v${56 + k * 6}`, '#FFFFFF', 2)).join('')
    + R(40, 140, 120, 40, '#FFE082', 0, 3) + Array.from({ length: 7 }, (_, k) => Lc(`M${54 + k * 16} 140v40`, '#B0BEC5', 2.5)).join('') + R(20, 190, 200, 10, '#D7CCC8') + R(30, 200, 180, 10, '#BCAAA4') + palm(16, 210, 40, 0.6) + face(100, 160, 0.35)),
  LM('jumeirahmosque', 'มัสยิดจูไมราห์หินสีครีม', 'Jumeirah Mosque in pale stone', ['jumeirah mosque', 'มัสยิดจูไมราห์', 'mosque', 'มัสยิด', 'twin minarets', 'หออะซานคู่', 'stone carving', 'ลายหินแกะ', 'jumeirah', 'architecture'],
    nm('หาอาคารหินสีครีมที่มีหอคอยคู่และโดมลายแกะ', 'Find the cream stone building with twin towers and a carved dome'),
    // a pale cream stone building with one big carved ribbed dome, two slim towers with balconies either side and a row of pointed arches (the building only)
    [[46, 34], [194, 34]].map(([x, y]) => R(x - 10, y + 20, 20, 160, '#FFF3E0') + R(x - 14, y + 70, 28, 8, '#F4D9A0') + R(x - 14, y + 120, 28, 8, '#F4D9A0') + P(`M${x - 8} ${y + 20}c0-14 16-14 16 0z`, '#FFF3E0') + Lc(`M${x} ${y + 6}v-8`, INK, 2.5)).join('')
    + P('M64 120c0-56 112-56 112 0z', '#FFF3E0') + Array.from({ length: 7 }, (_, k) => Lc(`M${76 + k * 14.7} 120Q${(76 + k * 14.7 + 120) / 2} 74 120 66`, '#E0C9A0', 2.5)).join('') + Lc('M120 66v-14', INK, 2.5) + C(120, 48, 4, '#FFCA28', 2)
    + R(56, 120, 128, 94, '#FFF3E0') + Array.from({ length: 4 }, (_, k) => P(`M${70 + k * 28} 210v-36c0-12 20-12 20 0v36z`, '#F4D9A0', 2.5)).join('') + Lc('M56 136h128', '#E0C9A0', 3) + face(120, 150, 0.35)),
];
export default {
  places: {
    ae: { country: 'ae', wave: 3, name: nm('สหรัฐอาหรับเอมิเรตส์', 'United Arab Emirates'), tz: 'Asia/Dubai', alias: ['united arab emirates', 'สหรัฐอาหรับเอมิเรตส์', 'UAE', 'ยูเออี', 'sharjah', 'ชาร์จาห์', 'ras al khaimah', 'ราสอัลไคมาห์', 'fujairah', 'ฟูไจราห์', 'SHJ'], colors: AE },
    'ae-dubai': { country: 'ae', wave: 3, name: nm('ดูไบ', 'Dubai'), tz: 'Asia/Dubai', ll: [25.2, 55.27], alias: ['dubai', 'ดูไบ', 'DXB', 'DWC', 'deira', 'เดียรา', 'jumeirah', 'จูไมราห์', 'palm jumeirah', 'ปาล์มจูไมราห์', 'dubai marina', 'ดูไบมารีนา', 'hatta', 'ฮัตตา'], colors: DX },
  },
  items,
};
