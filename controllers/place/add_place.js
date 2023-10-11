const DB = require('./../../config/database');

const AddPlace = (req, res) => {
    console.log(req.body);
    const {name,description,lat,lng} = req.body;
    if(name=='' || description==='' || lat==="" || lng===""){
        res.send({status:400,message:"All fields are required"})
    }else{
        const query = `INSERT INTO place (place_name,place_description,place_lat,place_lng) VALUES ('${name}','${description}',${lat},${lng})`;
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


    



module.exports = AddPlace;