const express = require('express');
const router = express.Router();

const aboutUs = require('../controllers/aboutUsController');
router.get('/aboutUs', aboutUs.index);

module.exports = router;