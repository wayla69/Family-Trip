# tools/

`export_trip.py` — reference copy of the script used to export a trip from the Claude-built trip guide into `server/trips/<id>.json` plus day art SVGs in `public/art/`. It imports `build_app` from the separate trip kit (`The_Big_Hop_trip_document_kit.zip`), so it only runs there, not in this repo. For new trips either edit the JSON by hand (see `server/trips/harbourhop2026.json` for the schema) or create the trip inside the app.
