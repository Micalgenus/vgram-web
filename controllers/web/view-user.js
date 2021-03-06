/**
 * Created by HAN on 2017-01-19.
 */

"use strict";
// const multer = require('multer');

const models = require('../../models');
const User = models.user;
const Post = models.post;
const Comment = models.comment;

// const multerConfig = require('../../config/multer');
const value = require('../../utils/staticValue');

const authController = require('./auth.js');


const auth = require("../core/auth");
const config = require('../../config/main');

const request = require('request');
const requestp = require('request-promise');
const xss = require('xss');

const Firebase = require('../core/firebase');
const postController = require('./view-post');

const logger = require("../../utils/logger");

// for file download
// const userInfoUpload = multer({ storage: multerConfig.userInfoStorage }).fields([
//   { name: value.fieldName.PROFILE_IMAGE, maxCount: 1 }]);


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

    return User.findAll({
      include: [{
        model: User,
        as: 'Subscribes',
        where: {
          ID: userIdx
        }
      }],
    }).then(function (c) {

      let sns = u.meta_value.sns || {};

      return res.render('user/change', {
        ENV: req.env,
        logined: req.user.logined,
        userIdx: req.user.ID,
        userAuthId: req.user.sub,
        title: 'viewChangeProfile',
        msg: req.msg,

        value: {
          memberType: value.memberType,
          lang: req.lang
        },

        mediaUrl: config.mediaUrl,

        nickname: u.nickname,
        userLikeCount: c.length,
        phone: u.telephone,
        member_type: u.member_type,
        profile_image_path: u.profile_image_path,
        targetIdx: req.user.ID,

        registered_number: u.meta_value.registered_number,
        owner_name: u.meta_value.owner_name,
        post_code: u.meta_value.address.post_code,
        addr1: u.meta_value.address.addr1,
        addr2: u.meta_value.address.addr2,

        sns: sns,

        comment: u.meta_value.comment
      });
    });

  });
}

exports.viewProfile = function (req, res) {

  // let userIdx = req.user.ID;
  let userIdx = req.params.userIdx;

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

    u.meta_value = JSON.parse(u.meta_value);

    return User.findAll({
      include: [{
        model: User,
        as: 'Subscribes',
        where: {
          ID: userIdx
        }
      }],
    }).then(function (c) {

      var myPage = false;
      if (req.user.logined && req.user.ID == userIdx) myPage = true;

      let sns = u.meta_value.sns || {};

      return res.render('user/mypage', {
        ENV: req.env,
        logined: req.user.logined,
        userIdx: req.user.ID,
        userAuthId: req.user.sub,
        title: 'userDetailView',
        msg: req.msg,
        mediaUrl: config.mediaUrl,

        value: {
          memberType: value.memberType,
          lang: req.lang
        },

        myPage: myPage,

        nickname: u.nickname,
        member_type: u.member_type,
        userLikeCount: c.length,
        profile_image_path: u.profile_image_path,
        targetIdx: u.ID,

        sns: sns,

        comment: xss(u.meta_value.comment)
        // email: req.user.email,
        // phone: req.user.telephone,
        // business_type: business_type,
        // registered_number: registered_number,
        // owner_name: owner_name,
        // company_address: company_address,
        // intro_comment: intro_comment,
      });
    });
  });

}

exports.getFollower = function (req, res) {
  // id->target에서 id추출
  let userIdx = req.params.userIdx;

  return User.findAll({
    include: [{
      model: User,
      as: 'Subscribes',
      // include: [{
      //   model: User,
      //   as: 'Subscribes',
      //   where: {
      //     ID: {
      //       $like: models.sequelize.col('user.ID'),
      //     }
      //   },
      //   attributes: ['ID'],
      //   require: false, // 여기가 안먹음 (outer join 으로 하려는데 안됨)
      // }],
      where: {
        ID: userIdx,
      },
      attributes: ['ID'],
    }],
  }).then(function (u) {
    return res.send(u);
  });
}

exports.getFollowing = function (req, res) {
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
    return res.send(u.Subscribes);
  });
}

exports.getPosts = function (req, res) {
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
    return res.send(posts);
  });
}

