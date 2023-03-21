const express = require("express");
const router = express.Router();
const {
  getSections,
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");

router.post("/add", createSection);

router.get("/all", getSections);

router.post("/update", updateSection);

router.delete("/delete", deleteSection);

module.exports = router;
