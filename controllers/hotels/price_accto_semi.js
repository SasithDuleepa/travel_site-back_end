

const PriceAcctoLuxury = (req,res) =>{
    const { id, date } = req.params;
    console.log(id, date);

    if(id && date){
        const formattedDate = new Date(date).toISOString().split('T')[0];
            const query = `SELECT hp.price
                            FROM travel.tour_date td
                            JOIN travel.hotel_prices hp ON td.semi_hotel = hp.hotel_id 
                            WHERE td.tour_id = '${id}'
                            AND hp.start_date <= ${formattedDate}
                            AND hp.end_date >= ${formattedDate};`
                            DB.connection.query(query, (err, result) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).json({ error: 'Internal Server Error' });
                                } else {
                                    console.log(result);
                                    res.json(result);
                                }
                            })
    }
}

module.exports = PriceAcctoLuxury;