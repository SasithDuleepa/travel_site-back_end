const express = require('express');


const AddCode = require('../controllers/promote code/add_code');


const router = express.Router();

router.post('/add_code', AddCode);

module.exports = router;