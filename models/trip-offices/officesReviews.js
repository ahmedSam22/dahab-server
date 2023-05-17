const mongoose = require('mongoose');


const officeReviewsSchema = new mongoose.Schema({
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
  office: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Tripoffices",
 },
})


const OfficeReview = mongoose.model("OfficeReviews" , officeReviewsSchema);

module.exports = OfficeReview