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

  // 로그인이 되어있으면 로그인을 하지 않고 redirect 시킴(jwt 확인)
  let token = req.cookies.Authorization;

  if (token) {
    req.flash('msg', '이미 로그인 하셨습니다.');
    return res.redirect('/');
  }

  // 사용자 입력 확인
  if (! req.body.email) {
    req.flash('msg', '이메일을 입력해 주십시오.');
    return res.redirect('/login');
  }

  if (! req.body.password) {
    req.flash('email', req.body.email);
    req.flash('msg', '패스워드를 입력해 주십시오.');
    return res.redirect('/login');
  }

  return next();
}

exports.logout = function(req, res, next) {
  let token = req.cookies.Authorization;

  if (!token) {
    req.flash('msg', '로그인을 해주십시오.');
    return res.redirect('/login');
  }
  
  res.clearCookie('Authorization');

  return next();
}

exports.setToken = function(req, res, next) {

  let result = auth.login(req, res);

  // header와 cookies에 id_token을 붙여서 전송
  res.clearCookie('Authorization');
  res.cookie('Authorization', result.id_token);

  return next();
}

exports.init = function(req, res, next) {
  req.env = process.env.NODE_ENV || "development";
  req.logined = (req.cookies.Authorization ? true : false);

  return next();
}

exports.register = function (req, res, next) {

}

exports.quit = function (req, res, next){

}
