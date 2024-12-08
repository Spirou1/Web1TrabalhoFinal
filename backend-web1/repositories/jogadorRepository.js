const db = require('../models/ConnectDB');

const JogadorRepository = {
  // Função para obter todos os jogadores
  getAll: async () => {
    const query = 'SELECT * FROM jogadores';
    try {
      const [results] = await db.promise().query(query);
      return results;
    } catch (err) {
      throw err;
    }
  },

  // Função para obter jogador por ID
  getById: async (id) => {
    const query = 'SELECT * FROM jogadores WHERE id = ?';
    try {
      const [results] = await db.promise().query(query, [id]);
      return results[0]; // Retorna o primeiro resultado
    } catch (err) {
      throw err;
    }
  },

  // Função para criar um novo jogador
  create: async (nome, posicao, idade, email) => {
    const query = 'INSERT INTO jogadores (nome, posicao, idade, email) VALUES (?, ?, ?, ?)';
    try {
      const [result] = await db.promise().query(query, [nome, posicao, idade, email]);
      return result.insertId; // Retorna o ID do jogador inserido
    } catch (err) {
      throw err;
    }
  },

  // Função para atualizar as informações do jogador
  update: async (id, nome, posicao, idade, email) => {
    const query = 'UPDATE jogadores SET nome = ?, posicao = ?, idade = ?, email = ? WHERE id = ?';
    try {
      const [result] = await db.promise().query(query, [nome, posicao, idade, email, id]);
      return result.affectedRows; // Retorna o número de linhas afetadas
    } catch (err) {
      throw err;
    }
  },

  // Função para deletar um jogador
  delete: async (id) => {
    const query = 'DELETE FROM jogadores WHERE id = ?';
    try {
      const [result] = await db.promise().query(query, [id]);
      return result.affectedRows; // Retorna o número de linhas afetadas
    } catch (err) {
      throw err;
    }
  }
};

module.exports = JogadorRepository;