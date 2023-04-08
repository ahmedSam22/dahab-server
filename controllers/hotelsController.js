const hotels = require("../models/hotelsModel");

const getAllHotels = async (req, res, next) => {
  try {
    const allHotels = await hotels.find({}).populate("author" , '-password -securityanswer -createdAt -updatedAt -__v -securityquestion').populate("comments");
    if (allHotels) {
      console.log(allHotels);
      res.status(200).json({ data: allHotels, status: 200 });
    }
  } catch (error) {
    res.status(300).json({ data: error, status: 300 });
  }
};

const createHotel = (req, res, next) => {
  console.log(req);
  console.log(req.files.profileImage, "ksjaihuih");
  var photos = [];
  if (req.files.length > 0) {
    for (let i = 0; i < req.files.photos.length; i++) {
      photos[i] = {
        path: req.files.photos[i].path,
      };
      console.log(photos);
    }
    hotels
      .create({
        ...req.body,
        photos: photos,
        profileImage: req.files.profileImage[0].path,
        author : req.user
      })
      .then((doc) => res.status(200).json({ data: doc, status: 200 }))
      .catch((err) => res.status(300).json({ error: err, status: 300 }));
  } else {
    hotels
      .create({...req.body , profileImage: req.files.profileImage[0].path,author : req.user._id
      })
      .then((doc) => res.status(200).json({ data: doc, status: 200 }))
      .catch((err) => res.status(300).json({ error: err, status: 300 }));
  }
  // Sections.create({...req.body , photo : req.file.path})
};

module.exports = { getAllHotels, createHotel };
