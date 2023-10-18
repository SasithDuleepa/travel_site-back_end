const DB = require('./../../config/database')

const AddUser = (req,res) => {
    const {fname,lname,country,email,contact} = req.body;

    if(fname==="" || lname==="" || country==="" || email==="" || contact===""){
        res.json({
            status:400,
            message:"All fields are required"
        })
    }else{
        //check if email already exists
        const query_1 = `SELECT * FROM user WHERE email = '${email}`
        DB.connection.query(query_1,(err,result)=>{
            if(result){
                //can't register
                res.json({
                    status:400,
                    message:"Email already exists"
                })
            }else if(err){
                //can register

                //save user
                const query_2 = `INSERT INTO user (fname,lname,country,email,contact) VALUES ('${fname}','${lname}','${country}','${email}','${contact}')`
                DB.connection.query(query_2,(err,result)=>{
                    if(err){
                        res.json({
                            status:400,
                            message:"Error saving user"
                        })
                    }else if(result){
                        // res.json({
                        //     status:200,
                        //     message:"User saved successfully"
                        // })

                        //create cart for user
                        
                    }
                
            })
        }
    
})
    }
}

module.exports = AddUser;