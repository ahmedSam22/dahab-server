const mongoose = require("mongoose");

const driverModel = new mongoose.Schema({
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
  photos: [
    {
      path: String,
    },
  ],
  driverimage:[
    {
      path: String,
    },
  ],
  price: {
    type: Number,
  },
  cartype: {
    type: String,
  },
  contactnumber: {
    type: String,
  },
  accepted: {
    type: Boolean,
    default: true,
  },
  available:{
    type : Boolean,
    default : true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Driver = mongoose.model("Drivers", driverModel);

module.exports = Driver;
