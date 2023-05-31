const express = require("express");
const router = express.Router();


const { getAllOfficesReviews , createOfficeReview,getOfficeReviews , deleteReview} = require("../../controllers/trip-offices/OfficesReviewsController");


router.get("/get", getAllOfficesReviews);
router.post("/add", createOfficeReview);
router.get("/getoffice", getOfficeReviews);
router.delete("/deletereview", deleteReview);



module.exports = router;