const express = require("express");
const router = express.Router();
const upload = require("../middlewares/Upload")


const {
    getAllHotels,
    createHotel
  } = require("../controllers/hotelsController");


router.get("/get", getAllHotels);
router.post("/add",upload.single("profileImage"), createHotel);



module.exports = router;