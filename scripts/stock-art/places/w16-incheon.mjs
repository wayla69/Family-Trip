// Wave 16, Korea: Incheon — the port city by the Yellow Sea where most trips to Korea land: Chinatown and its dishes, the
// Wolmido seafront, Songdo's canal park, the islands of Yeongjong, Muuido, Seonjaedo and Ganghwa, the mudflats and the
// airport. Drawn for Incheon only; no war memorials (the landing, the forts), no temples, people only as cute generic children
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const IC = { k1: '#1565C0', k2: '#C62828', k3: '#E3F2FD' };
const CITY = 'kr-incheon', DIR = 'kr/incheon';
const N = (v) => +(+v).toFixed(1);
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a red Chinatown lantern with gold caps and a tassel
const lantern = (x, y, s = 1) => R(x - 6 * s, y - 14 * s, 12 * s, 5 * s, '#FFC107', 1, 2) + R(x - 6 * s, y + 9 * s, 12 * s, 5 * s, '#FFC107', 1, 2)
  + E(x, y, 11 * s, 12 * s, '#E53935', 3) + Lc(`M${N(x)} ${N(y - 11 * s)}v${N(22 * s)}`, '#FFCDD2', 1.5) + Lc(`M${N(x)} ${N(y + 14 * s)}v${N(9 * s)}`, '#FFC107', 2.5);
// a jet seen from the side, nose to the right (x, y = middle of the body)
const plane = (x, y, s = 1, c = '#1E88E5') => P(`M${N(x - 30 * s)} ${N(y - 6 * s)}L${N(x - 40 * s)} ${N(y - 26 * s)}H${N(x - 28 * s)}L${N(x - 14 * s)} ${N(y - 6 * s)}Z`, c)
  + R(x - 38 * s, y - 9 * s, 76 * s, 18 * s, '#FFFFFF', N(9 * s)) + P(`M${N(x - 6 * s)} ${N(y + 3 * s)}L${N(x - 20 * s)} ${N(y + 24 * s)}H${N(x - 8 * s)}L${N(x + 14 * s)} ${N(y + 3 * s)}Z`, c)
  + Array.from({ length: 4 }, (_, k) => C(x - 14 * s + k * 9 * s, y - 2 * s, 2.4 * s, '#90CAF9', 0)).join('') + E(x + 29 * s, y - 3 * s, 5 * s, 3 * s, '#90CAF9', 0);
// a child standing: round head with dark hair, a top, two little legs (x, y = the middle of the head)
const kid = (x, y, s, top, legs = '#5C6BC0') => R(x - 10 * s, y + 46 * s, 8 * s, 14 * s, legs, N(3 * s), 3) + R(x + 2 * s, y + 46 * s, 8 * s, 14 * s, legs, N(3 * s), 3)
  + P(`M${N(x - 15 * s)} ${N(y + 48 * s)}L${N(x - 11 * s)} ${N(y + 14 * s)}H${N(x + 11 * s)}L${N(x + 15 * s)} ${N(y + 48 * s)}Z`, top)
  + C(x, y, 15 * s, '#FFE0B2', 3) + P(`M${N(x - 15 * s)} ${N(y)}a${N(15 * s)} ${N(15 * s)} 0 0 1 ${N(30 * s)} 0c${N(-8 * s)} ${N(-6 * s)} ${N(-22 * s)} ${N(-6 * s)} ${N(-30 * s)} 0z`, '#3E2723', 0)
  + face(x, y + 3 * s, 0.3 * s);
// a seagull with spread wings (x, y = body)
const gull = (x, y, s = 1, d = 1) => P(`M${N(x - 4 * s)} ${N(y)}c${N(-10 * s)} ${N(-18 * s)} ${N(-26 * s)} ${N(-20 * s)} ${N(-36 * s)} ${N(-14 * s)} ${N(12 * s)} ${N(2 * s)} ${N(22 * s)} ${N(10 * s)} ${N(30 * s)} ${N(18 * s)}z`, '#ECEFF1')
  + P(`M${N(x + 4 * s)} ${N(y)}c${N(10 * s)} ${N(-18 * s)} ${N(26 * s)} ${N(-20 * s)} ${N(36 * s)} ${N(-14 * s)} ${N(-12 * s)} ${N(2 * s)} ${N(-22 * s)} ${N(10 * s)} ${N(-30 * s)} ${N(18 * s)}z`, '#ECEFF1')
  + E(x, y + 4 * s, 14 * s, 8 * s, '#FFFFFF') + C(x + d * 12 * s, y - 2 * s, 7 * s, '#FFFFFF') + P(`M${N(x + d * 18 * s)} ${N(y - 3 * s)}l${N(d * 9 * s)} ${N(2 * s)} ${N(-d * 9 * s)} ${N(3 * s)}z`, '#FFB300', 2)
  + C(x + d * 13 * s, y - 4 * s, 1.8 * s, INK, 0);
