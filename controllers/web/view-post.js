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

exports.createPostComment = function (req, res) {

    var postIdx = req.params.postIdx;
    var comment = req.body.comment;
    var userIdx = req.user.ID;
    var createdAt = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    var updatedAt = moment.utc().format('YYYY-MM-DD HH:mm:ss');

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
            ID: userIdx
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
