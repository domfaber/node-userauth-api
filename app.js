// config variables
const config = require('./config/config.js');

var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();
//Config
const dbname = global.gConfig.database;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var dbConnectionURL;

//Create Database connection URL
switch(global.gConfig.config_id) {
  case "local":
    dbConnectionURL = "mongodb://"+global.gConfig.db_user+":"+global.gConfig.db_password+"@localhost:27017/"+dbname+"?authSource=admin";
  break;
  case "dev":
    dbConnectionURL = "mongodb+srv://"+global.gConfig.db_user+":"+global.gConfig.db_password+"@localhost:27017/"+dbname+"?authSource=admin";
  break;
  case "prod":
    dbConnectionURL = "mongodb://"+global.gConfig.db_user+":"+global.gConfig.db_password+"@mongodb:27017/"+dbname+"?authSource=userauth";
  break;
  default:
    console.log('Environment not configured');
    process.exit();

}

//let dbConnectionk8local = "mongodb+srv://root:bHyZ4M86Ym@my-release-mongodb.default.svc.cluster.local/users?authSource=admin&readPreference=primary&ssl=false";
//let dbConnectionLocalDev = "mongodb://root:bHyZ4M86Ym@localhost:27017/users?authSource=admin&readPreference=primary&ssl=false";

// Connect to DB
mongoose
  .connect(dbConnectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() =>
    console.log('connected to MongoDB')
  )
  .catch(err => {
    console.log('Failed to connect to db', err);
    process.exit();
  });
  mongoose.Promise = global.Promise;

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

module.exports = app;
