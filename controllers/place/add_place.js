const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddPlace = (req, res) => {
    // console.log(req.body)
   
    
    const {name,description,time,fee,lat,lng,shortDescription} = req.body;
    if (req.files.files) {
        let cardImg=null;
        cardImg = req.files.cardImg[0];
        let coverImgs=null;
        coverImgs = req.files.coverImgs[0];
        let files =null;
        files = req.files.files;

       

        console.log("name ",name)

            if(name==="" ){
                console.log('no required fields')
                res.status(400).send({message:"All fields are required"})
            }else{
                // Generate a new UUID
                const Id = uuidv4();

                const query = `INSERT INTO place (place_id,place_name,place_description,place_lat,place_lng,visit_time,visiting_fee,short_description,card_img,cover_img,status) VALUES ('${Id}','${name}','${description}',${lat},${lng},'${time}','${fee}','${shortDescription}','${cardImg.filename}','${coverImgs.filename}','active')`;
                DB.connection.query(query, (err, result) => {
                    if (result) {
                        console.log(result)
                //files save
                let processedFiles = 0;
                let UnprocessedFiles = 0;
                        
                files.forEach(file => {
                    const imgquery = `INSERT INTO place_img (img_name,place_id) VALUES ('${file.filename}','${Id}')`;
                    console.log(file.filename)
                    DB.connection.query(imgquery,(err,result)=>{
                        if(result){
                                processedFiles++;
                                if (processedFiles === req.files.length) {
                                // Send the response after all files have been processed
                                res.status(200).send({message:"Place added successfully"});
                                }
                                
                        }else if(err){
                                UnprocessedFiles++;
                                if (UnprocessedFiles === req.files.length) {
                                // Send the response after all files have been processed
                                res.status(500).send({message:"Error adding place"});
                                }
                        }
                        
                        })
                        
                        
                })
                        }else{
                            res.status(500).send({message:"Error adding place"});
                        console.log(err)
                        }
                        });
                }
    }else{
        res.status(500).send({message:"Error adding place"});
    }
}


module.exports = AddPlace;