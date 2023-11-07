const path = require('path');

const TourImg = (req,res) => {
    res.sendFile(path.join(__dirname, `../../uploads/images/tour hero.png`))
}
const HomeHeroImg1 = (req,res) => {}

module.exports = {
    TourImg,
    HomeHeroImg1
}