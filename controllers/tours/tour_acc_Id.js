
const DB = require('../../config/database');

const GetToursAccToId = (req,res) =>{
    const { tour } = req.params;
    console.log(tour)

    try {
        // const query = `SELECT * FROM tour WHERE tour_id = '${tour}'`;
        const query = `
    SELECT
        t.*,
        td.*

    FROM
        tour t
    JOIN
        tour_date td ON t.tour_id = td.tour_id

    WHERE
        t.tour_id = '${tour}';
`;

        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            else{
                res.send(result);
                console.log(result)
            }

        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = GetToursAccToId;