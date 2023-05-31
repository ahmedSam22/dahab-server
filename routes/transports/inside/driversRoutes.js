const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/Upload")

const { getAllDrivers, createDriver , updateDriver , getDriver  , deleteDriver} = require("../../../controllers/transports/inside/driversController");


router.get("/get", getAllDrivers);
router.post("/add", upload.fields([{
    name: 'photos', maxCount: 20
  }]), createDriver);
  // router.get("/filtered", filteredHotels);
  router.get("/getone", getDriver);
  router.post("/update", upload.fields([{
    name: 'photos', maxCount: 20
  }]),updateDriver);
  router.delete("/delete", deleteDriver);
  
  module.exports = router;