/**
 * Created by HAN on 2017-01-19.
 */

"use strict";

const models = require('../../models');
const Users = models.users;

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
  var check = req.flash('check');
  var email = req.flash('email');
  var phone = req.flash('phone');
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
    phone: phone,
    normal_check: normal_check,
    business_check: business_check,
  });
}

//========================================
// User Routes
//========================================
// 회원 정보 조회

exports.viewProfile = function (req, res) {
  return res.render('member/change', {
    ENV: req.env,
    logined: req.logined,
    title: '정보조회',
    member_type: req.user.member_type,
    email: req.user.email,
    phone: req.user.telephone,
    name: req.user.display_name,
    user: req.user,
  });
/*
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
      member_type: user.member_type,
      email: user.email,
      phone: user.phone,
      name: user.name,
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
*/
}

/*
Authorization	Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjMzMzNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMDUkQWswWjN6N250d3VBQUd3cjc1WG9pTzJhWU8uZDFDUmJrVDM3dE9ZYW1XWHRmbGdrNFRQTzYiLCJtZW1iZXJfdHlwZSI6IlBVQkxJQyIsInRlbGVwaG9uZSI6bnVsbCwicmVnaXN0ZXJlZF9kYXRlIjoiMjAxNy0wMS0xM1QwMDowMDowMC4wMDBaIiwiZGlzcGxheV9uYW1lIjpudWxsLCJhY3RpdmF0aW9uX2tleSI6bnVsbCwicHJvZmlsZV9pbWFnZV9wYXRoIjpudWxsLCJ1cGRhdGVkX2RhdGUiOm51bGwsInVzZXJfc3RhdHVzIjoxLCJpYXQiOjE0ODU3ODAzMjksImV4cCI6MTQ4NTc5MDQwOX0.gAuB0FPKAuR5E9nN0LLcNTZbyho740P8wFlJr-Rpxvg	localhost	/	세션	534B		

*/