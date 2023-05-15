const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/Upload")

const { getAllOffices, createOffice  } = require("../../controllers/trip-offices/tripOfficeController");


router.get("/get", getAllOffices);
router.post("/add", upload.fields([{
    name: 'photos', maxCount: 20
  }]), createOffice);



  module.exports = router;