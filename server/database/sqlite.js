const sqlite = () =>{
    const db = require('better-sqlite3')('./database.db', {verbose: console.log});

    db.pragma('journal_mode = WAL');

    const stmt = db.prepare('select * from users');
    const display = stmt.all();
    console.log(display);
}
module.exports = {sqlite};


