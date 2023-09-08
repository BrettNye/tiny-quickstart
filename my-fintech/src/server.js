require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../config/database');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../db.sqlite');

const app = express();

const test = db.get('SELECT * FROM users', () => {
    
})

const PlaidRoutes = require('./routes/plaid');
const UserRoutes = require('./routes/user');

app.use(PlaidRoutes);
// app.use(UserRoutes);

app.listen(3000);