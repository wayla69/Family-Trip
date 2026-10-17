"""Export the trip definition (days, colours, stops, day art) for the Memory Book web app."""
import json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
import build_app as B, dayart

OUT = Path("/home/claude/memory-book")
en = B.lang_data(B.E, True)
th = B.lang_data(B.TH, False)
kd = B.kids()
days = []
for i, (de, dt) in enumerate(zip(en["days"], th["days"])):
    n = de["n"]
    le = next((x for x in en["learn"] if x["n"] == n), {"places": []})
    lt = next((x for x in th["learn"] if x["n"] == n), {"places": []})
    stops = []
    for pe, pt in zip(le["places"], lt["places"]):
        stops.append({"key": pe["key"], "kind": "place", "en": pe["name"], "th": pt["name"]})
    for pe, pt in zip(de.get("picks", []), dt.get("picks", [])):
        stops.append({"key": pe["key"], "kind": "food", "en": pe["name"], "th": pt["name"], "meal": pe["meal"]})
    k = kd[i]
    days.append({"n": n, "date": {"en": de["date"], "th": dt["date"]}, "title": {"en": de["title"], "th": dt["title"]},
                 "wx": {"en": de.get("wx", ""), "th": dt.get("wx", "")}, "sleep": {"en": de.get("sleep", ""), "th": dt.get("sleep", "")},
                 "acc": k["acc"], "tint": k["tint"], "a2": k["a2"], "t2": k["t2"], "emo": k["emo"], "stops": stops})
    svg = dayart.ART[n]
    if "xmlns" not in svg:
        svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"', 1)
    (OUT / "public/art" / f"day-{n}.svg").write_text(svg, encoding="utf-8")
trip = {"id": "bighop2027", "title": {"en": "The Big Hop", "th": "The Big Hop"},
        "sub": {"en": "NSW road trip", "th": "ทริปขับรถ NSW"}, "start": "2027-04-02", "end": "2027-04-17",
        "place": "NSW, Australia", "days": days}
(OUT / "server/trips/bighop2027.json").write_text(json.dumps(trip, ensure_ascii=False, indent=1), encoding="utf-8")
print(len(days), "days;", sum(len(d["stops"]) for d in days), "stops")
