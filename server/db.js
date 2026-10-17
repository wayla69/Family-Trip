'use strict';
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DATA_DIR = path.resolve(process.env.DATA_DIR || './data');
for (const d of ['', 'photos', 'thumbs']) fs.mkdirSync(path.join(DATA_DIR, d), { recursive: true });

const db = new Database(path.join(DATA_DIR, 'memory.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS kids (
  id TEXT PRIMARY KEY, th TEXT NOT NULL, en TEXT NOT NULL, color TEXT NOT NULL, emoji TEXT NOT NULL, birth TEXT, pos INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS trips_extra (id TEXT PRIMARY KEY, json TEXT NOT NULL, at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS memories (
  id TEXT PRIMARY KEY, trip TEXT NOT NULL, day INTEGER NOT NULL DEFAULT 0,
  kids TEXT NOT NULL DEFAULT '[]', mood TEXT NOT NULL DEFAULT '{}', text TEXT NOT NULL DEFAULT '',
  stop TEXT, at INTEGER NOT NULL, by TEXT NOT NULL DEFAULT '', uid TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS memories_trip ON memories(trip, day, at);
CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY, mem TEXT NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  w INTEGER NOT NULL, h INTEGER NOT NULL, at INTEGER NOT NULL, pos INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS photos_mem ON photos(mem);
CREATE TABLE IF NOT EXISTS checkins (
  trip TEXT NOT NULL, key TEXT NOT NULL, day INTEGER NOT NULL DEFAULT 0, kind TEXT NOT NULL DEFAULT 'place',
  name TEXT NOT NULL DEFAULT '', at INTEGER NOT NULL, by TEXT NOT NULL DEFAULT '', PRIMARY KEY (trip, key)
);
CREATE TABLE IF NOT EXISTS stories (
  trip TEXT NOT NULL, day INTEGER NOT NULL, lang TEXT NOT NULL, text TEXT NOT NULL, at INTEGER NOT NULL,
  PRIMARY KEY (trip, day, lang)
);
CREATE TABLE IF NOT EXISTS tripkid (
  trip TEXT NOT NULL, kid TEXT NOT NULL, age TEXT NOT NULL DEFAULT '', height TEXT NOT NULL DEFAULT '',
  fav TEXT NOT NULL DEFAULT '', note TEXT NOT NULL DEFAULT '', PRIMARY KEY (trip, kid)
);
CREATE TABLE IF NOT EXISTS letters (
  id TEXT PRIMARY KEY, to_kid TEXT NOT NULL, title TEXT NOT NULL DEFAULT '', text TEXT NOT NULL,
  open_at TEXT NOT NULL, at INTEGER NOT NULL, by TEXT NOT NULL DEFAULT '', uid TEXT NOT NULL DEFAULT ''
);
`);

const seed = db.prepare('INSERT OR IGNORE INTO kids (id, th, en, color, emoji, birth, pos) VALUES (?,?,?,?,?,?,?)');
seed.run('mimi', 'มีมี่', 'Mimi', '#FF5C9E', '👧', null, 0);
seed.run('mika', 'มีก้า', 'Mika', '#FFA41F', '👶', null, 1);

module.exports = { db, DATA_DIR };
