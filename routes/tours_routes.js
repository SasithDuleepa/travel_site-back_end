const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/tourCategory');

const AddTourCategory = require('../controllers/tours/add_tours');

const ToursSearch= require('../controllers/tours/tours_search');
const GetToursAccToId = require('../controllers/tours/tour_acc_Id')
const GetTourCategoryAccToId =  require('../controllers/tours/tourcategory_acc_id')
const ToursAccToTourCategory =require('../controllers/tours/tours_acc_tourcategory')

const GetTourDays = require('../controllers/tours/tour_days')



const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/tour_category"))));

router.post('/addTourCategory',upload.array('file',10), AddTourCategory);

router.get('/toursSearch/:tour',ToursSearch);    
router.get('/tour/:tour', GetToursAccToId)
router.get('/tourcategory/:tourcategory', GetTourCategoryAccToId)


router.get('/tours/:tourcategory',ToursAccToTourCategory)


router.get('/tourdays/:tourid',GetTourDays)


module.exports = router;