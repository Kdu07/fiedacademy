const express = require('express');
const router = express.Router();
require('dotenv').config();

const profileController = require('../controllers/profileController');

// Rota do perfil
router.get('/profile', profileController.index);



module.exports = router;