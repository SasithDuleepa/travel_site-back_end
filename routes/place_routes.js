const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/place');
const AddPlace =  require('./../controllers/place/add_place')
const Placeimg = require('./../controllers/place/place_img')
const AllPlace = require('./../controllers/place/get_Allplaces')
const PlaceSearch = require('./../controllers/place/place_search')



const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/places"))));

router.get('/placeimg', Placeimg);
router.post('/addplace',upload.array('file',10), AddPlace);
router.get('/all',AllPlace);
router.get('/placesearch/:place',PlaceSearch);

module.exports = router;