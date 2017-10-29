/**
 * Created by KIMSEONHO on 2017-10-30.
 */
"use strict";

const requestp = require('request-promise');
const _ = require('lodash');

const config = require('../../config/main');
const genToken = require("../../utils/genToken");

exports.getAdminToken = function() {
  var options = {
    method: 'POST',
    url: config.auth0.ISSUER + 'oauth/token',
    headers: {
      'content-type': 'application/json'
    },
    body: {
      grant_type: 'client_credentials',
      client_id: config.auth0.CLIENT_ID,
      client_secret: config.auth0.CLIENT_SECRET,
      audience: config.auth0.IDENTIFIER
    },
    json: true
  };

  return requestp(options).then(function (body) {
    return body.access_token;
  });
}

exports.setToken = function (req, res, next) {

  // {
  //    accessToken: accessToken,
  //    idToken: extraParams.id_token,
  //    tokenType: extraParams.token_type,
  //    expiresIn: extraParams.expires_in,
  //    profile: profile
  // }

  // delete unused property to reduce cookie character
  req.user.profile = _.omit(req.user.profile,
    ['given_name', 'family_name', 'picture_large', 'context', 'age_range', 'devices',
      'favorite_teams', 'name_format']);  // 페이스북 불필요 prop 삭제

  let userToken = genToken.generateToken(req.user.profile); // passport에서 받은 object

  // header와 cookies에 id_token을 붙여서 전송
  res.clearCookie('authorization');
  res.clearCookie('access_token');
  res.clearCookie('user_profile_token');

  // cdn.auth0.com/js/lock/10.18.0/lock.min.js:9 Set-Cookie header is ignored in response from
  // url: http://localhost:3000/auth/login-callback?code=fKx9Jp018uW-K1cT.
  // Cookie length should be less than or equal to 4096 characters.
  // res.cookie('authorization', [req.user.tokenType, userToken].join(" "));
  res.cookie('authorization', [req.user.tokenType, req.user.idToken].join(" "));
  res.cookie('access_token', req.user.accessToken);
  res.cookie('user_profile_token', userToken);

  return next();
}
