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
  
  const email = req.user.email;
  const id = req.user.ID;

  const nickname = req.body.nickname;
  const phone = req.body.phone;
  const registered_number = req.body.registered_number;
  const address = {
    post_code: req.body.post_code,
    addr1: req.body.addr1,
    addr2: req.body.addr2
  };
  const profile_src = req.body.profile_src;
  const about = req.body.about;
  const owner_name = req.body.owner_name;

  const sns = {
    website: req.body.website,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    blog: req.body.blog
  };

  return auth.getAdminToken().then(function (token) {

    let args = {
      method: 'PATCH',
      uri: config.auth0.IDENTIFIER + 'users/' + req.user.sub,
      json: {
        user_metadata: {
          nickname: nickname,
          username: "",
          telephone: phone,
          phone_number: phone,
          profile_image_path: profile_src,
          locale: "ko-kr" || req.user.profile.user_metadata.locale,
          registered_number: registered_number,
          owner_name: owner_name,
          address: address,
          sns: sns,
          about: about
        },
      },

      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }

    return request(args, function (e, r, body) {

      let userData = {
        nickname: nickname,
        telephone: phone,
        profile_image_path: profile_src,
        meta_value: {
          registered_number: registered_number,
          owner_name: owner_name,
          address: address,
          sns: sns,
          point: 0,
          phone_number: "",
          about: about
        }
      };

      // create user
      return User.update(userData, {
        where: {
          ID: id
        }
      }).then(function (u) {

        req.user.tokenType = 'Bearer';
        req.user.profile = body;

        req.user.profile.ID = req.user.ID;
        req.user.profile.sub = req.user.sub;

        return next();
      });
    });
  });
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



