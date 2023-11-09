const express = require('express');
const  path = require('path');

const upload = require('./../middleware/multer/tourCategory');
const AddTourCateggory = require('./../controllers/tour category/add_TourCategory.js')
const tourCategoryImg = require('./../controllers/tour category/tourCategory_img.js')
const GetTourCategories = require('./../controllers/tour category/get_tourCategory.js')

const router = express.Router();

router.use(express.static(path.join((__dirname, "uploads/tour_category"))));
router.get('/img',tourCategoryImg);


router.post('/add',upload.array('file'),AddTourCateggory);

router.get('/getall',GetTourCategories);
module.exports = router;