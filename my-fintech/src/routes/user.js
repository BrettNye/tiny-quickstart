const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'));
})

router.get('/dashboard', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'dashboard.html'));
})

module.exports = router