const express = require('express');
const router = express.Router();
require('dotenv').config();

const pathController = require('../controllers/pathController');

// Rota de paths
router.get('/paths/:id', pathController.index);

module.exports = router;