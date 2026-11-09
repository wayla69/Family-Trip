// France, Paris and the Disneyland Paris day out — each picture its own. The park is drawn as a castle of our own design:
// no Disney castle, logo or character (docs/STOCK-ART.md §8.1).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const FR = { k1: '#2E4A7D', k2: '#C62828', k3: '#E3F2FD' };
const DP = { k1: '#8E24AA', k2: '#2E4A7D', k3: '#F3E5F5' };
// the Eiffel Tower drawn once for Paris: curved legs, the big first-floor arch, three platforms, a lighthouse top
const eiffel = (dots) => P('M60 220c20-40 40-110 52-200h16c12 90 32 160 52 200h-30c-10-30-30-46-50-46s-40 16-50 46z', '#8D6E63')
  + R(70, 150, 100, 12, '#A1887F', 3) + R(92, 96, 56, 10, '#A1887F', 3) + R(106, 44, 28, 8, '#A1887F', 3) + Lc('M84 176l72-60M156 176l-72-60M100 140l40-40M140 140l-40-40', '#6D4C41', 2.5) + Lc('M120 20V4', INK, 4)
  + (dots ? [[90, 130], [150, 128], [110, 80], [130, 70], [120, 40], [80, 190], [160, 192]].map(([x, y]) => C(x, y, 3, '#FFF59D', 0)).join('') : '');

