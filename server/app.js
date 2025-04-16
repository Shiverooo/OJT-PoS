const express = require('express');
// const db = require('better-sqlite3')('./database/database.db', {verbose: console.log});
const getUserDB = require('./routes/userRoutes.js');
const app = express();
const loadMiddleware = require('./middleware/middleware.js');


loadMiddleware(app);

app.use(express.json());

/*For debugging*/
app.use('/users', getUserDB)

app.get('/', (req,res)=>{
    res.redirect('/getusers')
})

module.exports = app;