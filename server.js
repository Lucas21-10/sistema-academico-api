const express = require('express');
const app = express();

const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
const adicionarDisciplina = require('./src/routes/adicionarDisciplina');


const PORT = 8080;

app.use(express.json());

app.use('/api', disciplinaRoutes);
app.use('/api', adicionarDisciplina)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});