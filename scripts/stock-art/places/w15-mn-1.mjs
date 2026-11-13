// Wave 15, group mn (1 of 3): Mongolia, the country — stamp, flag, hello, two guides (a Mongolian gerbil and a taimen, the
// giant river salmon) and fifteen pictures of the country's own food, animals, music, clothes and ways of getting about.
// No horses, camels, eagles or yurts as their own picture, no airag (alcohol), no aaruul (Kazakhstan's kurt is the same idea),
// no shaman or ovoo, no wrestling, no knucklebones (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const G = (cc, key, th, en, hth, hen, kw, svg) => ({ id: `${cc}.guide.${key}`, cat: 'guide', file: `${cc}/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });
const X = (cat, key, th, en, kw, svg) => ({ id: `mn.${cat}.${key}`, cat, file: `mn/${cat}-${key}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) });
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +(+v).toFixed(1);
const pole = Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A');
const flagShape = 'M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z';
const MN = { k1: '#C4272F', k2: '#015197', k3: '#FFD54F' };
const GOLD = '#FFD200';

const items = [
  { id: 'mn.stamp', cat: 'stamp', file: 'mn/stamp.v1.svg', name: nm('ตราประทับมองโกเลีย', 'Mongolia stamp'), kw: ['mongolia', 'มองโกเลีย', 'steppe', 'ทุ่งหญ้าสเตปป์', 'blue sky', 'ฟ้าสีคราม'],
    // the "land of the blue sky": a round sky over rolling green steppe, a big smiling sun and one white cloud
    svg: countryStamp({ name: 'MONGOLIA', ...MN, emblem: C(100, 88, 56, '#64B5F6', 3) + ring(10, (k) => { const a = (k / 10) * Math.PI * 2; return Lc(`M${f1(126 + Math.cos(a) * 16)} ${f1(64 + Math.sin(a) * 16)}L${f1(126 + Math.cos(a) * 22)} ${f1(64 + Math.sin(a) * 22)}`, '#FFB300', 3); }) + C(126, 64, 12, '#FFCA28', 2.5)
      + P('M62 70c0-8 10-10 14-4 4-6 14-4 14 4z', '#FFFFFF', 2.5) + P('M45.3 100c18-14 36-14 54-4s36-12 55.4 4A56 56 0 0 1 45.3 100z', '#7CB342', 3) + P('M58 124c14-8 30-8 44 0s30-8 40-2', 'none', 2) + face(126, 64, 0.22, 'none') }) },
  { id: 'mn.flag', ch: '🇲🇳', cat: 'flag', file: 'mn/flag.v1.svg', name: nm('ธงมองโกเลีย', 'Flag of Mongolia'), kw: ['mongolia', 'มองโกเลีย', 'flag', 'ธง', 'soyombo', 'โซยอมโบ'],
    // three upright bands, red, blue, red, with the golden soyombo sign (flame, sun, moon, triangles, bars and a round fish sign) on the red band by the pole
    svg: free(pole + P(flagShape, '#C4272F') + P('M100 36.6C118 40 138 44 156 41.1V153C138 156 118 152 100 148.6z', '#015197', 0)
      + `<g fill="${GOLD}" stroke="none">` + P('M72 48c-6 6-7 13 0 16 7-3 6-10 0-16z', GOLD, 0) + C(72, 72, 5, GOLD, 0) + P('M64 80a8 6 0 0 0 16 0a8 3 0 0 1-16 0z', GOLD, 0) + P('M64 90h16l-8 8z', GOLD, 0) + R(64, 101, 16, 4, GOLD) + C(72, 115, 8, GOLD, 0) + R(64, 126, 16, 4, GOLD) + P('M64 132h16l-8 8z', GOLD, 0) + R(57, 90, 4, 50, GOLD) + R(83, 90, 4, 50, GOLD) + '</g>'
      + `<path d="M72 107a4 4 0 0 1 0 8a4 4 0 0 0 0 8" fill="none" stroke="#C4272F" stroke-width="2"/>` + P(flagShape, 'none')) },
  { id: 'mn.hello', cat: 'hello', file: 'mn/hello.v1.svg', name: nm('ซายน์ บายนู สวัสดี', 'Sain baina uu, hello'), kw: ['sain baina uu', 'ซายน์ บายนู', 'hello', 'สวัสดี', 'mongolian', 'ภาษามองโกเลีย', 'deel', 'เดล'],
    // a child in a blue deel robe with a curved gold collar and an orange sash, a pointed red hat with a fur brim and a gold knot on top, waving
    svg: free(P('M78 214c0-42 18-60 42-60s42 18 42 60z', '#1E88E5') + Lc('M100 160c8 14 24 22 40 18', '#FFCA28', 5) + C(138, 176, 3.5, '#FFCA28', 2) + C(132, 168, 3.5, '#FFCA28', 2) + R(82, 190, 76, 12, '#FF7043', 3, 3)
      + P('M154 154c12-16 18-36 16-52l14 2c2 20-6 42-18 56z', '#1E88E5') + R(166, 100, 18, 8, '#FFCA28', 3, 2.5) + C(178, 90, 11, '#E8B88A')
      + C(120, 118, 30, '#E8B88A') + P('M94 100c0-28 14-40 26-46 12 6 26 18 26 46z', '#E53935') + P('M86 104c0-10 68-10 68 0 0 8-68 8-68 0z', '#6D4C41') + C(120, 52, 6, '#FFCA28', 2.5) + Lc('M146 102c10 6 14 20 10 34', '#E53935', 4)
      + face(120, 124, 0.55)) },
  G('mn', 'ogi', 'โอกิ', 'Ogi', 'ซายน์ บายนู {name}! โอกิจะพาเที่ยวทุ่งหญ้าเอง', 'Sain baina uu, {name}! Ogi will show you the steppe', ['mongolian gerbil', 'เจอร์บิลมองโกเลีย', 'gerbil', 'เจอร์บิล', 'steppe animal', 'สัตว์ทุ่งหญ้า'],
    // a sandy Mongolian gerbil holding a seed: round ears, a cream tummy, a pink nose and a long tail ending in a dark tuft
    Lc('M168 196c44-6 56-56 32-90', '#C8A27A', 9) + C(202, 104, 9, '#6D4C41') + [[78, 74], [162, 74]].map(([x, y]) => C(x, y, 20, '#D9B48F') + C(x, y, 10, '#F8BBD0', 0)).join('') + E(120, 134, 64, 58, '#E3C29B') + E(120, 166, 34, 22, '#FFF3E0', 0)
      + E(120, 150, 7, 5, '#F48FB1', 2) + Lc('M100 152l-30-4M100 158l-28 6M140 152l30-4M140 158l28 6', INK, 2) + E(104, 188, 11, 9, '#E3C29B') + E(136, 188, 11, 9, '#E3C29B') + E(120, 192, 10, 7, '#FFCA28', 2.5) + face(120, 128, 1.2, 'none')),
  G('mn', 'tuli', 'ตูลี', 'Tuli', 'ตูลีเป็นปลาตัวใหญ่ที่สุดในแม่น้ำ ว่ายน้ำไปด้วยกันนะ {name}', 'Tuli is the biggest fish in the river — swim along, {name}!', ['taimen', 'ปลาไทเมน', 'giant salmon', 'แซลมอนยักษ์', 'river fish', 'ปลาแม่น้ำ', 'fish', 'ปลา'],
    // a taimen, the giant river salmon of the north: a long olive-and-copper body with little black spots, a bright red tail and fins
    P('M188 118l38-32-6 40 6 40-38-32z', '#D84315') + P('M104 96c8-20 34-22 44-4z', '#D84315') + P('M114 162c6 14 24 16 32 4z', '#D84315')
      + P('M18 132c8-36 64-52 124-42 30 4 46 18 56 32-10 12-26 28-56 32-60 10-116-4-124-22z', '#8D9F6A') + P('M24 140c40 18 120 18 172-14-8 14-26 26-54 30-60 10-108-2-118-16z', '#FFCC80', 0)
      + ring(14, (k) => C(96 + (k % 7) * 14, 104 + Math.floor(k / 7) * 12 + (k % 2) * 4, 2.5, INK, 0)) + P('M70 102c-6 14-6 30 0 44', 'none', 3) + face(42, 124, 0.62, 'o')),
  X('food', 'buuz', 'บูซ เกี๊ยวนึ่งมองโกเลีย', 'Buuz, Mongolian steamed dumplings', ['buuz', 'บูซ', 'steamed dumplings', 'เกี๊ยวนึ่ง', 'tsagaan sar', 'ซากานซาร์', 'lunar new year', 'mongolian food', 'อาหารมองโกเลีย'],
    // a round plate of plump white buuz, each pinched into a swirl of pleats with a little open hole at the top, steam rising, a small bowl of carrot-cabbage salad
    E(112, 176, 96, 30, '#ECEFF1') + E(112, 172, 84, 24, '#FFFFFF', 3) + [[72, 162], [112, 168], [152, 162], [92, 136], [132, 136]].map(([x, y]) => E(x, y, 24, 20, '#FFFDF5', 3) + ring(6, (k) => { const a = Math.PI * (1.05 + k * 0.18); return Lc(`M${x} ${y - 10}L${f1(x + Math.cos(a) * 20)} ${f1(y - 4 + Math.sin(a) * 10 + 10)}`, '#E0D3B8', 2); }) + C(x, y - 12, 4, '#A1673F', 2)).join('')
      + ring(3, (k) => Lc(`M${92 + k * 20} 108c-6-10 6-14 0-26`, '#B0BEC5', 3)) + E(206, 180, 22, 10, '#FFFFFF', 2.5) + ring(5, (k) => Lc(`M${194 + k * 6} 178l4-6`, ['#FF9800', '#AED581'][k % 2], 3)) + face(112, 166, 0.36)),
  X('food', 'khuushuur', 'คูชูร์ แป้งทอดไส้เนื้อ', 'Khuushuur, big fried meat pies', ['khuushuur', 'คูชูร์', 'fried meat pie', 'แป้งทอดไส้เนื้อ', 'naadam food', 'อาหารงานนาดัม', 'street food', 'ของกินข้างทาง', 'mongolian food', 'อาหารมองโกเลีย'],
    // two big flat golden-brown half-moon pies with a twisted rope edge and little fried bubbles, stacked on paper, one bitten to show the meat, a pickle beside them
    R(30, 150, 180, 56, '#FFF8E1', 10) + Lc('M30 160h180', '#FFE0B2', 3) + g(118, 150, 1, P('M-80 10c0-56 160-56 160 0z', '#D9893A') + ring(13, (k) => C(-74 + k * 12.3, 10 - Math.sin((k / 12) * Math.PI) * 4, 5, '#B86A26', 2)) + ring(7, (k) => C(-40 + (k % 4) * 24, -14 - Math.floor(k / 4) * 12, 2.5, '#F4B062', 0)), -4)
      + g(124, 112, 1, P('M-70 10c0-48 140-48 140 0z', '#E6A050') + ring(11, (k) => C(-64 + k * 12.8, 10 - Math.sin((k / 10) * Math.PI) * 4, 5, '#C47A30', 2)) + P('M40 10c0-14 12-22 30-16v16z', '#8D4E2A', 2.5) + face(-8, -10, 0.42), 6)
      + E(200, 176, 14, 9, '#9CCC65') + Lc('M190 176h20', '#689F38', 2)),
  X('food', 'tsuivan', 'ซุยวาน ผัดเส้นแป้งตัดกับเนื้อ', 'Tsuivan, stir-fried hand-cut noodles', ['tsuivan', 'ซุยวาน', 'stir-fried noodles', 'ผัดเส้น', 'hand-cut noodles', 'เส้นตัดมือ', 'home cooking', 'อาหารบ้าน', 'mongolian food', 'อาหารมองโกเลีย'],
    // a wide plate piled with short flat hand-cut noodles, orange carrot sticks, green cabbage and little meat pieces, a fork stuck in the top
    E(120, 168, 100, 34, '#FFFFFF') + E(120, 168, 86, 26, '#E3F2FD', 0) + P('M50 162c10-40 130-40 140 0-30 14-110 14-140 0z', '#F3D9A4') + ring(16, (k) => Lc(`M${64 + (k % 8) * 15} ${138 + Math.floor(k / 8) * 14 + (k % 3) * 2}l${k % 2 ? 12 : -10} ${k % 3 ? 4 : -4}`, '#E5BE7A', 4))
      + ring(6, (k) => Lc(`M${74 + k * 18} ${150 - (k % 2) * 12}l8 -4`, '#FF8A1F', 4)) + ring(4, (k) => P(`M${86 + k * 22} ${136 + (k % 2) * 16}c4-6 12-4 10 2z`, '#9CCC65', 2)) + ring(5, (k) => R(78 + k * 20, 144 - (k % 2) * 10, 7, 6, '#8D5A3B', 2, 2)) + Lc('M150 128l26-60', '#B0BEC5', 5) + Lc('M170 70l6-14M176 72l8-12M164 68l4-14', '#B0BEC5', 3) + face(112, 150, 0.4)),
  X('food', 'ulboov', 'อุลบูฟ ขนมชั้นวันปีใหม่', 'Ul boov, the New Year biscuit tower', ['ul boov', 'อุลบูฟ', 'tsagaan sar', 'ซากานซาร์', 'white moon', 'ปีใหม่มองโกเลีย', 'biscuit tower', 'ขนมชั้น', 'sweets', 'ขนม'],
    // a tower of long pressed biscuits stacked in odd-numbered layers on a round dish, sugar cubes and bright sweets heaped on the top
    E(120, 204, 86, 16, '#FFCA28') + ring(5, (k) => { const y = 186 - k * 22, w = 120 - k * 8; return ring(3, (j) => R(120 - w / 2 + j * (w / 3) + 2, y - 18, w / 3 - 4, 18, ['#E9B872', '#DFA65A'][(k + j) % 2], 6, 3) + ring(3, (q) => C(120 - w / 2 + j * (w / 3) + 10 + q * ((w / 3 - 20) / 2), y - 9, 1.8, '#B07A3A', 0))); })
      + ring(5, (k) => R(92 + k * 11, 56, 10, 10, '#FFFFFF', 2, 2)) + ring(4, (k) => C(98 + k * 15, 46, 6, ['#E53935', '#1E88E5', '#43A047', '#FF4081'][k], 2)) + face(120, 140, 0.4)),
  X('food', 'seabuckthorn', 'น้ำซีบัคธอร์น', 'Sea buckthorn juice', ['sea buckthorn', 'ซีบัคธอร์น', 'chatsargana', 'ชัทซาร์กานา', 'orange berries', 'ผลเบอร์รี่สีส้ม', 'juice', 'น้ำผลไม้', 'drink', 'เครื่องดื่ม'],
    // a thorny branch packed tight with little shiny orange berries and thin silver leaves, a glass of bright orange juice beside it
    Lc('M24 200C60 150 80 90 70 30', '#8D6E63', 6) + ring(9, (k) => P(`M${f1(64 + Math.sin(k) * 4)} ${44 + k * 16}c-22-8-34-2-40 6 18 4 30 2 40-6z`, '#B0BEC5', 2)) + ring(22, (k) => C(f1(70 + (k % 3) * 9 - Math.min(k, 14) * 0.6), f1(52 + Math.floor(k / 3) * 18 + (k % 2) * 5), 5.5, '#FF8F00', 2))
      + P('M126 92h70l-8 116h-54z', '#E3F2FD') + P('M130 118h62l-6 86h-50z', '#FF9800', 0) + P('M126 92h70l-8 116h-54z', 'none') + C(176, 84, 9, '#FF8F00', 2.5) + Lc('M150 70l20 60', '#E53935', 4) + face(160, 156, 0.45)),
  X('food', 'urum', 'อูรึม ครีมนมต้ม', 'Urum, thick cream from boiled milk', ['urum', 'อูรึม', 'clotted cream', 'ครีมข้น', 'milk skin', 'ฟองนม', 'breakfast', 'อาหารเช้า', 'dairy', 'นมเนย'],
    // a wide pan of milk with a thick wrinkly golden skin of cream on top, one folded slice lifted onto a plate and sprinkled with sugar
    E(84, 120, 70, 26, '#B0BEC5') + E(84, 116, 62, 20, '#FFF3C4') + ring(4, (k) => Lc(`M${40 + k * 22} ${112 + (k % 2) * 6}c6-4 10 4 16 0`, '#E8CF88', 2.5)) + Lc('M146 116h28', '#78909C', 6)
      + E(150, 186, 72, 20, '#FFFFFF') + P('M98 180c10-30 90-34 104-8-10 14-90 22-104 8z', '#FFF0B3') + Lc('M110 178c26-12 60-14 84-6', '#E8CF88', 3) + ring(9, (k) => R(112 + k * 9, 164 + (k % 3) * 4, 3, 3, '#FFFFFF', 0, 1)) + face(150, 176, 0.38)),
  X('animal', 'sable', 'เซเบิลในป่าสนทางเหนือ', 'A sable in the northern forest', ['sable', 'เซเบิล', 'marten', 'มาร์เทน', 'taiga', 'ป่าไทกา', 'khuvsgul', 'คุฟสกุล', 'forest animal', 'สัตว์ป่า'],
    // a sable sitting up on a branch: a glossy dark brown coat, a pale orange bib on its throat, round ears and a big bushy tail
    Lc('M10 196h220', '#8D6E63', 10) + ring(6, (k) => Lc(`M${30 + k * 36} 196l${k % 2 ? 10 : -10} -20`, '#7CB342', 4))
      + P('M168 168c30 4 56-10 64-36-20 6-40 4-56 4z', '#4E342E') + E(130, 160, 62, 22, '#5D4037') + ring(4, (k) => E(90 + k * 26, 180, 8, 12, '#4E342E')) + E(70, 148, 32, 26, '#6D4C41')
      + C(52, 124, 9, '#4E342E') + C(84, 122, 9, '#4E342E') + P('M40 150c-10 6-14 12-14 16 10 4 22 2 30-4z', '#BCAAA4') + E(27, 164, 5, 4, INK, 0) + P('M66 172c8 6 20 6 28 0-6-8-22-8-28 0z', '#FFB74D', 2.5) + face(66, 146, 0.42, 'none')),
  X('animal', 'snowcock', 'ไก่ภูเขาอัลไต', 'An Altai snowcock', ['altai snowcock', 'ไก่ภูเขาอัลไต', 'snowcock', 'สโนว์ค็อก', 'mountain bird', 'นกภูเขา', 'altai mountains', 'เทือกเขาอัลไต', 'bird', 'นก'],
    // a plump grey mountain bird standing on a rock: a white face and chest stripe, brown streaks down its sides, an orange beak, a white tail tip
    P('M20 210c10-30 40-40 100-40s90 10 100 40z', '#9E9E9E') + Lc('M60 196c20-6 40-6 60 0', '#757575', 3) + P('M170 132c24-6 40 6 44 20-16 0-30-4-44-8z', '#ECEFF1')
      + E(120, 134, 62, 44, '#9EA7AD') + ring(5, (k) => Lc(`M${118 + k * 12} 120c4 10 4 22 -2 32`, '#8D6E63', 3)) + E(96, 148, 24, 18, '#ECEFF1', 0) + C(74, 92, 30, '#9EA7AD') + P('M58 98c4 18 22 26 34 22', '#FFFFFF', 3) + P('M42 92l-14 6 14 6z', '#FF9800', 2.5)
      + Lc('M104 176v18M134 176v18', '#FF9800', 4) + face(74, 88, 0.42, 'none')),
  X('animal', 'lark', 'นกลาร์กมองโกเลีย', 'A Mongolian lark singing in the sky', ['mongolian lark', 'นกลาร์กมองโกเลีย', 'lark', 'นกลาร์ก', 'skylark', 'birdsong', 'เสียงนกร้อง', 'steppe bird', 'นกทุ่งหญ้า'],
    // a little brown lark fluttering high over the grass, a black collar on its chest, white patches on its wings, musical notes floating from its beak
    P('M-4 214c50-16 140-16 248 0v30H-4z', '#9CCC65') + ring(9, (k) => Lc(`M${14 + k * 26} 210l${k % 2 ? 4 : -4} -16`, '#7CB342', 3))
      + P('M86 112c-14-30-36-38-48-28 10 8 24 20 40 34z', '#A1887F') + P('M146 110c16-30 38-36 50-24-10 8-26 18-42 32z', '#A1887F') + ring(2, (k) => P(`M${k ? 170 : 58} ${k ? 94 : 96}l${k ? 12 : -12} -2 -2 10z`, '#FFFFFF', 2))
      + E(116, 120, 42, 34, '#BCAAA4') + E(116, 132, 26, 18, '#FFF8E1', 0) + Lc('M94 116c14 6 30 6 44 0', INK, 5) + P('M154 110l18 4-18 6z', '#FFCA28', 2.5) + P('M78 130l-24 14 26 0z', '#8D6E63') + face(126, 104, 0.4, 'o')
      + `<g fill="${INK}" stroke="none">` + C(182, 70, 5, INK, 0) + C(204, 58, 5, INK, 0) + '</g>' + Lc('M187 70V50M209 58V38M187 50l22-12', INK, 3)),
  X('culture', 'deel', 'ชุดเดลของมองโกเลีย', 'A deel, the Mongolian robe', ['deel', 'เดล', 'traditional robe', 'ชุดคลุมดั้งเดิม', 'national dress', 'ชุดประจำชาติ', 'sash', 'ผ้าคาดเอว', 'naadam', 'นาดัม'],
    // a bright silk deel robe standing open-armed: a wide flap crossing to the right side with round gold knot buttons, a raised collar, a long orange sash and hoof-shaped cuffs
    P('M70 76c14-14 32-22 50-22s36 8 50 22l52 44-18 22-34-24v118H70V118l-34 24-18-22z', '#8E24AA') + P('M120 64c-6 0-12 2-16 6l16 6 16-6c-4-4-10-6-16-6z', '#FFCA28', 3)
      + P('M104 70c4 30 30 50 66 60v-12c-28-10-44-26-50-48z', '#BA68C8', 3) + [[150, 102], [164, 112], [170, 124]].map(([x, y]) => C(x, y, 4, '#FFCA28', 2)).join('') + R(70, 150, 100, 16, '#FF7043', 3, 3) + Lc('M150 166c4 14 2 26 -4 34M158 166c6 12 6 24 2 34', '#FF7043', 5)
      + P('M18 120l18 22 10-6-16-26z', '#FFCA28', 3) + P('M222 120l-18 22-10-6 16-26z', '#FFCA28', 3) + Lc('M70 236h100', '#FFCA28', 5) + face(120, 110, 0.5)),
  X('culture', 'morinkhuur', 'ซอหัวม้า มอริน คูร์', 'The morin khuur, the horsehead fiddle', ['morin khuur', 'มอรินคูร์', 'horsehead fiddle', 'ซอหัวม้า', 'two strings', 'ซอสองสาย', 'folk music', 'ดนตรีพื้นเมือง', 'instrument', 'เครื่องดนตรี'],
    // an upright fiddle with a flat trapezoid sound box, a long thin neck crowned by a little carved horse's head, two tuning pegs and two strings, a curved bow across it
    P('M86 150h68l10 74H76z', '#A1673F') + P('M96 164h48l6 46H90z', '#D7A86E', 2.5) + P('M108 196c4-6 20-6 24 0', 'none', 2) + R(113, 38, 14, 116, '#8D5524', 4)
      + P('M106 40c-4-14 2-28 18-30 10 0 18 6 18 14l-8 2c-2 6 0 10 0 14z', '#8D5524') + Lc('M118 14c2-6 8-8 14-6', INK, 3) + C(128, 22, 2.5, INK, 0) + [[104, 70], [136, 70]].map(([x, y]) => R(x - 7, y - 4, 14, 8, '#6D4C41', 3, 2.5)).join('')
      + Lc('M117 60V210M123 60V210', '#ECEFF1', 2) + R(110, 200, 20, 6, '#3E2723', 2, 2) + Lc('M30 140C80 110 170 116 214 150', '#8D6E63', 5) + Lc('M34 146C84 118 168 124 210 156', '#FFF8E1', 2) + face(120, 186, 0.4)),
  X('culture', 'khoomei', 'ร้องเพลงคอคูเมย์', 'Khoomei throat singing', ['khoomei', 'คูเมย์', 'throat singing', 'ร้องเพลงในลำคอ', 'two notes at once', 'เสียงสองเสียง', 'folk music', 'ดนตรีพื้นเมือง', 'concert', 'การแสดง'],
    // a child in a red deel singing a low note: wide rings of sound rolling out like waves, two little notes floating on top, mountains far behind
    P('M-4 150l50-50 30 26 40-50 50 60 40-34 38 48z', '#B39DDB') + P('M80 214c0-40 18-58 40-58s40 18 40 58z', '#E53935') + Lc('M104 162c8 12 24 16 36 10', '#FFCA28', 4)
      + C(120, 120, 30, '#E8B88A') + P('M92 110c0-22 12-32 28-32s28 10 28 32c-8-10-18-14-28-14s-20 4-28 14z', INK) + E(120, 136, 6, 7, '#E4573D', 3)
      + ring(3, (k) => `<path d="M${156 + k * 16} ${108 - k * 10}c${12 + k * 4} 14 ${12 + k * 4} 40 0 ${54 + k * 20}" fill="none" stroke="${['#FFB300', '#4FC3F7', '#AB47BC'][k]}" stroke-width="5"/>`) + ring(3, (k) => `<path d="M${84 - k * 16} ${108 - k * 10}c-${12 + k * 4} 14 -${12 + k * 4} 40 0 ${54 + k * 20}" fill="none" stroke="${['#FFB300', '#4FC3F7', '#AB47BC'][k]}" stroke-width="5"/>`)
      + face(120, 120, 0.55, 'none') + `<g fill="${INK}" stroke="none">` + E(104, 50, 6, 5, INK, 0) + E(140, 40, 6, 5, INK, 0) + '</g>' + Lc('M110 50V30M146 40V20', INK, 3)),
  X('culture', 'biyelgee', 'ระบำบีเยลกี', 'Biyelgee, the shoulder dance', ['biyelgee', 'บีเยลกี', 'folk dance', 'ระบำพื้นเมือง', 'western mongolia', 'มองโกเลียตะวันตก', 'dance show', 'การแสดงเต้นรำ', 'costume', 'ชุดพื้นเมือง'],
    // a child dancing with arms spread wide and shoulders bobbing, a long green robe with a pink waistcoat, a round hat with a red tassel, little motion lines round the shoulders
    P('M88 214c-6-30 4-60 32-60s38 30 32 60z', '#43A047') + P('M100 156h40l4 40h-48z', '#F06292', 3) + R(94, 188, 52, 8, '#FFCA28', 2, 2.5)
      + P('M100 162c-24 0-46-14-62-34l10-10c14 14 32 24 52 26z', '#43A047') + P('M140 162c24 0 46-14 62-34l-10-10c-14 14-32 24-52 26z', '#43A047') + C(40, 120, 9, '#E8B88A') + C(200, 120, 9, '#E8B88A')
      + C(120, 116, 28, '#E8B88A') + P('M94 104c0-22 52-22 52 0z', '#6D4C41') + Lc('M120 82v-12', '#E53935', 5) + C(120, 66, 5, '#E53935', 2)
      + Lc('M70 140c-6-6-6-14 0-20M60 148c-10-10-10-24 0-34M170 140c6-6 6-14 0-20M180 148c10-10 10-24 0-34', '#AB47BC', 3) + face(120, 122, 0.5)),
  X('transport', 'motorbike', 'มอเตอร์ไซค์ของคนเลี้ยงสัตว์', "A herder's motorbike", ['herder motorbike', 'มอเตอร์ไซค์คนเลี้ยงสัตว์', 'motorbike', 'มอเตอร์ไซค์', 'countryside', 'ชนบท', 'nomad family', 'ครอบครัวเร่ร่อน', 'steppe road', 'ทางในทุ่ง'],
    // a small red motorbike with a shaggy fur cover on the seat, bright tassels hanging from the handlebars, a metal milk can tied on the back
    P('M-4 214c80-10 168-10 248 0v30H-4z', '#AED581') + [[62, 188], [182, 188]].map(([x, y]) => C(x, y, 26, INK) + C(x, y, 12, '#B0BEC5', 0) + C(x, y, 4, INK, 0)).join('')
      + P('M62 188l34-46h70l16 46', 'none', 6) + P('M88 150c0-20 20-30 50-30h20l10 30z', '#E53935') + P('M92 134c10-10 30-14 50-12v10c-18 0-34 4-46 10z', '#D7CCC8', 3) + ring(6, (k) => Lc(`M${96 + k * 8} 136v8`, '#A1887F', 2))
      + Lc('M168 140l14-40', INK, 6) + Lc('M168 100h30', INK, 5) + ring(4, (k) => Lc(`M${172 + k * 7} 104v18`, ['#E53935', '#FFCA28', '#1E88E5', '#43A047'][k], 3)) + C(196, 126, 7, '#FFF59D', 2.5)
      + R(40, 112, 30, 38, '#CFD8DC', 6) + R(46, 104, 18, 10, '#B0BEC5', 3, 2.5) + Lc('M40 128h30', '#90A4AE', 3) + face(140, 166, 0.35)),
  X('transport', 'train', 'รถไฟข้ามทุ่งหญ้ามองโกเลีย', 'The long train across the steppe', ['trans-mongolian railway', 'รถไฟทรานส์มองโกเลีย', 'trans-mongolian', 'train', 'รถไฟ', 'sleeper train', 'รถไฟนอน', 'beijing to ulaanbaatar', 'ปักกิ่งถึงอูลานบาตอร์'],
    // a long green sleeper train with a red-and-cream diesel engine winding across empty rolling grassland under a huge sky, little white curtains in the windows
    P('M-4 150c60-20 140-24 248-6v100H-4z', '#9CCC65') + Lc('M-4 196c80-20 160-24 248-20', '#8D6E63', 5) + Lc('M-4 204c80-20 160-24 248-20', '#8D6E63', 3)
      + ring(3, (k) => g(8 + k * 54, 180 - k * 6, 1, R(0, -34, 50, 34, '#2E7D32', 5) + R(4, -26, 42, 6, '#FFF8E1', 0, 0) + ring(4, (j) => R(5 + j * 11, -28, 7, 10, '#B3E5FC', 1, 2)) + C(10, 2, 5, INK) + C(40, 2, 5, INK), -2 - k * 2))
      + g(170, 164, 1, P('M0-34h34c10 0 16 10 16 20v14H0z', '#E53935') + R(0, -14, 50, 8, '#FFF8E1', 0, 0) + R(28, -30, 14, 12, '#B3E5FC', 3, 2.5) + C(10, 2, 6, INK) + C(40, 2, 6, INK) + C(52, -8, 4, '#FFF59D', 2) + face(18, -22, 0.3), -8)
      + P('M30 60c0-10 16-12 20-4 6-8 22-6 22 4z', '#FFFFFF', 3) + P('M150 46c0-8 14-10 18-2 6-6 18-4 18 2z', '#FFFFFF', 3)),
];

export default {
  places: {
    mn: { country: 'mn', wave: 3, name: nm('มองโกเลีย', 'Mongolia'), tz: 'Asia/Ulaanbaatar', alias: ['mongolia', 'มองโกเลีย'], colors: MN },
  },
  items,
};
