const PosicaoRepository = require('../repositories/posicaoRepository');

const PosicaoController = {
    getAll: async (req, res) => {
      try {
        const jogadores = await PosicaoRepository.getAll();
        res.json(jogadores);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter posições' });
      }
    }
};

module.exports = PosicaoController;