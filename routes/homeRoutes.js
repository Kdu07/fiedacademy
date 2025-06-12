const express = require('express');
const router = express.Router();
require('dotenv').config();
const homeController = require('../controllers/homeController');

// Rota da home
router.get('/', homeController.index);
router.post('/bookmarks/delete/:id', homeController.deleteBookmark);

//adicionar bookmark
router.post('/bookmarks/add:id/', homeController.addBookmark);

module.exports = router;

// Aqui você importa o novo arquivo de rotas
    //  const pathRoutes = require('./pathRoutes');

// E aqui você usa, depois das rotas principais:
    // router.use(pathRoutes);
