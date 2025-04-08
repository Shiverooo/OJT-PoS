const express = require('express');
const db = require('better-sqlite3')('./database/database.db', {verbose: console.log});
const app = express();
const cors = require('cors');
const port = 5000;
const users = db.prepare('select * from users').all();
const corsOption = 'http://localhost:3000';

app.use(cors(corsOption));
app.use(express.json());

app.get('/', (req,res)=>{
    res.json({users:users})
})

app.get('/user', (req,res) =>{
    // res.send(users);
    res.json({users:users})
})

app.listen(port, ()=>{
    console.log(`Viewing at port ${port}`);
})