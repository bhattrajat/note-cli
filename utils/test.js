import fs from 'fs';

const DB_PATH = new URL('../db.sqlite', import.meta.url);

console.log(DB_PATH);
console.log(fs.existsSync(DB_PATH));
