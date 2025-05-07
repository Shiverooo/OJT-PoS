const db = require('../models/sqliteModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { console } = require('inspector');
const SECRET_KEY = process.env.JWT_SECRET;

const generateUserID = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000); // 0–999
    const padded = String(randomNum).padStart(4, '0');  // 3 digits: 001, 045, 999
    return `ITI-${year}-${padded}`;
}   

exports.createUsers = async (req,res) => {
    console.log("Received body:", req.body)
    const {first_name, last_name, username, phone_number, email, password} = req.body;
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const insertUser = db.prepare(`
            insert into users (
                user_id,
                first_name,
                last_name,
                username,
                phone_number,
                email,
                password_hash
            ) values(
                ?, ?, ?, ?, ?, ?, ?
            )
        `);
        insertUser.run(generateUserID(), first_name, last_name, username, phone_number, email, hashedPassword);
        res.status(201).json({message:'User registered successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'User registration failed'}) 
    }
}

exports.authLogin = (req, res) => {
   const {email, password} = req.body;
   const user = db.prepare(`
     SELECT user_id, email, password_hash, role, first_name, last_name 
     FROM users 
     WHERE email = ?
   `).get(email);
   
   if(!user) return res.status(404).json({message:'User not found'});
   
   const validPassword = bcrypt.compareSync(password, user.password_hash);
   if(!validPassword) return res.status(401).json({message:'Invalid password'});
   
   const token = jwt.sign({
      id: user.user_id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name
   }, 
   SECRET_KEY,
   {expiresIn:'1h'})
   
   res.json({
     message: 'Login Successful', 
     token, 
     user: {
       id: user.user_id,
       email: user.email,
       role: user.role,
       first_name: user.first_name,
       last_name: user.last_name
     }
   });
}

exports.activeUser = (req, res) => {
    const {id} = req.query;
    try{
        const activeUser = db.prepare(`
            select
                username,
                email
            from users
            where id = ?
        `).get(id)
        
        if (!activeUser) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.json({activeUser})

    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to fetch user_id'})
    }
}

exports.reqData = (req,res) => {
   try{ 
       const users = db.prepare(`
        select
           first_name,
           last_name,
           username,
           email,
           phone_number,
           created_at
           from users
        `).all();
       res.json({users});   
   }catch(err){
       console.error(err);
       res.status(500).json({error: 'Failed to fetch users'})
   }   
}



