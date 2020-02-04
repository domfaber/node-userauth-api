/* User Signup & Authentication */
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users.controller.js');

// Signup
router.post('/signup', [UsersController.insert, function (req,res) {
  res.send(req.body._id);
}]);

//Signin
router.post('/signin', function (req, res) {

  //Check if email exists and password is correct
  //if not send a general message like email or password not valid

  //Sign jwt
  //Todo: Add user_id to the token payload and place the function to auth middleware
  //Todo: Add secret to env variable
  let token = jwt.sign(req.body, "dommi");
  req.body.token = token;
  //add jwt to req

  //next
  res.send(req.body.token);
});


module.exports = router;
