var createError = require('http-errors');
var express = require('express');
const expressValidator = require('express-validator');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalogs');  //Import routes for "catalog" area of site

var app = express();
const middlewareOptions = {

};
app.use(expressValidator(middlewareOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/paka', indexRouter);
//app.use('/users', usersRouter);
app.use('/v1', catalogRouter);  // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.json({
        message: JSON.stringify(err.message),
        error: err
    });
});

module.exports = app;
