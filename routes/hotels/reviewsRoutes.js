const express = require("express");
const router = express.Router();


const { getAllReviews , createReview , getHotelReviews} = require("../../controllers/hotels/reviewsController");


router.get("/get", getAllReviews);
router.post("/add", createReview);
router.get("/gethotel", getHotelReviews);



module.exports = router;