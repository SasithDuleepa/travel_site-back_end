const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddPlace = (req, res) => {
  if (!req.files || !req.files.cardImg || !req.files.coverImgs || !req.files.files) {
    return res.status(400).json({ message: "No files attached" });
  }

  const { name, description, time, fee, lat, lng, shortDescription } = req.body;

  if (!name || name === "" || !description || !time || !fee || !lat || !lng || !shortDescription) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Generate a new UUID
  const Id = uuidv4();

  const query = `INSERT INTO place (place_id, place_name, place_description, place_lat, place_lng, visit_time, visiting_fee, short_description, card_img, cover_img, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`;

  DB.connection.query(
    query,
    [Id, name, description, lat, lng, time, fee, shortDescription, req.files.cardImg[0].filename, req.files.coverImgs[0].filename],
    (err, result) => {
      if (err || !result) {
        console.error(err);
        return res.status(500).json({ message: "Error adding place" });
      }

      // Process files
      let processedFiles = 0;

      req.files.files.forEach(file => {
        const imgQuery = `INSERT INTO place_img (img_name, place_id) VALUES (?, ?)`;
        DB.connection.query(imgQuery, [file.filename, Id], (imgErr, imgResult) => {
          if (imgResult) {
            processedFiles++;
            if (processedFiles === req.files.files.length) {
              // Send the response after all files have been processed
              return res.status(200).json({ message: "Place added successfully" });
            }
          } else if (imgErr) {
            console.error(imgErr);
            return res.status(500).json({ message: "Error adding place" });
          }
        });
      });
    }
  );
};

module.exports = AddPlace;
