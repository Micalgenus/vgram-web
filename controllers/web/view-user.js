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

// for file download
const userInfoUpload = multer({ storage: multerConfig.userInfoStorage }).fields([
   { name: value.fieldName.PROFILE_IMAGE, maxCount: 1 }]);



//========================================
// User Routes
//========================================
// 회원 정보 조회

exports.viewProfile = function (req, res) {

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
   }).then(function(u) {
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

exports.getFollower = function(req, res) {
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
  }).then(function(u) {
    return res.send(u);
  });
}

exports.getFollowing = function(req, res) {
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
  }).then(function(u) {
    return res.send(u.Subscribes);
  });
}

exports.getPosts = function(req, res) {
  let userIdx = req.params.memberIdx;

  return Post.findAll({
    include: [{
      model: User
    }, {
      model: User,
      as: 'LikeUsers'
    },{
      model: Comment,
      as: 'Comments'
    }],
    where: {
      user_id: userIdx,
    },
    order: [['ID', 'DESC']]
  }).then(function(posts) {
    return res.send(posts);
  });
}

exports.getReplies = function(req, res) {
  let userIdx = req.params.memberIdx;

  return Comment.findAll({
    include: [{
      model: User
    }],
    where: {
      user_id: userIdx
    }
  }).then(function(comments) {
    return res.send(comments);
  });
}

exports.getLikeposts = function(req, res) {
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
      [ {model: Post, as: 'LikePosts'}, 'ID', 'DESC' ]
    ]
  }).then(function(user) {
    return res.send(user.LikePosts);
  });
}

exports.change = function(req, res, next) {
   const email = req.user.email;
   const password = req.body.password;
   const repassword = req.body.repassword;

   if (password != repassword) {
      req.flash('msg', '비밀번호가 일치하지 않습니다.');
      return res.redirect('/change');
   }

   var userData = {
      telephone: req.body.phone,
      display_name: req.body.name
   };

   if (password) {
      userData.password = password;
   }

   if (req.user.member_type != "PUBLIC") {
      var meta = JSON.parse(req.user.meta_value);

      meta.business_type = req.body.business_type;
      meta.registered_number = req.body.registered_number;
      meta.owner_name = req.body.owner_name;
      // meta.company_address = req.body.company_address;
      meta.intro_comment = req.body.intro_comment;

      userData.meta_value = meta;
   }

   return User.update(userData, {
      where: {
         email: email
      }
   }).then(function(array) {
      if (array[0] == 1) {

         return User.findOne({
            where: {
               email: email
            }
         }).then(function(user) {
            req.user = user.dataValues;
            return next();
         }).catch(function(err) {
            return res.send(err);
         });
      } else {
         req.flash('msg', '변경에 실패하였습니다.');
         return res.redirect('/change');
      }
   }).catch(function(err) {
      return res.send(err);
   });
}
