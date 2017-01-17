/**
 * Created by KIMSEONHO on 2017-01-10.
 */
"use strict";

const crypto = require('crypto'),
   _ = require('lodash'),
   models = require('../../models'),
   users = models.users,
   //   BusinessMember = models.BusinessMember,
   mailgun = require('../../config/mailgun'),
   mailchimp = require('../../config/mailchimp'),
   config = require('../../config/main'),

   genToken = require("../../utils/genToken");
   //value = require("../../utils/staticValue");

// statusCode나 memberType을 enum으로 처리하자

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
      //statusCode
   };
}

//========================================
// Logout Route : JWT이기 때문에 서버에는 값이 남아있지않음
//========================================


exports.register = function (req, res, next) {

}
