const express = require('express');
const router = express.Router();
require('dotenv').config();

const contentDashboardController = require('../controllers/contentDashboardController');

// Rota de dashboard
router.get('/contentDashboard', contentDashboardController.index);

router.get('/content/edit/:id', contentDashboardController.editContent);

module.exports = router;

