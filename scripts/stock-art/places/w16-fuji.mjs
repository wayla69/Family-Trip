// Wave 16: Mount Fuji and the Fuji Five Lakes (Kawaguchiko, Fujiyoshida, Fuji-Q Highland, Oshino, Lake Motosu, Fujinomiya) —
// the lakes' own scenes, not Fuji alone (Tokyo already has "Fuji by the lake" and the Mount Fuji landmark): the Chūreitō
// pagoda over the town, Oshino Hakkai's spring ponds, the pink moss fields, Ōishi Park's kochia, the Kachi Kachi ropeway,
// Shiraito Falls, hōtō and Yoshida udon, Shingen mochi, the climber's branded stick, the Fujikyū train, Honchō street,
// the lion bus of Fuji Safari Park.
// Skipped as repeats or bans: the ice and wind caves (Dachstein, Jeju's lava tube), sunrise above the clouds from the summit
// (Haleakalā, Rinjani), Lake Yamanaka's swans and swan boats (Boston, Zurich), the KABA amphibious bus (Boston's duck boat),
// lavender at Ōishi Park (Furano, Provence), the music-box museum (Sorrento), blueberry picking, the Fire Festival and the
// sky torii (shrines), Aokigahara (not for a children's book), horse rides on the mountain (riding animals).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const FJ = { k1: '#1E5AA8', k2: '#D32F2F', k3: '#E3F2FD' };
const CITY = 'jp-fuji', DIR = 'jp/fuji';
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// Fuji from the north side: a wide cone with a flat top (cx = middle, b = foot, w = half width, h = height) and its snow cap
const fuji = (cx, b, w, h, c = '#5C8FD6', sw) => {
  const t = 0.16 * w, top = b - h;
  const at = (k, s) => [cx + s * (t + k * (w - t)), top + k * h];
  const [lx, ly] = at(0.38, -1), [rx, ry] = at(0.38, 1), d = rx - cx, f = (v) => v.toFixed(1);
  // the snow's lower edge: a zigzag of soft points back from the right side to the left
  const cap = `M${f(cx - t)} ${f(top)}Q${f(cx)} ${f(top - 4)} ${f(cx + t)} ${f(top)}L${f(rx)} ${f(ry)}`
    + `L${f(cx + d * 0.6)} ${f(ry - h * 0.1)}L${f(cx + d * 0.25)} ${f(ry + h * 0.05)}L${f(cx - d * 0.15)} ${f(ry - h * 0.09)}L${f(cx - d * 0.55)} ${f(ry + h * 0.04)}L${f(lx)} ${f(ly)}Z`;
  return P(`M${cx - w} ${b}L${cx - t} ${top}Q${cx} ${top - 4} ${cx + t} ${top}L${cx + w} ${b}Z`, c, sw) + P(cap, '#FFFFFF', sw);
};
// a pink cherry blossom cloud
const bloom = (x, y, r, c = '#F8BBD0') => C(x, y, r, c, 3) + C(x - r * 0.7, y + r * 0.35, r * 0.7, c, 3) + C(x + r * 0.7, y + r * 0.35, r * 0.7, c, 3);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับห้าทะเลสาบฟูจิ', 'Fuji Five Lakes stamp'), kw: ['fuji five lakes', 'ห้าทะเลสาบฟูจิ', 'kawaguchiko', 'คาวากุจิโกะ', 'mount fuji', 'ภูเขาไฟฟูจิ', 'chureito pagoda', 'เจดีย์ชูเรโตะ', 'yamanashi', 'ยามานาชิ'],
    // a smiling snow-capped Fuji over a blue lake, the little red five-roofed pagoda on the green hill in front, two pink blossom clouds
    svg: cityStamp('fj-st', { name: 'FUJI', sub: 'FIVE LAKES · JAPAN', ...FJ, emblem: fuji(100, 112, 46, 54, '#5C8FD6', 3) + R(50, 112, 100, 18, '#4FC3F7', 0, 0) + Lc('M60 122h14M118 126h16', '#E1F5FE', 2.5)
      + P('M48 140c14-14 40-18 60-10v22H48z', '#81C784', 0) + R(70, 104, 12, 30, '#E53935', 0, 2.5) + P('M64 108h24l-4-6H68zM64 118h24l-4-6H68zM64 128h24l-4-6H68z', '#455A64', 2.5) + Lc('M76 102v-8', INK, 2.5)
      + C(132, 132, 9, '#F8BBD0', 2.5) + C(122, 136, 6, '#F8BBD0', 2.5) + face(100, 86, 0.3) }) },

  D('chureito', 'เจดีย์ชูเรโตะกับภูเขาไฟฟูจิและซากุระ', 'The Chūreitō pagoda, Mount Fuji and the cherry blossom', ['chureito pagoda', 'เจดีย์ชูเรโตะ', 'arakurayama sengen park', 'สวนอาราคุระยามะ', 'five-storey pagoda', 'เจดีย์ห้าชั้น', 'fujiyoshida', 'ฟูจิโยชิดะ', 'cherry blossom', 'ซากุระ', 'mount fuji', 'ภูเขาไฟฟูจิ'],
    // the red five-storey pagoda on its wooded hill with pink blossom clouds all round, the big snow-capped Fuji filling the sky behind, the roofs of Fujiyoshida far below
    scene('fj-d1', '#E1F5FE', fuji(150, 150, 120, 110, '#6A9BE0') + P('M-4 150h248v20H-4z', '#B0BEC5', 0) + [20, 44, 70, 196, 222].map((x) => R(x, 146, 14, 10, '#FFFFFF', 0, 2.5) + P(`M${x - 2} 147l9-7 9 7z`, '#78909C', 2.5)).join('')
      + P('M-4 176c40-26 110-30 170-14 30 8 60 4 80-2v100H-4z', '#66BB6A')
      + g(92, 0, 1, R(-11, 82, 22, 92, '#E53935') + [0, 1, 2, 3, 4].map((k) => { const y = 92 + k * 18, w = 30 - k * 3; return P(`M${-w} ${y}q${w} -8 ${w * 2} 0l-${w * 0.35} -8h-${w * 1.3}z`, '#455A64', 3.5); }).join('')
        + Lc('M0 86v-24', INK, 4) + [64, 70, 76].map((y) => Lc(`M-5 ${y}h10`, '#FFD54F', 3)).join('') + face(0, 128, 0.3, 'none'))
      + bloom(40, 128, 22) + bloom(150, 156, 22, '#F48FB1') + bloom(200, 140, 20) + bloom(20, 188, 24, '#F48FB1') + bloom(214, 196, 26) + face(150, 92, 0.4))),
  D('oshino', 'บ่อน้ำพุใสแปดบ่อที่โอชิโนะฮักไก', 'The clear spring ponds of Oshino Hakkai', ['oshino hakkai', 'โอชิโนะฮักไก', 'oshino', 'โอชิโนะ', 'spring ponds', 'บ่อน้ำพุ', 'snowmelt water', 'น้ำจากหิมะละลาย', 'thatched houses', 'บ้านหลังคามุงจาก', 'koi carp', 'ปลาคาร์ป', 'water wheel', 'กังหันน้ำ'],
    // a round pond of clear turquoise spring water with orange carp and green weed on the bottom, two thatched farmhouses and a turning water wheel beside it, Fuji behind
    scene('fj-d2', '#E3F2FD', fuji(120, 112, 110, 76, '#7FA7E3') + P('M-4 104c50-10 200-10 248 0v40H-4z', '#81C784', 0)
      + P('M36 120l28-26 28 26zM150 116l30-28 30 28z', '#A1887F') + R(42, 120, 44, 26, '#FFF8E1') + R(156, 116, 48, 28, '#FFF8E1') + R(58, 128, 12, 18, '#6D4C41', 0, 2.5) + R(172, 124, 14, 20, '#6D4C41', 0, 2.5)
      + Lc('M44 112l20-18 20 18M158 108l22-20 22 20', '#8D6E63', 2.5)
      + R(-4, 144, 248, 110, '#AED581') + E(120, 190, 96, 44, '#4DD0E1') + E(120, 192, 80, 34, '#80DEEA', 0)
      + Lc('M70 210c4-12 0-20 4-30M98 220c4-12 0-20 4-30M150 216c4-12 0-20 4-30', '#4CAF50', 3)
      + [[92, 186, 0], [136, 200, 30], [160, 176, -20]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 13, 6, '#FF8A65', 3) + P('M12 0l8-6v12z', '#FF8A65', 3) + C(-6, -1, 1.5, INK, 0), r)).join('')
      + C(28, 150, 18, '#8D6E63') + C(28, 150, 7, '#A1887F', 3) + Lc('M28 132v36M10 150h36M15 137l26 26M41 137l-26 26', '#6D4C41', 3) + face(120, 168, 0.3, 'none'))),
  D('shibazakura', 'ทุ่งพิงก์มอสชิบะซากุระใต้ภูเขาไฟฟูจิ', 'The pink moss phlox fields under Mount Fuji', ['shibazakura', 'ชิบะซากุระ', 'fuji shibazakura festival', 'เทศกาลชิบะซากุระ', 'moss phlox', 'มอสฟล็อกซ์', 'pink flower carpet', 'พรมดอกไม้สีชมพู', 'lake motosu', 'ทะเลสาบโมโตสึ', 'spring', 'ฤดูใบไม้ผลิ'],
    // Fuji rising over a dark green pine wood, and in front wave after wave of flower carpet in hot pink, pale pink, white and lilac
    scene('fj-d3', '#E1F5FE', fuji(120, 120, 110, 86) + P('M-4 120c30-8 60-8 90-2s70 6 100-2 40-6 58-2v18H-4z', '#2E7D32')
      + [['#EC407A', 126], ['#F8BBD0', 146], ['#FFFFFF', 166], ['#CE93D8', 184], ['#F06292', 202], ['#FCE4EC', 222]].map(([c, y], k) => P(`M-4 ${y}c40 ${k % 2 ? 14 : -12} 80 ${k % 2 ? -12 : 14} 124 0s80 ${k % 2 ? 14 : -12} 124 0v40H-4z`, c)).join('')
      + [[40, 158], [96, 176], [176, 160], [200, 196], [60, 212], [140, 214]].map(([x, y]) => C(x, y, 3, '#FFF59D', 0)).join('') + face(120, 70, 0.36))),

  L('fujiq', 'รถไฟเหาะสูงลิ่วที่ฟูจิคิวไฮแลนด์', 'The giant roller coasters of Fuji-Q Highland', ['fuji-q highland', 'ฟูจิคิวไฮแลนด์', 'roller coaster', 'รถไฟเหาะ', 'theme park', 'สวนสนุก', 'big drop', 'ทางดิ่งชัน', 'fujiyoshida', 'ฟูจิโยชิดะ'], 'หารถไฟเหาะที่กำลังพุ่งลงจากเนินสูงที่สุด', 'Find the coaster car rushing down the tallest hill',
    // a tall red coaster hill on a white lattice of supports with a loop beside it, a smiling coaster car diving down, Fuji small and snowy behind
    bg('#E3F2FD') + fuji(164, 130, 52, 50, '#7FA7E3') + low(186, '#A5D6A7')
      + Lc('M44 186V70M70 186V60M96 186V78M44 120h52M44 150h52M44 90l26 30 26-30M44 150l26 -30 26 30', '#FFFFFF', 5)
      + ol('M24 186c10-40 20-120 46-124 24-4 30 64 52 90 22 26 50 20 60-6 10-24-8-40-22-32-14 8-6 34 18 40 16 4 26-4 38-8', '#E53935', 6)
      + g(98, 112, 1, R(-14, -10, 28, 20, '#FFD54F', 6) + C(-7, 12, 5, '#455A64', 3) + C(7, 12, 5, '#455A64', 3) + face(0, -1, 0.28), 58) + Lc('M150 70l6-10M162 74l10-6', '#FFFFFF', 3) + frame),
  L('shiraito', 'ม่านน้ำตกชิราอิโตะ', 'Shiraito Falls, a curtain of a hundred little waterfalls', ['shiraito falls', 'น้ำตกชิราอิโตะ', 'shiraito no taki', 'ชิราอิโตะโนะทากิ', 'fujinomiya', 'ฟูจิโนมิยะ', 'curtain waterfall', 'น้ำตกม่าน', 'white threads', 'สายน้ำสีขาว', 'spring water', 'น้ำพุใต้ดิน'], 'หาสายน้ำเส้นเล็กๆ ที่ไหลลงมาเหมือนเส้นไหม', 'Find the thin threads of water falling like silk',
    // a wide curved cliff of dark rock with green moss and trees on top, dozens of thin white water threads falling from it into a turquoise pool, a little wooden lookout
    bg('#E8F5E9') + P('M24 70c40-20 152-20 192 0v30H24z', '#43A047') + C(40, 64, 16, '#66BB6A', 3) + C(200, 62, 18, '#66BB6A', 3) + C(120, 52, 14, '#81C784', 3)
      + P('M24 92c40-14 152-14 192 0v70c-40-12-152-12-192 0z', '#6D6A75') + Lc('M30 104c40-12 140-12 180 0', '#7CB342', 4)
      + Lc(Array.from({ length: 19 }, (_, i) => { const x = 34 + i * 9.5; return `M${x} ${100 - Math.sin(i / 18 * Math.PI) * 8}v${62 - Math.sin(i / 18 * Math.PI) * 4}`; }).join(''), '#FFFFFF', 3)
      + low(168, '#4DD0E1') + Lc('M40 180c10-5 20 5 30 0M150 186c10-5 20 5 30 0M90 202c10-5 20 5 30 0', '#E0F7FA', 4) + E(120, 166, 90, 8, '#FFFFFF', 0)
      + R(168, 186, 40, 8, '#A1887F', 0, 3) + Lc('M172 194v20M204 194v20', '#8D6E63', 4) + face(120, 132, 0.36) + frame),
  L('kochia', 'พุ่มโคเชียสีแดงที่สวนโออิชิริมทะเลสาบคาวากุจิ', 'The round red kochia bushes of Ōishi Park', ['kochia', 'โคเชีย', 'summer cypress', 'ต้นโคเชีย', 'oishi park', 'สวนโออิชิ', 'lake kawaguchi', 'ทะเลสาบคาวากุจิ', 'autumn colours', 'สีฤดูใบไม้ร่วง', 'fluffy bushes', 'พุ่มไม้ฟูกลม'], 'หาพุ่มไม้ฟูที่ยังเป็นสีเขียวอยู่หนึ่งพุ่ม', 'Find the one fluffy bush that is still green',
    // a lakeside garden of round fluffy kochia bushes, most turned red and orange for autumn, one still green, the biggest smiling, the blue lake and Fuji behind
    bg('#E3F2FD') + fuji(120, 112, 84, 66, '#7FA7E3') + P('M16 112h208v26H16z', '#4FC3F7', 0) + Lc('M40 124h22M160 128h20', '#E1F5FE', 3) + low(150, '#9CCC65')
      + [[50, 160, 20, '#EF5350'], [190, 162, 20, '#FF7043'], [86, 182, 22, '#E53935'], [160, 184, 22, '#F4511E'], [44, 200, 15, '#FF8A65'], [196, 200, 15, '#66BB6A']].map(([x, y, r, c]) => E(x, y, r, r * 1.1, c) + Lc(`M${x - r * 0.4} ${y - r * 0.5}l4 -4M${x + r * 0.3} ${y - r * 0.2}l4 -4`, '#FFCCBC', 2)).join('')
      + E(122, 168, 28, 32, '#D32F2F') + Lc('M110 150l5-5M130 146l5-5', '#FFCDD2', 2.5) + face(122, 170, 0.4) + frame),
  L('kachikachi', 'กระเช้าคาจิคาจิกับกระต่ายและทานุกิ', 'The Kachi Kachi ropeway, its rabbit and its tanuki', ['kachi kachi ropeway', 'กระเช้าคาจิคาจิ', 'mount tenjo', 'ภูเขาเท็นโจ', 'ropeway', 'กระเช้าลอยฟ้า', 'rabbit and tanuki', 'กระต่ายกับทานุกิ', 'folk tale', 'นิทานพื้นบ้าน', 'kawaguchiko', 'คาวากุจิโกะ'], 'หาหูกระต่ายบนหลังคากระเช้า', 'Find the rabbit ears on the gondola roof',
    // a round cream gondola with long rabbit ears on its roof hanging from the cable over the lake, a round tanuki waving from the hilltop station on the right
    bg('#E1F5FE') + low(170, '#4FC3F7') + P('M150 224V122c20-20 50-30 74-28V194a30 30 0 0 1-30 30z', '#81C784', 0) + R(170, 96, 40, 26, '#FFF8E1', 3) + P('M164 98l26-14 26 14z', '#A1887F')
      + Lc('M20 52l200 54', '#455A64', 3) + Lc('M100 74v26', '#455A64', 4)
      + P('M76 104q-12-36 0-44 10 6 10 42zM112 102q6-36 20-40 6 10-8 42z', '#FFFFFF') + Lc('M80 98q-4-18-1-28M118 98q4-18 10-26', '#F8BBD0', 3)
      + R(66, 98, 68, 56, '#FFECB3', 18) + R(76, 108, 48, 22, '#B3E5FC', 8, 3) + Lc('M100 108v22', '#FFECB3', 3) + face(100, 140, 0.3)
      + C(190, 150, 16, '#8D6E63') + C(178, 134, 6, '#8D6E63', 3) + C(202, 134, 6, '#8D6E63', 3) + E(190, 152, 10, 7, '#D7CCC8', 0) + face(190, 148, 0.26, 'w')
      + Lc('M40 196c10-5 20 5 30 0M110 206c10-5 20 5 30 0', '#E1F5FE', 4) + frame),
  L('hoto', 'โฮโตะ เส้นแบนหนาในหม้อเหล็กกับฟักทอง', 'Hōtō, flat noodles and pumpkin in an iron pot', ['hoto', 'hōtō', 'โฮโตะ', 'yamanashi noodles', 'เส้นยามานาชิ', 'iron pot', 'หม้อเหล็ก', 'pumpkin', 'ฟักทอง', 'miso soup', 'ซุปมิโซะ', 'flat noodles', 'เส้นแบน'], 'หาฟักทองชิ้นสีส้มในหม้อ', 'Find the orange pumpkin pieces in the pot',
    // a black iron pot with two little handles on a wooden stand, thick flat noodles in brown miso soup, orange pumpkin chunks, a shiitake, leek rings and steam
    R(54, 190, 132, 12, '#A1887F', 4) + P('M40 118h160c0 44-30 72-80 72s-80-28-80-72z', '#37474F') + R(24, 120, 22, 10, '#37474F', 4) + R(194, 120, 22, 10, '#37474F', 4)
      + E(120, 118, 80, 18, '#8D6E63') + E(120, 120, 70, 13, '#A1785A', 0)
      + Lc('M62 116c14 8 30-6 46 2s30 6 44-2 20 0 26 4M70 126c16-6 28 6 44 0s30-6 46 2', '#FFF3C4', 7)
      + P('M78 98l18-6 6 16-18 6z', '#FF9800') + P('M134 96l20 2-2 16-20-2z', '#FFA726')
      + E(112, 102, 13, 8, '#6D4C41', 3) + Lc('M104 102h16', '#D7CCC8', 2) + [[160, 120], [90, 124]].map(([x, y]) => C(x, y, 5, '#C5E1A5', 2.5) + C(x, y, 2, '#F1F8E9', 0)).join('')
      + Lc('M90 72c-6-10 6-16 0-26M120 66c-6-10 6-16 0-26M150 72c-6-10 6-16 0-26', '#CFD8DC', 4) + face(120, 156, 0.4)),
  L('yoshidaudon', 'อุด้งโยชิดะ เส้นหนึบกับกะหล่ำปลี', 'Yoshida udon, firm noodles with cabbage', ['yoshida udon', 'อุด้งโยชิดะ', 'fujiyoshida', 'ฟูจิโยชิดะ', 'udon', 'อุด้ง', 'cabbage', 'กะหล่ำปลี', 'chewy noodles', 'เส้นหนึบ', 'suridane', 'ซุริดาเนะ'], 'หาก้อนพริกแดงซุริดาเนะบนเส้น', 'Find the red blob of suridane chilli paste',
    // a blue-rimmed bowl of thick, wavy white udon in a dark soy broth, topped with soft green cabbage, carrot strips, a fried tofu pouch and a little red heap of chilli paste
    P('M30 116h180c0 48-40 80-90 80s-90-32-90-80z', '#FFFFFF') + Lc('M38 132c26 10 52 10 82 0s56-10 82 0', '#1E88E5', 4) + E(120, 116, 90, 20, '#8D6E63') + E(120, 118, 80, 14, '#A1785A', 0)
      + Lc('M56 116c10-8 20 8 30 0s20 8 30 0 20 8 30 0 20 8 30 0M62 124c10-6 20 6 30 0s20 6 30 0 20 6 30 0', '#FFFDE7', 7)
      + P('M66 104c6-18 34-24 46-10-12 10-30 14-46 10z', '#C5E1A5') + Lc('M78 100q10-4 20-4', '#8BC34A', 2)
      + R(122, 90, 36, 18, '#FFB74D', 5) + Lc('M126 99h28', '#FFCC80', 2) + Lc('M100 110l20-8M104 116l22-8', '#FF7043', 3)
      + C(164, 106, 8, '#E53935', 3) + C(162, 104, 2, '#FFCDD2', 0) + Lc('M100 26l10 64M124 24l-6 66', '#C8A165', 5) + face(120, 158, 0.42)),
  L('shingenmochi', 'ขนมชินเง็นโมจิกับผงคินาโกะและน้ำตาลดำ', 'Shingen mochi with roasted soy flour and black syrup', ['shingen mochi', 'ชินเง็นโมจิ', 'kinako', 'คินาโกะ', 'roasted soy flour', 'ผงถั่วเหลืองคั่ว', 'kuromitsu', 'น้ำเชื่อมน้ำตาลดำ', 'black syrup', 'น้ำตาลดำ', 'yamanashi sweets', 'ขนมยามานาชิ', 'mochi', 'โมจิ'], 'หาขวดเล็กๆ ที่กำลังเทน้ำเชื่อมสีดำ', 'Find the little bottle pouring the black syrup',
    // a small tray of three soft mochi cubes dusted with golden kinako, a tiny fish-shaped bottle pouring dark syrup over them, the square furoshiki cloth they come wrapped in knotted behind
    P('M40 112l60-40 60 40-60 34z', '#B3E5FC') + Lc('M52 112l48-30 48 30', '#E1F5FE', 3) + P('M92 66c-8-10 0-18 8-10 8-8 16 0 8 10z', '#B3E5FC')
      + P('M34 150l28-24h116l28 24-28 22H62z', '#FFFFFF') + P('M44 150l22-18h108l22 18-22 16H66z', '#F5DEB3', 0)
      + [[86, 144], [120, 140], [154, 146]].map(([x, y]) => R(x - 15, y - 11, 30, 24, '#E9C77B', 7) + C(x - 6, y - 4, 2, '#F6E2B3', 0) + C(x + 5, y + 2, 2, '#F6E2B3', 0)).join('')
      + g(176, 82, 1, E(0, 0, 22, 10, '#FFFFFF', 4) + P('M20 0l10-7v14z', '#FFFFFF', 4) + C(-10, -2, 2, INK, 0) + R(-30, -4, 8, 8, '#E53935', 2, 3), -32)
      + Lc('M150 100c-6 10-12 22-18 30', '#3E2723', 5) + E(126, 136, 10, 4, '#4E342E', 0) + face(120, 146, 0.26)),
  L('kongozue', 'ไม้เท้าปีนเขาฟูจิกับตราประทับไฟ', 'The Fuji climber’s stick and its burnt stamps', ['kongo-zue', 'คงโงซุเอะ', 'climbing stick', 'ไม้เท้าปีนเขา', 'branding stamps', 'ตราประทับไฟ', 'mountain huts', 'กระท่อมบนเขา', 'yoshida trail', 'เส้นทางโยชิดะ', 'fifth station', 'สถานีที่ห้า'], 'หากระดิ่งเล็กๆ ที่ห้อยอยู่ปลายไม้เท้า', 'Find the little bell hanging at the top of the stick',
    // a tall pale wooden eight-sided climbing stick standing slanted, covered in round and square brown burnt stamps from the huts, a little bell and a small white flag at the top
    E(120, 210, 52, 8, '#E0E0E0', 0) + g(120, 120, 1, R(-11, -96, 22, 186, '#F3E0B5', 6) + Lc('M0-94v182', '#E4C88E', 3)
      + [[-96 + 30, 'c'], [-96 + 62, 's'], [-96 + 94, 'c'], [-96 + 124, 's'], [-96 + 152, 'c']].map(([y, k]) => (k === 'c' ? C(0, y, 7, 'none', 3) + Lc(`M-3 ${y}h6M0 ${y - 3}v6`, '#6D4C41', 2.5) : R(-7, y - 7, 14, 14, 'none', 2, 3) + Lc(`M-3 ${y - 2}h6M-3 ${y + 2}h6`, '#6D4C41', 2.5))).join('')
      + P('M11-92l34 6-34 14z', '#FFFFFF') + C(-16, -70, 7, '#FFD54F', 3) + Lc('M-11-82l-5 6', INK, 2) + face(0, 34, 0.26, 'none'), -12)
      + Lc('M70 60c-6-4-12-4-16 0M180 150c6-4 12-4 16 0', '#B0BEC5', 3)),
  L('fujikyu', 'รถไฟฟูจิคิวลายภูเขาฟูจิยิ้ม', 'The Fujikyū train with smiling Fuji faces', ['fujikyu railway', 'รถไฟฟูจิคิว', 'fuji excursion', 'ฟูจิเอ็กซ์เคอร์ชัน', 'fujisan limited express', 'ฟูจิซังลิมิเต็ดเอ็กซ์เพรส', 'mount fuji station', 'สถานีภูเขาฟูจิ', 'otsuki', 'โอสึกิ', 'kawaguchiko station', 'สถานีคาวากุจิโกะ'], 'หาภูเขาฟูจิหน้ายิ้มบนข้างรถไฟ', 'Find the smiling Fuji painted on the side of the train',
    // a bright red-and-white train coming round a bend on its rails, a row of little smiling blue Fuji shapes painted along its side, its round headlights glowing, Fuji itself in the sky
    bg('#FFF8E1') + fuji(174, 106, 40, 38, '#7FA7E3') + low(172, '#AED581') + Lc('M28 194l184-13M28 206l184-13', '#8D6E63', 4) + Lc('M44 204l-2 10M84 201l-2 10M124 198l-2 10M164 195l-2 10M200 192l-2 10', '#8D6E63', 4)
      + P('M30 112h140c16 0 30 14 30 30v20c0 10-8 18-18 18H30z', '#E53935') + R(30, 150, 170, 14, '#FFFFFF', 0, 3)
      + R(40, 118, 24, 18, '#B3E5FC', 3, 3) + R(72, 118, 24, 18, '#B3E5FC', 3, 3) + R(104, 118, 24, 18, '#B3E5FC', 3, 3) + P('M140 118h28c10 0 18 8 20 18h-48z', '#B3E5FC')
      + [52, 92, 132].map((x) => P(`M${x - 12} 164l8-10h8l8 10z`, '#5C8FD6', 2.5) + P(`M${x - 4} 154h8l2 3h-12z`, '#FFFFFF', 0)).join('') + C(194, 164, 5, '#FFF59D', 3)
      + C(52, 184, 7, '#455A64', 3) + C(160, 184, 7, '#455A64', 3) + face(172, 142, 0.24) + frame),
  L('honcho', 'ถนนฮนโจโดริที่มีภูเขาไฟฟูจิอยู่สุดถนน', 'Honchō-dōri, the street that ends at Mount Fuji', ['honcho dori', 'honcho street', 'ถนนฮนโจโดริ', 'shimoyoshida', 'ชิโมโยชิดะ', 'fujiyoshida', 'ฟูจิโยชิดะ', 'retro shopping street', 'ถนนช้อปปิ้งย้อนยุค', 'street view of fuji', 'วิวฟูจิจากถนน'], 'หาภูเขาไฟฟูจิตรงปลายถนน', 'Find Mount Fuji at the very end of the street',
    // an old shopping street running straight uphill between low shops with colourful signs and wires overhead, Fuji filling the sky exactly at its end, a striped crossing in front
    bg('#E3F2FD') + fuji(120, 120, 78, 72) + low(196, '#CFD8DC') + P('M44 224L104 120h32l60 104z', '#B0BEC5') + Lc('M120 124v12M120 146v16M120 174v22', '#FFFFFF', 3)
      + P('M16 76l84 44v20L16 200z', '#FFECB3') + P('M224 76l-84 44v20l84 60z', '#FFE0B2') + Lc('M16 120l84 20M16 160l84-2M224 120l-84 20M224 160l-84-2', '#BCAAA4', 3)
      + P('M30 88l20 10v26l-20-6z', '#E53935', 3) + P('M66 104l14 8v18l-14-4z', '#1E88E5', 3) + P('M210 88l-20 10v26l20-6z', '#43A047', 3) + P('M174 104l-14 8v18l14-4z', '#FFB300', 3)
      + Lc('M16 52c40 30 80 50 104 54 24-4 64-24 104-54', '#455A64', 2.5) + Lc('M84 212h16M112 212h16M140 212h16', '#FFFFFF', 6) + frame + face(120, 76, 0.32)),
  L('junglebus', 'รถบัสหน้าสิงโตในฟูจิซาฟารีพาร์ก', 'The lion-faced jungle bus of Fuji Safari Park', ['fuji safari park', 'ฟูจิซาฟารีพาร์ก', 'jungle bus', 'รถบัสจังเกิล', 'lion bus', 'รถบัสหน้าสิงโต', 'safari', 'ซาฟารี', 'giraffe', 'ยีราฟ', 'susono', 'ซูโซโนะ'], 'หายีราฟที่ยื่นคอมาดูรถบัส', 'Find the giraffe leaning over to look at the bus',
    // a stripy safari bus whose front is a big smiling lion face with a fluffy orange mane, wheels on a dusty track, a tall giraffe leaning its neck over from the right
    bg('#FFF3E0') + low(176, '#DCE775') + Lc('M190 176v-60M206 176v-60', '#F9A825', 6) + P('M172 120c0-34 8-60 24-70l10 6c-12 12-16 36-16 64z', '#FFCA28') + E(204, 56, 13, 9, '#FFCA28') + Lc('M204 46l2-8M211 48l4-6', INK, 3)
      + C(184, 92, 4, '#A1887F', 0) + C(191, 72, 4, '#A1887F', 0) + C(180, 112, 4, '#A1887F', 0) + C(206, 54, 2, INK, 0)
      + R(56, 104, 124, 76, '#FFFFFF', 14) + Lc('M88 104v76M114 104v76M140 104v76', '#455A64', 8) + R(62, 112, 112, 24, '#B3E5FC', 6, 3) + Lc('M92 112v24M120 112v24M148 112v24', '#FFFFFF', 3)
      + C(68, 142, 34, '#FF9800') + Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return C(68 + 32 * Math.cos(a), 142 + 32 * Math.sin(a), 9, '#FB8C00', 3); }).join('') + C(68, 142, 24, '#FFCC80')
      + E(68, 152, 9, 6, '#FFE0B2', 3) + face(68, 138, 0.36, 'w') + C(104, 190, 10, '#455A64') + C(160, 190, 10, '#455A64') + C(104, 190, 4, '#B0BEC5', 0) + C(160, 190, 4, '#B0BEC5', 0) + frame),
  L('momiji', 'ระเบียงใบเมเปิลแดงริมทะเลสาบคาวากุจิ', 'The red maple corridor by Lake Kawaguchi', ['momiji corridor', 'ระเบียงโมมิจิ', 'momiji kairo', 'โมมิจิไคโระ', 'autumn leaves festival', 'เทศกาลใบไม้แดง', 'maple tunnel', 'อุโมงค์ใบเมเปิล', 'paper lanterns', 'โคมกระดาษ', 'lake kawaguchi', 'ทะเลสาบคาวากุจิ'], 'หาโคมกระดาษดวงที่สว่างที่สุด', 'Find the brightest paper lantern',
    // a path under an arch of red, orange and yellow maple trees, round paper lanterns hanging along it, a little stream reflecting the leaves, falling maple leaves
    bg('#FFF8E1') + low(170, '#BCAAA4') + P('M96 224l14-58h20l14 58z', '#D7CCC8') + P('M150 224c4-20 20-40 40-54h34v24a30 30 0 0 1-30 30z', '#4FC3F7', 0)
      + Lc('M44 210V110M196 210V110', '#6D4C41', 8) + C(50, 94, 30, '#E53935') + C(190, 94, 30, '#EF6C00') + C(120, 60, 38, '#FB8C00') + C(86, 66, 24, '#FFB300', 3) + C(156, 66, 24, '#D32F2F', 3)
      + [[70, 132], [96, 144], [144, 144], [170, 132]].map(([x, y], k) => Lc(`M${x} ${y - 16}v8`, INK, 2) + E(x, y, 9, 11, k === 1 ? '#FFF59D' : '#FFECB3', 3) + Lc(`M${x - 6} ${y}h12`, '#FFB74D', 2)).join('')
      + [[60, 186, 20], [172, 196, -30], [124, 200, 10]].map(([x, y, r]) => g(x, y, 1, P('M0-9l3 6 6-2-2 6 5 3-6 2v5l-6-3-6 3v-5l-6-2 5-3-2-6 6 2z', '#E53935', 2.5), r)).join('') + face(120, 60, 0.34) + frame),
  L('peach', 'ลูกพีชหวานของยามานาชิ', 'A sweet Yamanashi peach', ['yamanashi peach', 'พีชยามานาชิ', 'peach picking', 'เก็บพีช', 'momo', 'โมโม่', 'fruit orchard', 'สวนผลไม้', 'summer fruit', 'ผลไม้ฤดูร้อน', 'yamanashi', 'ยามานาชิ'], 'หาใบไม้สีเขียวสองใบบนลูกพีช', 'Find the two green leaves on the peach',
    // a big round pink-and-cream peach with its soft crease and a smiling face, two green leaves on its little stem, a woven picking basket with two more peaches beside it
    P('M20 170h86l-8 40H28z', '#C8A165') + Lc('M26 182h76M28 196h72', '#A1887F', 3) + C(46, 160, 18, '#F8BBD0', 4) + C(80, 160, 18, '#FFCCBC', 4)
      + P('M140 64c40-6 70 20 70 62s-28 70-62 70-62-28-62-66c0-36 20-62 54-66z', '#FFCCBC') + P('M150 72c40 4 56 30 56 56 0 30-22 58-50 64 34-26 34-90-6-120z', '#F48FB1', 0)
      + Lc('M140 66c-10 30-8 80 8 126', '#F06292', 3) + Lc('M140 64c2-10 6-16 10-20', '#6D4C41', 4) + P('M148 46c14-14 32-12 40-4-14 6-26 8-40 4zM146 48c-8-14-24-16-34-10 12 6 22 10 34 10z', '#66BB6A') + face(150, 124, 0.46)),
  L('fujicurry', 'ข้าวแกงกะหรี่รูปภูเขาไฟฟูจิ', 'Fuji curry, a rice mountain in a curry lake', ['fuji curry', 'แกงกะหรี่ฟูจิ', 'mount fuji curry rice', 'ข้าวแกงกะหรี่ภูเขาไฟฟูจิ', 'blue rice', 'ข้าวสีฟ้า', 'japanese curry', 'แกงกะหรี่ญี่ปุ่น', 'kawaguchiko', 'คาวากุจิโกะ'], 'หาธงเล็กๆ ที่ปักบนยอดภูเขาข้าว', 'Find the little flag on top of the rice mountain',
    // a wide white plate: a mountain of pale blue rice with a white rice snow cap in the middle, a lake of golden-brown curry all round it with potato and carrot pieces, a tiny flag on top
    E(120, 168, 104, 36, '#FFFFFF') + E(120, 166, 90, 28, '#D99A3C') + E(120, 164, 80, 22, '#E6AC4A', 0)
      + fuji(120, 166, 54, 74, '#90CAF9', 4) + Lc('M120 88v-20', INK, 3) + P('M120 68l18 6-18 6z', '#E53935', 3)
      + [[54, 168, '#FFE082'], [76, 180, '#FF8A65'], [166, 180, '#FFE082'], [188, 166, '#FF8A65']].map(([x, y, c]) => R(x - 8, y - 6, 16, 12, c, 3, 3)).join('') + face(120, 132, 0.36)),
  L('fujiyamacookie', 'คุกกี้รูปภูเขาไฟฟูจิของคาวากุจิโกะ', 'Fuji-shaped cookies from Kawaguchiko', ['fujiyama cookie', 'คุกกี้ฟูจิยามะ', 'mount fuji cookies', 'คุกกี้รูปภูเขาไฟฟูจิ', 'kawaguchiko souvenir', 'ของฝากคาวากุจิโกะ', 'honey cookies', 'คุกกี้น้ำผึ้ง', 'gift box', 'กล่องของฝาก'], 'หาคุกกี้ชิ้นที่ถูกกัดไปหนึ่งคำ', 'Find the cookie with one bite taken out',
    // three golden cookies shaped like little flat-topped Fuji mountains, one plain, one with white icing snow, one with a bite out of it, standing in front of an open blue gift box with tissue paper
    P('M40 104l20-34h120l20 34z', '#1E5AA8') + R(40, 104, 160, 60, '#1E88E5') + Lc('M60 74l120 0', '#FFFFFF', 3) + P('M60 104c10-14 20-4 30-14s20 6 30-4 20 8 30 0 20 6 30 0v14H60z', '#FFFFFF', 3)
      + g(64, 184, 1, P('M-34 0l22-48q12-6 24 0l22 48z', '#E8A64B') + C(-8, -22, 2, '#C27A2B', 0) + C(8, -12, 2, '#C27A2B', 0))
      + g(120, 184, 1, P('M-34 0l22-48q12-6 24 0l22 48z', '#E8A64B') + P('M-12-48q12-6 24 0l6 14c-6-4-10 4-14 0s-8 4-12 0-6 2-10 0z', '#FFFFFF', 3) + face(0, -14, 0.3))
      + g(176, 184, 1, P('M-34 0l22-48q12-6 24 0l8 18a10 10 0 0 0 8 20l6 10z', '#E8A64B') + C(-6, -18, 2, '#C27A2B', 0))),
  L('kimono', 'กิโมโนลายภูเขาไฟฟูจิที่พิพิธภัณฑ์อิจจิกุคุโบตะ', 'A kimono painted with Mount Fuji at the Itchiku Kubota museum', ['itchiku kubota art museum', 'พิพิธภัณฑ์อิจจิกุคุโบตะ', 'kimono art', 'ศิลปะกิโมโน', 'tsujigahana dyeing', 'การย้อมสึจิกาฮานะ', 'kimono', 'กิโมโน', 'kawaguchiko', 'คาวากุจิโกะ'], 'หาภูเขาไฟฟูจิบนแขนกิโมโน', 'Find Mount Fuji on the kimono’s sleeves',
    // a kimono hung open on a black wooden stand, its cloth dyed from deep blue at the top to sunset orange at the hem, a big snowy Fuji across the middle and red maple leaves on the sleeves
    Lc('M24 56h192', '#3E2723', 8) + Lc('M40 56v156M200 56v156', '#3E2723', 7) + Lc('M30 212h30M180 212h30', '#3E2723', 7)
      + P('M50 62h140l14 70-30 4v66H66v-66l-30-4z', '#283593') + P('M66 150h108v52H66z', '#FF8A65', 0) + P('M66 130h108v20H66z', '#9575CD', 0)
      + fuji(120, 152, 50, 58, '#5C6BC0', 3) + P('M110 62l10 40 10-40z', '#FFFFFF') + Lc('M110 62l10 40 10-40', '#E53935', 3)
      + [[54, 96, 10], [182, 104, -20], [80, 186, 30], [160, 176, 0]].map(([x, y, r]) => g(x, y, 0.9, P('M0-9l3 6 6-2-2 6 5 3-6 2v5l-6-3-6 3v-5l-6-2 5-3-2-6 6 2z', '#E53935', 2.5), r)).join('') + face(120, 138, 0.3, 'none')),
];

