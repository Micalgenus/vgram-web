/**
 * Created by KIMSEONHO on 2017-01-10.
 */

"use strict";

const auth = require('../core/authentication');

const models = require('../../models');
const User = models.user;

var moment = require('moment');
moment.locale("ko");

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

exports.signup = function (req, res, next) {

   // 로그인이 되어있으면 회원가입 하지 않고 redirect 시킴(jwt 확인)
   let token = req.cookies.Authorization;

   if (token) {
      req.flash('msg', '이미 로그인 하셨습니다.');
      return res.redirect('/');
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
      return res.redirect('/signup');
   }

   if (!email) {
      req.flash('msg', '이메일을 입력해 주십시오.');
      return res.redirect('/signup');
   }

   if (!email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)) {
      req.flash('msg', '올바른 이메일 형식을 사용해 주시길 바랍니다.');
      return res.redirect('/signup');
   }

   let password = req.body.password;
   let repassword = req.body.repassword;
   if (!password || !repassword) {
      req.flash('msg', '비밀번호를 입력해 주시길 바랍니다.');
      return res.redirect('/signup');
   }

   if (password != repassword) {
      req.flash('msg', '비밀번호가 일치하지 않습니다.');
      return res.redirect('/signup');
   }

   if (type == "BUSINESS") {
      let phone = req.body.phone;
      if (!phone) {
         req.flash('msg', '전화번호를 입력해 주십시오.');
         return res.redirect('/signup');
      }

      let name = req.body.name;
      if (!name) {
         req.flash('msg', '이름을 입력해 주십시오.');
         return res.redirect('/signup');
      }
   }

   return next();
}

exports.register = function(req, res, next) {
   let email = req.body.email;
   let password = req.body.password;
   let type = req.body.member_type;
   let phone = req.body.phone;
   let name = req.body.name;

   return User.findOne({
      where: {
         email: email
      }
   }).then(function(user) {
      if (user) {
         req.flash('msg', '이미 존재하는 회원입니다.');
         return res.redirect('/signup');
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
      }).then(function(newUser) {
         req.flash('msg', '회원가입 되셧습니다.');
         return next();
      });
   }).catch(function(err) {
      return next(err);
   });
}

exports.change = function(req, res, next) {
   const email = req.user.email;
   const password = req.body.password;
   const repassword = req.body.repassword;

   if (password != repassword) {
      req.flash('msg', '비밀번호가 일치하지 않습니다.');
      return res.redirect('/change');
   }

   var userData = {
      telephone: req.body.phone,
      display_name: req.body.name
   };

   if (password) {
      userData.password = password;
   }

   if (req.user.member_type != "PUBLIC") {
      var meta = JSON.parse(req.user.meta_value);

      meta.business_type = req.body.business_type;
      meta.registered_number = req.body.registered_number;
      meta.owner_name = req.body.owner_name;
      // meta.company_address = req.body.company_address;
      meta.intro_comment = req.body.intro_comment;

      userData.meta_value = meta;
   }

   return User.update(userData, {
      where: {
         email: email
      }
   }).then(function(array) {
      if (array[0] == 1) {

         return User.findOne({
            where: {
               email: email
            }
         }).then(function(user) {
            req.user = user.dataValues;
            return next();
         }).catch(function(err) {
            return res.send(err);
         });
      } else {
         req.flash('msg', '변경에 실패하였습니다.');
         return res.redirect('/change');
      }
   }).catch(function(err) {
      return res.send(err);
   });
}

exports.quit = function (req, res, next){

}

exports.setToken = function(req, res, next) {

   let result = auth.login(req, res);

   // header와 cookies에 id_token을 붙여서 전송
   res.clearCookie('Authorization');
   res.cookie('Authorization', result.id_token);

   return next();
}

exports.init = function(req, res, next) {
   req.msg = req.flash('msg');
   req.env = process.env.NODE_ENV || "development";
   req.logined = (req.cookies.Authorization ? true : false);

   return next();
}
