/**
 * Created by KIMSEONHO on 2017-01-10.
 */
"use strict";

const auth = require('../core/authentication');

/**
 * passport의 LocalStrategy(ID, Password)를 이용함
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.login = function(req, res, next) {
   let result = auth.login(req, res);

   res.append('Authorization', result.id_token);

   return res.status(200).json({
      user: result.user,    // password가 hash로 오기 때문에,
      statusCode: result.statusCode
   });
}
