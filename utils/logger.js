/**
 * Created by Seon-ho on 2017-09-14.
 */
"use strict";

const morgan = require('morgan'),
  winston = require('winston'),
  process = require('process'),
  moment = require('moment');

winston.emitErrs = true;

// logging level : { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'info-file',
      level: 'info',
      filename: './logs/info-logs-' + moment().format('YYYYMMDDHHmm') + "-pid_" + process.pid + '.log',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
      timestamp: function(){
        return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      }
    }),
    new winston.transports.Console({
      name: 'debug-file',
      level: 'debug',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      colorize: true,
      timestamp: function(){
        return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      }
    }),
    new winston.transports.File({
      name: 'error-file',
      filename: './logs/error-logs-' + moment().format('YYYYMMDDHHmm') + "-pid_" + process.pid + '.log',
      level: 'error',
      humanReadableUnhandledException: true,
      json: true,
      colorize: false,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      timestamp: function(){
        return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      }
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;
