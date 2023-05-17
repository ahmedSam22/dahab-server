const express = require("express");
const router = express.Router();


const { getAllOfficesReviews , createOfficeReview,getOfficeReviews} = require("../../controllers/trip-offices/OfficesReviewsController");


router.get("/get", getAllOfficesReviews);
router.post("/add", createOfficeReview);
router.get("/gethotel", getOfficeReviews);



module.exports = router;