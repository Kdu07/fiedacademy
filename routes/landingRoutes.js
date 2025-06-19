const express = require('express');
const router = express.Router();
require('dotenv').config();
const landingController = require('../controllers/landingController');

// Rota da home
router.get('/', landingController.index);

module.exports = router;

// Aqui você importa o novo arquivo de rotas
    //  const pathRoutes = require('./pathRoutes');

// E aqui você usa, depois das rotas principais:
    // router.use(pathRoutes);
