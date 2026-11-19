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

Left out: anything closed, under renovation for the coming year, adults-only or with no web page newer than 2025. Also left out: casinos,
nightlife, and religious sites that ask visitors to keep away.
