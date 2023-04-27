const express = require("express");
const router = express.Router();
const upload = require("../middlewares/Upload")


const {
    getAllHotels,
    getHotel,
    updateHotel,
    createHotel,
    getDistance,
    toggleFavouritre,
    getAllFavouriteHoterls,
    filteredHotels
  } = require("../controllers/hotelsController");


router.get("/get", getAllHotels);
// router.get("/filtered", filteredHotels);
router.get("/getOne", getHotel);
router.post("/update", updateHotel);
router.post("/add", upload.fields([{
  name: 'photos', maxCount: 20
}, {
  name: 'profileImage', maxCount: 1
}]), createHotel);

router.get("/getz", getDistance);
router.get("/favourite", toggleFavouritre);
router.get("/allfavourite", getAllFavouriteHoterls);


module.exports = router;