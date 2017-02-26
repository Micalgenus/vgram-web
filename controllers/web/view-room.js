"use strict";

const models = require('../../models');
const Rooms = models.rooms;
const Posts = models.posts;
const _ = require('lodash');
const Promise = require("bluebird");
const moment = require("moment");

var env = process.env.NODE_ENV || "development";
var config = require("../../config/main");

var log = require('console-log-level')({
  prefix: function () {
    return new Date().toISOString()
  },
  level: config.logLevel
});

const value = require('../../utils/staticValue');
const vrpanoPromise = require('../../modules/convert-vrpano-promise');
const moveImagePromise = require('../../modules/move-image-promise');

exports.roomInfoListView = function(req, res) {
  let page = (req.query.page ? req.query.page : 1);

  return Rooms.count()
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

    Posts.hasOne(Rooms, { foreignKey: 'post_id' });
    Rooms.belongsTo(Posts, { foreignKey: 'ID' });

    return Rooms.findAll({
      include: [ { model: Posts } ],
      limit: count,
      offset: index,
      order: '`rooms`.`ID` DESC'
    }).then(function(rooms) {
      var roomInfo = [];
      rooms.forEach(function(room) {
        var tmpRoom = {};

        // 임시
        let image = room.thumbnail_image_path;
        if (!image.match(/^https?:\/\//)) {
          image = "http://localhost:3000/" + image;
        }
        
        let address = JSON.parse(room.address);

        tmpRoom['id'] = room.ID;
        tmpRoom['image'] = image;
        tmpRoom['address'] = address.addr1 + ' ' + address.addr2;
        tmpRoom['title'] = room.post.title;

        roomInfo.push(tmpRoom);
      });

      return res.render('room/room-list', {
          ENV: req.env,
          logined: req.logined,
          title: '방 정보 목록',
          msg: req.msg,
          nowPage: page,
          lastPage: lastPage,
          rooms: roomInfo
      });
    });
  });
}

/**
 * 시공사례입력(use vrpano-promise)
 * @param req
 * @param res
 * @param next
 */
exports.createRoomInfoView = function (req, res, next) {
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

  // if (!req.files[value.fieldName.prevImg]) {
  //   return res.status(401).json({
  //     errorMsg: 'You must enter an required field! please check file["previewImage"]',
  //     statusCode: -1
  //   });
  // }

  // req.files["fieldname"[i] - structure example
  // { fieldname: 'myfile',
  //   originalname: '20160224_104138.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: '/tmp/upload/',
  //   filename: '8563e0bef6efcc4d709f2d1debb35777',
  //   path: '/tmp/upload/8563e0bef6efcc4d709f2d1debb35777',
  //   size: 1268337 }

  /**
   * String, Array[String]
   */
  // let createRoomInfoDB = Promise.method(function (initWriteDate, previewImagePath, vrImages, originalVRImages) {
  //   const roomInfo = {
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
  //     supplyOption: req.body.supplyOption == "" ? null : req.body.supplyOption,
  //     availableDate: req.body.availableDate == "" ? null : req.body.availableDate,
  //     HTMLText: req.body.HTMLText == "" ? null : req.body.HTMLText,
  //     VRImages: _.isNil(vrImages) ? null : JSON.stringify(vrImages),   // 현재는 변환 전임을 표시함.
  //     locationInfo: req.body.locationInfo == "" ? null : req.body.locationInfo,
  //     coordinate: req.body.coordinate == "" ? null : req.body.coordinate,    // JSON.stringify() 형식 그대로 오기 때문에
  //     regionCategory: req.body.regionCategory == "" ? null : req.body.regionCategory,   // JSON.stringify() 형식 그대로
  //     initWriteDate: _.isNil(initWriteDate) ? null : moment(_.toNumber(initWriteDate)).format("YYYY-MM-DD HH:MM:SS"),      // timestamp로 변환
  //     fileRef: _.isNil(initWriteDate) ? null : _.toNumber(initWriteDate)    // 현재는 notNull임
  //     // 나중에 수정시 기존 게시물에 있는 정보를 initWriteDate삭제
  //   }
  //
  //   return RoomInfoBoard.create(roomInfo).then(function (newRoomInfo) {
  //     res.status(201).json({
  //       roomInfo: newRoomInfo,
  //       statusCode: value.statusCode.RequestActionCompleted_20x
  //     });
  //
  //     return [originalVRImages, newRoomInfo.idx];
  //   }).spread(function (originalVRImages, roomInfoIdx) {
  //
  //     if (originalVRImages) {
  //       return vrpanoPromise(originalVRImages).then(() => {   // VR 이미지가 있으면 변환하게 고쳐야함.
  //         log.debug('[convert-vrpano-promise] done!');
  //         return Promise.resolve(roomInfoIdx);
  //       }).catch(err => {
  //         log.error('[convert-vrpano-promise] ERROR: ', err);
  //       });    // 비동기로 작동한다.
  //
  //     } else {
  //       return new Error('no originalVRImages in req.files');
  //     }
  //   }).catch(function (err) {
  //     if (err) {
  //       res.status(400).json({
  //         errorMsg: 'RoomInfoBoard Error : No RoomInfo could be create for this info.',
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
  //       moveImagePromise.movePreviewImage(req, value.fieldName.prevImg, newSavePath, config.resourcePath),
  //       moveImagePromise.moveVRImage(req, value.fieldName.vrImg, newSavePath, config.resourcePath), function (previewImage, vrImages) {
  //       return {initWriteDate: newSavePath, previewImage: previewImage, vrImgObj: vrImages};
  //     });
  //   }).then(function (result) {
  //   return createRoomInfoDB(result.initWriteDate, result.previewImage, result.vrImgObj.vrImages, result.vrImgObj.vrImagePaths);
  // }).then(function (newIdx) {
  //   return moveImagePromise.saveVRPanoPath(newIdx, RoomInfoBoard);
  // }).done(function (result) {
  //   log.debug(result);
  // }, function (err) {
  //   log.error(err);
  // });
   return res.render('room/room-new', {
      ENV: req.env,
      logined: true,
      title: '로그인',
      msg: "message",
      email: "123@123.com",
      update: false
   });
}


