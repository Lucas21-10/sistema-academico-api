const express = require('express');

const disciplinas = require('../data/disciplinas');

const router = express.Router();

router.get('/disciplinas', (req, res) => {
    res.json(disciplinas);
});

module.exports = router;