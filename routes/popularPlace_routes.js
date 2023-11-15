const express = require('express');

const GetPopularPlace = require('./../controllers/popular place/popular_place')

const router = express.Router();

router.get('/place', GetPopularPlace)

module.exports = router;