"use strict";

const models = require('../../models');

const Attached = models.attached;
const Media = models.media;
const Post = models.post;
const Room = models.room;

const PostAttachedRelationship = models.post_attached_relationship;
const PostMediaRelationship = models.post_media_relationship;
const PostMeta = models.post_meta;


const _ = require('lodash');
const Promise = require("bluebird");
const moment = require("moment");
const multer = require("multer");


var env = process.env.NODE_ENV || "development";
var config = require("../../config/main");

var log = require('console-log-level')({
   prefix: function () {
      return new Date().toISOString()
   },
   level: config.logLevel
});

const value = require('../../utils/staticValue');
const multerConfig = require('../../config/multer');
const vrpano = require('../../modules/convert-vrpano-promise');

// for file download, filter를 이용한 중복체크가 필요함
const setFileUpload = multer({storage: multerConfig.postInfoStorage}).fields([
   {name: value.fieldName.NORMAL_IMAGE, maxCount: 15}, {name: value.fieldName.VR_IMAGE, maxCount: 10},
   {name: value.fieldName.ATTACHED_FILE, maxCount: 5}]);
const fileUploadPromise = Promise.promisify(setFileUpload);


// req.files["fieldname"[i] - structure example
// { fieldname: 'myfile',
//   originalname: '20160224_104138.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: '/tmp/upload/',
//   filename: '8563e0bef6efcc4d709f2d1debb35777',
//   path: '/tmp/upload/8563e0bef6efcc4d709f2d1debb35777',
//   size: 1268337 }

// 0. 파일 다운로드 처리(NORMAL_IMAGE, VR_IMAGE, multer.filter를 이용한 중복체크 필요)
let fileUpload = function (req, res, next) {
   return fileUploadPromise(req, res).then(() => {
         var normalImages = req.files[value.fieldName.NORMAL_IMAGE];
         var vrImages = req.files[value.fieldName.VR_IMAGE];
         var attachFiles = req.files[value.fieldName.ATTACHED_FILE];

         if (normalImages || vrImages) {
            let images = _.union(normalImages, vrImages);      // 확인 필요, 느려지는 원인이 될 수 있음
            req.mediaInfo = [];

            _.forEach(images, value => {
               req.mediaInfo.push({
                  media_type: value.mediaType,
                  date: moment.utc().format('YYYYMMDDHHmmssSS'),
                  file_path: path.posix.join(value.saveDir),      // file.destination은 절대경로이기 때문에 상대경로 저장
                  file_name: value.filename,
                  meta_value: {
                     mimetype: value.mimetype,
                     size: value.size,
                     encoding: value.encoding
                  },

                  fullPath: value.path    // for convert VRPano(not save as attribute in DB)
               });
            });
         }

         if (attachFiles) {
            req.attachedInfo = [];

            _.forEach(attachFiles, value => {
               req.attachedInfo.push({
                  media_type: value.mimetype,
                  date: moment.utc().format('YYYYMMDDHHmmssSS'),
                  file_path: path.posix.join(value.destination),
                  file_name: value.filename,
                  meta_value: {
                     mimetype: value.mimetype,
                     size: value.size,
                     encoding: value.encoding
                  }
               });
            });
         }
      }
   ).catch(next);
}


