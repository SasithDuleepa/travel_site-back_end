const DB = require('./../../config/database');
const fs = require('fs').promises;

const Updatedaytour = async (req, res) => {
    const { id } = req.params;
    // console.log(req.body);

    const { daytour, description, distance, price, currentImg, startDescription, places } = req.body;
    console.log(places);

    try {
        if (req.files[0]) {
            const newFileName = req.files[0].filename;
            const filePath = `./uploads/day_tour/${currentImg}`;
            await fs.unlink(filePath);
            console.log('File deleted successfully');
        }

        const query1 = `
            UPDATE day_tour 
            SET day_tour='${daytour}', description='${description}', distance='${distance}', price='${price}', img='${req.files[0] ? newFileName : currentImg}', start_description='${startDescription}' 
            WHERE day_tour_id='${id}'`;

        DB.connection.query(query1, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            let processed = 0;
            let unprocessed = 0;

            if (places && places.length > 0) {
                // Delete existing places
                const deleteQuery = `DELETE FROM day_tour_places WHERE day_tour_id='${id}'`;
                DB.connection.query(deleteQuery, (deleteErr, deleteResult) => {
                    if (deleteErr) {
                        console.log(deleteErr);
                        return res.status(500).json({ error: 'Failed to delete existing places' });
                    }

                    // Insert new places
                    places.forEach((place) => {
                        const placeQuery = `
                            INSERT INTO day_tour_places (day_tour_id, place_id, description) 
                            VALUES ('${id}', '${place.place}', '${place.placeDescription}')`;

                        DB.connection.query(placeQuery, (placeErr, placeResult) => {
                            if (placeErr) {
                                console.log(placeErr);
                                unprocessed++;
                                if (unprocessed === places.length) {
                                    return res.status(500).json({ error: 'Something went wrong' });
                                }
                            } else {
                                processed++;
                                if (processed === places.length) {
                                    return res.status(200).json({ message: 'Day tour updated successfully' });
                                }
                            }
                        });
                    });
                });
            } else {
                return res.status(200).json({ message: 'Day tour updated successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = Updatedaytour;
