/**
 * Created by KIMSEONHO on 2017-01-10.
 */
"use strict";
const crypto = require('crypto'),
   models = require('../../models'),
   users = models.users,
   //user_metas = models.user_metas,
   moment = require("moment"),
   _ = require('lodash'),
   mailgun = require('../../config/mailgun'),
   mailchimp = require('../../config/mailchimp'),
   config = require('../../config/main'),
   genToken = require("../../utils/genToken");


/**
 * passport의 LocalStrategy(ID, Password)를 이용함
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

// 로그인
exports.login = function(req, res, next) {

   let userInfo = genToken.setUserInfo(req.user);   // passport에서 받은 object

   res.append('Authorization', 'Bearer ' + genToken.generateUserToken(userInfo));
   res.cookie('Authorization', 'Bearer ' + genToken.generateUserToken(userInfo));

   return res.status(201).json({
      id_token: 'Bearer ' + genToken.generateUserToken(userInfo),
      user: userInfo,    // password가 hash로 오기 때문에,
      statusCode: 1
   });
}

//회원가입
exports.register = function(req, res, next) {
   //auth.register(req, res, next);
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
               id_token: token,
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

//탈퇴
exports.quit = function (req, res, next) {
   //auth.quit(req, res, next);
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

//이메일을 받으면 정보와 메타데이터를 전송 하는 api
exports.info = function(req, res, next) {
   const email = req.body.email;

   // Return error if no email provided
   if (!email) {
      return res.status(400).json({
         errorMsg: 'You must enter an email address.',
         statusCode: -1
      });
   }
   console.log(req.headers);
   // let token = req.headers['Authorization'];
   // console.log(token);
   // if(!token){
   //    return res.status(400).json({
   //       errorMsg: 'Do not have a token',
   //       statusCode: -1
   //    });
   // }

   models.sequelize.query("select a.ID, a.email, a.member_type, a.telephone, " +
      "a.registered_date, a.display_name, a.activation_key, a.locale, a.profile_image_path, " +
      "a.updated_date, a.user_status, b.meta_key, b.meta_value " +
      "from users as a, user_metas as b where a.email = (?) and a.ID = b.user_id",
      { replacements: [email],type: models.sequelize.QueryTypes.SELECT})
      .then(function (data) {

         if(data.length <= 0){   // not exist user
            return res.status(401).json({
               errorMsg: 'Email do not exist DB',
               statusCode: 2
            });
         }else{                  // exist user
            return res.status(201).json({
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

exports.modifyInfo = function(req, res, next){
   // const email = req.body.email;
   // const password = req.body.password;
   // const telephone = req.body.telephone;
   // const display_name = req.body.display_name;
   // const profile_image_path = req.body.profile_image_path;
   // const day = new Date();
   //
   // // let token = req.headers['Authorization'];
   // // if(!token){
   // //    return res.status(400).josn({
   // //       errorMsg: 'Do not have a token',
   // //       statusCode: -1;
   // //    })
   // // }
   //
   // if (!email) {
   //    return res.status(400).json({
   //       errorMsg: 'You must enter an email address.',
   //       statusCode: -1
   //    });
   // }
   // console.log(email);
   // console.log(password);
   // console.log(telephone);
   // console.log(display_name);
   // console.log(profile_image_path);
   // console.log(password.length);
   // if(password){
   //    users.update(
   //       {  password: password,
   //          telephone: telephone,
   //          display_name: display_name,
   //          profile_image_path: profile_image_path,
   //          updated_date: day
   //       },
   //       {where: {email: email}}
   //    ).then(function(result) {
   //       res.json(result[1][0]);
   //    }).catch(function(err) {
   //       if(err){
   //          console.log(err);
   //          return res.status(401).json({
   //             errorMsg: 'DB error',
   //             statusCode: -2
   //          })
   //       }
   //    });
   // }else{
   //    users.update(
   //       {  telephone: telephone,
   //          display_name: display_name,
   //          profile_image_path: profile_image_path,
   //          updated_date: day
   //       },
   //       {where: {email: email}}
   //    ).then(function(result) {
   //       res.json(result[1][0]);
   //    }).catch(function(err) {
   //       if(err){
   //          return res.status(401).json({
   //             errorMsg: 'DB error',
   //             statusCode: -2
   //          })
   //       }
   //    });
   // }
}
