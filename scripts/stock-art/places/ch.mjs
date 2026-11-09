// Switzerland: Lucerne, Interlaken & the Jungfrau, Zermatt — each picture its own
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const CH = { k1: '#D52B1E', k2: '#2E7D6E', k3: '#FFEBEE' };
const cross = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-20" width="12" height="40" fill="#FFFFFF" stroke="none"/><rect x="-20" y="-6" width="40" height="12" fill="#FFFFFF" stroke="none"/></g>`;
// edelweiss: woolly white star petals, a cluster of yellow buds in the middle
const edelweiss = (x, y, s) => g(x, y, s, [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<g transform="rotate(${a})">${P('M0 0c-8-10-6-26 0-30 6 4 8 20 0 30z', '#FAFAFA', 3)}</g>`).join('') + [[-4, -4], [4, -4], [0, 4], [-6, 3], [6, 3]].map(([dx, dy]) => C(dx, dy, 3.5, '#FFD54A', 2)).join(''));

const items = [
  { id: 'ch.stamp', cat: 'stamp', file: 'ch/stamp.v1.svg', name: nm('ตราประทับสวิตเซอร์แลนด์', 'Switzerland stamp'), kw: ['switzerland', 'สวิตเซอร์แลนด์', 'swiss', 'สวิส'],
    svg: countryStamp({ name: 'SCHWEIZ', ...CH, emblem: edelweiss(100, 92, 1.3) }) },
  { id: 'ch.flag', ch: '🇨🇭', cat: 'flag', file: 'ch/flag.v1.svg', name: nm('ธงสวิตเซอร์แลนด์', 'Flag of Switzerland'), kw: ['switzerland', 'สวิตเซอร์แลนด์', 'swiss', 'flag', 'ธง'],
    // the square red flag with its white cross
    svg: free(Lc('M50 222V24', '#8D6E63', 7) + C(50, 22, 8, '#FFD54A') + R(54, 36, 120, 120, '#D52B1E', 6) + cross(114, 96, 1.7)) },
  { id: 'ch.hello', cat: 'hello', file: 'ch/hello.v1.svg', name: nm('กรือเอซี สวัสดี', 'Grüezi, hello'), kw: ['gruezi', 'grüezi', 'กรือเอซี', 'hello', 'สวัสดี', 'snow', 'หิมะ', 'ski'],
    // a child in a red knitted hat with a big pompom and an edelweiss jumper, mittens on a string, snowflakes about
    svg: free(P('M78 214c0-54 16-86 42-86s42 32 42 86z', '#D52B1E') + Lc('M80 160h80', '#FFFFFF', 6) + edelweiss(120, 186, 0.45) + C(120, 92, 34, '#FFE0BD') + P('M84 84c0-34 72-34 72 0z', '#D52B1E') + R(82, 78, 76, 12, '#FFFFFF', 6) + C(120, 42, 12, '#FFFFFF')
      + P('M158 150c14-16 18-38 12-54l14-4c8 22 2 46-14 64z', '#D52B1E') + E(180, 88, 13, 15, '#FFFFFF') + [[40, 60], [200, 40], [30, 130]].map(([x, y]) => g(x, y, 0.5, Lc('M0-14V14M-12-7l24 14M-12 7l24-14', '#90CAF9', 5))).join('') + face(120, 98, 0.6)) },
  { id: 'ch.food.fondue', cat: 'food', file: 'ch/food-fondue.v1.svg', name: nm('ชีสฟองดู', 'Cheese fondue'), kw: ['fondue', 'ฟองดู', 'cheese', 'ชีส', 'caquelon', 'gruyere', 'กรูแยร์'], colour: true,
    // a red caquelon of bubbling melted cheese over a little burner, a cube of bread twirling on a long fork
    svg: free(P('M50 110h140c0 50-30 74-70 74s-70-24-70-74z', '#D52B1E') + E(120, 110, 70, 16, '#FFE082') + [[96, 106], [140, 112]].map(([x, y]) => C(x, y, 5, '#FFF59D', 3)).join('') + Lc('M190 122h30', INK, 6)
      + R(80, 184, 80, 10, '#5F6B7A', 3) + P('M110 204c0-14 20-14 20 0z', '#FF7043', 3) + Lc('M150 100l50-80', '#90A4AE', 4) + R(136, 92, 24, 22, '#E9A64C', 5) + P('M136 108c-4 10 0 18 8 20 6-4 10-12 8-20', '#FFE082', 3) + face(120, 144, 0.7)) },
  { id: 'ch.food.chocolate', ch: '🍫', cat: 'food', file: 'ch/food-chocolate.v1.svg', name: nm('ช็อกโกแลตสวิส', 'Swiss chocolate'), kw: ['chocolate', 'ช็อกโกแลต', 'swiss chocolate', 'ช็อกโกแลตสวิส', 'chocolate factory', 'โรงงานช็อกโกแลต'], colour: true,
    // a bar of milk chocolate half out of its foil, two squares broken off, hazelnuts
    svg: free(g(120, 130, 1, R(-80, -50, 160, 100, '#8D5A3B', 8) + [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0]].map(([i, j]) => R(-74 + (i + 1) * 50, -44 + (j + 1) * 46, 44, 40, '#9C6644', 5, 3)).join('') + P('M10-50h70v100H10z', '#B0BEC5') + Lc('M10-50v100', '#ECEFF1', 4), -8)
      + R(40, 186, 34, 30, '#9C6644', 5) + R(84, 192, 34, 28, '#9C6644', 5) + [[176, 196], [198, 186]].map(([x, y]) => E(x, y, 12, 14, '#C68642')).join('') + face(80, 124, 0.6)) },
  { id: 'ch.food.rosti', cat: 'food', file: 'ch/food-rosti.v1.svg', name: nm('รösti มันฝรั่งขูดทอด', 'Rösti'), kw: ['rosti', 'rösti', 'รอสติ', 'potato', 'มันฝรั่ง', 'hash brown'], colour: true,
    // a round crispy golden potato cake in a cast-iron pan, a fried egg on top, a sprig of chives
    svg: free(E(120, 150, 100, 46, '#424242') + Lc('M210 150h28', INK, 9) + E(120, 144, 82, 34, '#E9A64C') + Array.from({ length: 10 }, (_, i) => Lc(`M${54 + i * 13} ${134 + (i % 3) * 6}l12 4`, '#C8862F', 3)).join('')
      + P('M86 130c0-24 68-24 68 0 0 14-68 14-68 0z', '#FFFFFF') + C(122, 126, 13, '#FFB300') + Lc('M160 118l20-12M164 124l22-6', '#43A047', 3) + face(100, 156, 0.5)) },
  { id: 'ch.animal.stbernard', cat: 'animal', file: 'ch/animal-stbernard.v1.svg', name: nm('หมาเซนต์เบอร์นาร์ด', 'St Bernard'), kw: ['st bernard', 'เซนต์เบอร์นาร์ด', 'rescue dog', 'หมากู้ภัย', 'dog', 'หมา', 'great st bernard'], colour: true,
    // a big gentle rescue dog: white and chestnut, droopy ears, the little barrel on its collar
    svg: free(E(130, 170, 76, 40, '#FFFFFF') + P('M110 150c20-20 70-20 90 10v30h-90z', '#A0522D') + [[86, 196], [180, 196]].map(([x, y]) => R(x - 12, y, 24, 24, '#FFFFFF', 8)).join('')
      + C(84, 100, 46, '#FFFFFF') + P('M44 90c-10 20-6 44 6 54 8-14 10-34 4-50zM124 90c10 20 6 44-6 54-8-14-10-34-4-50z', '#A0522D') + P('M60 70c10-20 40-20 48 0-12 10-36 10-48 0z', '#A0522D')
      + E(84, 126, 24, 16, '#FFFFFF') + E(84, 118, 9, 6, INK) + Lc('M50 146c20 10 50 10 70 0', '#D52B1E', 6) + R(72, 150, 24, 18, '#C8862F', 6, 4) + face(84, 100, 0.6)) },
  { id: 'ch.animal.marmot', cat: 'animal', file: 'ch/animal-marmot.v1.svg', name: nm('มาร์มอต', 'Alpine marmot'), kw: ['marmot', 'มาร์มอต', 'murmeli', 'alps', 'แอลป์', 'whistle'], colour: true,
    // a plump golden-brown marmot standing up on a rock, little paws together, front teeth showing
    svg: free(P('M40 220c10-30 40-40 80-40s70 10 80 40z', '#B0BEC5') + P('M76 190c-10-60 10-120 44-120s54 60 44 120z', '#C49A6C') + E(120, 150, 30, 36, '#E6C9A0') + C(90, 80, 9, '#C49A6C') + C(150, 80, 9, '#C49A6C')
      + E(120, 112, 18, 12, '#E6C9A0') + E(120, 106, 6, 4, INK) + R(115, 118, 10, 8, '#FFFFFF', 2, 2.5) + [[104, 150], [136, 150]].map(([x, y]) => E(x, y, 8, 6, '#A87F55')).join('') + face(120, 96, 0.6, 'none')) },
  { id: 'ch.transport.glacierexpress', cat: 'transport', file: 'ch/transport-glacierexpress.v1.svg', name: nm('รถไฟเกลเซียร์เอกซ์เพรส', 'Glacier Express'), kw: ['glacier express', 'เกลเซียร์เอกซ์เพรส', 'panoramic train', 'รถไฟชมวิว', 'bernina', 'รถไฟสีแดง', 'swiss train'], colour: true,
    // a red panoramic carriage with big curved roof windows crossing a stone viaduct of tall arches
    svg: free(P('M10 150h220v74H10z', '#BCAAA4') + [40, 90, 140, 190].map((x) => P(`M${x - 20} 224v-40c0-24 40-24 40 0v40z`, '#ECEFF1')).join('') + R(16, 80, 208, 60, '#D52B1E', 14)
      + P('M28 84c0-10 10-16 20-16h144c10 0 20 6 20 16v20H28z', '#B3E5FC') + Lc('M80 70v34M130 68v36M180 70v34', '#81D4FA', 3) + Lc('M16 128h208', '#FFFFFF', 4) + C(50, 144, 8, '#5F6B7A') + C(190, 144, 8, '#5F6B7A') + face(120, 118, 0.45)) },
  { id: 'ch.culture.alphorn', cat: 'culture', file: 'ch/culture-alphorn.v1.svg', name: nm('อัลป์ฮอร์น', 'Alphorn'), kw: ['alphorn', 'อัลป์ฮอร์น', 'horn', 'แตร', 'music', 'ดนตรี', 'yodel', 'โยเดล'], colour: true,
    // the long wooden alpine horn curving up at the end, painted with an edelweiss, a mouthpiece at the other end
    svg: free(Lc('M24 60l150 110', '#A1673F', 12) + Lc('M24 60l150 110', INK, 3) + P('M164 160c10-10 30-4 40 10 10 16 10 36 0 44-20 6-40-10-50-30-4-10 0-18 10-24z', '#C8862F') + E(184, 196, 22, 14, '#5D4037')
      + Lc('M44 76l12 8M84 104l12 8M124 134l12 8', '#5D4037', 3) + R(14, 50, 16, 12, '#5D4037', 3) + edelweiss(176, 176, 0.35) + face(150, 140, 0.4)) },
  { id: 'ch.culture.cuckoo', cat: 'culture', file: 'ch/culture-cuckoo.v1.svg', name: nm('นาฬิกากุ๊กกู', 'Cuckoo clock'), kw: ['cuckoo clock', 'นาฬิกากุ๊กกู', 'clock', 'นาฬิกา', 'souvenir', 'ของฝาก'], colour: true,
    // a little chalet clock with a carved roof, the cuckoo popping out of its door, pine-cone weights on chains
    svg: free(R(64, 70, 112, 100, '#A1673F', 4) + P('M50 76l70-50 70 50z', '#5D4037') + P('M100 60h40v18h-40z', '#FFF8E1') + P('M102 66c8-8 20-8 24 0l10-2-8 8c-4 6-20 8-26-6z', '#FFCA28', 3) + C(120, 120, 28, '#FFF8E1') + Lc('M120 120v-18M120 120l12 8', INK, 3.5)
      + [100, 140].map((x) => Lc(`M${x} 170v30`, INK, 2.5) + E(x, 210, 8, 14, '#6D4C41')).join('') + [[68, 160], [172, 160]].map(([x, y]) => P(`M${x - 8} ${y}c0-14 16-14 16 0z`, '#43A047', 3)).join('') + face(120, 120, 0.4, 'none')) },
  // ---------- Lucerne
  { id: 'ch-lucerne.stamp', cat: 'stamp', file: 'ch/lucerne/stamp.v1.svg', name: nm('ตราประทับลูเซิร์น', 'Lucerne stamp'), kw: ['lucerne', 'luzern', 'ลูเซิร์น'],
    svg: cityStamp('clu-st', { name: 'LUZERN', sub: 'SCHWEIZ', ...CH, emblem: Lc('M50 120l100-10', '#A1673F', 8) + P('M50 112l100-10-4-10-92 10z', '#D84315') + R(114, 66, 22, 44, '#E0C48C') + P('M110 68l15-18 15 18z', '#D84315') + Lc('M50 130c20-6 40-6 60 0s40 6 50 0', '#4FC3F7', 4) }) },
  { id: 'ch-lucerne.day.lake', cat: 'day', file: 'ch/lucerne/day-lake.v1.svg', name: nm('เรือกลไฟบนทะเลสาบลูเซิร์น', 'A paddle steamer on Lake Lucerne'), kw: ['lake lucerne', 'ทะเลสาบลูเซิร์น', 'paddle steamer', 'เรือกลไฟ', 'boat cruise', 'ล่องเรือ', 'pilatus', 'rigi'],
    // a white paddle steamer with a yellow funnel on the deep-blue lake, Pilatus rising behind, swans in front
    svg: scene('clu-d1', '#E3F2FD', P('M-4 130l60-80 40 40 30-30 60 70 58-20v20H-4z', '#78909C') + P('M56 50l14 18-8 6-6-6-8 6z', '#FFFFFF', 3) + P('M-4 130h248v120H-4z', '#1E88E5')
      + P('M40 160h160l-16 22H56z', '#FFFFFF') + R(70, 136, 100, 24, '#FFFFFF') + R(110, 112, 16, 24, '#FFCA28') + C(150, 166, 14, '#D52B1E') + [80, 100, 140].map((x) => R(x, 142, 12, 10, '#90CAF9', 2, 3)).join('')
      + [[40, 210], [80, 220]].map(([x, y]) => E(x, y, 12, 7, '#FFFFFF', 3) + Lc(`M${x + 8} ${y - 4}c4-10 0-16-4-16`, INK, 3)).join('') + Lc('M120 214h40', '#BBDEFB', 4)) },
  { id: 'ch-lucerne.landmark.chapelbridge', cat: 'landmark', file: 'ch/lucerne/landmark-chapelbridge.v1.svg', name: nm('สะพานไม้ชาเปล', 'Chapel Bridge'), kw: ['chapel bridge', 'สะพานไม้', 'kapellbrucke', 'kapellbrücke', 'water tower', 'reuss'], colour: true, spot: nm('หาสะพานไม้ที่มีหลังคาและหอคอย', 'Find the roofed wooden bridge with the tower'),
    // the long covered wooden bridge zigzagging across the river, flower boxes along it, the octagonal stone water tower
    svg: free(P('M10 196c40-6 80-6 110 0s70 6 110 0v24H10z', '#4FC3F7') + P('M10 150l110-20 110 20v12l-110-20-110 20z', '#A1673F') + P('M10 140l110-22 110 22-4-14-106-20-106 20z', '#D84315')
      + [40, 80, 160, 200].map((x) => Lc(`M${x} ${150 - Math.abs(120 - x) * -0.18}v40`, '#6D4C41', 4)).join('') + [30, 60, 90, 150, 180, 210].map((x) => C(x, 154 + Math.abs(120 - x) * 0.18 - 4, 5, '#EC407A', 2.5)).join('')
      + P('M144 200V100l12-14h28l12 14v100z', '#E0C48C') + P('M140 102l30-40 30 40z', '#D84315') + R(160, 120, 20, 26, '#5D4037', 3, 3) + face(170, 166, 0.45)) },
  { id: 'ch-lucerne.landmark.lion', cat: 'landmark', file: 'ch/lucerne/landmark-lion.v1.svg', name: nm('อนุสาวรีย์สิงโตแห่งลูเซิร์น', 'The Lion of Lucerne'), kw: ['lion monument', 'อนุสาวรีย์สิงโต', 'lowendenkmal', 'löwendenkmal', 'lion', 'สิงโต'], colour: true, spot: nm('หาสิงโตที่สลักในหน้าผา', 'Find the lion carved into the cliff'),
    // a stone lion asleep in a niche carved into a cliff, a little pond with lily pads in front
    svg: free(P('M10 200V60c40-30 180-30 220 0v140z', '#BCAAA4') + P('M44 170v-70c20-20 132-20 152 0v70z', '#A1887F') + E(120, 152, 70, 22, '#D7CCC8') + C(80, 132, 24, '#D7CCC8') + P('M56 120c-8-10-4-26 10-28 4 8 2 18-10 28zM98 116c8-10 4-24-8-26-4 8-2 18 8 26z', '#D7CCC8', 3)
      + P('M70 134c4 4 10 4 14 0', 'none', 3) + Lc('M190 150c10 0 20 6 20 14', INK, 4) + P('M10 200h220v24H10z', '#4FC3F7') + [[60, 210], [160, 214]].map(([x, y]) => E(x, y, 14, 5, '#66BB6A', 3)).join('') + face(84, 130, 0.45, 'none')) },
  { id: 'ch-lucerne.landmark.pilatus', cat: 'landmark', file: 'ch/lucerne/landmark-pilatus.v1.svg', name: nm('รถไฟฟันเฟืองพิลาตุส', 'Pilatus cogwheel railway'), kw: ['pilatus', 'พิลาตุส', 'cogwheel railway', 'รถไฟฟันเฟือง', 'steepest railway', 'dragon mountain'], colour: true, spot: nm('หารถไฟที่ปีนเขาชันที่สุด', 'Find the train climbing the steepest hill'),
    // a little red stepped carriage climbing a very steep track up a rocky ridge, cog rail teeth in the middle
    svg: free(P('M10 220L190 30l40 30v160z', '#90A4AE') + P('M190 30l14-10 26 40-12 6z', '#FFFFFF', 3) + Lc('M20 210L196 42', INK, 6) + Lc('M30 214L206 46', INK, 3) + Array.from({ length: 10 }, (_, i) => Lc(`M${40 + i * 16} ${196 - i * 16}l6 6`, INK, 3)).join('')
      + `<g transform="translate(100 130) rotate(-45)">${R(-40, -36, 80, 40, '#D52B1E', 6)}${[0, 1, 2].map((i) => R(-34 + i * 24, -30, 18, 16, '#B3E5FC', 3, 3)).join('')}${face(0, -6, 0.4)}</g>`) },
  // ---------- Interlaken & the Jungfrau
  { id: 'ch-interlaken.stamp', cat: 'stamp', file: 'ch/interlaken/stamp.v1.svg', name: nm('ตราประทับอินเทอร์ลาเคน', 'Interlaken stamp'), kw: ['interlaken', 'อินเทอร์ลาเคน', 'jungfrau', 'ยุงเฟรา'],
    svg: cityStamp('cin-st', { name: 'INTERLAKEN', sub: 'JUNGFRAU', ...CH, emblem: P('M50 136l30-46 14 14 20-40 36 72z', '#B0BEC5') + P('M114 64l10 20-8 6-6-6-6 8-6-6z', '#FFFFFF', 2.5) + P('M64 120c10-16 30-16 40 0z', '#FF7043', 2.5) + Lc('M76 120l8 10M92 120l-8 10', INK, 2) }) },
  { id: 'ch-interlaken.day.paraglide', cat: 'day', file: 'ch/interlaken/day-paraglide.v1.svg', name: nm('ร่มร่อนเหนืออินเทอร์ลาเคน', 'Paragliders over Interlaken'), kw: ['paragliding', 'ร่มร่อน', 'interlaken', 'อินเทอร์ลาเคน', 'hohematte', 'between the lakes', 'ทะเลสาบสองแห่ง'],
    // colourful paragliders drifting over the green Höhematte, two turquoise lakes either side, snowy peaks behind
    svg: scene('cin-d1', '#E1F5FE', P('M-4 110l50-60 40 30 40-50 50 60 68-10v40H-4z', '#B0BEC5') + P('M86 30l14 18-8 6-6-6-8 8-6-6z', '#FFFFFF', 3) + P('M-4 120h248v130H-4z', '#7CB342')
      + E(10, 170, 50, 22, '#26C6DA') + E(230, 170, 50, 22, '#26C6DA') + [[80, 80, '#FF7043'], [150, 60, '#AB47BC'], [190, 100, '#FFCA28']].map(([x, y, c]) => P(`M${x - 26} ${y}c10-16 42-16 52 0z`, c) + Lc(`M${x - 22} ${y}l18 26M${x + 22} ${y}l-18 26`, INK, 2) + C(x, y + 30, 5, '#1E88E5', 2.5)).join('')
      + [60, 100, 140, 180].map((x) => R(x - 8, 196, 16, 14, '#FFFFFF', 2, 3) + P(`M${x - 11} 197l11-10 11 10z`, '#D84315', 3)).join('')) },
  { id: 'ch-interlaken.landmark.sphinx', cat: 'landmark', file: 'ch/interlaken/landmark-sphinx.v1.svg', name: nm('หอดูดาวสฟิงซ์ ยุงเฟรายอค', 'Sphinx Observatory, Jungfraujoch'), kw: ['jungfraujoch', 'ยุงเฟรายอค', 'top of europe', 'หลังคายุโรป', 'sphinx', 'สฟิงซ์', 'aletsch glacier', 'ธารน้ำแข็ง'], colour: true, spot: nm('หาโดมดูดาวบนยอดเขาหิมะ', 'Find the silver dome on the snowy peak'),
    // the silver observatory dome perched on a rocky snow ridge, the Aletsch glacier flowing away below, a Swiss flag
    svg: free(P('M10 220l60-90 50 20 50-60 60 130z', '#ECEFF1') + P('M10 220l60-90 50 20 50-60 60 130', 'none') + P('M60 220c20-30 60-40 120-40v40z', '#B3E5FC') + Lc('M90 210c20-10 50-16 80-16', '#E1F5FE', 4)
      + R(146, 70, 48, 40, '#B0BEC5', 4) + P('M140 72c0-34 60-34 60 0z', '#CFD8DC') + Lc('M170 40v-10', INK, 3) + R(204, 40, 6, 50, '#5F6B7A', 0, 3) + R(210, 40, 22, 18, '#D52B1E', 2, 3) + face(170, 90, 0.45)) },
  { id: 'ch-interlaken.landmark.lauterbrunnen', cat: 'landmark', file: 'ch/interlaken/landmark-lauterbrunnen.v1.svg', name: nm('น้ำตกเลาเทอร์บรุนเนิน', 'Lauterbrunnen falls'), kw: ['lauterbrunnen', 'เลาเทอร์บรุนเนิน', 'staubbach', 'waterfall', 'น้ำตก', 'valley', 'หุบเขา'], colour: true, spot: nm('หาน้ำตกที่ตกจากหน้าผาสูง', 'Find the waterfall falling from the tall cliff'),
    // a long thin waterfall dropping off a sheer cliff into a green valley, a little church with a pointed spire
    svg: free(P('M10 220V20h70c10 60 10 140 0 200z', '#90A4AE') + P('M230 220V40h-50c-10 60-10 120 0 180z', '#90A4AE') + Lc('M82 24c0 60 10 120 14 170', '#E1F5FE', 10) + Lc('M82 24c0 60 10 120 14 170', '#81D4FA', 3)
      + P('M80 200c40-10 80-10 100 0v20H80z', '#7CB342') + R(136, 168, 30, 30, '#FFFFFF') + P('M132 170l19-14 19 14z', '#5D4037') + R(160, 130, 12, 40, '#FFFFFF') + P('M156 132l10-30 10 30z', '#5D4037') + face(150, 186, 0.35)) },
  { id: 'ch-interlaken.landmark.firstcliff', cat: 'landmark', file: 'ch/interlaken/landmark-firstcliff.v1.svg', name: nm('สะพานแขวนหน้าผาเฟิร์สต์', 'First Cliff Walk, Grindelwald'), kw: ['first cliff walk', 'เฟิร์สต์', 'grindelwald', 'กรินเดลวัลด์', 'first', 'cliff walk', 'ทางเดินหน้าผา', 'eiger'], colour: true, spot: nm('หาทางเดินเหล็กที่ยื่นออกจากหน้าผา', 'Find the metal walkway sticking out of the cliff'),
    // a metal walkway clinging round a cliff and jutting out over nothing, the Eiger's dark north face across the valley
    svg: free(P('M140 220l40-170 50 40v130z', '#455A64') + P('M180 50l16 12-6 8-10-8z', '#FFFFFF', 3) + P('M10 220V60h50c20 40 30 100 20 160z', '#8D6E63')
      + P('M60 110h80l10 10h-90z', '#90A4AE') + Lc('M62 100h82M62 90h82', '#90A4AE', 3) + Lc('M70 110v-20M100 110v-20M130 110v-20', INK, 3) + C(110, 82, 9, '#FFE0BD', 3) + R(104, 90, 12, 14, '#1E88E5', 3, 3) + face(110, 82, 0.25, 'none') + face(40, 150, 0.5)) },
  // ---------- Zermatt
  { id: 'ch-zermatt.stamp', cat: 'stamp', file: 'ch/zermatt/stamp.v1.svg', name: nm('ตราประทับเซอร์แมท', 'Zermatt stamp'), kw: ['zermatt', 'เซอร์แมท', 'matterhorn', 'แมทเทอร์ฮอร์น'],
    svg: cityStamp('czm-st', { name: 'ZERMATT', sub: 'MATTERHORN', ...CH, emblem: P('M56 140c20-10 30-50 40-90 10 10 16 30 20 40l12-8c10 20 16 40 18 58z', '#78909C') + P('M96 50c4 10 10 24 20 40l-12 8-8-12-8 10-6-6z', '#FFFFFF', 2.5) }) },
  { id: 'ch-zermatt.day.sunrise', cat: 'day', file: 'ch/zermatt/day-sunrise.v1.svg', name: nm('แมทเทอร์ฮอร์นยามเช้าจากหมู่บ้าน', 'Matterhorn at sunrise over the village'), kw: ['matterhorn sunrise', 'พระอาทิตย์ขึ้น', 'zermatt village', 'หมู่บ้านเซอร์แมท', 'chalets', 'แชเล่ต์', 'golden hour'],
    // the crooked pyramid of the Matterhorn glowing pink-gold at dawn over dark wooden chalets with flower boxes
    svg: scene('czm-d1', '#FFE0B2', P('M60 150c20-20 40-80 56-130 14 16 24 40 30 58l20-12c16 30 24 60 28 84z', '#F48FB1') + P('M116 20c6 16 14 34 30 58l-20 12-12-18-12 14-8-8z', '#FFF3E0', 3)
      + P('M-4 160c40-14 80-20 120-16s90 6 128 0v106H-4z', '#7CB342') + [[30, 170, 54], [100, 176, 60], [170, 168, 58]].map(([x, y, w]) => R(x, y, w, 48, '#6D4C41') + P(`M${x - 8} ${y + 2}l${w / 2 + 8}-22 ${w / 2 + 8} 22z`, '#4E342E') + R(x + 8, y + 14, 14, 12, '#FFE082', 2, 3) + R(x + w - 22, y + 14, 14, 12, '#FFE082', 2, 3) + Lc(`M${x + 6} ${y + 30}h${w - 12}`, '#EC407A', 5)).join('')) },
  { id: 'ch-zermatt.landmark.matterhorn', cat: 'landmark', file: 'ch/zermatt/landmark-matterhorn.v1.svg', name: nm('ยอดเขาแมทเทอร์ฮอร์น', 'The Matterhorn'), kw: ['matterhorn', 'แมทเทอร์ฮอร์น', 'cervino', 'mountain', 'ภูเขา', 'peak', 'ยอดเขา'], colour: true, spot: nm('หาภูเขาที่ยอดงอเหมือนตะขอ', 'Find the mountain with a crooked hooked top'),
    // the one-of-a-kind crooked pyramid peak with its snowy shoulders and a wisp of cloud flag streaming off the top
    svg: free(P('M20 220c30-30 60-110 80-200 18 20 30 50 36 70l26-16c22 40 36 90 48 146z', '#78909C') + P('M100 20c8 22 18 44 36 70l-26 16-16-24-14 18-10-10z', '#FFFFFF') + P('M162 74c10 18 18 36 24 56l-16 6-8-16-10 10z', '#FFFFFF', 3)
      + P('M106 30c30-10 60-4 80 10-24 10-56 8-80-10z', '#FFFFFF', 3) + Lc('M60 170l40-30M150 170l-20-40', '#607D8B', 3) + face(110, 160, 0.6)) },
  { id: 'ch-zermatt.landmark.gornergrat', cat: 'landmark', file: 'ch/zermatt/landmark-gornergrat.v1.svg', name: nm('หอดูดาวกอร์เนอร์กราท', 'Gornergrat observatory'), kw: ['gornergrat', 'กอร์เนอร์กราท', 'gornergrat railway', 'observatory', 'หอดูดาว', 'kulmhotel', 'glacier view'], colour: true, spot: nm('หาโดมดูดาวสองโดมบนยอดเขา', 'Find the two observatory domes on the summit'),
    // the stone summit hotel with its two white star-gazing domes, the little red train arriving below
    svg: free(P('M10 220c30-50 70-70 110-70s80 20 110 70z', '#B0BEC5') + R(70, 100, 100, 60, '#A1887F') + [70, 170].map((x) => R(x - 18, 80, 36, 40, '#A1887F') + P(`M${x - 22} 82c0-30 44-30 44 0z`, '#FFFFFF')).join('') + [90, 120, 150].map((x) => R(x - 7, 120, 14, 18, '#FFE082', 2, 3)).join('')
      + R(30, 186, 60, 26, '#D52B1E', 6) + R(36, 192, 20, 10, '#B3E5FC', 2, 3) + Lc('M10 214l100-6', INK, 3) + face(120, 146, 0.4)) },
  { id: 'ch-zermatt.landmark.chalets', cat: 'landmark', file: 'ch/zermatt/landmark-chalets.v1.svg', name: nm('บ้านไม้แชเล่ต์กับรถไฟฟ้าจิ๋ว', 'Zermatt chalets and an e-taxi'), kw: ['zermatt chalets', 'บ้านไม้แชเล่ต์', 'car-free', 'ไม่มีรถยนต์', 'electric taxi', 'รถไฟฟ้าจิ๋ว', 'hinterdorf', 'mazots'], colour: true, spot: nm('หารถไฟฟ้าคันจิ๋วในหมู่บ้านที่ไม่มีรถ', 'Find the tiny electric car in the car-free village'),
    // two sun-blackened larch chalets on stone stilts (mazots), red geraniums at the windows, a tiny boxy electric taxi
    svg: free([[30, 70, 80], [124, 50, 86]].map(([x, y, w]) => R(x, y + 30, w, 90, '#5D4037') + P(`M${x - 10} ${y + 32}l${w / 2 + 10}-34 ${w / 2 + 10} 34z`, '#455A64') + R(x + 14, y + 50, 20, 18, '#FFE082', 2, 3) + R(x + w - 34, y + 50, 20, 18, '#FFE082', 2, 3) + Lc(`M${x + 12} ${y + 74}h${w - 24}`, '#E53935', 6) + [x + 10, x + w - 18].map((sx) => R(sx, y + 120, 8, 14, '#9E9E9E', 0, 3) + E(sx + 4, y + 118, 9, 4, '#BDBDBD', 3)).join('')).join('')
      + R(80, 180, 80, 36, '#ECEFF1', 8) + R(88, 186, 30, 14, '#B3E5FC', 3, 3) + C(98, 218, 7, '#5F6B7A') + C(146, 218, 7, '#5F6B7A') + face(132, 196, 0.35)) },
];
export default {
  places: {
    ch: { country: 'ch', wave: 1, name: nm('สวิตเซอร์แลนด์', 'Switzerland'), tz: 'Europe/Zurich', alias: ['switzerland', 'สวิตเซอร์แลนด์', 'swiss', 'สวิส', 'schweiz', 'suisse'], colors: CH },
    'ch-lucerne': { country: 'ch', wave: 1, name: nm('ลูเซิร์น', 'Lucerne'), tz: 'Europe/Zurich', ll: [47.05, 8.31], alias: ['lucerne', 'luzern', 'ลูเซิร์น', 'pilatus', 'พิลาตุส', 'rigi', 'ริกิ', 'titlis', 'ทิตลิส', 'engelberg', 'vierwaldstattersee'], colors: CH },
    'ch-interlaken': { country: 'ch', wave: 1, name: nm('อินเทอร์ลาเคนและยุงเฟรา', 'Interlaken & the Jungfrau'), tz: 'Europe/Zurich', ll: [46.69, 7.86], alias: ['interlaken', 'อินเทอร์ลาเคน', 'jungfrau', 'ยุงเฟรา', 'jungfraujoch', 'grindelwald', 'กรินเดลวัลด์', 'lauterbrunnen', 'เลาเทอร์บรุนเนิน', 'wengen', 'murren', 'mürren', 'first'], colors: CH },
    'ch-zermatt': { country: 'ch', wave: 1, name: nm('เซอร์แมท', 'Zermatt'), tz: 'Europe/Zurich', ll: [46.02, 7.75], alias: ['zermatt', 'เซอร์แมท', 'matterhorn', 'แมทเทอร์ฮอร์น', 'gornergrat', 'กอร์เนอร์กราท', 'glacier paradise', 'sunnegga', 'täsch'], colors: CH },
  },
  items,
};
