"use strict";

const models = require('../../models');
const Post = models.post;
const User = models.user;
const Translation = models.icl_translation;
const Coordinate = models.coordinate;
const Comment = models.comment;
const Media = models.media;

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
      }]
    }, {
      model: Media,
    }],
    where: {
      ID: ID
    },
    order: [
      [{ model: Comment, as: 'Comments' }, 'createdAt', 'DESC']
    ]
  }).then(function (p) {
    if (!p) return null;
    
    let positions = p.icl_translation.coordinates;
    let likeCount = p.LikeUsers.length;
    let commentCount = p.Comments.length;

    let VTOUR = [];
    let NORMAL = [];
    let VRIMAGE = [];

    for (var i in p.media) {
      switch (p.media[i].type) {
        case 'VTOUR':
          VTOUR.push(p.media[i]);
          break;
        case 'NORMAL_IMAGE':
          NORMAL.push(p.media[i]);
          break;
        case 'VR_IMAGE':
          VRIMAGE.push(p.media[i]);
          break;
      }
    }

    return {
      post: p,
      positions: positions,
      likeCount: likeCount,

      comments: p.Comments,
      commentCount: commentCount,

      vtour: VTOUR,
      normal: NORMAL,
      vrimage: VRIMAGE
    }
  });
}