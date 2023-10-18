const DB = require('./../../config/database');

const AddPlace = (req, res) => {
    console.log(req.body);
    let filename = null;
    const {name,description,time,lat,lng} = req.body;

    if (req.files && req.files.length > 0) {
       
        console.log(req.files)
        for(let i=0;i<req.files.length;i++){
            filename = req.files[i].filename;
            console.log(filename)

        }
        

            if(name=='' || description==='' || lat==="" || lng===""){
                res.send({status:400,message:"All fields are required"})
            }else{
                const query = `INSERT INTO place (place_name,place_description,place_lat,place_lng,visit_time) VALUES ('${name}','${description}',${lat},${lng},'${time}')`;
                DB.connection.query(query, (err, result) => {
                    if (result) {
                console.log(result)
                        // res.send({status:200,message:"Place added successfully"})
            const imgquery = `INSERT INTO place_img (img_name,place_id) VALUES ('${filename}')`;
                    }else{
                        res.send({status:500,message:"Error adding place"})
                        console.log(err)
                    }
            });
               
            }

       
     
     
    
}
}


    



module.exports = AddPlace;