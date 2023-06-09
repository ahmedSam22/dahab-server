const jwt = require("jsonwebtoken");
const users = require("../../models/auth/userModel");
const bcrypt = require("bcryptjs");

const createUser = (req, res) =>{
  try {
    users
    .create(req.body)
    .then((doc) => res.status(200).json({ data: doc, status: 200 }))
    .catch((err) => res.status(300).json({ error: err, status: 300 }));
  } catch (error) {
    throw error(error)
  }

  }

const login = async (req, res, next) => {

try {
    const query = { phone: req.body.phone };

  const user = await users.findOne(query).exec();

  if (!user) {
    return next({message :"username not verified"});

  }

  const verified = user.comparePassword(req.body.password);
  if (!verified) {
    return next({message :"password not verified"});
  }

  if (user && verified) {
    console.log("login success");
    // next(user);
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
        maxAge: "2d",
      },
      "uyteyrzdxtfyli;o'p'098769ot86t"
    );
    const {createdAt,email,phone,name } = user;
    res.json({ user: {createdAt,email,phone,name },token, status: 200 }).status(200);
  } else {
    next("wrong");
    res.json({ data: "password can't match", status: 300 });
    return;
  }
} catch (error) {
  throw error(error)
}


};

const forgetPassword = async (req, res, next) => {


  try {
     const query = { phone: req.body.phone };

  const user = await users.findOne(query).exec();

  if (!user) {
    console.log("from user");
    res.json("user not found").status(300);
    return;
  }


  if (user) {
    // return nationalID
    res.json({status : 200 , user}).status(200);
    
    console.log("it's okay yasta");
  }
  } catch (error) {
  throw error(error)
    
  }
 
};

const secondLayer = async (req, res, next) => {


  try {
      const query = { phone: req.body.phone };

  const user = await users.findOne(query).exec();

  if (!user) {
    console.log("from user");
    res.json("user not found").status(300);
    return;
  }

  const verified = user.compareAnswer(req.body.answer);

  if (!verified) {
    console.log("from user");
    res.json("Answer Is wrong").status(300);
    return;
  }

  if (user) {
    // return nationalID
    res.json({status : 200}).status(200);
    
    console.log("it's okay yasta");
  }
  } catch (error) {
  throw error(error)
    
  }

};

const newPassword = (req, res, next) => {


try {
    // const user = await users.findOne({nationalID}).exec();
  const query = { phone: req.body.phone };

  if (req.body.password != req.body.confirmPassword) {

    
    res.json({ data: "user Not Found", status: 300 }).status(300);
    return;
  }
  // console.log(user);
  const hash = bcrypt.hashSync(req.body.password, 10);
  const updated = users
    .findOneAndUpdate(query, { password: hash })
    .then((result) => {
      console.log("tamam", result);
      res.status(200).json({ data: "updated", status: 200 });
      return;
    })
    .catch((err) => {
      res.status(300).json({ data: "fail", status: 300 });
    });
  console.log(updated);
} catch (error) {
  throw error(error)
  
}


};



module.exports = { createUser, login, forgetPassword, newPassword,secondLayer };
