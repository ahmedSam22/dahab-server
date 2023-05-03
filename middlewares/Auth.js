const jwt = require('jsonwebtoken');
const users = require("../models/userModel");



const protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
  
        //decodes token id
        const decoded = jwt.verify(token, "uyteyrzdxtfyli;o'p'098769ot86t");
  
        req.user = await users.findById(decoded.id).select("-password -securityanswer -securityquestion -createdAt -updatedAt -__v");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  
    if (!token) {
      next()
    }
  }

module.exports = protect