let setPostRoomData = function (req, res, medias) {

   let roomInfo = {
      memberIdx: req.user.idx,
      title: req.body.title,
      roomType: req.body.roomType == "" ? null : _.toNumber(req.body.roomType),
      address: req.body.address == "" ? null : req.body.address,    // JSON.stringify(address) 형식 그대로 온다.
      mainPreviewImage: _.isNil(previewImagePath) ? null : previewImagePath,
      deposit: req.body.deposit == "" ? null : _.toNumber(req.body.deposit),
      monthlyRentFee: req.body.monthlyRentFee == "" ? null : _.toNumber(req.body.monthlyRentFee),
      floor: req.body.floor == "" ? null : _.toNumber(req.body.floor),
      manageExpense: req.body.manageExpense == "" ? null : _.toNumber(req.body.manageExpense),
      manageService: req.body.manageService == "" ? null : req.body.manageService,
      areaSize: req.body.areaSize == "" ? null : _.toNumber(req.body.areaSize),
      actualSize: req.body.actualSize == "" ? null : _.toNumber(req.body.actualSize),
      parking: req.body.parking == "" ? null : _.toNumber(req.body.parking),
      elevator: req.body.elevator == "" ? null : _.toNumber(req.body.elevator),
      supplyOption: req.body.supplyOption == "" ? null : req.body.supplyOption,
      availableDate: req.body.availableDate == "" ? null : req.body.availableDate,
      HTMLText: req.body.HTMLText == "" ? null : req.body.HTMLText,
      VRImages: _.isNil(vrImages) ? null : JSON.stringify(vrImages),   // 현재는 변환 전임을 표시함.
      locationInfo: req.body.locationInfo == "" ? null : req.body.locationInfo,
      coordinate: req.body.coordinate == "" ? null : req.body.coordinate,    // JSON.stringify() 형식 그대로 오기 때문에
      regionCategory: req.body.regionCategory == "" ? null : req.body.regionCategory,   // JSON.stringify() 형식 그대로
      initWriteDate: _.isNil(initWriteDate) ? null : moment(_.toNumber(initWriteDate)).format("YYYY-MM-DD HH:MM:SS"),      // timestamp로 변환
      fileRef: _.isNil(initWriteDate) ? null : _.toNumber(initWriteDate),     // 현재는 notNull임,
      meta_value: {
         options: [],
         image_slider_order: []
      }
   }

   _, each(medias, media => {
      if (_.eq(media.media_type, value.mediaType.NORMAL_IMAGE)) {
         roomInfo.meta_value.image_slider_order.push(media.ID)       // 이미지 슬라이더 순서 정렬을 위한 id 할당
      }
   });

   const postInfo = {
      memberIdx: req.user.idx,
      title: req.body.title,
      buildType: req.body.buildType == "" ? null : req.body.buildType,
      buildPlace: req.body.buildPlace == "" ? null : req.body.buildPlace,
      buildTotalArea: req.body.buildTotalArea == "" ? null : _.toNumber(req.body.buildTotalArea),
      mainPreviewImage: _.isNil(previewImagePath) ? null : previewImagePath,
      buildTotalPrice: req.body.buildTotalPrice == "" ? null : _.toNumber(req.body.buildTotalPrice),
      HTMLText: req.body.HTMLText == "" ? null : req.body.HTMLText,
      VRImages: _.isNil(vrImages) ? null : JSON.stringify(vrImages),      // 현재는 변환 전임을 표시함.
      coordinate: req.body.coordinate == "" ? null : req.body.coordinate,    // JSON.stringify() 형식 그대로 오기 때문에
      regionCategory: req.body.regionCategory == "" ? null : req.body.regionCategory,   // JSON.stringify() 형식 그대로
      initWriteDate: _.isNil(initWriteDate) ? null : moment(_.toNumber(initWriteDate)).format("YYYY-MM-DD HH:MM:SS"),   // timestamp로 변환
      fileRef: _.isNil(initWriteDate) ? null : _.toNumber(initWriteDate),
      meta_value: {
         author_device: req.device.type
      }
   }

   return {
      postInfo: postInfo,
      roomInfo: roomInfo
   }
};


exports.viewRoomInfoList = function (req, res) {
   let pageSize, pageStartIndex;

   // 페이지 정보 확인
   if (!req.query.pageSize || !req.query.pageStartIndex) {
      // query가 제대로 오지 않으면 초기값으로 보낸다.
      pageSize = 10;
      pageStartIndex = 0;
   } else {
      pageSize = _.toNumber(req.query.pageSize);
      pageStartIndex = _.toNumber(req.query.pageStartIndex);
   }

   return RoomInfoBoard.findAll({
      limit: pageSize,
      offset: pageStartIndex
   }).then(function (roomInfoList) {
      return res.status(200).json({
         roomInfo: roomInfoList,
         statusCode: 1
      });
   }).catch(function (err) {
      return res.status(400).json({
         errorMsg: '정보 없음',
         statusCode: -1
      });
   });
}

// API, Web 공용 로직
// 0. 파일 다운로드 처리(NORMAL_IMAGE, VR_IMAGE)
// saveRoomInDB - transaction {
// 1. media(NORMAL_IMAGE, VR_IMAGE), attached 저장
// 2. [post, room 저장] -> [post_meta, post_attached_relationship, post_media_relationship 저장]
// 3. vrpano 변환 -> media(vtour) 정보 DB 저장 -> post_media_relationship에 vtour 정보 저장
// 4. room thumbnail 업데이트
// }
/**
 * 시공사례입력(use vrpano-promise)
 * @param req
 * @param res
 * @return Promise
 */
