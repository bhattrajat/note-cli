import sqlite3 from 'sqlite3';
import fs from 'fs';

const DB_PATH = new URL('../db.sqlite', import.meta.url);

export function createDbConnection() {
  if (fs.existsSync(DB_PATH)) {
    return new sqlite3.Database(DB_PATH.pathname);
  } else {
    const db = new sqlite3.Database(DB_PATH.pathname, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log('Connection with SQLite has been established');
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE notes
  (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    content VARCHAR(50) NOT NULL
  );
`);
}

export function addRow(db, content) {
  db.run(
    `
    INSERT INTO notes (content) VALUES (?)
  `,
    [content]
  );
}

export function printRows(db) {
  db.each('SELECT rowid AS id, content FROM notes', (err, row) => {
    console.log(row.id + ': ' + row.content);
  });
}

export function filterRows(db, term) {
  db.each(
    'SELECT rowid AS id, content FROM notes WHERE content LIKE ?',
    [term],
    (err, row) => {
      console.log(row.id + ': ' + row.content);
    }
  );
}

export function deleteRow(db, id) {
  db.run(`DELETE FROM notes WHERE id=?`, [id]);
}
