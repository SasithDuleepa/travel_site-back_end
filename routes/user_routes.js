
const express = require('express');

const AddUser = require('./../controllers/user/add_user');
const LogIn = require('./../controllers/user/login');


const router = express.Router();

router.post('/add', AddUser);

router.post('/login', LogIn);


module.exports = router;