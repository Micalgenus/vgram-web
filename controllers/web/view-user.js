/**
 * Created by HAN on 2017-01-19.
 */

"use strict";
const multer = require('multer');

const models = require('../../models');
const User = models.user;
const Post = models.post;
const Comment = models.comment;

const multerConfig = require('../../config/multer');
const value = require('../../utils/staticValue');

const authController = require('./auth.js');
const config = require('../../config/main');

var request = require('request');
var requestp = require('request-promise');


// for file download
const userInfoUpload = multer({ storage: multerConfig.userInfoStorage }).fields([
  { name: value.fieldName.PROFILE_IMAGE, maxCount: 1 }]);



//========================================
// User Routes
//========================================
// 회원 정보 조회

exports.viewChangeProfile = function (req, res) {
  let userIdx = req.user.ID;

  return User.findOne({
    where: {
      ID: userIdx
    }
  }).then(function (u) {
    if (!u) return res.redirect('/');

    u.meta_value = JSON.parse(u.meta_value);

    return res.render('member/change', {
      ENV: req.env,
      logined: req.user.logined,
      title: 'viewChangeProfile',
      msg: req.msg,

      nickname: u.nickname,
      phone: u.telephone,
      member_type: u.member_type,
      profile_image_path: u.profile_image_path,

      registered_number: u.meta_value.registered_number,
      post_code: u.meta_value.address.post_code,
      addr1: u.meta_value.address.addr1,
      addr2: u.meta_value.address.addr2,
    });
  });
}

exports.viewProfile = function (req, res) {

  // let userIdx = req.user.ID;
  let userIdx = req.params.memberIdx;

  var business_type,
    registered_number,
    owner_name,
    company_address,
    intro_comment;

  // let meta = JSON.parse(req.user.meta_value);
  // if (meta.business_type) business_type = meta.business_type;
  // if (meta.registered_number) registered_number = meta.registered_number;
  // if (meta.owner_name) owner_name = meta.owner_name;
  // if (meta.company_address) company_address = meta.company_address;
  // if (meta.intro_comment) intro_comment = meta.intro_comment;

  return User.findOne({
    where: {
      ID: userIdx
    }
  }).then(function (u) {
    if (!u) return res.redirect('/');

    var myPage = false;
    if (req.user.logined && req.user.ID == userIdx) myPage = true;

    return res.render('member/mypage', {
      ENV: req.env,
      logined: req.user.logined,
      title: 'userDetailView',
      msg: req.msg,

      myPage: myPage,

      member_type: u.member_type,
      nickname: u.nickname,
      profile_image_path: u.profile_image_path,
      // email: req.user.email,
      // phone: req.user.telephone,
      // business_type: business_type,
      // registered_number: registered_number,
      // owner_name: owner_name,
      // company_address: company_address,
      // intro_comment: intro_comment,
    });
  });

}

exports.getFollower = function (req, res) {
  // id->target에서 id추출
  let userIdx = req.params.memberIdx;

  return User.findAll({
    include: [{
      model: User,
      as: 'Subscribes',
      where: {
        ID: userIdx
      }
    }],
  }).then(function (u) {
    return res.send(u);
  });
}

exports.getFollowing = function (req, res) {
  // id->target에서 target추출
  let userIdx = req.params.memberIdx;

  return User.findOne({
    include: [{
      model: User,
      as: 'Subscribes'
    }],
    where: {
      ID: userIdx
    }
  }).then(function (u) {
    return res.send(u.Subscribes);
  });
}

exports.getPosts = function (req, res) {
  let userIdx = req.params.memberIdx;

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
    order: [['ID', 'DESC']]
  }).then(function (posts) {
    return res.send(posts);
  });
}

exports.getReplies = function (req, res) {
  let userIdx = req.params.memberIdx;

  return Comment.findAll({
    include: [{
      model: User
    }],
    where: {
      user_id: userIdx
    }
  }).then(function (comments) {
    return res.send(comments);
  });
}

exports.getLikeposts = function (req, res) {
  let userIdx = req.params.memberIdx;

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
      [{ model: Post, as: 'LikePosts' }, 'ID', 'DESC']
    ]
  }).then(function (user) {
    return res.send(user.LikePosts);
  });
}

exports.change = function (req, res, next) {

  const email = req.user.email;
  const id = req.user.ID;

  const nickname = req.body.nickname;
  const phone = req.body.phone;
  const registered_number = req.body.registered_number;
  const post_code = req.body.post_code;
  const addr1 = req.body.addr1;
  const addr2 = req.body.addr2;

  return authController.getAdminToken().then(function (token) {

    let args = {
      method: 'PATCH',
      uri: config.auth0.IDENTIFIER + 'users/' + req.user.sub,
      json: {
        user_metadata: {
          nickname: nickname,
          username: "",
          telephone: phone,
          phone_number: phone,
          profile_image_path: "",
          locale: req.user.user_metadata.locale,
          registered_number: registered_number,
          address: {
            post_code: post_code,
            addr1: addr1,
            addr2: addr2
          }
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
        meta_value: {
          registered_number: registered_number,
          address: {
            post_code: post_code,
            addr1: addr1,
            addr2: addr2
          },
          point: 0,
          phone_number: ""
        }
      };

      // create user
      return User.update(userData, {
        where: {
          ID: id
        }
      }).then(function (u) {

        req.user.tokenType = 'Bearer';

        req.user.profile = {
          "email_verified": body.email_verified,
          "email": body.email,
          "user_metadata": body.user_metadata,
          "clientID": req.user.clientID,
          "updated_at": body.updated_at,
          "name": body.name,
          "picture": body.picture,
          "user_id": body.user_id,
          "nickname": body.nickname,
          "identities": body.identities,
          "created_at": body.created_at,
          "persistent": body.persistent,
          "app_metadata": req.user.app_metadata,
          "roles": req.user.app_metadata.roles,
          "user_status": req.user.app_metadata.user_status,
          "point": req.user.app_metadata.point,
          "ID": req.user.app_metadata.ID,
          "sub": req.user.sub,
        };

        return next();
      });
    });
  });

  // var userData = {
  //   telephone: req.body.phone,
  //   display_name: req.body.name
  // };

  // if (password) {
  //   userData.password = password;
  // }

  // if (req.user.member_type != "PUBLIC") {
  //   var meta = JSON.parse(req.user.meta_value);

  //   meta.business_type = req.body.business_type;
  //   meta.registered_number = req.body.registered_number;
  //   meta.owner_name = req.body.owner_name;
  //   // meta.company_address = req.body.company_address;
  //   meta.intro_comment = req.body.intro_comment;

  //   userData.meta_value = meta;
  // }

  // return User.update(userData, {
  //   where: {
  //     email: email
  //   }
  // }).then(function (array) {
  //   if (array[0] == 1) {

  //     return User.findOne({
  //       where: {
  //         email: email
  //       }
  //     }).then(function (user) {
  //       req.user = user.dataValues;
  //       return next();
  //     }).catch(function (err) {
  //       return res.send(err);
  //     });
  //   } else {
  //     req.flash('msg', '변경에 실패하였습니다.');
  //     return res.redirect('/change');
  //   }
  // }).catch(function (err) {
  //   return res.send(err);
  // });
}
