// Wave 12, group kz (2 of 3): Almaty, its mountains and the parks round it (Big Almaty Lake, Charyn, Kolsai, Kaindy,
// Altyn-Emel) — no cable car, no skating rink or ski slope, no market, no apples, no petroglyphs, the cathedral as a building only
// with no crosses or icons (docs/STOCK-ART.md §8)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const L = (key, th, en, kw, sth, sen, svg) => ({ id: `kz-almaty.landmark.${key}`, cat: 'landmark', file: `kz/almaty/landmark-${key}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (key, th, en, kw, sky, svg) => ({ id: `kz-almaty.day.${key}`, cat: 'day', file: `kz/almaty/day-${key}.v1.svg`, name: nm(th, en), kw, svg: scene(`kzal-${key}`, sky, svg) });
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
// a Tian Shan spruce: tall and narrow like a pencil, layered (x, foot y, height)
const spruce = (x, y, h, fill = '#2E7D32', sw) => P(`M${x} ${y - h}l${h * 0.1} ${h * 0.3}h-${h * 0.04}l${h * 0.1} ${h * 0.3}h-${h * 0.05}l${h * 0.12} ${h * 0.4}h-${h * 0.56}l${h * 0.12}-${h * 0.4}h-${h * 0.05}l${h * 0.1}-${h * 0.3}h-${h * 0.04}z`, fill, sw);
// a snowy ridge: grey rock with white caps on the peaks
const peaks = (d, snow, fill = '#90A4AE') => P(d, fill) + snow.map((s) => P(s, '#FFFFFF', 3)).join('');
const AL = { k1: '#00796B', k2: '#E65100', k3: '#E0F2F1' };

