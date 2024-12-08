const express = require('express');
const router = express.Router();
const JogadorController = require('./controllers/jogadorController');
const PosicaoController = require('./controllers/posicaoController');

// rotas jogadores
router.get('/jogadores', JogadorController.getAll);
router.get('/jogadores/:id', JogadorController.getById);
router.post('/jogadores', JogadorController.create);
router.put('/jogadores/:id', JogadorController.update);
router.delete('/jogadores/:id', JogadorController.delete);

// rota posicoes
router.get('/posicoes', PosicaoController.getAll);

module.exports = router;