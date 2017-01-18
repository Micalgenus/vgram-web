/**
 * Created by JHLee on 2017-01-17.
 */

"use strict";

const auth = require('../core/authentication');

exports.redirectMain = function(req, res, next) {
   // Main으로 Redirect
   let result = auth.login(req, res);
   res.append('Authorization', result.id_token);

   return res.render("index", {
      user: result.user,    // password가 hash로 오기 때문에,
      statusCode: result.statusCode
   });
}
