// Wave 11, group nz (1 of 4): New Zealand, the country — stamp, flag, hello, two guides (a kiwi and a kea) and sixteen
// pictures of the country's own food, birds, plants and kiwiana. No sheep, no haka, no tā moko, no carved figures:
// the meeting house stands as a building only, with no face (docs/STOCK-ART.md §8).
import { P, R, C, E, Lc, g, face, free, countryStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const G = (cc, key, th, en, hth, hen, kw, svg) => ({ id: `${cc}.guide.${key}`, cat: 'guide', file: `${cc}/guide-${key}.v1.svg`, name: nm(th, en), hello: nm(hth, hen), kw: [en.toLowerCase(), th, ...kw], svg: free(svg) });
// a country picture (food, animal, culture): free-standing, no background
const K = (id, th, en, kw, svg) => { const [cc, cat, slug] = id.split('.'); return { id, cat, file: `${cc}/${cat}-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, svg: free(svg) }; };
const ring = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
const f1 = (v) => +v.toFixed(1);
// a five-pointed star (r outer radius)
const star = (x, y, r, fill, sw) => P(ring(10, (k) => { const a = -Math.PI / 2 + (k * Math.PI) / 5, rr = k % 2 ? r * 0.45 : r; return `${k ? 'L' : 'M'}${f1(x + Math.cos(a) * rr)} ${f1(y + Math.sin(a) * rr)}`; }) + 'z', fill, sw);
// a diagonal band of a rectangle (x, y, w, h), half-thickness t, from the top-left corner (dir 1) or the top-right (dir -1)
function diag(x, y, w, h, t, fill, dir = 1) {
  const L = Math.hypot(w, h), dx = (t * L) / h, dy = (t * L) / w;
  const pts = dir === 1
    ? [[x, y], [x + dx, y], [x + w, y + h - dy], [x + w, y + h], [x + w - dx, y + h], [x, y + dy]]
    : [[x + w, y], [x + w, y + dy], [x + dx, y + h], [x, y + h], [x, y + h - dy], [x + w - dx, y]];
  return P('M' + pts.map(([a, b]) => `${f1(a)} ${f1(b)}`).join('L') + 'z', fill, 0);
}
// a fern frond: a curving midrib with paired leaflets, tip curling into a koru
function frond(x, y, s, rot, leaf, under) {
  const pts = ring(9, (k) => { const t = k / 9; const yy = -t * 150, xx = Math.sin(t * 2.2) * 26, len = 30 * (1 - t * 0.75);
    return P(`M${f1(xx)} ${f1(yy)}q${f1(-len * 0.6)} ${f1(-8)} ${f1(-len)} ${f1(-16)}q${f1(len * 0.5)} ${f1(14)} ${f1(len)} ${f1(16)}z`, leaf, 2.5)
      + P(`M${f1(xx)} ${f1(yy)}q${f1(len * 0.6)} ${f1(-8)} ${f1(len)} ${f1(-16)}q${f1(-len * 0.5)} ${f1(14)} ${f1(-len)} ${f1(16)}z`, under, 2.5); });
  return g(x, y, s, pts + Lc('M0 0c6-40 26-90 24-140c-1-14-14-18-18-10s6 14 10 6', '#A5D6A7', 5) + P('M0 0c6-40 26-90 24-140c-1-14-14-18-18-10s6 14 10 6', 'none', 2), rot);
}
const NZ = { k1: '#00247D', k2: '#1E6B3A', k3: '#E8F5E9' };

const items = [
  { id: 'nz.stamp', cat: 'stamp', file: 'nz/stamp.v1.svg', name: nm('ตราประทับนิวซีแลนด์', 'New Zealand stamp'), kw: ['new zealand', 'นิวซีแลนด์', 'aotearoa', 'อาโอเทอารัว', 'kiwi'],
    // a silver fern frond curling at its tip, the four red stars of the Southern Cross beside it
    svg: countryStamp({ name: 'NEW ZEALAND', ...NZ, emblem: frond(70, 146, 0.8, 22, '#43A047', '#E0F2F1') + [[132, 56, 7], [116, 82, 7], [148, 80, 7.5], [134, 112, 8.5]].map(([x, y, r]) => star(x, y, r, '#E53935', 2)).join('') }) },
  { id: 'nz.flag', ch: '🇳🇿', cat: 'flag', file: 'nz/flag.v1.svg', name: nm('ธงนิวซีแลนด์', 'Flag of New Zealand'), kw: ['new zealand', 'นิวซีแลนด์', 'flag', 'ธง', 'southern cross', 'กางเขนใต้'],
    // a navy flag with the Union Jack in the top corner and four red stars edged in white, the Southern Cross
    svg: free(Lc('M40 222V24', '#8D6E63', 7) + C(40, 22, 8, '#FFD54A')
      + R(46, 40, 168, 104, '#00247D', 0, 0) + R(46, 40, 84, 52, '#00247D', 0, 0)
      + diag(46, 40, 84, 52, 7, '#FFFFFF', 1) + diag(46, 40, 84, 52, 7, '#FFFFFF', -1) + diag(46, 40, 84, 52, 2.6, '#C8102E', 1) + diag(46, 40, 84, 52, 2.6, '#C8102E', -1)
      + R(46, 58, 84, 16, '#FFFFFF', 0, 0) + R(80, 40, 16, 52, '#FFFFFF', 0, 0) + R(46, 61, 84, 10, '#C8102E', 0, 0) + R(83, 40, 10, 52, '#C8102E', 0, 0)
      + [[176, 58, 9], [156, 88, 9], [196, 84, 8], [178, 122, 10]].map(([x, y, r]) => star(x, y, r + 3, '#FFFFFF', 0) + star(x, y, r, '#C8102E', 0)).join('')
      + R(46, 40, 168, 104, 'none')) },
  { id: 'nz.hello', cat: 'hello', file: 'nz/hello.v1.svg', name: nm('เคีย โอรา สวัสดี', 'Kia ora, hello'), kw: ['kia ora', 'เคีย โอรา', 'hello', 'สวัสดี', 'maori', 'ภาษาเมารี', 'beanie', 'puffer jacket'],
    // a child in a bobble beanie and a puffy green jacket waving hello, a silver fern frond in the other hand
    svg: free(P('M78 214c0-42 18-60 42-60s42 18 42 60z', '#43A047') + Lc('M120 158v56', '#2E7D32', 3) + ring(3, (k) => Lc(`M${84 + k * 2} ${176 + k * 14}h${72 - k * 4}`, '#2E7D32', 2.5))
      + C(120, 114, 30, '#F1C9A5') + P('M88 108c0-30 14-42 32-42s32 12 32 42c-10-6-20-8-32-8s-22 2-32 8z', '#1E88E5') + Lc('M88 104c20-8 44-8 64 0', '#FFFFFF', 5) + C(120, 62, 9, '#FFCA28')
      + P('M156 150c12-16 16-34 14-50l14 2c2 20-4 40-16 56z', '#43A047') + C(178, 94, 11, '#F1C9A5')
      + g(66, 210, 0.5, frond(0, 0, 1, -20, '#66BB6A', '#E0F2F1')) + P('M84 152c-6 10-14 28-16 44l12 4c4-16 10-30 16-40z', '#43A047') + C(72, 196, 8, '#F1C9A5')
      + face(120, 118, 0.55)) },
  G('nz', 'kiri', 'คีรี', 'Kiri', 'เคีย โอรา {name}! คีรีพาเที่ยวนิวซีแลนด์เอง', 'Kia ora, {name}! Kiri will show you New Zealand', ['kiwi', 'กีวี', 'kiwi bird', 'นกกีวี', 'flightless bird', 'นกบินไม่ได้', 'national bird'],
    // a round, fuzzy brown kiwi: a ball of hair-like feathers, a long thin curved beak with whiskers, strong little feet
    ring(18, (k) => { const a = (k / 18) * Math.PI * 2; return P(`M${f1(120 + Math.cos(a) * 74)} ${f1(130 + Math.sin(a) * 64)}l${f1(Math.cos(a + 0.4) * 14)} ${f1(Math.sin(a + 0.4) * 14)}`, 'none', 4); }).replace(/fill="none"/g, 'fill="none" stroke="#6D4C41"')
      + E(120, 130, 74, 64, '#A1887F') + ring(10, (k) => Lc(`M${78 + (k % 5) * 20} ${100 + Math.floor(k / 5) * 40}q4 6 0 12`, '#6D4C41', 3)).replace(/q4 6/g, 'q4 6')
      + Lc('M58 124c-22 10-36 38-42 76', INK, 13) + Lc('M58 124c-22 10-36 38-42 76', '#E6C27A', 8)
      + Lc('M60 118l-16-10M58 126l-18-2', '#5D4037', 2) + [[100, 190], [140, 190]].map(([x, y]) => Lc(`M${x} ${y}v20M${x} ${y + 20}l-10 6M${x} ${y + 20}l10 6M${x} ${y + 20}v8`, '#BCAAA4', 6)).join('')
      + face(100, 110, 0.9)) ,
  G('nz', 'rangi', 'รังกี', 'Rangi', 'รังกีขี้เล่นที่สุด ระวังหมวกของ {name} ไว้นะ', 'Rangi the cheeky kea loves to play — hold on to your hat, {name}!', ['kea', 'นกเคีย', 'mountain parrot', 'นกแก้วภูเขา', 'alpine parrot', 'cheeky bird', 'parrot', 'นกแก้ว'],
    // a kea, the cheeky mountain parrot: olive-green scalloped feathers, a long hooked grey beak, wings lifted to flash bright orange underneath
    P('M44 150c-30-30-30-80 10-100 10 30 24 56 30 80z', '#FF7043') + P('M196 150c30-30 30-80-10-100-10 30-24 56-30 80z', '#FF7043') + Lc('M52 76l12 40M188 76l-12 40', '#D84315', 3)
      + E(120, 140, 64, 72, '#7CB342') + ring(12, (k) => P(`M${84 + (k % 4) * 24} ${120 + Math.floor(k / 4) * 24}q12 10 24 0`, 'none', 2.5)).replace(/fill="none"/g, 'fill="none" stroke="#558B2F"')
      + C(120, 90, 46, '#8BC34A') + P('M104 98c4-12 30-12 34 4 4 16-2 34-10 40-2-12-4-22-12-26-6-3-12-8-12-18z', '#90A4AE') + P('M108 116c4 10 12 14 18 12-2 8-10 10-16 6z', '#78909C', 2.5)
      + face(112, 82, 0.8, 'none') + [[90, 212], [150, 212]].map(([x, y]) => Lc(`M${x} ${y - 10}v10M${x - 8} ${y + 4}l8-4 8 4`, '#90A4AE', 4)).join('')),
  K('nz.food.pavlova', 'พาฟโลวา เค้กเมอแรงก์ผลไม้', 'Pavlova', ['pavlova', 'พาฟโลวา', 'meringue cake', 'เค้กเมอแรงก์', 'kiwifruit', 'กีวี', 'passionfruit', 'เสาวรส', 'christmas dessert', 'ขนมคริสต์มาส'],
    // a tall round crunchy meringue cake piled with whipped cream, green kiwifruit slices, strawberries and passionfruit seeds, on a cake stand
    E(120, 200, 92, 14, '#CFD8DC') + R(108, 180, 24, 20, '#ECEFF1', 3) + E(120, 178, 86, 12, '#ECEFF1')
      + P('M44 168c-6-30 0-60 8-72h136c8 12 14 42 8 72-30 10-122 10-152 0z', '#FFF8E1') + ring(7, (k) => Lc(`M${60 + k * 20} 168c-4-20-2-48 2-68`, '#F3E5AB', 2.5))
      + P('M48 100c-8-20 20-34 40-26 10-16 54-16 64 0 20-8 48 6 40 26-40 10-104 10-144 0z', '#FFFFFF')
      + [[74, 82], [120, 74], [166, 82]].map(([x, y]) => C(x, y, 15, '#9CCC65') + C(x, y, 6, '#F1F8E9', 0) + ring(8, (k) => C(x + Math.cos(k * 0.785) * 10, y + Math.sin(k * 0.785) * 10, 1.4, INK, 0)).replace(/stroke="none"/g, 'stroke="none"')).join('')
      + [[96, 70], [146, 68]].map(([x, y]) => P(`M${x} ${y + 12}c-12-6-12-22 0-24 12 2 12 18 0 24z`, '#E53935', 3) + Lc(`M${x - 4} ${y - 10}l4 -4 4 4`, '#43A047', 3)).join('')
      + ring(9, (k) => C(64 + k * 14, 98 + (k % 2) * 4, 2.2, '#5D4037', 0)) + face(120, 130, 0.6)),
  K('nz.food.hokeypokey', 'ไอศกรีมโฮกี้โพกี้', 'Hokey pokey ice cream', ['hokey pokey', 'โฮกี้โพกี้', 'ice cream', 'ไอศกรีม', 'honeycomb toffee', 'ทอฟฟี่รังผึ้ง', 'vanilla', 'วานิลลา', 'dairy', 'ร้านไอศกรีม'],
    // a waffle cone with two big scoops of vanilla ice cream studded with crunchy golden honeycomb toffee lumps, one lump falling
    P('M80 120l40 100 40-100z', '#E9A64C') + Lc('M90 136l52 52M104 124l44 44M128 124l-40 40M150 128l-46 46', '#C8862F', 2.5)
      + P('M70 124c-10-30 14-50 50-50s60 20 50 50c-30 8-70 8-100 0z', '#FFF3C4') + P('M84 80c-8-30 12-50 36-50s44 20 36 50c-24 6-48 6-72 0z', '#FFF8DC')
      + [[90, 104], [118, 112], [146, 100], [104, 60], [134, 52], [124, 82], [80, 120]].map(([x, y], k) => P(`M${x - 7} ${y}l4-7h8l4 7-4 6h-8z`, ['#FFB300', '#F9A825'][k % 2], 2.2)).join('')
      + P('M178 150l4-7h8l4 7-4 6h-8z', '#FFB300', 2.2) + Lc('M184 136v-8M196 140l6-4', '#FFB300', 2) + face(120, 92, 0.55)),
  K('nz.food.kumara', 'มันหวานคูมาราทอด', 'Kūmara chips', ['kumara', 'คูมารา', 'kumara chips', 'มันหวานทอด', 'sweet potato', 'มันหวาน', 'chips', 'ของทอด', 'fish and chip shop', 'ร้านฟิชแอนด์ชิปส์'],
    // a paper cone of thick orange kūmara chips, and beside it a whole purple-skinned kūmara with a smiling face
    P('M60 108h80l-20 104h-40z', '#FFFFFF') + Lc('M66 128h68', '#64B5F6', 4) + Lc('M70 146h60', '#64B5F6', 4)
      + ring(7, (k) => g(68 + k * 11, 108, 1, R(-5, -52 + (k % 3) * 10, 11, 60, ['#FB8C00', '#FFA726'][k % 2], 3, 2.5), (k - 3) * 5)).replace(/^/, '')
      + P('M60 108h80l-20 104h-40z', 'none')
      + P('M150 196c-10-30 4-62 30-76 14-6 28 2 30 16 4 30-20 64-48 68-6 0-10-2-12-8z', '#8E5A9F') + Lc('M196 122c4-8 10-12 16-12', '#6D4C41', 3) + ring(3, (k) => Lc(`M${164 + k * 12} ${150 + k * 8}q4 2 8 0`, '#6A1B9A', 2))
      + C(168, 196, 7, '#FB8C00', 2.5) + face(180, 160, 0.42)),
  K('nz.food.feijoa', 'ผลเฟยโจอา', 'Feijoas', ['feijoa', 'เฟยโจอา', 'pineapple guava', 'ฝรั่งสับปะรด', 'autumn fruit', 'ผลไม้ฤดูใบไม้ร่วง', 'spoon', 'ช้อน', 'fruit', 'ผลไม้'],
    // two egg-shaped green feijoas, one cut in half to show its cream flesh with a four-part jelly star in the middle, a teaspoon to scoop it
    E(120, 200, 90, 14, '#ECEFF1') + g(70, 140, 1, E(0, 0, 36, 50, '#558B2F') + P('M-8-48l8-10 8 10', '#6D4C41', 3) + ring(5, (k) => C(-14 + k * 7, 10 + (k % 2) * 16, 1.6, '#33691E', 0)), -14)
      + g(160, 150, 1, E(0, 0, 40, 48, '#558B2F') + E(0, 0, 32, 40, '#FFF8E1', 0) + ring(4, (k) => g(0, 0, 1, P('M0 0c-6-8-6-20 0-24 6 4 6 16 0 24z', '#E6EE9C', 2), k * 90 + 45)) + C(0, 0, 4, '#C5E1A5', 1.5), 10)
      + g(196, 96, 1, Lc('M0 0l-30 40', '#B0BEC5', 6) + E(4, -6, 9, 13, '#CFD8DC', 3), 30) + face(70, 140, 0.55)),
  K('nz.animal.tui', 'นกตูอี นักร้องแห่งป่า', 'A tūī singing', ['tui', 'ตูอี', 'tūī', 'songbird', 'นกร้องเพลง', 'native bird', 'นกพื้นเมือง', 'flax flowers', 'ดอกแฟลกซ์', 'bush walk', 'เดินป่า'],
    // a glossy blue-green-black tūī with two fluffy white tufts at its throat, perched on a tall flax flower stalk, beak open in song with music notes
    Lc('M150 228c0-60 10-120 30-180', '#6D4C41', 6) + [[176, 66], [170, 96], [164, 128]].map(([x, y]) => P(`M${x} ${y}c10-4 18 0 20 8-8 4-16 2-20-8z`, '#E53935', 2.5)).join('')
      + P('M50 216c30-40 70-60 100-56', 'none', 2).replace('fill="none"', 'fill="none" stroke="none"')
      + P('M60 120c0-34 30-54 60-50 26 4 40 26 36 50-4 30-30 50-60 50-20 0-36-20-36-50z', '#283593') + P('M80 110c10-20 40-26 60-12', 'none', 4).replace('fill="none"', 'fill="none" stroke="#26A69A"')
      + P('M60 150l-20 50 30-26z', '#1A237E') + P('M64 82l-26-8 26-8z', '#212121', 2.5) + C(66, 112, 6, '#FFFFFF', 2) + C(72, 124, 6, '#FFFFFF', 2) + Lc('M140 160l8 14M126 166l2 16', '#424242', 4)
      + [[30, 46], [48, 26]].map(([x, y]) => C(x, y, 5, INK, 0) + Lc(`M${x + 5} ${y}v-16l8 4`, INK, 2.5)).join('') + face(96, 92, 0.55, 'none')),
  K('nz.animal.tuatara', 'ทัวทารา สัตว์โบราณ', 'A tuatara', ['tuatara', 'ทัวทารา', 'living fossil', 'ฟอสซิลมีชีวิต', 'reptile', 'สัตว์เลื้อยคลาน', 'spiky back', 'หนามบนหลัง', 'wildlife sanctuary', 'เขตอนุรักษ์'],
    // a chunky olive tuatara resting on a mossy rock, a row of soft white spikes down its back, a curling tail and big round eyes
    E(130, 196, 96, 22, '#90A4AE') + P('M60 186c10-12 30-12 40-6', '#9CCC65', 0)
      + P('M30 160c0-24 30-36 60-34 40 2 80 4 110 20 20 10 26 30 4 34-20 4-30-6-40-4-30 6-80 10-110 4-16-4-24-10-24-20z', '#7E8F4E')
      + ring(12, (k) => P(`M${48 + k * 12} ${128 + Math.abs(k - 4) * 0.8}l5-12 5 12z`, '#F5F5DC', 2)) + ring(10, (k) => C(60 + k * 14, 152 + (k % 2) * 8, 2.5, '#5D6B32', 0))
      + [[66, 182], [150, 184]].map(([x, y]) => P(`M${x} ${y - 8}v14l-8 4M${x} ${y + 6}l8 4`, 'none', 4)).join('') + P('M196 166c20 10 30 26 20 34', 'none', 8).replace('fill="none"', 'fill="none" stroke="#7E8F4E"')
      + face(52, 148, 0.5)),
  K('nz.animal.pukeko', 'นกปูเคโก', 'A pūkeko', ['pukeko', 'ปูเคโก', 'pūkeko', 'swamphen', 'นกอีโก้ง', 'wetland', 'บึง', 'red beak', 'ปากแดง', 'native bird'],
    // a pūkeko striding through the reeds: deep purple-blue feathers, a bright red beak and forehead shield, long red legs, a white tail flicked up
    ring(7, (k) => Lc(`M${20 + k * 32} 228c-2-30 4-60 0-${80 + (k % 3) * 20}`, '#8BC34A', 4)) + E(120, 220, 100, 10, '#4FC3F7', 0)
      + P('M70 130c0-30 30-50 60-46 30 4 44 30 34 56-10 24-40 30-64 24-20-6-30-18-30-34z', '#3949AB') + P('M156 110l22-16 4 14z', '#FFFFFF', 2.5)
      + P('M70 130c-8-24 0-50 16-62', 'none', 0) + C(88, 74, 22, '#283593') + P('M72 66c-18 2-30 12-34 22 12 0 24-4 34-10z', '#E53935') + E(76, 64, 9, 12, '#E53935', 2.5)
      + [[106, 160, 96, 214], [130, 160, 146, 214]].map(([a, b, c, d]) => Lc(`M${a} ${b}L${c} ${d}`, '#E53935', 5) + Lc(`M${c - 12} ${d}h24M${c} ${d}l-4 -8`, '#E53935', 3)).join('')
      + face(92, 76, 0.42, 'none')),
  K('nz.animal.fantail', 'นกพีวาคาวากา หางพัด', 'A pīwakawaka fantail', ['fantail', 'นกหางพัด', 'piwakawaka', 'พีวาคาวากา', 'native bird', 'นกพื้นเมือง', 'forest walk', 'เดินป่า', 'little bird', 'นกตัวเล็ก'],
    // a tiny round brown fantail bird with white eyebrows and a huge tail spread open like a fan, chasing a little fly beside a fern
    g(150, 150, 1, ring(9, (k) => g(0, 0, 1, P('M0 0l-8-78c6-6 10-6 16 0z', k % 2 ? '#FFFFFF' : '#5D4037', 2.5), -70 + k * 17.5)))
      + C(96, 120, 40, '#8D6E63') + P('M66 132c10 20 40 26 60 10-6 26-56 30-60-10z', '#FFCC80', 2.5) + P('M60 112c-16-2-22 4-26 10 10 2 18 0 26-4z', '#3E2723', 2.5)
      + Lc('M74 98l14 4M108 96l14-2', '#FFFFFF', 4) + Lc('M96 160v22M108 158v24', '#3E2723', 3.5)
      + C(40, 64, 4, INK, 0) + Lc('M36 60l-6-6M44 60l6-6', INK, 2) + face(96, 112, 0.6, 'none')),
  K('nz.culture.silverfern', 'ใบเฟิร์นเงิน', 'The silver fern', ['silver fern', 'เฟิร์นเงิน', 'ponga', 'ปองกา', 'koru', 'โครู', 'fern frond', 'ใบเฟิร์น', 'national symbol', 'สัญลักษณ์ประจำชาติ'],
    // a big fern frond, green on top and shining silver-white underneath, its tip curled into a new spiral koru, a second young frond unrolling beside it
    frond(96, 222, 1.25, 16, '#2E7D32', '#ECEFF1')
      + Lc('M170 222c4-30 0-60 -10-80c-8-16 8-30 22-22s8 26-6 22-10-14 0-14', '#81C784', 9) + P('M170 222c4-30 0-60-10-80c-8-16 8-30 22-22s8 26-6 22-10-14 0-14', 'none', 2)
      + g(176, 128, 1, face(0, 0, 0.32))),
  K('nz.culture.pohutukawa', 'ต้นโพฮูตูกาวะดอกแดง', 'A pōhutukawa in bloom', ['pohutukawa', 'โพฮูตูกาวะ', 'pōhutukawa', 'christmas tree', 'ต้นคริสต์มาสนิวซีแลนด์', 'red flowers', 'ดอกไม้สีแดง', 'summer beach', 'ชายหาดฤดูร้อน', 'cliff'],
    // a wide gnarled tree leaning out over a sandy cliff edge, its dark green crown covered in bright red bottlebrush pompom flowers, the sea below
    P('M-4 200h248v30H-4z', '#4FC3F7', 0) + P('M-4 206c50-8 120-10 160-40 20-14 50-20 88-20v84H-4z', '#E8D29B')
      + Lc('M150 170c-10-30-30-50-60-60M150 170c0-30 20-50 30-70M150 170c-30-10-70-6-100 6', '#6D4C41', 10)
      + P('M30 120c-16-30 10-60 40-50 10-30 60-36 80-10 20-20 60-6 60 22 24 8 24 44 0 50-30 10-70 8-100 4-30 4-70 6-80-16z', '#2E7D32')
      + (() => { const fl = Array.from({ length: 16 }, (_, k) => [40 + (k % 8) * 22 + (k > 7 ? 10 : 0), 70 + Math.floor(k / 8) * 34 + (k % 3) * 6]);
        return Lc(fl.map(([x, y]) => ring(6, (j) => `M${x} ${y}l${f1(Math.cos(j * 1.05) * 13)} ${f1(Math.sin(j * 1.05) * 13)}`)).join(''), '#E53935', 3) + fl.map(([x, y]) => C(x, y, 7, '#D32F2F', 2)).join(''); })()
      + g(150, 184, 1, face(0, 0, 0.32))),
  K('nz.culture.paua', 'เปลือกหอยเปาอัวสีรุ้ง', 'A pāua shell', ['paua', 'เปาอัว', 'pāua shell', 'เปลือกหอยเป๋าฮื้อ', 'abalone shell', 'rainbow shell', 'เปลือกหอยสีรุ้ง', 'souvenir', 'ของฝาก', 'beachcombing'],
    // an ear-shaped shell turned over to show its shimmering swirl of blue, green and purple, a curving row of little holes along one edge
    P('M40 140c-6-60 50-100 110-90 50 10 70 60 40 110-30 44-130 50-150-20z', '#B0A08A')
      + P('M54 138c-2-48 44-78 92-72 40 6 54 46 30 84-26 36-110 40-122-12z', '#26A69A', 0) + P('M70 140c4-36 40-56 74-48 30 8 34 40 16 62-20 24-84 22-90-14z', '#5C6BC0', 0)
      + P('M90 136c6-20 30-30 50-22 18 8 16 30 2 40-16 12-50 6-52-18z', '#AB47BC', 0) + P('M108 132c6-10 20-10 26-2s0 18-12 18-16-8-14-16z', '#80DEEA', 0)
      + Lc('M62 110c20-30 60-40 90-30M70 160c30 16 80 10 100-16', '#B2EBF2', 3)
      + ring(6, (k) => C(66 + k * 18, 62 - Math.sin((k / 5) * Math.PI) * 10 + k * 2, 4, '#4E342E', 2))
      + P('M40 140c-6-60 50-100 110-90 50 10 70 60 40 110-30 44-130 50-150-20z', 'none') + face(124, 138, 0.42)),
  K('nz.culture.gumboot', 'รองเท้าบูตยางยักษ์ที่ไทฮาเป', 'The giant gumboot of Taihape', ['gumboot', 'บูตยาง', 'taihape', 'ไทฮาเป', 'giant gumboot', 'รองเท้าบูตยักษ์', 'corrugated iron', 'สังกะสีลอน', 'kiwiana', 'road trip stop'],
    // a huge gumboot sculpture made of corrugated iron, wavy ridges running round it, on a little concrete plinth, a child beside it for scale
    R(40, 204, 150, 16, '#BDBDBD', 3) + P('M70 204V60c0-10 6-16 16-16h56c10 0 16 6 16 16v84c30 4 46 20 46 40v20z', '#455A64')
      + ring(9, (k) => Lc(`M${80 + k * 9} 52v150`, '#607D8B', 3)) + ring(4, (k) => Lc(`M${160 + k * 9} ${148 + k}v54`, '#607D8B', 3))
      + P('M70 204V60c0-10 6-16 16-16h56c10 0 16 6 16 16v84c30 4 46 20 46 40v20z', 'none') + R(66, 36, 96, 16, '#37474F', 4)
      + g(206, 196, 1, C(0, -22, 9, '#F1C9A5', 2) + R(-8, -12, 16, 18, '#FFCA28', 3, 2) + Lc('M-4 6v10M4 6v10', INK, 3) + face(0, -21, 0.25)) + face(114, 120, 0.7)),
  K('nz.culture.jandals', 'รองเท้าแตะแจนดัล', 'Jandals on the sand', ['jandals', 'แจนดัล', 'flip flops', 'รองเท้าแตะ', 'summer', 'ฤดูร้อน', 'beach', 'ชายหาด', 'kiwi summer', 'kiwiana'],
    // a pair of bright rubber jandals lying on warm sand, one blue and one red with white toe straps, a shell and a starfish beside them
    E(120, 150, 110, 70, '#F3E0A8', 0) + ring(6, (k) => C(30 + k * 36, 210 - (k % 2) * 140, 2.5, '#D7B46A', 0))
      + [[84, 130, -14, '#1E88E5'], [156, 124, 12, '#E53935']].map(([x, y, r, c]) => g(x, y, 1, P('M0-70c26 0 32 30 30 60-2 40-6 72-30 76-24-4-28-36-30-76-2-30 4-60 30-60z', c) + P('M0-70c26 0 32 30 30 60-2 40-6 72-30 76-24-4-28-36-30-76-2-30 4-60 30-60z', 'none') + Lc('M0-50l-20 34M0-50l20 34', '#FFFFFF', 7) + Lc('M0-50l-20 34M0-50l20 34', INK, 1.5) + C(0, -50, 4, '#FFFFFF', 2), r)).join('')
      + g(206, 196, 1, P('M0-14l4 9 10 1-8 7 3 10-9-6-9 6 3-10-8-7 10-1z', '#FF8A65', 2.5)) + g(30, 70, 1, P('M-12 8c0-14 6-20 12-20s12 6 12 20z', '#FFF3E0', 2.5) + Lc('M-6 8v-14M0 8v-18M6 8v-14', '#FFAB91', 1.5))
      + g(156, 140, 1, face(0, 0, 0.35))),
  K('nz.culture.rugbyball', 'ลูกรักบี้', 'A rugby ball', ['rugby', 'รักบี้', 'rugby ball', 'ลูกรักบี้', 'kicking tee', 'แท่นเตะ', 'backyard game', 'เกมสนามหลังบ้าน', 'sport', 'กีฬา'],
    // a plain oval rugby ball standing on a little orange kicking tee on the grass, stitched seams and a smiling face
    E(120, 214, 96, 12, '#81C784', 0) + P('M98 214l6-24h32l6 24z', '#FF7043')
      + g(120, 110, 1, E(0, 0, 50, 84, '#FFFFFF') + P('M0-84c18 30 18 138 0 168', 'none', 3) + P('M0-84c-18 30-18 138 0 168', 'none', 3) + Lc('M-46-10c30 8 62 8 92 0', '#1E88E5', 6) + Lc('M-46 18c30 8 62 8 92 0', '#1E88E5', 6) + E(0, 0, 50, 84, 'none'), 0)
      + face(120, 110, 0.6) + ring(3, (k) => Lc(`M${40 + k * 70} ${222 - (k % 2) * 4}l4-10 4 10`, '#43A047', 3))),
  K('nz.culture.wharenui', 'บ้านชุมนุมวาเรนุย', 'A wharenui, the meeting house', ['wharenui', 'วาเรนุย', 'meeting house', 'บ้านชุมนุม', 'marae', 'มาเร', 'maori culture', 'วัฒนธรรมเมารี', 'visit', 'cultural centre'],
    // a meeting house seen from the front: a wide peaked roof with plain red barge boards meeting in a point, an open porch, one door and one window, green lawn in front (the building only, no carvings)
    E(120, 214, 110, 14, '#9CCC65', 0) + P('M30 206V120l90-74 90 74v86z', '#8D6E63') + P('M44 206v-78l76-62 76 62v78z', '#EFEBE9')
      + P('M20 128l100-88 100 88-12 8-88-76-88 76z', '#C62828') + P('M112 44l8-16 8 16z', '#C62828', 2.5)
      + R(44, 196, 152, 10, '#A1887F', 0) + R(78, 140, 30, 56, '#5D4037', 3) + R(132, 140, 34, 26, '#B3E5FC', 3, 3) + Lc('M149 140v26M132 153h34', INK, 2)
      + ring(5, (k) => Lc(`M${52 + k * 34} 128v68`, '#BCAAA4', 2.5)).replace(/^/, '')),
];

export default {
  places: {
    nz: { country: 'nz', wave: 3, name: nm('นิวซีแลนด์', 'New Zealand'), tz: 'Pacific/Auckland', alias: ['new zealand', 'นิวซีแลนด์', 'aotearoa', 'อาโอเทอารัว', 'NZ'], colors: NZ },
  },
  items,
};
