const User = require('../models/user');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/database');

const sqlLastId = 'SELECT last_insert_rowid() as id'

const authController = {
    login: async (req, res, next) => {
        const sql = `SELECT * FROM users WHERE username = ?`;
        db.get(sql, [req.body.username], (err, rows) => {
            if(err) res.sendStatus(404);
            else if(rows == undefined || rows == null) {
                res.sendStatus(404);
            }
            else if(bcrypt.compare(req.body.password, rows.password)){
                const token = jwt.sign(
                    {user_id:rows.id, username:rows.username},
                    process.env.SUPER_SECRET_HASH_KEY,
                    {expiresIn: '24h'}
                )

                db.run('UPDATE users SET token = ?, last_updated = ? WHERE id = ?', [token, dayjs().utc().format(), rows.id], (err) => {
                    if(err) {
                        res.sendStatus(500);
                        return;
                    }
                    res.send(JSON.stringify({token: token}));
                })
            }
        });
    },
    register: async (req, res, next) => {
        const sql = `SELECT * FROM users WHERE username = ?`;
        db.all(sql, [req.body.username], async (err, rows) => {
            if(err) res.sendStatus(404);
            if(rows.length > 0) res.sendStatus(409);
            else {
                var encryptedPassword = await bcrypt.hash(req.body.password, 10)
                db.run('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, encryptedPassword], function(err) {
                    if (err) {
                        console.error('Error inserting into the database: ' + err.message);
                        return;
                    }
                    const token = jwt.sign(
                                {user_id: this.lastID, username:req.body.username},
                                process.env.SUPER_SECRET_HASH_KEY,
                                {expiresIn: '24h'}
                            )
                    db.run('UPDATE users SET token = ?, last_updated = ? WHERE id = ?', [token, dayjs().utc().format(), this.lastID], (err) => {
                        if(err) {
                            res.sendStatus(500);
                            return;
                        }
                        res.send(JSON.stringify({token: token}));
                    })                 
                });
            }
        });
    }
};

module.exports = authController;