# A rough budget for a trip (plan, Nov 2026)

Owner: "แล้วถ้าอยากให้มีการบอก budget คร่าวๆแทนทำได้ไหมครับ" → "วางแผนเพื่อทำเลยครับ". Instead of booking inside the app (Trip.com —
answered only, not built), the planner says roughly what the trip will cost, by kind, before the family says yes.

## Rules

- **A range, never one number.** Every line is "≈ lo–hi" in the money it is paid in (yen for Tokyo, euros for Paris); never converted
  by the server. The phone adds "≈ ฿" only with the rate the parents typed (`ls('fx')`, the spend page's rate box) — no rate, no baht.
- **Each line says where it came from**: "from the app's library" (tickets, food: prices that a web check saw) or "the helper's
  estimate" (stays, getting around, flights). A line we cannot work out says so ("ราคาบางที่ต้องเช็กเอง n แห่ง") — never a guessed zero.
- **The children count by age**: a sight's own "under N free" and child price; food: under 2 eats nothing on the bill, 2–11 half a
  portion; the budget answer (careful / middle / comfortable) picks the low end, the middle or the high end of each range.
- Nothing leaves the server that did not already: the helper is asked for three more numbers in the same route call (no extra call);
  the library prices are read on the server.

## B1 — the card on the planner (this PR)

`server/budget.js` `estimate({route, answers, kids, sightById, eatsForTown, ccOf})` →
`{lines: [{k, lo, hi, cur, src, n?, unknown?}], totals: [{cur, lo, hi}]}`, kinds:

| k | from | how |
| --- | --- | --- |
| `tickets` | the route's library stops (`lib` id → `sight_lib` price text) | adults × adult price + each child by age (`priceOf`: pieces split on " · ", "Free", "under N free", a child / reduced / ages price, a range lo–hi); "Check the price" counts as unknown |
| `food` | the eat library of each day's town (`EATLIB.forTown`) | per day: breakfast = cafés' middle, lunch = quick bites' middle, dinner = restaurants' middle (per person, `pr` "≈ ¥1,800–2,800"), × adults + children by age; a town with no prices → unknown |
| `stay` | the helper (`money.stay` = a night for the family, in the local money) | × nights (days − 1) |
| `move` | the helper (`money.move` = getting around the whole trip, local money, no flights) | as given |
| `flights` | the helper (`money.flights` = return flights from Thailand for the family, in THB) | as given; skipped when the family typed flights as booked |

The route call asks for `"money":{"cur":"ISO","stay":[lo,hi],"move":[lo,hi],"flights":[lo,hi]}` (planner.js `ROUTE_USER`), cleaned by
`cleanMoney` (numbers only, lo ≤ hi, a 3-letter currency); the route answer carries `budget` (worked out again on every answer: a route
edited by hand, a change asked in words, a saved plan read back). The page: the "💰" tile becomes a card `.plbudget` — a row a kind with
its picture, the range, where it came from, the total per currency and "≈ ฿" when a rate is typed; a quiet line "rough, for planning —
prices change" and one to the spend page's rate box when there is no rate.

## B2 — learn from what we really spent (next)

The `spend` table already holds each trip's real spending by category and currency. For a country the family has been to, the card
shows "last time in Japan: ≈ ¥x a day on food" beside the estimate (per day, per person), and the estimate leans towards it. Editors
only (the spend ledger never reaches a relative).

## B3 — the budget travels with the book (later)

The draft keeps the estimate (`theme.budget`); the spend page shows "spent so far / planned" by kind as bars, and Today a one-line
"today ≈ … of a planned ≈ …". Nothing is shown to relatives.
