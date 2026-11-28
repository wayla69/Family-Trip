// Wave 17: Toyama and Kurobe (Tateyama Kurobe Alpine Route, Kurobe Dam, Kurobe Gorge, Toyama city, Amaharashi coast, Himi, Tonami) —
// the snow corridor, the dam's spray rainbow, the gorge's little open train, the glass city's museum and canal park, the glowing
// firefly squid, trout sushi in its round box, white shrimp, black ramen, the portram, the ptarmigan, the paper balloons and the
// travelling medicine box, tulips, yellowtail and the castle.
// Skipped as repeats or bans: ropeway and cable car rides (Zermatt, Hakone), the great Buddha of Takaoka and shrines (no sacred
// subjects), snow monkeys (Nagano), hot-spring eggs (Hakone), a brand coffee shop at the canal (no brands), the Gokayama
// houses (already its own place).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const TY = { k1: '#1565C0', k2: '#00897B', k3: '#E1F5FE' };
const CITY = 'jp-toyama', DIR = 'jp/toyama';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a snowy alpine peak: cx, base y, half width, height
const peak = (cx, b, w, h, c = '#78909C') => P(`M${cx - w} ${b}L${cx} ${b - h}L${cx + w} ${b}Z`, c) + P(`M${cx - w * 0.38} ${b - h * 0.62}L${cx} ${b - h}L${cx + w * 0.38} ${b - h * 0.62}L${cx + w * 0.15} ${b - h * 0.5}L${cx - w * 0.1} ${b - h * 0.6}Z`, '#FFFFFF');

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับโทยามะและคุโรเบะ', 'Toyama and Kurobe stamp'), kw: ['toyama', 'โทยามะ', 'kurobe', 'คุโรเบะ', 'tateyama', 'ทาเตยามะ', 'alpine route', 'snow wall', 'กำแพงหิมะ', 'kurobe dam', 'เขื่อนคุโรเบะ'],
    // a smiling snow-capped Tateyama peak over a turquoise dam lake, a little rainbow arching from the spray, the red torokko train on the shore
    svg: cityStamp('ty-st', { name: 'TOYAMA', sub: 'KUROBE · JAPAN', ...TY, emblem: peak(100, 118, 50, 56, '#5C7FA8') + R(46, 118, 108, 20, '#26C6DA', 0, 0) + Lc('M58 128h14M118 130h18', '#E0F7FA', 2.5)
      + Lc('M64 118c10-26 62-26 72 0', '#FF7043', 3) + Lc('M70 118c8-18 52-18 60 0', '#FFEB3B', 3) + R(70, 140, 36, 12, '#E53935', 3, 2.5) + C(78, 154, 3.5, '#455A64', 2) + C(98, 154, 3.5, '#455A64', 2) + face(100, 92, 0.3) }) },

  D('snowwall', 'กำแพงหิมะสูงริมถนนยูกิโนะโอทานิ', 'The towering snow walls of the Yuki-no-Otani corridor', ['yuki-no-otani', 'ยูกิโนะโอทานิ', 'snow corridor', 'snow wall', 'กำแพงหิมะ', 'tateyama kurobe alpine route', 'อัลไพน์รูท', 'murodo', 'มูโรโดะ', 'spring snow', 'หิมะฤดูใบไม้ผลิ', 'walk between snow walls'],
    // a road carved through deep snow, two white walls rising higher than a bus with striped layers of old snow, a blue sky strip above, small children in bright coats walking between them
    scene('ty-d1', '#BBDEFB', peak(120, 110, 90, 70, '#90A4AE') + P('M-4 110L70 70l40 40 40-34 100 34v140H-4z', '#FFFFFF')
      + P('M-4 120c30 0 50 30 60 100H-4z', '#E3F2FD') + P('M244 120c-30 0-50 30-60 100h60z', '#E3F2FD') + Lc('M-4 150c20-4 40-2 56 8M-4 176c14-4 30-2 44 8M244 150c-20-4-40-2-56 8M244 176c-14-4-30-2-44 8', '#B3D4F0', 4)
      + P('M56 224c14-50 22-90 36-104h56c14 14 22 54 36 104z', '#CFD8DC') + Lc('M120 124v12M120 146v18', '#FFFFFF', 4)
      + g(104, 190, 1, R(-9, -26, 18, 28, '#E53935', 7) + C(0, -34, 9, '#FFCCBC', 3) + P('M-9 -36a9 9 0 0 1 18 0z', '#FFD54F', 2.5)) + g(138, 192, 1, R(-9, -26, 18, 28, '#1E88E5', 7) + C(0, -34, 9, '#FFCCBC', 3) + P('M-9 -36a9 9 0 0 1 18 0z', '#FFFFFF', 2.5))
      + R(104, 130, 32, 14, '#FFB300', 4, 3) + face(120, 70, 0.34))),
  D('kurobedam', 'เขื่อนคุโรเบะที่สายน้ำพุ่งออกมาเป็นรุ้งกินน้ำ', 'Kurobe Dam, with its spray rainbow', ['kurobe dam', 'เขื่อนคุโรเบะ', 'dam discharge', 'การระบายน้ำเขื่อน', 'rainbow', 'รุ้งกินน้ำ', 'spray', 'ละอองน้ำ', 'arch dam', 'เขื่อนโค้ง', 'kurobe lake', 'ทะเลสาบคุโรเบะ', 'tateyama'],
    // a huge curved grey concrete wall between green mountains, white water jets arching out of its middle into a misty pool, a bright rainbow over the spray, a viewing platform with tiny visitors
    scene('ty-d2', '#E1F5FE', peak(40, 120, 70, 70, '#5E8F6A') + peak(204, 120, 76, 80, '#4E7F5C') + P('M30 80c60-12 120-12 180 0v60c-60 10-120 10-180 0z', '#B0BEC5') + Lc('M30 92c60-10 120-10 180 0M30 112c60-8 120-8 180 0', '#90A4AE', 2.5)
      + Lc('M92 100c-10 20-8 50 4 70M108 100c-8 24-4 54 8 76M124 100c0 26 6 56 14 76M140 100c8 22 14 50 22 66', '#FFFFFF', 5)
      + E(126, 176, 70, 22, '#80DEEA') + Lc('M70 180c20 8 50 8 80 0', '#FFFFFF', 4) + C(126, 164, 18, '#FFFFFF', 0)
      + Lc('M44 170c20-60 120-80 160-6', '#EF5350', 6) + Lc('M52 170c20-50 108-70 144-6', '#FFB74D', 5) + Lc('M60 170c20-40 96-60 128-6', '#AED581', 5) + Lc('M68 170c20-30 84-50 112-6', '#4FC3F7', 5)
      + R(30, 176, 56, 8, '#8D6E63', 3, 3) + C(44, 168, 4, '#E53935', 2) + C(60, 168, 4, '#1E88E5', 2) + low(204, '#6FA871') + face(120, 56, 0.34))),
  D('amaharashi', 'ชายฝั่งอามาฮาราชิกับเทือกเขาทาเตยามะข้ามทะเล', 'The Amaharashi coast with the Tateyama range across the sea', ['amaharashi', 'อามาฮาราชิ', 'amaharashi coast', 'ชายฝั่งอามาฮาราชิ', 'takaoka', 'ทาคาโอกะ', 'toyama bay', 'อ่าวโทยามะ', 'tateyama range', 'เทือกเขาทาเตยามะ', 'rain clearing coast', 'ทะเลกับภูเขา', 'rock beach'],
    // a calm blue bay with a rocky shore and a pine on a rock in front, a long white-topped mountain wall rising across the water, a little fishing boat, a sunrise glow in the sky
    scene('ty-d3', '#FFE0B2', C(180, 84, 18, '#FFF59D', 0) + P('M-4 100l30-30 20 14 30-34 24 26 22-22 28 30 26-24 30 24 38-20v48H-4z', '#7E9CC4') + P('M-4 100l30-30 20 14 8-8 18 14-12 8z', '#FFFFFF') + P('M96 82l24-26 22 22-12 6z', '#FFFFFF')
      + R(-4, 100, 248, 70, '#4FC3F7') + Lc('M20 120c10-5 20 5 30 0M120 130c10-5 20 5 30 0M170 112c10-5 20 5 30 0', '#E1F5FE', 4)
      + g(150, 140, 1, P('M-22 6h44l-6 10h-32z', '#8D6E63', 3) + Lc('M0 6V-16', '#455A64', 3) + P('M0 -18l16 14H-16z', '#FFFFFF', 3))
      + P('M-4 170c40-20 90-16 130 0 40 16 80 14 118 0v60H-4z', '#78909C') + P('M-4 190c50-16 120-10 160 4s60 4 88-6v50H-4z', '#B0BEC5')
      + R(42, 126, 5, 62, '#6D4C41', 2, 3) + C(34, 122, 14, '#388E3C') + C(56, 120, 14, '#43A047') + C(46, 108, 14, '#2E7D32') + face(120, 148, 0.3))),
  D('fugan', 'คลองฟุกัน สวนริมน้ำกับเรือหลากสี', 'The Fugan Canal and its waterside park', ['fugan canal', 'คลองฟุกัน', 'fugan unga', 'kansui park', 'สวนคันสุย', 'toyama city', 'เมืองโทยามะ', 'canal park', 'สวนริมคลอง', 'sightseeing boat', 'เรือชมเมือง', 'riverside walk', 'tenmonkyo bridge'],
    // a wide pale-blue canal winding through a green park with a white curved footbridge, a little rounded boat with a striped awning, round trees and glass towers of the city far behind, a lamp post
    scene('ty-d4', '#E3F2FD', R(150, 70, 14, 56, '#B3E5FC', 3, 3) + R(170, 54, 16, 72, '#81D4FA', 3, 3) + R(190, 80, 14, 46, '#B3E5FC', 3, 3) + P('M-4 126h248v100H-4z', '#A5D6A7')
      + P('M-4 150c60-16 120-6 170 8s60 22 78 40v30H-4z', '#4FC3F7') + Lc('M30 172c20-8 40-4 60 2M140 190c20-8 36-4 52 6', '#E1F5FE', 4)
      + P('M10 140q106-40 220 0v10q-114-40-220 0z', '#FFFFFF', 3) + Lc('M40 130v18M80 126v18M120 124v18M160 126v18M200 130v18', '#B0BEC5', 3)
      + g(100, 196, 1, P('M-34 0h68l-10 16h-48z', '#FFFFFF', 3.5) + Lc('M-22 0V-18H22V0', '#455A64', 3) + P('M-26 -18h52l-6-10h-40z', '#E53935', 3) + C(0, -4, 6, '#FFCCBC', 3))
      + R(206, 150, 4, 34, '#455A64', 2) + C(208, 146, 7, '#FFF59D', 3) + C(30, 156, 16, '#66BB6A') + C(214, 188, 16, '#66BB6A') + face(120, 92, 0.34))),

  L('torokko', 'รถไฟโทรอกโกะเปิดโล่งข้ามสะพานแดงในหุบเขาคุโรเบะ', 'The open Torokko train on the red bridge of Kurobe Gorge', ['kurobe gorge', 'หุบเขาคุโรเบะ', 'torokko', 'โทรอกโกะ', 'torokko train', 'รถไฟโทรอกโกะ', 'kurobe gorge railway', 'unazuki', 'อุนาซึกิ', 'red bridge', 'สะพานแดง', 'open window train', 'autumn leaves gorge', 'ใบไม้เปลี่ยนสี'],
    'หารถไฟคันเล็กโล่งๆ ที่ข้ามสะพานสีแดง', 'Find the little open train crossing the red bridge',
    // a tiny red-and-orange train with open sides and smiling passengers, crossing a red steel arch bridge over a green gorge, a turquoise river far below
    bg('#E1F5FE') + P('M16 100c30-30 60-20 90 6l-6 60H16zM224 90c-30-20-60-4-80 20l10 60h70z', '#43A047', 0) + low(190, '#26C6DA') + Lc('M40 206c20-5 40 5 60 0', '#E0F7FA', 4)
      + Lc('M30 140q90-50 180 0', '#E53935', 7) + R(24, 138, 192, 7, '#E53935', 2, 3) + Lc('M60 142v-12M92 142v-20M120 142v-24M148 142v-20M180 142v-12', '#E53935', 4)
      + R(62, 98, 104, 32, '#FF7043', 8) + R(66, 92, 96, 8, '#FFAB91', 3, 3) + [76, 102, 128].map((x) => R(x, 104, 20, 20, '#FFF3E0', 4, 3) + C(x + 10, 111, 4, '#FFCCBC', 2)).join('') + C(78, 134, 5, '#455A64', 3) + C(150, 134, 5, '#455A64', 3)
      + face(114, 118, 0.2, 'none') + frame),
  L('glassmuseum', 'พิพิธภัณฑ์ศิลปะแก้วโทยามะกับรูปปั้นแก้วสีสัน', 'The Toyama Glass Art Museum and its colourful glass', ['toyama glass art museum', 'พิพิธภัณฑ์ศิลปะแก้วโทยามะ', 'glass art', 'ศิลปะแก้ว', 'glass museum', 'พิพิธภัณฑ์แก้ว', 'kengo kuma', 'glass city', 'เมืองแก้ว', 'tower of glass', 'colourful glass', 'glass blowing'],
    'หารูปปั้นแก้วใสสีรุ้งหน้าตึก', 'Find the rainbow-coloured glass shape in front of the building',
    // a tall pale building of timber slats and big glass windows, a rainbow-coloured glass sculpture shaped like a drop in front, a glass vase and a little blown-glass fish on the right
    bg('#E3F2FD') + low(178, '#CFD8DC') + R(76, 46, 120, 132, '#ECEFF1', 8) + Lc('M88 54v116M104 54v116M120 54v116M136 54v116M152 54v116M168 54v116M184 54v116', '#CFB997', 4)
      + R(88, 90, 96, 52, '#B3E5FC', 6, 3) + Lc('M120 90v52M152 90v52', '#FFFFFF', 3)
      + P('M52 190c-22-24-4-44 0-70 4 26 22 46 0 70z', '#4FC3F7') + P('M52 190c-12-14-6-30-2-46 12 14 14 32 2 46z', '#CE93D8', 0) + P('M48 170c-4-10 0-20 2-28 6 8 6 20-2 28z', '#FFEB3B', 0) + face(52, 160, 0.2)
      + g(196, 178, 1, P('M-12 0c0-16 24-16 24 0v12h-24z', '#80DEEA', 3) + R(-5, -26, 10, 14, '#B2EBF2', 2, 3)) + E(206, 140, 12, 7, '#F48FB1', 3) + P('M218 140l8-6v12z', '#F48FB1', 3) + C(202, 138, 1.8, INK, 0)),
  L('hotaruika', 'หมึกหิ่งห้อยเรืองแสงสีฟ้าในอ่าวโทยามะ', 'The firefly squid glowing blue in Toyama Bay', ['firefly squid', 'หมึกหิ่งห้อย', 'hotaru ika', 'โฮตารุอิกะ', 'toyama bay', 'อ่าวโทยามะ', 'glowing squid', 'หมึกเรืองแสง', 'namerikawa', 'นาเมริกาวะ', 'bioluminescence', 'เรืองแสงสีฟ้า', 'night sea'],
    'หาหมึกตัวเล็กที่เรืองแสงสีฟ้า', 'Find the tiny squid glowing blue',
    // a dark night sea with a swarm of small round squid with glowing blue belly dots and tentacles, the biggest one smiling in the middle, a few glowing sparkles
    bg('#1A237E') + Lc('M20 60c20-6 40 6 60 0M150 50c20-6 40 6 60 0', '#3949AB', 4) + C(190, 44, 10, '#FFF59D', 0)
      + [[60, 150, 0.6, -12], [180, 160, 0.6, 14], [70, 80, 0.5, 10], [180, 96, 0.5, -10]].map(([x, y, s, r]) => g(x, y, s, P('M-18 -10c0-26 36-26 36 0v22h-36z', '#F8BBD0') + Lc('M-14 14v22M-5 14v26M5 14v26M14 14v22', '#F8BBD0', 5) + C(-8, 6, 4, '#81D4FA', 0) + C(0, 8, 4, '#4FC3F7', 0) + C(8, 6, 4, '#81D4FA', 0) + C(-5, -8, 3, INK, 0) + C(5, -8, 3, INK, 0), r)).join('')
      + g(120, 128, 1.6, P('M-18 -10c0-26 36-26 36 0v22h-36z', '#F8BBD0') + Lc('M-14 14v22M-5 14v26M5 14v26M14 14v22', '#F8BBD0', 5) + C(-9, 5, 3.5, '#4FC3F7', 0) + C(9, 5, 3.5, '#4FC3F7', 0) + face(0, -4, 0.38, 'smile'))
      + [[40, 112], [210, 128], [120, 60], [96, 200], [150, 196]].map(([x, y]) => C(x, y, 3, '#4FC3F7', 0)).join('')),
  L('masuzushi', 'ข้าวปลาเทราต์กดในกล่องไม้กลมมาซึซูชิ', 'Masu-zushi, trout pressed sushi in its round wooden box', ['masu zushi', 'masuzushi', 'มาซึซูชิ', 'trout sushi', 'ซูชิปลาเทราต์', 'pressed sushi', 'ซูชิกด', 'bamboo leaf', 'ใบไผ่', 'toyama bento', 'เบนโตะโทยามะ', 'ekiben', 'round box'],
    'หาซูชิปลาสีส้มในกล่องไม้กลม', 'Find the orange-pink fish sushi in the round wooden box',
    // a round pale wooden box with a green bamboo leaf lining and a pressed pink trout sushi cut in wedges, a wooden lid strip behind
    E(120, 170, 86, 22, '#E0E0E0', 0) + R(36, 112, 168, 60, '#E8C98A', 12) + E(120, 112, 84, 22, '#D4AE6A') + E(120, 110, 70, 16, '#7CB342')
      + E(120, 104, 58, 12, '#FFAB91') + Lc('M80 100l40 8M160 100l-40 8M120 92v16M96 96l24 12M144 96l-24 12', '#FFF3E0', 3)
      + R(64, 64, 112, 14, '#D4AE6A', 5, 3) + Lc('M60 150h120', '#C49A5A', 3) + C(190, 130, 8, '#F8BBD0', 3) + face(120, 144, 0.4)),
  L('shiroebi', 'กุ้งขาวใสตัวเล็กแห่งอ่าวโทยามะ', 'The see-through white shrimp of Toyama Bay', ['white shrimp', 'กุ้งขาว', 'shiro ebi', 'ชิโรเอบิ', 'toyama bay', 'อ่าวโทยามะ', 'jewel of toyama bay', 'อัญมณีแห่งอ่าวโทยามะ', 'kakiage', 'คากิอาเงะ', 'shrimp tempura', 'transparent shrimp', 'กุ้งโปร่งใส'],
    'หากุ้งตัวใสสีชมพูอ่อน', 'Find the clear pale-pink shrimp',
    // a curled shrimp with a clear pearly pink body and a tiny black eye on a dark plate, smiling, a round golden shrimp tempura cake and a lemon wedge beside
    E(120, 176, 90, 22, '#37474F', 0) + E(120, 170, 86, 18, '#546E7A') + E(70, 118, 36, 34, '#FFCC80') + Lc('M52 100l8 10M70 94l2 14M88 100l-4 10M54 128l12-4M80 132l10 4', '#FFA726', 4) + E(70, 118, 14, 8, '#FFE0B2', 0)
      + g(150, 142, 1.2, Lc('M-34 8c-6-30 30-42 44-24 8 12-4 24-16 22', '#FFD6E0', 14) + Lc('M-34 8c-6-30 30-42 44-24 8 12-4 24-16 22', '#FCE4EC', 8) + Lc('M-34 8l-10 6M-34 8l-6 10', '#F8BBD0', 3) + C(-26, -8, 2.5, INK, 0) + Lc('M12 -14l12-8M14 -10l16-2', '#F8BBD0', 2.5))
      + g(172, 168, 1, P('M-16 0l32-10 4 18z', '#FFEB3B', 3) + Lc('M-8 -2l16 -4', '#FFF59D', 2)) + face(150, 150, 0.26, 'smile')),
  L('blackramen', 'ราเมนโทยามะซุปสีดำเข้มรสซีอิ๊ว', 'Toyama black ramen in its dark soy broth', ['toyama black ramen', 'ราเมนดำโทยามะ', 'black ramen', 'ราเมนซุปดำ', 'dark soy broth', 'ซุปซีอิ๊วเข้ม', 'black pepper', 'พริกไทยดำ', 'menma', 'เมนมะ', 'noodle bowl', 'ชามราเมน'],
    'หาชามราเมนที่น้ำซุปดำสนิท', 'Find the ramen bowl with the pitch-black soup',
    // a deep bowl of almost black soy broth, wavy noodles, thick slices of pork, bamboo shoots and black pepper on top, chopsticks resting on the edge, steam
    P('M30 112h180c0 50-40 84-90 84s-90-34-90-84z', '#FFFFFF') + Lc('M38 132c26 10 52 10 82 0s56-10 82 0', '#C62828', 4) + E(120, 112, 90, 20, '#2B2B2F') + E(120, 114, 80, 14, '#3A3A40', 0)
      + Lc('M62 112c10-8 20 8 30 0s20 8 30 0 20 8 30 0', '#FFE082', 6) + E(86, 106, 22, 10, '#F8BBD0', 3) + Lc('M72 106h28', '#E57373', 2) + E(140, 108, 20, 9, '#F8BBD0', 3) + Lc('M126 108h28', '#E57373', 2)
      + P('M110 98l18 0-6 12z', '#D7CCC8', 2.5) + [[96, 96], [118, 92], [134, 98]].map(([x, y]) => C(x, y, 2, INK, 0)).join('') + Lc('M180 56l-60 56M192 62l-60 52', '#8D6E63', 5)
      + Lc('M80 70c-6-10 6-16 0-26M120 62c-6-10 6-16 0-26', '#CFD8DC', 4) + face(120, 160, 0.42)),
  L('portram', 'รถรางพอร์ตแทรมสีสดวิ่งกลางเมืองโทยามะ', 'The brightly coloured Portram running through Toyama', ['portram', 'พอร์ตแทรม', 'toyama tram', 'รถรางโทยามะ', 'light rail', 'ไลท์เรล', 'toyama light rail', 'low-floor tram', 'รถรางพื้นเตี้ย', 'city tram', 'tram stop', 'ป้ายรถราง'],
    'หารถรางที่ทาสีฟ้าเขียวเหลือง', 'Find the tram painted blue, green and yellow',
    // a smooth low modern tram in blue, green and yellow stripes with a big smiling windscreen, overhead wire, rails set in the street, a Tateyama peak small behind
    bg('#E1F5FE') + peak(176, 110, 56, 54, '#7FA2C8') + low(172, '#B0BEC5') + Lc('M16 66h208', '#455A64', 2.5) + Lc('M110 66v24', '#455A64', 3) + P('M96 90h28l-4 8h-20z', '#455A64', 3)
      + R(28, 96, 184, 64, '#FFFFFF', 18) + R(28, 134, 184, 10, '#1E88E5', 0, 3) + R(28, 144, 184, 8, '#43A047', 0, 3) + R(28, 152, 184, 6, '#FDD835', 0, 3)
      + [46, 84, 122].map((x) => R(x, 104, 30, 22, '#B3E5FC', 6, 3)).join('') + P('M164 104h30c8 0 14 6 14 14v10h-44z', '#B3E5FC', 3) + face(180, 122, 0.2, 'none') + C(206, 140, 4, '#FFF59D', 2)
      + C(60, 164, 8, '#455A64', 3) + C(170, 164, 8, '#455A64', 3) + Lc('M16 186h208', '#78909C', 4) + frame),
  L('raichou', 'นกไรโจว่าที่ภูเขาทาเตยามะในขนสีขาวฤดูหนาว', 'The ptarmigan of Mount Tateyama', ['ptarmigan', 'นกไรโจ', 'raicho', 'ไรโจ', 'rock ptarmigan', 'tateyama bird', 'นกประจำภูเขา', 'alpine bird', 'นกแห่งขุนเขา', 'murodo', 'มูโรโดะ', 'alpine meadow', 'bird of the snow', 'นกสีขาว'],
    'หานกกลมสีขาวบนหินสูง', 'Find the round white bird on the high rock',
    // a plump round ptarmigan in speckled brown and white feathers with a red patch over its eye, standing on a grey rock, small alpine flowers, a snow slope behind
    bg('#E3F2FD') + peak(170, 130, 70, 76, '#90A4AE') + low(180, '#A5D6A7') + P('M40 188c10-30 90-30 120 0z', '#90A4AE')
      + E(104, 138, 46, 40, '#FFFFFF') + P('M64 140c10-14 36-14 46-4-10 6-24 12-46 4z', '#BCAAA4', 2.5) + C(76, 108, 22, '#FFFFFF') + P('M56 108c0-22 38-22 40 0-14-6-26-6-40 0z', '#8D6E63', 2.5)
      + P('M54 112l-12 4 12 6z', '#FFB300', 3) + R(68, 98, 16, 5, '#E53935', 2, 2.5) + C(70, 112, 3, INK, 0) + Lc('M94 176v10M114 176v10', '#F48FB1', 4)
      + [[160, 188], [190, 192], [30, 196]].map(([x, y]) => C(x, y, 4, '#FFEB3B', 2.5) + C(x, y, 1.5, '#F57F17', 0)).join('') + face(110, 148, 0.3, 'none') + frame),
  L('kamifusen', 'ลูกโป่งกระดาษคามิฟุเซ็นของเล่นเด็กโทยามะ', 'Kamifusen, the paper balloons of Toyama', ['kamifusen', 'คามิฟุเซ็น', 'paper balloon', 'ลูกโป่งกระดาษ', 'toyama toy', 'ของเล่นโทยามะ', 'paper toy', 'ของเล่นกระดาษ', 'medicine seller gift', 'ของฝากจากพ่อค้ายา', 'washi', 'วาชิ', 'colourful balloon'],
    'หาลูกโป่งกระดาษที่เป่าให้พองได้', 'Find the paper balloon you blow up',
    // four round paper balloons in red, yellow, green and blue with painted dots, one smiling at the front, thin strings tied together, the folded flat balloon packet below
    bg('#FFF8E1') + Lc('M70 110l40 84M104 94l6 100M138 106l-26 88M170 120l-56 74', '#8D6E63', 2.5) + [[70, 92, 30, '#EF5350'], [172, 100, 28, '#42A5F5'], [104, 70, 30, '#FFD54F'], [136, 90, 30, '#66BB6A']].map(([x, y, r, c]) => E(x, y, r, r * 1.1, c) + P(`M${x - 5} ${y + r * 1.1}l5 8 5-8z`, c, 2.5) + C(x - r * 0.4, y - r * 0.4, 4, '#FFFFFF', 0)).join('')
      + C(66, 92, 4, '#FFEBEE', 0) + C(176, 108, 4, '#E3F2FD', 0) + C(142, 98, 4, '#F1F8E9', 0) + face(104, 80, 0.4) + R(86, 196, 50, 22, '#FFFFFF', 4, 3) + Lc('M92 204h38M92 210h26', '#EF5350', 3) + frame),
  L('buri', 'ปลาบุริเหลืองหางเหลืองเมืองฮิมิ', 'Buri, the yellowtail of Himi', ['buri', 'บุริ', 'yellowtail', 'ปลาหางเหลือง', 'himi', 'ฮิมิ', 'himi buri', 'winter yellowtail', 'ปลาบุริฤดูหนาว', 'fish market', 'ตลาดปลา', 'fisherman wharf', 'sashimi', 'ซาชิมิ'],
    'หาปลาตัวอ้วนที่มีแถบเหลืองข้างตัว', 'Find the fat fish with the yellow stripe along its side',
    // a plump silver-blue fish with a bright yellow stripe along its side and a yellow tail, smiling, a wooden fish-market crate under it, splashes of blue wave behind
    bg('#E1F5FE') + Lc('M30 66c20-8 40 8 60 0M140 56c20-8 40 8 60 0', '#81D4FA', 5) + R(40, 168, 160, 40, '#D4AE6A', 6) + Lc('M40 184h160M40 198h160M80 168v40M120 168v40M160 168v40', '#B8935A', 3)
      + P('M36 120c0-30 60-50 120-46 20 2 30 16 38 30 6 12 6 22 0 32-8 14-18 28-38 30-60 4-120-16-120-46z', '#78A8C8') + P('M36 120c20 16 80 28 140 6-10 14-24 30-40 32-50 6-100-12-100-38z', '#EEF6FB', 0)
      + Lc('M44 118c40 8 100 6 146-8', '#FDD835', 8) + P('M194 104l32-18-6 36 6 34-32-14z', '#FDD835') + C(70, 108, 6, '#FFFFFF', 3) + C(70, 108, 2.5, INK, 0) + P('M100 100c10-8 22-8 30-2-8 6-20 8-30 2z', '#5C86A8', 2.5) + face(110, 124, 0.3, 'smile') + frame),
  L('toyamacastle', 'ปราสาทโทยามะสีขาวเล็กๆ ริมคูน้ำ', 'The little white Toyama Castle by its moat', ['toyama castle', 'ปราสาทโทยามะ', 'jonai park', 'สวนโจไน', 'moat', 'คูน้ำ', 'cherry blossom castle', 'ซากุระปราสาท', 'matsukawa river', 'white keep', 'ปราสาทสีขาว', 'little castle'],
    'หาปราสาทเล็กสีขาวหลังคาเขียว', 'Find the little white castle with the green roof',
    // a small white two-roofed keep with green tile roofs on a grey stone wall, a moat in front with a stone bridge, two pink cherry trees either side
    bg('#E1F5FE') + low(170, '#A5D6A7') + R(30, 160, 180, 22, '#4FC3F7', 0) + Lc('M50 172h20M150 174h26', '#E1F5FE', 3) + P('M54 160l12-34h108l12 34z', '#B0BEC5') + Lc('M62 146h116M70 134h100', '#90A4AE', 3)
      + R(80, 82, 80, 44, '#FFFFFF', 3) + P('M68 84l52-24 52 24z', '#2E7D32') + R(96, 54, 48, 28, '#FFFFFF', 3) + P('M90 56l30-24 30 24z', '#2E7D32') + Lc('M120 32v-10', INK, 3)
      + R(92, 96, 14, 14, '#90CAF9', 2, 3) + R(134, 96, 14, 14, '#90CAF9', 2, 3) + R(114, 62, 12, 12, '#90CAF9', 2, 3) + P('M100 182c0-14 40-14 40 0z', '#9E9E9E', 3) + face(120, 114, 0.26)
      + C(36, 120, 26, '#F8BBD0') + C(204, 122, 26, '#F48FB1') + R(33, 130, 6, 30, '#8D6E63', 2, 2.5) + R(201, 132, 6, 28, '#8D6E63', 2, 2.5)),
  L('tulips', 'ทุ่งทิวลิปหลากสีที่โทนามิ', 'The tulip fields of Tonami', ['tonami tulip fair', 'ทุ่งทิวลิปโทนามิ', 'tonami', 'โทนามิ', 'tulip', 'ทิวลิป', 'tulip field', 'ทุ่งดอกไม้', 'spring flowers', 'ดอกไม้ฤดูใบไม้ผลิ', 'tulip bulbs', 'หัวทิวลิป', 'tateyama backdrop', 'flower rows'],
    'หาทิวลิปที่ยิ้มอยู่แถวหน้าสุด', 'Find the smiling tulip in the very front row',
    // stripes of tulips in red, yellow, pink and white running to the horizon, a snowy Tateyama wall across the sky, a smiling red tulip in front with green leaves
    bg('#E1F5FE') + peak(70, 100, 70, 52, '#7FA2C8') + peak(170, 100, 66, 44, '#8DB0D4') + low(98, '#9CCC65')
      + [['#EF5350', 118], ['#FFEE58', 134], ['#F48FB1', 150], ['#FFFFFF', 166]].map(([c, y]) => Lc(`M16 ${y}h208`, c, 10)).join('')
      + P('M96 214c-6-30-4-60 6-80 6 20 8 52-6 80z', '#43A047') + P('M144 214c6-30 4-60-6-80-6 20-8 52 6 80z', '#43A047') + R(118, 148, 5, 66, '#388E3C', 2, 2.5)
      + P('M96 140c0-30 8-40 24-40s24 10 24 40c0 18-10 26-24 26s-24-8-24-26z', '#E53935') + P('M96 112l10 14 14-18 14 18 10-14c-6-16-14-20-24-20s-18 4-24 20z', '#EF5350', 2.5) + face(120, 140, 0.32) + frame),
  L('mikurigaike', 'สระมิคุริงาอิเกะที่สะท้อนภูเขาหิมะ', 'Mikurigaike pond mirroring the snowy peaks', ['mikurigaike', 'มิคุริงาอิเกะ', 'mountain pond', 'สระบนภูเขา', 'mirror pond', 'สระเงา', 'reflection', 'เงาสะท้อน', 'murodo plateau', 'ที่ราบมูโรโดะ', 'volcanic crater lake', 'alpine lake', 'boardwalk'],
    'หาภูเขาหิมะที่กลับหัวอยู่ในน้ำ', 'Find the snowy mountain upside down in the water',
    // a round deep-blue crater pond with an upside-down reflection of a white-topped peak, a boardwalk edging it, little alpine pines and a red-jacketed child waving
    bg('#BBDEFB') + peak(120, 106, 80, 66, '#78909C') + E(50, 44, 22, 8, '#FFFFFF', 0) + E(190, 54, 20, 7, '#FFFFFF', 0) + P('M16 106h208v30H16z', '#A5D6A7', 0)
      + E(120, 164, 94, 44, '#1E88E5') + P('M52 150l68 54 68-54z', '#5C7FA8', 0) + P('M92 170l28 30 28-30z', '#FFFFFF', 0) + Lc('M48 164c30 6 100 6 144 0', '#90CAF9', 3)
      + Lc('M30 188c50 22 130 22 180 0', '#A1887F', 6) + [[36, 146], [204, 144], [60, 130]].map(([x, y]) => P(`M${x - 8} ${y + 14}l8-24 8 24z`, '#2E7D32', 3)).join('')
      + g(196, 180, 1, R(-7, -18, 14, 20, '#E53935', 5) + C(0, -26, 8, '#FFCCBC', 3) + Lc('M-7 -14l-8-8', '#E53935', 4)) + face(120, 70, 0.3) + frame),
  L('kusuribako', 'กล่องยาของพ่อค้าเร่โทยามะกับห่อผ้าสีคราม', 'The travelling medicine seller’s box of Toyama', ['medicine box', 'กล่องยา', 'toyama medicine', 'ยาโทยามะ', 'travelling medicine seller', 'พ่อค้ายาเร่', 'okigusuri', 'โอกิกุสุริ', 'first aid box', 'กล่องปฐมพยาบาล', 'wooden drawer box', 'ลิ้นชักไม้', 'indigo cloth'],
    'หากล่องไม้ที่มีลิ้นชักเล็กๆ ใส่ยา', 'Find the wooden box with little drawers',
    // a small wooden drawer box with a rope handle on an indigo cloth wrap, its smiling front drawer pulled out holding little white packets with red crosses, a red paper balloon beside
    R(52, 154, 136, 14, '#C49A5A', 4, 3) + R(56, 70, 128, 86, '#E3B873', 8) + Lc('M56 98h128M56 126h128', '#B8935A', 3)
      + R(68, 134, 104, 32, '#EEDCAB', 6) + R(96, 142, 48, 6, '#8D6E63', 3, 2.5) + [78, 108, 138].map((x) => R(x, 74, 24, 18, '#FFFFFF', 3, 2.5) + Lc(`M${x + 12} 78v10M${x + 7} 83h10`, '#E53935', 2.5)).join('')
      + R(80, 100, 26, 10, '#FFFFFF', 2, 2.5) + R(134, 102, 26, 10, '#FFFFFF', 2, 2.5) + Lc('M60 60c30-22 90-22 120 0', '#6D4C41', 4) + R(54, 168, 132, 30, '#3949AB', 8) + Lc('M70 176h100M70 186h100', '#7986CB', 3)
      + g(206, 170, 1, E(0, 0, 14, 16, '#EF5350') + P('M-4 15l4 6 4-6z', '#EF5350', 2.5) + Lc('M0 21v10', '#8D6E63', 2.5)) + face(120, 122, 0.26)),
  L('trolleybus', 'รถบัสไฟฟ้าที่วิ่งในอุโมงค์ภูเขาทาเตยามะ', 'The electric trolley bus in the Tateyama tunnel', ['tateyama tunnel trolley bus', 'รถบัสไฟฟ้าทาเตยามะ', 'trolley bus', 'รถบัสไฟฟ้า', 'tunnel bus', 'รถบัสอุโมงค์', 'daikanbo', 'ไดคันโบ', 'electric bus', 'อุโมงค์ใต้ภูเขา', 'alpine tunnel', 'mountain tunnel'],
    'หารถบัสสีส้มที่วิ่งในอุโมงค์', 'Find the orange bus running in the tunnel',
    // a round-topped mountain tunnel mouth of grey rock with a snowy slope above, a chunky orange-and-white electric bus with two overhead pole arms coming out smiling, cables above
    bg('#E3F2FD') + peak(120, 104, 100, 64, '#90A4AE') + P('M16 120h208v30H16z', '#B0BEC5', 0) + P('M40 224V150c0-60 160-60 160 0v74z', '#546E7A') + P('M64 224V156c0-44 112-44 112 0v68z', '#263238')
      + Lc('M64 106l24-30M176 106l-24-30', '#455A64', 3) + Lc('M30 74h180', '#455A64', 2.5) + R(70, 150, 100, 52, '#FF9800', 12) + R(70, 176, 100, 8, '#FFFFFF', 0, 3) + R(80, 156, 24, 16, '#B3E5FC', 4, 3) + R(110, 156, 24, 16, '#B3E5FC', 4, 3) + R(140, 156, 20, 16, '#B3E5FC', 4, 3)
      + Lc('M100 150l12-36M140 150l-12-36', '#455A64', 3) + C(86, 204, 8, '#37474F', 3) + C(154, 204, 8, '#37474F', 3) + face(120, 180, 0.22, 'none') + C(76, 192, 4, '#FFF59D', 2) + C(164, 192, 4, '#FFF59D', 2) + frame),
];

export default {
  places: {
    'jp-toyama': { country: 'jp', wave: 3, name: nm('โทยามะและคุโรเบะ', 'Toyama and Kurobe'), tz: 'Asia/Tokyo', ll: [36.7, 137.21],
      alias: ['toyama', 'โทยามะ', '富山', '富山市', 'kurobe', 'คุโรเบะ', '黒部', 'kurobe dam', 'เขื่อนคุโรเบะ', 'kurobe gorge', 'หุบเขาคุโรเบะ', 'unazuki', 'อุนาซึกิ', 'tateyama', 'ทาเตยามะ', '立山',
        'tateyama kurobe alpine route', 'alpine route', 'อัลไพน์รูท', 'murodo', 'มูโรโดะ', 'yuki-no-otani', 'ยูกิโนะโอทานิ', 'amaharashi', 'อามาฮาราชิ', 'takaoka', 'ทาคาโอกะ', '高岡', 'himi', 'ฮิมิ', '氷見',
        'tonami', 'โทนามิ', 'fugan canal', 'คลองฟุกัน', 'toyama bay', 'อ่าวโทยามะ', 'portram', 'พอร์ตแทรม'],
      colors: TY },
  },
  items,
};
