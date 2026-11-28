// Wave 16: Guangzhou — the old trading city on the Pearl River: the slim waisted Canton Tower, the Five Rams of Yuexiu Park,
// the ridge of the Chen Clan Academy, the two pebbles of the Opera House, the lacquer box of the Guangdong Museum, Haixinsha's
// white sails, the arcades of Xiguan, the coloured glass of a Lingnan window, Baiyun Mountain's white clouds, the old roads under
// glass on Beijing Road, the southern lion on its poles, the Spring Festival flower market, Chimelong's white tiger cubs, roast
// goose, double-skin milk and boat congee; day scenes on the Pearl River at night, Shamian Island and Yuexiu Park.
// Skipped as repeats or bans: dim sum, har gow, siu mai and cheung fun (Hong Kong's teahouse and rice rolls), wonton noodles (Hong
// Kong), the opera mask (China's culture picture), pandas (Chengdu, China), the kapok tree as a subject (Nan; here only flowers on
// the stamp), egg tarts (Macau), mooncakes (China), the Sacred Heart Cathedral and the temples (religious), the Sun Yat-sen
// Memorial Hall (Taipei's blue eight-sided roof, and named for a real person), Chimelong Ocean Kingdom (Zhuhai, near Macau).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const GZ = { k1: '#D84315', k2: '#00695C', k3: '#FFF3E0' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `cn-guangzhou.landmark.${slug}`, cat: 'landmark', file: `cn/guangzhou/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// a kapok flower (the city flower): five red-orange petals round a yellow heart
const kapok = (x, y, s = 1) => g(x, y, s, [0, 72, 144, 216, 288].map((a) => g(0, 0, 1, E(0, -8, 5, 8, '#F4511E', 2), a)).join('') + C(0, 0, 3.5, '#FFD54F', 1.5));
const rd = (d) => d.replace(/-?\d+\.\d+/g, (v) => String(+(+v).toFixed(1)));
// the waisted Canton Tower: wide foot, thin waist, wider top, a needle above (x = centre, y = foot, h = height)
const tower = (x, y, h, fill, lines) => {
  const t = y - h, w = h * 0.075;
  return P(rd(`M${x - w * 1.9} ${y}C${x - w * 0.9} ${y - h * 0.35} ${x - w * 0.2} ${y - h * 0.5} ${x - w * 0.5} ${y - h * 0.62}S${x - w * 1.3} ${t + h * 0.12} ${x - w * 1.2} ${t}`
    + `h${w * 2.4}c${w * 0.1} ${h * 0.12}-${w * 0.8} ${h * 0.26}-${w * 0.7} ${h * 0.38}s${w * 0.4} ${h * 0.27} ${w * 1.5} ${h * 0.62}z`), fill)
    + Lc(`M${x} ${t}v-${h * 0.22}`, INK, Math.max(2.5, h * 0.025)) + (lines ? Lc(lines, '#FFFFFF', 2) : '');
};