const items = [
  { id: 'kz-almaty.stamp', cat: 'stamp', file: 'kz/almaty/stamp.v1.svg', name: nm('ตราประทับอัลมาตี', 'Almaty stamp'), kw: ['almaty', 'อัลมาตี', 'tian shan', 'เทียนชาน', 'alatau', 'อาลาเตา'],
    // three snowy peaks of the Alatau with a tall thin spruce in front
    svg: cityStamp('kzal-st', { name: 'ALMATY', sub: 'KAZAKHSTAN', ...AL, emblem: peaks('M50 136l28-44 12 14 22-42 24 38 12-12 22 46z', ['M100 82l12-18 12 18-6-3-6 5-6-5z', 'M70 104l8-12 6 8-4-1-4 4z']) + spruce(68, 140, 46, '#2E7D32', 2.5) + spruce(140, 140, 34, '#43A047', 2.5) }) },
  D('city', 'อัลมาตีใต้ภูเขาหิมะ', 'Almaty under the snowy mountains', ['almaty', 'อัลมาตี', 'city view', 'วิวเมือง', 'alatau mountains', 'เทือกเขาอาลาเตา', 'green city', 'เมืองสีเขียว', 'tree-lined streets', 'ถนนร่มรื่น'], '#BBDEFB',
    // a green city of low roofs and round trees at the foot of a wall of snowy mountains, one tall slim building with a gold crown, a round green hill
    peaks('M-4 120l34-48 16 14 30-56 28 40 22-24 32 50 30-30 36 50v20H-4z', ['M66 30l14 20-8-3-6 6-6-6-8 2z', 'M30 72l8 10-6-1-4 3z', 'M126 66l10 12-5-2-5 3-5-3z', 'M188 64l10 12-6-2-4 3-4-3z']) + P('M-4 128c40-14 80-14 120-4s80 12 128-2v30H-4z', '#81C784')
      + P('M178 128c10-26 40-26 56 0z', '#66BB6A')
      + [[18, 150, 26, '#FFCC80'], [46, 146, 30, '#FFAB91'], [80, 152, 24, '#FFE082'], [146, 148, 28, '#B3E5FC'], [176, 152, 30, '#FFCC80'], [210, 150, 28, '#CE93D8']].map(([x, y, w, c]) => R(x - w / 2, y, w, 40, c, 0, 3) + R(x - w / 2 + 5, y + 8, 6, 8, '#FFFFFF', 0, 2)).join('')
      + R(102, 74, 26, 116, '#ECEFF1') + ring(6, (k) => Lc(`M108 ${88 + k * 16}h14`, '#90A4AE', 3)) + P('M100 74l4-14 7 8 4-12 4 12 7-8 4 14z', '#FFCA28', 3)
      + P('M-4 182c40-10 80 0 120-4s80-10 128 0v70H-4z', '#66BB6A') + ring(9, (k) => C(6 + k * 29, 186 - (k % 2) * 6, 13, ['#43A047', '#2E7D32'][k % 2], 3)) + Lc('M-4 214h248', '#BDBDBD', 10)),
  D('kolsai', 'ทะเลสาบโคลไซในหุบเขาสน', 'The Kolsai lakes in a valley of spruces', ['kolsai lakes', 'ทะเลสาบโคลไซ', 'kolsai', 'โคลไซ', 'saty', 'หมู่บ้านซาตึ', 'mountain lake', 'ทะเลสาบบนภูเขา', 'spruce forest', 'ป่าสน', 'hiking', 'เดินป่า'], '#B3E5FC',
    // a deep blue lake filling a steep valley, both slopes covered in tall dark spruces, a snowy peak at the end, a little wooden jetty with a kid on it
    peaks('M70 120l50-80 50 80z', ['M120 40l14 22-7-3-7 6-7-6-7 3z']) + P('M-4 40c40 20 80 60 110 100H-4z', '#558B2F') + P('M244 50c-40 20-80 50-110 90h110z', '#689F38')
      + [[10, 70, 40], [30, 90, 44], [52, 108, 40], [76, 126, 30], [8, 120, 46], [34, 136, 40], [228, 76, 40], [206, 96, 42], [184, 112, 36], [162, 128, 28], [232, 126, 44], [210, 138, 38]].map(([x, y, h], k) => spruce(x, y, h, ['#1B5E20', '#2E7D32', '#33691E'][k % 3], 2.5)).join('')
      + P('M-4 136c60-6 188-6 248 0v114H-4z', '#1565C0') + [[40, 140, 30], [74, 140, 22], [170, 140, 24], [204, 140, 30]].map(([x, y, h]) => `<g opacity=".35">${P(`M${x} ${y}l${h * 0.25} ${h}h-${h * 0.5}z`, '#1B5E20', 0)}</g>`).join('')
      + Lc('M30 176c20-4 40 4 60 0M140 196c20-4 40 4 60 0M60 220c20-4 40 4 60 0', '#64B5F6', 3) + R(100, 178, 60, 8, '#A1673F', 2, 3) + Lc('M108 186v16M152 186v16', '#8D6E63', 4) + kid(130, 178, '#FF7043', 0.9)),
  L('bigalmatylake', 'ทะเลสาบบิ๊กอัลมาตีสีฟ้าอมเขียว', 'The turquoise Big Almaty Lake', ['big almaty lake', 'ทะเลสาบบิ๊กอัลมาตี', 'turquoise lake', 'ทะเลสาบสีฟ้าอมเขียว', 'mountain lake', 'ทะเลสาบบนภูเขา', 'big almaty peak', 'ยอดเขาบิ๊กอัลมาตี', 'day trip', 'reflection'], 'หายอดเขาแหลมที่มีเงาสะท้อนอยู่ในน้ำ', 'Find the pointy peak reflected in the water',
    // a milky turquoise lake in a bowl of mountains, a sharp pyramid peak behind it mirrored in the water, spruces on the shore
    sky('#E1F5FE') + peaks('M-4 130l40-50 30 30 54-82 54 82 30-30 40 50z', ['M124 28l18 28-9-4-9 7-9-7-9 4z', 'M36 80l10 12-5-2-5 4-5-4-4 2z']) + P('M-4 128c40-6 210-6 248 0v20H-4z', '#7CB342')
      + P('M6 146c50-12 178-12 228 0 6 24-30 50-114 50S0 170 6 146z', '#4DD0E1') + `<g opacity=".4">${P('M78 150l46 40 46-40z', '#B0BEC5', 0)}</g>` + Lc('M40 160h30M150 172h40M90 184h30', '#E0F7FA', 3)
      + [[14, 150, 44], [32, 154, 34], [214, 150, 46], [196, 154, 32]].map(([x, y, h]) => spruce(x, y, h, '#2E7D32')).join('') + face(120, 168, 0.45)),
  L('charyn', 'หุบผาชารินกับเสาหินรูปปราสาท', "Charyn Canyon's castle rocks", ['charyn canyon', 'แคนยอนชาริน', 'valley of castles', 'หุบเขาปราสาท', 'red rocks', 'หินสีแดง', 'rock towers', 'เสาหิน', 'charyn river', 'แม่น้ำชาริน'], 'หาเสาหินที่ยอดเหมือนป้อมปราสาท', 'Find the rock tower with a top like a castle',
    // tall red-orange rock pillars standing in a row like castle towers with knobbly turret tops and stripes of layers, a sandy path between them with a little hiker
    sky('#FFF3E0') + [[30, 70, 34, '#E64A19'], [74, 44, 40, '#FF7043'], [124, 60, 36, '#F4511E'], [170, 36, 42, '#FF8A65'], [212, 74, 34, '#E64A19']].map(([x, y, w, c]) => P(`M${x - w / 2} 200V${y + 14}l6-8v-8h8v6h${w / 2 - 14}v-12h8v12h${w / 2 - 14}v-6h8v8l6 8V200z`, c)
      + Lc(`M${x - w / 2 + 3} ${y + 40}h${w - 6}M${x - w / 2 + 3} ${y + 72}h${w - 6}M${x - w / 2 + 3} ${y + 104}h${w - 6}`, '#BF360C', 3)).join('')
      + P('M-4 196c60-8 188-8 248 0v50H-4z', '#FFCC80') + Lc('M60 236c20-20 60-30 120-36', '#FFE0B2', 8) + kid(120, 214, '#29B6F6', 0.9) + face(170, 110, 0.45)),
  L('kaindy', 'ทะเลสาบไคน์ดีกับป่าจมน้ำ', "Kaindy Lake's sunken forest", ['kaindy lake', 'ทะเลสาบไคน์ดี', 'sunken forest', 'ป่าจมน้ำ', 'tree trunks in water', 'ต้นไม้โผล่น้ำ', 'turquoise water', 'น้ำสีฟ้า', 'kolsai', 'tian shan spruce'], 'นับตอไม้ที่โผล่ขึ้นมาจากน้ำ', 'Count the tree trunks sticking up out of the water',
    // bare grey spruce trunks rising straight out of a still turquoise lake, their broken tips pointing at the sky, dark spruce slopes behind
    sky('#E0F7FA') + P('M-4 120c30-50 80-70 124-60s70 10 124 60z', '#558B2F') + [[20, 120, 50], [46, 116, 56], [196, 118, 52], [222, 122, 48], [70, 110, 40], [174, 112, 40]].map(([x, y, h]) => spruce(x, y, h, '#1B5E20', 2.5)).join('')
      + P('M-4 118h248v130H-4z', '#26C6DA') + [[40, 30], [70, 50], [102, 20], [132, 40], [160, 26], [196, 46]].map(([x, y], k) => R(x - 5, y, 10, 150 - y, '#B0BEC5', 2) + Lc(`M${x - 5} ${y + 30}l-12-10M${x + 5} ${y + 56}l12-12`, '#90A4AE', 4) + `<g opacity=".35">${R(x - 5, 160, 10, 40 + k * 4, '#78909C', 0, 0)}</g>`).join('')
      + Lc('M10 170h30M150 190h40M70 214h40', '#E0F7FA', 3) + face(120, 196, 0.45)),
  L('zenkov', 'อาสนวิหารเซนคอฟ โบสถ์ไม้สีพาสเทล', 'Zenkov Cathedral, the pastel wooden church', ['zenkov cathedral', 'อาสนวิหารเซนคอฟ', 'ascension cathedral', 'wooden cathedral', 'โบสถ์ไม้', 'panfilov park', 'สวนปันฟีลอฟ', 'pastel colours', 'สีพาสเทล'], 'หาหอคอยที่สูงที่สุดกับโดมหัวหอมสีฟ้า', 'Find the tallest tower with its blue onion dome',
    // a cheerful pastel yellow and pink wooden building with white trim, a tall tiered tower at the front and coloured onion domes with little gold tips, park trees round it
    sky('#E8F5E9') + [[22, 170], [218, 170]].map(([x, y]) => C(x, y, 30, '#66BB6A')).join('') + R(46, 124, 148, 82, '#FFF59D') + Lc('M46 140h148', '#FFFFFF', 4) + ring(5, (k) => P(`M${60 + k * 28} 196v-30c0-10 14-10 14 0v30z`, '#F48FB1', 2.5)).replace(/(M\d+ 196)/g, '$1')
      + R(98, 66, 44, 140, '#F8BBD0') + R(104, 40, 32, 30, '#FFF59D') + P('M120 4c-12 10-18 22-12 36h24c6-14 0-26-12-36z', '#4FC3F7') + Lc('M120 4v-6', '#FFCA28', 4)
      + [[62, 124, 14, '#81C784'], [178, 124, 14, '#81C784'], [120, 66, 18, '#4DB6AC']].map(([x, y, r, c]) => P(`M${x} ${y - r * 2.4}c-${r} ${r * 0.8}-${r * 1.2} ${r * 1.6}-${r * 0.8} ${r * 2.4}h${r * 1.6}c${r * 0.4}-${r * 0.8} 0-${r * 1.6}-${r * 0.8}-${r * 2.4}z`, c) + C(x, y - r * 2.5, 3, '#FFCA28', 2)).join('')
      + P('M108 206v-24c0-16 24-16 24 0v24z', '#8D6E63') + R(110, 84, 20, 22, '#FFFFFF', 8, 2.5) + face(120, 150, 0.42)),
  L('koktobe', 'จุดชมวิวบนเนินโกกโตเบ', 'The lookout on Kok-Tobe hill', ['kok-tobe', 'โกกโตเบ', 'koktobe hill', 'เนินโกกโตเบ', 'city lookout', 'จุดชมวิวเมือง', 'binocular viewer', 'กล้องส่องทางไกล', 'sunset view', 'วิวยามเย็น'], 'หากล้องส่องทางไกลบนขาตั้งริมราว', 'Find the binoculars on their stand by the railing',
    // a wooden lookout terrace high on a green hill at dusk, a chubby smiling binocular viewer on a post by the railing, the city's lights twinkling far below under pink mountains
    sky('#FFCCBC') + `<g opacity=".7">${P('M-4 110l40-40 30 20 40-50 40 40 40-30 58 60z', '#9575CD', 0)}</g>` + P('M-4 108h248v80H-4z', '#5C6BC0')
      + ring(26, (k) => C(8 + (k * 37) % 230, 116 + ((k * 13) % 60), 2.5, ['#FFF59D', '#FFFFFF', '#FFCC80'][k % 3], 0)) + P('M-4 176h248v72H-4z', '#A1673F') + Lc('M-4 196h248M-4 220h248', '#8D5A3B', 3)
      + Lc('M-4 168h248', '#6D4C41', 6) + ring(9, (k) => Lc(`M${6 + k * 29} 168v28`, '#6D4C41', 5))
      + Lc('M150 236v-60', INK, 9) + Lc('M150 236v-60', '#78909C', 5) + R(116, 140, 68, 42, '#26A69A', 14) + [130, 170].map((x) => R(x - 12, 114, 24, 30, '#4DB6AC', 6) + E(x, 116, 10, 5, '#E1F5FE', 2.5)).join('') + face(150, 160, 0.42)
      + kid(70, 236, '#FFCA28', 1.1)),
  L('singingdune', 'เนินทรายร้องเพลงแห่งอัลติน-เอเมล', 'The Singing Dune of Altyn-Emel', ['singing dune', 'เนินทรายร้องเพลง', 'altyn-emel', 'อุทยานอัลติน-เอเมล', 'humming sand', 'ทรายส่งเสียง', 'big sand dune', 'เนินทรายใหญ่', 'national park', 'อุทยานแห่งชาติ'], 'หาตัวโน้ตที่เนินทรายกำลังร้องเพลง', 'Find the music notes the dune is singing',
    // one huge golden dune with a smooth sharp ridge lying between bare grey-brown hills, musical notes floating up off its crest
    sky('#FFF8E1') + P('M-4 150l40-50 30 20 30-30 40 40v40H-4z', '#A1887F') + P('M244 150l-30-60-30 30-20-10v60z', '#8D6E63')
      + P('M-4 200c30-40 70-90 124-100 40 10 80 50 124 100v48H-4z', '#FFCA28') + P('M120 100c40 10 80 50 124 100v48H160c-10-50-20-100-40-148z', '#FFB300', 0) + Lc('M120 100c-50 10-90 60-124 100', INK, 4)
      + [[136, 70], [166, 44], [104, 50]].map(([x, y]) => E(x, y, 8, 6, '#7E57C2', 2.5) + Lc(`M${x + 7} ${y}v-24`, INK, 3)).join('') + Lc('M173 20l10 6', INK, 3) + face(120, 170, 0.6)),
  L('aktau', 'เทือกเขาอัคเตาลายทางขาวแดง', 'The striped white and red Aktau hills', ['aktau mountains', 'เทือกเขาอัคเตา', 'striped hills', 'เขาลายทาง', 'white and red rock', 'หินขาวแดง', 'altyn-emel', 'อุทยานอัลติน-เอเมล', 'clay hills'], 'นับลายทางสีบนเนินเขา', 'Count the coloured stripes on the hills',
    // rounded badland hills banded in white, cream, orange and red like a layered cake, gullies running down them, a blue sky
    sky('#E3F2FD') + P('M-4 190c10-60 40-100 70-100 30 0 34 30 54 30s30-60 66-60c30 0 50 60 58 130z', '#FFFFFF')
      + [['#FFE0B2', 110], ['#FF8A65', 128], ['#FFFFFF', 144], ['#E57373', 160], ['#FFCC80', 176]].map(([c, y]) => Lc(`M-4 ${y + 14}c40-10 60 8 100-4s80-14 148 2`, c, 14)).join('')
      + P('M-4 190c10-60 40-100 70-100 30 0 34 30 54 30s30-60 66-60c30 0 50 60 58 130', 'none') + Lc('M70 96l-6 30M190 66l4 40M150 80l-8 30', '#E0E0E0', 3) + P('M-4 188h248v60H-4z', '#D7CCC8') + face(186, 120, 0.42)),
  L('hotelkazakhstan', 'โรงแรมคาซัคสถานกับมงกุฎทอง', 'The Hotel Kazakhstan tower and its golden crown', ['hotel kazakhstan', 'โรงแรมคาซัคสถาน', 'golden crown', 'มงกุฎทอง', 'tall building', 'ตึกสูง', 'abay avenue', 'ถนนอาบาย', 'city skyline'], 'หามงกุฎสีทองบนยอดตึก', 'Find the golden crown on top of the building',
    // a tall slim pale building with long vertical window stripes and a golden crown of points on its roof, mountains faint behind, trees at its foot
    sky('#E3F2FD') + `<g opacity=".5">${P('M-4 150l50-50 30 20 40-50 50 40 40-30 38 40v30H-4z', '#B0BEC5', 0)}</g>` + R(86, 52, 68, 156, '#ECEFF1') + ring(5, (k) => Lc(`M${96 + k * 12} 60v140`, '#B3E5FC', 6))
      + P('M80 54l6-26 10 14 8-22 8 22 8-22 8 22 10-14 6 26z', '#FFCA28') + ring(4, (k) => C(96 + k * 16, 34 - (k % 3 ? 4 : 0), 3.5, '#E53935', 1.5)) + R(110, 182, 20, 26, '#8D6E63', 2)
      + [[50, 196], [190, 196], [30, 210], [210, 212]].map(([x, y]) => C(x, y, 20, '#43A047')).join('') + face(120, 120, 0.42)),
  L('assyplateau', 'ที่ราบสูงอัสซี ทุ่งหญ้าบนภูเขา', 'The Assy plateau, a meadow high in the mountains', ['assy plateau', 'ที่ราบสูงอัสซี', 'high plateau', 'ที่ราบสูง', 'wildflowers', 'ดอกไม้ป่า', 'winding stream', 'ลำธารคดเคี้ยว', 'summer pasture', 'ทุ่งหญ้าฤดูร้อน'], 'หาลำธารที่คดเคี้ยวผ่านทุ่ง', 'Find the stream winding across the meadow',
    // a wide flat green plateau ringed by round mountains, a blue stream looping across it in big curves, a dirt track, dots of yellow and purple wildflowers, white clouds low on the peaks
    sky('#E1F5FE') + peaks('M-4 110l36-40 30 24 40-40 44 34 34-30 64 52z', ['M106 54l12 14-6-2-6 4-6-4-6 2z', 'M184 58l10 12-5-2-5 3-5-3-5 2z']) + E(60, 70, 24, 8, '#FFFFFF', 0) + E(176, 58, 22, 7, '#FFFFFF', 0)
      + P('M-4 104c80-10 168-10 248 0v146H-4z', '#9CCC65') + Lc('M20 248c40-30 120-10 110-40s-80-20-60-50 100-20 110-50', INK, 13) + Lc('M20 248c40-30 120-10 110-40s-80-20-60-50 100-20 110-50', '#4FC3F7', 8)
      + Lc('M244 140c-40 20-60 50-70 108', '#D7CCC8', 8) + ring(18, (k) => C(14 + (k * 53) % 224, 120 + ((k * 29) % 120), 3.5, ['#FFEB3B', '#BA68C8', '#FFFFFF'][k % 3], 1.5)) + face(80, 158, 0.32)),
  L('arbat', 'ถนนคนเดินจีเบกโจลึ หรืออาร์บัต', 'The Zhibek Zholy walking street, the Arbat', ['zhibek zholy', 'จีเบกโจลึ', 'arbat', 'อาร์บัต', 'walking street', 'ถนนคนเดิน', 'street painters', 'จิตรกรริมถนน', 'easels', 'ภาพวาด'], 'หาภาพวาดรูปภูเขาบนขาตั้ง', 'Find the painting of the mountains on its easel',
    // a paved walking street lined with trees and lamp posts, painters' easels holding bright paintings of mountains and flowers, a child with a paintbrush
    sky('#E8F5E9') + P('M60 248l40-160h40l40 160z', '#E0E0E0') + Lc('M100 100l-30 148M140 100l30 148', '#BDBDBD', 3) + [[30, 90], [210, 90], [16, 150], [226, 150]].map(([x, y]) => C(x, y, 26, '#43A047')).join('')
      + [[46, 140, '#FFF8E1', 'm'], [170, 150, '#FFF8E1', 'f'], [196, 196, '#FFF8E1', 'm']].map(([x, y, c, t]) => Lc(`M${x - 14} ${y + 46}l14-46 14 46M${x} ${y}v46`, '#8D6E63', 4) + R(x - 20, y - 26, 40, 32, c, 2)
        + (t === 'm' ? P(`M${x - 16} ${y + 2}l12-18 8 8 8-12 8 22z`, '#64B5F6', 2) + P(`M${x} ${y - 16}l3 5h-6z`, '#FFFFFF', 0) : [[-8, -14, '#E91E63'], [6, -8, '#FFCA28'], [-4, -2, '#AB47BC']].map(([dx, dy, f]) => C(x + dx, y + dy, 5, f, 2)).join(''))).join('')
      + kid(100, 214, '#FFCA28', 1.2) + Lc('M110 196l14-14', '#8D6E63', 4) + C(126, 180, 3.5, '#E53935', 1.5) + Lc('M150 70v40', INK, 3) + C(150, 66, 7, '#FFF59D', 2.5)),
  L('museum', 'พิพิธภัณฑ์แห่งรัฐกลางกับโดมสีฟ้า', 'The Central State Museum and its blue dome', ['central state museum', 'พิพิธภัณฑ์แห่งรัฐกลาง', 'history museum', 'พิพิธภัณฑ์ประวัติศาสตร์', 'blue dome', 'โดมสีฟ้า', 'kazakh history', 'ประวัติศาสตร์คาซัค', 'rainy day'], 'หาโดมสีฟ้าใหญ่บนหลังคา', 'Find the big blue dome on the roof',
    // a wide sand-coloured building with a band of blue patterned tiles and a big round sky-blue dome in the middle, tall narrow windows, trees either side
    sky('#E3F2FD') + R(16, 112, 208, 92, '#F5DEB3') + R(16, 112, 208, 14, '#1E88E5', 0, 3) + ring(10, (k) => C(26 + k * 21, 119, 3, '#FFFFFF', 0))
      + R(80, 84, 80, 30, '#F5DEB3') + P('M80 86c0-48 80-48 80 0z', '#4FC3F7') + Lc('M92 80c4-22 52-22 56 0', '#B3E5FC', 3) + C(120, 40, 5, '#FFCA28', 2.5)
      + ring(8, (k) => R(28 + k * 25 + (k > 3 ? 8 : 0), 140, 10, 40, '#BBDEFB', 4, 2.5)) + R(106, 160, 28, 44, '#8D6E63', 4) + [[8, 190], [232, 190]].map(([x, y]) => C(x, y, 22, '#43A047')).join('') + face(120, 98, 0.4)),
  L('spruces', 'ป่าสนเทียนชานต้นสูงชะลูด', 'Tall Tian Shan spruces on the mountainside', ['tian shan spruce', 'สนเทียนชาน', 'ile-alatau national park', 'อุทยานอีเล-อาลาเตา', 'mountain forest', 'ป่าบนภูเขา', 'hiking trail', 'เส้นทางเดินป่า', 'fresh air'], 'หาต้นสนที่สูงที่สุด', 'Find the tallest skinny spruce',
    // a steep slope crowded with very tall, very narrow dark spruces like green pencils, a zigzag trail climbing between them, a child hiking, snow peaks behind
    sky('#E1F5FE') + peaks('M-4 100l50-60 40 30 40-50 50 50 30-20 38 50z', ['M126 20l14 18-7-3-7 5-7-5-7 3z', 'M46 40l12 14-6-2-6 4-6-4-4 2z']) + P('M-4 120c80-30 160-20 248 10v120H-4z', '#9CCC65')
      + [[24, 200, 120], [60, 190, 96], [190, 196, 130], [220, 206, 104], [150, 170, 80], [100, 150, 60]].map(([x, y, h], k) => spruce(x, y, h, ['#1B5E20', '#2E7D32'][k % 2])).join('')
      + Lc('M80 248l40-30-30-20 40-20-24-16', '#D7CCC8', 8) + kid(118, 212, '#E53935', 1) + face(190, 140, 0.32)),
  L('republicpalace', 'ทำเนียบสาธารณรัฐ หอแสดงหลังคากว้าง', 'The Palace of the Republic concert hall', ['palace of the republic', 'ทำเนียบสาธารณรัฐ', 'concert hall', 'หอแสดงดนตรี', 'big flat roof', 'หลังคาแบน', 'dostyk avenue', 'ถนนดอสตึก', 'modern building'], 'หาหลังคาแบนใหญ่ที่ยื่นออกมาเหนือเสา', 'Find the big flat roof sticking out over the posts',
    // a wide low hall under a huge flat roof that sticks far out on slim white posts, glass walls with a pattern of tiny lattice, broad steps
    sky('#E3F2FD') + R(40, 112, 160, 74, '#B3E5FC') + ring(9, (k) => Lc(`M${52 + k * 17} 116v66`, '#FFFFFF', 3)) + Lc('M40 140h160M40 162h160', '#E1F5FE', 2)
      + R(8, 88, 224, 22, '#ECEFF1') + Lc('M8 98h224', '#B0BEC5', 3) + ring(8, (k) => R(16 + k * 29.5, 108, 6, 80, '#FFFFFF', 2, 2.5))
      + ring(3, (k) => R(30 - k * 8, 188 + k * 8, 180 + k * 16, 8, '#E0E0E0', 0, 2.5)) + face(120, 140, 0.42)),
  L('aryk', 'ร่องน้ำอารึกริมถนนต้นป็อปลาร์', 'An aryk, the water channel along a poplar street', ['aryk', 'อารึก', 'water channel', 'ร่องน้ำ', 'poplar trees', 'ต้นป็อปลาร์', 'shady street', 'ถนนร่มรื่น', 'mountain water', 'น้ำจากภูเขา'], 'หาเรือกระดาษที่ลอยมาตามร่องน้ำ', 'Find the paper boat floating down the channel',
    // a shady street lined with tall slim poplars, a narrow stone channel of clear mountain water running beside the pavement, a paper boat bobbing along it, a child watching
    sky('#E3F2FD') + peaks('M-4 90l60-50 40 30 50-40 98 60z', ['M146 30l12 14-6-2-6 4-6-4-6 2z']) + P('M-4 86h248v164H-4z', '#C5E1A5')
      + [[20, 200, 150], [64, 170, 120], [100, 150, 96], [176, 200, 150], [214, 176, 124]].map(([x, y, h], k) => R(x - 3, y - 16, 6, 20, '#8D6E63', 2, 2.5) + E(x, y - 16 - h / 2, h / 7, h / 2, ['#43A047', '#66BB6A'][k % 2])).join('')
      + P('M-4 214l130-110h20L60 250H-4z', '#E0E0E0') + P('M60 250l86-146h14L104 250z', '#90A4AE') + P('M68 250l82-146h6L96 250z', '#4FC3F7', 0) + Lc('M84 236l8-10M104 200l6-8', '#E1F5FE', 2)
      + g(88, 222, 1, P('M-12 0h24l-6 7h-12z', '#FFFFFF', 2.5) + P('M-2 0V-14L8 0z', '#FFFFFF', 2.5)) + kid(150, 236, '#E53935', 1.1) + face(64, 120, 0.25)),
  L('woodenhouse', 'บ้านไม้เก่ากับกรอบหน้าต่างแกะสลัก', 'An old wooden house with carved window frames', ['old wooden house', 'บ้านไม้เก่า', 'carved window frames', 'กรอบหน้าต่างแกะสลัก', 'old almaty', 'อัลมาตีเก่า', 'painted shutters', 'บานเกล็ดทาสี', 'quiet street', 'ถนนเงียบสงบ'], 'หากรอบหน้าต่างสีฟ้าที่แกะเป็นลวดลาย', 'Find the blue window frames carved with patterns',
    // a one-storey house of yellow wooden planks with a green tin roof, three windows in blue frames topped with carved lace-like crowns, a picket fence and a tree
    sky('#E3F2FD') + C(214, 110, 34, '#66BB6A') + R(206, 130, 10, 60, '#8D6E63', 2) + R(24, 104, 192, 92, '#FFE082') + ring(8, (k) => Lc(`M24 ${114 + k * 11}h192`, '#FFCA28', 2))
      + P('M14 106L60 60h120l46 46z', '#4DB6AC') + ring(3, (k) => { const x = 54 + k * 66; return R(x - 18, 124, 36, 44, '#E1F5FE', 0, 3) + Lc(`M${x} 124v44M${x - 18} 144h36`, '#1E88E5', 3) + R(x - 24, 120, 48, 52, 'none', 2, 4).replace('fill="none"', 'fill="none" stroke="#1E88E5"')
        + P(`M${x - 26} 120l26-18 26 18z`, '#42A5F5', 3) + P(`M${x - 8} 116a8 8 0 0 1 16 0z`, '#FFFFFF', 2) + ring(5, (j) => C(x - 20 + j * 10, 176, 3, '#FFFFFF', 1.5)); })
      + ring(12, (k) => P(`M${8 + k * 19} 236v-34l5-6 5 6v34z`, '#FFFFFF', 2.5)) + face(120, 92, 0.4)),
  L('hairpinroad', 'ถนนซิกแซกขึ้นหุบเขาบิ๊กอัลมาตี', 'The zigzag road up the Big Almaty gorge', ['zigzag road', 'ถนนซิกแซก', 'hairpin bends', 'โค้งหักศอก', 'mountain road', 'ถนนขึ้นเขา', 'big almaty gorge', 'หุบเขาบิ๊กอัลมาตี', 'scenic drive', 'ขับรถชมวิว'], 'นับโค้งของถนนที่ไต่ขึ้นเขา', 'Count the bends in the road climbing the mountain',
    // a green mountainside with a grey road folding back and forth in tight bends up to the top, a little car on one bend, spruces dotted along the slope
    sky('#E1F5FE') + peaks('M-4 70l60-60 50 40 50-40 88 70z', ['M56 10l14 14-7-2-7 5-7-5-7 2z']) + P('M-4 60c60-20 180-20 248 0v190H-4z', '#81C784')
      + Lc('M20 236c60 0 150-6 170-14s-130-16-140-28 120-16 140-28-110-14-110-26 90-14 100-24-60-10-70-20', INK, 15) + Lc('M20 236c60 0 150-6 170-14s-130-16-140-28 120-16 140-28-110-14-110-26 90-14 100-24-60-10-70-20', '#B0BEC5', 9)
      + [[18, 120, 40], [214, 140, 44], [226, 200, 40], [16, 190, 36]].map(([x, y, h]) => spruce(x, y, h, '#2E7D32')).join('') + g(160, 166, 1, R(-14, -10, 28, 14, '#FFCA28', 4) + R(-8, -16, 16, 8, '#B3E5FC', 3, 2) + C(-7, 5, 4, INK, 0) + C(7, 5, 4, INK, 0) + face(0, -3, 0.2))),
  L('vanride', 'นั่งรถตู้ขนมปังลุยลำธารไปไคน์ดี', 'A loaf-shaped van splashing through a stream', ['off-road van', 'รถตู้ออฟโรด', 'loaf van', 'รถตู้ขนมปัง', 'bumpy track', 'ทางขรุขระ', 'river crossing', 'ข้ามลำธาร', 'kaindy trip', 'ทริปไคน์ดี'], 'หาน้ำที่กระเซ็นจากล้อรถ', 'Find the water splashing up from the wheels',
    // a round-nosed van shaped like a loaf of bread, painted olive green and cream, round headlights like eyes, driving through a shallow stony stream with a big splash, spruces behind
    sky('#E1F5FE') + [[24, 120, 70], [60, 112, 56], [196, 118, 66], [226, 124, 60]].map(([x, y, h]) => spruce(x, y, h, '#2E7D32', 2.5)).join('') + P('M-4 118h248v40H-4z', '#AED581')
      + P('M-4 158c60-6 188-6 248 0v92H-4z', '#4FC3F7') + [[30, 220], [200, 230], [120, 236]].map(([x, y]) => E(x, y, 12, 6, '#B0BEC5', 2.5)).join('')
      + P('M48 176V108c0-18 12-26 30-26h82c20 0 32 14 32 34v60z', '#7C8F4E') + P('M48 130h144v-14c0-20-12-34-32-34H78c-18 0-30 8-30 26z', '#FFF8E1', 0) + P('M48 176V108c0-18 12-26 30-26h82c20 0 32 14 32 34v60z', 'none')
      + R(60, 92, 34, 26, '#B3E5FC', 6, 3) + R(102, 92, 34, 26, '#B3E5FC', 6, 3) + R(146, 92, 34, 26, '#B3E5FC', 6, 3) + [[176, 146], [56, 146]].map(([x, y]) => C(x, y, 9, '#FFF59D', 3)).join('') + face(120, 150, 0.45)
      + [[76, 180], [166, 180]].map(([x, y]) => C(x, y, 16, INK) + C(x, y, 6, '#B0BEC5', 0)).join('') + ring(6, (k) => C(40 + (k % 3) * -10, 170 - k * 8, 5 - (k % 2), '#E1F5FE', 2)) + ring(6, (k) => C(200 + (k % 3) * 10, 170 - k * 8, 5 - (k % 2), '#E1F5FE', 2))),
];

export default {
  places: {
    'kz-almaty': { country: 'kz', wave: 3, name: nm('อัลมาตีและเทือกเขาเทียนชาน', 'Almaty and the Tian Shan'), tz: 'Asia/Almaty', ll: [43.24, 76.89], alias: ['almaty', 'อัลมาตี', 'ALA', 'big almaty lake', 'ทะเลสาบบิ๊กอัลมาตี', 'charyn', 'ชาริน', 'kolsai', 'โคลไซ', 'kaindy', 'ไคน์ดี', 'altyn-emel', 'อัลติน-เอเมล', 'medeu', 'เมเดว', 'shymbulak', 'ชิมบูลัก', 'kok-tobe', 'โกกโตเบ'], colors: AL },
  },
  items,
};
