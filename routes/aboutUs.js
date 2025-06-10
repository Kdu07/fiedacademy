const express = require('express');
const router = express.Router();

const aboutUs = require('../controllers/aboutUsController');
router.get('/aboutus', aboutUs.index);

module.exports = router;