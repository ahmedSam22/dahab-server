const express = require("express");
const router = express.Router();


const { getAllReviews , createReview , getHotelReviews , deleteHotelReviews} = require("../../controllers/hotels/reviewsController");


router.get("/get", getAllReviews);
router.post("/add", createReview);
router.delete("/delete", deleteHotelReviews);
router.get("/gethotel", getHotelReviews);



module.exports = router;