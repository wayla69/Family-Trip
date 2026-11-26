// Wave 17: Shirahama and Wakayama (Adventure World, Shirarahama beach, Engetsu island, Sandanbeki, Senjojiki, Wakayama Castle,
// Kishi station's cat stationmaster, Wakayama ramen, Arida mikan, Toretore market, the Kumano Kodo, Nachi Falls, Kishu binchotan,
// Hashigui-iwa, Minabe plum blossom, a seaside foot bath, Kushimoto's sea turtles, the panda train).
// Skipped as repeats or bans: umeboshi (Hakone's), killer whale / dolphin shows (other cities), shrines and temples at Kumano and
// Koyasan (religious subjects), a hot-spring bath itself (Beppu, Matsuyama), a fish market stall like Jagalchi (Toretore is drawn as
// its own tuna show), tuna fishing from a boat, whaling at Taiji.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SH = { k1: '#0288D1', k2: '#EF6C00', k3: '#E1F5FE' };
const CITY = 'jp-shirahama', DIR = 'jp/shirahama';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a round panda (x, y, r): ears, white head, black eye patches, face on top
const panda = (x, y, r) => C(x - r * 0.72, y - r * 0.8, r * 0.3, '#37474F', 3) + C(x + r * 0.72, y - r * 0.8, r * 0.3, '#37474F', 3) + C(x, y, r, '#FFFFFF')
  + E(x - r * 0.42, y - r * 0.08, r * 0.2, r * 0.27, '#37474F', 0) + E(x + r * 0.42, y - r * 0.08, r * 0.2, r * 0.27, '#37474F', 0) + face(x, y + r * 0.1, r / 80);
