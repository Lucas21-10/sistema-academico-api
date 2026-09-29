const express = require('express');

const disciplinas = require('../data/disciplinas');

const router = express.Router();

router.get('/disciplinas', (req, res) => {
    res.json(disciplinas);
});

router.post('/disciplinas', (req, res) => {
    const { nome, codigo, cargaHoraria, periodo } = req.body;

    const novaDisciplina = {
        id: disciplinas.length + 1,
        nome,
        codigo,
        cargaHoraria,
        periodo
    };

    disciplinas.push(novaDisciplina);

    return res.status(201).json(novaDisciplina);
});

router.delete('/disciplinas/:id', (req, res) => {
    const id = Number(req.params.id);

    const indice = disciplinas.findIndex(disciplina => disciplina.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Disciplina não encontrada'
        });
    }

    disciplinas.splice(indice, 1);

    return res.status(204).send();
});

module.exports = router;