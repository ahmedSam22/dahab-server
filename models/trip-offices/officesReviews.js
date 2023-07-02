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
   ref: "Tripoffice",
 },
})


const OfficesReviews = mongoose.model("OfficeReview" , officeReviewsSchema);

module.exports = OfficesReviews