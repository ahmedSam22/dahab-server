const express = require("express")
const dataConnect = require('./config/connect')
const userRoute = require("./routes/userRoutes")
const ErrorHandler = require( "./middlewares/ErrorHandler.js");

// const sectionsRoutes = require("./routes/sectionsRoutes")
const sectionRoute = require("./routes/sectionsRoutes")
const bp = require('body-parser')
const app = express()


dataConnect()
app.use(bp.json())
app.use(bp.urlencoded({
    extended: true
  }));




app.use("/", userRoute);
app.use("/sec", sectionRoute);
app.use(ErrorHandler)


// const Port = process.env.Port 

app.listen(5000,()=>{
    console.log("tamam");
    })