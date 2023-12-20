const DB = require('./../../config/database');
const fs = require('fs').promises;

const TourUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image, price, distance, dayData } = req.body;

        if (name && description && price && distance) {
            const updateQuery = `UPDATE tour SET tour_name=?, tour_description=?, tour_price=?, distance=? WHERE tour_id=?`;

            DB.connection.query(updateQuery, [name, description, price, distance, id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                console.log(result);
            });
        }

        if (dayData) {
            for (const day of dayData) {
                console.log(`Day ${day.day} - Date ID: ${day.dateId}`);

                // Delete tour_date data
                const deleteDateQuery = `DELETE FROM tour_date WHERE tour_date_id=?`;
                await DB.connection.query(deleteDateQuery, [day.dateId]);

                // Insert new tour_date data
                const insertDateQuery = `INSERT INTO tour_date (tour_date_id, tour_id, tour_date, luxary_hotel, semi_hotel, start_description) 
                    VALUES (?, ?, ?, ?, ?, ?)`;

                await DB.connection.query(insertDateQuery, [day.dateId, id, day.day, day.luxury_hotel, day.semi_hotel, day.day_startDescription]);

                if (day.places && day.places.length > 0) {
                    // Delete tour_places data
                    const deletePlacesQuery = `DELETE FROM tour_places WHERE tour_date_id=?`;
                    await DB.connection.query(deletePlacesQuery, [day.dateId]);

                    // Insert new tour_places data
                    for (const place of day.places) {
                        const insertPlacesQuery = `INSERT INTO tour_places (tour_date_id, tour_places_id, tour_place_description) 
                            VALUES (?, ?, ?)`;

                        await DB.connection.query(insertPlacesQuery, [day.dateId, place.place_id, place.tour_place_description]);
                    }
                }
            }
        }

        return res.status(200).json({ message: 'Tour updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = TourUpdate;
