const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'WEB1', 
    database: 'futebol', 
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// CRUD Routes
app.get('/jogadores', (req, res) => {
    db.query('SELECT * FROM jogadores', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post('/jogadores', (req, res) => {
    const { nome, posicao, idade } = req.body;
    db.query('INSERT INTO jogadores (nome, posicao, idade) VALUES (?, ?, ?)',
        [nome, posicao, idade],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ id: result.insertId, nome, posicao, idade });
        });
});

app.put('/jogadores/:id', (req, res) => {
    const { nome, posicao, idade } = req.body;
    const { id } = req.params;
    db.query('UPDATE jogadores SET nome = ?, posicao = ?, idade = ? WHERE id = ?',
        [nome, posicao, idade, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Jogador atualizado.');
        });
});

app.delete('/jogadores/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM jogadores WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Jogador deletado.');
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
