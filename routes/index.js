const express = require('express');
const router = express.Router();
const home = require('../controllers/homeController');
const moduleController = require('../controllers/moduleController');

// Rota da home
router.get('/', home.index);

// Rota do conteúdo
router.get('/moduleContent', moduleController.index)

module.exports = router;