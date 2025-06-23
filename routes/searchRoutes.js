const express = require('express');
const router = express.Router();

const search = require('../controllers/searchController');

router.get('/search/q=:query', search.index);

module.exports = router;