// 동일 중복 파일을 체크할 수 있도록 개발해야함
// Media Management System을 만들거나, 간단한 checksum으로 필터링을 해야함.
/**
 * Action - 시공사례입력(use vrpano-promise)
 * @param req
 * @param res
 * @param next
 */
exports.createRoomInfoAndVRPano = function (req, res, next) {
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

   // if (!req.files[value.fieldName.prevImg]) {
   //   return res.status(401).json({
   //     errorMsg: 'You must enter an required field! please check file["previewImage"]',
   //     statusCode: -1
   //   });
   // }

   // req.files["fieldname"[i] - structure example
   // { fieldname: 'myfile',
   //   originalname: '20160224_104138.jpg',
   //   encoding: '7bit',
   //   mimetype: 'image/jpeg',
   //   destination: '/tmp/upload/',
   //   filename: '8563e0bef6efcc4d709f2d1debb35777',
   //   path: '/tmp/upload/8563e0bef6efcc4d709f2d1debb35777',
   //   size: 1268337 }

   /**
    * String, Array[String]
    */
   // let createRoomInfoDB = Promise.method(function (initWriteDate, previewImagePath, vrImages, originalVRImages) {
   //   const roomInfo = {
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
   //     supplyOption: req.body.supplyOption == "" ? null : req.body.supplyOption,
   //     availableDate: req.body.availableDate == "" ? null : req.body.availableDate,
   //     HTMLText: req.body.HTMLText == "" ? null : req.body.HTMLText,
   //     VRImages: _.isNil(vrImages) ? null : JSON.stringify(vrImages),   // 현재는 변환 전임을 표시함.
   //     locationInfo: req.body.locationInfo == "" ? null : req.body.locationInfo,
   //     coordinate: req.body.coordinate == "" ? null : req.body.coordinate,    // JSON.stringify() 형식 그대로 오기 때문에
   //     regionCategory: req.body.regionCategory == "" ? null : req.body.regionCategory,   // JSON.stringify() 형식 그대로
   //     initWriteDate: _.isNil(initWriteDate) ? null : moment(_.toNumber(initWriteDate)).format("YYYY-MM-DD HH:MM:SS"),      // timestamp로 변환
   //     fileRef: _.isNil(initWriteDate) ? null : _.toNumber(initWriteDate)    // 현재는 notNull임
   //     // 나중에 수정시 기존 게시물에 있는 정보를 initWriteDate삭제
   //   }
   //
   //   return RoomInfoBoard.create(roomInfo).then(function (newRoomInfo) {
   //     res.status(201).json({
   //       roomInfo: newRoomInfo,
   //       statusCode: value.statusCode.RequestActionCompleted_20x
   //     });
   //
   //     return [originalVRImages, newRoomInfo.idx];
   //   }).spread(function (originalVRImages, roomInfoIdx) {
   //
   //     if (originalVRImages) {
   //       return vrpanoPromise(originalVRImages).then(() => {   // VR 이미지가 있으면 변환하게 고쳐야함.
   //         log.debug('[convert-vrpano-promise] done!');
   //         return Promise.resolve(roomInfoIdx);
   //       }).catch(err => {
   //         log.error('[convert-vrpano-promise] ERROR: ', err);
   //       });    // 비동기로 작동한다.
   //
   //     } else {
   //       return new Error('no originalVRImages in req.files');
   //     }
   //   }).catch(function (err) {
   //     if (err) {
   //       res.status(400).json({
   //         errorMsg: 'RoomInfoBoard Error : No RoomInfo could be create for this info.',
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
   //       moveImagePromise.movePreviewImage(req, value.fieldName.prevImg, newSavePath, config.resourcePath),
   //       moveImagePromise.moveVRImage(req, value.fieldName.vrImg, newSavePath, config.resourcePath), function (previewImage, vrImages) {
   //       return {initWriteDate: newSavePath, previewImage: previewImage, vrImgObj: vrImages};
   //     });
   //   }).then(function (result) {
   //   return createRoomInfoDB(result.initWriteDate, result.previewImage, result.vrImgObj.vrImages, result.vrImgObj.vrImagePaths);
   // }).then(function (newIdx) {
   //   return moveImagePromise.saveVRPanoPath(newIdx, RoomInfoBoard);
   // }).done(function (result) {
   //   log.debug(result);
   // }, function (err) {
   //   log.error(err);
   // });

   req.flash('msg', '글 작성이 완료되었습니다.');
   return res.redirect(202, '/room');
}


