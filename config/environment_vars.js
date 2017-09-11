'use strict';

var _, vars;
var dotenv = require('dotenv'),
   _ = require('lodash');
const path = require('path');

// var log = require('console-log-level')({
//    prefix: function () {
//       return new Date().toISOString()
//    },
//    level: "error"
// });

var envPath;
if (process.env.NODE_ENV === "development") {
   envPath = '.test.env';
} else if (process.env.NODE_ENV === "production") {
   envPath = '.env';
} else {
   throw new Error("no env file found.");
}

dotenv.config({path: envPath});    // loading .env and write to process.env

vars = {
   NODE_ENV: process.env.NODE_ENV || "development",
   LOG_LEVEL: "debug",
  PORT: 3000,

  MEDIA_SERVER_URL: "http://localhost:3001",

  AUTH0_DOMAIN: "",
   AUTH0_CLIENT_ID: "",
   AUTH0_CLIENT_SECRET: "",
   AUTH0_CALLBACK_URL: "",
   AUTH0_JWKS_URI: "",
   AUTH0_IDENTIFIER: "",
   AUTH0_ISSUER: "",
   AUTH0_JWT_EXPIRATION: 18000,
   AUTH0_ALGORITHM: "RS256",

   APP_NAME: "vgram",
};

_.forEach(vars, function(value, key){
  var keyType = typeof vars[key];

  if (_.has(process.env, key)){
    vars[key] = process.env[key];

    if (keyType === 'number') {
      vars[key] = +(vars[key]);
    }

    // cast any boolean strings to proper boolean values
    if (vars[key] === 'true'){
      vars[key] = true;
    }
    if (vars[key] === 'false'){
      vars[key] = false;
    }
  }

});

// Add external sources from environment vars
// vars.externalSources = {};
// Object.keys(vars).concat(Object.keys(process.env)).filter(function(key) {
//   return (/^EXTERNAL_SOURCE_/).test(key);
// }).forEach(function(key) {
//   vars.externalSources[key.substr('EXTERNAL_SOURCE_'.length).toLowerCase()] = process.env[key] || vars[key];
// });

// A few helpers to quickly determine the environment
vars.development = vars.NODE_ENV === 'development';
vars.test        = vars.NODE_ENV === 'test';
vars.production  = vars.NODE_ENV === 'production';


module.exports = vars;
