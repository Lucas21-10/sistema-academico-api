const express = require('express');

const disciplinaRoutes = require('./src/routes/disciplinaRoutes');

const app = express();

const PORT = 8080;

app.use(express.json());

app.use('/api', disciplinaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});