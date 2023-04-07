const express = require("express")
const dataConnect = require('./config/connect')
const userRoute = require("./routes/userRoutes")
const questionRoute = require("./routes/security-questionRoutes")
const hotelsRoute = require("./routes/hotelsRoutes")
const reviewsRoute = require("./routes/reviewsRoutes")
const auth = require('./middlewares/Auth');

var cors = require('cors')


const ErrorHandler = require( "./middlewares/ErrorHandler.js");

// const sectionsRoutes = require("./routes/sectionsRoutes")
const sectionRoute = require("./routes/sectionsRoutes")
const bp = require('body-parser')
const app = express()



app.use(cors())

app.use(bp.json())
app.use(bp.urlencoded({
    extended: true
  }));



app.use("/", userRoute);
app.use("/sec", auth ,sectionRoute);
app.use("/question", questionRoute);
app.use("/hotels" ,  hotelsRoute);
app.use("/reviews", auth , reviewsRoute);
app.use(ErrorHandler)
app.use(express.static('uploads'))


// const Port = process.env.Port 

dataConnect().then(_=>{
  app.listen(5000,()=>{
    console.log("tamam");
    })
})