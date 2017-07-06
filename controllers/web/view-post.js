"use strict";

const models = require('../../models');

const Post = models.post;
const User = models.user;
const Translation = models.icl_translation;
const Coordinate = models.coordinate;
const Comment = models.comment;
const UserPostLike = models.user_post_like_relationship;

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
