const express = require('express');
const  path = require('path');

const uploads = require('./../middleware/multer/multer');
const AddPlace =  require('./../controllers/place/add_place')



const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads"))));

;
router.post('/addplace',uploads.array('file'), AddPlace);

module.exports = router;