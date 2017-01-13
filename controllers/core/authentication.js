/**
 * Created by KIMSEONHO on 2017-01-10.
 */
"use strict";

const crypto = require('crypto'),
   _ = require('lodash'),
   models = require('../../models'),
   Member = models.Member,
   BusinessMember = models.BusinessMember,
   mailgun = require('../../config/mailgun'),
   mailchimp = require('../../config/mailchimp'),
   config = require('../../config/main'),

   genToken = require("../../utils/genToken");
   //value = require("../../utils/staticValue");

// statusCode나 memberType을 enum으로 처리하자

//로그인
exports.login = function(req, res) {
   console.log("Login");
   req.user.passwordOrigin = req.body.password;
   let userInfo = genToken.setUserInfo(req.user);   // passport에서 받은 object

   return {
      id_token: 'Bearer ' + genToken.generateUserToken(userInfo),
      user: userInfo,    // password가 hash로 오기 때문에,
      statusCode: 1
      //statusCode
   };
}

