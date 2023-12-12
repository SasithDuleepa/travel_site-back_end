const DB = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddTourCategory = (req, res) => {
    const { packageName, description, price, dayData, distance } = req.body;
    console.log(req.body);
    const image = req.files[0].filename;
    const TourPackegeId = uuidv4();
    const Tour_Packeg_Id = TourPackegeId.substr(0, 6);
    const tour_packeg_id = 'tp-' + Tour_Packeg_Id;

    if (packageName !== '' || description !== '' || price !== '' || dayData !== '') {
        const query_1 = `INSERT INTO tour (tour_id, tour_name, tour_description, tour_price, tour_img, distance) 
                        VALUES (?, ?, ?, ?, ?, ?)`;
        const values_1 = [tour_packeg_id, packageName, description, price, image, distance];

        DB.connection.query(query_1, values_1, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ status: 400, message: 'Something went wrong' });
            }

            // Days
            let dayDataArray = JSON.parse(dayData);
            dayDataArray.forEach(async (element) => {
                const DayId = uuidv4();
                const Day_Id = DayId.substr(0, 6);
                const day_id = 'tp-day-' + Day_Id;

                const query_2 = `INSERT INTO tour_date (tour_date_id, tour_id, tour_date, luxary_hotel, semi_hotel, start_description)
                                VALUES (?, ?, ?, ?, ?, ?)`;
                const values_2 = [day_id, tour_packeg_id, element.day, element.luxury, element.semiluxury, element.startdescription];

                try {
                    await executeQuery(query_2, values_2);

                    // Places
                    for (const place of element.places) {
                        const query_3 = `INSERT INTO tour_places (tour_date_id, tour_places_id, tour_place_description)
                                        VALUES (?, ?, ?)`;
                        const values_3 = [day_id, place.placeId, place.description_place];

                        await executeQuery(query_3, values_3);
                    }
                } catch (error) {
                    console.error(error);
                    return res.status(400).json({ status: 400, message: 'Something went wrong' });
                }
            });

            res.status(200).json({ status: 200, message: 'Tour package added successfully' });
        });
    } else {
        res.status(400).json({ status: 400, message: 'Invalid input parameters' });
    }
};

const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        DB.connection.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = AddTourCategory;
