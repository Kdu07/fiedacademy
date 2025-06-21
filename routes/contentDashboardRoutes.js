const express = require('express');
const router = express.Router();
require('dotenv').config();

const contentDashboardController = require('../controllers/contentDashboardController');

// Rota de dashboard
router.get('/contentDashboard', contentDashboardController.index);

router.get('/content/edit/:id', contentDashboardController.editContent);
router.get('/content/new', contentDashboardController.startContentCreation);

router.post('/content/create', contentDashboardController.createContent);
router.post('/content/update/:id', contentDashboardController.updateContent);
router.post('/content/delete/:id', contentDashboardController.deleteContent);

module.exports = router;

