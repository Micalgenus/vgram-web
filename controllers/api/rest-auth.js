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
//이메일을 받으면 정보와 메타데이터를 전송 하는 api
exports.info = function(req, res, next) {

   let result;
   //콜백함수에서 데이터 반환
   auth.info(req, res, function(data) {
      result = data;

      return res.status(201).json({
         user_info: result.user_info,
         status: result.status
      });
   });

}

// 로그인
exports.login = function(req, res, next) {

   let result = auth.login(req, res);

   // header와 cookies에 id_token을 붙여서 전송
   res.append('Authorization', result.id_token);
   res.cookie('Authorization', result.id_token);

   return res.status(201).json({
      id_token: result.id_token,
      user: result.user,    // password가 hash로 오기 때문에,
      statusCode: result.statusCode
   });
}

//회원가입
exports.register = function(req, res, next) {
   //사업자는 전화번호 필수로
   auth.register(req, res, next);
}

//탈퇴
exports.quit = function (req, res, next) {
   auth.quit(req, res, next);
}
