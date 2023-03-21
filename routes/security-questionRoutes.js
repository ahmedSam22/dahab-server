const express = require("express");
const router = express.Router();
const {addQuestion , getQuestions , deleteQuestion} = require("../controllers/security-questionController");
  

router.post("/add" , addQuestion);
router.get("/get" , getQuestions);
router.delete("/delete" , deleteQuestion);

module.exports = router;
