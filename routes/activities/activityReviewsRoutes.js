const express = require("express");
const router = express.Router();


const { getAllReviews ,deleteActivityReviews, createReview,getActivityReviews} = require("../../controllers/activities/activitiesReviewsController");


router.get("/get", getAllReviews);
router.post("/add", createReview);
router.delete("/delete", deleteActivityReviews);
router.get("/getactivity", getActivityReviews);



module.exports = router;