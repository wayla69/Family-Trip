// Wave 12, group kz (3 of 3): Astana, the new capital on the steppe, and Burabay — the buildings only, no rulers, no
// politicians, no presidential palace, no flags, the mosque as a building with no writing (docs/STOCK-ART.md §8)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const L = (key, th, en, kw, sth, sen, svg) => ({ id: `kz-astana.landmark.${key}`, cat: 'landmark', file: `kz/astana/landmark-${key}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (key, th, en, kw, sky, svg) => ({ id: `kz-astana.day.${key}`, cat: 'day', file: `kz/astana/day-${key}.v1.svg`, name: nm(th, en), kw, svg: scene(`kzas-${key}`, sky, svg) });
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
// Baiterek: a white trunk splaying into a crown of lattice branches that cradle a golden ball (x, foot y, scale)
const baiterek = (x, y, s, ball = '#FFC107') => g(x, y, s, P('M-8 0l3-80h10l3 80z', '#FFFFFF') + P('M-5-80c-30-6-44-26-40-44l8 2c0 14 14 30 32 34zM5-80c30-6 44-26 40-44l-8 2c0 14-14 30-32 34z', '#FFFFFF')
  + Lc('M-4-82c-10-18-16-34-14-48M4-82c10-18 16-34 14-48M0-84v-46M-4-82c-18-12-28-26-30-44M4-82c18-12 28-26 30-44M-3-82c-6-16-6-34-4-48M3-82c6-16 6-34 4-48', '#FFFFFF', 4) + Lc('M-4-82c-10-18-16-34-14-48M4-82c10-18 16-34 14-48M0-84v-46M-4-82c-18-12-28-26-30-44M4-82c18-12 28-26 30-44M-3-82c-6-16-6-34-4-48M3-82c6-16 6-34 4-48', INK, 1.5) + C(0, -126, 18, ball) + P('M-8-134c4-6 10-6 14-4', 'none', 3).replace('fill="none"', 'fill="none" stroke="#FFF59D"'));
const AS = { k1: '#1565C0', k2: '#F9A825', k3: '#E3F2FD' };

