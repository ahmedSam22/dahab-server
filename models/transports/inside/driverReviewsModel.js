const mongoose = require('mongoose');


const driverReviewsSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        trim: true,
        required: true
     },
     date: {
      type: Date,
      default: Date.now
   },
   rate: {
      type: Number,
      max : 5,
   },
  driver: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Drivers",
 },
})


const driversReviews = mongoose.model("DriversReviews" , driverReviewsSchema);

module.exports = driversReviews