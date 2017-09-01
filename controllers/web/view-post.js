"use strict";

const models = require('../../models');

const Post = models.post;
const User = models.user;
const Translation = models.icl_translation;
const Coordinate = models.coordinate;
const Comment = models.comment;
const UserPostLike = models.user_post_like_relationship;

const moment = require("moment");

var config = require("../../config/main");

exports.getPostInfo = function (ID) {
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
            [{ model: Comment, as: 'Comments' }, 'createdAt', 'DESC']
        ]
    }).then(function (p) {
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

exports.createPostInfo = function (req, res, next) {

    return Post.create({
        user_id: req.user.ID,
        title: req.body.title,
        content: req.body.content,
        post_status: req.body.post_status,
        post_type: req.body.category,
        locale: req.user.locale,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        meta_value: {
            written_device: 'web'
        }
    }).then(function (p) {
        return res.send({ ID: p.ID });
    });
};

exports.createPostComment = function (req, res) {

    var postIdx = req.params.postIdx;
    var comment = req.body.comment;
    var userIdx = req.user.ID;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

    // db에 넣으면 됨
    /*
        models.User.create({userID: '유저ID', password: '유저PW'})
        .then(result => {
           res.json(result);
        })
        .catch(err => {
           console.error(err);
        });
        */

    return Comment.create({
        post_id: postIdx,
        user_id: userIdx,
        content: comment,
        createdAt: createdAt,
        updatedAt: updatedAt
    }).then(function (c) {
        return User.findOne({
            where: {
                ID: userIdx
            }
        }).then(function (u) {
            return res.send({
                user: u,
                createdAt: createdAt,
                comment: comment,
                mediaUrl: config.mediaUrl
            });
        });
    });
}

exports.deletePost = function (req, res) {
    var postIdx = req.params.postIdx;

    return Post.findOne({
        where: {
            Id: postIdx
        }
    }).then(function (p) {
        if (p.user_id == req.user.ID) {
            return Post.destroy({
                where: {
                    ID: postIdx
                }
            }).then(function (p) {
                return res.redirect('back');
            });
        }

        return res.status(400).json({
            errorMsg: '다른 회원',
            statusCode: -1
        });
exports.getPostInfoJson = function (req, res) {
  var idx = req.params.postIdx;

  return getPostInfo(idx).then(function (d) {
    return res.send({
      postId: d.post.ID,

      likeUserCount: d.post.LikeUsers.length,
      comments: d.comments,
      commentCount: d.commentCount,

      mediaUrl: config.mediaUrl,

      data: d
    });
  });
}

exports.roomHtmlList = function (req, res) {

  let page = req.params.roomListPage;
  let count = 6;
  let index = count * (page - 1);

  return Post.findAll({
    include: [{
      model: User
    }, {
      model: Comment,
      as: 'Comments',
      attributes: ["ID", "post_id"]
    }, {
      model: User,
      as: 'LikeUsers'
    }],
    limit: count,
    offset: index,
    order: [
      ['createdAt', 'DESC'],
      ['ID', 'DESC']
    ],
    where: {
      post_type: {
        $notIn: ['NOTICE', 'EVENT']
      }
    }
  }).then(function (r) {
    if (!r) return res.status(404).send();

    return res.render('room/room-scroll', {
      room: r
    });
  });
};