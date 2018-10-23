var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
//var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var leadersRouter = require('./routes/leaderRouter');
var dishesRouter = require('./routes/dishRouter');
var promosRouter = require('./routes/promoRouter');
var favoriteRouter = require('./routes/favoriteRouter');
var commentRouter = require('./routes/commentRouter');

const url = process.env.DATABASEURL;
const connect = mongoose.connect(url, {useNewUrlParser: true});

connect.then((db) => {
  console.log('Connected to server successfully');
}, (err) => {
  console.log(err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('123456-789-0'));
app.use(session({
  name: 'session-id',
  secret: '123-4456-79980',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);


// function auth(req, res, next) {
//   if(!req.user) {
//     var err = new Error('You are not authenticated!');
//     err.status = 403;
//     next(err);
//   } else {
//     next();
//   }
  
// }

// app.use(auth);

//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/dishes', dishesRouter);
app.use('/api/promotions', promosRouter);
app.use('/api/leaders', leadersRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/comments', commentRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })
}

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
  res.render('error');
});

module.exports = app;
