const express = require('express');


const AddPlace =  require('./../controllers/place/add_place')



const router = express.Router();

router.post('/addplace', AddPlace);

module.exports = router;