const mongoose = require("mongoose");

const hotelsModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    lat: String,
    lng: String,
  },
  distance: {
    type: String,
  },
  pets: {
    type: Boolean,
    default: false,
  },
  wifi: {
    type: Boolean,
    default: false,
  },
  pool: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  },
  photos: [
    {
      path: String,
    },
  ],
  // rating: [
  //   {
  //     author: String,
  //     rate: String,
  //   },
  // ],
  price: [
    {
      size: String,
      price: String,
    },
  ],
  type: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  contactNumber:{
    type : String
  },
  description:{
    type : String
  },
  breakfastFees:{
    type : String
  },
  accepted:{
    type :Boolean,
    default : true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Hotels = mongoose.model("Hotel", hotelsModel);

module.exports = Hotels;
