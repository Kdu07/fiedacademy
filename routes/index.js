const express = require('express');
const router = express.Router();
require('dotenv').config();
const home = require('../controllers/homeController');
const login = require('../controllers/loginController');
const paths = require('../controllers/pathsController');
const content = require('../controllers/contentController');
const help = require('../controllers/helpController');
const moduleController = require('../controllers/ModuleController');

// Rota do conteúdo
router.get('/module/:id/page/:page_id', moduleController.index)

// Rota de login
router.get('/', login.index);
    
// Rota da home
router.get('/home', home.index);

// Rota de paths
router.get('/paths', paths.index);

// Rota de content
router.get('/content/:id', content.index);

// Rota de help
router.get('/help', help.index);


module.exports = router;