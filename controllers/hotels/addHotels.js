const DB = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddHotels = (req,res)=>{
    console.log(req.body)
    const id_1 = uuidv4();
    const _Id = id_1.substr(0, 6);
    const ID = 'hotel-'+ _Id;
    
    try {
        const {hotelName,lat,lng,category,prices} = req.body;
        if(hotelName!=='' || lat!=="" ||lng!=="" ||category!==""){
            const query = `INSERT INTO hotel (hotel_id, hotel_name, hotel_lat, hotel_lang, hotel_category ) VALUES ('${ID}','${hotelName}','${lat}','${lng}','${category}')`;
            DB.connection.query(query,(err,result)=>{
                if(result){
                    console.log(result)
                    prices.forEach(element => {
                        const query_1 = `INSERT INTO hotel_prices (hotel_id,start_date,end_date,price ) VALUES ('${ID}','${element.dayStart}','${element.dayEnd}','${element.price}')`;
                        DB.connection.query(query_1,(err,result)=>{
                            if(result){
                                console.log(result)
                            }else{
                                console.log(err)
                            }
                        })
                    })

                }else{
                    console.log(err)
                }
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}
module.exports = AddHotels;