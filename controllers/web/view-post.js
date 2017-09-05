"use strict";

const models = require('../../models');

const Post = models.post;
const User = models.user;
const Translation = models.icl_translation;
const Coordinate = models.coordinate;
const Address = models.address;
const Comment = models.comment;

const moment = require("moment");

const config = require("../../config/main");
const value = require('../../utils/staticValue');

/* action */
let getPostInfo = function (ID) {
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

exports.getPostInfo = getPostInfo;

exports.createPostInfo = function (req, res, next) {

  return models.sequelize.transaction(function (t) {
    return Post.create({
      user_id: req.user.ID,
      title: req.body.title,
      content: req.body.content,
      post_status: req.body.post_status,
      post_type: req.body.category,
      locale: req.user.locale,
      meta_value: {
        written_device: 'web'
      }
    }, { transaction: t }).then(function (p) {
      // console.log(req.user);
      return Translation.create({
        element_id: p.ID,
        // element_type: "post", // ??
        group_id: 0,
        language_code: req.user.user_metadata.locale,
      }, { transaction: t }).then(function (i) {
        return Translation.update({
          group_id: i.ID
        }, { where: { ID: i.ID }, transaction: t }).then(function () {
          return Coordinate.create({
            translation_group_id: i.ID,
            // region_code: 
            lat: req.body.lat,
            lng: req.body.lng,
          }, { transaction: t }).then(function (c) {
            return Address.create({
              translation_id: i.ID,
              coordinate_id: c.ID,
              // post_code: 
              // region_code:
              addr1: req.body.address1,
              addr2: req.body.address1,
              detail: req.body.address2,
              // extra_info: 
              locale: i.language_code,
              translation_group_id: i.ID
            }, { transaction: t }).then(function (a) {
              return res.send({ ID: p.ID });
            });
          });
        });
      });
    });
  });
};

exports.createPostComment = function (req, res) {

  var postIdx = req.params.postIdx;
  var comment = req.body.comment;
  var userIdx = req.user.ID;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

  return Comment.create({
    post_id: postIdx,
    user_id: userIdx,
    content: comment,
    createdAt: createdAt
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
        return res.send("OK");
      });
    }

    return res.status(400).json({
      errorMsg: '다른 회원입니다.',
      statusCode: -1
    });
  });
}

exports.reEnrollPost = function (req, res) {

  var postIdx = req.params.postIdx;

  let updateData = {
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
  }

  return Post.update(updateData, {
    where: {
      ID: postIdx,
      user_id: req.user.ID
    }
  }).then(function (p) {
    if (p[0]) return res.send('OK');
    return res.send('other');
  }).catch(function (err) {
    return res.send(err);
  });
};



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

exports.postHtmlList = function (req, res) {

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
  }).then(function (p) {
    if (!p) return res.status(404).send();

    return res.render('post/list-item', {
      post: p
    });
  });
};

/* view */
exports.createPostInfoView = function (req, res) {

  if (!req.user.logined) {
    req.flash('msg', "requiredLogin");
    // return res.redirect('/post/room');
    return res.redirect('back');
  }

  // 기본적으로 user의 기본언어 선택사항을 따라가고,
  // 향후에 글 작성시 언어를 선택할 수 있도록 하자.
  return res.render('post/new', {
    ENV: req.env,
    logined: req.user.logined,
    userIdx: req.ID,
    title: "createPostInfoView",
    msg: req.msg,
    update: false,
    mediaUrl: config.mediaUrl,

    value: {
      placeType: value.placeType,
      room: value.room,
      floors: value.floors,
      postStatus: value.postStatus,
      postType: value.postType,
      lang: req.lang
    }
  });
};

exports.viewPostInfoView = function (req, res) {

  let postIdx = req.params.postIdx;

  return getPostInfo(postIdx).then(function (info) {
    return res.render('post/detail', {
      ENV: req.env,
      logined: req.user.logined,
      userIdx: req.ID,
      title: "viewPostInfoView",
      msg: req.msg,
      mediaUrl: config.mediaUrl,

      postTitle: info.post.title,
      createdAt: info.post.createdAt,
      comments: info.comments,
      commentCount: info.commentCount,

      email: info.post.user.email,
      phone: info.post.user.telephone,

      lat: info.positions[0].lat,
      lng: info.positions[0].lng,
    });
  });

};