const express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var cors = require('cors')

const DB = require('./config/database');

const Place = require('./routes/place_routes')
const Category = require('./routes/category_routes')
const TourPackage = require('./routes/tours')
const TourCategory = require('./routes/tourCategory_routs')
const DayTour = require('./routes/dayTour_routs')

const Images = require('./routes/images_routes')

const app = express();

DB.connect()
// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())

app.use('/places', Place);
app.use('/categories', Category);
app.use('/tourpackage', TourPackage);
app.use('/tourcategory', TourCategory);
app.use('/daytour', DayTour);

app.use('/images', Images);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
