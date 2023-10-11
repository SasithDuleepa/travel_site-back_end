const express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var cors = require('cors')

const DB = require('./config/database');

const Place = require('./routes/place_routes')

const app = express();

DB.connect()
// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())

app.use('/places', Place);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
