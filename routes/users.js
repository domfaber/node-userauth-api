var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../middleware/auth.middleware.js');
const jwt = require('jsonwebtoken');
/* GET users listing. */
//router.get('/', [UsersController.insert]); //

//Secure routes
router.get('/me', [AuthMiddleware.validateUserToken,
                  function (req, res) {
                      res.send("Valid token. Send me data");
                    }]);

module.exports = router;
