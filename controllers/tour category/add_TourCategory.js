const DB = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Add = (req,res) =>{
    // console.log(req.body)
    const {TourCategory,  Description,  Image,  Tours} = req.body;
    console.log('file nammmmme',req.files)

    const Id = uuidv4();
    const Tour_Category_Id = Id.substr(0, 6);
    const tour_category_id = 'tc-'+ Tour_Category_Id;

    let image = ''
    {req.files[0]? image = req.files[0].filename:image}
    // image = req.files[0].filename;
   

    if(TourCategory!==''){
        const query_1 = `INSERT INTO tourcategory (tourcategory_id,tourcategory_name,tourcategory_description,tourcategory_img)
                        VALUES ('${tour_category_id}','${TourCategory}','${Description}','${image}')`;
                        
        DB.connection.query(query_1,(err,result)=>{
            
            if(err){
                // res.send({status:400,message:"Something went wrong"})
                console.log(err)
            }else if(result){
               
                console.log(Tours)
                const _id = uuidv4();

                let success = 0;
                let failed = 0;
                

                Tours.forEach(element => {
                    const query_2 = `INSERT INTO tourcategory_tour (tourcategory_id,tour_id)
                                VALUES ('${tour_category_id}','${element}')`;
                                
                    DB.connection.query(query_2,(err,result)=>{
                        if(err){
                            // res.send({status:400,message:"Something went wrong"})
                            console.log(err)
                        }else if(result){
                            success++;
                            console.log(success , Tours.length)
                        }
                    })
                })

            }
        })
    }else{

    }
}
module.exports = Add;


