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
  distance: {
    type: String,
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
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
  },
  accepted: {
    type: Boolean,
    default: true,
  },
  outside: {
    type: Boolean,
    default: false,
  },
  customise: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const tripOffices = mongoose.model("Tripoffice", tripOfficeModel);

module.exports = tripOffices
