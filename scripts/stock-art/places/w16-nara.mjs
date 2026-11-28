// Wave 16: Nara — the old capital of the deer: bowing deer in Nara Park, Mount Wakakusa's three grassy humps, Kōfuku-ji's
// pagoda over Sarusawa Pond, Ukimidō, Kasuga Taisha's corridor of bronze lanterns and its mossy stone lanterns, Heijō Palace's
// Suzakumon and the envoy ship, the Shōsōin, the deer road sign, shika senbei, a spotted fawn, and the town's sweets and dishes.
// Nara was an alias of jp-kyoto until now; Kyoto keeps its Todai-ji picture (jp-kyoto.landmark.todaiji), so the Great Buddha
// Hall is not drawn again here. Skipped as bans or repeats: the Great Buddha and the Niō guardians (temple statues), Sento-kun
// (a child Buddha mascot), Omizutori (a temple rite), Yakushi-ji's twin pagodas (Guilin has twin pagodas), Isuien's stepping
// stones (Kyoto's tobiishi), the persimmons (Đà Lạt), the sumi ink stick (China's calligraphy), Yoshino's cherry hills.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NR = { k1: '#B5532A', k2: '#2E7D32', k3: '#FFF3E0' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `jp-nara.landmark.${slug}`, cat: 'landmark', file: `jp/nara/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
const DEER = '#C69C6D', LEG = '#A1673F', SPOT = '#FFF3E0';
// a Nara deer seen from the side, facing left; bow = the head down to the ground
const deer = (x, y, s, bow) => g(x, y, s, R(-24, 6, 7, 28, LEG, 3) + R(-12, 8, 7, 26, LEG, 3) + R(10, 8, 7, 26, LEG, 3) + R(20, 6, 7, 28, LEG, 3)
  + E(30, -8, 6, 5, '#FFFFFF') + E(0, 0, 32, 17, DEER)
  + (bow
    ? P('M-20-10c-8 2-14 8-18 16l8 6c4-6 8-10 14-12z', DEER) + E(-42, 12, 13, 8, DEER) + P('M-36 4l4-11 6 8z', DEER) + ol('M-34 2l-4-14M-37-8l6-5', '#8D6E63', 2.5)
      + C(-44, 8, 2.2, INK, 0) + C(-54, 15, 2.4, INK, 0) + E(-40, 15, 3.5, 2, '#FF8FA3', 0)
    : P('M-20-8c-4-10-6-18-6-26l12-2c0 8 2 16 6 24z', DEER) + E(-28, -38, 13, 8, DEER) + P('M-22-44l4-11 6 8z', DEER) + ol('M-22-46l-2-14M-23-54l-6-5', '#8D6E63', 2.5)
      + C(-30, -40, 2.2, INK, 0) + C(-40, -36, 2.4, INK, 0) + E(-26, -34, 3.5, 2, '#FF8FA3', 0))
  + [[-6, -6], [6, -9], [16, -3], [-2, 4]].map(([a, b]) => C(a, b, 2.6, SPOT, 0)).join(''));
// a stone lantern: foot, post, the light box with its window, the wide hat, the knob; moss on the hat
const stone = (x, y, s) => g(x, y, s, R(-14, -6, 28, 8, '#B0BEC5', 3) + R(-5, -38, 10, 32, '#B0BEC5') + R(-16, -46, 32, 8, '#B0BEC5', 3) + R(-11, -66, 22, 20, '#CFD8DC')
  + R(-5, -62, 10, 12, '#FFE082', 0, 2.5) + P('M-22-66l22-14 22 14z', '#90A4AE') + C(0, -84, 5, '#B0BEC5') + P('M-18-66c6-6 12-6 16-2', '#9CCC65', 0) + C(-10, -2, 4, '#9CCC65', 0));

