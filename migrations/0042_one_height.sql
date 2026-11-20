-- One kids' passport per child (owner, Nov 2026: "อยากให้ทำแล้วจบในที่เดียวเลย อย่าซ้ำซ้อนหลายที่"): a child's height was typed in two
-- places — the passport's Explorer ID (`<trip>.field.height_first|height_last.<kid>`) and the old "Growing up" page
-- (`<trip>.field.height.<kid>`), and the two never met. The passport is now the one place: each old "Growing up" height moves into the
-- Explorer ID of that book — the last day's box when it is empty, else the first day's when that is empty; when both are filled the
-- passport keeps its own. A moved row is removed; one the passport already covers stays (never read again, nothing lost).
WITH old AS (
  SELECT o.*,
    NOT EXISTS (SELECT 1 FROM entries x WHERE x.id = o.trip_id || '.field.height_last.' || o.child) AS last_free,
    NOT EXISTS (SELECT 1 FROM entries x WHERE x.id = o.trip_id || '.field.height_first.' || o.child) AS first_free
  FROM entries o
  WHERE o.kind = 'field' AND o.first_key = 'height' AND o.child IS NOT NULL AND o.text <> ''
    AND o.id = o.trip_id || '.field.height.' || o.child
), moved AS (
  INSERT INTO entries (id, family_id, trip_id, day_index, kind, child, text, first_key, occurred_at, created_by, created_uid, created_at, updated_at)
  SELECT o.trip_id || '.field.' || (CASE WHEN o.last_free THEN 'height_last' ELSE 'height_first' END) || '.' || o.child,
    o.family_id, o.trip_id, NULL, 'field', o.child, o.text, CASE WHEN o.last_free THEN 'height_last' ELSE 'height_first' END,
    o.occurred_at, o.created_by, o.created_uid, o.created_at, now()
  FROM old o WHERE o.last_free OR o.first_free
  ON CONFLICT (id) DO NOTHING
  RETURNING trip_id, child
)
DELETE FROM entries e USING moved m
WHERE e.id = m.trip_id || '.field.height.' || m.child;
