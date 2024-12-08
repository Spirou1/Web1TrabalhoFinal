const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');

const app = express();

app.use(cors());
app.use(express.json());

// Usando as rotas
app.use(routes);

// Iniciando servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
