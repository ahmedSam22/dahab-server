const mongoose = require('mongoose');


const activityReviewsSchema = new mongoose.Schema({
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
  activity: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Activity",
 },
})


const ActivityReview = mongoose.model("ActivityReviews" , activityReviewsSchema);

module.exports = ActivityReview