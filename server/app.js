const express = require('express');
require('dotenv').config();
const getUserDB = require('./routes/userRoutes.js');
const app = express();
const loadMiddleware = require('./middleware/middleware.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
loadMiddleware(app);

/*For debugging*/
app.use('/users', getUserDB)

// app.get('/', (req,res)=>{
//     res.redirect('/users')
// })

module.exports = app;