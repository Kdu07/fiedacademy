const express = require('express');
const router = express.Router();
require('dotenv').config();

const loginController = require('../controllers/loginController');
const createUserController = require('../controllers/createUserController');

// Rota de login
router.get('/login', loginController.index);

router.get('/create-user', createUserController.index)

module.exports = router;