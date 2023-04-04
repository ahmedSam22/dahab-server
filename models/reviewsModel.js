const mongoose = require('mongoose');


const reviewsSchema = new mongoose.Schema({
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
 // each comment can only relates to one blog, so it's not in array
  hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
     }
})


const Reviews = mongoose.model("Review" , reviewsSchema);

module.exports = Reviews