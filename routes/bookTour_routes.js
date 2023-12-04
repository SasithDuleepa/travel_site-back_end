const express = require('express');

const BookDayTour = require('../controllers/day tour book/dayTourBook');

const router = express.Router();

router.post('/bookDayTour', BookDayTour);

module.exports = router;