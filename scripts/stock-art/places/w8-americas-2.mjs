// Wave 8, the Americas (2): Vancouver, Banff, the Grand Canyon and Las Vegas, Seattle, Yellowstone, Toronto and Niagara — one new idea per picture
import { P, R, C, E, Lc, g, face, free, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
// the id follows the file name (us/seattle/landmark-geoduck.v1.svg → us-seattle.landmark.geoduck; us/yellowstone/… → p-yellowstone…)
const SCOPE = { 'us-orlando': 'p-orlando', 'us-yellowstone': 'p-yellowstone' };
const idOf = (file) => { const [cc, city, base] = file.split('/'); return `${SCOPE[`${cc}-${city}`] || `${cc}-${city}`}.landmark.${base.replace(/^landmark-/, '').replace(/\.v\d+\.svg$/, '')}`; };
const L = (file, th, en, kw, sth, sen, svg) => ({ id: idOf(file), cat: 'landmark', file, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const sky = (c) => R(-4, -4, 248, 248, c, 0, 0);
const kid = (x, y, top, s = 1) => g(x, y, s, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', top, 2) + face(0, -18, 0.22));
const band = (d, colour, w) => Lc(d, INK, w + 5) + Lc(d, colour, w);
const pine = (x, y, h, c = '#2E7D32') => P(`M${x} ${y - h}l${h * 0.32} ${h * 0.55}h-${h * 0.12}l${h * 0.2} ${h * 0.45}h-${h * 0.8}l${h * 0.2}-${h * 0.45}h-${h * 0.12}z`, c, 2);
const peaks = (c, snow) => P('M-4 110l50-60 34 30 44-54 46 50 30-24 44 40v20H-4z', c, 3) + P('M114 26l14 16-10-2-8 8-8-6zM46 50l10 12-8 0-6 4z', snow, 0);
const prickly = (x, y, s = 1) => g(x, y, s, E(0, 0, 12, 16, '#7CB342', 2.5) + E(-14, -18, 9, 12, '#7CB342', 2.5) + E(12, -20, 8, 11, '#7CB342', 2.5) + C(12, -32, 3, '#EC407A', 1.5));

const items = [
  // ---------- Vancouver
  L('ca/vancouver/landmark-quarrygarden.v1.svg', 'สวนในเหมืองหินเก่าที่ควีนเอลิซาเบธพาร์ก', 'The quarry garden in Queen Elizabeth Park', ['queen elizabeth park', 'สวนควีนเอลิซาเบธ', 'quarry garden', 'สวนในเหมืองหินเก่า', 'little mountain', 'ลิตเติลเมาน์เทน', 'sunken garden', 'สวนในแอ่ง', 'stone footbridge', 'flower beds'], 'หาสะพานหินโค้งเล็กๆ ข้ามลำธารในแอ่งสวน', 'Find the little stone bridge over the stream down in the garden bowl',
    // a deep round bowl cut into grey rock walls, filled with bright flower beds, shrubs and a winding blue stream with a little arched stone footbridge, a path spiralling down, trees and the city towers peeking over the rim
    sky('#E1F5FE') + [30, 52, 190, 210].map((x, k) => R(x, 40 + k % 2 * 10, 16, 40, '#CFD8DC', 0, 2)).join('') + E(60, 64, 30, 22, '#43A047', 3) + E(184, 62, 34, 22, '#2E7D32', 3)
      + P('M-4 80h248v164H-4z', '#78909C', 3) + E(120, 160, 110, 70, '#8BC34A', 3.5) + Lc('M30 120c20-20 40-30 60-36M210 120c-20-20-40-30-60-36', '#90A4AE', 6)
      + band('M60 230c20-30 40-30 60-50s40-30 70-40', '#4FC3F7', 12) + P('M100 196a20 16 0 0 1 40 0', 'none', 0) + band('M100 202q20-24 40 0', '#BDBDBD', 6)
      + [[40, 160, '#EC407A'], [70, 130, '#FFEB3B'], [160, 124, '#AB47BC'], [190, 168, '#FF7043'], [150, 210, '#FFEB3B'], [60, 200, '#AB47BC']].map(([x, y, c]) => E(x, y, 18, 10, '#558B2F', 2.5) + [-8, 0, 8].map((d) => C(x + d, y - 3, 3.5, c, 0)).join('')).join('')
      + face(120, 150, 0.32) + kid(208, 226, '#1E88E5', 0.7)),
  L('ca/vancouver/landmark-spanishbanks.v1.svg', 'หาดทรายกว้างตอนน้ำลงที่สแปนิชแบงก์ส', 'The low-tide sand flats at Spanish Banks', ['spanish banks', 'สแปนิชแบงก์ส', 'low tide', 'น้ำลง', 'sand flats', 'หาดทรายกว้าง', 'tide pools', 'แอ่งน้ำขังบนหาด', 'skimboarding', 'beach digging'], 'หารอยเท้าที่เดินไกลออกไปบนทรายเปียก', 'Find the footprints walking far out across the wet sand',
    // a huge flat stretch of wet shiny sand at low tide with ripples and little pools reflecting the sky, the sea a thin line far away, blue mountains across the bay, a child with a bucket and spade and a trail of footprints, a crab
    sky('#FFF3E0') + P('M-4 90l40-24 40 16 50-30 40 22 40-14 38 18v12H-4z', '#7986CB', 3) + P('M-4 100h248v14H-4z', '#4FC3F7', 3)
      + P('M-4 114h248v130H-4z', '#E8D5A8', 3) + [130, 152, 178, 210].map((y, k) => Lc(`M${-4 + k * 10} ${y}c30-6 60 6 90 0s60 6 90 0 50 4 70 0`, '#D7BE8A', 3)).join('')
      + [[40, 140, 34], [170, 136, 40], [100, 196, 30], [200, 210, 26]].map(([x, y, w]) => E(x, y, w, 6, '#B3E5FC', 2.5)).join('')
      + [[132, 176], [142, 166], [150, 154], [158, 144], [164, 134]].map(([x, y], k) => E(x + (k % 2) * 6, y, 2.5, 4, '#BCA070', 0)).join('')
      + kid(118, 214, '#FFB300', 1.1) + g(92, 222, 1, P('M-10-10h20l-3 18h-14z', '#E53935', 2.5) + Lc('M-8-10c0-8 16-8 16 0', INK, 2)) + Lc('M140 220l14-26', '#8D6E63', 3) + P('M150 192l10-4 2 8z', '#90A4AE', 2)
      + g(60, 230, 1, E(0, 0, 12, 8, '#FF7043', 2.5) + Lc('M-12-2l-8-6M12-2l8-6M-10 4l-8 4M10 4l8 4', '#FF7043', 2.5) + face(0, -2, 0.18, 'none'))),
  L('ca/vancouver/landmark-harbourcentre.v1.svg', 'หอชมวิวฮาร์เบอร์เซ็นเตอร์ยอดจานบิน', 'The Harbour Centre lookout with its saucer top', ['harbour centre', 'ฮาร์เบอร์เซ็นเตอร์', 'vancouver lookout', 'จุดชมวิวบนตึก', 'flying saucer top', 'ยอดตึกจานบิน', 'glass elevator', 'ลิฟต์แก้ว', 'downtown view', 'revolving restaurant'], 'หาลิฟต์แก้วสีเหลืองที่วิ่งขึ้นด้านนอกตึก', 'Find the yellow glass lift riding up the outside of the tower',
    // a tall pale concrete tower topped by a wide round disc like a flying saucer with a ring of windows, a yellow glass lift climbing a track up the outside, smaller office blocks around it, the harbour and a mountain behind
    sky('#B3E5FC') + P('M-4 150l60-50 50 30 60-56 80 66v20H-4z', '#81C784', 3) + P('M-4 170h248v74H-4z', '#1E88E5', 3)
      + R(10, 120, 50, 124, '#CFD8DC', 0, 3) + R(184, 110, 56, 134, '#B0BEC5', 0, 3) + [0, 1, 2, 3].map((r) => R(18, 130 + r * 26, 34, 12, '#90CAF9', 1, 1.5) + R(192, 120 + r * 28, 40, 12, '#90CAF9', 1, 1.5)).join('')
      + R(98, 70, 44, 174, '#ECEFF1', 2, 3.5) + Array.from({ length: 8 }, (_, r) => Lc(`M104 ${96 + r * 18}h32`, '#B0BEC5', 3)).join('')
      + E(120, 60, 64, 16, '#ECEFF1', 3.5) + R(64, 44, 112, 14, '#5C6BC0', 7, 3) + Lc('M76 51h88', '#C5CAE9', 2) + P('M80 44c4-10 76-10 80 0z', '#ECEFF1', 3) + Lc('M120 34v-16', INK, 3)
      + Lc('M146 70v170', '#90A4AE', 3) + R(140, 140, 16, 20, '#FFEB3B', 3, 2.5) + R(143, 144, 10, 8, '#FFFDE7', 1, 1.5) + face(120, 116, 0.36)),
  // ---------- Banff
  L('ca/banff/landmark-canadajay.v1.svg', 'นกเจย์แคนาดาขนฟูบนกิ่งสน', 'A fluffy Canada jay on a spruce branch', ['canada jay', 'นกเจย์แคนาดา', 'grey jay', 'นกเจย์สีเทา', 'whisky jack', 'วิสกีแจ็ก', 'spruce forest', 'ป่าสนสปรูซ', 'friendly bird', 'trail snack'], 'หานกสีเทาฟูๆ ที่มีหน้าสีขาวและหมวกสีเทาเข้ม', 'Find the fluffy grey bird with a white face and a dark grey cap',
    // a round fluffy grey bird with a white face, a dark grey cap on the back of its head and a short black beak sitting puffed up on a snowy spruce branch, more spruce and snowy peaks behind, a few snowflakes
    sky('#E3F2FD') + peaks('#B0BEC5', '#FFFFFF') + [20, 50, 196, 226].map((x) => pine(x, 160, 60, '#2E7D32')).join('') + P('M-4 160h248v84H-4z', '#FFFFFF', 3)
      + band('M-4 176c60-10 140-16 230-34', '#6D4C41', 8) + [[20, 170], [70, 162], [180, 148], [214, 140]].map(([x, y]) => [-1, 0, 1].map((j) => Lc(`M${x} ${y}l${j * 14 - 4} 14`, '#388E3C', 4)).join('') + E(x, y - 4, 14, 4, '#FFFFFF', 2)).join('')
      + g(120, 120, 1, E(0, 6, 50, 44, '#B0BEC5', 3.5) + P('M40 20c26 6 44 20 50 36-20-4-38-8-52-18z', '#90A4AE', 3) + E(-4, -14, 36, 30, '#FFFFFF', 3) + P('M-4-44c26-6 44 8 44 30-14-6-28-16-44-30z', '#546E7A', 3)
        + E(10, 22, 30, 18, '#ECEFF1', 0) + face(-6, -14, 0.5, 'none') + P('M-36-10l-16 4 16 4z', INK, 2) + Lc('M-12 46v14M10 46v14', INK, 3))
      + [[40, 40], [200, 30], [170, 90], [60, 100]].map(([x, y]) => C(x, y, 3, '#FFFFFF', 1.5)).join('')),
  L('ca/banff/landmark-icebubbles.v1.svg', 'ฟองอากาศแช่แข็งในทะเลสาบอับราฮัม', 'Frozen bubbles under the ice of Abraham Lake', ['abraham lake', 'ทะเลสาบอับราฮัม', 'ice bubbles', 'ฟองอากาศในน้ำแข็ง', 'frozen lake', 'ทะเลสาบน้ำแข็ง', 'kootenay plains', 'คูทีเนย์เพลนส์', 'winter photo spot', 'clear ice'], 'หาฟองอากาศสีขาวที่ซ้อนกันเป็นชั้นใต้น้ำแข็ง', 'Find the white bubbles stacked in layers under the ice',
    // a sheet of clear dark turquoise ice seen from above with towers of flat round white bubbles stacked under it, cracks in the ice, snowy mountains at the back, a child lying on their tummy looking down through the ice
    sky('#E3F2FD') + peaks('#90A4AE', '#FFFFFF') + P('M-4 100h248v144H-4z', '#00838F', 3) + Lc('M20 120l40 20 10 30M180 110l-20 40 40 30M100 220l30-20 40 10', '#80DEEA', 2.5)
      + [[50, 170], [120, 150], [190, 200], [80, 214], [170, 136]].map(([x, y], k) => [0, 1, 2].map((j) => E(x + (j - 1) * 2, y - j * 14, 16 - j * 3 + k % 2 * 3, 6 - j, '#FFFFFF', 2.5)).join('')).join('')
      + face(120, 124, 0.3)
      + g(44, 120, 1, E(0, 0, 30, 9, '#E53935', 2.5) + C(-32, -2, 9, '#FFE0BD', 2.5) + P('M-40-6c0-12 16-12 16 0z', '#1E88E5', 2) + face(-32, 0, 0.16, 'o') + Lc('M28 0h14', '#37474F', 7))),
  L('ca/banff/landmark-spiraltunnels.v1.svg', 'อุโมงค์เกลียวที่รถไฟวนผ่านภูเขา', 'The Spiral Tunnels where the train loops through the mountain', ['spiral tunnels', 'อุโมงค์เกลียว', 'kicking horse pass', 'ช่องเขาคิกกิงฮอร์ส', 'yoho', 'โยโฮ', 'freight train', 'รถไฟขนสินค้า', 'railway loop', 'train sees its own tail'], 'หารถไฟที่โผล่จากอุโมงค์ข้างล่างขณะที่ท้ายขบวนยังอยู่ข้างบน', 'Find the train coming out of the lower tunnel while its tail is still up top',
    // a steep green mountainside with two dark tunnel mouths, one above the other; a long red-and-yellow freight train loops out of the lower tunnel while its last cars are still disappearing into the upper one, pine trees and a river below
    sky('#C5E1F5') + P('M-4 60l60-50 60 40 60-36 68 46v40H-4z', '#B0BEC5', 3) + P('M50 20l10 6-12 4zM170 18l10 8-14 2z', '#FFFFFF', 0)
      + P('M-4 70c80 10 170 0 248 10v164H-4z', '#7CB342', 3) + P('M-4 220c60-8 180-8 248 0v24H-4z', '#4FC3F7', 3)
      + Lc('M20 96c60 0 120 4 170 10', '#8D6E63', 7) + Lc('M60 170c50 0 110-4 170-10', '#8D6E63', 7)
      + P('M170 110v-16a14 14 0 0 1 28 0v16z', '#263238', 3) + P('M44 174v-16a14 14 0 0 1 28 0v16z', '#263238', 3)
      + [0, 1, 2, 3].map((k) => g(70 + k * 34, 158 - k * 1.5, 1, R(-15, -12, 30, 18, k ? (k % 2 ? '#FFB300' : '#E53935') : '#E53935', 3, 2.5) + C(-8, 8, 4, INK, 0) + C(8, 8, 4, INK, 0))).join('') + face(70, 152, 0.18)
      + [0, 1, 2].map((k) => g(110 + k * 30, 86 + k * 1, 1, R(-13, -10, 26, 16, k % 2 ? '#FFB300' : '#1E88E5', 3, 2.5) + C(-7, 7, 3.5, INK, 0) + C(7, 7, 3.5, INK, 0))).join('')
      + [20, 110, 210].map((x) => pine(x, 212, 34)).join('')),
  L('ca/banff/landmark-burgessshale.v1.svg', 'สัตว์ทะเลประหลาดยุคโบราณจากเบอร์เจสเชล', 'The strange ancient sea creatures of the Burgess Shale', ['burgess shale', 'เบอร์เจสเชล', 'cambrian sea', 'ทะเลยุคแคมเบรียน', 'opabinia', 'โอพาบิเนีย', 'hallucigenia', 'ฮัลลูซิจีเนีย', 'walcott quarry', 'yoho fossils'], 'หาสัตว์ที่มีห้าตาและงวงยาวปลายเป็นก้าม', 'Find the creature with five eyes and a long trunk with a claw at the end',
    // an ancient sea full of odd creatures: a pink five-eyed swimmer with a long trunk ending in a little claw and side flaps, a spiky little worm walking on stilts with spines on its back, a shrimp-like creature with feathery horns, sea sponges on the muddy floor
    sky('#4FC3F7') + [[30, 0], [110, 0], [190, 0]].map(([x]) => P(`M${x} -4l26 0-34 160h-10z`, '#81D4FA', 0)).join('') + P('M-4 196c60-10 180-10 248 0v48H-4z', '#A1887F', 3)
      + [[30, 200], [210, 196]].map(([x, y]) => P(`M${x - 10} ${y}v-30c0-8 20-8 20 0v30z`, '#FFB74D', 3) + C(x, y - 30, 6, '#FFE0B2', 2)).join('')
      + g(118, 92, 1, E(0, 0, 44, 16, '#F48FB1', 3.5) + [-30, -14, 2, 18].map((x) => P(`M${x} 10l8 12 8-12z`, '#F06292', 2)).join('') + P('M40 0l20-10-2 20z', '#F06292', 2.5)
        + band('M-40 4c-20 4-30 20-28 40', '#F48FB1', 5) + P('M-74 44l6-6 6 8-6 2z', '#E91E63', 2) + [-26, -16, -6, -20, -10].map((x, k) => C(x, k < 3 ? -16 : -24, 4, '#FFFFFF', 2) + C(x, k < 3 ? -16 : -24, 1.6, INK, 0)).join('') + face(4, -2, 0.3, 'none'))
      + g(150, 178, 1, band('M-40 0c20-6 50-6 76 0', '#FFCA28', 8) + [-30, -16, -2, 12, 26].map((x) => Lc(`M${x} 0l-2 14`, INK, 3) + P(`M${x} -6l-4-16 8 2z`, '#E53935', 2)).join('') + C(42, -2, 7, '#FFCA28', 2.5) + C(44, -4, 1.5, INK, 0))
      + g(56, 150, 1, E(0, 0, 22, 10, '#AED581', 3) + Lc('M-20-6c-14-10-22-24-14-34M-16-8c-6-16-2-30 10-34', '#7CB342', 3) + [-12, -2, 8].map((x) => Lc(`M${x} 8l-4 12`, '#7CB342', 2.5)).join('') + C(-14, -2, 1.6, INK, 0))),
  L('ca/banff/landmark-redchairs.v1.svg', 'เก้าอี้สีแดงคู่ริมจุดชมวิวอุทยาน', 'The two red chairs at a park lookout', ['red chairs', 'เก้าอี้สีแดง', 'parks canada', 'อุทยานแห่งชาติแคนาดา', 'adirondack chairs', 'เก้าอี้ไม้นั่งชมวิว', 'scenic lookout', 'จุดชมวิว', 'mount norquay', 'sit and look'], 'หาเก้าอี้ไม้สีแดงสองตัวที่หันไปทางภูเขา', 'Find the two red wooden chairs facing the mountains',
    // two bright red wooden lookout chairs with slatted backs and wide arms side by side on a rocky ledge, looking out over a turquoise lake to jagged grey mountains, a pine on the left, a smiling face on one chair
    sky('#B3E5FC') + peaks('#90A4AE', '#FFFFFF') + P('M-4 110h248v50H-4z', '#26C6DA', 3) + Lc('M30 130h50M150 140h50', '#B2EBF2', 3) + pine(24, 170, 80)
      + P('M-4 160c60-10 180-14 248-4v88H-4z', '#A1887F', 3) + Lc('M30 190c20-4 40-4 60 0M150 200c20-2 30 0 50 4', '#8D6E63', 2.5)
      + [[86, 0], [160, 1]].map(([x, f]) => g(x, 206, 1, [-20, -10, 0, 10, 20].map((d) => R(d - 4, -86 + Math.abs(d) * 0.4, 8, 60, '#E53935', 3, 2.5)).join('')
        + R(-36, -36, 72, 10, '#E53935', 3, 3) + R(-30, -20, 60, 10, '#C62828', 3, 2.5) + Lc('M-30-10v28M30-10v28M-24-28v46M24-28v46', '#E53935', 6) + Lc('M-30-10v28M30-10v28', INK, 1.5)
        + (f ? '' : face(0, -60, 0.3)))).join('')),
  // ---------- the Grand Canyon and Las Vegas
  L('us/southwest/landmark-meteorcrater.v1.svg', 'หลุมอุกกาบาตยักษ์กลางทะเลทรายแอริโซนา', 'Meteor Crater in the Arizona desert', ['meteor crater', 'หลุมอุกกาบาต', 'barringer crater', 'หลุมแบร์ริงเจอร์', 'space rock', 'หินจากอวกาศ', 'impact crater', 'หลุมจากการชน', 'winslow', 'crater rim viewpoint'], 'หาก้อนอุกกาบาตเล็กๆ ที่ยิ้มอยู่ข้างจุดชมวิว', 'Find the little smiling space rock beside the viewing deck',
    // a giant round bowl-shaped hole in a flat orange desert seen from a little above, its raised rim and layered inside walls, a tiny viewing deck with a railing and a child on the edge, a grey space rock with a smiling face and a little flaming streak in the sky
    sky('#FFE0B2') + P('M180 20l30-14M188 30l26-12', '#FF8A65', 3) + C(170, 30, 8, '#90A4AE', 2.5)
      + P('M-4 90h248v154H-4z', '#E8A86A', 3) + E(120, 150, 110, 52, '#D9773C', 3.5) + E(120, 154, 92, 42, '#C1502E', 3) + E(120, 162, 70, 28, '#E8B88A', 3) + Lc('M40 150c20 20 140 20 160 0', '#A1673F', 2.5)
      + [[50, 120], [190, 126], [86, 190]].map(([x, y]) => C(x, y, 3, '#8D6E63', 0)).join('')
      + P('M60 214h70v10H60z', '#8D6E63', 3) + Lc('M64 214v-14h62v14M80 200v14M96 200v14M112 200v14', '#5D4037', 3) + kid(84, 210, '#1E88E5', 0.8)
      + g(176, 216, 1, E(0, 0, 22, 16, '#78909C', 3.5) + C(-8, -6, 4, '#607D8B', 1.5) + C(10, 6, 3, '#607D8B', 1.5) + face(2, -2, 0.3))),
  L('us/southwest/landmark-roadrunner.v1.svg', 'นกโรดรันเนอร์วิ่งเร็วในทะเลทราย', 'A roadrunner racing across the desert', ['roadrunner', 'นกโรดรันเนอร์', 'greater roadrunner', 'นกคัคคูวิ่ง', 'desert bird', 'นกทะเลทราย', 'sonoran desert', 'ทะเลทรายโซโนรา', 'fast runner', 'dust cloud'], 'หาหงอนตั้งชันบนหัวของนกที่กำลังวิ่ง', 'Find the spiky crest standing up on the running bird\'s head',
    // a streaky brown-and-white roadrunner with a shaggy crest, a long straight tail held up, a long beak and a blue patch behind its eye running fast on spinning legs, puffs of dust behind, a cactus and a low sun
    sky('#FFF3E0') + C(196, 60, 24, '#FFCC80', 0) + P('M-4 170c60-8 180-8 248 0v74H-4z', '#F2D1A0', 3)
      + g(214, 150, 1, R(-8, -60, 16, 70, '#7CB342', 8, 3) + Lc('M-8-30h-12v-16M8-20h12v-18', '#7CB342', 8) + Lc('M-8-30h-12v-16M8-20h12v-18', INK, 0))
      + [[40, 196, 14], [62, 186, 10], [24, 180, 8]].map(([x, y, r]) => C(x, y, r, '#FFE0B2', 2.5)).join('')
      + g(118, 132, 1, P('M-30 0c0-20 20-30 46-24l10 20c-6 18-30 26-56 18z', '#A1887F', 3.5) + P('M-28 4c-30-10-50-30-60-52l12-4c10 20 30 34 52 42z', '#6D4C41', 3) + Lc('M-70-38l10-4M-60-26l10-4', '#D7CCC8', 2.5)
        + [-14, 0].map((x) => Lc(`M${x} -10l6 10`, '#FFFFFF', 2.5)).join('') + C(28, -30, 14, '#A1887F', 3.5) + P('M20-42l4-18 6 14 4-16 4 18z', '#5D4037', 2.5) + P('M40-30l36 4-36 6z', '#5D4037', 2.5)
        + E(34, -26, 5, 3, '#4FC3F7', 0) + C(30, -32, 3, INK, 0) + E(22, -22, 5, 3, '#FF8FA3', 0)
        + Lc('M-4 24l-14 20M-4 24l10 22M6 24l20 16M6 24l-4 24', '#FFB74D', 4) + C(-2, 44, 10, 'none', 2) + C(10, 40, 10, 'none', 2))),
  L('us/southwest/landmark-delicatearch.v1.svg', 'ซุ้มหินเดลิเคตอาร์ชที่ยืนเดี่ยว', 'Delicate Arch standing on its own', ['delicate arch', 'เดลิเคตอาร์ช', 'arches national park', 'อุทยานอาร์เชส', 'natural rock arch', 'ซุ้มหินธรรมชาติ', 'moab', 'โมแอบ', 'slickrock bowl', 'la sal mountains'], 'หาเด็กตัวเล็กที่ยืนใต้ซุ้มหินโค้ง', 'Find the tiny child standing under the curved rock arch',
    // a lone red-orange sandstone arch shaped like a pair of legs, standing on the rim of a smooth pink rock bowl, snowy blue mountains far away under a sunset sky, a tiny child under the arch for size
    sky('#FFCCBC') + P('M-4 120l40-20 40 10 40-24 40 16 40-14 48 20v20H-4z', '#7986CB', 3) + P('M106 90l14-6 12 8zM40 104l10-4 8 6z', '#FFFFFF', 0)
      + P('M-4 140c50 30 120 40 248 0v104H-4z', '#F4A07A', 3) + Lc('M20 170c40 20 160 22 210-6M40 200c40 14 120 14 170-4', '#E07A5F', 2.5)
      + P('M76 176c-6-40-4-90 20-118 14-14 40-14 52 6 18 30 18 70 14 112h-24c2-36 0-70-14-86-12-14-28 0-28 22v64z', '#D9773C', 3.5) + Lc('M90 100c10-20 30-30 48-20', '#F4A07A', 3) + E(130, 176, 22, 6, '#C1502E', 0)
      + face(122, 72, 0.36) + kid(122, 176, '#1E88E5', 0.6)),
  L('us/southwest/landmark-watchtower.v1.svg', 'หอคอยหินเดเซิร์ตวิวริมผาแกรนด์แคนยอน', 'The Desert View Watchtower on the canyon rim', ['desert view watchtower', 'หอคอยเดเซิร์ตวิว', 'stone tower', 'หอคอยหิน', 'mary colter', 'แมรี คอลเตอร์', 'east rim', 'ขอบผาฝั่งตะวันออก', 'canyon view', 'grand canyon south rim'], 'หาหน้าต่างเล็กๆ ที่เรียงรอบหอคอยหินกลม', 'Find the little windows dotted round the round stone tower',
    // a round tower built of stacked uneven grey and tan stones, slightly wider at the bottom, with little windows dotted round it and a lookout on top, standing on the cliff edge with the layered red canyon dropping away behind
    sky('#FFE0B2') + [[70, '#E07A3F'], [100, '#F4A460'], [130, '#C1502E'], [160, '#E8B88A']].map(([y, c]) => P(`M100 ${y}c40-6 80 6 144 0v${200 - y}H100z`, c, 2.5)).join('') + band('M150 240c10-30 30-50 40-90', '#26A69A', 6)
      + P('M-4 200c40-10 90-10 140 0v44H-4z', '#A1887F', 3)
      + P('M36 204l8-150h52l8 150z', '#BCAAA4', 3.5) + Array.from({ length: 30 }, (_, k) => R(44 + (k * 13) % 50, 64 + Math.floor(k / 4) * 18, 10 + k % 3 * 2, 8, k % 3 ? '#D7CCC8' : '#A1887F', 2, 1.5)).join('')
      + R(40, 44, 60, 14, '#A1887F', 2, 3) + [44, 56, 68, 80, 92].map((x) => R(x, 36, 6, 8, '#A1887F', 0, 2)).join('') + [[58, 80], [80, 110], [56, 140], [84, 168]].map(([x, y]) => R(x, y, 8, 10, '#4E342E', 2, 1.5)).join('')
      + face(70, 124, 0.36) + kid(140, 228, '#E53935', 0.8)),
  L('us/southwest/landmark-firewave.v1.svg', 'หินลายคลื่นไฟที่หุบเขาไฟ', 'The Fire Wave in the Valley of Fire', ['valley of fire', 'หุบเขาไฟ', 'fire wave', 'หินคลื่นไฟ', 'striped sandstone', 'หินทรายลายทาง', 'nevada desert', 'ทะเลทรายเนวาดา', 'red rock swirls', 'overton'], 'หาลายทางสีแดงสลับขาวที่โค้งเหมือนคลื่น', 'Find the red and white stripes curving like a wave',
    // a big rounded sandstone dome striped in swirling bands of red, pink and cream like a frozen wave, bright red rock fins around it, a deep blue sky, a child in a sun hat walking across the top
    sky('#4FC3F7') + P('M-4 130l20-40 30 10 10-30 30 40v20zM244 130l-20-50-30 20-10-24-30 50v4z', '#D84315', 3) + P('M-4 150h248v94H-4z', '#FFAB91', 3)
      + P('M10 210c10-70 60-110 110-110s100 40 110 110z', '#FFF3E0', 3.5) + [0, 1, 2, 3, 4, 5].map((k) => Lc(`M${18 + k * 6} 208c${10 + k * 4}-${60 - k * 8} ${60 - k * 4}-${96 - k * 12} ${102 - k * 6}-${98 - k * 13}s${88 - k * 10} ${50 - k * 8} ${96 - k * 10} ${98 - k * 12}`, k % 2 ? '#E57373' : '#F4A07A', 6)).join('')
      + face(120, 180, 0.36) + g(150, 110, 0.8, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#43A047', 2) + E(0, -27, 14, 4, '#FFE082', 2) + face(0, -18, 0.22))),
  L('us/southwest/landmark-gilamonster.v1.svg', 'กิลามอนสเตอร์กิ้งก่าลายลูกปัด', 'A Gila monster, the beaded lizard', ['gila monster', 'กิลามอนสเตอร์', 'beaded lizard', 'กิ้งก่าลูกปัด', 'desert reptile', 'สัตว์เลื้อยคลานทะเลทราย', 'orange and black pattern', 'ลายส้มดำ', 'sonoran desert', 'saguaro shade'], 'หาหางอ้วนป้อมของกิ้งก่าลายส้มดำ', 'Find the fat stubby tail of the orange-and-black lizard',
    // a chubby lizard with a fat stubby tail and a round blunt head, covered in a pattern of orange and pink bead-like scales on black, crawling over a flat desert rock, a little smile and a pink tongue, a prickly pear cactus in flower behind
    sky('#FFF3E0') + prickly(196, 120, 1.4) + P('M-4 160c60-8 180-8 248 0v84H-4z', '#F2D1A0', 3) + E(120, 186, 96, 22, '#BCAAA4', 3.5)
      + g(118, 160, 1, P('M-60 6c-30 0-46 10-50 22 20 0 40-4 54-12z', '#263238', 3) + E(0, 0, 60, 24, '#263238', 3.5) + Lc('M-34 16l-12 16M34 16l12 16M-30-14l-14-14M30-14l14-14', '#263238', 9)
        + [[-40, -6], [-24, 4], [-8, -8], [8, 6], [24, -6], [40, 4], [-30, -16], [16, -16], [-80, 16]].map(([x, y], k) => E(x, y, 8, 5, k % 2 ? '#FF8A65' : '#F48FB1', 1.5)).join('')
        + C(70, -4, 20, '#263238', 3.5) + E(64, -14, 8, 4, '#FF8A65', 1.5) + C(76, -8, 3.5, '#FFFFFF', 0) + C(76, -8, 1.8, INK, 0) + P('M86 2l14 2-6 4 6 3-14-2', '#EC407A', 2) + E(66, 4, 5, 3, '#FF8FA3', 0))),
  L('us/southwest/landmark-javelina.v1.svg', 'ครอบครัวหมูป่าฮาเวลีนาในทะเลทราย', 'A family of javelinas in the desert', ['javelina', 'ฮาเวลีนา', 'collared peccary', 'หมูป่าเพคคารี', 'desert pig', 'หมูทะเลทราย', 'sabino canyon', 'แคนยอนซาบิโน', 'prickly pear', 'herd'], 'หาลูกฮาเวลีนาตัวเล็กสีน้ำตาลแดงที่เดินตามแม่', 'Find the little reddish baby javelinas trotting after their mum',
    // a bristly grey-black wild desert pig with a pale collar stripe round its neck, a long snout and little ears trotting through the desert, two small reddish-brown babies following, a prickly pear cactus and pebbles
    sky('#FFF8E1') + prickly(40, 120, 1.6) + P('M-4 150c60-8 180-8 248 0v94H-4z', '#F2D1A0', 3)
      + g(110, 160, 1, E(0, 0, 50, 30, '#546E7A', 3.5) + Array.from({ length: 9 }, (_, k) => Lc(`M${-40 + k * 10}-24l2-10`, '#37474F', 3)).join('') + Lc('M-30 24v22M-12 26v20M14 26v20M32 24v22', '#37474F', 8)
        + Lc('M26-26c6 20 4 40-4 54', '#ECEFF1', 6) + C(52, -6, 22, '#546E7A', 3.5) + P('M68 0c12 0 20 6 20 12s-8 6-20 2z', '#455A64', 3) + E(86, 10, 4, 4, '#263238', 0) + P('M40-26l-4-14 12 8zM58-26l8-12 2 14z', '#455A64', 2.5) + face(54, -8, 0.32, 'none'))
      + [[176, 196, '#A1673F'], [212, 206, '#8D5524']].map(([x, y, c]) => g(x, y, 0.45, E(0, 0, 50, 30, c, 3.5) + Lc('M-30 24v22M-12 26v20M14 26v20M32 24v22', c, 9) + C(52, -6, 22, c, 3.5) + P('M68 0c12 0 20 6 20 12s-8 6-20 2z', c, 3) + face(54, -8, 0.5))).join('')),
  // ---------- Seattle
  L('us/seattle/landmark-centrallibrary.v1.svg', 'ห้องสมุดกลางซีแอตเทิลตึกกระจกเหลี่ยม', 'The Central Library\'s glass diamond walls', ['central library', 'ห้องสมุดกลาง', 'seattle public library', 'ห้องสมุดประชาชน', 'glass and steel net', 'ตาข่ายเหล็กกระจก', 'diamond grid', 'ลายตารางเพชร', 'books spiral', 'downtown library'], 'หาตึกกระจกที่ยื่นออกมาเป็นชั้นๆ เหมือนกล่องเบี้ยว', 'Find the glass building that sticks out in layers like wonky boxes',
    // an angular glass building made of tilted, stacked blocks that lean out and back, all covered in a diamond net of steel over blue glass, a tall tower beside it, a child with a book on the pavement
    sky('#E3F2FD') + R(196, 20, 48, 200, '#B0BEC5', 0, 3) + [0, 1, 2, 3, 4, 5].map((r) => R(204, 30 + r * 30, 32, 14, '#90CAF9', 1, 1.5)).join('')
      + P('M40 210l10-60-20-20 40-40-6-40h112l18 50-20 20 30 30-14 60z', '#81D4FA', 3.5) + Lc('M30 130h168M70 90h120M44 150h146', INK, 3)
      + Array.from({ length: 11 }, (_, k) => Lc(`M${20 + k * 18} 50l60 160`, '#ECEFF1', 2) + Lc(`M${20 + k * 18} 210l60-160`, '#ECEFF1', 2)).join('')
      + face(120, 120, 0.4) + P('M-4 210h248v34H-4z', '#B0BEC5', 3)
      + g(40, 232, 0.9, C(0, -20, 8, '#FFE0BD', 2) + P('M-8 4v-16h16v16z', '#FFB300', 2) + face(0, -18, 0.22) + R(4, -10, 10, 12, '#E53935', 1, 2))),
  L('us/seattle/landmark-geoduck.v1.svg', 'หอยกีโอดักคอยาวยักษ์ในพิวเจ็ตซาวด์', 'A giant long-necked geoduck clam', ['geoduck', 'หอยกีโอดัก', 'giant clam', 'หอยยักษ์', 'puget sound', 'พิวเจ็ตซาวด์', 'clam digging', 'ขุดหอย', 'low tide beach', 'long neck clam'], 'หาคอยาวของหอยที่ยื่นขึ้นมาจากทราย', 'Find the clam\'s long neck poking up out of the sand',
    // a cut-away view of a muddy beach: a big pale clam shell buried deep in the sand with a very long wrinkly neck stretching up to the surface where its tip pokes out and squirts a little jet of water, a child with a spade and a bucket on top
    sky('#E1F5FE') + P('M-4 70h248v20H-4z', '#4FC3F7', 3) + P('M-4 90h248v154H-4z', '#D7BE8A', 3) + Lc('M-4 92h248', '#BCA070', 3) + [[30, 140], [200, 160], [60, 210], [180, 220]].map(([x, y]) => C(x, y, 4, '#C8A165', 0)).join('')
      + band('M120 196c-6-30 10-60 0-100', '#F3D3B5', 22) + Lc('M110 170h20M112 140h18M110 116h20', '#D7A88A', 2.5) + E(120, 92, 12, 6, '#E8B896', 3) + Lc('M116 84c-4-14-10-20-14-26M124 84c4-14 10-20 14-26', '#4FC3F7', 3)
      + g(120, 210, 1, P('M-50 0c0-24 22-34 50-34s50 10 50 34-22 26-50 26-50-2-50-26z', '#FFFDF5', 3.5) + Lc('M-40-6c20-6 60-6 80 0M-40 8c20-4 60-4 80 0', '#D7CCC8', 2.5) + face(0, 0, 0.42))
      + kid(52, 88, '#E53935', 1) + Lc('M66 88l20-24', '#8D6E63', 3) + P('M82 60l10-4 2 10z', '#90A4AE', 2) + g(188, 84, 1, P('M-10-10h20l-3 18h-14z', '#FFB300', 2.5) + Lc('M-8-10c0-8 16-8 16 0', INK, 2))),
  L('us/seattle/landmark-bananaslug.v1.svg', 'ทากกล้วยสีเหลืองในป่าฝนเขียวชอุ่ม', 'A yellow banana slug in the mossy forest', ['banana slug', 'ทากกล้วย', 'pacific northwest forest', 'ป่าแปซิฟิกตะวันตกเฉียงเหนือ', 'mossy log', 'ขอนไม้มีมอส', 'discovery park', 'ดิสคัฟเวอรีพาร์ก', 'ferns', 'rainy forest walk'], 'หาหนวดสี่เส้นบนหัวของทากสีเหลือง', 'Find the four feelers on the yellow slug\'s head',
    // a long glossy banana-yellow slug with a few dark spots and four little feelers on its head sliding along a fat mossy green log, sword ferns and tall trunks behind, raindrops and a mushroom
    sky('#C8E6C9') + [[20, 18], [80, 22], [200, 26]].map(([x, w]) => R(x, -4, w, 150, '#6D4C41', 0, 3)).join('') + [[-4, 120], [150, 116], [230, 124]].map(([x, y]) => [-40, -20, 0, 20, 40].map((a) => Lc(`M${x + 30} ${y + 60}l${(Math.sin(a * Math.PI / 180) * 40).toFixed(1)} ${(-Math.cos(a * Math.PI / 180) * 50).toFixed(1)}`, '#2E7D32', 6)).join('')).join('')
      + P('M-4 170h248v74H-4z', '#5D4037', 0) + R(-10, 150, 260, 50, '#8D6E63', 24, 3.5) + P('M-10 166c40-20 220-20 260 0v-6c-40-14-220-14-260 0z', '#7CB342', 2.5) + C(250, 174, 18, '#A1887F', 3)
      + g(120, 146, 1, P('M-80 10c10-24 60-26 120-24 20 0 34 6 40 18 4 10-4 18-16 18H-70c-10 0-14-6-10-12z', '#FFEB3B', 3.5) + P('M-60 4c30-10 80-10 110-6', 'none', 0) + Lc('M-60 2c30-8 80-8 110-4', '#FFF59D', 3)
        + [[-40, 12], [-10, 6], [20, 14]].map(([x, y]) => C(x, y, 3.5, '#5D4037', 0)).join('') + Lc('M66 0l6-22M76 4l12-18M70 18l12 6M68 20l8 10', '#FFEB3B', 4) + Lc('M66 0l6-22M76 4l12-18', INK, 0) + C(72, -24, 3, INK, 0) + C(88, -16, 3, INK, 0) + face(58, 12, 0.3))
      + g(36, 210, 1, Lc('M0 0v-14', '#FFF8E1', 6) + P('M-14-14c0-12 28-12 28 0z', '#E53935', 2.5) + C(-4, -20, 2, '#FFFFFF', 0)) + [[60, 40], [140, 30], [180, 70]].map(([x, y]) => P(`M${x} ${y}c-3 5-3 8 0 8s3-3 0-8z`, '#81D4FA', 1.5)).join('')),
  L('us/seattle/landmark-hatnboots.v1.svg', 'หมวกคาวบอยและรองเท้าบูตยักษ์ที่จอร์จทาวน์', 'The giant hat and boots of Georgetown', ['hat n boots', 'แฮตแอนด์บูตส์', 'giant cowboy hat', 'หมวกคาวบอยยักษ์', 'giant boots', 'รองเท้าบูตยักษ์', 'georgetown', 'จอร์จทาวน์', 'oxbow park', 'roadside giant'], 'หารองเท้าบูตยักษ์คู่ที่ตั้งอยู่ในสวน', 'Find the giant pair of boots standing in the park',
    // an enormous orange cowboy hat with a wide brim propped up on legs like a little building, a pair of giant turquoise cowboy boots with stitched patterns standing beside it in a grassy park, a child next to them for size
    sky('#E1F5FE') + P('M-4 190h248v54H-4z', '#81C784', 3)
      + g(80, 120, 1, Lc('M-50 30v50M50 30v50M-20 34v46M20 34v46', '#6D4C41', 6) + E(0, 26, 84, 18, '#FB8C00', 3.5) + P('M-44 22c0-50 18-70 44-70s44 20 44 70c-20 8-68 8-88 0z', '#FB8C00', 3.5) + P('M0-48c-6 20-6 40 0 64', 'none', 0) + Lc('M-6-46c-4 10-4 20 0 30M6-46c4 10 4 20 0 30', '#E65100', 3)
        + band('M-42 10c28 8 56 8 84 0', '#5D4037', 6) + face(0, -14, 0.4))
      + [[172, 0], [204, 1]].map(([x, f]) => g(x, 190, 1, P('M-16-96l8 8 8-8 8 8 8-8v76c12 2 26 8 30 20l-6 0H-16z', '#26C6DA', 3.5) + Lc('M-8-70c6 6 10 6 16 0M-8-50c6 6 10 6 16 0M-8-30c6-6 10-6 16 0', '#FFFFFF', 2.5) + R(-16, -4, 14, 10, '#5D4037', 2, 2.5) + Lc('M0 2h36', '#5D4037', 4) + (f ? '' : face(0, -34, 0.3)))).join('')
      + kid(140, 234, '#E53935', 0.8)),
  L('us/seattle/landmark-smithtower.v1.svg', 'ตึกสมิททาวเวอร์ยอดปิรามิด', 'Smith Tower with its pyramid top', ['smith tower', 'ตึกสมิททาวเวอร์', 'pyramid top', 'ยอดปิรามิด', 'pioneer square', 'ไพโอเนียร์สแควร์', 'old skyscraper', 'ตึกระฟ้าเก่า', 'observatory bar', 'white terracotta'], 'หายอดแหลมเป็นปิรามิดสีขาวบนตึกเก่า', 'Find the white pointed pyramid on top of the old tower',
    // a slim old white skyscraper with rows of windows rising from a wider base and topped by a tall pointy pyramid roof with little round windows and a tiny glass ball on top, low brick buildings and the bay beside it
    sky('#B3E5FC') + P('M-4 180h248v64H-4z', '#1E88E5', 3) + R(-4, 150, 70, 94, '#A1673F', 0, 3) + R(170, 160, 74, 84, '#8D5A3B', 0, 3) + [0, 1].map((r) => [0, 1, 2].map((k) => R(6 + k * 20, 162 + r * 30, 12, 16, '#FFF59D', 2, 1.5) + R(180 + k * 20, 172 + r * 30, 12, 16, '#FFF59D', 2, 1.5)).join('')).join('')
      + R(84, 150, 72, 94, '#FFFDF5', 0, 3.5) + R(98, 70, 44, 82, '#FFFDF5', 0, 3.5) + Array.from({ length: 5 }, (_, r) => [0, 1, 2].map((k) => R(104 + k * 12, 78 + r * 14, 7, 9, '#5C6BC0', 1, 1.2)).join('')).join('')
      + Array.from({ length: 4 }, (_, r) => [0, 1, 2, 3, 4].map((k) => R(90 + k * 13, 160 + r * 20, 8, 12, '#5C6BC0', 1, 1.2)).join('')).join('')
      + P('M96 70l24-56 24 56z', '#FFFDF5', 3.5) + [[114, 50], [126, 50], [120, 34]].map(([x, y]) => C(x, y, 3, '#5C6BC0', 1.2)).join('') + C(120, 10, 5, '#B3E5FC', 2) + face(120, 196, 0.34)),
  // ---------- Yellowstone
  L('us/yellowstone/landmark-wolves.v1.svg', 'ฝูงหมาป่าหอนในหุบเขาลามาร์', 'A wolf pack howling in the Lamar Valley', ['wolves', 'ฝูงหมาป่า', 'wolf pack', 'หมาป่าเทา', 'lamar valley', 'หุบเขาลามาร์', 'howling', 'เสียงหอน', 'wildlife watching', 'spotting scope'], 'หาหมาป่าตัวเล็กที่พยายามหอนตามตัวใหญ่', 'Find the little wolf pup trying to howl like the big ones',
    // three grey and one black wolf sitting on a snowy hill with their noses pointed up howling at a big pale moon, a small fluffy pup copying them, a wide snowy valley and dark pines below, stars in the night sky
    sky('#283593') + C(176, 56, 30, '#FFF9C4', 3) + [[30, 30], [80, 20], [120, 50], [220, 100], [40, 80]].map(([x, y]) => C(x, y, 2.5, '#FFF59D', 0)).join('')
      + [20, 56, 196, 230].map((x) => pine(x, 196, 46, '#1B5E20')).join('') + P('M-4 150c60-40 180-40 248 0v94H-4z', '#E3F2FD', 3)
      + [[56, 176, '#90A4AE', 0.85, 0], [124, 168, '#455A64', 1, 1], [196, 186, '#B0BEC5', 0.55, 0]].map(([x, y, c, s, big]) => g(x, y, s, P('M-30 30c-10-30-4-60 16-74l26 4c10 20 12 46 8 70z', c, 3.5) + P('M-26 28c-20 6-34-2-36-14 12 4 22 2 32-6z', c, 3)
        + E(-4, 12, 12, 16, '#ECEFF1', 0) + Lc('M-10 30v-14M10 30v-16', INK, 2.5)
        + P('M-14-40c-2-20 10-36 26-40l20-22 4 10-10 14 10 6c-4 12-14 22-30 34z', c, 3.5) + P('M8-70l-2-18 12 10z', c, 2.5) + P('M-2-58l-10-14 14 4z', c, 2.5)
        + C(6, -56, 2.2, INK, 0) + E(0, -48, 4, 3, '#FF8FA3', 0) + P('M30-86c2 6 0 10-4 12', 'none', 2.5) + (big ? Lc('M40-100l8-8M44-90l10-2M34-108l2-10', '#FFF9C4', 3) : ''))).join('')),
  L('us/yellowstone/landmark-firelookout.v1.svg', 'กระท่อมเฝ้าไฟป่าบนยอดเขาวอชเบิร์น', 'The fire lookout on Mount Washburn', ['fire lookout', 'กระท่อมเฝ้าไฟป่า', 'mount washburn', 'ภูเขาวอชเบิร์น', 'lookout tower', 'หอเฝ้าระวัง', 'mountain summit hike', 'เดินขึ้นยอดเขา', 'binoculars', 'wildflower meadow'], 'หากล้องส่องทางไกลที่หน้าต่างกระท่อมบนยอดเขา', 'Find the binoculars at the window of the hut on the summit',
    // a little square hut with windows all round and a pointed roof on top of a bare mountain summit, a zigzag trail climbing up through wildflowers, a ranger looking out through binoculars, distant hills and a puff of cloud
    sky('#E1F5FE') + E(60, 40, 30, 12, '#FFFFFF', 0) + P('M-4 160l50-40 50 20 50-30 50 20 48-10v84H-4z', '#9FA8DA', 3)
      + P('M-4 244l90-150h68l90 150z', '#A5D6A7', 3.5) + Lc('M40 234l60-30-30-20 50-24-30-20 40-20', '#FFF3E0', 4) + [[50, 220, '#EC407A'], [180, 220, '#FFEB3B'], [160, 190, '#AB47BC'], [70, 196, '#FFEB3B'], [140, 230, '#EC407A']].map(([x, y, c]) => C(x, y, 4, c, 1.5)).join('')
      + R(84, 70, 72, 28, '#8D6E63', 0, 3) + R(84, 46, 72, 26, '#E3F2FD', 0, 3) + Lc('M108 46v26M132 46v26', INK, 3) + P('M76 46l44-28 44 28z', '#5D4037', 3.5) + Lc('M120 18v-8', INK, 3)
      + g(100, 70, 1, C(0, -8, 8, '#FFE0BD', 2) + P('M-12-12c0-6 24-6 24 0z', '#8D6E63', 2) + R(4, -12, 12, 6, '#263238', 2, 1.5)) + face(120, 82, 0.26)),
  L('us/yellowstone/landmark-yellowbus.v1.svg', 'รถทัวร์สีเหลืองหลังคาผ้าใบรุ่นเก่า', 'A vintage yellow touring bus with a canvas roof', ['historic yellow bus', 'รถทัวร์สีเหลืองรุ่นเก่า', 'vintage touring car', 'รถคลาสสิก', 'roll-back canvas top', 'หลังคาผ้าใบเปิดได้', 'old faithful inn', 'park tour', 'scenic drive', 'grand loop road'], 'หาหลังคาผ้าใบที่ม้วนพับไว้ด้านหลังรถ', 'Find the canvas roof rolled up at the back of the bus',
    // a long old-fashioned open-top yellow bus with four rows of bench seats full of waving passengers, its canvas roof rolled back, big round headlamps, a chrome grille with a face, driving along a road with pines and a steaming geyser behind
    sky('#B3E5FC') + [20, 200, 228].map((x) => pine(x, 150, 60)).join('') + Lc('M60 130c-6-20 6-40 0-60', '#FFFFFF', 10) + Lc('M60 130c-6-20 6-40 0-60', '#ECEFF1', 6) + P('M-4 150h248v94H-4z', '#A5D6A7', 3) + P('M-4 190h248v40H-4z', '#90A4AE', 3)
      + g(118, 170, 1, R(-90, -20, 170, 40, '#FFCA28', 10, 3.5) + P('M80-14h18c8 0 12 6 12 14v20H80z', '#FFCA28', 3.5) + R(98, -6, 12, 24, '#B0BEC5', 3, 2.5) + C(108, -12, 7, '#FFF9C4', 2.5)
        + [-70, -40, -10, 20].map((x, k) => C(x, -30, 9, '#FFE0BD', 2.5) + face(x, -30, 0.18) + Lc(`M${x + 8}-34l8-12`, '#FFE0BD', 4)).join('') + R(-96, -40, 18, 24, '#D7CCC8', 8, 3) + Lc('M-92-34h10M-92-26h10', '#A1887F', 2)
        + Lc('M-84-20h164', '#5D4037', 3) + [-60, 60].map((x) => C(x, 22, 15, INK, 0) + C(x, 22, 7, '#ECEFF1', 2)).join('') + face(-4, 2, 0.36)) ),
  L('us/yellowstone/landmark-snowcoach.v1.svg', 'รถตีนตะขาบท่องหิมะรุ่นเก่า', 'A vintage snowcoach on the winter road', ['snowcoach', 'รถสโนว์โค้ช', 'winter tour', 'ทัวร์ฤดูหนาว', 'tracked vehicle', 'รถตีนตะขาบ', 'skis in front', 'สกีด้านหน้า', 'snowy geyser basin', 'bombardier'], 'หาสกีคู่ด้านหน้าของรถท่องหิมะ', 'Find the pair of skis at the front of the snowcoach',
    // a rounded old-fashioned red-and-white snow vehicle like a little bus with porthole windows, caterpillar tracks underneath and a pair of skis at the front, gliding over deep snow, steam rising from a geyser basin and frosty trees behind
    sky('#E3F2FD') + [30, 210].map((x) => pine(x, 150, 60, '#A5D6A7')).join('') + [60, 170].map((x) => Lc(`M${x} 140c-8-20 8-40 0-70`, '#FFFFFF', 12)).join('') + P('M-4 150h248v94H-4z', '#FFFFFF', 3)
      + g(120, 170, 1, P('M-80 10c0-40 20-56 60-56h50c34 0 50 20 50 56z', '#E53935', 3.5) + R(-80, -4, 160, 16, '#FFFFFF', 0, 3) + [-50, -20, 10, 40].map((x) => C(x, -22, 10, '#B3E5FC', 3)).join('') + face(56, -18, 0.3)
        + R(-74, 12, 120, 24, '#37474F', 12, 3.5) + [-60, -36, -12, 12, 32].map((x) => C(x, 24, 6, '#90A4AE', 2)).join('') + P('M60 30h40c8 0 10-6 6-10', '#B0BEC5', 3.5) + Lc('M70 14v16', INK, 3))
      + [[30, 200], [210, 214]].map(([x, y]) => Lc(`M${x - 10} ${y}h20`, '#B3E5FC', 3)).join('')),
  L('us/yellowstone/landmark-osprey.v1.svg', 'นกออสเปรย์กับรังบนยอดหินในแคนยอนสีเหลือง', 'An osprey nest on a rock spire in the yellow canyon', ['osprey', 'นกออสเปรย์', 'osprey nest', 'รังนกบนยอดหิน', 'grand canyon of the yellowstone', 'แกรนด์แคนยอนแห่งเยลโลว์สโตน', 'yellow canyon walls', 'ผาหินสีเหลือง', 'fish hawk', 'artist point'], 'หารังกิ่งไม้ใหญ่บนยอดแท่งหิน', 'Find the big stick nest on top of the rock pillar',
    // steep yellow, cream and orange canyon walls with a green river far below, a tall thin rock pillar in front topped with a big messy stick nest with two fluffy chicks, a brown-and-white osprey flying in with a fish in its claws
    sky('#B3E5FC') + P('M-4 40c30 10 60 60 80 204H-4z', '#FDD835', 3) + P('M244 40c-30 10-60 60-80 204h84z', '#FFB74D', 3) + Lc('M10 80c20 10 30 30 40 60M230 90c-20 10-30 30-36 70', '#F57F17', 3) + band('M90 244c10-30 30-40 50-40', '#26A69A', 12)
      + P('M100 244l8-130h20l10 130z', '#FFF3C4', 3.5) + Lc('M108 150h22M106 190h28', '#E6C27A', 2.5) + E(118, 112, 32, 12, '#8D6E63', 3.5) + Lc('M90 108l56 6M92 116l50-8M96 104l42 12', '#6D4C41', 2.5)
      + [104, 128].map((x) => C(x, 100, 8, '#ECEFF1', 2.5) + C(x + 2, 98, 1.6, INK, 0) + P(`M${x + 6} 100l6 1-6 2z`, INK, 1)).join('')
      + g(170, 56, 1, P('M-60 0c20-20 40-20 60-4 20-16 40-16 60 4-20-4-40 0-60 10-20-10-40-14-60-10z', '#5D4037', 3) + E(0, 6, 14, 10, '#FFFFFF', 3) + C(10, -6, 8, '#FFFFFF', 2.5) + Lc('M4-8l12 0', '#5D4037', 2.5) + P('M18-6l6 2-6 3z', INK, 1.5) + C(12, -8, 1.6, INK, 0)
        + g(0, 24, 1, E(0, 0, 14, 5, '#90A4AE', 2.5) + P('M14 0l8-5v10z', '#90A4AE', 2) + C(-8, -1, 1.4, INK, 0)))),
  // ---------- Toronto and Niagara
  L('ca/toronto/landmark-peameal.v1.svg', 'แซนด์วิชเบคอนพีมีลของตลาดเซนต์ลอว์เรนซ์', 'A peameal bacon sandwich from St. Lawrence Market', ['peameal bacon sandwich', 'แซนด์วิชเบคอนพีมีล', 'st lawrence market', 'ตลาดเซนต์ลอว์เรนซ์', 'cornmeal crust', 'คลุกแป้งข้าวโพด', 'back bacon', 'เบคอนหลัง', 'mustard', 'kaiser bun'], 'หาขอบสีเหลืองของเบคอนที่คลุกแป้งข้าวโพด', 'Find the yellow cornmeal edges of the bacon slices',
    // a big round soft kaiser bun piled high with thick round slices of pink bacon each with a crumbly yellow cornmeal rim, a stripe of mustard dripping down, a smiling face on the top bun, a paper wrapper underneath
    P('M30 200l90-20 90 20-10 20H40z', '#FFFFFF', 3) + Lc('M60 204l60-14 60 14', '#E0E0E0', 2)
      + g(120, 140, 1, E(0, 46, 70, 16, '#E8B05A', 3.5) + [36, 22, 8].map((y, k) => E((k - 1) * 4, y, 76, 14, '#FFD54F', 3) + E((k - 1) * 4, y - 2, 64, 10, '#F48FB1', 2)).join('') + P('M-40 0c10 8 10 16 6 22M30 0c4 10 2 18-2 22', '#FFC107', 4) + Lc('M-40 0c10 8 10 16 6 22M30 0c4 10 2 18-2 22', '#FFC107', 4)
        + P('M-70-4c0-40 30-56 70-56s70 16 70 56z', '#E8B05A', 3.5) + Lc('M0-58c-10 20-10 34 0 50M-30-50c10 14 22 20 30 22M30-50c-10 14-22 20-30 22', '#B8762E', 3) + face(-30, -22, 0.36))),
  L('ca/toronto/landmark-wellandcanal.v1.svg', 'เรือใหญ่ขึ้นประตูน้ำคลองเวลแลนด์', 'A big ship rising in a Welland Canal lock', ['welland canal', 'คลองเวลแลนด์', 'canal lock', 'ประตูน้ำ', 'lake freighter', 'เรือสินค้าทะเลสาบ', 'ship rises', 'เรือลอยสูงขึ้น', 'st catharines', 'lock 3 viewing platform'], 'หาประตูน้ำบานใหญ่ด้านหลังเรือ', 'Find the big lock gates behind the ship',
    // a long red-and-black lake freighter sitting in a deep concrete lock chamber, the water level rising with arrows, huge wooden lock gates closed behind it, a viewing platform with a child waving, grass and trees on the banks
    sky('#E1F5FE') + E(40, 70, 30, 20, '#66BB6A', 3) + E(200, 66, 34, 20, '#43A047', 3) + P('M-4 90h248v154H-4z', '#A5D6A7', 3)
      + R(10, 110, 220, 110, '#B0BEC5', 0, 3.5) + P('M14 150h212v66H14z', '#1E88E5', 3) + [40, 200].map((x) => Lc(`M${x} 200v-30M${x - 6} 178l6-8 6 8`, '#FFFFFF', 3)).join('')
      + P('M14 110l26 0v70H14zM40 110v70', '#8D6E63', 3) + Lc('M18 120h18M18 140h18M18 160h18', '#5D4037', 2.5)
      + g(130, 140, 1, P('M-80 10h170l-14 24H-70z', '#C62828', 3.5) + R(-80, 0, 170, 12, '#263238', 0, 3) + R(52, -34, 34, 34, '#FFFFFF', 2, 3) + R(56, -28, 26, 8, '#4FC3F7', 1, 1.5) + R(64, -46, 10, 12, '#FFB300', 1, 2.5)
        + [-60, -30, 0, 30].map((x) => R(x, -8, 24, 8, '#FFB300', 1, 2)).join('') + face(-10, 22, 0.3))
      + R(160, 92, 70, 8, '#90A4AE', 0, 3) + Lc('M162 92v-12h66v12', '#607D8B', 2.5) + kid(196, 92, '#E53935', 0.7)),
  L('ca/toronto/landmark-shoemuseum.v1.svg', 'พิพิธภัณฑ์รองเท้าทรงกล่องรองเท้า', 'The shoe museum shaped like a shoebox', ['bata shoe museum', 'พิพิธภัณฑ์รองเท้าบาตา', 'shoe museum', 'พิพิธภัณฑ์รองเท้า', 'shoebox building', 'ตึกทรงกล่องรองเท้า', 'bloor street', 'ถนนบลัวร์', 'shoes from around the world', 'tilted lid roof'], 'หาหลังคาที่เปิดค้างเหมือนฝากล่องรองเท้า', 'Find the roof that sits half open like the lid of a shoebox',
    // a chunky pale stone building shaped like a shoebox with its lid slightly lifted and tilted on top, a tall narrow glass window slicing up the corner, a giant playful sneaker and a wooden clog in front, a child pointing
    sky('#FFF3E0') + P('M-4 200h248v44H-4z', '#B0BEC5', 3)
      + P('M40 200V90h150v110z', '#E8D2B0', 3.5) + P('M30 92l10-30 160-10 4 34z', '#D7B98E', 3.5) + Lc('M40 90l2-6 150-8', '#FFF3E0', 2.5) + Lc('M60 120h110M60 150h110M60 180h110', '#D7B98E', 2)
      + R(112, 56, 14, 144, '#81D4FA', 2, 3) + face(80, 140, 0.4)
      + g(170, 214, 1, P('M-36 0v-20c0-8 6-12 14-12h12l8 10h20c12 0 18 8 18 16v6z', '#EC407A', 3) + R(-38, 0, 76, 8, '#FFFFFF', 4, 3) + Lc('M-14-24l8 6M-8-28l8 6', '#FFFFFF', 2.5) + face(10, -10, 0.2))
      + g(56, 218, 1, P('M-28 0c0-14 10-24 24-24h10c10 0 22 10 22 24z', '#FFCA28', 3) + E(4, -16, 8, 4, '#A1673F', 2)) + kid(110, 232, '#1E88E5', 0.8)),
  L('ca/toronto/landmark-jetboat.v1.svg', 'เรือเจ็ตโบ๊ตตะลุยแก่งน้ำวนไนแอการา', 'A jet boat in the Niagara whirlpool rapids', ['jet boat', 'เรือเจ็ตโบ๊ต', 'whirlpool rapids', 'แก่งน้ำวน', 'niagara gorge', 'หุบผาไนแอการา', 'niagara on the lake', 'ไนแอการาออนเดอะเลก', 'big splash', 'raincoats'], 'หาเรือสีแดงที่ทะยานผ่านคลื่นน้ำขาว', 'Find the red boat charging through the white waves',
    // a wide red open boat full of riders in yellow ponchos bursting up through big white foaming rapids, sprays of water arching over them, steep green-and-brown gorge walls on both sides
    sky('#B3E5FC') + P('M-4-4h70c-10 80 0 150 10 180H-4zM244-4h-70c10 80 0 150-10 180h80z', '#8D6E63', 3) + [10, 40, 200, 226].map((x) => E(x, 30, 16, 12, '#43A047', 2.5)).join('')
      + P('M-4 150h248v94H-4z', '#26A69A', 3) + [[40, 180], [190, 200], [100, 226], [160, 170]].map(([x, y]) => P(`M${x - 20} ${y}q10-14 20 0 10-14 20 0`, '#FFFFFF', 3)).join('')
      + g(120, 160, 1, P('M-70-10h140l-16 30H-56z', '#E53935', 3.5) + R(-70, -16, 140, 8, '#FFFFFF', 3, 3) + [-48, -24, 0, 24, 48].map((x) => C(x, -26, 9, '#FFE0BD', 2.5) + P(`M${x - 10}-18c0-12 20-12 20 0z`, '#FFEB3B', 2) + face(x, -26, 0.17, 'o')).join('') + face(0, 4, 0.3))
      + [-1, 1].map((s) => [0, 1, 2].map((k) => Lc(`M${120 + s * 60} 150q${s * (30 + k * 10)}-${50 + k * 14} ${s * (60 + k * 10)}-${10 - k * 4}`, '#E1F5FE', 4)).join('')).join('')
      + [[60, 110], [180, 96], [120, 80]].map(([x, y]) => C(x, y, 4, '#FFFFFF', 1.5)).join('')),
  L('ca/toronto/landmark-buttertart.v1.svg', 'บัตเตอร์ทาร์ตขนมของออนแทรีโอ', 'An Ontario butter tart', ['butter tart', 'บัตเตอร์ทาร์ต', 'ontario dessert', 'ของหวานออนแทรีโอ', 'gooey filling', 'ไส้เยิ้มหวาน', 'raisins', 'ลูกเกด', 'flaky pastry', 'butter tart trail'], 'หาลูกเกดที่จมอยู่ในไส้เยิ้มสีน้ำตาล', 'Find the raisins sunk in the gooey brown filling',
    // a round little tart with a fluted golden pastry case, filled to the brim with shiny bubbly caramel-brown gooey filling and a few raisins, a drip running down the side, a smiling face on the filling, a second tart behind
    g(180, 120, 0.6, P('M-60 0l10 40h100l10-40z', '#F6C77E', 3.5) + E(0, 0, 60, 18, '#A1673F', 3.5))
      + g(110, 150, 1, P('M-78 0l14 50h128l14-50z', '#F6C77E', 3.5) + Array.from({ length: 8 }, (_, k) => Lc(`M${-66 + k * 18} 6l${4 - k} 42`, '#E8A657', 3)).join('')
        + Array.from({ length: 16 }, (_, k) => { const a = k * 22.5 * Math.PI / 180; return C(Math.cos(a) * 76, Math.sin(a) * 20, 7, '#F6C77E', 2.5); }).join('') + E(0, 0, 66, 17, '#A1673F', 3) + E(-14, -6, 22, 5, '#C77B30', 0)
        + [[-40, 2], [30, -4], [46, 6]].map(([x, y]) => E(x, y, 5, 3.5, '#4E342E', 1.5)).join('') + P('M54 8c4 10 4 18 0 24-4-6-4-14 0-24z', '#A1673F', 2.5) + C(-20, 4, 4, '#C77B30', 1.5) + face(4, -2, 0.36))),
];

export default { places: {}, items };
