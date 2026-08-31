const express = require('express');

const disciplinas = require('../data/disciplinas');

const router = express.Router();

router.post('/adicionarDisciplina', (req, res) =>{
    const {nome, codigo, cargaHoraria, periodo} = req.body;

    const novaDisciplina = {
        id: disciplinas.length + 1,
        nome,
        codigo,
        cargaHoraria,
        periodo
    };

    disciplinas.push(novaDisciplina)

    res.json(novaDisciplina)
})

module.exports = router;