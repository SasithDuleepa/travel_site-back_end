const express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')

const DB = require('./config/database');

const Place = require('./routes/place_routes')
const Category = require('./routes/category_routes')
const Tour = require('./routes/tours_routes')
const TourCategory = require('./routes/tourCategory_routs')
const DayTour = require('./routes/dayTour_routs')
const Hotels = require('./routes/hotel_routes')
const PopularPlace =require('./routes/popularPlace_routes')
const Vehicles = require('./routes/vahicle_routes')
const User = require('./routes/user_routes')
const Book = require('./routes/bookTour_routes')

const Images = require('./routes/images_routes')

const app = express();

DB.connect()
// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

app.use('/places', Place);
app.use('/categories', Category);
app.use('/tour', Tour);
app.use('/tourcategory', TourCategory);
app.use('/daytour', DayTour);
app.use('/hotels', Hotels);
app.use('/popular', PopularPlace);
app.use('/vehicles', Vehicles);
app.use('/book', Book);

app.use('/images', Images);


app.use('/user', User);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
