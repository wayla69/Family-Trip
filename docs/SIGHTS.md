# The library of things to do — the built-in list

Phase E2 of `docs/PLACES-ECOSYSTEM.md`. Code: `server/sightlib.js`, table `sight_lib`, files `server/sights/<cc>-<n>.json`,
lint `npm run sights:lint`.

**Owner's rule (19 Nov 2026): every built-in sight is checked on the web before it enters the library.** A row ships only with `ok`
(the month a search confirmed it is open and what it costs) and `src` (the page that showed it). Nothing from memory alone.

## File format

```json
{
  "cc": "jp",
  "towns": [
    {
      "place": "jp-tokyo",
      "sights": [
        {
          "name": { "en": "Ueno Zoo", "th": "สวนสัตว์อุเอโนะ" },
          "local": "恩賜上野動物園",
          "kind": "zoo",
          "area": { "en": "Ueno", "th": "อุเอโนะ" },
          "what": { "en": "Japan's oldest zoo: giant pandas, gorillas and a monorail-free walk between two halves", "th": "สวนสัตว์ที่เก่าที่สุดของญี่ปุ่น มีแพนด้ายักษ์และกอริลลา" },
          "why": { "en": "Flat paths, shade and many benches; the pandas come first for small children", "th": "ทางเรียบ มีร่มและม้านั่งเยอะ เด็กเล็กชอบดูแพนด้า" },
          "tip": { "en": "Go at opening time for the panda queue; closed on Mondays", "th": "ไปตอนเปิดเพื่อเลี่ยงคิวแพนด้า ปิดวันจันทร์" },
          "ages": [2, 2, 2, 1],
          "hrs": 3,
          "io": "out",
          "pram": "yes",
          "price": { "en": "≈ ¥600 adults · under 12 free", "th": "≈ ¥600 ผู้ใหญ่ · เด็กต่ำกว่า 12 ปีฟรี" },
          "book": "none",
          "q": "Ueno Zoo, Taito City, Tokyo",
          "ok": "2026-11",
          "src": "https://www.tokyo-zoo.net/english/ueno/"
        }
      ]
    }
  ]
}
```

| Field | Rule |
|---|---|
| `place` | a city id of `public/stock/index.json` (`jp-tokyo`, `p-orlando`, …) |
| `name` | `{en, th}`; Thai transliterated, never translated word by word (docs/STYLE.md) |
| `local` | optional: the name in the local script, as on the sign |
| `kind` | one of `themepark zoo aquarium museumkid museum park play beach nature views culture oldtown market show farm onsen ride shop` |
| `area` | `{en, th}`: district or neighbourhood |
| `what` / `why` / `tip` | `{en, th}`, one sentence each, ≤ 220 letters; `why` = why it suits small children (or what to know if it suits them less) |
| `ages` | four numbers for ages 0–2, 3–5, 6–9, 10+: `0` not for them · `1` fine · `2` great |
| `hrs` | how long a family usually stays, in hours (0.5 – 10) |
| `io` | `in` · `out` · `both` (a rain plan needs `in` or `both`) |
| `pram` | `yes` (step-free) · `part` · `no` |
| `price` | `{en, th}` with `≈`, local currency, adult · child · free under N; `"Free"` / `"ฟรี"` when free |
| `book` | `none` · `rec` (recommended) · `req` (required / timed tickets) |
| `q` | a map query: name, district, city |
| `ok` | `YYYY-MM`: the month the web check confirmed it trading and its price |
| `src` | `https://…`: the page that confirmed it (the official site first, else the tourism office, else a dated 2025–2026 listing) |

Prices and hours change; the card still says "check before you go". British spelling in English, no ค่ะ/ครับ in Thai, `เช็ก`.

## What a city should hold

15–20 sights a city, mixed kinds, chosen for a family with children 1–8:
- the city's big ones;
- at least three that are indoors or both, for a rain plan;
- at least two free ones;
- a playground or park, and a food market or street.

A small or remote town where an honest web check finds fewer than 15 places it can confirm (a current page showing it open and its
price) carries `"thin": true` on the town: it needs 4 or more and the rainy-day rule does not apply. Never pad a town to reach 15.

Left out: anything closed, under renovation for the coming year, adults-only or with no web page newer than 2025. Also left out: casinos,
nightlife, and religious sites that ask visitors to keep away.

## Passes

- **Nov 2026, E2:** 29 towns, 459 sights (Japan, Korea, Taiwan, Hong Kong, Macau, Singapore, Thailand, Vietnam, Malaysia, Indonesia, Australia, New Zealand, Switzerland, Paris, London).
- **19 Nov 2026, E6:** 8 more towns, 128 sights — Okinawa 16, Jeju 15, Ho Chi Minh City 15, Phu Quoc 16, Penang 16, Koh Samui 16, Dubai 17, Shanghai 16 (37 towns, 587 sights). Every row was confirmed by a web search that session, but the official sites themselves could not be opened from the session's network, so most `src` are dated 2025–2026 guides, tourism offices or news pages the search showed. Weakest prices, kept with "≈" and a "check" note: Eco Land (Jeju, sources ₩14,000–21,000), Aqua Planet Jeju (online prices lower), Dubai Safari Park (new season's price not out), the Shanghai Science and Technology and Natural History museums (adult price on the booking page only), ESCAPE Penang, Paradise Park Farm (Samui). Left out for want of a current, dated source: Nago Pineapple Park, Bios no Oka, JUNGLIA, Ryukyu Mura (Okinawa); Teddy Bear Museum, Camellia Hill (Jeju); VinWonders Grand Park, tiNiWorld, Saigon Skydeck, the city museums (Ho Chi Minh City); Tropical Spice Garden (Penang); Coco Splash, the Samui Aquarium, Butterfly Hill (closed), Secret Buddha Garden (Samui); Haichang Ocean Park (Shanghai). The twice-yearly re-check (1 January, 1 July) now covers this list too.
