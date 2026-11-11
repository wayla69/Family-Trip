// Wave 11, group nz (3 of 4): Rotorua, Taupō, Tongariro and Waitomo — the volcanic middle of the North Island: stamp, four day
// scenes and fifteen places. The steam is only scenery: no geyser, no hot pool or bath, no coloured hot spring, no cave entrance
// (the glow-worms are their ceiling seen from a boat), no carvings, no film sets, no jet boat.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#F1C9A5', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const steam = (x, y, s = 1) => g(x, y, s, Lc('M0 0c-8-10 8-18 0-28s8-18 0-28', '#FFFFFF', 6));
const RO = { k1: '#00695C', k2: '#F9A825', k3: '#E0F2F1' };
const T = 'nz/rotorua/';

const items = [
  { id: 'nz-rotorua.stamp', cat: 'stamp', file: T + 'stamp.v1.svg', name: nm('ตราประทับโรโตรัว', 'Rotorua stamp'), kw: ['rotorua', 'โรโตรัว', 'taupo', 'เทาโป', 'waitomo', 'ไวโตโม', 'lake rotorua', 'ทะเลสาบโรโตรัว'],
    // a round island in a lake with soft white steam curling up from the shore
    svg: cityStamp('rot-st', { name: 'ROTORUA', sub: 'NEW ZEALAND', ...RO, emblem: R(50, 118, 100, 22, '#4FC3F7', 0, 2) + P('M70 122c6-20 50-24 60 0z', '#43A047', 3) + ring(3, (k) => g(68 + k * 32, 114, 0.8, Lc('M0 0c-6-8 6-14 0-22s6-14 0-22', '#FFFFFF', 7) + Lc('M0 0c-6-8 6-14 0-22s6-14 0-22', INK, 1.5))) }) },
  { id: 'nz-rotorua.day.lake', cat: 'day', file: T + 'day-lake.v1.svg', name: nm('ทะเลสาบโรโตรัวกับไอน้ำอุ่นๆ', 'Steamy Lake Rotorua'), kw: ['rotorua', 'โรโตรัว', 'lake rotorua', 'ทะเลสาบโรโตรัว', 'mokoia island', 'เกาะโมโคเอีย', 'geothermal', 'ความร้อนใต้พิภพ', 'steam', 'ไอน้ำ', 'lakefront', 'ริมทะเลสาบ'],
    // a wide blue lake with the round bush-covered island in the middle, wisps of white steam drifting up from the shore, forested hills, a jetty with children
    svg: scene('rot-d1', '#B3E5FC', P('M-4 110c40-30 90-30 130-14s80-20 118-6v30H-4z', '#2E7D32') + ring(7, (k) => C(10 + k * 36, 100 - (k % 3) * 8, 14, '#388E3C', 0))
      + R(-4, 118, 248, 130, '#0288D1') + P('M70 136c10-24 80-28 100 0z', '#558B2F') + ring(3, (k) => C(96 + k * 20, 126 - (k % 2) * 4, 8, '#689F38', 2))
      + ring(4, (k) => Lc(`M${20 + k * 60} ${160 + (k % 2) * 20}c10-5 20 5 30 0`, '#B3E5FC', 3))
      + P('M-4 200c40-6 70-6 100 6v50H-4z', '#BCAAA4') + steam(20, 196) + steam(46, 190, 0.8) + steam(72, 198, 0.9)
      + R(140, 196, 110, 10, '#8D6E63', 0) + Lc('M150 206v20M190 206v20M230 206v20', '#6D4C41', 4) + kid(170, 196, '#FFCA28') + kid(196, 196, '#EF5350', 0.9)) },
  { id: 'nz-rotorua.day.taupo', cat: 'day', file: T + 'day-taupo.v1.svg', name: nm('ทะเลสาบเทาโปกับภูเขาไฟสามลูก', 'Lake Taupō and its three volcanoes'), kw: ['taupo', 'เทาโป', 'lake taupo', 'ทะเลสาบเทาโป', 'ruapehu', 'รัวเปฮู', 'ngauruhoe', 'tongariro', 'ทงการีโร', 'volcanoes', 'ภูเขาไฟ'],
    // the vast blue lake, and far away across it three volcanoes in a row — a broad snowy one, a perfect cone and a low flat one — a little yacht and the town's shore
    svg: scene('rot-d2', '#FFE0B2', P('M10 120l40-50 20 14 30-30 40 66z', '#8D6E63') + P('M40 82l10-12 20 14 10-10 8 10-12-2-10 8-10-8z', '#FFFFFF', 0) + P('M130 120l34-62 34 62z', '#6D4C41') + P('M156 72l8-14 8 14-8-4z', '#FFFFFF', 0) + P('M190 120c10-16 30-20 54-14v14z', '#795548')
      + C(164, 44, 5, '#ECEFF1', 2) + C(172, 34, 4, '#ECEFF1', 2)
      + R(-4, 120, 248, 130, '#1E88E5') + ring(4, (k) => Lc(`M${20 + k * 60} ${150 + (k % 2) * 24}c12-6 24 6 36 0`, '#BBDEFB', 3))
      + g(150, 170, 1, P('M-16 0h32l-6 8h-20z', '#FFFFFF', 2.5) + P('M0-2v-36l18 34z', '#FFCA28', 2.5))
      + P('M-4 206c60-10 160-14 248-6v60H-4z', '#E0D3B8') + ring(8, (k) => C(20 + k * 28, 222 + (k % 2) * 8, 4, '#BDBDBD', 1.5))) },
  { id: 'nz-rotorua.day.waitomo', cat: 'day', file: T + 'day-waitomo.v1.svg', name: nm('เนินเขาเขียวขจีกับหินปูนที่ไวโตโม', 'Green hills and limestone at Waitomo'), kw: ['waitomo', 'ไวโตโม', 'limestone', 'หินปูน', 'karst', 'คาสต์', 'green hills', 'เนินเขาเขียว', 'king country', 'farmland', 'ทุ่งนา'],
    // bright green rolling hills dotted with knobbly grey limestone rocks poking out of the grass, a winding country road, a little farmhouse and tall cabbage trees
    svg: scene('rot-d3', '#B3E5FC', [[30, 50], [190, 40]].map(([x, y]) => P(`M${x - 22} ${y + 8}c-8 0-8-12 2-12 2-8 14-10 18-2 6-8 22-4 20 6 8 0 8 8 0 8z`, '#FFFFFF', 3)).join('')
      + P('M-4 110c40-30 80-30 120-6s90-20 128 0v40H-4z', '#7CB342') + P('M-4 150c60-30 120-30 180-4s50-10 68-4v110H-4z', '#9CCC65') + P('M-4 200c50-20 140-20 248 0v50H-4z', '#AED581')
      + [[40, 120, 14], [86, 168, 18], [160, 196, 12], [196, 140, 16], [120, 126, 10]].map(([x, y, r]) => P(`M${x - r} ${y + 4}c-2-${r} ${r * 0.6}-${r * 1.3} ${r} -${r}s${r * 1.1} 4 ${r} ${r + 4}z`, '#BDBDBD', 3) + Lc(`M${x - r * 0.4} ${y - r * 0.4}v${r * 0.6}`, '#9E9E9E', 2)).join('')
      + Lc('M110 250c10-30 60-40 50-70s-40-30-20-60', '#FFE0B2', 10) + R(176, 92, 30, 20, '#FFFFFF', 0, 3) + P('M172 94l19-12 19 12z', '#E53935', 3)
      + [[24, 176], [64, 186]].map(([x, y]) => Lc(`M${x} ${y}v-34`, '#8D6E63', 4) + ring(5, (k) => Lc(`M${x} ${y - 34}l${(k - 2) * 7} -12`, '#558B2F', 3))).join('')) },
  { id: 'nz-rotorua.day.tongariro', cat: 'day', file: T + 'day-tongariro.v1.svg', name: nm('เดินข้ามภูเขาไฟทงการีโร', 'The Tongariro volcanic crossing'), kw: ['tongariro', 'ทงการีโร', 'tongariro crossing', 'เส้นทางข้ามทงการีโร', 'volcanic plateau', 'ที่ราบสูงภูเขาไฟ', 'ngauruhoe', 'red crater', 'tussock', 'หญ้าทัสซ็อก', 'day hike'],
    // a bare volcanic land of red, brown and black rock, the steep perfect cone of Ngauruhoe, a rusty red crater rim, golden tussock in front and tiny hikers on the trail
    svg: scene('rot-d4', '#90CAF9', P('M30 150l70-110 70 110z', '#5D4037') + P('M86 62l14-22 14 22-8-4-6 6-6-6z', '#FFFFFF', 0) + Lc('M100 40c-4-10 6-16 2-24', '#ECEFF1', 4)
      + P('M140 150c10-40 40-60 70-56 30 4 40 30 40 56z', '#C62828') + P('M176 110c10-8 30-8 40 4-12 8-30 8-40-4z', '#8D2C1F', 3) + C(214, 130, 9, '#4DD0E1', 2) + Lc('M150 120c-2-8 6-12 2-18', '#ECEFF1', 3)
      + P('M-4 150c60-14 160-16 248-4v110H-4z', '#8D6E63') + Lc('M-4 196c50-30 110-10 150-40s60-20 98-24', '#D7CCC8', 5)
      + ring(12, (k) => g(10 + k * 20, 228 - (k % 3) * 8, 1, P('M-8 6c0-12 4-20 8-22 4 2 8 10 8 22z', '#E6C27A', 2))) + kid(70, 178, '#EF5350', 0.7) + kid(96, 168, '#42A5F5', 0.65) + Lc('M76 180l6-14M102 170l6-12', INK, 1.5)) },
  L(T + 'landmark-glowworms.v1.svg', 'เพดานหนอนเรืองแสงที่ไวโตโม', 'The glow-worm ceiling at Waitomo', ['glow-worms', 'หนอนเรืองแสง', 'glowworm grotto', 'ถ้ำหนอนเรืองแสง', 'waitomo glowworm', 'ไวโตโม', 'boat ride in the dark', 'นั่งเรือในความมืด', 'starry ceiling', 'เพดานดาว'], 'หาจุดเรืองแสงสีฟ้าเขียวเต็มเพดานเหมือนดาว', 'Find the blue-green lights covering the ceiling like stars',
    // a dark rocky ceiling sparkling with hundreds of tiny blue-green glowing lights, each hanging a silky thread with beads, a small boat of children floating below on black water, looking up
    P('M0 30c40-14 200-14 240 0v130c-40-14-200-14-240 0z', '#1A237E') + P('M0 30c40-14 200-14 240 0v20c-60-10-180-10-240 0z', '#283593', 0)
      + Lc(ring(22, (k) => { const x = 14 + (k * 37) % 212, y = 40 + ((k * 23) % 60); return `M${x} ${y}v${10 + (k % 4) * 6}`; }), '#80DEEA', 1.2)
      + ring(30, (k) => { const x = 10 + (k * 29) % 220, y = 38 + ((k * 17) % 74); return C(x, y, k % 3 ? 2.6 : 3.6, '#B2FF59', 0); }).replace(/stroke="none"/g, 'stroke="none" opacity=".95"')
      + R(0, 150, 240, 70, '#0D1B2A', 0, 0) + ring(3, (k) => Lc(`M${30 + k * 70} ${190 + (k % 2) * 10}c10-4 20 4 30 0`, '#3949AB', 2.5))
      + P('M50 176h140c-8 16-20 22-70 22s-62-6-70-22z', '#8D6E63') + kid(90, 172, '#FFCA28', 0.9) + kid(120, 172, '#EF5350', 0.9) + kid(150, 172, '#42A5F5', 0.9)
      + g(120, 82, 1, face(0, 0, 0.4).replace(/fill="#22213A"/g, 'fill="#B2FF59"'))),
  L(T + 'landmark-zorb.v1.svg', 'กลิ้งลงเนินในลูกบอลยักษ์', 'Rolling downhill in a giant ball', ['zorb', 'ซอร์บ', 'ogo', 'giant ball', 'ลูกบอลยักษ์', 'rolling downhill', 'กลิ้งลงเนิน', 'water ball', 'บอลน้ำ', 'adventure park', 'สวนผจญภัย'], 'หาลูกบอลใสยักษ์ที่มีเด็กกลิ้งอยู่ข้างใน', 'Find the giant see-through ball rolling down the hill with a child inside',
    // a huge clear inflatable ball with an inner ball, a laughing child sliding about inside with a splash of water, rolling down a green hill along a curving track
    P('M-4 90c60 10 120 60 248 90v50H-4z', '#7CB342') + Lc('M-4 110c70 10 130 60 248 90', '#AED581', 10)
      + C(110, 110, 70, '#E1F5FE') + C(110, 110, 70, 'none') + C(110, 110, 52, 'none', 2.5) + ring(10, (k) => { const a = (k / 10) * Math.PI * 2; return Lc(`M${(110 + Math.cos(a) * 52).toFixed(1)} ${(110 + Math.sin(a) * 52).toFixed(1)}L${(110 + Math.cos(a) * 70).toFixed(1)} ${(110 + Math.sin(a) * 70).toFixed(1)}`, '#81D4FA', 2); })
      + P('M70 140c20 10 60 10 80 0-4 16-20 22-40 22s-36-6-40-22z', '#4FC3F7', 2) + g(110, 128, 1.2, C(0, -20, 10, '#F1C9A5', 2) + P('M-10 6v-16h20v16z', '#FF7043', 2) + Lc('M-10-6l-14-14M10-6l14-14', '#F1C9A5', 4) + face(0, -20, 0.28, 'o'))
      + Lc('M76 66c10-14 30-20 50-18', '#FFFFFF', 4) + ring(4, (k) => C(186 + k * 8, 170 + (k % 2) * 8, 3, '#4FC3F7', 1.5))),
  L(T + 'landmark-holeinone.v1.svg', 'ตีกอล์ฟลงหลุมกลางทะเลสาบเทาโป', 'The hole-in-one challenge on Lake Taupō', ['hole in one', 'โฮลอินวัน', 'lake taupo golf', 'กอล์ฟทะเลสาบเทาโป', 'floating green', 'กรีนลอยน้ำ', 'golf challenge', 'ท้าตีกอล์ฟ', 'lakefront', 'ริมทะเลสาบ'], 'หาสนามหญ้าเล็กๆ ที่มีธงลอยอยู่กลางทะเลสาบ', 'Find the little patch of grass with a flag floating in the lake',
    // a small round floating pontoon of green grass with a red flag in its hole out on a blue lake, a child on the shore swinging a golf club, the ball arcing over the water
    R(-4, 80, 248, 120, '#29B6F6', 0, 0) + P('M-4 80c40-16 70-20 110-14s70-16 138-6v20H-4z', '#78909C') + ring(4, (k) => Lc(`M${20 + k * 60} ${120 + (k % 2) * 30}c10-5 20 5 30 0`, '#E1F5FE', 3))
      + E(170, 122, 50, 14, '#8D6E63') + E(170, 116, 50, 14, '#66BB6A') + E(176, 116, 6, 3, INK) + Lc('M176 116V70', INK, 3) + P('M176 70l26 8-26 8z', '#EF5350')
      + P('M-4 190c60-10 140-10 248 0v40H-4z', '#9CCC65') + R(30, 186, 40, 8, '#FFFFFF', 2, 2)
      + g(56, 186, 1.2, C(0, -26, 9, '#F1C9A5', 2) + P('M-9 0v-18h18v18z', '#42A5F5', 2) + Lc('M-6 0v10M6 0v10', INK, 3) + Lc('M6-14l24-22', '#90A4AE', 3) + face(0, -26, 0.25))
      + Lc('M92 150c30-60 60-70 80-40', '#FFFFFF', 2).replace('stroke-width="2"', 'stroke-width="2" stroke-dasharray="4 6"') + C(92, 150, 5, '#FFFFFF', 2) + face(170, 112, 0.3)),
  L(T + 'landmark-shweeb.v1.svg', 'แข่งปั่นจักรยานรางเดี่ยวลอยฟ้า', 'Pedal racing pods on a monorail', ['shweeb', 'ชวีบ', 'pedal monorail', 'โมโนเรลปั่นเอง', 'velocity valley', 'เวโลซิตีวัลลีย์', 'racing pods', 'แคปซูลแข่ง', 'adventure park', 'สวนผจญภัย'], 'หาแคปซูลใสห้อยจากรางที่มีคนนอนปั่นอยู่ข้างใน', 'Find the clear pods hanging from a rail with someone lying inside pedalling',
    // two clear egg-shaped pods hanging from a pair of overhead rails on tall posts, each with a rider lying back pedalling hard, racing each other over the grass
    R(-4, 196, 248, 40, '#9CCC65', 0, 0) + [24, 216].map((x) => R(x - 6, 40, 12, 166, '#90A4AE', 2) + P(`M${x - 14} 40h28v-10h-28z`, '#78909C')).join('')
      + Lc('M10 46h220M10 92h220', '#546E7A', 6)
      + [[90, 46, '#FF7043'], [150, 92, '#42A5F5']].map(([x, y, c]) => Lc(`M${x} ${y}v12`, INK, 3) + R(x - 10, y + 8, 20, 8, c, 2, 2) + E(x, y + 44, 44, 26, '#E1F5FE') + Lc(`M${x - 30} ${y + 44}c10-14 50-14 60 0`, '#B3E5FC', 3)
        + g(x, y + 48, 1, C(-24, -6, 7, '#F1C9A5', 2) + Lc('M-18-4l20 6l12-8M2 2l12 6', c, 5) + C(14, 6, 6, 'none', 2) + face(-24, -6, 0.18)) + E(x, y + 44, 44, 26, 'none')).join('')
      + Lc('M30 154l-14-4M30 162l-16 2', '#FFFFFF', 3)),
  L(T + 'landmark-falcon.v1.svg', 'นกเหยี่ยวคาเรียเรีย', 'A kārearea, the New Zealand falcon', ['karearea', 'คาเรียเรีย', 'kārearea', 'new zealand falcon', 'เหยี่ยวนิวซีแลนด์', 'bird of prey', 'นกล่าเหยื่อ', 'falconry show', 'โชว์เหยี่ยว', 'wingspan'], 'หาเหยี่ยวลายจุดเกาะบนถุงมือหนัง', 'Find the speckled falcon perched on a thick leather glove',
    // a small fierce-looking but friendly brown falcon with a streaked cream chest, yellow feet and a yellow ring round its eye, perched on a thick leather falconry glove
    P('M40 230c10-40 40-60 70-62h60c10 0 16 6 14 16-6 30-30 46-60 46z', '#A1673F') + Lc('M80 196c20-4 50-6 80-4', '#8D5524', 3)
      + P('M90 170c-20-30-16-80 20-100 36-20 70 6 70 40 0 30-20 60-50 62z', '#5D4037') + P('M110 160c-10-20-8-50 10-62 22 6 32 36 26 62z', '#FFF3E0', 2.5)
      + ring(8, (k) => P(`M${116 + (k % 3) * 10} ${110 + Math.floor(k / 3) * 14}l3 6-3 4-3-4z`, '#8D6E63', 0)) + P('M150 90c20 20 30 50 20 80l-20-10z', '#4E342E')
      + C(132, 66, 28, '#5D4037') + E(116, 72, 10, 10, '#FFF3E0', 0)
      + P('M106 66c-10 2-14 8-14 14 6-2 12-6 14-10z', '#37474F', 2.5) + E(110, 64, 6, 4, '#FFCA28', 2)
      + [[120, 168], [140, 168]].map(([x, y]) => Lc(`M${x} ${y}v14M${x - 6} ${y + 16}l6-4 6 4`, '#FFCA28', 4)).join('') + face(130, 62, 0.5, 'none')),
  L(T + 'landmark-prawnpark.v1.svg', 'ตกกุ้งในบ่อน้ำอุ่นที่ฮูกา', 'Prawn fishing at Huka Prawn Park', ['prawn fishing', 'ตกกุ้ง', 'huka prawn park', 'ฟาร์มกุ้งฮูกา', 'prawn farm', 'ฟาร์มกุ้ง', 'kids fishing', 'เด็กตกกุ้ง', 'wairakei', 'ไวราเคอี'], 'หาเด็กถือคันเบ็ดเล็กๆ ที่มีกุ้งตัวโตติดขึ้นมา', 'Find the child with a little rod pulling up a big prawn',
    // a warm green pond edged with a wooden rail, two children holding short bamboo rods, one pulling up a big curly prawn that smiles, wisps of warm mist on the water
    R(-4, 120, 248, 110, '#4DB6AC', 0, 0) + ring(4, (k) => Lc(`M${20 + k * 60} ${160 + (k % 2) * 30}c10-5 20 5 30 0`, '#B2DFDB', 3)) + steam(200, 150, 0.6) + steam(30, 200, 0.6)
      + R(-4, 110, 248, 12, '#A1887F', 0) + Lc('M20 110V70M110 110V70M200 110V70M-4 80h248', '#8D6E63', 6)
      + kid(60, 70, '#FFCA28', 1.1) + kid(150, 70, '#EF5350', 1.1) + Lc('M66 56l44-30M156 56l40-26', '#D7A86E', 4) + Lc('M110 26v120M196 30v100', '#FFFFFF', 1.5)
      + g(110, 168, 1, P('M-20-10c10-16 36-16 44 0 6 14-4 30-20 34-10 2-20-2-24-10 8 2 16 0 18-6-10 0-18-8-18-18z', '#FF8A65') + ring(3, (k) => Lc(`M${-8 + k * 8}-10c2 6 2 12 0 18`, '#E64A19', 2)) + Lc('M-18-8l-14-14M-16-12l-8-18', '#E64A19', 2) + face(4, -2, 0.3))),
  L(T + 'landmark-croquet.v1.svg', 'สนามโครเกต์ในสวนราชการโรโตรัว', 'Croquet on the lawns of the Government Gardens', ['croquet', 'โครเกต์', 'government gardens', 'สวนราชการ', 'rotorua museum', 'พิพิธภัณฑ์โรโตรัว', 'tudor building', 'อาคารสไตล์ทิวดอร์', 'lawn games', 'เกมสนามหญ้า'], 'หาห่วงเหล็กเล็กๆ กับลูกบอลสีๆ บนสนามหญ้า', 'Find the little hoops and the coloured balls on the lawn',
    // a smooth striped lawn with white wire hoops, a bright red, blue, black and yellow ball and a wooden mallet, a grand half-timbered building with red roofs behind
    R(20, 40, 200, 80, '#FFF8E1') + P('M14 44l30-30 30 30zM90 44l30-36 30 36zM166 44l30-30 30 30z', '#C62828') + ring(10, (k) => Lc(`M${28 + k * 20} 44v76`, '#5D4037', 3)) + Lc('M20 80h200', '#5D4037', 3)
      + ring(5, (k) => R(32 + k * 40, 56, 14, 18, '#B3E5FC', 1, 2)) + R(110, 92, 20, 28, '#5D4037', 2)
      + R(-4, 120, 248, 110, '#7CB342', 0, 0) + ring(5, (k) => R(-4 + k * 50, 120, 25, 110, '#8BC34A', 0, 0))
      + [[60, 170], [150, 150], [196, 196]].map(([x, y]) => P(`M${x - 10} ${y + 6}v-16c0-8 20-8 20 0v16`, 'none', 3)).join('').replace(/stroke-width="3"/g, 'stroke="#FFFFFF" stroke-width="4"')
      + [[80, 190, '#EF5350'], [120, 172, '#1E88E5'], [168, 200, '#212121'], [40, 206, '#FFCA28']].map(([x, y, c]) => C(x, y, 9, c, 2.5)).join('')
      + g(110, 210, 1, R(-30, -6, 30, 12, '#A1673F', 3) + Lc('M-15 0l50-40', '#D7A86E', 5), 0) + face(80, 190, 0.2)),
  L(T + 'landmark-mtb.v1.svg', 'ปั่นจักรยานเสือภูเขาในป่าเฟิร์น', 'Mountain biking through the fern forest', ['mountain biking', 'จักรยานเสือภูเขา', 'whakarewarewa forest', 'ป่าวาการีวารีวา', 'bike trails', 'เส้นทางจักรยาน', 'tree ferns', 'เฟิร์นต้น', 'kids bike park', 'ลานจักรยานเด็ก'], 'หาเด็กปั่นจักรยานเลี้ยวโค้งดินผ่านต้นเฟิร์น', 'Find the child on a bike swooping round a dirt bend between the ferns',
    // a child in a helmet on a little mountain bike leaning round a banked dirt bend, tree ferns with umbrella crowns and tall straight trunks around
    ring(4, (k) => R(14 + k * 64, -4, 16, 200, '#8D5524', 0, 3)) + [[50, 110], [200, 70]].map(([x, y]) => Lc(`M${x} ${y + 90}v-90`, '#5D4037', 6) + ring(7, (k) => g(x, y, 1, P('M0 0c10-6 30-6 44 6-16-2-30 0-44-6z', '#43A047', 2), k * 51))).join('')
      + P('M-4 220c40-60 120-80 248-60v70H-4z', '#A1673F') + Lc('M-4 214c50-56 130-70 248-52', '#C8862F', 6)
      + g(130, 168, 1, C(-22, 16, 16, 'none', 4) + C(26, 16, 16, 'none', 4) + Lc('M-22 16l18-26h26l8 26M-4-10l-4 26h30', '#EF5350', 4) + C(0, -36, 10, '#F1C9A5', 2) + P('M-12-40c0-14 24-14 24 0z', '#42A5F5', 2.5) + P('M-8-26l6 18h10', 'none', 4) + face(0, -34, 0.22), -12)
      + ring(3, (k) => C(60 - k * 14, 190 + k * 6, 3, '#D7A86E', 1.5))),
  L(T + 'landmark-pumice.v1.svg', 'หินพัมมิซลอยน้ำที่ทะเลสาบเทาโป', 'Floating pumice stones on Lake Taupō', ['pumice', 'หินพัมมิซ', 'floating stones', 'หินลอยน้ำ', 'lake taupo', 'ทะเลสาบเทาโป', 'volcanic rock', 'หินภูเขาไฟ', 'beach play', 'เล่นริมหาด'], 'หาก้อนหินพรุนๆ ที่ลอยอยู่บนน้ำได้', 'Find the holey stones that float on the water',
    // light grey holey pumice stones bobbing on the blue lake with little ripples round them, a child on the pebbly shore holding one up in surprise
    R(-4, 40, 248, 150, '#4FC3F7', 0, 0) + [[80, 100, 36, 22], [160, 80, 20, 13], [180, 140, 24, 15], [40, 160, 18, 11]].map(([x, y, rx, ry]) => E(x, y + ry * 0.4, rx + 12, ry * 0.6, 'none', 2.5).replace('fill="none"', 'fill="none" stroke="#B3E5FC"') + E(x, y, rx, ry, '#CFD8DC') + ring(6, (k) => C(x - rx * 0.6 + (k % 3) * rx * 0.6, y - ry * 0.3 + Math.floor(k / 3) * ry * 0.5, rx / 9, '#90A4AE', 0))).join('')
      + P('M-4 190c60-10 140-10 248 0v40H-4z', '#BDBDBD') + ring(9, (k) => C(16 + k * 26, 206 + (k % 2) * 8, 5, ['#9E9E9E', '#E0E0E0', '#757575'][k % 3], 1.5))
      + kid(200, 196, '#AB47BC', 1.1) + E(214, 160, 10, 7, '#CFD8DC', 2) + face(80, 98, 0.45)),
  L(T + 'landmark-kiwiegg.v1.svg', 'ลูกนกกีวีฟักจากไข่ใบโต', 'A kiwi chick hatching from its big egg', ['kiwi hatchery', 'ศูนย์ฟักไข่กีวี', 'kiwi chick', 'ลูกนกกีวี', 'kiwi egg', 'ไข่นกกีวี', 'rainbow springs', 'เรนโบว์สปริงส์', 'wildlife park', 'conservation'], 'หาลูกนกกีวีขนฟูที่โผล่ออกมาจากไข่ใบใหญ่', 'Find the fluffy kiwi chick poking out of its huge egg',
    // a huge white egg cracked open in a soft nest of straw, a fluffy brown kiwi chick with a long little beak peeping out, a warm lamp glowing above
    Lc('M120 10v26', INK, 3) + P('M96 36h48l10 18H86z', '#FFCA28') + P('M100 54l-20 40h80l-20-40z', '#FFF59D', 0).replace('fill="#FFF59D"', 'fill="#FFF59D" opacity=".6"')
      + E(120, 200, 90, 20, '#E6C27A') + ring(9, (k) => Lc(`M${40 + k * 20} ${196 + (k % 2) * 6}l14-10`, '#C8A050', 3))
      + P('M60 190c-6-60 20-100 60-100s66 40 60 100z', '#FFFFFF') + P('M62 150l14-10 12 12 14-12 14 12 14-12 14 12 14-12 14 10', 'none', 3)
      + C(120, 132, 32, '#A1887F') + ring(10, (k) => { const a = Math.PI * (1.05 + k * 0.1); return Lc(`M${(120 + Math.cos(a) * 32).toFixed(1)} ${(132 + Math.sin(a) * 32).toFixed(1)}l${(Math.cos(a) * 8).toFixed(1)} ${(Math.sin(a) * 8).toFixed(1)}`, '#8D6E63', 3); })
      + Lc('M98 140c-14 6-24 18-30 34', INK, 9) + Lc('M98 140c-14 6-24 18-30 34', '#E6C27A', 5) + face(124, 128, 0.55)),
  L(T + 'landmark-planemotel.v1.svg', 'นอนในเครื่องบินเก่าที่ไวโตโม', 'A night in an old plane at Waitomo', ['plane motel', 'โมเต็ลเครื่องบิน', 'sleep in a plane', 'นอนในเครื่องบิน', 'woodlyn park', 'วูดลินพาร์ก', 'quirky stay', 'ที่พักแปลกๆ', 'waitomo', 'ไวโตโม'], 'หาเครื่องบินใบพัดเก่าที่มีบันไดกับกระถางดอกไม้', 'Find the old propeller plane with steps and flower pots at the door',
    // an old silver propeller cargo plane resting on the grass, turned into a cosy room: curtains in its round windows, steps up to an open door, flower pots and a little lamp
    E(120, 210, 110, 14, '#9CCC65', 0) + P('M20 140c0-20 20-30 50-30h120c20 0 34 10 40 30-10 14-30 20-50 20H50c-20 0-30-8-30-20z', '#CFD8DC')
      + P('M170 114l30-40h16l-10 40z', '#B0BEC5') + P('M70 140l-20 50h24l30-50z', '#B0BEC5')
      + Lc('M30 122l-14-14M30 122l-16 4', '#90A4AE', 4) + E(36, 126, 10, 18, '#90A4AE')
      + ring(5, (k) => C(84 + k * 22, 128, 7, '#FFF59D', 2.5) + Lc(`M${78 + k * 22} 124l6 8 6-8`, '#EF5350', 2)) + R(186, 124, 18, 30, '#8D6E63', 2) + C(200, 140, 2, '#FFCA28', 0)
      + ring(4, (k) => R(176 - k * 2, 160 + k * 10, 26 + k * 4, 6, '#A1887F', 1, 2)) + [[160, 196, '#EF5350'], [228, 196, '#FFCA28']].map(([x, y, c]) => P(`M${x - 8} ${y}l2 14h12l2-14z`, '#C1694F', 2) + C(x, y - 4, 6, c, 2)).join('')
      + [[70, 184], [150, 184]].map(([x, y]) => C(x, y, 9, INK) + C(x, y, 3, '#B0BEC5', 0)).join('') + face(60, 130, 0.35)),
  L(T + 'landmark-weta.v1.svg', 'แมลงเวตายักษ์', 'A giant wētā', ['weta', 'เวตา', 'wētā', 'giant weta', 'แมลงเวตายักษ์', 'night walk', 'เดินป่ากลางคืน', 'insect', 'แมลง', 'native bug', 'แมลงพื้นเมือง'], 'หาแมลงตัวโตขาหนามหนวดยาวบนต้นไม้', 'Find the big bug with spiky legs and long feelers on the tree',
    // a big chunky brown wētā on a tree trunk, its shiny banded body, long spiky back legs, two very long curling feelers and a friendly face
    R(150, -4, 70, 248, '#795548', 0, 0) + ring(5, (k) => Lc(`M${160 + (k % 2) * 30} ${20 + k * 44}c4 10 4 20 0 30`, '#5D4037', 3))
      + Lc('M60 96c-30-30-40-60-20-80M70 92c-10-40 0-70 30-80', '#6D4C41', 3)
      + [[110, 150, 60, 200], [140, 150, 160, 210], [90, 140, 40, 176]].map(([a, b, c, d]) => Lc(`M${a} ${b}L${(a + c) / 2} ${b - 20}L${c} ${d}`, '#8D6E63', 6) + ring(3, (k) => Lc(`M${(a + c) / 2 + (c - a) * k * 0.15} ${b - 20 + (d - b + 20) * k * 0.3}l6-4`, INK, 2))).join('')
      + E(120, 130, 60, 32, '#A1673F') + ring(4, (k) => Lc(`M${84 + k * 20} 102c-4 18-4 38 0 56`, '#8D5524', 3)) + C(70, 112, 24, '#8D5524')
      + Lc('M80 152l-10 26M100 156l0 26', '#8D6E63', 4) + face(66, 110, 0.5)),
  L(T + 'landmark-flax.v1.svg', 'ต้นแฟลกซ์ฮาราเกเกกับตะกร้าสาน', 'Harakeke flax and a woven basket', ['harakeke', 'ฮาราเกเก', 'flax', 'ต้นแฟลกซ์', 'flax weaving', 'งานสานแฟลกซ์', 'kete basket', 'ตะกร้าเคเต', 'craft workshop', 'เวิร์กช็อปงานฝีมือ'], 'หาต้นใบยาวเหมือนดาบกับตะกร้าสานใบเล็ก', 'Find the plant with long sword-like leaves and the little woven basket',
    // a big flax bush with long stiff sword-shaped leaves fanning upward, a tall dark stalk of red flowers, and in front a small woven kete basket with two handles
    ring(9, (k) => { const a = -160 + k * 17.5; return g(90, 200, 1, P('M-6 0c-4-60 0-110 6-150 6 40 10 90 6 150z', k % 2 ? '#558B2F' : '#689F38', 2.5), a + 90); })
      + Lc('M100 200c4-60 6-110 20-170', '#4E342E', 4) + ring(5, (k) => P(`M${112 + k * 2} ${60 + k * 20}c10-6 20-4 22 4-10 4-18 2-22-4z`, '#C62828', 2))
      + g(170, 190, 1, P('M-36-30h72l-8 44h-56z', '#C8A050') + Lc('M-34-18h68M-32-4h64M-30 8h60', '#A1803C', 3) + ring(6, (k) => Lc(`M${-28 + k * 11}-30l-2 42`, '#A1803C', 2)) + Lc('M-22-30c0-26 14-26 14 0M8-30c0-26 14-26 14 0', '#A1803C', 4) + face(0, -10, 0.35))
      + E(120, 214, 104, 10, '#9CCC65', 0)),
  L(T + 'landmark-kiwisign.v1.svg', 'ป้ายระวังนกกีวีข้ามถนน', 'A kiwi-crossing road sign', ['kiwi crossing', 'ป้ายนกกีวีข้าม', 'road sign', 'ป้ายจราจร', 'forest road', 'ถนนในป่า', 'night drive', 'ขับรถกลางคืน', 'kiwi country', 'road trip'], 'หาป้ายสีเหลืองรูปนกกีวีริมถนน', 'Find the yellow road sign with a kiwi on it',
    // a yellow diamond road sign on a post showing a black kiwi silhouette, beside a forest road at night under the moon, a real little kiwi trotting across
    R(-4, -4, 248, 248, '#283593', 0, 0) + C(196, 46, 18, '#FFF59D', 2.5) + ring(5, (k) => C(20 + k * 40, 30 + (k % 2) * 20, 2, '#FFFFFF', 0))
      + ring(5, (k) => P(`M${-10 + k * 50} 170l24-80 24 80z`, '#1B5E20')) + P('M-4 170h248v70H-4z', '#455A64') + Lc('M-4 204h248', '#FFF59D', 3).replace('stroke-width="3"', 'stroke-width="3" stroke-dasharray="16 12"')
      + Lc('M80 196V100', '#B0BEC5', 6) + g(80, 80, 1, P('M0-46l46 46-46 46-46-46z', '#FFCA28') + P('M0-40l40 40-40 40-40-40z', 'none', 2.5) + E(4, 6, 18, 14, INK, 0) + Lc('M-12 4c-8 4-12 12-14 20', INK, 3) + Lc('M0 18l-2 10M8 18l2 10', INK, 2.5))
      + g(170, 196, 1, E(0, 0, 20, 16, '#A1887F') + Lc('M-18 2c-8 4-12 12-14 20', '#E6C27A', 4) + Lc('M-4 14v10M6 14v10', '#BCAAA4', 3) + face(-6, -4, 0.3))),
  L(T + 'landmark-princesgate.v1.svg', 'ซุ้มประตูพรินซ์สเกตโรโตรัว', 'The Princes Gate arches', ['princes gate', 'ซุ้มประตูพรินซ์สเกต', 'government gardens', 'สวนราชการ', 'rotorua gardens', 'สวนโรโตรัว', 'archway', 'ซุ้มประตู', 'flower beds', 'แปลงดอกไม้'], 'หาซุ้มประตูสีขาวที่มียอดโดมเล็กๆ', 'Find the white gateway with little domes on top',
    // a pretty old white-and-teal gateway of two arches with ornate little turrets and domes on top, a path running through to the gardens, bright flower beds on each side
    P('M30 206V90h180v116h-30v-60c0-24-40-24-40 0v60h-40v-60c0-24-40-24-40 0v60z', '#FFFFFF') + Lc('M30 120h180', '#26A69A', 4)
      + [30, 120, 210].map((x) => R(x - 12, 60, 24, 34, '#E0F2F1') + P(`M${x - 14} 60c0-22 28-22 28 0z`, '#26A69A') + Lc(`M${x} 38v-10`, INK, 2.5) + C(x, 26, 3, '#FFCA28', 1.5)).join('')
      + ring(8, (k) => R(42 + k * 20, 100, 8, 12, '#B2DFDB', 2, 2)) + P('M100 206l-10 24h60l-10-24z', '#E0D3B8')
      + [[20, 214], [214, 214]].map(([x, y]) => E(x, y, 22, 10, '#66BB6A') + ring(5, (k) => C(x - 14 + k * 7, y - 4 - (k % 2) * 4, 4, ['#EF5350', '#FFCA28', '#AB47BC'][k % 3], 1.5))).join('') + face(120, 112, 0.3)),
];

export default {
  places: {
    'nz-rotorua': { country: 'nz', wave: 3, name: nm('โรโตรัว เทาโป และไวโตโม', 'Rotorua, Taupō and Waitomo'), tz: 'Pacific/Auckland', ll: [-38.14, 176.25], alias: ['rotorua', 'โรโตรัว', 'ROT', 'waitomo', 'ไวโตโม', 'taupo', 'เทาโป', 'taupō', 'tongariro', 'ทงการีโร', 'TUO'], colors: RO },
  },
  items,
};
