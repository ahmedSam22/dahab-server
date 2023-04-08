const express = require("express");
const router = express.Router();
const upload = require("../middlewares/Upload")


const {
    getAllHotels,
    createHotel
  } = require("../controllers/hotelsController");


router.get("/get", getAllHotels);
router.post("/add", upload.fields([{
  name: 'photos', maxCount: 20
}, {
  name: 'profileImage', maxCount: 1
}]), createHotel);



module.exports = router;