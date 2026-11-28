// Wave 16: Kagoshima (+ Sakurajima, Ibusuki, Chiran, Kirishima) — the bay city facing a smoking volcano:
// the Sakurajima giant radish and tiny mandarins, the yellow ash bags, the lava-shore foot bath, the buried gate of Kurokami,
// Ibusuki's hot sand bath and its treasure-box train, Mount Kaimon and the southernmost station, Chiran's samurai gardens,
// shirokuma shaved ice, black-pig tonkatsu, satsuma-age, karukan, ryōgaku mochi, kibinago and the black-vinegar pots.
// Skipped as repeats or bans: the Amu Plaza ferris wheel (Vienna's Riesenrad), the lawn-track tram (HK, Budapest, Prague trams),
// Lake Ikeda's Issie (Loch Ness), Satsuma kiriko glass (Tokyo's kiriko), Tōsenkyō's spinning sōmen (Kumamoto's nagashi sōmen),
// the Saigō statue (a real person), the Chiran peace museum (war), Kirishima Jingū (a shrine), Yakushima (its own island).
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const KG = { k1: '#BF360C', k2: '#00838F', k3: '#FFF3E0' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `jp-kagoshima.landmark.${slug}`, cat: 'landmark', file: `jp/kagoshima/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a coloured line with an ink outline
const ol = (d, c, w) => Lc(d, INK, w + 4) + Lc(d, c, w);
// Sakurajima seen across the water: the wide double-humped volcano with a puff of smoke
const sakura = (x, y, s, c = '#8D6E63') => g(x, y, s, P('M-60 0l30-26 8 4 8-12 10 6 8-6 30 34z', c) + C(-2, -41, 6, '#ECEFF1', 2.5) + C(7, -46, 6.5, '#ECEFF1', 2.5) + C(17, -48, 5, '#ECEFF1', 2.5));
const waves = (d) => Lc(d, '#E0F7FA', 4);

const items = [
  { id: 'jp-kagoshima.stamp', cat: 'stamp', file: 'jp/kagoshima/stamp.v1.svg', name: nm('ตราประทับคาโกชิมะ', 'Kagoshima stamp'), kw: ['kagoshima', 'คาโกชิมะ', 'sakurajima', 'ซากุระจิมะ', 'volcano', 'ภูเขาไฟ', 'kinko bay', 'อ่าวคินโค', 'kyushu', 'คิวชู'],
    // Sakurajima smoking gently over the blue bay, a little white ferry crossing in front, a palm tree on the city shore
    svg: cityStamp('jkg-st', { name: 'KAGOSHIMA', sub: 'JAPAN', ...KG, emblem: P('M48 108h104a52 52 0 0 1-104 0z', '#4DD0E1', 0)
      + P('M58 108l22-26 8 4 8-12 10 6 8-6 28 34z', '#8D6E63') + P('M66 108c10-8 22-10 34-8s24 4 34 8z', '#81C784', 0)
      + C(104, 62, 7, '#ECEFF1') + C(116, 56, 8, '#ECEFF1') + C(128, 60, 6, '#ECEFF1')
      + P('M84 124h30l-5 8H89z', '#FFFFFF') + R(90, 116, 18, 8, '#FFFFFF') + R(92, 118, 14, 3, '#FF7043', 0, 0)
      + Lc('M140 128c0-12 2-20 4-26', '#8D6E63', 4) + P('M144 102c-8-6-16-4-18 2 6-2 12-2 18-2zM144 102c6-8 14-8 18-2-6-1-12 0-18 2z', '#43A047', 2.5)
      + Lc('M58 128h14M118 136h14', '#E0F7FA', 2.5) + face(98, 98, 0.3) }) },
  { id: 'jp-kagoshima.day.bay', cat: 'day', file: 'jp/kagoshima/day-bay.v1.svg', name: nm('ภูเขาไฟซากุระจิมะกลางอ่าวคินโค', 'Sakurajima smoking across Kinkō Bay'), kw: ['sakurajima', 'ซากุระจิมะ', 'kinko bay', 'อ่าวคินโค', 'kagoshima bay', 'อ่าวคาโกชิมะ', 'active volcano', 'ภูเขาไฟมีพลัง', 'sakurajima ferry', 'เรือเฟอร์รีซากุระจิมะ', 'kagoshima', 'คาโกชิมะ'],
    // the wide smiling volcano across the bay with a cloud of smoke rising from its top, a white ferry with an orange stripe crossing the water, palm trees on the city shore in front
    svg: scene('jkg-d1', '#B3E5FC', C(46, 52, 14, '#FFE082', 0)
      + C(132, 56, 14, '#ECEFF1') + C(148, 40, 17, '#ECEFF1') + C(170, 30, 14, '#F5F5F5') + C(188, 26, 10, '#F5F5F5')
      + P('M10 140l58-50 14 8 14-22 18 12 14-10 16 12 70 50z', '#8D6E63') + P('M16 140c30-22 60-30 104-28s76 12 106 28z', '#81C784')
      + R(-4, 138, 248, 110, '#4FC3F7') + face(110, 106, 0.42)
      + P('M86 172h70l-10 14H96z', '#FFFFFF') + R(98, 156, 46, 16, '#FFFFFF', 3) + R(98, 164, 46, 5, '#FF7043', 0, 0) + R(120, 146, 8, 10, '#FF7043', 0, 3) + Lc('M104 160h6M114 160h6M132 160h6', '#90CAF9', 2.5)
      + P('M-4 206c40-16 70-14 100 0v50H-4z', '#A5D6A7') + P('M244 210c-30-14-60-12-84 0v50h84z', '#A5D6A7')
      + Lc('M40 212c2-24 6-40 12-56', '#8D6E63', 6) + P('M52 156c-14-10-28-8-32 0 10-3 22-3 32 0zM52 156c10-14 24-14 30-6-10-1-20 1-30 6zM52 156c0-16 8-22 16-22-6 6-12 14-16 22z', '#43A047', 3)
      + Lc('M196 214c-2-20-4-34-8-46', '#8D6E63', 5) + P('M188 168c-12-8-24-6-26 2 8-3 18-3 26-2zM188 168c8-12 20-12 26-4-8-1-18 0-26 4z', '#43A047', 3)
      + waves('M30 186c10-5 20 5 30 0M170 192c10-5 20 5 30 0')) },
  { id: 'jp-kagoshima.day.kaimon', cat: 'day', file: 'jp/kagoshima/day-kaimon.v1.svg', name: nm('ภูเขาไคมงริมทะเลสาบอิเคดะกับทุ่งดอกนาโนฮานะ', 'Mount Kaimon over Lake Ikeda and the yellow flower fields'), kw: ['mount kaimon', 'ภูเขาไคมง', 'kaimondake', 'ไคมงดาเกะ', 'satsuma fuji', 'ฟูจิแห่งซัตสึมะ', 'lake ikeda', 'ทะเลสาบอิเคดะ', 'nanohana', 'ดอกนาโนฮานะ', 'ibusuki', 'อิบุสึกิ'],
    // a perfect green cone of a mountain beside the sea, a round blue lake in front of it, a field of yellow rapeseed flowers along the bottom
    svg: scene('jkg-d2', '#E1F5FE', R(-4, 112, 248, 40, '#4FC3F7', 0, 0)
      + P('M54 132L128 40l78 92z', '#66BB6A') + P('M114 58l14-18 15 18-8 6-7-6-7 6z', '#388E3C') + Lc('M96 104l10-6M150 96l12 8', '#A5D6A7', 3) + face(128, 98, 0.42)
      + P('M-4 128c40-6 80-4 120 2s90 4 128-2v40H-4z', '#81C784') + E(110, 150, 76, 16, '#29B6F6') + waves('M70 150c10-4 20 4 30 0M130 146c10-4 20 4 30 0')
      + P('M-4 170c50-8 110-6 160 0s70 4 88 2v84H-4z', '#7CB342')
      + [[12, 184], [32, 178], [54, 186], [76, 180], [98, 188], [120, 182], [142, 190], [164, 184], [186, 190], [208, 184], [228, 190], [22, 204], [46, 200], [70, 208], [94, 204], [118, 210], [142, 206], [166, 212], [190, 206], [214, 212], [36, 224], [82, 226], [130, 228], [178, 228]]
        .map(([x, y]) => C(x, y, 6, '#FFEB3B', 2.5)).join('')) },

  L('daikon', 'หัวไชเท้ายักษ์ซากุระจิมะ', 'The Sakurajima giant radish', ['sakurajima daikon', 'หัวไชเท้าซากุระจิมะ', 'giant radish', 'หัวไชเท้ายักษ์', 'biggest radish in the world', 'หัวไชเท้าใหญ่ที่สุดในโลก', 'round radish', 'หัวไชเท้ากลม', 'volcanic soil', 'ดินภูเขาไฟ'], 'หาหัวไชเท้าเล็กๆ ที่ยืนข้างหัวยักษ์', 'Find the little radish standing next to the giant one',
    // a huge round white radish as big as a beach ball with a tuft of green leaves on top and a tiny root tail, a normal long radish standing beside it to show how big it is
    E(120, 210, 92, 10, '#E0E0E0', 0) + P('M108 92c-14-30-36-46-60-48 6 22 28 40 60 48zM118 88c-4-32 8-56 28-66 6 26-6 50-28 66zM128 94c16-22 40-30 62-24-10 20-34 28-62 24z', '#43A047')
      + Lc('M70 56c14 12 26 22 36 32M144 34c-8 18-16 36-22 52M180 74c-18 4-34 10-48 18', '#81C784', 2.5)
      + E(116, 148, 66, 60, '#FAFAFA') + Lc('M70 126c4-14 12-24 24-30', '#E0E0E0', 4) + Lc('M116 208c0 6-2 10-6 12', INK, 3)
      + g(200, 176, 1, P('M-8-30c0 30 2 50 8 58 6-8 8-28 8-58z', '#FAFAFA') + P('M-2-30c-6-10-10-16-14-18 2 8 6 14 14 18zM2-30c4-10 8-16 14-18-2 8-6 14-14 18z', '#43A047', 2.5))
      + face(116, 150, 0.58)),
  L('komikan', 'ส้มจิ๋วซากุระจิมะโคมิกัง', 'Sakurajima komikan, the tiniest mandarins', ['sakurajima komikan', 'ส้มโคมิกังซากุระจิมะ', 'komikan', 'โคมิกัง', 'tiny mandarin', 'ส้มจิ๋ว', 'small citrus', 'ส้มลูกเล็ก', 'winter fruit', 'ผลไม้หน้าหนาว'], 'หาส้มที่ปอกเปลือกแล้วเห็นกลีบข้างใน', 'Find the peeled mandarin showing its segments',
    // a leafy branch hung with a bunch of small round orange mandarins, the middle one smiling, and one peeled in front with its little segments in a ring
    Lc('M30 50c50 6 100 20 150 60', '#6D4C41', 6) + P('M62 50c14-20 40-26 58-16-16 14-38 18-58 16zM132 72c20-14 46-12 60 2-20 8-42 8-60-2zM40 62c-10-18-6-36 8-46 4 18 0 34-8 46z', '#2E7D32')
      + Lc('M66 48c16-6 32-10 48-12M136 72c16-2 30 0 50 2', '#81C784', 2)
      + [[86, 92, 17], [118, 98, 18], [152, 114, 16], [100, 124, 16], [136, 132, 17]].map(([x, y, r]) => C(x, y, r, '#FF9800') + C(x - r / 3, y - r / 3, r / 5, '#FFCC80', 0)).join('')
      + Lc('M86 75v-6M118 80v-8M152 98v-6', '#6D4C41', 3)
      + C(122, 190, 26, '#FFB74D') + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => g(122, 190, 1, E(0, -14, 6, 12, '#FFE0B2', 2), a)).join('') + C(122, 190, 5, '#FFF3E0', 2)
      + face(118, 98, 0.32)),
  L('ashbag', 'ถุงเหลืองใส่เถ้าภูเขาไฟ', 'The yellow bags for volcano ash', ['volcanic ash bag', 'ถุงใส่เถ้าภูเขาไฟ', 'kohai bukuro', 'โคไฮบุคุโระ', 'yellow ash bag', 'ถุงเหลือง', 'volcano ash', 'เถ้าภูเขาไฟ', 'ash collection point', 'จุดทิ้งเถ้า', 'sakurajima', 'ซากุระจิมะ'], 'หาไม้กวาดกับที่โกยผงข้างถุงเหลือง', 'Find the broom and dustpan next to the yellow bag',
    // a plump yellow bag tied at the top and filled with grey ash, a little broom and dustpan leaning on it, grey ash specks drifting down from the smoking volcano behind
    bg('#E3F2FD') + sakura(120, 98, 1.4) + low(170, '#BDBDBD') + frame
      + [[40, 60], [70, 44], [196, 56], [180, 84], [52, 92], [206, 112], [34, 128]].map(([x, y]) => C(x, y, 2.5, '#9E9E9E', 0)).join('')
      + P('M76 200c-14-40-6-74 18-88l4-10h44l4 10c24 14 32 48 18 88z', '#FFEB3B') + P('M104 102l-6-12h44l-6 12z', '#FDD835') + Lc('M110 96l10-10 10 10', INK, 3)
      + Lc('M94 126c-6 14-8 34-4 58', '#FFF59D', 4)
      + ol('M196 210l-18-90', '#A1887F', 5) + P('M170 204l18-4 14 20-26 6z', '#FFB74D') + P('M38 212h40v-14l-30-6z', '#90A4AE') + Lc('M38 212l-8 6', INK, 4)
      + face(120, 156, 0.5)),
  L('ashiyu', 'บ่อแช่เท้ายาวริมลาวาซากุระจิมะ', 'The long foot bath on the Sakurajima lava shore', ['sakurajima foot bath', 'บ่อแช่เท้าซากุระจิมะ', 'ashiyu', 'อาชิยุ', 'yogan nagisa park', 'สวนโยกังนางิสะ', 'hot spring foot bath', 'บ่อน้ำพุร้อนแช่เท้า', 'lava shore', 'ชายฝั่งลาวา', 'free foot bath', 'บ่อแช่เท้าฟรี'], 'หาผ้าขนหนูที่ตากอยู่ข้างบ่อ', 'Find the towel hanging beside the bath',
    // a long winding stone trough of steaming hot water with a little wooden roof over one end, dark lava rocks and the sea behind, the volcano peeking over the top
    bg('#E1F5FE') + sakura(150, 92, 1.1) + P('M16 90h208v40H16z', '#4FC3F7', 0) + low(124, '#8D8D8D') + frame
      + [[34, 132, 12], [70, 140, 9], [198, 136, 13], [214, 160, 8], [28, 168, 10]].map(([x, y, r]) => E(x, y, r, r * 0.7, '#5D4037', 3)).join('')
      + P('M40 196c20-30 50-40 80-38s60 6 80-8l12 16c-22 18-58 22-92 18s-56 8-70 26z', '#BCAAA4')
      + Lc('M54 192c18-24 42-30 68-28s54 2 74-10', '#80DEEA', 9)
      + Lc('M72 176c-6-8 6-14 0-22M110 168c-6-8 6-14 0-22M150 166c-6-8 6-14 0-22', '#ECEFF1', 4)
      + R(170, 108, 6, 48, '#8D6E63', 0, 3) + R(212, 108, 6, 48, '#8D6E63', 0, 3) + P('M160 110l34-22 34 22z', '#6D4C41') + Lc('M176 132h36', '#8D6E63', 3) + R(186, 132, 14, 20, '#F48FB1', 2, 2.5)
      + face(110, 196, 0.36)),
  L('kurokamitorii', 'ประตูโทริอิที่ถูกเถ้าถมที่คุโรกามิ', 'The Kurokami gate half buried by the volcano', ['kurokami buried torii', 'โทริอิจมเถ้าคุโรกามิ', 'kurokami', 'คุโรกามิ', 'buried gate', 'ประตูจมดิน', '1914 eruption', 'การปะทุปี 1914', 'volcanic ash', 'เถ้าภูเขาไฟ', 'sakurajima', 'ซากุระจิมะ'], 'หาคานบนสุดของประตูที่โผล่พ้นเถ้า', 'Find the top beam of the gate peeking out of the ash',
    // only the top beams of an old grey stone gate stick out of a mound of grey ash, small flowers growing on the ash, the smoking volcano behind
    bg('#FFF8E1') + sakura(120, 142, 1.6, '#A1887F') + low(140, '#BDBDBD') + frame
      + P('M30 178c20-30 60-40 90-40s70 10 90 40z', '#9E9E9E') + R(80, 140, 14, 26, '#B0BEC5') + R(146, 140, 14, 26, '#B0BEC5')
      + R(70, 138, 100, 10, '#B0BEC5') + P('M56 128c20 4 40 6 64 6s44-2 64-6l-4 10H60z', '#90A4AE') + Lc('M66 132c18 2 36 3 54 3s36-1 54-3', '#CFD8DC', 2)
      + [[54, 196, '#F48FB1'], [76, 206, '#FFEB3B'], [164, 204, '#F48FB1'], [186, 196, '#FFEB3B'], [120, 210, '#CE93D8']].map(([x, y, c]) => Lc(`M${x} ${y + 12}v-10`, '#43A047', 3) + C(x, y, 5, c, 2.5)).join('')
      + face(120, 172, 0.4)),
  L('sunamushi', 'อาบทรายร้อนที่หาดอิบุสึกิ', 'The hot sand bath on Ibusuki beach', ['ibusuki sand bath', 'อาบทรายร้อนอิบุสึกิ', 'sunamushi', 'ซุนะมุชิ', 'hot sand bath', 'อาบทรายร้อน', 'black sand beach', 'หาดทรายดำ', 'onsen steam', 'ไอน้ำพุร้อน', 'ibusuki', 'อิบุสึกิ'], 'หาพลั่วไม้ที่ปักอยู่ในทราย', 'Find the wooden spade standing in the sand',
    // a row of smiling mounds of dark warm sand with steam curling up from them under a reed sunshade, a wooden spade stuck in the sand, the sea behind
    bg('#E1F5FE') + P('M16 88h208v36H16z', '#4FC3F7', 0) + low(120, '#6D5D53') + frame
      + R(36, 64, 6, 66, '#8D6E63', 0, 3) + R(198, 64, 6, 66, '#8D6E63', 0, 3) + P('M24 70l12-16h168l12 16z', '#D7B97A') + Lc('M40 62h160M48 56l-6 14M80 56l-4 14M112 56v14M144 56l4 14M176 56l6 14', '#B8955A', 2)
      + [[64, 170, '#FFB74D'], [120, 176, '#4FC3F7'], [176, 170, '#F48FB1']].map(([x, y, c]) => E(x, y, 30, 18, '#5D4E45') + E(x, y - 16, 12, 6, c, 2.5)).join('')
      + Lc('M56 146c-6-8 6-14 0-22M112 150c-6-8 6-14 0-22M170 146c-6-8 6-14 0-22', '#ECEFF1', 4)
      + ol('M206 214l-10-52', '#A1887F', 5) + P('M188 162l14-4 4 22-14 4z', '#BCAAA4')
      + Lc('M30 104c10-5 20 5 30 0M170 100c10-5 20 5 30 0', '#E1F5FE', 3.5) + face(120, 178, 0.32)),
  L('ibutama', 'รถไฟกล่องสมบัติอิบุสึกิสีขาวดำ', 'The black-and-white treasure-box train to Ibusuki', ['ibusuki no tamatebako', 'รถไฟอิบุสึกิโนะทามาเตะบาโกะ', 'ibutama', 'อิบุทามะ', 'treasure box train', 'รถไฟกล่องสมบัติ', 'black and white train', 'รถไฟสีขาวดำ', 'puff of mist', 'ไอหมอกที่ประตู', 'ibusuki', 'อิบุสึกิ'], 'หาหมอกสีขาวที่พ่นออกจากประตูรถไฟ', 'Find the white mist puffing out of the train door',
    // a two-car train painted black along the top and white along the bottom with a gold line between, puffs of white mist coming out of its open door, a smiling face on the front, the sea beside the track
    bg('#E0F7FA') + P('M16 134h208v24H16z', '#4FC3F7', 0) + low(158, '#C5E1A5') + frame + Lc('M16 186h208', '#795548', 5) + Lc('M30 192h4M60 192h4M90 192h4M120 192h4M150 192h4M180 192h4M210 192h4', '#795548', 3)
      + P('M24 120h88v62H24z', '#FFFFFF') + P('M24 120h88v26H24z', '#263238') + Lc('M24 147h88', '#FFC107', 3)
      + P('M116 120h76c14 0 24 16 24 30v32H116z', '#FFFFFF') + P('M116 120h76c10 0 18 10 21 26h-97z', '#263238') + Lc('M116 147h97', '#FFC107', 3)
      + R(36, 126, 18, 14, '#90CAF9', 2, 2.5) + R(66, 126, 18, 14, '#90CAF9', 2, 2.5) + R(128, 126, 18, 14, '#90CAF9', 2, 2.5) + R(196, 128, 14, 14, '#90CAF9', 3, 2.5)
      + R(92, 150, 14, 30, '#FFE082', 0, 2.5) + C(48, 184, 7, '#424242', 3) + C(88, 184, 7, '#424242', 3) + C(140, 184, 7, '#424242', 3) + C(186, 184, 7, '#424242', 3)
      + C(102, 90, 12, '#FFFFFF', 3) + C(88, 74, 10, '#FFFFFF', 3) + C(110, 64, 9, '#FFFFFF', 3) + C(126, 82, 8, '#FFFFFF', 3)
      + face(186, 164, 0.36)),
  L('senganen', 'สวนเซ็นกังเอ็นกับภูเขาไฟเป็นฉากหลัง', 'Sengan-en Garden with the volcano as its backdrop', ['sengan-en', 'สวนเซ็นกังเอ็น', 'senganen garden', 'สวนเซ็นกังเอ็น', 'borrowed scenery', 'สวนยืมทิวทัศน์', 'japanese garden', 'สวนญี่ปุ่น', 'stone lantern', 'โคมหิน', 'pine tree', 'ต้นสน'], 'หาโคมหินข้างสระน้ำ', 'Find the stone lantern beside the pond',
    // a Japanese garden with a curving pond, a low pine leaning over the water and a squat stone lantern, the smoking volcano across the bay rising behind it as if part of the garden
    bg('#E3F2FD') + sakura(124, 106, 1.4) + P('M16 104h208v20H16z', '#4FC3F7', 0) + low(122, '#A5D6A7') + frame
      + P('M50 178c10-24 50-34 90-30s60 18 52 34c-20 14-110 18-142-4z', '#4FC3F7') + waves('M80 168c10-4 20 4 30 0M130 176c10-4 20 4 30 0')
      + ol('M42 172c10-26 30-38 62-42', '#6D4C41', 6) + E(66, 136, 24, 10, '#2E7D32') + E(100, 126, 22, 9, '#388E3C') + E(48, 152, 18, 8, '#2E7D32')
      + R(178, 186, 26, 8, '#9E9E9E', 0, 3) + R(184, 166, 14, 20, '#BDBDBD', 0, 3) + R(182, 154, 18, 12, '#E0E0E0', 0, 3) + R(187, 157, 8, 6, '#FFE082', 0, 0) + P('M172 156l19-14 19 14z', '#9E9E9E') + C(191, 138, 4, '#9E9E9E', 2.5)
      + [[30, 200], [150, 206], [214, 206]].map(([x, y]) => E(x, y, 12, 7, '#9E9E9E', 3)).join('') + face(122, 162, 0.34)),
  L('chiran', 'สวนบ้านซามูไรที่ชิรัน', 'The samurai house gardens of Chiran', ['chiran samurai residences', 'บ้านซามูไรชิรัน', 'chiran', 'ชิรัน', 'samurai garden', 'สวนบ้านซามูไร', 'clipped hedges', 'พุ่มไม้ตัดแต่ง', 'mount haha', 'ภูเขาฮาฮา', 'stone wall lane', 'ตรอกกำแพงหิน'], 'หาพุ่มไม้กลมที่ตัดเป็นรูปก้อนเมฆ', 'Find the round hedge clipped like a cloud',
    // a low samurai house with a dark tiled roof and a white wall, a garden of round hedges clipped like clouds and white raked gravel, a green mountain behind standing in for a waterfall
    bg('#E8F5E9') + P('M16 120c30-50 70-76 104-76s74 26 104 76z', '#81C784', 0) + low(150, '#F5F5F5') + frame
      + R(36, 96, 168, 34, '#FFFFFF') + P('M24 98l22-20h148l22 20z', '#455A64') + Lc('M46 86h148', '#607D8B', 2.5) + Lc('M60 96v34M100 96v34M140 96v34M180 96v34', '#A1887F', 3)
      + P('M16 130h208v20H16z', '#2E7D32') + E(60, 128, 30, 12, '#388E3C') + E(120, 124, 34, 13, '#43A047') + E(182, 128, 30, 12, '#388E3C')
      + Lc('M30 174c20-6 40 6 60 0s40 6 60 0 40 6 60 0M30 196c20-6 40 6 60 0s40 6 60 0 40 6 60 0', '#BDBDBD', 2.5)
      + E(84, 178, 22, 14, '#66BB6A') + E(160, 182, 26, 16, '#66BB6A') + E(150, 170, 16, 10, '#81C784') + E(124, 206, 14, 7, '#9E9E9E', 3)
      + face(160, 182, 0.36)),
  L('shirokuma', 'น้ำแข็งไสชิโรคุมะหน้าหมีขาว', 'Shirokuma, shaved ice with a polar bear face', ['shirokuma', 'ชิโรคุมะ', 'white bear shaved ice', 'น้ำแข็งไสหมีขาว', 'kakigori', 'คาคิโงริ', 'condensed milk ice', 'น้ำแข็งไสนมข้น', 'fruit topping', 'ผลไม้ราดหน้า', 'tenmonkan', 'เท็มมงกัง'], 'หาลูกเกดสองเม็ดที่เป็นตาหมี', 'Find the two raisins that are the bear’s eyes',
    // a glass bowl heaped with snowy white shaved ice, its fruit on top laid out as a bear's face: raisin eyes, a cherry nose, round orange ears, kiwi and pineapple around
    E(120, 210, 54, 9, '#E0E0E0', 0) + P('M70 166h100l-14 30H84z', '#E1F5FE') + R(104, 196, 32, 10, '#E1F5FE', 0, 4)
      + P('M50 168c-6-56 30-92 70-92s76 36 70 92z', '#FFFFFF') + C(80, 88, 14, '#FFB74D') + C(160, 88, 14, '#FFB74D')
      + E(94, 122, 6, 7, '#5D4037', 3) + E(146, 122, 6, 7, '#5D4037', 3) + C(120, 140, 9, '#E53935') + Lc('M120 131c2-8 8-12 14-14', '#6D4C41', 2.5)
      + Lc('M108 154q12 8 24 0', INK, 3.5) + E(84, 140, 7, 4, '#FF8FA3', 0) + E(156, 140, 7, 4, '#FF8FA3', 0)
      + g(70, 150, 1, C(0, 0, 9, '#9CCC65', 2.5) + C(0, 0, 4, '#F1F8E9', 0)) + g(170, 150, 1, C(0, 0, 9, '#9CCC65', 2.5) + C(0, 0, 4, '#F1F8E9', 0))
      + P('M104 98l8-10 8 10zM120 98l8-10 8 10z', '#FFEE58', 2.5) + R(66, 112, 10, 10, '#FFEE58', 2, 2.5) + R(164, 112, 10, 10, '#FFEE58', 2, 2.5)),
  L('kurobuta', 'ทงคัตสึหมูดำคาโกชิมะ', 'Tonkatsu of Kagoshima black pork', ['kurobuta', 'คุโรบุตะ', 'kagoshima black pork', 'หมูดำคาโกชิมะ', 'tonkatsu', 'ทงคัตสึ', 'breaded pork cutlet', 'หมูชุบเกล็ดขนมปังทอด', 'shredded cabbage', 'กะหล่ำปลีซอย', 'berkshire pig', 'หมูพันธุ์เบิร์กเชียร์'], 'หาธงหมูดำตัวเล็กที่ปักบนหมูทอด', 'Find the little black pig flag on the cutlet',
    // a white plate with a golden crumbed pork cutlet cut in strips, a mound of pale green shredded cabbage and a lemon wedge, a toothpick flag with a little smiling black pig stuck in the cutlet
    E(120, 160, 100, 46, '#FFFFFF') + E(120, 160, 86, 36, '#FAFAFA', 3)
      + P('M150 140c10-20 40-20 50 0 4 16-8 26-24 26s-30-10-26-26z', '#DCEDC8') + Lc('M158 140c10-6 24-6 34 2M156 150c12-6 28-4 38 4M164 160c8-4 18-2 26 4', '#AED581', 2.5)
      + g(100, 160, 1, R(-56, -20, 112, 40, '#E0A040', 12) + Lc('M-30-20v40M-6-20v40M18-20v40M40-18v36', '#B87A2A', 3) + [[-44, -8], [-20, 6], [6, -10], [28, 4], [-36, 10], [14, 10]].map(([x, y]) => C(x, y, 2.5, '#F6C77A', 0)).join(''), -5)
      + P('M168 176l20-6 4 14z', '#FFF176', 2.5)
      + Lc('M100 156V96', '#C8A165', 3) + g(118, 86, 1, E(0, 0, 18, 13, '#37474F') + C(-14, -10, 5, '#37474F', 2.5) + C(14, -10, 5, '#37474F', 2.5) + E(0, 4, 7, 5, '#F48FB1', 2) + C(-2, 4, 1.2, INK, 0) + C(2, 4, 1.2, INK, 0) + C(-7, -3, 2, '#FFFFFF', 0) + C(7, -3, 2, '#FFFFFF', 0))
      + face(100, 162, 0.36)),
  L('satsumaage', 'ซัตสึมะอาเกะ ลูกชิ้นปลาทอด', 'Satsuma-age, fried fish cakes', ['satsuma-age', 'ซัตสึมะอาเกะ', 'tsukeage', 'สึเกะอาเกะ', 'fried fish cake', 'ลูกชิ้นปลาทอด', 'fish paste', 'เนื้อปลาบด', 'carrot bits', 'แครอตหั่นเต๋า', 'kagoshima snack', 'ของว่างคาโกชิมะ'], 'หาจุดสีส้มของแครอตในลูกชิ้นปลา', 'Find the orange carrot bits in the fish cake',
    // a little bamboo tray of golden-brown fried fish cakes — round flat ones, a long stick-shaped one and one cut open to show the white inside with orange carrot bits — and a dab of grated ginger
    P('M30 150h180l-12 46H42z', '#D7B97A') + Lc('M40 160h160M46 172h148M50 184h140', '#B8955A', 2)
      + E(78, 140, 32, 22, '#C68642') + E(70, 134, 10, 5, '#E0A867', 0) + E(160, 142, 34, 22, '#B9783A') + E(154, 136, 10, 5, '#D89A5C', 0)
      + g(118, 110, 1, R(-50, -12, 100, 24, '#C68642', 12) + E(-30, -4, 10, 4, '#E0A867', 0), -8)
      + E(120, 164, 24, 14, '#B9783A') + E(120, 164, 18, 9, '#FFF8E1', 0) + [[112, 162], [122, 166], [130, 160], [116, 168]].map(([x, y]) => R(x - 2, y - 2, 4, 4, '#FF7043', 0, 0)).join('')
      + C(194, 108, 10, '#FFE082') + Lc('M190 104l6 6M196 102l-4 8', '#FBC02D', 1.5)
      + face(160, 146, 0.36)),
  L('karukan', 'ขนมคารุกังเค้กมันเทศขาวนุ่ม', 'Karukan, the soft white yam cake', ['karukan', 'คารุกัง', 'karukan manju', 'คารุกังมันจู', 'yam cake', 'เค้กมันเทศญี่ปุ่น', 'white steamed cake', 'ขนมนึ่งสีขาว', 'red bean paste', 'ถั่วแดงกวน', 'kagoshima sweet', 'ขนมหวานคาโกชิมะ'], 'หาขนมลูกกลมที่มีไส้ถั่วแดง', 'Find the round bun filled with red bean',
    // a long block of snowy white spongy cake with tiny holes, one thick slice in front, and a round white bun cut open to show its red bean filling, on a green leaf
    P('M28 186c40-22 140-26 186-2-30 26-150 30-186 2z', '#81C784') + Lc('M44 186c50-8 110-8 156-2', '#A5D6A7', 2.5)
      + P('M54 112l90-20 40 14-90 22z', '#FFFFFF') + P('M94 128l90-22v46l-90 24z', '#FAFAFA') + P('M54 112l40 16v48l-40-16z', '#FFFFFF')
      + [[110, 140], [130, 132], [150, 144], [168, 126], [124, 156], [160, 154]].map(([x, y]) => C(x, y, 1.8, '#E0E0E0', 0)).join('')
      + R(32, 138, 52, 46, '#FFFFFF', 4) + [[42, 150], [58, 160], [72, 146], [48, 172], [70, 170]].map(([x, y]) => C(x, y, 1.8, '#E0E0E0', 0)).join('')
      + C(184, 170, 22, '#FFFFFF') + C(184, 172, 11, '#8D4A4A', 2.5) + face(58, 158, 0.34)),
  L('kibinago', 'ปลาคิบินาโงะเรียงเป็นดอกเบญจมาศ', 'Kibinago, little striped fish laid out like a chrysanthemum', ['kibinago', 'คิบินาโงะ', 'silver-stripe round herring', 'ปลาแฮร์ริงลายเงิน', 'chrysanthemum plate', 'จานรูปดอกเบญจมาศ', 'vinegar miso', 'มิโสะเปรี้ยว', 'kagoshima fish', 'ปลาคาโกชิมะ', 'little fish', 'ปลาตัวเล็ก'], 'หาถ้วยมิโสะสีเหลืองกลางจาน', 'Find the little cup of yellow miso in the middle',
    // a round blue plate with slim silver fish split open, each with a blue stripe, laid in a ring like the petals of a flower, a small cup of yellow vinegar miso in the middle
    C(120, 130, 92, '#1565C0') + C(120, 130, 82, '#E3F2FD', 3)
      + [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => g(120, 130, 1, P('M-7-30c-4-16 0-34 7-44 7 10 11 28 7 44z', '#ECEFF1', 2.5) + Lc('M0-34v-30', '#64B5F6', 3), a)).join('')
      + C(120, 130, 22, '#FFFFFF') + C(120, 130, 15, '#FFD54F', 2.5) + face(120, 128, 0.3)),
  L('jambo', 'จัมโบโมจิ โมจิเสียบไม้สองอัน', 'Jambo mochi, rice cakes on two sticks', ['jambo mochi', 'จัมโบโมจิ', 'ryogaku mochi', 'เรียวงาคุโมจิ', 'two-stick mochi', 'โมจิเสียบไม้สองอัน', 'soy glaze', 'ซอสโชยุหวาน', 'iso garden snack', 'ของว่างริมทะเลอิโซะ', 'grilled rice cake', 'โมจิย่าง'], 'หาโมจิที่มีซอสสีเขียว', 'Find the mochi with the green sauce',
    // a long dish with soft white rice cakes in a row, each skewered with a pair of bamboo sticks like two swords, glazed with brown soy sauce or green miso
    P('M24 160h192l-14 26H38z', '#B0BEC5') + E(120, 160, 96, 12, '#ECEFF1')
      + [[60, '#A1663B'], [100, '#9CCC65'], [140, '#A1663B'], [180, '#9CCC65']].map(([x, c], k) => g(x, 150, 1, ol('M-6-6l-14-58M6-6l14-58', '#E0C48A', 3) + R(-16, -18, 32, 22, '#FFFFFF', 8) + R(-14, -18, 28, 10, c, 5, 0) + (k === 1 ? face(0, -4, 0.24) : ''))).join('')),
  L('kurozu', 'ไหหมักน้ำส้มสายชูดำแห่งฟุกุยามะ', 'The black vinegar pots of Fukuyama', ['black vinegar', 'น้ำส้มสายชูดำ', 'kurozu', 'คุโรซุ', 'fukuyama', 'ฟุกุยามะ', 'clay pots', 'ไหดินเผา', 'pot field', 'ลานไห', 'kirishima', 'คิริชิมะ'], 'หาไหที่ยิ้มอยู่แถวหน้าสุด', 'Find the smiling pot in the front row',
    // rows and rows of round brown clay pots with little white caps sitting out in the sunshine on a slope above the bay, the volcano across the water
    bg('#E1F5FE') + sakura(150, 80, 1.1) + P('M16 82h208v20H16z', '#4FC3F7', 0) + low(100, '#D7CCC8') + frame
      + [[34, 112], [62, 112], [90, 112], [118, 112], [146, 112], [174, 112], [202, 112]].map(([x, y]) => E(x, y, 11, 10, '#8D6E63', 3) + E(x, y - 9, 6, 3, '#FFFFFF', 2.5)).join('')
      + [[46, 140], [80, 140], [114, 140], [148, 140], [182, 140]].map(([x, y]) => E(x, y, 15, 13, '#795548') + E(x, y - 12, 8, 4, '#FFFFFF', 3)).join('')
      + [[56, 186], [120, 186], [184, 186]].map(([x, y]) => E(x, y, 24, 22, '#6D4C41') + E(x, y - 20, 12, 5, '#FFFFFF', 3) + Lc(`M${x - 16} ${y - 4}c10 4 22 4 32 0`, '#8D6E63', 2.5)).join('')
      + face(120, 188, 0.4)),
  L('nishioyama', 'สถานีนิชิโออิยามะ สถานีใต้สุดของญี่ปุ่น', 'Nishi-Ōyama, the southernmost station of Japan', ['nishi-oyama station', 'สถานีนิชิโออิยามะ', 'southernmost station', 'สถานีใต้สุด', 'yellow post box', 'ตู้ไปรษณีย์สีเหลือง', 'mount kaimon', 'ภูเขาไคมง', 'country station', 'สถานีชนบท', 'ibusuki', 'อิบุสึกิ'], 'หาตู้ไปรษณีย์สีเหลืองบนชานชาลา', 'Find the yellow post box on the platform',
    // a small country platform with a blank station sign on two posts and a bright yellow post box, a field of yellow flowers, the green cone of Mount Kaimon right behind
    bg('#E3F2FD') + P('M50 140L126 54l78 86z', '#66BB6A') + P('M112 70l14-16 15 16-8 6-7-6-7 6z', '#388E3C') + low(136, '#AED581') + frame
      + R(16, 150, 208, 16, '#BDBDBD', 0, 3) + Lc('M16 182h208', '#795548', 5)
      + R(50, 96, 6, 54, '#90A4AE', 0, 3) + R(110, 96, 6, 54, '#90A4AE', 0, 3) + R(40, 92, 86, 26, '#FFFFFF', 4) + Lc('M54 105h58', '#90CAF9', 4)
      + R(152, 112, 30, 38, '#FFEB3B', 6) + R(160, 120, 14, 4, INK, 0, 0) + P('M150 114c0-10 8-14 17-14s17 4 17 14z', '#FDD835') + face(167, 136, 0.3)
      + [[24, 204], [48, 198], [72, 208], [96, 200], [144, 206], [168, 198], [192, 206], [214, 200], [120, 210]].map(([x, y]) => C(x, y, 6, '#FFEB3B', 2.5)).join('')),
];

export default {
  places: {
    'jp-kagoshima': { country: 'jp', wave: 3, name: nm('คาโกชิมะและซากุระจิมะ', 'Kagoshima and Sakurajima'), tz: 'Asia/Tokyo', ll: [31.6, 130.56], alias: ['kagoshima', 'คาโกชิมะ', 'คาโงชิมะ', '鹿児島', 'KOJ', 'sakurajima', 'ซากุระจิมะ', '桜島', 'ibusuki', 'อิบุสึกิ', 'อิบุซึกิ', '指宿', 'chiran', 'ชิรัน', 'kirishima', 'คิริชิมะ', 'mount kaimon', 'kaimondake', 'ภูเขาไคมง', 'sengan-en', 'senganen', 'เซ็นกังเอ็น', 'tenmonkan', 'เท็มมงกัง'], colors: KG },
  },
  items,
};
