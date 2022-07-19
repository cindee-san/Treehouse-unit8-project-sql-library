var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require("./models/index.js").sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users', usersRouter);


//Error handler for requests to undefined routes 
app.use((req, res, next) => {
  var err = new Error('Oh we do not know where that page is. Please check the url and try again.')
  // console.log('404 error handler called');
  err.status = 404;
  res.render('page-not-found', { err })
  });

//global error handler
app.use((err, req, res, next) => {

  console.log('500 error being handled');
  err.status = 500;
  err.message = `Oops!  It looks like something went wrong on the server.`
  console.log(err.status);
  console.log(err.message);
  res.status(err.status || 500);
  res.render('error', { err });

});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

module.exports = app;
