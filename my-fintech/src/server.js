require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../config/database');


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '/public')));
app.use('/static', express.static(path.join(__dirname, '..', 'node_modules')));

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

app.use('/', UserRoutes);

app.use('/api/oauth', AuthRoutes);
app.use('/api/plaid', PlaidRoutes);

app.listen(3000);