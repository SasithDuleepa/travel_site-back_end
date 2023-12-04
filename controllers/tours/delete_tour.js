const DB = require('../../config/database');
const fs = require('fs').promises;

const DeleteTour = async(req,res) =>{
    const {id} = req.params;
    console.log(id)
    if(id){
        //delete from tour catergory
        const query1 = `DELETE FROM tourcategory_tour WHERE tour_id = '${id}'`;
        DB.connection.query(query1,(err,result)=>{
            if(err) throw err;
            console.log(result)
        })


        //delete image from file
        const query5 = `SELECT tour_img FROM tour WHERE tour_id = '${id}'`;
        DB.connection.query(query5,(err,result)=>{
            if(result){
                if(result.length>0){
                    const image = result[0].tour_img;
                    const path = `./uploads/tour/${image}`;
                    try {
                        fs.unlink(path);
                        
                        
                    } catch (error) {
                        console.log(error);
                    }
                    

                }

            }else{
                console.log(err);
            }
        })


        

        //delete from tour
        
        //get day id
        const query = `SELECT tour_date_id FROM tour_date WHERE tour_id = '${id}'`;
        DB.connection.query(query,(err,result)=>{
            if(result){
                console.log(result)
                if(result.length>0){
                    result.forEach((element) => {
                        const query2 = `DELETE FROM tour_places WHERE tour_date_id = '${element.tour_date_id}'`;
                        DB.connection.query(query2,(err,result)=>{
                            if(err) throw err;
                            console.log(result)
                        })
                    });
                }
            }else(
                console.log(err)
            )
        }
            )


        //delete from tour date
        const query3 = `DELETE FROM tour_date WHERE tour_id = '${id}'`;
        DB.connection.query(query3,(err,result)=>{
            if(err) throw err;
            console.log(result)
        })

        //delete from tour
        const query4 = `DELETE FROM tour WHERE tour_id = '${id}'`;
        DB.connection.query(query4,(err,result)=>{
            if(err) throw err;
            console.log(result)
        })



        

    }
}
module.exports= DeleteTour;