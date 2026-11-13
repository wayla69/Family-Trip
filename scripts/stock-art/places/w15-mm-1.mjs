// Wave 15, Myanmar: the country layer — stamp, flag, hello, two guides, foods, crafts, music, birds and the truck up the mountain
// (no Buddha images, no monks as the subject, no marionettes or chinlone — the library has them —, temples only as buildings)
import { P, R, C, E, Lc, g, face, free, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const G = (cc, key, th, en, hth, hen, kw, svg) => ({ id: `${cc}.guide.${key}`, cat: 'guide', file: `${cc}/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });
const flagShape = 'M44 38c40-12 84 12 126 0s28-4 42 0v112c-14-4 0-12-42 0s-86-12-126 0z';
const pole = Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A');
const band = (k, n, fill) => `<path d="M44 ${38 + (k + 0.5) * (112 / n)}c40-12 84 12 126 0s28-4 42 0" stroke="${fill}" stroke-width="${(112 / n + 1).toFixed(1)}" fill="none" stroke-linecap="butt"/>`;
const star = (cx, cy, r, ri = r * 0.42) => 'M' + Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + (k * Math.PI) / 5, rr = k % 2 ? ri : r; return `${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`; }).join('L') + 'z';
const MM = { k1: '#E8A400', k2: '#1E8C3A', k3: '#FFF8E1' };
const T = (id, cat, slug, th, en, kw, svg, extra = {}) => ({ id: `mm.${cat}.${slug}`, cat, file: `mm/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, ...extra, svg: free(svg) });

const items = [
  { id: 'mm.stamp', cat: 'stamp', file: 'mm/stamp.v1.svg', name: nm('ตราประทับเมียนมา', 'Myanmar stamp'), kw: ['myanmar', 'เมียนมา', 'burma', 'พม่า', 'padauk', 'ดอกประดู่'],
    // two arching sprays of golden padauk blossoms, the flower of the new year, with little green leaves
    svg: countryStamp({ name: 'MYANMAR', ...MM, emblem: Lc('M64 136c4-40 22-70 54-84M136 136c-4-34-16-56-36-70', '#8D6E63', 4)
      + [[70, 110, -30], [84, 80, -20], [128, 104, 30], [116, 78, 20]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 13, 6, '#66BB6A', 2.5), r)).join('')
      + [[76, 96], [94, 66], [118, 54], [124, 90], [106, 70], [140, 120], [62, 124]].map(([x, y]) => [[-6, -4], [5, -5], [0, 5], [-7, 6], [7, 4]].map(([dx, dy]) => C(x + dx, y + dy, 4.5, '#FFC107', 1.8)).join('') + C(x, y, 2.5, '#FF8F00', 0)).join('') }) },
  { id: 'mm.flag', ch: '🇲🇲', cat: 'flag', file: 'mm/flag.v1.svg', name: nm('ธงเมียนมา', 'Flag of Myanmar'), kw: ['myanmar', 'เมียนมา', 'burma', 'พม่า', 'flag', 'ธง'],
    // yellow, green and red stripes with a big white five-pointed star across the middle
    svg: free(pole + P(flagShape, '#FECB00') + band(1, 3, '#34B233') + band(2, 3, '#EA2839') + P(star(128, 96, 46), '#FFFFFF', 0) + P(flagShape, 'none')) },
  { id: 'mm.hello', cat: 'hello', file: 'mm/hello.v1.svg', name: nm('มิงกะลาบา สวัสดี', 'Mingalaba, hello'), kw: ['mingalaba', 'มิงกะลาบา', 'hello', 'สวัสดี', 'burmese', 'ภาษาพม่า', 'thanaka', 'ทานาคา', 'longyi', 'โสร่ง'],
    // a child in a white shirt and a green checked longyi, round patches of pale yellow thanaka on both cheeks, waving
    svg: free(P('M86 214l6-56h56l6 56z', '#43A047') + Lc('M90 176h60M88 196h64M108 160l-4 54M132 160l4 54', '#1B5E20', 2.5) + P('M84 168c0-26 16-38 36-38s36 12 36 38z', '#FFFFFF')
      + P('M154 150c12-16 18-34 16-50l14 2c2 20-6 40-18 54z', '#C98B5A') + C(178, 94, 11, '#C98B5A') + C(120, 108, 32, '#C98B5A') + P('M88 104c0-28 14-40 32-40s32 12 32 40c-6-14-18-22-32-22s-26 8-32 22z', INK)
      + E(96, 120, 11, 9, '#F3DFA2', 0) + E(144, 120, 11, 9, '#F3DFA2', 0) + face(120, 112, 0.6)) },
  G('mm', 'mwe', 'มเว', 'Mwe', 'มิงกะลาบา {name}! มเวขดตัวรอพาเที่ยวเมียนมาอยู่', 'Mingalaba, {name}! Mwe is all curled up and ready to show you Myanmar', ['burmese python', 'งูหลามพม่า', 'python', 'งูหลาม', 'snake', 'งู'],
    // a baby Burmese python coiled in three fat rings, golden with brown blotches, its round head raised with a big smile and a little forked tongue
    [[120, 196, 78, 20], [120, 168, 62, 18], [120, 144, 46, 16]].map(([x, y, rx, ry]) => E(x, y, rx, ry, '#E2B867') + [-0.6, -0.2, 0.2, 0.6].map((f) => E(x + f * rx, y + 2, 9, ry * 0.45, '#9C6B3A', 0)).join('')).join('')
      + Lc('M150 146c14-16 10-40-10-52', '#E2B867', 22) + Lc('M150 146c14-16 10-40-10-52', INK, 2)
      + E(124, 82, 44, 34, '#E2B867') + E(110, 66, 10, 6, '#9C6B3A', 0) + E(140, 64, 8, 5, '#9C6B3A', 0) + Lc('M124 112v10l-5 6M124 122l5 6', '#E53935', 2.5) + face(124, 84, 1, 'none') + P('M114 96q10 8 20 0', 'none', 3)),
  G('mm', 'hintha', 'ฮินต้า', 'Hintha', 'ฮินต้าบินมาจากทะเลสาบอินเล มาเล่นกับ {name} แล้ว', 'Hintha flew in from Inle Lake to play with {name}', ['ruddy shelduck', 'เป็ดพม่า', 'shelduck', 'duck', 'เป็ด', 'hintha bird', 'นกหงส์'],
    // a ruddy shelduck: a round orange body, a pale cream head, a dark beak, black wingtips and a white wing patch, paddling on a ripple
    Lc('M40 210c20-6 40 6 60 0s40-6 60 0 40 6 50 0', '#4FC3F7', 4) + E(128, 160, 78, 46, '#E07B39') + P('M90 150c20-16 60-20 96-6-16 22-56 30-96 6z', '#C9622A', 3) + P('M168 150c14-4 28 0 36 10-14 4-28 2-36-10z', '#FFFFFF', 3) + P('M196 156c10 0 18 4 22 10-10 2-18 0-22-10z', INK, 0)
      + C(90, 92, 42, '#F6E2BE') + Lc('M62 124c10 8 46 8 56 0', INK, 3) + P('M50 98c-16 0-24 6-26 12 10 4 22 2 28-4z', '#37474F') + face(96, 90, 0.9, 'none') + P('M90 104q6 5 12 0', 'none', 2.5)),

  // foods
  T('mm', 'food', 'mohinga', 'โมฮินกา ขนมจีนน้ำยาปลาพม่า', 'Mohinga, Myanmar’s fish noodle breakfast', ['mohinga', 'โมฮินกา', 'fish noodle soup', 'ขนมจีนน้ำยาปลา', 'breakfast', 'อาหารเช้า', 'banana stem', 'หยวกกล้วย', 'burmese food', 'อาหารพม่า'],
    // a big bowl of thin rice noodles in thick golden fish broth, topped with crunchy fritters, half a boiled egg, pale banana-stem rings, coriander and a lime wedge
    E(120, 200, 92, 14, '#E0E0E0', 0) + P('M30 112h180c-4 60-44 88-90 88s-86-28-90-88z', '#FFFFFF') + Lc('M40 140h160', '#E53935', 4) + E(120, 112, 90, 22, '#F2A93B')
      + Lc('M56 110c14 8 28-8 42 0s28-8 42 0 28-8 44 0', '#FFF3D6', 4) + [[76, 104], [104, 98], [158, 104]].map(([x, y]) => C(x, y, 12, '#C8862F', 2.5) + Lc(`M${x - 6} ${y - 2}h12M${x - 4} ${y + 4}h8`, '#8D5524', 2)).join('')
      + E(134, 112, 14, 10, '#FFFFFF', 2.5) + C(134, 112, 6, '#FFCA28', 0) + [[92, 120], [176, 112]].map(([x, y]) => C(x, y, 7, '#F1F8E9', 2) + C(x, y, 3, '#C5E1A5', 0)).join('') + [[62, 120], [116, 96], [182, 98]].map(([x, y]) => P(`M${x} ${y}l6-6 3 8z`, '#43A047', 1.5)).join('')
      + P('M188 86l20-10 4 16z', '#C0CA33', 2.5) + face(120, 160, 0.55)),
  T('mm', 'food', 'laphet', 'ลาเพ็ตโต่ะ ยำใบชาหมัก', 'Laphet thoke, the pickled tea-leaf salad', ['laphet thoke', 'ลาเพ็ตโต่ะ', 'tea leaf salad', 'ยำใบชา', 'pickled tea', 'ใบชาหมัก', 'fried beans', 'ถั่วทอด', 'lacquer tray', 'burmese salad'],
    // a round red lacquer tray split into petal-shaped dishes: dark green pickled tea leaves in the middle, round it fried beans, peanuts, sesame, garlic chips, dried shrimp and tomato
    E(120, 196, 96, 14, '#E0E0E0', 0) + C(120, 124, 92, '#B71C1C') + C(120, 124, 82, '#E53935') + Lc('M120 124m-82 0a82 82 0 1 0 164 0a82 82 0 1 0-164 0', '#FFC107', 2.5)
      + [0, 1, 2, 3, 4, 5].map((k) => { const a = (k / 6) * Math.PI * 2 - Math.PI / 2, x = 120 + Math.cos(a) * 54, y = 124 + Math.sin(a) * 54; const fill = ['#D7A86E', '#C68642', '#FFF8E1', '#F5E6B8', '#FF8A65', '#EF5350'][k];
        return C(x, y, 22, '#3E2723', 2.5) + [[-7, -5], [6, -6], [-2, 6], [8, 5], [-9, 6]].map(([dx, dy]) => (k === 2 ? C(x + dx, y + dy, 2.2, '#5D4037', 0) : k === 4 ? Lc(`M${x + dx - 4} ${y + dy}q4-6 8 0`, fill, 3) : E(x + dx, y + dy, 5, 3.5, fill, 1.2))).join(''); }).join('')
      + C(120, 124, 26, '#3E2723', 2.5) + [[-9, -8], [8, -10], [-12, 6], [10, 6], [0, 0], [0, 13]].map(([dx, dy]) => g(120 + dx, 124 + dy, 1, P('M-6 0c2-6 10-6 12 0-2 5-10 5-12 0z', '#2E7D32', 1.2), dx * 4)).join('') + face(120, 118, 0.42)),
  T('mm', 'food', 'shannoodles', 'ข้าวซอยไทใหญ่ ก๋วยเตี๋ยวไทใหญ่', 'Shan noodles with tomato chicken', ['shan noodles', 'ก๋วยเตี๋ยวไทใหญ่', 'shan khao swe', 'ข้าวซอยไทใหญ่', 'tomato sauce', 'ซอสมะเขือเทศ', 'peanuts', 'ถั่วลิสง', 'pickled mustard greens', 'ผักกาดดอง'],
    // a bowl of flat rice noodles under a spoonful of orange tomato-and-chicken sauce, crushed peanuts and spring onion, a little dish of pickled greens and chopsticks
    E(120, 200, 92, 14, '#E0E0E0', 0) + P('M36 118h150c-4 54-36 80-75 80s-71-26-75-80z', '#FFF8E1') + Lc('M44 146h134', '#26A69A', 4) + E(111, 118, 75, 18, '#FFF3D6')
      + Lc('M56 116c10-6 20 6 30 0s20 6 30 0 20 6 30 0 16 4 24 0', '#F5E0B0', 4) + P('M84 112c6-18 48-18 54 0-10 8-44 8-54 0z', '#E8572D', 3) + [[92, 104], [104, 100], [120, 102], [130, 108]].map(([x, y]) => C(x, y, 3.5, '#D7A86E', 1.2)).join('') + [[98, 112], [116, 108], [126, 100]].map(([x, y]) => Lc(`M${x} ${y}h6`, '#7CB342', 3)).join('')
      + E(198, 172, 24, 10, '#FFFFFF', 2.5) + E(198, 168, 16, 5, '#9CCC65', 0) + Lc('M168 60l-40 52M182 62l-46 52', '#A1673F', 4) + face(111, 158, 0.5)),
  T('mm', 'food', 'shantofu', 'เต้าหู้ไทใหญ่ ถั่วลูกไก่สีเหลือง', 'Shan tofu, the yellow chickpea tofu', ['shan tofu', 'เต้าหู้ไทใหญ่', 'chickpea tofu', 'เต้าหู้ถั่วลูกไก่', 'tohu', 'โตหู่', 'fried tofu', 'เต้าหู้ทอด', 'tofu salad', 'ยำเต้าหู้'],
    // a soft yellow slab of chickpea tofu with a smiling face, golden fried triangles fanned beside it on a banana leaf and a little bowl of chilli dip
    P('M20 196c40-30 160-30 200 0-40 14-160 14-200 0z', '#7CB342') + Lc('M40 192c40-12 120-12 160 0', '#558B2F', 2)
      + R(44, 120, 84, 60, '#FFE082', 8) + Lc('M50 132h72', '#FFF8E1', 3) + face(86, 150, 0.6)
      + [[150, 166, 0], [168, 150, 20], [184, 170, -15]].map(([x, y, r]) => g(x, y, 1, P('M-18 12l18-30 18 30z', '#F2A93B') + Lc('M-10 8l10-16', '#FFE082', 2.5), r)).join('')
      + E(176, 104, 22, 10, '#FFFFFF', 2.5) + E(176, 100, 15, 5, '#E53935', 0) + [[170, 98], [182, 100]].map(([x, y]) => C(x, y, 1.6, '#FFCDD2', 0)).join('')),
  T('mm', 'food', 'falooda', 'ฟาลูดาย่างกุ้ง', 'A tall glass of Yangon falooda', ['falooda', 'ฟาลูดา', 'rose syrup', 'น้ำกุหลาบ', 'jelly', 'วุ้น', 'ice cream', 'ไอศกรีม', 'basil seeds', 'เม็ดแมงลัก', 'dessert drink'],
    // a tall glass in pink layers of rose milk, cubes of jelly and speckles of basil seeds, a scoop of ice cream on top with a cherry and a striped straw
    P('M80 64h80l-10 140H90z', '#F8BBD0') + P('M86 150h68l-4 54H90z', '#EC407A', 0) + [[100, 168, '#81C784'], [124, 178, '#FFF176'], [138, 160, '#81C784'], [110, 188, '#CE93D8']].map(([x, y, c]) => R(x - 7, y - 7, 14, 14, c, 3, 2)).join('')
      + Array.from({ length: 12 }, (_, k) => C(92 + (k * 37) % 56, 100 + ((k * 23) % 40), 2, INK, 0)).join('') + P('M80 64h80l-10 140H90z', 'none') + Lc('M84 92h72', '#FFFFFF', 3)
      + P('M84 64c0-34 72-34 72 0z', '#FFF8E1') + Lc('M92 56c8-6 16 4 24-2s16 4 24-2', '#FFFFFF', 3) + C(124, 30, 9, '#E53935', 2.5) + Lc('M124 22c2-8 8-12 14-12', '#43A047', 2.5)
      + g(166, 50, 1, R(-4, -40, 8, 90, '#FFFFFF', 3) + Lc('M-4-28l8 6M-4-8l8 6M-4 12l8 6', '#E53935', 3), 18) + face(120, 122, 0.5)),
  T('mm', 'food', 'kyaukkyaw', 'จ๊อกจอ วุ้นกะทิสองชั้น', 'Kyauk kyaw, two-layer coconut jelly', ['kyauk kyaw', 'จ๊อกจอ', 'coconut jelly', 'วุ้นกะทิ', 'agar jelly', 'วุ้น', 'burmese dessert', 'ขนมพม่า', 'snack', 'ของว่าง'],
    // diamond-cut pieces of jelly on a blue plate: a white coconut layer on top of a clear amber layer, the middle piece smiling
    E(120, 168, 100, 34, '#90CAF9') + E(120, 164, 86, 26, '#E3F2FD', 3)
      + [[66, 138], [174, 138], [120, 124]].map(([x, y], k) => P(`M${x - 30} ${y}l30-16 30 16v22l-30 16-30-16z`, '#E0A040') + P(`M${x - 30} ${y}l30-16 30 16-30 16z`, '#FFFDF5') + P(`M${x - 30} ${y}v10l30 16 30-16v-10l-30 16z`, '#FFFFFF') + Lc(`M${x - 22} ${y + 22}l8 4`, '#FFE0B2', 3) + (k === 2 ? face(x, y + 22, 0.38) : '')).join('')),

  // crafts and music
  T('mm', 'culture', 'thanaka', 'ทานาคา แป้งเปลือกไม้ทาหน้า', 'Thanaka, the bark paste for cheeks', ['thanaka', 'ทานาคา', 'bark paste', 'แป้งทานาคา', 'grinding stone', 'หินฝน', 'sun cream', 'กันแดด', 'burmese beauty', 'ทาแก้ม'],
    // a round grey grinding slab with a puddle of creamy yellow paste and a short log of thanaka wood rubbed on it, its cut end smiling
    E(120, 178, 92, 30, '#90A4AE') + E(120, 170, 86, 24, '#B0BEC5') + P('M74 168c8-14 70-16 92 0-16 12-74 14-92 0z', '#F3DFA2', 0) + Lc('M60 186c20 10 100 10 120 0', '#78909C', 3)
      + g(132, 124, 1, R(-56, -18, 100, 36, '#A1673F', 6) + Lc('M-46-8h70M-40 6h60', '#7B4B26', 2.5) + E(44, 0, 12, 18, '#E8C27A') + C(44, 0, 6, 'none', 2) + Lc('M50 18c6 6 10 10 14 10', '#F3DFA2', 6), -20)
      + face(110, 132, 0.45) + [[60, 120], [196, 132]].map(([x, y]) => C(x, y, 5, '#F3DFA2', 2)).join('')),
  T('mm', 'culture', 'longyi', 'โสร่งลองยี', 'A checked longyi', ['longyi', 'ลองยี', 'sarong', 'โสร่ง', 'checked cloth', 'ผ้าตาหมากรุก', 'paso knot', 'ปมผ้า', 'burmese clothes', 'ชุดพม่า'],
    // a tube of green and blue checked cloth laid flat, wider at the hem, the waist rolled and tucked into a big soft knot at the front
    P('M70 58h100l26 156H44z', '#2E7D32')
      + Array.from({ length: 6 }, (_, k) => Lc(`M${76 + k * 18} 60l${-28 + k * 11} 152`, '#1565C0', 6)).join('') + Array.from({ length: 6 }, (_, k) => Lc(`M${66 - k * 4} ${84 + k * 22}h${108 + k * 8}`, '#81C784', 3)).join('')
      + P('M70 58h100l26 156H44z', 'none') + R(62, 46, 116, 20, '#388E3C', 8) + Lc('M70 56h100', '#1565C0', 3) + P('M100 60c0-16 40-16 40 0 0 14-8 22-20 40-12-18-20-26-20-40z', '#43A047') + Lc('M108 62c6 6 18 6 24 0M114 76l6 14 6-14', '#1B5E20', 2.5) + face(120, 150, 0.6)),
  T('mm', 'culture', 'saung', 'พิณซอง พิณรูปเรือ', 'The saung, Myanmar’s boat-shaped harp', ['saung', 'ซอง', 'burmese harp', 'พิณพม่า', 'arched harp', 'พิณโค้ง', 'music', 'ดนตรี', 'traditional music', 'ดนตรีพื้นเมือง'],
    // a red-and-gold boat-shaped soundbox with a long neck curving up like a fern frond, silk strings fanning down to the body
    P('M30 170c30 36 140 40 176 6l-6-10H34z', '#C62828') + Lc('M40 172c40 18 120 20 156 2', '#FFC107', 4) + [70, 100, 130, 160].map((x) => C(x, 182, 4, '#FFC107', 1.5)).join('')
      + Lc('M40 166c-10-50 6-110 50-138 30-18 62-10 66 12 2 16-14 22-22 14-6-6-2-16 6-14', '#8D2A12', 12) + Lc('M40 166c-10-50 6-110 50-138 30-18 62-10 66 12 2 16-14 22-22 14-6-6-2-16 6-14', '#FFC107', 3)
      + Array.from({ length: 9 }, (_, k) => { const t = 0.12 + k * 0.08; const x = 40 + t * 120, y = 160 - Math.sin(t * Math.PI * 0.95) * 120; return Lc(`M${x.toFixed(1)} ${y.toFixed(1)}L${(60 + k * 16).toFixed(1)} 168`, '#FFF8E1', 1.6); }).join('')
      + [[42, 112], [56, 70], [86, 34]].map(([x, y]) => C(x, y, 4, '#E53935', 1.5)).join('') + face(150, 186, 0.4)),
  T('mm', 'culture', 'kalaga', 'กาละกา ผ้าปักเลื่อมนูน', 'Kalaga, a padded sequin tapestry', ['kalaga', 'กาละกา', 'sequin tapestry', 'ผ้าปักเลื่อม', 'embroidery', 'งานปัก', 'appliqué', 'ผ้าปะ', 'mandalay craft', 'souvenir'],
    // a black velvet hanging on a wooden rod, sewn with a padded golden bird among flowers and borders of glittering sequins, tassels at the bottom
    Lc('M30 34h180', '#8D6E63', 8) + [44, 196].map((x) => C(x, 34, 7, '#A1673F')).join('') + R(46, 40, 148, 160, '#263238', 6)
      + '<rect x="56" y="50" width="128" height="140" rx="3" fill="none" stroke="#FFD54F" stroke-width="5.5" stroke-dasharray="0.1 9"/>'
      + E(120, 122, 34, 24, '#FFC107', 2.5) + C(94, 98, 14, '#FFC107', 2.5) + P('M80 98l-10 4 10 4z', '#FF7043', 1.5) + P('M150 112c18-20 24-2 12 10 14 4 6 20-10 12z', '#E53935', 2.5) + Lc('M100 128c10 6 26 6 36 0', '#FF7043', 3)
      + [[74, 160, '#EC407A'], [166, 160, '#29B6F6'], [166, 76, '#AB47BC']].map(([x, y, c]) => [0, 72, 144, 216, 288].map((a) => g(x, y, 1, E(0, -7, 4.5, 7, c, 1.5), a)).join('') + C(x, y, 3.5, '#FFD54F', 1.2)).join('')
      + [60, 84, 108, 132, 156, 180].map((x) => Lc(`M${x} 200v14`, '#E53935', 4)).join('') + face(120, 122, 0.4)),
  T('mm', 'culture', 'patwaing', 'ปัตวาย วงกลองล้อมตัว', 'The pat waing drum circle', ['pat waing', 'ปัตวาย', 'drum circle', 'วงกลอง', 'hsaing waing', 'วงปี่พาทย์พม่า', 'tuned drums', 'กลอง', 'orchestra', 'ดนตรีพม่า'],
    // a round wall of red panels carved with golden flame points, a ring of little tuned drums peeping over the top inside, a pair of drumsticks resting on the rim
    E(120, 112, 96, 30, '#B71C1C') + E(120, 112, 84, 22, '#4E342E', 3)
      + [[56, 106], [80, 98], [106, 94], [134, 94], [160, 98], [184, 106]].map(([x, y]) => E(x, y, 11, 7, '#F5E6C8', 2.5) + C(x, y, 2, INK, 0)).join('')
      + P('M24 112v62c0 40 192 40 192 0v-62c0 40-192 40-192 0z', '#C62828') + Lc('M26 150c30 30 158 30 188 0', '#FFC107', 5) + Array.from({ length: 11 }, (_, k) => { const x = 36 + k * 16.8, y = 112 + 30 * Math.sqrt(Math.max(0, 1 - ((x - 120) / 96) ** 2)); return P(`M${(x - 7).toFixed(1)} ${(y + 4).toFixed(1)}q7-10 0-24q14 12 7 24z`, '#FFC107', 2.5); }).join('')
      + [60, 120, 180].map((x) => C(x, 182 + (x === 120 ? 12 : 4), 5, '#FFC107', 2)).join('') + Lc('M156 60l40-30M168 68l42-24', '#8D6E63', 4) + [[196, 30], [210, 44]].map(([x, y]) => C(x, y, 5, '#FFF8E1', 2)).join('') + face(120, 170, 0.55)),
  T('mm', 'culture', 'gaungbaung', 'กองบอง ผ้าโพกศีรษะพม่า', 'A gaung baung silk headwrap', ['gaung baung', 'กองบอง', 'headwrap', 'ผ้าโพกหัว', 'silk turban', 'ผ้าไหม', 'formal dress', 'ชุดพิธี', 'burmese hat', 'หมวกพม่า'],
    // a round pink silk headwrap with neat folded bands and a fan-shaped flap of cloth sticking out at one side, sitting on a little stand
    R(100, 192, 40, 10, '#A1673F', 3) + Lc('M120 192v-20', '#8D6E63', 6) + P('M56 156c-6-50 28-78 64-78s70 28 64 78z', '#F48FB1')
      + Array.from({ length: 4 }, (_, k) => Lc(`M${60 + k * 2} ${142 - k * 16}c30 ${10 - k * 2} 90 ${10 - k * 2} ${120 - k * 4} 0`, '#EC407A', 3)).join('') + Lc('M56 156c20 12 108 12 128 0', '#AD1457', 4)
      + P('M60 112c-24-6-40-22-44-40 16 0 34 8 44 20-6-18-4-34 4-44 10 12 12 30 8 46z', '#FCE4EC') + Lc('M30 78l26 30M52 66l10 40', '#F48FB1', 2.5) + face(124, 132, 0.55)),

  // birds
  T('mm', 'animal', 'sandpiper', 'นกชายเลนปากช้อน', 'The spoon-billed sandpiper', ['spoon-billed sandpiper', 'นกชายเลนปากช้อน', 'sandpiper', 'นกชายเลน', 'shorebird', 'นกน้ำ', 'gulf of mottama', 'อ่าวเมาะตะมะ', 'mudflat', 'หาดเลน'],
    // a tiny round brown-and-white shorebird with a spoon-shaped tip on its beak, standing on the shiny mudflat beside its little footprints
    P('M0 196c60-12 180-12 240 0v28H0z', '#A1887F') + Lc('M20 206c30-4 60 4 90 0', '#D7CCC8', 3) + [[40, 212], [62, 208], [84, 214]].map(([x, y]) => Lc(`M${x} ${y}l-5-6M${x} ${y}v-7M${x} ${y}l5-6`, '#6D4C41', 2)).join('')
      + Lc('M118 170l-6 30M138 170l4 30', '#455A64', 4) + E(132, 140, 52, 38, '#FFFFFF') + P('M96 128c20-30 70-34 92-6-26 4-56 16-92 6z', '#A1887F') + Array.from({ length: 6 }, (_, k) => C(110 + k * 12, 118 + (k % 2) * 6, 3, '#6D4C41', 0)).join('')
      + C(92, 112, 26, '#BCAAA4') + Lc('M68 116H34', INK, 4) + E(28, 116, 10, 7, INK) + face(96, 110, 0.6, 'none') + P('M90 122q6 4 12 0', 'none', 2.5)),
  T('mm', 'animal', 'myna', 'นกเอี้ยงหงอนทอง', 'The golden-crested myna', ['golden-crested myna', 'นกเอี้ยงหงอนทอง', 'myna', 'นกเอี้ยง', 'forest bird', 'นกป่า', 'songbird', 'นกร้องเพลง', 'birdwatching', 'ดูนก'],
    // a glossy black myna with a fluffy golden crown and a golden patch at its throat, an orange beak, perched on a branch with leaves and berries
    Lc('M10 190c60-10 140-6 220 4', '#8D6E63', 10) + [[44, 180, -20], [190, 186, 25]].map(([x, y, r]) => g(x, y, 1, E(0, -10, 10, 18, '#66BB6A', 2.5), r)).join('') + [[70, 196], [80, 198], [168, 200]].map(([x, y]) => C(x, y, 6, '#E53935', 2)).join('')
      + P('M150 150c30 10 50 30 60 50-24-2-46-14-60-30z', '#263238') + E(120, 142, 50, 46, '#37474F') + P('M86 150c10 26 50 30 66 6-22 6-46 4-66-6z', '#263238', 0)
      + P('M88 96c-6-26 10-44 20-40 2-14 22-18 28-4 10-8 26 2 20 18 10 6 6 22-4 24z', '#FFC107') + E(122, 172, 20, 12, '#FFC107') + P('M68 132l-26 6 26 8z', '#FF7043', 2.5)
      + Lc('M106 186l-4 10M132 186l4 10', '#FF7043', 4) + face(116, 128, 0.75, 'none').replace(/fill="#22213A" stroke="none"/g, 'fill="#FFFFFF" stroke="none"') + P('M110 142q6 5 12 0', 'none', 2.5).replace('fill="none"', 'fill="none" stroke="#FFFFFF"')),

  // getting about
  T('mm', 'transport', 'mountaintruck', 'รถบรรทุกขึ้นพระธาตุอินทร์แขวน', 'The open truck up the Golden Rock mountain', ['open truck', 'รถบรรทุกเปิดหลัง', 'kyaiktiyo truck', 'รถขึ้นไจทีโย', 'mountain road', 'ถนนขึ้นเขา', 'benches', 'ม้านั่ง', 'golden rock', 'พระธาตุอินทร์แขวน'],
    // a big green open-backed truck with rows of wooden benches full of waving children, climbing a zigzag mountain road, the tiny golden rock on the peak far behind
    P('M-4 120l70-70 50 40 50-60 78 90z', '#A5D6A7') + C(166, 36, 8, '#FFC107', 2.5) + R(162, 44, 8, 6, '#E0E0E0', 0, 2) + Lc('M20 112l60-10 40 14 50-12', '#FFF8E1', 4)
      + R(26, 120, 140, 50, '#2E7D32', 4) + Array.from({ length: 4 }, (_, k) => Lc(`M${34 + k * 34} 120v-14`, '#8D6E63', 4)).join('') + Lc('M30 106h132', '#8D6E63', 4)
      + [[44, 100, '#FFCC80'], [76, 98, '#C98B5A'], [108, 100, '#FFE0BD'], [140, 98, '#C98B5A']].map(([x, y, s]) => C(x, y, 11, s, 2.5) + R(x - 9, y + 10, 18, 12, ['#FF7043', '#29B6F6', '#AB47BC', '#FFCA28'][(x / 32) % 4 | 0], 4, 2)).join('')
      + P('M166 130h34c10 0 16 8 18 18v22h-52z', '#43A047') + R(176, 136, 26, 16, '#E3F2FD', 3, 2.5) + C(220, 160, 5, '#FFF59D', 2)
      + [[56, 178], [186, 178]].map(([x, y]) => C(x, y, 17, INK) + C(x, y, 7, '#B0BEC5', 0)).join('') + face(96, 146, 0.45)),
];
export default {
  places: {
    mm: { country: 'mm', wave: 3, name: nm('เมียนมา', 'Myanmar'), tz: 'Asia/Yangon', alias: ['myanmar', 'เมียนมา', 'burma', 'พม่า', 'เมียนมาร์'], colors: MM },
  },
  items,
};
