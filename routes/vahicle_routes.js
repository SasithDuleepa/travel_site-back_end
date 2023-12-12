const express = require('express');

const GetVehicleAccToPassengers = require('./../controllers/vehicles/veicle_acct-_passengers')
const AllVehicles = require('./../controllers/vehicles/getVehicles')
const Update = require('./../controllers/vehicles/updateVehicle')
const Delete = require('./../controllers/vehicles/deleteVehicle')

const Add = require('./../controllers/vehicles/addVehicle')

const router = express.Router();

router.post('/add', Add);

router.get('/all', AllVehicles);
router.get('/:id', GetVehicleAccToPassengers);
router.put('/update/:id', Update);
router.delete('/delete/:id', Delete);

module.exports = router;