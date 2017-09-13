const path = require('path');
const rootPath = require('app-root-path');      // path.normalize(__dirname + '/..');
const NODE_ENV = process.env.NODE_ENV || 'development';
const env_var = require("./environment_vars");

var config = {
   "development": {
      "host": "localhost",    // actual hostname for resource hosting
      "dialect": "sqlite",
      "storage": "./db.development.sqlite",
      "mediaUrl": "http://localhost:3001",    // 미디어/이미지 서버 URL
      // "mediaUrl": "http://image.cozyhouzz.co.kr:3000"     // 미디어/이미지 서버 URL
   },

   "test": {
   },

   "production": {
      "username": "root",
      "password": "hitit113112!",
      "database": "cozyhouzz",
      "host": "api.cozyhouzz.co.kr",    // The host of the relational database.
      "hostName": "api.cozyhouzz.co.kr",    // actual hostname for resource hosting,
      "mediaUrl": "http://image.vgram.kr",     // 미디어/이미지 서버 URL
      "dialect": "mysql",
      "pool": {
         "max": 50,
         "min": 10,
         "idle": 10000
      },
      // Configuring Mailgun API for sending transactional email
      "mailgun_priv_key": "mailgun private key here",
      // Configuring Mailgun domain for sending transactional email
      "mailgun_domain": "mailgun domain here",
      // Mailchimp API key
      "mailchimpApiKey": "mailchimp api key here",
      // Stripe API key
      "stripeApiKey": "stripe api key goes here"
   }
}

config[NODE_ENV].secret = env_var.AUTH0_CLIENT_SECRET;  // Secret key for JWT signing and encryption
config[NODE_ENV].root = rootPath.path;
config[NODE_ENV].mediaUrl = env_var.MEDIA_SERVER_URL;
config[NODE_ENV].LOG_DIR = env_var.LOG_DIR;

config[NODE_ENV].app = {
   name: env_var.APP_NAME
};

config[NODE_ENV].auth0 = {
   DOMAIN: env_var.AUTH0_DOMAIN,
   CLIENT_ID: env_var.AUTH0_CLIENT_ID,
   CLIENT_SECRET: env_var.AUTH0_CLIENT_SECRET,
   CALLBACK_URL: env_var.AUTH0_CALLBACK_URL,
   JWKS_URI: env_var.AUTH0_JWKS_URI,
   IDENTIFIER: env_var.AUTH0_IDENTIFIER,
   ISSUER: env_var.AUTH0_ISSUER,
   EXPIRES_IN: env_var.AUTH0_JWT_EXPIRATION,
   ALGORITHM: env_var.AUTH0_ALGORITHM
}

module.exports = config[NODE_ENV];
