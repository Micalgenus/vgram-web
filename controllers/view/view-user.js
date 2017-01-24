/**
 * Created by HAN on 2017-01-19.
 */

"use strict";
const _ = require('lodash');

const models = require('../../models');
const Users = models.users;

//========================================
// User Routes
//========================================
// 회원 정보 조회

exports.viewProfile = function (req, res) {

  const userId = _.toNumber(req.params.memberIdx);
/*
  if (req.user.idx != userId) {
    return res.status(401).json({
      errorMsg: 'You are not authorized to view this user profile.',
      statusCode: 2
    });
  }
*/
  return Users.findById(userId).then(function(user) {
    return res.render('member/change', { user: user });
  }).catch(function(err) {
    if (err) {
      res.status(400).json({
        errorMsg: 'No user could be found for this ID.',
        statusCode: 2
      });
      return next(err);
    }
  });
}
