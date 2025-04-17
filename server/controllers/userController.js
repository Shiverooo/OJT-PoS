const db = require('../models/sqliteModel.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;


exports.authLogin = (req, res) =>{
   const {email, password} = req.body;
   const user = db.prepare('select id, email, password_hash, role from users where email = ? and password_hash = ?').get(email, password);
   if(!user) return res.status(404).json({message:'User not found'});
   
   const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
   }, 
   SECRET_KEY,{expiresIn:'1h'})
   
   res.status(200).json({ message: 'Login successful', user });
}

exports.reqData = (req,res)=>{
   try{ 
       const users = db.prepare(`select
           fullname,
           email,
           contact,
           dateAdded
           from users`
       ).all();
       res.json({users});   
   }catch(err){
       console.error(err);
       res.status(500).json({error: 'Failed to fetch users'})
   }   
}
