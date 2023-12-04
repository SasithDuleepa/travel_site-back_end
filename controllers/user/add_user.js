const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddUser = (req,res) => {
    const {fName,email,password} = req.body;
    const userId = uuidv4();

    if(fName==="" ||email==="" || password===""){
        res.json({
            status:400,
            message:"All fields are required"
        })
    }else{
        //check if email already exists
        const query_1 = `SELECT * FROM user WHERE email = '${email}';`
        DB.connection.query(query_1,(err,result)=>{
            if(err){
                console.log(err)
                res.json({
                    status:400,
                    message:"Error checking email"
                })
            }else if(result){
                console.log(result)
                if(result.length>0){
                    //can't register
                    res.json({
                        status:400,
                        message:"Email already exists"
                    })
                }else{
                    //can register
    
                    //save user
                    const query_2 = `INSERT INTO user (user_id,fname,email,password,user_role) VALUES ('${userId}','${fName}','${email}','${password}','user')`
                    DB.connection.query(query_2,(err,result)=>{
                        if(err){
                            console.log(err)

                            res.json({
                                status:400,
                                message:"Error saving user"
                            })
                        }else if(result){
                            res.json({
                                status:200,
                                message:"User saved successfully"
                            })
                        }
    
                            //create cart for user
                        //     const cart_id = `cart-${userId}`;
                        //     const query_3 = `INSERT INTO cart (cart_id,user_id) VALUES ('${cart_id}','${userId}')`
                        //     DB.connection.query(query_3,(err,result)=>{
                        //         if(err){
                        //             res.json({
                        //                 status:400,
                        //                 message:"Error creating cart"
                        //             })
                        //         }else if(result){
                        //             res.json({
                        //                 status:200,
                        //                 message:"User saved successfully"
                        //             })
    
 
                        //         }
                            
                        // })
    
                      
                })
            }
            }
})
    }

}




            
    




module.exports = AddUser;