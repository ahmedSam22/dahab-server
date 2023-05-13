const mongoose = require("mongoose");


const securityModel = new mongoose.Schema({
    question :{
        type : String,
        required : true,
        
    }
})

const Questions = mongoose.model("Question" , securityModel)

module.exports = Questions