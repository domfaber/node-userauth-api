const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  }
});



UserSchema.pre('save', async function(next){
  const user = this;

  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt).update(this.password).digest("base64");
  this.password = salt + "$" + hash;

  next();
});



module.exports.User = mongoose.model("Users", UserSchema);
