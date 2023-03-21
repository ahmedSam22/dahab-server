const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")


const userModel = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true,
        unique: true
    },
    phone : {
        type : Number,
        required: true,
        unique: true

    },
    securityquestion : {
        type : String,
        required : true
    },
    securityanswer : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required: true,
        minlength: 5
    }
},
{
    timestamps : true
})

//compare 
userModel.methods.comparePassword =  function(password){
    return bcrypt.compareSync(password, this.password)
}


//hash
userModel.pre("save" , function(next){
    const hash = bcrypt.hashSync(this.password , 10);
    this.password = hash;
    next()
})




//hash Answer 
userModel.pre("save" , function(next){
    const hash = bcrypt.hashSync(this.securityanswer , 10);
    this.securityanswer = hash;
    next()
})

//compare security answer 
userModel.methods.compareAnswer =  function(securityanswer){
    return bcrypt.compareSync(securityanswer, this.securityanswer)
}


const Users = mongoose.model("User" , userModel);

module.exports = Users