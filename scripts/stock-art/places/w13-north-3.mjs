// Wave 13, Thailand (north): Lampang, Chae Hom, Mae Moh and Khun Tan — the city stamp, two day scenes and the town's own
// horse carriages, rooster bowls, Lanna temples (as buildings only), teak houses, railway and food; no figures, no people
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const LP = { k1: '#B23A3A', k2: '#2F7A4F', k3: '#FFF4E8' };
const CITY = 'th-lampang', DIR = 'th/lampang';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// the Lampang rooster: a red body, a black-and-green sickle tail, a red comb and yellow legs (x, y = body centre, s = size)
const rooster = (x, y, s, sw) => P(`M${x - 10 * s} ${y - 6 * s}c${-26 * s}-${20 * s}-${34 * s} ${2 * s}-${26 * s} ${22 * s}c${-8 * s}-${30 * s} ${14 * s}-${30 * s} ${18 * s}-${16 * s}z`, '#263238', sw)
  + P(`M${x - 12 * s} ${y - 4 * s}c${-20 * s}-${8 * s}-${22 * s} ${10 * s}-${16 * s} ${18 * s}`, '#2E7D32', sw)
  + E(x, y, 16 * s, 12 * s, '#E53935', sw) + C(x + 14 * s, y - 14 * s, 7 * s, '#E53935', sw) + P(`M${x + 10 * s} ${y - 20 * s}l${3 * s}-${6 * s} ${3 * s} ${4 * s} ${3 * s}-${5 * s} ${2 * s} ${7 * s}z`, '#C62828', sw)
  + P(`M${x + 20 * s} ${y - 14 * s}l${7 * s} ${2 * s}-${7 * s} ${3 * s}z`, '#FFCA28', sw) + C(x + 16 * s, y - 15 * s, 1.6 * s, INK, 0)
  + Lc(`M${x - 4 * s} ${y + 11 * s}v${10 * s}M${x + 5 * s} ${y + 11 * s}v${10 * s}`, '#FFB300', 2.5);
