const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/place');
const AddPlace =  require('./../controllers/place/add_place')
const Placeimg = require('./../controllers/place/place_img')



const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/places"))));

router.get('/placeimg', Placeimg);
router.post('/addplace',upload.array('file',10), AddPlace);

module.exports = router;