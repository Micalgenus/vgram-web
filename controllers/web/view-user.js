/**
 * Created by HAN on 2017-01-19.
 */

"use strict";
const multer = require('multer');

const models = require('../../models');
const User = models.user;
const multerConfig = require('../../config/multer');
const value = require('../../utils/staticValue');

// for file download
const userInfoUpload = multer({ storage: multerConfig.userInfoStorage }).fields([
  { name: value.fieldName.PROFILE_IMAGE, maxCount: 1 }]);

//========================================
// Login & Logout
//========================================

exports.login = function(req, res) {

  // 로그인 체크
  if (req.logined) {
    req.flash('msg', '이미 로그인 하셧습니다.');
    console.log("error");
    return res.redirect('/');
  }

  // 변수 확인
  var email = req.flash('email');

  return res.render('login/login', {
    ENV: req.env,
    logined: req.logined,
    title: '로그인',
    msg: req.msg,
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
  var check = req.flash('check');
  var email = req.flash('email');
  var name = req.flash('name');
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
    msg: req.msg,
    email: email,
    name: name,
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

  var business_type,
    registered_number,
    owner_name,
    company_address,
    intro_comment;

  let meta = JSON.parse(req.user.meta_value);
  if (meta.business_type) business_type = meta.business_type;
  if (meta.registered_number) registered_number = meta.registered_number;
  if (meta.owner_name) owner_name = meta.owner_name;
  if (meta.company_address) company_address = meta.company_address;
  if (meta.intro_comment) intro_comment = meta.intro_comment;

  return res.render('member/change', {
    ENV: req.env,
    logined: req.logined,
    title: '정보조회',
    member_type: req.user.member_type,
    email: req.user.email,
    phone: req.user.telephone,
    name: req.user.display_name,
    profile_image_path: req.user.profile_image_path,
    business_type: business_type,
    registered_number: registered_number,
    owner_name: owner_name,
    company_address: company_address,
    intro_comment: intro_comment,
  });
}
