const db = require('better-sqlite3')('./database/database.db', { verbose: console.log });
// const db = new Database('./database/database.db', { verbose: console.log });
db.pragma('journal_mode = WAL');
// const users = db.prepare('select * from users').all();
console.log("Database initialized");

module.exports = db;


