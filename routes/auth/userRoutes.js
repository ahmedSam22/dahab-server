const express = require("express")
const router = express.Router()
const {createUser , login, forgetPassword , newPassword , secondLayer} = require("../../controllers/auth/userController")


router.post("/register" ,  createUser)


router.post("/login" ,  login)

router.post("/forgetpassword", forgetPassword);
router.post("/secondlayer", secondLayer);
  
  router.post("/newpassword", newPassword);


module.exports = router 