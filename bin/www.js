#!/usr/bin/env node
"use strict";

var fs = require('fs');
var path = require('path');
var debug = require('debug')('app');
var app = require('../app');
var models = require("../models");

var env = process.env.NODE_ENV || "development";

var server;
var overwrite = (env === "development" && process.env.OVERWRITE === "true");
app.set('port', normalizePort(process.env.PORT));

// const log = require('console-log-level')({
//    prefix: function () {
//       return new Date().toISOString()
//    },
//    level: 'debug'
// });

const logger = require("../utils/logger")(__filename);

// If force: true it will first drop tables before recreating them.
models.sequelize.sync({ logging: logger.debug, force: overwrite }).then(function () {
   /**
    * Listen on provided port, on all network interfaces.
    */
   // server = http.createServer(app).listen(app.get('port'), function (err) {
   //  debug('Express server listening on port ' + server.address().port);
   // });

   server = app.listen(app.get('port'), function (err) {
     logger.info('Express server listening on port ' + server.address().port);
   });

   server.on('error', onError);
   server.on('listening', onListening);

  logger.info('process.env.NODE_ENV :  ' + process.env.NODE_ENV);

   if (overwrite) {
     let setTestDatabase = require('../modules/setTestDatabase');
     let testDB = require('../tests/data');

     return setTestDatabase(testDB);    // test DB
   }
}).catch(function(err) {
  logger.error(err + ' on sequelize.sync error');
  process.exit(1);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  logger.info('Listening on ' + bind);
}
