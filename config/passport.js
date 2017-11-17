"use strict";

/**
 * Created by KIMSEONHO on 2016-08-16.
 */
// Importing Passport, strategies, and config
const passport = require('passport'),
   config = require('./main.js'),
   message = require('../utils/staticValue').statusMessage,

   genToken = require("../utils/genToken"),
   JwtStrategy = require('passport-jwt').Strategy,
   ExtractJwt = require('passport-jwt').ExtractJwt,
   Auth0Strategy = require('passport-auth0');

// const jwksRsa = require('jwks-rsa');

// Custom extractor function for passport-jwt
const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['authorization'];
    if (token) token = token.replace('Bearer ', '');
  }

  return token;
};

// Custom extractor function for passport-jwt
const emptyExtractor = function(req) {
   // 로그인 하지 않은 회원의 경우 데이터 조회는 가능할 수 있도록 passport error가 발생하지 않게
   // 접근방지를 해제하기 위한 Trick, user object를 {}로 처리함
   // 서버 부하, 보안문제가 생길 수 있기 때문에, 근본적인 해결방빕이 필요할듯

   return genToken.generateToken({});
};

// Setting JWT strategy options
// 만료된 토큰에 대한 전략이 필요함(갱신등)
const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  // jwtFromRequest: ExtractJwt.fromAuthHeader(),
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderWithScheme("Bearer"), cookieExtractor, emptyExtractor]),
  // Telling Passport where to find the secret
   secretOrKey: config.secret,      // only HS256 algorithm support
   // secretOrKey: config.secret || jwksRsa.expressJwtSecret({
  //    cache: true,
  //    rateLimit: true,
  //    jwksRequestsPerMinute: 5,
  //    jwksUri: config.auth0.JWKS_URI
  // }),
  // auth_token: 'JWT'
   failureFlash: true,
   passReqToCallback: true,
   ignoreExpiration: true,
   issuer: config.auth0.ISSUER,
   // audience: config.auth0.IDENTIFIER,
   algorithms: [config.auth0.ALGORITHM]
   // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
const jwtWebLogin = new JwtStrategy(jwtOptions, function (req, payload, done) {
  // console.log(payload);

   var expired = payload.exp - parseInt(new Date().getTime() / 1000) < 0 ? true : false;

   // 토큰이 만료되었음.
   // 만료된 토큰에 대한 추가 갱신 로직이 필요할 것 같다.
   if (expired) {
      return done(null, { expired: true, logined: false }, {
         message: message.error.tokenExpired
      });
   }

   // login이 되지 않은 회원에게 error를 출력하지 않기 위헤서 user object를
   // 아래와 같이 { logined: false }로 전송함
   if (!payload["email"]) {
      return done(null, { logined: false }, {
         message: message.error.requiredLogin
      });
   }

  let profile_token = req.cookies['user_profile_token'];
   if (profile_token) {
     let profile = genToken.decodedToken(profile_token);
     payload.profile = profile;
   }

  payload.logined = true;
   return done(null, payload);
});

const auth0options = {
   domain: config.auth0.DOMAIN,
   clientID: config.auth0.CLIENT_ID,
   clientSecret: config.secret,
   callbackURL: config.auth0.CALLBACK_URL
};

// Configure Passport to use Auth0
const auth0Login = new Auth0Strategy(auth0options, (accessToken, refreshToken, extraParams, profile, done) => {
   var result = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      idToken: extraParams.id_token,
      tokenType: extraParams.token_type,
      expiresIn: extraParams.expires_in,
      profile: profile._json
   }

   // console.log("refreshToken");
   // console.log(refreshToken);

   return done(null, result);
});

passport.use(jwtWebLogin);
passport.use(auth0Login);
