const express = require('express');
const router = express.Router();
require('dotenv').config();

const helpController = require('../controllers/helpController');

// Rota de help
router.get('/help', helpController.index);

module.exports = router;