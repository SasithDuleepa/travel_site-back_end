const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddPlace = (req, res) => {
    // console.log(req.body)
    // console.log(req.files)
    
    const {name,description,time,fee,lat,lng} = req.body;

    if (req.files && req.files.length > 0) {
  
        

            if(name=='' || description==='' || lat==="" || lng===""){
                res.send({status:400,message:"All fields are required"})
            }else{
                // Generate a new UUID
                const Id = uuidv4();

                const query = `INSERT INTO place (place_id,place_name,place_description,place_lat,place_lng,visit_time,visiting_fee) VALUES ('${Id}','${name}','${description}',${lat},${lng},'${time}','${fee}')`;
                DB.connection.query(query, (err, result) => {
                    if (result) {
                //files save
                let processedFiles = 0;
                let UnprocessedFiles = 0;
                        
                req.files.forEach(file => {
                    const imgquery = `INSERT INTO place_img (img_name,place_id) VALUES ('${file.filename}','${Id}')`;
                    console.log(file.filename)
                    DB.connection.query(imgquery,(err,result)=>{
                        if(result){
                                processedFiles++;
                                if (processedFiles === req.files.length) {
                                // Send the response after all files have been processed
                                res.send({ status: 200, message: "Place added successfully" });
                                }
                                
                        }else if(err){
                                UnprocessedFiles++;
                                if (UnprocessedFiles === req.files.length) {
                                // Send the response after all files have been processed
                                res.send({ status: 500, message: "Place added unsuccessfull" });
                                }
                        }
                        
                        })
                        
                        
                })
                        }else{
                            res.send({status:500,message:"Error adding place"})
                        // console.log(err)
                        }
                        });
                }
}
}


module.exports = AddPlace;