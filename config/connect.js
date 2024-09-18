const mongoose = require('mongoose');

const dataConnect = async()=>{
    try {
        // console.log(process.env.MONGO_URL , "jdisajsa");
        await mongoose.connect("mongodb+srv://dahab:1312@dahab.tm9ztch.mongodb.net/?retryWrites=true&w=majority").then(console.log("connected" ,  mongoose.connection.readyState))
    } catch (error) {
        // throw Error("data cant connected ")
    }
}

module.exports = dataConnect;