// Wave 13, central Thailand 1: Khao Kho, Phu Thap Boek, Si Thep and Phu Hin Rong Kla (Phetchabun) — the Pha Son Kaew
// chedi as a building only (no Buddha images), no wind turbines (Gaomei has them), no sea of mist, no camping, no tamarind,
// no strawberries or avocados (Đà Lạt), no sunflowers (Khao Yai), no carrying basket (Nepal's doko)
import { P, R, C, E, Lc, g, face, free, scene, cityStamp, INK } from '../lib.mjs';

const nm = (th, en) => ({ th, en });
const KK = { k1: '#2E7D32', k2: '#6A1B9A', k3: '#E8F5E9' };
const L = (slug, th, en, kw, sth, sen, svg) => ({ id: `th-khaokho.landmark.${slug}`, cat: 'landmark', file: `th/khaokho/landmark-${slug}.v1.svg`, name: nm(th, en), kw, colour: true, spot: nm(sth, sen), svg: free(svg) });
const bg = (c) => R(16, 16, 208, 208, c, 30);
const frame = R(16, 16, 208, 208, 'none', 30);
const low = (y, c) => P(`M16 ${y}h208v${194 - y}a30 30 0 0 1-30 30H46a30 30 0 0 1-30-30z`, c, 0);
// a round cabbage: pale heart, two big wrapping leaves with veins
const cab = (x, y, s, sw = 3) => g(x, y, s, C(0, 0, 21, '#E6F4C8', sw) + C(2, -4, 11, '#F1F8E2', 0) + P('M-21 4c-6-6-4-14 2-16-2 4 2 6 4 4 0-6 6-10 10-8-8 10-6 24 2 34-10-2-16-8-18-14z', '#AED581', sw) + P('M21 4c6-6 4-14-2-16 2 4-2 6-4 4 0-6-6-10-10-8 8 10 6 24-2 34 10-2 16-8 18-14z', '#9CCC65', sw) + Lc('M-12 2l-6-4M-12 10l-7 0M12 2l6-4M12 10l7 0', '#F1F8E2', 2));
// a pine: a dark trunk and three stacked green tiers
// a little cabbage for far rows: a ball and one wrapping leaf
const mcab = (x, y, s) => C(x, y, 12 * s, '#C5E1A5', 2.5) + P(`M${x - 12 * s} ${y}c0-8 6-12 12-12-6 6-6 14 0 24-8-2-12-6-12-12z`, '#7CB342', 0);
const pine = (x, y, s) => g(x, y, s, R(-3, -6, 6, 16, '#6D4C41', 0, 2.5) + P('M0-60l-16 22h8l-14 18h10l-14 16h52l-14-16h10l-14-18h8z', '#2E7D32', 3));

