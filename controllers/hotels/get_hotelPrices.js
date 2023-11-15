
const DB = require('./../../config/database');

const HotelPrices = (req,res) =>{
    
    try {
        const{id} = req.params;
        const query = `SELECT * FROM hotel_prices WHERE hotel_id = ${id}`;
            DB.connection.query(query,(err,result)=>{
                if(err) throw err;
                else{
                    res.json(result);
                }
            })
        
    } catch (error) {
        console.log(error)
    }
}
module.exports  = HotelPrices;