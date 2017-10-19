"use strict";

const models = require('../../models');
const Coordinate = models.coordinate;
const Post = models.post;
const User = models.user;
const Comment = models.comment;
const Translation = models.icl_translation;
const Address = models.address;
const Media = models.media;

// const Room = models.room;

const value = require('../../utils/staticValue');

exports.postInfoListView = function (req, res) {
  return res.render('post/map', {
    ENV: req.env,
    logined: req.user.logined,
    userIdx: req.ID,
    userAuthId: req.user.sub,
    title: "postInfoListView",     // locale과 매칭되는 변수명을 적어야함.
    msg: req.msg,
    lat: value.mapLocationCenter.lat,
    lng: value.mapLocationCenter.lng,
    value: {
      placeType: value.placeType,
      room: value.room,
      lang: req.lang
    }
  });
}

exports.postInfoListJson = function (req, res) {
  let list = JSON.parse(req.params.postIdxList);

  if (list.length == 0) return res.send([]);

  return Post.findAll({
    include: [{
      model: User
    }, {
      model: Comment,
      as: 'Comments',
      attributes: ["ID", "post_id"]  // comment count 조회를 COUNT() 대신 comment.length로 하기 위해서
    }, {
      model: User,
      as: 'LikeUsers' // comment count 조회를 COUNT() 대신 comment.length로 하기 위해서
    }, {
      model: Media,
      where: {
        type: {
          $in: ["NORMAL_IMAGE"]
        }
      }
    }, {
      model: Translation,
      attributes: ['group_id'],
      include: [{
        model: Coordinate,
        attributes: ['lat', 'lng']
      }, {
        model: Address,
        attributes: ['addr1', 'addr2']
      }]
    }],

    where: {
      ID: {
        $in: list
      }
    },
  }).then(function (posts) {
    // device별 path 변환
    for (let post of posts) {
      for (let media of post.media) {
        media.file_path = media.getDevicePath(req.device.type);
      }
    }

    return res.status(200).send(posts);
  });
}

exports.getPostLocations = function (req, res) {
  let east = req.params.east;
  let west = req.params.west;
  let south = req.params.south;
  let north = req.params.north;

  return Coordinate.findAll({
    include: [{
      model: Translation,
      required: true,
      attributes: ['group_id'],
      include: [{
        model: Post,
        required: true,
        attributes: ['ID'],
      }],
    }],
    where: {
      lat: {
        $and: {
          $lt: north,
          $gt: south
        }
      },
      lng: {
        $and: {
          $lt: east,
          $gt: west
        }
      }
    },
    attributes: ['ID', 'lat', 'lng']
  }).then(function (locations) {
    return res.send(locations);
  });
}

