const db = require('../models/ConnectDB');

const PosicaoRepository = {
    getAll: async () => {
      const query = 'SELECT * FROM posicoes';
      try {
        const [results] = await db.promise().query(query);
        return results;
      } catch (err) {
        throw err;
      }
    }
  }

module.exports = PosicaoRepository;