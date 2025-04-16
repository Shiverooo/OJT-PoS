const express = require('express');
const router = express.Router();
const db = require('../models/sqliteModel.js');

router.get('/',(req, res) =>{
    try{
        const users = db.prepare('select * from users').pluck();
        res.json({users:users});   
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to fetch users'})
    }
})

module.exports = router;