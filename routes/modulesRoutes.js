 const express = require('express');
const router = express.Router();
require('dotenv').config();

const contentController = require('../controllers/modulesController');

// Rota de content
router.get('/content/:id', contentController.index);

module.exports = router;
