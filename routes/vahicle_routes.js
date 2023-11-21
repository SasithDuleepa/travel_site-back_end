const express = require('express');

const GetVehicleAccToPassengers = require('./../controllers/vehicles/veicle_acct-_passengers')
const router = express.Router();

router.get('/:id', GetVehicleAccToPassengers);

module.exports = router;