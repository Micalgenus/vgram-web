/**
 * Created by KIMSEONHO on 2016-08-22.
 */
"use strict";

const jwt = require('jsonwebtoken'),
  config = require('../config/main');

// Generate JWT
// TO-DO Add issuer and audience
exports.generateUserToken = function(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds, 2.8시간
  });
}

// Set user info from request
/* 2017.1.13 이정현 주석처리
exports.setUserInfo = function(request) {
  let getUserInfo = {
    idx: request.idx,
    email: request.email,
    password: request.password,
    memberType: request.memberType,
    passwordOrigin: request.passwordOrigin    // 인코딩 전의 패스워드도 저장해놓자.
  };

  return getUserInfo;
}*/
exports.setUserInfo = function(request) {
   let getUserInfo = {
      id: request.id,
      email: request.email,
      password: request.password,
      member_type: request.member_type,
      telephone:request.telephone,
      registered_date:request.registered_date,
      display_name:request.display_name,
      activation_key:request.activation_key,
      local: request.local,
      profile_image_path: request.profile_image_path,
      updated_date: request.updated_date,
      user_status: request.user_status,
      meta_value: request.meta_value
   };

   return getUserInfo;
}
