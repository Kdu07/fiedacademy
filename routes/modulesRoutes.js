 const express = require('express');
const router = express.Router();
require('dotenv').config();

const modulesController = require('../controllers/modulesController');

// Rota de content
router.get('/path/:id_path/module/:id/page/:id_order', modulesController.index);

// rota de feedback
router.post('/feedback/update', modulesController.updateFeedback)

module.exports = router;
