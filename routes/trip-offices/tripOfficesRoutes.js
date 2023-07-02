const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/Upload")

const { getAllOffices, createOffice , updateOffice , getOffice , toggleFavouritreOffice , getAllFavouriteOffices,deleteOffice} = require("../../controllers/trip-offices/tripOfficeController");


router.get("/get", getAllOffices);
router.post("/add", upload.fields([{
    name: 'photos', maxCount: 20
  }]), createOffice);
  // router.get("/filtered", filteredHotels);
  router.get("/getOne", getOffice);
  router.post("/update", updateOffice);
  // router.get("/getDistance", getDistance);
  router.get("/favourite", toggleFavouritreOffice);
  router.get("/allfavourite", getAllFavouriteOffices);
  router.delete("/deleteoffice", deleteOffice);
  
  module.exports = router;