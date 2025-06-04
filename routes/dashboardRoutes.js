const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rota da home
router.get('/dashboard', dashboardController.index);

module.exports = router;

