const express = require('express');
const router = express.Router();
const home = require('../controllers/HomeController');
const moduleController = require('../controllers/ModuleController');

// Rota da home
router.get('/', home.index);

// Rota do conteúdo
router.get('/module/:id/page/:page_id', moduleController.index)



module.exports = router;