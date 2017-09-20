"use strict";

const models = require('../../models');

const Post = models.post;
const User = models.user;
const Translation = models.icl_translation;
const Coordinate = models.coordinate;
const Address = models.address;
const Comment = models.comment;
const Media = models.media;

const moment = require("moment");
const _ = require("lodash");

const config = require("../../config/main");
const value = require('../../utils/staticValue');
const genToken = require("../../utils/genToken");

const Firebase = require('./firebase');

/* action */
let getPostInfo = function (ID, device) {  // API쪽으로 옮기자
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
          p.media[i].file_path = p.media[i].getDevicePath(device);
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

exports.getPostInfo = getPostInfo;

exports.createPostInfo = function (req, res, next) {
  let profile = genToken.decodedToken(req.cookies['user_profile_token']);

  return models.sequelize.transaction(function (t) {
    return Post.create({
      user_id: req.user.ID,
      title: req.body.title,
      content: req.body.content,
      post_status: req.body.post_status,
      post_type: req.body.category,
      locale: profile.user_metadata.locale || profile.locale.toLowerCase(),
      meta_value: {
        written_device: 'web'
      }
    }, { transaction: t }).then(function (post) {
      // console.log(req.user);
      return Translation.create({
        element_id: post.ID,
        // element_type: "post", // ??
        group_id: 0,
        language_code: profile.user_metadata.locale || profile.locale.toLowerCase(),
      }, { transaction: t }).then(function (translation) {
        return Translation.update({
          group_id: translation.ID
        }, { where: { ID: translation.ID }, transaction: t }).then(function () {
          return Coordinate.create({
            translation_group_id: translation.ID,
            // region_code:
            lat: req.body.lat,
            lng: req.body.lng,
          }, { transaction: t }).then(function (coordinate) {
            return Address.create({
              translation_id: translation.ID,
              coordinate_id: coordinate.ID,
              // post_code:
              // region_code:
              addr1: req.body.address1,
              addr2: req.body.address1,
              detail: req.body.address2,
              // extra_info:
              locale: translation.language_code,
              translation_group_id: translation.ID
            }, { transaction: t }).then(function (addr) {
              Firebase.notificationCreatePost(req.user, post);
              return res.send({ ID: post.ID });
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

  return getPostInfo(idx, req.device.type).then(function (d) {
    return res.send({
      postId: d.post.ID,

      likeUserCount: d.post.LikeUsers.length,
      comments: d.comments,
      commentCount: d.commentCount,

      mediaUrl: config.mediaUrl,

      loginedUserId: req.user.logined ? req.user.ID : null,

      data: d
    });
  });
}

exports.postHtmlList = function (req, res) {  // Method 이름 바꾸기, 뭐하는건지 모르겠음

  let page = req.params.roomListPage;
  let count = 6;
  let index = count * (page - 1);

  return Post.findAll({
    include: [{
      model: User
    }, {
      model: Comment,
      as: 'Comments',
      attributes: ["ID", "post_id"]  // comment count 조회를 COUNT() 대신 comment.length로 하기 위해서
    }, {
      model: User,
      as: 'LikeUsers'
    }, {
      model: Media,
      where: {
        type: {
          $in: ["NORMAL_IMAGE"]
        }
      }
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

    // device별 path 변환
    for (let post of p) {
      for (let media of post.media) {
        media.file_path = media.getDevicePath(req.device.type);
      }
    }

    return res.render('post/main-list-item', {
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

  return getPostInfo(postIdx, req.device.type).then(function (info) {
    // info {
    //   post: p,
    //   positions: positions,
    //   likeCount: likeCount,
    //
    //   comments: p.Comments,
    //   commentCount: commentCount,
    //
    //   vtour: VTOUR,
    //   normal: NORMAL,
    //   vrimage: VRIMAGE,
    // }

    return res.render('post/detail', {
      ENV: req.env,
      logined: req.user.logined,
      userIdx: req.user.ID,
      title: "viewPostInfoView",
      msg: req.msg,
      mediaUrl: config.mediaUrl,
      domainUrl: config.host,

      post: info.post,
      postID: info.post.ID,
      postTitle: info.post.title,
      postType: info.post.post_type,
      createdAt: info.post.createdAt,
      comments: info.comments,
      commentCount: info.commentCount,

      images: JSON.parse(info.post.thumbnail_image_path)[0].vrimages,

      email: info.post.user.email,
      nickname: info.post.user.nickname,
      phone: info.post.user.telephone,
      memberType: info.post.user.member_type,

      myPost: req.user.logined && info.post.user.ID == req.user.ID,

      lat: info.positions[0].lat,
      lng: info.positions[0].lng,
    });
  });

};

exports.embedPost = function (req, res) {
  //id를 가져와서 다른 이미지를 보여주는 로직 구현이 필요
  res.render('embed/krpano', {
    ENV: env,
    title: 'embedView',
    msg: req.msg
  });

  // res.status(200).json({ quote: quoter.getRandomOne() });
}
