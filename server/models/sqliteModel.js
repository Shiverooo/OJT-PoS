const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbDir = path.join(__dirname,'../database')

if(!fs .existsSync(dbDir)){
    fs.mkdirSync(dbDir);
}
const db = new Database(path.join(dbDir,'database.db'), {verbose: console.log});
db.pragma('journal_mode = WAL');

console.log("Database initialized");

module.exports = db;


