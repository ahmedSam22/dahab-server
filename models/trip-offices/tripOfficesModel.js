const mongoose = require("mongoose");

const tripOfficeModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    lat: String,
    lng: String,
  },
  contactNumber: {
    type: String,
  },
  description: {
    type: String,
  },
  photos: [
    {
      path: String,
    },
  ],
  accepted: {
    type: Boolean,
    default: true,
  },
  outside: {
    type: Boolean,
    default: true,
  },
  customise: {
    type: Boolean,
    default: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const tripOffice = mongoose.model("Tripoffices", tripOfficeModel);

module.exports = tripOffice;
