const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/Upload")



const { getAllActivities, getActivity , deleteActivity , updateActivity , createActivity , toggleFavouritre , getAllFavouriteActivities}= require("../../controllers/activities/activitiesController");
const { getAllCustomises, getCustomise , deleteCustomise , updateCustomise , createCustomise} = require("../../controllers/activities/customizeActiviryController");

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



router.get("/getcustomises", getAllCustomises);
router.get("/getonecustomise", getCustomise);
router.delete("/deletecustomise", deleteCustomise);
router.post("/updatecustomise", updateCustomise);
router.post("/addcustomise" , createCustomise);



module.exports = router;