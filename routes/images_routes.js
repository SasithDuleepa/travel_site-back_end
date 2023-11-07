const express = require('express');
const  path = require('path');

const {TourImg} = require('../controllers/images/get_images');
const {EditeTourImg} = require('../controllers/images/edite_img')
const upload = require('./../middleware/multer/images')
const router = express.Router();

router.use(express.static(path.join((__dirname, "uploads/images"))));
router.get('/Tour/heroimg', TourImg);

router.post('/Tour/heroimg',upload.single('newImage'), EditeTourImg)

module.exports = router;