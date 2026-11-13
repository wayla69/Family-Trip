// Wave 14, Japan: Nagano and Matsumoto — the city stamp, two day scenes and seventeen landmarks of the crow castle town, the
// temple city of Nagano, the Japan Alps valleys of Kamikochi, Hakuba and Azumino, and the old Kiso road's foods and crafts
// (no snow monkeys, no hot spring, no apple orchard, no dumplings, no ski slope, no religious figure)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const NG = { k1: '#2B3A55', k2: '#5B8C3A', k3: '#EEF6F0' };
const CITY = 'jp-nagano', DIR = 'jp/nagano';
const L = (slug, th, en, kw, spot, svg) => ({ id: `${CITY}.landmark.${slug}`, cat: 'landmark', file: `${DIR}/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot, svg: free(svg) });
const D = (slug, th, en, kw, svg) => ({ id: `${CITY}.day.${slug}`, cat: 'day', file: `${DIR}/day-${slug}.v1.svg`, name: nm(th, en), kw, svg });

// Matsumoto Castle: a black-walled keep with white plaster bands and stacked dark roofs (x = centre, b = base, s = scale)
const crow = (x, b, s, sw) => {
  let o = R(x - 40 * s, b - 22 * s, 80 * s, 22 * s, '#9E9E9E', 0, sw);
  const tiers = [[34, 22], [30, 20], [25, 18], [20, 18], [15, 16]];
  let y = b - 22 * s;
  tiers.forEach(([hw, h], k) => {
    o += R(x - hw * s, y - h * s, 2 * hw * s, h * s, '#263238', 0, sw) + R(x - hw * s, y - h * s, 2 * hw * s, 6 * s, '#FAFAFA', 0, sw)
      + R(x - 4 * s, y - (h - 9) * s, 8 * s, 6 * s, '#FAFAFA', 0, sw);
    y -= h * s;
    o += P(`M${x - (hw + 8) * s} ${y + 4 * s}q${2 * s}-${6 * s} ${8 * s}-${6 * s}h${2 * hw * s}q${6 * s} 0 ${8 * s} ${6 * s}z`, '#37474F', sw);
    if (k === 2) o += P(`M${x - 8 * s} ${y + 2 * s}l${8 * s}-${8 * s} ${8 * s} ${8 * s}z`, '#37474F', sw);
  });
  return o + P(`M${x - 18 * s} ${y}l${18 * s}-${12 * s} ${18 * s} ${12 * s}z`, '#37474F', sw) + C(x - 16 * s, y - 2 * s, 2.5 * s, '#FFC107', 0) + C(x + 16 * s, y - 2 * s, 2.5 * s, '#FFC107', 0);
};
// a jagged snowy Alps ridge across the frame
const alps = (y, c = '#90A4AE') => P(`M-4 ${y}l30-40 20 18 30-44 26 30 28-50 30 38 26-28 30 36 26-20v60H-4z`, c) + P(`M54 ${y - 66}l-10 14 10-4 10 6zM110 ${y - 70}l-12 18 12-6 10 8zM166 ${y - 46}l-8 12 8-4 8 4z`, '#FFFFFF', 0);

const items = [
  { id: `${CITY}.stamp`, cat: 'stamp', file: `${DIR}/stamp.v1.svg`, name: nm('ตราประทับนากาโน่', 'Nagano stamp'), kw: ['nagano', 'นากาโน่', 'matsumoto castle', 'ปราสาทมัตสึโมโตะ', 'crow castle', 'ปราสาทอีกา', 'japan alps', 'เทือกเขาแอลป์ญี่ปุ่น'],
    // the black Matsumoto Castle keep in front of a white-tipped Alps ridge
    svg: cityStamp('ng-st', { name: 'NAGANO', sub: 'MATSUMOTO · JAPAN', ...NG, emblem: P('M52 112l16-24 12 10 18-26 16 18 14-22 20 30 6 14z', '#B0BEC5', 2.5) + crow(100, 140, 0.62, 2.5) + Lc('M60 142h80', '#4FC3F7', 3) }) },

  D('hakuba', 'หุบเขาฮาคุบะใต้ยอดเขาสามลูกในหน้าร้อน', 'The Hakuba valley under its three white peaks in summer', ['hakuba', 'ฮาคุบะ', 'hakuba sanzan', 'ยอดเขาฮาคุบะซันซัง', 'northern alps', 'เทือกเขาแอลป์เหนือ', 'rice paddies', 'นาข้าว', 'mountain village', 'หมู่บ้านในหุบเขา'],
    // three jagged snow-streaked peaks over green foothills, shining flooded rice paddies with a farmhouse and a little stream in the valley
    scene('ng-d1', '#D6EEFF', P('M-4 120l40-56 24 20 36-60 30 40 34-50 30 48 26-12 28 30v60H-4z', '#8FA6B8', 0)
      + P('M76 24l-14 20 10-4 8 8 6-10zM142 32l-12 18 12-4 8 6zM100 78l-10 10 10-2z', '#FFFFFF', 0) + P('M-4 118c50-16 120-20 248 0v40H-4z', '#7CB342')
      + [[-4, 150, '#AED581'], [60, 150, '#81D4FA'], [130, 150, '#AED581'], [-4, 186, '#81D4FA'], [80, 186, '#C5E1A5'], [160, 186, '#81D4FA']].map(([x, y, c]) => P(`M${x} ${y}h${x < 0 ? 64 : 70}l-6 36H${x - 6}z`, c, 3)).join('')
      + R(166, 120, 40, 26, '#FFF8E1', 0, 3) + P('M160 122l26-20 26 20z', '#5D4037', 3) + R(180, 130, 10, 16, '#8D6E63', 0, 2.5)
      + Lc('M210 150c-20 20-30 50-40 90', '#4FC3F7', 6) + C(30, 130, 12, '#43A047') + C(140, 132, 10, '#43A047') + face(108, 104, 0.26))),

  D('azumino', 'ไร่วาซาบิในลำธารใสที่อาซูมิโนะ', 'The wasabi fields in the clear streams of Azumino', ['azumino', 'อาซูมิโนะ', 'wasabi farm', 'ไร่วาซาบิ', 'daio wasabi', 'ไดโอวาซาบิ', 'clear spring water', 'น้ำใสจากตาน้ำ', 'willow trees', 'ต้นหลิว'],
    // long rows of bright green wasabi plants on grey gravel beds between channels of clear blue water, weeping willows along a stream, the Alps behind
    scene('ng-d2', '#E8F5E9', alps(96) + P('M-4 92c60-10 180-10 248 0v26H-4z', '#81C784', 0)
      + [0, 1, 2, 3, 4].map((k) => { const y = 120 + k * 22; return P(`M-4 ${y}h248v12H-4z`, '#B0BEC5', 0) + P(`M-4 ${y + 12}h248v10H-4z`, '#4FC3F7', 0)
        + [10, 34, 58, 82, 106, 130, 154, 178, 202, 226].map((x) => P(`M${x + (k % 2) * 12} ${y + 8}c-8-2-10-10-4-14 2 4 4 6 4 14zM${x + (k % 2) * 12} ${y + 8}c8-2 10-10 4-14-2 4-4 6-4 14z`, '#43A047', 2)).join(''); }).join('')
      + [[30, 100], [206, 100]].map(([x, y]) => Lc(`M${x} ${y + 30}v-26`, '#6D4C41', 4) + P(`M${x - 22} ${y + 30}c0-30 10-42 22-42s22 12 22 42c-6-14-10-18-12-6-4-14-14-14-20 0-2-10-8-8-12 6z`, '#9CCC65', 3)).join('')
      + face(120, 210, 0.26))),

  L('matsumotocastle', 'ปราสาทมัตสึโมโตะ ปราสาทอีกาดำ', 'Matsumoto Castle, the black crow castle', ['matsumoto castle', 'ปราสาทมัตสึโมโตะ', 'crow castle', 'ปราสาทอีกา', 'black castle', 'ปราสาทสีดำ', 'castle moat', 'คูเมือง', 'national treasure', 'สมบัติแห่งชาติ'], nm('หาปลาทองเล็กๆ สองตัวบนหลังคาสูงสุด', 'Find the two little gold fish on the very top roof'),
    // the tall five-tiered black-and-white castle keep on a grey stone base with a smaller turret beside it, mirrored in a blue moat, the snowy Alps behind
    P('M14 120l30-40 22 18 30-40 24 26 30-36 26 30 20-14 24 30v26H14z', '#B0BEC5') + crow(110, 172, 1.25) + g(184, 172, 0.7, crow(0, 0, 1))
    + R(14, 172, 212, 42, '#4FC3F7', 16) + E(110, 186, 40, 6, '#37474F', 0) + Lc('M40 200h40M150 204h50', '#E1F5FE', 3) + face(110, 140, 0.32)),

  L('zenkoji', 'ศาลาใหญ่ของวัดเซ็นโคจิในเมืองนากาโน่', 'The great main hall of Zenko-ji in Nagano', ['zenko-ji', 'วัดเซ็นโคจิ', 'zenkoji temple', 'วัดเซ็นโคจิ', 'main hall', 'ศาลาหลัก', 'huge roof', 'หลังคาใหญ่', 'nagano city', 'เมืองนากาโน่'], nm('หาหน้าจั่วโค้งตรงกลางหลังคา', 'Find the curved gable in the middle of the roof'),
    // a huge dark-wood temple hall under a gigantic sweeping dark-brown bark roof with a curved front gable, wide steps and a stone-paved forecourt (building only)
    R(14, 198, 212, 16, '#BDBDBD', 6) + R(40, 140, 160, 58, '#A1887F') + [56, 80, 104, 136, 160, 184].map((x) => Lc(`M${x} 144v54`, '#6D4C41', 5)).join('')
    + R(104, 158, 32, 40, '#5D4037', 0, 3) + [0, 1, 2].map((k) => R(96 - k * 6, 190 + k * 4, 48 + k * 12, 4, '#9E9E9E', 0, 2)).join('')
    + P('M4 146c40-10 70-40 84-92h64c14 52 44 82 84 92z', '#4E342E') + Lc('M24 138c30-10 52-36 66-80M216 138c-30-10-52-36-66-80', '#6D4C41', 3)
    + P('M90 118c0-22 30-40 30-40s30 18 30 40c-10-6-20-20-30-28-10 8-20 22-30 28z', '#6D4C41') + R(84, 48, 72, 8, '#3E2723') + face(120, 172, 0.3)),

  L('togakushi', 'ประตูหลังคามุงฟางสีแดงที่ศาลเจ้าโทงาคุชิ', 'The red thatched gate of Togakushi Okusha', ['togakushi shrine', 'ศาลเจ้าโทงาคุชิ', 'zuishinmon', 'ประตูซุยชินมง', 'thatched gate', 'ประตูหลังคามุงฟาง', 'mossy roof', 'หลังคามีมอส', 'okusha path', 'ทางเดินโอคุชะ'], nm('หามอสสีเขียวบนหลังคาฟาง', 'Find the green moss on the thatched roof'),
    // a vermilion wooden gate under a thick, steep thatched roof furry with green moss, a stone path running through it, two tall straight trunks on either side
    Lc('M24 214V20M216 214V20', '#6D4C41', 14) + P('M24 30l-10 20h20zM216 26l-10 22h20z', '#2E5E3A', 0)
    + R(60, 120, 120, 90, '#D84315') + R(96, 132, 48, 78, '#4E342E', 0, 3) + Lc('M70 124v86M170 124v86', '#BF360C', 6)
    + P('M30 126c20-20 40-70 90-80 50 10 70 60 90 80z', '#C9A86A') + Lc('M54 112c20-20 38-46 66-56M186 112c-20-20-38-46-66-56', '#A68A4F', 3)
    + P('M60 100c10-12 30-18 44-14-10 10-30 16-44 14zM132 84c14-6 32-2 42 10-14 4-32 2-42-10z', '#7CB342', 2.5) + R(30, 120, 180, 10, '#8D6E63')
    + P('M100 214l8-6h24l8 6z', '#BDBDBD', 2.5) + face(120, 110, 0.36)),

  L('kaichi', 'โรงเรียนเก่าไคจิในมัตสึโมโตะ', 'The old Kaichi School in Matsumoto', ['kaichi school', 'โรงเรียนไคจิ', 'old school', 'โรงเรียนเก่า', 'pseudo-western building', 'อาคารกึ่งตะวันตก', 'octagonal tower', 'หอแปดเหลี่ยม', 'meiji era', 'ยุคเมจิ'], nm('หาหอคอยแปดเหลี่ยมบนหลังคา', 'Find the eight-sided tower on the roof'),
    // a white two-storey Meiji-era school with blue-grey tiled roofs, a curved Japanese entrance porch with a cloud-shaped carving, and an eight-sided lookout tower with tall windows on top
    R(14, 198, 212, 14, '#BDBDBD', 6) + R(24, 116, 192, 82, '#FAFAFA') + P('M16 118l14-16h180l14 16z', '#607D8B')
    + [[36, 128], [60, 128], [160, 128], [184, 128], [36, 162], [60, 162], [160, 162], [184, 162]].map(([x, y]) => R(x, y, 18, 24, '#B3E5FC', 0, 3)).join('')
    + R(90, 120, 60, 78, '#FAFAFA') + P('M82 126c10-12 26-18 38-18s28 6 38 18z', '#607D8B') + P('M98 122c6-8 14-8 22-4 8-4 16-4 22 4z', '#81D4FA', 2.5)
    + R(104, 150, 32, 48, '#8D6E63', 0, 3) + R(94, 140, 52, 6, '#90A4AE', 0, 2.5)
    + R(104, 56, 32, 46, '#FAFAFA') + Lc('M112 62v32M120 62v32M128 62v32', '#B3E5FC', 4) + P('M98 58l22-22 22 22z', '#607D8B') + Lc('M120 36v-14', '#455A64', 3) + R(96, 100, 48, 12, '#607D8B')
    + face(120, 82, 0.24)),

  L('nawate', 'กบตัวโตแห่งถนนนาวาเตะ', 'The big frog of Nawate Street', ['nawate street', 'ถนนนาวาเตะ', 'frog street', 'ถนนกบ', 'kaeru', 'กบคาเอรุ', 'metoba river', 'แม่น้ำเมโทบะ', 'little shops', 'ร้านเล็กๆ'], nm('หากบตัวจิ๋วที่นั่งบนหัวกบตัวโต', 'Find the tiny frog sitting on the big frog\'s head'),
    // a big round smiling green frog statue sitting on a grey rock with two little frogs beside it and a baby frog on its head, wooden shop eaves and a river behind
    R(14, 54, 212, 22, '#8D6E63', 4) + Lc('M30 76v40M120 76v40M210 76v40', '#6D4C41', 4) + R(14, 112, 212, 18, '#4FC3F7', 6)
    + E(120, 196, 70, 18, '#9E9E9E') + E(120, 152, 56, 46, '#66BB6A') + E(120, 168, 34, 24, '#C5E1A5', 0)
    + C(92, 112, 16, '#66BB6A') + C(148, 112, 16, '#66BB6A') + C(92, 112, 8, '#FFFFFF', 3) + C(148, 112, 8, '#FFFFFF', 3) + C(92, 113, 4, INK, 0) + C(148, 113, 4, INK, 0)
    + E(98, 136, 7, 4, '#FF8FA3', 0) + E(142, 136, 7, 4, '#FF8FA3', 0) + Lc('M106 138q14 10 28 0', INK, 3.5)
    + [[40, 196], [200, 196]].map(([x, y]) => E(x, y, 20, 14, '#81C784') + C(x - 8, y - 12, 6, '#81C784') + C(x + 8, y - 12, 6, '#81C784') + C(x - 8, y - 12, 2, INK, 0) + C(x + 8, y - 12, 2, INK, 0)).join('')
    + E(120, 88, 12, 8, '#AED581') + C(114, 82, 4, '#AED581') + C(126, 82, 4, '#AED581') + C(114, 82, 1.5, INK, 0) + C(126, 82, 1.5, INK, 0)),

  L('nakamachi', 'โกดังผนังลายตารางที่ถนนนากามาจิ', 'The white storehouses of Nakamachi Street', ['nakamachi street', 'ถนนนากามาจิ', 'kura storehouses', 'โกดังคุระ', 'namako walls', 'ผนังลายนามาโกะ', 'black and white tiles', 'กระเบื้องลายขาวดำ', 'old merchant town', 'ย่านพ่อค้าเก่า'], nm('หาลายตารางขาวดำที่ผนังด้านล่าง', 'Find the black-and-white criss-cross on the lower walls'),
    // two white plaster storehouses with heavy black tiled roofs and thick shuttered windows, their lower walls covered in a black-and-white diagonal tile grid, a lantern-free stone lane
    R(14, 198, 212, 14, '#BDBDBD', 6)
    + [[22, 90, 92], [126, 100, 92]].map(([x, y, w]) => R(x, y, w, 198 - y, '#FAFAFA') + P(`M${x - 8} ${y + 2}l10-18h${w - 4}l10 18z`, '#263238') + R(x - 4, y - 20, w + 8, 6, '#37474F', 0, 3)
      + R(x, 150, w, 48, '#37474F') + [0, 1, 2, 3, 4, 5, 6].map((k) => Lc(`M${x + k * 14} 150l${Math.min(48, w - k * 14)} ${Math.min(48, w - k * 14)}`, '#FAFAFA', 2.5)).join('')
      + [0, 1, 2, 3, 4, 5, 6].map((k) => Lc(`M${x + w - k * 14} 150l-${Math.min(48, w - k * 14)} ${Math.min(48, w - k * 14)}`, '#FAFAFA', 2.5)).join('')
      + R(x + w / 2 - 14, y + 18, 28, 26, '#263238', 0, 3) + R(x + w / 2 - 10, y + 22, 20, 18, '#FAFAFA', 0, 2)).join('')
    + face(68, 136, 0.3) + face(172, 140, 0.3)),

  L('kappabashi', 'สะพานคัปปะบาชิใต้ยอดเขาโฮทากะที่คามิโคจิ', 'Kappa Bridge under the Hotaka peaks at Kamikochi', ['kappa bridge', 'สะพานคัปปะ', 'kappabashi', 'คัปปะบาชิ', 'kamikochi', 'คามิโคจิ', 'hotaka mountains', 'เทือกเขาโฮทากะ', 'azusa river', 'แม่น้ำอาซูสะ'], nm('หาสะพานไม้แคบๆ ข้ามแม่น้ำ', 'Find the narrow wooden bridge over the river'),
    // a narrow wooden footbridge hung on low cables over the clear turquoise Azusa River, rocky grey Hotaka peaks with snow patches behind, larch trees on the banks
    P('M14 120l26-50 20 20 26-56 22 34 24-40 26 42 20-20 32 70z', '#90A4AE') + P('M84 34l-10 18 10-4 6 6zM132 38l-10 16 10-4 8 4z', '#FFFFFF', 0)
    + P('M14 118h212v20H14z', '#7CB342') + R(14, 138, 212, 76, '#4DD0E1', 24) + Lc('M40 168h30M150 190h40M70 200h40', '#E0F7FA', 3)
    + Lc('M30 144q90 26 180 0', '#8D6E63', 8) + Lc('M30 126q90 22 180 0', '#455A64', 3) + Lc('M60 132v18M90 138v18M120 140v16M150 138v18M180 132v18', '#455A64', 2.5)
    + Lc('M30 150v-34M210 150v-34', '#6D4C41', 6)
    + [[24, 116], [216, 116]].map(([x, b]) => Lc(`M${x} ${b}v-28`, '#6D4C41', 3) + P(`M${x - 10} ${b - 10}l10-26 10 26z`, '#9CCC65')).join('') + face(120, 108, 0.3)),

  L('nezame', 'โขดหินแกรนิตเนซาเมะโนะโทโกะในแม่น้ำคิโซะ', 'Nezame-no-toko, the granite blocks in the Kiso River', ['nezame-no-toko', 'เนซาเมะโนะโทโกะ', 'granite rocks', 'โขดหินแกรนิต', 'kiso river', 'แม่น้ำคิโซะ', 'emerald water', 'น้ำสีมรกต', 'kiso valley', 'หุบเขาคิโซะ'], nm('หาหินสี่เหลี่ยมที่เหมือนเต้าหู้ก้อนโต', 'Find the square rocks that look like big tofu blocks'),
    // big pale granite blocks cracked into squares like tofu, stacked in an emerald river pool, two little pine trees growing on top
    R(14, 150, 212, 64, '#26A69A', 24) + Lc('M30 186h40M150 196h50', '#B2DFDB', 3)
    + P('M30 160l10-50h60l10 50z', '#E0E0E0') + P('M90 168l6-74h70l8 74z', '#EEEEEE') + P('M156 160l8-40h54l4 40z', '#E0E0E0')
    + Lc('M40 130h66M60 110v50M96 120h76M130 94v74M164 140h56M190 120v40', '#BDBDBD', 3)
    + [[120, 94], [190, 120]].map(([x, b]) => Lc(`M${x} ${b}v-20`, '#6D4C41', 4) + P(`M${x - 18} ${b - 18}c6-10 30-10 36 0zM${x - 12} ${b - 28}c6-8 18-8 24 0z`, '#2E7D32')).join('')
    + face(130, 140, 0.32)),

  L('utsukushigahara', 'หอหินบนที่ราบสูงอุตสึกุชิงาฮาระ', 'The stone tower on the Utsukushigahara plateau', ['utsukushigahara', 'อุตสึกุชิงาฮาระ', 'utsukushi-no-to', 'หออุตสึกุชิโนะโท', 'highland plateau', 'ที่ราบสูง', 'stone tower', 'หอหิน', 'alpine meadow', 'ทุ่งหญ้าบนเขา'], nm('หาระฆังเล็กๆ ที่ยอดหอหิน', 'Find the little bell at the top of the stone tower'),
    // a tall square grey stone tower with a little bronze bell in an opening near its top, standing on a rolling green plateau with white and yellow flowers, clouds below the edge
    P('M14 150c40-24 160-24 212 0v64H14z', '#9CCC65') + R(98, 52, 44, 140, '#B0BEC5') + Lc('M98 90h44M98 130h44M98 170h44', '#90A4AE', 3)
    + R(108, 62, 24, 22, '#546E7A', 0, 3) + P('M114 80c0-10 4-14 6-14s6 4 6 14z', '#C9A227', 2.5) + P('M94 54l26-14 26 14z', '#90A4AE')
    + [[40, 176], [64, 190], [170, 182], [196, 196], [150, 200], [80, 204]].map(([x, y], k) => C(x, y, 5, k % 2 ? '#FFEB3B' : '#FFFFFF', 2.5)).join('')
    + P('M20 140c4-10 18-10 22 0 8 0 10 10 2 12H18c-8-2-6-12 2-12zM180 134c4-10 18-10 22 0 8 0 10 10 2 12h-26c-8-2-6-12 2-12z', '#FFFFFF', 3) + face(120, 116, 0.32)),

  L('shichimi', 'พริกเจ็ดรสในกระบอกไม้รูปน้ำเต้า', 'Shichimi spice in a wooden gourd shaker', ['shichimi', 'ชิจิมิ', 'seven-spice pepper', 'พริกเจ็ดรส', 'gourd shaker', 'กระบอกน้ำเต้า', 'zenkoji souvenir', 'ของฝากเซ็นโคจิ', 'chilli flakes', 'พริกป่น'], nm('หาเกล็ดพริกสีแดงที่หกออกมา', 'Find the red chilli flakes that spilled out'),
    // a little gourd-shaped wooden shaker in warm brown with a cork stopper, a small heap of orange-red seven-spice flakes with green and black bits spilled beside it, two red chillies
    P('M96 40h28v16H96z', '#D7A86E') + P('M110 56c-20 0-26 14-26 26 0 10 6 14 6 18-16 10-26 26-26 46 0 30 24 56 46 56s46-26 46-56c0-20-10-36-26-46 0-4 6-8 6-18 0-12-6-26-26-26z', '#A0522D')
    + E(110, 104, 26, 5, '#7B3F1C', 0) + Lc('M80 150c6 20 20 30 30 32', '#C68B5E', 4)
    + P('M150 200c10-24 50-24 66 0z', '#E2582B') + [[160, 196, '#2E7D32'], [176, 190, '#212121'], [190, 194, '#FFC107'], [200, 198, '#2E7D32'], [170, 200, '#212121']].map(([x, y, c]) => C(x, y, 2.5, c, 0)).join('')
    + P('M20 188c20-10 40-6 46 0-8 6-30 8-46 0zM30 204c18-8 36-4 42 2-8 4-28 6-42-2z', '#E53935', 2.5) + face(110, 150, 0.4)),

  L('magemono', 'กล่องข้าวไม้ดัดฮิโนกิแห่งคิโซะ', 'A Kiso bentwood lunch box of cypress', ['magemono', 'มาเงะโมโนะ', 'bentwood box', 'กล่องไม้ดัด', 'kiso hinoki', 'ไม้ฮิโนกิคิโซะ', 'bento box', 'กล่องเบนโตะ', 'cherry bark stitching', 'เย็บด้วยเปลือกซากุระ'], nm('หารอยเย็บเปลือกไม้สีน้ำตาลที่ข้างกล่อง', 'Find the brown bark stitches on the side of the box'),
    // an oval pale-cypress bentwood lunch box filled with rice, a pickled plum and a rolled omelette, its matching lid leaning behind, brown cherry-bark stitches on the sides
    E(150, 92, 70, 40, '#F3D9A4') + E(150, 92, 60, 32, '#E8C98A', 0) + R(196, 70, 14, 30, '#A1887F', 3, 2.5)
    + P('M30 130c0-20 40-28 90-28s90 8 90 28v40c0 20-40 30-90 30s-90-10-90-30z', '#F3D9A4') + E(120, 130, 90, 28, '#FFFFFF') + E(120, 130, 80, 22, '#FAFAFA', 0)
    + C(98, 128, 9, '#E53935', 3) + R(132, 118, 32, 18, '#FFD54F', 4, 3) + Lc('M140 118v18M152 118v18', '#FBC02D', 2)
    + R(40, 150, 14, 30, '#8D6E63', 3, 2.5) + R(186, 150, 14, 30, '#8D6E63', 3, 2.5) + Lc('M60 160q60 14 120 0', '#D7B37A', 3) + face(120, 172, 0.36)),

  L('goheimochi', 'โกเฮโมจิย่างทาซอสมิโซะวอลนัต', 'Gohei mochi, grilled rice cakes with walnut miso', ['gohei mochi', 'โกเฮโมจิ', 'grilled rice cake', 'ข้าวเหนียวย่าง', 'walnut miso', 'ซอสมิโซะวอลนัต', 'kiso road', 'ถนนคิโซะ', 'flat stick', 'ไม้เสียบแบน'], nm('หาไม้แบนกว้างที่เสียบโมจิ', 'Find the wide flat stick through the rice cake'),
    // two flat oval rice cakes on wide flat wooden sticks, glazed shiny brown with walnut-miso sauce and grill marks, leaning over a little bed of glowing charcoal
    R(30, 180, 180, 30, '#5D4037', 10) + [[56, 190], [90, 194], [124, 188], [158, 194], [190, 190]].map(([x, y]) => C(x, y, 8, '#FF7043', 2.5)).join('')
    + [[86, -12], [154, 12]].map(([x, r]) => g(x, 110, 1, R(-7, 30, 14, 66, '#D7A86E', 3) + E(0, 0, 30, 46, '#F5F0E1') + E(0, 0, 26, 40, '#A0612A', 0) + Lc('M-16 -16h32M-18 0h36M-16 16h32', '#6D3A12', 3) + E(-6, -24, 6, 3, '#D59A5E', 0), r)).join('')
    + face(86, 116, 0.3)),

  L('komakusa', 'ดอกโคมาคุสะสีชมพูบนกรวดภูเขา', 'Komakusa, the pink queen of the alpine gravel', ['komakusa', 'โคมาคุสะ', 'dicentra', 'ดอกโคมาคุสะ', 'alpine flower', 'ดอกไม้ภูเขาสูง', 'queen of alpine plants', 'ราชินีพืชภูเขา', 'scree slope', 'ลาดกรวดบนเขา'], nm('หาดอกสีชมพูที่ห้อยเป็นพวงเหมือนหัวใจ', 'Find the pink flowers hanging like little hearts'),
    // a tuft of feathery blue-green leaves growing out of grey gravel, several arching stems hung with heart-shaped pink flowers, pebbles all round
    P('M14 214c20-24 192-24 212 0z', '#B0BEC5') + [[40, 204], [70, 198], [170, 198], [200, 206], [120, 206]].map(([x, y]) => E(x, y, 9, 5, '#90A4AE', 2.5)).join('')
    + [[-1, 0.9], [1, 0.9], [-0.4, 1], [0.5, 1]].map(([d, s]) => P(`M120 190c${d * 20}-20 ${d * 40}-30 ${d * 56}-24c-${d * 6} 6-${d * 20} 4-${d * 30} 0c${d * 4} 10 0 18-${d * 10} 20`, '#80CBC4', 2.5)).join('')
    + [[-1, 1], [1, 1], [-0.3, 1.3]].map(([d, k]) => Lc(`M120 186c${d * 10}-50 ${d * 40}-90 ${d * 70}-${90 * k}`, '#C2185B', 3)).join('')
    + [[66, 104], [76, 120], [84, 138], [176, 104], [166, 120], [156, 138], [104, 70], [110, 88], [114, 106]].map(([x, y]) => P(`M${x} ${y}c-10 0-12 10-6 16l6 6 6-6c6-6 4-16-6-16z`, '#F48FB1', 2.5) + Lc(`M${x} ${y}v-6`, '#C2185B', 2)).join('')
    + face(120, 176, 0.3)),

  L('nozawana', 'ผักดองโนซาวานะสีเขียวสด', 'Nozawana-zuke, Nagano\'s green leaf pickles', ['nozawana', 'โนซาวานะ', 'leaf pickles', 'ผักใบดอง', 'tsukemono', 'ซึเกโมโนะ', 'shinshu pickles', 'ของดองชินชู', 'nozawa onsen village', 'หมู่บ้านโนซาวะ'], nm('หาตะเกียบที่คีบผักดองอยู่', 'Find the chopsticks picking up the pickles'),
    // a round indigo-glazed bowl heaped with bright green chopped leafy pickles and their pale stems, a pair of chopsticks lifting one long leaf
    P('M30 120h180c0 50-40 84-90 84s-90-34-90-84z', '#283593') + Lc('M50 150q35 10 70 0t70 0', '#7986CB', 3) + R(26, 112, 188, 12, '#3949AB', 6)
    + P('M44 118c10-30 50-46 76-46s66 16 76 46z', '#8BC34A')
    + [[70, 100], [96, 88], [124, 84], [152, 92], [178, 106], [104, 106], [140, 108]].map(([x, y]) => P(`M${x - 14} ${y + 4}c4-10 22-12 28 0-6 6-22 6-28 0z`, '#558B2F', 2.5) + Lc(`M${x - 4} ${y + 8}l8-4`, '#DCEDC8', 3)).join('')
    + Lc('M150 30L120 92M164 34L126 94', '#A1887F', 6) + P('M118 92c-6 10-2 26 10 30 4-12 0-24-10-30z', '#7CB342', 2.5) + face(120, 166, 0.4)),

  L('wells', 'บ่อน้ำพุกลางเมืองมัตสึโมโตะ', 'A spring-water well in Matsumoto town', ['matsumoto wells', 'บ่อน้ำมัตสึโมโตะ', 'spring water', 'น้ำพุธรรมชาติ', 'genchi well', 'บ่อเก็นจิ', 'town of water', 'เมืองแห่งน้ำ', 'drinking fountain', 'น้ำดื่มจากตาน้ำ'], nm('หาสายน้ำใสที่ไหลจากท่อ', 'Find the clear water pouring from the spout'),
    // a round grey stone basin brimming with clear spring water, a bamboo pipe pouring a stream into it, a wooden ladle resting on the rim and a small water bottle waiting
    E(120, 196, 84, 16, '#9E9E9E') + P('M40 150h160v46c0 10-36 18-80 18s-80-8-80-18z', '#B0BEC5') + E(120, 150, 80, 18, '#81D4FA') + E(120, 150, 64, 12, '#B3E5FC', 0)
    + R(150, 60, 14, 80, '#8D6E63', 4) + P('M150 66h-60l-4 12h64z', '#9CCC65') + Lc('M92 72h58', '#7CB342', 3)
    + Lc('M90 80c-4 20-4 40 0 64', '#4FC3F7', 8) + Lc('M90 84c-2 18-2 36 0 56', '#E1F5FE', 3) + E(90, 148, 12, 4, '#E1F5FE', 2)
    + Lc('M40 140l54 6', '#D7A86E', 5) + E(32, 138, 12, 8, '#D7A86E') + R(184, 120, 22, 40, '#4FC3F7', 6) + R(188, 110, 14, 10, '#1565C0', 3) + face(120, 180, 0.4)),

  L('hatoguruma', 'ของเล่นนกพิราบติดล้อฮาโตะกุรุมะ', 'Hato-guruma, the wooden pigeon on wheels', ['hato-guruma', 'ฮาโตะกุรุมะ', 'pigeon cart', 'รถนกพิราบ', 'wooden toy', 'ของเล่นไม้', 'folk toy', 'ของเล่นพื้นบ้าน', 'akebi vine', 'เถาอาเคบิ'], nm('หาล้อไม้กลมสี่ล้อ', 'Find the four round wooden wheels'),
    // a chunky carved wooden pigeon painted red, yellow and green with bold patterns on its wings, sitting on four round wheels, a pull string curling from its chest
    P('M40 120c0-26 26-40 50-40 14 0 24 8 30 18 30-4 66 6 84 22l-14 10c-16 6-40 8-60 8H60c-14 0-20-8-20-18z', '#FFF3E0')
    + P('M100 106c20-10 60-12 90 10-20 16-60 18-90 4z', '#E53935') + Lc('M110 112c14-4 34-4 50 2M118 122c12-2 28-2 40 2', '#FFC107', 4)
    + E(62, 104, 20, 18, '#FFF3E0', 0) + P('M36 104l-12 6 12 4z', '#FFC107', 3) + C(60, 98, 4, INK, 0) + E(68, 110, 5, 3, '#FF8FA3', 0)
    + Lc('M50 132c20 4 50 6 90 2', '#43A047', 6)
    + R(54, 140, 120, 14, '#A1887F', 4) + [70, 100, 130, 160].map((x) => C(x, 170, 16, '#D7A86E') + C(x, 170, 5, '#8D6E63', 2.5)).join('')
    + Lc('M40 140c-14 10-10 30 4 36s16 22 0 30', '#E53935', 3)),

  L('okojo', 'ออโคโจ เพียงพอนขาวบนโขดหินภูเขา', 'An okojo, the little white stoat of the Alps', ['okojo', 'โอโคโจ', 'stoat', 'เพียงพอนสโตท', 'ermine', 'เพียงพอนขาว', 'alpine animal', 'สัตว์ภูเขาสูง', 'black-tipped tail', 'หางปลายดำ'], nm('หาปลายหางสีดำ', 'Find the black tip of its tail'),
    // a slim white stoat standing up on a grey rock with its paws tucked, round black eyes, tiny round ears, its long tail ending in a black tip, alpine flowers round the rocks
    P('M30 214c10-40 40-56 90-56s80 16 90 56z', '#B0BEC5') + Lc('M60 186l20-6M150 180l24 8', '#90A4AE', 3)
    + E(190, 96, 10, 15, '#263238') + Lc('M136 156c34-2 54-24 54-52', INK, 20) + Lc('M136 156c34-2 54-24 54-52', '#FAFAFA', 12)
    + P('M96 164c-6-40 0-70 24-80 24 10 30 40 24 80z', '#FAFAFA') + E(120, 150, 12, 16, '#FFF8E1', 0)
    + C(120, 76, 26, '#FAFAFA') + C(100, 56, 8, '#FAFAFA') + C(140, 56, 8, '#FAFAFA') + C(100, 56, 3.5, '#F8BBD0', 0) + C(140, 56, 3.5, '#F8BBD0', 0)
    + C(110, 74, 5, INK, 0) + C(130, 74, 5, INK, 0) + C(111.5, 72.5, 1.6, '#FFFFFF', 0) + C(131.5, 72.5, 1.6, '#FFFFFF', 0) + C(120, 84, 3.5, '#F48FB1', 0) + E(102, 84, 5, 3, '#FF8FA3', 0) + E(138, 84, 5, 3, '#FF8FA3', 0)
    + E(110, 126, 7, 5, '#FAFAFA') + E(130, 126, 7, 5, '#FAFAFA')
    + [[44, 196, '#F48FB1'], [60, 206, '#FFEB3B'], [194, 200, '#CE93D8']].map(([x, y, c]) => C(x, y, 5, c, 2.5)).join('')),
];

export default {
  places: {
    'jp-nagano': { country: 'jp', wave: 3, name: nm('นากาโน่และมัตสึโมโตะ', 'Nagano and Matsumoto'), tz: 'Asia/Tokyo', ll: [36.43, 138.07], alias: ['nagano', 'นากาโน่', '長野', 'matsumoto', 'มัตสึโมโตะ', '松本', 'kamikochi', 'คามิโคจิ', '上高地', 'togakushi', 'โทงาคุชิ', 'hakuba', 'ฮาคุบะ', 'azumino', 'อาซูมิโนะ', 'zenko-ji', 'zenkoji', 'เซ็นโคจิ', 'MMJ'], colors: NG },
  },
  items,
};
