const express = require('express');
const router = express.Router();
require('dotenv').config();

const subjectController = require('../controllers/subjectController');

router.get('/subject', subjectController.index);

module.exports = router;