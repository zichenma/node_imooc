var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require ('connect-redis')(session);

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// 2. 引用路由：（在 /routes 里）
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV;

if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(logger('dev'));
} else {
     // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

// 类似于 getPostData
app.use(express.json());
// POSt数据兼容其他格式
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'WJiol#123123_',
  cookie: {
    path: '/', // 默认配置， 写不写都有
    httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000 // 24小时
  },
  store: sessionStore
}));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// 3. 注册路由 （父路由）
// 如果需要修改父路由，则只需要在此修改一次而已
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
