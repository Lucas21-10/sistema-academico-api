const express = require('express');

const disciplinas = require('../data/disciplinas');

const router = express.Router();

router.post('/adicionarDisciplina', (req, res) => {
    const { nome, codigo, cargaHoraria, periodo } = req.body;

    const novoId = Math.max(0, ...disciplinas.map(disciplina => disciplina.id)) + 1;

    const novaDisciplina = {
        id: novoId,
        nome,
        codigo,
        cargaHoraria,
        periodo
    };

    disciplinas.push(novaDisciplina);

    return res.status(200).json(novaDisciplina);
});

module.exports = router;