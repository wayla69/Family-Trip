// Wave 11, group nz (4 of 4): Queenstown, Wānaka, Arrowtown, Tekapo and Milford Sound — the southern lakes and Fiordland:
// stamp, two day scenes and seventeen places. No gondola, no skiing, no glacier, no jet boat, no lupins, no paraglider,
// no gold panning (all already in the library); the Kawarau bungy is drawn as the jump, not as a suspension bridge.
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${cc}-${city}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#F1C9A5', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
// a jagged snowy range: a list of [x, y] peaks between the two ends (base y)
const range = (pts, base, rock, snow) => P(`M${pts[0][0]} ${base}` + pts.map(([x, y]) => `L${x} ${y}`).join('') + `L${pts[pts.length - 1][0]} ${base}z`, rock)
  + pts.slice(1, -1).map(([x, y]) => P(`M${x - 9} ${y + 14}L${x} ${y}L${x + 9} ${y + 14}l-5-3-4 4-4-4z`, snow, 0)).join('');
const QT = { k1: '#5E35B1', k2: '#F57C00', k3: '#EDE7F6' };
const T = 'nz/queenstown/';

const items = [
  { id: 'nz-queenstown.stamp', cat: 'stamp', file: T + 'stamp.v1.svg', name: nm('ตราประทับควีนส์ทาวน์', 'Queenstown stamp'), kw: ['queenstown', 'ควีนส์ทาวน์', 'milford sound', 'มิลฟอร์ดซาวด์', 'wanaka', 'วานาคา', 'lake wakatipu', 'ทะเลสาบวากาติปู'],
    // a saw-toothed snowy mountain ridge over a deep blue lake
    svg: cityStamp('zqn-st', { name: 'QUEENSTOWN', sub: 'NEW ZEALAND', ...QT, emblem: range([[48, 118], [62, 80], [74, 96], [88, 66], [102, 90], [116, 70], [132, 94], [152, 118]], 118, '#7E57C2', '#FFFFFF') + R(48, 118, 104, 18, '#1E88E5', 0, 2.5) + Lc('M60 128c8-3 16 3 24 0M104 128c8-3 16 3 24 0', '#BBDEFB', 2) }) },
  { id: 'nz-queenstown.day.lake', cat: 'day', file: T + 'day-lake.v1.svg', name: nm('ควีนส์ทาวน์ริมทะเลสาบวากาติปู', 'Queenstown on Lake Wakatipu'), kw: ['queenstown', 'ควีนส์ทาวน์', 'lake wakatipu', 'ทะเลสาบวากาติปู', 'queenstown bay', 'อ่าวควีนส์ทาวน์', 'lakefront', 'ริมทะเลสาบ', 'mountains', 'ภูเขา', 'southern alps'],
    // a deep blue lake curving between steep mountains, the little lakeside town of red and white roofs on the shore, a pine tree and children on the pebbly beach
    svg: scene('zqn-d1', '#BBDEFB', range([[-4, 120], [20, 70], [44, 96], [70, 54], [96, 92], [124, 64], [150, 98], [176, 60], [204, 90], [226, 66], [244, 120]], 124, '#7E57C2', '#FFFFFF')
      + P('M-4 116c40 0 80 6 120 10v20H-4z', '#689F38') + R(-4, 130, 248, 120, '#1565C0') + ring(4, (k) => Lc(`M${30 + k * 56} ${156 + (k % 2) * 22}c10-5 20 5 30 0`, '#90CAF9', 3))
      + P('M-4 176c40-14 80-14 112 0v74H-4z', '#8BC34A') + ring(6, (k) => R(6 + k * 16, 150 - (k % 2) * 6, 14, 14, '#FFFFFF', 1, 2.5) + P(`M${4 + k * 16} ${150 - (k % 2) * 6}l9-8 9 8z`, k % 2 ? '#E53935' : '#546E7A', 2)).replace(/^/, '')
      + P('M120 210c40-10 90-12 124-4v44H120z', '#D7CCC8') + Lc('M210 210v-40', '#5D4037', 5) + P('M196 186l14-30 14 30z', '#2E7D32') + P('M198 172l12-26 12 26z', '#388E3C')
      + kid(150, 216, '#FFCA28') + kid(176, 214, '#EF5350', 0.9)) },
  { id: 'nz-queenstown.day.milford', cat: 'day', file: T + 'day-milford.v1.svg', name: nm('ยอดเขาไมเทอร์ที่มิลฟอร์ดซาวด์', 'Mitre Peak at Milford Sound'), kw: ['milford sound', 'มิลฟอร์ดซาวด์', 'mitre peak', 'ยอดเขาไมเทอร์', 'fiordland', 'ฟยอร์ดแลนด์', 'piopiotahi', 'fiord', 'ฟยอร์ด', 'milford road'],
    // the sharp, pointed peak rising straight out of a dark green fiord, sheer bush-clad cliffs on both sides, mist drifting, a rainbow over the water
    svg: scene('zqn-d2', '#CFD8DC', P('M70 170l50-150 20 40 40 110z', '#455A64') + P('M110 50l10-30 8 18-6-2z', '#FFFFFF', 0) + Lc('M100 110l20-40', '#607D8B', 3)
      + P('M-4 40c30 0 50 60 60 130H-4z', '#2E7D32') + P('M244 50c-30 10-40 70-50 120h50z', '#1B5E20') + ring(5, (k) => C(6 + k * 10, 80 + k * 18, 9, '#388E3C', 0)) + ring(5, (k) => C(234 - k * 8, 90 + k * 16, 9, '#2E7D32', 0))
      + Lc('M30 160c30-80 150-80 180 0', '#EF5350', 4) + Lc('M36 162c28-72 140-72 168 0', '#FFCA28', 4) + Lc('M42 164c26-64 130-64 156 0', '#42A5F5', 4)
      + P('M40 90c10-8 40-8 50 2-16 4-34 4-50-2z', '#FFFFFF', 2.5) + P('M150 120c10-8 40-8 50 2-16 4-34 4-50-2z', '#FFFFFF', 2.5)
      + R(-4, 168, 248, 80, '#00695C') + ring(4, (k) => Lc(`M${20 + k * 60} ${190 + (k % 2) * 20}c10-5 20 5 30 0`, '#4DB6AC', 3)) + P('M84 172l36-4 32 4-34 30z', '#004D40', 0)) },
  L(T + 'landmark-earnslaw.v1.svg', 'เรือกลไฟโบราณทีเอสเอส เอิร์นสลอว์', 'The TSS Earnslaw steamship', ['tss earnslaw', 'เรือกลไฟเอิร์นสลอว์', 'earnslaw', 'vintage steamship', 'เรือกลไฟโบราณ', 'lake wakatipu cruise', 'ล่องทะเลสาบวากาติปู', 'walter peak', 'วอลเตอร์พีก', 'coal steamer'], 'หาเรือกลไฟลำยาวที่มีปล่องควันสีแดง', 'Find the long old steamship with a tall red funnel puffing smoke',
    // a long, elegant old lake steamer with a black hull, white decks and cabins, a tall red funnel with a black top puffing dark smoke clouds, sailing past mountains
    range([[0, 110], [30, 60], [60, 90], [96, 50], [130, 86], [170, 56], [210, 84], [240, 110]], 112, '#9575CD', '#FFFFFF')
      + R(-4, 140, 248, 86, '#1565C0', 0, 0) + ring(5, (k) => Lc(`M${6 + k * 48} ${190 + (k % 2) * 14}c8-5 16 5 24 0`, '#90CAF9', 3))
      + P('M14 150h212l-18 28H34z', '#263238') + Lc('M20 158h200', '#E53935', 3) + R(40, 126, 160, 24, '#FFFFFF') + R(70, 108, 100, 18, '#FFFFFF')
      + ring(8, (k) => C(52 + k * 20, 138, 4, '#B3E5FC', 2)) + ring(5, (k) => R(78 + k * 18, 112, 10, 8, '#B3E5FC', 1, 2))
      + R(110, 60, 20, 48, '#E53935') + R(108, 54, 24, 10, INK, 2) + [[120, 40, 12], [104, 26, 10], [86, 16, 8]].map(([x, y, r]) => C(x, y, r, '#546E7A', 2.5)).join('')
      + Lc('M30 150l-14-30M210 150l14-34', INK, 2) + face(120, 140, 0.4)),
  L(T + 'landmark-bungy.v1.svg', 'กระโดดบันจี้จัมป์ที่หุบเขาคาวาเรา', 'A bungy jump over the Kawarau River', ['bungy jump', 'บันจี้จัมป์', 'kawarau bridge', 'สะพานคาวาเรา', 'kawarau gorge', 'หุบเขาคาวาเรา', 'bungy', 'adventure capital', 'เมืองหลวงแห่งการผจญภัย', 'river'], 'หาคนที่ห้อยหัวลงมาด้วยเชือกยืดเหนือแม่น้ำ', 'Find the jumper hanging upside down on a stretchy cord over the river',
    // a jumper in a bright suit springing upside down on a long stretchy cord over a turquoise river at the bottom of a rocky gorge, an old timber deck edge at the top with people cheering
    P('M-4 -4h60c-10 60 0 150-10 250H-4z', '#A1887F') + P('M244 -4h-60c14 60 0 160 10 250h50z', '#8D6E63') + ring(5, (k) => Lc(`M${10 + (k % 2) * 20} ${30 + k * 40}l16 6`, '#6D4C41', 3)) + ring(5, (k) => Lc(`M${200 + (k % 2) * 20} ${40 + k * 40}l16-6`, '#5D4037', 3))
      + R(46, 20, 150, 14, '#8D6E63', 2) + ring(6, (k) => Lc(`M${56 + k * 26} 34v-10`, '#6D4C41', 3)) + kid(80, 18, '#FFCA28', 0.8) + kid(170, 18, '#42A5F5', 0.8)
      + P('M50 200c30-6 110-6 150 0v40H50z', '#26C6DA') + Lc('M70 214c10-5 20 5 30 0M140 220c10-5 20 5 30 0', '#E0F7FA', 3)
      + Lc('M122 34c-4 40 6 70 0 110', '#FFCA28', 4) + g(120, 168, 1.3, C(0, 16, 9, '#F1C9A5', 2) + R(-8, -12, 16, 22, '#FF4081', 3, 2) + Lc('M-6-12l-6-12M6-12l6-12', '#FF4081', 5) + Lc('M-8 4l-14 10M8 4l14 10', '#FF4081', 4) + face(0, 18, 0.24, 'o'))),
  L(T + 'landmark-wanakatree.v1.svg', 'ต้นไม้กลางทะเลสาบวานาคา', 'That Wānaka tree in the lake', ['that wanaka tree', 'ต้นไม้วานาคา', 'wanaka tree', 'lake wanaka', 'ทะเลสาบวานาคา', 'willow in the lake', 'ต้นหลิวกลางน้ำ', 'reflection', 'เงาสะท้อน', 'sunrise photo'], 'หาต้นไม้ต้นเดียวที่ยืนอยู่ในน้ำ', 'Find the lonely tree standing right in the water',
    // a lone crooked willow tree standing out in the still lake, its branches leaning sideways, its upside-down reflection in the glassy water, soft mountains behind
    range([[-4, 110], [30, 76], [70, 96], [110, 70], [150, 94], [196, 74], [244, 110]], 112, '#B39DDB', '#FFFFFF')
      + R(-4, 112, 248, 116, '#81D4FA', 0, 0) + Lc('M30 140h60M150 150h70M60 190h120', '#E1F5FE', 3)
      + Lc('M120 140c-4-20 0-40 10-56M126 100c-16-10-30-14-44-12M128 92c10-14 24-20 40-20M130 84c-2-14 4-24 14-30', '#6D4C41', 6)
      + ring(14, (k) => C(84 + (k % 7) * 14, 64 + Math.floor(k / 7) * 22 + (k % 2) * 6, 10, '#9CCC65', 2))
      + g(120, 140, 1, `<g transform="scale(1 -1)" opacity=".45">` + Lc('M0 0c-4-20 0-40 10-56M6-40c-16-10-30-14-44-12M8-48c10-14 24-20 40-20', '#6D4C41', 5) + `</g>`) + Lc('M100 142c10 3 30 3 40 0', '#E1F5FE', 3) + face(140, 66, 0.35)),
  L(T + 'landmark-arrowtown.v1.svg', 'ถนนแอร์โรว์ทาวน์ในฤดูใบไม้ร่วงสีทอง', 'Arrowtown’s golden autumn street', ['arrowtown', 'แอร์โรว์ทาวน์', 'autumn leaves', 'ใบไม้เปลี่ยนสี', 'gold rush town', 'เมืองตื่นทอง', 'buckingham street', 'ถนนบักกิงแฮม', 'historic shops', 'ร้านค้าเก่า'], 'หาถนนร้านค้าเก่ากับต้นไม้ใบสีทอง', 'Find the old street of little shops under golden trees',
    // a short street of little old wooden and stone shops with verandas and wooden posts, tall trees blazing gold and orange over them, leaves falling and a pile of leaves to jump in
    ring(3, (k) => R(14 + k * 72, 100, 66, 100, ['#FFF8E1', '#D7CCC8', '#FFFFFF'][k]) + P(`M${10 + k * 72} 104l37-28 37 28z`, ['#8D6E63', '#E53935', '#546E7A'][k]) + R(30 + k * 72, 140, 20, 60, '#6D4C41', 2) + R(58 + k * 72, 140, 16, 20, '#B3E5FC', 1, 2.5)
      + R(10 + k * 72, 122, 74, 8, '#A1887F', 1) + Lc(`M${14 + k * 72} 130v70M${80 + k * 72} 130v70`, '#8D6E63', 3))
      + [[30, 50], [120, 36], [210, 52]].map(([x, y]) => Lc(`M${x} ${y + 60}v40`, '#5D4037', 5) + P(`M${x - 40} ${y + 30}c-10-30 20-50 40-40 20-14 50 4 40 30 10 20-10 34-40 28-30 6-50-2-40-18z`, '#FFB300')).join('')
      + ring(8, (k) => g(20 + k * 28, 70 + (k % 3) * 40, 1, P('M0-6c6 0 8 6 0 12-8-6-6-12 0-12z', ['#FF7043', '#FFCA28', '#F57C00'][k % 3], 1.5), k * 40))
      + E(170, 212, 40, 12, '#FF8F00') + kid(170, 206, '#42A5F5', 0.9) + face(120, 76, 0.4)),
  L(T + 'landmark-chinesehuts.v1.svg', 'บ้านหินคนงานเหมืองจีนที่แอร์โรว์ทาวน์', 'The Chinese miners’ stone huts at Arrowtown', ['chinese settlement', 'หมู่บ้านคนงานจีน', 'miners huts', 'กระท่อมคนงานเหมือง', 'arrowtown', 'แอร์โรว์ทาวน์', 'stone huts', 'บ้านหิน', 'gold rush history', 'ประวัติศาสตร์ตื่นทอง'], 'หากระท่อมหินหลังจิ๋วที่หลังคาเป็นสังกะสี', 'Find the tiny stone huts with tin roofs tucked into the rocks',
    // two tiny cottages built of piled grey schist stones with rusty tin roofs and little wooden doors, tucked against big rocks, a willow and a small vegetable patch in front
    P('M-4 140c40-40 100-60 140-40s70 20 108 6v120H-4z', '#BCAAA4') + E(120, 214, 110, 14, '#C5E1A5', 0)
      + [[70, 130, 60, 50], [164, 140, 50, 44]].map(([x, y, w, h]) => R(x - w / 2, y, w, h, '#B0BEC5') + ring(8, (k) => R(x - w / 2 + 4 + (k % 4) * (w / 4), y + 6 + Math.floor(k / 4) * (h / 2.4), w / 4 - 6, h / 4, '#90A4AE', 3, 2)) + P(`M${x - w / 2 - 6} ${y + 2}l6-16h${w}l6 16z`, '#C1694F') + Lc(`M${x - w / 2 + 6} ${y - 10}h${w - 12}`, '#A1522E', 2) + R(x - 8, y + h - 26, 16, 26, '#8D6E63', 2)).join('')
      + Lc('M210 200c0-40 4-80 14-110', '#6D4C41', 6) + ring(6, (k) => Lc(`M${212 + (k % 3) * 4} ${100 + k * 8}c-10 20-12 40-14 60`, '#9CCC65', 3))
      + ring(5, (k) => g(30 + k * 16, 204, 1, Lc('M0 0v-10M0-6l-5-5M0-6l5-5', '#43A047', 2.5))) + face(70, 160, 0.3)),
  L(T + 'landmark-remarkables.v1.svg', 'เทือกเขารีมาร์กเคเบิลส์ยอดฟันเลื่อย', 'The saw-toothed Remarkables', ['the remarkables', 'เทือกเขารีมาร์กเคเบิลส์', 'remarkables', 'mountain range', 'เทือกเขา', 'zigzag road', 'ถนนซิกแซก', 'lake alta', 'ทะเลสาบอัลตา', 'alpine view'], 'หาภูเขาที่ยอดแหลมๆ เรียงกันเหมือนฟันเลื่อย', 'Find the mountain with a row of sharp peaks like the teeth of a saw',
    // a long rocky mountain wall with a row of sharp jagged teeth along its top dusted in snow, a zigzag road climbing its lower slope, a small blue alpine lake
    range([[0, 150], [20, 70], [36, 96], [54, 50], [70, 84], [88, 40], [104, 78], [122, 46], [140, 82], [158, 52], [176, 88], [196, 60], [214, 96], [240, 150]], 160, '#7E57C2', '#FFFFFF')
      + ring(6, (k) => Lc(`M${40 + k * 30} 100l10 50`, '#673AB7', 2.5)) + P('M-4 150c60-10 160-10 248 0v70H-4z', '#A1887F')
      + Lc('M60 214l120-10-110-12 100-10-90-10 70-10', '#FFE0B2', 5) + E(196, 160, 18, 6, '#4FC3F7', 2.5) + face(88, 110, 0.4)),
  L(T + 'landmark-goodshepherd.v1.svg', 'โบสถ์หินกู๊ดเชเพิร์ดริมทะเลสาบเทคาโป', 'The Church of the Good Shepherd at Lake Tekapo', ['church of the good shepherd', 'โบสถ์กู๊ดเชเพิร์ด', 'lake tekapo', 'ทะเลสาบเทคาโป', 'tekapo', 'เทคาโป', 'stone church', 'โบสถ์หิน', 'turquoise lake', 'mackenzie basin'], 'หาโบสถ์หินหลังเล็กริมทะเลสาบสีฟ้าเทอร์ควอยซ์', 'Find the little stone church by the turquoise lake',
    // a small rough-stone church with a steep grey-tiled roof and a tiny bell on a stone arch, set on tussock above a milky turquoise lake with snowy mountains across
    range([[-4, 110], [40, 70], [80, 96], [130, 60], [180, 90], [244, 110]], 112, '#B0BEC5', '#FFFFFF') + R(-4, 112, 248, 50, '#4DD0E1', 0, 0) + Lc('M20 134h60M140 140h70', '#B2EBF2', 3)
      + P('M-4 160c60-10 160-14 248-6v70H-4z', '#D4B26A') + ring(10, (k) => g(10 + k * 24, 214 + (k % 2) * 8, 1, P('M-6 6c0-10 3-16 6-18 3 2 6 8 6 18z', '#C8A050', 2)))
      + R(70, 120, 90, 70, '#BCAAA4') + ring(12, (k) => R(74 + (k % 4) * 22, 124 + Math.floor(k / 4) * 22, 18, 16, '#A1887F', 4, 2)) + P('M62 124l20-40h70l16 40z', '#78909C')
      + P('M164 124v-24h20v24', '#BCAAA4', 3.5) + P('M166 100c0-10 16-10 16 0', 'none', 3) + C(174, 108, 5, '#FFCA28', 2) + R(100, 152, 26, 38, '#8D6E63', 2) + R(132, 144, 16, 22, '#B3E5FC', 6, 2.5) + Lc('M140 144v22', INK, 2)),
  L(T + 'landmark-royspeak.v1.svg', 'วิวจากยอดเขารอยส์พีก', 'The view from Roys Peak', ['roys peak', 'ยอดเขารอยส์พีก', 'roys peak track', 'เส้นทางรอยส์พีก', 'ridge view', 'วิวสันเขา', 'lake wanaka', 'ทะเลสาบวานาคา', 'summit photo', 'ถ่ายรูปยอดเขา'], 'หาเด็กยืนบนสันเขาแคบๆ เหนือทะเลสาบที่คดเคี้ยว', 'Find the child on the narrow ridge above the winding lake',
    // a narrow grassy ridge rising to a little peak, a child standing on the edge with arms up, far below a big blue lake with fingers of land poking into it and snowy peaks around
    R(-4, 60, 248, 120, '#42A5F5', 0, 0) + range([[-4, 60], [30, 30], [70, 50], [120, 24], [170, 50], [210, 30], [244, 60]], 64, '#B39DDB', '#FFFFFF')
      + P('M-4 100c30 0 40-10 70-6s40 20 70 10 60-20 108-10v40c-50-10-70 10-100 12s-60-10-90-4-40 0-58 0z', '#8BC34A') + P('M60 140c20-10 40-10 60 4 20 14 40 10 60 0', 'none', 2.5).replace('fill="none"', 'fill="#7CB342"')
      + P('M-4 240c40-40 80-100 160-150 20 30 50 80 88 150z', '#AED581') + Lc('M156 90c-10 40-30 90-60 150', '#C8A050', 3).replace('stroke-width="3"', 'stroke-width="3" stroke-dasharray="6 6"')
      + g(158, 86, 1.1, C(0, -22, 9, '#F1C9A5', 2) + R(-8, -12, 16, 18, '#EF5350', 3, 2) + Lc('M-8-10l-12-14M8-10l12-14', '#EF5350', 4) + Lc('M-4 6v10M4 6v10', INK, 3) + face(0, -22, 0.24, 'o'))),
  L(T + 'landmark-glenorchyshed.v1.svg', 'โรงเก็บเรือสีแดงที่เกลนอร์คี', 'The red boatshed at Glenorchy', ['glenorchy', 'เกลนอร์คี', 'red boatshed', 'โรงเรือสีแดง', 'glenorchy wharf', 'ท่าเรือเกลนอร์คี', 'jetty', 'สะพานท่าเรือ', 'head of the lake', 'ปลายทะเลสาบ'], 'หาโรงไม้สีแดงหลังเล็กปลายสะพานไม้', 'Find the little red shed at the end of the wooden jetty',
    // a small bright red wooden shed with a peaked roof standing at the end of a long wooden jetty over a calm lake, mountains reflected, a duck swimming by
    range([[-4, 110], [30, 50], [70, 80], [110, 40], [160, 74], [200, 50], [244, 110]], 112, '#9575CD', '#FFFFFF') + R(-4, 112, 248, 116, '#64B5F6', 0, 0)
      + Lc('M20 160h60M150 200h70', '#E3F2FD', 3) + R(-4, 150, 160, 10, '#A1887F') + ring(6, (k) => Lc(`M${6 + k * 28} 160v26`, '#6D4C41', 4))
      + R(140, 106, 60, 50, '#E53935') + P('M134 108l36-28 36 28z', '#B71C1C') + R(160, 126, 20, 30, '#FFFFFF', 0, 2.5) + Lc('M140 120h60', '#C62828', 2)
      + `<g transform="translate(0 312) scale(1 -1)" opacity=".35">` + R(140, 106, 60, 50, '#E53935', 0, 0) + `</g>`
      + g(60, 200, 1, E(0, 0, 14, 8, '#8D6E63', 2.5) + C(12, -8, 6, '#2E7D32', 2) + P('M17-8l6 2-6 2z', '#FFCA28', 1.5)) + face(170, 140, 0.32)),
  L(T + 'landmark-discgolf.v1.svg', 'ดิสก์กอล์ฟในสวนควีนส์ทาวน์', 'Disc golf in the Queenstown Gardens', ['disc golf', 'ดิสก์กอล์ฟ', 'frisbee golf', 'ฟริสบีกอล์ฟ', 'queenstown gardens', 'สวนควีนส์ทาวน์', 'frisbee', 'จานร่อน', 'park games', 'เกมในสวน'], 'หาตะกร้าเหล็กที่มีโซ่ห้อยไว้รับจานร่อน', 'Find the metal basket with hanging chains that catches the flying disc',
    // a metal disc-golf basket on a pole with a ring of hanging chains, a bright frisbee flying into the chains, tall trees of the park and the lake glinting behind
    R(-4, 120, 248, 30, '#42A5F5', 0, 0) + [[20, 110], [210, 100]].map(([x, y]) => Lc(`M${x} ${y + 60}v-60`, '#6D4C41', 6) + P(`M${x - 20} ${y}l20-60 20 60z`, '#2E7D32')).join('')
      + P('M-4 150c60-10 160-10 248 0v80H-4z', '#7CB342') + R(116, 80, 8, 130, '#9E9E9E', 2)
      + E(120, 82, 40, 10, '#ECEFF1') + Lc(ring(10, (k) => `M${88 + k * 7} 86c-2 20 0 40 4 50`), '#B0BEC5', 2) + P('M80 140h80l-8 24H88z', '#FFCA28') + E(120, 140, 40, 8, '#FFE082')
      + g(184, 100, 1, E(0, 0, 22, 8, '#FF4081') + E(0, -2, 14, 4, '#F48FB1', 0), -16) + Lc('M210 88c10-4 18-4 26 0M206 104c10 0 18 2 26 6', '#FFFFFF', 2.5)
      + kid(50, 206, '#AB47BC', 1.1) + face(120, 150, 0.35)),
  L(T + 'landmark-cromwellfruit.v1.svg', 'ประติมากรรมผลไม้ยักษ์ที่ครอมเวลล์', 'The giant fruit of Cromwell', ['cromwell', 'ครอมเวลล์', 'giant fruit', 'ผลไม้ยักษ์', 'central otago', 'เซ็นทรัลโอทาโก', 'fruit sculpture', 'ประติมากรรมผลไม้', 'apricots', 'แอปริคอต', 'road trip stop'], 'หากองผลไม้ยักษ์ที่ใหญ่กว่ารถ', 'Find the pile of giant fruit bigger than a car',
    // a huge pile of giant fruit on a stone base: a red apple, a pear, an apricot, a nectarine and purple plums, a little child waving beside it for scale
    R(30, 190, 180, 22, '#BDBDBD', 4) + ring(6, (k) => R(36 + k * 29, 194, 24, 14, '#9E9E9E', 3, 2))
      + C(80, 150, 40, '#E53935') + Lc('M80 112v-12', '#5D4037', 4) + P('M80 104c10-10 24-8 28 0-10 6-20 6-28 0z', '#66BB6A', 2.5)
      + P('M140 190c-26 0-36-24-26-46 6-14 10-30 26-36 16 6 20 22 26 36 10 22 0 46-26 46z', '#CDDC39') + Lc('M140 108v-12', '#5D4037', 4)
      + C(184, 164, 26, '#FFB74D') + Lc('M184 140c-6 10-6 34 0 48', '#F57C00', 2.5)
      + C(112, 100, 30, '#FF8A65') + Lc('M112 72c-6 10-6 44 0 56', '#E64A19', 2.5) + [[44, 180], [64, 184]].map(([x, y]) => E(x, y, 12, 14, '#7B1FA2')).join('')
      + kid(222, 212, '#42A5F5', 0.9) + face(80, 152, 0.5) + face(112, 100, 0.36) + face(140, 156, 0.38)),
  L(T + 'landmark-cheeserolls.v1.svg', 'ขนมปังม้วนชีสแบบเกาะใต้', 'Southland cheese rolls', ['cheese rolls', 'ขนมปังม้วนชีส', 'southland sushi', 'ซูชิเซาท์แลนด์', 'toasted rolls', 'ขนมปังปิ้ง', 'cafe', 'ร้านกาแฟ', 'south island food', 'อาหารเกาะใต้'], 'หาขนมปังม้วนสีทองที่มีชีสเยิ้มออกมา', 'Find the golden toasted bread rolls with cheese oozing out',
    // a plate of golden toasted rolled-up bread slices with gooey yellow cheese sauce oozing from the ends, a curl of butter melting on top of one
    E(120, 180, 104, 26, '#ECEFF1') + E(120, 176, 96, 22, '#FFFFFF')
      + [[84, 166], [156, 166], [120, 124]].map(([x, y], k) => g(x, y, 1, R(-22, -30, 44, 60, '#E9A64C', 12) + Lc('M-22-10h44M-22 10h44', '#D08A33', 2) + E(0, -30, 22, 8, '#FFE082') + E(0, -30, 12, 4, '#FFD54F', 0) + P('M-8-30c-2 12 4 16 8 8 4 6 10 2 8-8', '#FFD54F', 2), 90))
      + E(116, 104, 10, 5, '#FFF59D', 2) + face(120, 130, 0.42)),
  L(T + 'landmark-kakapo.v1.svg', 'นกแก้วคากาโป นกแก้วที่บินไม่ได้', 'A kākāpō, the parrot that can’t fly', ['kakapo', 'คากาโป', 'kākāpō', 'night parrot', 'นกแก้วกลางคืน', 'flightless parrot', 'นกแก้วบินไม่ได้', 'fiordland', 'ฟยอร์ดแลนด์', 'conservation'], 'หานกแก้วตัวอ้วนสีเขียวมอสที่หน้าเหมือนนกฮูก', 'Find the chubby moss-green parrot with a face like an owl',
    // a round, plump kākāpō covered in mossy green speckled feathers, a pale owl-like face disc with soft whiskers, a big grey beak, sitting among ferns at night
    ring(4, (k) => g(30 + k * 60, 220, 1, P('M0 0c-10-20-30-30-40-30 14 10 30 20 40 30z', '#43A047', 2))) + E(120, 214, 100, 10, '#689F38', 0)
      + E(120, 140, 72, 70, '#8BC34A') + ring(16, (k) => P(`M${70 + (k % 4) * 30} ${110 + Math.floor(k / 4) * 22}q8 6 16 0`, 'none', 2.5)).replace(/fill="none"/g, 'fill="none" stroke="#558B2F"')
      + ring(16, (k) => C(66 + (k % 4) * 32, 118 + Math.floor(k / 4) * 22, 2.5, '#F9E79F', 0))
      + E(120, 96, 48, 40, '#C5E1A5') + Lc('M100 104l-30-4M100 110l-32 4M102 116l-28 12M140 104l30-4M140 110l32 4M138 116l28 12', '#9E9D24', 1.5)
      + P('M110 98c4-6 16-6 20 0-2 14-6 22-10 24-4-2-8-10-10-24z', '#B0BEC5') + [[90, 210], [150, 210]].map(([x, y]) => Lc(`M${x - 8} ${y}h16`, '#90A4AE', 5)).join('')
      + face(120, 86, 0.75, 'none')),
  L(T + 'landmark-skydive.v1.svg', 'กระโดดร่มดิ่งพสุธาเหนือทะเลสาบ', 'Tandem skydiving over the lakes', ['skydiving', 'ดิ่งพสุธา', 'tandem skydive', 'ดิ่งพสุธาคู่', 'freefall', 'ฟรีฟอล', 'wanaka', 'วานาคา', 'adventure capital', 'เมืองหลวงแห่งการผจญภัย'], 'หาคนสองคนที่กางแขนดิ่งลงมาจากฟ้า', 'Find the two people falling through the sky with their arms spread wide',
    // two skydivers strapped together falling face-down with arms and legs spread, goggles and helmets, high above clouds and a blue lake between mountains, a little plane flying away
    R(-4, 150, 248, 76, '#9575CD', 0, 0) + range([[-4, 200], [30, 160], [70, 186], [110, 150], [150, 180], [196, 156], [244, 200]], 220, '#7E57C2', '#FFFFFF') + E(120, 210, 70, 10, '#1E88E5', 2.5)
      + [[40, 130], [190, 140]].map(([x, y]) => P(`M${x - 30} ${y + 8}c-10 0-10-16 2-16 2-10 18-12 22-2 8-10 28-6 26 8 10 0 10 10 0 10z`, '#FFFFFF', 3)).join('')
      + g(190, 30, 0.8, P('M-30 0h50c10 0 14 4 14 8s-4 8-14 8h-50z', '#ECEFF1') + P('M-6 4l-10-14h10l10 14z', '#EF5350', 2.5) + Lc('M-30 0l-10-10', INK, 2.5))
      + g(110, 90, 1.2, Lc('M-34-18l20 10M34-18l-20 10M-24 22l14-10M24 22l-14-10', '#FF7043', 7) + E(0, 0, 18, 14, '#FF7043') + Lc('M-30-26l20 12M30-26l-20 12M-28 30l14-12M28 30l-14-12', '#42A5F5', 7) + E(0, 6, 16, 12, '#42A5F5')
        + C(0, -18, 11, '#F1C9A5') + P('M-11-20c0-12 22-12 22 0z', '#FFCA28', 2.5) + R(-9, -22, 18, 6, '#4DD0E1', 3, 2) + face(0, -14, 0.22, 'o'))),
  L(T + 'landmark-railtrail.v1.svg', 'ปั่นจักรยานเส้นทางรถไฟเก่าโอทาโก', 'Biking the Otago Central Rail Trail', ['otago central rail trail', 'เส้นทางรถไฟเก่าโอทาโก', 'rail trail', 'เส้นทางจักรยานทางรถไฟเก่า', 'trestle bridge', 'สะพานไม้ขาหยั่ง', 'cycling', 'ปั่นจักรยาน', 'clyde', 'central otago'], 'หาสะพานไม้ขาหยั่งที่มีเด็กปั่นจักรยานข้าม', 'Find the tall wooden trestle bridge with children biking across',
    // an old wooden railway trestle bridge of criss-crossed timber legs across a dry gully, children on bikes pedalling along the gravel track on top, golden tussock hills and schist rocks
    P('M-4 120c60-30 140-40 248-20v130H-4z', '#D4B26A') + ring(6, (k) => g(20 + k * 40, 200 + (k % 2) * 12, 1, P('M-6 6c0-10 3-16 6-18 3 2 6 8 6 18z', '#C8A050', 2)))
      + P('M180 150l10-20 20-4 10 24z', '#90A4AE') + P('M20 170l8-16 16 0 6 16z', '#90A4AE')
      + R(-4, 100, 248, 10, '#8D6E63', 1) + Lc('M-4 96h248', '#BDBDBD', 4)
      + Lc(ring(6, (k) => { const x = 20 + k * 40; return `M${x} 110l-10 90M${x} 110l10 90M${x - 8} 140h16M${x - 10} 170h20`; }), '#A1673F', 5)
      + Lc(ring(5, (k) => { const x = 20 + k * 40; return `M${x} 120L${x + 40} 170M${x + 40} 120L${x} 170`; }), '#BCAAA4', 2.5)
      + [[70, '#EF5350'], [150, '#42A5F5']].map(([x, c]) => g(x, 80, 1, C(-14, 10, 9, 'none', 3) + C(14, 10, 9, 'none', 3) + Lc('M-14 10l10-14h14l4 14M-4-4l-2 14h16', c, 3) + C(0, -20, 7, '#F1C9A5', 2) + P('M-8-22c0-10 16-10 16 0z', '#FFCA28', 2) + Lc('M-2-12l4 10h8', c, 4) + face(0, -18, 0.18))).join('')),
  L(T + 'landmark-whitebait.v1.svg', 'ไข่เจียวปลาไวต์เบตที่ฮาสต์', 'A whitebait fritter at Haast', ['whitebait fritter', 'ไข่เจียวปลาไวต์เบต', 'whitebait', 'ปลาไวต์เบต', 'haast', 'ฮาสต์', 'west coast', 'ชายฝั่งตะวันตก', 'roadside cafe', 'คาเฟ่ริมทาง'], 'หาไข่เจียวกลมๆ ที่มีปลาตัวจิ๋วเต็มไปหมด', 'Find the round omelette full of tiny little fish',
    // a round golden egg fritter packed with tiny see-through whitebait fish with dots for eyes, on a slice of white bread with a lemon wedge
    E(120, 190, 100, 22, '#ECEFF1') + g(120, 150, 1, R(-70, -46, 140, 92, '#FFF8E1', 18) + R(-70, -46, 140, 12, '#D7A86E', 6, 0)) + E(120, 150, 60, 42, '#F4C542')
      + ring(14, (k) => { const x = 82 + (k % 5) * 18 + (Math.floor(k / 5) % 2) * 8, y = 128 + Math.floor(k / 5) * 18; return g(x, y, 1, Lc('M-7 0c4-3 10-3 14 0', '#FFFDE7', 4) + C(5, -1, 1.4, INK, 0), (k * 37) % 60 - 30); })
      + g(196, 116, 1, P('M-14 10l14-26 14 26z', '#FFEB3B') + Lc('M-6 4l6-12 6 12', '#FBC02D', 2)) + face(120, 162, 0.45)),
  L(T + 'landmark-amesroom.v1.svg', 'ห้องมหัศจรรย์ที่ทำให้ตัวโตตัวจิ๋ว', 'The room that makes you giant or tiny', ['ames room', 'ห้องเอมส์', 'illusion room', 'ห้องภาพลวงตา', 'puzzle world', 'โลกปริศนา', 'wanaka', 'วานาคา', 'giant and tiny', 'ตัวโตตัวจิ๋ว'], 'หาเด็กตัวยักษ์กับเด็กตัวจิ๋วที่ยืนอยู่ในห้องเดียวกัน', 'Find the giant child and the tiny child standing in the same room',
    // a strangely shaped room with a checked floor and two windows: in one corner a child so big their head touches the ceiling, in the other corner a tiny child waving
    P('M20 30h200v190H20z', '#FFF3E0') + P('M20 30l60 40v120l-60 30z', '#FFE0B2') + P('M220 30l-80 50v100l80 40z', '#FFCC80')
      + P('M80 70h60v-0l0 10v100H80z', '#FFF8E1') + Lc('M80 70h60', INK, 3) + Lc('M80 190h60', INK, 3)
      + ring(4, (k) => P(`M${20 + k * 50} 220L${80 + k * 15} 190h15L${70 + k * 50} 220z`, k % 2 ? '#5C6BC0' : '#FFFFFF', 1.5))
      + R(36, 80, 26, 30, '#B3E5FC', 2, 2.5) + R(166, 100, 30, 34, '#B3E5FC', 2, 2.5)
      + g(52, 180, 2.3, C(0, -20, 8, '#F1C9A5', 2) + P('M-8 4v-16h16v16z', '#EF5350', 2) + Lc('M-4 4v10M4 4v10', INK, 2.5) + face(0, -18, 0.22, 'o'))
      + g(176, 186, 0.8, C(0, -20, 8, '#F1C9A5', 2) + P('M-8 4v-16h16v16z', '#42A5F5', 2) + Lc('M8-8l8-10', '#F1C9A5', 3) + face(0, -18, 0.22))),
];

export default {
  places: {
    'nz-queenstown': { country: 'nz', wave: 3, name: nm('ควีนส์ทาวน์ วานาคา และมิลฟอร์ดซาวด์', 'Queenstown, Wānaka and Milford Sound'), tz: 'Pacific/Auckland', ll: [-45.03, 168.66], alias: ['queenstown', 'ควีนส์ทาวน์', 'ZQN', 'milford sound', 'มิลฟอร์ดซาวด์', 'wanaka', 'วานาคา', 'wānaka', 'arrowtown', 'แอร์โรว์ทาวน์', 'fiordland', 'ฟยอร์ดแลนด์', 'tekapo', 'เทคาโป', 'te anau', 'เทอาเนา', 'glenorchy', 'เกลนอร์คี', 'cromwell', 'ครอมเวลล์', 'haast', 'ฮาสต์'], colors: QT },
  },
  items,
};
