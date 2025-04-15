const express = require('express');
// const db = require('better-sqlite3')('./database/database.db', {verbose: console.log});
const db = require('./database/init-sqlite.js');
const app = express();
const loadMiddleware = require('./middleware/middleware.js');
// const port = 5000;
// const users = db.prepare('select * from users').all();
// const corsOption = 'http://localhost:3000';

loadMiddleware(app);

app.use(express.json());

app.get('/', (req,res)=>{
    res.redirect('/users')
})

app.get('/users', (req,res)=>{
    try{
        const users = db.prepare('select * from users').all();
        res.json({users:users});
    } catch(err){
        console.err(err);
        res.status(500).json({error:'Failed to fetch users'});
    }
})


module.exports = app;