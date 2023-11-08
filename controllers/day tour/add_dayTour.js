
const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddDayTour = (req,res) =>{
    console.log(req.body)
    console.log(req.files)
    const{daytour,description,price, places,startDescription} = req.body;
    let img = "null"
    {req.files[0]? img = req.files[0].filename:img}

    const Id = uuidv4();
    if(daytour!==''&& description!==''&&price!==''&& places!==''){

        const query = `INSERT INTO day_tour (day_tour_id,day_tour,description,price,img,start_description) VALUES ('${Id}','${daytour}','${description}','${price}','${img}','${startDescription}')`;
        DB.connection.query(query,(err,result)=>{
            if(err){
                res.send({status:400,message:"Something went wrong"})
                console.log(err)
            }else if(result){
                // console.log(result)
                let processed = 0;
                let Unprocessed = 0;
                if(places && places.length >0){
                    places.forEach(place => {
                        console.log(place.place)
                        const placequery = `INSERT INTO day_tour_places (day_tour_id,place_id,description) VALUES ('${Id}','${place.place}','${place.placeDescription}')`;
                        DB.connection.query(placequery,(err,result)=>{
                            if(err){
                                console.log(err)
                                Unprocessed++;
                                if (Unprocessed === places.length) {
                                
                                res.send({ status: 500, message: "Something went wrong" });
                                }
                            }else if(result){
                                // console.log(result)
                                
                                processed++;
                                if (processed === places.length) {
                                
                                res.send({ status:200, message: " Day tour added successfully " });
                                }
                            }
                        })
                        
                    })

                }
               
            }
        })


    }else{
        res.send({status:400,message:"All fields are required"})
    }
    
}

    


module.exports = AddDayTour;