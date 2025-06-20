const express = require('express');
const router = express.Router();
require('dotenv').config();

const helpController = require('../controllers/helpController');

// Página principal de ajuda
router.get('/help', helpController.index);

// Página de detalhe de artigo de ajuda
router.get('/help/:category/content/:id_content', helpController.getArticleByCategory);

// Rota para criar artigo de ajuda (POST)
router.post('/help', helpController.create);

module.exports = router;