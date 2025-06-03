const express = require('express');
const router = express.Router();
require('dotenv').config();
const homeController = require('../controllers/homeController');
const pathController = require('../controllers/pathController');
const moduleController = require('../controllers/moduleController');
const helpController = require('../controllers/helpController');

// Rota do conteúdo
router.get('/module/:id/page/:page_id', moduleController.index)

// Rota de login
// router.get('/', login.index);
    
// Rota da home
router.get('/', homeController.index);

// Rota de paths
router.get('/path/:id', pathController.index);

// Rota de module
router.get('/content/:id', moduleController.index);

// Rota de help
router.get('/help', helpController.index);

// Aqui você importa o novo arquivo de rotas
    //  const pathRoutes = require('./pathRoutes');

// E aqui você usa, depois das rotas principais:
    // router.use(pathRoutes);

module.exports = router;