const items = [
  { id: 'th-khaokho.stamp', cat: 'stamp', file: 'th/khaokho/stamp.v1.svg', name: nm('ตราประทับเขาค้อและภูทับเบิก', 'Khao Kho and Phu Thap Boek stamp'), kw: ['khao kho', 'เขาค้อ', 'phu thap boek', 'ภูทับเบิก', 'phetchabun', 'เพชรบูรณ์', 'cabbage hills', 'ไร่กะหล่ำปลี'],
    // a round green hill striped with terraces, three smiling cabbages sitting on it and a little pine on the top
    svg: cityStamp('tkh-st', { name: 'KHAO KHO', sub: 'PHETCHABUN', ...KK, emblem: P('M52 140c14-40 34-62 48-62s34 22 48 62z', '#AED581', 3) + Lc('M66 118c20 6 48 6 68 0M58 132c26 6 58 6 84 0', '#7CB342', 3) + pine(100, 86, 0.42) + cab(78, 128, 0.5, 2.5) + cab(122, 128, 0.5, 2.5) + cab(100, 116, 0.6, 2.5) + face(100, 116, 0.22) }) },
  { id: 'th-khaokho.day.phuthapboek', cat: 'day', file: 'th/khaokho/day-phuthapboek.v1.svg', name: nm('ไร่กะหล่ำปลีภูทับเบิกยามเช้า', 'The cabbage hills of Phu Thap Boek at dawn'), kw: ['phu thap boek', 'ภูทับเบิก', 'cabbage terraces', 'ไร่กะหล่ำปลี', 'sunrise', 'พระอาทิตย์ขึ้น', 'hmong village', 'หมู่บ้านม้ง', 'mountain top', 'ยอดดอย', 'chilly morning', 'อากาศหนาว'],
    // a peach dawn over blue mountain ridges, a big green hill in front striped with curving rows of round cabbages, little hilltop huts on the crest
    svg: scene('tkh-d1', '#FFD7B5', C(70, 70, 22, '#FFE082', 0) + P('M-4 112c50-30 90-36 130-20s80-10 118-18v60H-4z', '#9FA8DA') + P('M-4 128c60-24 120-26 248-10v40H-4z', '#7986CB')
      + P('M-4 150c40-50 100-70 150-60s70 20 98 30v140H-4z', '#9CCC65')
      + [[150, 7], [172, 8], [196, 9], [222, 9]].map(([y, n], r) => Array.from({ length: n }, (_, k) => mcab(8 + k * (232 / (n - 1)) + (r % 2) * 10, y, 0.7 + r * 0.14)).join('')).join('')
      + [[118, 96], [150, 90], [182, 98]].map(([x, y]) => R(x - 12, y - 14, 24, 14, '#FFFFFF', 0, 3) + P(`M${x - 16} ${y - 14}l16-12 16 12z`, '#E53935', 3)).join('') + face(110, 196, 0.34)) },
  { id: 'th-khaokho.day.khaokhoroad', cat: 'day', file: 'th/khaokho/day-khaokhoroad.v1.svg', name: nm('ถนนคดเคี้ยวขึ้นเขาค้อ', 'The winding road up Khao Kho'), kw: ['khao kho', 'เขาค้อ', 'mountain road', 'ถนนขึ้นเขา', 'hairpin bends', 'ทางโค้ง', 'road trip', 'ขับรถเที่ยว', 'green hills', 'ภูเขาเขียว', 'phetchabun', 'เพชรบูรณ์'],
    // layered green mountains, a grey road swinging back and forth up the slope in big S bends, a little red car climbing, pines along the way
    svg: scene('tkh-d2', '#B3E5FC', [[60, 50], [176, 40]].map(([x, y]) => E(x, y, 24, 9, '#FFFFFF', 0)).join('') + P('M-4 100c40-36 80-40 120-14 40-30 90-30 128 4v40H-4z', '#81C784') + P('M-4 130c60-30 140-40 248-6v130H-4z', '#66BB6A')
      + P('M200 250c-60-10-140-14-150-34s110-14 120-40-90-12-96-34 60-14 70-28', 'none').replace('fill="none"', 'fill="none" stroke="#78909C" stroke-width="18"') + P('M200 250c-60-10-140-14-150-34s110-14 120-40-90-12-96-34 60-14 70-28', 'none').replace('fill="none"', 'fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="6 6"')
      + g(160, 176, 0.9, R(-16, -10, 32, 14, '#E53935', 4) + P('M-10-10l4-8h14l4 8z', '#90CAF9', 3) + C(-8, 6, 5, INK, 0) + C(8, 6, 5, INK, 0)) + face(160, 166, 0.2, 'none')
      + [[24, 150, 0.6], [214, 140, 0.55], [30, 214, 0.7], [216, 210, 0.75]].map(([x, y, s]) => pine(x, y, s)).join('')) },

  L('pasornkaew', 'เจดีย์วัดพระธาตุผาซ่อนแก้ว', 'The mosaic chedi of Wat Pha Son Kaew', ['wat pha son kaew', 'วัดพระธาตุผาซ่อนแก้ว', 'mosaic chedi', 'เจดีย์ประดับกระเบื้อง', 'broken tiles', 'เศษกระเบื้อง', 'colourful pagoda', 'เจดีย์หลากสี', 'hilltop temple', 'วัดบนเขา'], 'หาเจดีย์ที่ประดับด้วยเศษกระเบื้องหลากสีเต็มองค์', 'Find the pagoda covered all over in bright bits of tile',
    // a tall chedi on a hill made of rounded stacked tiers, every tier speckled with coloured mosaic pieces, a golden spire on top, a winding tiled stair in front
    P('M16 196c50-26 160-26 208 0v28H16z', '#9CCC65', 0) + R(60, 168, 120, 22, '#FFFFFF', 4) + P('M70 168c0-30 20-40 50-40s50 10 50 40z', '#F5F5F5') + P('M84 128c0-22 14-30 36-30s36 8 36 30z', '#FFFFFF') + P('M96 98c0-16 10-22 24-22s24 6 24 22z', '#F5F5F5')
      + P('M108 76l12-50 12 50z', '#FFCA28') + C(120, 22, 5, '#FFCA28', 2.5)
      + Array.from({ length: 34 }, (_, k) => { const t = [[78, 150, 84, 18], [92, 112, 56, 12], [102, 84, 36, 10], [64, 172, 112, 12]][k % 4]; return R(t[0] + ((k * 37) % t[2]), t[1] + ((k * 13) % t[3]), 6, 5, ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#8E24AA'][k % 5], 1, 0); }).join('')
      + face(120, 146, 0.4)),
  L('cabbagecrate', 'กะหล่ำปลีภูทับเบิก', 'Phu Thap Boek cabbages fresh from the field', ['cabbage', 'กะหล่ำปลี', 'phu thap boek', 'ภูทับเบิก', 'harvest', 'เก็บเกี่ยว', 'vegetable farm', 'ไร่ผัก', 'highland vegetables', 'ผักเมืองหนาว'], 'หากะหล่ำปลีลูกที่ยิ้มอยู่บนสุดของลัง', 'Find the smiling cabbage on top of the crate',
    // a wooden crate heaped with big round cabbages, the top one smiling, rows of cabbages on the slope behind
    bg('#E3F2FD') + low(120, '#AED581') + [136, 152].map((y, r) => Array.from({ length: 6 }, (_, k) => mcab(36 + k * 32 + r * 14, y, 0.8)).join('')).join('') + frame
      + R(44, 160, 152, 54, '#D7A86E', 4) + Lc('M44 178h152M44 196h152', '#A1887F', 3) + Lc('M60 160v54M120 160v54M180 160v54', '#A1887F', 3)
      + cab(76, 152, 0.9) + cab(164, 152, 0.9) + cab(120, 130, 1.25) + face(120, 132, 0.42)),
  L('hmongskirt', 'กระโปรงจีบชาวม้ง', 'A pleated Hmong skirt', ['hmong skirt', 'กระโปรงม้ง', 'pleated skirt', 'กระโปรงจีบ', 'batik', 'ผ้าเขียนเทียน', 'cross-stitch', 'ปักลาย', 'hmong village', 'หมู่บ้านม้ง', 'khek noi', 'เข็กน้อย'], 'หากระโปรงที่มีจีบเยอะๆ กับลายปักสีชมพู', 'Find the skirt with lots of pleats and pink stitching',
    // a wide pleated skirt hanging from a bamboo pole: a white top band, an indigo batik middle with little white crosses, a bright pink-and-green embroidered hem
    Lc('M24 44h192', '#C8A165', 8) + Lc('M40 30v28M200 30v28', '#8D6E63', 5) + R(76, 44, 88, 22, '#FFFFFF', 2)
      + P('M76 66h88l40 140H36z', '#283593') + Array.from({ length: 12 }, (_, k) => Lc(`M${82 + k * 7.5} 66l${-44 + k * 8} 140`, '#1A237E', 2)).join('')
      + Array.from({ length: 9 }, (_, k) => P(`M${(k > 4 ? 76 : 84) + (k % 5) * (k > 4 ? 26 : 18) - (k > 4 ? 0 : 0)} ${96 + (k > 4 ? 30 : 0)}h10M${(k > 4 ? 81 : 89) + (k % 5) * (k > 4 ? 26 : 18)} ${91 + (k > 4 ? 30 : 0)}v10`, 'none').replace('fill="none"', 'fill="none" stroke="#FFFFFF" stroke-width="3"')).join('')
      + P('M48 160h144l12 46H36z', '#EC407A') + Lc('M44 176h152', '#66BB6A', 5) + Lc('M40 192h160', '#FFEB3B', 4) + Array.from({ length: 8 }, (_, k) => P(`M${56 + k * 18} 168l5 5-5 5-5-5z`, '#FFFFFF', 0)).join('') + face(120, 52, 0.3)),
  L('hmonghouse', 'บ้านไม้ชาวม้ง', 'A Hmong wooden house on the hillside', ['hmong house', 'บ้านม้ง', 'wooden plank house', 'บ้านไม้กระดาน', 'grass roof', 'หลังคาหญ้าคา', 'hill village', 'หมู่บ้านบนดอย', 'khek noi', 'เข็กน้อย', 'mountain life', 'วิถีชาวดอย'], 'หาบ้านไม้หลังคาต่ำที่มีควันลอยจากหลังคา', 'Find the low wooden house with smoke curling from the roof',
    // a low house of upright wooden planks sitting right on the earth, a deep thatched roof sweeping almost to the ground, a wooden door, smoke from the ridge, cabbages by the wall
    bg('#E1F5FE') + low(170, '#A5D6A7') + frame + Lc('M150 60c-10-10 10-16 0-26s10-16 0-24', '#B0BEC5', 6)
      + R(56, 120, 128, 70, '#BC8F5F', 2) + Array.from({ length: 9 }, (_, k) => Lc(`M${70 + k * 13} 122v66`, '#8D6E63', 2.5)).join('') + R(106, 140, 28, 50, '#6D4C41', 2) + C(128, 166, 2.5, '#FFCA28', 0)
      + P('M36 132l84-62 84 62z', '#D4B26A') + Array.from({ length: 7 }, (_, k) => Lc(`M${56 + k * 22} 128l${(k - 3) * 4} -${18 + (k % 2) * 6}`, '#B08C48', 2.5)).join('') + face(120, 104, 0.4)
      + cab(42, 196, 0.5) + cab(198, 196, 0.5)),
  L('khaoklangnai', 'โบราณสถานเขาคลังในเมืองศรีเทพ', 'Khao Klang Nai, the old brick terrace of Si Thep', ['si thep', 'ศรีเทพ', 'khao klang nai', 'เขาคลังใน', 'ancient city', 'เมืองโบราณ', 'brick ruins', 'ซากอิฐ', 'world heritage', 'มรดกโลก', 'dvaravati', 'ทวารวดี'], 'หาบันไดที่ขึ้นไปบนลานอิฐขั้นๆ', 'Find the stairs climbing up the stepped brick terrace',
    // a wide stepped platform of red-brown bricks and laterite, a stair running up the middle, little rows of arches on each step, big shady trees and green lawn round it
    bg('#FFF3E0') + low(176, '#9CCC65') + frame + [[46, 92], [190, 86]].map(([x, y]) => Lc(`M${x} 176v-46`, '#6D4C41', 6) + C(x, y, 26, '#43A047') + C(x - 14, y + 10, 14, '#66BB6A')).join('')
      + R(40, 150, 160, 30, '#C1693F', 2) + R(56, 122, 128, 28, '#CD7B4F', 2) + R(74, 98, 92, 24, '#D9895A', 2)
      + Array.from({ length: 9 }, (_, k) => P(`M${48 + k * 17} 172v-10a5 5 0 0 1 10 0v10z`, '#8D3B1E', 2)).join('') + Array.from({ length: 6 }, (_, k) => P(`M${66 + k * 20} 144v-10a5 5 0 0 1 10 0v10z`, '#8D3B1E', 2)).join('')
      + R(108, 98, 24, 82, '#E8A27A', 2) + [110, 124, 138, 152, 166].map((y) => Lc(`M108 ${y}h24`, '#8D3B1E', 2)).join('') + face(140, 112, 0.34)),
  L('prangsongphinong', 'ปรางค์สองพี่น้อง เมืองศรีเทพ', 'The two brother towers of Si Thep', ['prang song phi nong', 'ปรางค์สองพี่น้อง', 'si thep', 'ศรีเทพ', 'twin towers', 'ปรางค์คู่', 'brick prang', 'ปรางค์อิฐ', 'historical park', 'อุทยานประวัติศาสตร์'], 'หาหอคอยอิฐสองหลังที่สูงไม่เท่ากัน', 'Find the two brick towers, one big and one little',
    // two round-topped brick towers standing side by side on a low base, the big brother tall and the little brother shorter, both with tiny smiles, grass and a white path
    bg('#E8F5E9') + low(170, '#AED581') + frame + P('M110 224l10-54 10 54z', '#FFF8E1', 0) + R(40, 160, 160, 16, '#B0715A', 2)
      + g(88, 160, 1, R(-28, -76, 56, 76, '#C1693F', 3) + P('M-26-76c0-40 12-58 26-58s26 18 26 58z', '#CD7B4F') + Lc('M-20-96h40M-16-112h32', '#8D3B1E', 3) + R(-10, -40, 20, 30, '#6D4C41', 8) + face(0, -60, 0.32))
      + g(160, 160, 0.72, R(-28, -76, 56, 76, '#C1693F', 3) + P('M-26-76c0-40 12-58 26-58s26 18 26 58z', '#CD7B4F') + Lc('M-20-96h40M-16-112h32', '#8D3B1E', 3) + R(-10, -40, 20, 30, '#6D4C41', 8) + face(0, -60, 0.4))),
  L('lanhintaek', 'ลานหินแตก ภูหินร่องกล้า', 'The cracked rock plain of Phu Hin Rong Kla', ['lan hin taek', 'ลานหินแตก', 'phu hin rong kla', 'ภูหินร่องกล้า', 'rock cracks', 'รอยแยกหิน', 'jumping', 'กระโดดข้าม', 'national park', 'อุทยานแห่งชาติ', 'moss', 'มอส'], 'หารอยแตกที่ยาวที่สุดในลานหิน', 'Find the longest crack in the rocky ground',
    // a flat grey rock plain broken into big slabs by deep zigzag cracks, green moss and little ferns in the cracks, a dashed hop arrow jumping over one crack
    bg('#E3F2FD') + low(80, '#B0BEC5') + frame + Lc('M16 80c60-6 140-6 208 0', '#66BB6A', 6)
      + P('M30 110l40 20-10 30 30 20-6 40M120 92l-6 34 34 22-10 34 26 34M180 96l12 40-20 26 30 28', 'none').replace('fill="none"', 'fill="none" stroke="#37474F" stroke-width="8"')
      + [[64, 136], [108, 176], [150, 160], [184, 192]].map(([x, y]) => E(x, y, 8, 4, '#7CB342', 2) + Lc(`M${x - 4} ${y - 2}l-4-8M${x + 4} ${y - 2}l4-8`, '#43A047', 2.5)).join('')
      + P('M70 120c14-30 50-30 60 0', 'none').replace('fill="none"', 'fill="none" stroke="#E53935" stroke-width="4" stroke-dasharray="7 6"') + P('M124 112l8 10-12 2z', '#E53935', 2) + face(80, 190, 0.34)),
  L('lanhinpum', 'ลานหินปุ่ม ภูหินร่องกล้า', 'The knobbly rock field of Lan Hin Pum', ['lan hin pum', 'ลานหินปุ่ม', 'phu hin rong kla', 'ภูหินร่องกล้า', 'knob rocks', 'หินปุ่ม', 'rock field', 'ลานหิน', 'viewpoint', 'จุดชมวิว', 'sandstone', 'หินทราย'], 'หาก้อนหินปุ่มที่ใหญ่ที่สุดซึ่งยิ้มอยู่', 'Find the biggest knobbly rock with a smile',
    // a sandstone plain covered in round knobs like a field of buns, tufts of grass between them, faraway hills and a pale sky
    bg('#FFF8E1') + P('M16 104c50-20 100-24 208-6v20H16z', '#90A4AE', 0) + low(110, '#D7CCC8') + frame
      + Array.from({ length: 16 }, (_, k) => { const r = Math.floor(k / 5), x = 36 + ((k % 5) * 42) + (r % 2) * 20, y = 132 + r * 26, s = 0.6 + r * 0.18; return E(x, y, 18 * s, 12 * s, '#BCAAA4', 3) + E(x - 4 * s, y - 4 * s, 6 * s, 3 * s, '#EFEBE9', 0); }).join('')
      + E(120, 196, 40, 26, '#BCAAA4', 3.5) + E(110, 186, 14, 6, '#EFEBE9', 0) + face(120, 196, 0.42)
      + [[60, 210], [190, 206], [160, 150]].map(([x, y]) => Lc(`M${x} ${y}l-4-10M${x} ${y}v-12M${x} ${y}l4-10`, '#7CB342', 3)).join('')),
  L('salaengluang', 'ทุ่งหญ้าสนสามใบ ทุ่งแสลงหลวง', 'The pine meadow of Thung Salaeng Luang', ['thung salaeng luang', 'ทุ่งแสลงหลวง', 'pine meadow', 'ทุ่งสน', 'savanna', 'ทุ่งหญ้า', 'nong mae na', 'หนองแม่นา', 'national park', 'อุทยานแห่งชาติ', 'golden grass', 'หญ้าสีทอง'], 'หาต้นสนต้นเดียวที่ยืนอยู่กลางทุ่งหญ้า', 'Find the one pine standing alone in the middle of the meadow',
    // a wide meadow of golden grass under a blue sky, tall pines along the far edge, one lone pine in the middle, a little blue pond with ripples
    bg('#B3E5FC') + low(120, '#F2C94C') + frame + [26, 48, 196, 214].map((x, k) => pine(x, 128, 0.7 + (k % 2) * 0.1)).join('') + pine(120, 160, 1.15)
      + E(80, 196, 34, 9, '#4FC3F7', 3) + Lc('M66 196h16M88 198h12', '#E1F5FE', 2.5)
      + Array.from({ length: 10 }, (_, k) => Lc(`M${30 + k * 20} ${180 + (k % 3) * 10}l-3-10M${30 + k * 20} ${180 + (k % 3) * 10}l3-12`, '#C8A23A', 2.5)).join('') + face(120, 132, 0.32)),
  L('fireback', 'ไก่ฟ้าพญาลอ', 'The Siamese fireback pheasant', ['siamese fireback', 'ไก่ฟ้าพญาลอ', 'pheasant', 'ไก่ฟ้า', 'national bird', 'นกประจำชาติ', 'forest bird', 'นกในป่า', 'red face', 'หน้าแดง', 'national park', 'อุทยานแห่งชาติ'], 'หาไก่ฟ้าหน้าแดงที่มีหงอนเป็นพู่', 'Find the bird with a red face and a feather tuft on its head',
    // a plump blue-grey pheasant with a bright red face patch, a black tufted crest, a long curved black tail, a maroon back patch and red legs, on leaf litter
    bg('#E8F5E9') + low(184, '#A1887F') + frame + P('M128 122c40-24 70-12 86 22-20-14-46-16-70-4z', '#263238') + P('M136 132c30-6 52 4 62 24-18-10-40-12-60-6z', '#37474F')
      + E(110, 138, 44, 34, '#90A4AE') + P('M118 118c10-6 22-2 26 8-8 4-18 4-26-8z', '#8D2E2E', 2.5) + Lc('M82 150c20 10 44 10 60 0', '#CFD8DC', 3)
      + C(78, 98, 20, '#90A4AE') + E(74, 98, 12, 10, '#E53935', 2.5) + P('M60 96l-12 4 12 4z', '#FFE0B2', 2.5) + P('M78 78c-4-14 4-24 10-22-2 6 2 14-4 22z', '#263238', 2.5) + C(76, 96, 2.8, INK, 0)
      + Lc('M100 170v20l-6 6M100 190l6 6M120 170v20l-6 6M120 190l6 6', '#E53935', 4) + face(116, 136, 0.34, 'none')),
  L('chimchum', 'จิ้มจุ่มหม้อดิน', 'Jim jum hot pot in a clay pot', ['jim jum', 'จิ้มจุ่ม', 'clay pot hot pot', 'หม้อดิน', 'isan hot pot', 'สุกี้อีสาน', 'herb broth', 'น้ำซุปสมุนไพร', 'chilly night', 'คืนหนาว', 'charcoal stove', 'เตาถ่าน'], 'หาหม้อดินที่มีควันลอยขึ้นมา', 'Find the clay pot with steam rising out of it',
    // a round brown clay pot steaming on a little charcoal stove with glowing coals, lemongrass and galangal sticking out, a plate of greens and a little bowl of dipping sauce beside
    bg('#FFF3E0') + Lc('M100 70c-10-12 10-18 0-30M130 66c-10-12 10-18 0-30', '#B0BEC5', 5)
      + P('M76 190l8-30h72l8 30z', '#9E9E9E') + Array.from({ length: 4 }, (_, k) => C(96 + k * 16, 168, 5, '#FF7043', 0)).join('') + R(70, 186, 100, 10, '#757575', 3)
      + P('M68 112c0 30 22 48 52 48s52-18 52-48z', '#8D5524') + E(120, 112, 52, 10, '#E6B47A') + Lc('M100 112l-8-30M112 110l4-32', '#9CCC65', 5) + R(126, 94, 14, 14, '#FFE0B2', 3, 2.5) + C(150, 106, 6, '#E53935', 2.5)
      + Lc('M64 112h-12M176 112h12', '#8D5524', 7) + face(120, 132, 0.4)
      + E(40, 200, 22, 8, '#FFFFFF', 3) + [30, 40, 50].map((x) => E(x, 194, 8, 5, '#66BB6A', 2)).join('') + E(204, 200, 14, 6, '#FFFFFF', 3) + E(204, 198, 9, 3, '#E64A19', 0)),
  L('viewdeck', 'ลานชมวิวไม้ยื่นผาภูทับเบิก', 'A wooden lookout deck over the valley', ['viewpoint', 'จุดชมวิว', 'wooden deck', 'ระเบียงไม้', 'phu thap boek', 'ภูทับเบิก', 'valley view', 'วิวหุบเขา', 'sunrise', 'พระอาทิตย์ขึ้น', 'photo spot', 'มุมถ่ายรูป'], 'หาระเบียงไม้ที่ยื่นออกไปเหนือหุบเขา', 'Find the wooden deck sticking out over the valley',
    // a plank deck with a railing jutting out from a grassy slope over layers of blue hills, a big orange sun rising, a little bench on the deck
    bg('#FFE0B2') + C(160, 92, 24, '#FFB74D', 0) + P('M16 120c50-20 120-26 208-6v20H16z', '#9FA8DA', 0) + P('M16 142c70-22 140-22 208 0v20H16z', '#7986CB', 0) + low(160, '#5C6BC0') + frame
      + P('M16 150c40 4 70 20 80 60v14H16z', '#7CB342', 3) + P('M70 168h120l-8 14H70z', '#C8A165') + Array.from({ length: 6 }, (_, k) => Lc(`M${84 + k * 18} 168l-2 14`, '#8D6E63', 2)).join('')
      + Lc('M80 182v40M110 182v40', '#8D6E63', 6) + Lc('M76 150h112M186 150v18M150 150v18M114 150v18', '#8D6E63', 5) + R(120, 154, 30, 6, '#A1887F', 2, 2.5) + Lc('M124 160v8M146 160v8', '#8D6E63', 3) + face(160, 92, 0.34)),
  L('sweetpotato', 'มันเผาร้อนๆ หน้าหนาว', 'Roasted sweet potatoes on a cold evening', ['roasted sweet potato', 'มันเผา', 'sweet potato', 'มันหวาน', 'street snack', 'ของกินข้างทาง', 'charcoal roast', 'เผาถ่าน', 'cold weather', 'หน้าหนาว', 'warm snack', 'ของกินอุ่นๆ'], 'หามันเผาที่ผ่าครึ่งเห็นเนื้อสีส้ม', 'Find the sweet potato split open to show its orange inside',
    // a round tin drum roaster with glowing coals inside a little door, purple sweet potatoes on the rack on top, one broken open with steaming orange flesh in front
    bg('#E8EAF6') + Lc('M150 60c-10-12 10-18 0-30M170 64c-10-12 10-18 0-30', '#B0BEC5', 5)
      + R(70, 110, 100, 90, '#78909C', 6) + E(120, 110, 50, 10, '#90A4AE') + R(100, 152, 40, 28, '#37474F', 4, 3) + [108, 120, 132].map((x) => C(x, 168, 5, '#FF7043', 0)).join('') + Lc('M80 200v14M160 200v14', '#546E7A', 6)
      + [[90, 102, -10], [118, 98, 6], [148, 102, -4]].map(([x, y, r]) => g(x, y, 1, E(0, 0, 18, 9, '#7B1FA2'), r)).join('')
      + g(160, 182, 1, P('M-34 0c4-16 30-18 34-6 4-12 30-10 34 6-12 14-56 14-68 0z', '#7B1FA2') + E(-16, -6, 13, 7, '#FF9800', 2.5) + E(16, -6, 13, 7, '#FF9800', 2.5)) + face(120, 132, 0.36)),
  L('fakmaeo', 'ผัดยอดฟักแม้ว', 'Stir-fried chayote shoots', ['chayote shoots', 'ยอดฟักแม้ว', 'stir-fried greens', 'ผัดผัก', 'chayote', 'ฟักแม้ว', 'highland vegetable', 'ผักเมืองหนาว', 'garlic', 'กระเทียม', 'local dish', 'อาหารท้องถิ่น'], 'หาเถาฟักแม้วที่มีมือเกาะม้วนเป็นสปริง', 'Find the vine with curly tendrils like little springs',
    // a white plate of glossy green shoots with garlic bits, above it a climbing chayote vine with curly tendrils, wide leaves and one pale green pear-shaped chayote
    bg('#F1F8E9') + Lc('M30 40c40 10 80 0 120 10s50 0 60-6', '#558B2F', 5) + [[60, 46], [130, 50], [190, 40]].map(([x, y]) => P(`M${x} ${y}c-14 4-18 20-6 26 6-4 10-8 6-26z`, '#7CB342', 3)).join('')
      + Lc('M90 46c0 10 10 10 8 18s-10 6-6 14M160 50c0 10 10 10 8 18s-10 6-6 14', '#7CB342', 3) + g(110, 80, 1, P('M0-20c12 0 16 14 16 26 0 14-8 20-16 20s-16-6-16-20c0-12 4-26 16-26z', '#C5E1A5') + Lc('M0-16v34M-8-10v24M8-10v24', '#9CCC65', 2) + face(0, 4, 0.28))
      + E(120, 172, 90, 32, '#FFFFFF') + E(120, 168, 70, 20, '#ECEFF1', 0)
      + Array.from({ length: 12 }, (_, k) => Lc(`M${66 + k * 9} ${162 + (k % 3) * 5}c8-6 16-4 22 4`, k % 2 ? '#43A047' : '#689F38', 5)).join('') + [[80, 170], [104, 160], [140, 166], [160, 174]].map(([x, y]) => C(x, y, 3, '#FFF59D', 1.5)).join('')),
  L('passionfruit', 'เสาวรสผ่าครึ่ง', 'A passion fruit cut in half', ['passion fruit', 'เสาวรส', 'royal project fruit', 'ผลไม้โครงการหลวง', 'sour juice', 'น้ำเสาวรส', 'passion flower', 'ดอกเสาวรส', 'vine', 'เถาไม้เลื้อย', 'highland farm', 'ไร่บนดอย'], 'หาดอกไม้สีม่วงขาวที่มีเส้นเหมือนพู่', 'Find the purple-and-white flower with a fringe like threads',
    // a round purple passion fruit cut open to show yellow pulp full of black seeds, its other half smiling, a frilly purple-and-white passion flower and a leaf above
    bg('#F3E5F5') + Lc('M24 60c40-14 80-10 110 6', '#558B2F', 4) + P('M50 52c-10 10-6 26 8 28 4-10 2-20-8-28z', '#7CB342', 3)
      + g(170, 66, 1, C(0, 0, 22, '#FFFFFF') + Array.from({ length: 16 }, (_, k) => Lc(`M${(Math.cos(k / 16 * 6.283) * 10).toFixed(1)} ${(Math.sin(k / 16 * 6.283) * 10).toFixed(1)}L${(Math.cos(k / 16 * 6.283) * 20).toFixed(1)} ${(Math.sin(k / 16 * 6.283) * 20).toFixed(1)}`, '#7E57C2', 2.5)).join('') + C(0, 0, 7, '#C5E1A5', 2.5))
      + C(84, 160, 46, '#6A1B9A') + C(84, 160, 38, '#FFF9C4', 3) + C(84, 160, 30, '#FBC02D', 0) + Array.from({ length: 14 }, (_, k) => E(64 + (k * 13) % 40, 142 + (k * 7) % 36, 2.5, 3.5, INK, 0)).join('')
      + C(166, 176, 40, '#7B1FA2') + E(152, 160, 10, 6, '#AB47BC', 0) + face(166, 178, 0.42)),
  L('woollyhat', 'หมวกไหมพรมกับผ้าพันคอบนยอดดอย', 'A woolly bobble hat and scarf for the chilly top', ['woolly hat', 'หมวกไหมพรม', 'scarf', 'ผ้าพันคอ', 'cold season', 'หน้าหนาว', 'chilly morning', 'เช้าที่หนาวเย็น', 'warm clothes', 'เสื้อกันหนาว', 'mountain top', 'ยอดดอย'], 'หาหมวกที่มีปุยกลมๆ อยู่บนหัว', 'Find the hat with a round pompom on top',
    // a striped knitted bobble hat and a long striped scarf with fringes draped over a wooden fence post, frosty breath clouds and a cold blue morning behind
    bg('#E1F5FE') + low(176, '#A5D6A7') + frame + [[50, 70], [190, 90]].map(([x, y]) => E(x, y, 20, 8, '#FFFFFF', 0)).join('')
      + R(100, 118, 40, 100, '#A1887F', 3) + Lc('M30 150h180M30 182h180', '#BCAAA4', 7)
      + P('M80 132c30 10 50 10 80 0l6 26c-30 10-62 10-92 0z', '#E53935') + Lc('M80 142c30 10 50 10 82 0', '#FFFFFF', 4) + P('M150 140l10 70-20 2-6-64z', '#E53935') + Lc('M146 176l14-2M144 196l16-2', '#FFFFFF', 4) + Lc('M142 212v8M150 212v8M158 210v8', '#E53935', 3)
      + P('M90 116c0-30 14-46 30-46s30 16 30 46z', '#1E88E5') + Lc('M92 104h56M96 90h48', '#FFFFFF', 5) + R(86, 108, 68, 12, '#FFCA28', 5) + C(120, 64, 12, '#FFFFFF') + face(120, 96, 0.34)),
  L('ginger', 'ขิงเพชรบูรณ์', 'Fresh Phetchabun ginger roots', ['ginger', 'ขิง', 'ginger root', 'เหง้าขิง', 'phetchabun', 'เพชรบูรณ์', 'ginger farm', 'ไร่ขิง', 'warm drink', 'น้ำขิง', 'hill farm', 'ไร่บนเขา'], 'หาเหง้าขิงที่มีแขนขาเป็นปุ่มๆ', 'Find the knobbly ginger root with little arms and legs',
    // a heap of knobbly pale-yellow ginger roots with pink tips, the biggest one smiling, tall thin green leafy stalks growing from the soil behind, a cup of warm ginger drink steaming
    bg('#FFFDE7') + low(170, '#BCAAA4') + frame + Array.from({ length: 6 }, (_, k) => Lc(`M${40 + k * 12} 170l${-6 + k * 3}-${90 - (k % 2) * 20}`, '#7CB342', 4) + P(`M${36 + k * 12 + (-6 + k * 3) * 0.6} ${120 - (k % 2) * 14}c-10-6-12-16-6-24 6 6 8 14 6 24z`, '#9CCC65', 2.5)).join('')
      + g(130, 170, 1, P('M-60 10c-6-16 10-24 22-18 2-14 20-16 26-4 10-12 30-8 30 6 14-6 28 6 20 20-6 12-24 12-34 8-16 8-40 8-50 2-12 0-18-6-14-14z', '#F4D58D') + [[-50, 4], [-26, -10], [8, -12], [42, 4]].map(([x, y]) => C(x, y, 4, '#F48FB1', 0)).join('') + face(-6, 14, 0.36))
      + R(176, 120, 30, 34, '#FFFFFF', 4) + R(180, 126, 22, 10, '#FFD54F', 0, 0) + P('M206 128c10 0 10 16 0 16', 'none') + Lc('M186 112c-6-8 6-12 0-20M198 112c-6-8 6-12 0-20', '#B0BEC5', 3)),
];

export default {
  places: {
    'th-khaokho': { country: 'th', wave: 3, home: true, name: nm('เขาค้อและภูทับเบิก', 'Khao Kho and Phu Thap Boek'), tz: 'Asia/Bangkok', ll: [16.65, 101.0], alias: ['khao kho', 'เขาค้อ', 'phu thap boek', 'ภูทับเบิก', 'phetchabun', 'เพชรบูรณ์', 'PHY', 'si thep', 'ศรีเทพ', 'phu hin rong kla', 'ภูหินร่องกล้า', 'thung salaeng luang', 'ทุ่งแสลงหลวง'], colors: KK },
  },
  items,
};
