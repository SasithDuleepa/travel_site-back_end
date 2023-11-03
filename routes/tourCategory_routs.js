const express = require('express');
const  path = require('path');

const AddTourCateggory = require('./../controllers/tour category/add_TourCategory.js')
const router = express.Router();


router.post('/add_tourcategory',AddTourCateggory);
module.exports = router;