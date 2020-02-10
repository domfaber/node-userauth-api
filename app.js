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
const dbname = "domnode1";
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Connect to DB
mongoose
  .connect("mongodb://localhost/"+dbname, {
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
