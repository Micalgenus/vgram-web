"use strict";
const models = require('../../models');
const User = models.user;

const config = require('../../config/main');

exports.getAllUserInfo = function (req, res, next) {
}

exports.getUserInfoByIdx = function (req, res, next) {
  let userIdx = req.params.userIdx;

  return User.findOne({
    where: {
      ID: userIdx
    }
  }).then(function (u) {
    if (!u) return res.status(404).send(null);

    u.meta_value = JSON.parse(u.meta_value);

    return res.json(u);
  });
}

exports.modifyUserInfoByIdx = function (req, res, next) {
}

exports.deleteUser = function (req, res, next) {
}

exports.changePassword = function (req, res, next) {
}


exports.getFollower = function (req, res, next) {
}


exports.getFollowing = function (req, res, next) {
}

exports.getPosts = function (req, res, next) {
}

exports.getNotice = function (req, res, next) {
}

exports.getLikeposts = function (req, res, next) {
}

exports.getUserList = function (req, res, next) {
}



