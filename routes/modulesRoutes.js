 const express = require('express');
const router = express.Router();
require('dotenv').config();

const contentController = require('../controllers/modulesController');

// Rota de content
router.get('/path/:id_path/module/:id/page/:id_order', contentController.index);

module.exports = router;
