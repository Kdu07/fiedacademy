const express = require('express');
const router = express.Router();
require('dotenv').config();

const dashboardController = require('../controllers/dashboardController');

// Rota de dashboard
router.get('/dashboard', dashboardController.index);

module.exports = router;