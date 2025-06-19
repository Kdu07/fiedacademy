const express = require('express');
const router = express.Router();
require('dotenv').config();

const testController = require('../controllers/testController');

router.get('/test/module/:id', testController.index);

// Rota de submissão do teste
router.post('/test/:id/submit', testController.handleSubmit);

module.exports = router;