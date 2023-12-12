const express = require('express');

const AddHotels = require('../controllers/hotels/addHotels');
const {GetHotels, GetLuxuryHotels, GetSemiluxuryHotels} = require('../controllers/hotels/get_hotels');
const HotelPrices = require('../controllers/hotels/get_hotelPrices');
const PriceAccToHotelAndDate = require('../controllers/hotels/price_accto_hotel_date');

const PriceAcctoLuxury = require('../controllers/hotels/price_accto_luxury');

const PriceAcctoSemiLuxury = require('../controllers/hotels/price_accto_semi');

const {AdminAuthenticate} = require('./../middleware/auth/admin_authenticate');

const router = express.Router();


router.post('/add', AdminAuthenticate,AddHotels);
router.get('/hotels', GetHotels);
router.get('/luxury', GetLuxuryHotels);
router.get('/semi', GetSemiluxuryHotels);

router.get('/prices/:id', HotelPrices);
router.get('/price/:id/:date', PriceAccToHotelAndDate);    

router.get('/luxury/price/:id/:date', PriceAcctoLuxury);

router.get('/semi/price/:id/:date', PriceAcctoSemiLuxury);

module.exports = router;