const express = require('express');

const AddHotels = require('../controllers/hotels/addHotels');
const {GetHotels, GetLuxuryHotels, GetSemiluxuryHotels} = require('../controllers/hotels/get_hotels');
const HotelPrices = require('../controllers/hotels/get_hotelPrices');
const PriceAccToHotelAndDate = require('../controllers/hotels/price_accto_hotel_date');

const router = express.Router();


router.post('/add', AddHotels);
router.get('/hotels', GetHotels);
router.get('/luxury', GetLuxuryHotels);
router.get('/semi', GetSemiluxuryHotels);

router.get('/prices/:id', HotelPrices);
router.get('/price/:id/:date', PriceAccToHotelAndDate);    

module.exports = router;