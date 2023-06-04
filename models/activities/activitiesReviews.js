const mongoose = require('mongoose');


const activityReviewsSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    activity:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity'
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
 
})


const ActivityReview = mongoose.model("ActivityReviews" , activityReviewsSchema);

module.exports = ActivityReview