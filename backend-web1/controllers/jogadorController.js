const JogadorRepository = require('../repositories/jogadorRepository');

const JogadorController = {
  getAll: async (req, res) => {
    try {
      const jogadores = await JogadorRepository.getAll();
      res.json(jogadores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter jogadores' });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const jogador = await JogadorRepository.getById(id);
      if (jogador) {
        res.json(jogador);
      } else {
        res.status(404).json({ message: 'Jogador não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter jogador' });
    }
  },

  create: async (req, res) => {
    const { nome, posicao, idade, email } = req.body;
    try {
      const id = await JogadorRepository.create(nome, posicao, idade, email);
      res.status(201).json({ id, nome, posicao, idade, email });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar jogador' });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome, posicao, idade, email } = req.body;
    try {
      const affectedRows = await JogadorRepository.update(id, nome, posicao, idade, email);
      if (affectedRows > 0) {
        res.json({ message: 'Jogador atualizado com sucesso' });
      } else {
        res.status(404).json({ message: 'Jogador não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar jogador' });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await JogadorRepository.delete(id);
      if (affectedRows > 0) {
        res.json({ message: 'Jogador deletado com sucesso' });
      } else {
        res.status(404).json({ message: 'Jogador não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar jogador' });
    }
  }
};

module.exports = JogadorController;
