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

})

activityModel.pre("save" , function(next){
    const dur = +time.from - +time.to;
    this.duration = dur;
    next()
})


const Activities = mongoose.model("Activity" , activityModel);

module.exports = Activities