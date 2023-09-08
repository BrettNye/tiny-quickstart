require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../config/database');


const app = express();
app.use(bodyParser.json());

// db.get('SELECT * FROM users', (err, rows) => {
//     if(err){
//         console.log(err)
//         return;
//     }

//     console.log(rows);    
// })

// db.close();

const AuthRoutes = require('./routes/auth');
const PlaidRoutes = require('./routes/plaid');
const UserRoutes = require('./routes/user');

app.use('/api/oauth', AuthRoutes);
app.use('/api/plaid', PlaidRoutes);
// app.use(UserRoutes);

app.listen(3000);