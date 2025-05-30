const express = require('express');
const router = express.Router();
const pathsController = require('../controllers/pathsController');

// Rota para a lista de trilhas (opcional, se quiser mostrar todas)
router.get('/', pathsController.index);

// Rota dinâmica para cada trilha
router.get('/:slug', pathsController.trilha);

module.exports = router;