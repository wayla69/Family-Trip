'use strict';
// CI check "migrations-journaled": every migration file is in journal.json, numbered without gaps or duplicates.
const { readJournal } = require('../server/migrate');
try {
  const list = readJournal();
  console.log(`migrations-journaled: ok (${list.length} migration${list.length === 1 ? '' : 's'}, latest ${list[list.length - 1].file})`);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