// preview image 수정 후 잘 뜨는지 확인해야함.
exports.changeRoomInfoView = function(req, res, next) {
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
   //   const roomInfo = {
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
   //   return RoomInfoBoard.update(roomInfo, {where: {idx: roomInfoIdx}}).then(function (array) {
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
   return res.render('room/room-new', {
      ENV: req.env,
      logined: true,
      title: '로그인',
      msg: "message",
      email: "123@123.com",
      update: true
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
  //   const roomInfo = {
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
  //   return RoomInfoBoard.update(roomInfo, {where: {idx: roomInfoIdx}}).then(function (array) {
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
   req.flash('msg', '글 수정이 완료되었습니다.');
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
  // }).then(function(roomInfo) { // 다른 회원의 내용일 경우 열람 불가능
  //   if (req.user.idx != roomInfo.memberIdx) {
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
   req.flash('msg', '글 삭제가 완료되었습니다.');
   return res.redirect(202, '/room');
}

exports.roomInfoDetailView = function(req, res) {

  let idx = req.params.roomInfoIdx;

  Posts.hasOne(Rooms, { foreignKey: 'post_id' });
  Rooms.belongsTo(Posts, { foreignKey: 'ID' });

  return Rooms.findOne({
    include: [ { model: Posts } ],
    where: {
      ID: idx
    }
  }).then(function(room) {
    return res.render('room/room-detail', {
      ENV: req.env,
      logined: req.logined,
      msg: req.msg,
      title: '방 정보 상세보기',
      //{"ID":10,"post_id":10,"room_type":"ONE_ROOM","post_code":"54922","address":"{\"addr1\":\"전북 전주시 덕진구 백제대로 567\",\"addr2\":\"전북대학교 창업동아리 아늑한집\"}","old_address":"{\"addr1\":\"전라북도 전주시 덕진구 금암동 1587-31\",\"addr2\":\"전북대학교 구주소입니당\"}","old_address_dong":"금암동","coordinate":"{\"lat\":35.8598743,\"lng\":127.1117673}","thumbnail_image_path":"medias/vtours/1474866921708/vtour/panos/SAM_100_0075.tiles/thumb.jpg","thumbnail_media_id":10,"deposit":100,"monthly_rent_fee":25,"area_size":10,"meta_value":"{\"options\":[\"심야전기\"]}","createdAt":"2017-02-26T12:03:57.615Z","updatedAt":"2017-02-26T12:03:57.615Z","post":{"ID":10,"user_id":10,"post_init_date":"2017-02-26T12:03:54.000Z","post_init_date_gmt":"2017-02-26T03:03:54.000Z","content":"<p style=\"text-align: center; \">Hi, HTML Text 10번 유저</p><p style=\"text-align: center; \">ㅋㅋㅋㅋㅋㅋㅋㅋ<br></p>","title":"10번 user 게시물입니다","post_status":"publish","post_modified_date":"2017-01-24T15:00:00.000Z","post_modified_date_gmt":"2017-01-24T18:00:00.000Z","post_type":"room","read_count":0,"like":0,"locale":"ko_KR","meta_value":"{\"written_device\":\"web\"}","createdAt":"2017-02-26T12:03:57.342Z","updatedAt":"2017-02-26T12:03:57.342Z"}}
      room: room
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
      logined: true,
      title: '로그인',
      msg: "message",
      email: "123@123.com",
      search: true
   });
}
