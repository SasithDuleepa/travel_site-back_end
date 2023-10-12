const DB = require('./../../config/database');

const AddPlace = (req, res) => {
    console.log(req.body);
    let filename = null;
    const {name,description,time,lat,lng} = req.body;

    if (req.files && req.files.length > 0) {
        filename = req.files[0].filename;
        
     
      console.log(filename);
    if(name=='' || description==='' || lat==="" || lng===""){
        res.send({status:400,message:"All fields are required"})
    }else{
        const query = `INSERT INTO place (place_name,place_description,place_lat,place_lng,visit_time,place_img) VALUES ('${name}','${description}',${lat},${lng},'${time}','${filename}')`;
        DB.connection.query(query, (err, result) => {
            if (result) {
                res.send({status:200,message:"Place added successfully"})
            }else{
                res.send({status:500,message:"Error adding place"})
                console.log(err)
            }
    });
       
    }
}
}


    



module.exports = AddPlace;