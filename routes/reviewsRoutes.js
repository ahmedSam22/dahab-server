const express = require("express");
const router = express.Router();


const { getAllReviews , createReview} = require("../controllers/reviewsController");


router.get("/get", getAllReviews);
router.post("/add", createReview);



module.exports = router;