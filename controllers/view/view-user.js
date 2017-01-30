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

exports.login = function(req, res) {

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

exports.signup = function(req, res) {

  // 로그인 체크
  if (req.logined) {
    req.flash('msg', '로그인 하셧습니다.');
    return res.redirect('/');
  }

  // 변수 확인
  var msg = req.flash('msg');
  var email = req.flash('email');
  var check = req.flash('check');
  var normal_check, business_check;

  check = check != "" ? check : "PUBLIC";
  if (check == "PUBLIC") {
    normal_check = "checked";
  } else if (check == "BUSINESS") {
    business_check = "checked";
  } else {
    req.flash('msg', '올바르지 않은 유형입니다.');
    return res.redirect('/signup');
  }

  return res.render('member/signup', {
    ENV: req.env,
    logined: req.logined,
    title: '회원가입',
    msg: msg,
    email: email,
    normal_check: normal_check,
    business_check: business_check,
  });
}

//========================================
// User Routes
//========================================
// 회원 정보 조회

exports.viewProfile = function (req, res) {
  const userEmail = req.user.email;

  return Users.findOne({
    where: {
      email: userEmail
    }
  }).then(function(user) {
    return res.render('member/change', {
      ENV: req.env,
      logined: req.logined,
      title: '정보조회',
      user: user,
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
