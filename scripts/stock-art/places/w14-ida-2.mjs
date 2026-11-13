// Wave 14, Indonesia 2: Labuan Bajo, Komodo National Park and Flores — the stamp, two day scenes and landmarks.
// No Komodo dragon (Indonesia's country set has it), no manta (Maldives), no turtles, sandbars, bats, lift nets, starfish,
// dugongs, cave or waterfalls, no cliff jumps; Wae Rebo's houses only as buildings; no ikat weaving (taken).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const KM = { k1: '#D81B60', k2: '#00838F', k3: '#E0F7FA' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `id-komodo.landmark.${slug}`, cat: 'landmark', file: `id/komodo/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a phinisi: a deep curved wooden hull with a high stern, a bowsprit, two masts with slanting gaff sails and a little cabin
const phinisi = (x, y, s, sail = '#FFFFFF', sw = 4) => g(x, y, s, Lc('M-34-6V-92M16-6V-84M44-30l40-14', INK, sw)
  + P('M-37-16V-88l-38 34v38z', sail, sw) + P('M13-16V-80l-38 30v34z', sail, sw) + P('M19-78L82-42L32-16z', sail, sw)
  + R(-58, -22, 40, 14, '#FFE0B2', 2, sw) + P('M-80-8h168c-4 14-24 26-64 28h-62c-26-4-38-14-42-28z', '#8D5A33', sw) + P('M-80-8l-8-22h20l2 22zM88-8l10-18', '#8D5A33', sw)
  + Lc('M-70 2h150', '#FFCA28', sw * 0.8));
// a lontar palm: a slim grey trunk and a round crown of fan leaves
const lontar = (x, y, s) => g(x, y, s, Lc('M0 0V-80', '#8D7B6A', 6) + C(0, -92, 22, '#558B2F', 3) + [-60, -20, 20, 60, 100, 140, 180, 220].map((a) => P('M0-92l-6-22 6 4 6-4z', '#7CB342', 2).replace('<path', `<path transform="rotate(${a} 0 -92)"`)).join(''));

