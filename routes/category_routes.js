const express = require('express');
const  path = require('path');

const upload = require('../middleware/multer/category');
const AddCategory = require('../controllers/category/add_category');

const router = express.Router();
router.use(express.static(path.join((__dirname, "uploads/category"))));

router.post('/add',upload.array('file'), AddCategory);

module.exports = router;