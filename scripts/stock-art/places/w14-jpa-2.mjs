// Wave 14, Japan: Nikko and Kinugawa — the city stamp, two day scenes and seventeen landmarks of the shrine town in the cedar
// mountains, Oku-Nikko's lake and marsh and the Kinugawa gorge (buildings, carvings, foods, flowers and forest animals only;
// no monkeys, no waterfall, no hot spring, no cedar avenue, no theme park, no religious figure)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NK = { k1: '#B23A2A', k2: '#B8860B', k3: '#FFF4E0' };
const CITY = 'jp-nikko', DIR = 'jp/nikko';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });

// the Shinkyo: a vermilion arched wooden bridge on grey stone piers (x = centre, b = water line, w = span, s = scale)
const shinkyo = (x, b, w, s, sw) => R(x - w / 2 + 6 * s, b - 34 * s, 12 * s, 34 * s, '#9E9E9E', 0, sw) + R(x + w / 2 - 18 * s, b - 34 * s, 12 * s, 34 * s, '#9E9E9E', 0, sw)
  + P(`M${x - w / 2} ${b - 30 * s}q${w / 2} -${30 * s} ${w} 0v${10 * s}q-${w / 2} -${26 * s} -${w} 0z`, '#E2452B', sw)
  + Lc(`M${x - w / 2} ${b - 44 * s}q${w / 2} -${30 * s} ${w} 0`, '#E2452B', 5 * s)
  + [0.12, 0.3, 0.5, 0.7, 0.88].map((t) => { const px = x - w / 2 + w * t, py = b - 30 * s - 30 * s * 4 * t * (1 - t) / 2; return Lc(`M${px} ${py}v-${14 * s}`, '#E2452B', 4 * s) + C(px, py - 16 * s, 3 * s, INK, 0); }).join('');
