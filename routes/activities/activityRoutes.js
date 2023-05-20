const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/Upload")



const { getAllActivities, getActivity , deleteActivity , updateActivity , createActivity , toggleFavouritre , getAllFavouriteActivities}= require("../../controllers/activities/activitiesController");


router.get("/get", getAllActivities);

router.post("/add", upload.fields([{
    name: 'photos', maxCount: 20
  }]), createActivity);

router.post("/update",upload.fields([{
    name: 'photos', maxCount: 20
  }]), updateActivity);


router.get("/getone", getActivity);

router.delete("/delete", deleteActivity);

router.get("/favourite", toggleFavouritre);
router.get("/allfavourite", getAllFavouriteActivities);

module.exports = router;