// Wave 9, East Asia part 4: Chengdu, Chongqing, Yunnan, Guilin, Xi'an, Zhangjiajie and Harbin
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const range = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const croof = (x, y, w, c = '#455A64') => P(`M${x - w / 2 - 10} ${y}c8-2 14-6 18-14h${w - 16}c4 8 10 12 18 14z`, c, 3.5);
const bowl = (x, y, w, c = '#FFFFFF') => P(`M${x - w} ${y}h${w * 2}c0 ${w * 0.55}-${w * 0.45} ${w * 0.8}-${w} ${w * 0.8}s-${w}-${w * 0.25}-${w}-${w * 0.8}z`, c, 4);

const items = [
  // ---------- Chengdu
  L('cn/chengdu/landmark-dandan.v1.svg', 'บะหมี่ตันตันเมี่ยนเสฉวน', 'Dan dan noodles, Sichuan style', ['dan dan noodles', 'ตันตันเมี่ยน', 'dandan mian', 'บะหมี่หาบเร่', 'chilli oil noodles', 'บะหมี่น้ำมันพริก', 'minced pork', 'หมูสับ', 'carrying pole', 'sichuan street noodles'], 'หาไม้คานหาบที่มีตะกร้าห้อยสองข้างข้างชามบะหมี่', 'Find the carrying pole with a basket on each end beside the bowl',
    // a small bowl of noodles sitting in red chilli oil, topped with crispy minced pork, crushed peanuts and green onion, an old shoulder pole with two hanging baskets behind it
    sky('#FFF8E1') + Lc('M20 60l200-20', '#A1673F', 7) + [[40, 58], [196, 42]].map(([x, y]) => Lc(`M${x} ${y}l-14 40M${x} ${y}l14 40`, '#6D4C41', 2) + P(`M${x - 22} ${y + 40}h44l-6 34h-32z`, '#D7B88A', 3)).join('')
      + bowl(120, 150, 70) + E(120, 150, 64, 14, '#E53935', 2) + range(7, (k) => Lc(`M${84 + k * 12} 150c4-12-4-16 2-28`, '#FFE0B2', 3)) + P('M100 128c6-14 34-14 40 0z', '#8D4E1A', 2.5) + range(6, (k) => C(96 + k * 9, 140 + (k % 2) * 4, 2.5, '#E0B26E', 0)) + range(4, (k) => C(110 + k * 8, 124, 2.5, '#43A047', 0))
      + Lc('M150 106l40-50M158 110l38-48', '#D7B88A', 4) + face(120, 184, 0.45)),
  L('cn/chengdu/landmark-qingcheng.v1.svg', 'บันไดหินในป่าเขาชิงเฉิงซาน', 'The stone steps through the green forest of Mount Qingcheng', ['mount qingcheng', 'เขาชิงเฉิงซาน', 'qingchengshan', 'ชิงเฉิงซาน', 'misty forest', 'ป่าในหมอก', 'stone steps', 'บันไดหิน', 'mountain pavilion', 'dujiangyan day trip'], 'หาศาลาเล็กที่ซ่อนอยู่ในป่าเขียวครึ้มริมบันไดหิน', 'Find the little pavilion hidden in the deep green forest by the stone steps',
    // a misty mountain covered in thick green forest, a winding stone stairway climbing it, a small pavilion with a dark roof half hidden by trees, mist bands across
    sky('#E8F5E9') + P('M-4 244V140C30 60 90 20 130 30c50 14 90 70 114 120v94z', '#2E7D32', 4) + range(8, (k) => C(20 + (k * 29) % 210, 100 + (k * 37) % 120, 18, ['#388E3C', '#43A047', '#1B5E20'][k % 3], 2.5))
      + Lc('M110 244c0-30 30-40 20-70s-30-30-10-60', '#BDBDBD', 12) + range(9, (k) => Lc(`M${104 + (k % 3) * 6} ${236 - k * 15}h14`, '#9E9E9E', 2))
      + R(150, 100, 36, 22, '#C62828', 0, 3) + croof(168, 100, 40, '#37474F') + Lc('M-4 90c60-10 120 6 248-10M-4 160c60 10 140-10 248 4', '#FFFFFF', 8) + face(168, 112, 0.25)),
  L('cn/chengdu/landmark-wangjianglou.v1.svg', 'หอชมแม่น้ำวั่งเจียงโหลวในสวนไผ่', 'Wangjiang Tower in the bamboo park', ['wangjiang pavilion', 'หอวั่งเจียงโหลว', 'wangjianglou park', 'สวนวั่งเจียงโหลว', 'bamboo park', 'สวนไผ่', 'jinjiang river', 'แม่น้ำจินเจียง', 'river-viewing tower', 'many kinds of bamboo'], 'หาหอสูงสี่ชั้นที่ยืนอยู่หลังกอไผ่', 'Find the tall four-storey tower standing behind the bamboo',
    // a slender four-storey wooden tower with layered roofs beside a river, surrounded by tall clumps of bamboo with long leaves
    sky('#E3F2FD') + R(-4, 200, 248, 44, '#4FC3F7', 0, 0) + Lc('M20 216c14-4 22 4 36 0M160 226c14-4 22 4 36 0', '#B3E5FC', 3) + R(-4, 180, 248, 20, '#A5D6A7', 0, 3)
      + range(4, (k) => R(100 + k * 4, 160 - k * 34, 40 - k * 8, 22, '#C62828', 0, 3) + croof(120, 160 - k * 34, 60 - k * 10, '#455A64')) + R(96, 160, 48, 22, '#C62828', 0, 3) + Lc('M120 30v-14', INK, 3) + C(120, 14, 4, '#FFC107', 2)
      + [[20, 0], [60, 1], [190, 2], [224, 1]].map(([x, k]) => range(3, (j) => Lc(`M${x + j * 7} 190c-2-50 ${k} -100 ${-2 + j * 3}-150`, '#7CB342', 3.5)) + range(4, (j) => P(`M${x + 8} ${70 + j * 30}l${j % 2 ? 22 : -22} -6-${j % 2 ? 16 : -16} 10z`, '#43A047', 2))).join('') + face(120, 172, 0.25)),
  L('cn/chengdu/landmark-siguniang.v1.svg', 'ยอดหิมะสี่สาวซื่อกูเหนียงซาน', 'The four snowy sisters of Mount Siguniang', ['mount siguniang', 'เขาซื่อกูเหนียง', 'four sisters mountain', 'ภูเขาสี่สาว', 'snow peaks', 'ยอดเขาหิมะ', 'aba', 'อาป้า', 'alpine meadow', 'shuangqiao valley'], 'หายอดเขาหิมะสี่ยอดที่เรียงจากเตี้ยไปสูง', 'Find the four snowy peaks lined up from short to tall',
    // four snow-capped peaks in a row rising from smallest to tallest, a green alpine meadow below with a winding stream and little yellow flowers, a wooden walkway
    sky('#E1F5FE') + [[40, 150, 34], [90, 130, 44], [146, 110, 56], [200, 80, 70]].map(([x, h, w]) => P(`M${x - w} 170L${x} ${170 - h} ${x + w} 170z`, '#90A4AE', 4) + P(`M${x - w * 0.36} ${170 - h * 0.64}L${x} ${170 - h} ${x + w * 0.36} ${170 - h * 0.64}l-8 6-8-8-8 8-8-6z`, '#FFFFFF', 3)).join('')
      + R(-4, 170, 248, 74, '#9CCC65', 0, 3) + Lc('M40 244c20-30 80-30 120-60s60-14 84-14', '#4FC3F7', 8) + range(8, (k) => C(20 + k * 28, 200 + (k % 3) * 12, 3, '#FFEB3B', 1.5)) + face(146, 120, 0.3)),
  L('cn/chengdu/landmark-wuhou.v1.svg', 'ตรอกกำแพงแดงกับไผ่ที่อู่โหวฉือ', 'The red-wall bamboo lane of Wuhou Shrine', ['wuhou shrine', 'ศาลอู่โหว', 'wuhouci', 'อู่โหวฉือ', 'red wall lane', 'ตรอกกำแพงแดง', 'bamboo', 'ไผ่', 'three kingdoms', 'photo lane'], 'หาทางเดินแคบที่มีกำแพงแดงทั้งสองข้างและไผ่โน้มลงมา', 'Find the narrow path with red walls on both sides and bamboo leaning over',
    // a narrow stone path between two tall curving red walls with grey tiled tops, bamboo leaning over from both sides, a child walking in the middle
    sky('#E8F5E9') + P('M-4 -4h96c-10 80-14 160-20 248H-4z', '#C62828', 4) + P('M244 -4h-96c10 80 14 160 20 248h76z', '#C62828', 4) + Lc('M92 -4c-10 80-14 160-20 248M148 -4c10 80 14 160 20 248', '#607D8B', 6)
      + P('M72 244c4-80 10-160 20-248h56c10 88 16 168 20 248z', '#D7CCC8', 3) + range(6, (k) => Lc(`M${82 + k * 2} ${230 - k * 36}h${76 - k * 4}`, '#BCAAA4', 2))
      + range(4, (k) => Lc(`M${k < 2 ? 4 + k * 20 : 196 + (k - 2) * 20} 0c${k < 2 ? 30 : -30} 30 ${k < 2 ? 60 : -60} 40 ${k < 2 ? 80 : -80} 40`, '#558B2F', 3)) + range(8, (k) => P(`M${k < 4 ? 60 + k * 12 : 180 - (k - 4) * 12} ${30 + (k % 4) * 6}l${k < 4 ? 14 : -14} 6-${k < 4 ? 4 : -4}-10z`, '#7CB342', 2))
      + kid(120, 200, '#FFCA28', 1.1) + face(30, 120, 0.3)),

  // ---------- Chongqing
  L('cn/chongqing/landmark-wulong.v1.svg', 'สะพานหินธรรมชาติสามสะพานที่อู่หลง', 'The Three Natural Bridges of Wulong', ['three natural bridges', 'สะพานธรรมชาติสามแห่ง', 'wulong karst', 'อู่หลง', 'tianlong bridge', 'สะพานเทียนหลง', 'giant stone arch', 'ซุ้มหินยักษ์', 'tiankeng', 'old post house'], 'หาบ้านไม้หลังเล็กที่ตั้งอยู่ใต้ซุ้มหินยักษ์', 'Find the little wooden house standing under the giant stone arch',
    // an enormous stone arch bridging a deep green gorge, tiny trees on top, a little wooden courtyard house on the meadow under it, a path winding in
    sky('#E3F2FD') + P('M-4 244V20h248v224h-60c0-80-20-120-64-120s-64 40-64 120z', '#8D8D7A', 4) + range(5, (k) => Lc(`M-4 ${50 + k * 24}c60 4 120-4 248 2`, '#757563', 2)) + range(6, (k) => C(14 + k * 42, 18, 12, '#558B2F', 2.5))
      + P('M56 244c0-80 20-120 64-120s64 40 64 120z', '#C5E1A5', 3) + R(92, 196, 56, 30, '#A1673F', 0, 3) + P('M86 198h68l-8-12h-52z', '#37474F', 3) + R(112, 206, 14, 20, '#5D4037', 1, 2)
      + Lc('M120 244c0-10 10-14 6-18', '#D7CCC8', 6) + range(3, (k) => C(70 + k * 50, 230, 8, '#43A047', 2)) + face(120, 70, 0.4)),
  L('cn/chongqing/landmark-shibaozhai.v1.svg', 'หอแดงสือเป่าไจ้เกาะหน้าผาริมแม่น้ำแยงซี', 'Shibaozhai, the red tower clinging to the rock by the Yangtze', ['shibaozhai', 'สือเป่าไจ้', 'red pagoda on rock', 'หอแดงเกาะหน้าผา', 'yangtze river', 'แม่น้ำแยงซี', 'twelve storeys', 'สิบสองชั้น', 'suspension footbridge', 'jade seal hill'], 'หาหอสีแดงหลายชั้นที่พิงอยู่กับก้อนหินใหญ่', 'Find the many-storey red tower leaning against the big rock',
    // a tall block-shaped rock hill rising from the river, a twelve-storey red wooden tower built up against its side, a small temple on the very top, a swinging footbridge to the shore
    sky('#E1F5FE') + R(-4, 190, 248, 54, '#4DB6AC', 0, 0) + Lc('M30 212c14-4 22 4 36 0M170 220c14-4 22 4 36 0', '#B2DFDB', 3)
      + P('M110 190V60c10-14 70-14 80 0v130z', '#9E8E70', 4) + range(4, (k) => Lc(`M110 ${90 + k * 26}h80`, '#857555', 2)) + C(170, 50, 12, '#558B2F', 2.5) + R(134, 42, 30, 18, '#C62828', 0, 2.5) + croof(149, 42, 34, '#455A64')
      + range(6, (k) => R(76, 168 - k * 22, 36, 22, '#D32F2F', 0, 3) + P(`M70 ${168 - k * 22}h48l-6-6H76z`, '#455A64', 2.5) + R(86, 172 - k * 22, 16, 10, '#FFE082', 1, 1.5))
      + Lc('M76 180c-20 10-40 10-70 4', '#6D4C41', 4) + Lc('M76 186c-20 10-40 10-70 4', '#6D4C41', 2) + face(160, 130, 0.35)),
  L('cn/chongqing/landmark-suanlafen.v1.svg', 'วุ้นเส้นเปรี้ยวเผ็ดซวนล่าเฝินฉงชิ่ง', 'Suanlafen, hot and sour sweet potato noodles', ['suanlafen', 'ซวนล่าเฝิน', 'hot and sour noodles', 'วุ้นเส้นเปรี้ยวเผ็ด', 'sweet potato noodles', 'วุ้นเส้นมันเทศ', 'chilli oil', 'น้ำมันพริก', 'crispy soybeans', 'chongqing snack'], 'หาเส้นใสๆ ที่ลื่นไหลอยู่ในน้ำซุปแดง', 'Find the clear slippery noodles in the red broth',
    // a deep bowl of red sour-spicy broth with clear glossy sweet potato noodles being lifted by chopsticks, crispy fried soybeans, peanuts, pickles and coriander floating on top
    bowl(120, 130, 86) + E(120, 130, 80, 16, '#D84315', 2) + range(8, (k) => C(60 + k * 17, 128 + (k % 2) * 6, 3.5, '#FFB74D', 1.5)) + range(4, (k) => P(`M${70 + k * 30} 124l6-6 6 6z`, '#43A047', 1.5))
      + range(4, (k) => Lc(`M${110 + k * 6} 126c-2-30 4-60 ${-4 + k * 3}-90`, '#B39DDB', 3)) + Lc('M100 40l40 6M98 50l42 4', '#A1673F', 5) + Lc('M60 100c-4-10 4-14 0-24M180 100c-4-10 4-14 0-24', '#ECEFF1', 3) + face(120, 176, 0.45)),
  L('cn/chongqing/landmark-threegorgesmuseum.v1.svg', 'พิพิธภัณฑ์สามผาหน้าจัตุรัสใหญ่', 'The Three Gorges Museum and its glass dome', ['three gorges museum', 'พิพิธภัณฑ์สามผา', 'china three gorges museum', 'พิพิธภัณฑ์ซานเสีย', 'glass dome', 'โดมกระจก', 'sloping wall', 'กำแพงลาดเอียง', 'yangtze history', 'renmin square'], 'หาโดมกระจกกลมที่อยู่หลังกำแพงลาดเอียง', 'Find the round glass dome behind the sloping wall',
    // a wide museum with a front wall sloping back like a dam and long vertical stripes, a big blue glass dome rising behind its middle, a wide square with a fountain in front
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#E0E0E0', 0, 3) + P('M70 110c0-40 100-40 100 0z', '#4FC3F7', 4) + range(4, (k) => Lc(`M${84 + k * 24} 110c0-20 4-30 10-34`, '#E1F5FE', 2))
      + P('M10 190l20-80h180l20 80z', '#BCAAA4', 4) + range(10, (k) => Lc(`M${36 + k * 18} 112l${-4 + k * 0.8} 78`, '#A1887F', 2)) + R(96, 160, 48, 30, '#5D4037', 1, 3)
      + E(120, 216, 40, 8, '#4FC3F7', 3) + Lc('M110 212c-4-14 4-20 10-24 6 4 14 10 10 24', '#B3E5FC', 3) + kid(40, 230, '#E53935', 0.9) + face(120, 140, 0.35)),
  L('cn/chongqing/landmark-huguang.v1.svg', 'สมาคมหูกวงกับกำแพงไฟทรงคลื่น', 'Huguang Guild Hall and its wave-topped fire walls', ['huguang guild hall', 'สมาคมหูกวง', 'huguang huiguan', 'หูกวงฮุ่ยกว่าน', 'fire walls', 'กำแพงกันไฟ', 'dongshuimen', 'ตงสุ่ยเหมิน', 'old opera stage', 'merchant hall'], 'หากำแพงขาวที่ด้านบนโค้งขึ้นลงเป็นคลื่น', 'Find the white walls whose tops curve up and down like waves',
    // a grey and white guild hall with tall white fire walls whose tops curve like rolling waves, a carved opera stage roof inside, steps going down toward the river
    sky('#E1F5FE') + R(-4, 210, 248, 34, '#BDBDBD', 0, 3)
      + P('M20 210V100c20-30 40-30 60 0 20-30 40-30 60 0 20-30 40-30 60 0v110z', '#FAFAFA', 4) + Lc('M20 100c20-30 40-30 60 0 20-30 40-30 60 0 20-30 40-30 60 0', '#455A64', 6)
      + R(80, 140, 80, 70, '#8D6E63', 0, 3.5) + croof(120, 140, 100, '#37474F') + R(94, 152, 52, 28, '#FFE082', 1, 2.5) + range(3, (k) => Lc(`M${98 + k * 16} 152v28`, '#C62828', 2)) + R(104, 186, 32, 24, '#5D4037', 1, 2.5)
      + range(3, (k) => R(-4 + k * 6, 214 + k * 10, 60, 10, '#9E9E9E', 0, 2)) + face(50, 160, 0.3)),

  // ---------- Yunnan
  L('cn/yunnan/landmark-shaxi.v1.svg', 'เวทีงิ้วเก่าที่จัตุรัสซื่อฟางเจียซาซี', 'The old opera stage on Sideng Square, Shaxi', ['shaxi', 'ซาซี', 'sideng square', 'จัตุรัสซื่อเติง', 'tea horse road', 'เส้นทางชาม้า', 'old theatre stage', 'เวทีงิ้วเก่า', 'stone-paved market square', 'old trees'], 'หาเวทีไม้หลังคาซ้อนที่หันหน้าเข้าลานหิน', 'Find the wooden stage with stacked roofs facing the stone square',
    // a wooden opera stage building with a high open front and three swooping roofs, on a stone-paved square with two huge old trees and a horse-path cobbled lane
    sky('#E3F2FD') + R(-4, 190, 248, 54, '#BCAAA4', 0, 3) + range(8, (k) => C(10 + k * 30, 210 + (k % 2) * 14, 8, '#A1887F', 1.5))
      + R(60, 130, 120, 60, '#8D6E63', 0, 4) + R(76, 136, 88, 30, '#FFE0B2', 1, 3) + Lc('M60 166h120', '#5D4037', 4) + range(3, (k) => R(66 + k * 50, 166, 8, 24, '#5D4037', 0, 2))
      + croof(120, 128, 130, '#455A64') + croof(84, 108, 50, '#546E7A') + croof(156, 108, 50, '#546E7A') + croof(120, 96, 60, '#455A64')
      + [[24, 120], [216, 130]].map(([x, y]) => Lc(`M${x} 190v-50`, '#6D4C41', 9) + C(x, y, 30, '#558B2F', 3.5)).join('') + face(120, 152, 0.3)),
  L('cn/yunnan/landmark-songzanlin.v1.svg', 'อารามซงจ้านหลินบนเนินที่แชงกรีลา', 'Songzanlin Monastery on its hill at Shangri-La', ['songzanlin monastery', 'อารามซงจ้านหลิน', 'ganden sumtseling', 'กานเด็นซุมเซลิง', 'little potala', 'โปตาลาน้อย', 'shangri-la', 'แชงกรีลา', 'golden roofs', 'white walls'], 'หาหลังคาสีทองบนตึกขาวที่ซ้อนกันขึ้นเนิน', 'Find the golden roofs on the white buildings stacked up the hill',
    // white-walled monastery halls stacked up a hill with dark red window frames and shining golden roofs at the top, a lake in front reflecting it, highland grass
    sky('#E1F5FE') + P('M-4 160c40-60 100-90 124-90s90 30 124 90z', '#A1887F', 3) + R(-4, 160, 248, 84, '#8BC34A', 0, 0) + E(120, 210, 90, 16, '#4FC3F7', 3)
      + range(5, (k) => R(14 + k * 44, 130 - (k % 2) * 6, 40, 34, '#FAFAFA', 0, 3) + R(26 + k * 44, 140 - (k % 2) * 6, 14, 12, '#8E1B1B', 1, 2))
      + R(70, 80, 100, 50, '#FAFAFA', 0, 3.5) + R(70, 80, 100, 10, '#8E1B1B', 0, 2.5) + range(3, (k) => R(82 + k * 28, 100, 20, 16, '#8E1B1B', 1, 2)) + P('M80 80l10-16h60l10 16z', '#FFC107', 3.5) + P('M104 64l6-12h20l6 12z', '#FFC107', 3) + Lc('M120 52v-12', '#FFB300', 4)
      + face(120, 112, 0.3)),
  L('cn/yunnan/landmark-pineapplerice.v1.svg', 'ข้าวเหนียวสับปะรดของชาวไตสิบสองปันนา', 'Dai pineapple sticky rice served in the fruit', ['pineapple rice', 'ข้าวสับปะรด', 'dai food', 'อาหารชาวไต', 'xishuangbanna', 'สิบสองปันนา', 'purple sticky rice', 'ข้าวเหนียวดำ', 'baked in pineapple', 'jinghong'], 'หาข้าวสีม่วงที่อัดอยู่ในลูกสับปะรดครึ่งซีก', 'Find the purple rice packed inside the half pineapple',
    // a pineapple cut in half lengthways and hollowed out, filled with steaming purple and white sticky rice with pineapple chunks, its green crown at one end, on a banana leaf
    P('M10 200c40-30 180-30 220 0-40 20-180 20-220 0z', '#7CB342', 3.5) + Lc('M20 200h200', '#558B2F', 2)
      + P('M36 170c0-36 40-50 84-50s84 14 84 50c-20 24-148 24-168 0z', '#FFB300', 4) + range(8, (k) => P(`M${50 + k * 18} ${178}l8-8 8 8-8 8z`, '#F9A825', 2))
      + P('M48 160c10-30 134-30 144 0-20 10-124 10-144 0z', '#8E24AA', 3) + range(10, (k) => E(60 + k * 12, 150 + (k % 3) * 4, 4, 2.5, k % 3 ? '#CE93D8' : '#FFFFFF', 0)) + range(3, (k) => R(84 + k * 28, 140 + (k % 2) * 6, 10, 10, '#FFE082', 2, 2))
      + range(5, (k) => P(`M${200 + k * 4} 150c10-20 ${10 + k * 6}-30 ${16 + k * 4}-40 0 16-6 30-10 40`, '#43A047', 2.5)) + Lc('M90 110c-4-10 4-14 0-24M140 110c-4-10 4-14 0-24', '#ECEFF1', 3) + face(120, 178, 0.35)),
  L('cn/yunnan/landmark-erkuai.v1.svg', 'แผ่นแป้งข้าวเอ่อร์ไคว่ย่างพับไส้', 'Erkuai, grilled rice cake folded round fillings', ['erkuai', 'เอ่อร์ไคว่', 'baba erkuai', 'แป้งข้าวย่าง', 'tengchong', 'เถิงชง', 'grilled rice cake', 'แผ่นข้าวย่าง', 'charcoal brazier', 'kunming breakfast'], 'หาแผ่นแป้งขาวกลมที่ย่างบนตะแกรงเหนือถ่าน', 'Find the round white rice cakes toasting on the grill over the coals',
    // a small charcoal brazier with a wire grill, flat round white rice cakes toasting on it with brown grill marks, one folded round sausage and greens and brushed with red sauce
    R(30, 150, 140, 50, '#5D4037', 6, 4) + range(5, (k) => C(48 + k * 26, 172, 7, '#FF7043', 2)) + Lc('M30 150h140M30 140h140', '#90A4AE', 3) + range(7, (k) => Lc(`M${38 + k * 20} 136v18`, '#90A4AE', 2))
      + [[66, 134], [130, 134]].map(([x, y]) => E(x, y, 30, 10, '#FFFDF7', 3) + Lc(`M${x - 14} ${y - 2}h28M${x - 10} ${y + 3}h20`, '#A1673F', 2)).join('')
      + g(196, 110, 1, P('M-34 10c0-30 68-30 68 0z', '#FFFDF7', 3.5) + P('M-30 6c10-10 50-10 60 0', '#E53935', 3) + R(-20, -4, 40, 8, '#C62828', 4, 2) + Lc('M-14-8l6 4M6-8l6 4', '#43A047', 3) + Lc('M-34 10h68', 'none', 0), -14) + face(100, 186, 0.3)),
  L('cn/yunnan/landmark-shuanglong.v1.svg', 'สะพานสองมังกรสิบเจ็ดโค้งที่เจี้ยนสุ่ย', 'The seventeen-arch Double Dragon Bridge of Jianshui', ['double dragon bridge', 'สะพานซวงหลง', 'shuanglong bridge', 'สะพานสองมังกร', 'seventeen arches', 'สิบเจ็ดโค้ง', 'jianshui', 'เจี้ยนสุ่ย', 'pavilion on a bridge', 'stone arch bridge'], 'หาศาลาสามชั้นที่ตั้งอยู่กลางสะพานโค้งยาว', 'Find the three-storey pavilion in the middle of the long arched bridge',
    // a very long low stone bridge with many little round arches reflected in the water, a tall three-roofed pavilion in its middle and small ones at the ends, willows on the bank
    sky('#FFF8E1') + R(-4, 150, 248, 94, '#4DB6AC', 0, 0) + R(-4, 130, 248, 22, '#BDBDBD', 0, 4)
      + range(10, (k) => P(`M${2 + k * 24} 152c0-12 16-12 16 0z`, '#4DB6AC', 2.5) + P(`M${2 + k * 24} 152c0 12 16 12 16 0`, '#80CBC4', 0))
      + R(104, 96, 32, 34, '#C62828', 0, 3) + croof(120, 96, 50, '#37474F') + R(108, 74, 24, 16, '#C62828', 0, 2.5) + croof(120, 76, 40, '#37474F') + R(112, 56, 16, 14, '#C62828', 0, 2.5) + croof(120, 58, 28, '#37474F')
      + [20, 220].map((x) => R(x - 10, 110, 20, 20, '#C62828', 0, 2.5) + croof(x, 112, 26, '#37474F')).join('') + face(120, 112, 0.25)),

  // ---------- Guilin and Yangshuo
  L('cn/guilin/landmark-youcha.v1.svg', 'โหยวฉาชาน้ำมันกงเฉิงกับข้าวพอง', 'Gongcheng youcha, pounded oil tea with puffed rice', ['youcha', 'โหยวฉา', 'oil tea', 'ชาน้ำมัน', 'gongcheng', 'กงเฉิง', 'yao people', 'ชาวเหยา', 'puffed rice', 'pounding hammer'], 'หาไม้ค้อนรูปตัวแอลที่ตำใบชาในกระทะ', 'Find the L-shaped wooden hammer pounding tea leaves in the pan',
    // a black iron wok with green tea leaves and ginger being pounded with an L-shaped wooden mallet, small bowls of the brown soup with puffed rice and peanuts floating, a ladle
    E(90, 120, 70, 20, '#37474F', 4) + P('M20 120c0 30 30 46 70 46s70-16 70-46', '#263238', 4) + E(90, 120, 60, 14, '#558B2F', 2) + range(6, (k) => E(54 + k * 14, 120 + (k % 2) * 4, 6, 3, '#7CB342', 1.5)) + range(3, (k) => R(70 + k * 16, 116, 8, 6, '#FFE082', 2, 1.5))
      + g(100, 70, 1, R(-6, -50, 12, 54, '#A1673F', 4, 3) + R(-6, 0, 36, 14, '#A1673F', 5, 3), -10)
      + [[170, 180], [210, 196], [96, 200]].map(([x, y]) => bowl(x, y, 22) + E(x, y, 20, 5, '#A1887F', 2) + range(3, (k) => C(x - 8 + k * 8, y - 1, 2.5, '#FFF8E1', 0)) + C(x + 4, y + 2, 2, '#C08A5C', 0)).join('') + face(90, 140, 0.35)),
  L('cn/guilin/landmark-pomelo.v1.svg', 'ส้มโอซาเถียนแห่งกวางสี', 'The big Shatian pomelos of Guangxi', ['shatian pomelo', 'ส้มโอซาเถียน', 'pomelo', 'ส้มโอ', 'yangshuo orchards', 'สวนผลไม้หยางซั่ว', 'citrus', 'ส้ม', 'mid-autumn fruit', 'pear-shaped pomelo'], 'หาส้มโอลูกโตรูปลูกแพร์ที่ห้อยอยู่บนต้น', 'Find the big pear-shaped pomelos hanging in the tree',
    // a leafy pomelo tree heavy with big pear-shaped yellow-green fruit, karst hills behind, one fruit peeled open in front showing pink-white segments
    sky('#E3F2FD') + range(4, (k) => P(`M${-10 + k * 66} 120c0-60 20-80 30-80s30 20 30 80z`, '#80CBC4', 3)) + R(-4, 120, 248, 124, '#AED581', 0, 0)
      + Lc('M110 220v-60', '#6D4C41', 10) + C(110, 110, 60, '#388E3C', 4) + range(6, (k) => E(66 + (k % 3) * 44, 96 + Math.floor(k / 3) * 40, 9, 5, '#2E7D32', 0))
      + [[80, 120], [130, 104], [150, 140]].map(([x, y]) => P(`M${x} ${y - 16}c-10 0-14 10-14 18 0 12 6 18 14 18s14-6 14-18c0-8-4-18-14-18z`, '#D4E157', 3) + Lc(`M${x} ${y - 16}v-6`, '#6D4C41', 2)).join('')
      + g(190, 210, 1, P('M-28 0c0-24 56-24 56 0z', '#C0CA33', 3) + range(5, (k) => P(`M0 0l${-24 + k * 12} -18`, 'none', 2)) + P('M-22-4c4-14 40-14 44 0z', '#F8BBD0', 2.5)) + face(130, 106, 0.25)),
  L('cn/guilin/landmark-diecai.v1.svg', 'เขาเตี๋ยไฉ่ซานหินผาซ้อนชั้นเหมือนผ้าแพร', 'Diecai Hill, the folded brocade hill', ['diecai hill', 'เขาเตี๋ยไฉ่', 'folded brocade hill', 'เขาผ้าแพรซ้อน', 'wind cave', 'ถ้ำลม', 'layered rock', 'หินเป็นชั้น', 'guilin viewpoint', 'li river view'], 'หาชั้นหินที่ซ้อนกันเป็นริ้วๆ เหมือนผ้าพับ', 'Find the rock layers stacked in stripes like folded cloth',
    // a steep karst hill with striped horizontal rock layers in different colours like folded cloth, a stairway with a little pavilion at the top, the river at its foot
    sky('#E1F5FE') + R(-4, 200, 248, 44, '#4FC3F7', 0, 0) + Lc('M20 220c14-4 22 4 36 0M170 226c14-4 22 4 36 0', '#B3E5FC', 3)
      + P('M30 200c10-60 30-140 90-150 60 10 80 90 90 150z', '#A1887F', 4) + range(7, (k) => Lc(`M${40 + k * 3} ${190 - k * 20}c${30} -4 ${120 - k * 12} 4 ${150 - k * 12} 0`, ['#BCAAA4', '#8D6E63', '#D7CCC8', '#795548'][k % 4], 5))
      + range(4, (k) => C(50 + k * 44, 196 - (k % 2) * 30, 10, '#558B2F', 2.5)) + R(110, 40, 20, 14, '#C62828', 0, 2.5) + croof(120, 42, 26, '#37474F') + C(90, 150, 8, '#4E342E', 2.5) + face(120, 120, 0.35)),
  L('cn/guilin/landmark-jingjiang.v1.svg', 'ประตูเมืองเจ้าชายจิ้งเจียงกับเขาตู๋ซิ่ว', 'The Jingjiang Princes’ City gate and Solitary Beauty Peak', ['jingjiang princes city', 'วังเจ้าชายจิ้งเจียง', 'wangcheng', 'หวังเฉิง', 'solitary beauty peak', 'เขาตู๋ซิ่วเฟิง', 'duxiu feng', 'ตู๋ซิ่ว', 'ming palace', 'old exam hall'], 'หายอดเขาหินโดดเดี่ยวที่โผล่อยู่หลังกำแพงวัง', 'Find the lonely rock peak poking up behind the palace wall',
    // a red palace gate with a yellow-roofed tower and three arched doors in a long red wall, a single steep tall karst peak rising straight up behind it
    sky('#E8F5E9') + P('M80 140c4-60 20-120 40-124 20 4 36 64 40 124z', '#78909C', 4) + range(4, (k) => C(96 + k * 10, 60 + k * 18, 6, '#558B2F', 2))
      + R(-4, 140, 248, 70, '#C62828', 0, 4) + range(3, (k) => P(`M${66 + k * 44} 210v-26c0-12 20-12 20 0v26z`, '#4E342E', 3)) + R(-4, 210, 248, 34, '#E0E0E0', 0, 3)
      + R(70, 110, 100, 30, '#D32F2F', 0, 3) + range(4, (k) => R(78 + k * 24, 116, 14, 20, '#FFE082', 1, 2)) + croof(120, 110, 120, '#FFC107') + P('M-4 140h248', 'none', 3) + face(120, 170, 0.3)),
  L('cn/guilin/landmark-niang.v1.svg', 'ผักยัดไส้สิบอย่างของหยางซั่ว', 'Yangshuo stuffed vegetables, the ten niang', ['yangshuo shi niang', 'ผักยัดไส้หยางซั่ว', 'stuffed peppers', 'พริกยัดไส้', 'stuffed bitter melon', 'มะระยัดไส้', 'stuffed tofu', 'เต้าหู้ยัดไส้', 'pork filling', 'west street dinner'], 'หาพริกเขียวกับมะระที่มีหมูยัดอยู่ข้างใน', 'Find the green peppers and bitter melon rings with pork stuffed inside',
    // a big round plate with a ring of stuffed foods: green peppers, rings of bitter melon, purple aubergine halves, tofu puffs and mushrooms, each with a pink pork filling, sauce drizzled
    E(120, 140, 104, 60, '#FFFFFF', 4) + E(120, 136, 88, 46, '#FFF3E0', 2)
      + [[60, 120, 0], [100, 104, 1], [146, 104, 2], [184, 124, 3], [170, 162, 4], [120, 172, 0], [70, 160, 1], [120, 136, 2]].map(([x, y, t]) => g(x, y, 1, [
        P('M-14-6c0-10 28-10 28 0v12c0 8-28 8-28 0z', '#43A047', 3) + E(0, -6, 10, 4, '#F8BBD0', 2),
        C(0, 0, 13, '#9CCC65', 3) + C(0, 0, 7, '#F8BBD0', 2) + range(4, (k) => C(Math.cos(k * 1.6) * 10, Math.sin(k * 1.6) * 10, 1.5, '#558B2F', 0)),
        E(0, 0, 15, 9, '#7B1FA2', 3) + E(0, -2, 9, 5, '#F8BBD0', 2),
        R(-12, -10, 24, 20, '#FFCA28', 4, 3) + C(0, 0, 6, '#F8BBD0', 2),
        C(0, 0, 12, '#8D6E63', 3) + C(0, 0, 6, '#F8BBD0', 2)][t])).join('') + Lc('M50 140c30 8 110 8 140 0', '#8D4E1A', 3)),

  // ---------- Xi'an
  L('cn/xian/landmark-banpo.v1.svg', 'อ่างดินเผาลายหน้าคนปลาแห่งปั้นพัว', 'The painted fish-face bowl of Banpo', ['banpo', 'ปั้นพัว', 'banpo museum', 'พิพิธภัณฑ์ปั้นพัว', 'neolithic village', 'หมู่บ้านยุคหินใหม่', 'painted pottery', 'เครื่องปั้นเขียนสี', 'fish face basin', 'round huts'], 'หาลายปลากับหน้ายิ้มที่วาดอยู่ในอ่างดินแดง', 'Find the fish and the smiling face painted inside the red clay bowl',
    // a wide red clay basin seen from above, painted in black with two fish and a round face with fish on its cheeks, a reconstructed round thatched hut behind
    sky('#FFF8E1') + P('M150 110c0-30 30-50 50-50s50 20 50 50z', '#D4B26A', 3.5) + R(184, 92, 20, 18, '#5D4037', 1, 2.5) + R(-4, 110, 248, 134, '#E0C9A6', 0, 0)
      + E(110, 160, 100, 56, '#C1663E', 4) + E(110, 156, 86, 44, '#E09060', 3)
      + C(110, 156, 20, '#E09060', 3) + Lc('M100 150h6M114 150h6', INK, 3) + P('M104 162c4 4 8 4 12 0', 'none', 2.5) + P('M90 144l20-20 20 20', 'none', 3) + P('M86 156l-10 4 10 4M134 156l10 4-10 4', 'none', 2.5)
      + [[50, 140, 0], [170, 172, 180]].map(([x, y, r]) => g(x, y, 1, P('M-20 0c8-10 24-10 30 0-6 10-22 10-30 0zM10 0l10-8v16z', 'none', 3) + Lc('M-12-2l6 4M-4-4l6 6', INK, 2), r)).join('')),
  L('cn/xian/landmark-sancaihorse.v1.svg', 'ม้าเคลือบสามสีสมัยถัง', 'The Tang dynasty three-colour glazed horse', ['tang sancai horse', 'ม้าเคลือบสามสีถัง', 'sancai', 'ซานไฉ่', 'three-colour glaze', 'เคลือบสามสี', 'shaanxi history museum', 'พิพิธภัณฑ์ประวัติศาสตร์ส่านซี', 'pottery horse', 'tang dynasty'], 'หาสีเขียว เหลือง และน้ำตาลที่ไหลเยิ้มบนตัวม้า', 'Find the green, yellow and brown glaze dripping over the horse',
    // a proud glazed pottery horse standing on a flat base, its body a dripping mix of amber, green and cream glaze, mane cut short, head turned, a saddle cloth
    R(30, 196, 180, 16, '#A1887F', 3, 3.5)
      + g(118, 128, 1, P('M-60 0c0-24 14-34 40-34h44c18 0 26 10 26 26v16c0 14-12 20-30 20h-50c-20 0-30-10-30-28z', '#E0A040', 4) + P('M-40-30c10 10 30 14 50 4l6 28c-20 10-50 6-60-8z', '#43A047', 3) + P('M-56 10c10 4 20 0 26 6M20 16c8-4 20-2 26 4', 'none', 2.5)
        + P('M38-26c8-16 16-36 26-44 10 2 18 10 18 18l-10 6-14 24z', '#E0A040', 4) + P('M44-56c4-10 12-16 22-16', '#FFF3E0', 5) + C(68, -60, 2.5, INK, 0)
        + range(4, (k) => R(-54 + k * 26 + (k > 1 ? 14 : 0), 18, 12, 50, k % 2 ? '#FFF3E0' : '#E0A040', 4, 3.5)) + P('M-62 -4c-14 6-18 22-16 36', 'none', 6))),
  L('cn/xian/landmark-gaojia.v1.svg', 'บ้านลานตระกูลเกาในย่านมุสลิม', 'The Gao family courtyard house', ['gao family courtyard', 'บ้านตระกูลเกา', 'gaojia dayuan', 'เกาเจียต้าหยวน', 'courtyard house', 'บ้านล้อมลาน', 'carved brick', 'อิฐแกะสลัก', 'old xi’an home', 'shadow play room'], 'หาซุ้มประตูแกะสลักที่เปิดเข้าลานบ้าน', 'Find the carved gateway that opens onto the courtyard',
    // a narrow courtyard between grey-brick buildings with dark wooden lattice doors and one-sided sloping roofs, a carved brick screen wall at the end, a pot plant
    sky('#E3F2FD') + R(-4, 200, 248, 44, '#BDBDBD', 0, 3) + range(6, (k) => Lc(`M${k * 44} 200l-10 44`, '#9E9E9E', 2))
      + P('M-4 60l60 30v110H-4z', '#9E9E9E', 4) + P('M244 60l-60 30v110h60z', '#9E9E9E', 4) + P('M-4 50l70 40', 'none', 6) + P('M244 50l-70 40', 'none', 6)
      + range(3, (k) => R(4 + k * 16, 120 + k * 6, 12, 60 - k * 6, '#6D4C41', 1, 2) + R(220 - k * 16, 120 + k * 6, 12, 60 - k * 6, '#6D4C41', 1, 2))
      + R(70, 90, 100, 110, '#BDBDBD', 0, 3.5) + croof(120, 92, 110, '#455A64') + R(84, 110, 72, 56, '#9E9E9E', 2, 3) + C(120, 138, 18, 'none', 3) + P('M108 138c4-8 20-8 24 0-4 8-20 8-24 0z', '#BCAAA4', 2.5) + R(108, 170, 24, 30, '#5D4037', 1, 2.5)
      + P('M196 236h20l-4-16h-12z', '#A1673F', 2.5) + C(206, 210, 10, '#66BB6A', 2) + face(120, 120, 0.25)),
  L('cn/xian/landmark-danfeng.v1.svg', 'ประตูตันเฟิ่งแห่งวังต้าหมิงกง', 'Danfeng Gate of the Daming Palace', ['danfeng gate', 'ประตูตันเฟิ่ง', 'daming palace', 'วังต้าหมิงกง', 'daming palace national heritage park', 'อุทยานวังต้าหมิง', 'tang palace', 'วังสมัยถัง', 'five gate tunnels', 'great lawn'], 'หาประตูโค้งห้าช่องเรียงกันใต้หลังคายาว', 'Find the five arched doorways in a row under the long roof',
    // a long rebuilt Tang-style gate tower with five arched passages through a wide earthen base, a long dark roof with gently rising ends on top, a huge lawn in front
    sky('#FFF8E1') + R(-4, 190, 248, 54, '#9CCC65', 0, 0) + P('M6 190l12-60h204l12 60z', '#D7B88A', 4) + range(5, (k) => P(`M${30 + k * 38} 190v-26c0-12 22-12 22 0v26z`, '#6D4C41', 3))
      + R(36, 94, 168, 36, '#BCAAA4', 0, 3.5) + range(7, (k) => R(42 + k * 23, 100, 6, 30, '#8D6E63', 0, 2)) + P('M16 96c20-6 40-10 60-10h88c20 0 40 4 60 10l-10-20H26z', '#455A64', 4)
      + kid(200, 220, '#E53935', 0.9) + face(120, 116, 0.3)),
  L('cn/xian/landmark-hulatang.v1.svg', 'ซุปข้นพริกไทยหูล่าทังมื้อเช้าซีอาน', 'Hulatang, Xi’an’s thick peppery breakfast soup', ['hulatang', 'หูล่าทัง', 'pepper soup', 'ซุปพริกไทย', 'thick soup', 'ซุปข้น', 'beef meatballs', 'ลูกชิ้นเนื้อ', 'muslim breakfast', 'flatbread on the side'], 'หาลูกชิ้นกลมๆ ที่จมอยู่ในซุปข้นสีน้ำตาล', 'Find the round meatballs sinking in the thick brown soup',
    // a bowl of thick glossy brown soup with round beef meatballs, cabbage and potato chunks, a swirl of red chilli oil, a round flatbread on the side and a spoon standing up
    bowl(110, 130, 80) + E(110, 130, 74, 15, '#A1673F', 2) + Lc('M70 128c20-8 40 8 60 0s30-6 40 0', '#D84315', 3) + range(5, (k) => C(64 + k * 22, 132 - (k % 2) * 4, 7, '#6D3B16', 2.5)) + range(3, (k) => R(76 + k * 26, 122, 9, 9, '#FFE082', 2, 2))
      + g(208, 196, 1, C(0, 0, 26, '#E8C077', 3.5) + range(5, (k) => C(-12 + k * 6, -4 + (k % 2) * 8, 2, '#C08A5C', 0))) + Lc('M140 120l30-80', '#B0BEC5', 6) + Lc('M80 104c-4-10 4-14 0-24M120 100c-4-10 4-14 0-24', '#ECEFF1', 3) + face(110, 170, 0.45)),

  // ---------- Zhangjiajie
  L('cn/zhangjiajie/landmark-suanluobo.v1.svg', 'หัวไชเท้าดองเปรี้ยวเสียบไม้ของเซียงซี', 'Suan luobo, sour pickled radish on sticks', ['suan luobo', 'ซวนหลัวโป', 'sour radish', 'หัวไชเท้าดองเปรี้ยว', 'pickled radish skewers', 'ผักดองเสียบไม้', 'xiangxi snack', 'ของว่างเซียงซี', 'chilli powder', 'glass jars'], 'หาไหแก้วที่ดองหัวไชเท้าขาวกับพริกแดง', 'Find the glass jars full of white radish and red chillies',
    // big glass jars full of white radish slices and red chillies in pickling water, two skewers of crunchy radish slices dusted with red chilli powder held up in front
    range(3, (k) => g(48 + k * 72, 140, 1, R(-30, -50, 60, 100, '#E1F5FE', 10, 4) + R(-24, -60, 48, 12, '#E53935', 4, 3) + range(5, (j) => R(-20 + (j % 3) * 14, -30 + Math.floor(j / 3) * 34 + (j % 2) * 8, 12, 16, '#FAFAFA', 3, 2)) + range(3, (j) => P(`M${-16 + j * 14} ${-8 + j * 12}c4-8 10-10 14-6`, '#E53935', 3)) + face(0, 26, 0.3)))
      + [[90, 50, -10], [150, 46, 12]].map(([x, y, r]) => g(x, y, 1, Lc('M0 70V-30', '#D7B88A', 3) + range(3, (k) => R(-14, -26 + k * 20, 28, 16, '#FFFDF7', 4, 3) + range(3, (j) => C(-8 + j * 8, -20 + k * 20, 1.8, '#E53935', 0))), r)).join('')),
  L('cn/zhangjiajie/landmark-tenmilegallery.v1.svg', 'รถไฟเล็กชมระเบียงภาพสิบลี้', 'The little sightseeing train of the Ten-Mile Gallery', ['ten-mile gallery', 'ระเบียงภาพสิบลี้', 'shili hualang', 'สือหลี่ฮว่าหลาง', 'sightseeing train', 'รถไฟชมวิว', 'wulingyuan', 'อู่หลิงหยวน', 'rock shapes', 'old man gathering herbs rock'], 'หารถไฟเล็กสีแดงที่วิ่งผ่านหน้าผาหินแปลกตา', 'Find the little red train running past the strangely shaped rocks',
    // a little open-sided red sightseeing train with three carriages on a narrow track along a valley floor, tall stone pillars of funny shapes beside it, one looks like an old man with a basket
    sky('#E8F5E9') + range(5, (k) => P(`M${-4 + k * 50} 170v-${90 + (k % 3) * 30}c0-10 30-10 30 0v${90 + (k % 3) * 30}z`, '#9E9E8A', 3.5) + C(11 + k * 50, 72 - (k % 3) * 30, 10, '#558B2F', 2))
      + g(176, 66, 1, C(0, -10, 10, '#9E9E8A', 3) + P('M14 0h18l-4 22h-12z', '#9E9E8A', 3)) + R(-4, 170, 248, 74, '#AED581', 0, 0) + Lc('M-4 206h248', '#8D6E63', 4)
      + range(3, (k) => g(48 + k * 64, 190, 1, R(-28, -22, 56, 30, '#E53935', 5, 3.5) + P('M-30-22h60l-4-8h-52z', '#FFCA28', 3) + R(-22, -16, 44, 12, '#FFF3E0', 2, 2) + C(-16, 10, 6, '#424242', 2.5) + C(16, 10, 6, '#424242', 2.5)))
      + g(48, 176, 0.6, C(0, -20, 8, '#FFE0BD', 2) + face(0, -20, 0.22)) + face(176, 160, 0.3)),
  L('cn/zhangjiajie/landmark-sedanchair.v1.svg', 'เกี้ยวไม้ไผ่หามขึ้นภูเขาจางเจียเจี้ย', 'A bamboo sedan chair carried up the mountain path', ['bamboo sedan chair', 'เกี้ยวไม้ไผ่', 'huagan', 'หัวกาน', 'mountain porters', 'คนหามเกี้ยว', 'stone steps', 'บันไดหิน', 'carried uphill', 'tianzi mountain'], 'หาเก้าอี้ไม้ไผ่ที่มีไม้คานยาวสองข้างให้คนหาม', 'Find the bamboo chair with two long poles for the carriers',
    // two porters in blue carrying a bamboo chair slung between two long poles up stone steps, a child sitting in the chair waving, pine trees and stone pillars behind
    sky('#E8F5E9') + range(3, (k) => P(`M${150 + k * 30} 110v-${60 + k * 20}c0-8 22-8 22 0v${60 + k * 20}z`, '#9E9E8A', 3)) + P('M-4 244V160l248-60v144z', '#C5E1A5', 0)
      + range(8, (k) => P(`M${-4 + k * 32} ${236 - k * 8}h36v-8h-36z`, '#BDBDBD', 2))
      + Lc('M16 184l200-50M16 192l200-50', '#E0B26E', 5) + g(116, 150, 1, R(-20, -10, 40, 22, '#D7B88A', 4, 3) + R(-20, -34, 6, 26, '#D7B88A', 2, 2.5) + C(0, -20, 9, '#FFE0BD', 2.5) + P('M-8-10v14h16v-14z', '#E53935', 2) + face(0, -20, 0.22) + Lc('M10-16l12-12', '#FFE0BD', 4), -14)
      + [[40, 210], [196, 168]].map(([x, y]) => g(x, y, 1, C(0, -40, 10, '#FFE0BD', 3) + P('M-12-30h24v34h-24z', '#1E88E5', 3) + Lc('M-6 4l-4 22M6 4l4 22', INK, 5) + face(0, -40, 0.25))).join('')),
  L('cn/zhangjiajie/landmark-fenghuanggate.v1.svg', 'ประตูเมืองเหนือของเฟิ่งหวงริมแม่น้ำถัว', 'Fenghuang’s North Gate tower by the Tuo River', ['fenghuang north gate', 'ประตูเหนือเฟิ่งหวง', 'beimen tower', 'หอประตูเป่ยเหมิน', 'tuo river', 'แม่น้ำถัวเจียง', 'phoenix ancient town', 'เมืองโบราณเฟิ่งหวง', 'red sandstone wall', 'old city gate'], 'หาหอประตูหินสีแดงที่ตั้งอยู่ริมแม่น้ำ', 'Find the red stone gate tower standing by the river',
    // a sturdy gate tower of reddish sandstone blocks with an arched gate and a two-tier dark roof, a stretch of city wall, the green river flowing past with willow branches
    sky('#E3F2FD') + R(-4, 180, 248, 64, '#26A69A', 0, 0) + Lc('M20 200c14-4 22 4 36 0M150 216c14-4 22 4 36 0', '#B2DFDB', 3)
      + R(-4, 120, 248, 60, '#B5654A', 0, 4) + range(4, (r) => range(9, (k) => R(-4 + k * 28 + (r % 2) * 14, 124 + r * 14, 24, 10, 'none', 1.5)))
      + R(70, 70, 100, 110, '#C1714F', 0, 4) + P('M100 180v-30c0-20 40-20 40 0v30z', '#4E342E', 3) + range(3, (k) => R(84 + k * 26, 90, 18, 14, '#4E342E', 1, 2))
      + croof(120, 70, 116, '#37474F') + R(90, 44, 60, 14, '#C1714F', 0, 3) + croof(120, 46, 76, '#37474F')
      + range(5, (k) => Lc(`M${190 + k * 8} 120c4 20-4 40 0 60`, '#7CB342', 3)) + face(120, 120, 0.3)),
  L('cn/zhangjiajie/landmark-oilpress.v1.svg', 'เครื่องบีบน้ำมันไม้แบบตอกลิ่มของชาวถู่เจีย', 'The old wooden wedge oil press of the Tujia', ['wooden oil press', 'เครื่องบีบน้ำมันไม้', 'tea oil camellia', 'น้ำมันเมล็ดชา', 'tujia village', 'หมู่บ้านถู่เจีย', 'swinging ram', 'ไม้กระทุ้ง', 'wedge press', 'oil workshop'], 'หาซุงใหญ่ที่แขวนเชือกแกว่งไปกระแทกลิ่มไม้', 'Find the big hanging log swung to bang the wooden wedges',
    // a huge hollowed log press lying on blocks, wooden wedges hammered into it, a long ram log hung on ropes from a beam being swung by a worker, golden oil dripping into a bucket
    sky('#FFF8E1') + R(-4, 200, 248, 44, '#A1887F', 0, 3) + Lc('M-4 24h248', '#6D4C41', 10)
      + R(20, 140, 200, 40, '#8D5524', 10, 4) + range(4, (k) => R(40 + k * 40, 126, 12, 28, '#D7B88A', 2, 3)) + R(30, 180, 20, 20, '#6D4C41', 0, 3) + R(190, 180, 20, 20, '#6D4C41', 0, 3)
      + Lc('M70 24l20 72M170 24l-20 72', '#BCAAA4', 3) + R(60, 92, 120, 18, '#A1673F', 9, 3.5) + C(180, 101, 9, '#D7B88A', 3)
      + Lc('M120 180v16', '#FFC107', 4) + P('M106 200h28l-4 30h-20z', '#90A4AE', 3) + E(120, 202, 12, 3, '#FFC107', 0)
      + g(206, 120, 1, C(0, -26, 9, '#FFE0BD', 3) + P('M-10-16h20v30h-20z', '#1E88E5', 3) + Lc('M-8-10l-22-16', '#FFE0BD', 5) + face(0, -26, 0.22)) + face(120, 162, 0.3)),

  // ---------- Harbin
  L('cn/harbin/landmark-tiedun.v1.svg', 'หม้อเหล็กตุ๋นห่านกับขนมปังข้าวโพดติดขอบหม้อ', 'Tiedun, the iron pot stew with corn cakes stuck round the rim', ['tiedun', 'เถี่ยตุ้น', 'iron pot stew', 'หม้อเหล็กตุ๋น', 'goose stew', 'ห่านตุ๋น', 'corn cakes', 'ขนมปังข้าวโพด', 'dongbei food', 'built-in stove table'], 'หาขนมปังข้าวโพดสีเหลืองที่แปะติดอยู่รอบขอบหม้อ', 'Find the yellow corn cakes stuck round the edge of the pot',
    // a huge black iron pot set into a tiled table, a bubbling stew of meat, potatoes and green beans inside, flat yellow corn cakes stuck round its inner rim, a wooden lid leaning on the side
    R(10, 150, 220, 70, '#B0BEC5', 6, 4) + range(5, (k) => Lc(`M${10 + k * 44} 150v70`, '#90A4AE', 2)) + E(120, 140, 92, 28, '#37474F', 4) + E(120, 140, 78, 20, '#8D6E63', 2.5)
      + range(6, (k) => E(68 + k * 21, 140 + (k % 2) * 5, 7, 5, k % 2 ? '#FFE082' : '#6D3B16', 2)) + range(4, (k) => Lc(`M${78 + k * 24} 134l10 4`, '#43A047', 3))
      + range(5, (k) => { const a = Math.PI + k / 4 * Math.PI; return g(120 + Math.cos(a) * 80, 134 + Math.sin(a) * 22, 1, E(0, 0, 13, 8, '#FFCA28', 2.5) + C(-3, -1, 1.5, '#F9A825', 0)); })
      + Lc('M90 108c-4-10 4-14 0-24M150 108c-4-10 4-14 0-24', '#ECEFF1', 3) + E(210, 100, 14, 46, '#A1673F', 3.5) + C(210, 100, 5, '#6D4C41', 2) + face(120, 190, 0.4)),
  L('cn/harbin/landmark-laodaowai.v1.svg', 'ตึกบาร็อกจีนย่านเหล่าเต้าไว่', 'The Chinese Baroque street of Laodaowai', ['laodaowai', 'เหล่าเต้าไว่', 'chinese baroque', 'บาร็อกจีน', 'daowai district', 'เขตเต้าไว่', 'old courtyards', 'ลานบ้านเก่า', 'carved facades', 'old harbin street'], 'หาลายดอกไม้จีนที่ปั้นอยู่บนหน้าตึกสไตล์ฝรั่ง', 'Find the Chinese flower patterns moulded on the Western-style fronts',
    // a row of two-storey buildings with Western columns and curly gables but decorated with Chinese plaster flowers, painted cream and pale yellow
    sky('#E3F2FD') + R(-4, 200, 248, 44, '#BDBDBD', 0, 3) + range(3, (k) => g(42 + k * 78, 0, 1, R(-36, 70, 72, 130, ['#FFF3E0', '#FFF59D', '#FFE0B2'][k], 0, 3.5) + P('M-36 70c4-20 16-26 24-20 4-14 20-14 24 0 8-6 20 0 24 20z', ['#FFF3E0', '#FFF59D', '#FFE0B2'][k], 3.5)
      + C(0, 58, 8, '#F48FB1', 2.5) + C(-10, 54, 4, '#81C784', 1.5) + C(10, 54, 4, '#81C784', 1.5) + R(-32, 76, 6, 124, '#FFFFFF', 0, 2) + R(26, 76, 6, 124, '#FFFFFF', 0, 2)
      + P('M-16 130v-20c0-10 32-10 32 0v20z', '#4FC3F7', 2.5) + P('M-14 200v-36c0-14 28-14 28 0v36z', '#8D6E63', 2.5) + range(2, (j) => C(-12 + j * 24, 100, 5, '#F48FB1', 2))))),
  L('cn/harbin/landmark-errenzhuan.v1.svg', 'การแสดงเอ้อร์เหรินจ้วนหมุนผ้าเช็ดหน้า', 'Errenzhuan, the northeast song-and-dance with spinning handkerchiefs', ['errenzhuan', 'เอ้อร์เหรินจ้วน', 'spinning handkerchief', 'ผ้าเช็ดหน้าหมุน', 'northeast folk show', 'การแสดงพื้นบ้านตงเป่ย', 'two-person duet', 'ร้องคู่', 'colourful fans', 'dongbei comedy'], 'หาผ้าเช็ดหน้าที่หมุนเป็นวงกลมอยู่บนนิ้ว', 'Find the handkerchief spinning round on a finger',
    // two performers in bright flowered costumes on a little stage, each spinning a red square handkerchief on a finger like a flying wheel, a fan in the other hand, red curtain behind
    sky('#C62828') + range(6, (k) => Lc(`M${10 + k * 44} -4v170`, '#B71C1C', 3)) + R(-4, 170, 248, 74, '#A1673F', 0, 4) + Lc('M-4 186h248', '#8D5524', 3)
      + [[74, '#FFCA28', 1], [170, '#4FC3F7', -1]].map(([x, c, d]) => g(x, 170, 1, C(0, -76, 13, '#FFE0BD', 3) + P('M-14-64h28l8 50h-44z', c, 3) + range(3, (k) => C(-8 + k * 8, -50 + (k % 2) * 14, 3.5, '#E91E63', 0)) + Lc('M-10-14l-4 14M10-14l4 14', INK, 5) + face(0, -76, 0.3)
        + Lc(`M${d * 14}-56l${d * 22}-22`, '#FFE0BD', 5) + g(d * 38, -84, 1, P('M-14-6l10-10 16 4 4 14-12 10-16-6z', '#E53935', 3) + P('M-8 0c4-6 12-6 16 0', 'none', 2)) + P(`M${-d * 14}-54l${-d * 24} 6 ${-d * 4} 16z`, '#FFF59D', 2.5))).join('')),
  L('cn/harbin/landmark-floodmonument.v1.svg', 'อนุสาวรีย์ป้องกันน้ำท่วมริมแม่น้ำซงฮวา', 'The Flood Control Monument on the Songhua riverside', ['flood control monument', 'อนุสาวรีย์ป้องกันน้ำท่วม', 'riverside park', 'สวนริมน้ำฮาร์บิน', 'songhua riverside', 'ริมแม่น้ำซงฮวา', 'central street end', 'ปลายถนนจงยาง', 'half-ring colonnade', 'tall column'], 'หาเสาหินสูงกลางระเบียงเสาที่โค้งเป็นครึ่งวงกลม', 'Find the tall stone column in the middle of the curved half-ring of pillars',
    // a tall round column with a plain round top, standing in front of a curved half-ring of Roman-style pillars, a fountain basin at its foot and the frozen river behind
    sky('#E3F2FD') + R(-4, 120, 248, 40, '#E1F5FE', 0, 3) + R(-4, 160, 248, 84, '#ECEFF1', 0, 0)
      + range(9, (k) => R(10 + k * 26, 112 + (k - 4) * (k - 4) * 2, 10, 54, '#FFF8E1', 0, 2.5) + R(6 + k * 26, 106 + (k - 4) * (k - 4) * 2, 18, 8, '#FFF3E0', 1, 2.5))
      + R(108, 40, 24, 150, '#FFF3E0', 2, 4) + range(5, (k) => Lc(`M108 ${70 + k * 24}h24`, '#D7CCC8', 2)) + R(100, 30, 40, 12, '#FFF3E0', 2, 3) + C(120, 22, 10, '#FFE0B2', 3)
      + E(120, 200, 50, 10, '#B3E5FC', 3) + R(96, 186, 48, 10, '#BDBDBD', 1, 2.5) + face(120, 120, 0.3)),
  L('cn/harbin/landmark-icebike.v1.svg', 'จักรยานน้ำแข็งบนแม่น้ำซงฮวาที่แข็งตัว', 'Ice bikes on the frozen Songhua River', ['ice bike', 'จักรยานน้ำแข็ง', 'ice bicycle', 'จักรยานสกี', 'frozen songhua river', 'แม่น้ำซงฮวาแข็งตัว', 'ice rink fun', 'เล่นบนลานน้ำแข็ง', 'winter play', 'skis instead of wheels'], 'หาจักรยานที่มีสกีแทนล้อหน้า', 'Find the bicycle with a ski instead of a front wheel',
    // a child in a puffy red snowsuit riding a bicycle with a ski in place of the front wheel and a spiky back wheel across shiny blue ice, little snow flecks, the city skyline far away
    sky('#E3F2FD') + range(6, (k) => R(10 + k * 38, 70 - (k % 3) * 12, 26, 50 + (k % 3) * 12, '#CFD8DC', 0, 2)) + R(-4, 120, 248, 124, '#B3E5FC', 0, 0) + Lc('M20 170h50M150 210h60M40 226h30', '#FFFFFF', 4)
      + g(120, 190, 1, P('M-70 20h70c8 0 10-6 4-8', 'none', 4) + R(-80, 16, 70, 8, '#1E88E5', 4, 3) + C(40, 0, 24, 'none', 4) + range(8, (k) => Lc(`M${40 + Math.cos(k * 0.8) * 24} ${Math.sin(k * 0.8) * 24}l${Math.cos(k * 0.8) * 5} ${Math.sin(k * 0.8) * 5}`, INK, 3))
        + Lc('M-40 16l20-40h50l10 40M-20-24l30 24M-24-34h14M30-24l-6-12', '#FFCA28', 5)
        + C(0, -76, 12, '#FFE0BD', 3) + P('M-14-82c0-16 28-16 28 0z', '#E53935', 3) + C(0, -94, 5, '#FFFFFF', 2) + P('M-16-64h26l4 34h-30z', '#E53935', 3) + Lc('M-10-30l-12 26M8-30l16 20', '#E53935', 7) + Lc('M8-58l-18 30', '#E53935', 6) + face(0, -76, 0.3))
      + range(8, (k) => C(20 + k * 28, 30 + (k * 23) % 60, 3, '#FFFFFF', 1.5))),
];

export default { places: {}, items };
