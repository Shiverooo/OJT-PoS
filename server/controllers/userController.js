const db = require('../models/sqliteModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.JWT_SECRET;

exports.authLogin = (req, res) =>{
   const {email, password} = req.body;
   const user = db.prepare('select id, email, password_hash, role from users where email = ?').get(email);
   const validPassword = bcrypt.compareSync(password, user.password_hash);
   if(!user && !validPassword) return res.status(404).json({message:'User not found'});
   
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
           first_name,
           last_name,
           email,
           contact,
           created_at
           from users`
       ).all();
       res.json({users});   
   }catch(err){
       console.error(err);
       res.status(500).json({error: 'Failed to fetch users'})
   }   
}

exports.createUsers = async (req,res) =>{
    console.log("Received body:", req.body)
    const {first_name, last_name, username, phone_number, email, password} = req.body;
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const insertUser = db.prepare(`
            insert into users (
                first_name,
                last_name,
                username,
                phone_number,
                email,
                password_hash
            ) values(
                ?, ?, ?, ?, ?, ?
            )
        `);
        insertUser.run(first_name, last_name, username, phone_number, email, hashedPassword);
        res.status(201).json({message:'User registered successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'User registration failed'}) 
    }
}
