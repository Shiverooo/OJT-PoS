const express = require('express');
const router = express.Router();
const db = require('../models/sqliteModel.js');
const userController = require('../controllers/userController.js');

router.get('/',(req, res, next) =>{
    try{
        db.prepare(`
            create table if not exists users(
                id integer primary key autoincrement,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone_number VARCHAR(20),
                username text not null unique,
                password_hash TEXT NOT NULL,
                role text check(role in ('admin', 'cashier')) not null default 'cashier',
                created_at datetime default current_timestamp
            )    
        `).run();
        res.redirect('/users/req-data')
    }catch{
        //  res.redirect('users/hash-password')
        res.redirect('/users/req-data')
    }
})

router.post('/auth/login', userController.authLogin);

router.post('/create-users', userController.createUsers);
    
router.get('/req-data', userController.reqData);

module.exports = router;