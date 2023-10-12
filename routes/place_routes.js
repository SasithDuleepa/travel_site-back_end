const express = require('express');
const  path = require('path');

const uploads = require('../middleware/multer/place');
const AddPlace =  require('./../controllers/place/add_place')
const Placeimg = require('./../controllers/place/place_img')



const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/places"))));

router.get('/placeimg', Placeimg);
router.post('/addplace',uploads.array('file'), AddPlace);

module.exports = router;