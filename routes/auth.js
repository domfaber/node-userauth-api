/* User Signup & Authentication */
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users.controller.js');
const { User } = require("../models/users.model");


// Signup
router.post('/signup', [UsersController.insert, function (req,res) {
  res.send({_id : req.body._id});
}]);

//Signin
router.post('/signin', async function (req, res) {


  let user = await User.findOne({ email: req.body.email });
  if  (user === null) {
    res.send("Wrong email or username");
  } else {

    //Check if email exists and password is correct
    //if not send a general message like email or password not valid
    let permission = await user.isValidPassword(req.body.password);
    console.log("Permission to login"+permission);
    if (!permission) {
      res.send("Wrong email or username");
    } else {
      //Sign jwt
      //Todo: Add user_id to the token payload and place the function to auth middleware
      //Todo: Add secret to env variable
      let token = jwt.sign(req.body.email, "dommi");
      req.body.token = token;
      //add jwt to req
      res.send({token : token, userId : user._id});
    }
  }




  //next
});


module.exports = router;
