const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/place');
const AddPlace =  require('./../controllers/place/add_place')
const Placeimg = require('./../controllers/place/place_img')
const AllPlace = require('./../controllers/place/get_Allplaces')
const PlaceSearch = require('./../controllers/place/place_search')
const GetPlace = require('./../controllers/place/get_place')
const GetPlaceImgNames = require('./../controllers/place/getPlace_img_names')
const UpdatePlace = require('./../controllers/place/updatePlace')



const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/places"))));

router.get('/placeimg', Placeimg);
router.post('/addplace',upload.fields([
                                        { name: 'cardImg', maxCount: 1 },
                                        { name: 'coverImgs', maxCount: 1 },
                                        { name: 'files', maxCount: 5 }, // Adjust maxCount based on your requirements
  ]), AddPlace);

router.get('/all',AllPlace);
router.get('/placesearch/:place',PlaceSearch);
router.get('/getplace/:place',GetPlace);
router.get('/getplaceimgnames/:place',GetPlaceImgNames);
router.put('/updateplace/:id',upload.fields([
  { name: 'newCardImg', maxCount: 1 },
  { name: 'newCoverImg', maxCount: 1 },
  { name: 'newImgs', maxCount: 5 }, // Adjust maxCount based on your requirements
]),UpdatePlace);  

module.exports = router;