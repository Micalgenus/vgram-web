const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const appRoot = require('app-root-path');
const env = process.env.NODE_ENV || 'development';

// root project path 찾는 방법에 대해서는 여러가지 방법이 구현되어 있으나,
// 현재는 이 방법을 사용한다.
const KRPANO_WIN_PATH = path.join(appRoot.toString(), "\\tools\\krpano-1.19-pr6-win");
const KRPANO_LINUX_PATH = path.join(appRoot.toString(), "/tools/krpano-1.19-pr6-linux");
const VTOUR_CONFIG_PATH = "templates/vtour-normal-custom.config";
const PANOTOUR_PATH = path.join("vtour", "panos");

var config = {
   // Secret key for JWT signing and encryption
   "secret": "cozyhouzz by moblab",

  "development": {
    root: rootPath,
    app: {
      name: 'cozyhouzz-web'
    },
    "hostName": "localhost",    // actual hostname for resource hosting
    "dialect": "sqlite",
    "storage": "./db.development.sqlite",
    "port": process.env.PORT || 3000,
    "krpano": {
      win: KRPANO_WIN_PATH,
      linux: KRPANO_LINUX_PATH,
      vtour_config: VTOUR_CONFIG_PATH,
      panotour_path: PANOTOUR_PATH
    },
    logLevel: "debug",
    resourcePath: "resources"   // 현재는 상대경로로만 작성해야함.(DB내 정보 삽입때문에)
  },

  "test": {
    root: rootPath,
    app: {
      name: 'cozyhouzz-web'
    },
    "krpano": {
      win: KRPANO_WIN_PATH,
      linux: KRPANO_LINUX_PATH,
      vtour_config: VTOUR_CONFIG_PATH,
      panotour_path: PANOTOUR_PATH
    },
    port: process.env.PORT || 3000,
    resourcePath: "resources"
  },

  "production": {
    root: rootPath,
    app: {
      name: 'cozyhouzz-web'
    },
     "username": "root",
     "password": "hitit113112",
     "database": "cozyhouzz",
     "host": "api.cozyhouzz.co.kr",    // for init sequellize
     "hostName": "api.cozyhouzz.co.kr",    // actual hostname for resource hosting
     "dialect": "mysql",
     "pool": {
        "max": 50,
        "min": 10,
        "idle": 10000
     },
    "krpano": {
      win: KRPANO_WIN_PATH,
      linux: KRPANO_LINUX_PATH,
      vtour_config: VTOUR_CONFIG_PATH,
      panotour_path: PANOTOUR_PATH
    },
    logLevel: "info",
    // Setting port for server
    "port": process.env.PORT || 3000,
    resourcePath: "resources",
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

module.exports = config[env];