const items = [
  { id: 'kz-astana.stamp', cat: 'stamp', file: 'kz/astana/stamp.v1.svg', name: nm('ตราประทับอัสตานา', 'Astana stamp'), kw: ['astana', 'อัสตานา', 'baiterek', 'ไบเตเร็ก', 'capital', 'เมืองหลวง'],
    // the Baiterek tower: a white trunk opening into a crown of branches holding a golden ball
    svg: cityStamp('kzas-st', { name: 'ASTANA', sub: 'KAZAKHSTAN', ...AS, emblem: Lc('M56 142h88', '#C5E1A5', 6) + baiterek(100, 142, 0.58) }) },
  D('skyline', 'เส้นขอบฟ้าอัสตานากลางทุ่งหญ้า', 'The Astana skyline on the open steppe', ['astana', 'อัสตานา', 'skyline', 'เส้นขอบฟ้า', 'modern city', 'เมืองทันสมัย', 'left bank', 'ฝั่งซ้าย', 'steppe city', 'เมืองกลางทุ่ง'], '#BBDEFB',
    // a flat golden-green steppe under a huge sky, and rising out of it a row of shiny new buildings: a leaning tent, two gold towers, the tower with the golden ball, a glass pyramid
    E(50, 44, 26, 9, '#FFFFFF', 0) + E(190, 36, 30, 9, '#FFFFFF', 0) + P('M14 170c10-50 30-80 50-96l10 6c-4 30 2 60 10 90z', '#E1F5FE') + Lc('M64 74l-6 96M64 74l14 96', '#B3E5FC', 2)
      + [R(92, 104, 16, 66, '#FFCA28'), R(112, 104, 16, 66, '#FFCA28')].join('') + ring(4, (k) => Lc(`M92 ${114 + k * 14}h36`, '#F9A825', 2)) + baiterek(150, 170, 0.62)
      + P('M176 170l26-40 26 40z', '#B0BEC5') + P('M193 156l9-14 9 14z', '#FFCA28', 2) + R(24, 136, 18, 34, '#90CAF9', 0, 3) + R(212, 140, 20, 30, '#80DEEA', 0, 3)
      + P('M-4 168c60-4 188-4 248 0v82H-4z', '#DCE775') + ring(7, (k) => Lc(`M${14 + k * 34} ${196 + (k % 2) * 16}l4-10 4 10`, '#9E9D24', 3)) + face(150, 76, 0.3)),
  D('ishimwinter', 'ริมแม่น้ำอีชิมในฤดูหนาว', 'The Ishim river embankment in winter', ['ishim river', 'แม่น้ำอีชิม', 'yesil', 'เยซิล', 'winter', 'ฤดูหนาว', 'snow', 'หิมะ', 'embankment walk', 'เดินริมแม่น้ำ', 'fairy lights'], '#CFD8DC',
    // a frozen white river between snowy banks, an arched footbridge across it, bare trees wrapped in twinkling fairy lights, a child in a puffy coat and bobble hat, snow falling
    P('M-4 112c60-6 188-6 248 0v26H-4z', '#FFFFFF') + R(20, 82, 20, 30, '#90CAF9', 0, 3) + R(60, 70, 24, 42, '#B3E5FC', 0, 3) + R(170, 76, 22, 36, '#90CAF9', 0, 3) + R(204, 88, 20, 24, '#B3E5FC', 0, 3)
      + P('M-4 138h248v40H-4z', '#E1F5FE') + Lc('M20 156h40M140 164h50', '#B3E5FC', 3) + P('M30 136c30-50 150-50 180 0', 'none', 6) + Lc('M30 136c30-50 150-50 180 0', '#ECEFF1', 3) + ring(6, (k) => Lc(`M${50 + k * 28} ${118 - Math.sin(((k + 0.5) / 6) * Math.PI) * 26}v${18 + Math.sin(((k + 0.5) / 6) * Math.PI) * 4}`, INK, 2)).replace(/v[0-9.]+/g, (m) => 'v' + (+m.slice(1)).toFixed(1))
      + P('M-4 176c60-6 188-6 248 0v74H-4z', '#FFFFFF') + [[34, 176], [206, 176]].map(([x, y]) => Lc(`M${x} ${y}v-50M${x} ${y - 30}l-14-14M${x} ${y - 38}l14-14`, '#6D4C41', 4) + ring(7, (k) => C(x - 14 + (k * 9) % 30, y - 60 + k * 6, 3, ['#FFEB3B', '#FF8A80', '#80D8FF'][k % 3], 1.2))).join('')
      + g(120, 222, 1.3, C(0, -22, 9, '#FFE0BD', 2) + P('M-11 8c0-10 4-18 11-18s11 8 11 18z', '#E53935', 2) + P('M-9-26c0-10 18-10 18 0z', '#1E88E5', 2) + C(0, -36, 4, '#FFFFFF', 1.5) + face(0, -20, 0.22))
      + ring(14, (k) => C(10 + (k * 47) % 224, 20 + ((k * 31) % 200), 3, '#FFFFFF', 1))),
  L('baiterek', 'หอคอยไบเตเร็กกับไข่ทองคำ', 'The Baiterek tower and its golden egg', ['baiterek', 'ไบเตเร็ก', 'golden ball', 'ลูกบอลทองคำ', 'tree of life', 'ต้นไม้แห่งชีวิต', 'observation deck', 'จุดชมวิว', 'nurzhol boulevard', 'ถนนนูร์โจล'], 'หาไข่ทองคำที่ต้นไม้ยักษ์อุ้มไว้', 'Find the golden egg the giant tree is holding',
    // a tall white tower like a tree trunk opening into a crown of white branches that hold a shining golden glass ball, a round pavilion at its foot
    sky('#E3F2FD') + P('M-4 200h248v50H-4z', '#C5E1A5') + E(120, 204, 54, 12, '#ECEFF1') + baiterek(120, 204, 1.25) + Lc('M112 48l10-6M106 62l6-10', '#FFFFFF', 3) + face(120, 46, 0.48)),
  L('khanshatyr', 'ข่านชาตึร์ กระโจมยักษ์ใสเอียง', 'Khan Shatyr, the giant leaning see-through tent', ['khan shatyr', 'ข่านชาตึร์', 'giant tent', 'กระโจมยักษ์', 'indoor beach', 'ชายหาดในร่ม', 'shopping centre', 'ห้างสรรพสินค้า', 'winter warm-up', 'ที่หลบหนาว'], 'หายอดแหลมของกระโจมที่เอียงไปข้างหนึ่ง', 'Find the pointy tip leaning to one side',
    // a huge see-through tent shaped like a leaning cone, crossed by a net of cables, its point tilted to one side, palm-green glimpses inside, a glass entrance below
    sky('#E1F5FE') + P('M-4 206h248v44H-4z', '#C5E1A5') + P('M24 206c6-60 60-150 130-190 0 80 26 150 60 190z', '#E1F5FE')
      + ring(6, (k) => Lc(`M154 16L${36 + k * 34} 206`, '#B3E5FC', 2.5)) + ring(5, (k) => Lc(`M${48 + k * 14} ${190 - k * 36}c40-6 90-6 ${140 - k * 18} ${4 + k * 2}`, '#B3E5FC', 2))
      + P('M24 206c6-60 60-150 130-190 0 80 26 150 60 190z', 'none') + Lc('M154 16l6-12', INK, 3) + [[90, 186], [130, 182]].map(([x, y]) => C(x, y, 12, '#81C784', 2.5)).join('') + R(104, 190, 32, 16, '#90CAF9', 2, 3) + face(130, 120, 0.5)),
  L('palaceofpeace', 'พระราชวังแห่งสันติภาพทรงพีระมิด', 'The Palace of Peace, the pyramid', ['palace of peace and reconciliation', 'พระราชวังแห่งสันติภาพ', 'pyramid', 'พีระมิด', 'stained glass top', 'กระจกสียอดพีระมิด', 'opera hall', 'doves', 'นกพิราบ'], 'หานกที่บินอยู่ในกระจกสีบนยอด', 'Find the birds flying in the coloured glass at the top',
    // a big pale stone pyramid on a green mound, its top made of blue and gold glass with little white birds flying in it
    sky('#E3F2FD') + P('M-4 206c40-14 210-14 248 0v44H-4z', '#AED581') + P('M24 206L120 40l96 166z', '#ECEFF1') + ring(5, (k) => Lc(`M${48 + k * 6} ${180 - k * 26}h${144 - k * 12}`, '#CFD8DC', 3))
      + P('M84 102L120 40l36 62z', '#4FC3F7') + P('M102 72L120 40l18 32z', '#FFCA28', 2.5) + [[108, 88], [132, 90], [120, 66]].map(([x, y]) => P(`M${x - 6} ${y}q3-5 6 0q3-5 6 0`, 'none', 2.5).replace('fill="none"', 'fill="none" stroke="#FFFFFF"')).join('')
      + R(108, 184, 24, 22, '#90CAF9', 2, 3) + face(120, 150, 0.45)),
  L('hazretsultan', 'มัสยิดฮาซเรตสุลต่านสีขาว', 'The white Hazret Sultan mosque', ['hazret sultan', 'ฮาซเรตสุลต่าน', 'white mosque', 'มัสยิดสีขาว', 'turquoise domes', 'โดมสีฟ้าคราม', 'four minarets', 'หอคอยสี่ต้น', 'big building', 'อาคารใหญ่'], 'นับหอคอยสูงสี่ต้นรอบโดม', 'Count the four tall towers round the dome',
    // a wide white building with a big white dome edged in turquoise in the middle, smaller domes beside it and four very tall slim white towers at the corners
    sky('#E0F7FA') + P('M-4 206h248v44H-4z', '#C5E1A5') + R(40, 126, 160, 80, '#FFFFFF') + ring(7, (k) => P(`M${54 + k * 20} 196v-24c0-8 10-8 10 0v24z`, '#80DEEA', 2.5))
      + P('M76 128c0-56 88-56 88 0z', '#FFFFFF') + Lc('M80 112c10-30 70-30 80 0', '#26C6DA', 5) + C(120, 70, 4, '#FFCA28', 2) + [[58, 128], [182, 128]].map(([x, y]) => P(`M${x - 16} ${y}c0-26 32-26 32 0z`, '#B2EBF2')).join('')
      + [18, 46, 194, 222].map((x) => R(x - 5, 52, 10, 154, '#FFFFFF', 2) + P(`M${x - 6} 54l6-22 6 22z`, '#4DD0E1', 2.5) + Lc(`M${x - 5} 90h10M${x - 5} 130h10`, '#80DEEA', 3)).join('') + face(120, 152, 0.42)),
  L('nurlyzhol', 'สถานีรถไฟนูร์ลึโจลหลังคาคลื่น', 'Nurly Zhol station and its wavy roof', ['nurly zhol station', 'สถานีนูร์ลึโจล', 'railway station', 'สถานีรถไฟ', 'fast train', 'รถไฟเร็ว', 'glass roof', 'หลังคากระจก', 'arrival', 'วันเดินทางมาถึง'], 'หาหลังคาคลื่นกระจกบนตึกสถานี', 'Find the wavy glass roof on the station',
    // a long modern station with a big wavy glass roof rolling along its top, tall glass windows, a sleek smiling train sliding in at the front
    sky('#E3F2FD') + R(16, 92, 208, 90, '#B3E5FC') + ring(10, (k) => Lc(`M${28 + k * 20} 100v78`, '#FFFFFF', 3)) + P('M10 96c30-40 60-40 80-10s50 30 70 0 50-30 70 0v10H10z', '#4FC3F7') + Lc('M20 92c26-30 50-30 70-4M160 88c20-26 40-26 60 0', '#E1F5FE', 3)
      + Lc('M-4 214h248M-4 226h248', '#90A4AE', 4) + P('M10 186h150c30 0 50 10 56 26H10z', '#ECEFF1') + R(10, 194, 160, 8, '#1E88E5', 0, 0) + P('M180 190c14 2 24 8 28 16h-28z', '#263238', 2.5) + ring(5, (k) => R(20 + k * 30, 190, 20, 10, '#90CAF9', 3, 2)) + face(200, 204, 0.25)),
  L('nuralem', 'นูร์อาเลม ลูกโลกแก้วยักษ์จากงานเอ็กซ์โป', 'Nur Alem, the giant glass ball from the Expo', ['nur alem', 'นูร์อาเลม', 'expo sphere', 'ลูกบอลแก้วเอ็กซ์โป', 'glass ball building', 'ตึกทรงกลม', 'future energy museum', 'พิพิธภัณฑ์พลังงานแห่งอนาคต', 'expo 2017'], 'หาลูกบอลแก้วยักษ์ที่ตั้งอยู่บนฐาน', 'Find the giant glass ball sitting on its base',
    // an enormous round glass building like a shining marble, covered in a grid of glass panes with blue reflections, resting on a low platform, little wind-catcher sails on top
    sky('#E1F5FE') + P('M-4 210h248v40H-4z', '#C5E1A5') + R(50, 196, 140, 16, '#B0BEC5', 3) + C(120, 116, 84, '#81D4FA')
      + ring(5, (k) => E(120, 116, 84 - k * 18, 84, 'none', 2.5).replace('fill="none"', 'fill="none" stroke="#E1F5FE"')) + ring(5, (k) => Lc(`M${120 - Math.sqrt(84 * 84 - (k * 30 - 60) ** 2).toFixed(0)} ${116 + k * 30 - 60}h${(2 * Math.sqrt(84 * 84 - (k * 30 - 60) ** 2)).toFixed(0)}`, '#E1F5FE', 2.5))
      + P('M70 70c10-20 30-30 50-32', 'none', 6).replace('fill="none"', 'fill="none" stroke="#FFFFFF"') + C(120, 116, 84, 'none') + [[110, 32], [130, 32]].map(([x, y]) => Lc(`M${x} ${y}v-14`, INK, 2.5) + P(`M${x} ${y - 14}l10 6-10 4z`, '#FFFFFF', 2)).join('') + face(120, 126, 0.7)),
  L('kazakheli', 'อนุสาวรีย์กาซักเอลีกับนกทองคำ', 'The Kazakh Eli column and its golden bird', ['kazakh eli monument', 'อนุสาวรีย์กาซักเอลี', 'samruk bird', 'นกซัมรุก', 'white column', 'เสาสีขาว', 'independence square', 'จัตุรัสเอกราช', 'golden bird'], 'หานกสีทองที่กางปีกบนยอดเสา', 'Find the golden bird spreading its wings on top',
    // a very tall white column rising from a white arched gateway on a wide square, a golden bird of legend with spread wings perched on its very top
    sky('#E3F2FD') + R(-4, 208, 248, 42, '#E0E0E0', 0, 0) + Lc('M-4 222h248', '#BDBDBD', 3) + P('M70 208v-46h100v46h-28v-22c0-16-44-16-44 0v22z', '#FFFFFF') + Lc('M70 172h100', '#FFCA28', 3)
      + R(110, 40, 20, 122, '#FFFFFF', 4) + Lc('M114 60v96M126 60v96', '#ECEFF1', 3) + R(104, 36, 32, 8, '#FFCA28', 2, 2.5)
      + P('M120 32c-10-6-30-8-44-2 10-10 30-12 44-4 14-8 34-6 44 4-14-6-34-4-44 2z', '#FFCA28') + E(120, 26, 7, 10, '#FFCA28') + C(120, 14, 5, '#FFCA28', 2.5) + Lc('M116 36l-4 6M124 36l4 6', '#FFCA28', 3) + face(120, 110, 0.3)),
  L('shabyt', 'วังศิลปะชาบึตทรงกระบอกสีฟ้า', 'The Shabyt Palace of Arts, the blue drum', ['shabyt palace of arts', 'วังศิลปะชาบึต', 'blue glass drum', 'ทรงกระบอกกระจกสีฟ้า', 'art school', 'โรงเรียนศิลปะ', 'creative arts', 'ศิลปะสร้างสรรค์', 'riverside'], 'หาหลังคาที่ตัดเฉียงเหมือนหมวกเอียง', 'Find the roof cut on a slant like a tipped hat',
    // a huge round drum of bright blue glass with a slanting top edge ringed in silver, criss-cross lines over the glass, a little round entrance hall, the river in front
    sky('#E1F5FE') + P('M-4 196c60-6 188-6 248 0v54H-4z', '#4FC3F7') + Lc('M30 222c20-4 40 4 60 0M150 232c20-4 40 4 60 0', '#E1F5FE', 3)
      + P('M42 188V84c30-30 126-48 156-20v124z', '#1E88E5') + P('M42 84c30-30 126-48 156-20-20 18-126 36-156 20z', '#B0BEC5') + ring(6, (k) => Lc(`M${60 + k * 24} ${86 - k * 4}v100`, '#64B5F6', 3)) + ring(3, (k) => Lc(`M42 ${118 + k * 24}c40 10 116 10 156 0`, '#64B5F6', 3))
      + P('M42 188V84c30-30 126-48 156-20v124z', 'none') + E(120, 188, 40, 10, '#ECEFF1') + face(120, 140, 0.6).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('concerthall', 'หอแสดงดนตรีคาซัคสถาน ดอกไม้กลีบกระจก', 'The Kazakhstan Concert Hall, a flower of glass petals', ['central concert hall', 'หอแสดงดนตรีกลาง', 'glass petals', 'กลีบกระจก', 'flower building', 'ตึกรูปดอกไม้', 'concert', 'คอนเสิร์ต', 'music night', 'คืนดนตรี'], 'นับกลีบกระจกที่ห่อตัวตึก', 'Count the glass petals wrapped round the building',
    // a round building wrapped in tall curved petals of blue-green glass, each petal a different height like a flower about to open
    sky('#E3F2FD') + P('M-4 206h248v44H-4z', '#C5E1A5') + E(120, 206, 100, 12, '#ECEFF1')
      + [[-70, 0.7, '#4DB6AC'], [70, 0.7, '#4DB6AC'], [-44, 0.85, '#26A69A'], [44, 0.85, '#26A69A'], [-16, 1, '#80CBC4'], [16, 0.95, '#4DB6AC']].map(([dx, h, c]) => P(`M${120 + dx - 26} 206c-6-${110 * h} 10-${150 * h} ${26 + (dx > 0 ? 10 : -10)}-${170 * h} 10 ${40 * h} 24 ${90 * h} 26 ${170 * h}z`, c)).join('')
      + ring(5, (k) => Lc(`M${78 + k * 20} 200v-60`, '#B2DFDB', 2)) + face(120, 164, 0.5)),
  L('nationalmuseum', 'พิพิธภัณฑ์แห่งชาติตึกกล่องฟ้าซ้อนกัน', 'The National Museum and its stacked blue blocks', ['national museum', 'พิพิธภัณฑ์แห่งชาติ', 'blue glass blocks', 'กล่องกระจกสีฟ้า', 'history and gold', 'ประวัติศาสตร์และทองคำ', 'independence square', 'จัตุรัสเอกราช', 'rainy day'], 'นับกล่องสีฟ้าที่ไล่ระดับขึ้นไป', 'Count the blue blocks stepping up',
    // a row of blue glass blocks stepping up from low to tall like stairs, the tallest topped with a turquoise dome, a broad white base and a wide square
    sky('#E1F5FE') + R(-4, 200, 248, 50, '#E0E0E0', 0, 0) + R(10, 186, 220, 16, '#FFFFFF')
      + [[18, 150, 36], [56, 128, 36], [94, 106, 36], [132, 84, 36], [170, 62, 52]].map(([x, y, w], k) => R(x, y, w, 186 - y, ['#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2'][k]) + ring(Math.floor((186 - y) / 22), (j) => Lc(`M${x + 4} ${y + 12 + j * 22}h${w - 8}`, '#BBDEFB', 2.5))).join('')
      + P('M172 62c0-30 48-30 48 0z', '#4DD0E1') + C(196, 30, 4, '#FFCA28', 2) + face(196, 120, 0.4).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('atyraubridge', 'สะพานคนเดินอาตึเราข้ามแม่น้ำอีชิม', 'The Atyrau footbridge over the Ishim', ['atyrau bridge', 'สะพานอาตึเรา', 'footbridge', 'สะพานคนเดิน', 'ishim river', 'แม่น้ำอีชิม', 'bridge lights', 'ไฟบนสะพาน', 'evening walk', 'เดินเล่นยามเย็น'], 'หาเสาสะพานที่เอียงเหมือนใบเรือสองต้น', 'Find the two leaning masts like sails',
    // a slim white footbridge over a blue river at dusk, two tall leaning white masts with fans of cables, little coloured lights along the deck
    sky('#D1C4E9') + P('M-4 150h248v100H-4z', '#5C6BC0') + Lc('M20 190c20-4 40 4 60 0M150 210c20-4 40 4 60 0', '#9FA8DA', 3)
      + [[84, -1], [156, 1]].map(([x, s]) => P(`M${x - 4} 142l${s * 16}-110h8l${-s * 10} 110z`, '#FFFFFF') + ring(5, (k) => Lc(`M${x + s * 14} ${36 + k * 4}L${x + s * (k * 18 - 36)} 140`, '#ECEFF1', 2))).join('')
      + P('M-4 140c60-8 188-8 248 0v10H-4z', '#FFFFFF') + ring(12, (k) => C(6 + k * 20, 140 - Math.sin((k / 11) * Math.PI) * 6, 3, ['#FFEB3B', '#FF80AB', '#80D8FF'][k % 3], 1.2)) + kid(120, 136, '#FFCA28', 0.8) + face(84, 104, 0.25)),
  L('transporttower', 'ทาวเวอร์คมนาคมทรงไฟแช็ก', 'The Transport Tower, shaped like a lighter', ['transport tower', 'ทาวเวอร์คมนาคม', 'lighter building', 'ตึกไฟแช็ก', 'blue glass tower', 'ตึกกระจกฟ้า', 'tallest office', 'ตึกสำนักงานสูง', 'left bank'], 'หายอดตึกสีทองที่ตัดเฉียง', 'Find the slanted gold top of the tower',
    // a tall rounded blue glass tower with a slanted golden cap on top like a lighter's lid, rows of window lines, smaller buildings and trees round it
    sky('#E3F2FD') + R(20, 150, 40, 56, '#B3E5FC', 0, 3) + R(180, 140, 44, 66, '#90CAF9', 0, 3) + R(-4, 204, 248, 46, '#C5E1A5', 0, 0)
      + P('M84 206V60c0-10 8-16 16-16h40c8 0 16 6 16 16v146z', '#1E88E5') + ring(9, (k) => Lc(`M88 ${76 + k * 14}h64`, '#64B5F6', 2.5)) + P('M84 70V40c20-16 52-24 72-20v40z', '#FFCA28') + Lc('M100 36l40-10', '#FFF59D', 3)
      + [[34, 210], [206, 210]].map(([x, y]) => C(x, y, 14, '#43A047')).join('') + face(120, 156, 0.42).replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"')),
  L('triumph', 'ตึกไทรอัมฟ์อัสตานาทรงขั้นบันได', 'The Triumph of Astana stepped tower', ['triumph of astana', 'ไทรอัมฟ์อัสตานา', 'stepped tower', 'ตึกขั้นบันได', 'wedding cake building', 'ตึกทรงเค้กแต่งงาน', 'spire', 'ยอดแหลม', 'apartments'], 'หายอดแหลมบนชั้นบนสุด', 'Find the needle spire on the very top',
    // a tall pale-cream tower built in steps like a wedding cake, each step with little corner towers, a tall pointed spire on top, rows of windows
    sky('#E3F2FD') + R(-4, 206, 248, 44, '#C5E1A5', 0, 0) + [[40, 160, 160, 46], [62, 114, 116, 48], [82, 74, 76, 42], [98, 46, 44, 30]].map(([x, y, w, h]) => R(x, y, w, h, '#FFF3E0') + ring(Math.floor(w / 16), (k) => R(x + 6 + k * 16, y + 10, 8, 14, '#90CAF9', 1, 2)) + [x, x + w].map((cx) => R(cx - 6, y - 10, 12, 14, '#FFE0B2', 2, 2.5)).join('')).join('')
      + P('M110 46l10-40 10 40z', '#FFCA28') + Lc('M120 6v-6', INK, 3) + face(120, 186, 0.42)),
  L('mangilikel', 'ประตูชัยมังกีลิกเอล', 'The Mangilik El triumphal arch', ['mangilik el arch', 'ประตูชัยมังกีลิกเอล', 'triumphal arch', 'ประตูชัย', 'white arch', 'ซุ้มประตูขาว', 'turquoise dome', 'โดมสีฟ้าคราม', 'city gate'], 'หาโดมสีฟ้าเล็กบนยอดซุ้มประตู', 'Find the little turquoise dome on top of the arch',
    // a tall white arch with a deep round-topped opening, slim columns on its sides, a gold band and a small turquoise dome with a gold tip on top, a road running through
    sky('#E1F5FE') + R(-4, 206, 248, 44, '#E0E0E0', 0, 0) + P('M90 250l18-44h24l18 44z', '#BDBDBD', 0)
      + P('M56 206V70h128v136h-36v-80c0-38-56-38-56 0v80z', '#FFFFFF') + [62, 72, 168, 178].map((x) => Lc(`M${x} 88v116`, '#ECEFF1', 4)).join('') + R(52, 62, 136, 14, '#FFCA28', 2) + ring(8, (k) => C(62 + k * 16.5, 69, 2.5, '#FFFFFF', 0))
      + R(96, 44, 48, 20, '#FFFFFF') + P('M98 46c0-30 44-30 44 0z', '#26C6DA') + Lc('M120 16v-8', '#FFCA28', 4) + face(120, 92, 0.4)),
  L('burabay', 'หินโอกเจตเปสริมทะเลสาบบูราไบ', 'Okzhetpes rock by Lake Burabay', ['burabay', 'บูราไบ', 'borovoe', 'โบโรโว', 'okzhetpes', 'หินโอกเจตเปส', 'zhumbaktas', 'หินจุมบักตัส', 'pine forest lake', 'ทะเลสาบป่าสน', 'weekend trip'], 'หาหินก้อนเล็กที่ตั้งอยู่กลางทะเลสาบ', 'Find the little rock standing alone in the lake',
    // a tall pile of rounded granite boulders rising from a pine-covered shore, a blue lake in front with one small pointed rock standing out in the water
    sky('#E3F2FD') + P('M-4 120c40-20 80-10 120-30v60H-4z', '#558B2F') + [[16, 120], [40, 110], [64, 104]].map(([x, y]) => P(`M${x} ${y - 44}l12 22h-6l10 22h-32l10-22h-6z`, '#2E7D32', 2.5)).join('')
      + [[150, 140, 30, 22], [138, 112, 24, 18], [166, 104, 22, 20], [150, 80, 20, 18], [160, 58, 14, 14], [180, 132, 22, 18]].map(([x, y, rx, ry]) => E(x, y, rx, ry, '#BCAAA4')).join('') + face(150, 140, 0.4)
      + P('M-4 150h248v100H-4z', '#42A5F5') + P('M70 196l10-30 8 10 6-8 6 28z', '#A1887F') + Lc('M60 200h46', '#BBDEFB', 3) + Lc('M140 210c20-4 40 4 60 0M20 228c20-4 40 4 60 0', '#BBDEFB', 3)),
  L('velodrome', 'สนามจักรยานซารึอาร์กาทรงหมวกกันน็อก', 'The Saryarka velodrome, shaped like a bike helmet', ['saryarka velodrome', 'สนามจักรยานซารึอาร์กา', 'cycling helmet building', 'ตึกหมวกจักรยาน', 'track cycling', 'จักรยานลู่', 'sports arena', 'สนามกีฬา', 'silver dome'], 'หาลายทางบนหลังคาเหมือนหมวกกันน็อกจักรยาน', 'Find the stripes on the roof like a cycling helmet',
    // a long silver dome shaped exactly like a racing bike helmet, with dark stripe vents along it and a pointed tail, a little bicycle wheeling past in front
    sky('#E3F2FD') + R(-4, 190, 248, 60, '#C5E1A5', 0, 0) + P('M20 186c0-60 50-100 110-100 50 0 90 30 100 70l-20 30z', '#CFD8DC') + ring(5, (k) => P(`M${46 + k * 30} ${150 - Math.sin(((k + 0.5) / 5) * Math.PI) * 30}c10-10 20-12 26-10-4 12-14 18-26 18z`, '#455A64', 2)).replace(/(\d+\.\d{2,})/g, (m) => (+m).toFixed(1))
      + Lc('M30 172c40-10 140-12 190-4', '#ECEFF1', 4) + face(110, 166, 0.45)
      + g(120, 220, 0.8, C(-24, 0, 14, 'none', 4) + C(24, 0, 14, 'none', 4) + Lc('M-24 0l14-20h28l6 20M-10-20l14 20M18-20l-4-8', '#E53935', 4))),
  L('goldentowers', 'ตึกแฝดสีทองริมถนนนูร์โจล', 'The two golden towers on Nurzhol Boulevard', ['golden towers', 'ตึกแฝดสีทอง', 'twin towers', 'ตึกแฝด', 'nurzhol boulevard', 'ถนนนูร์โจล', 'shiny gold buildings', 'ตึกสีทองวาว', 'city walk'], 'หาตึกสีทองสองตึกที่เหมือนกัน', 'Find the two golden towers that look the same',
    // two tall round gold-glass towers standing side by side like twins, gleaming stripes of sunlight on them, a long green boulevard of trees in front
    sky('#E1F5FE') + R(-4, 200, 248, 50, '#C5E1A5', 0, 0) + [74, 166].map((x) => R(x - 30, 40, 60, 160, '#FFCA28', 10) + E(x, 40, 30, 8, '#FFE082') + ring(7, (k) => Lc(`M${x - 30} ${60 + k * 20}h60`, '#F9A825', 2.5)) + Lc(`M${x - 18} 52v140`, '#FFF59D', 5) + face(x, 110, 0.4)).join('')
      + ring(7, (k) => C(10 + k * 37, 206, 14, ['#43A047', '#66BB6A'][k % 2]))),
];

export default {
  places: {
    'kz-astana': { country: 'kz', wave: 3, name: nm('อัสตานาและบูราไบ', 'Astana and Burabay'), tz: 'Asia/Almaty', ll: [51.13, 71.43], alias: ['astana', 'อัสตานา', 'NQZ', 'nur-sultan', 'นูร์-ซุลตัน', 'burabay', 'บูราไบ', 'borovoe'], colors: AS },
  },
  items,
};
