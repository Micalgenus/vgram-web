/**
 * Created by KIMSEONHO on 2017-01-10.
 */

"use strict";

const config = require('../../config/main');
const genToken = require("../../utils/genToken");

const models = require('../../models');
const User = models.user;

const auth = require("../core/auth");

const value = require('../../utils/staticValue'),
  message = value.statusMessage;

var request = require('request');
var requestp = require('request-promise');
var _ = require('lodash');
var moment = require('moment');
moment.locale("ko");

const logger = require('../../utils/logger');

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
    userAuthId: null,
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
    userAuthId: null,
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
//
// exports.register = function (req, res, next) {
//   let email = req.body.email;
//   let password = req.body.password;
//   let type = req.body.member_type;
//   let phone = req.body.phone;
//   let name = req.body.name;
//
//   return User.findOne({
//     where: {
//       email: email
//     }
//   }).then(function (user) {
//     if (user) {
//       req.flash('msg', 'alreadyExistMember');
//       return res.redirect('back');
//     }
//
//     return User.create({
//       email: email,
//       password: password,
//       member_type: type,
//       telephone: phone,
//       registered_date: moment.utc().format('YYYY-MM-DD'),
//       display_name: name,
//       locale: "ko_KR",
//       //profile_image_path: "users/profile1_20170125150101.jpg",
//       updated_date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
//       user_status: 1,
//       meta_value: {
//         level: 1
//       }
//     }).then(function (newUser) {
//       req.flash('msg', 'completedRegister');
//       return next();
//     });
//   }).catch(function (err) {
//     return next(err);
//   });
// }

exports.quit = function (req, res, next) {

}

exports.setToken = auth.setToken;

// function getLastId(page, token) {
//   var options = {
//     method: 'GET',
//     uri: config.auth0.IDENTIFIER + 'users',
//     qs: {
//       per_page: 1,
//       page: page,
//       sort: 'created_at:-1',
//     },
//     json: true,
//
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//   };
//
//   return requestp(options).then(function (body) {
//     if (body[0] && body[0].app_metadata && body[0].app_metadata.ID) return body[0].app_metadata.ID;
//     return getLastId(page + 1, token).then(function (id) {
//       return id
//     });
//   });
// }

exports.checkUser = function (req, res, next) {

  return User.findOne({
    where: {
      // email: req.user.profile.email
      // email의 경우 SSO가 연동되어 있지 않은 경우 똑같은 email로 2개 이상의 회원가입이 가능함
      auth0_user_id: req.user.profile.user_id
    }
  }).then(function (u) {
    // exist user(기존 회원 로그인)
    if (u) return next();

    let info = req.user.profile;

    /**
     * ID/PWD 방식의 경우 user_metadata, app_metadata가 있으나
     * SNS 연동 방식의 경우 두 정보가 없기 때문에 예외처리가 필요하다
     * 자세한 user object 정보는 auth0 tester client로 확인이 가능함
     * 각 회원가입방법별로 object 모양이 다르기 때문에 SNS 로그인 기능 추가 지원시
     * 코드수정, 예외처리가 중요할 것 같다
     * SNS 로그인의 경우 전화번호, 국가, 취미, 친구목록, 성별등 다양한 정보가 나오기 때문에
     * 향후 기능 연동이 가능 할 것 같다.
     * https://manage.auth0.com/#/connections/database
     * https://manage.auth0.com/#/connections/social
     */
    let userInfo = {
      email: info.email,
      member_type: info.app_metadata ? (info.app_metadata.roles[0] || value.memberType.PUBLIC) : value.memberType.PUBLIC,
      nickname: info.user_metadata ? (info.user_metadata.nickname || info.nickname) : info.nickname,
      user_status: info.app_metadata ? (info.app_metadata.user_status || 1) : 1,  // -1 : 탈퇴요청, 0 : 휴면, 1 : 활성
      telephone: "",
      createdAt: moment(info.created_at).format('YYYY-MM-DD'),
      auth0_user_id: info.user_id,
      locale: info.user_metadata ? info.user_metadata.locale : value.langCode["ko-kr"].codes[1],   // ko-kr
      profile_image_path: info.user_metadata ? info.user_metadata.profile_image_path : info.picture,
      updatedAt: moment(info.updated_at).format('YYYY-MM-DD'),
      meta_value: {
        registered_number: "",
        address: {
          post_code: "",
          addr1: "",
          addr2: "",
          detail: "",
          extra_info: ""
        },
        point: 0,
        user_name: "",
        owner_name: "",
        business_type: "",
        comment: "",
        phone_number: "",
        sns: {
          "website": "",
          "facebook": "",
          "instagram": "",
          "blog": "",
          "twitter": ""
        }
      }
    };
    return User.create(userInfo).then(function (newUser) {
      userInfo.ID = newUser.ID;
      // req.user.profile.ID = newUser.ID;

      return auth.getAdminToken().then((token) => {
        let options = {
          method: 'PATCH',
          uri: config.auth0.IDENTIFIER + 'users/' + info.user_id,
          json: {
            user_metadata: {
              nickname: userInfo.nickname,
              telephone: userInfo.telephone,
              profile_image_path: info.picture,
              locale: userInfo.locale,
              registered_number: userInfo.meta_value.registered_number,
              address: {
                post_code: userInfo.meta_value.address.post_code,
                addr1: userInfo.meta_value.address.addr1,
                addr2: userInfo.meta_value.address.addr2,
                detail: userInfo.meta_value.address.detail,
                extra_info: userInfo.meta_value.address.extra_info
              },
              username: userInfo.meta_value.user_name,
              business_type: userInfo.meta_value.business_type,
              comment: "",
              phone_number: userInfo.meta_value.telephone,
              sns: {
                "website": "",
                "facebook": "",
                "instagram": "",
                "blog": "",
                "twitter": ""
              }
            },
            app_metadata: {
              roles: [
                userInfo.member_type
              ],
              user_status: userInfo.user_status,
              updated_at: userInfo.updatedAt,
              point: userInfo.meta_value.point,
              owner_name: userInfo.meta_value.owner_name,
              ID: userInfo.ID,
            }
          },

          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        };

        return requestp(options).then(function (body) {
          req.user.profile.ID = body.app_metadata.ID;
          return models.Sequelize.Promise.resolve();
        });
      });
    });
  }).then((newUser) => {
    return next();
  }).catch(next);
};
