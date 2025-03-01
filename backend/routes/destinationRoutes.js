const express = require('express');
const { getRandomDestination } = require('../controllers/destinationController');

const router = express.Router();

router.get('/random', getRandomDestination);
router.get('/details/:city');

module.exports = router;