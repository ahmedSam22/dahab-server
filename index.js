const express = require("express")
const dataConnect = require('./config/connect')
const userRoute = require("./routes/auth/userRoutes")
const questionRoute = require("./routes/auth/security-questionRoutes")
const hotelsRoute = require("./routes/hotels/hotelsRoutes")
const reviewsRoute = require("./routes/hotels/reviewsRoutes")
const tripOfficesRoute = require("./routes/trip-offices/tripOfficesRoutes")
const officeReviewsRoute = require("./routes/trip-offices/officesReviews")
const activitiesRoute = require("./routes/activities/activityRoutes")
const activitiesReviewsRoute = require("./routes/activities/activityReviewsRoutes")
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
app.use("/question" , questionRoute);
app.use("/hotels" , auth ,  hotelsRoute);
app.use("/reviews", auth , reviewsRoute);
app.use("/offices", auth , tripOfficesRoute);
app.use("/officesreviews", auth , officeReviewsRoute);
app.use("/activities", auth , activitiesRoute);
app.use("/activitiesreviews", auth , activitiesReviewsRoute);
app.use(ErrorHandler);
app.use(express.static('uploads'));

const Port = 5000

dataConnect().then(_=>{
  app.listen(Port,()=>{
    console.log("tamam");
    })
})