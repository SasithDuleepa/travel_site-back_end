const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/tourCategory');

const AddTourCategory = require('../controllers/tour package/add_tourpackage');




const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/tour_category"))));

router.post('/addTourCategory',upload.array('file',10), AddTourCategory);



module.exports = router;