const items = [
  { id: 'cn-guangzhou.stamp', cat: 'stamp', file: 'cn/guangzhou/stamp.v1.svg', name: nm('ตราประทับกวางโจว', 'Guangzhou stamp'), kw: ['guangzhou', 'กวางโจว', 'canton tower', 'หอคอยกวางโจว', 'kapok flower', 'ดอกงิ้ว', 'pearl river', 'แม่น้ำจูเจียง', 'guangdong', 'กวางตุ้ง', 'city of flowers', 'เมืองแห่งดอกไม้'],
    // the slim waisted Canton Tower in warm orange rising over the green Pearl River, red-orange kapok flowers (the city flower) on both sides
    svg: cityStamp('cgz-st', { name: 'GUANGZHOU', sub: 'CHINA', ...GZ, emblem: P('M48 118h104a52 52 0 0 1-104 0z', '#80CBC4', 0) + Lc('M62 130h16M120 136h18M90 146h12', '#E0F2F1', 2.5)
      + tower(100, 128, 76, '#FFB74D', 'M93 112l14-8M94 96l12-8M96 80l10-6') + face(100, 104, 0.22, 'none')
      + [[64, 76, 1], [70, 98, 0.8], [136, 76, 1], [130, 98, 0.8]].map(([x, y, s]) => kapok(x, y, s)).join('') }) },

  { id: 'cn-guangzhou.day.pearlriver', cat: 'day', file: 'cn/guangzhou/day-pearlriver.v1.svg', name: nm('ล่องเรือแม่น้ำจูเจียงยามค่ำคืน', 'A night cruise on the Pearl River'), kw: ['pearl river', 'แม่น้ำจูเจียง', 'night cruise', 'ล่องเรือกลางคืน', 'pearl river cruise', 'ล่องเรือแม่น้ำจูเจียง', 'canton tower', 'หอคอยกวางโจว', 'city lights', 'แสงไฟเมือง', 'zhujiang new town', 'จูเจียงนิวทาวน์', 'night', 'กลางคืน'],
    // a deep blue night sky with stars and a moon, the Canton Tower glowing pink and purple over a row of lit towers, the dark river full of coloured reflections, a cruise boat strung with lights sailing past
    svg: scene('cgz-d1', '#3949AB', C(56, 58, 14, '#FFF59D', 0) + C(62, 54, 12, '#3949AB', 0) + [[96, 40], [118, 70], [196, 52], [40, 96], [214, 96]].map(([x, y]) => C(x, y, 2.5, '#FFFFFF', 0)).join('')
      + [[20, 118, 30, 46, '#7986CB'], [52, 100, 24, 64, '#9FA8DA'], [80, 112, 26, 52, '#7E57C2'], [180, 96, 26, 68, '#9575CD'], [208, 114, 30, 50, '#7986CB']].map(([x, y, w, h, c]) => R(x, y, w, h, c) + Lc(`M${x + 6} ${y + 10}h${w - 12}M${x + 6} ${y + 24}h${w - 12}M${x + 6} ${y + 38}h${w - 12}`, '#FFF176', 3)).join('')
      + tower(146, 164, 140, '#F48FB1', 'M136 150l20-10M138 128l16-8M140 104l12-8M138 80l16-8M136 56l20-10') + face(146, 106, 0.22, 'none')
      + R(-4, 164, 248, 92, '#1A237E') + Lc('M146 172v40M40 176v20M80 172v26M194 172v34M220 176v18', '#F48FB1', 4) + Lc('M60 186h20M162 200h22M100 214h26', '#FFF59D', 3)
      + P('M54 214h120l-12 18H70z', '#FFFFFF') + R(74, 196, 76, 18, '#FFFFFF', 4) + R(92, 184, 40, 12, '#FFFFFF', 3) + [84, 102, 120, 138].map((x) => R(x, 200, 10, 8, '#FFD54F', 2, 2.5)).join('')
      + Lc('M60 214L112 176l50 38', INK, 2) + [70, 86, 100, 124, 138, 152].map((x, k) => C(x, 214 - (x < 112 ? (x - 60) * 0.73 : (162 - x) * 0.76), 3, ['#FF4081', '#FFEB3B', '#00E5FF'][k % 3], 1.5)).join('')
      + face(112, 222, 0.24)) },
  { id: 'cn-guangzhou.day.shamian', cat: 'day', file: 'cn/guangzhou/day-shamian.v1.svg', name: nm('ถนนร่มไม้บนเกาะซาเมี่ยน', 'The shady avenue of Shamian Island'), kw: ['shamian island', 'เกาะซาเมี่ยน', 'shamian', 'ซาเมี่ยน', 'old european houses', 'บ้านเก่าแบบยุโรป', 'banyan trees', 'ต้นไทร', 'shady avenue', 'ถนนร่มไม้', 'liwan', 'ลี่วาน', 'walk', 'เดินเล่น'],
    // a calm blue sky, a cream two-storey old house with arched windows, columns and a green-shuttered balcony, huge banyan trees with hanging roots shading a wide path, an old street lamp
    svg: scene('cgz-d2', '#E1F5FE', C(188, 52, 15, '#FFF59D', 0)
      + R(70, 88, 110, 112, '#FFF3E0') + P('M62 90h126l-8-14H70z', '#BCAAA4') + Lc('M70 140h110', '#D7CCC8', 4)
      + [86, 112, 138, 164].map((x) => P(`M${x - 8} 132v-22a8 8 0 0 1 16 0v22z`, '#81D4FA') + P(`M${x - 8} 194v-28a8 8 0 0 1 16 0v28z`, '#A5D6A7')).join('')
      + R(76, 140, 98, 6, '#FFFFFF', 0, 2.5) + Lc('M80 146v-12M92 146v-12M104 146v-12M116 146v-12M128 146v-12M140 146v-12M152 146v-12M164 146v-12', '#BCAAA4', 2) + face(125, 114, 0.24, 'none')
      + P('M-4 200h248v56H-4z', '#E0E0E0') + Lc('M-4 200h248', '#BDBDBD', 4) + Lc('M60 256l40-56M180 256l-40-56', '#F5F5F5', 6)
      + Lc('M30 210V120M206 210V120', '#795548', 10) + Lc('M22 140v40M38 150v34M198 140v40M214 150v34', '#8D6E63', 2.5)
      + C(30, 100, 40, '#43A047') + C(10, 120, 26, '#66BB6A') + C(54, 118, 22, '#66BB6A') + C(210, 100, 40, '#43A047') + C(232, 120, 26, '#66BB6A') + C(186, 118, 22, '#66BB6A')
      + Lc('M190 214v-50', INK, 4) + R(184, 150, 12, 14, '#FFF59D', 3, 3) + P('M182 150l8-8 8 8z', INK, 2)) },
  { id: 'cn-guangzhou.day.yuexiu', cat: 'day', file: 'cn/guangzhou/day-yuexiu.v1.svg', name: nm('หอเจิ้นไห่บนเนินเขาในสวนเยว่ซิ่ว', 'Zhenhai Tower on the hill of Yuexiu Park'), kw: ['yuexiu park', 'สวนเยว่ซิ่ว', 'yuexiu', 'เยว่ซิ่ว', 'zhenhai tower', 'หอเจิ้นไห่', 'five-storey tower', 'หอห้าชั้น', 'lake', 'ทะเลสาบ', 'pedal boat', 'เรือถีบ', 'park', 'สวนสาธารณะ'],
    // a warm peach sky, a green hill with a tall red five-storey tower under five green tiled roofs on top, a lake in front with a little swan pedal boat and lily pads
    svg: scene('cgz-d3', '#FFF3E0', C(56, 52, 15, '#FFE082', 0) + P('M-4 150c40-60 90-90 124-90s90 30 124 90v40H-4z', '#66BB6A')
      + R(98, 54, 44, 74, '#E53935') + [54, 70, 86, 102, 118].map((y) => P(`M90 ${y}h60l-6 6H96z`, '#2E7D32', 2.5)).join('') + P('M112 54l8-12 8 12z', '#2E7D32', 2.5)
      + [62, 78, 94, 110].map((y) => R(104, y, 8, 6, '#FFF59D', 1, 2) + R(128, y, 8, 6, '#FFF59D', 1, 2)).join('') + face(120, 112, 0.24, 'none')
      + Lc('M84 150c10-6 14-14 26-20M156 150c-10-6-14-14-26-20', '#A1887F', 5) + C(56, 124, 16, '#43A047') + C(186, 128, 16, '#43A047')
      + P('M-4 160c60-10 180-10 248 0v96H-4z', '#4FC3F7') + Lc('M30 186c10-5 20 5 30 0M170 182c10-5 20 5 30 0M60 216c10-5 20 5 30 0', '#E1F5FE', 4)
      + [[40, 200], [196, 210], [214, 196]].map(([x, y]) => E(x, y, 12, 5, '#81C784', 2.5)).join('')
      + E(136, 210, 30, 10, '#FFFFFF') + P('M156 206c0-20-4-34 8-38 10-2 12 10 4 14', '#FFFFFF') + P('M168 172l8 2-6 4z', '#FF7043', 2) + C(164, 176, 2, INK, 0) + face(130, 210, 0.22)) },

  L('cantontower', 'หอคอยกวางโจว ตึกเอวคอดริมแม่น้ำจูเจียง', 'Canton Tower, the slim-waisted tower on the Pearl River', ['canton tower', 'หอคอยกวางโจว', 'guangzhou tower', 'ทาวเวอร์กวางโจว', 'xiaomanyao', 'เสี่ยวหมานเยา', 'slim waist', 'เอวคอด', 'bubble tram', 'กระเช้าฟองสบู่', 'haixinsha', 'ไห่ซินซา', 'observation deck', 'จุดชมวิว'], 'หากระเช้ากลมๆ ที่วิ่งรอบยอดหอคอย', 'Find the round cars riding around the top of the tower',
    // the tall twisted tower, wide at the foot, pinched in a thin waist and wider again at the top, a white lattice criss-crossing it, a ring of little round bubble cars around the top, a needle above, the river below
    bg('#EDE7F6') + low(196, '#4DB6AC') + frame + Lc('M40 210c10-5 20 5 30 0M164 212c10-5 20 5 30 0', '#E0F2F1', 4)
      + tower(120, 200, 170, '#FFCC80', 'M104 186l32-18M108 160l24-14M112 134l18-10M110 108l20-12M106 82l28-16M104 186l12 6M110 160l20 10M112 108l18 10M106 82l28 12')
      + E(120, 46, 24, 7, '#FFFFFF') + [100, 112, 128, 140].map((x) => C(x, 46, 4.5, '#F06292', 2.5)).join('') + face(120, 126, 0.3, 'none')
      + [[50, 120], [190, 110]].map(([x, y]) => Lc(`M${x - 8} ${y}q4-4 8 0q4-4 8 0`, INK, 3)).join('')),
  L('fiverams', 'รูปปั้นแพะห้าตัวในสวนเยว่ซิ่ว', 'The Five Rams statue in Yuexiu Park', ['five rams statue', 'รูปปั้นแพะห้าตัว', 'five goats', 'แพะห้าตัว', 'wuyang', 'อู่หยาง', 'city of rams', 'เมืองแพะ', 'yuexiu park', 'สวนเยว่ซิ่ว', 'stone statue', 'รูปปั้นหิน', 'rice ear', 'รวงข้าว'], 'หารวงข้าวที่แพะตัวใหญ่คาบไว้', 'Find the ear of rice the big ram holds in its mouth',
    // five stone rams with curly horns on a rocky stand, the big one standing on top with an ear of golden rice in its mouth, four smaller rams resting around the foot, green trees behind
    C(46, 92, 22, '#81C784') + C(196, 96, 22, '#81C784')
      + P('M34 206c4-30 20-46 34-50l20-34c20-8 44-8 64 0l20 34c14 4 30 20 34 50z', '#BCAAA4') + Lc('M60 186l20-10M150 190l18-14M100 150l12 10', '#A1887F', 3)
      + [[62, 188, 1], [178, 188, -1], [92, 204, 1], [148, 204, -1]].map(([x, y, d]) => g(x, y, 0.62, E(0, 0, 22, 14, '#ECEFF1') + C(d * 20, -12, 11, '#ECEFF1') + Lc(`M${d * 14}-20c${d * -10}-6${d * -6}-18 2-16s6 10 0 12`, '#A1887F', 4) + C(d * 24, -14, 2.5, INK, 0))).join('')
      + E(118, 110, 34, 22, '#F5F5F5') + Lc('M96 128v20M108 130v20M130 130v20M142 128v20', '#E0E0E0', 7) + C(150, 84, 18, '#F5F5F5')
      + Lc('M140 72c-14-8-20 4-14 14s16 4 12-4', '#BCAAA4', 5) + Lc('M162 72c10-12 22-4 16 8s-14 4-10-4', '#BCAAA4', 5)
      + Lc('M162 96l20 14', '#C0A060', 3) + [[170, 102], [176, 106], [182, 110], [174, 96], [180, 100]].map(([x, y]) => E(x, y, 4, 2.5, '#FFCA28', 1.5)).join('')
      + face(150, 86, 0.36) + Lc('M84 104c-8-4-10-12-6-16', '#E0E0E0', 4)),
  L('chenclan', 'ศาลบรรพชนตระกูลเฉินกับสันหลังคาเครื่องปั้นดินเผาสีสด', 'The Chen Clan Academy and its colourful pottery roof ridge', ['chen clan ancestral hall', 'ศาลบรรพชนตระกูลเฉิน', 'chen clan academy', 'เฉินเจียฉือ', 'chenjiaci', 'folk art museum', 'พิพิธภัณฑ์ศิลปะพื้นบ้าน', 'roof ridge', 'สันหลังคา', 'shiwan pottery', 'เครื่องปั้นสือวาน', 'wood carving', 'งานแกะสลักไม้', 'lingnan', 'หลิ่งหนาน'], 'หาผลไม้และดอกไม้หลากสีบนสันหลังคา', 'Find the bright fruit and flowers along the roof ridge',
    // a long grey-brick hall with a gentle green tiled roof, its tall ridge crowded with bright little pottery fruits, flowers and curling waves, a big dark wooden door with round brass studs and two stone drums beside it
    bg('#FFF8E1') + low(198, '#D7CCC8') + frame
      + R(32, 116, 176, 82, '#B0BEC5') + Lc('M32 136h176M32 156h176M32 176h176', '#90A4AE', 2) + P('M20 118l20-24h160l20 24z', '#43A047') + Lc('M44 98l-12 20M70 98l-6 20M96 98l-2 20M144 98l2 20M170 98l6 20M196 98l12 20', '#2E7D32', 2.5)
      + R(34, 70, 172, 24, '#FFE0B2') + P('M24 72c4-14 14-18 22-8M216 72c-4-14-14-18-22-8', '#4FC3F7')
      + [[52, 82, '#EF5350'], [72, 80, '#FFCA28'], [92, 82, '#66BB6A'], [148, 82, '#AB47BC'], [168, 80, '#FF7043'], [188, 82, '#29B6F6']].map(([x, y, c], k) => (k % 2 ? C(x, y, 7, c, 2.5) : g(x, y, 1, [0, 90, 180, 270].map((a) => g(0, 0, 1, E(0, -5, 3.5, 5, c, 2), a)).join('') + C(0, 0, 2.5, '#FFF59D', 1.5)))).join('')
      + R(96, 66, 48, 30, '#FFF59D', 6) + face(120, 78, 0.32)
      + R(94, 130, 52, 68, '#6D4C41') + Lc('M120 130v68', '#4E342E', 3) + [146, 162, 178].map((y) => C(108, y, 2.5, '#FFCA28', 1.5) + C(132, y, 2.5, '#FFCA28', 1.5)).join('')
      + E(76, 190, 12, 8, '#BDBDBD') + E(76, 180, 12, 5, '#E0E0E0', 3) + E(164, 190, 12, 8, '#BDBDBD') + E(164, 180, 12, 5, '#E0E0E0', 3)),
  L('operahouse', 'โรงอุปรากรกวางโจว ก้อนหินกรวดคู่ริมแม่น้ำ', 'Guangzhou Opera House, the double pebble by the river', ['guangzhou opera house', 'โรงอุปรากรกวางโจว', 'opera house', 'โรงอุปรากร', 'double pebble', 'ก้อนกรวดคู่', 'two boulders', 'หินสองก้อน', 'zhujiang new town', 'จูเจียงนิวทาวน์', 'huacheng square', 'ลานฮวาเฉิง', 'theatre', 'โรงละคร'], 'หาก้อนหินสีขาวก้อนเล็กข้างก้อนสีเทาใหญ่', 'Find the small white pebble beside the big grey one',
    // two smooth pebble-shaped buildings on a green lawn by the water: a big dark grey one with a pattern of triangular glass and a smaller white one, both smiling, a little path between them
    bg('#E0F7FA') + low(170, '#A5D6A7') + low(204, '#4DB6AC') + frame + Lc('M50 214c10-5 20 5 30 0M150 214c10-5 20 5 30 0', '#E0F2F1', 4)
      + P('M26 176c-4-40 18-82 64-94 40-10 68 18 66 56-2 22-10 38-24 42z', '#78909C') + Lc('M40 150l30-40 26 52M70 110l40-20 8 46M96 162l22-26 30 6M40 150l56 12M118 136l-48-26', '#B0BEC5', 3)
      + P('M146 182c-6-28 10-56 36-58 26-2 38 22 34 44-2 10-8 14-16 14z', '#F5F5F5') + Lc('M160 150l20-24 14 32M180 126l26 18M160 150l34 8', '#CFD8DC', 2.5)
      + face(88, 134, 0.36) + face(182, 154, 0.28) + Lc('M126 196c8-6 12-10 20-12', '#FFF9C4', 6)),
  L('museumbox', 'พิพิธภัณฑ์กวางตุ้ง กล่องสมบัติเครื่องเขิน', 'Guangdong Museum, the lacquer treasure box', ['guangdong museum', 'พิพิธภัณฑ์กวางตุ้ง', 'treasure box', 'กล่องสมบัติ', 'lacquer box', 'กล่องเครื่องเขิน', 'museum', 'พิพิธภัณฑ์', 'huacheng square', 'ลานฮวาเฉิง', 'zhujiang new town', 'จูเจียงนิวทาวน์', 'carved pattern', 'ลายแกะสลัก'], 'หาลายเส้นสีทองที่แกะไว้รอบกล่อง', 'Find the gold lines carved around the box',
    // a big dark red cube like a lacquer treasure box lifted off the ground, cut through with zigzag gold grooves and window slits, a little gold clasp on the front, a wide paved square and trees in front
    bg('#FFF3E0') + low(190, '#E0E0E0') + frame + Lc('M40 206h40M100 212h40M160 206h40', '#F5F5F5', 4)
      + R(44, 52, 152, 120, '#B71C1C', 6) + P('M44 52l12-12h140l-12 12z', '#C62828') + P('M196 52l12-12v120l-12 12z', '#8E1414')
      + Lc('M50 76l20 14 22-14 26 18 24-18 22 14 26-14M50 140l24-12 22 16 24-16 22 12 24-14 18 12', '#FFCA28', 4) + Lc('M62 110h20M150 110h26', '#FFE082', 4)
      + R(108, 96, 24, 18, '#FFCA28', 3, 3) + C(120, 105, 3, '#B71C1C', 2) + R(70, 172, 16, 18, '#9E9E9E') + R(154, 172, 16, 18, '#9E9E9E')
      + face(120, 128, 0.36) + C(30, 176, 10, '#66BB6A', 3) + C(210, 176, 10, '#66BB6A', 3)),
  L('haixinsha', 'อัฒจันทร์ใบเรือสีขาวบนเกาะไห่ซินซา', 'The white sail stands of Haixinsha Island', ['haixinsha', 'ไห่ซินซา', 'haixinsha island', 'เกาะไห่ซินซา', 'asian games park', 'สวนเอเชียนเกมส์', 'white sails', 'ใบเรือสีขาว', 'pearl river', 'แม่น้ำจูเจียง', 'island park', 'สวนบนเกาะ', 'fountain', 'น้ำพุ'], 'หาใบเรือสีขาวสี่ใบที่เรียงกันบนเกาะ', 'Find the four white sails standing in a row on the island',
    // a low green island in the river with four tall white curved roofs like the sails of a boat in a row, rows of seats under them, a fountain spraying in front, little waves all around
    bg('#E1F5FE') + low(150, '#4FC3F7') + frame + E(120, 184, 98, 22, '#A5D6A7') + Lc('M30 214c10-5 20 5 30 0M120 216c10-5 20 5 30 0M176 210c10-5 20 5 30 0', '#E1F5FE', 4)
      + [[46, 0], [86, 8], [126, 8], [166, 0]].map(([x, d]) => P(`M${x} 176c-4-40 4-80 30-${110 - d}c-8 34-10 76-6 ${110 - d}z`, '#FFFFFF') + Lc(`M${x + 8} 176v-${40 - d / 2}`, '#B0BEC5', 2.5)).join('')
      + Lc('M44 168h150M48 160h140', '#90A4AE', 3) + face(106, 140, 0.3, 'none')
      + Lc('M120 196c-6-14-14-20-20-22M120 196c6-14 14-20 20-22M120 196v-22', '#81D4FA', 4) + E(120, 198, 14, 4, '#4FC3F7', 2.5)),
  L('qilou', 'ตึกแถวทางเดินมีหลังคาฉีโหลวย่านซีกวน', 'The arcaded qilou shophouses of Xiguan', ['qilou', 'ฉีโหลว', 'arcade houses', 'ตึกแถวทางเดินมีหลังคา', 'xiguan', 'ซีกวน', 'enning road', 'ถนนเอินหนิง', 'shangxiajiu', 'ซ่างเซี่ยจิ่ว', 'covered walkway', 'ทางเดินใต้ชายคา', 'shophouse', 'ห้องแถว'], 'หาทางเดินโค้งใต้ตัวบ้านที่กันแดดกันฝน', 'Find the arched walkway under the houses that keeps off the sun and rain',
    // three joined pastel shophouses, each with tall shuttered windows upstairs and a row of round arches at street level making a shaded walkway, long blank red shop signboards hanging down, a curly pediment on top
    bg('#FFFDE7') + low(200, '#BDBDBD') + frame
      + [[28, '#FFCCBC', '#FF8A65'], [90, '#C8E6C9', '#66BB6A'], [152, '#B3E5FC', '#4FC3F7']].map(([x, c, d]) => R(x, 66, 60, 134, c) + P(`M${x} 66c10-16 20-16 30-24 10 8 20 8 30 24z`, c)
        + R(x + 10, 80, 14, 30, d, 2, 2.5) + R(x + 36, 80, 14, 30, d, 2, 2.5) + Lc(`M${x + 17} 80v30M${x + 43} 80v30`, '#FFFFFF', 2) + R(x + 6, 116, 48, 6, '#FFFFFF', 0, 2.5)
        + P(`M${x + 6} 200v-40a24 24 0 0 1 48 0v40z`, '#5D4037') + R(x + 22, 128, 16, 6, '#FFFFFF', 0, 2)).join('')
      + Lc('M28 200v-72M88 200v-72M90 200v-72M150 200v-72M152 200v-72M212 200v-72', INK, 3)
      + [[44, 138], [112, 138], [184, 138]].map(([x, y]) => R(x, y, 10, 30, '#E53935', 2, 2.5)).join('') + face(120, 92, 0.28, 'none')),
  L('manzhouwindow', 'หน้าต่างกระจกสีหม่านโจวแบบหลิ่งหนาน', 'A Lingnan manzhou window of coloured glass', ['manzhou window', 'หน้าต่างหม่านโจว', 'coloured glass window', 'หน้าต่างกระจกสี', 'lingnan garden', 'สวนหลิ่งหนาน', 'yuyin shanfang', 'อวี๋อินซานฝาง', 'xiguan house', 'บ้านซีกวน', 'lattice window', 'หน้าต่างลายฉลุ', 'panyu', 'พานอวี้'], 'หากระจกสีน้ำเงินแผ่นเล็กๆ ในกรอบไม้', 'Find the little blue glass panes in the wooden frame',
    // a dark wooden window frame full of a lattice of little panes in red, blue, yellow and green glass, a round flower pane in the middle with a smiling face, sunbeams shining through onto a floor of soft colour patches
    R(36, 28, 168, 150, '#6D4C41', 8) + R(48, 40, 144, 126, '#8D6E63', 4)
      + [0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5].map((c) => R(52 + c * 23, 44 + r * 30, 21, 28, ['#EF5350', '#42A5F5', '#FFCA28', '#66BB6A'][(r + c) % 4], 0, 2.5)).join('')).join('')
      + C(120, 103, 30, '#8D6E63') + C(120, 103, 24, '#FFF59D') + [0, 60, 120, 180, 240, 300].map((a) => g(120, 103, 1, E(0, -16, 5, 8, '#F06292', 2), a)).join('') + face(120, 103, 0.3)
      + Lc('M60 178l-10 30M100 178l-4 30M140 178l4 30M180 178l10 30', '#FFF59D', 4)
      + [[52, 214, '#EF9A9A'], [98, 216, '#90CAF9'], [144, 216, '#FFE082'], [190, 214, '#A5D6A7']].map(([x, y, c]) => E(x, y, 18, 6, c, 2.5)).join('')),
  L('baiyun', 'ภูเขาไป๋หยุน ภูเขาเมฆขาว', 'Baiyun Mountain, the White Cloud Mountain', ['baiyun mountain', 'ภูเขาไป๋หยุน', 'baiyunshan', 'ไป๋หยุนซาน', 'white cloud mountain', 'ภูเขาเมฆขาว', 'cable car', 'กระเช้าลอยฟ้า', 'moxing ridge', 'ยอดเขาหมอซิง', 'mountain walk', 'เดินขึ้นเขา', 'clouds', 'เมฆ'], 'หาก้อนเมฆที่ยิ้มอยู่บนยอดเขา', 'Find the smiling cloud resting on the mountain top',
    // a rounded green mountain with two peaks, a big fluffy white cloud with a smiling face resting on the top, a cable car line strung up the slope with two little red cabins, smaller clouds drifting by
    bg('#E3F2FD') + P('M16 170c20-40 40-70 70-80 20-6 30 4 44-14 20-24 50-10 70 20 10 16 20 30 24 44v54H16z', '#66BB6A', 0) + frame + P('M16 196c60-20 140-20 208 0v28H16z', '#43A047', 0)
      + Lc('M86 104c10 30 20 50 40 70M150 94c-6 30-4 60 8 86', '#81C784', 4)
      + P('M92 74c-16 0-24-16-12-26 0-16 20-22 30-12 8-14 30-14 38 0 14-6 28 6 22 20 12 6 6 22-8 22z', '#FFFFFF') + face(124, 60, 0.4)
      + P('M28 104c-8 0-10-10-2-12 2-8 14-8 16 0 8 0 10 12 0 12z', '#FFFFFF') + P('M186 120c-8 0-10-10-2-12 2-8 14-8 16 0 8 0 10 12 0 12z', '#FFFFFF')
      + Lc('M30 200L210 92', INK, 3) + [[80, 170], [158, 123]].map(([x, y]) => Lc(`M${x} ${y}v10`, INK, 3) + R(x - 12, y + 10, 24, 20, '#E53935', 5) + R(x - 7, y + 14, 14, 8, '#E1F5FE', 2, 2.5)).join('')),
  L('beijingroad', 'ซากถนนโบราณใต้พื้นกระจกบนถนนปักกิ่ง', 'The old roads under the glass floor of Beijing Road', ['beijing road', 'ถนนปักกิ่งกวางโจว', 'beijing lu', 'เป่ยจิงลู่', 'glass floor', 'พื้นกระจก', 'ancient road', 'ถนนโบราณ', 'road layers', 'ชั้นถนนเก่า', 'pedestrian street', 'ถนนคนเดิน', 'shopping street', 'ถนนช้อปปิ้ง'], 'หาชั้นอิฐเก่าหลายสีใต้แผ่นกระจก', 'Find the layers of old bricks under the glass',
    // a cut-away view under a pedestrian street: a clear glass panel in the paving, and below it stacked layers of old road in different coloured bricks and stones, getting older and deeper, a smiling face on the glass, shop fronts with lanterns behind
    bg('#FFF8E1') + frame + R(28, 40, 56, 60, '#FFCCBC') + R(92, 30, 56, 70, '#C5CAE9') + R(156, 44, 56, 56, '#C8E6C9') + [[40, 52], [104, 44], [168, 56]].map(([x, y]) => R(x, y, 32, 26, '#FFFFFF', 3, 2.5)).join('')
      + [56, 120, 184].map((x) => Lc(`M${x} 100v8`, INK, 2) + E(x, 116, 7, 9, '#E53935', 2.5)).join('')
      + R(16, 124, 208, 14, '#BDBDBD', 0, 3) + R(52, 124, 136, 14, '#B3E5FC', 0, 3) + Lc('M64 128l14 6M150 128l14 6', '#FFFFFF', 2.5)
      + R(52, 138, 136, 22, '#E0E0E0') + Lc('M52 149h136M86 138v11M120 138v11M154 138v11M70 149v11M104 149v11M138 149v11M172 149v11', '#9E9E9E', 2)
      + R(52, 160, 136, 22, '#FFAB91') + Lc('M52 171h136M76 160v11M100 160v11M124 160v11M148 160v11M172 160v11M64 171v11M88 171v11M112 171v11M136 171v11M160 171v11', '#E64A19', 2)
      + R(52, 182, 136, 24, '#D7CCC8') + [[70, 194], [96, 190], [124, 196], [150, 191], [174, 196]].map(([x, y]) => E(x, y, 10, 6, '#A1887F', 2)).join('')
      + Lc('M52 138v68M188 138v68', INK, 4) + face(120, 131, 0.22, 'none')),
  L('lionpoles', 'การเชิดสิงโตกวางตุ้งบนยอดเสา', 'A southern lion dancing on top of the poles', ['lion dance on poles', 'เชิดสิงโตบนเสา', 'southern lion', 'สิงโตกวางตุ้ง', 'lion dance', 'เชิดสิงโต', 'plum blossom poles', 'เสาดอกเหมย', 'cantonese lion', 'สิงโตจีนใต้', 'drum', 'กลอง', 'festival', 'เทศกาล'], 'หากระจกกลมบนหน้าผากสิงโต', 'Find the round mirror on the lion’s forehead',
    // a round yellow-and-red southern lion head with a little round mirror on its forehead, big blinking eyes, fluffy white fur trim and a wide open smile, its striped cloth body behind, balancing on top of three tall red poles
    Lc('M60 222V150M120 222V136M180 222V150', '#C62828', 10) + Lc('M54 150h12M114 136h12M174 150h12', INK, 4)
      + P('M126 130c30-8 64-4 86 18-6 20-30 26-52 20z', '#FFCA28') + Lc('M150 140c8-4 16-4 24 0M176 134c8 0 16 4 22 10', '#E53935', 5)
      + P('M48 92c0-40 32-64 72-64s72 24 72 64c0 32-32 52-72 52s-72-20-72-52z', '#FFCA28') + P('M60 112c10 22 34 30 60 30s50-8 60-30c-14 8-36 12-60 12s-46-4-60-12z', '#E53935')
      + Lc('M52 80c-8 4-12 12-10 22M188 80c8 4 12 12 10 22M56 118c-6 8-6 16 0 24M184 118c6 8 6 16 0 24', '#FFFFFF', 7)
      + C(120, 46, 10, '#B3E5FC') + C(120, 46, 5, '#FFFFFF', 2) + P('M112 34c2-10 14-10 16 0', '#E53935', 3)
      + Lc('M76 66q14-12 28 0M136 66q14-12 28 0', '#E53935', 6) + C(92, 84, 15, '#FFFFFF') + C(148, 84, 15, '#FFFFFF') + C(94, 86, 7, INK, 0) + C(150, 86, 7, INK, 0) + C(97, 82, 2.5, '#FFFFFF', 0) + C(153, 82, 2.5, '#FFFFFF', 0)
      + P('M96 110q24 22 48 0z', '#FFFFFF') + E(72, 106, 9, 5, '#FF8FA3', 0) + E(168, 106, 9, 5, '#FF8FA3', 0)),
  L('flowermarket', 'ตลาดดอกไม้วันตรุษจีนของกวางโจว', 'Guangzhou’s Spring Festival flower market', ['spring festival flower market', 'ตลาดดอกไม้วันตรุษจีน', 'flower market', 'ตลาดดอกไม้', 'kumquat tree', 'ต้นส้มจี๊ด', 'peach blossom', 'ดอกท้อ', 'chinese new year', 'ตรุษจีน', 'city of flowers', 'เมืองแห่งดอกไม้', 'lanterns', 'โคมไฟ'], 'หาส้มจี๊ดลูกเล็กๆ บนต้นในกระถาง', 'Find the little kumquats on the tree in the pot',
    // a flower stall under a red arch hung with lanterns: a round kumquat tree full of little orange fruits in a blue pot with a smiling face, a branch of pink peach blossom in a tall vase, pots of yellow chrysanthemums
    bg('#FFF3E0') + low(196, '#FFCC80') + frame + Lc('M30 200V48M210 200V48', '#C62828', 8) + P('M22 50c40-24 156-24 196 0l-4 12c-40-20-148-20-188 0z', '#E53935')
      + [70, 120, 170].map((x) => Lc(`M${x} 46v8`, INK, 2) + E(x, 66, 10, 12, '#FF7043', 2.5) + Lc(`M${x} 78v6`, '#FFCA28', 2.5)).join('')
      + C(98, 128, 38, '#43A047') + [[78, 110], [96, 102], [116, 112], [86, 130], [108, 134], [124, 124], [74, 142], [118, 146], [96, 150]].map(([x, y]) => C(x, y, 6, '#FF9800', 2)).join('')
      + P('M70 166h56l-6 36H76z', '#1E88E5') + face(98, 182, 0.28)
      + R(150, 150, 22, 52, '#B2DFDB', 6) + Lc('M160 150c-4-30 6-60 20-80M164 120c10-8 20-8 26-4M158 100c-10-6-16-6-22-2', '#6D4C41', 4)
      + [[180, 72], [190, 116], [136, 98], [172, 96], [154, 124]].map(([x, y]) => [0, 72, 144, 216, 288].map((a) => g(x, y, 1, C(0, -4.5, 4, '#F48FB1', 1.5), a)).join('') + C(x, y, 2, '#FFF59D', 0)).join('')
      + [[44, 196], [196, 196]].map(([x, y]) => R(x - 12, y - 6, 24, 14, '#A1887F', 3, 3) + C(x - 6, y - 12, 7, '#FFD54F', 2.5) + C(x + 6, y - 12, 7, '#FFEB3B', 2.5)).join('')),
  L('whitetiger', 'ลูกเสือขาวที่ซาฟารีปาร์คฉางหลง', 'White tiger cubs at Chimelong Safari Park', ['chimelong safari park', 'ซาฟารีปาร์คฉางหลง', 'chimelong safari', 'ซาฟารีฉางหลง', 'white tiger', 'เสือขาว', 'tiger cubs', 'ลูกเสือ', 'safari park', 'สวนซาฟารี', 'panyu', 'พานอวี้', 'zoo', 'สวนสัตว์'], 'หาลายทางสีเทาบนตัวลูกเสือขาว', 'Find the grey stripes on the white tiger cub',
    // two round white tiger cubs with soft grey stripes and blue eyes, one sitting up and smiling, the other curled up asleep beside it, on a sunny rock with green grass and a leafy bush behind
    bg('#F1F8E9') + low(184, '#AED581') + frame + C(196, 110, 22, '#66BB6A', 3) + C(176, 126, 16, '#81C784', 3)
      + P('M30 200c4-24 30-34 90-34s88 10 92 34z', '#BCAAA4')
      + E(168, 170, 34, 18, '#FAFAFA') + C(144, 166, 15, '#FAFAFA') + Lc('M160 156l4 10M174 154l2 12M188 158l-2 10', '#90A4AE', 3) + Lc('M136 166q4 3 8 0', INK, 2.5) + P('M134 154l4-8 6 6z', '#FAFAFA', 2.5)
      + Lc('M196 176c12 2 14-8 8-12', '#90A4AE', 4)
      + E(96, 150, 30, 26, '#FFFFFF') + C(96, 110, 30, '#FFFFFF') + P('M70 92l-4-18 16 8zM122 92l4-18-16 8z', '#FFFFFF')
      + Lc('M86 86h20M88 93h16M96 80v14M66 104l12 3M66 114l12-2M126 104l-12 3M126 114l-12-2M72 140l12 6M70 152l12 4M120 140l-12 6M122 152l-12 4', '#546E7A', 3.5)
      + C(82, 108, 5, '#64B5F6', 2) + C(110, 108, 5, '#64B5F6', 2) + C(96, 118, 4, '#F48FB1', 2) + Lc('M90 124q6 6 12 0', INK, 2.5) + E(70, 120, 6, 4, '#FF8FA3', 0) + E(122, 120, 6, 4, '#FF8FA3', 0)
      + Lc('M124 166c16 0 22-10 18-18', '#90A4AE', 5) + E(84, 174, 9, 6, '#FFFFFF') + E(108, 174, 9, 6, '#FFFFFF')),
  L('roastgoose', 'ห่านย่างกวางตุ้งแขวนหน้าร้าน', 'Cantonese roast goose hanging in the shop window', ['roast goose', 'ห่านย่าง', 'cantonese roast goose', 'ห่านย่างกวางตุ้ง', 'siu ngo', 'ซิ่วหงอ', 'roast meat shop', 'ร้านเนื้อย่าง', 'plum sauce', 'ซอสบ๊วย', 'crispy skin', 'หนังกรอบ', 'rice plate', 'ข้าวหน้าห่าน'], 'หาถ้วยซอสบ๊วยข้างเขียง', 'Find the little cup of plum sauce beside the chopping board',
    // a glossy mahogany roast goose hanging by its neck from a silver hook on a rail in a shop window, its shiny skin catching the light, below it a round wooden chopping board with sliced goose and a little cup of orange plum sauce
    bg('#FFF8E1') + frame + Lc('M36 40h168', '#90A4AE', 6) + Lc('M120 40v18c0 8-10 8-10 2', '#B0BEC5', 4)
      + P('M110 60c-2 6-2 12 2 16 4 6 4 14 2 22-22 8-38 28-36 52 2 24 20 34 42 34s40-10 42-34c2-24-14-44-36-52-4-8-6-18-4-28 2-6-4-12-12-10z', '#A1562B') + P('M96 118c-8 10-10 24-6 36 10-6 16-20 16-36z', '#7B3F1E') + P('M144 118c8 10 10 24 6 36-10-6-16-20-16-36z', '#7B3F1E') + Lc('M104 132c6-10 18-14 28-10', '#E8A15C', 4)
      + face(120, 140, 0.4) + E(120, 210, 64, 12, '#8D6E63') + E(120, 204, 64, 12, '#D7B98A')
      + [[-30, 0], [-12, 2], [6, 2], [24, 0]].map(([dx, dy]) => g(120 + dx, 200 + dy, 1, R(-9, -6, 18, 12, '#A1562B', 3, 2.5) + Lc('M-6-2h12', '#FFE0B2', 2.5), dx / 5)).join('')
      + E(196, 196, 16, 7, '#FFFFFF') + E(196, 194, 11, 4, '#FF8A65', 0) + E(196, 206, 16, 6, '#FFFFFF') + Lc('M180 196v10M212 196v10', INK, 3)),
  L('doubleskin', 'นมสองชั้นกับถั่วแดง', 'Double-skin milk with red beans', ['double-skin milk', 'นมสองชั้น', 'shuang pi nai', 'ซวงผีไหน่', 'milk pudding', 'พุดดิ้งนม', 'steamed milk', 'นมนึ่ง', 'red beans', 'ถั่วแดง', 'dessert shop', 'ร้านขนมหวาน', 'shunde', 'ซุ่นเต๋อ'], 'หาผิวนมย่นๆ ที่ปิดหน้าถ้วย', 'Find the wrinkly milk skin on top of the bowl',
    // a round blue-and-white bowl filled with smooth white steamed milk, a soft wrinkled skin on top, a spoonful of dark red beans in the middle, a little spoon dipped in, two wisps of steam
    E(120, 196, 76, 14, '#E0E0E0', 0) + P('M38 120h164c-4 46-38 74-82 74s-78-28-82-74z', '#FFFFFF') + Lc('M54 150c20 8 40 8 66 0s48-8 66 0', '#42A5F5', 4) + Lc('M70 172c16 6 34 6 50 0s34-6 50 0', '#90CAF9', 3)
      + E(120, 120, 82, 22, '#FFFDE7') + Lc('M56 118c10-6 20 4 30-2s20 6 30 0 20 6 30 0 20 4 30-2', '#F5E6B8', 3)
      + [[108, 116], [118, 112], [128, 116], [114, 124], [126, 124], [120, 118]].map(([x, y]) => E(x, y, 5, 4, '#8D2A2A', 2)).join('')
      + Lc('M170 116l34-40', '#FFFFFF', 8) + Lc('M170 116l34-40', INK, 2) + E(162, 122, 12, 7, '#FFFFFF')
      + face(120, 160, 0.38) + Lc('M84 92c-6-10 6-16 0-26M150 92c-6-10 6-16 0-26', '#B0BEC5', 4)),
  L('boatcongee', 'โจ๊กเรือของกวางโจว', 'Guangzhou boat congee', ['boat congee', 'โจ๊กเรือ', 'ting zai congee', 'ถิงไจ่โจว', 'tingzai zhou', 'congee', 'โจ๊ก', 'rice porridge', 'ข้าวต้ม', 'peanuts', 'ถั่วลิสง', 'liwan lake', 'ทะเลสาบลี่วาน', 'little boat', 'เรือลำเล็ก'], 'หาถั่วลิสงกับต้นหอมบนโจ๊ก', 'Find the peanuts and spring onion on the congee',
    // a little wooden sampan boat with a curved rain cover floating on a green lake, a big steaming bowl of white congee sitting on its front deck topped with peanuts, crispy dough and green spring onion
    bg('#E0F2F1') + low(150, '#4DB6AC') + frame + Lc('M40 210c10-5 20 5 30 0M150 212c10-5 20 5 30 0', '#E0F2F1', 4)
      + P('M24 156c30 30 162 30 192 0l-8 28c-30 18-146 18-176 0z', '#A1887F') + Lc('M30 166c40 14 140 14 180 0', '#6D4C41', 3)
      + P('M128 156v-30c0-24 74-24 74 0v30z', '#FFCC80') + Lc('M140 130v26M164 120v36M188 130v26', '#E0A060', 3)
      + P('M48 112h76c-2 26-18 40-38 40s-36-14-38-40z', '#FFFFFF') + Lc('M54 132c10 4 22 4 32 0s22-4 32 0', '#E53935', 3) + E(86, 112, 38, 10, '#FFF8E1')
      + [[72, 110], [80, 106], [98, 110], [104, 106]].map(([x, y]) => E(x, y, 4, 3, '#C68B59', 1.5)).join('') + [[88, 112], [62, 108], [110, 112]].map(([x, y]) => C(x, y, 2.5, '#66BB6A', 1.5)).join('')
      + R(76, 102, 16, 6, '#FFB74D', 2, 1.5) + face(86, 136, 0.28) + Lc('M70 92c-6-10 6-16 0-26M100 92c-6-10 6-16 0-26', '#B0BEC5', 4)),
];

export default {
  places: {
    'cn-guangzhou': { country: 'cn', wave: 3, name: nm('กวางโจว', 'Guangzhou'), tz: 'Asia/Shanghai', ll: [23.13, 113.26], alias: ['guangzhou', 'กวางโจว', '广州', 'canton tower', 'canton fair', 'yuexiu', 'เยว่ซิ่ว', 'shamian', 'ซาเมี่ยน', 'tianhe', 'เทียนเหอ', 'zhujiang new town', 'haixinsha', 'ไห่ซินซา', 'liwan', 'ลี่วาน', 'panyu', 'พานอวี้', 'chimelong safari', 'baiyun mountain'], colors: GZ },
  },
  items,
};
