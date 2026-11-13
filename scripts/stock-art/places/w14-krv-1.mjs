// Wave 14, Korea: Suwon (Hwaseong fortress) and the Korean Folk Village at Yongin — the city stamp, two day scenes and
// the place's own landmarks, foods and folk-village crafts; no theme parks, no archery, no swings, tops or rice pounding
// (those are drawn elsewhere in the library), people only as cute generic children
import { P, R, C, E, Lc, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const SW = { k1: '#A93226', k2: '#2E6B4F', k3: '#FBEFE3' };
const CITY = 'kr-suwon', DIR = 'kr/suwon';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
// a Korean tiled roof with upturned eave tips (cx = middle, y = eave line, w = half width, h = height)
const roof = (cx, y, w, h, fill = '#5D4037', sw) => P(`M${cx - w} ${y - h * 0.4}Q${cx - w * 0.85} ${y} ${cx - w * 0.68} ${y}H${cx + w * 0.68}Q${cx + w * 0.85} ${y} ${cx + w} ${y - h * 0.4}L${cx + w * 0.62} ${y - h}H${cx - w * 0.62}Z`, fill, sw);
// the green-and-red painted band (dancheong) under the eaves
const band = (cx, y, w) => R(cx - w, y, w * 2, 6, '#26A69A', 0, 2.5) + Lc(`M${cx - w + 4} ${y + 3}h${w * 2 - 8}`, '#EF5350', 2);
// a stone block wall (x, y, width, height, rows)
const stones = (x, y, w, h, rows = 3, fill = '#D7CCC8') => R(x, y, w, h, fill, 0, 4) + Array.from({ length: rows - 1 }, (_, k) => Lc(`M${x} ${y + (h / rows) * (k + 1)}h${w}`, '#A1887F', 2)).join('')
  + Array.from({ length: rows }, (_, k) => Array.from({ length: Math.floor(w / 22) }, (_, j) => Lc(`M${x + 11 + j * 22 + (k % 2) * 11} ${y + (h / rows) * k + 1}v${h / rows - 2}`, '#A1887F', 2)).join('')).join('');
// a child in hanbok: round head with a bun of black hair, a jacket (top) and a skirt or trousers
const kid = (x, y, s, top, bottom) => P(`M${x - 16 * s} ${y + 54 * s}l${4 * s} ${-26 * s}h${24 * s}l${4 * s} ${26 * s}z`, bottom, 3) + R(x - 13 * s, y + 14 * s, 26 * s, 18 * s, top, 5 * s, 3)
  + C(x, y, 15 * s, '#FFE0B2', 3) + P(`M${x - 15 * s} ${y - 2 * s}c0-14 30-14 30 0c-6-6-24-6-30 0z`, INK, 0) + face(x, y + 2 * s, 0.32 * s);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับซูวอน', 'Suwon stamp'), kw: ['suwon', 'ซูวอน', 'hwaseong fortress', 'ป้อมฮวาซอง', 'hwahongmun', 'ประตูน้ำฮวาฮงมุน', 'seven arches', 'สะพานเจ็ดซุ้ม'],
    // Hwahongmun: a stone bridge-gate with seven little arches over a blue stream, a red pavilion with a curved roof on top
    svg: cityStamp('sw-st', { name: 'SUWON', sub: 'HWASEONG · KOREA', ...SW, emblem: R(52, 126, 96, 14, '#4FC3F7', 6, 2.5) + R(56, 104, 88, 24, '#E0D6C8', 2, 3)
      + Array.from({ length: 7 }, (_, i) => P(`M${59 + i * 12} 128v-9a5 5 0 0 1 10 0v9z`, '#4FC3F7', 2)).join('')
      + R(76, 86, 48, 18, '#C0392B', 0, 2.5) + Lc('M88 86v18M100 86v18M112 86v18', '#FBEFE3', 2) + roof(100, 88, 34, 20, '#5D4037', 2.5)
      + Lc('M56 134q5-4 10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0', '#E1F5FE', 2) }) },

  D('wall', 'เดินบนกำแพงป้อมฮวาซองยามเย็น', 'Walking the Hwaseong fortress wall at sunset', ['hwaseong fortress', 'ป้อมฮวาซอง', 'fortress wall walk', 'เดินบนกำแพงป้อม', 'suwon', 'ซูวอน', 'seojangdae', 'ซอจังแด', 'paldalsan', 'ภูเขาพัลดัลซาน'],
    // an orange sky, a grey stone wall with dark battlements winding up a green hill to a red command pavilion on top, little roofs of the town below
    scene('sw-d1', '#FFCC80', C(60, 66, 20, '#FFF59D', 3) + P('M-4 150c50-40 110-80 160-96 30-8 60 6 88 26v170H-4z', '#7CB342')
      + Lc('M-4 214c40-10 70-40 100-74s60-60 98-72', '#BCAAA4', 20) + `<path d="M-4 202c40-10 70-40 100-74s60-60 98-72" fill="none" stroke="#5D4037" stroke-width="8" stroke-dasharray="9 6"/>`
      + R(172, 52, 40, 20, '#C0392B', 0, 3) + Lc('M184 52v20M200 52v20', '#FBEFE3', 2.5) + roof(192, 54, 30, 18) + face(192, 62, 0.25)
      + P('M140 244l10-26h40l10 26zM188 244l8-20h30l8 20z', '#8D6E63') + roof(170, 222, 26, 12, '#455A64') + roof(214, 226, 22, 10, '#455A64')
      + C(40, 170, 14, '#388E3C') + C(70, 196, 12, '#388E3C') + kid(104, 132, 0.55, '#F48FB1', '#4FC3F7'))),

  D('folkvillage', 'หมู่บ้านพื้นบ้านเกาหลีที่ยงอิน', 'The Korean Folk Village at Yongin', ['korean folk village', 'หมู่บ้านพื้นบ้านเกาหลี', 'yongin', 'ยงอิน', 'thatched houses', 'บ้านหลังคาฟาง', 'stone walls', 'กำแพงหิน', 'old korea', 'เกาหลีสมัยก่อน'],
    // round golden thatched cottages roped down with a net pattern, a low stone wall, a tiled hanok behind, a big shady tree and a dirt lane
    scene('sw-d2', '#B3E5FC', C(196, 54, 16, '#FFF59D', 3) + P('M-4 120c60-20 160-26 248-8v140H-4z', '#AED581')
      + R(132, 86, 84, 34, '#FFF8E1', 0, 3) + roof(174, 90, 54, 24, '#546E7A') + Lc('M150 92v28M174 92v28M198 92v28', '#8D6E63', 3)
      + C(54, 74, 32, '#558B2F') + Lc('M54 100v30', '#6D4C41', 8)
      + [[50, 170, 1.15], [150, 172, 1]].map(([x, y, s]) => R(x - 34 * s, y - 6, 68 * s, 40 * s, '#FFE0B2', 0, 3) + R(x - 8 * s, y + 6, 16 * s, 28 * s, '#8D6E63', 0, 2.5)
        + P(`M${x - 46 * s} ${y}c0-30 22-44 ${46 * s} -44s${46 * s} 14 ${46 * s} 44z`, '#E0B556') + Lc(`M${x - 30 * s} ${y - 2}c4-22 14-34 ${30 * s} -40M${x + 30 * s} ${y - 2}c-4-22-14-34-${30 * s} -40M${x - 42 * s} ${y - 14}h${84 * s}`, '#A1887F', 2.5)).join('')
      + face(50, 186, 0.3) + P('M100 244c4-20 10-40 4-60h22c-6 20 0 40 6 60z', '#D7CCC8')
      + Array.from({ length: 6 }, (_, k) => E(176 + (k % 3) * 22, 218 + Math.floor(k / 3) * 14, 11, 7, '#BCAAA4', 2.5)).join(''))),

  L('paldalmun', 'ประตูพัลดัลมุน', 'Paldalmun, the south gate inside its half-moon wall', ['paldalmun', 'ประตูพัลดัลมุน', 'south gate of suwon', 'ประตูทิศใต้', 'half-moon wall', 'กำแพงครึ่งวงกลม', 'ongseong', 'อองซอง', 'two-storey gate', 'ประตูหลังคาสองชั้น'], nm('หากำแพงโค้งครึ่งวงกลมที่ล้อมหน้าประตู', 'Find the curved half-moon wall in front of the gate'),
    // a two-storey gate tower with stacked curved roofs on a stone base with a tall arch, a low curved stone wall wrapping round in front with its own small arch
    stones(52, 120, 136, 50, 3) + P('M104 170v-30a16 16 0 0 1 32 0v30z', '#5D4037') + R(70, 92, 100, 28, '#C0392B', 0, 4) + Lc('M90 92v28M120 92v28M150 92v28', '#FBEFE3', 3)
    + band(120, 92, 62) + roof(120, 94, 76, 30) + R(86, 52, 68, 16, '#C0392B', 0, 3.5) + band(120, 50, 40) + roof(120, 54, 54, 26)
    + face(120, 108, 0.45) + P('M18 222c0-40 44-64 102-64s102 24 102 64h-24c0-24-34-42-78-42s-78 18-78 42z', '#BCAAA4')
    + `<path d="M24 196c16-24 52-38 96-38s80 14 96 38" fill="none" stroke="#5D4037" stroke-width="6" stroke-dasharray="10 7"/>` + P('M110 182v-12a10 10 0 0 1 20 0v12z', '#5D4037', 3)),

  L('hwahongmun', 'ประตูน้ำฮวาฮงมุน', 'Hwahongmun, the floodgate with seven arches', ['hwahongmun', 'ฮวาฮงมุน', 'floodgate', 'ประตูน้ำ', 'seven arches', 'ซุ้มโค้งเจ็ดช่อง', 'suwoncheon stream', 'ลำธารซูวอนชอน', 'rushing water', 'น้ำไหลแรง'], nm('หาน้ำสีขาวที่พุ่งออกมาจากซุ้มโค้ง', 'Find the white water rushing out of the arches'),
    // a long stone bridge with seven arches, white water pouring out of each into a blue stream, a pavilion with a red frame and dark curved roof on top
    R(14, 180, 212, 40, '#4FC3F7', 14) + stones(20, 122, 200, 52, 2, '#E0D6C8')
    + Array.from({ length: 7 }, (_, i) => P(`M${28 + i * 27} 174v-18a10 10 0 0 1 20 0v18z`, '#37474F', 3) + P(`M${30 + i * 27} 174c0 10 4 18 8 26 4-8 8-16 8-26z`, '#E1F5FE', 2.5)).join('')
    + R(66, 92, 108, 30, '#C0392B', 0, 4) + Lc('M84 92v30M120 92v30M156 92v30', '#FBEFE3', 3) + band(120, 92, 56) + roof(120, 94, 72, 34) + face(120, 106, 0.4)
    + Lc('M24 206q8-6 16 0t16 0M150 210q8-6 16 0t16 0', '#E1F5FE', 3)),

  L('banghwasuryujeong', 'ศาลาพังฮวาซูรยูจองเหนือสระยงยอน', 'Banghwasuryujeong pavilion above the round Yongyeon pond', ['banghwasuryujeong', 'พังฮวาซูรยูจอง', 'yongyeon pond', 'สระยงยอน', 'pavilion on the wall', 'ศาลาบนกำแพง', 'willow tree', 'ต้นหลิว', 'round pond island', 'เกาะกลางสระกลม'], nm('หาเกาะเล็กกลมกลางสระที่มีต้นไม้', 'Find the little round island with a tree in the pond'),
    // a pavilion with an open red frame and a cross-shaped roof on a stone wall at the top right, below it a round blue pond with a round island and tree, a drooping willow
    E(96, 182, 84, 38, '#4FC3F7') + E(96, 182, 20, 10, '#AED581', 3) + Lc('M96 176v-18', '#6D4C41', 4) + C(96, 152, 13, '#66BB6A')
    + stones(126, 96, 100, 46, 2) + R(140, 66, 72, 30, '#C0392B', 0, 4) + Lc('M156 66v30M176 66v30M196 66v30', '#FBEFE3', 3) + roof(176, 68, 50, 28)
    + P('M164 46l12-14 12 14z', '#5D4037', 3) + face(176, 80, 0.36)
    + Lc('M30 70c10-20 30-26 46-20', '#6D4C41', 5) + [36, 48, 60, 72].map((x) => Lc(`M${x} ${62 - (x - 36) / 6}c-4 20-2 40 2 56`, '#9CCC65', 4)).join('')
    + Lc('M40 192q10-6 20 0M120 196q10-6 20 0', '#E1F5FE', 3)),

  L('gongsimdon', 'หอสังเกตการณ์ทรงกลมคงชิมดน', 'Dongbuk Gongsimdon, the round lookout tower', ['gongsimdon', 'คงชิมดน', 'round lookout tower', 'หอสังเกตการณ์ทรงกลม', 'brick watchtower', 'หอคอยอิฐ', 'spiral stairs inside', 'บันไดวนข้างใน', 'peep windows', 'ช่องหน้าต่างเล็กๆ'], nm('หาหน้าต่างสี่เหลี่ยมเล็กๆ รอบหอคอย', 'Find the little square windows round the tower'),
    // a fat round grey-brick tower that narrows to the top, rows of small square windows, a small pavilion with a curved roof on top, a stone base
    stones(40, 192, 160, 26, 1) + P('M58 192l18-112h88l18 112z', '#CFD8DC') + Array.from({ length: 5 }, (_, k) => Lc(`M${60 + k * 3.2} ${176 - k * 20}h${120 - k * 6.4}`, '#90A4AE', 2)).join('')
    + [[86, 168], [120, 168], [154, 168], [96, 128], [144, 128], [120, 108]].map(([x, y]) => R(x - 6, y - 6, 12, 12, '#37474F', 1, 3)).join('')
    + R(92, 56, 56, 24, '#C0392B', 0, 3.5) + Lc('M110 56v24M130 56v24', '#FBEFE3', 2.5) + roof(120, 58, 42, 26) + P('M104 192v-22a16 16 0 0 1 32 0v22z', '#5D4037') + face(120, 144, 0.5)),

  L('bongdon', 'หอสัญญาณไฟห้าปล่องพงดน', 'Bongdon, the beacon tower with five chimneys', ['bongdon', 'พงดน', 'beacon tower', 'หอสัญญาณไฟ', 'five chimneys', 'ปล่องห้าปล่อง', 'smoke signal', 'สัญญาณควัน', 'one puff means all is well', 'ควันหนึ่งสายแปลว่าปลอดภัย'], nm('หาปล่องที่มีควันลอยขึ้นมาแค่ปล่องเดียว', 'Find the one chimney puffing smoke'),
    // a square brick platform with five short round chimneys in a row, a little puff of white smoke curling from the first one, a wall running off to the side
    stones(20, 170, 200, 34, 2, '#BCAAA4') + R(34, 120, 172, 50, '#D7CCC8', 4) + Array.from({ length: 4 }, (_, k) => Lc(`M34 ${130 + k * 10}h172`, '#BCAAA4', 2)).join('')
    + [50, 86, 120, 154, 190].map((x) => R(x - 12, 82, 24, 40, '#E0E0E0', 4) + E(x, 82, 12, 4, '#424242', 3)).join('')
    + C(50, 58, 12, '#FFFFFF', 3) + C(64, 42, 14, '#FFFFFF', 3) + C(82, 28, 10, '#FFFFFF', 3) + face(120, 140, 0.5)),

  L('eocha', 'รถไฟหัวมังกรชมป้อมฮวาซอง', 'The dragon-head tour train round Hwaseong', ['hwaseong eocha', 'รถชมเมืองฮวาซองออชา', 'dragon tour train', 'รถไฟหัวมังกร', 'king\'s carriage', 'รถทรงพระราชา', 'fortress tour', 'นั่งรถชมป้อม', 'yellow canopy', 'หลังคาสีเหลือง'], nm('หาหัวมังกรสีเขียวที่หน้ารถ', 'Find the green dragon head at the front'),
    // a little road train: a green dragon head with horns and whiskers on the front car, a red car with a golden roof, a second car with a yellow canopy, big round wheels
    R(16, 200, 208, 8, '#9E9E9E', 4, 0) + R(64, 128, 70, 56, '#C0392B', 8) + P('M58 132l12-24h58l12 24z', '#FFC107') + R(76, 140, 46, 22, '#E1F5FE', 4, 3)
    + R(142, 136, 76, 48, '#FFF59D', 6) + P('M138 140c8-18 24-24 42-24s34 6 42 24z', '#FFC107') + Lc('M156 140v44M182 140v44M206 140v44', '#C0392B', 3)
    + P('M66 178c-20 0-40-8-46-26-4-14 2-30 18-32 10-2 20 6 24 16z', '#43A047') + P('M30 122l-8-20 18 12zM44 118l2-22 10 18z', '#FFC107', 3)
    + C(36, 140, 5, INK, 0) + Lc('M22 158c-10 4-14 12-10 20M26 162c-6 8-6 16 0 22', '#FFC107', 3) + E(40, 150, 5, 3, '#FF8FA3', 0)
    + [[86, 188], [116, 188], [160, 188], [200, 188]].map(([x, y]) => C(x, y, 13, '#455A64') + C(x, y, 4, '#FFC107', 2)).join('') + face(170, 158, 0.38)),

  L('galbi', 'คัลบีย่างแบบซูวอน', 'Suwon wang galbi, big beef ribs on the grill', ['suwon galbi', 'คัลบีซูวอน', 'wang galbi', 'ซี่โครงวัวยักษ์', 'korean barbecue', 'บาร์บีคิวเกาหลี', 'charcoal grill', 'เตาถ่าน', 'lettuce wrap', 'ห่อผักกาด'], nm('หากระดูกซี่โครงยาวที่มีเนื้อพันอยู่', 'Find the long rib bone with the meat wrapped round it'),
    // a round grill over glowing coals, a long zigzag ribbon of glossy brown meat still joined to its white rib bone, a stack of lettuce leaves and a dish of garlic in front
    E(120, 150, 100, 40, '#424242') + E(120, 142, 90, 32, '#FF7043') + Array.from({ length: 7 }, (_, k) => Lc(`M${42 + k * 26} 118v50`, '#5D4037', 3)).join('')
    + P('M36 132c0-14 12-22 26-18l18 6 18-8 18 8 18-8 18 8 18-8 14 6c10 4 10 22-2 24l-16 4-18-6-18 6-18-6-18 6-18-6-18 6-18-4c-10-2-14-8-14-14z', '#9A4E2C')
    + Lc('M80 120v28M116 120v28M152 120v28', '#6B2E16', 3) + R(166, 120, 56, 14, '#FFFDE7', 7, 3) + C(222, 120, 8, '#FFFDE7', 3) + C(222, 134, 8, '#FFFDE7', 3) + face(98, 134, 0.42)
    + P('M30 210c-6-26 16-42 40-38 18 4 30 18 26 38z', '#9CCC65') + P('M48 214c-2-20 14-32 32-28 14 4 22 14 20 28z', '#7CB342') + Lc('M64 184c2 10 4 20 2 28', '#558B2F', 3)
    + E(176, 206, 34, 12, '#FFFFFF') + C(164, 198, 8, '#FFF8E1', 2.5) + C(182, 198, 8, '#FFF8E1', 2.5) + C(173, 190, 8, '#FFF8E1', 2.5)),

  L('haewoojae', 'บ้านรูปโถส้วมแฮอูแจ', 'Haewoojae, the house shaped like a toilet', ['haewoojae', 'แฮอูแจ', 'toilet house', 'บ้านรูปชักโครก', 'toilet museum', 'พิพิธภัณฑ์ห้องน้ำ', 'mr toilet house', 'บ้านโถส้วม', 'funny building', 'ตึกตลก'], nm('หาฝารองนั่งบนหลังคาบ้าน', 'Find the toilet seat on top of the house'),
    // a white house shaped like a toilet bowl seen from the side: a round bowl body with windows, a seat ring on top, a tall tank at the back, on green grass
    P('M10 210c40-12 180-12 220 0v14H10z', '#9CCC65') + R(152, 54, 54, 100, '#FAFAFA', 10) + R(146, 46, 66, 14, '#E0E0E0', 6, 3) + R(172, 84, 18, 22, '#81D4FA', 3, 3)
    + P('M30 120h140c0 46-20 74-54 86v6H86v-6c-34-12-56-40-56-86z', '#FFFFFF') + E(100, 118, 74, 14, '#E3F2FD') + E(100, 114, 56, 8, '#B3E5FC', 3)
    + [[62, 150], [96, 158], [130, 150]].map(([x, y]) => R(x - 9, y - 9, 18, 18, '#81D4FA', 3, 3)).join('') + P('M88 212v-24a12 12 0 0 1 24 0v24z', '#8D6E63') + face(100, 172, 0.5)
    + C(30, 196, 12, '#66BB6A') + C(216, 196, 12, '#66BB6A')),

  L('neolttwigi', 'เด็กๆ เล่นกระดานกระโดดนอลตวีกี', 'Neolttwigi, jumping on the Korean seesaw', ['neolttwigi', 'นอลตวีกี', 'korean seesaw', 'กระดานกระโดด', 'see-saw jumping', 'กระโดดไม้กระดก', 'folk game', 'การละเล่นพื้นบ้าน', 'new year game', 'เกมวันปีใหม่'], nm('หาเด็กที่ลอยตัวขึ้นไปบนฟ้า', 'Find the child flying up in the air'),
    // a long plank on a straw bundle, one child in a pink hanbok standing on the low end, the other in a yellow top flying high above the other end with arms up
    E(120, 210, 104, 8, '#C5E1A5', 0) + E(120, 196, 22, 14, '#E0B556') + Lc('M104 190l12 12M124 186l6 16M136 190l-6 12', '#A1887F', 2) + P('M24 202l192-16 2 10-192 16z', '#A1887F')
    + kid(44, 140, 0.95, '#F48FB1', '#7E57C2') + kid(186, 44, 0.9, '#FFEB3B', '#4FC3F7')
    + Lc('M170 64l-16-16M202 64l16-16', '#FFEB3B', 6) + Lc('M176 98l-6 22M196 98l6 22', '#FFE0B2', 5) + C(150, 130, 4, '#FFCA28', 0) + C(222, 120, 4, '#FFCA28', 0)),

  L('sangmo', 'หมวกริบบิ้นหมุนของการเต้นนงอัก', 'The spinning ribbon hat of the farmers\' dance', ['sangmo', 'ซังโม', 'ribbon hat', 'หมวกริบบิ้น', 'nongak', 'นงอัก', 'farmers\' music', 'ดนตรีชาวนา', 'spinning ribbon', 'ริบบิ้นหมุนเป็นวง'], nm('หาริบบิ้นสีขาวยาวที่หมุนเป็นวง', 'Find the long white ribbon swirling in loops'),
    // a smiling child in a white jacket with red, yellow and blue sashes, a little black hat with a long white ribbon swirling round in big loops above
    `<path d="M120 54c40-30 100-10 96 30-4 36-60 44-86 20-20-20 0-50 30-46" fill="none" stroke="${INK}" stroke-width="14"/><path d="M120 54c40-30 100-10 96 30-4 36-60 44-86 20-20-20 0-50 30-46" fill="none" stroke="#FFFFFF" stroke-width="8"/>`
    + P('M76 226l10-60h68l10 60z', '#FFFFFF') + Lc('M88 172l64 46', '#EF5350', 7) + Lc('M152 172l-64 46', '#FFCA28', 7) + Lc('M80 210h80', '#1E88E5', 7)
    + C(120, 120, 34, '#FFE0B2') + face(120, 124, 0.62) + P('M86 104c0-28 68-28 68 0z', INK) + R(110, 70, 20, 16, INK, 3) + C(120, 64, 6, '#FFCA28', 2.5)),

  L('woodenducks', 'เป็ดไม้คู่ในงานแต่งงานเกาหลี', 'A pair of wooden wedding ducks', ['wooden wedding ducks', 'เป็ดไม้งานแต่ง', 'mandarin ducks', 'เป็ดแมนดาริน', 'wonang', 'วอนัง', 'traditional wedding', 'งานแต่งงานแบบเกาหลีโบราณ', 'red and blue cloth', 'ผ้าแดงผ้าน้ำเงิน'], nm('หาผ้าสีแดงที่พันคอเป็ดตัวหนึ่ง', 'Find the red cloth tied round one duck'),
    // two carved wooden ducks side by side facing each other, painted blue, green and red, one wearing a red cloth and one a blue cloth, on a low wooden tray
    R(20, 196, 200, 16, '#A1887F', 6) + [[72, 1, '#EF5350'], [168, -1, '#1E88E5']].map(([x, d, c]) => P(`M${x - d * 30} 170l${-d * 26} -26 ${d * 6} 36z`, '#5D4037') + E(x, 170, 44, 24, '#8D6E63')
      + P(`M${x - d * 24} 160c${d * 14}-10 ${d * 34}-10 ${d * 46} 2`, 'none', 3) + E(x - d * 6, 168, 22, 12, '#26A69A', 3) + Lc(`M${x + d * 12} 150v-24`, '#8D6E63', 14)
      + C(x + d * 18, 112, 22, '#26A69A') + P(`M${x + d * 36} 110l${d * 22} 4 ${-d * 22} 8z`, '#FFB300', 3) + C(x + d * 22, 106, 4, INK, 0) + E(x + d * 14, 118, 5, 3, '#FF8FA3', 0)
      + Lc(`M${x - 4 + d * 4} 126c${d * 10} 6 ${d * 20} 6 ${d * 30} 0`, c, 8)).join('')),

  L('yakgwa', 'ขนมยักกวาน้ำผึ้งรูปดอกไม้', 'Yakgwa, flower-shaped honey cookies', ['yakgwa', 'ยักกวา', 'honey cookies', 'คุกกี้น้ำผึ้ง', 'flower-shaped sweets', 'ขนมรูปดอกไม้', 'korean traditional snack', 'ขนมโบราณเกาหลี', 'pine nuts', 'เมล็ดสน'], nm('หาเมล็ดสนเล็กๆ ตรงกลางขนม', 'Find the little pine nut in the middle of a cookie'),
    // a round white plate holding glossy brown flower-shaped cookies with scalloped edges, each with a pine nut in the middle, one big cookie smiling on top
    E(120, 168, 100, 40, '#FFFFFF') + E(120, 168, 84, 30, '#ECEFF1', 2)
    + [[70, 164, 0.75], [170, 164, 0.75], [120, 182, 0.7]].map(([x, y, s]) => P(Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI * 2; return `${k ? 'L' : 'M'}${(x + Math.cos(a) * 30 * s).toFixed(1)} ${(y + Math.sin(a) * 22 * s).toFixed(1)}`; }).join('') + 'Z', '#B0643A') + E(x, y, 6 * s, 4 * s, '#FFF3E0', 2)).join('')
    + P(Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2, r = k % 2 ? 46 : 54; return `${k ? 'L' : 'M'}${(120 + Math.cos(a) * r).toFixed(1)} ${(118 + Math.sin(a) * r).toFixed(1)}`; }).join('') + 'Z', '#C27C43')
    + C(120, 118, 34, '#D99256', 3) + E(120, 92, 8, 5, '#FFF3E0', 2.5) + face(120, 122, 0.55)),

  L('sikhye', 'ชิกเฮ น้ำข้าวหวานเย็น', 'Sikhye, the sweet rice drink', ['sikhye', 'ชิกเฮ', 'sweet rice drink', 'น้ำข้าวหวาน', 'rice punch', 'พันช์ข้าว', 'gourd ladle', 'กระบวยน้ำเต้า', 'floating rice grains', 'เมล็ดข้าวลอยน้ำ'], nm('หาเม็ดข้าวที่ลอยอยู่ในน้ำ', 'Find the rice grains floating on top'),
    // a wide brass bowl full of pale golden sikhye with white rice grains and pine nuts floating, a half-gourd ladle resting across it, a cup beside
    P('M28 112h184c-4 52-40 88-92 88s-88-36-92-88z', '#E0B556') + E(120, 112, 92, 22, '#FFF3C4') + E(120, 112, 80, 16, '#F7E3A1', 2)
    + Array.from({ length: 16 }, (_, k) => E(62 + (k * 37) % 116, 106 + (k * 13) % 14, 4, 2, '#FFFFFF', 1.5)).join('') + C(96, 112, 3, '#FFE0B2', 1.5) + C(140, 108, 3, '#FFE0B2', 1.5)
    + P('M150 98c10-30 44-44 70-32 10 6 6 20-6 22-24 4-44 6-60 16z', '#D4A35A') + face(120, 156, 0.55) + P('M18 212h204', 'none', 4)),

  L('gyeranppang', 'แกรันปัง ขนมปังไข่', 'Gyeran-ppang, the egg bread', ['gyeran-ppang', 'แกรันปัง', 'egg bread', 'ขนมปังไข่', 'korean street snack', 'ของกินข้างทางเกาหลี', 'whole egg on top', 'ไข่ทั้งฟอง', 'winter snack', 'ของว่างหน้าหนาว'], nm('หาไข่แดงที่อยู่บนขนมปัง', 'Find the egg yolk on top of the bread'),
    // a golden oval loaf of sweet bread with a whole baked egg on top (white and a round yolk), in a paper sleeve, a wisp of steam
    P('M50 136h140l-14 70H64z', '#FFF8E1') + Lc('M70 150l8 50M100 150l2 50M140 150l-2 50M170 150l-8 50', '#E0D6C8', 3)
    + P('M38 140c0-40 40-62 82-62s82 22 82 62c-20 10-144 10-164 0z', '#F5B04C') + E(124, 102, 40, 24, '#FFFFFF') + C(132, 100, 14, '#FFB300', 3) + C(128, 96, 4, '#FFE082', 0)
    + face(84, 120, 0.42) + Lc('M110 64c-8-10 8-16 0-26M140 64c-8-10 8-16 0-26', '#B0BEC5', 3)),

  L('doljabi', 'โต๊ะวันเกิดขวบแรกและการหยิบของทำนาย', 'A first-birthday table and the doljabi pick', ['first birthday', 'วันเกิดขวบแรก', 'doljanchi', 'ทลจันชี', 'doljabi', 'ทลจาบี', 'rice cake tower', 'ขนมต็อกซ้อนสูง', 'pick an object', 'หยิบของทำนายอนาคต'], nm('หาด้ายสีขาวม้วนกลมบนโต๊ะ', 'Find the round skein of white thread on the table'),
    // a low red lacquer table with towers of rainbow rice cakes and fruit, a skein of thread, a brush and a little drum in front, a baby in a striped hanbok and round hat reaching for them
    R(20, 160, 200, 16, '#C0392B', 4) + Lc('M34 176v34M206 176v34', '#8D2A1E', 8)
    + [[52, '#F48FB1'], [52, '#FFF59D'], [52, '#A5D6A7'], [52, '#90CAF9']].map(([x, c], k) => R(x - 18, 146 - k * 12, 36, 12, c, 3, 3)).join('')
    + C(188, 140, 14, '#EF5350') + C(176, 150, 12, '#FFB74D') + C(200, 152, 11, '#FFEB3B')
    + E(80, 196, 16, 9, '#FFFFFF') + Lc('M68 196q12-8 24 0', '#E0E0E0', 2) + Lc('M150 186l40 10', '#8D6E63', 5) + P('M188 194l10 6-4 4z', INK, 0) + R(110, 188, 20, 16, '#FFCA28', 5, 3)
    + P('M96 140l6-38h36l6 38z', '#FFFFFF') + [104, 112, 120, 128, 136].map((x, k) => Lc(`M${x} 106v34`, ['#EF5350', '#FFCA28', '#66BB6A', '#42A5F5', '#AB47BC'][k], 4)).join('')
    + C(120, 82, 22, '#FFE0B2') + P('M98 76c0-24 44-24 44 0z', '#1E88E5') + C(120, 54, 5, '#EF5350', 2.5) + face(120, 86, 0.42) + Lc('M138 112l20 24', '#FFE0B2', 7)),

  L('gamasot', 'หม้อเหล็กใบใหญ่บนเตาดินโบราณ', 'The big iron rice pot on the old clay stove', ['gamasot', 'คามาซ็อท', 'iron rice pot', 'หม้อหุงข้าวเหล็ก', 'clay stove', 'เตาดินโบราณ', 'agungi', 'อากุงอี', 'old korean kitchen', 'ครัวเกาหลีโบราณ'], nm('หาเปลวไฟสีส้มใต้หม้อ', 'Find the orange flames under the pot'),
    // a mud-brown clay stove with a round opening and orange flames and firewood inside, a big black iron pot with a wide rim and a round lid with a knob on top, steam rising
    P('M22 210V128c0-8 6-12 14-12h168c8 0 14 4 14 12v82z', '#C49A6C') + P('M86 210v-30a34 34 0 0 1 68 0v30z', '#4E342E')
    + P('M100 208c0-16 10-20 8-34 12 8 10 18 12 24 2-10 8-14 12-20 4 12 8 20 4 30z', '#FF7043', 3) + Lc('M92 206l56-8M96 196l48 10', '#795548', 6)
    + E(120, 118, 92, 12, '#37474F') + P('M44 118c4 26 34 34 76 34s72-8 76-34z', '#263238') + P('M54 110c6-24 30-36 66-36s60 12 66 36z', '#455A64') + C(120, 70, 9, '#37474F', 3.5)
    + face(120, 98, 0.45) + Lc('M90 56c-8-10 6-16-2-26M150 56c-8-10 6-16-2-26', '#B0BEC5', 3)),

  L('jige', 'แบกจีเก ที่แบกฟืนไม้รูปตัวเอ', 'The jige, the A-frame back carrier full of firewood', ['jige', 'จีเก', 'a-frame carrier', 'ที่แบกหลังรูปตัวเอ', 'firewood bundle', 'มัดฟืน', 'country life', 'ชีวิตชนบทเกาหลี', 'straw straps', 'สายฟางสะพาย'], nm('หาไม้ค้ำที่พิงจีเกไว้', 'Find the stick propping up the carrier'),
    // a wooden A-frame back carrier standing propped on a forked stick, two prongs sticking out, a big bundle of sticks tied on with straw rope and a red flower tucked in
    Lc('M80 218L104 40M160 218L136 40', '#8D6E63', 12) + Lc('M88 160h64M92 128h56M98 92h44', '#A1887F', 8) + Lc('M84 196l-40-40M156 196l40-40', '#8D6E63', 9)
    + Lc('M190 218l-40-130M150 88l-6-18M150 88l12-14', '#6D4C41', 6)
    + [-40, -24, -8, 8, 24, 40].map((dx, k) => Lc(`M${120 + dx} 150l${dx * 0.3} ${-100 + (k % 2) * 10}`, '#A1887F', 9)).join('') + Lc('M74 110h92M80 70h80', '#E0B556', 6)
    + C(150, 52, 9, '#EF5350', 2.5) + C(150, 52, 3, '#FFEB3B', 0) + face(120, 172, 0.42) + E(120, 222, 80, 6, '#C5E1A5', 0)),
];

export default {
  places: {
    'kr-suwon': { country: 'kr', wave: 3, name: nm('ซูวอนและหมู่บ้านพื้นบ้านเกาหลี', 'Suwon and the Korean Folk Village'), tz: 'Asia/Seoul', ll: [37.29, 127.01], alias: ['suwon', 'ซูวอน', 'hwaseong', 'ฮวาซอง', 'korean folk village', 'หมู่บ้านพื้นบ้านเกาหลี', 'yongin', 'ยงอิน', 'paldalmun', 'พัลดัลมุน', 'haenggung', 'แฮงกุง'], colors: SW },
  },
  items,
};