export default {
  places: {
    'jp-fuji': { country: 'jp', wave: 3, name: nm('ภูเขาไฟฟูจิและห้าทะเลสาบ', 'Mount Fuji and the Five Lakes'), tz: 'Asia/Tokyo', ll: [35.5, 138.76],
      alias: ['kawaguchiko', 'คาวากุจิโกะ', 'fuji five lakes', 'ห้าทะเลสาบฟูจิ', 'fujigoko', 'fujikawaguchiko', '河口湖', '富士五湖', 'lake kawaguchi', 'ทะเลสาบคาวากุจิ', 'fujiyoshida', 'ฟูจิโยชิดะ', '富士吉田',
        'fuji-q highland', 'ฟูจิคิวไฮแลนด์', 'chureito pagoda', 'เจดีย์ชูเรโตะ', 'arakurayama', 'oshino hakkai', 'โอชิโนะฮักไก', 'lake yamanaka', 'yamanakako', 'ทะเลสาบยามานากะ',
        'lake motosu', 'ทะเลสาบโมโตสึ', 'lake saiko', 'lake shoji', 'narusawa', 'mount fuji', 'mt fuji', 'mt. fuji', 'ภูเขาไฟฟูจิ', '富士山', 'fujinomiya', 'ฟูจิโนมิยะ', 'shiraito falls', 'น้ำตกชิราอิโตะ'],
      colors: FJ },
  },
  items,
};
