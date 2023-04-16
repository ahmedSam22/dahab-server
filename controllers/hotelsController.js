const hotels = require("../models/hotelsModel");

const getAllHotels = async (req, res, next) => {
  const {page = 1 , limit = 10} = req.query;
  try {
    const allHotels = await hotels.find({});
    const links = Math.floor((allHotels.length / limit) + 1);
    const Hotels = await hotels.find({}).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("comments").limit(limit).skip((page  - 1) * limit)
    if (allHotels) {

      console.log(allHotels);
      res.status(200).json({ links : links , data: Hotels, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};

const getHotel = async (req, res, next) => {
  console.log(req.body , "jhuah");
  try {
    const Hotel = await hotels.findOne({ _id: req.body.hotel_id }).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("comments");
    if (Hotel) {
      console.log(Hotel);
      res.status(200).json({ data: Hotel, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};

const updateHotel = async (req, res, next) => {
  console.log(req.body , "ikuyhygufguh");

  try {
    const Hotel = await hotels.findOneAndUpdate(req.body._id, req.body, { returnDocument: "after" })
    if (Hotel) {
      console.log(Hotel);
      res.status(200).json({ data: Hotel, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};


const createHotel = (req, res, next) => {
  console.log(req);
  console.log(req.files.profileImage, "ksjaihuih");
  var photos = [];
  var body = {
    ...req.body,
    author : req.user._id
  }
  if (req.files.photos) {
    for (let i = 0; i < req.files.photos.length; i++) {
      photos[i] = {
        path: req.files.photos[i].path,
      };
      console.log(photos);
    }
    body.photos = photos


  } 
  if (req.files.profileImage) {
    body.profileImage = req.files.profileImage[0].path
  } 
  hotels
  .create(body)
  .then((doc) => res.status(200).json({ data: doc, status: 200 }))
  .catch((err) => res.status(300).json({ error: err, status: 300 }));

};

module.exports = { getAllHotels, getHotel , updateHotel , createHotel };
