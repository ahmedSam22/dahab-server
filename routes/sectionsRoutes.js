const express = require("express");
const router = express.Router();

const upload = require("../middlewares/Upload")



const {
  getSections,
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");



router.post("/add",upload.single("photo"), createSection);

router.get("/all", getSections);

router.post("/update", updateSection);

router.delete("/delete", deleteSection);

module.exports = router;
