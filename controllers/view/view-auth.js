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
   //res.append('Authorization', result.id_token);
   // let token = res.cookies.name;
    //let token = req.get('Authorization');
   // let token = req.cookies.Authorization;
   // return res.send(token);
   // console.log(token);
   // //console.log(token);
   // if(token) {    // token exist
   //    //res.render('/');
   //    // return next();
   // } else {    // not exist
   //    //return res.render("change", {});
   // }

   //return next(new Error("view-auth Login Error"));
}

exports.register = function (req, res, next) {

}

exports.quit = function (req, res, next){

}
