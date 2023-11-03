const express = require('express');
const  path = require('path');


const upload = require('../middleware/multer/dayTour');
const AddDayTour = require('../controllers/day tour/add_dayTour');
const DayTourImg =  require('../controllers/day tour/day_tour_img');
const DayTour = require('../controllers/day tour/day_tours');

const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/day_tour"))));

router.post('/add', upload.array('file'), AddDayTour);
router.get('/daytourimg', DayTourImg);
router.get('/daytours', DayTour);

module.exports = router;