const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Rota de autenticação
router.post('/api/create-user', authController.create);
router.post('/api/login-user', authController.login);
router.get('/logout-user', authController.logout);

module.exports = router;