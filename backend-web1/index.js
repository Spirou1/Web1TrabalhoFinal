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

// Rotas para jogadores
app.get('/jogadores', (req, res) => {
    db.query('SELECT * FROM jogadores', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

// buscar um jogador pelo ID
app.get('/jogadores/:id', (req, res) => {
    const { id } = req.params;

    // Consulta SQL para buscar o jogador pelo ID
    db.query('SELECT * FROM jogadores WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar jogador:', err);
            return res.status(500).send('Erro ao buscar jogador');
        }

        if (result.length === 0) {
            return res.status(404).send('Jogador não encontrado');
        }

        res.send(result[0]); // Envia os dados jogador encontrado
    });
});


app.post('/jogadores', (req, res) => {
    const { nome, posicao, idade, email } = req.body;

    // Verifica se todos os campos necessários estão preenchidos
    if (!nome || !posicao || !idade || !email) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    db.query(
        'INSERT INTO jogadores (nome, posicao, idade, email) VALUES (?, ?, ?, ?)',
        [nome, posicao, idade, email],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ id: result.insertId, nome, posicao, idade, email });
        }
    );
});

app.put('/jogadores/:id', (req, res) => {
    const { nome, posicao, idade, email } = req.body;
    const { id } = req.params;

    if (!nome || !posicao || !idade || !email) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    db.query(
        'UPDATE jogadores SET nome = ?, posicao = ?, idade = ?, email = ? WHERE id = ?',
        [nome, posicao, idade, email, id],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Erro ao atualizar jogador', error: err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Jogador não encontrado.' });
            }

            res.status(200).json({ message: 'Jogador atualizado com sucesso.' });
        }
    );
});

app.delete('/jogadores/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM jogadores WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao deletar jogador', error: err });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Jogador não encontrado.' });
        }

        res.status(200).json({ message: 'Jogador deletado com sucesso.' });
    });
});

// Rota para carregar posições
app.get('/posicoes', (req, res) => {
    db.query('SELECT * FROM posicoes', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

// Configuração do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
