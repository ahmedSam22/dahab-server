const mongoose = require("mongoose");

const customizeActivityModel = new mongoose.Schema({
    placename: {
        type: String,
        required: true,
      },

    time :{
        from : String,
        to : String
    },

    description: {
        type : String
    },

    price: {
        type : Number
    },

    accepted:{
        type :Boolean,
        default : false
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



const CustomizeActivities = mongoose.model("CustomizeActivity" , customizeActivityModel);

module.exports = CustomizeActivities