// a white arch bridge with four bowed arches over its deck (x0..x1 span, d = deck level)
const ratsada = (x0, x1, d, sw) => {
  const w = (x1 - x0) / 4;
  return R(x0, d, x1 - x0, 8, '#FFFFFF', 0, sw) + Array.from({ length: 4 }, (_, k) => P(`M${x0 + k * w + 3} ${d}c${w * 0.2}-${w * 0.55} ${w * 0.8}-${w * 0.55} ${w - 6} 0`, 'none', sw) + Lc(`M${x0 + k * w + w / 2} ${d - w * 0.4}v${w * 0.4}`, '#B0BEC5', 2)).join('')
    + [0, 1, 2, 3, 4].map((k) => R(x0 + k * w - 3, d - 6, 6, 26, '#ECEFF1', 0, sw)).join('');
};
const house = (x, b, w, h, body, roof, sw) => R(x - w / 2, b - h, w, h, body, 0, sw) + P(`M${x - w / 2 - 6} ${b - h}l${w / 2 + 6}-${h * 0.5} ${w / 2 + 6} ${h * 0.5}z`, roof, sw);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับลำปาง', 'Lampang stamp'), kw: ['lampang', 'ลำปาง', 'rooster bowl', 'ชามตราไก่', 'horse carriage', 'รถม้า', 'wang river', 'แม่น้ำวัง'],
    // a white bowl with the red Lampang rooster painted on it
    svg: cityStamp('lpg-st', { name: 'LAMPANG', sub: 'CITY OF CARRIAGES · THAILAND', ...LP, emblem: P('M56 100h88c0 26-18 40-44 40s-44-14-44-40z', '#FFFFFF', 3) + Lc('M60 108h80', '#1E88E5', 3) + rooster(98, 120, 0.72, 2) + E(100, 100, 44, 8, '#FFFFFF', 3) }) },

  D('wangriver', 'เมืองลำปางริมแม่น้ำวัง', 'Lampang town on the Wang River', ['lampang town', 'เมืองลำปาง', 'wang river', 'แม่น้ำวัง', 'ratsadaphisek bridge', 'สะพานรัษฎาภิเศก', 'old town', 'ย่านเมืองเก่า', 'horse carriage ride', 'นั่งรถม้า'],
    // the white arched Ratsadaphisek bridge over the slow green Wang River, old wooden shophouses on the far bank, a tiny horse carriage crossing, palms and a blue sky
    scene('lpg-d1', '#E1F5FE', P('M-4 100c40-14 90-10 130-6s80-8 118-2v30H-4z', '#C5E1A5', 0)
      + [[22, 120], [52, 116], [82, 120], [178, 118], [210, 122]].map(([x, b]) => house(x, b, 26, 26, x % 2 ? '#D7A86E' : '#BCAAA4', '#8D6E63')).join('')
      + R(-4, 118, 248, 10, '#A5D6A7') + P('M-4 128h248v120H-4z', '#80CBC4') + ratsada(30, 210, 132)
      + g(118, 128, 0.5, R(-14, -18, 30, 14, '#43A047', 3) + P('M-18 -18c4-10 34-10 38 0z', '#E53935') + C(-6, -2, 6, '#FFFFFF', 3) + C(12, -2, 6, '#FFFFFF', 3) + E(32, -12, 12, 8, '#FFFFFF') + C(42, -22, 6, '#FFFFFF'))
      + Lc('M40 176h50M130 190h60M60 206h50', '#E0F2F1', 3) + face(120, 168, 0.32))),

  D('maemoh', 'เหมืองแม่เมาะกับทุ่งดอกไม้สีเหลือง', 'The giant terraced pit of Mae Moh and its yellow flowers', ['mae moh', 'แม่เมาะ', 'mae moh mine', 'เหมืองแม่เมาะ', 'terraced pit', 'ขั้นบันไดเหมือง', 'yellow flower field', 'ทุ่งดอกไม้สีเหลือง', 'viewpoint', 'จุดชมวิว'],
    // a huge open pit cut into giant orange-and-grey steps, tiny yellow trucks on its ledges, a field of yellow flowers along the rim in front, white cooling towers far away under a blue sky
    scene('lpg-d2', '#BBDEFB', [[60, 1], [86, 0.8]].map(([x, s]) => P(`M${x - 12 * s} 92l${4 * s}-${34 * s}h${16 * s}l${4 * s} ${34 * s}z`, '#ECEFF1') + E(x, 52, 8, 5, '#FFFFFF', 0)).join('')
      + P('M-4 92h248v20H-4z', '#A5D6A7') + P('M-4 112h248v100H-4z', '#B0816A') + P('M14 120h212l-14 18H28z', '#C9A07F') + P('M28 138h184l-14 18H42z', '#9E7660') + P('M42 156h156l-14 18H56z', '#C9A07F') + P('M56 174h128l-14 18H70z', '#8D6E63')
      + [[60, 132], [150, 150], [100, 168]].map(([x, y]) => R(x - 8, y - 8, 16, 8, '#FFCA28', 2, 2.5) + C(x - 4, y + 1, 2.5, INK, 0) + C(x + 5, y + 1, 2.5, INK, 0)).join('')
      + P('M-4 196h248v50H-4z', '#9CCC65') + Array.from({ length: 14 }, (_, k) => C(8 + k * 17, 200 + (k % 3) * 8, 6, '#FFD54F', 2)).join('') + face(120, 140, 0.32))),

  L('carriage', 'รถม้าลำปางประดับดอกไม้', 'A Lampang horse carriage dressed in flowers', ['lampang horse carriage', 'รถม้าลำปาง', 'carriage ride', 'นั่งรถม้าชมเมือง', 'city of carriages', 'เมืองรถม้า', 'flower garland', 'พวงดอกไม้', 'old town tour', 'เที่ยวเมืองเก่า'], nm('หาพวงดอกไม้บนหัวม้า', 'Find the flowers on the horse\'s head'),
    // a green four-wheeled carriage with a red fringed canopy and big wooden spoked wheels, pulled by a chubby white horse with a flower crown, garlands hanging at the sides
    R(24, 104, 104, 44, '#2E7D32', 8) + R(30, 110, 92, 20, '#43A047', 4, 2.5) + P('M16 104c6-34 114-34 120 0z', '#E53935') + Lc('M22 104c10 8 18 8 26 0s18 8 26 0 18 8 26 0 18 8 30 0', '#FFCA28', 3)
    + Lc('M28 104v-14M124 104v-14', '#6D4C41', 3) + [[44, 160, 26], [112, 168, 20]].map(([x, y, r]) => C(x, y, r, '#FFF3E0') + C(x, y, r * 0.3, '#8D6E63') + [0, 45, 90, 135].map((a) => g(x, y, 1, Lc(`M0 -${r}v${2 * r}`, '#8D6E63', 3), a)).join('')).join('')
    + Lc('M128 140l30-4', '#6D4C41', 5) + [160, 174, 192, 204].map((x) => R(x - 4, 140, 9, 42, '#FFFFFF', 3) + R(x - 4, 176, 9, 6, '#6D4C41', 1, 2)).join('') + E(182, 134, 32, 20, '#FFFFFF') + P('M152 130c-12 4-16 16-12 26', 'none', 4)
    + P('M196 126c2-12 4-24 10-34l14 6c-4 10-8 20-10 30z', '#FFFFFF') + g(218, 96, 1, E(0, 0, 18, 11, '#FFFFFF'), 35) + P('M206 86l0-14 8 10z', '#FFFFFF') + Lc('M200 124c0-14 2-26 6-36', '#A1887F', 5)
    + C(226, 106, 2, INK, 0) + [[202, 74], [212, 72], [194, 80]].map(([x, y]) => C(x, y, 5, '#FF80AB', 2)).join('') + C(214, 92, 2.5, INK, 0) + Lc('M30 150c20 10 70 10 90 0', '#FF80AB', 3) + C(220, 84, 2.5, INK, 0) + face(76, 128, 0.32)),

  L('roosterbowl', 'ชามตราไก่ลำปาง', 'The Lampang rooster bowl', ['rooster bowl', 'ชามตราไก่', 'chicken bowl', 'ชามไก่', 'lampang ceramics', 'เซรามิกลำปาง', 'hand painted', 'วาดลายด้วยมือ', 'banana tree pattern', 'ลายต้นกล้วย'], nm('หาต้นกล้วยข้างไก่', 'Find the banana plant next to the rooster'),
    // a big round white bowl with a blue rim, painted with a proud red rooster with a black-and-green tail, a little banana plant and a pink peony beside it
    P('M24 92h192c0 66-42 104-96 104S24 158 24 92z', '#FFFFFF') + E(120, 92, 96, 18, '#ECEFF1') + Lc('M30 104c40 10 140 10 180 0', '#1E88E5', 4) + R(92, 192, 56, 12, '#FFFFFF', 4)
    + rooster(98, 148, 1.4) + Lc('M168 176v-40', '#43A047', 4) + P('M168 140c-14-10-20-26-14-34 8 6 14 20 14 34zM168 146c12-12 24-14 30-8-8 8-18 10-30 8z', '#66BB6A', 2.5)
    + C(58, 156, 9, '#F48FB1', 2.5) + C(58, 156, 4, '#EC407A', 0) + P('M48 164c-6 4-8 10-6 14 6-2 8-8 6-14z', '#66BB6A', 2) + face(120, 178, 0.3)),

  L('lampangluang', 'วิหารเปิดโล่งและเจดีย์ทองวัดพระธาตุลำปางหลวง', 'Wat Phra That Lampang Luang\'s open hall and golden chedi', ['wat phra that lampang luang', 'วัดพระธาตุลำปางหลวง', 'lanna temple', 'วัดศิลปะล้านนา', 'open-sided hall', 'วิหารโถง', 'golden chedi', 'เจดีย์ทองจังโก', 'brick walls', 'กำแพงอิฐ'], nm('หาเสาแดงที่ตั้งเรียงอยู่ในวิหาร', 'Find the red posts standing inside the open hall'),
    // a tall bell-shaped chedi covered in shining gold-copper plates behind, in front a Lanna hall with no walls — low sweeping tiered roofs on rows of red-and-gold posts — on a white base with naga steps (building only)
    R(102, 40, 36, 14, '#FFCA28') + P('M84 100c0-30 16-46 36-50 20 4 36 20 36 50z', '#FFB300') + Lc('M118 40l2-28 2 28', '#FFB300', 4) + R(76, 100, 88, 16, '#FFCA28')
    + Lc('M90 64c10-8 50-8 60 0M86 82c14-6 54-6 68 0', '#F57F17', 2.5)
    + R(30, 178, 180, 16, '#FFFFFF') + [46, 74, 102, 138, 166, 194].map((x) => R(x - 5, 144, 10, 34, '#C62828', 0, 3) + R(x - 5, 144, 10, 6, '#FFCA28', 0, 2)).join('')
    + P('M14 150l30-30h152l30 30z', '#8D6E63') + P('M44 120l26-24h100l26 24z', '#A1887F') + Lc('M14 150l-6-10M226 150l6-10M44 120l-6-10M196 120l6-10', '#FFCA28', 4)
    + P('M100 96l20-20 20 20z', '#8D6E63') + R(96, 194, 48, 10, '#E0E0E0') + Lc('M94 194l-14 18M146 194l14 18', '#43A047', 6) + face(120, 132, 0.34)),

  L('ratsada', 'สะพานรัษฎาภิเศกข้ามแม่น้ำวัง', 'The white Ratsadaphisek Bridge over the Wang', ['ratsadaphisek bridge', 'สะพานรัษฎาภิเศก', 'white arch bridge', 'สะพานโค้งสีขาว', 'wang river', 'แม่น้ำวัง', 'old bridge', 'สะพานเก่า', 'lampang landmark', 'สัญลักษณ์ลำปาง'], nm('หาโค้งสีขาวสี่โค้งบนสะพาน', 'Find the four white arches on the bridge'),
    // the old white concrete bridge with four bowed arches rising over its deck and square posts, crossing a green river, little lamps on the posts, a tree on each bank
    R(14, 30, 212, 180, '#E1F5FE', 34) + P('M14 140h212v70H14z', '#80CBC4') + R(14, 128, 28, 20, '#A5D6A7') + R(198, 128, 28, 20, '#A5D6A7') + ratsada(32, 208, 124)
    + [32, 76, 120, 164, 208].map((x) => C(x, 114, 4, '#FFF59D', 2)).join('') + Lc('M48 160h40M140 172h50M70 190h50', '#E0F2F1', 3)
    + C(24, 112, 14, '#43A047') + C(216, 112, 14, '#43A047') + face(120, 152, 0.34)),

  L('kadkongta', 'ห้องแถวไม้เก่าย่านกาดกองต้า', 'The old wooden shophouses of Kad Kong Ta', ['kad kong ta', 'กาดกองต้า', 'old street', 'ถนนคนเดิน', 'wooden shophouses', 'ห้องแถวไม้', 'carved balconies', 'ระเบียงไม้ฉลุ', 'riverside old town', 'ย่านเก่าริมน้ำ'], nm('หาระเบียงไม้ที่ฉลุลายสวยๆ', 'Find the balcony with the lacy carved wood'),
    // three two-storey shophouses side by side: teak upper floors with fretwork balconies and shutters, tiled roofs, folding wooden doors below, a lamp post on the pavement
    [[54, '#D7A86E', '#8D6E63'], [120, '#F3D9B1', '#C62828'], [186, '#BCAAA4', '#6D4C41']].map(([x, body, roof]) => R(x - 32, 70, 64, 130, body)
      + P(`M${x - 38} 72l6-20h52l6 20z`, roof) + R(x - 22, 82, 18, 26, '#4FC3F7', 0, 2.5) + R(x + 4, 82, 18, 26, '#4FC3F7', 0, 2.5)
      + R(x - 32, 116, 64, 8, '#8D6E63') + Array.from({ length: 5 }, (_, k) => P(`M${x - 28 + k * 12} 124l6 8 6-8z`, '#FFF8E1', 2)).join('')
      + [0, 1, 2, 3].map((k) => R(x - 28 + k * 14, 148, 12, 52, '#A1887F', 0, 2.5)).join('')).join('')
    + R(14, 200, 212, 10, '#E0E0E0') + face(120, 98, 0.26)),

  L('khuntan', 'อุโมงค์รถไฟขุนตาน', 'The Khun Tan railway tunnel in the hills', ['khun tan tunnel', 'อุโมงค์ขุนตาน', 'longest rail tunnel', 'อุโมงค์รถไฟที่ยาวที่สุด', 'train', 'รถไฟ', 'doi khun tan', 'ดอยขุนตาน', 'northern line', 'ทางรถไฟสายเหนือ'], nm('หารถไฟที่เพิ่งโผล่ออกมาจากอุโมงค์', 'Find the train just coming out of the tunnel'),
    // a round-arched stone tunnel mouth in a forested green hill, two rails curving out of it, a small blue-and-cream diesel train poking out of the dark with its headlight on
    P('M14 196c10-90 50-150 106-150s96 60 106 150z', '#66BB6A') + [[50, 120], [80, 80], [170, 84], [196, 130]].map(([x, y]) => C(x, y, 14, '#43A047')).join('')
    + P('M66 196v-60c0-36 22-56 54-56s54 20 54 56v60z', '#B0BEC5') + P('M80 196v-56c0-26 16-42 40-42s40 16 40 42v56z', '#263238')
    + R(84, 128, 72, 64, '#1E88E5', 10) + R(84, 160, 72, 14, '#FFF3E0', 0) + R(94, 136, 52, 18, '#E1F5FE', 4, 2.5) + C(120, 182, 5, '#FFF59D', 2)
    + Lc('M80 210l-30 10M160 210l30 10', '#6D4C41', 4) + Lc('M90 200h60M80 210h80', '#8D6E63', 4) + face(120, 140, 0.26)),

  L('khaotaen', 'ข้าวแต๋นน้ำแตงโมราดน้ำตาล', 'Khao taen, crispy rice crackers drizzled with caramel', ['khao taen', 'ข้าวแต๋น', 'rice cracker', 'ขนมนางเล็ด', 'watermelon juice', 'น้ำแตงโม', 'caramel drizzle', 'ราดน้ำอ้อย', 'lampang snack', 'ของฝากลำปาง'], nm('หาเส้นน้ำตาลซิกแซกบนแผ่นข้าว', 'Find the zigzag lines of caramel on the crackers'),
    // a stack of round puffed-rice crackers on a plate, each drizzled with brown caramel zigzags, a watermelon slice beside them
    E(110, 182, 92, 20, '#FFFFFF') + [[84, 164], [130, 168], [104, 140], [112, 116]].map(([x, y]) => E(x, y, 38, 14, '#FFF3E0') + Array.from({ length: 5 }, (_, k) => C(x - 24 + k * 12, y - 2 + (k % 2) * 4, 2, '#E8D5B5', 0)).join('')
      + Lc(`M${x - 28} ${y - 4}l10 6 10-8 10 8 10-8 10 6`, '#8D5524', 3)).join('')
    + P('M176 196c0-30 24-48 46-48v48z', '#E53935') + P('M176 196c0-30 24-48 46-48', 'none') + Lc('M180 196c2-24 20-40 40-42', '#66BB6A', 5) + [[196, 180], [206, 168]].map(([x, y]) => E(x, y, 2, 3, INK, 0)).join('')
    + face(112, 112, 0.32)),

  L('pongsanuk', 'มณฑปไม้วัดปงสนุก', 'The wooden Lanna pavilion of Wat Pong Sanuk', ['wat pong sanuk', 'วัดปงสนุก', 'wooden pavilion', 'วิหารพระเจ้าพันองค์', 'lanna woodwork', 'งานไม้ล้านนา', 'tiered roof', 'หลังคาซ้อนชั้น', 'unesco award', 'รางวัลอนุรักษ์'], nm('หาหลังคาที่ยื่นออกมาสี่ด้น', 'Find the roofs reaching out on all four sides'),
    // a square open wooden pavilion on a little mound: a cross of stacked dark-teak roofs reaching out on all four sides with a tall golden spire on top, red posts and white steps below (building only)
    P('M24 214c20-30 60-40 96-40s76 10 96 40z', '#9CCC65') + R(56, 168, 128, 14, '#FFFFFF') + [70, 98, 142, 170].map((x) => R(x - 4, 134, 8, 34, '#C62828', 0, 3)).join('')
    + P('M30 138l30-24h120l30 24z', '#6D4C41') + P('M58 112l22-20h80l22 20z', '#795548') + P('M80 90l16-16h48l16 16z', '#6D4C41') + P('M98 72l22-22 22 22z', '#8D6E63')
    + Lc('M30 138l-8-8M210 138l8-8M58 112l-8-8M182 112l8-8M80 90l-6-8M160 90l6-8', '#FFCA28', 4) + P('M116 50l4-36 4 36z', '#FFCA28') + Lc('M112 34h16M114 26h12', '#FFB300', 2.5)
    + R(100, 182, 40, 8, '#E0E0E0') + R(94, 190, 52, 8, '#EEEEEE') + face(120, 152, 0.3)),

  L('chaloemprakiat', 'เจดีย์ขาวบนยอดผาวัดเฉลิมพระเกียรติ', 'The white chedis on the rock needles of Chae Hom', ['wat chaloem phra kiat', 'วัดเฉลิมพระเกียรติพระจอมเกล้าราชานุสรณ์', 'chedis on cliffs', 'เจดีย์บนยอดผา', 'chae hom', 'แจ้ห่ม', 'limestone peaks', 'ยอดเขาหินปูน', 'sky temple', 'วัดลอยฟ้า'], nm('หาสะพานเล็กๆ ที่เชื่อมระหว่างยอดผา', 'Find the little bridge between the rock peaks'),
    // three steep grey limestone needles rising out of green forest, each topped by a small white chedi with a golden tip, a thin red railing bridge between two of them, a soft pink sky
    R(14, 26, 212, 190, '#FCE4EC', 34) + [[60, 76, 34], [130, 50, 40], [192, 90, 30]].map(([x, top, w]) => P(`M${x - w} 216l${w * 0.4}-${150 - (top - 50)}c4-8 ${w * 1.2 - 8}-8 ${w * 1.2} 0l${w * 0.4} ${150 - (top - 50)}z`, '#90A4AE')
      + R(x - 10, top - 6, 20, 8, '#FFFFFF', 0, 3) + P(`M${x - 8} ${top - 6}c0-14 4-20 8-22 4 2 8 8 8 22z`, '#FFFFFF', 3) + Lc(`M${x} ${top - 28}v-10`, '#FFCA28', 3)).join('')
    + Lc('M76 84l40-24', '#E53935', 4) + Lc('M76 92l40-24', '#E53935', 2.5) + P('M14 186c40-14 80-6 106-12s70-8 106 4v38H14z', '#43A047') + face(130, 110, 0.32)),

  L('maemoh', 'รถบรรทุกยักษ์เหมืองแม่เมาะ', 'The giant dump truck of the Mae Moh mine', ['mae moh mine', 'เหมืองแม่เมาะ', 'giant dump truck', 'รถบรรทุกยักษ์', 'mining museum', 'พิพิธภัณฑ์เหมือง', 'big wheels', 'ล้อยักษ์', 'lignite', 'ลิกไนต์'], nm('หาบันไดเล็กๆ ที่ใช้ปีนขึ้นรถ', 'Find the little ladder to climb up to the cab'),
    // a huge yellow mining dump truck seen from the side, its tipping bed full of dark lignite, a tiny cab up top, a ladder, and enormous black wheels taller than a door
    P('M24 70h148l28 30v40H24z', '#FFCA28') + P('M30 70c20-20 120-24 136 0z', '#424242') + R(170, 70, 40, 34, '#FFCA28') + R(178, 76, 26, 16, '#B3E5FC', 3, 2.5)
    + R(20, 140, 196, 18, '#F9A825') + Lc('M196 104v36M186 112h10M186 124h10', '#424242', 3)
    + [60, 172].map((x) => C(x, 172, 34, '#263238') + C(x, 172, 16, '#90A4AE') + C(x, 172, 5, '#455A64', 2)).join('') + face(100, 110, 0.46)),

  L('baanlouis', 'บ้านหลุยส์ บ้านไม้เก่าริมแม่น้ำวัง', 'Baan Louis, the old teak house by the Wang River', ['baan louis', 'บ้านหลุยส์', 'colonial teak house', 'บ้านไม้สักโบราณ', 'two-storey house', 'บ้านสองชั้น', 'wang river', 'ริมแม่น้ำวัง', 'old lampang', 'ลำปางสมัยก่อน'], nm('หาระเบียงไม้ชั้นบน', 'Find the wooden balcony upstairs'),
    // a two-storey old house: a white brick ground floor with arched openings, a teak-wood upper floor with a long veranda and railings, a tall red hipped roof, a tree beside it
    R(40, 140, 160, 56, '#FFFFFF') + [64, 104, 144, 176].map((x) => P(`M${x - 10} 196v-30c0-12 20-12 20 0v30z`, '#8D6E63', 3)).join('')
    + R(40, 92, 160, 48, '#B5835A') + Array.from({ length: 6 }, (_, k) => R(52 + k * 25, 100, 14, 22, '#FFE0B2', 0, 2.5)).join('') + R(34, 126, 172, 8, '#8D6E63')
    + Array.from({ length: 12 }, (_, k) => Lc(`M${40 + k * 14} 126v-10`, '#6D4C41', 2.5)).join('') + Lc('M34 116h172', '#6D4C41', 3)
    + P('M28 94l30-44h124l30 44z', '#C62828') + C(212, 160, 18, '#43A047') + Lc('M212 196v-20', '#6D4C41', 5) + face(120, 168, 0.3)),

  L('teak', 'ต้นสักใบใหญ่กับดอกขาวพราว', 'A teak tree with its giant leaves and tiny white flowers', ['teak tree', 'ต้นสัก', 'teak forest', 'ป่าสัก', 'giant leaves', 'ใบใหญ่', 'teak flowers', 'ดอกสัก', 'teak wood', 'ไม้สัก'], nm('หาใบไม้ที่ใหญ่กว่าหน้าของหนู', 'Find a leaf bigger than your face'),
    // a teak tree with a straight grey-brown trunk, enormous round green leaves spreading out, clouds of tiny white flowers on top, a cut log at its foot showing its golden rings
    Lc('M120 214V90', '#8D6E63', 14) + [[70, 110, -30], [170, 104, 30], [92, 74, -15], [150, 70, 15], [120, 120, 0]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 34, 24, '#66BB6A') + Lc('M-30 0h60M0 0l-14-14M0 0l14-14M0 0l-14 14M0 0l14 14', '#388E3C', 2), r)).join('')
    + [[90, 44], [120, 34], [150, 44], [106, 54], [136, 54]].map(([x, y]) => C(x, y, 12, '#FFFFFF') + C(x - 5, y - 2, 2, '#FFE082', 0) + C(x + 4, y + 3, 2, '#FFE082', 0)).join('')
    + E(184, 196, 26, 16, '#D7A86E') + E(184, 196, 16, 10, 'none', 2) + E(184, 196, 6, 4, 'none', 2) + R(158, 196, 52, 16, '#B5835A', 0) + E(184, 196, 26, 16, '#E8C48A') + E(184, 196, 16, 10, 'none', 2) + E(184, 196, 7, 4, 'none', 2)
    + face(120, 118, 0.34)),

  L('saonak', 'บ้านเสานักเรือนไม้สักร้อยเสา', 'Ban Sao Nak, the teak house of many posts', ['ban sao nak', 'บ้านเสานัก', 'house of many pillars', 'บ้านร้อยเสา', 'lanna teak house', 'เรือนไม้สักล้านนา', 'raised on posts', 'ยกใต้ถุนสูง', 'old house museum', 'บ้านพิพิธภัณฑ์'], nm('นับเสาใต้บ้านดูว่ามีกี่ต้น', 'Count the posts under the house'),
    // a long dark-teak Lanna house raised high on a forest of chunky square posts, wide steep roofs with crossed carved boards on the gables, open steps up to a veranda
    P('M10 214c40-10 180-10 220 0z', '#9CCC65') + Array.from({ length: 11 }, (_, k) => R(28 + k * 18, 140, 10, 66, '#8D6E63', 0, 3)).join('') + Array.from({ length: 6 }, (_, k) => R(36 + k * 34, 148, 8, 58, '#6D4C41', 0, 2.5)).join('')
    + R(20, 104, 200, 38, '#795548') + Array.from({ length: 6 }, (_, k) => Lc(`M${40 + k * 32} 108v30`, '#5D4037', 2.5)).join('')
    + P('M12 106l30-46h60l20 46zM118 106l30-46h60l20 46z', '#5D4037') + Lc('M42 60l-10-14M102 60l10-14M148 60l-10-14M208 60l10-14', '#5D4037', 5)
    + Lc('M196 206l20-60M206 190h10M210 176h10M214 162h10', '#8D6E63', 4) + face(120, 124, 0.3)),

  L('station', 'สถานีรถไฟนครลำปาง', 'The old Nakhon Lampang railway station', ['lampang railway station', 'สถานีรถไฟนครลำปาง', 'old station', 'สถานีเก่า', 'colonial building', 'อาคารแบบตะวันตก', 'northern line', 'ทางรถไฟสายเหนือ', 'horse carriages waiting', 'รถม้ารอรับ'], nm('หาหน้าต่างโค้งที่ชั้นบน', 'Find the arched windows upstairs'),
    // a cream two-storey station building with a centre gable, arched windows in a row, a red-tiled roof and a long canopy over the platform, rails in front
    R(30, 96, 180, 96, '#FFF3E0') + P('M24 98l20-26h152l20 26z', '#C62828') + P('M96 72l24-30 24 30z', '#E53935') + C(120, 62, 8, '#FFFFFF', 3)
    + Array.from({ length: 6 }, (_, k) => P(`M${44 + k * 28} 134v-20c0-8 14-8 14 0v20z`, '#4FC3F7', 2.5)).join('') + R(30, 150, 180, 6, '#BCAAA4')
    + P('M14 158h212l-10 14H24z', '#8D6E63') + [40, 90, 150, 200].map((x) => Lc(`M${x} 172v20`, '#6D4C41', 4)).join('') + R(14, 192, 212, 8, '#BDBDBD')
    + Lc('M14 206h212M14 216h212', '#6D4C41', 3) + Array.from({ length: 10 }, (_, k) => Lc(`M${22 + k * 22} 204v14`, '#8D6E63', 3)).join('') + face(120, 118, 0.3)),

  L('sabatchai', 'กลองสะบัดชัยล้านนา', 'The klong sabat chai, Lanna\'s great victory drum', ['klong sabat chai', 'กลองสะบัดชัย', 'lanna drum', 'กลองล้านนา', 'drum show', 'การตีกลอง', 'lampang luang', 'ลำปางหลวง', 'festival parade', 'ขบวนแห่'], nm('หาไม้ตีกลองที่มีพู่สีแดง', 'Find the drumsticks with red tassels'),
    // a big barrel drum lying on a red-and-gold wooden stand, its drumhead facing us, gold studs round the rim, two drumsticks with red tassels crossed above it, small cymbals beside
    R(40, 150, 160, 30, '#C62828', 6) + Lc('M50 180l-10 26M190 180l10 26', '#6D4C41', 6) + Lc('M48 160h144', '#FFCA28', 3)
    + E(120, 110, 64, 58, '#B5835A') + E(120, 110, 50, 46, '#FFF3E0') + E(120, 110, 50, 46, 'none', 4) + Array.from({ length: 16 }, (_, k) => C(120 + 57 * Math.cos(k * 0.3927), 110 + 52 * Math.sin(k * 0.3927), 3, '#FFCA28', 1.5)).join('')
    + Lc('M60 30l50 50M180 30l-50 50', '#8D6E63', 6) + [[56, 26], [184, 26]].map(([x, y]) => P(`M${x} ${y}c-10-6-14 4-8 10 4 4 10 2 8-10z`, '#E53935', 2.5)).join('')
    + [[26, 190], [214, 190]].map(([x, y]) => E(x, y, 16, 6, '#FFCA28') + C(x, y - 4, 4, '#FFB300', 2)).join('') + face(120, 106, 0.42)),

  L('namphriknum', 'น้ำพริกหนุ่มกับแคบหมูและผักนึ่ง', 'Nam phrik num, the green chilli dip with crackling and steamed vegetables', ['nam phrik num', 'น้ำพริกหนุ่ม', 'green chilli dip', 'น้ำพริกพริกหนุ่ม', 'pork crackling', 'แคบหมู', 'steamed vegetables', 'ผักนึ่ง', 'northern food', 'อาหารเหนือ'], nm('หาพริกหนุ่มย่างสีเขียวที่วางอยู่ข้างถ้วย', 'Find the long grilled green chillies beside the bowl'),
    // a round woven bamboo tray: a small clay bowl of pale green chilli dip in the middle, long grilled green chillies with charred spots, a heap of puffy curly pork crackling, steamed pumpkin, long beans and cabbage round it
    E(120, 140, 106, 70, '#E6C27A') + E(120, 140, 94, 60, '#D7B46A', 2.5) + Lc('M30 140c40 14 140 14 180 0M36 124c40 12 128 12 168 0', '#C9A15A', 2)
    + P('M88 132h64c0 24-14 36-32 36s-32-12-32-36z', '#8D6E63') + E(120, 132, 32, 9, '#C5E1A5') + [[110, 130], [126, 134], [132, 128]].map(([x, y]) => C(x, y, 2, '#7CB342', 0)).join('')
    + [[62, 110, 25], [68, 128, 15]].map(([x, y, r]) => g(x, y, 1.3, P('M-24 0c0-8 48-8 54 0 2 6-50 8-54 0z', '#9CCC65') + C(-8, -2, 3, '#5D4037', 0) + C(10, 0, 2.5, '#5D4037', 0) + Lc('M30 -2l8-6', '#689F38', 3), r)).join('')
    + [[168, 102], [186, 116], [160, 120], [178, 132], [194, 100]].map(([x, y]) => P(`M${x - 12} ${y}c-2-10 8-14 12-8 4-8 14-4 12 6 4 6-2 12-8 10-4 6-14 4-12-2-6 0-8-6-4-6z`, '#FFE0B2', 2.5)).join('')
    + R(56, 156, 30, 20, '#FFA726', 6) + Lc('M150 172l40-6M152 180l40-6', '#7CB342', 5) + P('M64 186c4-10 26-12 32 0z', '#C5E1A5') + face(120, 150, 0.32)),

  L('kaengkhae', 'แกงแคผักพื้นบ้านล้านนา', 'Kaeng khae, the northern curry of many green leaves', ['kaeng khae', 'แกงแค', 'northern curry', 'แกงเหนือ', 'jungle vegetables', 'ผักพื้นบ้าน', 'pea aubergines', 'มะเขือพวง', 'lanna food', 'อาหารล้านนา'], nm('หามะเขือพวงลูกกลมๆ สีเขียว', 'Find the little round green pea aubergines'),
    // a dark clay bowl brimming with a green leafy curry: wilted leaves, beans, round pea aubergines, a red chilli, a sprig of herbs sticking up, steam rising
    P('M30 120h180c-4 50-40 76-90 76s-86-26-90-76z', '#6D4C41') + Lc('M34 134h172', '#8D6E63', 3) + E(120, 120, 90, 18, '#9E9D24')
    + [[70, 116, -20], [104, 112, 10], [150, 116, 30], [180, 120, -10]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 16, 7, '#558B2F', 2.5) + Lc('M-12 0h24', '#33691E', 1.5), r)).join('')
    + [[88, 122], [124, 124], [132, 114], [164, 124], [60, 124]].map(([x, y]) => C(x, y, 5, '#8BC34A', 2)).join('') + P('M112 122c4-10 18-14 26-10l-4 4c-6-2-14 0-18 8z', '#E53935', 2.5)
    + Lc('M150 112l10-36M160 80l12-6M156 92l-12-4', '#43A047', 3) + Lc('M84 98c-6-10 6-16 0-26M110 96c-6-10 6-16 0-26', '#CFD8DC', 3) + face(120, 160, 0.42)),
];

export default {
  places: {
    'th-lampang': { country: 'th', wave: 3, home: true, name: nm('ลำปาง แจ้ห่มและแม่เมาะ', 'Lampang, Chae Hom and Mae Moh'), tz: 'Asia/Bangkok', ll: [18.29, 99.49], alias: ['lampang', 'ลำปาง', 'LPT', 'kad kong ta', 'กาดกองต้า', 'mae moh', 'แม่เมาะ', 'chae hom', 'แจ้ห่ม', 'khun tan', 'ขุนตาน', 'lampang luang', 'ลำปางหลวง'], colors: LP },
  },
  items,
};
