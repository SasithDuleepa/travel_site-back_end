const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/place');
const AddPlace =  require('./../controllers/place/add_place')
const Placeimg = require('./../controllers/place/place_img')
const AllPlace = require('./../controllers/place/get_Allplaces')
const PlaceSearch = require('./../controllers/place/place_search')
const GetPlace = require('./../controllers/place/get_place')
const GetPlaceImgNames = require('./../controllers/place/getPlace_img_names')



const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/places"))));

router.get('/placeimg', Placeimg);
router.post('/addplace',upload.array('file',10), AddPlace);
router.get('/all',AllPlace);
router.get('/placesearch/:place',PlaceSearch);
router.get('/getplace/:place',GetPlace);
router.get('/getplaceimgnames/:place',GetPlaceImgNames);

module.exports = router;