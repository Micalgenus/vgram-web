"use strict";

const models = require('../../models');

const Room = models.room;
const Post = models.post;
const User = models.user;
const Translation = models.icl_translation;
const Coordinate = models.coordinate;

const _ = require('lodash');
const Promise = require("bluebird");
const moment = require("moment");

const roomInfo = require('../core/room-info');

var env = process.env.NODE_ENV || "development";
var config = require("../../config/main");

var log = require('console-log-level')({
   prefix: function () {
      return new Date().toISOString()
   },
   level: config.logLevel
});

const multerConfig = require('../../config/multer');
const value = require('../../utils/staticValue');
const i18nConverter = require('../../utils/i18n-converter');

exports.roomInfoListData = function(req, res) {
  let page = (req.query.page ? req.query.page : 1);

  return Room.count()
  .then(function(roomCount) {

    let count = (req.query.pageSize ? req.query.pageSize : 20);
    let lastPage = parseInt(roomCount / count) + 1;
    var index = (count * (page - 1));

    // 잘못된 요청일 경우 넘어감
    if (page > lastPage) {
      let size = req.query.pageSize ? '&pageSize=' + count.toString() : '';
      return res.redirect('/room?page=' + lastPage.toString() + size);
    }
    if (page < 1) {
      let size = req.query.pageSize ? '?pageSize=' + count.toString() : '';
      return res.redirect('/room' + size);
    }

    return Room.findAll({
      include: [ {
        model: Post,
        attributes: ['ID']
      } ],
      limit: count,
      offset: index,
      order: '`room`.`ID` DESC'
    }).then(function(rooms) {
      var roomInfo = [];
      rooms.forEach(function(room) {
        var tmpRoom = {};

        // 임시
        let image = room.thumbnail_image_path;
        if (!image.match(/^https?:\/\//)) {
          image = "http://localhost:3000/" + image;
        }

        //    let address = JSON.parse(room.address);

        tmpRoom['id'] = room.ID;
        tmpRoom['image'] = image;
        //    tmpRoom['address'] = address.addr1 + ' ' + address.addr2;
        tmpRoom['title'] = room.post.title;

        roomInfo.push(tmpRoom);
      });

      return res.render('room/room-list', {
        ENV: req.env,
        logined: req.user ? req.user.logined : false,
        title: req.i18n("title")["roomInfoListView"] + req.i18n("app")["name"],
        msg: req.msg,
        nowPage: page,
        lastPage: lastPage,
        rooms: roomInfo,
        lat: value.mapLocationCenter.lat,
        lng: value.mapLocationCenter.lng
      });
    });
  });
}

exports.roomInfoListView = function(req, res) {
  return res.render('room/room-list', _.assignIn({
        ENV: req.env,
        logined: req.user ? req.user.logined : false,
        title: req.i18n("title")["roomInfoListView"] + req.i18n("app")["name"],
        msg: req.msg
     }, {
     lat: value.mapLocationCenter.lat,
     lng: value.mapLocationCenter.lng
  }));
}

/**
 * 시공사례입력(use vrpano-promise)
 * @param req
 * @param res
 * @param next
 */
exports.createRoomInfoView = function (req, res, next) {

   if (!req.user.logined) {
      req.flash('msg', req.i18n("requiredLogin"));
      return res.redirect('/room');
   }

   // 방타입, 전월세여부, 층수에 대한 name-value 추출
   var pairs = i18nConverter.getLangPair(
      {
         placeType: value.placeType,
         roomContractCondition: value.roomContractCondition,
         floors: value.floors,
         postStatus: value.postStatus,
         postType: value.postType
      }, req);

   // 기본적으로 user의 기본언어 선택사항을 따라가고,
   // 향후에 글 작성시 언어를 선택할 수 있도록 하자.
   pairs.lang = req.user.locale || req.getLocale();

   return res.render('room/room-new', {
      ENV: req.env,
      logined: req.user ? req.user.logined : false,
      title: req.i18n("title")["createRoomInfoView"] + req.i18n("app")["name"],
      msg: req.msg,
      update: false,
      value: pairs
   });
}

// 1. file 다운로드, request parameter check
// 2. core.createRoomInfoAndVRPano -> return promise
// 3. promise에 따른 결과값 return
/**
 * Action - 방 정보 입력
 * @param req
 * @param res
 * @param next
 */
exports.createRoomInfo = function (req, res, next) {
   if (!req.user.logined) {
      req.flash('msg', req.i18n("requiredLogin"));
      return res.redirect('/room');
   }

   if (req.user.memberType != value.memberType.BUSINESS) {
      return res.status(401).json({
         errorMsg: 'You are not authorized to create roominfo case.',
         statusCode: 2
      });
   }

   if (!req.body.title) {
      return res.status(401).json({
         errorMsg: 'You must enter an required field! please check title',
         statusCode: -1
      });
   }

   if (!req.body.roomType) {
      return res.status(401).json({
         errorMsg: 'You must enter an required field! please check roomType',
         statusCode: -1
      });
   }

   if (!req.body.address) {
      return res.status(401).json({
         errorMsg: 'You must enter an required field! please check address',
         statusCode: -1
      });
   }

   if (!req.files[value.fieldName.NORMAL_IMAGE] || !req.files[value.fieldName.VR_IMAGE]) {
      return res.status(401).json({
         errorMsg: 'You must enter an required field! please check file["previewImage"]',
         statusCode: -1
      });
   }

   return roomInfo.createRoomInfoAndVRPano(req, res)     // return promise
      .then(function() {
         req.flash('msg', res.i18n('createPostComplete'));
         return res.redirect(202, '/room');
      }).catch(next);      // all errors asynchronous and synchronous get propagated to the error middleware.
}


// preview image 수정 후 잘 뜨는지 확인해야함.
exports.changeRoomInfoView = function(req, res, next) {
   if (!req.user.logined) {
      req.flash('msg', req.i18n("requiredLogin"));
      return res.redirect('/room');
   }

   // 방타입, 전월세여부, 층수에 대한 name-value 추출
   var pairs = i18nConverter.getLangPair(
      {
         placeType: value.placeType,
         roomContractCondition: value.roomContractCondition,
         floors: value.floors,
         postStatus: value.postStatus,
         postType: value.postType
      }, req);

   // 기본적으로 user의 기본언어 선택사항을 따라가고,
   // 향후에 글 작성시 언어를 선택할 수 있도록 하자.
   pairs.lang = req.user.locale || req.getLocale();

   return res.render('room/room-new', {
      ENV: req.env,
      logined: req.user ? req.user.logined : false,
      title: req.i18n("title")["updateRoomInfoView"] + req.i18n("app")["name"],
      msg: req.msg,
      update: true,
      value: pairs
   });
}


// preview image 수정 후 잘 뜨는지 확인해야함.
exports.updateRoomInfo = function(req, res, next) {
   // if (!req.params.roomInfoIdx) {
   //   return res.status(401).json({
   //     errorMsg: 'You must enter an required param! please check :roomInfoIdx',
   //     statusCode: -1
   //   });
   // }
   // const roomInfoIdx = _.toNumber(req.params.roomInfoIdx);
   //
   // if (req.user.memberType != value.memberType.LEASE_MEMBER) {
   //   return res.status(401).json({
   //     errorMsg: 'You are not authorized to create roominfo case.',
   //     statusCode: 2
   //   });
   // }
   //
   // if (!req.body.title) {
   //   return res.status(401).json({
   //     errorMsg: 'You must enter an required field! please check title',
   //     statusCode: -1
   //   });
   // }
   //
   // if (!req.body.roomType) {
   //   return res.status(401).json({
   //     errorMsg: 'You must enter an required field! please check roomType',
   //     statusCode: -1
   //   });
   // }
   //
   // if (!req.body.address) {
   //   return res.status(401).json({
   //     errorMsg: 'You must enter an required field! please check address',
   //     statusCode: -1
   //   });
   // }
   //
   // if (!req.files[value.fieldName.prevImg]) {
   //   return res.status(401).json({
   //     errorMsg: 'You must enter an required field! please check file["previewImage"]',
   //     statusCode: -1
   //   });
   // }
   //
   // let updateRoomInfo = Promise.method(function (initWriteDate, previewImagePath) {
   //   // 나중에 VR Tour 변경될 때 promise 형식으로 한번에 바꾸자
   //   const room = {
   //     memberIdx: req.user.idx,
   //     title: req.body.title,
   //     roomType: req.body.roomType == "" ? null : _.toNumber(req.body.roomType),
   //     address: req.body.address == "" ? null : req.body.address,    // JSON.stringify(address) 형식 그대로 온다.
   //     mainPreviewImage: _.isNil(previewImagePath) ? null : previewImagePath,
   //     deposit: req.body.deposit == "" ? null : _.toNumber(req.body.deposit),
   //     monthlyRentFee: req.body.monthlyRentFee == "" ? null : _.toNumber(req.body.monthlyRentFee),
   //     floor: req.body.floor == "" ? null : _.toNumber(req.body.floor),
   //     manageExpense: req.body.manageExpense == "" ? null : _.toNumber(req.body.manageExpense),
   //     manageService: req.body.manageService == "" ? null : req.body.manageService,
   //     areaSize: req.body.areaSize == "" ? null : _.toNumber(req.body.areaSize),
   //     actualSize: req.body.actualSize == "" ? null : _.toNumber(req.body.actualSize),
   //     parking: req.body.parking == "" ? null : _.toNumber(req.body.parking),
   //     elevator: req.body.elevator == "" ? null : _.toNumber(req.body.elevator),
   //     supplyOption: req.body.supplyOption == "" ? null : _.toNumber(req.body.supplyOption),
   //     availableDate: req.body.availableDate == "" ? null : req.body.availableDate,
   //     HTMLText: req.body.HTMLText == "" ? null : req.body.HTMLText,
   //     // VRImages: _.isNil(vrImages) ? null : JSON.stringify(vrImages),   // 현재는 변환 전임을 표시함.
   //     locationInfo: req.body.locationInfo == "" ? null : req.body.locationInfo,
   //     coordinate: req.body.coordinate == "" ? null : req.body.coordinate,    // JSON.stringify() 형식 그대로 오기 때문에
   //     regionCategory: req.body.regionCategory == "" ? null : req.body.regionCategory,   // JSON.stringify() 형식 그대로
   //     initWriteDate: _.isNil(initWriteDate) ? null : moment(_.toNumber(initWriteDate)).format("YYYY-MM-DD HH:MM:SS"),   // timestamp로 변환
   //     fileRef: _.isNil(initWriteDate) ? null : _.toNumber(initWriteDate)
   //   }
   //
   //   // return Array[0] = affectedRows
   //   return RoomInfoBoard.update(room, {where: {idx: roomInfoIdx}}).then(function (array) {
   //     return res.status(200).json({
   //       msg: 'changed ' + array[0] + ' rows',
   //       statusCode: 1
   //     });
   //   }).catch(function (err) {
   //     if (err) {
   //       res.status(400).json({
   //         errorMsg: 'RoomInfoBoard Error : No user could be found for this ID.',
   //         statusCode: 2
   //       });
   //       return next(err);
   //     }
   //   });
   // });
   //
   // return moveImagePromise.makeNewSavePath(req)
   //   .then(function (newSavePath) {
   //     return Promise.join(
   //       moveImagePromise.movePreviewImage(req, value.fieldName.prevImg, newSavePath, config.resourcePath), function (previewImage) {
   //         return {initWriteDate: newSavePath, previewImage: previewImage};
   //       });
   //   }).then(function (result) {
   //   return updateRoomInfo(result.initWriteDate, result.previewImage);
   // }).done(function (result) {
   //   log.debug(result);
   //   next();
   // }, function (err) {
   //   log.error(err);
   //   next(err);
   // });
   req.flash('msg', req.i18n("editPostComplete"));
   return res.redirect(202, '/room');
   // return res.redirect('/room/[:roomInfoIdx]');    <- redirect를 이렇게 걸자
}

exports.deleteRoomInfo = function(req, res) {
   // const roomInfoIdx = req.params.roomInfoIdx;
   //
   // return RoomInfoBoard.findOne({
   //   where: {
   //     idx: roomInfoIdx
   //   }
   // }).then(function(room) { // 다른 회원의 내용일 경우 열람 불가능
   //   if (req.user.idx != room.memberIdx) {
   //     return res.status(400).json({
   //         errorMsg: '다른 회원',
   //         statusCode: -1
   //       });
   //   }
   //
   //   return RoomInfoBoard.destroy({
   //     where: {
   //       idx: roomInfoIdx
   //     }
   //   }).then(function() {
   //     return res.status(200).json({ statusCode: 1 });
   //   }).catch(function(err) {
   //     if (err) {
   //       return res.status(400).json({
   //         errorMsg: '삭제 실패',
   //         statusCode: -1
   //       });
   //     }
   //   });
   // }).catch(function(err) {
   //   console.log(err);
   //   if (err) {
   //     return res.status(400).json({
   //       errorMsg: '정보 없음',
   //       statusCode: -1
   //     });
   //   }
   // });
   req.flash('msg', req.i18n("deletePostComplete"));
   return res.redirect(202, '/room');
}

exports.roomInfoDetailView = function(req, res) {

   let idx = req.params.roomInfoIdx;

   return Room.findOne({
     include: [ {
       model: Post,
       attributes: ['ID', 'title', 'read_count'],
       include: [ {
         model: User,    // as 옵션을 어떻게 쓰는거지??
         attributes: ['email', 'telephone'],
       }, {
         model: Translation,
         attributes: ['group_id'],
         include: [ {
           model: Coordinate,
           attributes: ['lat', 'lng']
         } ]
       } ],
     } ],
     where: {
       ID: idx
     },
     attributes: ['room_type', 'createdAt', 'deposit', 'monthly_rent_fee'],
   }).then(function(room) {

      var type = room.room_type;
      // var position = JSON.parse(room.coordinate);

      // return res.send();
      let position = room.post.icl_translation.coordinates[0];

      let lat = position.lat;
      let lng = position.lng;
      switch (type) {
         case "APARTMENT":       type = "아파트"; break;
         case "VILLA":           type = "빌라"; break;
         case "DETACHED_HOUSE":  type = "주택"; break;
         case "ONE_ROOM":        type = "원룸"; break;
         case "TWO_ROOM":        type = "투룸"; break;
         case "THREE_ROOM":      type = "쓰리룸"; break;
         case "OFFICETEL":       type = "오피스텔"; break;
         case "OFFICE":          type = "사무실"; break;
         case "SHOPPING":        type = "상가, 매장"; break;
         case "CAFE_RESTAURANT": type = "카페, 식당"; break;
         case "ACADEMY":         type = "학원, 교육관련"; break;
         case "HOSPITAL":        type = "병원"; break;
      }

      return res.render('room/room-detail', {
         ENV: req.env,
         logined: req.user ? req.user.logined : false,
         msg: req.msg,
         title: req.i18n("title")["roomInfoDetailView"] + req.i18n("app")["name"],

         // 기본 정보
         postTitle: room.post.title,
         read: room.post.read_count,
         createdAt: room.createdAt,

         // 위치정보
         lat: lat,
         lng: lng,

         // 방정보
         deposit: room.deposit,
         monthlyRentFee: room.monthly_rent_fee,
         roomType: type,

         // 연락
         email: room.post.user.email,
         phone: room.post.user.telephone,
      });
   });
}

exports.searchRoomListView = function(req, res) {
   // let pageSize, pageStartIndex, query = req.query.query;
   //
   // // 페이지 정보 확인
   // if (!req.query.pageSize || !req.query.pageStartIndex) {
   //   // query가 제대로 오지 않으면 초기값으로 보낸다.
   //   pageSize = 10;
   //   pageStartIndex = 0;
   // } else {
   //   pageSize = _.toNumber(req.query.pageSize);
   //   pageStartIndex = _.toNumber(req.query.pageStartIndex);
   // }
   //
   // return RoomInfoBoard.findAll({
   //   limit: pageSize,
   //   offset: pageStartIndex,
   //   //where: {}
   // }).then(function(roomInfoList) {
   //   return res.status(200).json({
   //     RoomInfo: roomInfoList,
   //     statusCode: 1
   //   });
   // }).catch(function(err) {
   //   return res.status(400).json({
   //     errorMsg: '정보 없음',
   //     statusCode: -1
   //   });
   // });

   // room-list에서 if 처리를 해서 search시에만 보여주는 항목을 보여주자
   return res.render('room/room-list', {
      ENV: req.env,
      logined: req.user ? req.user.logined : false,
      title: req.i18n("title")["roomInfoListView"] + req.i18n("app")["name"],
      msg: req.msg,
      email: "123@123.com",
      search: true
   });
}

exports.roomInfoDetailJson = function(req, res) {
  let idx = req.params.roomInfoIdx;

  return Room.findOne({
    where: {
      ID: idx
    },
    // attributes: [],
  }).then(function(room) {
    var result = room;
    result.test = 'test';
    return res.send(result);
  });
}

// exports.roomInfoListJson = function(req, res) {
//   let list = JSON.parse(req.params.roomIdxList);
//   var data = [];
//   var p = [];


//   if (list.length == 0) return res.send([]);

//   for (var i in list) {
//     var idx = list[i];
//     p.push(Room.findOne({
//       where: {
//         ID: idx
//       }
//     }).then(function(room) {
//       var r = room.dataValues;
//       r.address = JSON.parse(r.address);

//       data.push(room.dataValues);
//     }));
//   }

//   waitPromise(p);

//   function waitPromise(p) {
//     setTimeout(function() {
//       // console.log(list.length, data.length);
//       // console.log(list, data);
//       if (list.length == data.length) return promiseReturn(p);
//       else return waitPromise(p);
//     }, 100);
//   }

//   // return promiseReturn(p);

//   function promiseReturn(promiseArray) {
//     let nowPromise = promiseArray.pop();
//     // console.log(nowPromise);
//     return nowPromise.then(function() {
//       if (promiseArray.length > 1) {
//         return promiseReturn(promiseArray);
//       } else {
//         return res.send(data);
//       }
//     }).catch(function(error) {
//       return res.send([]);
//     });
//   };
// }

exports.roomInfoListJson = function(req, res) {
  let list = JSON.parse(req.params.roomIdxList);

  if (list.length == 0) return res.send([]);

  return Room.findAll({
    include: [ {
      model: Post
    } ],
    where: {
      ID: {
        $in: list
      }
    }
  }).then(function(room) {
    return res.send(room);
  });
}
