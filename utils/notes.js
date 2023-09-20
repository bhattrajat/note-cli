import {
  addRow,
  createDbConnection,
  deleteRow,
  filterRows,
  printRows,
} from './db.js';

export function addNote(content) {
  try {
    const db = createDbConnection();
    addRow(db, content);
    console.log('note added successfully');
    db.close();
  } catch (error) {
    console.log(error);
  }
}

export function listNotes(content) {
  try {
    const db = createDbConnection();
    printRows(db);
    db.close();
  } catch (error) {
    console.log(error);
  }
}

export function filterNotes(term) {
  try {
    const db = createDbConnection();
    filterRows(db, `%${term}%`);
    db.close();
  } catch (error) {
    console.log(error);
  }
}

export function deleteNote(id) {
  try {
    const db = createDbConnection();
    deleteRow(db, id);
    db.close();
  } catch (error) {
    console.log(error);
  }
}
