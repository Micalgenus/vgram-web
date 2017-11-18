"use strict";
const models = require('../../models');
const User = models.user;

const authCore = require('../core/auth');
const Firebase = require('../core/firebase');

const config = require('../../config/main');

const request = require('request');

exports.getAllUserInfo = function (req, res, next) {
}

exports.getUserInfoByIdx = function (req, res, next) {
  let userIdx = req.params.userIdx;

  return User.findOne({
    where: {
      ID: userIdx
    }
  }).then(function (u) {
    if (!u) return res.status(404).json({
      errorMsg: 'user_id doesn\'t exist',
      statusCode: -1
    });

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
  const comment = req.body.comment;
  const owner_name = req.body.owner_name;

  const sns = {
    website: req.body.website,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    blog: req.body.blog
  };

  return authCore.getAdminToken().then(function (token) {

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
          comment: comment
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
          comment: comment
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
  // id->target에서 target추출
  let userIdx = req.params.userIdx;

  return User.findAll({
    include: [{
      model: User,
      as: 'Subscribes',
      where: {
        ID: userIdx,
      },
      attributes: ['ID'],
    }],
  }).then(function (u) {
    if (u.length != 0) {
      return res.status(200).json(u);

    }

    return res.status(404).json({
      errorMsg: 'follower doesn\'t exist',
      statusCode: -1
    });
  });
}


exports.getFollowing = function (req, res, next) {
  // id->target에서 target추출
  let userIdx = req.params.userIdx;

  return User.findOne({
    include: [{
      model: User,
      as: 'Subscribes',
    }],
    where: {
      ID: userIdx
    }
  }).then(function (u) {
    if (!u) {
      return res.status(404).json({
        errorMsg: 'following doesn\'t exist',
        statusCode: -1
      });
    }
    return res.status(200).json(u.Subscribes);
  });
}

exports.getPosts = function (req, res, next) {
  let userIdx = req.params.userIdx;

  return Post.findAll({
    include: [{
      model: User
    }, {
      model: User,
      as: 'LikeUsers'
    }, {
      model: Comment,
      as: 'Comments'
    }],
    where: {
      user_id: userIdx,
    },
    order: [['createdAt', 'DESC']]
  }).then(function (posts) {
    if (!posts) {
      return res.status(404).json({
        errorMsg: 'posts doesn\'t exist',
        statusCode: -1
      });
    }
    return res.status(200).json(posts);
  });
}

exports.getNotice = function (req, res, next) {
  let userIdx = req.params.userIdx;

  if (!userIdx) {
    return res.status(404).json({
      errorMsg: 'please enter userIdx',
      statusCode: -1
    });
  }

  return User.findOne({
    where: {
      ID: userIdx
    }
  }).then(function (u) {
    if (!u) {
      return res.status(404).json({
        errorMsg: 'user doesn\'t exist',
        statusCode: -2
      });
    }

    return Firebase.getNotificationByUserIdx(userIdx).then(function (notice) {
      if (!notice) return res.status(404).json({
        errorMsg: 'notice doesn\'t exist',
        statusCode: -3
      });

      return res.status(200).json(notice);
    });

  }).catch(function (e) {
    return res.status(404).json({
      errorMsg: 'getNotice Error',
      statusCode: -4
    });
  });

}

exports.getLikeposts = function (req, res, next) {
  let userIdx = req.params.userIdx;

  return User.findOne({
    include: [{
      model: Post,
      as: 'LikePosts',
      include: [{
        model: User
      }, {
        model: User,
        as: 'LikeUsers'
      }, {
        model: Comment,
        as: 'Comments'
      }]
    }],
    where: {
      ID: userIdx
    },
    order: [
      [{ model: Post, as: 'LikePosts' }, 'createdAt', 'DESC']
    ]
  }).then(function (user) {
    if (!user.LikePosts) return res.status(404).json({
      errorMsg: 'LikePosts doesn\'t exist',
      statusCode: -1
    });

    return res.status(200).json(user.LikePosts);
  });
}

exports.getUserList = function (req, res, next) {
  let userIdxList = JSON.parse(req.params.userIdxList);

  return User.findAll({
    where: {
      ID: {
        $in: userIdxList
      }
    },
    // attributes: ['nickname'],
  }).then(function (users) {

    if (users.length == 0) {
      return res.status(404).json({
        errorMsg: 'users doesn\'t exist',
        statusCode: -1
      });
    }

    return res.status(200).json(users);
  });
}



