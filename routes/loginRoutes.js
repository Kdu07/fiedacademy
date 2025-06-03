const express = require('express');
const router = express.Router();
require('dotenv').config();

const loginController = require('../controllers/loginController');

// Rota de login
router.get('/login', loginController.index);

module.exports = router;