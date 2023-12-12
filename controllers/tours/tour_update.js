const DB = require('./../../config/database');
const fs = require('fs').promises;


const TourUpdate = async(req,res) => {
    const {id} = req.params;
    // console.log(id);
    // console.log(req.files);
    const{ name,description,image,price,distance,dayData} = req.body;
    console.log(req.body);

    if(name,description,price,distance){
        const query2= `UPDATE tour SET tour_name='${name}',tour_description='${description}',tour_price=${price},distance='${distance}' WHERE tour_id='${id}'`;
        DB.connection.query(query2,(err,result)=>{
            if(result){
                console.log(result);
            }else{
                console.log(err);
            }
        })
    }

    if(dayData){
        dayData.forEach(async(day,Index)=>{
            console.log(`Day ${day.day} - Date ID: ${day.dateId}`);

            delete data
            const query3 = `DELETE FROM tour_date WHERE tour_date_id='${day.dateId}'`;
            DB.connection.query(query3,(err,result)=>{
                if(result){
                    console.log(result);
                    const query4= `INSERT INTO tour_date (tour_date_id,tour_id,tour_date,luxary_hotel,semi_hotel,start_description) 
                    VALUES ('${day.dateId}','${id}','${day.day}','${day.luxury_hotel}','${day.semi_hotel}','${day.day_sartDescription}')`;
                    DB.connection.query(query4,(err,result)=>{
                        if(result){
                            console.log(result);
                        }else{
                            console.log(err);
                        }
                    })
                }else{
                    console.log(err);
                }
            })


            if( day.places && day.places.length>0){

                //delete data
                const query3 = `DELETE FROM tour_places WHERE tour_date_id='${day.dateId}'`;
                DB.connection.query(query3,(err,result)=>{
                    if(result){
                        console.log(result);
                        day.places.forEach(async(place)=>{
                            const query4= `INSERT INTO tour_places (tour_date_id,tour_places_id,tour_place_description) 
                            VALUES ('${day.dateId}','${place.place_id}','${place.tour_place_description}')`
                            DB.connection.query(query4,(err,result)=>{
                                if(result){
                                    console.log(result);
                                }else{
                                    console.log(err);
                                }
                            })
                            
                        })
                    }else{
                        console.log(err);
                    }
                })
            }
        })
            

    }
}

module.exports = TourUpdate;