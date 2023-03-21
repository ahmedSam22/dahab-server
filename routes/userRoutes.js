const express = require("express")
const router = express.Router()
const {createUser , login, forgetPassword , newPassword} = require("../controllers/userController")


router.post("/register" ,  createUser)


router.post("/login" ,  login)

router.post("/forgetpassword", forgetPassword);
  
  router.post("/newpassword", newPassword);


module.exports = router 