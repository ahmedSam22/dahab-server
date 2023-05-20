const mongoose = require("mongoose");

const activityModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },

    time :{
        from : String,
        to : String
    },

    duration: {
        type : String
    },

    description: {
        type : String
    },

    photos: [
        {
          path: String,
        },
      ],

      price: {
        type : Number
    },
    accepted:{
        type :Boolean,
        default : true
      },
    office: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tripoffice'
     },
     author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

})



const Activities = mongoose.model("Activity" , activityModel);

module.exports = Activities