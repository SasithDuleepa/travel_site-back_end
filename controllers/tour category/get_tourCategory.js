const DB = require('../../config/database');

const GetTourCategories = (req,res) =>{
    const query = `SELECT * FROM tourcategory`;
    DB.connection.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        else{
            res.status(200).send(result);
        }
    })
}
module.exports = GetTourCategories;