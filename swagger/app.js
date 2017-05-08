'use strict';

var path = require('path');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

// { fittingsDirs, viewsDirs, swaggerFile, appRoot, configDir
var config = {
  appRoot: path.normalize(__dirname + "/..") // required config
};
config.swaggerFile = config.swagger = path.resolve(config.appRoot + "/swagger/api/swagger/swagger.yaml");

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/test']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