exports.createRoomInfoAndVRPano = function (req, res, next) {

   let saveRoomInDB = Promise.method(function (req, res, next) {

      let roomInstance;

      return models.sequelize.transaction(function (t) {

         return Promise.join([    // 1. media(NORMAL_IMAGE, VR_IMAGE), attached 저장(중복체크 필요)
            Media.bulkCreate(req.mediaInfo, {transaction: t}),
            Attached.bulkCreate(req.attachedInfo, {transaction: t})]);
      }).spread(function (newMedias, newAttacheds) {    // 2.a [post, room 저장]
         const output = setPostRoomData(req, res, newMedias);
         const postInfo = output.postInfo;
         const roomInfo = output.roomInfo;

         return Post.create(postInfo, {transaction: t}).then(newPost => {

            return Promise.join([      // 2.b [room, post_attached_relationship, post_media_relationship 저장]
               newPost.createRoom(roomInfo, {transaction: t}),
               newPost.addAttacheds(newAttacheds, {transaction: t}),
               newPost.addMedias(newMedias, {transaction: t})]);
         });
      }).then(newRoom, newPost => {
         roomInstance = newRoom;

         res.status(201).json({
            statusCode: res.i18n("post create completed")
         });

         return Promise.resolve(newPost);
      }).then(newPost => {

         let vrImageInstances = newPost.getMedias({     // array
            where: {
               media_type: value.mediaType.VR_IMAGE      // image/spherical
            }
         });

         let vrImagePaths = [];
         _.each(req.mediaInfo, media => {    // vr파일이 저장된 절대경로 추출
            if (_.eq(media.media_type, value.mediaType.VR_IMAGE)) {
               vrImagePaths.push(media.fullPath);
            }
         })

         let folderName = moment.utc().format('YYYYMMDDHHmmssSS');

         // 3. vrpano 변환 -> media(vtour) 정보 DB 저장 -> post_media_relationship에 vtour 정보 저장
         return vrpano.convertVRPano(vrImagePaths, folderName).then(() => {

            let vtourInfo = vrpano.setVTourInfo(folderName, vrImageInstances);

            return Media.create(vtourInfo, {transaction: t}).then(newVTour => {
               return newVTour.addUseCases(newPost, {transaction: t});      // post_media_relationship에 vtour 정보 저장
            })

         });
      }).then((newVTour) => {
         // 4. room thumbnail 정보 업데이트
         let thumbnails = _.map(newVTour.tile_dir_name, tileDir => {
            return path.posix.join(newVTour.file_path, tileDir, newVTour.thumbnail_image_name)
         });

         return roomInstance.addThumbImage(newVTour, {
            thumbnail_image_path: thumbnails
         });
      }).catch(next);
   });

   return fileUpload(req, res, next).then(() => {
      return saveRoomInDB(req, res, next);
   });
}

