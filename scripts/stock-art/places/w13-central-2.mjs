// Wave 13, central Thailand 2: Loei, Chiang Khan, Dan Sai, Phu Kradueng and Phu Ruea — the Phi Ta Khon festival as its
// masks only (no people, no figures), temples as buildings only (no Buddha images, no alms giving), no rapids or rafting,
// no sea of mist, no frost (Chiang Mai), no cherry trees (Nan and Kyoto), no stone forest (Yunnan), no coconut candy (Bến Tre),
// no porters (Nepal, Chongqing), no lady's slipper orchid (Plitvice); never the bare word "เลย" as an alias
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const LO = { k1: '#C62828', k2: '#EF6C00', k3: '#FFF3E0' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `th-loei.landmark.${slug}`, cat: 'landmark', file: `th/loei/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a Phi Ta Khon mask: a wide painted face with a long upturned nose, big eyes, swirls, under a tall folded basket hat with a fringe
const mask = (x, y, s, c1, c2) => g(x, y, s, P('M-30-34c-10-26 0-48 30-60 30 12 40 34 30 60z', c2) + Lc('M-26-40c10 4 42 4 52 0', '#FFFFFF', 3) + Array.from({ length: 6 }, (_, k) => Lc(`M${-24 + k * 10}-34v12`, c1, 3)).join('')
  + P('M-36-36h72c4 30-6 58-36 64-30-6-40-34-36-64z', c1) + E(-14, -14, 9, 7, '#FFFFFF', 2.5) + E(14, -14, 9, 7, '#FFFFFF', 2.5) + C(-14, -14, 3.5, INK, 0) + C(14, -14, 3.5, INK, 0)
  + P('M-4-8c-2 12 0 22 18 28 4-2 2-8-4-10-6-4-6-12-6-18z', c2, 2.5) + P('M-14 14c8 6 20 6 28 0', 'none') + Lc('M-30 0c6-6 10 2 4 6M30 0c-6-6-10 2-4 6', '#FFFFFF', 3) + E(-24, 8, 5, 3, '#FF8FA3', 0) + E(24, 8, 5, 3, '#FF8FA3', 0));
// a pine for the plateau, and a maple tree in autumn red
const pine = (x, y, s) => g(x, y, s, R(-3, -6, 6, 16, '#6D4C41', 0, 2.5) + P('M0-60l-16 22h8l-14 18h10l-14 16h52l-14-16h10l-14-18h8z', '#2E7D32', 3));
const maple = (x, y, s) => g(x, y, s, Lc('M0 10v-34', '#6D4C41', 5) + C(0, -36, 18, '#E53935', 3) + C(-14, -26, 12, '#FB8C00', 3) + C(14, -26, 12, '#C62828', 3));
// a maple leaf: five pointed lobes on a short stalk
const leaf = (x, y, s, c, r = 0) => g(x, y, s, P('M0 30v-14M0 16l-26 6 8-12-20-12 14-4-6-20 16 8 4-20 10 16 10-16 4 20 16-8-6 20 14 4-20 12 8 12z', c, 3), r);

const items = [
  { id: 'th-loei.stamp', cat: 'stamp', file: 'th/loei/stamp.v1.svg', name: nm('ตราประทับเลยและเชียงคาน', 'Loei and Chiang Khan stamp'), kw: ['loei', 'จังหวัดเลย', 'chiang khan', 'เชียงคาน', 'dan sai', 'ด่านซ้าย', 'phi ta khon', 'ผีตาโขน'],
    // a bright Phi Ta Khon festival mask with a long curly nose and a tall folded basket hat
    svg: cityStamp('tlo-st', { name: 'LOEI', sub: 'CHIANG KHAN', ...LO, emblem: mask(100, 120, 0.72, '#E53935', '#FFCA28') }) },
  { id: 'th-loei.day.chiangkhan', cat: 'day', file: 'th/loei/day-chiangkhan.v1.svg', name: nm('ถนนบ้านไม้เชียงคานริมโขง', 'Chiang Khan\'s wooden street by the Mekong'), kw: ['chiang khan', 'เชียงคาน', 'walking street', 'ถนนคนเดิน', 'wooden houses', 'บ้านไม้', 'mekong river', 'แม่น้ำโขง', 'slow life', 'ชีวิตช้าๆ', 'evening stroll', 'เดินเล่นตอนเย็น'],
    // a pink evening sky over the wide Mekong and the blue hills of Laos, a row of old two-storey wooden shophouses with balconies, flower pots and little lamps along the lane in front
    svg: scene('tlo-d1', '#F8BBD0', C(184, 60, 16, '#FFE082', 0) + P('M-4 86c40-14 90-20 130-10s80 4 118-6v30H-4z', '#7986CB') + P('M-4 98h248v24H-4z', '#4FC3F7') + Lc('M30 108h40M150 110h50', '#E1F5FE', 3)
      + [[-4, 72], [64, 64], [132, 70], [200, 66]].map(([x, w], k) => R(x, 120, 68, 76, ['#A1673F', '#8D5A33', '#B07A4A', '#96603A'][k], 0, 4) + R(x + 6, 150, 56, 4, '#5D4037', 0, 0) + P(`M${x - 4} 120l${38} -22 ${38} 22z`, '#6D4C41') + R(x + 10, 128, 18, 16, '#FFE082', 0, 3) + R(x + 40, 128, 18, 16, '#FFE082', 0, 3)
        + Array.from({ length: 5 }, (_, j) => Lc(`M${x + 8 + j * 12} 160v34`, '#5D4037', 2.5)).join('') + R(x + 14, 146, 12, 8, '#E53935', 2, 2.5) + C(x + 20, 142, 5, '#F06292', 2)).join('')
      + P('M-4 196h248v60H-4z', '#D7CCC8') + [40, 120, 200].map((x) => Lc(`M${x} 210v-24`, INK, 3) + C(x, 182, 6, '#FFF59D', 2.5)).join('') + face(98, 176, 0.34)) },
  { id: 'th-loei.day.phukradueng', cat: 'day', file: 'th/loei/day-phukradueng.v1.svg', name: nm('ยอดภูกระดึงหน้าใบเมเปิลแดง', 'Phu Kradueng\'s plateau in red maple season'), kw: ['phu kradueng', 'ภูกระดึง', 'plateau', 'ที่ราบบนยอดภู', 'red maple', 'เมเปิลแดง', 'pine trees', 'ต้นสน', 'hiking', 'เดินป่า', 'national park', 'อุทยานแห่งชาติ'],
    // a wide grassy plateau top with tall pines, round maple trees in red and orange, a sandy trail winding across and fallen red leaves
    svg: scene('tlo-d2', '#BBDEFB', [[60, 52], [170, 40]].map(([x, y]) => E(x, y, 24, 9, '#FFFFFF', 0)).join('') + P('M-4 120c60-8 150-10 248 0v130H-4z', '#C5E1A5')
      + [[20, 120, 0.9], [210, 116, 0.95], [56, 128, 0.7], [180, 126, 0.65]].map(([x, y, s]) => pine(x, y, s)).join('') + [[96, 142, 1], [150, 150, 1.15], [40, 186, 1.1], [200, 190, 1.2]].map(([x, y, s]) => maple(x, y, s)).join('')
      + P('M96 250c0-30 30-40 30-70s-10-40 4-60', 'none').replace('fill="none"', 'fill="none" stroke="#E6C27A" stroke-width="14"')
      + [[70, 210, 0.3, '#E53935'], [160, 220, 0.28, '#FB8C00'], [120, 236, 0.26, '#C62828']].map(([x, y, s, c]) => leaf(x, y, s, c)).join('') + face(150, 120, 0.3)) },

  L('masks', 'หน้ากากผีตาโขน', 'Phi Ta Khon festival masks', ['phi ta khon', 'ผีตาโขน', 'festival mask', 'หน้ากาก', 'dan sai', 'ด่านซ้าย', 'bun luang', 'งานบุญหลวง', 'colourful masks', 'หน้ากากหลากสี', 'long nose', 'จมูกยาว'], 'หาหน้ากากที่มีจมูกงอนยาวเหมือนงวง', 'Find the mask with a long curly nose',
    // three bright painted masks hanging on a bamboo rail: red, green and blue faces with long upturned noses and tall folded hats with fringes
    Lc('M20 54h200', '#C8A165', 7) + mask(62, 150, 0.95, '#43A047', '#FFEB3B') + mask(178, 150, 0.95, '#1E88E5', '#F06292') + mask(120, 168, 1.2, '#E53935', '#FFCA28') + Lc('M62 54v34M178 54v34M120 54v28', '#8D6E63', 3)),
  L('kaengkhutkhu', 'แก่งคุดคู้ริมโขง', 'The rocks of Kaeng Khut Khu in the Mekong', ['kaeng khut khu', 'แก่งคุดคู้', 'mekong river', 'แม่น้ำโขง', 'river rocks', 'แก่งหิน', 'chiang khan', 'เชียงคาน', 'riverside pavilion', 'ศาลาริมน้ำ', 'laos view', 'วิวฝั่งลาว'], 'หาศาลาเล็กๆ ที่ยืนอยู่ริมแม่น้ำโขง', 'Find the little pavilion standing on the bank of the Mekong',
    // the wide brown-green Mekong bending between hills, grey rock islands breaking the water in the middle, a little Thai pavilion with a red roof on the near bank
    bg('#E1F5FE') + P('M16 96c50-26 100-30 208-8v20H16z', '#7986CB', 0) + low(100, '#80CBC4') + frame + Lc('M40 120h30M160 126h40M90 150h40', '#E0F2F1', 3)
      + [[70, 136, 22], [120, 128, 16], [150, 146, 26], [196, 132, 14]].map(([x, y, w]) => P(`M${x - w} ${y + 6}c4-14 ${w * 2 - 8}-14 ${w * 2} 0z`, '#90A4AE', 3)).join('') + Lc('M44 146h12M130 156h12M176 160h10', '#FFFFFF', 3)
      + P('M16 176c50-6 100 6 208-4v22a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#A5D6A7') + R(40, 164, 50, 36, 'none') + Lc('M46 200v-30M84 200v-30', '#8D6E63', 5) + P('M34 172l31-26 31 26z', '#E53935') + P('M56 146l9-10 9 10z', '#FFCA28', 2.5) + R(42, 186, 46, 6, '#BCAAA4', 2, 2.5) + face(65, 160, 0.3)),
  L('phalomsak', 'ผาหล่มสัก ภูกระดึง', 'Pha Lom Sak, the pine on the cliff edge', ['pha lom sak', 'ผาหล่มสัก', 'phu kradueng', 'ภูกระดึง', 'lone pine', 'ต้นสนริมผา', 'cliff edge', 'หน้าผา', 'sunset', 'พระอาทิตย์ตก', 'famous photo', 'ภาพยอดฮิต'], 'หาต้นสนต้นเดียวที่ยื่นออกมาที่ปลายผา', 'Find the one pine leaning out at the very end of the cliff',
    // a flat rocky cliff edge jutting out over a deep valley at sunset, a single crooked pine growing at its tip, orange and pink layered hills far below
    bg('#FFCC80') + C(80, 110, 24, '#FFF176', 0) + P('M16 130c40-10 80-14 208-4v20H16z', '#CE93D8', 0) + low(150, '#AB47BC') + frame
      + P('M224 130H120l-10 10c30 4 60 6 114 6z', '#8D6E63') + P('M224 146c-40 0-80-2-110-6l-4 84h114z', '#6D4C41') + Lc('M140 160l-6 40M180 160l4 50', '#5D4037', 3)
      + Lc('M126 132c-4-20 4-40-6-60', '#5D4037', 6) + P('M88 82c10-10 40-12 56-2-16 8-40 10-56 2zM98 62c10-10 36-10 48 0-14 6-36 6-48 0zM110 44c8-8 24-8 32 0-10 4-24 4-32 0z', '#2E7D32', 3) + face(120, 64, 0.26)),
  L('maple', 'ใบเมเปิลแดงภูกระดึง', 'Red maple leaves of Phu Kradueng', ['red maple', 'เมเปิลแดง', 'maple leaves', 'ใบเมเปิล', 'phu kradueng', 'ภูกระดึง', 'autumn colours', 'ใบไม้เปลี่ยนสี', 'cool season', 'หน้าหนาว', 'leaf peeping', 'ชมใบไม้แดง'], 'หาใบเมเปิลใบใหญ่ที่สุดที่กำลังยิ้ม', 'Find the biggest maple leaf, the one with a smile',
    // a twig with five-lobed maple leaves in red, orange and yellow, the biggest red one smiling, two leaves twirling down
    bg('#FFF8E1') + Lc('M30 60c40 10 70 30 90 70', '#6D4C41', 6) + Lc('M70 76l-10-24M98 98l18-16', '#6D4C41', 4)
      + leaf(56, 42, 0.7, '#FB8C00', -20) + leaf(124, 76, 0.65, '#FDD835', 20) + leaf(126, 150, 1.5, '#E53935', 10) + face(124, 140, 0.42) + leaf(56, 176, 0.55, '#C62828', -40) + leaf(196, 190, 0.5, '#EF6C00', 30)),
  L('sisongrak', 'พระธาตุศรีสองรัก', 'Phra That Si Song Rak', ['phra that si song rak', 'พระธาตุศรีสองรัก', 'dan sai', 'ด่านซ้าย', 'lao style chedi', 'เจดีย์ทรงลาว', 'friendship stupa', 'สัญลักษณ์ไทยลาว', 'white stupa', 'เจดีย์ขาว', 'lotus bud spire', 'ยอดบัวตูม'], 'หาเจดีย์สีขาวที่ยอดเหมือนดอกบัวตูม', 'Find the white stupa with a top like a lotus bud',
    // a white Lao-style stupa on a square stepped base inside a low white wall, a square body with little niches, a tall bulb spire like a lotus bud with a gold tip, palms beside
    bg('#E3F2FD') + low(186, '#C5E1A5') + frame + R(30, 176, 180, 14, '#FFFFFF', 2) + [40, 60, 180, 200].map((x) => R(x - 3, 168, 6, 8, '#FFFFFF', 0, 2.5)).join('')
      + R(70, 156, 100, 20, '#FAFAFA', 0) + R(80, 136, 80, 20, '#FFFFFF', 0) + R(88, 104, 64, 32, '#FAFAFA', 0) + R(110, 112, 20, 18, '#FFE082', 8, 2.5)
      + P('M92 104c0-14 12-18 28-18s28 4 28 18z', '#FFFFFF') + P('M104 88c-6-20 4-40 16-56 12 16 22 36 16 56z', '#FFFFFF') + Lc('M106 70c8 4 20 4 28 0M108 54c6 3 18 3 24 0', '#E0E0E0', 3) + P('M116 34l4-16 4 16z', '#FFCA28', 2.5) + face(120, 146, 0.36)
      + [[24, 120], [216, 124]].map(([x, y]) => Lc(`M${x} 176v-${176 - y}`, '#795548', 4) + P(`M${x} ${y}c-14-4-20 4-22 10M${x} ${y}c14-4 20 4 22 10M${x} ${y}c-6-10-16-12-20-8M${x} ${y}c6-10 16-12 20-8`, 'none').replace('fill="none"', 'fill="none" stroke="#43A047" stroke-width="5"')).join('')),
  L('phuthok', 'ภูทอกเชียงคาน', 'Phu Thok hill above the Mekong bend', ['phu thok', 'ภูทอก', 'chiang khan', 'เชียงคาน', 'viewpoint', 'จุดชมวิว', 'mekong bend', 'โค้งแม่น้ำโขง', 'sunrise', 'พระอาทิตย์ขึ้น', 'hilltop', 'ยอดเขา'], 'หาโค้งแม่น้ำที่เลี้ยวเหมือนตัว S', 'Find the river bending like a big letter S',
    // looking down from a green hilltop with a wooden lookout rail, the Mekong curving in a big S between green hills, the sun just rising over the far ridges
    bg('#FFE0B2') + C(160, 70, 20, '#FFB74D', 0) + P('M16 90c40-20 90-24 208-8v20H16z', '#9FA8DA', 0) + low(96, '#81C784') + frame
      + P('M224 104c-60 0-90 10-80 30s70 20 50 44-110 10-120 30', 'none').replace('fill="none"', 'fill="none" stroke="#4FC3F7" stroke-width="20"') + Lc('M224 104c-60 0-90 10-80 30s70 20 50 44-110 10-120 30', '#B3E5FC', 3)
      + P('M16 180c40-10 80 0 100 44H16z', '#558B2F', 3) + Lc('M24 168h70M30 168v26M60 168v30M90 168v34', '#8D6E63', 5) + face(52, 200, 0.34)),
  L('bridge', 'สะพานมิตรภาพไทย-ลาว แม่น้ำเหือง', 'The Friendship Bridge over the Hueang River', ['thai-lao friendship bridge', 'สะพานมิตรภาพไทย-ลาว', 'hueang river', 'แม่น้ำเหือง', 'border bridge', 'สะพานข้ามพรมแดน', 'na haeo', 'นาแห้ว', 'tha li', 'ท่าลี่', 'to laos', 'ไปลาว'], 'หาสะพานที่เชื่อมสองฝั่งแม่น้ำเล็กๆ', 'Find the bridge joining the two banks of the little river',
    // a smooth concrete bridge on round pillars across a narrow green river between forested banks, lamp posts along it and a little white car crossing
    bg('#E1F5FE') + P('M16 120c40-10 70-8 90 0v80H16zM224 116c-40-8-70-8-90 4v80h90z', '#66BB6A', 0) + low(170, '#4DB6AC') + frame + Lc('M60 186h30M140 192h40', '#E0F2F1', 3)
      + [[34, 100], [204, 96]].map(([x, y]) => C(x, y, 20, '#2E7D32') + C(x + 16, y + 6, 14, '#43A047')).join('')
      + R(20, 122, 200, 14, '#ECEFF1', 2) + Lc('M20 122h200', '#B0BEC5', 3) + [70, 120, 170].map((x) => R(x - 8, 136, 16, 44, '#CFD8DC', 3)).join('')
      + [40, 90, 150, 200].map((x) => Lc(`M${x} 122v-22h8`, '#607D8B', 3) + C(x + 10, 102, 3.5, '#FFF59D', 1.5)).join('')
      + g(112, 112, 1, R(-16, -10, 32, 12, '#FFFFFF', 4) + P('M-10-10l4-8h12l4 8z', '#90CAF9', 2.5) + C(-8, 3, 4, INK, 0) + C(8, 3, 4, INK, 0)) + face(120, 158, 0.32)),
  L('taidam', 'บ้านไทดำหลังคากระดองเต่า', 'A Tai Dam house with a turtle-shell roof', ['tai dam house', 'บ้านไทดำ', 'turtle-shell roof', 'หลังคาทรงกระดองเต่า', 'na pa nat', 'บ้านนาป่าหนาด', 'thatched house', 'บ้านหลังคามุงหญ้า', 'chiang khan', 'เชียงคาน', 'ethnic village', 'หมู่บ้านชาติพันธุ์'], 'หาบ้านที่หลังคาโค้งเหมือนกระดองเต่า', 'Find the house whose roof is round like a turtle\'s shell',
    // a tall rounded thatched roof that curves down almost to the ground like a turtle shell, crossed horn ornaments on the ridge ends, the house raised on wooden stilts
    bg('#FFF8E1') + low(184, '#A5D6A7') + frame + Lc('M70 184v-40M110 184v-40M150 184v-40M184 184v-40', '#6D4C41', 6) + R(64, 140, 126, 12, '#8D6E63', 2) + Lc('M150 184l14-40', '#A1887F', 4) + Lc('M156 170h10M160 158h8', '#A1887F', 3)
      + P('M30 150c0-60 40-96 90-96s90 36 90 96c-20 6-40 8-60 0-20 8-40 8-60 0-20 8-40 6-60 0z', '#C9A253') + Array.from({ length: 6 }, (_, k) => Lc(`M${48 + k * 28} 146c${-4 + k}-30 ${2}-60 ${(k - 2.5) * 6}-80`, '#A8843A', 3)).join('')
      + Lc('M60 74l-12-16M64 74l4-18M180 74l12-16M176 74l-4-18', '#5D4037', 5) + R(108, 112, 26, 30, '#5D4037', 3) + face(120, 92, 0.4)),
  L('quilts', 'ผ้านวมทำมือเชียงคาน', 'Chiang Khan\'s hand-stitched cotton quilts', ['chiang khan quilt', 'ผ้านวมเชียงคาน', 'cotton quilt', 'ผ้านวม', 'handmade', 'ทำมือ', 'souvenir', 'ของฝาก', 'cosy blanket', 'ผ้าห่มอุ่นๆ', 'cotton stuffing', 'นุ่นฝ้าย'], 'หาผ้านวมผืนบนสุดที่มีลายดอกไม้', 'Find the quilt on top with the flower print',
    // a tall stack of folded puffy quilts in bright flower and check prints, stitched in little squares, a fluffy ball of cotton and a needle beside them
    bg('#FCE4EC') + R(40, 196, 160, 12, '#BCAAA4', 3)
      + [['#42A5F5', 168], ['#FFCA28', 142], ['#66BB6A', 116], ['#EF5350', 90]].map(([c, y]) => R(48, y, 144, 28, c, 12) + Lc(`M60 ${y + 14}h120`, '#FFFFFF', 2.5) + Array.from({ length: 5 }, (_, k) => Lc(`M${72 + k * 24} ${y + 4}v20`, '#FFFFFF', 2)).join('')).join('')
      + R(54, 66, 132, 26, '#FFF59D', 12) + [[76, 78], [104, 76], [132, 80], [160, 76]].map(([x, y], k) => C(x, y, 6, k % 2 ? '#F06292' : '#BA68C8', 2) + C(x, y, 2, '#FFEB3B', 0)).join('') + face(120, 126, 0.34)
      + C(200, 60, 16, '#FFFFFF') + C(190, 52, 8, '#FFFFFF', 2.5) + Lc('M30 90l30-30', '#90A4AE', 3) + C(58, 62, 3, 'none', 2)),
  L('bangfai', 'บั้งไฟงานบุญหลวงด่านซ้าย', 'A bang fai bamboo rocket at the Dan Sai festival', ['bang fai', 'บั้งไฟ', 'rocket festival', 'บุญบั้งไฟ', 'bun luang', 'งานบุญหลวง', 'dan sai', 'ด่านซ้าย', 'launch tower', 'ฐานจุดบั้งไฟ', 'asking for rain', 'ขอฝน'], 'หาบั้งไฟที่มีหางยาวพาดอยู่บนฐานไม้ไผ่', 'Find the rocket with a long tail resting on the bamboo tower',
    // a tall leaning bamboo launch tower with rungs, a long rocket wrapped in red and yellow stripes resting on it with a long bamboo tail, coloured paper streamers fluttering, a puffy white smoke cloud at the bottom
    bg('#B3E5FC') + low(196, '#C5E1A5') + frame + [[60, 52], [180, 64]].map(([x, y]) => E(x, y, 22, 8, '#FFFFFF', 0)).join('')
      + Lc('M70 200L170 36M94 200L190 44', '#C8A165', 6) + Array.from({ length: 8 }, (_, k) => Lc(`M${80 + k * 12} ${184 - k * 20}l22 6`, '#A1887F', 3)).join('')
      + g(150, 92, 1, R(-14, -40, 28, 84, '#E53935', 8) + [-24, -6, 12, 30].map((y) => Lc(`M-14 ${y}h28`, '#FFEB3B', 5)).join('') + P('M-14-40l14-22 14 22z', '#FFCA28') + face(0, -6, 0.3), 31)
      + Lc('M128 128L84 200', '#8D6E63', 5) + [[100, 150, '#F06292'], [112, 132, '#42A5F5'], [92, 168, '#66BB6A']].map(([x, y, c]) => P(`M${x} ${y}c10 4 18 0 24-6-4 10-14 14-24 6z`, c, 2)).join('')
      + [[50, 204, 18], [76, 210, 14], [32, 212, 12]].map(([x, y, r]) => C(x, y, r, '#FFFFFF', 3)).join('')),
  L('neramit', 'วัดเนรมิตวิปัสสนาสร้างจากศิลาแลง', 'The laterite stone hall of Wat Neramit Wipatsana', ['wat neramit wipatsana', 'วัดเนรมิตวิปัสสนา', 'laterite', 'ศิลาแลง', 'stone hall', 'โบสถ์ศิลาแลง', 'dan sai', 'ด่านซ้าย', 'hilltop temple', 'วัดบนเนิน', 'brown stone blocks', 'ก้อนหินสีน้ำตาล'], 'หากำแพงที่ทำจากก้อนหินพรุนสีน้ำตาลส้ม', 'Find the walls made of bumpy orange-brown stone blocks',
    // a temple hall built entirely of rough orange-brown laterite blocks full of little holes, a tall dark wooden roof in three layers with curling gable ends, wide stone steps in front, frangipani tree
    bg('#E8F5E9') + low(196, '#C5E1A5') + frame + R(40, 184, 160, 14, '#B87A4B', 2) + R(52, 120, 136, 64, '#C68A55', 2)
      + Array.from({ length: 24 }, (_, k) => R(54 + (k % 6) * 22 + (Math.floor(k / 6) % 2) * 6, 122 + Math.floor(k / 6) * 15, 20, 13, '#C68A55', 2, 2)).join('') + Array.from({ length: 20 }, (_, k) => C(62 + (k * 29) % 120, 128 + (k * 17) % 52, 1.8, '#8D5524', 0)).join('')
      + R(104, 138, 32, 46, '#5D4037', 2) + R(96, 184, 48, 6, '#A0683E', 2, 2.5)
      + P('M40 124l80-48 80 48z', '#5D4037') + P('M56 104l64-40 64 40z', '#6D4C41') + P('M76 80l44-30 44 30z', '#5D4037') + Lc('M40 124l-8-10M200 124l8-10M76 80l-8-10M164 80l8-10', '#FFCA28', 4) + face(120, 104, 0.32)
      + Lc('M210 196v-40', '#8D6E63', 5) + [[202, 152], [218, 154], [210, 144]].map(([x, y]) => C(x, y, 6, '#FFFFFF', 2) + C(x, y, 2, '#FFCA28', 0)).join('')),
  L('phuruea', 'ภูเรือ ภูเขารูปเรือ', 'Phu Ruea, the mountain shaped like a boat', ['phu ruea', 'ภูเรือ', 'boat-shaped mountain', 'ภูเขารูปเรือ', 'national park', 'อุทยานแห่งชาติ', 'coldest place', 'จุดที่หนาวที่สุด', 'hilltop', 'ยอดภู', 'cool weather', 'อากาศเย็น'], 'หาภูเขาที่มีหัวเรือและท้ายเรือ', 'Find the mountain with a bow and a stern like a ship',
    // a long green mountain whose top rises at each end like the bow and stern of an old junk boat, a dotted outline of a little boat above it to compare, pines standing like masts
    bg('#E3F2FD') + low(170, '#A5D6A7') + frame + E(60, 54, 24, 8, '#FFFFFF', 0)
      + P('M24 170c10-40 20-70 34-84 10 20 40 26 62 26s56-6 66-24c12 16 26 46 30 82z', '#43A047') + Lc('M60 104c20 16 100 16 126 0', '#2E7D32', 3)
      + [[96, 110], [120, 112], [144, 110]].map(([x, y]) => pine(x, y + 2, 0.4)).join('')
      + g(120, 30, 1, P('M-60 26c4-10 8-18 14-22 6 8 20 12 46 12s40-4 46-12c6 4 10 12 14 22z', '#BBDEFB', 3) + Lc('M0 14v-28', '#1E88E5', 3) + P('M2-14l20 12-20 6z', '#FFFFFF', 3))
      + face(120, 140, 0.42)),
  L('khaopip', 'ข้าวเปิ๊บเชียงคาน', 'Khao pip, Chiang Khan\'s steamed rice-sheet noodle soup', ['khao pip', 'ข้าวเปิ๊บ', 'chiang khan food', 'อาหารเชียงคาน', 'steamed rice sheet', 'แผ่นแป้งนึ่ง', 'noodle soup', 'ก๋วยเตี๋ยวน้ำ', 'cloth over the pot', 'ผ้าขาวบางบนหม้อ', 'local breakfast', 'อาหารเช้าพื้นบ้าน'], 'หาผ้าขาวที่ขึงบนปากหม้อสำหรับนึ่งแป้ง', 'Find the white cloth stretched over the pot to steam the batter',
    // a big steaming pot with a white cloth stretched across its mouth, a thin round sheet of rice batter cooking on it, and a bowl of soup with folded rice sheets, egg, greens and crispy garlic
    bg('#E0F7FA') + Lc('M60 60c-8-10 8-14 0-24M84 56c-8-10 8-14 0-24', '#B0BEC5', 4)
      + P('M24 120h104l-8 60H32z', '#90A4AE') + E(76, 120, 52, 12, '#FFFFFF') + E(76, 120, 36, 7, '#FFF8E1', 2.5) + Lc('M24 120l-6 4M128 120l6 4', '#78909C', 5)
      + P('M110 150c0 40 26 60 56 60s56-20 56-60z', '#FFFFFF') + E(166, 150, 56, 12, '#FFE0B2') + Lc('M128 148c10-6 22 6 34-2s24 6 34-2', '#FFF8E1', 7) + C(184, 146, 9, '#FFFFFF', 2.5) + C(184, 146, 4, '#FFB300', 0)
      + [[140, 144], [150, 152], [200, 152]].map(([x, y]) => E(x, y, 6, 3, '#66BB6A', 2)).join('') + [[160, 156], [172, 150], [194, 156]].map(([x, y]) => C(x, y, 2.5, '#C68A55', 0)).join('') + face(166, 182, 0.4)),
  L('phukradueng', 'ภูกระดึง ภูเขายอดตัด', 'Phu Kradueng, the mountain with a flat top', ['phu kradueng', 'ภูกระดึง', 'flat-topped mountain', 'ภูเขายอดตัด', 'hiking trail', 'เส้นทางเดินขึ้นภู', 'climb', 'ปีนเขา', 'national park', 'อุทยานแห่งชาติ', 'tabletop', 'ภูเขาหัวตัด'], 'หาทางเดินซิกแซกที่ไต่ขึ้นไปบนยอดภูที่แบน', 'Find the zigzag trail climbing up to the flat top',
    // a huge mountain with steep cliff sides and a perfectly flat top dotted with pines, a zigzag trail climbing its forested slope, a little start gate at the bottom
    bg('#E1F5FE') + low(186, '#9CCC65') + frame + [[48, 44], [180, 54]].map(([x, y]) => E(x, y, 22, 8, '#FFFFFF', 0)).join('')
      + P('M24 190c12-40 22-80 34-110h124c12 30 22 70 34 110z', '#8D6E63') + P('M58 80h124c4 10 8 20 10 30-50 8-100 8-144 0 2-10 6-20 10-30z', '#A1887F', 0) + P('M38 186c10-30 20-50 30-60 30 10 80 10 104 0 10 10 20 30 30 60z', '#43A047')
      + Array.from({ length: 7 }, (_, k) => pine(70 + k * 17, 80, 0.32)).join('') + P('M118 186l-26-14 40-12-30-12 30-10-20-10', 'none').replace('fill="none"', 'fill="none" stroke="#FFE082" stroke-width="4" stroke-dasharray="6 4"')
      + Lc('M104 200v-16M136 200v-16M100 184h40', '#C62828', 5) + face(120, 112, 0.4)),
  L('flowers', 'งานดอกไม้งามภูเรือ', 'The Phu Ruea flower festival', ['phu ruea flower festival', 'งานดอกไม้งามภูเรือ', 'chrysanthemums', 'ดอกเบญจมาศ', 'marigolds', 'ดาวเรือง', 'flower garden', 'สวนดอกไม้', 'cool season flowers', 'ดอกไม้เมืองหนาว', 'phu ruea', 'ภูเรือ'], 'หาดอกไม้ที่จัดเรียงเป็นรูปหัวใจ', 'Find the flowers planted in the shape of a heart',
    // a hillside garden where pots of yellow, orange, pink and purple chrysanthemums are arranged into a big heart, pines and a blue sky behind
    bg('#E3F2FD') + low(110, '#AED581') + frame + [30, 56, 184, 210].map((x) => pine(x, 116, 0.55)).join('')
      + Array.from({ length: 30 }, (_, k) => { const t = k / 30 * 6.283, x = 120 + 16 * Math.pow(Math.sin(t), 3) * 4.4, y = 156 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 3.6; return C(x, y, 8, ['#FFCA28', '#FB8C00', '#F06292', '#AB47BC', '#FFF176'][k % 5], 2.5) + C(x, y, 2.5, '#FFFFFF', 0); }).join('')
      + [[110, 150], [130, 150], [120, 168], [104, 134], [136, 134]].map(([x, y], k) => C(x, y, 8, ['#F06292', '#FFCA28', '#AB47BC', '#FB8C00', '#FFF176'][k], 2.5)).join('') + face(120, 150, 0.32)),
  L('phupapo', 'ภูป่าเปาะ ภูเขาทรงกรวยกลางไร่', 'Phu Pa Po, the cone hill in the farmland', ['phu pa po', 'ภูป่าเปาะ', 'cone-shaped hill', 'ภูเขาทรงกรวย', 'farm fields', 'ไร่นา', 'reflection', 'เงาสะท้อนน้ำ', 'photo spot', 'มุมถ่ายรูป', 'loei town', 'เมืองเลย'], 'หาเงาของภูเขาที่สะท้อนอยู่ในบ่อน้ำ', 'Find the hill\'s reflection upside down in the pond',
    // a perfectly pointed green cone hill rising alone from flat farm fields striped with crops, a round pond in front holding its upside-down reflection, morning sky
    bg('#FFF3E0') + low(140, '#C5E1A5') + frame + P('M70 142c20-30 36-90 50-104 14 14 30 74 50 104z', '#558B2F') + Lc('M110 60c-8 30-14 60-28 82M128 60c8 30 14 60 28 82', '#33691E', 3) + face(120, 110, 0.36)
      + [150, 164, 210].map((y) => Lc(`M16 ${y}h208`, '#9CCC65', 4)).join('') + E(120, 186, 64, 20, '#81D4FA') + P('M84 180c14 6 24 10 36 22 12-12 22-16 36-22z', '#7CB342', 0).replace('fill="#7CB342"', 'fill="#7CB342" opacity=".6"') + Lc('M80 192h20M140 192h16', '#E1F5FE', 2.5)),
  L('woodenhouse', 'บ้านไม้บานเฟี้ยมเชียงคาน', 'An old Chiang Khan wooden house with folding doors', ['wooden shophouse', 'บ้านไม้ห้องแถว', 'folding plank doors', 'ประตูบานเฟี้ยม', 'chiang khan', 'เชียงคาน', 'balcony', 'ระเบียง', 'flower pots', 'กระถางดอกไม้', 'old town', 'ย่านเก่า'], 'หาประตูไม้บานพับที่เปิดอยู่ครึ่งหนึ่ง', 'Find the folding wooden doors standing half open',
    // a weathered brown two-storey wooden house: a balcony with pots of pink flowers upstairs, a row of tall folding plank doors downstairs with two folded open, a wooden bench by the door
    bg('#FFF8E1') + low(198, '#D7CCC8') + frame + R(40, 70, 160, 128, '#A1673F', 0) + P('M30 72l90-36 90 36z', '#6D4C41')
      + R(56, 82, 128, 36, '#8D5A33', 0, 3) + [70, 104, 138].map((x) => R(x, 86, 24, 28, '#FFE082', 2, 3) + Lc(`M${x + 12} 86v28`, '#8D5A33', 2.5)).join('') + R(48, 116, 144, 8, '#5D4037', 2) + Lc('M52 116v-12h136v12M64 104v12M88 104v12M112 104v12M136 104v12M160 104v12', '#5D4037', 3)
      + [70, 120, 170].map((x) => R(x - 8, 98, 16, 8, '#E64A19', 2, 2.5) + C(x - 4, 94, 5, '#F06292', 2) + C(x + 4, 94, 5, '#EC407A', 2)).join('')
      + Array.from({ length: 6 }, (_, k) => R(48 + k * 24 + (k > 2 ? 6 : 0), 130 + (k === 2 || k === 3 ? 4 : 0), k === 2 || k === 3 ? 12 : 22, 64, '#8D5A33', 0, 3)).join('') + R(108, 134, 30, 60, '#4E342E', 0, 3)
      + R(150, 184, 40, 8, '#BCAAA4', 2, 2.5) + Lc('M154 192v6M186 192v6', '#8D6E63', 3) + face(123, 156, 0.32)),
];

export default {
  places: {
    'th-loei': { country: 'th', wave: 3, home: true, name: nm('เลยและเชียงคาน', 'Loei and Chiang Khan'), tz: 'Asia/Bangkok', ll: [17.49, 101.73], alias: ['loei', 'จังหวัดเลย', 'เมืองเลย', 'chiang khan', 'เชียงคาน', 'phu kradueng', 'ภูกระดึง', 'phu ruea', 'ภูเรือ', 'dan sai', 'ด่านซ้าย', 'LOE', 'kaeng khut khu', 'แก่งคุดคู้', 'phu thok', 'ภูทอก', 'phi ta khon', 'ผีตาโขน'], colors: LO },
  },
  items,
};
