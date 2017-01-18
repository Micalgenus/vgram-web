/**
 * Created by KIMSEONHO on 2017-01-10.
 */

"use strict";

const auth = require('../core/authentication');
/**
 * show login view if not login(no sessio
 * @param req
 * @param res
 * @param next
 * @returns {String}
 */
exports.login = function(req, res, next) {
   // 로그인이 되어있으면 로그인을 하지 않고 redirect 시킴(jwt 확인);
   //let result = auth.login(req, res);
   //res.append('Authorization', result.id_token);
   // let token = res.cookies.name;
   //let token = req.get('Authorization');

   console.log(req.cookies);

  /* if(token) {    // token exist
      return next();
   } else {    // not exist
      return res.render("login", {});
   }

   return next(new Error("view-auth Login Error"));*/
}

exports.register = function (req, res, next) {

}
