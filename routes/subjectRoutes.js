const express = require('express');
const router = express.Router();
require('dotenv').config();

const subjectController = require('../controllers/dashboardController');

// Rota de dashboard
router.get('/subject', subjectController.index);

module.exports = router;