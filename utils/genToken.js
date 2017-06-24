/**
 * Created by KIMSEONHO on 2016-08-22.
 */
"use strict";

const jwt = require('jsonwebtoken'),
   config = require('../config/main');
   // jwksRsa = require('jwks-rsa');

// Generate JWT
// TO-DO Add issuer and audience
exports.generateToken = function(data) {
  return jwt.sign(
     data,
     config.secret,
     {
        issuer: config.auth0.ISSUER,
        audience: config.auth0.IDENTIFIER,
        algorithm: config.auth0.ALGORITHM,
        expiresIn: config.auth0.EXPIRES_IN
     });
}

exports.decodedToken = function(data) {
   return jwt.verify(
      data,
      config.secret,
      {
         issuer: config.auth0.ISSUER,
         audience: config.auth0.IDENTIFIER,
         algorithms: [config.auth0.ALGORITHM]
      });
}