// preview image 수정 후 잘 뜨는지 확인해야함.
exports.updateRoomInfo = function (req, res, next) {
   if (!req.params.roomInfoIdx) {
      return res.status(401).json({
         errorMsg: 'You must enter an required param! please check :roomInfoIdx',
         statusCode: -1
      });
   }
   const roomInfoIdx = _.toNumber(req.params.roomInfoIdx);

   if (req.user.memberType != value.memberType.LEASE_MEMBER) {
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

   if (!req.files[value.fieldName.prevImg]) {
      return res.status(401).json({
         errorMsg: 'You must enter an required field! please check file["previewImage"]',
         statusCode: -1
      });
   }

   let updateRoomInfo = Promise.method(function (initWriteDate, previewImagePath) {
      // 나중에 VR Tour 변경될 때 promise 형식으로 한번에 바꾸자
      const roomInfo = {
         memberIdx: req.user.idx,
         title: req.body.title,
         roomType: req.body.roomType == "" ? null : _.toNumber(req.body.roomType),
         address: req.body.address == "" ? null : req.body.address,    // JSON.stringify(address) 형식 그대로 온다.
         mainPreviewImage: _.isNil(previewImagePath) ? null : previewImagePath,
         deposit: req.body.deposit == "" ? null : _.toNumber(req.body.deposit),
         monthlyRentFee: req.body.monthlyRentFee == "" ? null : _.toNumber(req.body.monthlyRentFee),
         floor: req.body.floor == "" ? null : _.toNumber(req.body.floor),
         manageExpense: req.body.manageExpense == "" ? null : _.toNumber(req.body.manageExpense),
         manageService: req.body.manageService == "" ? null : req.body.manageService,
         areaSize: req.body.areaSize == "" ? null : _.toNumber(req.body.areaSize),
         actualSize: req.body.actualSize == "" ? null : _.toNumber(req.body.actualSize),
         parking: req.body.parking == "" ? null : _.toNumber(req.body.parking),
         elevator: req.body.elevator == "" ? null : _.toNumber(req.body.elevator),
         supplyOption: req.body.supplyOption == "" ? null : _.toNumber(req.body.supplyOption),
         availableDate: req.body.availableDate == "" ? null : req.body.availableDate,
         HTMLText: req.body.HTMLText == "" ? null : req.body.HTMLText,
         // VRImages: _.isNil(vrImages) ? null : JSON.stringify(vrImages),   // 현재는 변환 전임을 표시함.
         locationInfo: req.body.locationInfo == "" ? null : req.body.locationInfo,
         coordinate: req.body.coordinate == "" ? null : req.body.coordinate,    // JSON.stringify() 형식 그대로 오기 때문에
         regionCategory: req.body.regionCategory == "" ? null : req.body.regionCategory,   // JSON.stringify() 형식 그대로
         initWriteDate: _.isNil(initWriteDate) ? null : moment(_.toNumber(initWriteDate)).format("YYYY-MM-DD HH:MM:SS"),   // timestamp로 변환
         fileRef: _.isNil(initWriteDate) ? null : _.toNumber(initWriteDate)
      }

      // return Array[0] = affectedRows
      return RoomInfoBoard.update(roomInfo, {where: {idx: roomInfoIdx}}).then(function (array) {
         return res.status(200).json({
            msg: 'changed ' + array[0] + ' rows',
            statusCode: 1
         });
      }).catch(function (err) {
         if (err) {
            res.status(400).json({
               errorMsg: 'RoomInfoBoard Error : No user could be found for this ID.',
               statusCode: 2
            });
            return next(err);
         }
      });
   });

   return moveImagePromise.makeNewSavePath(req)
      .then(function (newSavePath) {
         return Promise.join(
            moveImagePromise.movePreviewImage(req, value.fieldName.prevImg, newSavePath, config.resourcePath), function (previewImage) {
               return {initWriteDate: newSavePath, previewImage: previewImage};
            });
      }).then(function (result) {
         return updateRoomInfo(result.initWriteDate, result.previewImage);
      }).done(function (result) {
         log.debug(result);
         next();
      }, function (err) {
         log.error(err);
         next(err);
      });

}

exports.deleteRoomInfo = function (req, res) {
   const roomInfoIdx = req.params.roomInfoIdx;

   return RoomInfoBoard.findOne({
      where: {
         idx: roomInfoIdx
      }
   }).then(function (roomInfo) { // 다른 회원의 내용일 경우 열람 불가능
      if (req.user.idx != roomInfo.memberIdx) {
         return res.status(400).json({
            errorMsg: '다른 회원',
            statusCode: -1
         });
      }

      return RoomInfoBoard.destroy({
         where: {
            idx: roomInfoIdx
         }
      }).then(function () {
         return res.status(200).json({statusCode: 1});
      }).catch(function (err) {
         if (err) {
            return res.status(400).json({
               errorMsg: '삭제 실패',
               statusCode: -1
            });
         }
      });
   }).catch(function (err) {
      console.log(err);
      if (err) {
         return res.status(400).json({
            errorMsg: '정보 없음',
            statusCode: -1
         });
      }
   });
}

exports.viewRoomInfoDetail = function (req, res) {
   const roomInfoIdx = req.params.roomInfoIdx;

   return RoomInfoBoard.findOne({
      where: {
         idx: roomInfoIdx
      }
   }).then(function (roomInfo) {
      return res.status(200).json({
         roomInfo,
         statusCode: 1
      });
   }).catch(function (err) {
      return res.status(400).json({
         errorMsg: '정보 없음',
         statusCode: -1
      });
   });
}

exports.searchRoomInfoList = function (req, res) {
   let pageSize, pageStartIndex, query = req.query.query;

   // 페이지 정보 확인
   if (!req.query.pageSize || !req.query.pageStartIndex) {
      // query가 제대로 오지 않으면 초기값으로 보낸다.
      pageSize = 10;
      pageStartIndex = 0;
   } else {
      pageSize = _.toNumber(req.query.pageSize);
      pageStartIndex = _.toNumber(req.query.pageStartIndex);
   }

   return RoomInfoBoard.findAll({
      limit: pageSize,
      offset: pageStartIndex,
      //where: {}
   }).then(function (roomInfoList) {
      return res.status(200).json({
         RoomInfo: roomInfoList,
         statusCode: 1
      });
   }).catch(function (err) {
      return res.status(400).json({
         errorMsg: '정보 없음',
         statusCode: -1
      });
   });
}

