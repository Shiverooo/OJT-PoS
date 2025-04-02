import Database from 'better-sqlite3';

const db = new Database('./database.db', {verbose: console.log});
db.pragma('journal_mode = WAL');

const stmt = db.prepare('select * from users');
const display = stmt.run()
console.log(displaycd );

