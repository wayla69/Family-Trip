// Wave 15, group mn (3 of 3): the Gobi — Khongoryn Els, the Bayanzag cliffs, the Yol valley ice and the plants and animals
// only the Gobi has. No camels, no dinosaurs or their eggs (Patagonia has the eggs), no bears, no gazelles or ibex, no
// vultures, no ovoo; gers only inside the day scenes (docs/STOCK-ART.md §8)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const L = (key, th, en, kw, sth, sen, svg) => ({ id: `mn-gobi.landmark.${key}`, cat: 'landmark', file: `mn/gobi/landmark-${key}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (key, th, en, kw, sky, svg) => ({ id: `mn-gobi.day.${key}`, cat: 'day', file: `mn/gobi/day-${key}.v1.svg`, name: nm(th, en), kw, svg: scene(`mngb-${key}`, sky, svg) });
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
// a saxaul: a gnarled, twisting grey trunk with tufts of thin green twigs (x, foot y, size)
const saxaul = (x, y, s = 1) => g(x, y, s, Lc('M0 0c-4-14 6-22 0-34M0-20c8-6 14-8 18-18M0-24c-8-4-14-10-16-18', '#8D7B6A', 5) + [[0, -40], [20, -42], [-18, -44], [8, -50]].map(([a, b]) => E(a, b, 12, 8, '#9CB86A', 2.5)).join(''));
const ger = (x, y, s = 1) => g(x, y, s, P('M-26 0v-16c0-4 4-6 8-6h36c4 0 8 2 8 6V0z', '#FFFFFF', 3) + P('M-30-20c8-12 20-18 30-18s22 6 30 18z', '#FFFFFF', 3) + Lc('M-26-12h52', '#E65100', 3) + R(-6, -14, 12, 14, '#1E88E5', 1, 2.5));
const GB = { k1: '#D84315', k2: '#8D6E63', k3: '#FFF3E0' };