const items = [
  { id: 'jp-nara.stamp', cat: 'stamp', file: 'jp/nara/stamp.v1.svg', name: nm('ตราประทับนารา', 'Nara stamp'), kw: ['nara', 'นารา', 'nara deer', 'กวางนารา', 'old capital', 'เมืองหลวงเก่า', 'kansai', 'คันไซ'],
    // a smiling deer's face with little antlers and round ears, a deer cracker held up beside its white muzzle
    svg: cityStamp('jnr-st', { name: 'NARA', sub: 'JAPAN', ...NR, emblem: ol('M88 72c-4-8-4-16 2-22M86 62l-8-3M112 72c4-8 4-16-2-22M114 62l8-3', '#8D6E63', 3)
      + P('M86 84c-14-4-24 0-28 8 10 4 20 2 28-2z', DEER) + P('M114 84c14-4 24 0 28 8-10 4-20 2-28-2z', DEER) + E(70, 89, 7, 2.5, '#F8BBD0', 0) + E(130, 89, 7, 2.5, '#F8BBD0', 0)
      + P('M84 82c0-10 8-14 16-14s16 4 16 14l-4 30c-2 8-7 12-12 12s-10-4-12-12z', DEER) + E(100, 116, 11, 9, SPOT) + C(100, 111, 3.5, INK, 0) + face(100, 94, 0.42, 'none')
      + C(130, 128, 12, '#E6C07B') + C(130, 128, 7, 'none') + C(126, 124, 1.5, '#C9984B', 0) + C(134, 131, 1.5, '#C9984B', 0) }) },
  { id: 'jp-nara.day.narapark', cat: 'day', file: 'jp/nara/day-narapark.v1.svg', name: nm('กวางโค้งทักทายในสวนนารา', 'Deer bowing hello in Nara Park'), kw: ['nara park', 'สวนนารา', 'deer', 'กวาง', 'bowing deer', 'กวางโค้ง', 'deer park', 'สวนกวาง', 'lawn', 'สนามหญ้า', 'nara', 'นารา'],
    // a wide green lawn under big round trees, a deer bowing to a little stack of crackers on the grass, a second deer lying down to rest, a far pagoda over the treetops
    svg: scene('jnr-d1', '#E3F2FD', C(196, 52, 16, '#FFE082', 0) + R(117, 70, 6, 50, '#5D4037') + [0, 1, 2, 3, 4].map((i) => P(`M${105 + i * 2} ${108 - i * 12}q15-6 30 0l-3 4h-24z`, '#5D4037', 3)).join('') + Lc('M120 50v-12', INK, 3)
      + C(20, 112, 30, '#66BB6A') + C(70, 104, 26, '#81C784') + C(170, 102, 28, '#81C784') + C(222, 112, 30, '#66BB6A') + P('M-4 128h248v130H-4z', '#AED581')
      + Lc('M30 160l4-6 4 6M190 214l4-6 4 6M60 222l4-6 4 6M200 152l4-6 4 6', '#7CB342', 3)
      + E(60, 202, 16, 5, '#C5E1A5', 0) + [0, 1, 2].map((i) => E(62, 196 - i * 5, 11, 4, '#E6C07B', 3)).join('') + deer(126, 172, 1.1, true)
      + g(196, 190, 0.75, E(4, 10, 20, 5, '#9CCC65', 0) + E(10, 8, 7, 5, LEG) + E(0, 0, 30, 14, DEER) + E(28, -6, 5, 4, '#FFFFFF') + P('M-20-6c-4-10-4-18-2-24l12 0c-2 8 0 16 4 22z', DEER)
        + E(-20, -34, 12, 8, DEER) + P('M-14-40l4-10 6 8z', DEER) + C(-22, -36, 2.2, INK, 0) + C(-31, -32, 2.4, INK, 0) + E(-18, -30, 3.5, 2, '#FF8FA3', 0) + [[-4, -4], [8, -6], [16, 0]].map(([a, b]) => C(a, b, 2.6, SPOT, 0)).join(''))) },
  { id: 'jp-nara.day.wakakusa', cat: 'day', file: 'jp/nara/day-wakakusa.v1.svg', name: nm('เขาวาคาคุสะ เนินหญ้าสามชั้น', 'Mount Wakakusa, the three grassy humps'), kw: ['mount wakakusa', 'เขาวาคาคุสะ', 'wakakusayama', 'วาคาคุสะยามะ', 'grassy hill', 'เนินหญ้า', 'three humps', 'เนินสามชั้น', 'city view', 'วิวเมือง', 'picnic', 'ปิกนิก', 'nara', 'นารา'],
    // a smooth bare green hill rising in three soft humps with a zigzag path up it, tiny deer grazing on top, forest on both sides and the old town's roofs at its foot
    svg: scene('jnr-d2', '#FFF3E0', C(56, 50, 16, '#FFCC80', 0) + P('M-4 150c20-40 60-60 90-56 10-30 50-40 74-20 20-6 50 10 84 40v90H-4z', '#2E7D32')
      + P('M40 160c20-34 40-48 64-46 6-22 30-30 48-16 16-4 34 8 50 30 4 10 4 20 0 32H40z', '#9CCC65') + Lc('M74 128c20 6 44 4 70-6M58 150c30 6 70 4 110-8', '#AED581', 4)
      + Lc('M120 190l-18-14 22-10-16-14 18-10-8-14', '#D7CCC8', 4) + face(120, 150, 0.46)
      + g(104, 96, 0.34, E(0, 0, 32, 17, DEER) + R(-24, 6, 7, 28, LEG, 3) + R(20, 6, 7, 28, LEG, 3) + E(-30, 12, 12, 8, DEER)) + g(160, 102, 0.3, E(0, 0, 32, 17, DEER) + R(-24, 6, 7, 28, LEG, 3) + R(20, 6, 7, 28, LEG, 3) + E(-30, -24, 12, 8, DEER))
      + P('M-4 196h248v60H-4z', '#A1887F', 0) + [[10, '#5D4037'], [50, '#455A64'], [150, '#5D4037'], [190, '#455A64']].map(([x, c]) => R(x, 198, 34, 20, '#FFF8E1') + P(`M${x - 6} ${200}l${23} -14 ${23} 14z`, c)).join('')
      + R(94, 200, 52, 22, '#FFF8E1') + P('M84 202l36-18 36 18z', '#5D4037') + Lc('M104 206v14M120 206v14M136 206v14', '#A1887F', 3)) },

  L('kofukuji', 'เจดีย์ห้าชั้นวัดโคฟุกุจิริมสระซารุซาวะ', 'Kōfuku-ji’s five-storey pagoda over Sarusawa Pond', ['kofukuji', 'kofuku-ji', 'โคฟุกุจิ', 'five-storey pagoda', 'เจดีย์ห้าชั้น', 'sarusawa pond', 'สระซารุซาวะ', 'willow', 'ต้นหลิว', 'reflection', 'เงาสะท้อน'], 'หาต้นหลิวกิ่งห้อยริมสระ', 'Find the willow hanging over the pond',
    // a dark wooden five-roofed pagoda with a tall ringed spire, standing over a still pond that mirrors it, a weeping willow drooping at the water's edge
    bg('#E8EAF6') + low(168, '#4FC3F7') + frame
      + [0, 1, 2, 3, 4].map((i) => { const w = 92 - i * 10, y = 160 - i * 24, x = 132 - w / 2; return R(x + 12, y - 16, w - 24, 16, '#FFF8E1') + Lc(`M${x + 20} ${y - 16}v16M${x + w - 20} ${y - 16}v16`, '#8D6E63', 3) + P(`M${x - 4} ${y - 14}q${w / 2 + 4}-12 ${w + 8} 0l-6 6h-${w - 4}z`, '#5D4037'); }).join('')
      + ol('M132 44V12', '#FFB300', 4) + [20, 28, 36].map((y) => Lc(`M126 ${y}h12`, INK, 3)).join('') + face(132, 116, 0.36)
      + Lc('M100 180h64M108 192h48M116 204h32', '#B3E5FC', 4) + Lc('M48 168c-4-40 0-80 12-112', '#6D4C41', 6)
      + Lc('M58 66c-12 20-16 50-14 90M62 72c-4 24-2 50 4 80M56 60c-18 18-26 44-28 76M66 84c4 20 6 42 4 64', '#9CCC65', 4)),
  L('ukimido', 'ศาลาอุกิมิโดะกลางสระน้ำ', 'Ukimidō, the pavilion floating on Sagi Pond', ['ukimido', 'อุกิมิโดะ', 'floating pavilion', 'ศาลากลางน้ำ', 'sagi-ike pond', 'สระซางิ', 'wooden bridge', 'สะพานไม้', 'boats', 'เรือพาย'], 'หาสะพานไม้ที่พาไปถึงศาลา', 'Find the wooden bridge out to the pavilion',
    // a little six-sided wooden pavilion with a pointed bark roof sitting on posts in the middle of a pond, a plank bridge running out to it, its reflection in the water and a rowing boat
    bg('#E8F5E9') + low(130, '#81D4FA') + frame + C(40, 74, 22, '#81C784', 0) + C(200, 70, 26, '#66BB6A', 0)
      + R(98, 124, 6, 26, '#8D6E63', 0, 3) + R(136, 124, 6, 26, '#8D6E63', 0, 3) + R(117, 126, 6, 24, '#8D6E63', 0, 3)
      + R(82, 118, 76, 10, '#BCAAA4', 0, 3) + R(90, 92, 6, 26, '#A1673F', 0, 3) + R(144, 92, 6, 26, '#A1673F', 0, 3) + R(117, 92, 6, 26, '#A1673F', 0, 3)
      + P('M72 96l48-40 48 40z', '#6D4C41') + Lc('M120 56v-10', INK, 4) + C(120, 44, 4, '#FFB300', 3) + face(120, 82, 0.34)
      + P('M16 140l70-14v8l-70 14z', '#D7A86E') + Lc('M30 140v20M56 134v20M78 130v16', '#8D6E63', 3)
      + Lc('M90 166h60M98 178h44', '#B3E5FC', 4) + P('M160 186h44l-6 10h-32z', '#FFCC80') + Lc('M170 180l12-12', '#8D6E63', 3)),
  L('kasuga', 'ระเบียงสีแดงกับโคมสำริดของศาลเจ้าคาสุงะไทฉะ', 'Kasuga Taisha’s red corridor of bronze lanterns', ['kasuga taisha', 'คาสุงะไทฉะ', 'kasuga shrine', 'ศาลเจ้าคาสุงะ', 'bronze lanterns', 'โคมสำริด', 'hanging lanterns', 'โคมแขวน', 'red corridor', 'ระเบียงสีแดง', 'vermilion', 'สีแดงชาด'], 'หาโคมทองที่ยิ้มอยู่ตรงกลาง', 'Find the smiling golden lantern in the middle',
    // a vermilion wooden corridor with a green roof and white walls, a row of golden bronze lanterns hanging from its beam, the middle one smiling
    bg('#FFF8E1') + low(196, '#D7CCC8') + frame + P('M16 58l20-24h168l20 24z', '#607D8B') + R(24, 58, 192, 12, '#E64A19')
      + R(24, 70, 192, 116, '#FFFDF5') + [30, 76, 122, 168, 206].map((x) => R(x - 4, 70, 12, 128, '#F4511E', 0, 3.5)).join('') + R(24, 152, 192, 8, '#E64A19', 0, 3)
      + [54, 100, 146, 190].map((x) => R(x - 12, 162, 24, 18, '#A5D6A7', 0, 2.5) + Lc(`M${x - 6} 162v18M${x} 162v18M${x + 6} 162v18`, '#43A047', 2)).join('')
      + [54, 100, 146, 190].map((x) => Lc(`M${x} 70v12`, INK, 2.5) + P(`M${x - 12} 94l12-12 12 12z`, '#B8860B', 3) + R(x - 9, 94, 18, 26, '#D4A93A', 2, 3) + R(x - 5, 100, 10, 12, '#FFE082', 0, 2) + P(`M${x - 8} 120h16l-4 8h-8z`, '#B8860B', 3)).join('')
      + face(100, 106, 0.26, 'none')),
  L('stonelanterns', 'ทางเดินโคมหินมอสเขียวไปศาลเจ้าคาสุงะ', 'The mossy stone-lantern path to Kasuga', ['stone lanterns', 'โคมหิน', 'ishidoro', 'อิชิโดโร', 'moss', 'มอส', 'forest path', 'ทางเดินในป่า', 'kasuga approach', 'ทางเข้าคาสุงะ', 'deer', 'กวาง'], 'หากวางที่แอบอยู่หลังโคมหิน', 'Find the deer hiding behind a stone lantern',
    // a gravel path running between rows of grey stone lanterns with mossy hats into a deep green forest, the nearest lanterns big, the far ones small, a deer peeking out
    bg('#C8E6C9') + C(40, 60, 30, '#66BB6A', 0) + C(110, 46, 32, '#81C784', 0) + C(190, 58, 32, '#66BB6A', 0) + low(120, '#9CCC65') + frame
      + P('M104 120h32l46 104H58z', '#D7CCC8') + stone(92, 122, 0.4) + stone(148, 122, 0.4) + stone(78, 146, 0.6) + stone(164, 146, 0.6)
      + g(196, 176, 0.5, E(0, 0, 32, 17, DEER) + E(-30, -24, 13, 8, DEER) + P('M-20-8c-4-10-6-18-6-26l12-2c0 8 2 16 6 24z', DEER) + C(-32, -26, 2.5, INK, 0) + C(-42, -22, 2.5, INK, 0))
      + stone(52, 200, 1) + stone(188, 200, 1) + face(52, 152, 0.3)),
  L('suzakumon', 'ประตูซุซากุมงแห่งพระราชวังเฮโจ', 'Suzakumon, the red gate of Heijō Palace', ['suzakumon', 'ซุซากุมง', 'heijo palace', 'พระราชวังเฮโจ', 'heijo-kyo', 'เฮโจเคียว', 'red gate', 'ประตูสีแดง', 'old capital', 'เมืองหลวงเก่า', 'wide field', 'ทุ่งกว้าง'], 'หาเครื่องประดับสีทองสองข้างบนหลังคา', 'Find the two golden ornaments on the roof',
    // a huge two-storey gate with red pillars and white walls, two green-grey tiled roofs and golden fish-tail ornaments at the ridge ends, a wide gravel field in front
    bg('#E1F5FE') + low(190, '#E0D6C2') + frame + R(40, 176, 160, 14, '#BDBDBD', 0, 3)
      + R(48, 134, 144, 42, '#FFFDF5') + [54, 82, 110, 130, 158, 186].map((x) => R(x - 5, 134, 10, 42, '#E53935', 0, 3)).join('') + R(108, 150, 24, 26, '#8D6E63', 0, 3)
      + P('M24 138q96-24 192 0l-10 8H34z', '#607D8B') + R(68, 98, 104, 30, '#FFFDF5') + [76, 100, 140, 164].map((x) => R(x - 4, 98, 8, 30, '#E53935', 0, 3)).join('')
      + P('M40 104q80-40 160 0l-10 8H50z', '#607D8B') + Lc('M54 80q66-14 132 0', INK, 5) + P('M52 82c-8-12 0-22 10-16l-2 14zM188 82c8-12 0-22-10-16l2 14z', '#FFD54A', 3)
      + face(120, 114, 0.4)),
  L('kentoshisen', 'เรือทูตเค็นโตชิเซ็นแห่งพระราชวังเฮโจ', 'The Kentōshi-sen, the old envoy ship at Heijō Palace', ['kentoshisen', 'เค็นโตชิเซ็น', 'envoy ship', 'เรือทูต', 'old ship', 'เรือโบราณ', 'mat sails', 'ใบเรือเสื่อ', 'heijo palace', 'พระราชวังเฮโจ'], 'หาใบเรือที่เป็นตารางสองผืน', 'Find the two sails made of little squares',
    // a big old wooden ship on a stand, a curved brown hull with a white stripe and a smiling face, a red-pillared cabin on deck and two woven sails with a grid of mats, little flags on top
    bg('#E3F2FD') + low(196, '#C5E1A5') + frame + R(70, 182, 12, 16, '#8D6E63', 0, 3) + R(158, 182, 12, 16, '#8D6E63', 0, 3)
      + ol('M86 150V44M150 150V54', '#8D6E63', 4) + R(64, 56, 44, 60, '#E6C07B', 3) + R(130, 66, 40, 54, '#E6C07B', 3)
      + Lc('M64 76h44M64 96h44M78 56v60M94 56v60M130 84h40M130 102h40M143 66v54M157 66v54', '#C9984B', 2.5)
      + P('M84 40l14 4-14 4zM148 50l14 4-14 4z', '#E53935', 2.5)
      + R(96, 124, 42, 22, '#FFF8E1') + Lc('M102 124v22M132 124v22', '#E53935', 4) + P('M90 126l27-12 27 12z', '#5D4037')
      + P('M26 146h188c-8 22-26 36-48 38H74c-24-2-42-16-48-38z', '#8D6E63') + Lc('M38 158h164', '#FFFFFF', 5) + face(120, 170, 0.36)),
  L('shosoin', 'โชโซอิน โกดังไม้ซุงยกพื้นเก็บสมบัติ', 'The Shōsōin, the log treasure house on stilts', ['shosoin', 'โชโซอิน', 'treasure house', 'โกดังเก็บสมบัติ', 'log storehouse', 'โกดังไม้ซุง', 'azekura', 'อาเซกุระ', 'stilts', 'เสาสูง', 'wooden building', 'อาคารไม้'], 'หาเสากลมใต้โกดังที่ยกพื้นสูง', 'Find the round pillars holding the storehouse up',
    // a long dark-wood storehouse made of stacked triangular logs, a great hipped tiled roof, raised high on rows of thick round pillars over a gravel yard
    bg('#FFF8E1') + low(194, '#E0D6C2') + frame + C(204, 60, 22, '#A5D6A7', 0) + C(36, 70, 20, '#A5D6A7', 0)
      + [44, 72, 100, 140, 168, 196].map((x) => R(x - 6, 140, 12, 54, '#6D4C41', 0, 3.5)).join('') + R(32, 132, 176, 10, '#5D4037', 0, 3.5)
      + R(38, 80, 164, 52, '#8D6E63') + [88, 96, 104, 112, 120].map((y) => Lc(`M38 ${y}h164`, '#5D4037', 2.5)).join('') + Lc('M120 80v52', '#5D4037', 3)
      + P('M14 86l40-38h132l40 38z', '#546E7A') + Lc('M54 48h132', INK, 6) + face(120, 104, 0.36, 'none') + Lc('M114 114q6 5 12 0', INK, 3)),
  L('deersign', 'ป้ายระวังกวางข้ามถนน', 'The watch-out-for-deer road sign', ['deer crossing', 'กวางข้ามถนน', 'deer sign', 'ป้ายกวาง', 'road sign', 'ป้ายจราจร', 'warning sign', 'ป้ายเตือน', 'nara park road', 'ถนนในสวนนารา'], 'หากวางตัวดำบนป้ายสีเหลือง', 'Find the black deer on the yellow sign',
    // a yellow diamond warning sign on a grey pole with a leaping deer drawn in black on it, tufts of grass at the foot of the pole
    R(114, 150, 12, 70, '#B0BEC5') + P('M120 22l84 84-84 84-84-84z', '#FFD54F') + P('M120 38l68 68-68 68-68-68z', 'none') + face(120, 152, 0.3)
      + g(124, 104, 0.95, P('M-30-6c10-10 30-12 46-6l10-16 8 4-8 16c4 4 6 10 4 16l10 16-6 4-12-14c-10 4-26 4-36 0l-12 14-6-4 10-16c-6-4-10-10-8-14z', INK, 0)
        + Lc('M-32-8c-4-8-2-16 2-22M-34-20l-6-4', INK, 4) + E(-36, -10, 9, 6, INK, 0) + P('M-30-16l4-8 4 6z', INK, 0))
      + Lc('M100 222l6-12 4 12M130 222l6-12 4 12', '#7CB342', 4)),
  L('senbei', 'ชิกะเซมเบ้ ข้าวเกรียบให้กวาง', 'Shika senbei, the crackers for the deer', ['shika senbei', 'ชิกะเซมเบ้', 'deer crackers', 'ข้าวเกรียบกวาง', 'feeding the deer', 'ให้อาหารกวาง', 'paper band', 'แถบกระดาษ', 'nara park', 'สวนนารา'], 'หาแถบกระดาษที่มัดข้าวเกรียบไว้', 'Find the paper band tied round the crackers',
    // a tall stack of round flat brown crackers tied with a white paper band, one cracker standing in front with a smiling face, a deer's nose sniffing in from the side
    [0, 1, 2, 3, 4, 5, 6].map((i) => E(96, 190 - i * 14, 52, 14, i % 2 ? '#E6C07B' : '#DDB36A')).join('') + R(84, 96, 24, 104, '#FFFFFF', 0, 3.5) + Lc('M90 116h12M90 132h12M90 148h12', '#E53935', 3)
      + C(166, 160, 40, '#E6C07B') + C(166, 160, 32, 'none', 3) + [[152, 144], [180, 146], [148, 176], [184, 176], [166, 132]].map(([x, y]) => C(x, y, 2.5, '#C9984B', 0)).join('') + face(166, 158, 0.6)
      + P('M226 66c-22-6-40 0-46 14 4 10 16 12 28 8 6 4 12 6 18 4z', DEER) + P('M226 56l-8-12 10 2z', DEER) + C(184, 78, 4, INK, 0) + C(200, 70, 3, INK, 0)),
  L('kojika', 'ลูกกวางลายจุดแห่งนารา', 'A spotted fawn of Nara', ['fawn', 'ลูกกวาง', 'kojika', 'โคจิกะ', 'baby deer', 'กวางน้อย', 'white spots', 'ลายจุดขาว', 'early summer', 'ต้นฤดูร้อน', 'nara deer', 'กวางนารา'], 'หาจุดขาวบนหลังลูกกวาง', 'Find the white spots on the fawn’s back',
    // a little fawn with big ears and white spots curled up on the grass with its legs folded under it, clover and tiny flowers round it
    bg('#F1F8E9') + low(168, '#AED581') + frame
      + E(132, 166, 52, 26, DEER) + E(100, 184, 18, 7, LEG) + E(160, 186, 18, 7, LEG) + E(180, 154, 6, 6, '#FFFFFF')
      + [[118, 152], [134, 146], [150, 150], [126, 166], [146, 166], [162, 160]].map(([x, y]) => C(x, y, 4, SPOT, 0)).join('')
      + P('M96 150c-6-18-6-34 0-46l18 2c-4 14-2 28 6 40z', DEER) + E(90, 96, 24, 18, DEER) + P('M74 86c-18-12-30-10-34-2 10 8 24 10 34 8z', DEER) + P('M104 82c10-18 22-22 30-16-6 10-18 18-30 20z', DEER)
      + E(70, 104, 10, 7, SPOT) + C(66, 102, 3, INK, 0) + face(92, 94, 0.44, 'none') + Lc('M86 106q6 4 12 0', INK, 3)
      + [[40, 194, '#FFFFFF'], [200, 204, '#F8BBD0'], [60, 210, '#FFF59D'], [190, 120, '#FFFFFF']].map(([x, y, c]) => C(x, y, 5, c, 2.5)).join('')),
  L('yomogimochi', 'โมจิโยโมกิโรยคินาโกะ', 'Yomogi mochi rolled in kinako', ['yomogi mochi', 'โมจิโยโมกิ', 'mugwort mochi', 'โมจิใบหญ้า', 'kinako', 'คินาโกะ', 'soybean flour', 'แป้งถั่วเหลือง', 'mochi pounding', 'ตำโมจิ', 'wooden mallet', 'ค้อนไม้', 'nakatanidou', 'นาคาทานิโด'], 'หาค้อนไม้ที่ใช้ตำโมจิ', 'Find the wooden mallet used to pound the mochi',
    // three round green mugwort mochi dusted with yellow soybean flour on a wooden board, the big wooden mochi mallet leaning behind them
    ol('M168 30l-30 110', '#A1887F', 8) + P('M150 20l44 12-8 24-44-12z', '#8D6E63') + R(24, 168, 192, 20, '#C9984B', 6)
      + [[70, 150], [120, 144], [170, 152]].map(([x, y]) => E(x, y, 30, 22, '#7CB342') + P(`M${x - 24} ${y - 8}c10-10 38-12 48 0`, 'none', 0) + [[-12, -10], [0, -14], [12, -10], [-6, -4], [8, -2], [-18, 0], [18, 2]].map(([a, b]) => C(x + a, y + b, 2.4, '#FFD54F', 0)).join('')).join('')
      + face(120, 146, 0.4)),
  L('kakinoha', 'ซูชิห่อใบพลับ คากิโนฮะซูชิ', 'Kakinoha-zushi, sushi wrapped in persimmon leaves', ['kakinoha-zushi', 'คากิโนฮะซูชิ', 'kakinoha sushi', 'ซูชิใบพลับ', 'persimmon leaf', 'ใบพลับ', 'pressed sushi', 'ซูชิอัด', 'salmon', 'แซลมอน', 'mackerel', 'ปลาซาบะ', 'wooden box', 'กล่องไม้'], 'หาซูชิชิ้นที่เปิดใบออกแล้ว', 'Find the one sushi with its leaf opened',
    // a pale wooden box packed with neat green leaf parcels with their veins, one parcel in front unwrapped on its leaf to show white rice topped with pink salmon
    P('M30 102h180l-14 70H44z', '#F3E0BE') + R(30, 92, 180, 12, '#E6C9A0', 3)
      + [0, 1, 2, 3].map((c) => [0, 1].map((r) => { const x = 50 + c * 38, y = 108 + r * 28; return R(x, y, 32, 24, r ? '#689F38' : '#7CB342', 6) + Lc(`M${x + 4} ${y + 12}h24M${x + 10} ${y + 12}l-4-6M${x + 20} ${y + 12}l-4-6M${x + 10} ${y + 12}l-4 6M${x + 20} ${y + 12}l-4 6`, '#AED581', 2); }).join('')).join('')
      + P('M70 196c20-24 80-24 100 0-20 18-80 18-100 0z', '#8BC34A') + Lc('M78 196h84', '#C5E1A5', 2.5) + R(96, 176, 48, 22, '#FFFFFF', 4) + R(96, 172, 48, 10, '#FF8A65', 4) + face(120, 188, 0.3)),
  L('kuzumochi', 'คุซุโมจิใสราดน้ำเชื่อมดำ', 'Kuzu mochi with black syrup', ['kuzu mochi', 'คุซุโมจิ', 'kuzu', 'คุซุ', 'yoshino kuzu', 'คุซุโยชิโนะ', 'clear jelly', 'เยลลี่ใส', 'black syrup', 'น้ำเชื่อมดำ', 'kuromitsu', 'คุโรมิตสึ', 'kinako', 'คินาโกะ'], 'หาน้ำเชื่อมสีดำที่ไหลบนขนม', 'Find the dark syrup running over the sweets',
    // a pale blue glass dish of wobbly see-through squares that shine, dark black syrup trickling over them from a little jug, yellow soybean flour sprinkled on top
    E(120, 178, 92, 22, '#B3E5FC') + E(120, 172, 80, 16, '#E1F5FE', 0)
      + [[76, 146], [116, 140], [156, 148], [96, 164], [138, 164]].map(([x, y]) => R(x - 18, y - 16, 36, 30, '#ECEFF1', 8) + Lc(`M${x - 10} ${y - 8}l6-4`, '#FFFFFF', 3)).join('')
      + Lc('M158 92c-2 12-8 22-18 34-6 6-14 10-24 12', '#4E342E', 4) + g(178, 78, 1, P('M-20-4c0-14 10-20 22-20s22 6 22 20-10 22-22 22-22-8-22-22z', '#6D4C41') + P('M-20-6l-12 6 12 6z', '#6D4C41') + E(2, -18, 14, 4, '#4E342E', 0), -20)
      + [[70, 132], [86, 138], [126, 128], [140, 152], [100, 156]].map(([x, y]) => C(x, y, 2.4, '#FFD54F', 0)).join('') + face(116, 142, 0.36)),
  L('miwasomen', 'เส้นโซเมนมิวะตากแดด', 'Miwa sōmen noodles drying in the sun', ['miwa somen', 'โซเมนมิวะ', 'somen', 'โซเมน', 'thin noodles', 'เส้นบาง', 'drying noodles', 'ตากเส้น', 'noodle curtain', 'ม่านเส้น', 'sakurai', 'ซากุไร'], 'หาไม้ไผ่ที่แขวนเส้นบะหมี่ไว้', 'Find the bamboo poles hanging the noodles',
    // long white thin noodles hanging like a curtain from bamboo poles on a wooden frame in the sun, and in front a little bowl of cold noodles with ice and a dipping cup
    bg('#B3E5FC') + C(190, 50, 14, '#FFE082', 0) + low(176, '#D7CCC8') + frame + R(30, 50, 8, 130, '#8D6E63', 0, 3.5) + R(202, 50, 8, 130, '#8D6E63', 0, 3.5)
      + ol('M30 58h180', '#C5E1A5', 5) + Lc(Array.from({ length: 26 }, (_, i) => `M${44 + i * 6} 62v${72 + (i % 3) * 6}`).join(''), '#FFFFFF', 2.5) + ol('M40 146h160', '#C5E1A5', 4)
      + P('M70 182h80c0 20-18 32-40 32s-40-12-40-32z', '#5C6BC0') + E(110, 182, 40, 8, '#E8EAF6') + Lc('M84 180c8-4 16 4 24 0s16-4 24 0', '#FFFFFF', 3) + R(116, 174, 10, 8, '#E1F5FE', 2, 2)
      + R(160, 180, 26, 26, '#FFFFFF', 4) + R(162, 184, 22, 6, '#6D4C41', 0, 0) + face(110, 196, 0.3, 'none')),
  L('kakigori', 'น้ำแข็งไสคากิโงริปุยฟู', 'A fluffy kakigori, Nara’s shaved ice', ['kakigori', 'คากิโงริ', 'japanese shaved ice', 'น้ำแข็งไสญี่ปุ่น', 'himuro', 'ฮิมูโระ', 'strawberry syrup', 'น้ำเชื่อมสตรอว์เบอร์รี', 'matcha', 'มัทฉะ', 'summer', 'หน้าร้อน'], 'หาธงคลื่นสีฟ้าข้างถ้วย', 'Find the little flag with blue waves by the bowl',
    // a tall fluffy snowy mountain of shaved ice in a glass bowl, pink strawberry syrup on one side and green matcha on the other, a spoon stuck in it and a little flag with blue waves
    R(168, 60, 4, 120, '#8D6E63', 0, 3) + R(172, 62, 38, 44, '#FFFFFF', 0, 3) + Lc('M176 92c6-6 10 6 16 0s10 6 16 0M176 100c6-6 10 6 16 0s10 6 16 0', '#1E88E5', 2.5) + R(172, 62, 38, 8, '#E53935', 0, 3)
      + P('M66 176h108l-12 22H78z', '#E1F5FE') + E(120, 176, 56, 10, '#B3E5FC') + R(106, 198, 28, 10, '#E1F5FE', 2)
      + P('M70 172c-6-30 10-48 24-56 4-24 20-36 32-36 16 0 30 14 30 32 14 8 22 30 14 60z', '#FFFFFF') + P('M72 168c-4-24 6-40 20-48 8 10 18 26 22 48z', '#F48FB1', 0)
      + P('M168 168c4-20-2-38-12-46-8 12-14 28-14 46z', '#AED581', 0) + Lc('M136 96l26-40', '#BDBDBD', 5) + face(120, 140, 0.44)),
  L('tokae', 'นาราโทคาเอะ เทศกาลเทียนในสวนนารา', 'Nara Tōkae, the candle festival in the park', ['nara tokae', 'นาราโทคาเอะ', 'tokae', 'โทคาเอะ', 'candle festival', 'เทศกาลเทียน', 'candle cups', 'ถ้วยเทียน', 'summer night', 'คืนหน้าร้อน', 'lights', 'แสงไฟ'], 'หาถ้วยเทียนใบใหญ่ที่ยิ้มอยู่ข้างหน้า', 'Find the big smiling candle cup at the front',
    // a dark blue summer night over the park, hundreds of little glowing candle cups laid in a winding river of light on the grass, a pagoda in black on the sky, one big candle cup smiling at the front
    bg('#283593') + C(196, 48, 10, '#FFF9C4', 0) + [[40, 40], [80, 56], [150, 36], [120, 64]].map(([x, y]) => C(x, y, 2, '#FFFFFF', 0)).join('') + low(132, '#1B5E20') + frame
      + R(56, 86, 6, 46, '#1A237E', 0) + [0, 1, 2, 3].map((i) => P(`M${46 + i * 2} ${126 - i * 12}q13-6 26 0l-3 4h-20z`, '#1A237E', 0)).join('') + Lc('M59 82v-10', '#1A237E', 3)
      + [[30, 150], [60, 146], [94, 150], [126, 156], [156, 150], [190, 146], [210, 158], [40, 172], [76, 170], [180, 174], [150, 180], [204, 190], [30, 196], [60, 200]].map(([x, y]) => C(x, y, 7, '#FFE082', 0) + R(x - 4, y - 2, 8, 8, '#E1F5FE', 2, 2) + C(x, y - 4, 2, '#FF7043', 0)).join('')
      + C(120, 186, 30, '#FFF59D', 0) + R(98, 170, 44, 40, '#E1F5FE', 8) + P('M120 148c-8 10-8 18 0 22 8-4 8-12 0-22z', '#FF7043', 3) + face(120, 194, 0.4)),
  L('yamayaki', 'งานเผาหญ้ากับดอกไม้ไฟบนเขาวาคาคุสะ', 'Wakakusa Yamayaki, the hill fire and fireworks', ['wakakusa yamayaki', 'วาคาคุสะยามายากิ', 'yamayaki', 'ยามายากิ', 'grass burning', 'เผาหญ้า', 'fireworks', 'ดอกไม้ไฟ', 'winter night', 'คืนฤดูหนาว', 'mount wakakusa', 'เขาวาคาคุสะ'], 'หาดอกไม้ไฟสีชมพูเหนือเขา', 'Find the pink firework above the hill',
    // a winter night: the round grassy hill glowing with lines of orange flame crawling up it, bright fireworks bursting pink, yellow and blue in the dark sky above
    bg('#1A237E') + frame
      + [[70, 64, '#F48FB1'], [130, 46, '#FFF176'], [186, 70, '#4FC3F7']].map(([x, y, c]) => [0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const r = a * Math.PI / 180; return Lc(`M${(x + 8 * Math.cos(r)).toFixed(1)} ${(y + 8 * Math.sin(r)).toFixed(1)}L${(x + 24 * Math.cos(r)).toFixed(1)} ${(y + 24 * Math.sin(r)).toFixed(1)}`, c, 4); }).join('') + C(x, y, 4, c, 0)).join('')
      + P('M16 194c14-38 40-60 64-60 10-20 30-28 46-18 14-8 34 0 48 20 22 6 40 26 50 58a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#33691E')
      + Lc('M40 186l10-8 10 6 10-10 10 6M86 156l10-8 10 6 10-10 10 6 10-8M140 170l10-8 10 6 10-10 10 6', '#FF7043', 5) + Lc('M40 186l10-8 10 6 10-10 10 6M86 156l10-8 10 6 10-10 10 6 10-8M140 170l10-8 10 6 10-10 10 6', '#FFD54F', 2)
      + face(120, 196, 0.44)),
];

export default {
  places: {
    'jp-nara': { country: 'jp', wave: 3, name: nm('นารา', 'Nara'), tz: 'Asia/Tokyo', ll: [34.68, 135.83], alias: ['nara', 'เมืองนารา', '奈良', 'nara park', 'สวนนารา', 'naramachi', 'นารามาจิ', 'todaiji', 'todai-ji', 'โทไดจิ', 'kofukuji', 'kofuku-ji', 'โคฟุกุจิ', 'kasuga taisha', 'คาสุงะไทฉะ', 'mount wakakusa', 'wakakusayama', 'heijo palace', 'heijo-kyo', 'horyuji', 'horyu-ji', 'โฮริวจิ', 'ikaruga', 'yakushiji', 'ยาคุชิจิ'], colors: NR },
  },
  items,
};
