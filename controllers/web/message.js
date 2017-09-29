"use strict";

const models = require('../../models');
const User = models.user;

const firebase = require('./firebase');

exports.viewChat = function (req, res) {

  const targetIdx = req.flash('messageIdx')[0];
  console.log(targetIdx);

  return User.findOne({
    where: {
      ID: req.user.ID,
    }
  }).then(function (u) {
    return firebase.getAdminAuthToken().then(function (token) {
      return res.render('message/chat', {
        ENV: req.env,
        logined: req.user.logined,
        userIdx: req.user.ID,
        nickname: u.nickname,
        title: 'viewChat',
        msg: req.msg,

        token: token
      });
    });
  });
}

exports.viewChatByMember = function (req, res) {

  const targetIdx = req.params.userIdx;

  if (targetIdx == req.user.ID)
    return res.redirect('/message');

  return User.findOne({
    where: {
      ID: targetIdx,
    }
  }).then(function (u) {
    if (!u) {
      req.flash('msg', 'not found user');
      return res.redirect('back');
    }

    req.flash('messageIdx', targetIdx);
    return res.redirect('/message');
  });
}