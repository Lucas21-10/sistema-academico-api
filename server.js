const express = require('express');
const app = express();

app.disable('x-powered-by');

const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
const adicionarDisciplina = require('./src/routes/adicionarDisciplina');

const PORT = 8080;

app.use(express.json());

app.use('/api', disciplinaRoutes);
app.use('/api', adicionarDisciplina);

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

module.exports = app;