const items = [
  { id: 'mn-gobi.stamp', cat: 'stamp', file: 'mn/gobi/stamp.v1.svg', name: nm('ตราประทับทะเลทรายโกบี', 'Gobi stamp'), kw: ['gobi', 'โกบี', 'gobi desert', 'ทะเลทรายโกบี', 'khongoryn els', 'คองโกรีนเอลส์', 'saxaul', 'ต้นแซกซอล'],
    // golden dunes with a twisted saxaul tree in front and a hot sun
    svg: cityStamp('mngb-st', { name: 'GOBI', sub: 'MONGOLIA', ...GB, emblem: C(124, 72, 12, '#FFB300', 2.5) + P('M48 118c16-30 30-44 46-44s30 20 60 44z', '#FFCC80') + P('M94 74c-4 20 10 30 6 44', 'none', 2.5) + P('M48 118h104v18H48z', '#E8B670', 0) + saxaul(76, 134, 0.8) }) },
  D('khongoryn', 'เนินทรายคองโกรีนเอลส์', 'The Khongoryn Els dunes', ['khongoryn els', 'คองโกรีนเอลส์', 'singing sands', 'ทรายร้องเพลง', 'gobi dunes', 'เนินทรายโกบี', 'khongor river', 'แม่น้ำคองโกร์', 'gobi', 'โกบี'], '#81D4FA',
    // a wall of tall golden dunes under a deep blue sky with bare mountains behind, a bright green strip of meadow and a little river at their foot, two white gers
    P('M-4 100l40-30 30 20 40-34 34 26 40-30 64 44v20H-4z', '#A1887F') + P('M-4 160c30-50 60-80 90-80 20 0 30 30 50 30s30-40 60-40 30 30 48 46v44H-4z', '#FFCC80') + Lc('M86 80c-6 30 4 50-4 80M196 70c-8 30 0 60-10 90', '#F0A860', 3)
      + P('M-4 158c80-8 168-8 248 0v30H-4z', '#8BC34A') + Lc('M-4 176c60-8 120 6 248-6', '#4FC3F7', 6) + P('M-4 186h248v60H-4z', '#E8C27A') + ger(70, 166, 0.7) + ger(104, 168, 0.7) + C(200, 40, 14, '#FFF59D', 3)),
  D('bayanzag', 'ผาเพลิงบายันซักยามเย็น', 'The Flaming Cliffs of Bayanzag at sunset', ['bayanzag', 'บายันซัก', 'flaming cliffs', 'ผาเพลิง', 'red cliffs', 'หน้าผาสีแดง', 'sunset', 'พระอาทิตย์ตก', 'gobi', 'โกบี'], '#FFCCBC',
    // glowing orange-red sandstone cliffs carved into towers and gullies, a low sun turning the sky pink and gold, gnarled saxaul shrubs in the sand below
    C(60, 70, 22, '#FFE082', 3) + P('M-4 140v-40h30l10-20h20l6 24h24l12-34h30l8 30h28l10-22h24l14 26h42v36z', '#E64A19') + Lc('M40 104v36M84 92v48M130 84v56M176 96v44M212 104v36', '#BF360C', 3) + Lc('M-4 118h248', '#FF8A65', 4)
      + P('M-4 140h248v110H-4z', '#FFCC80') + ring(5, (k) => saxaul(24 + k * 48, 196 + (k % 2) * 16, 0.9 + (k % 2) * 0.2))),
  L('yolvalley', 'น้ำแข็งกลางฤดูร้อนที่หุบเขาโยล', 'Summer ice in the Yol Valley gorge', ['yolyn am', 'โยลีนอัม', 'yol valley', 'หุบเขาโยล', 'ice gorge', 'หุบเขาน้ำแข็ง', 'summer ice', 'น้ำแข็งฤดูร้อน', 'gurvan saikhan', 'กูร์วานไซคาน'],
    'หาแผ่นน้ำแข็งที่ยังไม่ละลายในหน้าร้อน', 'Find the ice that has not melted even in summer',
    // a narrow gorge between two steep rocky walls, a thick ribbon of white-blue ice along the floor with a little stream running out of it, a child in shorts pointing at it
    P('M-4 10h90c10 40-6 80 6 120 10 30 0 60-6 98H-4z', '#8D7B6A') + P('M244 10h-80c-10 40 8 80-6 120-10 30 0 60 4 98h82z', '#A1887F') + Lc('M30 40l20 20-10 30M210 50l-16 24 12 26', '#6D5E50', 3)
      + P('M84 228c-2-30 4-50 10-60 14-10 38-10 52 0 8 10 12 30 10 60z', '#E1F5FE') + P('M94 170c12 8 40 8 52 0', '#B3E5FC', 3) + Lc('M104 186l10 14-6 14M134 184l-8 16 8 12', '#81D4FA', 3) + ring(4, (k) => P(`M${100 + k * 12} 176v${10 + (k % 2) * 6}l-3-4`, '#FFFFFF', 2)) + Lc('M112 228c4-6 12-6 18 0', '#4FC3F7', 4)
      + ring(4, (k) => P(`M${72 + k * 30} 70c4-8 12-8 14 0z`, '#9CCC65', 2)) + g(176, 220, 1, Lc('M-8-16l-18-8', INK, 3) + kid(0, 0, '#FFB300')) + face(120, 198, 0.42)),
  L('saxaul', 'ต้นแซกซอลกลางทะเลทราย', 'A saxaul tree in the desert', ['saxaul', 'แซกซอล', 'zag tree', 'ต้นซาก', 'desert tree', 'ต้นไม้ทะเลทราย', 'gnarled wood', 'กิ่งบิดงอ', 'gobi plants', 'พืชโกบี'],
    'หาต้นไม้ที่ลำต้นบิดเป็นเกลียวในทะเลทราย', 'Find the tree with a twisty trunk in the desert',
    // a twisted, knotty grey-brown saxaul tree, its trunk spiralling up, thin jointed green twigs instead of leaves, its roots clutching a mound of sand
    P('M20 218c40-30 160-30 200 0z', '#FFCC80') + P('M100 214c4-30-10-50 4-80 10-20-6-40 6-60h18c-6 24 12 40 0 64-12 30 6 50 4 76z', '#8D7B6A') + Lc('M110 150c10 6 20 4 26-6M114 110c10 4 16 0 20-8', '#6D5E50', 3)
      + Lc('M118 80c20-20 40-20 56-40M112 88c-20-14-40-14-60-30M120 120c30-6 50 4 70 0', '#8D7B6A', 7) + [[174, 40], [52, 56], [190, 118], [120, 64], [80, 40], [150, 34], [30, 80], [206, 70]].map(([x, y]) => g(x, y, 1, ring(5, (k) => Lc(`M0 0l${-12 + k * 6} ${-16 + Math.abs(k - 2) * 4}`, '#9CB86A', 3)))).join('')
      + Lc('M96 214c-10 2-20 6-26 2M126 214c10 4 24 4 30 0', '#6D5E50', 4) + face(114, 176, 0.4)),
  L('khulan', 'ลาป่าคูลันวิ่งข้ามที่ราบ', 'Khulan, wild asses running across the plain', ['khulan', 'คูลัน', 'mongolian wild ass', 'ลาป่ามองโกเลีย', 'wild ass', 'ลาป่า', 'gobi wildlife', 'สัตว์ป่าโกบี', 'herd', 'ฝูงสัตว์'],
    'หาลาป่าสีน้ำตาลอ่อนท้องขาวที่วิ่งเป็นฝูง', 'Find the sandy wild asses with white tummies running together',
    // three sandy-coloured wild asses with white bellies, dark stand-up manes and a dark stripe down the back, trotting across flat stony ground in a puff of dust
    P('M-4 200c80-8 168-8 248 0v30H-4z', '#E8C27A') + ring(4, (k) => E(40 + k * 50, 210 + (k % 2) * 6, 10, 5, '#D7B06A', 2))
      + [[160, 120, 1], [90, 136, 0.9], [36, 156, 0.7]].map(([x, y, s]) => g(x, y, s, ring(4, (k) => Lc(`M${-28 + k * 18} 20l${k % 2 ? 8 : -8} 34`, '#C8A06A', 8)) + E(0, 6, 44, 24, '#D9B37A') + P('M-34 16c20 14 50 14 70 0', '#FFFFFF', 0) + Lc('M-34-12c20-6 40-6 60-4', '#6D4C41', 3)
        + P('M28-4c6-14 12-26 22-32l14 8c-4 12-12 22-22 30z', '#D9B37A') + Lc('M30-12c6-10 12-20 20-26', '#5D4037', 6) + P('M44-46l-4-22 10 16zM58-44l4-22-12 18z', '#D9B37A', 2.5) + g(58, -32, 1, E(0, 0, 13, 17, '#D9B37A') + E(4, 12, 10, 8, '#FFFFFF', 2.5), -30) + Lc('M-44 0c-10 4-14 14-10 22', '#5D4037', 4) + face(56, -36, 0.2, 'none'))).join('')
      + ring(4, (k) => C(8 + k * 10, 190 - (k % 2) * 8, 6 - k, '#F5DEB3', 2))),
  L('agama', 'กิ้งก่าหัวคางคกม้วนหาง', 'A toad-headed agama curling its tail', ['toad-headed agama', 'กิ้งก่าหัวคางคก', 'agama', 'อะกามา', 'lizard', 'กิ้งก่า', 'curly tail', 'หางม้วน', 'desert reptile', 'สัตว์เลื้อยคลานทะเลทราย'],
    'หากิ้งก่าตัวเล็กที่ม้วนหางเป็นวงกลม', 'Find the little lizard that rolls its tail into a curl',
    // a little sandy lizard with a round blunt toad-like head and freckled back, standing high on its legs on the sand, its tail rolled up in a tight curl over its back
    P('M-4 196c80-14 168-14 248 0v30H-4z', '#FFCC80') + ring(6, (k) => C(20 + k * 40, 210, 2, '#D7A86E', 0))
      + Lc('M164 152c30-6 40-40 20-54-16-10-30 8-20 20 10 8 22-2 14-10', '#D9B07A', 10) + Lc('M164 152c30-6 40-40 20-54-16-10-30 8-20 20 10 8 22-2 14-10', INK, 2)
      + ring(4, (k) => Lc(`M${80 + (k % 2) * 60} ${150 + Math.floor(k / 2) * 6}l${k % 2 ? 10 : -10} 30`, '#D9B07A', 8)) + E(116, 150, 50, 20, '#E6C08A') + ring(10, (k) => C(84 + k * 7, 144 + (k % 2) * 6, 2.2, '#A1673F', 0))
      + E(64, 136, 30, 24, '#E6C08A') + E(64, 150, 16, 6, '#FFAB91', 0) + face(60, 132, 0.45, 'none')),
  L('sandgrouse', 'นกแซนด์เกราส์ของพัลลาส', "Pallas's sandgrouse", ["pallas's sandgrouse", 'นกแซนด์เกราส์', 'sandgrouse', 'แซนด์เกราส์', 'desert bird', 'นกทะเลทราย', 'feathered feet', 'เท้ามีขน', 'gobi wildlife', 'สัตว์ป่าโกบี'],
    'หานกตัวกลมสีทรายที่มีเท้าเป็นขนฟู', 'Find the round sandy bird with fluffy feathered feet',
    // a plump sand-coloured bird sitting low on the ground, finely barred back, an orange face, a black patch on its belly, long pointed tail feathers and fluffy feathered feet
    P('M-4 200c80-10 168-10 248 0v30H-4z', '#FFE0B2') + Lc('M150 140l70-10', '#C8A06A', 6) + E(112, 150, 70, 46, '#E6C99A') + ring(12, (k) => Lc(`M${88 + (k % 6) * 16} ${124 + Math.floor(k / 6) * 16}l8 4`, '#A1673F', 2.5))
      + E(112, 186, 34, 10, '#4E342E', 0) + C(60, 108, 30, '#E6C99A') + E(56, 118, 18, 12, '#FFB74D', 0) + P('M30 106l-12 4 12 6z', '#8D6E63', 2.5) + [[96, 200], [128, 200]].map(([x, y]) => E(x, y, 12, 8, '#FFFFFF')).join('') + face(58, 104, 0.4, 'none')),
  L('tsagaansuvarga', 'ผาสีรุ้งซากานซูวาร์กา', 'The painted cliffs of Tsagaan Suvarga', ['tsagaan suvarga', 'ซากานซูวาร์กา', 'white stupa cliffs', 'ผาขาว', 'striped cliffs', 'ผาลายทาง', 'eroded escarpment', 'หน้าผากัดเซาะ', 'gobi', 'โกบี'],
    'หาหน้าผาที่มีลายสีชมพู ส้ม และขาว', 'Find the cliffs striped pink, orange and white',
    // a crumbling escarpment carved into little towers and pillars, banded in white, pink, orange and lilac stripes like a layered cake, flat sand below
    P('M-4 200c80-8 168-8 248 0v30H-4z', '#FFE0B2') + P('M10 200V110l14-20h18l8 24 16-38h20l10 26 20-40h18l12 30 16-22h18l12 28 14-16 12 20v98z', '#FFFFFF')
      + ring(5, (k) => Lc(`M10 ${118 + k * 16}c40 ${k % 2 ? 6 : -6} 80 ${k % 2 ? -6 : 6} 210 0`, ['#F8BBD0', '#FFAB91', '#E1BEE7', '#FFCC80', '#F48FB1'][k], 8)) + ring(6, (k) => Lc(`M${32 + k * 32} ${100 + (k % 2) * 10}v${70 + (k % 3) * 10}`, '#D7CCC8', 2.5))
      + P('M10 200V110l14-20h18l8 24 16-38h20l10 26 20-40h18l12 30 16-22h18l12 28 14-16 12 20v98z', 'none') + face(120, 150, 0.45)),
  L('threebeauties', 'เทือกเขากูร์วานไซคาน สามสาวงาม', 'Gurvan Saikhan, the Three Beauties mountains', ['gurvan saikhan', 'กูร์วานไซคาน', 'three beauties', 'สามสาวงาม', 'national park', 'อุทยานแห่งชาติ', 'gobi mountains', 'ภูเขาโกบี', 'scenic drive', 'ขับรถชมวิว'],
    'หาภูเขาสามลูกที่ยิ้มอยู่ข้างกัน', 'Find the three mountains smiling side by side',
    // three rounded purple-brown mountains in a row, the middle one tallest, each with a little smile, a pale gravel plain and a dirt track leading towards them
    P('M-4 200c80-10 168-10 248 0v30H-4z', '#F3D9A4') + P('M10 196c10-50 30-80 44-80s34 30 44 80z', '#A1887F') + P('M142 196c10-50 30-80 44-80s34 30 44 80z', '#8D6E63') + P('M60 198c14-80 40-130 60-130s46 50 60 130z', '#9575CD')
      + Lc('M100 100l-10 30M140 96l12 40M36 150l-6 20M200 150l8 20', '#7E57C2', 3) + Lc('M120 230c-4-14 10-20 0-32', '#BCAAA4', 6) + face(54, 160, 0.32) + face(120, 130, 0.45) + face(186, 160, 0.32)),
  L('mirage', 'ภาพลวงตาทะเลสาบกลางทะเลทราย', 'A mirage lake shimmering on the horizon', ['mirage', 'ภาพลวงตา', 'shimmering heat', 'ไอร้อน', 'desert horizon', 'ขอบฟ้าทะเลทราย', 'long drive', 'ขับรถทางไกล', 'gobi', 'โกบี'],
    'หาทะเลสาบที่จริงๆ แล้วไม่มีอยู่จริง', 'Find the lake that is not really there',
    // a flat endless gravel plain with a pretend blue lake floating on the horizon, faraway hills hanging upside down in it, wavy heat lines, a child rubbing their eyes
    P('M-4 140h248v90H-4z', '#F3D9A4') + ring(8, (k) => C(16 + k * 30, 170 + (k % 3) * 16, 3, '#D7B06A', 0)) + P('M10 120c20-14 40-14 60 0 20-10 50-10 70 0 30-12 60-12 90 0z', '#BCAAA4') + P('M10 120c20 14 40 14 60 0 20 10 50 10 70 0 30 12 60 12 90 0z', '#CFD8DC', 2.5)
      + E(120, 132, 110, 10, '#81D4FA', 3) + ring(3, (k) => Lc(`M${30 + k * 70} ${96 - k * 4}c6-6 12 6 18 0s12 6 18 0`, '#FFAB91', 3)) + g(60, 214, 1.1, Lc('M-6-22l4 4M6-22l-4 4', INK, 3) + kid(0, 0, '#43A047')) + face(120, 126, 0.3)),
  L('well', 'บ่อน้ำของคนเลี้ยงสัตว์', "A herder's well and its trough", ['herders well', 'บ่อน้ำคนเลี้ยงสัตว์', 'desert well', 'บ่อน้ำทะเลทราย', 'water trough', 'รางน้ำ', 'nomad life', 'ชีวิตเร่ร่อน', 'gobi', 'โกบี'],
    'หาบ่อน้ำที่มีถังหนังห้อยอยู่', 'Find the well with a leather bucket hanging over it',
    // a round stone-lined well in the gravel with a wooden frame over it, a leather bucket on a rope, a long hollowed-log trough full of water beside it, little bird tracks
    P('M-4 190c80-8 168-8 248 0v40H-4z', '#F3D9A4') + E(80, 176, 40, 14, '#9E9E9E') + E(80, 172, 28, 8, '#4FC3F7', 3) + ring(6, (k) => E(48 + k * 13, 182 + (k % 2) * 2, 7, 5, '#BDBDBD', 2))
      + Lc('M50 172l14-90M110 172l-14-90', '#8D6E63', 7) + Lc('M54 84h52', '#8D6E63', 7) + Lc('M80 84v40', INK, 2) + P('M68 122h24l-4 24h-16z', '#A1673F')
      + R(124, 168, 106, 24, '#A1673F', 10) + R(132, 172, 90, 10, '#4FC3F7', 4, 2.5) + ring(3, (k) => Lc(`M${40 + k * 30} 214l-4-6M${40 + k * 30} 214l4-6M${40 + k * 30} 214v-8`, '#A1887F', 2)) + face(176, 182, 0.3)),
  L('wildonion', 'ทุ่งดอกหอมป่าสีชมพู', 'Wild onions in pink flower', ['wild onion', 'หอมป่า', 'mangir', 'มังกีร์', 'wild chives', 'กุยช่ายป่า', 'desert flowers', 'ดอกไม้ทะเลทราย', 'summer', 'หน้าร้อน'],
    'หาดอกกลมๆ สีชมพูบนก้านยาวผอม', 'Find the round pink pompom flowers on thin stalks',
    // a patch of wild onions on the sandy steppe: round pink pompom flower heads made of tiny star florets on tall thin stalks, grassy leaves at their feet
    P('M-4 204c80-10 168-10 248 0v30H-4z', '#F3D9A4') + [[50, 110], [100, 80], [150, 100], [196, 124], [76, 144], [128, 140]].map(([x, y], k) => Lc(`M${x} ${y}c${k % 2 ? 4 : -4} 40 ${k % 2 ? -4 : 4} 70 0 ${204 - y}`, '#7CB342', 4) + C(x, y, 18 - (k > 3 ? 4 : 0), ['#F48FB1', '#CE93D8'][k % 2]) + ring(7, (j) => C(f(x, j, 0), f(y, j, 1), 3, '#FCE4EC', 0))).join('')
      + ring(10, (k) => Lc(`M${24 + k * 20} 206c${k % 2 ? 6 : -6}-14 ${k % 2 ? 4 : -4}-26 0-36`, '#9CCC65', 3)) + face(100, 80, 0.35)),
  L('saxaulsparrow', 'นกกระจอกแซกซอล', 'A saxaul sparrow on a twig', ['saxaul sparrow', 'นกกระจอกแซกซอล', 'sparrow', 'นกกระจอก', 'desert bird', 'นกทะเลทราย', 'birdwatching', 'ดูนก', 'gobi', 'โกบี'],
    'หานกกระจอกตัวเล็กที่มีผ้ากันเปื้อนสีดำ', 'Find the little sparrow wearing a black bib',
    // a round little sparrow perched on a saxaul twig: a grey cap, a black bib, sandy back with dark streaks, a short cone beak, cheeping
    Lc('M10 180c50-10 120-20 220-10', '#8D7B6A', 8) + ring(4, (k) => g(30 + k * 56, 176 - k * 2, 1, ring(4, (j) => Lc(`M0 0l${-8 + j * 5} ${16 - Math.abs(j - 1.5) * 3}`, '#9CB86A', 3)))) + Lc('M150 150l50 0', '#A1887F', 8)
      + E(120, 128, 46, 40, '#E2C79C') + ring(5, (k) => Lc(`M${118 + k * 9} 100l6 14`, '#6D4C41', 3)) + E(110, 140, 30, 24, '#FAF3E8', 0) + C(100, 88, 30, '#E2C79C') + P('M74 78c6-16 40-20 52-4-16-4-36-2-52 4z', '#9E9E9E') + P('M86 112c6 12 22 12 28 0-8-6-20-6-28 0z', INK, 0)
      + P('M68 92l-12 4 12 5z', '#5D4037', 2.5) + Lc('M108 166v14M128 166v14', '#8D6E63', 4) + face(100, 90, 0.4, 'o')),
  L('tracks', 'ทางล้อรถแยกเป็นร้อยทางในทุ่งกว้าง', 'Wheel tracks fanning out across the plain', ['wheel tracks', 'รอยล้อรถ', 'dirt tracks', 'ทางดิน', 'no roads', 'ไม่มีถนน', 'road trip', 'ขับรถเที่ยว', 'gobi', 'โกบี'],
    'หารอยล้อรถที่แยกออกไปหลายทาง', 'Find the wheel tracks that split into many ways',
    // a flat open plain under a huge sky, many pairs of dusty wheel tracks fanning out in all directions from one spot, a little signpost-free cairn of pebbles, far blue hills
    P('M-4 110c40-10 80-14 120-10s90 0 128 10v14H-4z', '#B39DDB') + P('M-4 120h248v110H-4z', '#F0D49A') + ring(6, (k) => { const a = -0.2 - k * 0.55; return Lc(`M120 214L${(120 + Math.cos(a) * 200).toFixed(1)} ${(214 + Math.sin(a) * 90).toFixed(1)}`, '#D7B06A', 4) + Lc(`M130 214L${(130 + Math.cos(a) * 200).toFixed(1)} ${(214 + Math.sin(a) * 90).toFixed(1)}`, '#D7B06A', 4); })
      + ring(5, (k) => E(60 + k * 30, 170 - (k % 2) * 10, 3, 2, '#A1887F', 0)) + P('M40 70c0-10 16-12 20-4 6-8 22-6 22 4z', '#FFFFFF', 3) + ring(3, (k) => E(124, 208 - k * 8, 10 - k * 2, 5, '#BDBDBD', 2)) + face(124, 200, 0.18, 'none')),
  L('snowdunes', 'หิมะบนเนินทรายในฤดูหนาว', 'Snow on the dunes in winter', ['snow on dunes', 'หิมะบนเนินทราย', 'winter gobi', 'โกบีฤดูหนาว', 'cold desert', 'ทะเลทรายหนาว', 'frost', 'น้ำค้างแข็ง', 'winter trip', 'เที่ยวหน้าหนาว'],
    'หาเนินทรายที่มีหิมะสีขาวคลุมอยู่ด้านบน', 'Find the sand dunes wearing white snow caps',
    // golden dunes with white snow lying in the hollows and on their crests like icing, snowflakes falling from a pale sky, a child in a puffy coat catching one on their tongue
    P('M-4 200c30-70 60-100 100-100s60 50 80 50 40-30 68-40v120H-4z', '#FFCC80') + P('M40 140c20-30 40-40 56-40s30 20 40 30c-30-10-60 0-96 10z', '#FFFFFF', 3) + P('M168 152c20-8 40-20 76-34v14c-30 10-50 20-76 20z', '#FFFFFF', 3) + P('M-4 206c80-12 168-12 248 0v24H-4z', '#FFFFFF')
      + ring(9, (k) => g(20 + k * 26, 30 + (k % 3) * 24, 1, Lc('M-5 0h10M0-5v10M-4-4l8 8M-4 4l8-8', '#B3E5FC', 2.5))) + g(150, 210, 1.2, P('M-12 4v-18c0-6 24-6 24 0v18z', '#E53935', 2) + C(0, -22, 9, '#FFE0BD', 2) + P('M-10-26c0-10 20-10 20 0z', '#1E88E5', 2) + face(0, -21, 0.22, 'o')) + face(96, 128, 0.35)),
  L('tumbleweed', 'ต้นหญ้ากลิ้งตามลม', 'A tumbleweed rolling in the wind', ['tumbleweed', 'หญ้ากลิ้ง', 'rolling plant', 'พืชกลิ้งได้', 'windy day', 'วันลมแรง', 'desert plants', 'พืชทะเลทราย', 'gobi', 'โกบี'],
    'หาก้อนกิ่งไม้กลมๆ ที่กลิ้งไปตามลม', 'Find the round ball of twigs rolling along in the wind',
    // a round tangled ball of dry golden twigs bouncing across the flat desert, little dust puffs where it touched down, curly wind lines behind it
    P('M-4 200c80-8 168-8 248 0v30H-4z', '#F3D9A4') + ring(3, (k) => C(40 + k * 18, 196 - k * 4, 8 - k * 2, '#E8D2A8', 2)) + Lc('M14 110c20-10 30 6 50-4M10 140c24-8 34 8 56 0', '#B3E5FC', 4)
      + C(140, 132, 56, '#E8C27A') + ring(10, (k) => { const a = (k / 10) * Math.PI; return Lc(`M${(140 + Math.cos(a) * 54).toFixed(1)} ${(132 + Math.sin(a) * 54).toFixed(1)}C${(140 + Math.cos(a + 1) * 20).toFixed(1)} ${(132 + Math.sin(a + 1) * 20).toFixed(1)} ${(140 + Math.cos(a + 2) * 30).toFixed(1)} ${(132 + Math.sin(a + 2) * 30).toFixed(1)} ${(140 + Math.cos(a + Math.PI) * 54).toFixed(1)} ${(132 + Math.sin(a + Math.PI) * 54).toFixed(1)}`, '#B8862E', 2.5); })
      + C(140, 132, 56, 'none') + face(140, 128, 0.55)),
  L('beetle', 'ด้วงทะเลทรายเดินบนเนินทราย', 'A desert darkling beetle leaving tiny footprints', ['darkling beetle', 'ด้วงทะเลทราย', 'beetle', 'ด้วง', 'footprints in sand', 'รอยเท้าบนทราย', 'tiny animals', 'สัตว์ตัวจิ๋ว', 'gobi', 'โกบี'],
    'หารอยเท้าเล็กๆ บนทรายแล้วตามไปหาด้วง', 'Follow the tiny footprints in the sand to find the beetle',
    // a shiny round black beetle with long legs strolling over a ripply sand dune, a dotted trail of tiny footprints winding behind it
    P('M-4 120c80-30 160-30 248-10v120H-4z', '#FFCC80') + ring(4, (k) => Lc(`M-4 ${150 + k * 22}c60-12 140-12 248 4`, '#F0A860', 2.5)) + ring(12, (k) => C(20 + k * 9, 210 - Math.sin(k / 2) * 16 - k * 3, 2, '#A1673F', 0))
      + ring(6, (k) => { const x = 126 + (k % 3) * 24, up = k < 3; return Lc(`M${x} ${up ? 140 : 176}l${(k % 3 - 1) * 10} ${up ? -22 : 22}`, INK, 4); })
      + E(150, 158, 40, 30, '#37474F') + Lc('M150 130v56', '#546E7A', 3) + C(108, 158, 16, '#263238') + Lc('M96 146l-12-14M98 170l-14 12', INK, 3) + E(160, 146, 12, 6, '#90A4AE', 0) + face(106, 156, 0.3, 'none')
      .replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('raindrop', 'กุ้งลูกอ๊อดในแอ่งน้ำฝน', 'Tadpole shrimp in a rain pool', ['tadpole shrimp', 'กุ้งลูกอ๊อด', 'rain pool', 'แอ่งน้ำฝน', 'after the rain', 'หลังฝนตก', 'tiny animals', 'สัตว์ตัวจิ๋ว', 'gobi', 'โกบี'],
    'หากุ้งตัวจิ๋วรูปโล่ที่ว่ายในแอ่งน้ำ', 'Find the tiny shield-shaped shrimp swimming in the puddle',
    // a shallow rain puddle in cracked clay ground, little shield-shaped tadpole shrimp with forked tails swimming in it, a small rain cloud moving away
    P('M-4 120h248v110H-4z', '#D7B98A') + ring(8, (k) => Lc(`M${10 + k * 30} ${130 + (k % 2) * 10}l10 20-6 16 14 14`, '#B5946A', 2.5)) + E(120, 176, 100, 40, '#80DEEA')
      + [[80, 170, -20], [140, 160, 15], [150, 196, 160], [96, 196, 200]].map(([x, y, r]) => g(x, y, 1, P('M-14-10c0-10 28-10 28 0 0 12-8 18-14 18s-14-6-14-18z', '#9CCC65', 2.5) + Lc('M-4 8l-4 14M4 8l4 14', INK, 2) + C(-5, -6, 2, INK, 0) + C(5, -6, 2, INK, 0), r)).join('')
      + P('M150 50c0-14 22-18 28-6 8-8 28-6 28 8 8 2 8 14 0 16h-50c-10-2-10-16-6-18z', '#ECEFF1', 3) + ring(3, (k) => Lc(`M${166 + k * 14} 74l-4 12`, '#4FC3F7', 3)) + face(120, 168, 0.3, 'none')),
  L('duneslide', 'ไถลลงเนินทรายยักษ์', 'Sliding down a giant sand dune', ['dune slide', 'ไถลลงเนินทราย', 'sand dune', 'เนินทราย', 'kids fun', 'เด็กๆ สนุก', 'climb the dune', 'ปีนเนินทราย', 'gobi', 'โกบี'],
    'หาเด็กที่ไถลลงเนินทรายจนทรายกระจาย', 'Find the child sliding down the dune in a spray of sand',
    // a steep golden dune with a sharp crest, a child sliding down on their bottom with arms in the air and sand spraying behind, footprints climbing up the other side
    P('M-4 216c40-80 90-170 140-180 30 10 70 90 108 150v40H-4z', '#FFCC80') + P('M136 36c-20 60-30 120-30 180h-20c10-60 30-140 50-180z', '#F0A860', 0) + Lc('M136 36c-20 60-30 120-30 180', '#E69540', 3)
      + ring(5, (k) => E(160 + k * 14, 70 + k * 26, 4, 2.5, '#E69540', 0)) + g(80, 150, 1.1, Lc('M-8-16l-8-14M8-16l8-14', INK, 3) + kid(0, 0, '#1E88E5'), -30) + ring(7, (k) => C(100 + (k % 3) * 10, 120 - k * 6, 3, '#FFE0B2', 1.5)) + face(170, 190, 0.35)),
];
// pompom florets: a ring round the flower head
function f(c, j, axis) { const a = (j / 7) * Math.PI * 2; return +(c + (axis ? Math.sin(a) : Math.cos(a)) * 10).toFixed(1); }

export default {
  places: {
    'mn-gobi': { country: 'mn', wave: 3, name: nm('ทะเลทรายโกบี', 'The Gobi'), tz: 'Asia/Ulaanbaatar', ll: [43.57, 104.43], alias: ['gobi', 'โกบี', 'gobi desert', 'ทะเลทรายโกบี', 'khongoryn els', 'คองโกรีนเอลส์', 'bayanzag', 'บายันซัก', 'flaming cliffs', 'yolyn am', 'yol valley', 'หุบเขาโยล', 'dalanzadgad', 'ดาลันซัดกัด', 'gurvan saikhan', 'กูร์วานไซคาน', 'tsagaan suvarga', 'DLZ'], colors: GB },
  },
  items,
};
