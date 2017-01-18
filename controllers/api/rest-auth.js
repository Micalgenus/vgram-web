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
// 로그인
// header와 cookies에 id_token을 붙여서 전송
exports.login = function(req, res, next) {
   let result = auth.login(req, res);
   //헤더에 id_token을 붙임
   res.append('Authorization', result.id_token);
   res.cookie('Authorization', result.id_token);

   return res.status(200).json({
      user: result.user,    // password가 hash로 오기 때문에,
      statusCode: result.statusCode
   });
}

//회원가입
exports.register = function(req, res, next) {
   //let result =
   auth.register(req, res, next);
}

//탈퇴
// exports.quit = function (req, res, next) {
//
// }
