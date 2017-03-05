/**
 * Created by KIMSEONHO on 2017-01-10.
 */
"use strict";

const crypto = require('crypto'),
   models = require('../../models'),
   users = models.user,
   //user_metas = models.user_metas,
   moment = require("moment"),
   _ = require('lodash'),
   mailgun = require('../../config/mailgun'),
   mailchimp = require('../../config/mailchimp'),
   config = require('../../config/main'),
   genToken = require("../../utils/genToken");

//========================================
// login Route
//========================================
exports.login = function(req, res) {

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
   //사업자는 전화번호 필수로
   const telephone = req.body.telephone;

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

   // Return error if no member_type provided
   if (!member_type) {
      return res.status(400).send({
         errorMsg: 'You must enter an member_type.',
         statusCode: -1
      });
   }

   // Return error if no telephone provided
   if (member_type ==='BUSINESS' && !telephone) {
      return res.status(400).send({errorMsg: 'You must enter a telephone.', statusCode: -1});
   }

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
            member_type: member_type,
            telephone: telephone
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
// quit Route
//========================================
exports.quit = function (req, res, next){
   //탈퇴버튼 누를시 req_drop_data에 현재 시간을 넣어줌.
   const email = req.body.email;
   const day = new Date();

   if (!email) {
      return res.status(400).send({
         errorMsg: 'You must enter an email address.',
         statusCode: -1
      });
   }

   return models.sequelize.query("update users set user_status = 0, updated_date = ? where email = ?",
   {
      replacements: [day,email]
   }).then(function (result){
      return res.status(200).json({
         msg: 'Clear update user quit',
         statusCode: 1
      });
   }).catch(function(err) {
      if (err) {
         return res.status(400).json({
            errorMsg: 'DB error.',
            statusCode: 2
         });
         //return next(err);
      }
   });
}
//========================================
// find email Route
//========================================
exports.findEmail = function (req, res, next) {
   const email = req.body.email;

   return users.findOne({where: {email: email}}).then(function (existingUser) {
      // If user is not found, return error
      if (existingUser == null) {
         res.status(422).json({errorMsg: 'Your request could not be processed as entered. Please try again.'});
         return next(new Error("not matching, please check again."));
      }

      // If user is found, generate and save resetToken

      // Generate a token with Crypto
      crypto.randomBytes(48, function (err, buffer) {
         const resetToken = buffer.toString('hex');
         if (err) {
            return next(err);
         }

         existingUser.resetPasswordToken = resetToken;
         existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

         existingUser.save().then(function (user) {

            const message = {
               subject: 'Reset Password',
               text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
               'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
               'http://' + req.headers.host + '/reset-password/' + resetToken + '\n\n' +
               'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }

            // Otherwise, send user email via Mailgun
            mailgun.sendEmail(existingUser.email, message);

            res.status(200).json({message: 'Please check your email for the link to reset your password.'});
            next();
         }).catch(function (err) {
            // If error in saving token, return it
            if (err) {
               return next(err);
            }
         });
      });
   }).catch(function (err) {    //end Member.findOne
      // If user is not found, return error
      if (err) {
         res.status(422).json({errorMsg: 'Your request could not be processed as entered. Please try again.'});
         return next(err);
      }
   });
}

//========================================
// find Password Route
//========================================
exports.findPassword = function (req, res, next) {
   const email = req.body.email;

   return users.findOne({where: {email: email}}).then(function (existingUser) {
      // If user is not found, return error
      if (existingUser == null) {
         res.status(422).json({errorMsg: 'Your request could not be processed as entered. Please try again.'});
         return next(new Error("not matching, please check again."));
      }

      // If user is found, generate and save resetToken

      // Generate a token with Crypto
      crypto.randomBytes(48, function (err, buffer) {
         const resetToken = buffer.toString('hex');
         if (err) {
            return next(err);
         }

         existingUser.resetPasswordToken = resetToken;
         existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

         existingUser.save().then(function (user) {

            const message = {
               subject: 'Reset Password',
               text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
               'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
               'http://' + req.headers.host + '/reset-password/' + resetToken + '\n\n' +
               'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }

            // Otherwise, send user email via Mailgun
            mailgun.sendEmail(existingUser.email, message);

            res.status(200).json({message: 'Please check your email for the link to reset your password.'});
            next();
         }).catch(function (err) {
            // If error in saving token, return it
            if (err) {
               return next(err);
            }
         });
      });
   }).catch(function (err) {    //end Member.findOne
      // If user is not found, return error
      if (err) {
         res.status(422).json({errorMsg: 'Your request could not be processed as entered. Please try again.'});
         return next(err);
      }
   });
}

//========================================
//이메일을 받으면 user 정보와 메타데이터를 전송 하는 api
//========================================
   exports.info = function(req, res, callback) {

      const email = req.body.email;

      // Return error if no email provided
      if (!email) {
         return res.status(400).send({
            errorMsg: 'You must enter an email address.',
            statusCode: -1
         });
      }

      models.sequelize.query("select * from users,user_metas where users.email = ? and users.ID = user_metas.user_id",
         { replacements: [email],type: models.sequelize.QueryTypes.SELECT})
         .then(function (data) {

            if(data.length <= 0){   // not exist user
               return res.status(401).send({
                  errorMsg: 'Email do not exist DB',
                  statusCode: 2
               });
            }else{                  // exist user
               callback({
                  user_info: data,
                  status: 1
               });
            }
         }).catch(function (err) {    // end select
         if (err) {
            return err;
         }
      });
   }
