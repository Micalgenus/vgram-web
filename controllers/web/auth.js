/**
 * Created by KIMSEONHO on 2017-01-10.
 */

"use strict";

const config = require('../../config/main');
const genToken = require("../../utils/genToken");

const models = require('../../models');
const User = models.user;

const value = require('../../utils/staticValue'),
  message = value.statusMessage;

var moment = require('moment');
moment.locale("ko");

/**
 * show login view if not login(no sessio
 * @param req
 * @param res
 * @param next
 * @returns {String}
 */

exports.loginView = function (req, res, next) {

  // 로그인이 되어있으면 로그인을 하지 않고 redirect 시킴(jwt 확인)
  if (req.user.logined) {
    req.flash('msg', message.alreadyLogined);

    return next();
  }

  return res.render('auth/login', {
    ENV: req.env,
    logined: req.user.logined,
    title: 'loginView',
    msg: req.msg,
    AUTH0_DOMAIN: config.auth0.DOMAIN,
    AUTH0_CLIENT_ID: config.auth0.CLIENT_ID,
    AUTH0_CALLBACK_URL: config.auth0.CALLBACK_URL
  });
}

exports.logout = function (req, res, next) {
  res.clearCookie('authorization');
  res.clearCookie('access_token');
  res.clearCookie('user_profile_token');

  req.flash('msg', 'loggedOut');

  return next();
}

//========================================
// Login & Logout
//========================================
exports.signupView = function (req, res) {

  // 로그인이 되어있으면 로그인을 하지 않고 redirect 시킴(jwt 확인)
  if (req.user.logined) {
    req.flash('msg', message.alreadyLogined);
    return next();
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
    req.flash('msg', 'invaildInput');
    return res.redirect('back');
  }

  return res.render('auth/signup', {
    ENV: req.env,
    logined: req.user.logined,
    title: 'registerView',
    msg: req.msg,

    email: email,
    name: name,
    phone: phone,
    normal_check: normal_check,
    business_check: business_check
  });
}

exports.signup = function (req, res, next) {

  // 로그인이 되어있으면 로그인을 하지 않고 redirect 시킴(jwt 확인)
  if (req.user.logined) {
    req.flash('msg', message.alreadyLogined);

    return next();
  }

  let type = req.body.member_type;
  let email = req.body.email;
  let phone = req.body.phone;
  let name = req.body.name;

  req.flash('check', type);
  req.flash('email', email);
  req.flash('phone', phone);
  req.flash('phone', name);

  if (type != "PUBLIC" && type != "BUSINESS") {
    req.flash('msg', '잘못된 유형의 회원입니다.');
    // return res.redirect('/signup');
    return res.redirect('back');
  }

  if (!email) {
    req.flash('msg', '이메일을 입력해 주십시오.');
    return res.redirect('back');
  }

  if (!email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)) {
    req.flash('msg', '올바른 이메일 형식을 사용해 주시길 바랍니다.');
    return res.redirect('back');
  }

  let password = req.body.password;
  let repassword = req.body.repassword;
  if (!password || !repassword) {
    req.flash('msg', '비밀번호를 입력해 주시길 바랍니다.');
    return res.redirect('back');
  }

  if (password != repassword) {
    req.flash('msg', '비밀번호가 일치하지 않습니다.');
    return res.redirect('back');
  }

  if (type == "BUSINESS") {
    let phone = req.body.phone;
    if (!phone) {
      req.flash('msg', '전화번호를 입력해 주십시오.');
      return res.redirect('back');
    }

    let name = req.body.name;
    if (!name) {
      req.flash('msg', '이름을 입력해 주십시오.');
      return res.redirect('back');
    }
  }

  return next();
}

exports.register = function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  let type = req.body.member_type;
  let phone = req.body.phone;
  let name = req.body.name;

  return User.findOne({
    where: {
      email: email
    }
  }).then(function (user) {
    if (user) {
      req.flash('msg', 'alreadyExistMember');
      return res.redirect('back');
    }

    return User.create({
      email: email,
      password: password,
      member_type: type,
      telephone: phone,
      registered_date: moment.utc().format('YYYY-MM-DD'),
      display_name: name,
      locale: "ko_KR",
      //profile_image_path: "users/profile1_20170125150101.jpg",
      updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      user_status: 1,
      meta_value: {
        level: 1
      }
    }).then(function (newUser) {
      req.flash('msg', 'completedRegister');
      return next();
    });
  }).catch(function (err) {
    return next(err);
  });
}

exports.quit = function (req, res, next) {

}

exports.setToken = function (req, res, next) {

  // {
  //    accessToken: accessToken,
  //    idToken: extraParams.id_token,
  //    tokenType: extraParams.token_type,
  //    expiresIn: extraParams.expires_in,
  //    profile: profile
  // }

  let userToken = genToken.generateToken(req.user.profile);   // passport에서 받은 object

  // header와 cookies에 id_token을 붙여서 전송
  res.clearCookie('authorization');
  res.clearCookie('access_token');
  res.clearCookie('user_profile_token');

  res.cookie('authorization', [req.user.tokenType, req.user.idToken].join(" "));
  res.cookie('access_token', req.user.accessToken);
  res.cookie('user_profile_token', [req.user.tokenType, userToken].join(" "));

  return next();
}

exports.checkUser = function (req, res, next) {

  return User.findOne({
    where: {
      email: req.user.profile.email
    }
  }).then(function (u) {
    // exist user
    if (u) return next();

    let info = req.user.profile;

    // create user
    return User.create({
      email: info.email,
      // password: password,
      member_type: info.user_metadata.member_type,
      // telephone: phone,
      registered_date: moment(info.updated_at).format('YYYY-MM-DD'),
      nickname: info.nickname,
      locale: "ko-kr",
      //profile_image_path: "users/profile1_20170125150101.jpg",
      updated_date: moment(info.updated_at).format('YYYY-MM-DD'),
      user_status: 1,
      meta_value: {
        level: 1
      }
    }).then(function (newUser) {
      req.flash('msg', 'completedRegister');
      return next();
    });


  });
}

// ** frontRouter의 init()을 사용할 것 **
// exports.init = function(req, res, next) {
//    req.msg = req.flash('msg') || req.flash('error') || req.flash('success');
//    req.env = process.env.NODE_ENV || "development";
//
//    // 본 코드는 잠재적으로 문제가 있을 것 같기 때문에 삭제를 권장함.
//    // 쿠키 만료시간(expiredDate)과 임의로 동일한 이름으로 쿠키를 만들수도 있기 때문에
//    // req.logined = (req.cookies.Authorization ? true : false);
//
//    return next();
// }