exports.getNotice = function (req, res) {
  let userIdx = req.params.userIdx;

  return User.findOne({
    where: {
      ID: userIdx
    }
  }).then(function (u) {
    if (u) return res.send(u.auth0_user_id);
    return res.send({});
  });
}

exports.getLikeposts = function (req, res) {
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
    return res.send(user.LikePosts);
  });
}

exports.getUserList = function (req, res) {
  let userIdxList = JSON.parse(req.params.userIdxList);

  return User.findAll({
    where: {
      auth0_user_id: {
        $in: userIdxList
      }
    },
    attributes: ['nickname'],
  }).then(function (users) {
    return res.send(users);
  });
}

exports.change = function (req, res, next) {

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

        // req.user.profile = {
        //   "email_verified": body.email_verified,
        //   "email": body.email,
        //   "user_metadata": body.user_metadata,
        //   "clientID": req.user.clientID,
        //   "updated_at": body.updated_at,
        //   "name": body.name,
        //   "picture": body.picture,
        //   "user_id": body.user_id,
        //   "nickname": body.nickname,
        //   "identities": body.identities,
        //   "created_at": body.created_at,
        //   "persistent": body.persistent,
        //   "app_metadata": req.user.app_metadata,
        //   "roles": req.user.app_metadata.roles,
        //   "user_status": req.user.app_metadata.user_status,
        //   "point": req.user.app_metadata.point,
        //   "ID": req.user.app_metadata.ID,
        //   "sub": req.user.sub,
        // };

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


exports.delete = function (req, res) {

  return auth.getAdminToken().then(function (token) {

    let args = {
      method: 'DELETE',
      uri: config.auth0.IDENTIFIER + 'users/' + req.user.sub,

      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }

    return request(args, function (e, r, body) {
      return User.destroy({
        where: {
          ID: req.user.ID
        }
      }).then(function (d) {
        return res.send('OK');
      }).catch(function (err) {
        return res.send(err);
      });
    });

  });
}
/*id랑 기존비밀번호를 로그인시켜서 로그인하면 변경하고 로그인에 실패하면 컷트 시킬것*/
exports.changePassword = function (req, res, next) {

  return auth.getAdminToken().then(function (token) {

    let args = {
      method: 'PATCH',
      uri: config.auth0.IDENTIFIER + 'users/' + req.user.sub,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      json: {
        password: req.body.newpassword,
        connection: 'Username-Password-Authentication',

      },

    };
    /*request promis*/
    return requestp(args).then(function (body) {
      return next();
    }).catch(next);


  });

  //새 비밀번호를 잘못 입력했을때
}



exports.viewPassword = function (req, res) {
  let auth0_user_id = req.user.sub;

  return User.findOne({
    where: {
      auth0_user_id: auth0_user_id
    }
  }).then(function (u) {
    if (!u) return res.redirect('/');

    return User.findAll({
      include: [{
        model: User,
        as: 'Subscribes',
        where: {
          auth0_user_id: auth0_user_id
        }
      }],
    }).then(function (c) {

      return res.render('user/password', {
        ENV: req.env,
        logined: req.user.logined,
        userIdx: req.user.ID,
        userAuthId: req.user.sub,
        title: 'viewPassword',
        msg: req.msg,

        value: {
          memberType: value.memberType,
          lang: req.lang
        },

        profile_image_path: u.profile_image_path,
        nickname: u.nickname,
        member_type: u.member_type,
        userLikeCount: c.length,
      })
    });
  });
}

exports.viewSetting = function (req, res) {
  let auth0_user_id = req.user.sub;

  return User.findOne({
    where: {
      auth0_user_id: auth0_user_id
    }
  }).then(function (u) {
    if (!u) return res.redirect('/');

    return User.findAll({
      include: [{
        model: User,
        as: 'Subscribes',
        where: {
          auth0_user_id: auth0_user_id
        }
      }],
    }).then(function (c) {

      return res.render('user/setting', {
        ENV: req.env,
        logined: req.user.logined,
        userIdx: req.user.ID,
        userAuthId: req.user.sub,
        title: 'viewSetting',
        msg: req.msg,

        value: {
          memberType: value.memberType,
          lang: req.lang
        },

        profile_image_path: u.profile_image_path,
        nickname: u.nickname,
        member_type: u.member_type,
        userLikeCount: c.length,
      })
    });
  });
};