const items = [
  { id: 'id-komodo.stamp', cat: 'stamp', file: 'id/komodo/stamp.v1.svg', name: nm('ตราประทับลาบวนบาโจและโคโมโด', 'Labuan Bajo and Komodo stamp'), kw: ['labuan bajo', 'ลาบวนบาโจ', 'komodo national park', 'อุทยานแห่งชาติโคโมโด', 'padar', 'ปาดาร์', 'phinisi', 'เรือพินีซี'],
    // a wooden phinisi schooner with two white sails on turquoise water in front of the brown wavy hills of Padar
    svg: cityStamp('kmd-st', { name: 'LABUAN BAJO', sub: 'KOMODO', ...KM, emblem: P('M50 118c10-24 20-40 30-34s16 20 26 4 22-26 44 30z', '#BCAAA4', 3) + R(48, 118, 104, 26, '#4DD0E1', 0, 0) + phinisi(100, 134, 0.42, '#FFFFFF', 7) + face(98, 135, 0.18) }) },
  { id: 'id-komodo.day.padar', cat: 'day', file: 'id/komodo/day-padar.v1.svg', name: nm('วิวสามอ่าวบนเกาะปาดาร์', 'The three bays of Padar island'), kw: ['padar', 'ปาดาร์', 'three bays', 'สามอ่าว', 'viewpoint hike', 'เดินขึ้นจุดชมวิว', 'sunrise', 'พระอาทิตย์ขึ้น', 'pink sand', 'ทรายสีชมพู', 'komodo national park', 'อุทยานแห่งชาติโคโมโด'],
    // looking down from the top of Padar at dawn: wavy brown-green ridges curling round three bays of turquoise water with pink, white and black beaches, a stair path with little hikers in front
    svg: scene('kmd-d1', '#FFD7C2', C(186, 46, 16, '#FFE082', 0) + P('M-4 70h248v180H-4z', '#4DD0E1', 0) + Lc('M20 84c30-6 60 6 90 0M140 80c30-6 60 6 90 0', '#B2EBF2', 3)
      + P('M-4 104c14-4 26-6 34-4c0 50 56 50 56 0c6-14 18-14 24 0c0 54 64 54 64 0c6-14 18-14 24 0c0 50 50 50 50 0c6-4 10-4 22-2v152H-4z', '#A1887F')
      + [[58, 100, 28, '#F8BBD0'], [142, 100, 32, '#FFFFFF'], [215, 100, 25, '#546E7A']].map(([x, y, r, c]) => P(`M${x - r} ${y + 4}c0 ${r * 1.7} ${r * 2} ${r * 1.7} ${r * 2} 0`, 'none').replace('fill="none"', `fill="none" stroke="${c}" stroke-width="7"`)).join('')
      + Lc('M100 100c-6 30 0 60 10 90M184 100c-8 30-4 56 6 80M30 104c4 30 0 60-10 90', '#8D6E63', 4) + Lc('M70 170c10-6 20-6 30 0M150 176c10-6 20-6 30 0', '#9CCC65', 5)
      + P('M-4 196c40-20 80-20 124-6s80 10 128-6v70H-4z', '#7CB342') + P('M100 250l14-58h12l20 58z', '#D7CCC8') + Lc('M104 236h36M108 220h28M112 206h20', '#A1887F', 2.5)
      + [[116, 212, '#E53935'], [128, 232, '#1E88E5']].map(([x, y, c]) => C(x, y - 12, 5, '#F2C29B', 2) + R(x - 5, y - 7, 10, 12, c, 3, 2)).join('') + face(142, 128, 0.3)) },
  { id: 'id-komodo.day.harbour', cat: 'day', file: 'id/komodo/day-harbour.v1.svg', name: nm('อ่าวลาบวนบาโจยามพระอาทิตย์ตก', 'Labuan Bajo harbour at sunset'), kw: ['labuan bajo', 'ลาบวนบาโจ', 'harbour', 'ท่าเรือ', 'sunset', 'พระอาทิตย์ตก', 'phinisi boats', 'เรือพินีซี', 'islands', 'หมู่เกาะ', 'flores', 'ฟลอเรส'],
    // an orange-pink sunset over a calm bay dotted with humpy islands, wooden schooners anchored with sails furled, the little town of white houses climbing the green hill in front
    svg: scene('kmd-d2', '#FFAB91', C(120, 96, 28, '#FFE082', 0) + Lc('M20 60c40-6 80 6 120 0', '#F8BBD0', 6) + P('M-4 112h248v80H-4z', '#7E57C2', 0) + Lc('M90 124h60M100 136h40', '#FFE082', 4)
      + [[30, 112, 34], [92, 112, 18], [190, 112, 40]].map(([x, y, r]) => P(`M${x - r} ${y}c${r * 0.4}-${r * 0.7} ${r * 1.6}-${r * 0.7} ${r * 2} 0z`, '#5E35B1', 3)).join('')
      + [[60, 158, 0.34], [150, 150, 0.28], [200, 170, 0.32]].map(([x, y, s]) => g(x, y, s, Lc('M-34-6V-80M16-6V-72', INK, 10) + Lc('M-34-70l40 50M16-64l30 40', INK, 6) + P('M-80-8h168c-4 14-24 26-64 28h-62c-26-4-38-14-42-28z', '#6D4C41', 10))).join('')
      + P('M-4 196c40-16 90-24 140-14s80 4 108-8v80H-4z', '#558B2F') + [[30, 206], [56, 196], [84, 200], [110, 192], [160, 206], [190, 198], [214, 192]].map(([x, y]) => R(x - 9, y - 8, 18, 12, '#FFFFFF', 0, 2.5) + P(`M${x - 11} ${y - 8}l11-8 11 8z`, '#E57373', 2.5)).join('') + face(120, 92, 0.34)) },

  L('phinisi', 'เรือพินีซีไม้สองเสากระโดง', 'A phinisi, the wooden two-masted schooner', ['phinisi', 'พินีซี', 'wooden schooner', 'เรือใบไม้', 'liveaboard', 'ล่องเรือค้างคืน', 'two masts', 'สองเสากระโดง', 'sailing trip', 'ล่องเรือใบ', 'bugis boat', 'เรือบูกิส'], 'หาใบเรือรูปสามเหลี่ยมเอียงตรงหัวเรือ', 'Find the slanting triangle sail at the front of the boat',
    // a big wooden schooner with a deep curved brown hull, a yellow stripe, high stern and long bowsprit, two masts with slanting white sails, a cream cabin, on rippling blue water
    E(120, 196, 100, 12, '#4DD0E1', 0) + Lc('M30 202c20-6 40 6 60 0s40-6 60 0 40 6 60 0', '#B2EBF2', 3) + phinisi(118, 186, 1.15) + face(120, 196, 0.42).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('pinkbeach', 'หาดทรายสีชมพู', 'The Pink Beach', ['pink beach', 'หาดทรายสีชมพู', 'pantai merah', 'ปันไตเมระห์', 'red coral bits', 'เศษปะการังสีแดง', 'pink sand', 'ทรายชมพู', 'snorkelling', 'ดำน้ำตื้น', 'komodo island', 'เกาะโคโมโด'], 'หาเศษปะการังสีแดงเล็กๆ บนทรายสีชมพู', 'Find the tiny red coral pieces on the pink sand',
    // a curved beach of soft pink sand under a dry brown hill, clear turquoise water lapping it, a little red coral twig on the sand with a smile and a bucket of pink sand beside it
    bg('#B3E5FC') + P('M16 110c30-40 70-60 110-40s70 30 98 20v40H16z', '#BCAAA4', 0) + Lc('M60 84l6 10M150 92l4 8', '#8D6E63', 3) + low(120, '#26C6DA') + P('M16 150c40-12 120-20 208-8v52a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#F8BBD0', 0) + frame
      + Lc('M30 146c40-10 120-18 190-6', '#FFFFFF', 4) + [[50, 196], [70, 208], [168, 204], [186, 190], [146, 214], [60, 180]].map(([x, y]) => C(x, y, 3, '#E53935', 0)).join('')
      + g(104, 198, 1, P('M0 0v-34M0-20l-12-12M0-26l12-10M-12-32l-4-8M12-36l6-6', 'none').replace('fill="none"', 'fill="none" stroke="#E53935" stroke-width="9"') + E(0, 2, 16, 5, '#F48FB1', 3))
      + P('M156 172h32l-4 30h-24z', '#FFCA28') + E(172, 172, 16, 4, '#F48FB1', 3) + Lc('M158 172c0-16 28-16 28 0', INK, 3) + face(104, 176, 0.24)),
  L('kanawa', 'เกาะกานาวากับท่าเรือไม้ยาว', 'Kanawa island and its long wooden pier', ['kanawa', 'กานาวา', 'wooden pier', 'ท่าเรือไม้', 'island bungalows', 'บังกะโลบนเกาะ', 'clear water', 'น้ำใส', 'snorkelling', 'ดำน้ำตื้น', 'little island', 'เกาะเล็ก'], 'หาท่าเรือไม้ที่ยื่นยาวลงไปในทะเล', 'Find the long wooden pier reaching out into the sea',
    // a round green island with a white beach and a few thatched bungalows, a long wooden pier zigzagging out over clear turquoise water with little fish and coral seen below
    bg('#4DD0E1') + Lc('M30 60c20-6 40 6 60 0M150 50c20-6 40 6 60 0', '#B2EBF2', 3) + E(120, 90, 92, 46, '#FFF3D6', 0) + P('M48 96c10-50 50-66 80-60s56 30 60 60z', '#7CB342')
      + [[84, 92], [120, 84], [156, 92]].map(([x, y]) => R(x - 10, y - 4, 20, 14, '#D7A86E', 0, 3) + P(`M${x - 15} ${y - 4}l15-14 15 14z`, '#A1887F', 3)).join('')
      + R(110, 112, 20, 70, '#C69563', 0, 3.5) + R(80, 174, 70, 18, '#C69563', 0, 3.5) + Array.from({ length: 6 }, (_, k) => Lc(`M110 ${120 + k * 10}h20`, '#8D6E63', 2)).join('') + Lc('M84 192v12M146 192v12M112 182v12', '#6D4C41', 4)
      + [[52, 170, '#FFCA28'], [184, 150, '#FF7043'], [176, 196, '#FFCA28']].map(([x, y, c]) => P(`M${x - 10} ${y}c4-6 12-6 16 0-4 6-12 6-16 0zM${x + 6} ${y}l6-5v10z`, c, 2.5)).join('')
      + P('M40 206c0-10 4-16 8-16s4 6 2 16zM196 214c0-8 6-14 10-12', '#F06292', 2.5) + frame + face(120, 64, 0.34)),
  L('kelor', 'ปีนเนินสูงชันบนเกาะเกอลอร์', 'Climbing the steep hill of Kelor island', ['kelor', 'เกอลอร์', 'steep hill', 'เนินชัน', 'hike', 'เดินป่าขึ้นเขา', 'island view', 'วิวเกาะ', 'white beach', 'หาดขาว', 'island hopping stop', 'จุดแวะเกาะ'], 'หาเด็กที่ปีนขึ้นไปเกือบถึงยอดเนิน', 'Find the child who has nearly climbed to the top',
    // a tiny island shaped like a tall pointy green-brown cone with a zigzag path, a white beach and turquoise water round its foot, two children climbing and one waving at the top
    bg('#B3E5FC') + low(170, '#26C6DA') + E(120, 172, 96, 14, '#FFF8E1', 0) + P('M30 172c30-20 60-90 84-128 6-8 10-8 16 0 24 40 54 108 84 128z', '#9CCC65')
      + Lc('M116 168l20-20-28-20 22-20-18-22 10-30', '#D7CCC8', 6)
      + [[132, 150, '#E53935'], [116, 108, '#1E88E5']].map(([x, y, c]) => C(x, y - 12, 5, '#F2C29B', 2) + R(x - 5, y - 7, 10, 11, c, 3, 2)).join('')
      + g(120, 34, 1, C(0, -2, 6, '#F2C29B', 2) + R(-6, 4, 12, 12, '#FFCA28', 3, 2) + Lc('M6 6l8-8M-6 6l-8-8', '#F2C29B', 3)) + frame + face(84, 150, 0.36)),
  L('waerebo', 'บ้านทรงกรวยหมู่บ้านวาเอเรโบ', 'The cone houses of Wae Rebo village', ['wae rebo', 'วาเอเรโบ', 'mbaru niang', 'มบารูเนียง', 'cone-shaped houses', 'บ้านทรงกรวย', 'thatched roof', 'หลังคามุงหญ้า', 'mountain village', 'หมู่บ้านบนเขา', 'manggarai', 'มังการาย'], 'หาบ้านทรงกรวยหลังที่สูงที่สุด', 'Find the tallest cone-shaped house',
    // four tall cone-shaped thatched houses standing round a green lawn in a misty mountain bowl, each with a little doorway at the bottom and lines of thatch going round
    bg('#C8E6C9') + P('M16 100c30-40 60-50 90-30s60-30 118 0v80H16z', '#81C784', 0) + Lc('M30 90c40-6 80 6 120 0s50 6 70 0', '#FFFFFF', 8) + low(170, '#9CCC65') + frame
      + [[44, 172, 0.7], [196, 172, 0.7], [80, 182, 0.9], [160, 182, 0.9], [120, 192, 1.1]].map(([x, y, s]) => g(x, y, s, P('M-38 0c4-40 22-74 38-96 16 22 34 56 38 96z', '#BCAAA4') + Lc('M-26-30h52M-18-54h36M-10-74h20M-34-12h68', '#8D7B6A', 2.5) + P('M-8 0v-18h16v18z', '#5D4037', 3) + P('M-4-96l4-8 4 8', '#6D4C41', 3))).join('')
      + face(120, 158, 0.36)),
  L('lingko', 'นาข้าวลายใยแมงมุมลิงโกจันจาร์', 'The spider-web rice fields of Cancar', ['lingko', 'ลิงโก', 'spider web rice fields', 'นาข้าวใยแมงมุม', 'cancar', 'จันจาร์', 'ruteng', 'รูเต็ง', 'round fields', 'นาทรงกลม', 'hill view', 'วิวจากเนิน'], 'หาจุดกลางที่ทุกเส้นวิ่งมาบรรจบกัน', 'Find the middle point where all the lines meet',
    // a huge round rice field seen from a hill, cut into thin wedge slices like a spider's web, each slice a different green or gold, a little hut at the centre, hills around
    bg('#B3E5FC') + P('M16 70c40-20 70-20 100-6s70-20 108 0v60H16z', '#558B2F', 0) + low(80, '#7CB342') + frame
      + E(120, 150, 96, 60, '#AED581') + Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2, b = ((k + 1) / 16) * Math.PI * 2; return k % 3 === 0 ? '' : P(`M120 150L${(120 + 96 * Math.cos(a)).toFixed(1)} ${(150 + 60 * Math.sin(a)).toFixed(1)}A96 60 0 0 1 ${(120 + 96 * Math.cos(b)).toFixed(1)} ${(150 + 60 * Math.sin(b)).toFixed(1)}z`, ['#C5E1A5', '#FFE082', '#9CCC65'][k % 3], 2); }).join('')
      + Lc('M40 150c30 6 130 6 160 0M60 116c30 6 90 6 120 0M60 184c30 6 90 6 120 0', '#689F38', 2) + E(120, 150, 14, 9, '#8D6E63', 3) + face(120, 110, 0.36)),
  L('kelimutu', 'ทะเลสาบสามสีบนภูเขาไฟเกอลีมูตู', 'The three-coloured crater lakes of Kelimutu', ['kelimutu', 'เกอลีมูตู', 'three coloured lakes', 'ทะเลสาบสามสี', 'crater lakes', 'ทะเลสาบปากปล่อง', 'volcano top', 'ยอดภูเขาไฟ', 'sunrise', 'พระอาทิตย์ขึ้น', 'moni', 'โมนี'], 'หาทะเลสาบสีฟ้าเทอร์ควอยซ์', 'Find the turquoise lake',
    // a bare brown volcanic summit holding three round crater lakes side by side: milky turquoise, deep green and nearly black, a little viewpoint with a rail on the rim
    bg('#FFE0B2') + C(184, 54, 16, '#FFF59D', 0) + low(80, '#A1887F') + P('M16 90c40-14 80-14 120-4s60-6 88 4v20H16z', '#8D6E63', 0) + frame
      + [[66, 132, 40, 26, '#4DD0E1'], [164, 124, 40, 26, '#2E7D32'], [118, 186, 46, 24, '#37474F']].map(([x, y, rx, ry, c]) => E(x, y, rx + 8, ry + 8, '#6D4C41') + E(x, y, rx, ry, c, 3) + Lc(`M${x - rx * 0.5} ${y - ry * 0.3}q${rx * 0.2}-4 ${rx * 0.4} 0`, '#FFFFFF', 3)).join('')
      + R(184, 168, 34, 6, '#D7A86E', 2, 3) + Lc('M188 174v16M214 174v16', '#8D6E63', 3) + face(66, 134, 0.34)),
  L('sei', 'เซอิ เนื้อรมควันบนแผงไม้', 'Se\'i, smoky beef from the wooden rack', ['se\'i', 'เซอิ', 'smoked beef', 'เนื้อรมควัน', 'kupang', 'กูปัง', 'smoking rack', 'แผงรมควัน', 'sambal', 'น้ำพริก', 'rice plate', 'ข้าวจาน'], 'หาเส้นเนื้อที่แขวนอยู่เหนือควัน', 'Find the strips of meat hanging over the smoke',
    // a wooden rack over glowing embers with long red-brown strips of smoked beef draped on it, grey smoke curling up; in front a plate with rice, sliced beef and a dab of red sambal
    Lc('M60 46v80M180 46v80', '#8D6E63', 6) + Lc('M50 52h140M50 78h140', '#A1887F', 6) + [[78, 52], [104, 52], [130, 52], [156, 52], [92, 78], [144, 78]].map(([x, y]) => P(`M${x - 6} ${y}h12v40c0 6-12 6-12 0z`, '#B5502A', 3)).join('')
      + Lc('M100 46c-6-10 6-14 0-24M140 46c-6-10 6-14 0-24', '#CFD8DC', 4) + R(54, 124, 132, 16, '#5D4037', 4) + [74, 98, 122, 146, 166].map((x) => C(x, 124, 7, '#FF7043', 2)).join('')
      + E(120, 186, 84, 24, '#FFFFFF') + E(82, 180, 26, 14, '#FFFFFF', 3) + [[110, 184], [134, 180], [158, 186]].map(([x, y]) => R(x - 12, y - 7, 24, 12, '#B5502A', 4, 3)).join('') + C(180, 196, 8, '#E53935', 2.5) + face(82, 178, 0.28)),
  L('sasando', 'ซาซันโด พิณในใบตาล', 'A sasando, the harp in a palm leaf', ['sasando', 'ซาซันโด', 'palm leaf harp', 'พิณใบตาล', 'lontar leaf', 'ใบตาลโตนด', 'bamboo tube', 'กระบอกไม้ไผ่', 'string instrument', 'เครื่องสาย', 'east nusa tenggara', 'นูซาเตงการาตะวันออก'], 'หาสายที่ขึงรอบกระบอกไม้ไผ่', 'Find the strings stretched round the bamboo tube',
    // a tall bamboo tube strung all round with thin strings over little wooden bridges, cradled in a big folded lontar palm leaf that opens like a shell behind it
    P('M120 214c-60 0-92-40-92-94s30-86 92-96c62 10 92 42 92 96s-32 94-92 94z', '#C5A55A') + Array.from({ length: 9 }, (_, k) => Lc(`M120 210L${36 + k * 21} ${k === 0 || k === 8 ? 128 : 40 + Math.abs(4 - k) * 12}`, '#A1873E', 2.5)).join('')
      + R(102, 34, 36, 170, '#E6C878', 8) + Lc('M102 64h36M102 176h36', '#C9A657', 4) + Array.from({ length: 8 }, (_, k) => Lc(`M${105 + k * 4.3} 66v108`, '#FFFFFF', 1.5)).join('') + R(98, 28, 44, 10, '#8D6E63', 3, 3) + R(98, 200, 44, 10, '#8D6E63', 3, 3)
      + face(120, 120, 0.34)),
  L('frogfish', 'ปลากบตัวป้อมบนปะการัง', 'A frogfish sitting on the reef', ['frogfish', 'ปลากบ', 'reef fish', 'ปลาแนวปะการัง', 'dive site', 'จุดดำน้ำ', 'big mouth', 'ปากกว้าง', 'walking fins', 'ครีบเดิน', 'komodo diving', 'ดำน้ำโคโมโด'], 'หาครีบที่ปลาใช้เดินเหมือนขา', 'Find the fins the fish uses like little legs',
    // a round lumpy orange fish with a wide grumpy-cute mouth sitting on a sponge, two arm-like fins planted like legs, bumpy spots, bubbles rising, purple coral beside it
    bg('#4FC3F7') + Lc('M30 70c20-6 40 6 60 0M150 50c20-6 40 6 60 0', '#B3E5FC', 3) + low(180, '#FFE0B2') + P('M160 186c-4-30 4-50 10-60M176 186c4-30 20-40 30-46M170 150c-10-10-14-16-14-24', 'none').replace('fill="none"', 'fill="none" stroke="#BA68C8" stroke-width="10"') + frame
      + E(100, 186, 60, 12, '#F06292') + P('M160 120l30-22v52z', '#FB8C00') + P('M48 140c0-46 30-70 62-70s56 28 56 64-26 52-58 52-60-8-60-46z', '#FF9800') + [[70, 104], [128, 98], [146, 136], [72, 150], [100, 86]].map(([x, y]) => C(x, y, 6, '#FFCC80', 2)).join('')
      + P('M60 160l-20 22 24 2zM146 160l20 20-24 4z', '#FB8C00') + P('M80 140c14 10 44 10 58 0', 'none').replace('fill="none"', 'fill="none" stroke="#22213A" stroke-width="4"') + Lc('M108 70c4-10 10-14 16-12', INK, 3) + C(126, 58, 4, '#FFE082', 2)
      + [[170, 60], [180, 40], [176, 80]].map(([x, y]) => C(x, y, 5, '#E1F5FE', 2)).join('') + face(108, 116, 0.5, 'none')),
  L('jagungbose', 'จากุงโบเซ ซุปข้าวโพดฟลอเรส', 'Jagung bose, the corn stew of East Nusa Tenggara', ['jagung bose', 'จากุงโบเซ', 'corn stew', 'สตูข้าวโพด', 'red beans', 'ถั่วแดง', 'coconut milk', 'กะทิ', 'pumpkin', 'ฟักทอง', 'local food', 'อาหารพื้นเมือง'], 'หาฝักข้าวโพดที่วางข้างชาม', 'Find the corn cob lying beside the bowl',
    // a clay bowl of creamy stew full of round yellow corn kernels, red beans and orange pumpkin cubes, a whole yellow corn cob with green husks lying beside it
    E(120, 196, 88, 12, '#D7CCC8', 0) + P('M40 120h150c0 44-32 74-75 74s-75-30-75-74z', '#C1694F') + Lc('M54 150c30 10 92 10 122 0', '#A0522D', 3) + E(115, 120, 76, 18, '#FFF3D6')
      + [[70, 118], [84, 112], [96, 122], [110, 114], [124, 124], [136, 112], [150, 120], [162, 114], [90, 128], [140, 128]].map(([x, y]) => C(x, y, 4.5, '#FFD54F', 2)).join('') + [[78, 124], [118, 106], [156, 126]].map(([x, y]) => E(x, y, 6, 4, '#C62828', 2)).join('') + [[104, 108], [148, 108]].map(([x, y]) => R(x - 5, y - 5, 10, 10, '#FF8A3D', 2, 2)).join('')
      + g(196, 154, 1, P('M-10 40c-8-28-4-56 10-70 14 14 18 42 10 70z', '#FFD54F', 3.5) + Array.from({ length: 5 }, (_, k) => Lc(`M-8 ${30 - k * 12}h16`, '#F9A825', 2)).join('') + P('M-10 40c-14-14-16-34-10-48 4 18 10 34 20 48zM10 40c14-14 16-34 10-48-4 18-10 34-20 48z', '#7CB342', 3), -20)
      + face(115, 122, 0.3)),
  L('kuahasam', 'อีกันกัวห์อาซัม ต้มปลาเปรี้ยว', 'Ikan kuah asam, sour fish soup', ['ikan kuah asam', 'อีกันกัวห์อาซัม', 'sour fish soup', 'ต้มปลาเปรี้ยว', 'clear broth', 'น้ำซุปใส', 'tomato', 'มะเขือเทศ', 'basil', 'โหระพา', 'fresh fish', 'ปลาสด'], 'หาหางปลาที่โผล่ขึ้นมาจากชาม', 'Find the fish tail sticking out of the bowl',
    // a white bowl of clear golden broth with a chunk of fish whose tail pokes out, red tomato slices, green chilli rings and a sprig of basil floating
    E(120, 196, 84, 12, '#D7CCC8', 0) + Lc('M100 70c-8-12 8-18 0-30M140 70c-8-12 8-18 0-30', '#B0BEC5', 4) + P('M30 116h180c0 48-40 80-90 80s-90-32-90-80z', '#FFFFFF') + Lc('M44 150c30 12 122 12 152 0', '#26A69A', 4)
      + E(120, 116, 90, 20, '#FFE9A8') + P('M150 112c10-18 24-26 40-26-6 10-6 22 0 30-14 2-28 0-40-4z', '#B0BEC5') + E(124, 116, 26, 9, '#ECEFF1', 3)
      + [[74, 114], [96, 124]].map(([x, y]) => C(x, y, 9, '#EF5350', 3) + C(x, y, 4, '#FFCDD2', 0)).join('') + [[150, 124], [168, 118]].map(([x, y]) => C(x, y, 5, 'none', 3).replace('fill="none"', 'fill="none" stroke="#43A047"')).join('')
      + P('M86 104c6-10 16-12 22-6-6 8-16 10-22 6zM100 100c-2-10 4-16 12-14', '#66BB6A', 2.5) + face(124, 112, 0.24)),
  L('coconutcrab', 'ปูมะพร้าวปีนต้นมะพร้าว', 'A coconut crab climbing a palm', ['coconut crab', 'ปูมะพร้าว', 'robber crab', 'ปูไก่', 'palm trunk', 'ลำต้นมะพร้าว', 'giant crab', 'ปูยักษ์', 'island wildlife', 'สัตว์บนเกาะ'], 'หาลูกมะพร้าวที่ปูกอดอยู่', 'Find the coconut the crab is hugging',
    // a big blue-purple land crab with long spiky legs gripping a leaning palm trunk, one big claw hugging a green coconut, palm fronds at the top
    Lc('M150 226c-10-60-20-130-10-200', '#A1887F', 26) + Array.from({ length: 9 }, (_, k) => Lc(`M${138 - k * 0.6} ${210 - k * 22}h22`, '#8D6E63', 2.5)).join('') + P('M140 30c-30-14-60-6-80 14 26-8 50-6 80 0zM144 30c24-20 56-18 76 0-26-6-50-2-76 8z', '#558B2F', 3)
      + [[-1, 0], [1, 0]].map(([s]) => [0, 1, 2].map((k) => Lc(`M${120 + s * 20} ${110 + k * 18}l${s * 30} ${-14 + k * 10}l${s * 8} 22`, '#7E57C2', 7)).join('')).join('')
      + P('M86 126c0-30 18-44 38-44s38 14 38 44-18 44-38 44-38-14-38-44z', '#5C6BC0') + P('M96 110c10-8 46-8 56 0', 'none').replace('fill="none"', 'fill="none" stroke="#9FA8DA" stroke-width="4"')
      + C(66, 154, 22, '#7CB342') + C(60, 146, 6, '#AED581', 0) + P('M92 150c-18 4-26 18-22 30 14 2 26-6 30-18z', '#7E57C2') + Lc('M110 84l-6-14M138 84l6-14', INK, 3) + C(104, 68, 4, INK, 0) + C(144, 68, 4, INK, 0) + face(124, 124, 0.42)),
  L('cacao', 'ฝักโกโก้บนลำต้นในสวนฟลอเรส', 'Cacao pods growing on the trunk', ['cacao', 'โกโก้', 'cacao pods', 'ฝักโกโก้', 'cocoa farm', 'สวนโกโก้', 'cacao beans', 'เมล็ดโกโก้', 'flores farm', 'สวนบนเกาะฟลอเรส', 'tropical tree', 'ต้นไม้เมืองร้อน'], 'หาฝักที่ผ่าครึ่งเห็นเมล็ดขาวข้างใน', 'Find the pod cut in half with white beans inside',
    // a thick tree trunk with big ribbed pods growing straight out of it in yellow, orange and red, glossy leaves above; one pod in front cut open with rows of white beans
    C(84, 44, 34, '#558B2F') + C(150, 40, 36, '#689F38') + C(120, 30, 26, '#7CB342') + R(100, 50, 40, 170, '#8D6E63', 8) + Lc('M110 70v140M128 60v150', '#6D4C41', 2.5)
      + [[86, 92, '#FFCA28', -20], [154, 112, '#FF7043', 20], [84, 150, '#E53935', -15]].map(([x, y, c, r]) => g(x, y, 1, P('M0-26c14 0 18 16 18 26s-6 26-18 26-18-14-18-26 4-26 18-26z', c, 3.5) + Lc('M-8-22v44M0-26v52M8-22v44', '#A0522D', 2), r)).join('')
      + g(160, 190, 1, P('M-34 0c0-20 14-30 34-30s34 10 34 30z', '#FF7043', 3.5) + P('M-26 0c0-14 10-22 26-22s26 8 26 22z', '#FFF8E1', 3) + [[-16, -6], [-6, -12], [6, -12], [16, -6], [0, -4]].map(([x, y]) => E(x, y, 4.5, 6, '#FFFFFF', 2)).join(''))
      + face(86, 94, 0.28)),
  L('sweetlips', 'ปลาปากหนาลายจุด', 'A spotted harlequin sweetlips', ['sweetlips', 'ปลาปากหนา', 'harlequin sweetlips', 'ปลาหวานลายจุด', 'reef fish', 'ปลาแนวปะการัง', 'polka dots', 'ลายจุด', 'big lips', 'ปากหนา', 'snorkel', 'ดำน้ำตื้น'], 'หาปากหนาๆ ของปลาตัวนี้', 'Find the fish\'s big thick lips',
    // a chunky fish with big puffy pink lips, cream body covered in black polka dots, yellow fins, gliding past a fan of orange sea coral
    bg('#29B6F6') + P('M190 214c-4-40 0-70 10-90M190 160c-20-14-30-30-28-44M196 140c14-10 18-22 16-34', 'none').replace('fill="none"', 'fill="none" stroke="#FF8A65" stroke-width="7"') + Lc('M40 60c20-6 40 6 60 0', '#B3E5FC', 3) + frame
      + P('M150 120l40-30v60z', '#FFCA28') + P('M44 120c6-34 40-52 76-52s46 22 46 52-14 52-46 52-70-18-76-52z', '#FFF8E1') + P('M90 70l20-22 22 26z', '#FFCA28', 4) + P('M100 170l10 18 16-20z', '#FFCA28', 4)
      + [[96, 92], [120, 84], [140, 100], [108, 112], [130, 126], [150, 136], [114, 150], [86, 140], [138, 154], [74, 108]].map(([x, y]) => C(x, y, 5, INK, 0)).join('')
      + P('M44 112c-10-4-16 0-16 8s6 12 16 8z', '#F48FB1', 3.5) + face(66, 112, 0.36, 'none')),
  L('ranger', 'เจ้าหน้าที่อุทยานกับไม้ง่าม', 'A park ranger with the forked stick', ['park ranger', 'เจ้าหน้าที่อุทยาน', 'forked stick', 'ไม้ง่าม', 'guided walk', 'เดินกับไกด์', 'rinca island', 'เกาะรินจา', 'komodo trek', 'เดินป่าโคโมโด', 'safety', 'ความปลอดภัย'], 'หาไม้ที่ปลายแยกเป็นสองง่าม', 'Find the stick that splits into two at the top',
    // a smiling ranger in a khaki shirt and wide brimmed hat holding a tall wooden stick with a Y-shaped fork at the top, dry grass and a lontar palm behind
    bg('#FFF3C4') + lontar(186, 186, 0.9) + low(170, '#E6C878') + Lc('M30 176l6-10M48 178l4-12M200 182l6-12', '#C9A657', 3) + frame
      + Lc('M150 214V56', '#A1774A', 7) + Lc('M150 64l-14-30M150 64l14-30', '#A1774A', 7)
      + P('M80 214c0-40 14-60 40-60s40 20 40 60z', '#A1887F') + Lc('M120 156v58', '#8D6E63', 3) + R(100, 164, 14, 10, '#6D4C41', 2, 2.5) + Lc('M148 176c-10 10-20 10-28 6', '#F2C29B', 9)
      + C(120, 116, 34, '#F2C29B') + P('M72 100c10-6 86-6 96 0-6 6-90 6-96 0z', '#7E8F4A') + P('M92 98c0-24 12-34 28-34s28 10 28 34z', '#8D9E57') + Lc('M92 94h56', '#5D6B30', 4) + face(120, 122, 0.55)),
  L('lontar', 'ต้นตาลบนทุ่งหญ้าเกาะรินจา', 'Lontar palms on the golden savanna', ['lontar palm', 'ต้นตาลโตนด', 'savanna hills', 'ทุ่งหญ้าบนเนิน', 'golden grass', 'หญ้าสีทอง', 'rinca island', 'เกาะรินจา', 'dry season', 'หน้าแล้ง', 'komodo landscape', 'ภูมิทัศน์โคโมโด'], 'หาต้นตาลที่สูงที่สุดบนเนิน', 'Find the tallest palm on the hill',
    // rolling golden grassy hills under a big blue sky, tall slim palms with round fan-leaf crowns dotted over them, the blue sea peeking between hills
    bg('#90CAF9') + E(70, 56, 24, 9, '#FFFFFF', 0) + E(170, 44, 20, 8, '#FFFFFF', 0) + low(120, '#26C6DA') + P('M16 140c30-40 70-50 110-30s70-10 98 4v80H16z', '#E6C060', 0) + P('M16 180c40-30 100-30 140-10s50 0 68-4v40a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z', '#D4A63A', 0) + frame
      + lontar(80, 124, 0.95) + lontar(150, 128, 0.7) + lontar(190, 136, 0.6) + lontar(46, 200, 0.75) + lontar(120, 206, 0.9) + face(120, 194, 0.34)),
];

export default {
  places: {
    'id-komodo': { country: 'id', wave: 3, name: nm('ลาบวนบาโจและโคโมโด', 'Labuan Bajo and Komodo'), tz: 'Asia/Makassar', ll: [-8.5, 119.88], alias: ['labuan bajo', 'ลาบวนบาโจ', 'LBJ', 'padar', 'ปาดาร์', 'komodo national park', 'อุทยานแห่งชาติโคโมโด', 'komodo island', 'เกาะโคโมโด', 'rinca', 'เกาะรินจา', 'wae rebo', 'วาเอเรโบ', 'kelimutu', 'เกอลีมูตู'], colors: KM },
  },
  items,
};
