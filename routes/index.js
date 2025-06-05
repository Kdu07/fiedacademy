const express = require('express');
const router = express.Router();
require('dotenv').config();
const homeController = require('../controllers/homeController');
const pathController = require('../controllers/pathController');
const helpController = require('../controllers/helpController');
const contentController = require('../controllers/contentController');
const loginController = require('../controllers/loginController');
const authController = require('../controllers/authController');

// Rota da home
router.get('/', homeController.index);

// Rota de login
router.get('/login', loginController.index);

// Rota de paths
router.get('/paths/:id', pathController.index);

// Rota de content
router.get('/content/:id', contentController.index);

// Rota de help
router.get('/help', helpController.index);

// Rota de autenticação
router.post('/api/create-user', authController.create);
router.post('/api/login-user', authController.login);
router.get('/logout-user', authController.logout);

// Aqui você importa o novo arquivo de rotas
    //  const pathRoutes = require('./pathRoutes');

// E aqui você usa, depois das rotas principais:
    // router.use(pathRoutes);

module.exports = router;