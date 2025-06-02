const express = require('express');
const router = express.Router();
require('dotenv').config();
const home = require('../controllers/homeController');
const paths = require('../controllers/pathsController');
const content = require('../controllers/contentController');
const help = require('../controllers/helpController');
const login = require('../controllers/loginController');
const moduleController = require('../controllers/ModuleController');
    
// Rota da home
router.get('/', home.index);

// Rota de login
router.get('/login', login.index);

// Rota de paths
router.get('/paths/:id', paths.index);

// Rota de content
router.get('/content/:id', content.index);

// Rota do conteúdo
router.get('/module/:id/page/:page_id', moduleController.index)

// Rota de help
router.get('/help', help.index);

// Aqui você importa o novo arquivo de rotas
    //  const pathRoutes = require('./pathRoutes');

// E aqui você usa, depois das rotas principais:
    // router.use(pathRoutes);

module.exports = router;