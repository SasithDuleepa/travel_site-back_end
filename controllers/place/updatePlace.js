const DB = require('./../../config/database');
const fs = require('fs').promises;

const PlaceUpdate = async(req,res) =>{
    const {id} = req.params;
    const{coverImgs,cardImg,deletedImgs,   name,lat ,lng,time,fee,description,short} = req.body;
    const{newCoverImg,newCardImg,newImgs}= req.files;
    console.log(req.body);
    // console.log(deletedImgs);

    if(newCardImg  ){
        if(cardImg==='null'){
            const query1= `UPDATE place SET card_img='${newCardImg[0].filename}' WHERE place_id='${id}'`;
            DB.connection.query(query1,(err,result)=>{
                    if(result){
                        console.log(result);
                    }else{
                        console.log(err);
                    }
            })
        }else if(cardImg!=='null'){
            //delete file from storage
            const filePath  = `./uploads/places/${cardImg}`;
            try {
                await fs.unlink(filePath);
                console.log('File deleted successfully');
                const query1= `UPDATE place SET card_img='${newCardImg[0].filename}' WHERE place_id='${id}'`;
                DB.connection.query(query1,(err,result)=>{
                        if(result){
                            console.log(result);
                        }else{
                            console.log(err);
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }

    if(newCoverImg){
        if(coverImgs==='null'){
            const query2= `UPDATE place SET cover_img='${newCoverImg[0].filename}' WHERE place_id='${id}'`;
            DB.connection.query(query2,(err,result)=>{
                    if(result){
                        console.log(result);
                    }else{
                        console.log(err);
                    }
                })
        }else if(coverImgs!=='null'){
            //delete file from storage
            const filePath  = `./uploads/places/${coverImgs}`;
            try {
                await fs.unlink(filePath);
                console.log('File deleted successfully');
                const query2= `UPDATE place SET cover_img='${newCoverImg[0].filename}' WHERE place_id='${id}'`;
                DB.connection.query(query2,(err,result)=>{
                    if(result){
                        console.log(result);
                    }else{
                        console.log(err);
                    }
                })
            } catch (error) {
                console.log(error)
            }
            
            
        }
    }

    if (deletedImgs) {
        if (Array.isArray(deletedImgs) && deletedImgs.length > 0) {
            deletedImgs.forEach(async (image) => {
                const filePath = `./uploads/places/${image}`;
                try {
                    await fs.unlink(filePath);
                     //delete image
                const query3= `DELETE FROM place_img WHERE img_name='${image}'`;
                DB.connection.query(query3,(err,result)=>{
                    if(result){
                        console.log(result);
                    }else{
                        console.log(err);
                    }
                })
                } catch (error) {
                    console.log(error);
                }
            });
        } else {
            const filePath = `./uploads/places/${deletedImgs}`;
            try {
                await fs.unlink(filePath);

                //delete image
                const query3= `DELETE FROM place_img WHERE img_name='${deletedImgs}'`;
                DB.connection.query(query3,(err,result)=>{
                    if(result){
                        console.log(result);
                    }else{
                        console.log(err);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    if(newImgs){
        console.log(newImgs);
        newImgs.forEach(async (img) => {
            const query4= `INSERT INTO place_img (place_id,img_name) VALUES ('${id}','${img.filename}')`;
            DB.connection.query(query4,(err,result)=>{
                if(result){
                    console.log(result);
                }else{
                    console.log(err);
                }
            })
        })
    }

    if(name,lat ,lng,time,fee,description,short){
        const query5= `UPDATE place SET place_name='${name}',place_description='${description}',place_lat=${lat},place_lng=${lng},visit_time='${time}',visiting_fee='${fee}',short_description='${short}' WHERE place_id='${id}'`;
        DB.connection.query(query5,(err,result)=>{
            if(result){
                console.log(result);
            }else{
                console.log(err);
            }
        })
    }




  

}

module.exports = PlaceUpdate;