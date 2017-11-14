"use strict";

const models = require('../../models');
const User = models.user;

const Firebase = require('../core/firebase');

exports.viewChat = function (req, res) {

  const targetId = req.flash('messageId')[0] || -1;

  return User.findOne({
    where: {
      ID: req.user.ID,
    }
  }).then(function (u) {
    return Firebase.getAdminAuthToken().then(function (token) {
      return res.render('message/chat', {
        ENV: req.env,
        logined: req.user.logined,
        userIdx: req.user.ID,
        userAuthId: req.user.sub,
        nickname: u.nickname,
        title: 'viewChat',
        msg: req.msg,

        targetId: targetId,

        token: token
      });
    });
  });
}

exports.viewChatByMember = function (req, res) {

  const targetId = req.params.userId;

  if (targetId == req.user.ID)
    return res.redirect('/message');

  return User.findOne({
    where: {
      ID: targetId,
    }
  }).then(function (u) {
    if (!u) {
      req.flash('msg', 'not found user');
      return res.redirect('back');
    }

    req.flash('messageId', u.auth0_user_id);
    return res.redirect('/message');
  });
}

exports.inviteUserToRoom = function (req, res) {
  const targetId = req.params.userId;
  const chatRoomId = req.params.chatRoomId;

  return Firebase.inviteUserToRoom(targetId, chatRoomId).then(function () {
    return res.send('OK');
  });
}