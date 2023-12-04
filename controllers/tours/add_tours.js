const DB = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddTourCategory = (req,res) =>{
    const {packageName,description,price,dayData,distance} = req.body;
    console.log(req.body)
    const image = req.files[0].filename;
    const TourPackegeId = uuidv4();
    const Tour_Packeg_Id = TourPackegeId.substr(0, 6);
    const tour_packeg_id = 'tp-'+ Tour_Packeg_Id;

    if(packageName !== '' || description !== '' || price !== '' || dayData !== ''){
        const query_1 = `INSERT INTO tour (tour_id,tour_name,tour_description,tour_price,tour_img,distance) 
                        VALUES ('${tour_packeg_id}','${packageName}','${description}','${price}','${image}','${distance}')`;
                        
        DB.connection.query(query_1,(err,result)=>{
            
            if(err){
                res.send({status:400,message:"Something went wrong"})
                // console.log(err)
            }else if(result){
                // console.log(result)

                //Days
                let dayDataArray = JSON.parse(dayData);
                dayDataArray.forEach(element => {
                    const DayId = uuidv4();
                    const Day_Id = DayId.substr(0, 6);
                    const day_id = 'tp-day-'+Day_Id;
                    const query_2 = `INSERT INTO tour_date (tour_date_id,tour_id,tour_date,luxary_hotel,semi_hotel,start_description)
                                    VALUES ('${day_id}','${tour_packeg_id}','${element.day}','${element.luxury}','${element.semiluxury}','${element.startdescription}')`;
                                    
                    DB.connection.query(query_2,(err,result)=>{
                        if(err){
                            // console.log(err)
                            res.send({status:400,message:"Something went wrong"})
                        }else if(result){
                            // console.log(result)
                            // console.log(element.places)
                           
                            let place_sucsess = 0;
                            let place_failed = 0;
                            element.places.forEach(place => {
                            const query_3 = `INSERT INTO tour_places (tour_date_id,tour_places_id,tour_place_description)
                                            VALUES ('${day_id}','${place.placeId}','${place.description_place}')`;
                                            
                            DB.connection.query(query_3,(err,result)=>{
                                if(err){
                                   
                                    place_failed++;
                                    
                                }else if(result){
                                    
                                    place_sucsess++;
                                    console.log( place_sucsess ,element.places.length )
                                    
                                }
                            }
                            )
                            if(place_failed === element.places.length){
                                res.send({status:400,message:"Something went wrong"})
                            }else if(place_sucsess === element.places.length){
                                console.log( place_sucsess ,element.places.length )
                                res.send({status:200,message:"Tour package added successfully"})
                            }
                           
                        }
                        )
                    }
                    })
                
            })
        }
            
    })
}
    
    else{}
    

}

module.exports = AddTourCategory;




