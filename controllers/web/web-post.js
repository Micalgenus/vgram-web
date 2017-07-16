"use strict";

const models = require('../../models');

const Post = models.post;
const User = models.user;
const Translation = models.icl_translation;
const Coordinate = models.coordinate;
const Comment = models.comment;
const UserPostLike = models.user_post_like_relationship;

var config = require("../../config/main");

var log = require('console-log-level')({
   prefix: function () {
      return new Date().toISOString()
   },
   level: config.logLevel
});

const value = require('../../utils/staticValue');

exports.createPostView = function (req, res, next) {

   if (!req.user.logined) {
      req.flash('msg', "requiredLogin");
      // return res.redirect('/post/room');
      return res.redirect('back');
   }

   // 기본적으로 user의 기본언어 선택사항을 따라가고,
   // 향후에 글 작성시 언어를 선택할 수 있도록 하자.
   return res.render('post/new', {
      ENV: req.env,
      logined: req.user ? req.user.logined : false,
      title: "createPostView",
      msg: req.msg,
      update: false,
      value: {
         placeType: value.placeType,
         room: value.room,
         floors: value.floors,
         postStatus: value.postStatus,
         postType: value.postType,
         lang: req.lang
      }
   });
}

exports.createPostInfo = function(req, res, next) {

}

exports.getPostInfo = function(ID) {
    return Post.findOne({
        include: [{
            model: User,
        }, {
            model: Translation,
            include: [{
                model: Coordinate,
            }]
        }, {
            model: User,
            as: 'LikeUsers'
        }, {
            model: Comment,
            as: 'Comments',
            include: [{
                model: User,
            }],
            where: {
                post_id: ID
            },
        }],
        where: {
            ID: ID
        },
        order: [
            [ {model: Comment, as: 'Comments'}, 'createdAt', 'DESC' ]
        ]
    }).then(function(p) {
        let positions = p.icl_translation.coordinates;
        let likeCount = p.LikeUsers.length;
        let commentCount = p.Comments.length;

        return {
            post: p,
            positions: positions,
            likeCount: likeCount,
            comments: p.Comments,
            commentCount: commentCount
        }
    });
}
