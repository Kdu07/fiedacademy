const express = require('express');
const router = express.Router();
require('dotenv').config();

const testController = require('../controllers/testController');

router.get('/test/module/:id', testController.index);

module.exports = router;