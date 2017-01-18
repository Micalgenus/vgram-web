/**
 * Created by KIMSEONHO on 2017-01-10.
 */
"use strict";

const crypto = require('crypto'),
   models = require('../../models'),
   users = models.users,

   mailgun = require('../../config/mailgun'),
   mailchimp = require('../../config/mailchimp'),
   config = require('../../config/main'),
   genToken = require("../../utils/genToken");


//========================================
// login Route
//========================================
exports.login = function(req, res) {

   req.user.passwordOrigin = req.body.password;
   let userInfo = genToken.setUserInfo(req.user);   // passport에서 받은 object

   return {
      id_token: 'Bearer ' + genToken.generateUserToken(userInfo),
      user: userInfo,    // password가 hash로 오기 때문에,
      statusCode: 1
   };
}

//========================================
// Logout Route : JWT이기 때문에 서버에는 값이 남아있지않음
//========================================


//========================================
// Registration Route
//========================================
exports.register = function (req, res, next) {
   // Check for registration errors
   const email = req.body.email;
   const password = req.body.password;
   const member_type = req.body.member_type;
   //const telephone = req.body.telephone;

   // Return error if no email provided
   if (!email) {
      return res.status(400).send({
         errorMsg: 'You must enter an email address.',
         statusCode: -1
      });
   }

   // Return error if no password provided
   if (!password) {
      return res.status(400).send({errorMsg: 'You must enter a password.', statusCode: -1});
   }
   // Return error if no telephone provided
   // if (!telephone) {
   //    return res.status(400).send({errorMsg: 'You must enter a telephone.', statusCode: -1});
   // }

   return users.findOne({
      where: {
         email: email
      }
   }).then(function (existingUser) {
      if (existingUser) {  // If user is not unique, return error
         return res.status(400).send({
            errorMsg: 'That email address is already in use.',
            statusCode: 2
         });
      } else {     // If email is unique and password was provided, create account
         let user = {
            email: email,
            password: password,
            member_type: member_type
            //,telephone: telephone
         };

         // 회원 가입시
         users.create(user).then(function (newUser) {

            // Respond with JWT if user was created
            let userInfo = genToken.setUserInfo(newUser);
            let token = 'Bearer ' + genToken.generateUserToken(userInfo);
            res.append('Authorization', token);

            return res.status(201).json({
               user: userInfo,
               status: 1
            });
         }).catch(function (err) {    // end Member.create
            if (err) {
               res.status(422).json({errorMsg: 'Internal Error', statusCode: 9});
            }
         });
      }
   }).catch(function (err) {    // end Member.findOne
      if (err) {
         return next(err);
      }
   });
}

//========================================
// 탈퇴 Route
//========================================
// exports.quit = function (req, res, next){
//
// }