const items = [
  { id: 'fr.stamp', cat: 'stamp', file: 'fr/stamp.v1.svg', name: nm('ตราประทับฝรั่งเศส', 'France stamp'), kw: ['france', 'ฝรั่งเศส'],
    // the Gallic rooster, chest out, red comb, tricolour tail feathers
    svg: countryStamp({ name: 'FRANCE', ...FR, emblem: P('M120 104c20-10 30-30 22-50 12 10 14 30 6 44zM120 104c24 0 34-16 34-34 8 16 4 34-10 42z', '#1E88E5', 3) + P('M124 108c10-6 20-6 26 4-8 6-20 6-26-4z', '#E53935', 3)
      + E(100, 104, 30, 24, '#FFFFFF') + C(80, 76, 14, '#FFFFFF') + P('M74 62l4-10 4 8 4-10 4 10z', '#E53935', 2.5) + P('M66 78l-10 3 10 3z', '#FFB300', 2.5) + Lc('M94 126l-4 14M108 126l4 14', '#FFB300', 3) }) },
  { id: 'fr.flag', ch: '🇫🇷', cat: 'flag', file: 'fr/flag.v1.svg', name: nm('ธงฝรั่งเศส', 'Flag of France'), kw: ['france', 'ฝรั่งเศส', 'flag', 'ธง', 'tricolore'],
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A') + P('M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z', '#FFFFFF') + P('M44 38c18-4 36-2 56 2v112c-20-4-38-6-56-2z', '#0055A4') + P('M170 38c18-6 28-4 42 0v112c-14-4-24-6-42 0z', '#EF4135')) },
  { id: 'fr.hello', cat: 'hello', file: 'fr/hello.v1.svg', name: nm('บงชูร์ สวัสดี', 'Bonjour, hello'), kw: ['bonjour', 'บงชูร์', 'hello', 'สวัสดี', 'beret', 'เบเรต์', 'baguette', 'บาแก็ต'],
    // a child in a striped sailor top and a red beret, a long baguette under one arm
    svg: free(P('M78 214c0-54 16-86 42-86s42 32 42 86z', '#FFFFFF') + [146, 162, 178, 194, 208].map((y) => Lc(`M80 ${y}h80`, '#1E88E5', 5)).join('') + g(70, 170, 1, R(-10, -50, 20, 100, '#E9A64C', 10) + Lc('M-6-30l8-6M-6-6l8-6M-6 18l8-6', '#C8862F', 3), -30)
      + C(120, 90, 36, '#FFE0BD') + P('M78 70c0-24 28-34 50-30 20 4 30 18 26 30z', '#E53935') + Lc('M120 40v-8', INK, 4)
      + P('M162 150c14-16 18-38 12-54l14-4c8 22 2 46-14 64z', '#FFE0BD') + C(182, 88, 11, '#FFE0BD') + face(120, 94, 0.65)) },
  { id: 'fr.food.croissant', ch: '🥐', cat: 'food', file: 'fr/food-croissant.v1.svg', name: nm('ครัวซองต์', 'Croissant'), kw: ['croissant', 'ครัวซองต์', 'boulangerie', 'ร้านขนมปัง', 'breakfast', 'อาหารเช้า'], colour: true,
    // a fat golden crescent: five rolled lobes along a curve, the middle one biggest, thin curled tips
    svg: free([[-2, 0.55], [-1, 0.8], [0, 1], [1, 0.8], [2, 0.55]].map(([k, sz]) => { const a = (k * 32) * Math.PI / 180, x = 120 + Math.sin(a) * 78, y = 168 - Math.cos(a) * 78; return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${k * 32})">${E(0, 0, 30 * sz + 6, 42 * sz + 6, '#E9A64C')}${Lc(`M${-(20 * sz).toFixed(1)} ${-(10 * sz).toFixed(1)}q${(20 * sz).toFixed(1)} ${(14 * sz).toFixed(1)} ${(40 * sz).toFixed(1)} 0`, '#C8862F', 3.5)}</g>`; }).join('')
      + face(120, 98, 0.55)) },
  { id: 'fr.food.macaron', cat: 'food', file: 'fr/food-macaron.v1.svg', name: nm('มาการง', 'Macarons'), kw: ['macaron', 'มาการง', 'laduree', 'patisserie', 'ร้านขนม', 'dessert'], colour: true,
    // a little tower of pastel macarons: pistachio, raspberry, lemon, violet
    svg: free([['#C5E1A5', 190], ['#F48FB1', 150], ['#FFF59D', 110], ['#CE93D8', 70]].map(([c, y], i) => { const w = 76 - i * 8; return P(`M${120 - w} ${y}c0-20 ${w * 2} -20 ${w * 2} 0z`, c) + R(120 - w + 2, y, w * 2 - 4, 8, '#FFF8E1', 4, 3.5) + P(`M${120 - w} ${y + 8}h${w * 2}c0 18-${w * 2} 18-${w * 2} 0z`, c); }).join('') + face(120, 128, 0.6)) },
  { id: 'fr.food.crepe', cat: 'food', file: 'fr/food-crepe.v1.svg', name: nm('เครป', 'Crêpe'), kw: ['crepe', 'crêpe', 'เครป', 'nutella', 'strawberry', 'สตรอว์เบอร์รี', 'creperie'], colour: true,
    // a thin crêpe folded into a cone in paper, chocolate spread, strawberries and a dusting of sugar
    svg: free(P('M60 70c40-30 100-30 130 0l-60 140z', '#F4C47C') + P('M66 74c36-20 88-20 118 0-10 16-30 24-58 24s-48-8-60-24z', '#6D4C41') + [[96, 72], [128, 66], [158, 74]].map(([x, y]) => P(`M${x - 12} ${y}c0-14 24-14 24 0-4 12-20 12-24 0z`, '#E53935', 3.5)).join('')
      + P('M82 130l48 80 30-70z', '#FFFFFF') + Lc('M96 150l20 10M110 176l20-6', '#E3F2FD', 3) + face(126, 114, 0.6)) },
  { id: 'fr.animal.poodle', ch: '🐩', cat: 'animal', file: 'fr/animal-poodle.v1.svg', name: nm('หมาพุดเดิ้ล', 'Poodle'), kw: ['poodle', 'พุดเดิ้ล', 'dog', 'หมา', 'paris park'], colour: true,
    // a pink-white poodle with pom-pom puffs on head, ears, chest and tail, thin legs, a little bow
    svg: free(E(146, 150, 54, 34, '#FFFFFF') + C(200, 120, 16, '#F8BBD0') + [[110, 182], [180, 182]].map(([x, y]) => Lc(`M${x} ${y}v24`, INK, 5) + C(x, y + 28, 9, '#F8BBD0')).join('')
      + C(90, 120, 34, '#FFFFFF') + C(90, 82, 20, '#F8BBD0') + C(62, 128, 14, '#F8BBD0') + C(118, 128, 14, '#F8BBD0') + P('M100 66l14-8v16zM100 66l-14-8v16z', '#E91E63', 3) + E(90, 140, 12, 9, '#FFF3E0') + E(90, 134, 5, 4, INK) + face(90, 118, 0.55)) },
  { id: 'fr.animal.snail', ch: '🐌', cat: 'animal', file: 'fr/animal-snail.v1.svg', name: nm('หอยทาก', 'Snail'), kw: ['snail', 'หอยทาก', 'escargot', 'เอสคาร์โก', 'garden', 'สวน'], colour: true,
    // a smiling garden snail with a swirl shell, long eye stalks and a tiny beret
    svg: free(P('M20 200c0-20 30-30 80-30h100c20 0 20 30 0 30z', '#BCAAA4') + C(120, 130, 60, '#FFB74D') + P('M120 130m-40 0a40 40 0 1 1 40 40 26 26 0 1 1-26-26 12 12 0 1 1 12 12', 'none', 5)
      + P('M186 170c10-30 6-50 0-60h20c8 20 6 50-6 60z', '#BCAAA4') + Lc('M196 110l-10-30M206 110l10-30', INK, 4) + C(186, 78, 6, '#BCAAA4') + C(218, 78, 6, '#BCAAA4') + P('M180 104c4-12 32-12 34 0z', '#E53935', 3) + face(198, 136, 0.45)) },
  { id: 'fr.transport.tgv', cat: 'transport', file: 'fr/transport-tgv.v1.svg', name: nm('รถไฟความเร็วสูง TGV', 'TGV high-speed train'), kw: ['tgv', 'รถไฟความเร็วสูง', 'sncf', 'inoui', 'ouigo', 'gare de lyon', 'train'], colour: true,
    // the TGV's round duck-bill nose in silver and deep blue with a red stripe running under the windows
    svg: free(P('M10 176v-56c0-18 10-28 28-28h110c40 0 70 20 82 56l6 28z', '#ECEFF1') + P('M150 94c34 4 60 22 70 50l-64 0z', '#283593') + Lc('M10 156h226', '#E53935', 7)
      + [26, 62, 98].map((x) => R(x, 108, 28, 22, '#90CAF9', 5, 4)).join('') + P('M4 190h232') + C(54, 184, 9, '#5F6B7A') + C(168, 184, 9, '#5F6B7A') + face(196, 130, 0.45)) },
  { id: 'fr.culture.accordion', cat: 'culture', file: 'fr/culture-accordion.v1.svg', name: nm('หีบเพลงชัก', 'Accordion'), kw: ['accordion', 'หีบเพลงชัก', 'musette', 'music', 'ดนตรี', 'street musician'], colour: true,
    // a red accordion stretched open, its pleated bellows zig-zagging, white buttons on one side and keys on the other
    svg: free(R(20, 70, 50, 110, '#E53935', 8) + R(170, 70, 50, 110, '#E53935', 8) + P('M70 74l14 106 14-106 14 106 14-106 14 106 14-106 14 106 12-106', 'none', 4) + P('M70 74h100v106H70z', '#FFCDD2', 0).replace('stroke-width="0"', 'stroke="none"')
      + P('M70 74l14 106 14-106 14 106 14-106 14 106 14-106 14 106 12-106', 'none', 4) + [0, 1, 2, 3, 4].map((i) => R(180, 82 + i * 18, 30, 12, i % 2 ? INK : '#FFFFFF', 2, 3)).join('') + [0, 1, 2, 3].map((i) => C(45, 92 + i * 24, 7, '#FFFFFF', 3)).join('') + face(120, 120, 0.5)) },
  { id: 'fr.culture.lavender', cat: 'culture', file: 'fr/culture-lavender.v1.svg', name: nm('ช่อลาเวนเดอร์โพรวองซ์', 'Provence lavender bunch'), kw: ['lavender', 'ลาเวนเดอร์', 'provence', 'โพรวองซ์', 'valensole', 'flowers', 'ดอกไม้'], colour: true,
    // a bunch of lavender stalks tied with a ribbon, purple buds along each tip, a bee visiting
    svg: free([-30, -15, 0, 15, 30].map((a) => `<g transform="translate(120 200) rotate(${a})">${Lc('M0 0V-150', '#7CB342', 5)}${[0, 1, 2, 3, 4].map((i) => E(0, -110 - i * 10, 7, 9, '#9575CD', 3)).join('')}</g>`).join('')
      + P('M96 160c14 10 34 10 48 0l6 16c-20 12-40 12-60 0z', '#F48FB1') + E(186, 70, 14, 10, '#FFCA28', 3.5) + Lc('M180 62v16M190 62v16', INK, 3) + E(186, 58, 8, 5, '#E1F5FE', 2.5) + face(120, 186, 0.45)) },
  // ---------- Paris
  { id: 'fr-paris.stamp', cat: 'stamp', file: 'fr/paris/stamp.v1.svg', name: nm('ตราประทับปารีส', 'Paris stamp'), kw: ['paris', 'ปารีส'],
    svg: cityStamp('fpa-st', { name: 'PARIS', sub: 'FRANCE', ...FR, emblem: `<g transform="translate(62 44) scale(0.42)">${eiffel(false)}</g>` }) },
  { id: 'fr-paris.day.eiffelnight', cat: 'day', file: 'fr/paris/day-eiffelnight.v1.svg', name: nm('หอไอเฟลยามค่ำกับเรือแม่น้ำแซน', 'The Eiffel Tower sparkling at night'), kw: ['eiffel', 'ไอเฟล', 'seine', 'แม่น้ำแซน', 'bateaux mouches', 'ล่องเรือ', 'trocadero', 'night'],
    // the tower sparkling against a deep blue night, a river boat with lit windows on the Seine in front
    svg: scene('fpa-d1', '#1A237E', [[30, 40], [200, 60], [60, 90], [180, 30]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('') + `<g transform="translate(21.6 14) scale(0.82)">${eiffel(true)}</g>`
      + P('M-4 186h248v70H-4z', '#283593') + P('M50 192h140l-12 16H62z', '#ECEFF1') + [70, 96, 122, 148].map((x) => R(x, 182, 16, 10, '#FFE082', 2, 3)).join('') + Lc('M20 222h30M170 226h40', '#FFF59D', 4)) },
  { id: 'fr-paris.day.montmartre', cat: 'day', file: 'fr/paris/day-montmartre.v1.svg', name: nm('ม้าหมุนมงมาร์ตร์', 'The Montmartre carousel'), kw: ['montmartre', 'มงมาร์ตร์', 'sacre coeur', 'ซาเคร-เกอร์', 'carousel', 'ม้าหมุน', 'artists', 'จิตรกร'],
    // a striped carousel with painted horses at the foot of the hill, the white domes of the basilica on top
    svg: scene('fpa-d2', '#FFF3E0', P('M-4 130c60-40 180-40 248 0v120H-4z', '#AED581') + R(90, 52, 60, 40, '#FFFFFF') + P('M100 52c0-24 40-24 40 0z', '#FFFFFF') + C(120, 24, 5, '#FFFFFF', 3) + P('M82 64c0-12 16-12 16 0zM142 64c0-12 16-12 16 0z', '#FFFFFF', 3)
      + P('M50 140l70-30 70 30z', '#E53935') + Lc('M70 132l16-14M110 120l4-8M150 132l-16-14', '#FFFFFF', 4) + R(56, 140, 128, 10, '#FFD54A', 3) + [76, 120, 164].map((x, i) => Lc(`M${x} 150v50`, '#FFD54A', 4) + P(`M${x - 14} ${176 - i * 6}c0-12 24-12 28 0l-6 8h-16z`, ['#FFFFFF', '#F8BBD0', '#B3E5FC'][i], 3.5)).join('')
      + R(52, 200, 136, 10, '#8D6E63', 3)) },
  { id: 'fr-paris.landmark.eiffel', ch: '🗼', cat: 'landmark', file: 'fr/paris/landmark-eiffel.v1.svg', name: nm('หอไอเฟล', 'Eiffel Tower'), kw: ['eiffel', 'eiffel tower', 'หอไอเฟล', 'ไอเฟล', 'champ de mars', 'tour eiffel'], colour: true, spot: nm('หาหอคอยเหล็กสีน้ำตาลที่มีโค้งใหญ่', 'Find the brown iron tower with the big arch'),
    svg: free(eiffel(false) + face(120, 196, 0.5)) },
  { id: 'fr-paris.landmark.arc', cat: 'landmark', file: 'fr/paris/landmark-arc.v1.svg', name: nm('ประตูชัยฝรั่งเศส', 'Arc de Triomphe'), kw: ['arc de triomphe', 'ประตูชัย', 'champs elysees', 'ช็องเซลีเซ', 'etoile'], colour: true, spot: nm('หาประตูโค้งหินขนาดยักษ์', 'Find the giant stone arch'),
    // the great square arch: a tall rounded opening, carved panels, a deep cornice, a little flag on top
    svg: free(P('M30 220V60h180v160h-50v-80c0-30-80-30-80 0v80z', '#F3E5C2') + R(22, 44, 196, 20, '#E8D5A3', 3) + R(26, 64, 188, 10, '#E8D5A3', 2, 3) + [[42, 150], [174, 150]].map(([x, y]) => R(x, y, 24, 40, '#E8D5A3', 3, 3.5)).join('')
      + Lc('M40 100h40M160 100h40', '#C8B27A', 4) + Lc('M120 44V20', INK, 3) + P('M120 22h22l-6 6 6 6h-22z', '#0055A4', 3) + face(120, 104, 0.55)) },
  { id: 'fr-paris.landmark.louvre', cat: 'landmark', file: 'fr/paris/landmark-louvre.v1.svg', name: nm('พีระมิดแก้วลูฟวร์', 'The Louvre pyramid'), kw: ['louvre', 'ลูฟวร์', 'pyramid', 'พีระมิดแก้ว', 'museum', 'พิพิธภัณฑ์', 'mona lisa'], colour: true, spot: nm('หาพีระมิดที่ทำจากแก้ว', 'Find the pyramid made of glass'),
    // the glass pyramid with its diamond grid in front of the long palace wing, fountains either side
    svg: free(R(10, 110, 220, 60, '#F3E5C2') + [30, 60, 90, 150, 180, 210].map((x) => R(x - 8, 124, 16, 26, '#90A4AE', 3, 3)).join('') + P('M10 112h220l-10-12H20z', '#78909C')
      + P('M60 210l60-110 60 110z', '#B3E5FC') + Lc('M90 156l60 54M120 100v110M150 156l-60 54M76 182h88M98 140h44', '#E1F5FE', 3) + P('M60 210l60-110 60 110z', 'none')
      + E(28, 206, 20, 6, '#4FC3F7') + E(212, 206, 20, 6, '#4FC3F7') + face(120, 176, 0.5)) },
  { id: 'fr-paris.landmark.notredame', cat: 'landmark', file: 'fr/paris/landmark-notredame.v1.svg', name: nm('มหาวิหารน็อทร์-ดาม', 'Notre-Dame'), kw: ['notre dame', 'notre-dame', 'น็อทร์-ดาม', 'cathedral', 'มหาวิหาร', 'ile de la cite', 'gargoyle'], colour: true, spot: nm('หาหน้าต่างกลมใหญ่ตรงกลาง', 'Find the big round window in the middle'),
    // the west front: two square towers, the round rose window, three pointed doorways, the slim spire behind
    svg: free(R(30, 70, 60, 150, '#E8DCC6') + R(150, 70, 60, 150, '#E8DCC6') + R(86, 100, 68, 120, '#EFE6D3') + Lc('M30 70h180', INK, 5)
      + C(120, 132, 22, '#CE93D8') + [0, 45, 90, 135].map((a) => g(120, 132, 1, Lc('M0-20V20', '#7B1FA2', 3), a)).join('') + [60, 120, 180].map((x) => P(`M${x - 14} 220v-30c0-18 28-18 28 0v30z`, '#6D4C41')).join('')
      + [[46, 90], [166, 90]].map(([x, y]) => P(`M${x} ${y + 30}v-20c0-12 28-12 28 0v20z`, '#90A4AE', 3.5)).join('') + face(120, 172, 0.45)) },
  // ---------- the Disneyland Paris day (our own castle)
  { id: 'p-disney-paris.stamp', cat: 'stamp', file: 'fr/disney-paris/stamp.v1.svg', name: nm('ตราประทับสวนสนุกปารีส', 'Theme park day stamp'), kw: ['disneyland paris', 'ดิสนีย์แลนด์ปารีส', 'disney', 'ดิสนีย์', 'theme park', 'สวนสนุก'],
    svg: cityStamp('pdp-st', { name: 'MAGIC DAY', sub: 'PARIS', ...DP, emblem: R(78, 104, 44, 36, '#F8BBD0') + P('M74 106l10-30 10 30zM106 106l10-30 10 30z', '#7E57C2', 3) + R(90, 84, 20, 22, '#F8BBD0') + P('M86 86l14-26 14 26z', '#7E57C2', 3) + C(100, 56, 3, '#FFD54A', 0) + P('M92 140v-12c0-8 16-8 16 0v12z', '#7E57C2', 3) }) },
  { id: 'p-disney-paris.day.fireworks', cat: 'day', file: 'fr/disney-paris/day-fireworks.v1.svg', name: nm('พลุเหนือปราสาทสวนสนุก', 'Fireworks over the park castle'), kw: ['disneyland paris', 'ดิสนีย์แลนด์ปารีส', 'fireworks', 'พลุ', 'night show', 'โชว์กลางคืน', 'theme park'],
    // bursts of fireworks over a pink-and-lilac castle silhouette, the crowd's balloons below
    svg: scene('pdp-d1', '#311B92', [[60, 60, '#FF4081'], [120, 40, '#FFEB3B'], [180, 66, '#00E5FF']].map(([x, y, c]) => Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return Lc(`M${x} ${y}l${(Math.cos(a) * 20).toFixed(1)} ${(Math.sin(a) * 20).toFixed(1)}`, c, 4); }).join('')).join('')
      + R(70, 150, 100, 70, '#F8BBD0') + [70, 150].map((x) => R(x, 110, 20, 50, '#F48FB1') + P(`M${x - 4} 112l14-34 14 34z`, '#7E57C2')).join('') + R(104, 96, 32, 60, '#F48FB1') + P('M98 98l22-50 22 50z', '#7E57C2') + P('M108 220v-26c0-16 24-16 24 0v26z', '#7E57C2')
      + [[30, 200, '#E53935'], [210, 196, '#FFCA28']].map(([x, y, c]) => C(x, y, 12, c) + Lc(`M${x} ${y + 12}v30`, INK, 2)).join('')) },
  { id: 'p-disney-paris.landmark.castle', cat: 'landmark', file: 'fr/disney-paris/landmark-castle.v1.svg', name: nm('ปราสาทเจ้าหญิงในสวนสนุก', 'A fairy-tale park castle'), kw: ['disneyland paris', 'ดิสนีย์แลนด์ปารีส', 'castle', 'ปราสาท', 'princess', 'เจ้าหญิง', 'theme park', 'สวนสนุก'], colour: true, spot: nm('หาปราสาทสีชมพูหลังคาม่วง', 'Find the pink castle with purple roofs'),
    // a pink fairy-tale castle of our own: round towers with lilac cones and gold tips, flags, a drawbridge over a blue moat
    svg: free(P('M10 210c40-8 80-8 110 0s70 8 110 0v14H10z', '#4FC3F7') + R(40, 120, 160, 90, '#F8BBD0') + [40, 176].map((x) => R(x - 6, 80, 36, 130, '#F48FB1') + P(`M${x - 12} 82l24-56 24 56z`, '#9575CD') + C(x + 12, 24, 4, '#FFD54A', 3)).join('')
      + R(96, 70, 48, 90, '#F48FB1') + P('M88 72l32-64 32 64z', '#9575CD') + P('M120 8V-4', INK, 3) + P('M100 210v-34c0-24 40-24 40 0v34z', '#7E57C2') + [72, 168].map((x) => R(x - 8, 140, 16, 22, '#FFF59D', 8, 3.5)).join('')
      + [0, 1, 2, 3, 4, 5].map((i) => R(44 + i * 26, 112, 14, 10, '#F8BBD0', 0, 3.5)).join('') + face(120, 112, 0.55)) },
];
export default {
  places: {
    fr: { country: 'fr', wave: 1, name: nm('ฝรั่งเศส', 'France'), tz: 'Europe/Paris', alias: ['france', 'ฝรั่งเศส'], colors: FR },
    'fr-paris': { country: 'fr', wave: 1, name: nm('ปารีส', 'Paris'), tz: 'Europe/Paris', ll: [48.86, 2.35], alias: ['paris', 'ปารีส', 'montmartre', 'มงมาร์ตร์', 'louvre', 'ลูฟวร์', 'eiffel', 'ไอเฟล', 'champs', 'seine', 'แม่น้ำแซน', 'versailles', 'แวร์ซาย', 'le marais'], colors: FR },
    'p-disney-paris': { country: 'fr', wave: 1, name: nm('ดิสนีย์แลนด์ปารีส', 'Disneyland Paris'), tz: 'Europe/Paris', ll: [48.87, 2.78], alias: ['disneyland paris', 'ดิสนีย์แลนด์ปารีส', 'disneyland', 'ดิสนีย์แลนด์', 'marne-la-vallee', 'disney village'], colors: DP },
  },
  items,
};