const bamboo = (x, y0, y1) => Lc(`M${x} ${y0}V${y1}`, '#66BB6A', 6) + [0.3, 0.6, 0.85].map((k) => Lc(`M${x - 4} ${y0 + (y1 - y0) * k}h8`, '#2E7D32', 2.5)).join('');
const cloud = (x, y) => E(x, y, 20, 8, '#FFFFFF', 0) + E(x + 12, y - 6, 12, 7, '#FFFFFF', 0);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับชิราฮามะและวากายามะ', 'Shirahama and Wakayama stamp'), kw: ['shirahama', 'ชิราฮามะ', 'wakayama', 'วากายามะ', 'adventure world', 'แอดเวนเจอร์เวิลด์', 'giant panda', 'แพนด้ายักษ์', 'white sand beach', 'หาดทรายขาว', 'engetsu island', 'เกาะเอ็นเก็ตสึ', 'kishu', 'คิชู'],
    // a smiling panda holding a bamboo stalk on a round white sand beach, a blue sea behind it with a little rock island that has a round hole in it
    svg: cityStamp('sh-st', { name: 'SHIRAHAMA', sub: 'WAKAYAMA · JAPAN', ...SH, emblem: R(50, 100, 100, 40, '#4FC3F7', 0, 0) + P('M54 110c10-16 24-16 32 0z', '#78909C', 2.5) + C(70, 108, 5, '#4FC3F7', 2.5) + P('M44 140c20-10 90-10 112 0v10H44z', '#FFF3C4', 0)
      + panda(100, 112, 26) + Lc('M130 150V96', '#66BB6A', 5) + Lc('M126 114h8M126 130h8', '#2E7D32', 2) }) },

  D('adventureworld', 'แพนด้ายักษ์และรถซาฟารีที่แอดเวนเจอร์เวิลด์', 'The giant pandas and the safari bus at Adventure World', ['adventure world', 'แอดเวนเจอร์เวิลด์', 'shirahama', 'ชิราฮามะ', 'giant panda', 'แพนด้ายักษ์', 'safari bus', 'รถซาฟารี', 'zoo', 'สวนสัตว์', 'animal park', 'wakayama', 'วากายามะ'],
    // a green hill park with a safari bus in the front, a big smiling panda family on the grass chewing bamboo, a giraffe and the sea behind
    scene('sh-d1', '#E1F5FE', P('M-4 130h248v30H-4z', '#4FC3F7', 0) + P('M-4 132c50-34 110-30 150-6 30 18 70 14 98 4v140H-4z', '#81C784') + E(190, 106, 7, 10, '#FFCA28') + Lc('M190 114v22M198 116v20', '#F9A825', 5)
      + bamboo(30, 120, 190) + bamboo(46, 130, 190) + panda(110, 168, 30) + panda(160, 188, 18)
      + R(52, 104, 70, 28, '#FFFFFF', 8) + R(58, 108, 58, 12, '#B3E5FC', 3, 3) + Lc('M76 108v12M96 108v12', '#455A64', 3) + C(68, 136, 7, '#455A64', 3) + C(106, 136, 7, '#455A64', 3))),
  D('shirarahama', 'หาดชิราระฮามะทรายขาวและน้ำทะเลใส', 'Shirarahama, the white sand beach and clear sea', ['shirarahama', 'ชิราระฮามะ', 'shirahama beach', 'หาดชิราฮามะ', 'white sand', 'ทรายขาว', 'clear sea', 'ทะเลใส', 'seaside', 'sandcastle', 'ปราสาททราย', 'beach umbrella', 'wakayama'],
    // a long curve of pure white sand with blue-green shallows, striped umbrellas, two sandcastles, children’s buckets and one smiling sun
    scene('sh-d2', '#B3E5FC', C(176, 56, 22, '#FFD54F') + face(176, 56, 0.3) + cloud(70, 56) + P('M-4 100h248v50H-4z', '#29B6F6', 0) + P('M-4 120c60 10 120-6 248-6v30H-4z', '#80DEEA', 0) + Lc('M30 112h20M150 108h26', '#FFFFFF', 3)
      + P('M-4 140c60-14 130-6 248 14v100H-4z', '#FFF3C4') + Lc('M0 150c60-10 130-4 240 14', '#FFFFFF', 4)
      + [[50, 168, '#E53935'], [180, 182, '#1E88E5']].map(([x, y, c]) => Lc(`M${x} ${y}v40`, '#8D6E63', 3) + P(`M${x - 28} ${y}a28 22 0 0 1 56 0z`, c) + P(`M${x - 9} ${y}a9 22 0 0 1 18 0z`, '#FFFFFF', 0)).join('')
      + P('M96 214l6-28h28l6 28z', '#F2D9A0') + R(104, 172, 22, 14, '#F2D9A0', 2) + Lc('M110 172v-6M120 172v-6', INK, 2.5) + P('M110 166l5-6 5 6z', '#E53935', 2.5) + face(116, 202, 0.2, 'smile'))),
  D('engetsu', 'เกาะเอ็นเก็ตสึกับรูกลมรับพระอาทิตย์ตก', 'Engetsu island with the setting sun in its round hole', ['engetsu island', 'เกาะเอ็นเก็ตสึ', 'engetsuto', 'เอ็นเก็ตสึโตะ', 'round hole', 'รูกลม', 'sunset', 'พระอาทิตย์ตก', 'shirahama', 'ชิราฮามะ', 'sea arch', 'wakayama', 'วากายามะ'],
    // an orange-pink sky with a big smiling sun low in the middle showing through the round hole of a dark rock island, calm gold sea, two gulls
    scene('sh-d3', '#FFCC80', E(120, 126, 120, 50, '#F48FB1', 0) + C(120, 108, 30, '#FF7043') + face(120, 108, 0.3, 'smile') + P('M-4 126h248v140H-4z', '#FFB74D', 0) + Lc('M20 140h50M150 150h60M60 164h40M130 176h56', '#FFE0B2', 4)
      + P('M56 150c0-30 14-52 30-60 10-4 16-12 34-12s38 10 48 18c14 10 22 30 22 54z', '#5D4037') + C(120, 112, 24, '#FF7043') + face(120, 112, 0.26, 'smile') + P('M62 150c4-16 14-30 28-38', '#795548', 0)
      + Lc('M40 70c8-8 16-8 22 0M70 56c8-8 16-8 22 0', INK, 3))),
  D('wakayamacastle', 'ปราสาทวากายามะบนเนินเขากับเสือคิชู', 'Wakayama Castle on its hill with the Kishu tiger', ['wakayama castle', 'ปราสาทวากายามะ', 'wakayama-jo', 'tiger', 'เสือ', 'tora', 'kishu tokugawa', 'คิชูโทคุงาวะ', 'castle keep', 'หอคอยปราสาท', 'cherry blossom', 'ซากุระ', 'wakayama', 'วากายามะ'],
    // a white three-storey castle keep with grey roofs on a stone wall on its green hill, pink cherry blossom clouds at the sides, a little striped tiger statue smiling at the foot
    scene('sh-d4', '#E1F5FE', cloud(50, 50) + cloud(186, 66) + P('M-4 150c30-30 70-34 124-34s94 4 124 34v120H-4z', '#81C784') + P('M60 176l12-40h96l12 40z', '#B0BEC5') + Lc('M72 150h96M66 164h108', '#78909C', 2.5)
      + R(86, 100, 68, 36, '#FFFFFF', 3) + P('M76 100l44-22 44 22z', '#607D8B') + R(100, 66, 40, 34, '#FFFFFF', 3) + P('M90 66l30-18 30 18z', '#607D8B') + R(108, 36, 24, 30, '#FFFFFF', 3) + P('M100 36l20-16 20 16z', '#607D8B')
      + R(112, 112, 8, 14, '#78909C', 0, 2.5) + R(124, 112, 8, 14, '#78909C', 0, 2.5) + C(30, 150, 22, '#F8BBD0') + C(14, 164, 16, '#F48FB1') + C(212, 140, 22, '#F8BBD0') + C(226, 158, 16, '#F48FB1')
      + g(190, 200, 1, E(0, 0, 20, 14, '#FFB300') + C(-14, -14, 10, '#FFB300', 3) + Lc('M-6 -4v10M4 -4v10M-18 -18l4 4M-10 -20l4 4', '#5D4037', 3) + face(-14, -12, 0.2))) ),

  L('pandafamily', 'ครอบครัวแพนด้าบนโครงปีนไม้ไผ่', 'A panda family on their bamboo climbing frame', ['panda family', 'ครอบครัวแพนด้า', 'baby panda', 'ลูกแพนด้า', 'adventure world', 'แอดเวนเจอร์เวิลด์', 'bamboo', 'ไม้ไผ่', 'climbing frame', 'โครงปีน', 'giant panda', 'แพนด้ายักษ์', 'shirahama'], 'หาลูกแพนด้าตัวเล็กบนโครงปีน', 'Find the little cub on the climbing frame',
    // a big mother panda sitting on the grass with a bamboo stalk, a small cub on a wooden log frame above her waving, a green leaf bundle beside them
    bg('#E8F5E9') + low(176, '#A5D6A7') + R(120, 80, 84, 8, '#A1887F', 3) + Lc('M130 88v90M194 88v90', '#8D6E63', 6) + panda(80, 148, 44) + panda(164, 62, 22) + Lc('M30 90v90', '#66BB6A', 6) + Lc('M26 112h8M26 136h8', '#2E7D32', 2.5) + P('M40 200c16-12 40-12 56 0z', '#66BB6A', 3) + frame),
  L('pandatrain', 'รถไฟคุโรชิโอลายแพนด้าไปชิราฮามะ', 'The Kuroshio train painted with pandas', ['kuroshio train', 'รถไฟคุโรชิโอ', 'panda train', 'รถไฟแพนด้า', 'panda kuroshio', 'limited express', 'รถไฟด่วนพิเศษ', 'jr kinokuni line', 'สายคิโนะคุนิ', 'shirahama station', 'สถานีชิราฮามะ', 'wakayama'], 'หาแพนด้าที่ชะโงกออกมาจากหน้าต่าง', 'Find the panda peeking out of the window',
    // a white-and-black train with panda faces painted on its nose and a panda waving from each round window, sea and a pine tree beside the track
    bg('#E1F5FE') + low(160, '#4FC3F7') + P('M16 190h208v34a30 30 0 0 1-30 0H46a30 30 0 0 1-30 0z', '#BCAAA4', 0) + Lc('M16 194h208', '#8D6E63', 4) + P('M22 108h160c22 0 36 18 36 40v34H22z', '#FFFFFF') + R(22, 150, 196, 14, '#37474F', 0, 3)
      + [46, 86, 126].map((x) => C(x, 128, 13, '#B3E5FC', 3) + C(x, 132, 7, '#FFFFFF', 2) + C(x - 5, 124, 3, '#37474F', 0) + C(x + 5, 124, 3, '#37474F', 0)).join('') + panda(190, 140, 20) + C(60, 190, 8, '#455A64', 3) + C(160, 190, 8, '#455A64', 3)
      + Lc('M30 84v-26', '#8D6E63', 5) + P('M12 70q18-30 36 0z', '#388E3C', 3) + frame),
  L('sandanbeki', 'หน้าผาซันดันเบกิและถ้ำริมทะเล', 'Sandanbeki, the tall sea cliff with its cave', ['sandanbeki', 'ซันดันเบกิ', 'sea cliff', 'หน้าผาริมทะเล', 'cave', 'ถ้ำ', 'cliff cave elevator', 'ลิฟต์ถ้ำ', 'rocky coast', 'ชายฝั่งหิน', 'shirahama', 'ชิราฮามะ', 'wakayama'], 'หาปากถ้ำตรงเชิงผา', 'Find the cave mouth at the foot of the cliff',
    // a tall flat-topped golden-brown cliff with a green pine edge, waves crashing at its foot and a dark round cave mouth with a lantern glow inside, a gull
    bg('#B3E5FC') + P('M16 70h208v60H16z', '#B3E5FC', 0) + P('M16 224V84h120l16 12 8 128z', '#D7A86E') + Lc('M40 96v120M72 90v126M104 94v122', '#B9854D', 3) + P('M16 84h120l16 12-16 4H16z', '#66BB6A', 3)
      + E(60, 214, 54, 26, '#29B6F6', 0) + P('M150 224V96h74v98a30 30 0 0 1-30 30z', '#29B6F6', 0) + Lc('M156 180c8-8 14 8 22 0s14 8 22 0M168 204c8-8 14 8 22 0', '#E1F5FE', 4)
      + E(78, 188, 24, 28, '#4E342E') + E(78, 192, 14, 20, '#FFB74D', 0) + face(78, 186, 0.22, 'smile') + Lc('M182 54c8-8 16-8 22 0M206 44c8-8 16-8 22 0', INK, 3) + C(120, 50, 12, '#FFD54F', 3) + frame),
  L('senjojiki', 'ลานหินสเซ็นโจจิกิหินเรียงเป็นชั้นเหมือนเสื่อพันผืน', 'Senjojiki, a thousand-mat rock shelf by the sea', ['senjojiki', 'เซ็นโจจิกิ', 'rock shelf', 'ลานหิน', 'sandstone terrace', 'หินทรายเป็นชั้น', 'flat rocks', 'หินแบน', 'thousand tatami', 'เสื่อพันผืน', 'shirahama', 'ชิราฮามะ', 'wakayama'], 'หาเด็กนั่งบนก้อนหินแบน', 'Find the child sitting on the flat rock',
    // wide pale-sand rock steps like giant tatami sheets sloping to the sea with ripple lines in the stone, small waves, one smiling round boulder and two gulls
    bg('#B3E5FC') + P('M16 70h208v74H16z', '#4FC3F7', 0) + Lc('M30 90h40M150 100h50M80 118h50', '#E1F5FE', 4) + P('M16 224V150l50-14 40 4 40-16 78 12v88a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#F2D9A0')
      + P('M16 160l50-14 40 4M16 192l76-16 56 4 76-20M16 214h208', '#D7B77A', 0) + Lc('M16 160l50-14 40 4M16 192l76-16 56 4 76-20', '#C79F5A', 3) + Lc('M60 170h40M130 200h50M170 164h30', '#E6C98A', 3)
      + E(150, 184, 24, 18, '#BCAAA4') + face(150, 184, 0.3) + Lc('M60 56c8-8 16-8 22 0M92 44c8-8 16-8 22 0', INK, 3) + frame),
  L('kishicat', 'แมวนายสถานีที่สถานีคิชิ', 'The cat stationmaster of Kishi station', ['kishi station', 'สถานีคิชิ', 'cat stationmaster', 'แมวนายสถานี', 'tama', 'ทามะ', 'nitama', 'นิทามะ', 'kishigawa line', 'สายคิชิกาวะ', 'kinokawa', 'cat station', 'wakayama', 'วากายามะ'], 'หาแมวใส่หมวกนายสถานี', 'Find the cat in the stationmaster’s cap',
    // a tiny wooden station with a tiled roof and a round clock, a calico cat sitting on the platform in a navy stationmaster cap with a gold badge, a little red train waiting
    bg('#FFF8E1') + low(180, '#CFD8DC') + R(24, 90, 92, 60, '#FFECB3', 4) + P('M16 94l54-34 54 34z', '#8D6E63') + C(70, 108, 12, '#FFFFFF', 3) + Lc('M70 108v-7M70 108l5 3', INK, 2.5) + R(52, 124, 14, 26, '#6D4C41', 2, 3)
      + R(140, 120, 84, 60, '#E53935', 8) + R(148, 128, 24, 18, '#B3E5FC', 3, 3) + R(180, 128, 24, 18, '#B3E5FC', 3, 3) + C(160, 184, 7, '#455A64', 3) + C(206, 184, 7, '#455A64', 3)
      + P('M80 214c-8-30 2-52 30-52s40 20 30 52z', '#FFFFFF') + P('M92 168c-4 10-2 20 6 22M120 172c4 8 6 16 0 24', '#FFB74D', 0) + C(110, 140, 24, '#FFFFFF') + P('M92 126l-4-18 16 8zM128 126l4-18-16 8z', '#FFFFFF') + P('M100 124c4-10 8-14 14-6', '#FFB74D', 0) + face(110, 144, 0.34)
      + P('M88 124c4-14 40-14 44 0z', '#283593') + R(84, 122, 52, 6, '#1A237E', 2, 2.5) + C(110, 116, 4, '#FFD54F', 1.5) + frame),
  L('wakayamaramen', 'ราเม็งวากายามะซุปหมูกระดูกซอสถั่วเหลืองกับคามาโบโกะ', 'Wakayama ramen, soy pork broth with a pink fish cake', ['wakayama ramen', 'ราเม็งวากายามะ', 'chuka soba', 'ชูกะโซบะ', 'soy pork bone broth', 'ซุปกระดูกหมูโชยุ', 'narutomaki', 'นารูโตะ', 'pickled mackerel sushi', 'ซูชิปลาแมกเคอเรลดอง', 'noodles', 'wakayama', 'วากายามะ'], 'หาแผ่นปลาลายก้นหอยสีชมพู', 'Find the pink swirl fish cake',
    // a red-rimmed bowl of thin noodles in a brown soy broth with slices of pork, a pink-and-white swirl fish cake, green spring onion and a little plate of pressed mackerel sushi beside it
    P('M32 112h176c0 50-36 80-88 80s-88-30-88-80z', '#FFFFFF') + Lc('M40 128c30 10 56 10 80 0s56-10 80 0', '#E53935', 5) + E(120, 112, 88, 20, '#7B4A2A') + E(120, 114, 78, 14, '#935A35', 0)
      + Lc('M60 112c10-8 20 8 30 0s20 8 30 0M64 120c10-6 20 6 30 0s20 6 30 0', '#FFF3C4', 6) + P('M64 100l28-8 4 18-28 6z', '#F5C6A8', 3) + C(150, 106, 15, '#FFFFFF', 3) + P('M150 106m-10 0a10 10 0 1 1 20 0', '#F48FB1', 0) + Lc('M142 104c4-6 12-4 12 2', '#F48FB1', 3)
      + [[100, 98], [120, 94], [128, 108]].map(([x, y]) => C(x, y, 3, '#8BC34A', 0)).join('') + Lc('M96 62l14 38M118 60l-6 38', '#C8A165', 5) + face(120, 156, 0.42)),
  L('arida', 'ส้มมิกังอาริดะ ผลเล็กหวานฉ่ำ', 'Arida mikan, small sweet mandarins', ['arida mikan', 'ส้มมิกังอาริดะ', 'mikan', 'มิกัง', 'mandarin orange', 'ส้มแมนดาริน', 'citrus', 'ส้ม', 'orchard', 'สวนส้ม', 'kishu', 'คิชู', 'wakayama', 'วากายามะ'], 'หาส้มที่มีใบสองใบ', 'Find the mandarin with two leaves',
    // three round orange mandarins with green stems and leaves, the biggest smiling, one peeled open into soft segments, an open wooden crate behind with more of them
    R(34, 70, 172, 70, '#D7B98A', 6) + Lc('M34 92h172M34 116h172', '#B8935E', 3) + [[60, 70], [100, 66], [140, 68], [182, 72]].map(([x, y]) => C(x, y, 16, '#FB8C00', 3)).join('')
      + C(88, 176, 38, '#FB8C00') + Lc('M88 138c-2-8 0-12 4-16', '#6D4C41', 4) + P('M92 126c14-12 28-6 32 0-12 6-22 6-32 0zM88 128c-10-12-24-10-30-4 10 6 20 8 30 4z', '#66BB6A') + face(88, 178, 0.46)
      + C(168, 180, 26, '#FFB74D') + P('M148 164a26 26 0 0 1 40 0c-8 4-32 4-40 0z', '#FB8C00', 3) + Lc('M168 156v50M156 160c-4 14-4 30 4 42M180 160c4 14 4 30-4 42', '#FFE0B2', 3)),
  L('toretore', 'ตลาดปลาโทเรโทเรกับโชว์ชำแหละปลาทูน่ายักษ์', 'Toretore market and its giant tuna cutting show', ['toretore market', 'ตลาดโทเรโทเร', 'toretore ichiba', 'tuna dismantling', 'ชำแหละปลาทูน่า', 'bluefin tuna', 'ทูน่าครีบน้ำเงิน', 'sashimi', 'ซาชิมิ', 'seafood market', 'ตลาดอาหารทะเล', 'shirahama', 'wakayama'], 'หาปลาทูน่าตัวใหญ่ที่นอนบนโต๊ะ', 'Find the big tuna lying on the table',
    // a long blue-grey tuna on a white cutting table with a smiling face and a big round eye, a tray of pink sashimi slices and an ice box with small silver fish, a striped shop awning over it
    P('M16 70h208l-14 30H30z', '#E53935') + Lc('M52 70l-6 30M88 70l-2 30M124 70v30M160 70l2 30M196 70l6 30', '#FFFFFF', 7) + R(24, 150, 192, 14, '#FFFFFF', 4) + Lc('M40 164v46M200 164v46', '#B0BEC5', 6)
      + P('M30 134c20-30 80-34 120-14 20 10 40 4 60-8-6 18-8 28 0 40-20-4-40-6-60 4-40 20-100 14-120-22z', '#607D8B') + P('M40 134c30-14 90-18 130-2', '#90A4AE', 0) + C(58, 136, 8, '#FFFFFF', 3) + C(58, 136, 3, INK, 0) + Lc('M46 150q8 6 18 2', INK, 3)
      + R(36, 176, 70, 24, '#FFFFFF', 4) + [[50, 188], [66, 188], [82, 188], [98, 188]].map(([x, y]) => E(x, y, 6, 8, '#F06292', 2.5)).join('') + R(130, 178, 70, 30, '#E1F5FE', 5) + [[144, 192], [160, 196], [176, 192]].map(([x, y]) => E(x, y, 10, 4, '#B0BEC5', 2.5)).join('') + face(110, 136, 0.3)),
  L('kumanokodo', 'ทางเดินเก่าคุมาโนะโคโดะกับบันไดหินปกคลุมมอส', 'The old Kumano Kodo path with moss-covered stone steps', ['kumano kodo', 'คุมาโนะโคโดะ', 'pilgrimage path', 'ทางแสวงบุญเก่า', 'cedar forest', 'ป่าซีดาร์', 'stone steps', 'บันไดหิน', 'moss', 'มอส', 'hiking trail', 'เส้นทางเดินป่า', 'tanabe', 'wakayama'], 'หาหินกลมที่มีหน้ายิ้มบนบันได', 'Find the round smiling stone on the steps',
    // a winding path of old stone steps with green moss, tall straight cedar trunks on both sides with light coming through, ferns, a small wooden walking stick leaning on one step, one smiling round stone
    bg('#E8F5E9') + Lc('M44 220V60M80 220V40M160 220V40M196 220V60', '#6D4C41', 14) + Lc('M44 220V60M80 220V40M160 220V40M196 220V60', '#8D6E63', 6) + P('M44 50q-20-6-26 14 20 4 26-14zM196 50q20-6 26 14-20 4-26-14z', '#2E7D32', 3) + P('M80 30q-16-10-30 4 20 6 30-4zM160 30q16-10 30 4-20 6-30-4z', '#388E3C', 3)
      + P('M96 224l16-100h16l16 100z', '#C5E1A5', 0) + [[130, 90], [124, 112], [116, 138], [108, 168], [98, 204]].map(([y, w], k) => P(`M${120 - 11 - k * 4} ${y}h${22 + k * 8}l4 12h-${30 + k * 8}z`, k % 2 ? '#B0BEC5' : '#9E9E9E', 3)).join('')
      + P('M96 196h16l-4 8H98z', '#66BB6A', 0) + Lc('M60 200l8-26', '#8D6E63', 4) + C(138, 170, 12, '#BDBDBD') + face(138, 172, 0.22) + P('M20 214q14-24 30-12 8 6 14 14z', '#66BB6A', 3) + P('M222 214q-14-24-30-12-8 6-14 14z', '#66BB6A', 3) + frame),
  L('nachifalls', 'น้ำตกนาจิน้ำตกสูงที่สุดของญี่ปุ่นกับเจดีย์สีแดงเล็กๆ', 'Nachi Falls, Japan’s tallest waterfall, with its small red pagoda', ['nachi falls', 'น้ำตกนาจิ', 'nachi no taki', 'tallest waterfall', 'น้ำตกสูงที่สุด', 'kumano nachi', 'คุมาโนะนาจิ', 'red pagoda', 'เจดีย์แดง', 'cedar', 'ซีดาร์', 'katsuura', 'wakayama'], 'หาเจดีย์สีแดงข้างๆ น้ำตก', 'Find the little red pagoda beside the waterfall',
    // a very tall white straight waterfall pouring from a dark green cliff into a misty pool, big cedars each side, a small red three-storey pagoda in front with steps, a smiling face in the mist
    bg('#E8F5E9') + P('M16 224V30h208v194z', '#546E7A', 0) + P('M16 80V30h72c-8 40-8 80 0 120H16zM224 80V30h-72c8 40 8 80 0 120h72z', '#388E3C') + P('M88 30h64v150H88z', '#6D8B74', 0) + R(106, 30, 28, 150, '#FFFFFF', 3) + Lc('M112 34v140M122 34v140M130 34v140', '#E1F5FE', 3)
      + E(120, 190, 54, 14, '#E1F5FE') + E(120, 196, 70, 12, '#B3E5FC', 0) + Lc('M30 70v80M200 60v90', '#6D4C41', 10) + face(120, 178, 0.3, 'smile')
      + R(168, 140, 22, 46, '#E53935', 2) + [0, 1, 2].map((k) => P(`M${160 + k * 2} ${150 + k * 14}h${38 - k * 4}l-4-8h-${30 - k * 4}z`, '#455A64', 2.5)).join('') + Lc('M179 134v-12', INK, 2.5)),
  L('binchotan', 'ปลาย่างบนถ่านบินโชตันอันขึ้นชื่อของวากายามะ', 'Fish grilled over Wakayama’s famous binchotan charcoal', ['binchotan', 'ถ่านบินโชตัน', 'white charcoal', 'ถ่านขาว', 'charcoal grill', 'เตาถ่านย่าง', 'grilled fish', 'ปลาย่าง', 'kishu', 'คิชู', 'minabe', 'มินาเบะ', 'wakayama', 'วากายามะ'], 'หาปลาที่กำลังยิ้มบนตะแกรง', 'Find the smiling fish on the grill',
    // a round clay grill pot full of pale grey sticks of charcoal with a red glow, a plump silver fish with salt on a wire grill above, a little lemon wedge, rising smoke and a bundle of charcoal sticks beside it
    P('M40 130h160l-12 76H52z', '#6D4C41') + E(120, 130, 80, 14, '#4E342E') + [[70, 132], [96, 136], [124, 134], [150, 132], [100, 126], [140, 128]].map(([x, y]) => R(x - 12, y - 4, 24, 8, '#CFD8DC', 3, 2.5)).join('') + Lc('M62 134h22M110 138h26', '#FF7043', 3)
      + Lc('M50 122h140M60 112h120', '#455A64', 3) + E(120, 100, 52, 20, '#B0BEC5') + P('M170 100l26-16v32z', '#B0BEC5') + C(86, 94, 5, '#FFFFFF', 3) + C(86, 94, 2, INK, 0) + Lc('M100 92l12 4M124 90l12 4', '#ECEFF1', 3) + face(112, 104, 0.2)
      + P('M200 150l26-8 6 14-26 8z', '#CFD8DC', 3) + P('M30 96q14-12 22 0 8 8-4 14z', '#FFEE58', 3) + Lc('M110 70c-8-10 6-16 0-28M134 66c-8-10 6-16 0-28', '#CFD8DC', 4)),
  L('hashigui', 'ฮาชิกุอิอิวะ แท่งหินเรียงกันเป็นแถวกลางทะเล', 'Hashigui-iwa, the row of rock pillars across the sea', ['hashigui-iwa', 'ฮาชิกุอิอิวะ', 'rock pillars', 'เสาหินกลางทะเล', 'bridge pier rocks', 'หินเสาสะพาน', 'kushimoto', 'คุชิโมโตะ', 'sea stacks', 'ก้อนหินในทะเล', 'rocky coast', 'ชายฝั่งหิน', 'wakayama'], 'หาเสาหินที่มีหน้ายิ้ม', 'Find the pillar with a smiling face',
    // a long straight line of tall dark rock pillars standing in a blue sea running towards the horizon, waves foaming at their feet, a pink dawn sky, the nearest pillar smiling
    bg('#FFE0B2') + P('M16 110h208v114H16z', '#29B6F6', 0) + C(176, 90, 20, '#FF8A65', 3) + Lc('M30 70c8-8 16-8 22 0', INK, 3) + [[196, 120, 10, 38], [170, 124, 14, 56], [140, 132, 20, 78], [98, 146, 28, 104]].map(([x, y, w, h]) => P(`M${x - w} ${y + h}L${x - w * 0.8} ${y}h${w * 1.6}L${x + w} ${y + h}z`, '#6D5B54')).join('')
      + Lc('M40 190h30M150 210h50M40 150h22', '#E1F5FE', 4) + E(98, 252 - 108, 40, 8, '#FFFFFF', 0) + face(98, 168, 0.4) + frame),
  L('minabeume', 'สวนดอกบ๊วยบานสะพรั่งที่มินาเบะ', 'The plum blossom hills at Minabe', ['minabe plum', 'บ๊วยมินาเบะ', 'plum blossom', 'ดอกบ๊วย', 'ume', 'อุเมะ', 'nanko ume', 'บ๊วยนังโกะ', 'minabe', 'มินาเบะ', 'plum grove', 'สวนบ๊วย', 'february', 'wakayama'], 'หาผึ้งตัวน้อยบนดอกบ๊วย', 'Find the little bee on the blossom',
    // a gnarled brown plum tree covered in white and pink blossom, snow-white petals falling, blossom drifts on the hills behind, a smiling bee, the blue sea in the distance
    bg('#E3F2FD') + P('M16 120h208v14H16z', '#4FC3F7', 0) + P('M16 134c40-24 90-24 120-4s60 4 88-14V224H16z', '#C5E1A5', 0) + C(40, 150, 20, '#FFFFFF', 3) + C(66, 160, 16, '#F8BBD0', 3) + C(200, 152, 20, '#F8BBD0', 3)
      + P('M110 224c4-40 0-60-14-84M110 190c16-14 30-36 38-60M96 150c-10-10-24-18-36-20', '#6D4C41', 10) + Lc('M110 224c4-40 0-60-14-84M110 190c16-14 30-36 38-60M96 150c-10-10-24-18-36-20', '#8D6E63', 5)
      + [[60, 120, 22], [96, 96, 26], [140, 100, 24], [160, 138, 20], [118, 130, 20], [48, 150, 14]].map(([x, y, r], k) => C(x, y, r, k % 2 ? '#F8BBD0' : '#FFFFFF', 3)).join('') + [[60, 120], [96, 96], [140, 100], [118, 130]].map(([x, y]) => C(x, y, 3, '#FFD54F', 0)).join('')
      + g(184, 76, 1, E(0, 0, 10, 7, '#FFD54F', 2.5) + Lc('M-4 -6v12M2 -6v12', INK, 2.5) + E(-4, -9, 6, 4, '#E1F5FE', 2) + C(-8, 0, 1.5, INK, 0)) + frame),
  L('footbath', 'บ่อแช่เท้าน้ำร้อนริมทะเลที่ชิราฮามะ', 'A seaside foot bath at Shirahama', ['foot bath', 'บ่อแช่เท้า', 'ashiyu', 'อาชิยุ', 'hot spring town', 'เมืองน้ำพุร้อน', 'shirahama onsen', 'ชิราฮามะออนเซ็น', 'steam', 'ไอน้ำ', 'towel', 'ผ้าเช็ดตัว', 'seaside', 'wakayama'], 'หาเท้าเล็กๆ สองคู่ในน้ำร้อน', 'Find the two little pairs of feet in the water',
    // a low stone-rimmed pool with steaming milky water, two pairs of small bare feet (one smaller) dangling in it, a folded towel on a wooden bench, the blue sea behind and rising steam curls
    bg('#E1F5FE') + P('M16 100h208v40H16z', '#29B6F6', 0) + Lc('M30 116h30M160 120h40', '#E1F5FE', 3) + low(140, '#D7CCC8') + R(40, 130, 160, 72, '#B0BEC5', 14) + E(120, 140, 70, 18, '#E0F7FA') + R(30, 108, 70, 10, '#A1887F', 3) + Lc('M40 118v-34M90 118v-34', '#8D6E63', 4)
      + R(44, 96, 40, 12, '#FFFFFF', 3) + Lc('M52 96v12M62 96v12M72 96v12', '#EF5350', 3)
      + [[98, 4], [118, 4]].map(([x, s]) => R(x - 7, 100, 14, 34, '#FFCCBC', 7) + E(x, 142, 11, 7, '#FFCCBC', 3)).join('') + [[150, 0.7], [166, 0.7]].map(([x]) => R(x - 5, 114, 10, 22, '#FFCCBC', 5) + E(x, 143, 8, 5, '#FFCCBC', 3)).join('')
      + Lc('M70 90c-8-10 6-16 0-26M126 86c-8-10 6-16 0-26M170 90c-8-10 6-16 0-26', '#CFD8DC', 4) + face(120, 178, 0.4)),
  L('turtle', 'เต่าทะเลที่คุชิโมโตะและสาหร่ายในน้ำใส', 'A sea turtle at Kushimoto in clear water', ['kushimoto marine park', 'คุชิโมโตะมารีนปาร์ก', 'sea turtle', 'เต่าทะเล', 'kushimoto', 'คุชิโมโตะ', 'coral', 'ปะการัง', 'glass bottom boat', 'เรือก้นกระจก', 'kuroshio', 'คุโรชิโอ', 'wakayama'], 'หาปลาตัวเล็กที่ว่ายตามเต่า', 'Find the tiny fish swimming after the turtle',
    // a smiling green sea turtle with a patterned shell and paddle flippers swimming in blue water over pink coral and green weed, two small yellow fish following it, bubbles
    bg('#B3E5FC') + P('M16 190c30-16 70-16 100 0s70 8 108-8v42a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#FFECB3', 0) + P('M30 200l6-26 6 26zM44 200l8-34 8 34z', '#F06292', 3) + Lc('M190 204v-34M200 204v-24', '#43A047', 5)
      + g(120, 118, 1, E(0, 0, 54, 38, '#2E7D32') + E(0, 0, 44, 30, '#66BB6A', 3) + Lc('M-20 -22l10 14-10 14M10 -26v50M30 -20l-10 14 10 14', '#2E7D32', 3) + E(-38, 24, 22, 8, '#81C784', 3) + E(30, 30, 20, 8, '#81C784', 3) + E(-40, -22, 22, 8, '#81C784', 3) + C(60, -2, 22, '#81C784') + face(62, 0, 0.3, 'smile'))
      + [[196, 80], [208, 104]].map(([x, y]) => E(x, y, 11, 7, '#FFD54F', 2.5) + P(`M${x + 10} ${y}l8-6v12z`, '#FFD54F', 2.5) + C(x - 5, y - 1, 1.5, INK, 0)).join('') + C(44, 70, 5, '#E1F5FE', 2) + C(56, 56, 3, '#E1F5FE', 2) + frame),
];

export default {
  places: {
    'jp-shirahama': { country: 'jp', wave: 3, name: nm('ชิราฮามะและวากายามะ', 'Shirahama and Wakayama'), tz: 'Asia/Tokyo', ll: [33.68, 135.34],
      alias: ['shirahama', 'ชิราฮามะ', '白浜', 'wakayama', 'วากายามะ', '和歌山', 'adventure world', 'แอดเวนเจอร์เวิลด์', 'shirarahama', 'ชิราระฮามะ', 'engetsu island', 'เกาะเอ็นเก็ตสึ', 'sandanbeki', 'ซันดันเบกิ',
        'senjojiki', 'เซ็นโจจิกิ', 'wakayama castle', 'ปราสาทวากายามะ', 'kishi station', 'สถานีคิชิ', 'toretore', 'โทเรโทเร', 'kumano kodo', 'คุมาโนะโคโดะ', 'nachi falls', 'น้ำตกนาจิ',
        'kushimoto', 'คุชิโมโตะ', 'minabe', 'มินาเบะ', 'tanabe', 'ทานาเบะ', 'nanki', 'นังกิ', 'kishu', 'คิชู', 'hashigui-iwa', 'wakayama ramen', 'arida mikan'],
      colors: SH },
  },
  items,
};
