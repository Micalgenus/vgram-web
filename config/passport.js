/**
 * Created by KIMSEONHO on 2016-08-16.
 */
// Importing Passport, strategies, and config
const passport = require('passport'),
   models = require('../models'),
   //2017.1.13 이정현 주석 처리
   //Member = models.Member,
   users = models.users,
   config = require('./main.js'),
   JwtStrategy = require('passport-jwt').Strategy,
   ExtractJwt = require('passport-jwt').ExtractJwt,
   LocalStrategy = require('passport-local');

// Setting username field to email rather than username
const localOptions = {
   usernameField: 'email',
   passwordField: 'password'
}

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['Authorization'];
    if (token) token = token.replace('Bearer ', '');
  }

  return token;
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
   //2017.1.13 이정현 주석 처리
   //Member.findOne({where: {email: email}}).then(function (user) {
   users.findOne({where: {email: email}}).then(function (user) {

      if (!user) {
         return done(null, false, {
            errorMsg: 'Your login details could not be verified. Please try again.',
            statusCode: 0
         });
      }
      //유저상태가 1이 아니면 활성화 되어있는게 아님(탈퇴되었거나 휴면계정)
      if(user.user_status != 1) {
         return done(null, false, {
            errorMsg: 'quit user',
            statusCode: 3
         });
      }

      user.comparePassword(password, function (err, isMatch) {
         if (err) {
            return done(err);
         }
         if (!isMatch) {
            return done(null, false, {
               errorMsg: "Your login details could not be verified. Please try again.",
               statusCode: 2
            });
         }

         return done(null, user);    // user로 넘어가니까 받는 router의 req에서 user라는 이름의 object를 사용할 수 있다.
      });
   }).catch(function (err) {
      if (err) {
         return done(err);
      }
   });
});

// Setting JWT strategy options
const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  // jwtFromRequest: ExtractJwt.fromAuthHeader(),
  jwtFromRequest: cookieExtractor,
  // Telling Passport where to find the secret
  secretOrKey: config.secret,
  // auth_token: 'JWT'

  // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  console.log(payload);
  users.findOne({where: {email: payload.email}}).then(function (user) {
    if (user) {
      done(null, user);   // localStrategy와 같다.
    } else {
      done(null, false);
    }
  }).catch(function (err) {
    if (err) {
      return done(err, false);
    }
  });
  //
  // Member.findById(payload.idx).then(function(user) {
  //   if (user) {
  //     done(null, user);   // localStrategy와 같다.
  //   } else {
  //     done(null, false);
  //   }
  // }).catch(function(err) {
  //   if (err) { return done(err, false); }
  // });
});

passport.use(jwtLogin);
passport.use(localLogin);
