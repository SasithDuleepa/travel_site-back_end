const DB = require('./../../config/database');
const fs = require('fs').promises;


const TourUpdate = async(req,res) => {
    const {id} = req.params;
    // console.log(id);
    // console.log(req.files);
    const{ name,description,image,price,distance,dayData} = req.body;

    // if(req.files){
    //     let newfile_name = req.files[0].filename;
    //     console.log(newfile_name);
    //     if(image==='null'){
    //         const query1 = `UPDATE tour SET tour_img='${newfile_name}' WHERE tour_id='${id}'`;
    //         DB.connection.query(query1,(err,result)=>{
    //             if(result){
    //                 console.log(result);
    //             }else{
    //                 console.log(err);
    //             }
    //     })
    //     }else if(image!=='null'){
    //         //delete file from storage
    //         const filePath  = `./uploads/tour/${image}`;
    //         try {
    //             await fs.unlink(filePath);
    //             console.log('File deleted successfully');
    //             const query1= `UPDATE tour SET tour_img='${newfile_name}' WHERE tour_id='${id}'`;
    //             DB.connection.query(query1,(err,result)=>{
    //                 if(result){
    //                     console.log(result);
    //                 }else{
    //                     console.log(err);
    //                 }
    //             })
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

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
        // console.log(dayData[0]);
        // const Data = dayData[0];
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


            if(day.places.length>0){
                console.log(day.dateId)
                console.log(day.places);

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