const express = require("express");
const router = express.Router();


const { getAllDriverReviews , createDriverReview,getDriverReviews , deleteReview} = require("../../../controllers/transports/inside/driverReviewsController");


router.get("/get", getAllDriverReviews);
router.post("/add", createDriverReview);
router.get("/getone", getDriverReviews);
router.delete("/delete", deleteReview);



module.exports = router;