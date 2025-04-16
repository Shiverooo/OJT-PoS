const express = require('express');
const router = express.Router();
const db = require('../models/sqliteModel.js');

router.get('/',(req, res, next) =>{
    try{
        const users = db.prepare(`
            create table if not exists users(
                id integer primary key autoincrement,
                username text not null unique,
                password text not null,
                role text check(role in ('admin', 'cashier')) not null default 'cashier'
                created_at datetime default current_timestamp
            )    
        `);
    }catch{
         res.redirect('/users/req.data')
    }
})

router.get('/req.data',(req,res)=>{
    try{
        const users = db.prepare('select * from users').all();
        res.json({users:users});   
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to fetch users'})
    }   
})

module.exports = router;