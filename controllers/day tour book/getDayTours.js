const DB = require('../../config/database');

const GetDayTours = (req,res) =>{


        const query = `
        SELECT * FROM travel.daytour_book `;
        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result);
;
        
        })


}

module.exports = GetDayTours