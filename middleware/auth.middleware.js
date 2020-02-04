const jwt = require('jsonwebtoken');

exports.validateUserToken = (req, res, next) => {
  try {
    //Verify token
    jwt.verify(req.headers.token, "dommi");
    console.log("token should be valid");
    return next();
  } catch(err) {
    return res.status(400).send({error: 'Invalid refresh token'});

  }
}
