const mongoose = require("mongoose");


const hotelsModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location:
    {
      lat: String,
      lng: String,
    },
    profileImage: {
      type : String
    },
  photos: [{ 
    path : String
   }],
  // rating: [
  //   {
  //     author: String,
  //     rate: String,
  //   },
  // ],
  price: [
    {
      class: String,
      price: String,
    },
  ],
  type : {
    type : String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Hotels = mongoose.model("Hotel" , hotelsModel);

module.exports = Hotels