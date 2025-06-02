const express = require('express');
const router = express.Router();
require('dotenv').config();
const homeController = require('../controllers/homeController');
const pathController = require('../controllers/pathController');
const helpController = require('../controllers/helpController');
const contentController = require('../controllers/contentController');
const loginController = require('../controllers/loginController');
const moduleController = require('../controllers/ModuleController');

    
// Rota da home
router.get('/', homeController.index);

// Rota de login
router.get('/login', loginController.index);

// Rota de paths
router.get('/path/:id', pathController.index);

// Rota de content
router.get('/content/:id', contentController.index);

// Rota de help
router.get('/help', helpController.index);

// Aqui você importa o novo arquivo de rotas
    //  const pathRoutes = require('./pathRoutes');

// E aqui você usa, depois das rotas principais:
    // router.use(pathRoutes);

module.exports = router;