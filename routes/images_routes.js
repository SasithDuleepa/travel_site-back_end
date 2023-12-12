const express = require('express');
const  path = require('path');

const {TourImg} = require('../controllers/images/get_images');
const {EditeTourImg} = require('../controllers/images/edite_img')
const upload = require('./../middleware/multer/images')

const EditeHeroImg= require('../controllers/images/edite_heroImg')


const {HomeHeroImg }= require('../controllers/images/get_images');


const router = express.Router();

router.use(express.static(path.join((__dirname, "uploads/images"))));
router.get('/Tour/heroimg', TourImg);

router.post('/Tour/heroimg',upload.single('newImage'), EditeTourImg)


router.get('/Home/heroimg/:file', HomeHeroImg);

router.post('/Home/heroimg',upload.single('newImage'), EditeHeroImg)

module.exports = router;