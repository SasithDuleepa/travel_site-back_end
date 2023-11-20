const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/tour');

const AddTourCategory = require('../controllers/tours/add_tours');

const ToursSearch= require('../controllers/tours/tours_search');
const GetToursAccToId = require('../controllers/tours/tour_acc_Id')
const GetTourCategoryAccToId =  require('../controllers/tours/tourcategory_acc_id')
const ToursAccToTourCategory =require('../controllers/tours/tours_acc_tourcategory')

const GetTourDays = require('../controllers/tours/tour_days')

const TourPlacesAccToDateId = require('../controllers/tours/tour_places')

const Places = require('./../controllers/tours/places')


const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/tour"))));

router.post('/addTourCategory',upload.array('file',10), AddTourCategory);

router.get('/toursSearch/:tour',ToursSearch);    
router.get('/tour/:tour', GetToursAccToId)
router.get('/tourcategory/:tourcategory', GetTourCategoryAccToId)


router.get('/tours/:tourcategory',ToursAccToTourCategory)


router.get('/tourdays/:tourid',GetTourDays)

router.get('/tourplaces/:tourdateid',TourPlacesAccToDateId)

router.get('/places/:tourId',Places)

module.exports = router;