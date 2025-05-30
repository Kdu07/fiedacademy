const express = require('express');
const router = express.Router();
require('dotenv').config();
const home = require('../controllers/homeController');
const login = require('../controllers/loginController');
const path = require('../controllers/pathController');
const content = require('../controllers/contentController');
const help = require('../controllers/helpController');
const moduleController = require('../controllers/ModuleController');

// Rota do conteúdo
router.get('/module/:id/page/:page_id', moduleController.index)

// Rota de login
// router.get('/', login.index);
    
// Rota da home
router.get('/', home.index);

// Rota de paths
router.get('/paths', path.index);

// Rota de content
router.get('/content/:id', content.index);

// Rota de help
router.get('/help', help.index);

// Aqui você importa o novo arquivo de rotas
    //  const pathRoutes = require('./pathRoutes');

// E aqui você usa, depois das rotas principais:
    // router.use(pathRoutes);

// Isso faz com que todas as rotas definidas em pathRoutes.js sejam reconhecidas


module.exports = router;