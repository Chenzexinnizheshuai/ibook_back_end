var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


//路由
var pos_api = require('./routes/position');
var admin_api = require('./routes/admin');
var user_api = require('./routes/user');
// var del_api = require('./routes/del');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var saveRouter = require('./routes/save');
var {version} = require('./models/version')
var a = require('./routes/ar')
var multer = require('multer')
var app = express();
var upload = multer({dest : 'uploads/img'})

// express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  httpOnly: false, secure: false, maxAge: 1000 * 60 * 5 }
}))

//测试
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(`/api/${version}/position`,pos_api)
app.use(`/api/${version}/admin`,admin_api)
app.use(`/api/${version}/user`,user_api)
// app.use(`/api/${version}/del`,del_api)

app.use('/a',a)
// app,use('/save',saveRouter)

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
