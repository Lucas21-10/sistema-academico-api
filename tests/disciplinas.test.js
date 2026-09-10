const requisicao = require('supertest');
const aplicacao = require('../server');

describe('GET /api/disciplinas', () => {
    test('deve retornar a lista de disciplinas', async () => {
        const resposta = await requisicao(aplicacao)
            .get('/api/disciplinas');

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body).toBeInstanceOf(Array);
        expect(resposta.body.length).toBeGreaterThan(0);
    });
});

describe('POST /api/adicionarDisciplina', () => {
    test('deve adicionar uma nova disciplina', async () => {
        const novaDisciplina = {
            nome: 'Programação Web',
            codigo: 'PW',
            cargaHoraria: 60,
            periodo: 3
        };

        const resposta = await requisicao(aplicacao)
            .post('/api/adicionarDisciplina')
            .send(novaDisciplina);

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body.nome).toBe('Programação Web');
        expect(resposta.body.codigo).toBe('PW');
        expect(resposta.body.cargaHoraria).toBe(60);
        expect(resposta.body.periodo).toBe(3);
    });
});