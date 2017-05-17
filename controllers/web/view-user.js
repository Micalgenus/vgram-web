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
