'use strict';

var morgan = require('morgan'),
  cors = require('cors'),
  path = require('path'),
  express = require('express'),
   i18n = require('i18n'),
   passport = require('passport'),

  errorhandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  favicon = require('serve-favicon'),

  flash = require('express-flash'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
   device = require('express-device');

var app = express();

var env = process.env.NODE_ENV || "development";
var config = require("./config/main");
app.locals.ENV = env;
app.locals.mediaUrl = config.mediaUrl;    // view template에서 사용할 수 있도록 app 고정변수로 등록

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.moment = require('moment');

i18n.configure({
   locales: ['ko-kr', 'en-us'],
   cookie: 'lang',      //
   directory: __dirname + '/locales',
   defaultLocale: 'ko-kr',
   queryParameter: 'lang',
   preserveLegacyCase: true
   // api: {
   //    '__': 'i18n',  //now req.__ becomes req.t,
   //    '__n': 'i18n_n' //and req.__n can be called as req.tn
   // }
});


// session 추가
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true
}));
//
// app.use(passport.initialize());
// app.use(passport.session());

app.use(flash());
app.use(i18n.init);

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compress());
app.use(device.capture());


app.use(favicon(__dirname + '/public/favicon.ico'));
if (env === 'development') {
   app.use(express.static(__dirname + "/" + config.resource.DIR));
}
app.use(express.static(config.root + '/public'));

//2017.1.17 이정현 쿠키파서 추가
app.use(cookieParser());

app.options("*", cors());
app.use(cors({
  "origin": "*",
  "allowedHeaders": 'X-Requested-With, Content-Type, Last-modified, Content-Language, Cache-Control, Expires, Pragma, Content-Range, Content-Disposition, Content-Description, Accept, Authorization',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  "credentials": true,
  "preflightContinue": true
}));    // 왜 안먹는거지?


// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  var err = new Error(res.i18n('404 page not found'));
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
if (app.get('env') === 'production') {
   app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
         message: res.i18n("trouble in server message") || err.message,
         title: res.i18n("trouble in server title")
      });
   });
}


if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
      title: 'error'
    });
  });

  // app.use(express.logger('dev'));    // 3.X 버전에서만 실행되고 4.X 버전에서는 에러 발생.
  app.use(morgan('dev'));   // 고로, 4.X 버전에서는 morgan을 사용해야 함. logger와 같은 역할
  app.use(errorhandler());
}

const router = require('./frontRouter');

// Import routes to be served
router(app);

module.exports = app;
