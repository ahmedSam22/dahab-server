const hotels = require("../models/hotelsModel");



const getAllHotels = async (req,res,next)=>{
    try {
        const allHotels = await hotels.find({}).populate('comments','text');
        if (allHotels) {
          console.log(allHotels);
          res.status(200).json({ data: allHotels, status: 200 });
        }
      } catch (error) {
        res.status(300).json({ data: error, status: 300 });
      }
}


const createHotel = (req, res , next) =>{
  // console.log(req.files.path , "hhh");

if(req.file){
  hotels.create({...req.body ,profileImage : req.file.path, photos : req.files}).then((doc) => res.status(200).json({ data: doc, status: 200 }))
  .catch((err) => res.status(300).json({ error: err, status: 300 }));
}else{ 
  hotels.create(req.body).then((doc) => res.status(200).json({ data: doc, status: 200 }))
  .catch((err) => res.status(300).json({ error: err, status: 300 }));
}
    // Sections.create({...req.body , photo : req.file.path})
  }

module.exports = { getAllHotels , createHotel};