// a tall cedar: a straight trunk and a stack of dark green tiers
const cedar = (x, b, s, c = '#2E5E3A') => Lc(`M${x} ${b}v-${30 * s}`, '#6D4C41', 4) + [0, 1, 2, 3].map((k) => P(`M${x - (18 - k * 4) * s} ${b - (24 + k * 16) * s}l${(18 - k * 4) * s}-${22 * s} ${(18 - k * 4) * s} ${22 * s}z`, c)).join('');
// Mount Nantai: a broad green-blue cone
const nantai = (x, b, w, h, c = '#5C8F7A') => P(`M${x - w / 2} ${b}c${w * 0.2}-${h * 0.6} ${w * 0.38}-${h} ${w / 2}-${h}s${w * 0.3} ${h * 0.4} ${w / 2} ${h}z`, c);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับนิกโก้', 'Nikko stamp'), kw: ['nikko', 'นิกโก้', 'shinkyo bridge', 'สะพานชินเคียว', 'red bridge', 'สะพานแดง', 'kinugawa', 'คินุงาวะ'],
    // the red Shinkyo bridge over the river with two dark cedars behind
    svg: cityStamp('nk-st', { name: 'NIKKO', sub: 'KINUGAWA · JAPAN', ...NK, emblem: cedar(72, 116, 0.75) + cedar(130, 112, 0.8) + shinkyo(100, 134, 84, 0.7, 2.5) + Lc('M58 140c14-4 28 4 42 0s28-4 42 0', '#4FC3F7', 3) }) },

  D('kinugawa', 'หุบเขาแม่น้ำคินุงาวะกับโรงแรมบนหน้าผา', 'The Kinugawa river gorge and its clifftop hotels', ['kinugawa', 'คินุงาวะ', 'kinugawa river', 'แม่น้ำคินุงาวะ', 'river gorge', 'หุบเขาแม่น้ำ', 'clifftop hotels', 'โรงแรมบนหน้าผา', 'autumn colours', 'ใบไม้เปลี่ยนสี'],
    // an emerald river winding between grey rock cliffs topped with tall cream hotel blocks, red and orange autumn trees on the slopes, green hills behind
    scene('nk-d1', '#E3F2FD', P('M-4 90c50-30 100-34 140-20s70-10 108 0v40H-4z', '#81C784', 0)
      + [[20, 60, 40], [62, 74, 30], [160, 66, 34], [198, 56, 40]].map(([x, y, w]) => R(x, y, w, 62, '#FFF8E1', 0) + [0, 1, 2, 3].map((r) => Lc(`M${x + 6} ${y + 10 + r * 13}h${w - 12}`, '#90CAF9', 3)).join('')).join('')
      + P('M-4 120h104l-10 130H-4z', '#9E9E9E') + P('M140 120h104v130H150z', '#8D8D8D') + Lc('M20 150l30 10M10 190l40 6M170 156l40-6M180 196l40 8', '#757575', 3)
      + P('M90 250c4-40 14-90 30-130h20c-10 40-14 90-10 130z', '#26A69A') + Lc('M112 160q6 6 0 14M118 210q6 6 0 14', '#B2DFDB', 3)
      + [[30, 124, '#E53935'], [74, 128, '#FF9800'], [160, 126, '#FFB300'], [214, 124, '#E53935']].map(([x, y, c]) => C(x, y, 13, c, 3)).join('') + face(120, 100, 0.26))),

  D('chuzenji', 'ทะเลสาบชูเซนจิใต้ภูเขานันไต', 'Lake Chuzenji under Mount Nantai in autumn', ['lake chuzenji', 'ทะเลสาบชูเซนจิ', 'mount nantai', 'ภูเขานันไต', 'oku-nikko', 'โอคุนิกโก้', 'autumn leaves', 'ใบไม้แดง', 'mountain lake', 'ทะเลสาบบนเขา'],
    // the broad green-blue cone of Mount Nantai rising over a calm blue lake, red, orange and yellow autumn trees on the near shore, a light cloud
    scene('nk-d2', '#FFF3E0', nantai(110, 140, 220, 108) + Lc('M80 54c10 8 30 10 40 0', '#FFFFFF', 4) + P('M-4 128c60-8 120-6 248 0v26H-4z', '#7CB342', 0)
      + R(-4, 140, 248, 70, '#4FC3F7', 0) + Lc('M40 160h60M130 170h70M60 188h80', '#E1F5FE', 3)
      + P('M-4 196c60-12 160-12 248 0v60H-4z', '#8D6E63') + [[24, 190, '#E53935'], [56, 196, '#FFB300'], [90, 192, '#FF7043'], [150, 194, '#E53935'], [186, 190, '#FFCA28'], [218, 196, '#FF7043']].map(([x, y, c]) => C(x, y, 16, c, 3)).join('')
      + P('M178 40c4-10 18-10 22 0 8 0 10 10 2 12h-26c-8-2-6-12 2-12z', '#FFFFFF', 3) + face(110, 100, 0.3))),

  L('shinkyo', 'สะพานแดงชินเคียวข้ามแม่น้ำไดยะ', 'The red Shinkyo bridge over the Daiya River', ['shinkyo bridge', 'สะพานชินเคียว', 'sacred bridge', 'สะพานศักดิ์สิทธิ์', 'daiya river', 'แม่น้ำไดยะ', 'vermilion bridge', 'สะพานสีแดงชาด', 'futarasan', 'ศาลเจ้าฟุตาระซัง'], nm('หาเสาหินสีเทาที่ค้ำสะพาน', 'Find the grey stone legs under the bridge'),
    // a vermilion lacquered arched bridge on grey stone piers over a rushing blue river, tall dark cedars on the green banks
    cedar(40, 140, 1.1) + cedar(200, 140, 1.1) + cedar(70, 130, 0.9) + P('M14 140h212v20H14z', '#81C784') + R(14, 150, 212, 64, '#4FC3F7', 20)
    + shinkyo(120, 170, 170, 1.2) + Lc('M30 196q20-6 40 0M140 202q20-6 40 0', '#E1F5FE', 3) + face(120, 118, 0.38)),

  L('yomeimon', 'ประตูโยเมมงสีขาวทองที่ศาลเจ้าโทโชงู', 'Yomeimon, the white-and-gold gate of Toshogu', ['yomeimon', 'ประตูโยเมมง', 'toshogu shrine', 'ศาลเจ้าโทโชงู', 'gilded gate', 'ประตูปิดทอง', 'carvings', 'งานแกะสลัก', 'world heritage', 'มรดกโลก'], nm('หาลวดลายสีทองใต้ชายคา', 'Find the golden patterns under the roof'),
    // a two-storey white gate with gold-and-colour carved brackets, a black curved roof with gold tips, white pillars and a blue-green painted band, stone steps in front
    R(40, 200, 160, 14, '#BDBDBD', 4) + R(54, 120, 132, 80, '#FFFFFF') + R(98, 140, 44, 60, '#5D4037', 0, 3) + Lc('M66 124v76M174 124v76', '#ECEFF1', 6)
    + R(46, 108, 148, 14, '#26A69A') + [56, 76, 96, 116, 136, 156, 176].map((x) => C(x + 4, 115, 4, '#FFC107', 2)).join('')
    + P('M30 108q90 -16 180 0l-10 -14q-80 -10 -160 0z', '#263238') + R(66, 70, 108, 24, '#FFFFFF') + R(60, 62, 120, 10, '#FFC107')
    + [74, 94, 114, 134, 154].map((x) => P(`M${x} 74h12v16h-12z`, '#E53935', 2.5)).join('')
    + P('M36 62q84 -26 168 0l-12 -16q-72 -18 -144 0z', '#263238') + C(40, 62, 5, '#FFC107', 2.5) + C(200, 62, 5, '#FFC107', 2.5) + C(120, 38, 5, '#FFC107', 2.5) + face(120, 166, 0.36)),

  L('nemurineko', 'แมวหลับแกะสลักที่ศาลเจ้าโทโชงู', 'The carved sleeping cat of Toshogu', ['nemuri-neko', 'แมวหลับเนมูริเนโกะ', 'sleeping cat', 'แมวนอนหลับ', 'wood carving', 'ไม้แกะสลัก', 'toshogu', 'โทโชงู', 'peony', 'ดอกโบตั๋น'], nm('หาตาที่ปิดสนิทของแมวหลับ', 'Find the sleepy closed eyes of the cat'),
    // a painted wooden carving panel: a white cat with black patches curled up asleep among pink peonies and green leaves, a gold frame
    R(16, 52, 208, 140, '#C9A227', 10) + R(28, 64, 184, 116, '#8D6E63', 4)
    + [[52, 96], [190, 92], [196, 150]].map(([x, y]) => C(x, y, 14, '#F48FB1', 3) + C(x, y, 5, '#FFEB3B', 2)).join('') + P('M40 140c10-14 24-14 30 0-10 4-20 4-30 0zM176 120c10-12 22-12 26 0-8 4-18 4-26 0z', '#66BB6A', 3)
    + P('M70 170c0-30 30-46 60-46s56 12 58 40c-2 8-14 10-20 6H76c-4 0-6-2-6 0z', '#FFFFFF')
    + E(150, 138, 18, 14, '#37474F', 0) + P('M84 148c-6-4-6-14 0-20l8 8z', '#37474F', 3)
    + C(88, 140, 24, '#FFFFFF') + P('M70 124l2-16 12 10zM98 116l10-12 4 16z', '#FFFFFF') + E(80, 124, 6, 4, '#37474F', 0)
    + Lc('M74 140q4 4 8 0M92 140q4 4 8 0', INK, 3) + E(70, 148, 5, 3, '#FF8FA3', 0) + E(104, 148, 5, 3, '#FF8FA3', 0) + Lc('M86 150q2 3 4 0', INK, 2.5)
    + Lc('M186 160c14 0 18-14 8-20', '#37474F', 6)),

  L('sanbutsudo', 'ศาลาซัมบุตสึโดสีแดงของวัดรินโนจิ', 'The great red hall of Rinno-ji', ['rinno-ji', 'วัดรินโนจิ', 'sanbutsudo', 'ศาลาซัมบุตสึโด', 'great hall', 'ศาลาใหญ่', 'red hall', 'ศาลาสีแดง', 'nikko temple', 'วัดในนิกโก้'], nm('หาหลังคาสีเขียวหลังใหญ่มาก', 'Find the huge green roof'),
    // a wide vermilion hall with a huge sweeping copper-green roof, gold ridge ornaments, rows of red pillars and a wide wooden veranda on a stone base (building only)
    R(20, 196, 200, 18, '#BDBDBD', 4) + R(30, 136, 180, 60, '#D84315') + [44, 70, 96, 144, 170, 196].map((x) => Lc(`M${x} 140v56`, '#B71C1C', 5)).join('')
    + R(104, 150, 32, 46, '#FFC107', 0, 3) + Lc('M120 150v46', INK, 2.5) + R(24, 186, 192, 10, '#8D6E63', 0)
    + P('M6 140c30-6 60-30 74-74h80c14 44 44 68 74 74z', '#4DB6AC') + Lc('M30 132c20-6 40-24 54-60M210 132c-20-6-40-24-54-60', '#80CBC4', 3)
    + R(76, 58, 88, 10, '#37474F') + C(80, 56, 6, '#FFC107', 2.5) + C(160, 56, 6, '#FFC107', 2.5) + face(120, 112, 0.42)),

  L('italianvilla', 'วิลล่าสถานทูตอิตาลีริมทะเลสาบชูเซนจิ', 'The Italian Embassy villa on Lake Chuzenji', ['italian embassy villa', 'วิลล่าสถานทูตอิตาลี', 'lakeside villa', 'วิลล่าริมทะเลสาบ', 'cedar bark walls', 'ผนังเปลือกซีดาร์', 'lake chuzenji', 'ทะเลสาบชูเซนจิ', 'summer house', 'บ้านพักตากอากาศ'], nm('หาลายตารางหมากรุกบนผนัง', 'Find the chequered pattern on the walls'),
    // a low wooden lakeside villa whose walls are covered in brown-and-tan chequered cedar-bark panels, a long glassy veranda, a dark roof, the blue lake in front
    R(14, 176, 212, 38, '#4FC3F7', 16) + R(30, 104, 180, 66, '#D7A86E') + P('M20 106l20-30h160l20 30z', '#4E342E')
    + [0, 1, 2].map((r) => [0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => (r + k) % 2 ? R(30 + k * 20, 104 + r * 12, 20, 12, '#8D6E63', 0, 0) : '').join('')).join('')
    + R(30, 140, 180, 30, '#B3E5FC') + Lc('M54 140v30M78 140v30M102 140v30M126 140v30M150 140v30M174 140v30M198 140v30', '#5D4037', 3) + R(24, 168, 192, 8, '#6D4C41')
    + Lc('M30 194h40M150 200h50', '#E1F5FE', 3) + face(120, 88, 0.32)),

  L('kanayahotel', 'โรงแรมคานายะนิกโก้ โรงแรมเก่าแก่', 'The old Nikko Kanaya Hotel', ['kanaya hotel', 'โรงแรมคานายะ', 'classic hotel', 'โรงแรมคลาสสิก', 'japanese-western building', 'อาคารญี่ปุ่นผสมตะวันตก', 'oldest resort hotel', 'โรงแรมรีสอร์ตเก่าแก่', 'red balconies', 'ระเบียงสีแดง'], nm('หาหน้าจั่วแบบญี่ปุ่นบนอาคารฝรั่ง', 'Find the Japanese-style gable on the Western building'),
    // a cream two-storey Western hotel with red-painted wooden balconies and window frames, a dark tiled roof with a curved Japanese temple-style gable over the entrance
    R(20, 196, 200, 16, '#BDBDBD', 4) + R(30, 104, 180, 92, '#FFF3E0') + P('M22 106l16-22h164l16 22z', '#37474F')
    + [[44, 116], [76, 116], [148, 116], [180, 116], [44, 154], [76, 154], [148, 154], [180, 154]].map(([x, y]) => R(x, y, 18, 24, '#B3E5FC', 0, 3) + Lc(`M${x - 2} ${y + 25}h22`, '#C62828', 4)).join('')
    + Lc('M30 144h180', '#C62828', 5) + R(102, 140, 36, 56, '#C62828') + R(110, 156, 20, 40, '#5D4037', 0, 3)
    + P('M92 100c0-26 28-46 28-46s28 20 28 46z', '#FFF3E0') + P('M84 104c10-4 20-18 36-52 16 34 26 48 36 52l-8 4c-10-6-20-18-28-36-8 18-18 30-28 36z', '#37474F') + C(120, 84, 7, '#FFC107', 2.5)
    + face(120, 124, 0.3)),

  L('mizuyokan', 'วุ้นถั่วแดงมิซุโยกังแห่งนิกโก้', 'Nikko mizu-yokan, cool red-bean jelly', ['mizu-yokan', 'มิซุโยกัง', 'red bean jelly', 'วุ้นถั่วแดง', 'yokan', 'โยกัง', 'japanese sweet', 'ขนมญี่ปุ่น', 'bamboo leaf', 'ใบไผ่'], nm('หาไม้จิ้มเล็กๆ ที่ปักอยู่บนชิ้นวุ้น', 'Find the little pick stuck in a slice'),
    // three glossy dark-red slices of smooth red-bean jelly on a long green bamboo leaf, one slice with a little wooden pick, a shiny highlight on each
    P('M20 170c30-30 140-40 200-24-20 30-150 44-200 24z', '#7CB342') + Lc('M30 168c50-14 120-20 180-22', '#AED581', 3)
    + [[56, 112], [100, 104], [146, 112]].map(([x, y]) => P(`M${x} ${y}l40-6v44l-40 6z`, '#7B1F2E') + P(`M${x} ${y}l40-6 10 6-40 6z`, '#9C2B3D') + P(`M${x + 40} ${y - 6}l10 6v44l-10-6z`, '#5E1621') + Lc(`M${x + 6} ${y + 12}v18`, '#C25B6D', 3)).join('')
    + Lc('M172 108l18-40', '#D7A86E', 5) + face(122, 132, 0.36)),

  L('takinoo', 'โยนหินลอดรูโทริอิที่ศาลเจ้าทากิโนโอะ', 'Tossing pebbles through the lucky torii at Takinoo', ['takinoo shrine', 'ศาลเจ้าทากิโนโอะ', 'lucky torii', 'โทริอินำโชค', 'stone gate hole', 'รูบนซุ้มประตูหิน', 'throw three stones', 'โยนหินสามก้อน', 'make a wish', 'อธิษฐาน'], nm('หารูกลมเล็กๆ บนคานประตูหิน', 'Find the little round hole in the top beam'),
    // a grey stone gate with a curved top beam that has one small round hole in its middle, three little pebbles flying in a dotted arc toward the hole, mossy ground and ferns
    P('M14 210c40-12 172-12 212 0z', '#8BC34A') + R(60, 84, 18, 126, '#B0BEC5') + R(162, 84, 18, 126, '#B0BEC5') + R(50, 92, 140, 12, '#B0BEC5')
    + P('M30 66q90-14 180 0l-6 16q-84-12-168 0z', '#90A4AE') + C(120, 72, 8, '#37474F', 2.5) + R(114, 82, 12, 10, '#B0BEC5', 0, 3)
    + [[48, 170], [64, 130], [88, 98]].map(([x, y]) => C(x, y, 6, '#9E9E9E', 2.5)).join('')
    + Lc('M190 210l-10-20M194 210l4-24M198 210l12-18', '#558B2F', 4) + face(120, 150, 0.36)),

  L('nikkostation', 'สถานีรถไฟนิกโก้อาคารไม้สีขาว', 'The white wooden Nikko railway station', ['jr nikko station', 'สถานีเจอาร์นิกโก้', 'old station', 'สถานีเก่า', 'white wooden building', 'อาคารไม้สีขาว', 'taisho era', 'ยุคไทโช', 'railway', 'รถไฟ'], nm('หาหน้าต่างโค้งตรงกลางชั้นบน', 'Find the arched window in the middle upstairs'),
    // a white two-storey wooden station with pale green trims, a steep central gable with an arched window, a small porch roof on slim posts, a round flower bed
    R(20, 198, 200, 14, '#BDBDBD', 4) + R(30, 110, 180, 88, '#FFFFFF') + P('M22 112l20-20h156l20 20z', '#78909C') + P('M86 112l34-46 34 46z', '#FFFFFF') + P('M80 114l40-54 40 54h-8l-32-44-32 44z', '#78909C')
    + P('M110 104v-14a10 10 0 0 1 20 0v14z', '#B3E5FC', 3) + [[42, 124], [66, 124], [158, 124], [182, 124], [42, 158], [182, 158]].map(([x, y]) => R(x, y, 16, 22, '#B3E5FC', 0, 3) + Lc(`M${x} ${y + 11}h16`, '#26A69A', 2)).join('')
    + Lc('M30 150h180', '#26A69A', 4) + P('M70 154h100l-8-12H78z', '#26A69A') + Lc('M80 154v44M160 154v44', '#ECEFF1', 4) + R(104, 162, 32, 36, '#8D6E63')
    + E(120, 204, 30, 6, '#81C784', 2.5) + C(104, 200, 4, '#F06292', 2) + C(120, 198, 4, '#FFEB3B', 2) + C(136, 200, 4, '#F06292', 2) + face(120, 128, 0.28)),

  L('shisomaki', 'พริกห่อใบชิโซะ ของดองนิกโก้', 'Shiso-maki, chillies rolled in shiso leaves', ['shiso maki', 'ชิโซะมากิ', 'shiso leaf', 'ใบชิโซะ', 'pickled chilli', 'พริกดอง', 'nikko pickles', 'ของดองนิกโก้', 'tamari', 'ซีอิ๊วทามาริ'], nm('หาปลายพริกสีแดงที่โผล่ออกมา', 'Find the red chilli tips poking out'),
    // a small round blue-and-white plate with four little green rolls of crinkly shiso leaf, each with a red chilli tip poking out, two chopsticks resting on top
    E(120, 150, 92, 50, '#FFFFFF') + E(120, 150, 76, 38, '#E3F2FD', 0) + Lc('M56 150q20-12 40 0t40 0t40 0', '#90CAF9', 3)
    + [[78, 136, -10], [112, 130, 4], [146, 136, 14], [120, 160, -4]].map(([x, y, r]) => g(x, y, 1, P('M-22 -10h40l6 10-6 10h-40z', '#43A047') + Lc('M-14 -10l-2 20M-2 -10l-2 20M10 -10l-2 20', '#2E7D32', 2.5) + P('M18 -6c10-4 16 0 18 6-2 6-8 10-18 6z', '#E53935', 2.5), r)).join('')
    + Lc('M40 92L200 76M44 102L204 86', '#A1887F', 6) + face(120, 178, 0.34)),

  L('senjogahara', 'ทางเดินไม้ข้ามทุ่งเซ็นโจงาฮาระ', 'The boardwalk across the Senjogahara marsh', ['senjogahara', 'ทุ่งเซ็นโจงาฮาระ', 'marshland', 'ทุ่งพรุ', 'wooden boardwalk', 'ทางเดินไม้', 'nature trail', 'เส้นทางธรรมชาติ', 'oku-nikko', 'โอคุนิกโก้'], nm('หาทางเดินไม้ที่เลี้ยวซิกแซก', 'Find the boardwalk turning zig-zag'),
    // a zig-zag wooden boardwalk crossing a golden-orange marsh of grass tufts toward Mount Nantai's cone, a few slim larch trees and a little blue pool
    nantai(120, 120, 200, 86) + P('M14 116c60-8 150-8 212 0v98H14z', '#E8B04C') + [[40, 140], [80, 150], [190, 140], [210, 170], [30, 190], [170, 186]].map(([x, y]) => Lc(`M${x - 6} ${y}l-4-12M${x} ${y}v-14M${x + 6} ${y}l4-12`, '#C98A2E', 3)).join('')
    + E(190, 160, 22, 8, '#4FC3F7', 3) + [[34, 124], [214, 120]].map(([x, b]) => Lc(`M${x} ${b}v-40`, '#6D4C41', 3) + P(`M${x - 10} ${b - 12}l10-30 10 30z`, '#9CCC65')).join('')
    + P('M60 214l40-40h50l-30-30h40', 'none', 16) + Lc('M60 214l40-40h50l-30-30h40', '#D7A86E', 12) + face(120, 92, 0.3)),

  L('limitedexpress', 'รถไฟด่วนพิเศษไปนิกโก้หน้าต่างลายตาราง', 'The limited express to Nikko with its lattice windows', ['limited express', 'รถไฟด่วนพิเศษ', 'spacia', 'สเปเซีย', 'lattice windows', 'หน้าต่างลายตาราง', 'kumiko pattern', 'ลายคุมิโกะ', 'train to nikko', 'รถไฟไปนิกโก้'], nm('หาลายตารางไม้คุมิโกะที่หน้ารถ', 'Find the wooden lattice pattern on the train\'s face'),
    // a sleek white limited-express train nose with a deep navy window band, a criss-cross kumiko lattice pattern on its glass face, round headlights, on a rail with cedars behind
    cedar(200, 120, 0.9) + cedar(176, 116, 0.7) + Lc('M14 196h212', '#6D4C41', 6) + Lc('M30 206h180', '#9E9E9E', 4)
    + P('M30 186V110c0-20 20-36 60-36h100c20 0 36 18 36 40v72z', '#FAFAFA') + P('M30 140c0-30 20-50 60-50h40v50z', '#1A237E')
    + Lc('M44 104l20 20M60 96l30 30M80 92l34 34M44 124l20-20M60 132l36-36M84 132l34-34', '#90A4AE', 2.5)
    + Lc('M130 100h80M130 118h80', '#1A237E', 6) + C(52, 164, 8, '#FFF59D', 3) + C(84, 168, 6, '#FFF59D', 3) + Lc('M30 178h196', '#FFC107', 4) + face(160, 150, 0.32)),

  L('kanpyo', 'คัมเปียวน้ำเต้าเส้นตากแดด', 'Kanpyo, gourd ribbons drying in the sun', ['kanpyo', 'คัมเปียว', 'dried gourd strips', 'น้ำเต้าตากแห้ง', 'yugao gourd', 'น้ำเต้ายูงาโอะ', 'tochigi', 'โทจิงิ', 'summer drying', 'ตากแดดหน้าร้อน'], nm('หาลูกน้ำเต้าสีเขียวลูกใหญ่', 'Find the big round green gourd'),
    // long white ribbons of shaved gourd hanging from bamboo poles like a curtain in the summer sun, a big round pale-green gourd on the ground beside them
    C(200, 40, 16, '#FFD54F', 3) + Lc('M24 60h176', '#C5A35A', 6) + Lc('M24 60v150M200 60v150', '#A1887F', 5)
    + [38, 54, 70, 86, 102, 118, 134, 150, 166, 182].map((x, k) => R(x - 5, 62, 10, 96 + (k % 3) * 14, k % 2 ? '#FFF8E1' : '#FFFDE7', 4, 2.5)).join('')
    + E(70, 190, 40, 30, '#C5E1A5') + Lc('M50 172q20 -8 40 0M46 190h48', '#9CCC65', 3) + Lc('M70 160v-10', '#6D4C41', 4) + face(70, 186, 0.36)),

  L('musasabi', 'กระรอกบินยักษ์มูซาซาบิร่อนในป่า', 'A giant flying squirrel gliding through the forest', ['flying squirrel', 'กระรอกบิน', 'musasabi', 'มูซาซาบิ', 'gliding', 'ร่อน', 'night forest', 'ป่ายามค่ำ', 'big eyes', 'ตาโต'], nm('หาผืนหนังที่กางออกเหมือนผ้าคลุม', 'Find the furry cape stretched out like a blanket'),
    // a big-eyed brown flying squirrel gliding with its skin cape stretched square between its legs, a fluffy flat tail behind, a crescent moon and two cedar trunks
    C(196, 44, 18, '#FFF59D', 3) + C(206, 38, 16, '#FAFAFA', 0) + Lc('M30 30v190M214 100v120', '#6D4C41', 10)
    + P('M60 100c20-14 100-14 120 0l10 50c-20 10-120 10-140 0z', '#A1887F') + Lc('M60 100l-14-6M180 100l14-6M50 150l-12 6M190 150l12 6', '#8D6E63', 6)
    + P('M120 160c6 20 4 40-6 56 14-4 22-30 18-56z', '#8D6E63') + E(120, 128, 30, 26, '#BCAAA4', 0)
    + C(120, 92, 22, '#A1887F') + C(104, 74, 7, '#A1887F') + C(136, 74, 7, '#A1887F') + E(120, 100, 12, 8, '#EFEBE9', 0)
    + C(110, 90, 6, INK, 0) + C(130, 90, 6, INK, 0) + C(112, 88, 2, '#FFFFFF', 0) + C(132, 88, 2, '#FFFFFF', 0) + E(102, 98, 5, 3, '#FF8FA3', 0) + E(138, 98, 5, 3, '#FF8FA3', 0) + Lc('M116 102q4 4 8 0', INK, 2.5)),

  L('tanuki', 'ทานูกิตัวกลมในป่านิกโก้', 'A round tanuki in the Nikko woods', ['tanuki', 'ทานูกิ', 'raccoon dog', 'หมาแรคคูน', 'forest animal', 'สัตว์ป่า', 'eye mask', 'หน้ากากรอบตา', 'ferns', 'เฟิร์น'], nm('หาหน้ากากสีเข้มรอบตา', 'Find the dark mask round its eyes'),
    // a plump fluffy grey-brown raccoon dog sitting among green ferns, a pale face with a dark eye mask, dark legs, a bushy tail curled round its side
    [[30, 210, -1], [210, 210, 1], [60, 214, -1]].map(([x, y, d]) => Lc(`M${x} ${y}c${d * 6}-30 ${d * 20}-50 ${d * 40}-60`, '#558B2F', 6) + [0.3, 0.5, 0.7].map((t) => P(`M${x + d * 40 * t * t} ${y - 60 * t}c${d * 10}-6 ${d * 18}-4 ${d * 22} 2-8 4-16 4-22-2z`, '#7CB342', 2)).join('')).join('')
    + P('M170 190c30 0 40-30 20-44-10 14-20 24-30 26z', '#8D6E63') + Lc('M180 176l10-8M176 186l12-4', '#5D4037', 3)
    + E(120, 160, 56, 50, '#A1887F') + E(120, 170, 30, 30, '#D7CCC8', 0) + Lc('M92 206v8M148 206v8', '#4E342E', 12)
    + C(120, 98, 38, '#A1887F') + P('M90 76l-6-22 22 12zM150 76l6-22-22 12z', '#6D4C41') + E(120, 106, 26, 20, '#EFEBE9', 0)
    + E(104, 96, 12, 9, '#4E342E', 0) + E(136, 96, 12, 9, '#4E342E', 0) + C(120, 108, 5, INK, 0)
    + C(104, 96, 4, '#FFFFFF', 0) + C(136, 96, 4, '#FFFFFF', 0) + E(96, 114, 5, 3, '#FF8FA3', 0) + E(144, 114, 5, 3, '#FF8FA3', 0) + Lc('M114 116q6 5 12 0', INK, 2.5)),

  L('kirifuri', 'บันไดยาวขึ้นเนินที่ที่ราบสูงคิริฟุริ', 'The long staircase up the hill at Kirifuri Highland', ['kirifuri highland', 'ที่ราบสูงคิริฟุริ', 'long staircase', 'บันไดยาว', '1445 steps', 'บันได 1445 ขั้น', 'hilltop lookout', 'จุดชมวิวบนเนิน', 'meadow', 'ทุ่งหญ้า'], nm('หาศาลาเล็กๆ บนยอดเนิน', 'Find the little lookout hut on top'),
    // a straight wooden staircase climbing a rolling green meadow hill to a small lookout hut on the top, little yellow flowers in the grass, clouds
    P('M10 214c30-80 70-150 110-150s80 70 110 150z', '#9CCC65') + P('M100 214l14-140h12l14 140z', '#D7A86E')
    + [80, 92, 104, 118, 132, 148, 164, 182, 200].map((y) => { const t = (y - 74) / 140; return Lc(`M${114 - 14 * t} ${y}h${12 + 28 * t}`, '#8D6E63', 2.5); }).join('')
    + R(102, 46, 36, 24, '#A1887F') + P('M96 48l24-18 24 18z', '#E53935') + R(112, 54, 16, 10, '#B3E5FC', 0, 2.5)
    + [[50, 180], [70, 150], [170, 150], [190, 182], [150, 196], [84, 196]].map(([x, y]) => C(x, y, 4, '#FFEB3B', 2)).join('')
    + P('M30 40c4-10 18-10 22 0 8 0 10 10 2 12H28c-8-2-6-12 2-12z', '#FFFFFF', 3) + face(120, 130, 0.3)),

  L('shiraneaoi', 'ดอกชิราเนะอาโออิสีม่วงอ่อน', 'Shirane-aoi, the pale purple flower of Mount Nikko-Shirane', ['shirane-aoi', 'ชิราเนะอาโออิ', 'glaucidium', 'ดอกไม้ภูเขา', 'nikko-shirane', 'ภูเขานิกโก้ชิราเนะ', 'purple flower', 'ดอกไม้สีม่วง', 'alpine plant', 'พืชภูเขาสูง'], nm('หากลีบดอกสีม่วงอ่อนสี่กลีบ', 'Find the four soft purple petals'),
    // one big pale lilac four-petalled flower with a yellow centre on a green stem, two wide many-lobed leaves below and a smaller bud
    Lc('M120 214V130', '#558B2F', 6) + P('M120 190c-30-10-70 0-84 22 30 6 60 0 84-22zM120 170c30-14 70-8 86 12-28 10-62 6-86-12z', '#7CB342') + Lc('M120 190l-60 14M120 170l60 6', '#558B2F', 2.5)
    + Lc('M120 150c20-10 34-24 40-40', '#558B2F', 4) + E(162, 104, 8, 12, '#CE93D8')
    + [0, 90, 180, 270].map((a) => g(120, 96, 1, P('M0 0c-26-10-34-40-20-56 10-6 20-6 20 0 0-6 10-6 20 0 14 16 6 46-20 56z', '#E1BEE7'), a)).join('')
    + C(120, 96, 14, '#FFEB3B') + [0, 60, 120, 180, 240, 300].map((a) => g(120, 96, 1, C(0, -8, 2.5, '#FBC02D', 0), a)).join('') + face(120, 94, 0.3)),
];

export default {
  places: {
    'jp-nikko': { country: 'jp', wave: 3, name: nm('นิกโก้และคินุงาวะ', 'Nikko and Kinugawa'), tz: 'Asia/Tokyo', ll: [36.75, 139.6], alias: ['nikko', 'นิกโก้', '日光', 'kinugawa', 'คินุงาวะ', '鬼怒川', 'chuzenji', 'ชูเซนจิ', 'oku-nikko', 'okunikko', 'โอคุนิกโก้', 'senjogahara', 'เซ็นโจงาฮาระ'], colors: NK },
  },
  items,
};
