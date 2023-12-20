const DB = require('./../../config/database');
const fs = require('fs').promises;

const Updatedaytour = async (req, res) => {
    const { id } = req.params;
    const { daytour, description, distance, currentImg, startDescription, places } = req.body;

    try {
        if (req.files[0]) {
            const newFileName = req.files[0].filename;
            const filePath = `./uploads/day_tour/${currentImg}`;
            await fs.unlink(filePath);
        }

        const updateQuery = `
            UPDATE day_tour 
            SET day_tour=?, description=?, distance=?, img=?, start_description=? 
            WHERE day_tour_id=?`;

        DB.connection.query(
            updateQuery,
            [daytour, description, distance, req.files[0] ? newFileName : currentImg, startDescription, id],
            (updateErr, updateResult) => {
                if (updateErr) {
                    console.log(updateErr);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (places && places.length > 0) {
                    // Delete existing places
                    const deleteQuery = `DELETE FROM day_tour_places WHERE day_tour_id=?`;

                    DB.connection.query(deleteQuery, [id], (deleteErr, deleteResult) => {
                        if (deleteErr) {
                            console.log(deleteErr);
                            return res.status(500).json({ error: 'Failed to delete existing places' });
                        }

                        // Insert new places
                        let processed = 0;
                        let unprocessed = 0;

                        places.forEach((place) => {
                            const placeQuery = `
                                INSERT INTO day_tour_places (day_tour_id, place_id, description) 
                                VALUES (?, ?, ?)`;

                            DB.connection.query(
                                placeQuery,
                                [id, place.place, place.placeDescription],
                                (placeErr, placeResult) => {
                                    if (placeErr) {
                                        console.log(placeErr);
                                        unprocessed++;
                                    } else {
                                        processed++;
                                    }

                                    if (processed + unprocessed === places.length) {
                                        if (unprocessed > 0) {
                                            return res.status(500).json({ error: 'Something went wrong' });
                                        } else {
                                            return res.status(200).json({ message: 'Day tour updated successfully' });
                                        }
                                    }
                                }
                            );
                        });
                    });
                } else {
                    return res.status(200).json({ message: 'Day tour updated successfully' });
                }
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = Updatedaytour;
