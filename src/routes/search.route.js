const express = require('express');

const router = express.Router();
const searchController = require('../controllers/search.controller');

router.post('/freelance', searchController.searchFreelance);
router.post('/', searchController.searchByString);

module.exports = router;
