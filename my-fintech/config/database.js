const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db_path = path.resolve(__dirname, '../db.sqlite');
var db = new sqlite3.Database(db_path);

module.exports = db;

