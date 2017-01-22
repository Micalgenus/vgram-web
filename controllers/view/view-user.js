/**
 * Created by HAN on 2017-01-19.
 */

"use strict";
const _ = require('lodash');

const models = require('../../models');
const Users = models.users;

const redirect = require('./redirect.js');
 
//========================================
// Login & Logout
//========================================

exports.login = function(req, res, next) {

  // 로그인 체크
  if (req.logined) {
    req.flash('msg', '이미 로그인 하셧습니다.');
    return res.redirect('/');
  }

  // 변수 확인
  var msg = req.flash('msg');
  var email = req.flash('email');

  return res.render('login/login', {
    ENV: req.env,
    logined: req.logined,
    title: '로그인',
    msg: msg,
    email: email
  });
}

exports.logout = function(req, res, next) {

}
//========================================
// User Routes
//========================================
// 회원 정보 조회

exports.viewProfile = function (req, res) {
  //console.log(req.user);
  const userId = req.user.email;
  //const userId = _.toNumber(req.params.memberIdx);
/*
  if (req.user.idx != userId) {
    return res.status(401).json({
      errorMsg: 'You are not authorized to view this user profile.',
      statusCode: 2
    });
  }
*/
  return Users.findById(userId).then(function(user) {
    return res.render('member/change', {
      ENV: req.env,
      logined: req.logined,
      title: '정보조회',
      user: user
    });
  }).catch(function(err) {
    if (err) {
      res.status(400).json({
        errorMsg: 'No user could be found for this ID.',
        statusCode: 2
      });
      return next(err);
    }
  });
}
