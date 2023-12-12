const express = require('express');

const BookDayTour = require('../controllers/day tour book/dayTourBook');
const PendingDayTours = require('../controllers/day tour book/pendingDayTours');

const BookTour = require('../controllers/tour book/tourBook');
const PendingTours = require('../controllers/tour book/pendingTours');

const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');

const router = express.Router();

router.post('/bookDayTour',AdminAuthenticate, BookDayTour);
router.get('/pendingDayTours/:id', PendingDayTours);

router.post('/bookTour', BookTour);
router.get('/pendingTours/:id', PendingTours);

module.exports = router;