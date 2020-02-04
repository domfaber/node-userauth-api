const { User } = require('../models/users.model');

exports.insert = async (req, res, next) => {
  let user = new User(req.body);
  try {
      await user.save();
      req.body._id = user._id;
      return next();
      
  } catch(err) {
    res.send(err);
  }
};
