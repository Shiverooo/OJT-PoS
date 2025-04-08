const express = require('express');
const db = require('better-sqlite3')('./database/database.db', {verbose: console.log});
const app = express();
const port = 5000;
const users = db.prepare('select * from users').all();

app.get('/', (req,res)=>{
    res.json({users:users})
})

app.get('/user', (req,res) =>{
    res.send(users);
})

app.listen(port, ()=>{
    console.log(`Viewing at port ${port}`);
})