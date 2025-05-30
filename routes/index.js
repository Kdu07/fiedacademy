const express = require('express');
const router = express.Router();
const home = require('../controllers/homeController');
const login = require('../controllers/loginController');
const paths = require('../controllers/pathController');
const content = require('../controllers/contentController');
const help = require('../controllers/helpController');

// Rota da home
router.get('/', home.index);

// Rota de login
router.get('/login', login.index);

// Rota de paths
router.get('/paths', paths.index);

// Rota de content
router.get('/content', content.index);

// Rota de help
router.get('/help', help.index);

// Aqui você importa o novo arquivo de rotas
    //  const pathRoutes = require('./pathRoutes');

// E aqui você usa, depois das rotas principais:
    // router.use(pathRoutes);

// Isso faz com que todas as rotas definidas em pathRoutes.js sejam reconhecidas

module.exports = router;