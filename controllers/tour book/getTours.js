const DB = require('../../config/database');

const GetTours = (req,res) =>{


        const query = `
        SELECT * FROM travel.tour_book `;
        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result);
;
        
        })


}

module.exports = GetTours;