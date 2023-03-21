const mongoose = require("mongoose");


const sectionModel = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    image: {
        type : String,
        default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    color: {
        type : String,
        default : "ff0000"
    },
},
{
    timestamps : true
})




const Sections = mongoose.model("Section" , sectionModel);

module.exports = Sections