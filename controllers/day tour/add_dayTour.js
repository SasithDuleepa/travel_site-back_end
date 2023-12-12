
const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddDayTour = (req,res) =>{
    console.log(req.body)
    console.log(req.files)
    const{daytour,description,distance, places,startDescription} = req.body;
    let img = "null"
    {req.files[0]? img = req.files[0].filename:img}

    const Id = uuidv4();
    if(daytour!==''&& description!==''&& places!==''&& distance!==''){

        const query = `INSERT INTO day_tour (day_tour_id,day_tour,description,img,start_description,distance) VALUES ('${Id}','${daytour}','${description}','${img}','${startDescription}','${distance}')`;
        DB.connection.query(query,(err,result)=>{
            if(err){
                res.status(400).send({  message: "Something went wrong" });
           
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
                                
                                Unprocessed++;
                                if (Unprocessed === places.length) {
                                
                                res.status(400).send({  message: "Something went wrong" });
                                }
                            }else if(result){
                                // console.log(result)
                                
                                processed++;
                                if (processed === places.length) {
                                
                                res.status(200).send({  message: "Day Tour Added" });
                                }
                            }
                        })
                        
                    })

                }
               
            }
        })


    }else{
        res.status(400).send({  message: "Something went wrong" });
    }
    
}

    


module.exports = AddDayTour;