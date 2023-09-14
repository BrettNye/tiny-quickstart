const db = require('../../config/database');

const dbController = {
    insertAccessToken: async (req, res, next) => {
        const sql = `INSERT INTO access_tokens (user_id, access_token, item_id, institution_id, institution_name) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [req.body.user_id, req.body.access_token, req.body.item_id, req.body.institution_id, req.body.institution_name], function(err) {
            if (err) {
                console.error('Error inserting into the database: ' + err.message);
                return;
            }
            res.sendStatus(200);
        });
    },
};