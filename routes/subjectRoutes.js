const express = require('express');
const router = express.Router();
require('dotenv').config();

const subjectController = require('../controllers/subjectController');

router.get('/subject1', subjectController.index);

module.exports = router;