// one of Incheon Bridge's pylons: an upside-down Y of pale concrete (x = middle, y = deck level, h = height above the deck)
const pylon = (x, y, h, s = 1) => P(`M${N(x - 14 * s)} ${N(y + 14 * s)}L${N(x - 3 * s)} ${N(y - h)}h${N(6 * s)}L${N(x + 14 * s)} ${N(y + 14 * s)}h${N(-7 * s)}L${N(x)} ${N(y - h * 0.45)}L${N(x - 7 * s)} ${N(y + 14 * s)}z`, '#CFD8DC', 3);
// a rounded picture panel 12–228 on both sides: the top band, a middle band, the bottom band, the ring round it
const top = (y, fill) => P(`M12 ${y}V36a24 24 0 0 1 24-24h168a24 24 0 0 1 24 24v${y - 36}z`, fill, 0);
const mid = (y0, y1, fill) => R(12, y0, 216, y1 - y0, fill, 0, 0);
const bot = (y, fill, sw = 0, lift = 0) => P(`M12 ${y}c60 ${-lift} 156 ${-lift} 216 0V204a24 24 0 0 1-24 24H36a24 24 0 0 1-24-24z`, fill, sw === 0 ? 0 : undefined);
const frame = () => R(12, 12, 216, 216, 'none', 24);
const fan = (x, top, y, w, n = 4) => Lc(Array.from({ length: n }, (_, k) => `M${x} ${top + k * 5}L${N(x - w * (k + 1) / n)} ${y}M${x} ${top + k * 5}L${N(x + w * (k + 1) / n)} ${y}`).join(''), '#546E7A', 1.5);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับอินชอน', 'Incheon stamp'), kw: ['incheon', 'อินชอน', 'incheon bridge', 'สะพานอินชอน', 'yellow sea', 'ทะเลเหลือง', 'port city', 'เมืองท่า', 'gateway to korea', 'ประตูสู่เกาหลี'],
    // Incheon Bridge: two pale upside-down-Y pylons with fans of cables over a blue sea, a little jet flying above
    svg: cityStamp('ic-st', { name: 'INCHEON', sub: 'YELLOW SEA · KOREA', ...IC, emblem: R(50, 124, 100, 18, '#4FC3F7', 6, 2.5) + Lc('M58 134q6-4 12 0t12 0t12 0t12 0t12 0t12 0t12 0', '#E1F5FE', 2)
      + fan(78, 78, 116, 22, 3) + fan(122, 78, 116, 22, 3) + pylon(78, 116, 42, 0.8) + pylon(122, 116, 42, 0.8) + R(48, 112, 104, 7, '#ECEFF1', 3, 2.5)
      + plane(100, 64, 0.32, '#C62828') }) },

  D('chinatown', 'ไชนาทาวน์อินชอนกับซุ้มประตูแดง', 'Incheon Chinatown and its red gate', ['incheon chinatown', 'ไชนาทาวน์อินชอน', 'chinatown gate', 'ซุ้มประตูไชนาทาวน์', 'paifang', 'ซุ้มประตูจีน', 'red lanterns', 'โคมแดง', 'korean-chinese food street', 'ถนนอาหารจีนเกาหลี', 'open port', 'ย่านท่าเรือเก่า'],
    // a peach sky, a red gate with two green tiled roofs and a gold sign, red and yellow shophouses either side, strings of red lanterns, a child on the street
    scene('ic-d1', '#FFE0B2', C(196, 50, 14, '#FFF59D', 3) + R(-4, 196, 248, 60, '#D7CCC8') + Lc('M-4 212h248M-4 228h248', '#BCAAA4', 3)
      + R(-4, 104, 58, 94, '#EF9A9A') + P('M-8 108l10-18h54l10 18z', '#2E7D32') + R(10, 124, 14, 16, '#FFF8E1', 2, 3) + R(30, 124, 14, 16, '#FFF8E1', 2, 3) + R(16, 160, 22, 36, '#8D2A1E', 2, 3)
      + R(186, 104, 58, 94, '#FFCC80') + P('M176 108l10-18h64l10 18z', '#2E7D32') + R(198, 124, 14, 16, '#FFF8E1', 2, 3) + R(218, 124, 14, 16, '#FFF8E1', 2, 3) + R(200, 160, 22, 36, '#8D2A1E', 2, 3)
      + R(76, 96, 14, 102, '#C62828') + R(150, 96, 14, 102, '#C62828') + R(62, 84, 116, 14, '#C62828', 2) + P('M52 86l12-20h112l12 20z', '#2E7D32') + Lc('M70 76h100', '#1B5E20', 2.5)
      + R(92, 52, 56, 14, '#C62828', 2) + P('M82 54l10-16h56l10 16z', '#2E7D32') + R(100, 98, 40, 22, '#FFC107', 3, 3) + face(120, 106, 0.32)
      + Lc('M-4 44q62 26 124 0t124 0', '#5D4037', 2) + [24, 62, 178, 216].map((x) => lantern(x, x < 120 ? 64 : 64, 0.75)).join('')
      + kid(120, 150, 0.62, '#FFEB3B', '#E53935'))),

  D('songdo', 'คลองในสวนกลางซงโด', 'The canal of Songdo Central Park', ['songdo central park', 'สวนกลางซงโด', 'songdo', 'ซงโด', 'seawater canal', 'คลองน้ำทะเล', 'water taxi', 'เรือแท็กซี่', 'glass towers', 'ตึกกระจก', 'canoe', 'พายเรือแคนู'],
    // tall glass towers in pale blues behind (the tallest with a slanted top), green lawns, a winding blue canal with a little red boat and a child waving, round trees
    scene('ic-d2', '#B3E5FC', C(52, 52, 14, '#FFF59D', 3)
      + [[54, 70, 26, '#90CAF9'], [84, 40, 30, '#BBDEFB'], [150, 60, 24, '#90CAF9'], [178, 84, 28, '#BBDEFB']].map(([x, y, w, c]) => R(x, y, w, 140 - y + 40, c, 0, 3) + Lc(`M${x + w / 2} ${y + 8}v${130 - y}`, '#64B5F6', 2)).join('')
      + P('M116 140V34l26-14v120z', '#64B5F6') + Lc('M124 40v96M134 34v102', '#E3F2FD', 2)
      + P('M-4 140c60-10 180-10 248 0v110H-4z', '#9CCC65') + P('M-4 176c60-20 110 10 160-6s70-10 88-6v34c-30-6-60 2-90 8s-100-6-158 4z', '#4FC3F7')
      + Lc('M30 186q8-5 16 0M150 188q8-5 16 0', '#E1F5FE', 3)
      + P('M84 180h64l-8 14h-48z', '#E53935') + R(104, 166, 24, 14, '#FFFFFF', 4, 3) + face(116, 186, 0.3) + kid(116, 140, 0.42, '#FFEB3B')
      + C(26, 150, 14, '#43A047') + C(212, 150, 14, '#43A047') + C(196, 226, 12, '#388E3C') + C(36, 226, 12, '#388E3C'))),

  D('wolmido', 'ทางเดินริมทะเลวอลมีโดกับชิงช้าสวรรค์', 'The Wolmido seaside walk and its Ferris wheel', ['wolmido', 'วอลมีโด', 'wolmido promenade', 'ทางเดินริมทะเลวอลมีโด', 'ferris wheel', 'ชิงช้าสวรรค์', 'seaside', 'ริมทะเล', 'sunset over the sea', 'พระอาทิตย์ตกทะเล', 'boats', 'เรือ'],
    // a sunset sky, a wide sea with a fishing boat and a far island, a big Ferris wheel with coloured cabins and a smiling hub, a railing along the walk in front
    scene('ic-d3', '#FFCCBC', C(76, 100, 22, '#FFB74D', 3) + P('M-4 120h248v130H-4z', '#4FC3F7') + P('M8 120c14-14 34-14 48 0z', '#81C784')
      + Lc('M40 140q8-5 16 0t16 0M90 160q8-5 16 0', '#E1F5FE', 3) + P('M34 168h52l-8 12H42z', '#FFFFFF') + R(54, 152, 14, 16, '#EF5350', 2, 3)
      + C(168, 98, 58, 'none', 5) + Lc(Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI * 2; return `M168 98L${N(168 + Math.cos(a) * 58)} ${N(98 + Math.sin(a) * 58)}`; }).join(''), '#90A4AE', 3)
      + Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI * 2; return R(168 + Math.cos(a) * 58 - 8, 98 + Math.sin(a) * 58 - 6, 16, 14, ['#EF5350', '#FFCA28', '#66BB6A', '#42A5F5'][k % 4], 4, 3); }).join('')
      + P('M150 210l18-112 18 112z', 'none', 5) + C(168, 98, 14, '#FFF59D', 3) + face(168, 98, 0.32)
      + R(-4, 196, 248, 60, '#BCAAA4') + Lc('M-4 186h248', '#37474F', 5) + Lc('M14 186v12M44 186v12M74 186v12M104 186v12M134 186v12M164 186v12M194 186v12M224 186v12', '#37474F', 4)
      + Lc('M112 60l6 4 6-4M136 44l5 3 5-3', INK, 2.5))),

  L('jjajangmyeon', 'จาจังมยอน บะหมี่ซอสถั่วดำ', 'Jjajangmyeon, the black bean noodles born in Chinatown', ['jjajangmyeon', 'จาจังมยอน', 'black bean noodles', 'บะหมี่ซอสถั่วดำ', 'jajangmyeon', 'จาจังมย็อน', 'korean-chinese', 'อาหารจีนเกาหลี', 'yellow pickled radish', 'หัวไชเท้าดองสีเหลือง', 'danmuji'], nm('หาหัวไชเท้าดองสีเหลืองบนจานเล็ก', 'Find the yellow pickled radish on the little plate'),
    // a white bowl with a blue band, thick yellow noodles under a glossy black sauce with white onion cubes and green cucumber strips, chopsticks, a little plate of yellow radish half-moons
    P('M26 112h170c-6 52-42 82-85 82s-79-30-85-82z', '#FFFFFF') + Lc('M36 140q75 22 150 0', '#1E88E5', 5) + E(111, 112, 85, 20, '#FFE082')
    + Lc('M40 114q10-8 20 0t20 0t20 0t20 0t20 0t20 0t20 0', '#F9A825', 2.5) + P('M56 110c6-22 40-30 58-26 22-6 52 4 54 24-16 10-96 12-112 2z', '#3E2723', 3)
    + [[80, 98], [100, 92], [124, 96], [146, 100], [112, 104]].map(([x, y]) => R(x - 4, y - 4, 8, 8, '#FFF8E1', 1.5, 2)).join('') + Lc('M92 86l30 6M100 82l26 4M134 90l18 6', '#7CB342', 3.5)
    + face(111, 158, 0.55) + Lc('M150 70l64-46M160 76l62-42', '#A1887F', 6)
    + E(196, 208, 34, 11, '#FFFFFF') + P('M176 206a10 10 0 0 1 20 0zM198 204a10 10 0 0 1 20 0z', '#FFEB3B', 2.5)),

  L('jjolmyeon', 'จอลมยอน บะหมี่เหนียวหนึบราดซอสแดง', 'Jjolmyeon, the chewy noodles first made in Incheon', ['jjolmyeon', 'จอลมยอน', 'chewy noodles', 'บะหมี่เหนียวหนึบ', 'spicy cold noodles', 'บะหมี่เย็นรสเผ็ด', 'gochujang sauce', 'ซอสโคชูจัง', 'sinpo', 'ชินโพ', 'bean sprouts', 'ถั่วงอก'], nm('หาเส้นบะหมี่ที่ยืดออกมาจากตะเกียบ', 'Find the noodle stretching up from the chopsticks'),
    // a silver bowl, pale chewy noodles, a dollop of red sauce, bean sprouts, cucumber and cabbage shreds, half a boiled egg; chopsticks lift a long springy noodle
    P('M30 124h180c-6 46-40 74-90 74s-84-28-90-74z', '#CFD8DC') + Lc('M44 150q76 18 152 0', '#ECEFF1', 4) + E(120, 124, 90, 20, '#FFF3C4')
    + Lc('M44 126q12-6 22 2t22-2t22 2t22-2t22 2t22-2t22 2', '#E0C070', 2.5) + P('M92 120c0-18 18-26 32-20 16-4 26 10 18 22-12 6-40 6-50-2z', '#E53935', 3)
    + Lc('M60 116l14 8M66 110l10 12M168 112l-14 10M176 118l-16 6', '#FFFDE7', 3) + Lc('M70 128l20-4M150 128l18 2', '#7CB342', 3.5)
    + E(160, 104, 16, 12, '#FFFFFF') + C(160, 104, 7, '#FFB300', 2.5) + face(120, 166, 0.55)
    + Lc('M120 98c-6-14 8-20 2-34s10-20 4-36', '#FFF3C4', 7) + Lc('M108 18l14 72M136 18l-10 72', '#8D6E63', 5)),

  L('gonggalppang', 'ขนมปังกงกัลปัง ลูกกลมกลวงข้างใน', 'Gonggal-ppang, the puffed bread that is hollow inside', ['gonggal-ppang', 'กงกัลปัง', 'gonggalppang', 'hollow bread', 'ขนมปังกลวง', 'puffed bread', 'ขนมปังพองลม', 'chinatown bakery', 'ร้านขนมปังไชนาทาวน์', 'honey glaze', 'เคลือบน้ำผึ้ง'], nm('หารูโพรงว่างๆ ข้างในขนมปังที่แตก', 'Find the empty hollow inside the broken bread'),
    // a huge round golden puffed bread ball with a shiny honey top and a smile, and a broken one beside it showing it is empty inside, crumbs on a paper bag
    P('M20 208h200l-10 18H30z', '#D7CCC8') + C(102, 128, 70, '#E8A54B') + P('M52 96c14-26 40-36 66-34', 'none', 4) + E(98, 92, 28, 10, '#F7D08A', 0)
    + Lc('M60 150q12 6 22 0M120 168q12 6 22 0', '#C07A2C', 3) + face(102, 132, 0.8)
    + P('M154 204c-8-34 6-58 32-62 26-2 40 22 32 62z', '#E8A54B') + P('M164 196c-2-22 8-38 22-38s24 16 22 38z', '#FFF3E0') + E(186, 184, 14, 18, '#F3D9B1', 2)
    + P('M160 150l8-10 8 8 8-10 8 8 8-8 8 10', 'none', 3) + C(64, 214, 3, '#C07A2C', 0) + C(142, 216, 3, '#C07A2C', 0)),

  L('hwadeokmandu', 'เกี๊ยวอบเตาดินฮวาด็อกมันดู', 'Hwadeok mandu, dumplings baked inside a clay oven', ['hwadeok mandu', 'ฮวาด็อกมันดู', 'baked dumplings', 'เกี๊ยวอบ', 'clay oven', 'เตาดินเผา', 'chinatown snack', 'ของกินไชนาทาวน์', 'mandu', 'มันดู', 'crispy bottom', 'ก้นกรอบ'], nm('หาไฟสีส้มที่ลุกอยู่ในเตาดิน', 'Find the orange glow inside the clay oven'),
    // a round brown clay oven with a dark mouth and an orange glow, dumplings stuck round its inside wall; in front a tray of golden pleated dumplings, one smiling
    P('M40 160c-8-60 20-110 80-110s88 50 80 110z', '#A1887F') + E(120, 58, 46, 12, '#6D4C41') + E(120, 58, 36, 8, '#FF7043', 2.5)
    + Lc('M48 110h144M44 136h152', '#8D6E63', 3) + P('M86 160v-26a34 26 0 0 1 68 0v26z', '#4E342E') + E(120, 150, 22, 8, '#FF8A65', 0)
    + R(22, 162, 196, 20, '#8D6E63', 6) + R(30, 178, 180, 34, '#FFF8E1', 6)
    + [[62, 182], [120, 186], [178, 182]].map(([x, y]) => P(`M${x - 26} ${y + 8}c0-26 14-38 26-38s26 12 26 38z`, '#F2B55B') + Lc(`M${x - 12} ${y - 14}l4 8M${x} ${y - 20}v10M${x + 12} ${y - 14}l-4 8`, '#C07A2C', 2.5)).join('')
    + face(120, 182, 0.42)),

  L('jogaegui', 'หอยย่างริมทะเล', 'Jogae-gui, grilled shellfish by the sea', ['jogae-gui', 'โจแกกุย', 'grilled shellfish', 'หอยย่าง', 'scallops', 'หอยเชลล์', 'clams', 'หอยลาย', 'charcoal grill', 'เตาถ่าน', 'seaside restaurant', 'ร้านริมทะเล', 'eurwangni', 'sorae'], nm('หาชีสที่ละลายอยู่บนหอยเชลล์', 'Find the melting cheese on the scallop shell'),
    // a strip of blue sea behind, a round charcoal grill with a wire grate, fan-shaped scallop shells with melted cheese, round clams popping open, a smiling scallop in the middle
    Lc('M70 96c-8-12 8-18 0-30M120 90c-8-12 8-18 0-30M170 96c-8-12 8-18 0-30', '#B0BEC5', 3)
    + E(120, 160, 104, 50, '#424242') + E(120, 152, 94, 40, '#FF7043') + Lc('M32 152h176M44 132h152M44 172h152M80 116v76M120 112v80M160 116v76', '#5D4037', 2.5)
    + [[66, 146, '#FFAB91'], [174, 146, '#FFCC80']].map(([x, y, c]) => P(`M${x} ${y + 22}l-26-26c0-16 12-26 26-26s26 10 26 26z`, c) + Lc(`M${x} ${y + 20}l-14-36M${x} ${y + 20}v-40M${x} ${y + 20}l14-36`, '#E07B5A', 2) + E(x, y - 6, 14, 8, '#FFE082', 2.5)).join('')
    + [[96, 182], [148, 184]].map(([x, y]) => P(`M${x - 18} ${y}c4-14 32-14 36 0z`, '#BCAAA4') + P(`M${x - 18} ${y}c4 10 32 10 36 0z`, '#D7CCC8')).join('')
    + P('M120 172l-34-32c0-22 16-34 34-34s34 12 34 34z', '#FFB74D') + Lc('M120 168l-18-46M120 168v-56M120 168l18-46', '#E08A3C', 2.5) + face(120, 140, 0.48)),

  L('fairytale', 'หมู่บ้านเทพนิยายซงวอลดง', 'Songwol-dong Fairy Tale Village', ['songwol-dong fairy tale village', 'หมู่บ้านเทพนิยายซงวอลดง', 'fairy tale village', 'หมู่บ้านเทพนิยาย', 'storybook murals', 'ภาพวาดนิทานบนกำแพง', 'painted alley', 'ซอยบ้านทาสี', 'beanstalk', 'ต้นถั่ววิเศษ'], nm('หาต้นถั่วยักษ์ที่ไต่ขึ้นไปถึงก้อนเมฆบนกำแพง', 'Find the giant beanstalk climbing up the wall to a cloud'),
    // a row of little houses painted in candy colours: one wall has a giant green beanstalk climbing to a cloud, another a big open storybook, a striped awning and a narrow stair lane
    R(14, 70, 92, 130, '#FFF59D') + P('M8 74l52-34 52 34z', '#EF5350') + R(118, 100, 108, 100, '#B3E5FC') + P('M112 104l60-30 60 30z', '#7E57C2')
    + Lc('M52 196c-12-30 18-46 4-76s16-44 6-70', '#43A047', 8) + [[44, 168, -1], [64, 140, 1], [46, 110, -1], [66, 80, 1]].map(([x, y, d]) => P(`M${x} ${y}c${d * 14}-12 ${d * 24}-6 ${d * 26} 4-${d * 10} 6-${d * 20} 4-${d * 26}-4z`, '#7CB342', 2.5)).join('')
    + C(72, 50, 12, '#FFFFFF', 3) + C(88, 48, 14, '#FFFFFF', 3) + C(102, 54, 10, '#FFFFFF', 3)
    + P('M136 130l36 8 36-8v44l-36 8-36-8z', '#FFFFFF') + Lc('M172 138v44', '#90A4AE', 3) + Lc('M144 146h20M144 156h20M180 146h20M180 156h20', '#B0BEC5', 2.5) + face(172, 116, 0.35)
    + [[118, 0], [136, 1], [154, 2], [172, 3], [190, 4], [208, 5]].map(([x, k]) => P(`M${x} 100h18l-2 12h-14z`, k % 2 ? '#FFFFFF' : '#EF5350', 2.5)).join('')
    + R(84, 168, 22, 32, '#8D6E63', 3) + R(194, 166, 20, 34, '#8D6E63', 3) + P('M106 220h22v-8h22v-8h22v-8h22', 'none', 4) + R(4, 200, 232, 22, '#E0E0E0', 4)),

  L('seatrain', 'รถไฟชมทะเลวอลมี', 'The Wolmi Sea Train on its track round the island', ['wolmi sea train', 'รถไฟชมทะเลวอลมี', 'wolmido monorail', 'โมโนเรลวอลมีโด', 'elevated train', 'รถไฟลอยฟ้า', 'sea view ride', 'นั่งรถไฟชมทะเล', 'two-car train', 'รถไฟสองตู้'], nm('หาเสาสูงที่ยกรางรถไฟไว้เหนือพื้น', 'Find the tall posts holding the track up in the air'),
    // a curving track on tall concrete posts above the sea, a little two-car train with big windows and a blue stripe gliding on it, a smiling front, an island and a boat below
    R(0, 170, 240, 54, '#4FC3F7', 8) + Lc('M18 194q8-5 16 0t16 0M150 204q8-5 16 0t16 0', '#E1F5FE', 3) + P('M170 170c8-18 28-24 48-10l8 10z', '#81C784')
    + [30, 84, 138, 192].map((x) => R(x - 6, 120, 12, 54, '#B0BEC5', 2, 3)).join('') + P('M4 126c60-20 160-20 232 0v10c-72-18-172-18-232 0z', '#78909C')
    + R(30, 70, 84, 48, '#FFFFFF', 12) + R(120, 72, 86, 46, '#FFFFFF', 10) + Lc('M30 106h84M120 106h86', '#1E88E5', 6)
    + [42, 66, 90].map((x) => R(x - 9, 80, 18, 16, '#81D4FA', 3, 3)).join('') + [132, 156, 180].map((x) => R(x - 9, 80, 18, 16, '#81D4FA', 3, 3)).join('')
    + P('M206 72c18 4 26 22 22 46h-22z', '#FFFFFF') + R(208, 84, 14, 14, '#81D4FA', 3, 3) + face(72, 98, 0.36) + Lc('M114 94h6', INK, 4)
    + P('M54 186h40l-6 10H60z', '#EF5350')),

  L('seagulls', 'ป้อนขนมกุ้งให้นกนางนวลบนเรือ', 'Feeding shrimp crackers to the seagulls on the ferry', ['seagulls', 'นกนางนวล', 'shrimp crackers', 'ขนมกุ้ง', 'saeukkang', 'แซอูกัง', 'ferry ride', 'นั่งเรือข้ามฟาก', 'feeding birds', 'ป้อนนก', 'island ferry', 'เรือไปเกาะ'], nm('หานกนางนวลที่งับขนมจากมือ', 'Find the seagull snapping the cracker from the hand'),
    // the white railing of a ferry at the bottom, a child holding up a shrimp cracker, a red bag of crackers, seagulls swooping round in a blue sky, one catching the cracker
    top(176, '#E3F2FD') + bot(176, '#FFFFFF') + frame() + gull(64, 58, 1, 1) + gull(184, 44, 0.8, -1) + gull(150, 104, 0.95, -1)
    + Lc('M12 176h216M12 196h216', '#90A4AE', 5) + Lc('M30 176v20M90 176v20M150 176v20M210 176v20', '#90A4AE', 4)
    + kid(104, 140, 0.7, '#4FC3F7') + Lc('M112 160l14-26', '#FFE0B2', 6) + R(124, 118, 6, 18, '#FF9800', 3, 2.5)
    + P('M176 222l-8-52h40l-8 52z', '#E53935') + P('M180 190c6-10 20-10 24 0-4 8-18 8-24 0z', '#FFAB91', 2.5) + face(188, 206, 0.3)),

  L('mudflat', 'จับปูบนหาดเลนอินชอน', 'Looking for crabs on the Incheon mudflats', ['mudflat', 'หาดเลน', 'mudflats', 'gaetbeol', 'แกทบอล', 'tidal flat', 'ที่ราบน้ำขึ้นน้ำลง', 'mud crabs', 'ปูเลน', 'rubber boots', 'รองเท้าบูต', 'sorae wetland', 'ซอแร'], nm('หาปูตัวเล็กที่มีตาโผล่ยาวขึ้นมาสองข้าง', 'Find the little crab with its eyes on tall stalks'),
    // grey-brown mud with shiny puddles and little holes, a child in yellow rubber boots with a red bucket and a tiny rake, two smiling crabs with eyes on stalks
    bot(112, '#A1887F', 1, 14) + E(60, 150, 30, 8, '#B3E5FC', 2.5) + E(184, 204, 26, 7, '#B3E5FC', 2.5)
    + [[110, 210], [140, 150], [200, 130], [30, 200]].map(([x, y]) => E(x, y, 5, 3, '#5D4037', 0)).join('')
    + kid(76, 66, 0.9, '#81C784') + R(60, 118, 16, 22, '#FFEB3B', 4, 3) + R(80, 118, 16, 22, '#FFEB3B', 4, 3)
    + P('M110 108h28l-4 26h-20z', '#E53935') + Lc('M110 108q14-14 28 0', INK, 2.5) + Lc('M48 96l-14 38M28 132h12', '#8D6E63', 4)
    + [[160, 184, 1], [196, 158, 0.75]].map(([x, y, s]) => E(x, y, 24 * s, 14 * s, '#EF6C00') + Lc(`M${x - 8 * s} ${y - 10 * s}v${-12 * s}M${x + 8 * s} ${y - 10 * s}v${-12 * s}`, '#EF6C00', 3) + C(x - 8 * s, y - 24 * s, 4 * s, '#FFFFFF', 2) + C(x + 8 * s, y - 24 * s, 4 * s, '#FFFFFF', 2)
      + Lc(`M${x - 22 * s} ${y - 4 * s}l${-12 * s} ${-12 * s}M${x + 22 * s} ${y - 4 * s}l${12 * s} ${-12 * s}M${x - 20 * s} ${y + 8 * s}l${-10 * s} ${8 * s}M${x + 20 * s} ${y + 8 * s}l${10 * s} ${8 * s}`, '#EF6C00', 4) + face(x, y + 2 * s, 0.32 * s)).join('')),

  L('tribowl', 'อาคารไตรโบวล์รูปชามเหนือน้ำ', 'Tri-Bowl, the bowl-shaped building over the water', ['tri-bowl', 'ไตรโบวล์', 'tribowl', 'bowl-shaped building', 'อาคารรูปชาม', 'songdo', 'ซงโด', 'reflecting pool', 'สระสะท้อนเงา', 'night lights', 'ไฟยามค่ำ'], nm('หาเงาของชามที่สะท้อนอยู่ในน้ำ', 'Find the bowl\'s reflection in the water'),
    // a wide white bowl-shaped building, wider at the top, standing on three little cone legs over a pale blue pool, its reflection below, glass towers behind
    R(28, 40, 26, 96, '#BBDEFB', 0, 3) + R(186, 30, 28, 106, '#90CAF9', 0, 3) + R(160, 60, 22, 76, '#BBDEFB', 0, 3)
    + R(8, 136, 224, 80, '#B3E5FC', 10) + P('M44 168c20 30 132 30 152 0z', '#E3F2FD', 2.5) + Lc('M30 196q8-5 16 0M170 200q8-5 16 0', '#FFFFFF', 3)
    + P('M80 136l10-30 10 30zM112 136l8-30 8 30zM140 136l10-30 10 30z', '#ECEFF1') + P('M30 64c10 34 50 50 90 50s80-16 90-50c-30-12-150-12-180 0z', '#FFFFFF')
    + E(120, 66, 90, 12, '#E3F2FD', 3) + Lc('M54 88c40 12 92 12 132 0', '#B0BEC5', 2.5) + face(120, 92, 0.5)),

  L('dolmen', 'โต๊ะหินยักษ์ที่เกาะคังฮวา', 'The giant stone-table dolmen on Ganghwa Island', ['ganghwa dolmen', 'หินดอลเมนคังฮวา', 'dolmen', 'ดอลเมน', 'bugeun-ri dolmen', 'ดอลเมนพูกึนรี', 'stone table', 'โต๊ะหินยักษ์', 'ganghwa island', 'เกาะคังฮวา', 'world heritage', 'มรดกโลก'], nm('หาเด็กตัวเล็กที่ยืนข้างหินก้อนใหญ่', 'Find the tiny child standing next to the huge stone'),
    // a huge flat grey capstone resting on two upright stones like a table, a smiling face on its edge, green grass with yellow flowers, a small child beside it for size, a soft hill behind
    bot(162, '#9CCC65', 1, 30)
    + P('M66 176l6-60h30l-2 60zM142 176l-4-60h30l6 60z', '#90A4AE') + P('M30 116c4-20 40-30 92-30s88 8 92 26c-4 12-40 18-92 18s-88-4-92-14z', '#B0BEC5')
    + Lc('M60 100c30-6 90-8 130 0', '#78909C', 2.5) + face(122, 112, 0.5)
    + kid(200, 146, 0.48, '#F48FB1') + [[30, 200], [52, 214], [170, 206], [214, 220], [98, 222]].map(([x, y]) => C(x, y, 5, '#FFEB3B', 2) + C(x, y, 1.6, '#FB8C00', 0)).join('')),

  L('somuuido', 'สะพานเดินข้ามไปเกาะโซมูอีโด', 'The footbridge to little Somuuido', ['somuuido', 'โซมูอีโด', 'muuido', 'มูอีโด', 'footbridge', 'สะพานคนเดิน', 'island walk', 'เดินรอบเกาะ', 'small island village', 'หมู่บ้านบนเกาะเล็ก', 'yeongjong island', 'เกาะยองจง'], nm('หาเด็กสองคนที่กำลังเดินข้ามสะพาน', 'Find the two children walking across the bridge'),
    // a long low footbridge with a blue railing running across the sea to a small round green island with a few red-roofed houses, two children walking on it, a big island edge on the left
    bot(120, '#4FC3F7', 1) + Lc('M30 210q8-5 16 0t16 0M130 220q8-5 16 0', '#E1F5FE', 3) + P('M12 134c22-16 40-6 48 8v26H12z', '#81C784')
    + P('M148 150c0-40 28-62 54-62s26 30 26 62z', '#66BB6A') + [[184, 116, '#EF5350'], [212, 108, '#FF8A65']].map(([x, y, c]) => R(x - 10, y, 20, 18, '#FFF8E1', 2, 3) + P(`M${x - 14} ${y + 2}l14-12 14 12z`, c)).join('')
    + P('M40 166l124-26 4 10-124 26z', '#BCAAA4') + Lc('M42 158l126-26', '#1E88E5', 4) + Lc('M60 162v-8M90 156v-8M120 150v-8M150 144v-8', '#1E88E5', 3)
    + Lc('M60 172v20M100 164v20M140 156v20', '#90A4AE', 4)
    + kid(92, 110, 0.5, '#FFEB3B') + kid(118, 104, 0.48, '#F48FB1') + face(206, 134, 0.36)),

  L('mokseom', 'ทางทรายโผล่กลางทะเลที่ซอนแจโด', 'The sand path to Mokseom that appears at low tide on Seonjaedo', ['mokseom', 'มกซอม', 'seonjaedo', 'ซอนแจโด', 'low tide path', 'ทางเดินตอนน้ำลง', 'sandbar walk', 'เดินบนสันทราย', 'sea road', 'ถนนกลางทะเล', 'ongjin islands', 'หมู่เกาะอองจิน'], nm('หารอยเท้าเล็กๆ บนทางทราย', 'Find the little footprints on the sand path'),
    // a calm sea split by a curving pale sand path running out to a tiny round island with pine trees, a child walking on the path with footprints behind, the low sun
    top(100, '#B3E5FC') + bot(100, '#4FC3F7') + frame() + C(52, 52, 16, '#FFF59D', 3)
    + P('M30 228c16-44 54-74 98-100 30-16 50-22 70-26l6 8c-20 6-40 12-64 28-42 28-72 56-86 90z', '#FFE0B2')
    + P('M150 108c0-26 18-40 38-40s38 14 38 40z', '#8D6E63') + [[166, 78], [188, 64], [210, 80]].map(([x, y]) => P(`M${x - 14} ${y + 16}l14-28 14 28z`, '#388E3C') + Lc(`M${x} ${y + 16}v10`, '#6D4C41', 4)).join('')
    + face(188, 94, 0.32) + kid(84, 120, 0.5, '#FF7043')
    + [[60, 196], [48, 214], [70, 178]].map(([x, y]) => E(x, y, 3, 5, '#BCAAA4', 0)).join('') + Lc('M180 160q8-5 16 0t16 0M20 120q8-5 16 0', '#E1F5FE', 3)),

  L('airport', 'สนามบินอินชอนและเครื่องบินขึ้น', 'Incheon Airport and a plane taking off', ['incheon airport', 'สนามบินอินชอน', 'incheon international airport', 'ท่าอากาศยานนานาชาติอินชอน', 'ICN', 'airport', 'สนามบิน', 'plane taking off', 'เครื่องบินขึ้น', 'control tower', 'หอบังคับการบิน', 'arrival day', 'วันมาถึง'], nm('หาหอบังคับการบินที่สูงกว่าตึกทุกหลัง', 'Find the control tower taller than everything else'),
    // a long glass terminal with a wavy roof, a tall control tower with a round cab, a runway with dashes, a smiling jet climbing up into the sky
    R(0, 196, 240, 30, '#90A4AE', 4) + Lc('M14 211h22M54 211h22M94 211h22M134 211h22M174 211h22M214 211h22', '#FFFFFF', 4)
    + R(16, 150, 156, 44, '#B3E5FC', 4) + Lc('M40 150v44M66 150v44M92 150v44M118 150v44M144 150v44', '#64B5F6', 2.5)
    + P('M8 152c26-20 46-20 64-6 20-16 42-16 60 0 18-14 40-14 48 6z', '#ECEFF1') + R(196, 100, 16, 96, '#ECEFF1', 2) + P('M184 100l6-22h36l6 22z', '#4FC3F7') + R(186, 66, 44, 12, '#ECEFF1', 4, 3)
    + Lc('M208 66v-12', INK, 3) + C(208, 52, 3, '#E53935', 2) + plane(104, 82, 1.05, '#1565C0') + face(132, 84, 0.3) + Lc('M30 104h30M18 118h34', '#FFFFFF', 4)),

  L('eurwangni', 'หาดอึลวังนีกับเครื่องบินบินผ่าน', 'Eurwangni Beach on Yeongjong, with planes flying over', ['eurwangni beach', 'หาดอึลวังนี', 'eurwangni', 'อึลวังนี', 'yeongjong island', 'เกาะยองจง', 'beach near the airport', 'หาดใกล้สนามบิน', 'planes overhead', 'เครื่องบินบินผ่าน', 'beach camping', 'กางเต็นท์ริมหาด'], nm('หาเครื่องบินที่บินต่ำอยู่เหนือหาด', 'Find the plane flying low over the beach'),
    // a pink-orange evening sky with a small jet passing over, a wide sea, a sandy beach with a striped tent, a child with a spade by a little sand mound and a bucket
    top(112, '#FFCCBC') + C(180, 104, 20, '#FFB74D', 3) + plane(84, 52, 0.72, '#EF5350') + face(104, 52, 0.2)
    + mid(112, 156, '#4FC3F7') + Lc('M20 132q8-5 16 0t16 0M150 140q8-5 16 0t16 0', '#E1F5FE', 3) + bot(154, '#FFE0B2', 0, 10) + frame()
    + P('M150 210l36-56 36 56z', '#FFFFFF') + Lc('M168 182l18-28 18 28', '#EF5350', 6) + P('M178 210l8-22 8 22z', '#5D4037', 3)
    + kid(64, 160, 0.62, '#81C784') + P('M90 214c4-20 40-20 44 0z', '#FFCC80') + Lc('M88 196l12-22', '#8D6E63', 4) + P('M96 170l8-6 2 10z', '#90A4AE', 2.5)
    + P('M124 224l-4-18h22l-4 18z', '#42A5F5')),

  L('incheonbridge', 'สะพานอินชอนข้ามทะเล', 'Incheon Bridge, the long bridge across the sea', ['incheon bridge', 'สะพานอินชอน', 'sea bridge', 'สะพานข้ามทะเล', 'cable-stayed bridge', 'สะพานขึงแบบตัวเอ', 'airport road', 'ถนนไปสนามบิน', 'songdo to yeongjong', 'ซงโดไปยองจง', 'ship under the bridge', 'เรือลอดสะพาน'], nm('หาเรือที่กำลังลอดใต้สะพาน', 'Find the ship sailing under the bridge'),
    // a long deck over the sea held by two tall pale upside-down-Y pylons with fans of cables, a smiling little car crossing, a cargo ship sailing underneath
    bot(150, '#4FC3F7', 1) + Lc('M24 214q8-5 16 0t16 0M170 210q8-5 16 0', '#E1F5FE', 3)
    + fan(74, 34, 126, 60, 5) + fan(166, 34, 126, 60, 5) + pylon(74, 126, 96) + pylon(166, 126, 96)
    + R(4, 122, 232, 12, '#ECEFF1', 3) + Lc('M60 140v14M120 140v14M180 140v14', '#B0BEC5', 6)
    + R(104, 104, 34, 16, '#FFCA28', 6) + R(110, 94, 20, 12, '#FFCA28', 4, 3) + C(110, 120, 5, INK, 0) + C(132, 120, 5, INK, 0) + face(121, 110, 0.22)
    + P('M84 184h76l-10 18H96z', '#E53935') + R(96, 168, 16, 16, '#FFB300', 2, 3) + R(114, 168, 16, 16, '#26A69A', 2, 3) + R(132, 172, 14, 12, '#42A5F5', 2, 3)),
];

export default {
  places: {
    'kr-incheon': { country: 'kr', wave: 3, name: nm('อินชอน', 'Incheon'), tz: 'Asia/Seoul', ll: [37.46, 126.71], alias: ['incheon', 'อินชอน', 'อินช็อน', '인천', 'wolmido', 'วอลมีโด', 'songdo central park', 'yeongjongdo', 'yeongjong island', 'เกาะยองจง', 'muuido', 'มูอีโด', 'ganghwa', 'ganghwado', 'คังฮวา', 'seonjaedo', 'eurwangni'], colors: IC },
  },
  items,
};
